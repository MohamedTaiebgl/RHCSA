// ============================================================
// APP.JS — Router, Navigation, Tab Switching
// ============================================================

// ── ROUTER ───────────────────────────────────────────────────
const PAGES = {
  home:        renderHome,
  plan:        renderPlan,
  definitions: renderDefinitions,
  essentials:  renderEssentials,
  users:       renderUsers,
  permissions: renderPermissions,
  storage:     renderStorage,
  processes:   renderProcesses,
  networking:  renderNetworking,
  services:    renderServices,
  software:    renderSoftware,
  security:    renderSecurity,
  scripting:   renderScripting,
  containers:  renderContainers,
  boot:        renderBoot,
  labs:        renderLabs,
  tp:          renderTP,
  quiz:        renderQuiz,
  exam:        renderExam,
  cheatsheet:  renderCheatSheet,
};

let currentPage = 'home';

function navigate(page) {
  // stop exam timer if navigating away
  if (page !== 'exam' && examState.timer) {
    clearInterval(examState.timer);
    examState.timer = null;
  }

  const render = PAGES[page];
  if (!render) { navigate('home'); return; }

  currentPage = page;

  // Update nav highlight
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });

  // Render
  const content = document.getElementById('page-content');
  content.innerHTML = render();
  content.classList.remove('page-enter');
  void content.offsetWidth; // reflow
  content.classList.add('page-enter');
  window.scrollTo(0, 0);

  // Close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');
}

// ── TAB SWITCHING ────────────────────────────────────────────
function switchTab(groupId, panelId) {
  // Deactivate all tabs and panels in this group
  document.querySelectorAll(`.tab`).forEach(t => {
    if (t.getAttribute('onclick') && t.getAttribute('onclick').includes(`'${groupId}'`)) {
      t.classList.remove('active');
    }
  });
  document.querySelectorAll(`.tab-panel`).forEach(p => {
    if (p.id && p.id.startsWith(`tab-${groupId}-`)) {
      p.classList.remove('active');
    }
  });

  // Activate clicked
  document.querySelectorAll('.tab').forEach(t => {
    if (t.getAttribute('onclick') === `switchTab('${groupId}','${panelId}')`) {
      t.classList.add('active');
    }
  });
  const panel = document.getElementById(panelId);
  if (panel) panel.classList.add('active');
}

// ── SIDEBAR ──────────────────────────────────────────────────
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', e => {
  const sb = document.getElementById('sidebar');
  const hb = document.getElementById('hamburger');
  if (sb.classList.contains('open') && !sb.contains(e.target) && !hb.contains(e.target)) {
    sb.classList.remove('open');
  }
});

// ── NAV CLICK BINDING ────────────────────────────────────────
document.querySelectorAll('.nav-item[data-page]').forEach(el => {
  el.addEventListener('click', () => navigate(el.dataset.page));
});

// ── KEYBOARD SHORTCUTS ───────────────────────────────────────
document.addEventListener('keydown', e => {
  // ESC closes sidebar
  if (e.key === 'Escape') document.getElementById('sidebar').classList.remove('open');
  // Ctrl+K = quick focus search (on definitions page)
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    if (currentPage === 'definitions') {
      const s = document.getElementById('def-search');
      if (s) { s.focus(); e.preventDefault(); }
    }
  }
});

// ── INIT ─────────────────────────────────────────────────────
// Load page from URL hash if present
function loadFromHash() {
  const hash = window.location.hash.replace('#', '');
  navigate(PAGES[hash] ? hash : 'home');
}

// Update hash on navigate for bookmarkability
const _origNav = navigate;
window.navigate = function(page) {
  _origNav(page);
  history.replaceState(null, '', '#' + page);
};

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.replace('#', '');
  if (PAGES[hash] && hash !== currentPage) navigate(hash);
});

// Boot
loadFromHash();
