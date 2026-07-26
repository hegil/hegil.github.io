/* Kotlin 강의·문제 데이터 — 단원을 추가하려면 units 배열에 항목을 넣으면 됩니다. */
COURSES.kotlin = {
    name: 'Kotlin',
    tagline: '안드로이드 공식 언어. 간결한 문법과 null 안전성이 강점인 언어',
    units: [{
      id: 'vars',
      title: '변수와 자료형',
      ready: true,
      summary: 'Kotlin에서 값을 저장하는 두 가지 방법(val, var)과 자료형을 배워요.',
      goals: ['val과 var', 'Int/String/Boolean/Double', '타입 추론', '문자열 템플릿'],
      blocks: [
        {
          h: '값을 담는 두 가지 상자: val과 var',
          html: `<p>Kotlin은 <code>val</code>(다시 바꿀 수 없는 값, value의 줄임말)과 <code>var</code>(바꿀 수 있는 값, variable의 줄임말) 두 가지로 변수를 만들어요. 값이 바뀔 일이 없다면 <code>val</code>을 우선 쓰는 게 좋은 습관이에요.</p>`,
          code: {
            label: 'vars.kt',
            lang: 'kotlin',
            src: `val name: String = "지수"
var score: Int = 90

score = 95 // 괜찮아요
// name = "민준" // 오류! val은 다시 못 바꿔요

println(name)
println(score)`,
            out: `지수\n95`
          }
        },
        {
          h: '자주 쓰는 자료형',
          html: `<table>
                   <tr><th>자료형</th><th>예시</th><th>쉬운 설명</th></tr>
                   <tr><td><code>Int</code></td><td><code>17</code></td><td>정수(소수점 없는 숫자)</td></tr>
                   <tr><td><code>Double</code></td><td><code>3.14</code></td><td>소수점이 있는 숫자</td></tr>
                   <tr><td><code>Boolean</code></td><td><code>true</code></td><td>참 또는 거짓</td></tr>
                   <tr><td><code>String</code></td><td><code>"안녕"</code></td><td>글자 여러 개(문자열)</td></tr>
                 </table>`
        },
        {
          h: '타입을 안 적어도 알아서 알아채요: 타입 추론',
          html: `<p>Kotlin은 값을 보고 자료형을 자동으로 알아채는 <b>타입 추론</b>을 지원해서, <code>val age: Int = 17</code> 대신 <code>val age = 17</code>처럼 타입을 생략해도 돼요. 문자열 안에 변수 값을 넣고 싶을 땐 <code>$변수이름</code>을 써요.</p>`,
          code: {
            label: 'template.kt',
            lang: 'kotlin',
            src: `val age = 17 // Int로 자동 추론됨
println("내년엔 \${age + 1}살")`,
            out: `내년엔 18살`
          },
          after: `<div class="note"><b>팁</b> — 계산식 없이 변수 하나만 넣을 땐 중괄호 없이 <code>$age</code>라고만 써도 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const changes = Math.random() < 0.5;
          const name = pick(['점수', '나이', '이름', '가격']);
          return makeChoice(
            `"${name}"은(는) 앞으로 ${changes ? '값이 바뀔 수도 있는' : '절대 바뀌지 않을'} 값이에요. 어떤 키워드로 선언해야 할까요?`,
            changes ? '<code>var</code>' : '<code>val</code>',
            changes ? ['<code>val</code>'] : ['<code>var</code>'],
            changes ? '값이 바뀔 수 있으니 <code>var</code>를 써요.' : '값이 바뀌지 않으니 <code>val</code>을 써요.',
            'val은 value(값), var는 variable(변수)의 줄임말이에요.'
          );
        },
        () => {
          const items = [
            { val: String(randInt(1, 999)), type: 'Int' },
            { val: `${randInt(1, 99)}.${randInt(1, 9)}`, type: 'Double' },
            { val: `"${pick(['hi', '바나나', '고양이'])}"`, type: 'String' },
            { val: pick(['true', 'false']), type: 'Boolean' },
          ];
          const it = pick(items);
          const others = ['Int', 'Double', 'String', 'Boolean'].filter(t => t !== it.type);
          return makeChoice(
            `값 <code>${it.val}</code>을(를) 담으려면 어떤 자료형이 알맞을까요?`,
            `<code>${it.type}</code>`, shuffle(others).slice(0, 3).map(t => `<code>${t}</code>`),
            `<code>${it.val}</code>은(는) <code>${it.type}</code> 타입의 값이에요.`,
            '따옴표 종류(있음/없음)와 소수점 유무를 확인해보세요.'
          );
        },
        () => ({
          type: 'blank',
          q: `다시 바꾸지 않을 값을 선언할 때 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: ' name = "지수"', accept: ['val'], placeholder: '키워드',
          why: '<code>val</code>은 한 번 정하면 다시 바꿀 수 없는 값을 선언해요.',
          hint: '"value(값)"의 줄임말이에요.'
        }),
        () => {
          const name = pick(['age', 'city', 'pet']);
          const ko = { age: '나이', city: '사는 곳', pet: '반려동물' }[name];
          const val = name === 'age' ? String(randInt(10, 19)) : `"${pick(['서울', '강아지', '고양이'])}"`;
          return {
            type: 'blank',
            q: `변수 <code>${name}</code>(${ko})의 값을 문장 안에 끼워 넣으려고 해요. 빈칸을 채우세요. (예: $변수이름)`,
            prefix: `println("나의 ${ko}: `, suffix: '")', accept: [`$${name}`], placeholder: '$변수이름',
            why: `Kotlin 문자열 안에서는 <code>$${name}</code>처럼 달러 기호로 변수를 바로 끼워 넣을 수 있어요.`,
            hint: '달러 기호($) 바로 뒤에 변수 이름을 붙이면 돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '나이를 담는 변수 <code>age</code>(Int, 값 17)를 <code>val</code>로 선언하고, <code>println("나이: $age")</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'val age = 17\nprintln("나이: $age")',
          accept: ['val age = 17\nprintln("나이: $age")', 'val age: Int = 17\nprintln("나이: $age")'],
          why: 'val로 age를 선언하고, 문자열 템플릿으로 그 값을 문장에 끼워 넣어요.',
          hint: 'val age = 17을 쓰고, println("나이: $age")로 출력하세요.'
        }),
      ],
      boss: () => {
        const name = pick(['age', 'score', 'count']);
        const ko = { age: '나이', score: '점수', count: '개수' }[name];
        const val = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>var ${name} = ${val}</code>로 선언한 뒤 <code>println("${ko}: \${${name} + 1}")</code>을 실행하면 무엇이 출력될까요? 따옴표 없이 입력하세요.`,
          prefix: '', suffix: '', accept: [`${ko}: ${val + 1}`], placeholder: '출력될 문장',
          why: `문자열 템플릿 안의 계산식 <code>\${${name} + 1}</code>은 먼저 계산(${val} + 1 = ${val + 1})된 뒤 문자열에 합쳐져요.`,
          hint: '${ } 안의 계산식은 계산까지 끝난 값이 문자열에 들어가요.'
        };
      }
    },
    {
      id: 'flow',
      title: '조건문과 when',
      ready: true,
      summary: '조건에 따라 다른 코드를 실행하는 if와, 더 깔끔하게 여러 경우를 나누는 when을 배워요.',
      goals: ['if / else if / else', 'if를 값으로 쓰기', 'when 표현식'],
      blocks: [
        {
          h: '"만약 ~라면" — if',
          html: `<p>기본 형태는 다른 언어와 비슷해요. 조건이 <code>true</code>면 중괄호 안의 코드가 실행돼요.</p>`,
          code: {
            label: 'flow.kt',
            lang: 'kotlin',
            src: `val age = 17

if (age >= 20) {
    println("성인이에요")
} else if (age >= 13) {
    println("청소년이에요")
} else {
    println("어린이예요")
}`,
            out: `청소년이에요`
          }
        },
        {
          h: 'Kotlin의 if는 "값"으로도 쓸 수 있어요',
          html: `<p>Kotlin에서는 <code>if</code>가 값을 돌려주는 <b>표현식</b>으로도 쓰여요. 삼항 연산자(<code>? :</code>)가 따로 없는 대신, if를 이렇게 활용해요.</p>`,
          code: {
            label: 'if_expr.kt',
            lang: 'kotlin',
            src: `val age = 17
val label = if (age >= 20) "성인" else "미성년자"
println(label)`,
            out: `미성년자`
          }
        },
        {
          h: '여러 경우를 깔끔하게: when',
          html: `<p>조건이 여러 개로 나뉠 땐 <code>if/else if</code>를 계속 이어 쓰는 대신 <code>when</code>을 쓰면 더 깔끔해요. 다른 언어의 <code>switch</code>와 비슷하지만 더 강력해요.</p>`,
          code: {
            label: 'when.kt',
            lang: 'kotlin',
            src: `val grade = 85

val result = when {
    grade >= 90 -> "A"
    grade >= 80 -> "B"
    grade >= 70 -> "C"
    else -> "F"
}
println(result)`,
            out: `B`
          },
          after: `<div class="note"><b>비교</b> — <code>when</code>의 각 줄은 "조건 -> 결과"로 읽으면 돼요. 위에서부터 순서대로 검사해서 처음 맞는 조건의 결과를 돌려줘요.</div>`
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
        () => makeChoice(
          'Kotlin에서 값을 돌려주는 표현식으로도 쓸 수 있는 조건문은?',
          '<code>if</code>', ['<code>for</code>', '<code>while</code>', '<code>println</code>'],
          'Kotlin의 <code>if</code>는 <code>val x = if (조건) A else B</code>처럼 값으로도 쓸 수 있어요.',
          '삼항 연산자(? :)가 따로 없는 대신 이 조건문을 값으로 써요.'
        ),
        () => {
          const grade = randInt(60, 100);
          const label = grade >= 90 ? 'A' : grade >= 80 ? 'B' : grade >= 70 ? 'C' : 'F';
          return {
            type: 'blank',
            q: `<code>when { grade >= 90 -> "A"; grade >= 80 -> "B"; grade >= 70 -> "C"; else -> "F" }</code>에서 grade가 <code>${grade}</code>일 때 결과는? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [label], placeholder: '값',
            why: `${grade}는 ${label === 'A' ? '90 이상' : label === 'B' ? '80 이상 90 미만' : label === 'C' ? '70 이상 80 미만' : '70 미만'}이라 "${label}"이에요.`,
            hint: '위에서부터 순서대로 조건을 검사해서, 처음 맞는 조건의 결과를 써요.'
          };
        },
        () => ({
          type: 'blank',
          q: `when의 각 줄에서 "조건"과 "결과"를 잇는 기호를 쓰세요. (2글자)`,
          prefix: 'when { grade >= 90 ', suffix: ' "A" }', accept: ['->'], placeholder: '기호',
          why: '<code>조건 -> 결과</code>처럼 화살표로 이어요.',
          hint: '하이픈과 부등호를 붙여 화살표 모양을 만들어요.'
        }),
        () => ({
          type: 'code',
          q: '<code>score</code>가 60 이상이면 <code>"합격"</code>을, 아니면 <code>"불합격"</code>을 담는 변수 <code>result</code>를 if 표현식으로 만들고, <code>println(result)</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'val result = if (score >= 60) "합격" else "불합격"\nprintln(result)',
          accept: ['val result = if (score >= 60) "합격" else "불합격"\nprintln(result)'],
          why: 'if 표현식으로 조건에 따른 값을 바로 변수에 담을 수 있어요.',
          hint: 'val result = if (조건) 값1 else 값2 형태를 쓰고, println으로 출력하세요.'
        }),
      ],
      boss: () => {
        const age = randInt(1, 25);
        const hasTicket = Math.random() < 0.5;
        const ok = age >= 14 && hasTicket;
        const label = ok ? '입장 가능' : '입장 불가';
        return {
          type: 'blank',
          q: `<code>val age = ${age}</code>, <code>val hasTicket = ${hasTicket}</code>일 때, "나이가 14 이상이고 티켓이 있으면 입장 가능, 아니면 입장 불가"를 출력하는 코드의 결과는? 따옴표 없이 입력하세요.`,
          prefix: '', suffix: '', accept: [label], placeholder: '출력될 문장',
          why: `나이는 ${age >= 14 ? '14 이상' : '14 미만'}이고 티켓은 ${hasTicket ? '있어요' : '없어요'}. 둘 다 true여야 하는 && 조건이 ${ok ? 'true라 "입장 가능"' : 'false라 "입장 불가"'}가 출력돼요.`,
          hint: '&&는 두 조건이 모두 true여야 true예요.'
        };
      }
    },
    {
      id: 'loop',
      title: '반복문',
      ready: true,
      summary: '같은 코드를 여러 번 반복시키는 for문과 while문, 그리고 범위(range) 문법을 배워요.',
      goals: ['for문과 범위(1..5)', 'while문', 'break / continue'],
      blocks: [
        {
          h: '범위(range)로 반복하기: for',
          html: `<p>Kotlin의 <code>for</code>문은 <code>범위</code>를 이용해요. <code>1..5</code>는 "1부터 5까지(양 끝 포함)"라는 뜻이에요.</p>`,
          code: {
            label: 'for.kt',
            lang: 'kotlin',
            src: `for (i in 1..5) {
    println("\${i}번째 인사")
}`,
            out: `1번째 인사\n2번째 인사\n3번째 인사\n4번째 인사\n5번째 인사`
          }
        },
        {
          h: '끝 값을 포함하고 싶지 않다면: until',
          html: `<p><code>1..5</code>는 5를 포함하지만, <code>1 until 5</code>는 5를 <b>포함하지 않아요</b>(1,2,3,4만). 배열의 인덱스처럼 "0부터 개수 미만까지" 돌 때 자주 써요.</p>`,
          code: {
            label: 'until.kt',
            lang: 'kotlin',
            src: `for (i in 0 until 3) {
    println(i)
}`,
            out: `0\n1\n2`
          }
        },
        {
          h: '조건이 참인 동안 반복: while',
          html: `<p>몇 번 반복할지 미리 모를 땐 <code>while (조건) { ... }</code>을 써요.</p>`,
          code: {
            label: 'while.kt',
            lang: 'kotlin',
            src: `var count = 3
while (count > 0) {
    println(count)
    count -= 1
}
println("발사!")`,
            out: `3\n2\n1\n발사!`
          },
          after: `<div class="note"><b>정리</b> — <code>1..5</code>(5 포함), <code>1 until 5</code>(5 미포함). 헷갈리지 않게 조심하세요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(3, 8);
          return {
            type: 'blank',
            q: `<code>for (i in 1..${n}) { println("hi") }</code>는 총 몇 번 반복될까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `<code>1..${n}</code>은 1부터 ${n}까지(양 끝 포함)라서 ${n}번 반복해요.`,
            hint: '1..N은 N도 포함해서 총 N번 반복해요.'
          };
        },
        () => {
          const n = randInt(3, 8);
          return {
            type: 'blank',
            q: `<code>for (i in 0 until ${n}) { println("hi") }</code>는 총 몇 번 반복될까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `<code>0 until ${n}</code>은 0부터 ${n - 1}까지(${n}은 포함 안 함)라서 ${n}번 반복해요.`,
            hint: 'until은 끝 값을 포함하지 않아요.'
          };
        },
        () => makeChoice(
          '"1부터 5까지(5 포함)"를 나타내는 범위 표기는?',
          '<code>1..5</code>', ['<code>1 until 5</code>', '<code>1...5</code>', '<code>1-5</code>'],
          '<code>..</code>는 양 끝을 모두 포함하는 범위예요.',
          '점 두 개로 이어진 범위 표기예요.'
        ),
        () => {
          const n = randInt(3, 6);
          let sum = 0;
          for (let i = 1; i <= n; i++) sum += i;
          return {
            type: 'blank',
            q: `<code>var total = 0</code>에서 시작해 <code>for (i in 1..${n}) { total += i }</code>를 실행했어요. 실행 후 <code>total</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
            why: `1부터 ${n}까지 다 더하면 ${sum}이에요.`,
            hint: '1부터 N까지 하나씩 늘려가며 다 더해보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '1부터 5까지(양 끝 포함) 숫자를 각각 한 줄씩 <code>println</code>으로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'for (i in 1..5) {\n    println(i)\n}',
          accept: ['for (i in 1..5) {\n    println(i)\n}'],
          why: '<code>1..5</code>는 1부터 5까지(양 끝 포함) 범위예요.',
          hint: 'for (i in 1..5) { println(i) } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const n = randInt(4, 8);
        let total = 0;
        for (let i = 1; i <= n; i++) if (i % 2 === 0) total += i;
        return {
          type: 'blank',
          q: `<code>var total = 0</code>에서 시작해서, <code>1..${n}</code> 범위의 숫자 중 짝수(2로 나눈 나머지가 0)만 골라 <code>total</code>에 더하는 코드가 있어요. 실행 후 <code>total</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
          why: `1부터 ${n}까지 중 짝수만 더하면 ${total}이에요.`,
          hint: 'i % 2 == 0으로 짝수인지 확인한 다음, 그 값만 골라 더해보세요.'
        };
      }
    },
    {
      id: 'func',
      title: '함수',
      ready: true,
      summary: '반복해서 쓰는 코드에 이름을 붙이는 함수와, Kotlin만의 편리한 문법들을 배워요.',
      goals: ['fun으로 함수 만들기', '기본값이 있는 매개변수', '한 줄 함수(식 본문)'],
      blocks: [
        {
          h: '함수 만들기: fun',
          html: `<p>Kotlin은 함수를 <code>fun</code> 키워드로 만들어요. 매개변수와 반환 타입 모두 콜론으로 타입을 적어요.</p>`,
          code: {
            label: 'func.kt',
            lang: 'kotlin',
            src: `fun add(a: Int, b: Int): Int {
    return a + b
}

println(add(3, 4))`,
            out: `7`
          }
        },
        {
          h: '값을 안 넘기면 쓸 기본값: 기본 매개변수',
          html: `<p>매개변수에 <code>= 값</code>을 붙이면, 호출할 때 그 값을 안 넘겨도 기본값이 쓰여요.</p>`,
          code: {
            label: 'default.kt',
            lang: 'kotlin',
            src: `fun greet(name: String, greeting: String = "안녕") {
    println("\${greeting}, \${name}!")
}

greet("지수")
greet("민준", "반가워")`,
            out: `안녕, 지수!\n반가워, 민준!`
          }
        },
        {
          h: '한 줄로 끝내기: 식 본문 함수',
          html: `<p>함수의 내용이 계산식 하나뿐이라면, 중괄호와 <code>return</code> 없이 <code>= 계산식</code>으로 아주 짧게 쓸 수 있어요. 이걸 <b>식 본문(expression body)</b>이라고 해요.</p>`,
          code: {
            label: 'expr_body.kt',
            lang: 'kotlin',
            src: `fun square(n: Int): Int = n * n

println(square(5))`,
            out: `25`
          },
          after: `<div class="note"><b>정리</b> — 식 본문 함수는 반환 타입도 생략할 수 있어요(자동 추론). 짧은 계산 함수에 자주 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>fun add(a: Int, b: Int): Int { return a + b }</code> 함수에 <code>add(${a}, ${b})</code>라고 호출하면 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `${a} + ${b} = ${a + b}가 반환돼요.`,
            hint: '매개변수 a, b 자리에 순서대로 값이 들어간다고 생각하고 계산해보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `함수를 만들 때 맨 앞에 쓰는 키워드는?`,
          prefix: '', suffix: ' add(a: Int, b: Int): Int { return a + b }', accept: ['fun'], placeholder: '키워드',
          why: 'Kotlin 함수는 <code>fun</code>(function의 줄임말)으로 시작해요.',
          hint: '"function"을 세 글자로 줄인 키워드예요.'
        }),
        () => {
          const greeting = pick(['안녕', '반가워', '환영해']);
          return {
            type: 'blank',
            q: `<code>fun greet(name: String, greeting: String = "${greeting}") { println("\${greeting}, \${name}!") }</code>에 <code>greet("지수")</code>라고 호출하면(두 번째 인자 없이) 무엇이 출력될까요? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${greeting}, 지수!`], placeholder: '출력될 문장',
            why: `greeting을 안 넘겼으니 기본값 "${greeting}"이 쓰여서 "${greeting}, 지수!"가 출력돼요.`,
            hint: '두 번째 인자를 안 넘기면 = 뒤에 적어둔 기본값이 쓰여요.'
          };
        },
        () => makeChoice(
          '함수 본문이 계산식 하나뿐일 때, 중괄호 대신 쓸 수 있는 짧은 문법은?',
          '<code>= 계산식</code>(식 본문)', ['<code>-> 계산식</code>', '<code>: 계산식</code>', '<code>=&gt; 계산식</code>'],
          '<code>fun square(n: Int): Int = n * n</code>처럼 등호 뒤에 계산식만 쓰는 걸 식 본문이라고 해요.',
          '변수에 값을 대입할 때도 쓰는 그 등호예요.'
        ),
        () => ({
          type: 'code',
          q: '두 수를 더해 반환하는 함수 <code>add</code>를 식 본문(expression body) 형태로 작성하세요. (예: <code>fun 이름(...): 타입 = 계산식</code>)',
          starter: '',
          placeholder: 'fun add(a: Int, b: Int): Int = a + b',
          accept: ['fun add(a: Int, b: Int): Int = a + b'],
          why: '식 본문 함수는 중괄호와 return 없이 <code>= 계산식</code>으로 바로 결과를 반환해요.',
          hint: 'fun add(a: Int, b: Int): Int = a + b 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const base = randInt(1, 20);
        const bonusUsed = Math.random() < 0.5;
        const bonus = randInt(1, 10);
        const result = bonusUsed ? base + bonus : base + 5;
        return {
          type: 'blank',
          q: `<code>fun addBonus(score: Int, bonus: Int = 5): Int = score + bonus</code> 함수가 있을 때, <code>addBonus(${base}${bonusUsed ? `, ${bonus}` : ''})</code>라고 호출하면 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
          why: bonusUsed
            ? `bonus에 ${bonus}를 직접 넘겼으니 ${base} + ${bonus} = ${result}이에요.`
            : `bonus를 안 넘겼으니 기본값 5가 쓰여서 ${base} + 5 = ${result}이에요.`,
          hint: '매개변수에 = 5처럼 기본값이 있으면, 값을 안 넘겼을 때만 그 기본값이 쓰여요.'
        };
      }
    },
    {
      id: 'classes',
      title: '클래스와 데이터 클래스',
      ready: true,
      summary: '객체를 만드는 클래스와, Kotlin의 편리한 데이터 클래스를 배워요.',
      goals: ['class와 생성자', 'data class', 'null 안전성 기초(?)'],
      blocks: [
        {
          h: '클래스와 생성자',
          html: `<p>Kotlin의 클래스는 <code>class</code>로 만들고, 생성자는 클래스 이름 바로 뒤 괄호 안에 적어요. 자바처럼 따로 생성자 메서드를 만들 필요가 없어요.</p>`,
          code: {
            label: 'class.kt',
            lang: 'kotlin',
            src: `class Player(val name: String) {
    var score: Int = 0

    fun add(point: Int) {
        score += point
    }
}

val p = Player("지수")
p.add(10)
println("\${p.name} \${p.score}")`,
            out: `지수 10`
          }
        },
        {
          h: '데이터를 담기 위한 클래스: data class',
          html: `<p>이름·나이처럼 데이터를 담기만 하는 클래스는 <code>data class</code>로 만들면, 값 비교나 출력용 문자열 변환 같은 기능을 자동으로 만들어줘요.</p>`,
          code: {
            label: 'data_class.kt',
            lang: 'kotlin',
            src: `data class Student(val name: String, val age: Int)

val s1 = Student("민준", 16)
val s2 = Student("민준", 16)

println(s1 == s2) // 값이 같으면 true
println(s1)`,
            out: `true\nStudent(name=민준, age=16)`
          }
        },
        {
          h: 'null이 될 수 있다고 미리 밝히기: ?',
          html: `<p>Kotlin은 변수가 <code>null</code>(값이 없음)이 될 수 있는지를 타입에서 미리 밝혀야 해요. 타입 뒤에 물음표(<code>?</code>)를 붙이면 "이 값은 null이 될 수도 있다"는 뜻이에요. 물음표가 없는 보통 타입에는 아예 null을 넣을 수 없어서, 훨씬 안전해요.</p>`,
          code: {
            label: 'nullable.kt',
            lang: 'kotlin',
            src: `var nickname: String? = null
nickname = "지수"
// var name: String = null // 오류! String은 null을 못 담아요`
          },
          after: `<div class="note"><b>정리</b> — Kotlin에서 "이 값, null일 수도 있나요?"는 항상 타입에 물음표가 있는지로 판단해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['민준', '서연', '도윤']);
          const bonus = randInt(1, 10);
          return {
            type: 'blank',
            q: `<code>class Player(val name: String) { var score: Int = 0; fun add(point: Int) { score += point } }</code>일 때, <code>val p = Player("${name}")</code> 후 <code>p.add(${bonus})</code>를 실행하고 <code>p.score</code>를 출력하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(bonus)], placeholder: '숫자',
            why: `score는 0에서 시작해서, <code>add(${bonus})</code>로 ${bonus}만큼 늘었으니 결과는 ${bonus}예요.`,
            hint: '생성자에서 score는 0으로 시작하고, add 메서드가 그 값을 늘려요.'
          };
        },
        () => makeChoice(
          '이름·나이처럼 데이터를 담는 용도의 클래스에 값 비교, 문자열 변환 같은 기능을 자동으로 만들어주는 키워드는?',
          '<code>data class</code>', ['<code>class</code>', '<code>object</code>', '<code>interface</code>'],
          '<code>data class</code>는 값 비교(<code>==</code>)와 <code>toString()</code> 등을 자동으로 만들어줘요.',
          '"데이터"를 담기 위한 특별한 클래스예요.'
        ),
        () => {
          const name = pick(['민준', '서연']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>data class Student(val name: String, val age: Int)</code>일 때, <code>Student("${name}", ${age}) == Student("${name}", ${age})</code>의 결과는? (참/거짓)`,
            prefix: '', suffix: '', accept: ['true', '참'], placeholder: 'true / false',
            why: 'data class는 안의 값들이 모두 같으면 <code>==</code>가 true를 돌려줘요(서로 다른 객체여도요).',
            hint: 'data class의 == 비교는 객체 자체가 아니라 "안에 든 값"을 비교해요.'
          };
        },
        () => makeChoice(
          '변수가 null이 될 수 있다는 걸 타입에서 나타낼 때 붙이는 기호는?',
          '<code>?</code>', ['<code>!</code>', '<code>*</code>', '<code>~</code>'],
          '<code>String?</code>처럼 타입 뒤에 물음표를 붙이면 null이 될 수 있다는 뜻이에요.',
          '"있을 수도, 없을 수도"라는 불확실함을 나타내는 기호예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>name</code>(String)과 <code>age</code>(Int)를 가지는 데이터 클래스 <code>Student</code>를 정의하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'data class Student(val name: String, val age: Int)',
          accept: ['data class Student(val name: String, val age: Int)'],
          why: '<code>data class 이름(val 속성: 타입, ...)</code> 형태로 데이터 클래스를 만들어요.',
          hint: 'data class Student( ) 괄호 안에 val name: String, val age: Int를 순서대로 넣으세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>data class Student(val name: String, val age: Int)</code>이고 <code>val s1 = Student("${name}", ${age})</code>, <code>val s2 = Student("${name}", ${age})</code>일 때, <code>println(s1 == s2)</code>의 결과는? (참/거짓)`,
          prefix: '', suffix: '', accept: ['true', '참'], placeholder: 'true / false',
          why: `data class는 안의 값(name, age)이 모두 같으면 서로 다른 객체여도 <code>==</code>가 true를 돌려줘요.`,
          hint: 'data class의 == 비교는 "안에 든 값이 같은지"를 봐요.'
        };
      }
    }],
  tierBoss: {
    beginner: () => ({
      type: 'code',
      q: '<code>var total = 0</code>으로 만들고, <code>1..5</code> 범위로 반복하며 다 더한 뒤, 총합이 10보다 크면 "많음"을, 아니면 "적음"을 출력하는 전체 코드를 작성하세요. (변수, 반복문, 조건문을 모두 사용하세요)',
      starter: '',
      rows: 8,
      placeholder: 'var total = 0\nfor (i in 1..5) {\n    total += i\n}\nif (total > 10) {\n    println("많음")\n} else {\n    println("적음")\n}',
      accept: ['var total = 0\nfor (i in 1..5) {\n    total += i\n}\nif (total > 10) {\n    println("많음")\n} else {\n    println("적음")\n}'],
      why: '1부터 5까지 더하면 15고, 15는 10보다 크니까 "많음"이 출력돼요.',
      hint: 'var total = 0으로 시작해서 for (i in 1..5)로 다 더한 뒤, if/else로 비교하세요.'
    }),
    intermediate: () => ({
      type: 'code',
      q: '숫자를 받아 제곱을 반환하는 함수 <code>square</code>를 식 본문 형태로 만드세요(<code>fun square(n: Int): Int = n * n</code>). <code>1..3</code> 범위로 반복하며 각 결과를 <code>println</code>으로 출력하는 전체 코드를 작성하세요.',
      starter: '',
      rows: 5,
      placeholder: 'fun square(n: Int): Int = n * n\n\nfor (i in 1..3) {\n    println(square(i))\n}',
      accept: ['fun square(n: Int): Int = n * n\n\nfor (i in 1..3) {\n    println(square(i))\n}'],
      why: '1, 2, 3의 제곱은 각각 1, 4, 9예요. 식 본문 함수를 만들고 반복문으로 호출해서 출력해요.',
      hint: 'fun square(n: Int): Int = n * n로 함수를 만들고, for (i in 1..3)로 반복하며 호출·출력하세요.'
    }),
    advanced: () => ({
      type: 'code',
      q: '<code>name</code>(String)과 <code>score</code>(Int)를 가지는 데이터 클래스 <code>Player</code>를 정의하세요. <code>val p1 = Player("지수", 90)</code>과 <code>val p2 = Player("지수", 90)</code>을 만들고, <code>println(p1 == p2)</code>를 실행하는 전체 코드를 작성하세요.',
      starter: '',
      rows: 4,
      placeholder: 'data class Player(val name: String, val score: Int)\n\nval p1 = Player("지수", 90)\nval p2 = Player("지수", 90)\nprintln(p1 == p2)',
      accept: ['data class Player(val name: String, val score: Int)\n\nval p1 = Player("지수", 90)\nval p2 = Player("지수", 90)\nprintln(p1 == p2)'],
      why: 'data class는 안의 값이 모두 같으면 서로 다른 객체여도 ==가 true를 돌려줘서, "true"가 출력돼요.',
      hint: 'data class Player를 정의하고, 같은 값으로 객체 두 개를 만들어 ==로 비교해보세요.'
    }),
  }
};
