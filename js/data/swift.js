/* Swift 강의·문제 데이터 — 단원을 추가하려면 units 배열에 항목을 넣으면 됩니다. */
COURSES.swift = {
    name: 'Swift',
    tagline: 'iOS·Mac 앱 개발을 위한, 안전하고 현대적인 애플의 프로그래밍 언어',
    units: [{
      id: 'intro',
      title: '스위프트는 어떤 언어인가요?',
      ready: true,
      intro: true,
      summary: '스위프트가 무엇이고, 어디에 쓰이고, 왜 배우면 좋은지 알아봐요.',
      blocks: [
        {
          h: '스위프트는 어떤 언어인가요?',
          html: `<p>스위프트는 애플이 2014년에 발표한 언어로, 기존에 아이폰·맥 앱을 만들 때 쓰던 오브젝티브-C를 대신하기 위해 만들어졌어요. 문법이 간결하고 읽기 쉬우면서도, 실행 속도는 빠르고 안전성을 매우 중요하게 여기는 것이 가장 큰 특징이에요.</p>`
        },
        {
          h: '어디에 쓰이나요?',
          html: `<p>아이폰·아이패드용 iOS 앱, 맥용 macOS 앱, 애플워치용 앱을 만들 때 표준으로 쓰이는 언어예요. 서버 개발(Vapor 같은 프레임워크)에도 쓰이지만, 가장 널리 알려진 쓰임새는 역시 애플 생태계의 앱 개발이에요.</p>`
        },
        {
          h: '왜 배우면 좋을까요?',
          html: `<p>스위프트의 시그니처 개념은 "옵셔널(Optional)"이에요. 값이 있을 수도, 없을 수도 있다는 걸 타입 시스템으로 명확히 표현해서, "값이 없는데 사용하려다 앱이 멈추는" 종류의 오류를 컴파일 시점에 미리 막아줘요. 처음엔 낯설지만, 익숙해지면 훨씬 안전한 코드를 짤 수 있게 돼요.</p>`,
          after: `<div class="note"><b>팁</b> — 이 단원은 읽기만 하면 되고, 문제나 예제는 없어요. 다음 단원부터 진짜 코드를 써보기 시작해요!</div>`
        }
      ]
    },
    {
      id: 'letVarConstants',
      title: '변수와 상수: let과 var',
      ready: true,
      summary: 'let으로 상수를, var로 변수를 선언하고 스위프트의 타입 추론을 이해해요.',
      goals: ['let으로 상수 선언하기', 'var로 값이 바뀌는 변수 선언하기', '타입 추론이 무엇인지 이해하기'],
      blocks: [
        {
          h: 'let: 값이 바뀌지 않는 상수',
          html: `<p>스위프트에서 <code>let</code>으로 선언한 값은 한 번 정해지면 다시 바꿀 수 없어요. 이런 값을 <b>상수(constant)</b>라고 불러요. 값이 바뀔 일이 없다면 항상 <code>let</code>을 먼저 고려하는 게 스위프트다운 습관이에요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `let name = "지수"
let age = 17
print(name)
print(age)`,
            out: `지수
17`
          }
        },
        {
          h: 'var: 값이 바뀔 수 있는 변수',
          html: `<p>값을 나중에 바꿔야 한다면 <code>var</code>로 선언해요. <code>let</code>으로 선언한 값을 다시 대입하려고 하면 컴파일 오류가 나요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `var score = 80
score = 95
print(score)`,
            out: `95`
          },
          after: `<div class="note"><b>정리</b> — 타입을 따로 적지 않아도 스위프트가 오른쪽 값을 보고 타입을 알아서 정해줘요. 이걸 <b>타입 추론(type inference)</b>이라고 해요. <code>let age: Int = 17</code>처럼 타입을 직접 적을 수도 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `값이 나중에 바뀌지 않는 상수를 선언할 때 쓰는 스위프트 키워드를 쓰세요.`,
          prefix: '', suffix: ' name = "지수"', accept: ['let'], placeholder: '키워드',
          why: '<code>let</code>으로 선언한 값은 상수라서 다시 대입할 수 없어요.',
          hint: '영어 단어 그대로, 세 글자예요.'
        }),
        () => makeChoice(
          '나중에 값을 다시 대입할 수 있는 변수를 선언하는 키워드는?',
          'var', ['let', 'const', 'int'],
          '<code>var</code>로 선언한 값은 이후에 다른 값을 다시 대입할 수 있어요.',
          '"variable(변수)"의 줄임말이에요.'
        ),
        () => {
          const start = randInt(10, 20);
          const added = randInt(1, 9);
          return {
            type: 'blank',
            q: `<code>var count = ${start}\ncount = count + ${added}\nprint(count)</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(start + added)], placeholder: '숫자',
            why: `count는 ${start}에서 ${added}만큼 늘어난 ${start + added}로 재대입돼요.`,
            hint: 'var로 선언했으니 재대입이 가능해요.'
          };
        },
        () => makeChoice(
          '<code>let age = 17</code>로 선언한 뒤 <code>age = 18</code>을 실행하면 어떻게 되나요?',
          '컴파일 오류(상수를 재대입할 수 없음)', ['정상 실행되고 18이 출력됨', '경고만 뜨고 정상 실행됨', '자동으로 var로 바뀜'],
          'let으로 선언한 값은 상수라서, 다시 대입하면 컴파일 오류가 나요.',
          '스위프트는 상수 규칙을 엄격히 지켜요.'
        ),
        () => ({
          type: 'code',
          q: '<code>message</code>라는 상수를 <code>"안녕"</code>으로 선언하고, <code>print</code>로 출력하는 두 줄짜리 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'let message = "안녕"\nprint(message)',
          accept: ['let message = "안녕"\nprint(message)'],
          why: 'let으로 상수를 선언한 뒤 print로 출력하면 돼요.',
          hint: 'let message = "안녕" 다음 줄에 print(message)'
        }),
      ],
      boss: () => {
        const start = randInt(1, 10);
        const added = randInt(1, 10);
        return {
          type: 'blank',
          q: `<code>var total = ${start}\ntotal = total + ${added}\nprint(total)</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(start + added)], placeholder: '숫자',
          why: `total은 ${start}에서 ${added}만큼 늘어난 ${start + added}로 재대입돼요.`,
          hint: 'var 변수는 자기 자신을 이용해 재대입할 수 있어요.'
        };
      }
    },
    {
      id: 'basicTypes',
      title: '기본 자료형',
      ready: true,
      summary: '스위프트의 정수, 실수, 불리언, 문자열 타입을 배워요.',
      goals: ['Int와 Double 구분하기', 'Bool과 String 사용하기', '타입 주석(type annotation) 문법 익히기'],
      blocks: [
        {
          h: '숫자 타입: Int와 Double',
          html: `<p>정수는 <code>Int</code>, 소수점이 있는 실수는 <code>Double</code>을 주로 써요. 콜론(:) 뒤에 타입을 적는 걸 <b>타입 주석(type annotation)</b>이라고 해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `let age: Int = 17
let pi: Double = 3.14
print(age)
print(pi)`,
            out: `17
3.14`
          }
        },
        {
          h: 'Bool과 String',
          html: `<p><code>Bool</code>은 <code>true</code>/<code>false</code>만 가지고, <code>String</code>은 큰따옴표로 감싼 문자열이에요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `let isAdult: Bool = false
let grade: String = "A"
print(isAdult)
print(grade)`,
            out: `false
A`
          },
          after: `<div class="note"><b>정리</b> — 타입을 안 적으면 스위프트가 값을 보고 타입을 추론해요(정수는 <code>Int</code>, 소수는 <code>Double</code>). 하지만 함수의 매개변수·반환 타입은 항상 명시해야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '소수점이 있는 값(예: 3.14)을 담는 스위프트의 기본 실수 타입은?',
          'Double', ['Int', 'Bool', 'String'],
          '<code>Double</code>은 스위프트에서 소수점이 있는 값을 담는 기본 타입이에요.',
          '실수의 영어 표현과는 다른, 스위프트 고유의 이름이에요.'
        ),
        () => ({
          type: 'blank',
          q: `참/거짓 값 하나만 담을 수 있는 스위프트 타입 이름을 쓰세요.`,
          prefix: 'let isAdult: ', suffix: ' = false', accept: ['Bool'], placeholder: '타입 이름',
          why: '<code>Bool</code>은 true 또는 false만 담을 수 있는 타입이에요.',
          hint: '"boolean"을 줄인 이름이에요.'
        }),
        () => makeChoice(
          '<code>let grade: String = "A"</code>에서 문자열을 감싸는 기호는?',
          '큰따옴표(")', ['작은따옴표(\')', '중괄호({})', '대괄호([])'],
          '스위프트의 문자열은 큰따옴표로 감싸요. 작은따옴표는 사용하지 않아요.',
          'C 계열 언어와 달리 스위프트는 문자 하나도 큰따옴표를 써요.'
        ),
        () => ({
          type: 'blank',
          q: `정수를 담는 스위프트의 기본 타입 이름을 쓰세요.`,
          prefix: 'let age: ', suffix: ' = 17', accept: ['Int'], placeholder: '타입 이름',
          why: '<code>Int</code>는 스위프트의 기본 정수 타입이에요.',
          hint: '"integer"를 줄인 이름이에요.'
        }),
        () => ({
          type: 'code',
          q: '<code>name</code>을 <code>String</code> 타입 <code>"민준"</code>으로, <code>height</code>를 <code>Double</code> 타입 <code>172.5</code>로 선언하는 두 줄짜리 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'let name: String = "민준"\nlet height: Double = 172.5',
          accept: ['let name: String = "민준"\nlet height: Double = 172.5'],
          why: '타입 주석은 콜론 뒤에 타입 이름을 적어서 표현해요.',
          hint: 'let 이름: 타입 = 값 형태를 두 번 반복하면 돼요.'
        }),
      ],
      boss: () => {
        const isAdult = pick([true, false]);
        return {
          type: 'blank',
          q: `<code>let isAdult: Bool = ${isAdult}\nprint(isAdult)</code>를 실행하면 무엇이 출력될까요?`,
          prefix: '', suffix: '', accept: [String(isAdult)], placeholder: '출력 결과',
          why: `print는 변수에 담긴 값을 그대로 출력하므로 ${isAdult}가 출력돼요.`,
          hint: 'Bool 값은 true 또는 false 그대로 출력돼요.'
        };
      }
    },
    {
      id: 'printAndInterpolation',
      title: 'print()와 문자열 보간',
      ready: true,
      summary: 'print()로 값을 출력하고, \\(값) 문법으로 문자열 안에 값을 끼워 넣어요.',
      goals: ['print()로 값 출력하기', '문자열 보간(\\(expr)) 사용하기', '여러 값을 한 문자열로 합치기'],
      blocks: [
        {
          h: 'print(): 화면에 값 출력하기',
          html: `<p><code>print()</code>는 괄호 안의 값을 출력하고 자동으로 줄바꿈을 추가해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `print("Hello, World!")
print(42)`,
            out: `Hello, World!
42`
          }
        },
        {
          h: '문자열 보간: \\(expr)',
          html: `<p>문자열 안에 변수나 계산 결과를 끼워 넣고 싶을 때는 <code>\\(expr)</code> 문법을 써요. 다른 언어의 <code>+</code> 이어붙이기보다 훨씬 읽기 쉬워요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `let name = "지수"
let age = 17
print("이름: \\(name), 나이: \\(age)")
print("내년 나이: \\(age + 1)")`,
            out: `이름: 지수, 나이: 17
내년 나이: 18`
          },
          after: `<div class="note"><b>정리</b> — <code>\\(expr)</code> 안에는 변수뿐 아니라 <code>age + 1</code> 같은 계산식도 그대로 넣을 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `화면에 값을 출력할 때 쓰는 스위프트 함수 이름을 쓰세요.`,
          prefix: '', suffix: '("Hi")', accept: ['print'], placeholder: '함수 이름',
          why: '<code>print</code>는 괄호 안의 값을 출력하고 줄바꿈을 추가해요.',
          hint: '영어로 "출력하다"라는 뜻이에요.'
        }),
        () => makeChoice(
          '문자열 안에 변수 값을 끼워 넣을 때 쓰는 스위프트 문법은?',
          '\\(expr)', ['${expr}', '#{expr}', '%s'],
          '스위프트는 백슬래시와 괄호로 <code>\\(expr)</code> 형태의 문자열 보간을 써요.',
          'JavaScript의 ${}와는 다른 기호를 써요.'
        ),
        () => {
          const a = randInt(1, 50);
          const b = randInt(1, 50);
          return {
            type: 'blank',
            q: `<code>let a = ${a}\nlet b = ${b}\nprint("합계: \\(a + b)")</code>를 실행하면? (형식: 합계: 숫자)`,
            prefix: '', suffix: '', accept: [`합계: ${a + b}`], placeholder: '출력 결과',
            why: `문자열 보간 안의 <code>a + b</code>가 계산되어 ${a + b}가 그 자리에 들어가요.`,
            hint: '보간 문법 안의 계산식이 먼저 계산돼요.'
          };
        },
        () => makeChoice(
          '<code>print("A", "B")</code>처럼 두 값을 콤마로 넘기면 기본적으로 어떻게 출력되나요?',
          'A B (공백으로 구분)', ['AB (붙여서)', 'A,B (콤마로)', 'A\\nB (줄바꿈으로)'],
          'print는 여러 인자를 받으면 기본적으로 공백 하나로 구분해서 출력해요.',
          'print의 separator 기본값은 공백이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>score</code>를 88로 선언하고, <code>"점수: \\(score)"</code> 형태로 출력하는 두 줄짜리 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'let score = 88\nprint("점수: \\(score)")',
          accept: ['let score = 88\nprint("점수: \\(score)")'],
          why: '문자열 보간 \\(score)를 이용해 값을 문자열 안에 끼워 넣어요.',
          hint: 'let score = 88 다음 print("점수: \\(score)")'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>let name = "${name}"\nlet age = ${age}\nprint("\\(name)는 \\(age)살입니다")</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`${name}는 ${age}살입니다`], placeholder: '출력 결과',
          why: '문자열 보간에 들어간 name과 age 값이 그 자리에 그대로 치환돼요.',
          hint: '\\(name)과 \\(age) 자리에 각각 값을 넣어보세요.'
        };
      }
    },
    {
      id: 'ifElse',
      title: '조건문: if와 else',
      ready: true,
      summary: 'if/else if/else로 조건에 따라 다른 코드를 실행해요.',
      goals: ['if/else 문법 익히기', 'else if로 여러 조건 나열하기', '비교/논리 연산자 사용하기'],
      blocks: [
        {
          h: 'if와 else: 조건에 따라 갈라지기',
          html: `<p>스위프트의 <code>if</code>는 조건을 <b>괄호 없이</b> 쓰고, 중괄호는 반드시 있어야 해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `let age = 17
if age >= 18 {
    print("성인")
} else {
    print("미성년자")
}`,
            out: `미성년자`
          }
        },
        {
          h: 'else if: 여러 조건 나열하기',
          html: `<p>조건이 여러 개면 <code>else if</code>를 이어붙여요. 위에서부터 순서대로 검사하다가 처음 참인 조건의 블록만 실행해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `let score = 85
if score >= 90 {
    print("A")
} else if score >= 80 {
    print("B")
} else {
    print("C")
}`,
            out: `B`
          },
          after: `<div class="note"><b>정리</b> — 스위프트는 조건이 반드시 <code>Bool</code>이어야 해요. C나 JavaScript처럼 <code>if (1)</code> 같은 숫자를 조건으로 쓸 수 없어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '스위프트의 if 조건에 반드시 중괄호({})가 필요한가요?',
          '네, 한 줄이어도 항상 필요해요', ['아니요, 한 줄이면 생략 가능해요', '조건이 참일 때만 필요해요', '함수 안에서만 필요해요'],
          '스위프트는 코드 블록이 한 줄이어도 항상 중괄호가 필요해요.',
          'Python과 달리 들여쓰기만으로는 블록을 구분하지 않아요.'
        ),
        () => {
          const score = randInt(60, 100);
          const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D';
          return {
            type: 'blank',
            q: `<code>let score = ${score}\nif score >= 90 { print("A") } else if score >= 80 { print("B") } else if score >= 70 { print("C") } else { print("D") }</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [grade], placeholder: '등급',
            why: `score(${score})가 해당하는 첫 번째 조건의 블록만 실행돼서 ${grade}가 출력돼요.`,
            hint: '위에서부터 순서대로 조건을 검사해요.'
          };
        },
        () => makeChoice(
          '<code>if 1 { print("hi") }</code>처럼 정수를 조건으로 쓰면 스위프트는 어떻게 되나요?',
          '컴파일 오류(Bool 타입이 아님)', ['1은 참으로 취급되어 실행됨', '0이 아니면 항상 참', '경고만 뜨고 정상 동작'],
          '스위프트의 if 조건은 반드시 Bool이어야 해서, Int를 그대로 쓰면 컴파일 오류가 나요.',
          'C 계열과 달리 스위프트는 타입을 엄격히 검사해요.'
        ),
        () => ({
          type: 'blank',
          q: `여러 조건을 위에서부터 순서대로 이어서 검사할 때 <code>if</code> 사이에 붙이는 키워드를 쓰세요.`,
          prefix: 'if a { } ', suffix: ' if b { } else { }', accept: ['else'], placeholder: '키워드',
          why: '<code>else if</code>는 앞 조건이 거짓일 때 다음 조건을 검사해요.',
          hint: '조건이 거짓일 때 다음 단계로 넘어간다는 뜻의 단어예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>temperature</code>가 30 이상이면 "더워요", 아니면 "괜찮아요"를 출력하는 if/else 코드를 작성하세요. (temperature는 이미 선언되어 있다고 가정)',
          starter: '',
          rows: 5,
          placeholder: 'if temperature >= 30 {\n    print("더워요")\n} else {\n    print("괜찮아요")\n}',
          accept: ['if temperature >= 30 {\n    print("더워요")\n} else {\n    print("괜찮아요")\n}'],
          why: 'if 조건 { } else { } 형태로 두 가지 경우를 나눠요.',
          hint: 'if temperature >= 30 { print("더워요") } else { print("괜찮아요") }'
        }),
      ],
      boss: () => {
        const age = randInt(10, 25);
        const result = age >= 18 ? '성인' : '미성년자';
        return {
          type: 'blank',
          q: `<code>let age = ${age}\nif age >= 18 { print("성인") } else { print("미성년자") }</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [result], placeholder: '출력 결과',
          why: `age(${age})가 18 이상이므로 ${result}가 출력돼요.` ,
          hint: '18 이상인지 아닌지를 먼저 확인해보세요.'
        };
      }
    },
    {
      id: 'switchBasics',
      title: 'switch: 강력한 패턴 매칭',
      ready: true,
      summary: 'switch로 여러 경우를 깔끔하게 나누고, 스위프트 switch의 특징(break 불필요, 범위 매칭)을 배워요.',
      goals: ['switch 기본 문법 익히기', 'case에서 범위(range) 매칭하기', '스위프트 switch가 모든 경우를 다뤄야 함을 이해하기'],
      blocks: [
        {
          h: 'switch: 값에 따라 분기하기',
          html: `<p><code>switch</code>는 값 하나를 여러 <code>case</code>와 비교해요. 스위프트의 switch는 다른 case로 흘러 들어가지 않아서(no fallthrough), C처럼 <code>break</code>를 안 써도 돼요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `let grade = "B"
switch grade {
case "A":
    print("최고예요")
case "B":
    print("잘했어요")
default:
    print("좀 더 힘내요")
}`,
            out: `잘했어요`
          }
        },
        {
          h: 'case에서 범위 매칭하기',
          html: `<p>스위프트의 switch는 <code>case 90...100</code>처럼 숫자 범위도 case로 쓸 수 있어요. 또한 스위프트의 switch는 <b>모든 경우</b>를 다뤄야 하므로, 나머지를 처리할 <code>default</code>가 꼭 필요해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `let score = 85
switch score {
case 90...100:
    print("A")
case 80..<90:
    print("B")
default:
    print("C 이하")
}`,
            out: `B`
          },
          after: `<div class="note"><b>정리</b> — <code>90...100</code>은 90부터 100까지(양 끝 포함), <code>80..<90</code>은 80부터 89까지(90 미포함)를 나타내요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '스위프트의 switch에서 다른 case로 자동으로 흘러 들어가는(fallthrough) 동작이 기본인가요?',
          '아니요, 기본적으로 흘러 들어가지 않아요', ['네, C처럼 항상 흘러 들어가요', 'default가 있을 때만 흘러 들어가요', '숫자 case일 때만 흘러 들어가요'],
          '스위프트의 switch는 각 case가 끝나면 자동으로 switch를 빠져나가요. break를 따로 쓸 필요가 없어요.',
          'C/Java와 가장 다른 점 중 하나예요.'
        ),
        () => ({
          type: 'blank',
          q: `switch에서 어떤 case에도 해당하지 않을 때 실행되는 case의 이름을 쓰세요.`,
          prefix: '', suffix: ':\n    print("기타")', accept: ['default'], placeholder: 'case 이름',
          why: '<code>default</code>는 다른 어떤 case와도 맞지 않을 때 실행돼요.',
          hint: '"기본값"이라는 뜻의 영어 단어예요.'
        }),
        () => {
          const score = randInt(60, 100);
          const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D';
          return {
            type: 'blank',
            q: `<code>let score = ${score}\nswitch score {\ncase 90...100: print("A")\ncase 80..<90: print("B")\ncase 70..<80: print("C")\ndefault: print("D")\n}</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [grade], placeholder: '등급',
            why: `score(${score})가 속하는 범위의 case가 실행되어 ${grade}가 출력돼요.`,
            hint: '..<는 마지막 숫자를 포함하지 않아요.'
          };
        },
        () => makeChoice(
          '<code>80..<90</code>이 나타내는 범위는?',
          '80부터 89까지(90 미포함)', ['80부터 90까지(90 포함)', '81부터 90까지', '80만 포함'],
          '<code>..<</code>는 마지막 숫자를 포함하지 않는 범위예요.',
          '<code>...</code>과 <code>..<</code>의 차이를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>day</code>(문자열)가 "토" 또는 "일"이면 "주말", 그 외에는 "평일"을 출력하는 switch 코드를 작성하세요. (day는 이미 선언되어 있다고 가정)',
          starter: '',
          rows: 6,
          placeholder: 'switch day {\ncase "토", "일":\n    print("주말")\ndefault:\n    print("평일")\n}',
          accept: ['switch day {\ncase "토", "일":\n    print("주말")\ndefault:\n    print("평일")\n}'],
          why: '콤마로 여러 값을 한 case에 나열할 수 있어요.',
          hint: 'case "토", "일": 처럼 콤마로 값을 나열해보세요.'
        }),
      ],
      boss: () => {
        const score = randInt(60, 100);
        const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D 이하';
        return {
          type: 'blank',
          q: `<code>let score = ${score}\nswitch score {\ncase 90...100: print("A")\ncase 80..<90: print("B")\ncase 70..<80: print("C")\ndefault: print("D 이하")\n}</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [grade], placeholder: '등급',
          why: `score(${score})가 속한 범위에 맞는 결과인 ${grade}가 출력돼요.`,
          hint: '범위를 하나씩 확인해보세요.'
        };
      }
    },
{
      id: 'forLoops',
      title: '반복문: for-in과 범위',
      ready: true,
      summary: 'for-in으로 배열이나 범위를 순회하고, ...과 ..<의 차이를 이해해요.',
      goals: ['for-in 기본 문법 익히기', '범위(1...5, 0..<5) 순회하기', '_ 로 값을 무시하며 반복하기'],
      blocks: [
        {
          h: 'for-in: 범위 순회하기',
          html: `<p><code>for i in 1...5</code>처럼 범위를 순회하며 반복할 수 있어요. <code>1...5</code>는 1부터 5까지(양 끝 포함)예요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `for i in 1...5 {
    print(i)
}`,
            out: `1
2
3
4
5`
          }
        },
        {
          h: '_ 로 값을 무시하며 반복하기',
          html: `<p>반복 횟수만 중요하고 순번 값 자체는 필요 없다면 <code>_</code>를 써서 무시할 수 있어요. <code>0..<5</code>는 0부터 4까지(5 미포함)예요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `var total = 0
for _ in 0..<5 {
    total += 1
}
print(total)`,
            out: `5`
          },
          after: `<div class="note"><b>정리</b> — 배열을 순회할 때도 <code>for item in items</code>처럼 for-in을 그대로 쓸 수 있어요. 배열은 다음 단원들에서 자세히 배워요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>1...5</code>와 <code>1..<5</code>의 차이는?',
          '...은 5를 포함하고, ..<는 5를 포함하지 않아요', ['둘 다 같은 범위예요', '...은 1을 포함하지 않아요', '..<는 역순으로 반복해요'],
          '<code>...</code>는 양 끝을 모두 포함하고, <code>..<</code>는 마지막 값을 제외해요.',
          '점 3개와 점 2개+부등호를 비교해보세요.'
        ),
        () => {
          const n = randInt(3, 8);
          return {
            type: 'blank',
            q: `<code>var total = 0\nfor _ in 0..<${n} { total += 1 }\nprint(total)</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `0..<${n}은 총 ${n}번 반복되므로 total은 ${n}이 돼요.`,
            hint: '0부터 시작해서 몇 번 도는지 세어보세요.'
          };
        },
        () => makeChoice(
          '반복 변수의 값이 필요 없을 때 관용적으로 쓰는 이름은?',
          '_', ['i', 'x', 'none'],
          '<code>_</code>는 "이 값은 사용하지 않는다"는 뜻을 명확히 표현해요.',
          '변수 이름이 아니라 특수 기호예요.'
        ),
        () => {
          const start = randInt(1, 3);
          const end = randInt(4, 7);
          let sum = 0;
          for (let i = start; i <= end; i++) sum += i;
          return {
            type: 'blank',
            q: `<code>var sum = 0\nfor i in ${start}...${end} { sum += i }\nprint(sum)</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
            why: `${start}부터 ${end}까지의 합은 ${sum}이에요.`,
            hint: '...는 양 끝을 모두 포함해서 더해요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>1</code>부터 <code>3</code>까지(포함) <code>for-in</code>으로 순회하며 각 값을 <code>print</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'for i in 1...3 {\n    print(i)\n}',
          accept: ['for i in 1...3 {\n    print(i)\n}'],
          why: '1...3은 1, 2, 3을 순서대로 순회해요.',
          hint: 'for i in 1...3 { print(i) }'
        }),
      ],
      boss: () => {
        const n = randInt(3, 6);
        let sum = 0;
        for (let i = 1; i <= n; i++) sum += i;
        return {
          type: 'blank',
          q: `<code>var sum = 0\nfor i in 1...${n} { sum += i }\nprint(sum)</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `1부터 ${n}까지 더한 값은 ${sum}이에요.`,
          hint: '1...${n}은 1부터 ${n}까지 포함해요.'.replace(/\$\{n\}/g, n)
        };
      }
    },
    {
      id: 'whileLoops',
      title: '반복문: while과 repeat-while',
      ready: true,
      summary: '조건이 참인 동안 반복하는 while과, 최소 한 번은 실행하는 repeat-while을 배워요.',
      goals: ['while 반복문 사용하기', 'repeat-while과 while의 차이 이해하기', '무한 루프와 break 활용하기'],
      blocks: [
        {
          h: 'while: 조건이 참인 동안 반복',
          html: `<p><code>while</code>은 조건을 먼저 검사하고, 참이면 블록을 실행해요. 조건이 거짓이 될 때까지 반복해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `var count = 0
while count < 3 {
    print(count)
    count += 1
}`,
            out: `0
1
2`
          }
        },
        {
          h: 'repeat-while: 먼저 실행하고 나중에 검사',
          html: `<p><code>repeat { } while 조건</code>은 다른 언어의 do-while과 같아요. 블록을 <b>먼저 한 번 실행</b>한 뒤에 조건을 검사해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `var n = 10
repeat {
    print(n)
    n += 1
} while n < 10`,
            out: `10`
          },
          after: `<div class="note"><b>정리</b> — repeat-while은 조건이 처음부터 거짓이어도 블록을 최소 한 번은 실행해요. while은 조건이 처음부터 거짓이면 한 번도 실행하지 않아요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'while과 repeat-while의 가장 큰 차이는?',
          'repeat-while은 최소 한 번은 블록을 실행해요', ['while은 항상 무한 반복돼요', 'repeat-while은 조건을 검사하지 않아요', '둘은 완전히 동일해요'],
          'repeat-while은 조건 검사 전에 블록을 먼저 실행하므로, 최소 한 번은 실행돼요.',
          '조건을 검사하는 시점이 다르다는 걸 떠올려보세요.'
        ),
        () => {
          const limit = randInt(3, 6);
          return {
            type: 'blank',
            q: `<code>var count = 0\nwhile count < ${limit} { count += 1 }\nprint(count)</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(limit)], placeholder: '숫자',
            why: `count가 ${limit}이 되는 순간 조건이 거짓이 되어 반복이 멈춰요.`,
            hint: '조건이 거짓이 되는 값을 찾아보세요.'
          };
        },
        () => makeChoice(
          '<code>while 5 < 3 { print("hi") }</code>는 몇 번 실행되나요?',
          '0번(조건이 처음부터 거짓)', ['1번', '무한 반복', '오류 발생'],
          'while은 조건을 먼저 검사하는데, 5 < 3은 거짓이므로 한 번도 실행되지 않아요.',
          '조건을 먼저 검사한다는 걸 기억하세요.'
        ),
        () => ({
          type: 'blank',
          q: `블록을 먼저 실행한 뒤 조건을 검사하는 반복문을 만들 때 <code>while</code> 앞에 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: ' { print("hi") } while false', accept: ['repeat'], placeholder: '키워드',
          why: '<code>repeat { } while 조건</code>은 블록을 먼저 실행하고 나중에 조건을 검사해요.',
          hint: '"반복하다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>n</code>을 0으로 선언하고, <code>n</code>이 3보다 작은 동안 <code>n</code>을 출력하고 1씩 늘리는 while 반복문을 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'var n = 0\nwhile n < 3 {\n    print(n)\n    n += 1\n}',
          accept: ['var n = 0\nwhile n < 3 {\n    print(n)\n    n += 1\n}'],
          why: 'while 조건이 참인 동안 블록을 반복 실행해요.',
          hint: 'var n = 0 다음 while n < 3 { print(n); n += 1 }'
        }),
      ],
      boss: () => {
        const limit = randInt(4, 8);
        let sum = 0, i = 0;
        while (i < limit) { sum += i; i++; }
        return {
          type: 'blank',
          q: `<code>var i = 0\nvar sum = 0\nwhile i < ${limit} { sum += i; i += 1 }\nprint(sum)</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `0부터 ${limit - 1}까지 더한 값은 ${sum}이에요.`,
          hint: 'i가 0부터 ${limit}보다 작은 동안 sum에 더해져요.'.replace('${limit}', limit)
        };
      }
    },
    {
      id: 'optionalsIntro',
      title: '옵셔널(Optional): 값이 없을 수도 있다는 것',
      ready: true,
      summary: '스위프트의 시그니처 개념인 옵셔널을 배우고, nil이 무엇인지 이해해요.',
      goals: ['옵셔널(Int?, String?)이 무엇인지 이해하기', 'nil의 의미 알기', '강제 언래핑(!)의 위험성 이해하기'],
      blocks: [
        {
          h: '옵셔널: 값이 있을 수도, 없을 수도',
          html: `<p>타입 뒤에 물음표(<code>?</code>)를 붙이면 <b>옵셔널</b>이 돼요. 옵셔널은 "값이 있을 수도 있고, 아예 없을(<code>nil</code>) 수도 있다"는 걸 타입으로 표현해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `var middleName: String? = nil
middleName = "하늘"
print(middleName)`,
            out: `Optional("하늘")`
          }
        },
        {
          h: '강제 언래핑(!)의 위험성',
          html: `<p>옵셔널 뒤에 <code>!</code>를 붙이면 "무조건 값이 있다"고 강제로 꺼낼 수 있어요(강제 언래핑). 하지만 실제로 값이 <code>nil</code>이면 앱이 그 자리에서 멈춰버려요(런타임 크래시). 그래서 꼭 필요한 경우가 아니면 피해야 해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `let age: Int? = 17
print(age!)`,
            out: `17`
          },
          after: `<div class="note"><b>정리</b> — <code>Int?</code>는 "Int일 수도, nil일 수도 있다"는 뜻이에요. 값을 안전하게 꺼내는 방법(옵셔널 바인딩)은 다음 단원에서 배워요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '타입 뒤에 물음표(?)를 붙인 <code>Int?</code>가 뜻하는 것은?',
          'Int 값이 있을 수도, nil일 수도 있다', ['항상 Int 값이 있다', '항상 nil이다', 'Int 배열이다'],
          '<code>?</code>가 붙은 타입은 옵셔널로, 값이 없을 수도(nil) 있다는 걸 나타내요.',
          '물음표는 "확실하지 않다"는 느낌을 담고 있어요.'
        ),
        () => ({
          type: 'blank',
          q: `값이 없음을 나타내는 스위프트의 특별한 값을 쓰세요.`,
          prefix: 'var x: Int? = ', suffix: '', accept: ['nil'], placeholder: '값',
          why: '<code>nil</code>은 "값이 없음"을 나타내는 특별한 값이에요.',
          hint: '다른 언어의 null/None과 비슷한 개념이에요.'
        }),
        () => makeChoice(
          '옵셔널 값 뒤에 <code>!</code>를 붙여 강제로 꺼냈는데 실제 값이 nil이면 어떻게 되나요?',
          '런타임 오류로 앱이 멈춰요(크래시)', ['자동으로 기본값이 채워져요', '아무 일도 일어나지 않아요', '컴파일 시점에 미리 막아줘요'],
          '강제 언래핑(!)한 값이 실제로 nil이면 실행 중에 크래시가 발생해요. 그래서 꼭 필요할 때만 신중하게 써야 해요.',
          '강제 언래핑은 "무조건 값이 있다"고 컴파일러에게 약속하는 거예요.'
        ),
        () => ({
          type: 'blank',
          q: `옵셔널 값 뒤에 붙여서 강제로 값을 꺼내는 기호를 쓰세요.`,
          prefix: 'age', suffix: '', accept: ['!'], placeholder: '기호',
          why: '<code>!</code>는 옵셔널을 강제로 언래핑해서 값을 꺼내요.',
          hint: '느낌표 기호예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>nickname</code>이라는 변수를 <code>String?</code> 타입으로 선언하고 <code>nil</code>로 초기화하는 한 줄 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'var nickname: String? = nil',
          accept: ['var nickname: String? = nil'],
          why: '타입 뒤에 ?를 붙이면 옵셔널이 되고, nil로 초기화할 수 있어요.',
          hint: 'var nickname: String? = nil'
        }),
      ],
      boss: () => makeChoice(
        '다음 중 옵셔널에 대한 설명으로 올바른 것은?',
        '값이 있을 수도, nil일 수도 있음을 타입 시스템으로 표현한다', ['모든 스위프트 값은 항상 옵셔널이어야 한다', '옵셔널은 배열에서만 쓸 수 있다', 'nil은 0과 완전히 같은 값이다'],
        '옵셔널은 스위프트가 "값 없음"의 가능성을 안전하게 다루기 위한 핵심 개념이에요.',
        '스위프트의 시그니처 개념을 떠올려보세요.'
      )
    },
    {
      id: 'optionalBinding',
      title: '옵셔널 바인딩: if let과 guard let',
      ready: true,
      summary: '안전하게 옵셔널 값을 꺼내는 if let과 guard let 문법을 배워요.',
      goals: ['if let으로 옵셔널 값 안전하게 꺼내기', 'guard let으로 조기 종료하며 언래핑하기', '강제 언래핑보다 안전한 이유 이해하기'],
      blocks: [
        {
          h: 'if let: 값이 있을 때만 실행',
          html: `<p><code>if let 새이름 = 옵셔널값</code>은 옵셔널에 값이 들어있으면 그 값을 새 상수에 담아 블록을 실행하고, <code>nil</code>이면 블록을 건너뛰어요. 크래시 위험이 없는 안전한 방법이에요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `let middleName: String? = "하늘"
if let name = middleName {
    print("중간 이름: \\(name)")
} else {
    print("중간 이름 없음")
}`,
            out: `중간 이름: 하늘`
          }
        },
        {
          h: 'guard let: 값이 없으면 바로 빠져나가기',
          html: `<p><code>guard let</code>은 값이 없으면 즉시 함수를 벗어나고(<code>return</code>), 값이 있으면 그 이후 코드에서 언래핑된 값을 계속 쓸 수 있어요. "일찍 실패하고, 나머지 코드는 정상 경로로만 채운다"는 스타일이에요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `func greet(name: String?) {
    guard let name = name else {
        print("이름이 없어요")
        return
    }
    print("안녕, \\(name)!")
}
greet(name: "지수")
greet(name: nil)`,
            out: `안녕, 지수!
이름이 없어요`
          },
          after: `<div class="note"><b>정리</b> — <code>if let</code>은 값이 있을 때 실행할 블록이 중심이고, <code>guard let</code>은 값이 없을 때 조기 종료하는 게 중심이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>if let name = middleName { ... }</code>에서 middleName이 nil이면 어떻게 되나요?',
          'if 블록을 건너뛰고 그 다음(else나 이후 코드)으로 진행해요', ['크래시가 발생해요', 'name에 0이 대입돼요', '컴파일 오류가 나요'],
          'if let은 값이 없으면 안전하게 블록을 건너뛰어요. 크래시가 나지 않아요.',
          '강제 언래핑(!)과 다르게 안전하다는 게 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `값이 없으면 즉시 함수를 빠져나가고, 값이 있으면 이후 코드에서 계속 쓸 수 있게 해주는 키워드 조합을 쓰세요. (guard ___)`,
          prefix: 'guard ', suffix: ' name = name else { return }', accept: ['let'], placeholder: '키워드',
          why: '<code>guard let</code>은 값이 없으면 조기 종료하고, 있으면 나머지 코드에서 언래핑된 값을 계속 쓸 수 있게 해요.',
          hint: 'if let에서도 쓰는 그 키워드예요.'
        }),
        () => makeChoice(
          'guard let 뒤에는 반드시 무엇이 있어야 하나요?',
          'else 블록(값이 없을 때 실행할 코드, 보통 return 포함)', ['default 블록', 'catch 블록', '아무것도 필요 없다'],
          'guard let ... else { }에서 else 블록은 값이 없을 때 실행되고, 보통 함수를 벗어나는 return이 들어가요.',
          'guard는 항상 "실패했을 때 어떻게 할지"를 함께 적어야 해요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>let age: Int? = 20\nif let a = age { print("나이: \\(a)") } else { print("없음") }</code>를 실행하면?`,
          prefix: '', suffix: '', accept: ['나이: 20'], placeholder: '출력 결과',
          why: 'age에 값 20이 들어있으므로 if let 블록이 실행되어 "나이: 20"이 출력돼요.',
          hint: 'age가 nil이 아니라 값을 가지고 있어요.'
        }),
        () => ({
          type: 'code',
          q: '<code>score</code>가 <code>Int?</code> 타입일 때, <code>if let</code>으로 값을 <code>s</code>라는 이름으로 꺼내 <code>print(s)</code>하고, 없으면 <code>print("없음")</code>을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'if let s = score {\n    print(s)\n} else {\n    print("없음")\n}',
          accept: ['if let s = score {\n    print(s)\n} else {\n    print("없음")\n}'],
          why: 'if let으로 옵셔널 값을 안전하게 꺼내서 사용해요.',
          hint: 'if let s = score { print(s) } else { print("없음") }'
        }),
      ],
      boss: () => {
        const hasValue = pick([true, false]);
        const val = randInt(1, 100);
        return {
          type: 'blank',
          q: `<code>let x: Int? = ${hasValue ? val : 'nil'}\nif let v = x { print("값: \\(v)") } else { print("없음") }</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [hasValue ? `값: ${val}` : '없음'], placeholder: '출력 결과',
          why: hasValue ? `x가 ${val}이라는 값을 가지고 있으므로 "값: ${val}"이 출력돼요.` : 'x가 nil이므로 else 블록의 "없음"이 출력돼요.',
          hint: 'x가 nil인지 아닌지 먼저 확인해보세요.'
        };
      }
    },
    {
      id: 'optionalChaining',
      title: '옵셔널 체이닝: ?.',
      ready: true,
      summary: '?.으로 옵셔널 안의 프로퍼티나 메서드에 안전하게 접근하는 방법을 배워요.',
      goals: ['옵셔널 체이닝(?.) 문법 이해하기', '체인 중간에 nil이 있으면 전체가 nil이 되는 원리 알기', '옵셔널 메서드 호출 결과 다루기'],
      blocks: [
        {
          h: '?.: 옵셔널 값의 프로퍼티에 안전하게 접근',
          html: `<p>옵셔널 값 뒤에 <code>?.</code>를 쓰면, 값이 있을 때만 그 뒤의 프로퍼티나 메서드에 접근해요. 값이 <code>nil</code>이면 전체 결과가 <code>nil</code>이 되고, 크래시는 나지 않아요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Profile {
    var nickname: String
}
var profile: Profile? = Profile(nickname: "코딩왕")
print(profile?.nickname)`,
            out: `Optional("코딩왕")`
          }
        },
        {
          h: 'nil이면 체인 전체가 nil',
          html: `<p><code>profile</code>이 <code>nil</code>이면, <code>profile?.nickname</code> 전체가 <code>nil</code>이 돼요. 크래시 없이 안전하게 "값이 없다"는 결과만 얻게 돼요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Profile {
    var nickname: String
}
var profile: Profile? = nil
print(profile?.nickname)`,
            out: `nil`
          },
          after: `<div class="note"><b>정리</b> — <code>?.</code>는 여러 단계로 이어 쓸 수도 있어요(<code>a?.b?.c</code>). 중간에 하나라도 nil이면 전체 결과가 nil이 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '옵셔널 체이닝(<code>?.</code>)을 쓰는 이유는?',
          '중간 값이 nil이어도 크래시 없이 안전하게 접근하기 위해', ['강제로 값을 꺼내기 위해', '항상 nil을 반환하게 만들기 위해', '반복문을 대신하기 위해'],
          '?.은 값이 nil일 수 있는 상황에서도 크래시 없이 안전하게 프로퍼티/메서드에 접근하게 해줘요.',
          '강제 언래핑(!)과 정반대의 안전한 접근 방식이에요.'
        ),
        () => ({
          type: 'blank',
          q: `옵셔널 값 뒤에서 프로퍼티나 메서드에 안전하게 접근할 때 쓰는 기호를 쓰세요. (물음표 포함)`,
          prefix: 'profile', suffix: 'nickname', accept: ['?.'], placeholder: '기호',
          why: '<code>?.</code>는 옵셔널 체이닝 문법이에요.',
          hint: '물음표와 마침표가 붙어 있어요.'
        }),
        () => makeChoice(
          '<code>var profile: Profile? = nil</code>일 때 <code>profile?.nickname</code>의 결과는?',
          'nil', ['빈 문자열("")', '크래시 발생', '컴파일 오류'],
          'profile 자체가 nil이므로, ?. 체이닝 전체 결과도 nil이 돼요. 크래시는 나지 않아요.',
          '중간에 nil이 있으면 어떻게 되는지 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>a?.b?.c</code>에서 <code>b</code>가 nil이면 전체 결과는 무엇이 되나요?`,
          prefix: '', suffix: '', accept: ['nil'], placeholder: '결과값',
          why: '옵셔널 체이닝은 중간에 하나라도 nil이면 전체 체인의 결과가 nil이 돼요.',
          hint: '체인 어디선가 끊기면 전체가 어떻게 될지 생각해보세요.'
        }),
        () => ({
          type: 'code',
          q: '<code>profile</code>이 <code>Profile?</code> 타입일 때, 옵셔널 체이닝으로 <code>nickname</code> 프로퍼티를 <code>print</code>로 출력하는 한 줄 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'print(profile?.nickname)',
          accept: ['print(profile?.nickname)'],
          why: '옵셔널 체이닝 ?.을 이용해 안전하게 프로퍼티에 접근해요.',
          hint: 'print(profile?.nickname)'
        }),
      ],
      boss: () => {
        const isNil = pick([true, false]);
        return {
          type: 'blank',
          q: `<code>struct Profile { var nickname: String }\nvar profile: Profile? = ${isNil ? 'nil' : 'Profile(nickname: "코딩왕")'}\nprint(profile?.nickname)</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [isNil ? 'nil' : 'Optional("코딩왕")'], placeholder: '출력 결과',
          why: isNil ? 'profile이 nil이므로 체이닝 전체 결과도 nil이에요.' : 'profile이 값을 가지고 있으므로 nickname이 Optional로 감싸져 출력돼요.',
          hint: 'profile 자체가 nil인지 아닌지 먼저 확인해보세요.'
        };
      }
    },
    {
      id: 'nilCoalescing',
      title: 'nil 병합 연산자: ??',
      ready: true,
      summary: '옵셔널이 nil일 때 대신 쓸 기본값을 지정하는 ?? 연산자를 배워요.',
      goals: ['?? 연산자의 동작 이해하기', '옵셔널 체이닝과 ??를 함께 쓰기', '기본값 패턴 익히기'],
      blocks: [
        {
          h: '??: nil이면 기본값 쓰기',
          html: `<p><code>옵셔널값 ?? 기본값</code>은, 옵셔널값이 있으면 그 값을, <code>nil</code>이면 기본값을 결과로 내놔요. 매번 if let을 쓰지 않아도 되는 간결한 방법이에요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `let nickname: String? = nil
let displayName = nickname ?? "손님"
print(displayName)`,
            out: `손님`
          }
        },
        {
          h: '옵셔널 체이닝과 함께 쓰기',
          html: `<p><code>?.</code>와 <code>??</code>를 함께 쓰면, "값이 있으면 그 값을 쓰고, 중간에 nil이 있으면 기본값을 쓴다"는 패턴을 한 줄로 표현할 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Profile {
    var nickname: String
}
var profile: Profile? = nil
print(profile?.nickname ?? "손님")`,
            out: `손님`
          },
          after: `<div class="note"><b>정리</b> — <code>??</code>의 오른쪽은 왼쪽이 nil일 때만 계산돼요(지연 평가). 그래서 오른쪽에 함수 호출을 넣어도 불필요할 때는 실행되지 않아요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>a ?? b</code>는 언제 b를 결과로 내놓나요?',
          'a가 nil일 때', ['a가 nil이 아닐 때', '항상', 'b가 nil이 아닐 때'],
          '<code>??</code>는 왼쪽 값이 nil일 때만 오른쪽 값을 결과로 써요.',
          '"a가 없으면 대신 b를 쓴다"는 뜻이에요.'
        ),
        () => {
          const hasValue = pick([true, false]);
          const val = randInt(1, 100);
          return {
            type: 'blank',
            q: `<code>let x: Int? = ${hasValue ? val : 'nil'}\nlet result = x ?? 0\nprint(result)</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(hasValue ? val : 0)], placeholder: '숫자',
            why: hasValue ? `x가 ${val}이라는 값을 가지고 있으므로 그대로 ${val}이 돼요.` : 'x가 nil이므로 ?? 뒤의 기본값 0이 쓰여요.',
            hint: 'x가 nil인지 아닌지가 핵심이에요.'
          };
        },
        () => ({
          type: 'blank',
          q: `옵셔널 값이 nil일 때 대신 쓸 기본값을 지정하는 연산자를 쓰세요. (물음표 두 개)`,
          prefix: 'nickname ', suffix: ' "손님"', accept: ['??'], placeholder: '연산자',
          why: '<code>??</code>는 nil 병합 연산자로, 왼쪽이 nil이면 오른쪽 값을 대신 써요.',
          hint: '물음표 두 개예요.'
        }),
        () => makeChoice(
          '<code>profile?.nickname ?? "손님"</code>에서 profile 자체가 nil이면 결과는?',
          '"손님"', ['nil', '빈 문자열', '크래시 발생'],
          'profile이 nil이면 profile?.nickname 전체가 nil이 되고, ??가 그 nil을 받아 "손님"을 결과로 내놔요.',
          '옵셔널 체이닝 결과가 nil이 되는 경우를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>age</code>가 <code>Int?</code> 타입일 때, <code>??</code>를 이용해 nil이면 0을 쓰도록 하여 <code>result</code>라는 상수에 담는 한 줄 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'let result = age ?? 0',
          accept: ['let result = age ?? 0'],
          why: '?? 연산자로 nil일 때의 기본값을 지정해요.',
          hint: 'let result = age ?? 0'
        }),
      ],
      boss: () => {
        const hasValue = pick([true, false]);
        const name = pick(['지수', '민준', '서연']);
        return {
          type: 'blank',
          q: `<code>let nickname: String? = ${hasValue ? `"${name}"` : 'nil'}\nprint(nickname ?? "손님")</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [hasValue ? name : '손님'], placeholder: '출력 결과',
          why: hasValue ? `nickname이 "${name}"이라는 값을 가지고 있으므로 그대로 출력돼요.` : 'nickname이 nil이므로 ?? 뒤의 "손님"이 출력돼요.',
          hint: 'nickname이 nil인지 확인해보세요.'
        };
      }
    },
{
      id: 'functionsBasics',
      title: '함수: func, 매개변수, 반환 타입',
      ready: true,
      summary: 'func으로 함수를 정의하고, 매개변수와 반환 타입을 명시하는 방법을 배워요.',
      goals: ['func으로 함수 정의하기', '매개변수와 반환 타입(-> 타입) 쓰기', '값을 반환하지 않는 함수 만들기'],
      blocks: [
        {
          h: 'func: 함수 정의하기',
          html: `<p><code>func 이름(매개변수: 타입) -> 반환타입 { }</code> 형태로 함수를 만들어요. 매개변수와 반환 타입은 항상 명시해야 해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `func add(a: Int, b: Int) -> Int {
    return a + b
}
print(add(a: 3, b: 4))`,
            out: `7`
          }
        },
        {
          h: '반환 값이 없는 함수',
          html: `<p>값을 반환하지 않는 함수는 <code>-> 반환타입</code> 부분을 아예 생략해요. 이런 함수는 암묵적으로 <code>Void</code>를 반환해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `func greet(name: String) {
    print("안녕, \\(name)!")
}
greet(name: "지수")`,
            out: `안녕, 지수!`
          },
          after: `<div class="note"><b>정리</b> — 스위프트 함수를 호출할 때는 기본적으로 <code>add(a: 3, b: 4)</code>처럼 매개변수 이름을 함께 적어야 해요. 이건 다음 단원에서 더 자세히 다뤄요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `함수를 정의할 때 쓰는 스위프트 키워드를 쓰세요.`,
          prefix: '', suffix: ' add(a: Int, b: Int) -> Int { return a + b }', accept: ['func'], placeholder: '키워드',
          why: '<code>func</code>은 함수를 정의하는 키워드예요.',
          hint: '"function"을 줄인 이름이에요.'
        }),
        () => makeChoice(
          '함수의 반환 타입을 표시할 때 쓰는 기호는?',
          '->', ['=>', ':', '::'],
          '스위프트는 <code>-> 타입</code> 형태로 반환 타입을 표시해요.',
          '화살표 모양의 기호예요.'
        ),
        () => {
          const a = randInt(1, 20);
          const b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>func add(a: Int, b: Int) -> Int { return a + b }\nprint(add(a: ${a}, b: ${b}))</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `add(a: ${a}, b: ${b})는 ${a} + ${b} = ${a + b}를 반환해요.`,
            hint: 'return a + b가 그대로 계산돼요.'
          };
        },
        () => makeChoice(
          '<code>func greet(name: String) { print(name) }</code>처럼 <code>-> 타입</code>이 없는 함수는 무엇을 반환하나요?',
          'Void(아무 값도 없음)', ['항상 nil', '항상 0', '컴파일 오류가 남'],
          '반환 타입을 생략한 함수는 암묵적으로 Void(빈 값)를 반환해요.',
          '"값이 없다"는 뜻의 특별한 타입이 있어요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Int</code> 타입 매개변수 <code>a</code>, <code>b</code>를 받아 곱한 값을 <code>Int</code>로 반환하는 함수 <code>multiply</code>를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'func multiply(a: Int, b: Int) -> Int {\n    return a * b\n}',
          accept: ['func multiply(a: Int, b: Int) -> Int {\n    return a * b\n}'],
          why: 'func 이름(매개변수: 타입) -> 반환타입 { return 계산식 } 형태로 작성해요.',
          hint: 'func multiply(a: Int, b: Int) -> Int { return a * b }'
        }),
      ],
      boss: () => {
        const a = randInt(1, 15);
        const b = randInt(1, 15);
        return {
          type: 'blank',
          q: `<code>func subtract(a: Int, b: Int) -> Int { return a - b }\nprint(subtract(a: ${a + b}, b: ${b}))</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(a)], placeholder: '숫자',
          why: `subtract(a: ${a + b}, b: ${b})는 ${a + b} - ${b} = ${a}를 반환해요.`,
          hint: 'a에서 b를 빼는 함수예요.'
        };
      }
    },
    {
      id: 'functionDefaultsLabels',
      title: '함수: 기본값과 인자 레이블',
      ready: true,
      summary: '매개변수의 기본값과, 호출 시 읽기 쉽게 만드는 인자 레이블(argument label)을 배워요.',
      goals: ['매개변수 기본값 지정하기', '인자 레이블로 호출 문장을 자연스럽게 만들기', '_ 로 레이블 생략하기'],
      blocks: [
        {
          h: '기본값: 인자를 생략할 수 있게 하기',
          html: `<p>매개변수에 <code>= 기본값</code>을 붙이면, 호출할 때 그 인자를 생략할 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `func greet(name: String, greeting: String = "안녕") {
    print("\\(greeting), \\(name)!")
}
greet(name: "지수")
greet(name: "민준", greeting: "반가워")`,
            out: `안녕, 지수!
반가워, 민준!`
          }
        },
        {
          h: '인자 레이블: 호출 문장을 자연스럽게',
          html: `<p>스위프트 함수는 <b>외부 이름(레이블)</b>과 <b>내부 이름</b>을 다르게 정할 수 있어요. <code>from name: String</code>처럼 쓰면 호출할 땐 <code>from</code>, 함수 안에서는 <code>name</code>으로 써요. <code>_</code>를 쓰면 레이블 자체를 생략할 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `func greet(from name: String) {
    print("\\(name)님, 환영합니다")
}
func double(_ n: Int) -> Int {
    return n * 2
}
greet(from: "서연")
print(double(5))`,
            out: `서연님, 환영합니다
10`
          },
          after: `<div class="note"><b>정리</b> — <code>_ n: Int</code>처럼 <code>_</code>를 쓰면 호출할 때 <code>double(5)</code>처럼 레이블 없이 값만 넘길 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '매개변수에 기본값을 지정하는 문법은?',
          '매개변수: 타입 = 기본값', ['매개변수: 타입 default 기본값', '매개변수? = 기본값', '매개변수: 타입! 기본값'],
          '<code>greeting: String = "안녕"</code>처럼 등호로 기본값을 지정해요.',
          '변수 초기화와 비슷한 등호(=) 문법을 써요.'
        ),
        () => ({
          type: 'blank',
          q: `호출할 때 레이블 없이 값만 넘기고 싶을 때, 매개변수 이름 앞에 쓰는 기호를 쓰세요.`,
          prefix: 'func double(', suffix: ' n: Int) -> Int { return n * 2 }', accept: ['_'], placeholder: '기호',
          why: '<code>_</code>를 쓰면 호출할 때 레이블 없이 <code>double(5)</code>처럼 값만 넘길 수 있어요.',
          hint: '와일드카드로도 쓰이는 밑줄 기호예요.'
        }),
        () => {
          const greeting = pick(['안녕', '반가워', '어서와']);
          return {
            type: 'blank',
            q: `<code>func greet(name: String, greeting: String = "안녕") { print("\\(greeting), \\(name)!") }\ngreet(name: "지수", greeting: "${greeting}")</code>를 실행하면? (형식: 인사말, 이름!)`,
            prefix: '', suffix: '', accept: [`${greeting}, 지수!`], placeholder: '출력 결과',
            why: `greeting에 "${greeting}"을 명시적으로 넘겼으므로 기본값 대신 그 값이 쓰여요.`,
            hint: '인자를 명시적으로 넘기면 기본값 대신 그 값이 쓰여요.'
          };
        },
        () => makeChoice(
          '<code>func greet(name: String, greeting: String = "안녕") { }</code>를 <code>greet(name: "민준")</code>처럼 호출하면?',
          'greeting에 자동으로 "안녕"이 쓰인다', ['컴파일 오류가 난다', 'greeting이 nil이 된다', '실행 시점 오류가 난다'],
          '기본값이 있는 매개변수는 생략하면 그 기본값이 자동으로 쓰여요.',
          '기본값 매개변수의 목적을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>from name: String</code> 형태의 인자 레이블을 써서, 호출할 때는 <code>from</code>으로, 함수 안에서는 <code>name</code>으로 쓰는 함수 <code>welcome</code>을 작성하세요. (내용은 print("\\(name)님 환영합니다"))',
          starter: '',
          rows: 3,
          placeholder: 'func welcome(from name: String) {\n    print("\\(name)님 환영합니다")\n}',
          accept: ['func welcome(from name: String) {\n    print("\\(name)님 환영합니다")\n}'],
          why: '외부 레이블 from과 내부 이름 name을 공백으로 나란히 적어요.',
          hint: 'func welcome(from name: String) { print("\\(name)님 환영합니다") }'
        }),
      ],
      boss: () => {
        const n = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>func double(_ n: Int) -> Int { return n * 2 }\nprint(double(${n}))</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(n * 2)], placeholder: '숫자',
          why: `double(${n})은 ${n} * 2 = ${n * 2}를 반환해요.`,
          hint: '_ 덕분에 레이블 없이 값만 넘길 수 있어요.'
        };
      }
    },
    {
      id: 'closuresIntro',
      title: '클로저: 이름 없는 함수',
      ready: true,
      summary: '클로저의 기본 문법과, 함수의 매개변수로 클로저를 넘기는 방법을 배워요.',
      goals: ['클로저 리터럴 문법 { (매개변수) -> 반환타입 in } 이해하기', '클로저를 변수에 담고 호출하기', '클로저를 함수 인자로 전달하기'],
      blocks: [
        {
          h: '클로저: 이름 없이 만드는 함수 덩어리',
          html: `<p><b>클로저(closure)</b>는 이름이 없는 함수예요. <code>{ (매개변수) -> 반환타입 in 코드 }</code> 형태로 만들고, 변수에 담아 함수처럼 호출할 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `let add = { (a: Int, b: Int) -> Int in
    return a + b
}
print(add(3, 4))`,
            out: `7`
          }
        },
        {
          h: '클로저를 함수 인자로 넘기기',
          html: `<p>클로저는 다른 함수의 인자로 넘길 수 있어요. 이렇게 하면 "어떻게 계산할지"를 함수 밖에서 자유롭게 정할 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `func calculate(a: Int, b: Int, operation: (Int, Int) -> Int) -> Int {
    return operation(a, b)
}
let result = calculate(a: 5, b: 3, operation: { (x: Int, y: Int) -> Int in
    return x - y
})
print(result)`,
            out: `2`
          },
          after: `<div class="note"><b>정리</b> — 클로저 타입 <code>(Int, Int) -> Int</code>는 "Int 두 개를 받아 Int를 반환하는 함수"라는 뜻이에요. 함수와 클로저는 스위프트에서 같은 방식으로 다뤄져요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '클로저란 무엇인가요?',
          '이름이 없는 함수 덩어리', ['이름이 있어야만 하는 함수', '클래스의 다른 이름', 'switch문의 한 종류'],
          '클로저는 이름 없이 코드 블록 자체를 값처럼 다루는 문법이에요.',
          '"이름이 없다"는 게 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `클로저 문법에서 매개변수 목록과 코드 사이를 구분하는 키워드를 쓰세요. ({ (a: Int) -> Int ___ return a })`,
          prefix: '{ (a: Int) -> Int ', suffix: ' return a }', accept: ['in'], placeholder: '키워드',
          why: '<code>in</code>은 클로저의 매개변수/반환타입 선언과 실제 코드 부분을 구분해요.',
          hint: '전치사처럼 생긴 짧은 영어 단어예요.'
        }),
        () => {
          const a = randInt(1, 10);
          const b = randInt(1, 10);
          return {
            type: 'blank',
            q: `<code>let multiply = { (a: Int, b: Int) -> Int in return a * b }\nprint(multiply(${a}, ${b}))</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a * b)], placeholder: '숫자',
            why: `multiply(${a}, ${b})는 ${a} * ${b} = ${a * b}를 반환해요.`,
            hint: '클로저 본문의 계산식이 그대로 실행돼요.'
          };
        },
        () => makeChoice(
          '<code>(Int, Int) -> Int</code> 타입이 뜻하는 것은?',
          'Int 두 개를 받아 Int 하나를 반환하는 함수/클로저 타입', ['Int 배열 두 개를 담는 타입', 'Int를 두 번 반환하는 타입', 'Bool을 반환하는 타입'],
          '괄호 안은 매개변수 타입들, 화살표 뒤는 반환 타입을 나타내는 함수 타입 표기예요.',
          '함수 타입도 다른 타입처럼 표기할 수 있어요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Int</code> 하나를 받아 제곱한 값을 반환하는 클로저를 <code>square</code>라는 상수에 담는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'let square = { (n: Int) -> Int in\n    return n * n\n}',
          accept: ['let square = { (n: Int) -> Int in\n    return n * n\n}'],
          why: '{ (매개변수) -> 반환타입 in 코드 } 형태로 클로저를 만들어요.',
          hint: 'let square = { (n: Int) -> Int in return n * n }'
        }),
      ],
      boss: () => {
        const a = randInt(2, 12);
        const b = randInt(2, 12);
        return {
          type: 'blank',
          q: `<code>func calculate(a: Int, b: Int, operation: (Int, Int) -> Int) -> Int { return operation(a, b) }\nlet result = calculate(a: ${a}, b: ${b}, operation: { (x: Int, y: Int) -> Int in return x + y })\nprint(result)</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
          why: `operation 클로저가 x + y를 계산하므로 ${a} + ${b} = ${a + b}가 반환돼요.`,
          hint: '클로저 안의 계산식이 그대로 적용돼요.'
        };
      }
    },
    {
      id: 'closuresTrailing',
      title: '트레일링 클로저와 값 캡처',
      ready: true,
      summary: '트레일링 클로저 문법과, 클로저가 주변 값을 기억하는(캡처) 원리를 배워요.',
      goals: ['트레일링 클로저 문법 사용하기', '클로저가 외부 변수를 캡처하는 원리 이해하기', '축약 인자 이름($0, $1) 사용하기'],
      blocks: [
        {
          h: '트레일링 클로저: 마지막 인자를 밖으로',
          html: `<p>함수의 <b>마지막 인자가 클로저</b>일 때, 괄호 밖으로 빼서 쓸 수 있어요. 이걸 <b>트레일링 클로저</b>라고 해요. 실제 스위프트 코드에서 아주 흔한 스타일이에요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `func calculate(a: Int, b: Int, operation: (Int, Int) -> Int) -> Int {
    return operation(a, b)
}
let result = calculate(a: 5, b: 3) { x, y in
    return x - y
}
print(result)`,
            out: `2`
          }
        },
        {
          h: '값 캡처: 클로저가 주변 값을 기억해요',
          html: `<p>클로저는 자신이 정의된 주변의 변수를 <b>캡처(capture)</b>해서 나중에도 계속 참조할 수 있어요. 아래 예시처럼 <code>makeCounter</code>가 반환한 클로저는 <code>count</code>를 계속 기억해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `func makeCounter() -> () -> Int {
    var count = 0
    return {
        count += 1
        return count
    }
}
let counter = makeCounter()
print(counter())
print(counter())
print(counter())`,
            out: `1
2
3`
          },
          after: `<div class="note"><b>정리</b> — 축약 인자 이름 <code>$0</code>, <code>$1</code>을 쓰면 <code>in</code>과 매개변수 이름을 생략할 수 있어요. 예: <code>{ $0 + $1 }</code>은 <code>{ (a, b) in a + b }</code>와 같아요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '트레일링 클로저 문법을 쓸 수 있는 조건은?',
          '함수의 마지막 인자가 클로저일 때', ['클로저가 매개변수를 받지 않을 때만', '함수에 인자가 하나뿐일 때만', '클로저가 반환값이 없을 때만'],
          '마지막 인자가 클로저면, 그 클로저를 괄호 밖으로 빼서 쓸 수 있어요.',
          '"마지막"이라는 위치가 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `클로저에서 첫 번째, 두 번째 인자를 이름 없이 가리킬 때 쓰는 축약 표현을 순서대로 쓰세요. (첫 번째만)`,
          prefix: '', suffix: ' + $1', accept: ['$0'], placeholder: '축약 이름',
          why: '<code>$0</code>은 첫 번째 인자, <code>$1</code>은 두 번째 인자를 가리키는 축약 표현이에요.',
          hint: '달러 기호와 숫자 0을 붙여요.'
        }),
        () => {
          let n = 0;
          const calls = randInt(2, 5);
          for (let i = 0; i < calls; i++) n++;
          return {
            type: 'blank',
            q: `<code>func makeCounter() -> () -> Int { var count = 0; return { count += 1; return count } }\nlet counter = makeCounter()</code> 이후 <code>counter()</code>를 ${calls}번 호출하면, 마지막 호출의 반환값은?`,
            prefix: '', suffix: '', accept: [String(calls)], placeholder: '숫자',
            why: `클로저가 count를 계속 캡처하고 있어서, 호출할 때마다 1씩 늘어나요. ${calls}번째 호출에서는 ${calls}이 반환돼요.`,
            hint: '매번 호출할 때마다 count가 1씩 늘어나요.'
          };
        },
        () => makeChoice(
          '클로저가 자신이 정의된 곳의 변수를 계속 기억해서 쓸 수 있게 하는 성질을 무엇이라고 하나요?',
          '캡처(capture)', ['상속(inheritance)', '오버로딩(overloading)', '캐스팅(casting)'],
          '클로저는 주변 변수를 캡처해서, 함수가 끝난 뒤에도 그 값을 계속 참조할 수 있어요.',
          '"붙잡다"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>calculate(a: 10, b: 2)</code>를 트레일링 클로저 문법으로 호출하면서, 클로저에서 <code>$0</code>과 <code>$1</code>을 나눗셈(<code>$0 / $1</code>)하도록 작성하세요. (calculate 함수는 이미 정의되어 있다고 가정)',
          starter: '',
          rows: 2,
          placeholder: 'calculate(a: 10, b: 2) { $0 / $1 }',
          accept: ['calculate(a: 10, b: 2) { $0 / $1 }'],
          why: '트레일링 클로저와 축약 인자 이름을 함께 쓰면 아주 짧게 표현할 수 있어요.',
          hint: 'calculate(a: 10, b: 2) { $0 / $1 }'
        }),
      ],
      boss: () => {
        const a = randInt(5, 20);
        const b = randInt(1, 4);
        return {
          type: 'blank',
          q: `<code>func calculate(a: Int, b: Int, operation: (Int, Int) -> Int) -> Int { return operation(a, b) }\nlet result = calculate(a: ${a}, b: ${b}) { $0 * $1 }\nprint(result)</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(a * b)], placeholder: '숫자',
          why: `트레일링 클로저 { $0 * $1 }이 ${a} * ${b} = ${a * b}를 계산해요.`,
          hint: '$0은 a, $1은 b를 가리켜요.'
        };
      }
    },
    {
      id: 'arrays',
      title: '배열(Array)',
      ready: true,
      summary: '순서가 있는 값들의 목록인 배열을 만들고, 요소를 추가/조회하는 방법을 배워요.',
      goals: ['배열 리터럴로 배열 만들기', '인덱스로 요소 접근하기', 'append로 요소 추가하기'],
      blocks: [
        {
          h: '배열 만들기와 접근하기',
          html: `<p>배열은 <code>[값1, 값2, ...]</code> 형태로 만들고, <code>배열[인덱스]</code>로 특정 위치의 값에 접근해요. 인덱스는 0부터 시작해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `var fruits = ["사과", "바나나", "포도"]
print(fruits[0])
print(fruits.count)`,
            out: `사과
3`
          }
        },
        {
          h: 'append: 요소 추가하기',
          html: `<p><code>append</code>로 배열 끝에 값을 추가할 수 있어요. 배열의 값을 바꾸려면 <code>var</code>로 선언해야 해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `var scores: [Int] = [90, 85]
scores.append(100)
print(scores)
print(scores.count)`,
            out: `[90, 85, 100]
3`
          },
          after: `<div class="note"><b>정리</b> — 배열의 타입은 <code>[Int]</code>, <code>[String]</code>처럼 대괄호로 감싸서 표현해요. 빈 배열은 <code>[Int]()</code> 또는 <code>[Int] = []</code>로 만들 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '스위프트에서 배열의 첫 번째 요소의 인덱스는?',
          '0', ['1', '-1', '배열마다 다름'],
          '스위프트 배열도 다른 대부분의 언어처럼 인덱스가 0부터 시작해요.',
          '0부터 세기 시작해요.'
        ),
        () => ({
          type: 'blank',
          q: `배열 끝에 새 요소를 추가할 때 쓰는 메서드 이름을 쓰세요.`,
          prefix: 'scores.', suffix: '(100)', accept: ['append'], placeholder: '메서드 이름',
          why: '<code>append</code>는 배열의 맨 끝에 값을 추가해요.',
          hint: '"덧붙이다"라는 뜻의 영어 단어예요.'
        }),
        () => {
          const items = shuffle(['사과', '바나나', '포도', '딸기', '수박']).slice(0, 3);
          const idx = randInt(0, 2);
          return {
            type: 'blank',
            q: `<code>let fruits = ["${items[0]}", "${items[1]}", "${items[2]}"]\nprint(fruits[${idx}])</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [items[idx]], placeholder: '출력 결과',
            why: `인덱스 ${idx}에 해당하는 값은 "${items[idx]}"예요.`,
            hint: '0번째부터 순서대로 세어보세요.'
          };
        },
        () => makeChoice(
          '배열의 요소 개수를 알려주는 프로퍼티는?',
          'count', ['length', 'size', 'len'],
          '스위프트 배열은 <code>.count</code> 프로퍼티로 요소 개수를 알려줘요.',
          'length가 아니라 다른 단어를 써요.'
        ),
        () => ({
          type: 'code',
          q: '<code>numbers</code>라는 <code>[Int]</code> 배열을 <code>[1, 2, 3]</code>으로 선언하고, <code>4</code>를 <code>append</code>한 뒤, <code>print</code>로 전체를 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'var numbers = [1, 2, 3]\nnumbers.append(4)\nprint(numbers)',
          accept: ['var numbers = [1, 2, 3]\nnumbers.append(4)\nprint(numbers)'],
          why: 'var로 선언한 배열은 append로 요소를 추가할 수 있어요.',
          hint: 'var numbers = [1, 2, 3] 다음 numbers.append(4) 다음 print(numbers)'
        }),
      ],
      boss: () => {
        const items = shuffle(['빨강', '주황', '노랑', '초록', '파랑']).slice(0, 4);
        return {
          type: 'blank',
          q: `<code>var colors = ["${items[0]}", "${items[1]}", "${items[2]}"]\ncolors.append("${items[3]}")\nprint(colors.count)</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: ['4'], placeholder: '숫자',
          why: '처음 3개 요소에 append로 1개를 더 추가했으므로 총 4개가 돼요.',
          hint: '처음 요소 개수에 추가한 개수를 더해보세요.'
        };
      }
    },
{
      id: 'dictionaries',
      title: '딕셔너리(Dictionary)',
      ready: true,
      summary: '키-값 쌍을 저장하는 딕셔너리를 만들고 조회/추가하는 방법을 배워요.',
      goals: ['딕셔너리 리터럴 만들기', '키로 값 조회하기(옵셔널 반환 이해)', '새 키-값 쌍 추가/수정하기'],
      blocks: [
        {
          h: '딕셔너리: 키로 값을 찾는 자료형',
          html: `<p>딕셔너리는 <code>[키: 값, ...]</code> 형태로 만들고, <code>딕셔너리[키]</code>로 값을 찾아요. 키가 없을 수도 있기 때문에, 조회 결과는 항상 <b>옵셔널</b>이에요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `var scores: [String: Int] = ["지수": 90, "민준": 85]
print(scores["지수"])
print(scores["서연"])`,
            out: `Optional(90)
nil`
          }
        },
        {
          h: '값 추가하고 수정하기',
          html: `<p>새 키에 값을 대입하면 추가되고, 이미 있는 키에 대입하면 값이 바뀌어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `var scores: [String: Int] = ["지수": 90]
scores["민준"] = 85
scores["지수"] = 95
print(scores["지수"])
print(scores["민준"])`,
            out: `Optional(95)
Optional(85)`
          },
          after: `<div class="note"><b>정리</b> — 딕셔너리 타입은 <code>[String: Int]</code>처럼 <code>[키타입: 값타입]</code>으로 표현해요. 값을 안전하게 꺼내려면 <code>if let</code>이나 <code>??</code>를 함께 쓰는 게 좋아요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '딕셔너리에서 존재하지 않는 키로 값을 조회하면 어떻게 되나요?',
          'nil이 반환된다', ['크래시가 발생한다', '컴파일 오류가 난다', '자동으로 0이 반환된다'],
          '딕셔너리 조회 결과는 항상 옵셔널이라, 키가 없으면 안전하게 nil을 돌려줘요.',
          '옵셔널 개념을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>[String: Int]</code> 타입에서 콜론 왼쪽은 무엇을 나타내나요? (한 단어로: 키 또는 값)`,
          prefix: '', suffix: '', accept: ['키'], placeholder: '키 또는 값',
          why: '<code>[키타입: 값타입]</code>에서 콜론 왼쪽은 키의 타입이에요.',
          hint: '콜론 왼쪽, 오른쪽 중 어느 쪽이 "찾는 기준"인지 생각해보세요.'
        }),
        () => {
          const val = randInt(60, 100);
          return {
            type: 'blank',
            q: `<code>var scores: [String: Int] = ["지수": ${val}]\nprint(scores["지수"])</code>를 실행하면? (Optional(값) 형태로)`,
            prefix: '', suffix: '', accept: [`Optional(${val})`], placeholder: '출력 결과',
            why: `딕셔너리 조회 결과는 옵셔널이라서, 값이 있어도 Optional(${val}) 형태로 감싸져 출력돼요.`,
            hint: '옵셔널로 감싸진 형태를 그대로 적어보세요.'
          };
        },
        () => makeChoice(
          '딕셔너리에 새 키-값 쌍을 추가하는 방법은?',
          '딕셔너리[새키] = 값 형태로 대입한다', ['append(키, 값)를 호출한다', 'insert(값)만 호출한다', '자동으로는 추가할 수 없다'],
          '딕셔너리는 새로운 키에 값을 대입하는 것만으로 항목이 추가돼요.',
          '배열의 append와는 다른 방식이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>ages</code>라는 <code>[String: Int]</code> 딕셔너리를 <code>["지수": 17]</code>로 선언하고, <code>"민준"</code>에 <code>16</code>을 추가하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'var ages: [String: Int] = ["지수": 17]\nages["민준"] = 16',
          accept: ['var ages: [String: Int] = ["지수": 17]\nages["민준"] = 16'],
          why: '새 키에 값을 대입하면 딕셔너리에 항목이 추가돼요.',
          hint: 'var ages: [String: Int] = ["지수": 17] 다음 ages["민준"] = 16'
        }),
      ],
      boss: () => {
        const a = randInt(60, 100);
        const b = randInt(60, 100);
        return {
          type: 'blank',
          q: `<code>var scores: [String: Int] = ["지수": ${a}]\nscores["민준"] = ${b}\nprint(scores["민준"])</code>를 실행하면? (Optional(값) 형태로)`,
          prefix: '', suffix: '', accept: [`Optional(${b})`], placeholder: '출력 결과',
          why: `"민준" 키에 ${b}가 새로 추가되었고, 조회 결과는 옵셔널로 감싸져 Optional(${b})로 출력돼요.`,
          hint: '새로 추가한 값을 그대로 조회하는 거예요.'
        };
      }
    },
    {
      id: 'sets',
      title: '집합(Set)',
      ready: true,
      summary: '순서가 없고 중복을 허용하지 않는 집합(Set)의 특징과 기본 연산을 배워요.',
      goals: ['Set 리터럴 만들기', '중복이 자동으로 제거됨을 이해하기', 'contains, insert 사용하기'],
      blocks: [
        {
          h: 'Set: 순서 없고 중복 없는 모음',
          html: `<p><code>Set</code>은 배열과 달리 <b>순서가 없고 같은 값을 두 번 담지 않아요</b>. "어떤 값이 있는지 없는지"를 빠르게 확인할 때 유용해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `var tags: Set<String> = ["swift", "ios", "swift"]
print(tags.count)
print(tags.contains("ios"))`,
            out: `2
true`
          }
        },
        {
          h: 'insert로 값 추가하기',
          html: `<p><code>insert</code>로 값을 추가해요. 이미 있는 값을 다시 insert해도 개수는 늘지 않아요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `var tags: Set<String> = ["swift"]
tags.insert("ios")
tags.insert("swift")
print(tags.count)`,
            out: `2`
          },
          after: `<div class="note"><b>정리</b> — Set의 제네릭 표기는 <code>Set&lt;String&gt;</code>처럼 꺾쇠괄호를 써요. 배열은 <code>[String]</code>, Set은 <code>Set&lt;String&gt;</code>으로 표기법이 달라요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'Set의 가장 큰 특징은?',
          '순서가 없고 중복된 값을 허용하지 않는다', ['배열처럼 순서를 유지하고 중복도 허용한다', '키-값 쌍을 저장한다', '항상 정렬된 상태로 저장된다'],
          'Set은 순서가 없고, 같은 값을 중복해서 저장하지 않는 컬렉션이에요.',
          '배열/딕셔너리와 다른 세 번째 컬렉션이에요.'
        ),
        () => ({
          type: 'blank',
          q: `Set에 값을 추가할 때 쓰는 메서드 이름을 쓰세요.`,
          prefix: 'tags.', suffix: '("ios")', accept: ['insert'], placeholder: '메서드 이름',
          why: '<code>insert</code>는 Set에 새 값을 추가해요.',
          hint: '"삽입하다"라는 뜻의 영어 단어예요.'
        }),
        () => {
          const items = ['swift', 'ios', 'mac', 'xcode'];
          return {
            type: 'blank',
            q: `<code>var tags: Set<String> = ["${items[0]}", "${items[1]}", "${items[0]}"]\nprint(tags.count)</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: ['2'], placeholder: '숫자',
            why: `"${items[0]}"이 중복으로 들어있지만 Set은 중복을 제거하므로 서로 다른 값은 "${items[0]}"과 "${items[1]}" 2개예요.`,
            hint: '중복된 값은 한 번만 저장돼요.'
          };
        },
        () => makeChoice(
          'Set에 특정 값이 들어있는지 확인할 때 쓰는 메서드는?',
          'contains', ['has', 'exists', 'includes'],
          '<code>contains(값)</code>은 Set에 그 값이 있으면 true를 반환해요.',
          '"포함하다"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>colors</code>라는 <code>Set<String></code>을 <code>["red", "blue"]</code>로 선언하고, <code>"green"</code>을 <code>insert</code>하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'var colors: Set<String> = ["red", "blue"]\ncolors.insert("green")',
          accept: ['var colors: Set<String> = ["red", "blue"]\ncolors.insert("green")'],
          why: 'Set<String> 타입으로 선언하고 insert로 값을 추가해요.',
          hint: 'var colors: Set<String> = ["red", "blue"] 다음 colors.insert("green")'
        }),
      ],
      boss: () => {
        return {
          type: 'blank',
          q: `<code>var nums: Set<Int> = [1, 2, 3]\nnums.insert(2)\nnums.insert(4)\nprint(nums.count)</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: ['4'], placeholder: '숫자',
          why: '2는 이미 있어서 추가되지 않고, 4는 새로 추가되어 총 4개(1,2,3,4)가 돼요.',
          hint: '이미 있는 값을 다시 insert해도 개수는 늘지 않아요.'
        };
      }
    },
    {
      id: 'structsIntro',
      title: '구조체(struct): 값 타입 데이터 모델링',
      ready: true,
      summary: 'struct로 데이터를 묶고, 스위프트에서 데이터 모델링의 기본이 struct인 이유를 배워요.',
      goals: ['struct 정의 문법 익히기', '자동 생성되는 멤버와이즈 초기화 이해하기', '프로퍼티에 접근하고 값 읽기'],
      blocks: [
        {
          h: 'struct: 관련 데이터를 하나로 묶기',
          html: `<p><code>struct</code>는 여러 프로퍼티를 하나의 타입으로 묶어요. 스위프트에서는 <b>struct가 데이터 모델링의 기본 선택</b>이에요. 별도의 초기화 함수를 안 만들어도, 스위프트가 프로퍼티 순서대로 초기화하는 <b>멤버와이즈 초기화</b>를 자동으로 만들어줘요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Student {
    var name: String
    var score: Int
}
let jisu = Student(name: "지수", score: 90)
print(jisu.name)
print(jisu.score)`,
            out: `지수
90`
          }
        },
        {
          h: 'struct는 값 타입: 복사되면 독립적',
          html: `<p>struct는 <b>값 타입</b>이에요. 변수에 다른 변수를 대입하면 값이 <b>복사</b>돼서, 한쪽을 바꿔도 다른 쪽은 영향을 받지 않아요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Student {
    var name: String
    var score: Int
}
var a = Student(name: "지수", score: 90)
var b = a
b.score = 100
print(a.score)
print(b.score)`,
            out: `90
100`
          },
          after: `<div class="note"><b>정리</b> — struct의 프로퍼티를 함수 안에서 바꾸려면, 그 struct를 담은 변수는 <code>var</code>여야 하고, 값을 바꾸는 메서드는 <code>mutating</code>으로 표시해야 해요(메서드 단원에서 자세히 다뤄요).</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '스위프트에서 데이터 모델링의 기본으로 우선 고려되는 것은?',
          'struct', ['class', 'protocol', 'enum'],
          '스위프트는 struct(값 타입)를 데이터 모델링의 기본 선택으로 권장해요.',
          '이 단원의 제목을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `여러 프로퍼티를 순서대로 넘겨 인스턴스를 만드는, 스위프트가 자동으로 만들어주는 초기화 방식의 이름을 쓰세요. (한글로: ___와이즈 초기화)`,
          prefix: '', suffix: '와이즈 초기화', accept: ['멤버'], placeholder: '단어',
          why: '멤버와이즈 초기화는 struct의 프로퍼티들을 순서대로 넘겨 인스턴스를 만드는, 자동으로 생성되는 초기화 방법이에요.',
          hint: '"구성원"이라는 뜻의 단어예요.'
        }),
        () => {
          const score = randInt(60, 100);
          return {
            type: 'blank',
            q: `<code>struct Student { var name: String; var score: Int }\nvar a = Student(name: "민준", score: ${score})\nvar b = a\nb.score = 100\nprint(a.score)</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(score)], placeholder: '숫자',
            why: `struct는 값 타입이라 b = a에서 값이 복사돼요. b.score를 바꿔도 a.score는 그대로 ${score}예요.`,
            hint: 'struct는 복사되면 서로 독립적이에요.'
          };
        },
        () => makeChoice(
          'struct가 "값 타입"이라는 것은 어떤 의미인가요?',
          '변수에 대입하거나 함수에 넘기면 값이 복사된다', ['항상 참조로 공유된다', '한 번 만들면 절대 바꿀 수 없다', '클래스보다 항상 느리다'],
          '값 타입은 대입·전달될 때마다 독립적인 복사본이 만들어져요.',
          '"복사"라는 단어가 핵심이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>name</code>(String), <code>age</code>(Int) 프로퍼티를 가진 <code>Person</code> struct를 정의하세요.',
          starter: '',
          rows: 4,
          placeholder: 'struct Person {\n    var name: String\n    var age: Int\n}',
          accept: ['struct Person {\n    var name: String\n    var age: Int\n}'],
          why: 'struct 이름 { var 프로퍼티: 타입 ... } 형태로 정의해요.',
          hint: 'struct Person { var name: String; var age: Int }'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const score = randInt(60, 100);
        return {
          type: 'blank',
          q: `<code>struct Student { var name: String; var score: Int }\nlet s = Student(name: "${name}", score: ${score})\nprint("\\(s.name): \\(s.score)")</code>를 실행하면? (형식: 이름: 점수)`,
          prefix: '', suffix: '', accept: [`${name}: ${score}`], placeholder: '출력 결과',
          why: '멤버와이즈 초기화로 만든 인스턴스의 프로퍼티에 점(.)으로 접근해 출력해요.',
          hint: 's.name과 s.score를 문자열 보간으로 합쳐보세요.'
        };
      }
    },
    {
      id: 'classesIntro',
      title: '클래스(class): 참조 타입',
      ready: true,
      summary: 'class로 참조 타입을 만들고, struct와 다른 복사 방식을 배워요.',
      goals: ['class 정의 문법 익히기', '클래스는 참조 타입임을 이해하기', '두 변수가 같은 인스턴스를 공유하는 상황 이해하기'],
      blocks: [
        {
          h: 'class: struct와 비슷하지만 참조 타입',
          html: `<p><code>class</code>도 프로퍼티를 묶는다는 점은 struct와 비슷해요. 하지만 class는 <b>참조 타입</b>이라서, struct와 달리 자동으로 멤버와이즈 초기화가 만들어지지 않아 <code>init</code>을 직접 써야 하는 경우가 많아요(다음 단원에서 자세히 배워요). 우선 <code>init</code>으로 초기화하는 예시부터 볼게요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `class Counter {
    var count: Int = 0
    func increment() {
        count += 1
    }
}
let c = Counter()
c.increment()
print(c.count)`,
            out: `1`
          }
        },
        {
          h: '참조 타입: 두 변수가 하나를 공유해요',
          html: `<p>class 인스턴스를 다른 변수에 대입하면, 값이 복사되는 게 아니라 <b>같은 인스턴스를 가리키는 참조</b>가 하나 더 생겨요. 그래서 한쪽을 바꾸면 다른 쪽도 함께 바뀌어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `class Counter {
    var count: Int = 0
}
let a = Counter()
let b = a
b.count = 100
print(a.count)`,
            out: `100`
          },
          after: `<div class="note"><b>정리</b> — <code>let a = Counter()</code>에서 <code>let</code>은 "a가 가리키는 인스턴스를 바꿀 수 없다"는 뜻이지, "인스턴스의 프로퍼티를 못 바꾼다"는 뜻이 아니에요. 그래서 <code>a.count</code>는 여전히 바꿀 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'class 인스턴스를 다른 변수에 대입하면 어떻게 되나요?',
          '값이 복사되지 않고, 같은 인스턴스를 가리키는 참조가 생긴다', ['struct처럼 완전히 독립된 복사본이 생긴다', '컴파일 오류가 난다', '항상 nil이 된다'],
          'class는 참조 타입이라서, 대입은 참조(주소)를 복사하는 것이지 값 자체를 복사하는 게 아니에요.',
          'struct와 정반대되는 성질이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>let a = Counter()</code>에서 <code>let</code>이 막는 것은 무엇인가요? (a가 가리키는 ___를 바꾸는 것)`,
          prefix: 'a가 가리키는 ', suffix: '를 바꾸는 것', accept: ['인스턴스'], placeholder: '단어',
          why: 'let은 a라는 이름이 가리키는 인스턴스 자체를 다른 것으로 바꾸는 것만 막아요. 그 인스턴스의 프로퍼티는 여전히 바꿀 수 있어요.',
          hint: 'class 인스턴스를 가리키는 대상을 뜻하는 단어예요.'
        }),
        () => {
          const val = randInt(10, 99);
          return {
            type: 'blank',
            q: `<code>class Counter { var count: Int = 0 }\nlet a = Counter()\nlet b = a\nb.count = ${val}\nprint(a.count)</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(val)], placeholder: '숫자',
            why: `a와 b는 같은 인스턴스를 가리키므로, b.count를 바꾸면 a.count도 함께 ${val}로 바뀌어요.`,
            hint: 'class는 참조 타입이라 두 변수가 같은 것을 가리켜요.'
          };
        },
        () => makeChoice(
          'struct와 class의 가장 근본적인 차이는?',
          'struct는 값 타입(복사), class는 참조 타입(공유)이다', ['struct는 프로퍼티를 가질 수 없다', 'class는 메서드를 가질 수 없다', '차이가 전혀 없다'],
          'struct는 대입 시 복사되는 값 타입, class는 참조를 공유하는 참조 타입이에요.',
          '다음 단원에서 이 차이를 더 깊이 다뤄요.'
        ),
        () => ({
          type: 'code',
          q: '<code>count</code>라는 <code>Int</code> 프로퍼티(기본값 0)와, <code>count</code>를 1 늘리는 <code>increment</code> 메서드를 가진 <code>Counter</code> class를 정의하세요.',
          starter: '',
          rows: 5,
          placeholder: 'class Counter {\n    var count: Int = 0\n    func increment() {\n        count += 1\n    }\n}',
          accept: ['class Counter {\n    var count: Int = 0\n    func increment() {\n        count += 1\n    }\n}'],
          why: 'class 안에 프로퍼티와 메서드를 함께 정의할 수 있어요.',
          hint: 'class Counter { var count: Int = 0; func increment() { count += 1 } }'
        }),
      ],
      boss: () => {
        const start = randInt(0, 5);
        const calls = randInt(2, 5);
        return {
          type: 'blank',
          q: `<code>class Counter { var count: Int = ${start}; func increment() { count += 1 } }\nlet a = Counter()\nlet b = a\nfor _ in 0..<${calls} { b.increment() }\nprint(a.count)</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(start + calls)], placeholder: '숫자',
          why: `a와 b는 같은 인스턴스를 가리키므로, b로 ${calls}번 늘려도 a.count에 그대로 반영되어 ${start} + ${calls} = ${start + calls}이 돼요.`,
          hint: '참조 타입이라 a와 b는 하나의 인스턴스를 공유해요.'
        };
      }
    },
    {
      id: 'structVsClass',
      title: '구조체 vs 클래스: 언제 무엇을 쓸까',
      ready: true,
      summary: 'struct(값 타입)와 class(참조 타입)의 차이를 정리하고, 언제 어떤 것을 선택해야 하는지 배워요.',
      goals: ['값 타입과 참조 타입의 동작 차이 복습하기', 'struct/class 선택 기준 이해하기', '상속은 class만 가능함을 알기'],
      blocks: [
        {
          h: '핵심 차이 정리',
          html: `<p><b>struct</b>: 값 타입, 대입/전달 시 복사, 상속 불가. <b>class</b>: 참조 타입, 대입/전달 시 참조 공유, 상속 가능. 애플의 공식 가이드는 "특별한 이유가 없다면 struct를 먼저 고려하라"고 권장해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct PointS { var x: Int }
class PointC { var x: Int; init(x: Int) { self.x = x } }

var s1 = PointS(x: 1)
var s2 = s1
s2.x = 99

let c1 = PointC(x: 1)
let c2 = c1
c2.x = 99

print(s1.x, c1.x)`,
            out: `1 99`
          }
        },
        {
          h: '언제 class를 써야 할까',
          html: `<p>여러 곳에서 <b>같은 객체를 공유하며 상태를 함께 바꿔야 할 때</b>(예: 화면에 보이는 하나의 계좌 객체), 또는 <b>상속</b>이 꼭 필요할 때 class를 선택해요. 반대로 단순한 데이터 묶음이라면 struct가 더 안전하고 예측하기 쉬워요.</p>`,
          code: {
            label: 'guideline.txt',
            lang: 'swift',
            src: `선택 기준:
- 단순한 데이터 모델 -> struct
- 여러 곳에서 상태를 공유해야 함 -> class
- 상속이 꼭 필요함 -> class
- 동일성(identity) 비교가 중요함 -> class`,
            out: `(선택 기준 요약)`
          },
          after: `<div class="note"><b>정리</b> — Swift의 배열, 딕셔너리, 문자열은 모두 struct로 구현되어 있어요. 값 타입이 스위프트 표준 라이브러리 전반에 깊이 배어 있는 이유예요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '애플이 권장하는 기본 선택 기준은?',
          '특별한 이유가 없다면 struct를 먼저 고려한다', ['항상 class를 우선 고려한다', 'struct는 절대 쓰지 않는다', '상속이 필요 없어도 class를 쓴다'],
          '스위프트 공식 가이드는 값 타입인 struct를 기본 선택으로 권장해요.',
          '이 강좌에서 반복적으로 강조된 원칙이에요.'
        ),
        () => ({
          type: 'blank',
          q: `struct와 class 중, 상속(inheritance)이 가능한 것은 무엇인가요?`,
          prefix: '', suffix: '', accept: ['class'], placeholder: 'struct 또는 class',
          why: '상속은 class에서만 가능해요. struct는 상속을 지원하지 않아요.',
          hint: '참조 타입 쪽이에요.'
        }),
        () => makeChoice(
          '여러 화면에서 하나의 객체 상태를 공유하며 함께 바꿔야 하는 상황에는 무엇이 더 적합한가요?',
          'class(참조 타입, 공유됨)', ['struct(값 타입, 복사됨)', '둘 다 상관없다', 'Set'],
          '상태를 여러 곳에서 공유해야 한다면, 참조가 공유되는 class가 더 적합해요.',
          '"공유"라는 단어가 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `스위프트의 배열(Array), 딕셔너리(Dictionary), 문자열(String)은 struct와 class 중 어느 쪽으로 구현되어 있나요?`,
          prefix: '', suffix: '', accept: ['struct'], placeholder: 'struct 또는 class',
          why: '스위프트 표준 라이브러리의 Array, Dictionary, String은 모두 struct(값 타입)로 구현되어 있어요.',
          hint: '값 타입 쪽이에요.'
        }),
        () => ({
          type: 'code',
          q: '<code>width</code>, <code>height</code>(둘 다 Double) 프로퍼티를 가진 <code>Rectangle</code>을 struct로 정의하세요. (데이터 모델링의 기본 선택을 떠올려보세요)',
          starter: '',
          rows: 4,
          placeholder: 'struct Rectangle {\n    var width: Double\n    var height: Double\n}',
          accept: ['struct Rectangle {\n    var width: Double\n    var height: Double\n}'],
          why: '단순한 데이터 모델은 struct로 만드는 것이 스위프트다운 기본 선택이에요.',
          hint: 'struct Rectangle { var width: Double; var height: Double }'
        }),
      ],
      boss: () => makeChoice(
        'struct와 class에 대한 설명으로 옳은 것은?',
        'struct는 값 타입(복사), class는 참조 타입(공유)이며 상속은 class만 가능하다', ['struct와 class는 완전히 동일하게 동작한다', 'struct만 상속이 가능하다', 'class는 항상 struct보다 더 안전하다'],
        'struct는 값 타입으로 복사되고, class는 참조 타입으로 공유되며, 상속은 class에서만 가능해요.',
        '이 단원에서 정리한 핵심 차이를 떠올려보세요.'
      )
    },
{
      id: 'properties',
      title: '프로퍼티: 저장 프로퍼티와 계산 프로퍼티',
      ready: true,
      summary: '값을 저장하는 저장 프로퍼티와, 다른 값으로부터 계산되는 계산 프로퍼티를 배워요.',
      goals: ['저장 프로퍼티 이해하기', '계산 프로퍼티(get)로 값 계산하기', '계산 프로퍼티에 set 추가하기'],
      blocks: [
        {
          h: '저장 프로퍼티: 값을 그대로 저장',
          html: `<p>지금까지 써온 <code>var name: String</code> 같은 프로퍼티는 <b>저장 프로퍼티</b>예요. 값을 메모리에 그대로 저장해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Rectangle {
    var width: Double
    var height: Double
}
let r = Rectangle(width: 3, height: 4)
print(r.width)`,
            out: `3.0`
          }
        },
        {
          h: '계산 프로퍼티: 매번 다시 계산',
          html: `<p><b>계산 프로퍼티</b>는 값을 저장하지 않고, 접근할 때마다 <code>get</code> 블록의 코드를 실행해서 값을 계산해요. 다른 프로퍼티로부터 유도되는 값을 표현할 때 유용해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Rectangle {
    var width: Double
    var height: Double
    var area: Double {
        return width * height
    }
}
let r = Rectangle(width: 3, height: 4)
print(r.area)`,
            out: `12.0`
          },
          after: `<div class="note"><b>정리</b> — 계산 프로퍼티에 <code>set</code>도 추가하면, 그 프로퍼티에 값을 대입할 때 다른 프로퍼티를 역산해서 바꾸는 것도 가능해요. <code>get</code>만 있으면 읽기 전용이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '저장 프로퍼티와 계산 프로퍼티의 차이는?',
          '저장 프로퍼티는 값을 그대로 저장하고, 계산 프로퍼티는 매번 다시 계산한다', ['저장 프로퍼티만 struct에서 쓸 수 있다', '계산 프로퍼티는 항상 상수이다', '차이가 없다'],
          '저장 프로퍼티는 메모리에 값을 저장하고, 계산 프로퍼티는 접근할 때마다 코드를 실행해 값을 만들어내요.',
          '"저장"과 "계산"이라는 단어 자체가 힌트예요.'
        ),
        () => ({
          type: 'blank',
          q: `계산 프로퍼티에서 값을 읽을 때 실행되는 블록의 이름을 쓰세요.`,
          prefix: 'var area: Double { ', suffix: ' { return width * height } }', accept: ['get'], placeholder: '키워드',
          why: '<code>get</code> 블록은 계산 프로퍼티를 읽을 때 실행돼서 값을 계산해요.',
          hint: '"가져오다"라는 뜻의 영어 단어예요.'
        }),
        () => {
          const w = randInt(2, 10);
          const h = randInt(2, 10);
          return {
            type: 'blank',
            q: `<code>struct Rectangle { var width: Double; var height: Double; var area: Double { return width * height } }\nlet r = Rectangle(width: ${w}, height: ${h})\nprint(r.area)</code>를 실행하면? (예: 12.0)`,
            prefix: '', suffix: '', accept: [`${w * h}.0`], placeholder: '출력 결과',
            why: `area는 width * height를 계산하므로 ${w} * ${h} = ${w * h}.0이 돼요.`,
            hint: 'Double 타입이라 소수점이 붙어서 출력돼요.'
          };
        },
        () => makeChoice(
          '계산 프로퍼티에 get만 있고 set이 없으면?',
          '읽기 전용 프로퍼티가 된다', ['컴파일 오류가 난다', '자동으로 set도 생긴다', 'nil만 반환한다'],
          'get만 있는 계산 프로퍼티는 값을 읽을 수만 있고, 대입은 할 수 없는 읽기 전용이에요.',
          '대입까지 가능하게 하려면 set이 추가로 필요해요.'
        ),
        () => ({
          type: 'code',
          q: '<code>radius</code>(Double) 저장 프로퍼티와, <code>radius * radius * 3.14</code>를 반환하는 <code>area</code> 계산 프로퍼티를 가진 <code>Circle</code> struct를 정의하세요.',
          starter: '',
          rows: 5,
          placeholder: 'struct Circle {\n    var radius: Double\n    var area: Double {\n        return radius * radius * 3.14\n    }\n}',
          accept: ['struct Circle {\n    var radius: Double\n    var area: Double {\n        return radius * radius * 3.14\n    }\n}'],
          why: '저장 프로퍼티 radius와, 그로부터 계산되는 area를 함께 정의해요.',
          hint: 'struct Circle { var radius: Double; var area: Double { return radius * radius * 3.14 } }'
        }),
      ],
      boss: () => {
        const w = randInt(2, 8);
        const h = randInt(2, 8);
        return {
          type: 'blank',
          q: `<code>struct Rectangle { var width: Double; var height: Double; var area: Double { return width * height } }\nlet r = Rectangle(width: ${w}, height: ${h})\nprint(r.area)</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [`${w * h}.0`], placeholder: '출력 결과',
          why: `area 계산 프로퍼티는 width * height = ${w} * ${h} = ${w * h}.0을 반환해요.`,
          hint: 'Double 값이라 소수점 .0이 붙어요.'
        };
      }
    },
    {
      id: 'propertyObservers',
      title: '프로퍼티 옵저버: willSet과 didSet',
      ready: true,
      summary: '프로퍼티 값이 바뀌기 직전/직후에 실행되는 willSet과 didSet을 배워요.',
      goals: ['didSet으로 값이 바뀐 직후 반응하기', 'willSet으로 값이 바뀌기 직전 반응하기', 'oldValue/newValue 활용하기'],
      blocks: [
        {
          h: 'didSet: 값이 바뀐 직후 실행',
          html: `<p><code>didSet</code>은 프로퍼티 값이 바뀐 <b>직후</b>에 실행돼요. 값이 바뀔 때마다 자동으로 어떤 동작(로그 남기기, UI 갱신 등)을 하고 싶을 때 유용해요. <code>oldValue</code>로 바뀌기 전 값을 참조할 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Player {
    var score: Int {
        didSet {
            print("점수 변경: \\(oldValue) -> \\(score)")
        }
    }
}
var p = Player(score: 0)
p.score = 10`,
            out: `점수 변경: 0 -> 10`
          }
        },
        {
          h: 'willSet: 값이 바뀌기 직전 실행',
          html: `<p><code>willSet</code>은 값이 바뀌기 <b>직전</b>에 실행돼요. 새로 들어올 값은 <code>newValue</code>로 참조할 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Player {
    var score: Int {
        willSet {
            print("곧 \\(newValue)로 바뀔 예정")
        }
    }
}
var p = Player(score: 0)
p.score = 10`,
            out: `곧 10로 바뀔 예정`
          },
          after: `<div class="note"><b>정리</b> — willSet/didSet은 저장 프로퍼티에만 붙일 수 있고, 계산 프로퍼티에는 쓸 수 없어요(계산 프로퍼티는 get/set으로 이미 접근을 제어하니까요).</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'didSet은 언제 실행되나요?',
          '프로퍼티 값이 바뀐 직후', ['프로퍼티 값이 바뀌기 직전', '프로퍼티가 처음 선언될 때만', '프로퍼티를 읽을 때마다'],
          'didSet은 값이 이미 바뀐 뒤에 실행돼서, 바뀐 결과에 반응하는 코드를 넣을 수 있어요.',
          '"~한 뒤"라는 뜻의 이름이에요.'
        ),
        () => ({
          type: 'blank',
          q: `didSet 블록 안에서 "바뀌기 전 값"을 가리키는 특별한 이름을 쓰세요.`,
          prefix: 'didSet { print(', suffix: ') }', accept: ['oldValue'], placeholder: '이름',
          why: '<code>oldValue</code>는 didSet 안에서 프로퍼티가 바뀌기 전의 값을 가리켜요.',
          hint: '"old"(예전)와 "value"(값)를 합친 이름이에요.'
        }),
        () => {
          const from = randInt(0, 50);
          const to = randInt(51, 100);
          return {
            type: 'blank',
            q: `<code>struct Player { var score: Int { didSet { print("변경: \\(oldValue) -> \\(score)") } } }\nvar p = Player(score: ${from})\np.score = ${to}</code>를 실행하면? (형식: 변경: 이전 -> 이후)`,
            prefix: '', suffix: '', accept: [`변경: ${from} -> ${to}`], placeholder: '출력 결과',
            why: `oldValue는 바뀌기 전 값 ${from}, score는 이미 바뀐 값 ${to}를 가리켜요.`,
            hint: 'oldValue는 이전 값, score는 새 값이에요.'
          };
        },
        () => makeChoice(
          'willSet 블록 안에서 "곧 들어올 새 값"을 가리키는 이름은?',
          'newValue', ['oldValue', 'nextValue', 'self'],
          '<code>newValue</code>는 willSet 안에서 곧 대입될 새 값을 가리켜요.',
          '"new"(새로운)와 "value"(값)를 합친 이름이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>temperature</code>(Int) 프로퍼티에, 값이 바뀔 때마다 <code>"온도: \\(temperature)"</code>를 출력하는 didSet을 추가한 struct <code>Sensor</code>를 정의하세요.',
          starter: '',
          rows: 5,
          placeholder: 'struct Sensor {\n    var temperature: Int {\n        didSet {\n            print("온도: \\(temperature)")\n        }\n    }\n}',
          accept: ['struct Sensor {\n    var temperature: Int {\n        didSet {\n            print("온도: \\(temperature)")\n        }\n    }\n}'],
          why: 'didSet 블록 안에서 바뀐 뒤의 프로퍼티 값을 그대로 참조할 수 있어요.',
          hint: 'struct Sensor { var temperature: Int { didSet { print("온도: \\(temperature)") } } }'
        }),
      ],
      boss: () => {
        const from = randInt(0, 40);
        const to = randInt(41, 80);
        return {
          type: 'blank',
          q: `<code>struct Player { var score: Int { didSet { print("변경: \\(oldValue) -> \\(score)") } } }\nvar p = Player(score: ${from})\np.score = ${to}</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [`변경: ${from} -> ${to}`], placeholder: '출력 결과',
          why: `didSet은 값이 바뀐 직후 실행되며, oldValue(${from})와 새 값(${to})을 함께 출력해요.`,
          hint: 'oldValue는 이전 값을 가리켜요.'
        };
      }
    },
    {
      id: 'methodsAndInit',
      title: '메서드와 이니셜라이저(init)',
      ready: true,
      summary: '타입 안에 메서드를 정의하고, init으로 커스텀 초기화 로직을 만드는 방법을 배워요.',
      goals: ['타입 안에 메서드 정의하기', 'init으로 커스텀 초기화 만들기', 'struct의 mutating 메서드 이해하기'],
      blocks: [
        {
          h: 'init: 커스텀 초기화',
          html: `<p><code>init</code>은 인스턴스를 만들 때 실행되는 특별한 메서드예요. 매개변수를 검증하거나 다른 프로퍼티를 계산해서 채워야 할 때 직접 정의해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Circle {
    var radius: Double
    var area: Double

    init(radius: Double) {
        self.radius = radius
        self.area = radius * radius * 3.14
    }
}
let c = Circle(radius: 2)
print(c.area)`,
            out: `12.56`
          }
        },
        {
          h: 'mutating 메서드: struct 내부 값 바꾸기',
          html: `<p>struct는 값 타입이라서, 메서드 안에서 자기 자신의 프로퍼티를 바꾸려면 <code>mutating</code>을 붙여야 해요. class의 메서드에는 필요 없어요(참조 타입이라서요).</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Counter {
    var count = 0
    mutating func increment() {
        count += 1
    }
}
var c = Counter()
c.increment()
print(c.count)`,
            out: `1`
          },
          after: `<div class="note"><b>정리</b> — <code>self</code>는 인스턴스 자기 자신을 가리켜요. init 안에서 매개변수 이름과 프로퍼티 이름이 같을 때, <code>self.radius = radius</code>처럼 구분하는 데 특히 자주 쓰여요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `인스턴스를 만들 때 자동으로 호출되는 초기화 메서드의 이름을 쓰세요.`,
          prefix: '', suffix: '(radius: Double) { self.radius = radius }', accept: ['init'], placeholder: '메서드 이름',
          why: '<code>init</code>은 인스턴스를 만들 때 호출되는 초기화 메서드예요.',
          hint: '"초기화(initialize)"를 줄인 이름이에요.'
        }),
        () => makeChoice(
          'struct의 메서드 안에서 자기 자신의 프로퍼티를 바꾸려면 무엇을 붙여야 하나요?',
          'mutating', ['static', 'override', 'final'],
          'struct는 값 타입이라서, 내부 값을 바꾸는 메서드에는 <code>mutating</code>을 붙여야 해요.',
          '"변형시키다"라는 뜻의 영어 단어예요.'
        ),
        () => {
          const r = randInt(1, 5);
          const area = (r * r * 3.14).toFixed(2).replace(/0$/, '').replace(/\.$/, '.0');
          return {
            type: 'blank',
            q: `<code>struct Circle { var radius: Double; var area: Double; init(radius: Double) { self.radius = radius; self.area = radius * radius * 3.14 } }\nlet c = Circle(radius: ${r})\nprint(c.area)</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [String(r * r * 3.14)], placeholder: '숫자',
            why: `area는 radius * radius * 3.14 = ${r} * ${r} * 3.14 = ${r * r * 3.14}로 계산돼요.`,
            hint: 'init 안의 계산식을 그대로 계산해보세요.'
          };
        },
        () => makeChoice(
          'class의 메서드에서 프로퍼티를 바꿀 때도 mutating이 필요한가요?',
          '아니요, class는 참조 타입이라 필요 없어요', ['네, class도 반드시 필요해요', 'class에서만 필요해요', 'static 메서드에서만 필요해요'],
          'mutating은 값 타입인 struct/enum에만 필요해요. class는 참조 타입이라 필요 없어요.',
          '값 타입과 참조 타입의 차이를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>count</code>(Int, 기본값 0) 프로퍼티와, count를 1 늘리는 <code>mutating func increment()</code> 메서드를 가진 <code>Counter</code> struct를 정의하세요.',
          starter: '',
          rows: 5,
          placeholder: 'struct Counter {\n    var count = 0\n    mutating func increment() {\n        count += 1\n    }\n}',
          accept: ['struct Counter {\n    var count = 0\n    mutating func increment() {\n        count += 1\n    }\n}'],
          why: 'struct 내부 값을 바꾸는 메서드는 mutating으로 표시해야 해요.',
          hint: 'struct Counter { var count = 0; mutating func increment() { count += 1 } }'
        }),
      ],
      boss: () => {
        const start = randInt(0, 5);
        const calls = randInt(2, 6);
        return {
          type: 'blank',
          q: `<code>struct Counter { var count = ${start}; mutating func increment() { count += 1 } }\nvar c = Counter()\nfor _ in 0..<${calls} { c.increment() }\nprint(c.count)</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(start + calls)], placeholder: '숫자',
          why: `increment()를 ${calls}번 호출했으므로 ${start} + ${calls} = ${start + calls}가 돼요.`,
          hint: 'mutating 메서드가 count를 실제로 1씩 늘려요.'
        };
      }
    },
    {
      id: 'staticMembers',
      title: '타입 프로퍼티와 타입 메서드: static',
      ready: true,
      summary: '인스턴스가 아니라 타입 자체에 속하는 static 프로퍼티/메서드를 배워요.',
      goals: ['static 프로퍼티로 타입 전체가 공유하는 값 만들기', 'static 메서드 정의하기', '인스턴스 없이 타입 이름으로 접근하기'],
      blocks: [
        {
          h: 'static 프로퍼티: 타입 전체가 공유',
          html: `<p><code>static</code>이 붙은 프로퍼티는 인스턴스마다 따로 있는 게 아니라, <b>타입 전체가 하나만 공유</b>해요. 인스턴스를 만들지 않고 <code>타입이름.프로퍼티</code>로 바로 접근해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Counter {
    static var totalCreated = 0
    init() {
        Counter.totalCreated += 1
    }
}
let a = Counter()
let b = Counter()
print(Counter.totalCreated)`,
            out: `2`
          }
        },
        {
          h: 'static 메서드: 인스턴스 없이 호출',
          html: `<p><code>static func</code>도 인스턴스 없이 <code>타입이름.메서드()</code>로 바로 호출해요. 특정 인스턴스의 상태와 상관없는, 타입 자체와 관련된 동작을 표현할 때 써요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct MathHelper {
    static func square(_ n: Int) -> Int {
        return n * n
    }
}
print(MathHelper.square(5))`,
            out: `25`
          },
          after: `<div class="note"><b>정리</b> — class에서는 <code>static</code> 대신 <code>class func</code>를 쓰면, 자식 클래스가 그 메서드를 override할 수 있게 돼요. struct에는 static만 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'static 프로퍼티의 특징은?',
          '인스턴스마다 따로 있지 않고 타입 전체가 하나를 공유한다', ['인스턴스마다 독립적으로 복사된다', 'let으로만 선언할 수 있다', 'class에서만 쓸 수 있다'],
          'static 프로퍼티는 타입 자체에 속해서, 모든 인스턴스가 같은 값 하나를 공유해요.',
          '"공유"라는 단어가 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `인스턴스가 아니라 타입 자체에 속하는 프로퍼티/메서드를 만들 때 붙이는 키워드를 쓰세요.`,
          prefix: '', suffix: ' var totalCreated = 0', accept: ['static'], placeholder: '키워드',
          why: '<code>static</code>을 붙이면 타입 자체에 속하는 프로퍼티/메서드가 돼요.',
          hint: '"정적인"이라는 뜻의 영어 단어예요.'
        }),
        () => {
          const count = randInt(2, 6);
          return {
            type: 'blank',
            q: `<code>struct Counter { static var totalCreated = 0; init() { Counter.totalCreated += 1 } }</code>로 인스턴스를 ${count}개 만들면, <code>Counter.totalCreated</code>는?`,
            prefix: '', suffix: '', accept: [String(count)], placeholder: '숫자',
            why: `init이 호출될 때마다 totalCreated가 1씩 늘어나므로, ${count}개를 만들면 ${count}가 돼요.`,
            hint: '인스턴스를 만들 때마다 static 값이 늘어나요.'
          };
        },
        () => makeChoice(
          'static 메서드를 호출하는 올바른 방법은?',
          '타입이름.메서드()', ['인스턴스.메서드()만 가능', 'self.메서드()만 가능', '호출할 수 없다'],
          'static 메서드는 인스턴스 없이 타입 이름으로 바로 호출해요.',
          '인스턴스가 필요 없다는 게 static의 특징이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Int</code>를 받아 세제곱(n * n * n)을 반환하는 <code>static func cube(_ n: Int) -> Int</code>를 가진 <code>MathHelper</code> struct를 정의하세요.',
          starter: '',
          rows: 5,
          placeholder: 'struct MathHelper {\n    static func cube(_ n: Int) -> Int {\n        return n * n * n\n    }\n}',
          accept: ['struct MathHelper {\n    static func cube(_ n: Int) -> Int {\n        return n * n * n\n    }\n}'],
          why: 'static func는 인스턴스 없이 타입 이름으로 바로 호출할 수 있는 메서드예요.',
          hint: 'struct MathHelper { static func cube(_ n: Int) -> Int { return n * n * n } }'
        }),
      ],
      boss: () => {
        const n = randInt(2, 8);
        return {
          type: 'blank',
          q: `<code>struct MathHelper { static func square(_ n: Int) -> Int { return n * n } }\nprint(MathHelper.square(${n}))</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(n * n)], placeholder: '숫자',
          why: `square(${n})은 ${n} * ${n} = ${n * n}을 반환해요.`,
          hint: '인스턴스 없이 타입 이름으로 바로 호출해요.'
        };
      }
    },
    {
      id: 'failableInitializers',
      title: '실패 가능한 이니셜라이저: init?',
      ready: true,
      summary: '초기화가 실패할 수 있는 경우를 표현하는 init?과, 조건 검증 패턴을 배워요.',
      goals: ['init?로 실패 가능한 초기화 표현하기', 'guard로 조건을 검증하고 nil 반환하기', '실패 가능한 init 호출 결과를 옵셔널로 다루기'],
      blocks: [
        {
          h: 'init?: 조건에 맞지 않으면 nil',
          html: `<p>매개변수가 유효하지 않을 때 인스턴스를 아예 만들지 않게 하려면 <code>init?</code>을 써요. 이 초기화는 값을 만들면 인스턴스를, 실패하면 <code>nil</code>을 돌려줘요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Age {
    var value: Int
    init?(value: Int) {
        if value < 0 {
            return nil
        }
        self.value = value
    }
}
let a = Age(value: -5)
print(a)`,
            out: `nil`
          }
        },
        {
          h: '성공하는 경우와 함께 비교하기',
          html: `<p>유효한 값을 넘기면 정상적으로 인스턴스가 만들어져요. <code>init?</code>의 결과는 항상 <b>옵셔널</b>이라서, if let 등으로 안전하게 다룰 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Age {
    var value: Int
    init?(value: Int) {
        if value < 0 {
            return nil
        }
        self.value = value
    }
}
if let a = Age(value: 17) {
    print(a.value)
} else {
    print("잘못된 나이")
}`,
            out: `17`
          },
          after: `<div class="note"><b>정리</b> — <code>init?</code>은 파일에서 데이터를 읽거나, 문자열을 숫자로 변환할 때(<code>Int("abc")</code>도 사실 실패 가능한 초기화예요) 아주 흔히 볼 수 있는 패턴이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'init? 초기화가 실패하면 무엇을 반환하나요?',
          'nil', ['0', '빈 인스턴스', '컴파일 오류'],
          '실패 가능한 초기화는 실패 시 nil을 반환하고, 인스턴스가 만들어지지 않아요.',
          '옵셔널 개념을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `실패할 수도 있는 이니셜라이저를 정의할 때 <code>init</code> 뒤에 붙이는 기호를 쓰세요.`,
          prefix: '', suffix: '(value: Int) { if value < 0 { return nil }; self.value = value }', accept: ['?'], placeholder: '기호',
          why: '<code>init?</code>은 실패할 수 있는 초기화를 나타내는 기호예요.',
          hint: '옵셔널을 나타내는 기호와 같아요.'
        }),
        () => {
          const val = randInt(-10, -1);
          return {
            type: 'blank',
            q: `<code>struct Age { var value: Int; init?(value: Int) { if value < 0 { return nil }; self.value = value } }\nlet a = Age(value: ${val})\nprint(a)</code>를 실행하면?`,
            prefix: '', suffix: '', accept: ['nil'], placeholder: '출력 결과',
            why: `${val}은 0보다 작으므로 init?가 nil을 반환해요.`,
            hint: '음수는 유효하지 않은 나이로 처리돼요.'
          };
        },
        () => makeChoice(
          '<code>init?(value: Int)</code>로 만든 결과의 타입은?',
          '옵셔널(Optional)', ['항상 값이 있는 non-optional', 'Bool', '항상 Int'],
          '실패 가능한 초기화의 결과는 항상 옵셔널이에요. 성공하면 값이, 실패하면 nil이 들어있어요.',
          '실패할 수도 있으니 옵셔널이 되는 게 자연스러워요.'
        ),
        () => ({
          type: 'code',
          q: '<code>value</code>(Int)가 0 이상이면 초기화에 성공하고, 음수면 <code>nil</code>을 반환하는 <code>init?(value: Int)</code>를 가진 <code>PositiveNumber</code> struct를 정의하세요.',
          starter: '',
          rows: 6,
          placeholder: 'struct PositiveNumber {\n    var value: Int\n    init?(value: Int) {\n        if value < 0 {\n            return nil\n        }\n        self.value = value\n    }\n}',
          accept: ['struct PositiveNumber {\n    var value: Int\n    init?(value: Int) {\n        if value < 0 {\n            return nil\n        }\n        self.value = value\n    }\n}'],
          why: '조건에 맞지 않으면 return nil로 초기화를 실패시켜요.',
          hint: 'init? 안에서 if value < 0 { return nil } 을 먼저 검사해요.'
        }),
      ],
      boss: () => {
        const val = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>struct Age { var value: Int; init?(value: Int) { if value < 0 { return nil }; self.value = value } }\nif let a = Age(value: ${val}) { print(a.value) } else { print("실패") }</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(val)], placeholder: '숫자',
          why: `${val}은 0 이상이므로 초기화에 성공하고, a.value는 ${val}이에요.`,
          hint: '양수는 정상적으로 초기화돼요.'
        };
      }
    },
{
      id: 'enumsBasics',
      title: '열거형(enum) 기본',
      ready: true,
      summary: 'enum으로 정해진 값들의 집합을 표현하고, switch와 함께 쓰는 방법을 배워요.',
      goals: ['enum 정의 문법 익히기', 'enum 값을 switch로 처리하기', 'enum이 안전한 이유(고정된 경우의 수) 이해하기'],
      blocks: [
        {
          h: 'enum: 정해진 값들의 목록',
          html: `<p><code>enum</code>은 미리 정해진 몇 가지 값(case) 중 하나만 가질 수 있는 타입이에요. 요일, 방향, 상태처럼 "정해진 종류"를 표현할 때 딱 맞아요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `enum Direction {
    case north, south, east, west
}
let d = Direction.north
print(d)`,
            out: `north`
          }
        },
        {
          h: 'switch와 함께 쓰기',
          html: `<p>enum 값은 switch로 각 경우를 처리하기에 아주 좋아요. 모든 case를 다루면 <code>default</code>가 없어도 괜찮아요(스위프트가 모든 경우를 다뤘는지 확인해줘요).</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `enum Direction {
    case north, south, east, west
}
let d = Direction.east
switch d {
case .north:
    print("북쪽")
case .south:
    print("남쪽")
case .east:
    print("동쪽")
case .west:
    print("서쪽")
}`,
            out: `동쪽`
          },
          after: `<div class="note"><b>정리</b> — 타입이 이미 정해져 있으면 <code>Direction.east</code> 대신 점(.) 하나만 찍어 <code>.east</code>로 짧게 쓸 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'enum을 쓰기에 가장 적합한 상황은?',
          '요일, 방향처럼 정해진 몇 가지 값 중 하나를 표현할 때', ['수백만 개의 서로 다른 값을 표현할 때', '문자열을 이어붙일 때', '숫자를 계산할 때'],
          'enum은 미리 정해진 한정된 경우의 수를 표현하는 데 가장 적합해요.',
          '"정해진 목록"이라는 특징을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `enum 안에서 각 값을 정의할 때 쓰는 키워드를 쓰세요.`,
          prefix: 'enum Direction { ', suffix: ' north, south }', accept: ['case'], placeholder: '키워드',
          why: '<code>case</code>는 enum의 각 값을 정의하는 키워드예요.',
          hint: 'switch문에서도 본 적 있는 키워드예요.'
        }),
        () => {
          const dirs = ['north', 'south', 'east', 'west'];
          const names = { north: '북쪽', south: '남쪽', east: '동쪽', west: '서쪽' };
          const d = pick(dirs);
          return {
            type: 'blank',
            q: `<code>enum Direction { case north, south, east, west }\nlet d = Direction.${d}\nswitch d {\ncase .north: print("북쪽")\ncase .south: print("남쪽")\ncase .east: print("동쪽")\ncase .west: print("서쪽")\n}</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [names[d]], placeholder: '출력 결과',
            why: `d는 .${d}이므로 해당하는 case의 블록이 실행되어 ${names[d]}가 출력돼요.`,
            hint: '값에 맞는 case를 찾아보세요.'
          };
        },
        () => makeChoice(
          '타입이 이미 명확할 때, <code>Direction.east</code>를 줄여 쓰는 방법은?',
          '.east', ['east', '#east', 'Direction::east'],
          '타입이 문맥상 이미 정해져 있으면 <code>.east</code>처럼 타입 이름을 생략할 수 있어요.',
          '점 하나만 남기면 돼요.'
        ),
        () => ({
          type: 'code',
          q: '<code>red</code>, <code>green</code>, <code>blue</code> 세 가지 case를 가진 <code>Color</code> enum을 정의하세요.',
          starter: '',
          rows: 3,
          placeholder: 'enum Color {\n    case red, green, blue\n}',
          accept: ['enum Color {\n    case red, green, blue\n}'],
          why: 'enum 이름 { case 값1, 값2, 값3 } 형태로 정의해요.',
          hint: 'enum Color { case red, green, blue }'
        }),
      ],
      boss: () => {
        const dirs = ['north', 'south', 'east', 'west'];
        const names = { north: '북쪽', south: '남쪽', east: '동쪽', west: '서쪽' };
        const d = pick(dirs);
        return {
          type: 'blank',
          q: `<code>enum Direction { case north, south, east, west }\nlet d = Direction.${d}\nswitch d {\ncase .north: print("북쪽")\ncase .south: print("남쪽")\ncase .east: print("동쪽")\ncase .west: print("서쪽")\n}</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [names[d]], placeholder: '출력 결과',
          why: `d가 .${d}이므로 ${names[d]}가 출력돼요.`,
          hint: '각 case가 어떤 한글에 대응하는지 확인해보세요.'
        };
      }
    },
    {
      id: 'enumsRawValues',
      title: '열거형의 원시값(raw value)',
      ready: true,
      summary: 'enum case에 고정된 원시값을 붙이고, rawValue로 값을 주고받는 방법을 배워요.',
      goals: ['원시값이 있는 enum 정의하기', '.rawValue로 원시값 꺼내기', 'init?(rawValue:)로 값에서 enum 만들기'],
      blocks: [
        {
          h: '원시값: case마다 고정된 값 붙이기',
          html: `<p>enum의 각 case에 <code>String</code>, <code>Int</code> 같은 <b>원시값(raw value)</b>을 붙일 수 있어요. <code>.rawValue</code>로 그 값을 꺼내요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `enum Weekday: Int {
    case monday = 1, tuesday, wednesday, thursday, friday, saturday, sunday
}
let day = Weekday.wednesday
print(day.rawValue)`,
            out: `3`
          }
        },
        {
          h: 'init?(rawValue:): 값으로부터 enum 만들기',
          html: `<p>원시값을 알고 있을 때, <code>Weekday(rawValue: 3)</code>처럼 역으로 enum 값을 만들 수 있어요. 유효하지 않은 값이면 <code>nil</code>이 되므로 결과는 옵셔널이에요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `enum Weekday: Int {
    case monday = 1, tuesday, wednesday
}
let day = Weekday(rawValue: 2)
print(day)`,
            out: `Optional(Weekday.tuesday)`
          },
          after: `<div class="note"><b>정리</b> — <code>Int</code> 원시값은 첫 case에만 값을 적으면 이후 case들이 자동으로 1씩 늘어나요. <code>String</code> 원시값은 각 case 이름이 자동으로 그 case의 rawValue가 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>enum Weekday: Int { case monday = 1, tuesday, wednesday }</code>에서 wednesday의 rawValue는?',
          '3', ['1', '2', '0'],
          'monday가 1이면, 이후 case는 자동으로 1씩 늘어나서 tuesday는 2, wednesday는 3이 돼요.',
          '순서대로 1씩 늘어난다는 걸 기억하세요.'
        ),
        () => ({
          type: 'blank',
          q: `enum 값의 원시값을 꺼낼 때 쓰는 프로퍼티 이름을 쓰세요.`,
          prefix: 'day.', suffix: '', accept: ['rawValue'], placeholder: '프로퍼티 이름',
          why: '<code>.rawValue</code>는 enum case에 붙은 원시값을 꺼내는 프로퍼티예요.',
          hint: '"원시 값"을 그대로 영어로 표현한 이름이에요.'
        }),
        () => {
          const val = randInt(1, 3);
          const names = { 1: 'monday', 2: 'tuesday', 3: 'wednesday' };
          return {
            type: 'blank',
            q: `<code>enum Weekday: Int { case monday = 1, tuesday, wednesday }\nlet day = Weekday(rawValue: ${val})\nprint(day)</code>를 실행하면? (Optional(Weekday.값) 형태로)`,
            prefix: '', suffix: '', accept: [`Optional(Weekday.${names[val]})`], placeholder: '출력 결과',
            why: `rawValue ${val}에 해당하는 case는 ${names[val]}이고, init?(rawValue:)의 결과는 옵셔널이라 Optional로 감싸져요.`,
            hint: '결과는 항상 옵셔널로 감싸져 있어요.'
          };
        },
        () => makeChoice(
          '<code>Weekday(rawValue:)</code>가 유효하지 않은 값을 받으면?',
          'nil을 반환한다', ['크래시가 발생한다', '가장 가까운 case를 반환한다', '컴파일 오류가 난다'],
          '실패 가능한 초기화이므로, 유효하지 않은 rawValue를 넘기면 안전하게 nil을 반환해요.',
          'init?(rawValue:)도 실패 가능한 이니셜라이저예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>String</code> 원시값을 갖는 <code>Fruit</code> enum을 정의하세요. case는 <code>apple</code>, <code>banana</code>이고, apple의 rawValue는 <code>"사과"</code>, banana는 <code>"바나나"</code>여야 해요.',
          starter: '',
          rows: 3,
          placeholder: 'enum Fruit: String {\n    case apple = "사과", banana = "바나나"\n}',
          accept: ['enum Fruit: String {\n    case apple = "사과", banana = "바나나"\n}'],
          why: 'String 원시값은 각 case마다 명시적으로 값을 적어줘요.',
          hint: 'enum Fruit: String { case apple = "사과", banana = "바나나" }'
        }),
      ],
      boss: () => {
        const val = randInt(1, 7);
        const names = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        return {
          type: 'blank',
          q: `<code>enum Weekday: Int { case monday = 1, tuesday, wednesday, thursday, friday, saturday, sunday }\nlet day = Weekday(rawValue: ${val})!\nprint(day.rawValue)</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(val)], placeholder: '숫자',
          why: `rawValue ${val}로 만든 enum의 rawValue를 다시 꺼내면 그대로 ${val}이에요.`,
          hint: '넣은 값과 꺼낸 값은 같아요.'
        };
      }
    },
    {
      id: 'enumsAssociatedValues',
      title: '열거형의 연관값(associated value)',
      ready: true,
      summary: 'case마다 서로 다른 추가 데이터를 담을 수 있는 연관값을 배워요. 스위프트의 대표적인 강력한 기능이에요.',
      goals: ['연관값이 있는 enum 정의하기', 'switch의 case에서 연관값 꺼내기', '원시값과 연관값의 차이 이해하기'],
      blocks: [
        {
          h: '연관값: case마다 다른 데이터를 담기',
          html: `<p>원시값은 모든 case가 같은 타입의 고정값 하나만 가지지만, <b>연관값(associated value)</b>은 case마다 서로 다른 타입·개수의 데이터를 담을 수 있어요. 결제 수단처럼 "종류마다 필요한 정보가 다른" 상황에 딱 맞아요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `enum PaymentMethod {
    case cash
    case card(number: String)
}
let payment = PaymentMethod.card(number: "1234")
switch payment {
case .cash:
    print("현금 결제")
case .card(let number):
    print("카드 결제: \\(number)")
}`,
            out: `카드 결제: 1234`
          }
        },
        {
          h: '여러 값을 함께 담기',
          html: `<p>연관값은 여러 개를 튜플처럼 함께 담을 수도 있어요. switch의 각 case에서 <code>let</code>으로 그 값을 꺼내 이름을 붙여 써요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `enum ServerResponse {
    case success(code: Int, message: String)
    case failure(reason: String)
}
let response = ServerResponse.success(code: 200, message: "OK")
switch response {
case .success(let code, let message):
    print("성공 \\(code): \\(message)")
case .failure(let reason):
    print("실패: \\(reason)")
}`,
            out: `성공 200: OK`
          },
          after: `<div class="note"><b>정리</b> — 연관값이 있는 enum은 원시값을 가질 수 없어요(둘은 함께 쓸 수 없는 개념이에요). 스위프트에서 옵셔널(Optional) 자체도 사실 <code>.some(값)</code>/<code>.none</code>이라는 연관값을 가진 enum으로 구현되어 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '연관값(associated value)의 특징은?',
          'case마다 서로 다른 타입·개수의 데이터를 담을 수 있다', ['모든 case가 항상 같은 타입의 값 하나만 가진다', 'enum에서는 쓸 수 없는 기능이다', '항상 String만 담을 수 있다'],
          '연관값은 원시값과 달리, case마다 다른 형태의 데이터를 자유롭게 담을 수 있어요.',
          '결제 수단 예시를 떠올려보세요. 현금과 카드가 필요로 하는 정보가 다르죠.'
        ),
        () => ({
          type: 'blank',
          q: `switch의 case에서 연관값을 꺼내 이름을 붙일 때 쓰는 키워드를 쓰세요. (case .card(___ number):)`,
          prefix: 'case .card(', suffix: ' number):', accept: ['let'], placeholder: '키워드',
          why: '<code>let</code>으로 연관값을 새 상수 이름에 담아 꺼낼 수 있어요.',
          hint: '옵셔널 바인딩에서도 쓰던 키워드예요.'
        }),
        () => {
          const num = String(randInt(1000, 9999));
          return {
            type: 'blank',
            q: `<code>enum PaymentMethod { case cash; case card(number: String) }\nlet payment = PaymentMethod.card(number: "${num}")\nswitch payment {\ncase .cash: print("현금")\ncase .card(let number): print("카드: \\(number)")\n}</code>를 실행하면? (형식: 카드: 번호)`,
            prefix: '', suffix: '', accept: [`카드: ${num}`], placeholder: '출력 결과',
            why: `payment가 .card(number: "${num}")이므로 두 번째 case가 실행되어 "카드: ${num}"이 출력돼요.`,
            hint: '.card case가 실행되고, number에 값이 담겨요.'
          };
        },
        () => makeChoice(
          '연관값이 있는 enum은 원시값(raw value)도 함께 가질 수 있나요?',
          '아니요, 둘은 함께 쓸 수 없어요', ['네, 항상 함께 쓸 수 있어요', 'Int 연관값일 때만 가능해요', 'class에서만 가능해요'],
          '연관값과 원시값은 서로 다른 방식이라 한 enum에서 함께 쓸 수 없어요.',
          '스위프트 문법 규칙 중 하나예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>circle(radius: Double)</code>과 <code>rectangle(width: Double, height: Double)</code> 두 case를 가진 <code>Shape</code> enum을 정의하세요.',
          starter: '',
          rows: 4,
          placeholder: 'enum Shape {\n    case circle(radius: Double)\n    case rectangle(width: Double, height: Double)\n}',
          accept: ['enum Shape {\n    case circle(radius: Double)\n    case rectangle(width: Double, height: Double)\n}'],
          why: '각 case가 서로 다른 개수/타입의 연관값을 가질 수 있어요.',
          hint: 'enum Shape { case circle(radius: Double); case rectangle(width: Double, height: Double) }'
        }),
      ],
      boss: () => {
        const code = pick([200, 404, 500]);
        const msg = code === 200 ? 'OK' : code === 404 ? 'Not Found' : 'Server Error';
        return {
          type: 'blank',
          q: `<code>enum ServerResponse { case success(code: Int, message: String) }\nlet r = ServerResponse.success(code: ${code}, message: "${msg}")\nswitch r {\ncase .success(let code, let message): print("성공 \\(code): \\(message)")\n}</code>를 실행하면? (형식: 성공 코드: 메시지)`,
          prefix: '', suffix: '', accept: [`성공 ${code}: ${msg}`], placeholder: '출력 결과',
          why: '연관값 code와 message가 switch case에서 꺼내져 그대로 출력돼요.',
          hint: 'let code, let message가 각각 어떤 값을 가리키는지 확인해보세요.'
        };
      }
    },
    {
      id: 'protocolsBasics',
      title: '프로토콜(protocol): 스위프트의 인터페이스',
      ready: true,
      summary: 'protocol로 타입이 지켜야 할 규약을 정의하고, 여러 타입이 이를 준수하게 만드는 방법을 배워요.',
      goals: ['protocol 정의 문법 익히기', 'struct/class가 프로토콜을 준수하게 만들기', '프로토콜 타입으로 여러 타입을 다루기'],
      blocks: [
        {
          h: 'protocol: 지켜야 할 규약',
          html: `<p><code>protocol</code>은 "이런 프로퍼티나 메서드가 반드시 있어야 한다"는 <b>규약(계약)</b>만 정의해요. 실제 구현은 그 프로토콜을 <b>준수(conform)</b>하는 타입이 채워 넣어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `protocol Greetable {
    func greet() -> String
}
struct Person: Greetable {
    var name: String
    func greet() -> String {
        return "안녕, \\(name)!"
    }
}
let p = Person(name: "지수")
print(p.greet())`,
            out: `안녕, 지수!`
          }
        },
        {
          h: '여러 타입이 같은 프로토콜을 준수하기',
          html: `<p>서로 다른 struct/class가 같은 프로토콜을 준수하면, 프로토콜 타입 하나로 여러 타입을 동일하게 다룰 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `protocol Greetable {
    func greet() -> String
}
struct Person: Greetable {
    var name: String
    func greet() -> String { return "안녕, \\(name)!" }
}
struct Robot: Greetable {
    func greet() -> String { return "삐빅, 안녕하세요" }
}
let items: [Greetable] = [Person(name: "민준"), Robot()]
for item in items {
    print(item.greet())
}`,
            out: `안녕, 민준!
삐빅, 안녕하세요`
          },
          after: `<div class="note"><b>정리</b> — 프로토콜을 준수하려면 요구된 메서드/프로퍼티를 <b>정확히</b> 구현해야 해요. 하나라도 빠지면 컴파일 오류가 나서, "구현을 깜빡하는" 실수를 미리 잡아줘요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'protocol이 정의하는 것은?',
          '타입이 반드시 구현해야 할 프로퍼티·메서드의 규약', ['실제 동작하는 구현 코드 전체', 'class의 부모 타입 하나만', '변수의 초기값'],
          'protocol은 구현이 아니라, "이런 게 있어야 한다"는 규약(요구사항)만 정의해요.',
          '"인터페이스"라는 단어와 비슷한 개념이에요.'
        ),
        () => ({
          type: 'blank',
          q: `struct나 class가 프로토콜을 준수한다고 선언할 때, 타입 이름 뒤에 붙이는 기호를 쓰세요.`,
          prefix: 'struct Person', suffix: ' Greetable { }', accept: [':'], placeholder: '기호',
          why: '<code>: 프로토콜이름</code>으로 그 프로토콜을 준수함을 선언해요.',
          hint: '상속에서도 비슷하게 쓰는 기호예요.'
        }),
        () => makeChoice(
          '프로토콜이 요구하는 메서드를 구현하지 않으면 어떻게 되나요?',
          '컴파일 오류가 난다', ['자동으로 기본 구현이 채워진다', '경고만 뜨고 실행된다', 'nil을 반환하는 메서드가 자동 생성된다'],
          '요구사항을 하나라도 빠뜨리면 컴파일 오류가 나서, 구현 누락을 미리 알려줘요.',
          '컴파일 시점에 안전성을 보장하는 스위프트의 특징이에요.'
        ),
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>protocol Greetable { func greet() -> String }\nstruct Person: Greetable { var name: String; func greet() -> String { return "반가워, \\(name)!" } }\nlet p = Person(name: "${name}")\nprint(p.greet())</code>를 실행하면? (형식: 반가워, 이름!)`,
            prefix: '', suffix: '', accept: [`반가워, ${name}!`], placeholder: '출력 결과',
            why: `greet() 메서드가 "반가워, \\(name)!"을 반환하도록 구현되어 있어서 name이 그대로 치환돼요.`,
            hint: 'greet() 안의 문자열 보간을 확인해보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>func area() -> Double</code>을 요구하는 <code>Shape</code> 프로토콜을 정의하세요.',
          starter: '',
          rows: 3,
          placeholder: 'protocol Shape {\n    func area() -> Double\n}',
          accept: ['protocol Shape {\n    func area() -> Double\n}'],
          why: 'protocol 이름 { func 메서드이름() -> 반환타입 } 형태로 요구사항만 정의해요.',
          hint: 'protocol Shape { func area() -> Double }'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연', '하늘']);
        return {
          type: 'blank',
          q: `<code>protocol Greetable { func greet() -> String }\nstruct Person: Greetable { var name: String; func greet() -> String { return "\\(name)입니다" } }\nlet items: [Greetable] = [Person(name: "${name}")]\nfor item in items { print(item.greet()) }</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [`${name}입니다`], placeholder: '출력 결과',
          why: `배열 안의 Person의 greet()는 "\\(name)입니다"를 반환하므로 "${name}입니다"가 출력돼요.`,
          hint: '배열에 담긴 순서대로 for-in이 실행돼요.'
        };
      }
    },
    {
      id: 'protocolExtensions',
      title: '프로토콜 익스텐션과 프로토콜 지향 프로그래밍',
      ready: true,
      summary: '프로토콜에 기본 구현을 제공하는 익스텐션과, 스위프트의 대표 철학인 프로토콜 지향 프로그래밍을 배워요.',
      goals: ['프로토콜 익스텐션으로 기본 구현 제공하기', '준수하는 타입이 자동으로 기본 구현을 얻는 원리 이해하기', '필요할 때 기본 구현을 재정의하기'],
      blocks: [
        {
          h: '프로토콜 익스텐션: 기본 구현 제공하기',
          html: `<p><code>extension 프로토콜이름 { }</code> 안에 메서드를 구현해두면, 그 프로토콜을 준수하는 <b>모든 타입이 자동으로</b> 그 구현을 갖게 돼요. 매번 똑같은 코드를 반복해서 작성하지 않아도 돼요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `protocol Greetable {
    var name: String { get }
}
extension Greetable {
    func greet() -> String {
        return "안녕, \\(name)!"
    }
}
struct Person: Greetable {
    var name: String
}
let p = Person(name: "지수")
print(p.greet())`,
            out: `안녕, 지수!`
          }
        },
        {
          h: '프로토콜 지향 프로그래밍(POP)',
          html: `<p>클래스 상속 대신 "작은 프로토콜 여러 개 + 익스텐션의 기본 구현"을 조합하는 스타일을 <b>프로토콜 지향 프로그래밍</b>이라고 해요. 애플이 스위프트의 대표 철학으로 강조하는 방식이에요. 필요하면 특정 타입에서 기본 구현을 <b>재정의</b>할 수도 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `protocol Greetable {
    var name: String { get }
}
extension Greetable {
    func greet() -> String {
        return "안녕, \\(name)!"
    }
}
struct Robot: Greetable {
    var name: String
    func greet() -> String {
        return "삐빅, \\(name)"
    }
}
print(Robot(name: "R2").greet())`,
            out: `삐빅, R2`
          },
          after: `<div class="note"><b>정리</b> — 익스텐션의 기본 구현은 "공짜로 얻는 기능"이에요. 타입이 원하면 자신만의 구현으로 덮어쓸 수도 있어서, 유연함과 코드 재사용을 동시에 얻을 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '프로토콜 익스텐션에 메서드를 구현해두면 어떤 일이 일어나나요?',
          '그 프로토콜을 준수하는 모든 타입이 자동으로 그 구현을 갖게 된다', ['그 프로토콜은 더 이상 준수할 수 없게 된다', '기존 struct들이 모두 오류를 일으킨다', '아무 효과가 없다'],
          '프로토콜 익스텐션의 구현은 준수하는 모든 타입에 기본 구현으로 자동 제공돼요.',
          '"기본값"을 제공한다고 생각하면 쉬워요.'
        ),
        () => ({
          type: 'blank',
          q: `프로토콜에 기본 구현을 추가할 때 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: ' Greetable { func greet() -> String { return "안녕" } }', accept: ['extension'], placeholder: '키워드',
          why: '<code>extension</code>은 기존 타입이나 프로토콜에 기능을 추가할 때 써요.',
          hint: '"확장하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '클래스 상속 대신 작은 프로토콜 여러 개와 익스텐션 기본 구현을 조합하는 스위프트의 대표 철학을 무엇이라 부르나요?',
          '프로토콜 지향 프로그래밍', ['객체 지향 프로그래밍', '함수형 프로그래밍', '절차 지향 프로그래밍'],
          '스위프트는 프로토콜 + 익스텐션 조합을 강조하는 프로토콜 지향 프로그래밍(POP)을 대표 철학으로 내세워요.',
          '이 단원 제목에 정답이 그대로 들어 있어요.'
        ),
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>protocol Greetable { var name: String { get } }\nextension Greetable { func greet() -> String { return "반가워, \\(name)" } }\nstruct Person: Greetable { var name: String }\nprint(Person(name: "${name}").greet())</code>를 실행하면? (형식: 반가워, 이름)`,
            prefix: '', suffix: '', accept: [`반가워, ${name}`], placeholder: '출력 결과',
            why: `Person은 greet()를 따로 구현하지 않아서, 익스텐션의 기본 구현이 그대로 쓰여 "반가워, ${name}"이 출력돼요.`,
            hint: 'Person이 직접 greet를 구현하지 않았어요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>Greetable</code> 프로토콜(name: String { get }을 요구)에 대해, <code>"Hi, \\(name)"</code>을 반환하는 <code>greet()</code> 기본 구현을 익스텐션으로 추가하세요.',
          starter: '',
          rows: 3,
          placeholder: 'extension Greetable {\n    func greet() -> String {\n        return "Hi, \\(name)"\n    }\n}',
          accept: ['extension Greetable {\n    func greet() -> String {\n        return "Hi, \\(name)"\n    }\n}'],
          why: 'extension 프로토콜이름 { } 안에 기본 구현을 넣으면 준수하는 모든 타입이 이를 얻어요.',
          hint: 'extension Greetable { func greet() -> String { return "Hi, \\(name)" } }'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연', '하늘']);
        return {
          type: 'blank',
          q: `<code>protocol Greetable { var name: String { get } }\nextension Greetable { func greet() -> String { return "기본 인사, \\(name)" } }\nstruct Robot: Greetable { var name: String; func greet() -> String { return "삐빅, \\(name)" } }\nprint(Robot(name: "${name}").greet())</code>를 실행하면? (형식: 삐빅, 이름)`,
          prefix: '', suffix: '', accept: [`삐빅, ${name}`], placeholder: '출력 결과',
          why: 'Robot은 greet()를 직접 재정의했으므로 익스텐션의 기본 구현 대신 Robot 자신의 구현이 쓰여요.',
          hint: 'Robot이 자신만의 greet()를 가지고 있어요.'
        };
      }
    },
{
      id: 'extensions',
      title: '익스텐션(extension): 기존 타입 확장하기',
      ready: true,
      summary: 'extension으로 이미 만들어진 타입(내 타입뿐 아니라 Int, String 등)에 새 기능을 추가하는 방법을 배워요.',
      goals: ['extension으로 기존 타입에 메서드 추가하기', '표준 라이브러리 타입 확장하기', '익스텐션으로 코드를 목적별로 나누기'],
      blocks: [
        {
          h: 'extension: 내 타입에 기능 추가하기',
          html: `<p><code>extension</code>은 이미 정의된 타입에 새로운 메서드나 계산 프로퍼티를 <b>추가</b>해요. 원본 코드를 수정하지 않고도 기능을 덧붙일 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Circle {
    var radius: Double
}
extension Circle {
    func area() -> Double {
        return radius * radius * 3.14
    }
}
let c = Circle(radius: 2)
print(c.area())`,
            out: `12.56`
          }
        },
        {
          h: '표준 라이브러리 타입도 확장 가능',
          html: `<p><code>Int</code>, <code>String</code> 같은 스위프트 기본 타입에도 익스텐션으로 새 기능을 추가할 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `extension Int {
    var isEven: Bool {
        return self % 2 == 0
    }
}
print(4.isEven)
print(5.isEven)`,
            out: `true
false`
          },
          after: `<div class="note"><b>정리</b> — extension은 저장 프로퍼티는 추가할 수 없고, 메서드·계산 프로퍼티·이니셜라이저·프로토콜 준수 추가 등이 가능해요. 큰 타입을 기능별로 여러 익스텐션에 나눠 정리할 때도 자주 써요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'extension으로 할 수 없는 것은?',
          '새로운 저장 프로퍼티 추가', ['새로운 메서드 추가', '새로운 계산 프로퍼티 추가', '프로토콜 준수 추가'],
          'extension은 저장 프로퍼티(값을 저장하는 공간)는 추가할 수 없어요. 메서드나 계산 프로퍼티는 가능해요.',
          '"저장 공간을 늘리는" 것은 익스텐션의 역할이 아니에요.'
        ),
        () => ({
          type: 'blank',
          q: `이미 정의된 타입에 새 기능을 추가할 때 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: ' Int { var isEven: Bool { return self % 2 == 0 } }', accept: ['extension'], placeholder: '키워드',
          why: '<code>extension</code>은 기존 타입에 기능을 추가하는 키워드예요.',
          hint: '프로토콜 익스텐션에서도 썼던 키워드예요.'
        }),
        () => {
          const r = randInt(1, 6);
          return {
            type: 'blank',
            q: `<code>struct Circle { var radius: Double }\nextension Circle { func area() -> Double { return radius * radius * 3.14 } }\nlet c = Circle(radius: ${r})\nprint(c.area())</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [String(r * r * 3.14)], placeholder: '숫자',
            why: `area()는 radius * radius * 3.14 = ${r} * ${r} * 3.14 = ${r * r * 3.14}를 반환해요.`,
            hint: '익스텐션 안의 계산식을 그대로 계산해보세요.'
          };
        },
        () => {
          const n = pick([3, 4, 5, 6, 7, 8]);
          return makeChoice(
            `<code>extension Int { var isEven: Bool { return self % 2 == 0 } }</code>일 때 <code>${n}.isEven</code>의 결과는?`,
            String(n % 2 === 0), [String(n % 2 !== 0), 'nil', '컴파일 오류'],
            `${n} % 2 == 0은 ${n % 2 === 0 ? '참' : '거짓'}이므로 ${n % 2 === 0}이 반환돼요.`,
            `${n}이 짝수인지 홀수인지 먼저 확인해보세요.`
          );
        },
        () => ({
          type: 'code',
          q: '<code>String</code>에 <code>shout()</code>라는 메서드를 익스텐션으로 추가하세요. 이 메서드는 <code>self</code>를 대문자로 바꿔 반환해요. (uppercased() 사용)',
          starter: '',
          rows: 3,
          placeholder: 'extension String {\n    func shout() -> String {\n        return self.uppercased()\n    }\n}',
          accept: ['extension String {\n    func shout() -> String {\n        return self.uppercased()\n    }\n}'],
          why: 'extension String { } 안에 메서드를 정의하면 모든 String 값이 그 메서드를 쓸 수 있어요.',
          hint: 'extension String { func shout() -> String { return self.uppercased() } }'
        }),
      ],
      boss: () => {
        const n = randInt(2, 20);
        return {
          type: 'blank',
          q: `<code>extension Int { var isEven: Bool { return self % 2 == 0 } }\nprint(${n}.isEven)</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(n % 2 === 0)], placeholder: 'true 또는 false',
          why: `${n} % 2 == 0은 ${n % 2 === 0 ? '참(true)' : '거짓(false)'}이에요.`,
          hint: '2로 나눈 나머지를 확인해보세요.'
        };
      }
    },
    {
      id: 'errorHandlingBasics',
      title: '오류 처리: enum Error와 throws',
      ready: true,
      summary: '스위프트의 오류 타입을 정의하고, throws/do-catch로 오류를 던지고 처리하는 방법을 배워요.',
      goals: ['Error 프로토콜을 준수하는 enum 정의하기', 'throws 함수와 throw로 오류 던지기', 'do-catch로 오류 처리하기'],
      blocks: [
        {
          h: '오류 타입 정의하기',
          html: `<p>스위프트에서 오류는 보통 <code>Error</code> 프로토콜을 준수하는 <code>enum</code>으로 표현해요. 실패할 수 있는 함수에는 <code>throws</code>를 붙이고, 실제로 실패하면 <code>throw</code>로 오류를 던져요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `enum ValidationError: Error {
    case tooShort
    case tooLong
}
func validate(name: String) throws {
    if name.count < 2 {
        throw ValidationError.tooShort
    }
}`,
            out: `(오류 타입과 검증 함수 정의)`
          }
        },
        {
          h: 'do-catch: 오류 처리하기',
          html: `<p><code>try</code>가 붙은 호출은 <code>do { } catch { }</code> 블록 안에서만 할 수 있어요. 오류가 던져지면 <code>catch</code> 블록으로 이동해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `enum ValidationError: Error {
    case tooShort
}
func validate(name: String) throws {
    if name.count < 2 {
        throw ValidationError.tooShort
    }
    print("유효한 이름")
}
do {
    try validate(name: "a")
} catch {
    print("오류 발생: \\(error)")
}`,
            out: `오류 발생: tooShort`
          },
          after: `<div class="note"><b>정리</b> — throws가 붙은 함수를 호출할 때는 반드시 <code>try</code>를 붙여야 해요. 이건 "이 호출은 실패할 수도 있다"는 걸 호출하는 쪽 코드에서도 명확히 드러내기 위한 규칙이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '스위프트에서 오류 타입을 정의할 때 보통 어떤 방식을 쓰나요?',
          'Error 프로토콜을 준수하는 enum', ['일반 클래스 상속', '단순 문자열', 'Int 코드값만'],
          '오류는 보통 Error 프로토콜을 준수하는 enum으로 정의해서, 여러 종류의 오류를 명확히 구분해요.',
          '이 단원에서 배운 enum과 protocol을 함께 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `실패할 수 있는 함수임을 나타낼 때 함수 선언 뒤에 붙이는 키워드를 쓰세요.`,
          prefix: 'func validate(name: String) ', suffix: ' { }', accept: ['throws'], placeholder: '키워드',
          why: '<code>throws</code>는 이 함수가 오류를 던질 수 있음을 나타내요.',
          hint: '"던지다(throw)"의 변형이에요.'
        }),
        () => ({
          type: 'blank',
          q: `실제로 오류를 던질 때 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: ' ValidationError.tooShort', accept: ['throw'], placeholder: '키워드',
          why: '<code>throw</code>는 실제로 오류 값을 던지는 키워드예요.',
          hint: 'throws와 한 글자 차이예요(s가 없어요).'
        }),
        () => makeChoice(
          'throws가 붙은 함수를 호출할 때 반드시 필요한 것은?',
          'try 키워드와 do-catch(또는 try?/try!)', ['아무것도 필요 없다', 'async 키워드', 'static 키워드'],
          'throws 함수 호출에는 항상 try가 필요하고, 보통 do-catch 블록 안에서 호출해요.',
          '이 함수는 실패할 수도 있다는 걸 호출부에서 명시해야 해요.'
        ),
        () => ({
          type: 'code',
          q: '<code>NetworkError</code>라는, <code>Error</code>를 준수하는 enum을 정의하세요. case는 <code>timeout</code> 하나만 있으면 돼요.',
          starter: '',
          rows: 3,
          placeholder: 'enum NetworkError: Error {\n    case timeout\n}',
          accept: ['enum NetworkError: Error {\n    case timeout\n}'],
          why: 'enum 이름: Error { case ... } 형태로 오류 타입을 정의해요.',
          hint: 'enum NetworkError: Error { case timeout }'
        }),
      ],
      boss: () => makeChoice(
        'do { try validate(name: "a") } catch { print("오류: \\(error)") } 구조에서, validate가 오류를 던지면 어떤 일이 일어나나요?',
        'do 블록의 나머지 코드는 건너뛰고 catch 블록이 실행된다', ['프로그램이 즉시 종료된다', 'catch 블록은 무시되고 do 블록이 계속된다', '컴파일 오류가 난다'],
        '오류가 던져지면 do 블록의 나머지 코드는 건너뛰고 catch 블록으로 제어가 넘어가요.',
        'try/catch는 다른 언어의 예외 처리와 비슷한 흐름이에요.'
      )
    },
    {
      id: 'errorHandlingTryVariants',
      title: '오류 처리: try?와 try!',
      ready: true,
      summary: '옵셔널로 오류를 흡수하는 try?와, 강제로 무시하는 try!의 차이를 배워요.',
      goals: ['try?로 오류를 옵셔널로 바꾸기', 'try!의 위험성 이해하기', '상황에 맞는 try 방식 선택하기'],
      blocks: [
        {
          h: 'try?: 오류를 옵셔널로',
          html: `<p><code>try?</code>는 오류가 나면 그 결과를 <code>nil</code>로, 성공하면 값을 옵셔널로 감싸서 돌려줘요. do-catch 없이 간단히 "성공했으면 값을, 아니면 nil을" 다루고 싶을 때 써요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `enum ValidationError: Error { case tooShort }
func validate(name: String) throws -> String {
    if name.count < 2 { throw ValidationError.tooShort }
    return name
}
let result = try? validate(name: "a")
print(result)`,
            out: `nil`
          }
        },
        {
          h: 'try!: 절대 실패하지 않는다고 확신할 때만',
          html: `<p><code>try!</code>는 "무조건 성공한다"고 강제로 단언해요. 만약 실제로 오류가 나면 <b>앱이 크래시</b>나요. 정말 실패할 수 없다고 확신하는 경우가 아니면 피해야 해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `enum ValidationError: Error { case tooShort }
func validate(name: String) throws -> String {
    if name.count < 2 { throw ValidationError.tooShort }
    return name
}
let result = try! validate(name: "지수")
print(result)`,
            out: `지수`
          },
          after: `<div class="note"><b>정리</b> — try(do-catch와 함께), try?(옵셔널로 흡수), try!(강제 단언) 중 무엇을 쓸지는 "오류가 실제로 발생할 가능성이 있는지"와 "발생했을 때 어떻게 대응하고 싶은지"에 따라 골라요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'try?의 동작 방식은?',
          '오류가 나면 nil, 성공하면 옵셔널 값을 반환', ['오류가 나면 크래시', '오류를 무시하고 항상 기본값 0 반환', '오류가 나도 컴파일 시점에 막아줌'],
          'try?는 오류를 옵셔널로 흡수해서, 실패하면 nil, 성공하면 값을 옵셔널로 감싸 반환해요.',
          '결과가 항상 옵셔널이 된다는 게 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `오류가 나면 nil을 반환하도록 하는 try의 변형을 쓰세요. (물음표 포함)`,
          prefix: 'let result = ', suffix: ' validate(name: "a")', accept: ['try?'], placeholder: 'try의 변형',
          why: '<code>try?</code>는 실패 시 nil, 성공 시 옵셔널 값을 반환해요.',
          hint: '옵셔널을 만드는 기호가 붙어요.'
        }),
        () => makeChoice(
          'try!을 사용했는데 실제로 함수가 오류를 던지면 어떻게 되나요?',
          '런타임 크래시가 발생한다', ['자동으로 nil이 된다', '컴파일 오류가 난다', '경고만 뜨고 계속 실행된다'],
          'try!은 "절대 실패하지 않는다"는 강한 단언이라서, 실제로 실패하면 그 자리에서 크래시가 나요.',
          '강제 언래핑(!)과 비슷한 위험성을 가지고 있어요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>enum ValidationError: Error { case tooShort }\nfunc validate(name: String) throws -> String { if name.count < 2 { throw ValidationError.tooShort }; return name }\nlet result = try? validate(name: "지수")\nprint(result)</code>를 실행하면? (Optional(값) 형태로)`,
          prefix: '', suffix: '', accept: ['Optional("지수")'], placeholder: '출력 결과',
          why: '"지수"는 2글자 이상이라 검증에 성공하므로 try?가 값을 Optional로 감싸 반환해요.',
          hint: '"지수"는 검증을 통과해요.'
        }),
        () => ({
          type: 'code',
          q: '<code>validate(name: "지수")</code>를 <code>try?</code>로 호출해 <code>result</code>라는 상수에 담는 한 줄 코드를 작성하세요. (validate 함수는 이미 정의되어 있다고 가정)',
          starter: '',
          rows: 2,
          placeholder: 'let result = try? validate(name: "지수")',
          accept: ['let result = try? validate(name: "지수")'],
          why: 'try?는 do-catch 없이도 간단히 오류를 옵셔널로 다룰 수 있게 해줘요.',
          hint: 'let result = try? validate(name: "지수")'
        }),
      ],
      boss: () => makeChoice(
        '오류가 발생할 가능성이 거의 없다고 100% 확신할 수 없는 일반적인 상황에서, 안전을 위해 피해야 할 것은?',
        'try!(강제 단언, 실패 시 크래시)', ['try?(옵셔널로 흡수)', 'do-catch(정상적인 오류 처리)', 'throws 함수 정의'],
        'try!은 실패 시 크래시로 이어지므로, 정말 실패 불가능하다고 확신할 때만 신중히 써야 해요.',
        '강제 언래핑(!)과 비슷하게 위험한 방식이에요.'
      )
    },
    {
      id: 'guardStatements',
      title: 'guard로 조기 종료하기',
      ready: true,
      summary: 'guard 문으로 조건이 맞지 않을 때 함수를 일찍 빠져나가는 패턴을 익혀요.',
      goals: ['guard 기본 문법 이해하기', 'guard와 if의 코드 스타일 차이 비교하기', 'guard로 중첩을 줄이는 방법 익히기'],
      blocks: [
        {
          h: 'guard: 조건이 거짓이면 즉시 종료',
          html: `<p><code>guard 조건 else { return }</code>은 조건이 <b>거짓</b>일 때 else 블록을 실행하고 함수를 빠져나가요. 조건이 참이면 그냥 다음 코드로 넘어가요. if와 반대 방향의 조건을 쓰는 셈이에요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `func checkAge(_ age: Int) {
    guard age >= 0 else {
        print("나이는 음수일 수 없어요")
        return
    }
    print("나이: \\(age)")
}
checkAge(-5)
checkAge(17)`,
            out: `나이는 음수일 수 없어요
나이: 17`
          }
        },
        {
          h: 'guard로 중첩(nesting) 줄이기',
          html: `<p>여러 조건을 검사해야 할 때, if를 중첩하면 코드가 오른쪽으로 깊어져요. guard를 여러 번 나열하면, 정상 경로가 항상 가장 바깥쪽 들여쓰기에 남아 훨씬 읽기 쉬워요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `func process(age: Int, name: String) {
    guard age >= 0 else {
        print("잘못된 나이")
        return
    }
    guard !name.isEmpty else {
        print("이름이 비어있어요")
        return
    }
    print("\\(name), \\(age)살 처리 완료")
}
process(age: 17, name: "지수")`,
            out: `지수, 17살 처리 완료`
          },
          after: `<div class="note"><b>정리</b> — guard는 함수, 반복문, 옵셔널 바인딩(guard let) 등 "실패하면 즉시 빠져나가고 싶은" 모든 상황에서 쓸 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'guard 조건 else { return }에서, 조건이 참이면 어떻게 되나요?',
          'else 블록을 건너뛰고 다음 코드로 진행한다', ['else 블록이 실행된다', '함수가 즉시 종료된다', '컴파일 오류가 난다'],
          'guard는 조건이 참일 때 else를 건너뛰고 계속 진행해요. 조건이 거짓일 때만 else가 실행돼요.',
          'if와 정반대되는 조건 방향을 가진다고 생각하면 쉬워요.'
        ),
        () => ({
          type: 'blank',
          q: `guard 문에서 조건이 거짓일 때 실행할 블록을 시작하는 키워드를 쓰세요.`,
          prefix: 'guard age >= 0 ', suffix: ' { return }', accept: ['else'], placeholder: '키워드',
          why: '<code>guard 조건 else { }</code>에서 else 블록은 조건이 거짓일 때 실행돼요.',
          hint: 'if-else의 else와 같은 단어예요.'
        }),
        () => {
          const age = randInt(-10, -1);
          return {
            type: 'blank',
            q: `<code>func checkAge(_ age: Int) { guard age >= 0 else { print("음수 나이"); return }; print("나이: \\(age)") }\ncheckAge(${age})</code>를 실행하면?`,
            prefix: '', suffix: '', accept: ['음수 나이'], placeholder: '출력 결과',
            why: `${age}는 0보다 작으므로 guard의 조건이 거짓이 되어 else 블록이 실행돼요.`,
            hint: '음수이므로 조건 age >= 0이 거짓이에요.'
          };
        },
        () => makeChoice(
          'guard else 블록 안에는 보통 무엇이 포함되어야 하나요?',
          'return, throw, break, continue 등 현재 범위를 빠져나가는 코드', ['다음 guard 문', '항상 print만', '아무것도 필요 없다'],
          'guard의 else 블록은 반드시 현재 스코프를 빠져나가는 코드(return 등)로 끝나야 해요. 그래야 컴파일러가 통과시켜줘요.',
          '"조기 종료"라는 목적을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>score</code>(Int)가 0 이상 100 이하가 아니면 <code>"잘못된 점수"</code>를 출력하고 함수를 빠져나가는 guard 문을 작성하세요. (함수 이름은 checkScore(_ score: Int)이고, guard 이후에는 "점수: \\(score)"를 출력)',
          starter: '',
          rows: 6,
          placeholder: 'func checkScore(_ score: Int) {\n    guard score >= 0 && score <= 100 else {\n        print("잘못된 점수")\n        return\n    }\n    print("점수: \\(score)")\n}',
          accept: ['func checkScore(_ score: Int) {\n    guard score >= 0 && score <= 100 else {\n        print("잘못된 점수")\n        return\n    }\n    print("점수: \\(score)")\n}'],
          why: 'guard 조건 else { return } 형태로 조건에 맞지 않으면 조기 종료해요.',
          hint: 'guard score >= 0 && score <= 100 else { print("잘못된 점수"); return }'
        }),
      ],
      boss: () => {
        const age = randInt(0, 30);
        return {
          type: 'blank',
          q: `<code>func checkAge(_ age: Int) { guard age >= 0 else { print("음수 나이"); return }; print("나이: \\(age)") }\ncheckAge(${age})</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [`나이: ${age}`], placeholder: '출력 결과',
          why: `${age}는 0 이상이므로 guard 조건을 통과해서 "나이: ${age}"가 출력돼요.`,
          hint: '0 이상이면 guard를 통과해서 다음 코드로 진행해요.'
        };
      }
    },
    {
      id: 'genericsFunctions',
      title: '제네릭 함수: 여러 타입에서 재사용하기',
      ready: true,
      summary: '제네릭으로 타입에 상관없이 동작하는 함수를 만드는 방법을 배워요.',
      goals: ['제네릭 함수 정의 문법 익히기', '타입 매개변수(<T>)의 의미 이해하기', '제네릭이 코드 중복을 줄이는 원리 알기'],
      blocks: [
        {
          h: '제네릭 함수: 타입을 나중에 정하기',
          html: `<p>같은 로직을 <code>Int</code>용, <code>String</code>용 함수로 각각 만들면 중복이 생겨요. <b>제네릭</b>을 쓰면 <code>&lt;T&gt;</code>라는 타입 매개변수로 "어떤 타입이든 괜찮다"는 함수를 하나만 만들 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `func swapValues<T>(_ a: inout T, _ b: inout T) {
    let temp = a
    a = b
    b = temp
}
var x = 1
var y = 2
swapValues(&x, &y)
print(x, y)`,
            out: `2 1`
          }
        },
        {
          h: '여러 타입에서 그대로 재사용하기',
          html: `<p>같은 제네릭 함수를 <code>Int</code>든 <code>String</code>이든 그대로 쓸 수 있어요. 스위프트가 호출 시점에 실제 타입을 알아서 추론해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `func firstElement<T>(_ items: [T]) -> T? {
    return items.first
}
print(firstElement([10, 20, 30]))
print(firstElement(["a", "b", "c"]))`,
            out: `Optional(10)
Optional("a")`
          },
          after: `<div class="note"><b>정리</b> — <code>T</code>는 관례적으로 쓰는 이름일 뿐, 실제로는 아무 이름이나 쓸 수 있어요. 배열의 <code>Array&lt;Element&gt;</code>도 사실 제네릭으로 만들어진 타입이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '제네릭을 쓰는 이유는?',
          '같은 로직을 여러 타입에서 중복 없이 재사용하기 위해', ['코드를 더 느리게 만들기 위해', 'Int 타입에서만 쓰기 위해', '오류를 항상 발생시키기 위해'],
          '제네릭은 타입에 상관없이 동작하는 코드를 한 번만 작성해 재사용하게 해줘요.',
          '"재사용"이 핵심 키워드예요.'
        ),
        () => ({
          type: 'blank',
          q: `제네릭 함수에서 타입 매개변수를 나타낼 때 관례적으로 쓰는 대문자 하나를 쓰세요.`,
          prefix: 'func identity<', suffix: '>(_ value: T) -> T { return value }', accept: ['T'], placeholder: '문자',
          why: '<code>T</code>는 제네릭 타입 매개변수로 관례적으로 쓰이는 이름이에요.',
          hint: '"Type"의 첫 글자예요.'
        }),
        () => {
          const nums = [randInt(1, 50), randInt(51, 99)];
          return {
            type: 'blank',
            q: `<code>func firstElement<T>(_ items: [T]) -> T? { return items.first }\nprint(firstElement([${nums[0]}, ${nums[1]}]))</code>를 실행하면? (Optional(값) 형태로)`,
            prefix: '', suffix: '', accept: [`Optional(${nums[0]})`], placeholder: '출력 결과',
            why: `first는 배열의 첫 번째 요소를 옵셔널로 반환하므로 Optional(${nums[0]})이 돼요.`,
            hint: '배열의 첫 번째 값을 확인해보세요.'
          };
        },
        () => makeChoice(
          '<code>func firstElement<T>(_ items: [T]) -> T?</code>를 <code>Int</code> 배열과 <code>String</code> 배열 모두에 쓸 수 있는 이유는?',
          'T가 호출 시점의 실제 타입으로 자동 추론되기 때문', ['Int와 String이 원래 같은 타입이기 때문', '스위프트가 타입 검사를 하지 않기 때문', '우연히 둘 다 동작하는 것일 뿐'],
          '제네릭 함수는 호출될 때 실제 타입이 무엇인지 스위프트가 추론해서 그 타입에 맞게 동작해요.',
          '타입 매개변수는 호출 시점에 채워져요.'
        ),
        () => ({
          type: 'code',
          q: '<code>[T]</code> 배열을 받아 요소 개수를 <code>Int</code>로 반환하는 제네릭 함수 <code>countItems<T>(_ items: [T]) -> Int</code>를 작성하세요. (items.count 사용)',
          starter: '',
          rows: 3,
          placeholder: 'func countItems<T>(_ items: [T]) -> Int {\n    return items.count\n}',
          accept: ['func countItems<T>(_ items: [T]) -> Int {\n    return items.count\n}'],
          why: '제네릭 함수는 <T>로 타입 매개변수를 선언하고, 매개변수/반환 타입에서 그 T를 활용해요.',
          hint: 'func countItems<T>(_ items: [T]) -> Int { return items.count }'
        }),
      ],
      boss: () => {
        const a = randInt(1, 50);
        const b = randInt(51, 99);
        return {
          type: 'blank',
          q: `<code>func swapValues<T>(_ a: inout T, _ b: inout T) { let temp = a; a = b; b = temp }\nvar x = ${a}\nvar y = ${b}\nswapValues(&x, &y)\nprint(x, y)</code>를 실행하면? (형식: 숫자 숫자)`,
          prefix: '', suffix: '', accept: [`${b} ${a}`], placeholder: '출력 결과',
          why: `swapValues가 x와 y의 값을 서로 바꾸므로 x는 ${b}, y는 ${a}가 돼요.`,
          hint: 'x와 y의 값이 서로 뒤바뀌어요.'
        };
      }
    },
{
      id: 'genericsTypes',
      title: '제네릭 타입: 재사용 가능한 자료구조 만들기',
      ready: true,
      summary: '제네릭을 struct/class에 적용해 어떤 타입이든 담을 수 있는 자료구조를 만들어요.',
      goals: ['제네릭 struct 정의하기', '여러 타입으로 인스턴스 만들어보기', '제네릭 타입 제약(where, : Protocol) 살짝 맛보기'],
      blocks: [
        {
          h: '제네릭 struct: 어떤 타입이든 담기',
          html: `<p>스택(Stack) 같은 자료구조는 담는 값의 타입과 상관없이 로직이 똑같아요. 제네릭으로 만들면 <code>Stack&lt;Int&gt;</code>, <code>Stack&lt;String&gt;</code>처럼 원하는 타입으로 바로 쓸 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Stack<Element> {
    var items: [Element] = []
    mutating func push(_ item: Element) {
        items.append(item)
    }
    mutating func pop() -> Element? {
        return items.popLast()
    }
}
var stack = Stack<Int>()
stack.push(1)
stack.push(2)
print(stack.pop())`,
            out: `Optional(2)`
          }
        },
        {
          h: '다른 타입으로도 그대로 쓰기',
          html: `<p>같은 <code>Stack</code> 정의를 <code>String</code>에도 그대로 쓸 수 있어요. 타입 매개변수 이름은 <code>Element</code>처럼 의미를 담아 지을 수도 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Stack<Element> {
    var items: [Element] = []
    mutating func push(_ item: Element) {
        items.append(item)
    }
}
var names = Stack<String>()
names.push("지수")
names.push("민준")
print(names.items)`,
            out: `["지수", "민준"]`
          },
          after: `<div class="note"><b>정리</b> — 제네릭 타입 매개변수에 <code>&lt;T: Equatable&gt;</code>처럼 프로토콜 제약을 걸 수도 있어요. "이 타입은 반드시 비교 가능해야 한다" 같은 조건을 표현할 때 써요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '제네릭 struct를 쓰는 이유는?',
          '담는 값의 타입과 상관없이 같은 로직을 재사용하기 위해', ['struct를 class로 바꾸기 위해', 'Int만 담기 위해', '항상 nil을 반환하게 하려고'],
          '제네릭 타입은 Stack<Int>, Stack<String>처럼 어떤 타입이든 같은 구현을 재사용할 수 있게 해요.',
          '제네릭 함수와 같은 이유예요, 이번엔 타입 전체에 적용될 뿐이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>struct Stack<Element> { }</code>를 <code>Int</code> 값을 담는 용도로 인스턴스를 만들 때 쓰는 문법을 쓰세요. (Stack___())`,
          prefix: 'var stack = Stack', suffix: '()', accept: ['<Int>'], placeholder: '타입 지정',
          why: '<code>Stack<Int>()</code>처럼 꺾쇠괄호 안에 실제 타입을 넣어 인스턴스를 만들어요.',
          hint: '꺾쇠괄호 안에 Int를 넣어보세요.'
        }),
        () => {
          const items = [randInt(1, 20), randInt(21, 40), randInt(41, 60)];
          return {
            type: 'blank',
            q: `<code>struct Stack<Element> { var items: [Element] = []; mutating func push(_ item: Element) { items.append(item) }; mutating func pop() -> Element? { return items.popLast() } }\nvar s = Stack<Int>()\ns.push(${items[0]})\ns.push(${items[1]})\ns.push(${items[2]})\nprint(s.pop())</code>를 실행하면? (Optional(값) 형태로)`,
            prefix: '', suffix: '', accept: [`Optional(${items[2]})`], placeholder: '출력 결과',
            why: `pop()은 마지막에 push한 ${items[2]}를 꺼내요.`,
            hint: '스택은 마지막에 넣은 값이 먼저 나와요(LIFO).'
          };
        },
        () => makeChoice(
          '<code>Stack<Element></code>에서 <code>Element</code>는 무엇을 나타내나요?',
          '이 스택이 담을 값의 타입(타입 매개변수)', ['고정된 정수 값', 'struct의 이름', '항상 String 타입'],
          'Element는 이 제네릭 타입이 실제로 담게 될 타입을 나중에 정하기 위한 타입 매개변수예요.',
          'T 대신 의미가 담긴 이름을 쓴 것뿐이에요.'
        ),
        () => ({
          type: 'code',
          q: '값 하나를 담을 수 있는 제네릭 struct <code>Box<Value></code>를 정의하세요. 저장 프로퍼티는 <code>value: Value</code> 하나만 있으면 돼요.',
          starter: '',
          rows: 3,
          placeholder: 'struct Box<Value> {\n    var value: Value\n}',
          accept: ['struct Box<Value> {\n    var value: Value\n}'],
          why: '제네릭 타입 매개변수를 struct 이름 뒤 꺾쇠괄호 안에 선언하고, 프로퍼티 타입으로 활용해요.',
          hint: 'struct Box<Value> { var value: Value }'
        }),
      ],
      boss: () => {
        const items = [randInt(1, 30), randInt(31, 60)];
        return {
          type: 'blank',
          q: `<code>struct Stack<Element> { var items: [Element] = []; mutating func push(_ item: Element) { items.append(item) }; mutating func pop() -> Element? { return items.popLast() } }\nvar s = Stack<Int>()\ns.push(${items[0]})\ns.push(${items[1]})\nlet top = s.pop()\nprint(top)</code>를 실행하면? (Optional(값) 형태로)`,
          prefix: '', suffix: '', accept: [`Optional(${items[1]})`], placeholder: '출력 결과',
          why: `pop()은 마지막에 넣은 ${items[1]}을 꺼내서 옵셔널로 반환해요.`,
          hint: '스택은 마지막에 넣은 값이 먼저 나와요.'
        };
      }
    },
    {
      id: 'inheritance',
      title: '상속: class와 override',
      ready: true,
      summary: '클래스 상속으로 공통 기능을 재사용하고, override로 동작을 재정의하는 방법을 배워요.',
      goals: ['class 상속 문법(:) 익히기', 'super로 부모 기능 호출하기', 'override로 메서드 재정의하기'],
      blocks: [
        {
          h: '상속: 부모 클래스의 기능 물려받기',
          html: `<p>class는 다른 class를 <b>상속</b>해서 그 프로퍼티와 메서드를 그대로 물려받을 수 있어요. struct는 상속을 지원하지 않아요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `class Animal {
    var name: String
    init(name: String) {
        self.name = name
    }
    func makeSound() -> String {
        return "..."
    }
}
class Dog: Animal {
    override func makeSound() -> String {
        return "멍멍"
    }
}
let d = Dog(name: "초코")
print(d.makeSound())`,
            out: `멍멍`
          }
        },
        {
          h: 'super: 부모의 구현 활용하기',
          html: `<p><code>super.메서드()</code>로 부모 클래스의 원래 구현을 호출할 수 있어요. 완전히 새로 만들지 않고, 부모의 동작에 무언가를 덧붙이고 싶을 때 유용해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `class Animal {
    func makeSound() -> String {
        return "..."
    }
}
class Dog: Animal {
    override func makeSound() -> String {
        return super.makeSound() + " 멍멍"
    }
}
print(Dog().makeSound())`,
            out: `... 멍멍`
          },
          after: `<div class="note"><b>정리</b> — 부모의 메서드를 재정의하려면 반드시 <code>override</code>를 붙여야 해요. 실수로 새 메서드를 만든 건지, 재정의한 건지 컴파일러가 명확히 구분해줘요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '상속을 지원하는 타입은?',
          'class', ['struct', 'enum', 'protocol만 상속 가능'],
          '스위프트에서 상속은 class만 지원해요. struct와 enum은 상속할 수 없어요.',
          '참조 타입 쪽을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `부모 클래스의 메서드를 자식 클래스에서 재정의할 때 앞에 붙이는 키워드를 쓰세요.`,
          prefix: '', suffix: ' func makeSound() -> String { return "멍멍" }', accept: ['override'], placeholder: '키워드',
          why: '<code>override</code>는 부모의 메서드를 재정의한다는 것을 명시적으로 표시해요.',
          hint: '"재정의하다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'blank',
          q: `자식 클래스에서 부모 클래스의 원래 구현을 호출할 때 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: '.makeSound()', accept: ['super'], placeholder: '키워드',
          why: '<code>super</code>는 부모 클래스의 원래 구현을 가리켜요.',
          hint: '"상위의"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>class Dog: Animal { }</code>에서 콜론(:)이 나타내는 것은?',
          'Dog가 Animal을 상속한다', 'Dog가 Animal의 인스턴스다', ['Dog와 Animal이 같은 타입이다', 'Animal이 Dog를 상속한다'].filter(x=>x!=='Dog가 Animal의 인스턴스다'),
          '<code>: 부모클래스</code>는 상속 관계를 나타내요. Dog가 자식, Animal이 부모예요.',
          '상속 관계에서 자식이 왼쪽, 부모가 오른쪽에 와요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Animal</code> class(name: String 프로퍼티와 <code>func makeSound() -> String { return "..." }</code> 포함)를 상속하는 <code>Cat</code> class를 정의하고, <code>makeSound</code>를 재정의해 <code>"야옹"</code>을 반환하게 하세요.',
          starter: '',
          rows: 3,
          placeholder: 'class Cat: Animal {\n    override func makeSound() -> String {\n        return "야옹"\n    }\n}',
          accept: ['class Cat: Animal {\n    override func makeSound() -> String {\n        return "야옹"\n    }\n}'],
          why: 'class 이름: 부모이름 { override func ... } 형태로 상속하고 재정의해요.',
          hint: 'class Cat: Animal { override func makeSound() -> String { return "야옹" } }'
        }),
      ],
      boss: () => makeChoice(
        '다음 중 클래스 상속에 대한 설명으로 옳은 것은?',
        '자식 클래스는 override로 부모의 메서드를 재정의할 수 있고, super로 부모의 구현을 호출할 수 있다', ['struct도 다른 struct를 상속할 수 있다', 'override 없이도 자유롭게 메서드를 재정의할 수 있다', '자식 클래스는 부모의 프로퍼티를 쓸 수 없다'],
        '자식 클래스는 override로 재정의하고, super로 부모의 원래 구현도 활용할 수 있어요.',
        '이 단원에서 배운 override와 super를 떠올려보세요.'
      )
    },
    {
      id: 'accessControl',
      title: '접근 제어: public, private, internal',
      ready: true,
      summary: '스위프트의 접근 제어 수준(public/internal/fileprivate/private)으로 캡슐화하는 방법을 배워요.',
      goals: ['private로 외부 접근 막기', 'internal(기본값)의 의미 이해하기', 'public/private 사용 기준 감 잡기'],
      blocks: [
        {
          h: 'private: 같은 타입 안에서만 접근 가능',
          html: `<p><code>private</code>가 붙은 프로퍼티나 메서드는 그 타입(또는 같은 파일의 확장) 안에서만 접근할 수 있어요. 외부에서 마음대로 바꾸면 안 되는 내부 상태를 보호할 때 써요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct BankAccount {
    private var balance: Int = 0
    mutating func deposit(_ amount: Int) {
        balance += amount
    }
    func getBalance() -> Int {
        return balance
    }
}
var account = BankAccount()
account.deposit(1000)
print(account.getBalance())`,
            out: `1000`
          }
        },
        {
          h: '접근 수준 정리',
          html: `<p><code>internal</code>(기본값, 같은 모듈 안에서 접근 가능), <code>fileprivate</code>(같은 파일 안에서 접근 가능), <code>private</code>(같은 타입 안에서만), <code>public</code>(어디서든 접근 가능) 순서로 점점 더 넓게 공개돼요.</p>`,
          code: {
            label: 'access.txt',
            lang: 'swift',
            src: `접근 수준 (좁음 -> 넓음):
private        같은 타입 내부만
fileprivate    같은 파일 내부
internal       같은 모듈(기본값)
public         모듈 밖에서도 접근 가능`,
            out: `(접근 수준 요약)`
          },
          after: `<div class="note"><b>정리</b> — 아무것도 안 적으면 기본값은 <code>internal</code>이에요. "왜 굳이 접근을 제한하나요?"라는 질문에는, 외부에서 잘못된 방식으로 내부 상태를 망가뜨리는 걸 막기 위해서라고 답할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '아무 접근 제어 키워드도 적지 않으면 기본 접근 수준은?',
          'internal', ['private', 'public', 'fileprivate'],
          '스위프트에서 접근 제어 키워드를 생략하면 기본값은 internal(같은 모듈 안에서 접근 가능)이에요.',
          '가장 흔히 쓰이는 기본값이에요.'
        ),
        () => ({
          type: 'blank',
          q: `같은 타입 내부에서만 접근 가능하게 만드는, 가장 엄격한 접근 제어 키워드를 쓰세요.`,
          prefix: '', suffix: ' var balance: Int = 0', accept: ['private'], placeholder: '키워드',
          why: '<code>private</code>는 같은 타입(또는 같은 파일의 확장) 안에서만 접근을 허용해요.',
          hint: '"사적인"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'private 프로퍼티를 쓰는 이유는?',
          '외부에서 내부 상태를 함부로 바꾸지 못하게 보호하기 위해', ['코드를 더 길게 만들기 위해', '컴파일 속도를 높이기 위해', '항상 nil로 만들기 위해'],
          'private는 캡슐화를 통해, 오직 정해진 메서드를 통해서만 내부 상태가 바뀌도록 보호해요.',
          '"보호"라는 단어가 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `모듈 밖 다른 프로젝트에서도 접근 가능하게 만드는, 가장 넓은 접근 제어 키워드를 쓰세요.`,
          prefix: '', suffix: ' struct BankAccount { }', accept: ['public'], placeholder: '키워드',
          why: '<code>public</code>은 모듈 경계를 넘어 외부에서도 접근할 수 있게 해요.',
          hint: '"공개된"이라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>balance</code>(Int, 기본값 0)를 <code>private</code>로 선언하고, 값을 늘리는 <code>mutating func deposit(_ amount: Int)</code>와, 값을 조회하는 <code>func getBalance() -> Int</code>를 가진 <code>BankAccount</code> struct를 정의하세요.',
          starter: '',
          rows: 6,
          placeholder: 'struct BankAccount {\n    private var balance: Int = 0\n    mutating func deposit(_ amount: Int) {\n        balance += amount\n    }\n    func getBalance() -> Int {\n        return balance\n    }\n}',
          accept: ['struct BankAccount {\n    private var balance: Int = 0\n    mutating func deposit(_ amount: Int) {\n        balance += amount\n    }\n    func getBalance() -> Int {\n        return balance\n    }\n}'],
          why: 'private로 내부 상태를 감추고, 공개 메서드를 통해서만 접근하게 해요.',
          hint: 'private var balance = 0 다음 deposit과 getBalance 메서드를 정의해요.'
        }),
      ],
      boss: () => {
        const amount = randInt(100, 5000);
        return {
          type: 'blank',
          q: `<code>struct BankAccount { private var balance: Int = 0; mutating func deposit(_ amount: Int) { balance += amount }; func getBalance() -> Int { return balance } }\nvar acc = BankAccount()\nacc.deposit(${amount})\nprint(acc.getBalance())</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(amount)], placeholder: '숫자',
          why: `deposit(${amount})으로 balance가 ${amount}가 되고, getBalance()가 그 값을 반환해요.`,
          hint: 'private balance는 오직 정해진 메서드를 통해서만 바뀌어요.'
        };
      }
    },
    {
      id: 'arc',
      title: '메모리 관리: ARC와 강한/약한/미소유 참조',
      ready: true,
      summary: '스위프트가 자동으로 메모리를 관리하는 ARC와, 순환 참조를 막는 weak/unowned를 배워요.',
      goals: ['ARC(자동 참조 계산)의 기본 원리 이해하기', '강한 참조 순환(retain cycle) 문제 파악하기', 'weak/unowned로 순환 참조 끊기'],
      blocks: [
        {
          h: 'ARC: 자동으로 메모리를 관리해줘요',
          html: `<p>스위프트는 <b>ARC(Automatic Reference Counting)</b>로 class 인스턴스의 메모리를 자동 관리해요. 어떤 인스턴스를 가리키는 참조(강한 참조)가 하나도 남지 않으면, 그 인스턴스는 자동으로 메모리에서 해제돼요. 개발자가 직접 메모리를 해제할 필요가 없어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `class Person {
    var name: String
    init(name: String) {
        self.name = name
        print("\\(name) 생성됨")
    }
    deinit {
        print("\\(name) 해제됨")
    }
}
var p: Person? = Person(name: "지수")
p = nil`,
            out: `지수 생성됨
지수 해제됨`
          }
        },
        {
          h: '강한 참조 순환과 weak',
          html: `<p>두 인스턴스가 서로를 <b>강하게</b> 참조하면, 둘 다 참조 카운트가 0이 되지 못해 영원히 메모리에서 해제되지 않는 <b>강한 참조 순환(retain cycle)</b>이 생겨요. 한쪽을 <code>weak</code>(약한 참조)로 선언하면 순환을 끊을 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `class Owner {
    var pet: Pet?
}
class Pet {
    weak var owner: Owner?
}
var owner: Owner? = Owner()
var pet: Pet? = Pet()
owner?.pet = pet
pet?.owner = owner`,
            out: `(weak 덕분에 owner와 pet이 서로 순환 참조에 갇히지 않아요)`
          },
          after: `<div class="note"><b>정리</b> — <code>weak</code>는 항상 옵셔널이어야 하고, 가리키던 인스턴스가 해제되면 자동으로 nil이 돼요. <code>unowned</code>는 "가리키는 대상이 절대 먼저 사라지지 않는다"고 확신할 때 쓰는, nil이 될 수 없는 참조예요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'ARC가 하는 일은?',
          'class 인스턴스의 참조 개수를 추적해 자동으로 메모리를 해제한다', ['struct의 값을 복사한다', '오류를 자동으로 처리한다', '배열을 자동 정렬한다'],
          'ARC(Automatic Reference Counting)는 인스턴스를 가리키는 강한 참조 개수를 추적해서, 0이 되면 자동으로 메모리를 해제해요.',
          '이 단원 제목의 약자가 바로 정답이에요.'
        ),
        () => ({
          type: 'blank',
          q: `두 인스턴스가 서로를 강하게 참조해서 영원히 해제되지 않는 문제를 무엇이라 부르나요? (한글로: 강한 참조 ___)`,
          prefix: '강한 참조 ', suffix: '', accept: ['순환'], placeholder: '단어',
          why: '강한 참조 순환(retain cycle)은 두 인스턴스가 서로를 강하게 붙잡아 메모리가 해제되지 않는 문제예요.',
          hint: '"빙글빙글 돈다"는 뜻의 한글 단어예요.'
        }),
        () => makeChoice(
          '강한 참조 순환을 끊기 위해 한쪽 프로퍼티에 붙이는 키워드로 옳은 것은?',
          'weak', ['strong', 'final', 'static'],
          '<code>weak</code>(약한 참조)를 붙이면 참조 카운트를 늘리지 않아서, 순환 문제를 예방할 수 있어요.',
          '"약한"이라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `weak로 선언된 프로퍼티는 어떤 타입이어야 하나요? (옵셔널 또는 옵셔널이 아닌 타입 중 골라 쓰세요)`,
          prefix: '', suffix: '', accept: ['옵셔널'], placeholder: '옵셔널 또는 옵셔널이 아닌 타입',
          why: 'weak 참조는 대상이 해제되면 자동으로 nil이 되어야 하므로, 반드시 옵셔널 타입이어야 해요.',
          hint: 'nil이 될 수 있어야 하니 어떤 타입이어야 할지 생각해보세요.'
        }),
        () => ({
          type: 'code',
          q: '<code>pet</code>이라는 프로퍼티를 <code>Pet?</code> 타입으로 갖는 <code>Owner</code> class를 정의하고, <code>Pet</code> class에는 <code>owner</code>라는 프로퍼티를 <code>weak var owner: Owner?</code>로 정의하세요. (두 class 모두 정의)',
          starter: '',
          rows: 6,
          placeholder: 'class Owner {\n    var pet: Pet?\n}\nclass Pet {\n    weak var owner: Owner?\n}',
          accept: ['class Owner {\n    var pet: Pet?\n}\nclass Pet {\n    weak var owner: Owner?\n}'],
          why: 'weak를 붙인 쪽이 참조 순환을 끊는 역할을 해요.',
          hint: 'class Owner { var pet: Pet? } 다음 class Pet { weak var owner: Owner? }'
        }),
      ],
      boss: () => makeChoice(
        'weak와 unowned의 공통점과 차이점에 대한 설명으로 옳은 것은?',
        '둘 다 참조 순환을 막지만, weak는 옵셔널이고 대상이 사라지면 nil이 되는 반면, unowned는 nil이 될 수 없다', ['weak와 unowned는 완전히 같은 것이다', 'unowned는 항상 옵셔널이어야 한다', 'weak는 참조 순환을 막지 못한다'],
        'weak는 안전하게 nil이 될 수 있는 옵셔널이고, unowned는 대상이 항상 존재한다고 가정하는 non-optional 참조예요.',
        '"항상 존재를 보장할 수 있는가"가 둘의 차이예요.'
      )
    },
    {
      id: 'higherOrderFunctions',
      title: '고차 함수: map, filter, reduce',
      ready: true,
      summary: '배열을 변형·필터링·집계하는 map, filter, reduce, compactMap을 배워요.',
      goals: ['map으로 배열의 각 값을 변형하기', 'filter로 조건에 맞는 값만 남기기', 'reduce로 배열을 값 하나로 집계하기'],
      blocks: [
        {
          h: 'map: 각 값을 변형하기',
          html: `<p><code>map</code>은 배열의 각 요소에 클로저를 적용해서, 변형된 새 배열을 만들어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `let numbers = [1, 2, 3]
let doubled = numbers.map { $0 * 2 }
print(doubled)`,
            out: `[2, 4, 6]`
          }
        },
        {
          h: 'filter와 reduce',
          html: `<p><code>filter</code>는 조건(클로저가 true를 반환하는 것)에 맞는 요소만 남기고, <code>reduce</code>는 배열의 모든 요소를 하나의 값으로 합쳐줘요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `let numbers = [1, 2, 3, 4, 5]
let evens = numbers.filter { $0 % 2 == 0 }
let sum = numbers.reduce(0) { $0 + $1 }
print(evens)
print(sum)`,
            out: `[2, 4]
15`
          },
          after: `<div class="note"><b>정리</b> — <code>compactMap</code>은 map과 비슷하지만, 결과가 옵셔널일 때 nil을 자동으로 제거해줘요(예: 문자열 배열을 Int로 변환할 때 실패한 것들을 걸러낼 수 있어요).</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'map이 하는 일은?',
          '배열의 각 요소를 변형해 새 배열을 만든다', ['조건에 맞는 요소만 남긴다', '배열을 정렬한다', '배열의 요소 개수를 센다'],
          'map은 클로저로 각 요소를 변형해서 새 배열을 만들어요.',
          '"지도를 그리듯 하나씩 변환한다"고 생각하면 쉬워요.'
        ),
        () => ({
          type: 'blank',
          q: `조건에 맞는 요소만 골라 새 배열을 만드는 메서드 이름을 쓰세요.`,
          prefix: 'numbers.', suffix: ' { $0 % 2 == 0 }', accept: ['filter'], placeholder: '메서드 이름',
          why: '<code>filter</code>는 클로저가 true를 반환하는 요소만 남긴 새 배열을 만들어요.',
          hint: '"거르다"라는 뜻의 영어 단어예요.'
        }),
        () => {
          const nums = Array.from({length: 4}, () => randInt(1, 20));
          const doubled = nums.map(n => n * 2);
          return {
            type: 'blank',
            q: `<code>let numbers = [${nums.join(', ')}]\nlet doubled = numbers.map { $0 * 2 }\nprint(doubled)</code>를 실행하면? (예: [2, 4, 6])`,
            prefix: '', suffix: '', accept: [`[${doubled.join(', ')}]`], placeholder: '출력 결과',
            why: `map은 각 값을 2배로 만들어요: [${nums.join(', ')}] -> [${doubled.join(', ')}]`,
            hint: '각 숫자를 2배로 만들어보세요.'
          };
        },
        () => {
          const nums = Array.from({length: 4}, () => randInt(1, 30));
          const sum = nums.reduce((a, b) => a + b, 0);
          return {
            type: 'blank',
            q: `<code>let numbers = [${nums.join(', ')}]\nlet sum = numbers.reduce(0) { $0 + $1 }\nprint(sum)</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
            why: `reduce(0) { $0 + $1 }은 0부터 시작해서 모든 값을 더해요: ${nums.join(' + ')} = ${sum}`,
            hint: '0부터 시작해서 모든 값을 누적으로 더해요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>numbers</code> 배열의 각 값을 제곱한 새 배열을 <code>squared</code>라는 상수에 담는 코드를 <code>map</code>과 축약 인자(<code>$0</code>)를 사용해 작성하세요. (numbers는 이미 선언되어 있다고 가정)',
          starter: '',
          rows: 2,
          placeholder: 'let squared = numbers.map { $0 * $0 }',
          accept: ['let squared = numbers.map { $0 * $0 }'],
          why: 'map { $0 * $0 }은 각 요소를 제곱한 새 배열을 만들어요.',
          hint: 'let squared = numbers.map { $0 * $0 }'
        }),
      ],
      boss: () => {
        const nums = Array.from({length: 5}, () => randInt(1, 20));
        const evens = nums.filter(n => n % 2 === 0);
        return {
          type: 'blank',
          q: `<code>let numbers = [${nums.join(', ')}]\nlet evens = numbers.filter { $0 % 2 == 0 }\nprint(evens)</code>를 실행하면? (예: [2, 4])`,
          prefix: '', suffix: '', accept: [`[${evens.join(', ')}]`], placeholder: '출력 결과',
          why: `filter는 짝수만 남기므로 [${nums.join(', ')}] 중 짝수인 [${evens.join(', ')}]만 남아요.`,
          hint: '2로 나눈 나머지가 0인 값만 남겨요.'
        };
      }
    },
{
      id: 'stringManipulation',
      title: '문자열 다루기 심화',
      ready: true,
      summary: '문자열의 길이, 대소문자 변환, 부분 문자열 확인 등 실전에서 자주 쓰는 문자열 메서드를 배워요.',
      goals: ['count로 문자열 길이 구하기', 'uppercased/lowercased 사용하기', 'contains/hasPrefix로 부분 문자열 확인하기'],
      blocks: [
        {
          h: '길이와 대소문자 변환',
          html: `<p><code>count</code>는 문자열의 글자 수를, <code>uppercased()</code>/<code>lowercased()</code>는 대문자/소문자로 바꾼 새 문자열을 돌려줘요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `let word = "Swift"
print(word.count)
print(word.uppercased())
print(word.lowercased())`,
            out: `5
SWIFT
swift`
          }
        },
        {
          h: '부분 문자열 확인하기',
          html: `<p><code>contains</code>는 특정 문자열을 포함하는지, <code>hasPrefix</code>/<code>hasSuffix</code>는 특정 문자열로 시작/끝나는지를 <code>Bool</code>로 알려줘요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `let greeting = "안녕하세요"
print(greeting.contains("하세"))
print(greeting.hasPrefix("안녕"))
print(greeting.hasSuffix("세요"))`,
            out: `true
true
true`
          },
          after: `<div class="note"><b>정리</b> — 두 문자열을 이어붙일 때는 <code>+</code> 연산자를 쓰거나, 문자열 보간 <code>\\(expr)</code>을 활용해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '문자열의 글자 수를 알려주는 프로퍼티는?',
          'count', ['length', 'size', 'len'],
          '문자열도 배열처럼 <code>.count</code>로 글자 수를 알 수 있어요.',
          '배열의 개수를 셀 때와 같은 프로퍼티 이름이에요.'
        ),
        () => ({
          type: 'blank',
          q: `문자열을 모두 대문자로 바꾸는 메서드 이름을 쓰세요.`,
          prefix: 'word.', suffix: '()', accept: ['uppercased'], placeholder: '메서드 이름',
          why: '<code>uppercased()</code>는 모든 글자를 대문자로 바꾼 새 문자열을 반환해요.',
          hint: '"대문자로"라는 뜻의 영어 단어예요.'
        }),
        () => {
          const word = pick(['apple', 'banana', 'coding', 'swift']);
          return {
            type: 'blank',
            q: `<code>let word = "${word}"\nprint(word.count)</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(word.length)], placeholder: '숫자',
            why: `"${word}"는 ${word.length}글자예요.`,
            hint: '글자 수를 세어보세요.'
          };
        },
        () => makeChoice(
          '문자열이 특정 접두어로 시작하는지 확인하는 메서드는?',
          'hasPrefix', ['hasSuffix', 'contains', 'startsWith'],
          '<code>hasPrefix(문자열)</code>은 그 문자열로 시작하는지 확인해요.',
          '"prefix"는 접두어라는 뜻이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>message</code>가 <code>"안녕"</code>을 포함하는지 <code>contains</code>로 확인해 <code>print</code>로 출력하는 한 줄 코드를 작성하세요. (message는 이미 선언되어 있다고 가정)',
          starter: '',
          rows: 2,
          placeholder: 'print(message.contains("안녕"))',
          accept: ['print(message.contains("안녕"))'],
          why: 'contains(부분문자열)는 포함 여부를 Bool로 반환해요.',
          hint: 'print(message.contains("안녕"))'
        }),
      ],
      boss: () => {
        const word = pick(['Hello', 'World', 'Coding', 'Swift']);
        return {
          type: 'blank',
          q: `<code>let word = "${word}"\nprint(word.lowercased())</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [word.toLowerCase()], placeholder: '출력 결과',
          why: `lowercased()는 모든 글자를 소문자로 바꾸므로 "${word.toLowerCase()}"가 출력돼요.`,
          hint: '모든 글자를 소문자로 바꿔보세요.'
        };
      }
    },
    {
      id: 'tuples',
      title: '튜플(Tuple): 여러 값을 하나로 묶기',
      ready: true,
      summary: '이름을 붙여 여러 값을 임시로 묶는 튜플과, 함수에서 여러 값을 반환하는 패턴을 배워요.',
      goals: ['튜플 리터럴 만들기', '이름 붙은 튜플 요소에 접근하기', '함수에서 튜플로 여러 값 반환하기'],
      blocks: [
        {
          h: '튜플: 여러 값을 임시로 묶기',
          html: `<p><code>(값1, 값2)</code> 형태로 서로 다른 타입의 값 여러 개를 하나로 묶을 수 있어요. 각 요소에 이름을 붙이면 <code>.이름</code>으로 접근할 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `let person = (name: "지수", age: 17)
print(person.name)
print(person.age)`,
            out: `지수
17`
          }
        },
        {
          h: '함수에서 여러 값 반환하기',
          html: `<p>struct까지 만들 필요 없이, 함수가 여러 값을 한 번에 돌려줘야 할 때 튜플을 반환 타입으로 쓰면 간편해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `func minMax(_ numbers: [Int]) -> (min: Int, max: Int) {
    return (numbers.min()!, numbers.max()!)
}
let result = minMax([3, 1, 4, 1, 5])
print(result.min)
print(result.max)`,
            out: `1
5`
          },
          after: `<div class="note"><b>정리</b> — 튜플은 간단하고 임시적인 묶음에 적합해요. 여러 곳에서 재사용되는 의미 있는 데이터라면 struct로 만드는 게 더 좋아요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '튜플의 특징은?',
          '서로 다른 타입의 값 여러 개를 괄호로 묶어 임시로 다룰 수 있다', ['항상 같은 타입만 담을 수 있다', 'class에서만 쓸 수 있다', '값을 하나만 담을 수 있다'],
          '튜플은 (Int, String)처럼 서로 다른 타입의 값들을 하나로 묶을 수 있어요.',
          '괄호 안에 콤마로 여러 값을 나열해요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>let person = (name: "지수", age: 17)</code>에서 age 값에 접근하는 표현을 쓰세요.`,
          prefix: '', suffix: '', accept: ['person.age'], placeholder: '표현',
          why: '이름이 붙은 튜플 요소는 <code>.이름</code>으로 접근해요.',
          hint: '변수 이름 뒤에 점(.)을 찍고 필드 이름을 붙여요.'
        }),
        () => {
          const nums = [randInt(1, 20), randInt(21, 40), randInt(41, 60)];
          const minV = Math.min(...nums);
          return {
            type: 'blank',
            q: `<code>func minMax(_ numbers: [Int]) -> (min: Int, max: Int) { return (numbers.min()!, numbers.max()!) }\nlet result = minMax([${nums.join(', ')}])\nprint(result.min)</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(minV)], placeholder: '숫자',
            why: `배열 [${nums.join(', ')}] 중 최솟값은 ${minV}예요.`,
            hint: '가장 작은 값을 찾아보세요.'
          };
        },
        () => makeChoice(
          '여러 곳에서 재사용되는 의미 있는 데이터 모델을 만들 때 튜플과 struct 중 무엇이 더 나은 선택인가요?',
          'struct', ['튜플', '항상 동일하다', 'enum'],
          '임시적인 묶음에는 튜플이 간편하지만, 재사용되는 의미 있는 모델은 struct로 만드는 게 더 명확하고 관리하기 좋아요.',
          '이름을 붙여 명확한 타입으로 만들 수 있는 쪽이 더 좋아요.'
        ),
        () => ({
          type: 'code',
          q: '<code>[Int]</code>를 받아 <code>(min: Int, max: Int)</code> 튜플을 반환하는 함수 <code>minMax</code>를 작성하세요. (numbers.min()!, numbers.max()! 사용)',
          starter: '',
          rows: 3,
          placeholder: 'func minMax(_ numbers: [Int]) -> (min: Int, max: Int) {\n    return (numbers.min()!, numbers.max()!)\n}',
          accept: ['func minMax(_ numbers: [Int]) -> (min: Int, max: Int) {\n    return (numbers.min()!, numbers.max()!)\n}'],
          why: '튜플을 반환 타입으로 써서 두 값을 한 번에 돌려줘요.',
          hint: 'func minMax(_ numbers: [Int]) -> (min: Int, max: Int) { return (numbers.min()!, numbers.max()!) }'
        }),
      ],
      boss: () => {
        const nums = [randInt(1, 30), randInt(31, 60), randInt(61, 90)];
        const maxV = Math.max(...nums);
        return {
          type: 'blank',
          q: `<code>func minMax(_ numbers: [Int]) -> (min: Int, max: Int) { return (numbers.min()!, numbers.max()!) }\nlet result = minMax([${nums.join(', ')}])\nprint(result.max)</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(maxV)], placeholder: '숫자',
          why: `배열 중 최댓값은 ${maxV}예요.`,
          hint: '가장 큰 값을 찾아보세요.'
        };
      }
    },
    {
      id: 'patternMatchingDeepDive',
      title: '패턴 매칭 심화: where절과 값 바인딩',
      ready: true,
      summary: 'switch case에서 where절로 추가 조건을 걸고, 값을 바인딩해 활용하는 방법을 심화로 배워요.',
      goals: ['case에서 where절로 조건 추가하기', '연관값을 바인딩하며 동시에 조건 걸기', '여러 case를 하나로 묶어 처리하기'],
      blocks: [
        {
          h: 'where절: case에 조건 추가하기',
          html: `<p>switch의 case 뒤에 <code>where 조건</code>을 붙이면, 값이 맞더라도 그 조건까지 참이어야 그 case가 실행돼요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `let score = 85
switch score {
case let s where s >= 90:
    print("A")
case let s where s >= 80:
    print("B")
default:
    print("C 이하")
}`,
            out: `B`
          }
        },
        {
          h: '연관값 바인딩과 where 함께 쓰기',
          html: `<p>enum의 연관값을 꺼내면서 동시에 <code>where</code>로 조건을 걸 수도 있어요. 아주 세밀한 분기를 한 줄로 표현할 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `enum Shape {
    case rectangle(width: Double, height: Double)
}
let shape = Shape.rectangle(width: 4, height: 4)
switch shape {
case .rectangle(let w, let h) where w == h:
    print("정사각형")
case .rectangle(let w, let h):
    print("직사각형 \\(w)x\\(h)")
}`,
            out: `정사각형`
          },
          after: `<div class="note"><b>정리</b> — <code>case 1, 2, 3:</code>처럼 콤마로 여러 값을 한 case에 나열할 수도 있어요. where절과 값 바인딩을 조합하면, if/else 여러 개보다 훨씬 명확하게 조건을 표현할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'switch case에서 where절이 하는 역할은?',
          '값이 맞아도 추가 조건까지 참이어야 그 case가 실행되게 한다', ['case를 무시하고 항상 실행한다', 'default를 대체한다', '반복문을 만든다'],
          'where절은 case 매칭에 추가 조건을 걸어서, 더 세밀하게 분기할 수 있게 해줘요.',
          '"어디서"라는 뜻이지만, 여기선 "조건"의 역할을 해요.'
        ),
        () => ({
          type: 'blank',
          q: `case에 추가 조건을 붙일 때 쓰는 키워드를 쓰세요.`,
          prefix: 'case let s ', suffix: ' s >= 90:', accept: ['where'], placeholder: '키워드',
          why: '<code>where</code>는 case 매칭에 조건을 추가해요.',
          hint: '패턴 매칭에서 조건을 붙이는 키워드예요.'
        }),
        () => {
          const score = randInt(60, 100);
          const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : 'C 이하';
          return {
            type: 'blank',
            q: `<code>let score = ${score}\nswitch score {\ncase let s where s >= 90: print("A")\ncase let s where s >= 80: print("B")\ndefault: print("C 이하")\n}</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [grade], placeholder: '등급',
            why: `score(${score})에 맞는 첫 번째 조건의 case가 실행돼요.`,
            hint: '위에서부터 순서대로 where 조건을 검사해요.'
          };
        },
        () => makeChoice(
          '<code>case .rectangle(let w, let h) where w == h:</code>가 표현하는 것은?',
          'rectangle이고, 너비와 높이가 같은 경우(즉 정사각형)', ['rectangle이 아닌 모든 경우', '너비와 높이가 다른 경우', '항상 참'],
          '연관값을 바인딩(let w, let h)하면서 동시에 w == h라는 조건까지 검사해요.',
          '정사각형은 너비와 높이가 같은 직사각형의 특수한 경우예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>n</code>(Int)이 짝수이면서 10보다 큰 경우에만 <code>"큰 짝수"</code>를 출력하고, 그 외에는 <code>"기타"</code>를 출력하는 switch 문을 where절을 사용해 작성하세요. (case let x where x % 2 == 0 && x > 10 형태 사용, n은 이미 선언되어 있다고 가정)',
          starter: '',
          rows: 5,
          placeholder: 'switch n {\ncase let x where x % 2 == 0 && x > 10:\n    print("큰 짝수")\ndefault:\n    print("기타")\n}',
          accept: ['switch n {\ncase let x where x % 2 == 0 && x > 10:\n    print("큰 짝수")\ndefault:\n    print("기타")\n}'],
          why: 'where절 안에 && 로 여러 조건을 함께 검사할 수 있어요.',
          hint: 'case let x where x % 2 == 0 && x > 10:'
        }),
      ],
      boss: () => {
        const w = randInt(2, 8);
        const sameShape = pick([true, false]);
        const h = sameShape ? w : w + randInt(1, 5);
        return {
          type: 'blank',
          q: `<code>enum Shape { case rectangle(width: Double, height: Double) }\nlet shape = Shape.rectangle(width: ${w}, height: ${h})\nswitch shape {\ncase .rectangle(let w, let h) where w == h: print("정사각형")\ncase .rectangle(let w, let h): print("직사각형 \\(w)x\\(h)")\n}</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [sameShape ? '정사각형' : `직사각형 ${w}.0x${h}.0`], placeholder: '출력 결과',
          why: sameShape ? '너비와 높이가 같아서 정사각형 case가 실행돼요.' : `너비(${w})와 높이(${h})가 달라서 직사각형 case가 실행돼요.`,
          hint: '너비와 높이가 같은지 비교해보세요.'
        };
      }
    },
    {
      id: 'codable',
      title: 'Codable: JSON 인코딩과 디코딩',
      ready: true,
      summary: 'Codable 프로토콜로 스위프트 타입과 JSON을 서로 변환하는, 실무에서 매우 자주 쓰는 기능을 배워요.',
      goals: ['struct에 Codable 채택하기', 'JSONEncoder로 인코딩하기', 'JSONDecoder로 디코딩하기'],
      blocks: [
        {
          h: 'Codable: 자동으로 JSON 변환 준비 완료',
          html: `<p>struct가 <code>Codable</code>(사실 <code>Encodable</code> + <code>Decodable</code>)을 채택하면, 프로퍼티 이름이 JSON 키와 일치하는 한 <b>변환 코드를 직접 안 써도</b> 자동으로 인코딩/디코딩이 가능해져요. 서버 통신에서 아주 흔하게 쓰여요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Student: Codable {
    var name: String
    var score: Int
}
let student = Student(name: "지수", score: 90)
let encoder = JSONEncoder()
if let data = try? encoder.encode(student) {
    print(data.count > 0)
}`,
            out: `true`
          }
        },
        {
          h: 'JSONDecoder: JSON을 다시 struct로',
          html: `<p><code>JSONDecoder</code>는 JSON 데이터를 다시 원하는 타입의 인스턴스로 만들어줘요. 이 과정도 실패할 수 있어서 <code>try</code>가 필요해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Student: Codable {
    var name: String
    var score: Int
}
let json = "{\\"name\\":\\"민준\\",\\"score\\":85}"
let data = json.data(using: .utf8)!
let decoder = JSONDecoder()
if let student = try? decoder.decode(Student.self, from: data) {
    print(student.name)
    print(student.score)
}`,
            out: `민준
85`
          },
          after: `<div class="note"><b>정리</b> — Codable은 서버 API 응답을 다루는 iOS 앱에서 거의 항상 등장하는 패턴이에요. 프로퍼티 이름과 JSON 키가 다르면 <code>CodingKeys</code>라는 enum으로 매핑을 커스터마이즈할 수도 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'Codable을 채택하면 좋은 점은?',
          'JSON과 스위프트 타입 사이의 변환 코드를 직접 작성하지 않아도 된다', ['struct를 class로 바꿔준다', '모든 프로퍼티를 private으로 만든다', '자동으로 네트워크 요청을 보낸다'],
          'Codable을 채택하면 컴파일러가 인코딩/디코딩 코드를 자동으로 만들어줘서, 직접 변환 로직을 짜지 않아도 돼요.',
          '"코드를 자동 생성해준다"는 게 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `struct를 JSON으로 변환(인코딩)할 때 쓰는 타입 이름을 쓰세요.`,
          prefix: 'let encoder = ', suffix: '()', accept: ['JSONEncoder'], placeholder: '타입 이름',
          why: '<code>JSONEncoder</code>의 <code>encode</code> 메서드로 Codable 타입을 JSON 데이터로 변환해요.',
          hint: '"인코딩"을 해주는 타입이에요.'
        }),
        () => makeChoice(
          'JSON 데이터를 다시 스위프트 타입으로 변환할 때 쓰는 타입은?',
          'JSONDecoder', ['JSONEncoder', 'JSONParser', 'Codable()'],
          '<code>JSONDecoder</code>의 <code>decode</code> 메서드로 JSON 데이터를 원하는 타입으로 변환해요.',
          '인코딩의 반대 방향이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>struct Student: Codable { var name: String; var score: Int }</code>를 정의하려면, name과 score 프로퍼티 외에 struct 선언 뒤에 콜론과 함께 무엇을 채택해야 하나요?`,
          prefix: 'struct Student: ', suffix: ' { }', accept: ['Codable'], placeholder: '프로토콜 이름',
          why: '<code>Codable</code>을 채택해야 JSONEncoder/JSONDecoder와 함께 쓸 수 있어요.',
          hint: '이 단원의 제목이기도 해요.'
        }),
        () => ({
          type: 'code',
          q: '<code>title</code>(String), <code>price</code>(Int) 프로퍼티를 가지고 <code>Codable</code>을 채택하는 <code>Product</code> struct를 정의하세요.',
          starter: '',
          rows: 4,
          placeholder: 'struct Product: Codable {\n    var title: String\n    var price: Int\n}',
          accept: ['struct Product: Codable {\n    var title: String\n    var price: Int\n}'],
          why: 'struct 이름: Codable { } 형태로 채택만 하면 인코딩/디코딩이 자동으로 지원돼요.',
          hint: 'struct Product: Codable { var title: String; var price: Int }'
        }),
      ],
      boss: () => makeChoice(
        'Codable에 대한 설명으로 옳은 것은?',
        'Encodable과 Decodable을 합친 프로토콜로, 채택하면 JSON 변환 코드를 자동으로 얻는다', ['Codable은 배열 전용 프로토콜이다', 'Codable을 채택하면 struct가 class로 바뀐다', 'Codable은 네트워크 요청을 자동으로 보낸다'],
        'Codable은 Encodable + Decodable을 합친 프로토콜로, 채택만 하면 JSONEncoder/JSONDecoder와 함께 쓸 수 있어요.',
        '이름 자체가 "Encodable + Decodable"의 합성어예요.'
      )
    },
    {
      id: 'asyncAwait',
      title: '비동기 프로그래밍: async와 await',
      ready: true,
      summary: '최신 스위프트의 async/await 문법으로 비동기 코드를 순서대로 읽히게 작성하는 방법을 배워요.',
      goals: ['async 함수 정의하기', 'await로 결과를 기다리기', 'async 함수는 async 컨텍스트에서만 호출됨을 이해하기'],
      blocks: [
        {
          h: 'async: 시간이 걸리는 작업을 표현',
          html: `<p><code>async</code>가 붙은 함수는 "시간이 걸릴 수 있는 작업"이에요. 네트워크 요청, 파일 읽기처럼 오래 걸리는 작업을 표현할 때 써요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `func fetchScore() async -> Int {
    return 90
}
func printScore() async {
    let score = await fetchScore()
    print(score)
}`,
            out: `(async 함수 정의 - 실행하려면 await가 필요해요)`
          }
        },
        {
          h: 'await: 결과가 나올 때까지 기다리기',
          html: `<p><code>await</code>는 async 함수의 결과가 준비될 때까지 기다렸다가 값을 받아요. 콜백 지옥 없이, 마치 동기 코드처럼 위에서 아래로 순서대로 읽혀요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `func fetchName() async -> String {
    return "지수"
}
func fetchScore() async -> Int {
    return 90
}
func printProfile() async {
    let name = await fetchName()
    let score = await fetchScore()
    print("\\(name): \\(score)")
}`,
            out: `(async 함수 안에서 await로 순서대로 값을 받아요)`
          },
          after: `<div class="note"><b>정리</b> — async 함수는 반드시 다른 async 컨텍스트(async 함수, Task 등) 안에서만 await로 호출할 수 있어요. 일반 동기 함수에서 그냥 호출할 수는 없어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'async 키워드가 함수에 붙으면 어떤 의미인가요?',
          '시간이 걸릴 수 있는 비동기 작업이라는 뜻', ['이 함수는 절대 실패하지 않는다는 뜻', '이 함수는 static이라는 뜻', '이 함수는 private이라는 뜻'],
          'async는 그 함수가 시간이 걸리는 비동기 작업을 수행할 수 있음을 나타내요.',
          '"비동기"라는 단어를 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `async 함수의 결과를 기다릴 때 함수 호출 앞에 붙이는 키워드를 쓰세요.`,
          prefix: 'let score = ', suffix: ' fetchScore()', accept: ['await'], placeholder: '키워드',
          why: '<code>await</code>는 async 함수의 결과가 준비될 때까지 기다려요.',
          hint: '"기다리다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'async 함수는 어디에서 호출(await)할 수 있나요?',
          '다른 async 컨텍스트(async 함수나 Task) 안에서만', ['어디서든 자유롭게', '동기 함수에서만', 'class 안에서만'],
          'async 함수는 반드시 async 컨텍스트 안에서만 await로 호출할 수 있어요.',
          '일반 동기 함수 안에서는 바로 호출할 수 없어요.'
        ),
        () => makeChoice(
          'async/await 문법의 장점은?',
          '비동기 코드를 콜백 없이 순서대로 읽히게 작성할 수 있다', ['모든 코드를 항상 더 빠르게 만든다', '오류 처리가 필요 없어진다', '변수 선언이 필요 없어진다'],
          'async/await는 비동기 작업을 마치 동기 코드처럼 위에서 아래로 순서대로 읽히게 해줘요.',
          '콜백 함수를 겹겹이 쌓지 않아도 된다는 게 핵심이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Int</code>를 반환하는 async 함수 <code>fetchAge()</code>를 정의하세요. 항상 <code>17</code>을 반환하면 돼요.',
          starter: '',
          rows: 3,
          placeholder: 'func fetchAge() async -> Int {\n    return 17\n}',
          accept: ['func fetchAge() async -> Int {\n    return 17\n}'],
          why: 'func 이름() async -> 반환타입 { } 형태로 async 함수를 정의해요.',
          hint: 'func fetchAge() async -> Int { return 17 }'
        }),
      ],
      boss: () => makeChoice(
        '다음 중 async/await에 대한 설명으로 옳은 것은?',
        'await는 async 함수의 결과가 준비될 때까지 기다리고, async 함수는 async 컨텍스트에서만 호출 가능하다', ['await 없이도 async 함수의 결과를 즉시 받을 수 있다', 'async 함수는 항상 즉시 실행이 끝난다', 'async와 await는 오류 처리와 관련이 없는 완전히 별개의 기능이라 함께 쓸 수 없다'],
        'await로 async 함수의 결과를 기다리고, async 함수는 반드시 async 컨텍스트 안에서만 호출할 수 있어요.',
        '이 단원에서 배운 핵심 규칙을 떠올려보세요.'
      )
    },
    {
      id: 'actors',
      title: '액터(actor): 안전한 동시성',
      ready: true,
      summary: '여러 작업이 동시에 접근해도 데이터가 안전하게 보호되는 actor의 개념을 배워요.',
      goals: ['actor가 해결하는 문제(데이터 경쟁) 이해하기', 'actor 정의 문법 살펴보기', 'actor의 프로퍼티 접근에 await가 필요한 이유 이해하기'],
      blocks: [
        {
          h: 'actor: 동시 접근으로부터 데이터를 보호',
          html: `<p>여러 작업이 동시에 같은 class 인스턴스의 프로퍼티를 바꾸면 <b>데이터 경쟁(data race)</b>이 생겨 예측 불가능한 버그가 발생할 수 있어요. <code>actor</code>는 한 번에 하나의 작업만 내부 상태에 접근하도록 스위프트가 자동으로 보장해주는 타입이에요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `actor Counter {
    var count = 0
    func increment() {
        count += 1
    }
}`,
            out: `(actor 정의 - 여러 작업이 동시에 안전하게 접근할 수 있어요)`
          }
        },
        {
          h: 'actor의 프로퍼티에 접근할 때는 await',
          html: `<p>actor 밖에서 그 프로퍼티나 메서드에 접근할 때는 <code>await</code>가 필요해요. 스위프트가 "지금 다른 작업이 이 actor를 쓰고 있을 수도 있으니 안전하게 순서를 기다리라"고 강제하는 거예요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `actor Counter {
    var count = 0
    func increment() {
        count += 1
    }
}
func useCounter() async {
    let counter = Counter()
    await counter.increment()
    print(await counter.count)
}`,
            out: `(actor 외부에서는 항상 await로 접근해요)`
          },
          after: `<div class="note"><b>정리</b> — class처럼 참조 타입이지만, actor는 "동시에 여러 작업이 안전하게 접근 가능하다"는 보장이 추가된 타입이에요. 여러 화면/작업이 공유하는 상태를 다룰 때 class 대신 actor를 고려해볼 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'actor가 해결하는 문제는?',
          '여러 작업이 동시에 접근할 때 생기는 데이터 경쟁', ['컴파일 속도 문제', '문자열 인코딩 문제', '배열 정렬 문제'],
          'actor는 여러 작업이 동시에 내부 상태에 접근해도 안전하도록, 한 번에 하나씩만 접근하게 보장해요.',
          '"동시성 안전"이라는 스위프트의 최신 기능이에요.'
        ),
        () => ({
          type: 'blank',
          q: `동시 접근으로부터 안전한 참조 타입을 정의할 때 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: ' Counter { var count = 0 }', accept: ['actor'], placeholder: '키워드',
          why: '<code>actor</code>는 동시 접근에도 안전한 상태를 보장하는 참조 타입이에요.',
          hint: '이 단원의 제목이기도 해요.'
        }),
        () => makeChoice(
          'actor 외부에서 그 프로퍼티에 접근할 때 필요한 것은?',
          'await', ['static', 'mutating', 'override'],
          'actor 밖에서 접근할 때는 순서를 안전하게 기다리기 위해 await가 필요해요.',
          '비동기 함수와 같은 키워드를 써요.'
        ),
        () => makeChoice(
          'actor와 class의 공통점과 차이점 중 옳은 것은?',
          '둘 다 참조 타입이지만, actor는 동시 접근 안전성이 추가로 보장된다', ['actor는 값 타입이다', 'class가 항상 actor보다 안전하다', '둘은 완전히 관련이 없다'],
          'actor도 class처럼 참조 타입이지만, 동시에 여러 작업이 접근해도 안전하다는 보장이 추가돼요.',
          '참조 타입이라는 공통점을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>count</code>(Int, 기본값 0) 프로퍼티와 count를 1 늘리는 <code>func increment()</code> 메서드를 가진 <code>Counter</code>를 actor로 정의하세요.',
          starter: '',
          rows: 5,
          placeholder: 'actor Counter {\n    var count = 0\n    func increment() {\n        count += 1\n    }\n}',
          accept: ['actor Counter {\n    var count = 0\n    func increment() {\n        count += 1\n    }\n}'],
          why: 'actor 이름 { } 안에 프로퍼티와 메서드를 정의하면, 동시 접근에도 안전한 타입이 돼요.',
          hint: 'actor Counter { var count = 0; func increment() { count += 1 } }'
        }),
      ],
      boss: () => makeChoice(
        'actor에 대한 설명으로 가장 알맞은 것은?',
        '여러 작업이 동시에 접근해도 한 번에 하나씩만 처리되도록 스위프트가 보장하는 참조 타입이다', ['actor는 값 타입이라 복사되어 안전하다', 'actor는 오류를 절대 던지지 않는 함수 전용 타입이다', 'actor 안의 프로퍼티는 외부에서 await 없이 바로 접근 가능하다'],
        'actor는 참조 타입이면서, 동시 접근으로부터 내부 상태를 안전하게 보호해줘요.',
        '데이터 경쟁을 막아주는 것이 actor의 핵심 목적이에요.'
      )
    },
{
      id: 'resultType',
      title: 'Result 타입: 함수형 스타일의 오류 처리',
      ready: true,
      summary: 'success/failure 두 경우를 값으로 표현하는 Result 타입을 배워요.',
      goals: ['Result<Success, Failure> 타입 이해하기', 'switch로 Result 처리하기', 'Result와 throws의 차이 감 잡기'],
      blocks: [
        {
          h: 'Result: 성공/실패를 값으로',
          html: `<p><code>Result<Success, Failure></code>는 <code>.success(값)</code> 또는 <code>.failure(오류)</code> 둘 중 하나를 담는 enum이에요(사실 연관값이 있는 enum으로 만들어져 있어요). 성공/실패를 함수의 <b>반환값</b>으로 명시적으로 다룰 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `enum ValidationError: Error { case tooShort }
func validate(name: String) -> Result<String, ValidationError> {
    if name.count < 2 {
        return .failure(.tooShort)
    }
    return .success(name)
}
let result = validate(name: "a")
print(result)`,
            out: `failure(main.ValidationError.tooShort)`
          }
        },
        {
          h: 'switch로 Result 처리하기',
          html: `<p>Result 값도 switch로 두 경우를 각각 처리할 수 있어요. <code>.success(let value)</code>, <code>.failure(let error)</code>처럼 연관값을 바인딩해서 써요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `enum ValidationError: Error { case tooShort }
func validate(name: String) -> Result<String, ValidationError> {
    if name.count < 2 { return .failure(.tooShort) }
    return .success(name)
}
switch validate(name: "지수") {
case .success(let value):
    print("성공: \\(value)")
case .failure(let error):
    print("실패: \\(error)")
}`,
            out: `성공: 지수`
          },
          after: `<div class="note"><b>정리</b> — throws/do-catch는 "예외처럼 던지고 즉시 처리"하는 흐름이고, Result는 "성공/실패를 값으로 저장해두고 나중에 원하는 시점에 처리"하는 흐름이에요. 비동기 콜백의 결과를 표현할 때 특히 자주 쓰여요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'Result<Success, Failure>가 표현하는 것은?',
          '성공(success) 또는 실패(failure) 둘 중 하나의 값', ['항상 성공만 표현', '배열의 첫 번째 요소', '옵셔널과 완전히 동일한 것'],
          'Result는 두 가지 case(success/failure) 중 하나를 담는 타입으로, 성공/실패를 값으로 표현해요.',
          '연관값이 있는 enum이라는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `Result가 성공했을 때의 case 이름을 쓰세요.`,
          prefix: 'return .', suffix: '(name)', accept: ['success'], placeholder: 'case 이름',
          why: '<code>.success(값)</code>은 성공한 결과를 담아요.',
          hint: '"성공"이라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'blank',
          q: `Result가 실패했을 때의 case 이름을 쓰세요.`,
          prefix: 'return .', suffix: '(.tooShort)', accept: ['failure'], placeholder: 'case 이름',
          why: '<code>.failure(오류)</code>는 실패한 결과와 그 오류를 담아요.',
          hint: '"실패"라는 뜻의 영어 단어예요.'
        }),
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>enum ValidationError: Error { case tooShort }\nfunc validate(name: String) -> Result<String, ValidationError> { if name.count < 2 { return .failure(.tooShort) }; return .success(name) }\nswitch validate(name: "${name}") {\ncase .success(let value): print("성공: \\(value)")\ncase .failure(let error): print("실패: \\(error)")\n}</code>를 실행하면? (형식: 성공: 값)`,
            prefix: '', suffix: '', accept: [`성공: ${name}`], placeholder: '출력 결과',
            why: `"${name}"은 2글자 이상이라 검증에 성공하므로 .success case가 실행돼요.`,
            hint: '이름이 2글자 이상인지 확인해보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>Int</code>가 양수면 <code>.success(n)</code>, 음수면 <code>.failure(.negative)</code>를 반환하는 함수 <code>checkPositive(_ n: Int) -> Result<Int, MyError></code>를 작성하세요. (MyError는 이미 정의되어 있고 negative case를 가진다고 가정)',
          starter: '',
          rows: 5,
          placeholder: 'func checkPositive(_ n: Int) -> Result<Int, MyError> {\n    if n < 0 {\n        return .failure(.negative)\n    }\n    return .success(n)\n}',
          accept: ['func checkPositive(_ n: Int) -> Result<Int, MyError> {\n    if n < 0 {\n        return .failure(.negative)\n    }\n    return .success(n)\n}'],
          why: '조건에 따라 .success 또는 .failure를 반환해요.',
          hint: 'if n < 0 { return .failure(.negative) } 다음 return .success(n)'
        }),
      ],
      boss: () => {
        const name = pick(['a', '지수', 'b', '민준']);
        const ok = name.length >= 2;
        return {
          type: 'blank',
          q: `<code>enum ValidationError: Error { case tooShort }\nfunc validate(name: String) -> Result<String, ValidationError> { if name.count < 2 { return .failure(.tooShort) }; return .success(name) }\nswitch validate(name: "${name}") {\ncase .success(let value): print("성공: \\(value)")\ncase .failure(let error): print("실패")\n}</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [ok ? `성공: ${name}` : '실패'], placeholder: '출력 결과',
          why: ok ? `"${name}"은 2글자 이상이라 성공해요.` : `"${name}"은 2글자 미만이라 실패해요.`,
          hint: '이름의 글자 수가 2 이상인지 확인해보세요.'
        };
      }
    },
    {
      id: 'typeCasting',
      title: '타입 캐스팅: as, as?, as!',
      ready: true,
      summary: '타입을 변환하거나 확인하는 as, as?, as! 연산자의 차이를 배워요.',
      goals: ['as로 안전한 업캐스팅하기', 'as?로 안전하게 다운캐스팅하기', 'as!의 위험성 이해하기'],
      blocks: [
        {
          h: 'as?: 안전한 다운캐스팅',
          html: `<p>부모 타입으로 다뤄지는 값을 자식 타입으로 확인하고 싶을 때 <code>as?</code>를 써요. 실패하면 <code>nil</code>을 반환해서 안전해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `class Animal {}
class Dog: Animal {
    func bark() -> String { return "멍멍" }
}
let animal: Animal = Dog()
if let dog = animal as? Dog {
    print(dog.bark())
}`,
            out: `멍멍`
          }
        },
        {
          h: 'as!: 확신할 때만 강제 변환',
          html: `<p><code>as!</code>는 "무조건 그 타입이 맞다"고 강제로 단언해요. 틀리면 크래시가 나요. <code>as</code>(느낌표/물음표 없음)는 상위 타입으로의 업캐스팅처럼 항상 성공이 보장되는 경우에 써요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `class Animal {}
class Dog: Animal {
    func bark() -> String { return "멍멍" }
}
let animal: Animal = Dog()
let dog = animal as! Dog
print(dog.bark())`,
            out: `멍멍`
          },
          after: `<div class="note"><b>정리</b> — as는 항상 성공하는 변환(업캐스팅), as?는 실패할 수도 있어 옵셔널을 반환, as!는 강제로 단언(실패 시 크래시)이에요. 강제 언래핑(!)과 마찬가지로 as!도 확신이 없다면 피해야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'as?의 특징은?',
          '다운캐스팅이 실패하면 nil을 반환해 안전하다', ['항상 성공한다고 가정한다', '항상 크래시를 일으킨다', '컴파일 시점에만 쓰인다'],
          'as?는 실패할 수도 있는 캐스팅을 안전하게 옵셔널로 다뤄요.',
          '물음표(?)는 옵셔널을 뜻해요.'
        ),
        () => ({
          type: 'blank',
          q: `실패하면 크래시가 나는 강제 타입 캐스팅 연산자를 쓰세요.`,
          prefix: 'let dog = animal ', suffix: ' Dog', accept: ['as!'], placeholder: '연산자',
          why: '<code>as!</code>는 강제로 캐스팅하며, 틀리면 크래시가 나요.',
          hint: '느낌표(!)가 붙은 형태예요.'
        }),
        () => makeChoice(
          '<code>let animal: Animal = Dog()\nlet cat = animal as? Cat</code> (Cat이 Animal의 다른 자식 클래스일 때) 결과는?',
          'nil', ['크래시 발생', '컴파일 오류', 'Dog 인스턴스가 그대로 반환됨'],
          'animal의 실제 타입은 Dog이지 Cat이 아니므로, as? 캐스팅이 실패해 nil이 반환돼요.',
          '실제 인스턴스의 타입과 캐스팅하려는 타입이 다르면 실패해요.'
        ),
        () => makeChoice(
          '항상 성공이 보장되는 업캐스팅(자식 -> 부모)에 쓰는 연산자는?',
          'as', ['as?', 'as!', '??'],
          '자식 타입은 항상 부모 타입으로 볼 수 있으므로, 이런 안전한 캐스팅에는 물음표/느낌표 없는 as를 써요.',
          '항상 성공하니 특별한 기호가 필요 없어요.'
        ),
        () => ({
          type: 'code',
          q: '<code>animal</code>(Animal 타입, 실제로는 Dog 인스턴스)을 <code>as?</code>로 <code>Dog</code>로 캐스팅해 <code>if let</code>으로 꺼낸 뒤 <code>dog.bark()</code>를 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'if let dog = animal as? Dog {\n    print(dog.bark())\n}',
          accept: ['if let dog = animal as? Dog {\n    print(dog.bark())\n}'],
          why: 'as?의 결과는 옵셔널이므로 if let으로 안전하게 꺼내요.',
          hint: 'if let dog = animal as? Dog { print(dog.bark()) }'
        }),
      ],
      boss: () => makeChoice(
        'as, as?, as!에 대한 설명으로 옳은 것은?',
        'as는 항상 성공하는 캐스팅, as?는 실패 시 nil을 반환, as!는 실패 시 크래시가 난다', ['셋 다 완전히 동일하게 동작한다', 'as?는 실패하면 항상 크래시가 난다', 'as!는 실패해도 안전하게 nil을 반환한다'],
        'as(안전한 업캐스팅), as?(옵셔널 반환), as!(강제 단언, 실패 시 크래시) 순으로 안전성이 다르다는 걸 기억하세요.',
        '강제 언래핑(!)과 as!가 비슷한 위험성을 가진다는 걸 떠올려보세요.'
      )
    },
    {
      id: 'subscripts',
      title: '서브스크립트(subscript): 대괄호 문법 만들기',
      ready: true,
      summary: '배열처럼 대괄호로 값에 접근할 수 있게 해주는 커스텀 subscript를 정의하는 방법을 배워요.',
      goals: ['subscript 정의 문법 익히기', '커스텀 타입에서 대괄호 접근 지원하기', 'subscript에 get/set 추가하기'],
      blocks: [
        {
          h: 'subscript: 나만의 대괄호 문법',
          html: `<p>배열의 <code>arr[0]</code>, 딕셔너리의 <code>dict["key"]</code>처럼, 내가 만든 타입에도 <code>subscript</code>를 정의하면 대괄호로 값에 접근하게 만들 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Grid {
    var values: [Int]
    subscript(index: Int) -> Int {
        return values[index]
    }
}
let grid = Grid(values: [10, 20, 30])
print(grid[1])`,
            out: `20`
          }
        },
        {
          h: 'get과 set을 함께 가진 subscript',
          html: `<p>subscript에도 계산 프로퍼티처럼 <code>get</code>/<code>set</code>을 넣어서, 대괄호로 값을 읽는 것뿐 아니라 대입까지 지원할 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Grid {
    var values: [Int]
    subscript(index: Int) -> Int {
        get { return values[index] }
        set { values[index] = newValue }
    }
}
var grid = Grid(values: [10, 20, 30])
grid[1] = 99
print(grid[1])`,
            out: `99`
          },
          after: `<div class="note"><b>정리</b> — subscript는 <code>func</code>이 아니라 <code>subscript(매개변수) -> 반환타입 { }</code> 형태로 정의해요. 이름이 없는, 대괄호 전용 특별한 멤버예요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'subscript를 정의하는 이유는?',
          '내가 만든 타입에서도 대괄호([])로 값에 접근하게 하려고', ['함수 이름을 없애기 위해', 'class만 만들 수 있게 하려고', '배열을 없애기 위해'],
          'subscript는 배열/딕셔너리처럼 대괄호 문법으로 값에 접근할 수 있게 해주는 특별한 멤버예요.',
          'arr[0]처럼 접근하는 문법을 내 타입에도 만드는 거예요.'
        ),
        () => ({
          type: 'blank',
          q: `대괄호 접근 문법을 정의할 때 func 대신 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: '(index: Int) -> Int { return values[index] }', accept: ['subscript'], placeholder: '키워드',
          why: '<code>subscript</code>는 대괄호 접근 문법을 정의하는 특별한 키워드예요.',
          hint: '이 단원의 제목이기도 해요.'
        }),
        () => {
          const vals = [randInt(1, 20), randInt(21, 40), randInt(41, 60)];
          const idx = randInt(0, 2);
          return {
            type: 'blank',
            q: `<code>struct Grid { var values: [Int]; subscript(index: Int) -> Int { return values[index] } }\nlet grid = Grid(values: [${vals.join(', ')}])\nprint(grid[${idx}])</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(vals[idx])], placeholder: '숫자',
            why: `grid[${idx}]는 values 배열의 인덱스 ${idx} 값인 ${vals[idx]}를 반환해요.`,
            hint: '배열의 해당 인덱스 값을 확인해보세요.'
          };
        },
        () => makeChoice(
          'subscript에 set을 추가하면 무엇이 가능해지나요?',
          '대괄호 문법으로 값을 대입(수정)하는 것', ['배열을 정렬하는 것', '타입을 삭제하는 것', '아무것도 달라지지 않는다'],
          'set을 추가하면 grid[1] = 99처럼 대괄호로 값을 대입할 수 있게 돼요.',
          '계산 프로퍼티의 get/set과 비슷한 개념이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>values: [Int]</code>를 가진 <code>Grid</code> struct에, <code>index: Int</code>를 받아 <code>values[index]</code>를 반환하는 읽기 전용 <code>subscript</code>를 정의하세요.',
          starter: '',
          rows: 4,
          placeholder: 'struct Grid {\n    var values: [Int]\n    subscript(index: Int) -> Int {\n        return values[index]\n    }\n}',
          accept: ['struct Grid {\n    var values: [Int]\n    subscript(index: Int) -> Int {\n        return values[index]\n    }\n}'],
          why: 'subscript(매개변수) -> 반환타입 { } 형태로 대괄호 접근을 정의해요.',
          hint: 'struct Grid { var values: [Int]; subscript(index: Int) -> Int { return values[index] } }'
        }),
      ],
      boss: () => {
        const vals = [randInt(1, 30), randInt(31, 60), randInt(61, 90)];
        const idx = randInt(0, 2);
        const newVal = randInt(100, 200);
        return {
          type: 'blank',
          q: `<code>struct Grid { var values: [Int]; subscript(index: Int) -> Int { get { return values[index] } set { values[index] = newValue } } }\nvar grid = Grid(values: [${vals.join(', ')}])\ngrid[${idx}] = ${newVal}\nprint(grid[${idx}])</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(newVal)], placeholder: '숫자',
          why: `set을 통해 인덱스 ${idx}의 값이 ${newVal}로 바뀌었어요.`,
          hint: 'subscript의 set이 값을 실제로 바꿔줘요.'
        };
      }
    },
    {
      id: 'operatorOverloading',
      title: '연산자 오버로딩',
      ready: true,
      summary: '내가 만든 타입에도 +, == 같은 연산자를 직접 정의하는 연산자 오버로딩을 배워요.',
      goals: ['커스텀 타입에 + 연산자 정의하기', 'static func로 연산자 구현하기', '연산자 오버로딩이 코드를 읽기 쉽게 만드는 이유 이해하기'],
      blocks: [
        {
          h: '+ 연산자 직접 정의하기',
          html: `<p>연산자도 사실 특별한 이름의 함수예요. <code>static func +</code>를 정의하면, 내가 만든 타입끼리 <code>+</code>로 더할 수 있게 돼요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Point {
    var x: Int
    var y: Int
    static func + (left: Point, right: Point) -> Point {
        return Point(x: left.x + right.x, y: left.y + right.y)
    }
}
let p1 = Point(x: 1, y: 2)
let p2 = Point(x: 3, y: 4)
let p3 = p1 + p2
print(p3.x, p3.y)`,
            out: `4 6`
          }
        },
        {
          h: '== 연산자로 값 비교하기',
          html: `<p><code>Equatable</code> 프로토콜을 채택하고 <code>==</code>를 구현하면, 내 타입끼리 <code>==</code>로 비교할 수 있어요. (사실 struct의 모든 프로퍼티가 Equatable이면, <code>: Equatable</code>만 붙여도 자동으로 구현돼요.)</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `struct Point: Equatable {
    var x: Int
    var y: Int
}
let p1 = Point(x: 1, y: 2)
let p2 = Point(x: 1, y: 2)
print(p1 == p2)`,
            out: `true`
          },
          after: `<div class="note"><b>정리</b> — 연산자 오버로딩은 신중하게 써야 해요. <code>+</code>는 "더한다"는 직관과 맞는 의미로만 쓰는 게 코드를 읽기 쉽게 만들어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '연산자 오버로딩을 구현할 때 사용하는 키워드 조합은?',
          'static func', ['mutating var', 'private let', 'override var'],
          '연산자는 <code>static func 연산자기호(매개변수들) -> 반환타입</code> 형태로 구현해요.',
          '타입 자체에 속하는 함수라는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `struct가 자동으로 == 구현을 얻으려면 어떤 프로토콜을 채택해야 하나요? (모든 프로퍼티가 그 프로토콜을 만족할 때)`,
          prefix: 'struct Point: ', suffix: ' { var x: Int; var y: Int }', accept: ['Equatable'], placeholder: '프로토콜 이름',
          why: '<code>Equatable</code>을 채택하면(프로퍼티들이 모두 비교 가능할 때) ==가 자동으로 구현돼요.',
          hint: '"비교 가능한"이라는 뜻의 이름이에요.'
        }),
        () => {
          const x1 = randInt(1, 10), y1 = randInt(1, 10);
          const x2 = randInt(1, 10), y2 = randInt(1, 10);
          return {
            type: 'blank',
            q: `<code>struct Point { var x: Int; var y: Int; static func + (l: Point, r: Point) -> Point { return Point(x: l.x + r.x, y: l.y + r.y) } }\nlet p1 = Point(x: ${x1}, y: ${y1})\nlet p2 = Point(x: ${x2}, y: ${y2})\nlet p3 = p1 + p2\nprint(p3.x, p3.y)</code>를 실행하면? (형식: 숫자 숫자)`,
            prefix: '', suffix: '', accept: [`${x1 + x2} ${y1 + y2}`], placeholder: '출력 결과',
            why: `x끼리, y끼리 각각 더해져서 (${x1 + x2}, ${y1 + y2})가 돼요.`,
            hint: 'x는 x끼리, y는 y끼리 더해져요.'
          };
        },
        () => makeChoice(
          '연산자 오버로딩을 쓸 때 주의할 점은?',
          '연산자의 직관적인 의미(예: +는 더하기)에 맞게 구현해야 한다', ['모든 연산자를 항상 오버로딩해야 한다', '연산자는 오버로딩할 수 없다', 'class에서만 가능하다'],
          '연산자의 의미와 다르게 구현하면 코드를 읽는 사람이 혼란스러울 수 있어요.',
          '가독성을 해치지 않는 것이 중요해요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Point</code> struct(x, y: Int)에 대해 <code>-</code> 연산자를 <code>static func</code>로 정의해, x끼리 y끼리 빼서 새 Point를 반환하도록 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'static func - (left: Point, right: Point) -> Point {\n    return Point(x: left.x - right.x, y: left.y - right.y)\n}',
          accept: ['static func - (left: Point, right: Point) -> Point {\n    return Point(x: left.x - right.x, y: left.y - right.y)\n}'],
          why: 'static func 연산자기호(매개변수) -> 반환타입 형태로 연산자를 구현해요.',
          hint: 'static func - (left: Point, right: Point) -> Point { return Point(x: left.x - right.x, y: left.y - right.y) }'
        }),
      ],
      boss: () => {
        const x1 = randInt(1, 20), y1 = randInt(1, 20);
        const x2 = randInt(1, 20), y2 = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>struct Point { var x: Int; var y: Int; static func + (l: Point, r: Point) -> Point { return Point(x: l.x + r.x, y: l.y + r.y) } }\nlet p1 = Point(x: ${x1}, y: ${y1})\nlet p2 = Point(x: ${x2}, y: ${y2})\nprint((p1 + p2).x, (p1 + p2).y)</code>를 실행하면? (형식: 숫자 숫자)`,
          prefix: '', suffix: '', accept: [`${x1 + x2} ${y1 + y2}`], placeholder: '출력 결과',
          why: `+ 연산자가 x, y를 각각 더해서 (${x1 + x2}, ${y1 + y2})를 만들어요.`,
          hint: 'x는 x끼리, y는 y끼리 더해져요.'
        };
      }
    },
    {
      id: 'propertyWrappers',
      title: '프로퍼티 래퍼(Property Wrapper) 맛보기',
      ready: true,
      summary: '프로퍼티에 재사용 가능한 로직을 씌우는 @propertyWrapper 개념을 간단히 살펴봐요.',
      goals: ['@propertyWrapper의 목적 이해하기', 'wrappedValue의 역할 알기', '@문법으로 프로퍼티에 래퍼 적용하기'],
      blocks: [
        {
          h: '프로퍼티 래퍼: 반복되는 로직을 감싸기',
          html: `<p>여러 프로퍼티에 매번 같은 로직(예: "항상 0 이상으로 유지하기")을 반복해서 적기보다, <code>@propertyWrapper</code>로 그 로직을 한 곳에 모아두고 재사용할 수 있어요. 이 개념은 SwiftUI의 <code>@State</code> 같은 문법에서도 쓰이는 아이디어예요(이 강좌에서는 UI 없이 개념만 다뤄요).</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `@propertyWrapper
struct Positive {
    private var value = 0
    var wrappedValue: Int {
        get { return value }
        set { value = max(0, newValue) }
    }
}
struct Account {
    @Positive var balance: Int
}
var account = Account()
account.balance = -50
print(account.balance)`,
            out: `0`
          }
        },
        {
          h: 'wrappedValue: 실제로 감싸지는 값',
          html: `<p>프로퍼티 래퍼 struct 안의 <code>wrappedValue</code>가, <code>@래퍼이름</code>이 붙은 프로퍼티에 접근할 때 실제로 읽고 쓰이는 값이에요. get/set 안에 원하는 규칙(범위 제한, 로깅 등)을 자유롭게 넣을 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `@propertyWrapper
struct Positive {
    private var value = 0
    var wrappedValue: Int {
        get { return value }
        set { value = max(0, newValue) }
    }
}
struct Account {
    @Positive var balance: Int
}
var account = Account()
account.balance = 100
print(account.balance)`,
            out: `100`
          },
          after: `<div class="note"><b>정리</b> — 프로퍼티 래퍼는 "이 값에는 항상 이런 규칙이 적용돼야 한다"는 로직을 한 번만 작성하고 여러 프로퍼티에 <code>@이름</code>으로 재사용하게 해주는 스위프트의 고급 기능이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '프로퍼티 래퍼를 쓰는 이유는?',
          '여러 프로퍼티에 반복되는 로직을 한 곳에 모아 재사용하기 위해', ['프로퍼티를 아예 없애기 위해', 'class를 struct로 바꾸기 위해', '항상 프로퍼티를 private으로 만들기 위해'],
          '프로퍼티 래퍼는 "값을 읽고 쓸 때 적용할 규칙"을 한 번 정의해 여러 프로퍼티에서 재사용하게 해줘요.',
          '"래퍼(감싸는 것)"이라는 이름이 힌트예요.'
        ),
        () => ({
          type: 'blank',
          q: `프로퍼티 래퍼 struct 안에서, 실제로 읽고 쓰이는 값을 나타내는 프로퍼티 이름을 쓰세요.`,
          prefix: 'var ', suffix: ': Int { get { return value } set { value = max(0, newValue) } }', accept: ['wrappedValue'], placeholder: '프로퍼티 이름',
          why: '<code>wrappedValue</code>는 @래퍼가 붙은 프로퍼티에 접근할 때 실제로 쓰이는 값이에요.',
          hint: '"감싸진 값"이라는 뜻의 이름이에요.'
        }),
        () => {
          const val = randInt(-50, -1);
          return {
            type: 'blank',
            q: `<code>@propertyWrapper struct Positive { private var value = 0; var wrappedValue: Int { get { return value } set { value = max(0, newValue) } } }\nstruct Account { @Positive var balance: Int }\nvar account = Account()\naccount.balance = ${val}\nprint(account.balance)</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: ['0'], placeholder: '숫자',
            why: `${val}은 음수이므로, set에서 max(0, ${val})이 적용되어 0이 저장돼요.`,
            hint: 'set 안에서 max(0, newValue)가 어떤 값을 만들지 생각해보세요.'
          };
        },
        () => makeChoice(
          '<code>@Positive var balance: Int</code>에서 <code>@Positive</code>가 하는 일은?',
          'balance에 접근할 때마다 Positive 래퍼의 규칙을 적용한다', ['balance를 private으로 만든다', 'balance를 static으로 만든다', '아무 효과가 없다'],
          '@래퍼이름을 프로퍼티 앞에 붙이면, 그 래퍼가 정의한 get/set 규칙이 적용돼요.',
          '어노테이션처럼 보이지만 실제로 동작에 영향을 줘요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Account</code> struct 안에 <code>@Positive var balance: Int</code>라는 프로퍼티를 선언하는 한 줄 코드를 작성하세요. (Positive 프로퍼티 래퍼는 이미 정의되어 있다고 가정)',
          starter: '',
          rows: 2,
          placeholder: '@Positive var balance: Int',
          accept: ['@Positive var balance: Int'],
          why: '@래퍼이름을 프로퍼티 선언 앞에 붙이면 돼요.',
          hint: '@Positive var balance: Int'
        }),
      ],
      boss: () => {
        const val = randInt(1, 200);
        return {
          type: 'blank',
          q: `<code>@propertyWrapper struct Positive { private var value = 0; var wrappedValue: Int { get { return value } set { value = max(0, newValue) } } }\nstruct Account { @Positive var balance: Int }\nvar account = Account()\naccount.balance = ${val}\nprint(account.balance)</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(val)], placeholder: '숫자',
          why: `${val}은 0 이상이므로 max(0, ${val})은 그대로 ${val}이에요.`,
          hint: '양수는 그대로 저장돼요.'
        };
      }
    },
    {
      id: 'gcdBasics',
      title: 'GCD와 DispatchQueue 기초',
      ready: true,
      summary: 'async/await 이전부터 쓰이던 동시성 도구인 DispatchQueue의 기본 개념을 배워요.',
      goals: ['메인 큐와 백그라운드 큐의 차이 이해하기', 'DispatchQueue.global()로 작업 보내기', 'DispatchQueue.main으로 돌아오는 이유 알기'],
      blocks: [
        {
          h: 'GCD: 큐에 작업을 던져 넣기',
          html: `<p><b>GCD(Grand Central Dispatch)</b>는 async/await 이전부터 스위프트(와 오브젝티브-C)에서 널리 쓰인 동시성 도구예요. <code>DispatchQueue.global().async { }</code>로 시간이 걸리는 작업을 백그라운드 큐에 보낼 수 있어요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `DispatchQueue.global().async {
    print("백그라운드에서 무거운 작업 실행")
}`,
            out: `(백그라운드 큐에서 비동기로 실행돼요)`
          }
        },
        {
          h: '메인 큐로 돌아오기',
          html: `<p>화면(UI)과 관련된 작업은 반드시 <b>메인 큐</b>에서 실행해야 해요. 백그라운드 작업이 끝난 뒤 결과를 화면에 반영하려면, <code>DispatchQueue.main.async { }</code>로 다시 메인 큐로 돌아와야 해요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `DispatchQueue.global().async {
    let result = 1 + 1
    DispatchQueue.main.async {
        print("결과: \\(result)")
    }
}`,
            out: `결과: 2`
          },
          after: `<div class="note"><b>정리</b> — 최신 코드는 대부분 async/await를 우선 쓰지만, GCD는 여전히 많은 기존 코드와 일부 API에서 쓰이고 있어서 개념을 알아두면 도움이 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'GCD가 하는 일은?',
          '작업을 큐에 넣어 동시에 또는 비동기로 실행되게 한다', ['문자열을 암호화한다', 'JSON을 파싱한다', '배열을 정렬한다'],
          'GCD(Grand Central Dispatch)는 작업을 큐에 넣어 동시성/비동기 실행을 관리해주는 시스템이에요.',
          '"큐(줄)"에 작업을 넣는다는 개념을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `UI 관련 작업을 반드시 실행해야 하는 큐의 이름을 쓰세요. (DispatchQueue.___)`,
          prefix: 'DispatchQueue.', suffix: '.async { }', accept: ['main'], placeholder: '큐 이름',
          why: 'UI 갱신은 반드시 <code>DispatchQueue.main</code>(메인 큐)에서 실행해야 해요.',
          hint: '"메인(주요한)"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '시간이 오래 걸리는 작업을 UI가 멈추지 않게 실행하려면 어디에 보내야 하나요?',
          'DispatchQueue.global()(백그라운드 큐)', ['DispatchQueue.main만', 'actor', 'Codable'],
          '오래 걸리는 작업은 백그라운드 큐(global())에 보내서 메인 큐(UI)가 멈추지 않게 해요.',
          '메인 큐를 막지 않는 게 핵심이에요.'
        ),
        () => makeChoice(
          '백그라운드 작업이 끝난 뒤 결과로 화면을 갱신하려면 어떻게 해야 하나요?',
          'DispatchQueue.main.async { }로 다시 메인 큐로 돌아와서 처리한다', ['백그라운드 큐에서 그대로 UI를 갱신한다', '아무 처리도 필요 없다', 'actor를 반드시 써야 한다'],
          'UI 갱신은 항상 메인 큐에서 해야 하므로, 백그라운드 작업이 끝나면 DispatchQueue.main.async로 돌아와요.',
          '"메인 큐로 돌아온다"는 패턴을 기억하세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>DispatchQueue.global()</code>에 <code>"작업 중"</code>을 출력하는 클로저를 <code>async</code>로 보내는 한 줄 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'DispatchQueue.global().async {\n    print("작업 중")\n}',
          accept: ['DispatchQueue.global().async {\n    print("작업 중")\n}'],
          why: 'DispatchQueue.global().async { } 형태로 백그라운드 큐에 작업을 보내요.',
          hint: 'DispatchQueue.global().async { print("작업 중") }'
        }),
      ],
      boss: () => makeChoice(
        'GCD를 사용할 때 지켜야 할 핵심 규칙은?',
        '오래 걸리는 작업은 백그라운드 큐에서, UI 갱신은 항상 메인 큐에서 실행한다', ['모든 작업은 항상 메인 큐에서만 실행해야 한다', 'UI 갱신도 백그라운드 큐에서 하는 것이 더 빠르다', 'DispatchQueue는 async/await와 전혀 관련이 없다'],
        '무거운 작업은 백그라운드로, UI 갱신은 메인 큐로 — 이 원칙이 GCD 사용의 핵심이에요.',
        '메인 큐를 막지 않으면서도, UI는 메인 큐에서만 안전하게 갱신해야 해요.'
      )
    },
    {
      id: 'testingBasics',
      title: '테스트 개념: assert와 검증하는 습관',
      ready: true,
      summary: '코드가 예상대로 동작하는지 확인하는 assert 패턴과, XCTest의 기본 아이디어를 배워요.',
      goals: ['assert로 조건을 검증하는 습관 이해하기', '실제 프로젝트의 XCTest 개념 감 잡기', '테스트 가능한 함수를 작성하는 이유 알기'],
      blocks: [
        {
          h: 'assert: 조건이 참인지 확인하기',
          html: `<p><code>assert(조건, "메시지")</code>는 조건이 거짓이면 그 자리에서 실행을 멈추고 메시지를 보여줘요. "이 시점에 이 값은 반드시 이래야 한다"는 가정을 코드로 명시하는 방법이에요. (참고: 릴리스 빌드에서는 assert가 자동으로 비활성화돼요.)</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `func add(_ a: Int, _ b: Int) -> Int {
    return a + b
}
let result = add(2, 3)
assert(result == 5, "2 + 3은 5여야 해요")
print(result)`,
            out: `5`
          }
        },
        {
          h: 'XCTest의 아이디어',
          html: `<p>실제 Xcode 프로젝트에서는 <code>XCTest</code> 프레임워크로 <code>XCTAssertEqual(실제값, 기대값)</code> 같은 함수를 이용해 정식 테스트 코드를 작성해요. 기본 아이디어는 assert와 같아요: "함수를 실행해보고, 결과가 기대한 값과 같은지 확인한다."</p>`,
          code: {
            label: 'test_example.swift',
            lang: 'swift',
            src: `func testAdd() {
    let result = add(2, 3)
    assert(result == 5, "덧셈 결과가 예상과 달라요")
    print("testAdd 통과!")
}
testAdd()`,
            out: `testAdd 통과!`
          },
          after: `<div class="note"><b>정리</b> — 테스트를 미리 작성해두면, 나중에 코드를 고치다가 실수로 기존 동작을 망가뜨렸을 때 바로 알아챌 수 있어요. "작게 나뉜 함수 + 명확한 입출력"으로 코드를 짜면 테스트하기도 훨씬 쉬워져요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'assert(조건, 메시지)가 하는 일은?',
          '조건이 거짓이면 그 자리에서 멈추고 메시지를 보여준다', ['조건과 상관없이 항상 메시지를 출력한다', '조건을 nil로 바꾼다', '조건이 참이면 프로그램을 종료한다'],
          'assert는 "이 조건이 참이어야 한다"는 가정을 검증해서, 거짓이면 즉시 알려줘요.',
          '"단언하다"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `실행 중 조건을 검증할 때 쓰는 스위프트 함수 이름을 쓰세요.`,
          prefix: '', suffix: '(result == 5, "메시지")', accept: ['assert'], placeholder: '함수 이름',
          why: '<code>assert</code>는 조건을 검증하는 함수예요.',
          hint: '이 단원에서 반복해서 다룬 함수예요.'
        }),
        () => makeChoice(
          '실제 Xcode 프로젝트에서 정식 테스트 코드를 작성할 때 쓰는 프레임워크는?',
          'XCTest', ['JSONEncoder', 'DispatchQueue', 'Codable'],
          'XCTest는 애플이 제공하는 공식 테스트 프레임워크예요.',
          '"Test"라는 단어가 이름에 들어가요.'
        ),
        () => makeChoice(
          '함수를 작게 나누고 입출력을 명확히 하면 어떤 장점이 있나요?',
          '테스트를 작성하고 검증하기 쉬워진다', ['코드가 항상 더 느려진다', '메모리를 더 많이 쓰게 된다', '아무 장점도 없다'],
          '작고 명확한 함수는 "입력에 대해 기대하는 출력"을 검증하는 테스트를 작성하기 훨씬 쉬워요.',
          '테스트하기 좋은 코드의 특징을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>add(2, 3)</code>의 결과가 <code>5</code>와 같은지 <code>assert</code>로 검증하는 한 줄 코드를 작성하세요. (메시지는 <code>"결과가 5여야 해요"</code>)',
          starter: '',
          rows: 2,
          placeholder: 'assert(add(2, 3) == 5, "결과가 5여야 해요")',
          accept: ['assert(add(2, 3) == 5, "결과가 5여야 해요")'],
          why: 'assert(조건, 메시지) 형태로 검증해요.',
          hint: 'assert(add(2, 3) == 5, "결과가 5여야 해요")'
        }),
      ],
      boss: () => {
        const a = randInt(1, 20);
        const b = randInt(1, 20);
        return makeChoice(
          `<code>func add(_ a: Int, _ b: Int) -> Int { return a + b }\nassert(add(${a}, ${b}) == ${a + b}, "실패")\nprint("통과")</code>를 실행하면 무엇이 출력되나요?`,
          '통과', ['실패', '프로그램이 멈춘다', 'nil'],
          `add(${a}, ${b})는 ${a + b}를 반환하고, 조건이 참이므로 assert를 통과해 "통과"가 출력돼요.`,
          `${a} + ${b}를 계산해서 assert 조건이 참인지 확인해보세요.`
        );
      }
    },
    {
      id: 'capstone',
      title: '캡스톤: 구조체 + 프로토콜 + 오류 처리 종합',
      ready: true,
      summary: '지금까지 배운 struct, protocol, 오류 처리를 하나의 작은 프로그램으로 종합해봐요.',
      goals: ['struct와 protocol을 함께 설계하기', 'throws로 실패 가능한 로직 표현하기', '지금까지 배운 개념들을 하나로 연결하기'],
      blocks: [
        {
          h: '지금까지 배운 것들을 한 번에',
          html: `<p>struct(값 타입 모델링), protocol(공통 규약), 오류 처리(throws/do-catch)를 모두 합쳐 학생 성적을 검증하는 작은 프로그램을 만들어봤어요. 실무 스위프트 코드는 대부분 이런 조각들의 조합이에요.</p>`,
          code: {
            label: 'main.swift',
            lang: 'swift',
            src: `enum ScoreError: Error {
    case outOfRange
}
protocol Describable {
    func describe() -> String
}
struct Student: Describable {
    var name: String
    var score: Int

    init(name: String, score: Int) throws {
        guard (0...100).contains(score) else {
            throw ScoreError.outOfRange
        }
        self.name = name
        self.score = score
    }

    func describe() -> String {
        return "\\(name): \\(score)점"
    }
}
do {
    let student = try Student(name: "지수", score: 95)
    print(student.describe())
} catch {
    print("생성 실패: \\(error)")
}`,
            out: `지수: 95점`
          }
        },
        {
          h: '스위프트다운(idiomatic) 코드의 특징 정리',
          html: `<p>좋은 스위프트 코드는 보통 이런 특징을 가져요: <b>단순한 데이터는 struct로</b>, <b>공통 동작은 protocol로 추상화</b>, <b>실패 가능한 로직은 옵셔널이나 throws로 명시</b>, <b>강제 언래핑(!)은 최소화</b>, <b>guard로 조기 종료해 중첩을 줄이기</b>. 다음 단계로는 Xcode를 설치해서 직접 작은 iOS 앱 프로젝트를 만들어보는 것을 추천해요.</p>`,
          code: {
            label: 'idiomatic_checklist.txt',
            lang: 'swift',
            src: `체크리스트:
- 단순한 데이터 모델에 struct를 우선 고려했는가?
- 공통 동작을 protocol + extension으로 추상화했는가?
- 실패 가능성을 옵셔널/throws로 명확히 드러냈는가?
- 강제 언래핑(!)과 try!를 꼭 필요한 곳에만 썼는가?
- guard로 조기 종료해 코드 중첩을 줄였는가?`,
            out: `(자기 점검용 체크리스트)`
          },
          after: `<div class="note"><b>정리</b> — 여기까지 오셨다면 스위프트의 핵심 개념(옵셔널, 값/참조 타입, 프로토콜, 오류 처리, 동시성)을 모두 훑은 거예요. 이제부터는 직접 작은 프로젝트를 만들면서 컴파일러의 오류 메시지를 읽고 고쳐나가는 연습이 가장 빠른 성장 방법이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const score = randInt(0, 100);
          return {
            type: 'blank',
            q: `<code>guard (0...100).contains(score) else { throw ScoreError.outOfRange }</code>에서 score가 ${score}일 때, 이 guard는 통과되나요? (참 또는 거짓)`,
            prefix: '', suffix: '', accept: ['참'], placeholder: '참 또는 거짓',
            why: `${score}는 0부터 100 사이이므로 조건을 만족해 guard를 통과해요.`,
            hint: '0...100 범위 안에 있는지 확인해보세요.'
          };
        },
        () => makeChoice(
          '스위프트다운(idiomatic) 코드의 특징으로 옳지 않은 것은?',
          '가능한 모든 곳에서 강제 언래핑(!)을 사용해 코드를 짧게 만든다', ['단순한 데이터 모델에 struct를 우선 고려한다', '공통 동작을 protocol + extension으로 추상화한다', '실패 가능성을 옵셔널이나 throws로 명확히 드러낸다'],
          '강제 언래핑(!)을 남용하는 것은 오히려 안 좋은 습관이에요. 실패 가능성은 옵셔널이나 guard/throws로 명시적으로 다루는 게 스위프트다운 스타일이에요.',
          '"짧다"고 항상 "좋은 코드"는 아니에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>enum ScoreError: Error { case outOfRange }\nstruct Student { var name: String; var score: Int; init(name: String, score: Int) throws { guard (0...100).contains(score) else { throw ScoreError.outOfRange }; self.name = name; self.score = score } }\ndo { let s = try Student(name: "민준", score: 150); print(s.score) } catch { print("실패") }</code>를 실행하면?`,
            prefix: '', suffix: '', accept: ['실패'], placeholder: '출력 결과',
            why: '150은 0...100 범위를 벗어나므로 init이 오류를 던지고, catch 블록의 "실패"가 출력돼요.',
            hint: '150은 100보다 크다는 걸 기억하세요.'
        }),
        () => makeChoice(
          '이 강좌를 마친 다음 단계로 추천되는 것은?',
          'Xcode를 설치해 직접 작은 iOS 앱 프로젝트를 만들어본다', ['모든 코드에 try!와 강제 언래핑만 사용해 연습한다', '더 이상 공부할 필요 없이 바로 대규모 앱을 출시한다', '옵셔널 없이 코드를 짜는 연습을 한다'],
          '직접 작은 프로젝트를 만들어보고 실제 Xcode 환경을 탐험하는 것이 다음 성장 단계로 가장 추천돼요.',
          '이론을 실전 프로젝트에 적용해보는 게 가장 빠른 학습 방법이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>ScoreError.outOfRange</code> case를 가진 <code>Error</code> enum <code>ScoreError</code>를 정의하세요.',
          starter: '',
          rows: 3,
          placeholder: 'enum ScoreError: Error {\n    case outOfRange\n}',
          accept: ['enum ScoreError: Error {\n    case outOfRange\n}'],
          why: 'enum 이름: Error { case ... } 형태로 오류 타입을 정의해요.',
          hint: 'enum ScoreError: Error { case outOfRange }'
        }),
      ],
      boss: () => {
        const score = randInt(0, 100);
        const name = pick(['지수', '민준', '서연', '하늘']);
        return {
          type: 'blank',
          q: `<code>enum ScoreError: Error { case outOfRange }\nstruct Student { var name: String; var score: Int; init(name: String, score: Int) throws { guard (0...100).contains(score) else { throw ScoreError.outOfRange }; self.name = name; self.score = score }; func describe() -> String { return "\\(name): \\(score)점" } }\ndo { let s = try Student(name: "${name}", score: ${score}); print(s.describe()) } catch { print("실패") }</code>를 실행하면? (형식: 이름: 점수점)`,
          prefix: '', suffix: '', accept: [`${name}: ${score}점`], placeholder: '출력 결과',
          why: `${score}는 0...100 범위 안이므로 초기화에 성공하고, describe()가 "${name}: ${score}점"을 반환해요.`,
          hint: '0부터 100 사이면 정상적으로 생성돼요.'
        };
      }
    },
    ],
  tierBoss: {
    beginner: () => {
      const name = pick(['지수', '민준', '서연']);
      const age = randInt(14, 19);
      return {
        type: 'code',
        q: `<code>name</code>(문자열, "${name}")과 <code>age</code>(정수, ${age})를 상수로 선언하고, <code>age</code>가 18 이상이면 "성인", 아니면 "미성년자"를 출력하는 프로그램을 작성하세요.`,
        starter: '',
        rows: 8,
        placeholder: `let name = "${name}"\nlet age = ${age}\nif age >= 18 {\n    print("성인")\n} else {\n    print("미성년자")\n}`,
        accept: [`let name = "${name}"\nlet age = ${age}\nif age >= 18 {\n    print("성인")\n} else {\n    print("미성년자")\n}`],
        why: 'let으로 상수를 선언하고, if/else로 조건에 따라 다른 결과를 출력해요.',
        hint: 'let으로 name, age를 선언한 뒤 if age >= 18 { } else { }를 써보세요.'
      };
    },
    intermediate: () => ({
      type: 'code',
      q: '<code>[Int]</code>를 받아, 짝수만 골라 각 값을 제곱한 뒤 합을 반환하는 함수 <code>sumOfEvenSquares(_ nums: [Int]) -> Int</code>를 <code>filter</code>, <code>map</code>, <code>reduce</code>를 이용해 작성하세요.',
      starter: '',
      rows: 4,
      placeholder: 'func sumOfEvenSquares(_ nums: [Int]) -> Int {\n    return nums.filter { $0 % 2 == 0 }.map { $0 * $0 }.reduce(0) { $0 + $1 }\n}',
      accept: ['func sumOfEvenSquares(_ nums: [Int]) -> Int {\n    return nums.filter { $0 % 2 == 0 }.map { $0 * $0 }.reduce(0) { $0 + $1 }\n}'],
      why: 'filter로 짝수만 남기고, map으로 제곱한 뒤, reduce로 모두 더해요.',
      hint: 'nums.filter { $0 % 2 == 0 }.map { $0 * $0 }.reduce(0) { $0 + $1 }'
    }),
    advanced: () => ({
      type: 'code',
      q: '<code>func area() -> Double</code>을 요구하는 프로토콜 <code>Shape</code>를 정의하고, <code>width: Double, height: Double</code> 프로퍼티를 가진 <code>Rectangle</code> struct가 이를 준수(<code>area</code>는 width * height)하도록 작성하세요.',
      starter: '',
      rows: 8,
      placeholder: 'protocol Shape {\n    func area() -> Double\n}\n\nstruct Rectangle: Shape {\n    var width: Double\n    var height: Double\n    func area() -> Double {\n        return width * height\n    }\n}',
      accept: ['protocol Shape {\n    func area() -> Double\n}\n\nstruct Rectangle: Shape {\n    var width: Double\n    var height: Double\n    func area() -> Double {\n        return width * height\n    }\n}'],
      why: 'protocol로 요구 사항을 정의하고, struct Rectangle: Shape로 실제 구현을 채워 넣어요.',
      hint: 'protocol Shape { func area() -> Double } 다음 struct Rectangle: Shape { var width: Double; var height: Double; func area() -> Double { return width * height } }'
    }),
  }
};
