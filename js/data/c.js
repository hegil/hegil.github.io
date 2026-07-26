/* C 강의·문제 데이터 — 단원을 추가하려면 units 배열에 항목을 넣으면 됩니다. */
COURSES.c = {
    name: 'C',
    tagline: '컴퓨터가 실제로 일하는 방식에 가장 가까운, 기초를 탄탄히 다지는 언어',
    units: [{
      id: 'vars',
      title: '변수와 자료형',
      ready: true,
      summary: '변수를 선언하고, printf로 화면에 출력하는 방법을 아주 쉬운 예제로 배워요.',
      goals: ['int / float / char', 'printf 서식 지정자', 'sizeof', '정수 나눗셈'],
      blocks: [
        {
          h: '선언하고, 정해진 표시(서식 지정자)로 출력해요',
          html: `<p>C 언어도 자바처럼 자료형을 먼저 적어 변수를 만들어요. 화면에 값을 보여줄 땐 <code>printf</code>라는 함수를 쓰는데, 값의 종류에 맞는 <b>서식 지정자</b>(예: <code>%d</code>)를 써야 해요.</p>
                 <p><code>\\n</code>은 "여기서 줄을 바꿔라"는 뜻이에요. 이걸 빼먹으면 출력이 한 줄로 다 붙어버려요.</p>`,
          code: {
            label: 'variables.c',
            src: `#include <stdio.h>

int main(void) {
    int age = 17;
    float height = 165.3f;
    char grade = 'A';

    printf("나이: %d\\n", age);
    printf("키: %.1f\\n", height);
    printf("등급: %c\\n", grade);
    return 0;
}`,
            out: `나이: 17\n키: 165.3\n등급: A`
          }
        },
        {
          h: '서식 지정자 표',
          html: `<table>
                   <tr><th>지정자</th><th>어떤 값</th><th>비고</th></tr>
                   <tr><td><code>%d</code></td><td>정수(<code>int</code>)</td><td>소수점 없는 숫자</td></tr>
                   <tr><td><code>%f</code></td><td>실수(<code>float</code>)</td><td><code>%.1f</code>처럼 소수점 자리 수 지정 가능</td></tr>
                   <tr><td><code>%c</code></td><td>문자(<code>char</code>)</td><td>글자 딱 1개</td></tr>
                   <tr><td><code>%s</code></td><td>문자열</td><td>여러 글자</td></tr>
                 </table>
                 <p>값의 종류와 지정자가 안 맞으면(예: 실수를 <code>%d</code>로 출력) 엉뚱한 값이 나올 수 있어요.</p>`
        },
        {
          h: '자료형 크기(sizeof)와 정수 나눗셈',
          html: `<p><code>sizeof(자료형)</code>은 그 자료형이 컴퓨터 메모리에서 몇 바이트를 차지하는지 알려줘요. 보통 <code>int</code>는 4바이트, <code>char</code>는 1바이트예요.</p>
                 <p>정수끼리 나누면 소수점이 사라져요. 나머지가 궁금하면 <code>%</code>(퍼센트) 연산자를 씁니다.</p>`,
          code: {
            label: 'sizeof.c',
            src: `printf("%d\\n", 7 / 2);           // 3
printf("%d\\n", 7 % 2);           // 1 (나머지)
printf("%.1f\\n", 7 / 2.0);       // 3.5`,
            out: `3\n1\n3.5`
          },
          after: `<div class="note"><b>주의</b> — C에서는 값을 넣지 않고 선언만 한 변수 안에 아무 값이나 들어있을 수 있어요(정해지지 않은 값). 꼭 초기값을 넣어주세요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const kinds = [
            { desc: '정수', ex: String(randInt(1, 999)), spec: '%d' },
            { desc: '실수', ex: `${randInt(1, 99)}.${randInt(1, 9)}`, spec: '%f' },
            { desc: '문자 하나', ex: `'${pick(['A', 'b', 'Z'])}'`, spec: '%c' },
            { desc: '문자열', ex: `"${pick(['안녕', 'C언어', '고양이'])}"`, spec: '%s' },
          ];
          const it = pick(kinds);
          const others = ['%d', '%f', '%c', '%s'].filter(s => s !== it.spec);
          return makeChoice(
            `${it.desc} 값 <code>${it.ex}</code>을(를) 출력하는 서식 지정자로 알맞은 것은?`,
            `<code>${it.spec}</code>`, others.map(s => `<code>${s}</code>`),
            `${it.desc}는 <code>${it.spec}</code>로 출력해요.`,
            '표에서 배운 서식 지정자 네 가지를 떠올려보세요.'
          );
        },
        () => {
          const a = randInt(10, 50), b = randInt(2, 9);
          const useMod = Math.random() < 0.5;
          const result = useMod ? a % b : Math.floor(a / b);
          return {
            type: 'blank',
            q: `<code>printf("%d", ${a} ${useMod ? '%' : '/'} ${b});</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
            why: useMod
              ? `<code>%</code>는 나머지를 구해요. ${a}를 ${b}로 나눈 나머지는 ${result}예요.`
              : `정수끼리 나누면 소수점이 사라져요. ${a} ÷ ${b} = ${result} (나머지는 버림)`,
            hint: useMod ? '%는 나머지를 구하는 연산자예요.' : '정수끼리 나누면 소수점 아래는 그냥 버려져요.'
          };
        },
        () => {
          const n = randInt(1, 3);
          const height = `${randInt(150, 190)}.${randInt(1, 9)}`;
          return {
            type: 'blank',
            q: `실수 <code>height</code>(${height})를 소수점 아래 ${n}자리까지 출력하려고 해요. 빈칸을 채우세요.`,
            prefix: 'printf("', suffix: '\\n", height);', accept: [`%.${n}f`], placeholder: '서식 지정자',
            why: `<code>%.${n}f</code>는 소수점 아래 ${n}자리까지 반올림해서 보여줘요.`,
            hint: '%f 앞에 점(.)과 자리 수를 넣으면 소수점 자리를 정할 수 있어요.'
          };
        },
        () => makeChoice(
          'C에서 선언만 하고 값을 넣지 않은 변수에 대한 설명으로 옳은 것은?',
          '아무 값(정해지지 않은 값)이 들어있다',
          ['자동으로 0이 들어간다', '자동으로 빈 문자열이 들어간다', '사용할 수 없어서 오류가 난다'],
          '지역 변수는 자동으로 초기화되지 않아서, 값을 넣기 전까지는 무슨 값이 있을지 알 수 없어요.',
          'C는 값을 자동으로 채워주지 않아요.'
        ),
        () => ({
          type: 'code',
          q: '정수 20을 담는 변수 <code>age</code>를 선언하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'int age = 20;',
          accept: ['int age = 20;'],
          why: 'C는 <code>자료형 이름 = 값;</code> 순서로 써요. 정수니까 <code>int</code>를 써요.',
          hint: '자료형(int)을 이름 앞에 적고, 문장 끝에 세미콜론을 잊지 마세요.'
        }),
      ],
      boss: () => {
        const age = randInt(10, 99);
        const grade = pick(['A', 'B', 'C']);
        return {
          type: 'blank',
          q: `<code>int age = ${age}; char grade = '${grade}';</code>로 정한 뒤 <code>printf("%d살, 등급 %c", age, grade);</code>를 실행하면 무엇이 출력될까요? 따옴표 없이 그대로 입력하세요.`,
          prefix: '', suffix: '', accept: [`${age}살, 등급 ${grade}`], placeholder: '출력될 문장',
          why: `<code>%d</code> 자리에 ${age}, <code>%c</code> 자리에 '${grade}'가 순서대로 들어가요.`,
          hint: 'printf의 서식 지정자는 순서대로 뒤에 오는 값들과 하나씩 짝지어져요.'
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
          html: `<p>조건이 참(0이 아닌 값)이면 중괄호 <code>{ }</code> 안의 코드가 실행돼요. 여러 조건은 <code>else if</code>로 이어붙이고, 마지막엔 <code>else</code>를 씁니다.</p>`,
          code: {
            label: 'flow.c',
            src: `int age = 17;

if (age >= 20) {
    printf("성인이에요\\n");
} else if (age >= 13) {
    printf("청소년이에요\\n");
} else {
    printf("어린이예요\\n");
}`,
            out: `청소년이에요`
          }
        },
        {
          h: '비교 연산자와 && / ||',
          html: `<table>
                   <tr><th>연산자</th><th>뜻</th></tr>
                   <tr><td><code>==</code></td><td>같다</td></tr>
                   <tr><td><code>!=</code></td><td>다르다</td></tr>
                   <tr><td><code>&gt;</code>, <code>&lt;</code></td><td>크다, 작다</td></tr>
                 </table>
                 <p>둘 다 만족해야 하면 <code>&&</code>, 하나만 만족해도 되면 <code>||</code>예요.</p>`,
          code: {
            label: 'and_or.c',
            src: `int age = 17;
int hasTicket = 1;   // C는 boolean이 따로 없어서 1(참)/0(거짓)로 표현해요

if (age >= 14 && hasTicket) {
    printf("입장 가능\\n");
}`,
            out: `입장 가능`
          }
        },
        {
          h: 'C에는 진짜 boolean이 없어요',
          html: `<p>C 언어는 참/거짓을 <b>0(거짓)</b>과 <b>0이 아닌 모든 값(참, 보통 1)</b>으로 표현해요. 비교 연산의 결과도 사실 1 또는 0이라는 정수예요.</p>`,
          after: `<div class="note"><b>예시</b> — <code>printf("%d", 5 > 3);</code>는 <code>1</code>을 출력해요.</div>`
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
          const op = pick(['==', '>', '<']);
          const result = (op === '==' ? a === b : op === '>' ? a > b : a < b) ? 1 : 0;
          return {
            type: 'blank',
            q: `<code>printf("%d", ${a} ${op} ${b});</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
            why: `C에서 비교 결과는 참이면 1, 거짓이면 0으로 출력돼요. ${a} ${op} ${b}는 ${result === 1 ? '참(1)' : '거짓(0)'}이에요.`,
            hint: '비교 결과가 맞으면 1, 틀리면 0이 출력돼요.'
          };
        },
        () => makeChoice(
          'C에서 "거짓"을 나타내는 값은?',
          '<code>0</code>', ['<code>false</code>', '<code>-1</code>', '<code>null</code>'],
          'C는 0을 거짓, 0이 아닌 값을 참으로 봐요.',
          'C에는 진짜 boolean이 없어서 숫자로 참/거짓을 나타내요.'
        ),
        () => ({
          type: 'blank',
          q: `조건을 감싸는 문장 부호를 빈칸에 채우세요.`,
          prefix: 'if ', suffix: 'age >= 20) { ... }', accept: ['('], placeholder: '문장 부호',
          why: 'C에서 조건은 소괄호 <code>( )</code> 안에 써요.',
          hint: '함수를 호출할 때 쓰는 것과 같은 괄호예요.'
        }),
        () => makeChoice(
          '두 조건이 모두 참이어야 실행되도록 하는 연산자는?',
          '<code>&&</code>', ['<code>||</code>', '<code>!</code>', '<code>==</code>'],
          '<code>&&</code>는 두 조건이 모두 참이어야 참이 돼요.',
          '기호를 두 번 겹쳐 쓰는 연산자 중 "그리고"를 뜻하는 것이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>score</code>가 60 이상이면 <code>printf("합격")</code>을, 아니면 <code>printf("불합격")</code>을 실행하는 if-else문을 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'if (score >= 60) {\n    printf("합격");\n} else {\n    printf("불합격");\n}',
          accept: ['if (score >= 60) {printf("합격");} else {printf("불합격");}'],
          why: '<code>if (조건) { ... } else { ... }</code> 형태로 조건에 따라 다른 코드를 실행해요.',
          hint: 'if (score >= 60) { } 안에 성공 코드를, else { } 안에 실패 코드를 넣으세요.'
        }),
      ],
      boss: () => {
        const age = randInt(1, 25);
        const hasTicket = Math.random() < 0.5 ? 1 : 0;
        const ok = age >= 14 && hasTicket ? 1 : 0;
        return {
          type: 'blank',
          q: `<code>int age = ${age}; int hasTicket = ${hasTicket};</code>일 때 <code>printf("%d", age >= 14 && hasTicket);</code>의 출력은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(ok)], placeholder: '숫자',
          why: `age는 ${age >= 14 ? '14 이상' : '14 미만'}이고 hasTicket은 ${hasTicket}이에요. 둘 다 참이어야 하는 && 결과가 ${ok === 1 ? '참(1)' : '거짓(0)'}으로 출력돼요.`,
          hint: 'C에서 조건 결과는 참이면 1, 거짓이면 0으로 출력돼요. &&는 둘 다 참이어야 참이에요.'
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
          html: `<p><code>for (시작; 조건; 변화) { ... }</code> 형태로 씁니다.</p>`,
          code: {
            label: 'for.c',
            src: `for (int i = 0; i < 5; i++) {
    printf("%d번째 인사\\n", i);
}`,
            out: `0번째 인사\n1번째 인사\n2번째 인사\n3번째 인사\n4번째 인사`
          }
        },
        {
          h: '조건이 참인 동안 반복: while',
          html: `<p>몇 번 반복할지 미리 모를 땐 <code>while (조건) { ... }</code>을 써요.</p>`,
          code: {
            label: 'while.c',
            src: `int count = 3;
while (count > 0) {
    printf("%d\\n", count);
    count = count - 1;
}
printf("발사!\\n");`,
            out: `3\n2\n1\n발사!`
          }
        },
        {
          h: 'break와 continue',
          html: `<p><code>break</code>는 반복문을 완전히 멈추고, <code>continue</code>는 이번만 건너뛰고 다음 반복으로 넘어가요.</p>`,
          after: `<div class="note"><b>주의</b> — 변화 부분(<code>i++</code> 등)을 빠뜨리면 조건이 계속 참이 되어 <b>무한 반복</b>에 빠질 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 8);
          return {
            type: 'blank',
            q: `<code>for (int i = 0; i < ${n}; i++) { ... }</code>는 총 몇 번 반복될까요? 숫자만 쓰세요.`,
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
            q: `<code>int total = 0;</code>에서 시작해 <code>for (int i = 0; i < ${n}; i++) { total += i; }</code>를 실행했어요. 실행 후 <code>total</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
            why: `0부터 ${n - 1}까지 다 더하면 ${sum}이에요.`,
            hint: '0부터 하나씩 늘려가며 다 더해보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `for문의 세 부분(시작; 조건; 변화)을 구분하는 문장 부호를 쓰세요.`,
          prefix: 'for (int i = 0', suffix: ' i < 5; i++)', accept: [';'], placeholder: '문장 부호',
          why: 'for문은 <code>시작; 조건; 변화</code>를 세미콜론(;)으로 구분해요.',
          hint: 'C 문장을 끝맺을 때 쓰는 그 문장 부호예요.'
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
          q: 'for문으로 0부터 4까지 <code>printf("%d\\n", i)</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'for (int i = 0; i < 5; i++) {\n    printf("%d\\n", i);\n}',
          accept: ['for (int i = 0; i < 5; i++) {printf("%d\\n", i);}'],
          why: '<code>for (int i = 0; i < 5; i++)</code>는 i를 0부터 4까지 5번 반복해요.',
          hint: 'for (int i = 0; i < 5; i++) { } 안에 printf("%d\\n", i);를 넣으세요.'
        }),
      ],
      boss: () => {
        const n = randInt(4, 8);
        let total = 0;
        for (let i = 0; i < n; i++) if (i % 2 === 0) total += i;
        return {
          type: 'blank',
          q: `<code>int total = 0;</code>에서 시작해서, <code>0</code>부터 <code>${n - 1}</code>까지 숫자 중 짝수(2로 나눈 나머지가 0)만 골라 <code>total</code>에 더하는 코드가 있어요. 실행 후 <code>total</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
          why: `0부터 ${n - 1}까지 중 짝수만 더하면 ${total}이에요.`,
          hint: 'i % 2 == 0으로 짝수인지 확인한 다음, 그 값만 골라 더해보세요.'
        };
      }
    },
    {
      id: 'func',
      title: '함수',
      ready: true,
      summary: '반복해서 쓰는 코드에 이름을 붙여 필요할 때마다 불러 쓰는 방법을 배워요.',
      goals: ['함수 만들기', '매개변수와 반환 타입', 'void'],
      blocks: [
        {
          h: '함수는 "자판기"예요',
          html: `<p><code>반환타입 이름(매개변수) { ... }</code> 형태로 함수를 만들어요. <code>main</code> 함수보다 앞에 두거나, 미리 원형을 선언해둬야 해요.</p>`,
          code: {
            label: 'func.c',
            src: `int add(int a, int b) {
    return a + b;
}

int main(void) {
    int result = add(3, 4);
    printf("%d\\n", result);
    return 0;
}`,
            out: `7`
          }
        },
        {
          h: '반환값이 없는 함수: void',
          html: `<p>돌려줄 값이 없이 그냥 실행만 하면 되는 함수는 반환 타입 자리에 <code>void</code>를 써요.</p>`,
          code: {
            label: 'void.c',
            src: `void greet(char grade) {
    printf("등급: %c\\n", grade);
}`
          }
        },
        {
          h: '반환 타입과 실제 반환값은 일치해야 해요',
          html: `<p>함수 이름 앞에 적은 반환 타입(예: <code>int</code>)과 <code>return</code>으로 돌려주는 값의 종류가 같아야 해요.</p>`,
          after: `<div class="note"><b>주의</b> — <code>main</code> 함수는 보통 <code>int</code>를 반환하고, 끝에 <code>return 0;</code>으로 "정상 종료"를 알려줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>int add(int a, int b) { return a + b; }</code>에 <code>add(${a}, ${b})</code>라고 호출하면 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `${a} + ${b} = ${a + b}가 반환돼요.`,
            hint: '매개변수 a, b 자리에 순서대로 값이 들어간다고 생각하고 계산해보세요.'
          };
        },
        () => makeChoice(
          '아무 값도 돌려주지 않는 함수의 반환 타입으로 쓰는 것은?',
          '<code>void</code>', ['<code>null</code>', '<code>empty</code>', '<code>none</code>'],
          '반환할 값이 없을 땐 <code>void</code>를 반환 타입 자리에 써요.',
          '"텅 빈, 아무것도 없는"이라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `함수의 결과값을 돌려주는 키워드는?`,
          prefix: 'int add(int a, int b) { ', suffix: ' a + b; }', accept: ['return'], placeholder: '키워드',
          why: '<code>return</code>은 함수 밖으로 값을 돌려줘요.',
          hint: '"돌려주다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'main 함수 끝에서 "정상적으로 끝났다"는 뜻으로 보통 돌려주는 값은?',
          '<code>0</code>', ['<code>1</code>', '<code>-1</code>', '아무것도 안 돌려줌'],
          '<code>return 0;</code>은 프로그램이 문제없이 정상 종료했다는 뜻이에요.',
          '오류가 없었다는 뜻으로 흔히 쓰는 숫자예요.'
        ),
        () => {
          const type = pick(['int', 'float', 'char']);
          return {
            type: 'blank',
            q: `숫자 두 개를 더해 ${type === 'int' ? '정수' : type === 'float' ? '실수' : '문자'} 값을 돌려주는 함수를 만들려고 해요. 반환 타입을 쓰세요. (지금은 ${type} 예시예요)`,
            prefix: '', suffix: ' add(int a, int b) { return a + b; }', accept: [type], placeholder: '반환 타입',
            why: `돌려줄 값의 종류에 맞는 반환 타입(<code>${type}</code>)을 함수 이름 앞에 적어요.`,
            hint: '돌려줄 값의 종류(자료형)를 함수 이름 앞에 그대로 적으면 돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '두 정수를 더해 반환하는 함수 <code>add</code>를 작성하세요. (<code>int add(int a, int b)</code> 형태)',
          starter: '',
          rows: 3,
          placeholder: 'int add(int a, int b) {\n    return a + b;\n}',
          accept: ['int add(int a, int b) {return a + b;}'],
          why: '반환 타입 <code>int</code>, 함수 이름 <code>add</code>, 매개변수 <code>(int a, int b)</code> 다음에 <code>return a + b;</code>를 써요.',
          hint: 'int add(int a, int b) { } 안에 return a + b;를 넣으세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 10) * 2;
        const b = randInt(1, 10) * 2 - 1;
        const sum = a + b;
        const avg = sum / 2;
        return {
          type: 'blank',
          q: `<code>double average(int a, int b) { return (a + b) / 2.0; }</code> 함수에 <code>average(${a}, ${b})</code>라고 호출하면 결과는? 소수 한 자리까지 쓰세요. (예: 3.5)`,
          prefix: '', suffix: '', accept: [String(avg)], placeholder: '숫자',
          why: `(${a} + ${b}) / 2.0 = ${sum} / 2.0 = ${avg}예요. 2.0으로 나눠서 정수 나눗셈이 아닌 실수 나눗셈이 돼요.`,
          hint: '2.0처럼 소수점이 있는 값으로 나누면 정수 나눗셈이 아니라 실수 나눗셈이 돼요.'
        };
      }
    },
    {
      id: 'coll',
      title: '배열',
      ready: true,
      summary: '같은 종류의 값 여러 개를 한 번에 담는 배열을 배워요.',
      goals: ['배열 선언', '인덱싱', '배열 순회'],
      blocks: [
        {
          h: '같은 모양의 상자를 여러 칸 이어 붙인 것: 배열',
          html: `<p>배열은 <code>자료형 이름[개수] = {값, 값, ...};</code> 형태로 만들어요. 값을 꺼낼 땐 순번(인덱스)을 쓰는데, <b>0부터</b> 세요.</p>`,
          code: {
            label: 'array.c',
            src: `int scores[3] = {90, 85, 100};

printf("%d\\n", scores[0]);   // 90
printf("%d\\n", scores[2]);   // 100`,
            out: `90\n100`
          }
        },
        {
          h: '반복문으로 배열 전체 훑어보기',
          html: `<p>배열은 자바스크립트의 <code>.length</code> 같은 게 따로 없어서, 보통 배열을 만들 때 정한 크기를 그대로 기억해두고 <code>for</code>문으로 하나씩 접근해요.</p>`,
          code: {
            label: 'loop_array.c',
            src: `int scores[3] = {90, 85, 100};

for (int i = 0; i < 3; i++) {
    printf("%d번째 점수: %d\\n", i, scores[i]);
}`,
            out: `0번째 점수: 90\n1번째 점수: 85\n2번째 점수: 100`
          }
        },
        {
          h: '배열의 크기는 처음에 정해져요',
          html: `<p>C 배열은 처음 만들 때 크기(칸 수)가 정해지면 나중에 늘리거나 줄일 수 없어요. 크기를 넘는 순번에 접근하면 위험한 오류가 날 수 있으니 조심해야 해요.</p>`,
          after: `<div class="note"><b>주의</b> — <code>scores[3]</code>처럼 정해진 크기(3칸, 순번 0~2)를 벗어난 순번에 접근하면 예측할 수 없는 값이 나오거나 프로그램이 멈출 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const items = shuffle([70, 80, 90, 100, 60]).slice(0, 4);
          const idx = randInt(0, items.length - 1);
          return {
            type: 'blank',
            q: `<code>int scores[${items.length}] = {${items.join(', ')}};</code>일 때, <code>scores[${idx}]</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(items[idx])], placeholder: '숫자',
            why: `순번은 0부터 세니까 <code>[${idx}]</code>는 ${idx + 1}번째 값인 ${items[idx]}예요.`,
            hint: '순번은 0부터 시작해요. 앞에서부터 하나씩 세어보세요.'
          };
        },
        () => makeChoice(
          'C에서 배열의 첫 번째 값을 가리키는 순번은?',
          '<code>0</code>', ['<code>1</code>', '<code>-1</code>', '<code>첫번째</code>'],
          '배열의 순번은 0부터 시작해서 첫 번째 값은 <code>[0]</code>이에요.',
          'C 배열의 순번은 이 숫자부터 시작해요.'
        ),
        () => {
          const n = randInt(3, 6);
          return {
            type: 'blank',
            q: `값 ${n}개를 담는 정수 배열 <code>scores</code>를 선언하려고 해요. 대괄호 안에 들어갈 숫자를 쓰세요.`,
            prefix: 'int scores[', suffix: '];', accept: [String(n)], placeholder: '숫자',
            why: `배열의 크기(칸 수)를 대괄호 안에 적어요. ${n}개를 담으려면 <code>[${n}]</code>이에요.`,
            hint: '담고 싶은 값의 개수를 그대로 대괄호 안에 쓰면 돼요.'
          };
        },
        () => makeChoice(
          'C 배열에 대한 설명으로 옳은 것은?',
          '한 번 정한 크기는 나중에 바꿀 수 없다', ['크기가 자동으로 늘어난다', '.length로 크기를 구할 수 있다', '아무 자료형이나 섞어 담을 수 있다'],
          'C 배열은 처음 만들 때 크기가 고정되고, 나중에 바꿀 수 없어요.',
          'C 배열은 자바스크립트 배열과 달리 유연하지 않아요.'
        ),
        () => {
          const size = randInt(3, 5);
          return {
            type: 'blank',
            q: `크기가 ${size}인 배열 <code>scores</code>의 모든 값을 <code>for</code>문으로 훑어보려고 해요. 조건 부분을 완성하세요.`,
            prefix: 'for (int i = 0; i < ', suffix: '; i++) { ... }', accept: [String(size)], placeholder: '숫자',
            why: `배열 크기가 ${size}면 순번은 0부터 ${size - 1}까지라서, 조건은 <code>i &lt; ${size}</code>예요.`,
            hint: '배열의 크기를 그대로 조건에 넣으면 처음부터 끝까지 훑을 수 있어요.'
          };
        },
        () => ({
          type: 'code',
          q: '정수 배열 <code>scores</code>에 <code>{90, 85, 100}</code>을 담아 선언하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'int scores[3] = {90, 85, 100};',
          accept: ['int scores[3] = {90, 85, 100};', 'int scores[] = {90, 85, 100};'],
          why: '<code>자료형 이름[개수] = {값, 값, ...};</code> 형태로 배열을 선언해요.',
          hint: 'int scores[3] = { }; 안에 90, 85, 100을 순서대로 넣으세요.'
        }),
      ],
      boss: () => {
        const items = shuffle([70, 80, 90, 100, 60, 55]).slice(0, randInt(3, 4));
        const sum = items.reduce((a, b) => a + b, 0);
        return {
          type: 'blank',
          q: `<code>int scores[${items.length}] = {${items.join(', ')}};</code>이고 <code>int total = 0;</code>일 때, <code>for (int i = 0; i < ${items.length}; i++) { total += scores[i]; }</code>를 실행하면 <code>total</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `배열에 있는 모든 값을 더하면 ${items.join(' + ')} = ${sum}이에요.`,
          hint: 'for문으로 배열 처음부터 끝까지 하나씩 훑으면서 다 더해보세요.'
        };
      }
    },
    {
      id: 'struct',
      title: '구조체',
      ready: true,
      summary: '서로 다른 자료형의 값들을 하나로 묶어서 관리하는 구조체(struct)를 배워요.',
      goals: ['struct 정의', '점(.)으로 접근', 'typedef'],
      blocks: [
        {
          h: '서로 다른 값들을 한 묶음으로: struct',
          html: `<p>배열은 <b>같은</b> 자료형만 담을 수 있지만, <code>struct</code>는 이름·나이처럼 <b>서로 다른</b> 자료형의 값들을 하나로 묶어서 관리할 수 있어요. 학생 한 명의 정보를 표현하기에 딱 좋아요.</p>`,
          code: {
            label: 'struct.c',
            src: `struct Player {
    char name[20];
    int score;
};

int main(void) {
    struct Player p;
    p.score = 0;
    p.score = p.score + 10;

    printf("%d\\n", p.score);
    return 0;
}`,
            out: `10`
          }
        },
        {
          h: '점(.)으로 속성에 접근해요',
          html: `<p>구조체 변수 안의 값(속성, 흔히 <b>멤버</b>라고 불러요)에 접근할 땐 점(<code>.</code>)을 찍어요. <code>p.score</code>는 "p의 score 값"이라는 뜻이에요.</p>`
        },
        {
          h: '매번 struct를 쓰기 귀찮다면: typedef',
          html: `<p><code>typedef struct { ... } Player;</code>처럼 쓰면, 이후로는 <code>struct Player</code> 대신 그냥 <code>Player</code>라고만 써도 돼요.</p>`,
          code: {
            label: 'typedef.c',
            src: `typedef struct {
    char name[20];
    int score;
} Player;

Player p;
p.score = 100;
printf("%d\\n", p.score);`,
            out: `100`
          },
          after: `<div class="note"><b>비유</b> — struct는 서류 양식이에요. 이름 칸, 나이 칸이 미리 정해진 서류를 여러 장 찍어내는 것과 비슷해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const score = randInt(1, 100);
          return {
            type: 'blank',
            q: `<code>struct Player { char name[20]; int score; };</code>이고 <code>struct Player p; p.score = ${score};</code>일 때, <code>printf("%d", p.score);</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(score)], placeholder: '숫자',
            why: `<code>p.score</code>에 ${score}를 대입했으니 그대로 ${score}가 출력돼요.`,
            hint: '점(.)으로 구조체 안의 값을 그대로 꺼내 읽으면 돼요.'
          };
        },
        () => makeChoice(
          '구조체 변수 안의 값(멤버)에 접근할 때 쓰는 문장 부호는?',
          '<code>.</code>(점)', ['<code>->화살표</code>', '<code>[]</code>(대괄호)', '<code>::</code>'],
          '구조체 변수는 점(.)을 찍어서 멤버에 접근해요.',
          '자바스크립트의 객체 접근과 똑같은 문장 부호예요.'
        ),
        () => ({
          type: 'blank',
          q: `여러 자료형을 하나로 묶어서 새로운 자료형을 만드는 키워드를 쓰세요.`,
          prefix: '', suffix: ' Player { char name[20]; int score; };', accept: ['struct'], placeholder: '키워드',
          why: '<code>struct</code>는 서로 다른 자료형의 값들을 하나로 묶어요.',
          hint: '"구조"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '배열과 구조체의 차이로 옳은 것은?',
          '배열은 같은 자료형만, 구조체는 다른 자료형도 함께 담을 수 있다',
          ['배열도 구조체도 다른 자료형을 섞을 수 없다', '구조체는 크기를 지정할 필요가 없다', '배열은 점(.)으로, 구조체는 대괄호로 접근한다'],
          '배열은 같은 자료형끼리만, 구조체는 이름(문자열)+나이(정수)처럼 서로 다른 자료형을 함께 담을 수 있어요.',
          '학생 한 명의 이름과 점수를 함께 담으려면 어떤 게 더 적합할지 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>struct Player</code>라고 매번 쓰지 않고 그냥 <code>Player</code>라고 쓸 수 있게 해주는 키워드를 쓰세요.`,
          prefix: '', suffix: ' struct { char name[20]; int score; } Player;', accept: ['typedef'], placeholder: '키워드',
          why: '<code>typedef</code>는 긴 자료형 이름에 짧은 별명을 붙여줘요.',
          hint: '"자료형을 정의한다"는 뜻의 영어 단어 조합이에요.'
        }),
        () => ({
          type: 'code',
          q: '<code>char name[20];</code>과 <code>int age;</code> 멤버를 가진 구조체 <code>Student</code>를 <code>typedef struct { ... } Student;</code> 형태로 정의하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'typedef struct {\n    char name[20];\n    int age;\n} Student;',
          accept: ['typedef struct {char name[20];int age;} Student;'],
          why: '<code>typedef struct { 멤버들; } 이름;</code> 형태로 구조체를 정의하고 동시에 짧은 별명도 붙여요.',
          hint: 'typedef struct { } 안에 멤버 두 개를 세미콜론으로 각각 끝내고, 마지막에 별명(Student)을 붙이세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const score = randInt(1, 100);
        return {
          type: 'blank',
          q: `<code>typedef struct { char name[20]; int score; } Player;</code>이고 <code>Player p; p.score = ${score};</code>일 때, <code>printf("%d", p.score);</code>의 출력은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(score)], placeholder: '숫자',
          why: `typedef로 만든 <code>Player</code>도 일반 구조체와 똑같이 점(.)으로 멤버에 접근해요. <code>p.score</code>는 ${score}예요.`,
          hint: 'typedef는 이름만 짧게 해줄 뿐, 점(.)으로 멤버에 접근하는 방식은 똑같아요.'
        };
      }
    },
    {
      id: 'pointer',
      title: '포인터 기초',
      ready: true,
      summary: '변수가 저장된 "위치(주소)"를 담는 특별한 변수, 포인터를 배워요.',
      goals: ['& (주소 연산자)', '* (역참조)', '포인터 선언', 'NULL', '-> (구조체 포인터)'],
      blocks: [
        {
          h: '변수에는 "주소"가 있어요',
          html: `<p>모든 변수는 메모리의 어딘가에 저장되고, 그 위치를 <b>주소</b>라고 불러요. <code>&변수</code>라고 쓰면 그 변수의 주소를 알 수 있어요.</p>`,
          code: {
            label: 'address.c',
            src: `int age = 17;
printf("%d\\n", age);     // 값 자체: 17
printf("%p\\n", &age);    // 주소 (예: 0x7ffee...)`,
            out: `17\n0x7ffee...`
          }
        },
        {
          h: '주소를 담는 변수: 포인터',
          html: `<p><b>포인터</b>는 값이 아니라 "다른 변수의 주소"를 담는 특별한 변수예요. <code>자료형 *이름;</code>으로 선언하고, <code>*포인터</code>를 쓰면 그 주소에 있는 <b>진짜 값</b>을 가져와요(역참조).</p>`,
          code: {
            label: 'pointer.c',
            src: `int age = 17;
int *p = &age;      // p는 age의 주소를 담고 있음

printf("%d\\n", *p);  // p가 가리키는 곳의 값: 17
*p = 20;             // p가 가리키는 곳의 값을 20으로 바꿈
printf("%d\\n", age); // age도 20으로 바뀜!`,
            out: `17\n20`
          }
        },
        {
          h: '포인터로 값을 바꾸면, 원래 변수도 바뀌어요',
          html: `<p><code>*p = 20;</code>은 "p가 가리키는 곳(즉 age가 저장된 자리)에 20을 넣어라"는 뜻이라서, <code>age</code> 자체의 값도 함께 바뀌어요. 이 성질은 함수에 변수를 "진짜로" 전달할 때 아주 유용해요.</p>`,
          after: `<div class="note"><b>주의</b> — 아직 아무 주소도 가리키지 않는 포인터는 <code>NULL</code>로 초기화해두는 습관을 들이세요. 엉뚱한 주소를 가리키는 포인터를 역참조하면 프로그램이 멈출 수 있어요.</div>`
        },
        {
          h: '구조체를 가리키는 포인터: -> (화살표)',
          html: `<p>구조체를 가리키는 포인터에서 멤버에 접근할 땐 <code>(*포인터).멤버</code> 대신 <code>포인터-&gt;멤버</code>라는 더 짧은 표기를 써요. 둘은 완전히 같은 뜻이에요.</p>`,
          code: {
            label: 'arrow.c',
            src: `typedef struct { int score; } Player;

Player p;
p.score = 0;

Player *ptr = &p;
ptr->score = ptr->score + 10;   // (*ptr).score와 완전히 같음

printf("%d\\n", p.score);`,
            out: `10`
          }
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '변수의 주소를 알아낼 때 앞에 붙이는 기호는?',
          '<code>&</code>', ['<code>*</code>', '<code>#</code>', '<code>@</code>'],
          '<code>&변수</code>는 그 변수가 저장된 주소를 알려줘요.',
          '"and" 기호로도 잘 알려진 그 기호예요.'
        ),
        () => makeChoice(
          '포인터가 가리키는 곳의 실제 값을 가져올 때(역참조) 쓰는 기호는?',
          '<code>*</code>', ['<code>&</code>', '<code>%</code>', '<code>-&gt;</code>'],
          '<code>*포인터</code>는 포인터가 가리키는 주소에 있는 진짜 값을 꺼내요.',
          '포인터를 선언할 때도 쓰는 그 별표 기호예요.'
        ),
        () => {
          const start = randInt(1, 20);
          const newVal = randInt(21, 40);
          return {
            type: 'blank',
            q: `<code>int age = ${start}; int *p = &age; *p = ${newVal};</code>를 실행한 뒤 <code>printf("%d", age);</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(newVal)], placeholder: '숫자',
            why: `<code>*p = ${newVal};</code>은 p가 가리키는 age의 자리에 직접 ${newVal}을 넣는 것이라서, age도 ${newVal}로 바뀌어요.`,
            hint: '포인터로 값을 바꾸면, 그 포인터가 가리키는 원래 변수도 함께 바뀌어요.'
          };
        },
        () => ({
          type: 'blank',
          q: `<code>int age = 17;</code>일 때, age의 주소를 담는 포인터 <code>p</code>를 선언하는 코드를 완성하세요.`,
          prefix: 'int ', suffix: ' = &age;', accept: ['*p'], placeholder: '변수 이름',
          why: '포인터는 <code>자료형 *이름;</code> 형태로 선언해요.',
          hint: '자료형 뒤, 이름 앞에 별표(*)를 붙이면 포인터가 돼요.'
        }),
        () => makeChoice(
          '아직 어떤 변수도 가리키지 않는 포인터를 안전하게 초기화할 때 쓰는 값은?',
          '<code>NULL</code>', ['<code>0.0</code>', '<code>""</code>', '<code>undefined</code>'],
          '<code>NULL</code>은 "아무것도 가리키지 않는다"는 뜻으로 포인터를 초기화할 때 써요.',
          '자바스크립트의 null과 이름이 똑같은 값이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>int score = 90;</code>을 선언하고, score의 주소를 담는 포인터 <code>p</code>를 만든 뒤, <code>*p</code>를 이용해 score의 값을 100으로 바꾸는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'int score = 90;\nint *p = &score;\n*p = 100;',
          accept: ['int score = 90;int *p = &score;*p = 100;'],
          why: '<code>&score</code>로 주소를 얻어 포인터에 담고, <code>*p = 100;</code>으로 그 주소의 값을 직접 바꿔요.',
          hint: 'int *p = &score;로 포인터를 만들고, *p = 100;으로 값을 바꾸세요.'
        }),
        () => {
          const start = randInt(1, 20);
          const bonus = randInt(1, 10);
          return {
            type: 'blank',
            q: `<code>typedef struct { int score; } Player; Player p; p.score = ${start}; Player *ptr = &p; ptr->score = ptr->score + ${bonus};</code>를 실행한 뒤 <code>printf("%d", p.score);</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(start + bonus)], placeholder: '숫자',
            why: `<code>ptr-&gt;score</code>는 <code>p.score</code>와 완전히 같은 값을 가리켜요. ${start} + ${bonus} = ${start + bonus}예요.`,
            hint: 'ptr->score는 (*ptr).score와 같고, 결국 p.score를 가리키는 것과 똑같아요.'
          };
        },
      ],
      boss: () => {
        const start = randInt(1, 20);
        const bonus = randInt(1, 10);
        const result = start + bonus;
        return {
          type: 'blank',
          q: `<code>int score = ${start}; int *p = &score; *p = *p + ${bonus};</code>를 실행한 뒤 <code>printf("%d", score);</code>의 출력은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
          why: `<code>*p</code>는 score 자체를 가리키므로, <code>*p = *p + ${bonus}</code>는 score에 ${bonus}를 더하는 것과 같아요. ${start} + ${bonus} = ${result}이에요.`,
          hint: '*p는 p가 가리키는 원래 변수(score)와 완전히 같은 값이라고 생각하고 계산해보세요.'
        };
      }
    },
    {
      id: 'strings',
      title: '문자열 다루기',
      ready: true,
      summary: 'C에서 문자열은 사실 문자 배열이에요. 길이를 재고, 비교하고, 이어 붙이는 방법을 배워요.',
      goals: ['char 배열로서의 문자열', 'strlen', 'strcmp', 'strcat'],
      blocks: [
        {
          h: '문자열은 사실 char 배열이에요',
          html: `<p>C에는 자바스크립트의 <code>string</code> 같은 진짜 문자열 자료형이 없어요. 대신 <code>char</code>(문자) 여러 개를 <b>배열</b>로 이어놓고, 맨 끝에 "여기서 끝!"이라는 표시(<code>\\0</code>, 자동으로 붙어요)를 붙여서 문자열처럼 다뤄요.</p>`,
          code: {
            label: 'char_array.c',
            src: `#include <stdio.h>

int main(void) {
    char name[20] = "Choco";
    printf("%s\\n", name);
    return 0;
}`,
            out: `Choco`
          }
        },
        {
          h: '길이 재기: strlen',
          html: `<p>문자열 관련 함수를 쓰려면 <code>#include &lt;string.h&gt;</code>가 필요해요. <code>strlen(문자열)</code>은 그 문자열의 글자 수(정확히는 바이트 수)를 세줘요.</p>`,
          code: {
            label: 'strlen.c',
            src: `#include <string.h>

char name[20] = "Choco";
printf("%d\\n", (int)strlen(name));`,
            out: `5`
          }
        },
        {
          h: '비교하고 이어 붙이기: strcmp, strcat',
          html: `<p><code>strcmp(a, b)</code>는 두 문자열이 <b>완전히 같으면 0</b>을 돌려줘요(같지 않으면 0이 아닌 값). <code>strcat(a, b)</code>는 <code>b</code>를 <code>a</code> 뒤에 이어 붙여서, <code>a</code> 자체를 바꿔버려요.</p>`,
          code: {
            label: 'strcmp_strcat.c',
            src: `char a[20] = "cat";
char b[20] = "dog";

if (strcmp(a, b) == 0) {
    printf("같아요\\n");
} else {
    printf("달라요\\n");
}

strcat(a, b);
printf("%s\\n", a);`,
            out: `달라요\ncatdog`
          },
          after: `<div class="note"><b>주의</b> — <code>strcat(a, b)</code>는 a에 b를 이어 붙일 공간이 충분해야 해요. a를 선언할 때 여유 있는 크기로 만들어두세요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const word = pick(['cat', 'dog', 'fish', 'bird', 'frog']);
          return {
            type: 'blank',
            q: `<code>char word[20] = "${word}";</code>일 때, <code>strlen(word)</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(word.length)], placeholder: '숫자',
            why: `<code>strlen</code>은 문자열의 글자 수를 세줘요. "${word}"는 ${word.length}글자예요.`,
            hint: '따옴표 안의 글자 수를 하나씩 세어보세요.'
          };
        },
        () => {
          const words = ['cat', 'dog', 'cat', 'bird'];
          const a = pick(words), b = pick(words);
          const equal = a === b;
          return makeChoice(
            `<code>char a[20] = "${a}"; char b[20] = "${b}";</code>일 때, <code>strcmp(a, b) == 0</code>의 결과는?`,
            equal ? '참(true)' : '거짓(false)',
            [equal ? '거짓(false)' : '참(true)'],
            `<code>strcmp</code>은 두 문자열이 완전히 같을 때만 0을 돌려줘요. "${a}"와 "${b}"는 ${equal ? '같아요' : '달라요'}.`,
            'strcmp의 결과가 0이면 두 문자열이 같다는 뜻이에요.'
          );
        },
        () => ({
          type: 'blank',
          q: `문자열 관련 함수(strlen, strcmp, strcat 등)를 쓰려면 맨 위에 어떤 헤더를 include 해야 할까요?`,
          prefix: '#include <', suffix: '>', accept: ['string.h'], placeholder: '헤더 이름',
          why: '<code>#include &lt;string.h&gt;</code>가 있어야 strlen, strcmp, strcat 같은 함수를 쓸 수 있어요.',
          hint: '"문자열"을 뜻하는 영어 단어에 .h를 붙인 이름이에요.'
        }),
        () => makeChoice(
          '<code>a</code> 뒤에 <code>b</code>를 이어 붙여서 <code>a</code> 자체를 바꾸는 함수는?',
          '<code>strcat</code>', ['<code>strcmp</code>', '<code>strlen</code>', '<code>strcpy</code>'],
          '<code>strcat(a, b)</code>는 b를 a 뒤에 이어 붙여요. "concatenate(이어 붙이다)"의 줄임말이에요.',
          '"이어 붙이다"라는 뜻의 영어 단어 줄임말이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>char a[20] = "Hi";</code>와 <code>char b[20] = "!";</code>를 선언하고, <code>strcat(a, b)</code>로 합친 뒤 <code>printf("%s\\n", a);</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'char a[20] = "Hi";\nchar b[20] = "!";\nstrcat(a, b);\nprintf("%s\\n", a);',
          accept: ['char a[20] = "Hi";char b[20] = "!";strcat(a, b);printf("%s\\n", a);'],
          why: 'strcat(a, b)는 b("!")를 a("Hi") 뒤에 붙여서 a를 "Hi!"로 바꿔요.',
          hint: 'strcat(a, b);로 b를 a 뒤에 붙인 다음, printf("%s\\n", a);로 출력하세요.'
        }),
      ],
      boss: () => {
        const words = ['cat', 'dog', 'bird', 'frog'];
        const a = pick(words);
        let b = pick(words);
        while (b === a) b = pick(words);
        return {
          type: 'blank',
          q: `<code>char a[20] = "${a}"; char b[20] = "${b}";</code>일 때, <code>strcmp(a, b) == 0</code>이면 "같아요"를, 아니면 "달라요"를 출력하고, 이어서 <code>strcat(a, b); printf("%s", a);</code>를 실행하면 마지막에 무엇이 출력될까요? (예: 달라요${a}${b})`,
          prefix: '', suffix: '', accept: [`달라요${a}${b}`], placeholder: '전체 출력',
          why: `"${a}"와 "${b}"는 서로 다르니 strcmp는 0이 아니라서 "달라요"가 먼저 출력되고, strcat으로 "${b}"가 "${a}" 뒤에 붙어 "${a}${b}"가 이어서 출력돼요.`,
          hint: '먼저 strcmp 결과에 따른 문장이, 그다음 strcat으로 합쳐진 문자열이 이어서 출력돼요.'
        };
      }
    },
    {
      id: 'memory',
      title: '동적 메모리 할당',
      ready: true,
      summary: '배열 크기를 미리 정하지 않고, 프로그램이 실행되는 중에 필요한 만큼 메모리를 얻는 방법을 배워요.',
      goals: ['malloc으로 메모리 할당', 'free로 해제하기', '메모리 누수'],
      blocks: [
        {
          h: '실행 중에 필요한 만큼 얻기: malloc',
          html: `<p>지금까지 배운 배열(<code>int arr[5]</code>)은 크기를 <b>미리, 코드를 짤 때</b> 정해야 했어요. <code>malloc(바이트 수)</code>는 프로그램이 <b>실행되는 중에</b> 원하는 만큼 메모리를 새로 얻어서, 그 시작 주소를 포인터로 돌려줘요. <code>#include &lt;stdlib.h&gt;</code>가 필요해요.</p>`,
          code: {
            label: 'malloc.c',
            src: `#include <stdlib.h>

int n = 3;
int *arr = (int *) malloc(sizeof(int) * n);

arr[0] = 10;
arr[1] = 20;
arr[2] = 30;

printf("%d\\n", arr[1]);`,
            out: `20`
          }
        },
        {
          h: '다 쓴 메모리는 반드시 반납: free',
          html: `<p><code>malloc</code>으로 얻은 메모리는 다 쓴 뒤 <code>free(포인터)</code>로 반드시 돌려줘야 해요. <code>free</code>를 잊으면, 그 메모리는 프로그램이 끝날 때까지 계속 차지된 채로 남아요. 이걸 <b>메모리 누수(memory leak)</b>라고 해요.</p>`,
          code: {
            label: 'free.c',
            src: `int *arr = (int *) malloc(sizeof(int) * 3);
arr[0] = 1;

// 다 썼으면 반드시 반납
free(arr);`
          }
        },
        {
          h: 'malloc으로 얻은 메모리도 배열처럼 써요',
          html: `<p><code>malloc</code>이 돌려준 포인터는 <code>arr[0]</code>, <code>arr[1]</code>처럼 대괄호로 접근할 수 있어요. 안에서는 사실 포인터 연산(<code>*(arr + i)</code>)이 일어나는 거지만, 배열처럼 편하게 쓸 수 있게 해둔 거예요.</p>`,
          after: `<div class="note"><b>정리</b> — malloc으로 만들고(할당), 다 쓰면 free로 돌려줘요(해제). 이 둘은 항상 짝을 이뤄야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(3, 8);
          return {
            type: 'blank',
            q: `정수 ${n}개를 담을 공간을 malloc으로 할당하려고 해요. 빈칸을 채우세요.`,
            prefix: 'int *arr = (int *) malloc(sizeof(int) * ', suffix: ');', accept: [String(n)], placeholder: '개수',
            why: `<code>sizeof(int) * ${n}</code>은 정수 ${n}개가 차지하는 바이트 수를 계산해요.`,
            hint: '담고 싶은 정수의 개수를 그대로 곱해주면 돼요.'
          };
        },
        () => makeChoice(
          '프로그램이 실행되는 중에 필요한 만큼 메모리를 새로 할당받는 함수는?',
          '<code>malloc</code>', ['<code>free</code>', '<code>sizeof</code>', '<code>printf</code>'],
          '<code>malloc(바이트 수)</code>는 그만큼의 메모리를 새로 할당하고 그 주소를 돌려줘요.',
          '"메모리 할당(memory allocation)"의 줄임말이에요.'
        ),
        () => ({
          type: 'blank',
          q: `다 쓴 malloc 메모리를 반납하는 함수를 쓰세요.`,
          prefix: '', suffix: '(arr);', accept: ['free'], placeholder: '함수 이름',
          why: '<code>free(포인터)</code>는 malloc으로 할당받은 메모리를 반납해요.',
          hint: '"풀어주다, 해방하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'malloc으로 할당받은 메모리를 free로 반납하지 않고 계속 잊어버리면 어떤 문제가 생길까요?',
          '메모리 누수(memory leak) — 그 메모리가 계속 낭비된다', ['프로그램이 즉시 멈춘다', '자동으로 다시 반납된다', '아무 문제도 없다'],
          'free를 잊으면 그 메모리는 프로그램이 끝날 때까지 계속 차지된 채로 남아서 낭비돼요. 이를 메모리 누수라고 해요.',
          '"물이 샌다"는 뜻의 영어 단어가 이 현상의 이름에 들어가요.'
        ),
        () => {
          const idx = randInt(0, 2);
          const vals = [randInt(1, 50), randInt(1, 50), randInt(1, 50)];
          return {
            type: 'blank',
            q: `<code>int *arr = (int *) malloc(sizeof(int) * 3); arr[0] = ${vals[0]}; arr[1] = ${vals[1]}; arr[2] = ${vals[2]};</code>일 때, <code>arr[${idx}]</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(vals[idx])], placeholder: '숫자',
            why: `malloc으로 만든 메모리도 대괄호로 접근하면 일반 배열처럼 동작해요. <code>arr[${idx}]</code>는 ${vals[idx]}예요.`,
            hint: 'malloc으로 만든 포인터도 배열처럼 [순번]으로 값을 넣고 꺼낼 수 있어요.'
          };
        },
        () => ({
          type: 'code',
          q: '정수 5개를 담을 공간을 <code>malloc</code>으로 할당해서 <code>arr</code>에 저장하고, 다 쓴 뒤 <code>free(arr)</code>로 반납하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'int *arr = (int *) malloc(sizeof(int) * 5);\nfree(arr);',
          accept: ['int *arr = (int *) malloc(sizeof(int) * 5);\nfree(arr);'],
          why: 'malloc(sizeof(int) * 5)로 정수 5개 공간을 할당받고, 다 쓴 뒤 free(arr)로 반납해요.',
          hint: 'malloc으로 5개짜리 공간을 만들고, 그 아래 줄에 free(arr);를 쓰세요.'
        }),
      ],
      boss: () => {
        const n = randInt(3, 6);
        const vals = Array.from({ length: n }, () => randInt(1, 20));
        const sum = vals.reduce((a, b) => a + b, 0);
        return {
          type: 'blank',
          q: `<code>int *arr = (int *) malloc(sizeof(int) * ${n});</code> 후 <code>arr</code>에 순서대로 [${vals.join(', ')}]을 저장했어요. <code>int total = 0; for (int i = 0; i < ${n}; i++) { total += arr[i]; }</code>를 실행한 뒤 <code>total</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `malloc으로 만든 배열도 for문으로 똑같이 순회할 수 있어요. 전부 더하면 ${vals.join(' + ')} = ${sum}이에요.`,
          hint: 'malloc으로 만든 메모리도 일반 배열처럼 for문으로 하나씩 더할 수 있어요.'
        };
      }
    },
    {
      id: 'matrix',
      title: '다차원 배열',
      ready: true,
      summary: '표(행과 열)처럼 생긴 데이터를 담는 2차원 배열을 배워요.',
      goals: ['2차원 배열 선언', '행[row]과 열[col]로 접근하기', '중첩 반복문으로 순회'],
      blocks: [
        {
          h: '표 모양의 데이터: 2차원 배열',
          html: `<p>지금까지 배운 배열은 한 줄로 늘어선 데이터였죠. <code>int grid[2][3]</code>처럼 대괄호를 두 번 쓰면, <b>표(행과 열)</b> 모양의 데이터를 담을 수 있어요. 첫 번째 대괄호는 "행(가로줄)의 개수", 두 번째는 "열(세로줄)의 개수"예요.</p>`,
          code: {
            label: 'matrix.c',
            src: `int grid[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};

printf("%d\\n", grid[0][0]);
printf("%d\\n", grid[1][2]);`,
            out: `1\n6`
          }
        },
        {
          h: '행과 열, 두 번의 순번으로 접근해요',
          html: `<p><code>grid[행][열]</code>처럼 순번을 두 번 써서 원하는 칸에 접근해요. 1차원 배열처럼 행도 열도 <b>0부터</b> 세요. <code>grid[1][2]</code>는 "두 번째 행, 세 번째 열"이라는 뜻이에요.</p>`
        },
        {
          h: '중첩 반복문으로 전체 훑기',
          html: `<p>2차원 배열 전체를 훑으려면 <code>for</code>문을 <b>두 번 겹쳐서(중첩)</b> 써요. 바깥 for문은 행을, 안쪽 for문은 그 행 안의 열을 하나씩 훑어요.</p>`,
          code: {
            label: 'nested_loop.c',
            src: `int grid[2][3] = {{1, 2, 3}, {4, 5, 6}};

for (int row = 0; row < 2; row++) {
    for (int col = 0; col < 3; col++) {
        printf("%d ", grid[row][col]);
    }
    printf("\\n");
}`,
            out: `1 2 3 \n4 5 6`
          },
          after: `<div class="note"><b>비유</b> — 2차원 배열은 "배열의 배열"이라고 생각하면 쉬워요. grid[0]은 {1, 2, 3}이라는 배열 하나이고, grid[1]은 {4, 5, 6}이라는 또 다른 배열이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const rows = [[randInt(1, 9), randInt(1, 9), randInt(1, 9)], [randInt(1, 9), randInt(1, 9), randInt(1, 9)]];
          const r = randInt(0, 1), c = randInt(0, 2);
          return {
            type: 'blank',
            q: `<code>int grid[2][3] = {{${rows[0].join(', ')}}, {${rows[1].join(', ')}}};</code>일 때, <code>grid[${r}][${c}]</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(rows[r][c])], placeholder: '숫자',
            why: `<code>grid[${r}][${c}]</code>는 ${r}번째 행의 ${c}번째 값인 ${rows[r][c]}예요.`,
            hint: '첫 번째 대괄호로 행을, 두 번째 대괄호로 그 행 안의 열을 찾아보세요.'
          };
        },
        () => makeChoice(
          '<code>int grid[2][3];</code>에서 두 번째 대괄호 <code>[3]</code>이 뜻하는 것은?',
          '열(세로줄)의 개수', ['행(가로줄)의 개수', '전체 칸의 개수', '자료형의 크기'],
          '<code>[행 개수][열 개수]</code> 순서라서, 두 번째 대괄호는 한 행 안에 열이 몇 개 있는지를 나타내요.',
          '첫 번째는 행, 두 번째는 그 행 "안"의 개수예요.'
        ),
        () => ({
          type: 'blank',
          q: `2차원 배열 전체를 훑으려면 for문을 몇 번 겹쳐서(중첩해서) 써야 할까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '개', accept: ['2'], placeholder: '숫자',
          why: '행을 도는 for문 안에 열을 도는 for문을 하나 더 넣어서, 총 2개의 for문을 겹쳐 써요.',
          hint: '행 하나당 열도 다 훑어야 하니, for문이 두 겹으로 필요해요.'
        }),
        () => {
          const rows = randInt(2, 4), cols = randInt(2, 4);
          return {
            type: 'blank',
            q: `${rows}행 ${cols}열짜리 정수 2차원 배열 <code>grid</code>를 선언하려고 해요. 빈칸을 채우세요.`,
            prefix: 'int grid[', suffix: '];', accept: [`${rows}][${cols}`], placeholder: '행][열',
            why: `<code>int grid[${rows}][${cols}];</code>처럼 행과 열의 개수를 순서대로 대괄호에 넣어요.`,
            hint: '행의 개수와 열의 개수를 순서대로 각각 대괄호 안에 넣으세요.'
          };
        },
        () => ({
          type: 'code',
          q: '2행 2열 정수 배열 <code>grid</code>에 <code>{{1, 2}, {3, 4}}</code>를 담아 선언하고, 중첩 for문으로 모든 값을 <code>printf("%d ", ...)</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: 'int grid[2][2] = {{1, 2}, {3, 4}};\nfor (int row = 0; row < 2; row++) {\n    for (int col = 0; col < 2; col++) {\n        printf("%d ", grid[row][col]);\n    }\n}',
          accept: ['int grid[2][2] = {{1, 2}, {3, 4}};\nfor (int row = 0; row < 2; row++) {\n    for (int col = 0; col < 2; col++) {\n        printf("%d ", grid[row][col]);\n    }\n}'],
          why: '중첩 for문으로 행(row)과 열(col)을 각각 0부터 훑으면서 grid[row][col]을 출력해요.',
          hint: '바깥 for문은 행(row), 안쪽 for문은 열(col)을 0부터 돌면서 grid[row][col]을 출력하세요.'
        }),
      ],
      boss: () => {
        const rows = randInt(2, 3), cols = randInt(2, 3);
        const grid = Array.from({ length: rows }, () => Array.from({ length: cols }, () => randInt(1, 9)));
        const sum = grid.flat().reduce((a, b) => a + b, 0);
        return {
          type: 'blank',
          q: `<code>int grid[${rows}][${cols}] = {${grid.map(r => `{${r.join(', ')}}`).join(', ')}};</code>일 때, 중첩 for문으로 <code>grid</code>의 모든 값을 <code>total</code>에 더하면 <code>total</code>의 최종 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `모든 칸의 값을 다 더하면 ${grid.flat().join(' + ')} = ${sum}이에요.`,
          hint: '중첩 for문은 모든 행의 모든 열을 하나도 빠짐없이 훑어요.'
        };
      }
    },
    {
      id: 'pointerAdvanced',
      title: '포인터 심화: 이중 포인터와 포인터 연산',
      ready: true,
      summary: '포인터를 가리키는 포인터, 그리고 배열과 포인터의 깊은 관계인 포인터 연산을 배워요.',
      goals: ['이중 포인터(포인터의 포인터)', '배열과 포인터의 관계', '포인터 연산'],
      blocks: [
        {
          h: '포인터를 가리키는 포인터: 이중 포인터',
          html: `<p><code>int **pp;</code>처럼 별표 두 개를 쓰면, "포인터의 주소"를 담는 <b>이중 포인터</b>가 돼요. <code>**pp</code>는 그 주소를 두 번 따라가서 진짜 값을 얻어요.</p>`,
          code: {
            label: 'double_pointer.c',
            src: `int age = 17;
int *p = &age;
int **pp = &p;

printf("%d\\n", **pp);`,
            out: `17`
          }
        },
        {
          h: '배열 이름은 사실 포인터처럼 동작해요',
          html: `<p>배열 이름 <code>arr</code>은 그 배열의 <b>첫 번째 요소를 가리키는 포인터</b>처럼 동작해요. <code>*(arr + 1)</code>은 두 번째 요소를 가리켜요.</p>`,
          code: {
            label: 'array_pointer.c',
            src: `int arr[3] = {10, 20, 30};
printf("%d\\n", *arr);
printf("%d\\n", *(arr + 1));`,
            out: `10\n20`
          }
        },
        {
          h: '포인터에 숫자를 더하면 요소 하나만큼 이동해요: 포인터 연산',
          html: `<p>포인터에 <code>+1</code>을 하면, 1바이트가 아니라 <b>그 자료형 크기만큼</b> 주소가 이동해요. <code>int*</code>는 보통 4바이트씩, <code>char*</code>는 1바이트씩 움직여요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const val = randInt(1, 50);
          return {
            type: 'blank',
            q: `<code>int age = ${val}; int *p = &age; int **pp = &p;</code>일 때, <code>**pp</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(val)], placeholder: '숫자',
            why: `pp는 p의 주소를, p는 age의 주소를 담고 있어서, **pp는 결국 age의 값인 ${val}이에요.`,
            hint: 'pp → p → age 순서로 두 번 따라간다고 생각해보세요.'
          };
        },
        () => {
          const arr = Array.from({ length: 4 }, () => randInt(1, 50));
          const idx = randInt(0, 3);
          return {
            type: 'blank',
            q: `<code>int arr[4] = {${arr.join(', ')}};</code>일 때, <code>*(arr + ${idx})</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(arr[idx])], placeholder: '숫자',
            why: `<code>*(arr + ${idx})</code>는 <code>arr[${idx}]</code>와 같아서 ${arr[idx]}예요.`,
            hint: '*(arr + n)은 arr[n]과 완전히 같은 값을 가리켜요.'
          };
        },
        () => ({
          type: 'blank',
          q: `<code>int age = 17;</code>일 때, age의 주소를 담는 포인터 <code>p</code>의 주소를 담는 이중 포인터 <code>pp</code>를 선언하는 코드를 완성하세요.`,
          prefix: 'int *p = &age;\nint ', suffix: ' = &p;', accept: ['**pp'], placeholder: '변수 이름',
          why: '이중 포인터는 <code>자료형 **이름;</code> 형태로 선언해요.',
          hint: '별표를 두 개 붙이면 "포인터의 포인터"가 돼요.'
        }),
        () => makeChoice(
          '<code>int *p</code>에서 <code>p + 1</code>은 실제로 몇 바이트 뒤의 주소를 가리킬까요?',
          'int 하나의 크기(보통 4바이트)만큼 뒤', ['항상 1바이트 뒤', '항상 8바이트 뒤', '포인터 연산은 불가능하다'],
          '포인터 연산은 그 자료형의 크기만큼 이동해요. int는 보통 4바이트라서 4바이트 뒤로 이동해요.',
          '포인터에 +1을 하면 "1바이트"가 아니라 "그 타입 크기만큼" 이동한다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>int score = 90;</code>과 포인터 <code>int *p = &score;</code>가 있을 때, p의 주소를 담는 이중 포인터 <code>pp</code>를 선언하고 <code>**pp</code>를 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'int **pp = &p;\nprintf("%d\\n", **pp);',
          accept: ['int **pp = &p;printf("%d\\n", **pp);'],
          why: 'int **pp = &p;로 이중 포인터를 만들고, **pp로 진짜 값을 꺼내요.',
          hint: 'int **pp = &p; 다음 줄에 printf("%d\\n", **pp);를 쓰세요.'
        }),
      ],
      boss: () => {
        const arr = Array.from({ length: 4 }, () => randInt(1, 30));
        const sum = arr[0] + arr[2];
        return {
          type: 'blank',
          q: `<code>int arr[4] = {${arr.join(', ')}};</code>일 때, <code>*(arr + 0) + *(arr + 2)</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `*(arr + 0)은 ${arr[0]}, *(arr + 2)는 ${arr[2]}이고, 더하면 ${sum}이에요.`,
          hint: '*(arr + n)은 arr[n]과 같다는 걸 이용해 각 값을 찾아보세요.'
        };
      }
    },
    {
      id: 'functionPointer',
      title: '함수 포인터',
      ready: true,
      summary: '함수의 주소를 담는 함수 포인터로, 어떤 함수를 실행할지 나중에 결정하는 법을 배워요.',
      goals: ['함수 포인터 선언하기', '함수 포인터로 호출하기', '상황에 따라 다른 함수 고르기'],
      blocks: [
        {
          h: '함수도 주소가 있어요: 함수 포인터',
          html: `<p><code>반환타입 (*이름)(매개변수타입, ...)</code> 형태로 함수 포인터를 선언하고, 함수 이름을 대입하면 그 함수를 가리킬 수 있어요.</p>`,
          code: {
            label: 'function_pointer.c',
            src: `int add(int a, int b) {
    return a + b;
}

int (*fp)(int, int) = add;
printf("%d\\n", fp(3, 4));`,
            out: `7`
          }
        },
        {
          h: '어떤 함수를 쓸지 나중에 결정하기',
          html: `<p>같은 함수 포인터 변수에 <b>다른 함수</b>를 대입하면, 상황에 따라 실행할 동작을 바꿀 수 있어요.</p>`,
          code: {
            label: 'switch_function.c',
            src: `int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

int (*operation)(int, int);
operation = add;
printf("%d\\n", operation(2, 3));
operation = multiply;
printf("%d\\n", operation(2, 3));`,
            out: `5\n6`
          },
          after: `<div class="note"><b>참고</b> — 다른 언어의 콜백 함수나 람다와 비슷한 역할을 해요. "실행할 동작 자체"를 값처럼 다룰 수 있게 해줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>int add(int a, int b) { return a + b; }</code>, <code>int (*fp)(int, int) = add;</code>일 때, <code>fp(${a}, ${b})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `fp는 add를 가리키니 fp(${a}, ${b})는 add(${a}, ${b}) = ${a + b}와 같아요.`,
            hint: 'fp를 통한 호출은 fp가 가리키는 함수를 그대로 호출하는 것과 같아요.'
          };
        },
        () => ({
          type: 'blank',
          q: `<code>int, int</code>를 받아 <code>int</code>를 반환하는 함수를 가리키는 함수 포인터 <code>fp</code>를 선언하는 코드를 완성하세요.`,
          prefix: 'int ', suffix: '(int, int);', accept: ['(*fp)'], placeholder: '변수 이름',
          why: '함수 포인터는 <code>반환타입 (*이름)(매개변수타입들);</code> 형태로 선언해요.',
          hint: '이름을 괄호로 감싸고 앞에 별표를 붙이세요.'
        }),
        () => {
          const a = randInt(1, 10), b = randInt(1, 10);
          const useMultiply = Math.random() < 0.5;
          const result = useMultiply ? a * b : a + b;
          return {
            type: 'blank',
            q: `<code>operation = ${useMultiply ? 'multiply' : 'add'};</code> 후 <code>operation(${a}, ${b})</code>의 결과는? (add는 더하기, multiply는 곱하기) 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
            why: useMultiply ? `multiply를 가리키니 ${a} × ${b} = ${result}예요.` : `add를 가리키니 ${a} + ${b} = ${result}예요.`,
            hint: 'operation이 지금 어떤 함수를 가리키고 있는지 먼저 확인해보세요.'
          };
        },
        () => makeChoice(
          '함수 포인터를 쓰면 좋은 점은?',
          '실행할 함수를 상황에 따라 나중에 결정할 수 있어서', ['함수 실행 속도가 항상 빨라져서', '함수 포인터 없이는 함수를 아예 호출할 수 없어서', '메모리를 아예 안 써서'],
          '같은 변수에 다른 함수를 담아서, 실행 시점에 어떤 동작을 할지 유연하게 정할 수 있어요.',
          '다른 언어의 콜백/람다와 비슷한 역할을 한다는 점을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>int subtract(int a, int b) { return a - b; }</code>가 있을 때, 이를 가리키는 함수 포인터 <code>fp</code>를 선언하고 <code>fp(10, 3)</code>을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'int (*fp)(int, int) = subtract;\nprintf("%d\\n", fp(10, 3));',
          accept: ['int (*fp)(int, int) = subtract;printf("%d\\n", fp(10, 3));'],
          why: 'int (*fp)(int, int) = subtract;로 함수 포인터를 만들고 fp(10, 3)으로 호출해요.',
          hint: 'int (*fp)(int, int) = subtract; 다음 줄에 printf로 fp(10, 3)을 출력하세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 10), b = randInt(1, 10);
        const ops = ['add', 'subtract', 'multiply'];
        const op = pick(ops);
        const result = op === 'add' ? a + b : op === 'subtract' ? a - b : a * b;
        return {
          type: 'blank',
          q: `<code>add</code>(더하기), <code>subtract</code>(빼기), <code>multiply</code>(곱하기) 세 함수가 있고, <code>operation = ${op};</code> 후 <code>operation(${a}, ${b})</code>를 호출하면 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
          why: `operation이 ${op}를 가리키므로, 그 연산의 결과인 ${result}가 나와요.`,
          hint: 'operation이 가리키는 함수가 무엇인지 확인하고 그 연산을 계산해보세요.'
        };
      }
    },
    {
      id: 'unionType',
      title: '공용체(union)',
      ready: true,
      summary: '여러 멤버가 같은 메모리 공간을 나눠 쓰는 union을 배우고, struct와 어떻게 다른지 알아봐요.',
      goals: ['union이 뭔지: 메모리를 공유하는 멤버들', 'struct와의 차이', '언제 union을 쓸지'],
      blocks: [
        {
          h: '멤버들이 같은 메모리를 나눠 쓰는: union',
          html: `<p><code>union</code>은 <code>struct</code>와 문법이 비슷하지만, 모든 멤버가 <b>같은 메모리 공간</b>을 나눠 써요. 그래서 <b>한 번에 하나의 멤버만</b> 유효한 값을 가져요.</p>`,
          code: {
            label: 'union_basic.c',
            src: `union Data {
    int i;
    float f;
};

union Data d;
d.i = 10;
printf("%d\\n", d.i);`,
            out: `10`
          }
        },
        {
          h: 'struct와 union의 차이',
          html: `<p><code>struct</code>는 각 멤버가 <b>자기만의 공간</b>을 가져서 크기가 멤버 크기의 <b>합</b>이지만, <code>union</code>은 모든 멤버가 <b>같은 공간</b>을 나눠 써서 크기가 <b>가장 큰 멤버의 크기</b>와 같아요. 다른 멤버에 새 값을 쓰면, 이전 멤버의 값은 <b>의미 없어져요</b>(덮어써져요).</p>`,
          code: {
            label: 'union_overwrite.c',
            src: `union Data d;
d.i = 65;
d.f = 3.14;  // 이제 d.i는 더 이상 65가 아니에요(같은 공간을 공유)`
          }
        },
        {
          h: '언제 union을 쓸까요',
          html: `<p>메모리를 아껴야 하는 임베디드 환경, 또는 "이 값이 여러 타입 중 하나일 수 있다"는 걸 표현할 때 써요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>int</code>와 <code>float</code> 멤버가 같은 메모리를 나눠 쓰는 <code>Data</code>를 선언할 때 맨 앞에 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: ' Data { int i; float f; };', accept: ['union'], placeholder: '키워드',
          why: '<code>union</code>은 멤버들이 같은 메모리를 나눠 쓰는 자료형을 만들어요.',
          hint: '"합집합, 공용체"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'union Data { int i; float f; }의 크기는 대략 어떻게 결정될까요?',
          'int와 float 중 더 큰 쪽의 크기와 같다', ['int 크기와 float 크기를 더한 것과 같다', '항상 1바이트다', '멤버 개수만큼 곱한 크기다'],
          'union은 모든 멤버가 같은 공간을 공유해서, 가장 큰 멤버의 크기만큼만 차지해요.',
          'struct처럼 "더하기"가 아니라는 점을 기억하세요.'
        ),
        () => makeChoice(
          '<code>d.i = 10;</code> 후 <code>d.f = 3.14;</code>를 실행하면 <code>d.i</code>는 어떻게 될까요?',
          '더 이상 10이 아니게 된다(같은 메모리를 f가 덮어씀)', ['여전히 10으로 남아있다', '자동으로 10과 3.14 둘 다 저장된다', '컴파일 오류가 난다'],
          'union은 같은 메모리를 공유해서, f에 새 값을 쓰면 i의 값도 함께 바뀌어(의미가 없어져)버려요.',
          '같은 공간을 나눠 쓴다는 게 무슨 뜻인지 다시 생각해보세요.'
        ),
        () => makeChoice(
          'struct와 union의 근본적인 차이는?',
          'struct는 각 멤버가 독립된 공간을, union은 모든 멤버가 같은 공간을 쓴다',
          ['struct와 union은 완전히 같은 것이다', 'union만 함수를 가질 수 있다', 'struct는 멤버를 하나만 가질 수 있다'],
          'struct는 "동시에 여러 값을 담는" 자료형, union은 "한 번에 하나만" 담는 자료형이에요.',
          '메모리 크기 계산 방식의 차이를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>int</code> 멤버 <code>i</code>와 <code>char</code> 멤버 <code>c</code>를 가진 <code>union Value</code>를 선언하세요.',
          starter: '',
          placeholder: 'union Value {\n    int i;\n    char c;\n};',
          accept: ['union Value {int i;char c;};'],
          why: 'union 이름 { 타입 멤버; ... }; 형태로 선언해요.',
          hint: 'union Value { int i; char c; };를 그대로 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '메모리가 아주 부족한 임베디드 장치에서, "이 값이 정수 아니면 실수 둘 중 하나만 저장하면 되는" 상황이에요. struct와 union 중 어느 쪽이 메모리를 더 아낄 수 있을까요?',
        'union (더 큰 멤버의 크기만큼만 차지해서)', ['struct (모든 멤버를 항상 다 저장해서)', '둘 다 메모리 사용량이 똑같다', '이 상황에는 배열을 써야 한다'],
        'union은 한 번에 하나의 값만 필요할 때, 그 값들 중 가장 큰 타입의 크기만큼만 메모리를 써서 절약할 수 있어요.',
        '동시에 두 값이 다 필요한 게 아니라 "둘 중 하나만" 필요하다는 상황에 주목하세요.'
      )
    },
    {
      id: 'enumType',
      title: '열거형(enum)',
      ready: true,
      summary: '이름 붙은 정수 상수의 모임인 enum으로, 매직 넘버 대신 읽기 좋은 코드를 만드는 법을 배워요.',
      goals: ['enum으로 이름 붙은 상수 만들기', '기본값은 0부터 순서대로', '원하는 시작값 정하기'],
      blocks: [
        {
          h: '이름 붙은 상수의 모임: enum',
          html: `<p><code>enum</code>으로 만든 각 이름은 사실 <b>정수</b>예요(기본은 0부터 순서대로 매겨져요). 의미를 알기 힘든 숫자(매직 넘버) 대신 이름으로 코드를 읽기 좋게 만들어줘요.</p>`,
          code: {
            label: 'enum_basic.c',
            src: `enum Day { MONDAY, TUESDAY, WEDNESDAY };

enum Day today = MONDAY;
printf("%d\\n", today);`,
            out: `0`
          }
        },
        {
          h: '원하는 시작값 정하기',
          html: `<p><code>LOW = 1</code>처럼 시작값을 직접 정하면, 그 다음 이름들은 자동으로 <code>2, 3...</code>으로 이어져요.</p>`,
          code: {
            label: 'enum_custom.c',
            src: `enum Level { LOW = 1, MEDIUM, HIGH };
printf("%d\\n", MEDIUM);`,
            out: `2`
          }
        },
        {
          h: '왜 enum을 쓸까요',
          html: `<p><code>0</code>, <code>1</code>, <code>2</code> 같은 숫자를 직접 비교하는 대신, <code>MONDAY</code>, <code>TUESDAY</code> 같은 이름을 쓰면 코드를 읽는 사람이 그 뜻을 훨씬 쉽게 이해할 수 있어요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY'];
          const idx = randInt(0, 2);
          return {
            type: 'blank',
            q: `<code>enum Day { MONDAY, TUESDAY, WEDNESDAY };</code>일 때, <code>${days[idx]}</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(idx)], placeholder: '숫자',
            why: `enum의 기본값은 0부터 순서대로 매겨져서, ${days[idx]}는 ${idx}예요.`,
            hint: '첫 번째 이름은 0, 그 다음은 1씩 늘어난다는 걸 떠올려보세요.'
          };
        },
        () => {
          const start = randInt(1, 5);
          const names = ['LOW', 'MEDIUM', 'HIGH'];
          const idx = randInt(0, 2);
          return {
            type: 'blank',
            q: `<code>enum Level { LOW = ${start}, MEDIUM, HIGH };</code>일 때, <code>${names[idx]}</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(start + idx)], placeholder: '숫자',
            why: `LOW가 ${start}로 시작하고 그 다음부터 1씩 늘어나서, ${names[idx]}는 ${start + idx}예요.`,
            hint: '시작값을 정하면, 그 뒤 이름들은 1씩 늘어나며 이어진다는 걸 떠올려보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `이름 붙은 정수 상수들의 모임을 만들 때 맨 앞에 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: ' Day { MONDAY, TUESDAY, WEDNESDAY };', accept: ['enum'], placeholder: '키워드',
          why: '<code>enum</code>으로 이름 붙은 상수들을 만들어요.',
          hint: '"열거하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>0</code>, <code>1</code>, <code>2</code> 같은 숫자를 직접 쓰는 대신 enum을 쓰는 이유는?',
          '코드를 읽는 사람이 그 값의 의미를 이름만 보고 바로 알 수 있어서', ['enum이 항상 실행 속도가 빨라서', 'enum 없이는 숫자를 아예 못 써서', '메모리를 아예 안 써서'],
          'enum은 숫자 대신 의미 있는 이름을 써서 코드 가독성을 높여줘요.',
          '매직 넘버(의미를 알기 힘든 숫자)의 문제를 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>RED</code>, <code>GREEN</code>, <code>BLUE</code> 세 값을 가진 <code>Color</code>라는 enum을 선언하세요.',
          starter: '',
          placeholder: 'enum Color { RED, GREEN, BLUE };',
          accept: ['enum Color { RED, GREEN, BLUE };'],
          why: 'enum 이름 { 값1, 값2, 값3 }; 형태로 선언해요.',
          hint: 'enum Color { RED, GREEN, BLUE };를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const start = randInt(1, 5);
        const names = ['LOW', 'MEDIUM', 'HIGH'];
        const idx1 = randInt(0, 2), idx2 = randInt(0, 2);
        const sum = (start + idx1) + (start + idx2);
        return {
          type: 'blank',
          q: `<code>enum Level { LOW = ${start}, MEDIUM, HIGH };</code>일 때, <code>${names[idx1]} + ${names[idx2]}</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `${names[idx1]}은 ${start + idx1}, ${names[idx2]}는 ${start + idx2}이고, 더하면 ${sum}이에요.`,
          hint: '각 이름의 실제 정수값을 먼저 계산한 뒤 더해보세요.'
        };
      }
    },
    {
      id: 'typedefAlias',
      title: 'typedef로 별명 만들기',
      ready: true,
      summary: '복잡하거나 긴 타입에 짧고 읽기 쉬운 별명을 붙이는 typedef를 배워요.',
      goals: ['typedef로 타입에 별명 붙이기', '구조체를 typedef와 함께 쓰기', '왜 typedef가 편리한지'],
      blocks: [
        {
          h: '타입에 별명 붙이기: typedef',
          html: `<p><code>typedef 원래타입 새이름;</code>으로, 기존 타입에 새로운 이름(별명)을 붙일 수 있어요.</p>`,
          code: {
            label: 'typedef_basic.c',
            src: `typedef unsigned int uint;

uint age = 17;
printf("%d\\n", age);`,
            out: `17`
          }
        },
        {
          h: '구조체를 짧게 쓰기',
          html: `<p><code>typedef</code> 없이는 매번 <code>struct Point p;</code>처럼 <code>struct</code>를 붙여야 했지만, <code>typedef</code>로 이름을 붙이면 <code>Point p;</code>처럼 짧게 쓸 수 있어요.</p>`,
          code: {
            label: 'typedef_struct.c',
            src: `typedef struct {
    int x, y;
} Point;

Point p;
p.x = 3;
printf("%d\\n", p.x);`,
            out: `3`
          }
        },
        {
          h: '왜 typedef가 편리할까요',
          html: `<p>복잡한 타입(포인터, 함수 포인터 등)에 읽기 쉬운 짧은 이름을 붙일 수 있어서, 코드가 훨씬 간결하고 이해하기 쉬워져요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const age = randInt(1, 30);
          return {
            type: 'blank',
            q: `<code>typedef unsigned int uint;</code> 후 <code>uint age = ${age};</code>일 때, <code>age</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(age)], placeholder: '숫자',
            why: `uint는 unsigned int의 별명일 뿐이라, age는 그대로 ${age}예요.`,
            hint: 'typedef는 타입에 새 이름을 붙일 뿐, 동작은 원래 타입과 완전히 같아요.'
          };
        },
        () => ({
          type: 'blank',
          q: `<code>unsigned int</code>에 <code>uint</code>라는 별명을 붙이는 코드를 완성하세요.`,
          prefix: '', suffix: ' unsigned int uint;', accept: ['typedef'], placeholder: '키워드',
          why: '<code>typedef 원래타입 새이름;</code>으로 별명을 붙여요.',
          hint: '"타입을 정의하다"라는 뜻이 담긴 키워드예요.'
        }),
        () => {
          const x = randInt(1, 20), y = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>typedef struct { int x, y; } Point;</code>일 때, <code>Point p; p.x = ${x}; p.y = ${y};</code> 후 <code>p.x + p.y</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(x + y)], placeholder: '숫자',
            why: `p.x는 ${x}, p.y는 ${y}이고, 더하면 ${x + y}예요.`,
            hint: '구조체 멤버 값을 그대로 더해보세요.'
          };
        },
        () => makeChoice(
          'typedef를 쓰면 좋은 점은?',
          '복잡하거나 긴 타입에 짧고 읽기 쉬운 이름을 붙일 수 있어서', ['typedef 없이는 구조체를 아예 만들 수 없어서', '실행 속도가 항상 빨라져서', '메모리를 아예 안 써서'],
          'typedef는 타입 이름을 더 짧고 명확하게 만들어서 코드 가독성을 높여줘요.',
          '매번 struct Point라고 쓰는 것과 Point라고만 쓰는 것 중 어느 게 더 편할지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>x</code>, <code>y</code> 두 int 멤버를 가진 구조체를 <code>typedef</code>로 <code>Point</code>라는 이름으로 선언하세요.',
          starter: '',
          placeholder: 'typedef struct {\n    int x, y;\n} Point;',
          accept: ['typedef struct {int x, y;} Point;'],
          why: 'typedef struct { 멤버들 } 새이름; 형태로 구조체에 별명을 붙여요.',
          hint: 'typedef struct { int x, y; } Point;를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const x = randInt(1, 20), y = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>typedef struct { int x, y; } Point;</code>로 만든 <code>Point p1;</code>에 <code>p1.x = ${x}; p1.y = ${y};</code>를 대입했어요. <code>Point p2 = p1;</code> 후 <code>p2.x + p2.y</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(x + y)], placeholder: '숫자',
          why: `구조체를 대입하면 멤버 값이 그대로 복사돼서, p2.x는 ${x}, p2.y는 ${y}, 합은 ${x + y}예요.`,
          hint: '구조체 대입은 모든 멤버 값을 그대로 복사한다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'preprocessorMacros',
      title: '전처리기와 매크로',
      ready: true,
      summary: '컴파일 전에 먼저 처리되는 #define 상수와 매크로 함수, 그리고 조건부 컴파일을 배워요.',
      goals: ['#define으로 상수 만들기', '#define으로 매크로 함수 만들기', '#ifdef로 조건부 컴파일하기'],
      blocks: [
        {
          h: '컴파일 전에 먼저 처리되는: 전처리기',
          html: `<p><code>#</code>으로 시작하는 줄은 실제 컴파일이 시작되기 <b>전에</b> 먼저 처리돼요. 이런 처리를 담당하는 걸 <b>전처리기</b>라고 불러요.</p>`
        },
        {
          h: '이름 붙은 상수 만들기: #define',
          html: `<p><code>#define 이름 값</code>으로 정의하면, 코드에서 그 이름을 쓴 자리가 컴파일 전에 <b>그대로 값으로 치환</b>돼요. (진짜 변수가 아니라 텍스트 치환이에요!)</p>`,
          code: {
            label: 'define_const.c',
            src: `#define MAX_SCORE 100

printf("%d\\n", MAX_SCORE);`,
            out: `100`
          }
        },
        {
          h: '매크로 함수 만들기',
          html: `<p><code>#define</code>으로 함수처럼 동작하는 매크로도 만들 수 있어요. 예상치 못한 계산 순서 문제를 막기 위해, 매개변수를 <b>괄호로 꼼꼼히</b> 감싸는 게 중요해요.</p>`,
          code: {
            label: 'define_macro.c',
            src: `#define SQUARE(x) ((x) * (x))

printf("%d\\n", SQUARE(5));`,
            out: `25`
          },
          after: `<div class="note"><b>주의</b> — <code>#define SQUARE(x) x * x</code>처럼 괄호 없이 만들면, <code>SQUARE(2 + 3)</code>이 <code>2 + 3 * 2 + 3 = 11</code>로 잘못 계산될 수 있어요. 항상 괄호로 꼼꼼히 감싸세요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const val = randInt(50, 200);
          return {
            type: 'blank',
            q: `<code>#define MAX_SCORE ${val}</code>일 때, <code>printf("%d", MAX_SCORE);</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(val)], placeholder: '숫자',
            why: `MAX_SCORE는 컴파일 전에 ${val}로 그대로 치환돼요.`,
            hint: '#define은 그 이름을 값으로 그대로 바꿔치기한다는 걸 떠올려보세요.'
          };
        },
        () => {
          const n = randInt(2, 10);
          return {
            type: 'blank',
            q: `<code>#define SQUARE(x) ((x) * (x))</code>일 때, <code>SQUARE(${n})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n * n)], placeholder: '숫자',
            why: `SQUARE(${n})은 (${n}) * (${n}) = ${n * n}으로 치환돼요.`,
            hint: 'x 자리에 그대로 값이 들어가서 곱해진다는 걸 떠올려보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `이름 붙은 상수나 매크로를 정의할 때 맨 앞에 쓰는 전처리기 지시문을 쓰세요.`,
          prefix: '', suffix: ' MAX_SCORE 100', accept: ['#define'], placeholder: '지시문',
          why: '<code>#define</code>으로 상수나 매크로를 정의해요.',
          hint: '"정의하다"라는 뜻의 영어 단어에 # 기호를 붙이세요.'
        }),
        () => makeChoice(
          '매크로 함수를 만들 때 매개변수를 괄호로 꼼꼼히 감싸야 하는 이유는?',
          '괄호가 없으면 연산자 우선순위 때문에 예상과 다르게 계산될 수 있어서',
          ['괄호가 없으면 컴파일 자체가 안 돼서', '매크로는 원래 괄호가 필수 문법이라서', '괄호가 있어야 실행 속도가 빨라져서'],
          '매크로는 텍스트 그대로 치환되기 때문에, 괄호가 없으면 <code>SQUARE(2+3)</code>이 <code>2+3*2+3</code>처럼 잘못 계산될 수 있어요.',
          '매크로는 "계산"이 아니라 "글자 그대로 바꿔치기"라는 점을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>DOUBLE(x)</code>라는, x를 2배로 만드는 매크로 함수를 괄호를 꼼꼼히 써서 정의하세요.',
          starter: '',
          placeholder: '#define DOUBLE(x) ((x) * 2)',
          accept: ['#define DOUBLE(x) ((x) * 2)'],
          why: '#define DOUBLE(x) ((x) * 2)처럼 매개변수를 괄호로 감싸서 정의해요.',
          hint: '#define DOUBLE(x) ((x) * 2)를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const a = randInt(2, 5), b = randInt(2, 5);
        const result = (a + b) * (a + b);
        return {
          type: 'blank',
          q: `<code>#define SQUARE(x) ((x) * (x))</code>일 때, <code>SQUARE(${a} + ${b})</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
          why: `괄호로 잘 감쌌기 때문에 (${a} + ${b}) * (${a} + ${b}) = ${result}로 올바르게 계산돼요.`,
          hint: '괄호 덕분에 (a+b) 전체가 하나로 묶여서 계산된다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'bitOperators',
      title: '비트 연산자',
      ready: true,
      summary: '숫자를 비트(0과 1) 단위로 계산하는 &, |, ^, <<, >> 연산자를 배워요.',
      goals: ['&, |, ^로 비트 단위 계산하기', '<<, >>로 자리 옮기기(시프트)', '비트 플래그로 여러 옵션 담기'],
      blocks: [
        {
          h: '비트 단위로 계산하기: &, |, ^',
          html: `<p><code>&</code>(AND)는 둘 다 1일 때만 1, <code>|</code>(OR)는 하나라도 1이면 1, <code>^</code>(XOR)는 서로 다를 때만 1이 돼요. 각 자리(비트)마다 이 규칙을 적용해요.</p>`,
          code: {
            label: 'bitwise_basic.c',
            src: `int a = 5;   // 0101
int b = 3;   // 0011
printf("%d\\n", a & b);  // 0001 = 1
printf("%d\\n", a | b);  // 0111 = 7
printf("%d\\n", a ^ b);  // 0110 = 6`,
            out: `1\n7\n6`
          }
        },
        {
          h: '자리를 옮기기: <<, >>',
          html: `<p><code>&lt;&lt;</code>(왼쪽 시프트)는 비트를 왼쪽으로 밀어서 <b>2의 거듭제곱만큼 곱하는</b> 효과, <code>&gt;&gt;</code>(오른쪽 시프트)는 오른쪽으로 밀어서 <b>2의 거듭제곱만큼 나누는</b> 효과를 내요.</p>`,
          code: {
            label: 'shift.c',
            src: `int x = 1;
printf("%d\\n", x << 3);  // 8
printf("%d\\n", 16 >> 2); // 4`,
            out: `8\n4`
          }
        },
        {
          h: '여러 옵션을 한 번에 담기: 비트 플래그',
          html: `<p>각 비트를 하나의 on/off 스위치처럼 써서, 여러 옵션을 정수 하나에 담는 기법을 <b>비트 플래그</b>라고 해요. 실무에서 권한 관리 등에 종종 써요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 15), b = randInt(1, 15);
          return {
            type: 'blank',
            q: `<code>int a = ${a}; int b = ${b};</code>일 때, <code>a & b</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a & b)], placeholder: '숫자',
            why: `${a} & ${b}는 각 비트를 AND 연산해서 ${a & b}이에요.`,
            hint: '두 수를 2진수로 놓고 같은 자리끼리 AND(둘 다 1일 때만 1)해보세요.'
          };
        },
        () => {
          const a = randInt(1, 15), b = randInt(1, 15);
          return {
            type: 'blank',
            q: `<code>int a = ${a}; int b = ${b};</code>일 때, <code>a | b</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a | b)], placeholder: '숫자',
            why: `${a} | ${b}는 각 비트를 OR 연산해서 ${a | b}이에요.`,
            hint: '두 수를 2진수로 놓고 같은 자리끼리 OR(하나라도 1이면 1)해보세요.'
          };
        },
        () => {
          const x = randInt(1, 8);
          const n = randInt(1, 4);
          return {
            type: 'blank',
            q: `<code>int x = ${x};</code>일 때, <code>x &lt;&lt; ${n}</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(x << n)], placeholder: '숫자',
            why: `<code>x &lt;&lt; ${n}</code>은 ${x}에 2를 ${n}번 곱한 것과 같아서 ${x << n}이에요.`,
            hint: '왼쪽 시프트 n칸은 2^n을 곱하는 것과 같아요.'
          };
        },
        () => makeChoice(
          '<code>16 &gt;&gt; 2</code>의 결과는?',
          '4', ['8', '32', '64'],
          '오른쪽 시프트 2칸은 2^2(=4)로 나누는 것과 같아서, 16 / 4 = 4예요.',
          '오른쪽 시프트는 나눗셈과 비슷한 효과를 낸다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>a = 6</code>과 <code>b = 3</code>의 XOR(<code>^</code>) 연산 결과를 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'printf("%d\\n", 6 ^ 3);',
          accept: ['printf("%d\\n", 6 ^ 3);'],
          why: '6(110)과 3(011)을 XOR하면 서로 다른 자리만 1이 되어 5(101)가 나와요.',
          hint: 'printf("%d\\n", 6 ^ 3);을 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const x = randInt(1, 5);
        const shift = randInt(1, 3);
        const result = (x << shift) | 1;
        return {
          type: 'blank',
          q: `<code>int x = ${x};</code>일 때, <code>(x &lt;&lt; ${shift}) | 1</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
          why: `x를 왼쪽으로 ${shift}칸 시프트하면 ${x << shift}이 되고, 거기에 1을 OR하면 ${result}이에요.`,
          hint: '먼저 시프트 결과를 계산한 뒤, 그 값과 1을 OR 연산해보세요.'
        };
      }
    },
    {
      id: 'constStatic',
      title: 'const와 static',
      ready: true,
      summary: '값을 못 바꾸게 하는 const와, 함수가 끝나도 값을 기억하는 static 지역변수를 배워요.',
      goals: ['const로 값을 못 바꾸게 하기', 'static 지역변수로 값 기억하기', 'static 함수로 범위 제한하기'],
      blocks: [
        {
          h: '값을 못 바꾸게 하기: const',
          html: `<p><code>const</code>가 붙은 변수는 한 번 초기화되면 <b>값을 바꿀 수 없어요</b>. 바꾸려고 하면 컴파일 오류가 나요.</p>`,
          code: {
            label: 'const_basic.c',
            src: `const int MAX = 100;
// MAX = 200; // 오류!`
          }
        },
        {
          h: '함수가 끝나도 값을 기억하는: static 지역변수',
          html: `<p>보통 지역변수는 함수가 끝나면 사라지지만, <code>static</code>이 붙은 지역변수는 <b>함수가 끝나도 값이 유지</b>돼서, 다음 호출에서 이어져요.</p>`,
          code: {
            label: 'static_counter.c',
            src: `void counter() {
    static int count = 0;
    count++;
    printf("%d\\n", count);
}

counter();
counter();
counter();`,
            out: `1\n2\n3`
          }
        },
        {
          h: '그 파일 안에서만 쓰는 함수: static 함수',
          html: `<p>함수 앞에 <code>static</code>을 붙이면, 그 함수는 <b>같은 파일 안에서만</b> 쓸 수 있고 다른 파일에서는 접근할 수 없어요. 내부에서만 쓸 도우미 함수를 숨길 때 써요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const calls = randInt(2, 5);
          return {
            type: 'blank',
            q: `<code>static int count = 0;</code>인 <code>counter()</code>가 매번 호출될 때마다 <code>count</code>를 1 늘리고 출력할 때, <code>counter()</code>를 ${calls}번 연달아 호출하면 마지막 호출의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(calls)], placeholder: '숫자',
            why: `static 변수는 호출 사이에 값을 기억해서, ${calls}번째 호출에서는 ${calls}이 출력돼요.`,
            hint: 'static 지역변수는 함수가 끝나도 값이 사라지지 않고 유지된다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          '<code>const int MAX = 100;</code> 후 <code>MAX = 200;</code>을 실행하려고 하면?',
          '컴파일 오류가 난다', ['조용히 200으로 바뀐다', 'MAX가 자동으로 300이 된다', '아무 일도 안 일어난다'],
          'const가 붙은 변수는 값을 바꾸려고 하면 컴파일 오류가 나요.',
          '"상수"라는 이름처럼, 한 번 정해지면 안 바뀐다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `함수 안의 지역변수가 함수 호출이 끝나도 값을 계속 기억하게 만드는 키워드를 쓰세요.`,
          prefix: '', suffix: ' int count = 0;', accept: ['static'], placeholder: '키워드',
          why: '<code>static</code>이 붙은 지역변수는 함수가 끝나도 값이 유지돼요.',
          hint: '"고정된, 정적인"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '함수 앞에 static을 붙이면 생기는 효과는?',
          '그 함수를 같은 파일 안에서만 쓸 수 있게 된다', ['그 함수가 자동으로 더 빨리 실행된다', '그 함수를 어디서든 호출할 수 있게 된다', '그 함수가 재귀 함수로 바뀐다'],
          'static이 붙은 함수는 그 파일 밖에서는 접근할 수 없어서, 내부 전용 도우미 함수를 만들 때 써요.',
          '"그 파일 안에서만"이라는 범위 제한이 핵심이에요.'
        ),
        () => ({
          type: 'code',
          q: '호출될 때마다 1씩 늘어나는 static 변수 count를 가진 <code>counter()</code> 함수를 작성하세요. (count를 늘린 뒤 출력)',
          starter: '',
          rows: 4,
          placeholder: 'void counter() {\n    static int count = 0;\n    count++;\n    printf("%d\\n", count);\n}',
          accept: ['void counter() {static int count = 0;count++;printf("%d\\n", count);}'],
          why: 'static int count = 0;은 함수가 여러 번 불려도 딱 한 번만 초기화되고, 그 뒤론 값이 계속 유지돼요.',
          hint: 'void counter() { static int count = 0; count++; printf("%d\\n", count); }를 쓰세요.'
        }),
      ],
      boss: () => {
        const calls = randInt(3, 6);
        const total = (calls * (calls + 1)) / 2;
        return {
          type: 'blank',
          q: `<code>counter()</code>가 static count를 1씩 늘리며 출력할 때, <code>counter()</code>를 ${calls}번 부른 뒤 출력된 모든 숫자를 다 더하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
          why: `1부터 ${calls}까지 출력되고, 그걸 다 더하면 ${total}이에요.`,
          hint: '1, 2, 3, ...부터 순서대로 출력된다는 걸 떠올리고 다 더해보세요.'
        };
      }
    },
    {
      id: 'linkedList',
      title: '연결 리스트 직접 구현',
      ready: true,
      summary: '각 칸이 다음 칸의 주소를 가리키며 이어지는 자료구조, 연결 리스트를 직접 만들어봐요.',
      goals: ['노드로 이어진 자료구조: 연결 리스트', '구조체로 노드 만들기', '노드를 이어서 리스트 만들기'],
      blocks: [
        {
          h: '다음 칸을 가리키는 상자들: 연결 리스트',
          html: `<p>배열은 크기가 고정돼 있지만, <b>연결 리스트</b>는 각 칸(노드)이 <b>다음 노드의 주소</b>를 가지고 있어서 필요할 때마다 자유롭게 이어붙일 수 있어요.</p>`,
          code: {
            label: 'Node.c',
            src: `struct Node {
    int value;
    struct Node *next;
};`
          },
          after: `<div class="note"><b>신기한 점</b> — <code>struct Node</code> 안에 <code>struct Node *next;</code>처럼 <b>자기 자신을 가리키는 포인터</b>를 넣을 수 있어요(포인터는 크기가 고정이라 가능해요).</div>`
        },
        {
          h: '노드를 만들고 이어붙이기',
          html: `<p>각 노드의 <code>next</code>에 다음 노드의 주소를 넣으면, 노드들이 사슬처럼 이어져요.</p>`,
          code: {
            label: 'link_nodes.c',
            src: `struct Node a = {10, NULL};
struct Node b = {20, NULL};
a.next = &b;

printf("%d\\n", a.value);
printf("%d\\n", a.next->value);`,
            out: `10\n20`
          }
        },
        {
          h: '끝을 나타내는 NULL',
          html: `<p>마지막 노드의 <code>next</code>는 <code>NULL</code>로 둬서, "여기가 리스트의 끝"이라는 걸 표시해요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const v1 = randInt(1, 50), v2 = randInt(1, 50);
          return {
            type: 'blank',
            q: `<code>struct Node a = {${v1}, NULL}; struct Node b = {${v2}, NULL}; a.next = &b;</code>일 때, <code>a.next-&gt;value</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(v2)], placeholder: '숫자',
            why: `a.next는 b를 가리키니, a.next->value는 b.value인 ${v2}예요.`,
            hint: 'a.next는 b의 주소를 담고 있으니, ->로 b의 멤버에 접근할 수 있어요.'
          };
        },
        () => ({
          type: 'blank',
          q: `<code>struct Node</code> 안에서, 다음 노드를 가리키는 자기 자신 타입의 포인터 멤버를 선언하는 코드를 완성하세요.`,
          prefix: 'struct Node {\n    int value;\n    struct Node ', suffix: ';\n};', accept: ['*next'], placeholder: '변수 이름',
          why: '<code>struct Node *next;</code>처럼 자기 자신을 가리키는 포인터를 멤버로 넣을 수 있어요.',
          hint: '포인터 표기(*)를 붙인 이름을 쓰세요.'
        }),
        () => makeChoice(
          '연결 리스트가 배열보다 유리한 점은?',
          '크기를 미리 정하지 않고 필요할 때마다 노드를 추가할 수 있다', ['항상 배열보다 빠르게 특정 위치에 접근할 수 있다', '메모리를 아예 안 써도 된다', '정렬이 자동으로 된다'],
          '연결 리스트는 노드를 필요할 때마다 이어붙일 수 있어서, 크기가 고정되지 않아도 돼요.',
          '배열은 크기를 미리 정해야 한다는 제약과 비교해보세요.'
        ),
        () => makeChoice(
          '연결 리스트에서 마지막 노드의 next를 무엇으로 둘까요?',
          '<code>NULL</code>', ['<code>0</code>이 아닌 아무 숫자', '첫 번째 노드의 주소', '자기 자신의 주소'],
          '마지막 노드의 next를 NULL로 둬서 "여기서 끝"이라는 걸 표시해요.',
          '"더 이상 가리키는 곳이 없다"는 뜻의 값을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>struct Node a = {1, NULL};</code>와 <code>struct Node b = {2, NULL};</code>를 만들고, a.next가 b를 가리키도록 이어붙인 뒤 <code>a.next-&gt;value</code>를 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'struct Node a = {1, NULL};\nstruct Node b = {2, NULL};\na.next = &b;\nprintf("%d\\n", a.next->value);',
          accept: ['struct Node a = {1, NULL};struct Node b = {2, NULL};a.next = &b;printf("%d\\n", a.next->value);'],
          why: 'a.next = &b;로 두 노드를 이어붙이고, a.next->value로 b의 값을 꺼내요.',
          hint: 'a.next = &b; 다음 줄에 printf로 a.next->value를 출력하세요.'
        }),
      ],
      boss: () => {
        const v1 = randInt(1, 20), v2 = randInt(1, 20), v3 = randInt(1, 20);
        const sum = v1 + v2 + v3;
        return {
          type: 'blank',
          q: `<code>struct Node a = {${v1}, NULL}; struct Node b = {${v2}, NULL}; struct Node c = {${v3}, NULL}; a.next = &b; b.next = &c;</code>일 때, <code>a.value + a.next-&gt;value + a.next-&gt;next-&gt;value</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `a.value(${v1}) + a.next->value(=b.value, ${v2}) + a.next->next->value(=c.value, ${v3}) = ${sum}이에요.`,
          hint: 'a → b → c 순서로 이어져 있어서, a부터 시작해 next를 두 번 따라가면 c에 도달해요.'
        };
      }
    },
    {
      id: 'recursionC',
      title: '재귀 함수',
      ready: true,
      summary: '함수가 자기 자신을 다시 부르는 재귀와, 반드시 필요한 멈추는 조건(기저 조건)을 배워요.',
      goals: ['자기 자신을 부르는 함수', '기저 조건(base case)', '재귀로 팩토리얼 계산하기'],
      blocks: [
        {
          h: '자기 자신을 다시 부르는 함수: 재귀',
          html: `<p><b>재귀 함수</b>는 함수 안에서 자기 자신을 다시 호출하는 함수예요.</p>`,
          code: {
            label: 'countdown.c',
            src: `void countdown(int n) {
    if (n == 0) {
        printf("발사!\\n");
    } else {
        printf("%d\\n", n);
        countdown(n - 1);
    }
}

countdown(3);`,
            out: `3\n2\n1\n발사!`
          }
        },
        {
          h: '꼭 필요한 멈추는 조건: 기저 조건',
          html: `<p>재귀 함수는 반드시 <b>더 이상 자기 자신을 부르지 않고 끝내는 조건</b>(기저 조건)이 있어야 해요. 없으면 함수가 끝없이 자기 자신을 불러서, 결국 <b>스택 오버플로우</b>(메모리 초과)로 프로그램이 멈춰요.</p>`
        },
        {
          h: '재귀로 계산하기: 팩토리얼',
          html: `<p>팩토리얼(<code>n!</code>)은 <code>n! = n × (n-1)!</code>로 정의할 수 있어서 재귀와 잘 어울려요. 기저 조건은 <code>n이 1 이하일 때 1을 반환</code>하는 거예요.</p>`,
          code: {
            label: 'factorial.c',
            src: `int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

printf("%d\\n", factorial(4));`,
            out: `24`
          }
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 5);
          return {
            type: 'blank',
            q: `<code>countdown(${n})</code>을 호출하면, 맨 마지막 줄에 무엇이 출력될까요? (따옴표 없이)`,
            prefix: '', suffix: '', accept: ['발사!'], placeholder: '값',
            why: `${n}부터 세어 내려가다가 결국 n이 0이 되는 기저 조건에 도달해서 "발사!"가 출력돼요.`,
            hint: '재귀는 결국 기저 조건에 도달할 때까지 계속 자기 자신을 부른다는 걸 떠올려보세요.'
          };
        },
        () => {
          const n = randInt(3, 6);
          let fact = 1;
          for (let i = 2; i <= n; i++) fact *= i;
          return {
            type: 'blank',
            q: `<code>factorial(${n})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(fact)], placeholder: '숫자',
            why: `${n}! = ${Array.from({ length: n }, (_, i) => i + 1).join(' × ')} = ${fact}이에요.`,
            hint: '1부터 그 수까지 순서대로 다 곱해보세요.'
          };
        },
        () => makeChoice(
          '재귀 함수에 기저 조건이 없거나 절대 만족되지 않으면 어떻게 될까요?',
          '스택 오버플로우로 프로그램이 멈춘다', ['자동으로 멈춘다', '0을 반환한다', '아무 일도 안 일어난다'],
          '기저 조건 없이 계속 자기 자신을 부르면, 호출이 쌓이는 메모리 공간(스택)이 넘쳐서 프로그램이 멈춰요.',
          '함수를 호출할 때마다 정보가 어딘가에(스택) 쌓인다는 걸 떠올려보세요.'
        ),
        () => makeChoice(
          '재귀 함수에서 더 이상 자기 자신을 부르지 않고 끝내는 조건을 부르는 이름은?',
          '기저 조건(base case)', ['반복 조건', '예외 조건', '전역 조건'],
          '기저 조건은 재귀 호출을 멈추고 바로 값을 돌려주는 조건이에요.',
          '"기초가 되는, 바탕이 되는"이라는 뜻의 단어가 들어가요.'
        ),
        () => ({
          type: 'code',
          q: '1부터 <code>n</code>까지 더한 값을 재귀로 계산하는 함수 <code>sumTo(int n)</code>을 작성하세요. (기저 조건: n이 0이면 0을 반환)',
          starter: '',
          rows: 4,
          placeholder: 'int sumTo(int n) {\n    if (n == 0) return 0;\n    return n + sumTo(n - 1);\n}',
          accept: ['int sumTo(int n) {if (n == 0) return 0;return n + sumTo(n - 1);}'],
          why: '기저 조건(n==0일 때 0 반환)에 도달할 때까지, 매번 n을 더하고 더 작은 문제(n-1)로 자기 자신을 불러요.',
          hint: 'if (n == 0) return 0;을 먼저 쓰고, return n + sumTo(n - 1);을 쓰세요.'
        }),
      ],
      boss: () => {
        const n = randInt(4, 7);
        let sum = 0;
        for (let i = 1; i <= n; i++) sum += i;
        return {
          type: 'blank',
          q: `<code>int sumTo(int n) { if (n == 0) return 0; return n + sumTo(n - 1); }</code>일 때, <code>sumTo(${n})</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `1부터 ${n}까지 재귀적으로 더하면 ${sum}이에요.`,
          hint: '기저 조건에 도달할 때까지 n, n-1, n-2, ... 순서로 더해진다고 생각해보세요.'
        };
      }
    },
    {
      id: 'variadicFunctions',
      title: '가변 인자 함수',
      ready: true,
      summary: 'printf처럼 인자 개수가 정해지지 않은 함수를 stdarg.h로 직접 만드는 법을 배워요.',
      goals: ['가변 인자 함수가 뭔지', 'stdarg.h로 인자 다루기', 'va_start/va_arg/va_end'],
      blocks: [
        {
          h: '몇 개가 올지 모를 때: 가변 인자 함수',
          html: `<p><code>printf(형식, ...)</code>처럼, 넘기는 인자의 <b>개수가 정해지지 않은</b> 함수를 <b>가변 인자 함수</b>라고 해요. <code>stdarg.h</code>를 이용해 직접 만들 수 있어요.</p>`
        },
        {
          h: 'stdarg.h로 가변 인자 받기',
          html: `<p><code>va_start</code>로 인자를 꺼낼 준비를 하고, <code>va_arg(목록, 타입)</code>로 하나씩 꺼내고, 다 쓴 뒤엔 <code>va_end</code>로 마무리해요.</p>`,
          code: {
            label: 'variadic_sum.c',
            src: `#include <stdarg.h>

int sum(int count, ...) {
    va_list args;
    va_start(args, count);
    int total = 0;
    for (int i = 0; i < count; i++) {
        total += va_arg(args, int);
    }
    va_end(args);
    return total;
}

printf("%d\\n", sum(3, 1, 2, 3));`,
            out: `6`
          }
        },
        {
          h: '왜 개수(count)를 따로 받을까요',
          html: `<p>가변 인자는 "몇 개가 왔는지"를 자동으로 알 수 없어서, <code>count</code>처럼 <b>개수를 알려주는 매개변수</b>를 따로 받거나, <code>printf</code>처럼 형식 문자열 안에 개수 정보를 담아둬야 해요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const nums = Array.from({ length: randInt(3, 5) }, () => randInt(1, 20));
          const sum = nums.reduce((a, b) => a + b, 0);
          return {
            type: 'blank',
            q: `<code>sum(int count, ...)</code>가 넘긴 값들을 다 더해 반환할 때, <code>sum(${nums.length}, ${nums.join(', ')})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
            why: `첫 번째 인자(개수)를 제외한 나머지 값들을 다 더하면 ${sum}이에요.`,
            hint: '첫 번째 인자는 "몇 개인지"를 나타내고, 그 뒤 값들이 실제로 더해질 값들이에요.'
          };
        },
        () => ({
          type: 'blank',
          q: `가변 인자를 꺼낼 준비를 시작하는 매크로를 쓰세요.`,
          prefix: '', suffix: '(args, count);', accept: ['va_start'], placeholder: '매크로 이름',
          why: '<code>va_start(목록, 마지막고정인자)</code>로 가변 인자를 꺼낼 준비를 해요.',
          hint: '"가변 인자(variadic argument)를 시작한다"는 뜻이에요.'
        }),
        () => ({
          type: 'blank',
          q: `가변 인자 목록에서 값을 하나씩 꺼내는 매크로를 쓰세요. (타입을 함께 지정)`,
          prefix: 'total += ', suffix: '(args, int);', accept: ['va_arg'], placeholder: '매크로 이름',
          why: '<code>va_arg(목록, 타입)</code>으로 값을 하나씩 꺼내요.',
          hint: '"가변 인자 하나"를 뜻하는 매크로예요.'
        }),
        () => makeChoice(
          '가변 인자 처리를 다 마친 뒤 꼭 불러야 하는 매크로는?',
          '<code>va_end</code>', ['<code>va_start</code>', '<code>va_arg</code>', '아무것도 안 불러도 된다'],
          '<code>va_end(목록)</code>으로 가변 인자 처리를 마무리해야 해요.',
          '"끝내다"라는 뜻의 end가 들어가요.'
        ),
        () => ({
          type: 'code',
          q: '<code>int count</code>와 가변 인자를 받아, 그 값들 중 가장 큰 값을 반환하는 <code>maxOf(int count, ...)</code> 함수를 작성하세요. (va_list, va_start, va_arg, va_end 사용)',
          starter: '',
          rows: 10,
          placeholder: 'int maxOf(int count, ...) {\n    va_list args;\n    va_start(args, count);\n    int max = va_arg(args, int);\n    for (int i = 1; i < count; i++) {\n        int val = va_arg(args, int);\n        if (val > max) {\n            max = val;\n        }\n    }\n    va_end(args);\n    return max;\n}',
          accept: ['int maxOf(int count, ...) {va_list args;va_start(args, count);int max = va_arg(args, int);for (int i = 1; i < count; i++) {int val = va_arg(args, int);if (val > max) {max = val;}}va_end(args);return max;}'],
          why: '첫 값을 max로 두고, 나머지 값들과 비교하며 더 큰 값으로 갱신해요.',
          hint: 'va_start 후 첫 값을 max로 삼고, for문으로 나머지를 비교하며 max를 갱신하세요.'
        }),
      ],
      boss: () => {
        const nums = Array.from({ length: randInt(3, 5) }, () => randInt(1, 30));
        const max = Math.max(...nums);
        return {
          type: 'blank',
          q: `<code>maxOf(int count, ...)</code>가 가장 큰 값을 반환할 때, <code>maxOf(${nums.length}, ${nums.join(', ')})</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(max)], placeholder: '숫자',
          why: `넘긴 값들 중 가장 큰 값은 ${max}예요.`,
          hint: '개수를 나타내는 첫 인자를 제외한 나머지 값들 중 최댓값을 찾아보세요.'
        };
      }
    },
    {
      id: 'stringFunctionsC',
      title: '문자열 함수 심화',
      ready: true,
      summary: '문자열을 복사하는 strcpy, 이어붙이는 strcat, 비교하는 strcmp를 배워요.',
      goals: ['strcpy로 복사하기', 'strcat으로 이어붙이기', 'strcmp로 비교하기'],
      blocks: [
        {
          h: '문자열 복사하기: strcpy',
          html: `<p><code>strcpy(목적지, 원본)</code>은 원본 문자열을 목적지 배열로 복사해요.</p>`,
          code: {
            label: 'strcpy_basic.c',
            src: `char src[] = "안녕";
char dest[20];
strcpy(dest, src);
printf("%s\\n", dest);`,
            out: `안녕`
          }
        },
        {
          h: '문자열 이어붙이기: strcat',
          html: `<p><code>strcat(문자열1, 문자열2)</code>은 문자열1 뒤에 문자열2를 이어붙여요.</p>`,
          code: {
            label: 'strcat_basic.c',
            src: `char greeting[20] = "안녕, ";
strcat(greeting, "지수");
printf("%s\\n", greeting);`,
            out: `안녕, 지수`
          }
        },
        {
          h: '문자열 비교하기: strcmp',
          html: `<p>C에서는 <code>==</code>로 문자열을 비교하면 <b>주소</b>를 비교하게 돼서 잘못된 결과가 나와요. 내용을 비교하려면 <code>strcmp(문자열1, 문자열2)</code>를 써야 해요. <b>같으면 0</b>, 다르면 0이 아닌 값을 돌려줘요.</p>`,
          code: {
            label: 'strcmp_basic.c',
            src: `if (strcmp("apple", "apple") == 0) {
    printf("같아요\\n");
}`,
            out: `같아요`
          }
        }
      ],
      quizGenerators: [
        () => {
          const word = pick(['안녕', '반가워', '고마워']);
          return {
            type: 'blank',
            q: `<code>char src[] = "${word}"; char dest[20]; strcpy(dest, src);</code>일 때, <code>dest</code>의 값은? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [word], placeholder: '값',
            why: `strcpy는 src의 내용을 dest로 그대로 복사해서 "${word}"가 돼요.`,
            hint: 'strcpy(목적지, 원본)은 원본 내용을 목적지에 그대로 옮겨요.'
          };
        },
        () => {
          const a = pick(['안녕, ', '반가워, ']);
          const b = pick(['지수', '민준']);
          return {
            type: 'blank',
            q: `<code>char greeting[20] = "${a}"; strcat(greeting, "${b}");</code> 후 <code>greeting</code>의 값은? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [`${a}${b}`], placeholder: '값',
            why: `strcat은 뒤에 이어붙여서 "${a}${b}"가 돼요.`,
            hint: 'strcat은 첫 번째 문자열 뒤에 두 번째 문자열을 이어붙여요.'
          };
        },
        () => {
          const s1 = pick(['apple', 'banana']);
          const s2 = pick(['apple', 'banana']);
          const equal = s1 === s2;
          return {
            type: 'blank',
            q: `<code>strcmp("${s1}", "${s2}")</code>이 0인가요? (<code>true</code> 또는 <code>false</code>)`,
            prefix: '', suffix: '', accept: [String(equal)], placeholder: 'true 또는 false',
            why: equal ? `두 문자열이 완전히 같아서 strcmp는 0을 돌려줘요.` : `두 문자열이 달라서 strcmp는 0이 아닌 값을 돌려줘요.`,
            hint: 'strcmp는 두 문자열의 내용이 완전히 같을 때만 0을 돌려줘요.'
          };
        },
        () => makeChoice(
          'C에서 문자열 내용이 같은지 확인할 때 <code>==</code> 대신 strcmp를 써야 하는 이유는?',
          '==는 문자열의 주소를 비교해서, 내용이 같아도 다른 결과가 나올 수 있어서',
          ['strcmp가 항상 더 빨라서', '==는 문자열에 아예 쓸 수 없어서', 'strcmp만 한글을 지원해서'],
          '문자열은 배열(포인터)이라서 ==는 주소를 비교해요. 내용을 비교하려면 strcmp를 써야 해요.',
          '문자열이 사실 char 배열(포인터)이라는 점을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>char name[20] = "지수";</code>에 <code>strcat</code>으로 <code>"님"</code>을 이어붙이고 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'strcat(name, "님");\nprintf("%s\\n", name);',
          accept: ['strcat(name, "님");printf("%s\\n", name);'],
          why: 'strcat(name, "님")은 name 뒤에 "님"을 이어붙여요.',
          hint: 'strcat(name, "님"); 다음 줄에 printf로 name을 출력하세요.'
        }),
      ],
      boss: () => {
        const s1 = pick(['apple', 'banana', 'cherry']);
        const s2 = pick(['apple', 'banana', 'cherry']);
        const label = s1 === s2 ? '같아요' : '달라요';
        return {
          type: 'blank',
          q: `<code>if (strcmp("${s1}", "${s2}") == 0) printf("같아요"); else printf("달라요");</code>를 실행하면 무엇이 출력될까요? (따옴표 없이)`,
          prefix: '', suffix: '', accept: [label], placeholder: '값',
          why: s1 === s2 ? `두 문자열이 같아서 "같아요"가 출력돼요.` : `두 문자열이 달라서 "달라요"가 출력돼요.`,
          hint: '두 문자열이 정말로 완전히 같은지 확인해보세요.'
        };
      }
    },
    {
      id: 'qsortC',
      title: 'qsort로 정렬하기',
      ready: true,
      summary: '표준 라이브러리의 qsort로 배열을 정렬하고, 비교 함수를 직접 작성하는 법을 배워요.',
      goals: ['qsort로 배열 정렬하기', '비교 함수 작성하기', 'void 포인터로 범용성 갖기'],
      blocks: [
        {
          h: '표준 라이브러리로 정렬하기: qsort',
          html: `<p><code>qsort(배열, 개수, 요소크기, 비교함수)</code>로 어떤 배열이든 정렬할 수 있어요. 비교 함수는 함수 포인터로 넘겨져요.</p>`,
          code: {
            label: 'qsort_basic.c',
            src: `int compare(const void *a, const void *b) {
    return *(int*)a - *(int*)b;
}

int nums[] = {5, 2, 8, 1};
qsort(nums, 4, sizeof(int), compare);`
          }
        },
        {
          h: '비교 함수가 하는 일',
          html: `<p>비교 함수가 <b>음수</b>를 반환하면 <code>a</code>가 앞, <b>양수</b>면 <code>b</code>가 앞, <b>0</b>이면 순서를 유지해요. 다른 언어의 <code>compareTo</code>와 같은 원리예요.</p>`
        },
        {
          h: 'void 포인터로 어떤 타입이든 다루기',
          html: `<p><code>qsort</code>는 어떤 자료형의 배열이든 정렬할 수 있도록 <code>void*</code>(어떤 타입이든 가리킬 수 있는 포인터)로 값을 받고, 비교 함수 안에서 실제 타입으로 <b>형변환</b>해서 써요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          const sign = a - b > 0 ? '양수' : a - b < 0 ? '음수' : '0';
          return {
            type: 'blank',
            q: `비교 함수가 <code>*(int*)a - *(int*)b</code>를 반환할 때, a가 가리키는 값이 ${a}, b가 가리키는 값이 ${b}면 반환값은 양수, 음수, 0 중 무엇일까요?`,
            prefix: '', suffix: '', accept: [sign], placeholder: '양수, 음수, 0 중 하나',
            why: `${a} - ${b} = ${a - b}로, ${sign}예요.`,
            hint: '두 값을 빼서 부호를 확인해보세요.'
          };
        },
        () => makeChoice(
          '비교 함수가 음수를 반환하면 무슨 뜻일까요?',
          'a가 b보다 앞에 온다(오름차순 기준)', ['a가 b보다 뒤에 온다', '두 값이 같다', '정렬이 실패한다'],
          '음수는 "a가 b보다 작다(앞에 온다)"는 뜻이에요.',
          '오름차순 정렬에서 작은 값이 앞에 온다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>int nums[] = {5, 2, 8, 1};</code>를 qsort로 정렬하는 코드를 완성하세요. (배열, 개수 4, 요소 크기, 비교함수 compare)`,
          prefix: 'qsort(nums, 4, ', suffix: ', compare);', accept: ['sizeof(int)'], placeholder: '표현식',
          why: '세 번째 인자는 배열 요소 하나의 크기(sizeof(int))예요.',
          hint: '정렬할 배열의 각 요소가 몇 바이트인지 알려주는 표현식이에요.'
        }),
        () => makeChoice(
          'qsort의 비교 함수 매개변수가 <code>void*</code> 타입인 이유는?',
          'int든 float든 구조체든, 어떤 자료형의 배열이든 정렬할 수 있게 범용적으로 만들기 위해',
          ['void*가 항상 더 빨라서', 'int 배열만 정렬할 수 있게 제한하려고', '메모리를 아예 안 쓰려고'],
          'void*는 "어떤 타입이든 가리킬 수 있는" 포인터라서, qsort가 어떤 자료형의 배열이든 정렬할 수 있게 해줘요.',
          '만약 int*로만 받았다면 다른 타입은 정렬 못 했을 거예요.'
        ),
        () => ({
          type: 'code',
          q: 'int 배열을 오름차순으로 정렬하는 비교 함수 <code>compare(const void *a, const void *b)</code>를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'int compare(const void *a, const void *b) {\n    return *(int*)a - *(int*)b;\n}',
          accept: ['int compare(const void *a, const void *b) {return *(int*)a - *(int*)b;}'],
          why: '(int*)로 형변환한 뒤 역참조해서 값을 빼면 오름차순 비교 함수가 돼요.',
          hint: 'return *(int*)a - *(int*)b;를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const nums = shuffle([5, 2, 8, 1, 9, 3]).slice(0, randInt(4, 6));
        const sorted = [...nums].sort((a, b) => a - b);
        return {
          type: 'blank',
          q: `<code>int nums[] = {${nums.join(', ')}};</code>를 <code>qsort(nums, ${nums.length}, sizeof(int), compare);</code>(오름차순 비교 함수)로 정렬하면, 정렬된 배열은? 대괄호 포함해서 쓰세요.`,
          prefix: '', suffix: '', accept: [`{${sorted.join(', ')}}`], placeholder: '{숫자, ...}',
          why: `오름차순으로 정렬하면 {${sorted.join(', ')}}이 돼요.`,
          hint: '가장 작은 값부터 순서대로 나열해보세요.'
        };
      }
    },
    {
      id: 'memoryBugs',
      title: '흔한 메모리 버그',
      ready: true,
      summary: 'C 프로그래밍에서 정말 자주 나오는 세 가지 메모리 버그, 메모리 누수·댕글링 포인터·버퍼 오버플로우를 배워요.',
      goals: ['메모리 누수(memory leak)', '댕글링 포인터(dangling pointer)', '버퍼 오버플로우(buffer overflow)'],
      blocks: [
        {
          h: '해제를 깜빡하면: 메모리 누수',
          html: `<p><code>malloc</code>으로 할당한 메모리를 <code>free</code>하지 않으면, 그 메모리는 계속 "사용 중"으로 남아있어요. 이런 <b>메모리 누수</b>가 쌓이면 프로그램이 오래 실행될수록 사용 가능한 메모리가 계속 줄어들어요.</p>`,
          code: {
            label: 'memory_leak.c',
            src: `int *p = malloc(sizeof(int));
*p = 10;
// free(p)를 깜빡하면 메모리 누수!`
          }
        },
        {
          h: '이미 해제된 곳을 가리키는: 댕글링 포인터',
          html: `<p><code>free(p)</code>로 메모리를 해제한 뒤, 그 포인터 <code>p</code>를 <b>다시 쓰면</b> 예측할 수 없는 동작(크래시 등)이 생길 수 있어요. 이런 포인터를 <b>댕글링 포인터</b>라고 불러요.</p>`,
          code: {
            label: 'dangling_pointer.c',
            src: `int *p = malloc(sizeof(int));
free(p);
*p = 10;  // 위험! 이미 해제된 메모리에 접근`
          },
          after: `<div class="note"><b>습관</b> — <code>free(p);</code> 바로 뒤에 <code>p = NULL;</code>을 해두면, 실수로 다시 써도 바로 알아챌 수 있어요.</div>`
        },
        {
          h: '정해진 크기를 넘어서 쓰면: 버퍼 오버플로우',
          html: `<p>배열의 크기를 넘어서는 값을 쓰면, 그 옆의 다른 메모리 영역을 덮어써버려요. 이걸 <b>버퍼 오버플로우</b>라고 부르고, 예측 불가능한 버그나 심각한 보안 취약점의 원인이 돼요.</p>`,
          code: {
            label: 'buffer_overflow.c',
            src: `char name[5];
strcpy(name, "지수님안녕하세요");  // 위험! name의 크기(5)를 넘어섬`
          }
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'malloc으로 할당한 메모리를 free하지 않고 계속 방치하는 문제를 무엇이라고 부를까요?',
          '메모리 누수(memory leak)', ['댕글링 포인터', '버퍼 오버플로우', '스택 오버플로우'],
          '해제하지 않고 방치된 메모리가 계속 쌓이는 문제를 메모리 누수라고 해요.',
          '"물이 새듯이" 메모리가 계속 새어나가 없어진다는 이미지를 떠올려보세요.'
        ),
        () => makeChoice(
          '<code>free(p);</code> 후에 <code>*p = 10;</code>을 실행하면 어떤 문제가 생길까요?',
          '이미 해제된 메모리에 접근하는 댕글링 포인터 문제가 생긴다', ['자동으로 새 메모리가 할당된다', '아무 문제 없이 안전하게 동작한다', '메모리 누수가 해결된다'],
          'free한 뒤에도 그 포인터를 다시 쓰면, 이미 해제된(다른 용도로 쓰일 수 있는) 메모리에 접근하는 위험한 상황이 돼요.',
          '"댕글링(매달린)"이라는 이름처럼, 더 이상 유효하지 않은 곳을 가리키고 있다는 뜻이에요.'
        ),
        () => makeChoice(
          '<code>char name[5];</code>에 5글자보다 훨씬 긴 문자열을 strcpy로 복사하면 생기는 문제는?',
          '버퍼 오버플로우 — 정해진 크기를 넘어 다른 메모리 영역을 덮어쓴다', ['자동으로 배열 크기가 늘어난다', '초과분은 조용히 버려진다', '컴파일 시점에 오류가 나서 실행이 안 된다'],
          '배열 크기를 넘어서는 값을 쓰면, 그 옆의 다른 메모리를 덮어써버리는 버퍼 오버플로우가 발생해요.',
          'C는 배열 크기를 자동으로 늘려주지 않는다는 점을 떠올려보세요.'
        ),
        () => makeChoice(
          '<code>free(p);</code> 바로 뒤에 <code>p = NULL;</code>을 해두면 좋은 이유는?',
          '실수로 다시 그 포인터를 쓰려고 하면 바로 알아챌 수 있어서(NULL 역참조는 명확히 오류가 남)',
          ['메모리가 자동으로 다시 할당돼서', 'free를 두 번 해야 해서', 'NULL을 넣으면 메모리 누수가 해결돼서'],
          'NULL로 만들어두면, 실수로 역참조했을 때 바로 명확한 오류가 나서 문제를 빨리 발견할 수 있어요.',
          '댕글링 포인터를 실수로 계속 쓰는 상황을 어떻게 예방할지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>int *p = malloc(sizeof(int));</code>로 할당한 메모리를 안전하게 해제하고, 댕글링 포인터를 막기 위해 p를 NULL로 만드는 코드를 작성하세요.',
          starter: '',
          placeholder: 'free(p);\np = NULL;',
          accept: ['free(p);p = NULL;'],
          why: 'free(p)로 해제한 뒤 p = NULL;로 만들면 댕글링 포인터 문제를 예방할 수 있어요.',
          hint: 'free(p); 다음 줄에 p = NULL;을 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '반복문 안에서 매번 <code>malloc</code>으로 메모리를 할당하는데, <code>free</code>를 한 번도 안 부르고 있어요. 이 프로그램을 오래 실행하면 어떤 문제가 생길까요?',
        '메모리 누수가 계속 쌓여서 결국 메모리 부족으로 문제가 생길 수 있다', ['프로그램이 오히려 빨라진다', '자동으로 메모리가 정리된다', '아무 문제도 안 생긴다'],
        'free 없이 반복적으로 malloc만 하면, 해제되지 않은 메모리가 계속 쌓여서 결국 메모리가 부족해질 수 있어요.',
        '할당한 만큼 해제하지 않으면 어떻게 될지 생각해보세요.'
      )
    },
    {
      id: 'pthreadBasics',
      title: 'pthread로 멀티스레딩 기초',
      ready: true,
      summary: 'pthread로 새로운 스레드를 만들어 여러 작업을 동시에 실행하는 기본을 배워요.',
      goals: ['pthread_create로 새 스레드 만들기', 'pthread_join으로 기다리기', '언제 멀티스레딩이 필요한지'],
      blocks: [
        {
          h: '새 스레드 만들기: pthread_create',
          html: `<p><code>pthread_create(&스레드, NULL, 실행할함수, 인자)</code>로 새로운 스레드를 만들어서, 그 함수를 별도의 실행 흐름에서 실행시켜요.</p>`,
          code: {
            label: 'pthread_basic.c',
            src: `void *print_hello(void *arg) {
    printf("안녕!\\n");
    return NULL;
}

pthread_t thread;
pthread_create(&thread, NULL, print_hello, NULL);`
          }
        },
        {
          h: '스레드가 끝나길 기다리기: pthread_join',
          html: `<p><code>pthread_join(스레드, NULL)</code>은 그 스레드가 끝날 때까지 기다려요. 이걸 안 하면, 메인 함수가 먼저 끝나버려서 스레드 작업이 <b>채 끝나기도 전에</b> 프로그램이 종료될 수 있어요.</p>`,
          code: {
            label: 'pthread_join.c',
            src: `pthread_join(thread, NULL);`
          }
        },
        {
          h: '언제 멀티스레딩이 필요할까요',
          html: `<p>여러 작업을 진짜로 <b>동시에(병렬로)</b> 처리하고 싶을 때 써요. 예를 들어 여러 파일을 동시에 처리하거나, 여러 계산을 동시에 진행할 때 유용해요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `새 스레드를 만드는 함수 이름을 쓰세요.`,
          prefix: '', suffix: '(&thread, NULL, print_hello, NULL);', accept: ['pthread_create'], placeholder: '함수 이름',
          why: '<code>pthread_create(...)</code>로 새 스레드를 만들어요.',
          hint: '"스레드를 만든다(create)"는 뜻이 합쳐진 이름이에요.'
        }),
        () => ({
          type: 'blank',
          q: `스레드가 끝날 때까지 기다리는 함수 이름을 쓰세요.`,
          prefix: '', suffix: '(thread, NULL);', accept: ['pthread_join'], placeholder: '함수 이름',
          why: '<code>pthread_join(...)</code>은 그 스레드가 끝날 때까지 기다려요.',
          hint: '"합류하다, 함께하다"라는 뜻이지만, 여기선 "끝날 때까지 기다린다"는 의미로 써요.'
        }),
        () => makeChoice(
          '<code>pthread_create</code> 후 <code>pthread_join</code>을 안 부르면 생길 수 있는 문제는?',
          '메인 함수가 먼저 끝나버려서 스레드 작업이 완료되기 전에 프로그램이 종료될 수 있다',
          ['스레드가 무한히 실행된다', '컴파일 오류가 난다', '스레드가 자동으로 2개 더 생긴다'],
          'join으로 기다리지 않으면, 메인 함수가 스레드 작업이 끝나길 기다리지 않고 먼저 끝나버릴 수 있어요.',
          '메인 함수와 새 스레드가 "동시에" 실행된다는 점을 떠올려보세요.'
        ),
        () => makeChoice(
          '멀티스레딩이 필요한 상황으로 알맞은 것은?',
          '여러 작업을 진짜로 동시에(병렬로) 처리하고 싶을 때', ['코드 줄 수를 줄이고 싶을 때', '변수 이름을 통일하고 싶을 때', '항상 모든 프로그램에 필요하다'],
          '여러 작업을 동시에 처리하고 싶은 상황에 멀티스레딩이 유용해요.',
          '한 번에 하나씩 순서대로 처리하는 것과 "동시에" 처리하는 것의 차이를 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>print_hello</code> 함수를 실행하는 <code>pthread_t thread</code>를 만들고(pthread_create), 그 스레드가 끝날 때까지 기다리는(pthread_join) 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'pthread_t thread;\npthread_create(&thread, NULL, print_hello, NULL);\npthread_join(thread, NULL);',
          accept: ['pthread_t thread;pthread_create(&thread, NULL, print_hello, NULL);pthread_join(thread, NULL);'],
          why: 'pthread_create로 스레드를 만들고 pthread_join으로 끝날 때까지 기다려요.',
          hint: 'pthread_t thread; 선언 후 pthread_create, pthread_join을 순서대로 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '메인 함수에서 pthread_create로 스레드 3개를 만들고, 그 결과가 모두 필요한 계산을 이어가려고 해요. 무엇을 꼭 해야 할까요?',
        '만든 스레드 3개 모두에 대해 pthread_join을 부른다', ['pthread_create만 3번 부르고 끝낸다', 'sleep으로 충분히 기다리기만 하면 된다', '아무것도 안 해도 자동으로 기다려진다'],
        '결과가 반드시 준비돼 있어야 하니, 만든 스레드 각각에 pthread_join을 불러 확실히 기다려야 해요.',
        'sleep은 정확한 보장이 안 되고, join이 확실한 방법이라는 걸 떠올려보세요.'
      )
    },
    {
      id: 'fileIOC',
      title: '파일 입출력',
      ready: true,
      summary: 'C에서 파일을 열고, 쓰고, 읽고, 닫는 fopen/fprintf/fscanf/fclose를 배워요.',
      goals: ['fopen으로 파일 열기', 'fprintf/fscanf로 읽고 쓰기', 'fclose로 닫기'],
      blocks: [
        {
          h: '파일 열기: fopen',
          html: `<p><code>fopen(파일이름, 모드)</code>로 파일을 열어요. <code>"w"</code>는 쓰기, <code>"r"</code>은 읽기 모드예요. 파일을 못 열면 <code>NULL</code>을 돌려주니 <b>항상 확인</b>해야 해요.</p>`,
          code: {
            label: 'fopen_basic.c',
            src: `FILE *fp = fopen("data.txt", "w");
if (fp == NULL) {
    printf("파일을 열 수 없어요\\n");
}`
          }
        },
        {
          h: '파일에 쓰기: fprintf',
          html: `<p><code>fprintf(파일, 형식, ...)</code>은 <code>printf</code>와 똑같은 형식을 쓰지만, 화면 대신 파일에 써요.</p>`,
          code: {
            label: 'fprintf_basic.c',
            src: `fprintf(fp, "%s\\n", "안녕하세요");
fclose(fp);`
          }
        },
        {
          h: '파일에서 읽기: fscanf',
          html: `<p><code>fscanf(파일, 형식, ...)</code>은 <code>scanf</code>처럼 파일에서 값을 읽어와요.</p>`,
          code: {
            label: 'fscanf_basic.c',
            src: `FILE *fp = fopen("data.txt", "r");
char line[100];
fscanf(fp, "%s", line);
printf("%s\\n", line);
fclose(fp);`
          }
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>"data.txt"</code> 파일을 쓰기 모드로 여는 코드를 완성하세요.`,
          prefix: 'FILE *fp = fopen("data.txt", ', suffix: ');', accept: ['"w"'], placeholder: '모드',
          why: '<code>"w"</code>(write)는 쓰기 모드로 파일을 열어요.',
          hint: '"쓰다(write)"의 첫 글자예요.'
        }),
        () => makeChoice(
          'fopen이 파일을 여는 데 실패하면 무엇을 반환할까요?',
          '<code>NULL</code>', ['<code>0</code>이 아닌 임의의 수', '오류 없이 빈 파일을 새로 만든다', '프로그램이 즉시 종료된다'],
          'fopen은 실패하면 NULL을 반환해요. 그래서 항상 NULL인지 확인해야 안전해요.',
          '포인터가 "아무것도 가리키지 않는다"는 걸 나타내는 그 값이에요.'
        ),
        () => ({
          type: 'blank',
          q: `파일에 형식화된 내용을 쓰는 함수 이름을 쓰세요.`,
          prefix: '', suffix: '(fp, "%s\\n", "안녕하세요");', accept: ['fprintf'], placeholder: '함수 이름',
          why: '<code>fprintf(파일, 형식, ...)</code>는 파일에 printf처럼 써요.',
          hint: '"파일(file) + printf"가 합쳐진 이름이에요.'
        }),
        () => makeChoice(
          '파일 작업을 마친 뒤 꼭 불러야 하는 함수는?',
          '<code>fclose(fp)</code>', ['<code>fopen(fp)</code>를 한 번 더', '<code>fprintf</code>를 한 번 더', '아무것도 안 불러도 된다'],
          '<code>fclose(fp)</code>로 파일을 꼭 닫아줘야 자원이 제대로 정리돼요.',
          '"파일을 닫는다"는 뜻의 함수예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"log.txt"</code>를 쓰기 모드로 열어서 <code>"기록 완료"</code>를 쓰고 닫는 코드를 작성하세요. (NULL 체크는 생략)',
          starter: '',
          rows: 3,
          placeholder: 'FILE *fp = fopen("log.txt", "w");\nfprintf(fp, "기록 완료");\nfclose(fp);',
          accept: ['FILE *fp = fopen("log.txt", "w");fprintf(fp, "기록 완료");fclose(fp);'],
          why: 'fopen으로 열고, fprintf로 쓰고, fclose로 닫는 순서예요.',
          hint: 'fopen("log.txt", "w") 후 fprintf, fclose를 순서대로 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        'fopen으로 연 파일을 fclose 없이 프로그램을 계속 실행하면 어떤 문제가 생길 수 있을까요?',
        '파일에 쓴 내용이 완전히 저장되지 않거나, 시스템 자원이 계속 낭비될 수 있다',
        ['항상 아무 문제가 없다', '파일이 자동으로 삭제된다', '프로그램이 더 빨라진다'],
        'fclose를 안 하면 버퍼에 남은 내용이 파일에 완전히 반영되지 않거나, 파일 핸들 자원이 계속 사용 중으로 남을 수 있어요.',
        'try-with-resources 같은 다른 언어의 자원 정리 개념과 비슷하다는 걸 떠올려보세요.'
      )
    },
    {
      id: 'headerFiles',
      title: '헤더 파일 분리',
      ready: true,
      summary: '선언과 구현을 .h/.c 파일로 나누고, 헤더 가드로 중복 포함 문제를 막는 법을 배워요.',
      goals: ['.h와 .c로 나누기', '헤더 가드로 중복 포함 막기', '#include의 두 가지 형태'],
      blocks: [
        {
          h: '선언과 구현을 나누기: .h와 .c',
          html: `<p>헤더 파일(<code>.h</code>)에는 "무엇을 할 수 있는지"(선언)만, 소스 파일(<code>.c</code>)에는 "어떻게 하는지"(구현)를 나눠서 써요.</p>`,
          code: {
            label: 'math_utils.h',
            src: `int add(int a, int b);`
          }
        },
        {
          h: '헤더에 선언한 걸 실제로 구현하기',
          html: `<p>소스 파일에서 그 헤더를 <code>#include</code>하고, 실제 동작을 구현해요.</p>`,
          code: {
            label: 'math_utils.c',
            src: `#include "math_utils.h"

int add(int a, int b) {
    return a + b;
}`
          }
        },
        {
          h: '중복 포함 막기: 헤더 가드',
          html: `<p>같은 헤더가 여러 곳에서 중복으로 <code>#include</code>되면 오류가 날 수 있어요. <code>#ifndef</code>/<code>#define</code>/<code>#endif</code>로 된 <b>헤더 가드</b>는 이미 한 번 포함됐으면 다시 포함되지 않게 막아줘요.</p>`,
          code: {
            label: 'header_guard.h',
            src: `#ifndef MATH_UTILS_H
#define MATH_UTILS_H

int add(int a, int b);

#endif`
          },
          after: `<div class="note"><b>참고</b> — <code>#include &lt;stdio.h&gt;</code>처럼 꺾쇠(&lt;&gt;)는 표준 라이브러리, <code>#include "math_utils.h"</code>처럼 큰따옴표는 내가 만든 파일을 가리켜요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `함수의 "무엇을 할 수 있는지"(선언)만 적어두는 파일의 확장자를 쓰세요. (점 포함)`,
          prefix: 'math_utils', suffix: '', accept: ['.h'], placeholder: '확장자',
          why: '<code>.h</code>(헤더) 파일에는 선언만 적어요.',
          hint: '"헤더(header)"의 첫 글자예요.'
        }),
        () => ({
          type: 'blank',
          q: `헤더 가드를 만들 때 맨 처음 쓰는 전처리기 지시문을 쓰세요.`,
          prefix: '', suffix: ' MATH_UTILS_H\n#define MATH_UTILS_H\n...\n#endif', accept: ['#ifndef'], placeholder: '지시문',
          why: '<code>#ifndef 이름</code>은 "이 이름이 아직 정의 안 됐으면"이라는 뜻이에요.',
          hint: '"만약 정의되지 않았다면(if not defined)"이라는 뜻이 줄어든 지시문이에요.'
        }),
        () => makeChoice(
          '헤더 가드(#ifndef/#define/#endif)를 쓰는 이유는?',
          '같은 헤더가 여러 번 포함돼도 중복 정의 오류가 나지 않게 하려고',
          ['컴파일 속도를 항상 2배로 만들려고', '헤더 파일을 암호화하려고', '헤더 파일 없이도 실행되게 하려고'],
          '헤더 가드는 이미 한 번 포함된 헤더가 다시 중복으로 포함되는 걸 막아서 오류를 예방해요.',
          '같은 선언이 두 번 나타나면 컴파일러가 어떻게 반응할지 생각해보세요.'
        ),
        () => makeChoice(
          '<code>#include &lt;stdio.h&gt;</code>와 <code>#include "myheader.h"</code>의 차이는?',
          '꺾쇠(&lt;&gt;)는 표준 라이브러리를, 큰따옴표는 내가 만든 파일을 찾는다', ['꺾쇠는 오류가 나고 큰따옴표만 써야 한다', '차이가 전혀 없다', '큰따옴표는 헤더가 아닌 파일에만 쓴다'],
          '표준 라이브러리는 꺾쇠, 직접 만든 헤더는 보통 큰따옴표로 include해요.',
          'stdio.h는 내가 만든 파일이 아니라 표준 라이브러리라는 점을 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>MYUTILS_H</code>라는 이름으로 헤더 가드를 만들고, 그 안에 <code>int square(int n);</code> 선언을 넣으세요.',
          starter: '',
          rows: 5,
          placeholder: '#ifndef MYUTILS_H\n#define MYUTILS_H\n\nint square(int n);\n\n#endif',
          accept: ['#ifndef MYUTILS_H\n#define MYUTILS_H\nint square(int n);\n#endif'],
          why: '#ifndef 이름, #define 이름, 그 사이에 선언, 마지막에 #endif 순서로 써요.',
          hint: '#ifndef MYUTILS_H → #define MYUTILS_H → int square(int n); → #endif 순서로 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        'A.c와 B.c가 둘 다 같은 <code>utils.h</code>를 include하는데, 그 헤더에 헤더 가드가 없어요. 이 프로젝트를 빌드하면 어떤 문제가 생길 수 있을까요?',
        '헤더 내용이 중복으로 포함되면서 중복 정의 오류가 날 수 있다', ['항상 아무 문제 없이 빌드된다', 'A.c만 컴파일되고 B.c는 무시된다', '자동으로 헤더 가드가 추가된다'],
        '헤더 가드가 없으면, 복잡한 include 관계에서 같은 헤더가 한 번의 컴파일 단위에 두 번 이상 포함되어 중복 정의 오류가 날 수 있어요.',
        '헤더 가드가 정확히 무엇을 막아주는지 다시 떠올려보세요.'
      )
    },
    {
      id: 'makefileC',
      title: 'Makefile로 빌드 자동화',
      ready: true,
      summary: '컴파일 명령을 매번 직접 치지 않고, Makefile로 빌드 과정을 자동화하는 법을 배워요.',
      goals: ['Makefile이 뭔지', '타겟과 명령', 'make 명령으로 실행하기'],
      blocks: [
        {
          h: '빌드 과정을 자동화하기: Makefile',
          html: `<p><code>타겟: 의존파일</code> 형태로 쓰고, 그 아래 <b>탭으로 들여쓴</b> 줄에 실제로 실행할 명령을 적어요.</p>`,
          code: {
            label: 'Makefile',
            src: `program: main.c
\tgcc main.c -o program`
          }
        },
        {
          h: '실행하기: make',
          html: `<p>터미널에서 <code>make</code>라고 치면, Makefile을 읽어서 첫 번째 타겟(<code>program</code>)을 만들기 위한 명령을 실행해요. 소스 파일이 안 바뀌었으면 <b>다시 컴파일하지 않고 건너뛰어서</b> 효율적이에요.</p>`,
          code: {
            label: 'terminal',
            lang: 'bash',
            src: `make`
          }
        },
        {
          h: '여러 타겟 만들기',
          html: `<p>빌드 결과물을 지우는 <code>clean</code> 같은 타겟도 따로 만들 수 있어요. <code>make clean</code>으로 그 타겟만 실행할 수 있어요.</p>`,
          code: {
            label: 'Makefile_clean.mk',
            src: `clean:
\trm -f program`
          }
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `Makefile을 읽어서 빌드를 실행하는 터미널 명령을 쓰세요.`,
          prefix: '', suffix: '', accept: ['make'], placeholder: '명령어',
          why: '<code>make</code>라고 치면 Makefile을 읽어서 빌드를 실행해요.',
          hint: '도구 이름 그대로가 명령어예요.'
        }),
        () => makeChoice(
          'Makefile에서 실행할 명령을 쓰는 줄은 어떻게 들여써야 할까요?',
          '탭(Tab)으로', ['스페이스 4칸으로', '들여쓰기가 필요 없다', '스페이스 2칸으로'],
          'Makefile은 명령 줄을 반드시 탭으로 들여써야 해요. 스페이스로 들여쓰면 오류가 나요.',
          'Makefile의 오래된, 하지만 꼭 지켜야 하는 규칙이에요.'
        ),
        () => makeChoice(
          'make가 소스 파일이 안 바뀌었을 때 다시 컴파일하지 않는 이유는?',
          '이미 만들어진 결과물이 최신 상태라고 판단해서 불필요한 작업을 건너뛰어서',
          ['make는 원래 한 번만 실행되도록 설계돼서', '컴파일러가 고장 나서', '소스 파일이 자동으로 삭제돼서'],
          'make는 파일의 수정 시간을 비교해서, 안 바뀐 부분은 다시 빌드하지 않아 시간을 절약해요.',
          '"바뀐 것만 다시 만든다"는 효율성이 make의 핵심 장점이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>program</code>이라는 타겟을 지우는 <code>clean</code> 타겟을 만들 때, 타겟 이름과 의존 파일을 구분하는 문장 부호를 쓰세요. (예: <code>clean${'{이것}'}</code>)`,
          prefix: 'clean', suffix: '', accept: [':'], placeholder: '문장 부호',
          why: '<code>타겟: 의존파일</code>처럼 콜론(:)으로 구분해요.',
          hint: '"~에 대해"라는 뜻으로 자주 쓰이는 그 문장 부호예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>main.c</code>를 컴파일해서 <code>app</code>이라는 실행 파일을 만드는 Makefile 규칙을 작성하세요. (명령 줄은 탭으로 표시된 것으로 간주)',
          starter: '',
          rows: 2,
          placeholder: 'app: main.c\n\tgcc main.c -o app',
          accept: ['app: main.c\n\tgcc main.c -o app', 'app: main.c\tgcc main.c -o app'],
          why: '타겟(app): 의존파일(main.c) 다음 줄에 탭으로 들여써서 실행할 명령을 써요.',
          hint: 'app: main.c 다음 줄에 gcc main.c -o app을 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '큰 프로젝트에서 소스 파일 100개 중 1개만 수정했는데, 매번 100개를 전부 다시 컴파일하고 있어요. Makefile을 제대로 활용하면 어떻게 개선될까요?',
        '수정된 파일과 그에 의존하는 부분만 다시 컴파일하고, 나머지는 건너뛴다',
        ['Makefile은 이런 상황에 도움이 안 된다', '100개를 항상 동시에 컴파일해서 더 빨라진다', '컴파일러 자체를 바꿔야 한다'],
        'make는 파일의 수정 시간을 확인해서, 바뀐 파일과 그에 의존하는 부분만 다시 빌드해요.',
        'make의 핵심 장점이 "필요한 부분만 다시 빌드"한다는 걸 떠올려보세요.'
      )
    },
    {
      id: 'commandLineArgs',
      title: '명령줄 인자',
      ready: true,
      summary: '프로그램을 실행할 때 함께 넘기는 값들을 argc와 argv로 받는 법을 배워요.',
      goals: ['main(argc, argv)로 인자 받기', 'argc는 개수, argv는 값들', '터미널에서 값 넘기기'],
      blocks: [
        {
          h: '프로그램 실행할 때 값 받기: argc와 argv',
          html: `<p><code>int main(int argc, char *argv[])</code>로 선언하면, 터미널에서 넘긴 값들을 받을 수 있어요. <code>argc</code>는 인자의 <b>개수</b>(프로그램 이름 포함), <code>argv</code>는 그 값들이 담긴 배열이에요.</p>`,
          code: {
            label: 'args_basic.c',
            src: `int main(int argc, char *argv[]) {
    printf("%d\\n", argc);
    printf("%s\\n", argv[0]);
    return 0;
}`
          }
        },
        {
          h: '터미널에서 실행하기',
          html: `<p><code>argv[0]</code>은 항상 <b>프로그램 이름 자체</b>이고, <code>argv[1]</code>부터가 실제로 넘긴 값들이에요.</p>`,
          code: {
            label: 'terminal',
            lang: 'bash',
            src: `./program 지수 17`
          },
          after: `<div class="note"><b>이 경우</b> — <code>argc</code>는 3(프로그램 이름 포함), <code>argv[1]</code>은 "지수", <code>argv[2]</code>는 "17"(문자열이라는 점에 주의!)이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(1, 4);
          return {
            type: 'blank',
            q: `<code>./program</code> 뒤에 값을 ${n}개 넘겨서 실행했을 때(<code>./program a b ...</code>처럼), <code>argc</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n + 1)], placeholder: '숫자',
            why: `argc는 프로그램 이름까지 포함해서 세니까, 넘긴 값 ${n}개 + 프로그램 이름 1개 = ${n + 1}이에요.`,
            hint: 'argc는 프로그램 이름도 하나로 세어서 넘긴 값 개수보다 1 많아요.'
          };
        },
        () => makeChoice(
          '<code>argv[0]</code>은 항상 무엇을 가리킬까요?',
          '실행 중인 프로그램 자신의 이름', ['첫 번째로 넘긴 값', '항상 빈 문자열', '가장 마지막 인자'],
          'argv[0]은 항상 프로그램 이름 자체이고, 진짜 넘긴 값은 argv[1]부터예요.',
          '"프로그램 자신"이 항상 0번째라는 규칙을 기억하세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>./program 지수 17</code>로 실행했을 때, <code>argv[1]</code>의 값은? (따옴표 없이)`,
          prefix: '', suffix: '', accept: ['지수'], placeholder: '값',
          why: 'argv[0]은 프로그램 이름, argv[1]부터가 실제 넘긴 값이라서 "지수"예요.',
          hint: 'argv[0]이 프로그램 이름이라는 걸 감안하면, argv[1]은 첫 번째로 넘긴 값이에요.'
        }),
        () => makeChoice(
          '<code>./program 지수 17</code>에서 <code>argv[2]</code>의 자료형은?',
          '문자열(char*) — 실제로는 "17"', ['정수(int) — 17', '실수(float) — 17.0', '오류가 난다'],
          '명령줄 인자는 전부 문자열로 들어와요. 숫자로 쓰려면 atoi 같은 함수로 직접 변환해야 해요.',
          '터미널에서 넘긴 값은 원래 전부 "글자"라는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>argc</code>와 <code>argv</code>를 받아서, 첫 번째로 넘긴 인자(<code>argv[1]</code>)를 출력하는 <code>main</code> 함수를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'int main(int argc, char *argv[]) {\n    printf("%s\\n", argv[1]);\n    return 0;\n}',
          accept: ['int main(int argc, char *argv[]) {printf("%s\\n", argv[1]);return 0;}'],
          why: 'argv[1]은 프로그램 이름 다음으로 넘긴 첫 번째 값이에요.',
          hint: 'int main(int argc, char *argv[]) { printf("%s\\n", argv[1]); return 0; }를 쓰세요.'
        }),
      ],
      boss: () => {
        const args = ['지수', '17', '서울'].slice(0, randInt(1, 3));
        return {
          type: 'blank',
          q: `<code>./program ${args.join(' ')}</code>로 실행했을 때, <code>argc</code>와 <code>argv[argc - 1]</code>을 "개수, 마지막값" 형태로 쓰세요.`,
          prefix: '', suffix: '', accept: [`${args.length + 1}, ${args[args.length - 1]}`], placeholder: '숫자, 값',
          why: `argc는 프로그램 이름까지 ${args.length + 1}개이고, 마지막 인자는 "${args[args.length - 1]}"이에요.`,
          hint: 'argc는 넘긴 값 개수 + 1(프로그램 이름), 마지막 인자는 argv[argc-1]이에요.'
        };
      }
    },
    {
      id: 'structArraySort',
      title: '구조체 배열 정렬',
      ready: true,
      summary: '여러 구조체를 배열로 담고, qsort로 원하는 멤버 기준으로 정렬하는 법을 배워요.',
      goals: ['구조체 배열 만들기', 'qsort로 구조체 정렬하기', '비교 함수에서 멤버 비교하기'],
      blocks: [
        {
          h: '구조체를 여러 개 담기: 구조체 배열',
          html: `<p>구조체도 배열로 여러 개 담을 수 있어요.</p>`,
          code: {
            label: 'student_array.c',
            src: `typedef struct {
    char name[20];
    int score;
} Student;

Student students[3] = {
    {"지수", 90},
    {"민준", 85},
    {"서연", 95}
};`
          }
        },
        {
          h: '점수 기준으로 정렬하기',
          html: `<p>비교 함수 안에서 <code>void*</code>를 구조체 포인터로 <b>형변환</b>한 뒤, 원하는 멤버(<code>score</code>)로 비교해요.</p>`,
          code: {
            label: 'compare_by_score.c',
            src: `int compareByScore(const void *a, const void *b) {
    Student *s1 = (Student*)a;
    Student *s2 = (Student*)b;
    return s1->score - s2->score;
}

qsort(students, 3, sizeof(Student), compareByScore);`
          }
        }
      ],
      quizGenerators: [
        () => {
          const s1 = randInt(60, 100), s2 = randInt(60, 100);
          const sign = s1 - s2 > 0 ? '양수' : s1 - s2 < 0 ? '음수' : '0';
          return {
            type: 'blank',
            q: `<code>compareByScore</code>가 <code>s1-&gt;score - s2-&gt;score</code>를 반환할 때, s1의 score가 ${s1}, s2의 score가 ${s2}면 결과는 양수, 음수, 0 중 무엇일까요?`,
            prefix: '', suffix: '', accept: [sign], placeholder: '양수, 음수, 0 중 하나',
            why: `${s1} - ${s2} = ${s1 - s2}로, ${sign}예요.`,
            hint: '두 점수를 빼서 부호를 확인해보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `<code>const void *a</code>를 <code>Student</code> 포인터로 형변환하는 코드를 완성하세요.`,
          prefix: 'Student *s1 = ', suffix: 'a;', accept: ['(Student*)'], placeholder: '형변환',
          why: 'void*를 실제로 쓰려면 <code>(Student*)</code>로 형변환해야 해요.',
          hint: '괄호 안에 원하는 타입과 별표(*)를 함께 쓰세요.'
        }),
        () => ({
          type: 'blank',
          q: `<code>qsort(students, 3, ${'{이것}'}, compareByScore);</code>에서 세 번째 인자로 들어갈, Student 구조체 하나의 크기를 구하는 표현식을 쓰세요.`,
          prefix: '', suffix: '', accept: ['sizeof(Student)'], placeholder: '표현식',
          why: '<code>sizeof(Student)</code>는 Student 구조체 하나가 차지하는 바이트 크기예요.',
          hint: 'sizeof 뒤에 구조체 이름을 괄호로 감싸서 쓰세요.'
        }),
        () => makeChoice(
          '구조체 배열을 qsort로 정렬할 때, 비교 함수 안에서 형변환이 필요한 이유는?',
          'qsort가 void* 타입으로 값을 넘겨줘서, 실제 구조체로 다루려면 형변환해야 하기 때문',
          ['형변환 없이는 qsort를 아예 쓸 수 없어서', '형변환을 하면 실행 속도가 빨라져서', 'Student 구조체가 원래 void* 타입이라서'],
          'qsort는 어떤 타입이든 다룰 수 있도록 void*로 값을 넘겨서, 실제 멤버에 접근하려면 원래 타입으로 형변환해야 해요.',
          'qsort의 범용성(void*)과 실제 사용(구조체 멤버 접근) 사이의 연결고리를 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Student</code>(멤버 <code>score</code>) 구조체 배열을 score 기준 오름차순으로 정렬하는 비교 함수 <code>compareByScore</code>를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'int compareByScore(const void *a, const void *b) {\n    Student *s1 = (Student*)a;\n    Student *s2 = (Student*)b;\n    return s1->score - s2->score;\n}',
          accept: ['int compareByScore(const void *a, const void *b) {Student *s1 = (Student*)a;Student *s2 = (Student*)b;return s1->score - s2->score;}'],
          why: 'a, b를 Student*로 형변환한 뒤 score 멤버를 빼서 비교해요.',
          hint: '(Student*)로 형변환한 뒤 s1->score - s2->score를 반환하세요.'
        }),
      ],
      boss: () => {
        const students = shuffle([['지수', 90], ['민준', 85], ['서연', 95], ['도윤', 78]]).slice(0, randInt(3, 4));
        const sorted = [...students].sort((a, b) => a[1] - b[1]);
        return {
          type: 'blank',
          q: `<code>Student students[] = {${students.map(([n, s]) => `{"${n}", ${s}}`).join(', ')}};</code>를 <code>compareByScore</code>(score 오름차순)로 qsort하면, 정렬 후 첫 번째 학생의 이름은? (따옴표 없이)`,
          prefix: '', suffix: '', accept: [sorted[0][0]], placeholder: '값',
          why: `score가 가장 낮은 학생이 맨 앞에 오는데, 그 학생은 "${sorted[0][0]}"(${sorted[0][1]}점)예요.`,
          hint: '오름차순 정렬이니 점수가 가장 낮은 학생이 맨 앞에 온다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'stackVsHeap',
      title: '스택 vs 힙',
      ready: true,
      summary: '함수 호출과 함께 자동으로 관리되는 스택 메모리와, 내가 직접 관리하는 힙 메모리의 차이를 배워요.',
      goals: ['스택: 자동으로 관리되는 메모리', '힙: malloc으로 직접 관리하는 메모리', '지역변수 주소를 반환하면 안 되는 이유'],
      blocks: [
        {
          h: '함수 호출과 함께 자동으로 관리되는: 스택',
          html: `<p>지역변수는 <b>스택</b>이라는 메모리 영역에 저장돼요. 스택은 함수가 호출되면 자동으로 공간이 마련되고, 함수가 끝나면 <b>자동으로 사라져요</b>.</p>`,
          code: {
            label: 'stack_var.c',
            src: `void func() {
    int x = 10;  // 스택에 저장, func()이 끝나면 사라짐
}`
          }
        },
        {
          h: '내가 직접 관리하는: 힙',
          html: `<p><code>malloc</code>으로 할당한 메모리는 <b>힙</b>이라는 영역에 저장돼요. 힙의 메모리는 함수가 끝나도 <b>사라지지 않고</b>, <code>free</code>를 부를 때까지 계속 남아있어요.</p>`,
          code: {
            label: 'heap_var.c',
            src: `int *p = malloc(sizeof(int));
*p = 10;
// 함수가 끝나도 p가 가리키는 메모리는 살아있음(free 전까지)`
          }
        },
        {
          h: '흔한 실수: 지역변수의 주소를 반환하기',
          html: `<p>함수 안에서 만든 지역변수의 주소를 <code>return</code>하면 <b>위험해요</b>. 그 함수가 끝나는 순간 스택 공간이 무효화돼서, 반환된 주소는 이미 의미 없는 곳을 가리키게 돼요. 함수 밖에서도 살아있어야 할 값은 <code>malloc</code>(힙)으로 만들어야 해요.</p>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '함수 안의 지역변수는 보통 어디에 저장될까요?',
          '스택', ['힙', '레지스터에만 저장되고 메모리는 안 씀', '디스크'],
          '지역변수는 스택에 저장되고, 함수가 끝나면 자동으로 정리돼요.',
          '함수 호출과 함께 자동으로 관리되는 영역이에요.'
        ),
        () => makeChoice(
          'malloc으로 할당한 메모리는 어디에 저장될까요?',
          '힙', ['스택', '레지스터', 'CPU 캐시'],
          'malloc으로 할당한 메모리는 힙에 저장되고, free할 때까지 계속 남아있어요.',
          '자동으로 정리되지 않고 내가 직접 관리해야 하는 영역이에요.'
        ),
        () => makeChoice(
          '함수 안에서 <code>int x = 10;</code>을 선언하고, <code>return &x;</code>로 그 주소를 반환하면 어떤 문제가 생길까요?',
          '함수가 끝나는 순간 그 스택 공간이 무효화돼서, 반환된 주소는 의미 없는 곳을 가리키게 된다',
          ['x의 값이 자동으로 힙에 복사돼서 안전하다', '아무 문제 없이 항상 안전하다', '컴파일 시점에 자동으로 오류가 잡혀서 실행이 안 된다'],
          '지역변수는 함수가 끝나면 스택에서 사라지므로, 그 주소를 반환하면 이미 무효한 메모리를 가리키게 돼요.',
          '스택은 함수가 끝나면 자동으로 정리된다는 점을 떠올려보세요.'
        ),
        () => makeChoice(
          '함수가 끝난 뒤에도 계속 살아있어야 할 데이터를 만들려면 어떻게 해야 할까요?',
          'malloc으로 힙에 할당한다', ['그냥 지역변수로 선언한다', 'static을 안 붙이고 선언한다', '아무렇게나 선언해도 상관없다'],
          '힙에 할당한 메모리는 함수가 끝나도 사라지지 않아서, 함수 밖에서도 계속 쓸 수 있어요.',
          '스택은 함수와 함께 사라지지만, 힙은 free할 때까지 남아있다는 차이를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '함수가 끝나도 값이 유지되도록, <code>int</code> 하나를 담을 힙 메모리를 <code>malloc</code>으로 할당하고 <code>10</code>을 저장하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'int *p = malloc(sizeof(int));\n*p = 10;',
          accept: ['int *p = malloc(sizeof(int));*p = 10;'],
          why: 'malloc(sizeof(int))으로 힙에 int 하나 크기의 공간을 할당하고, *p = 10으로 값을 저장해요.',
          hint: 'int *p = malloc(sizeof(int)); 다음 줄에 *p = 10;을 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '함수 안에서 배열을 만들어서, 그 배열을 함수 밖에서도 계속 쓸 수 있게 반환하고 싶어요. 어떻게 해야 안전할까요?',
        'malloc으로 힙에 배열을 할당하고 그 포인터를 반환한다', ['지역 배열을 만들어서 그 배열 이름을 그대로 반환한다', '배열을 static 없이 지역변수로 선언하면 충분하다', '아무렇게나 해도 항상 안전하다'],
        '지역 배열은 함수가 끝나면 사라지므로, 함수 밖에서 계속 써야 한다면 malloc으로 힙에 할당해야 안전해요.',
        '스택에 있는 지역변수를 함수 밖으로 반환하면 안 된다는 원칙을 떠올려보세요.'
      )
    },
    {
      id: 'voidPointer',
      title: 'void 포인터',
      ready: true,
      summary: '어떤 타입이든 가리킬 수 있는 void 포인터와, 실제로 쓰려면 형변환이 필요한 이유를 배워요.',
      goals: ['void*가 뭔지: 타입 없는 포인터', '실제로 쓸 때는 형변환이 필요하다', 'void*가 쓰이는 예: malloc, qsort'],
      blocks: [
        {
          h: '어떤 타입이든 가리킬 수 있는: void 포인터',
          html: `<p><code>void *p;</code>는 "무슨 타입인지 아직 정해지지 않은" 주소를 담을 수 있는 포인터예요. 하지만 <b>그 자체로는 역참조할 수 없어요</b>(값의 크기를 몰라서요).</p>`,
          code: {
            label: 'void_pointer.c',
            src: `int age = 17;
void *p = &age;`
          }
        },
        {
          h: '실제로 쓰려면 형변환이 필요해요',
          html: `<p>값을 꺼내려면 <code>(int*)</code>처럼 <b>진짜 타입으로 형변환</b>한 뒤에 역참조해야 해요.</p>`,
          code: {
            label: 'void_pointer_cast.c',
            src: `int age = 17;
void *p = &age;
printf("%d\\n", *(int*)p);`,
            out: `17`
          }
        },
        {
          h: 'void*가 쓰이는 예: malloc과 qsort',
          html: `<p><code>malloc</code>은 <code>void*</code>를 반환해서 어떤 타입으로도 쓸 수 있고, <code>qsort</code>의 비교 함수도 <code>void*</code>를 받아서 어떤 자료형의 배열이든 정렬할 수 있게 해줘요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const val = randInt(1, 50);
          return {
            type: 'blank',
            q: `<code>int age = ${val}; void *p = &age;</code>일 때, <code>*(int*)p</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(val)], placeholder: '숫자',
            why: `(int*)로 형변환한 뒤 역참조하면 age의 실제 값인 ${val}이 나와요.`,
            hint: '(int*)p는 p를 진짜 int 포인터로 취급하겠다는 뜻이에요.'
          };
        },
        () => makeChoice(
          '<code>void *p;</code>를 형변환 없이 바로 <code>*p</code>로 역참조하려고 하면?',
          '컴파일 오류가 난다(크기를 알 수 없어서)', ['항상 0이 나온다', '항상 정상적으로 int처럼 동작한다', '자동으로 char로 취급된다'],
          'void*는 가리키는 값의 타입(크기)을 모르기 때문에, 역참조하려면 반드시 형변환이 필요해요.',
          '포인터를 역참조하려면 "몇 바이트를 읽어야 하는지" 알아야 한다는 걸 생각해보세요.'
        ),
        () => makeChoice(
          'malloc 함수의 반환 타입은?',
          '<code>void*</code>', ['<code>int*</code>', '<code>char*</code>', '항상 구조체 포인터'],
          'malloc은 void*를 반환해서, 어떤 타입의 포인터에도 대입할 수 있어요.',
          '어떤 타입이든 담을 수 있는 자료를 할당해야 하니, 특정 타입에 묶여있으면 안 되겠죠.'
        ),
        () => ({
          type: 'code',
          q: '<code>float value = 3.14;</code>의 주소를 <code>void *p</code>에 담고, <code>(float*)</code>로 형변환해서 값을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'float value = 3.14;\nvoid *p = &value;\nprintf("%f\\n", *(float*)p);',
          accept: ['float value = 3.14;void *p = &value;printf("%f\\n", *(float*)p);'],
          why: 'void*에 담아도, (float*)로 형변환하면 원래 float 값을 안전하게 꺼낼 수 있어요.',
          hint: 'void *p = &value; 후 *(float*)p로 값을 꺼내 출력하세요.'
        }),
      ],
      boss: () => {
        const val = (randInt(100, 999) / 100).toFixed(2);
        return {
          type: 'blank',
          q: `<code>float value = ${val}; void *p = &value;</code>일 때, <code>*(float*)p</code>의 값은?`,
          prefix: '', suffix: '', accept: [val], placeholder: '숫자',
          why: `(float*)로 형변환한 뒤 역참조하면 원래 값인 ${val}이 나와요.`,
          hint: '형변환 후 역참조하면 저장했던 원래 값을 그대로 가져올 수 있어요.'
        };
      }
    },
    {
      id: 'errnoHandling',
      title: 'errno와 표준 에러 처리',
      ready: true,
      summary: '표준 라이브러리 함수가 실패한 이유를 알려주는 errno와, 이를 사람이 읽기 좋게 보여주는 perror를 배워요.',
      goals: ['errno가 뭔지', 'perror로 에러 메시지 출력하기', 'errno를 확인해야 할 시점'],
      blocks: [
        {
          h: '표준 함수가 실패한 이유를 알려주는: errno',
          html: `<p>많은 표준 라이브러리 함수(<code>fopen</code> 등)가 실패하면, 전역 변수 <code>errno</code>에 그 실패 이유를 나타내는 코드를 남겨요.</p>`,
          code: {
            label: 'errno_basic.c',
            src: `FILE *fp = fopen("없는파일.txt", "r");
if (fp == NULL) {
    printf("errno: %d\\n", errno);
}`
          }
        },
        {
          h: '사람이 읽기 좋은 메시지로 보여주기: perror',
          html: `<p><code>perror(메시지)</code>는 내가 준 메시지 뒤에, <code>errno</code>에 해당하는 <b>사람이 읽을 수 있는 설명</b>을 자동으로 붙여서 출력해줘요.</p>`,
          code: {
            label: 'perror_basic.c',
            src: `if (fp == NULL) {
    perror("파일 열기 실패");
}`
          }
        },
        {
          h: 'errno는 실패했을 때만 확인해야 해요',
          html: `<p>함수가 <b>성공했다면</b> errno 값은 의미가 없어요(이전 호출에서 남은 값일 수도 있어요). 반드시 <b>실패(NULL 반환 등)를 먼저 확인한 뒤에만</b> errno를 살펴봐야 해요.</p>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'errno가 하는 역할은?',
          '표준 함수가 실패했을 때, 그 실패 이유를 나타내는 코드를 담아둔다', ['프로그램의 실행 시간을 기록한다', '항상 성공 여부와 상관없이 0을 담는다', '메모리 사용량을 기록한다'],
          'errno는 표준 함수가 실패했을 때 그 이유(코드)를 담아두는 전역 변수예요.',
          '"error number"의 줄임말이라는 이름 자체가 힌트예요.'
        ),
        () => ({
          type: 'blank',
          q: `errno에 해당하는 설명을 사람이 읽기 좋게 자동으로 붙여서 출력하는 함수를 쓰세요.`,
          prefix: '', suffix: '("파일 열기 실패");', accept: ['perror'], placeholder: '함수 이름',
          why: '<code>perror(메시지)</code>는 메시지 뒤에 errno에 해당하는 설명을 붙여서 출력해요.',
          hint: '"오류(error)를 출력한다(print)"는 뜻이 합쳐진 이름이에요.'
        }),
        () => makeChoice(
          'errno를 확인해야 하는 올바른 시점은?',
          '함수가 실패했다고 확인된 뒤(예: NULL 반환 확인 후)', ['함수를 호출하기 전에 미리', '함수가 성공했을 때만', '아무 때나 확인해도 상관없다'],
          '함수가 성공했을 때 errno는 의미가 없어요(이전 값이 남아있을 수 있어서). 실패를 확인한 뒤에만 errno를 봐야 해요.',
          '성공했을 때는 errno가 갱신이 안 될 수도 있다는 점을 생각해보세요.'
        ),
        () => makeChoice(
          '<code>fopen</code>이 성공했는데도 errno를 확인하면 어떤 문제가 있을까요?',
          '이전 호출에서 남은 값일 수 있어서 잘못된 정보로 오해할 수 있다', ['항상 정확한 최신 정보를 준다', '프로그램이 멈춘다', 'errno가 자동으로 0으로 초기화된다'],
          'errno는 성공 시 자동으로 0이 되는 게 아니라서, 이전 실패의 값이 그대로 남아있을 수 있어요.',
          'errno는 "실패했을 때만" 의미 있게 갱신된다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"missing.txt"</code>를 읽기 모드로 열어서 실패하면 <code>perror("파일 열기 실패")</code>를 호출하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'FILE *fp = fopen("missing.txt", "r");\nif (fp == NULL) {\n    perror("파일 열기 실패");\n}',
          accept: ['FILE *fp = fopen("missing.txt", "r");if (fp == NULL) {perror("파일 열기 실패");}'],
          why: 'fopen이 실패(NULL)했는지 확인한 뒤 perror로 이유를 출력해요.',
          hint: 'fopen 후 if (fp == NULL) 블록 안에 perror를 호출하세요.'
        }),
      ],
      boss: () => makeChoice(
        '<code>fopen</code>이 성공(NULL이 아님)했는데도 <code>if (errno != 0)</code>으로 오류를 확인하려고 해요. 이 방식의 문제점은?',
        'errno가 이전 호출에서 남은 값일 수 있어서, 지금 호출이 실패했다고 잘못 판단할 수 있다',
        ['이 방식이 가장 정확하고 안전한 방법이다', 'fopen은 항상 errno를 0으로 초기화해서 문제없다', 'errno는 성공 여부와 상관없다'],
        '성공했을 때 errno를 확인하는 건 신뢰할 수 없어요. 항상 반환값(NULL 등)으로 먼저 성공/실패를 확인해야 해요.',
        'errno는 "실패했을 때만" 의미 있는 값이라는 원칙을 떠올려보세요.'
      )
    },
    {
      id: 'assertDebugging',
      title: 'assert로 디버깅',
      ready: true,
      summary: '"이 조건은 절대 거짓이면 안 된다"는 가정을 코드에 명시해서, 문제를 빨리 발견하는 assert를 배워요.',
      goals: ['assert로 조건 확인하기', '조건이 거짓이면 프로그램이 멈춘다', '왜 개발 중에 유용한지'],
      blocks: [
        {
          h: '조건이 맞는지 확인하기: assert',
          html: `<p><code>assert(조건)</code>은 그 조건이 <b>거짓이면 즉시 프로그램을 멈추고</b>, 어느 파일 몇 번째 줄에서 실패했는지 알려줘요.</p>`,
          code: {
            label: 'assert_basic.c',
            src: `#include <assert.h>

int divide(int a, int b) {
    assert(b != 0);
    return a / b;
}`
          }
        },
        {
          h: '왜 개발 중에 유용할까요',
          html: `<p>"이 조건은 절대 거짓이면 안 된다"는 가정을 코드에 명시해두면, 그 가정이 실제로 깨지는 순간 <b>바로</b> 알아챌 수 있어요. 문제가 한참 뒤에 이상한 결과로 나타나는 대신, 원인이 된 그 자리에서 바로 멈추게 해줘요.</p>`
        },
        {
          h: '배포 버전에서는 꺼둘 수도 있어요',
          html: `<p><code>NDEBUG</code>를 정의하면 <code>assert</code>들이 전부 비활성화돼요(실무 릴리즈 빌드에서 흔히 해요). 그래서 <b>assert 안에는 진짜로 실행돼야 하는 코드를 넣으면 안 돼요</b>. 꺼지면 그 코드도 같이 사라지니까요.</p>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>assert(b != 0);</code>에서 <code>b</code>가 0이면 어떻게 될까요?',
          '조건이 거짓이므로 프로그램이 즉시 멈춘다', ['0을 1로 자동으로 바꿔준다', '아무 일도 안 일어난다', '무한 루프에 빠진다'],
          'assert는 조건이 거짓이면 프로그램을 즉시 멈추고 실패 위치를 알려줘요.',
          '"단언하다"라는 뜻처럼, 그 조건이 반드시 참이어야 한다고 못박는 거예요.'
        ),
        () => ({
          type: 'blank',
          q: `조건이 맞는지 확인하고, 거짓이면 프로그램을 멈추는 매크로를 쓰세요.`,
          prefix: '', suffix: '(b != 0);', accept: ['assert'], placeholder: '매크로 이름',
          why: '<code>assert(조건)</code>은 조건이 거짓이면 프로그램을 즉시 멈춰요.',
          hint: '"확인하다, 단언하다"라는 뜻 그대로예요.'
        }),
        () => makeChoice(
          'assert를 개발 중에 쓰면 좋은 이유는?',
          '가정이 깨지는 순간 바로 알아채서, 문제를 훨씬 빨리 발견할 수 있어서', ['assert 없이는 컴파일이 아예 안 돼서', '항상 실행 속도가 빨라져서', '메모리를 아예 안 써서'],
          '문제가 한참 뒤에 이상한 결과로 나타나는 대신, 가정이 깨진 바로 그 자리에서 멈추게 해줘요.',
          '버그를 "나중에" 발견하는 것과 "즉시" 발견하는 것 중 어느 쪽이 디버깅에 유리할지 생각해보세요.'
        ),
        () => makeChoice(
          'assert 안에 실제로 꼭 실행돼야 하는 코드(예: 값을 바꾸는 코드)를 넣으면 안 되는 이유는?',
          'NDEBUG가 정의되면 assert 전체가 비활성화돼서 그 코드도 같이 사라지기 때문',
          ['assert 안에는 원래 코드를 못 넣게 문법으로 막혀 있어서', 'assert는 항상 두 번 실행되기 때문에', 'assert 안의 코드는 항상 느리게 실행돼서'],
          '배포 버전에서 assert가 꺼지면, 그 안의 코드도 통째로 사라져서 프로그램 동작이 달라질 수 있어요.',
          'assert가 "확인용"이지 "실행용"이 아니라는 점을 기억하세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>int arr[5]</code>에 접근하기 전에, 인덱스 <code>i</code>가 0 이상 5 미만인지 확인하는 assert를 작성하세요.',
          starter: '',
          placeholder: 'assert(i >= 0 && i < 5);',
          accept: ['assert(i >= 0 && i < 5);'],
          why: 'assert(조건) 형태로, 배열 범위를 벗어나지 않는지 확인해요.',
          hint: 'assert(i >= 0 && i < 5);를 그대로 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '릴리즈(배포) 빌드에서 NDEBUG가 정의돼서 모든 assert가 꺼졌어요. 그런데 assert 안에 <code>count++;</code>처럼 실제로 값을 바꾸는 코드가 들어있었다면 무슨 문제가 생길까요?',
        '릴리즈 빌드에서는 count++가 실행되지 않아서, 디버그 빌드와 다르게 동작한다',
        ['릴리즈 빌드에서도 항상 정상적으로 count++가 실행된다', 'assert가 꺼져도 그 안의 코드는 항상 실행된다', '아무 차이도 없다'],
        'NDEBUG가 정의되면 assert 문 전체가 컴파일에서 제외돼서, 그 안의 count++ 같은 코드도 실행되지 않아요.',
        'assert는 "검증용"이라 배포 시 꺼질 수 있고, 그 안에 진짜 로직을 넣으면 안 되는 이유예요.'
      )
    },
    {
      id: 'timeRand',
      title: 'time.h와 rand()',
      ready: true,
      summary: '무작위 숫자를 만드는 rand()와, 실행할 때마다 다른 값이 나오게 해주는 srand/time을 배워요.',
      goals: ['rand()로 무작위 값 만들기', 'srand로 시드 정하기', 'time(NULL)로 매번 다른 시드 주기'],
      blocks: [
        {
          h: '무작위 숫자 만들기: rand()',
          html: `<p><code>rand()</code>는 무작위 정수를 돌려줘요. <code>rand() % n</code>은 0부터 n-1 사이의 값을 만들어줘요.</p>`,
          code: {
            label: 'rand_basic.c',
            src: `int n = rand() % 6 + 1;  // 1~6 사이 무작위 정수`
          }
        },
        {
          h: '시작값(시드) 정하기: srand',
          html: `<p>사실 <code>rand()</code>는 <b>완전한 무작위가 아니라</b>, "시드"라는 시작값에 따라 정해진 순서로 숫자를 만들어내요. <b>시드가 같으면 항상 같은 순서</b>의 값이 나와요.</p>`,
          code: {
            label: 'srand_basic.c',
            src: `srand(42);
printf("%d\\n", rand());`
          },
          after: `<div class="note"><b>디버깅에 유용</b> — 같은 시드를 쓰면 실행할 때마다 항상 똑같은 "무작위" 값이 나와서, 버그를 재현하기 쉬워져요.</div>`
        },
        {
          h: '매번 다른 값이 나오게: time(NULL)',
          html: `<p>현재 시각을 시드로 쓰면, 실행할 때마다 시각이 달라서 <b>매번 다른</b> 무작위 값이 나와요.</p>`,
          code: {
            label: 'srand_time.c',
            src: `srand(time(NULL));`
          }
        }
      ],
      quizGenerators: [
        () => {
          const max = randInt(2, 10);
          return {
            type: 'blank',
            q: `1부터 ${max}까지의 무작위 정수를 만드는 식을 완성하세요. (<code>rand() % ${max} + ${'{이것}'}</code>)`,
            prefix: `rand() % ${max} + `, suffix: '', accept: ['1'], placeholder: '숫자',
            why: `<code>rand() % ${max}</code>는 0부터 ${max - 1}까지 나오니, 1을 더해서 1부터 ${max}까지로 만들어요.`,
            hint: '나머지 연산 결과는 0부터 시작하니, 원하는 범위의 시작값만큼 더해야 해요.'
          };
        },
        () => makeChoice(
          '<code>srand(42)</code>를 두 번 실행하고 각각 <code>rand()</code>를 부르면?',
          '두 번 다 완전히 똑같은 값이 나온다', ['매번 다른 값이 나온다', '오류가 난다', '항상 0이 나온다'],
          '같은 시드(42)를 쓰면 rand()가 만드는 순서도 항상 똑같아요.',
          'rand()는 시드에 따라 "정해진" 순서로 값을 만든다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `실행할 때마다 다른 무작위 값이 나오도록, 현재 시각을 시드로 쓰는 코드를 완성하세요.`,
          prefix: 'srand(', suffix: '(NULL));', accept: ['time'], placeholder: '함수 이름',
          why: '<code>srand(time(NULL))</code>은 현재 시각을 시드로 써서 매번 다른 값이 나오게 해요.',
          hint: '"시간"을 뜻하는 영어 단어예요.'
        }),
        () => makeChoice(
          '테스트 코드에서 매번 같은 "무작위" 결과가 나오게 하고 싶을 때, srand에 무엇을 넘겨야 할까요?',
          '고정된 숫자(예: srand(42))', ['srand(time(NULL))', 'srand()를 아예 안 부른다', 'srand(rand())'],
          '고정된 숫자를 시드로 주면, 실행할 때마다 항상 같은 순서의 값이 나와서 테스트에 유용해요.',
          '"항상 같은 결과"가 필요한 상황에는 시드를 고정해야 한다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '현재 시각을 시드로 설정하고, 1부터 100까지의 무작위 정수를 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'srand(time(NULL));\nprintf("%d\\n", rand() % 100 + 1);',
          accept: ['srand(time(NULL));printf("%d\\n", rand() % 100 + 1);'],
          why: 'srand(time(NULL))로 시드를 매번 다르게 하고, rand() % 100 + 1로 1~100 범위를 만들어요.',
          hint: 'srand(time(NULL)); 다음 줄에 rand() % 100 + 1을 출력하세요.'
        }),
      ],
      boss: () => makeChoice(
        '게임에서 매번 다른 주사위 값이 나와야 하는데, 실행할 때마다 항상 같은 숫자만 나와요. 원인으로 가장 가능성이 높은 것은?',
        'srand를 고정된 숫자로만 호출하거나 아예 안 불러서, 항상 같은 시드로 시작한다',
        ['rand() 함수 자체가 고장 났다', '컴퓨터가 너무 빨라서 그렇다', '주사위 숫자는 원래 항상 같아야 한다'],
        'srand를 안 부르거나 항상 같은 값으로 부르면, rand()가 매번 같은 시드로 시작해서 같은 순서의 값을 내놓아요.',
        'srand(time(NULL))처럼 매번 바뀌는 값을 시드로 줘야 한다는 걸 떠올려보세요.'
      )
    }],
  tierBoss: {
    beginner: () => ({
      type: 'code',
      q: '1부터 <code>n</code>까지의 합을 반환하는 함수 <code>sumRange(int n)</code>을 만드세요(변수와 for문 사용). <code>sumRange(5)</code>의 결과가 10보다 크면 <code>printf("많음")</code>을, 아니면 <code>printf("적음")</code>을 실행하는 전체 코드를 작성하세요.',
      starter: '',
      rows: 10,
      placeholder: 'int sumRange(int n) {\n    int total = 0;\n    for (int i = 1; i <= n; i++) {\n        total += i;\n    }\n    return total;\n}\n\nif (sumRange(5) > 10) {\n    printf("많음");\n} else {\n    printf("적음");\n}',
      accept: ['int sumRange(int n) {int total = 0;for (int i = 1; i <= n; i++) {total += i;}return total;}if (sumRange(5) > 10) {printf("많음");} else {printf("적음");}'],
      why: 'sumRange(5)는 1부터 5까지 더한 15를 반환하고, 15는 10보다 크니까 "많음"이 출력돼요.',
      hint: '함수 안에서 total = 0으로 시작해 for문으로 더한 값을 return한 뒤, 그 결과를 if/else로 비교하세요.'
    }),
    intermediate: () => ({
      type: 'code',
      q: '<code>int scores[3];</code> 멤버를 가진 구조체 <code>Scoreboard</code>를 <code>typedef struct { ... } Scoreboard;</code>로 정의하세요. <code>Scoreboard sb;</code>를 만들고 포인터 <code>Scoreboard *ptr = &sb;</code>를 만든 뒤, <code>ptr-&gt;scores[0]=3; ptr-&gt;scores[1]=7; ptr-&gt;scores[2]=5;</code>로 채우세요. for문으로 <code>ptr-&gt;scores</code>의 세 값을 모두 더해 <code>total</code>에 담고 <code>printf("%d\\n", total);</code>로 출력하는 전체 코드를 작성하세요.',
      starter: '',
      rows: 16,
      placeholder: 'typedef struct {\n    int scores[3];\n} Scoreboard;\n\nScoreboard sb;\nScoreboard *ptr = &sb;\nptr->scores[0] = 3;\nptr->scores[1] = 7;\nptr->scores[2] = 5;\n\nint total = 0;\nfor (int i = 0; i < 3; i++) {\n    total += ptr->scores[i];\n}\nprintf("%d\\n", total);',
      accept: ['typedef struct {int scores[3];} Scoreboard;Scoreboard sb;Scoreboard *ptr = &sb;ptr->scores[0] = 3;ptr->scores[1] = 7;ptr->scores[2] = 5;int total = 0;for (int i = 0; i < 3; i++) {total += ptr->scores[i];}printf("%d\\n", total);'],
      why: 'ptr->scores는 sb.scores와 완전히 같은 자리를 가리켜서, 포인터로 채운 값들을 for문으로 다 더하면 3+7+5=15가 출력돼요.',
      hint: 'Scoreboard 구조체와 포인터를 만든 다음, ptr->scores[i]로 값을 채우고 for문으로 합계를 구하세요.'
    }),
    advanced: () => ({
      type: 'code',
      q: '<code>#include &lt;string.h&gt;</code>와 <code>#include &lt;stdlib.h&gt;</code>를 쓰세요. 문자열 2개를 담는 2차원 배열 <code>char names[2][20];</code>를 만들어 <code>strcpy(names[0], "Choco");</code>와 <code>strcpy(names[1], "Robot");</code>로 채우세요. for문으로 <code>names[0]</code>과 <code>names[1]</code>의 <code>strlen</code> 합을 구해 <code>total</code>에 담고, <code>malloc</code>으로 정수 하나를 담을 공간을 할당해서 그 공간에 <code>total</code>을 저장한 뒤 <code>printf("%d\\n", ...)</code>로 출력하고 <code>free</code>로 반납하는 전체 코드를 작성하세요.',
      starter: '',
      rows: 16,
      placeholder: '#include <string.h>\n#include <stdlib.h>\n\nchar names[2][20];\nstrcpy(names[0], "Choco");\nstrcpy(names[1], "Robot");\n\nint total = 0;\nfor (int i = 0; i < 2; i++) {\n    total += strlen(names[i]);\n}\n\nint *result = (int *) malloc(sizeof(int));\n*result = total;\nprintf("%d\\n", *result);\nfree(result);',
      accept: ['#include <string.h>\n#include <stdlib.h>\nchar names[2][20];\nstrcpy(names[0], "Choco");\nstrcpy(names[1], "Robot");\nint total = 0;\nfor (int i = 0; i < 2; i++) {\n    total += strlen(names[i]);\n}\nint *result = (int *) malloc(sizeof(int));\n*result = total;\nprintf("%d\\n", *result);\nfree(result);'],
      why: '2차원 char 배열의 각 행이 문자열 하나예요. "Choco"와 "Robot"은 각각 5글자라서 합은 10이고, malloc으로 만든 공간에 그 값을 저장했다가 출력한 뒤 free로 반납해요.',
      hint: 'names[0], names[1] 각각의 strlen을 for문으로 더한 다음, malloc으로 만든 포인터에 그 값을 저장해서 출력하고 free하세요.'
    }),
  }
};
