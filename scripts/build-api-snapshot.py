"""从已下载的 OpenAPI 提取 API 面板快照；不访问网络、不包含示例值或认证数据。"""
import argparse
import hashlib
import json
from pathlib import Path

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--upms', type=Path, required=True)
parser.add_argument('--public', type=Path, required=True)
parser.add_argument('--captured-at', required=True, help='实际采集日期，不使用生成日期代替')
parser.add_argument('--output', type=Path, default=Path(__file__).resolve().parents[1] / 'api-evidence.js')
args = parser.parse_args()
public_paths = {'/sysMessage/send/app/emailCode', '/register/user', '/register/password',
                '/register/forget/{code}', '/user/info', '/user/personal/edit', '/sys-file/upload'}
schema_keys = {'$ref', 'type', 'format', 'description', 'enum', 'required', 'properties', 'items',
               'allOf', 'oneOf', 'anyOf', 'additionalProperties', 'nullable', 'minLength', 'maxLength',
               'minimum', 'maximum', 'pattern', 'readOnly', 'writeOnly'}

def schema(value):
    if not isinstance(value, dict):
        return value
    result = {}
    for key, item in value.items():
        if key not in schema_keys:
            continue
        if key == 'properties':
            result[key] = {name: schema(field) for name, field in item.items()}
        elif isinstance(item, list):
            result[key] = [schema(field) for field in item]
        else:
            result[key] = schema(item)
    return result

def content(value):
    return {media: {'schema': schema(spec.get('schema', {}))} for media, spec in value.items()}

def refs(value):
    if isinstance(value, dict):
        if '$ref' in value:
            yield value['$ref'].split('/')[-1]
        for item in value.values():
            yield from refs(item)
    elif isinstance(value, list):
        for item in value:
            yield from refs(item)

result = {'captured_at': args.captured_at, 'sources': {}, 'operations': {}, 'schemas': {}}
app_count = 0
for group, file in [('upms', args.upms), ('default', args.public)]:
    raw = file.read_bytes()
    doc = json.loads(raw.decode('utf-8-sig'))
    result['sources'][group] = {'document_path': '/v3/api-docs/' + group, 'sha256': hashlib.sha256(raw).hexdigest()}
    selected = {}
    for path, methods in doc['paths'].items():
        for method, op in methods.items():
            if method not in {'get', 'post', 'patch', 'put', 'delete'}:
                continue
            if group == 'upms' and not set(op.get('tags', [])) & {'App Device', 'App Subject'}:
                continue
            if group == 'default' and path not in public_paths:
                continue
            key = method.upper() + ' ' + path
            item = {'method': method.upper(), 'path': path, 'group': group, 'tags': op.get('tags', []),
                    'operation_id': op.get('operationId'), 'summary': op.get('summary'),
                    'parameters': [{**{k: p[k] for k in ['name', 'in', 'required', 'description'] if k in p},
                                    'schema': schema(p.get('schema', {}))} for p in op.get('parameters', [])],
                    'request_body': {**{k: op['requestBody'][k] for k in ['required', 'description'] if k in op.get('requestBody', {})},
                                     'content': content(op.get('requestBody', {}).get('content', {}))},
                    'responses': {code: {'description': response.get('description'), 'content': content(response.get('content', {}))}
                                  for code, response in op.get('responses', {}).items()}}
            selected[key] = item
    result['operations'].update(selected)
    if group == 'upms':
        app_count = len(selected)
    pending = set(refs(selected))
    definitions = {}
    while pending:
        name = pending.pop()
        if name in definitions:
            continue
        definitions[name] = schema(doc['components']['schemas'][name])
        pending.update(set(refs(definitions[name])) - definitions.keys())
    result['schemas'][group] = definitions
assert app_count == 37, f'App 分组数量已变化，请重新核对接入映射：{app_count}'
args.output.write_text('// 自动生成的文档快照；更新方式见 README，不代表业务验收。\nconst apiEvidence = ' +
                       json.dumps(result, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')
print(f'已提取 {app_count} 个 App 操作、{len(result["operations"])-app_count} 个公共操作；{args.output.name}')
