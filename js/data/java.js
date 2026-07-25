/* Java 강의·문제 데이터 — 단원을 추가하려면 units 배열에 항목을 넣으면 됩니다. */
COURSES.java = {
    name: 'Java',
    tagline: '값의 종류를 미리 정해두고 시작하는, 큰 프로그램에 많이 쓰이는 언어',
    units: [{
      id: 'vars',
      title: '변수와 자료형',
      ready: true,
      summary: '자바는 상자의 "모양"을 먼저 정해야 해요. 어떤 모양들이 있는지 하나씩 배워봐요.',
      goals: ['자료형 + 이름으로 선언', 'int / double / char / boolean', 'String', '형변환'],
      blocks: [
        {
          h: '자료형을 먼저 말해줘야 해요',
          html: `<p>파이썬과 다르게, 자바는 변수를 만들 때 <b>어떤 모양의 상자인지(자료형)</b>를 먼저 적어야 해요. 네모난 상자엔 네모난 물건만, 동그란 상자엔 동그란 물건만 넣을 수 있는 것과 비슷해요.</p>
                 <p>한 번 정한 모양은 나중에 바꿀 수 없어요. 대신 잘못된 값을 넣으면 프로그램을 실행하기도 전에 미리 알려줘서 실수를 줄여줘요. 문장 끝에는 항상 세미콜론(<code>;</code>)을 붙입니다.</p>`,
          code: {
            label: 'Main.java',
            src: `public class Main {
    public static void main(String[] args) {
        int age = 17;
        double height = 165.3;
        char grade = 'A';
        boolean isStudent = true;
        String name = "지수";

        System.out.println(name + " / " + age);
        // age = "열일곱";  // 오류! 모양이 안 맞아요
    }
}`,
            out: `지수 / 17`
          }
        },
        {
          h: '자주 쓰는 자료형',
          html: `<table>
                   <tr><th>자료형</th><th>예시</th><th>쉬운 설명</th></tr>
                   <tr><td><code>int</code></td><td><code>17</code></td><td>정수(소수점 없는 숫자)</td></tr>
                   <tr><td><code>double</code></td><td><code>3.14</code></td><td>소수점이 있는 숫자</td></tr>
                   <tr><td><code>char</code></td><td><code>'A'</code></td><td>글자 딱 1개, <b>작은</b>따옴표를 써요</td></tr>
                   <tr><td><code>boolean</code></td><td><code>true</code></td><td>참 또는 거짓</td></tr>
                   <tr><td><code>String</code></td><td><code>"안녕"</code></td><td>글자 여러 개(문자열), <b>큰</b>따옴표 · 대문자 S</td></tr>
                 </table>
                 <p><code>char</code>는 작은따옴표, <code>String</code>은 큰따옴표! 이 둘을 헷갈리는 실수가 아주 많아요.</p>`
        },
        {
          h: '모양 바꾸기(형변환)와 정수 나눗셈',
          html: `<p>소수(<code>double</code>)를 정수(<code>int</code>)로 바꾸고 싶으면 앞에 <code>(int)</code>를 붙여요. 이때 소수점 아래는 그냥 버려져요.</p>
                 <p>정수끼리 나누면 결과도 정수가 돼요. 소수점까지 필요하면 둘 중 하나를 <code>double</code>로 만들어야 해요.</p>`,
          code: {
            label: 'Cast.java',
            src: `double d = 3.99;
int i = (int) d;          // 3, 소수점 아래는 버려짐

System.out.println(7 / 2);        // 3
System.out.println(7 / 2.0);      // 3.5`,
            out: `3\n3.5`
          },
          after: `<div class="note"><b>주의</b> — <code>7 / 2</code>가 <code>3.5</code>가 아니라 <code>3</code>인 이유는 둘 다 정수(<code>int</code>)라서예요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '글자 하나를 담는 올바른 선언은 무엇일까요?',
          `<code>char c = 'A';</code>`,
          [`<code>char c = "A";</code>`, `<code>String c = 'A';</code>`, `<code>char c = A;</code>`],
          `<code>char</code>는 작은따옴표를 쓰고, 큰따옴표는 <code>String</code>에서 써요.`,
          '글자 딱 하나만 담는 자료형은 작은따옴표를 써요.'
        ),
        () => {
          const a = randInt(10, 50), b = randInt(2, 9);
          const result = Math.floor(a / b);
          return {
            type: 'blank',
            q: `<code>System.out.println(${a} / ${b});</code>를 실행하면 어떤 숫자가 나올까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
            why: `${a}와 ${b} 모두 정수(int)라서 소수점은 버려지고 ${result}만 남아요.`,
            hint: '정수끼리 나누면 소수점 아래는 그냥 버려져요.'
          };
        },
        () => {
          const d = `${randInt(1, 50)}.${randInt(1, 9)}`;
          return {
            type: 'blank',
            q: `실수 <code>d</code> (${d})를 정수로 바꾸는 형변환을 완성하세요.`,
            prefix: 'int i = ', suffix: ' d;', accept: ['(int)', '( int )'], placeholder: '(자료형)',
            why: `소수를 정수로 바꿀 때는 <code>(int)</code>를 앞에 붙여요. 소수점 아래는 사라져요.`,
            hint: '바꾸고 싶은 자료형 이름을 소괄호로 감싸서 값 앞에 붙여요.'
          };
        },
        () => {
          const cases = [
            { val: `${randInt(1, 999)}`, type: 'int' },
            { val: `${randInt(1, 99)}.${randInt(1, 9)}`, type: 'double' },
            { val: pick(['true', 'false']), type: 'boolean' },
            { val: `'${pick(['A', 'B', 'Z', 'K'])}'`, type: 'char' },
            { val: `"${pick(['안녕', '자바', '고양이'])}"`, type: 'String' },
          ];
          const it = pick(cases);
          const others = ['int', 'double', 'boolean', 'char', 'String'].filter(t => t !== it.type);
          return makeChoice(
            `값 <code>${it.val}</code>을(를) 담으려면 어떤 자료형으로 선언해야 할까요?`,
            `<code>${it.type}</code>`, shuffle(others).slice(0, 3).map(t => `<code>${t}</code>`),
            `<code>${it.val}</code>은(는) <code>${it.type}</code> 종류의 값이에요.`,
            '따옴표 종류(작은/큰/없음)와 소수점 유무를 확인해보세요.'
          );
        },
        () => makeChoice(
          '자바에서 변수를 선언하는 방법으로 옳은 것은?',
          '자료형을 이름 앞에 적어야 한다',
          ['자료형을 적지 않아도 된다', '한 번 정한 자료형을 나중에 바꿀 수 있다', '문장 끝에 세미콜론이 없어도 된다'],
          '자바는 <code>자료형 이름 = 값;</code> 형태로, 자료형을 미리 적어야 해요.',
          '자바는 파이썬과 다르게 자료형을 반드시 미리 밝혀야 해요.'
        ),
        () => ({
          type: 'code',
          q: '정수 20을 담는 변수 <code>age</code>를 선언하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'int age = 20;',
          accept: ['int age = 20;'],
          why: '자바는 <code>자료형 이름 = 값;</code> 순서로 써요. 정수니까 <code>int</code>를 써요.',
          hint: '자료형(int)을 이름 앞에 적고, 문장 끝에 세미콜론을 잊지 마세요.'
        }),
      ],
      boss: () => {
        const letter = pick(['A', 'B', 'C', 'K']);
        const num = randInt(1, 9);
        return {
          type: 'blank',
          q: `<code>char grade = '${letter}';</code>, <code>int bonus = ${num};</code>로 정한 뒤 <code>System.out.println("등급" + grade + bonus);</code>를 실행하면 무엇이 출력될까요? 따옴표 없이 그대로 입력하세요.`,
          prefix: '', suffix: '', accept: [`등급${letter}${num}`], placeholder: '출력될 문장',
          why: `문자열에 <code>+</code>로 이어붙이면 char와 int도 모두 글자로 바뀌어서 이어져요. "등급" + '${letter}' + ${num} = "등급${letter}${num}"이에요.`,
          hint: '문자열과 +로 연결하면 char나 숫자도 전부 글자로 바뀌어서 순서대로 이어 붙어요.'
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
          html: `<p>조건이 <code>true</code>면 중괄호 <code>{ }</code> 안의 코드가 실행돼요. 여러 조건은 <code>else if</code>로 이어붙이고, 마지막엔 <code>else</code>를 씁니다.</p>`,
          code: {
            label: 'Flow.java',
            src: `int age = 17;

if (age >= 20) {
    System.out.println("성인이에요");
} else if (age >= 13) {
    System.out.println("청소년이에요");
} else {
    System.out.println("어린이예요");
}`,
            out: `청소년이에요`
          }
        },
        {
          h: '비교 연산자와 && / ||',
          html: `<table>
                   <tr><th>연산자</th><th>뜻</th></tr>
                   <tr><td><code>==</code></td><td>같다 (숫자·boolean에서만! 글자 비교는 .equals() 사용)</td></tr>
                   <tr><td><code>&gt;</code>, <code>&lt;</code></td><td>크다, 작다</td></tr>
                 </table>
                 <p>둘 다 만족해야 하면 <code>&&</code>, 하나만 만족해도 되면 <code>||</code>예요.</p>`,
          code: {
            label: 'AndOr.java',
            src: `int age = 17;
boolean hasTicket = true;

if (age >= 14 && hasTicket) {
    System.out.println("입장 가능");
}`,
            out: `입장 가능`
          }
        },
        {
          h: '자바 특유의 주의사항',
          html: `<p>자바에서 글자(String) 두 개가 같은지 비교할 땐 <code>==</code> 대신 <code>.equals()</code>를 써야 해요. <code>==</code>는 숫자·boolean 비교에서만 안전해요.</p>`,
          after: `<div class="note"><b>예시</b> — <code>name.equals("지수")</code>처럼 써요. 지금 단계에서는 우선 규칙만 기억해두세요!</div>`
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
          const result = op === '==' ? a === b : op === '>' ? a > b : a < b;
          return makeChoice(
            `<code>System.out.println(${a} ${op} ${b});</code>의 출력은?`,
            `<code>${result}</code>`, [`<code>${!result}</code>`],
            `${a} ${op} ${b}는 ${result}예요.`,
            '두 수를 비교 연산자에 맞게 true/false로 판단해보세요.'
          );
        },
        () => makeChoice(
          '자바에서 두 글자(String)가 같은지 비교할 때 안전한 방법은?',
          '<code>.equals()</code> 사용', ['<code>==</code> 사용', '<code>!=</code> 사용', '뺄셈으로 비교'],
          '자바에서 String 비교는 <code>.equals()</code>를 써야 안전해요.',
          '숫자·boolean 비교와 달리 String은 메서드로 비교해요.'
        ),
        () => ({
          type: 'blank',
          q: `조건을 감싸는 문장 부호를 빈칸에 채우세요.`,
          prefix: 'if ', suffix: 'age >= 20) { ... }', accept: ['('], placeholder: '문장 부호',
          why: '자바에서 조건은 소괄호 <code>( )</code> 안에 써요.',
          hint: '메서드를 호출할 때 쓰는 것과 같은 괄호예요.'
        }),
        () => makeChoice(
          '두 조건이 모두 참이어야 실행되도록 하는 연산자는?',
          '<code>&&</code>', ['<code>||</code>', '<code>!</code>', '<code>==</code>'],
          '<code>&&</code>는 두 조건이 모두 참이어야 참이 돼요.',
          '기호를 두 번 겹쳐 쓰는 연산자 중 "그리고"를 뜻하는 것이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>score</code>가 60 이상이면 <code>System.out.println("합격")</code>을, 아니면 <code>System.out.println("불합격")</code>을 실행하는 if-else문을 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'if (score >= 60) {\n    System.out.println("합격");\n} else {\n    System.out.println("불합격");\n}',
          accept: ['if (score >= 60) {System.out.println("합격");} else {System.out.println("불합격");}'],
          why: '<code>if (조건) { ... } else { ... }</code> 형태로 조건에 따라 다른 코드를 실행해요.',
          hint: 'if (score >= 60) { } 안에 성공 코드를, else { } 안에 실패 코드를 넣으세요.'
        }),
      ],
      boss: () => {
        const age = randInt(1, 25);
        const hasTicket = Math.random() < 0.5;
        const ok = age >= 14 && hasTicket;
        const label = ok ? '입장 가능' : '입장 불가';
        return {
          type: 'blank',
          q: `<code>int age = ${age};</code>, <code>boolean hasTicket = ${hasTicket};</code>일 때, "나이가 14 이상이고 티켓이 있으면 입장 가능, 아니면 입장 불가"를 출력하는 코드의 결과는? 따옴표 없이 입력하세요.`,
          prefix: '', suffix: '', accept: [label], placeholder: '출력될 문장',
          why: `나이는 ${age >= 14 ? '14 이상' : '14 미만'}이고 티켓은 ${hasTicket ? '있어요' : '없어요'}. 둘 다 참이어야 하는 && 조건이 ${ok ? '참이라 "입장 가능"' : '거짓이라 "입장 불가"'}가 출력돼요.`,
          hint: '&&는 두 조건이 모두 참이어야 참이에요. 나이 조건과 티켓 조건을 각각 확인해보세요.'
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
            label: 'For.java',
            src: `for (int i = 0; i < 5; i++) {
    System.out.println(i + "번째 인사");
}`,
            out: `0번째 인사\n1번째 인사\n2번째 인사\n3번째 인사\n4번째 인사`
          }
        },
        {
          h: '조건이 참인 동안 반복: while',
          html: `<p>몇 번 반복할지 미리 모를 땐 <code>while (조건) { ... }</code>을 써요.</p>`,
          code: {
            label: 'While.java',
            src: `int count = 3;
while (count > 0) {
    System.out.println(count);
    count = count - 1;
}
System.out.println("발사!");`,
            out: `3\n2\n1\n발사!`
          }
        },
        {
          h: 'break와 continue',
          html: `<p><code>break</code>는 반복문을 완전히 멈추고, <code>continue</code>는 이번만 건너뛰고 다음 반복으로 넘어가요.</p>`,
          after: `<div class="note"><b>주의</b> — <code>i++</code>처럼 변화를 주는 부분을 빠뜨리면 <b>무한 반복</b>에 빠질 수 있어요.</div>`
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
          hint: '자바 문장을 끝맺을 때 쓰는 그 문장 부호예요.'
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
          q: 'for문으로 0부터 4까지 <code>System.out.println(i)</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}',
          accept: ['for (int i = 0; i < 5; i++) {System.out.println(i);}'],
          why: '<code>for (int i = 0; i < 5; i++)</code>는 i를 0부터 4까지 5번 반복해요.',
          hint: 'for (int i = 0; i < 5; i++) { } 안에 System.out.println(i);를 넣으세요.'
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
      title: '메서드(함수)',
      ready: true,
      summary: '반복해서 쓰는 코드에 이름을 붙여 필요할 때마다 불러 쓰는 방법을 배워요.',
      goals: ['메서드 만들기', '매개변수와 반환 타입', 'void'],
      blocks: [
        {
          h: '메서드는 "자판기"예요',
          html: `<p>자바에서는 함수를 <b>메서드</b>라고 불러요. <code>반환타입 이름(매개변수) { ... }</code> 형태로 만들고, <code>static</code>을 붙이면 <code>main</code>에서 바로 부를 수 있어요.</p>`,
          code: {
            label: 'Func.java',
            src: `static int add(int a, int b) {
    return a + b;
}

public static void main(String[] args) {
    int result = add(3, 4);
    System.out.println(result);
}`,
            out: `7`
          }
        },
        {
          h: '반환값이 없는 메서드: void',
          html: `<p>돌려줄 값이 없고 그냥 실행만 하면 되는 메서드는 반환 타입 자리에 <code>void</code>(아무것도 없음)를 써요.</p>`,
          code: {
            label: 'Void.java',
            src: `static void greet(String name) {
    System.out.println("안녕, " + name);
}`
          }
        },
        {
          h: '반환 타입과 실제 반환값은 일치해야 해요',
          html: `<p>메서드 이름 앞에 적은 반환 타입(예: <code>int</code>)과, <code>return</code>으로 돌려주는 값의 종류가 같아야 해요. 다르면 오류가 나요.</p>`,
          after: `<div class="note"><b>주의</b> — <code>int</code> 메서드인데 <code>String</code>을 <code>return</code>하면 컴파일 오류가 나요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>static int add(int a, int b) { return a + b; }</code>에 <code>add(${a}, ${b})</code>라고 호출하면 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `${a} + ${b} = ${a + b}가 반환돼요.`,
            hint: '매개변수 a, b 자리에 순서대로 값이 들어간다고 생각하고 계산해보세요.'
          };
        },
        () => makeChoice(
          '아무 값도 돌려주지 않는 메서드의 반환 타입으로 쓰는 것은?',
          '<code>void</code>', ['<code>null</code>', '<code>empty</code>', '<code>none</code>'],
          '반환할 값이 없을 땐 <code>void</code>를 반환 타입 자리에 써요.',
          '"텅 빈, 아무것도 없는"이라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `메서드의 결과값을 돌려주는 키워드는?`,
          prefix: 'static int add(int a, int b) { ', suffix: ' a + b; }', accept: ['return'], placeholder: '키워드',
          why: '<code>return</code>은 메서드 밖으로 값을 돌려줘요.',
          hint: '"돌려주다"라는 뜻의 영어 단어예요.'
        }),
        () => {
          const type = pick(['int', 'double', 'boolean', 'String']);
          return {
            type: 'blank',
            q: `숫자 두 개를 더해서 ${type === 'int' ? '정수' : type === 'double' ? '실수' : type} 값을 돌려주는 메서드를 만들려고 해요. 반환 타입을 쓰세요. (지금은 ${type} 예시예요)`,
            prefix: 'static ', suffix: ' add(int a, int b) { return a + b; }', accept: [type], placeholder: '반환 타입',
            why: `돌려줄 값의 종류에 맞는 반환 타입(<code>${type}</code>)을 메서드 이름 앞에 적어요.`,
            hint: '돌려줄 값의 종류(자료형)를 메서드 이름 앞에 그대로 적으면 돼요.'
          };
        },
        () => makeChoice(
          '자바에서 함수를 부르는 다른 이름은?',
          '메서드', ['모듈', '클래스', '패키지'],
          '자바에서는 함수를 "메서드"라고 불러요.',
          '이 단원 제목에도 나와 있는 단어예요.'
        ),
        () => ({
          type: 'code',
          q: '두 정수를 더해 반환하는 메서드 <code>add</code>를 작성하세요. (<code>static int add(int a, int b)</code> 형태)',
          starter: '',
          rows: 3,
          placeholder: 'static int add(int a, int b) {\n    return a + b;\n}',
          accept: ['static int add(int a, int b) {return a + b;}'],
          why: '반환 타입 <code>int</code>, 메서드 이름 <code>add</code>, 매개변수 <code>(int a, int b)</code> 다음에 <code>return a + b;</code>를 써요.',
          hint: 'static int add(int a, int b) { } 안에 return a + b;를 넣으세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 10) * 2;
        const b = randInt(1, 10) * 2 - 1;
        const sum = a + b;
        const avg = sum / 2;
        return {
          type: 'blank',
          q: `<code>static double average(int a, int b) { return (a + b) / 2.0; }</code> 메서드에 <code>average(${a}, ${b})</code>라고 호출하면 결과는? 소수 한 자리까지 쓰세요. (예: 3.5)`,
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
      goals: ['배열 선언', '인덱싱', '배열 길이(length)'],
      blocks: [
        {
          h: '같은 모양의 상자를 여러 칸 이어 붙인 것: 배열',
          html: `<p>배열은 <code>자료형[] 이름 = {값, 값, ...};</code> 형태로 만들어요. 자바 배열은 <b>한 가지 자료형</b>만 담을 수 있어요. 값을 꺼낼 땐 순번(인덱스)을 쓰는데, <b>0부터</b> 세요.</p>`,
          code: {
            label: 'Array.java',
            src: `int[] scores = {90, 85, 100};

System.out.println(scores[0]);        // 90
System.out.println(scores[2]);        // 100
System.out.println(scores.length);    // 3`,
            out: `90\n100\n3`
          }
        },
        {
          h: '문자열 배열도 만들 수 있어요',
          html: `<p><code>String[]</code>처럼 자료형 자리에 원하는 종류를 넣으면 그 종류의 배열을 만들 수 있어요.</p>`,
          code: {
            label: 'StringArray.java',
            src: `String[] fruits = {"사과", "바나나", "포도"};
System.out.println(fruits[1]);`,
            out: `바나나`
          }
        },
        {
          h: '배열 길이는 괄호 없이 .length',
          html: `<p>주의할 점: 문자열의 길이는 <code>.length()</code>(괄호 있음)지만, 배열의 길이는 <code>.length</code>(괄호 없음)예요.</p>`,
          after: `<div class="note"><b>자주 하는 실수</b> — <code>scores.length()</code>처럼 괄호를 붙이면 오류가 나요. 배열은 괄호 없이 <code>.length</code>예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const items = shuffle([70, 80, 90, 100, 60]).slice(0, 4);
          const idx = randInt(0, items.length - 1);
          return {
            type: 'blank',
            q: `<code>int[] scores = {${items.join(', ')}};</code>일 때, <code>scores[${idx}]</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(items[idx])], placeholder: '숫자',
            why: `순번은 0부터 세니까 <code>[${idx}]</code>는 ${idx + 1}번째 값인 ${items[idx]}예요.`,
            hint: '순번은 0부터 시작해요. 앞에서부터 하나씩 세어보세요.'
          };
        },
        () => {
          const n = randInt(2, 6);
          return {
            type: 'blank',
            q: `배열에 값이 ${n}개 들어있을 때, <code>scores.length</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `<code>.length</code>는 배열에 들어있는 값의 개수를 알려줘요. 지금은 ${n}개예요.`,
            hint: '.length는 그냥 배열 안에 값이 몇 개 있는지 세어줘요.'
          };
        },
        () => makeChoice(
          '자바 배열의 길이를 구하는 올바른 방법은?',
          '<code>scores.length</code>', ['<code>scores.length()</code>', '<code>length(scores)</code>', '<code>scores.size()</code>'],
          '배열의 길이는 괄호 없이 <code>.length</code>로 구해요.',
          '괄호가 있는지 없는지가 중요해요. 배열은 괄호가 없어요.'
        ),
        () => makeChoice(
          '자바 배열의 첫 번째 값을 가리키는 순번은?',
          '<code>0</code>', ['<code>1</code>', '<code>-1</code>', '<code>첫번째</code>'],
          '배열의 순번은 0부터 시작해서 첫 번째 값은 <code>[0]</code>이에요.',
          '자바 배열의 순번은 이 숫자부터 시작해요.'
        ),
        () => {
          const type = pick(['int', 'String', 'double']);
          return {
            type: 'blank',
            q: `${type === 'int' ? '정수' : type === 'double' ? '실수' : '문자열'} 여러 개를 담는 배열을 선언하려고 해요. 자료형 뒤에 붙이는 기호를 쓰세요.`,
            prefix: type, suffix: ' scores = {1, 2, 3};', accept: ['[]'], placeholder: '기호',
            why: '자료형 뒤에 <code>[]</code>를 붙이면 그 자료형의 배열이 돼요.',
            hint: '리스트의 값을 감쌀 때 쓰는 그 대괄호예요.'
          };
        },
      ],
      boss: () => {
        const items = shuffle([70, 80, 90, 100, 60, 55]).slice(0, randInt(3, 5));
        const lastIdx = items.length - 1;
        return {
          type: 'blank',
          q: `<code>int[] scores = {${items.join(', ')}};</code>일 때, <code>scores[scores.length - 1]</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(items[lastIdx])], placeholder: '숫자',
          why: `<code>scores.length</code>는 ${items.length}이고, 거기서 1을 뺀 ${lastIdx}가 "마지막 순번"이라서 ${items[lastIdx]}가 나와요.`,
          hint: 'length - 1은 배열의 "마지막 순번"을 가리켜요.'
        };
      }
    }]
};
