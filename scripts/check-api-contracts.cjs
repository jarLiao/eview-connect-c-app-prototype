// 独立于浏览器检查：公开文档完整性、接入分类、页面覆盖和导出引用。
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({});
for (const file of ['api-evidence.js', 'api-contracts.js', 'api-panel.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}
const result = vm.runInContext(`(() => {
  const apis = Object.values(apiRegistry);
  return JSON.stringify({ evidence: apiEvidence, apis: apis.map(apiPayload), pages: apiPageTitles });
})()`, context);
const { evidence, apis, pages } = JSON.parse(result);
const documentApp = Object.keys(evidence.operations).filter(key => key.includes(' /app/')).sort();
const app = apis.filter(api => api.path?.startsWith('/app/') && api.evidence_kind !== 'client_supplement');
const supplements = apis.filter(api => api.evidence_kind === 'client_supplement');
assert.deepEqual(supplements.map(api => api.id).sort(), ['insightOverview', 'insightHealth', 'insightAlerts', 'insightAnalysis'].sort());
assert(supplements.every(api => api.category === 'current' && !api.document && api.path.startsWith('/app/evaigc/') && api.baseline.android_commit === '86fa2f9'));
assert.deepEqual(app.map(api => `${api.method} ${api.path}`).sort(), documentApp, '完整覆盖 App 文档的方法+路径，不能重复或漏项');
assert.equal(app.length, 37);
assert.equal(app.filter(api => api.category === 'current').length, 20);
assert.equal(app.filter(api => api.category === 'published').length, 17);
assert.equal(apis.find(api => api.id === 'function').category, 'current');
assert(apis.find(api => api.id === 'function').note.includes('singleLocating'));
assert.deepEqual(Object.fromEntries(['keep', 'next', 'optional', 'not_now'].map(code => [code, app.filter(api => api.app_need?.code === code).length])), { keep: 19, next: 8, optional: 9, not_now: 1 });
assert(app.every(api => api.app_need.reason && api.app_need.basis));
assert.equal(apis.find(api => api.id === 'deviceShareCreate').app_need.code, 'next');
assert.equal(apis.find(api => api.id === 'switchProduct').app_need.code, 'not_now');
assert.equal(apis.find(api => api.id === 'personBind').app_need.code, 'optional');
assert(apis.filter(api => !api.path?.startsWith('/app/')).every(api => !api.app_need));
assert.equal(apis.filter(api => api.path?.startsWith('/c/v1/')).length, 4);
assert(apis.filter(api => api.path?.startsWith('/c/v1/')).every(api => api.category === 'retired' && api.app_usage.includes('已停止') && api.note.includes('404')));
assert(!apis.some(api => api.category === 'pending'), '当前没有仍在调用的旧接口');
assert(!apis.some(api => api.path?.startsWith('/evmars/mock/')));
assert(apis.filter(api => api.category === 'requirement').every(api => api.method === null && api.path === null));
assert(apis.filter(api => api.category === 'current' && !api.path?.startsWith('/app/')).every(api => api.backend_scope.includes('待后端确认')));
assert.equal(apis.find(api => api.id === 'deviceShareCreate').category, 'published');
assert(apis.find(api => api.id === 'personShares').note.includes('归档'));
assert(apis.find(api => api.id === 'upload').client_contract.encoding.includes('multipart'));
assert(apis.find(api => api.id === 'upload').note.includes('application/json'));
assert(apis.find(api => api.id === 'profileUpdate').client_contract.body.includes('username'));
for (const api of apis) {
  assert(api.pages.length, `${api.id} 必须有页面归属`);
  api.pages.forEach(page => assert(pages[page], `${api.id} 的页面映射缺少标题：${page}`));
  if (api.category === 'current') assert(api.source, `${api.id} 缺少调用依据`);
  if (api.document_key) assert(api.document, `${api.id} 导出缺失文档`);
  assert.equal(api.schema_version, 2);
}
function visit(value, definitions) {
  if (!value || typeof value !== 'object') return;
  if (value.$ref) assert(definitions[value.$ref.split('/').pop()], `未导出引用 ${value.$ref}`);
  for (const [key, item] of Object.entries(value)) {
    assert(!['example', 'examples', 'default'].includes(key), '快照不导出示例值或默认值');
    visit(item, definitions);
  }
}
for (const api of apis.filter(api => api.document)) visit(api.document, api.document.schemas);
console.log(JSON.stringify({ result: '通过', snapshot_app_operations: app.length, client_supplement_operations: supplements.length,
  categories: Object.fromEntries(['current', 'published', 'pending', 'retired', 'requirement'].map(key => [key, apis.filter(api => api.category === key).length])),
  checks: ['37 个公开 App 操作逐一匹配', '20/17 接入分类', '功能需要按 19/8/9/1 另行标注', '4 个旧请求标为已停用', '需求不预设路径', '公共依赖支持边界', '上传声明差异', '页面映射与引用完整性', '导出来源与无示例值'] }, null, 2));
