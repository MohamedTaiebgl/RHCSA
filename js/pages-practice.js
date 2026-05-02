// ============================================================
// PAGES-PRACTICE.JS — Labs, TP Zone, Quiz, Mock Exam
// ============================================================

// ── STATE ────────────────────────────────────────────────────
let quizState = { qs:[], cur:0, score:0, answered:false };
let examState = { qs:[], cur:0, score:0, answered:false, timer:null, left:2700 };
let labHints   = {};   // { labId: Set of shown hint indices }
let labTasks   = {};   // { labId: Set of done task indices }
let labDone    = JSON.parse(localStorage.getItem('rhcsa-labs-done') || '[]');
let tpDone     = JSON.parse(localStorage.getItem('rhcsa-tp-done')   || '[]');

// ── LABS PAGE ────────────────────────────────────────────────
function renderLabs() {
  const total = LABS.length;
  const done  = labDone.length;
  const pct   = total ? Math.round(done/total*100) : 0;

  const DOMAIN_META = {
    essentials:  { label:'Essential Tools',   color:'#e63946' },
    users:       { label:'Users & Groups',    color:'#4cc9f0' },
    permissions: { label:'Permissions & ACL', color:'#ffd60a' },
    storage:     { label:'Storage & LVM',     color:'#06d6a0' },
    processes:   { label:'Processes & Jobs',  color:'#f77f00' },
    networking:  { label:'Networking',        color:'#a855f7' },
    services:    { label:'Services & systemd',color:'#4cc9f0' },
    software:    { label:'Software Mgmt',     color:'#e63946' },
    security:    { label:'SELinux & Firewall',color:'#06d6a0' },
    scripting:   { label:'Bash Scripting',    color:'#ffd60a' },
    containers:  { label:'Containers',        color:'#4cc9f0' },
    boot:        { label:'Boot & Recovery',   color:'#f77f00' },
  };

  // group by domain
  const byDomain = {};
  LABS.forEach(l => {
    if (!byDomain[l.domain]) byDomain[l.domain] = [];
    byDomain[l.domain].push(l);
  });

  const diffColor = { easy:'var(--green)', medium:'var(--yellow)', hard:'var(--red)' };

  const grid = Object.entries(byDomain).map(([dom, labs]) => {
    const meta = DOMAIN_META[dom] || { label: dom, color:'var(--red)' };
    const domDone = labs.filter(l => labDone.includes(l.id)).length;
    return `
      <div style="margin-bottom:28px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
          <div style="font-family:var(--font-display);font-size:.92rem;font-weight:700;color:${meta.color}">${meta.label}</div>
          <div style="font-size:.62rem;color:var(--muted)">${domDone}/${labs.length} done</div>
        </div>
        <div class="labs-grid">
          ${labs.map(l => {
            const isDone = labDone.includes(l.id);
            return `<div class="lab-card ${isDone?'done':''}" style="--acc:${meta.color}" onclick="openLab('${l.id}')">
              ${isDone ? '<div class="lab-done-chk">✓</div>' : ''}
              <div class="lab-diff" style="color:${diffColor[l.difficulty]}">${l.difficulty.toUpperCase()} · ⏱ ${l.time} min</div>
              <div class="lab-title">${l.title}</div>
              <div class="lab-obj">${l.objective}</div>
              <div class="lab-meta"><span>${l.tasks.length} tasks</span><span style="color:${meta.color}">Open →</span></div>
            </div>`;
          }).join('')}
        </div>
      </div>`;
  }).join('');

  return `
    <div class="hero">
      <div class="hero-label">Practical Training</div>
      <h1>Hands-on <span>Labs</span></h1>
      <p>Real exam-style exercises. Work command by command exactly like the real RHCSA. Click tasks to mark them done. Use hints sparingly.</p>
    </div>
    <div class="content">
      <div style="background:var(--card);border:1px solid var(--border);border-radius:6px;padding:14px 18px;margin-bottom:24px;display:flex;align-items:center;gap:18px;flex-wrap:wrap">
        <div>
          <div style="font-size:.6rem;color:var(--muted);text-transform:uppercase;letter-spacing:2px">Lab Progress</div>
          <div style="font-family:var(--font-display);font-size:1.3rem;font-weight:800;color:var(--green)">${done}<span style="color:var(--muted);font-size:.85rem"> / ${total} labs</span></div>
        </div>
        <div style="flex:1;min-width:160px"><div class="prog-bar"><div class="prog-fill" style="width:${pct}%"></div></div></div>
        <button class="btn btn-ghost btn-sm" onclick="resetLabs()">🔄 Reset</button>
      </div>
      ${grid}
      ${renderFooter()}
    </div>`;
}

function resetLabs() {
  if (!confirm('Reset all lab progress?')) return;
  labDone = []; labHints = {}; labTasks = {};
  localStorage.removeItem('rhcsa-labs-done');
  navigate('labs');
}

// ── LAB DETAIL ───────────────────────────────────────────────
function openLab(id) {
  const lab = LABS.find(l => l.id === id);
  if (!lab) return;
  if (!labHints[id]) labHints[id] = new Set();
  if (!labTasks[id]) labTasks[id] = new Set();

  const isDone = labDone.includes(id);
  const diffColor = { easy:'var(--green)', medium:'var(--yellow)', hard:'var(--red)' };
  const tasksDone = labTasks[id];
  const allIdx = LABS.findIndex(l => l.id === id);
  const nextLab = LABS[allIdx + 1];

  const tasksHtml = lab.tasks.map((t, i) => {
    const done = tasksDone.has(i);
    const hintShown = labHints[id].has(i);
    return `
      <div class="task-item ${done?'done':''}" id="ti-${i}">
        <div class="task-num" onclick="toggleLabTask('${id}',${i})">${done?'✓':i+1}</div>
        <div class="task-text">${t}</div>
        <div class="task-actions">
          <button class="btn btn-ghost btn-sm task-hint-btn" onclick="toggleLabHint('${id}',${i})">${hintShown?'Hide':'💡 Hint'}</button>
        </div>
      </div>
      <div class="hint-box ${hintShown?'show':''}" id="lh-${id}-${i}">
        <div class="hint-lbl">Hint for Task ${i+1}</div>
        <code style="color:var(--yellow);white-space:pre-wrap;display:block;margin-top:4px">${lab.hints[i]||'No hint available.'}</code>
      </div>`;
  }).join('');

  const solHtml = lab.solution.map((s,i) => `
    <div class="step-block">
      <div class="step-lbl">Step ${i+1}: ${s.desc}</div>
      <div class="cmd-block" onclick="copyCmd(this)">
        <span class="cmd-prompt">$ </span><span class="cmd-text">${escHtml(s.cmd)}</span>
        <span class="copy-tip">📋 Copy</span>
      </div>
    </div>`).join('');

  const valHtml = lab.validation.map(v => `
    <div class="cmd-block" onclick="copyCmd(this)" style="margin-bottom:7px">
      <span class="cmd-prompt">$ </span><span class="cmd-text" style="color:var(--blue)">${escHtml(v)}</span>
      <span class="copy-tip">📋 Copy</span>
    </div>`).join('');

  const html = `
    <div class="hero">
      <div class="hero-label">Lab Exercise</div>
      <h1>${lab.title} ${isDone?'<span style="color:var(--green);font-size:1.2rem">✓</span>':''}</h1>
      <p style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px">
        <span style="color:${diffColor[lab.difficulty]};font-size:.72rem;text-transform:uppercase;letter-spacing:1px">${lab.difficulty}</span>
        <span style="color:var(--muted);font-size:.72rem">⏱ ${lab.time} min</span>
        <span style="color:var(--muted);font-size:.72rem">${lab.tasks.length} tasks</span>
      </p>
    </div>
    <div class="content">
      <div class="info-box">📋 <strong>Scenario:</strong> ${lab.scenario}</div>
      <div class="section-header"><h2>Tasks</h2><span class="badge">${lab.tasks.length}</span></div>
      <div class="task-list">${tasksHtml}</div>

      <div class="section-header">
        <h2>Solution</h2>
        <button class="btn btn-ghost btn-sm" onclick="document.getElementById('lab-sol').classList.toggle('show')">👁 Show / Hide</button>
      </div>
      <div class="warn-box">⚠️ Try all tasks yourself first. Use hints before the solution.</div>
      <div class="sol-section" id="lab-sol">${solHtml}</div>

      <div class="section-header"><h2>Validation</h2></div>
      <div class="ok-box">✅ Run these commands to verify your work is correct:</div>
      ${valHtml}

      <div class="tip-box" style="margin-top:18px"><span>🎯</span><div><strong>Exam Tip:</strong> ${lab.examTip}</div></div>

      <div class="flex-row">
        <button class="btn btn-${isDone?'ghost':'green'}" onclick="markLabDone('${id}')">
          ${isDone ? '✓ Completed' : '✅ Mark as Completed'}
        </button>
        <button class="btn btn-ghost" onclick="navigate('labs')">← Back to Labs</button>
        ${nextLab ? `<button class="btn btn-ghost" onclick="openLab('${nextLab.id}')">Next: ${nextLab.title} →</button>` : ''}
      </div>
      ${renderFooter()}
    </div>`;

  document.getElementById('page-content').innerHTML = html;
  document.getElementById('page-content').classList.add('page-enter');
  window.scrollTo(0,0);
}

function toggleLabTask(id, i) {
  if (!labTasks[id]) labTasks[id] = new Set();
  labTasks[id].has(i) ? labTasks[id].delete(i) : labTasks[id].add(i);
  openLab(id);
}

function toggleLabHint(id, i) {
  if (!labHints[id]) labHints[id] = new Set();
  labHints[id].has(i) ? labHints[id].delete(i) : labHints[id].add(i);
  openLab(id);
}

function markLabDone(id) {
  if (!labDone.includes(id)) labDone.push(id);
  localStorage.setItem('rhcsa-labs-done', JSON.stringify(labDone));
  openLab(id);
}

// ── TP ZONE ──────────────────────────────────────────────────
function renderTP() {
  const total = TP_EXERCISES.length;
  const done  = tpDone.length;

  const DOMAIN_COLOR = {
    essentials:'#e63946', users:'#4cc9f0', permissions:'#ffd60a',
    storage:'#06d6a0', processes:'#f77f00', networking:'#a855f7',
    services:'#4cc9f0', software:'#e63946', security:'#06d6a0',
    scripting:'#ffd60a', containers:'#4cc9f0', boot:'#f77f00',
  };

  return `
    <div class="hero">
      <div class="hero-label">VM Exercises</div>
      <h1>TP <span>Zone</span></h1>
      <p>Standalone exercises to do on your own RHEL 9 / CentOS Stream 9 VM. Each TP has a full correction hidden below — try to solve it before looking.</p>
    </div>
    <div class="content">
      <div class="tip-box"><span>🖥️</span><div><strong>How to use:</strong> Set up a RHEL 9 or CentOS Stream 9 VM. Do each exercise on the real system. Reveal the correction only after you've tried. These exercises mirror real RHCSA exam tasks.</div></div>
      <div style="background:var(--card);border:1px solid var(--border);border-radius:6px;padding:14px 18px;margin-bottom:24px;display:flex;align-items:center;gap:18px;flex-wrap:wrap">
        <div>
          <div style="font-size:.6rem;color:var(--muted);text-transform:uppercase;letter-spacing:2px">TP Progress</div>
          <div style="font-family:var(--font-display);font-size:1.3rem;font-weight:800;color:var(--purple)">${done}<span style="color:var(--muted);font-size:.85rem"> / ${total} TPs</span></div>
        </div>
        <div style="flex:1;min-width:160px"><div class="prog-bar"><div class="prog-fill" style="width:${total?Math.round(done/total*100):0}%;background:var(--purple)"></div></div></div>
        <button class="btn btn-ghost btn-sm" onclick="resetTP()">🔄 Reset</button>
      </div>

      <div class="tp-grid">
        ${TP_EXERCISES.map(tp => {
          const isDone = tpDone.includes(tp.id);
          const col = DOMAIN_COLOR[tp.domain] || 'var(--purple)';
          return `<div class="tp-card ${isDone?'done':''}" onclick="openTP('${tp.id}')">
            ${isDone?'<div class="lab-done-chk">✓</div>':''}
            <div class="tp-card-domain" style="color:${col}">${tp.domain.toUpperCase()} · ${tp.difficulty} · ⏱ ${tp.time}min</div>
            <div class="tp-card-title">${tp.title}</div>
            <div class="tp-card-desc">${tp.description}</div>
            <div class="tp-card-meta">${tp.exercises.length} exercises → Click to start</div>
          </div>`;
        }).join('')}
      </div>
      ${renderFooter()}
    </div>`;
}

function resetTP() {
  if (!confirm('Reset all TP progress?')) return;
  tpDone = [];
  localStorage.removeItem('rhcsa-tp-done');
  navigate('tp');
}

function openTP(id) {
  const tp = TP_EXERCISES.find(t => t.id === id);
  if (!tp) return;
  const isDone = tpDone.includes(id);
  const allIdx = TP_EXERCISES.findIndex(t => t.id === id);
  const nextTP = TP_EXERCISES[allIdx + 1];

  const exHtml = tp.exercises.map((ex, i) => `
    <div class="tp-exercise">
      <div class="tp-exercise-num">Exercise ${ex.num}</div>
      <div class="tp-exercise-text">${ex.text}</div>
      <button class="btn btn-ghost btn-sm" onclick="toggleCorr('corr-${id}-${i}')">🔍 Show Correction</button>
      <div class="correction-box" id="corr-${id}-${i}">
        <div class="correction-lbl">✅ Correction</div>
        <pre style="margin:0;font-size:.73rem">${escHtml(ex.correction)}</pre>
      </div>
    </div>`).join('');

  const html = `
    <div class="hero">
      <div class="hero-label">TP Zone — VM Exercise</div>
      <h1>${tp.title} ${isDone?'<span style="color:var(--green)">✓</span>':''}</h1>
      <p style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px">
        <span style="color:var(--purple);font-size:.72rem;text-transform:uppercase">${tp.domain} · ${tp.difficulty}</span>
        <span style="color:var(--muted);font-size:.72rem">⏱ ${tp.time} min</span>
        <span style="color:var(--muted);font-size:.72rem">${tp.exercises.length} exercises</span>
      </p>
    </div>
    <div class="content">
      <div class="info-box">📋 ${tp.description}<br><strong>Do these exercises on your RHEL 9 VM.</strong> Reveal corrections only after you've tried.</div>
      ${exHtml}
      <div class="flex-row" style="margin-top:22px">
        <button class="btn btn-${isDone?'ghost':'green'}" onclick="markTPDone('${id}')">
          ${isDone ? '✓ Completed' : '✅ Mark as Completed'}
        </button>
        <button class="btn btn-ghost" onclick="navigate('tp')">← Back to TP Zone</button>
        ${nextTP ? `<button class="btn btn-ghost" onclick="openTP('${nextTP.id}')">Next TP: ${nextTP.title} →</button>` : ''}
      </div>
      ${renderFooter()}
    </div>`;

  document.getElementById('page-content').innerHTML = html;
  document.getElementById('page-content').classList.add('page-enter');
  window.scrollTo(0, 0);
}

function toggleCorr(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('show');
}

function markTPDone(id) {
  if (!tpDone.includes(id)) tpDone.push(id);
  localStorage.setItem('rhcsa-tp-done', JSON.stringify(tpDone));
  openTP(id);
}

// ── QUIZ ─────────────────────────────────────────────────────
function renderQuiz() {
  return `
    <div class="hero">
      <div class="hero-label">Knowledge Check</div>
      <h1>Knowledge <span>Quiz</span></h1>
      <p>50 questions across all RHCSA domains. Immediate feedback with explanations after each answer.</p>
    </div>
    <div class="content">
      <div class="quiz-wrap" id="quiz-wrap">
        <div id="quiz-start-screen">
          <div class="info-box">📋 <strong>20 random questions</strong> from all 12 domains. No time limit. Read the explanation after each answer to reinforce learning.</div>
          <div class="flex-row">
            <button class="btn btn-primary" onclick="startQuiz('all')">🧠 All Domains (20 Q)</button>
            <button class="btn btn-ghost" onclick="startQuiz('essentials')">⚙️ Essential Tools</button>
            <button class="btn btn-ghost" onclick="startQuiz('storage')">💾 Storage & LVM</button>
            <button class="btn btn-ghost" onclick="startQuiz('security')">🛡️ SELinux & Firewall</button>
          </div>
        </div>
        <div id="quiz-body" style="display:none"></div>
        <div id="quiz-result" style="display:none"></div>
      </div>
      ${renderFooter()}
    </div>`;
}

function startQuiz(domain) {
  let pool = domain === 'all' ? QUIZ_Q : QUIZ_Q.filter(q => q.d === domain);
  if (!pool.length) pool = QUIZ_Q;
  quizState.qs = shuffle(pool).slice(0, 20);
  quizState.cur = 0; quizState.score = 0; quizState.answered = false;
  document.getElementById('quiz-start-screen').style.display = 'none';
  document.getElementById('quiz-result').style.display = 'none';
  document.getElementById('quiz-body').style.display = 'block';
  renderQuizQ();
}

function renderQuizQ() {
  const { qs, cur } = quizState;
  const q = qs[cur];
  const dots = qs.map((_,i) => `<div class="q-dot ${i<cur?'done':i===cur?'cur':''}"></div>`).join('');
  document.getElementById('quiz-body').innerHTML = `
    <div class="q-progress">${dots}</div>
    <div class="quiz-card">
      <div class="quiz-q-num">Question ${cur+1} of ${qs.length} · <span style="color:var(--muted);font-size:.58rem">${q.d.toUpperCase()}</span></div>
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-opts">
        ${q.o.map((opt,i) => `
          <div class="quiz-opt" id="qopt${i}" onclick="answerQuiz(${i})">
            <div class="opt-letter">${'ABCD'[i]}</div>
            ${opt}
          </div>`).join('')}
      </div>
      <div class="quiz-exp" id="quiz-exp">${q.e}</div>
    </div>
    <div class="flex-row">
      <button class="btn btn-ghost" id="quiz-next" style="display:none" onclick="nextQuizQ()">
        ${cur < qs.length-1 ? 'Next Question →' : 'See Results'}
      </button>
    </div>`;
}

function answerQuiz(idx) {
  if (quizState.answered) return;
  quizState.answered = true;
  const q = quizState.qs[quizState.cur];
  document.querySelectorAll('.quiz-opt').forEach((el, i) => {
    el.classList.add('disabled');
    if (i === q.a) el.classList.add('correct');
    else if (i === idx) el.classList.add('wrong');
  });
  if (idx === q.a) quizState.score++;
  document.getElementById('quiz-exp').classList.add('show');
  document.getElementById('quiz-next').style.display = 'inline-block';
}

function nextQuizQ() {
  quizState.cur++;
  quizState.answered = false;
  if (quizState.cur >= quizState.qs.length) { showQuizResult(); return; }
  renderQuizQ();
}

function showQuizResult() {
  const { score, qs } = quizState;
  const pct = Math.round(score/qs.length*100);
  const msg = pct>=85 ? ['🎉 Excellent! Exam Ready!','Outstanding. Book that exam!','var(--green)']
             : pct>=70 ? ['👍 Good Job!','Review missed questions and practice more.','var(--yellow)']
             : pct>=50 ? ['📚 Keep Studying','Go back through weak domains and retake.','var(--yellow)']
             : ['💪 More Practice Needed','Review all domains carefully. Focus on Storage & SELinux.','var(--red)'];
  document.getElementById('quiz-body').style.display = 'none';
  document.getElementById('quiz-result').style.display = 'block';
  document.getElementById('quiz-result').innerHTML = `
    <div class="score-card">
      <div class="score-circle" style="border-color:${msg[2]}">
        <div class="score-num" style="color:${msg[2]}">${score}</div>
        <div class="score-of">/ ${qs.length}</div>
      </div>
      <h2 style="font-family:var(--font-display);font-size:1.3rem;margin-bottom:6px">${msg[0]}</h2>
      <p style="color:var(--muted);font-size:.78rem;margin-bottom:20px">${pct}% — ${msg[1]}</p>
      <div class="flex-row" style="justify-content:center">
        <button class="btn btn-primary" onclick="startQuiz('all')">🔄 Retake</button>
        <button class="btn btn-ghost" onclick="navigate('exam')">⏱️ Mock Exam</button>
        <button class="btn btn-ghost" onclick="navigate('cheatsheet')">📋 Cheat Sheet</button>
      </div>
    </div>`;
}

// ── MOCK EXAM ────────────────────────────────────────────────
function renderExam() {
  return `
    <div class="hero">
      <div class="hero-label">Certification Simulation</div>
      <h1>Mock <span>Exam</span></h1>
      <p>30 questions, 45-minute timer. Simulates real RHCSA exam pressure. You need 70%+ to pass.</p>
    </div>
    <div class="content">
      <div id="exam-start-screen">
        <div class="warn-box">⏱️ <strong>45 minutes · 30 questions.</strong> Timer starts immediately. Score ≥70% = Pass. The real RHCSA is hands-on only — use this to test conceptual knowledge, then practice on your VM.</div>
        <div class="tip-box"><span>💡</span><div>Exam strategy: Read all questions first. Mark uncertain ones. Start with domains you know best. Manage your time — 90 seconds per question on average.</div></div>
        <div class="flex-row">
          <button class="btn btn-primary" onclick="startExam()">⏱️ Start Mock Exam</button>
          <button class="btn btn-ghost" onclick="navigate('quiz')">🧠 Practice Quiz First</button>
        </div>
      </div>
      <div id="exam-body" style="display:none"></div>
      <div id="exam-result" style="display:none"></div>
      ${renderFooter()}
    </div>`;
}

function startExam() {
  if (examState.timer) clearInterval(examState.timer);
  examState.qs = shuffle(EXAM_Q).slice(0, 30);
  examState.cur = 0; examState.score = 0;
  examState.answered = false; examState.left = 2700;
  document.getElementById('exam-start-screen').style.display = 'none';
  document.getElementById('exam-result').style.display = 'none';
  document.getElementById('exam-body').style.display = 'block';
  document.getElementById('exam-body').innerHTML = `
    <div class="exam-topbar">
      <span style="font-size:.74rem">Mock RHCSA Exam</span>
      <span class="exam-timer" id="exam-timer">45:00</span>
      <span id="exam-q-counter" style="font-size:.74rem">Q 1 / 30</span>
    </div>
    <div style="padding:24px 40px" id="exam-inner"></div>`;
  examState.timer = setInterval(tickExam, 1000);
  renderExamQ();
}

function tickExam() {
  examState.left--;
  const m = String(Math.floor(examState.left/60)).padStart(2,'0');
  const s = String(examState.left%60).padStart(2,'0');
  const el = document.getElementById('exam-timer');
  if (el) {
    el.textContent = `${m}:${s}`;
    el.className = 'exam-timer' + (examState.left < 300 ? ' danger' : '');
  }
  if (examState.left <= 0) { clearInterval(examState.timer); showExamResult(true); }
}

function renderExamQ() {
  const { qs, cur } = examState;
  const q = qs[cur];
  document.getElementById('exam-q-counter').textContent = `Q ${cur+1} / ${qs.length}`;
  const dots = qs.map((_,i) => `<div class="q-dot ${i<cur?'done':i===cur?'cur':''}"></div>`).join('');
  document.getElementById('exam-inner').innerHTML = `
    <div class="q-progress">${dots}</div>
    <div class="quiz-card">
      <div class="quiz-q-num">Question ${cur+1} of ${qs.length} · <span style="color:var(--muted);font-size:.58rem">${q.d.toUpperCase()}</span></div>
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-opts">
        ${q.o.map((opt,i) => `
          <div class="quiz-opt" id="eopt${i}" onclick="answerExam(${i})">
            <div class="opt-letter">${'ABCD'[i]}</div>
            ${opt}
          </div>`).join('')}
      </div>
      <div class="quiz-exp" id="exam-exp">${q.e}</div>
    </div>
    <div class="flex-row">
      <button class="btn btn-ghost" id="exam-next" style="display:none" onclick="nextExamQ()">
        ${cur < qs.length-1 ? 'Next →' : 'Finish Exam'}
      </button>
    </div>`;
}

function answerExam(idx) {
  if (examState.answered) return;
  examState.answered = true;
  const q = examState.qs[examState.cur];
  document.querySelectorAll('.quiz-opt').forEach((el, i) => {
    el.classList.add('disabled');
    if (i === q.a) el.classList.add('correct');
    else if (i === idx) el.classList.add('wrong');
  });
  if (idx === q.a) examState.score++;
  document.getElementById('exam-exp').classList.add('show');
  document.getElementById('exam-next').style.display = 'inline-block';
}

function nextExamQ() {
  examState.cur++;
  examState.answered = false;
  if (examState.cur >= examState.qs.length) { clearInterval(examState.timer); showExamResult(false); return; }
  renderExamQ();
}

function showExamResult(timeout) {
  const { score, qs } = examState;
  const pct = Math.round(score/qs.length*100);
  const pass = pct >= 70;
  const passColor = pass ? 'var(--green)' : 'var(--red)';
  const timeTaken = Math.round((2700 - examState.left) / 60);
  document.getElementById('exam-body').style.display = 'none';
  document.getElementById('exam-result').style.display = 'block';
  document.getElementById('exam-result').innerHTML = `
    <div style="padding:24px 40px">
    <div class="score-card" style="max-width:520px">
      ${timeout ? '<div class="warn-box" style="margin-bottom:16px">⏱️ Time\'s up! Exam automatically submitted.</div>' : ''}
      <div class="score-circle" style="border-color:${passColor}">
        <div class="score-num" style="color:${passColor}">${score}</div>
        <div class="score-of">/ ${qs.length}</div>
      </div>
      <h2 style="font-family:var(--font-display);font-size:1.4rem;margin-bottom:6px;color:${passColor}">
        ${pass ? '✅ PASS' : '❌ FAIL'} — ${pct}%
      </h2>
      <p style="color:var(--muted);font-size:.78rem;margin-bottom:6px">
        ${pass ? 'Above 70% threshold! Schedule your real exam.' : 'Need 70%+ to pass. Review weak areas and retry.'}
      </p>
      <p style="color:var(--muted);font-size:.74rem;margin-bottom:22px">
        Time used: ~${timeTaken} minutes · ${score} correct · ${qs.length-score} wrong
      </p>
      <div style="background:var(--bg3);border-radius:5px;padding:12px;margin-bottom:20px;text-align:left">
        <div style="font-size:.68rem;color:var(--muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:1px">Score breakdown by domain</div>
        ${buildDomainBreakdown(examState.qs, examState)}
      </div>
      <div class="flex-row" style="justify-content:center">
        <button class="btn btn-primary" onclick="startExam()">🔄 Retake Exam</button>
        <button class="btn btn-ghost" onclick="navigate('labs')">🔬 Practice Labs</button>
        <button class="btn btn-ghost" onclick="navigate('cheatsheet')">📋 Cheat Sheet</button>
      </div>
    </div>
    </div>`;
}

function buildDomainBreakdown(qs, state) {
  // We don't store per-question answers, so show domain distribution
  const domains = {};
  qs.forEach(q => { if (!domains[q.d]) domains[q.d] = 0; domains[q.d]++; });
  return Object.entries(domains).map(([d,n]) =>
    `<div style="display:flex;justify-content:space-between;font-size:.7rem;padding:3px 0;border-bottom:1px solid var(--border)">
      <span style="color:var(--text)">${d}</span>
      <span style="color:var(--muted)">${n} question${n>1?'s':''}</span>
    </div>`
  ).join('');
}

// ── UTILS ────────────────────────────────────────────────────
function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function copyCmd(el) {
  const txt = el.querySelector('.cmd-text')?.textContent || '';
  navigator.clipboard.writeText(txt).then(() => {
    const tip = el.querySelector('.copy-tip');
    if (tip) { tip.textContent = '✓ Copied!'; setTimeout(() => tip.textContent = '📋 Copy', 1500); }
  }).catch(() => {});
}

function escHtml(s) {
  return String(s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
