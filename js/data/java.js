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
