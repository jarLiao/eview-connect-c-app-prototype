/* 独立的合成轨迹演示；不请求地图、服务器或设备。 */
window.TrackHistory = (() => {
  const pad = n => String(n).padStart(2, "0");
  const dayKey = date => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const today = dayKey(new Date());
  function offsetDay(offset) { const d = new Date(`${today}T12:00:00`); d.setDate(d.getDate() + offset); return dayKey(d); }
  const yesterday = offsetDay(-1);
  const locations = [
    ["08:10:00", 112, 360, "GPS", "海棠路西侧"], ["08:14:00", 160, 360, "GPS", "海棠路步道"],
    ["08:18:00", 210, 360, "WiFi", "公园南门附近"], ["08:22:00", 254, 360, "GPS", "公园南侧步道"],
    ["08:26:00", 280, 324, "GPS", "公园西侧步道"], ["08:30:00", 280, 280, "GPS", "湖畔步道"],
    ["08:34:00", 320, 248, "GPS", "湖畔北侧"], ["08:38:00", 374, 248, "WiFi", "公园休息区附近"],
    ["09:12:00", 452, 180, "GPS", "林荫路步道"], ["09:16:00", 504, 180, "GPS", "公园东门附近"],
    ["09:20:00", 548, 212, "BLE", "东门连廊附近"], ["09:24:00", 570, 262, "GPS", "滨河路北侧"],
    ["09:28:00", 570, 310, "GPS", "滨河路步道"], ["09:32:00", 570, 360, "GPS", "滨河路口"],
    ["09:36:00", 620, 360, "WiFi", "邻里中心附近"], ["09:40:00", 656, 360, "GPS", "邻里中心东侧"],
  ];
  let deviceId = "", selectedDay = today, cursor = 0, playing = false, speed = 1, expanded = false;
  let filters = { from: "00:00", to: "23:59", types: ["GPS", "WiFi", "BLE"] };
  let frame = 0, previousFrame = 0, root, host, overlay = "", zoom = 1, lastSelected = -1;
  let drawIcon, ignoreHandleClickUntil = 0, focusAfterRender = "";
  const minutes = value => Number(value.slice(0, 2)) * 60 + Number(value.slice(3, 5));
  const source = () => {
    if (!host?.device || host.device.hasReported === false) return [];
    const points = locations.map((p, i) => ({ id: `demo-${i}`, time: p[0], x: p[1], y: p[2], type: p[3], address: p[4], segment: i < 8 ? 0 : 1 }));
    if (selectedDay === today) return points;
    if (selectedDay === yesterday) return points.slice(0, 8);
    if (selectedDay === offsetDay(-3)) return points.slice(0, 1);
    return [];
  };
  const records = () => source().filter(p => minutes(p.time) >= minutes(filters.from) && minutes(p.time) <= minutes(filters.to) && filters.types.includes(p.type));
  const isFiltered = () => filters.from !== "00:00" || filters.to !== "23:59" || filters.types.length !== 3;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const dateLabel = () => `${Number(selectedDay.slice(5, 7))}月${Number(selectedDay.slice(8, 10))}日`;
  const time = value => value.slice(0, 5);
  function pause() { playing = false; cancelAnimationFrame(frame); frame = 0; previousFrame = 0; }
  function leave() { pause(); overlay = ""; }
  function redraw() { host.redraw(); }
  function select(index) { pause(); cursor = Math.max(0, Math.min(index, records().length - 1)); update(true); }
  function setDay(value, focusAction = "date") {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value < "2000-01-01" || value > today || dayKey(new Date(`${value}T12:00:00`)) !== value) return;
    pause(); selectedDay = value; cursor = 0; zoom = 1; overlay = ""; focusAfterRender = focusAction; redraw();
  }
  function mapMarkup(points) {
    const paths = [];
    points.forEach((point, index) => {
      const previous = points[index - 1];
      // 时间缺口和定位类型过滤形成的缺点均不强行连线。
      if (previous && point.segment === previous.segment && Number(point.id.slice(5)) === Number(previous.id.slice(5)) + 1)
        paths.push(`<path d="M${previous.x},${previous.y} L${point.x},${point.y}" data-route-edge="${index}" class="track-route-edge"/>`);
    });
    return `<svg class="history-map-svg" viewBox="0 0 720 500" role="group" aria-label="演示区域轨迹示意地图">
      <rect width="720" height="500" class="track-map-ground"/>
      <path d="M0 60 H720 M0 360 H720 M90 0 V500 M570 0 V500" class="track-map-road-border"/>
      <path d="M0 60 H720 M0 360 H720 M90 0 V500 M570 0 V500" class="track-map-road"/>
      <rect x="152" y="108" width="348" height="200" rx="42" class="track-map-park"/>
      <path d="M185 280 Q230 135 360 155 T458 260" class="track-map-trail"/>
      <ellipse cx="358" cy="205" rx="63" ry="30" class="track-map-water"/>
      <rect x="604" y="113" width="82" height="80" rx="8" class="track-map-building"/>
      <rect x="604" y="240" width="82" height="62" rx="8" class="track-map-building"/>
      <rect x="155" y="402" width="90" height="62" rx="8" class="track-map-building"/>
      <text x="198" y="145" class="track-map-label">海棠公园</text><text x="325" y="210" class="track-map-label">湖畔</text>
      <text x="288" y="397" class="track-map-road-label">海 棠 路</text><text x="601" y="217" class="track-map-label">邻里中心</text>
      <g class="track-route">${paths.join("")}</g>
      ${points.map((p, i) => `<g class="track-map-point" role="button" tabindex="0" data-track-point="${i}" aria-label="位置 ${i + 1}，${time(p.time)}，${escape(p.address)}" aria-pressed="false"><circle class="track-point-hit" cx="${p.x}" cy="${p.y}" r="22"/><circle class="track-point-dot" cx="${p.x}" cy="${p.y}" r="${i === 0 || i === points.length - 1 ? 8 : 5}"/>${i === 0 || i === points.length - 1 ? `<text class="track-end-label" x="${p.x}" y="${p.y + 30}">${i === 0 ? "起" : "终"}</text>` : ""}</g>`).join("")}
      <g data-track-cursor class="track-cursor" aria-hidden="true" ${points.length ? "" : "hidden"}><circle r="17" class="track-cursor-halo"/><circle r="9" class="track-cursor-dot"/></g>
    </svg>`;
  }
  function render(device, icon) {
    if (deviceId !== device.id) { leave(); deviceId = device.id; selectedDay = today; cursor = 0; filters = { from: "00:00", to: "23:59", types: ["GPS", "WiFi", "BLE"] }; expanded = false; }
    host = { ...host, device }; drawIcon = icon;
    const points = records();
    cursor = Math.min(cursor, Math.max(0, points.length - 1));
    return `<section class="history-page">
      <header class="app-header history-header"><div class="status-bar"><span>09:41</span><span>${icon("wifi")} ${icon("battery-medium")}</span></div>
        <div class="header-row"><button type="button" class="back-button" data-track-action="back" aria-label="返回设备地图">${icon("chevron-left")}</button><div class="header-title"><h1>历史轨迹</h1><p>${escape(device.name)} · ${escape(device.model)}</p></div><span class="history-demo-badge">演示数据</span></div>
      </header>
      <nav class="history-datebar" aria-label="轨迹日期和筛选">
        <button type="button" data-track-action="today" class="history-date-chip ${selectedDay === today ? "active" : ""}" aria-pressed="${selectedDay === today}">今天</button>
        <button type="button" data-track-action="yesterday" class="history-date-chip ${selectedDay === yesterday ? "active" : ""}" aria-pressed="${selectedDay === yesterday}">昨天</button>
        <button type="button" data-track-action="date" class="history-date-picker" aria-label="选择轨迹日期">${icon("calendar-days")}<span>${dateLabel()}</span>${icon("chevron-down")}</button>
        <button type="button" data-track-action="filter" class="history-filter ${isFiltered() ? "active" : ""}" aria-label="筛选历史轨迹" title="筛选">${icon("sliders-horizontal")}${isFiltered() ? '<span class="track-filter-dot"></span>' : ""}</button>
      </nav>
      <div class="history-map">${mapMarkup(points)}<span class="history-map-caption">区域示意 · 不代表实际行程</span>
        ${points.length ? `<div class="track-map-tools"><button type="button" data-track-action="zoom-in" aria-label="放大地图">${icon("plus")}</button><button type="button" data-track-action="zoom-out" aria-label="缩小地图">${icon("minus")}</button><button type="button" data-track-action="fit" aria-label="查看完整轨迹">${icon("scan")}</button></div>` : '<div class="history-map-empty">'+icon("map-pin-off")+'<span>暂无可展示的位置</span></div>'}
      </div>
      <section class="history-sheet ${expanded ? "expanded" : ""}" aria-label="轨迹播放和位置记录">
        <button type="button" class="track-sheet-handle" data-track-action="expand" aria-label="${expanded ? "收起" : "展开"}位置记录" aria-expanded="${expanded}"><span></span></button>
        <div class="track-sheet-heading"><h2>位置记录 <span>${points.length} 条</span></h2><button type="button" class="track-text-button" data-track-action="expand">${expanded ? "收起" : "展开"}${icon(expanded ? "chevron-down" : "chevron-up")}</button></div>
        ${points.length ? `<div class="track-current"><div><strong data-track-time></strong><span class="track-location-type" data-track-type></span><span class="track-position-count" data-track-count></span></div><p data-track-address></p></div>
          <div class="track-player"><button type="button" class="track-play" data-track-action="play" aria-label="播放轨迹" ${points.length < 2 ? "disabled" : ""}>${icon("play")}</button><div class="track-progress-wrap"><input type="range" min="0" max="${Math.max(0, points.length - 1)}" step="1" value="${Math.floor(cursor)}" data-track-progress aria-label="轨迹播放进度" ${points.length < 2 ? "disabled" : ""}><div class="track-time-range"><span>${time(points[0].time)}</span><span>逐点回放</span><span>${time(points.at(-1).time)}</span></div></div><button type="button" class="track-speed" data-track-action="speed" aria-label="切换播放速度，当前 ${speed} 倍" ${points.length < 2 ? "disabled" : ""}>${speed}×</button></div>
          <div class="track-records" ${expanded ? "" : "hidden"} role="list" aria-label="位置记录列表">${points.map((p, i) => `${i && p.segment !== points[i - 1].segment ? '<div class="track-gap">此处上报中断，路线分段显示</div>' : ""}<div role="listitem"><button type="button" class="track-record" data-track-record="${i}" aria-pressed="false"><span class="track-record-number">${i + 1}</span><span class="track-record-copy"><strong>${time(p.time)} <small>${p.type}</small></strong><span>${escape(p.address)}</span></span>${icon("chevron-right")}</button></div>`).join("")}</div>`
          : `<div class="track-empty">${drawIcon("route")}<strong>${isFiltered() ? "当前筛选下暂无记录" : "当天暂无位置记录"}</strong><p>${isFiltered() ? "调整时间或定位类型后再试。" : "选择其他日期查看历史位置。"}</p><button type="button" class="track-text-button" data-track-action="${isFiltered() ? "reset-filter" : "yesterday"}">${isFiltered() ? "重置筛选" : "查看昨天"}</button></div>`}
      </section>
      <div class="history-overlay" data-track-overlay hidden></div>
    </section>`;
  }
  function update(scroll = false) {
    if (!root?.isConnected) { leave(); return; }
    const points = records(); if (!points.length) return;
    const index = Math.min(Math.floor(cursor), points.length - 1), p = points[index], next = points[Math.min(index + 1, points.length - 1)];
    const ratio = next.segment === p.segment && Number(next.id.slice(5)) === Number(p.id.slice(5)) + 1 ? cursor - index : 0;
    root.querySelector("[data-track-cursor]").setAttribute("transform", `translate(${p.x + (next.x - p.x) * ratio},${p.y + (next.y - p.y) * ratio})`);
    root.querySelector("[data-track-time]").textContent = time(p.time);
    root.querySelector("[data-track-type]").textContent = p.type;
    root.querySelector("[data-track-address]").textContent = p.address;
    root.querySelector("[data-track-count]").textContent = `${index + 1} / ${points.length}`;
    const slider = root.querySelector("[data-track-progress]"); slider.value = cursor; slider.style.setProperty("--track-progress", `${points.length > 1 ? cursor / (points.length - 1) * 100 : 0}%`);
    slider.setAttribute("aria-valuetext", `第 ${index + 1} 条，共 ${points.length} 条，${p.time}`);
    root.querySelectorAll("[data-track-point]").forEach(el => el.setAttribute("aria-pressed", String(Number(el.dataset.trackPoint) === index)));
    root.querySelectorAll("[data-track-record]").forEach(el => el.setAttribute("aria-pressed", String(Number(el.dataset.trackRecord) === index)));
    root.querySelectorAll("[data-route-edge]").forEach(el => el.classList.toggle("visited", Number(el.dataset.routeEdge) <= cursor));
    const play = root.querySelector('[data-track-action="play"]');
    if (play.dataset.playing !== String(playing)) { play.dataset.playing = String(playing); play.innerHTML = drawIcon(playing ? "pause" : "play"); play.setAttribute("aria-label", playing ? "暂停轨迹" : "播放轨迹"); play.setAttribute("aria-pressed", String(playing)); host.icons(); }
    if (expanded && (scroll || (playing && lastSelected !== index))) {
      const row = root.querySelector(`[data-track-record="${index}"]`), list = root.querySelector(".track-records");
      list.scrollTop += row.getBoundingClientRect().top - list.getBoundingClientRect().top - 1;
    }
    lastSelected = index;
    const w = 720 / zoom, h = 500 / zoom;
    const x = Math.max(0, Math.min(720 - w, p.x - w / 2)), y = Math.max(0, Math.min(500 - h, p.y - h / 2));
    root.querySelector(".history-map-svg").setAttribute("viewBox", `${x} ${y} ${w} ${h}`);
  }
  function tick(now) {
    if (!playing || !root?.isConnected || document.hidden) { pause(); update(); return; }
    if (previousFrame) cursor += Math.min(now - previousFrame, 150) / 900 * speed;
    previousFrame = now;
    if (cursor >= records().length - 1) { cursor = records().length - 1; pause(); }
    update(); if (playing) frame = requestAnimationFrame(tick);
  }
  let returnFocus;
  function closeOverlay() { overlay = ""; const el = root.querySelector("[data-track-overlay]"); el.hidden = true; el.innerHTML = ""; returnFocus?.focus(); }
  function openOverlay(kind, trigger) {
    pause(); update(); overlay = kind; returnFocus = trigger;
    const el = root.querySelector("[data-track-overlay]"); el.hidden = false;
    const checkbox = type => `<label class="track-type-option"><input type="checkbox" name="type" value="${type}" ${filters.types.includes(type) ? "checked" : ""}>${type}</label>`;
    el.innerHTML = `<form class="track-dialog" role="dialog" aria-modal="true" aria-labelledby="track-dialog-title"><h2 id="track-dialog-title">${kind === "date" ? "选择日期" : "筛选轨迹"}</h2>${kind === "date" ? `<label class="track-input-label">查询日期<input type="date" name="date" value="${selectedDay}" min="2000-01-01" max="${today}" required></label><p class="track-dialog-note">按手机所在时区选择日期</p>` : `<div class="track-time-fields"><label class="track-input-label">开始时间<input type="time" name="from" value="${filters.from}" required></label><label class="track-input-label">结束时间<input type="time" name="to" value="${filters.to}" required></label></div><fieldset class="track-types"><legend>定位类型</legend>${["GPS", "WiFi", "BLE"].map(checkbox).join("")}</fieldset><p class="track-dialog-note">仅筛选当前日期的位置记录</p>`}<p class="track-form-error" role="alert" hidden></p><div class="track-dialog-actions"><button type="button" class="track-text-button" data-track-action="cancel">取消</button>${kind === "filter" ? '<button type="button" class="track-text-button" data-track-action="reset-filter">重置</button>' : ""}<button type="submit" class="track-confirm">${kind === "date" ? "查看记录" : "应用筛选"}</button></div></form>`;
    el.querySelector("input").focus();
    el.querySelector("form").addEventListener("submit", event => {
      event.preventDefault(); const data = new FormData(event.currentTarget);
      if (kind === "date") { setDay(data.get("date")); return; }
      const from = data.get("from"), to = data.get("to"), types = data.getAll("type");
      if (from > to || !types.length) { const error = el.querySelector(".track-form-error"); error.hidden = false; error.textContent = !types.length ? "至少选择一种定位类型" : "结束时间应晚于或等于开始时间"; return; }
      filters = { from, to, types }; cursor = 0; overlay = ""; focusAfterRender = "filter"; redraw();
    });
    el.onkeydown = event => {
      if (event.key === "Escape") { event.preventDefault(); closeOverlay(); }
      if (event.key === "Tab") { const controls = [...el.querySelectorAll("button,input")].filter(n => !n.disabled); const first = controls[0], last = controls.at(-1); if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } }
    };
  }
  function mount(options) {
    host = { ...host, ...options }; root = document.querySelector(".history-page"); if (!root) return;
    lastSelected = -1;
    root.addEventListener("click", event => {
      const point = event.target.closest("[data-track-point],[data-track-record]");
      if (point) { select(Number(point.dataset.trackPoint ?? point.dataset.trackRecord)); return; }
      const button = event.target.closest("[data-track-action]");
      if (!button || button.disabled) { if (event.target === root.querySelector("[data-track-overlay]")) closeOverlay(); return; }
      if (button.dataset.trackAction === "expand" && performance.now() < ignoreHandleClickUntil) return;
      switch (button.dataset.trackAction) {
        case "back": leave(); host.back(); break;
        case "today": setDay(today, "today"); break;
        case "yesterday": setDay(yesterday, "yesterday"); break;
        case "date": openOverlay("date", button); break;
        case "filter": openOverlay("filter", button); break;
        case "cancel": closeOverlay(); break;
        case "reset-filter": pause(); filters = { from: "00:00", to: "23:59", types: ["GPS", "WiFi", "BLE"] }; cursor = 0; overlay = ""; focusAfterRender = "filter"; redraw(); break;
        case "play": if (playing) { pause(); update(); } else if (records().length > 1) { if (cursor >= records().length - 1) cursor = 0; playing = true; previousFrame = 0; frame = requestAnimationFrame(tick); update(); } break;
        case "speed": speed = speed === 1 ? 2 : speed === 2 ? 4 : 1; button.textContent = `${speed}×`; button.setAttribute("aria-label", `切换播放速度，当前 ${speed} 倍`); break;
        case "expand": expanded = !expanded; pause(); redraw(); break;
        case "zoom-in": zoom = Math.min(2.5, zoom + 0.5); update(); break;
        case "zoom-out": zoom = Math.max(1, zoom - 0.5); update(); break;
        case "fit": zoom = 1; update(); break;
      }
    });
    root.addEventListener("keydown", event => { const point = event.target.closest("[data-track-point]"); if (point && ["Enter", " "].includes(event.key)) { event.preventDefault(); select(Number(point.dataset.trackPoint)); } });
    root.querySelector("[data-track-progress]")?.addEventListener("input", event => select(Number(event.target.value)));
    const handle = root.querySelector(".track-sheet-handle"); let downY;
    handle.addEventListener("pointerdown", event => { downY = event.clientY; handle.setPointerCapture(event.pointerId); });
    handle.addEventListener("pointerup", event => { const dy = event.clientY - downY; if (Math.abs(dy) > 25) { ignoreHandleClickUntil = performance.now() + 300; expanded = dy < 0; pause(); event.preventDefault(); redraw(); } });
    update(true);
    if (focusAfterRender) { root.querySelector(`[data-track-action="${focusAfterRender}"]`)?.focus({ preventScroll: true }); focusAfterRender = ""; }
  }
  document.addEventListener("visibilitychange", () => { if (document.hidden) { pause(); if (root?.isConnected) update(); } });
  function reset() { leave(); deviceId = ""; speed = 1; zoom = 1; cursor = 0; focusAfterRender = ""; }
  return { render, mount, leave, reset };
})();
