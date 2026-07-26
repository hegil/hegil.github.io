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
