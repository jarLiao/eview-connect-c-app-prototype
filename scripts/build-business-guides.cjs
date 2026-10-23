// 从同一业务内容、接口目录、样式与本地图表生成独立离线 HTML。
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
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
const claimedPages = new Set();
const claimedFiles = new Set();
for (const [key, guide] of Object.entries(guides)) {
  assert(/^[a-z0-9-]+\.html$/.test(guide.file), '导出文件名必须是目录内的 HTML');
  assert(!claimedFiles.has(guide.file), '说明导出文件名不能重复');
  claimedFiles.add(guide.file);
  assert.equal(guide.sections.length, 5, `${key} 应保留五项重点`);
  assert.equal(new Set(guide.sections.map(section => section.id)).size, 5, '章节锚点不能重复');
  for (const page of guide.pages) {
    assert(!claimedPages.has(page), `${page} 不能同时匹配两篇说明`);
    assert(vm.runInContext(`Boolean(apiPageTitles[${JSON.stringify(page)}])`, context), `${page} 缺少页面定义`);
    claimedPages.add(page);
  }
  for (const page of guide.apiPages || []) assert(vm.runInContext(`Boolean(apiPageTitles[${JSON.stringify(page)}])`, context), `${page} 缺少接口关联页面定义`);
  for (const id of guide.related || []) assert(guides[id] && id !== key, `${key} 的相关说明 ${id} 无效`);
  const apiIds = [...new Set(guide.sections.flatMap(section => (section.apis || []).flatMap(row => [row[0]].flat())))];
  for (const id of apiIds) {
    const api = JSON.parse(vm.runInContext(`JSON.stringify(apiRegistry[${JSON.stringify(id)}] || null)`, context));
    assert(api && (guide.apiPages || guide.pages).some(page => api.pages.includes(page)), `${key} 说明中的 ${id} 必须属于该业务覆盖的页面`);
  }
  context.guideImageSource = file => {
    assert(/^[a-z0-9-]+\.svg$/.test(file), '图表必须来自本地 guides 目录');
    const svg = read(`guides/${file}`);
    assert(!/<script\b|(?:href|src)=["']https?:/i.test(svg), `${file} 不能加载脚本或远程资源`);
    const sourceHash = crypto.createHash('sha256').update(read(`guides/${file.replace('.svg', '.mmd')}`)).digest('hex');
    assert(svg.includes(`data-source-sha256="${sourceHash}"`), `${file} 与 Mermaid 源图不一致，请重新渲染`);
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
const libraryCards = Object.values(guides).map(guide => `<a href="./${guide.file}"><strong>${guide.title} ↗</strong><p>${guide.lead}</p></a>`).join('');
const library = `<!doctype html>
<!-- 自动生成：node scripts/build-business-guides.cjs -->
<html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:,"><title>业务技术说明</title><style>${css}</style></head><body class="guide-document"><main class="business-guide"><header class="guide-card guide-intro"><span class="guide-kicker">Eview Connect · ${Object.keys(guides).length} 篇</span><h1>业务技术说明</h1><p class="guide-lead">按业务查看接口、流程、字段、异常和待补内容。</p><p class="guide-scope">对照 Android 实现整理，原型仍使用演示数据。每篇可独立离线阅读，流程图与时序图支持放大。</p></header><nav class="guide-library-grid" aria-label="业务说明目录">${libraryCards}</nav></main></body></html>
`;
if (checking) assert.equal(read('guides/index.html'), library, '业务说明目录已过期');
else fs.writeFileSync(path.join(root, 'guides/index.html'), library);
const bundleFile = 'guides/guide-downloads.js';
const bundle = '// 自动生成的离线下载内容；与 guides/*.html 同源，支持直接从 file:// 打开原型。\nconst businessGuideDownloads = ' + JSON.stringify(downloads) + ';\n';
if (checking) assert.equal(read(bundleFile), bundle, '下载内容已过期，请重新生成');
else fs.writeFileSync(path.join(root, bundleFile), bundle);
