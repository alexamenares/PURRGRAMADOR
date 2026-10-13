export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function showNotice(message) {
  const notice = $('#notice');
  if (!notice) return;
  notice.textContent = message;
  notice.hidden = false;
  clearTimeout(notice._timer);
  notice._timer = setTimeout(() => { notice.hidden = true; }, 4000);
}

export function openModal(contentHtml) {
  const modal = $('#modal');
  modal.innerHTML = `<div class="modal-content">${contentHtml}</div>`;
  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', onModalEsc);
}

export function closeModal() {
  const modal = $('#modal');
  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML = '';
  document.removeEventListener('keydown', onModalEsc);
}

function onModalEsc(e) {
  if (e.key === 'Escape') closeModal();
}