/* ═══════════════════════════════════════════
   SURAJ SONKAR – PORTFOLIO  |  script.js
═══════════════════════════════════════════ */

'use strict';

/* ─── TYPING ANIMATION ─── */
const typingRoles = [
  'Mobile App Developer',
  'Flutter Engineer',
  'Android Software Engineer',
  'UI/UX Enthusiast',
  'Firebase Expert',
];

let roleIdx = 0;
let charIdx = 0;
let deleting = false;
const typingEl = document.getElementById('typingText');

function typeEffect() {
  if (!typingEl) return;
  const current = typingRoles[roleIdx];

  if (!deleting) {
    typingEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typingEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % typingRoles.length;
    }
  }
  setTimeout(typeEffect, deleting ? 55 : 90);
}
typeEffect();

/* ─── NAME TYPING ANIMATION ─── */
let nameCharIdx = 0;
let nameDeleting = false;
const nameStr = 'Suraj Sonkar';
const nameTypingEl = document.getElementById('nameTypingText');

function nameTypeEffect() {
  if (!nameTypingEl) return;

  if (!nameDeleting) {
    nameTypingEl.textContent = nameStr.slice(0, ++nameCharIdx);
    if (nameCharIdx === nameStr.length) {
      nameDeleting = true;
      setTimeout(nameTypeEffect, 2500); // Pause when name is fully typed
      return;
    }
  } else {
    nameTypingEl.textContent = nameStr.slice(0, --nameCharIdx);
    if (nameCharIdx === 0) {
      nameDeleting = false;
      setTimeout(nameTypeEffect, 500); // Pause before re-typing
      return;
    }
  }
  setTimeout(nameTypeEffect, nameDeleting ? 80 : 150);
}
nameTypeEffect();

/* ─── NAVBAR SCROLL BEHAVIOUR ─── */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  backToTop.classList.toggle('visible', window.scrollY > 400);
  highlightNav();
}, { passive: true });

backToTop.addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

/* ─── MOBILE HAMBURGER ─── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  const open = navLinks.classList.contains('open');
  hamburger.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

/* ─── ACTIVE NAV HIGHLIGHT ─── */
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[data-section="${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ─── CONTINUOUS SKILL ANIMATION ─── */
const skillItems = document.querySelectorAll('.skill-item');

function startContinuousSkillAnimation(item) {
  const fill = item.querySelector('.progress-fill');
  const pctText = item.querySelector('.skill-pct');

  if (!fill || !pctText) return;

  const targetWidth = parseInt(fill.dataset.width, 10);
  const duration = 1400; // Time to fill
  const pauseDuration = 800; // Pause at 100% before resetting
  const stepTime = 20;
  const increment = targetWidth / (duration / stepTime);

  function animateBar() {
    // 1. Reset to 0 instantly
    fill.style.transition = 'none';
    fill.style.width = '0%';
    pctText.textContent = '0%';

    // 2. Force browser reflow so the 0% takes effect immediately
    void fill.offsetWidth;

    // 3. Start animation
    fill.style.transition = `width ${duration}ms cubic-bezier(.4, 0, .2, 1)`;
    fill.style.width = targetWidth + '%';

    // Animate text counter
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetWidth) {
        pctText.textContent = targetWidth + '%';
        clearInterval(timer);

        // 4. Wait a bit, then restart the whole process
        setTimeout(animateBar, pauseDuration);
      } else {
        pctText.textContent = Math.floor(current) + '%';
      }
    }, stepTime);
  }

  // Start the first cycle
  animateBar();
}

// Start continuous looping animation for all skill bars when they enter the screen
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      startContinuousSkillAnimation(e.target);
      // Unobserve so we don't start multiple loops
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

skillItems.forEach(item => skillObserver.observe(item));

skillItems.forEach(item => skillObserver.observe(item));

/* ─── COUNTER ANIMATION ─── */
const counters = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      startContinuousCounterAnimation(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

function startContinuousCounterAnimation(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const pauseDuration = 1200; // Pause at the target before resetting

  // Calculate increment and interval time
  const stepTime = 30;
  const increment = Math.max(1, target / (duration / stepTime));

  function countUp() {
    let current = 0;
    el.textContent = '0';

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);

        // Wait at 100%, then restart
        setTimeout(countUp, pauseDuration);
      } else {
        el.textContent = Math.floor(current);
      }
    }, stepTime);
  }

  countUp();
}

counters.forEach(c => counterObserver.observe(c));

/* ─── PROJECT FILTER ─── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const cats = card.dataset.category || '';
      const show = filter === 'all' || cats.includes(filter);

      if (show) {
        card.style.display = '';
        card.classList.remove('hidden');
        // re-trigger reveal
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), 30);
      } else {
        card.classList.add('hidden');
        card.style.display = 'none';
      }
    });
  });
});

/* ─── CONTACT FORM ─── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = '#28a745';
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}

/* ─── 3D INTERACTIVE PARTICLES ─── */
if (typeof tsParticles !== 'undefined') {
  tsParticles.load("particles", {
    fpsLimit: 60,
    background: {
      color: "transparent"
    },
    interactivity: {
      events: {
        onClick: { enable: true, mode: "push" },
        onHover: {
          enable: true,
          mode: "repulse",
          parallax: { enable: true, force: 60, smooth: 10 }
        },
        resize: true
      },
      modes: {
        push: { quantity: 4 },
        repulse: { distance: 100, duration: 0.4 }
      }
    },
    particles: {
      color: { value: "#f5c518" },
      links: {
        color: "#f5c518",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1
      },
      collisions: { enable: true },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: false,
        speed: 1,
        straight: false
      },
      number: {
        density: { enable: true, area: 800 },
        value: 80
      },
      opacity: {
        value: 0.5,
        animation: { enable: true, minimumValue: 0.1, speed: 1, sync: false }
      },
      shape: { type: "circle" },
      size: {
        value: { min: 1, max: 3 },
        animation: { enable: true, minimumValue: 0.1, speed: 2, sync: false }
      }
    },
    detectRetina: true
  });
}

/* ─── SMOOTH HOVER TILT on service cards ─── */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = (y / rect.height) * 6;
    const tiltY = -(x / rect.width) * 6;
    card.style.transform = `translateY(-8px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ─── Make initially visible cards visible ─── */
window.addEventListener('load', () => {
  // Trigger for above-fold hero elements
  document.querySelectorAll('.hero .reveal-left, .hero .reveal-right').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 200);
  });
  highlightNav();
});
