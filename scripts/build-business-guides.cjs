// 从同一业务内容、接口目录、样式与本地图表生成独立离线 HTML。
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');
const context = vm.createContext({});
for (const file of ['api-evidence.js', 'api-contracts.js', 'business-guides.js', 'business-guide.js']) {
  vm.runInContext(read(file), context, { filename: file });
}
const guides = JSON.parse(vm.runInContext('JSON.stringify(businessGuides)', context));
const css = read('business-guide.css');
const viewer = read('guide-viewer.js');
const checking = process.argv.includes('--check');
const downloads = {};
for (const [key, guide] of Object.entries(guides)) {
  assert(/^[a-z0-9-]+\.html$/.test(guide.file), '导出文件名必须是目录内的 HTML');
  const apiIds = guide.sections.flatMap(section => (section.apis || []).map(row => row[0]));
  for (const id of apiIds) {
    const api = JSON.parse(vm.runInContext(`JSON.stringify(apiRegistry[${JSON.stringify(id)}] || null)`, context));
    assert(api && api.pages.includes(key), `${key} 说明中的 ${id} 必须与左侧接口映射一致`);
  }
  context.guideImageSource = file => {
    assert(/^[a-z0-9-]+\.svg$/.test(file), '图表必须来自本地 guides 目录');
    const svg = read(`guides/${file}`);
    assert(!/<script\b|(?:href|src)=["']https?:/i.test(svg), `${file} 不能加载脚本或远程资源`);
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  };
  const content = vm.runInContext(`renderGuideContent(${JSON.stringify(key)}, false, guideImageSource)`, context);
  const nav = guide.sections.map((section, index) => `<a href="#${section.id}">${index + 1}. ${section.title}</a>`).join('');
  const html = `<!doctype html>
<!-- 自动生成：修改 business-guides.js 后运行 node scripts/build-business-guides.cjs -->
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><link rel="icon" href="data:,"><title>${guide.title}</title><style>${css}</style></head>
<body class="guide-document"><main class="business-guide"><div class="guide-print-row"><button class="guide-button" type="button" data-guide-print>打印 / 保存 PDF</button></div><nav class="guide-document-nav" aria-label="阅读重点">${nav}</nav>${content}</main><script>${viewer}</script></body></html>
`;
  const output = `guides/${guide.file}`;
  downloads[key] = html;
  if (checking) assert.equal(read(output), html, `${output} 已过期，请重新生成`);
  else { fs.mkdirSync(path.join(root, 'guides'), { recursive: true }); fs.writeFileSync(path.join(root, output), html); }
  console.log(`${checking ? '已核对' : '已生成'} ${output}（${guide.sections.length} 个重点，${apiIds.length} 个接口）`);
}
const bundleFile = 'guides/guide-downloads.js';
const bundle = '// 自动生成的离线下载内容；与 guides/*.html 同源，支持直接从 file:// 打开原型。\nconst businessGuideDownloads = ' + JSON.stringify(downloads) + ';\n';
if (checking) assert.equal(read(bundleFile), bundle, '下载内容已过期，请重新生成');
else fs.writeFileSync(path.join(root, bundleFile), bundle);
