/* =========================================================================
   0) 아주 작은 도우미 함수들
   ========================================================================= */
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = arr => arr[randInt(0, arr.length - 1)];
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
/* 두 문자열을 글자 단위로 비교해서 어디가 다른지 찾아줌(최장 공통 부분수열 기반).
   결과는 {type: 'same'|'del'|'add', value} 배열이에요.
   'same'은 둘 다에 있는 부분, 'del'은 a에만(빠져야 할 부분), 'add'는 b에만(더해야 할 부분) 있는 부분이에요. */
function diffChars(a, b) {
  const n = a.length, m = b.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const raw = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) { raw.push({ type: 'same', value: a[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { raw.push({ type: 'del', value: a[i] }); i++; }
    else { raw.push({ type: 'add', value: b[j] }); j++; }
  }
  while (i < n) { raw.push({ type: 'del', value: a[i] }); i++; }
  while (j < m) { raw.push({ type: 'add', value: b[j] }); j++; }
  /* 같은 타입이 연달아 나오면 하나로 뭉쳐서, 화면에 표시할 조각 수를 줄여요 */
  const grouped = [];
  for (const d of raw) {
    const last = grouped[grouped.length - 1];
    if (last && last.type === d.type) last.value += d.value;
    else grouped.push({ type: d.type, value: d.value });
  }
  return grouped;
}

/* 객관식 문제 하나를 만들어 줌: 정답과 오답들을 무작위 순서로 섞음 */
function makeChoice(q, correct, distractors, why, hint) {
  const opts = shuffle([correct, ...distractors]);
  return { type: 'choice', q, opts, answer: opts.indexOf(correct), why, hint };
}

/* "오늘의 문제"처럼 모두에게 똑같은 결과가 나와야 할 때 쓰는 시드 기반 난수 생성기.
   같은 seed를 넣으면 항상 똑같은 순서의 "무작위" 값이 나와요(mulberry32 알고리즘). */
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/* 문자열을 하나의 정수 시드값으로 바꿔줌(날짜 문자열을 난수 시드로 쓰기 위해) */
function hashStringToSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return h;
}
/* 오늘 날짜를 "YYYY-MM-DD" 형태로(기기의 로컬 시간 기준) */
function todayDateString() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

/* 한 언어 안에서 준비된(ready) 단원들을 순서대로 3등분해 초급/중급/고급을 매김.
   앞쪽 그룹부터 나머지를 하나씩 더 받아서, 단원 수가 3의 배수가 아니어도
   세 티어 모두 최소 1개 이상의 단원을 갖도록 나눠요. */
const TIER_LABEL = { beginner: '초급', intermediate: '중급', advanced: '고급' };
const TIER_ORDER = ['beginner', 'intermediate', 'advanced'];
function tierOfIndex(index, totalReady) {
  const base = Math.floor(totalReady / 3);
  const remainder = totalReady % 3;
  const size0 = base + (remainder > 0 ? 1 : 0);
  const size1 = base + (remainder > 1 ? 1 : 0);
  if (index < size0) return TIER_ORDER[0];
  if (index < size0 + size1) return TIER_ORDER[1];
  return TIER_ORDER[2];
}

const STREAK_GOAL = 10; // 이만큼 연속 정답을 맞히면 그 단원이 "완료"로 표시됨

/* 곳곳에 무작위로 보여줄 짧은 팁 모음 */
const TIPS = [
  '막히면 힌트 버튼을 먼저 눌러보세요. 정답을 바로 알려주지 않고 방향만 살짝 알려줘요.',
  '한 단원에서 연속 10문제를 맞히면 그 단원이 완료로 표시돼요. 틀리면 그 자리에서 다시 풀어야 해요.',
  '단원을 완료하면 그 단원의 개념을 모아 묻는 "최종 도전" 문제가 열려요.',
  '한 티어(초급·중급·고급)의 단원을 모두 완료하면, 그 티어 전체를 총정리하는 도전 과제가 열려요.',
  '오답이어도 괜찮아요 — 단원 학습에서는 맞을 때까지 같은 문제를 다시 풀고, 복습·오답노트에서는 설명만 읽고 바로 다음 문제로 넘어가도 돼요.',
  '복습 모드에서는 여러 언어의 문제가 섞여서 나와요. 배운 걸 뒤섞어 풀면 기억에 더 오래 남아요.',
  '치트시트의 코드 예제는 "복사" 버튼으로 붙여넣을 수 있어요. 단원 학습의 예제는 직접 타이핑 연습을 위해 복사가 안 돼요.',
  '자바스크립트는 브라우저 콘솔(F12)에 코드를 바로 붙여넣어 실행할 수 있어요.',
  '변수 이름은 그 값이 무엇인지 알 수 있게 짓는 습관을 들이면 나중에 코드를 다시 볼 때 편해요.',
  '같은 실수를 반복하고 있다면, 조급해하지 말고 강의 부분을 한 번 더 읽어보세요.',
  '진도는 로그인한 계정별로 따로 저장돼요. 같은 기기를 여러 명이 쓴다면 각자 로그인해보세요.',
  '자료형 오류는 프로그래밍에서 아주 흔해요. 오류 메시지를 끝까지 읽는 것도 실력이에요.',
  '한 번에 다 외우려 하지 마세요. 눈으로 읽기보다 직접 타이핑해보는 게 훨씬 오래 남아요.',
  'HTML/CSS는 눈에 보이는 결과가 바로 나오니, 값을 이것저것 바꿔보면서 실험해보는 게 최고예요.',
  '"최종 도전"과 "복습"은 몇 번을 틀려도 괜찮아요. 틀린 만큼 기억에 남습니다.',
];

/* 언어별 강의·문제 데이터가 담길 자리. js/data/*.js 파일들이 COURSES.python = {...} 형태로 채웁니다. */
const COURSES = {};

/* =========================================================================
   1) 강의 + 문제 데이터
   ---------------------------------------------------------------------
   언어를 추가하려면: COURSES에 키를 하나 더 만들고 units 배열을 채우면 됩니다.
   문제를 늘리려면: 각 단원의 quizGenerators 배열에 함수를 추가하세요.
   함수는 호출될 때마다 무작위 값으로 새 문제 객체를 만들어 돌려줘야 합니다.
   ========================================================================= */

