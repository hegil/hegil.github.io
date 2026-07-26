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
    },
    {
      id: 'nullSafety',
      title: 'Null 안전성: ?., ?:, !!',
      ready: true,
      summary: 'null이 될 수 있는 값을 안전하게 다루는 ?., ?:, !! 연산자를 배워요.',
      goals: ['안전 호출 ?.', '엘비스 연산자 ?:', '단정 연산자 !!'],
      blocks: [
        {
          h: 'null이면 멈추는 안전 호출: ?.',
          html: `<p><code>?.</code>은 왼쪽 값이 null이 아닐 때만 오른쪽을 실행해요. 왼쪽이 null이면 전체 결과도 그냥 null이 돼서, null 검사를 매번 쓰지 않아도 안전해요.</p>`,
          code: {
            label: 'safe_call.kt',
            lang: 'kotlin',
            src: `var nickname: String? = null
println(nickname?.length)

nickname = "지수"
println(nickname?.length)`,
            out: `null\n2`
          }
        },
        {
          h: 'null 대신 기본값 쓰기: 엘비스 연산자 ?:',
          html: `<p><code>?:</code>(엘비스 연산자)는 왼쪽 값이 null이 아니면 그 값을, null이면 오른쪽에 적은 기본값을 대신 써요.</p>`,
          code: {
            label: 'elvis.kt',
            lang: 'kotlin',
            src: `var nickname: String? = null
val len = nickname?.length ?: 0
println(len)`,
            out: `0`
          }
        },
        {
          h: '"무조건 null 아님" 단정: !!',
          html: `<p><code>!!</code>은 "이 값은 절대 null이 아니다"라고 단정하는 연산자예요. 실제로 null이 아니면 평범하게 동작하지만, null이었다면 그 자리에서 바로 오류(NPE)가 발생해요. 꼭 필요할 때만 조심해서 써야 해요.</p>`,
          code: {
            label: 'not_null_assert.kt',
            lang: 'kotlin',
            src: `var nickname: String? = "지수"
println(nickname!!.length)

nickname = null
// println(nickname!!.length) // 오류! NPE 발생`,
            out: `2`
          },
          after: `<div class="note"><b>정리</b> — 웬만하면 <code>?.</code>와 <code>?:</code>로 안전하게 처리하고, <code>!!</code>은 "여기선 절대 null일 수 없다"는 확신이 있을 때만 쓰세요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const isNull = Math.random() < 0.5;
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>var nickname: String? = ${isNull ? 'null' : `"${name}"`}</code>일 때, <code>nickname?.length</code>의 결과는? (null이면 null, 아니면 숫자만 쓰세요)`,
            prefix: '', suffix: '', accept: [isNull ? 'null' : String(name.length)], placeholder: 'null 또는 숫자',
            why: isNull
              ? 'nickname이 null이면 ?.은 실행을 멈추고 전체 결과가 null이 돼요.'
              : `nickname이 "${name}"이므로 length는 ${name.length}예요.`,
            hint: '안전 호출(?.)은 앞이 null이면 뒤를 실행하지 않고 바로 null을 돌려줘요.'
          };
        },
        () => makeChoice(
          '왼쪽 값이 null이면 오른쪽의 기본값을 대신 쓰게 해주는 연산자는?',
          '<code>?:</code>(엘비스 연산자)', ['<code>?.</code>', '<code>!!</code>', '<code>::</code>'],
          '<code>a ?: b</code>는 a가 null이 아니면 a, null이면 b를 결과로 써요.',
          '물음표와 콜론을 붙여 쓰면 사람 얼굴(엘비스 프레슬리 머리 모양)처럼 보인다고 해서 붙은 이름이에요.'
        ),
        () => {
          const isNull = Math.random() < 0.5;
          const len = randInt(1, 5);
          return {
            type: 'blank',
            q: `<code>var nickname: String? = ${isNull ? 'null' : `"${'a'.repeat(len)}"`}</code>이고 <code>val result = nickname?.length ?: -1</code>일 때, <code>result</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [isNull ? '-1' : String(len)], placeholder: '숫자',
            why: isNull
              ? 'nickname이 null이므로 ?. 결과도 null이 되고, ?: 뒤의 기본값 -1이 쓰여요.'
              : `nickname의 길이가 ${len}이므로 그 값이 그대로 result가 돼요.`,
            hint: '?: 왼쪽이 null이 아니면 왼쪽 값을, null이면 오른쪽 기본값을 써요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>nickname</code>(String?)의 길이를 구하되, null이면 0을 대신 쓰는 코드를 한 줄로 작성하세요. (예: <code>val len = ...</code>)',
          starter: '',
          placeholder: 'val len = nickname?.length ?: 0',
          accept: ['val len = nickname?.length ?: 0'],
          why: '<code>?.</code>로 안전하게 접근하고, <code>?:</code>로 null일 때의 기본값을 정해요.',
          hint: 'nickname?.length 뒤에 ?: 0을 붙이면 돼요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        return {
          type: 'blank',
          q: `<code>var nickname: String? = "${name}"</code>일 때, <code>nickname!!.length</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(name.length)], placeholder: '숫자',
          why: `nickname이 null이 아니므로 !!은 그냥 String으로 취급되어 length는 ${name.length}예요. (nickname이 null이었다면 !!은 그 자리에서 오류를 던져요)`,
          hint: '!!은 "무조건 null이 아니다"라고 단정하는 연산자예요. null이면 오류가 나요.'
        };
      }
    },
    {
      id: 'extensionFunctions',
      title: '확장 함수',
      ready: true,
      summary: '이미 있는 클래스를 건드리지 않고, 새 함수를 추가하는 확장 함수를 배워요.',
      goals: ['확장 함수 정의', '수신 객체 this', '표준 라이브러리에도 쓰이는 방식'],
      blocks: [
        {
          h: '기존 클래스에 함수 추가하기',
          html: `<p>확장 함수는 <code>fun 타입.함수이름()</code> 형태로, 이미 있는 클래스(심지어 <code>String</code>, <code>Int</code> 같은 표준 타입)에도 새 함수를 추가해줘요. 클래스 코드 자체를 고치는 게 아니라, 밖에서 "붙여주는" 함수예요.</p>`,
          code: {
            label: 'extension.kt',
            lang: 'kotlin',
            src: `fun String.addExclaim(): String {
    return this + "!"
}

println("안녕".addExclaim())`,
            out: `안녕!`
          }
        },
        {
          h: 'this로 수신 객체 가리키기',
          html: `<p>확장 함수 안에서 <code>this</code>는 그 함수를 호출한 객체(수신 객체)를 가리켜요. <code>Int</code>를 확장하면 <code>this</code>는 그 정수 자체예요.</p>`,
          code: {
            label: 'receiver.kt',
            lang: 'kotlin',
            src: `fun Int.isEvenNumber(): Boolean {
    return this % 2 == 0
}

println(4.isEvenNumber())
println(7.isEvenNumber())`,
            out: `true\nfalse`
          },
          after: `<div class="note"><b>정리</b> — 사실 <code>map</code>, <code>filter</code> 같은 함수들도 컬렉션을 확장하는 확장 함수로 만들어져 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const word = pick(['안녕', '반가워', '고마워']);
          return {
            type: 'blank',
            q: `<code>fun String.addExclaim(): String { return this + "!" }</code>일 때, <code>"${word}".addExclaim()</code>의 결과는? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${word}!`], placeholder: '결과 문자열',
            why: `this는 확장 함수를 호출한 문자열 "${word}"를 가리키므로, 결과는 "${word}!"예요.`,
            hint: '확장 함수 안의 this는 그 함수를 호출한 객체(여기선 문자열)예요.'
          };
        },
        () => makeChoice(
          '확장 함수 안에서, 그 함수를 호출한 객체(수신 객체)를 가리키는 키워드는?',
          '<code>this</code>', ['<code>self</code>', '<code>it</code>', '<code>super</code>'],
          '확장 함수 안에서 <code>this</code>는 그 함수가 확장하는 대상(수신 객체)을 가리켜요.',
          '클래스 안에서 자기 자신을 가리킬 때 쓰는 것과 같은 키워드예요.'
        ),
        () => {
          const n = randInt(1, 50);
          const isEven = n % 2 === 0;
          return {
            type: 'blank',
            q: `<code>fun Int.isEvenNumber(): Boolean { return this % 2 == 0 }</code>일 때, <code>${n}.isEvenNumber()</code>의 결과는? (참/거짓)`,
            prefix: '', suffix: '', accept: isEven ? ['true', '참'] : ['false', '거짓'], placeholder: 'true / false',
            why: `${n} % 2 는 ${n % 2}이므로 결과는 ${isEven ? 'true' : 'false'}예요.`,
            hint: 'this는 확장 함수를 호출한 정수 그 자체예요.'
          };
        },
        () => ({
          type: 'code',
          q: 'Int를 확장해서, 자기 자신의 3배를 반환하는 확장 함수 <code>triple</code>을 식 본문으로 작성하세요.',
          starter: '',
          placeholder: 'fun Int.triple(): Int = this * 3',
          accept: ['fun Int.triple(): Int = this * 3'],
          why: '<code>fun 타입.함수이름(): 반환타입 = this * 3</code> 형태로 확장 함수를 만들어요.',
          hint: 'fun Int.triple(): Int = this * 3 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const word = pick(['좋아', '멋져', '최고']);
        return {
          type: 'blank',
          q: `<code>fun String.addExclaim(): String = this + "!"</code>이고 <code>fun String.shout(): String = this.addExclaim().addExclaim()</code>일 때, <code>"${word}".shout()</code>의 결과는? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`${word}!!`], placeholder: '결과 문자열',
          why: `addExclaim을 두 번 이어서 적용하면 느낌표가 두 개 붙어서 "${word}!!"가 돼요.`,
          hint: '확장 함수도 일반 함수처럼 이어서(체이닝) 호출할 수 있어요.'
        };
      }
    },
    {
      id: 'lambdaHof',
      title: '람다와 고차 함수',
      ready: true,
      summary: '함수를 값처럼 다루는 람다식과, 함수를 매개변수로 주고받는 고차 함수를 배워요.',
      goals: ['람다식 문법 { }', '함수를 매개변수로 받기', 'it 축약형'],
      blocks: [
        {
          h: '함수도 값이다: 람다식',
          html: `<p>Kotlin에서는 함수를 <code>{ 매개변수 -> 계산식 }</code> 형태의 <b>람다식</b>으로 만들어 변수에 담을 수 있어요.</p>`,
          code: {
            label: 'lambda.kt',
            lang: 'kotlin',
            src: `val square = { n: Int -> n * n }
println(square(5))`,
            out: `25`
          }
        },
        {
          h: '함수를 매개변수로 받는 고차 함수',
          html: `<p>함수를 매개변수로 받거나 함수를 반환하는 함수를 <b>고차 함수</b>라고 해요. 마지막 매개변수가 함수면, 호출할 때 중괄호를 괄호 밖으로 뺄 수 있어요.</p>`,
          code: {
            label: 'hof.kt',
            lang: 'kotlin',
            src: `fun calculate(a: Int, b: Int, op: (Int, Int) -> Int): Int {
    return op(a, b)
}

val result = calculate(3, 4) { x, y -> x + y }
println(result)`,
            out: `7`
          }
        },
        {
          h: '매개변수가 하나뿐이면: it',
          html: `<p>람다의 매개변수가 하나뿐이면 이름을 생략하고 <code>it</code>으로 가리킬 수 있어요. <code>map</code>, <code>filter</code> 같은 컬렉션 함수와 자주 같이 써요.</p>`,
          code: {
            label: 'it.kt',
            lang: 'kotlin',
            src: `val numbers = listOf(1, 2, 3, 4)
val doubled = numbers.map { it * 2 }
println(doubled)`,
            out: `[2, 4, 6, 8]`
          }
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 12);
          return {
            type: 'blank',
            q: `<code>val square = { n: Int -> n * n }</code>일 때, <code>square(${n})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n * n)], placeholder: '숫자',
            why: `${n} * ${n} = ${n * n}이에요.`,
            hint: '람다식 { 매개변수 -> 계산식 }은 매개변수를 넣어 계산식을 실행해요.'
          };
        },
        () => makeChoice(
          '람다식의 매개변수가 딱 하나일 때, 이름을 생략하고 대신 쓸 수 있는 이름은?',
          '<code>it</code>', ['<code>this</code>', '<code>self</code>', '<code>arg</code>'],
          '매개변수가 하나뿐인 람다에서는 이름을 생략하고 <code>it</code>으로 그 값을 가리킬 수 있어요.',
          '<code>numbers.map { it * 2 }</code>에서 쓰인 그 이름이에요.'
        ),
        () => {
          const a = randInt(1, 10), b = randInt(1, 10);
          const isPlus = Math.random() < 0.5;
          const result = isPlus ? a + b : a * b;
          return {
            type: 'blank',
            q: `<code>fun calculate(a: Int, b: Int, op: (Int, Int) -> Int): Int = op(a, b)</code>일 때, <code>calculate(${a}, ${b}) { x, y -> x ${isPlus ? '+' : '*'} y }</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
            why: `op에 넘긴 람다가 x와 y를 ${isPlus ? '더하므로' : '곱하므로'}, 결과는 ${a} ${isPlus ? '+' : '*'} ${b} = ${result}예요.`,
            hint: 'calculate는 op라는 함수를 받아서 a, b에 그대로 적용해요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>numbers</code>라는 리스트의 각 원소를 2배로 만든 새 리스트를 만드는 코드를 <code>map</code>과 <code>it</code>을 사용해 작성하세요. (예: <code>val doubled = ...</code>)',
          starter: '',
          placeholder: 'val doubled = numbers.map { it * 2 }',
          accept: ['val doubled = numbers.map { it * 2 }'],
          why: '<code>map { it * 2 }</code>는 리스트의 각 원소(it)를 2배로 바꾼 새 리스트를 만들어요.',
          hint: 'numbers.map { it * 2 } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const nums = Array.from({ length: 3 }, () => randInt(1, 9));
        const doubled = nums.map(n => n * 2);
        return {
          type: 'blank',
          q: `<code>val numbers = listOf(${nums.join(', ')})</code>이고 <code>val doubled = numbers.map { it * 2 }</code>일 때, <code>doubled</code>의 값은? (쉼표와 공백으로 구분해서 입력, 예: 1, 2, 3)`,
          prefix: '', suffix: '', accept: [doubled.join(', '), doubled.join(',')], placeholder: '숫자, 숫자, 숫자',
          why: `각 원소를 2배로 만들면 [${doubled.join(', ')}]이 돼요.`,
          hint: 'map { it * 2 }는 리스트의 각 원소를 2배로 바꿔요.'
        };
      }
    },
    {
      id: 'sealedClass',
      title: 'sealed class',
      ready: true,
      summary: '하위 클래스의 종류가 정해져 있는 sealed class로, 빠짐없이 안전한 분기 처리를 만들어요.',
      goals: ['sealed class 정의', 'when으로 모든 경우 처리', 'else 없이도 안전한 이유'],
      blocks: [
        {
          h: '하위 클래스를 제한하는 sealed class',
          html: `<p><code>sealed class</code>는 하위 클래스가 반드시 같은 파일(또는 모듈) 안에서만 정의될 수 있게 제한해요. 그 덕분에 컴파일러가 "가능한 모든 하위 클래스 목록"을 정확히 알 수 있어요.</p>`,
          code: {
            label: 'sealed.kt',
            lang: 'kotlin',
            src: `sealed class Shape
class Circle(val radius: Double) : Shape()
class Rectangle(val width: Double, val height: Double) : Shape()

fun area(shape: Shape): Double = when (shape) {
    is Circle -> 3.14 * shape.radius * shape.radius
    is Rectangle -> shape.width * shape.height
}

println(area(Circle(2.0)))`,
            out: `12.56`
          },
          after: `<div class="note"><b>정리</b> — sealed class의 하위 클래스가 다 정해져 있으니, 위 <code>when</code>에는 <code>else</code>가 없어도 컴파일 오류가 나지 않아요. 나중에 새 하위 클래스를 추가하면, 그걸 처리 안 한 when들을 컴파일러가 바로 알려줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const isCircle = Math.random() < 0.5;
          if (isCircle) {
            const r = randInt(1, 5);
            const area = (3.14 * r * r).toFixed(2);
            return {
              type: 'blank',
              q: `<code>fun area(shape: Shape): Double = when (shape) { is Circle -> 3.14 * shape.radius * shape.radius; is Rectangle -> shape.width * shape.height }</code>일 때, <code>area(Circle(${r}.0))</code>의 결과는? 숫자만 쓰세요.`,
              prefix: '', suffix: '', accept: [area, String(parseFloat(area))], placeholder: '숫자',
              why: `3.14 * ${r} * ${r} = ${area}예요.`,
              hint: 'is Circle 분기에서는 3.14 * radius * radius를 계산해요.'
            };
          }
          const w = randInt(2, 8), h = randInt(2, 8);
          const area = w * h;
          return {
            type: 'blank',
            q: `<code>fun area(shape: Shape): Double = when (shape) { is Circle -> 3.14 * shape.radius * shape.radius; is Rectangle -> shape.width * shape.height }</code>일 때, <code>area(Rectangle(${w}.0, ${h}.0))</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(area), `${area}.0`], placeholder: '숫자',
            why: `${w} * ${h} = ${area}예요.`,
            hint: 'is Rectangle 분기에서는 width * height를 계산해요.'
          };
        },
        () => makeChoice(
          'sealed class의 특징으로 알맞은 것은?',
          '하위 클래스의 종류가 제한되어 있어서, when에서 else 없이도 모든 경우를 검사할 수 있다', ['다른 파일에서도 자유롭게 하위 클래스를 추가할 수 있다', '인스턴스를 하나만 만들 수 있다', '함수를 가질 수 없다'],
          'sealed class는 하위 클래스 목록이 같은 파일/모듈로 제한되어서, 컴파일러가 when의 모든 경우를 알 수 있어요.',
          '"sealed"(봉인된)라는 이름처럼, 하위 클래스 목록이 미리 정해져서 바깥에서 함부로 늘릴 수 없어요.'
        ),
        () => ({
          type: 'blank',
          q: 'sealed class를 상속받는 하위 클래스들을 <code>when</code>으로 분기할 때, 모든 하위 클래스를 다 처리했다면 굳이 안 써도 되는 분기 키워드는?',
          prefix: '', suffix: '', accept: ['else'], placeholder: '키워드',
          why: '컴파일러가 sealed class의 모든 하위 클래스를 알고 있어서, 다 처리했다면 else가 없어도 오류가 나지 않아요.',
          hint: '"그 외의 모든 경우"를 처리할 때 쓰는 키워드예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>Shape</code>라는 sealed class를 정의하는 코드를 한 줄로 작성하세요. (하위 클래스는 아직 없어도 됩니다)',
          starter: '',
          placeholder: 'sealed class Shape',
          accept: ['sealed class Shape'],
          why: '<code>sealed class 이름</code> 형태로 봉인된 클래스를 선언해요.',
          hint: 'sealed class Shape 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const r = randInt(2, 6);
        const area = (3.14 * r * r).toFixed(2);
        return {
          type: 'blank',
          q: `<code>sealed class Shape</code>, <code>class Circle(val radius: Double) : Shape()</code>, <code>class Rectangle(val width: Double, val height: Double) : Shape()</code>이고 <code>fun area(shape: Shape): Double = when (shape) { is Circle -> 3.14 * shape.radius * shape.radius; is Rectangle -> shape.width * shape.height }</code>일 때, <code>area(Circle(${r}.0))</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [area, String(parseFloat(area))], placeholder: '숫자',
          why: `3.14 * ${r} * ${r} = ${area}이고, sealed class 덕분에 when에 else 없이도 컴파일이 돼요.`,
          hint: 'is Circle 분기의 계산식을 그대로 적용해보세요.'
        };
      }
    },
    {
      id: 'objectCompanion',
      title: 'object와 companion object',
      ready: true,
      summary: '딱 하나만 존재하는 객체를 만드는 object와, 클래스 안에서 정적 멤버 역할을 하는 companion object를 배워요.',
      goals: ['object로 싱글턴 만들기', 'companion object', '클래스 이름으로 바로 접근하기'],
      blocks: [
        {
          h: '단 하나만 존재하는 객체: object',
          html: `<p><code>object</code>로 만들면, 그 이름의 객체는 프로그램 전체에서 딱 하나만 존재해요(싱글턴). 따로 인스턴스를 만들 필요 없이 이름으로 바로 접근해요.</p>`,
          code: {
            label: 'object.kt',
            lang: 'kotlin',
            src: `object Counter {
    var count = 0
    fun increment() {
        count++
    }
}

Counter.increment()
Counter.increment()
println(Counter.count)`,
            out: `2`
          }
        },
        {
          h: '클래스 안의 정적인 멤버: companion object',
          html: `<p><code>companion object</code>는 클래스 안에 두는 특별한 object예요. 인스턴스를 만들지 않고도 <code>클래스이름.함수이름()</code>처럼 바로 호출할 수 있어서, 자바의 <code>static</code>과 비슷한 역할을 해요.</p>`,
          code: {
            label: 'companion.kt',
            lang: 'kotlin',
            src: `class User(val name: String) {
    companion object {
        fun create(name: String): User {
            return User(name)
        }
    }
}

val u = User.create("지수")
println(u.name)`,
            out: `지수`
          },
          after: `<div class="note"><b>정리</b> — companion object는 주로 인스턴스 없이 객체를 만들어주는 "공장 함수(factory)"를 둘 때 자주 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 6);
          return {
            type: 'blank',
            q: `<code>object Counter { var count = 0; fun increment() { count++ } }</code>일 때, <code>increment()</code>를 ${n}번 호출한 뒤 <code>Counter.count</code>는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `object는 프로그램 전체에서 딱 하나만 존재하므로, increment를 ${n}번 부르면 count도 ${n}이 돼요.`,
            hint: 'object로 만든 Counter는 어디서 불러도 항상 같은 하나의 객체예요.'
          };
        },
        () => makeChoice(
          '프로그램 전체에서 인스턴스가 딱 하나만 존재하는 객체(싱글턴)를 만들 때 쓰는 키워드는?',
          '<code>object</code>', ['<code>class</code>', '<code>companion</code>', '<code>static</code>'],
          '<code>object Counter { ... }</code>처럼 쓰면, Counter는 프로그램에서 하나만 존재하는 객체가 돼요.',
          '따로 인스턴스를 만들 필요 없이 이름만으로 바로 쓸 수 있는 객체예요.'
        ),
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>class User(val name: String) { companion object { fun create(name: String): User = User(name) } }</code>일 때, <code>User.create("${name}").name</code>의 결과는? (그대로 입력)`,
            prefix: '', suffix: '', accept: [name], placeholder: '이름',
            why: `companion object 덕분에 인스턴스 없이 <code>User.create(...)</code>로 바로 호출할 수 있고, 결과는 name이 "${name}"인 User예요.`,
            hint: 'companion object 안의 함수는 클래스 이름(User.함수이름())으로 바로 호출할 수 있어요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>User</code> 클래스 안에, <code>name</code>을 받아 <code>User</code>를 만들어 반환하는 <code>create</code> 함수를 가진 <code>companion object</code>를 작성하세요. (companion object 블록만)',
          starter: '',
          placeholder: 'companion object { fun create(name: String): User = User(name) }',
          accept: ['companion object { fun create(name: String): User = User(name) }'],
          why: '<code>companion object { ... }</code> 안에 함수를 정의하면 클래스 이름으로 바로 호출할 수 있어요.',
          hint: 'companion object { fun create(name: String): User = User(name) } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const n = randInt(3, 7);
        return {
          type: 'blank',
          q: `<code>object Counter { var count = 0; fun increment() { count++ } }</code>이 있고, 서로 다른 곳에서 <code>Counter.increment()</code>를 총 ${n}번 호출했어요. 최종 <code>Counter.count</code>는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
          why: `object는 어디서 접근하든 항상 같은 하나의 인스턴스이므로, 총 호출 횟수만큼 count가 늘어나 ${n}이 돼요.`,
          hint: 'object로 만든 것은 여러 번 "새로" 만들어지지 않고, 항상 같은 객체예요.'
        };
      }
    },
    {
      id: 'smartCast',
      title: '스마트 캐스트',
      ready: true,
      summary: 'is로 타입을 확인하면 컴파일러가 자동으로 그 타입처럼 다뤄주는 스마트 캐스트를 배워요.',
      goals: ['is로 타입 검사', '스마트 캐스트 자동 변환', 'as로 명시적 캐스팅'],
      blocks: [
        {
          h: 'is로 확인하면 자동 변환: 스마트 캐스트',
          html: `<p><code>if (x is String)</code>로 타입을 확인하고 나면, 그 블록 안에서는 <code>x</code>를 굳이 변환하지 않아도 알아서 <code>String</code>처럼 다룰 수 있어요. 이걸 <b>스마트 캐스트</b>라고 해요.</p>`,
          code: {
            label: 'smart_cast.kt',
            lang: 'kotlin',
            src: `fun printLength(x: Any) {
    if (x is String) {
        println(x.length) // 이미 String으로 취급돼요
    }
}

printLength("안녕하세요")`,
            out: `5`
          }
        },
        {
          h: '직접 변환하기: as',
          html: `<p><code>as</code>는 타입을 직접 바꿔서 다루게 해줘요. 다만 실제로 그 타입이 아니면 <code>ClassCastException</code> 오류가 나요. 실패하면 오류 대신 null을 받고 싶다면 <code>as?</code>를 써요.</p>`,
          code: {
            label: 'as_cast.kt',
            lang: 'kotlin',
            src: `val x: Any = "안녕"
val s = x as String
println(s.length)`,
            out: `2`
          },
          after: `<div class="note"><b>정리</b> — <code>is</code>로 먼저 확인하고 쓰는 스마트 캐스트가 <code>as</code>보다 훨씬 안전해요. <code>as</code>는 타입이 확실할 때만 조심해서 쓰세요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const word = pick(['안녕하세요', '반갑습니다', '고맙습니다']);
          return {
            type: 'blank',
            q: `<code>fun printLength(x: Any) { if (x is String) { println(x.length) } }</code>일 때, <code>printLength("${word}")</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(word.length)], placeholder: '숫자',
            why: `x가 String임을 확인했으니 스마트 캐스트로 x.length를 바로 쓸 수 있고, "${word}"의 길이는 ${word.length}예요.`,
            hint: 'is String으로 확인한 블록 안에서는 x를 String처럼 그대로 쓸 수 있어요.'
          };
        },
        () => makeChoice(
          '스마트 캐스트가 일어나는 조건으로 알맞은 것은?',
          '<code>is</code>로 타입을 확인한 뒤, 그 값이 중간에 바뀌지 않는 경우', ['<code>as</code>로 변환을 시도한 뒤', '변수가 <code>var</code>일 때 항상', '아무 조건 없이 항상'],
          '스마트 캐스트는 <code>is</code> 검사 이후 값이 바뀌지 않는다고 컴파일러가 확신할 수 있을 때 일어나요.',
          '검사한 값이 중간에 바뀔 수 있는 var보다, 안 바뀌는 val에서 훨씬 잘 일어나요.'
        ),
        () => {
          const willFail = Math.random() < 0.5;
          return {
            type: 'blank',
            q: `<code>val x: Any = ${willFail ? '123' : '"안녕"'}</code>일 때, <code>val s = x as String</code>을 실행하면? ('오류' 또는 '통과' 중 하나로 답하세요)`,
            prefix: '', suffix: '', accept: [willFail ? '오류' : '통과'], placeholder: '오류 / 통과',
            why: willFail
              ? 'x가 실제로는 Int이므로 String으로 강제 변환할 수 없어 ClassCastException 오류가 발생해요.'
              : 'x가 실제로 String이므로 as 변환이 문제없이 통과돼요.',
            hint: 'as는 실제 타입이 맞지 않으면 그 자리에서 오류를 던져요.'
          };
        },
        () => ({
          type: 'code',
          q: '매개변수 <code>x: Any</code>가 <code>Int</code>인지 확인해서, 맞으면 그 값을 출력하는 함수 <code>printIfInt</code>를 작성하세요. (예: <code>fun printIfInt(x: Any) { if (...) { ... } }</code>)',
          starter: '',
          placeholder: 'fun printIfInt(x: Any) { if (x is Int) { println(x) } }',
          accept: ['fun printIfInt(x: Any) { if (x is Int) { println(x) } }'],
          why: '<code>if (x is Int)</code>로 확인하면, 그 블록 안에서 x를 Int처럼 바로 쓸 수 있어요.',
          hint: 'if (x is Int) { println(x) } 형태를 함수 안에 그대로 넣어보세요.'
        }),
      ],
      boss: () => {
        const word = pick(['프로그래밍', '코틀린', '자바스크립트']);
        return {
          type: 'blank',
          q: `<code>fun describe(x: Any): String { if (x is String) { return "문자열 길이: \${x.length}" }; return "문자열 아님" }</code>일 때, <code>describe("${word}")</code>의 결과는? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`문자열 길이: ${word.length}`], placeholder: '결과 문자열',
          why: `x가 String이므로 스마트 캐스트로 x.length를 바로 쓸 수 있고, "${word}"의 길이는 ${word.length}예요.`,
          hint: 'is String 검사를 통과하면 x는 그 블록 안에서 String처럼 다뤄져요.'
        };
      }
    },
    {
      id: 'dataClassAdvanced',
      title: 'data class 심화: copy와 구조 분해',
      ready: true,
      summary: 'data class의 일부 값만 바꾼 복사본을 만드는 copy와, 값을 한 번에 꺼내는 구조 분해를 배워요.',
      goals: ['copy()로 일부만 바꾼 복사본', '구조 분해 선언', 'val (a, b) = 객체'],
      blocks: [
        {
          h: '일부만 바꾼 복사본: copy()',
          html: `<p>data class는 <code>copy()</code>를 자동으로 만들어줘요. 원본은 그대로 두고, 바꾸고 싶은 값만 지정해서 새 객체를 만들 수 있어요.</p>`,
          code: {
            label: 'copy.kt',
            lang: 'kotlin',
            src: `data class Student(val name: String, val age: Int)

val s1 = Student("지수", 16)
val s2 = s1.copy(age = 17)

println(s2)`,
            out: `Student(name=지수, age=17)`
          }
        },
        {
          h: '한 번에 값 꺼내기: 구조 분해 선언',
          html: `<p>data class의 값들은 <code>val (a, b) = 객체</code> 형태로 한 번에 여러 변수에 나눠 담을 수 있어요. 이걸 <b>구조 분해 선언</b>이라고 해요.</p>`,
          code: {
            label: 'destructure.kt',
            lang: 'kotlin',
            src: `data class Student(val name: String, val age: Int)

val s1 = Student("지수", 16)
val (name, age) = s1

println(name)
println(age)`,
            out: `지수\n16`
          },
          after: `<div class="note"><b>정리</b> — 구조 분해는 data class가 자동으로 만들어주는 <code>component1()</code>, <code>component2()</code> 같은 함수를 이용해서 동작해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          const age = randInt(14, 19);
          const newAge = age + randInt(1, 3);
          return {
            type: 'blank',
            q: `<code>data class Student(val name: String, val age: Int)</code>이고 <code>val s1 = Student("${name}", ${age})</code>일 때, <code>s1.copy(age = ${newAge})</code>를 <code>println</code>하면? (그대로 입력, 예: Student(name=..., age=...))`,
            prefix: '', suffix: '', accept: [`Student(name=${name}, age=${newAge})`], placeholder: '출력 결과',
            why: `copy(age = ${newAge})는 name은 그대로 두고 age만 ${newAge}로 바꾼 새 객체를 만들어요.`,
            hint: 'copy()에서 지정하지 않은 값은 원본 값을 그대로 써요.'
          };
        },
        () => makeChoice(
          'data class의 <code>copy()</code>가 하는 일로 알맞은 것은?',
          '원본은 그대로 두고, 지정한 값만 바꾼 새 객체를 만든다', ['원본 객체의 값 자체를 바꾼다', '객체를 삭제한다', '두 객체를 하나로 합친다'],
          '<code>copy(age = 17)</code>처럼 바꾸고 싶은 프로퍼티만 지정하면, 나머지는 원본 값 그대로인 새 객체가 만들어져요.',
          '원본 s1은 copy 이후에도 전혀 바뀌지 않아요.'
        ),
        () => {
          const name = pick(['민준', '서연', '도윤']);
          const age = randInt(14, 19);
          const pickName = Math.random() < 0.5;
          return {
            type: 'blank',
            q: `<code>data class Student(val name: String, val age: Int)</code>이고 <code>val (name, age) = Student("${name}", ${age})</code>일 때, <code>${pickName ? 'name' : 'age'}</code>의 값은? (그대로 입력)`,
            prefix: '', suffix: '', accept: [pickName ? name : String(age)], placeholder: '값',
            why: `구조 분해는 순서대로 첫 번째 프로퍼티는 name, 두 번째는 age에 담기므로, ${pickName ? 'name' : 'age'}는 ${pickName ? name : age}예요.`,
            hint: 'val (a, b) = 객체는 프로퍼티 선언 순서대로 값을 나눠 담아요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>val s1 = Student("지수", 16)</code>에서, age만 17로 바꾼 새 객체를 만드는 코드를 작성하세요. (예: <code>val s2 = ...</code>)',
          starter: '',
          placeholder: 'val s2 = s1.copy(age = 17)',
          accept: ['val s2 = s1.copy(age = 17)'],
          why: '<code>copy(age = 17)</code>은 age만 17로 바꾸고 나머지는 원본과 같은 새 객체를 만들어요.',
          hint: 's1.copy(age = 17) 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        const newName = pick(['하은', '주원', '예린']);
        return {
          type: 'blank',
          q: `<code>data class Student(val name: String, val age: Int)</code>이고 <code>val s1 = Student("${name}", ${age})</code>, <code>val s2 = s1.copy(name = "${newName}")</code>일 때, <code>val (n, a) = s2</code> 후 <code>a</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(age)], placeholder: '숫자',
          why: `copy(name = "${newName}")는 name만 바꾸므로 age는 원본 그대로 ${age}이고, 구조 분해의 두 번째 값 a도 ${age}예요.`,
          hint: 'copy에서 지정하지 않은 age는 원본 값을 그대로 유지해요.'
        };
      }
    },
    {
      id: 'collectionOps',
      title: '컬렉션 함수형 연산: filter, reduce, sum',
      ready: true,
      summary: '리스트를 반복문 없이 다루는 filter, reduce, sum 같은 함수형 연산을 배워요.',
      goals: ['filter로 조건에 맞는 것만 걸러내기', 'reduce로 하나의 값으로 합치기', 'map과 이어서 쓰기'],
      blocks: [
        {
          h: '조건에 맞는 것만 남기기: filter',
          html: `<p><code>filter</code>는 조건(람다)이 true인 원소만 남긴 새 리스트를 만들어요.</p>`,
          code: {
            label: 'filter.kt',
            lang: 'kotlin',
            src: `val numbers = listOf(1, 2, 3, 4, 5, 6)
val evens = numbers.filter { it % 2 == 0 }
println(evens)`,
            out: `[2, 4, 6]`
          }
        },
        {
          h: '하나의 값으로 합치기: reduce와 sum',
          html: `<p><code>reduce</code>는 리스트의 값을 순서대로 하나씩 합쳐서 결국 하나의 값으로 만들어요. 단순히 다 더하고 싶다면 <code>sum()</code>이 더 간단해요.</p>`,
          code: {
            label: 'reduce.kt',
            lang: 'kotlin',
            src: `val numbers = listOf(1, 2, 3, 4)
val total = numbers.reduce { acc, n -> acc + n }
println(total)
println(numbers.sum())`,
            out: `10\n10`
          },
          after: `<div class="note"><b>정리</b> — <code>map</code>, <code>filter</code>, <code>reduce</code>는 이어서(체이닝) 쓸 수 있어요. 예: <code>numbers.filter { it % 2 == 0 }.sum()</code></div>`
        }
      ],
      quizGenerators: [
        () => {
          const nums = Array.from({ length: 5 }, () => randInt(1, 20));
          const evens = nums.filter(n => n % 2 === 0);
          return {
            type: 'blank',
            q: `<code>val numbers = listOf(${nums.join(', ')})</code>이고 <code>val evens = numbers.filter { it % 2 == 0 }</code>일 때, <code>evens</code>의 값은? (쉼표와 공백으로 구분, 비어있으면 빈 리스트라고 쓰세요)`,
            prefix: '', suffix: '', accept: [evens.length ? evens.join(', ') : '빈 리스트', evens.length ? evens.join(',') : '[]'], placeholder: '숫자, 숫자 또는 빈 리스트',
            why: evens.length ? `짝수만 남기면 [${evens.join(', ')}]이 돼요.` : '짝수가 하나도 없어서 빈 리스트가 돼요.',
            hint: 'filter { it % 2 == 0 }은 2로 나눠 떨어지는 원소만 남겨요.'
          };
        },
        () => makeChoice(
          '<code>reduce</code>가 하는 일로 알맞은 것은?',
          '리스트의 값을 순서대로 합쳐서 하나의 값으로 만든다', ['리스트를 조건에 맞게 걸러낸다', '리스트의 각 값을 변환한다', '리스트를 정렬한다'],
          '<code>reduce { acc, n -> acc + n }</code>처럼, 누적값(acc)과 다음 값(n)을 계속 합쳐서 결국 하나의 결과를 만들어요.',
          '"줄인다(reduce)"는 이름처럼, 여러 개의 값을 하나로 줄여요.'
        ),
        () => {
          const nums = Array.from({ length: 4 }, () => randInt(1, 10));
          const result = nums.filter(n => n % 2 === 1).reduce((a, b) => a + b, 0);
          return {
            type: 'blank',
            q: `<code>val numbers = listOf(${nums.join(', ')})</code>일 때, <code>numbers.filter { it % 2 == 1 }.sum()</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
            why: `홀수만 걸러내면 [${nums.filter(n => n % 2 === 1).join(', ') || '없음'}]이고, 그 합은 ${result}예요.`,
            hint: '먼저 filter로 홀수만 남기고, 그 다음 sum으로 합쳐보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>numbers</code>라는 리스트에서 짝수만 골라내는 코드를 <code>filter</code>로 작성하세요. (예: <code>val evens = ...</code>)',
          starter: '',
          placeholder: 'val evens = numbers.filter { it % 2 == 0 }',
          accept: ['val evens = numbers.filter { it % 2 == 0 }'],
          why: '<code>filter { it % 2 == 0 }</code>은 2로 나눈 나머지가 0인(짝수) 원소만 남겨요.',
          hint: 'numbers.filter { it % 2 == 0 } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const nums = Array.from({ length: 5 }, () => randInt(1, 15));
        const result = nums.filter(n => n % 2 === 0).reduce((a, b) => a + b, 0);
        return {
          type: 'blank',
          q: `<code>val numbers = listOf(${nums.join(', ')})</code>일 때, <code>numbers.filter { it % 2 == 0 }.reduce { acc, n -> acc + n }</code>의 결과는? 숫자만 쓰세요. (짝수가 없으면 0이라고 쓰세요)`,
          prefix: '', suffix: '', accept: [String(result || 0)], placeholder: '숫자',
          why: `짝수만 걸러내면 [${nums.filter(n => n % 2 === 0).join(', ') || '없음'}]이고, 이를 reduce로 다 더하면 ${result}예요.`,
          hint: 'filter로 먼저 짝수만 남기고, reduce로 그 값들을 다 더해보세요.'
        };
      }
    },
    {
      id: 'scopeFunctions',
      title: '스코프 함수: let, apply, also',
      ready: true,
      summary: '객체를 대상으로 코드 블록을 실행하는 스코프 함수 let, apply, also의 쓰임을 배워요.',
      goals: ['let으로 null 체크와 값 변환', 'apply로 객체 설정하기', 'also로 부수 작업 끼워넣기'],
      blocks: [
        {
          h: 'null이 아닐 때만 실행: let',
          html: `<p><code>?.let { }</code>은 값이 null이 아닐 때만 블록을 실행하고, 그 블록 안에서는 <code>it</code>으로 값을 가리켜요. 블록의 마지막 줄이 전체 결과가 돼요.</p>`,
          code: {
            label: 'let.kt',
            lang: 'kotlin',
            src: `val nickname: String? = "지수"
val length = nickname?.let {
    println("처리 중: $it")
    it.length
}
println(length)`,
            out: `처리 중: 지수\n2`
          }
        },
        {
          h: '객체 설정하고 자기 자신 돌려받기: apply',
          html: `<p><code>apply</code>는 블록 안에서 <code>this</code>(생략 가능)로 객체의 속성을 설정하고, 마지막에 그 객체 자신을 그대로 돌려줘요. 객체를 만들면서 바로 설정할 때 유용해요.</p>`,
          code: {
            label: 'apply.kt',
            lang: 'kotlin',
            src: `class Player(var name: String = "", var score: Int = 0)

val p = Player().apply {
    name = "민준"
    score = 90
}
println(p.name)
println(p.score)`,
            out: `민준\n90`
          }
        },
        {
          h: '값은 그대로 두고 끼워넣기: also',
          html: `<p><code>also</code>는 <code>it</code>으로 객체에 접근해서 로그 출력 같은 부수 작업만 하고, 원래 값은 그대로 돌려줘요.</p>`,
          code: {
            label: 'also.kt',
            lang: 'kotlin',
            src: `val numbers = listOf(1, 2, 3).also {
    println("리스트 크기: \${it.size}")
}
println(numbers)`,
            out: `리스트 크기: 3\n[1, 2, 3]`
          },
          after: `<div class="note"><b>정리</b> — let/also는 <code>it</code>으로, apply/run은 <code>this</code>(생략 가능)로 객체에 접근해요. apply/also는 객체 자신을, let은 블록의 결과를 돌려줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const isNull = Math.random() < 0.5;
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>val nickname: String? = ${isNull ? 'null' : `"${name}"`}</code>이고 <code>val length = nickname?.let { it.length }</code>일 때, <code>length</code>의 값은? (null이면 null, 아니면 숫자)`,
            prefix: '', suffix: '', accept: [isNull ? 'null' : String(name.length)], placeholder: 'null 또는 숫자',
            why: isNull
              ? 'nickname이 null이면 ?.let 블록 자체가 실행되지 않고 전체 결과가 null이 돼요.'
              : `nickname이 "${name}"이므로 let 블록 안 it.length는 ${name.length}가 되고, 그게 length가 돼요.`,
            hint: '?.let은 null이 아닐 때만 블록을 실행해요.'
          };
        },
        () => makeChoice(
          '<code>apply</code>가 블록 실행 후 최종적으로 돌려주는 것은?',
          '그 객체 자기 자신', ['블록의 마지막 줄 결과', 'null', 'Unit'],
          '<code>apply</code>는 객체의 속성을 설정한 뒤, 그 객체 자체를 그대로 반환해요.',
          '<code>Player().apply { ... }</code>의 결과 타입은 여전히 Player예요.'
        ),
        () => {
          const nums = Array.from({ length: randInt(2, 5) }, () => randInt(1, 9));
          return {
            type: 'blank',
            q: `<code>val numbers = listOf(${nums.join(', ')}).also { println(it.size) }</code>일 때, <code>numbers</code>에 담기는 값은? (쉼표와 공백으로 구분해서 입력)`,
            prefix: '', suffix: '', accept: [nums.join(', '), nums.join(',')], placeholder: '숫자, 숫자, ...',
            why: `also는 부수 작업(size 출력)만 하고, numbers에는 원래 리스트 [${nums.join(', ')}]가 그대로 담겨요.`,
            hint: 'also는 값을 바꾸지 않고, 원래 값을 그대로 돌려줘요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>Player</code>(<code>var name: String = ""</code>, <code>var score: Int = 0</code>)를 만들면서 <code>name</code>을 "지수"로, <code>score</code>를 100으로 설정하는 코드를 <code>apply</code>로 작성하세요. (예: <code>val p = Player().apply { ... }</code>)',
          starter: '',
          placeholder: 'val p = Player().apply { name = "지수"; score = 100 }',
          accept: ['val p = Player().apply { name = "지수"; score = 100 }'],
          why: '<code>apply { ... }</code> 블록 안에서 속성을 설정하면, 그 객체 자신이 그대로 p에 담겨요.',
          hint: 'Player().apply { name = "지수"; score = 100 } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const isNull = Math.random() < 0.5;
        const word = pick(['안녕하세요', '반갑습니다']);
        return {
          type: 'blank',
          q: `<code>val greeting: String? = ${isNull ? 'null' : `"${word}"`}</code>이고 <code>val result = greeting?.let { it.uppercase() } ?: "없음"</code>일 때, <code>result</code>의 값은? (그대로 입력)`,
          prefix: '', suffix: '', accept: [isNull ? '없음' : word.toUpperCase()], placeholder: '결과 문자열',
          why: isNull
            ? 'greeting이 null이므로 ?.let 결과도 null이 되고, ?: 뒤의 기본값 "없음"이 쓰여요.'
            : `greeting이 "${word}"이므로 let 블록에서 대문자로 바꾼 "${word.toUpperCase()}"가 결과가 돼요.`,
          hint: 'let과 엘비스 연산자(?:)를 함께 쓰면, null일 때의 기본값까지 한 번에 처리할 수 있어요.'
        };
      }
    },
    {
      id: 'delegation',
      title: '위임: by lazy',
      ready: true,
      summary: '처음 쓸 때 딱 한 번만 계산하고 재사용하는 lazy 위임 프로퍼티를 배워요.',
      goals: ['by lazy로 지연 초기화', 'lazy는 딱 한 번만 계산됨', '위임(by)의 기본 개념'],
      blocks: [
        {
          h: '필요할 때 딱 한 번만: by lazy',
          html: `<p><code>by lazy { }</code>로 프로퍼티를 선언하면, 그 프로퍼티를 처음 <b>사용하는 순간</b>에만 블록이 실행돼서 값이 계산돼요. 그 이후로는 계산된 값을 재사용해서, 두 번 세 번 접근해도 블록이 다시 실행되지 않아요.</p>`,
          code: {
            label: 'lazy.kt',
            lang: 'kotlin',
            src: `val expensiveValue: Int by lazy {
    println("계산 중...")
    42
}

println("시작")
println(expensiveValue)
println(expensiveValue)`,
            out: `시작\n계산 중...\n42\n42`
          },
          after: `<div class="note"><b>정리</b> — "계산 중..."은 딱 한 번만 출력돼요. 두 번째 <code>expensiveValue</code> 접근부터는 이미 계산된 42를 그냥 재사용해요. <code>by</code>는 프로퍼티의 실제 동작(값을 어떻게 가져올지)을 다른 객체(여기선 lazy가 만든 객체)에 "위임"한다는 뜻이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 5);
          return {
            type: 'blank',
            q: `<code>val expensiveValue: Int by lazy { println("계산 중..."); 42 }</code>일 때, <code>expensiveValue</code>를 ${n}번 접근하면 "계산 중..."은 총 몇 번 출력될까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: ['1'], placeholder: '숫자',
            why: 'lazy 블록은 처음 접근할 때 딱 한 번만 실행되고, 이후로는 계산된 값을 재사용해서 몇 번을 더 접근해도 1번만 출력돼요.',
            hint: 'lazy는 "이미 계산했으면 다시 계산 안 함"이 핵심이에요.'
          };
        },
        () => makeChoice(
          '<code>by lazy</code>의 특징으로 알맞은 것은?',
          '프로퍼티에 처음 접근할 때 딱 한 번만 블록이 실행되고, 이후로는 그 값을 재사용한다', ['접근할 때마다 매번 블록이 새로 실행된다', '프로그램 시작과 동시에 미리 계산해둔다', '값을 여러 번 바꿀 수 있게 해준다'],
          'lazy는 "필요할 때, 딱 한 번만" 계산하고 그 결과를 캐싱(재사용)해요.',
          '"게으르다(lazy)"는 이름처럼, 진짜 필요해지기 전까지는 계산을 미뤄요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>val value: Int by lazy { println("계산 중..."); 10 }</code>이고 <code>println("A"); println(value); println("B"); println(value)</code>를 실행하면, 출력 순서는? (줄바꿈으로 구분해서 순서대로 입력)`,
          prefix: '', suffix: '', accept: ['A\n계산 중...\n10\nB\n10'], placeholder: '출력 순서',
          why: 'value에 처음 접근할 때만 "계산 중..."이 찍히고 10이 나오며, 두 번째 접근에서는 계산 없이 바로 10만 출력돼요.',
          hint: '첫 접근에서만 lazy 블록이 실행된다는 걸 기억하세요.'
        }),
        () => ({
          type: 'code',
          q: '<code>Int</code> 타입의 프로퍼티 <code>total</code>을, <code>100</code>을 반환하는 <code>lazy</code> 블록으로 선언하는 코드를 작성하세요. (예: <code>val total: Int by lazy { ... }</code>)',
          starter: '',
          placeholder: 'val total: Int by lazy { 100 }',
          accept: ['val total: Int by lazy { 100 }'],
          why: '<code>by lazy { 값 }</code> 형태로 처음 접근할 때만 계산되는 프로퍼티를 만들어요.',
          hint: 'val total: Int by lazy { 100 } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const n = randInt(3, 6);
        return {
          type: 'blank',
          q: `<code>val data: Int by lazy { println("로딩 중..."); 7 }</code>이 있고, 서로 다른 함수에서 <code>data</code>를 총 ${n}번 사용했어요. "로딩 중..."은 총 몇 번 출력될까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: ['1'], placeholder: '숫자',
          why: `lazy로 만든 프로퍼티는 프로그램 전체에서 딱 한 번만 계산되므로, ${n}번을 써도 "로딩 중..."은 1번만 출력돼요.`,
          hint: 'lazy 블록은 그 프로퍼티가 처음 필요해지는 순간 딱 한 번만 실행돼요.'
        };
      }
    },
    {
      id: 'infixFunctions',
      title: 'infix 함수',
      ready: true,
      summary: '점과 괄호 없이 자연스럽게 읽히는 infix 함수를 배워요.',
      goals: ['infix 함수 정의', '중위 표기법으로 호출하기', '표준 라이브러리의 infix 함수(to, until)'],
      blocks: [
        {
          h: '자연스럽게 읽는 함수: infix',
          html: `<p>매개변수가 딱 하나뿐인 함수 앞에 <code>infix</code>를 붙이면, <code>객체.함수(인자)</code> 대신 <code>객체 함수 인자</code>처럼 점과 괄호 없이 호출할 수 있어요.</p>`,
          code: {
            label: 'infix.kt',
            lang: 'kotlin',
            src: `infix fun Int.plusTimes(n: Int): Int {
    return (this + n) * n
}

println(3 plusTimes 2)`,
            out: `10`
          }
        },
        {
          h: '이미 써봤던 infix 함수: to, until',
          html: `<p>사실 <code>"a" to 1</code>이나 <code>1 until 5</code>도 모두 표준 라이브러리의 infix 함수예요.</p>`,
          code: {
            label: 'to_until.kt',
            lang: 'kotlin',
            src: `val pair = "a" to 1
println(pair)

for (i in 1 until 5) {
    print(i)
}`,
            out: `(a, 1)\n1234`
          },
          after: `<div class="note"><b>정리</b> — infix 함수는 매개변수가 정확히 하나여야 하고, 확장 함수나 멤버 함수에만 붙일 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 10), n = randInt(1, 5);
          const result = (a + n) * n;
          return {
            type: 'blank',
            q: `<code>infix fun Int.plusTimes(n: Int): Int { return (this + n) * n }</code>일 때, <code>${a} plusTimes ${n}</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
            why: `(${a} + ${n}) * ${n} = ${result}이에요.`,
            hint: `${a} plusTimes ${n}은 plusTimes(${n})을 this가 ${a}인 상태로 호출한 것과 같아요.`
          };
        },
        () => makeChoice(
          'infix 함수로 만들 수 있는 조건으로 알맞은 것은?',
          '매개변수가 정확히 하나여야 한다', ['매개변수가 없어야 한다', '반환 타입이 없어야 한다', '클래스 안에서만 만들 수 있다'],
          'infix 함수는 <code>객체 함수 인자</code> 형태로 읽혀야 하므로, 인자가 정확히 하나여야 해요.',
          '"A to B"처럼 딱 하나의 값을 사이에 두는 형태를 생각해보세요.'
        ),
        () => makeChoice(
          '<code>1 until 5</code>처럼 범위를 만들 때 쓰는 <code>until</code>과 <code>"a" to 1</code>의 <code>to</code>는 공통적으로 어떤 함수일까요?',
          'infix 함수', ['확장 프로퍼티', 'companion object 함수', 'operator 함수'],
          '<code>to</code>와 <code>until</code> 모두 표준 라이브러리에 미리 정의된 infix 함수예요.',
          '점과 괄호 없이 자연스럽게 읽히는 형태를 다시 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: 'Int를 확장해서, <code>this</code>와 <code>n</code>을 곱한 값을 반환하는 infix 함수 <code>times2</code>를 식 본문으로 작성하세요.',
          starter: '',
          placeholder: 'infix fun Int.times2(n: Int): Int = this * n',
          accept: ['infix fun Int.times2(n: Int): Int = this * n'],
          why: '<code>infix fun 타입.이름(매개변수): 반환타입 = 계산식</code> 형태로 infix 함수를 만들어요.',
          hint: 'infix fun Int.times2(n: Int): Int = this * n 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 8), n = randInt(1, 4);
        const result = (a + n) * n;
        return {
          type: 'blank',
          q: `<code>infix fun Int.plusTimes(n: Int): Int = (this + n) * n</code>이고 <code>val result = ${a} plusTimes ${n}</code>일 때, <code>result</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
          why: `(${a} + ${n}) * ${n} = ${result}이에요.`,
          hint: 'a plusTimes b는 a.plusTimes(b)를 호출하는 것과 완전히 같아요.'
        };
      }
    },
    {
      id: 'operatorOverloading',
      title: '연산자 오버로딩',
      ready: true,
      summary: '+ 같은 연산자를 내가 만든 클래스에서도 쓸 수 있게 해주는 연산자 오버로딩을 배워요.',
      goals: ['operator fun plus', '+ 연산자를 커스텀 타입에 적용', '연산자별로 정해진 함수 이름'],
      blocks: [
        {
          h: '+ 연산자를 내 타입에서도: operator fun plus',
          html: `<p><code>operator fun plus(other: T)</code>를 정의하면, 그 클래스 값들끼리 <code>+</code> 연산자를 직접 쓸 수 있어요.</p>`,
          code: {
            label: 'operator.kt',
            lang: 'kotlin',
            src: `data class Point(val x: Int, val y: Int) {
    operator fun plus(other: Point): Point {
        return Point(x + other.x, y + other.y)
    }
}

val p1 = Point(1, 2)
val p2 = Point(3, 4)
println(p1 + p2)`,
            out: `Point(x=4, y=6)`
          },
          after: `<div class="note"><b>정리</b> — <code>+</code>는 <code>plus</code>, <code>-</code>는 <code>minus</code>, <code>*</code>는 <code>times</code>처럼, 연산자마다 대응되는 함수 이름이 정해져 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const x1 = randInt(1, 10), y1 = randInt(1, 10);
          const x2 = randInt(1, 10), y2 = randInt(1, 10);
          return {
            type: 'blank',
            q: `<code>operator fun plus(other: Point): Point = Point(x + other.x, y + other.y)</code>이고 <code>Point(${x1}, ${y1}) + Point(${x2}, ${y2})</code>일 때, 결과는? (그대로 입력, 예: Point(x=..., y=...))`,
            prefix: '', suffix: '', accept: [`Point(x=${x1 + x2}, y=${y1 + y2})`], placeholder: 'Point(x=..., y=...)',
            why: `x끼리, y끼리 각각 더하므로 Point(x=${x1 + x2}, y=${y1 + y2})가 돼요.`,
            hint: 'plus 함수 안에서 x는 x끼리, y는 y끼리 더하고 있어요.'
          };
        },
        () => makeChoice(
          '<code>operator fun plus(...)</code>를 정의하면 대응되는 연산자 기호는?',
          '<code>+</code>', ['<code>-</code>', '<code>*</code>', '<code>/</code>'],
          '<code>plus</code> 함수는 <code>+</code> 연산자에 대응돼요.',
          '"더하다"라는 뜻의 영어 단어를 떠올려보세요.'
        ),
        () => makeChoice(
          '<code>*</code> 연산자를 오버로딩하려면 정의해야 하는 함수 이름은?',
          '<code>times</code>', ['<code>multiply</code>', '<code>mul</code>', '<code>product</code>'],
          '<code>*</code> 연산자는 <code>operator fun times(...)</code>에 대응돼요.',
          '"곱하기"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Point(val x: Int, val y: Int)</code> 클래스 안에, 두 Point를 더해 새 Point를 반환하는 <code>plus</code> 연산자 함수를 작성하세요. (함수 정의만)',
          starter: '',
          placeholder: 'operator fun plus(other: Point): Point = Point(x + other.x, y + other.y)',
          accept: ['operator fun plus(other: Point): Point = Point(x + other.x, y + other.y)'],
          why: '<code>operator fun plus(other: Point): Point</code> 형태로 정의하면 <code>+</code>로 두 Point를 더할 수 있어요.',
          hint: 'operator fun plus(other: Point): Point = Point(x + other.x, y + other.y) 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const x1 = randInt(1, 15), y1 = randInt(1, 15);
        const x2 = randInt(1, 15), y2 = randInt(1, 15);
        return {
          type: 'blank',
          q: `<code>data class Point(val x: Int, val y: Int) { operator fun plus(other: Point) = Point(x + other.x, y + other.y) }</code>이고 <code>val result = Point(${x1}, ${y1}) + Point(${x2}, ${y2})</code>일 때, <code>result.x + result.y</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(x1 + x2 + y1 + y2)], placeholder: '숫자',
          why: `result는 Point(x=${x1 + x2}, y=${y1 + y2})이므로, x + y = ${x1 + x2 + y1 + y2}예요.`,
          hint: '먼저 plus 연산의 결과 Point를 구한 다음, 그 x와 y를 더해보세요.'
        };
      }
    },
    {
      id: 'genericVariance',
      title: '제네릭 variance: out과 in',
      ready: true,
      summary: '제네릭 타입 사이의 하위 타입 관계를 다루는 out(공변)과 in(반공변)을 배워요.',
      goals: ['out으로 공변(covariance) 만들기', 'in으로 반공변(contravariance) 만들기', '왜 필요한지 이해하기'],
      blocks: [
        {
          h: '값을 꺼내기만 한다면: out',
          html: `<p>제네릭 클래스가 <code>T</code> 타입의 값을 <b>꺼내기만</b> 하고 넣지는 않는다면, <code>out T</code>로 선언할 수 있어요. 그러면 <code>Box&lt;String&gt;</code>을 <code>Box&lt;Any&gt;</code>가 필요한 곳에도 쓸 수 있게 돼요(공변, covariance).</p>`,
          code: {
            label: 'out_variance.kt',
            lang: 'kotlin',
            src: `class Box<out T>(val item: T)

fun printItem(box: Box<Any>) {
    println(box.item)
}

val stringBox: Box<String> = Box("안녕")
printItem(stringBox) // Box<String>을 Box<Any> 자리에 그대로 사용`,
            out: `안녕`
          },
          after: `<div class="note"><b>정리</b> — <code>out</code>이 없다면, <code>String</code>이 <code>Any</code>의 하위 타입이어도 <code>Box&lt;String&gt;</code>은 <code>Box&lt;Any&gt;</code>의 하위 타입으로 인정되지 않아서 이 코드는 컴파일되지 않아요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const word = pick(['안녕', '반가워', '고마워']);
          return {
            type: 'blank',
            q: `<code>class Box<out T>(val item: T)</code>이고 <code>fun printItem(box: Box<Any>) { println(box.item) }</code>일 때, <code>printItem(Box("${word}"))</code>의 출력은? (그대로 입력)`,
            prefix: '', suffix: '', accept: [word], placeholder: '출력 결과',
            why: `out 덕분에 Box<String>을 Box<Any> 자리에 넘길 수 있고, item은 그대로 "${word}"가 출력돼요.`,
            hint: 'out T는 Box<String>을 Box<Any>가 필요한 곳에도 쓸 수 있게 해줘요.'
          };
        },
        () => makeChoice(
          '<code>out T</code>(공변)의 의미로 알맞은 것은?',
          'T가 값을 꺼내는(반환하는) 위치에서만 쓰여서, 하위 타입 Box를 상위 타입 Box 자리에 쓸 수 있게 해준다', ['T가 값을 넣는(매개변수) 위치에서만 쓰인다', '제네릭을 아예 쓸 수 없게 막는다', 'T를 항상 nullable로 만든다'],
          '<code>out</code>은 T를 반환 타입 등 "생산" 위치에만 쓸 수 있게 제한하는 대신, Box&lt;String&gt;을 Box&lt;Any&gt;로 다룰 수 있게 해줘요.',
          '"밖으로(out) 내보내기만 한다"는 이름 그대로예요.'
        ),
        () => makeChoice(
          '<code>out</code>과 반대로, T를 값을 넣는(매개변수) 위치에서만 쓸 수 있게 하는 키워드는?',
          '<code>in</code>', ['<code>out</code>', '<code>var</code>', '<code>val</code>'],
          '<code>in T</code>(반공변)는 T를 매개변수로만 받는 위치에 쓰여서, 상위 타입을 다루는 처리기를 하위 타입 자리에도 쓸 수 있게 해줘요.',
          '"안으로(in) 받기만 한다"는 이름 그대로예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>T</code> 타입의 값 하나(<code>item</code>)를 읽기 전용으로 담는, 공변(out)인 제네릭 클래스 <code>Box</code>를 정의하세요.',
          starter: '',
          placeholder: 'class Box<out T>(val item: T)',
          accept: ['class Box<out T>(val item: T)'],
          why: '<code>class 이름<out T>(val 속성: T)</code> 형태로 공변 제네릭 클래스를 만들어요.',
          hint: 'class Box<out T>(val item: T) 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const n = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>class Box<out T>(val item: T)</code>이고 <code>fun printItem(box: Box<Any>) { println(box.item) }</code>일 때, <code>printItem(Box(${n}))</code>의 출력은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
          why: `out 덕분에 Box<Int>도 Box<Any> 자리에 쓸 수 있고, item 값 ${n}이 그대로 출력돼요.`,
          hint: 'out T는 어떤 타입의 Box든 Box<Any> 자리에 넘길 수 있게 해줘요.'
        };
      }
    },
    {
      id: 'inlineReified',
      title: 'inline 함수와 reified',
      ready: true,
      summary: '함수 호출을 코드로 펼쳐 넣는 inline과, 제네릭 타입 정보를 실행 시점에도 쓸 수 있게 해주는 reified를 배워요.',
      goals: ['inline 함수의 목적', 'reified로 타입 파라미터 검사', 'inline + reified 조합'],
      blocks: [
        {
          h: '람다를 그대로 펼쳐 넣기: inline',
          html: `<p><code>inline</code>이 붙은 함수는 호출하는 코드 자리에 함수 본문이 그대로 "펼쳐져" 들어가요. 람다를 매개변수로 자주 받는 함수에서 성능 부담을 줄여줘요.</p>`,
          code: {
            label: 'inline.kt',
            lang: 'kotlin',
            src: `inline fun repeatAction(times: Int, action: () -> Unit) {
    for (i in 1..times) {
        action()
    }
}

repeatAction(3) {
    println("실행!")
}`,
            out: `실행!\n실행!\n실행!`
          }
        },
        {
          h: '실행 시점에도 타입 정보 남기기: reified',
          html: `<p>제네릭은 보통 실행 시점에 타입 정보가 지워지지만(타입 소거), <code>inline</code> 함수에 <code>reified</code>를 붙이면 그 타입 정보를 실행 시점에도 <code>is</code>로 검사할 수 있어요.</p>`,
          code: {
            label: 'reified.kt',
            lang: 'kotlin',
            src: `inline fun <reified T> isType(value: Any): Boolean {
    return value is T
}

println(isType<String>("안녕"))
println(isType<Int>("안녕"))`,
            out: `true\nfalse`
          },
          after: `<div class="note"><b>정리</b> — <code>reified</code>는 반드시 <code>inline</code> 함수에서만 쓸 수 있어요. inline이라 실제 타입이 호출 위치에 그대로 남기 때문이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 5);
          return {
            type: 'blank',
            q: `<code>inline fun repeatAction(times: Int, action: () -> Unit) { for (i in 1..times) { action() } }</code>일 때, <code>repeatAction(${n}) { println("실행!") }</code>을 실행하면 "실행!"은 몇 번 출력될까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `1..${n} 범위를 돌면서 action()을 매번 호출하므로, "실행!"은 ${n}번 출력돼요.`,
            hint: 'for (i in 1..times)는 1부터 times까지 총 times번 반복해요.'
          };
        },
        () => makeChoice(
          '<code>reified</code>의 역할로 알맞은 것은?',
          'inline 함수에서 제네릭 타입 파라미터의 정보를 실행 시점에도 쓸 수 있게 해준다', ['함수를 비동기로 실행되게 해준다', '변수를 상수로 만들어준다', '클래스를 싱글턴으로 만들어준다'],
          '보통 제네릭 타입은 실행 시점에 지워지지만, inline + reified 조합은 그 타입 정보를 남겨서 <code>is T</code> 같은 검사를 가능하게 해줘요.',
          '"실체화된(reified)"이라는 이름처럼, 지워졌을 타입 정보를 실제로 남겨줘요.'
        ),
        () => {
          const useString = Math.random() < 0.5;
          return {
            type: 'blank',
            q: `<code>inline fun <reified T> isType(value: Any): Boolean = value is T</code>일 때, <code>isType<${useString ? 'String' : 'Int'}>("안녕")</code>의 결과는? (참/거짓)`,
            prefix: '', suffix: '', accept: useString ? ['true', '참'] : ['false', '거짓'], placeholder: 'true / false',
            why: useString
              ? '"안녕"은 실제로 String이므로 isType<String>은 true예요.'
              : '"안녕"은 String이지 Int가 아니므로 isType<Int>는 false예요.',
            hint: 'reified 덕분에 T 자리에 실제로 넣은 타입과 value의 실제 타입을 비교할 수 있어요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>Int</code>를 매개변수로 받는 람다 <code>action</code>을 받아서 그대로 호출하는 <code>inline</code> 함수 <code>runWith</code>를 작성하세요. (예: <code>inline fun runWith(n: Int, action: (Int) -> Unit) { ... }</code>)',
          starter: '',
          placeholder: 'inline fun runWith(n: Int, action: (Int) -> Unit) { action(n) }',
          accept: ['inline fun runWith(n: Int, action: (Int) -> Unit) { action(n) }'],
          why: '<code>inline fun</code>으로 선언하면 람다를 매개변수로 받는 함수 호출의 성능 부담을 줄여줘요.',
          hint: 'inline fun runWith(n: Int, action: (Int) -> Unit) { action(n) } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const useString = Math.random() < 0.5;
        const word = pick(['지수', '민준']);
        return {
          type: 'blank',
          q: `<code>inline fun <reified T> isType(value: Any): Boolean = value is T</code>일 때, <code>isType<${useString ? 'String' : 'Int'}>("${word}")</code>의 결과는? (참/거짓)`,
          prefix: '', suffix: '', accept: useString ? ['true', '참'] : ['false', '거짓'], placeholder: 'true / false',
          why: useString
            ? `"${word}"는 String이므로 결과는 true예요.`
            : `"${word}"는 String이지 Int가 아니므로 결과는 false예요.`,
          hint: 'reified T 자리에 실제로 넣은 타입과, value의 실제 타입이 같은지를 비교해보세요.'
        };
      }
    },
    {
      id: 'exceptionHandling',
      title: '예외 처리: try, catch, finally',
      ready: true,
      summary: '오류가 발생해도 프로그램이 멈추지 않게 처리하는 try-catch-finally를 배워요.',
      goals: ['try-catch로 예외 잡기', 'finally로 항상 실행하기', 'throw로 직접 예외 던지기'],
      blocks: [
        {
          h: '오류를 잡아서 처리하기: try-catch',
          html: `<p><code>try</code> 블록에서 오류가 나면, 그 오류 타입에 맞는 <code>catch</code> 블록이 대신 실행돼요. Kotlin의 <code>try</code>는 식(expression)이라, 값 자체로도 쓸 수 있어요.</p>`,
          code: {
            label: 'try_catch.kt',
            lang: 'kotlin',
            src: `fun divide(a: Int, b: Int): Int {
    return try {
        a / b
    } catch (e: ArithmeticException) {
        println("0으로 나눌 수 없어요")
        0
    }
}

println(divide(10, 2))
println(divide(10, 0))`,
            out: `5\n0으로 나눌 수 없어요\n0`
          }
        },
        {
          h: '무슨 일이 있어도 실행: finally',
          html: `<p><code>finally</code> 블록은 예외가 발생하든 안 하든 항상 마지막에 실행돼요. 파일 닫기, 자원 정리 같은 작업에 자주 써요. <code>throw</code>는 직접 예외를 발생시켜요.</p>`,
          code: {
            label: 'finally.kt',
            lang: 'kotlin',
            src: `fun process() {
    try {
        println("작업 시작")
        throw RuntimeException("문제 발생")
    } catch (e: RuntimeException) {
        println("오류 처리: \${e.message}")
    } finally {
        println("항상 실행됨")
    }
}

process()`,
            out: `작업 시작\n오류 처리: 문제 발생\n항상 실행됨`
          },
          after: `<div class="note"><b>정리</b> — catch 블록이 실행돼도 finally는 그 뒤에 반드시 실행돼요. 예외가 안 나도 마찬가지예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(5, 30);
          const isZero = Math.random() < 0.5;
          const b = isZero ? 0 : randInt(1, 5);
          return {
            type: 'blank',
            q: `<code>fun divide(a: Int, b: Int): Int = try { a / b } catch (e: ArithmeticException) { 0 }</code>일 때, <code>divide(${a}, ${b})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [isZero ? '0' : String(Math.floor(a / b))], placeholder: '숫자',
            why: isZero
              ? '0으로 나누면 ArithmeticException이 발생하고, catch 블록의 0이 결과가 돼요.'
              : `${a} / ${b} = ${Math.floor(a / b)}(정수 나눗셈)이 문제없이 반환돼요.`,
            hint: 'b가 0이면 예외가 발생해서 catch 블록의 값이 대신 쓰여요.'
          };
        },
        () => makeChoice(
          '<code>finally</code> 블록의 특징으로 알맞은 것은?',
          '예외가 발생하든 안 하든 항상 마지막에 실행된다', ['예외가 발생했을 때만 실행된다', '예외가 없을 때만 실행된다', 'try 블록보다 먼저 실행된다'],
          '<code>finally</code>는 try/catch 결과와 상관없이 항상 실행돼요.',
          '자원 정리(파일 닫기 등)를 보장하고 싶을 때 쓰는 블록이에요.'
        ),
        () => {
          const msg = pick(['문제 발생', '잘못된 입력', '연결 실패']);
          return {
            type: 'blank',
            q: `<code>try { throw RuntimeException("${msg}") } catch (e: RuntimeException) { println(e.message) }</code>를 실행하면 출력은? (그대로 입력)`,
            prefix: '', suffix: '', accept: [msg], placeholder: '출력 결과',
            why: `throw로 던진 RuntimeException의 메시지 "${msg}"를 catch에서 e.message로 그대로 꺼내 출력해요.`,
            hint: 'e.message는 throw할 때 넣은 문자열을 그대로 담고 있어요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>a</code>를 <code>b</code>로 나누되, <code>ArithmeticException</code>이 발생하면 -1을 반환하는 함수 <code>safeDivide</code>를 작성하세요. (예: <code>fun safeDivide(a: Int, b: Int): Int { ... }</code>)',
          starter: '',
          placeholder: 'fun safeDivide(a: Int, b: Int): Int { return try { a / b } catch (e: ArithmeticException) { -1 } }',
          accept: ['fun safeDivide(a: Int, b: Int): Int { return try { a / b } catch (e: ArithmeticException) { -1 } }'],
          why: 'try 블록에서 나눗셈을 하고, 예외가 나면 catch에서 -1을 대신 반환해요.',
          hint: 'return try { a / b } catch (e: ArithmeticException) { -1 } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const a = randInt(10, 40);
        const isZero = Math.random() < 0.5;
        const b = isZero ? 0 : randInt(1, 6);
        return {
          type: 'blank',
          q: `<code>fun safeDivide(a: Int, b: Int): Int = try { a / b } catch (e: ArithmeticException) { -1 } finally { println("완료") }</code>일 때, <code>safeDivide(${a}, ${b})</code>의 반환값은? 숫자만 쓰세요. (finally는 println만 하고 반환값에 영향 없어요)`,
          prefix: '', suffix: '', accept: [isZero ? '-1' : String(Math.floor(a / b))], placeholder: '숫자',
          why: isZero
            ? `${b}로 나누면 예외가 발생해서 catch의 -1이 반환값이 돼요. finally는 "완료"만 출력하고 반환값을 바꾸지 않아요.`
            : `${a} / ${b} = ${Math.floor(a / b)}이 문제없이 반환돼요. finally는 그 뒤에 "완료"만 추가로 출력해요.`,
          hint: 'finally는 항상 실행되지만, 함수의 반환값 자체를 바꾸지는 않아요.'
        };
      }
    },
    {
      id: 'coroutinesBasics',
      title: '코루틴 기초',
      ready: true,
      summary: '가볍게 동시에 실행되는 코드를 만드는 코루틴의 기본 개념을 배워요.',
      goals: ['runBlocking과 launch', 'suspend 함수', 'delay로 기다리기'],
      blocks: [
        {
          h: '동시에 실행하기: launch',
          html: `<p><code>launch</code>는 새 코루틴을 시작해서, 그 안의 코드가 메인 흐름과 동시에(비동기로) 진행되게 해요. <code>delay</code>는 그 코루틴만 잠시 멈추고, 다른 코드는 계속 진행돼요.</p>`,
          code: {
            label: 'launch.kt',
            lang: 'kotlin',
            src: `import kotlinx.coroutines.*

fun main() = runBlocking {
    launch {
        delay(100)
        println("작업 1 완료")
    }
    println("메인 계속 진행")
}`,
            out: `메인 계속 진행\n작업 1 완료`
          }
        },
        {
          h: '잠깐 멈췄다 이어가는 함수: suspend',
          html: `<p><code>suspend</code>가 붙은 함수는 코루틴 안(또는 다른 suspend 함수 안)에서만 호출할 수 있어요. <code>delay</code>도 suspend 함수라서, 스레드를 막지 않고 "잠깐 멈췄다가" 나중에 이어갈 수 있어요.</p>`,
          code: {
            label: 'suspend.kt',
            lang: 'kotlin',
            src: `suspend fun fetchData(): String {
    delay(100)
    return "데이터"
}

fun main() = runBlocking {
    val result = fetchData()
    println(result)
}`,
            out: `데이터`
          },
          after: `<div class="note"><b>정리</b> — <code>delay</code>는 <code>Thread.sleep</code>과 달리 스레드 전체를 막지 않아요. 기다리는 동안 그 스레드는 다른 코루틴의 작업을 처리할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>runBlocking { launch { delay(100); println("작업 완료") }; println("메인 계속 진행") }</code>을 실행하면 어떤 줄이 먼저 출력될까요? ("메인 계속 진행" 또는 "작업 완료" 중 하나로 답하세요)`,
          prefix: '', suffix: '', accept: ['메인 계속 진행'], placeholder: '먼저 출력되는 줄',
          why: 'launch로 시작한 코루틴은 delay(100) 동안 잠시 멈추고, 그 사이 메인 코드가 먼저 계속 진행돼서 "메인 계속 진행"이 먼저 출력돼요.',
          hint: 'delay는 그 코루틴만 멈추고, 바깥의 다른 코드는 계속 실행돼요.'
        }),
        () => makeChoice(
          '<code>suspend</code> 함수의 특징으로 알맞은 것은?',
          '실행을 잠시 멈췄다가 나중에 이어갈 수 있고, 코루틴이나 다른 suspend 함수 안에서만 호출할 수 있다', ['항상 새 스레드를 만든다', '일반 함수보다 항상 빠르게 실행된다', '반환값을 가질 수 없다'],
          'suspend 함수는 중간에 멈췄다 이어갈 수 있는 함수라서, 코루틴 밖(일반 함수)에서는 직접 호출할 수 없어요.',
          '"매달다, 중단하다(suspend)"라는 이름 그대로 실행을 잠시 멈출 수 있어요.'
        ),
        () => makeChoice(
          '<code>delay(100)</code>과 <code>Thread.sleep(100)</code>의 차이로 알맞은 것은?',
          'delay는 스레드를 막지 않고, 그 사이 스레드가 다른 코루틴 작업을 할 수 있다', ['delay가 항상 더 오래 걸린다', 'Thread.sleep은 코루틴 안에서만 쓸 수 있다', '둘은 완전히 같은 기능이다'],
          'delay는 suspend 함수라서 스레드를 점유하지 않고 "양보"하는 반면, Thread.sleep은 그 스레드 전체를 멈춰버려요.',
          '코루틴이 "가볍다"고 하는 이유 중 하나가 바로 이 부분이에요.'
        ),
        () => ({
          type: 'code',
          q: '100밀리초를 기다린 뒤 "완료"를 반환하는 <code>suspend</code> 함수 <code>waitAndReturn</code>을 작성하세요.',
          starter: '',
          placeholder: 'suspend fun waitAndReturn(): String { delay(100); return "완료" }',
          accept: ['suspend fun waitAndReturn(): String { delay(100); return "완료" }'],
          why: '<code>suspend fun</code>으로 선언하고, 안에서 delay 같은 다른 suspend 함수를 호출할 수 있어요.',
          hint: 'suspend fun waitAndReturn(): String { delay(100); return "완료" } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        return {
          type: 'blank',
          q: `<code>runBlocking { launch { delay(50); println("A") }; launch { delay(10); println("B") }; println("C") }</code>을 실행할 때, 가장 먼저 출력되는 줄은? (A, B, C 중 하나)`,
          prefix: '', suffix: '', accept: ['C'], placeholder: 'A / B / C',
          why: '두 launch 블록 모두 delay로 잠시 멈추는 동안, 코루틴을 시작만 시켜두고 바로 다음 줄인 println("C")가 먼저 실행돼요.',
          hint: 'launch는 코루틴을 "시작"만 시키고 바로 다음 코드로 넘어가요. delay가 있는 코드는 나중에 이어져요.'
        };
      }
    },
    {
      id: 'fileIOKotlin',
      title: '파일 입출력',
      ready: true,
      summary: 'Kotlin에서 파일을 읽고 쓰는 기본적인 방법을 배워요.',
      goals: ['File로 파일 다루기', 'writeText/readText', 'forEachLine으로 줄 단위 읽기'],
      blocks: [
        {
          h: '파일에 쓰고 읽기: writeText, readText',
          html: `<p><code>File("경로")</code>로 파일을 가리키고, <code>writeText</code>로 내용을 쓰고 <code>readText</code>로 전체 내용을 읽을 수 있어요.</p>`,
          code: {
            label: 'file_io.kt',
            lang: 'kotlin',
            src: `import java.io.File

val file = File("data.txt")
file.writeText("안녕하세요\\n반갑습니다")

println(file.readText())`,
            out: `안녕하세요\n반갑습니다`
          }
        },
        {
          h: '한 줄씩 읽기: forEachLine',
          html: `<p><code>forEachLine</code>은 파일을 한 줄씩 읽어서, 각 줄에 대해 원하는 처리를 할 수 있게 해줘요. 큰 파일을 한 번에 메모리에 올리지 않아도 돼서 효율적이에요.</p>`,
          code: {
            label: 'for_each_line.kt',
            lang: 'kotlin',
            src: `import java.io.File

val file = File("data.txt")
file.forEachLine { line ->
    println("줄: $line")
}`,
            out: `줄: 안녕하세요\n줄: 반갑습니다`
          },
          after: `<div class="note"><b>정리</b> — 내용을 덮어쓰지 않고 뒤에 이어 붙이고 싶다면 <code>writeText</code> 대신 <code>appendText</code>를 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const content = pick(['안녕하세요', '반갑습니다', '좋은 하루']);
          return {
            type: 'blank',
            q: `<code>val file = File("data.txt"); file.writeText("${content}"); println(file.readText())</code>를 실행하면 출력은? (그대로 입력)`,
            prefix: '', suffix: '', accept: [content], placeholder: '출력 결과',
            why: `writeText로 쓴 내용을 readText로 그대로 다시 읽어오므로, "${content}"가 출력돼요.`,
            hint: 'writeText로 쓴 내용을 readText가 그대로 돌려줘요.'
          };
        },
        () => makeChoice(
          '<code>forEachLine</code>이 하는 일로 알맞은 것은?',
          '파일을 한 줄씩 읽어서, 각 줄마다 주어진 처리를 실행한다', ['파일 전체를 한 번에 문자열로 읽어온다', '파일을 한 줄씩 지운다', '파일의 첫 줄만 읽는다'],
          '<code>forEachLine { line -> ... }</code>은 파일의 각 줄에 대해 블록을 실행해요.',
          '"각 줄마다(for each line)"라는 이름 그대로예요.'
        ),
        () => makeChoice(
          '기존 파일 내용을 지우지 않고 뒤에 내용을 이어 붙이고 싶을 때 쓰는 함수는?',
          '<code>appendText</code>', ['<code>writeText</code>', '<code>readText</code>', '<code>deleteText</code>'],
          '<code>writeText</code>는 기존 내용을 덮어쓰지만, <code>appendText</code>는 뒤에 이어 붙여요.',
          '"덧붙이다(append)"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"log.txt"</code> 파일에 <code>"기록됨"</code>이라는 내용을 쓰는 코드를 작성하세요. (예: <code>File(...).writeText(...)</code>)',
          starter: '',
          placeholder: 'File("log.txt").writeText("기록됨")',
          accept: ['File("log.txt").writeText("기록됨")'],
          why: '<code>File("경로").writeText("내용")</code> 형태로 파일에 내용을 써요.',
          hint: 'File("log.txt").writeText("기록됨") 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const lines = [pick(['첫줄', '시작']), pick(['둘째줄', '다음'])];
        return {
          type: 'blank',
          q: `<code>val file = File("data.txt"); file.writeText("${lines[0]}\\n${lines[1]}"); file.forEachLine { line -> println("줄: $line") }</code>를 실행하면 총 몇 번 println이 호출될까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: ['2'], placeholder: '숫자',
          why: '내용이 줄바꿈으로 2줄이므로, forEachLine은 각 줄마다 한 번씩 총 2번 블록을 실행해요.',
          hint: 'forEachLine은 파일에 있는 줄의 개수만큼 실행돼요.'
        };
      }
    },
    {
      id: 'unitTestingKotlin',
      title: '단위 테스트',
      ready: true,
      summary: '코드가 의도대로 동작하는지 자동으로 확인하는 단위 테스트의 기본을 배워요.',
      goals: ['@Test 어노테이션', 'assertEquals로 값 비교', '테스트 함수 작성 규칙'],
      blocks: [
        {
          h: '테스트 함수 작성하기: @Test',
          html: `<p><code>@Test</code> 어노테이션을 붙인 함수는 "이건 테스트 코드다"라고 표시하는 거예요. 백틱(<code>\`</code>)을 쓰면 함수 이름에 공백이 있는 설명적인 이름도 쓸 수 있어요.</p>`,
          code: {
            label: 'test_basic.kt',
            lang: 'kotlin',
            src: `import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.assertEquals

class CalculatorTest {
    @Test
    fun \`두 수를 더하면 합이 맞아야 한다\`() {
        val result = 3 + 4
        assertEquals(7, result)
    }
}`
          }
        },
        {
          h: '예상값과 실제값 비교하기: assertEquals',
          html: `<p><code>assertEquals(예상값, 실제값)</code>은 두 값이 같은지 확인해요. 다르면 테스트가 실패로 표시되고, 어떤 값이 왜 다른지 알려줘요.</p>`,
          code: {
            label: 'assert_fail.kt',
            lang: 'kotlin',
            src: `@Test
fun \`잘못된 계산은 실패해야 한다\`() {
    val result = 2 + 2
    assertEquals(5, result) // 4와 다르므로 테스트 실패
}`
          },
          after: `<div class="note"><b>정리</b> — <code>assertEquals</code>의 첫 번째 인자는 항상 "기대하는 값(예상값)", 두 번째 인자는 "실제로 나온 값"이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 10), b = randInt(1, 10);
          const expected = randInt(1, 20);
          const actual = a + b;
          const passes = expected === actual;
          return {
            type: 'blank',
            q: `<code>val result = ${a} + ${b}; assertEquals(${expected}, result)</code>를 실행하면 테스트는 통과할까요? (통과/실패)`,
            prefix: '', suffix: '', accept: [passes ? '통과' : '실패'], placeholder: '통과 / 실패',
            why: `${a} + ${b} = ${actual}이고, 예상값은 ${expected}이므로 ${passes ? '두 값이 같아 통과해요.' : '두 값이 달라 실패해요.'}`,
            hint: 'assertEquals(예상값, 실제값)에서 두 값이 같은지 비교해보세요.'
          };
        },
        () => makeChoice(
          '<code>@Test</code> 어노테이션의 역할로 알맞은 것은?',
          '이 함수가 테스트 코드임을 테스트 도구에게 알려준다', ['이 함수를 항상 가장 먼저 실행하게 만든다', '이 함수를 private으로 만든다', '이 함수의 반환값을 무시하게 만든다'],
          '<code>@Test</code>가 붙은 함수를 테스트 도구(JUnit 등)가 자동으로 찾아서 실행해요.',
          '테스트 도구에게 "이건 테스트야"라고 표시(annotate)하는 거예요.'
        ),
        () => makeChoice(
          '<code>assertEquals(a, b)</code>에서 첫 번째 인자 <code>a</code>가 의미하는 것은?',
          '기대하는 값(예상값)', ['실제로 나온 값', '테스트 이름', '오류 메시지'],
          'assertEquals의 관례상 첫 번째는 예상값, 두 번째는 실제값이에요.',
          '순서를 헷갈리면 실패 메시지가 반대로 보일 수 있어요.'
        ),
        () => ({
          type: 'code',
          q: '<code>1 + 1</code>이 2와 같은지 확인하는 <code>@Test</code> 함수 <code>additionTest</code>를 작성하세요.',
          starter: '',
          placeholder: '@Test\nfun additionTest() { assertEquals(2, 1 + 1) }',
          accept: ['@Test\nfun additionTest() { assertEquals(2, 1 + 1) }', '@Test fun additionTest() { assertEquals(2, 1 + 1) }'],
          why: '<code>@Test</code>를 붙이고, 함수 안에서 assertEquals로 예상값과 실제값을 비교해요.',
          hint: '@Test 다음 줄에 fun additionTest() { assertEquals(2, 1 + 1) }를 써보세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 15), b = randInt(1, 15);
        const wrong = Math.random() < 0.5;
        const expected = wrong ? a + b + randInt(1, 3) : a + b;
        return {
          type: 'blank',
          q: `<code>@Test fun test() { val result = ${a} + ${b}; assertEquals(${expected}, result) }</code>를 실행하면 테스트는 통과할까요? (통과/실패)`,
          prefix: '', suffix: '', accept: [wrong ? '실패' : '통과'], placeholder: '통과 / 실패',
          why: `${a} + ${b} = ${a + b}이고, 예상값은 ${expected}이므로 ${wrong ? '두 값이 달라 실패해요.' : '두 값이 같아 통과해요.'}`,
          hint: '실제 계산 결과와 assertEquals에 적힌 예상값을 비교해보세요.'
        };
      }
    },
    {
      id: 'rawStrings',
      title: 'raw 문자열: """..."""',
      ready: true,
      summary: '이스케이프 없이 여러 줄과 특수문자를 그대로 담을 수 있는 raw 문자열을 배워요.',
      goals: ['"""..."""로 여러 줄 문자열 만들기', 'trimIndent()으로 들여쓰기 정리', '이스케이프 없이 특수문자 쓰기'],
      blocks: [
        {
          h: '여러 줄 문자열 만들기',
          html: `<p><code>"""..."""</code>(삼중 따옴표)로 문자열을 만들면 줄바꿈을 그대로 담을 수 있어요. <code>trimIndent()</code>를 붙이면 코드의 들여쓰기가 결과 문자열에서 깔끔하게 제거돼요.</p>`,
          code: {
            label: 'raw_string.kt',
            lang: 'kotlin',
            src: `val message = """
    첫째 줄
    둘째 줄
""".trimIndent()

println(message)`,
            out: `첫째 줄\n둘째 줄`
          }
        },
        {
          h: '이스케이프 없이 특수문자 쓰기',
          html: `<p>일반 문자열에서 정규식 같은 특수문자를 쓰려면 <code>\\\\d</code>처럼 이스케이프해야 하지만, raw 문자열에서는 <code>\\d</code>처럼 그대로 쓸 수 있어요.</p>`,
          code: {
            label: 'raw_regex.kt',
            lang: 'kotlin',
            src: `val pattern = """\\d+"""
println(pattern)`,
            out: `\\d+`
          },
          after: `<div class="note"><b>정리</b> — raw 문자열 안에서는 백슬래시(<code>\\</code>)와 큰따옴표를 이스케이프 없이 그대로 쓸 수 있어요(단, 삼중 따옴표 자체는 예외).</div>`
        }
      ],
      quizGenerators: [
        () => {
          const l1 = pick(['안녕', '반가워']);
          const l2 = pick(['좋은 하루', '잘 부탁해']);
          return {
            type: 'blank',
            q: `<code>val message = """\n    ${l1}\n    ${l2}\n""".trimIndent(); println(message)</code>를 실행하면 출력은? (줄바꿈으로 구분해서 두 줄로 입력)`,
            prefix: '', suffix: '', accept: [`${l1}\n${l2}`], placeholder: '두 줄 출력',
            why: `trimIndent()이 앞의 공백들을 제거해서, "${l1}"과 "${l2}" 두 줄만 깔끔하게 남아요.`,
            hint: 'trimIndent()은 각 줄 앞의 공통 들여쓰기(공백)를 제거해줘요.'
          };
        },
        () => makeChoice(
          'raw 문자열(<code>"""..."""</code>)의 특징으로 알맞은 것은?',
          '이스케이프 문자 없이 줄바꿈과 특수문자를 그대로 표현할 수 있다', ['일반 문자열보다 실행 속도가 빠르다', '숫자만 담을 수 있다', '항상 한 줄로만 써야 한다'],
          '삼중 따옴표 문자열은 <code>\\n</code>, <code>\\d</code> 같은 이스케이프 없이도 줄바꿈과 특수문자를 그대로 담을 수 있어요.',
          '"가공하지 않은(raw)"이라는 이름 그대로예요.'
        ),
        () => makeChoice(
          '일반 문자열에서 정규식 패턴 <code>\\d+</code>를 표현하려면 어떻게 써야 할까요?',
          '<code>"\\\\d+"</code>(백슬래시를 이스케이프)', ['<code>"\\d+"</code>(그대로)', '<code>"\\\\\\\\d+"</code>', '<code>"d+"</code>'],
          '일반 문자열에서는 백슬래시 자체를 <code>\\\\</code>로 이스케이프해야 해요. raw 문자열이면 <code>\\d+</code>라고 그대로 쓸 수 있어요.',
          '백슬래시 하나를 표현하려면 일반 문자열에서는 백슬래시 두 개가 필요해요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"안녕"</code>과 <code>"세계"</code>를 두 줄로 담은 raw 문자열을 만들어 <code>trimIndent()</code>까지 적용하는 코드를 작성하세요. (예: <code>val text = """...""".trimIndent()</code>)',
          starter: '',
          placeholder: 'val text = """\n안녕\n세계\n""".trimIndent()',
          accept: ['val text = """\n안녕\n세계\n""".trimIndent()'],
          why: '<code>"""..."""</code> 안에 줄바꿈을 그대로 넣고 <code>trimIndent()</code>으로 들여쓰기를 정리해요.',
          hint: '"""로 시작해서 줄마다 내용을 적고 """.trimIndent()로 닫아보세요.'
        }),
      ],
      boss: () => {
        const word = pick(['숫자', '문자', '기호']);
        return {
          type: 'blank',
          q: `<code>val pattern = """\\d+"""; println(pattern.length)</code>를 실행하면 출력은? 숫자만 쓰세요. (${word}가 아니라 백슬래시, d, + 세 글자로 이루어진 문자열이에요)`,
          prefix: '', suffix: '', accept: ['3'], placeholder: '숫자',
          why: 'raw 문자열 안의 \\d+는 이스케이프 없이 백슬래시(\\), d, + 세 글자 그대로 담기므로 length는 3이에요.',
          hint: 'raw 문자열에서는 백슬래시가 이스케이프 문자가 아니라 문자 그 자체로 취급돼요.'
        };
      }
    },
    {
      id: 'customGetterSetter',
      title: '커스텀 getter와 setter',
      ready: true,
      summary: '프로퍼티에 접근하거나 값을 바꿀 때 실행되는 로직을 직접 정의하는 커스텀 getter/setter를 배워요.',
      goals: ['get()으로 커스텀 게터 만들기', 'set()으로 값 검증하기', 'field 키워드로 실제 저장 공간 접근'],
      blocks: [
        {
          h: '계산해서 돌려주는 게터: get()',
          html: `<p>프로퍼티 선언 뒤에 <code>get() = 계산식</code>을 붙이면, 그 프로퍼티에 접근할 때마다 계산식이 실행돼서 값을 만들어줘요. 실제 값을 저장하지 않고 그때그때 계산해요.</p>`,
          code: {
            label: 'custom_getter.kt',
            lang: 'kotlin',
            src: `class Rectangle(val width: Int, val height: Int) {
    val area: Int
        get() = width * height
}

val r = Rectangle(3, 4)
println(r.area)`,
            out: `12`
          }
        },
        {
          h: '값을 검증하며 저장하는 세터: set()',
          html: `<p><code>set(value) { ... }</code>은 프로퍼티에 값을 대입할 때마다 실행돼요. 그 안에서 <code>field</code>는 실제로 값을 저장하는 공간을 가리키는 특별한 키워드예요.</p>`,
          code: {
            label: 'custom_setter.kt',
            lang: 'kotlin',
            src: `class Player {
    var score: Int = 0
        set(value) {
            field = if (value < 0) 0 else value
        }
}

val p = Player()
p.score = -10
println(p.score)`,
            out: `0`
          },
          after: `<div class="note"><b>정리</b> — 세터 안에서 <code>field</code> 대신 <code>score = value</code>라고 쓰면, 그 세터를 자기 자신이 무한히 다시 호출해서 오류가 나요. 실제 저장 공간에 접근할 때는 꼭 <code>field</code>를 써야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const w = randInt(2, 10), h = randInt(2, 10);
          return {
            type: 'blank',
            q: `<code>class Rectangle(val width: Int, val height: Int) { val area: Int get() = width * height }</code>이고 <code>Rectangle(${w}, ${h}).area</code>일 때, 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(w * h)], placeholder: '숫자',
            why: `area는 접근할 때마다 width * height를 계산하므로, ${w} * ${h} = ${w * h}예요.`,
            hint: 'get()에 적힌 계산식이 area에 접근할 때마다 실행돼요.'
          };
        },
        () => makeChoice(
          '커스텀 getter/setter 안에서 <code>field</code> 키워드가 가리키는 것은?',
          '그 프로퍼티의 실제 값을 저장하는 공간', ['그 클래스의 모든 프로퍼티', '부모 클래스의 프로퍼티', '매개변수 값'],
          '<code>field</code>는 getter/setter 안에서만 쓸 수 있는, 프로퍼티의 실제 저장 공간을 가리키는 키워드예요.',
          '세터 안에서 field 없이 프로퍼티 이름 자체를 대입하면 무한 재호출이 일어나요.'
        ),
        () => {
          const value = pick([-20, -5, 5, 20]);
          const result = value < 0 ? 0 : value;
          return {
            type: 'blank',
            q: `<code>class Player { var score: Int = 0; set(value) { field = if (value < 0) 0 else value } }</code>이고 <code>val p = Player(); p.score = ${value}</code>일 때, <code>p.score</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
            why: value < 0
              ? `${value}는 음수이므로 setter에서 0으로 바뀌어 저장돼요.`
              : `${value}는 0 이상이므로 그대로 저장돼요.`,
            hint: '세터가 음수인지 확인해서, 음수면 0으로 바꿔 저장해요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>Circle(val radius: Double)</code> 클래스 안에, <code>3.14 * radius * radius</code>를 계산해서 돌려주는 커스텀 게터를 가진 프로퍼티 <code>area</code>를 작성하세요. (프로퍼티 선언 부분만)',
          starter: '',
          placeholder: 'val area: Double\n    get() = 3.14 * radius * radius',
          accept: ['val area: Double\n    get() = 3.14 * radius * radius', 'val area: Double get() = 3.14 * radius * radius'],
          why: '<code>get() = 계산식</code>을 프로퍼티 선언 뒤에 붙이면 접근할 때마다 그 계산식이 실행돼요.',
          hint: 'val area: Double 다음 줄에 get() = 3.14 * radius * radius를 붙여보세요.'
        }),
      ],
      boss: () => {
        const value = pick([-30, -1, 0, 15, 30]);
        const result = value < 0 ? 0 : value;
        return {
          type: 'blank',
          q: `<code>class Player { var score: Int = 0; set(value) { field = if (value < 0) 0 else value } }</code>이고 <code>val p = Player(); p.score = ${value}; p.score = p.score + 5</code>일 때, 최종 <code>p.score</code>는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(result + 5 < 0 ? 0 : result + 5)], placeholder: '숫자',
          why: `먼저 ${value}가 setter를 거쳐 ${result}로 저장되고, 거기에 5를 더한 ${result + 5}를 다시 대입하면 setter를 한 번 더 거쳐도 음수가 아니므로 그대로 ${result + 5}가 돼요.`,
          hint: '대입은 두 번 일어나고, 그때마다 setter의 검증 로직이 실행돼요.'
        };
      }
    },
    {
      id: 'multipleInterfaces',
      title: '인터페이스 다중 구현',
      ready: true,
      summary: '한 클래스가 여러 인터페이스를 동시에 구현하는 방법과, 이름이 겹칠 때 해결하는 방법을 배워요.',
      goals: ['여러 인터페이스 동시 구현', '인터페이스의 기본 구현', '이름이 겹칠 때 super<타입>으로 지정'],
      blocks: [
        {
          h: '한 클래스가 여러 인터페이스 구현하기',
          html: `<p>Kotlin 클래스는 콤마로 구분해서 여러 인터페이스를 동시에 구현할 수 있어요. 인터페이스도 함수에 기본 구현(본문)을 가질 수 있어요.</p>`,
          code: {
            label: 'multi_interface.kt',
            lang: 'kotlin',
            src: `interface Flyable {
    fun move() = println("날아서 이동")
}

interface Swimmable {
    fun move() = println("헤엄쳐서 이동")
}

class Duck : Flyable, Swimmable {
    override fun move() {
        super<Flyable>.move()
        super<Swimmable>.move()
    }
}

Duck().move()`,
            out: `날아서 이동\n헤엄쳐서 이동`
          },
          after: `<div class="note"><b>정리</b> — 두 인터페이스에 이름이 같은 함수가 있으면, 컴파일러가 어느 쪽을 써야 할지 알 수 없어서 반드시 <code>override</code>로 직접 정의해야 해요. 그 안에서 <code>super&lt;타입&gt;.함수()</code>로 원하는 인터페이스의 구현을 골라 부를 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const isFlyable = Math.random() < 0.5;
          return {
            type: 'blank',
            q: `<code>interface ${isFlyable ? 'Flyable { fun move() = println("날아서 이동") }' : 'Swimmable { fun move() = println("헤엄쳐서 이동") }'}</code>이고 <code>class Bird : ${isFlyable ? 'Flyable' : 'Swimmable'}</code>일 때, <code>Bird().move()</code>의 출력은? (그대로 입력)`,
            prefix: '', suffix: '', accept: [isFlyable ? '날아서 이동' : '헤엄쳐서 이동'], placeholder: '출력 결과',
            why: `인터페이스 하나만 구현했으니, 겹치는 이름이 없어서 그 인터페이스의 기본 구현이 그대로 쓰여요.`,
            hint: '겹치는 함수 이름이 없으면, 인터페이스의 기본 구현을 그대로 상속받아 써요.'
          };
        },
        () => makeChoice(
          '두 인터페이스에 이름이 같은 함수가 있을 때, 그 함수를 구현하는 클래스가 반드시 해야 하는 것은?',
          '<code>override</code>로 직접 함수를 정의해서 어떤 구현을 쓸지 명시해야 한다', ['둘 중 먼저 나온 인터페이스의 구현이 자동으로 쓰인다', '컴파일 시 하나가 무작위로 선택된다', '두 함수 모두 무시된다'],
          '이름이 겹치면 컴파일러가 어느 쪽 구현을 써야 할지 정할 수 없어서, 반드시 override로 직접 정의해줘야 해요.',
          '애매한 경우는 컴파일러가 알아서 정하지 않고, 항상 개발자에게 명확히 정하라고 요구해요.'
        ),
        () => makeChoice(
          '<code>super<Flyable>.move()</code>처럼 <code>super&lt;타입&gt;</code>을 쓰는 이유는?',
          '여러 인터페이스 중 어느 인터페이스의 기본 구현을 호출할지 지정하기 위해', ['그 타입으로 형변환하기 위해', '새 인스턴스를 만들기 위해', '함수를 private으로 만들기 위해'],
          '<code>super&lt;Flyable&gt;.move()</code>는 "Flyable 인터페이스의 move 구현을 호출해라"라는 뜻이에요.',
          '이름이 겹치는 여러 부모(인터페이스) 중 하나를 콕 집어 가리켜요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Flyable</code>과 <code>Swimmable</code>을 모두 구현하는 <code>Duck</code> 클래스를 선언하는 코드를 작성하세요. (클래스 선언부만, 본문은 비워둬도 됩니다)',
          starter: '',
          placeholder: 'class Duck : Flyable, Swimmable',
          accept: ['class Duck : Flyable, Swimmable'],
          why: '<code>class 이름 : 인터페이스1, 인터페이스2</code> 형태로 콤마를 이용해 여러 인터페이스를 동시에 구현해요.',
          hint: 'class Duck : Flyable, Swimmable 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        return {
          type: 'blank',
          q: `<code>interface Flyable { fun move() = println("날아서 이동") }</code>, <code>interface Swimmable { fun move() = println("헤엄쳐서 이동") }</code>, <code>class Duck : Flyable, Swimmable { override fun move() { super<Flyable>.move(); super<Swimmable>.move() } }</code>일 때, <code>Duck().move()</code>의 출력은 총 몇 줄일까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: ['2'], placeholder: '숫자',
          why: 'override한 move() 안에서 super<Flyable>.move()와 super<Swimmable>.move()를 둘 다 호출하므로, 총 2줄이 출력돼요.',
          hint: 'override된 함수 본문 안에 println을 부르는 호출이 몇 번 있는지 세어보세요.'
        };
      }
    },
    {
      id: 'lateinit',
      title: 'lateinit',
      ready: true,
      summary: '처음에는 값이 없다가, 나중에 반드시 초기화될 프로퍼티에 쓰는 lateinit을 배워요.',
      goals: ['lateinit var 선언', '초기화 전 접근 시 오류', '언제 lateinit을 쓰는지'],
      blocks: [
        {
          h: '나중에 초기화하기로 약속하기: lateinit',
          html: `<p><code>lateinit var</code>는 "지금 당장은 값이 없지만, 쓰기 전에 반드시 초기화될 것"이라고 약속하는 프로퍼티예요. null을 넣지 않고도 "아직 값이 없음"을 표현할 수 있어요.</p>`,
          code: {
            label: 'lateinit.kt',
            lang: 'kotlin',
            src: `class UserSession {
    lateinit var username: String

    fun login(name: String) {
        username = name
    }
}

val session = UserSession()
session.login("지수")
println(session.username)`,
            out: `지수`
          }
        },
        {
          h: '약속을 어기면: 초기화 전 접근 오류',
          html: `<p>만약 초기화하기 전에 <code>lateinit</code> 프로퍼티에 접근하면, <code>UninitializedPropertyAccessException</code>이라는 오류가 발생해요.</p>`,
          code: {
            label: 'lateinit_error.kt',
            lang: 'kotlin',
            src: `class UserSession {
    lateinit var username: String
}

val session = UserSession()
println(session.username) // 오류! UninitializedPropertyAccessException`
          },
          after: `<div class="note"><b>정리</b> — <code>lateinit</code>은 <code>var</code>에만 쓸 수 있고, <code>Int</code> 같은 기본 타입이 아닌 참조 타입(String, 클래스 등)에만 쓸 수 있어요. null이 될 수 있는 타입(<code>String?</code>)에는 애초에 필요 없어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const didLogin = Math.random() < 0.5;
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>class UserSession { lateinit var username: String; fun login(name: String) { username = name } }</code>이고 <code>val session = UserSession()</code>${didLogin ? `; session.login("${name}")` : ''}일 때, <code>println(session.username)</code>을 실행하면? (login을 안 했다면 '오류', 했다면 그 값)`,
            prefix: '', suffix: '', accept: didLogin ? [name] : ['오류'], placeholder: '값 또는 오류',
            why: didLogin
              ? `login("${name}")으로 이미 초기화했으므로, username은 "${name}"이 출력돼요.`
              : 'login을 호출하지 않아 username이 초기화되지 않았으므로, 접근하면 오류(UninitializedPropertyAccessException)가 발생해요.',
            hint: 'lateinit 프로퍼티는 초기화하기 전에 접근하면 오류가 나요.'
          };
        },
        () => makeChoice(
          '<code>lateinit</code>을 쓸 수 없는 경우로 알맞은 것은?',
          '<code>val</code>로 선언된 프로퍼티', ['클래스 안의 프로퍼티', '문자열(String) 타입의 프로퍼티', '나중에 값이 바뀔 수 있는 프로퍼티'],
          '<code>lateinit</code>은 나중에 값을 대입해야 하므로, 값을 한 번 정하면 못 바꾸는 <code>val</code>에는 쓸 수 없고 <code>var</code>에만 써요.',
          '"나중에 초기화한다"는 건 "다시 대입할 수 있다"는 뜻이기도 해요.'
        ),
        () => ({
          type: 'blank',
          q: '초기화되지 않은 <code>lateinit</code> 프로퍼티에 접근했을 때 발생하는 예외의 이름은? (영어 그대로 입력)',
          prefix: '', suffix: '', accept: ['UninitializedPropertyAccessException'], placeholder: '예외 이름',
          why: '초기화 전에 lateinit 프로퍼티에 접근하면 UninitializedPropertyAccessException이 발생해요.',
          hint: '"초기화되지 않은(uninitialized) 프로퍼티 접근"이라는 뜻의 긴 이름이에요.'
        }),
        () => ({
          type: 'code',
          q: '<code>String</code> 타입의 프로퍼티 <code>token</code>을, 나중에 초기화하기로 약속하는 <code>lateinit var</code>로 선언하세요.',
          starter: '',
          placeholder: 'lateinit var token: String',
          accept: ['lateinit var token: String'],
          why: '<code>lateinit var 이름: 타입</code> 형태로, 나중에 초기화될 프로퍼티를 선언해요.',
          hint: 'lateinit var token: String 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const didInit = Math.random() < 0.5;
        const value = pick(['abc123', 'xyz789', 'token987']);
        return {
          type: 'blank',
          q: `<code>class Config { lateinit var apiKey: String }</code>이고 <code>val config = Config()</code>${didInit ? `; config.apiKey = "${value}"` : ''}일 때, <code>println(config.apiKey)</code>를 실행하면? (초기화 안 했으면 '오류', 했으면 그 값을 입력)`,
          prefix: '', suffix: '', accept: didInit ? [value] : ['오류'], placeholder: '값 또는 오류',
          why: didInit
            ? `apiKey에 이미 "${value}"를 대입했으므로 그 값이 그대로 출력돼요.`
            : 'apiKey를 한 번도 초기화하지 않았으므로, 접근하는 순간 오류가 발생해요.',
          hint: 'lateinit 프로퍼티는 값을 대입하기 전까지는 "비어있는" 상태와 비슷해요.'
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
