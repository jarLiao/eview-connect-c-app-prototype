// 面板与导出共用同一目录和证据，不从手机演示数据推定后端能力。
let apiPanelView = "page";

function setApiPanelView(view) {
  apiPanelView = view;
  renderApiPanel();
  apiPanel.querySelectorAll("[data-action]").forEach(element => {
    element.addEventListener("click", event => handleAction(element.dataset.action, element, event));
  });
  apiPanel.scrollTop = 0;
  refreshIcons();
}

function getApiPanelInfo() {
  let key;
  if (state.modal === "settings") {
    key = ({ profile: "account", map: "map-settings" })[state.settingsPanel] || state.settingsPanel || "account";
  } else if (["subjects", "subject-detail", "subject-form", "subject-archive"].includes(state.modal)) {
    key = state.modal === "subjects" ? "subjects" : "subject";
  } else if (state.modal) {
    key = ({ "logout-confirm": "logout", "config-category": "config" })[state.modal] || state.modal;
  } else if (state.route === "account-profile") {
    key = "account";
  } else if (state.route === "subject-profile") {
    key = mock.subjects.find(item => item.id === state.selectedSubjectId)?.type === "PET" ? "pet" : "person";
  } else if (!state.loggedIn) {
    key = state.route === "credentials" ? `${state.auth.purpose === "register" ? "register" : "reset"}-credentials` : state.route;
  } else if (state.route === "detail") {
    key = ({ map: "location", alarms: "alerts" })[state.detailTab] || state.detailTab || "overview";
  } else {
    key = state.tab;
  }
  const items = Object.values(apiRegistry).filter(api => apiPanelView === "all" || api.pages.includes(key));
  return { key, title: apiPanelView === "all" ? "全部接口与待确认需求" : apiPageTitles[key] || "当前页面", items };
}

function renderApiPanel() {
  if (!apiPanel) return;
  const info = getApiPanelInfo();
  apiPanel.innerHTML = `
    <section class="api-card api-card-primary">
      <div class="api-kicker">${icon("server")} API 接入对照</div>
      <h2>${escapeHtml(info.title)}</h2>
      <p>核对日期 ${apiBaseline.reviewed_at} · Android ${apiBaseline.android_commit.slice(0, 7)}</p>
      <div class="api-view-switch" role="group" aria-label="API 查看范围">
        <button type="button" data-action="api-view-page" aria-pressed="${apiPanelView === "page"}">当前页面</button>
        <button type="button" data-action="api-view-all" aria-pressed="${apiPanelView === "all"}">全部接口</button>
      </div>
      <div class="api-truth-note"><strong>调用事实与支持范围分别核对</strong><span>App 两个业务分组共 37 项：19 项有调用链，18 项未接入。公共账号、头像和 AI 的支持范围待后端确认。此网页仅做本地交互演示。</span></div>
      <details class="api-evidence-note"><summary>查看来源与验证边界</summary>
        <p>${escapeHtml(apiBaseline.backend_scope)}</p><p>${escapeHtml(apiBaseline.base_url)}</p>
        <p>OpenAPI 采集：${escapeHtml(apiEvidence.captured_at)}。静态快照，不自动追踪服务器变更。</p>
        <p>${escapeHtml(apiBaseline.verification)}</p><p>${escapeHtml(apiBaseline.design)}</p>
        <p>核对记录：${escapeHtml(apiBaseline.evidence)}</p>
      </details>
      <div class="api-panel-actions">
        <button class="api-json-button" type="button" data-action="copy-api-panel-json">${icon("copy")}<span>复制${apiPanelView === "all" ? "全部" : "本页"} JSON</span></button>
        <button class="api-json-button" type="button" data-action="export-api-panel-json">${icon("download")}<span>导出${apiPanelView === "all" ? "全部" : "本页"} JSON</span></button>
      </div>
    </section>
    ${Object.entries(apiCategories).map(([category, meta]) => {
      const items = info.items.filter(item => item.category === category);
      if (!items.length) return "";
      return `<section class="api-card api-category-${category}" data-api-category="${category}">
        <div class="api-card-heading"><h3>${meta.label}</h3><span>${items.length} 项</span></div>
        <p class="api-category-hint">${meta.hint}</p>
        <div class="api-list">${items.map(api => renderApiDetails(api)).join("")}</div>
      </section>`;
    }).join("")}
    ${info.items.length ? "" : '<section class="api-card api-empty">这个演示页面尚未建立专属接口映射，可切换“全部接口”查看现行目录。</section>'}
  `;
}

function renderApiDetails(api) {
  const doc = api.document_key ? apiEvidence.operations[api.document_key] : null;
  const scopePending = !api.path?.startsWith("/app/") && api.category === "current";
  const label = api.category === "current" ? (scopePending ? "支持范围待确认" : "已接入调用链") : apiCategories[api.category].label;
  return `<details class="api-item" data-api-entry="${escapeHtml(api.id)}">
    <summary>
      <span class="api-method method-${api.method?.toLowerCase() || "tbd"}">${api.method || "待定"}</span>
      <span class="api-summary-text"><strong>${escapeHtml(api.title)}</strong>
        <code>${escapeHtml(api.path || (api.id === "avatar" ? "服务端返回的头像 URL" : "方法、路径和字段待确认"))}</code>
        <span class="api-status-label ${scopePending || api.category === "pending" ? "is-pending" : ""}">${label}</span>
      </span><span class="api-chevron">${icon("chevron-down")}</span>
    </summary>
    <div class="api-item-body">
      <p>${escapeHtml(api.note)}</p>
      <div class="api-json-actions">
        <button class="api-json-button" type="button" data-action="copy-api-json" data-api-id="${api.id}" aria-label="复制 ${escapeHtml(api.title)} JSON">${icon("copy")}复制 JSON</button>
        <button class="api-json-button" type="button" data-action="export-api-json" data-api-id="${api.id}" aria-label="导出 ${escapeHtml(api.title)} JSON">${icon("download")}导出 JSON</button>
      </div>
      <dl class="api-meta">
        <div><dt>App 状态</dt><dd>${escapeHtml(api.app_usage)}</dd></div>
        <div><dt>支持范围</dt><dd>${escapeHtml(api.backend_scope)}</dd></div>
        <div><dt>契约来源</dt><dd>${api.category === "requirement" ? "原型需求，尚无确认契约" : escapeHtml(doc ? `${doc.group} / ${doc.tags.join("、")} · ${doc.operation_id}` : api.contract_status)}</dd></div>
        ${api.source ? `<div><dt>代码依据</dt><dd>${escapeHtml(api.source)}</dd></div>` : ""}
      </dl>
      ${api.client_contract ? renderApiJsonBlock("客户端请求与解析边界", api.client_contract) : ""}
      ${doc ? `${renderApiJsonBlock("OpenAPI 请求字段（文档声明）", { parameters: doc.parameters, request_body: doc.request_body, schemas: apiSchemasFor(doc, [doc.parameters, doc.request_body]) })}
        ${renderApiJsonBlock("OpenAPI 响应字段（文档声明）", { responses: doc.responses, schemas: apiSchemasFor(doc, doc.responses) })}` : ""}
      <p class="api-verification-note">${escapeHtml(apiBaseline.verification)}</p>
    </div>
  </details>`;
}

function renderApiJsonBlock(title, value) {
  return `<details class="api-contract-fields"><summary>${escapeHtml(title)}</summary><pre tabindex="0" aria-label="${escapeHtml(title)}">${escapeHtml(JSON.stringify(value, null, 2))}</pre></details>`;
}

function apiSchemasFor(doc, value) {
  const schemas = {};
  function visit(item) {
    if (!item || typeof item !== "object") return;
    if (item.$ref) {
      const name = item.$ref.split("/").pop();
      if (!Object.hasOwn(schemas, name)) {
        schemas[name] = apiEvidence.schemas[doc.group][name];
        visit(schemas[name]);
      }
    }
    Object.values(item).forEach(visit);
  }
  visit(value);
  return schemas;
}

function apiPayload(api) {
  const doc = api.document_key ? apiEvidence.operations[api.document_key] : null;
  return {
    schema_version: 2, baseline: apiBaseline,
    ...api, category_label: apiCategories[api.category].label,
    document: doc ? { captured_at: apiEvidence.captured_at, source: apiEvidence.sources[doc.group], ...doc,
      schemas: apiSchemasFor(doc, doc) } : null,
  };
}

function currentApiPanelPayload() {
  const info = getApiPanelInfo();
  return {
    schema_version: 2, generated_from: "Eview Connect C App Prototype", baseline: apiBaseline,
    page: { key: info.key, title: info.title, route: state.route, modal: state.modal, view: apiPanelView },
    groups: Object.fromEntries(Object.entries(apiCategories).map(([key, meta]) => [key, {
      label: meta.label, description: meta.hint, apis: info.items.filter(api => api.category === key).map(apiPayload),
    }])),
  };
}

function apiPayloadFromElement(element) {
  const api = apiRegistry[element.dataset.apiId];
  return api ? apiPayload(api) : null;
}
