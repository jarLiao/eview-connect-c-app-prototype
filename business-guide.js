// 侧栏与离线文档共用渲染；生成器可在无 DOM 的 Node VM 中调用纯函数。
function guideEscape(value) {
  return String(value).replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
}

function guideText(value) {
  return guideEscape(value).replace(/`([^`]+)`/g, "<code>$1</code>");
}

function renderGuideSection(section, compact, imageSource) {
  let body = "";
  if (section.apis) {
    body += `<ol class="guide-api-list">${section.apis.map(([id, purpose, count]) => {
      const api = apiRegistry[id];
      return `<li><strong>${guideText(purpose)}</strong><span class="guide-api-route"><b>${guideEscape(api.method)}</b><code>${guideEscape(api.path)}</code></span><small>${guideText(count)}</small></li>`;
    }).join("")}</ol>`;
  }
  if (section.steps) body += `<ol class="guide-steps">${section.steps.map(([title, text]) => `<li><strong>${guideText(title)}</strong><p>${guideText(text)}</p></li>`).join("")}</ol>`;
  if (section.example) body += `<p class="guide-example">${guideText(section.example)}</p>`;
  if (section.diagrams) body += `<div class="guide-diagrams">${section.diagrams.map(diagram => {
    const src = guideEscape(imageSource(diagram.file));
    const title = guideEscape(diagram.title);
    return compact
      ? `<button class="guide-button" type="button" data-guide-image="${src}" data-guide-title="${title}">${title}<span aria-hidden="true">↗</span></button>`
      : `<figure><figcaption><strong>${title}</strong><button class="guide-button" type="button" data-guide-figure data-guide-title="${title}">放大图表</button></figcaption><img src="${src}" alt="${title}"></figure>`;
  }).join("")}</div>`;
  if (section.fields) {
    body += compact
      ? `<dl class="guide-fields">${section.fields.map(([label, field, rule]) => `<div><dt>${guideText(label)}</dt><dd><code>${guideEscape(field)}</code><p>${guideText(rule)}</p></dd></div>`).join("")}</dl>`
      : `<div class="guide-table-scroll" tabindex="0" aria-label="卡片字段来源表，可横向滚动"><table><thead><tr><th>页面内容</th><th>字段来源</th><th>展示规则</th></tr></thead><tbody>${section.fields.map(row => `<tr>${row.map(cell => `<td>${guideText(cell)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
  }
  if (section.rules) body += `<ul class="guide-rules">${section.rules.map(([title, text]) => `<li><strong>${guideText(title)}</strong><p>${guideText(text)}</p></li>`).join("")}</ul>`;
  if (section.notes) body += `<div class="guide-notes">${section.notes.map(note => `<p>${guideText(note)}</p>`).join("")}</div>`;
  return body;
}

function renderGuideContent(key, compact = true, imageSource = file => `./guides/${file}`) {
  const guide = businessGuides[key];
  if (!guide) return `<div class="guide-card guide-empty"><span class="guide-kicker">${guideEscape(apiPageTitles[key] || "当前业务")}</span><h2>技术说明待补充</h2><p>这个业务还没有完成技术说明整理。可先查看页面说明和左侧接口清单。</p><p class="guide-muted">当前样板：设备列表。</p></div>`;
  const header = `<header class="guide-card guide-intro"><span class="guide-kicker">按 Android 实现整理 · ${guide.reviewedAt}</span><h${compact ? 2 : 1}>${guideEscape(guide.title)}</h${compact ? 2 : 1}><p class="guide-lead">${guideText(guide.lead)}</p><p class="guide-scope">${guideText(guide.scope)}</p>${compact ? `<div class="guide-actions"><a class="guide-button" href="./guides/${guide.file}" target="_blank" rel="noopener">单独打开 <span aria-hidden="true">↗</span></a><button class="guide-button" type="button" data-guide-download="${guideEscape(key)}">下载 HTML <span aria-hidden="true">↓</span></button></div>` : ""}</header>`;
  const sections = guide.sections.map((section, index) => {
    const body = renderGuideSection(section, compact, imageSource);
    const title = `<span class="guide-section-number">${index + 1}</span>${guideEscape(section.title)}`;
    return compact
      ? `<details class="guide-section" data-guide-section="${section.id}"><summary><span>${title}</span><small>${guideEscape(section.summary)}</small></summary><div class="guide-section-body">${body}</div></details>`
      : `<section class="guide-section" id="${section.id}"><h2>${title}</h2><div class="guide-section-body">${body}</div></section>`;
  }).join("");
  return `${header}${sections}<footer class="guide-footnote">实现基线：Android ${guide.baseline}<br>${guideEscape(guide.source)}<br>原型使用演示数据；本轮未新增后端业务验收。</footer>`;
}

let businessGuideMode = "page";

function renderBusinessGuidePanel(panel, key, pageHtml) {
  if (panel.dataset.guideContext !== key) panel.scrollTop = 0;
  panel.dataset.guideContext = key;
  panel.innerHTML = `<div class="guide-tabs" role="tablist" aria-label="说明类型">${[["page", "页面说明"], ["technical", "技术说明"]].map(([mode, label]) => `<button id="guide-tab-${mode}" type="button" role="tab" data-guide-tab="${mode}" aria-controls="guide-panel-${mode}" aria-selected="${businessGuideMode === mode}" tabindex="${businessGuideMode === mode ? 0 : -1}">${label}</button>`).join("")}</div><div id="guide-panel-page" class="guide-page-panel" role="tabpanel" aria-labelledby="guide-tab-page" tabindex="0"${businessGuideMode !== "page" ? " hidden" : ""}>${pageHtml}</div><div id="guide-panel-technical" class="business-guide" role="tabpanel" aria-labelledby="guide-tab-technical" tabindex="0"${businessGuideMode !== "technical" ? " hidden" : ""}>${renderGuideContent(key)}</div>`;
  const mobileNav = document.getElementById("guide-mobile-nav");
  const guide = businessGuides[key];
  if (mobileNav) {
    mobileNav.hidden = !guide;
    mobileNav.innerHTML = guide ? `<span>原型说明</span><a href="./guides/${guide.file}" target="_blank" rel="noopener">${guideEscape(guide.title)} ↗</a>` : "";
  }
}

function initBusinessGuidePanel(panel) {
  businessGuideMode = new URLSearchParams(location.search).get("guide") === "technical" ? "technical" : "page";
  function selectTab(mode, focus) {
    businessGuideMode = mode;
    panel.querySelectorAll("[data-guide-tab]").forEach(tab => {
      const active = tab.dataset.guideTab === mode;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute("aria-controls")).hidden = !active;
      if (active && focus) tab.focus();
    });
    panel.scrollTop = 0;
  }
  panel.addEventListener("click", event => {
    const tab = event.target.closest("[data-guide-tab]");
    if (tab) selectTab(tab.dataset.guideTab, false);
    const download = event.target.closest("[data-guide-download]");
    if (download) {
      const key = download.dataset.guideDownload;
      const url = URL.createObjectURL(new Blob([businessGuideDownloads[key]], { type: "text/html;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `${businessGuides[key].title}.html`;
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  });
  panel.addEventListener("keydown", event => {
    const tab = event.target.closest("[data-guide-tab]");
    if (!tab || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    selectTab(event.key === "Home" ? "page" : event.key === "End" ? "technical" : businessGuideMode === "page" ? "technical" : "page", true);
  });
}
