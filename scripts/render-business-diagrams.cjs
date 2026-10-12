// 编辑 Mermaid 源图后显式运行；普通离线阅读和 HTML 生成不依赖 Mermaid。
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const option = name => { const i = process.argv.indexOf(name); return i < 0 ? null : process.argv[i + 1]; };
const cli = option('--cli');
assert(cli && fs.existsSync(cli), '请用 --cli 指定已安装的 @mermaid-js/mermaid-cli/src/cli.js');
const config = option('--puppeteer-config');
const sources = fs.readdirSync(path.join(root, 'guides')).filter(file => file.endsWith('.mmd')).sort().map(file => ({
  file, text: fs.readFileSync(path.join(root, 'guides', file), 'utf8').replace(/\r\n/g, '\n'),
}));
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'evmars-guide-diagrams-'));
const input = path.join(scratch, 'diagrams.md');
const output = path.join(scratch, 'rendered.md');
fs.writeFileSync(input, sources.map(source => `# ${source.file}\n\n\`\`\`mermaid\n${source.text}\n\`\`\`\n`).join('\n'));
const args = [cli, '-i', input, '-o', output, '-c', path.join(root, 'guides/mermaid.json')];
if (config) args.push('-p', config);
const result = spawnSync(process.execPath, args, { encoding: 'utf8', windowsHide: true, timeout: 120000 });
if (result.error) throw result.error;
assert.equal(result.status, 0, result.stderr || result.stdout);
sources.forEach((source, index) => {
  let svg = fs.readFileSync(path.join(scratch, `rendered-${index + 1}.svg`), 'utf8');
  const box = svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
  assert(box[2] > 0 && box[3] > 0, '图表必须有有效尺寸');
  const hash = crypto.createHash('sha256').update(source.text).digest('hex');
  svg = svg.replace(/<svg\b[^>]*>/, tag => tag.replace(/\s(?:width|height)="[^"]*"/g, '').replace('<svg', `<svg data-source-sha256="${hash}" width="${box[2]}" height="${box[3]}"`));
  fs.writeFileSync(path.join(root, 'guides', source.file.replace('.mmd', '.svg')), svg);
  console.log(`${source.file}: ${Math.round(box[2])} × ${Math.round(box[3])}`);
});
