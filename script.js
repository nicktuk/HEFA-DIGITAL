/* ══════════════════════════════════════════════════
   HEFA DIGITAL — Landing Page Script
   ══════════════════════════════════════════════════ */

const overlay     = document.getElementById('modalOverlay');
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const navToggle   = document.getElementById('navToggle');
const nav         = document.getElementById('nav');

/* ── Modal ────────────────────────────────────────── */
function openModal() {
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOnOverlay(e) {
  if (e.target === overlay) closeModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ── Form submit ──────────────────────────────────── */
contactForm.addEventListener('submit', e => {
  e.preventDefault();

  const nombre  = document.getElementById('nombre').value.trim();
  const empresa = document.getElementById('empresa').value.trim();
  const email   = document.getElementById('email').value.trim();

  if (!nombre || !empresa || !email) {
    highlightEmpty([
      { id: 'nombre',  val: nombre },
      { id: 'empresa', val: empresa },
      { id: 'email',   val: email },
    ]);
    return;
  }

  contactForm.style.display = 'none';
  formSuccess.classList.add('visible');
});

function highlightEmpty(fields) {
  fields.forEach(({ id, val }) => {
    const el = document.getElementById(id);
    if (!val) {
      el.style.borderColor = '#E05A5A';
      el.addEventListener('input', () => { el.style.borderColor = ''; }, { once: true });
    }
  });
}

/* ── Nav toggle (mobile) ──────────────────────────── */
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  nav.classList.toggle('open');
});

/* Close nav when a link is clicked */
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    nav.classList.remove('open');
  });
});

/* ── Active nav link on scroll ────────────────────── */
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks  = document.querySelectorAll('.nav__link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--color-primary)';
        }
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => observer.observe(s));
