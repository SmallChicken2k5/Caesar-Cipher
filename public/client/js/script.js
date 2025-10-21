// Show Alert Message

const showAlert = document.querySelector('[show-alert]');
if (showAlert) {
    const dataTime = parseInt(showAlert.getAttribute('data-time'));
    setTimeout(() => {
        showAlert.classList.add('alert-hidden');
    }, dataTime)
    const closeAlert = showAlert.querySelector('[close-alert]')
    if (closeAlert) {
        closeAlert.addEventListener('click', () => {
            showAlert.classList.add('alert-hidden');
        })
    }
}

// End Show Alert Message


const btn = document.getElementById('togglePassword');
const input = document.getElementById('password');
if (btn && input) {
    btn.addEventListener('click', () => {
        const isPwd = input.type === 'password';
        input.type = isPwd ? 'text' : 'password';
        btn.innerHTML = isPwd
            ? '<i class="bi bi-eye-slash"></i>'
            : '<i class="bi bi-eye"></i>';
    });
}


// Docs
// Current URL for share
window.currentUrl = window.location.href;
// Build TOC
const content = document.querySelector('.doc-content');
const tocWrap = document.getElementById('tocContent');
if (content && tocWrap) {
    const headers = content.querySelectorAll('h2, h3');
    if (headers.length) {
        tocWrap.innerHTML = '';
        headers.forEach((h, i) => {
            if (!h.id) h.id = 'h-' + i;
            const a = document.createElement('a');
            a.href = '#' + h.id;
            a.textContent = h.textContent.trim();
            a.className = 'd-block mb-2 text-decoration-none';
            if (h.tagName === 'H3') a.style.paddingLeft = '12px';
            tocWrap.appendChild(a);
        });
    }
}
// Copy link
document.querySelectorAll('[data-action="copy-link"]').forEach(btn => {
    btn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            btn.innerHTML = '<i class="bi bi-check2 me-1"></i> Đã sao chép';
            setTimeout(() => btn.innerHTML = '<i class="bi bi-link-45deg me-1"></i> Sao chép link', 2500);
        });
    });
});
// Scroll top
const topBtn = document.querySelector('[data-action="scroll-top"]');
if (topBtn) {
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
// Like (frontend placeholder)
document.querySelectorAll('[data-action="like-doc"]').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('btn-outline-warning');
        btn.classList.toggle('btn-warning');
    });
});


// Members term filter: navigate on change
(() => {
  const sel = document.getElementById('termFilter');
  if (!sel) return;
  const base = sel.getAttribute('data-base') || '/members';
  sel.addEventListener('change', () => {
    const v = sel.value.trim();
    window.location.href = v ? `${base}?term=${encodeURIComponent(v)}` : base;
  });
})();