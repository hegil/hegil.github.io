/* =========================================================================
   2) 문법 강조 (외부 라이브러리 없이 최소 구현)
   ========================================================================= */
const SYNTAX = {
  python:     { comment:'#[^\\n]*', keywords:['def','return','if','elif','else','for','while','in','not','and','or','import','from','as','class','True','False','None','print','input','int','float','str','bool','type','len','range'] },
  javascript: { comment:'//[^\\n]*|/\\*[\\s\\S]*?\\*/', keywords:['let','const','var','function','return','if','else','for','while','of','in','class','new','typeof','true','false','null','undefined','console'] },
  typescript: { comment:'//[^\\n]*|/\\*[\\s\\S]*?\\*/', keywords:['let','const','var','function','return','if','else','for','while','of','in','class','new','typeof','true','false','null','undefined','console','interface','type','extends','implements','public','private','readonly','enum','as','keyof','number','string','boolean','void','any'] },
  java:       { comment:'//[^\\n]*|/\\*[\\s\\S]*?\\*/', keywords:['public','private','protected','static','void','class','new','return','if','else','for','while','int','long','double','float','char','boolean','String','true','false','null','System'] },
  kotlin:     { comment:'//[^\\n]*|/\\*[\\s\\S]*?\\*/', keywords:['val','var','fun','if','else','when','for','while','in','return','class','object','interface','data','companion','override','private','public','is','as','null','true','false','Int','String','Boolean','Double'] },
  csharp:     { comment:'//[^\\n]*|/\\*[\\s\\S]*?\\*/', keywords:['public','private','protected','static','void','class','new','return','if','else','for','foreach','while','int','float','double','bool','string','true','false','null','using','namespace','override','var'] },
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
   4.5) 연속 학습일(스트리크)
   ========================================================================= */
const localDateStr = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/* 문제를 하나 채점할 때마다 호출: 오늘 처음 하는 활동이면 스트리크를 갱신해요.
   어제도 활동했으면 +1, 하루라도 건너뛰었으면 1로 리셋, 오늘 이미 셌으면 그대로 둬요. */
function touchDailyStreak() {
  const today = localDateStr(new Date());
  const meta = progress._meta || { streakCount: 0, lastActiveDate: null };
  if (meta.lastActiveDate === today) return meta.streakCount;
  const y = new Date();
  y.setDate(y.getDate() - 1);
  meta.streakCount = meta.lastActiveDate === localDateStr(y) ? meta.streakCount + 1 : 1;
  meta.lastActiveDate = today;
  progress._meta = meta;
  saveProgress(progress);
  return meta.streakCount;
}

/* 아무것도 기록하지 않고, 지금 기준 유효한 스트리크 값만 조회(홈 화면 표시용) */
function currentStreakForDisplay() {
  const meta = progress._meta;
  if (!meta || !meta.lastActiveDate) return 0;
  const today = localDateStr(new Date());
  if (meta.lastActiveDate === today) return meta.streakCount;
  const y = new Date();
  y.setDate(y.getDate() - 1);
  if (meta.lastActiveDate === localDateStr(y)) return meta.streakCount;
  return 0;
}

/* =========================================================================
   4.6) 진도 백업 / 복원 (localStorage에만 있는 진도를 파일로 내보내고 불러오기)
   ========================================================================= */
function exportProgress() {
  const payload = { exportedAt: new Date().toISOString(), user: getCurrentUser() || 'guest', progress };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `codelab-progress-${getCurrentUser() || 'guest'}-${localDateStr(new Date())}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function importProgressFromFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    let parsed;
    try { parsed = JSON.parse(reader.result); } catch { alert('올바른 백업 파일이 아니에요.'); return; }
    if (!parsed || typeof parsed.progress !== 'object' || parsed.progress === null) {
      alert('올바른 백업 파일이 아니에요.');
      return;
    }
    if (!confirm('지금 이 계정의 진도를 백업 파일 내용으로 덮어쓸까요? 되돌릴 수 없어요.')) return;
    progress = parsed.progress;
    saveProgress(progress);
    if (view === 'home') renderHome();
    else if (view === 'lesson') { renderUnits(); renderStats(); }
    else if (view === 'dashboard') renderStatsDashboard();
    alert('진도를 불러왔어요!');
  };
  reader.onerror = () => alert('파일을 읽는 중 문제가 생겼어요.');
  reader.readAsText(file);
}

/* =========================================================================
   4.7) 업적/뱃지 — progress에서 파생되는 값이라 별도 저장 없이 그때그때 계산해요
   ========================================================================= */
const ACHIEVEMENTS = [
  { id: 'first-done', icon: '🌱', name: '첫 걸음', desc: '단원 1개 완료하기', check: s => s.totalDone >= 1 },
  { id: 'ten-done', icon: '🚀', name: '열 걸음', desc: '단원 10개 완료하기', check: s => s.totalDone >= 10 },
  { id: 'thirty-done', icon: '🏔️', name: '꾸준함의 힘', desc: '단원 30개 완료하기', check: s => s.totalDone >= 30 },
  { id: 'lang-master', icon: '🏆', name: '한 언어 마스터', desc: '한 언어의 준비된 단원을 모두 완료하기', check: s => s.perLang.some(l => l.readyCount > 0 && l.doneCount === l.readyCount) },
  { id: 'all-master', icon: '👑', name: '전 언어 마스터', desc: '모든 언어의 모든 단원 완료하기', check: s => s.perLang.every(l => l.readyCount > 0 && l.doneCount === l.readyCount) },
  { id: 'streak-3', icon: '🔥', name: '3일 연속 학습', desc: '3일 연속으로 문제 풀기', check: s => s.streak >= 3 },
  { id: 'streak-7', icon: '🔥', name: '7일 연속 학습', desc: '7일 연속으로 문제 풀기', check: s => s.streak >= 7 },
  { id: 'boss-1', icon: '⚔️', name: '첫 보스전 승리', desc: '보스전 1개 클리어하기', check: s => s.bossCleared >= 1 },
  { id: 'boss-5', icon: '🗡️', name: '보스 헌터', desc: '보스전 5개 클리어하기', check: s => s.bossCleared >= 5 },
  { id: 'tier-clear', icon: '💎', name: '티어 클리어', desc: '아무 언어에서나 티어 최종 도전 클리어하기', check: s => s.tierCleared >= 1 },
  { id: 'correct-100', icon: '💯', name: '정답 100개', desc: '누적으로 정답 100개 맞히기', check: s => s.totalCorrect >= 100 }
];

function achievementStats() {
  const entries = Object.entries(COURSES);
  let totalDone = 0, totalCorrect = 0, bossCleared = 0, tierCleared = 0;
  const perLang = entries.map(([key, c]) => {
    const ready = c.units.filter(u => u.ready);
    let doneCount = 0;
    ready.forEach(u => {
      const rec = progress[`${key}.${u.id}`];
      if (!rec) return;
      if (rec.done) doneCount++;
      totalCorrect += rec.correct || 0;
      if (rec.bossCleared) bossCleared++;
    });
    TIER_ORDER.forEach(tier => { if (progress[`${key}.tier.${tier}`]?.cleared) tierCleared++; });
    totalDone += doneCount;
    return { key, readyCount: ready.length, doneCount };
  });
  return { totalDone, totalCorrect, bossCleared, tierCleared, perLang, streak: currentStreakForDisplay() };
}

function unlockedAchievements() {
  const stats = achievementStats();
  return ACHIEVEMENTS.map(a => ({ ...a, unlocked: a.check(stats) }));
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
let navDropdownOpen = null;   // null | 'lang' | 'tools' — 상단 네비게이션 드롭다운 열림 상태

const el = id => document.getElementById(id);

function renderNav() {
  const homeChip = `<button class="chip home-chip" type="button" aria-pressed="${view === 'home'}">홈</button>`;
  const reviewChip = `<button class="chip review-chip" type="button" aria-pressed="${view === 'review'}">복습</button>`;
  const wrongNoteChip = `<button class="chip wrongnote-chip" type="button" aria-pressed="${view === 'wrongnote'}">오답노트</button>`;
  const playgroundChip = `<button class="chip playground-chip" type="button" aria-pressed="${view === 'playground'}">실습장</button>`;
  const statsChip = `<button class="chip stats-chip" type="button" aria-pressed="${view === 'dashboard'}">통계</button>`;
  const minigameChip = `<button class="chip minigame-chip" type="button" aria-pressed="${view === 'minigames' || view === 'minigame'}">미니게임</button>`;
  const langChips = Object.entries(COURSES).map(([k, c]) =>
    `<button class="chip" type="button" data-lang="${k}" aria-pressed="${view === 'lesson' && k === langKey}">${c.name}</button>`
  ).join('');

  const langLabel = view === 'lesson' ? COURSES[langKey].name : '언어';
  const toolLabel = { review: '복습', wrongnote: '오답노트', playground: '실습장', dashboard: '통계', minigames: '미니게임', minigame: '미니게임' }[view] || '도구';
  const langOpen = navDropdownOpen === 'lang';
  const toolsOpen = navDropdownOpen === 'tools';

  el('langbar').innerHTML = `
    ${homeChip}
    <div class="nav-dropdown">
      <button class="chip nav-dropdown-btn" type="button" data-nav-dd="lang" aria-expanded="${langOpen}" aria-pressed="${view === 'lesson'}">${esc(langLabel)} ▾</button>
      <div class="nav-dropdown-menu" ${langOpen ? '' : 'hidden'}>${langChips}</div>
    </div>
    <div class="nav-dropdown">
      <button class="chip nav-dropdown-btn" type="button" data-nav-dd="tools" aria-expanded="${toolsOpen}" aria-pressed="${toolLabel !== '도구'}">${esc(toolLabel)} ▾</button>
      <div class="nav-dropdown-menu" ${toolsOpen ? '' : 'hidden'}>${reviewChip}${wrongNoteChip}${playgroundChip}${statsChip}${minigameChip}</div>
    </div>
  `;
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
  else if (view === 'dashboard') renderStatsDashboard();
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
  const streak = currentStreakForDisplay();
  const badgeCount = unlockedAchievements().filter(b => b.unlocked).length;

  el('main').innerHTML = `
    <section class="home-hero">
      <div class="eyebrow">코드공방</div>
      <h1>${user ? `${esc(user)}님, 오늘은 뭘 배워볼까요?` : '누구나 완전 처음부터 시작하는 코딩 연습 공간'}</h1>
      <p>쉬운 설명과 실제로 실행해 보는 예제, 그리고 원하는 만큼 계속 풀 수 있는 무한 연습 문제로 프로그래밍의 기초를 차근차근 익혀요.</p>
      <div class="home-stats-row">
        ${totalDone > 0
          ? `<div class="home-stat">지금까지 ${totalDone} / ${totalReady}개 단원 완료</div>`
          : ''}
        ${streak > 0 ? `<div class="home-stat streak">연속 ${streak}일 학습 중</div>` : ''}
        ${badgeCount > 0 ? `<div class="home-stat badge">뱃지 ${badgeCount}/${ACHIEVEMENTS.length}개 보유</div>` : ''}
      </div>
      ${totalDone === 0
        ? `<p class="muted" style="margin:0">아래에서 배우고 싶은 언어를 골라 바로 시작해보세요.${user ? '' : ' 회원가입하면 이 기기에서 나만의 진도를 따로 기록할 수 있어요.'}</p>`
        : ''}
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
    </section>
    <section class="block card">
      <div class="body backup-row">
        <div>
          <div class="backup-title">내 진도 백업</div>
          <p class="muted" style="margin:4px 0 0">진도는 이 브라우저에만 저장돼요. 파일로 내보내두면 다른 기기나 브라우저에서도 이어서 쓸 수 있어요.</p>
        </div>
        <div class="backup-actions">
          <button class="btn ghost small" type="button" id="exportProgressBtn">내보내기</button>
          <button class="btn ghost small" type="button" id="importProgressBtn">가져오기</button>
          <input type="file" id="importProgressFile" accept="application/json" hidden>
        </div>
      </div>
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

/* =========================================================================
   5.5) 실습장 — 퀴즈와 상관없이 자유롭게 코드를 써보고 바로 실행/미리보기/확인
   javascript는 원래부터 실제로 실행되고, webpage는 실시간 미리보기가 돼요.
   python은 Pyodide(웹어셈블리로 포팅된 진짜 CPython), sql은 sql.js(웹어셈블리
   SQLite)를 CDN에서 그때그때 불러와 실제로 실행해요 — 무거워서 실습장에서
   그 언어로 처음 실행 버튼을 누를 때만 다운로드돼요. java/c는 브라우저에서
   실제로 돌릴 만한 방법이 마땅치 않아 문법 강조 미리보기만 제공해요.
   ========================================================================= */
const PLAYGROUND_TABS = [
  { key: 'javascript', label: 'JavaScript', kind: 'run-js' },
  { key: 'webpage', label: 'HTML/CSS', kind: 'preview' },
  { key: 'python', label: 'Python', kind: 'run-py' },
  { key: 'sql', label: 'SQL', kind: 'run-sql' },
  { key: 'typescript', label: 'TypeScript', kind: 'highlight' },
  { key: 'java', label: 'Java', kind: 'highlight' },
  { key: 'kotlin', label: 'Kotlin', kind: 'highlight' },
  { key: 'c', label: 'C', kind: 'highlight' },
  { key: 'unity', label: 'Unity(C#)', kind: 'highlight', highlightLang: 'csharp' }
];
let playgroundLang = 'javascript';
const playgroundCode = {
  javascript: '// 여기에 자바스크립트 코드를 자유롭게 써보세요\nconsole.log("Hello, World!");',
  webpage: '<h1>안녕하세요!</h1>\n<p>여기 내용을 자유롭게 바꿔보세요.</p>\n\n<style>\n  h1 { color: royalblue; }\n</style>',
  python: '# 여기에 파이썬 코드를 자유롭게 써보세요\nprint("Hello, World!")',
  sql: '-- 여기에 SQL 코드를 자유롭게 써보세요\n-- students, scores 표가 미리 만들어져 있어요\nSELECT * FROM students;',
  typescript: '// 여기에 TypeScript 코드를 자유롭게 써보세요\nlet name: string = "지수";\nconsole.log(name);',
  java: '// 여기에 자바 코드를 자유롭게 써보세요\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  kotlin: '// 여기에 Kotlin 코드를 자유롭게 써보세요\nfun main() {\n    println("Hello, World!")\n}',
  c: '// 여기에 C 코드를 자유롭게 써보세요\n#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  unity: '// 여기에 Unity C# 스크립트를 자유롭게 써보세요\npublic class PlayerScript : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log("게임 시작!");\n    }\n}'
};

/* 외부 스크립트(Pyodide, sql.js)를 한 번만 불러오는 헬퍼. 실습장에서 그 언어를
   실제로 쓸 때만 CDN에서 받아오도록 미뤄서, 평소엔 다운로드되지 않게 해요. */
const loadedScripts = new Set();
function loadScriptOnce(src) {
  if (loadedScripts.has(src)) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const tag = document.createElement('script');
    tag.src = src;
    tag.onload = () => { loadedScripts.add(src); resolve(); };
    tag.onerror = () => reject(new Error('실행 환경을 불러오지 못했어요. 인터넷 연결을 확인해주세요.'));
    document.head.appendChild(tag);
  });
}

/* --- SQL: sql.js(웹어셈블리로 컴파일된 진짜 SQLite)로 실제 쿼리를 실행해요 --- */
const SQL_JS_BASE = 'https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/';
const SQL_SEED = `
CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT, age INTEGER, city TEXT);
CREATE TABLE scores (student_id INTEGER, score INTEGER);
INSERT INTO students (id, name, age, city) VALUES
  (1, '지수', 17, '서울'),
  (2, '민준', 16, '부산'),
  (3, '서연', 18, '서울');
INSERT INTO scores (student_id, score) VALUES (1, 90), (2, 85);
`;
let sqlJsNS = null;
let sqlDb = null;

async function ensureSqlJs() {
  if (sqlJsNS) return sqlJsNS;
  await loadScriptOnce(SQL_JS_BASE + 'sql-wasm.js');
  sqlJsNS = await window.initSqlJs({ locateFile: f => SQL_JS_BASE + f });
  return sqlJsNS;
}

function resetSqlDb() {
  if (sqlDb) sqlDb.close();
  sqlDb = new sqlJsNS.Database();
  sqlDb.run(SQL_SEED);
}

function sqlResultHTML(results) {
  if (results.length === 0) {
    return `<div class="code-output"><b>실행 결과</b>실행됐어요. (결과표가 없는 명령이에요 — INSERT/UPDATE/DELETE 등은 실행되지만 표로 보여줄 결과가 없어요)</div>`;
  }
  return results.map(r => `
    <div class="sql-result">
      <table>
        <thead><tr>${r.columns.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead>
        <tbody>${r.values.map(row => `<tr>${row.map(v => `<td>${v === null ? 'NULL' : esc(String(v))}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
    </div>`).join('');
}

async function runSqlPlayground(code) {
  const out = el('pgOutput');
  out.innerHTML = `<p class="muted" style="margin:0">SQL 실행 환경을 준비하는 중...</p>`;
  try {
    await ensureSqlJs();
    if (!sqlDb) resetSqlDb();
    out.innerHTML = sqlResultHTML(sqlDb.exec(code));
  } catch (err) {
    out.innerHTML = `<div class="code-output code-error"><b>오류가 났어요</b>${esc(err.message)}</div>`;
  }
}

async function resetSqlPlayground() {
  const out = el('pgOutput');
  out.innerHTML = `<p class="muted" style="margin:0">표를 초기화하는 중...</p>`;
  try {
    await ensureSqlJs();
    resetSqlDb();
    out.innerHTML = `<div class="code-output"><b>초기화 완료</b>students, scores 표를 처음 상태로 되돌렸어요.</div>`;
  } catch (err) {
    out.innerHTML = `<div class="code-output code-error"><b>오류가 났어요</b>${esc(err.message)}</div>`;
  }
}

/* --- Python: Pyodide(웹어셈블리로 포팅된 진짜 CPython)로 실제 실행해요 --- */
const PYODIDE_BASE = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
let pyodideInstance = null;
let pyodideLoadingPromise = null;

function ensurePyodide() {
  if (pyodideInstance) return Promise.resolve(pyodideInstance);
  if (pyodideLoadingPromise) return pyodideLoadingPromise;
  pyodideLoadingPromise = (async () => {
    await loadScriptOnce(PYODIDE_BASE + 'pyodide.js');
    pyodideInstance = await window.loadPyodide({ indexURL: PYODIDE_BASE });
    return pyodideInstance;
  })();
  return pyodideLoadingPromise;
}

async function runPythonPlayground(code) {
  const out = el('pgOutput');
  out.innerHTML = `<p class="muted" style="margin:0">파이썬 실행 환경을 처음 불러오는 중이에요. 몇 초 정도 걸릴 수 있어요 (다음번엔 훨씬 빨라져요)...</p>`;
  try {
    const py = await ensurePyodide();
    const logs = [];
    py.setStdout({ batched: msg => logs.push(msg) });
    py.setStderr({ batched: msg => logs.push(msg) });
    await py.runPythonAsync(code);
    out.innerHTML = `<div class="code-output"><b>실행 결과</b>${esc(logs.join('\n') || '(아무것도 출력되지 않았어요)')}</div>`;
  } catch (err) {
    out.innerHTML = `<div class="code-output code-error"><b>오류가 났어요</b>${esc(err.message)}</div>`;
  }
}

/* 실습장 코드를 URL에 담아 공유하는 링크. 서버 없이 base64로 인코딩해 #pg= 뒤에 실어요. */
function b64EncodeUtf8(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  bytes.forEach(b => { bin += String.fromCharCode(b); });
  return btoa(bin);
}
function b64DecodeUtf8(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function copyPlaygroundShareLink() {
  const code = el('pgInput').value;
  const encoded = encodeURIComponent(b64EncodeUtf8(JSON.stringify({ lang: playgroundLang, code })));
  const url = `${location.origin}${location.pathname}#pg=${encoded}`;
  navigator.clipboard.writeText(url).then(() => {
    alert('공유 링크를 복사했어요! 이 링크를 열면 실습장에 같은 코드가 그대로 채워져요.');
  }).catch(() => {
    prompt('아래 링크를 복사하세요:', url);
  });
}

function decodePlaygroundShareHash() {
  const m = location.hash.match(/^#pg=(.+)$/);
  if (!m) return null;
  try {
    const payload = JSON.parse(b64DecodeUtf8(decodeURIComponent(m[1])));
    if (!payload || typeof payload.code !== 'string' || !PLAYGROUND_TABS.some(t => t.key === payload.lang)) return null;
    return payload;
  } catch { return null; }
}

function goPlayground() {
  view = 'playground';
  el('sidebar').hidden = true;
  el('wrap').classList.add('home-view');
  renderNav();
  renderPlayground();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPlayground() {
  const tab = PLAYGROUND_TABS.find(t => t.key === playgroundLang);
  const runLabel = tab.kind === 'preview' ? '미리보기 새로고침' : tab.kind === 'highlight' ? '구문 확인하기' : '실행하기';
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">실습장</div>
      <h1>자유롭게 코드를 써보세요</h1>
      <p>퀴즈와 상관없이, 배운 걸 자유롭게 실험해볼 수 있는 공간이에요. 이 코드는 저장되지 않아요.</p>
    </div>
    <section class="block card">
      <div class="body">
        <div class="auth-tabs playground-tabs">
          ${PLAYGROUND_TABS.map(t => `<button class="auth-tab" type="button" data-pg-lang="${t.key}" aria-pressed="${t.key === playgroundLang}">${t.label}</button>`).join('')}
        </div>
        ${tab.kind === 'highlight' ? `<p class="muted" style="margin:12px 0 0">이 언어는 브라우저에서 직접 실행할 수는 없어요. 대신 문법이 강조된 모습으로 코드를 확인할 수 있어요.</p>` : ''}
        ${tab.kind === 'run-py' ? `<p class="muted" style="margin:12px 0 0">Pyodide(웹어셈블리로 포팅된 진짜 파이썬)로 실제 실행돼요. 처음 실행할 때만 조금 오래 걸려요.</p>` : ''}
        ${tab.kind === 'run-sql' ? `<p class="muted" style="margin:12px 0 0">sql.js(웹어셈블리 SQLite)로 실제 실행돼요. students, scores 표가 미리 만들어져 있어요.</p>` : ''}
        <div class="playground-editor">
          <textarea id="pgInput" rows="14" spellcheck="false" autocomplete="off" autocapitalize="off">${esc(playgroundCode[playgroundLang])}</textarea>
        </div>
        <div class="quiz-foot">
          <button class="btn" type="button" id="pgRun">${runLabel}</button>
          ${tab.kind === 'run-sql' ? `<button class="btn ghost" type="button" id="pgSqlReset">표 초기화</button>` : ''}
          <button class="btn ghost" type="button" id="pgShare">공유 링크 복사</button>
          <span class="muted" style="align-self:center; font-size:13px">Ctrl+Enter로도 실행할 수 있어요</span>
        </div>
        <div id="pgOutput"></div>
      </div>
    </section>`;
  el('pgOutput').innerHTML = '';
}

function runPlayground() {
  const tab = PLAYGROUND_TABS.find(t => t.key === playgroundLang);
  const code = el('pgInput').value;
  playgroundCode[playgroundLang] = code;
  const out = el('pgOutput');
  if (tab.kind === 'run-js') {
    const result = runUserJS(code);
    out.innerHTML = result.ok
      ? `<div class="code-output"><b>실행 결과</b>${esc(result.output || '(아무것도 출력되지 않았어요)')}</div>`
      : `<div class="code-output code-error"><b>오류가 났어요</b>${esc(result.error)}</div>`;
  } else if (tab.kind === 'preview') {
    out.innerHTML = `<div class="code-preview"><span class="code-preview-label">미리보기</span><iframe sandbox="" id="pgFrame" title="미리보기"></iframe></div>`;
    el('pgFrame').srcdoc = code || '<p></p>';
  } else if (tab.kind === 'run-py') {
    runPythonPlayground(code);
  } else if (tab.kind === 'run-sql') {
    runSqlPlayground(code);
  } else {
    out.innerHTML = `<figure class="code" style="margin:14px 0 0">
      <figcaption>${esc(tab.label)} 문법 미리보기</figcaption>
      <pre><code>${highlight(code, tab.highlightLang || tab.key)}</code></pre>
    </figure>`;
  }
}

/* =========================================================================
   5.6) 오답노트 — 실제로 틀린 적 있는 단원 위주로만 문제가 나오는 약점 복습 모드
   ========================================================================= */
function wrongNotePool() {
  const pool = [];
  Object.entries(COURSES).forEach(([lang, course]) => {
    course.units.filter(u => u.ready).forEach(u => {
      const rec = progress[`${lang}.${u.id}`];
      if (rec && rec.asked > rec.correct) pool.push({ lang, u, weakness: rec.asked - rec.correct });
    });
  });
  return pool;
}

function pickWeighted(pool) {
  const expanded = [];
  pool.forEach(item => { for (let i = 0; i < item.weakness; i++) expanded.push(item); });
  return pick(expanded);
}

function goWrongNote() {
  view = 'wrongnote';
  quizMode = 'wrongnote';
  el('sidebar').hidden = true;
  el('wrap').classList.add('home-view');
  renderNav();
  renderWrongNote();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderWrongNoteList() {
  const listEl = el('wrongNoteList');
  if (!listEl) return;
  const sorted = [...wrongNotePool()].sort((a, b) => b.weakness - a.weakness);
  listEl.innerHTML = sorted.length ? sorted.map(({ lang, u, weakness }) => `
    <div class="wrongnote-item">
      <span class="wrongnote-lang">${esc(COURSES[lang].name)}</span>
      <span class="wrongnote-unit">${esc(u.title)}</span>
      <span class="stat">틀린 ${weakness}개</span>
    </div>`).join('') : '<p class="muted" style="margin:0">지금까지 모은 오답을 모두 해결했어요! 훌륭해요.</p>';
}

function renderWrongNote() {
  const pool = wrongNotePool();
  if (pool.length === 0) {
    el('main').innerHTML = `
      <div class="hero">
        <div class="eyebrow">오답노트</div>
        <h1>아직 모아둔 오답이 없어요</h1>
        <p>단원 연습 문제나 복습에서 틀리는 문제가 생기면, 그 단원이 여기 자동으로 모여서 더 자주 나오게 돼요. 문제를 좀 더 풀어보세요!</p>
      </div>`;
    return;
  }
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">오답노트</div>
      <h1>자주 틀리는 단원 위주로 복습해요</h1>
      <p>아래 목록에 있는 단원들의 문제가 더 자주 나와요. 맞히다 보면 목록에서 자연스럽게 빠져요.</p>
    </div>
    <section class="block card">
      <div class="body"><div class="wrongnote-list" id="wrongNoteList"></div></div>
    </section>
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
      </div>
    </section>`;
  renderWrongNoteList();
  newQuestion();
}

function updateWrongNoteStats(ok) {
  const { lang, unitId } = currentQuestion._origin;
  const key = `${lang}.${unitId}`;
  const rec = progress[key] || { asked: 0, correct: 0, streak: 0, bestStreak: 0, done: false };
  rec.asked++;
  if (ok) { rec.correct++; rec.streak++; } else { rec.streak = 0; }
  rec.bestStreak = Math.max(rec.bestStreak, rec.streak);
  if (!rec.done && rec.bestStreak >= STREAK_GOAL) rec.done = true;
  progress[key] = rec;
  saveProgress(progress);
  renderStats();
  renderWrongNoteList();
}

/* =========================================================================
   5.7) 통계 대시보드 — 언어별 정답률, 취약 단원, 뱃지를 한 화면에 모아 보여줘요
   ========================================================================= */
function goStatsDashboard() {
  view = 'dashboard';
  el('sidebar').hidden = true;
  el('wrap').classList.add('home-view');
  renderNav();
  renderStatsDashboard();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderStatsDashboard() {
  const rows = Object.entries(COURSES).map(([key, c]) => {
    const ready = c.units.filter(u => u.ready);
    let asked = 0, correct = 0, doneCount = 0;
    ready.forEach(u => {
      const rec = progress[`${key}.${u.id}`];
      if (!rec) return;
      asked += rec.asked || 0;
      correct += rec.correct || 0;
      if (rec.done) doneCount++;
    });
    const acc = asked > 0 ? Math.round((correct / asked) * 100) : null;
    return { name: c.name, readyCount: ready.length, doneCount, acc };
  });
  const weak = [...wrongNotePool()].sort((a, b) => b.weakness - a.weakness).slice(0, 5);
  const badges = unlockedAchievements();
  const unlockedCount = badges.filter(b => b.unlocked).length;

  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">통계</div>
      <h1>내 학습 기록을 한눈에</h1>
      <p>언어별 정답률과 완료 현황, 자주 틀리는 단원과 모은 뱃지를 확인해보세요.</p>
    </div>
    <section class="block card">
      <h2>언어별 정답률</h2>
      <div class="body">
        ${rows.map(r => `
          <div class="stat-row">
            <div class="stat-row-label">${esc(r.name)} <span class="muted">(${r.doneCount}/${r.readyCount}개 완료)</span></div>
            <div class="stat-row-bar"><i style="width:${r.acc ?? 0}%"></i></div>
            <div class="stat-row-pct">${r.acc === null ? '－' : r.acc + '%'}</div>
          </div>`).join('')}
      </div>
    </section>
    <section class="block card">
      <h2>자주 틀리는 단원 Top 5</h2>
      <div class="body">
        ${weak.length
          ? `<div class="wrongnote-list">${weak.map(({ lang, u, weakness }) => `
              <div class="wrongnote-item">
                <span class="wrongnote-lang">${esc(COURSES[lang].name)}</span>
                <span class="wrongnote-unit">${esc(u.title)}</span>
                <span class="stat">틀린 ${weakness}개</span>
              </div>`).join('')}</div>`
          : '<p class="muted" style="margin:0">아직 취약한 단원이 없어요. 잘 하고 있어요!</p>'}
      </div>
    </section>
    <section class="block card">
      <h2>뱃지 ${unlockedCount}/${badges.length}</h2>
      <div class="body">
        <div class="badge-grid">
          ${badges.map(b => `
            <div class="badge-item ${b.unlocked ? '' : 'locked'}" title="${escAttr(b.desc)}">
              <div class="badge-icon">${b.icon}</div>
              <div class="badge-name">${esc(b.name)}</div>
            </div>`).join('')}
        </div>
      </div>
    </section>`;
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
  } else if (quizMode === 'wrongnote') {
    const pool = wrongNotePool();
    if (pool.length === 0) { goWrongNote(); return; }
    const { lang, u } = pickWeighted(pool);
    currentQuestion = pick(u.quizGenerators)();
    currentQuestion._source = { langName: COURSES[lang].name, unitTitle: u.title };
    currentQuestion._origin = { lang, unitId: u.id };
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
  touchDailyStreak();
  if (quizMode === 'review') updateReviewStats(ok);
  else if (quizMode === 'wrongnote') updateWrongNoteStats(ok);
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
  if (quizMode === 'wrongnote') {
    const { lang, unitId } = currentQuestion._origin;
    const rec = progress[`${lang}.${unitId}`] || { asked: 0, correct: 0, streak: 0, bestStreak: 0 };
    const unitTitle = COURSES[lang].units.find(u => u.id === unitId).title;
    el('quiz-stats').innerHTML = `
      <span class="stat"><b>${rec.streak}</b>연속 정답</span>
      <span class="stat"><b>${rec.correct}</b>/${rec.asked} 맞음</span>
      <span class="stat">${esc(COURSES[lang].name)} · ${esc(unitTitle)}</span>
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

  touchDailyStreak();
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

  const ddBtn = e.target.closest('[data-nav-dd]');
  if (ddBtn) {
    navDropdownOpen = navDropdownOpen === ddBtn.dataset.navDd ? null : ddBtn.dataset.navDd;
    renderNav();
    return;
  }

  const chip = e.target.closest('.chip');
  if (chip) {
    navDropdownOpen = null;
    if (chip.classList.contains('home-chip')) goHome();
    else if (chip.classList.contains('review-chip')) goReview();
    else if (chip.classList.contains('wrongnote-chip')) goWrongNote();
    else if (chip.classList.contains('playground-chip')) goPlayground();
    else if (chip.classList.contains('stats-chip')) goStatsDashboard();
    else if (chip.classList.contains('minigame-chip')) goMinigameHub();
    else goLesson(chip.dataset.lang, 0);
    return;
  }

  const pgTab = e.target.closest('[data-pg-lang]');
  if (pgTab) {
    playgroundCode[playgroundLang] = el('pgInput').value;
    playgroundLang = pgTab.dataset.pgLang;
    renderPlayground();
    return;
  }
  if (e.target.id === 'pgRun') { runPlayground(); return; }
  if (e.target.id === 'pgSqlReset') { resetSqlPlayground(); return; }
  if (e.target.id === 'pgShare') { copyPlaygroundShareLink(); return; }

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
  if (e.target.id === 'exportProgressBtn') { exportProgress(); return; }
  if (e.target.id === 'importProgressBtn') { el('importProgressFile').click(); return; }
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

/* 드롭다운(언어/도구) 바깥을 클릭하면 열려있던 드롭다운을 닫아요 */
document.addEventListener('click', e => {
  if (navDropdownOpen && !e.target.closest('.nav-dropdown')) {
    navDropdownOpen = null;
    renderNav();
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
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && e.target.id === 'pgInput') {
    e.preventDefault();
    runPlayground();
  }
  if (e.key === 'Tab' && e.target.matches('#codeInput, #pgInput') && !e.target.disabled) {
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
  if (e.key === 'Escape' && navDropdownOpen) { navDropdownOpen = null; renderNav(); }
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
  if (e.target.id === 'importProgressFile') {
    const file = e.target.files[0];
    if (file) importProgressFromFile(file);
    e.target.value = '';
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
  /* 이 사이트는 페이지 이동 없이 화면만 바뀌는 SPA라, 브라우저가 "비밀번호를 저장할까요?"를
     스스로 잘 못 알아챌 때가 있어요. 그래서 로그인/회원가입에 성공하면 Credential Management API로
     직접 저장을 요청해요(크롬 계열에서 지원, 지원 안 하면 조용히 무시돼요). */
  if (window.PasswordCredential) {
    try { await navigator.credentials.store(new PasswordCredential({ id: result.username, password, name: result.username })); }
    catch {}
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
const sharedPlayground = decodePlaygroundShareHash();
if (sharedPlayground) {
  playgroundLang = sharedPlayground.lang;
  playgroundCode[sharedPlayground.lang] = sharedPlayground.code;
  history.replaceState(null, '', location.pathname + location.search);
  goPlayground();
} else {
  goHome();
}
