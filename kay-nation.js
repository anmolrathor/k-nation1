// ─── MOBILE MENU ───────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});

mobileClose.addEventListener('click', closeMobileMenu);

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

// ─── SCROLL REVEAL ─────────────────────────────────────────────────────────
const revealElements = document.querySelectorAll(
  '.tier-card, .class-card, .trainer-card, .service-content'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on index within parent
        const siblings = Array.from(entry.target.parentElement.children);
        const idx = siblings.indexOf(entry.target);
        const delay = Math.min(idx * 100, 400);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '-60px' }
);

revealElements.forEach(el => revealObserver.observe(el));

// ─── CONTACT FORM VALIDATION ────────────────────────────────────────────────
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

function showError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.style.borderColor = '#e60000';
  error.classList.add('visible');
  return false;
}

function clearError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  input.style.borderColor = '';
  error.classList.remove('visible');
}

// Clear errors on input
['contactName','contactEmail','contactPhone','contactMessage'].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input', () => {
    el.style.borderColor = '';
    const errId = 'err' + id.charAt(0).toUpperCase() + id.slice(1);
    const errEl = document.getElementById(errId);
    if (errEl) errEl.classList.remove('visible');
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const name    = document.getElementById('contactName').value.trim();
  const email   = document.getElementById('contactEmail').value.trim();
  const phone   = document.getElementById('contactPhone').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  // Clear all errors first
  ['contactName','contactEmail','contactPhone','contactMessage'].forEach(id => {
    document.getElementById(id).style.borderColor = '';
  });
  document.querySelectorAll('.form-error').forEach(el => el.classList.remove('visible'));

  // Validate name
  if (name.length < 2) {
    showError('contactName', 'errContactName');
    valid = false;
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('contactEmail', 'errContactEmail');
    valid = false;
  }

  // Validate phone (at least 10 digits)
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    showError('contactPhone', 'errContactPhone');
    valid = false;
  }

  // Validate message
  if (message.length < 10) {
    showError('contactMessage', 'errContactMessage');
    valid = false;
  }

  if (valid) {
    form.style.display = 'none';
    successMsg.classList.add('visible');
    // Reset after 5 seconds
    setTimeout(() => {
      form.reset();
      form.style.display = 'block';
      successMsg.classList.remove('visible');
    }, 5000);
  }
});

// ─── JOIN NOW BUTTONS ───────────────────────────────────────────────────────
document.querySelectorAll('.btn-tier, .btn-tier-primary').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  });
});

// ─── NAVBAR ACTIVE LINK ─────────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = '#e60000';
          }
        });
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(s => sectionObserver.observe(s));
