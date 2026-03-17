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

/* ─── ABOUT ME TYPING ANIMATION ─── */
let aboutCharIdx = 0;
let aboutDeleting = false;
const aboutStr = "I am a passionate Flutter Developer, skilled in creating modern Android applications with clean design, smooth navigation, and engaging UI/UX. As a fresher, I bring creativity, dedication, and strong problem‑solving skills to deliver impactful digital solutions. My goal is to grow as a confident professional while contributing innovative ideas to every project.";
const aboutTypingEl = document.getElementById('aboutTypingText');

function aboutTypeEffect() {
  if (!aboutTypingEl) return;

  if (!aboutDeleting) {
    aboutTypingEl.textContent = aboutStr.slice(0, ++aboutCharIdx);
    if (aboutCharIdx === aboutStr.length) {
      aboutDeleting = true;
      setTimeout(aboutTypeEffect, 5000); // Wait longer on the full text
      return;
    }
  } else {
    aboutTypingEl.textContent = aboutStr.slice(0, --aboutCharIdx);
    if (aboutCharIdx === 0) {
      aboutDeleting = false;
      setTimeout(aboutTypeEffect, 1000); // Pause before re-typing
      return;
    }
  }
  // Speed it up slightly since it's a long paragraph
  setTimeout(aboutTypeEffect, aboutDeleting ? 20 : 40); 
}
aboutTypeEffect();


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
// The form now uses standard HTML submission via the action attribute to FormSubmit.co
// No JavaScript override is needed for the basic submission to work reliably.

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

/* ─── NAVIGATION SOUND EFFECTS ─── */
document.querySelectorAll('.nav-link, .nav-logo, .back-to-top, #downloadCVBtn, #viewCertBtn, #hireMeBtn, #myWorksBtn, .filter-btn').forEach(link => {
  link.addEventListener('click', () => {
    const sound = document.getElementById('navSound');
    if (sound) {
      sound.currentTime = 0; // Restart sound if it's already playing
      sound.play().catch(e => console.log("Audio play blocked by browser:", e));
    }
  });
});

/* ─── INTRO SOUND LOGIC ─── */
function playIntroSound() {
  const introSound = document.getElementById('navSound');
  if (introSound) {
    introSound.currentTime = 0;
    introSound.play().then(() => {
      console.log("Intro sound played successfully");
      // Remove listeners once played
      document.removeEventListener('click', playIntroSound);
      document.removeEventListener('scroll', playIntroSound);
      document.removeEventListener('keydown', playIntroSound);
    }).catch(e => {
      console.log("Intro sound wait for user interaction:", e);
    });
  }
}

// Add listeners for first interaction
document.addEventListener('click', playIntroSound, { once: true });
document.addEventListener('scroll', playIntroSound, { once: true });
document.addEventListener('keydown', playIntroSound, { once: true });

/* ─── AI CHAT ASSISTANT LOGIC ─── */
console.log("AI Chat Logic Initializing...");
const aiChatToggle = document.getElementById('aiChatToggle');
const aiChatClose = document.getElementById('aiChatClose');
const aiChatWindow = document.getElementById('aiChatWindow');
const aiChatForm = document.getElementById('aiChatForm');
const aiInput = document.getElementById('aiInput');
const aiMessages = document.getElementById('aiMessages');
const aiTyping = document.getElementById('aiTyping');

console.log("Elements search:", { aiChatToggle, aiChatWindow });

if (aiChatToggle && aiChatWindow) {
  console.log("AI Chat Widget Found and Ready.");
  aiChatToggle.addEventListener('click', () => {
    console.log("AI Chat Toggle Clicked");
    aiChatWindow.classList.toggle('open');
    if (aiChatWindow.classList.contains('open')) {
      aiInput.focus();
    }
  });

  const contactAiBtn = document.getElementById('contactAiBtn');
  if (contactAiBtn) {
    contactAiBtn.addEventListener('click', () => {
      aiChatWindow.classList.add('open');
      aiInput.focus();
    });
  }

  aiChatClose.addEventListener('click', () => {
    aiChatWindow.classList.remove('open');
  });

  aiChatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = aiInput.value.trim();
    if (message) {
      appendChatMessage('user', message);
      aiInput.value = '';
      simulateAIResponse(message);
    }
  });
}

function appendChatMessage(sender, text) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}-message`;
  msgDiv.innerHTML = `
    <p>${text}</p>
    <span class="message-time">${time}</span>
  `;
  aiMessages.appendChild(msgDiv);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

function simulateAIResponse(userMsg) {
  const msg = userMsg.toLowerCase();
  aiTyping.style.display = 'flex';
  aiMessages.scrollTop = aiMessages.scrollHeight;

  setTimeout(() => {
    aiTyping.style.display = 'none';
    let response = "That's a great question! Suraj is very passionate about software development. Would you like to know about his projects or skills?";

    if (msg.includes('hello') || msg.includes('hi')) {
      response = "Hello! I'm Suraj's AI assistant. How can I help you explore his portfolio today?";
    } else if (msg.includes('skills')) {
      response = "Suraj is an expert in Flutter, Dart, Android development, and Firebase. He also has strong experience in UI/UX design and API integration.";
    } else if (msg.includes('projects')) {
      response = "Suraj has completed over 70+ projects, including E-commerce apps, Chat applications, and Fitness trackers. You can see them in the Projects section above!";
    } else if (msg.includes('contact') || msg.includes('email') || msg.includes('phone')) {
      response = "You can contact Suraj via email at info.surajsonkarg@gmail.com or call him at +91-9406289007. He's also active on LinkedIn and WhatsApp!";
    } else if (msg.includes('resume') || msg.includes('cv')) {
      response = "You can download Suraj's resume from the 'About' section by clicking the 'Download CV' button.";
    } else if (msg.includes('time')) {
        const currentTime = new Date().toLocaleTimeString();
        response = `The current time is ${currentTime}. I'm live and ready to help!`;
    } else if (msg.includes('who are you') || msg.includes('robot')) {
      response = "I am an advanced AI Scout designed to help visitors understand Suraj's expertise and work. I'm powered by modern AI logic!";
    }

    appendChatMessage('bot', response);
  }, 1000 + Math.random() * 1000);
}

/* ─── CONTACT FORM FILE UPLOADS ─── */
const attachmentBtn = document.getElementById('attachmentBtn');
const fileInput = document.getElementById('fileInput');
const filePreviewContainer = document.getElementById('filePreviewContainer');
let selectedFiles = [];

if (attachmentBtn && fileInput) {
  attachmentBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  });
}

function handleFiles(files) {
  files.forEach(file => {
    // Basic validation: 5MB limit for Web3Forms free plan per file
    if (file.size > 5 * 1024 * 1024) {
      alert(`File ${file.name} is too large. Max size is 5MB.`);
      return;
    }

    // PDF files are allowed now
    if (!['image/', 'video/', 'application/pdf'].some(type => file.type.startsWith(type) || file.type === type)) {
      alert(`File type ${file.type} is not supported.`);
      return;
    }

    selectedFiles.push(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      const previewItem = document.createElement('div');
      previewItem.className = 'file-preview-item';
      
      let previewContent = '';
      if (file.type.startsWith('image/')) {
        previewContent = `<img src="${e.target.result}" alt="${file.name}">`;
      } else if (file.type.startsWith('video/')) {
        previewContent = `<video src="${e.target.result}"></video><div class="file-icon"><i class="fas fa-video"></i></div>`;
      } else if (file.type === 'application/pdf') {
        previewContent = `<div class="file-icon"><i class="fas fa-file-pdf"></i></div><div style="position:absolute; bottom:4px; left:4px; font-size:10px; color:var(--text-muted); overflow:hidden; white-space:nowrap; width:90%;">${file.name}</div>`;
      } else {
        previewContent = `<div class="file-icon"><i class="fas fa-file"></i></div>`;
      }

      previewItem.innerHTML = `
        ${previewContent}
        <button type="button" class="remove-file" aria-label="Remove file">
          <i class="fas fa-times"></i>
        </button>
      `;

      const removeBtn = previewItem.querySelector('.remove-file');
      removeBtn.addEventListener('click', () => {
        selectedFiles = selectedFiles.splice(selectedFiles.indexOf(file), 1);
        selectedFiles = selectedFiles.filter(f => f !== file);
        previewItem.remove();
        updateFileInput();
      });

      filePreviewContainer.appendChild(previewItem);
      updateFileInput();
    };

    if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
      reader.readAsDataURL(file);
    } else {
      // For PDFs or other files, we don't need data URL for the icon
      reader.onload({ target: { result: '' } });
    }
  });
}

function updateFileInput() {
  const dataTransfer = new DataTransfer();
  selectedFiles.forEach(file => dataTransfer.items.add(file));
  fileInput.files = dataTransfer.files;
}
