/* JavaScript 강의·문제 데이터 — 단원을 추가하려면 units 배열에 항목을 넣으면 됩니다. */
COURSES.javascript = {
    name: 'JavaScript',
    tagline: '브라우저에서 곧바로 실행되는, 웹을 움직이는 언어',
    units: [{
      id: 'vars',
      title: '변수와 자료형',
      ready: true,
      summary: '값을 담는 두 가지 방법(let, const)과 자바스크립트가 다루는 값의 종류를 배워요.',
      goals: ['let과 const', 'typeof', '템플릿 리터럴', '=== 비교', 'null / undefined'],
      blocks: [
        {
          h: '값을 담는 두 가지 상자: let과 const',
          html: `<p><code>let</code>은 나중에 내용물을 바꿀 수 있는 물통이고, <code>const</code>는 한 번 굳으면 다시 바꿀 수 없는 액자라고 생각하면 쉬워요.</p>
                 <p>값이 바뀔 일이 없다면 일단 <code>const</code>로 만들고, 나중에 값을 바꿔야 할 때만 <code>let</code>으로 바꾸는 습관이 좋아요. 옛날 방식인 <code>var</code>는 요즘은 잘 쓰지 않아요.</p>`,
          code: {
            label: 'variables.js',
            src: `let score = 90;        // 나중에 바뀔 수 있는 값
const name = "지수";    // 절대 바뀌지 않을 값

score = 95;            // 괜찮아요
// name = "민준";      // 오류! const는 다시 못 바꿔요

console.log(name, score);
console.log(typeof score);`,
            out: `지수 95\nnumber`
          }
        },
        {
          h: '값의 종류(자료형)',
          html: `<table>
                   <tr><th>종류</th><th>예시</th><th>쉬운 설명</th></tr>
                   <tr><td><code>number</code></td><td><code>17</code>, <code>3.14</code></td><td>숫자. 정수든 소수든 구분 없이 다 number예요</td></tr>
                   <tr><td><code>string</code></td><td><code>"안녕"</code></td><td>따옴표로 감싼 글자</td></tr>
                   <tr><td><code>boolean</code></td><td><code>true</code></td><td>참(true) 또는 거짓(false), 모두 소문자</td></tr>
                   <tr><td><code>undefined</code></td><td><code>let x;</code></td><td>아직 아무 값도 안 넣은 상태</td></tr>
                   <tr><td><code>null</code></td><td><code>null</code></td><td>"일부러 비워뒀다"는 뜻으로 넣는 값</td></tr>
                 </table>
                 <p>값의 종류가 궁금할 땐 <code>typeof 값</code>이라고 써 보세요.</p>`
        },
        {
          h: '문장에 값 끼워 넣기, 그리고 === 로 비교하기',
          html: `<p>문장 중간에 변수 값을 넣고 싶으면, 따옴표 대신 <b>백틱</b>(<code>` + "`" + `</code>, 키보드 숫자 1 옆에 있어요)으로 감싸고 <code>${'${...}'}</code> 안에 변수를 씁니다.</p>
                 <p>두 값이 같은지 비교할 때는 <b>항상 <code>===</code></b>를 쓰세요. <code>==</code>는 종류가 달라도 억지로 맞춰서 비교하기 때문에 헷갈리는 결과가 나올 수 있어요.</p>`,
          code: {
            label: 'compare.js',
            src: `const age = 17;
console.log(\`내년엔 \${age + 1}살\`);

console.log(1 == "1");   // 종류를 억지로 맞춰서 비교 → true
console.log(1 === "1");  // 종류까지 정확히 비교 → false`,
            out: `내년엔 18살\ntrue\nfalse`
          },
          after: `<div class="note"><b>팁</b> — 브라우저에서 <kbd>F12</kbd>를 눌러 콘솔을 열면 이 코드를 직접 붙여넣어 실행해 볼 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const changes = Math.random() < 0.5;
          const name = pick(['점수', '나이', '이름', '가격']);
          return makeChoice(
            `"${name}"은(는) 앞으로 ${changes ? '값이 바뀔 수도 있는' : '절대 바뀌지 않을'} 값이에요. 어떤 키워드로 선언해야 할까요?`,
            changes ? '<code>let</code>' : '<code>const</code>',
            changes ? ['<code>const</code>', '<code>var</code>'] : ['<code>let</code>', '<code>var</code>'],
            changes ? '값이 바뀔 수 있으니 <code>let</code>을 써요.' : '값이 바뀌지 않으니 <code>const</code>를 써요.',
            '값을 나중에 다시 바꿀 일이 있는지 없는지를 먼저 생각해보세요.'
          );
        },
        () => {
          const items = [
            { val: String(randInt(1, 999)), type: 'number' },
            { val: `${randInt(1, 99)}.${randInt(1, 9)}`, type: 'number' },
            { val: `"${pick(['hi', '바나나', '고양이'])}"`, type: 'string' },
            { val: pick(['true', 'false']), type: 'boolean' },
          ];
          const it = pick(items);
          const others = ['number', 'string', 'boolean'].filter(t => t !== it.type);
          return makeChoice(
            `<code>typeof ${it.val}</code>의 결과로 알맞은 것은?`,
            `<code>"${it.type}"</code>`,
            others.map(t => `<code>"${t}"</code>`),
            `자바스크립트는 정수·소수를 구분하지 않고 모두 <code>number</code>, 글자는 <code>string</code>, 참/거짓은 <code>boolean</code>이에요.`,
            '숫자인지, 따옴표로 감싼 글자인지, true/false인지를 살펴보세요.'
          );
        },
        () => {
          const n = randInt(1, 20);
          const strict = Math.random() < 0.5;
          const op = strict ? '===' : '==';
          const result = strict ? false : true;
          return makeChoice(
            `<code>console.log(${n} ${op} "${n}")</code>의 출력은?`,
            `<code>${result}</code>`, [`<code>${!result}</code>`],
            strict
              ? '<code>===</code>는 종류까지 비교하므로 숫자와 글자는 다르다고 보고 false예요.'
              : '<code>==</code>는 종류를 맞춰서 비교하므로 값만 같으면 true예요.',
            '===는 종류까지 비교하고, ==는 종류를 무시하고 값만 비교해요.'
          );
        },
        () => {
          const name = pick(['name', 'city', 'pet', 'food']);
          const ko = { name: '이름', city: '사는 곳', pet: '반려동물', food: '좋아하는 음식' }[name];
          return {
            type: 'blank',
            q: `변수 <code>${name}</code>(${ko})의 값을 문장 안에 끼워 넣도록 빈칸을 채우세요.`,
            prefix: 'console.log(`나의 ' + ko + ': ', suffix: '`)', accept: [`\${${name}}`], placeholder: '${...}',
            why: `백틱 문자열 안에서는 <code>\${${name}}</code>처럼 <code>$&#123;&#125;</code>로 변수를 감싸요.`,
            hint: '백틱 문자열 안에서는 달러 기호와 중괄호로 변수를 감싸요.'
          };
        },
        () => ({
          type: 'blank',
          q: `절대 바뀌지 않는 값 <code>PI</code>를 선언하려고 해요. 빈칸에 알맞은 키워드를 쓰세요.`,
          prefix: '', suffix: ' PI = 3.14;', accept: ['const'], placeholder: '키워드',
          why: '다시 대입하지 않을 값은 <code>const</code>로 선언해요.',
          hint: '"상수(constant)"의 줄임말이에요.'
        }),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '<code>console.log</code>를 이용해 <code>Hello, World!</code>를 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'console.log("Hello, World!");',
          expectedOutput: 'Hello, World!',
          why: '<code>console.log("Hello, World!");</code>처럼 쓰면 돼요. 작은따옴표를 써도 괜찮아요.',
          hint: 'console.log(...) 괄호 안에 큰따옴표나 작은따옴표로 감싼 문장을 넣어보세요.'
        }),
      ],
      boss: () => {
        const name = pick(['age', 'score', 'count']);
        const ko = { age: '나이', score: '점수', count: '개수' }[name];
        const val = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>let ${name} = ${val};</code>로 선언한 뒤 <code>console.log(\`${ko}: \${${name} + 1}\`);</code>을 실행하면 무엇이 출력될까요? 따옴표 없이 입력하세요.`,
          prefix: '', suffix: '', accept: [`${ko}: ${val + 1}`], placeholder: '출력될 문장',
          why: `템플릿 리터럴 안의 <code>\${${name} + 1}</code>은 먼저 계산(${val} + 1 = ${val + 1})된 뒤 문자열에 합쳐져요.`,
          hint: '백틱 문자열의 ${ } 안에서는 계산식도 계산까지 끝난 값이 들어가요.'
        };
      }
    },
    {
      id: 'flow',
      title: '조건문과 분기',
      ready: true,
      summary: '조건에 따라 다른 코드를 실행하는 if문을 배워요.',
      goals: ['if / else if / else', '비교 연산자', '&& / ||'],
      blocks: [
        {
          h: '"만약 ~라면" — if문',
          html: `<p>조건이 <code>true</code>면 중괄호 <code>{ }</code> 안의 코드가 실행되고, <code>false</code>면 건너뛰어요. 여러 조건은 <code>else if</code>로 이어 붙이고, 마지막엔 <code>else</code>를 씁니다.</p>`,
          code: {
            label: 'flow.js',
            src: `const age = 17;

if (age >= 20) {
  console.log("성인이에요");
} else if (age >= 13) {
  console.log("청소년이에요");
} else {
  console.log("어린이예요");
}`,
            out: `청소년이에요`
          }
        },
        {
          h: '비교 연산자와 && / ||',
          html: `<table>
                   <tr><th>연산자</th><th>뜻</th></tr>
                   <tr><td><code>===</code></td><td>같다(종류까지 비교)</td></tr>
                   <tr><td><code>!==</code></td><td>다르다</td></tr>
                   <tr><td><code>&gt;</code>, <code>&lt;</code></td><td>크다, 작다</td></tr>
                 </table>
                 <p>조건 두 개를 <b>둘 다</b> 만족해야 하면 <code>&&</code>, <b>하나만</b> 만족해도 되면 <code>||</code>를 써요.</p>`,
          code: {
            label: 'and_or.js',
            src: `const age = 17;
const hasTicket = true;

if (age >= 14 && hasTicket) {
  console.log("입장 가능");
}`,
            out: `입장 가능`
          }
        },
        {
          h: '중괄호와 소괄호',
          html: `<p>조건은 소괄호 <code>( )</code> 안에, 실행할 코드는 중괄호 <code>{ }</code> 안에 씁니다. 파이썬과 달리 들여쓰기가 문법에 영향을 주진 않지만, 읽기 쉽게 맞춰 쓰는 게 좋아요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const age = randInt(1, 25);
          const label = age >= 20 ? '성인이에요' : age >= 13 ? '청소년이에요' : '어린이예요';
          return {
            type: 'blank',
            q: `나이가 <code>${age}</code>일 때, 20 이상이면 "성인이에요", 13 이상이면 "청소년이에요", 그 미만이면 "어린이예요"를 출력하는 코드가 있어요. 무엇이 출력될까요? 따옴표 없이 쓰세요.`,
            prefix: '', suffix: '', accept: [label], placeholder: '출력될 문장',
            why: `${age}는 ${age >= 20 ? '20 이상이라 "성인이에요"' : age >= 13 ? '13 이상 20 미만이라 "청소년이에요"' : '13 미만이라 "어린이예요"'}가 출력돼요.`,
            hint: '나이를 20, 13 두 기준과 순서대로 비교해보세요.'
          };
        },
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          const op = pick(['===', '!==', '>', '<']);
          const result = op === '===' ? a === b : op === '!==' ? a !== b : op === '>' ? a > b : a < b;
          return makeChoice(
            `<code>console.log(${a} ${op} ${b})</code>의 출력은?`,
            `<code>${result}</code>`, [`<code>${!result}</code>`],
            `${a} ${op} ${b}는 ${result}예요.`,
            '두 수를 비교 연산자에 맞게 true/false로 판단해보세요.'
          );
        },
        () => {
          const p1 = Math.random() < 0.5, p2 = Math.random() < 0.5;
          const useAnd = Math.random() < 0.5;
          const result = useAnd ? (p1 && p2) : (p1 || p2);
          return makeChoice(
            `<code>console.log(${p1} ${useAnd ? '&&' : '||'} ${p2})</code>의 출력은?`,
            `<code>${result}</code>`, [`<code>${!result}</code>`],
            useAnd ? '<code>&&</code>는 둘 다 true여야 true예요.' : '<code>||</code>는 하나만 true여도 true예요.',
            '&&는 둘 다 true여야, ||는 하나만 true여도 결과가 true예요.'
          );
        },
        () => ({
          type: 'blank',
          q: `조건을 감싸는 문장 부호를 빈칸에 채우세요.`,
          prefix: 'if ', suffix: 'age >= 20) { ... }', accept: ['('], placeholder: '문장 부호',
          why: '자바스크립트에서 조건은 소괄호 <code>( )</code> 안에 써요.',
          hint: '함수를 호출할 때 쓰는 것과 같은 괄호예요.'
        }),
        () => makeChoice(
          '여러 조건 중 앞의 조건이 모두 거짓일 때 마지막으로 실행되는 부분은?',
          '<code>else</code>', ['<code>else if</code>', '<code>if</code>', '<code>&&</code>'],
          '<code>else</code>는 앞의 모든 조건이 거짓일 때 실행돼요.',
          '앞의 모든 조건이 거짓일 때 마지막에 실행되는 부분을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '<code>age</code>라는 변수에 20을 저장하고, age가 18 이상이면 <code>"성인"</code>을, 아니면 <code>"미성년자"</code>를 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'const age = 20;\nif (age >= 18) {\n  console.log("성인");\n} else {\n  console.log("미성년자");\n}',
          expectedOutput: '성인',
          why: 'age가 20이라서 18 이상 조건이 참이 되어 "성인"이 출력돼요.',
          hint: 'let이나 const로 age를 만들고, if/else로 나눠서 각각 console.log 하세요.'
        }),
      ],
      boss: () => {
        const age = randInt(1, 25);
        const hasTicket = Math.random() < 0.5;
        const ok = age >= 14 && hasTicket;
        const label = ok ? '입장 가능' : '입장 불가';
        return {
          type: 'blank',
          q: `<code>age = ${age}</code>, <code>hasTicket = ${hasTicket}</code>일 때, "나이가 14 이상이고 티켓이 있으면 입장 가능, 아니면 입장 불가"를 출력하는 코드의 결과는? 따옴표 없이 입력하세요.`,
          prefix: '', suffix: '', accept: [label], placeholder: '출력될 문장',
          why: `나이는 ${age >= 14 ? '14 이상' : '14 미만'}이고 티켓은 ${hasTicket ? '있어요' : '없어요'}. 둘 다 true여야 하는 && 조건이 ${ok ? 'true라 "입장 가능"' : 'false라 "입장 불가"'}가 출력돼요.`,
          hint: '&&는 두 조건이 모두 true여야 true예요. 나이 조건과 티켓 조건을 각각 확인해보세요.'
        };
      }
    },
    {
      id: 'loop',
      title: '반복문',
      ready: true,
      summary: '같은 코드를 여러 번 반복시키는 for문과 while문을 배워요.',
      goals: ['for문', 'while문', 'break / continue'],
      blocks: [
        {
          h: '정해진 횟수만큼 반복: for',
          html: `<p><code>for (시작; 조건; 변화) { ... }</code> 형태로 씁니다. "0에서 시작해서, 5보다 작은 동안, 한 번씩 늘리며" 반복하라는 뜻이에요.</p>`,
          code: {
            label: 'for.js',
            src: `for (let i = 0; i < 5; i++) {
  console.log(\`\${i}번째 인사\`);
}`,
            out: `0번째 인사\n1번째 인사\n2번째 인사\n3번째 인사\n4번째 인사`
          }
        },
        {
          h: '조건이 참인 동안 반복: while',
          html: `<p>몇 번 반복할지 미리 모를 땐 <code>while (조건) { ... }</code>을 써요. 조건이 거짓이 되면 멈춰요.</p>`,
          code: {
            label: 'while.js',
            src: `let count = 3;
while (count > 0) {
  console.log(count);
  count = count - 1;
}
console.log("발사!");`,
            out: `3\n2\n1\n발사!`
          }
        },
        {
          h: 'break와 continue',
          html: `<p><code>break</code>는 반복문을 완전히 멈추고, <code>continue</code>는 이번만 건너뛰고 다음 반복으로 넘어가요.</p>`,
          after: `<div class="note"><b>주의</b> — <code>i++</code>처럼 변화를 주는 부분을 빠뜨리면 조건이 계속 참이라 <b>무한 반복</b>에 빠질 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 8);
          return {
            type: 'blank',
            q: `<code>for (let i = 0; i < ${n}; i++) { console.log("hi"); }</code>는 총 몇 번 반복될까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `i는 0부터 ${n - 1}까지 ${n}번 조건을 만족해서 ${n}번 반복해요.`,
            hint: 'i가 0부터 시작해서 조건을 만족하는 동안 몇 번 반복되는지 세어보세요.'
          };
        },
        () => {
          const n = randInt(3, 6);
          let sum = 0;
          for (let i = 0; i < n; i++) sum += i;
          return {
            type: 'blank',
            q: `<code>let total = 0;</code>에서 시작해 <code>for (let i = 0; i < ${n}; i++) { total += i; }</code>를 실행했어요. 실행 후 <code>total</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
            why: `0부터 ${n - 1}까지 다 더하면 ${sum}이에요.`,
            hint: '0부터 하나씩 늘려가며 다 더해보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `for문의 세 부분(시작; 조건; 변화)을 구분하는 문장 부호를 쓰세요.`,
          prefix: 'for (let i = 0', suffix: ' i < 5; i++)', accept: [';'], placeholder: '문장 부호',
          why: 'for문은 <code>시작; 조건; 변화</code>를 세미콜론(;)으로 구분해요.',
          hint: '문장을 끝맺을 때 쓰는 그 문장 부호예요.'
        }),
        () => makeChoice(
          '반복문을 도중에 완전히 끝내고 싶을 때 쓰는 키워드는?',
          '<code>break</code>', ['<code>continue</code>', '<code>return</code>', '<code>end</code>'],
          '<code>break</code>는 반복문을 그 자리에서 완전히 끝내요.',
          '"부수다, 끊다"라는 뜻의 영어 단어예요.'
        ),
        () => makeChoice(
          '이번 반복만 건너뛰고 싶을 때 쓰는 키워드는?',
          '<code>continue</code>', ['<code>break</code>', '<code>skip</code>', '<code>pass</code>'],
          '<code>continue</code>는 이번만 건너뛰고 다음 반복을 계속해요.',
          '"계속하다"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: 'for문을 이용해 1부터 5까지 숫자를 각각 한 줄씩 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}',
          expectedOutput: '1\n2\n3\n4\n5',
          why: 'i를 1부터 시작해서 5보다 작거나 같은 동안 반복하면서 하나씩 출력하면 돼요.',
          hint: 'for (let i = 1; i <= 5; i++) { console.log(i); } 형태를 떠올려보세요.'
        }),
      ],
      boss: () => {
        const n = randInt(4, 8);
        let total = 0;
        for (let i = 0; i < n; i++) if (i % 2 === 0) total += i;
        return {
          type: 'blank',
          q: `<code>let total = 0;</code>에서 시작해서, <code>0</code>부터 <code>${n - 1}</code>까지 숫자 중 짝수(2로 나눈 나머지가 0)만 골라 <code>total</code>에 더하는 코드가 있어요. 실행 후 <code>total</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
          why: `0부터 ${n - 1}까지 중 짝수만 더하면 ${total}이에요.`,
          hint: 'i % 2 === 0으로 짝수인지 확인한 다음, 그 값만 골라 더해보세요.'
        };
      }
    },
    {
      id: 'func',
      title: '함수',
      ready: true,
      summary: '반복해서 쓰는 코드에 이름을 붙여서, 필요할 때마다 불러 쓰는 방법을 배워요.',
      goals: ['function으로 함수 만들기', '매개변수와 반환값', '화살표 함수'],
      blocks: [
        {
          h: '함수는 "자판기"예요',
          html: `<p>값을 넣으면(매개변수) 계산해서 결과를 돌려주는(<code>return</code>) 코드 덩어리가 함수예요. <code>function</code>으로 만들어요.</p>`,
          code: {
            label: 'func.js',
            src: `function add(a, b) {
  return a + b;
}

const result = add(3, 4);
console.log(result);`,
            out: `7`
          }
        },
        {
          h: '더 짧게 쓰는 화살표 함수',
          html: `<p>같은 함수를 화살표(<code>=&gt;</code>)를 써서 더 짧게 쓸 수도 있어요. 요즘 자바스크립트에서 아주 많이 씁니다.</p>`,
          code: {
            label: 'arrow.js',
            src: `const add = (a, b) => {
  return a + b;
};

console.log(add(3, 4));`,
            out: `7`
          }
        },
        {
          h: 'return이 없는 함수',
          html: `<p><code>return</code>이 없는 함수는 <code>undefined</code>를 돌려줘요. <code>console.log()</code>는 화면에 "보여주기"만 할 뿐, 값을 "돌려주지"는 않는다는 걸 기억하세요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>function add(a, b) { return a + b; }</code> 함수에 <code>add(${a}, ${b})</code>라고 호출하면 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `${a} + ${b} = ${a + b}가 반환돼요.`,
            hint: '매개변수 a, b 자리에 순서대로 값이 들어간다고 생각하고 계산해보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `함수를 만들 때 맨 앞에 쓰는 키워드는?`,
          prefix: '', suffix: ' add(a, b) { return a + b; }', accept: ['function'], placeholder: '키워드',
          why: '자바스크립트 함수는 <code>function</code>으로 시작해요.',
          hint: '"함수"를 뜻하는 영어 단어 그대로예요.'
        }),
        () => ({
          type: 'blank',
          q: `함수의 결과값을 돌려주는 키워드는?`,
          prefix: 'function add(a, b) { ', suffix: ' a + b; }', accept: ['return'], placeholder: '키워드',
          why: '<code>return</code>은 함수 밖으로 값을 돌려줘요.',
          hint: '"돌려주다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'blank',
          q: `화살표 함수를 만들 때 매개변수 뒤에 쓰는 기호를 완성하세요. (2글자)`,
          prefix: 'const add = (a, b) ', suffix: ' { return a + b; };', accept: ['=>'], placeholder: '기호',
          why: '화살표 함수는 <code>(매개변수) =&gt; { ... }</code> 형태로 써요.',
          hint: '등호와 부등호를 붙여 화살표 모양을 만들어요.'
        }),
        () => makeChoice(
          '<code>return</code>이 없는 함수를 호출한 결과를 변수에 저장하면?',
          '<code>undefined</code>가 저장된다', ['오류가 난다', '0이 저장된다', '빈 문자열이 저장된다'],
          '<code>return</code>이 없으면 함수는 자동으로 <code>undefined</code>를 돌려줘요.',
          '"아직 정해지지 않음"을 뜻하는 자바스크립트의 특별한 값을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '두 수를 더해서 반환하는 함수 <code>add</code>를 만들고, <code>add(2, 3)</code>의 결과를 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'function add(a, b) {\n  return a + b;\n}\nconsole.log(add(2, 3));',
          expectedOutput: '5',
          why: 'add(2, 3)은 2 + 3을 계산해서 5를 돌려주고, 그 값을 출력하면 5가 나와요.',
          hint: 'function add(a, b) { return a + b; }로 함수를 만들고, console.log(add(2, 3))으로 호출·출력하세요.'
        }),
      ],
      boss: () => {
        const base = randInt(1, 20);
        const bonusUsed = Math.random() < 0.5;
        const bonus = randInt(1, 10);
        const result = bonusUsed ? base + bonus : base + 5;
        return {
          type: 'blank',
          q: `<code>function addBonus(score, bonus = 5) { return score + bonus; }</code> 함수가 있을 때, <code>addBonus(${base}${bonusUsed ? `, ${bonus}` : ''})</code>라고 호출하면 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
          why: bonusUsed
            ? `bonus에 ${bonus}를 직접 넘겼으니 ${base} + ${bonus} = ${result}이에요.`
            : `bonus를 안 넘겼으니 기본값 5가 쓰여서 ${base} + 5 = ${result}이에요.`,
          hint: '매개변수에 = 5처럼 기본값이 있으면, 값을 안 넘겼을 때만 그 기본값이 쓰여요.'
        };
      }
    },
    {
      id: 'coll',
      title: '배열과 객체',
      ready: true,
      summary: '값을 여러 개 담는 배열과, 이름표로 값을 담는 객체를 배워요.',
      goals: ['배열 만들기', '인덱싱', 'push로 추가', '객체 기초'],
      blocks: [
        {
          h: '여러 값을 순서대로 담는 상자: 배열',
          html: `<p>대괄호 <code>[ ]</code>로 여러 값을 한 번에 담을 수 있어요. 값을 꺼낼 땐 순번(인덱스)을 쓰는데, <b>0부터</b> 세요.</p>`,
          code: {
            label: 'array.js',
            src: `const fruits = ["사과", "바나나", "포도"];

console.log(fruits[0]);       // 사과
console.log(fruits[2]);       // 포도
console.log(fruits.length);   // 3`,
            out: `사과\n포도\n3`
          }
        },
        {
          h: '배열에 값 추가하기: push',
          html: `<p>배열 뒤에 새 값을 붙이려면 <code>.push(값)</code>을 써요.</p>`,
          code: {
            label: 'push.js',
            src: `const fruits = ["사과", "바나나"];
fruits.push("딸기");
console.log(fruits);`,
            out: `[ '사과', '바나나', '딸기' ]`
          }
        },
        {
          h: '이름표로 꺼내는 상자: 객체',
          html: `<p>배열이 순번으로 꺼낸다면, <b>객체</b>는 "이름표(속성)"로 값을 꺼내요. <code>{ 이름: 값 }</code> 형태로 만듭니다.</p>`,
          code: {
            label: 'object.js',
            src: `const student = { name: "지수", age: 17 };
console.log(student.name);`,
            out: `지수`
          },
          after: `<div class="note"><b>비유</b> — 배열은 "몇 번째 서랍", 객체는 "이름이 붙은 서랍"이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const items = shuffle(['사과', '바나나', '포도', '딸기', '수박']).slice(0, 4);
          const idx = randInt(0, items.length - 1);
          return {
            type: 'blank',
            q: `<code>const fruits = [${items.map(v => `"${v}"`).join(', ')}];</code>일 때, <code>fruits[${idx}]</code>의 값은? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [items[idx]], placeholder: '값',
            why: `순번은 0부터 세니까 <code>[${idx}]</code>는 ${idx + 1}번째 값인 "${items[idx]}"예요.`,
            hint: '순번은 0부터 시작해요. 앞에서부터 하나씩 세어보세요.'
          };
        },
        () => {
          const n = randInt(2, 5);
          return {
            type: 'blank',
            q: `배열에 값이 ${n}개 들어있을 때, <code>fruits.length</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `<code>.length</code>는 배열에 들어있는 값의 개수를 알려줘요. 지금은 ${n}개예요.`,
            hint: '.length는 그냥 배열 안에 값이 몇 개 있는지 세어줘요.'
          };
        },
        () => ({
          type: 'blank',
          q: `배열 <code>fruits</code>의 맨 뒤에 <code>"딸기"</code>를 추가하는 코드를 완성하세요.`,
          prefix: 'fruits.', suffix: '("딸기");', accept: ['push'], placeholder: '메서드 이름',
          why: '<code>.push(값)</code>은 배열 맨 뒤에 새 값을 붙여줘요.',
          hint: '"밀어 넣다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '자바스크립트에서 배열의 첫 번째 값을 가리키는 순번은?',
          '<code>0</code>', ['<code>1</code>', '<code>-1</code>', '<code>첫번째</code>'],
          '배열의 순번은 0부터 시작해서 첫 번째 값은 <code>[0]</code>이에요.',
          '자바스크립트도 파이썬처럼 이 숫자부터 순번을 세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>const student = { name: "지수", age: 17 };</code>일 때, 이름을 꺼내는 코드를 완성하세요.`,
          prefix: 'student', suffix: 'name', accept: ['.'], placeholder: '기호',
          why: '객체는 <code>student.name</code>처럼 점(.)을 찍어서 값을 꺼내요.',
          hint: '객체는 대괄호가 아니라 점(.)으로 속성에 접근해요.'
        }),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '배열 <code>[10, 20, 30]</code>의 모든 값을 더한 합을 <code>console.log</code>로 출력하는 코드를 작성하세요. (반복문이나 reduce 등 자유롭게 사용하세요)',
          starter: '',
          rows: 4,
          placeholder: 'const nums = [10, 20, 30];\nlet total = 0;\nfor (const n of nums) {\n  total += n;\n}\nconsole.log(total);',
          expectedOutput: '60',
          why: '10 + 20 + 30 = 60이에요. 반복문으로 하나씩 더하거나, reduce를 써도 똑같은 결과가 나와요.',
          hint: '배열을 만들고 반복문(또는 reduce)으로 값을 다 더한 뒤 출력하세요.'
        }),
      ],
      boss: () => {
        const items = shuffle(['사과', '바나나', '포도', '딸기', '수박', '망고']).slice(0, randInt(2, 4));
        const newItem = pick(['키위', '자두', '체리'].filter(x => !items.includes(x)));
        return {
          type: 'blank',
          q: `<code>const fruits = [${items.map(v => `"${v}"`).join(', ')}];</code>에서 <code>fruits.push("${newItem}")</code>을 실행한 뒤, <code>fruits[fruits.length - 1]</code>의 값은 무엇일까요? (따옴표 없이)`,
          prefix: '', suffix: '', accept: [newItem], placeholder: '값',
          why: `push로 추가한 값은 항상 배열 맨 뒤에 붙어요. <code>fruits.length - 1</code>은 "마지막 순번"이라서 방금 추가한 "${newItem}"이 나와요.`,
          hint: 'push로 추가한 값은 배열 맨 마지막에 들어가고, length - 1은 "마지막 순번"을 가리켜요.'
        };
      }
    },
    {
      id: 'oop',
      title: '클래스와 객체',
      ready: true,
      summary: '비슷한 객체를 여러 개 찍어내는 설계도, class를 배워요.',
      goals: ['class와 constructor', 'this', 'new로 객체 만들기', '메서드'],
      blocks: [
        {
          h: '객체를 찍어내는 설계도: class',
          html: `<p><code>class</code>는 비슷한 모양의 객체를 여러 개 만들기 위한 "설계도"예요. <code>constructor</code>는 <code>new</code>로 객체를 만들 때 자동으로 실행되면서 초기값을 정해줘요.</p>`,
          code: {
            label: 'class.js',
            src: `class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }
  add(point) {
    this.score += point;
  }
}

const p = new Player("지수");
p.add(10);
console.log(p.name, p.score);`,
            out: `지수 10`
          }
        },
        {
          h: 'this는 "지금 이 객체"를 가리켜요',
          html: `<p>클래스 안에서 <code>this</code>는 <code>new</code>로 방금 만든 그 객체 자신을 가리켜요. <code>this.name</code>은 "이 객체의 name 속성"이라는 뜻이에요.</p>`,
          code: {
            label: 'this.js',
            src: `class Counter {
  constructor() {
    this.count = 0;
  }
  increase() {
    this.count = this.count + 1;
  }
}

const c = new Counter();
c.increase();
c.increase();
console.log(c.count);`,
            out: `2`
          }
        },
        {
          h: '메서드 — 객체 안에 들어있는 함수',
          html: `<p>클래스 안에 정의한 함수를 <b>메서드</b>라고 불러요. <code>객체.메서드()</code> 형태로 호출하면, 그 메서드 안에서 <code>this</code>는 항상 호출한 객체를 가리켜요.</p>`,
          after: `<div class="note"><b>비유</b> — class는 붕어빵 틀, <code>new</code>로 만든 객체 하나하나는 붕어빵이에요. 틀은 하나지만 붕어빵은 여러 개 만들 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연', '하늘']);
          return {
            type: 'blank',
            q: `<code>class Player { constructor(name) { this.name = name; } }</code>일 때, <code>const p = new Player("${name}");</code> 후 <code>console.log(p.name);</code>을 실행하면? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [name], placeholder: '값',
            why: `<code>new Player("${name}")</code>이 실행되면 constructor의 <code>this.name = name</code>에 의해 <code>p.name</code>은 "${name}"이 돼요.`,
            hint: 'new로 객체를 만들면 constructor가 자동으로 실행되면서 매개변수 값을 this에 저장해요.'
          };
        },
        () => makeChoice(
          'class로 객체를 만들 때 새 객체를 실제로 만들어내는(생성하는) 키워드는?',
          '<code>new</code>', ['<code>class</code>', '<code>this</code>', '<code>make</code>'],
          '<code>new 클래스이름(...)</code>이 실제로 객체를 만들어요.',
          '"새로운"이라는 뜻의 영어 단어예요.'
        ),
        () => makeChoice(
          'class 안에서 "지금 이 객체"를 가리키는 키워드는?',
          '<code>this</code>', ['<code>new</code>', '<code>self</code>', '<code>me</code>'],
          '자바스크립트에서는 <code>self</code>가 아니라 <code>this</code>를 써요.',
          '파이썬의 self와 같은 역할을 하는 자바스크립트 키워드예요.'
        ),
        () => {
          const start = randInt(1, 5);
          const times = randInt(2, 4);
          return {
            type: 'blank',
            q: `<code>class Counter { constructor() { this.count = ${start}; } increase() { this.count = this.count + 1; } }</code>일 때, <code>increase()</code>를 ${times}번 호출하면 <code>count</code>는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(start + times)], placeholder: '숫자',
            why: `${start}에서 시작해서 increase()를 ${times}번 호출하면 ${times}만큼 늘어서 ${start + times}가 돼요.`,
            hint: '시작값에서 increase()를 호출한 횟수만큼 1씩 늘려보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `<code>new</code>로 객체를 만들 때 자동으로 실행되는, 초기값을 정하는 함수의 이름을 쓰세요.`,
          prefix: 'class Player { ', suffix: '(name) { this.name = name; } }', accept: ['constructor'], placeholder: '함수 이름',
          why: '<code>constructor</code>는 <code>new</code>로 객체를 만들 때 자동으로 호출돼요.',
          hint: '"만드는 사람, 생성자"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '<code>Dog</code>이라는 클래스를 만들어서 constructor에서 <code>this.name</code>을 저장하고, <code>bark()</code> 메서드는 <code>${this.name}: 멍멍!</code>을 출력하게 하세요. <code>new Dog("초코")</code>를 만들고 <code>bark()</code>를 호출하는 코드를 작성하세요.',
          starter: '',
          rows: 8,
          placeholder: 'class Dog {\n  constructor(name) {\n    this.name = name;\n  }\n  bark() {\n    console.log(`${this.name}: 멍멍!`);\n  }\n}\nconst d = new Dog("초코");\nd.bark();',
          expectedOutput: '초코: 멍멍!',
          why: 'constructor에서 name을 저장해두면, bark() 메서드 안의 this.name으로 그 값을 꺼내 쓸 수 있어요.',
          hint: 'class 안에 constructor(name)과 bark() 메서드를 각각 만들고, this.name으로 값을 이어주세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const bonus = randInt(1, 10);
        return {
          type: 'blank',
          q: `<code>class Player { constructor(name) { this.name = name; this.score = 0; } add(point) { this.score += point; } }</code>일 때, <code>const p = new Player("${name}");</code> 후 <code>p.add(${bonus});</code>를 실행하고 <code>console.log(p.score);</code>를 하면 무엇이 출력될까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(bonus)], placeholder: '숫자',
          why: `score는 0에서 시작해서, <code>add(${bonus})</code>로 ${bonus}만큼 늘었으니 결과는 ${bonus}예요.`,
          hint: 'constructor에서 score를 0으로 시작하고, add 메서드가 그 값을 늘려요.'
        };
      }
    },
    {
      id: 'error',
      title: '예외 처리',
      ready: true,
      summary: '오류가 나도 프로그램이 멈추지 않게 대비하는 try/catch를 배워요.',
      goals: ['try / catch', 'throw', 'finally', 'Error 객체'],
      blocks: [
        {
          h: '오류가 나도 안전하게: try / catch',
          html: `<p><code>try { ... }</code> 안의 코드에서 오류가 나면, 프로그램이 멈추는 대신 <code>catch (e) { ... }</code> 부분이 실행돼요. <code>e</code>에는 오류 정보가 담겨요.</p>`,
          code: {
            label: 'try_catch.js',
            src: `try {
  const result = 10 / 0;
  console.log(result);
  throw new Error("문제 발생!");
} catch (e) {
  console.log("오류 잡음:", e.message);
}`,
            out: `Infinity\n오류 잡음: 문제 발생!`
          }
        },
        {
          h: '일부러 오류 던지기: throw',
          html: `<p>내 코드 안에서 "이건 잘못됐다"고 판단되면 <code>throw new Error("설명")</code>으로 직접 오류를 만들어 던질 수 있어요. 던져진 오류는 가장 가까운 <code>catch</code>가 잡아요.</p>`,
          code: {
            label: 'throw.js',
            src: `function checkAge(age) {
  if (age < 0) {
    throw new Error("나이는 음수일 수 없어요");
  }
  return age;
}

try {
  checkAge(-5);
} catch (e) {
  console.log(e.message);
}`,
            out: `나이는 음수일 수 없어요`
          }
        },
        {
          h: '항상 실행되는 finally',
          html: `<p><code>finally { ... }</code>는 오류가 나든 안 나든 <b>항상</b> 마지막에 실행돼요. 파일 닫기, 정리 작업 등에 자주 씁니다.</p>`,
          after: `<div class="note"><b>주의</b> — <code>catch</code>로 오류를 잡지 않으면, 그 오류는 프로그램을 멈추게(콘솔에 빨간 오류로 표시) 만들어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '오류가 날 수도 있는 코드를 감싸서 프로그램이 멈추지 않게 하는 블록은?',
          '<code>try</code>', ['<code>catch</code>', '<code>throw</code>', '<code>finally</code>'],
          '<code>try { ... }</code> 안의 코드에서 오류가 나면 catch가 대신 처리해줘요.',
          '"시도하다"라는 뜻의 영어 단어예요.'
        ),
        () => makeChoice(
          'try 블록에서 오류가 발생했을 때 실행되는 블록은?',
          '<code>catch</code>', ['<code>try</code>', '<code>throw</code>', '<code>error</code>'],
          '<code>catch (e) { ... }</code>가 오류를 넘겨받아 처리해요.',
          '"붙잡다"라는 뜻의 영어 단어예요.'
        ),
        () => makeChoice(
          '내 코드에서 일부러 오류를 만들어 던지고 싶을 때 쓰는 키워드는?',
          '<code>throw</code>', ['<code>catch</code>', '<code>try</code>', '<code>new</code>'],
          '<code>throw new Error("설명")</code>으로 직접 오류를 던질 수 있어요.',
          '"던지다"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `오류가 나든 안 나든 항상 마지막에 실행되는 블록의 이름을 쓰세요.`,
          prefix: 'try { ... } catch (e) { ... } ', suffix: ' { console.log("정리"); }', accept: ['finally'], placeholder: '블록 이름',
          why: '<code>finally</code>는 오류 여부와 상관없이 항상 실행돼요.',
          hint: '"마침내, 결국"이라는 뜻의 영어 단어예요.'
        }),
        () => {
          const msg = pick(['잘못된 값이에요', '범위를 벗어났어요', '입력이 비어있어요']);
          return {
            type: 'blank',
            q: `<code>try { throw new Error("${msg}"); } catch (e) { console.log(e.message); }</code>를 실행하면 무엇이 출력될까요? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [msg], placeholder: '출력될 문장',
            why: `<code>e.message</code>는 <code>throw new Error(...)</code>에 넣은 문자열 그대로 담겨있어요.`,
            hint: 'catch (e)의 e.message에는 throw할 때 넣은 문자열이 그대로 들어있어요.'
          };
        },
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '나이를 받아 음수면 <code>new Error("나이는 음수일 수 없어요")</code>를 던지는 함수 <code>checkAge</code>를 만들고, <code>try/catch</code>로 <code>checkAge(-1)</code>을 호출해서 오류 메시지를 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 8,
          placeholder: 'function checkAge(age) {\n  if (age < 0) {\n    throw new Error("나이는 음수일 수 없어요");\n  }\n  return age;\n}\ntry {\n  checkAge(-1);\n} catch (e) {\n  console.log(e.message);\n}',
          expectedOutput: '나이는 음수일 수 없어요',
          why: 'checkAge(-1)은 나이가 음수라서 Error를 던지고, catch (e)가 그 오류를 잡아 e.message를 출력해요.',
          hint: 'if (age < 0) { throw new Error(...); }를 함수 안에 쓰고, try/catch로 감싸서 호출하세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 20);
        const zero = Math.random() < 0.5;
        const b = zero ? 0 : randInt(1, 10);
        const result = zero ? '나눌 수 없어요' : String(a / b);
        return {
          type: 'blank',
          q: `함수 <code>divide(a, b)</code>는 b가 0이면 <code>throw new Error("나눌 수 없어요")</code>를 던지고, 아니면 <code>a / b</code>를 반환해요. <code>try { console.log(divide(${a}, ${b})); } catch (e) { console.log(e.message); }</code>를 실행하면 무엇이 출력될까요? (따옴표 없이)`,
          prefix: '', suffix: '', accept: [result], placeholder: '출력될 값',
          why: zero
            ? `b가 0이라서 divide가 오류를 던지고, catch가 그 오류의 메시지 "나눌 수 없어요"를 출력해요.`
            : `b가 0이 아니라서 정상적으로 ${a} / ${b} = ${result}가 반환되고 그대로 출력돼요.`,
          hint: 'b가 0인지 아닌지에 따라 정상 결과가 나올지, catch로 잡힌 오류 메시지가 나올지 갈려요.'
        };
      }
    },
    {
      id: 'arrayMethods',
      title: '배열 고급 메서드',
      ready: true,
      summary: '반복문을 직접 쓰지 않고도 배열을 다루는, 훨씬 짧고 읽기 쉬운 방법을 배워요.',
      goals: ['map으로 변환하기', 'filter로 골라내기', 'reduce로 합치기'],
      blocks: [
        {
          h: '배열의 모든 값을 바꾸기: map',
          html: `<p><code>배열.map(값 => 새값)</code>은 배열의 <b>모든 값 하나하나에</b> 함수를 적용해서, 그 결과들로 이루어진 <b>새 배열</b>을 만들어줘요. for문으로 새 배열을 하나씩 채우는 것과 같은 결과지만 훨씬 짧아요.</p>`,
          code: {
            label: 'map.js',
            src: `const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
console.log(doubled);`,
            out: `[ 2, 4, 6 ]`
          }
        },
        {
          h: '조건에 맞는 것만 골라내기: filter',
          html: `<p><code>배열.filter(값 => 조건)</code>은 조건이 <code>true</code>인 값들만 골라서 새 배열로 만들어줘요. 조건에 맞지 않는 값은 결과에서 빠져요.</p>`,
          code: {
            label: 'filter.js',
            src: `const nums = [1, 2, 3, 4, 5, 6];
const evens = nums.filter(n => n % 2 === 0);
console.log(evens);`,
            out: `[ 2, 4, 6 ]`
          }
        },
        {
          h: '전부 합쳐서 값 하나로: reduce',
          html: `<p><code>배열.reduce((누적값, 현재값) => 새누적값, 시작값)</code>은 배열의 모든 값을 순서대로 하나씩 누적시켜서, 최종적으로 <b>값 하나</b>로 만들어줘요. 합계, 최댓값 등을 구할 때 자주 써요.</p>`,
          code: {
            label: 'reduce.js',
            src: `const nums = [1, 2, 3, 4];
const total = nums.reduce((acc, cur) => acc + cur, 0);
console.log(total);`,
            out: `10`
          },
          after: `<div class="note"><b>비교</b> — map은 "배열 → 배열"(개수 그대로, 값만 변환), filter는 "배열 → 더 짧은 배열"(값 그대로, 개수만 줄임), reduce는 "배열 → 값 하나"예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const nums = Array.from({ length: 4 }, () => randInt(1, 10));
          const doubled = nums.map(n => n * 2);
          return {
            type: 'blank',
            q: `<code>[${nums.join(', ')}].map(n => n * 2)</code>의 결과를 배열 형태로 쓰세요. (예: [2, 4, 6])`,
            prefix: '', suffix: '', accept: [`[${doubled.join(', ')}]`, `[${doubled.join(',')}]`], placeholder: '[값, 값, ...]',
            why: `map은 각 값에 함수를 적용한 새 배열을 만들어요. 각 값을 2배 하면 [${doubled.join(', ')}]이에요.`,
            hint: '배열 안의 값 하나하나를 2배로 바꿔서 순서대로 나열해보세요.'
          };
        },
        () => {
          const nums = Array.from({ length: 5 }, () => randInt(1, 20));
          const evens = nums.filter(n => n % 2 === 0);
          return {
            type: 'blank',
            q: `<code>[${nums.join(', ')}].filter(n => n % 2 === 0)</code>의 결과를 배열 형태로 쓰세요. (짝수가 없으면 [] 로 쓰세요)`,
            prefix: '', suffix: '', accept: [`[${evens.join(', ')}]`, `[${evens.join(',')}]`], placeholder: '[값, 값, ...]',
            why: `filter는 조건(짝수인지)이 true인 값만 남겨요. 짝수만 고르면 [${evens.join(', ')}]이에요.`,
            hint: '배열에서 2로 나눠 나머지가 0인 값들만 순서대로 골라보세요.'
          };
        },
        () => {
          const nums = Array.from({ length: 4 }, () => randInt(1, 10));
          const total = nums.reduce((a, b) => a + b, 0);
          return {
            type: 'blank',
            q: `<code>[${nums.join(', ')}].reduce((acc, cur) => acc + cur, 0)</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
            why: `reduce는 0부터 시작해서 배열의 모든 값을 순서대로 더해요. ${nums.join(' + ')} = ${total}이에요.`,
            hint: '시작값 0에서부터 배열의 모든 값을 하나씩 더해보세요.'
          };
        },
        () => makeChoice(
          '배열의 각 값에 함수를 적용해서, 같은 개수의 새 배열을 만드는 메서드는?',
          '<code>map</code>', ['<code>filter</code>', '<code>reduce</code>', '<code>forEach</code>'],
          '<code>map</code>은 배열의 개수는 그대로 두고, 값만 변환한 새 배열을 만들어요.',
          '"변환하다, 대응시키다"라는 뜻의 영어 단어예요.'
        ),
        () => makeChoice(
          '배열에서 조건에 맞는 값들만 골라 더 짧은(또는 같은) 새 배열을 만드는 메서드는?',
          '<code>filter</code>', ['<code>map</code>', '<code>reduce</code>', '<code>find</code>'],
          '<code>filter</code>는 조건이 true인 값만 남겨서 새 배열을 만들어요.',
          '"걸러내다"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '배열 <code>[1, 2, 3, 4, 5]</code>에서 짝수만 골라(<code>filter</code>) 각 값을 2배로 만든(<code>map</code>) 배열을 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'const nums = [1, 2, 3, 4, 5];\nconsole.log(nums.filter(n => n % 2 === 0).map(n => n * 2));',
          expectedOutput: '[ 4, 8 ]',
          why: 'filter로 짝수(2, 4)만 남긴 뒤, map으로 각 값을 2배(4, 8) 해서 출력해요.',
          hint: 'nums.filter(n => n % 2 === 0)로 짝수만 남기고, 그 결과에 .map(n => n * 2)를 이어 붙이세요.'
        }),
      ],
      boss: () => {
        const nums = Array.from({ length: 5 }, () => randInt(1, 10));
        const total = nums.filter(n => n % 2 === 0).reduce((a, b) => a + b, 0);
        return {
          type: 'blank',
          q: `<code>[${nums.join(', ')}].filter(n => n % 2 === 0).reduce((acc, cur) => acc + cur, 0)</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
          why: `먼저 filter로 짝수만 남기고([${nums.filter(n => n % 2 === 0).join(', ')}]), 그 값들을 reduce로 다 더하면 ${total}이에요.`,
          hint: 'filter로 짝수만 먼저 골라낸 다음, 그 결과를 reduce로 더해보세요.'
        };
      }
    },
    {
      id: 'async',
      title: '비동기 프로그래밍',
      ready: true,
      summary: '"지금 당장"이 아니라 "나중에" 실행되는 코드를 다루는 법을 배워요. 웹에서 서버와 통신할 때 꼭 필요해요.',
      goals: ['setTimeout', '실행 순서(동기 코드가 항상 먼저)', 'Promise와 then', 'async/await'],
      blocks: [
        {
          h: '나중에 실행하기: setTimeout',
          html: `<p><code>setTimeout(함수, 밀리초)</code>는 "지정한 시간(밀리초, 1000ms=1초)이 지난 뒤에 함수를 실행해줘"라는 뜻이에요. 그런데 그 시간 동안 프로그램이 멈춰서 기다리는 게 아니라, <b>그 사이에 다른 코드가 먼저 다 실행</b>돼요.</p>`,
          code: {
            label: 'timeout.js',
            src: `console.log("시작");
setTimeout(() => {
  console.log("2초 후 실행");
}, 2000);
console.log("끝");`,
            out: `시작\n끝\n2초 후 실행`
          }
        },
        {
          h: '동기 코드가 항상 먼저 끝나요',
          html: `<p>지금 바로 실행되는 코드를 <b>동기(synchronous)</b> 코드라고 해요. <code>setTimeout</code>처럼 "나중에" 실행되는 코드는 <b>비동기(asynchronous)</b> 코드라고 부르는데, 시간을 <code>0</code>으로 줘도 동기 코드가 전부 끝난 다음에야 실행돼요.</p>`
        },
        {
          h: '미래에 끝날 작업을 담은 상자: Promise',
          html: `<p><code>Promise</code>는 "지금은 아니지만 언젠가 끝날 작업"을 나타내는 객체예요. 작업이 끝나면 <code>.then(결과 => {...})</code> 안의 함수가 실행돼요. <code>async</code> 함수 안에서는 <code>await</code>를 붙여서, Promise가 끝날 때까지 "기다리는 것처럼" 코드를 순서대로 쓸 수 있어요.</p>`,
          code: {
            label: 'async_await.js',
            src: `function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log("시작");
  await delay(1000);
  console.log("1초 후");
}
run();`,
            out: `시작\n(1초 뒤) 1초 후`
          },
          after: `<div class="note"><b>비유</b> — 음식을 주문(Promise)하면 바로 나오지 않아요. 음식이 나올 때(then/await) 그다음 할 일을 하죠. 그동안 다른 손님(동기 코드)은 먼저 서빙받을 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const ms = pick([0, 100, 3000]);
          return {
            type: 'blank',
            q: `<code>console.log("A"); setTimeout(() => console.log("B"), ${ms}); console.log("C");</code>를 실행하면 어떤 순서로 출력될까요? (예: A, C, B)`,
            prefix: '', suffix: '', accept: ['A, C, B', 'A,C,B'], placeholder: 'A, B, C 순서',
            why: `setTimeout의 시간이 ${ms}ms여도, 동기 코드(A, C)가 항상 먼저 다 실행된 뒤에 B가 실행돼요.`,
            hint: 'setTimeout 안의 코드는 시간이 얼마든 상관없이, 동기 코드가 전부 끝난 뒤에 실행돼요.'
          };
        },
        () => makeChoice(
          '"지금 당장"이 아니라 "나중에" 실행되는 코드를 부르는 말은?',
          '비동기(asynchronous)', ['동기(synchronous)', '재귀(recursive)', '병렬(parallel)'],
          '나중에 실행되는 코드를 <b>비동기</b> 코드라고 불러요. setTimeout, Promise가 대표적이에요.',
          '"동시에 일어나지 않는다"는 뜻이 담긴 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `Promise가 성공적으로 끝났을 때 실행할 함수를 등록하는 메서드를 쓰세요.`,
          prefix: 'delay(1000).', suffix: '(() => { console.log("완료"); });', accept: ['then'], placeholder: '메서드 이름',
          why: '<code>.then(함수)</code>는 Promise가 끝나면 그 함수를 실행해줘요.',
          hint: '"그다음에"라는 뜻의 영어 단어 그대로예요.'
        }),
        () => makeChoice(
          '<code>async</code> 함수 안에서, Promise가 끝날 때까지 기다리는 것처럼 쓰게 해주는 키워드는?',
          '<code>await</code>', ['<code>then</code>', '<code>delay</code>', '<code>pause</code>'],
          '<code>await</code>는 Promise가 끝날 때까지 그 줄에서 "기다리는 것처럼" 코드를 순서대로 쓰게 해줘요.',
          '"기다리다"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>delay(ms)</code> 함수(이미 만들어져 있다고 가정)를 <code>await</code>로 기다린 뒤 <code>"완료"</code>를 출력하는 <code>async function run()</code> 함수를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'async function run() {\n  await delay(1000);\n  console.log("완료");\n}',
          accept: ['async function run() {\n  await delay(1000);\n  console.log("완료");\n}'],
          why: '<code>async function</code> 안에서 <code>await delay(1000)</code>은 delay가 끝날 때까지 기다린 뒤 다음 줄로 넘어가요.',
          hint: 'async function run() { } 안에 await delay(1000); 다음 console.log("완료");를 쓰세요.'
        }),
      ],
      boss: () => {
        const ms = pick([0, 500, 5000]);
        return {
          type: 'blank',
          q: `<code>console.log("1"); setTimeout(() => console.log("2"), ${ms}); Promise.resolve().then(() => console.log("3")); console.log("4");</code>를 실행하면, 동기 코드인 <code>"1"</code>과 <code>"4"</code>가 먼저 출력되고 그다음 <code>setTimeout</code>의 <code>"2"</code>가 출력돼요. 그렇다면 이 코드를 실행했을 때 <b>가장 마지막</b>에 출력되는 숫자는 무엇일까요?`,
          prefix: '', suffix: '', accept: ['2'], placeholder: '숫자',
          why: `동기 코드(1, 4)가 가장 먼저 끝나고, Promise.then은 매우 짧게 대기하는 작업이라 setTimeout보다 먼저 실행돼요. setTimeout은 지정한 시간만큼 기다려야 해서 가장 나중에 실행돼요.`,
          hint: '동기 코드가 가장 먼저, 그다음 Promise.then, 가장 마지막이 setTimeout이에요.'
        };
      }
    },
    {
      id: 'closures',
      title: '클로저와 구조분해 할당',
      ready: true,
      summary: '함수가 자신이 태어난 환경을 기억하는 클로저와, 배열·객체를 한 번에 풀어서 변수에 담는 방법을 배워요.',
      goals: ['클로저(closure)', '배열 구조분해 할당', '객체 구조분해 할당'],
      blocks: [
        {
          h: '함수가 자신이 만들어진 환경을 기억해요: 클로저',
          html: `<p>함수 안에서 또 다른 함수를 만들어 반환하면, 그 안쪽 함수는 바깥 함수의 변수를 계속 "기억"해요. 바깥 함수가 이미 끝났는데도요! 이런 현상을 <b>클로저</b>라고 불러요.</p>`,
          code: {
            label: 'closure.js',
            src: `function makeCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}

const counter = makeCounter();
console.log(counter());
console.log(counter());
console.log(counter());`,
            out: `1\n2\n3`
          }
        },
        {
          h: '배열을 한 번에 풀어서 담기: 구조분해 할당',
          html: `<p><code>const [a, b] = [1, 2];</code>처럼 대괄호로 감싸면, 배열의 각 값을 순서대로 변수에 바로 담을 수 있어요. <code>a = arr[0]; b = arr[1];</code>을 한 줄로 줄인 것과 같아요.</p>`,
          code: {
            label: 'array_destructure.js',
            src: `const [first, second] = ["지수", "민준"];
console.log(first, second);`,
            out: `지수 민준`
          }
        },
        {
          h: '객체를 한 번에 풀어서 담기',
          html: `<p>객체는 <code>const { 속성이름 } = 객체;</code> 형태로 풀어요. 이때 변수 이름은 객체의 속성 이름과 <b>똑같아야</b> 해요.</p>`,
          code: {
            label: 'object_destructure.js',
            src: `const student = { name: "지수", age: 17 };
const { name, age } = student;
console.log(name, age);`,
            out: `지수 17`
          },
          after: `<div class="note"><b>팁</b> — 함수의 매개변수 자리에서도 <code>function greet({ name }) { ... }</code>처럼 바로 구조분해 할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const calls = randInt(2, 5);
          return {
            type: 'blank',
            q: `<code>makeCounter</code>로 만든 <code>counter</code>를 <code>${calls}</code>번 연속으로 호출하면(<code>counter()</code>), 마지막 호출의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(calls)], placeholder: '숫자',
            why: `클로저가 <code>count</code>를 계속 기억하면서 호출할 때마다 1씩 늘려요. ${calls}번 호출하면 결과는 ${calls}이에요.`,
            hint: 'count는 0에서 시작해서 호출할 때마다 1씩 늘어나요.'
          };
        },
        () => makeChoice(
          '바깥 함수가 이미 실행을 끝냈는데도, 안쪽 함수가 바깥 함수의 변수를 계속 기억하는 현상을 무엇이라고 하나요?',
          '클로저(closure)', ['콜백(callback)', '프로미스(Promise)', '이벤트 버블링'],
          '이렇게 바깥 변수를 계속 "붙잡고" 있는 함수를 <b>클로저</b>라고 불러요.',
          '"닫혀있다, 감싸여 있다"는 뜻의 영어 단어예요.'
        ),
        () => {
          const items = shuffle(['사과', '바나나', '포도', '딸기']).slice(0, 2);
          return {
            type: 'blank',
            q: `<code>const [a, b] = ["${items[0]}", "${items[1]}"];</code>일 때, <code>console.log(b);</code>의 출력은? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [items[1]], placeholder: '값',
            why: `구조분해 할당은 배열의 순서대로 변수에 담아요. 두 번째 값인 "${items[1]}"이 <code>b</code>에 담겨요.`,
            hint: '대괄호 순서와 값의 순서가 그대로 짝지어져요.'
          };
        },
        () => makeChoice(
          '객체를 구조분해 할당할 때, 변수 이름은 무엇과 똑같아야 하나요?',
          '객체의 속성(키) 이름', ['변수의 자료형', '객체가 선언된 순서', '아무 이름이나 상관없다'],
          '<code>const { name } = obj;</code>처럼 변수 이름이 객체의 속성 이름과 같아야 그 값을 가져올 수 있어요.',
          '중괄호 안에 쓰는 이름은 객체 안의 "이름표"와 똑같아야 해요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '객체 <code>{ name: "민준", age: 16 }</code>을 <code>const { name, age }</code> 형태로 구조분해 할당한 뒤, <code>name</code>과 <code>age</code>를 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'const { name, age } = { name: "민준", age: 16 };\nconsole.log(name, age);',
          expectedOutput: '민준 16',
          why: '구조분해 할당으로 name과 age 변수에 각각 값이 담기고, 그대로 출력하면 "민준 16"이 나와요.',
          hint: 'const { name, age } = { ... }; 형태로 분해한 다음, console.log(name, age);를 쓰세요.'
        }),
      ],
      boss: () => {
        const start = randInt(1, 3);
        const calls = randInt(2, 4);
        return {
          type: 'code',
          mode: 'run-js',
          q: `<code>makeCounter(start)</code>가 <code>start</code>에서 시작해서 호출할 때마다 1씩 늘어난 값을 반환하도록 만드세요(클로저 이용). <code>const counter = makeCounter(${start});</code>를 만들고, <code>counter()</code>를 ${calls}번 호출해서 배열 <code>[결과1, 결과2, ...]</code>로 모은 뒤, 구조분해 할당으로 <code>[first, ...rest]</code>를 나누고 <code>first</code>를 <code>console.log</code>로 출력하는 코드를 작성하세요.`,
          starter: '',
          rows: 10,
          placeholder: `function makeCounter(start) {\n  let count = start;\n  return function () {\n    const result = count;\n    count += 1;\n    return result;\n  };\n}\n\nconst counter = makeCounter(${start});\nconst results = [${Array.from({ length: calls }, () => 'counter()').join(', ')}];\nconst [first, ...rest] = results;\nconsole.log(first);`,
          expectedOutput: String(start),
          why: `makeCounter(${start})은 ${start}부터 세는 클로저를 만들고, 첫 번째 호출 결과는 항상 시작값인 ${start}이에요. 구조분해 할당의 first는 배열의 첫 번째 값을 가져와요.`,
          hint: '클로저 함수가 처음 호출됐을 때 돌려주는 값은 항상 시작값(start)이라는 걸 기억하세요.'
        };
      }
    }],
  tierBoss: {
    beginner: () => ({
      type: 'code',
      mode: 'run-js',
      q: '1부터 <code>n</code>까지의 합을 반환하는 함수 <code>sumRange(n)</code>을 만드세요(변수와 for문 사용). <code>sumRange(5)</code>의 결과가 10보다 크면 "많음"을, 아니면 "적음"을 <code>console.log</code>로 출력하는 전체 코드를 작성하세요.',
      starter: '',
      rows: 9,
      placeholder: 'function sumRange(n) {\n  let total = 0;\n  for (let i = 1; i <= n; i++) {\n    total += i;\n  }\n  return total;\n}\n\nif (sumRange(5) > 10) {\n  console.log("많음");\n} else {\n  console.log("적음");\n}',
      expectedOutput: '많음',
      why: 'sumRange(5)는 1부터 5까지 더한 15를 반환하고, 15는 10보다 크니까 "많음"이 출력돼요.',
      hint: '함수 안에서 total = 0으로 시작해 for문으로 더한 값을 return한 뒤, 그 결과를 if/else로 비교하세요.'
    }),
    intermediate: () => ({
      type: 'code',
      mode: 'run-js',
      q: '생성자에서 <code>this.scores = []</code>로 시작하고, <code>add(score)</code> 메서드가 <code>this.scores.push(score)</code>를, <code>average()</code> 메서드가 점수가 하나도 없으면 <code>throw new Error("점수가 없어서 평균을 구할 수 없어요")</code>를 던지고 아니면 평균을 반환하는 <code>Scoreboard</code> 클래스를 만드세요. <code>new Scoreboard()</code>를 만들고(점수는 추가하지 않고), <code>try/catch</code>로 <code>average()</code>를 호출해서 오류 메시지를 <code>console.log</code>로 출력하는 전체 코드를 작성하세요.',
      starter: '',
      rows: 16,
      placeholder: 'class Scoreboard {\n  constructor() {\n    this.scores = [];\n  }\n  add(score) {\n    this.scores.push(score);\n  }\n  average() {\n    if (this.scores.length === 0) {\n      throw new Error("점수가 없어서 평균을 구할 수 없어요");\n    }\n    return this.scores.reduce((a, b) => a + b, 0) / this.scores.length;\n  }\n}\n\nconst sb = new Scoreboard();\ntry {\n  console.log(sb.average());\n} catch (e) {\n  console.log(e.message);\n}',
      expectedOutput: '점수가 없어서 평균을 구할 수 없어요',
      why: 'scores 배열이 비어있는 상태에서 average()를 호출하면 length가 0이라 Error를 던지고, catch (e)가 그 오류를 잡아 메시지를 출력해요.',
      hint: 'Scoreboard 클래스에 scores 배열, add, average를 각각 만들고, average() 호출을 try/catch로 감싸세요.'
    }),
    advanced: () => ({
      type: 'blank',
      q: `다음 코드를 실행하면 콘솔에 어떤 순서로 무엇이 출력될까요? (쉼표로 구분해서, 예: [1,2,3], 동기 종료, 타이머)
<pre><code>function makeCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}

const counter = makeCounter();
const nums = [1, 2, 3].map(() => counter());
console.log(nums);
setTimeout(() => console.log("타이머"), 0);
console.log("동기 종료");</code></pre>`,
      prefix: '', suffix: '', accept: ['[1,2,3], 동기 종료, 타이머', '[1, 2, 3], 동기 종료, 타이머'], placeholder: '출력 순서',
      why: 'map이 counter()를 세 번 순서대로 호출하며 클로저의 count를 1, 2, 3으로 늘려서 [1,2,3]이 만들어져요. 그다음 "동기 종료"가 출력되고, setTimeout은 시간이 0이어도 동기 코드가 다 끝난 뒤에야 실행되니 "타이머"가 가장 마지막이에요.',
      hint: 'map이 counter()를 배열 길이만큼 순서대로 호출한다는 것과, setTimeout은 항상 동기 코드보다 늦게 실행된다는 것을 함께 떠올려보세요.'
    }),
  }
};
