/* =========================================================================
   2) 문법 강조 (외부 라이브러리 없이 최소 구현)
   ========================================================================= */
const SYNTAX = {
  python:     { comment:'#[^\\n]*', keywords:['def','return','if','elif','else','for','while','in','not','and','or','import','from','as','class','True','False','None','print','input','int','float','str','bool','type','len','range'] },
  javascript: { comment:'//[^\\n]*|/\\*[\\s\\S]*?\\*/', keywords:['let','const','var','function','return','if','else','for','while','of','in','class','new','typeof','true','false','null','undefined','console'] },
  java:       { comment:'//[^\\n]*|/\\*[\\s\\S]*?\\*/', keywords:['public','private','protected','static','void','class','new','return','if','else','for','while','int','long','double','float','char','boolean','String','true','false','null','System'] },
  c:          { comment:'//[^\\n]*|/\\*[\\s\\S]*?\\*/', keywords:['include','int','float','double','char','void','return','if','else','for','while','sizeof','const','unsigned','struct','printf','scanf','main'] },
  sql:        { comment:'--[^\\n]*', keywords:['SELECT','FROM','WHERE','ORDER','BY','GROUP','JOIN','ON','ASC','DESC','LIMIT','AS','COUNT','SUM','AVG','MAX','MIN','AND','OR','NOT','IN','LIKE','NULL','INSERT','INTO','VALUES','UPDATE','DELETE','CREATE','TABLE'] }
};
const STRING_PAT = `"""[\\s\\S]*?"""|'''[\\s\\S]*?'''|\`(?:\\\\.|[^\`\\\\])*\`|"(?:\\\\.|[^"\\\\\\n])*"|'(?:\\\\.|[^'\\\\\\n])*'|<[a-z.]+\\.h>`;

const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const escAttr = s => s.replace(/&/g,'&amp;').replace(/"/g,'&quot;');

function tokenize(code, re, classes) {
  let out = '', last = 0, m;
  while ((m = re.exec(code)) !== null) {
    out += esc(code.slice(last, m.index));
    const gi = m.slice(1).findIndex(g => g !== undefined);
    out += `<span class="${classes[gi]}">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(code.slice(last));
}

function highlight(code, lang) {
  if (lang === 'html') {
    const re = new RegExp('(\\x3C!--[\\s\\S]*?--\\x3E)|("(?:[^"\\\\]|\\\\.)*"|\'(?:[^\'\\\\]|\\\\.)*\')|(\\x3C\\/?[a-zA-Z][\\w-]*)|([a-zA-Z-]+(?=\\s*=))', 'g');
    return tokenize(code, re, ['tok-com', 'tok-str', 'tok-kw', 'tok-fn']);
  }
  if (lang === 'css') {
    const re = /(\/\*[\s\S]*?\*\/)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|([.#]?[a-zA-Z][\w-]*(?=\s*\{)|[a-zA-Z-]+(?=\s*:))|(#[0-9a-fA-F]{3,6}\b|\b\d+(?:\.\d+)?(?:px|em|rem|%)?\b)/g;
    return tokenize(code, re, ['tok-com', 'tok-str', 'tok-kw', 'tok-num']);
  }
  const spec = SYNTAX[lang] || SYNTAX.python;
  const re = new RegExp(
    `(${spec.comment})|(${STRING_PAT})|(\\b(?:${spec.keywords.join('|')})\\b)` +
    `|(\\b\\d+(?:\\.\\d+)?[fLu]?\\b)|([A-Za-z_]\\w*(?=\\s*\\())`, 'g');
  return tokenize(code, re, ['tok-com', 'tok-str', 'tok-kw', 'tok-num', 'tok-fn']);
}

/* =========================================================================
   3) 계정 (이 브라우저 안에서만 동작하는 간단한 로그인)
   ---------------------------------------------------------------------
   서버가 없는 정적 페이지라 진짜 보안 인증은 아니에요. 같은 기기를 여러 명이
   쓸 때 진도를 이름별로 나눠 기록하기 위한 가벼운 기능입니다.
   ========================================================================= */
const USERS_KEY = 'codelab.users';
const SESSION_KEY = 'codelab.session';

const loadUsers = () => { try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; } catch { return {}; } };
const saveUsers = u => { try { localStorage.setItem(USERS_KEY, JSON.stringify(u)); } catch {} };
const getCurrentUser = () => { try { return localStorage.getItem(SESSION_KEY) || null; } catch { return null; } };
const setCurrentUser = name => { try { name ? localStorage.setItem(SESSION_KEY, name) : localStorage.removeItem(SESSION_KEY); } catch {} };

async function hashPassword(pw) {
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(pw));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    let h = 0;
    for (let i = 0; i < pw.length; i++) h = (h * 31 + pw.charCodeAt(i)) | 0;
    return 'fallback-' + h.toString(16);
  }
}

/* 어드민(전체 진도 완료) 계정 — 아이디 "admin"이어도 이 특정 비밀번호와 정확히 일치해야만 부여돼요.
   비밀번호가 다르면 그냥 "admin"이라는 이름의 평범한(진도 없는) 계정이 될 뿐이에요. */
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD_HASH = '2b3b46a9983c2988371eb6206eb2c4906f7dec9a6e38169199afaf2c16cdf5b2';

async function signup(username, password) {
  username = username.trim();
  if (username.length < 2) return { ok: false, msg: '아이디는 2자 이상으로 입력해주세요.' };
  if (password.length < 4) return { ok: false, msg: '비밀번호는 4자 이상으로 입력해주세요.' };
  const users = loadUsers();
  if (users[username]) return { ok: false, msg: '이미 있는 아이디예요. 로그인을 눌러주세요.' };
  users[username] = { hash: await hashPassword(password), createdAt: Date.now() };
  saveUsers(users);
  return { ok: true, username };
}

async function login(username, password) {
  username = username.trim();
  const users = loadUsers();
  const rec = users[username];
  if (!rec || rec.hash !== await hashPassword(password)) {
    return { ok: false, msg: '아이디 또는 비밀번호가 올바르지 않아요.' };
  }
  return { ok: true, username };
}

/* =========================================================================
   4) 진도 저장 (로그인 계정별로 따로 기록)
   ========================================================================= */
const progressKey = () => `codelab.progress.v2.${getCurrentUser() || 'guest'}`;
const loadProgress = () => { try { return JSON.parse(localStorage.getItem(progressKey())) || {}; } catch { return {}; } };
const saveProgress = p => { try { localStorage.setItem(progressKey(), JSON.stringify(p)); } catch {} };
let progress = loadProgress();

/* "admin" 계정 전용: 모든 언어·단원·티어를 이미 클리어한 상태로 채워서, 잠금 없이
   일반 학습자와 완전히 똑같은 화면(같은 UI, 실제로 입력 가능한 문제 등)으로 모든 걸 둘러볼 수 있게 해줘요. */
function buildFullProgress() {
  const full = {};
  Object.entries(COURSES).forEach(([key, course]) => {
    course.units.filter(u => u.ready).forEach(u => {
      full[`${key}.${u.id}`] = {
        asked: STREAK_GOAL, correct: STREAK_GOAL, streak: STREAK_GOAL, bestStreak: STREAK_GOAL,
        done: true, bossCleared: true
      };
    });
    TIER_ORDER.forEach(tier => { full[`${key}.tier.${tier}`] = { cleared: true }; });
  });
  return full;
}

/* =========================================================================
   5) 렌더링
   ========================================================================= */
let view = 'home';   // 'home' | 'lesson' | 'review' | 'challenge'
let langKey = Object.keys(COURSES)[0];
let unitIdx = 0;
let currentQuestion = null;
let authMode = 'login';
let quizMode = 'practice';   // 'practice' | 'review' — #qlist/#check/#next 공용 문제 엔진의 출제 방식
let reviewLangs = new Set(Object.keys(COURSES));
let reviewActive = false;
let challenge = null;   // 보스전/티어 최종 도전 상태: { kind:'boss'|'gauntlet', lang, tier, queue:[unitId,...], idx, question, answered, ok }

const el = id => document.getElementById(id);

function renderNav() {
  const homeChip = `<button class="chip home-chip" type="button" aria-pressed="${view === 'home'}">홈</button>`;
  const reviewChip = `<button class="chip review-chip" type="button" aria-pressed="${view === 'review'}">복습</button>`;
  const minigameChip = `<button class="chip minigame-chip" type="button" aria-pressed="${view === 'minigames' || view === 'minigame'}">미니게임</button>`;
  const langChips = Object.entries(COURSES).map(([k, c]) =>
    `<button class="chip" type="button" data-lang="${k}" aria-pressed="${view === 'lesson' && k === langKey}">${c.name}</button>`
  ).join('');
  el('langbar').innerHTML = homeChip + reviewChip + minigameChip + langChips;
}

function renderAuthArea() {
  const user = getCurrentUser();
  el('authArea').innerHTML = user
    ? `<span class="user-greet">${esc(user)}님</span><button class="text-btn" id="logoutBtn" type="button">로그아웃</button>`
    : `<button class="btn ghost small" id="loginBtn" type="button">로그인</button><button class="btn small" id="signupBtn" type="button">회원가입</button>`;
}

function openAuthModal(mode) {
  authMode = mode;
  el('authForm').reset();
  el('authError').hidden = true;
  updateAuthModeUI();
  el('authOverlay').hidden = false;
  el('authUsername').focus();
}
function closeAuthModal() {
  el('authOverlay').hidden = true;
}
function updateAuthModeUI() {
  document.querySelectorAll('.auth-tab').forEach(t => t.setAttribute('aria-pressed', String(t.dataset.tab === authMode)));
  el('authTitle').textContent = authMode === 'login' ? '로그인' : '회원가입';
  el('authSubmit').textContent = authMode === 'login' ? '로그인' : '회원가입';
  el('authConfirmWrap').hidden = authMode !== 'signup';
  el('authPassword').setAttribute('autocomplete', authMode === 'login' ? 'current-password' : 'new-password');
}

function refreshAfterAuthChange() {
  progress = loadProgress();
  renderAuthArea();
  if (view === 'home') renderHome();
  else if (view === 'lesson') { renderUnits(); renderStats(); }
  else if (view === 'review' && reviewActive) renderStats();
}

function goHome() {
  view = 'home';
  quizMode = 'practice';
  el('sidebar').hidden = true;
  el('wrap').classList.add('home-view');
  renderNav();
  renderHome();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goLesson(lang, unitIndex = 0) {
  view = 'lesson';
  quizMode = 'practice';
  langKey = lang;
  unitIdx = unitIndex;
  el('sidebar').hidden = false;
  el('wrap').classList.remove('home-view');
  renderNav();
  renderUnits();
  renderUnit();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goReview() {
  view = 'review';
  quizMode = 'review';
  reviewActive = false;
  el('sidebar').hidden = true;
  el('wrap').classList.add('home-view');
  renderNav();
  renderReviewSetup();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderHome() {
  const user = getCurrentUser();
  const entries = Object.entries(COURSES);
  const totalReady = entries.reduce((sum, [, c]) => sum + c.units.filter(u => u.ready).length, 0);
  const totalDone = entries.reduce((sum, [key, c]) =>
    sum + c.units.filter(u => u.ready && progress[`${key}.${u.id}`]?.done).length, 0);

  el('main').innerHTML = `
    <section class="home-hero">
      <div class="eyebrow">코드공방</div>
      <h1>${user ? `${esc(user)}님, 오늘은 뭘 배워볼까요?` : '누구나 완전 처음부터 시작하는 코딩 연습 공간'}</h1>
      <p>쉬운 설명과 실제로 실행해 보는 예제, 그리고 원하는 만큼 계속 풀 수 있는 무한 연습 문제로 프로그래밍의 기초를 차근차근 익혀요.</p>
      ${totalDone > 0
        ? `<div class="home-stat">지금까지 ${totalDone} / ${totalReady}개 단원 완료</div>`
        : `<p class="muted" style="margin:0">아래에서 배우고 싶은 언어를 골라 바로 시작해보세요.${user ? '' : ' 회원가입하면 이 기기에서 나만의 진도를 따로 기록할 수 있어요.'}</p>`}
      <div class="tip-line" style="margin-top:16px"><b>팁</b> ${pick(TIPS)}</div>
    </section>
    <section class="lang-grid">
      ${entries.map(([key, c]) => {
        const readyUnits = c.units.filter(u => u.ready);
        const doneCount = readyUnits.filter(u => progress[`${key}.${u.id}`]?.done).length;
        return `<article class="lang-card" data-goto="${key}">
          <h3>${c.name}</h3>
          <p>${c.tagline}</p>
          <div class="lang-card-meta">${readyUnits.length}개 단원 준비됨 · ${doneCount}개 완료</div>
          <button class="btn" type="button" data-goto="${key}">시작하기</button>
        </article>`;
      }).join('')}
    </section>`;
}

function renderReviewSetup() {
  const entries = Object.entries(COURSES);
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">복습</div>
      <h1>배운 내용을 뒤섞어서 복습해요</h1>
      <p>복습하고 싶은 언어를 하나 이상 골라주세요. 고른 언어들의 문제가 무작위로 섞여서 나와요.</p>
    </div>
    <section class="block card">
      <div class="body">
        <div class="review-langs">
          ${entries.map(([k, c]) => `
            <label class="review-lang-opt">
              <input type="checkbox" data-review-lang="${k}" ${reviewLangs.has(k) ? 'checked' : ''}>
              <span>${c.name}</span>
            </label>`).join('')}
        </div>
        <button class="btn" type="button" id="startReview" style="margin-top:18px">복습 시작하기</button>
        <div class="tip-line" style="margin-top:16px"><b>팁</b> ${pick(TIPS)}</div>
      </div>
    </section>`;
}

function startReview() {
  if (reviewLangs.size === 0) { alert('복습할 언어를 하나 이상 선택해주세요.'); return; }
  reviewActive = true;
  renderReviewQuiz();
}

function renderReviewQuiz() {
  const names = [...reviewLangs].map(k => COURSES[k].name).join(', ');
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">복습 · ${esc(names)}</div>
      <h1>복습 문제</h1>
      <p>선택한 언어들의 문제가 뒤섞여 나와요. 원하는 만큼 계속 풀 수 있어요.</p>
    </div>
    <section class="block card" id="quiz">
      <div class="body" style="padding-bottom:6px">
        <div class="quiz-stats" id="quiz-stats"></div>
      </div>
      <div id="qlist"></div>
      <div class="hint-box" id="hintBox" hidden></div>
      <div class="quiz-foot">
        <button class="btn" type="button" id="check">확인하기</button>
        <button class="btn ghost" type="button" id="hintBtn">힌트 보기</button>
        <button class="btn ghost" type="button" id="next">다음 문제</button>
        <button class="text-btn" type="button" id="reviewChangeLangs" style="margin-left:auto">언어 다시 선택</button>
      </div>
    </section>`;
  newQuestion();
}

function renderUnits() {
  const allUnits = COURSES[langKey].units;
  const readyUnits = allUnits.filter(u => u.ready);
  const tierOf = {};
  readyUnits.forEach((u, i) => { tierOf[u.id] = tierOfIndex(i, readyUnits.length); });

  let lastTier = null;
  el('units').innerHTML = allUnits.map((u, i) => {
    let head = '';
    if (u.ready && tierOf[u.id] !== lastTier) {
      head = `<li class="tier-head">${TIER_LABEL[tierOf[u.id]]}</li>`;
      lastTier = tierOf[u.id];
    }
    const done = progress[`${langKey}.${u.id}`]?.done;
    return `${head}<li>
      <button class="unit-btn ${done ? 'done' : ''}" type="button" data-unit="${i}"
              aria-current="${i === unitIdx}" ${u.ready ? '' : 'disabled'}>
        <span class="dot"></span>
        <span>${i + 1}. ${u.title}</span>
        ${u.ready ? '' : '<span class="soon">준비중</span>'}
      </button></li>`;
  }).join('');

  el('tierChallenge').innerHTML = TIER_ORDER.map(tier => {
    const unitsInTier = readyUnits.filter(u => tierOf[u.id] === tier);
    if (!unitsInTier.length) return '';
    const allDone = unitsInTier.every(u => progress[`${langKey}.${u.id}`]?.done);
    if (!allDone) return '';
    const cleared = progress[`${langKey}.tier.${tier}`]?.cleared;
    const gauntletBtn = `<button class="btn ${cleared ? 'ghost' : ''} small" type="button" data-gauntlet="${tier}">
      ${TIER_LABEL[tier]} 최종 도전${cleared ? ' (클리어! 다시 도전)' : ''}
    </button>`;
    const gameHint = cleared
      ? `<button class="btn small minigame-btn" type="button" data-goto-minigames="1">미니게임에서 플레이하기</button>`
      : '';
    return gauntletBtn + gameHint;
  }).join('');
}

function renderProgress() {
  const units = COURSES[langKey].units;
  const ready = units.filter(u => u.ready);
  const doneCount = ready.filter(u => progress[`${langKey}.${u.id}`]?.done).length;
  const pct = ready.length ? Math.round(doneCount / ready.length * 100) : 0;
  el('pct').textContent = pct + '%';
  el('barfill').style.width = pct + '%';
  const rec = progress[`${langKey}.${units[unitIdx].id}`];
  el('progress-note').innerHTML = rec?.done
    ? `이 단원 완료! 최고 연속 정답 <b>${rec.bestStreak}개</b> · 전체 ${doneCount}/${ready.length}개 단원 완료`
    : `전체 ${doneCount}/${ready.length}개 단원 완료 · 연속 ${STREAK_GOAL}개를 맞히면 이 단원이 완료돼요.`;
  el('sidebarTip').innerHTML = `<b>팁</b> ${pick(TIPS)}`;
}

function codeFigure(b, lang) {
  const c = b;
  const useLang = c.lang || lang;
  const resultBlock = c.preview
    ? `<div class="preview"><span class="preview-label">미리보기</span><iframe sandbox="" title="미리보기" srcdoc="${escAttr(c.preview)}"></iframe></div>`
    : (c.out ? `<div class="out"><b>실행 결과</b>${esc(c.out)}</div>` : '');
  return `<figure class="code">
    <figcaption>${esc(c.label)}<button class="copy" type="button">복사</button></figcaption>
    <pre><code>${highlight(c.src, useLang)}</code></pre>
    ${resultBlock}
  </figure>`;
}

function quizItem(q) {
  const source = q._source ? `<div class="q-source">${esc(q._source.langName)} · ${esc(q._source.unitTitle)}</div>` : '';
  let body;
  if (q.type === 'choice') {
    body = `<div class="opts" role="radiogroup" aria-label="문제 보기">${q.opts.map((o, j) =>
      `<label class="opt"><input type="radio" name="q0" value="${j}"><span>${o}</span></label>`).join('')}</div>`;
  } else if (q.type === 'code') {
    body = `<div class="code-editor">
      <textarea id="codeInput" rows="${q.rows || 5}" spellcheck="false" autocomplete="off" autocapitalize="off"
        placeholder="${esc(q.placeholder || '여기에 코드를 작성하세요')}">${esc(q.starter || '')}</textarea>
    </div>
    ${q.preview ? `<div class="code-preview" id="codePreviewBox" hidden><span class="code-preview-label">내가 쓴 코드 미리보기</span><iframe sandbox="" id="codePreviewFrame" title="미리보기"></iframe></div>` : ''}`;
  } else {
    body = `<div class="blank-row">
         ${q.prefix ? `<code style="align-self:center">${esc(q.prefix)}</code>` : ''}
         <input type="text" name="q0" placeholder="${esc(q.placeholder || '답 입력')}" autocomplete="off" spellcheck="false">
         ${q.suffix ? `<code style="align-self:center">${esc(q.suffix)}</code>` : ''}
       </div>`;
  }
  return `<div class="q" data-q="0">
    ${source}
    <div class="q-head"><span class="q-num">Q</span><span class="q-text">${q.q}</span></div>
    ${body}<div class="verdict" hidden></div>
  </div>`;
}

function renderUnit() {
  const course = COURSES[langKey];
  const u = course.units[unitIdx];
  const key = `${langKey}.${u.id}`;
  const bossHTML = (u.boss && progress[key]?.done) ? `
    <section class="block card boss-cta">
      <div class="body">
        <div>
          <h3>이 단원 최종 도전</h3>
          <p class="muted">${esc(u.title)}에서 배운 여러 개념을 한 번에 묻는 조금 어려운 문제예요.</p>
        </div>
        <button class="btn" type="button" id="startBoss">${progress[key]?.bossCleared ? '다시 도전하기' : '도전하기'}</button>
        ${progress[key]?.bossCleared ? '<span class="stat done">클리어!</span>' : ''}
      </div>
    </section>` : '';
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">${course.name} · ${unitIdx + 1}단원</div>
      <h1>${u.title}</h1>
      <p>${u.summary}</p>
      <ul class="goals">${u.goals.map(g => `<li>${g}</li>`).join('')}</ul>
    </div>
    ${u.blocks.map(b => `
      <section class="block card">
        <h2>${b.h}</h2>
        <div class="body">
          ${b.html}
          ${b.code ? codeFigure(b.code, langKey) : ''}
          ${b.after || ''}
        </div>
      </section>`).join('')}
    <section class="block card" id="quiz">
      <h2>연습 문제 <span class="muted" style="font-weight:400">· 계속 새 문제가 나와요</span></h2>
      <div class="body" style="padding-bottom:6px">
        <p class="muted" style="margin:0 0 12px">문제를 풀고 <b>확인하기</b>를 누르면 정답과 설명이 나와요. 막히면 <b>힌트 보기</b>를 눌러보세요. 다 봤으면 <b>다음 문제</b>를 눌러서 계속 연습하세요. 가끔 직접 코드를 작성하는 문제도 나와요 (제출은 Ctrl+Enter로도 가능해요). 문제는 무한히 만들어져요.</p>
        <div class="quiz-stats" id="quiz-stats"></div>
      </div>
      <div id="qlist"></div>
      <div class="hint-box" id="hintBox" hidden></div>
      <div class="quiz-foot">
        <button class="btn" type="button" id="check">확인하기</button>
        <button class="btn ghost" type="button" id="hintBtn">힌트 보기</button>
        <button class="btn ghost" type="button" id="next">다음 문제</button>
      </div>
    </section>
    ${bossHTML}`;
  newQuestion();
}

/* =========================================================================
   6) 무한 연습 문제: 생성 · 채점 · 기록 (연습 모드 / 복습 모드 공용)
   ========================================================================= */
const norm = s => s.trim().replace(/\s+/g, '').toLowerCase();

function reviewPool() {
  const pool = [];
  for (const lang of reviewLangs) {
    for (const u of COURSES[lang].units) {
      if (u.ready) pool.push({ lang, u });
    }
  }
  return pool;
}

function newQuestion() {
  if (quizMode === 'review') {
    const { lang, u } = pick(reviewPool());
    currentQuestion = pick(u.quizGenerators)();
    currentQuestion._source = { langName: COURSES[lang].name, unitTitle: u.title };
  } else {
    const u = COURSES[langKey].units[unitIdx];
    currentQuestion = pick(u.quizGenerators)();
  }
  el('qlist').innerHTML = quizItem(currentQuestion);
  el('check').disabled = false;
  el('check').textContent = '확인하기';
  el('hintBox').hidden = true;
  renderStats();
}

/* 사용자가 작성한 자바스크립트 코드를 실제로 실행해서 console.log 출력을 모아 돌려줌 */
function runUserJS(code) {
  const logs = [];
  const fakeConsole = {
    log: (...args) => logs.push(args.map(a => {
      if (typeof a === 'object' && a !== null) { try { return JSON.stringify(a); } catch { return String(a); } }
      return String(a);
    }).join(' '))
  };
  try {
    const fn = new Function('console', code);
    fn(fakeConsole);
    return { ok: true, output: logs.join('\n') };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

function gradeQuestion(q, box) {
  const verdict = box.querySelector('.verdict');
  let ok = null;

  if (q.type === 'choice') {
    const chosen = box.querySelector('input[name="q0"]:checked');
    if (!chosen) {
      verdict.hidden = false;
      verdict.className = 'verdict no';
      verdict.textContent = '먼저 보기를 하나 골라주세요.';
      return null;
    }
    ok = Number(chosen.value) === q.answer;
    box.querySelectorAll('.opt').forEach((lab, j) => {
      lab.classList.remove('correct', 'wrong');
      if (j === q.answer) lab.classList.add('correct');
      else if (Number(chosen.value) === j) lab.classList.add('wrong');
    });
    verdict.hidden = false;
    verdict.className = 'verdict ' + (ok ? 'ok' : 'no');
    verdict.innerHTML = q.why;
    box.querySelectorAll('input').forEach(i => { i.disabled = true; });
    return ok;
  }

  if (q.type === 'code') {
    const input = box.querySelector('#codeInput');
    const code = input.value;
    let resultHTML = '';

    if (q.mode === 'run-js') {
      const result = runUserJS(code);
      if (!result.ok) {
        ok = false;
        resultHTML = `<div class="code-output code-error"><b>오류가 났어요</b>${esc(result.error)}</div>`;
      } else {
        ok = norm(result.output) === norm(q.expectedOutput);
        resultHTML = `<div class="code-output"><b>실행 결과</b>${esc(result.output || '(아무것도 출력되지 않았어요)')}</div>`;
      }
      if (!ok) resultHTML += `<div class="code-output"><b>기대한 실행 결과</b>${esc(q.expectedOutput)}</div>`;
    } else {
      ok = q.accept.some(a => norm(a) === norm(code));
      if (q.preview) {
        box.querySelector('#codePreviewBox').hidden = false;
        box.querySelector('#codePreviewFrame').srcdoc = code || '<p></p>';
      }
    }

    verdict.hidden = false;
    verdict.className = 'verdict ' + (ok ? 'ok' : 'no');
    verdict.innerHTML = resultHTML + `<div style="margin-top:8px">${q.why}</div>` +
      (!ok && q.mode !== 'run-js' ? `<div class="muted" style="margin-top:6px">예시 정답: <code>${esc(q.accept[0])}</code></div>` : '');
    input.disabled = true;
    return ok;
  }

  const input = box.querySelector('input[name="q0"]');
  ok = q.accept.some(a => norm(a) === norm(input.value));
  input.style.borderColor = ok ? 'var(--ok)' : 'var(--bad)';

  verdict.hidden = false;
  verdict.className = 'verdict ' + (ok ? 'ok' : 'no');
  verdict.innerHTML = q.why + (!ok ? ` (정답: <code>${esc(q.accept[0])}</code>)` : '');
  box.querySelectorAll('input').forEach(i => { i.disabled = true; });
  return ok;
}

function checkAnswer() {
  if (!currentQuestion) return;
  const box = document.querySelector('.q[data-q="0"]');
  const ok = gradeQuestion(currentQuestion, box);
  if (ok === null) return;

  el('check').disabled = true;
  if (quizMode === 'review') updateReviewStats(ok);
  else updateStreak(ok);
}

function showHint() {
  const box = el('hintBox');
  box.hidden = false;
  box.innerHTML = `<b>힌트</b> ${currentQuestion?.hint || '이 문제는 따로 힌트가 없어요. 강의 내용을 다시 떠올려보세요.'}`;
}

function updateStreak(ok) {
  const key = `${langKey}.${COURSES[langKey].units[unitIdx].id}`;
  const rec = progress[key] || { asked: 0, correct: 0, streak: 0, bestStreak: 0, done: false };
  rec.asked++;
  if (ok) { rec.correct++; rec.streak++; } else { rec.streak = 0; }
  rec.bestStreak = Math.max(rec.bestStreak, rec.streak);
  if (!rec.done && rec.bestStreak >= STREAK_GOAL) rec.done = true;
  progress[key] = rec;
  saveProgress(progress);
  renderUnits();
  renderStats();
  if (rec.done && rec.bestStreak === STREAK_GOAL) renderUnit();
}

function updateReviewStats(ok) {
  const rec = progress['review.all'] || { asked: 0, correct: 0, streak: 0, bestStreak: 0 };
  rec.asked++;
  if (ok) { rec.correct++; rec.streak++; } else { rec.streak = 0; }
  rec.bestStreak = Math.max(rec.bestStreak, rec.streak);
  progress['review.all'] = rec;
  saveProgress(progress);
  renderStats();
}

function renderStats() {
  if (quizMode === 'review') {
    const rec = progress['review.all'] || { asked: 0, correct: 0, streak: 0, bestStreak: 0 };
    el('quiz-stats').innerHTML = `
      <span class="stat"><b>${rec.streak}</b>연속 정답</span>
      <span class="stat"><b>${rec.correct}</b>/${rec.asked} 맞음</span>
      <span class="stat"><b>${rec.bestStreak}</b>최고 기록</span>
    `;
    return;
  }
  const key = `${langKey}.${COURSES[langKey].units[unitIdx].id}`;
  const rec = progress[key] || { asked: 0, correct: 0, streak: 0, bestStreak: 0, done: false };
  el('quiz-stats').innerHTML = `
    <span class="stat"><b>${rec.streak}</b>연속 정답</span>
    <span class="stat"><b>${rec.correct}</b>/${rec.asked} 맞음</span>
    <span class="stat"><b>${rec.bestStreak}</b>최고 기록</span>
    ${rec.done ? '<span class="stat done">단원 완료</span>' : ''}
  `;
  renderProgress();
}

/* =========================================================================
   6-1) 최종 도전 (단원 보스전 / 티어 최종 도전 — 티어 도전은 그 티어의
   모든 단원 내용을 하나로 합친, 완전히 새로운 단 하나의 문제예요)
   ========================================================================= */
function startBossChallenge(lang, unitId) {
  challenge = { kind: 'boss', lang, unitId, question: null, answered: false, ok: null };
  view = 'challenge';
  renderNav();
  newChallengeQuestion();
}

function startGauntlet(lang, tier) {
  challenge = { kind: 'gauntlet', lang, tier, question: null, answered: false, ok: null };
  view = 'challenge';
  renderNav();
  newChallengeQuestion();
}

function newChallengeQuestion() {
  if (challenge.kind === 'boss') {
    const u = COURSES[challenge.lang].units.find(u => u.id === challenge.unitId);
    challenge.question = u.boss();
  } else {
    challenge.question = COURSES[challenge.lang].tierBoss[challenge.tier]();
  }
  challenge.answered = false;
  challenge.ok = null;
  renderChallenge();
}

function challengeFoot() {
  if (!challenge.answered) {
    return `
      <button class="btn" type="button" id="challengeCheck">확인하기</button>
      <button class="btn ghost" type="button" id="challengeHint">힌트 보기</button>
      <button class="text-btn" type="button" id="challengeExit" style="margin-left:auto">그만두고 돌아가기</button>`;
  }
  if (challenge.ok) {
    return `<button class="btn" type="button" id="challengeFinish">완료하고 돌아가기</button>`;
  }
  return `
    <button class="btn" type="button" id="challengeRetry">다른 문제로 다시 도전</button>
    <button class="text-btn" type="button" id="challengeExit" style="margin-left:auto">그만두고 돌아가기</button>`;
}

function renderChallenge() {
  el('sidebar').hidden = true;
  el('wrap').classList.add('home-view');
  const course = COURSES[challenge.lang];
  const isGauntlet = challenge.kind === 'gauntlet';
  let title, subtitle;
  if (isGauntlet) {
    title = `${course.name} · ${TIER_LABEL[challenge.tier]} 최종 도전`;
    subtitle = `${TIER_LABEL[challenge.tier]}에서 배운 모든 단원의 내용을 한데 모은, 완전히 새로운 문제예요. 정답을 맞히면 이 티어를 클리어해요.`;
  } else {
    const u = course.units.find(u => u.id === challenge.unitId);
    title = `${course.name} · ${u.title} 최종 도전`;
    subtitle = `${u.title}에서 배운 여러 개념을 한 번에 묻는 조금 어려운 문제예요. 정답을 맞히면 클리어로 기록돼요.`;
  }

  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">최종 도전</div>
      <h1>${title}</h1>
      <p>${subtitle}</p>
    </div>
    <section class="block card">
      <div class="body" style="padding-top:20px;padding-bottom:6px">
        <div id="qlist">${quizItem(challenge.question)}</div>
        <div class="hint-box" id="hintBox" hidden></div>
      </div>
      <div class="quiz-foot">${challengeFoot()}</div>
    </section>`;

  if (challenge.answered) {
    // 채점 결과(정답/오답 표시, 선택지 색)를 다시 보여주기 위해 즉시 재현
    const box = document.querySelector('.q[data-q="0"]');
    gradeQuestion(challenge.question, box);
  }
}

function checkChallengeAnswer() {
  const box = document.querySelector('.q[data-q="0"]');
  const ok = gradeQuestion(challenge.question, box);
  if (ok === null) return;

  challenge.answered = true;
  challenge.ok = ok;

  if (ok) {
    if (challenge.kind === 'boss') {
      const key = `${challenge.lang}.${challenge.unitId}`;
      progress[key] = { ...(progress[key] || {}), bossCleared: true };
    } else {
      progress[`${challenge.lang}.tier.${challenge.tier}`] = { cleared: true };
    }
    saveProgress(progress);
  }
  el('main').querySelector('.quiz-foot').innerHTML = challengeFoot();
}

function showChallengeHint() {
  const box = el('hintBox');
  box.hidden = false;
  box.innerHTML = `<b>힌트</b> ${challenge.question?.hint || '이 문제는 따로 힌트가 없어요. 강의 내용을 다시 떠올려보세요.'}`;
}

function retryChallenge() { newChallengeQuestion(); }

function backFromChallenge() {
  const lang = challenge.lang;
  const backIdx = challenge.kind === 'boss'
    ? COURSES[lang].units.findIndex(u => u.id === challenge.unitId)
    : 0;
  challenge = null;
  goLesson(lang, backIdx);
}
function finishChallenge() { backFromChallenge(); }
function exitChallenge() { backFromChallenge(); }

/* =========================================================================
   7) 이벤트
   ========================================================================= */
document.addEventListener('click', async e => {
  if (e.target.closest('#brandHome')) { goHome(); return; }

  const chip = e.target.closest('.chip');
  if (chip) {
    if (chip.classList.contains('home-chip')) goHome();
    else if (chip.classList.contains('review-chip')) goReview();
    else if (chip.classList.contains('minigame-chip')) goMinigameHub();
    else goLesson(chip.dataset.lang, 0);
    return;
  }

  const gotoEl = e.target.closest('[data-goto]');
  if (gotoEl) { goLesson(gotoEl.dataset.goto, 0); return; }

  const unitBtn = e.target.closest('.unit-btn');
  if (unitBtn && !unitBtn.disabled) {
    unitIdx = Number(unitBtn.dataset.unit);
    renderUnits(); renderUnit();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  if (e.target.id === 'check') { checkAnswer(); return; }
  if (e.target.id === 'next') { newQuestion(); return; }
  if (e.target.id === 'hintBtn') { showHint(); return; }

  if (e.target.id === 'startBoss') { startBossChallenge(langKey, COURSES[langKey].units[unitIdx].id); return; }
  const gauntletBtn = e.target.closest('[data-gauntlet]');
  if (gauntletBtn) { startGauntlet(langKey, gauntletBtn.dataset.gauntlet); return; }
  if (e.target.closest('[data-goto-minigames]')) { goMinigameHub(); return; }

  if (e.target.id === 'challengeCheck') { checkChallengeAnswer(); return; }
  if (e.target.id === 'challengeHint') { showChallengeHint(); return; }
  if (e.target.id === 'challengeRetry') { retryChallenge(); return; }
  if (e.target.id === 'challengeFinish') { finishChallenge(); return; }
  if (e.target.id === 'challengeExit') { exitChallenge(); return; }

  if (e.target.id === 'startReview') { startReview(); return; }
  if (e.target.id === 'reviewChangeLangs') { reviewActive = false; renderReviewSetup(); return; }

  if (e.target.classList.contains('copy')) {
    const code = e.target.closest('figure').querySelector('code').textContent;
    try { await navigator.clipboard.writeText(code); e.target.textContent = '복사됨'; }
    catch { e.target.textContent = '복사 실패'; }
    setTimeout(() => { e.target.textContent = '복사'; }, 1400);
    return;
  }
  if (e.target.id === 'reset') {
    const who = getCurrentUser() ? `${getCurrentUser()}님의` : '지금(비로그인) 이 브라우저의';
    if (confirm(`${who} 학습 진도를 모두 지울까요?`)) {
      progress = {}; saveProgress(progress); renderUnits(); renderStats();
    }
    return;
  }
  if (e.target.id === 'theme') {
    const cur = document.documentElement.dataset.theme
      || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('codelab.theme', next); } catch {}
    return;
  }

  if (e.target.id === 'loginBtn') { openAuthModal('login'); return; }
  if (e.target.id === 'signupBtn') { openAuthModal('signup'); return; }
  if (e.target.id === 'logoutBtn') { setCurrentUser(null); refreshAfterAuthChange(); return; }
  if (e.target.id === 'authClose' || e.target.id === 'authOverlay') { closeAuthModal(); return; }
  if (e.target.classList.contains('auth-tab')) {
    authMode = e.target.dataset.tab;
    el('authError').hidden = true;
    updateAuthModeUI();
    return;
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.matches('#qlist input[type="text"]')) {
    e.preventDefault();
    const btn = el('check') || el('challengeCheck');
    if (btn && !btn.disabled) btn.click();
  }
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && e.target.id === 'codeInput') {
    e.preventDefault();
    const btn = el('check') || el('challengeCheck');
    if (btn && !btn.disabled) btn.click();
  }
  if (e.key === 'Tab' && e.target.id === 'codeInput' && !e.target.disabled) {
    e.preventDefault();
    const ta = e.target;
    const start = ta.selectionStart, end = ta.selectionEnd;
    if (e.shiftKey) {
      const lineStart = ta.value.lastIndexOf('\n', start - 1) + 1;
      if (ta.value.slice(lineStart, lineStart + 4) === '    ') {
        ta.value = ta.value.slice(0, lineStart) + ta.value.slice(lineStart + 4);
        ta.setSelectionRange(Math.max(lineStart, start - 4), Math.max(lineStart, end - 4));
      }
    } else {
      ta.value = ta.value.slice(0, start) + '    ' + ta.value.slice(end);
      ta.setSelectionRange(start + 4, start + 4);
    }
  }
  if (e.key === 'Escape' && !el('authOverlay').hidden) { closeAuthModal(); }
  if ((e.key === 'Enter' || e.key === ' ') && e.target.id === 'brandHome') {
    e.preventDefault();
    goHome();
  }
});

document.addEventListener('change', e => {
  if (e.target.matches('[data-review-lang]')) {
    const k = e.target.dataset.reviewLang;
    if (e.target.checked) reviewLangs.add(k);
    else reviewLangs.delete(k);
  }
});

document.addEventListener('submit', async e => {
  if (e.target.id !== 'authForm') return;
  e.preventDefault();
  const username = el('authUsername').value;
  const password = el('authPassword').value;
  const errEl = el('authError');
  errEl.hidden = true;

  if (authMode === 'signup' && password !== el('authConfirm').value) {
    errEl.hidden = false;
    errEl.textContent = '비밀번호가 서로 달라요.';
    return;
  }

  el('authSubmit').disabled = true;
  // admin 아이디 + 정해진 비밀번호 조합이면, 로그인/회원가입 탭 어느 쪽에서 시도했든,
  // 이 계정이 이전에 없었거나 다른 비밀번호로 잘못 만들어졌었든 상관없이 항상 통과시켜요.
  const isAdminCombo = username.trim().toLowerCase() === ADMIN_USERNAME && (await hashPassword(password)) === ADMIN_PASSWORD_HASH;
  let result;
  if (isAdminCombo) {
    const users = loadUsers();
    users[ADMIN_USERNAME] = { hash: ADMIN_PASSWORD_HASH, createdAt: users[ADMIN_USERNAME]?.createdAt || Date.now() };
    saveUsers(users);
    result = { ok: true, username: ADMIN_USERNAME };
  } else {
    result = authMode === 'signup' ? await signup(username, password) : await login(username, password);
  }
  el('authSubmit').disabled = false;

  if (!result.ok) {
    errEl.hidden = false;
    errEl.textContent = result.msg;
    return;
  }
  const wasGuestProgress = authMode === 'signup' && !getCurrentUser() ? progress : null;
  setCurrentUser(result.username);
  if (isAdminCombo) {
    saveProgress(buildFullProgress());
  } else if (wasGuestProgress) {
    saveProgress(wasGuestProgress);
  }
  closeAuthModal();
  refreshAfterAuthChange();
});

/* 초기화 */
try {
  const saved = localStorage.getItem('codelab.theme');
  if (saved) document.documentElement.dataset.theme = saved;
} catch {}
renderAuthArea();
goHome();
