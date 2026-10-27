/* 地理围栏交互演示。坐标为离线示意画布坐标；不调用接口、地图服务或设备。 */
window.GeofenceDemo = (() => {
  const copy = value => JSON.parse(JSON.stringify(value));
  const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const stores = new Map(), connections = new Set();
  const places = [{name:"海棠社区",x:190,y:325},{name:"社区中心",x:260,y:190},{name:"绿园",x:130,y:235},{name:"学校",x:90,y:390},{name:"设备位置",x:205,y:345}];
  const maxSlots = 16, metersPerUnit = 8;
  let device, root, host, icon, rows = null, channel = "cloud", phase = "idle", selected = null;
  let draft = null, original = null, adding = false, pendingNew = false, active = false, operation = 0, timer;
  let notice = "", error = "", dialog = null, mode = "pan", history = [], selectedVertex = null, search = "", searchResult = null;
  let viewport = {x:200,y:300,span:320}, needFit = false, focusTarget = "";
  let pointers = new Map(), gesture = null, mapObserver = null;
  function seeds() {
    const polygon = (cx,cy,r,n) => Array.from({length:n},(_,i) => ({x:cx+Math.cos(i/n*Math.PI*2)*r,y:cy+Math.sin(i/n*Math.PI*2)*r}));
    return [
      {index:0,type:0,status:true,direction:0,radius:300,vertices:[{x:190,y:325}]},
      {index:1,type:1,status:true,direction:0,radius:0,vertices:polygon(260,190,34,8)},
      {index:2,type:1,status:true,direction:1,radius:0,vertices:polygon(130,235,27,4)},
      {index:3,type:1,status:false,direction:1,radius:0,vertices:polygon(90,390,31,3)},
    ];
  }
  function saved(id) { if (!stores.has(id)) stores.set(id,seeds()); return stores.get(id); }
  const title = f => `围栏 ${f.index+1}`;
  const detail = f => `${f.type === 0 ? `圆形 · 半径 ${f.radius} 米` : `多边形 · ${f.vertices.length} 个顶点`} · ${f.direction ? "进入" : "离开"}时提醒`;
  const owned = () => device?.permission === "owner";
  const busy = () => ["sending","confirming","verifying"].includes(phase);
  const dirty = () => draft && (adding || JSON.stringify(draft) !== JSON.stringify(original));
  const current = () => draft || rows?.find(f => f.index === selected);
  function stop() { operation++; clearTimeout(timer); pointers.clear(); gesture = null; }
  function leave() { mapObserver?.disconnect(); mapObserver = null; stop(); active = false; root = null; dialog = null; }
  function redraw() { if (active) host?.redraw(); }
  function open(nextDevice, options = {}) {
    stop(); device = nextDevice; channel = "cloud"; rows = null; phase = "idle"; active = true;
    selected = options.index ?? null; pendingNew = !!options.newFence; draft = original = null; adding = false;
    dialog = null; notice = error = ""; search = ""; searchResult = null; needFit = true; mode = "pan";
  }
  function later(ms, fn) { const token = operation; timer = setTimeout(() => { if (active && token === operation) fn(); },ms); }
  function read() {
    stop(); rows = null; draft = original = null; error = ""; phase = "loading"; redraw();
    later(430, () => {
      if (channel === "cloud" && device.status !== "online") { phase = "offline"; redraw(); return; }
      if (channel === "ble" && !connections.has(device.id)) { phase = "disconnected"; redraw(); return; }
      rows = copy(saved(device.id)); phase = "ready";
      if (selected !== null && !rows.some(f => f.index === selected)) selected = null;
      needFit = true;
      if (pendingNew) { pendingNew = false; create(); } else redraw();
    });
  }
  function connect() { stop(); phase = "connecting"; redraw(); later(650, () => { connections.add(device.id); read(); }); }
  function clearEdit() { draft = original = null; adding = false; mode = "pan"; error = ""; history = []; selectedVertex = null; search = ""; searchResult = null; }
  function switchChannel(next) { clearEdit(); channel = next; notice = ""; read(); }
  function channelRequest(next) {
    if (next === channel || busy()) return;
    if (dirty()) { dialog = {kind:"channel",next,returnFocus:`[data-gf-channel="${next}"]`}; redraw(); }
    else switchChannel(next);
  }
  function create() {
    if (!owned()) return;
    if (phase !== "ready") { pendingNew = true; return; }
    const index = Array.from({length:maxSlots},(_,i)=>i).find(i => !rows.some(f => f.index === i));
    if (index === undefined) { notice = "已达到 16 个围栏，请先删除不再使用的围栏。"; redraw(); return; }
    selected = index; adding = true; original = null;
    draft = {index,type:0,status:true,direction:0,radius:500,vertices:[{x:205,y:345}]};
    mode = "pan"; history = []; needFit = true; error = ""; notice = ""; redraw();
  }
  function edit() { if (!owned() || phase !== "ready") return; original = copy(current()); draft = copy(original); adding = false; history = []; mode = "pan"; error = ""; needFit = true; redraw(); }
  function back() {
    if (busy()) return;
    if (dirty()) { dialog = {kind:"back",returnFocus:'[data-gf-action="cancel"]'}; redraw(); return; }
    goBack();
  }
  function goBack() {
    if (draft) { const isNew = adding; clearEdit(); if (isNew) selected = null; redraw(); }
    else if (selected !== null) { selected = null; search = ""; notice = ""; redraw(); }
    else { leave(); host.back(); }
  }
  function checkpoint() { history.push(copy(draft)); if (history.length > 40) history.shift(); }
  function changeShape(type) {
    if (!draft || draft.type === type) return;
    checkpoint(); const pts = draft.vertices;
    const center = pts.length ? {x:pts.reduce((s,p)=>s+p.x,0)/pts.length,y:pts.reduce((s,p)=>s+p.y,0)/pts.length} : {x:205,y:345};
    draft.type = type; draft.vertices = type === 0 ? [center] : []; draft.radius = type === 0 ? 500 : 0;
    mode = type ? "add" : "pan"; selectedVertex = null; error = ""; redraw();
  }
  function validate(f) {
    if (!f.vertices.length) return f.type ? "请在地图上添加至少 3 个顶点。" : "请先选择围栏中心。";
    if (f.type === 0 && (!Number.isInteger(f.radius) || f.radius < 100 || f.radius > 65535)) return "半径请输入 100–65535 之间的整数米。";
    if (f.type === 1) {
      if (f.vertices.length < 3 || f.vertices.length > 10) return "多边形需要 3–10 个顶点。";
      const p = f.vertices, area = Math.abs(p.reduce((s,a,i) => { const b=p[(i+1)%p.length]; return s+a.x*b.y-b.x*a.y; },0))/2;
      const cross=(a,b,c)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
      for(let i=0;i<p.length;i++) for(let j=i+1;j<p.length;j++) {
        if(j===i+1 || (i===0 && j===p.length-1)) continue;
        const a=p[i],b=p[(i+1)%p.length],c=p[j],d=p[(j+1)%p.length];
        if(cross(a,b,c)*cross(a,b,d)<=0 && cross(c,d,a)*cross(c,d,b)<=0 && Math.max(a.x,b.x)>=Math.min(c.x,d.x) && Math.max(c.x,d.x)>=Math.min(a.x,b.x) && Math.max(a.y,b.y)>=Math.min(c.y,d.y) && Math.max(c.y,d.y)>=Math.min(a.y,b.y)) return "围栏边界不能交叉，请调整顶点。";
      }
      if (area < 2) return "围栏范围过小，请拉开顶点后重试。";
    }
    return "";
  }
  function save(remove = false) {
    if (busy() || !owned() || phase !== "ready" || (!remove && !draft)) return;
    if (!remove) { error = validate(draft); if(error) { redraw(); focusTarget = draft.type ? "[data-gf-map]" : "[data-gf-radius]"; root?.querySelector(focusTarget)?.focus(); return; } }
    if (remove && (!current() || !rows?.some(f=>f.index===current().index))) return;
    const next = copy(remove ? current() : draft), id = device.id;
    phase = "sending"; dialog = null; error = ""; redraw();
    later(330, () => { phase = "confirming"; redraw(); later(330, () => { phase = "verifying"; redraw(); later(360, () => {
      const all = saved(id), rest = all.filter(f => f.index !== next.index);
      if (!remove) rest.push(next);
      stores.set(id,rest.sort((a,b)=>a.index-b.index)); rows = copy(saved(id)); phase = "ready";
      clearEdit(); selected = remove ? null : next.index; needFit = true;
      notice = remove ? "已删除围栏（演示）" : "已保存并核对（演示）"; redraw();
    }); }); });
  }
  function controls() {
    return `<div class="gf-channel-row"><div class="gf-channel-status"><span class="gf-dot ${phase === "offline" || phase === "disconnected" ? "unavailable" : ""}"></span><span>${channel === "cloud" ? (device.status === "online" ? "设备在线" : "设备离线") : (connections.has(device.id) ? "蓝牙已连接" : "蓝牙未连接")}</span></div><div class="gf-channel" role="group" aria-label="连接方式">${[["cloud","网络"],["ble","蓝牙"]].map(([value,label])=>`<button type="button" data-gf-channel="${value}" aria-pressed="${channel===value}" ${busy()?"disabled":""}>${icon(value === "cloud" ? "cloud" : "bluetooth")}${label}</button>`).join("")}</div></div>`;
  }
  function row(f, compact = false) {
    return `<button type="button" class="gf-row" ${compact ? `data-action="open-geofence" data-geofence-index="${f.index}"` : `data-gf-open="${f.index}"`} aria-label="查看${title(f)}，${detail(f)}，${f.status ? "已启用" : "已停用"}"><span class="gf-row-shape ${f.status?"":"inactive"}">${icon(f.type ? "pentagon" : "circle-dashed")}</span><span class="gf-row-copy"><span class="gf-row-heading"><strong>${title(f)}</strong><span class="gf-status ${f.status?"":"inactive"}">${f.status ? "已启用" : "已停用"}</span></span><span class="gf-row-detail">${detail(f)}</span></span>${icon("chevron-right")}</button>`;
  }
  function preview(nextDevice, drawIcon) { icon = drawIcon; return `<div class="gf-preview-list">${saved(nextDevice.id).slice(0,2).map(f=>row(f,true)).join("")}</div>`; }
  function render(nextDevice, drawIcon) {
    device = nextDevice; icon = drawIcon;
    const f = current(), mapPage = selected !== null && !!f && (phase === "ready" || busy());
    const loading = ["idle","loading","connecting"].includes(phase);
    const heading = mapPage ? (adding ? "新建围栏" : title(f)) : "安全围栏";
    return `<section class="gf-page ${mapPage ? "gf-map-page" : "gf-list-page"}" aria-label="安全围栏"><header class="gf-header"><div class="status-bar"><span>09:41</span><span>${icon("wifi")}${icon("battery-medium")}</span></div><div class="gf-header-line"><button type="button" class="gf-icon-button" data-gf-action="back" aria-label="${draft ? "取消编辑" : mapPage ? "返回围栏列表" : "返回设备"}" ${busy()?"disabled":""}>${icon("chevron-left")}</button><div class="gf-header-title"><h1>${heading}</h1><p>${esc(device.name)}</p></div>${mapPage ? (adding ? `<span class="gf-header-spacer"></span>` : `<button type="button" class="gf-text-button" data-gf-action="${draft?"more":"edit"}" ${busy()||!owned()?"disabled":""} aria-label="${draft?"围栏更多操作":"编辑围栏"}">${draft?icon("ellipsis"):"编辑"}</button>`) : `<button type="button" class="gf-text-button" data-gf-action="new" ${phase!=="ready" || !owned() || rows?.length>=maxSlots?"disabled":""}>${icon("plus")}新建</button>`}</div></header>${controls()}
    ${mapPage ? mapPageMarkup(f) : `<div class="gf-list-body">${loading ? `<div class="gf-state" role="status"><span class="gf-spinner"></span><strong>${phase==="connecting"?"正在连接蓝牙":"正在读取围栏"}</strong><p>通过${channel==="cloud"?"网络":"蓝牙"}获取设备当前配置</p></div>` : phase !== "ready" ? `<div class="gf-state" role="status">${icon(channel === "ble" ? "bluetooth-off" : "cloud-off")}<strong>${phase==="disconnected"?"请先连接蓝牙":"围栏读取失败"}</strong><p>${phase==="disconnected"?"连接附近的设备后，读取当前围栏。":"设备离线，等待上线后重试，或切换蓝牙。"}</p><button type="button" class="gf-primary" data-gf-action="${phase==="disconnected"?"connect":"retry"}">${phase==="disconnected"?"连接蓝牙":"重新读取"}</button></div>` : `<div class="gf-list-caption"><span>已设置 ${rows.length} / ${maxSlots}<span class="gf-caption-separator">·</span>${rows.filter(f=>f.status).length} 个启用</span><button type="button" class="gf-icon-button" data-gf-action="retry" aria-label="重新读取围栏">${icon("refresh-cw")}</button></div>${rows.length ? `<div class="gf-list" aria-label="已设置的围栏">${rows.map(f=>row(f)).join("")}</div><p class="gf-list-hint">停用会保留范围，删除会移除这个围栏。</p>` : `<div class="gf-state">${icon("shield-plus")}<strong>还没有安全围栏</strong><p>设置安全区域，在进入或离开时提醒。</p><button type="button" class="gf-primary" data-gf-action="new" ${!owned()?"disabled":""}>新建围栏</button></div>`}`}${notice ? `<p class="gf-notice" role="status">${icon("check-circle-2")}${esc(notice)}</p>`:""}${!owned()?'<p class="gf-access-note">共享设备当前仅可查看围栏。</p>':""}</div><footer class="gf-demo-caption">合成数据 · 原型交互演示</footer>`}
    ${dialog ? dialogMarkup() : ""}</section>`;
  }
  function mapPageMarkup(f) {
    const editing = !!draft;
    return `<div class="gf-map-wrap">${editing ? `<form class="gf-search" data-gf-search-form><label>${icon("search")}<input type="search" data-gf-search aria-label="搜索地点" placeholder="搜索地点或地址" value="${esc(search)}" autocomplete="off" ${busy()?"disabled":""}></label><button type="submit" class="gf-text-button" ${busy()?"disabled":""}>搜索</button></form>` : ""}${searchResult ? `<div class="gf-search-result" role="status">${esc(searchResult)}</div>` : ""}<svg class="gf-map" data-gf-map role="application" aria-live="off" tabindex="0" aria-label="${editing?"围栏编辑地图":"围栏查看地图"}，可拖动与缩放，方向键移动地图" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet">${baseMap()}<g data-gf-overlay></g></svg><div class="gf-map-tools">${[["zoom-in","plus","放大地图"],["zoom-out","minus","缩小地图"],["fit","scan","查看完整围栏"],["device","locate-fixed","回到设备位置"]].map(([action,glyph,label])=>`<button type="button" data-gf-action="${action}" aria-label="${label}">${icon(glyph)}</button>`).join("")}</div><span class="gf-map-caption">合成地图 · 仅示意范围</span>${editing ? `<p class="gf-map-instruction" data-gf-instruction>${instruction()}</p>` : ""}</div>
    <section class="gf-inspector" aria-label="${editing?"编辑围栏设置":"围栏设置"}" aria-busy="${busy()}">${editing ? `<fieldset class="gf-shapes" ${busy()?"disabled":""}><legend class="gf-sr-only">围栏形状</legend>${[[0,"circle-dashed","圆形"],[1,"pentagon","多边形"]].map(([type,glyph,label])=>`<button type="button" data-gf-shape="${type}" aria-pressed="${f.type===type}">${icon(glyph)}${label}</button>`).join("")}</fieldset>${f.type === 0 ? `<div class="gf-radius-heading"><label for="gf-radius">围栏半径</label><span><input id="gf-radius" data-gf-radius type="number" min="100" max="65535" step="1" inputmode="numeric" value="${f.radius}" ${busy()?"disabled":""}> 米</span></div><input class="gf-radius-slider" data-gf-radius-slider type="range" min="0" max="1000" step="1" value="${radiusToSlider(f.radius)}" aria-label="调整围栏半径" aria-valuetext="${f.radius}米" ${busy()?"disabled":""}><div class="gf-radius-presets">${[100,300,500,1000].map(n=>`<button type="button" data-gf-preset="${n}" aria-pressed="${f.radius===n}" ${busy()?"disabled":""}>${n} 米</button>`).join("")}</div>` : `<div class="gf-polygon-actions"><span data-gf-point-count>${f.vertices.length} / 10 个顶点</span><button type="button" class="gf-text-button" data-gf-action="add-point" aria-pressed="${mode==="add"}" ${busy()?"disabled":""}>${icon("plus")}添加</button><button type="button" class="gf-text-button" data-gf-action="undo" ${!history.length||busy()?"disabled":""}>${icon("undo-2")}撤销</button><button type="button" class="gf-icon-button" data-gf-action="remove-point" aria-label="删除选中的顶点" ${selectedVertex===null||busy()?"disabled":""}>${icon("trash-2")}</button></div>`}
    <div class="gf-setting-row"><label for="gf-direction">提醒条件</label><select id="gf-direction" data-gf-direction ${busy()?"disabled":""}><option value="0" ${f.direction===0?"selected":""}>离开时提醒</option><option value="1" ${f.direction===1?"selected":""}>进入时提醒</option></select></div><div class="gf-setting-row"><span id="gf-enabled-label">启用围栏</span><button type="button" role="switch" class="gf-switch" data-gf-action="toggle" aria-labelledby="gf-enabled-label" aria-checked="${f.status}" ${busy()?"disabled":""}><span></span></button></div>${error?`<p class="gf-error" role="alert">${icon("circle-alert")}${esc(error)}</p>`:""}<div class="gf-edit-footer">${busy()?`<p class="gf-saving" role="status"><span class="gf-spinner"></span>${{sending:"正在下发配置…",confirming:"等待设备确认…",verifying:"正在核对实际值…"}[phase]}</p>`:`<button type="button" class="gf-secondary" data-gf-action="cancel">取消</button><button type="button" class="gf-primary" data-gf-action="save" ${!dirty()?"disabled":""}>保存围栏</button>`}</div>`
    : `${!owned()?'<p class="gf-access-note">当前分享权限仅可查看围栏。</p>':""}<div class="gf-detail-heading"><h2>${f.type ? "多边形范围" : `半径 ${f.radius} 米`}</h2><span class="gf-status ${f.status?"":"inactive"}">${f.status?"已启用":"已停用"}</span></div><p class="gf-detail-direction">${icon(f.direction?"log-in":"log-out")}${f.direction?"进入":"离开"}时提醒${f.type ? ` · ${f.vertices.length} 个顶点` : " · 圆形围栏"}</p><div class="gf-detail-actions">${busy()?`<p class="gf-saving" role="status"><span class="gf-spinner"></span>${{sending:"正在下发配置…",confirming:"等待设备确认…",verifying:"正在核对实际值…"}[phase]}</p>`:`<span>可拖动或缩放查看范围</span><button type="button" class="gf-text-button gf-danger" data-gf-action="delete" ${!owned()?"disabled":""}>删除围栏</button>`}</div>${notice?`<p class="gf-notice" role="status">${icon("check-circle-2")}${esc(notice)}</p>`:""}`}</section>`;
  }
  function dialogMarkup() {
    const text = dialog.kind === "delete" ? ["删除这个围栏？","删除后将不再监测这个区域，其他围栏保持不变。","删除围栏"] : dialog.kind === "channel" ? ["放弃修改并切换？",`将放弃未保存的修改，通过${dialog.next==="cloud"?"网络":"蓝牙"}重新读取设备围栏。`,"放弃并切换"] : dialog.kind === "more" ? ["围栏操作","删除后会移除设备中的这个围栏。","删除围栏"] : ["放弃本次修改？","尚未保存的范围和提醒设置将被丢弃。","放弃修改"];
    return `<div class="gf-dialog-backdrop"><section class="gf-dialog" role="dialog" aria-modal="true" aria-labelledby="gf-dialog-title"><h2 id="gf-dialog-title">${text[0]}</h2><p>${text[1]}</p><div><button type="button" class="gf-secondary" data-gf-action="dialog-cancel">${["delete","more"].includes(dialog.kind)?"取消":"继续编辑"}</button><button type="button" class="gf-primary ${["delete","more"].includes(dialog.kind)?"gf-destructive":""}" data-gf-action="dialog-confirm">${text[2]}</button></div></section></div>`;
  }
  function baseMap() {
    return `<g class="gf-basemap" pointer-events="none"><rect class="gf-map-land" x="-100000" y="-100000" width="200000" height="200000"/><path class="gf-water" d="M325 -100 C230 80 370 160 290 290 S360 470 290 700 L420 700 Q400 450 350 300 T410 -100Z"/><path class="gf-park" d="M70 160L175 145 198 250 102 285 65 228Z"/><path class="gf-park" d="M215 375L293 380 288 469 207 453Z"/><g class="gf-blocks"><path d="M40 305h60v45H40z M112 308h36v24h-36z M170 290h36v30h-36z M210 278h24v35h-24z M217 151h40v25h-40z M225 195h48v34h-48z M57 365h55v40H57z M125 365h39v30h-39z M176 367h28v38h-28z"/></g><g class="gf-roads-edge"><path d="M-100 120L500 370 M-100 350L500 220 M180 -100L190 150 135 400 145 800 M-100 470L600 480 M-100 295L500 430 M50 -100L60 700 M-100 175L500 130"/></g><g class="gf-roads"><path d="M-100 120L500 370 M-100 350L500 220 M180 -100L190 150 135 400 145 800 M-100 470L600 480 M-100 295L500 430 M50 -100L60 700 M-100 175L500 130"/></g><g class="gf-map-labels"><text x="115" y="210">绿园</text><text x="220" y="185">社区中心</text><text x="150" y="350">海棠社区</text><text x="70" y="414">学校</text><text x="230" y="430">运动公园</text><text x="335" y="345" transform="rotate(-78 335 345)">海棠河</text></g><g class="gf-device-location"><circle cx="205" cy="345" r="5"/><circle cx="205" cy="345" r="2"/></g></g>`;
  }
  function instruction() { return draft?.type ? (mode === "add" ? "点击地图添加顶点，拖动顶点调整边界" : "拖动顶点调整边界，或点击“添加”继续选点") : "拖动中心点调整位置，缩放地图不会改变半径"; }
  function validRadius() { return Number.isFinite(draft?.radius) && draft.radius > 0 ? draft.radius : 300; }
  function radiusToSlider(radius) { return Math.round(Math.log(Math.max(100,Number(radius)||100)/100)/Math.log(655.35)*1000); }
  function clearError() { error=""; root?.querySelector(".gf-error")?.remove(); }
  function setRadius(value) {
    if (!draft || busy()) return;
    draft.radius = value === "" ? null : Number(value); clearError(); paint();
    root.querySelectorAll("[data-gf-preset]").forEach(b=>b.setAttribute("aria-pressed",String(Number(b.dataset.gfPreset)===draft.radius)));
    const slider=root.querySelector("[data-gf-radius-slider]"); slider.value=radiusToSlider(draft.radius); slider.setAttribute("aria-valuetext",`${draft.radius??0}米`);
    root.querySelector('[data-gf-action="save"]').disabled=!dirty();
  }
  function svgSize() { const svg=root?.querySelector("[data-gf-map]"); const r=svg?.getBoundingClientRect(); return {svg,width:r?.width||360,height:r?.height||300}; }
  function fit() {
    const f=current(); if(!f || !f.vertices.length) return;
    const pts=f.vertices, r=f.type===0 ? Math.max(100,f.radius||300)/metersPerUnit : 0;
    const xMin=Math.min(...pts.map(p=>p.x))-r,xMax=Math.max(...pts.map(p=>p.x))+r;
    const yMin=Math.min(...pts.map(p=>p.y))-r,yMax=Math.max(...pts.map(p=>p.y))+r;
    const s=svgSize(),top=draft?70:16,bottom=draft?64:24,usableHeight=Math.max(70,s.height-top-bottom);
    const span=Math.max(100,(xMax-xMin)*1.65,(yMax-yMin)*1.45*s.width/usableHeight);
    viewport={x:(xMin+xMax)/2,y:(yMin+yMax)/2-(top-bottom)/2*span/s.width,span}; paint();
  }
  function paint() {
    if(!root?.isConnected) return;
    const f=current(),s=svgSize(); if(!s.svg||!f) return;
    const height=viewport.span*s.height/s.width, unit=viewport.span/s.width;
    s.svg.setAttribute("viewBox",`${viewport.x-viewport.span/2} ${viewport.y-height/2} ${viewport.span} ${height}`);
    s.svg.style.setProperty("--gf-map-unit",unit); s.svg.style.setProperty("--gf-label-size",`${11*unit}px`);
    const pts=f.vertices, geometry=f.type===0 && pts.length ? `<circle class="gf-boundary ${f.status?"":"inactive"}" cx="${pts[0].x}" cy="${pts[0].y}" r="${(draft?validRadius():f.radius)/metersPerUnit}"/>` : pts.length ? `<${pts.length>2?"polygon":"polyline"} class="gf-boundary ${f.status?"":"inactive"}" points="${pts.map(p=>`${p.x},${p.y}`).join(" ")}"/>` : "";
    root.querySelector("[data-gf-overlay]").innerHTML=geometry+(draft ? pts.map((p,i)=>`<g class="gf-vertex ${selectedVertex===i?"selected":""}" data-gf-vertex="${i}" role="button" tabindex="${busy()?-1:0}" aria-label="${f.type?`顶点 ${i+1}，方向键移动，Delete 删除`:"围栏中心，方向键移动"}" transform="translate(${p.x},${p.y})"><circle class="gf-vertex-hit" r="${22*unit}"/><circle r="${10*unit}"/><text font-size="${11*unit}" dy="${4*unit}">${f.type?i+1:""}</text>${f.type?"":`<path d="M${-4*unit} 0H${4*unit}M0 ${-4*unit}V${4*unit}"/>`}</g>`).join("") : "");
    const count=root.querySelector("[data-gf-point-count]");if(count)count.textContent=`${pts.length} / 10 个顶点`;
    const undo=root.querySelector('[data-gf-action="undo"]');if(undo)undo.disabled=!history.length||busy();
    const remove=root.querySelector('[data-gf-action="remove-point"]');if(remove)remove.disabled=selectedVertex===null||busy();
    const saveButton=root.querySelector('[data-gf-action="save"]');if(saveButton)saveButton.disabled=!dirty();
  }
  function mapPoint(clientX,clientY) {
    const s=svgSize(),r=s.svg.getBoundingClientRect(),height=viewport.span*s.height/s.width;
    return {x:viewport.x+(clientX-r.left-r.width/2)*viewport.span/r.width,y:viewport.y+(clientY-r.top-r.height/2)*height/r.height};
  }
  function zoom(factor) { viewport.span=Math.max(35,Math.min(30000,viewport.span*factor)); paint(); }
  function confirmDialog() {
    const d=dialog;dialog=null;
    if(d.kind==="channel") switchChannel(d.next);
    else if(d.kind==="back") { const newItem=adding;clearEdit();if(newItem)selected=null;redraw(); }
    else if(d.kind==="more") { dialog={kind:"delete"};redraw(); }
    else save(true);
  }
  function mount(callbacks) {
    host=callbacks;mapObserver?.disconnect();mapObserver=null;root=document.querySelector(".gf-page"); if(!root) return;active=true;
    root.addEventListener("click",event=>{
      const b=event.target.closest("button");if(!b||b.disabled)return;
      if(busy()&&!["zoom-in","zoom-out","fit","device"].includes(b.dataset.gfAction))return;
      if(b.dataset.gfChannel){channelRequest(b.dataset.gfChannel);return;}
      if(b.dataset.gfOpen!==undefined){selected=Number(b.dataset.gfOpen);clearEdit();needFit=true;notice="";redraw();return;}
      if(b.dataset.gfShape!==undefined){changeShape(Number(b.dataset.gfShape));return;}
      if(b.dataset.gfPreset){setRadius(b.dataset.gfPreset);root.querySelector("[data-gf-radius]").value=draft.radius;fit();return;}
      switch(b.dataset.gfAction){
        case "back":case "cancel":back();break;
        case "new":create();break;
        case "retry":read();break;
        case "connect":connect();break;
        case "edit":edit();break;
        case "more":dialog={kind:"more"};redraw();break;
        case "delete":dialog={kind:"delete"};redraw();break;
        case "dialog-cancel":focusTarget=dialog.returnFocus||'[data-gf-action="edit"]';dialog=null;redraw();break;
        case "dialog-confirm":confirmDialog();break;
        case "toggle":draft.status=!draft.status;redraw();break;
        case "save":save();break;
        case "add-point":mode=mode==="add"?"pan":"add";redraw();break;
        case "undo":if(history.length){draft=history.pop();selectedVertex=null;error="";redraw();}break;
        case "remove-point":if(selectedVertex!==null){checkpoint();draft.vertices.splice(selectedVertex,1);selectedVertex=null;error="";redraw();}break;
        case "zoom-in":zoom(.75);break;
        case "zoom-out":zoom(1/.75);break;
        case "fit":fit();break;
        case "device":viewport.x=205;viewport.y=345;paint();break;
      }
    });
    root.querySelector("[data-gf-radius]")?.addEventListener("input",e=>setRadius(e.target.value));
    root.querySelector("[data-gf-radius-slider]")?.addEventListener("input",e=>{setRadius(String(Math.round(100*Math.pow(655.35,Number(e.target.value)/1000))));root.querySelector("[data-gf-radius]").value=draft.radius;});
    root.querySelector("[data-gf-direction]")?.addEventListener("change",e=>{draft.direction=Number(e.target.value);root.querySelector('[data-gf-action="save"]').disabled=!dirty();});
    root.querySelector("[data-gf-search]")?.addEventListener("input",e=>{search=e.target.value;});
    root.querySelector("[data-gf-search-form]")?.addEventListener("submit",e=>{
      e.preventDefault();search=root.querySelector("[data-gf-search]").value.trim();
      const result=search?places.find(p=>p.name.includes(search)):null;
      searchResult=result?`已定位到${result.name}，围栏范围保持不变`:"没有匹配的示意地点，试试海棠社区、绿园或学校。";
      if(result){viewport.x=result.x;viewport.y=result.y;viewport.span=180;}redraw();
    });
    const svg=root.querySelector("[data-gf-map]");
    if(svg){
      svg.addEventListener("pointerdown",e=>{
        if(e.button!==0)return;
        svg.setPointerCapture(e.pointerId);pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
        if(pointers.size===2){const a=[...pointers.values()];gesture={kind:"pinch",distance:Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y),span:viewport.span};return;}
        const vertex=e.target.closest("[data-gf-vertex]");
        gesture={kind:vertex&&draft&&!busy()?"vertex":"pan",index:vertex?Number(vertex.dataset.gfVertex):null,x:e.clientX,y:e.clientY,viewport:{...viewport},moved:false};
        if(gesture.kind==="vertex"){selectedVertex=gesture.index;checkpoint();}
      });
      svg.addEventListener("pointermove",e=>{
        if(!pointers.has(e.pointerId)||!gesture)return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
        if(pointers.size===2&&gesture.kind==="pinch"){const a=[...pointers.values()],d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);viewport.span=Math.max(35,Math.min(30000,gesture.span*gesture.distance/Math.max(1,d)));paint();return;}
        if(gesture.kind==="pinch")return;
        const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;if(Math.hypot(dx,dy)>3)gesture.moved=true;
        if(gesture.kind==="vertex"&&draft&&!busy()){const p=mapPoint(e.clientX,e.clientY);draft.vertices[gesture.index]={x:p.x,y:p.y};clearError();}
        else {const s=svgSize();viewport.x=gesture.viewport.x-dx*gesture.viewport.span/s.width;viewport.y=gesture.viewport.y-dy*gesture.viewport.span/s.width;}
        paint();
      });
      const up=e=>{
        if(!pointers.has(e.pointerId))return;pointers.delete(e.pointerId);
        if(!pointers.size&&gesture?.kind==="pan"&&!gesture.moved&&draft?.type===1&&mode==="add"&&!busy()){
          if(draft.vertices.length>=10){error="最多添加 10 个顶点。";redraw();}
          else {checkpoint();draft.vertices.push(mapPoint(e.clientX,e.clientY));selectedVertex=draft.vertices.length-1;clearError();paint();}
        }
        if(!pointers.size){gesture=null;paint();}
      };
      svg.addEventListener("pointerup",up);svg.addEventListener("pointercancel",e=>{pointers.delete(e.pointerId);gesture=null;});
      svg.addEventListener("wheel",e=>{e.preventDefault();zoom(e.deltaY>0?1.12:1/1.12);},{passive:false});
      svg.addEventListener("keydown",e=>{
        const vertex=e.target.closest("[data-gf-vertex]"),moves={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
        if(moves[e.key]){e.preventDefault();const [dx,dy]=moves[e.key],step=viewport.span/80;
          if(vertex&&draft&&!busy()){checkpoint();const i=Number(vertex.dataset.gfVertex);selectedVertex=i;draft.vertices[i].x+=dx*step;draft.vertices[i].y+=dy*step;paint();root.querySelector(`[data-gf-vertex="${i}"]`)?.focus();}
          else {viewport.x+=dx*step*3;viewport.y+=dy*step*3;paint();}
        }else if(vertex&&draft?.type===1&&!busy()&&["Delete","Backspace"].includes(e.key)){e.preventDefault();checkpoint();draft.vertices.splice(Number(vertex.dataset.gfVertex),1);selectedVertex=null;paint();svg.focus();}
        else if(e.key==="+"||e.key==="="){e.preventDefault();zoom(.75);}else if(e.key==="-"){e.preventDefault();zoom(1/.75);}else if(e.key==="Home"){e.preventDefault();fit();}
      });
      if(needFit){needFit=false;fit();}else paint();
      mapObserver=new ResizeObserver(()=>paint());mapObserver.observe(svg);
    }
    root.addEventListener("keydown",e=>{
      if(e.key==="Escape"&&!busy()){e.preventDefault();if(dialog){focusTarget=dialog.returnFocus||'[data-gf-action="edit"]';dialog=null;redraw();}else back();}
      if(dialog&&e.key==="Tab"){const buttons=[...root.querySelectorAll('[role="dialog"] button')];const a=buttons.indexOf(document.activeElement);if((e.shiftKey&&a<=0)||(!e.shiftKey&&a===buttons.length-1)){e.preventDefault();buttons[e.shiftKey?buttons.length-1:0]?.focus();}}
    });
    if(dialog)root.querySelector('[data-gf-action="dialog-cancel"]')?.focus();
    else if(focusTarget){root.querySelector(focusTarget)?.focus({preventScroll:true});focusTarget="";}
    if(phase==="idle")queueMicrotask(()=>{if(active&&phase==="idle")read();});
  }
  function reset(){leave();stores.clear();connections.clear();channel="cloud";selected=null;draft=original=null;phase="idle";rows=null;}
  return {open,render,mount,leave,reset,preview};
})();
