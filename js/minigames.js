/* =========================================================================
   미니게임 허브 — 티어(초급/중급/고급)를 클리어하면 그 자리의 미니게임이 열려요.
   "미니게임" 메뉴 한 곳에 6개 언어 × 3개 난이도 = 18개 자리가 모여있고,
   언어와 난이도 조합마다 서로 다른 게임이 배정돼요(아래 GAME_MATRIX 참고).
   모두 실제 코딩 개념(키워드, 오류 찾기, 실행 순서, 출력 예측, 타이핑)과 연결돼요.
   ========================================================================= */

/* 언어 × 티어 → 게임 종류. 같은 언어 안에서는 3개 다 다르게,
   같은 티어라도 언어마다 다른 게임이 나오도록 배치했어요. */
const GAME_MATRIX = {
  python:     { beginner: 'bug',      intermediate: 'typing',  advanced: 'reorder' },
  javascript: { beginner: 'match',    intermediate: 'speed',   advanced: 'bug' },
  webpage:    { beginner: 'keywords', intermediate: 'match',   advanced: 'typing' },
  java:       { beginner: 'bug',      intermediate: 'reorder', advanced: 'speed' },
  c:          { beginner: 'match',    intermediate: 'bug',     advanced: 'reorder' },
  sql:        { beginner: 'keywords', intermediate: 'speed',   advanced: 'match' },
  typescript: { beginner: 'reorder',  intermediate: 'keywords', advanced: 'speed' },
  kotlin:     { beginner: 'typing',   intermediate: 'match',   advanced: 'keywords' },
  unity:      { beginner: 'speed',    intermediate: 'bug',     advanced: 'typing' },
  go:         { beginner: 'match',    intermediate: 'reorder', advanced: 'bug' },
  php:        { beginner: 'bug',      intermediate: 'keywords', advanced: 'typing' },
};

const GAME_TYPE_LABEL = {
  bug: '버그 찾기', typing: '타자 게임', reorder: '코드 순서 맞추기',
  match: '짝 맞추기', speed: '출력 맞히기 스피드런', keywords: '키워드 골라내기',
};

let minigame = null;

function clearMinigameTimers() {
  if (minigame && minigame.timers) minigame.timers.forEach(t => { clearInterval(t); clearTimeout(t); });
}

/* ---------- 진입 · 이탈 (항상 미니게임 허브를 오가요) ---------- */
function goMinigameHub() {
  clearMinigameTimers();
  minigame = null;
  view = 'minigames';
  el('sidebar').hidden = true;
  el('wrap').classList.add('home-view');
  renderNav();
  renderMinigameHub();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startMinigame(lang, tier) {
  clearMinigameTimers();
  view = 'minigame';
  el('sidebar').hidden = true;
  el('wrap').classList.add('home-view');
  renderNav();
  const gameType = GAME_MATRIX[lang][tier];
  ({ bug: renderBugGame, typing: renderTypingGame, reorder: renderReorderGame,
     match: renderMatchGame, speed: renderSpeedGame, keywords: renderKeywordGame })[gameType](lang);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function exitMinigame() {
  clearMinigameTimers();
  minigame = null;
  goMinigameHub();
}

/* ---------- 미니게임 허브 화면 ---------- */
function renderMinigameHub() {
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">미니게임</div>
      <h1>언어와 난이도마다 다른 미니게임</h1>
      <p>단원의 초급·중급·고급 티어를 클리어하면 그 자리의 미니게임이 열려요. 언어마다, 난이도마다 다른 게임이 기다리고 있어요.</p>
    </div>
    <section class="minigame-hub">
      ${Object.entries(COURSES).map(([key, c]) => `
        <div class="minigame-lang-row card">
          <h3>${c.name}</h3>
          <div class="minigame-slots">
            ${TIER_ORDER.map(tier => {
              const cleared = progress[`${key}.tier.${tier}`]?.cleared;
              const gameType = GAME_MATRIX[key][tier];
              return cleared
                ? `<button type="button" class="minigame-slot" data-play-lang="${key}" data-play-tier="${tier}">
                     <span class="minigame-slot-tier">${TIER_LABEL[tier]}</span>
                     <span class="minigame-slot-name">${GAME_TYPE_LABEL[gameType]}</span>
                   </button>`
                : `<button type="button" class="minigame-slot locked" disabled>
                     <span class="minigame-slot-tier">${TIER_LABEL[tier]}</span>
                     <span class="minigame-slot-name">잠김 · 티어 클리어 필요</span>
                   </button>`;
            }).join('')}
          </div>
        </div>`).join('')}
    </section>`;
}

/* ---------- 초급 후보: 버그 찾기 (코드를 읽고 오류가 있는 줄 찾기) ---------- */
const BUG_SNIPPETS = {
  python: [
    { lines: ['age = 17', 'if age >= 18', '    print("성인")', 'else:', '    print("미성년자")'], buggy: 1,
      why: '조건문 끝에는 콜론(:)이 있어야 해요. <code>if age >= 18:</code>이 맞아요.' },
    { lines: ['score = 85', 'if score = 90:', '    print("최고")', 'else:', '    print("보통")'], buggy: 1,
      why: '비교할 때는 <code>==</code>를 써야 해요. <code>=</code>는 값을 대입할 때 쓰는 기호예요.' },
    { lines: ['fruits = ["사과", "바나나"]', 'print(fruits[0])', 'print(fruits[2])', 'print(len(fruits))'], buggy: 2,
      why: '리스트에 값이 2개(순번 0, 1)뿐인데 <code>fruits[2]</code>는 범위를 벗어나서 오류가 나요.' },
  ],
  javascript: [
    { lines: ['let age = 20;', 'if (age = 18) {', '  console.log("성인");', '}'], buggy: 1,
      why: '비교할 때는 <code>===</code>를 써야 해요. <code>=</code>는 대입 기호예요.' },
    { lines: ['const fruits = ["사과", "바나나", "포도"];', 'for (let i = 0; i <= fruits.length; i++) {', '  console.log(fruits[i]);', '}'], buggy: 1,
      why: '<code>i &lt;= fruits.length</code>는 배열 범위를 하나 넘어가요. <code>i &lt; fruits.length</code>가 맞아요.' },
    { lines: ['function add(a, b) {', '  a + b;', '}', 'console.log(add(2, 3));'], buggy: 1,
      why: '<code>return</code>이 없어서 이 함수는 <code>undefined</code>를 돌려줘요. <code>return a + b;</code>가 맞아요.' },
  ],
  webpage: [
    { lines: ['<p>안녕하세요', '<p>반갑습니다</p>'], buggy: 0,
      why: '첫 번째 <code>&lt;p&gt;</code> 태그가 닫히지 않았어요. <code>&lt;/p&gt;</code>가 빠졌어요.' },
    { lines: ['.box {', '  colr: red;', '}'], buggy: 1,
      why: '<code>colr</code>은 오타예요. <code>color</code>가 맞아요.' },
    { lines: ['<a href="about.html>이동</a>'], buggy: 0,
      why: '<code>href</code> 속성값의 닫는 큰따옴표가 빠졌어요.' },
  ],
  java: [
    { lines: ['int score = 85;', 'if (score = 90) {', '    System.out.println("최고");', '}'], buggy: 1,
      why: '비교할 때는 <code>==</code>를 써야 해요. <code>=</code>는 대입이라서 컴파일 오류가 나요.' },
    { lines: ['char grade = "A";', 'System.out.println(grade);'], buggy: 0,
      why: '<code>char</code>는 작은따옴표를 써야 해요. <code>\'A\'</code>가 맞아요.' },
    { lines: ['int[] scores = {90, 85, 100};', 'System.out.println(scores[3]);'], buggy: 1,
      why: '배열 크기가 3(순번 0~2)인데 <code>scores[3]</code>은 범위를 벗어나요.' },
  ],
  c: [
    { lines: ['float height = 165.3f;', 'printf("%d", height);'], buggy: 1,
      why: '실수는 <code>%f</code>로 출력해야 해요. <code>%d</code>는 정수용이에요.' },
    { lines: ['int age = 17', 'printf("%d", age);'], buggy: 0,
      why: '문장 끝에 세미콜론(;)이 빠졌어요.' },
    { lines: ['int scores[3] = {90, 85, 100};', 'printf("%d", scores[3]);'], buggy: 1,
      why: '배열 크기가 3(순번 0~2)인데 <code>scores[3]</code>은 범위를 벗어나요.' },
  ],
  sql: [
    { lines: ['SELECT name age', 'FROM students;'], buggy: 0,
      why: '여러 열을 나열할 땐 쉼표(,)로 구분해야 해요. <code>name, age</code>가 맞아요.' },
    { lines: ['SELECT * FROM students', 'WHERE city = 서울;'], buggy: 1,
      why: '글자(문자열) 조건은 작은따옴표로 감싸야 해요. <code>\'서울\'</code>이 맞아요.' },
    { lines: ['SELECT city, COUNT(*)', 'FROM students', 'GROUP city;'], buggy: 2,
      why: '<code>GROUP BY city;</code>처럼 BY가 빠지면 안 돼요.' },
  ],
  unity: [
    { lines: ['void update()', '{', '    transform.position += Vector3.up;', '}'], buggy: 0,
      why: 'Unity의 생명주기 메서드는 대문자로 시작해요. <code>Update()</code>가 맞아요.' },
    { lines: ['void Start()', '{', '    Debug.log("시작!");', '}'], buggy: 2,
      why: '콘솔 출력 메서드는 <code>Debug.Log</code>예요(L이 대문자). <code>log</code>는 오타예요.' },
    { lines: ['void Update()', '{', '    if (Input.GetKeyDown(KeyCode.Space))', '        Debug.Log("점프!")', '}'], buggy: 3,
      why: 'C# 문장 끝에는 세미콜론(;)이 있어야 해요. <code>Debug.Log("점프!");</code>가 맞아요.' },
  ],
  go: [
    { lines: ['age := 17', 'fmt.Println("%d", age)'], buggy: 1,
      why: '<code>Println</code>은 서식 문자열을 해석하지 않아요. 그대로 <code>%d 17</code>이 출력돼요. 서식이 필요하면 <code>fmt.Printf("%d\\n", age)</code>를 써야 해요.' },
    { lines: ['var age int', 'age := 20', 'fmt.Println(age)'], buggy: 1,
      why: '이미 선언된 변수를 <code>:=</code>로 다시 선언하면 오류가 나요("no new variables"). <code>age = 20</code>처럼 그냥 대입해야 해요.' },
    { lines: ['func main() {', '    name := "지수"', '}'], buggy: 1,
      why: '선언만 하고 쓰지 않은 변수가 있으면 Go는 컴파일 오류를 내요("declared and not used"). name을 어딘가에서 사용해야 해요.' },
  ],
  php: [
    { lines: ['name = "지수";', 'echo $name;'], buggy: 0,
      why: 'PHP 변수는 항상 <code>$</code>로 시작해야 해요. <code>$name = "지수";</code>가 맞아요.' },
    { lines: ['$age = 17', 'echo $age;'], buggy: 0,
      why: '문장 끝에 세미콜론(;)이 빠졌어요. <code>$age = 17;</code>이 맞아요.' },
    { lines: ['$name = "지수";', 'echo "안녕하세요, " + $name;'], buggy: 1,
      why: 'PHP에서 문자열을 이어붙일 때는 <code>+</code>가 아니라 마침표(<code>.</code>)를 써야 해요. <code>"안녕하세요, " . $name</code>이 맞아요.' },
  ],
};
const BUG_ROUNDS = 6;

function renderBugGame(lang) {
  clearMinigameTimers();
  const bank = BUG_SNIPPETS[lang] || BUG_SNIPPETS.javascript;
  minigame = {
    lang, kind: 'bug', score: 0, round: 0, timers: [], answered: false,
    order: Array.from({ length: BUG_ROUNDS }, () => randInt(0, bank.length - 1)),
  };
  nextBugRound();
}
function nextBugRound() {
  clearMinigameTimers();
  const m = minigame;
  if (m.round >= BUG_ROUNDS) { endBugGame(); return; }
  const bank = BUG_SNIPPETS[m.lang] || BUG_SNIPPETS.javascript;
  m.snippet = bank[m.order[m.round]];
  m.answered = false;
  m.timeLeft = 12;
  renderBugRound();
  m.timers.push(setInterval(() => {
    m.timeLeft--;
    const t = el('bugTimeLeft');
    if (t) t.textContent = m.timeLeft;
    if (m.timeLeft <= 0) revealBugAnswer(null);
  }, 1000));
}
function renderBugRound() {
  const m = minigame;
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">미니게임 · 버그 찾기</div>
      <h1>${COURSES[m.lang].name}</h1>
      <p>코드를 한 줄씩 읽고, 오류(버그)가 있는 줄을 클릭하세요.</p>
    </div>
    <section class="block card">
      <div class="body">
        <div class="game-hud">
          <span class="stat"><b>${m.round + 1}</b>/${BUG_ROUNDS}문제</span>
          <span class="stat"><b>${m.score}</b>점</span>
          <span class="stat"><b id="bugTimeLeft">${m.timeLeft}</b>초 남음</span>
        </div>
        <div class="bug-lines" id="bugLines">
          ${m.snippet.lines.map((line, i) => `
            <button type="button" class="bug-line" data-line="${i}">
              <span class="bug-line-no">${i + 1}</span><code>${esc(line)}</code>
            </button>`).join('')}
        </div>
        <div class="verdict" id="bugVerdict" hidden></div>
      </div>
      <div class="quiz-foot">
        <button class="btn ghost" type="button" id="bugNext" hidden>다음 문제</button>
        <button class="text-btn" type="button" id="exitMinigame" style="margin-left:auto">나가기</button>
      </div>
    </section>`;
}
function revealBugAnswer(clickedIdx) {
  const m = minigame;
  if (m.answered) return;
  m.answered = true;
  clearMinigameTimers();
  const ok = clickedIdx === m.snippet.buggy;
  if (ok) m.score++;
  document.querySelectorAll('.bug-line').forEach((btn, i) => {
    btn.disabled = true;
    if (i === m.snippet.buggy) btn.classList.add('correct');
    else if (i === clickedIdx) btn.classList.add('wrong');
  });
  const verdict = el('bugVerdict');
  verdict.hidden = false;
  verdict.className = 'verdict ' + (ok ? 'ok' : 'no');
  verdict.innerHTML = m.snippet.why;
  el('bugNext').hidden = false;
}
function endBugGame() {
  const m = minigame;
  clearMinigameTimers();
  const msg = m.score >= 5 ? '완벽해요! 버그를 아주 잘 찾아내네요.' : m.score >= 3 ? '잘했어요!' : '다음엔 더 잘할 수 있어요!';
  el('main').innerHTML = `
    <div class="hero"><div class="eyebrow">미니게임 · 버그 찾기</div><h1>결과</h1></div>
    <section class="block card">
      <div class="body" style="text-align:center; padding:40px 20px">
        <p class="home-stat" style="font-size:20px">${m.score} / ${BUG_ROUNDS}문제</p>
        <p class="muted">${msg}</p>
        <div style="display:flex; gap:10px; justify-content:center; margin-top:16px">
          <button class="btn" type="button" id="bugRetry">다시 하기</button>
          <button class="btn ghost" type="button" id="exitMinigame">나가기</button>
        </div>
      </div>
    </section>`;
}

/* ---------- 후보: 타자 게임 (코드 타이핑) ---------- */
const TYPING_SNIPPETS = {
  python: ['print("Hello, World!")', 'for i in range(5):', 'if age >= 18:', 'return a + b', 'x = int(input())'],
  javascript: ['console.log("Hello!");', 'const x = 10;', 'if (age >= 18) {', 'return a + b;', 'let name = "지수";'],
  webpage: ['<h1>Hello, World!</h1>', 'color: royalblue;', '<p>안녕하세요</p>', 'display: flex;', 'border-radius: 8px;'],
  java: ['System.out.println("Hi");', 'int age = 17;', 'if (age >= 18) {', 'return a + b;', 'String name = "지수";'],
  c: ['printf("Hello\\n");', 'int age = 17;', 'if (age >= 18) {', 'return a + b;', 'float pi = 3.14;'],
  sql: ['SELECT * FROM students;', 'WHERE age >= 18;', 'ORDER BY age DESC;', 'GROUP BY city;', 'SELECT name FROM students;'],
  kotlin: ['println("Hello, World!")', 'val age = 17', 'if (age >= 18) {', 'for (i in 1..5) {', 'fun add(a: Int, b: Int) = a + b'],
  unity: ['Debug.Log("Hello!");', 'void Update()', 'transform.position += Vector3.up;', 'public float speed = 5.0f;', 'if (Input.GetKeyDown(KeyCode.Space))'],
  go: ['fmt.Println("Hello, World!")', 'age := 17', 'if age >= 18 {', 'for i := 0; i < 5; i++ {', 'func add(a int, b int) int {'],
  php: ['echo "Hello, World!";', '$age = 17;', 'if ($age >= 18) {', 'foreach ($items as $item) {', 'function add($a, $b) {'],
};

function renderTypingGame(lang) {
  clearMinigameTimers();
  const bank = TYPING_SNIPPETS[lang] || TYPING_SNIPPETS.javascript;
  const snippet = pick(bank);
  minigame = { lang, kind: 'typing', snippet, startedAt: null, timers: [] };
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">미니게임 · 타자 게임</div>
      <h1>${COURSES[lang].name}</h1>
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

/* ---------- 후보: 코드 순서 맞추기 ---------- */
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
  typescript: [
    ['function add(a: number, b: number): number {', '  return a + b;', '}'],
    ['interface Student {', '  name: string;', '  age: number;', '}'],
  ],
  go: [
    ['age := 17', 'if age >= 18 {', '    fmt.Println("성인")', '} else {', '    fmt.Println("미성년자")', '}'],
    ['total := 0', 'for i := 0; i < 5; i++ {', '    total += i', '}', 'fmt.Println(total)'],
  ],
  php: [
    ['$age = 17;', 'if ($age >= 18) {', '    echo "성인";', '} else {', '    echo "미성년자";', '}'],
    ['$total = 0;', 'for ($i = 0; $i < 5; $i++) {', '    $total += $i;', '}'],
  ],
};

function renderReorderGame(lang) {
  clearMinigameTimers();
  const bank = REORDER_SNIPPETS[lang] || REORDER_SNIPPETS.javascript;
  const correctLines = pick(bank);
  minigame = { lang, kind: 'reorder', correctLines, answer: [], pool: shuffle(correctLines), startedAt: Date.now(), timers: [] };
  renderReorderUI();
}
function renderReorderUI() {
  const m = minigame;
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">미니게임 · 코드 순서 맞추기</div>
      <h1>${COURSES[m.lang].name}</h1>
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

/* ---------- 후보: 짝 맞추기 (키워드 ↔ 뜻 카드 뒤집기) ---------- */
const MATCH_PAIRS = {
  python: [
    { term: 'def', def: '함수를 만드는 키워드' },
    { term: 'print', def: '화면에 출력하는 함수' },
    { term: 'len()', def: '길이(개수)를 구하는 함수' },
    { term: 'if', def: '조건에 따라 분기하는 키워드' },
    { term: 'for', def: '정해진 횟수만큼 반복하는 키워드' },
    { term: 'True', def: '참을 나타내는 값' },
  ],
  javascript: [
    { term: 'let', def: '나중에 바뀔 수 있는 변수를 만드는 키워드' },
    { term: 'const', def: '절대 바뀌지 않는 값을 만드는 키워드' },
    { term: 'console.log', def: '화면에 출력하는 함수' },
    { term: 'function', def: '함수를 만드는 키워드' },
    { term: '===', def: '종류까지 비교하는 연산자' },
    { term: 'push', def: '배열 맨 뒤에 값을 추가하는 메서드' },
  ],
  webpage: [
    { term: '<h1>', def: '가장 큰 제목을 만드는 태그' },
    { term: '<a>', def: '다른 페이지로 이동하는 링크 태그' },
    { term: 'color', def: '글자 색을 바꾸는 CSS 속성' },
    { term: 'padding', def: '내용과 테두리 사이 안쪽 여백' },
    { term: 'display: flex', def: '요소를 가로로 나란히 배치하는 값' },
    { term: '<ul>', def: '순서 없는 목록을 만드는 태그' },
  ],
  java: [
    { term: 'int', def: '정수를 담는 자료형' },
    { term: 'String', def: '문자열을 담는 자료형' },
    { term: 'static', def: 'main에서 바로 부를 수 있게 하는 키워드' },
    { term: 'System.out.println', def: '화면에 출력하는 코드' },
    { term: 'equals()', def: '문자열을 비교할 때 쓰는 메서드' },
    { term: 'length', def: '배열의 길이를 알려주는 값' },
  ],
  c: [
    { term: 'printf', def: '화면에 출력하는 함수' },
    { term: '%d', def: '정수를 출력하는 서식 지정자' },
    { term: '%f', def: '실수를 출력하는 서식 지정자' },
    { term: 'sizeof', def: '자료형의 크기를 알려주는 연산자' },
    { term: 'scanf', def: '값을 입력받는 함수' },
    { term: 'return 0', def: '프로그램이 정상 종료했다는 뜻' },
  ],
  sql: [
    { term: 'SELECT', def: '원하는 열을 조회하는 키워드' },
    { term: 'WHERE', def: '조건에 맞는 행만 거르는 키워드' },
    { term: 'ORDER BY', def: '결과를 정렬하는 키워드' },
    { term: 'GROUP BY', def: '같은 값끼리 묶는 키워드' },
    { term: 'COUNT(*)', def: '행의 개수를 세는 함수' },
    { term: 'JOIN', def: '두 표를 연결하는 키워드' },
  ],
  kotlin: [
    { term: 'val', def: '다시 바꿀 수 없는 값을 만드는 키워드' },
    { term: 'var', def: '나중에 바뀔 수 있는 값을 만드는 키워드' },
    { term: 'fun', def: '함수를 만드는 키워드' },
    { term: 'when', def: '여러 경우를 깔끔하게 나누는 조건문' },
    { term: 'data class', def: '값 비교 기능을 자동으로 만들어주는 클래스' },
    { term: '1..5', def: '1부터 5까지(양 끝 포함)를 나타내는 범위' },
  ],
  go: [
    { term: 'func', def: '함수를 만드는 키워드' },
    { term: ':=', def: '타입을 안 적고 새 변수를 선언하는 기호' },
    { term: 'fmt.Println', def: '화면에 값을 출력하고 줄바꿈하는 함수' },
    { term: 'slice', def: '크기가 자유롭게 늘어나는 배열 같은 자료형' },
    { term: 'goroutine', def: 'go 키워드로 시작하는 가벼운 동시 실행 단위' },
    { term: 'nil', def: '값이 없음을 나타내는 특별한 값' },
  ],
  php: [
    { term: 'echo', def: '화면에 값을 출력하는 명령' },
    { term: '$변수', def: '변수 이름 앞에 항상 붙이는 기호' },
    { term: '.', def: '문자열을 이어붙일 때 쓰는 연산자' },
    { term: 'foreach', def: '배열의 각 값을 순회하는 반복문' },
    { term: '===', def: '값과 타입까지 함께 비교하는 연산자' },
    { term: 'array()', def: '배열을 만드는 방법 중 하나' },
  ],
};

function renderMatchGame(lang) {
  clearMinigameTimers();
  const pairs = MATCH_PAIRS[lang] || MATCH_PAIRS.python;
  const cards = shuffle(pairs.flatMap((p, i) => [
    { key: i, text: p.term },
    { key: i, text: p.def },
  ]));
  minigame = { lang, kind: 'match', cards, flipped: [], matched: new Set(), moves: 0, timers: [], startedAt: Date.now() };
  renderMatchUI();
}
function renderMatchUI() {
  const m = minigame;
  const done = m.matched.size === m.cards.length;
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">미니게임 · 짝 맞추기</div>
      <h1>${COURSES[m.lang].name}</h1>
      <p>키워드와 뜻이 적힌 카드를 뒤집어서 짝을 맞춰보세요.</p>
    </div>
    <section class="block card">
      <div class="body">
        <div class="game-hud">
          <span class="stat"><b>${m.matched.size / 2}</b>/${m.cards.length / 2}쌍</span>
          <span class="stat"><b>${m.moves}</b>번 시도</span>
        </div>
        <div class="match-grid" id="matchGrid">
          ${m.cards.map((c, i) => {
            const isMatched = m.matched.has(i);
            const isFlipped = m.flipped.includes(i);
            const show = isMatched || isFlipped;
            return `<button type="button" class="match-card ${isMatched ? 'matched' : ''} ${isFlipped ? 'flipped' : ''}" data-card="${i}" ${isMatched ? 'disabled' : ''}>${show ? esc(c.text) : '?'}</button>`;
          }).join('')}
        </div>
      </div>
      <div class="quiz-foot">
        <button class="text-btn" type="button" id="exitMinigame" style="margin-left:auto">나가기</button>
      </div>
    </section>`;
  if (done) m.timers.push(setTimeout(endMatchGame, 500));
}
function flipMatchCard(idx) {
  const m = minigame;
  if (m.matched.has(idx) || m.flipped.includes(idx) || m.flipped.length >= 2) return;
  m.flipped.push(idx);
  if (m.flipped.length < 2) { renderMatchUI(); return; }
  m.moves++;
  renderMatchUI();
  const [a, b] = m.flipped;
  if (m.cards[a].key === m.cards[b].key) {
    m.matched.add(a); m.matched.add(b);
    m.flipped = [];
    renderMatchUI();
  } else {
    m.timers.push(setTimeout(() => { m.flipped = []; renderMatchUI(); }, 700));
  }
}
function endMatchGame() {
  const m = minigame;
  const seconds = ((Date.now() - m.startedAt) / 1000).toFixed(1);
  el('main').innerHTML = `
    <div class="hero"><div class="eyebrow">미니게임 · 짝 맞추기</div><h1>결과</h1></div>
    <section class="block card">
      <div class="body" style="text-align:center;padding:40px 20px">
        <h2 style="margin-top:0">모두 맞췄어요!</h2>
        <p class="home-stat" style="font-size:20px">${m.moves}번 시도 · ${seconds}초</p>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:16px">
          <button class="btn" type="button" id="matchRetry">다시 하기</button>
          <button class="btn ghost" type="button" id="exitMinigame">나가기</button>
        </div>
      </div>
    </section>`;
}

/* ---------- 후보: 출력 맞히기 스피드런 (단원 문제 은행에서 객관식만 골라 빠르게) ---------- */
function pickChoiceQuestion(lang) {
  const units = COURSES[lang].units.filter(u => u.ready);
  for (let tries = 0; tries < 30; tries++) {
    const u = pick(units);
    const q = pick(u.quizGenerators)();
    if (q.type === 'choice') return q;
  }
  return { type: 'choice', q: '2 + 2는?', opts: ['3', '4', '5'], answer: 1, why: '2 + 2 = 4예요.' };
}
const SPEED_ROUNDS = 8;

function renderSpeedGame(lang) {
  clearMinigameTimers();
  minigame = { lang, kind: 'speed', score: 0, round: 0, timers: [], answered: false };
  nextSpeedRound();
}
function nextSpeedRound() {
  clearMinigameTimers();
  const m = minigame;
  if (m.round >= SPEED_ROUNDS) { endSpeedGame(); return; }
  m.question = pickChoiceQuestion(m.lang);
  m.answered = false;
  m.timeLeft = 8;
  renderSpeedRound();
  m.timers.push(setInterval(() => {
    m.timeLeft--;
    const t = el('speedTimeLeft');
    if (t) t.textContent = m.timeLeft;
    if (m.timeLeft <= 0) answerSpeed(-1);
  }, 1000));
}
function renderSpeedRound() {
  const m = minigame;
  const q = m.question;
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">미니게임 · 출력 맞히기 스피드런</div>
      <h1>${COURSES[m.lang].name}</h1>
      <p>코드를 보고 결과를 최대한 빠르게 맞혀보세요!</p>
    </div>
    <section class="block card">
      <div class="body">
        <div class="game-hud">
          <span class="stat"><b>${m.round + 1}</b>/${SPEED_ROUNDS}문제</span>
          <span class="stat"><b>${m.score}</b>점</span>
          <span class="stat"><b id="speedTimeLeft">${m.timeLeft}</b>초</span>
        </div>
        <div class="q-text" style="font-weight:600;margin-bottom:14px">${q.q}</div>
        <div class="speed-opts" id="speedOpts">
          ${q.opts.map((o, i) => `<button type="button" class="speed-opt" data-speed-opt="${i}">${o}</button>`).join('')}
        </div>
        <div class="verdict" id="speedVerdict" hidden></div>
      </div>
      <div class="quiz-foot">
        <button class="btn ghost" type="button" id="speedNext" hidden>다음 문제</button>
        <button class="text-btn" type="button" id="exitMinigame" style="margin-left:auto">나가기</button>
      </div>
    </section>`;
}
function answerSpeed(idx) {
  const m = minigame;
  if (m.answered) return;
  m.answered = true;
  clearMinigameTimers();
  const ok = idx === m.question.answer;
  if (ok) m.score++;
  document.querySelectorAll('.speed-opt').forEach((btn, i) => {
    btn.disabled = true;
    if (i === m.question.answer) btn.classList.add('correct');
    else if (i === idx) btn.classList.add('wrong');
  });
  const verdict = el('speedVerdict');
  verdict.hidden = false;
  verdict.className = 'verdict ' + (ok ? 'ok' : 'no');
  verdict.innerHTML = m.question.why;
  el('speedNext').hidden = false;
}
function endSpeedGame() {
  const m = minigame;
  clearMinigameTimers();
  const msg = m.score >= 7 ? '완벽에 가까워요!' : m.score >= 4 ? '잘했어요!' : '다음엔 더 잘할 수 있어요!';
  el('main').innerHTML = `
    <div class="hero"><div class="eyebrow">미니게임 · 출력 맞히기 스피드런</div><h1>결과</h1></div>
    <section class="block card">
      <div class="body" style="text-align:center;padding:40px 20px">
        <p class="home-stat" style="font-size:20px">${m.score} / ${SPEED_ROUNDS}문제</p>
        <p class="muted">${msg}</p>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:16px">
          <button class="btn" type="button" id="speedRetry">다시 하기</button>
          <button class="btn ghost" type="button" id="exitMinigame">나가기</button>
        </div>
      </div>
    </section>`;
}

/* ---------- 후보: 키워드 골라내기 (진짜 키워드만 찾아 클릭) ---------- */
const KEYWORD_BANK = {
  python: ['def', 'print', 'if', 'for', 'while', 'True', 'False', 'import', 'return', 'len', 'range', 'elif'],
  javascript: ['let', 'const', 'function', 'console', 'if', 'for', 'true', 'false', 'return', 'typeof', 'push', 'class'],
  webpage: ['h1', 'div', 'class', 'href', 'color', 'padding', 'flex', 'ul', 'li', 'span', 'img', 'margin'],
  java: ['public', 'static', 'void', 'int', 'String', 'class', 'if', 'for', 'true', 'false', 'return', 'new'],
  c: ['printf', 'scanf', 'int', 'float', 'char', 'if', 'for', 'sizeof', 'return', 'void', 'struct', 'include'],
  sql: ['SELECT', 'FROM', 'WHERE', 'ORDER', 'GROUP', 'JOIN', 'COUNT', 'AVG', 'SUM', 'INSERT', 'UPDATE', 'DELETE'],
  typescript: ['interface', 'type', 'string', 'number', 'boolean', 'let', 'const', 'function', 'readonly', 'enum', 'as', 'keyof'],
  kotlin: ['val', 'var', 'fun', 'when', 'data', 'class', 'Int', 'String', 'Boolean', 'override', 'companion', 'null'],
  go: ['func', 'package', 'import', 'var', 'if', 'for', 'range', 'return', 'struct', 'interface', 'defer', 'go'],
  php: ['echo', 'function', 'if', 'foreach', 'for', 'while', 'true', 'false', 'null', 'class', 'return', 'array'],
};
function pickKeywordDistractors(lang, count) {
  const validSet = new Set((KEYWORD_BANK[lang] || []).map(w => w.toLowerCase()));
  const pool = [];
  for (const key in KEYWORD_BANK) {
    if (key === lang) continue;
    KEYWORD_BANK[key].forEach(w => {
      if (!validSet.has(w.toLowerCase()) && !pool.includes(w)) pool.push(w);
    });
  }
  return shuffle(pool).slice(0, count);
}
function renderKeywordGame(lang) {
  clearMinigameTimers();
  const valid = shuffle(KEYWORD_BANK[lang] || KEYWORD_BANK.python).slice(0, 6);
  const distractors = pickKeywordDistractors(lang, 6);
  const tiles = shuffle([
    ...valid.map(w => ({ word: w, ok: true, picked: false })),
    ...distractors.map(w => ({ word: w, ok: false, picked: false })),
  ]);
  minigame = { lang, kind: 'keywords', tiles, found: 0, mistakes: 0, total: valid.length, timeLeft: 20, timers: [] };
  renderKeywordUI();
  minigame.timers.push(setInterval(() => {
    minigame.timeLeft--;
    const t = el('keywordTimeLeft');
    if (t) t.textContent = minigame.timeLeft;
    if (minigame.timeLeft <= 0) endKeywordGame();
  }, 1000));
}
function renderKeywordUI() {
  const m = minigame;
  el('main').innerHTML = `
    <div class="hero">
      <div class="eyebrow">미니게임 · 키워드 골라내기</div>
      <h1>${COURSES[m.lang].name}</h1>
      <p>${COURSES[m.lang].name}에서 실제로 쓰는 키워드만 모두 찾아 클릭하세요.</p>
    </div>
    <section class="block card">
      <div class="body">
        <div class="game-hud">
          <span class="stat"><b>${m.found}</b>/${m.total}개 찾음</span>
          <span class="stat"><b id="keywordTimeLeft">${m.timeLeft}</b>초 남음</span>
        </div>
        <div class="keyword-grid" id="keywordGrid">
          ${m.tiles.map((t, i) => `<button type="button" class="keyword-tile ${t.picked ? (t.ok ? 'correct' : 'wrong') : ''}" data-tile="${i}" ${t.picked ? 'disabled' : ''}>${esc(t.word)}</button>`).join('')}
        </div>
      </div>
      <div class="quiz-foot">
        <button class="text-btn" type="button" id="exitMinigame" style="margin-left:auto">나가기</button>
      </div>
    </section>`;
}
function pickKeywordTile(idx) {
  const m = minigame;
  const tile = m.tiles[idx];
  if (tile.picked) return;
  tile.picked = true;
  if (tile.ok) m.found++; else m.mistakes++;
  renderKeywordUI();
  if (m.found >= m.total) endKeywordGame();
}
function endKeywordGame() {
  clearMinigameTimers();
  const m = minigame;
  const complete = m.found >= m.total;
  const msg = complete && m.mistakes === 0 ? '완벽해요! 실수 없이 다 찾았어요.' : complete ? '다 찾았어요!' : '시간 종료!';
  el('main').innerHTML = `
    <div class="hero"><div class="eyebrow">미니게임 · 키워드 골라내기</div><h1>결과</h1></div>
    <section class="block card">
      <div class="body" style="text-align:center;padding:40px 20px">
        <p class="home-stat" style="font-size:20px">${m.found} / ${m.total}개 · 실수 ${m.mistakes}번</p>
        <p class="muted">${msg}</p>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:16px">
          <button class="btn" type="button" id="keywordRetry">다시 하기</button>
          <button class="btn ghost" type="button" id="exitMinigame">나가기</button>
        </div>
      </div>
    </section>`;
}

/* ---------- 미니게임 전용 클릭 처리 ---------- */
document.addEventListener('click', e => {
  const playBtn = e.target.closest('[data-play-lang]');
  if (playBtn) { startMinigame(playBtn.dataset.playLang, playBtn.dataset.playTier); return; }

  if (e.target.id === 'exitMinigame') { exitMinigame(); return; }
  if (!minigame) return;

  const bugLine = e.target.closest('.bug-line');
  if (bugLine && !bugLine.disabled) { revealBugAnswer(Number(bugLine.dataset.line)); return; }
  if (e.target.id === 'bugNext') { minigame.round++; nextBugRound(); return; }
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

  const card = e.target.closest('[data-card]');
  if (card && !card.disabled) { flipMatchCard(Number(card.dataset.card)); return; }
  if (e.target.id === 'matchRetry') { renderMatchGame(minigame.lang); return; }

  const speedOpt = e.target.closest('[data-speed-opt]');
  if (speedOpt && !speedOpt.disabled) { answerSpeed(Number(speedOpt.dataset.speedOpt)); return; }
  if (e.target.id === 'speedNext') { minigame.round++; nextSpeedRound(); return; }
  if (e.target.id === 'speedRetry') { renderSpeedGame(minigame.lang); return; }

  const tile = e.target.closest('[data-tile]');
  if (tile && !tile.disabled) { pickKeywordTile(Number(tile.dataset.tile)); return; }
  if (e.target.id === 'keywordRetry') { renderKeywordGame(minigame.lang); return; }
});
