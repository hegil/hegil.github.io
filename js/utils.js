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
/* 객관식 문제 하나를 만들어 줌: 정답과 오답들을 무작위 순서로 섞음 */
function makeChoice(q, correct, distractors, why, hint) {
  const opts = shuffle([correct, ...distractors]);
  return { type: 'choice', q, opts, answer: opts.indexOf(correct), why, hint };
}

/* 한 언어 안에서 준비된(ready) 단원들을 순서대로 3등분해 초급/중급/고급을 매김 */
const TIER_LABEL = { beginner: '초급', intermediate: '중급', advanced: '고급' };
const TIER_ORDER = ['beginner', 'intermediate', 'advanced'];
function tierOfIndex(index, totalReady) {
  const groupSize = Math.ceil(totalReady / 3);
  const g = Math.min(2, Math.floor(index / groupSize));
  return TIER_ORDER[g];
}

const STREAK_GOAL = 5; // 이만큼 연속 정답을 맞히면 그 단원이 "완료"로 표시됨

/* 곳곳에 무작위로 보여줄 짧은 팁 모음 */
const TIPS = [
  '막히면 힌트 버튼을 먼저 눌러보세요. 정답을 바로 알려주지 않고 방향만 살짝 알려줘요.',
  '한 단원에서 연속 5문제를 맞히면 그 단원이 완료로 표시돼요.',
  '단원을 완료하면 그 단원의 개념을 모아 묻는 "최종 도전" 문제가 열려요.',
  '한 티어(초급·중급·고급)의 단원을 모두 완료하면, 그 티어 전체를 총정리하는 도전 과제가 열려요.',
  '오답이어도 괜찮아요 — 설명을 읽고 바로 다음 문제로 넘어가면 돼요.',
  '복습 모드에서는 여러 언어의 문제가 섞여서 나와요. 배운 걸 뒤섞어 풀면 기억에 더 오래 남아요.',
  '코드 예제 위의 "복사" 버튼을 누르면 다른 곳에 붙여넣어 직접 실행해볼 수 있어요.',
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

const UPCOMING_CODE = [
  { id: 'oop', title: '클래스와 객체' },
  { id: 'error', title: '예외 처리' },
];
const UPCOMING_WEB = [
  { id: 'js-interactive', title: '자바스크립트로 페이지 움직이기' },
  { id: 'a11y',           title: '웹 접근성 기초' },
];
const UPCOMING_SQL = [
  { id: 'subquery', title: '서브쿼리와 고급 조회' },
];
