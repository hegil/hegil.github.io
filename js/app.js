/* =========================================================================
   2) 문법 강조 (외부 라이브러리 없이 최소 구현)
   ========================================================================= */
const SYNTAX = {
  python:     { comment:'#[^\\n]*', keywords:['def','return','if','elif','else','for','while','in','not','and','or','import','from','as','class','True','False','None','print','input','int','float','str','bool','type','len','range'] },
  javascript: { comment:'//[^\\n]*|/\\*[\\s\\S]*?\\*/', keywords:['let','const','var','function','return','if','else','for','while','of','in','class','new','typeof','true','false','null','undefined','console'] },
  typescript: { comment:'//[^\\n]*|/\\*[\\s\\S]*?\\*/', keywords:['let','const','var','function','return','if','else','for','while','of','in','class','new','typeof','true','false','null','undefined','console','interface','type','extends','implements','public','private','readonly','enum','as','keyof','number','string','boolean','void','any'] },
  java:       { comment:'//[^\\n]*|/\\*[\\s\\S]*?\\*/', keywords:['public','private','protected','static','void','class','new','return','if','else','for','while','int','long','double','float','char','boolean','String','true','false','null','System'] },
  kotlin:     { comment:'//[^\\n]*|/\\*[\\s\\S]*?\\*/', keywords:['val','var','fun','if','else','when','for','while','in','return','class','object','interface','data','companion','override','private','public','is','as','null','true','false','Int','String','Boolean','Double'] },
  csharp:     { comment:'//[^\\n]*|/\\*[\\s\\S]*?\\*/', keywords:['public','private','protected','internal','static','void','class','struct','interface','enum','record','new','return','if','else','for','foreach','while','switch','case','default','int','float','double','bool','string','true','false','null','using','namespace','override','virtual','abstract','base','readonly','const','var','try','catch','finally','throw','async','await'] },
  c:          { comment:'//[^\\n]*|/\\*[\\s\\S]*?\\*/', keywords:['include','int','float','double','char','void','return','if','else','for','while','sizeof','const','unsigned','struct','printf','scanf','main'] },
  sql:        { comment:'--[^\\n]*', keywords:['SELECT','FROM','WHERE','ORDER','BY','GROUP','JOIN','ON','ASC','DESC','LIMIT','AS','COUNT','SUM','AVG','MAX','MIN','AND','OR','NOT','IN','LIKE','NULL','INSERT','INTO','VALUES','UPDATE','DELETE','CREATE','TABLE'] },
  go:         { comment:'//[^\\n]*|/\\*[\\s\\S]*?\\*/', keywords:['package','import','func','var','const','type','struct','interface','map','chan','go','defer','return','if','else','for','range','switch','case','default','break','continue','select','fallthrough','nil','true','false','int','string','bool','float64','error','make','len','cap'] },
  php:        { comment:'//[^\\n]*|#[^\\n]*|/\\*[\\s\\S]*?\\*/', keywords:['echo','print','function','fn','return','if','elseif','else','foreach','for','while','as','class','new','public','private','protected','static','true','false','null','array','use','namespace','try','catch','throw','extends','implements','interface','abstract','const','match','switch','case','default','break','continue','require','include'] },
  rust:       { comment:'//[^\\n]*|/\\*[\\s\\S]*?\\*/', keywords:['fn','let','mut','const','struct','enum','impl','trait','match','if','else','while','loop','for','in','return','pub','use','mod','self','Self','true','false','String','str','i32','u32','f64','bool','Vec','Option','Result','Some','None','Ok','Err','dyn','move','async','await','where','as'] },
  cpp:        { comment:'//[^\\n]*|/\\*[\\s\\S]*?\\*/', keywords:['int','float','double','char','bool','void','class','struct','public','private','protected','virtual','override','const','static','template','typename','namespace','using','new','delete','this','return','if','else','for','while','switch','case','break','continue','true','false','nullptr','auto','try','catch','throw','std'] },
  swift:      { comment:'//[^\\n]*|/\\*[\\s\\S]*?\\*/', keywords:['let','var','func','struct','class','enum','protocol','extension','if','else','guard','switch','case','default','for','while','return','true','false','nil','self','Self','init','override','private','public','internal','static','try','catch','throws','async','await','Int','String','Bool','Double','Array','Dictionary','Optional','Some','None'] }
};
const STRING_PAT = `"""[\\s\\S]*?"""|'''[\\s\\S]*?'''|\`(?:\\\\.|[^\`\\\\])*\`|"(?:\\\\.|[^"\\\\\\n])*"|'(?:\\\\.|[^'\\\\\\n])*'|<[a-z.]+\\.h>`;

const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const escAttr = s => s.replace(/&/g,'&amp;').replace(/"/g,'&quot;');

/* "정식 단원"만 골라줘요 — 각 언어 맨 앞의 "이 언어는 무엇인가요?" 소개 단원(intro: true)은
   문제·예제가 없는 순수 설명용이라, 티어 배정·진도·완료율·복습·오답노트·오늘의 문제 계산에서 전부 빠져요. */
const readyLessons = units => units.filter(u => u.ready && !u.intro);

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

/* "따라 써보기"에서 주석(설명용 글) 내용까지 토씨 하나 안 틀리고 베끼도록
   요구하지 않으려고, 채점 전에 각 언어의 주석 문법에 맞춰 주석을 지워요. */
function stripComments(code, lang) {
  if (lang === 'html') return code.replace(/<!--[\s\S]*?-->/g, '');
  if (lang === 'css') return code.replace(/\/\*[\s\S]*?\*\//g, '');
  const spec = SYNTAX[lang] || SYNTAX.python;
  return code.replace(new RegExp(spec.comment, 'g'), '');
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
    readyLessons(course.units).forEach(u => {
      full[`${key}.${u.id}`] = {
        asked: STREAK_GOAL, correct: STREAK_GOAL, streak: STREAK_GOAL, bestStreak: STREAK_GOAL,
        done: true, bossCleared: true
      };
      /* "따라 써보기"도 다 마친 것으로 채워서, admin이 최종 도전·가운틀렛까지 잠김 없이 둘러볼 수 있게 해요. */
      u.blocks.forEach((b, i) => { if (b.code) full[`${key}.${u.id}.fa${i}`] = true; });
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
    const ready = readyLessons(c.units);
    let doneCount = 0;
    ready.forEach(u => {
      const rec = progress[`${key}.${u.id}`];
      if (!rec) return;
      if (isUnitComplete(key, u)) doneCount++;
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
let searchQuery = '';   // 검색 화면에 입력된 검색어(화면을 다시 그려도 유지)

const el = id => document.getElementById(id);

function renderNav() {
  const homeChip = `<button class="chip home-chip" type="button" aria-pressed="${view === 'home'}">홈</button>`;
  const reviewChip = `<button class="chip review-chip" type="button" aria-pressed="${view === 'review'}">복습</button>`;
  const wrongNoteChip = `<button class="chip wrongnote-chip" type="button" aria-pressed="${view === 'wrongnote'}">오답노트</button>`;
  const playgroundChip = `<button class="chip playground-chip" type="button" aria-pressed="${view === 'playground'}">실습장</button>`;
  const statsChip = `<button class="chip stats-chip" type="button" aria-pressed="${view === 'dashboard'}">통계</button>`;
  const minigameChip = `<button class="chip minigame-chip" type="button" aria-pressed="${view === 'minigames' || view === 'minigame'}">미니게임</button>`;
  const searchChip = `<button class="chip search-chip" type="button" aria-pressed="${view === 'search'}">검색</button>`;
  const cheatSheetChip = `<button class="chip cheatsheet-chip" type="button" aria-pressed="${view === 'cheatsheet'}">치트시트</button>`;
  const dailyChip = `<button class="chip daily-chip" type="button" aria-pressed="${view === 'daily'}">오늘의 문제</button>`;
  const helpChip = `<button class="chip help-chip" type="button" aria-pressed="${view === 'help'}">도움말</button>`;
  const langChips = Object.entries(COURSES).map(([k, c]) =>
    `<button class="chip" type="button" data-lang="${k}" aria-pressed="${view === 'lesson' && k === langKey}">${c.name}</button>`
  ).join('');

  const langLabel = view === 'lesson' ? COURSES[langKey].name : '언어';
  const toolLabel = { review: '복습', wrongnote: '오답노트', playground: '실습장', dashboard: '통계', minigames: '미니게임', minigame: '미니게임', cheatsheet: '치트시트', daily: '오늘의 문제' }[view] || '도구';
  const langOpen = navDropdownOpen === 'lang';
  const toolsOpen = navDropdownOpen === 'tools';

  el('langbar').innerHTML = `
    ${homeChip}
    ${searchChip}
    <div class="nav-dropdown">
      <button class="chip nav-dropdown-btn" type="button" data-nav-dd="lang" aria-expanded="${langOpen}" aria-pressed="${view === 'lesson'}">${esc(langLabel)} ▾</button>
      <div class="nav-dropdown-menu" ${langOpen ? '' : 'hidden'}>${langChips}</div>
    </div>
    <div class="nav-dropdown">
      <button class="chip nav-dropdown-btn" type="button" data-nav-dd="tools" aria-expanded="${toolsOpen}" aria-pressed="${toolLabel !== '도구'}">${esc(toolLabel)} ▾</button>
      <div class="nav-dropdown-menu" ${toolsOpen ? '' : 'hidden'}>${dailyChip}${reviewChip}${wrongNoteChip}${cheatSheetChip}${playgroundChip}${statsChip}${minigameChip}</div>
    </div>
    ${helpChip}
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
/* 로그인 폼에 "비밀번호 확인" 입력칸이 항상 DOM에 (숨겨진 채로) 남아있으면, 브라우저
   비밀번호 관리자가 로그인 폼도 계속 회원가입 폼(비밀번호 2개)으로 잘못 인식해서
   저장된 아이디가 자동완성 후보로 안 뜨는 문제가 생길 수 있어요. 그래서 로그인 모드일 땐
   그 입력칸을 아예 DOM에서 없애서, 폼이 진짜 "아이디+비밀번호" 2칸짜리 로그인 폼으로만
   보이게 해요. */
function updateAuthModeUI() {
  document.querySelectorAll('.auth-tab').forEach(t => t.setAttribute('aria-pressed', String(t.dataset.tab === authMode)));
  el('authTitle').textContent = authMode === 'login' ? '로그인' : '회원가입';
  el('authSubmit').textContent = authMode === 'login' ? '로그인' : '회원가입';
  const confirmWrap = el('authConfirmWrap');
  confirmWrap.hidden = authMode !== 'signup';
  if (authMode === 'signup') {
    if (!el('authConfirm')) {
      const input = document.createElement('input');
      input.type = 'password';
      input.id = 'authConfirm';
      input.name = 'new-password-confirm';
      input.autocomplete = 'new-password';
      confirmWrap.appendChild(input);
    }
  } else if (el('authConfirm')) {
    el('authConfirm').remove();
  }
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

/* 나머지 언어들이 백그라운드 로딩을 마치면, 여러 언어를 한 번에 나열하는 화면만
   새로고침해요. 이미 특정 언어 하나를 보고 있는 화면(단원 학습 중, 특정 치트시트,
   미니게임 진행 중 등)은 그대로 둬서 흐름을 방해하지 않아요. */
function refreshAfterCoursesLoaded() {
  Object.keys(COURSES).forEach(k => reviewLangs.add(k));
  renderNav();
  if (view === 'home') renderHome();
  else if (view === 'search') renderSearchResults(searchQuery);
  else if (view === 'dashboard') renderStatsDashboard();
  else if (view === 'wrongnote') renderWrongNoteList();
  else if (view === 'review' && !reviewActive) renderReviewSetup();
  else if (view === 'cheatsheet' && !el('cheatSheetChangeLang')) renderCheatSheetPicker();
  else if (view === 'minigames') renderMinigameHub();
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

/* 언어 하나에서 "다음으로 이어서 풀면 좋을" 준비된(ready) 단원을 찾아줘요.
   완료(done) 안 된 단원 중 가장 앞에 있는 걸 골라요 — 없으면(모두 완료) null. */
function nextUnitFor(key) {
  const units = COURSES[key].units;
  const index = units.findIndex(u => u.ready && !u.intro && !isUnitComplete(key, u));
  if (index === -1) return null;
  const readyUnits = readyLessons(units);
  const doneCount = readyUnits.filter(u => isUnitComplete(key, u)).length;
  return { unit: units[index], index, readyCount: readyUnits.length, doneCount };
}

function renderHome() {
  const user = getCurrentUser();
  const entries = Object.entries(COURSES);
  const totalReady = entries.reduce((sum, [, c]) => sum + readyLessons(c.units).length, 0);
  const totalDone = entries.reduce((sum, [key, c]) =>
    sum + readyLessons(c.units).filter(u => isUnitComplete(key, u)).length, 0);
  const streak = currentStreakForDisplay();
  const badgeCount = unlockedAchievements().filter(b => b.unlocked).length;
  const continuing = entries
    .map(([key, c]) => ({ key, c, next: nextUnitFor(key) }))
    .filter(({ next }) => next && next.doneCount > 0);
  const dailyDone = !!progress[`daily.${todayDateString()}`];

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
        ? `<p class="muted" style="margin:0">뭐부터 볼지 모르겠다면 아래 <b>파이썬(Python)</b>부터 시작해보는 걸 추천해요 — 문법이 쉬워서 프로그래밍 자체를 처음 배우기에 좋아요. 눈에 바로 보이는 결과를 원한다면 <b>HTML/CSS</b>도 좋은 선택이에요. 물론 어떤 언어로 시작해도 괜찮아요!${user ? '' : ' 회원가입하면 이 기기에서 나만의 진도를 따로 기록할 수 있어요.'}</p>`
        : ''}
      <div class="tip-line" style="margin-top:16px"><b>팁</b> ${pick(TIPS)}</div>
    </section>
    <section class="block card boss-cta">
      <div class="body">
        <div>
          <h3>오늘의 문제 ${dailyDone ? '✅' : ''}</h3>
          <p class="muted">${dailyDone
            ? '오늘 문제는 이미 풀었어요. 내일 새 문제로 다시 만나요!'
            : '오늘 하루, 모두에게 똑같은 문제가 나와요. 한번 도전해보세요!'}</p>
        </div>
        <button class="btn ${dailyDone ? 'ghost' : ''} small" type="button" id="goDailyBtn">${dailyDone ? '결과 다시 보기' : '도전하기'}</button>
      </div>
    </section>
    ${continuing.length ? `
    <section class="block card continue-card">
      <h2>이어서 학습하기</h2>
      <div class="body">
        <div class="continue-list">
          ${continuing.map(({ key, c, next }) => `
            <div class="continue-item">
              <div class="continue-info">
                <div class="continue-lang">${esc(c.name)} <span class="muted">(${next.doneCount}/${next.readyCount}개 완료)</span></div>
                <div class="continue-unit">다음 단원: ${esc(next.unit.title)}</div>
              </div>
              <button class="btn small" type="button" data-goto="${key}" data-goto-idx="${next.index}">이어서 하기</button>
            </div>`).join('')}
        </div>
      </div>
    </section>` : ''}
    <section class="lang-grid">
      ${entries.map(([key, c]) => {
        const readyUnits = readyLessons(c.units);
        const doneCount = readyUnits.filter(u => isUnitComplete(key, u)).length;
        const recommended = totalDone === 0 && key === 'python';
        return `<article class="lang-card" data-goto="${key}">
          ${recommended ? '<span class="lang-card-badge">추천</span>' : ''}
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
  { key: 'unity', label: 'Unity(C#)', kind: 'highlight', highlightLang: 'csharp' },
  { key: 'go', label: 'Go', kind: 'highlight' },
  { key: 'php', label: 'PHP', kind: 'highlight' },
  { key: 'rust', label: 'Rust', kind: 'highlight' },
  { key: 'cpp', label: 'C++', kind: 'highlight' },
  { key: 'csharp', label: 'C#', kind: 'highlight' },
  { key: 'swift', label: 'Swift', kind: 'highlight' }
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
  unity: '// 여기에 Unity C# 스크립트를 자유롭게 써보세요\npublic class PlayerScript : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log("게임 시작!");\n    }\n}',
  go: '// 여기에 Go 코드를 자유롭게 써보세요\npackage main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, World!")\n}',
  php: '<?php\n// 여기에 PHP 코드를 자유롭게 써보세요\necho "Hello, World!";',
  rust: '// 여기에 Rust 코드를 자유롭게 써보세요\nfn main() {\n    println!("Hello, World!");\n}',
  cpp: '// 여기에 C++ 코드를 자유롭게 써보세요\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
  csharp: '// 여기에 C# 코드를 자유롭게 써보세요\nusing System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Hello, World!");\n    }\n}',
  swift: '// 여기에 Swift 코드를 자유롭게 써보세요\nprint("Hello, World!")'
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

/* =========================================================================
   3.5) 언어 데이터 지연 로딩 — 첫 화면은 파이썬 데이터 하나만으로도 뜰 수 있어서,
   나머지 9개 언어 파일은 페이지가 열리자마자 백그라운드에서 따로 받아와요.
   여러 언어 목록을 보여주는 화면(홈, 검색, 치트시트 목록 등)은 전부 그 시점의
   COURSES를 기준으로 매번 다시 그려지기 때문에, 아직 안 받아진 언어는 목록에
   안 보일 뿐이라 사용자가 로딩 중인 언어를 잘못 눌러서 생기는 오류는 없어요. */
const LAZY_LANG_FILES = ['javascript', 'typescript', 'webpage', 'java', 'kotlin', 'c', 'unity', 'sql', 'go', 'php', 'rust', 'cpp', 'csharp', 'swift'];
/* "오늘의 문제"처럼 모두에게 같은 결과가 나와야 하는 곳 전용 — 언어 파일이 네트워크에서
   받아지는 순서(사람마다 다를 수 있음)와 무관하게 항상 같은 순서를 보장해요. */
const ALL_LANG_KEYS = ['python', ...LAZY_LANG_FILES];
const coursesReadyPromise = Promise.all(
  LAZY_LANG_FILES.map(key => loadScriptOnce(`js/data/${key}.js`))
).then(() => { refreshAfterCoursesLoaded(); })
 .catch(err => console.error('일부 언어 데이터를 불러오지 못했어요.', err));

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
    readyLessons(course.units).forEach(u => {
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
    const ready = readyLessons(c.units);
    let asked = 0, correct = 0, doneCount = 0;
    ready.forEach(u => {
      const rec = progress[`${key}.${u.id}`];
      if (!rec) return;
      asked += rec.asked || 0;
      correct += rec.correct || 0;
      if (isUnitComplete(key, u)) doneCount++;
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

/* =========================================================================
   5.8) 검색 — 모든 언어의 단원 제목·요약·목표를 한 번에 검색해서 바로 이동
   ========================================================================= */
function goSearch() {
  view = 'search';
  el('sidebar').hidden = true;
  el('wrap').classList.add('home-view');
  renderNav();
  renderSearchView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function searchUnits(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results = [];
  Object.entries(COURSES).forEach(([key, c]) => {
    c.units.forEach((u, index) => {
      if (!u.ready) return;
      const haystack = `${u.title} ${u.summary} ${(u.goals || []).join(' ')}`.toLowerCase();
      if (haystack.includes(q)) results.push({ key, course: c, unit: u, index });
    });
  });
  return results;
}

function renderSearchResults(query) {
  const box = el('searchResults');
  if (!box) return;
  const q = query.trim();
  if (!q) {
    box.innerHTML = '<p class="muted" style="margin:0">배우고 싶은 주제나 키워드를 입력해보세요. (예: 재귀, 반복문, 배열)</p>';
    return;
  }
  const results = searchUnits(q);
  if (!results.length) {
    box.innerHTML = `<p class="muted" style="margin:0">"${esc(q)}"에 맞는 단원을 찾지 못했어요. 다른 키워드로 검색해보세요.</p>`;
    return;
  }
  box.innerHTML = `<div class="continue-list">
    ${results.map(({ key, course, unit, index }) => `
      <div class="continue-item">
        <div class="continue-info">
          <div class="continue-lang">${esc(course.name)} <span class="muted">· ${esc(unit.title)}</span></div>
          <div class="continue-unit">${esc(unit.summary)}</div>
        </div>
        <button class="btn small" type="button" data-goto="${key}" data-goto-idx="${index}">이동하기</button>
      </div>`).join('')}
  </div>`;
}

function renderSearchView() {
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">검색</div>
      <h1>배우고 싶은 내용을 찾아보세요</h1>
      <p>모든 언어의 단원 제목과 설명을 한 번에 검색할 수 있어요.</p>
    </div>
    <section class="block card">
      <div class="body">
        <input type="text" id="searchInput" class="typing-input" placeholder="예: 재귀, 반복문, 배열..." value="${escAttr(searchQuery)}" autocomplete="off" spellcheck="false" autocapitalize="off">
        <div id="searchResults" style="margin-top:16px"></div>
      </div>
    </section>`;
  renderSearchResults(searchQuery);
  el('searchInput').focus();
  const val = el('searchInput').value;
  el('searchInput').value = '';
  el('searchInput').value = val; // 커서를 맨 끝으로 이동시켜요
}

/* =========================================================================
   5.8-1) 도움말 — 사이트의 여러 기능을 한 문단씩 설명하는 정적 페이지
   ========================================================================= */
function goHelp() {
  view = 'help';
  el('sidebar').hidden = true;
  el('wrap').classList.add('home-view');
  renderNav();
  renderHelpView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderHelpView() {
  const sections = [
    {
      h: '단원 학습: 설명 → 예제 → 따라 써보기 → 연습 문제 → 최종 도전',
      p: `각 단원은 이 순서로 진행돼요. 설명을 읽고 예제 코드를 본 다음, 그 예제를 바로 아래 "따라 써보기" 칸에 손으로 직접 입력해서 연습해요(예제는 복사할 수 없게 해뒀어요 — 직접 타이핑해야 기억에 오래 남거든요. 주석 내용까지 똑같이 안 써도 돼요). 그 아래 "연습 문제"에서는 같은 개념을 무작위 값으로 계속 풀 수 있어요. <b>연속으로 ${STREAK_GOAL}문제를 맞히면</b> 그 단원이 완료돼요 — 틀리면 넘어가지 않고 그 자리에서 다시 풀어야 해요(문제와 정답을 글자 단위로 비교해서 어디가 다른지도 보여줘요).`
    },
    {
      h: '최종 도전이 갑자기 안 열려요',
      p: `단원 완료는 두 가지를 모두 마쳐야 해요: <b>①연습 문제 연속 ${STREAK_GOAL}개 정답</b>과 <b>②그 단원의 모든 "따라 써보기" 예제</b>. 연습 문제만 다 맞히고 예제를 안 풀었다면, 최종 도전 자리에 "잠김" 카드가 대신 떠요. 위로 스크롤해서 아직 안 푼 예제를 마저 풀면 바로 열려요.`
    },
    {
      h: '티어(초급 · 중급 · 고급)와 티어 최종 도전',
      p: `한 언어의 단원들은 진도 순서대로 초급 · 중급 · 고급 세 티어로 자동으로 나뉘어요. 한 티어 안의 모든 단원을 완료(연습 문제 + 따라 써보기 둘 다)하면, 사이드바에 그 티어를 총정리하는 "티어 최종 도전"이 열려요.`
    },
    {
      h: '미니게임',
      p: `티어 최종 도전을 클리어하면, 그 언어·티어 자리에 미니게임이 하나 열려요. 버그 찾기, 타자 게임, 코드 순서 맞추기, 짝 맞추기, 출력 맞히기 스피드런, 키워드 골라내기 중 하나가 배정돼요 — 같은 언어 안에서도 티어마다 다른 게임이 나와요.`
    },
    {
      h: '복습',
      p: `원하는 언어를 하나 이상 골라서, 그 언어들의 문제가 뒤섞여 나오는 모드예요. 단원 학습과 달리 틀려도 바로 다음 문제로 넘어갈 수 있어요 — 이미 배운 내용을 여러 언어에 걸쳐 가볍게 복습할 때 써요.`
    },
    {
      h: '오답노트',
      p: `실제로 틀린 적 있는 단원 위주로만 문제가 나오는 모드예요. 많이 틀린 단원일수록 더 자주 나와요. 틀린 문제가 하나도 없다면 오답노트는 비어있어요.`
    },
    {
      h: '오늘의 문제',
      p: `날짜로 문제를 무작위로(하지만 고정된 방식으로) 골라서, <b>그날 하루는 모두에게 똑같은 문제</b>가 나와요. 하루에 한 번만 도전할 수 있고, 지난 기록은 달력 형태로 볼 수 있어요.`
    },
    {
      h: '치트시트',
      p: `언어별 핵심 문법과 예제 코드를 한 페이지로 압축해서 보여줘요. 여기 있는 코드는 복사도 되고, 인쇄 버튼으로 인쇄하거나 PDF로 저장해서 옆에 두고 참고할 수 있어요.`
    },
    {
      h: '실습장',
      p: `퀴즈와 상관없이 자유롭게 코드를 써보는 공간이에요. JavaScript·HTML/CSS·Python·SQL은 실제로 실행되거나 미리보기가 돼요(Python은 Pyodide, SQL은 sql.js — 처음 실행할 때만 필요한 만큼 다운로드돼요). 작성한 코드는 공유 링크로 다른 사람에게 보낼 수도 있어요.`
    },
    {
      h: '검색',
      p: `모든 언어의 단원 제목과 설명을 한 번에 검색해서, 원하는 주제로 바로 이동할 수 있어요.`
    },
    {
      h: '계정과 진도 백업',
      p: `로그인하면 이 브라우저 안에서 이름별로 진도를 따로 기록할 수 있어요(로그인 없이도 게스트로 계속 쓸 수 있어요). 진도는 이 브라우저에만 저장되니, 홈 화면의 "내보내기"로 파일을 저장해두면 다른 기기나 브라우저에서 "가져오기"로 이어서 쓸 수 있어요.`
    }
  ];
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">도움말</div>
      <h1>코드공방 사용법</h1>
      <p>이 사이트의 기능들을 한 문단씩 설명해요. 궁금한 부분만 골라 읽어도 좋아요.</p>
    </div>
    ${sections.map(s => `
      <section class="block card">
        <h2>${s.h}</h2>
        <div class="body"><p>${s.p}</p></div>
      </section>`).join('')}
    <section class="block card">
      <div class="body">
        <p class="muted" style="margin:0">더 궁금한 점이나 건의하고 싶은 게 있다면, 아래 <b>건의하기</b> 링크로 알려주세요.</p>
      </div>
    </section>`;
}

/* =========================================================================
   5.9) 치트시트 — 언어별 핵심 문법을 한 페이지로 압축해서 보여주고, 인쇄도 가능해요
   ========================================================================= */
function goCheatSheet(lang) {
  view = 'cheatsheet';
  el('sidebar').hidden = true;
  el('wrap').classList.add('home-view');
  renderNav();
  if (lang) renderCheatSheetView(lang); else renderCheatSheetPicker();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCheatSheetPicker() {
  const entries = Object.entries(COURSES);
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">치트시트</div>
      <h1>어떤 언어의 치트시트를 볼까요?</h1>
      <p>언어별 핵심 문법을 한 페이지로 압축해서 보여줘요. 인쇄하거나 저장해서 옆에 두고 참고하기 좋아요.</p>
    </div>
    <section class="lang-grid">
      ${entries.map(([key, c]) => `
        <article class="lang-card" data-cheatsheet="${key}">
          <h3>${esc(c.name)}</h3>
          <p>${esc(c.tagline)}</p>
          <button class="btn" type="button" data-cheatsheet="${key}">보기</button>
        </article>`).join('')}
    </section>`;
}

function renderCheatSheetView(key) {
  const c = COURSES[key];
  const units = readyLessons(c.units);
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">치트시트</div>
      <h1>${esc(c.name)} 핵심 문법 요약</h1>
      <p>배운 문법을 빠르게 훑어보거나, 인쇄해서 옆에 두고 참고할 수 있어요.</p>
      <div class="no-print" style="display:flex;gap:10px;margin-top:14px">
        <button class="btn ghost small" type="button" id="printCheatSheet">인쇄하기</button>
        <button class="text-btn" type="button" id="cheatSheetChangeLang">다른 언어 보기</button>
      </div>
    </div>
    <section class="cheatsheet-grid">
      ${units.map((u, i) => {
        const firstCodeBlock = u.blocks.find(b => b.code);
        return `<article class="block card cheatsheet-item">
          <h3>${i + 1}. ${esc(u.title)}</h3>
          <p class="muted">${esc(u.summary)}</p>
          ${firstCodeBlock ? codeFigure(firstCodeBlock.code, key) : ''}
        </article>`;
      }).join('')}
    </section>`;
}

/* =========================================================================
   5.10) 오늘의 문제 — 날짜로 난수 시드를 고정해서, 그날 하루는 누구에게나 똑같은 문제가 나와요
   ========================================================================= */
let dailyChallenge = null; // { dateStr, langKey, unit, question, answered, ok }

function todaysChallenge() {
  const dateStr = todayDateString();
  const rng = mulberry32(hashStringToSeed('daily-' + dateStr));
  const langKey = ALL_LANG_KEYS[Math.floor(rng() * ALL_LANG_KEYS.length)];
  const readyUnits = readyLessons(COURSES[langKey].units);
  const unit = readyUnits[Math.floor(rng() * readyUnits.length)];
  const genIndex = Math.floor(rng() * unit.quizGenerators.length);

  const originalRandom = Math.random;
  Math.random = rng; // 이 문제를 만드는 동안만, 단원 안의 randInt/pick도 같은 시드를 쓰게 해요
  let question;
  try { question = unit.quizGenerators[genIndex](); }
  finally { Math.random = originalRandom; }

  return { dateStr, langKey, unit, question };
}

async function goDaily() {
  view = 'daily';
  el('sidebar').hidden = true;
  el('wrap').classList.add('home-view');
  renderNav();
  el('main').innerHTML = `<div class="hero"><div class="eyebrow">오늘의 문제</div><h1>불러오는 중...</h1></div>`;

  await coursesReadyPromise;
  if (view !== 'daily') return; // 기다리는 동안 다른 화면으로 이동했으면 그리지 않아요

  const { dateStr, langKey, unit, question } = todaysChallenge();
  const saved = progress[`daily.${dateStr}`];
  dailyChallenge = { dateStr, langKey, unit, question, answered: !!saved, ok: saved ? saved.correct : null };
  renderDaily();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function dailyFoot() {
  if (dailyChallenge.answered) return '';
  return `
    <button class="btn" type="button" id="dailyCheck">확인하기</button>
    <button class="btn ghost" type="button" id="dailyHint">힌트 보기</button>`;
}

function renderDaily() {
  const course = COURSES[dailyChallenge.langKey];
  const bodyHTML = dailyChallenge.answered
    ? `<div class="verdict ${dailyChallenge.ok ? 'ok' : 'no'}">
         <div class="q-text" style="margin-bottom:8px">${dailyChallenge.question.q}</div>
         ${dailyChallenge.ok ? '정답이었어요! 🎉' : '아쉽게 오답이었어요.'} ${dailyChallenge.question.why}
         <div class="muted" style="margin-top:8px">오늘의 문제는 이미 풀었어요. 내일 새 문제로 다시 만나요!</div>
       </div>`
    : `<div id="qlist">${quizItem(dailyChallenge.question)}</div>
       <div class="hint-box" id="hintBox" hidden></div>`;

  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">오늘의 문제 · ${esc(dailyChallenge.dateStr)}</div>
      <h1>${esc(course.name)} · ${esc(dailyChallenge.unit.title)}</h1>
      <p>오늘 하루, 모두에게 똑같은 문제가 나와요. 하루에 한 번만 도전할 수 있고, 날짜가 바뀌면 새 문제로 바뀌어요.</p>
    </div>
    <section class="block card">
      <div class="body" style="padding-top:20px;padding-bottom:6px">
        ${bodyHTML}
      </div>
      ${dailyChallenge.answered ? '' : `<div class="quiz-foot">${dailyFoot()}</div>`}
    </section>
    ${dailyHistoryHTML()}`;
}

/* 최근 N일치 오늘의 문제 참여 기록을 { dateStr, state: 'ok'|'no'|'none' } 배열로 돌려줘요 */
function dailyHistoryDays(count = 28) {
  const days = [];
  const today = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const dateStr = `${d.getFullYear()}-${mm}-${dd}`;
    const rec = progress[`daily.${dateStr}`];
    days.push({ dateStr, state: rec ? (rec.correct ? 'ok' : 'no') : 'none' });
  }
  return days;
}

function dailyHistoryHTML() {
  const history = dailyHistoryDays(28);
  const participated = history.filter(d => d.state !== 'none').length;
  const correctCount = history.filter(d => d.state === 'ok').length;
  return `
    <section class="block card">
      <h2>지난 28일 기록</h2>
      <div class="body">
        <p class="muted" style="margin:0 0 12px">최근 28일 중 ${participated}일 참여, ${correctCount}일 정답</p>
        <div class="daily-history-grid">
          ${history.map(d => `<span class="daily-history-cell ${d.state}" data-date="${d.dateStr}" title="${d.dateStr}"></span>`).join('')}
        </div>
      </div>
    </section>`;
}

function checkDailyAnswer() {
  const box = document.querySelector('.q[data-q="0"]');
  const ok = gradeQuestion(dailyChallenge.question, box);
  if (ok === null) return;

  touchDailyStreak();
  dailyChallenge.answered = true;
  dailyChallenge.ok = ok;
  progress[`daily.${dailyChallenge.dateStr}`] = { correct: ok };
  saveProgress(progress);
  el('main').querySelector('.quiz-foot').innerHTML = dailyFoot();

  const cell = document.querySelector(`.daily-history-cell[data-date="${dailyChallenge.dateStr}"]`);
  if (cell) cell.className = `daily-history-cell ${ok ? 'ok' : 'no'}`;
}

function showDailyHint() {
  const box = el('hintBox');
  if (!box) return;
  box.hidden = false;
  box.innerHTML = `<b>힌트</b> ${dailyChallenge.question?.hint || '이 문제는 따로 힌트가 없어요.'}`;
}

function renderUnits() {
  const allUnits = COURSES[langKey].units;
  const introUnit = allUnits.find(u => u.intro);
  const readyUnits = readyLessons(allUnits);
  const tierOf = {};
  readyUnits.forEach((u, i) => { tierOf[u.id] = tierOfIndex(i, readyUnits.length); });

  /* 언어 소개 단원(intro)은 티어·번호 없이 목록 맨 위에 따로 하나만 보여줘요. */
  const introHTML = introUnit ? `<li class="intro-unit-item">
      <button class="unit-btn" type="button" data-unit="${allUnits.indexOf(introUnit)}"
              aria-current="${allUnits.indexOf(introUnit) === unitIdx}">
        <span class="dot"></span>
        <span>${introUnit.title}</span>
      </button></li>` : '';

  let lastTier = null;
  const bodyHTML = allUnits.map((u, i) => {
    if (u.intro) return '';
    let head = '';
    if (u.ready && tierOf[u.id] !== lastTier) {
      head = `<li class="tier-head">${TIER_LABEL[tierOf[u.id]]}</li>`;
      lastTier = tierOf[u.id];
    }
    const done = isUnitComplete(langKey, u);
    const displayNum = i + 1 - (introUnit ? 1 : 0);
    return `${head}<li>
      <button class="unit-btn ${done ? 'done' : ''}" type="button" data-unit="${i}"
              aria-current="${i === unitIdx}" ${u.ready ? '' : 'disabled'}>
        <span class="dot"></span>
        <span>${displayNum}. ${u.title}</span>
        ${u.ready ? '' : '<span class="soon">준비중</span>'}
      </button></li>`;
  }).join('');
  el('units').innerHTML = introHTML + bodyHTML;

  el('tierChallenge').innerHTML = TIER_ORDER.map(tier => {
    const unitsInTier = readyUnits.filter(u => tierOf[u.id] === tier);
    if (!unitsInTier.length) return '';
    const allDone = unitsInTier.every(u => isUnitComplete(langKey, u));
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
  const ready = readyLessons(units);
  const doneCount = ready.filter(u => isUnitComplete(langKey, u)).length;
  const pct = ready.length ? Math.round(doneCount / ready.length * 100) : 0;
  el('pct').textContent = pct + '%';
  el('barfill').style.width = pct + '%';
  const curUnit = units[unitIdx];
  if (curUnit.intro) {
    el('progress-note').innerHTML = `이 페이지는 문제·진도 없이 자유롭게 읽는 소개 페이지예요 · 전체 ${doneCount}/${ready.length}개 단원 완료`;
    el('sidebarTip').innerHTML = `<b>팁</b> ${pick(TIPS)}`;
    return;
  }
  const key = `${langKey}.${curUnit.id}`;
  const rec = progress[key];
  const streakDone = !!rec?.done;
  const followAlongDone = allFollowAlongsDone(curUnit, key);
  el('progress-note').innerHTML = streakDone && followAlongDone
    ? `이 단원 완료! 최고 연속 정답 <b>${rec.bestStreak}개</b> · 전체 ${doneCount}/${ready.length}개 단원 완료`
    : streakDone
      ? `연습 문제는 다 맞혔어요! 위에 있는 "따라 써보기" 예제도 마저 풀면 단원이 완료돼요. · 전체 ${doneCount}/${ready.length}개 단원 완료`
      : `전체 ${doneCount}/${ready.length}개 단원 완료 · 연속 ${STREAK_GOAL}개를 맞히면 이 단원이 완료돼요.`;
  el('sidebarTip').innerHTML = `<b>팁</b> ${pick(TIPS)}`;
}

/* 설명 블록 하나마다, 그 블록의 예제 코드를 그대로 따라 써보는 작은 연습칸을 붙여줘요.
   idx는 그 단원 안에서 이 블록이 몇 번째인지(u.blocks의 인덱스)예요.
   done이 true면 예전에 이미 맞혀본 적 있다는 뜻이라 "완료" 표시를 보여줘요. */
function followAlongWidget(code, idx, done) {
  const rows = Math.min(Math.max(code.src.split('\n').length, 3), 12);
  return `
    <div class="follow-along">
      <p class="muted" style="margin:12px 0 8px">위 <code>${esc(code.label)}</code> 예제를 그대로 따라 써보세요. 손으로 직접 입력하면 훨씬 오래 기억에 남아요. (주석 내용까지 똑같이 안 써도 돼요)</p>
      <div class="code-editor" style="padding:0">
        <textarea class="follow-along-input" data-follow-idx="${idx}" rows="${rows}" spellcheck="false" autocomplete="off" autocapitalize="off" placeholder="위 예제를 그대로 입력해보세요"></textarea>
      </div>
      <div class="quiz-foot" style="padding:10px 0 0; border-top:none">
        <button class="btn ghost small follow-along-check" type="button" data-follow-idx="${idx}">확인하기</button>
        <span class="muted" style="align-self:center; font-size:13px">Ctrl+Enter로도 확인할 수 있어요</span>
        <span class="stat done follow-along-badge" data-follow-idx="${idx}" ${done ? '' : 'hidden'}>완료</span>
      </div>
      <div class="verdict follow-along-verdict" data-follow-idx="${idx}" hidden></div>
    </div>`;
}

function codeFigure(b, lang, noCopy) {
  const c = b;
  const useLang = c.lang || lang;
  const resultBlock = c.preview
    ? `<div class="preview"><span class="preview-label">미리보기</span><iframe sandbox="" title="미리보기" srcdoc="${escAttr(c.preview)}"></iframe></div>`
    : (c.out ? `<div class="out"><b>실행 결과</b>${esc(c.out)}</div>` : '');
  return `<figure class="code${noCopy ? ' no-copy' : ''}">
    <figcaption>${esc(c.label)}${noCopy ? '<span class="muted" style="font-size:12px">직접 타이핑 연습을 위해 복사가 꺼져 있어요</span>' : '<button class="copy" type="button">복사</button>'}</figcaption>
    <pre><code>${highlight(c.src, useLang)}</code></pre>
    ${resultBlock}
  </figure>`;
}

/* "내가 쓴 답"과 "정답"을 글자 단위로 비교해서, 다른 부분만 강조해서 보여줘요.
   block=true면 여러 줄 코드처럼 <pre>로, false면 한 줄짜리 답처럼 <code>로 보여줘요.
   labels로 두 줄의 이름표를 바꿀 수 있어요(기본은 "내가 쓴 답"/"정답"). */
function diffCompareHTML(userAnswer, correctAnswer, block, labels) {
  const [userLabel, correctLabel] = labels || ['내가 쓴 답', '정답'];
  const diff = diffChars(userAnswer, correctAnswer);
  const tag = block ? 'pre' : 'code';
  const userHTML = diff
    .filter(d => d.type !== 'add')
    .map(d => d.type === 'del' ? `<span class="diff-del">${esc(d.value)}</span>` : esc(d.value))
    .join('');
  const correctHTML = diff
    .filter(d => d.type !== 'del')
    .map(d => d.type === 'add' ? `<span class="diff-add">${esc(d.value)}</span>` : esc(d.value))
    .join('');
  return `<div class="diff-compare">
    <div class="diff-row"><span class="diff-label">${esc(userLabel)}</span><${tag} class="diff-code">${userHTML || '<i>(비어있음)</i>'}</${tag}></div>
    <div class="diff-row"><span class="diff-label">${esc(correctLabel)}</span><${tag} class="diff-code">${correctHTML}</${tag}></div>
  </div>`;
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

/* 그 단원의 예제(코드 블록)가 있는 자리마다 "따라 써보기"를 한 번이라도 맞혔는지 확인해요.
   예제가 아예 없는 블록은 검사 대상에서 빠져요. */
function allFollowAlongsDone(u, key) {
  return u.blocks.every((b, i) => !b.code || progress[`${key}.fa${i}`]);
}

/* 사이드바 체크·홈 통계·업적 등 "이 단원 완료했나?"를 보여주는 모든 곳에서 쓰는 기준.
   연속 정답 스트릭과 그 단원의 모든 "따라 써보기"를 둘 다 마쳐야 진짜 완료로 쳐요. */
function isUnitComplete(langKey, u) {
  const key = `${langKey}.${u.id}`;
  return !!progress[key]?.done && allFollowAlongsDone(u, key);
}

/* 언어 소개 단원(intro: true)은 문제·예제·진도 없이 순수 설명만 보여줘요.
   퀴즈 섹션과 최종 도전 섹션을 통째로 빼고, 단원 번호 대신 "소개"라고 표시해요. */
function renderIntroUnit(course, u) {
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">${course.name} · 소개</div>
      <h1>${u.title}</h1>
      <p>${u.summary}</p>
    </div>
    ${u.blocks.map(b => `
      <section class="block card">
        <h2>${b.h}</h2>
        <div class="body">
          ${b.html}
          ${b.after || ''}
        </div>
      </section>`).join('')}`;
}

function renderUnit() {
  const course = COURSES[langKey];
  const u = course.units[unitIdx];
  if (u.intro) { renderIntroUnit(course, u); return; }
  const introOffset = course.units[0]?.intro ? 1 : 0;
  const key = `${langKey}.${u.id}`;
  const streakDone = !!progress[key]?.done;
  const followAlongDone = allFollowAlongsDone(u, key);
  const bossHTML = u.boss && streakDone ? (followAlongDone ? `
    <section class="block card boss-cta">
      <div class="body">
        <div>
          <h3>이 단원 최종 도전</h3>
          <p class="muted">${esc(u.title)}에서 배운 여러 개념을 한 번에 묻는 조금 어려운 문제예요.</p>
        </div>
        <button class="btn" type="button" id="startBoss">${progress[key]?.bossCleared ? '다시 도전하기' : '도전하기'}</button>
        ${progress[key]?.bossCleared ? '<span class="stat done">클리어!</span>' : ''}
      </div>
    </section>` : `
    <section class="block card boss-cta">
      <div class="body">
        <div>
          <h3>이 단원 최종 도전 <span class="muted" style="font-weight:400">· 잠김</span></h3>
          <p class="muted">위에 있는 "따라 써보기" 예제를 모두 맞혀야 최종 도전이 열려요.</p>
        </div>
      </div>
    </section>`) : '';
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">${course.name} · ${unitIdx + 1 - introOffset}단원</div>
      <h1>${u.title}</h1>
      <p>${u.summary}</p>
      <ul class="goals">${u.goals.map(g => `<li>${g}</li>`).join('')}</ul>
    </div>
    ${u.blocks.map((b, i) => `
      <section class="block card">
        <h2>${b.h}</h2>
        <div class="body">
          ${b.html}
          ${b.code ? codeFigure(b.code, langKey, true) : ''}
          ${b.code ? followAlongWidget(b.code, i, !!progress[`${key}.fa${i}`]) : ''}
          ${b.after || ''}
        </div>
      </section>`).join('')}
    <section class="block card" id="quiz">
      <h2>연습 문제 <span class="muted" style="font-weight:400">· 연속 ${STREAK_GOAL}개를 맞히면 단원 완료</span></h2>
      <div class="body" style="padding-bottom:6px">
        <p class="muted" style="margin:0 0 12px">문제를 풀고 <b>확인하기</b>를 누르면 정답과 설명이 나와요. 틀리면 그 자리에서 다시 풀어야 <b>다음 문제</b>로 넘어갈 수 있어요(막히면 <b>힌트 보기</b>를 눌러보세요). 직접 코드를 작성하는 문제는 정답 표현이 다양할 수 있어서, 틀려도 자유롭게 다음 문제로 넘어갈 수 있어요 (제출은 Ctrl+Enter로도 가능해요).</p>
        <div class="quiz-stats" id="quiz-stats"></div>
      </div>
      <div id="qlist"></div>
      <div class="hint-box" id="hintBox" hidden></div>
      <div class="quiz-foot">
        <button class="btn" type="button" id="check">확인하기</button>
        <button class="btn ghost" type="button" id="hintBtn">힌트 보기</button>
        <button class="btn ghost" type="button" id="next">다음 문제</button>
        <span class="muted" style="align-self:center; font-size:13px">정답을 맞혀야 다음 문제 버튼이 열려요</span>
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
      if (u.ready && !u.intro) pool.push({ lang, u });
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
  /* 단원 학습(practice)에서는 이번 문제를 맞히기 전까지 "다음 문제"를 눌러도 못 넘어가요.
     복습·오답노트는 예전처럼 언제든 다음 문제로 넘어갈 수 있어요.
     직접 코드를 쓰는 문제(실행형 제외)는 정답 표현이 여러 가지일 수 있어서 게이트에서 빼요. */
  const nextBtn = el('next');
  if (nextBtn) nextBtn.disabled = quizMode === 'practice' && !isExactMatchCodeQuestion(currentQuestion);
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

/* 직접 코드를 쓰는 문제(자바스크립트 실행형 제외)는 대부분 "정답 문자열이 딱 하나"라서,
   논리는 맞아도 변수 이름 등 표현이 다르면 오답으로 처리될 수 있어요. 이런 문제까지 "맞을 때까지
   못 넘어가게" 하면 억울하게 막힐 수 있어서, 다시 풀기 대상에서 빼요. */
function isExactMatchCodeQuestion(q) {
  return q.type === 'code' && q.mode !== 'run-js';
}

function gradeQuestion(q, box) {
  const verdict = box.querySelector('.verdict');
  /* quizMode는 view를 벗어나도 값이 남아있을 수 있어서(예: 홈에서 'practice'로
     설정된 채 오늘의 문제로 이동), 단원 학습 화면(view === 'lesson')일 때만 다시 풀기를 적용해요. */
  const retryOnWrong = view === 'lesson' && quizMode === 'practice' && !isExactMatchCodeQuestion(q);
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
      /* 다시 풀어야 하는 모드에서는 오답이어도 정답 위치를 바로 알려주지 않고,
         내가 고른 것만 틀렸다고 표시해서 스스로 다시 골라보게 해요. */
      if (ok && j === q.answer) lab.classList.add('correct');
      else if (!ok && Number(chosen.value) === j) lab.classList.add('wrong');
      else if (!retryOnWrong && j === q.answer) lab.classList.add('correct');
    });
    verdict.hidden = false;
    verdict.className = 'verdict ' + (ok ? 'ok' : 'no');
    verdict.innerHTML = q.why;
    if (ok || !retryOnWrong) box.querySelectorAll('input').forEach(i => { i.disabled = true; });
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
      if (!ok) resultHTML += result.ok
        ? diffCompareHTML(result.output, q.expectedOutput, true, ['실제 출력', '기대한 출력'])
        : `<div class="code-output"><b>기대한 실행 결과</b>${esc(q.expectedOutput)}</div>`;
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
      (!ok && q.mode !== 'run-js' ? diffCompareHTML(code, q.accept[0], true) : '');
    if (ok || !retryOnWrong) input.disabled = true;
    return ok;
  }

  const input = box.querySelector('input[name="q0"]');
  ok = q.accept.some(a => norm(a) === norm(input.value));
  input.style.borderColor = ok ? 'var(--ok)' : 'var(--bad)';

  verdict.hidden = false;
  verdict.className = 'verdict ' + (ok ? 'ok' : 'no');
  /* 다시 풀어야 하는 모드에서는 오답이어도 정답을 바로 보여주지 않아요(그대로 베끼면 재도전의 의미가 없으니까).
     힌트 버튼으로 살짝만 도움받고, 결국 스스로 맞혀야 해요. */
  verdict.innerHTML = q.why + (!ok && !retryOnWrong ? diffCompareHTML(input.value, q.accept[0], false) : '');
  if (ok || !retryOnWrong) {
    box.querySelectorAll('input').forEach(i => { i.disabled = true; });
  } else {
    /* 다시 풀 때 이전에 틀리게 쓴 값이 그대로 남아있으면 새로 입력한 글자가
       뒤에 이어붙어 버려서 혼란스러워요. 전체 선택해서 바로 새로 타이핑할 수 있게 해요. */
    input.focus();
    input.select();
  }
  return ok;
}

function checkAnswer() {
  if (!currentQuestion) return;
  const box = document.querySelector('.q[data-q="0"]');
  const ok = gradeQuestion(currentQuestion, box);
  if (ok === null) return;

  /* quizMode는 view를 벗어나도 값이 남아있을 수 있어서(예: 홈에서 'practice'로
     설정된 채 오늘의 문제로 이동), 단원 학습 화면(view === 'lesson')일 때만 다시 풀기를 적용해요. */
  const retryOnWrong = view === 'lesson' && quizMode === 'practice' && !isExactMatchCodeQuestion(currentQuestion);
  el('check').disabled = ok || !retryOnWrong;
  if (ok && retryOnWrong) el('next').disabled = false;
  touchDailyStreak();
  if (quizMode === 'review') updateReviewStats(ok);
  else if (quizMode === 'wrongnote') updateWrongNoteStats(ok);
  else updateStreak(ok);
}

/* "따라 써보기"는 단원 완료(연속 정답 스트릭)에는 영향을 주지 않는 가벼운 보조 연습이에요.
   위에 이미 정답(예제)이 그대로 보이니, 맞았는지 여부만 간단히 알려줘요.
   한 번이라도 맞히면 그 블록에 "완료" 표시를 남겨서, 다음에 단원에 다시 와도 어디까지 연습했는지 보여요.
   idx로 그 단원의 몇 번째 블록에 달린 연습칸인지 구분해요(한 단원에 여러 개 있을 수 있어요). */
function checkFollowAlong(idx) {
  const u = COURSES[langKey].units[unitIdx];
  const block = u.blocks[idx];
  if (!block || !block.code) return;
  const input = document.querySelector(`.follow-along-input[data-follow-idx="${idx}"]`);
  const verdict = document.querySelector(`.follow-along-verdict[data-follow-idx="${idx}"]`);
  const effectiveLang = block.code.lang || langKey;
  const ok = norm(stripComments(input.value, effectiveLang)) === norm(stripComments(block.code.src, effectiveLang));
  verdict.hidden = false;
  verdict.className = 'verdict follow-along-verdict ' + (ok ? 'ok' : 'no');
  verdict.textContent = ok
    ? '예제를 완벽하게 따라 썼어요!'
    : '위 예제와 비교해서 다른 부분을 찾아 고쳐보세요.';
  if (ok) {
    const progressKey = `${langKey}.${u.id}.fa${idx}`;
    const wasAlreadyDone = !!progress[progressKey];
    if (!wasAlreadyDone) {
      progress[progressKey] = true;
      saveProgress(progress);
    }
    const badge = document.querySelector(`.follow-along-badge[data-follow-idx="${idx}"]`);
    if (badge) badge.hidden = false;
    /* 방금 그 완료로 이 단원의 예제를 전부 다 맞혔고, 연속 정답 스트릭도 이미 달성한 상태라면
       "최종 도전"이 새로 열린 거라 화면을 다시 그려서 잠금 해제된 걸 바로 보여줘요. */
    if (!wasAlreadyDone && isUnitComplete(langKey, u)) {
      renderUnit();
      renderUnits(); // 이 단원이 속한 티어가 마침 이걸로 다 끝났다면, 사이드바의 티어 최종 도전도 함께 열려요
    }
  }
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
  const curUnit = COURSES[langKey].units[unitIdx];
  const key = `${langKey}.${curUnit.id}`;
  const rec = progress[key] || { asked: 0, correct: 0, streak: 0, bestStreak: 0, done: false };
  el('quiz-stats').innerHTML = `
    <span class="stat"><b>${rec.streak}</b>연속 정답</span>
    <span class="stat"><b>${rec.correct}</b>/${rec.asked} 맞음</span>
    <span class="stat"><b>${rec.bestStreak}</b>최고 기록</span>
    ${isUnitComplete(langKey, curUnit) ? '<span class="stat done">단원 완료</span>' : ''}
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
    else if (chip.classList.contains('search-chip')) goSearch();
    else if (chip.classList.contains('cheatsheet-chip')) goCheatSheet();
    else if (chip.classList.contains('daily-chip')) goDaily();
    else if (chip.classList.contains('help-chip')) goHelp();
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
  if (gotoEl) { goLesson(gotoEl.dataset.goto, Number(gotoEl.dataset.gotoIdx || 0)); return; }

  const cheatSheetEl = e.target.closest('[data-cheatsheet]');
  if (cheatSheetEl) { goCheatSheet(cheatSheetEl.dataset.cheatsheet); return; }

  if (e.target.id === 'printCheatSheet') { window.print(); return; }
  if (e.target.id === 'cheatSheetChangeLang') { goCheatSheet(); return; }
  if (e.target.id === 'goDailyBtn') { goDaily(); return; }
  if (e.target.id === 'dailyCheck') { checkDailyAnswer(); return; }
  if (e.target.id === 'dailyHint') { showDailyHint(); return; }

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
  const followAlongBtn = e.target.closest('.follow-along-check');
  if (followAlongBtn) { checkFollowAlong(Number(followAlongBtn.dataset.followIdx)); return; }

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

/* 단원 학습의 예제(figure.no-copy)는 직접 타이핑 연습을 유도하기 위해
   복사/우클릭 메뉴를 막아요. (완전한 방지는 아니고, 손으로 치도록 유도하는 정도예요) */
document.addEventListener('copy', e => {
  if (e.target.closest('figure.no-copy')) e.preventDefault();
});
document.addEventListener('contextmenu', e => {
  if (e.target.closest('figure.no-copy')) e.preventDefault();
});

/* 검색창은 입력할 때마다(클릭이 아니라 input 이벤트) 결과만 다시 그려요.
   #main 전체를 새로 그리면 입력칸이 포커스/커서 위치를 잃어버리기 때문이에요. */
document.addEventListener('input', e => {
  if (e.target.id === 'searchInput') {
    searchQuery = e.target.value;
    renderSearchResults(searchQuery);
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
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && e.target.classList.contains('follow-along-input')) {
    e.preventDefault();
    checkFollowAlong(Number(e.target.dataset.followIdx));
  }
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && e.target.id === 'pgInput') {
    e.preventDefault();
    runPlayground();
  }
  if (e.key === 'Tab' && (e.target.matches('#codeInput, #pgInput') || e.target.classList.contains('follow-along-input')) && !e.target.disabled) {
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
    await coursesReadyPromise;
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
