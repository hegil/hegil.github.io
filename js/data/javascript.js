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
    }],
  tierBoss: {
    beginner: () => ({
      type: 'code',
      mode: 'run-js',
      q: 'let으로 변수 <code>age</code>에 15를 저장하고, age가 18 이상이면 "성인"을, 아니면 "미성년자"를 <code>console.log</code>로 출력하는 전체 코드를 작성하세요.',
      starter: '',
      rows: 4,
      placeholder: 'let age = 15;\nif (age >= 18) {\n  console.log("성인");\n} else {\n  console.log("미성년자");\n}',
      expectedOutput: '미성년자',
      why: 'age가 15라서 18 이상 조건이 거짓이 되어 "미성년자"가 출력돼요.',
      hint: 'let age = 15;로 변수를 만들고, if/else로 나눠서 console.log 하세요.'
    }),
    intermediate: () => ({
      type: 'code',
      mode: 'run-js',
      q: '숫자를 받아 제곱을 반환하는 함수 <code>square</code>를 만들고, for문으로 1부터 3까지 각각 결과를 <code>console.log</code>로 출력하는 전체 코드를 작성하세요.',
      starter: '',
      rows: 5,
      placeholder: 'function square(n) {\n  return n * n;\n}\nfor (let i = 1; i <= 3; i++) {\n  console.log(square(i));\n}',
      expectedOutput: '1\n4\n9',
      why: '1, 2, 3의 제곱은 각각 1, 4, 9예요. 함수를 만들고 반복문으로 호출해서 출력하면 돼요.',
      hint: 'function square(n) { return n * n; }로 함수를 만들고, for문으로 1부터 3까지 호출·출력하세요.'
    }),
    advanced: () => ({
      type: 'code',
      mode: 'run-js',
      q: '배열 <code>[3, 1, 4, 1, 5]</code>에서 가장 큰 값을 찾아 <code>console.log</code>로 출력하는 코드를 작성하세요. (Math.max, 전개 연산자, 반복문 등 자유롭게 사용하세요)',
      starter: '',
      rows: 3,
      placeholder: 'const nums = [3, 1, 4, 1, 5];\nconsole.log(Math.max(...nums));',
      expectedOutput: '5',
      why: 'Math.max(...배열)은 배열 안에서 가장 큰 값을 찾아줘요. 반복문으로 직접 찾아도 결과는 같아요.',
      hint: 'Math.max(...nums)를 쓰거나, 반복문으로 하나씩 비교하면서 가장 큰 값을 찾아보세요.'
    }),
  }
};
