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
        () => ({
          type: 'code',
          q: '정수 배열 <code>scores</code>에 <code>{90, 85, 100}</code>을 담아 선언하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'int[] scores = {90, 85, 100};',
          accept: ['int[] scores = {90, 85, 100};'],
          why: '<code>자료형[] 이름 = {값, 값, ...};</code> 형태로 배열을 선언해요.',
          hint: 'int[] scores = { }; 안에 90, 85, 100을 순서대로 넣으세요.'
        }),
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
    },
    {
      id: 'oop',
      title: '클래스와 객체',
      ready: true,
      summary: '비슷한 객체를 여러 개 찍어내는 설계도, class를 배워요.',
      goals: ['class와 생성자', 'this', 'new로 객체 만들기', '메서드'],
      blocks: [
        {
          h: '객체를 찍어내는 설계도: class',
          html: `<p><code>class</code>는 비슷한 모양의 객체를 여러 개 만들기 위한 "설계도"예요. 클래스 이름과 똑같은 이름의 메서드를 <b>생성자</b>라고 하는데, <code>new</code>로 객체를 만들 때 자동으로 실행되면서 초기값을 정해줘요.</p>`,
          code: {
            label: 'Player.java',
            src: `class Player {
    String name;
    int score;

    Player(String name) {
        this.name = name;
        this.score = 0;
    }
    void add(int point) {
        this.score += point;
    }
}

public class Main {
    public static void main(String[] args) {
        Player p = new Player("지수");
        p.add(10);
        System.out.println(p.name + " " + p.score);
    }
}`,
            out: `지수 10`
          }
        },
        {
          h: 'this는 "지금 이 객체"를 가리켜요',
          html: `<p>생성자나 메서드 안에서 <code>this</code>는 <code>new</code>로 방금 만든 그 객체 자신을 가리켜요. <code>this.score</code>는 "이 객체의 score 속성"이라는 뜻이에요. 매개변수 이름과 속성 이름이 같을 때 특히 <code>this</code>로 구분해줘야 해요.</p>`
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
            q: `<code>class Player { String name; Player(String name) { this.name = name; } }</code>일 때, <code>Player p = new Player("${name}");</code> 후 <code>System.out.println(p.name);</code>을 실행하면? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [name], placeholder: '값',
            why: `<code>new Player("${name}")</code>이 실행되면 생성자의 <code>this.name = name</code>에 의해 <code>p.name</code>은 "${name}"이 돼요.`,
            hint: 'new로 객체를 만들면 생성자가 자동으로 실행되면서 매개변수 값을 this에 저장해요.'
          };
        },
        () => makeChoice(
          'class로 객체를 만들 때 새 객체를 실제로 만들어내는(생성하는) 키워드는?',
          '<code>new</code>', ['<code>class</code>', '<code>this</code>', '<code>make</code>'],
          '<code>new 클래스이름(...)</code>이 실제로 객체를 만들어요.',
          '"새로운"이라는 뜻의 영어 단어예요.'
        ),
        () => makeChoice(
          '자바에서 클래스 안에서 "지금 이 객체"를 가리키는 키워드는?',
          '<code>this</code>', ['<code>new</code>', '<code>self</code>', '<code>me</code>'],
          '자바는 파이썬의 self 대신 <code>this</code>를 써요.',
          '파이썬의 self와 같은 역할을 하는 자바 키워드예요.'
        ),
        () => {
          const start = randInt(1, 5);
          const times = randInt(2, 4);
          return {
            type: 'blank',
            q: `<code>class Counter { int count; Counter() { this.count = ${start}; } void increase() { this.count = this.count + 1; } }</code>일 때, <code>increase()</code>를 ${times}번 호출하면 <code>count</code>는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(start + times)], placeholder: '숫자',
            why: `${start}에서 시작해서 increase()를 ${times}번 호출하면 ${times}만큼 늘어서 ${start + times}가 돼요.`,
            hint: '시작값에서 increase()를 호출한 횟수만큼 1씩 늘려보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `<code>new</code>로 객체를 만들 때 자동으로 실행되는, 클래스 이름과 똑같은 이름을 가진 초기화 메서드를 무엇이라고 부르나요? (한글 두 글자)`,
          prefix: '', suffix: '', accept: ['생성자'], placeholder: '이름',
          why: '이 초기화 메서드를 <b>생성자</b>라고 불러요. 클래스와 이름이 같고 반환 타입이 없어요.',
          hint: '"객체를 생성하는 사람"이라는 뜻의 한글 단어예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>Dog</code>이라는 클래스를 만들어서 <code>String name;</code> 속성과, 생성자에서 <code>this.name</code>을 저장하고, <code>bark()</code> 메서드는 <code>System.out.println(this.name + ": 멍멍!");</code>을 실행하게 하는 클래스 전체 코드를 작성하세요.',
          starter: '',
          rows: 8,
          placeholder: 'class Dog {\n    String name;\n\n    Dog(String name) {\n        this.name = name;\n    }\n    void bark() {\n        System.out.println(this.name + ": 멍멍!");\n    }\n}',
          accept: ['class Dog {String name;Dog(String name) {this.name = name;}void bark() {System.out.println(this.name + ": 멍멍!");}}'],
          why: '생성자에서 name을 저장해두면, bark() 메서드 안의 this.name으로 그 값을 꺼내 쓸 수 있어요.',
          hint: 'class 안에 String name; 속성, 생성자, bark() 메서드를 각각 만들고 this.name으로 값을 이어주세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const bonus = randInt(1, 10);
        return {
          type: 'blank',
          q: `<code>class Player { String name; int score; Player(String name) { this.name = name; this.score = 0; } void add(int point) { this.score += point; } }</code>일 때, <code>Player p = new Player("${name}");</code> 후 <code>p.add(${bonus});</code>를 실행하고 <code>System.out.println(p.score);</code>를 하면 무엇이 출력될까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(bonus)], placeholder: '숫자',
          why: `score는 0에서 시작해서, <code>add(${bonus})</code>로 ${bonus}만큼 늘었으니 결과는 ${bonus}예요.`,
          hint: '생성자에서 score를 0으로 시작하고, add 메서드가 그 값을 늘려요.'
        };
      }
    },
    {
      id: 'error',
      title: '예외 처리',
      ready: true,
      summary: '오류가 나도 프로그램이 멈추지 않게 대비하는 try/catch를 배워요.',
      goals: ['try / catch', 'throw', 'finally', 'Exception'],
      blocks: [
        {
          h: '오류가 나도 안전하게: try / catch',
          html: `<p><code>try { ... }</code> 안의 코드에서 오류(예외)가 나면, 프로그램이 멈추는 대신 <code>catch (Exception e) { ... }</code> 부분이 실행돼요. <code>e</code>에는 오류 정보가 담겨요.</p>`,
          code: {
            label: 'TryCatch.java',
            src: `try {
    int result = 10 / 0;
    System.out.println(result);
} catch (ArithmeticException e) {
    System.out.println("오류 잡음: " + e.getMessage());
}`,
            out: `오류 잡음: / by zero`
          }
        },
        {
          h: '일부러 오류 던지기: throw',
          html: `<p>내 코드 안에서 "이건 잘못됐다"고 판단되면 <code>throw new RuntimeException("설명")</code>으로 직접 오류를 만들어 던질 수 있어요. 던져진 오류는 가장 가까운 <code>catch</code>가 잡아요.</p>`,
          code: {
            label: 'Throw.java',
            src: `static int checkAge(int age) {
    if (age < 0) {
        throw new RuntimeException("나이는 음수일 수 없어요");
    }
    return age;
}

try {
    checkAge(-5);
} catch (RuntimeException e) {
    System.out.println(e.getMessage());
}`,
            out: `나이는 음수일 수 없어요`
          }
        },
        {
          h: '항상 실행되는 finally',
          html: `<p><code>finally { ... }</code>는 오류가 나든 안 나든 <b>항상</b> 마지막에 실행돼요. 파일 닫기, 정리 작업 등에 자주 씁니다.</p>`,
          after: `<div class="note"><b>주의</b> — <code>catch</code>로 잡지 않은 예외는 프로그램을 그대로 멈추게 만들어요.</div>`
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
          '<code>catch (Exception e) { ... }</code>가 오류를 넘겨받아 처리해요.',
          '"붙잡다"라는 뜻의 영어 단어예요.'
        ),
        () => makeChoice(
          '내 코드에서 일부러 오류를 만들어 던지고 싶을 때 쓰는 키워드는?',
          '<code>throw</code>', ['<code>catch</code>', '<code>try</code>', '<code>new</code>'],
          '<code>throw new RuntimeException("설명")</code>으로 직접 오류를 던질 수 있어요.',
          '"던지다"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `오류가 나든 안 나든 항상 마지막에 실행되는 블록의 이름을 쓰세요.`,
          prefix: 'try { ... } catch (Exception e) { ... } ', suffix: ' { System.out.println("정리"); }', accept: ['finally'], placeholder: '블록 이름',
          why: '<code>finally</code>는 오류 여부와 상관없이 항상 실행돼요.',
          hint: '"마침내, 결국"이라는 뜻의 영어 단어예요.'
        }),
        () => {
          const msg = pick(['잘못된 값이에요', '범위를 벗어났어요', '입력이 비어있어요']);
          return {
            type: 'blank',
            q: `<code>try { throw new RuntimeException("${msg}"); } catch (RuntimeException e) { System.out.println(e.getMessage()); }</code>를 실행하면 무엇이 출력될까요? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [msg], placeholder: '출력될 문장',
            why: `<code>e.getMessage()</code>는 <code>throw new RuntimeException(...)</code>에 넣은 문자열 그대로 담겨있어요.`,
            hint: 'catch (e)의 e.getMessage()에는 throw할 때 넣은 문자열이 그대로 들어있어요.'
          };
        },
        () => ({
          type: 'code',
          q: '나이를 받아 음수면 <code>new RuntimeException("나이는 음수일 수 없어요")</code>를 던지는 메서드 <code>checkAge</code>를 만들고(<code>static int checkAge(int age)</code> 형태), <code>try/catch</code>로 <code>checkAge(-1)</code>을 호출해서 오류 메시지를 <code>e.getMessage()</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 10,
          placeholder: 'static int checkAge(int age) {\n    if (age < 0) {\n        throw new RuntimeException("나이는 음수일 수 없어요");\n    }\n    return age;\n}\n\ntry {\n    checkAge(-1);\n} catch (RuntimeException e) {\n    System.out.println(e.getMessage());\n}',
          accept: ['static int checkAge(int age) {if (age < 0) {throw new RuntimeException("나이는 음수일 수 없어요");}return age;}try {checkAge(-1);} catch (RuntimeException e) {System.out.println(e.getMessage());}'],
          why: 'checkAge(-1)은 나이가 음수라서 예외를 던지고, catch (RuntimeException e)가 그 오류를 잡아 e.getMessage()를 출력해요.',
          hint: 'if (age < 0) { throw new RuntimeException(...); }를 메서드 안에 쓰고, try/catch로 감싸서 호출하세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 20);
        const zero = Math.random() < 0.5;
        const b = zero ? 0 : randInt(1, 10);
        const result = zero ? '나눌 수 없어요' : String(Math.floor(a / b));
        return {
          type: 'blank',
          q: `메서드 <code>divide(int a, int b)</code>는 b가 0이면 <code>throw new RuntimeException("나눌 수 없어요")</code>를 던지고, 아니면 <code>a / b</code>를 반환해요. <code>try { System.out.println(divide(${a}, ${b})); } catch (RuntimeException e) { System.out.println(e.getMessage()); }</code>를 실행하면 무엇이 출력될까요? (따옴표 없이)`,
          prefix: '', suffix: '', accept: [result], placeholder: '출력될 값',
          why: zero
            ? `b가 0이라서 divide가 예외를 던지고, catch가 그 오류의 메시지 "나눌 수 없어요"를 출력해요.`
            : `b가 0이 아니라서 정상적으로 ${a} / ${b} = ${result}(정수 나눗셈)가 반환되고 그대로 출력돼요.`,
          hint: 'b가 0인지 아닌지에 따라 정상 결과가 나올지, catch로 잡힌 오류 메시지가 나올지 갈려요.'
        };
      }
    },
    {
      id: 'inherit',
      title: '상속과 인터페이스',
      ready: true,
      summary: '이미 만든 클래스를 물려받는 상속과, "이런 메서드는 꼭 있어야 한다"는 약속인 인터페이스를 배워요.',
      goals: ['클래스 상속(extends)', 'super()', '메서드 오버라이딩', '인터페이스(interface)'],
      blocks: [
        {
          h: '이미 있는 클래스를 물려받기: extends',
          html: `<p>완전히 새로운 클래스를 처음부터 만들지 않고, 이미 있는 클래스의 필드와 메서드를 그대로 물려받아서 시작할 수 있어요. <code>class 자식 extends 부모 { }</code> 형태로 씁니다.</p>`,
          code: {
            label: 'Extends.java',
            src: `class Animal {
    String name;
    Animal(String name) { this.name = name; }
    String sound() { return "..."; }
}

class Dog extends Animal {
    Dog(String name) { super(name); }
    String sound() { return "멍멍!"; }
}

Dog d = new Dog("초코");
System.out.println(d.name + " " + d.sound());`,
            out: `초코 멍멍!`
          }
        },
        {
          h: '부모의 생성자 호출하기: super()',
          html: `<p>자식 클래스의 생성자에서 <code>super(...)</code>를 호출하면 부모 클래스의 생성자가 실행돼요. 부모가 이미 해둔 초기화 작업을 그대로 재사용할 수 있어서 편해요. <code>super()</code>는 항상 생성자의 <b>첫 줄</b>에 와야 해요.</p>`
        },
        {
          h: '메서드는 다시 정의할 수 있어요: 오버라이딩',
          html: `<p><code>Dog</code>이 부모 <code>Animal</code>의 <code>sound()</code>를 자신만의 내용으로 다시 정의하는 걸 <b>오버라이딩(재정의)</b>이라고 해요. 그리고 "특정 메서드는 반드시 만들어야 한다"는 약속만 정해두고 싶을 땐 <code>interface</code>를 써요.</p>`,
          code: {
            label: 'Interface.java',
            src: `interface Soundable {
    String sound();
}

class Cat implements Soundable {
    public String sound() { return "야옹!"; }
}

Cat c = new Cat();
System.out.println(c.sound());`,
            out: `야옹!`
          },
          after: `<div class="note"><b>차이</b> — 상속(extends)은 부모의 코드까지 물려받지만, 인터페이스(implements)는 "이 메서드는 꼭 만들어라"는 약속(설계도)만 줘요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '이미 있는 클래스의 필드와 메서드를 물려받아 새 클래스를 만들 때 쓰는 키워드는?',
          '<code>extends</code>', ['<code>implements</code>', '<code>super</code>', '<code>new</code>'],
          '<code>class 자식 extends 부모</code>처럼 <code>extends</code>로 클래스를 상속받아요.',
          '"확장하다"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `자식 클래스의 생성자에서 부모 클래스의 생성자를 호출하려고 해요. 빈칸을 채우세요.`,
          prefix: 'Dog(String name) { ', suffix: '(name); }', accept: ['super'], placeholder: '키워드',
          why: '<code>super(...)</code>는 부모 클래스의 생성자를 호출해요.',
          hint: '"위, 상위"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '자식 클래스에서 부모 클래스의 메서드를 같은 이름으로 새로 정의하는 것을 무엇이라고 하나요?',
          '오버라이딩(재정의)', ['오버로딩', '캡슐화', '인스턴스화'],
          '부모의 메서드를 자식 클래스에서 다시 정의하는 걸 <b>오버라이딩</b>이라고 해요.',
          '"덮어쓰다, 다시 정의하다"라는 뜻이 담긴 단어예요.'
        ),
        () => makeChoice(
          '"이 메서드는 반드시 만들어야 한다"는 약속만 정해두는, 클래스가 아닌 것은?',
          '<code>interface</code>', ['<code>class</code>', '<code>static</code>', '<code>void</code>'],
          '<code>interface</code>는 메서드의 이름과 형태만 정해두고, 실제 내용은 구현하는 클래스가 채워요.',
          '실제 코드가 없는, 약속(규격)만 담은 것이에요.'
        ),
        () => {
          const cls = pick(['Dog', 'Cat', 'Bird']);
          return {
            type: 'blank',
            q: `<code>Animal</code>을 상속받는 <code>${cls}</code> 클래스를 만들려고 해요. 클래스 선언을 완성하세요.`,
            prefix: 'class ', suffix: ' {\n    ...\n}', accept: [`${cls} extends Animal`], placeholder: '클래스이름 extends 부모',
            why: `<code>class ${cls} extends Animal</code>처럼 <code>extends</code> 뒤에 부모 클래스 이름을 쓰면 상속받아요.`,
            hint: '클래스 이름 뒤에 extends와 물려받을 부모 클래스 이름을 순서대로 쓰면 돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>Animal</code> 클래스(필드 <code>String name;</code>, 생성자에서 <code>this.name = name;</code>)를 상속받는 <code>Cat</code> 클래스를 만드세요. 생성자는 <code>super(name)</code>을 호출하고, <code>sound()</code> 메서드는 <code>"야옹!"</code>을 반환하도록 오버라이딩하세요.',
          starter: '',
          rows: 4,
          placeholder: 'class Cat extends Animal {\n    Cat(String name) {\n        super(name);\n    }\n    String sound() {\n        return "야옹!";\n    }\n}',
          accept: ['class Cat extends Animal {Cat(String name) {super(name);}String sound() {return "야옹!";}}'],
          why: '<code>extends Animal</code>로 상속받고, 생성자에서 <code>super(name)</code>으로 부모의 초기화를 재사용한 뒤, <code>sound()</code>만 새로 정의(오버라이딩)해요.',
          hint: 'class Cat extends Animal { } 안에 생성자(super(name) 호출)와 sound() 메서드를 넣으세요.'
        }),
      ],
      boss: () => {
        const name = pick(['초코', '보리', '몽이']);
        return {
          type: 'blank',
          q: `<code>class Animal { String name; Animal(String name) { this.name = name; } String sound() { return "..."; } }</code>이고, <code>class Dog extends Animal { Dog(String name) { super(name); } String sound() { return "멍멍!"; } }</code>일 때, <code>Dog d = new Dog("${name}");</code> 후 <code>System.out.println(d.name + " " + d.sound());</code>를 실행하면 무엇이 출력될까요? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`${name} 멍멍!`], placeholder: '출력될 문장',
          why: `<code>super(name)</code>이 부모의 필드 <code>name</code>을 "${name}"으로 저장하고, <code>Dog</code>이 오버라이딩한 <code>sound()</code>는 "멍멍!"을 반환해요.`,
          hint: 'd.name은 부모 생성자가 저장한 값, d.sound()는 Dog이 새로 정의한 값이에요.'
        };
      }
    },
    {
      id: 'collections',
      title: '컬렉션 프레임워크',
      ready: true,
      summary: '배열보다 훨씬 유연하게 여러 값을 다루는 ArrayList와 HashMap을 배워요.',
      goals: ['ArrayList', 'HashMap', 'import java.util.*'],
      blocks: [
        {
          h: '크기가 자유롭게 늘어나는 목록: ArrayList',
          html: `<p>배열은 크기가 한 번 정해지면 바꿀 수 없었죠. <code>ArrayList</code>는 <code>add()</code>로 값을 넣을 때마다 자동으로 크기가 늘어나는 "유연한 배열"이에요. 쓰려면 맨 위에 <code>import java.util.ArrayList;</code>가 필요해요.</p>`,
          code: {
            label: 'ArrayList.java',
            src: `import java.util.ArrayList;

ArrayList<Integer> scores = new ArrayList<>();
scores.add(90);
scores.add(85);
scores.add(100);

System.out.println(scores.get(1));
System.out.println(scores.size());`,
            out: `85\n3`
          }
        },
        {
          h: '이름표로 값을 찾는 상자: HashMap',
          html: `<p><code>HashMap&lt;키자료형, 값자료형&gt;</code>은 "이름표(키)"로 값을 빠르게 찾아주는 상자예요. <code>put(키, 값)</code>으로 넣고, <code>get(키)</code>로 꺼내요. 자바스크립트의 객체, 파이썬의 딕셔너리와 같은 역할이에요.</p>`,
          code: {
            label: 'HashMap.java',
            src: `import java.util.HashMap;

HashMap<String, Integer> ages = new HashMap<>();
ages.put("지수", 17);
ages.put("민준", 16);

System.out.println(ages.get("지수"));`,
            out: `17`
          }
        },
        {
          h: '배열과 ArrayList, 뭐가 다를까?',
          html: `<p>배열(<code>int[]</code>)은 크기가 고정이고 빠르지만, <code>ArrayList</code>는 <code>add()</code>/<code>remove()</code>로 자유롭게 늘리고 줄일 수 있어요. "미리 몇 개가 들어올지 모를 때"는 <code>ArrayList</code>가 훨씬 편해요.</p>`,
          after: `<div class="note"><b>주의</b> — <code>ArrayList&lt;int&gt;</code>처럼 기본 자료형은 그대로 못 쓰고, <code>ArrayList&lt;Integer&gt;</code>처럼 "포장된" 자료형(Integer, String 등)을 써야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const items = shuffle([70, 80, 90, 100, 60]).slice(0, 4);
          const idx = randInt(0, items.length - 1);
          return {
            type: 'blank',
            q: `<code>ArrayList&lt;Integer&gt; scores = new ArrayList&lt;&gt;();</code>에 <code>${items.join(', ')}</code>을 순서대로 <code>add</code>했을 때, <code>scores.get(${idx})</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(items[idx])], placeholder: '숫자',
            why: `<code>get(${idx})</code>은 순번 ${idx}(0부터 시작)의 값을 가져와요. ${idx + 1}번째로 넣은 값인 ${items[idx]}예요.`,
            hint: 'ArrayList도 배열처럼 순번이 0부터 시작해요.'
          };
        },
        () => makeChoice(
          '배열과 달리, 크기가 자동으로 늘어나는 "유연한 목록"을 만들어주는 클래스는?',
          '<code>ArrayList</code>', ['<code>HashMap</code>', '<code>String</code>', '<code>Scanner</code>'],
          '<code>ArrayList</code>는 add()할 때마다 크기가 자동으로 늘어나는 목록이에요.',
          '배열(Array)에 "목록(List)"을 합친 이름이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>ArrayList</code>에 값을 추가하는 메서드를 쓰세요.`,
          prefix: 'scores.', suffix: '(90);', accept: ['add'], placeholder: '메서드 이름',
          why: '<code>add(값)</code>은 ArrayList의 맨 뒤에 값을 추가해요.',
          hint: '"더하다, 추가하다"라는 뜻의 영어 단어예요.'
        }),
        () => {
          const name = pick(['지수', '민준', '서연']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>HashMap&lt;String, Integer&gt; ages = new HashMap&lt;&gt;();</code>에 <code>ages.put("${name}", ${age});</code>를 실행한 뒤, <code>ages.get("${name}")</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(age)], placeholder: '숫자',
            why: `<code>put("${name}", ${age})</code>으로 저장한 값을 <code>get("${name}")</code>으로 그대로 꺼내요.`,
            hint: 'put으로 넣은 키와 똑같은 키로 get하면 그 값을 그대로 꺼낼 수 있어요.'
          };
        },
        () => makeChoice(
          'HashMap에서 "이름표(키)"로 값을 넣을 때 쓰는 메서드는?',
          '<code>put</code>', ['<code>add</code>', '<code>get</code>', '<code>set</code>'],
          '<code>put(키, 값)</code>으로 HashMap에 값을 저장해요.',
          '"놓다, 넣다"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>ArrayList&lt;Integer&gt; nums</code>를 만들고, <code>10</code>, <code>20</code>, <code>30</code>을 순서대로 <code>add</code>한 뒤, <code>nums.size()</code>를 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'ArrayList<Integer> nums = new ArrayList<>();\nnums.add(10);\nnums.add(20);\nnums.add(30);\nSystem.out.println(nums.size());',
          accept: ['ArrayList<Integer> nums = new ArrayList<>();nums.add(10);nums.add(20);nums.add(30);System.out.println(nums.size());'],
          why: '값 3개를 add했으니 nums.size()는 3이에요.',
          hint: 'new ArrayList<>()로 만들고, add를 세 번 호출한 뒤 size()를 출력하세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>HashMap&lt;String, Integer&gt; ages = new HashMap&lt;&gt;();</code>이고 <code>ArrayList&lt;String&gt; names = new ArrayList&lt;&gt;();</code>일 때, <code>names.add("${name}"); ages.put("${name}", ${age});</code>를 실행한 뒤, <code>ages.get(names.get(0))</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(age)], placeholder: '숫자',
          why: `<code>names.get(0)</code>은 ArrayList에 첫 번째로 넣은 이름 "${name}"이고, <code>ages.get("${name}")</code>은 HashMap에 저장해둔 ${age}예요.`,
          hint: '먼저 names.get(0)이 어떤 이름인지 구하고, 그 이름으로 ages에서 값을 찾아보세요.'
        };
      }
    },
    {
      id: 'generics',
      title: '제네릭(Generics)',
      ready: true,
      summary: '자료형을 나중에 정할 수 있게 해주는 제네릭을 배워요. 사실 ArrayList도 제네릭으로 만들어졌어요.',
      goals: ['제네릭 클래스', '<T> 타입 매개변수', 'ArrayList도 제네릭'],
      blocks: [
        {
          h: '자료형을 나중에 정하는 클래스: 제네릭',
          html: `<p>같은 모양의 클래스를 자료형만 바꿔서 여러 번 만들고 싶을 때, <code>&lt;T&gt;</code>(타입 매개변수)를 쓰면 "이 클래스 안에서 T는 나중에 정해질 자료형"이라는 뜻이 돼요. <code>Box&lt;Integer&gt;</code>, <code>Box&lt;String&gt;</code>처럼 원하는 자료형을 골라 쓸 수 있어요.</p>`,
          code: {
            label: 'Box.java',
            src: `class Box<T> {
    T value;
    void set(T value) {
        this.value = value;
    }
    T get() {
        return value;
    }
}

Box<Integer> intBox = new Box<>();
intBox.set(10);
System.out.println(intBox.get());`,
            out: `10`
          }
        },
        {
          h: '같은 클래스, 다른 자료형',
          html: `<p>같은 <code>Box</code> 클래스인데, <code>Box&lt;String&gt;</code>으로 쓰면 문자열을, <code>Box&lt;Integer&gt;</code>로 쓰면 정수를 담을 수 있어요. 클래스 코드는 <b>한 번만</b> 짜면 되고, 담을 자료형만 그때그때 바꿔서 재사용해요.</p>`,
          code: {
            label: 'BoxString.java',
            src: `Box<String> strBox = new Box<>();
strBox.set("안녕");
System.out.println(strBox.get());`,
            out: `안녕`
          }
        },
        {
          h: '사실 ArrayList도 제네릭이었어요',
          html: `<p><code>ArrayList&lt;Integer&gt;</code>, <code>ArrayList&lt;String&gt;</code>도 똑같은 <code>ArrayList</code> 클래스를 제네릭으로 만든 거예요. <code>&lt;Integer&gt;</code> 자리에 넣은 자료형이 바로 <code>T</code>에 해당해요.</p>`,
          after: `<div class="note"><b>정리</b> — 제네릭 덕분에 "정수 상자", "문자열 상자"를 따로따로 만들 필요 없이, "상자" 하나만 만들고 자료형만 바꿔 끼우면 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '클래스 안에서 "나중에 정해질 자료형"을 나타낼 때 쓰는 표기는?',
          '<code>&lt;T&gt;</code>', ['<code>[T]</code>', '<code>(T)</code>', '<code>{T}</code>'],
          '<code>&lt;T&gt;</code>(꺾쇠괄호)는 타입 매개변수를 나타내요.',
          '자료형을 지정할 때 ArrayList 뒤에도 이 괄호를 쓰죠.'
        ),
        () => {
          const val = randInt(1, 100);
          return {
            type: 'blank',
            q: `<code>class Box&lt;T&gt; { T value; void set(T value) { this.value = value; } T get() { return value; } }</code>이고 <code>Box&lt;Integer&gt; box = new Box&lt;&gt;();</code> 후 <code>box.set(${val});</code>를 실행하면, <code>box.get()</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(val)], placeholder: '숫자',
            why: `<code>set(${val})</code>로 저장한 값을 <code>get()</code>이 그대로 돌려줘요.`,
            hint: 'set으로 넣은 값을 get이 그대로 꺼내줘요.'
          };
        },
        () => makeChoice(
          '<code>ArrayList&lt;Integer&gt;</code>와 <code>ArrayList&lt;String&gt;</code>의 관계로 옳은 것은?',
          '같은 ArrayList 클래스를 서로 다른 자료형으로 사용한 것', ['서로 완전히 다른 클래스다', 'Integer용 ArrayList가 원본이다', '자동으로 서로 변환된다'],
          '둘 다 같은 제네릭 클래스 <code>ArrayList&lt;T&gt;</code>를 T 자리에 다른 자료형을 넣어 쓴 것뿐이에요.',
          'ArrayList는 원래 제네릭으로 만들어진 클래스라는 걸 떠올려보세요.'
        ),
        () => {
          const word = pick(['안녕', '반가워', '고마워']);
          return {
            type: 'blank',
            q: `<code>Box&lt;String&gt; box = new Box&lt;&gt;();</code>를 선언하려고 해요. 꺾쇠괄호 안에 들어갈 자료형을 쓰세요. (문자열 "${word}"를 담을 예정이에요)`,
            prefix: 'Box<', suffix: '> box = new Box<>();', accept: ['String'], placeholder: '자료형',
            why: `문자열을 담을 것이므로 <code>Box&lt;String&gt;</code>처럼 자료형 자리에 <code>String</code>을 넣어요.`,
            hint: '담고 싶은 값의 자료형을 꺾쇠괄호 안에 그대로 쓰면 돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '자료형 <code>T</code>를 가지는 제네릭 클래스 <code>Box</code>를 만드세요. 필드 <code>T value;</code>, <code>set(T value)</code> 메서드(<code>this.value = value;</code>), <code>get()</code> 메서드(<code>return value;</code>)를 가져야 해요.',
          starter: '',
          rows: 5,
          placeholder: 'class Box<T> {\n    T value;\n    void set(T value) {\n        this.value = value;\n    }\n    T get() {\n        return value;\n    }\n}',
          accept: ['class Box<T> {T value;void set(T value) {this.value = value;}T get() {return value;}}'],
          why: '<code>class Box&lt;T&gt;</code>로 타입 매개변수를 선언하고, 그 T를 필드와 메서드에서 그대로 사용해요.',
          hint: 'class Box<T> { } 안에 T value;, set(T value), get() 메서드를 순서대로 넣으세요.'
        }),
      ],
      boss: () => {
        const val1 = randInt(1, 50);
        const word = pick(['지수', '민준', '서연']);
        return {
          type: 'blank',
          q: `<code>class Box&lt;T&gt; { T value; void set(T value) { this.value = value; } T get() { return value; } }</code>일 때, <code>Box&lt;Integer&gt; intBox = new Box&lt;&gt;(); intBox.set(${val1});</code>과 <code>Box&lt;String&gt; strBox = new Box&lt;&gt;(); strBox.set("${word}");</code>를 실행한 뒤, <code>System.out.println(intBox.get() + " " + strBox.get());</code>를 실행하면 무엇이 출력될까요? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`${val1} ${word}`], placeholder: '출력될 문장',
          why: `같은 <code>Box</code> 클래스를 <code>Integer</code>와 <code>String</code> 두 가지 자료형으로 각각 사용해서, intBox.get()은 ${val1}, strBox.get()은 "${word}"를 돌려줘요.`,
          hint: '같은 클래스라도 <T>에 넣은 자료형에 따라 서로 다른 값을 담을 수 있어요.'
        };
      }
    },
    {
      id: 'lambdaExpr',
      title: '람다와 함수형 인터페이스',
      ready: true,
      summary: '메서드가 하나뿐인 인터페이스를 훨씬 간결하게 구현하는 람다 표현식을 배워요.',
      goals: ['함수형 인터페이스가 뭔지', '람다 표현식 문법', 'Runnable로 실습하기'],
      blocks: [
        {
          h: '메서드 하나짜리 인터페이스: 함수형 인터페이스',
          html: `<p>추상 메서드가 <b>딱 하나뿐인</b> 인터페이스를 <b>함수형 인터페이스</b>라고 불러요. 이런 인터페이스는 람다로 아주 간결하게 구현할 수 있어요.</p>`,
          code: {
            label: 'Greeter.java',
            src: `interface Greeter {
    void greet(String name);
}`
          }
        },
        {
          h: '람다로 간결하게 구현하기',
          html: `<p><code>(매개변수) -&gt; { 실행할 코드 }</code> 형태의 <b>람다 표현식</b>으로, 이름 없는 클래스를 길게 안 써도 함수형 인터페이스를 바로 구현할 수 있어요.</p>`,
          code: {
            label: 'lambda_basic.java',
            src: `Greeter greeter = (name) -> System.out.println("안녕, " + name);
greeter.greet("지수");`,
            out: `안녕, 지수`
          }
        },
        {
          h: '자주 쓰는 함수형 인터페이스: Runnable',
          html: `<p><code>Runnable</code>은 매개변수도 반환값도 없는 <code>run()</code> 메서드 하나를 가진, 자바에 이미 준비된 함수형 인터페이스예요.</p>`,
          code: {
            label: 'runnable_lambda.java',
            src: `Runnable task = () -> System.out.println("실행!");
task.run();`,
            out: `실행!`
          },
          after: `<div class="note"><b>기억하기</b> — 매개변수가 없으면 <code>()</code>, 하나면 괄호를 생략할 수도 있어요. 화살표 오른쪽엔 실행할 코드를 써요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '추상 메서드가 딱 하나뿐인 인터페이스를 부르는 이름은?',
          '함수형 인터페이스', ['제네릭 인터페이스', '컬렉션 인터페이스', '정적 인터페이스'],
          '메서드가 하나뿐인 인터페이스를 함수형 인터페이스라고 불러요.',
          '람다로 구현할 수 있는 인터페이스의 조건이에요.'
        ),
        () => ({
          type: 'blank',
          q: `람다 표현식에서 매개변수와 실행할 코드를 구분하는 기호를 쓰세요. (예: <code>name ${'{이것}'} System.out.println(name)</code>)`,
          prefix: '', suffix: '', accept: ['->'], placeholder: '기호',
          why: '<code>-&gt;</code>(화살표)로 매개변수와 실행할 코드를 구분해요.',
          hint: '빼기(-)와 부등호(>)를 붙여 만드는 화살표 모양이에요.'
        }),
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>Greeter greeter = (name) -&gt; System.out.println("안녕, " + name);</code>일 때, <code>greeter.greet("${name}")</code>를 실행하면 무엇이 출력될까요?`,
            prefix: '', suffix: '', accept: [`안녕, ${name}`], placeholder: '출력될 문장',
            why: `람다의 name 자리에 "${name}"이 들어가서 "안녕, ${name}"이 출력돼요.`,
            hint: '람다의 매개변수 자리에 넘긴 값이 그대로 들어간다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          '<code>Runnable</code> 인터페이스의 특징으로 알맞은 것은?',
          '매개변수도 반환값도 없는 run() 메서드 하나를 가진 함수형 인터페이스', ['매개변수를 여러 개 받아야 한다', '반환값이 항상 있어야 한다', '클래스 전용이라 인터페이스가 아니다'],
          'Runnable은 run() 메서드 하나만 가진 함수형 인터페이스예요.',
          '람다로 구현할 수 있다는 건 메서드가 하나뿐이라는 뜻이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Runnable</code> 타입의 변수 <code>task</code>에, <code>"안녕하세요"</code>를 출력하는 람다를 대입하고 <code>run()</code>을 호출하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'Runnable task = () -> System.out.println("안녕하세요");\ntask.run();',
          accept: ['Runnable task = () -> System.out.println("안녕하세요");task.run();'],
          why: '() -> { ... } 형태의 람다를 Runnable 변수에 대입하고 run()으로 실행해요.',
          hint: 'Runnable task = () -> System.out.println("안녕하세요"); 다음 줄에 task.run();을 쓰세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 20), b = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>interface Calculator { int calc(int a, int b); }</code>일 때, <code>Calculator adder = (a, b) -&gt; a + b;</code>로 만들고 <code>adder.calc(${a}, ${b})</code>를 실행하면 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
          why: `람다 (a, b) -> a + b가 ${a} + ${b} = ${a + b}를 계산해서 반환해요.`,
          hint: '람다 본문이 두 매개변수를 더한 값을 반환한다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'streamApi',
      title: 'Stream API',
      ready: true,
      summary: '컬렉션의 값들을 필터링하고, 변환하고, 다시 모으는 걸 파이프라인처럼 이어 쓰는 Stream API를 배워요.',
      goals: ['stream()으로 스트림 만들기', 'filter/map으로 가공하기', 'collect와 reduce로 결과 만들기'],
      blocks: [
        {
          h: '조건에 맞는 것만 골라내기: filter',
          html: `<p><code>리스트.stream()</code>으로 스트림을 만들고, <code>.filter(조건)</code>로 조건에 맞는 값만 남길 수 있어요. <code>.collect(Collectors.toList())</code>로 다시 리스트로 모아요.</p>`,
          code: {
            label: 'stream_filter.java',
            src: `List<Integer> nums = List.of(1, 2, 3, 4, 5);
List<Integer> evens = nums.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());
System.out.println(evens);`,
            out: `[2, 4]`
          }
        },
        {
          h: '각 값을 변환하기: map',
          html: `<p><code>.map(함수)</code>는 스트림의 각 값을 원하는 형태로 바꿔줘요.</p>`,
          code: {
            label: 'stream_map.java',
            src: `List<Integer> squares = nums.stream()
    .map(n -> n * n)
    .collect(Collectors.toList());
System.out.println(squares);`,
            out: `[1, 4, 9, 16, 25]`
          }
        },
        {
          h: '하나의 값으로 모으기: reduce',
          html: `<p><code>.reduce(초기값, (누적값, 다음값) -&gt; ...)</code>은 스트림의 모든 값을 순서대로 하나로 누적시켜요.</p>`,
          code: {
            label: 'stream_reduce.java',
            src: `int sum = nums.stream().reduce(0, (a, b) -> a + b);
System.out.println(sum);`,
            out: `15`
          }
        }
      ],
      quizGenerators: [
        () => {
          const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8]).slice(0, randInt(4, 6));
          const evens = nums.filter(n => n % 2 === 0);
          return {
            type: 'blank',
            q: `<code>List.of(${nums.join(', ')})</code>에서 <code>.filter(n -&gt; n % 2 == 0)</code>로 걸러낸 결과를 대괄호 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`[${evens.join(', ')}]`], placeholder: '[숫자, ...]',
            why: `짝수만 남기면 [${evens.join(', ')}]이 돼요.`,
            hint: '짝수(2로 나눈 나머지가 0)만 골라보세요.'
          };
        },
        () => {
          const nums = Array.from({ length: randInt(3, 4) }, () => randInt(1, 8));
          const squares = nums.map(n => n * n);
          return {
            type: 'blank',
            q: `<code>List.of(${nums.join(', ')})</code>에 <code>.map(n -&gt; n * n)</code>을 적용한 결과를 대괄호 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`[${squares.join(', ')}]`], placeholder: '[숫자, ...]',
            why: `각 값을 제곱하면 [${squares.join(', ')}]이 돼요.`,
            hint: '각 숫자를 순서대로 제곱해보세요.'
          };
        },
        () => {
          const nums = Array.from({ length: randInt(3, 5) }, () => randInt(1, 20));
          const sum = nums.reduce((a, b) => a + b, 0);
          return {
            type: 'blank',
            q: `<code>List.of(${nums.join(', ')})</code>에 <code>.stream().reduce(0, (a, b) -&gt; a + b)</code>를 적용한 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
            why: `0에서 시작해서 모든 값을 순서대로 더하면 ${sum}이에요.`,
            hint: '초기값 0에서 시작해 모든 값을 누적해서 더한다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          '스트림 처리 결과를 다시 List로 모으고 싶을 때 쓰는 것은?',
          '<code>.collect(Collectors.toList())</code>', ['<code>.toArray()</code>만 가능하다', '<code>.map()</code>을 다시 부르면 된다', '자동으로 List가 된다'],
          '<code>.collect(Collectors.toList())</code>로 스트림 결과를 다시 List로 모아요.',
          '스트림은 List 자체가 아니라서, 최종적으로 다시 "모으는" 과정이 필요해요.'
        ),
        () => ({
          type: 'code',
          q: 'List.of(1, 2, 3, 4, 5, 6)에서 3보다 큰 값만 걸러서 List로 모으는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'List<Integer> result = List.of(1, 2, 3, 4, 5, 6).stream()\n    .filter(n -> n > 3)\n    .collect(Collectors.toList());',
          accept: ['List<Integer> result = List.of(1, 2, 3, 4, 5, 6).stream().filter(n -> n > 3).collect(Collectors.toList());'],
          why: '.stream()으로 스트림을 만들고 .filter(조건)으로 걸러낸 뒤 .collect(Collectors.toList())로 모아요.',
          hint: '.stream().filter(n -> n > 3).collect(Collectors.toList())를 이어 쓰세요.'
        }),
      ],
      boss: () => {
        const nums = Array.from({ length: randInt(4, 6) }, () => randInt(1, 10));
        const result = nums.filter(n => n % 2 === 0).map(n => n * n).reduce((a, b) => a + b, 0);
        return {
          type: 'blank',
          q: `<code>List.of(${nums.join(', ')})</code>에 <code>.stream().filter(n -&gt; n % 2 == 0).map(n -&gt; n * n).reduce(0, (a, b) -&gt; a + b)</code>를 적용하면 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
          why: `짝수만 골라서(${nums.filter(n => n % 2 === 0).join(', ') || '없음'}) 각각 제곱한 뒤 다 더하면 ${result}이에요.`,
          hint: 'filter로 짝수만 남기고, map으로 제곱한 뒤, reduce로 다 더한다는 순서대로 계산해보세요.'
        };
      }
    },
    {
      id: 'optionalType',
      title: 'Optional로 null 안전하게 다루기',
      ready: true,
      summary: '값이 없을 수도 있다는 걸 타입으로 명시해서, NullPointerException을 줄여주는 Optional을 배워요.',
      goals: ['Optional이 뭔지', 'isPresent/get으로 확인하기', 'orElse로 기본값 정하기'],
      blocks: [
        {
          h: '값이 없을 수도 있다는 걸 명시하기: Optional',
          html: `<p><code>Optional&lt;T&gt;</code>은 "값이 있을 수도, 없을 수도 있다"는 걸 타입 자체로 표현해요. <code>Optional.of(값)</code>으로 값이 있는 Optional을 만들어요.</p>`,
          code: {
            label: 'optional_basic.java',
            src: `Optional<String> name = Optional.of("지수");
System.out.println(name.isPresent());
System.out.println(name.get());`,
            out: `true\n지수`
          }
        },
        {
          h: '값이 없을 때: Optional.empty()',
          html: `<p><code>Optional.empty()</code>는 값이 없는 상태를 나타내요.</p>`,
          code: {
            label: 'optional_empty.java',
            src: `Optional<String> empty = Optional.empty();
System.out.println(empty.isPresent());`,
            out: `false`
          }
        },
        {
          h: '없으면 기본값 쓰기: orElse',
          html: `<p><code>.orElse(기본값)</code>은 값이 있으면 그 값을, 없으면(empty면) 기본값을 돌려줘요. <code>.get()</code>은 값이 없을 때 오류가 나지만, <code>orElse</code>는 안전해요.</p>`,
          code: {
            label: 'optional_orelse.java',
            src: `String result = empty.orElse("기본값");
System.out.println(result);`,
            out: `기본값`
          }
        }
      ],
      quizGenerators: [
        () => {
          const has = Math.random() < 0.5;
          return {
            type: 'blank',
            q: `<code>Optional&lt;String&gt; opt = ${has ? 'Optional.of("지수")' : 'Optional.empty()'};</code>일 때, <code>opt.isPresent()</code>의 결과는? (<code>true</code> 또는 <code>false</code>)`,
            prefix: '', suffix: '', accept: [String(has)], placeholder: 'true 또는 false',
            why: has ? '값이 있으니 true예요.' : '값이 없으니(empty) false예요.',
            hint: 'isPresent()는 값이 있는지 없는지를 알려줘요.'
          };
        },
        () => {
          const has = Math.random() < 0.5;
          const value = pick(['민준', '서연']);
          return {
            type: 'blank',
            q: `<code>Optional&lt;String&gt; opt = ${has ? `Optional.of("${value}")` : 'Optional.empty()'};</code>일 때, <code>opt.orElse("기본값")</code>의 결과는? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [has ? value : '기본값'], placeholder: '값',
            why: has ? `값이 있으니 그 값 "${value}"가 그대로 나와요.` : '값이 없으니 orElse의 기본값 "기본값"이 나와요.',
            hint: 'orElse는 값이 있으면 그 값을, 없으면 기본값을 돌려줘요.'
          };
        },
        () => ({
          type: 'blank',
          q: `값이 있는 Optional을 만드는 정적 메서드를 쓰세요.`,
          prefix: 'Optional<String> name = Optional.', suffix: '("지수");', accept: ['of'], placeholder: '메서드 이름',
          why: '<code>Optional.of(값)</code>은 그 값을 담은 Optional을 만들어요.',
          hint: '"~의"라는 뜻처럼, 그 값을 담은 Optional을 만든다는 의미예요.'
        }),
        () => makeChoice(
          'Optional을 쓰면 좋은 이유는?',
          '값이 없을 수도 있다는 걸 타입으로 명시해서, NullPointerException을 줄일 수 있어서',
          ['실행 속도가 항상 빨라져서', 'null을 아예 못 쓰게 강제로 막아줘서', 'Optional 없이는 변수를 선언할 수 없어서'],
          'Optional은 "값이 없을 수도 있음"을 명시적으로 드러내서, 확인 없이 값을 쓰다가 생기는 오류를 줄여줘요.',
          '자바에서 null을 다루다가 자주 나는 오류(NullPointerException)를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Optional&lt;Integer&gt; score</code>가 있을 때, 값이 있으면 그 값을, 없으면 <code>0</code>을 result에 담는 코드를 작성하세요.',
          starter: '',
          placeholder: 'int result = score.orElse(0);',
          accept: ['int result = score.orElse(0);'],
          why: '.orElse(0)은 값이 없을 때 0을 기본값으로 써요.',
          hint: 'score.orElse(0)을 result에 대입하세요.'
        }),
      ],
      boss: () => {
        const has = Math.random() < 0.5;
        const score = randInt(60, 100);
        return {
          type: 'blank',
          q: `<code>Optional&lt;Integer&gt; opt = ${has ? `Optional.of(${score})` : 'Optional.empty()'};</code>일 때, <code>int result = opt.orElse(0); System.out.println(result + 10);</code>를 실행하면 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [has ? String(score + 10) : '10'], placeholder: '숫자',
          why: has ? `값이 있으니 result는 ${score}, 거기에 10을 더하면 ${score + 10}이에요.` : `값이 없으니 result는 0, 거기에 10을 더하면 10이에요.`,
          hint: 'orElse로 얻은 값에 10을 더한다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'tryWithResources',
      title: 'try-with-resources',
      ready: true,
      summary: '파일이나 연결 같은 자원을 안전하게, 자동으로 정리해주는 try-with-resources 문법을 배워요.',
      goals: ['자원을 자동으로 정리하기', 'AutoCloseable이 뭔지', '기존 finally 방식과 비교'],
      blocks: [
        {
          h: '자원을 자동으로 닫아주기: try-with-resources',
          html: `<p><code>try (자원 선언) { ... }</code> 형태로 쓰면, <code>try</code> 블록이 끝날 때(정상이든 예외든) <b>자동으로</b> 그 자원의 <code>close()</code>가 호출돼요.</p>`,
          code: {
            label: 'try_with_resources.java',
            src: `try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {
    System.out.println(reader.readLine());
} catch (IOException e) {
    System.out.println("읽기 실패");
}`
          }
        },
        {
          h: '자동으로 닫히려면: AutoCloseable',
          html: `<p><code>close()</code> 메서드를 가진(<code>AutoCloseable</code>을 구현한) 클래스만 <code>try(...)</code> 괄호 안에 쓸 수 있어요. <code>BufferedReader</code>, <code>Scanner</code> 같은 클래스는 이미 구현돼 있어요.</p>`
        },
        {
          h: '예전 방식과 비교: finally',
          html: `<p>예전에는 <code>finally</code> 블록에서 직접 <code>close()</code>를 불러야 했고, <code>null</code> 체크까지 신경 써야 해서 코드가 길고 실수하기 쉬웠어요.</p>`,
          code: {
            label: 'old_finally.java',
            src: `BufferedReader reader = null;
try {
    reader = new BufferedReader(new FileReader("data.txt"));
} finally {
    if (reader != null) reader.close();
}`
          },
          after: `<div class="note"><b>기억하기</b> — try-with-resources는 훨씬 짧고, close() 호출을 깜빡할 위험도 없어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `자원을 자동으로 정리해주는 try문에서, 자원 선언은 <code>try</code> 뒤 어떤 문장 부호 안에 쓸까요?`,
          prefix: 'try ', suffix: ' { ... }', accept: ['()', '(자원 선언)'], placeholder: '기호',
          why: '<code>try (자원 선언) { ... }</code>처럼 소괄호 안에 자원을 선언해요.',
          hint: '함수 호출할 때 쓰는 그 괄호예요.'
        }),
        () => makeChoice(
          'try(...) 괄호 안에 넣을 수 있는 자원의 조건은?',
          'close() 메서드를 가진(AutoCloseable을 구현한) 클래스여야 한다', ['아무 클래스나 다 가능하다', 'static 클래스여야 한다', 'private 클래스여야만 한다'],
          'AutoCloseable을 구현해서 close() 메서드가 있는 클래스만 try(...) 괄호 안에 쓸 수 있어요.',
          '자동으로 "닫을" 수 있어야 한다는 조건을 생각해보세요.'
        ),
        () => makeChoice(
          'try-with-resources를 쓰면 좋은 점은?',
          'close() 호출을 깜빡할 위험 없이, 자원이 자동으로 정리돼서', ['실행 속도가 항상 2배 빨라져서', '예외가 아예 발생하지 않아서', 'catch 블록을 아예 안 써도 돼서'],
          'try 블록이 끝나면 자동으로 close()가 호출돼서, 자원 정리를 깜빡하는 실수를 막아줘요.',
          '예전 finally 방식과 비교했을 때 무엇이 간단해졌는지 생각해보세요.'
        ),
        () => makeChoice(
          '예전 방식(finally에서 직접 close())의 단점은?',
          'null 체크와 close() 호출을 직접 챙겨야 해서 코드가 길고 실수하기 쉽다', ['finally 블록을 아예 쓸 수 없다', '예외가 절대 안 잡힌다', 'close()를 여러 번 불러야 한다'],
          'finally에서 직접 null 체크와 close()를 챙겨야 해서 코드가 길어지고, 깜빡하기 쉬워요.',
          'try-with-resources가 이 문제를 어떻게 해결했는지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Scanner</code>를 try-with-resources로 열어서, 한 줄을 읽고 출력하는 코드를 작성하세요. (System.in을 사용, catch는 생략 가능하다고 가정)',
          starter: '',
          rows: 3,
          placeholder: 'try (Scanner sc = new Scanner(System.in)) {\n    System.out.println(sc.nextLine());\n}',
          accept: ['try (Scanner sc = new Scanner(System.in)) {System.out.println(sc.nextLine());}'],
          why: 'try(Scanner sc = new Scanner(System.in)) { ... }로 Scanner를 열면 자동으로 닫혀요.',
          hint: 'try (Scanner sc = new Scanner(System.in)) { } 안에 sc.nextLine()을 출력하세요.'
        }),
      ],
      boss: () => makeChoice(
        '자원을 여는 코드와 닫는 코드 사이에서 예외가 발생해도, 그 자원이 확실히 닫히도록 보장하고 싶어요. 가장 안전하고 간결한 방법은?',
        'try-with-resources를 쓴다', ['try 없이 그냥 순서대로 코드를 쓴다', 'close()를 두 번 부른다', '예외가 안 나길 바란다'],
        'try-with-resources는 예외가 나든 안 나든 자원을 자동으로 닫아줘서, 이런 상황에 가장 안전해요.',
        '"예외가 나도 확실히 닫히게"라는 요구사항이 try-with-resources의 핵심 장점이에요.'
      )
    },
    {
      id: 'threadsBasics',
      title: '멀티스레딩: Thread와 Runnable',
      ready: true,
      summary: '여러 작업을 동시에 실행하는 스레드를 만들고 다루는 기본을 배워요.',
      goals: ['Thread로 새 스레드 만들기', 'Runnable로 실행할 작업 정의하기', 'start()와 join()'],
      blocks: [
        {
          h: '별도의 실행 흐름 만들기: Thread',
          html: `<p><code>new Thread(람다)</code>로 새 스레드를 만들고, <code>.start()</code>를 부르면 그 코드가 <b>별도의 실행 흐름</b>에서 실행돼요.</p>`,
          code: {
            label: 'thread_basic.java',
            src: `Thread t = new Thread(() -> {
    System.out.println("스레드 실행 중");
});
t.start();`,
            out: `스레드 실행 중`
          }
        },
        {
          h: '다른 스레드가 끝나길 기다리기: join()',
          html: `<p><code>.join()</code>은 그 스레드가 끝날 때까지 기다려요. 여러 스레드를 <code>start()</code>한 뒤, 결과가 다 필요한 시점에 각각 <code>join()</code>을 불러요.</p>`,
          code: {
            label: 'thread_join.java',
            src: `Thread t1 = new Thread(() -> System.out.println("A"));
Thread t2 = new Thread(() -> System.out.println("B"));
t1.start();
t2.start();
t1.join();
t2.join();`
          }
        },
        {
          h: '흔한 실수: start()와 run()의 차이',
          html: `<p><code>.start()</code>는 진짜 새 스레드를 만들어서 실행하지만, <code>.run()</code>을 직접 부르면 <b>그냥 평범한 메서드 호출</b>이라 새 스레드가 전혀 안 생겨요. 처음 배울 때 정말 자주 하는 실수예요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `람다로 만든 작업을 실행할 새 Thread를 만드는 코드를 완성하세요.`,
          prefix: 'Thread t = ', suffix: '(() -> System.out.println("실행"));', accept: ['new Thread'], placeholder: '코드',
          why: '<code>new Thread(람다)</code>로 새 스레드를 만들어요.',
          hint: 'new 키워드 뒤에 Thread를 붙이세요.'
        }),
        () => ({
          type: 'blank',
          q: `Thread를 실제로 새 스레드에서 실행시키는 메서드를 쓰세요.`,
          prefix: 't.', suffix: '();', accept: ['start'], placeholder: '메서드 이름',
          why: '<code>.start()</code>는 진짜 새 스레드에서 코드를 실행해요.',
          hint: '"시작하다"라는 뜻 그대로예요.'
        }),
        () => makeChoice(
          '<code>t.start()</code> 대신 실수로 <code>t.run()</code>을 직접 부르면 어떻게 될까요?',
          '새 스레드가 안 생기고, 그냥 평범한 메서드처럼 현재 스레드에서 실행된다',
          ['start()와 완전히 똑같이 동작한다', '오류가 나서 프로그램이 멈춘다', '스레드가 2개 생긴다'],
          'run()을 직접 부르면 새 스레드 없이, 그냥 그 자리에서 순서대로 실행돼요.',
          '"시작하다(start)"와 "그냥 실행하다(run)"의 차이를 생각해보세요.'
        ),
        () => makeChoice(
          '여러 스레드를 시작시킨 뒤, 그 스레드들이 모두 끝날 때까지 기다리고 싶을 때 쓰는 메서드는?',
          '<code>.join()</code>', ['<code>.start()</code>', '<code>.wait()</code>만 가능', '<code>.stop()</code>'],
          '<code>.join()</code>은 그 스레드가 끝날 때까지 기다려줘요.',
          '"함께하다, 합류하다"라는 뜻이지만, 여기선 "끝날 때까지 기다린다"는 의미로 써요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"작업 완료"</code>를 출력하는 람다로 새 Thread <code>t</code>를 만들고, <code>start()</code>로 실행한 뒤 <code>join()</code>으로 기다리는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'Thread t = new Thread(() -> System.out.println("작업 완료"));\nt.start();\nt.join();',
          accept: ['Thread t = new Thread(() -> System.out.println("작업 완료"));t.start();t.join();'],
          why: 'new Thread(람다)로 만들고 start()로 실행, join()으로 끝날 때까지 기다려요.',
          hint: 'new Thread(...) 후 t.start();, t.join();을 순서대로 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '메인 코드가 계산을 이어가기 전에, 백그라운드 스레드 t가 만든 결과가 반드시 준비돼 있어야 해요. t.start() 다음에 무엇을 꼭 불러야 할까요?',
        't.join()', ['t.run()', 't.stop()', '아무것도 안 불러도 된다'],
        't.join()으로 그 스레드가 끝날 때까지 기다려야, 이후 코드에서 그 결과가 확실히 준비돼 있어요.',
        'join() 없이 진행하면 스레드가 아직 안 끝났을 수도 있다는 걸 생각해보세요.'
      )
    },
    {
      id: 'synchronizedKeyword',
      title: 'synchronized와 동시성 문제',
      ready: true,
      summary: '여러 스레드가 같은 값을 동시에 바꿀 때 생기는 문제와, synchronized로 안전하게 만드는 법을 배워요.',
      goals: ['경쟁 상태(Race Condition)가 뭔지', 'synchronized로 안전하게 만들기', '언제 synchronized가 필요한지'],
      blocks: [
        {
          h: '여러 스레드가 동시에 값을 바꾸면: 경쟁 상태',
          html: `<p>두 스레드가 동시에 <code>count++</code>를 실행하면, 서로의 변경을 놓치고 덮어써서 <b>예상보다 적은 값</b>이 나올 수 있어요. 이런 문제를 <b>경쟁 상태(Race Condition)</b>라고 불러요.</p>`
        },
        {
          h: '한 번에 하나씩만 실행되게 하기: synchronized',
          html: `<p><code>synchronized</code>가 붙은 메서드는, 한 스레드가 실행 중일 때 <b>다른 스레드는 끝날 때까지 기다려요</b>. 그래서 동시에 같은 값을 건드리는 문제를 막아줘요.</p>`,
          code: {
            label: 'synchronized_basic.java',
            src: `public synchronized void increment() {
    count++;
}`
          }
        },
        {
          h: '언제 synchronized가 필요할까요',
          html: `<p>여러 스레드가 <b>같은 값을 동시에 읽고 쓸 때만</b> 필요해요. 그렇지 않은 곳에 남용하면, 스레드들이 서로 기다리느라 <b>오히려 느려질 수 있어요</b>.</p>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '두 스레드가 동시에 같은 변수를 건드려서 예상과 다른 결과가 나오는 문제를 무엇이라고 부를까요?',
          '경쟁 상태(Race Condition)', ['데드락(Deadlock)', '메모리 누수', '스택 오버플로우'],
          '여러 스레드가 동시에 같은 값을 두고 "경쟁"하듯 접근해서 생기는 문제라 경쟁 상태라고 불러요.',
          '"경주하다, 경쟁하다"라는 뜻의 영어 단어가 이름에 들어가요.'
        ),
        () => ({
          type: 'blank',
          q: `여러 스레드가 동시에 실행하지 못하게, 한 번에 하나씩만 실행되도록 메서드 앞에 붙이는 키워드를 쓰세요.`,
          prefix: 'public ', suffix: ' void increment() { count++; }', accept: ['synchronized', 'synchronized void'], placeholder: '키워드',
          why: '<code>synchronized</code>는 그 메서드를 한 번에 하나의 스레드만 실행하게 해요.',
          hint: '"동기화된"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'synchronized를 필요 없는 곳에 남용하면 생기는 문제는?',
          '스레드들이 서로 기다리느라 오히려 느려질 수 있다', ['프로그램이 항상 더 빨라진다', '컴파일 오류가 난다', '스레드가 자동으로 늘어난다'],
          'synchronized는 한 번에 하나만 실행되게 만들어서, 꼭 필요하지 않은 곳에 쓰면 병목이 생겨 오히려 느려질 수 있어요.',
          '"한 번에 하나씩만"이라는 제약이 성능에 어떤 영향을 줄지 생각해보세요.'
        ),
        () => makeChoice(
          'synchronized가 꼭 필요한 상황은?',
          '여러 스레드가 같은 값을 동시에 읽고 쓸 때', ['스레드를 하나만 쓸 때', '값을 한 번도 안 바꿀 때', '항상 모든 메서드에'],
          '여러 스레드가 같은 값을 동시에 건드릴 가능성이 있을 때만 synchronized가 필요해요.',
          '경쟁 상태가 생기는 조건이 무엇인지 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>count</code>라는 필드를 1 늘리는 <code>increment()</code> 메서드를, 여러 스레드가 동시에 호출해도 안전하도록 <code>synchronized</code>로 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'public synchronized void increment() {\n    count++;\n}',
          accept: ['public synchronized void increment() {count++;}'],
          why: 'synchronized를 붙이면 한 번에 하나의 스레드만 이 메서드를 실행해요.',
          hint: 'public synchronized void increment() { count++; }를 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '은행 계좌 잔액을 여러 스레드가 동시에 입금/출금 처리할 때, 잔액이 꼬이지 않게 하려면?',
        '잔액을 바꾸는 메서드에 synchronized를 붙인다', ['아무 조치도 필요 없다', '스레드를 최대한 많이 만든다', 'synchronized 대신 System.out.println을 추가한다'],
        '잔액처럼 여러 스레드가 동시에 바꿀 수 있는 값은 synchronized로 보호해야 경쟁 상태를 막을 수 있어요.',
        '여러 스레드가 "같은 값"을 동시에 바꾸는 전형적인 상황이에요.'
      )
    },
    {
      id: 'equalsHashCode',
      title: 'equals()와 hashCode() 오버라이드',
      ready: true,
      summary: '객체의 "진짜 같음"을 비교하는 equals()와, 그와 함께 오버라이드해야 하는 hashCode()를 배워요.',
      goals: ['==와 equals()의 차이', 'equals() 오버라이드하기', 'hashCode()도 함께 오버라이드하는 이유'],
      blocks: [
        {
          h: '객체 비교: ==는 주소, equals()는 내용',
          html: `<p><code>==</code>는 두 객체가 <b>메모리상 완전히 같은 객체</b>인지 비교해요. <code>equals()</code>는 클래스마다 "내용이 같으면 같다"고 정의할 수 있어요. <code>String</code>은 이미 내용 비교로 <code>equals()</code>가 오버라이드돼 있어요.</p>`,
          code: {
            label: 'equals_string.java',
            src: `String a = new String("hi");
String b = new String("hi");
System.out.println(a == b);
System.out.println(a.equals(b));`,
            out: `false\ntrue`
          }
        },
        {
          h: '내가 만든 클래스의 equals() 정의하기',
          html: `<p>내가 만든 클래스도 <code>equals()</code>를 오버라이드해서, "어떤 조건이면 같다고 볼지" 직접 정할 수 있어요.</p>`,
          code: {
            label: 'Point.java',
            src: `class Point {
    int x, y;
    public boolean equals(Object o) {
        if (!(o instanceof Point)) return false;
        Point p = (Point) o;
        return x == p.x && y == p.y;
    }
}`
          }
        },
        {
          h: '왜 hashCode()도 같이 오버라이드해야 할까요',
          html: `<p><code>HashSet</code>, <code>HashMap</code> 같은 컬렉션은 먼저 <code>hashCode()</code>로 "같은 그룹"인지 빠르게 확인하고, 그 안에서 <code>equals()</code>로 진짜 같은지 확인해요. <code>equals()</code>만 바꾸고 <code>hashCode()</code>를 안 바꾸면, 논리적으로 같은 객체인데도 <b>HashSet에 중복으로 들어갈 수 있어요</b>.</p>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>new String("hi") == new String("hi")</code>의 결과는?',
          'false', ['true', '오류가 난다', 'NullPointerException'],
          '<code>==</code>는 메모리상 같은 객체인지 비교하는데, new로 각각 따로 만들었으니 다른 객체라서 false예요.',
          '내용이 같아도 서로 다른 객체일 수 있다는 걸 떠올려보세요.'
        ),
        () => makeChoice(
          '<code>"hi".equals("hi")</code>의 결과는?',
          'true', ['false', '오류가 난다', 'NullPointerException'],
          'String의 equals()는 내용을 비교해서, 글자가 같으면 true예요.',
          'equals()는 "내용이 같은지"를 확인한다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `클래스에서 <code>equals()</code>를 오버라이드할 때, 매개변수의 타입으로 쓰는 클래스 이름을 쓰세요. (예: <code>public boolean equals(${'{이것}'} o)</code>)`,
          prefix: 'public boolean equals(', suffix: ' o) { ... }', accept: ['Object'], placeholder: '타입',
          why: '<code>equals(Object o)</code>처럼 매개변수 타입은 항상 <code>Object</code>예요.',
          hint: '모든 클래스의 조상이 되는 클래스 이름이에요.'
        }),
        () => makeChoice(
          '<code>equals()</code>만 오버라이드하고 <code>hashCode()</code>는 그대로 두면 생길 수 있는 문제는?',
          '논리적으로 같은 객체인데도 HashSet에 중복으로 들어갈 수 있다',
          ['equals()가 아예 동작하지 않는다', '컴파일 오류가 난다', 'HashSet을 아예 쓸 수 없게 된다'],
          'HashSet은 hashCode()로 먼저 그룹을 나누기 때문에, hashCode()가 안 맞으면 equals()가 true여도 다른 그룹으로 취급될 수 있어요.',
          'HashSet이 hashCode()를 먼저 확인한다는 점을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Point</code> 클래스(필드 <code>x</code>, <code>y</code>)에서, 다른 객체가 <code>Point</code>이고 x, y가 모두 같으면 true를 반환하는 <code>equals(Object o)</code> 메서드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'public boolean equals(Object o) {\n    if (!(o instanceof Point)) return false;\n    Point p = (Point) o;\n    return x == p.x && y == p.y;\n}',
          accept: ['public boolean equals(Object o) {if (!(o instanceof Point)) return false;Point p = (Point) o;return x == p.x && y == p.y;}'],
          why: 'instanceof로 타입을 확인한 뒤, 형변환해서 필드를 하나씩 비교해요.',
          hint: 'instanceof로 확인 → (Point) 형변환 → x, y 비교 순서로 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '<code>Point</code> 클래스에 <code>equals()</code>만 오버라이드하고 <code>hashCode()</code>는 그대로 둔 채, <code>x=1,y=2</code>인 Point 두 개(서로 다른 객체)를 <code>HashSet</code>에 둘 다 넣으면?',
        '같은 값인데도 둘 다 들어가서 중복이 생길 수 있다', ['자동으로 하나만 남는다', '오류가 나서 추가가 안 된다', 'HashSet이 자동으로 hashCode()도 고쳐준다'],
        'hashCode()가 기본값(주소 기반)이라 두 객체가 다른 그룹으로 인식돼서, equals()가 true여도 중복 제거가 안 될 수 있어요.',
        'HashSet의 중복 제거는 hashCode()와 equals()를 함께 쓴다는 걸 떠올려보세요.'
      )
    },
    {
      id: 'toStringOverride',
      title: 'toString() 오버라이드',
      ready: true,
      summary: '객체를 출력할 때 보여줄 모습을 직접 정하는 toString() 오버라이드를 배워요.',
      goals: ['기본 toString()의 한계', 'toString() 오버라이드하기', 'println이 자동으로 toString()을 부른다는 것'],
      blocks: [
        {
          h: '객체를 출력하면 나오는 이상한 문자열',
          html: `<p>클래스에 <code>toString()</code>을 따로 안 만들면, <code>System.out.println(객체)</code>는 <code>클래스이름@해시코드</code> 같은 <b>알아보기 힘든</b> 문자열을 보여줘요.</p>`
        },
        {
          h: '원하는 모습으로 바꾸기: toString() 오버라이드',
          html: `<p><code>toString()</code>을 오버라이드하면, 그 객체를 출력할 때 보여줄 문자열을 직접 정할 수 있어요.</p>`,
          code: {
            label: 'Point_toString.java',
            src: `class Point {
    int x, y;
    public String toString() {
        return "(" + x + ", " + y + ")";
    }
}

Point p = new Point();
p.x = 3;
p.y = 4;
System.out.println(p);`,
            out: `(3, 4)`
          }
        },
        {
          h: 'println이 자동으로 toString()을 부른다',
          html: `<p><code>System.out.println(객체)</code>를 실행하면, 자바가 <b>자동으로</b> 그 객체의 <code>toString()</code>을 불러서 결과를 보여줘요. 직접 <code>객체.toString()</code>을 안 써도 돼요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const x = randInt(1, 20), y = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>toString()</code>이 <code>return "(" + x + ", " + y + ")";</code>로 정의돼 있고, <code>x = ${x}, y = ${y}</code>일 때, <code>System.out.println(p)</code>의 결과는?`,
            prefix: '', suffix: '', accept: [`(${x}, ${y})`], placeholder: '값',
            why: `toString()이 "(${x}, ${y})" 형태의 문자열을 만들어 반환해요.`,
            hint: 'toString() 안의 식에 실제 x, y 값을 넣어보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `객체를 출력할 때 보여줄 문자열을 직접 정의하는 메서드 이름을 쓰세요. (반환 타입은 String)`,
          prefix: 'public String ', suffix: '() { return "..."; }', accept: ['toString'], placeholder: '메서드 이름',
          why: '<code>toString()</code>을 오버라이드하면 객체를 출력할 모습을 정할 수 있어요.',
          hint: '"문자열로 바꾸다"라는 뜻 그대로예요.'
        }),
        () => makeChoice(
          'toString()을 따로 정의하지 않은 객체를 println하면 어떻게 될까요?',
          '클래스이름@해시코드 형태의, 알아보기 힘든 문자열이 나온다', ['항상 빈 문자열이 나온다', '컴파일 오류가 난다', 'null이 출력된다'],
          '기본 toString()은 클래스이름@해시코드 형태라서 별로 유용하지 않아요.',
          '오버라이드하지 않았을 때의 "기본 동작"을 떠올려보세요.'
        ),
        () => makeChoice(
          '<code>System.out.println(객체)</code>를 실행할 때 자바가 자동으로 하는 일은?',
          '그 객체의 toString()을 호출해서 결과를 출력한다', ['객체의 메모리 주소를 직접 계산해서 보여준다', 'equals()를 먼저 호출한다', '아무것도 자동으로 하지 않는다'],
          'println은 객체를 받으면 자동으로 그 객체의 toString()을 불러서 출력해요.',
          '직접 .toString()을 안 써도 결과가 나온다는 점을 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Student</code> 클래스(필드 <code>name</code>, <code>age</code>)에서, <code>"이름(나이살)"</code> 형태(예: "지수(17살)")를 반환하는 <code>toString()</code>을 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'public String toString() {\n    return name + "(" + age + "살)";\n}',
          accept: ['public String toString() {return name + "(" + age + "살)";}'],
          why: '문자열과 필드를 +로 이어붙여서 원하는 형태를 만들어요.',
          hint: 'return name + "(" + age + "살)"; 을 쓰세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>toString()</code>이 <code>return name + "(" + age + "살)";</code>로 정의돼 있고, <code>name = "${name}", age = ${age}</code>일 때, <code>System.out.println(student)</code>의 결과는?`,
          prefix: '', suffix: '', accept: [`${name}(${age}살)`], placeholder: '값',
          why: `필드를 이어붙여서 "${name}(${age}살)"이 출력돼요.`,
          hint: 'toString() 식에 실제 값을 대입해보세요.'
        };
      }
    },
    {
      id: 'enumType',
      title: 'Enum(열거형)',
      ready: true,
      summary: '정해진 몇 가지 값 중 하나만 가질 수 있는 enum을 배우고, 필드와 메서드를 담는 법도 알아봐요.',
      goals: ['enum으로 정해진 값 묶기', 'enum 안에 필드/생성자 넣기', 'switch와 함께 쓰기'],
      blocks: [
        {
          h: '정해진 값들의 모임: enum',
          html: `<p><code>enum</code>은 "이 중 하나여야 한다"는 정해진 값들의 목록을 만들어요. 문자열 오타 같은 실수를 막아주는 안전한 방법이에요.</p>`,
          code: {
            label: 'Day.java',
            src: `enum Day {
    MONDAY, TUESDAY, WEDNESDAY
}

Day today = Day.MONDAY;
System.out.println(today);`,
            out: `MONDAY`
          }
        },
        {
          h: 'enum 안에 필드와 생성자 넣기',
          html: `<p>enum도 클래스처럼 필드와 생성자를 가질 수 있어요. 각 값마다 다른 데이터를 함께 담을 수 있어요.</p>`,
          code: {
            label: 'Level.java',
            src: `enum Level {
    LOW(1), MEDIUM(2), HIGH(3);
    final int value;
    Level(int value) {
        this.value = value;
    }
}

System.out.println(Level.HIGH.value);`,
            out: `3`
          }
        },
        {
          h: 'switch와 함께 쓰기',
          html: `<p>enum 값은 <code>switch</code>문과 자연스럽게 어울려서, 값마다 다른 동작을 정의하기 편해요.</p>`,
          code: {
            label: 'switch_enum.java',
            src: `switch (today) {
    case MONDAY:
        System.out.println("월요일");
        break;
    case TUESDAY:
        System.out.println("화요일");
        break;
}`
          }
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `정해진 값들의 목록을 만들 때 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: ' Day { MONDAY, TUESDAY, WEDNESDAY }', accept: ['enum'], placeholder: '키워드',
          why: '<code>enum</code>으로 정해진 값들의 목록을 만들어요.',
          hint: '"열거하다"라는 뜻의 영어 단어예요.'
        }),
        () => {
          const levels = [['LOW', 1], ['MEDIUM', 2], ['HIGH', 3]];
          const [name, value] = pick(levels);
          return {
            type: 'blank',
            q: `<code>enum Level { LOW(1), MEDIUM(2), HIGH(3); final int value; Level(int value) { this.value = value; } }</code>일 때, <code>Level.${name}.value</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(value)], placeholder: '숫자',
            why: `<code>${name}(${value})</code>로 정의됐으니 <code>.value</code>는 ${value}예요.`,
            hint: '괄호 안에 넣은 값이 그대로 그 필드에 저장돼요.'
          };
        },
        () => makeChoice(
          '문자열 <code>"MONDAY"</code>를 그대로 쓰는 대신 <code>enum Day</code>를 쓰는 이유는?',
          '오타 같은 실수를 컴파일 시점에 미리 잡아줘서', ['실행 속도가 항상 2배 빨라져서', 'enum은 메모리를 아예 안 써서', '문자열보다 항상 짧게 써져서'],
          'enum은 정해진 값만 쓸 수 있어서, "MONDAI" 같은 오타를 컴파일 시점에 바로 잡아낼 수 있어요.',
          '문자열은 오타가 나도 컴파일은 되지만, enum은 그렇지 않다는 걸 생각해보세요.'
        ),
        () => makeChoice(
          'enum 값과 함께 switch문을 쓰면 좋은 점은?',
          '값마다 다른 동작을 명확하고 안전하게 정의할 수 있어서', ['switch 없이는 enum을 만들 수 없어서', 'enum은 항상 switch와 함께 있어야만 컴파일된다', '실행 속도가 항상 빨라진다'],
          'enum과 switch는 "정해진 값마다 다른 동작"을 표현하기에 자연스럽게 잘 어울려요.',
          '요일마다 다른 메시지를 출력하는 예시를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>RED</code>, <code>GREEN</code>, <code>BLUE</code> 세 값을 가진 <code>Color</code>라는 enum을 작성하세요.',
          starter: '',
          placeholder: 'enum Color {\n    RED, GREEN, BLUE\n}',
          accept: ['enum Color {RED, GREEN, BLUE}'],
          why: 'enum 이름 { 값1, 값2, 값3 } 형태로 정해진 값들을 나열해요.',
          hint: 'enum Color { RED, GREEN, BLUE }를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const levels = [['LOW', 1], ['MEDIUM', 2], ['HIGH', 3]];
        const [name, value] = pick(levels);
        return {
          type: 'blank',
          q: `<code>enum Level { LOW(1), MEDIUM(2), HIGH(3); final int value; Level(int value) { this.value = value; } }</code>일 때, <code>Level lv = Level.${name}; System.out.println(lv.value * 10);</code>를 실행하면 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(value * 10)], placeholder: '숫자',
          why: `${name}의 value는 ${value}이고, ${value} × 10 = ${value * 10}이에요.`,
          hint: 'value 값을 먼저 확인하고 10을 곱해보세요.'
        };
      }
    },
    {
      id: 'stringBuilderFormat',
      title: 'StringBuilder와 String.format',
      ready: true,
      summary: '문자열을 효율적으로 이어붙이는 StringBuilder와, 원하는 형식으로 문자열을 만드는 String.format을 배워요.',
      goals: ['StringBuilder로 문자열 이어붙이기', 'append 메서드 체이닝', 'String.format으로 서식 지정하기'],
      blocks: [
        {
          h: '문자열을 반복해서 이어붙일 때: StringBuilder',
          html: `<p><code>String</code>은 <b>불변(immutable)</b>이라, <code>+</code>로 계속 이어붙이면 매번 새 문자열이 만들어져서 비효율적이에요. <code>StringBuilder</code>는 내부 버퍼에 이어붙여서 훨씬 효율적이에요.</p>`,
          code: {
            label: 'stringbuilder.java',
            src: `StringBuilder sb = new StringBuilder();
sb.append("안녕");
sb.append(", ");
sb.append("지수");
System.out.println(sb.toString());`,
            out: `안녕, 지수`
          }
        },
        {
          h: '원하는 형식으로 문자열 만들기: String.format',
          html: `<p><code>String.format(서식, 값들...)</code>은 <code>%s</code>(문자열), <code>%d</code>(정수) 같은 자리표시자를 이용해 원하는 형식의 문자열을 만들어줘요.</p>`,
          code: {
            label: 'string_format.java',
            src: `String result = String.format("%s는 %d살이에요", "지수", 17);
System.out.println(result);`,
            out: `지수는 17살이에요`
          }
        }
      ],
      quizGenerators: [
        () => {
          const words = shuffle(['안녕', '반가워', '고마워', '잘가']).slice(0, randInt(2, 3));
          return {
            type: 'blank',
            q: `<code>StringBuilder sb = new StringBuilder();</code> 후 ${words.map(w => `<code>sb.append("${w}")</code>`).join(', ')}를 순서대로 실행하면, <code>sb.toString()</code>의 결과는? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [words.join('')], placeholder: '값',
            why: `append한 순서대로 이어붙여서 "${words.join('')}"가 돼요.`,
            hint: 'append를 부른 순서 그대로 이어붙는다는 걸 떠올려보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `StringBuilder에 문자열을 이어붙이는 메서드 이름을 쓰세요.`,
          prefix: 'sb.', suffix: '("안녕");', accept: ['append'], placeholder: '메서드 이름',
          why: '<code>.append(값)</code>으로 StringBuilder 뒤에 값을 이어붙여요.',
          hint: '"덧붙이다"라는 뜻의 영어 단어예요.'
        }),
        () => {
          const name = pick(['지수', '민준', '서연']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>String.format("%s는 %d살이에요", "${name}", ${age})</code>의 결과는? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [`${name}는 ${age}살이에요`], placeholder: '값',
            why: `%s 자리에 "${name}", %d 자리에 ${age}가 들어가서 "${name}는 ${age}살이에요"가 돼요.`,
            hint: '%s는 문자열, %d는 정수 자리표시자예요.'
          };
        },
        () => makeChoice(
          '문자열을 반복문 안에서 수백 번 이어붙여야 할 때, <code>+</code> 대신 <code>StringBuilder</code>를 쓰는 이유는?',
          '매번 새 문자열을 만들지 않고 내부 버퍼에 이어붙여서 훨씬 효율적이라서',
          ['StringBuilder만 한글을 지원해서', '+ 연산자는 문자열에 아예 못 써서', 'StringBuilder는 항상 코드가 더 짧아서'],
          'String은 불변이라 +로 이어붙일 때마다 새 문자열이 만들어지지만, StringBuilder는 내부 버퍼를 그대로 늘려가며 이어붙여요.',
          '문자열이 "불변"이라는 점이 반복적인 이어붙이기에서 왜 비효율적인지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: 'StringBuilder를 만들어 "Hello"와 ", World!"를 순서대로 append한 뒤, toString()으로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'StringBuilder sb = new StringBuilder();\nsb.append("Hello");\nsb.append(", World!");\nSystem.out.println(sb.toString());',
          accept: ['StringBuilder sb = new StringBuilder();sb.append("Hello");sb.append(", World!");System.out.println(sb.toString());'],
          why: 'append를 순서대로 불러서 문자열을 이어붙인 뒤 toString()으로 꺼내요.',
          hint: 'new StringBuilder() 후 append를 두 번, 마지막에 toString()을 출력하세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준']);
        const score = randInt(60, 100);
        return {
          type: 'blank',
          q: `<code>String.format("%s의 점수는 %d점입니다", "${name}", ${score})</code>의 결과는?`,
          prefix: '', suffix: '', accept: [`${name}의 점수는 ${score}점입니다`], placeholder: '값',
          why: `%s와 %d 자리에 각각 "${name}"과 ${score}가 들어가요.`,
          hint: '자리표시자 순서대로 넘긴 값들이 차례로 들어간다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'comparableComparator',
      title: 'Comparable과 Comparator로 정렬하기',
      ready: true,
      summary: '내가 만든 클래스에 기본 정렬 순서를 정하는 Comparable과, 상황에 따라 다른 기준으로 정렬하는 Comparator를 배워요.',
      goals: ['Comparable로 기본 정렬 순서 정하기', 'Comparator로 다른 기준 정렬하기', 'Collections.sort 활용하기'],
      blocks: [
        {
          h: '기본 정렬 순서 정하기: Comparable',
          html: `<p><code>Comparable&lt;T&gt;</code>을 구현하고 <code>compareTo(other)</code>를 정의하면, 그 클래스의 "기본 정렬 순서"를 정할 수 있어요. 음수면 앞, 양수면 뒤, 0이면 순서가 같다는 뜻이에요.</p>`,
          code: {
            label: 'Student.java',
            src: `class Student implements Comparable<Student> {
    int score;
    public int compareTo(Student other) {
        return this.score - other.score;
    }
}`
          }
        },
        {
          h: '정렬 실행하기: Collections.sort',
          html: `<p><code>Comparable</code>을 구현한 클래스의 리스트는 <code>Collections.sort(리스트)</code>로 바로 정렬할 수 있어요.</p>`,
          code: {
            label: 'sort_list.java',
            src: `List<Student> list = new ArrayList<>();
Collections.sort(list);`
          }
        },
        {
          h: '다른 기준으로 정렬하기: Comparator',
          html: `<p><code>Comparable</code>은 클래스마다 "기본" 정렬 기준 하나만 정할 수 있지만, <code>Comparator</code>는 필요할 때마다 <b>다른 기준</b>을 즉석에서 만들 수 있어요.</p>`,
          code: {
            label: 'comparator.java',
            src: `list.sort(Comparator.comparing(s -> s.name));`
          },
          after: `<div class="note"><b>정리</b> — Comparable은 "이 클래스의 기본 순서", Comparator는 "지금 이 상황에서만 쓸 순서"라고 생각하면 쉬워요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(60, 100), b = randInt(60, 100);
          const sign = a - b > 0 ? '양수' : a - b < 0 ? '음수' : '0';
          return {
            type: 'blank',
            q: `<code>compareTo</code>가 <code>return this.score - other.score;</code>로 정의돼 있을 때, <code>this.score</code>가 ${a}, <code>other.score</code>가 ${b}면 <code>compareTo</code>의 결과는 양수, 음수, 0 중 무엇일까요?`,
            prefix: '', suffix: '', accept: [sign], placeholder: '양수, 음수, 0 중 하나',
            why: `${a} - ${b} = ${a - b}로, ${sign}예요.`,
            hint: '두 값을 빼서 결과가 양수인지 음수인지 0인지 확인해보세요.'
          };
        },
        () => makeChoice(
          'compareTo가 음수를 반환하면 무슨 뜻일까요?',
          '이 객체가 비교 대상보다 앞에 온다', ['이 객체가 비교 대상보다 뒤에 온다', '두 객체가 같다', '오류가 발생했다는 뜻'],
          '음수는 "this가 other보다 작다(앞에 온다)"는 뜻이에요.',
          '오름차순 정렬에서 작은 값이 앞에 온다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `클래스가 기본 정렬 순서를 갖도록 구현하는 인터페이스 이름을 쓰세요. (제네릭 타입 포함, 예: <code>class Student implements ${'{이것}'}&lt;Student&gt;</code>)`,
          prefix: 'class Student implements ', suffix: '<Student> { ... }', accept: ['Comparable'], placeholder: '인터페이스 이름',
          why: '<code>Comparable&lt;T&gt;</code>을 구현하면 그 클래스의 기본 정렬 순서를 정할 수 있어요.',
          hint: '"비교 가능한"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'Comparable과 Comparator의 차이는?',
          'Comparable은 클래스의 기본(고정된) 정렬 순서, Comparator는 상황에 따라 다르게 만들 수 있는 정렬 기준',
          ['Comparable은 숫자만, Comparator는 문자열만 비교할 수 있다', '둘은 완전히 같은 것이다', 'Comparator는 클래스 안에서만 정의할 수 있다'],
          'Comparable은 클래스 자체에 정의하는 "기본" 순서고, Comparator는 그때그때 원하는 기준으로 새로 만들 수 있어요.',
          '"기본 하나"인지 "상황에 따라 여러 개"인지의 차이를 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Student</code> 클래스(필드 <code>score</code>)가 <code>Comparable&lt;Student&gt;</code>를 구현하도록, score 기준으로 비교하는 <code>compareTo</code> 메서드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'public int compareTo(Student other) {\n    return this.score - other.score;\n}',
          accept: ['public int compareTo(Student other) {return this.score - other.score;}'],
          why: 'this.score - other.score로 두 점수를 빼서 정렬 순서를 정해요.',
          hint: 'public int compareTo(Student other) { return this.score - other.score; }를 쓰세요.'
        }),
      ],
      boss: () => {
        const scores = [randInt(60, 100), randInt(60, 100), randInt(60, 100)];
        const sorted = [...scores].sort((a, b) => a - b);
        return {
          type: 'blank',
          q: `학생들의 score가 ${scores.join(', ')}일 때, <code>compareTo</code>가 <code>this.score - other.score</code>로 정의된 <code>Comparable</code>을 이용해 <code>Collections.sort(list)</code>를 실행하면, 정렬된 순서는? (score만 쉼표로 나열)`,
          prefix: '', suffix: '', accept: [sorted.join(', '), sorted.join(',')], placeholder: '숫자, 숫자, 숫자',
          why: `compareTo가 작은 값이 앞에 오도록 정의돼 있어서, 오름차순으로 정렬되어 ${sorted.join(', ')}이 돼요.`,
          hint: 'this.score - other.score가 음수/양수인 경우를 생각해서 오름차순으로 정렬해보세요.'
        };
      }
    },
    {
      id: 'genericWildcards',
      title: '제네릭 와일드카드',
      ready: true,
      summary: '제네릭 타입을 좀 더 유연하게 받을 수 있게 해주는 ? extends와 ? super 와일드카드를 배워요.',
      goals: ['? extends로 하위 타입 받기', '? super로 상위 타입 받기', 'PECS 원칙 살짝 맛보기'],
      blocks: [
        {
          h: '어떤 자료형의 하위 타입이든 받기: ? extends',
          html: `<p><code>List&lt;? extends Number&gt;</code>는 "Number이거나 Number의 하위 타입인 것들의 List"라는 뜻이에요. <code>List&lt;Integer&gt;</code>든 <code>List&lt;Double&gt;</code>이든 다 받을 수 있어요. 대신 이 리스트에서는 값을 <b>꺼내기만</b> 안전해요.</p>`,
          code: {
            label: 'extends_wildcard.java',
            src: `void printAll(List<? extends Number> list) {
    for (Number n : list) {
        System.out.println(n);
    }
}`
          }
        },
        {
          h: '어떤 자료형의 상위 타입이든 받기: ? super',
          html: `<p><code>List&lt;? super Integer&gt;</code>는 "Integer이거나 Integer의 상위 타입인 것들의 List"라는 뜻이에요. <code>List&lt;Integer&gt;</code>, <code>List&lt;Number&gt;</code>, <code>List&lt;Object&gt;</code> 모두 받을 수 있고, 이 경우엔 값을 <b>넣기</b>가 안전해요.</p>`,
          code: {
            label: 'super_wildcard.java',
            src: `void addNumbers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
}`
          }
        },
        {
          h: 'PECS 원칙 살짝 맛보기',
          html: `<p><b>PECS</b>(Producer Extends, Consumer Super)는 "값을 <b>꺼내기만</b> 하면 <code>extends</code>, 값을 <b>넣기만</b> 하면 <code>super</code>"라는 기억법이에요.</p>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '리스트에서 값을 꺼내서 읽기만 할 함수의 매개변수로 적합한 것은?',
          '<code>List&lt;? extends Number&gt;</code>', ['<code>List&lt;? super Number&gt;</code>', '<code>List&lt;Number&gt;</code>만 가능하다', '<code>List&lt;Object&gt;</code>만 가능하다'],
          '읽기(꺼내기)만 할 때는 <code>? extends</code>를 써서 Number의 어떤 하위 타입 리스트든 받을 수 있어요.',
          'PECS의 "Producer Extends"를 떠올려보세요.'
        ),
        () => makeChoice(
          '리스트에 값을 추가만 할 함수의 매개변수로 적합한 것은?',
          '<code>List&lt;? super Integer&gt;</code>', ['<code>List&lt;? extends Integer&gt;</code>', '<code>List&lt;String&gt;</code>', '아무 타입이나 다 안전하다'],
          '쓰기(추가)만 할 때는 <code>? super</code>를 써서 Integer를 담을 수 있는 어떤 상위 타입 리스트든 받을 수 있어요.',
          'PECS의 "Consumer Super"를 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `Number의 하위 타입이면 무엇이든 받는 리스트 타입을 쓰세요. (예: <code>List&lt;${'{이것}'}&gt;</code>)`,
          prefix: 'List<', suffix: '> list', accept: ['? extends Number'], placeholder: '? extends 타입',
          why: '<code>? extends Number</code>는 Number나 그 하위 타입 전부를 받을 수 있어요.',
          hint: '물음표 뒤에 extends와 상위 타입을 쓰세요.'
        }),
        () => ({
          type: 'blank',
          q: `PECS에서 "Producer"일 때 쓰는 키워드를 쓰세요.`,
          prefix: 'List<? ', suffix: ' Number>', accept: ['extends'], placeholder: '키워드',
          why: 'Producer(값을 만들어 꺼내주는 쪽)일 땐 extends를 써요.',
          hint: 'PECS의 첫 글자(Producer Extends)를 떠올려보세요.'
        }),
        () => ({
          type: 'code',
          q: '<code>List&lt;? extends Number&gt;</code> 타입의 매개변수 <code>list</code>를 받아서, 그 안의 모든 값을 하나씩 출력하는 <code>printAll</code> 메서드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'void printAll(List<? extends Number> list) {\n    for (Number n : list) {\n        System.out.println(n);\n    }\n}',
          accept: ['void printAll(List<? extends Number> list) {for (Number n : list) {System.out.println(n);}}'],
          why: 'List<? extends Number>는 Number의 어떤 하위 타입 리스트든 받을 수 있어요.',
          hint: 'void printAll(List<? extends Number> list) { for (Number n : list) { System.out.println(n); } }를 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '숫자 리스트에서 값을 읽어 합계만 계산하는 메서드(값을 넣지는 않음)를 만들려고 해요. 매개변수 타입으로 가장 적합한 것은?',
        '<code>List&lt;? extends Number&gt;</code>', ['<code>List&lt;? super Number&gt;</code>', '<code>List&lt;Object&gt;</code>', '<code>ArrayList&lt;Integer&gt;</code>만 받아야 한다'],
        '읽기만 하는 상황이니 PECS 원칙에 따라 extends를 쓰는 게 가장 유연하고 안전해요.',
        '이 메서드가 리스트에 값을 "넣는지" "꺼내기만 하는지"를 확인해보세요.'
      )
    },
    {
      id: 'recordType',
      title: 'record로 간결한 데이터 클래스 만들기',
      ready: true,
      summary: '값을 담기만 하는 클래스를 훨씬 짧게 만들어주는 record를 배워요. 파이썬의 dataclass와 비슷한 역할이에요.',
      goals: ['record로 클래스 짧게 만들기', '자동으로 생기는 기능들', '언제 record를 쓸지'],
      blocks: [
        {
          h: '값을 담기만 하는 클래스를 한 줄로: record',
          html: `<p><code>record 이름(타입 필드, ...)</code>으로 선언하면, 생성자·필드 접근 메서드·<code>equals</code>·<code>hashCode</code>·<code>toString</code>이 <b>전부 자동으로</b> 만들어져요.</p>`,
          code: {
            label: 'Point.java',
            src: `record Point(int x, int y) {}

Point p = new Point(3, 4);
System.out.println(p.x());
System.out.println(p);`,
            out: `3\nPoint[x=3, y=4]`
          }
        },
        {
          h: '자동으로 생기는 것들',
          html: `<p>필드 값을 꺼낼 땐 <code>getX()</code>가 아니라 <b>필드 이름과 똑같은</b> <code>x()</code> 형태의 메서드를 써요. <code>equals</code>와 <code>hashCode</code>도 필드 값을 기준으로 자동 생성돼요.</p>`
        },
        {
          h: '언제 record를 쓸까요',
          html: `<p>record는 "값을 담는 게 목적인, 바뀌지 않는(불변) 데이터"에 잘 어울려요. 복잡한 로직이 들어가는 일반 클래스에는 어울리지 않아요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const x = randInt(1, 20), y = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>record Point(int x, int y) {}</code>일 때, <code>Point p = new Point(${x}, ${y}); System.out.println(p.x());</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(x)], placeholder: '숫자',
            why: `record의 필드 접근 메서드는 필드 이름과 같은 <code>x()</code>라서, ${x}가 나와요.`,
            hint: 'record의 필드 접근은 getX()가 아니라 x() 형태예요.'
          };
        },
        () => {
          const x = randInt(1, 20), y = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>record Point(int x, int y) {}</code>일 때, <code>System.out.println(new Point(${x}, ${y}))</code>의 결과는?`,
            prefix: '', suffix: '', accept: [`Point[x=${x}, y=${y}]`], placeholder: '값',
            why: `record는 toString()도 자동으로 만들어줘서 <code>Point[x=${x}, y=${y}]</code> 형태로 나와요.`,
            hint: 'record가 자동으로 만들어주는 toString() 형식을 떠올려보세요.'
          };
        },
        () => makeChoice(
          'record가 자동으로 만들어주지 않는 것은?',
          '데이터베이스 저장 로직', ['생성자', 'equals()와 hashCode()', 'toString()'],
          'record는 생성자, equals, hashCode, toString, 필드 접근 메서드를 자동으로 만들어주지만, DB 저장 같은 커스텀 로직은 직접 만들어야 해요.',
          'record가 자동화해주는 건 "값을 담고 다루는" 기본 기능뿐이에요.'
        ),
        () => makeChoice(
          'record를 쓰기에 적합한 상황은?',
          '값을 담기만 하는, 바뀌지 않는 데이터를 표현할 때', ['복잡한 비즈니스 로직이 많은 클래스를 만들 때', '값이 계속 바뀌어야 하는 가변 객체를 만들 때', '메서드가 하나도 없어야 할 때'],
          'record는 불변 데이터를 간결하게 표현하는 데 적합해요.',
          '파이썬의 dataclass가 어떤 상황에 어울렸는지 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>name</code>(String)과 <code>age</code>(int)를 가진 <code>Student</code>라는 record를 작성하세요.',
          starter: '',
          placeholder: 'record Student(String name, int age) {}',
          accept: ['record Student(String name, int age) {}'],
          why: 'record 이름(타입 필드1, 타입 필드2) {} 형태로 선언해요.',
          hint: 'record Student(String name, int age) {}를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>record Student(String name, int age) {}</code>일 때, <code>Student s = new Student("${name}", ${age}); System.out.println(s.name() + "(" + s.age() + ")");</code>를 실행하면 결과는?`,
          prefix: '', suffix: '', accept: [`${name}(${age})`], placeholder: '값',
          why: `s.name()은 "${name}", s.age()는 ${age}를 돌려줘서 "${name}(${age})"가 출력돼요.`,
          hint: 'record의 필드 접근 메서드(name(), age())를 이용해 값을 이어붙인다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'switchExpression',
      title: 'switch 표현식',
      ready: true,
      summary: '화살표(->)를 쓰는 새로운 switch 문법으로, 값을 직접 반환받고 break를 깜빡하는 실수도 없애는 법을 배워요.',
      goals: ['화살표(->)로 쓰는 새 switch 문법', 'switch가 값을 직접 반환하기', 'break가 필요 없어진 이유'],
      blocks: [
        {
          h: '더 간결해진 switch: 화살표 문법',
          html: `<p><code>case 값 -&gt; 결과</code> 형태로 쓰면, 각 경우마다 콜론(:)과 break 없이도 훨씬 간결하게 쓸 수 있어요.</p>`,
          code: {
            label: 'switch_expr.java',
            src: `int day = 3;
String name = switch (day) {
    case 1 -> "월요일";
    case 2 -> "화요일";
    case 3 -> "수요일";
    default -> "알 수 없음";
};
System.out.println(name);`,
            out: `수요일`
          }
        },
        {
          h: 'switch가 값을 직접 반환해요',
          html: `<p>예전 <code>switch</code>문은 "문장"이라 값을 돌려주지 않았지만, 새 <code>switch</code> 표현식은 그 자체로 <b>값</b>이 돼서 바로 변수에 대입할 수 있어요.</p>`
        },
        {
          h: 'break가 필요 없어진 이유',
          html: `<p>화살표 문법은 각 <code>case</code>가 <b>독립적으로 실행되고 자동으로 끝나요</b>. 그래서 예전처럼 <code>break</code>를 깜빡해서 다음 <code>case</code>까지 실행되는(fall-through) 실수가 안 생겨요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const day = randInt(1, 4);
          const names = { 1: '월요일', 2: '화요일', 3: '수요일' };
          const name = names[day] || '알 수 없음';
          return {
            type: 'blank',
            q: `<code>int day = ${day};</code>일 때, 위 <code>switch</code> 표현식(1→월요일, 2→화요일, 3→수요일, default→알 수 없음)의 결과는? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [name], placeholder: '값',
            why: `day가 ${day}이니 "${name}"이 선택돼요.`,
            hint: '해당하는 case가 없으면 default 값이 쓰인다는 걸 떠올려보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `새 switch 표현식에서 각 case의 값을 나타낼 때 콜론(:) 대신 쓰는 기호를 쓰세요.`,
          prefix: 'case 1 ', suffix: ' "월요일";', accept: ['->'], placeholder: '기호',
          why: '<code>case 값 -&gt; 결과</code> 형태로 화살표를 써요.',
          hint: '람다 표현식에서도 봤던 그 화살표예요.'
        }),
        () => makeChoice(
          '새로운 switch 표현식과 예전 switch문의 가장 큰 차이는?',
          '표현식은 그 자체로 값을 반환해서 바로 변수에 대입할 수 있다', ['표현식은 default를 쓸 수 없다', '표현식은 숫자만 비교할 수 있다', '차이가 전혀 없다'],
          '새 switch는 값(expression)이 돼서, <code>String name = switch (...) {...};</code>처럼 바로 대입할 수 있어요.',
          '예전 switch문은 값을 "반환"하지 못하고 그냥 흐름 제어만 했다는 걸 떠올려보세요.'
        ),
        () => makeChoice(
          '화살표(-&gt;) 문법에서 break를 안 써도 되는 이유는?',
          '각 case가 독립적으로 실행되고 자동으로 끝나서, fall-through가 발생하지 않아서',
          ['break가 아예 사라진 문법이라 쓸 수 없어서', '화살표 문법에서는 case가 하나만 있어야 해서', 'default가 항상 자동으로 실행돼서'],
          '화살표 문법은 fall-through(다음 case까지 실행되는 것)가 없어서, break로 막을 필요가 없어요.',
          '예전 switch문에서 break를 깜빡했을 때 생기던 문제를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: 'int형 변수 grade(1, 2, 3 중 하나)에 대해, 1이면 "1학년", 2면 "2학년", 3이면 "3학년", 그 외는 "졸업생"을 반환하는 switch 표현식을 만들어 result라는 String 변수에 담는 코드를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: 'String result = switch (grade) {\n    case 1 -> "1학년";\n    case 2 -> "2학년";\n    case 3 -> "3학년";\n    default -> "졸업생";\n};',
          accept: ['String result = switch (grade) {case 1 -> "1학년";case 2 -> "2학년";case 3 -> "3학년";default -> "졸업생";};'],
          why: 'switch (grade) { case 값 -> 결과; ... default -> 결과; }를 변수에 바로 대입해요.',
          hint: 'String result = switch (grade) { ... }; 형태로 각 case를 화살표로 쓰세요.'
        }),
      ],
      boss: () => {
        const grade = pick([1, 2, 3, 4]);
        const names = { 1: '1학년', 2: '2학년', 3: '3학년' };
        const name = names[grade] || '졸업생';
        return {
          type: 'blank',
          q: `<code>int grade = ${grade};</code>일 때, 1→"1학년", 2→"2학년", 3→"3학년", default→"졸업생"인 switch 표현식의 결과는? (따옴표 없이)`,
          prefix: '', suffix: '', accept: [name], placeholder: '값',
          why: `grade가 ${grade}이니 "${name}"이 선택돼요.`,
          hint: '해당하는 case 값이 있는지, 없으면 default가 쓰인다는 걸 확인해보세요.'
        };
      }
    },
    {
      id: 'customExceptionsChecked',
      title: '커스텀 예외와 checked/unchecked',
      ready: true,
      summary: '나만의 예외 클래스를 만들고, 반드시 처리해야 하는 Checked Exception과 그렇지 않은 Unchecked Exception의 차이를 배워요.',
      goals: ['나만의 예외 클래스 만들기', 'Checked Exception이 뭔지', 'Unchecked Exception과의 차이'],
      blocks: [
        {
          h: '나만의 예외 만들기',
          html: `<p><code>Exception</code>(또는 그 하위 클래스)을 상속받으면 나만의 예외 클래스를 만들 수 있어요.</p>`,
          code: {
            label: 'InvalidAgeException.java',
            src: `class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}`
          }
        },
        {
          h: '반드시 처리해야 하는 예외: Checked Exception',
          html: `<p><code>Exception</code>을 상속받으면 <b>Checked Exception</b>이 돼요. 이 예외를 던질 수 있는 메서드는 <code>throws</code>로 선언하거나, 그 자리에서 <code>try/catch</code>로 반드시 처리해야 해요(컴파일러가 강제해요).</p>`,
          code: {
            label: 'checked_exception.java',
            src: `void setAge(int age) throws InvalidAgeException {
    if (age < 0) {
        throw new InvalidAgeException("나이는 음수일 수 없어요");
    }
}`
          }
        },
        {
          h: '처리를 강제하지 않는 예외: Unchecked Exception',
          html: `<p><code>RuntimeException</code>을 상속받으면 <b>Unchecked Exception</b>이 돼요. <code>throws</code> 선언이나 <code>try/catch</code> 없이도 컴파일이 돼요. <code>NullPointerException</code>, <code>ArrayIndexOutOfBoundsException</code>처럼 <b>프로그래밍 실수</b>로 인한 예외가 대표적이에요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `Checked Exception인 나만의 예외를 만들려면 어떤 클래스를 상속받아야 할까요?`,
          prefix: 'class InvalidAgeException extends ', suffix: ' { ... }', accept: ['Exception'], placeholder: '클래스 이름',
          why: '<code>Exception</code>을 상속받으면 Checked Exception이 돼요.',
          hint: '모든 예외의 기본 조상 클래스 이름이에요.'
        }),
        () => ({
          type: 'blank',
          q: `Unchecked Exception(처리를 강제하지 않는 예외)을 만들려면 어떤 클래스를 상속받아야 할까요?`,
          prefix: 'class MyException extends ', suffix: ' { ... }', accept: ['RuntimeException'], placeholder: '클래스 이름',
          why: '<code>RuntimeException</code>을 상속받으면 Unchecked Exception이 돼요.',
          hint: '"실행 중(runtime)"에 관련된 예외 클래스 이름이에요.'
        }),
        () => makeChoice(
          'Checked Exception을 던질 수 있는 메서드를 만들 때 컴파일러가 강제하는 것은?',
          'throws 선언이나 try/catch로 반드시 처리해야 한다', ['메서드 이름을 반드시 대문자로 시작해야 한다', 'private으로만 선언할 수 있다', '아무것도 강제하지 않는다'],
          'Checked Exception은 throws 선언이나 try/catch 처리가 없으면 컴파일 자체가 안 돼요.',
          '"컴파일러가 강제한다"는 checked의 핵심 특징이에요.'
        ),
        () => makeChoice(
          'NullPointerException, ArrayIndexOutOfBoundsException은 어떤 종류의 예외일까요?',
          'Unchecked Exception (프로그래밍 실수로 인한)', ['Checked Exception', '둘 다 아닌 특별한 예외', '컴파일 오류'],
          '이런 예외들은 RuntimeException의 하위 클래스라 Unchecked Exception이고, 보통 코드 실수로 발생해요.',
          '이 예외들이 throws 선언 없이도 컴파일된다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: 'Exception을 상속받아, 메시지를 받는 생성자를 가진 나만의 예외 클래스 <code>OutOfStockException</code>을 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'class OutOfStockException extends Exception {\n    public OutOfStockException(String message) {\n        super(message);\n    }\n}',
          accept: ['class OutOfStockException extends Exception {public OutOfStockException(String message) {super(message);}}'],
          why: 'Exception을 상속받고, 생성자에서 super(message)로 부모 생성자에 메시지를 전달해요.',
          hint: 'class OutOfStockException extends Exception { public OutOfStockException(String message) { super(message); } }를 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '재고가 없을 때 발생시킬 예외를 만드는데, "이 예외가 발생할 수 있는 메서드를 호출하는 모든 곳에서 반드시 처리하게(컴파일 시점에 강제)" 만들고 싶어요. 어떤 클래스를 상속받아야 할까요?',
        'Exception', ['RuntimeException', 'Object', 'Thread'],
        'Exception을 상속받으면 Checked Exception이 되어, 호출하는 쪽에서 반드시 처리(throws 또는 try/catch)하도록 컴파일러가 강제해요.',
        '"반드시 처리를 강제"하고 싶다는 요구사항이 checked/unchecked 중 어느 쪽인지 생각해보세요.'
      )
    },
    {
      id: 'executorService',
      title: 'ExecutorService로 스레드풀 관리',
      ready: true,
      summary: '스레드를 매번 직접 만들지 않고, 미리 준비된 스레드풀로 여러 작업을 관리하는 법을 배워요.',
      goals: ['스레드풀로 여러 작업 관리하기', 'submit으로 작업 맡기기', 'Future로 결과 받기'],
      blocks: [
        {
          h: '스레드를 미리 준비해두는 풀: ExecutorService',
          html: `<p><code>Executors.newFixedThreadPool(개수)</code>로 정해진 개수의 스레드를 미리 준비해두고, <code>.submit(작업)</code>으로 여러 작업을 그 풀에 맡길 수 있어요.</p>`,
          code: {
            label: 'executor_basic.java',
            src: `ExecutorService executor = Executors.newFixedThreadPool(3);
executor.submit(() -> System.out.println("작업 실행"));
executor.shutdown();`,
            out: `작업 실행`
          }
        },
        {
          h: '결과를 받아야 한다면: Future',
          html: `<p><code>submit()</code>이 돌려주는 <code>Future</code>의 <code>.get()</code>을 부르면, 그 작업이 끝날 때까지 기다렸다가 결과를 받아와요.</p>`,
          code: {
            label: 'future_get.java',
            src: `Future<Integer> future = executor.submit(() -> 1 + 2);
System.out.println(future.get());`,
            out: `3`
          }
        },
        {
          h: '다 쓴 뒤엔 꼭 정리하기: shutdown()',
          html: `<p><code>shutdown()</code>을 안 부르면 스레드풀이 계속 살아있어서, 프로그램이 끝나야 할 때 안 끝날 수 있어요. 작업을 다 맡긴 뒤엔 꼭 <code>shutdown()</code>을 불러줘야 해요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `스레드 3개짜리 고정 크기 스레드풀을 만드는 코드를 완성하세요.`,
          prefix: 'ExecutorService executor = Executors.', suffix: '(3);', accept: ['newFixedThreadPool'], placeholder: '메서드 이름',
          why: '<code>Executors.newFixedThreadPool(3)</code>은 스레드 3개짜리 풀을 만들어요.',
          hint: '"고정된 크기의 스레드풀을 새로 만든다"는 뜻의 메서드예요.'
        }),
        () => ({
          type: 'blank',
          q: `스레드풀에 작업을 맡기는 메서드 이름을 쓰세요.`,
          prefix: 'executor.', suffix: '(() -> System.out.println("작업"));', accept: ['submit'], placeholder: '메서드 이름',
          why: '<code>.submit(작업)</code>으로 스레드풀에 작업을 맡겨요.',
          hint: '"제출하다, 맡기다"라는 뜻의 영어 단어예요.'
        }),
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>Future&lt;Integer&gt; future = executor.submit(() -&gt; ${a} + ${b});</code>일 때, <code>future.get()</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `future.get()은 작업이 끝날 때까지 기다렸다가 그 결과인 ${a} + ${b} = ${a + b}를 돌려줘요.`,
            hint: 'submit에 넘긴 람다의 계산 결과가 future.get()으로 나온다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          'ExecutorService 사용을 마친 뒤 반드시 불러줘야 하는 메서드는?',
          '<code>shutdown()</code>', ['<code>start()</code>', '<code>restart()</code>', '아무것도 안 불러도 된다'],
          'shutdown()을 안 부르면 스레드풀이 계속 살아있어서 프로그램이 안 끝날 수 있어요.',
          '자원을 다 쓴 뒤 정리하는 습관을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '스레드 2개짜리 스레드풀을 만들고, <code>"작업 완료"</code>를 출력하는 작업을 submit한 뒤 shutdown하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'ExecutorService executor = Executors.newFixedThreadPool(2);\nexecutor.submit(() -> System.out.println("작업 완료"));\nexecutor.shutdown();',
          accept: ['ExecutorService executor = Executors.newFixedThreadPool(2);executor.submit(() -> System.out.println("작업 완료"));executor.shutdown();'],
          why: 'newFixedThreadPool(2)로 풀을 만들고, submit으로 작업을 맡긴 뒤 shutdown으로 정리해요.',
          hint: 'Executors.newFixedThreadPool(2) 후 submit, shutdown 순서로 쓰세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 10), b = randInt(1, 10), c = randInt(1, 10);
        const sum = a + b + c;
        return {
          type: 'blank',
          q: `<code>Future&lt;Integer&gt; f1 = executor.submit(() -&gt; ${a});</code>, <code>Future&lt;Integer&gt; f2 = executor.submit(() -&gt; ${b});</code>, <code>Future&lt;Integer&gt; f3 = executor.submit(() -&gt; ${c});</code>일 때, <code>f1.get() + f2.get() + f3.get()</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `각 future.get()이 ${a}, ${b}, ${c}를 돌려주고, 다 더하면 ${sum}이에요.`,
          hint: '각 작업의 결과를 get()으로 꺼내서 더해보세요.'
        };
      }
    },
    {
      id: 'fileIO',
      title: '파일 입출력',
      ready: true,
      summary: '자바에서 파일을 읽고 쓰는 BufferedReader와 BufferedWriter를 배워요.',
      goals: ['BufferedReader로 파일 읽기', 'BufferedWriter로 파일 쓰기', 'try-with-resources와 함께 쓰기'],
      blocks: [
        {
          h: '파일 읽기: BufferedReader',
          html: `<p><code>new BufferedReader(new FileReader(파일이름))</code>으로 파일을 열고, <code>.readLine()</code>으로 한 줄씩 읽어요.</p>`,
          code: {
            label: 'read_file.java',
            src: `BufferedReader reader = new BufferedReader(new FileReader("data.txt"));
String line = reader.readLine();
System.out.println(line);
reader.close();`
          }
        },
        {
          h: '파일 쓰기: BufferedWriter',
          html: `<p><code>new BufferedWriter(new FileWriter(파일이름))</code>으로 파일을 열고, <code>.write(내용)</code>으로 써요.</p>`,
          code: {
            label: 'write_file.java',
            src: `BufferedWriter writer = new BufferedWriter(new FileWriter("output.txt"));
writer.write("안녕하세요");
writer.close();`
          }
        },
        {
          h: 'try-with-resources와 함께 쓰기',
          html: `<p>파일 관련 클래스들도 <code>AutoCloseable</code>을 구현하고 있어서, <code>try-with-resources</code>로 열면 <code>close()</code>를 깜빡할 걱정이 없어요.</p>`,
          code: {
            label: 'file_try_with_resources.java',
            src: `try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {
    System.out.println(reader.readLine());
} catch (IOException e) {
    System.out.println("읽기 실패");
}`
          }
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>"data.txt"</code> 파일을 한 줄씩 읽을 수 있게 여는 코드를 완성하세요.`,
          prefix: 'BufferedReader reader = new BufferedReader(new ', suffix: '("data.txt"));', accept: ['FileReader'], placeholder: '클래스 이름',
          why: '<code>new FileReader(파일이름)</code>을 <code>BufferedReader</code>로 감싸서 효율적으로 읽어요.',
          hint: '"파일을 읽는다"는 뜻의 클래스 이름이에요.'
        }),
        () => ({
          type: 'blank',
          q: `파일에서 한 줄을 읽는 메서드 이름을 쓰세요.`,
          prefix: 'String line = reader.', suffix: '();', accept: ['readLine'], placeholder: '메서드 이름',
          why: '<code>.readLine()</code>은 파일에서 한 줄을 읽어와요.',
          hint: '"줄을 읽다"라는 뜻이 합쳐진 이름이에요.'
        }),
        () => ({
          type: 'blank',
          q: `<code>"output.txt"</code> 파일에 내용을 쓸 수 있게 여는 코드를 완성하세요.`,
          prefix: 'BufferedWriter writer = new BufferedWriter(new ', suffix: '("output.txt"));', accept: ['FileWriter'], placeholder: '클래스 이름',
          why: '<code>new FileWriter(파일이름)</code>을 <code>BufferedWriter</code>로 감싸서 효율적으로 써요.',
          hint: '"파일을 쓴다"는 뜻의 클래스 이름이에요.'
        }),
        () => makeChoice(
          '파일을 열고 닫는 작업에 try-with-resources를 쓰면 좋은 이유는?',
          '예외가 나든 안 나든 자동으로 close()가 호출돼서 자원 정리를 깜빡할 위험이 없어서',
          ['파일을 더 빨리 읽을 수 있어서', 'try-with-resources 없이는 파일을 열 수 없어서', 'close()를 여러 번 불러야 해서'],
          'try-with-resources는 블록이 끝나면 자동으로 close()를 호출해줘요.',
          '이미 배운 try-with-resources의 장점이 파일에도 그대로 적용돼요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"log.txt"</code> 파일에 <code>"기록 완료"</code>라는 내용을 쓰는 코드를 BufferedWriter로 작성하세요. (닫기 포함)',
          starter: '',
          rows: 3,
          placeholder: 'BufferedWriter writer = new BufferedWriter(new FileWriter("log.txt"));\nwriter.write("기록 완료");\nwriter.close();',
          accept: ['BufferedWriter writer = new BufferedWriter(new FileWriter("log.txt"));writer.write("기록 완료");writer.close();'],
          why: 'BufferedWriter를 만들고 write()로 내용을 쓴 뒤 close()로 닫아요.',
          hint: 'new BufferedWriter(new FileWriter("log.txt")) 후 write, close를 순서대로 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '파일을 여는 도중이나 읽는 도중 예외가 나도, 그 파일이 확실히 닫히도록 보장하고 싶어요. 가장 안전한 방법은?',
        'try-with-resources로 BufferedReader를 연다', ['reader.close()를 아예 안 부른다', 'close()를 여러 번 반복해서 부른다', '예외가 안 나길 기도한다'],
        'try-with-resources는 예외가 나도 자동으로 close()를 호출해줘서 가장 안전해요.',
        '이미 배운 try-with-resources의 핵심 장점을 다시 떠올려보세요.'
      )
    },
    {
      id: 'dateTimeApi',
      title: '날짜/시간 API',
      ready: true,
      summary: 'LocalDate로 날짜를 값으로 다루고, 날짜 계산을 하는 법을 배워요.',
      goals: ['LocalDate로 날짜 만들기', 'plusDays로 날짜 계산하기', 'LocalDateTime으로 날짜와 시간 함께 다루기'],
      blocks: [
        {
          h: '날짜를 값으로 다루기: LocalDate',
          html: `<p><code>LocalDate.of(년, 월, 일)</code>로 특정 날짜를 값으로 만들어요. <code>.getYear()</code>, <code>.getMonthValue()</code>로 각각 꺼낼 수 있어요.</p>`,
          code: {
            label: 'localdate_basic.java',
            src: `LocalDate date = LocalDate.of(2026, 3, 5);
System.out.println(date.getYear());
System.out.println(date.getMonthValue());`,
            out: `2026\n3`
          }
        },
        {
          h: '날짜 계산하기: plusDays',
          html: `<p><code>.plusDays(n)</code>은 그 날짜에서 n일 뒤의 날짜를 계산해줘요. <code>.minusDays(n)</code>은 반대로 n일 전을 계산해요.</p>`,
          code: {
            label: 'plus_days.java',
            src: `LocalDate later = date.plusDays(30);
System.out.println(later);`,
            out: `2026-04-04`
          }
        },
        {
          h: '날짜와 시간을 함께: LocalDateTime',
          html: `<p>시각까지 함께 다루고 싶으면 <code>LocalDateTime</code>을 써요. <code>LocalDateTime.of(년, 월, 일, 시, 분)</code> 형태로 만들어요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const y = randInt(2024, 2027), m = randInt(1, 12), d = randInt(1, 28);
          return {
            type: 'blank',
            q: `<code>LocalDate date = LocalDate.of(${y}, ${m}, ${d});</code>일 때, <code>date.getMonthValue()</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(m)], placeholder: '숫자',
            why: `<code>LocalDate.of(년, 월, 일)</code>에서 두 번째 값이 월이라서 ${m}이에요.`,
            hint: 'of(년, 월, 일) 순서에서 두 번째 값을 확인해보세요.'
          };
        },
        () => {
          const days = randInt(5, 60);
          const start = new Date(2026, 0, 1);
          const end = new Date(start.getTime() + days * 86400000);
          const y = end.getFullYear(), m = String(end.getMonth() + 1).padStart(2, '0'), d = String(end.getDate()).padStart(2, '0');
          return {
            type: 'blank',
            q: `<code>LocalDate date = LocalDate.of(2026, 1, 1);</code> 후 <code>date.plusDays(${days})</code>의 결과는? (YYYY-MM-DD 형식)`,
            prefix: '', suffix: '', accept: [`${y}-${m}-${d}`], placeholder: 'YYYY-MM-DD',
            why: `2026년 1월 1일에서 ${days}일 뒤는 ${y}-${m}-${d}예요.`,
            hint: '2026년 1월 1일부터 날짜를 세어보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `2026년 12월 25일을 나타내는 LocalDate를 만드는 코드를 완성하세요.`,
          prefix: 'LocalDate christmas = LocalDate.', suffix: '(2026, 12, 25);', accept: ['of'], placeholder: '메서드 이름',
          why: '<code>LocalDate.of(년, 월, 일)</code>로 특정 날짜를 만들어요.',
          hint: '"~의"라는 뜻처럼, 그 날짜를 만든다는 의미예요.'
        }),
        () => makeChoice(
          '날짜뿐 아니라 시각(시, 분, 초)까지 함께 다루고 싶을 때 쓰는 클래스는?',
          '<code>LocalDateTime</code>', ['<code>LocalDate</code>', '<code>LocalTime</code>만 단독으로', '<code>String</code>'],
          '<code>LocalDateTime</code>은 날짜와 시각을 함께 다뤄요.',
          '이름에 Date와 Time이 함께 들어가 있어요.'
        ),
        () => ({
          type: 'code',
          q: '2026년 6월 15일을 나타내는 LocalDate를 만들고, 100일 뒤의 날짜를 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'LocalDate date = LocalDate.of(2026, 6, 15);\nSystem.out.println(date.plusDays(100));',
          accept: ['LocalDate date = LocalDate.of(2026, 6, 15);System.out.println(date.plusDays(100));'],
          why: 'LocalDate.of(...)로 날짜를 만들고 .plusDays(100)으로 100일 뒤를 계산해요.',
          hint: 'LocalDate.of(2026, 6, 15) 후 .plusDays(100)을 출력하세요.'
        }),
      ],
      boss: () => {
        const days = randInt(20, 200);
        const start = new Date(2026, 0, 1);
        const end = new Date(start.getTime() + days * 86400000);
        const y = end.getFullYear(), m = String(end.getMonth() + 1).padStart(2, '0'), d = String(end.getDate()).padStart(2, '0');
        return {
          type: 'blank',
          q: `<code>LocalDate.of(2026, 1, 1).plusDays(${days})</code>의 결과는? (YYYY-MM-DD 형식)`,
          prefix: '', suffix: '', accept: [`${y}-${m}-${d}`], placeholder: 'YYYY-MM-DD',
          why: `2026년 1월 1일에서 ${days}일 뒤는 ${y}-${m}-${d}예요.`,
          hint: '2026년 1월 1일부터 날짜를 세어보세요.'
        };
      }
    },
    {
      id: 'regexJava',
      title: '정규표현식: Pattern과 Matcher',
      ready: true,
      summary: '자바에서 정규표현식으로 패턴을 찾고 바꾸는 Pattern, Matcher 클래스와 String의 관련 메서드를 배워요.',
      goals: ['Pattern과 Matcher로 패턴 찾기', 'matches()로 전체 일치 확인하기', 'replaceAll로 바꾸기'],
      blocks: [
        {
          h: '패턴으로 문자열 다루기: Pattern과 Matcher',
          html: `<p><code>Pattern.compile(패턴)</code>으로 정규표현식을 만들고, <code>.matcher(문자열)</code>로 그 문자열에서 찾아볼 준비를 해요. <code>.find()</code>로 찾고, <code>.group()</code>으로 찾은 부분을 꺼내요.</p>`,
          code: {
            label: 'pattern_matcher.java',
            src: `Pattern pattern = Pattern.compile("\\\\d+");
Matcher matcher = pattern.matcher("나이는 17살");
if (matcher.find()) {
    System.out.println(matcher.group());
}`,
            out: `17`
          }
        },
        {
          h: '전체가 패턴과 맞는지 확인하기: matches()',
          html: `<p><code>문자열.matches(패턴)</code>은 문자열 <b>전체</b>가 그 패턴과 정확히 맞는지 <code>true</code>/<code>false</code>로 알려줘요.</p>`,
          code: {
            label: 'matches_check.java',
            src: `System.out.println("12345".matches("\\\\d+"));`,
            out: `true`
          }
        },
        {
          h: '패턴에 맞는 부분 바꾸기: replaceAll',
          html: `<p><code>.replaceAll(패턴, 새값)</code>은 패턴과 맞는 모든 부분을 새 값으로 바꿔줘요.</p>`,
          code: {
            label: 'replace_all.java',
            src: `String result = "hi hi".replaceAll("hi", "bye");
System.out.println(result);`,
            out: `bye bye`
          }
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(10, 99);
          return {
            type: 'blank',
            q: `<code>Matcher matcher = Pattern.compile("\\\\d+").matcher("제 나이는 ${n}살이에요"); matcher.find();</code> 후 <code>matcher.group()</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `<code>\\d+</code> 패턴이 연속된 숫자 ${n}을 찾아줘요.`,
            hint: '문자열 안의 숫자로만 이루어진 부분을 찾아보세요.'
          };
        },
        () => {
          const s = pick(['12345', 'abc123', '99']);
          const allDigits = /^\d+$/.test(s);
          return {
            type: 'blank',
            q: `<code>"${s}".matches("\\\\d+")</code>의 결과는? (<code>true</code> 또는 <code>false</code>)`,
            prefix: '', suffix: '', accept: [String(allDigits)], placeholder: 'true 또는 false',
            why: allDigits ? `"${s}"는 전부 숫자라서 true예요.` : `"${s}"는 숫자가 아닌 글자도 포함하고 있어서, 전체 일치가 안 돼 false예요.`,
            hint: 'matches()는 문자열 전체가 패턴과 정확히 일치해야 true예요.'
          };
        },
        () => ({
          type: 'blank',
          q: `문자열 전체가 정규표현식과 정확히 일치하는지 확인하는 String의 메서드를 쓰세요.`,
          prefix: '"12345".', suffix: '("\\\\d+")', accept: ['matches'], placeholder: '메서드 이름',
          why: '<code>.matches(패턴)</code>은 문자열 전체가 그 패턴과 일치하는지 확인해요.',
          hint: '"맞다, 일치하다"라는 뜻 그대로예요.'
        }),
        () => makeChoice(
          '정규표현식을 만들 때 쓰는 클래스는?',
          '<code>Pattern</code>', ['<code>Regex</code>', '<code>Matcher</code>만으로 충분하다', '<code>StringBuilder</code>'],
          '<code>Pattern.compile(패턴)</code>으로 정규표현식 객체를 만들어요.',
          '"패턴"이라는 뜻 그대로의 클래스 이름이에요.'
        ),
        () => ({
          type: 'code',
          q: '문자열 <code>"hello hello"</code> 안의 모든 <code>"hello"</code>를 <code>"hi"</code>로 바꿔서 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'System.out.println("hello hello".replaceAll("hello", "hi"));',
          accept: ['System.out.println("hello hello".replaceAll("hello", "hi"));'],
          why: '.replaceAll(패턴, 새값)으로 모든 일치 부분을 바꿔요.',
          hint: '"hello hello".replaceAll("hello", "hi")를 출력하세요.'
        }),
      ],
      boss: () => {
        const a = randInt(10, 99), b = randInt(10, 99);
        return {
          type: 'blank',
          q: `<code>"사과 ${a}개, 바나나 ${b}개".replaceAll("\\\\d+", "N")</code>의 결과는?`,
          prefix: '', suffix: '', accept: [`사과 N개, 바나나 N개`], placeholder: '값',
          why: `\\d+ 패턴과 일치하는 모든 숫자(${a}, ${b})가 각각 "N"으로 바뀌어서 "사과 N개, 바나나 N개"가 돼요.`,
          hint: '숫자로 된 부분이 전부 "N"으로 바뀐다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'buildTools',
      title: 'Maven과 Gradle 빌드 도구',
      ready: true,
      summary: '자바 프로젝트의 라이브러리(의존성)와 빌드 과정을 관리해주는 Maven, Gradle의 기본 개념을 배워요.',
      goals: ['빌드 도구가 왜 필요한지', 'Maven의 pom.xml', 'Gradle의 build.gradle'],
      blocks: [
        {
          h: '자바 프로젝트의 의존성과 빌드를 관리하기',
          html: `<p>자바 프로젝트는 다른 사람이 만든 라이브러리(.jar 파일)를 추가하고, 코드를 컴파일·테스트·패키징해야 해요. 이 과정을 자동화하고 관리해주는 게 <b>빌드 도구</b>예요. 대표적으로 <b>Maven</b>과 <b>Gradle</b>이 있어요.</p>`
        },
        {
          h: 'Maven: pom.xml',
          html: `<p>Maven은 <code>pom.xml</code> 파일에 필요한 라이브러리를 적어두면, 알아서 다운로드하고 프로젝트에 연결해줘요.</p>`,
          code: {
            label: 'pom.xml',
            lang: 'xml',
            src: `<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.13.2</version>
</dependency>`
          }
        },
        {
          h: 'Gradle: build.gradle',
          html: `<p>Gradle은 <code>build.gradle</code> 파일을 쓰고, Maven보다 좀 더 <b>간결한 문법</b>이에요. 최근 자바·안드로이드 프로젝트에서 더 널리 쓰여요.</p>`,
          code: {
            label: 'build.gradle',
            src: `dependencies {
    implementation 'junit:junit:4.13.2'
}`
          }
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '빌드 도구(Maven, Gradle)의 주된 역할은?',
          '필요한 라이브러리를 관리하고, 컴파일·테스트·패키징 과정을 자동화한다',
          ['자바 코드를 자동으로 파이썬으로 바꿔준다', 'IDE 없이는 절대 실행할 수 없게 만든다', '변수 이름을 자동으로 지어준다'],
          '빌드 도구는 의존성(라이브러리) 관리와 빌드 자동화를 담당해요.',
          '"의존성 관리 + 빌드 자동화"라는 두 가지 역할을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `Maven 프로젝트에서 필요한 라이브러리 목록을 적어두는 설정 파일의 이름을 쓰세요.`,
          prefix: '', suffix: '', accept: ['pom.xml'], placeholder: '파일 이름',
          why: 'Maven은 <code>pom.xml</code>에 의존성(라이브러리) 목록을 적어요.',
          hint: '"Project Object Model"의 줄임말과 xml 확장자가 합쳐진 이름이에요.'
        }),
        () => ({
          type: 'blank',
          q: `Gradle 프로젝트의 빌드 설정 파일 이름을 쓰세요.`,
          prefix: '', suffix: '', accept: ['build.gradle'], placeholder: '파일 이름',
          why: 'Gradle은 <code>build.gradle</code>에 의존성과 빌드 설정을 적어요.',
          hint: '"빌드"라는 단어와 도구 이름이 합쳐진 파일 이름이에요.'
        }),
        () => makeChoice(
          'Maven과 Gradle의 차이로 알맞은 것은?',
          'Maven은 XML(pom.xml), Gradle은 더 간결한 문법(build.gradle)을 쓴다',
          ['Maven은 자바 전용이 아니고 Gradle만 자바 전용이다', '둘 다 완전히 같은 문법을 쓴다', 'Gradle은 라이브러리를 관리할 수 없다'],
          'Maven은 XML 기반의 pom.xml을, Gradle은 좀 더 간결한 문법의 build.gradle을 써요.',
          '두 도구가 쓰는 설정 파일의 형식 차이를 떠올려보세요.'
        ),
      ],
      boss: () => makeChoice(
        '새 프로젝트에서 JUnit 라이브러리를 다운로드해서 자동으로 연결하고 싶어요(직접 jar 파일을 찾아 넣지 않고). 어떻게 해야 할까요?',
        'pom.xml(또는 build.gradle)에 JUnit 의존성을 추가한다', ['JUnit 소스 코드를 직접 복사해서 프로젝트에 붙여넣는다', '자바 자체에 이미 내장돼 있어서 아무것도 안 해도 된다', 'IDE를 재설치한다'],
        '빌드 도구의 설정 파일에 의존성을 추가하면, Maven/Gradle이 알아서 라이브러리를 다운로드하고 연결해줘요.',
        '빌드 도구의 핵심 역할이 "의존성 관리"라는 걸 떠올려보세요.'
      )
    },
    {
      id: 'junitTesting',
      title: 'JUnit으로 테스트 작성',
      ready: true,
      summary: '실무 표준 테스트 도구인 JUnit으로 @Test와 assertEquals를 쓰는 법을 배워요.',
      goals: ['@Test로 테스트 메서드 만들기', 'assertEquals로 검증하기', '여러 테스트 작성하기'],
      blocks: [
        {
          h: '테스트 메서드 표시하기: @Test',
          html: `<p>메서드 위에 <code>@Test</code>를 붙이면, JUnit이 그 메서드를 <b>테스트</b>로 인식하고 자동으로 실행해줘요.</p>`,
          code: {
            label: 'CalculatorTest.java',
            src: `public class CalculatorTest {
    @Test
    public void testAdd() {
        assertEquals(5, add(2, 3));
    }
}`
          }
        },
        {
          h: '값이 맞는지 확인하기: assertEquals',
          html: `<p><code>assertEquals(기대값, 실제값)</code>은 두 값이 같은지 확인해요. 다르면 그 테스트는 <b>실패</b>로 표시돼요.</p>`
        },
        {
          h: '여러 테스트를 한 클래스에',
          html: `<p>한 클래스 안에 <code>@Test</code> 메서드를 여러 개 만들어서, 다양한 경우를 각각 확인할 수 있어요.</p>`,
          code: {
            label: 'multiple_tests.java',
            src: `@Test
public void testAddPositive() {
    assertEquals(5, add(2, 3));
}

@Test
public void testAddNegative() {
    assertEquals(-2, add(-1, -1));
}`
          }
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `메서드를 테스트로 인식시키기 위해 위에 붙이는 것을 쓰세요.`,
          prefix: '', suffix: '\npublic void testAdd() { assertEquals(5, add(2, 3)); }', accept: ['@Test'], placeholder: '어노테이션',
          why: '<code>@Test</code>를 붙이면 JUnit이 그 메서드를 테스트로 실행해요.',
          hint: '골뱅이(@) 뒤에 "테스트"라는 뜻의 영어 단어를 붙이세요.'
        }),
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          const ok = Math.random() < 0.5;
          const expected = ok ? a + b : a + b + randInt(1, 5);
          return {
            type: 'blank',
            q: `<code>assertEquals(${expected}, add(${a}, ${b}))</code>를 실행하면 어떻게 될까요? (통과하면 "통과", 실패하면 "실패")`,
            prefix: '', suffix: '', accept: [ok ? '통과' : '실패'], placeholder: '통과 또는 실패',
            why: `add(${a}, ${b})는 ${a + b}인데, 기대값 ${expected}와(과) ${ok ? '같아서 통과해요' : '달라서 실패해요'}.`,
            hint: `add(${a}, ${b})의 실제 값과 기대값이 같은지 확인해보세요.`
          };
        },
        () => makeChoice(
          '<code>assertEquals(기대값, 실제값)</code>에서 순서가 중요한 이유는?',
          '관례상 첫 번째는 기대값, 두 번째는 실제값으로 두어 실패 메시지를 이해하기 쉽게 하기 위해',
          ['순서를 바꾸면 컴파일 오류가 나서', '두 번째 인자만 검사되기 때문에', '순서는 전혀 중요하지 않다'],
          '관례적으로 (기대값, 실제값) 순서를 지키면, 실패했을 때 "기대한 값은 이건데 실제로는 이거였다"는 메시지가 명확해져요.',
          '실패 메시지를 읽는 사람 입장에서 어떤 순서가 이해하기 편할지 생각해보세요.'
        ),
        () => makeChoice(
          'JUnit에서 여러 개의 테스트를 만드는 방법은?',
          '한 클래스 안에 @Test 메서드를 여러 개 만든다', ['한 메서드 안에 여러 assertEquals를 절대 못 넣는다', '클래스마다 테스트를 하나만 만들어야 한다', 'main 메서드 안에 다 넣어야 한다'],
          '@Test 메서드를 여러 개 만들면, JUnit이 각각을 독립적인 테스트로 실행해줘요.',
          '다양한 경우(양수, 음수, 0 등)를 각각 테스트로 나눠서 확인한다고 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>subtract(10, 3)</code>이 <code>7</code>을 반환하는지 확인하는 <code>@Test</code> 메서드 <code>testSubtract()</code>를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: '@Test\npublic void testSubtract() {\n    assertEquals(7, subtract(10, 3));\n}',
          accept: ['@Test\npublic void testSubtract() {assertEquals(7, subtract(10, 3));}'],
          why: '@Test를 붙이고, assertEquals(기대값, 실제값)으로 결과를 확인해요.',
          hint: '@Test 다음 줄에 public void testSubtract() { assertEquals(7, subtract(10, 3)); }를 쓰세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 20), b = randInt(1, 20);
        return {
          type: 'code',
          q: `<code>multiply(a, b)</code>가 <code>a * b</code>를 반환한다고 가정하고, <code>multiply(${a}, ${b})</code>가 <code>${a * b}</code>를 반환하는지 확인하는 <code>@Test</code> 메서드 <code>testMultiply()</code>를 작성하세요.`,
          starter: '',
          rows: 3,
          placeholder: `@Test\npublic void testMultiply() {\n    assertEquals(${a * b}, multiply(${a}, ${b}));\n}`,
          accept: [`@Test\npublic void testMultiply() {assertEquals(${a * b}, multiply(${a}, ${b}));}`],
          why: `${a} × ${b} = ${a * b}이 맞는지 assertEquals로 확인하는 테스트예요.`,
          hint: '@Test 다음 줄에 public void testMultiply() { assertEquals(...) }를 쓰세요.'
        };
      }
    },
    {
      id: 'jdbcBasics',
      title: 'JDBC로 DB 연결하기',
      ready: true,
      summary: '자바에서 데이터베이스에 연결해서 SQL을 실행하고 결과를 읽어오는 JDBC의 기본을 배워요.',
      goals: ['DriverManager로 연결하기', 'Statement로 SQL 실행하기', 'ResultSet으로 결과 읽기'],
      blocks: [
        {
          h: 'DB에 연결하기: DriverManager',
          html: `<p><code>DriverManager.getConnection(주소, 아이디, 비밀번호)</code>로 데이터베이스에 연결해요.</p>`,
          code: {
            label: 'jdbc_connect.java',
            src: `Connection conn = DriverManager.getConnection(url, user, password);`
          }
        },
        {
          h: 'SQL 실행하기: Statement',
          html: `<p><code>conn.createStatement()</code>로 SQL을 실행할 준비를 하고, <code>.executeQuery(SQL)</code>로 <code>SELECT</code>를 실행해요.</p>`,
          code: {
            label: 'jdbc_query.java',
            src: `Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery("SELECT name FROM students");`
          }
        },
        {
          h: '결과 하나씩 읽기: ResultSet',
          html: `<p><code>rs.next()</code>는 다음 행으로 이동하고, <b>더 이상 행이 없으면 false</b>를 돌려줘요. <code>rs.getString("열이름")</code>으로 그 행의 값을 꺼내요.</p>`,
          code: {
            label: 'jdbc_resultset.java',
            src: `while (rs.next()) {
    System.out.println(rs.getString("name"));
}`
          },
          after: `<div class="note"><b>보안 주의</b> — 사용자 입력값을 SQL에 직접 이어붙이면 SQL 인젝션 위험이 있어요. 실무에서는 <code>Statement</code> 대신 <code>?</code> 자리표시자를 쓰는 <code>PreparedStatement</code>를 써요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `데이터베이스에 연결할 때 쓰는 클래스와 메서드를 완성하세요.`,
          prefix: 'Connection conn = ', suffix: '.getConnection(url, user, password);', accept: ['DriverManager'], placeholder: '클래스 이름',
          why: '<code>DriverManager.getConnection(...)</code>으로 DB에 연결해요.',
          hint: '"드라이버를 관리한다"는 뜻의 클래스 이름이에요.'
        }),
        () => ({
          type: 'blank',
          q: `SELECT문을 실행해서 결과를 받아오는 메서드 이름을 쓰세요.`,
          prefix: 'ResultSet rs = stmt.', suffix: '("SELECT name FROM students");', accept: ['executeQuery'], placeholder: '메서드 이름',
          why: '<code>.executeQuery(SQL)</code>은 SELECT 결과를 ResultSet으로 돌려줘요.',
          hint: '"질의(query)를 실행한다(execute)"는 뜻이 합쳐진 이름이에요.'
        }),
        () => {
          const count = randInt(2, 6);
          return {
            type: 'blank',
            q: `<code>students</code>에 행이 ${count}개 있을 때, <code>while (rs.next()) { count++; }</code>로 세면 (count가 0에서 시작할 때) 최종 count 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(count)], placeholder: '숫자',
            why: `rs.next()는 행이 있는 동안 계속 true를 반환해서, ${count}개 행 전부를 순회하며 count가 ${count}까지 늘어나요.`,
            hint: 'rs.next()는 더 이상 행이 없을 때 false가 된다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          'SQL에 사용자 입력값을 직접 이어붙이는 대신, 안전하게 값을 넣기 위해 실무에서 쓰는 것은?',
          'PreparedStatement의 ? 자리표시자', ['Statement를 두 번 만들기', 'ResultSet을 두 개 쓰기', 'DriverManager를 여러 번 부르기'],
          'PreparedStatement의 ? 자리표시자는 값을 안전하게 처리해서 SQL 인젝션을 막아줘요.',
          '파이썬/자바스크립트에서도 배운 SQL 인젝션 방지 원칙과 같아요.'
        ),
        () => ({
          type: 'code',
          q: '<code>stmt</code>로 <code>"SELECT name FROM students"</code>를 실행해서 <code>rs</code>에 담고, <code>while (rs.next())</code>로 각 행의 name을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'ResultSet rs = stmt.executeQuery("SELECT name FROM students");\nwhile (rs.next()) {\n    System.out.println(rs.getString("name"));\n}',
          accept: ['ResultSet rs = stmt.executeQuery("SELECT name FROM students");while (rs.next()) {System.out.println(rs.getString("name"));}'],
          why: 'executeQuery로 결과를 받고, while (rs.next())로 각 행을 순회하며 값을 꺼내요.',
          hint: 'executeQuery 후 while (rs.next()) { System.out.println(rs.getString("name")); }를 쓰세요.'
        }),
      ],
      boss: () => {
        const count = randInt(3, 8);
        return {
          type: 'blank',
          q: `<code>scores</code> 표에 행이 ${count}개 있을 때, <code>int total = 0; while (rs.next()) { total++; }</code>를 실행하면 최종 <code>total</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(count)], placeholder: '숫자',
          why: `rs.next()가 행이 있는 동안 계속 true를 반환해서, ${count}개 행 전부를 세면 total은 ${count}가 돼요.`,
          hint: 'rs.next()가 false가 될 때까지 반복해서 행 개수를 센다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'loggingJava',
      title: '로깅',
      ready: true,
      summary: 'System.out.println 대신, 중요도를 구분할 수 있는 Logger로 기록을 남기는 법을 배워요.',
      goals: ['Logger 기본 사용법', '로그 레벨(INFO/WARNING/SEVERE)', 'println 대신 로깅을 쓰는 이유'],
      blocks: [
        {
          h: '기록을 남기는 표준 방법: Logger',
          html: `<p><code>Logger.getLogger(이름)</code>으로 로거를 만들고, <code>.info()</code>, <code>.warning()</code>, <code>.severe()</code>로 중요도에 따라 기록을 남겨요.</p>`,
          code: {
            label: 'logger_basic.java',
            src: `private static final Logger logger = Logger.getLogger(MyClass.class.getName());
logger.info("서버가 시작됐어요");`
          }
        },
        {
          h: '로그 레벨',
          html: `<table>
                   <tr><th>레벨</th><th>언제 쓰나요</th></tr>
                   <tr><td><code>INFO</code></td><td>정상적으로 잘 진행되고 있다는 기록</td></tr>
                   <tr><td><code>WARNING</code></td><td>문제가 될 수도 있지만 아직 심각하진 않음</td></tr>
                   <tr><td><code>SEVERE</code></td><td>심각한 오류가 발생함</td></tr>
                 </table>`
        },
        {
          h: '왜 println 대신 로깅을 쓸까요',
          html: `<p>로깅은 <b>중요도별로 걸러서 볼 수 있고</b>, <b>시간</b>도 자동으로 기록하며, 나중에 파일로 저장하도록 설정만 바꾸면 코드 수정 없이 그대로 쓸 수 있어요. <code>println</code>은 이런 걸 하나도 못 해줘요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>MyClass</code>용 Logger를 만드는 코드를 완성하세요.`,
          prefix: 'Logger logger = Logger.', suffix: '(MyClass.class.getName());', accept: ['getLogger'], placeholder: '메서드 이름',
          why: '<code>Logger.getLogger(이름)</code>으로 로거를 만들어요.',
          hint: '"로거를 가져온다(얻는다)"는 뜻의 메서드예요.'
        }),
        () => makeChoice(
          '심각한 오류가 발생했을 때 쓰기 알맞은 로그 레벨은?',
          '<code>SEVERE</code>', ['<code>INFO</code>', '<code>WARNING</code>', '<code>DEBUG</code>만 써야 한다'],
          '<code>SEVERE</code>는 심각한 오류 상황에 써요.',
          '"심각한, 엄격한"이라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `"주의가 필요하지만 아직 심각하진 않은" 상황에 쓰는 로그 메서드를 쓰세요.`,
          prefix: 'logger.', suffix: '("캐시가 거의 찼어요");', accept: ['warning'], placeholder: '메서드 이름',
          why: '<code>logger.warning(...)</code>은 경고 수준의 기록을 남겨요.',
          hint: '"경고"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'System.out.println 대신 Logger를 쓰면 좋은 이유는?',
          '중요도별로 걸러 보고, 시간 기록과 저장 방식을 코드 수정 없이 바꿀 수 있어서',
          ['println보다 항상 실행 속도가 빨라서', 'Logger 없이는 문자열을 출력할 수 없어서', 'Logger는 한글을 지원하지 않아서'],
          'Logger는 중요도 구분, 시간 기록, 출력 위치 설정 등을 유연하게 다룰 수 있어서 실무 표준이에요.',
          'println은 그냥 화면에 보여주기만 한다는 점과 비교해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"결제에 실패했어요"</code>라는 심각한 오류 로그를 남기는 코드를 작성하세요. (logger는 이미 만들어져 있다고 가정)',
          starter: '',
          placeholder: 'logger.severe("결제에 실패했어요");',
          accept: ['logger.severe("결제에 실패했어요");'],
          why: '심각한 오류이니 logger.severe(메시지)가 알맞아요.',
          hint: 'logger.severe( ) 안에 메시지를 그대로 넣으세요.'
        }),
      ],
      boss: () => {
        const scenario = pick([
          { msg: '결제 서버 연결 실패', level: 'severe' },
          { msg: '메모리 사용량이 높아지고 있어요', level: 'warning' },
          { msg: '사용자 로그인 성공', level: 'info' },
        ]);
        return {
          type: 'blank',
          q: `"${scenario.msg}"라는 상황을 로그로 남기려고 해요. 가장 알맞은 레벨의 <code>logger.${'{레벨}'}("${scenario.msg}")</code>에서, 빈칸에 들어갈 레벨 이름(소문자)은?`,
          prefix: 'logger.', suffix: `("${scenario.msg}")`, accept: [scenario.level], placeholder: '레벨 이름',
          why: `이 상황은 ${scenario.level === 'severe' ? '심각한 오류라서 severe가' : scenario.level === 'warning' ? '아직 심각하진 않지만 주의가 필요해서 warning이' : '정상적으로 잘 진행된 상황이라서 info가'} 알맞아요.`,
          hint: '상황이 심각한 오류인지, 주의가 필요한 수준인지, 정상 진행인지 판단해보세요.'
        };
      }
    },
    {
      id: 'innerAnonymousClasses',
      title: '이너 클래스와 익명 클래스',
      ready: true,
      summary: '클래스 안에 클래스를 만드는 이너 클래스와, 이름 없이 즉석에서 구현하는 익명 클래스를 배워요.',
      goals: ['클래스 안의 클래스: 이너 클래스', '이름 없이 즉석에서 구현하기: 익명 클래스', '람다와의 관계'],
      blocks: [
        {
          h: '클래스 안에 클래스: 이너 클래스',
          html: `<p>클래스 안에 또 다른 클래스를 정의할 수 있어요. 바깥 클래스와 밀접하게 관련된 기능을 표현할 때 써요.</p>`,
          code: {
            label: 'inner_class.java',
            src: `class Outer {
    class Inner {
        void show() {
            System.out.println("Inner 클래스");
        }
    }
}

Outer outer = new Outer();
Outer.Inner inner = outer.new Inner();
inner.show();`,
            out: `Inner 클래스`
          }
        },
        {
          h: '이름 없이 즉석에서 만들기: 익명 클래스',
          html: `<p>인터페이스나 클래스를 <b>따로 이름 붙여 선언하지 않고</b>, 그 자리에서 바로 구현체를 만들 수 있어요.</p>`,
          code: {
            label: 'anonymous_class.java',
            src: `Greeter greeter = new Greeter() {
    public void greet(String name) {
        System.out.println("안녕, " + name);
    }
};
greeter.greet("지수");`,
            out: `안녕, 지수`
          }
        },
        {
          h: '람다와의 관계',
          html: `<p>구현하려는 게 <b>함수형 인터페이스</b>(메서드가 하나뿐)라면, 익명 클래스 대신 <b>람다</b>로 훨씬 짧게 쓸 수 있어요. 메서드가 여러 개거나 상태(필드)가 필요한 경우엔 익명 클래스를 써야 해요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>Outer</code>의 이너 클래스 <code>Inner</code>의 객체를 만드는 코드를 완성하세요. (outer는 이미 만들어져 있다고 가정)`,
          prefix: 'Outer.Inner inner = outer.', suffix: ' Inner();', accept: ['new'], placeholder: '키워드',
          why: '이너 클래스는 <code>바깥객체.new 이너클래스이름()</code> 형태로 만들어요.',
          hint: '객체를 만들 때 항상 쓰는 그 키워드예요.'
        }),
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>Greeter greeter = new Greeter() { public void greet(String name) { System.out.println("안녕, " + name); } };</code>일 때, <code>greeter.greet("${name}")</code>의 결과는?`,
            prefix: '', suffix: '', accept: [`안녕, ${name}`], placeholder: '출력될 문장',
            why: `익명 클래스로 구현한 greet가 그대로 실행돼서 "안녕, ${name}"이 출력돼요.`,
            hint: '익명 클래스도 인터페이스를 구현한 실제 객체라는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          '함수형 인터페이스(메서드가 하나뿐)를 구현할 때, 익명 클래스 대신 쓸 수 있는 훨씬 짧은 방법은?',
          '람다 표현식', ['이너 클래스', 'record', 'enum'],
          '메서드가 하나뿐인 인터페이스는 람다로 훨씬 간결하게 구현할 수 있어요.',
          '이미 배운 람다와 함수형 인터페이스의 관계를 떠올려보세요.'
        ),
        () => makeChoice(
          '메서드가 여러 개인 인터페이스를 즉석에서 구현하고 싶을 때 적합한 것은?',
          '익명 클래스', ['람다 표현식', 'enum', 'record'],
          '람다는 메서드가 하나뿐인 함수형 인터페이스에만 쓸 수 있어요. 메서드가 여러 개면 익명 클래스를 써야 해요.',
          '람다로 표현할 수 없는 경우가 언제인지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Greeter</code> 인터페이스(메서드 <code>greet(String name)</code>)를 익명 클래스로 구현해서, <code>"안녕"</code>을 출력하도록 만들고 <code>"민준"</code>으로 호출하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'Greeter greeter = new Greeter() {\n    public void greet(String name) {\n        System.out.println("안녕, " + name);\n    }\n};\ngreeter.greet("민준");',
          accept: ['Greeter greeter = new Greeter() {public void greet(String name) {System.out.println("안녕, " + name);}};greeter.greet("민준");'],
          why: 'new 인터페이스이름() { 메서드 구현 } 형태로 익명 클래스를 만들어요.',
          hint: 'new Greeter() { public void greet(String name) { ... } }; 형태로 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '인터페이스에 메서드가 <code>start()</code>, <code>stop()</code> 두 개 있을 때, 이걸 즉석에서 구현하려면 람다 대신 무엇을 써야 할까요?',
        '익명 클래스', ['람다 표현식', 'enum', 'record'],
        '람다는 메서드가 하나뿐인 함수형 인터페이스에만 쓸 수 있어서, 메서드가 두 개인 이 인터페이스는 익명 클래스로 구현해야 해요.',
        '람다를 쓸 수 있는 조건(메서드가 딱 하나)을 다시 떠올려보세요.'
      )
    },
    {
      id: 'varTextBlocks',
      title: 'var 타입 추론과 텍스트 블록',
      ready: true,
      summary: '타입을 자바가 알아서 추론하게 하는 var와, 여러 줄 문자열을 쉽게 쓰는 텍스트 블록을 배워요.',
      goals: ['var로 타입 추론하기', '텍스트 블록으로 여러 줄 문자열 쓰기', '언제 var를 피해야 할지'],
      blocks: [
        {
          h: '타입을 자바가 알아서 추론하기: var',
          html: `<p><code>var</code>로 변수를 선언하면, 오른쪽 값을 보고 컴파일러가 <b>타입을 자동으로 정해요</b>. <code>String name = "지수";</code>와 완전히 똑같이 동작해요 — 타입이 사라지는 게 아니라, 컴파일러가 대신 알아내 주는 거예요.</p>`,
          code: {
            label: 'var_basic.java',
            src: `var name = "지수";
var age = 17;
System.out.println(name + " " + age);`,
            out: `지수 17`
          }
        },
        {
          h: '여러 줄 문자열을 쉽게: 텍스트 블록',
          html: `<p><code>"""</code>로 시작하고 끝나는 <b>텍스트 블록</b>은, 줄바꿈이 그대로 유지되는 여러 줄 문자열을 쉽게 만들어줘요. 예전엔 <code>\\n</code>과 <code>+</code>로 일일이 이어붙여야 했어요.</p>`,
          code: {
            label: 'text_block.java',
            src: `String html = """
    <html>
        <body>안녕</body>
    </html>
    """;`
          }
        },
        {
          h: '언제 var를 피해야 할까요',
          html: `<p>오른쪽 값만 봐서는 타입을 짐작하기 어려운 복잡한 경우(복잡한 제네릭 등)에는, <code>var</code> 대신 <b>명시적인 타입</b>을 쓰는 게 코드를 읽는 사람에게 더 친절할 수 있어요.</p>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>var name = "지수";</code>는 실제로 어떤 타입으로 동작할까요?',
          '<code>String</code> (오른쪽 값을 보고 컴파일러가 추론)', ['타입이 아예 없는 특수한 값', '항상 Object 타입', '실행할 때마다 타입이 바뀐다'],
          'var는 타입을 없애는 게 아니라, 오른쪽 값을 보고 컴파일 시점에 정확한 타입(여기선 String)을 추론해줘요.',
          '컴파일 시점에 이미 타입이 정해진다는 점을 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `자바가 오른쪽 값을 보고 타입을 자동으로 추론하게 하는 키워드를 쓰세요.`,
          prefix: '', suffix: ' age = 17;', accept: ['var'], placeholder: '키워드',
          why: '<code>var</code>는 오른쪽 값을 보고 타입을 자동으로 추론해요.',
          hint: '"변수"라는 뜻의 영어 단어를 줄인 키워드예요.'
        }),
        () => ({
          type: 'blank',
          q: `여러 줄 문자열을 쉽게 쓸 수 있게 해주는, 텍스트 블록을 시작하고 끝내는 기호를 쓰세요.`,
          prefix: 'String html = ', suffix: '\n    <html>\n    ...\n    """;', accept: ['"""'], placeholder: '기호',
          why: '<code>"""</code>로 감싸면 여러 줄 문자열을 그대로 쓸 수 있어요.',
          hint: '큰따옴표를 세 개 이어 쓰는 기호예요.'
        }),
        () => makeChoice(
          '텍스트 블록(""")을 쓰면 좋은 점은?',
          '줄바꿈과 들여쓰기를 그대로 유지한 여러 줄 문자열을 \\n과 +로 이어붙이지 않고 쓸 수 있어서',
          ['텍스트 블록 없이는 문자열을 아예 못 만들어서', '실행 속도가 항상 빨라져서', '한글만 지원하는 특수 문자열이라서'],
          '텍스트 블록은 여러 줄 문자열을 훨씬 간결하고 읽기 쉽게 만들어줘요.',
          '예전에 \\n과 +로 여러 줄을 이어붙이던 방식과 비교해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>var</code>를 이용해 <code>score</code>라는 변수에 정수 <code>90</code>을 담는 코드를 작성하세요.',
          starter: '',
          placeholder: 'var score = 90;',
          accept: ['var score = 90;'],
          why: 'var score = 90;은 int score = 90;과 완전히 똑같이 동작해요.',
          hint: 'var score = 90;을 그대로 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '한 줄에 다 담기 힘든, 줄바꿈이 여러 번 있는 HTML 문자열을 자바 코드 안에 깔끔하게 쓰고 싶어요. 가장 적합한 방법은?',
        '텍스트 블록(""")을 쓴다', ['\\n과 + 연산자로 한 줄씩 이어붙인다', 'var를 쓴다', '문자열을 아예 여러 변수로 나눈다'],
        '텍스트 블록은 줄바꿈이 그대로 유지되는 여러 줄 문자열을 가장 간결하게 표현해줘요.',
        '예전 방식(\\n + 이어붙이기)과 텍스트 블록 중 어느 쪽이 더 간결할지 생각해보세요.'
      )
    }],
  tierBoss: {
    beginner: () => ({
      type: 'code',
      q: '1부터 <code>n</code>까지의 합을 반환하는 메서드 <code>sumRange(int n)</code>을 만드세요(변수와 for문 사용). <code>sumRange(5)</code>의 결과가 10보다 크면 <code>System.out.println("많음")</code>을, 아니면 <code>System.out.println("적음")</code>을 실행하는 전체 코드를 작성하세요.',
      starter: '',
      rows: 10,
      placeholder: 'static int sumRange(int n) {\n    int total = 0;\n    for (int i = 1; i <= n; i++) {\n        total += i;\n    }\n    return total;\n}\n\nif (sumRange(5) > 10) {\n    System.out.println("많음");\n} else {\n    System.out.println("적음");\n}',
      accept: ['static int sumRange(int n) {int total = 0;for (int i = 1; i <= n; i++) {total += i;}return total;}if (sumRange(5) > 10) {System.out.println("많음");} else {System.out.println("적음");}'],
      why: 'sumRange(5)는 1부터 5까지 더한 15를 반환하고, 15는 10보다 크니까 "많음"이 출력돼요.',
      hint: '메서드 안에서 total = 0으로 시작해 for문으로 더한 값을 return한 뒤, 그 결과를 if/else로 비교하세요.'
    }),
    intermediate: () => ({
      type: 'code',
      q: '필드 <code>int[] scores = new int[3];</code>와 <code>int count = 0;</code>을 가지는 <code>Scoreboard</code> 클래스를 만드세요. <code>add(int score)</code> 메서드는 <code>scores[count] = score; count++;</code>를 하고, <code>average()</code> 메서드는 <code>int sum</code>을 반복문으로 구한 뒤 <code>sum / count</code>를 반환해요. <code>new Scoreboard()</code>를 만들고(점수는 추가하지 않고), <code>try/catch</code>로 <code>sb.average()</code>를 호출해서 <code>ArithmeticException</code>이 나면 <code>"점수가 없어서 평균을 구할 수 없어요"</code>를 출력하는 전체 코드를 작성하세요.',
      starter: '',
      rows: 20,
      placeholder: 'class Scoreboard {\n    int[] scores = new int[3];\n    int count = 0;\n    void add(int score) {\n        scores[count] = score;\n        count++;\n    }\n    int average() {\n        int sum = 0;\n        for (int i = 0; i < count; i++) {\n            sum += scores[i];\n        }\n        return sum / count;\n    }\n}\n\nScoreboard sb = new Scoreboard();\ntry {\n    System.out.println(sb.average());\n} catch (ArithmeticException e) {\n    System.out.println("점수가 없어서 평균을 구할 수 없어요");\n}',
      accept: ['class Scoreboard {int[] scores = new int[3];int count = 0;void add(int score) {scores[count] = score;count++;}int average() {int sum = 0;for (int i = 0; i < count; i++) {sum += scores[i];}return sum / count;}}Scoreboard sb = new Scoreboard();try {System.out.println(sb.average());} catch (ArithmeticException e) {System.out.println("점수가 없어서 평균을 구할 수 없어요");}'],
      why: 'count가 0인 상태로 average()를 호출하면 sum/count가 0/0이 되어 ArithmeticException이 나고, catch 블록이 그 오류를 잡아 메시지를 출력해요.',
      hint: 'Scoreboard 클래스에 scores 배열, add, average를 각각 만들고, average() 호출을 try/catch로 감싸세요.'
    }),
    advanced: () => ({
      type: 'code',
      q: '맨 위에 <code>import java.util.ArrayList;</code>를 쓰세요. 필드 <code>T value;</code>와 <code>set(T value)</code>, <code>get()</code> 메서드를 가지는 제네릭 클래스 <code>Box&lt;T&gt;</code>를 만드세요. <code>Animal</code> 클래스(필드 <code>String name;</code>, 생성자에서 <code>this.name = name;</code>)를 상속받는 <code>Robot</code> 클래스(생성자에서 <code>super(name)</code> 호출)를 만드세요. <code>ArrayList&lt;Robot&gt; fleet = new ArrayList&lt;&gt;();</code>을 만들어 <code>fleet.add(new Robot("R2"));</code>을 실행하고, <code>Box&lt;Robot&gt; box = new Box&lt;&gt;();</code>에 <code>box.set(fleet.get(0));</code>을 한 뒤 <code>box.get().name</code>을 출력하는 전체 코드를 작성하세요.',
      starter: '',
      rows: 24,
      placeholder: 'import java.util.ArrayList;\n\nclass Box<T> {\n    T value;\n    void set(T value) {\n        this.value = value;\n    }\n    T get() {\n        return value;\n    }\n}\n\nclass Animal {\n    String name;\n    Animal(String name) {\n        this.name = name;\n    }\n}\n\nclass Robot extends Animal {\n    Robot(String name) {\n        super(name);\n    }\n}\n\nArrayList<Robot> fleet = new ArrayList<>();\nfleet.add(new Robot("R2"));\n\nBox<Robot> box = new Box<>();\nbox.set(fleet.get(0));\nSystem.out.println(box.get().name);',
      accept: ['import java.util.ArrayList;\nclass Box<T> {\n    T value;\n    void set(T value) {\n        this.value = value;\n    }\n    T get() {\n        return value;\n    }\n}\nclass Animal {\n    String name;\n    Animal(String name) {\n        this.name = name;\n    }\n}\nclass Robot extends Animal {\n    Robot(String name) {\n        super(name);\n    }\n}\nArrayList<Robot> fleet = new ArrayList<>();\nfleet.add(new Robot("R2"));\nBox<Robot> box = new Box<>();\nbox.set(fleet.get(0));\nSystem.out.println(box.get().name);'],
      why: 'ArrayList에 담아둔 Robot을 get(0)으로 꺼내 제네릭 Box<Robot>에 넣고, box.get()으로 다시 꺼낸 Robot의 name은 상속받은 Animal의 생성자가 저장한 "R2"예요.',
      hint: 'Box<T> 제네릭 클래스와 Robot extends Animal을 각각 만든 다음, ArrayList에서 꺼낸 Robot을 Box에 담아 다시 꺼내보세요.'
    }),
  }
};
