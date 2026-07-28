/* Kotlin 강의·문제 데이터 — 단원을 추가하려면 units 배열에 항목을 넣으면 됩니다. */
COURSES.kotlin = {
    name: 'Kotlin',
    tagline: '안드로이드 공식 언어. 간결한 문법과 null 안전성이 강점인 언어',
    units: [{
      id: 'intro',
      title: '코틀린은 어떤 언어인가요?',
      ready: true,
      intro: true,
      summary: '코틀린이 무엇이고, 어디에 쓰이고, 왜 배우면 좋은지 알아봐요.',
      blocks: [
        {
          h: '코틀린은 어떤 언어인가요?',
          html: `<p>코틀린은 2011년 젯브레인즈가 만든 언어예요. 기존 자바와 100% 호환되면서도, 훨씬 더 간결하고 안전한 문법을 목표로 설계됐어요.</p>`
        },
        {
          h: '어디에 쓰이나요?',
          html: `<p>구글이 안드로이드 공식 언어로 채택하면서 크게 성장했고, 지금은 안드로이드 앱 개발의 사실상 표준 언어가 됐어요.</p>`
        },
        {
          h: '왜 배우면 좋을까요?',
          html: `<p>자바보다 훨씬 적은 코드로 같은 일을 할 수 있어요. null 안전성 같은 현대적인 기능이 언어 자체에 내장되어 있어서, 자바에서 자주 나던 실수(null 참조 오류)를 처음부터 줄여줘요.</p>`,
          after: `<div class="note"><b>팁</b> — 이 단원은 읽기만 하면 되고, 문제나 예제는 없어요. 다음 단원부터 진짜 코드를 써보기 시작해요!</div>`
        }
      ]
    },
    {
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
    },
    {
      id: 'enumClass',
      title: '열거형 클래스(enum class)',
      ready: true,
      summary: '정해진 값들 중 하나만 가질 수 있는 enum class로, 상태나 종류를 안전하게 표현하는 법을 배워요.',
      goals: ['enum class로 정해진 값 표현하기', 'when과 함께 안전하게 분기하기', '프로퍼티와 메서드를 가진 enum'],
      blocks: [
        {
          h: '정해진 값들 중 하나: enum class',
          html: `<p><code>enum class</code>는 미리 정해둔 몇 가지 값(상수) 중 하나만 가질 수 있는 타입이에요. 요일, 방향, 상태처럼 "정해진 몇 가지 경우"를 표현할 때 딱 맞아요.</p>`,
          code: {
            label: 'enum_basic.kt',
            lang: 'kotlin',
            src: `enum class Direction {
    NORTH, SOUTH, EAST, WEST
}

val dir = Direction.NORTH
println(dir)`,
            out: `NORTH`
          }
        },
        {
          h: 'when과 함께 안전하게 분기하기',
          html: `<p>enum class를 <code>when</code>으로 분기할 때, 모든 경우를 다 처리하면 <code>else</code> 없이도 컴파일러가 통과시켜줘요. 나중에 enum 값이 추가되면 컴파일러가 빠진 경우를 알려줘요.</p>`,
          code: {
            label: 'enum_when.kt',
            lang: 'kotlin',
            src: `fun describe(dir: Direction): String = when (dir) {
    Direction.NORTH -> "북쪽"
    Direction.SOUTH -> "남쪽"
    Direction.EAST -> "동쪽"
    Direction.WEST -> "서쪽"
}

println(describe(Direction.EAST))`,
            out: `동쪽`
          }
        },
        {
          h: '프로퍼티와 메서드를 가진 enum',
          html: `<p>enum class도 일반 클래스처럼 생성자로 프로퍼티를 받거나, 메서드를 가질 수 있어요.</p>`,
          code: {
            label: 'enum_property.kt',
            lang: 'kotlin',
            src: `enum class Grade(val minScore: Int) {
    A(90), B(80), C(70)
}

println(Grade.B.minScore)`,
            out: `80`
          }
        }
      ],
      quizGenerators: [
        () => {
          const dirs = [{ v: 'NORTH', ko: '북쪽' }, { v: 'SOUTH', ko: '남쪽' }, { v: 'EAST', ko: '동쪽' }, { v: 'WEST', ko: '서쪽' }];
          const dir = pick(dirs);
          return {
            type: 'blank',
            q: `describe 함수는 각 Direction 값을 한글로 바꿔줘요. <code>describe(Direction.${dir.v})</code>의 결과는? (그대로 입력)`,
            prefix: '', suffix: '', accept: [dir.ko], placeholder: '값',
            why: `Direction.${dir.v}는 "${dir.ko}"에 대응돼요.`,
            hint: 'when으로 각 enum 값마다 대응하는 한글을 반환해요.'
          };
        },
        () => makeChoice(
          'enum class가 유용한 경우는?',
          '요일, 방향처럼 정해진 몇 가지 값 중 하나만 가져야 할 때', ['아무 값이나 자유롭게 담아야 할 때', '값이 계속 바뀌어야 할 때', '숫자 계산을 빠르게 해야 할 때'],
          'enum class는 "정해진 값들의 집합"을 안전하게 표현할 때 써요.',
          '방향이나 요일처럼 "경우의 수"가 정해져 있는 상황을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `정해진 값들 중 하나만 가질 수 있는 타입을 선언하는 키워드 두 개를 순서대로 쓰세요.`,
          prefix: '', suffix: ' Direction { NORTH, SOUTH, EAST, WEST }', accept: ['enum class'], placeholder: '키워드',
          why: '<code>enum class</code>로 정해진 값들의 집합을 선언해요.',
          hint: '"열거하다"라는 뜻의 enum과 class를 같이 써요.'
        }),
        () => makeChoice(
          '<code>enum class Grade(val minScore: Int) { A(90), B(80), C(70) }</code>에서, <code>Grade.A.minScore</code>의 값은?',
          '90', ['80', '70', '0'],
          'A(90)이므로 minScore는 90이에요.',
          '괄호 안의 숫자가 그 enum 값의 프로퍼티 값이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>PENDING</code>, <code>DONE</code>, <code>CANCELED</code> 세 가지 값을 가지는 <code>Status</code> enum class를 작성하세요.',
          starter: '',
          placeholder: 'enum class Status { PENDING, DONE, CANCELED }',
          accept: ['enum class Status { PENDING, DONE, CANCELED }'],
          why: 'enum class 이름 { 값1, 값2, 값3 } 형태로 정해진 값들을 선언해요.',
          hint: 'enum class Status { PENDING, DONE, CANCELED }를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const grades = [{ v: 'A', s: 90 }, { v: 'B', s: 80 }, { v: 'C', s: 70 }];
        const g = pick(grades);
        return {
          type: 'blank',
          q: `<code>enum class Grade(val minScore: Int) { A(90), B(80), C(70) }</code>일 때, <code>Grade.${g.v}.minScore</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(g.s)], placeholder: '숫자',
          why: `Grade.${g.v}의 minScore는 ${g.s}예요.`,
          hint: '괄호 안에 적힌 숫자가 각 enum 값의 minScore예요.'
        };
      }
    },
    {
      id: 'destructuringDeclarations',
      title: '구조 분해 선언',
      ready: true,
      summary: 'data class나 Map, 리스트의 값을 한 번에 여러 변수로 뽑아내는 구조 분해 선언을 배워요.',
      goals: ['data class를 val (a, b) = obj로 분해하기', 'withIndex()로 인덱스와 값 함께 분해하기', 'Map을 반복문에서 분해하기'],
      blocks: [
        {
          h: 'data class를 여러 변수로 한 번에 뽑기',
          html: `<p>data class는 자동으로 <code>component1()</code>, <code>component2()</code> 같은 함수를 가지고 있어서, <code>val (a, b) = obj</code> 형태로 프로퍼티들을 한 번에 여러 변수로 뽑아낼 수 있어요.</p>`,
          code: {
            label: 'destructure_basic.kt',
            lang: 'kotlin',
            src: `data class Point(val x: Int, val y: Int)

val p = Point(3, 4)
val (x, y) = p
println("$x, $y")`,
            out: `3, 4`
          }
        },
        {
          h: '인덱스와 값을 함께: withIndex()',
          html: `<p><code>list.withIndex()</code>는 각 값에 인덱스를 붙여주고, <code>for ((index, value) in ...)</code>로 인덱스와 값을 한 번에 구조 분해해서 쓸 수 있어요.</p>`,
          code: {
            label: 'destructure_withindex.kt',
            lang: 'kotlin',
            src: `val fruits = listOf("사과", "바나나", "귤")
for ((index, value) in fruits.withIndex()) {
    println("$index: $value")
}`,
            out: `0: 사과\n1: 바나나\n2: 귤`
          }
        },
        {
          h: 'Map도 반복문에서 바로 분해할 수 있어요',
          html: `<p>Map을 반복할 때 <code>for ((key, value) in map)</code>으로 키와 값을 바로 구조 분해해서 쓸 수 있어요.</p>`,
          code: {
            label: 'destructure_map.kt',
            lang: 'kotlin',
            src: `val scores = mapOf("지수" to 90, "민준" to 85)
for ((name, score) in scores) {
    println("$name: $score")
}`,
            out: `지수: 90\n민준: 85`
          }
        }
      ],
      quizGenerators: [
        () => {
          const x = randInt(1, 20), y = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>data class Point(val x: Int, val y: Int); val p = Point(${x}, ${y}); val (a, b) = p</code>일 때, <code>a + b</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(x + y)], placeholder: '숫자',
            why: `구조 분해로 a에는 x(${x}), b에는 y(${y})가 들어가서, a + b는 ${x + y}예요.`,
            hint: '구조 분해는 순서대로 프로퍼티를 각 변수에 담아줘요.'
          };
        },
        () => makeChoice(
          'data class가 자동으로 구조 분해를 지원하는 이유는?',
          'component1(), component2() 같은 함수를 컴파일러가 자동으로 만들어줘서', ['data class는 배열이라서', '구조 분해는 모든 클래스가 기본으로 지원해서', 'val로 선언했기 때문에'],
          'data class는 프로퍼티 순서대로 component1(), component2(), ... 함수를 자동으로 생성해줘서 구조 분해가 가능해요.',
          '괄호 안 변수들은 실제로 componentN() 함수 호출로 채워져요.'
        ),
        () => ({
          type: 'blank',
          q: `리스트의 각 값에 인덱스를 붙여서 (index, value) 쌍으로 반복하고 싶을 때 쓰는 함수를 쓰세요.`,
          prefix: 'for ((index, value) in fruits.', suffix: '()) { ... }', accept: ['withIndex'], placeholder: '함수 이름',
          why: '<code>withIndex()</code>는 각 요소에 인덱스를 붙여서, 구조 분해로 함께 꺼낼 수 있게 해줘요.',
          hint: '"인덱스와 함께(with index)"라는 뜻 그대로예요.'
        }),
        () => makeChoice(
          '<code>for ((name, score) in scores)</code>에서 scores가 Map&lt;String, Int&gt;일 때, name과 score는 각각 무엇에 대응될까요?',
          'name은 키(key), score는 값(value)', ['name은 값, score는 키', '둘 다 키', '둘 다 값'],
          'Map을 구조 분해할 때는 (key, value) 순서로 분해돼요.',
          'Map의 각 항목은 키와 값 한 쌍으로 이루어져 있어요.'
        ),
        () => ({
          type: 'code',
          q: '<code>data class Point(val x: Int, val y: Int)</code>의 인스턴스 <code>p = Point(1, 2)</code>를 구조 분해해서 <code>x</code>, <code>y</code> 두 변수에 담는 코드를 작성하세요.',
          starter: '',
          placeholder: 'val (x, y) = p',
          accept: ['val (x, y) = p'],
          why: 'val (변수1, 변수2) = 객체 형태로 구조 분해 선언을 해요.',
          hint: 'val (x, y) = p를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const fruits = shuffle(['사과', '바나나', '귤', '포도']).slice(0, randInt(2, 4));
        const idx = randInt(0, fruits.length - 1);
        const listText = fruits.map(f => `"${f}"`).join(', ');
        return {
          type: 'blank',
          q: `<code>val fruits = listOf(${listText}); for ((index, value) in fruits.withIndex()) { println("$index: $value") }</code>를 실행했을 때, "${idx}: "로 시작하는 줄에 출력되는 값은? (그대로 입력)`,
          prefix: '', suffix: '', accept: [fruits[idx]], placeholder: '값',
          why: `인덱스 ${idx}에 해당하는 값은 "${fruits[idx]}"예요.`,
          hint: 'withIndex()는 0번부터 순서대로 인덱스를 붙여줘요.'
        };
      }
    },
    {
      id: 'typealiasKotlin',
      title: '타입 별칭(typealias)',
      ready: true,
      summary: '복잡하거나 긴 타입에 짧고 의미있는 이름을 붙여주는 typealias를 배워요.',
      goals: ['typealias로 타입에 별명 붙이기', '함수 타입에 typealias 쓰기', '코드 가독성이 좋아지는 이유'],
      blocks: [
        {
          h: '긴 타입에 짧은 이름 붙이기: typealias',
          html: `<p><code>typealias 별명 = 원래타입</code>으로, 자주 쓰는 타입에 더 읽기 쉬운 이름을 붙일 수 있어요. 실제로는 완전히 같은 타입이에요.</p>`,
          code: {
            label: 'typealias_basic.kt',
            lang: 'kotlin',
            src: `typealias Score = Int

val myScore: Score = 90
println(myScore)`,
            out: `90`
          }
        },
        {
          h: '복잡한 함수 타입에 특히 유용해요',
          html: `<p>함수를 매개변수로 받는 함수 타입(<code>(Int, Int) -> Int</code>)처럼 복잡한 타입에 typealias를 붙이면 코드가 훨씬 읽기 쉬워져요.</p>`,
          code: {
            label: 'typealias_function.kt',
            lang: 'kotlin',
            src: `typealias Calculator = (Int, Int) -> Int

val add: Calculator = { a, b -> a + b }
println(add(3, 4))`,
            out: `7`
          },
          after: `<div class="note"><b>참고</b> — typealias는 새로운 타입을 만드는 게 아니라, 기존 타입에 이름만 하나 더 붙여주는 거예요. Score와 Int는 완전히 같은 타입으로 취급돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const val_ = randInt(1, 100);
          return {
            type: 'blank',
            q: `<code>typealias Score = Int; val myScore: Score = ${val_}</code>일 때, <code>myScore</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(val_)], placeholder: '숫자',
            why: `Score는 Int의 별명일 뿐이라, myScore는 그대로 ${val_}이에요.`,
            hint: 'typealias는 실제 값에 영향을 주지 않고, 이름만 하나 더 붙여줘요.'
          };
        },
        () => makeChoice(
          'typealias를 쓰는 이유로 알맞은 것은?',
          '복잡하거나 긴 타입에 읽기 쉬운 이름을 붙여서 코드 가독성을 높이려고', ['새로운 타입을 만들어 기존 타입과 다르게 동작하게 하려고', '실행 속도를 높이려고', '타입 검사를 아예 건너뛰려고'],
          'typealias는 실제로는 같은 타입에 읽기 쉬운 이름을 하나 더 붙여주는 것뿐이에요.',
          '"별명"이라는 이름처럼, 원래 타입은 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `타입에 별명을 붙일 때 맨 앞에 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: ' Score = Int', accept: ['typealias'], placeholder: '키워드',
          why: '<code>typealias 별명 = 원래타입</code>으로 타입 별칭을 만들어요.',
          hint: '"타입"과 "별명(alias)"을 합친 단어예요.'
        }),
        () => makeChoice(
          '<code>typealias Calculator = (Int, Int) -> Int</code>일 때, Calculator 타입에 대한 설명으로 옳은 것은?',
          '(Int, Int) -> Int와 완전히 같은 함수 타입이다', ['Calculator라는 새로운 클래스가 만들어진다', 'Int 두 개를 담는 배열 타입이다', '함수를 실행할 수 없는 타입이다'],
          'typealias는 이름만 다를 뿐, (Int, Int) -> Int와 완전히 같은 타입이에요.',
          '별명일 뿐 실제 타입은 바뀌지 않는다는 점을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Map&lt;String, Int&gt;</code>에 <code>ScoreBoard</code>라는 typealias를 붙이는 코드를 작성하세요.',
          starter: '',
          placeholder: 'typealias ScoreBoard = Map<String, Int>',
          accept: ['typealias ScoreBoard = Map<String, Int>'],
          why: 'typealias 별명 = 원래타입 형태로 Map<String, Int>에 이름을 붙여요.',
          hint: 'typealias ScoreBoard = Map<String, Int>를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 20), b = randInt(1, 20);
        const isAdd = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `<code>typealias Calculator = (Int, Int) -> Int; val op: Calculator = { a, b -> a ${isAdd ? '+' : '*'} b }</code>일 때, <code>op(${a}, ${b})</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(isAdd ? a + b : a * b)], placeholder: '숫자',
          why: isAdd ? `a + b이므로 ${a} + ${b} = ${a + b}예요.` : `a * b이므로 ${a} * ${b} = ${a * b}예요.`,
          hint: 'Calculator 타입은 그냥 (Int, Int) -> Int 함수 타입과 완전히 같아요.'
        };
      }
    },
    {
      id: 'varargsSpread',
      title: '가변 인자(vararg)와 스프레드 연산자',
      ready: true,
      summary: '개수가 정해지지 않은 인자를 받는 vararg와, 배열을 인자들로 펼쳐 넘기는 스프레드 연산자(*)를 배워요.',
      goals: ['vararg로 개수 제한 없이 인자 받기', '스프레드 연산자(*)로 배열 펼쳐 넘기기', '가변 인자는 함수 안에서 배열처럼 쓰인다는 것'],
      blocks: [
        {
          h: '개수 제한 없이 인자 받기: vararg',
          html: `<p>매개변수 앞에 <code>vararg</code>를 붙이면, 그 자리에 원하는 개수만큼 값을 콤마로 나열해서 넘길 수 있어요. 함수 안에서는 그 값들이 배열처럼 다뤄져요.</p>`,
          code: {
            label: 'vararg_basic.kt',
            lang: 'kotlin',
            src: `fun sumAll(vararg numbers: Int): Int {
    var total = 0
    for (n in numbers) {
        total += n
    }
    return total
}

println(sumAll(1, 2, 3, 4))`,
            out: `10`
          }
        },
        {
          h: '배열을 펼쳐서 넘기기: 스프레드 연산자(*)',
          html: `<p>이미 배열로 값을 가지고 있다면, 배열 앞에 <code>*</code>를 붙여서 그 배열의 각 값을 개별 인자로 "펼쳐서" 넘길 수 있어요.</p>`,
          code: {
            label: 'spread_operator.kt',
            lang: 'kotlin',
            src: `val nums = intArrayOf(5, 10, 15)
println(sumAll(*nums))`,
            out: `30`
          },
          after: `<div class="note"><b>주의</b> — *를 안 붙이고 그냥 sumAll(nums)라고 쓰면, 배열 하나를 통째로 넘기려는 것으로 오해되어 컴파일 오류가 나요. 꼭 *로 펼쳐줘야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const nums = Array.from({ length: randInt(2, 5) }, () => randInt(1, 20));
          return {
            type: 'blank',
            q: `<code>fun sumAll(vararg numbers: Int): Int { var total = 0; for (n in numbers) { total += n }; return total }</code>일 때, <code>sumAll(${nums.join(', ')})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(nums.reduce((a, b) => a + b, 0))], placeholder: '숫자',
            why: `넘긴 모든 값을 더해서 ${nums.reduce((a, b) => a + b, 0)}이 나와요.`,
            hint: 'vararg로 받은 값들은 배열처럼 순서대로 순회할 수 있어요.'
          };
        },
        () => makeChoice(
          'vararg 매개변수를 함수 안에서 다룰 때 가장 알맞은 표현은?',
          '배열처럼 for문으로 순회하거나 인덱스로 접근할 수 있다', ['하나의 값으로만 취급된다', '호출할 때마다 무조건 0개여야 한다', 'vararg는 문자열만 받을 수 있다'],
          'vararg로 받은 값들은 함수 안에서 배열처럼 다뤄져요.',
          'for (n in numbers)처럼 배열을 순회하듯 쓸 수 있어요.'
        ),
        () => ({
          type: 'blank',
          q: `이미 있는 배열 nums를 vararg 함수에 개별 인자들로 펼쳐서 넘길 때, 배열 이름 앞에 붙이는 기호를 쓰세요.`,
          prefix: 'sumAll(', suffix: 'nums)', accept: ['*'], placeholder: '기호',
          why: '<code>*배열</code>은 그 배열의 값들을 각각의 인자로 펼쳐서 넘겨줘요.',
          hint: '"스프레드(펼치다)"를 나타내는 별표 기호예요.'
        }),
        () => makeChoice(
          '<code>sumAll(nums)</code>처럼 *를 붙이지 않고 배열을 그냥 넘기면?',
          '배열 하나를 통째로 넘기려는 것으로 취급되어 컴파일 오류가 난다', ['자동으로 펼쳐져서 정상 동작한다', '첫 번째 값만 넘겨진다', '런타임에만 오류가 난다'],
          'vararg 매개변수에 배열을 그냥 넘기면 타입이 안 맞아서 컴파일 오류가 나요. *로 펼쳐줘야 해요.',
          '*가 없으면 "배열 하나"와 "여러 개의 값들"을 구분할 수 없어요.'
        ),
        () => ({
          type: 'code',
          q: '여러 개의 문자열을 받아 콤마로 이어붙여 반환하는 함수 <code>joinAll(vararg words: String): String</code>을 작성하세요. (힌트: <code>words.joinToString(", ")</code> 활용)',
          starter: '',
          placeholder: 'fun joinAll(vararg words: String): String { return words.joinToString(", ") }',
          accept: ['fun joinAll(vararg words: String): String { return words.joinToString(", ") }'],
          why: 'vararg로 여러 문자열을 받아, joinToString으로 콤마로 이어붙여 반환해요.',
          hint: 'fun joinAll(vararg words: String): String { return words.joinToString(", ") }를 쓰세요.'
        }),
      ],
      boss: () => {
        const nums = Array.from({ length: randInt(2, 4) }, () => randInt(1, 15));
        return {
          type: 'blank',
          q: `<code>val nums = intArrayOf(${nums.join(', ')}); println(sumAll(*nums))</code>를 실행하면 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(nums.reduce((a, b) => a + b, 0))], placeholder: '숫자',
          why: `*nums는 배열의 값들을 펼쳐서 넘기고, sumAll은 그 합인 ${nums.reduce((a, b) => a + b, 0)}을 반환해요.`,
          hint: '*로 배열을 펼쳐 넘기면 sumAll(1, 2, 3, ...)처럼 개별 인자를 넘긴 것과 같아요.'
        };
      }
    },
    {
      id: 'sequencesLazy',
      title: '시퀀스(Sequence)와 지연 연산',
      ready: true,
      summary: '리스트 연산을 값이 필요할 때까지 미루는 시퀀스(Sequence)로, 큰 데이터를 더 효율적으로 처리하는 법을 배워요.',
      goals: ['asSequence()로 시퀀스 만들기', '지연 연산(lazy evaluation)의 의미', '시퀀스가 유용한 상황'],
      blocks: [
        {
          h: '리스트는 즉시, 시퀀스는 나중에',
          html: `<p>일반 리스트에 <code>map</code>, <code>filter</code>를 연달아 쓰면 각 단계마다 <b>새 리스트를 통째로 만들어요</b>. <code>asSequence()</code>로 시퀀스를 만들면, 각 단계가 값 하나하나에 대해 필요할 때만(지연) 실행돼요.</p>`,
          code: {
            label: 'sequence_basic.kt',
            lang: 'kotlin',
            src: `val result = listOf(1, 2, 3, 4, 5)
    .asSequence()
    .map { it * 2 }
    .filter { it > 4 }
    .toList()

println(result)`,
            out: `[6, 8, 10]`
          }
        },
        {
          h: '왜 지연 연산이 효율적일까요',
          html: `<p>리스트로 연산하면 map 결과 리스트 전체, filter 결과 리스트 전체가 각각 메모리에 만들어져요. 시퀀스는 값 하나가 map → filter를 거쳐 바로 다음 단계로 넘어가서, <b>중간 리스트를 만들지 않아요</b>. 데이터가 아주 많을 때 특히 유리해요.</p>`,
          after: `<div class="note"><b>정리</b> — toList()나 first() 같은 "결과를 실제로 꺼내는" 연산을 호출해야 그제서야 시퀀스의 계산이 실제로 진행돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const nums = Array.from({ length: 5 }, () => randInt(1, 10));
          const threshold = randInt(4, 12);
          const result = nums.map(n => n * 2).filter(n => n > threshold);
          return {
            type: 'blank',
            q: `<code>listOf(${nums.join(', ')}).asSequence().map { it * 2 }.filter { it > ${threshold} }.toList()</code>의 결과는? (배열 형태로, 예: [1, 2])`,
            prefix: '', suffix: '', accept: [`[${result.join(', ')}]`], placeholder: '[값, 값]',
            why: `각 값을 2배로 만든 뒤 ${threshold}보다 큰 값만 남기면 [${result.join(', ')}]예요.`,
            hint: '먼저 모든 값을 2배로 만든 목록을 떠올린 뒤, 그중 조건을 만족하는 것만 골라보세요.'
          };
        },
        () => makeChoice(
          '리스트와 시퀀스의 차이로 알맞은 것은?',
          '리스트는 각 연산마다 즉시 새 리스트를 만들고, 시퀀스는 값이 필요할 때까지 연산을 미룬다', ['시퀀스는 항상 리스트보다 느리다', '리스트는 map을 쓸 수 없다', '시퀀스는 filter를 지원하지 않는다'],
          '시퀀스는 map, filter 같은 연산을 값 하나하나에 대해 지연시켜 처리해서, 중간 리스트를 만들지 않아요.',
          '"즉시"와 "지연"의 차이를 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `리스트를 지연 연산되는 시퀀스로 바꿀 때 쓰는 함수를 쓰세요.`,
          prefix: 'listOf(1, 2, 3).', suffix: '().map { it * 2 }', accept: ['asSequence'], placeholder: '함수 이름',
          why: '<code>asSequence()</code>는 리스트를 시퀀스로 바꿔서 연산을 지연시켜요.',
          hint: '"~로서의 시퀀스"라는 뜻 그대로예요.'
        }),
        () => makeChoice(
          '시퀀스가 특히 유리한 상황은?',
          '데이터 양이 아주 많아서, 중간 리스트를 만드는 비용을 줄이고 싶을 때', ['데이터가 3개 이하로 아주 적을 때', '문자열을 다룰 때만', '정렬이 필요 없을 때만'],
          '데이터가 많을수록 중간 리스트를 만들지 않는 시퀀스의 이점이 커져요.',
          '"중간 리스트를 안 만든다"는 이점이 언제 가장 크게 느껴질지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>listOf(1, 2, 3, 4, 5)</code>를 시퀀스로 바꾼 뒤, 각 값을 제곱하고 10보다 큰 값만 남겨서 리스트로 만드는 코드를 작성하세요. (결과를 <code>result</code>에 담으세요)',
          starter: '',
          rows: 4,
          placeholder: 'val result = listOf(1, 2, 3, 4, 5)\n    .asSequence()\n    .map { it * it }\n    .filter { it > 10 }\n    .toList()',
          accept: ['val result = listOf(1, 2, 3, 4, 5)\n    .asSequence()\n    .map { it * it }\n    .filter { it > 10 }\n    .toList()'],
          why: 'asSequence()로 시퀀스로 바꾼 뒤 map, filter, toList()를 이어 붙여요.',
          hint: 'asSequence() 뒤에 map { it * it }, filter { it > 10 }, toList()를 순서대로 붙이세요.'
        }),
      ],
      boss: () => {
        const nums = Array.from({ length: 5 }, () => randInt(1, 8));
        const result = nums.map(n => n * n).filter(n => n > 10);
        return {
          type: 'blank',
          q: `<code>listOf(${nums.join(', ')}).asSequence().map { it * it }.filter { it > 10 }.toList()</code>의 결과는? (배열 형태로, 예: [1, 2])`,
          prefix: '', suffix: '', accept: [`[${result.join(', ')}]`], placeholder: '[값, 값]',
          why: `각 값을 제곱한 뒤 10보다 큰 값만 남기면 [${result.join(', ')}]예요.`,
          hint: '먼저 제곱한 값들을 떠올린 뒤, 10보다 큰 것만 남겨보세요.'
        };
      }
    },
    {
      id: 'coroutineFlow',
      title: 'Flow로 여러 값을 순서대로 방출하기',
      ready: true,
      summary: '코루틴에서 여러 개의 값을 시간차를 두고 순서대로 만들어내는 Flow의 기본 개념을 배워요.',
      goals: ['flow { emit(...) }로 값 여러 개 만들기', 'collect로 값 받기', 'Flow와 리스트의 차이'],
      blocks: [
        {
          h: '값을 하나씩 순서대로 만들어내기: flow',
          html: `<p><code>flow { }</code> 블록 안에서 <code>emit(값)</code>을 호출하면, 그 값을 하나씩 "내보낼" 수 있어요. Flow는 리스트처럼 값을 모아두는 게 아니라, <b>값이 만들어지는 대로 순서대로</b> 전달해요.</p>`,
          code: {
            label: 'flow_basic.kt',
            lang: 'kotlin',
            src: `import kotlinx.coroutines.flow.*
import kotlinx.coroutines.*

fun numbersFlow(): Flow<Int> = flow {
    emit(1)
    emit(2)
    emit(3)
}

fun main() = runBlocking {
    numbersFlow().collect { value ->
        println(value)
    }
}`,
            out: `1\n2\n3`
          }
        },
        {
          h: '값을 받아 처리하기: collect',
          html: `<p>Flow는 만들어두기만 해서는 아무 일도 안 일어나요. <code>collect { }</code>를 호출해야 실제로 값들이 순서대로 만들어지고 전달돼요.</p>`
        },
        {
          h: 'Flow와 리스트의 차이',
          html: `<p>리스트는 이미 완성된 값들의 모음이지만, Flow는 값이 <b>시간에 따라 하나씩 생성되는</b> 흐름이에요. 서버에서 실시간으로 오는 데이터나, 시간차를 두고 발생하는 이벤트를 다룰 때 자주 써요.</p>`,
          after: `<div class="note"><b>비유</b> — 리스트가 "미리 포장된 상자"라면, Flow는 "컨베이어 벨트 위로 하나씩 흘러오는 물건"에 가까워요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const vals = Array.from({ length: randInt(2, 4) }, () => randInt(1, 20));
          const emitCalls = vals.map(v => `emit(${v})`).join('; ');
          return {
            type: 'blank',
            q: `<code>fun numbersFlow(): Flow&lt;Int&gt; = flow { ${emitCalls} }</code>이고 <code>numbersFlow().collect { value -> println(value) }</code>를 실행할 때, 첫 번째로 출력되는 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(vals[0])], placeholder: '숫자',
            why: `collect는 emit된 순서 그대로 값을 받아서 출력하므로, 첫 번째는 ${vals[0]}이에요.`,
            hint: 'Flow는 emit한 순서 그대로 값을 전달해요.'
          };
        },
        () => makeChoice(
          'Flow에서 값을 실제로 받아서 처리할 때 쓰는 함수는?',
          '<code>collect</code>', ['<code>emit</code>', '<code>launch</code>', '<code>delay</code>'],
          '<code>collect { value -> ... }</code>로 Flow가 내보내는 값을 순서대로 받아 처리해요.',
          '"모으다, 거둬들이다"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `flow { } 블록 안에서 값을 하나 내보낼 때 쓰는 함수를 쓰세요.`,
          prefix: 'flow { ', suffix: '(1) }', accept: ['emit'], placeholder: '함수 이름',
          why: '<code>emit(값)</code>은 Flow 밖으로 값을 하나 내보내요.',
          hint: '"내보내다, 방출하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'Flow와 리스트(List)의 가장 큰 차이는?',
          '리스트는 이미 완성된 값들의 모음이고, Flow는 값이 시간에 따라 하나씩 만들어지는 흐름이다', ['Flow는 값을 하나도 저장할 수 없다', '리스트는 코루틴 안에서만 쓸 수 있다', '둘은 완전히 같은 개념이다'],
          'Flow는 "지금 이 순간 하나씩 만들어지는" 값의 흐름이라, 이미 완성된 리스트와는 다른 개념이에요.',
          '"컨베이어 벨트"와 "이미 포장된 상자"의 차이를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '1, 2, 3을 순서대로 emit하는 <code>Flow&lt;Int&gt;</code>를 반환하는 함수 <code>numbersFlow(): Flow&lt;Int&gt;</code>를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'fun numbersFlow(): Flow<Int> = flow {\n    emit(1)\n    emit(2)\n    emit(3)\n}',
          accept: ['fun numbersFlow(): Flow<Int> = flow {\n    emit(1)\n    emit(2)\n    emit(3)\n}'],
          why: 'flow { } 블록 안에서 emit을 순서대로 호출해서 값을 하나씩 내보내요.',
          hint: 'fun numbersFlow(): Flow<Int> = flow { emit(1); emit(2); emit(3) } 형태를 여러 줄로 쓰면 돼요.'
        }),
      ],
      boss: () => {
        const vals = Array.from({ length: randInt(3, 5) }, () => randInt(1, 30));
        return {
          type: 'blank',
          q: `numbersFlow()가 순서대로 ${vals.join(', ')}를 emit하고, <code>numbersFlow().collect { value -> println(value) }</code>를 실행할 때, 마지막으로 출력되는 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(vals[vals.length - 1])], placeholder: '숫자',
          why: `collect는 emit된 순서 그대로 출력하므로, 마지막 값은 ${vals[vals.length - 1]}이에요.`,
          hint: 'Flow는 emit한 순서를 그대로 유지해서 전달해요.'
        };
      }
    },
    {
      id: 'objectExpressions',
      title: '오브젝트 표현식(익명 객체)',
      ready: true,
      summary: '이름 없이 그 자리에서 바로 인터페이스나 클래스를 구현하는 오브젝트 표현식(object : Interface { ... })을 배워요.',
      goals: ['object : 인터페이스 { ... }로 익명 구현 만들기', '한 번만 쓰고 버릴 구현에 유용한 이유', 'companion object(선언)와의 차이'],
      blocks: [
        {
          h: '이름 없이 바로 구현하기: object 표현식',
          html: `<p>인터페이스를 구현하는 클래스를 따로 이름 붙여 만들 필요 없이, <code>object : 인터페이스 { ... }</code>로 그 자리에서 바로 "이름 없는" 구현체를 만들 수 있어요.</p>`,
          code: {
            label: 'object_expression_basic.kt',
            lang: 'kotlin',
            src: `interface ClickListener {
    fun onClick(): String
}

val listener = object : ClickListener {
    override fun onClick(): String = "클릭됨"
}

println(listener.onClick())`,
            out: `클릭됨`
          }
        },
        {
          h: '한 번만 쓰고 버릴 구현에 유용해요',
          html: `<p>그 함수 하나에서만 딱 한 번 쓰는 간단한 구현이라면, 따로 클래스 이름을 지어 파일에 선언할 필요 없이 오브젝트 표현식으로 바로 그 자리에서 만들면 코드가 더 간결해져요.</p>`
        },
        {
          h: 'companion object(선언)와는 다른 개념이에요',
          html: `<p>이전에 배운 <code>companion object</code>는 클래스 안에 "이름이 있는 단 하나의" 동반 객체를 선언하는 거였다면, 오브젝트 표현식은 필요한 곳 어디서든 인터페이스를 즉석에서 구현하는 "이름 없는" 객체를 만드는 거예요.</p>`,
          after: `<div class="note"><b>정리</b> — object 선언(companion object 등)은 "미리 정해둔 단 하나의 인스턴스"를, object 표현식은 "그때그때 필요한 곳에서 즉석으로 만드는 구현체"를 뜻해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const msg = pick(['클릭됨', '눌림', '선택됨']);
          return {
            type: 'blank',
            q: `<code>val listener = object : ClickListener { override fun onClick(): String = "${msg}" }</code>일 때, <code>listener.onClick()</code>의 결과는? (그대로 입력)`,
            prefix: '', suffix: '', accept: [msg], placeholder: '값',
            why: `오브젝트 표현식이 구현한 onClick()이 "${msg}"를 반환해요.`,
            hint: '오브젝트 표현식도 인터페이스를 구현한 값처럼 그대로 호출할 수 있어요.'
          };
        },
        () => makeChoice(
          '오브젝트 표현식(object : 인터페이스 { ... })을 쓰는 이유는?',
          '한 번만 쓰는 간단한 구현체를 따로 클래스 이름을 짓지 않고 그 자리에서 바로 만들 수 있어서', ['companion object를 대체하기 위해서 항상 써야 해서', 'object 표현식은 인터페이스 없이는 절대 못 만들어서', '실행 속도가 항상 빨라져서'],
          '오브젝트 표현식은 한 번만 쓸 간단한 구현을 위해 따로 클래스를 선언하지 않아도 되게 해줘요.',
          '이름을 지을 필요가 없다는 점이 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `인터페이스를 이름 없이 그 자리에서 바로 구현할 때 쓰는 키워드를 쓰세요.`,
          prefix: 'val listener = ', suffix: ' : ClickListener { override fun onClick(): String = "클릭됨" }', accept: ['object'], placeholder: '키워드',
          why: '<code>object : 인터페이스 { ... }</code>로 이름 없는 구현체를 만들어요.',
          hint: 'companion object에서도 봤던 그 키워드예요.'
        }),
        () => makeChoice(
          'object 표현식과 companion object의 차이는?',
          '표현식은 필요한 곳에서 즉석으로 만드는 이름 없는 구현체, companion object는 클래스에 미리 정해둔 이름있는 동반 객체', ['둘은 완전히 같은 것이다', 'object 표현식은 인터페이스를 구현할 수 없다', 'companion object는 여러 개 만들 수 있다'],
          'object 표현식은 즉석 구현체, companion object는 클래스마다 미리 정해둔 단 하나의 동반 객체예요.',
          '"즉석에서"와 "미리 정해둔"의 차이를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>interface Greeter { fun greet(): String }</code>를 오브젝트 표현식으로 즉석에서 구현해서, <code>greet()</code>가 <code>"안녕하세요"</code>를 반환하는 <code>val g</code>를 만드세요.',
          starter: '',
          placeholder: 'val g = object : Greeter { override fun greet(): String = "안녕하세요" }',
          accept: ['val g = object : Greeter { override fun greet(): String = "안녕하세요" }'],
          why: 'object : 인터페이스 { override fun ... } 형태로 즉석 구현체를 만들어요.',
          hint: 'val g = object : Greeter { override fun greet(): String = "안녕하세요" }를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const msg = pick(['안녕하세요', '반갑습니다', '환영합니다']);
        return {
          type: 'blank',
          q: `<code>interface Greeter { fun greet(): String }; val g = object : Greeter { override fun greet(): String = "${msg}" }</code>일 때, <code>g.greet()</code>의 결과는? (그대로 입력)`,
          prefix: '', suffix: '', accept: [msg], placeholder: '값',
          why: `g는 Greeter를 즉석에서 구현한 객체라서, greet()는 "${msg}"를 반환해요.`,
          hint: '오브젝트 표현식으로 만든 객체도 인터페이스에 정의된 메서드를 그대로 호출할 수 있어요.'
        };
      }
    },
    {
      id: 'comparableSorting',
      title: 'Comparable과 커스텀 정렬',
      ready: true,
      summary: '내가 만든 클래스를 정렬 가능하게 만드는 Comparable 인터페이스와, compareBy로 원하는 기준을 골라 정렬하는 법을 배워요.',
      goals: ['Comparable 구현으로 기본 정렬 기준 정하기', 'sortedWith와 compareBy로 원하는 기준 정렬하기', '오름차순/내림차순 뒤집기'],
      blocks: [
        {
          h: '내 클래스도 정렬 가능하게: Comparable',
          html: `<p><code>Comparable&lt;T&gt;</code>를 구현하고 <code>compareTo</code>를 정의하면, 그 클래스의 리스트를 <code>sorted()</code>로 바로 정렬할 수 있어요.</p>`,
          code: {
            label: 'comparable_basic.kt',
            lang: 'kotlin',
            src: `data class Player(val name: String, val score: Int) : Comparable<Player> {
    override fun compareTo(other: Player): Int = score - other.score
}

val players = listOf(Player("민준", 80), Player("지수", 95))
println(players.sorted().map { it.name })`,
            out: `[민준, 지수]`
          }
        },
        {
          h: '다른 기준으로 정렬하기: sortedWith와 compareBy',
          html: `<p>매번 Comparable을 구현할 필요 없이, <code>sortedWith(compareBy { 기준 })</code>로 그때그때 원하는 기준으로 정렬할 수 있어요.</p>`,
          code: {
            label: 'sortedwith_compareby.kt',
            lang: 'kotlin',
            src: `val players = listOf(Player("민준", 80), Player("지수", 95), Player("서연", 80))
val byScoreThenName = players.sortedWith(compareBy({ it.score }, { it.name }))
println(byScoreThenName.map { it.name })`,
            out: `[민준, 서연, 지수]`
          }
        },
        {
          h: '내림차순으로 뒤집기',
          html: `<p><code>sortedByDescending { 기준 }</code>이나 <code>compareByDescending { 기준 }</code>으로 큰 값부터 순서대로 정렬할 수 있어요.</p>`,
          code: {
            label: 'sorted_descending.kt',
            lang: 'kotlin',
            src: `val players2 = listOf(Player("민준", 80), Player("지수", 95))
println(players2.sortedByDescending { it.score }.map { it.name })`,
            out: `[지수, 민준]`
          }
        }
      ],
      quizGenerators: [
        () => {
          const names = ['민준', '지수', '서연', '하늘'];
          const players = shuffle(names).slice(0, 3).map(n => ({ name: n, score: randInt(60, 100) }));
          const sorted = [...players].sort((a, b) => a.score - b.score);
          const playerText = players.map(p => `${p.name}(${p.score})`).join(', ');
          return {
            type: 'blank',
            q: `Player는 score 기준 compareTo를 구현했어요. 점수가 각각 ${playerText}인 선수들을 <code>sorted()</code>로 정렬해서 이름만 뽑으면? (배열 형태로, 예: [이름, 이름])`,
            prefix: '', suffix: '', accept: [`[${sorted.map(p => p.name).join(', ')}]`], placeholder: '[이름, 이름]',
            why: `score가 작은 순서대로 정렬되어 [${sorted.map(p => p.name).join(', ')}]이 돼요.`,
            hint: 'compareTo가 score - other.score라서, 점수가 낮은 사람이 앞으로 와요.'
          };
        },
        () => makeChoice(
          'Comparable<T>를 구현하고 compareTo를 정의하면 좋은 점은?',
          '그 클래스의 리스트를 sorted()로 바로 정렬할 수 있다', ['클래스를 상속할 수 없게 된다', '객체를 더 이상 만들 수 없다', '실행 속도가 항상 빨라진다'],
          'compareTo를 정의하면 그 클래스가 "비교 가능"해져서, sorted()로 바로 정렬할 수 있어요.',
          '"비교할 수 있다(Comparable)"는 이름 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `Comparable<Player>를 구현할 때 재정의해야 하는 메서드 이름을 쓰세요.`,
          prefix: 'override fun ', suffix: '(other: Player): Int = score - other.score', accept: ['compareTo'], placeholder: '메서드 이름',
          why: '<code>compareTo</code>는 두 값을 비교해서, 음수/0/양수로 순서를 알려주는 메서드예요.',
          hint: '"비교하다(compare)"와 "~로(to)"를 합친 이름이에요.'
        }),
        () => makeChoice(
          '<code>sortedByDescending { it.score }</code>가 하는 일은?',
          'score가 큰 값부터 순서대로 내림차순 정렬한다', ['score가 작은 값부터 정렬한다', '정렬하지 않고 그대로 둔다', 'score가 아닌 다른 기준으로 정렬한다'],
          'Descending은 "내림차순"이라는 뜻으로, 큰 값부터 순서대로 정렬해요.',
          '오름차순(ascending)과 반대되는 단어예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>data class Player(val name: String, val score: Int)</code>가 <code>score</code> 기준으로 정렬되도록 <code>Comparable&lt;Player&gt;</code>를 구현하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'data class Player(val name: String, val score: Int) : Comparable<Player> {\n    override fun compareTo(other: Player): Int = score - other.score\n}',
          accept: ['data class Player(val name: String, val score: Int) : Comparable<Player> {\n    override fun compareTo(other: Player): Int = score - other.score\n}'],
          why: 'Comparable<Player>를 구현하고 compareTo에서 score - other.score를 반환하면 score 기준 오름차순 정렬이 가능해요.',
          hint: ': Comparable<Player> { override fun compareTo(other: Player): Int = score - other.score }를 클래스 뒤에 붙이세요.'
        }),
      ],
      boss: () => {
        const names = ['민준', '지수', '서연', '하늘'];
        const players = shuffle(names).slice(0, 3).map(n => ({ name: n, score: randInt(60, 100) }));
        const sorted = [...players].sort((a, b) => b.score - a.score);
        const playerText = players.map(p => `${p.name}(${p.score})`).join(', ');
        return {
          type: 'blank',
          q: `점수가 각각 ${playerText}인 선수들을 <code>sortedByDescending { it.score }</code>로 정렬해서 이름만 뽑으면? (배열 형태로, 예: [이름, 이름])`,
          prefix: '', suffix: '', accept: [`[${sorted.map(p => p.name).join(', ')}]`], placeholder: '[이름, 이름]',
          why: `score가 큰 순서대로 정렬되어 [${sorted.map(p => p.name).join(', ')}]이 돼요.`,
          hint: 'Descending은 큰 값부터 순서대로 정렬한다는 뜻이에요.'
        };
      }
    },
    {
      id: 'sealedInterface',
      title: '봉인된 인터페이스(sealed interface)',
      ready: true,
      summary: '클래스 계층에 얽매이지 않고도 구현 종류를 제한할 수 있는 sealed interface로, 더 유연하게 안전한 분기 처리를 만들어요.',
      goals: ['sealed interface 정의', 'sealed class와의 차이', '이미 다른 클래스를 상속한 타입도 구현체로 묶기'],
      blocks: [
        {
          h: '인터페이스 버전의 sealed: sealed interface',
          html: `<p><code>sealed class</code>처럼 <code>sealed interface</code>도 구현체의 종류를 같은 파일(또는 모듈) 안으로 제한해요. 그래서 <code>when</code>으로 분기할 때 <code>else</code> 없이도 모든 경우를 안전하게 처리할 수 있어요.</p>`,
          code: {
            label: 'sealed_interface_basic.kt',
            lang: 'kotlin',
            src: `sealed interface UiState

data class Success(val data: String) : UiState
object Loading : UiState
class Error(val message: String) : UiState

fun render(state: UiState): String = when (state) {
    is Success -> "성공: \${state.data}"
    Loading -> "로딩 중"
    is Error -> "오류: \${state.message}"
}

println(render(Success("완료")))`,
            out: `성공: 완료`
          }
        },
        {
          h: 'sealed class와 다른 점: 이미 다른 클래스를 상속했어도 OK',
          html: `<p><code>sealed class</code>의 하위 클래스는 그 sealed class 단 하나만 상속할 수 있지만, <code>sealed interface</code>는 인터페이스라서 <b>이미 다른 클래스를 상속받은 타입도 구현</b>할 수 있어요. 그래서 서로 다른 클래스 계층에 있는 타입들을 하나로 묶고 싶을 때 더 유연해요.</p>`,
          code: {
            label: 'sealed_interface_flex.kt',
            lang: 'kotlin',
            src: `open class BaseEntity(val id: Int)

sealed interface Syncable

class RemoteUser(id: Int, val name: String) : BaseEntity(id), Syncable

fun describe(s: Syncable): String = when (s) {
    is RemoteUser -> "사용자 \${s.name}"
}

println(describe(RemoteUser(1, "지수")))`,
            out: `사용자 지수`
          },
          after: `<div class="note"><b>정리</b> — 클래스는 부모 클래스를 하나만 상속할 수 있지만 인터페이스는 여러 개 구현할 수 있어서, sealed interface가 sealed class보다 더 자유롭게 조합돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const msg = pick(['서버 오류', '연결 끊김', '시간 초과']);
          return {
            type: 'blank',
            q: `<code>fun render(state: UiState): String = when (state) { is Success -> "성공: \${state.data}"; Loading -> "로딩 중"; is Error -> "오류: \${state.message}" }</code>일 때, <code>render(Error("${msg}"))</code>의 결과는? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`오류: ${msg}`], placeholder: '결과 문자열',
            why: `is Error 분기가 실행되어 "오류: ${msg}"가 돼요.`,
            hint: 'Error 타입이므로 is Error 분기가 실행돼요.'
          };
        },
        () => makeChoice(
          'sealed interface가 sealed class와 다른 점은?',
          '인터페이스라서, 이미 다른 클래스를 상속받은 타입도 구현체로 쓸 수 있다', ['구현체 종류를 전혀 제한하지 않는다', 'when에서 반드시 else가 필요하다', '프로퍼티를 하나도 가질 수 없다'],
          'sealed interface는 인터페이스이므로, 다른 클래스를 상속한 타입도 함께 구현할 수 있어서 더 유연해요.',
          '클래스는 하나만 상속하지만, 인터페이스는 여러 개 구현할 수 있다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `여러 클래스 계층에 걸쳐 구현 종류를 제한하고 싶을 때, <code>sealed class</code> 대신 쓰는 키워드 조합을 쓰세요.`,
          prefix: 'sealed ', suffix: ' UiState', accept: ['interface'], placeholder: '키워드',
          why: '<code>sealed interface</code>는 클래스 상속 제약 없이도 구현 종류를 제한해요.',
          hint: 'class 대신 쓸 수 있는, 여러 개 구현 가능한 그 타입이에요.'
        }),
        () => makeChoice(
          'sealed interface를 쓰면 좋은 상황은?',
          '서로 다른 부모 클래스를 상속한 타입들을 하나의 공통 분류로 묶어서 when으로 안전하게 처리하고 싶을 때', ['클래스 하나만 만들고 끝낼 때', '아무 분기 처리도 하지 않을 때', '상속을 아예 쓰지 않을 때'],
          '이미 다른 클래스를 상속한 타입들도 sealed interface로는 함께 묶어서 다룰 수 있어요.',
          '클래스 상속 제약이 없다는 점이 핵심이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>UiState</code>라는 sealed interface를 정의하는 코드를 한 줄로 작성하세요.',
          starter: '',
          placeholder: 'sealed interface UiState',
          accept: ['sealed interface UiState'],
          why: '<code>sealed interface 이름</code> 형태로 봉인된 인터페이스를 선언해요.',
          hint: 'sealed interface UiState 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const id = randInt(1, 99);
        const name = pick(['민준', '지수', '서연', '하늘']);
        return {
          type: 'blank',
          q: `<code>open class BaseEntity(val id: Int)</code>, <code>sealed interface Syncable</code>, <code>class RemoteUser(id: Int, val name: String) : BaseEntity(id), Syncable</code>이고 <code>fun describe(s: Syncable): String = when (s) { is RemoteUser -> "사용자 \${s.name}" }</code>일 때, <code>describe(RemoteUser(${id}, "${name}"))</code>의 결과는? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`사용자 ${name}`], placeholder: '결과 문자열',
          why: `RemoteUser는 BaseEntity를 상속하면서도 Syncable을 구현해서, describe는 "사용자 ${name}"을 반환해요.`,
          hint: 'RemoteUser가 이미 BaseEntity를 상속했어도 Syncable 구현체로 다룰 수 있어요.'
        };
      }
    },
    {
      id: 'valueClass',
      title: '값 클래스(value class)로 타입 안전성 강화',
      ready: true,
      summary: '실행 시 오버헤드 없이 원시 타입을 감싸서, 서로 다른 의미의 값을 섞어 쓰는 실수를 컴파일 타임에 막아주는 값 클래스를 배워요.',
      goals: ['@JvmInline value class 정의', '타입 착각을 컴파일 타임에 막기', '값 클래스의 제약(프로퍼티 하나)'],
      blocks: [
        {
          h: '값 하나를 감싸는 타입 안전한 래퍼: value class',
          html: `<p><code>value class</code>는 프로퍼티를 딱 하나만 가지는 클래스예요. <code>@JvmInline</code>을 붙이면, 컴파일된 코드에서는 대부분 원래 타입(예: Int) 그대로 처리되어서 객체를 새로 만드는 비용이 거의 없어요.</p>`,
          code: {
            label: 'value_class_basic.kt',
            lang: 'kotlin',
            src: `@JvmInline
value class UserId(val value: Int)

fun printUserId(id: UserId) {
    println("사용자 ID: \${id.value}")
}

printUserId(UserId(42))`,
            out: `사용자 ID: 42`
          }
        },
        {
          h: '타입 착각을 막아주는 이유',
          html: `<p>여러 종류의 아이디를 그냥 <code>Int</code>로 다루면, 실수로 순서를 바꿔 넣어도 컴파일러가 잡아내지 못해요. 각각을 서로 다른 <code>value class</code>로 감싸면, 컴파일러가 서로 다른 타입으로 구분해서 실수를 미리 막아줘요.</p>`,
          code: {
            label: 'value_class_safety.kt',
            lang: 'kotlin',
            src: `@JvmInline
value class UserId(val value: Int)

@JvmInline
value class ProductId(val value: Int)

fun buyItem(user: UserId, product: ProductId) {
    println("사용자 \${user.value}가 상품 \${product.value}를 구매")
}

// buyItem(ProductId(1), UserId(2)) // 컴파일 오류! 타입이 서로 다름
buyItem(UserId(2), ProductId(1))`,
            out: `사용자 2가 상품 1를 구매`
          },
          after: `<div class="note"><b>정리</b> — value class는 프로퍼티를 딱 하나만 가질 수 있고, 그 프로퍼티는 반드시 <code>val</code>이어야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(1, 999);
          return {
            type: 'blank',
            q: `<code>@JvmInline value class UserId(val value: Int)</code>이고 <code>fun printUserId(id: UserId) { println("사용자 ID: \${id.value}") }</code>일 때, <code>printUserId(UserId(${n}))</code>의 출력은? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`사용자 ID: ${n}`], placeholder: '출력 결과',
            why: `id.value가 ${n}이므로 "사용자 ID: ${n}"이 출력돼요.`,
            hint: 'UserId 안의 value 프로퍼티가 그대로 출력에 쓰여요.'
          };
        },
        () => makeChoice(
          'value class의 장점으로 알맞은 것은?',
          '실행 시 오버헤드가 거의 없이, 서로 다른 의미의 원시 타입 값을 실수로 바꿔 쓰는 걸 컴파일 타임에 막아준다', ['프로퍼티를 여러 개 자유롭게 가질 수 있다', '항상 일반 클래스보다 실행 속도가 느리다', '상속 계층을 자유롭게 여러 단계로 만들 수 있다'],
          'value class는 컴파일 시 대부분 원래 타입으로 처리되어 오버헤드가 적으면서도, 타입 자체는 구분돼서 실수를 막아줘요.',
          '"타입은 다르지만 실행 비용은 거의 없다"는 게 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>value class UserId(val value: Int)</code> 위에 붙여야 하는 어노테이션을 쓰세요.`,
          prefix: '', suffix: '\nvalue class UserId(val value: Int)', accept: ['@JvmInline'], placeholder: '어노테이션',
          why: '<code>@JvmInline</code>을 붙여야 JVM에서 인라인 처리되는 값 클래스로 컴파일돼요.',
          hint: '"JVM에 인라인으로"라는 뜻의 어노테이션이에요.'
        }),
        () => makeChoice(
          'value class의 제약으로 알맞은 것은?',
          '프로퍼티를 딱 하나만 가질 수 있고, 그 프로퍼티는 val이어야 한다', ['프로퍼티를 최대 두 개까지 가질 수 있다', 'var 프로퍼티만 가질 수 있다', '함수를 하나도 가질 수 없다'],
          'value class는 감싸는 값이 딱 하나뿐이라, 프로퍼티도 하나(val)만 허용돼요.',
          '"하나의 값을 감싼다"는 의미를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Int</code> 값 하나(<code>value</code>)를 감싸는 값 클래스 <code>UserId</code>를 <code>@JvmInline</code>과 함께 정의하세요.',
          starter: '',
          rows: 2,
          placeholder: '@JvmInline\nvalue class UserId(val value: Int)',
          accept: ['@JvmInline\nvalue class UserId(val value: Int)'],
          why: '@JvmInline과 value class를 함께 써서, Int를 감싸는 타입 안전한 래퍼를 만들어요.',
          hint: '@JvmInline\\nvalue class UserId(val value: Int) 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const n = randInt(1, 500);
        return {
          type: 'blank',
          q: `<code>@JvmInline value class ProductId(val value: Int)</code>이고 <code>fun printProductId(id: ProductId) { println("상품 ID: \${id.value}") }</code>일 때, <code>printProductId(ProductId(${n}))</code>의 출력은? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`상품 ID: ${n}`], placeholder: '출력 결과',
          why: `id.value가 ${n}이므로 "상품 ID: ${n}"이 출력돼요.`,
          hint: 'value class도 안의 값 하나를 그대로 담고 있을 뿐이에요.'
        };
      }
    },
    {
      id: 'dslBuilder',
      title: '람다 with 수신 객체로 만드는 나만의 DSL',
      ready: true,
      summary: '수신 객체가 있는 함수 타입(예: Html.() -> Unit)을 활용해서, 도메인에 특화된 읽기 좋은 DSL을 직접 만드는 법을 배워요.',
      goals: ['수신 객체가 있는 람다(A.() -> Unit) 이해하기', '빌더 패턴을 DSL 스타일로 표현하기', 'DSL 함수를 직접 작성하기'],
      blocks: [
        {
          h: '수신 객체가 있는 람다란',
          html: `<p>일반 함수 타입 <code>(String) -&gt; Unit</code>은 매개변수로 값을 받지만, <b>수신 객체가 있는</b> 함수 타입 <code>Html.() -&gt; Unit</code>은 그 람다 안에서 <code>this</code>가 <code>Html</code> 인스턴스를 가리켜서, 마치 <code>Html</code>의 멤버 함수처럼 자연스럽게 호출할 수 있게 해줘요.</p>`,
          code: {
            label: 'dsl_basic.kt',
            lang: 'kotlin',
            src: `class Html {
    val lines = mutableListOf<String>()
    fun text(content: String) {
        lines.add(content)
    }
}

fun buildHtml(block: Html.() -> Unit): Html {
    val html = Html()
    html.block()
    return html
}

val page = buildHtml {
    text("안녕하세요")
    text("환영합니다")
}
println(page.lines)`,
            out: `[안녕하세요, 환영합니다]`
          }
        },
        {
          h: '이게 바로 DSL의 원리예요',
          html: `<p><code>buildHtml { text(...) }</code>처럼 블록 안에서 <code>text</code>를 최상위 함수처럼 자연스럽게 부를 수 있는 이유는, <code>block</code>의 타입이 <code>Html.() -&gt; Unit</code>이라서 그 블록 안에서는 <code>this</code>가 자동으로 <code>Html</code> 인스턴스가 되기 때문이에요. Gradle Kotlin DSL이나 kotlinx.html도 이 원리로 만들어졌어요.</p>`,
          after: `<div class="note"><b>정리</b> — <code>Html.() -&gt; Unit</code>에서 <code>Html</code>을 "수신 객체 타입"이라고 불러요. 일반 함수 타입 <code>() -&gt; Unit</code>과 달리, 그 안에서 <code>this</code>가 자동으로 채워져요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const t1 = pick(['안녕', '반가워', '환영해']);
          const t2 = pick(['좋은 하루', '고마워', '수고했어']);
          return {
            type: 'blank',
            q: `위 <code>Html</code>/<code>buildHtml</code> 코드에서 <code>val page = buildHtml { text("${t1}"); text("${t2}") }; println(page.lines)</code>를 실행하면 결과는? (배열 형태로, 예: [값, 값])`,
            prefix: '', suffix: '', accept: [`[${t1}, ${t2}]`], placeholder: '[값, 값]',
            why: `text로 추가한 순서 그대로 lines에 쌓여서 [${t1}, ${t2}]가 돼요.`,
            hint: 'text 호출은 lines 리스트에 순서대로 추가돼요.'
          };
        },
        () => makeChoice(
          '<code>Html.() -&gt; Unit</code> 같은 "수신 객체가 있는 함수 타입"의 특징은?',
          '그 람다 안에서 this가 지정된 타입(Html)의 인스턴스를 가리켜서, 그 타입의 멤버처럼 함수를 호출할 수 있다', ['매개변수를 절대 받을 수 없다', '항상 Unit이 아닌 값을 반환해야 한다', '클래스 안에서만 정의할 수 있다'],
          '수신 객체가 있는 함수 타입은 그 안에서 this가 자동으로 지정된 타입이 되어, 마치 그 타입 안에 있는 것처럼 코드를 쓸 수 있어요.',
          '"수신 객체(receiver)"라는 이름처럼 this가 그 타입이 돼요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>fun buildHtml(block: Html.____): Html { ... }</code>에서 "Html의 멤버처럼 동작하고 아무 것도 반환하지 않는 함수 타입"을 채우세요.`,
          prefix: 'fun buildHtml(block: Html.', suffix: '): Html { val html = Html(); html.block(); return html }', accept: ['() -> Unit'], placeholder: '함수 타입',
          why: '<code>Html.() -&gt; Unit</code>은 Html을 수신 객체로 하는, 반환값이 없는 함수 타입이에요.',
          hint: '일반 함수 타입 () -> Unit 앞에 수신 객체 타입(Html.)만 붙이면 돼요.'
        }),
        () => makeChoice(
          '이런 수신 객체 람다 스타일이 특히 유용한 경우는?',
          '만들고자 하는 객체를 설정하는 DSL(예: HTML 빌더, 빌드 스크립트)을 자연스러운 문법으로 만들 때', ['단순히 두 숫자를 더하는 함수를 만들 때', '반복문을 아예 쓰지 않으려 할 때', '클래스를 하나도 정의하지 않으려 할 때'],
          '수신 객체 람다는 블록 안에서 특정 타입의 멤버를 자연스럽게 호출하게 해줘서, 설정용 DSL을 만들 때 특히 강력해요.',
          'HTML 빌더나 Gradle 빌드 스크립트를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Html</code> 클래스(내부에 <code>lines</code> 리스트와 <code>text</code> 함수가 있음)를 받아서, <code>Html.() -&gt; Unit</code> 블록을 실행한 뒤 그 <code>Html</code>을 반환하는 함수 <code>buildHtml</code>을 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'fun buildHtml(block: Html.() -> Unit): Html {\n    val html = Html()\n    html.block()\n    return html\n}',
          accept: ['fun buildHtml(block: Html.() -> Unit): Html {\n    val html = Html()\n    html.block()\n    return html\n}'],
          why: 'Html 인스턴스를 만든 뒤, block()을 그 인스턴스에 대해 호출하고, 완성된 인스턴스를 반환해요.',
          hint: 'val html = Html()로 만들고 html.block()을 호출한 뒤 html을 반환하세요.'
        }),
      ],
      boss: () => {
        const texts = shuffle(['하나', '둘', '셋', '넷']).slice(0, 3);
        return {
          type: 'blank',
          q: `<code>val page = buildHtml { ${texts.map(t => `text("${t}")`).join('; ')} }; println(page.lines)</code>를 실행하면 결과는? (배열 형태로, 예: [값, 값, 값])`,
          prefix: '', suffix: '', accept: [`[${texts.join(', ')}]`], placeholder: '[값, 값, 값]',
          why: `text를 호출한 순서 그대로 lines에 쌓여서 [${texts.join(', ')}]이 돼요.`,
          hint: '수신 객체 람다 안에서 text 호출은 순서대로 lines에 추가돼요.'
        };
      }
    },
    {
      id: 'customDelegate',
      title: '커스텀 위임 프로퍼티(getValue/setValue)',
      ready: true,
      summary: 'by lazy를 넘어, getValue와 setValue를 직접 구현해서 프로퍼티가 읽히고 쓰일 때의 동작을 내 마음대로 정의하는 법을 배워요.',
      goals: ['operator fun getValue/setValue 구현', '값이 바뀔 때 로직 끼워 넣기', '위임 객체를 여러 프로퍼티에 재사용하는 이유'],
      blocks: [
        {
          h: '읽고 쓰는 동작을 직접 정의하기',
          html: `<p><code>by lazy</code>처럼, 직접 만든 클래스에 <code>operator fun getValue</code>와 <code>operator fun setValue</code>를 정의하면 그 객체를 <code>by</code>로 위임할 수 있어요. <code>KProperty</code> 매개변수로 위임된 프로퍼티의 이름 등 정보를 알 수 있어요.</p>`,
          code: {
            label: 'custom_delegate_basic.kt',
            lang: 'kotlin',
            src: `import kotlin.reflect.KProperty

class LoggingDelegate(private var value: Int) {
    operator fun getValue(thisRef: Any?, property: KProperty<*>): Int {
        println("\${property.name} 읽음: \$value")
        return value
    }
    operator fun setValue(thisRef: Any?, property: KProperty<*>, newValue: Int) {
        println("\${property.name} 변경: \$value -> \$newValue")
        value = newValue
    }
}

var score: Int by LoggingDelegate(0)
score = 10
println(score)`,
            out: `score 변경: 0 -> 10\nscore 읽음: 10\n10`
          }
        },
        {
          h: '위임 객체를 여러 프로퍼티에 재사용하기',
          html: `<p>여러 프로퍼티가 같은 로직(로그 남기기, 값 검증 등)을 필요로 할 때, 그 로직을 매번 getter/setter에 반복해서 쓰는 대신 <code>LoggingDelegate</code> 같은 위임 객체 하나로 뽑아내면 여러 프로퍼티에서 그대로 재사용할 수 있어요.</p>`,
          after: `<div class="note"><b>정리</b> — 표준 라이브러리의 <code>by lazy</code>, <code>Delegates.observable</code>도 결국 이 <code>getValue</code>/<code>setValue</code> 규칙을 따르는 위임 객체예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const init = randInt(0, 20);
          const newVal = randInt(21, 99);
          return {
            type: 'blank',
            q: `<code>var score: Int by LoggingDelegate(${init}); score = ${newVal}; println(score)</code>를 실행할 때, 가장 마지막 줄(println(score))의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(newVal)], placeholder: '숫자',
            why: `score = ${newVal}로 setValue가 호출되어 값이 ${newVal}로 바뀌고, 이어서 println(score)는 getValue를 통해 ${newVal}을 돌려줘요.`,
            hint: 'setValue로 값이 바뀐 뒤, getValue는 그 바뀐 값을 그대로 돌려줘요.'
          };
        },
        () => makeChoice(
          '위임 프로퍼티에서 <code>setValue</code>가 호출되는 시점은?',
          '위임된 프로퍼티에 값을 대입(=)할 때', ['프로퍼티 값을 읽기만 할 때', '클래스가 선언될 때 딱 한 번', 'by 키워드를 처음 쓸 때만'],
          '<code>변수 = 값</code>처럼 대입할 때마다 setValue가 호출돼서 그 안의 로직이 실행돼요.',
          '"set"이 "값을 넣다"라는 뜻이라는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `프로퍼티를 <b>읽을 때</b> 호출되는 연산자 함수의 이름을 쓰세요.`,
          prefix: 'operator fun ', suffix: '(thisRef: Any?, property: KProperty<*>): Int { return value }', accept: ['getValue'], placeholder: '함수 이름',
          why: '<code>getValue</code>는 위임된 프로퍼티를 읽을 때 호출돼요.',
          hint: '"값을 가져오다(get)"라는 뜻의 이름이에요.'
        }),
        () => makeChoice(
          'getValue/setValue를 직접 구현한 위임 객체를 여러 프로퍼티에서 재사용하면 좋은 점은?',
          '로깅, 검증 같은 공통 로직을 한 곳에 모아두고 여러 프로퍼티가 그대로 재사용할 수 있다', ['프로퍼티마다 다른 타입을 가질 수 없게 된다', '클래스 상속이 아예 불가능해진다', '읽기/쓰기 속도가 항상 두 배로 빨라진다'],
          '위임 객체는 "읽고 쓰는 로직"을 한 곳에 모아서, 비슷한 동작이 필요한 여러 프로퍼티에서 재사용할 수 있게 해줘요.',
          '중복 코드를 줄이는 게 핵심 목적이에요.'
        ),
        () => ({
          type: 'code',
          q: '프로퍼티를 읽을 때 항상 <code>42</code>를 반환하는 <code>getValue</code> 연산자 함수를 작성하세요. (<code>thisRef: Any?, property: KProperty&lt;*&gt;</code>를 매개변수로 받고, 반환 타입은 <code>Int</code>)',
          starter: '',
          placeholder: 'operator fun getValue(thisRef: Any?, property: KProperty<*>): Int = 42',
          accept: ['operator fun getValue(thisRef: Any?, property: KProperty<*>): Int = 42'],
          why: '<code>operator fun getValue(thisRef, property): Int</code> 형태로 정의하면 by로 위임했을 때 읽기 동작을 담당해요.',
          hint: 'operator fun getValue(thisRef: Any?, property: KProperty<*>): Int = 42 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const init = randInt(0, 10);
        const step1 = randInt(11, 30);
        const step2 = randInt(31, 60);
        return {
          type: 'blank',
          q: `<code>var count: Int by LoggingDelegate(${init}); count = ${step1}; count = ${step2}; println(count)</code>를 실행할 때, 가장 마지막 줄의 출력은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(step2)], placeholder: '숫자',
          why: `count는 ${init} -> ${step1} -> ${step2} 순서로 바뀌고, 마지막 println(count)는 가장 최근 값인 ${step2}를 출력해요.`,
          hint: '대입을 여러 번 해도, 마지막으로 읽을 때는 가장 최근에 설정된 값이 나와요.'
        };
      }
    },
    {
      id: 'structuredConcurrency',
      title: '구조화된 동시성: coroutineScope',
      ready: true,
      summary: '자식 코루틴들이 모두 끝날 때까지 기다려주는 coroutineScope로, 코루틴 간의 부모-자식 관계를 안전하게 관리하는 법을 배워요.',
      goals: ['coroutineScope로 여러 작업 묶기', '모든 자식이 끝나야 다음으로 진행되는 이유', '구조화된 동시성이라는 개념'],
      blocks: [
        {
          h: '자식들이 다 끝날 때까지 기다리기: coroutineScope',
          html: `<p><code>coroutineScope { }</code>는 suspend 함수예요. 그 안에서 <code>launch</code>로 시작한 코루틴들이 모두 끝나야 <code>coroutineScope</code> 자체가 끝나서, 결과를 안전하게 이어서 쓸 수 있어요.</p>`,
          code: {
            label: 'coroutine_scope_basic.kt',
            lang: 'kotlin',
            src: `import kotlinx.coroutines.*

suspend fun loadAll(): String = coroutineScope {
    launch {
        delay(50)
        println("이미지 로딩 완료")
    }
    launch {
        delay(30)
        println("텍스트 로딩 완료")
    }
    "모두 준비됨"
}

fun main() = runBlocking {
    val result = loadAll()
    println(result)
}`,
            out: `텍스트 로딩 완료\n이미지 로딩 완료\n모두 준비됨`
          }
        },
        {
          h: '왜 "구조화"라고 부를까요',
          html: `<p><code>coroutineScope</code> 안에서 시작한 <code>launch</code>는 그 scope의 "자식"이 돼요. 자식이 하나라도 끝나지 않으면 <code>coroutineScope</code>도 끝나지 않고 기다려서, 코루틴들이 부모-자식 트리 구조로 관리돼요. 그 덕분에 작업이 다 끝나기 전에 결과를 반환해버리는 실수를 막아줘요.</p>`,
          after: `<div class="note"><b>정리</b> — 이 구조 덕분에 부모 코루틴이 취소되면 그 안의 모든 자식 코루틴도 자동으로 함께 취소돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const d1 = randInt(10, 40);
          const d2 = randInt(41, 80);
          return makeChoice(
            `<code>coroutineScope { launch { delay(${d1}); println("A 완료") }; launch { delay(${d2}); println("B 완료") }; "끝" }</code>일 때, 두 println 중 먼저 출력되는 것은?`,
            '"A 완료"', ['"B 완료"', '둘이 동시에 출력된다', '아무 것도 출력되지 않는다'],
            `delay(${d1})이 delay(${d2})보다 짧아서, "A 완료"가 먼저 출력돼요.`,
            'delay 시간이 짧은 launch가 먼저 println을 실행해요.'
          );
        },
        () => makeChoice(
          'coroutineScope의 특징으로 알맞은 것은?',
          '그 안에서 시작한 모든 자식 코루틴이 끝날 때까지 기다렸다가 종료된다', ['launch를 호출하자마자 바로 종료된다', '반드시 새로운 스레드를 만들어야 한다', 'runBlocking 밖에서는 절대 호출할 수 없다'],
          'coroutineScope는 자식 코루틴들이 모두 끝나야 자기 자신도 끝나는, "구조화된" 동시성을 만들어줘요.',
          '자식이 다 끝나기 전엔 부모도 끝나지 않는다는 게 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `여러 launch를 묶어서 "모두 끝날 때까지 기다리는" suspend 블록을 만들 때 쓰는 함수 이름을 쓰세요.`,
          prefix: 'suspend fun loadAll(): String = ', suffix: ' { launch { /* ... */ }; "모두 준비됨" }', accept: ['coroutineScope'], placeholder: '함수 이름',
          why: '<code>coroutineScope</code>는 그 안의 모든 자식 코루틴이 끝나야 반환돼요.',
          hint: '"코루틴의 범위(scope)"라는 이름 그대로예요.'
        }),
        () => makeChoice(
          'launch로 시작한 코루틴이 아직 안 끝났는데 coroutineScope 블록이 곧바로 결과를 반환하는 일이 있을까요?',
          '없다. coroutineScope는 모든 자식이 끝날 때까지 반환을 미룬다', ['있다. launch는 결과 반환과 아무 상관이 없다', '있다. coroutineScope는 항상 즉시 반환된다', '경우에 따라 다르며 예측할 수 없다'],
          'coroutineScope는 구조화된 동시성의 핵심으로, 자식이 모두 끝나기 전에는 절대 먼저 반환되지 않아요.',
          '"구조화"라는 말은 부모가 자식을 끝까지 책임진다는 뜻이에요.'
        ),
        () => ({
          type: 'code',
          q: 'suspend 함수 <code>doWork()</code>가 <code>coroutineScope</code> 안에서 <code>launch { delay(10); println("완료") }</code>를 실행한 뒤 <code>"끝"</code>을 반환하도록 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'suspend fun doWork(): String = coroutineScope {\n    launch { delay(10); println("완료") }\n    "끝"\n}',
          accept: ['suspend fun doWork(): String = coroutineScope {\n    launch { delay(10); println("완료") }\n    "끝"\n}'],
          why: 'coroutineScope 블록 안에서 launch를 실행하고, 마지막 줄의 값이 coroutineScope의 반환값이 돼요.',
          hint: 'coroutineScope { launch { ... }; "끝" } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const resultMsg = pick(['모두 준비됨', '로딩 완료', '작업 끝']);
        return {
          type: 'blank',
          q: `<code>suspend fun loadAll(): String = coroutineScope { launch { delay(50); println("이미지 로딩 완료") }; launch { delay(30); println("텍스트 로딩 완료") }; "${resultMsg}" }</code>이고 <code>runBlocking { println(loadAll()) }</code>을 실행할 때, 가장 마지막에 출력되는 줄은? (그대로 입력)`,
          prefix: '', suffix: '', accept: [resultMsg], placeholder: '마지막 출력 줄',
          why: `coroutineScope는 두 launch가 모두 끝난 뒤에야 결과 문자열을 반환하고, 그 값을 main에서 마지막에 출력하므로 "${resultMsg}"가 가장 나중에 출력돼요.`,
          hint: 'coroutineScope는 자식 launch가 다 끝나야 반환값을 돌려줘요. 그 반환값은 항상 맨 마지막에 출력돼요.'
        };
      }
    },
    {
      id: 'flowOperatorChain',
      title: 'Flow 연산자 체이닝: map, filter, onEach',
      ready: true,
      summary: 'Flow에도 컬렉션처럼 map, filter, onEach를 이어 붙여서, 값이 만들어지는 그 순간마다 가공하는 법을 배워요.',
      goals: ['map으로 Flow의 각 값 변환하기', 'filter로 조건에 맞는 값만 통과시키기', 'onEach로 중간에 부수 작업 끼워넣기'],
      blocks: [
        {
          h: '컬렉션처럼 이어 붙이는 Flow 연산자',
          html: `<p>Flow도 <code>map</code>, <code>filter</code> 같은 연산자를 지원해요. 리스트처럼 전체를 한꺼번에 모아서 처리하는 게 아니라, <b>emit된 값 하나하나가 그 자리에서 바로</b> map → filter를 거쳐 collect로 전달돼요.</p>`,
          code: {
            label: 'flow_operators.kt',
            lang: 'kotlin',
            src: `import kotlinx.coroutines.flow.*
import kotlinx.coroutines.*

fun numbersFlow(): Flow<Int> = flow {
    emit(1)
    emit(2)
    emit(3)
    emit(4)
}

fun main() = runBlocking {
    numbersFlow()
        .map { it * 10 }
        .filter { it > 15 }
        .collect { value -> println(value) }
}`,
            out: `20\n30\n40`
          }
        },
        {
          h: '값은 그대로 두고 부수 작업만: onEach',
          html: `<p><code>onEach</code>는 값을 바꾸지 않고 그대로 다음 단계로 넘기면서, 그 사이에 로그를 남기는 등 부수 작업을 끼워 넣을 수 있게 해줘요.</p>`,
          code: {
            label: 'flow_oneach.kt',
            lang: 'kotlin',
            src: `fun main() = runBlocking {
    numbersFlow()
        .onEach { println("받음: $it") }
        .map { it * 10 }
        .collect { value -> println("결과: $value") }
}`,
            out: `받음: 1\n결과: 10\n받음: 2\n결과: 20\n받음: 3\n결과: 30\n받음: 4\n결과: 40`
          },
          after: `<div class="note"><b>정리</b> — 각 값은 map, filter, collect를 순서대로 하나씩 거쳐가요. 리스트처럼 중간 결과를 통째로 모아두지 않아요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const vals = Array.from({ length: 4 }, () => randInt(1, 10));
          const mult = randInt(2, 5);
          const threshold = randInt(5, 20);
          const emits = vals.map(v => `emit(${v})`).join('; ');
          const result = vals.map(v => v * mult).filter(v => v > threshold);
          return {
            type: 'blank',
            q: `<code>flow { ${emits} }.map { it * ${mult} }.filter { it > ${threshold} }.collect { println(it) }</code>를 실행하면 출력되는 값들은? (배열 형태로, 예: [값, 값])`,
            prefix: '', suffix: '', accept: [`[${result.join(', ')}]`], placeholder: '[값, 값]',
            why: `각 값을 ${mult}배로 만든 뒤 ${threshold}보다 큰 값만 남기면 [${result.join(', ')}]예요.`,
            hint: 'map으로 먼저 변환한 값들을 떠올린 뒤, filter 조건을 만족하는 것만 골라보세요.'
          };
        },
        () => makeChoice(
          'Flow의 <code>onEach</code>가 하는 일은?',
          '값을 바꾸지 않고 그대로 다음 단계로 넘기면서, 그 사이 부수 작업(로그 등)을 실행할 수 있게 한다', ['값을 걸러내서 조건에 맞는 것만 통과시킨다', '값을 다른 타입으로 변환한다', 'Flow를 즉시 종료시킨다'],
          'onEach는 값 자체는 그대로 두고, 그 값이 지나갈 때 부수적인 동작(로그 출력 등)만 실행해요.',
          '"각각에 대해(on each)"라는 이름처럼, 값마다 뭔가를 "하는" 것이지 "바꾸는" 게 아니에요.'
        ),
        () => ({
          type: 'blank',
          q: `Flow가 내보내는 각 값을 다른 값으로 변환할 때 쓰는 연산자를 쓰세요.`,
          prefix: 'numbersFlow().', suffix: ' { it * 2 }.collect { println(it) }', accept: ['map'], placeholder: '연산자 이름',
          why: '<code>map</code>은 Flow의 각 값을 원하는 형태로 변환해요.',
          hint: '컬렉션에서도 쓰던 그 이름 그대로예요.'
        }),
        () => makeChoice(
          'Flow에 <code>map</code>을 적용하면 일어나는 일로 알맞은 것은?',
          'emit된 값 하나하나에 대해, 그 자리에서 즉시 변환이 적용된다', ['모든 값을 리스트로 모은 뒤 한꺼번에 변환한다', 'collect가 호출되기 전에 미리 다 계산해서 저장해둔다', '변환된 값은 저장되지 않고 사라진다'],
          'Flow의 map은 리스트의 map과 달리, 값이 emit되는 그 순간마다 즉시 변환을 적용해요.',
          'Flow는 "컨베이어 벨트"처럼 값이 하나씩 흘러간다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>numbersFlow()</code>가 내보내는 값들에 <code>map { it * 2 }</code>를 적용하고, <code>filter { it > 4 }</code>로 걸러낸 뒤, <code>collect { println(it) }</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'numbersFlow()\n    .map { it * 2 }\n    .filter { it > 4 }\n    .collect { println(it) }',
          accept: ['numbersFlow()\n    .map { it * 2 }\n    .filter { it > 4 }\n    .collect { println(it) }'],
          why: 'map, filter, collect를 순서대로 이어 붙여서 값을 변환하고 걸러낸 뒤 출력해요.',
          hint: '.map { it * 2 }.filter { it > 4 }.collect { println(it) }를 순서대로 이어 붙이세요.'
        }),
      ],
      boss: () => {
        const vals = Array.from({ length: 4 }, () => randInt(1, 8));
        const threshold = randInt(3, 12);
        const emits = vals.map(v => `emit(${v})`).join('; ');
        const result = vals.map(v => v * v).filter(v => v > threshold);
        return {
          type: 'blank',
          q: `<code>flow { ${emits} }.map { it * it }.filter { it > ${threshold} }.collect { println(it) }</code>를 실행하면 출력되는 값들은? (배열 형태로, 예: [값, 값])`,
          prefix: '', suffix: '', accept: [`[${result.join(', ')}]`], placeholder: '[값, 값]',
          why: `각 값을 제곱한 뒤 ${threshold}보다 큰 값만 남기면 [${result.join(', ')}]예요.`,
          hint: '먼저 제곱한 값들을 떠올린 뒤, filter 조건을 만족하는 것만 남겨보세요.'
        };
      }
    },
    {
      id: 'stateFlowBasics',
      title: 'StateFlow로 상태 관리하기',
      ready: true,
      summary: '항상 최신 값 하나를 들고 있다가, 값이 바뀔 때마다 구독자에게 알려주는 StateFlow의 기본 개념을 배워요.',
      goals: ['MutableStateFlow로 상태 만들기', '.value로 값 읽고 쓰기', 'StateFlow와 일반 Flow의 차이'],
      blocks: [
        {
          h: '항상 값을 가지고 있는 Flow: StateFlow',
          html: `<p>일반 Flow는 <code>collect</code>하기 전까진 아무 일도 안 일어나지만, <code>StateFlow</code>는 항상 "현재 값" 하나를 들고 있어서 <code>.value</code>로 언제든 즉시 읽고 쓸 수 있어요. <code>MutableStateFlow(초기값)</code>으로 만들어요.</p>`,
          code: {
            label: 'stateflow_basic.kt',
            lang: 'kotlin',
            src: `import kotlinx.coroutines.flow.*

val counter = MutableStateFlow(0)

println(counter.value)
counter.value = 5
println(counter.value)`,
            out: `0\n5`
          }
        },
        {
          h: '값이 바뀔 때마다 구독자에게 알림',
          html: `<p>StateFlow를 <code>collect</code>로 구독하면, <code>.value</code>가 바뀔 때마다 그 새 값을 자동으로 전달받아요.</p>`,
          code: {
            label: 'stateflow_collect.kt',
            lang: 'kotlin',
            src: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    val counter = MutableStateFlow(0)
    val job = launch {
        counter.collect { value -> println("현재 값: $value") }
    }
    counter.value = 1
    counter.value = 2
    delay(10)
    job.cancel()
}`,
            out: `현재 값: 0\n현재 값: 1\n현재 값: 2`
          },
          after: `<div class="note"><b>정리</b> — 화면에 보여줄 "최신 상태"를 관리할 때 StateFlow를 자주 써요. 외부에는 읽기 전용 StateFlow 타입으로 노출하고, 내부에서만 MutableStateFlow로 값을 바꾸는 패턴이 흔해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const init = randInt(0, 20);
          const newVal = randInt(21, 60);
          return {
            type: 'blank',
            q: `<code>val counter = MutableStateFlow(${init}); counter.value = ${newVal}; println(counter.value)</code>를 실행하면 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(newVal)], placeholder: '숫자',
            why: `counter.value를 ${newVal}로 바꾼 뒤 읽으므로 ${newVal}이 출력돼요.`,
            hint: '.value에 새 값을 대입하면 그 즉시 값이 바뀌어요.'
          };
        },
        () => makeChoice(
          'StateFlow의 특징으로 알맞은 것은?',
          '항상 현재 값 하나를 들고 있어서, .value로 언제든 즉시 읽을 수 있다', ['구독(collect)해야만 비로소 값이 생긴다', '값을 하나도 저장할 수 없다', '한 번 값을 정하면 절대 바꿀 수 없다'],
          'StateFlow는 "상태(state)"라는 이름처럼 항상 최신 값을 들고 있어요.',
          '일반 Flow와 달리 collect 없이도 .value로 바로 확인할 수 있어요.'
        ),
        () => ({
          type: 'blank',
          q: `초기값 0으로 상태를 가진 StateFlow를 만드는 코드를 작성하세요.`,
          prefix: 'val counter = ', suffix: '', accept: ['MutableStateFlow(0)'], placeholder: 'MutableStateFlow(...)',
          why: '<code>MutableStateFlow(초기값)</code>으로 값을 바꿀 수 있는 StateFlow를 만들어요.',
          hint: 'MutableStateFlow(0) 형태를 그대로 써보세요.'
        }),
        () => makeChoice(
          'StateFlow와 일반 Flow(<code>flow { emit(...) }</code>)의 가장 큰 차이는?',
          'StateFlow는 항상 최신 값을 보관하고 있다가 구독자에게 바로 알려주지만, 일반 Flow는 collect하기 전까진 아무 값도 만들지 않는다', ['StateFlow는 값을 절대 두 번 이상 못 바꾼다', '일반 Flow만 코루틴 안에서 쓸 수 있다', '둘은 완전히 같은 개념이다'],
          'StateFlow는 "현재 상태"를 항상 들고 있는 반면, 일반 Flow는 collect가 호출되어야 값이 만들어지기 시작해요.',
          '"상태(state)"를 항상 가지고 있다는 이름의 의미를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '초기값 <code>0</code>으로 <code>MutableStateFlow</code>를 만들어 <code>counter</code>에 담고, <code>.value</code>를 <code>10</code>으로 바꾼 뒤 그 값을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'val counter = MutableStateFlow(0)\ncounter.value = 10\nprintln(counter.value)',
          accept: ['val counter = MutableStateFlow(0)\ncounter.value = 10\nprintln(counter.value)'],
          why: 'MutableStateFlow(0)으로 만들고, .value에 10을 대입한 뒤 다시 .value를 읽어 출력해요.',
          hint: 'MutableStateFlow(0)을 만들고 counter.value = 10으로 바꾼 뒤 println(counter.value)를 쓰세요.'
        }),
      ],
      boss: () => {
        const init = randInt(0, 10);
        const step1 = randInt(11, 30);
        const step2 = randInt(31, 60);
        return {
          type: 'blank',
          q: `<code>val counter = MutableStateFlow(${init}); counter.value = ${step1}; counter.value = ${step2}; println(counter.value)</code>를 실행하면 출력은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(step2)], placeholder: '숫자',
          why: `.value는 ${init} -> ${step1} -> ${step2} 순서로 바뀌고, 마지막으로 읽을 때는 가장 최근 값인 ${step2}가 나와요.`,
          hint: '.value는 대입할 때마다 바로 바뀌고, 읽을 땐 항상 가장 최근 값이에요.'
        };
      }
    },
    {
      id: 'coroutineCancellation',
      title: '코루틴 취소와 협조적 취소',
      ready: true,
      summary: 'job.cancel()로 코루틴을 멈추는 법과, 코루틴이 취소 요청에 스스로 협조해야만 실제로 멈추는 이유를 배워요.',
      goals: ['job.cancel()로 코루틴 취소하기', 'isActive로 취소 여부 확인하기', '취소가 "협조적"으로 동작한다는 것 이해하기'],
      blocks: [
        {
          h: '코루틴 멈추기: job.cancel()',
          html: `<p><code>launch</code>가 돌려주는 <code>Job</code>에 <code>cancel()</code>을 호출하면 그 코루틴을 취소할 수 있어요. <code>delay</code> 같은 suspend 함수는 취소 요청을 자동으로 감지해서 그 지점에서 멈춰요.</p>`,
          code: {
            label: 'cancel_basic.kt',
            lang: 'kotlin',
            src: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        repeat(5) { i ->
            println("작업 $i")
            delay(50)
        }
    }
    delay(120)
    job.cancel()
    println("취소함")
}`,
            out: `작업 0\n작업 1\n작업 2\n취소함`
          }
        },
        {
          h: '취소는 "협조적"으로 동작해요: isActive',
          html: `<p>바쁘게 계산만 하는 코드는 취소 요청이 와도 스스로 멈추지 않아요. 그래서 반복문 안에서 <code>isActive</code>를 직접 확인해서, 취소되었으면 스스로 루프를 빠져나오도록 짜야 해요.</p>`,
          code: {
            label: 'cancel_cooperative.kt',
            lang: 'kotlin',
            src: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        var i = 0
        while (isActive) {
            println("작업 $i")
            i++
            if (i == 3) cancel()
        }
    }
    job.join()
    println("취소 완료")
}`,
            out: `작업 0\n작업 1\n작업 2\n취소 완료`
          },
          after: `<div class="note"><b>정리</b> — isActive 같은 검사를 전혀 하지 않는 무한 루프는, cancel()을 호출해도 스스로 멈추지 않아요. 그래서 취소는 "강제 종료"가 아니라 "협조적인 요청"이라고 불러요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(3, 6);
          const lines = Array.from({ length: n }, (_, i) => `작업 ${i}`).join('\\n');
          return {
            type: 'blank',
            q: `<code>launch { var i = 0; while (isActive) { println("작업 $i"); i++; if (i == ${n}) cancel() } }</code>이 있고 job.join() 뒤 "취소 완료"를 출력해요. "작업 X" 줄은 총 몇 번 출력될까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `i가 0부터 ${n - 1}까지일 때 출력되고, i가 ${n}이 되는 순간 cancel()이 호출되어 루프가 멈추므로 총 ${n}번 출력돼요.`,
            hint: 'i가 0부터 시작해서 cancel()이 호출되는 값 직전까지 출력돼요.'
          };
        },
        () => makeChoice(
          '코루틴 취소가 "협조적"이라는 말의 의미는?',
          '코루틴 스스로 isActive 같은 검사를 통해 취소 요청에 응답해야 실제로 멈춘다', ['cancel()을 부르면 무조건 그 즉시 강제로 멈춘다', '취소는 delay가 있는 코드에서는 전혀 동작하지 않는다', 'isActive는 항상 true만 반환한다'],
          '코루틴은 취소 요청을 스스로 확인(isActive)하거나 suspend 지점(delay 등)에서 자동으로 반응해야 실제로 멈춰요.',
          '"협조적"이라는 말은 코루틴이 스스로 확인해야 한다는 뜻이에요.'
        ),
        () => ({
          type: 'blank',
          q: `루프 안에서 "이 코루틴이 아직 취소되지 않았는지" 확인할 때 쓰는 프로퍼티를 쓰세요.`,
          prefix: 'while (', suffix: ') { /* ... */ }', accept: ['isActive'], placeholder: '프로퍼티 이름',
          why: '<code>isActive</code>는 현재 코루틴이 아직 활성 상태(취소되지 않음)인지 알려줘요.',
          hint: '"활성 상태인가(is active)"라는 뜻 그대로예요.'
        }),
        () => makeChoice(
          '<code>delay(1000)</code>을 실행 중인 코루틴에 <code>cancel()</code>을 호출하면?',
          '곧바로 그 지점에서 CancellationException이 발생하며 코루틴이 멈춘다', ['delay가 끝날 때까지 취소가 무시된다', '코루틴이 대신 처음부터 다시 시작된다', '아무 일도 일어나지 않는다'],
          'delay 같은 suspend 함수는 취소 요청을 자동으로 감지해서, 그 즉시 예외를 던지며 멈춰요.',
          'delay는 취소에 "협조적으로" 반응하는 대표적인 suspend 함수예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>launch</code> 블록 안에서, <code>isActive</code>가 참인 동안 <code>i</code>(0부터 시작)를 출력하고 1씩 늘리다가, <code>i</code>가 <code>2</code>가 되면 <code>cancel()</code>을 호출하는 코드를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'var i = 0\nwhile (isActive) {\n    println(i)\n    i++\n    if (i == 2) cancel()\n}',
          accept: ['var i = 0\nwhile (isActive) {\n    println(i)\n    i++\n    if (i == 2) cancel()\n}'],
          why: 'isActive를 조건으로 하는 while 루프 안에서 i를 늘리다가, 원하는 값이 되면 cancel()을 직접 호출해요.',
          hint: 'while (isActive) { println(i); i++; if (i == 2) cancel() } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const n = randInt(4, 7);
        return {
          type: 'blank',
          q: `<code>launch { var i = 0; while (isActive) { println("작업 $i"); i++; if (i == ${n}) cancel() } }</code>이 있고 job.join() 뒤 "취소 완료"를 출력해요. 가장 마지막으로 출력되는 "작업 X" 줄에서 X의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(n - 1)], placeholder: '숫자',
          why: `i가 ${n}이 되는 순간 cancel()이 호출되어 루프가 멈추므로, 마지막으로 출력되는 건 i가 ${n - 1}일 때예요.`,
          hint: 'cancel()이 호출되는 값 바로 전까지만 출력돼요.'
        };
      }
    },
    {
      id: 'extensionProperties',
      title: '확장 프로퍼티(extension property)',
      ready: true,
      summary: '함수뿐 아니라 프로퍼티도 이미 있는 타입에 추가할 수 있는 확장 프로퍼티를 배워요.',
      goals: ['val 타입.이름: 타입 get() = ... 형태로 정의하기', '확장 프로퍼티가 상태를 저장할 수 없는 이유', '확장 함수와의 차이'],
      blocks: [
        {
          h: '프로퍼티도 확장할 수 있어요',
          html: `<p>확장 함수처럼, 이미 있는 타입에 <code>val 타입.이름: 반환타입 get() = ...</code> 형태로 "계산해서 값을 돌려주는" 프로퍼티를 추가할 수 있어요.</p>`,
          code: {
            label: 'extension_property_basic.kt',
            lang: 'kotlin',
            src: `val String.firstChar: Char
    get() = this[0]

val List<Int>.secondOrNull: Int?
    get() = if (size >= 2) this[1] else null

println("안녕".firstChar)
println(listOf(1, 2, 3).secondOrNull)`,
            out: `안\n2`
          }
        },
        {
          h: '왜 값을 저장할 필드는 없을까요',
          html: `<p>확장 프로퍼티는 원본 클래스 코드 자체를 고치는 게 아니라서, 그 안에 새 필드(값을 저장할 공간)를 추가할 수 없어요. 그래서 확장 프로퍼티는 항상 <code>get()</code>으로 "계산해서" 값을 돌려줘야 해요.</p>`,
          after: `<div class="note"><b>정리</b> — 확장 함수는 <code>fun</code>으로 동작을 추가하고, 확장 프로퍼티는 <code>val</code>/<code>var</code>로 계산된 값을 추가해요. var로 만들려면 get()과 함께 set()도 정의해야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const word = pick(['안녕', '반가워', '고마워', '좋은아침']);
          return {
            type: 'blank',
            q: `<code>val String.firstChar: Char get() = this[0]</code>일 때, <code>"${word}".firstChar</code>의 결과는? (글자 하나만 입력)`,
            prefix: '', suffix: '', accept: [word[0]], placeholder: '글자',
            why: `firstChar는 문자열의 첫 글자를 돌려주므로 "${word[0]}"가 돼요.`,
            hint: '문자열의 인덱스 0번째 글자를 떠올려보세요.'
          };
        },
        () => makeChoice(
          '확장 프로퍼티가 값을 저장할 필드(backing field)를 가질 수 없는 이유는?',
          '원본 클래스 코드 자체를 수정하는 게 아니라서, 새 필드를 추가할 방법이 없다', ['Kotlin이 프로퍼티 자체를 지원하지 않아서', '확장 프로퍼티는 항상 null이어야 해서', '함수보다 실행 속도가 느려서'],
          '확장 프로퍼티는 밖에서 "붙여주는" 것이라, 클래스 내부에 실제 필드를 추가할 수는 없어요. 그래서 get()으로 계산해서 값을 돌려줘요.',
          '확장 함수도 원본 클래스를 고치지 않는다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `확장 프로퍼티에서 값을 "어떻게 계산해서 돌려줄지" 정의하는 키워드를 쓰세요.`,
          prefix: 'val String.firstChar: Char\n    ', suffix: '() = this[0]', accept: ['get'], placeholder: '키워드',
          why: '<code>get()</code> 블록 안에서 프로퍼티가 반환할 값을 계산해요.',
          hint: '"값을 가져오다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '확장 함수와 확장 프로퍼티의 차이로 알맞은 것은?',
          '확장 함수는 fun으로 동작(행동)을 추가하고, 확장 프로퍼티는 val/var로 계산된 값을 추가한다', ['확장 프로퍼티만 반환값을 가질 수 있다', '확장 함수는 매개변수를 가질 수 없다', '둘은 완전히 같은 것이라 구분할 필요가 없다'],
          '확장 함수는 "무엇을 하는지"를, 확장 프로퍼티는 "어떤 값을 나타내는지"를 표현할 때 써요.',
          'fun과 val/var라는 키워드 차이를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Int</code>를 확장해서, 그 값이 0보다 크면 <code>true</code>를 돌려주는 확장 프로퍼티 <code>isPositive</code>(타입 Boolean)를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'val Int.isPositive: Boolean\n    get() = this > 0',
          accept: ['val Int.isPositive: Boolean\n    get() = this > 0'],
          why: '<code>val Int.이름: Boolean get() = 조건식</code> 형태로 확장 프로퍼티를 만들어요.',
          hint: 'val Int.isPositive: Boolean\\n    get() = this > 0 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const size = randInt(1, 4);
        const list = Array.from({ length: size }, () => randInt(1, 50));
        const result = list.length >= 2 ? String(list[1]) : 'null';
        return {
          type: 'blank',
          q: `<code>val List<Int>.secondOrNull: Int? get() = if (size >= 2) this[1] else null</code>일 때, <code>listOf(${list.join(', ')}).secondOrNull</code>의 결과는? (숫자 또는 null)`,
          prefix: '', suffix: '', accept: [result], placeholder: '숫자 또는 null',
          why: list.length >= 2 ? `리스트의 크기가 2 이상이라 두 번째 값인 ${result}을(를) 돌려줘요.` : `리스트의 크기가 2보다 작아서 null을 돌려줘요.`,
          hint: '리스트 크기가 2 이상인지 먼저 확인해보세요.'
        };
      }
    },
    {
      id: 'buildCollections',
      title: 'buildList, buildMap, buildString으로 컬렉션 만들기',
      ready: true,
      summary: '가변 빌더 안에서 자유롭게 값을 채운 뒤, 완성되면 읽기 전용 컬렉션으로 돌려주는 buildList/buildMap/buildString을 배워요.',
      goals: ['buildList { add(...) }로 리스트 만들기', 'buildMap { put(...) }으로 맵 만들기', 'buildString { append(...) }으로 문자열 만들기'],
      blocks: [
        {
          h: '조건에 따라 채워나가는 리스트: buildList',
          html: `<p><code>buildList { }</code> 블록 안에서는 <code>MutableList</code>처럼 <code>add</code>, 조건문 등을 자유롭게 쓸 수 있어요. 블록이 끝나면 더 이상 바꿀 수 없는 읽기 전용 <code>List</code>로 반환돼요.</p>`,
          code: {
            label: 'build_list.kt',
            lang: 'kotlin',
            src: `val n = 5
val result = buildList {
    for (i in 1..n) {
        if (i % 2 == 0) add(i)
    }
}
println(result)`,
            out: `[2, 4]`
          }
        },
        {
          h: 'buildMap과 buildString도 같은 원리예요',
          html: `<p><code>buildMap { put(키, 값) }</code>은 <code>Map</code>을, <code>buildString { append(내용) }</code>은 <code>String</code>을 같은 방식으로 만들어줘요.</p>`,
          code: {
            label: 'build_map_string.kt',
            lang: 'kotlin',
            src: `val map = buildMap {
    put("a", 1)
    put("b", 2)
}
val text = buildString {
    append("안녕")
    append("!")
}
println(map)
println(text)`,
            out: `{a=1, b=2}\n안녕!`
          },
          after: `<div class="note"><b>정리</b> — 매번 mutableListOf()를 만들고 마지막에 toList()로 바꿔주는 것보다, buildList가 그 과정을 한 번에 자연스럽게 표현해줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(4, 9);
          const result = [];
          for (let i = 1; i <= n; i++) if (i % 2 === 0) result.push(i);
          return {
            type: 'blank',
            q: `<code>val result = buildList { for (i in 1..${n}) { if (i % 2 == 0) add(i) } }</code>일 때, <code>result</code>의 값은? (배열 형태로, 예: [값, 값])`,
            prefix: '', suffix: '', accept: [`[${result.join(', ')}]`], placeholder: '[값, 값]',
            why: `1부터 ${n}까지 중 짝수만 add되어 [${result.join(', ')}]이 돼요.`,
            hint: '1부터 N까지 중 2로 나눠 떨어지는 값만 골라보세요.'
          };
        },
        () => makeChoice(
          'buildList { }의 특징으로 알맞은 것은?',
          '블록 안에서는 자유롭게 add 등을 쓰고, 블록이 끝나면 읽기 전용 List로 반환된다', ['블록 안에서는 add를 쓸 수 없다', '반환된 리스트도 계속 add로 값을 추가할 수 있다', '항상 빈 리스트만 반환한다'],
          'buildList는 블록 안에서만 가변적으로 채우고, 완성되면 더는 못 바꾸는 List로 돌려줘요.',
          '"짓다(build)"라는 이름처럼, 짓는 동안만 자유롭고 완성되면 고정돼요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>buildList { }</code> 블록 안에서 값을 하나 추가할 때 쓰는 함수를 쓰세요.`,
          prefix: 'buildList { ', suffix: '(1) }', accept: ['add'], placeholder: '함수 이름',
          why: '<code>add(값)</code>은 MutableList와 똑같이 buildList 블록 안에서도 그대로 써요.',
          hint: '리스트에 값을 더할 때 쓰던 그 함수예요.'
        }),
        () => makeChoice(
          '<code>buildString { }</code>이 하는 일은?',
          '블록 안에서 append로 문자열을 차례로 이어붙인 뒤, 완성된 String을 반환한다', ['문자열을 거꾸로 뒤집어서 반환한다', '이미 있는 문자열을 지워버린다', '숫자만 이어붙일 수 있다'],
          'buildString은 StringBuilder처럼 append로 이어붙인 결과를 최종 String으로 돌려줘요.',
          '"짓다(build)" + "문자열(String)"이라는 이름 그대로예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>buildMap { }</code>을 이용해서 <code>"a"</code>에 <code>1</code>을, <code>"b"</code>에 <code>2</code>를 담은 맵을 만들어 <code>map</code>에 저장하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'val map = buildMap {\n    put("a", 1)\n    put("b", 2)\n}',
          accept: ['val map = buildMap {\n    put("a", 1)\n    put("b", 2)\n}'],
          why: 'buildMap 블록 안에서 put(키, 값)으로 값을 채운 뒤, 완성된 Map을 반환해요.',
          hint: 'buildMap { put("a", 1)\\n    put("b", 2) } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const n = randInt(6, 12);
        const result = [];
        for (let i = 1; i <= n; i++) if (i % 3 === 0) result.push(i);
        return {
          type: 'blank',
          q: `<code>val result = buildList { for (i in 1..${n}) { if (i % 3 == 0) add(i) } }</code>일 때, <code>result</code>의 값은? (배열 형태로, 예: [값, 값])`,
          prefix: '', suffix: '', accept: [`[${result.join(', ')}]`], placeholder: '[값, 값]',
          why: `1부터 ${n}까지 중 3의 배수만 add되어 [${result.join(', ')}]이 돼요.`,
          hint: '1부터 N까지 중 3으로 나눠 떨어지는 값만 골라보세요.'
        };
      }
    },
    {
      id: 'safeCastElvis',
      title: '안전한 캐스팅(as?)과 엘비스 연산자 체이닝',
      ready: true,
      summary: '실패하면 예외 대신 null을 돌려주는 안전한 캐스팅 as?와, 엘비스 연산자(?:)를 이어 붙여 기본값까지 한 줄로 처리하는 법을 배워요.',
      goals: ['as?로 안전하게 타입 캐스팅하기', '캐스팅 실패 시 null이 되는 이유', '?: 체이닝으로 기본값 정하기'],
      blocks: [
        {
          h: '실패해도 안전한 캐스팅: as?',
          html: `<p><code>as</code>는 캐스팅에 실패하면 예외(ClassCastException)를 던지지만, <code>as?</code>는 실패하면 예외 대신 <b>null</b>을 돌려줘서 앱이 죽지 않아요.</p>`,
          code: {
            label: 'safe_cast_basic.kt',
            lang: 'kotlin',
            src: `val value: Any = "안녕"

val asString: String? = value as? String
val asInt: Int? = value as? Int

println(asString)
println(asInt)`,
            out: `안녕\nnull`
          }
        },
        {
          h: '기본값까지 한 줄로: as?와 ?: 체이닝',
          html: `<p><code>as?</code>가 돌려주는 null을 그냥 두지 않고, 엘비스 연산자 <code>?:</code>를 이어 붙이면 캐스팅에 실패했을 때 쓸 기본값까지 한 줄로 정할 수 있어요.</p>`,
          code: {
            label: 'safe_cast_elvis.kt',
            lang: 'kotlin',
            src: `val value: Any = 42

val length = (value as? String)?.length ?: -1
println(length)`,
            out: `-1`
          },
          after: `<div class="note"><b>정리</b> — <code>(value as? String)?.length ?: -1</code>은 "String으로 캐스팅되면 그 길이를, 아니면(캐스팅 실패 또는 null이면) -1을" 뜻하는 안전한 한 줄이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const isString = Math.random() < 0.5;
          const word = pick(['안녕', '반가워', '고마워']);
          const num = randInt(1, 100);
          const value = isString ? `"${word}"` : String(num);
          return {
            type: 'blank',
            q: `<code>val value: Any = ${value}; println(value as? String)</code>를 실행하면? (문자열이면 그대로, 아니면 null 입력)`,
            prefix: '', suffix: '', accept: [isString ? word : 'null'], placeholder: '값 또는 null',
            why: isString ? `value가 String이라서 그대로 "${word}"가 출력돼요.` : `value가 String이 아니라서 as?는 null을 돌려줘요.`,
            hint: 'as?는 캐스팅이 안 되면 예외 대신 null을 돌려줘요.'
          };
        },
        () => makeChoice(
          '<code>as</code>와 <code>as?</code>의 차이로 알맞은 것은?',
          'as는 실패하면 예외를 던지고, as?는 실패하면 null을 돌려준다', ['as?는 항상 캐스팅에 성공한다', 'as는 null을 다룰 때만 쓴다', '둘은 완전히 같은 동작을 한다'],
          'as?는 "안전한(safe)" 캐스팅이라서, 실패해도 프로그램이 멈추지 않고 null을 돌려줘요.',
          '물음표(?)가 붙으면 대부분 "실패해도 안전하다"는 뜻이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>Any</code> 타입 값을 <code>String</code>으로 안전하게 캐스팅하는(실패 시 null) 연산자를 쓰세요.`,
          prefix: 'val s: String? = value ', suffix: ' String', accept: ['as?'], placeholder: '연산자',
          why: '<code>as?</code>는 캐스팅에 실패해도 예외 없이 null을 돌려줘요.',
          hint: 'as 뒤에 물음표를 붙이면 "안전한" 캐스팅이 돼요.'
        }),
        () => makeChoice(
          '<code>(value as? String)?.length ?: -1</code> 코드가 뜻하는 바는?',
          'value가 String으로 캐스팅되면 그 길이를, 안 되면 -1을 결과로 쓴다', ['value가 String이 아니면 예외를 던진다', '항상 -1만 반환한다', 'length가 0이면 -1로 바꾼다'],
          'as?로 캐스팅에 실패하면 null이 되고, ?:는 그 null 대신 -1을 대신 써줘요.',
          'as?와 ?:를 각각 따로 떼어서 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>value: Any</code>를 <code>String</code>으로 안전하게 캐스팅한 뒤, 그 길이를 구하되 캐스팅에 실패하면 <code>0</code>을 쓰도록 <code>len</code>에 담는 코드를 작성하세요.',
          starter: '',
          placeholder: 'val len = (value as? String)?.length ?: 0',
          accept: ['val len = (value as? String)?.length ?: 0'],
          why: 'as?로 안전하게 캐스팅한 뒤, ?.length로 null이면 건너뛰고, ?:로 기본값 0을 지정해요.',
          hint: 'val len = (value as? String)?.length ?: 0 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const isString = Math.random() < 0.5;
        const word = pick(['안녕', '반갑습니다', '고맙습니다', '수고했어요']);
        const num = randInt(1, 999);
        const value = isString ? `"${word}"` : String(num);
        const result = isString ? word.length : -1;
        return {
          type: 'blank',
          q: `<code>val value: Any = ${value}; val length = (value as? String)?.length ?: -1; println(length)</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
          why: isString ? `value가 String이라 캐스팅에 성공해서 길이 ${result}이 출력돼요.` : `value가 String이 아니라 캐스팅에 실패해서 -1이 출력돼요.`,
          hint: 'value의 타입이 String인지 아닌지부터 확인해보세요.'
        };
      }
    },
    {
      id: 'tailrecFunctions',
      title: '꼬리 재귀 함수(tailrec)',
      ready: true,
      summary: '재귀 호출이 함수의 마지막 동작일 때, tailrec 키워드로 컴파일러가 반복문으로 바꿔줘서 스택 오버플로우 없이 재귀를 쓰는 법을 배워요.',
      goals: ['tailrec 키워드로 꼬리 재귀 표시하기', '"꼬리 위치"의 재귀 호출이란 무엇인지', '왜 스택 오버플로우를 막아주는지'],
      blocks: [
        {
          h: '재귀가 스택을 쌓지 않게: tailrec',
          html: `<p>일반적인 재귀 함수는 호출할 때마다 스택에 정보를 쌓아서, 아주 많이 반복하면 <b>스택 오버플로우</b>가 날 수 있어요. 재귀 호출이 함수의 <b>맨 마지막 동작</b>이라면(꼬리 위치), <code>tailrec</code>을 붙여서 컴파일러가 반복문으로 바꿔주게 할 수 있어요.</p>`,
          code: {
            label: 'tailrec_basic.kt',
            lang: 'kotlin',
            src: `tailrec fun sumTo(n: Int, acc: Int = 0): Int {
    return if (n == 0) acc else sumTo(n - 1, acc + n)
}

println(sumTo(100000))`,
            out: `5000050000`
          }
        },
        {
          h: '"꼬리 위치"가 아니면 tailrec은 효과가 없어요',
          html: `<p><code>tailrec</code>이 붙어도, 재귀 호출 결과에 <b>추가 연산</b>을 더 하는 형태(예: <code>n * factorial(n - 1)</code>)라면 그 호출은 꼬리 위치가 아니라서 최적화되지 않아요. 재귀 호출이 그 함수가 반환하는 값 그 자체여야만 해요.</p>`,
          code: {
            label: 'tailrec_wrong_shape.kt',
            lang: 'kotlin',
            src: `// 이 형태는 재귀 호출(factorial(n - 1)) 뒤에 n을 곱하는 연산이 남아 있어서
// 꼬리 위치가 아니에요. tailrec을 붙여도 컴파일러가 경고를 줘요.
fun factorial(n: Int): Long {
    return if (n <= 1) 1L else n * factorial(n - 1)
}

println(factorial(5))`,
            out: `120`
          },
          after: `<div class="note"><b>정리</b> — 누산기(accumulator) 매개변수를 추가해서 "재귀 호출이 곧 반환값"이 되도록 함수 모양을 바꾸면 tailrec으로 최적화할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(3, 8);
          let sum = 0;
          for (let i = 1; i <= n; i++) sum += i;
          return {
            type: 'blank',
            q: `<code>tailrec fun sumTo(n: Int, acc: Int = 0): Int = if (n == 0) acc else sumTo(n - 1, acc + n)</code>일 때, <code>sumTo(${n})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
            why: `1부터 ${n}까지 다 더한 값과 같아서 ${sum}이에요.`,
            hint: 'acc에 n, n-1, ..., 1을 차례로 더해나가는 셈이에요.'
          };
        },
        () => makeChoice(
          'tailrec 키워드를 붙이는 이유는?',
          '재귀 호출이 함수의 꼬리(마지막) 위치에 있을 때, 컴파일러가 반복문으로 바꿔서 스택 오버플로우를 막아준다', ['함수의 실행 속도를 항상 두 배로 늘려준다', '재귀 호출 횟수를 줄여준다', '반환 타입을 자동으로 nullable로 만든다'],
          'tailrec은 꼬리 위치의 재귀를 반복문으로 바꿔서, 아무리 많이 재귀해도 스택이 쌓이지 않게 해줘요.',
          '"꼬리(tail)"라는 말은 재귀 호출이 함수의 맨 마지막 동작이라는 뜻이에요.'
        ),
        () => ({
          type: 'blank',
          q: `재귀 호출이 꼬리 위치에 있는 함수 앞에 붙여서, 컴파일러가 반복문으로 최적화하게 하는 키워드를 쓰세요.`,
          prefix: '', suffix: ' fun sumTo(n: Int, acc: Int = 0): Int = if (n == 0) acc else sumTo(n - 1, acc + n)', accept: ['tailrec'], placeholder: '키워드',
          why: '<code>tailrec</code>은 "꼬리 재귀(tail recursion)"의 줄임말이에요.',
          hint: '"꼬리(tail)"와 "재귀(recursion)"를 합친 단어예요.'
        }),
        () => makeChoice(
          '<code>fun factorial(n: Int): Long = if (n <= 1) 1L else n * factorial(n - 1)</code>에 tailrec을 붙여도 최적화되지 않는 이유는?',
          '재귀 호출(factorial(n - 1)) 뒤에 n을 곱하는 연산이 남아 있어서, 꼬리 위치가 아니기 때문이다', ['n이 항상 양수라서', '반환 타입이 Long이라서', 'tailrec은 원래 아무 효과가 없어서'],
          '재귀 호출 결과가 그대로 반환되는 게 아니라, 곱셈이 추가로 남아 있어서 꼬리 위치가 아니에요.',
          '재귀 호출이 함수의 "진짜 마지막 동작"인지 확인해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>n</code>까지의 곱(팩토리얼)을 누산기 <code>acc</code>(기본값 1)를 이용해 꼬리 재귀로 계산하는 <code>tailrec fun factorialTail(n: Int, acc: Long = 1): Long</code>을 작성하세요.',
          starter: '',
          placeholder: 'tailrec fun factorialTail(n: Int, acc: Long = 1): Long = if (n <= 1) acc else factorialTail(n - 1, acc * n)',
          accept: ['tailrec fun factorialTail(n: Int, acc: Long = 1): Long = if (n <= 1) acc else factorialTail(n - 1, acc * n)'],
          why: '누산기 acc에 곱셈 결과를 미리 담아 넘겨서, 재귀 호출 자체가 곧 반환값이 되게 만들어요.',
          hint: 'tailrec fun factorialTail(n: Int, acc: Long = 1): Long = if (n <= 1) acc else factorialTail(n - 1, acc * n) 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const n = randInt(5, 12);
        let sum = 0;
        for (let i = 1; i <= n; i++) sum += i * 2;
        return {
          type: 'blank',
          q: `<code>tailrec fun sumEvenSteps(n: Int, acc: Int = 0): Int = if (n == 0) acc else sumEvenSteps(n - 1, acc + n * 2)</code>일 때, <code>sumEvenSteps(${n})</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `n이 ${n}부터 1까지 내려가며 각 값의 2배를 acc에 더하므로, 결과는 ${sum}이에요.`,
          hint: 'n, n-1, ..., 1 각각의 2배를 다 더해보세요.'
        };
      }
    },
    {
      id: 'localFunctions',
      title: '중첩 함수(로컬 함수)와 클로저',
      ready: true,
      summary: '함수 안에 함수를 정의해서 바깥의 지역 변수를 그대로 사용하는 중첩 함수(로컬 함수)와 클로저를 배워요.',
      goals: ['함수 안에 함수 정의하기', '바깥 함수의 지역 변수를 캡처하는 클로저', '중첩 함수가 유용한 상황'],
      blocks: [
        {
          h: '함수 안의 함수: 중첩 함수(로컬 함수)',
          html: `<p>Kotlin은 함수 <b>안에</b> 또 다른 함수를 정의할 수 있어요. 이런 함수를 중첩 함수(로컬 함수)라고 불러요. 그 함수를 감싸는 바깥 함수 밖에서는 호출할 수 없어요.</p>`,
          code: {
            label: 'local_function_basic.kt',
            lang: 'kotlin',
            src: `fun printSquares(upTo: Int) {
    fun square(n: Int): Int = n * n

    for (i in 1..upTo) {
        println(square(i))
    }
}

printSquares(3)`,
            out: `1\n4\n9`
          }
        },
        {
          h: '바깥의 변수를 그대로 쓰는 클로저',
          html: `<p>중첩 함수는 자신을 감싸는 바깥 함수의 지역 변수를 그대로 읽고 쓸 수 있어요. 이렇게 자신이 정의된 곳의 변수를 "붙잡아 두는" 것을 클로저(closure)라고 해요.</p>`,
          code: {
            label: 'local_function_closure.kt',
            lang: 'kotlin',
            src: `fun makeCounter(): () -> Int {
    var count = 0
    fun increment(): Int {
        count += 1
        return count
    }
    return ::increment
}

val counter = makeCounter()
println(counter())
println(counter())
println(counter())`,
            out: `1\n2\n3`
          },
          after: `<div class="note"><b>정리</b> — <code>count</code>는 <code>makeCounter</code>가 끝난 뒤에도 사라지지 않고, increment 함수 안에 계속 "붙잡혀" 있어서 호출할 때마다 값이 유지돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 5);
          return {
            type: 'blank',
            q: `<code>fun printSquares(upTo: Int) { fun square(n: Int): Int = n * n; for (i in 1..upTo) { println(square(i)) } }</code>일 때, <code>printSquares(${n})</code>을 실행하면 총 몇 줄이 출력될까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `1부터 ${n}까지 각각 한 줄씩 출력되므로 총 ${n}줄이에요.`,
            hint: 'for (i in 1..upTo) 반복 횟수를 세어보세요.'
          };
        },
        () => makeChoice(
          '중첩 함수(로컬 함수)의 특징으로 알맞은 것은?',
          '자신을 둘러싼 바깥 함수 안에서만 호출할 수 있고, 바깥 함수의 지역 변수를 그대로 쓸 수 있다', ['파일의 어디서든 자유롭게 호출할 수 있다', '바깥 함수의 변수에는 절대 접근할 수 없다', '클래스 안에서만 정의할 수 있다'],
          '중첩 함수는 그 함수를 감싼 바깥 함수 안에서만 쓸 수 있고, 바깥의 변수를 클로저로 붙잡아 사용할 수 있어요.',
          '"중첩(nested)"이라는 이름처럼 바깥 함수 안에 갇혀 있어요.'
        ),
        () => ({
          type: 'blank',
          q: `함수가 자신이 정의된 곳의 지역 변수를 계속 "붙잡아 두는" 특징을 부르는 이름을 영어로 쓰세요.`,
          prefix: '', suffix: '(이)라고 부른다', accept: ['closure', 'Closure'], placeholder: '영어 단어',
          why: '<code>closure</code>는 함수가 자신이 정의된 환경의 변수를 계속 참조하는 것을 말해요.',
          hint: '"닫다, 감싸다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>makeCounter()</code>가 매번 새로 호출될 때마다 반환하는 카운터들의 특징은?',
          '각 카운터는 자기만의 독립된 count 변수를 가진다', ['모든 카운터가 하나의 count 변수를 공유한다', '항상 0만 반환한다', '한 번밖에 호출할 수 없다'],
          'makeCounter를 호출할 때마다 새로운 count 지역 변수가 만들어지고, 그 변수를 각자의 increment가 독립적으로 붙잡아요.',
          'makeCounter를 두 번 호출하면 count도 두 개 따로 생겨요.'
        ),
        () => ({
          type: 'code',
          q: '<code>fun printDoubled(upTo: Int)</code> 안에, 값을 2배로 만드는 중첩 함수 <code>double(n: Int): Int = n * 2</code>를 정의하고, <code>1..upTo</code>를 돌며 각 값을 double에 넣어 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'fun printDoubled(upTo: Int) {\n    fun double(n: Int): Int = n * 2\n\n    for (i in 1..upTo) {\n        println(double(i))\n    }\n}',
          accept: ['fun printDoubled(upTo: Int) {\n    fun double(n: Int): Int = n * 2\n\n    for (i in 1..upTo) {\n        println(double(i))\n    }\n}'],
          why: '함수 안에 double이라는 중첩 함수를 정의하고, 반복문에서 그 함수를 호출해요.',
          hint: 'fun printDoubled(upTo: Int) { fun double(n: Int): Int = n * 2; for (i in 1..upTo) { println(double(i)) } } 형태를 여러 줄로 쓰면 돼요.'
        }),
      ],
      boss: () => {
        const calls = randInt(2, 6);
        return {
          type: 'blank',
          q: `<code>fun makeCounter(): () -> Int { var count = 0; fun increment(): Int { count += 1; return count }; return ::increment }</code>이고 <code>val counter = makeCounter()</code>를 만든 뒤 <code>counter()</code>를 총 ${calls}번 호출했어요. 마지막 호출의 결과값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(calls)], placeholder: '숫자',
          why: `호출할 때마다 count가 1씩 늘어나므로, ${calls}번째 호출에서는 ${calls}가 나와요.`,
          hint: 'count는 호출할 때마다 1씩 늘어나는 값이에요.'
        };
      }
    },
    {
      id: 'functionTypeDefaults',
      title: '함수 타입 매개변수의 기본 람다값',
      ready: true,
      summary: '고차 함수의 람다 매개변수에도 기본값을 지정해서, 호출하는 쪽에서 생략하면 미리 정해둔 동작이 쓰이게 하는 법을 배워요.',
      goals: ['함수 타입 매개변수에 기본값(람다) 지정하기', '생략했을 때와 직접 넘겼을 때 비교하기', '기본 동작을 바꿔치기하는 유연함 이해하기'],
      blocks: [
        {
          h: '람다 매개변수에도 기본값을: = { ... }',
          html: `<p>일반 매개변수처럼, 함수 타입 매개변수에도 <code>= { 기본 동작 }</code> 형태로 기본값을 줄 수 있어요. 호출할 때 그 매개변수를 생략하면 기본 람다가 대신 쓰여요.</p>`,
          code: {
            label: 'function_type_default.kt',
            lang: 'kotlin',
            src: `fun process(numbers: List<Int>, onEach: (Int) -> Unit = { println("값: $it") }) {
    for (n in numbers) {
        onEach(n)
    }
}

process(listOf(1, 2, 3))`,
            out: `값: 1\n값: 2\n값: 3`
          }
        },
        {
          h: '필요할 때만 다른 람다로 바꿔치기',
          html: `<p>기본 동작 그대로 써도 되고, 필요하면 호출할 때 다른 람다를 넘겨서 동작을 바꿀 수도 있어요. 기본값이 있는 매개변수라도 원하면 얼마든지 직접 값을 넘길 수 있어요.</p>`,
          code: {
            label: 'function_type_default_override.kt',
            lang: 'kotlin',
            src: `process(listOf(1, 2, 3)) { n ->
    println("두 배: \${n * 2}")
}`,
            out: `두 배: 2\n두 배: 4\n두 배: 6`
          },
          after: `<div class="note"><b>정리</b> — 함수의 마지막 매개변수가 함수 타입이면, 중괄호 <code>{ }</code>를 괄호 밖으로 빼서 호출할 수 있어요(트레일링 람다). 기본값이 있어도 이 방식으로 바꿔치기할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const nums = Array.from({ length: 3 }, () => randInt(1, 20));
          return {
            type: 'blank',
            q: `<code>fun process(numbers: List<Int>, onEach: (Int) -> Unit = { println("값: $it") }) { for (n in numbers) { onEach(n) } }</code>일 때, <code>process(listOf(${nums.join(', ')}))</code>를 실행하면 첫 번째로 출력되는 줄은? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`값: ${nums[0]}`], placeholder: '출력 줄',
            why: `onEach를 생략했으므로 기본 람다가 쓰여서, 첫 값은 "값: ${nums[0]}"이 출력돼요.`,
            hint: 'onEach를 넘기지 않았으니 기본값으로 정의된 람다가 그대로 실행돼요.'
          };
        },
        () => makeChoice(
          '함수 타입 매개변수에 <code>= { ... }</code>로 기본값을 지정하는 이유는?',
          '호출하는 쪽에서 그 매개변수를 생략해도 미리 정해둔 기본 동작이 대신 쓰이게 하기 위해', ['그 매개변수를 아예 못 쓰게 막기 위해', '함수를 항상 두 번 호출하기 위해', '반환 타입을 Unit으로 고정하기 위해'],
          '기본 람다를 지정해두면, 호출할 때 굳이 매번 같은 람다를 넘기지 않아도 돼요.',
          '일반 매개변수의 기본값과 똑같은 원리예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>fun process(numbers: List<Int>, onEach: (Int) -> Unit ____ { println(it) }) { ... }</code>에서, 기본 람다를 지정하는 데 필요한 기호를 쓰세요.`,
          prefix: 'onEach: (Int) -> Unit ', suffix: ' { println(it) }', accept: ['='], placeholder: '기호',
          why: '<code>=</code> 뒤에 람다를 적으면 그 함수 타입 매개변수의 기본값이 돼요.',
          hint: '일반 매개변수 기본값을 줄 때 쓰던 기호와 같아요.'
        }),
        () => makeChoice(
          '기본값이 있는 함수 타입 매개변수라도, 호출할 때 다른 람다를 직접 넘기면?',
          '넘긴 람다가 기본값 대신 실행된다', ['컴파일 오류가 난다', '기본값과 넘긴 값이 둘 다 실행된다', '아무 일도 일어나지 않는다'],
          '기본값은 "생략했을 때만" 쓰이는 것이라, 직접 넘기면 그 값이 우선이에요.',
          '일반 매개변수의 기본값도 직접 값을 넘기면 그 값이 쓰이는 것과 같아요.'
        ),
        () => ({
          type: 'code',
          q: '<code>numbers: List&lt;Int&gt;</code>를 받고, 각 값에 적용할 <code>transform: (Int) -&gt; Int</code>를 매개변수로 받되 기본값으로 <code>{ it }</code>(그대로 반환)을 갖는 함수 <code>mapAll</code>을, transform이 적용된 새 리스트를 반환하도록 작성하세요.',
          starter: '',
          placeholder: 'fun mapAll(numbers: List<Int>, transform: (Int) -> Int = { it }): List<Int> = numbers.map(transform)',
          accept: ['fun mapAll(numbers: List<Int>, transform: (Int) -> Int = { it }): List<Int> = numbers.map(transform)'],
          why: 'transform 매개변수에 기본값 { it }을 지정해서, 생략하면 값을 그대로 두게 만들어요.',
          hint: 'fun mapAll(numbers: List<Int>, transform: (Int) -> Int = { it }): List<Int> = numbers.map(transform) 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const nums = Array.from({ length: 3 }, () => randInt(1, 15));
        return {
          type: 'blank',
          q: `<code>fun process(numbers: List<Int>, onEach: (Int) -> Unit = { println("값: $it") }) { for (n in numbers) { onEach(n) } }</code>이고 <code>process(listOf(${nums.join(', ')})) { n -> println("두 배: \${n * 2}") }</code>를 실행하면, 마지막으로 출력되는 줄은? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`두 배: ${nums[nums.length - 1] * 2}`], placeholder: '출력 줄',
          why: `트레일링 람다로 onEach를 직접 넘겼으므로 기본값 대신 이 람다가 쓰여서, 마지막 값의 두 배인 "두 배: ${nums[nums.length - 1] * 2}"가 출력돼요.`,
          hint: '괄호 뒤에 붙은 람다가 기본값을 대신해서 쓰여요.'
        };
      }
    },
    {
      id: 'operatorInvokeUnary',
      title: 'invoke와 단항 연산자 오버로딩',
      ready: true,
      summary: '객체를 함수처럼 호출 가능하게 만드는 invoke 연산자와, -x 같은 단항 연산자를 커스텀 타입에 정의하는 법을 배워요.',
      goals: ['operator fun invoke로 객체를 함수처럼 호출하기', 'operator fun unaryMinus로 -연산자 정의하기', '연산자 오버로딩이 코드를 더 읽기 좋게 만드는 경우'],
      blocks: [
        {
          h: '객체를 함수처럼: operator fun invoke',
          html: `<p><code>operator fun invoke(...)</code>를 정의하면, 그 클래스의 인스턴스를 <code>인스턴스(인자)</code>처럼 <b>함수 호출 문법</b>으로 쓸 수 있어요.</p>`,
          code: {
            label: 'invoke_basic.kt',
            lang: 'kotlin',
            src: `class Greeter(val greeting: String) {
    operator fun invoke(name: String): String {
        return "$greeting, $name!"
    }
}

val hello = Greeter("안녕")
println(hello("지수"))`,
            out: `안녕, 지수!`
          }
        },
        {
          h: '부호를 뒤집는 단항 연산자: unaryMinus',
          html: `<p><code>operator fun unaryMinus()</code>를 정의하면, 그 타입의 값 앞에 <code>-</code>를 붙여서 "부호를 뒤집은" 새 값을 만들 수 있어요.</p>`,
          code: {
            label: 'unary_minus.kt',
            lang: 'kotlin',
            src: `data class Point(val x: Int, val y: Int) {
    operator fun unaryMinus(): Point = Point(-x, -y)
}

val p = Point(3, 5)
println(-p)`,
            out: `Point(x=-3, y=-5)`
          },
          after: `<div class="note"><b>정리</b> — <code>+a</code>는 unaryPlus, <code>-a</code>는 unaryMinus, <code>!a</code>는 not에 대응돼요. plus/times처럼 단항 연산자도 정해진 함수 이름이 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const greeting = pick(['안녕', '반가워', '환영해']);
          const name = pick(['민준', '지수', '서연', '하늘']);
          return {
            type: 'blank',
            q: `<code>class Greeter(val greeting: String) { operator fun invoke(name: String): String = "$greeting, $name!" }</code>이고 <code>val g = Greeter("${greeting}")</code>일 때, <code>g("${name}")</code>의 결과는? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${greeting}, ${name}!`], placeholder: '결과 문자열',
            why: `invoke가 호출되어 "${greeting}, ${name}!"이 반환돼요.`,
            hint: 'g("${name}")는 g.invoke("${name}")과 같아요.'
          };
        },
        () => makeChoice(
          'operator fun invoke를 정의하면 가능해지는 일은?',
          '그 클래스의 인스턴스를 마치 함수처럼 인스턴스(인자) 형태로 호출할 수 있다', ['그 클래스를 더 이상 인스턴스화할 수 없다', '모든 프로퍼티가 자동으로 val이 된다', '클래스를 상속할 수 없게 된다'],
          'invoke를 정의하면 인스턴스 뒤에 괄호를 붙여 함수처럼 호출할 수 있어요.',
          '"호출하다(invoke)"라는 이름 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `값 앞에 <code>-</code>를 붙였을 때의 동작(부호 뒤집기)을 정의하려면 재정의해야 하는 함수 이름을 쓰세요.`,
          prefix: 'operator fun ', suffix: '(): Point = Point(-x, -y)', accept: ['unaryMinus'], placeholder: '함수 이름',
          why: '<code>unaryMinus</code>는 <code>-</code> 단항 연산자에 대응돼요.',
          hint: '"단항(unary)"과 "빼기(minus)"를 합친 이름이에요.'
        }),
        () => makeChoice(
          '<code>data class Point(val x: Int, val y: Int) { operator fun unaryMinus() = Point(-x, -y) }</code>일 때, <code>-Point(2, 3)</code>의 결과는?',
          'Point(x=-2, y=-3)', ['Point(x=2, y=3)', 'Point(x=0, y=0)', '컴파일 오류가 난다'],
          'unaryMinus는 x와 y 각각의 부호를 뒤집은 새 Point를 반환해요.',
          '-x, -y를 그대로 적용해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>class Multiplier(val factor: Int)</code>에, <code>Int</code>를 받아 <code>factor</code>를 곱한 값을 반환하는 <code>invoke</code> 연산자 함수를 작성하세요. (함수 정의만)',
          starter: '',
          placeholder: 'operator fun invoke(n: Int): Int = factor * n',
          accept: ['operator fun invoke(n: Int): Int = factor * n'],
          why: '<code>operator fun invoke(n: Int): Int</code> 형태로 정의하면 인스턴스를 함수처럼 호출해서 factor * n을 얻을 수 있어요.',
          hint: 'operator fun invoke(n: Int): Int = factor * n 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const x = randInt(1, 20), y = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>data class Point(val x: Int, val y: Int) { operator fun unaryMinus() = Point(-x, -y) }</code>이고 <code>val p = Point(${x}, ${y})</code>, <code>val result = -p</code>일 때, <code>result.x + result.y</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(-x - y)], placeholder: '숫자',
          why: `result는 Point(x=${-x}, y=${-y})이므로 x + y = ${-x - y}예요.`,
          hint: 'unaryMinus는 x와 y 둘 다 부호를 뒤집어요.'
        };
      }
    },
    {
      id: 'channelsBasics',
      title: '채널(Channel)로 코루틴끼리 데이터 주고받기',
      ready: true,
      summary: '코루틴 사이에서 값을 안전하게 주고받는 통로인 Channel의 기본 사용법을 배워요.',
      goals: ['Channel<T>로 값 보내고 받기', 'send/receive는 suspend 함수라는 것', 'close()로 채널 닫고 for문으로 순회하기'],
      blocks: [
        {
          h: '채널이란: 코루틴 사이의 우편함',
          html: `<p><code>Channel</code>은 코루틴 사이에서 값을 안전하게 주고받을 수 있는 통로예요. 한쪽 코루틴이 <code>send</code>로 값을 넣으면, 다른 쪽 코루틴이 <code>receive</code>로 그 값을 꺼낼 수 있어요.</p>`,
          code: {
            label: 'channel_basic.kt',
            lang: 'kotlin',
            src: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = Channel<Int>()
    launch {
        for (x in 1..3) {
            channel.send(x * x)
        }
        channel.close()
    }
    for (y in channel) {
        println(y)
    }
}`,
            out: `1\n4\n9`
          }
        },
        {
          h: '채널을 닫지 않으면 생기는 일',
          html: `<p>채널의 <code>send</code>는 받는 쪽이 준비될 때까지 기다리고(suspend), <code>receive</code>는 보내는 쪽이 값을 줄 때까지 기다려요. 다 보낸 뒤 <code>close()</code>를 호출하지 않으면, 받는 쪽의 <code>for</code> 루프는 값이 더 안 온다는 걸 알 수 없어서 계속 기다리게 돼요.</p>`,
          after: `<div class="note"><b>정리</b> — Channel은 send/receive라는 suspend 함수로 코루틴 사이에 값을 안전하게 전달하고, close()로 "더 이상 보낼 값이 없다"는 걸 알려줘야 받는 쪽의 for 루프가 끝나요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 6);
          return {
            type: 'blank',
            q: `<code>val channel = Channel<Int>(); launch { for (x in 1..${n}) channel.send(x * x); channel.close() }; for (y in channel) println(y)</code>를 실행하면 "y" 값이 총 몇 번 출력될까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `1부터 ${n}까지 총 ${n}개의 값을 send하므로, 받는 쪽의 for 루프도 ${n}번 실행돼요.`,
            hint: 'send를 몇 번 호출하는지 세어보세요.'
          };
        },
        () => makeChoice(
          '채널에서 close()를 호출하지 않으면 받는 쪽의 for 루프는 어떻게 될까요?',
          '더 이상 값이 오지 않아도 끝나지 않고 계속 기다린다', ['자동으로 예외를 던지며 종료된다', '즉시 마지막 값을 반환하고 끝난다', '채널이 자동으로 닫힌다'],
          'close()는 "더 이상 보낼 값이 없다"는 신호예요. 이 신호가 없으면 받는 쪽은 값이 더 올지 몰라 계속 기다려요.',
          'for 루프가 끝나려면 "끝났다"는 신호가 필요해요.'
        ),
        () => ({
          type: 'blank',
          q: `코루틴 사이에서 값을 안전하게 주고받는 통로 역할을 하는 타입 이름을 쓰세요.`,
          prefix: 'val channel = ', suffix: '<Int>()', accept: ['Channel'], placeholder: '타입 이름',
          why: '<code>Channel</code>은 send/receive로 값을 주고받는 코루틴 간 통로예요.',
          hint: '영어로 "통로", "채널"이라는 뜻이에요.'
        }),
        () => makeChoice(
          'Channel의 send와 receive에 대한 설명으로 옳은 것은?',
          '둘 다 suspend 함수라서 코루틴 안에서만 호출할 수 있다', ['send는 즉시 반환되는 일반 함수다', 'receive는 값이 없으면 항상 null을 즉시 반환한다', 'send와 receive는 같은 코루틴에서만 호출 가능하다'],
          'send는 받는 쪽이 준비될 때까지, receive는 값이 올 때까지 각각 suspend되며 기다려요.',
          '둘 다 이름 앞에 suspend가 붙는다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Channel<String>()</code>을 만들고, launch 블록 안에서 "A", "B"를 순서대로 send한 뒤 close()하는 코드를 작성하세요. (launch 블록 내부만)',
          starter: '',
          rows: 4,
          placeholder: 'channel.send("A")\nchannel.send("B")\nchannel.close()',
          accept: ['channel.send("A")\nchannel.send("B")\nchannel.close()'],
          why: 'send를 순서대로 호출한 뒤 close()로 채널을 닫아, 받는 쪽의 for 루프가 끝날 수 있게 해줘요.',
          hint: 'channel.send("A"), channel.send("B") 다음에 channel.close()를 호출하세요.'
        }),
      ],
      boss: () => {
        const n = randInt(4, 8);
        return {
          type: 'blank',
          q: `<code>val channel = Channel<Int>(); launch { for (x in 1..${n}) channel.send(x * x); channel.close() }; for (y in channel) println(y)</code>를 실행할 때, 마지막으로 출력되는 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(n * n)], placeholder: '숫자',
          why: `마지막 x는 ${n}이므로 마지막으로 출력되는 값은 ${n} * ${n} = ${n * n}이에요.`,
          hint: '가장 마지막에 send되는 x 값의 제곱을 계산해보세요.'
        };
      }
    },
    {
      id: 'sharedFlowBasics',
      title: 'SharedFlow로 이벤트 방송하기',
      ready: true,
      summary: '값 하나를 저장하는 StateFlow와 달리, 값을 저장하지 않고 여러 구독자에게 그 순간 흘려보내는 SharedFlow의 기본 개념을 배워요.',
      goals: ['MutableSharedFlow로 이벤트 흘려보내기', 'emit으로 값 보내고 collect로 받기', 'StateFlow와 SharedFlow의 차이 이해하기'],
      blocks: [
        {
          h: 'StateFlow와 다른 점: 값을 저장하지 않아요',
          html: `<p><code>StateFlow</code>는 항상 최신 값 하나를 들고 있지만, <code>SharedFlow</code>는 기본적으로 값을 저장하지 않고 그 순간 구독 중인 곳에만 이벤트를 "방송"해요. 그래서 알림이나 클릭 이벤트처럼 "한 번 발생하고 끝나는 일"을 표현하는 데 적합해요.</p>`,
          code: {
            label: 'sharedflow_basic.kt',
            lang: 'kotlin',
            src: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    val events = MutableSharedFlow<String>()
    val job = launch {
        events.collect { println("받음: $it") }
    }
    delay(10)
    events.emit("클릭")
    events.emit("드래그")
    delay(10)
    job.cancel()
}`,
            out: `받음: 클릭\n받음: 드래그`
          }
        },
        {
          h: 'replay로 지나간 값도 다시 받기',
          html: `<p><code>MutableSharedFlow(replay = n)</code>처럼 replay 값을 주면, 새로 구독을 시작한 곳도 최근 n개의 이벤트를 다시 받을 수 있어요. replay가 0(기본값)이면 구독을 시작한 이후의 이벤트만 받아요.</p>`,
          after: `<div class="note"><b>정리</b> — StateFlow는 "현재 상태" 하나를 항상 보관하고, SharedFlow는 "이벤트"를 그 순간 구독자들에게 흘려보내요. replay로 지나간 이벤트를 얼마나 다시 보여줄지 조절할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 50), b = randInt(51, 99);
          return {
            type: 'blank',
            q: `<code>val events = MutableSharedFlow<Int>(); launch { events.collect { println(it) } }; delay(10); events.emit(${a}); events.emit(${b})</code>를 실행하면 가장 먼저 출력되는 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a)], placeholder: '숫자',
            why: `emit은 호출한 순서대로 실행되므로, 먼저 emit한 ${a}가 먼저 출력돼요.`,
            hint: '먼저 emit한 값을 확인해보세요.'
          };
        },
        () => makeChoice(
          'StateFlow와 SharedFlow의 가장 큰 차이는?',
          'StateFlow는 항상 최신 값 하나를 저장하지만, SharedFlow는 기본적으로 값을 저장하지 않고 방송만 한다', ['SharedFlow는 코루틴 없이도 collect할 수 있다', 'StateFlow는 여러 구독자를 가질 수 없다', 'SharedFlow는 emit 없이 자동으로 값을 생성한다'],
          'StateFlow는 .value로 항상 꺼내볼 수 있는 "현재 상태"를 저장하지만, SharedFlow는 저장 없이 이벤트를 흘려보내는 데 초점이 있어요.',
          '"상태(state)"와 "이벤트"의 차이를 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `SharedFlow에 값을 흘려보낼 때 호출하는 suspend 함수 이름을 쓰세요.`,
          prefix: 'events.', suffix: '(value)', accept: ['emit'], placeholder: '함수 이름',
          why: '<code>emit</code>은 SharedFlow(및 Flow)에 값을 흘려보내는 suspend 함수예요.',
          hint: '"내보내다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>MutableSharedFlow<Int>(replay = 2)</code>로 만들면?',
          '새로 구독을 시작해도 최근 2개의 이벤트를 다시 받을 수 있다', ['이벤트를 최대 2번만 보낼 수 있다', '구독자가 최대 2명까지만 가능하다', 'replay는 collect 속도를 2배로 만든다'],
          'replay는 "새 구독자에게 다시 보여줄 지나간 이벤트의 개수"를 뜻해요.',
          '"다시(re) 재생(play)"라는 이름 그대로예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>MutableSharedFlow<String>()</code> 타입의 프로퍼티 events가 있을 때, launch 블록 안에서 events를 collect하며 받은 값을 그대로 println하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'events.collect { println(it) }',
          accept: ['events.collect { println(it) }'],
          why: 'collect는 흘러오는 값을 계속 받아서, 람다 안에서 그 값(it)으로 원하는 동작을 할 수 있어요.',
          hint: 'events.collect { println(it) } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 20), b = randInt(21, 40), c = randInt(41, 60);
        return {
          type: 'blank',
          q: `<code>val events = MutableSharedFlow<Int>(); launch { events.collect { println(it) } }; delay(10); events.emit(${a}); events.emit(${b}); events.emit(${c})</code>를 실행하면 마지막으로 출력되는 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(c)], placeholder: '숫자',
          why: `emit은 순서대로 실행되므로, 가장 마지막에 emit한 ${c}가 마지막으로 출력돼요.`,
          hint: '가장 나중에 emit한 값을 확인해보세요.'
        };
      }
    },
    {
      id: 'coroutineExceptionHandler',
      title: 'CoroutineExceptionHandler와 supervisorScope',
      ready: true,
      summary: '코루틴에서 발생한 예외를 한 곳에서 처리하는 CoroutineExceptionHandler와, 자식의 실패가 다른 자식에게 번지지 않게 막는 supervisorScope를 배워요.',
      goals: ['CoroutineExceptionHandler로 처리되지 않은 예외 잡기', 'supervisorScope로 형제 코루틴 보호하기', 'coroutineScope와의 차이 이해하기'],
      blocks: [
        {
          h: '처리되지 않은 예외를 한 곳에서 잡기',
          html: `<p>코루틴 안에서 던져진 예외를 try-catch로 잡지 않으면, 그 예외는 부모 Job을 타고 올라가요. <code>CoroutineExceptionHandler</code>를 코루틴의 최상위 컨텍스트에 넣어두면, 처리되지 않은 예외가 발생했을 때 한 곳에서 잡아 처리할 수 있어요.</p>`,
          code: {
            label: 'exception_handler.kt',
            lang: 'kotlin',
            src: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val handler = CoroutineExceptionHandler { _, e ->
        println("잡음: \${e.message}")
    }
    val scope = CoroutineScope(SupervisorJob() + handler)
    val job = scope.launch {
        throw RuntimeException("문제 발생")
    }
    job.join()
    println("끝")
}`,
            out: `잡음: 문제 발생\n끝`
          }
        },
        {
          h: '형제를 지켜주는 supervisorScope',
          html: `<p>일반 <code>coroutineScope</code>에서는 자식 코루틴 하나가 실패하면 다른 형제 코루틴도 함께 취소돼요. 반면 <code>supervisorScope</code> 안에서는 자식 하나가 실패해도 다른 형제는 영향받지 않고 계속 실행돼요.</p>`,
          code: {
            label: 'supervisor_scope.kt',
            lang: 'kotlin',
            src: `import kotlinx.coroutines.*

fun main() = runBlocking {
    val handler = CoroutineExceptionHandler { _, e ->
        println("child1 실패: \${e.message}")
    }
    supervisorScope {
        launch(handler) {
            throw RuntimeException("문제")
        }
        launch {
            delay(50)
            println("child2 계속 실행됨")
        }
    }
    println("끝")
}`,
            out: `child1 실패: 문제\nchild2 계속 실행됨\n끝`
          },
          after: `<div class="note"><b>정리</b> — 일반 coroutineScope였다면 child1이 실패하는 즉시 child2도 함께 취소되지만, supervisorScope는 자식들을 서로 독립적으로 다루기 때문에 child2가 끝까지 실행돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const msg = pick(['문제 발생', '전송 실패', '연결 끊김', '잘못된 값']);
          return {
            type: 'blank',
            q: `<code>val handler = CoroutineExceptionHandler { _, e -> println("잡음: \${e.message}") }; val scope = CoroutineScope(SupervisorJob() + handler); scope.launch { throw RuntimeException("${msg}") }.join(); println("끝")</code>을 실행하면 첫 줄에 무엇이 출력될까요?`,
            prefix: '잡음: ', suffix: '', accept: [msg], placeholder: '메시지',
            why: `핸들러가 예외의 메시지(e.message)를 그대로 출력하므로 "${msg}"가 출력돼요.`,
            hint: 'CoroutineExceptionHandler의 e.message는 던진 예외의 메시지 그대로예요.'
          };
        },
        () => makeChoice(
          'CoroutineExceptionHandler는 언제 호출될까요?',
          '처리되지 않은 예외가 코루틴 계층의 최상위까지 전파되었을 때', ['try-catch로 이미 잡은 예외에 대해서도 항상 호출된다', 'async로 만든 코루틴이 실패했을 때도 await 없이 자동으로 호출된다', '일반 함수에서 예외가 발생했을 때도 호출된다'],
          'CoroutineExceptionHandler는 launch처럼 결과를 기다리지 않는 코루틴이 실패했을 때, 그 예외가 잡히지 않고 최상위까지 올라오면 호출돼요. async의 예외는 await()에서 다시 던져져요.',
          '이미 잡힌 예외나 async의 예외는 handler가 관여하지 않아요.'
        ),
        () => ({
          type: 'blank',
          q: `coroutineScope와 달리, 자식 코루틴 하나가 실패해도 다른 형제 코루틴이 취소되지 않게 만드는 함수 이름을 쓰세요.`,
          prefix: '', suffix: ' { launch { ... }; launch { ... } }', accept: ['supervisorScope'], placeholder: '함수 이름',
          why: '<code>supervisorScope</code>는 자식들의 실패를 서로 독립적으로 다뤄, 하나가 실패해도 다른 자식은 계속 실행돼요.',
          hint: '"감독하다(supervise)"라는 뜻의 단어가 들어가요.'
        }),
        () => makeChoice(
          'supervisorScope 안에서 child1이 예외를 던지고, child2는 정상적으로 delay 후 값을 출력한다면?',
          'child2는 취소되지 않고 끝까지 실행되어 값을 출력한다', ['child1이 실패하는 즉시 child2도 함께 취소된다', 'supervisorScope 자체가 즉시 예외를 던지며 종료된다', 'child2는 실행되지만 값은 출력되지 않는다'],
          'supervisorScope는 자식들의 실패를 서로 전파하지 않으므로, child1이 실패해도 child2는 영향받지 않아요.',
          '"형제를 지켜준다"는 supervisorScope의 역할을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: 'handler라는 CoroutineExceptionHandler가 이미 정의되어 있을 때, SupervisorJob()과 handler를 합쳐서 scope라는 CoroutineScope를 만드는 코드를 작성하세요.',
          starter: '',
          placeholder: 'val scope = CoroutineScope(SupervisorJob() + handler)',
          accept: ['val scope = CoroutineScope(SupervisorJob() + handler)'],
          why: 'CoroutineScope(SupervisorJob() + handler) 형태로, 자식 실패가 전파되지 않는 SupervisorJob과 예외를 처리할 handler를 함께 컨텍스트로 넣어줘요.',
          hint: 'CoroutineScope(...) 안에 SupervisorJob() + handler를 넣어보세요.'
        }),
      ],
      boss: () => {
        const msg2 = pick(['타임아웃', '권한 없음', '데이터 없음', '네트워크 오류']);
        return {
          type: 'blank',
          q: `<code>val handler = CoroutineExceptionHandler { _, e -> println("잡음: \${e.message}") }; val scope = CoroutineScope(SupervisorJob() + handler); scope.launch { throw RuntimeException("${msg2}") }.join(); println("끝")</code>을 실행하면 첫 줄에 무엇이 출력될까요?`,
          prefix: '잡음: ', suffix: '', accept: [msg2], placeholder: '메시지',
          why: `핸들러가 예외 메시지를 그대로 출력하므로 "${msg2}"가 출력돼요.`,
          hint: '핸들러의 e.message는 던진 예외의 메시지 그대로예요.'
        };
      }
    },
    {
      id: 'contractsSmartCast',
      title: 'contract로 커스텀 스마트캐스트 만들기',
      ready: true,
      summary: '내가 만든 함수도 스마트캐스트가 되도록 컴파일러에게 알려주는 contract 블록의 기본 사용법을 배워요.',
      goals: ['contract 블록과 returns()/implies 조합 이해하기', '커스텀 null 검사 함수에서 스마트캐스트 되게 만들기', '@OptIn(ExperimentalContracts::class) 사용법'],
      blocks: [
        {
          h: '왜 내가 만든 함수는 스마트캐스트가 안 될까요',
          html: `<p>Kotlin은 <code>if (x != null)</code> 같은 검사 뒤에는 자동으로 스마트캐스트를 해주지만, 내가 만든 <code>fun isNotNull(x: Any?): Boolean</code> 같은 함수 안에서 null을 검사해도 컴파일러는 그 사실을 모르기 때문에, 호출하는 쪽에서는 스마트캐스트가 되지 않아요.</p>`,
          code: {
            label: 'no_contract.kt',
            lang: 'kotlin',
            src: `fun isNotNull(x: Any?): Boolean {
    return x != null
}

fun printLength(x: String?) {
    if (isNotNull(x)) {
        // x는 여전히 String?로 취급되어 x.length는 컴파일 오류
        println(x?.length)
    }
}

fun main() {
    printLength("안녕")
}`,
            out: `2`
          }
        },
        {
          h: 'contract로 컴파일러에게 알려주기',
          html: `<p>함수 안에 <code>contract { returns(true) implies (x != null) }</code>를 써주면, "이 함수가 true를 반환했다면 x는 null이 아니다"라는 사실을 컴파일러에게 알려줄 수 있어요. 이 기능은 아직 실험적(Experimental)이라 <code>@OptIn(ExperimentalContracts::class)</code>가 필요해요.</p>`,
          code: {
            label: 'with_contract.kt',
            lang: 'kotlin',
            src: `import kotlin.contracts.ExperimentalContracts
import kotlin.contracts.contract

@OptIn(ExperimentalContracts::class)
fun isNotNull(x: Any?): Boolean {
    contract {
        returns(true) implies (x != null)
    }
    return x != null
}

@OptIn(ExperimentalContracts::class)
fun printLength(x: String?) {
    if (isNotNull(x)) {
        println(x.length)
    }
}

fun main() {
    printLength("안녕하세요")
}`,
            out: `5`
          },
          after: `<div class="note"><b>정리</b> — contract는 함수의 반환값과 매개변수 상태(null 아님 등) 사이의 관계를 컴파일러에게 알려주는 선언이에요. requireNotNull이나 check 같은 표준 라이브러리 함수도 내부적으로 contract를 사용해서 스마트캐스트를 가능하게 만들어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `contract 블록에서 "이 함수가 true를 반환했다면 x는 null이 아니다"라는 뜻을 표현할 때는 <code>returns(true) ____ (x != null)</code> 형태를 써요. 빈칸에 들어갈 단어를 쓰세요.`,
          prefix: 'returns(true) ', suffix: ' (x != null)', accept: ['implies'], placeholder: '단어',
          why: '<code>implies</code>는 "~라면 ...이다"라는 뜻으로, 반환값과 조건 사이의 관계를 표현해요.',
          hint: '"암시하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'contract 기능을 사용하려면 함수 위에 어떤 어노테이션을 붙여야 할까요?',
          '@OptIn(ExperimentalContracts::class)', ['@JvmStatic', '@Suppress("UNCHECKED_CAST")', '@Deprecated'],
          'contract는 아직 실험적 기능이라 @OptIn(ExperimentalContracts::class)로 명시적으로 동의해야 사용할 수 있어요.',
          '실험적(Experimental) 기능임을 떠올려보세요.'
        ),
        () => makeChoice(
          'contract 없이 만든 fun isNotNull(x: Any?): Boolean = x != null을 호출해 true를 확인해도, 그 함수 밖에서 x는 어떻게 취급될까요?',
          '여전히 원래의 nullable 타입으로 취급되어 스마트캐스트가 되지 않는다', ['자동으로 non-null 타입으로 스마트캐스트된다', '컴파일 오류가 발생한다', 'x가 자동으로 String으로 변환된다'],
          'contract가 없으면 컴파일러는 함수의 반환값과 매개변수 사이의 관계를 알 수 없어서, 스마트캐스트를 해주지 않아요.',
          'contract 없이는 컴파일러가 "관계"를 알 방법이 없어요.'
        ),
        () => ({
          type: 'blank',
          q: `contract 블록 안에서 "이 함수가 반환한 값이 true일 때"를 표현하는 함수 이름을 쓰세요.`,
          prefix: '', suffix: '(true) implies (x != null)', accept: ['returns'], placeholder: '함수 이름',
          why: '<code>returns(true)</code>는 "이 함수가 true를 반환했다면"이라는 조건을 나타내요.',
          hint: '"반환하다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'code',
          q: 'x가 null이 아닐 때 true를 반환한다는 것을 나타내는 contract 한 줄을 작성하세요.',
          starter: '',
          placeholder: 'contract { returns(true) implies (x != null) }',
          accept: ['contract { returns(true) implies (x != null) }'],
          why: 'contract { returns(true) implies (x != null) } 형태로, "true를 반환했다면 x는 null이 아니다"를 컴파일러에게 알려줘요.',
          hint: 'contract { returns(true) implies (x != null) } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => ({
        type: 'blank',
        q: `contract 기능을 사용할 때 <code>@OptIn(____::class)</code> 형태로 동의해야 하는, 실험적 기능임을 표시하는 클래스 이름을 쓰세요.`,
        prefix: '@OptIn(', suffix: '::class)', accept: ['ExperimentalContracts'], placeholder: '클래스 이름',
        why: 'contract 관련 API는 아직 실험적이라 ExperimentalContracts에 대한 OptIn이 필요해요.',
        hint: '"실험적인 계약(contract)"이라는 뜻의 이름이에요.'
      })
    },
    {
      id: 'propertyDelegatesStdlib',
      title: '표준 위임 프로퍼티: observable과 vetoable',
      ready: true,
      summary: 'Delegates.observable과 Delegates.vetoable을 이용해, 값이 바뀔 때 자동으로 반응하거나 특정 변경을 거부하는 프로퍼티를 만드는 법을 배워요.',
      goals: ['Delegates.observable로 값 변경 감지하기', 'Delegates.vetoable로 특정 변경 막기', '커스텀 getValue/setValue 없이 표준 위임 쓰는 이유'],
      blocks: [
        {
          h: '값이 바뀔 때마다 알려주는 observable',
          html: `<p><code>kotlin.properties.Delegates.observable(초기값) { property, old, new -> ... }</code>을 쓰면, 프로퍼티 값이 바뀔 때마다 그 변화를 콜백으로 자동으로 알려줘요. 매번 커스텀 setter를 직접 쓰지 않아도 돼요.</p>`,
          code: {
            label: 'observable_basic.kt',
            lang: 'kotlin',
            src: `import kotlin.properties.Delegates

class User {
    var name: String by Delegates.observable("이름없음") { _, old, new ->
        println("$old -> $new")
    }
}

fun main() {
    val user = User()
    user.name = "지민"
    user.name = "서연"
}`,
            out: `이름없음 -> 지민\n지민 -> 서연`
          }
        },
        {
          h: '특정 변경을 거부하는 vetoable',
          html: `<p><code>Delegates.vetoable(초기값) { property, old, new -> 조건 }</code>은 콜백이 <code>true</code>를 반환할 때만 실제로 값을 바꾸고, <code>false</code>를 반환하면 변경을 거부(veto)하고 이전 값을 그대로 유지해요.</p>`,
          code: {
            label: 'vetoable_basic.kt',
            lang: 'kotlin',
            src: `import kotlin.properties.Delegates

class Account {
    var balance: Int by Delegates.vetoable(0) { _, old, new ->
        new >= 0
    }
}

fun main() {
    val acc = Account()
    acc.balance = 100
    println(acc.balance)
    acc.balance = -50
    println(acc.balance)
}`,
            out: `100\n100`
          },
          after: `<div class="note"><b>정리</b> — observable은 항상 변경을 허용하면서 "알려만" 주고, vetoable은 콜백의 반환값에 따라 변경 자체를 "막을 수도" 있어요. 둘 다 by lazy처럼 kotlin.properties.Delegates가 미리 만들어둔 위임이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = pick(['민준', '지우', '하은', '도윤']);
          return {
            type: 'blank',
            q: `<code>var name: String by Delegates.observable("이름없음") { _, old, new -> println("$old -> $new") }</code>이고 <code>user.name = "${a}"</code>를 실행하면 무엇이 출력될까요?`,
            prefix: '', suffix: '', accept: [`이름없음 -> ${a}`], placeholder: '이전값 -> 새값',
            why: `초기값 "이름없음"에서 "${a}"로 바뀌었으므로 "이름없음 -> ${a}"가 출력돼요.`,
            hint: '콜백은 old -> new 형태로 출력해요.'
          };
        },
        () => makeChoice(
          'Delegates.vetoable의 콜백이 false를 반환하면 어떻게 될까요?',
          '값 변경이 거부되고 이전 값이 그대로 유지된다', ['프로그램이 예외를 던지며 종료된다', '값이 강제로 null이 된다', '콜백이 다시 한 번 더 호출된다'],
          'vetoable은 콜백이 false를 반환하면 "거부권(veto)"을 행사한 것으로 보고, 대입 자체를 무시하고 이전 값을 유지해요.',
          '"거부하다(veto)"라는 이름 뜻 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `값이 바뀔 때마다 콜백으로 알려주기만 하고, 항상 변경을 허용하는 표준 위임 함수 이름을 쓰세요.`,
          prefix: 'Delegates.', suffix: '(초기값) { _, old, new -> ... }', accept: ['observable'], placeholder: '함수 이름',
          why: '<code>observable</code>은 값이 바뀔 때마다 콜백을 호출하지만, 변경 자체를 막지는 않아요.',
          hint: '"관찰 가능한"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>Delegates.vetoable(0) { _, old, new -> new >= 0 }</code>로 만든 프로퍼티에 -10을 대입하면?',
          '조건(new >= 0)이 false이므로 대입이 거부되고 값은 그대로 유지된다', ['값이 -10으로 바뀐다', '즉시 컴파일 오류가 발생한다', '값이 0으로 초기화된다'],
          '-10은 new >= 0을 만족하지 못하므로 콜백이 false를 반환하고, vetoable은 이 변경을 거부해요.',
          '조건을 만족하지 못하는 값은 거부돼요.'
        ),
        () => ({
          type: 'code',
          q: 'Delegates.observable(0) { _, old, new -> println("$old -> $new") }로 위임되는 count라는 Int 프로퍼티 선언(var)을 작성하세요.',
          starter: '',
          placeholder: 'var count: Int by Delegates.observable(0) { _, old, new -> println("$old -> $new") }',
          accept: ['var count: Int by Delegates.observable(0) { _, old, new -> println("$old -> $new") }'],
          why: 'var 프로퍼티명: 타입 by Delegates.observable(초기값) { ... } 형태로 선언해요.',
          hint: 'var count: Int by Delegates.observable(0) { _, old, new -> println("$old -> $new") } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const first = randInt(10, 200);
        return {
          type: 'blank',
          q: `<code>var balance: Int by Delegates.vetoable(0) { _, old, new -> new >= 0 }</code>이고, <code>acc.balance = ${first}</code> 다음 <code>acc.balance = -1</code>을 실행한 뒤 <code>println(acc.balance)</code>를 하면 무엇이 출력될까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(first)], placeholder: '숫자',
          why: `-1은 new >= 0 조건을 만족하지 못해 거부되므로, balance는 여전히 ${first}예요.`,
          hint: '조건을 만족하지 못하는 변경은 거부되고 이전 값이 유지돼요.'
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
