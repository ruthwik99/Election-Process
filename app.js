// ===== ELECTION PROCESS APP =====

// --- Particles ---
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  document.body.insertBefore(canvas, document.body.firstChild);
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 50; i++) {
    particles.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, vx: (Math.random()-0.5)*0.3, vy: (Math.random()-0.5)*0.3, r: Math.random()*2+0.5, o: Math.random()*0.3+0.1 });
  }
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if(p.x<0) p.x=canvas.width; if(p.x>canvas.width) p.x=0;
      if(p.y<0) p.y=canvas.height; if(p.y>canvas.height) p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(99,102,241,${p.o})`; ctx.fill();
    });
    // Draw lines between close particles
    for(let i=0;i<particles.length;i++) for(let j=i+1;j<particles.length;j++) {
      const dx=particles[i].x-particles[j].x, dy=particles[i].y-particles[j].y;
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<120) { ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.strokeStyle=`rgba(99,102,241,${0.06*(1-dist/120)})`; ctx.stroke(); }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// --- Navigation ---
let currentSection = 'home';

function navigateTo(section) {
  currentSection = section;
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(`section-${section}`).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.section === section);
  });
  document.getElementById('mobile-nav').classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => navigateTo(btn.dataset.section));
});

document.getElementById('mobile-menu-btn').addEventListener('click', () => {
  document.getElementById('mobile-nav').classList.toggle('open');
});

// --- Timeline ---
function renderTimeline() {
  const container = document.getElementById('timeline-container');
  container.innerHTML = TIMELINE_DATA.map((item, i) => `
    <div class="timeline-item" data-index="${i}" style="animation: fadeIn 0.5s ease ${i * 0.1}s both;">
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="phase-label">${item.phase}</div>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
        <span class="timeline-date">📅 ${item.date}</span>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('click', () => openTimelineDetail(parseInt(item.dataset.index)));
  });
}

function openTimelineDetail(index) {
  const data = TIMELINE_DATA[index];
  const panel = document.getElementById('timeline-detail-panel');
  const content = document.getElementById('detail-content');

  content.innerHTML = `
    <div class="detail-phase">${data.phase}</div>
    <h2>${data.title}</h2>
    <p><strong>Timeline:</strong> ${data.date}</p>
    <p>${data.details}</p>
    <h4 style="margin: 20px 0 12px; font-family: var(--font-display);">Key Points</h4>
    <ul>${data.keyPoints.map(p => `<li>${p}</li>`).join('')}</ul>
    <div class="detail-fact">💡 <strong>Did you know?</strong> ${data.fact}</div>
  `;
  panel.classList.add('open');
}

document.getElementById('detail-close').addEventListener('click', () => {
  document.getElementById('timeline-detail-panel').classList.remove('open');
});

// --- Process Tabs ---
function renderProcess() {
  const tabsContainer = document.getElementById('process-tabs');
  const contentContainer = document.getElementById('process-content');

  tabsContainer.innerHTML = PROCESS_DATA.map((item, i) => `
    <button class="process-tab ${i === 0 ? 'active' : ''}" data-index="${i}">
      <span class="tab-num">${i + 1}</span>${item.icon} ${item.title}
    </button>
  `).join('');

  function showProcess(index) {
    const data = PROCESS_DATA[index];
    tabsContainer.querySelectorAll('.process-tab').forEach((t, i) => t.classList.toggle('active', i === index));
    contentContainer.innerHTML = `
      <h3>${data.icon} ${data.title}</h3>
      <p>${data.description}</p>
      <div class="process-steps">
        ${data.steps.map((step, i) => `
          <div class="process-step" style="animation: fadeIn 0.4s ease ${i * 0.08}s both;">
            <div class="step-num">${i + 1}</div>
            <div class="step-info">
              <h4>${step.title}</h4>
              <p>${step.desc}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  showProcess(0);
  tabsContainer.querySelectorAll('.process-tab').forEach(tab => {
    tab.addEventListener('click', () => showProcess(parseInt(tab.dataset.index)));
  });
}

// --- Quiz ---
let quizState = { current: 0, score: 0, answers: [] };

function startQuiz() {
  quizState = { current: 0, score: 0, answers: [] };
  document.getElementById('quiz-start').classList.add('hidden');
  document.getElementById('quiz-results').classList.add('hidden');
  document.getElementById('quiz-active').classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  const q = QUIZ_DATA[quizState.current];
  const letters = ['A', 'B', 'C', 'D'];

  document.getElementById('quiz-question-num').textContent = `Question ${quizState.current + 1} of ${QUIZ_DATA.length}`;
  document.getElementById('quiz-score-display').textContent = `Score: ${quizState.score}`;
  document.getElementById('quiz-progress-fill').style.width = `${((quizState.current) / QUIZ_DATA.length) * 100}%`;
  document.getElementById('quiz-question-text').textContent = q.question;
  document.getElementById('quiz-feedback').classList.add('hidden');
  document.getElementById('btn-next-question').classList.add('hidden');

  const optionsEl = document.getElementById('quiz-options');
  optionsEl.innerHTML = q.options.map((opt, i) => `
    <button class="quiz-option" data-index="${i}">
      <span class="opt-letter">${letters[i]}</span>
      <span>${opt}</span>
    </button>
  `).join('');

  optionsEl.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => selectAnswer(parseInt(btn.dataset.index)));
  });
}

function selectAnswer(index) {
  const q = QUIZ_DATA[quizState.current];
  const isCorrect = index === q.correct;
  const options = document.querySelectorAll('.quiz-option');
  const feedback = document.getElementById('quiz-feedback');

  if (isCorrect) quizState.score++;
  quizState.answers.push(index);

  options.forEach((opt, i) => {
    opt.classList.add('disabled');
    if (i === q.correct) opt.classList.add('correct');
    if (i === index && !isCorrect) opt.classList.add('wrong');
  });

  feedback.classList.remove('hidden', 'correct-feedback', 'wrong-feedback');
  feedback.classList.add(isCorrect ? 'correct-feedback' : 'wrong-feedback');
  document.getElementById('feedback-icon').textContent = isCorrect ? '✅' : '❌';
  document.getElementById('feedback-text').textContent = q.explanation;

  const nextBtn = document.getElementById('btn-next-question');
  nextBtn.classList.remove('hidden');
  nextBtn.querySelector('span').textContent = quizState.current < QUIZ_DATA.length - 1 ? 'Next Question' : 'See Results';
}

function nextQuestion() {
  quizState.current++;
  if (quizState.current >= QUIZ_DATA.length) {
    showResults();
  } else {
    showQuestion();
  }
}

function showResults() {
  document.getElementById('quiz-active').classList.add('hidden');
  document.getElementById('quiz-results').classList.remove('hidden');

  const pct = Math.round((quizState.score / QUIZ_DATA.length) * 100);
  const circumference = 2 * Math.PI * 52; // r=52
  const offset = circumference - (pct / 100) * circumference;

  document.getElementById('results-score-text').textContent = `${pct}%`;
  document.getElementById('results-correct').textContent = quizState.score;
  document.getElementById('results-wrong').textContent = QUIZ_DATA.length - quizState.score;
  document.getElementById('results-total').textContent = QUIZ_DATA.length;

  const circle = document.getElementById('score-ring-circle');
  setTimeout(() => { circle.style.strokeDashoffset = offset; circle.style.transition = 'stroke-dashoffset 1.5s ease'; }, 100);

  // Confetti for good scores
  if (pct >= 60) {
    const card = document.querySelector('.results-card');
    card.style.position = 'relative';
    card.style.overflow = 'hidden';
    setTimeout(() => spawnConfetti(card), 300);
  }

  if (pct >= 80) {
    document.getElementById('results-title').textContent = '🎉 Excellent!';
    document.getElementById('results-message').textContent = "You have an outstanding understanding of the election process!";
  } else if (pct >= 60) {
    document.getElementById('results-title').textContent = '👍 Great Job!';
    document.getElementById('results-message').textContent = "You have a good grasp of the election process. Review a few more topics to master it!";
  } else if (pct >= 40) {
    document.getElementById('results-title').textContent = '📚 Keep Learning!';
    document.getElementById('results-message').textContent = "You're on the right track! Explore the Timeline and Process sections to improve.";
  } else {
    document.getElementById('results-title').textContent = '🔄 Try Again!';
    document.getElementById('results-message').textContent = "Don't worry! Go through the learning sections and come back to ace this quiz.";
  }
}

// --- Glossary ---
function renderGlossary() {
  const grid = document.getElementById('glossary-grid');
  const renderCards = (data) => {
    grid.innerHTML = data.map(item => `
      <div class="glossary-card">
        <h4>${item.term}</h4>
        <p>${item.definition}</p>
      </div>
    `).join('');
    if (data.length === 0) {
      grid.innerHTML = '<p style="text-align:center; color: var(--text-dim); grid-column: 1/-1; padding: 40px;">No matching terms found. Try a different search.</p>';
    }
  };
  renderCards(GLOSSARY_DATA);

  document.getElementById('glossary-search-input').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const filtered = GLOSSARY_DATA.filter(item =>
      item.term.toLowerCase().includes(query) || item.definition.toLowerCase().includes(query)
    );
    renderCards(filtered);
  });
}

// --- Chat Assistant ---
const chatFab = document.getElementById('chat-fab');
const chatPanel = document.getElementById('chat-panel');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

chatFab.addEventListener('click', () => {
  chatPanel.classList.toggle('open');
  if (chatPanel.classList.contains('open')) chatInput.focus();
});
chatClose.addEventListener('click', () => chatPanel.classList.remove('open'));

function showTypingIndicator() {
  const typing = document.createElement('div');
  typing.className = 'chat-msg bot';
  typing.id = 'typing-indicator';
  typing.innerHTML = '<div class="chat-msg-content"><div class="typing-indicator"><span></span><span></span><span></span></div></div>';
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
function removeTypingIndicator() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

function addMessage(text, type) {
  const msg = document.createElement('div');
  msg.className = `chat-msg ${type}`;
  // Convert markdown-like bold to HTML
  const formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  msg.innerHTML = `<div class="chat-msg-content">${formatted}</div>`;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(input) {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(CHAT_RESPONSES)) {
    if (key !== 'default' && lower.includes(key)) return response;
  }
  // Check for specific keywords
  if (lower.includes('vote') || lower.includes('voting') || lower.includes('poll')) return CHAT_RESPONSES['election day'];
  if (lower.includes('register') || lower.includes('enroll')) return CHAT_RESPONSES['registration'];
  if (lower.includes('campaign') || lower.includes('rally')) return CHAT_RESPONSES['campaign'];
  if (lower.includes('count') || lower.includes('result')) return CHAT_RESPONSES['counting'];
  if (lower.includes('machine') || lower.includes('evm')) return CHAT_RESPONSES['evm'];
  if (lower.includes('nota') || lower.includes('none of the above')) return CHAT_RESPONSES['nota'];
  if (lower.includes('electoral college') || lower.includes('president')) return CHAT_RESPONSES['electoral college'];
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return "👋 Hello! I'm your Election Process Assistant. Ask me about voter registration, election day, campaigning, vote counting, or any other election topic!";
  if (lower.includes('thank')) return "You're welcome! 😊 Feel free to ask more questions about the election process anytime!";
  return CHAT_RESPONSES['default'];
}

function askBot(text) {
  addMessage(text, 'user');
  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    addMessage(getBotResponse(text), 'bot');
  }, 800 + Math.random() * 700);
}

chatSend.addEventListener('click', () => {
  const text = chatInput.value.trim();
  if (!text) return;
  askBot(text);
  chatInput.value = '';
});

chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const text = chatInput.value.trim();
    if (!text) return;
    askBot(text);
    chatInput.value = '';
  }
});

// --- Intersection Observer for animations ---
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// --- Animated Counter ---
function animateCounter(el, target) {
  const suffix = target.toString().includes('+') ? '+' : '';
  const num = parseInt(target);
  let current = 0;
  const step = Math.max(1, Math.floor(num / 40));
  const interval = setInterval(() => {
    current += step;
    if (current >= num) { current = num; clearInterval(interval); }
    el.textContent = current + suffix;
  }, 30);
}

// --- Confetti ---
function spawnConfetti(container) {
  const colors = ['#6366f1','#8b5cf6','#a78bfa','#22c55e','#f59e0b','#ec4899'];
  for (let i = 0; i < 30; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random()*100 + '%';
    c.style.top = '-10px';
    c.style.background = colors[Math.floor(Math.random()*colors.length)];
    c.style.animationDelay = Math.random()*0.5 + 's';
    c.style.animationDuration = (1+Math.random()) + 's';
    container.appendChild(c);
    setTimeout(() => c.remove(), 2000);
  }
}

// --- Scroll Reveal ---
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.info-card, .stat-card, .timeline-item, .glossary-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// --- Header scroll effect ---
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const header = document.getElementById('main-header');
  const scroll = window.scrollY;
  if (scroll > 100) {
    header.style.background = 'rgba(10,10,26,0.95)';
  } else {
    header.style.background = 'rgba(10,10,26,0.8)';
  }
  lastScroll = scroll;
});

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  renderTimeline();
  renderProcess();
  renderGlossary();
  // Animate stat numbers
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = el.textContent;
    animateCounter(el, target);
  });
  setTimeout(initScrollReveal, 100);
});
