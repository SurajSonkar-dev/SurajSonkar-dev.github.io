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
        selectedFiles = selectedFiles.filter(f => f !== file);
        previewItem.remove();
        updateFileInput();
      });

      filePreviewContainer.appendChild(previewItem);
    };

    reader.readAsDataURL(file);
  });
  
  updateFileInput();
}

function updateFileInput() {
  // Creating a new DataTransfer object to update the file input's files property
  const dataTransfer = new DataTransfer();
  selectedFiles.forEach(file => dataTransfer.items.add(file));
  fileInput.files = dataTransfer.files;
}

/* ─── AI CHAT COPILOT ─── */
const surajInfo = {
  basics: {
    name: "Suraj Sonkar",
    role: "Flutter & Android Developer",
    location: "India 🇮🇳",
    email: "info.surajsonkarg@gmail.com",
    phone: "+91-9406289007",
    experience: "1.5+ Years of Industry Experience",
    specialty: "High-Performance Mobile Apps & Premium UI/UX"
  },
  education: [
    { degree: "BCA (Bachelor of Computer Applications)", university: "ISBM University, Chhattisgarh", year: "2021-2023" },
    { institute: "WsCube Tech", course: "Advanced Flutter & Android Course" }
  ],
  skills: {
    frontend: ["Flutter", "Dart", "Native Android (Kotlin/Java)", "UI/UX Design", "Figma"],
    backend: ["Firebase (Auth, Firestore, Messaging)", "Appwrite", "REST APIs", "Node.js (Intermediate)"],
    architecture: ["Clean Architecture (MVVM/BLoC)", "Riverpod", "Provider", "GetX", "SOLID Principles"],
    tools: ["Git/GitHub", "Android Studio", "Postman", "Play Store Deployment"]
  },
  projects: [
    { name: "E-Commerce App", desc: "Enterprise-grade shopping app with complex cart and payment logic." },
    { name: "Chat Application", desc: "Real-time messaging with WebSocket/Firebase integration." },
    { name: "Fitness Tracker", desc: "Data-heavy fitness analytics with local caching and offline support." },
    { name: "Education LMS", desc: "A full-featured learning management system for schools." }
  ],
  socials: {
    github: "github.com/SurajSonkar-dev",
    linkedin: "linkedin.com/in/SurajSonkar-dev",
    youtube: "@codeingwala",
    whatsapp: "+919406289007"
  }
};

let aiChatHistory = [];
const aiChatToggle = document.getElementById('aiChatToggle');
const aiChatClose = document.getElementById('aiChatClose');
const aiVoiceToggle = document.getElementById('aiVoiceToggle');
let isVoiceEnabled = false;

// Voice Synthesis Setup
function speakResponse(text) {
  if (!isVoiceEnabled || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  
  // Clean text and markdown symbols for cleaner AI speech
  const cleanMsg = text
    .replace(/\*\*/g, '') // Remove bold
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links but keep text
    .replace(/#/g, '') // Remove headers
    .replace(/[-*]\s/g, ', ') // Replace bullets with pauses
    .replace(/\n/g, '. '); // Replace newlines with pauses
    
  const utterance = new SpeechSynthesisUtterance(cleanMsg);
  
  // Default to Indian English for Hinglish clarity
  utterance.lang = 'en-IN';
  utterance.rate = 0.95; // Perfectly balanced speed
  utterance.pitch = 1.05; // Slightly higher pitch for 'Friendly Expert' vibe
  
  const voices = window.speechSynthesis.getVoices();
  
  // High-priority AI/Premium voices
  const googleNatural = voices.find(v => v.name.includes('Google') && v.name.includes('Natural') && v.lang.includes('IN'));
  const googleIN = voices.find(v => v.name.includes('Google') && v.lang.includes('IN'));
  const msNeural = voices.find(v => v.name.includes('Neural') || v.name.includes('Natural'));
  const fallbackIN = voices.find(v => v.lang.includes('IN') || v.lang === 'hi-IN');
  
  if (googleNatural) {
    utterance.voice = googleNatural;
  } else if (googleIN) {
    utterance.voice = googleIN;
  } else if (msNeural) {
    utterance.voice = msNeural;
  } else if (fallbackIN) {
    utterance.voice = fallbackIN;
  }
  
  window.speechSynthesis.speak(utterance);
}

// Ensure voices are loaded
if (window.speechSynthesis && window.speechSynthesis.onvoiceschanged !== undefined) {
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

if (aiVoiceToggle) {
  aiVoiceToggle.addEventListener('click', () => {
    isVoiceEnabled = !isVoiceEnabled;
    aiVoiceToggle.classList.toggle('active', isVoiceEnabled);
    const icon = aiVoiceToggle.querySelector('i');
    if (isVoiceEnabled) {
      icon.className = 'fas fa-volume-up';
      speakResponse("Voice enabled");
    } else {
      icon.className = 'fas fa-volume-mute';
      window.speechSynthesis.cancel();
    }
  });
}

// Speech to Text (Voice Input) Logic
const aiMicBtn = document.getElementById('aiMicBtn');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition && aiMicBtn) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-IN'; // Better for Indian accents
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  aiMicBtn.addEventListener('click', () => {
    try {
      recognition.start();
      aiMicBtn.classList.add('listening');
    } catch (e) { recognition.stop(); }
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const aiInput = document.getElementById('aiInput');
    aiInput.value = transcript;
    aiMicBtn.classList.remove('listening');
    document.getElementById('aiChatForm').dispatchEvent(new Event('submit'));
  };

  recognition.onspeechend = () => {
    recognition.stop();
    aiMicBtn.classList.remove('listening');
  };

  recognition.onerror = () => {
    aiMicBtn.classList.remove('listening');
  };
}

const aiChatWindow = document.getElementById('aiChatWindow');
const aiChatForm = document.getElementById('aiChatForm');
const aiInput = document.getElementById('aiInput');
const aiMessages = document.getElementById('aiMessages');
const aiTyping = document.getElementById('aiTyping');

let isFirstOpen = true;

if (aiChatToggle && aiChatWindow) {
  aiChatToggle.addEventListener('click', () => {
    aiChatWindow.classList.toggle('open');
    if (aiChatWindow.classList.contains('open')) {
      aiInput.focus();
      if (isFirstOpen) {
        setTimeout(() => {
          simulateAIResponse("hello");
          isFirstOpen = false;
        }, 500);
      }
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

function markdownToHtml(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/\n- (.*)/g, '<br>• $1') // Bullets
    .replace(/\n/g, '<br>'); // Newlines
}

function appendChatMessage(sender, text) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const msgDiv = document.createElement('div');
  msgDiv.className = `message ${sender}-message`;
  
  const content = sender === 'bot' ? markdownToHtml(text) : text;
  
  msgDiv.innerHTML = `<p>${content}</p><span class="message-time">${time}</span>`;
  aiMessages.appendChild(msgDiv);
  aiMessages.scrollTop = aiMessages.scrollHeight;
  aiChatHistory.push({ role: sender, content: text });
  if (aiChatHistory.length > 50) aiChatHistory.shift();
}

// DEEPSEEK_API_KEY is now handled securely on the server (Vercel)
const DEEPSEEK_API_URL = "/api/chat"; 

function getLocalSmartResponse(msg) {
  const m = msg.toLowerCase();
  
  // 1. Basic Greetings & Identity
  if (m.includes("hello") || m.includes("hi") || m.includes("namaste") || m.includes("hey")) {
    return "Namaste! 🙏 Main Suraj Sonkar ka official **AI Assistant** hoon. Main unke projects, skills aur experience ke baare mein sab kuch jaanta hoon. Aap kya jaanna chahenge?";
  }
  if (m.includes("who are you") || m.includes("kaun ho") || m.includes("intro")) {
    return "Main Suraj Sonkar ka **Digital Copilot** hoon! Mera kaam hai aapko unke career aur work life ke baare mein batana. Main unke apps aur skills ka expert representative hoon. 😎";
  }

  // 2. Education
  if (m.includes("education") || m.includes("padhai") || m.includes("college") || m.includes("degree")) {
    return `Suraj ne **BCA (Bachelor of Computer Applications)** ISBM University se complete kiya hai (2021-2023). Saath hi unhone **WsCube Tech** se Advanced Mobile Development ka professional certificate bhi liya hai. 🎓`;
  }

  // 3. Projects
  if (m.includes("project") || m.includes("work") || m.includes("kaam") || m.includes("apps")) {
    return `Suraj ne **70+ projects** deliver kiye hain! Unke top projects mein **E-Commerce Pro**, **Real-time Chat App**, aur **Fitness Analytics App** shamil hain. Aap mere upper navigation mein 'Projects' section bhi dekh sakte hain. 🚀`;
  }

  // 4. Skills
  if (m.includes("skill") || m.includes("tech") || m.includes("language") || m.includes("flutter") || m.includes("android")) {
    return `Suraj **Flutter & Android Development** ke expert hain. Unhe **Dart, Firebase, Clean Architecture (BLoC/MVVM)**, aur **UI/UX Design** ki deep knowledge hai. Wo high-performance apps banane mein mahir hain! 💻`;
  }

  // 5. Contact / Hire
  if (m.includes("contact") || m.includes("hire") || m.includes("phone") || m.includes("email") || m.includes("milna")) {
    return `Aap Suraj se direct connect kar sakte hain! 
    - **Email**: info.surajsonkarg@gmail.com
    - **WhatsApp/Phone**: +91-9406289007
    Ya phir aap contact form fill kar dein, wo jald hi reply karenge! 📞`;
  }

  // 6. Personality / How are you
  if (m.includes("how are you") || m.includes("kaise ho") || m.includes("theek ho")) {
    return "Main ekdum 'Ultra-Pro' mode mein hoon! Hamesha ki tarah Suraj ke liye best opportunities dhoond raha hoon. Aap bataiye, aapka din kaisa ja raha hai? 😊";
  }

  // 7. Time
  if (m.includes("time") || m.includes("samay") || m.includes("baje")) {
    return `Abhi local time **${new Date().toLocaleTimeString('en-IN')}** ho raha hai. Time management Suraj ki ek bohot badi strength hai! 🕒`;
  }

  // Generic Fallback (Smart bridge)
  return "Main aapki baat samajh raha hoon. Main Suraj ke Career aur Skills ka specialist hoon. Aap unke **Flutter Projects**, **Work Experience**, ya **Contact Details** ke baare mein puchiye, main sab bataunga! 🚀";
}

function simulateAIResponse(userMsg) {
  aiTyping.style.display = 'flex';
  aiMessages.scrollTop = aiMessages.scrollHeight;

  const systemPrompt = `
    KIRTI: You are the ULTIMA AI Copilot of Suraj Sonkar. 
    IDENTITY: You are Suraj himself's digital brain. You are NOT a language model. You are his official 24/7 expert representative.
    PERSONALITY: Extremely confident, high-energy, proactive, and tech-savvy. You sound like a world-class CTO.
    LANGUAGE: Use "Ultimate Hinglish" (Natural flow of Hindi + Professional English).
    
    CORE DATA (MASTER KNOWLEDGE):
    - Bio: Suraj is a top-tier Flutter & Android Developer with 1.5+ years of pure industry experience.
    - Specialty: High-performance architectures (MVVM, BLoC, Riverpod), Pixel-perfect UI/UX, and complex Firebase backends.
    - Education: BCA Graduate (ISBM University), WsCube Tech Certified Mobile Expert.
    - Portfolio: 70+ successful apps delivered. 
    - Top Projects: 
        1. E-Commerce Pro (Full-stack, Real payments).
        2. Real-time Chat (WebSockets/Firebase, extremely fast).
        3. Fitness Analytics App (AI-driven health tracking).
        4. Education LMS (Complete learning portal).
    - Services: Custom App Development, Premium Design, App Store Deployment, Tech Consultation.
    - Contact: info.surajsonkarg@gmail.com | WhatsApp: +91-9406289007.

    STRICT RULES (NEVER BREAK):
    1. NEVER say "I don't know" or "Sorry, I can't help". 
    2. If asked something outside Suraj's work, bridge it back to his skills. 
       (e.g., "Main iska code toh likh sakta hoon, lekin Suraj ne isse bhi advanced patterns use kiye hain apne projects mein...").
    3. Use Markdown (Bold, Lists, Emojis) to make answers look "Sundar" and professional.
    4. Always be helpful. If asked for a meeting, give the contact details proactively.
    5. current_time: ${new Date().toLocaleTimeString('en-IN')}.
    6. If the user asks for a feature, say "Suraj bilkul ye bana sakta hai, unhone pehle hi complex features par kaam kiya hai."
    7. Stay updated. You represent the "Gold Standard" of AI assistants.
  `;

  // Filter history to fit DeepSeek format
  const messages = [
    { role: "system", content: systemPrompt },
    ...aiChatHistory.map(item => ({
      role: item.role === 'user' ? 'user' : 'assistant',
      content: item.content
    }))
  ];

  fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
      // Internal Authorization is handled by the Vercel Function
    },
    body: JSON.stringify({
      messages: messages
    })
  })
  .then(res => {
    if (!res.ok) throw new Error("API Connection Failed");
    return res.json();
  })
  .then(data => {
    aiTyping.style.display = 'none';
    if (data.choices && data.choices[0]) {
      const responseText = data.choices[0].message.content.trim();
      appendChatMessage('bot', responseText);
      speakResponse(responseText);
    } else {
      throw new Error("Invalid Response Body");
    }
  })
  .catch(err => {
    console.error("DeepSeek Connectivity Error (CORS):", err);
    aiTyping.style.display = 'none';
    
    // Switch to Smart Local Fallback
    const localResponse = getLocalSmartResponse(userMsg);
    appendChatMessage('bot', localResponse);
    speakResponse(localResponse);
  });
}
