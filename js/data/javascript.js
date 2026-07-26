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
    },
    {
      id: 'thisBinding',
      title: 'this와 call/apply/bind',
      ready: true,
      summary: '함수 안에서 this가 무엇을 가리키는지, 그리고 call/apply/bind로 this를 직접 지정하는 법을 배워요.',
      goals: ['this가 가리키는 대상', '화살표 함수의 this', 'call/apply/bind로 this 지정하기'],
      blocks: [
        {
          h: '"this"는 누가 불렀느냐에 따라 달라져요',
          html: `<p>메서드 안에서 <code>this</code>는 "그 메서드를 부른 객체"를 가리켜요. <code>person.greet()</code>처럼 부르면, <code>greet</code> 안의 <code>this</code>는 <code>person</code>이 돼요.</p>`,
          code: {
            label: 'this_basic.js',
            src: `const person = {
  name: "지수",
  greet() {
    console.log(\`안녕, 나는 \${this.name}이야\`);
  }
};

person.greet();`,
            out: `안녕, 나는 지수이야`
          }
        },
        {
          h: '화살표 함수는 this를 자기 것으로 안 가져요',
          html: `<p>화살표 함수는 <b>자신을 둘러싼 스코프의 this</b>를 그대로 써요. 그래서 객체 메서드를 화살표 함수로 만들면, 기대와 다르게 동작할 수 있어요.</p>`,
          code: {
            label: 'arrow_this.js',
            src: `const person = {
  name: "지수",
  greet: () => {
    console.log(this.name);
  }
};

person.greet();`,
            out: `undefined`
          },
          after: `<div class="note"><b>주의</b> — 객체의 메서드를 만들 땐 화살표 함수 대신 <code>greet() {...}</code> 형태(축약 메서드)나 일반 함수를 쓰는 게 안전해요.</div>`
        },
        {
          h: 'this를 직접 지정하기: call, apply, bind',
          html: `<p><code>함수.call(대상)</code>은 <code>this</code>를 <code>대상</code>으로 지정해서 <b>즉시</b> 함수를 실행해요. <code>bind(대상)</code>은 즉시 실행하지 않고, <code>this</code>가 고정된 <b>새 함수</b>를 돌려줘요.</p>`,
          code: {
            label: 'call_bind.js',
            src: `function greet() {
  console.log(\`안녕, 나는 \${this.name}이야\`);
}

const jisu = { name: "지수" };
greet.call(jisu);

const greetJisu = greet.bind(jisu);
greetJisu();`,
            out: `안녕, 나는 지수이야\n안녕, 나는 지수이야`
          }
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>const person = { name: "${name}", greet() { console.log(this.name); } };</code>에서 <code>person.greet();</code>의 결과는? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [name], placeholder: '값',
            why: `<code>person.greet()</code>로 불렀으니, this는 person을 가리켜서 "${name}"이 출력돼요.`,
            hint: '메서드를 부른 객체가 this가 된다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          '화살표 함수로 만든 객체 메서드 안에서 <code>this</code>는 무엇을 가리킬까요?',
          '자신을 둘러싼 바깥 스코프의 this', ['그 메서드를 부른 객체', '항상 window/global', '항상 undefined'],
          '화살표 함수는 자기만의 this가 없어서, 자신을 둘러싼 스코프의 this를 그대로 써요.',
          '화살표 함수는 "자기 것"이 없다는 특징을 떠올려보세요.'
        ),
        () => {
          const name = pick(['민준', '서연', '도윤']);
          return {
            type: 'blank',
            q: `<code>function greet() { console.log(this.name); }</code>가 있을 때, <code>greet.call({ name: "${name}" })</code>의 결과는? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [name], placeholder: '값',
            why: `<code>.call(객체)</code>는 this를 그 객체로 지정해서 실행하니 "${name}"이 출력돼요.`,
            hint: 'call의 첫 번째 인자로 넘긴 객체가 this가 된다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          '<code>greet.call(obj)</code>와 <code>greet.bind(obj)</code>의 가장 큰 차이는?',
          'call은 즉시 실행하고, bind는 this가 고정된 새 함수를 반환한다',
          ['둘 다 즉시 실행되고 결과만 다르다', 'bind만 인자를 여러 개 받을 수 있다', 'call은 화살표 함수에만 쓸 수 있다'],
          '<code>call</code>은 그 자리에서 바로 실행하지만, <code>bind</code>는 나중에 부를 수 있는 새 함수를 만들어줘요.',
          '"즉시 실행" vs "나중에 쓸 함수 만들기"의 차이를 생각해보세요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '<code>function sayName() { console.log(this.name); }</code> 함수를 <code>{ name: "하은" }</code> 객체를 this로 지정해서 <code>call</code>로 실행하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'function sayName() {\n  console.log(this.name);\n}\nsayName.call({ name: "하은" });',
          expectedOutput: '하은',
          why: '<code>.call({ name: "하은" })</code>은 this를 그 객체로 지정해서 함수를 즉시 실행해요.',
          hint: 'sayName.call( ) 안에 { name: "하은" }을 넣으세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연', '도윤']);
        return {
          type: 'code',
          mode: 'run-js',
          q: '<code>function greet() { console.log(`안녕, ${this.name}`); }</code> 함수를 <code>{ name: "' + name + '" }</code>으로 <code>bind</code>해서 <code>greetFixed</code>라는 새 함수를 만들고, <code>greetFixed()</code>를 호출하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: `function greet() {\n  console.log(\`안녕, \${this.name}\`);\n}\nconst greetFixed = greet.bind({ name: "${name}" });\ngreetFixed();`,
          expectedOutput: `안녕, ${name}`,
          why: `bind로 this가 { name: "${name}" }로 고정된 새 함수를 만들었으니, 나중에 호출해도 그 값을 그대로 써요.`,
          hint: 'greet.bind(객체)로 새 함수를 만든 뒤, 그 새 함수를 호출하세요.'
        };
      }
    },
    {
      id: 'coercion',
      title: '형변환과 ==, ===',
      ready: true,
      summary: '자바스크립트가 몰래 타입을 바꿔주는 암시적 형변환과, 왜 실무에서 항상 ===을 쓰는지 배워요.',
      goals: ['암시적 형변환', '== vs ===', '항상 ===을 쓰는 이유'],
      blocks: [
        {
          h: '자바스크립트는 타입을 몰래 바꿔줘요: 암시적 형변환',
          html: `<p><code>+</code>는 둘 중 하나라도 문자열이면 <b>문자열 이어붙이기</b>로, <code>-</code>는 <b>양쪽 다 숫자로 바꿔서</b> 계산해요. 이렇게 타입이 자동으로 바뀌는 걸 <b>암시적 형변환</b>이라고 해요.</p>`,
          code: {
            label: 'coercion_basic.js',
            src: `console.log("5" + 3);
console.log("5" - 3);`,
            out: `53\n2`
          }
        },
        {
          h: '느슨한 비교 ==와 엄격한 비교 ===',
          html: `<p><code>==</code>은 타입이 달라도 <b>변환해서</b> 값을 비교하지만(느슨한 비교), <code>===</code>은 타입까지 <b>완전히 같아야</b> 참이에요(엄격한 비교).</p>`,
          code: {
            label: 'equality.js',
            src: `console.log(5 == "5");
console.log(5 === "5");`,
            out: `true\nfalse`
          }
        },
        {
          h: '왜 항상 ===을 써야 할까요',
          html: `<p><code>==</code>의 변환 규칙은 <code>0 == ""</code>, <code>null == undefined</code>처럼 예상하기 어려운 경우가 많아요. 그래서 실무에서는 거의 항상 <code>===</code>과 <code>!==</code>만 쓰고, <code>==</code>은 되도록 피해요.</p>`,
          after: `<div class="note"><b>기억하기</b> — "타입까지 같은지" 확인하고 싶다면 무조건 <code>===</code>을 쓰세요. 헷갈리는 암시적 변환 규칙을 외울 필요가 없어져요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const s = pick(['3', '7', '10']);
          const n = randInt(1, 9);
          return {
            type: 'blank',
            q: `<code>console.log("${s}" + ${n});</code>의 출력은? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [`${s}${n}`], placeholder: '값',
            why: `문자열 + 숫자는 문자열끼리 이어붙여서 "${s}${n}"이 돼요.`,
            hint: '+ 연산은 문자열이 하나라도 있으면 이어붙이기가 돼요.'
          };
        },
        () => {
          const s = randInt(10, 20);
          const n = randInt(1, 9);
          return {
            type: 'blank',
            q: `<code>console.log("${s}" - ${n});</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(s - n)], placeholder: '숫자',
            why: `- 연산은 양쪽을 숫자로 바꿔서 계산하니 ${s} - ${n} = ${s - n}이에요.`,
            hint: '- 연산은 문자열이어도 숫자로 바꿔서 계산해요.'
          };
        },
        () => {
          const n = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>console.log(${n} == "${n}");</code>와 <code>console.log(${n} === "${n}");</code>의 결과를 "값, 값" 형태로 쓰세요.`,
            prefix: '', suffix: '', accept: ['true, false'], placeholder: 'true 또는 false, true 또는 false',
            why: '==은 타입을 변환해서 비교하니 true, ===은 타입까지 같아야 하니(숫자 vs 문자열) false예요.',
            hint: '==은 느슨하게, ===은 엄격하게 비교한다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          '실무에서 <code>==</code> 대신 거의 항상 <code>===</code>을 쓰는 이유는?',
          '암시적 변환 규칙이 헷갈리고 예상 못한 버그의 원인이 되기 쉬워서',
          ['===이 항상 더 빨리 실행돼서', '==은 최신 문법이 아니라서 지원이 끊겨서', '===은 숫자만 비교할 수 있어서'],
          '==의 변환 규칙은 직관과 다른 경우가 많아서, 항상 ===을 쓰는 게 안전해요.',
          '"타입까지 정확히 같은지"를 확인하고 싶을 때 어떤 걸 써야 할지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '변수 <code>score</code>가 <code>90</code>일 때, <code>score</code>가 숫자 <code>90</code>과 <b>엄격하게</b> 같은지 확인해서 결과를 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'const score = 90;\nconsole.log(score === 90);',
          expectedOutput: 'true',
          why: '<code>===</code>로 비교하면 타입과 값이 모두 같아야 true예요.',
          hint: 'score === 90을 console.log로 출력하세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 9);
        const b = randInt(1, 9);
        return {
          type: 'blank',
          q: `<code>console.log("${a}" + ${b} === "${a}${b}");</code>의 결과는? (<code>true</code> 또는 <code>false</code>)`,
          prefix: '', suffix: '', accept: ['true'], placeholder: 'true 또는 false',
          why: `"${a}" + ${b}는 문자열 이어붙이기라서 "${a}${b}"가 되고, 오른쪽의 "${a}${b}"와 타입·값이 같아서 true예요.`,
          hint: '먼저 왼쪽 "${a}" + ${b}의 결과가 무엇이 되는지부터 계산해보세요.'
        };
      }
    },
    {
      id: 'spreadRest',
      title: '스프레드와 레스트 연산자',
      ready: true,
      summary: '점 세 개(...)로 배열/객체를 복사하고 합치는 스프레드, 여러 인자를 모으는 레스트 연산자를 배워요.',
      goals: ['배열/객체 복사와 합치기(스프레드)', '함수에서 나머지 인자 모으기(레스트)', '스프레드로 함수 호출하기'],
      blocks: [
        {
          h: '배열을 복사하고 합치기: 스프레드(...)',
          html: `<p><code>...배열</code>은 그 배열의 값을 <b>낱개로 풀어헤쳐요</b>. 그래서 <code>[...a, 3, 4]</code>처럼 쓰면 기존 배열에 값을 더한 <b>새 배열</b>을 쉽게 만들 수 있어요.</p>`,
          code: {
            label: 'spread_array.js',
            src: `const a = [1, 2];
const b = [...a, 3, 4];
console.log(b);`,
            out: `[ 1, 2, 3, 4 ]`
          }
        },
        {
          h: '객체도 복사하고 합칠 수 있어요',
          html: `<p>객체도 <code>{ ...base, 추가속성 }</code>처럼 스프레드로 복사하면서 새 속성을 더하거나 기존 값을 덮어쓸 수 있어요.</p>`,
          code: {
            label: 'spread_object.js',
            src: `const base = { name: "지수" };
const updated = { ...base, age: 17 };
console.log(updated);`,
            out: `{ name: '지수', age: 17 }`
          }
        },
        {
          h: '나머지 값을 한 번에 모으기: 레스트(...)',
          html: `<p>함수의 매개변수 자리에서 <code>...이름</code>을 쓰면, 넘긴 값들을 몇 개든 <b>배열 하나</b>로 모아서 받을 수 있어요.</p>`,
          code: {
            label: 'rest_params.js',
            src: `function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3, 4));`,
            out: `10`
          },
          after: `<div class="note"><b>기억하기</b> — 값이 있는 자리(배열/객체 리터럴, 함수 호출)에 쓰면 <b>스프레드</b>(풀어헤치기), 매개변수 자리에 쓰면 <b>레스트</b>(모으기)예요. 똑같은 <code>...</code>이지만 위치에 따라 반대로 동작해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const arr = Array.from({ length: 3 }, () => randInt(1, 20));
          const extra = randInt(21, 30);
          return {
            type: 'blank',
            q: `<code>const a = [${arr.join(', ')}];</code>, <code>const b = [...a, ${extra}];</code>일 때, <code>b</code>의 값은? 대괄호 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`[${[...arr, extra].join(', ')}]`], placeholder: '[숫자, ...]',
            why: `...a는 a의 값들을 그대로 풀어놓고, 그 뒤에 ${extra}가 더해져서 [${[...arr, extra].join(', ')}]가 돼요.`,
            hint: '기존 배열 값들 뒤에 새로 넣은 값이 이어붙는다는 걸 떠올려보세요.'
          };
        },
        () => {
          const age1 = randInt(14, 19);
          const age2 = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>const base = { name: "지수", age: ${age1} };</code>, <code>const updated = { ...base, age: ${age2} };</code>일 때, <code>updated.age</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(age2)], placeholder: '숫자',
            why: `스프레드 뒤에 같은 키(age)를 다시 쓰면, <b>나중에 쓴 값</b>이 이전 값을 덮어써서 ${age2}가 돼요.`,
            hint: '스프레드 뒤에 나오는 같은 이름의 속성이 앞의 값을 덮어쓴다는 걸 떠올려보세요.'
          };
        },
        () => {
          const nums = Array.from({ length: randInt(3, 5) }, () => randInt(1, 20));
          const total = nums.reduce((a, b) => a + b, 0);
          return {
            type: 'blank',
            q: `<code>function sum(...nums) { return nums.reduce((a, b) => a + b, 0); }</code>에 <code>sum(${nums.join(', ')})</code>라고 호출하면 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
            why: `...nums가 넘긴 값들을 배열로 모아서, 다 더하면 ${total}이에요.`,
            hint: '레스트 매개변수가 넘긴 값들을 배열로 모은다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          '<code>...</code>이 "여러 값을 배열로 모으는" 역할(레스트)을 하는 위치는?',
          '함수의 매개변수 자리', ['배열 리터럴 [ ] 안', '객체 리터럴 { } 안', '함수를 호출할 때 인자 자리'],
          '매개변수 자리에서 <code>...이름</code>은 넘긴 값들을 배열로 모아 받는 레스트 역할을 해요.',
          '"모으기"는 값을 받는 쪽(매개변수)에서 일어나요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '배열 <code>[1, 2, 3]</code>과 <code>[4, 5]</code>를 스프레드로 합친 새 배열을 만들어 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'const merged = [...[1, 2, 3], ...[4, 5]];\nconsole.log(merged);',
          expectedOutput: '[ 1, 2, 3, 4, 5 ]',
          why: '두 배열을 각각 스프레드로 풀어서 하나의 새 배열 안에 합쳐요.',
          hint: '[...배열1, ...배열2] 형태로 두 배열을 이어붙이세요.'
        }),
      ],
      boss: () => {
        const nums = Array.from({ length: randInt(3, 4) }, () => randInt(1, 15));
        const extra = Array.from({ length: 2 }, () => randInt(16, 30));
        const total = [...nums, ...extra].reduce((a, b) => a + b, 0);
        return {
          type: 'blank',
          q: `<code>function total(...nums) { return nums.reduce((a, b) => a + b, 0); }</code>에 <code>total(...[${nums.join(', ')}], ...[${extra.join(', ')}])</code>라고 호출하면 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
          why: `두 배열을 스프레드로 풀어서 인자로 넘기면, ...nums가 전부 모아서 합이 ${total}이 돼요.`,
          hint: '두 배열의 모든 값을 낱개 인자로 풀어서 넘긴 뒤, 함수 안에서 다시 하나의 배열로 모인다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'mapSet',
      title: 'Map과 Set',
      ready: true,
      summary: '중복 없이 값을 모으는 Set과, 어떤 타입이든 키로 쓸 수 있는 Map을 배워요.',
      goals: ['Set으로 중복 없는 값 모으기', 'Map으로 키-값 쌍 다루기', '객체와 Map의 차이'],
      blocks: [
        {
          h: '중복 없이 값 모으기: Set',
          html: `<p><code>Set</code>은 <b>중복을 자동으로 없애는</b> 값들의 모음이에요. <code>.size</code>로 개수를, <code>[...set]</code>으로 배열로 바꿀 수 있어요.</p>`,
          code: {
            label: 'set_basic.js',
            src: `const nums = new Set([1, 2, 2, 3, 3, 3]);
console.log(nums.size);
console.log([...nums]);`,
            out: `3\n[ 1, 2, 3 ]`
          }
        },
        {
          h: '어떤 값이든 키로 쓸 수 있는 Map',
          html: `<p><code>Map</code>은 객체와 비슷하게 키-값 쌍을 저장하지만, 문자열뿐 아니라 <b>숫자, 객체 등 어떤 값이든 키</b>로 쓸 수 있어요. <code>.set(키, 값)</code>으로 넣고 <code>.get(키)</code>로 꺼내요.</p>`,
          code: {
            label: 'map_basic.js',
            src: `const map = new Map();
map.set("name", "지수");
map.set(1, "숫자 키");
console.log(map.get("name"));
console.log(map.size);`,
            out: `지수\n2`
          }
        },
        {
          h: '객체와 Map, 언제 뭘 쓸까요',
          html: `<p>일반적인 설정값처럼 <b>키가 미리 정해져 있으면</b> 객체가 편하고, 키가 <b>동적으로 계속 추가·삭제</b>되거나 숫자·객체를 키로 써야 한다면 <code>Map</code>이 더 안전하고 편해요.</p>`,
          after: `<div class="note"><b>참고</b> — Set과 비슷하게 중복 없는 "값" 모음이 아니라 "키-값 쌍" 모음이 필요할 때 Map을 떠올리세요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const nums = Array.from({ length: randInt(6, 9) }, () => randInt(1, 4));
          const uniqueCount = new Set(nums).size;
          return {
            type: 'blank',
            q: `<code>new Set([${nums.join(', ')}]).size</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(uniqueCount)], placeholder: '숫자',
            why: `Set은 중복을 없애서, 서로 다른 값 ${uniqueCount}개만 남아요.`,
            hint: '리스트 안에서 서로 다른 값이 몇 종류인지 세어보세요.'
          };
        },
        () => {
          const items = shuffle([1, 2, 2, 3, 3, 3, 4]).slice(0, 5);
          const unique = [...new Set(items)];
          return {
            type: 'blank',
            q: `<code>[...new Set([${items.join(', ')}])]</code>의 결과를 대괄호 포함해서 쓰세요. (등장한 순서 유지)`,
            prefix: '', suffix: '', accept: [`[${unique.join(', ')}]`], placeholder: '[숫자, ...]',
            why: `Set은 처음 등장한 순서를 유지하면서 중복만 없애서 [${unique.join(', ')}]이 돼요.`,
            hint: '처음 나온 순서대로, 중복만 없애보세요.'
          };
        },
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>const map = new Map(); map.set("name", "${name}");</code>일 때, <code>map.get("name")</code>의 값은? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [name], placeholder: '값',
            why: `<code>.get("name")</code>은 그 키에 저장된 값 "${name}"을 돌려줘요.`,
            hint: '.set으로 넣은 값을 .get으로 그대로 꺼내요.'
          };
        },
        () => makeChoice(
          '숫자나 객체를 키로 써야 하는 상황에 더 적합한 것은?',
          'Map', ['객체({})', 'Array', 'Set'],
          '객체의 키는 항상 문자열(또는 심볼)로 바뀌지만, Map은 어떤 값이든 키로 쓸 수 있어요.',
          '일반 객체의 키 제약이 무엇인지 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '배열 <code>[1, 1, 2, 2, 3]</code>에서 중복을 없앤 <code>Set</code>을 만들어, 그 크기(<code>.size</code>)를 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'const s = new Set([1, 1, 2, 2, 3]);\nconsole.log(s.size);',
          expectedOutput: '3',
          why: '중복을 없애면 1, 2, 3 세 개만 남아서 size는 3이에요.',
          hint: 'new Set(배열)로 만든 뒤 .size를 출력하세요.'
        }),
      ],
      boss: () => {
        const words = shuffle(['사과', '바나나', '사과', '포도', '사과', '바나나']);
        const map = new Map();
        words.forEach(w => map.set(w, (map.get(w) || 0) + 1));
        const target = pick([...map.keys()]);
        return {
          type: 'blank',
          q: `<code>words</code>가 [${words.map(w => `'${w}'`).join(', ')}]일 때, Map으로 각 단어의 등장 횟수를 센다면(<code>map.set(단어, (map.get(단어) || 0) + 1)</code>), <code>map.get("${target}")</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(map.get(target))], placeholder: '숫자',
          why: `"${target}"은(는) ${map.get(target)}번 등장해요.`,
          hint: `words 배열에서 "${target}"이(가) 몇 번 나오는지 세어보세요.`
        };
      }
    },
    {
      id: 'optionalChaining',
      title: '옵셔널 체이닝과 null 병합 연산자',
      ready: true,
      summary: '중간 값이 없어도 오류 없이 안전하게 접근하는 ?.과, null/undefined일 때만 기본값을 쓰는 ??를 배워요.',
      goals: ['?.로 안전하게 접근하기', '??로 기본값 정하기', '?? 와 || 의 차이'],
      blocks: [
        {
          h: '중간이 없어도 오류 안 나게: ?.',
          html: `<p><code>user.address.city</code>에서 <code>address</code>가 없으면(undefined) <code>TypeError</code>가 나요. <code>user.address?.city</code>처럼 <b>물음표를 붙이면</b>, 중간 값이 없을 때 오류 대신 조용히 <code>undefined</code>를 돌려줘요.</p>`,
          code: {
            label: 'optional_chaining.js',
            src: `const user = { name: "지수" };
console.log(user.address?.city);`,
            out: `undefined`
          }
        },
        {
          h: 'null/undefined일 때만 기본값 쓰기: ??',
          html: `<p><code>?? 기본값</code>은 왼쪽 값이 <b>null 또는 undefined일 때만</b> 오른쪽 기본값을 써요. <code>0</code>이나 <code>""</code>처럼 "값은 있지만 falsy한" 경우엔 기본값을 안 써요.</p>`,
          code: {
            label: 'nullish.js',
            src: `const count = 0;
console.log(count ?? 10);
console.log(count || 10);`,
            out: `0\n10`
          },
          after: `<div class="note"><b>차이</b> — <code>||</code>는 <code>0</code>, <code>""</code>, <code>false</code> 같은 모든 falsy 값에 기본값을 쓰지만, <code>??</code>는 딱 null/undefined일 때만 기본값을 써요. 0이 "진짜 유효한 값"일 수 있는 경우엔 <code>??</code>가 더 안전해요.</div>`
        },
        {
          h: '함수 호출에도 옵셔널 체이닝을',
          html: `<p>메서드가 있을 수도, 없을 수도 있을 때 <code>obj.method?.()</code>처럼 쓰면, 메서드가 없어도 오류 없이 <code>undefined</code>가 돼요.</p>`,
          code: {
            label: 'optional_call.js',
            src: `const obj = {};
console.log(obj.sayHi?.());`,
            out: `undefined`
          }
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>const user = { name: "지수" };</code>일 때, <code>user.address?.city</code>의 결과는?',
          'undefined', ['TypeError가 난다', '빈 문자열', 'null'],
          '<code>?.</code>는 address가 없어도 오류 대신 undefined를 돌려줘요.',
          '?.가 없었다면 TypeError가 났을 상황이라는 걸 떠올려보세요.'
        ),
        () => {
          const val = pick([0, '', false]);
          const label = val === 0 ? '0' : val === '' ? '""' : 'false';
          return {
            type: 'blank',
            q: `<code>const x = ${label};</code>일 때, <code>console.log(x ?? "기본값");</code>의 결과는? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [label === '""' ? '(빈 문자열)' : label], placeholder: '값',
            why: `??는 null/undefined일 때만 기본값을 써요. ${label}은(는) null/undefined가 아니라서 그대로 ${label}이(가) 출력돼요.`,
            hint: '??는 0, 빈 문자열, false를 "값이 있다"고 봐서 기본값을 안 써요.'
          };
        },
        () => {
          const val = pick([0, '', false]);
          const label = val === 0 ? '0' : val === '' ? '""' : 'false';
          return {
            type: 'blank',
            q: `<code>const x = ${label};</code>일 때, <code>console.log(x || "기본값");</code>의 결과는? (따옴표 없이)`,
            prefix: '', suffix: '', accept: ['기본값'], placeholder: '값',
            why: `||는 falsy한 값이면 전부 기본값을 써요. ${label}은(는) falsy라서 "기본값"이 출력돼요.`,
            hint: '||는 0, 빈 문자열, false를 모두 "없는 것"처럼 취급한다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          '숫자 0이 "유효한 값"일 수 있는 상황(예: 점수, 재고 개수)에서 기본값을 안전하게 처리하려면?',
          '<code>??</code>를 쓴다', ['<code>||</code>를 쓴다', '<code>?.</code>를 쓴다', '아무거나 써도 똑같다'],
          '0을 유효한 값으로 다루고 싶다면, null/undefined일 때만 기본값을 쓰는 <code>??</code>가 안전해요.',
          '||를 쓰면 0도 "없는 값"처럼 취급된다는 문제를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '<code>const user = { name: "민준" };</code>일 때, <code>user.profile?.email</code>이 있으면 그 값을, 없으면 <code>"이메일 없음"</code>을 <code>??</code>로 처리해서 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'const user = { name: "민준" };\nconsole.log(user.profile?.email ?? "이메일 없음");',
          expectedOutput: '이메일 없음',
          why: 'user.profile이 없어서 ?.가 undefined를 돌려주고, ??가 그걸 null/undefined로 인식해서 기본값이 출력돼요.',
          hint: 'user.profile?.email ?? "이메일 없음"을 그대로 출력해보세요.'
        }),
      ],
      boss: () => {
        const hasCity = Math.random() < 0.5;
        const city = pick(['서울', '부산']);
        return {
          type: 'blank',
          q: `<code>const user = { address: ${hasCity ? `{ city: "${city}" }` : '{}'} };</code>일 때, <code>console.log(user.address?.city ?? "주소 없음");</code>의 결과는?`,
          prefix: '', suffix: '', accept: [hasCity ? city : '주소 없음'], placeholder: '값',
          why: hasCity ? `city 값이 있으니 "${city}"가 그대로 출력돼요.` : `city가 없어서 ?.가 undefined를 돌려주고, ??가 "주소 없음"을 대신 출력해요.`,
          hint: 'address 안에 city가 실제로 있는지부터 확인해보세요.'
        };
      }
    },
    {
      id: 'domBasics',
      title: 'DOM 조작 기초',
      ready: true,
      summary: '자바스크립트로 HTML 요소를 찾고, 내용을 바꾸고, 새 요소를 만드는 DOM 조작의 기본을 배워요.',
      goals: ['querySelector로 요소 찾기', 'textContent로 내용 바꾸기', 'createElement로 새 요소 만들기'],
      blocks: [
        {
          h: 'HTML 요소를 자바스크립트로 찾기: querySelector',
          html: `<p><code>document.querySelector(선택자)</code>는 CSS 선택자(<code>#id</code>, <code>.class</code> 등)와 똑같은 방식으로 HTML 문서 안에서 요소를 찾아줘요.</p>`,
          code: {
            label: 'query_select.html + .js',
            src: `<!-- HTML -->
<h1 id="title">안녕하세요</h1>

<!-- JavaScript -->
const title = document.querySelector("#title");
console.log(title.textContent);`,
            out: `안녕하세요`
          }
        },
        {
          h: '내용 바꾸기: textContent와 innerHTML',
          html: `<p><code>.textContent</code>에 값을 대입하면 그 요소의 글자 내용이 바뀌어요. <code>.innerHTML</code>도 비슷하지만, HTML 태그까지 <b>해석</b>한다는 차이가 있어요.</p>`,
          code: {
            label: 'text_content.js',
            src: `const title = document.querySelector("#title");
title.textContent = "환영합니다";`
          },
          after: `<div class="note"><b>보안 주의</b> — 사용자가 입력한 값을 <code>innerHTML</code>에 그대로 넣으면, 그 안에 악성 <code>&lt;script&gt;</code> 코드가 섞여 있을 때 그대로 실행될 위험이 있어요(XSS). 그냥 글자만 바꾼다면 <code>textContent</code>가 더 안전해요.</div>`
        },
        {
          h: '새 요소 만들기: createElement',
          html: `<p><code>document.createElement(태그이름)</code>은 아직 화면에는 없는 새 요소를 메모리 위에 만들어줘요. <code>.tagName</code>으로 태그 이름을(항상 대문자로), <code>.textContent</code>로 내용을 확인할 수 있어요.</p>`,
          code: {
            label: 'create_element.js',
            src: `const p = document.createElement("p");
p.textContent = "새로 만든 문단";
console.log(p.textContent);
console.log(p.tagName);`,
            out: `새로 만든 문단\nP`
          }
        }
      ],
      quizGenerators: [
        () => {
          const text = pick(['환영합니다', '반갑습니다', '안녕하세요']);
          return {
            type: 'blank',
            q: `HTML에 <code>&lt;h1 id="title"&gt;${text}&lt;/h1&gt;</code>이 있을 때, <code>document.querySelector("#title").textContent</code>의 값은? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [text], placeholder: '값',
            why: `<code>#title</code>은 id가 title인 요소를 찾아서, 그 textContent인 "${text}"를 돌려줘요.`,
            hint: '# 뒤에 오는 이름은 그 id를 가진 요소를 가리켜요.'
          };
        },
        () => ({
          type: 'blank',
          q: `CSS 선택자와 같은 방식으로 HTML 요소 하나를 찾는, document의 메서드 이름을 쓰세요.`,
          prefix: 'document.', suffix: '("#title")', accept: ['querySelector'], placeholder: '메서드 이름',
          why: '<code>document.querySelector(선택자)</code>는 그 선택자와 맞는 첫 번째 요소를 찾아줘요.',
          hint: '"질의(query)로 선택(select)한다"는 뜻이 합쳐진 이름이에요.'
        }),
        () => makeChoice(
          '사용자가 입력한 값을 그대로 화면에 보여줄 때, 보안상 <code>innerHTML</code>보다 안전한 것은?',
          '<code>textContent</code>', ['<code>innerHTML</code>', 'document.write', '둘 다 똑같이 안전하다'],
          '<code>textContent</code>는 값을 HTML로 해석하지 않고 그냥 글자로만 다뤄서, 악성 스크립트가 실행될 위험이 없어요.',
          'innerHTML은 HTML 태그를 "해석"한다는 점이 위험 요소예요.'
        ),
        () => makeChoice(
          '<code>document.createElement("p").tagName</code>의 값은?',
          '<code>"P"</code>', ['<code>"p"</code>', '<code>"Paragraph"</code>', '<code>undefined</code>'],
          '<code>.tagName</code>은 항상 대문자로 태그 이름을 돌려줘요.',
          '소문자로 만들었어도 tagName은 항상 대문자로 나온다는 규칙을 기억하세요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '<code>"div"</code> 태그의 새 요소를 만들어 <code>textContent</code>를 <code>"안녕"</code>으로 설정한 뒤, 그 요소의 <code>tagName</code>을 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'const el = document.createElement("div");\nel.textContent = "안녕";\nconsole.log(el.tagName);',
          expectedOutput: 'DIV',
          why: '<code>createElement("div")</code>로 만든 요소의 tagName은 항상 대문자 "DIV"예요.',
          hint: 'createElement("div")로 요소를 만들고, .tagName을 출력하세요.'
        }),
      ],
      boss: () => {
        const text = pick(['완료', '진행중', '대기']);
        return {
          type: 'code',
          mode: 'run-js',
          q: `<code>"span"</code> 태그의 새 요소를 만들어 <code>textContent</code>를 <code>"${text}"</code>로 설정하고, <code>\`${'{tagName}'}: ${'{textContent}'}\`</code> 형태(예: <code>SPAN: ${text}</code>)로 <code>console.log</code>하는 코드를 작성하세요.`,
          starter: '',
          placeholder: `const el = document.createElement("span");\nel.textContent = "${text}";\nconsole.log(\`\${el.tagName}: \${el.textContent}\`);`,
          expectedOutput: `SPAN: ${text}`,
          why: `tagName은 대문자 SPAN, textContent는 설정한 그대로 "${text}"라서 "SPAN: ${text}"가 출력돼요.`,
          hint: '템플릿 리터럴 안에 el.tagName과 el.textContent를 콜론으로 이어붙이세요.'
        };
      }
    },
    {
      id: 'eventsBubbling',
      title: '이벤트 처리와 버블링',
      ready: true,
      summary: '클릭 같은 이벤트를 감지하는 addEventListener와, 이벤트가 부모로 퍼져나가는 버블링·이벤트 위임을 배워요.',
      goals: ['addEventListener로 이벤트 감지하기', '이벤트 객체와 target', '이벤트 버블링과 이벤트 위임'],
      blocks: [
        {
          h: '이벤트가 생기면 알아채기: addEventListener',
          html: `<p><code>요소.addEventListener("이벤트이름", 함수)</code>로, 그 요소에 특정 이벤트(클릭, 입력 등)가 생겼을 때 실행할 함수를 등록해요.</p>`,
          code: {
            label: 'add_listener.js',
            src: `const button = document.createElement("button");
button.addEventListener("click", () => {
  console.log("클릭됨!");
});
button.click();`,
            out: `클릭됨!`
          }
        },
        {
          h: '어떤 요소에서 이벤트가 났는지: event.target',
          html: `<p>리스너 함수는 <b>이벤트 객체</b>를 인자로 받아요. <code>event.target</code>은 이벤트가 실제로 발생한 요소를 가리켜요.</p>`,
          code: {
            label: 'event_target.js',
            src: `const button = document.createElement("button");
button.textContent = "누르세요";
button.addEventListener("click", (event) => {
  console.log(event.target.textContent);
});
button.click();`,
            out: `누르세요`
          }
        },
        {
          h: '이벤트는 위로 퍼져나가요: 버블링과 이벤트 위임',
          html: `<p>자식 요소에서 발생한 이벤트는 <b>부모 쪽으로도 전달</b>돼요(버블링). 이걸 이용해서, 자식 하나하나에 리스너를 달지 않고 <b>부모 하나</b>에만 리스너를 달아 자식들의 이벤트를 한 번에 처리하는 걸 <b>이벤트 위임</b>이라고 해요. 목록 안에 항목이 아주 많을 때 실무에서 자주 써요.</p>`,
          code: {
            label: 'delegation.js',
            src: `const list = document.createElement("ul");
const item = document.createElement("li");
item.textContent = "아이템1";
list.appendChild(item);

list.addEventListener("click", (event) => {
  console.log("부모가 감지:", event.target.textContent);
});

item.click();`,
            out: `부모가 감지: 아이템1`
          }
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `요소에 이벤트 리스너를 등록하는 메서드 이름을 쓰세요.`,
          prefix: 'button.', suffix: '("click", () => { ... })', accept: ['addEventListener'], placeholder: '메서드 이름',
          why: '<code>addEventListener(이벤트이름, 함수)</code>로 이벤트가 생겼을 때 실행할 함수를 등록해요.',
          hint: '"이벤트 리스너를 추가한다"는 뜻 그대로예요.'
        }),
        () => {
          const text = pick(['확인', '저장', '삭제']);
          return {
            type: 'blank',
            q: `<code>button.textContent = "${text}"</code>로 설정한 버튼에 클릭 리스너를 달아 <code>event.target.textContent</code>를 출력하도록 했어요. <code>button.click()</code>을 호출하면 무엇이 출력될까요? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [text], placeholder: '값',
            why: `<code>event.target</code>은 이벤트가 발생한(클릭된) 요소인 button을 가리켜서, "${text}"가 출력돼요.`,
            hint: 'event.target은 실제로 이벤트가 일어난 요소를 가리켜요.'
          };
        },
        () => ({
          type: 'blank',
          q: `자식 요소에서 발생한 이벤트가 부모 요소 쪽으로도 전달되는 현상을 무엇이라고 부를까요?`,
          prefix: '', suffix: '', accept: ['버블링', '이벤트 버블링'], placeholder: '용어',
          why: '이벤트가 자식에서 부모로 "거품처럼 위로 올라간다"고 해서 <b>버블링</b>이라고 불러요.',
          hint: '물속에서 거품이 위로 올라가는 모습을 떠올려보세요.'
        }),
        () => makeChoice(
          '리스트 안의 항목이 100개일 때, 각 항목마다 리스너를 달지 않고 부모 하나에만 리스너를 달아 처리하는 기법을 무엇이라고 부를까요?',
          '이벤트 위임', ['이벤트 버블링', '이벤트 캡처링', '이벤트 캔슬링'],
          '부모 하나에만 리스너를 달아 자식들의 이벤트를 대신 처리하는 걸 <b>이벤트 위임</b>이라고 해요. 버블링을 활용한 기법이에요.',
          '"자식들의 일을 부모에게 맡긴다(위임)"는 이미지를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '<code>button</code> 요소를 만들어 클릭하면 <code>"눌렸어요"</code>를 출력하는 리스너를 달고, <code>button.click()</code>으로 직접 클릭시키는 코드를 작성하세요.',
          starter: '',
          placeholder: 'const button = document.createElement("button");\nbutton.addEventListener("click", () => {\n  console.log("눌렸어요");\n});\nbutton.click();',
          expectedOutput: '눌렸어요',
          why: 'addEventListener로 등록한 함수는 click() 호출로 이벤트가 발생하면 실행돼요.',
          hint: 'addEventListener("click", 함수)를 등록한 뒤, button.click()을 호출하세요.'
        }),
      ],
      boss: () => {
        const item2 = pick(['아이템2', '항목B', '두번째']);
        return {
          type: 'code',
          mode: 'run-js',
          q: `<code>ul</code> 요소(<code>list</code>)를 만들고, 그 안에 <code>textContent</code>가 <code>"${item2}"</code>인 <code>li</code> 요소(<code>item</code>)를 <code>appendChild</code>로 추가하세요. <code>list</code>에 클릭 리스너를 달아 <code>event.target.textContent</code>를 출력하게 하고, <code>item.click()</code>을 호출하는 코드를 작성하세요.`,
          starter: '',
          rows: 8,
          placeholder: `const list = document.createElement("ul");\nconst item = document.createElement("li");\nitem.textContent = "${item2}";\nlist.appendChild(item);\nlist.addEventListener("click", (event) => {\n  console.log(event.target.textContent);\n});\nitem.click();`,
          expectedOutput: item2,
          why: `item을 클릭하면 이벤트가 버블링으로 부모(list)까지 전달되고, list에 등록한 리스너가 event.target(=item)의 textContent인 "${item2}"를 출력해요.`,
          hint: 'list에 리스너를 달고, item에서 클릭이 발생해도 버블링으로 list의 리스너가 실행된다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'modulesImportExport',
      title: '모듈 시스템: import와 export',
      ready: true,
      summary: '코드를 여러 파일로 나누고, 필요한 부분만 가져다 쓰는 ES 모듈의 import/export 문법을 배워요.',
      goals: ['export로 내보내기', 'import로 가져오기', 'default export와 named export의 차이'],
      blocks: [
        {
          h: '다른 파일로 나누고 필요한 것만 가져오기',
          html: `<p>코드가 커지면 기능을 여러 파일로 나눠요. <code>export</code>를 붙이면 그 파일 밖에서도 쓸 수 있게 "내보내고", 다른 파일에서는 <code>import</code>로 "가져와요".</p>`,
          code: {
            label: 'math.js',
            src: `export function add(a, b) {
  return a + b;
}`
          }
        },
        {
          h: '가져와서 쓰기: import',
          html: `<p>이름을 정해서 내보낸 것(named export)은, 가져올 때 <b>중괄호로 감싸서</b> 정확히 같은 이름으로 가져와요.</p>`,
          code: {
            label: 'main.js',
            src: `import { add } from "./math.js";

console.log(add(2, 3));`,
            out: `5`
          }
        },
        {
          h: '기본으로 내보내기: export default',
          html: `<p>한 파일에서 <b>가장 중심이 되는 것 하나</b>는 <code>export default</code>로 내보낼 수 있어요. 이렇게 내보낸 건 가져올 때 <b>중괄호 없이</b>, 이름도 자유롭게 지어서 가져와요.</p>`,
          code: {
            label: 'default_export.js',
            src: `// math.js
export default function add(a, b) {
  return a + b;
}

// main.js
import sum from "./math.js";
console.log(sum(2, 3));`,
            out: `5`
          },
          after: `<div class="note"><b>기억하기</b> — 한 파일에 <code>export default</code>는 <b>하나만</b> 쓸 수 있지만, 이름 붙은 <code>export</code>는 <b>여러 개</b> 쓸 수 있어요. HTML에서 모듈을 쓰려면 <code>&lt;script type="module" src="main.js"&gt;&lt;/script&gt;</code>처럼 <code>type="module"</code>이 꼭 필요해요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `함수를 다른 파일에서도 쓸 수 있게 내보낼 때 앞에 붙이는 키워드를 쓰세요.`,
          prefix: '', suffix: ' function add(a, b) {\n  return a + b;\n}', accept: ['export'], placeholder: '키워드',
          why: '<code>export</code>를 붙여야 다른 파일에서 import할 수 있어요.',
          hint: '"내보내다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'blank',
          q: `<code>math.js</code>에서 이름 붙여 내보낸(named export) <code>add</code> 함수를 <code>main.js</code>에서 가져오는 코드를 완성하세요.`,
          prefix: 'import ', suffix: ' from "./math.js";', accept: ['{ add }', '{add}'], placeholder: '{ 이름 }',
          why: '이름 붙은 export는 <code>import { 이름 } from "경로"</code>처럼 중괄호로 감싸서 가져와요.',
          hint: 'export한 이름을 중괄호로 감싸서 그대로 써야 해요.'
        }),
        () => makeChoice(
          'named export와 export default의 차이로 알맞은 것은?',
          'named export는 중괄호로, default export는 중괄호 없이 가져온다',
          ['named export만 여러 개 가져올 수 있고 default는 못 가져온다', '차이가 전혀 없다', 'default export는 함수에만 쓸 수 있다'],
          'named export는 <code>import { 이름 }</code>처럼 중괄호가 필요하지만, default export는 중괄호 없이 원하는 이름으로 가져와요.',
          '가져올 때 중괄호를 쓰는지 안 쓰는지의 차이를 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `브라우저에서 모듈 문법(import/export)을 쓰려면, <code>&lt;script&gt;</code> 태그에 어떤 속성값을 줘야 할까요? (예: <code>&lt;script type="${'{이것}'}" src="main.js"&gt;&lt;/script&gt;</code>)`,
          prefix: '', suffix: '', accept: ['module'], placeholder: '값',
          why: '<code>type="module"</code>이 있어야 브라우저가 그 스크립트를 모듈로 취급해서 import/export를 쓸 수 있어요.',
          hint: '"모듈"이라는 뜻의 영어 단어를 그대로 값으로 써요.'
        }),
        () => ({
          type: 'code',
          q: '<code>multiply(a, b)</code> 함수를 만들어서 이름 붙여(named) 내보내는 코드를 작성하세요. (한 줄로, a * b를 반환)',
          starter: '',
          placeholder: 'export function multiply(a, b) {\n  return a * b;\n}',
          accept: ['export function multiply(a, b) {\n  return a * b;\n}'],
          why: '<code>export</code>를 함수 정의 앞에 붙이면 이름 붙은 export가 돼요.',
          hint: 'export function multiply(a, b) { return a * b; }를 그대로 쓰세요.'
        }),
      ],
      boss: () => ({
        type: 'blank',
        q: `<code>utils.js</code>에서 <code>export default function greet(name) { return \`안녕, \${name}\`; }</code>로 내보냈어요. <code>main.js</code>에서 이 함수를 <code>hello</code>라는 이름으로 가져오는 import문을 완성하세요.`,
        prefix: 'import ', suffix: ' from "./utils.js";', accept: ['hello'], placeholder: '이름',
        why: 'default export는 중괄호 없이, 원하는 이름(여기선 hello)으로 자유롭게 가져올 수 있어요.',
        hint: 'default export는 이름이 정해져 있지 않아서, 가져오는 쪽에서 원하는 이름을 붙일 수 있어요.'
      })
    },
    {
      id: 'jsonJs',
      title: 'JSON 다루기',
      ready: true,
      summary: '자바스크립트 값을 JSON 문자열로 바꾸고, 다시 값으로 되돌리는 JSON.stringify/parse를 배워요.',
      goals: ['JSON.stringify로 문자열 만들기', 'JSON.parse로 값으로 되돌리기', 'JSON을 쓰는 이유'],
      blocks: [
        {
          h: '객체를 문자열로 바꾸기: JSON.stringify',
          html: `<p><code>JSON.stringify(값)</code>은 객체나 배열 같은 자바스크립트 값을 JSON 형식의 <b>문자열</b>로 바꿔줘요. 서버로 데이터를 보낼 때 이 형식을 자주 써요.</p>`,
          code: {
            label: 'stringify.js',
            src: `const student = { name: "지수", age: 17 };
const text = JSON.stringify(student);
console.log(text);`,
            out: `{"name":"지수","age":17}`
          }
        },
        {
          h: '문자열을 다시 값으로: JSON.parse',
          html: `<p><code>JSON.parse(문자열)</code>은 JSON 문자열을 다시 자바스크립트 객체(또는 배열)로 되돌려줘요.</p>`,
          code: {
            label: 'parse.js',
            src: `const text = '{"name":"민준","age":16}';
const data = JSON.parse(text);
console.log(data.name);`,
            out: `민준`
          }
        },
        {
          h: '왜 JSON을 쓸까요',
          html: `<p>JSON은 자바스크립트 전용이 아니라, 파이썬·자바 등 <b>거의 모든 언어가 읽고 쓸 수 있는</b> 텍스트 형식이에요. 그래서 서버와 브라우저처럼 서로 다른 프로그램끼리 데이터를 주고받을 때 표준으로 널리 쓰여요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>const obj = { name: "${name}", age: ${age} };</code>일 때, <code>JSON.stringify(obj)</code>의 결과를 그대로 쓰세요. (큰따옴표 포함)`,
            prefix: '', suffix: '', accept: [`{"name":"${name}","age":${age}}`], placeholder: '{"key":"value",...}',
            why: `JSON.stringify는 키와 문자열 값을 모두 큰따옴표로 감싸서 {"name":"${name}","age":${age}}를 만들어요.`,
            hint: 'JSON은 키와 문자열 값 모두 큰따옴표(")를 써요.'
          };
        },
        () => ({
          type: 'blank',
          q: `객체를 JSON 문자열로 바꾸는 메서드를 쓰세요.`,
          prefix: 'JSON.', suffix: '(obj)', accept: ['stringify'], placeholder: '메서드 이름',
          why: '<code>JSON.stringify(값)</code>은 값을 JSON 문자열로 바꿔줘요.',
          hint: '"문자열로 만들다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'blank',
          q: `JSON 문자열을 자바스크립트 값으로 되돌리는 메서드를 쓰세요.`,
          prefix: 'JSON.', suffix: '(text)', accept: ['parse'], placeholder: '메서드 이름',
          why: '<code>JSON.parse(문자열)</code>은 JSON 문자열을 값으로 되돌려줘요.',
          hint: '"해석하다, 분석하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'JSON을 여러 프로그래밍 언어가 함께 쓸 수 있는 이유는?',
          '특정 언어 전용이 아니라 그냥 텍스트 형식이라서', ['자바스크립트로 만든 형식이라 자바스크립트에서 제일 빨라서', '숫자만 담을 수 있는 형식이라서', '파일 크기가 항상 가장 작아서'],
          'JSON은 특정 언어의 문법이 아니라 텍스트 규칙이라서, 어떤 언어든 읽고 쓸 수 있어요.',
          '파이썬에서도 같은 이유로 JSON을 쓴다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '문자열 <code>\'{"name":"하은"}\'</code>을 <code>JSON.parse</code>로 객체로 바꾼 뒤, <code>name</code> 속성을 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'const data = JSON.parse(\'{"name":"하은"}\');\nconsole.log(data.name);',
          expectedOutput: '하은',
          why: 'JSON.parse로 문자열을 객체로 바꾸면, .name으로 그 값을 꺼낼 수 있어요.',
          hint: 'JSON.parse(문자열)로 객체를 만든 뒤 .name을 출력하세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>const obj = { name: "${name}", age: ${age} };</code>를 <code>JSON.stringify</code>한 뒤 다시 <code>JSON.parse</code>로 되돌려서 <code>result.age</code>를 확인하면 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(age)], placeholder: '숫자',
          why: `stringify로 문자열이 됐다가 parse로 다시 객체가 돼도 값은 그대로 유지돼서 age는 ${age}예요.`,
          hint: 'stringify와 parse를 거쳐도 원래 값은 그대로 보존된다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'regexJs',
      title: '정규표현식 기초',
      ready: true,
      summary: '문자열 속의 패턴을 찾아내는 정규표현식을, 자바스크립트의 test/match/replace로 다루는 법을 배워요.',
      goals: ['정규표현식 리터럴 만들기', 'test로 패턴 확인하기', 'match/replace로 찾고 바꾸기'],
      blocks: [
        {
          h: '패턴을 값으로 만들기: 정규표현식 리터럴',
          html: `<p>슬래시 두 개 사이(<code>/패턴/</code>)에 규칙을 써서 정규표현식을 만들어요. <code>\\d</code>는 숫자 하나, <code>+</code>는 "1개 이상 연속"을 뜻해요. <code>.test(문자열)</code>은 그 패턴과 맞는 부분이 있는지 <code>true</code>/<code>false</code>로 알려줘요.</p>`,
          code: {
            label: 'regex_test.js',
            src: `const pattern = /\\d+/;
console.log(pattern.test("나이는 17살"));`,
            out: `true`
          }
        },
        {
          h: '맞는 부분을 찾아내기: match',
          html: `<p><code>문자열.match(/패턴/g)</code>는 패턴과 맞는 부분을 <b>전부</b> 배열로 찾아줘요. <code>g</code>(global)를 안 붙이면 처음 하나만 찾아요.</p>`,
          code: {
            label: 'regex_match.js',
            src: `const text = "사과 10개, 바나나 20개";
const nums = text.match(/\\d+/g);
console.log(nums);`,
            out: `[ '10', '20' ]`
          }
        },
        {
          h: '패턴에 맞는 부분 바꾸기: replace',
          html: `<p><code>.replace(/패턴/g, 새값)</code>은 패턴과 맞는 부분을 새 값으로 바꿔줘요.</p>`,
          code: {
            label: 'regex_replace.js',
            src: `const text = "hi hi";
console.log(text.replace(/hi/g, "bye"));`,
            out: `bye bye`
          }
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(10, 99);
          return {
            type: 'blank',
            q: `<code>const text = "제 나이는 ${n}살이에요";</code>일 때, <code>/\\d+/.test(text)</code>의 결과는? (<code>true</code> 또는 <code>false</code>)`,
            prefix: '', suffix: '', accept: ['true'], placeholder: 'true 또는 false',
            why: `문자열 안에 숫자(${n})가 있어서 <code>\\d+</code> 패턴과 맞아 true예요.`,
            hint: '문자열 안에 연속된 숫자가 있는지 확인해보세요.'
          };
        },
        () => {
          const a = randInt(1, 30), b = randInt(1, 30);
          return {
            type: 'blank',
            q: `<code>const text = "사과 ${a}개, 바나나 ${b}개";</code>일 때, <code>text.match(/\\d+/g)</code>의 결과를 대괄호와 작은따옴표 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`[ '${a}', '${b}' ]`, `['${a}', '${b}']`], placeholder: "[ '숫자', '숫자' ]",
            why: `match는 맞는 부분을 전부(문자열로) 찾아서 [ '${a}', '${b}' ]를 돌려줘요.`,
            hint: '문자열 안의 숫자로 된 부분들을 순서대로 찾아보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `문자열 <code>"hi hi"</code> 안의 모든 <code>"hi"</code>를 <code>"bye"</code>로 바꾸는 코드를 완성하세요.`,
          prefix: '"hi hi".', suffix: '(/hi/g, "bye")', accept: ['replace'], placeholder: '메서드 이름',
          why: '<code>.replace(/hi/g, "bye")</code>는 g(전역) 옵션 덕분에 모든 "hi"를 바꿔줘요.',
          hint: '"바꾸다, 대체하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '정규표현식 뒤에 붙이는 <code>g</code> 플래그가 하는 역할은?',
          '문자열 전체에서 맞는 부분을 전부 찾도록 한다', ['대소문자를 구분하지 않게 한다', '패턴을 거꾸로 찾게 한다', '숫자만 찾게 한다'],
          '<code>g</code>(global)를 붙이면 첫 번째 하나만이 아니라 맞는 부분을 전부 찾아요.',
          '"전역(global)"이라는 뜻의 이름에서 힌트를 얻어보세요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '문자열 <code>"hello hello"</code> 안의 모든 <code>"hello"</code>를 <code>"hi"</code>로 바꿔서 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'console.log("hello hello".replace(/hello/g, "hi"));',
          expectedOutput: 'hi hi',
          why: 'g 플래그 덕분에 두 "hello" 모두 "hi"로 바뀌어서 "hi hi"가 출력돼요.',
          hint: '.replace(/hello/g, "hi")를 그대로 출력해보세요.'
        }),
      ],
      boss: () => {
        const a = randInt(10, 99), b = randInt(10, 99);
        const sum = a + b;
        return {
          type: 'blank',
          q: `<code>const text = "사과 ${a}개, 바나나 ${b}개";</code>일 때, <code>const nums = text.match(/\\d+/g).map(Number);</code> 후 <code>nums[0] + nums[1]</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `match로 찾은 문자열들을 map(Number)로 숫자로 바꿔서 더하면 ${a} + ${b} = ${sum}이에요.`,
          hint: 'match가 찾은 값은 문자열이라서, 계산하려면 숫자로 바꿔야 한다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'fetchApi',
      title: 'fetch API로 네트워크 요청',
      ready: true,
      summary: '브라우저에서 서버로 데이터를 요청하는 fetch API의 기본 사용법을 배워요. 실무 웹 개발의 기본기예요.',
      goals: ['fetch로 요청 보내기', 'response.json()으로 응답 다루기', 'async/await와 함께 쓰기'],
      blocks: [
        {
          h: '웹에서 데이터 가져오기: fetch',
          html: `<p><code>fetch(주소)</code>는 그 주소로 요청을 보내고, 응답을 <b>Promise</b>로 돌려줘요. <code>.then()</code>을 이어서 응답이 오면 할 일을 정해요.</p>`,
          code: {
            label: 'fetch_then.js',
            src: `fetch("https://api.example.com/users/1")
  .then(response => response.json())
  .then(data => console.log(data.name));`,
            out: `지수`
          }
        },
        {
          h: 'async/await와 함께 쓰기',
          html: `<p><code>.then()</code>을 여러 번 잇는 대신, <code>async</code> 함수 안에서 <code>await</code>로 훨씬 읽기 쉽게 쓸 수 있어요.</p>`,
          code: {
            label: 'fetch_async.js',
            src: `async function getUser() {
  const response = await fetch("https://api.example.com/users/1");
  const data = await response.json();
  console.log(data.name);
}

getUser();`,
            out: `지수`
          }
        },
        {
          h: '상태 코드 확인하기',
          html: `<p><code>response.ok</code>는 상태 코드가 200~299(성공) 범위면 <code>true</code>예요. <code>response.status</code>로 정확한 코드(200, 404 등)를 확인할 수 있어요.</p>`,
          after: `<div class="note"><b>주의</b> — <code>fetch</code>는 서버가 404나 500을 응답해도 <b>reject되지 않아요</b>(네트워크 자체가 실패했을 때만 reject돼요). 그래서 상태 코드는 꼭 <code>response.ok</code>로 직접 확인해야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `주소로 네트워크 요청을 보내는 브라우저 내장 함수 이름을 쓰세요.`,
          prefix: '', suffix: '("https://api.example.com")', accept: ['fetch'], placeholder: '함수 이름',
          why: '<code>fetch(주소)</code>로 요청을 보내고 응답을 Promise로 돌려받아요.',
          hint: '"가져오다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'blank',
          q: `응답 <code>response</code>가 JSON 형식일 때, 이를 자바스크립트 값으로 바꿔주는(Promise를 반환하는) 메서드를 쓰세요.`,
          prefix: 'const data = await response.', suffix: '();', accept: ['json'], placeholder: '메서드 이름',
          why: '<code>response.json()</code>은 응답 본문을 JSON으로 해석해서 값으로 돌려줘요.',
          hint: '응답 형식의 이름을 그대로 쓰는 메서드예요.'
        }),
        () => makeChoice(
          '<code>response.ok</code>가 <code>true</code>일 조건은?',
          '상태 코드가 200~299 범위일 때', ['상태 코드가 무조건 200일 때', '응답이 JSON 형식일 때', '요청이 1초 안에 끝났을 때'],
          '<code>response.ok</code>는 상태 코드가 200~299(성공 범위)일 때 true예요.',
          '"성공"으로 취급되는 상태 코드의 범위를 떠올려보세요.'
        ),
        () => makeChoice(
          'fetch가 서버로부터 404 응답을 받았을 때 벌어지는 일은?',
          'Promise는 성공(resolve)하고, response.ok가 false가 된다', ['Promise가 실패(reject)한다', '자동으로 재시도한다', '아무 응답도 안 온다'],
          'fetch는 네트워크 자체가 끊기는 등의 문제일 때만 reject돼요. 404, 500 같은 응답도 "정상적으로 받은 응답"이라 resolve되고, 대신 response.ok가 false가 돼요.',
          '"응답을 받긴 받았다"는 점과 "그 응답 내용이 성공인지"는 별개라는 걸 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"https://api.example.com/ping"</code>에 <code>fetch</code>로 요청을 보내고, <code>response.ok</code>가 true면 <code>"성공"</code>을, 아니면 <code>"실패"</code>를 출력하는 <code>async function checkPing()</code> 함수를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: 'async function checkPing() {\n  const response = await fetch("https://api.example.com/ping");\n  if (response.ok) {\n    console.log("성공");\n  } else {\n    console.log("실패");\n  }\n}',
          accept: ['async function checkPing() {\n  const response = await fetch("https://api.example.com/ping");\n  if (response.ok) {\n    console.log("성공");\n  } else {\n    console.log("실패");\n  }\n}'],
          why: 'await fetch()로 응답을 받은 뒤, response.ok로 성공 여부를 확인해요.',
          hint: 'async function checkPing() { } 안에서 await fetch(...)로 응답을 받고, if (response.ok)로 분기하세요.'
        }),
      ],
      boss: () => ({
        type: 'code',
        q: '<code>"https://api.example.com/users/1"</code>에 <code>fetch</code>로 요청을 보내고, 응답을 <code>.json()</code>으로 바꾼 뒤 <code>data.name</code>을 출력하는 코드를 <code>.then()</code> 체인(async/await 없이)으로 작성하세요.',
        starter: '',
        rows: 3,
        placeholder: 'fetch("https://api.example.com/users/1")\n  .then(response => response.json())\n  .then(data => console.log(data.name));',
        accept: ['fetch("https://api.example.com/users/1")\n  .then(response => response.json())\n  .then(data => console.log(data.name));'],
        why: '첫 번째 then에서 응답을 JSON으로 바꾸고, 두 번째 then에서 그 데이터의 name을 출력해요.',
        hint: 'fetch(...) 뒤에 .then(response => response.json())을 잇고, 그 뒤에 .then(data => console.log(data.name))을 이으세요.'
      })
    },
    {
      id: 'webStorage',
      title: 'localStorage와 sessionStorage',
      ready: true,
      summary: '브라우저에 값을 저장해두는 localStorage와 sessionStorage를 배워요. 이 사이트도 실제로 진도를 저장할 때 이 방법을 써요.',
      goals: ['localStorage.setItem/getItem', 'JSON으로 객체 저장하기', 'localStorage vs sessionStorage'],
      blocks: [
        {
          h: '브라우저에 값을 저장해두기: localStorage',
          html: `<p><code>localStorage.setItem(키, 값)</code>으로 값을 저장하고, <code>localStorage.getItem(키)</code>로 꺼내요. 이렇게 저장한 값은 브라우저를 껐다 켜도, 페이지를 새로고침해도 <b>직접 지우기 전까지</b> 계속 남아있어요.</p>`,
          code: {
            label: 'storage_basic.js',
            src: `localStorage.setItem("username", "지수");
console.log(localStorage.getItem("username"));`,
            out: `지수`
          }
        },
        {
          h: '객체도 저장하려면: JSON으로 바꿔서',
          html: `<p>localStorage는 <b>문자열만</b> 저장할 수 있어요. 객체를 저장하려면 <code>JSON.stringify</code>로 문자열로 바꿔 저장하고, 꺼낼 때 <code>JSON.parse</code>로 다시 객체로 되돌려요.</p>`,
          code: {
            label: 'storage_object.js',
            src: `const user = { name: "지수", age: 17 };
localStorage.setItem("user", JSON.stringify(user));

const saved = JSON.parse(localStorage.getItem("user"));
console.log(saved.age);`,
            out: `17`
          },
          after: `<div class="note"><b>실제 예</b> — 이 사이트도 여러분의 학습 진도를 정확히 이 방식(객체를 JSON.stringify해서 localStorage에 저장)으로 기록해요.</div>`
        },
        {
          h: 'localStorage vs sessionStorage',
          html: `<p><code>sessionStorage</code>는 <code>localStorage</code>와 사용법이 완전히 같지만, <b>그 탭을 닫으면 사라져요</b>. "이 브라우저 탭에서만 잠깐 필요한 값"에는 sessionStorage를, "다음에 또 와도 남아있어야 할 값"에는 localStorage를 써요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `localStorage에 값을 저장하는 메서드 이름을 쓰세요.`,
          prefix: 'localStorage.', suffix: '("username", "지수")', accept: ['setItem'], placeholder: '메서드 이름',
          why: '<code>setItem(키, 값)</code>으로 값을 저장해요.',
          hint: '"항목을 설정하다"라는 뜻이 합쳐진 이름이에요.'
        }),
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>localStorage.setItem("username", "${name}");</code> 후 <code>localStorage.getItem("username")</code>의 값은? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [name], placeholder: '값',
            why: `저장한 값 그대로 "${name}"이 나와요.`,
            hint: 'setItem으로 넣은 값을 getItem으로 그대로 꺼내요.'
          };
        },
        () => makeChoice(
          '객체를 localStorage에 저장하려면 먼저 무엇을 해야 할까요?',
          'JSON.stringify로 문자열로 바꾼다', ['그냥 객체를 그대로 넘긴다', 'Array.from으로 바꾼다', '아무 것도 안 해도 된다'],
          'localStorage는 문자열만 저장할 수 있어서, 객체는 JSON.stringify로 문자열로 바꿔야 해요.',
          '문자열이 아닌 값을 그대로 setItem에 넣으면 이상한 문자열로 저장돼요.'
        ),
        () => makeChoice(
          '브라우저 탭을 닫으면 사라지는 저장소는?',
          'sessionStorage', ['localStorage', '둘 다 안 사라진다', '둘 다 새로고침만 해도 사라진다'],
          '<code>sessionStorage</code>는 탭을 닫으면 사라지고, <code>localStorage</code>는 직접 지우기 전까지 남아있어요.',
          '"세션(session)"이라는 이름처럼, 그 사용 기간(탭이 열려있는 동안) 동안만 유지돼요.'
        ),
        () => ({
          type: 'code',
          q: '객체 <code>{ theme: "dark" }</code>를 <code>JSON.stringify</code>해서 <code>"settings"</code>라는 키로 localStorage에 저장하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'localStorage.setItem("settings", JSON.stringify({ theme: "dark" }));',
          accept: ['localStorage.setItem("settings", JSON.stringify({ theme: "dark" }));'],
          why: 'JSON.stringify로 객체를 문자열로 바꾼 뒤 setItem으로 저장해요.',
          hint: 'localStorage.setItem("settings", JSON.stringify({ ... }))를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const theme = pick(['dark', 'light']);
        const fontSize = randInt(12, 20);
        return {
          type: 'blank',
          q: `<code>localStorage.setItem("settings", JSON.stringify({ theme: "${theme}", fontSize: ${fontSize} }));</code> 후 <code>JSON.parse(localStorage.getItem("settings")).fontSize</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(fontSize)], placeholder: '숫자',
          why: `저장했다가 JSON.parse로 되돌려도 fontSize 값은 그대로 ${fontSize}예요.`,
          hint: 'stringify로 저장했다가 parse로 되돌려도 값은 그대로 유지된다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'promiseAll',
      title: '여러 비동기 작업 한 번에 처리하기: Promise.all',
      ready: true,
      summary: '여러 개의 비동기 작업을 동시에 시작해서 한꺼번에 기다리는 Promise.all과 allSettled를 배워요.',
      goals: ['Promise.all로 동시에 기다리기', 'Promise.allSettled로 실패해도 계속 진행하기', '동시 실행이 빠른 이유'],
      blocks: [
        {
          h: '여러 작업을 동시에 기다리기: Promise.all',
          html: `<p><code>await 작업1(); await 작업2();</code>처럼 하나씩 순서대로 기다리면 시간이 더해져요. <code>Promise.all([작업1, 작업2])</code>은 둘을 <b>동시에</b> 시작시키고, 모두 끝나면 결과를 배열로 돌려줘요.</p>`,
          code: {
            label: 'promise_all.js',
            src: `function delay(ms, value) {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

async function run() {
  const results = await Promise.all([delay(1000, "A"), delay(2000, "B")]);
  console.log(results);
}

run();`,
            out: `(2초 후) [ 'A', 'B' ]`
          },
          after: `<div class="note"><b>속도 차이</b> — 순서대로 기다렸다면 1초+2초=3초가 걸렸겠지만, <code>Promise.all</code>은 동시에 시작해서 <b>더 오래 걸리는 쪽(2초)</b>만 걸려요.</div>`
        },
        {
          h: '하나가 실패해도 나머지는 계속: Promise.allSettled',
          html: `<p><code>Promise.all</code>은 여러 작업 중 <b>하나라도 실패(reject)하면 즉시 전체가 실패</b>로 끝나요. 실패한 것과 성공한 것을 <b>모두 확인하고 싶다면</b> <code>Promise.allSettled</code>를 써요. 각 결과를 <code>{ status: "fulfilled"/"rejected", ... }</code> 형태로 전부 모아줘요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const d1 = pick([1, 2, 3]);
          const d2 = pick([1, 2, 3]);
          const total = Math.max(d1, d2);
          return {
            type: 'blank',
            q: `<code>Promise.all([delay(${d1 * 1000}, "A"), delay(${d2 * 1000}, "B")])</code>을 <code>await</code>하면 총 몇 초쯤 걸릴까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
            why: `동시에 시작하니, 더 오래 걸리는 ${total}초만 걸려요.`,
            hint: '둘 중 더 오래 걸리는 작업의 시간만큼만 기다리면 돼요.'
          };
        },
        () => ({
          type: 'blank',
          q: `여러 Promise를 동시에 시작시키고 모두 끝나면 결과를 배열로 돌려주는 메서드를 쓰세요.`,
          prefix: 'Promise.', suffix: '([task1, task2])', accept: ['all'], placeholder: '메서드 이름',
          why: '<code>Promise.all(배열)</code>은 여러 Promise를 동시에 처리해요.',
          hint: '"모두"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>Promise.all</code>에 넘긴 여러 작업 중 하나가 실패(reject)하면?',
          '즉시 전체가 실패로 끝난다', ['그 작업만 무시하고 나머지 결과를 돌려준다', '자동으로 다시 시도한다', '아무 일도 일어나지 않는다'],
          '<code>Promise.all</code>은 하나라도 실패하면 즉시 전체가 실패로 처리돼요.',
          '"all"이라는 이름처럼, 전부 성공해야만 성공으로 끝난다는 걸 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `일부가 실패해도 모든 작업의 성공/실패 결과를 각각 확인하고 싶을 때 쓰는 메서드를 쓰세요.`,
          prefix: 'Promise.', suffix: '([task1, task2])', accept: ['allSettled'], placeholder: '메서드 이름',
          why: '<code>Promise.allSettled</code>는 성공/실패와 상관없이 모든 결과를 다 모아줘요.',
          hint: '"모두 정착되다, 결론지어지다"라는 뜻의 단어가 들어가요.'
        }),
        () => ({
          type: 'code',
          q: '<code>delay(ms, value)</code> 함수(이미 있다고 가정)로 만든 두 작업 <code>delay(1000, "A")</code>와 <code>delay(2000, "B")</code>를 <code>Promise.all</code>로 동시에 기다린 뒤 결과를 <code>console.log</code>하는 <code>async function run()</code>을 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'async function run() {\n  const results = await Promise.all([delay(1000, "A"), delay(2000, "B")]);\n  console.log(results);\n}',
          accept: ['async function run() {\n  const results = await Promise.all([delay(1000, "A"), delay(2000, "B")]);\n  console.log(results);\n}'],
          why: 'Promise.all([...])을 await하면 두 작업이 모두 끝난 결과를 배열로 받아요.',
          hint: 'await Promise.all([delay(1000, "A"), delay(2000, "B")])의 결과를 변수에 담아 출력하세요.'
        }),
      ],
      boss: () => {
        const delays = [pick([1, 2]), pick([1, 3]), pick([2, 3])];
        const total = Math.max(...delays);
        return {
          type: 'blank',
          q: `세 작업의 대기 시간이 각각 ${delays.join('초, ')}초일 때, <code>Promise.all</code>로 셋을 동시에 처리하면 총 몇 초쯤 걸릴까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
          why: `동시에 처리하면 셋 중 가장 오래 걸리는 ${total}초만 걸려요.`,
          hint: '여러 작업을 동시에 처리하면, 가장 오래 걸리는 작업의 시간이 전체 시간이 돼요.'
        };
      }
    },
    {
      id: 'generatorsIterators',
      title: '제너레이터와 이터레이터',
      ready: true,
      summary: '값을 한 번에 다 만들지 않고 하나씩 내놓는 제너레이터와, for...of가 실제로 동작하는 원리를 배워요.',
      goals: ['function*와 yield', 'next()로 값 하나씩 꺼내기', 'for...of로 순회하기'],
      blocks: [
        {
          h: '값을 하나씩 만들어내는 함수: 제너레이터',
          html: `<p><code>function*</code>로 만든 함수는 <b>제너레이터</b>예요. <code>yield</code>를 만나면 값을 하나 내놓고 그 자리에서 멈췄다가, 다시 필요해지면 이어서 실행돼요.</p>`,
          code: {
            label: 'generator_basic.js',
            src: `function* countUp(n) {
  for (let i = 1; i <= n; i++) {
    yield i;
  }
}

for (const num of countUp(3)) {
  console.log(num);
}`,
            out: `1\n2\n3`
          }
        },
        {
          h: '수동으로 하나씩 꺼내기: next()',
          html: `<p>제너레이터가 반환하는 객체는 <code>.next()</code>를 부를 때마다 <code>{ value: 값, done: 끝났는지 }</code> 형태의 결과를 줘요.</p>`,
          code: {
            label: 'generator_next.js',
            src: `const gen = countUp(2);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().done);`,
            out: `1\n2\ntrue`
          }
        },
        {
          h: 'for...of가 실제로 하는 일',
          html: `<p><code>for...of</code>는 내부적으로 <code>.next()</code>를 계속 불러서 값을 꺼내다가, <code>done</code>이 <code>true</code>가 되면 반복을 멈춰요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 5);
          const nums = Array.from({ length: n }, (_, i) => i + 1);
          return {
            type: 'blank',
            q: `<code>function* countUp(n) { for (let i = 1; i &lt;= n; i++) yield i; }</code>일 때, <code>for (const num of countUp(${n})) console.log(num);</code>을 실행하면 순서대로 무엇이 출력될까요? 쉼표로 구분해서 쓰세요.`,
            prefix: '', suffix: '', accept: [nums.join(', '), nums.join(',')], placeholder: '숫자, 숫자, ...',
            why: `1부터 ${n}까지 하나씩 yield해서 ${nums.join(', ')}이 순서대로 출력돼요.`,
            hint: '1부터 n까지 순서대로 하나씩 내놓는다는 걸 떠올려보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `제너레이터 함수를 만들 때 <code>function</code> 뒤에 붙이는 기호를 쓰세요.`,
          prefix: 'function', suffix: ' countUp(n) { ... }', accept: ['*'], placeholder: '기호',
          why: '<code>function*</code>로 제너레이터 함수를 만들어요.',
          hint: '곱셈에도 쓰이는 별표 기호예요.'
        }),
        () => {
          const n = randInt(2, 4);
          return {
            type: 'blank',
            q: `<code>const gen = countUp(${n});</code>일 때, <code>gen.next().value</code>를 처음 호출하면 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: ['1'], placeholder: '숫자',
            why: '제너레이터는 항상 처음부터 시작해서, 첫 next() 호출은 1을 내놓아요.',
            hint: 'countUp은 항상 1부터 시작해서 하나씩 늘어난다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          '<code>for (const x of gen)</code>이 반복을 멈추는 시점은?',
          '<code>gen.next()</code>의 결과에서 <code>done</code>이 <code>true</code>가 될 때',
          ['gen.next()를 정확히 10번 부른 뒤', 'yield가 한 번이라도 실행되면', '항상 3번 반복 후'],
          'for...of는 내부적으로 done이 true가 될 때까지 next()를 계속 불러요.',
          '제너레이터가 "더 이상 내놓을 값이 없다"는 걸 어떻게 알려주는지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '1부터 3까지의 제곱(1, 4, 9)을 하나씩 yield하는 제너레이터 함수 <code>squares()</code>를 만들고, <code>for...of</code>로 순회하며 각 값을 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'function* squares() {\n  for (let i = 1; i <= 3; i++) {\n    yield i * i;\n  }\n}\nfor (const n of squares()) {\n  console.log(n);\n}',
          expectedOutput: '1\n4\n9',
          why: '1, 2, 3의 제곱을 순서대로 yield해서 1, 4, 9가 출력돼요.',
          hint: 'function* squares() { } 안에서 for문으로 i * i를 yield하고, for...of로 순회하며 출력하세요.'
        }),
      ],
      boss: () => {
        const n = randInt(3, 5);
        const nums = Array.from({ length: n }, (_, i) => (i + 1) * (i + 1));
        return {
          type: 'blank',
          q: `<code>function* squares(n) { for (let i = 1; i &lt;= n; i++) yield i * i; }</code>일 때, <code>[...squares(${n})]</code>의 값은? 대괄호 포함해서 쓰세요.`,
          prefix: '', suffix: '', accept: [`[${nums.join(', ')}]`], placeholder: '[숫자, ...]',
          why: `<code>[...제너레이터]</code>는 제너레이터가 내놓는 모든 값을 배열로 모아서 [${nums.join(', ')}]이 돼요.`,
          hint: '스프레드 연산자는 제너레이터도 순회하면서 모든 값을 배열로 모을 수 있어요.'
        };
      }
    },
    {
      id: 'prototypeChain',
      title: '프로토타입 체인',
      ready: true,
      summary: 'JS의 객체지향이 실제로는 어떻게 동작하는지, 프로토타입 체인의 원리와 class 문법과의 관계를 배워요.',
      goals: ['프로토타입이란 무엇인지', 'prototype에 메서드 추가하기', 'class는 프로토타입 위의 문법적 설탕'],
      blocks: [
        {
          h: '메서드는 어디서 찾아올까요: 프로토타입',
          html: `<p>모든 객체는 <b>프로토타입</b>이라는 "부모 같은 객체"를 가지고 있어요. 객체 자신에게 없는 속성/메서드를 쓰려고 하면, 자바스크립트는 자동으로 그 프로토타입에서 찾아줘요.</p>`,
          code: {
            label: 'proto_basic.js',
            src: `const obj = {};
console.log(obj.toString());`,
            out: `[object Object]`
          },
          after: `<div class="note"><b>신기한 점</b> — <code>obj</code>는 <code>toString</code>을 직접 만든 적이 없어요. <code>Object.prototype</code>에 있는 <code>toString</code>을 자동으로 찾아 쓴 거예요.</div>`
        },
        {
          h: '프로토타입에 메서드 추가하기',
          html: `<p><code>생성자함수.prototype.메서드 = function() {...}</code>처럼 프로토타입에 메서드를 붙이면, 그 생성자로 만든 <b>모든 객체가 그 메서드를 공유</b>해서 써요. 객체마다 똑같은 메서드를 따로 만들지 않아도 돼서 메모리를 아껴요.</p>`,
          code: {
            label: 'proto_method.js',
            src: `function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return \`\${this.name}가 소리를 내요\`;
};

const dog = new Animal("멍멍이");
console.log(dog.speak());`,
            out: `멍멍이가 소리를 내요`
          }
        },
        {
          h: 'class 문법은 사실 프로토타입 위에 만들어졌어요',
          html: `<p><code>class</code> 안에 쓴 메서드도, 내부적으로는 <b>자동으로 prototype에 저장</b>돼요. 즉 <code>class</code> 문법은 완전히 새로운 기능이 아니라, 프로토타입 방식을 더 쉽게 쓸 수 있게 해주는 "문법적 설탕"이에요.</p>`,
          code: {
            label: 'proto_class.js',
            src: `class Animal2 {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return \`\${this.name}가 소리를 내요\`;
  }
}

console.log(typeof Animal2.prototype.speak);`,
            out: `function`
          }
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['멍멍이', '야옹이', '짹짹이']);
          return {
            type: 'blank',
            q: `<code>Animal.prototype.speak</code>가 <code>\`\${this.name}가 소리를 내요\`</code>를 반환할 때, <code>new Animal("${name}").speak()</code>의 결과는?`,
            prefix: '', suffix: '', accept: [`${name}가 소리를 내요`], placeholder: '값',
            why: `this.name이 "${name}"이라서 "${name}가 소리를 내요"가 돼요.`,
            hint: 'this.name 자리에 넘긴 이름이 그대로 들어간다는 걸 떠올려보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `생성자 함수 <code>Animal</code>로 만든 모든 객체가 공유하는 메서드를 추가하려면, 어디에 붙여야 할까요? (<code>Animal.${'{여기}'}.speak = function() {...}</code>)`,
          prefix: 'Animal.', suffix: '.speak = function () { ... };', accept: ['prototype'], placeholder: '단어',
          why: '<code>Animal.prototype</code>에 메서드를 붙이면, Animal로 만든 모든 객체가 그 메서드를 공유해요.',
          hint: '"원형, 시제품"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'class 문법으로 만든 메서드는 실제로 어디에 저장될까요?',
          '그 클래스의 prototype', ['각 객체 자신에게 개별적으로', 'window 객체에', '어디에도 저장 안 되고 그때그때 계산됨'],
          'class 안의 메서드도 사실은 자동으로 prototype에 저장돼요. class는 프로토타입 방식을 편하게 쓰는 문법일 뿐이에요.',
          '"문법적 설탕"이라는 표현이 뜻하는 게 뭔지 생각해보세요 — 겉모습만 다르고 원리는 같다는 뜻이에요.'
        ),
        () => makeChoice(
          '객체 자신에게 없는 메서드를 호출했을 때 자바스크립트가 하는 일은?',
          '그 객체의 프로토타입에서 그 메서드를 찾아본다', ['바로 오류를 낸다', '자동으로 빈 함수를 만들어 실행한다', 'undefined를 그냥 반환한다'],
          '자바스크립트는 객체 자신에게 없으면 프로토타입에서, 그래도 없으면 그 프로토타입의 프로토타입에서... 계속 찾아요(프로토타입 체인).',
          '<code>obj.toString()</code>이 obj 자신에게 없어도 동작했던 이유를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '생성자 함수 <code>Person(name)</code>을 만들어 <code>this.name = name</code>을 저장하고, <code>Person.prototype.greet</code>이 <code>`안녕, ${this.name}`</code>을 반환하도록 만든 뒤, <code>new Person("하은").greet()</code>을 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: 'function Person(name) {\n  this.name = name;\n}\nPerson.prototype.greet = function () {\n  return `안녕, ${this.name}`;\n};\nconsole.log(new Person("하은").greet());',
          expectedOutput: '안녕, 하은',
          why: 'prototype에 붙인 greet 메서드는 Person으로 만든 모든 객체가 쓸 수 있어요.',
          hint: 'Person.prototype.greet = function() { return `안녕, ${this.name}`; };을 쓴 뒤 호출하세요.'
        }),
      ],
      boss: () => {
        const name1 = pick(['멍멍이', '야옹이']);
        const name2 = pick(['짹짹이', '음메']);
        return {
          type: 'blank',
          q: `<code>Animal.prototype.speak</code>이 <code>\`\${this.name}가 소리를 내요\`</code>를 반환할 때, <code>new Animal("${name1}").speak()</code>와 <code>new Animal("${name2}").speak()</code>가 <b>같은 함수(prototype의 speak)</b>를 공유해서 쓴다는 걸 확인하는 <code>Animal.prototype.speak === Animal.prototype.speak</code>의 결과는? (<code>true</code> 또는 <code>false</code>)`,
          prefix: '', suffix: '', accept: ['true'], placeholder: 'true 또는 false',
          why: `prototype의 메서드는 단 하나만 만들어져서 모든 인스턴스가 공유하니, 자기 자신과 비교하면 항상 true예요.`,
          hint: 'prototype에 붙인 메서드는 인스턴스마다 새로 만들어지는 게 아니라 하나를 공유한다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'npmPackages',
      title: 'npm과 package.json',
      ready: true,
      summary: '프로젝트 정보와 설치한 패키지 목록을 담는 package.json, 그리고 패키지를 설치하는 npm의 기본을 배워요.',
      goals: ['package.json이 뭔지', 'npm install로 패키지 설치하기', 'dependencies vs devDependencies'],
      blocks: [
        {
          h: '프로젝트 정보를 담은 파일: package.json',
          html: `<p><code>package.json</code>은 프로젝트 이름, 버전, 그리고 <b>이 프로젝트가 필요로 하는 패키지 목록</b>을 담고 있는 파일이에요. 다른 컴퓨터에서 이 파일만 있으면 필요한 패키지를 그대로 재현할 수 있어요.</p>`,
          code: {
            label: 'package.json',
            src: `{
  "name": "my-app",
  "version": "1.0.0",
  "dependencies": {
    "lodash": "^4.17.21"
  }
}`
          }
        },
        {
          h: '패키지 설치하기: npm install',
          html: `<p><code>npm install 패키지이름</code>으로 패키지를 설치해요. <code>--save-dev</code>를 붙이면, 실제 서비스에는 필요 없고 <b>개발할 때만</b> 필요한 패키지(테스트 도구 등)로 표시돼요.</p>`,
          code: {
            label: 'terminal',
            lang: 'bash',
            src: `npm install lodash
npm install --save-dev jest`
          }
        },
        {
          h: 'dependencies vs devDependencies',
          html: `<p><code>dependencies</code>는 실제 서비스가 동작하는 데 꼭 필요한 패키지(예: lodash), <code>devDependencies</code>는 개발·테스트할 때만 필요한 패키지(예: jest)예요. <code>--save-dev</code>로 설치하면 devDependencies 쪽에 기록돼요.</p>`,
          after: `<div class="note"><b>기억하기</b> — Python의 <code>requirements.txt</code>와 비슷한 역할을, 자바스크립트/Node.js 세계에서는 <code>package.json</code>이 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const pkg = pick(['lodash', 'axios', 'dayjs']);
          return {
            type: 'blank',
            q: `<code>${pkg}</code> 패키지를 설치하는 명령어를 쓰세요.`,
            prefix: '', suffix: ` ${pkg}`, accept: ['npm install'], placeholder: '명령어',
            why: `<code>npm install ${pkg}</code>로 패키지를 설치해요.`,
            hint: 'npm 뒤에 "설치하다"라는 뜻의 영어 단어를 쓰세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `개발/테스트할 때만 필요한 패키지로 표시해서 설치하는 옵션을 쓰세요.`,
          prefix: 'npm install ', suffix: ' jest', accept: ['--save-dev'], placeholder: '옵션',
          why: '<code>--save-dev</code>를 붙이면 devDependencies에 기록돼요.',
          hint: '"개발용으로 저장한다"는 뜻이 담긴 옵션이에요.'
        }),
        () => makeChoice(
          '실제 서비스 운영 중에도 꼭 필요한 패키지(예: lodash)가 들어가는 항목은?',
          'dependencies', ['devDependencies', 'scripts', 'name'],
          '서비스가 동작하는 데 꼭 필요한 패키지는 dependencies에 들어가요.',
          '"의존성"이라는 뜻 그대로, 서비스가 의존하는 패키지예요.'
        ),
        () => makeChoice(
          '테스트 도구(예: jest)처럼 개발할 때만 필요한 패키지가 들어가는 항목은?',
          'devDependencies', ['dependencies', 'version', 'main'],
          '개발/테스트 전용 패키지는 devDependencies에 들어가서, 실제 서비스 배포 시엔 설치 안 해도 돼요.',
          '"dev"가 "개발(development)"의 줄임말이라는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"my-app"</code>이라는 이름과 <code>"1.0.0"</code> 버전을 가진 <code>package.json</code>의 최소 내용을 작성하세요. (JSON 형식)',
          starter: '',
          rows: 4,
          placeholder: '{\n  "name": "my-app",\n  "version": "1.0.0"\n}',
          accept: ['{\n  "name": "my-app",\n  "version": "1.0.0"\n}'],
          why: 'package.json은 최소한 name과 version을 담은 JSON 객체예요.',
          hint: '{ "name": "my-app", "version": "1.0.0" } 형태로 쓰세요.'
        }),
      ],
      boss: () => {
        const isDev = Math.random() < 0.5;
        const pkg = isDev ? pick(['jest', 'eslint']) : pick(['lodash', 'axios']);
        return {
          type: 'blank',
          q: `<code>${pkg}</code>는 ${isDev ? '테스트/코드 검사 도구' : '실제 서비스 로직에서 쓰이는 패키지'}예요. package.json의 어느 항목에 들어가야 할까요?`,
          prefix: '', suffix: '', accept: [isDev ? 'devDependencies' : 'dependencies'], placeholder: '항목 이름',
          why: isDev ? `${pkg}는 개발/테스트 전용이라 devDependencies에 들어가요.` : `${pkg}는 서비스 운영에도 필요해서 dependencies에 들어가요.`,
          hint: '실제 서비스 운영에도 필요한지, 개발 중에만 필요한지를 구분해보세요.'
        };
      }
    },
    {
      id: 'nodeFs',
      title: 'Node.js로 파일 다루기: fs 모듈',
      ready: true,
      summary: 'Node.js 환경에서 파일을 읽고 쓰는 fs 모듈의 기본과, 동기/비동기 버전의 차이를 배워요.',
      goals: ['fs.readFileSync로 파일 읽기', 'fs.writeFileSync로 파일 쓰기', '동기 vs 비동기 버전'],
      blocks: [
        {
          h: '파일 읽기: fs.readFileSync',
          html: `<p>브라우저의 자바스크립트는 보안상 컴퓨터의 파일을 직접 못 읽지만, <b>Node.js</b>(서버·터미널에서 실행되는 자바스크립트)는 <code>fs</code>(file system) 모듈로 파일을 읽고 쓸 수 있어요.</p>`,
          code: {
            label: 'read_file.js',
            src: `const fs = require("fs");
const content = fs.readFileSync("data.txt", "utf-8");
console.log(content);`
          }
        },
        {
          h: '파일 쓰기: fs.writeFileSync',
          html: `<p><code>fs.writeFileSync(파일이름, 내용)</code>으로 파일에 내용을 써요.</p>`,
          code: {
            label: 'write_file.js',
            src: `fs.writeFileSync("output.txt", "안녕하세요");`
          }
        },
        {
          h: '동기 vs 비동기: 이름에 Sync가 붙은 이유',
          html: `<p><code>readFileSync</code>는 파일을 <b>다 읽을 때까지 코드가 멈춰서 기다리는</b> 동기 버전이에요. 이름에 <code>Sync</code>가 없는 <code>fs.readFile</code>은 콜백을 쓰는 비동기 버전이라, 파일을 읽는 동안에도 다른 코드가 계속 실행돼요. 서버처럼 동시에 여러 요청을 처리해야 하는 곳에서는 보통 비동기 버전을 써요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `Node.js에서 파일 시스템 기능을 가져오는 코드를 완성하세요.`,
          prefix: 'const fs = ', suffix: '("fs");', accept: ['require'], placeholder: '함수 이름',
          why: 'Node.js에서는 <code>require("fs")</code>로 파일 시스템 모듈을 가져와요.',
          hint: 'CommonJS 모듈을 가져올 때 쓰는 함수예요.'
        }),
        () => ({
          type: 'blank',
          q: `<code>"data.txt"</code> 파일을 utf-8로 동기적으로 읽는 메서드를 쓰세요.`,
          prefix: 'fs.', suffix: '("data.txt", "utf-8")', accept: ['readFileSync'], placeholder: '메서드 이름',
          why: '<code>fs.readFileSync(파일이름, 인코딩)</code>은 파일 내용을 동기적으로 읽어와요.',
          hint: '"파일을 읽는다(readFile)" + "동기(Sync)"가 합쳐진 이름이에요.'
        }),
        () => makeChoice(
          '<code>fs.readFileSync</code>와 <code>fs.readFile</code>의 차이는?',
          'Sync는 다 읽을 때까지 코드가 멈춰서 기다리고, 없는 쪽은 콜백으로 비동기 처리한다',
          ['Sync가 항상 더 빠르다', 'readFile은 텍스트만, readFileSync는 이미지도 읽는다', '차이가 전혀 없다'],
          'Sync가 붙으면 동기(멈춰서 기다림), 안 붙으면 비동기(콜백으로 나중에 처리)예요.',
          '이름의 "Sync"가 무엇을 뜻하는지 생각해보세요.'
        ),
        () => makeChoice(
          '서버처럼 여러 요청을 동시에 처리해야 하는 상황에서 보통 선호되는 방식은?',
          '비동기 버전(fs.readFile)', ['동기 버전(fs.readFileSync)', '둘 다 안 쓰고 매번 새로 만든다', '상관없다'],
          '동기 버전은 파일을 읽는 동안 전체가 멈춰서, 여러 요청을 동시에 처리해야 하는 서버에는 비동기 버전이 더 적합해요.',
          '동기 버전이 "멈춰서 기다린다"는 점이 여러 요청 처리에 불리하다는 걸 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"log.txt"</code> 파일에 <code>"기록 완료"</code>라는 내용을 쓰는 코드를 작성하세요. (const fs = require("fs")는 이미 되어 있다고 가정)',
          starter: '',
          placeholder: 'fs.writeFileSync("log.txt", "기록 완료");',
          accept: ['fs.writeFileSync("log.txt", "기록 완료");'],
          why: '<code>fs.writeFileSync(파일이름, 내용)</code>으로 파일에 내용을 써요.',
          hint: 'fs.writeFileSync("log.txt", "기록 완료");를 그대로 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        'Node.js 서버가 수백 개의 요청을 동시에 처리해야 할 때, 매 요청마다 큰 파일을 <code>readFileSync</code>로 읽으면 생기는 문제는?',
        '한 요청이 파일을 읽는 동안 다른 모든 요청이 멈춰서 기다려야 한다',
        ['파일이 손상된다', '메모리를 더 많이 써서 서버가 느려질 뿐 다른 요청엔 영향 없다', '아무 문제도 없다'],
        'readFileSync는 동기적으로 동작해서, 그 작업이 끝날 때까지 서버 전체가 다른 요청을 처리하지 못하고 멈춰요.',
        '동기 작업 하나가 전체 서버를 "막아버릴" 수 있다는 점을 생각해보세요.'
      )
    },
    {
      id: 'nodePath',
      title: 'Node.js path 모듈',
      ready: true,
      summary: '운영체제마다 다른 경로 구분자 문제 없이 안전하게 파일 경로를 다루는 Node.js의 path 모듈을 배워요.',
      goals: ['path.join으로 경로 합치기', 'path.basename/extname으로 이름·확장자 꺼내기'],
      blocks: [
        {
          h: '운영체제 상관없이 경로 합치기: path.join',
          html: `<p>윈도우는 <code>\\</code>, macOS/리눅스는 <code>/</code>를 경로 구분자로 써요. <code>path.join(...)</code>은 이 차이를 신경 쓰지 않고 알아서 올바른 구분자로 경로를 합쳐줘요.</p>`,
          code: {
            label: 'path_join.js',
            src: `const path = require("path");
const filePath = path.join("data", "students.txt");
console.log(filePath);`,
            out: `data/students.txt`
          }
        },
        {
          h: '파일 이름과 확장자 꺼내기',
          html: `<p><code>path.basename(경로)</code>는 파일 이름(확장자 포함)을, <code>path.extname(경로)</code>는 확장자만 꺼내줘요.</p>`,
          code: {
            label: 'path_parts.js',
            src: `console.log(path.basename("data/report.txt"));
console.log(path.extname("data/report.txt"));`,
            out: `report.txt\n.txt`
          }
        }
      ],
      quizGenerators: [
        () => {
          const stem = pick(['scores', 'notes', 'log']);
          const ext = pick(['.csv', '.txt', '.json']);
          return {
            type: 'blank',
            q: `<code>path.basename("archive/2026/${stem}${ext}")</code>의 결과는?`,
            prefix: '', suffix: '', accept: [`${stem}${ext}`], placeholder: '값',
            why: `<code>basename</code>은 경로의 맨 마지막 부분(파일 이름)만 꺼내서 "${stem}${ext}"가 돼요.`,
            hint: '경로 중 폴더 이름들은 빼고, 맨 뒤의 파일 이름만 남긴다는 걸 떠올려보세요.'
          };
        },
        () => {
          const stem = pick(['scores', 'notes', 'log']);
          const ext = pick(['.csv', '.txt', '.json']);
          return {
            type: 'blank',
            q: `<code>path.extname("archive/2026/${stem}${ext}")</code>의 결과는? (점 포함)`,
            prefix: '', suffix: '', accept: [ext], placeholder: '.확장자',
            why: `<code>extname</code>은 확장자만 꺼내서 "${ext}"가 돼요.`,
            hint: '파일 이름의 마지막 점(.) 뒤 부분이 확장자예요.'
          };
        },
        () => ({
          type: 'blank',
          q: `<code>"data"</code>와 <code>"students.txt"</code>를 운영체제에 맞게 안전하게 이어붙이는 메서드를 쓰세요.`,
          prefix: 'path.', suffix: '("data", "students.txt")', accept: ['join'], placeholder: '메서드 이름',
          why: '<code>path.join(...)</code>은 운영체제에 맞는 구분자로 경로를 이어붙여줘요.',
          hint: '"이어붙이다, 합치다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '경로를 <code>"data" + "/" + "students.txt"</code>처럼 문자열로 직접 이어붙이지 않고 <code>path.join</code>을 쓰는 이유는?',
          '운영체제마다 다른 경로 구분자(\\ 또는 /) 문제를 자동으로 처리해줘서',
          ['path.join이 항상 더 빨라서', '문자열 이어붙이기는 아예 지원이 안 돼서', '더 짧게 써져서'],
          'path.join은 윈도우와 macOS/리눅스의 경로 구분자 차이를 알아서 처리해줘요.',
          '직접 문자열로 "/"를 넣으면 윈도우에서 문제가 될 수 있다는 걸 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"logs"</code> 폴더와 <code>"today.txt"</code> 파일을 <code>path.join</code>으로 합쳐서 출력하는 코드를 작성하세요. (const path = require("path")는 이미 되어 있다고 가정)',
          starter: '',
          placeholder: 'console.log(path.join("logs", "today.txt"));',
          accept: ['console.log(path.join("logs", "today.txt"));'],
          why: 'path.join(...)에 각 경로 조각을 순서대로 넣으면 합쳐진 경로를 만들어줘요.',
          hint: 'path.join("logs", "today.txt")를 console.log로 출력하세요.'
        }),
      ],
      boss: () => {
        const folder = pick(['reports', 'archive', 'logs']);
        const stem = pick(['summary', 'weekly', 'final']);
        const ext = pick(['.txt', '.csv']);
        return {
          type: 'blank',
          q: `<code>const p = path.join("${folder}", "${stem}${ext}");</code>일 때, <code>\`${'{경로}'}: ${'{basename}'} / ${'{extname}'}\`</code>을 "값: 값 / 값" 형태로 쓰세요. (예: <code>${folder}/${stem}${ext}: ${stem}${ext} / ${ext}</code>)`,
          prefix: '', suffix: '', accept: [`${folder}/${stem}${ext}: ${stem}${ext} / ${ext}`], placeholder: '경로: 이름 / 확장자',
          why: `path.join 결과는 "${folder}/${stem}${ext}", basename은 "${stem}${ext}", extname은 "${ext}"예요.`,
          hint: 'join, basename, extname 세 가지를 각각 계산해서 이어붙여보세요.'
        };
      }
    },
    {
      id: 'jestTesting',
      title: 'Jest로 테스트하기',
      ready: true,
      summary: '실무 표준 테스트 도구인 Jest로 test/expect를 쓰는 법과, describe로 관련 테스트를 묶는 법을 배워요.',
      goals: ['test와 expect로 테스트 작성', 'describe로 테스트 묶기', 'npm test로 실행하기'],
      blocks: [
        {
          h: '결과가 맞는지 확인하기: test와 expect',
          html: `<p><code>test("설명", () => {...})</code> 안에 <code>expect(값).toBe(기대값)</code>을 쓰면, 그 값이 기대값과 같은지 확인하는 테스트가 돼요.</p>`,
          code: {
            label: 'math.test.js',
            src: `function add(a, b) {
  return a + b;
}

test("2 더하기 3은 5", () => {
  expect(add(2, 3)).toBe(5);
});`
          }
        },
        {
          h: '관련 테스트 묶기: describe',
          html: `<p><code>describe("이름", () => {...})</code>로 관련 있는 여러 <code>test</code>를 하나로 묶어서 정리할 수 있어요.</p>`,
          code: {
            label: 'grouped.test.js',
            src: `describe("add 함수", () => {
  test("양수끼리 더하기", () => {
    expect(add(2, 3)).toBe(5);
  });
  test("음수 더하기", () => {
    expect(add(-1, -1)).toBe(-2);
  });
});`
          }
        },
        {
          h: '실행하기: npm test',
          html: `<p>보통 <code>package.json</code>의 <code>scripts.test</code>에 <code>jest</code>를 등록해두고, 터미널에서 <code>npm test</code>로 전체 테스트를 실행해요.</p>`,
          code: {
            label: 'terminal',
            lang: 'bash',
            src: `npm test`
          }
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `테스트 하나를 정의하는 함수 이름을 쓰세요.`,
          prefix: '', suffix: '("2 더하기 3은 5", () => { ... });', accept: ['test'], placeholder: '함수 이름',
          why: '<code>test(설명, 함수)</code>로 테스트 하나를 정의해요.',
          hint: '"테스트"라는 뜻 그대로예요.'
        }),
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>expect(add(${a}, ${b})).toBe(${a + b + randInt(0, 1) * 0})</code>처럼, <code>add(${a}, ${b})</code>의 실제 결과가 <code>toBe</code>의 값과 같아야 통과할 때, <code>toBe</code> 안에 들어갈 올바른 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `add(${a}, ${b})는 ${a + b}를 반환하니, toBe 안에도 ${a + b}가 들어가야 테스트가 통과해요.`,
            hint: 'add 함수의 실제 반환값을 먼저 계산해보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `실제 값이 기대값과 같은지 확인하는, expect 뒤에 붙이는 메서드를 쓰세요.`,
          prefix: 'expect(add(2, 3)).', suffix: '(5);', accept: ['toBe'], placeholder: '메서드 이름',
          why: '<code>.toBe(값)</code>은 실제 값이 그 값과 같은지 확인해요.',
          hint: '"~이다, ~여야 한다"라는 뜻의 영어 표현이에요.'
        }),
        () => makeChoice(
          '<code>describe</code>를 쓰는 이유로 가장 알맞은 것은?',
          '관련 있는 여러 테스트를 하나로 묶어서 정리하려고', ['테스트 실행 속도를 높이려고', 'describe 없이는 test를 아예 못 써서', '테스트 결과를 자동으로 고치려고'],
          'describe는 관련된 test들을 그룹으로 묶어서, 결과를 더 보기 좋게 정리해줘요.',
          '"설명하다, 묘사하다"라는 뜻처럼, 관련된 테스트 묶음에 이름을 붙여준다고 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>function subtract(a, b) { return a - b; }</code>가 <code>subtract(10, 3)</code>에서 <code>7</code>을 반환하는지 확인하는 테스트를 <code>test</code>와 <code>expect</code>로 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'test("10 빼기 3은 7", () => {\n  expect(subtract(10, 3)).toBe(7);\n});',
          accept: ['test("10 빼기 3은 7", () => {\n  expect(subtract(10, 3)).toBe(7);\n});'],
          why: 'test(설명, 함수) 안에서 expect(실제값).toBe(기대값)으로 확인해요.',
          hint: 'test("...", () => { expect(subtract(10, 3)).toBe(7); }); 형태로 쓰세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 20), b = randInt(1, 20);
        return {
          type: 'code',
          q: `<code>function multiply(a, b) { return a * b; }</code>가 있을 때, <code>describe("multiply 함수", ...)</code> 안에 <code>multiply(${a}, ${b})</code>가 <code>${a * b}</code>를 반환하는지 확인하는 테스트 하나를 담은 코드를 작성하세요.`,
          starter: '',
          rows: 5,
          placeholder: `describe("multiply 함수", () => {\n  test("${a} 곱하기 ${b}", () => {\n    expect(multiply(${a}, ${b})).toBe(${a * b});\n  });\n});`,
          accept: [`describe("multiply 함수", () => {\n  test("${a} 곱하기 ${b}", () => {\n    expect(multiply(${a}, ${b})).toBe(${a * b});\n  });\n});`],
          why: `${a} × ${b} = ${a * b}이 맞는지 확인하는 테스트를 describe로 묶었어요.`,
          hint: 'describe("...", () => { test("...", () => { expect(...).toBe(...); }); }); 형태예요.'
        };
      }
    },
    {
      id: 'debounceThrottle',
      title: '디바운스와 쓰로틀',
      ready: true,
      summary: '연속으로 발생하는 이벤트를 효율적으로 처리하는 두 가지 기법, 디바운스와 쓰로틀을 배워요. 실무 프론트엔드에서 정말 자주 써요.',
      goals: ['디바운스: 마지막 호출만 실행하기', '쓰로틀: 일정 간격으로만 실행하기', '언제 각각을 쓸지'],
      blocks: [
        {
          h: '연속 호출 중 마지막 것만 실행하기: 디바운스',
          html: `<p><b>디바운스</b>는 짧은 시간 안에 여러 번 호출돼도, <b>마지막 호출로부터 일정 시간이 지난 뒤 딱 한 번만</b> 실행되게 해요. 검색창에 글자를 입력할 때마다 API를 부르면 낭비니까, 입력이 멈춘 뒤에만 검색하도록 할 때 써요.</p>`,
          code: {
            label: 'debounce.js',
            src: `function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const search = debounce((keyword) => console.log("검색:", keyword), 300);
search("a");
search("ap");
search("app");`
          },
          after: `<div class="note"><b>동작 과정</b> — 호출될 때마다 이전 타이머를 <code>clearTimeout</code>으로 취소하고 새 타이머를 설정해요. 그래서 연속 호출 중엔 실행이 계속 미뤄지다가, 마지막 호출("app") 뒤 300ms가 지나야 딱 한 번 <code>console.log("검색:", "app")</code>이 실행돼요.</div>`
        },
        {
          h: '일정 간격으로만 실행하기: 쓰로틀',
          html: `<p><b>쓰로틀</b>은 얼마나 자주 호출되든, <b>일정 간격마다 한 번씩만</b> 실행되게 해요. 스크롤 이벤트처럼 아주 자주(초당 수십 번) 발생하는 이벤트를 다룰 때 써요.</p>`,
          code: {
            label: 'throttle.js',
            src: `function throttle(fn, interval) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      fn(...args);
      lastTime = now;
    }
  };
}`
          }
        },
        {
          h: '언제 디바운스, 언제 쓰로틀을 쓸까요',
          html: `<p>"입력이 <b>끝난 뒤</b> 한 번만" 필요하면 <b>디바운스</b>(검색어 자동완성, 창 크기 조절 마무리 감지), "계속 발생해도 <b>일정 간격으로는</b> 반응해야" 하면 <b>쓰로틀</b>(스크롤 위치 감지, 버튼 연타 방지)을 써요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `디바운스 함수 안에서, 새 타이머를 설정하기 전에 이전 타이머를 취소하는 함수를 쓰세요.`,
          prefix: '', suffix: '(timer);', accept: ['clearTimeout'], placeholder: '함수 이름',
          why: '<code>clearTimeout(timer)</code>로 이전에 설정한 타이머를 취소해요.',
          hint: '"타이머를 지운다"는 뜻 그대로예요.'
        }),
        () => {
          const calls = randInt(3, 6);
          return {
            type: 'blank',
            q: `디바운스된 함수를 짧은 시간 안에 ${calls}번 연달아 호출했어요. 마지막 호출로부터 delay만큼 지난 뒤, 실제로 원래 함수(fn)가 실행되는 횟수는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: ['1'], placeholder: '숫자',
            why: '디바운스는 매번 이전 타이머를 취소하고 새로 설정해서, 결국 마지막 호출 이후 딱 한 번만 실행돼요.',
            hint: '중간의 타이머들은 전부 취소되고, 마지막 것만 살아남는다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          '검색창에 글자를 입력할 때마다 API를 부르는 대신, 입력이 멈춘 뒤에만 검색하고 싶을 때 쓰는 기법은?',
          '디바운스', ['쓰로틀', '캐싱', '메모이제이션'],
          '"입력이 끝난 뒤 한 번만"이 필요한 상황엔 디바운스가 알맞아요.',
          '연속 호출 중 "마지막 것만" 실행되길 원하는 상황이에요.'
        ),
        () => makeChoice(
          '스크롤 이벤트처럼 아주 자주 발생하는 이벤트를 일정 간격으로만 처리하고 싶을 때 쓰는 기법은?',
          '쓰로틀', ['디바운스', '디버깅', '캐싱'],
          '"계속 발생해도 일정 간격으로는 반응해야" 하는 상황엔 쓰로틀이 알맞아요.',
          '"일정한 흐름으로 조절한다"는 이름의 뜻을 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>debounce(fn, delay)</code> 함수를 작성하세요: 반환된 함수가 호출될 때마다 이전 타이머를 취소하고, delay 후에 fn을 실행하는 새 타이머를 설정해요.',
          starter: '',
          rows: 6,
          placeholder: 'function debounce(fn, delay) {\n  let timer;\n  return function (...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}',
          accept: ['function debounce(fn, delay) {\n  let timer;\n  return function (...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}'],
          why: '클로저로 timer 변수를 기억해두고, 호출될 때마다 이전 타이머를 취소한 뒤 새로 설정해요.',
          hint: 'let timer;를 클로저로 기억해두고, 반환하는 함수 안에서 clearTimeout(timer) 후 setTimeout으로 새로 설정하세요.'
        }),
      ],
      boss: () => makeChoice(
        '버튼을 연타해도 서버에는 딱 한 번만 요청을 보내고 싶은 "저장 버튼" 기능에 더 적합한 것은?',
        '디바운스', ['쓰로틀', '둘 다 상관없다', '둘 다 안 맞는다'],
        '연타(연속 호출) 중에는 실행을 미루다가, 마지막 클릭 이후에만 한 번 실행하고 싶은 상황이라 디바운스가 더 적합해요.',
        '"연속 호출 중 마지막 것만"이 필요한 상황인지, "일정 간격마다 반응"이 필요한 상황인지 구분해보세요.'
      )
    },
    {
      id: 'sortPitfall',
      title: "Array.sort()의 함정",
      ready: true,
      summary: '배열의 sort() 메서드가 기본적으로 문자열 기준이라 생기는 흔한 버그와, 올바르게 숫자 정렬하는 법을 배워요.',
      goals: ['sort()가 기본적으로 문자열 기준인 이유', '비교 함수로 숫자 정렬하기', 'sort()는 원본 배열을 바꾼다'],
      blocks: [
        {
          h: '기본 정렬은 문자열 기준이에요',
          html: `<p><code>.sort()</code>를 아무 인자 없이 쓰면, 각 값을 <b>문자열로 바꿔서</b> 사전순으로 비교해요. 그래서 숫자 배열에 그냥 <code>.sort()</code>를 쓰면 예상과 다르게 정렬돼요.</p>`,
          code: {
            label: 'sort_default.js',
            src: `const nums = [10, 1, 21, 2];
console.log(nums.sort());`,
            out: `[ 1, 10, 2, 21 ]`
          },
          after: `<div class="note"><b>왜 이렇게 될까요</b> — 문자열로 비교하면 "10"은 "2"보다 앞이에요("1"이 "2"보다 사전순으로 작으니까). 숫자 크기와는 상관없는 비교예요.</div>`
        },
        {
          h: '숫자로 비교하도록 직접 알려주기',
          html: `<p><code>.sort((a, b) => a - b)</code>처럼 <b>비교 함수</b>를 넘기면, 그 함수의 결과가 음수면 <code>a</code>가 먼저, 양수면 <code>b</code>가 먼저 오도록 정렬해요.</p>`,
          code: {
            label: 'sort_numeric.js',
            src: `const nums = [10, 1, 21, 2];
nums.sort((a, b) => a - b);
console.log(nums);`,
            out: `[ 1, 2, 10, 21 ]`
          }
        },
        {
          h: 'sort()는 원본 배열을 바꿔요',
          html: `<p><code>.map()</code>, <code>.filter()</code>와 달리, <code>.sort()</code>는 <b>새 배열을 만들지 않고 원본을 직접 정렬</b>해요. 원본을 그대로 두고 싶다면 <code>[...원본].sort()</code>처럼 먼저 복사해야 해요.</p>`,
          code: {
            label: 'sort_mutates.js',
            src: `const original = [3, 1, 2];
const sorted = original.sort();
console.log(original === sorted);`,
            out: `true`
          }
        }
      ],
      quizGenerators: [
        () => {
          const nums = shuffle([2, 10, 1, 21, 100, 3]).slice(0, 4);
          const stringSorted = [...nums].sort();
          return {
            type: 'blank',
            q: `<code>[${nums.join(', ')}].sort()</code>(비교 함수 없이)의 결과를 대괄호 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`[${stringSorted.join(', ')}]`], placeholder: '[숫자, ...]',
            why: `비교 함수 없이 sort()하면 문자열 기준으로 정렬돼서 [${stringSorted.join(', ')}]이 돼요.`,
            hint: '각 숫자를 문자열로 바꿔서 사전순으로 비교한다고 생각해보세요.'
          };
        },
        () => {
          const nums = shuffle([2, 10, 1, 21, 100, 3]).slice(0, 4);
          const numSorted = [...nums].sort((a, b) => a - b);
          return {
            type: 'blank',
            q: `<code>[${nums.join(', ')}].sort((a, b) => a - b)</code>의 결과를 대괄호 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`[${numSorted.join(', ')}]`], placeholder: '[숫자, ...]',
            why: `비교 함수 (a, b) => a - b는 숫자 크기로 정렬해서 [${numSorted.join(', ')}]이 돼요.`,
            hint: '이번엔 진짜 숫자 크기 순서대로 정렬돼요.'
          };
        },
        () => makeChoice(
          '<code>const sorted = original.sort();</code>를 실행한 뒤, <code>original</code>은 어떻게 될까요?',
          '원본도 정렬된 상태로 바뀐다', ['원본은 전혀 안 바뀐다', '빈 배열이 된다', 'sorted와 다른 새 배열이 된다'],
          '.sort()는 원본 배열을 직접 정렬해요. sorted는 그 정렬된 원본과 똑같은 배열이에요.',
          '.sort()가 새 배열을 만드는지, 원본을 직접 바꾸는지를 떠올려보세요.'
        ),
        () => makeChoice(
          '숫자 배열을 크기 순서대로 정렬하려면 <code>.sort()</code>에 무엇을 넘겨야 할까요?',
          '<code>(a, b) => a - b</code> 같은 비교 함수', ['아무것도 안 넘겨도 자동으로 된다', '"number"라는 문자열', '배열의 길이'],
          '비교 함수를 넘기지 않으면 문자열 기준으로 정렬되니, 숫자 정렬을 원하면 반드시 비교 함수를 넘겨야 해요.',
          '기본 정렬(문자열 기준)의 문제를 해결하려면 무엇을 추가해야 할지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '배열 <code>[40, 1, 5, 200]</code>을 숫자 크기 순서대로(오름차순) 정렬해서 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'const nums = [40, 1, 5, 200];\nnums.sort((a, b) => a - b);\nconsole.log(nums);',
          expectedOutput: '[ 1, 5, 40, 200 ]',
          why: '비교 함수 (a, b) => a - b로 정렬하면 숫자 크기 순서대로 [1, 5, 40, 200]이 돼요.',
          hint: '.sort((a, b) => a - b)를 쓰세요.'
        }),
      ],
      boss: () => {
        const nums = shuffle([3, 30, 4, 21, 100, 9, 2]).slice(0, 5);
        const original = [...nums];
        const sorted = [...nums].sort((a, b) => b - a);
        return {
          type: 'blank',
          q: `<code>const nums = [${original.join(', ')}];</code>일 때, <code>nums.sort((a, b) => b - a);</code>를 실행한 뒤 <code>nums</code>의 값(내림차순 정렬된 원본)은? 대괄호 포함해서 쓰세요.`,
          prefix: '', suffix: '', accept: [`[${sorted.join(', ')}]`], placeholder: '[숫자, ...]',
          why: `<code>b - a</code>는 큰 값이 먼저 오도록(내림차순) 정렬해서 [${sorted.join(', ')}]이 되고, sort()는 원본 nums 자체를 이렇게 바꿔요.`,
          hint: 'b - a로 비교하면 큰 값부터 정렬되고, sort()는 원본 배열 자체를 바꾼다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'curryingFunctional',
      title: '커링과 함수형 기법',
      ready: true,
      summary: '여러 인자를 하나씩 받는 함수로 바꾸는 커링과, 여러 함수를 순서대로 이어붙이는 pipe를 배워요.',
      goals: ['커링: 인자를 하나씩 받기', 'pipe로 함수 조합하기', '함수형 스타일이 유용한 이유'],
      blocks: [
        {
          h: '인자를 하나씩 나눠 받기: 커링',
          html: `<p><b>커링</b>은 여러 인자를 한 번에 받는 함수를, <b>인자를 하나씩 받는 함수들의 연쇄</b>로 바꾸는 기법이에요. 일부 인자만 먼저 넘겨서 "특정 값이 고정된 새 함수"를 미리 만들어둘 수 있어요.</p>`,
          code: {
            label: 'currying.js',
            src: `function add(a) {
  return function (b) {
    return a + b;
  };
}

const add5 = add(5);
console.log(add5(3));`,
            out: `8`
          }
        },
        {
          h: '함수를 순서대로 이어붙이기: pipe',
          html: `<p><code>pipe(f1, f2, f3)(x)</code>는 <code>x</code>를 <code>f1</code>에 넣고, 그 결과를 <code>f2</code>에, 또 그 결과를 <code>f3</code>에 넣는 식으로 <b>왼쪽부터 순서대로</b> 함수들을 이어 적용해요.</p>`,
          code: {
            label: 'pipe.js',
            src: `const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);

const double = (n) => n * 2;
const addOne = (n) => n + 1;

const process = pipe(double, addOne);
console.log(process(3));`,
            out: `7`
          },
          after: `<div class="note"><b>계산 과정</b> — 3을 double에 넣으면 6, 6을 addOne에 넣으면 7이에요. pipe는 여러 단계를 하나의 파이프라인처럼 이어줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>function add(a) { return function (b) { return a + b; }; }</code>일 때, <code>add(${a})(${b})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `add(${a})는 "b를 받아서 ${a}를 더하는 함수"를 반환하고, 그 함수에 ${b}를 넘기면 ${a} + ${b} = ${a + b}예요.`,
            hint: 'add(a)는 함수를 반환하고, 그 함수를 바로 (b)로 호출하는 거예요.'
          };
        },
        () => {
          const n = randInt(1, 10);
          const doubled = n * 2;
          const result = doubled + 1;
          return {
            type: 'blank',
            q: `<code>double = (n) => n * 2</code>, <code>addOne = (n) => n + 1</code>, <code>process = pipe(double, addOne)</code>일 때, <code>process(${n})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
            why: `${n}을 double하면 ${doubled}, 거기에 addOne하면 ${result}예요.`,
            hint: '왼쪽 함수(double)부터 먼저 적용하고, 그 결과를 다음 함수(addOne)에 넣어요.'
          };
        },
        () => makeChoice(
          '여러 인자를 받는 함수를, 인자를 하나씩만 받는 함수들의 연쇄로 바꾸는 기법을 무엇이라고 부를까요?',
          '커링(currying)', ['클로저(closure)', '메모이제이션(memoization)', '디스트럭처링(destructuring)'],
          '이렇게 인자를 하나씩 받도록 바꾸는 기법을 커링이라고 불러요.',
          '이 기법의 이름을 그대로 영어 발음으로 쓴 단어예요.'
        ),
        () => makeChoice(
          '<code>add5 = add(5)</code>처럼 커링된 함수의 일부 인자만 먼저 넘겨두는 것의 장점은?',
          '자주 쓰는 값이 고정된 새 함수를 미리 만들어 재사용할 수 있어서',
          ['항상 실행 속도가 더 빨라져서', '메모리를 아예 안 써서', '결과가 더 정확해져서'],
          'add(5)를 미리 만들어두면, "5를 더하는 함수"를 여러 곳에서 재사용할 수 있어요.',
          '"일부 값이 이미 고정된 함수"를 미리 준비해두는 장점을 생각해보세요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '<code>multiply(a)</code>가 <code>b</code>를 받아 <code>a * b</code>를 반환하는 커링된 함수를 작성하고, <code>multiply(3)(4)</code>를 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'function multiply(a) {\n  return function (b) {\n    return a * b;\n  };\n}\nconsole.log(multiply(3)(4));',
          expectedOutput: '12',
          why: 'multiply(3)은 "b를 받아 3을 곱하는 함수"를 반환하고, (4)를 넘기면 3 * 4 = 12예요.',
          hint: 'function multiply(a) { return function(b) { return a * b; }; }를 쓰고 multiply(3)(4)를 출력하세요.'
        }),
      ],
      boss: () => {
        const n = randInt(1, 5);
        const square = (x) => x * x;
        const addTen = (x) => x + 10;
        const result = addTen(square(n));
        return {
          type: 'blank',
          q: `<code>square = (n) => n * n</code>, <code>addTen = (n) => n + 10</code>, <code>process = pipe(square, addTen)</code>일 때, <code>process(${n})</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
          why: `${n}을 제곱하면 ${square(n)}, 거기에 10을 더하면 ${result}예요.`,
          hint: '먼저 square를 적용한 뒤, 그 결과에 addTen을 적용하세요.'
        };
      }
    },
    {
      id: 'symbolType',
      title: 'Symbol',
      ready: true,
      summary: '항상 유일한 값을 만들어내는 Symbol과, 이게 객체 키 충돌을 막고 for...of의 원리와 연결되는 방식을 배워요.',
      goals: ['Symbol이란: 항상 유일한 값', '객체의 숨겨진 키로 쓰기', 'Symbol.iterator와의 연결'],
      blocks: [
        {
          h: '항상 유일한 값 만들기: Symbol',
          html: `<p><code>Symbol(설명)</code>은 호출할 때마다 <b>완전히 새로운, 세상에 하나뿐인 값</b>을 만들어요. 설명 문자열이 똑같아도 매번 다른 값이에요.</p>`,
          code: {
            label: 'symbol_basic.js',
            src: `const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2);`,
            out: `false`
          }
        },
        {
          h: '객체의 숨겨진 키로 쓰기',
          html: `<p>Symbol을 객체의 키로 쓰면, <code>Object.keys()</code>나 <code>for...in</code>, <code>JSON.stringify</code>에 <b>나타나지 않아요</b>. 그래서 일반 데이터와 안 섞이는 "숨겨진 확장 정보"를 붙일 때 유용해요.</p>`,
          code: {
            label: 'symbol_key.js',
            src: `const id = Symbol("id");
const user = { name: "지수", [id]: 123 };
console.log(user[id]);
console.log(Object.keys(user));`,
            out: `123\n[ 'name' ]`
          }
        },
        {
          h: 'Symbol.iterator와의 연결',
          html: `<p><code>for...of</code>가 배열, 문자열, Map, Set에서 동작하는 이유는, 이들이 전부 <code>Symbol.iterator</code>라는 특별한 키에 "어떻게 순회할지"를 알려주는 함수를 미리 가지고 있기 때문이에요. 일반 객체 <code>{}</code>는 이게 없어서 <code>for...of</code>를 바로 쓸 수 없어요.</p>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>Symbol("id") === Symbol("id")</code>의 결과는?',
          'false', ['true', 'undefined', 'TypeError가 난다'],
          '설명이 같아도 Symbol()을 호출할 때마다 완전히 다른 새 값이 만들어져서 false예요.',
          'Symbol의 가장 큰 특징은 "항상 유일하다"는 거예요.'
        ),
        () => {
          const name = pick(['지수', '민준']);
          return {
            type: 'blank',
            q: `<code>const id = Symbol("id"); const user = { name: "${name}", [id]: 1 };</code>일 때, <code>Object.keys(user)</code>의 결과를 대괄호와 따옴표 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`[ '${name}' ]`, `['${name}']`], placeholder: "[ '값' ]",
            why: `Symbol 키는 Object.keys()에 안 나타나서, 일반 키인 name만 [ '${name}' ]로 나와요.`,
            hint: 'Symbol로 만든 키는 Object.keys()의 결과 목록에서 빠진다는 걸 떠올려보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `항상 유일한 값을 만드는 함수 이름을 쓰세요.`,
          prefix: 'const id = ', suffix: '("id");', accept: ['Symbol'], placeholder: '함수 이름',
          why: '<code>Symbol(설명)</code>은 호출할 때마다 유일한 값을 만들어요.',
          hint: '"기호, 상징"이라는 뜻의 영어 단어예요. 첫 글자는 대문자예요.'
        }),
        () => makeChoice(
          '<code>for...of</code>가 배열에서 동작하는 이유로 알맞은 것은?',
          '배열이 Symbol.iterator라는 특별한 키에 순회 방법을 이미 가지고 있어서',
          ['배열은 항상 크기가 정해져 있어서', 'for...of는 배열 전용 문법이라 다른 건 아예 못 써서', '배열의 모든 값이 숫자라서'],
          '배열은 이미 Symbol.iterator를 가지고 있어서 for...of로 순회할 수 있어요. 일반 객체는 이게 없어서 안 돼요.',
          'Map, Set도 for...of가 되는 이유가 배열과 똑같다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '<code>Symbol("a")</code>와 <code>Symbol("a")</code>를 각각 변수에 담아, 둘이 같은지(<code>===</code>) <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'const a = Symbol("a");\nconst b = Symbol("a");\nconsole.log(a === b);',
          expectedOutput: 'false',
          why: '설명이 같아도 Symbol은 매번 새로운 유일한 값이라서 false예요.',
          hint: '두 Symbol을 각각 만든 뒤 ===로 비교해보세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>const secret = Symbol("secret"); const user = { name: "${name}", age: ${age}, [secret]: "비공개" };</code>일 때, <code>JSON.stringify(user)</code>의 결과는? (큰따옴표 포함, Symbol 키는 제외됨)`,
          prefix: '', suffix: '', accept: [`{"name":"${name}","age":${age}}`], placeholder: '{"key":"value",...}',
          why: `JSON.stringify도 Symbol 키는 무시하고 일반 키만 담아서 {"name":"${name}","age":${age}}가 돼요.`,
          hint: 'JSON.stringify도 Object.keys()처럼 Symbol 키는 건너뛴다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'weakMapSet',
      title: 'WeakMap과 WeakSet',
      ready: true,
      summary: '일반 Map/Set과 달리 메모리 누수를 막아주는 WeakMap과 WeakSet의 원리와 쓰임새를 배워요.',
      goals: ['WeakMap이 일반 Map과 다른 점', '메모리 누수를 막아주는 원리', '언제 WeakMap을 쓸지'],
      blocks: [
        {
          h: '객체만 키로 쓸 수 있는 Map: WeakMap',
          html: `<p><code>WeakMap</code>은 <code>Map</code>과 사용법이 비슷하지만, 키로 <b>반드시 객체만</b> 쓸 수 있어요(숫자, 문자열 키는 안 돼요).</p>`,
          code: {
            label: 'weakmap_basic.js',
            src: `const cache = new WeakMap();
const user = { name: "지수" };
cache.set(user, "캐시된 데이터");
console.log(cache.get(user));`,
            out: `캐시된 데이터`
          }
        },
        {
          h: '메모리 누수를 막아주는 원리',
          html: `<p>일반 <code>Map</code>에 객체를 키로 넣어두면, 다른 곳에서 그 객체를 아무도 안 써도 Map이 계속 붙잡고 있어서 <b>메모리에서 안 지워져요</b>(메모리 누수). <code>WeakMap</code>은 "약하게" 참조해서, 그 객체를 다른 곳에서 더 이상 안 쓰면 <b>자동으로 정리</b>돼요.</p>`
        },
        {
          h: '언제 WeakMap을 쓸까요',
          html: `<p>예를 들어 화면의 요소마다 부가 정보를 연결해두고 싶을 때, 그 요소가 화면에서 사라지면 그 부가 정보도 자동으로 함께 정리되길 원하는 경우에 적합해요. <code>WeakSet</code>도 원리는 같고, 값(반드시 객체)만 중복 없이 모아두는 버전이에요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `새 WeakMap을 만드는 코드를 완성하세요.`,
          prefix: 'const cache = ', suffix: '();', accept: ['new WeakMap'], placeholder: '코드',
          why: '<code>new WeakMap()</code>으로 새 WeakMap을 만들어요.',
          hint: 'new 키워드 뒤에 WeakMap을 붙이세요.'
        }),
        () => makeChoice(
          'WeakMap의 키로 쓸 수 있는 값은?',
          '객체만', ['숫자만', '문자열만', '무엇이든 다 가능'],
          'WeakMap은 반드시 객체만 키로 쓸 수 있어요. 숫자나 문자열은 안 돼요.',
          '"약한 참조"가 가능하려면 그 값이 참조 가능한 대상(객체)이어야 해요.'
        ),
        () => makeChoice(
          '일반 Map 대신 WeakMap을 쓰면 좋은 이유는?',
          '키로 쓴 객체가 다른 곳에서 더는 안 쓰이면 자동으로 메모리에서 정리돼서',
          ['WeakMap이 항상 더 빠르게 동작해서', 'WeakMap은 값의 개수 제한이 없어서', '숫자 키도 문자열로 자동 변환해줘서'],
          'WeakMap은 약한 참조라서, 키 객체가 더 이상 쓰이지 않으면 가비지 컬렉터가 자동으로 정리해줘요(메모리 누수 방지).',
          '"Weak(약한)"이라는 이름이 메모리 관리와 어떻게 연결되는지 생각해보세요.'
        ),
        () => makeChoice(
          'WeakSet에 담을 수 있는 값은?',
          '객체만', ['숫자와 문자열', '함수는 제외한 모든 값', '아무 제한 없음'],
          'WeakSet도 WeakMap처럼 반드시 객체만 담을 수 있어요.',
          'WeakMap의 키 제약과 똑같은 규칙이 WeakSet의 값에도 적용돼요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '<code>new WeakMap()</code>으로 <code>cache</code>를 만들고, 객체 <code>{ id: 1 }</code>을 <code>key</code>에 저장한 뒤 그 키에 <code>"데이터"</code>를 저장하고 다시 꺼내서 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'const cache = new WeakMap();\nconst key = { id: 1 };\ncache.set(key, "데이터");\nconsole.log(cache.get(key));',
          expectedOutput: '데이터',
          why: 'WeakMap도 일반 Map처럼 set/get으로 값을 저장하고 꺼낼 수 있어요.',
          hint: 'new WeakMap()으로 만들고, 객체를 키로 set한 뒤 get으로 꺼내세요.'
        }),
      ],
      boss: () => makeChoice(
        '화면의 각 버튼 요소마다 "클릭 횟수"라는 부가 정보를 연결해두고 싶고, 그 버튼이 화면에서 사라지면 그 정보도 자동으로 함께 정리되길 원해요. 어떤 자료구조가 적합할까요?',
        'WeakMap', ['일반 Map', '일반 객체({})', '배열'],
        'WeakMap은 키(버튼 요소)가 더 이상 쓰이지 않으면 자동으로 정리되니, 요소가 사라질 때 관련 데이터도 함께 정리되길 원하는 이 상황에 딱 맞아요.',
        '"요소가 사라지면 데이터도 자동으로 정리되길 원한다"는 요구사항이 WeakMap의 핵심 특징과 어떻게 연결되는지 생각해보세요.'
      )
    },
    {
      id: 'proxyReflect',
      title: 'Proxy와 Reflect',
      ready: true,
      summary: '객체에 접근하거나 값을 바꿀 때마다 그 동작을 가로채는 Proxy와, 원래 동작을 그대로 수행하는 Reflect를 배워요.',
      goals: ['Proxy로 객체 동작 가로채기', 'get/set 트랩', 'Reflect로 기본 동작 수행하기'],
      blocks: [
        {
          h: '객체에 접근할 때마다 가로채기: Proxy',
          html: `<p><code>new Proxy(대상객체, 핸들러)</code>는 그 객체에 접근할 때마다 핸들러 안의 함수(트랩)를 먼저 거치게 해요. <code>get</code> 트랩은 속성을 <b>읽을 때</b> 실행돼요.</p>`,
          code: {
            label: 'proxy_get.js',
            src: `const user = { name: "지수" };
const handler = {
  get(target, prop) {
    console.log(\`\${prop} 속성을 읽었어요\`);
    return target[prop];
  }
};
const proxy = new Proxy(user, handler);
console.log(proxy.name);`,
            out: `name 속성을 읽었어요\n지수`
          }
        },
        {
          h: '값을 설정할 때 검증하기: set 트랩',
          html: `<p><code>set</code> 트랩은 속성에 값을 <b>쓸 때</b> 실행돼서, 값을 그대로 저장하기 전에 검증 같은 로직을 끼워 넣을 수 있어요.</p>`,
          code: {
            label: 'proxy_set.js',
            src: `const handler2 = {
  set(target, prop, value) {
    if (prop === "age" && value < 0) {
      throw new Error("나이는 음수일 수 없어요");
    }
    target[prop] = value;
    return true;
  }
};
const user2 = new Proxy({}, handler2);
user2.age = 17;
console.log(user2.age);`,
            out: `17`
          }
        },
        {
          h: '기본 동작을 그대로 수행하기: Reflect',
          html: `<p>트랩 안에서 "원래 동작 그대로"를 수행하고 싶을 땐 <code>target[prop]</code> 대신 <code>Reflect.get(target, prop)</code>을, <code>target[prop] = value</code> 대신 <code>Reflect.set(target, prop, value)</code>를 쓰는 게 더 안전하고 일관돼요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const prop = pick(['name', 'age', 'city']);
          return {
            type: 'blank',
            q: `<code>get</code> 트랩이 <code>console.log(\`\${prop} 속성을 읽었어요\`)</code>를 실행하도록 정의돼 있을 때, <code>proxy.${prop}</code>에 접근하면 무엇이 먼저 출력될까요? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [`${prop} 속성을 읽었어요`], placeholder: '값',
            why: `get 트랩이 prop 자리에 "${prop}"을 넣어서 "${prop} 속성을 읽었어요"가 출력돼요.`,
            hint: 'prop 자리에 실제로 접근한 속성 이름이 들어간다는 걸 떠올려보세요.'
          };
        },
        () => {
          const age = randInt(-5, -1);
          return {
            type: 'blank',
            q: `<code>set</code> 트랩이 <code>age</code>가 음수면 오류를 던지도록 정의돼 있을 때, <code>user2.age = ${age};</code>를 실행하면 어떻게 될까요? (오류가 나면 "오류", 안 나면 "정상")`,
            prefix: '', suffix: '', accept: ['오류'], placeholder: '오류 또는 정상',
            why: `${age}는 음수라서 set 트랩이 <code>Error</code>를 던져요.`,
            hint: '음수를 age에 설정하려는 상황이라는 걸 확인해보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `객체의 동작을 가로채는 새 Proxy를 만드는 코드를 완성하세요. (대상객체와 handler를 이미 만들어뒀다고 가정)`,
          prefix: 'const proxy = ', suffix: '(target, handler);', accept: ['new Proxy'], placeholder: '코드',
          why: '<code>new Proxy(대상, 핸들러)</code>로 프록시를 만들어요.',
          hint: 'new 키워드 뒤에 Proxy를 붙이세요.'
        }),
        () => makeChoice(
          'Proxy의 트랩 함수 안에서 "원래 동작 그대로"를 안전하게 수행하고 싶을 때 쓰는 것은?',
          'Reflect', ['Symbol', 'WeakMap', 'JSON'],
          '<code>Reflect.get</code>, <code>Reflect.set</code> 등은 트랩 안에서 원래의 기본 동작을 그대로 수행할 때 써요.',
          '"반사하다, 그대로 되비추다"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '<code>{ name: "민준" }</code> 객체를 감싸는 Proxy를 만들어, <code>get</code> 트랩에서 속성에 접근할 때마다 <code>"접근됨"</code>을 출력하고 원래 값을 반환하도록 한 뒤, <code>proxy.name</code>을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 7,
          placeholder: 'const target = { name: "민준" };\nconst handler = {\n  get(target, prop) {\n    console.log("접근됨");\n    return target[prop];\n  }\n};\nconst proxy = new Proxy(target, handler);\nconsole.log(proxy.name);',
          expectedOutput: '접근됨\n민준',
          why: 'get 트랩이 먼저 "접근됨"을 출력하고, 그 다음 실제 값 "민준"을 반환해서 출력돼요.',
          hint: 'get 트랩 안에서 console.log("접근됨") 후 target[prop]을 반환하세요.'
        }),
      ],
      boss: () => {
        const age = randInt(-10, 20);
        const ok = age >= 0;
        return {
          type: 'blank',
          q: `<code>set</code> 트랩이 <code>age &lt; 0</code>이면 <code>Error</code>를 던지고, 아니면 정상 저장하도록 정의돼 있을 때, <code>user2.age = ${age};</code> 후 <code>console.log(user2.age);</code>를 실행하면 어떻게 될까요? (오류가 나면 "Error 발생", 정상이면 그 숫자)`,
          prefix: '', suffix: '', accept: [ok ? String(age) : 'Error 발생'], placeholder: '숫자 또는 Error 발생',
          why: ok ? `${age}는 0 이상이라 정상적으로 저장되고 출력돼요.` : `${age}는 음수라서 set 트랩이 Error를 던져요.`,
          hint: '설정하려는 값이 음수인지 아닌지부터 확인해보세요.'
        };
      }
    },
    {
      id: 'processEnv',
      title: 'process.env로 환경 변수 다루기',
      ready: true,
      summary: 'Node.js에서 비밀번호나 설정값을 코드에 직접 쓰지 않고, 환경 변수로 안전하게 관리하는 법을 배워요.',
      goals: ['process.env로 환경 변수 읽기', '기본값 처리하기', '.env 파일과 dotenv'],
      blocks: [
        {
          h: 'Node.js에서 환경 변수 읽기: process.env',
          html: `<p>Node.js에서는 <code>process.env.이름</code>으로 운영체제의 환경 변수를 읽을 수 있어요. 값이 없으면 <code>undefined</code>라서, <code>||</code>로 기본값을 정해두는 경우가 많아요.</p>`,
          code: {
            label: 'process_env.js',
            src: `const dbHost = process.env.DB_HOST || "localhost";
console.log(dbHost);`
          }
        },
        {
          h: '비밀번호를 코드에 직접 쓰면 안 되는 이유',
          html: `<p>API 키나 비밀번호를 코드에 그대로 쓰면, 그 코드를 깃허브에 올릴 때 함께 유출돼요. 대신 환경 변수로 관리하면 코드에는 <code>process.env.API_KEY</code>만 남고, 실제 값은 코드 밖(서버 설정, <code>.env</code> 파일)에만 존재해요.</p>`
        },
        {
          h: '.env 파일과 dotenv',
          html: `<p>로컬 개발에서는 <code>.env</code> 파일에 값을 적어두고, <code>dotenv</code> 패키지의 <code>require("dotenv").config()</code>를 맨 위에서 한 번 불러주면, 그 파일 내용이 자동으로 <code>process.env</code>에 들어가요. <code>.env</code> 파일은 git에 올리지 않아요.</p>`,
          code: {
            label: '.env',
            lang: 'bash',
            src: `DB_HOST=localhost
DB_PASSWORD=supersecret123`
          }
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `Node.js에서 환경 변수 <code>PORT</code>를 읽는 코드를 완성하세요.`,
          prefix: 'const port = process.', suffix: '.PORT;', accept: ['env'], placeholder: '단어',
          why: '<code>process.env.PORT</code>로 환경 변수를 읽어요.',
          hint: '"환경(environment)"의 줄임말이에요.'
        }),
        () => {
          const has = Math.random() < 0.5;
          const value = pick(['prod.example.com', 'db.internal']);
          return {
            type: 'blank',
            q: `환경 변수 <code>DB_HOST</code>가 ${has ? `"${value}"로 설정돼 있을` : '설정돼 있지 않을'} 때, <code>process.env.DB_HOST || "localhost"</code>의 결과는?`,
            prefix: '', suffix: '', accept: [has ? value : 'localhost'], placeholder: '값',
            why: has ? `환경 변수가 설정돼 있으니 그 값 "${value}"가 쓰여요.` : `환경 변수가 없으면 undefined라서, ||의 기본값 "localhost"가 쓰여요.`,
            hint: 'process.env.이름이 undefined면 ||의 오른쪽 기본값이 쓰인다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          '비밀번호를 코드에 직접 쓰지 않고 환경 변수로 관리하는 이유는?',
          '코드가 공개(깃허브 등)돼도 비밀 값은 함께 노출되지 않도록 하려고',
          ['실행 속도가 빨라져서', '오타 방지를 위해서', '환경 변수만 한글을 지원해서'],
          '코드에 직접 쓰면 코드가 공개되는 순간 비밀번호도 함께 유출돼요. 환경 변수는 코드 밖에 따로 두는 값이라 안전해요.',
          '코드는 여러 사람과 공유될 수 있다는 점을 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>.env</code> 파일의 내용을 읽어서 자동으로 <code>process.env</code>에 넣어주는 패키지의 이름을 쓰세요.`,
          prefix: 'require("', suffix: '").config();', accept: ['dotenv'], placeholder: '패키지 이름',
          why: '<code>dotenv</code> 패키지가 .env 파일을 읽어서 process.env에 자동으로 넣어줘요.',
          hint: '"점(dot) + 환경변수(env)"가 합쳐진 이름이에요.'
        }),
        () => ({
          type: 'code',
          q: '환경 변수 <code>PORT</code>를 읽되, 없으면 <code>3000</code>을 기본값으로 쓰도록(문자열이 아닌 숫자로) 코드를 작성하세요.',
          starter: '',
          placeholder: 'const port = Number(process.env.PORT) || 3000;',
          accept: ['const port = Number(process.env.PORT) || 3000;'],
          why: 'process.env의 값은 항상 문자열이라 Number()로 바꾸고, 없으면(undefined거나 0이면) 3000이 기본값으로 쓰여요.',
          hint: 'process.env.PORT를 Number()로 감싸고 || 3000을 붙이세요.'
        }),
      ],
      boss: () => {
        const hasHost = Math.random() < 0.5;
        const hasPort = Math.random() < 0.5;
        const host = hasHost ? 'prod.example.com' : 'localhost';
        const port = hasPort ? '8080' : '3000';
        return {
          type: 'blank',
          q: `환경 변수 <code>HOST</code>가 ${hasHost ? '"prod.example.com"으로 설정돼 있고' : '설정돼 있지 않고'}, <code>PORT</code>가 ${hasPort ? '"8080"으로 설정돼 있을' : '설정돼 있지 않을'} 때, <code>\`\${process.env.HOST || 'localhost'}:\${process.env.PORT || '3000'}\`</code>의 결과는?`,
          prefix: '', suffix: '', accept: [`${host}:${port}`], placeholder: '값:값',
          why: `HOST는 ${hasHost ? '설정된 값' : '기본값 localhost'}, PORT는 ${hasPort ? '설정된 값' : '기본값 3000'}이 쓰여서 "${host}:${port}"가 돼요.`,
          hint: '각 환경 변수가 설정돼 있는지에 따라 값 또는 기본값이 쓰인다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'microMacroTask',
      title: '마이크로태스크와 매크로태스크 큐',
      ready: true,
      summary: '자바스크립트가 여러 비동기 코드의 실행 순서를 어떻게 정하는지, 콜스택과 두 종류의 대기열을 깊이 이해해요.',
      goals: ['콜스택과 싱글 스레드', '마이크로태스크(Promise) vs 매크로태스크(setTimeout)', '실행 순서 예측하기'],
      blocks: [
        {
          h: '자바스크립트는 한 번에 하나씩만 실행해요: 콜스택',
          html: `<p>자바스크립트는 <b>싱글 스레드</b>라서, 한 번에 딱 하나의 코드만 실행할 수 있어요. 지금 실행 중인 코드들이 쌓이는 곳을 <b>콜스택</b>이라고 불러요.</p>`
        },
        {
          h: '두 종류의 대기열: 마이크로태스크와 매크로태스크',
          html: `<p>비동기 작업이 끝나면 바로 실행되는 게 아니라 <b>대기열</b>에 들어가요. <code>Promise.then</code>은 <b>마이크로태스크 큐</b>에, <code>setTimeout</code>은 <b>매크로태스크 큐</b>에 들어가요. 자바스크립트는 지금 실행 중인 동기 코드가 다 끝나면, <b>마이크로태스크 큐를 완전히 비운 다음</b>에야 매크로태스크를 하나 꺼내 실행해요.</p>`,
          code: {
            label: 'queue_order.js',
            src: `console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");`,
            out: `1\n4\n3\n2`
          }
        },
        {
          h: '마이크로태스크가 여러 개면 어떻게 될까요',
          html: `<p>마이크로태스크 큐에 여러 개가 쌓여 있으면, <b>그것들을 전부 처리한 뒤에야</b> 매크로태스크로 넘어가요.</p>`,
          code: {
            label: 'multi_microtask.js',
            src: `Promise.resolve().then(() => console.log("A"));
Promise.resolve().then(() => console.log("B"));
setTimeout(() => console.log("C"), 0);`,
            out: `A\nB\nC`
          }
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>Promise.then()</code>의 콜백은 어느 대기열에 들어갈까요?',
          '마이크로태스크 큐', ['매크로태스크 큐', '콜스택에 바로', '대기열에 안 들어가고 즉시 실행'],
          'Promise 관련 콜백은 마이크로태스크 큐에 들어가요.',
          '"미세한, 작은"이라는 뜻의 micro가 붙은 쪽이에요.'
        ),
        () => makeChoice(
          '<code>setTimeout()</code>의 콜백은 어느 대기열에 들어갈까요?',
          '매크로태스크 큐', ['마이크로태스크 큐', '콜스택에 바로', '대기열에 안 들어가고 즉시 실행'],
          'setTimeout, setInterval의 콜백은 매크로태스크 큐에 들어가요.',
          'Promise가 들어가는 큐와는 다른 쪽이에요.'
        ),
        () => {
          const ms = pick([0, 1000]);
          return {
            type: 'blank',
            q: `<code>console.log("A"); setTimeout(() => console.log("B"), ${ms}); Promise.resolve().then(() => console.log("C")); console.log("D");</code>를 실행하면 어떤 순서로 출력될까요? (예: A, B, C, D)`,
            prefix: '', suffix: '', accept: ['A, D, C, B', 'A,D,C,B'], placeholder: 'A, B, C, D 순서',
            why: '동기 코드(A, D)가 먼저, 그 다음 마이크로태스크(C), 마지막에 매크로태스크(B) 순서예요.',
            hint: '동기 → 마이크로태스크 → 매크로태스크 순서를 떠올려보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `<code>Promise.resolve().then(() => console.log("A")); Promise.resolve().then(() => console.log("B")); setTimeout(() => console.log("C"), 0);</code>를 실행하면, 마지막에 출력되는 것은?`,
          prefix: '', suffix: '', accept: ['C'], placeholder: '값',
          why: '마이크로태스크(A, B)가 전부 처리된 뒤에야 매크로태스크(C)로 넘어가서, C가 가장 마지막이에요.',
          hint: '마이크로태스크 큐를 다 비운 뒤에야 매크로태스크를 실행한다는 규칙을 떠올려보세요.'
        }),
        () => makeChoice(
          '동기 코드, 마이크로태스크, 매크로태스크가 섞여 있을 때 실행되는 순서는?',
          '동기 코드 → 마이크로태스크 큐 전부 → 매크로태스크', ['매크로태스크 → 마이크로태스크 → 동기 코드', '셋 다 동시에 실행', '순서는 항상 무작위'],
          '동기 코드가 항상 가장 먼저, 그 다음 마이크로태스크 큐를 전부 비우고, 마지막에 매크로태스크 순서예요.',
          '지금까지 본 예제들에서 A(동기), 마이크로, 매크로가 어떤 순서로 나왔는지 떠올려보세요.'
        ),
      ],
      boss: () => {
        const ms = pick([0, 500]);
        return {
          type: 'blank',
          q: `<code>console.log("1"); setTimeout(() => console.log("2"), ${ms}); Promise.resolve().then(() => { console.log("3"); Promise.resolve().then(() => console.log("4")); }); console.log("5");</code>를 실행하면 어떤 순서로 출력될까요? (예: 1, 2, 3, 4, 5)`,
          prefix: '', suffix: '', accept: ['1, 5, 3, 4, 2', '1,5,3,4,2'], placeholder: '순서',
          why: '동기 코드(1, 5)가 먼저, 그 다음 마이크로태스크(3)가 실행되면서 그 안에서 새로 등록된 마이크로태스크(4)도 다음 매크로태스크보다 먼저 처리돼서 3, 4가 이어지고, 마지막에 매크로태스크(2)가 실행돼요.',
          hint: '마이크로태스크 안에서 새로 등록된 마이크로태스크도, 그 어떤 매크로태스크보다 먼저 처리된다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'webWorkers',
      title: 'Web Workers로 진짜 병렬 처리하기',
      ready: true,
      summary: '메인 화면이 멈추지 않도록, 별도의 스레드에서 코드를 실행하는 Web Worker를 배워요.',
      goals: ['Web Worker가 뭔지', 'postMessage로 통신하기', '언제 Worker를 쓸지'],
      blocks: [
        {
          h: '메인 화면이 안 멈추게: Web Worker',
          html: `<p>자바스크립트는 원래 싱글 스레드라서, 계산이 오래 걸리면 그동안 화면이 멈춘 것처럼 보여요. <b>Web Worker</b>는 완전히 <b>별도의 스레드</b>에서 코드를 진짜로 동시에 실행시켜서, 메인 화면은 멈추지 않게 해줘요.</p>`,
          code: {
            label: 'worker.js',
            src: `self.onmessage = function (event) {
  const result = event.data * 2;
  self.postMessage(result);
};`
          }
        },
        {
          h: '메인 스레드에서 Worker와 대화하기',
          html: `<p><code>new Worker(파일이름)</code>으로 워커를 만들고, <code>.postMessage(값)</code>으로 값을 보내요. 워커가 다시 보낸 값은 <code>.onmessage</code>로 받아요.</p>`,
          code: {
            label: 'main.js',
            src: `const worker = new Worker("worker.js");
worker.postMessage(21);
worker.onmessage = function (event) {
  console.log(event.data);
};`,
            out: `42`
          }
        },
        {
          h: '언제 Worker를 쓸까요',
          html: `<p>이미지 처리, 대량 데이터 계산처럼 <b>시간이 오래 걸리는 작업</b>에 적합해요. 대신 Worker 안에서는 <code>document</code>에 접근할 수 없어서, <b>DOM 조작은 Worker 안에서 직접 할 수 없어요</b>.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `새 Worker를 만드는 코드를 완성하세요.`,
          prefix: 'const worker = ', suffix: '("worker.js");', accept: ['new Worker'], placeholder: '코드',
          why: '<code>new Worker(파일이름)</code>으로 별도 스레드에서 실행될 워커를 만들어요.',
          hint: 'new 키워드 뒤에 Worker를 붙이세요.'
        }),
        () => ({
          type: 'blank',
          q: `메인 스레드와 워커가 서로 값을 주고받을 때 쓰는 메서드 이름을 쓰세요.`,
          prefix: 'worker.', suffix: '(21);', accept: ['postMessage'], placeholder: '메서드 이름',
          why: '<code>.postMessage(값)</code>으로 값을 보내요.',
          hint: '"메시지를 보내다(post)"라는 뜻이 합쳐진 이름이에요.'
        }),
        () => makeChoice(
          'Web Worker를 쓰는 주된 이유는?',
          '시간이 오래 걸리는 계산 중에도 메인 화면이 멈추지 않게 하려고',
          ['코드 줄 수를 줄이려고', 'Worker 없이는 변수를 못 써서', '항상 실행 속도가 2배 빨라져서'],
          '메인 스레드와 별도로 실행되니, 오래 걸리는 계산이 메인 화면을 멈추게 하지 않아요.',
          '싱글 스레드의 한계(하나의 작업이 오래 걸리면 전체가 멈춘 것처럼 보이는 문제)를 떠올려보세요.'
        ),
        () => makeChoice(
          'Web Worker 안에서 직접 할 수 없는 일은?',
          'document로 DOM 요소에 접근하고 조작하기', ['숫자 계산하기', '변수 선언하기', '함수 정의하기'],
          'Worker는 별도의 스레드라서 document(DOM)에 접근할 수 없어요. 결과를 메인 스레드로 postMessage해서 DOM 조작은 메인 스레드가 해야 해요.',
          'DOM은 메인 스레드에서만 다룰 수 있는 자원이라는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>worker</code>라는 Worker에게 <code>{ type: "start", value: 10 }</code> 객체를 <code>postMessage</code>로 보내는 코드를 작성하세요. (worker는 이미 만들어져 있다고 가정)',
          starter: '',
          placeholder: 'worker.postMessage({ type: "start", value: 10 });',
          accept: ['worker.postMessage({ type: "start", value: 10 });'],
          why: 'postMessage에는 숫자뿐 아니라 객체도 그대로 넘길 수 있어요.',
          hint: 'worker.postMessage({ ... })에 원하는 객체를 넣으세요.'
        }),
      ],
      boss: () => makeChoice(
        '수백만 개의 데이터를 정렬하는 무거운 계산을 하면서도, 사용자가 계속 화면을 스크롤하거나 버튼을 누를 수 있게 하고 싶어요. 어떻게 해야 할까요?',
        'Web Worker에서 정렬 계산을 실행하고, 끝나면 결과를 postMessage로 받는다',
        ['메인 스레드에서 바로 정렬하고 사용자가 기다리게 한다', 'setTimeout으로 감싸면 자동으로 병렬 처리된다', 'Promise.all로 감싸면 해결된다'],
        'Web Worker는 별도 스레드에서 실행되니, 무거운 계산 동안에도 메인 화면(스크롤, 클릭 등)은 계속 반응할 수 있어요.',
        'setTimeout이나 Promise는 여전히 메인 스레드 안에서 실행된다는 점과 Worker의 차이를 생각해보세요.'
      )
    },
    {
      id: 'cookies',
      title: 'document.cookie로 쿠키 다루기',
      ready: true,
      summary: '브라우저에 작은 값을 저장하는 쿠키를 다루는 법과, localStorage와 무엇이 다른지 배워요.',
      goals: ['document.cookie로 쿠키 읽고 쓰기', '쿠키의 유효기간', 'localStorage와 쿠키의 차이'],
      blocks: [
        {
          h: '쿠키 읽고 쓰기: document.cookie',
          html: `<p><code>document.cookie = "키=값"</code>으로 쿠키를 쓰고, <code>document.cookie</code>를 읽으면 현재 쿠키들이 <code>"키=값; 키=값"</code> 형태로 전부 나와요.</p>`,
          code: {
            label: 'cookie_basic.js',
            src: `document.cookie = "username=지수";
console.log(document.cookie);`,
            out: `username=지수`
          }
        },
        {
          h: '쿠키의 유효기간: max-age',
          html: `<p><code>max-age=초</code>로 쿠키가 얼마나 오래 유지될지 정할 수 있어요. 이걸 안 정하면, 브라우저(탭이 아니라 브라우저 자체)를 닫으면 사라지는 "세션 쿠키"가 돼요.</p>`,
          code: {
            label: 'cookie_maxage.js',
            src: `document.cookie = "username=지수; max-age=3600";`
          }
        },
        {
          h: 'localStorage와 쿠키, 뭐가 다를까요',
          html: `<p>쿠키는 <b>매 서버 요청마다 자동으로 함께 전송</b>돼요(그래서 로그인 세션 유지에 흔히 써요). <code>localStorage</code>는 브라우저 안에만 남고 서버로 자동 전송되지 않아요. 저장 용량도 쿠키가 훨씬 작아요(보통 4KB 정도).</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `쿠키에 <code>theme=dark</code>를 저장하는 코드를 완성하세요.`,
          prefix: '', suffix: ' = "theme=dark";', accept: ['document.cookie'], placeholder: '코드',
          why: '<code>document.cookie = "키=값"</code>으로 쿠키를 저장해요.',
          hint: '문서 전체의 쿠키를 나타내는 속성이에요.'
        }),
        () => makeChoice(
          '쿠키와 localStorage의 가장 큰 차이는?',
          '쿠키는 서버 요청마다 자동으로 함께 전송되지만, localStorage는 그렇지 않다',
          ['localStorage는 문자열만 저장하고 쿠키는 아무 값이나 저장한다', '쿠키는 브라우저를 새로고침하면 항상 사라진다', '차이가 전혀 없다'],
          '쿠키는 서버와 통신할 때마다 자동으로 함께 전송돼요. 그래서 로그인 세션 유지에 흔히 쓰여요.',
          '로그인한 상태가 유지되는 원리를 생각해보면, 그 정보가 서버로 어떻게 전달될지 힌트가 돼요.'
        ),
        () => ({
          type: 'blank',
          q: `쿠키가 얼마나(초 단위) 유지될지 정하는 옵션을 쓰세요. (예: <code>document.cookie = "a=1; ${'{이것}'}=3600";</code>)`,
          prefix: '', suffix: '', accept: ['max-age'], placeholder: '옵션 이름',
          why: '<code>max-age=초</code>로 쿠키의 유효기간을 정해요.',
          hint: '"최대 나이(수명)"이라는 뜻의 영어 표현이에요.'
        }),
        () => makeChoice(
          'max-age를 정하지 않고 저장한 쿠키는 언제 사라질까요?',
          '브라우저 자체를 완전히 종료하면', ['1분 뒤 자동으로', '절대 안 사라진다', '탭만 닫아도'],
          'max-age/expires가 없으면 "세션 쿠키"가 돼서, 브라우저를 완전히 닫으면 사라져요.',
          '"세션"이라는 이름이 쿠키의 생존 기간과 어떻게 연결되는지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>lang=ko</code>라는 쿠키를 <code>max-age=86400</code>(하루)으로 저장하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'document.cookie = "lang=ko; max-age=86400";',
          accept: ['document.cookie = "lang=ko; max-age=86400";'],
          why: '쿠키 문자열 뒤에 세미콜론으로 max-age 옵션을 이어붙여요.',
          hint: 'document.cookie = "lang=ko; max-age=86400";를 그대로 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '로그인한 사용자 정보를 서버가 매 요청마다 자동으로 확인할 수 있어야 하는 "로그인 세션 유지" 기능에 더 적합한 저장 방식은?',
        '쿠키', ['localStorage', 'sessionStorage', '변수'],
        '쿠키는 서버 요청마다 자동으로 함께 전송되니, 서버가 매번 로그인 상태를 확인해야 하는 세션 유지에 적합해요. localStorage는 서버로 자동 전송되지 않아요.',
        '서버가 "누가 요청했는지"를 매번 자동으로 알아야 한다는 요구사항을 생각해보세요.'
      )
    },
    {
      id: 'formDataUrlParams',
      title: 'FormData와 URLSearchParams',
      ready: true,
      summary: '폼 데이터를 모아서 다루는 FormData와, 주소의 쿼리 문자열을 다루는 URLSearchParams를 배워요.',
      goals: ['FormData로 폼 데이터 모으기', 'URLSearchParams로 쿼리 문자열 읽기', '쿼리 문자열 만들기'],
      blocks: [
        {
          h: '폼 데이터를 모아서 다루기: FormData',
          html: `<p><code>new FormData()</code>로 폼 데이터를 담을 객체를 만들고, <code>.append(이름, 값)</code>으로 값을 추가해요. <code>.get(이름)</code>으로 값을 꺼내요.</p>`,
          code: {
            label: 'formdata_basic.js',
            src: `const formData = new FormData();
formData.append("name", "지수");
formData.append("age", "17");
console.log(formData.get("name"));`,
            out: `지수`
          }
        },
        {
          h: '주소의 쿼리 문자열 다루기: URLSearchParams',
          html: `<p><code>new URLSearchParams(쿼리문자열)</code>은 <code>?page=2&sort=asc</code> 같은 쿼리 문자열을 쉽게 읽을 수 있게 해줘요.</p>`,
          code: {
            label: 'urlparams_read.js',
            src: `const params = new URLSearchParams("?page=2&sort=asc");
console.log(params.get("page"));
console.log(params.get("sort"));`,
            out: `2\nasc`
          }
        },
        {
          h: '쿼리 문자열 만들기',
          html: `<p>비어있는 <code>new URLSearchParams()</code>를 만들고 <code>.set(이름, 값)</code>으로 값을 채운 뒤, <code>.toString()</code>으로 쿼리 문자열을 만들 수 있어요.</p>`,
          code: {
            label: 'urlparams_build.js',
            src: `const params2 = new URLSearchParams();
params2.set("page", "3");
params2.set("sort", "desc");
console.log(params2.toString());`,
            out: `page=3&sort=desc`
          }
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준']);
          return {
            type: 'blank',
            q: `<code>const fd = new FormData(); fd.append("name", "${name}");</code>일 때, <code>fd.get("name")</code>의 값은? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [name], placeholder: '값',
            why: `append로 넣은 값을 get으로 그대로 꺼내서 "${name}"이에요.`,
            hint: 'append로 넣은 값이 get으로 그대로 나와요.'
          };
        },
        () => {
          const page = randInt(1, 10);
          const sort = pick(['asc', 'desc']);
          return {
            type: 'blank',
            q: `<code>const params = new URLSearchParams("?page=${page}&sort=${sort}");</code>일 때, <code>params.get("page")</code>의 값은? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [String(page)], placeholder: '값',
            why: `쿼리 문자열의 page 값인 "${page}"를 문자열로 돌려줘요.`,
            hint: '쿼리 문자열에서 그 키에 해당하는 값을 찾아보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `폼 데이터를 담을 새 객체를 만드는 코드를 완성하세요.`,
          prefix: 'const fd = ', suffix: '();', accept: ['new FormData'], placeholder: '코드',
          why: '<code>new FormData()</code>로 폼 데이터를 담는 객체를 만들어요.',
          hint: 'new 키워드 뒤에 FormData를 붙이세요.'
        }),
        () => makeChoice(
          'URLSearchParams 객체를 다시 쿼리 문자열(<code>"a=1&b=2"</code> 형태)로 만들려면?',
          '<code>.toString()</code>을 부른다', ['그냥 console.log에 넣는다', '.join("&")를 부른다', '자동으로는 안 되고 직접 문자열을 이어붙여야 한다'],
          '<code>.toString()</code>은 URLSearchParams를 다시 쿼리 문자열 형태로 만들어줘요.',
          '객체를 문자열로 "바꾸는" 메서드 이름을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '빈 <code>URLSearchParams</code>를 만들어 <code>category</code>를 <code>"book"</code>으로, <code>page</code>를 <code>"1"</code>로 설정한 뒤, 결과를 <code>.toString()</code>으로 <code>console.log</code>하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'const params = new URLSearchParams();\nparams.set("category", "book");\nparams.set("page", "1");\nconsole.log(params.toString());',
          expectedOutput: 'category=book&page=1',
          why: 'set으로 넣은 순서대로 "키=값"이 &로 이어진 쿼리 문자열이 만들어져요.',
          hint: 'new URLSearchParams()를 만들고 set을 두 번 부른 뒤 toString()을 출력하세요.'
        }),
      ],
      boss: () => {
        const page = randInt(1, 20);
        const sort = pick(['asc', 'desc']);
        return {
          type: 'blank',
          q: `<code>const params = new URLSearchParams();</code> 후 <code>params.set("page", "${page}"); params.set("sort", "${sort}");</code>를 실행했을 때, <code>params.toString()</code>의 결과는?`,
          prefix: '', suffix: '', accept: [`page=${page}&sort=${sort}`], placeholder: '값',
          why: `설정한 순서대로 "page=${page}&sort=${sort}"가 만들어져요.`,
          hint: 'set을 부른 순서 그대로 "키=값"이 &로 이어붙어요.'
        };
      }
    },
    {
      id: 'observers',
      title: 'Intersection Observer와 Mutation Observer',
      ready: true,
      summary: '요소가 화면에 보이는지 감지하는 IntersectionObserver와, DOM 변화를 감지하는 MutationObserver를 배워요.',
      goals: ['IntersectionObserver로 화면 노출 감지하기', 'MutationObserver로 DOM 변화 감지하기', '언제 각각을 쓸지'],
      blocks: [
        {
          h: '요소가 화면에 보이는지 감지하기: IntersectionObserver',
          html: `<p><code>IntersectionObserver</code>는 관찰 중인 요소가 <b>화면(뷰포트) 안으로 들어오거나 나가는 순간</b>을 알려줘요. 스크롤 이벤트를 직접 계산하지 않아도 돼서 훨씬 효율적이에요.</p>`,
          code: {
            label: 'intersection.js',
            src: `const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log("화면에 보여요!");
    }
  });
});
observer.observe(document.querySelector("#target"));`
          },
          after: `<div class="note"><b>실무 활용</b> — 무한 스크롤(아래로 스크롤하면 더 불러오기), 이미지 lazy loading(화면에 보일 때만 진짜 이미지 불러오기), 광고 노출 확인 등에 자주 써요.</div>`
        },
        {
          h: 'DOM이 바뀌는 걸 감지하기: MutationObserver',
          html: `<p><code>MutationObserver</code>는 어떤 요소의 <b>자식이 추가/삭제되거나 속성이 바뀌는 것</b>을 감지해요.</p>`,
          code: {
            label: 'mutation.js',
            src: `const observer2 = new MutationObserver((mutations) => {
  console.log("무언가 바뀌었어요!", mutations.length);
});
observer2.observe(document.querySelector("#list"), { childList: true });`
          }
        },
        {
          h: '언제 각각을 쓸까요',
          html: `<p>"이 요소가 <b>화면에 보이는지</b>"가 궁금하면 <code>IntersectionObserver</code>, "이 요소의 <b>내용이나 구조가 바뀌는지</b>"가 궁금하면 <code>MutationObserver</code>를 써요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `요소가 화면에 보이는지 관찰하는 객체를 만드는 코드를 완성하세요.`,
          prefix: 'const observer = ', suffix: '(callback);', accept: ['new IntersectionObserver'], placeholder: '코드',
          why: '<code>new IntersectionObserver(콜백)</code>으로 화면 노출을 관찰하는 옵저버를 만들어요.',
          hint: 'new 키워드 뒤에 IntersectionObserver를 붙이세요.'
        }),
        () => ({
          type: 'blank',
          q: `옵저버가 실제로 특정 요소를 관찰하도록 시작시키는 메서드 이름을 쓰세요.`,
          prefix: 'observer.', suffix: '(document.querySelector("#target"));', accept: ['observe'], placeholder: '메서드 이름',
          why: '<code>.observe(요소)</code>로 그 요소에 대한 관찰을 시작해요.',
          hint: '"관찰하다"라는 뜻 그대로예요.'
        }),
        () => makeChoice(
          '이미지가 화면에 보일 때만 실제로 불러오는 lazy loading을 구현할 때 적합한 것은?',
          'IntersectionObserver', ['MutationObserver', 'setInterval로 계속 확인하기', 'addEventListener("scroll", ...)만 쓰기'],
          'IntersectionObserver는 요소가 화면에 들어오는 순간을 효율적으로 감지해서, lazy loading 구현에 딱 맞아요.',
          '"화면에 보이는지"를 감지하는 도구가 무엇인지 떠올려보세요.'
        ),
        () => makeChoice(
          '다른 스크립트가 특정 목록에 항목을 추가하는 걸 실시간으로 감지하고 싶을 때 적합한 것은?',
          'MutationObserver', ['IntersectionObserver', 'FileReader', 'URLSearchParams'],
          'MutationObserver는 DOM의 자식 추가/삭제 같은 변화를 감지해요.',
          '"화면에 보이는지"가 아니라 "구조가 바뀌는지"를 감지하고 싶은 상황이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"#list"</code> 요소의 자식 추가/삭제(<code>childList: true</code>)를 감지하는 <code>MutationObserver</code>를 만들고 관찰을 시작하는 코드를 작성하세요. (콜백은 변화 개수를 출력)',
          starter: '',
          rows: 3,
          placeholder: 'const observer = new MutationObserver((mutations) => {\n  console.log(mutations.length);\n});\nobserver.observe(document.querySelector("#list"), { childList: true });',
          accept: ['const observer = new MutationObserver((mutations) => {\n  console.log(mutations.length);\n});\nobserver.observe(document.querySelector("#list"), { childList: true });'],
          why: 'MutationObserver를 만들고 observe(요소, 옵션)로 관찰을 시작해요.',
          hint: 'new MutationObserver(콜백) 후 .observe(요소, { childList: true })를 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '광고 배너가 사용자 화면에 실제로 몇 번 노출됐는지 세고 싶을 때 가장 적합한 도구는?',
        'IntersectionObserver', ['MutationObserver', 'setTimeout', 'FileReader'],
        '광고가 "화면에 들어왔는지"를 감지해야 하니, IntersectionObserver가 정확히 이 상황을 위한 도구예요.',
        '"노출됐다"는 건 화면 안에 들어왔다는 뜻이라는 걸 생각해보세요.'
      )
    },
    {
      id: 'customEvents',
      title: 'CustomEvent로 나만의 이벤트 만들기',
      ready: true,
      summary: '브라우저가 기본 제공하는 click, input 같은 이벤트 말고, 내가 원하는 이름과 데이터를 가진 이벤트를 직접 만들어요.',
      goals: ['CustomEvent로 이벤트 만들기', 'detail로 데이터 담아 보내기', '컴포넌트끼리 느슨하게 소통하기'],
      blocks: [
        {
          h: '나만의 이벤트 만들기: CustomEvent',
          html: `<p><code>new CustomEvent("이벤트이름")</code>으로 나만의 이벤트를 만들고, <code>.dispatchEvent(...)</code>로 실제로 발생시킬 수 있어요. 그 이름으로 등록한 <code>addEventListener</code>가 그대로 반응해요.</p>`,
          code: {
            label: 'custom_event_basic.js',
            src: `const el = document.createElement("div");
el.addEventListener("my-event", () => {
  console.log("커스텀 이벤트 발생!");
});
el.dispatchEvent(new CustomEvent("my-event"));`,
            out: `커스텀 이벤트 발생!`
          }
        },
        {
          h: '이벤트에 데이터 담아 보내기: detail',
          html: `<p><code>new CustomEvent("이름", { detail: 값 })</code>처럼 <code>detail</code>에 원하는 데이터를 담아 보낼 수 있어요. 받는 쪽에서는 <code>event.detail</code>로 꺼내요.</p>`,
          code: {
            label: 'custom_event_detail.js',
            src: `el.addEventListener("user-added", (event) => {
  console.log(event.detail.name);
});
el.dispatchEvent(new CustomEvent("user-added", { detail: { name: "지수" } }));`,
            out: `지수`
          }
        },
        {
          h: '왜 커스텀 이벤트를 쓸까요',
          html: `<p>서로 직접 <code>import</code>해서 연결되지 않은 코드 조각들끼리도, 커스텀 이벤트를 통해 <b>느슨하게 소통</b>할 수 있어요. "무언가 일어났다"고 이벤트만 발생시키면, 관심 있는 쪽에서 알아서 듣고 반응해요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>"saved"</code>라는 이름의 커스텀 이벤트를 만드는 코드를 완성하세요.`,
          prefix: 'const event = ', suffix: '("saved");', accept: ['new CustomEvent'], placeholder: '코드',
          why: '<code>new CustomEvent(이름)</code>으로 나만의 이벤트를 만들어요.',
          hint: 'new 키워드 뒤에 CustomEvent를 붙이세요.'
        }),
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>el.addEventListener("user-added", (event) => console.log(event.detail.name));</code>과 <code>el.dispatchEvent(new CustomEvent("user-added", { detail: { name: "${name}" } }));</code>를 실행하면 무엇이 출력될까요? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [name], placeholder: '값',
            why: `<code>event.detail.name</code>은 dispatchEvent에서 넘긴 detail의 name 값인 "${name}"이에요.`,
            hint: 'detail에 담아 보낸 데이터가 event.detail로 그대로 전달돼요.'
          };
        },
        () => ({
          type: 'blank',
          q: `만든 이벤트를 요소에서 실제로 발생시키는 메서드 이름을 쓰세요.`,
          prefix: 'el.', suffix: '(new CustomEvent("saved"));', accept: ['dispatchEvent'], placeholder: '메서드 이름',
          why: '<code>.dispatchEvent(이벤트)</code>로 이벤트를 실제로 발생시켜요.',
          hint: '"이벤트를 내보내다, 발송하다"라는 뜻이 합쳐진 이름이에요.'
        }),
        () => makeChoice(
          '커스텀 이벤트를 쓰면 좋은 점은?',
          '서로 직접 연결되지 않은 코드끼리도 느슨하게 소통할 수 있어서',
          ['실행 속도가 항상 더 빨라져서', 'addEventListener 없이도 자동으로 반응해서', '커스텀 이벤트가 없으면 클릭 이벤트를 아예 못 써서'],
          '이벤트를 발생시키는 쪽과 듣는 쪽이 서로의 존재를 몰라도, 이벤트 이름만 맞으면 소통할 수 있어요.',
          '"느슨한 연결"이 왜 유용한지 생각해보세요 — 서로 직접 참조하지 않아도 된다는 뜻이에요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '<code>div</code> 요소를 만들어 <code>"greet"</code> 이벤트를 등록하고(<code>event.detail</code>을 <code>console.log</code>), <code>detail: "안녕"</code>을 담아 <code>dispatchEvent</code>로 발생시키는 코드를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'const el = document.createElement("div");\nel.addEventListener("greet", (event) => {\n  console.log(event.detail);\n});\nel.dispatchEvent(new CustomEvent("greet", { detail: "안녕" }));',
          expectedOutput: '안녕',
          why: 'detail에 담은 "안녕"이 event.detail로 그대로 전달돼서 출력돼요.',
          hint: 'CustomEvent의 두 번째 인자로 { detail: "안녕" }을 넘기세요.'
        }),
      ],
      boss: () => {
        const item = pick(['사과', '바나나', '포도']);
        const qty = randInt(1, 5);
        return {
          type: 'blank',
          q: `<code>el.addEventListener("cart-added", (event) => console.log(\`\${event.detail.item} x\${event.detail.qty}\`));</code>과 <code>el.dispatchEvent(new CustomEvent("cart-added", { detail: { item: "${item}", qty: ${qty} } }));</code>를 실행하면 무엇이 출력될까요?`,
          prefix: '', suffix: '', accept: [`${item} x${qty}`], placeholder: '값',
          why: `detail의 item("${item}")과 qty(${qty})를 이어붙여서 "${item} x${qty}"가 출력돼요.`,
          hint: 'event.detail.item과 event.detail.qty를 템플릿 리터럴로 이어붙인다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'clipboardApi',
      title: 'navigator.clipboard로 클립보드 다루기',
      ready: true,
      summary: '버튼 클릭 한 번으로 텍스트를 클립보드에 복사하는 clipboard API를 배워요. 이 사이트도 실제로 이 기능을 써요.',
      goals: ['clipboard.writeText로 복사하기', '왜 Promise(비동기)로 동작하는지', '이 사이트의 실제 활용 예'],
      blocks: [
        {
          h: '클립보드에 복사하기: writeText',
          html: `<p><code>navigator.clipboard.writeText(문자열)</code>은 그 문자열을 사용자의 클립보드로 복사해요. <b>Promise</b>를 반환해서, 복사가 끝나면 <code>.then()</code>으로 다음 동작을 이어갈 수 있어요.</p>`,
          code: {
            label: 'clipboard_basic.js',
            src: `navigator.clipboard.writeText("복사할 텍스트").then(() => {
  console.log("복사 완료!");
});`
          }
        },
        {
          h: '왜 Promise(비동기)로 동작할까요',
          html: `<p>클립보드 접근은 보안이 걸린 민감한 기능이라, 브라우저가 권한을 확인하는 데 시간이 걸릴 수 있어요. 그래서 즉시 끝나지 않고 <b>Promise</b>로 처리돼요.</p>`
        },
        {
          h: '이 사이트도 실제로 이렇게 써요',
          html: `<p>코드 예제 옆에 있는 "복사" 버튼을 누르면, 정확히 <code>navigator.clipboard.writeText()</code>가 실행돼서 그 코드가 클립보드에 복사돼요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `문자열을 클립보드로 복사하는 메서드를 쓰세요.`,
          prefix: 'navigator.clipboard.', suffix: '("복사할 내용")', accept: ['writeText'], placeholder: '메서드 이름',
          why: '<code>navigator.clipboard.writeText(문자열)</code>로 클립보드에 복사해요.',
          hint: '"텍스트를 쓴다"는 뜻 그대로예요.'
        }),
        () => makeChoice(
          '<code>navigator.clipboard.writeText()</code>가 Promise를 반환하는 이유는?',
          '클립보드 접근은 보안이 걸린 기능이라 권한 확인에 시간이 걸릴 수 있어서',
          ['문자열이 항상 길기 때문에', 'writeText는 원래 숫자만 반환할 수 있어서', '클립보드 기능은 미래에만 동작해서'],
          '민감한 권한이 필요한 작업이라 즉시 끝나지 않을 수 있어서 Promise로 처리해요.',
          '민감한 브라우저 기능들(위치 정보, 카메라 등)이 대부분 Promise 기반이라는 공통점을 생각해보세요.'
        ),
        () => makeChoice(
          '복사가 끝난 뒤 실행할 동작을 등록하는 방법은?',
          '<code>.then()</code>을 이어붙인다', ['복사 직후 바로 다음 줄에 쓰면 항상 순서가 보장된다', 'setTimeout으로 감싸야만 한다', '복사 후엔 아무것도 못 한다'],
          'writeText가 Promise를 반환하니, <code>.then(콜백)</code>으로 복사가 끝난 뒤 할 일을 정해요.',
          'Promise를 다루는 방법을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '변수 <code>code</code>에 담긴 문자열을 클립보드로 복사하고, 성공하면 <code>"복사됨"</code>을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'navigator.clipboard.writeText(code).then(() => {\n  console.log("복사됨");\n});',
          accept: ['navigator.clipboard.writeText(code).then(() => {\n  console.log("복사됨");\n});'],
          why: 'writeText(code) 후 .then()으로 성공 시 할 일을 정해요.',
          hint: 'navigator.clipboard.writeText(code).then(() => { console.log("복사됨"); });를 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '클립보드 복사가 실패했을 때(권한 거부 등)를 대비해서 오류 메시지를 보여주고 싶다면, Promise 체인에 무엇을 이어붙여야 할까요?',
        '<code>.catch(오류처리함수)</code>', ['<code>.then()</code>을 한 번 더 붙인다', '아무것도 안 해도 자동으로 처리된다', 'try 블록으로 감싸면 자동으로 됨(await 없이)'],
        'Promise가 실패(reject)했을 때 처리하려면 <code>.catch()</code>를 이어붙여야 해요.',
        'Promise 체인에서 성공(then)과 실패(catch)를 각각 어떻게 처리하는지 떠올려보세요.'
      )
    },
    {
      id: 'classListStyle',
      title: 'classList와 style로 화면 조작하기',
      ready: true,
      summary: 'CSS 클래스를 붙이고 떼는 classList와, 요소의 스타일을 직접 바꾸는 style 속성을 배워요.',
      goals: ['classList.add/remove/toggle', 'classList.contains로 확인하기', 'style로 직접 스타일 바꾸기'],
      blocks: [
        {
          h: 'CSS 클래스를 붙이고 떼기: classList',
          html: `<p><code>요소.classList.add("클래스이름")</code>으로 클래스를 붙이고, <code>.remove("클래스이름")</code>으로 떼요.</p>`,
          code: {
            label: 'classlist_basic.js',
            src: `const box = document.createElement("div");
box.classList.add("active");
console.log(box.className);
box.classList.remove("active");
console.log(box.className);`,
            out: `active\n`
          }
        },
        {
          h: '있으면 빼고 없으면 붙이기: toggle',
          html: `<p><code>.toggle("클래스이름")</code>은 그 클래스가 <b>있으면 없애고, 없으면 붙여요</b>. <code>.contains("클래스이름")</code>으로 지금 그 클래스가 있는지 확인할 수 있어요.</p>`,
          code: {
            label: 'classlist_toggle.js',
            src: `box.classList.toggle("active");
console.log(box.classList.contains("active"));
box.classList.toggle("active");
console.log(box.classList.contains("active"));`,
            out: `true\nfalse`
          }
        },
        {
          h: '직접 스타일 바꾸기: style',
          html: `<p><code>요소.style.속성</code>으로 인라인 스타일을 직접 바꿀 수 있어요. 하지만 실무에서는 스타일을 <b>CSS 파일에서 클래스로 관리</b>하고, JS에서는 <code>classList</code>로 그 클래스를 붙였다 뗐다 하는 방식을 더 선호해요(유지보수하기 더 편해서).</p>`,
          code: {
            label: 'style_direct.js',
            src: `box.style.color = "red";
console.log(box.style.color);`,
            out: `red`
          }
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>box.classList.add("active")</code>를 두 번 연달아 실행해도 안전한 이유는?',
          '이미 있는 클래스를 또 추가해도 중복되지 않아서', ['두 번째 실행부터는 오류가 나서', '자동으로 다른 클래스로 바뀌어서', 'add는 한 번만 실행 가능해서'],
          'classList.add는 이미 있는 클래스를 다시 추가해도 중복되지 않고 그대로 유지돼요.',
          '집합(Set)처럼 중복을 허용하지 않는 구조라고 생각해보세요.'
        ),
        () => {
          const toggles = randInt(1, 4);
          const result = toggles % 2 === 1;
          return {
            type: 'blank',
            q: `클래스가 없는 상태에서 <code>box.classList.toggle("active")</code>를 ${toggles}번 연달아 실행하면, <code>box.classList.contains("active")</code>의 결과는? (<code>true</code> 또는 <code>false</code>)`,
            prefix: '', suffix: '', accept: [String(result)], placeholder: 'true 또는 false',
            why: `toggle을 홀수 번 하면 결국 "있는" 상태(${result}), 짝수 번 하면 원래 상태(없음)로 돌아가요. ${toggles}번은 ${toggles % 2 === 1 ? '홀수라서 true' : '짝수라서 false'}예요.`,
            hint: '토글은 할 때마다 있음/없음이 반전돼요. 홀수 번이면 원래와 반대, 짝수 번이면 원래 그대로예요.'
          };
        },
        () => ({
          type: 'blank',
          q: `요소가 그 클래스를 가지고 있는지 확인하는 메서드를 쓰세요.`,
          prefix: 'box.classList.', suffix: '("active")', accept: ['contains'], placeholder: '메서드 이름',
          why: '<code>.contains(클래스이름)</code>은 그 클래스가 있는지 true/false로 알려줘요.',
          hint: '"포함하다"라는 뜻 그대로예요.'
        }),
        () => makeChoice(
          '실무에서 스타일을 바꿀 때 <code>style</code> 속성 직접 조작보다 <code>classList</code>를 더 선호하는 이유는?',
          '스타일을 CSS 파일에서 한 곳에 모아 관리할 수 있어서 유지보수가 편해서',
          ['classList가 항상 실행 속도가 더 빨라서', 'style 속성은 곧 사라질 예정이라서', 'classList만 애니메이션을 지원해서'],
          '클래스 방식은 실제 스타일 값이 CSS 파일에 모여있어서, 디자인을 바꿀 때 JS 코드를 안 건드려도 돼요.',
          '스타일 값 자체를 어디서 관리하는지의 차이를 생각해보세요.'
        ),
        () => ({
          type: 'code',
          mode: 'run-js',
          q: '<code>div</code> 요소를 만들어 <code>"highlight"</code> 클래스를 추가한 뒤, <code>classList.contains("highlight")</code>를 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'const el = document.createElement("div");\nel.classList.add("highlight");\nconsole.log(el.classList.contains("highlight"));',
          expectedOutput: 'true',
          why: 'add로 클래스를 붙였으니 contains는 true예요.',
          hint: 'classList.add("highlight") 후 classList.contains("highlight")를 출력하세요.'
        }),
      ],
      boss: () => {
        const toggles = randInt(2, 5);
        const result = toggles % 2 === 1;
        return {
          type: 'blank',
          q: `클래스가 없는 새 요소에 <code>classList.toggle("open")</code>을 ${toggles}번 연달아 실행한 뒤, <code>classList.contains("open")</code>의 결과는? (<code>true</code> 또는 <code>false</code>)`,
          prefix: '', suffix: '', accept: [String(result)], placeholder: 'true 또는 false',
          why: `${toggles}번은 ${toggles % 2 === 1 ? '홀수라서 결국 있는 상태(true)' : '짝수라서 결국 원래(없음, false)'}가 돼요.`,
          hint: '토글을 짝수 번 하면 원점으로, 홀수 번 하면 반대 상태가 된다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'fileApi',
      title: 'File API와 FileReader',
      ready: true,
      summary: '사용자가 고른 파일의 정보를 확인하고, 그 내용을 읽어서 미리보기까지 만드는 File API를 배워요.',
      goals: ['input[type="file"]로 파일 선택받기', 'FileReader로 파일 내용 읽기', '이미지 미리보기 만들기'],
      blocks: [
        {
          h: '사용자가 고른 파일 정보 얻기',
          html: `<p><code>&lt;input type="file"&gt;</code>에서 파일을 고르면, <code>input.files[0]</code>으로 그 파일(<code>File</code> 객체)에 접근할 수 있어요. <code>.name</code>, <code>.size</code> 등으로 정보를 확인해요.</p>`,
          code: {
            label: 'file_select.js',
            src: `const input = document.querySelector('input[type="file"]');
input.addEventListener("change", () => {
  const file = input.files[0];
  console.log(file.name, file.size);
});`
          }
        },
        {
          h: '파일 내용을 읽기: FileReader',
          html: `<p><code>FileReader</code>는 파일 내용을 실제로 읽어와요. <code>.readAsText(file)</code>로 읽기 시작하면, 다 읽었을 때 <code>onload</code>가 실행되고 <code>reader.result</code>에 내용이 담겨요.</p>`,
          code: {
            label: 'file_read.js',
            src: `const reader = new FileReader();
reader.onload = () => {
  console.log(reader.result);
};
reader.readAsText(file);`
          }
        },
        {
          h: '이미지 미리보기 만들기',
          html: `<p><code>.readAsDataURL(file)</code>은 파일을 <b>base64로 인코딩된 문자열</b>로 읽어와서, <code>&lt;img&gt;</code>의 <code>src</code>에 바로 넣을 수 있게 해줘요. 사용자가 이미지를 고르자마자 미리보기를 보여줄 때 이 방식을 써요.</p>`,
          code: {
            label: 'image_preview.js',
            src: `reader.onload = () => {
  const img = document.createElement("img");
  img.src = reader.result;
};
reader.readAsDataURL(file);`
          }
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `사용자가 <code>&lt;input type="file"&gt;</code>에서 고른 첫 번째 파일에 접근하는 코드를 완성하세요.`,
          prefix: 'const file = input.files[', suffix: '];', accept: ['0'], placeholder: '숫자',
          why: '<code>input.files</code>는 배열과 비슷한 목록이라, 첫 번째 파일은 <code>[0]</code>이에요.',
          hint: '순번은 0부터 시작해요.'
        }),
        () => ({
          type: 'blank',
          q: `파일 내용을 읽어들이는 새 객체를 만드는 코드를 완성하세요.`,
          prefix: 'const reader = ', suffix: '();', accept: ['new FileReader'], placeholder: '코드',
          why: '<code>new FileReader()</code>로 파일을 읽는 도구를 만들어요.',
          hint: 'new 키워드 뒤에 FileReader를 붙이세요.'
        }),
        () => makeChoice(
          '이미지를 골랐을 때 그 이미지를 화면에 바로 미리보기로 보여주고 싶다면, FileReader의 어떤 메서드를 써야 할까요?',
          '<code>readAsDataURL</code>', ['<code>readAsText</code>', '<code>readAsNumber</code>', '<code>readAsJSON</code>'],
          '<code>readAsDataURL</code>은 파일을 이미지 태그의 src에 바로 쓸 수 있는 base64 문자열로 읽어줘요.',
          '텍스트 파일용과 이미지 미리보기용 메서드가 다르다는 걸 떠올려보세요.'
        ),
        () => makeChoice(
          '파일 읽기가 끝났을 때 실행되는, FileReader의 이벤트 핸들러 속성 이름은?',
          '<code>onload</code>', ['<code>onclick</code>', '<code>onchange</code>', '<code>onready</code>'],
          '<code>reader.onload</code>는 파일을 다 읽었을 때 실행돼요.',
          '"다 실려서(load) 준비됐을 때"라는 뜻의 이름이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>file</code>이라는 변수(이미 File 객체가 담겨 있다고 가정)를 텍스트로 읽어서, 다 읽으면 그 내용을 <code>console.log</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'const reader = new FileReader();\nreader.onload = () => {\n  console.log(reader.result);\n};\nreader.readAsText(file);',
          accept: ['const reader = new FileReader();\nreader.onload = () => {\n  console.log(reader.result);\n};\nreader.readAsText(file);'],
          why: 'FileReader를 만들고 onload에 할 일을 등록한 뒤, readAsText로 읽기를 시작해요.',
          hint: 'new FileReader() 후 onload 핸들러를 등록하고, readAsText(file)을 호출하세요.'
        }),
      ],
      boss: () => makeChoice(
        '사용자가 프로필 사진을 업로드하자마자, 서버에 보내기 전에 화면에서 바로 미리 보여주고 싶어요. FileReader의 어떤 메서드가 적합할까요?',
        'readAsDataURL', ['readAsText', 'readAsArrayBuffer만 가능하고 미리보기는 불가능', '아무 메서드도 필요 없다'],
        'readAsDataURL로 이미지를 base64 문자열로 읽으면, 서버에 보내기 전에도 <img src="...">로 바로 미리보기를 보여줄 수 있어요.',
        '이미지 파일을 화면에 즉시 표시하려면 어떤 형식으로 읽어야 하는지 생각해보세요.'
      )
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
