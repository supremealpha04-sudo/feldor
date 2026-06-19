// ===== FELDOR_HEALTH - Global Scripts =====

// Dark Mode
function initTheme() {
  const saved = localStorage.getItem('feldor-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
}
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('feldor-theme', next);
  updateThemeIcon();
}
function updateThemeIcon() {
  const btn = document.querySelector('.theme-toggle i');
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// Navbar scroll
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Mobile menu
function toggleMobileMenu() {
  document.querySelector('.nav-links').classList.toggle('active');
}

// Reveal on scroll
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1 });
  reveals.forEach(r => observer.observe(r));
}

// Loading screen
function hideLoading() {
  const loader = document.querySelector('.loading-screen');
  if (loader) {
    setTimeout(() => { loader.classList.add('hidden'); }, 800);
  }
}

// CountUp animation for stats
function animateCountUp(el, target, suffix = '') {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, 25);
}

// Init countups when visible
function initCountUps() {
  document.querySelectorAll('[data-countup]').forEach(el => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const target = parseFloat(el.dataset.countup);
          const suffix = el.dataset.suffix || '';
          animateCountUp(el, target, suffix);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(el);
  });
}

// Chat functionality
function initChat() {
  const input = document.querySelector('.chat-input-wrap input');
  const sendBtn = document.querySelector('.chat-input-wrap .send-btn');
  const messages = document.querySelector('.chat-messages');
  if (!input || !messages) return;

  function addMessage(text, isUser) {
    const msg = document.createElement('div');
    msg.className = 'chat-message ' + (isUser ? 'user' : 'ai');
    msg.innerHTML = `
      <div class="chat-avatar ${isUser ? 'user' : 'ai'}"><i class="fas fa-${isUser ? 'user' : 'robot'}"></i></div>
      <div class="chat-bubble">${text}</div>
    `;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, true);
    input.value = '';
    setTimeout(() => {
      const responses = [
        "I've analyzed your symptoms. Based on the data, I recommend scheduling a consultation with an oncologist for further evaluation.",
        "Your recent screening results look promising. The AI detected no anomalies with 98.2% confidence.",
        "I can help you understand your MRI results. Would you like me to explain the findings in detail?",
        "I've checked your health history. Your risk assessment has improved by 15% since your last screening.",
        "Based on your uploaded scan, I recommend a follow-up CT scan within the next 30 days for confirmation."
      ];
      addMessage(responses[Math.floor(Math.random() * responses.length)], false);
    }, 1200);
  }

  sendBtn?.addEventListener('click', handleSend);
  input.addEventListener('keypress', e => { if (e.key === 'Enter') handleSend(); });

  document.querySelectorAll('.suggested-prompts button').forEach(btn => {
    btn.addEventListener('click', () => {
      input.value = btn.textContent;
      handleSend();
    });
  });
}

// Sidebar toggle for mobile
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
  document.querySelector('.sidebar-overlay').classList.toggle('active');
}

// Chart bars animation
function initCharts() {
  document.querySelectorAll('.chart-bar').forEach(bar => {
    const h = bar.dataset.height;
    if (h) bar.style.height = h;
  });
}

// Progress ring animation
function initProgressRings() {
  document.querySelectorAll('.progress-ring-fill').forEach(ring => {
    const percent = parseFloat(ring.dataset.percent) || 0;
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percent / 100) * circumference;
    setTimeout(() => { ring.style.strokeDashoffset = offset; }, 500);
  });
}

// Initialize all
function initApp() {
  initTheme();
  updateThemeIcon();
  initNavbar();
  initReveal();
  initCountUps();
  initChat();
  initCharts();
  initProgressRings();
  hideLoading();
}

document.addEventListener('DOMContentLoaded', initApp);