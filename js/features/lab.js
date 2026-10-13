import { $, $$ } from '../ui.js';

const STORAGE_KEY = 'purrgramador:lab';

export function initLab() {
  const htmlEditor = $('#labHtml');
  const cssEditor = $('#labCss');
  const jsEditor = $('#labJs');
  const preview = $('#labPreview');
  const resetBtn = $('#labReset');
  const tabs = $$('[data-lab-tab]');
  if (!htmlEditor || !preview) return;

  const saved = loadLab();
  htmlEditor.value = saved.html ?? defaultHtml();
  cssEditor.value = saved.css ?? defaultCss();
  jsEditor.value = saved.js ?? defaultJs();

  const update = debounce(() => {
    render();
    saveLab({
      html: htmlEditor.value,
      css: cssEditor.value,
      js: jsEditor.value
    });
  }, 250);

  [htmlEditor, cssEditor, jsEditor].forEach(el => el?.addEventListener('input', update));

  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.setAttribute('aria-selected', String(t === tab)));
    $$('[data-lab-pane]').forEach(pane => {
      pane.hidden = pane.dataset.labPane !== tab.dataset.labTab;
    });
  }));

  resetBtn?.addEventListener('click', () => {
    htmlEditor.value = defaultHtml();
    cssEditor.value = defaultCss();
    jsEditor.value = defaultJs();
    update();
  });

  render();

  function render() {
    const doc = preview.contentWindow?.document;
    if (!doc) return;

    const html = `<!doctype html><html><head><meta charset="utf-8">
<style>
  body { font-family: system-ui, sans-serif; padding: 12px; margin: 0; color: #111; }
  ${cssEditor.value}
</style>
</head><body>
${htmlEditor.value}
<script>
  try { ${jsEditor.value} }
  catch (err) {
    document.body.insertAdjacentHTML('beforeend',
      '<pre style="color:#c00;margin-top:12px">' + err.message + '</pre>');
  }
<\/script>
</body></html>`;

    doc.open();
    doc.write(html);
    doc.close();
  }
}

function defaultHtml() {
  return `<h1>Hola, mundo</h1>
<p>Edita el código y mira el resultado.</p>
<button id="btn">Haz clic</button>
<p id="out"></p>`;
}

function defaultCss() {
  return `h1 { color: #1683b7; }
button {
  padding: 8px 14px;
  border-radius: 8px;
  border: 0;
  background: linear-gradient(110deg, #a5eeff, #65ceef);
  cursor: pointer;
}`;
}

function defaultJs() {
  return `document.getElementById('btn').addEventListener('click', () => {
  document.getElementById('out').textContent = '¡Funciona!';
});`;
}

function loadLab() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {}; }
  catch { return {}; }
}

function saveLab(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}