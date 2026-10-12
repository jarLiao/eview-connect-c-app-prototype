// 原型和生成的离线 HTML 共用图表阅读器；不加载网络资源。
(() => {
  const dialog = document.createElement("dialog");
  dialog.className = "guide-dialog";
  dialog.setAttribute("aria-labelledby", "guide-diagram-title");
  dialog.innerHTML = `<div class="guide-dialog-toolbar"><strong id="guide-diagram-title">图表</strong><div><button class="guide-button" type="button" data-guide-zoom="out" aria-label="缩小图表">−</button><output aria-live="polite">100%</output><button class="guide-button" type="button" data-guide-zoom="in" aria-label="放大图表">＋</button><button class="guide-button" type="button" data-guide-zoom="fit">适合窗口</button><button class="guide-button" type="button" data-guide-close>关闭</button></div></div><div class="guide-dialog-scroll"><img alt=""></div>`;
  document.body.append(dialog);
  const img = dialog.querySelector("img");
  const viewport = dialog.querySelector(".guide-dialog-scroll");
  const output = dialog.querySelector("output");
  let baseWidth = 0;
  let zoom = 1;
  function applyZoom() {
    img.style.width = `${Math.round(baseWidth * zoom)}px`;
    output.textContent = `${Math.round(zoom * 100)}%`;
  }
  function fit() {
    if (!img.naturalWidth) return;
    const ratio = Math.min(1, (viewport.clientWidth - 40) / img.naturalWidth, (viewport.clientHeight - 40) / img.naturalHeight);
    baseWidth = Math.max(1, img.naturalWidth * ratio);
    zoom = 1;
    applyZoom();
    viewport.scrollTo(0, 0);
  }
  img.addEventListener("load", fit);
  document.addEventListener("click", event => {
    const trigger = event.target.closest("[data-guide-image], [data-guide-figure]");
    if (trigger) {
      dialog.querySelector("strong").textContent = trigger.dataset.guideTitle;
      img.alt = trigger.dataset.guideTitle;
      img.removeAttribute("style");
      dialog.showModal();
      img.src = trigger.dataset.guideImage || trigger.closest("figure").querySelector("img").src;
      if (img.complete) fit();
    }
    if (event.target.closest("[data-guide-print]")) window.print();
  });
  dialog.addEventListener("click", event => {
    if (event.target.closest("[data-guide-close]")) dialog.close();
    const button = event.target.closest("[data-guide-zoom]");
    if (!button) return;
    if (button.dataset.guideZoom === "fit") fit();
    else {
      zoom = Math.max(0.5, Math.min(4, zoom + (button.dataset.guideZoom === "in" ? 0.25 : -0.25)));
      applyZoom();
    }
  });
  window.addEventListener("resize", () => { if (dialog.open) fit(); });
})();
