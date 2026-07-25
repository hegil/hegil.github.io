/* =========================================================================
   미니게임 — 티어(초급/중급/고급)를 클리어하면 사이드바에서 플레이할 수 있어요.
   초급: 버그 잡기(반사신경) · 중급: 타자 게임(코드 타이핑) · 고급: 코드 순서 맞추기
   ========================================================================= */

const MINIGAME_LABEL = { beginner: '버그 잡기', intermediate: '타자 게임', advanced: '코드 순서 맞추기' };
let minigame = null;

const TYPING_SNIPPETS = {
  python: ['print("Hello, World!")', 'for i in range(5):', 'if age >= 18:', 'return a + b', 'x = int(input())'],
  javascript: ['console.log("Hello!");', 'const x = 10;', 'if (age >= 18) {', 'return a + b;', 'let name = "지수";'],
  webpage: ['<h1>Hello, World!</h1>', 'color: royalblue;', '<p>안녕하세요</p>', 'display: flex;', 'border-radius: 8px;'],
  java: ['System.out.println("Hi");', 'int age = 17;', 'if (age >= 18) {', 'return a + b;', 'String name = "지수";'],
  c: ['printf("Hello\\n");', 'int age = 17;', 'if (age >= 18) {', 'return a + b;', 'float pi = 3.14;'],
  sql: ['SELECT * FROM students;', 'WHERE age >= 18;', 'ORDER BY age DESC;', 'GROUP BY city;', 'SELECT name FROM students;'],
};

const REORDER_SNIPPETS = {
  python: [
    ['age = 17', 'if age >= 18:', '    print("성인")', 'else:', '    print("미성년자")'],
    ['total = 0', 'for i in range(5):', '    total += i', 'print(total)'],
  ],
  javascript: [
    ['let age = 17;', 'if (age >= 18) {', '  console.log("성인");', '} else {', '  console.log("미성년자");', '}'],
    ['let total = 0;', 'for (let i = 0; i < 5; i++) {', '  total += i;', '}'],
  ],
  webpage: [
    ['<ul>', '  <li>사과</li>', '  <li>바나나</li>', '</ul>'],
    ['.box {', '  padding: 10px;', '  border-radius: 8px;', '}'],
  ],
  java: [
    ['int age = 17;', 'if (age >= 18) {', '    System.out.println("성인");', '} else {', '    System.out.println("미성년자");', '}'],
  ],
  c: [
    ['int age = 17;', 'if (age >= 18) {', '    printf("성인\\n");', '} else {', '    printf("미성년자\\n");', '}'],
  ],
  sql: [
    ['SELECT city, COUNT(*)', 'FROM students', 'GROUP BY city;'],
    ['SELECT name, age', 'FROM students', 'WHERE age >= 18', 'ORDER BY age DESC;'],
  ],
};

function clearMinigameTimers() {
  if (minigame && minigame.timers) minigame.timers.forEach(t => { clearInterval(t); clearTimeout(t); });
}

function startMinigame(lang, tier) {
  clearMinigameTimers();
  view = 'minigame';
  el('sidebar').hidden = true;
  el('wrap').classList.add('home-view');
  renderNav();
  if (tier === 'beginner') renderBugGame(lang);
  else if (tier === 'intermediate') renderTypingGame(lang);
  else renderReorderGame(lang);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function exitMinigame() {
  const lang = minigame ? minigame.lang : langKey;
  clearMinigameTimers();
  minigame = null;
  goLesson(lang, 0);
}

/* ---------- 초급: 버그 잡기 ---------- */
function renderBugGame(lang) {
  clearMinigameTimers();
  minigame = { lang, tier: 'beginner', score: 0, timeLeft: 15, timers: [] };
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">미니게임 · 초급</div>
      <h1>버그 잡기</h1>
      <p>화면에 나타나는 버그를 사라지기 전에 최대한 많이 클릭하세요! (15초)</p>
    </div>
    <section class="block card">
      <div class="body">
        <div class="game-hud">
          <span class="stat"><b id="bugScore">0</b>점</span>
          <span class="stat"><b id="bugTime">15</b>초 남음</span>
        </div>
        <div class="game-area" id="bugArea"></div>
      </div>
      <div class="quiz-foot">
        <button class="text-btn" type="button" id="exitMinigame">나가기</button>
      </div>
    </section>`;

  const area = el('bugArea');
  function spawnOne() {
    const bug = document.createElement('button');
    bug.type = 'button';
    bug.className = 'bug';
    bug.textContent = pick(['🐛', '🪲', '🐞']);
    const maxX = Math.max(0, area.clientWidth - 40);
    const maxY = Math.max(0, area.clientHeight - 40);
    bug.style.left = randInt(0, maxX) + 'px';
    bug.style.top = randInt(0, maxY) + 'px';
    bug.addEventListener('click', () => {
      minigame.score++;
      el('bugScore').textContent = minigame.score;
      bug.remove();
    });
    area.appendChild(bug);
    minigame.timers.push(setTimeout(() => bug.remove(), 1100));
  }
  minigame.timers.push(setInterval(spawnOne, 650));
  minigame.timers.push(setInterval(() => {
    minigame.timeLeft--;
    el('bugTime').textContent = minigame.timeLeft;
    if (minigame.timeLeft <= 0) endBugGame();
  }, 1000));
}

function endBugGame() {
  const score = minigame.score;
  clearMinigameTimers();
  const msg = score >= 15 ? '엄청나요! 반사신경이 대단해요.' : score >= 8 ? '잘했어요!' : '다음엔 더 잘할 수 있어요!';
  el('main').querySelector('.card').innerHTML = `
    <div class="body" style="text-align:center; padding:40px 20px">
      <h2 style="margin-top:0">게임 종료!</h2>
      <p class="home-stat" style="font-size:20px">${score}점</p>
      <p class="muted">${msg}</p>
      <div style="display:flex; gap:10px; justify-content:center; margin-top:16px">
        <button class="btn" type="button" id="bugRetry">다시 하기</button>
        <button class="btn ghost" type="button" id="exitMinigame">나가기</button>
      </div>
    </div>`;
}

/* ---------- 중급: 타자 게임 ---------- */
function renderTypingGame(lang) {
  clearMinigameTimers();
  const bank = TYPING_SNIPPETS[lang] || TYPING_SNIPPETS.javascript;
  const snippet = pick(bank);
  minigame = { lang, tier: 'intermediate', snippet, startedAt: null, timers: [] };
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">미니게임 · 중급</div>
      <h1>타자 게임</h1>
      <p>아래 코드를 최대한 빠르고 정확하게 그대로 입력해보세요.</p>
    </div>
    <section class="block card">
      <div class="body">
        <div class="type-target">${esc(snippet)}</div>
        <input type="text" id="typingInput" class="typing-input" autocomplete="off" spellcheck="false" autocapitalize="off" placeholder="여기에 그대로 입력하세요">
        <div class="muted" id="typingStatus" style="margin-top:10px">입력을 시작하면 시간이 측정돼요.</div>
      </div>
      <div class="quiz-foot">
        <button class="btn" type="button" id="typingSubmit">제출하기</button>
        <button class="btn ghost" type="button" id="typingRetry" hidden>다른 코드로 다시</button>
        <button class="text-btn" type="button" id="exitMinigame" style="margin-left:auto">나가기</button>
      </div>
    </section>`;
  const input = el('typingInput');
  input.addEventListener('input', () => {
    if (minigame.startedAt === null) minigame.startedAt = Date.now();
  });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); submitTyping(); }
  });
  input.focus();
}

function submitTyping() {
  const input = el('typingInput');
  if (input.disabled) return;
  const typed = input.value;
  const elapsedMs = minigame.startedAt ? (Date.now() - minigame.startedAt) : 0;
  const seconds = Math.max(0.1, elapsedMs / 1000);
  const cpm = Math.round((typed.length / seconds) * 60);
  const ok = typed === minigame.snippet;
  el('typingStatus').innerHTML = ok
    ? `<span style="color:var(--ok);font-weight:600">정확해요!</span> ${seconds.toFixed(1)}초 · 분당 ${cpm}타`
    : `<span style="color:var(--bad);font-weight:600">아직 다른 부분이 있어요.</span> 위 코드와 한 글자씩 비교해보세요.`;
  input.disabled = true;
  el('typingSubmit').hidden = true;
  el('typingRetry').hidden = false;
}

/* ---------- 고급: 코드 순서 맞추기 ---------- */
function renderReorderGame(lang) {
  clearMinigameTimers();
  const bank = REORDER_SNIPPETS[lang] || REORDER_SNIPPETS.javascript;
  const correctLines = pick(bank);
  minigame = { lang, tier: 'advanced', correctLines, answer: [], pool: shuffle(correctLines), startedAt: Date.now(), timers: [] };
  renderReorderUI();
}

function renderReorderUI() {
  const m = minigame;
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">미니게임 · 고급</div>
      <h1>코드 순서 맞추기</h1>
      <p>아래 뒤섞인 코드 줄들을 눌러서 올바른 순서로 완성해보세요.</p>
    </div>
    <section class="block card">
      <div class="body">
        <div class="muted" style="margin-bottom:8px">완성한 코드 (눌러서 다시 뺄 수 있어요)</div>
        <div class="reorder-answer" id="reorderAnswer">
          ${m.answer.length
            ? m.answer.map((line, i) => `<button type="button" class="reorder-line" data-remove="${i}">${esc(line)}</button>`).join('')
            : '<span class="muted">아래에서 코드 줄을 눌러 순서대로 담아보세요.</span>'}
        </div>
        <div class="muted" style="margin:16px 0 8px">남은 코드 줄</div>
        <div class="reorder-pool" id="reorderPool">
          ${m.pool.map((line, i) => `<button type="button" class="reorder-line" data-add="${i}">${esc(line)}</button>`).join('')}
        </div>
        <div class="verdict" id="reorderVerdict" hidden></div>
      </div>
      <div class="quiz-foot">
        <button class="btn" type="button" id="reorderCheck" ${m.pool.length ? 'disabled' : ''}>확인하기</button>
        <button class="btn ghost" type="button" id="reorderReset">처음부터</button>
        <button class="btn ghost" type="button" id="reorderRetry" hidden>다른 문제로 다시</button>
        <button class="text-btn" type="button" id="exitMinigame" style="margin-left:auto">나가기</button>
      </div>
    </section>`;
}

function checkReorder() {
  const m = minigame;
  const ok = m.answer.length === m.correctLines.length && m.answer.every((line, i) => line === m.correctLines[i]);
  const seconds = ((Date.now() - m.startedAt) / 1000).toFixed(1);
  const verdict = el('reorderVerdict');
  verdict.hidden = false;
  verdict.className = 'verdict ' + (ok ? 'ok' : 'no');
  verdict.innerHTML = ok
    ? `${seconds}초 만에 완성했어요! 코드가 위에서 아래로 흘러가는 순서를 잘 이해하고 있네요.`
    : `아직 순서가 맞지 않아요. "처음부터"를 누르고 코드의 흐름을 다시 생각해보세요.`;
  if (ok) {
    el('reorderCheck').hidden = true;
    el('reorderReset').hidden = true;
    el('reorderRetry').hidden = false;
  }
}

/* ---------- 미니게임 전용 클릭 처리 ---------- */
document.addEventListener('click', e => {
  if (e.target.id === 'exitMinigame') { exitMinigame(); return; }
  if (!minigame) return;

  if (e.target.id === 'bugRetry') { renderBugGame(minigame.lang); return; }
  if (e.target.id === 'typingSubmit') { submitTyping(); return; }
  if (e.target.id === 'typingRetry') { renderTypingGame(minigame.lang); return; }

  const add = e.target.closest('[data-add]');
  if (add) {
    const idx = Number(add.dataset.add);
    const [line] = minigame.pool.splice(idx, 1);
    minigame.answer.push(line);
    renderReorderUI();
    return;
  }
  const remove = e.target.closest('[data-remove]');
  if (remove) {
    const idx = Number(remove.dataset.remove);
    const [line] = minigame.answer.splice(idx, 1);
    minigame.pool.push(line);
    renderReorderUI();
    return;
  }
  if (e.target.id === 'reorderReset') {
    minigame.pool = [...minigame.answer, ...minigame.pool];
    minigame.answer = [];
    renderReorderUI();
    return;
  }
  if (e.target.id === 'reorderCheck') { checkReorder(); return; }
  if (e.target.id === 'reorderRetry') { renderReorderGame(minigame.lang); return; }
});
