/* Rust 강의·문제 데이터 — 단원을 추가하려면 units 배열에 항목을 넣으면 됩니다. */
COURSES.rust = {
    name: 'Rust',
    tagline: '안전성과 속도를 동시에 잡은, 메모리 버그 없는 시스템 프로그래밍 언어',
    units: [{
      id: 'intro',
      title: '러스트는 어떤 언어인가요?',
      ready: true,
      intro: true,
      summary: '러스트가 무엇이고, 어디에 쓰이고, 왜 배우면 좋은지 알아봐요.',
      blocks: [
        {
          h: '러스트는 어떤 언어인가요?',
          html: `<p>러스트는 모질라가 시작한 언어로, 2010년에 처음 발표됐어요. C/C++만큼 빠른 실행 속도를 내면서도, 메모리 관련 오류를 컴파일 시점에 미리 막아주는 게 가장 큰 특징이에요.</p>`
        },
        {
          h: '어디에 쓰이나요?',
          html: `<p>시스템 프로그래밍, 웹어셈블리(WebAssembly), 블록체인 관련 소프트웨어, 그리고 최근에는 일부 운영체제 구성 요소에도 쓰이기 시작했어요.</p>`
        },
        {
          h: '왜 배우면 좋을까요?',
          html: `<p>"소유권(ownership)"이라는 다른 언어에 없는 독특한 개념 때문에 처음엔 도전적으로 느껴질 수 있어요. 하지만 이 개념을 이해하고 나면, 메모리가 어떻게 관리되는지에 대한 이해가 완전히 달라져요.</p>`,
          after: `<div class="note"><b>팁</b> — 이 단원은 읽기만 하면 되고, 문제나 예제는 없어요. 다음 단원부터 진짜 코드를 써보기 시작해요!</div>`
        }
      ]
    },
    {
      id: 'helloAndComments',
      title: 'Hello, World! 와 주석',
      ready: true,
      summary: 'cargo로 새 프로젝트를 만들고, 첫 Rust 프로그램과 주석 문법을 배워요.',
      goals: ['cargo new로 프로젝트 만들기', 'println!으로 출력하기', '한 줄/여러 줄 주석 쓰기'],
      blocks: [
        {
          h: 'cargo new: 프로젝트 시작하기',
          html: `<p>Rust는 <code>cargo</code>라는 도구로 프로젝트를 관리해요. <code>cargo new hello</code>를 실행하면 <code>src/main.rs</code> 파일이 자동으로 만들어지고, <code>cargo run</code>으로 빌드와 실행을 한 번에 할 수 있어요.</p>`,
          code: {
            label: 'src/main.rs',
            lang: 'rust',
            src: `fn main() {
    println!("Hello, World!");
}`,
            out: `Hello, World!`
          }
        },
        {
          h: '주석: 컴파일러가 무시하는 메모',
          html: `<p><code>//</code>는 한 줄 주석, <code>/* ... */</code>는 여러 줄 주석이에요. 주석은 실행에 영향을 주지 않고, 코드를 설명하는 메모로만 쓰여요.</p>`,
          code: {
            label: 'comments.rs',
            lang: 'rust',
            src: `fn main() {
    // 이 줄은 실행되지 않아요
    println!("실행됨"); // 줄 끝에도 쓸 수 있어요
    /* 여러 줄
       주석도 가능해요 */
}`,
            out: `실행됨`
          },
          after: `<div class="note"><b>정리</b> — 모든 Rust 프로그램은 <code>fn main() { }</code>에서 시작하고, <code>println!</code>은 함수가 아니라 <b>매크로</b>라서 이름 뒤에 느낌표(!)가 붙어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'Rust에서 실행이 시작되는 함수의 이름은?',
          'main', ['start', 'run', 'init'],
          '모든 Rust 실행 파일은 <code>fn main() { }</code>에서 시작해요.',
          '다른 언어의 진입점 함수 이름을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `화면에 글자를 출력할 때 쓰는 Rust 매크로 이름을 쓰세요. (느낌표 포함)`,
          prefix: '', suffix: '("Hi");', accept: ['println!'], placeholder: '매크로 이름',
          why: '<code>println!</code>은 값을 출력하고 줄바꿈까지 해주는 매크로예요.',
          hint: '느낌표(!)가 이름 뒤에 붙는 게 매크로의 특징이에요.'
        }),
        () => makeChoice(
          'Rust에서 한 줄 주석을 시작하는 기호는?',
          '//', ['#', '--', '\'\''],
          'Rust의 한 줄 주석은 <code>//</code>로 시작해요.',
          'JavaScript나 Go와 같은 기호를 써요.'
        ),
        () => ({
          type: 'blank',
          q: `새 Rust 프로젝트를 만들 때 쓰는 <code>cargo</code> 명령어를 쓰세요. (예: cargo ___ hello)`,
          prefix: 'cargo ', suffix: ' hello', accept: ['new'], placeholder: '명령어',
          why: '<code>cargo new hello</code>는 hello라는 이름의 새 프로젝트 폴더를 만들어줘요.',
          hint: '"새로" 만든다는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>fn main()</code> 안에서 <code>println!</code>으로 <code>"Hello, Rust!"</code>를 출력하는 전체 프로그램을 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'fn main() {\n    println!("Hello, Rust!");\n}',
          accept: ['fn main() {\n    println!("Hello, Rust!");\n}'],
          why: 'fn main() { } 블록 안에 println!("Hello, Rust!"); 한 줄을 넣으면 돼요.',
          hint: 'fn main() { println!("Hello, Rust!"); } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => ({
        type: 'blank',
        q: `<code>fn main() { println!("코드공방"); }</code>을 실행하면 화면에 무엇이 출력될까요? (그대로 입력)`,
        prefix: '', suffix: '', accept: ['코드공방'], placeholder: '출력 결과',
        why: 'println!은 괄호 안 문자열을 그대로 출력하고 줄바꿈을 추가해요.',
        hint: '따옴표 안의 글자를 그대로 출력해요.'
      })
    },
    {
      id: 'variablesAndMutability',
      title: '변수와 mut',
      ready: true,
      summary: 'Rust 변수는 기본적으로 불변(immutable)이고, mut을 붙여야 바꿀 수 있어요.',
      goals: ['let으로 변수 선언', '기본은 불변, mut으로 가변 만들기', '상수 const와의 차이'],
      blocks: [
        {
          h: 'let: 기본은 불변(immutable)',
          html: `<p>Rust에서 <code>let</code>으로 만든 변수는 기본적으로 값을 다시 바꿀 수 없어요. 값을 바꾸려고 하면 컴파일 오류가 나요.</p>`,
          code: {
            label: 'immutable.rs',
            lang: 'rust',
            src: `fn main() {
    let age = 17;
    println!("나이: {}", age);
    // age = 18; // 오류! age는 불변이에요
}`,
            out: `나이: 17`
          }
        },
        {
          h: 'mut: 값을 바꿀 수 있게 만들기',
          html: `<p><code>let mut</code>으로 선언하면 나중에 값을 다시 대입할 수 있어요. 값이 바뀔 변수라면 반드시 <code>mut</code>을 붙여야 해요.</p>`,
          code: {
            label: 'mutable.rs',
            lang: 'rust',
            src: `fn main() {
    let mut age = 17;
    age = 18;
    println!("나이: {}", age);
}`,
            out: `나이: 18`
          },
          after: `<div class="note"><b>정리</b> — Rust가 기본을 불변으로 정한 이유는, 값이 예상치 못하게 바뀌는 버그를 컴파일 단계에서 미리 막기 위해서예요. 정말 바뀌어야 하는 값에만 <code>mut</code>을 붙이세요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'Rust에서 <code>let</code>으로 선언한 변수의 기본 특성은?',
          '불변(값을 다시 바꿀 수 없음)', ['가변(항상 바꿀 수 있음)', '전역 변수가 됨', '타입이 없음'],
          'Rust의 let 변수는 기본적으로 불변이라서, mut 없이는 값을 다시 대입할 수 없어요.',
          '다른 언어와 달리 Rust는 "안 바뀌는 것"이 기본이에요.'
        ),
        () => ({
          type: 'blank',
          q: `변수 <code>age</code>의 값을 나중에 바꿀 수 있게 하려면 <code>let</code> 뒤에 어떤 키워드를 붙여야 하나요?`,
          prefix: 'let ', suffix: ' age = 17;', accept: ['mut'], placeholder: '키워드',
          why: '<code>let mut age = 17;</code>처럼 mut을 붙여야 이후 age = 18; 같은 재대입이 가능해요.',
          hint: '"바뀔 수 있다(mutable)"의 줄임말이에요.'
        }),
        () => {
          const start = randInt(10, 20);
          const changed = randInt(21, 30);
          return {
            type: 'blank',
            q: `<code>let mut age = ${start}; age = ${changed}; println!("{}", age);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(changed)], placeholder: '숫자',
            why: `mut으로 선언했으므로 age는 ${changed}로 재대입된 뒤 출력돼요.`,
            hint: '마지막으로 대입된 값이 출력돼요.'
          };
        },
        () => makeChoice(
          '<code>let age = 17; age = 18;</code>를 컴파일하면 어떻게 되나요?',
          '컴파일 오류(불변 변수를 재대입할 수 없음)', ['정상 실행되고 18이 출력됨', '경고만 뜨고 정상 실행됨', '자동으로 mut이 추가됨'],
          'mut 없이 선언한 변수는 불변이라서 재대입 시 컴파일 오류가 나요.',
          'Rust 컴파일러는 불변 규칙을 엄격히 지켜요.'
        ),
        () => ({
          type: 'code',
          q: '<code>mut</code>으로 <code>count</code>를 0으로 선언하고, 1을 대입한 뒤 <code>println!</code>으로 출력하는 코드를 세 줄로 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'let mut count = 0;\ncount = 1;\nprintln!("{}", count);',
          accept: ['let mut count = 0;\ncount = 1;\nprintln!("{}", count);'],
          why: 'let mut으로 가변 변수를 만들고 재대입한 뒤 출력해요.',
          hint: 'let mut count = 0; 다음 count = 1; 그다음 println!("{}", count);'
        }),
      ],
      boss: () => {
        const start = randInt(1, 10);
        const added = randInt(1, 10);
        return {
          type: 'blank',
          q: `<code>let mut total = ${start}; total = total + ${added}; println!("{}", total);</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(start + added)], placeholder: '숫자',
          why: `total은 ${start}에서 ${added}만큼 늘어난 ${start + added}로 재대입돼요.`,
          hint: 'mut 변수는 자기 자신을 이용해 재대입할 수 있어요.'
        };
      }
    },
    {
      id: 'basicTypes',
      title: '기본 자료형',
      ready: true,
      summary: 'Rust의 정수, 실수, 불리언, 문자 타입을 배워요.',
      goals: ['정수 타입(i32, u32 등)', '실수 타입 f64', 'bool과 char'],
      blocks: [
        {
          h: '정수와 실수',
          html: `<p>Rust는 타입이 명확한 언어예요. 정수는 <code>i32</code>(부호 있음), <code>u32</code>(부호 없음, 0 이상)처럼 크기와 부호를 이름에 담고 있고, 실수는 보통 <code>f64</code>를 써요.</p>`,
          code: {
            label: 'numbers.rs',
            lang: 'rust',
            src: `fn main() {
    let age: i32 = 17;
    let count: u32 = 5;
    let pi: f64 = 3.14;
    println!("{} {} {}", age, count, pi);
}`,
            out: `17 5 3.14`
          }
        },
        {
          h: 'bool과 char',
          html: `<p><code>bool</code>은 <code>true</code>/<code>false</code>만 가지고, <code>char</code>은 작은따옴표로 감싼 문자 하나(유니코드 한 글자)를 나타내요.</p>`,
          code: {
            label: 'bool_char.rs',
            lang: 'rust',
            src: `fn main() {
    let is_adult: bool = false;
    let grade: char = 'A';
    println!("{} {}", is_adult, grade);
}`,
            out: `false A`
          },
          after: `<div class="note"><b>정리</b> — 타입을 안 적으면 Rust가 문맥으로 추론해줘요(정수는 기본 <code>i32</code>, 실수는 기본 <code>f64</code>). 하지만 함수 인자·반환 타입은 항상 명시해야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '음수를 담을 수 없는(0 이상만 가능한) 정수 타입은?',
          'u32', ['i32', 'f64', 'bool'],
          '<code>u</code>는 unsigned(부호 없음)를 뜻해서 0 이상의 값만 담을 수 있어요.',
          'u는 "unsigned"의 약자예요.'
        ),
        () => ({
          type: 'blank',
          q: `소수점이 있는 값(예: 3.14)을 담는 Rust의 기본 실수 타입을 쓰세요.`,
          prefix: 'let pi: ', suffix: ' = 3.14;', accept: ['f64'], placeholder: '타입 이름',
          why: '<code>f64</code>는 64비트 부동소수점 타입으로, Rust의 기본 실수 타입이에요.',
          hint: 'float의 f, 뒤에 비트 수가 붙어요.'
        }),
        () => makeChoice(
          '문자 하나를 담는 Rust 타입과 그 리터럴 표기법은?',
          "char, 작은따옴표('A')", ['char, 큰따옴표("A")', 'string, 작은따옴표', 'byte, 큰따옴표'],
          '<code>char</code>은 항상 작은따옴표로 감싸서 씁니다. 큰따옴표는 문자열(&str/String)용이에요.',
          '작은따옴표 vs 큰따옴표를 헷갈리지 마세요.'
        ),
        () => {
          const a = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>let is_adult: bool = ${a >= 18 ? 'true' : 'false'};</code>일 때 <code>println!("{}", is_adult)</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [a >= 18 ? 'true' : 'false'], placeholder: '출력 결과',
            why: `bool 값은 true 또는 false 그대로 출력돼요.`,
            hint: '값 그대로 소문자로 출력돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>i32</code> 타입으로 <code>score</code>를 90으로 선언하고 출력하는 코드를 두 줄로 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'let score: i32 = 90;\nprintln!("{}", score);',
          accept: ['let score: i32 = 90;\nprintln!("{}", score);'],
          why: '타입을 명시해서 let score: i32 = 90;으로 선언하고 출력해요.',
          hint: 'let score: i32 = 90; 다음 println!("{}", score);'
        }),
      ],
      boss: () => {
        const height = (Math.round((randInt(150, 190) + Math.random()) * 10) / 10).toFixed(1);
        return {
          type: 'blank',
          q: `<code>let height: f64 = ${height}; println!("{}", height);</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [height], placeholder: '출력 결과',
          why: 'f64 값은 소수점을 포함해서 그대로 출력돼요.',
          hint: '입력한 실수 값 그대로 출력돼요.'
        };
      }
    },
    {
      id: 'printlnFormatting',
      title: 'println!과 서식 문자열',
      ready: true,
      summary: '{}와 {변수이름}으로 값을 문자열에 끼워 넣는 방법을 배워요.',
      goals: ['{}로 값 끼워넣기', '{변수이름}으로 직접 참조하기', 'format!으로 문자열 만들기'],
      blocks: [
        {
          h: '{}: 순서대로 값 채우기',
          html: `<p><code>println!</code>의 첫 인자는 서식 문자열이에요. <code>{}</code> 자리마다 뒤에 오는 값들이 순서대로 채워져요.</p>`,
          code: {
            label: 'format_basic.rs',
            lang: 'rust',
            src: `fn main() {
    let name = "지수";
    let age = 17;
    println!("{}는 {}살이에요", name, age);
}`,
            out: `지수는 17살이에요`
          }
        },
        {
          h: '{변수이름}: 이름으로 바로 끼워넣기',
          html: `<p>변수 이름을 <code>{}</code> 안에 직접 써도 돼요. 이러면 순서를 신경 쓰지 않아도 되고 읽기도 더 편해요.</p>`,
          code: {
            label: 'format_named.rs',
            lang: 'rust',
            src: `fn main() {
    let name = "지수";
    let age = 17;
    println!("{name}는 {age}살이에요");
}`,
            out: `지수는 17살이에요`
          },
          after: `<div class="note"><b>정리</b> — <code>format!</code>은 println!과 서식이 똑같지만 출력하지 않고 <code>String</code>을 돌려줘요. 나중에 쓸 문자열을 미리 만들어둘 때 유용해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          const score = randInt(60, 100);
          return {
            type: 'blank',
            q: `<code>println!("{}: {}점", "${name}", ${score})</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${name}: ${score}점`], placeholder: '출력 결과',
            why: `{} 자리에 순서대로 "${name}"과 ${score}가 채워져요.`,
            hint: '{}는 뒤의 인자들을 순서대로 채워요.'
          };
        },
        () => makeChoice(
          '<code>println!("{name}")</code>처럼 변수 이름을 중괄호 안에 직접 쓰는 방식의 장점은?',
          '값을 뒤에 따로 나열하지 않아도 되어 읽기 편하다', ['더 빠르게 실행된다', '타입 검사를 건너뛴다', '여러 줄을 한 번에 출력한다'],
          '{변수이름} 방식은 순서를 맞출 필요 없이 바로 값을 끼워 넣을 수 있어요.',
          '가독성 측면의 장점이에요.'
        ),
        () => ({
          type: 'blank',
          q: `출력하지 않고 서식이 적용된 <code>String</code> 값만 돌려주는 매크로 이름을 쓰세요. (느낌표 포함)`,
          prefix: 'let s = ', suffix: '("{}", 3);', accept: ['format!'], placeholder: '매크로 이름',
          why: '<code>format!</code>은 println!과 서식은 같지만, 화면에 출력하는 대신 String을 반환해요.',
          hint: 'println!과 이름이 비슷해요.'
        }),
        () => makeChoice(
          '<code>println!("{}", age)</code>에서 <code>{}</code>가 하는 역할은?',
          '뒤에 오는 값을 그 위치에 끼워 넣는 자리표시자', ['주석을 표시', '변수를 선언', '함수를 호출'],
          '{}는 값이 채워질 자리를 나타내는 자리표시자(placeholder)예요.',
          '중괄호는 "여기에 값이 들어갑니다"라는 뜻이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>city</code>라는 변수에 <code>"서울"</code>을 담고, <code>{city}</code> 문법으로 <code>"도시: 서울"</code>이 출력되도록 두 줄을 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'let city = "서울";\nprintln!("도시: {city}");',
          accept: ['let city = "서울";\nprintln!("도시: {city}");'],
          why: '{city}는 변수 city의 값을 그 자리에 바로 끼워 넣어요.',
          hint: 'let city = "서울"; 다음 println!("도시: {city}");'
        }),
      ],
      boss: () => {
        const a = randInt(1, 9);
        const b = randInt(1, 9);
        return {
          type: 'blank',
          q: `<code>let a = ${a}; let b = ${b}; println!("{a} + {b} = {}", a + b);</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`${a} + ${b} = ${a + b}`], placeholder: '출력 결과',
          why: `{a}, {b}는 각각 변수를 참조하고, 마지막 {}는 a + b의 계산 결과인 ${a + b}로 채워져요.`,
          hint: '이름 있는 자리와 순서 기반 자리를 함께 쓸 수 있어요.'
        };
      }
    },
    {
      id: 'arithmeticOperators',
      title: '연산자와 계산',
      ready: true,
      summary: '사칙연산, 나머지 연산, 비교·논리 연산자를 배워요.',
      goals: ['사칙연산과 나머지(%)', '비교 연산자(==, !=, <, >)', '논리 연산자(&&, ||, !)'],
      blocks: [
        {
          h: '사칙연산과 나머지',
          html: `<p>Rust의 연산자는 다른 언어와 비슷해요. 다만 정수끼리 나누면 소수점이 버려지는 정수 나눗셈이 된다는 점을 조심해야 해요.</p>`,
          code: {
            label: 'arithmetic.rs',
            lang: 'rust',
            src: `fn main() {
    let a = 7;
    let b = 2;
    println!("{} {} {} {}", a + b, a - b, a * b, a / b);
    println!("나머지: {}", a % b);
}`,
            out: `9 5 14 3\n나머지: 1`
          }
        },
        {
          h: '비교와 논리 연산자',
          html: `<p>비교 연산자는 <code>bool</code>을 돌려주고, 논리 연산자 <code>&&</code>(그리고), <code>||</code>(또는), <code>!</code>(부정)로 여러 조건을 합칠 수 있어요.</p>`,
          code: {
            label: 'compare.rs',
            lang: 'rust',
            src: `fn main() {
    let age = 17;
    let has_ticket = true;
    println!("{}", age >= 18 && has_ticket);
    println!("{}", age >= 18 || has_ticket);
}`,
            out: `false\ntrue`
          },
          after: `<div class="note"><b>정리</b> — 정수 나눗셈(<code>7 / 2</code>)은 소수점 없이 <code>3</code>이 돼요. 소수점 결과가 필요하면 <code>f64</code> 타입으로 계산해야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(10, 20);
          const b = randInt(2, 5);
          return {
            type: 'blank',
            q: `<code>let a = ${a}; let b = ${b}; println!("{}", a / b);</code>를 실행하면? (정수 나눗셈, 숫자만)`,
            prefix: '', suffix: '', accept: [String(Math.trunc(a / b))], placeholder: '숫자',
            why: `정수끼리 나누면 소수점이 버려져서 ${Math.trunc(a / b)}이 돼요.`,
            hint: '정수 나눗셈은 소수점 아래를 버려요.'
          };
        },
        () => {
          const a = randInt(10, 20);
          const b = randInt(2, 5);
          return {
            type: 'blank',
            q: `<code>let a = ${a}; let b = ${b}; println!("{}", a % b);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a % b)], placeholder: '숫자',
            why: `%는 나머지를 구하는 연산자로, ${a} % ${b}는 ${a % b}예요.`,
            hint: '나눈 뒤 남는 값이에요.'
          };
        },
        () => makeChoice(
          '두 조건이 모두 참일 때만 참이 되는 연산자는?',
          '&&', ['||', '!', '=='],
          '<code>&&</code>는 논리 AND로, 양쪽 다 참이어야 결과가 참이에요.',
          '"그리고"에 해당하는 기호예요.'
        ),
        () => {
          const age = randInt(14, 22);
          const ticket = pick([true, false]);
          const result = age >= 18 || ticket;
          return {
            type: 'blank',
            q: `<code>let age = ${age}; let ticket = ${ticket}; println!("{}", age >= 18 || ticket);</code>를 실행하면? (true/false)`,
            prefix: '', suffix: '', accept: [String(result)], placeholder: 'true 또는 false',
            why: `||는 둘 중 하나만 참이어도 참이 돼요. age >= 18은 ${age >= 18}, ticket은 ${ticket}이므로 결과는 ${result}예요.`,
            hint: '||는 "또는"이에요. 하나만 참이어도 전체가 참이 돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>a</code>를 10, <code>b</code>를 3으로 선언하고, <code>a % b</code>(나머지)를 출력하는 코드를 세 줄로 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'let a = 10;\nlet b = 3;\nprintln!("{}", a % b);',
          accept: ['let a = 10;\nlet b = 3;\nprintln!("{}", a % b);'],
          why: '10 % 3은 1이며, 나머지 연산자 %를 그대로 출력해요.',
          hint: 'let a = 10; let b = 3; println!("{}", a % b);'
        }),
      ],
      boss: () => {
        const a = randInt(5, 15);
        const b = randInt(2, 4);
        return {
          type: 'blank',
          q: `<code>let a = ${a}; let b = ${b}; println!("{}", a * b - a % b);</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(a * b - (a % b))], placeholder: '숫자',
          why: `곱셈과 나머지 연산이 뺄셈보다 먼저 계산되어 ${a} * ${b} - ${a} % ${b} = ${a * b - (a % b)}예요.`,
          hint: '곱셈/나머지가 뺄셈보다 우선순위가 높아요.'
        };
      }
    },
    {
      id: 'ifElseExpression',
      title: 'if/else는 표현식이에요',
      ready: true,
      summary: 'Rust의 if/else는 값을 돌려주는 표현식이라서, let에 바로 대입할 수 있어요.',
      goals: ['조건에 괄호 없이 if 쓰기', 'if/else if/else 여러 분기', 'if를 표현식으로 사용하기'],
      blocks: [
        {
          h: 'if는 괄호가 필요 없어요',
          html: `<p>Rust의 <code>if</code>는 조건에 괄호를 쓰지 않아요. 다만 중괄호(<code>{ }</code>)는 한 줄이어도 항상 필수예요.</p>`,
          code: {
            label: 'if_basic.rs',
            lang: 'rust',
            src: `fn main() {
    let age = 17;
    if age >= 18 {
        println!("성인");
    } else {
        println!("미성년자");
    }
}`,
            out: `미성년자`
          }
        },
        {
          h: 'if는 값을 돌려주는 표현식',
          html: `<p>Rust에서 <code>if</code>는 문(statement)이 아니라 <b>표현식(expression)</b>이라서, 각 분기의 마지막 값이 전체 if의 값이 돼요. 그래서 <code>let</code>에 바로 대입할 수 있어요.</p>`,
          code: {
            label: 'if_expr.rs',
            lang: 'rust',
            src: `fn main() {
    let age = 17;
    let category = if age >= 18 { "성인" } else { "미성년자" };
    println!("{}", category);
}`,
            out: `미성년자`
          },
          after: `<div class="note"><b>정리</b> — if를 표현식으로 쓸 때는 <b>양쪽 분기의 타입이 같아야</b> 해요("성인"과 "미성년자" 둘 다 &str). 타입이 다르면 컴파일 오류가 나요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const age = randInt(14, 22);
          const isAdult = age >= 18;
          return {
            type: 'blank',
            q: `<code>let age = ${age}; let category = if age >= 18 { "성인" } else { "미성년자" }; println!("{}", category);</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [isAdult ? '성인' : '미성년자'], placeholder: '출력 결과',
            why: `${age}는 18 ${isAdult ? '이상이므로' : '미만이므로'} "${isAdult ? '성인' : '미성년자'}"가 category에 담겨요.`,
            hint: 'if 표현식은 조건이 참인 분기의 마지막 값을 돌려줘요.'
          };
        },
        () => makeChoice(
          'Rust에서 if를 다른 언어와 다르게 만드는 특징은?',
          '값을 돌려주는 표현식이라서 let에 바로 대입할 수 있다', ['조건에 반드시 괄호를 써야 한다', '중괄호를 생략할 수 있다', 'else 없이는 쓸 수 없다'],
          'Rust의 if는 표현식이라서 각 분기의 마지막 값이 전체 값이 되고, let에 바로 대입할 수 있어요.',
          '다른 언어의 삼항 연산자(? :)와 비슷한 역할을 해요.'
        ),
        () => ({
          type: 'blank',
          q: `if를 표현식으로 써서 두 분기의 값을 만들 때, 두 분기의 ___가 서로 같아야 컴파일이 돼요. (빈칸에 알맞은 한 단어)`,
          prefix: '두 분기의 ', suffix: '가 같아야 해요', accept: ['타입'], placeholder: '한 단어',
          why: 'if 표현식의 두 분기는 반드시 같은 타입의 값을 돌려줘야 컴파일 오류가 나지 않아요.',
          hint: '같은 종류의 값이어야 한다는 뜻이에요.'
        }),
        () => makeChoice(
          '<code>if age >= 18 { "성인" } else { "미성년자" }</code>에서 <code>{ }</code> 생략 가능 여부는?',
          '한 줄이어도 항상 필수', ['한 줄이면 생략 가능', '조건이 참일 때만 필수', 'else에서만 필수'],
          'Rust는 코드 블록이 한 줄이어도 중괄호를 반드시 써야 해요.',
          'Python처럼 들여쓰기만으로 블록을 구분하지 않아요.'
        ),
        () => ({
          type: 'code',
          q: '<code>score</code>를 75로 선언하고, <code>if score >= 60</code>이면 "합격", 아니면 "불합격"을 <code>result</code>에 담는 if 표현식을 작성한 뒤 출력하세요.',
          starter: '',
          rows: 3,
          placeholder: 'let score = 75;\nlet result = if score >= 60 { "합격" } else { "불합격" };\nprintln!("{}", result);',
          accept: ['let score = 75;\nlet result = if score >= 60 { "합격" } else { "불합격" };\nprintln!("{}", result);'],
          why: 'if를 표현식으로 써서 조건에 따른 값을 바로 result에 대입해요.',
          hint: 'let result = if 조건 { 값1 } else { 값2 }; 형태예요.'
        }),
      ],
      boss: () => {
        const score = randInt(0, 100);
        const result = score >= 60 ? '합격' : '불합격';
        return {
          type: 'blank',
          q: `<code>let score = ${score}; let result = if score >= 60 { "합격" } else { "불합격" }; println!("{}", result);</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [result], placeholder: '출력 결과',
          why: `score(${score})가 60 ${score >= 60 ? '이상이므로' : '미만이므로'} "${result}"가 result에 담겨요.`,
          hint: 'if 표현식의 값이 그대로 result 변수에 저장돼요.'
        };
      }
    },
    {
      id: 'loopsWhileFor',
      title: '반복문: loop, while, for',
      ready: true,
      summary: 'Rust의 세 가지 반복문과 범위(range)를 이용한 for 반복을 배워요.',
      goals: ['조건 기반 while', '무한 반복 loop와 break', '범위로 반복하는 for'],
      blocks: [
        {
          h: 'while: 조건이 참인 동안 반복',
          html: `<p><code>while</code>은 조건이 참인 동안 계속 반복해요. 조건에 괄호는 필요 없어요.</p>`,
          code: {
            label: 'while_basic.rs',
            lang: 'rust',
            src: `fn main() {
    let mut count = 0;
    while count < 3 {
        println!("{}", count);
        count += 1;
    }
}`,
            out: `0\n1\n2`
          }
        },
        {
          h: 'loop와 break',
          html: `<p><code>loop</code>는 무한 반복이에요. <code>break</code>로 빠져나오고, <code>break 값</code>으로 loop 자체의 결과값을 돌려줄 수도 있어요.</p>`,
          code: {
            label: 'loop_break.rs',
            lang: 'rust',
            src: `fn main() {
    let mut count = 0;
    let result = loop {
        count += 1;
        if count == 5 {
            break count * 2;
        }
    };
    println!("{}", result);
}`,
            out: `10`
          }
        },
        {
          h: 'for와 범위(range)',
          html: `<p><code>for</code>는 <code>0..5</code>(0부터 4까지) 같은 범위나 컬렉션을 순회할 때 가장 많이 써요. <code>0..=5</code>처럼 <code>=</code>를 붙이면 끝 값도 포함해요.</p>`,
          code: {
            label: 'for_range.rs',
            lang: 'rust',
            src: `fn main() {
    for i in 0..3 {
        println!("{}", i);
    }
    for i in 1..=3 {
        println!("포함: {}", i);
    }
}`,
            out: `0\n1\n2\n포함: 1\n포함: 2\n포함: 3`
          },
          after: `<div class="note"><b>정리</b> — <code>0..5</code>는 5를 포함하지 않고(exclusive), <code>0..=5</code>는 5를 포함해요(inclusive). Rust는 while/for로 충분해서 Go처럼 반복문이 하나로 통일되어 있지는 않지만, for가 가장 흔하게 쓰여요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(3, 6);
          return {
            type: 'blank',
            q: `<code>let mut count = 0; while count < ${n} { count += 1; } println!("{}", count);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `count가 ${n}이 될 때까지 반복해서 늘어나므로, 반복이 끝나면 count는 ${n}이에요.`,
            hint: 'while은 조건이 거짓이 될 때까지 반복해요.'
          };
        },
        () => makeChoice(
          '<code>loop { ... break 값; ... }</code>에서 break 뒤에 값을 쓰면 어떻게 되나요?',
          'loop 표현식 전체의 결과값이 된다', ['프로그램이 즉시 종료된다', '아무 의미 없는 문법 오류다', '다음 반복으로 넘어간다'],
          '<code>break 값</code>은 loop를 끝내면서 그 값을 loop 표현식 전체의 결과로 돌려줘요.',
          'loop도 if처럼 값을 돌려주는 표현식이 될 수 있어요.'
        ),
        () => {
          const start = randInt(0, 2);
          const end = randInt(3, 6);
          let sum = 0;
          for (let i = start; i < end; i++) sum += i;
          return {
            type: 'blank',
            q: `<code>let mut total = 0; for i in ${start}..${end} { total += i; } println!("{}", total);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
            why: `${start}..${end}는 ${start}부터 ${end - 1}까지를 순회하므로 합은 ${sum}이에요.`,
            hint: '..는 끝 값을 포함하지 않아요.'
          };
        },
        () => makeChoice(
          '<code>1..=5</code>와 <code>1..5</code>의 차이는?',
          '<code>1..=5</code>는 5를 포함하고, <code>1..5</code>는 포함하지 않는다', ['둘 다 동일하다', '<code>1..=5</code>가 더 빠르게 실행된다', '<code>1..5</code>만 정수에 쓸 수 있다'],
          '<code>=</code>이 붙으면 끝 값을 포함하는 범위(inclusive range)가 돼요.',
          '=이 있으면 "이상 포함"이라고 기억하세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>0</code>부터 <code>2</code>까지(포함) 숫자를 출력하는 <code>for</code> 반복문을 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'for i in 0..=2 {\n    println!("{}", i);\n}',
          accept: ['for i in 0..=2 {\n    println!("{}", i);\n}'],
          why: '0..=2는 0, 1, 2를 모두 포함하는 범위예요.',
          hint: 'for i in 0..=2 { println!("{}", i); }'
        }),
      ],
      boss: () => {
        const n = randInt(3, 6);
        return {
          type: 'blank',
          q: `<code>let result = loop { let mut c = 0; loop { c += 1; if c == ${n} { break c * c; } }; break c * c; };</code>처럼 안쪽 loop가 <code>c == ${n}</code>일 때 <code>break c * c</code>로 빠져나오면, break되는 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(n * n)], placeholder: '숫자',
          why: `c가 ${n}이 되는 순간 break되며 그 값의 제곱인 ${n * n}이 loop의 결과가 돼요.`,
          hint: 'break 뒤의 값이 loop 표현식 전체의 결과예요.'
        };
      }
    },
    {
      id: 'functionsBasics',
      title: '함수와 매개변수',
      ready: true,
      summary: 'fn으로 함수를 정의하고, 매개변수·반환 타입·함수 포인터를 배워요.',
      goals: ['fn으로 함수 정의하기', '매개변수와 반환 타입 명시', '함수를 값처럼 다루기(함수 포인터)'],
      blocks: [
        {
          h: 'fn: 함수 정의하기',
          html: `<p>함수는 <code>fn 이름(매개변수: 타입) -> 반환타입 { }</code> 형태로 정의해요. 매개변수와 반환 타입은 반드시 명시해야 해요.</p>`,
          code: {
            label: 'functions.rs',
            lang: 'rust',
            src: `fn add(a: i32, b: i32) -> i32 {
    a + b
}

fn main() {
    let result = add(3, 4);
    println!("{}", result);
}`,
            out: `7`
          }
        },
        {
          h: '마지막 줄이 반환값(return 생략 가능)',
          html: `<p>함수의 마지막 줄에 세미콜론 없이 값만 쓰면 그 값이 자동으로 반환돼요. <code>return</code>은 함수 중간에서 일찍 빠져나올 때 주로 써요.</p>`,
          code: {
            label: 'return_early.rs',
            lang: 'rust',
            src: `fn classify(age: i32) -> &'static str {
    if age < 0 {
        return "잘못된 나이";
    }
    if age >= 18 { "성인" } else { "미성년자" }
}

fn main() {
    println!("{}", classify(17));
}`,
            out: `미성년자`
          },
          after: `<div class="note"><b>정리</b> — 함수 이름을 값처럼 변수에 담아 넘길 수도 있어요(함수 포인터). 예: <code>let f: fn(i32, i32) -> i32 = add;</code>처럼 타입 <code>fn(...) -> ...</code>으로 함수를 가리킬 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 20);
          const b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>fn add(a: i32, b: i32) -> i32 { a + b }</code>일 때 <code>add(${a}, ${b})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `함수 마지막 줄 a + b가 세미콜론 없이 쓰였으므로 그 값이 반환돼요. ${a} + ${b} = ${a + b}.`,
            hint: '세미콜론 없는 마지막 줄이 반환값이에요.'
          };
        },
        () => makeChoice(
          'Rust 함수에서 마지막 줄에 세미콜론 없이 값만 쓰면?',
          '그 값이 자동으로 함수의 반환값이 된다', ['컴파일 오류가 난다', '무시되고 아무것도 반환되지 않는다', '경고만 뜨고 0이 반환된다'],
          '세미콜론이 없는 마지막 표현식은 자동으로 그 함수의 반환값이 돼요.',
          '세미콜론을 붙이면 그 줄은 "문장"이 되어 값이 사라져요.'
        ),
        () => ({
          type: 'blank',
          q: `함수를 정의하는 키워드를 쓰세요.`,
          prefix: '', suffix: ' add(a: i32, b: i32) -> i32 { a + b }', accept: ['fn'], placeholder: '키워드',
          why: '<code>fn</code>은 function의 줄임말로, 함수를 정의하는 키워드예요.',
          hint: '3글자 키워드예요.'
        }),
        () => makeChoice(
          '함수 중간에서 값을 즉시 돌려주고 함수를 끝낼 때 쓰는 키워드는?',
          'return', ['break', 'exit', 'end'],
          '<code>return</code>은 함수 어디서든 즉시 값을 반환하고 함수 실행을 끝낼 수 있어요.',
          '다른 언어에서도 자주 보는 키워드예요.'
        ),
        () => ({
          type: 'code',
          q: '두 정수 <code>a</code>, <code>b</code>를 받아 곱을 반환하는 함수 <code>multiply</code>를 작성하세요. (return 없이, 마지막 줄로 반환)',
          starter: '',
          rows: 3,
          placeholder: 'fn multiply(a: i32, b: i32) -> i32 {\n    a * b\n}',
          accept: ['fn multiply(a: i32, b: i32) -> i32 {\n    a * b\n}'],
          why: '마지막 줄 a * b에 세미콜론을 붙이지 않으면 그 값이 반환돼요.',
          hint: 'fn multiply(a: i32, b: i32) -> i32 { a * b }'
        }),
      ],
      boss: () => {
        const age = randInt(-5, 25);
        const result = age < 0 ? '잘못된 나이' : (age >= 18 ? '성인' : '미성년자');
        return {
          type: 'blank',
          q: `<code>fn classify(age: i32) -> &'static str { if age < 0 { return "잘못된 나이"; } if age >= 18 { "성인" } else { "미성년자" } }</code>일 때 <code>classify(${age})</code>의 결과는? (그대로 입력)`,
          prefix: '', suffix: '', accept: [result], placeholder: '출력 결과',
          why: `age(${age})의 값에 따라 조건을 차례로 확인해서 "${result}"가 반환돼요.`,
          hint: '음수인지, 18 이상인지 순서대로 확인해보세요.'
        };
      }
    },
    {
      id: 'expressionsVsStatements',
      title: '표현식과 문장의 차이',
      ready: true,
      summary: '세미콜론 하나가 값의 유무를 결정하는 Rust만의 규칙을 이해해요.',
      goals: ['문장(statement)과 표현식(expression) 구분', '세미콜론의 역할', '블록 { }도 표현식이 될 수 있음'],
      blocks: [
        {
          h: '문장 vs 표현식',
          html: `<p><b>문장</b>(statement)은 어떤 동작을 수행하지만 값을 돌려주지 않아요(<code>let x = 5;</code>). <b>표현식</b>(expression)은 평가되어 값을 만들어요(<code>5 + 3</code>). Rust에서는 세미콜론을 붙이면 표현식이 문장이 되어 값이 사라져요.</p>`,
          code: {
            label: 'stmt_vs_expr.rs',
            lang: 'rust',
            src: `fn main() {
    let y = {
        let x = 3;
        x + 1 // 세미콜론 없음 → 이 블록의 값이 됨
    };
    println!("{}", y);
}`,
            out: `4`
          }
        },
        {
          h: '세미콜론을 잘못 붙이면?',
          html: `<p>마지막 줄에 세미콜론을 붙이면 그 줄은 값이 없는 문장이 돼요. 함수가 값을 반환해야 하는데 세미콜론을 붙이면 <code>()</code>(유닛 타입, "아무 값도 없음")이 반환되어 타입 오류가 나요.</p>`,
          code: {
            label: 'semicolon_trap.rs',
            lang: 'rust',
            src: `fn add(a: i32, b: i32) -> i32 {
    a + b; // 세미콜론 때문에 문장이 되어버림 → 컴파일 오류!
}`,
            out: `컴파일 오류: expected i32, found ()`
          },
          after: `<div class="note"><b>정리</b> — <code>{ }</code> 블록 자체도 표현식이 될 수 있어요. 블록의 마지막 줄에 세미콜론이 없으면 그 값이 블록 전체의 값이 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const x = randInt(1, 10);
          const add = randInt(1, 10);
          return {
            type: 'blank',
            q: `<code>let y = { let x = ${x}; x + ${add} }; println!("{}", y);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(x + add)], placeholder: '숫자',
            why: `블록의 마지막 줄 x + ${add}에 세미콜론이 없으므로 그 값이 블록 전체의 값(y)이 돼요.`,
            hint: '세미콜론이 없는 마지막 줄이 블록의 값이 돼요.'
          };
        },
        () => makeChoice(
          '<code>fn add(a: i32, b: i32) -> i32 { a + b; }</code>가 컴파일되지 않는 이유는?',
          '세미콜론 때문에 문장이 되어 아무 값도 반환하지 않기 때문', ['함수 이름이 잘못되어서', '매개변수 타입이 틀려서', 'return을 안 써서'],
          '세미콜론을 붙이면 a + b가 값 없는 문장이 되어, i32를 반환해야 하는 함수가 ()(유닛)을 반환하게 되어 오류가 나요.',
          '세미콜론 하나가 "값이 있음"과 "값이 없음"을 가르는 기준이에요.'
        ),
        () => ({
          type: 'blank',
          q: `값을 만들어내는 코드 조각(예: 5 + 3)을 부르는 이름을 영어로 쓰세요.`,
          prefix: '', suffix: '', accept: ['expression'], placeholder: '영어 단어',
          why: '값을 평가해서 만들어내는 코드 조각을 표현식(expression)이라고 해요.',
          hint: '"평가되다"라는 뜻의 영어 단어에서 왔어요.'
        }),
        () => makeChoice(
          'Rust에서 <code>{ }</code> 블록에 대한 설명으로 옳은 것은?',
          '블록도 표현식이 될 수 있어서 값을 가질 수 있다', ['블록은 항상 ()을 반환한다', '블록 안에서는 let을 쓸 수 없다', '블록은 함수 안에서만 쓸 수 있다'],
          '블록의 마지막 줄에 세미콜론이 없으면, 그 블록 자체가 그 값을 가지는 표현식이 돼요.',
          'if도 블록도 모두 표현식이 될 수 있다는 게 Rust의 특징이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>{ let a = 2; let b = 3; a * b }</code> 블록의 값을 <code>result</code>에 담고 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'let result = {\n    let a = 2;\n    let b = 3;\n    a * b\n};\nprintln!("{}", result);',
          accept: ['let result = {\n    let a = 2;\n    let b = 3;\n    a * b\n};\nprintln!("{}", result);'],
          why: '블록의 마지막 줄 a * b에 세미콜론이 없으므로 그 값이 result에 담겨요.',
          hint: 'let result = { ... 마지막 줄에 세미콜론 없이 값 ... };'
        }),
      ],
      boss: () => {
        const a = randInt(2, 5);
        const b = randInt(2, 5);
        return {
          type: 'blank',
          q: `<code>let y = { let a = ${a}; let b = ${b}; if a > b { a } else { b } }; println!("{}", y);</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(Math.max(a, b))], placeholder: '숫자',
          why: `블록 안의 if 표현식이 a와 b 중 더 큰 값을 돌려주고, 그 값이 블록 전체의 값(y)이 돼요. 더 큰 값은 ${Math.max(a, b)}예요.`,
          hint: 'if도 표현식이라 블록 안에서 값을 만들 수 있어요.'
        };
      }
    },
    {
      id: 'ownershipBasics',
      title: '소유권(Ownership)과 이동(Move)',
      ready: true,
      summary: 'Rust를 다른 언어와 구별 짓는 핵심 개념, 소유권과 이동을 배워요.',
      goals: ['값마다 소유자는 단 하나뿐', '소유권이 이동(move)되는 경우', '이동된 값을 다시 쓰면 컴파일 오류'],
      blocks: [
        {
          h: '소유권 규칙: 값은 한 번에 하나의 소유자만',
          html: `<p>Rust는 가비지 컬렉터 없이도 메모리를 안전하게 관리하기 위해 <b>소유권(ownership)</b>이라는 규칙을 둬요. 모든 값은 딱 하나의 변수가 "소유"하고, 그 소유자가 스코프를 벗어나면 값이 자동으로 정리(drop)돼요.</p>`,
          code: {
            label: 'ownership_scope.rs',
            lang: 'rust',
            src: `fn main() {
    let s = String::from("안녕");
    println!("{}", s);
} // 여기서 s의 스코프가 끝나고 메모리가 자동으로 정리됨`,
            out: `안녕`
          }
        },
        {
          h: '소유권 이동(move)',
          html: `<p><code>String</code>처럼 힙(heap)에 저장되는 값을 다른 변수에 대입하면, 값이 <b>복사</b>되는 게 아니라 <b>이동(move)</b>돼요. 이동 후에는 원래 변수를 더 이상 쓸 수 없어요.</p>`,
          code: {
            label: 'move_example.rs',
            lang: 'rust',
            src: `fn main() {
    let s1 = String::from("안녕");
    let s2 = s1; // s1의 소유권이 s2로 이동
    println!("{}", s2);
    // println!("{}", s1); // 오류! s1은 더 이상 유효하지 않음
}`,
            out: `안녕`
          },
          after: `<div class="note"><b>정리</b> — 왜 "복사"가 아니라 "이동"일까요? String은 힙 메모리를 가리키는 포인터를 담고 있는데, 두 변수가 같은 메모리를 동시에 "소유"하면 스코프가 끝날 때 두 번 해제되어(double free) 위험해요. Rust는 이걸 막으려고 이전 변수를 아예 무효로 만들어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'Rust에서 한 값을 동시에 소유할 수 있는 변수의 개수는?',
          '단 하나', ['최대 2개', '제한 없음', '함수마다 하나씩'],
          'Rust의 핵심 규칙: 어떤 값이든 한 시점에 소유자는 단 하나뿐이에요.',
          '이 규칙 덕분에 메모리를 이중으로 해제하는 버그가 원천 차단돼요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>let s1 = String::from("hi"); let s2 = s1; println!("{}", s1);</code>를 컴파일하면 어떤 결과가 나올까요? ("컴파일 오류"라고 쓰세요)`,
          prefix: '', suffix: '', accept: ['컴파일 오류'], placeholder: '결과',
          why: 's1의 소유권이 s2로 이동했기 때문에, 그 이후 s1을 쓰려고 하면 컴파일 오류가 나요.',
          hint: '이동된(moved) 변수는 더 이상 유효하지 않아요.'
        }),
        () => makeChoice(
          'String 값을 다른 변수에 대입할 때 "복사"가 아니라 "이동"으로 처리하는 이유는?',
          '두 변수가 같은 힙 메모리를 동시에 소유해 이중 해제되는 것을 막기 위해', ['속도를 더 빠르게 하려고', 'String은 원래 값이 없기 때문에', '컴파일러 버그를 피하려고'],
          '두 변수가 같은 메모리를 함께 가리키면 스코프가 끝날 때 같은 메모리를 두 번 해제하려고 시도해 위험해요. 그래서 Rust는 이전 변수를 무효화해요.',
          '이중 해제(double free)는 메모리 안전성의 대표적인 문제예요.'
        ),
        () => ({
          type: 'blank',
          q: `변수가 속한 코드 블록({ }) 밖으로 나가면 값이 자동으로 정리되는데, 이 범위를 영어로 뭐라고 부르나요?`,
          prefix: '', suffix: '', accept: ['scope'], placeholder: '영어 단어',
          why: '변수가 유효한 범위를 스코프(scope)라고 하며, 스코프를 벗어나면 값이 자동으로 drop돼요.',
          hint: '"범위"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>String::from("hi")</code>로 <code>s1</code>을 만들고, <code>s1</code>을 <code>s2</code>에 대입한 뒤 <code>s2</code>를 출력하는 코드를 작성하세요. (s1은 다시 쓰지 않음)',
          starter: '',
          rows: 3,
          placeholder: 'let s1 = String::from("hi");\nlet s2 = s1;\nprintln!("{}", s2);',
          accept: ['let s1 = String::from("hi");\nlet s2 = s1;\nprintln!("{}", s2);'],
          why: 's1의 소유권이 s2로 이동한 뒤에는 s2만 사용해야 해요.',
          hint: 'let s1 = String::from("hi"); let s2 = s1; println!("{}", s2);'
        }),
      ],
      boss: () => makeChoice(
        '다음 중 컴파일 오류가 나는 코드는?',
        'let s1 = String::from("a"); let s2 = s1; println!("{}", s1);',
        ['let a = 5; let b = a; println!("{}", a);', 'let s1 = String::from("a"); let s2 = s1.clone(); println!("{}", s1);', 'let s = String::from("a"); println!("{}", s);'],
        'String은 이동(move)되므로 s1을 s2에 대입한 뒤 s1을 다시 쓰면 오류가 나요. i32 같은 정수는 Copy 타입이라 a를 그대로 다시 쓸 수 있고, clone()은 값을 복제해서 s1이 그대로 유효해요.',
        '정수처럼 크기가 작고 스택에만 있는 타입은 이동이 아니라 복사(Copy)돼요.'
      )
    },
    {
      id: 'referencesAndBorrowing',
      title: '참조와 빌림(Borrowing)',
      ready: true,
      summary: '&로 값을 빌려서 소유권을 넘기지 않고도 함수에 값을 전달하는 방법을 배워요.',
      goals: ['&로 값을 빌리기(참조)', '&mut로 가변 참조 빌리기', '참조는 소유권을 가져가지 않음'],
      blocks: [
        {
          h: '& : 값을 "빌려서" 쓰기',
          html: `<p>함수에 값을 그대로 넘기면 소유권이 이동해버려요. <code>&</code>를 붙여 <b>참조(reference)</b>를 넘기면, 소유권은 그대로 두고 값을 잠깐 "빌려서" 읽기만 할 수 있어요.</p>`,
          code: {
            label: 'borrow_read.rs',
            lang: 'rust',
            src: `fn print_len(s: &String) {
    println!("길이: {}", s.len());
}

fn main() {
    let s = String::from("안녕하세요");
    print_len(&s);
    println!("여전히 사용 가능: {}", s);
}`,
            out: `길이: 15\n여전히 사용 가능: 안녕하세요`
          }
        },
        {
          h: '&mut : 값을 빌려서 바꾸기',
          html: `<p>빌린 값을 바꾸고 싶다면 <code>&mut</code>(가변 참조)을 써야 해요. 단, 같은 값에 대한 가변 참조는 <b>한 번에 딱 하나만</b> 존재할 수 있어요(동시에 여러 곳에서 바꾸면 위험하니까요).</p>`,
          code: {
            label: 'borrow_mut.rs',
            lang: 'rust',
            src: `fn add_exclaim(s: &mut String) {
    s.push_str("!");
}

fn main() {
    let mut s = String::from("안녕");
    add_exclaim(&mut s);
    println!("{}", s);
}`,
            out: `안녕!`
          },
          after: `<div class="note"><b>정리</b> — 소유권 이동 없이 값을 쓰고 싶을 때는 참조(&)를, 값을 읽기만 할 때는 <code>&T</code>를, 바꿔야 할 때는 <code>&mut T</code>를 써요. 이 규칙 덕분에 함수를 호출할 때마다 소유권 걱정을 할 필요가 없어져요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '함수에 값을 넘길 때 소유권을 가져가지 않고 "빌리기"만 하려면?',
          '& 를 붙여 참조로 넘긴다', ['그냥 값을 그대로 넘긴다', 'clone()을 호출한다', 'mut을 붙인다'],
          '<code>&</code>를 붙이면 소유권 이동 없이 값을 참조(빌림)만 할 수 있어요.',
          '참조 기호는 앰퍼샌드(&)예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>fn print_len(s: &String) { println!("{}", s.len()); } fn main() { let s = String::from("hi"); print_len(&s); println!("{}", s); }</code>를 실행하면, <code>print_len</code> 호출 뒤 <code>s</code>를 다시 쓸 수 있을까요? ("있다" 또는 "없다")`,
          prefix: '', suffix: '', accept: ['있다'], placeholder: '있다 / 없다',
          why: '참조(&s)로 넘겼기 때문에 소유권이 이동하지 않아, 함수 호출 후에도 s를 그대로 쓸 수 있어요.',
          hint: '참조는 소유권을 가져가지 않아요.'
        }),
        () => makeChoice(
          '값을 빌려서 바꾸고 싶을 때 쓰는 참조 문법은?',
          '&mut', ['&', 'mut&', 'ref mut'],
          '값을 바꾸려면 가변 참조 <code>&mut</code>를 써야 해요.',
          '읽기 전용 참조와 구분하려면 mut을 함께 써요.'
        ),
        () => makeChoice(
          '같은 값에 대한 가변 참조(&mut)를 동시에 몇 개까지 만들 수 있나요?',
          '한 번에 하나만', ['제한 없이 여러 개', '정확히 2개', '함수마다 하나씩, 최대 무제한'],
          'Rust는 같은 값에 대한 가변 참조를 한 번에 하나만 허용해서 데이터 경쟁(data race)을 막아요.',
          '동시에 두 곳에서 값을 바꾸면 예측 불가능한 상태가 될 수 있어요.'
        ),
        () => ({
          type: 'code',
          q: '<code>&mut String</code>을 매개변수로 받아 문자열 끝에 <code>"!"</code>를 붙이는 함수 <code>shout</code>를 작성하세요. (push_str 사용)',
          starter: '',
          rows: 3,
          placeholder: 'fn shout(s: &mut String) {\n    s.push_str("!");\n}',
          accept: ['fn shout(s: &mut String) {\n    s.push_str("!");\n}'],
          why: '&mut String으로 가변 참조를 받아 push_str로 문자열을 덧붙여요.',
          hint: 'fn shout(s: &mut String) { s.push_str("!"); }'
        }),
      ],
      boss: () => makeChoice(
        '다음 중 컴파일 오류가 나는 코드는?',
        'let s = String::from("a"); let r1 = &mut s; let r2 = &mut s; println!("{} {}", r1, r2);',
        ['let s = String::from("a"); let r1 = &s; let r2 = &s; println!("{} {}", r1, r2);', 'let mut s = String::from("a"); let r1 = &mut s; r1.push_str("b");', 'let s = String::from("a"); println!("{}", &s);'],
        '같은 값에 대한 가변 참조(&mut)는 동시에 하나만 허용되므로, r1과 r2를 동시에 만들면 오류가 나요. 읽기 전용 참조(&)는 여러 개 동시에 가능해요.',
        '가변 참조는 "동시에 하나만" 규칙을 기억하세요.'
      )
    },
    {
      id: 'borrowCheckerRules',
      title: '빌림 검사기(Borrow Checker)의 규칙',
      ready: true,
      summary: '컴파일 타임에 메모리 안전성을 보장하는 빌림 규칙 세 가지를 정리해요.',
      goals: ['가변 참조와 불변 참조는 동시에 안 됨', '불변 참조는 여러 개 가능', '댕글링 참조를 막는 원리'],
      blocks: [
        {
          h: '규칙 1: 가변 참조 vs 불변 참조',
          html: `<p>Rust의 빌림 규칙은 딱 하나로 요약돼요: <b>"여러 개의 읽기 전용 참조(&T)"</b> 또는 <b>"딱 하나의 가변 참조(&mut T)"</b> 중 하나만 동시에 가능해요. 둘을 섞을 수 없어요.</p>`,
          code: {
            label: 'borrow_conflict.rs',
            lang: 'rust',
            src: `fn main() {
    let mut s = String::from("안녕");
    let r1 = &s;
    let r2 = &s; // 불변 참조는 여러 개 OK
    println!("{} {}", r1, r2);
    let r3 = &mut s; // r1, r2를 더 안 쓰는 시점이라 OK
    r3.push_str("!");
    println!("{}", r3);
}`,
            out: `안녕 안녕\n안녕!`
          }
        },
        {
          h: '댕글링 참조(dangling reference)는 아예 만들 수 없어요',
          html: `<p>다른 언어에서는 이미 해제된 메모리를 가리키는 "댕글링 포인터" 버그가 흔하지만, Rust는 컴파일 타임에 참조의 유효 기간(lifetime)을 검사해서 이런 버그를 원천 차단해요.</p>`,
          code: {
            label: 'dangling_blocked.rs',
            lang: 'rust',
            src: `fn dangle() -> &String { // 오류!
    let s = String::from("안녕");
    &s // s는 함수가 끝나면 사라지는데, 그 참조를 반환하려 함
} // 여기서 s가 drop됨 → 반환된 참조는 유효하지 않은 메모리를 가리키게 됨`,
            out: `컴파일 오류: missing lifetime specifier`
          },
          after: `<div class="note"><b>정리</b> — 빌림 검사기는 "참조가 가리키는 값이 그 참조보다 오래 살아있는지"를 컴파일 타임에 검사해요. 이 검사를 통과하지 못하면 실행조차 되지 않으니, 런타임에 메모리 버그가 나타날 일이 없어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'Rust 빌림 규칙에 대한 설명으로 옳은 것은?',
          '읽기 전용 참조는 여러 개, 가변 참조는 동시에 하나만 가능하다', ['가변 참조도 여러 개 동시에 가능하다', '참조는 아예 만들 수 없다', '참조끼리는 규칙이 전혀 없다'],
          '여러 개의 &T 또는 단 하나의 &mut T, 이 둘 중 하나만 동시에 존재할 수 있어요.',
          '"여러 명이 읽거나, 한 명만 쓰거나" 라고 기억하세요.'
        ),
        () => ({
          type: 'blank',
          q: `함수가 끝나면 사라질 지역 변수의 참조를 반환하려고 하면 어떤 문제가 생기나요? ("유효하지 않은 메모리를 가리키게 된다"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['유효하지 않은 메모리를 가리키게 된다'], placeholder: '설명',
          why: '함수가 끝나면 지역 변수는 drop되므로, 그 참조는 이미 사라진 메모리를 가리키는 댕글링 참조가 돼요.',
          hint: '참조가 가리키는 대상이 먼저 사라지면 어떻게 될지 생각해보세요.'
        }),
        () => makeChoice(
          'Rust가 댕글링 참조 버그를 없애는 방법은?',
          '컴파일 타임에 참조의 유효 기간을 검사해서 미리 막는다', ['실행 중에 오류가 나면 자동으로 복구한다', '가비지 컬렉터가 실시간으로 감시한다', '참조를 아예 지원하지 않는다'],
          'Rust는 컴파일 타임에 빌림 검사기(borrow checker)로 참조의 유효성을 검사해서, 문제가 있으면 실행 전에 컴파일 오류로 알려줘요.',
          '런타임이 아니라 컴파일 타임에 잡아낸다는 게 핵심이에요.'
        ),
        () => makeChoice(
          '다음 중 문제 없이 컴파일되는 코드는?',
          'let s = String::from("a"); let r1 = &s; let r2 = &s; println!("{}{}", r1, r2);',
          ['let mut s = String::from("a"); let r1 = &s; let r2 = &mut s; println!("{}{}", r1, r2);', 'fn dangle() -> &String { let s = String::from("a"); &s }', 'let r; { let s = String::from("a"); r = &s; } println!("{}", r);'],
          '불변 참조(&s) 여러 개는 동시에 존재해도 안전하므로 문제 없어요. 나머지는 가변/불변 참조 충돌이거나 댕글링 참조예요.',
          '읽기 전용 참조끼리는 서로 방해하지 않아요.'
        ),
        () => ({
          type: 'code',
          q: '<code>String</code> <code>s</code>를 만들고, 불변 참조 <code>r1</code>, <code>r2</code> 두 개를 만들어 함께 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'let s = String::from("hi");\nlet r1 = &s;\nlet r2 = &s;\nprintln!("{} {}", r1, r2);',
          accept: ['let s = String::from("hi");\nlet r1 = &s;\nlet r2 = &s;\nprintln!("{} {}", r1, r2);'],
          why: '불변 참조는 여러 개 동시에 존재할 수 있어서 문제 없이 컴파일돼요.',
          hint: 'let r1 = &s; let r2 = &s;로 두 개의 불변 참조를 만들어보세요.'
        }),
      ],
      boss: () => makeChoice(
        '다음 중 borrow checker가 컴파일 오류로 막는 코드는?',
        'let mut s = String::from("a"); let r1 = &s; let r2 = &mut s; println!("{}", r1);',
        ['let mut s = String::from("a"); { let r1 = &mut s; r1.push_str("b"); } println!("{}", s);', 'let s1 = String::from("a"); let s2 = s1.clone(); println!("{} {}", s1, s2);', 'let s = String::from("a"); let r = &s; println!("{}", r);'],
        'r1(불변 참조)이 아직 살아있는 동안 r2(가변 참조)를 만드는 것은 규칙 위반이에요. 나머지는 참조의 생존 범위가 겹치지 않거나 clone으로 별도 값을 만들어서 안전해요.',
        '두 참조의 "살아있는 기간"이 겹치는지를 살펴보세요.'
      )
    },
    {
      id: 'slicesBasics',
      title: '슬라이스: &str과 배열 슬라이스',
      ready: true,
      summary: '컬렉션의 일부를 가리키는 슬라이스와, String/&str의 관계를 배워요.',
      goals: ['&str: 문자열 슬라이스', 'String vs &str 차이', '배열 슬라이스 &[T]'],
      blocks: [
        {
          h: '&str: 문자열의 일부를 가리키는 슬라이스',
          html: `<p><code>&str</code>(문자열 슬라이스)은 문자열 데이터의 일부(또는 전체)를 가리키는 참조예요. 문자열 리터럴 <code>"안녕"</code>은 사실 <code>&str</code> 타입이에요.</p>`,
          code: {
            label: 'str_slice.rs',
            lang: 'rust',
            src: `fn main() {
    let s = String::from("Hello Rust");
    let hello: &str = &s[0..5];
    let rust: &str = &s[6..10];
    println!("{} {}", hello, rust);
}`,
            out: `Hello Rust`
          }
        },
        {
          h: 'String vs &str',
          html: `<p><code>String</code>은 힙에 저장되고 크기가 변할 수 있는 "소유하는" 문자열이에요. <code>&str</code>은 어딘가(String이나 프로그램 코드 자체)를 "빌려서" 가리키는 참조예요. 함수 매개변수는 보통 <code>&str</code>을 받아 String과 리터럴을 모두 받을 수 있게 해요.</p>`,
          code: {
            label: 'string_vs_str.rs',
            lang: 'rust',
            src: `fn greet(name: &str) {
    println!("안녕, {}!", name);
}

fn main() {
    let owned = String::from("지수");
    greet(&owned);   // String도 &str로 빌려줄 수 있음
    greet("민준");    // 리터럴은 원래 &str
}`,
            out: `안녕, 지수!\n안녕, 민준!`
          },
          after: `<div class="note"><b>정리</b> — 배열도 <code>&[T]</code>(배열 슬라이스)로 일부를 빌릴 수 있어요. 예: <code>let arr = [1,2,3,4]; let part: &[i32] = &arr[1..3];</code>는 <code>[2, 3]</code>을 가리켜요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '문자열 리터럴 <code>"안녕"</code>의 타입은?',
          '&str', ['String', 'char', 'Vec<char>'],
          '문자열 리터럴은 프로그램에 고정으로 박혀있는 &str 타입이에요.',
          'String::from으로 만든 것만 String이고, 나머지는 대부분 &str이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>let s = String::from("Hello Rust"); let part = &s[0..5]; println!("{}", part);</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: ['Hello'], placeholder: '출력 결과',
          why: '0..5는 인덱스 0부터 4까지를 가리키므로 "Hello"가 돼요.',
          hint: '0번째부터 4번째 글자까지예요(5는 포함 안 됨).'
        }),
        () => makeChoice(
          'String과 &str의 관계를 가장 잘 설명한 것은?',
          'String은 소유하는 문자열이고, &str은 그것을 빌리는 참조다', ['String과 &str은 완전히 같은 타입이다', '&str만 값을 바꿀 수 있다', 'String은 항상 &str보다 빠르다'],
          'String은 힙에 데이터를 소유하고, &str은 그 데이터의 일부 또는 전체를 빌려서 가리켜요.',
          '소유(owned) vs 빌림(borrowed) 관계예요.'
        ),
        () => makeChoice(
          '함수 매개변수 타입으로 <code>&str</code>을 쓰는 것이 <code>String</code>보다 유연한 이유는?',
          'String과 문자열 리터럴을 모두 받을 수 있기 때문에', ['&str이 항상 더 짧기 때문에', 'String은 함수 인자로 쓸 수 없기 때문에', '&str만 println!에 넘길 수 있기 때문에'],
          '&str을 받으면 String 값도 &로 빌려서 넘길 수 있고, 리터럴도 그대로 넘길 수 있어서 더 범용적이에요.',
          '함수를 설계할 때는 보통 &str을 매개변수로 선호해요.'
        ),
        () => ({
          type: 'code',
          q: '<code>&str</code>을 매개변수로 받아 <code>"안녕, {이름}!"</code> 형태로 출력하는 함수 <code>greet</code>를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'fn greet(name: &str) {\n    println!("안녕, {}!", name);\n}',
          accept: ['fn greet(name: &str) {\n    println!("안녕, {}!", name);\n}'],
          why: '&str 매개변수로 받으면 String과 리터럴 모두 넘길 수 있어요.',
          hint: 'fn greet(name: &str) { println!("안녕, {}!", name); }'
        }),
      ],
      boss: () => {
        const arr = [randInt(1, 9), randInt(1, 9), randInt(1, 9), randInt(1, 9)];
        return {
          type: 'blank',
          q: `<code>let arr = [${arr.join(', ')}]; let part = &arr[1..3]; println!("{:?}", part);</code>를 실행하면? (Rust의 디버그 출력 형태 [a, b]로 입력)`,
          prefix: '', suffix: '', accept: [`[${arr[1]}, ${arr[2]}]`], placeholder: '출력 결과',
          why: `1..3은 인덱스 1과 2를 가리키므로 [${arr[1]}, ${arr[2]}]가 출력돼요.`,
          hint: '{:?}는 디버그 형식으로 배열을 대괄호와 함께 출력해요.'
        };
      }
    },
    {
      id: 'structsBasics',
      title: '구조체(struct) 정의와 사용',
      ready: true,
      summary: '여러 값을 하나로 묶는 구조체를 정의하고 인스턴스를 만들어요.',
      goals: ['struct로 필드 묶기', '인스턴스 생성과 필드 접근(.)', '필드 초기화 축약법'],
      blocks: [
        {
          h: 'struct: 관련된 값들을 하나로 묶기',
          html: `<p><code>struct</code>는 여러 필드를 하나의 타입으로 묶어요. 필드마다 이름과 타입을 정하고, <code>이름: 값</code> 형태로 인스턴스를 만들어요.</p>`,
          code: {
            label: 'struct_basic.rs',
            lang: 'rust',
            src: `struct Student {
    name: String,
    age: u32,
}

fn main() {
    let s = Student { name: String::from("지수"), age: 17 };
    println!("{} {}", s.name, s.age);
}`,
            out: `지수 17`
          }
        },
        {
          h: '필드 초기화 축약법과 mut 인스턴스',
          html: `<p>매개변수 이름이 필드 이름과 같으면 <code>name: name</code> 대신 <code>name</code>만 써도 돼요(축약 초기화). 인스턴스 전체를 <code>mut</code>으로 선언하면 필드 값을 바꿀 수 있어요.</p>`,
          code: {
            label: 'struct_shorthand.rs',
            lang: 'rust',
            src: `struct Student {
    name: String,
    age: u32,
}

fn new_student(name: String, age: u32) -> Student {
    Student { name, age } // name: name, age: age의 축약형
}

fn main() {
    let mut s = new_student(String::from("지수"), 17);
    s.age = 18;
    println!("{} {}", s.name, s.age);
}`,
            out: `지수 18`
          },
          after: `<div class="note"><b>정리</b> — Rust는 구조체 전체를 mut으로 선언해야 필드를 바꿀 수 있어요. 필드 하나만 mut으로 만드는 건 불가능해요(구조체 전체가 가변이거나, 전체가 불변이거나).</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>struct Student { name: String, age: u32 } let s = Student { name: String::from("${name}"), age: ${age} }; println!("{} {}", s.name, s.age);</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${name} ${age}`], placeholder: '출력 결과',
            why: `s.name과 s.age가 각각 "${name}"과 ${age}이므로 그대로 출력돼요.`,
            hint: '점(.)으로 필드에 접근한 값이 그대로 출력돼요.'
          };
        },
        () => makeChoice(
          '구조체 필드에 접근할 때 쓰는 연산자는?',
          '.(점)', ['->', '::', '&'],
          '인스턴스.필드이름 형태로 점(.)을 이용해 필드에 접근해요.',
          'C의 포인터처럼 ->를 쓰지 않아요.'
        ),
        () => ({
          type: 'blank',
          q: `매개변수 이름이 필드 이름과 같을 때, <code>Student { name: name, age: age }</code> 대신 쓸 수 있는 축약형을 쓰세요.`,
          prefix: 'Student { ', suffix: ' }', accept: ['name, age'], placeholder: '축약형',
          why: '이름이 같으면 Student { name, age }처럼 필드명만 써도 돼요.',
          hint: '콜론과 반복되는 이름을 생략해요.'
        }),
        () => makeChoice(
          '구조체 인스턴스의 필드 값을 나중에 바꾸려면?',
          '인스턴스 자체를 mut으로 선언해야 한다', ['바꾸고 싶은 필드만 mut으로 선언한다', '구조체 정의에 mut을 붙인다', '항상 바꿀 수 있다(기본이 가변)'],
          'Rust에서는 필드 단위가 아니라 인스턴스 전체가 가변인지 불변인지가 정해져요.',
          '필드 하나만 mut으로 만드는 문법은 없어요.'
        ),
        () => ({
          type: 'code',
          q: '<code>name: String</code>, <code>age: u32</code> 필드를 가진 <code>Student</code> 구조체를 정의하세요.',
          starter: '',
          rows: 4,
          placeholder: 'struct Student {\n    name: String,\n    age: u32,\n}',
          accept: ['struct Student {\n    name: String,\n    age: u32,\n}'],
          why: 'struct 이름 { 필드: 타입, ... } 형태로 정의해요.',
          hint: 'struct Student { name: String, age: u32, }'
        }),
      ],
      boss: () => {
        const age1 = randInt(14, 19);
        const age2 = age1 + 1;
        return {
          type: 'blank',
          q: `<code>struct Student { name: String, age: u32 } let mut s = Student { name: String::from("서연"), age: ${age1} }; s.age = ${age2}; println!("{}", s.age);</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(age2)], placeholder: '숫자',
          why: `s가 mut으로 선언되었기 때문에 age 필드를 ${age2}로 재대입할 수 있어요.`,
          hint: 'mut 인스턴스는 필드를 재대입할 수 있어요.'
        };
      }
    },
    {
      id: 'structMethods',
      title: '메서드와 impl',
      ready: true,
      summary: 'impl 블록으로 구조체에 메서드와 연관 함수를 추가해요.',
      goals: ['impl로 메서드 정의하기', '&self로 인스턴스 참조받기', '연관 함수(::new)로 생성자 만들기'],
      blocks: [
        {
          h: 'impl과 &self: 구조체에 동작 추가하기',
          html: `<p><code>impl 구조체이름 { }</code> 블록 안에 함수를 정의하면 메서드가 돼요. 첫 매개변수로 <code>&self</code>(자기 자신에 대한 참조)를 받으면, <code>인스턴스.메서드()</code> 형태로 호출할 수 있어요.</p>`,
          code: {
            label: 'impl_method.rs',
            lang: 'rust',
            src: `struct Rectangle {
    width: f64,
    height: f64,
}

impl Rectangle {
    fn area(&self) -> f64 {
        self.width * self.height
    }
}

fn main() {
    let rect = Rectangle { width: 3.0, height: 4.0 };
    println!("{}", rect.area());
}`,
            out: `12`
          }
        },
        {
          h: '연관 함수: Self::new로 생성자 만들기',
          html: `<p><code>self</code>를 받지 않는 함수는 "연관 함수"라고 해요. 관습적으로 <code>new</code>라는 이름의 연관 함수를 만들어 생성자처럼 사용하고, <code>구조체이름::new(...)</code>로 호출해요.</p>`,
          code: {
            label: 'impl_new.rs',
            lang: 'rust',
            src: `struct Rectangle {
    width: f64,
    height: f64,
}

impl Rectangle {
    fn new(width: f64, height: f64) -> Self {
        Self { width, height }
    }
    fn area(&self) -> f64 {
        self.width * self.height
    }
}

fn main() {
    let rect = Rectangle::new(3.0, 4.0);
    println!("{}", rect.area());
}`,
            out: `12`
          },
          after: `<div class="note"><b>정리</b> — <code>self</code>가 있으면 "메서드"(<code>인스턴스.메서드()</code>), 없으면 "연관 함수"(<code>타입::함수()</code>)예요. <code>Self</code>(대문자)는 impl 블록이 대상으로 하는 타입 자기 자신을 가리키는 별칭이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const w = randInt(2, 6);
          const h = randInt(2, 6);
          return {
            type: 'blank',
            q: `<code>impl Rectangle { fn area(&self) -> f64 { self.width * self.height } }</code>일 때, <code>width: ${w}.0, height: ${h}.0</code>인 사각형의 <code>rect.area()</code> 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(w * h)], placeholder: '숫자',
            why: `area 메서드는 width * height를 계산하므로 ${w} * ${h} = ${w * h}예요.`,
            hint: 'self.width와 self.height를 곱해요.'
          };
        },
        () => makeChoice(
          '메서드를 정의할 때 첫 매개변수로 자기 자신을 참조하는 문법은?',
          '&self', ['this', 'self', 'Self'],
          '<code>&self</code>는 인스턴스 자신에 대한 참조로, 메서드 안에서 필드에 접근할 수 있게 해줘요.',
          'JavaScript의 this와 비슷한 역할이지만 문법이 달라요.'
        ),
        () => makeChoice(
          '<code>self</code>를 받지 않는 impl 블록 안의 함수를 부르는 이름과 호출 방법은?',
          '연관 함수, 타입::함수() 형태로 호출', ['일반 메서드, 인스턴스.함수() 형태로 호출', '트레이트 함수, dyn으로만 호출', '클로저, 변수처럼 호출'],
          'self가 없는 함수는 연관 함수(associated function)라고 하며, Rectangle::new()처럼 타입 이름으로 호출해요.',
          '흔히 생성자 역할로 new라는 이름을 붙여요.'
        ),
        () => ({
          type: 'blank',
          q: `impl 블록 안에서 그 impl이 대상으로 하는 타입 자신을 가리키는, 대문자로 시작하는 별칭을 쓰세요.`,
          prefix: '', suffix: ' { width, height }', accept: ['Self'], placeholder: '별칭',
          why: '<code>Self</code>(대문자)는 impl 블록의 대상 타입 자신을 가리키는 축약 표현이에요.',
          hint: '소문자 self와 다른, 타입을 가리키는 표현이에요.'
        }),
        () => ({
          type: 'code',
          q: '<code>Rectangle</code> 구조체에 <code>width</code>, <code>height</code>를 받아 인스턴스를 만드는 연관 함수 <code>new</code>를 <code>impl</code> 블록 안에 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'impl Rectangle {\n    fn new(width: f64, height: f64) -> Self {\n        Self { width, height }\n    }\n}',
          accept: ['impl Rectangle {\n    fn new(width: f64, height: f64) -> Self {\n        Self { width, height }\n    }\n}'],
          why: 'self 없이 정의된 new 함수는 연관 함수로, Self { ... }를 반환해 새 인스턴스를 만들어요.',
          hint: 'impl Rectangle { fn new(width: f64, height: f64) -> Self { Self { width, height } } }'
        }),
      ],
      boss: () => {
        const w = randInt(2, 8);
        const h = randInt(2, 8);
        return {
          type: 'blank',
          q: `<code>impl Rectangle { fn new(width: f64, height: f64) -> Self { Self { width, height } } fn area(&self) -> f64 { self.width * self.height } } let rect = Rectangle::new(${w}.0, ${h}.0); println!("{}", rect.area());</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(w * h)], placeholder: '숫자',
          why: `Rectangle::new로 만든 인스턴스의 area()는 width * height = ${w} * ${h} = ${w * h}예요.`,
          hint: '연관 함수로 만든 인스턴스에도 메서드를 그대로 쓸 수 있어요.'
        };
      }
    },
    {
      id: 'tupleStructsAndUnit',
      title: '튜플 구조체와 유닛 구조체',
      ready: true,
      summary: '필드 이름 없이 순서로 값을 담는 튜플 구조체를 배워요.',
      goals: ['튜플 struct 정의하기', '.0, .1로 필드 접근', '값이 없는 유닛 구조체'],
      blocks: [
        {
          h: '튜플 구조체: 이름 없는 필드들',
          html: `<p><code>struct 이름(타입1, 타입2);</code> 형태로 필드 이름 없이 순서만으로 값을 담는 구조체예요. 서로 다른 의미의 값을 같은 원시 타입(예: 둘 다 f64)과 헷갈리지 않게 구분할 때 유용해요.</p>`,
          code: {
            label: 'tuple_struct.rs',
            lang: 'rust',
            src: `struct Point(f64, f64);

fn main() {
    let p = Point(3.0, 4.0);
    println!("{} {}", p.0, p.1);
}`,
            out: `3 4`
          }
        },
        {
          h: '유닛 구조체: 필드가 아예 없는 구조체',
          html: `<p><code>struct 이름;</code>처럼 필드가 하나도 없는 구조체를 유닛 구조체라고 해요. 값 자체보다 "이 타입이 존재한다"는 것 자체가 중요할 때(예: 트레이트 구현 대상 표시) 사용해요.</p>`,
          code: {
            label: 'unit_struct.rs',
            lang: 'rust',
            src: `struct Marker;

fn main() {
    let _m = Marker;
    println!("마커 생성됨");
}`,
            out: `마커 생성됨`
          },
          after: `<div class="note"><b>정리</b> — 튜플 구조체의 필드는 <code>.0</code>, <code>.1</code>처럼 순서 번호로 접근해요. <code>Point(f64, f64)</code>와 <code>Color(f64, f64)</code>처럼 구조는 같아도 이름이 다르면 서로 다른 타입이라 섞어 쓸 수 없어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const x = randInt(1, 10);
          const y = randInt(1, 10);
          return {
            type: 'blank',
            q: `<code>struct Point(f64, f64); let p = Point(${x}.0, ${y}.0); println!("{} {}", p.0, p.1);</code>를 실행하면? (그대로 입력, 공백 하나로 구분)`,
            prefix: '', suffix: '', accept: [`${x} ${y}`], placeholder: '출력 결과',
            why: `p.0은 첫 번째 값 ${x}, p.1은 두 번째 값 ${y}예요.`,
            hint: '.0, .1은 순서대로 첫 번째, 두 번째 필드를 가리켜요.'
          };
        },
        () => makeChoice(
          '튜플 구조체의 필드에 접근하는 방법은?',
          '.0, .1처럼 순서 번호를 점 뒤에 쓴다', ['필드 이름을 그대로 쓴다', '대괄호로 인덱싱한다([0])', '접근할 수 없다'],
          '튜플 구조체는 이름이 없으므로 순서 번호(.0, .1, ...)로 필드에 접근해요.',
          '일반 튜플의 필드 접근 방식과 같아요.'
        ),
        () => ({
          type: 'blank',
          q: `필드가 하나도 없는 구조체를 부르는 이름을 쓰세요. (한글로: "___ 구조체")`,
          prefix: '', suffix: ' 구조체', accept: ['유닛'], placeholder: '한글 단어',
          why: '필드 없이 이름만 있는 구조체를 유닛 구조체(unit struct)라고 해요.',
          hint: '값이 없다는 뜻의 타입, 유닛 타입 ()에서 따온 이름이에요.'
        }),
        () => makeChoice(
          '<code>struct Point(f64, f64);</code>와 <code>struct Color(f64, f64);</code>의 관계는?',
          '구조가 같아도 서로 다른 타입이라 섞어 쓸 수 없다', ['이름만 다를 뿐 완전히 같은 타입이다', 'Color가 Point의 하위 타입이다', '자동으로 변환된다'],
          '이름이 다른 튜플 구조체는 필드 구조가 같아도 완전히 다른 타입으로 취급돼요.',
          '이름이 타입 구분의 핵심이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>f64</code> 두 개를 담는 튜플 구조체 <code>Point</code>를 정의하고, <code>Point(1.0, 2.0)</code> 인스턴스를 만들어 <code>p.0</code>을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'struct Point(f64, f64);\nlet p = Point(1.0, 2.0);\nprintln!("{}", p.0);',
          accept: ['struct Point(f64, f64);\nlet p = Point(1.0, 2.0);\nprintln!("{}", p.0);'],
          why: '튜플 구조체 정의 후 인스턴스를 만들고 .0으로 첫 번째 필드에 접근해요.',
          hint: 'struct Point(f64, f64); let p = Point(1.0, 2.0); println!("{}", p.0);'
        }),
      ],
      boss: () => {
        const x = randInt(1, 20);
        const y = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>struct Point(i32, i32); let p = Point(${x}, ${y}); println!("{}", p.0 + p.1);</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(x + y)], placeholder: '숫자',
          why: `p.0(${x})과 p.1(${y})을 더하면 ${x + y}예요.`,
          hint: '두 필드를 각각 .0, .1로 꺼내서 더해요.'
        };
      }
    },
    {
      id: 'enumsBasics',
      title: '열거형(enum)과 match 기초',
      ready: true,
      summary: '여러 경우 중 하나를 나타내는 enum과, 이를 분기하는 match를 배워요.',
      goals: ['enum으로 여러 경우 정의하기', 'match로 모든 경우 분기하기', 'match의 철저함(exhaustiveness)'],
      blocks: [
        {
          h: 'enum: "여러 경우 중 하나"를 표현하기',
          html: `<p><code>enum</code>은 정해진 여러 값(variant) 중 딱 하나를 가지는 타입이에요. 신호등 색깔처럼 "이거 아니면 저거"인 경우를 표현할 때 딱 맞아요.</p>`,
          code: {
            label: 'enum_basic.rs',
            lang: 'rust',
            src: `enum TrafficLight {
    Red,
    Yellow,
    Green,
}

fn main() {
    let light = TrafficLight::Red;
    match light {
        TrafficLight::Red => println!("정지"),
        TrafficLight::Yellow => println!("주의"),
        TrafficLight::Green => println!("전진"),
    }
}`,
            out: `정지`
          }
        },
        {
          h: 'match는 모든 경우를 다뤄야 해요',
          html: `<p><code>match</code>는 enum의 모든 variant를 빠짐없이 처리해야 컴파일돼요. 이를 <b>철저함(exhaustiveness)</b>이라고 하며, 처리를 빠뜨리면 컴파일 오류로 바로 알 수 있어요.</p>`,
          code: {
            label: 'match_exhaustive.rs',
            lang: 'rust',
            src: `enum TrafficLight {
    Red,
    Yellow,
    Green,
}

fn describe(light: TrafficLight) -> &'static str {
    match light {
        TrafficLight::Red => "정지",
        TrafficLight::Yellow => "주의",
        TrafficLight::Green => "전진",
        // 하나라도 빠뜨리면 컴파일 오류!
    }
}

fn main() {
    println!("{}", describe(TrafficLight::Green));
}`,
            out: `전진`
          },
          after: `<div class="note"><b>정리</b> — 나중에 enum에 새로운 variant를 추가하면, 그 enum을 match하는 모든 곳에서 컴파일 오류가 나서 "빠뜨린 곳"을 바로 찾을 수 있어요. 이게 다른 언어의 switch와 결정적으로 다른 안전 장치예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const color = pick(['Red', 'Yellow', 'Green']);
          const result = { Red: '정지', Yellow: '주의', Green: '전진' }[color];
          return {
            type: 'blank',
            q: `<code>let light = TrafficLight::${color}; match light { TrafficLight::Red => println!("정지"), TrafficLight::Yellow => println!("주의"), TrafficLight::Green => println!("전진"), }</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [result], placeholder: '출력 결과',
            why: `light가 TrafficLight::${color}이므로 그에 해당하는 분기 "${result}"가 실행돼요.`,
            hint: 'match는 값과 일치하는 분기 하나만 실행해요.'
          };
        },
        () => makeChoice(
          'Rust의 match가 다른 언어의 switch와 다른 핵심 특징은?',
          '모든 경우를 빠짐없이 다뤄야 컴파일된다(철저함)', ['break를 써야 다음 분기로 안 넘어간다', '숫자만 비교할 수 있다', '기본값을 항상 지정해야 한다'],
          'match는 enum의 모든 variant를 다뤄야 하며, 빠뜨리면 컴파일 오류가 나요. 이를 철저함(exhaustiveness)이라고 해요.',
          '컴파일러가 "빠진 경우 없음"을 보장해줘요.'
        ),
        () => ({
          type: 'blank',
          q: `여러 값(variant) 중 하나를 표현하는 타입을 정의하는 키워드를 쓰세요.`,
          prefix: '', suffix: ' TrafficLight { Red, Yellow, Green }', accept: ['enum'], placeholder: '키워드',
          why: '<code>enum</code>은 정해진 여러 값 중 하나를 나타내는 타입을 정의해요.',
          hint: 'enumeration(열거)의 줄임말이에요.'
        }),
        () => makeChoice(
          'enum에 새로운 variant를 추가했는데, 기존 match 문에서 그 경우를 처리하지 않으면?',
          '컴파일 오류가 나서 빠뜨린 곳을 바로 알 수 있다', ['조용히 무시되고 정상 실행된다', '런타임에만 오류가 난다', '자동으로 기본 분기가 실행된다'],
          'match의 철저함 검사 덕분에, 새 variant를 처리하지 않은 match는 컴파일 시점에 바로 오류로 드러나요.',
          '이 특성이 enum과 match를 안전한 조합으로 만들어요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Red</code>, <code>Yellow</code>, <code>Green</code> variant를 가진 <code>enum TrafficLight</code>를 정의하세요.',
          starter: '',
          rows: 4,
          placeholder: 'enum TrafficLight {\n    Red,\n    Yellow,\n    Green,\n}',
          accept: ['enum TrafficLight {\n    Red,\n    Yellow,\n    Green,\n}'],
          why: 'enum 이름 { Variant1, Variant2, ... } 형태로 정의해요.',
          hint: 'enum TrafficLight { Red, Yellow, Green, }'
        }),
      ],
      boss: () => {
        const color = pick(['Red', 'Yellow', 'Green']);
        const result = { Red: '정지', Yellow: '주의', Green: '전진' }[color];
        return {
          type: 'blank',
          q: `<code>fn describe(light: TrafficLight) -> &'static str { match light { TrafficLight::Red => "정지", TrafficLight::Yellow => "주의", TrafficLight::Green => "전진" } } println!("{}", describe(TrafficLight::${color}));</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [result], placeholder: '출력 결과',
          why: `describe 함수가 TrafficLight::${color}에 해당하는 "${result}"를 반환해요.`,
          hint: 'match 표현식의 결과가 함수의 반환값이 돼요.'
        };
      }
    },
    {
      id: 'patternMatching',
      title: 'match로 값과 범위 매칭하기',
      ready: true,
      summary: '숫자 범위, 여러 값 묶기, _ 와일드카드 등 match의 다양한 패턴을 배워요.',
      goals: ['범위 패턴(1..=5)', '| 로 여러 패턴 묶기', '_ 와일드카드로 나머지 처리'],
      blocks: [
        {
          h: '범위와 | 로 여러 값 한 번에 매칭',
          html: `<p>match는 enum뿐 아니라 정수, 문자 등 다양한 값도 매칭할 수 있어요. <code>1..=5</code>처럼 범위를 쓰거나, <code>1 | 3 | 5</code>처럼 <code>|</code>로 여러 값을 한 분기에 묶을 수 있어요.</p>`,
          code: {
            label: 'match_range.rs',
            lang: 'rust',
            src: `fn describe(n: i32) -> &'static str {
    match n {
        1 | 2 | 3 => "작은 수",
        4..=10 => "중간 수",
        _ => "큰 수",
    }
}

fn main() {
    println!("{}", describe(7));
}`,
            out: `중간 수`
          }
        },
        {
          h: '_ 와일드카드: 나머지 모든 경우',
          html: `<p><code>_</code>(언더스코어)는 "나머지 모든 경우"를 뜻하는 와일드카드예요. 값이 필요 없을 때도 <code>_</code>를 써서 "이 값은 안 쓸 거예요"라고 명시할 수 있어요.</p>`,
          code: {
            label: 'match_wildcard.rs',
            lang: 'rust',
            src: `fn main() {
    let n = 42;
    match n {
        0 => println!("영"),
        _ => println!("영이 아님"),
    }
}`,
            out: `영이 아님`
          },
          after: `<div class="note"><b>정리</b> — match는 위에서부터 순서대로 패턴을 검사해서 처음 일치하는 분기 하나만 실행해요. <code>_</code>는 보통 맨 마지막에 두어 "그 외 모든 경우"를 처리해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(1, 15);
          const result = [1, 2, 3].includes(n) ? '작은 수' : (n >= 4 && n <= 10 ? '중간 수' : '큰 수');
          return {
            type: 'blank',
            q: `<code>match n { 1 | 2 | 3 => "작은 수", 4..=10 => "중간 수", _ => "큰 수" }</code>에서 <code>n = ${n}</code>이면 결과는? (그대로 입력)`,
            prefix: '', suffix: '', accept: [result], placeholder: '출력 결과',
            why: `${n}은 ${result === '작은 수' ? '1, 2, 3 중 하나' : result === '중간 수' ? '4부터 10 사이' : '그 외(11 이상)'}이므로 "${result}"가 선택돼요.`,
            hint: '범위(4..=10)와 |로 묶인 값들을 확인해보세요.'
          };
        },
        () => makeChoice(
          '<code>match</code>에서 "나머지 모든 경우"를 뜻하는 와일드카드 패턴은?',
          '_', ['*', 'else', 'default'],
          '<code>_</code>(언더스코어)는 어떤 값과도 일치하는 와일드카드 패턴이에요.',
          '다른 언어의 default/else와 비슷한 역할이에요.'
        ),
        () => ({
          type: 'blank',
          q: `여러 값을 한 분기에서 함께 매칭하고 싶을 때 값 사이에 쓰는 기호를 쓰세요. (예: 1 ___ 2 ___ 3 => ...)`,
          prefix: '1 ', suffix: ' 2 ', accept: ['|'], placeholder: '기호',
          why: '<code>|</code>는 "또는"을 뜻해서, 1 | 2 | 3처럼 여러 값 중 하나면 매칭돼요.',
          hint: '논리 OR과 같은 기호예요.'
        }),
        () => makeChoice(
          '<code>match</code>가 패턴을 검사하는 순서는?',
          '위에서부터 순서대로, 처음 일치하는 분기 하나만 실행', ['모든 분기를 다 실행한 뒤 마지막 값을 사용', '무작위 순서로 검사', '값이 가장 큰 분기부터'],
          'match는 위에서부터 차례로 검사해서 처음 일치하는 분기 하나만 실행하고 끝나요.',
          '그래서 _(와일드카드)는 보통 맨 아래에 둬요.'
        ),
        () => ({
          type: 'code',
          q: '<code>n</code>이 0이면 "영", 그 외에는 "영이 아님"을 출력하는 match 문을 작성하세요. (n은 42로 선언)',
          starter: '',
          rows: 4,
          placeholder: 'let n = 42;\nmatch n {\n    0 => println!("영"),\n    _ => println!("영이 아님"),\n}',
          accept: ['let n = 42;\nmatch n {\n    0 => println!("영"),\n    _ => println!("영이 아님"),\n}'],
          why: '0과 일치하지 않으면 _ 분기(나머지 모든 경우)가 실행돼요.',
          hint: 'match n { 0 => ..., _ => ..., }'
        }),
      ],
      boss: () => {
        const n = randInt(0, 20);
        const result = n === 0 ? '영' : (n <= 5 ? '작음' : (n <= 15 ? '보통' : '큼'));
        return {
          type: 'blank',
          q: `<code>match n { 0 => "영", 1..=5 => "작음", 6..=15 => "보통", _ => "큼" }</code>에서 <code>n = ${n}</code>이면 결과는? (그대로 입력)`,
          prefix: '', suffix: '', accept: [result], placeholder: '출력 결과',
          why: `n(${n})이 속하는 범위를 순서대로 확인하면 "${result}"가 나와요.`,
          hint: '0인지, 1~5인지, 6~15인지, 그 외인지 순서대로 확인해요.'
        };
      }
    },
    {
      id: 'optionType',
      title: 'Option<T>: null이 없는 이유',
      ready: true,
      summary: 'Rust에는 null이 없는 대신 Option<T>로 "값이 있을 수도, 없을 수도" 있음을 표현해요.',
      goals: ['Some(값)과 None', 'match로 Option 분기하기', 'Option이 null보다 안전한 이유'],
      blocks: [
        {
          h: 'Option<T>: Some 아니면 None',
          html: `<p>다른 언어의 <code>null</code>은 "값이 있는 척하지만 사실 없는" 상태라 예상치 못한 오류(null pointer exception)를 자주 일으켜요. Rust는 null이 아예 없고, 대신 <code>Option&lt;T&gt;</code>로 "값이 있음(<code>Some(값)</code>)" 또는 "값이 없음(<code>None</code>)"을 명시적으로 표현해요.</p>`,
          code: {
            label: 'option_basic.rs',
            lang: 'rust',
            src: `fn find_age(name: &str) -> Option<u32> {
    if name == "지수" {
        Some(17)
    } else {
        None
    }
}

fn main() {
    let result = find_age("지수");
    match result {
        Some(age) => println!("나이: {}", age),
        None => println!("찾을 수 없음"),
    }
}`,
            out: `나이: 17`
          }
        },
        {
          h: 'match로 Option을 안전하게 처리하기',
          html: `<p>Option을 쓰면 값이 없을 수도 있다는 사실을 <b>타입 자체가 알려주기</b> 때문에, match로 반드시 두 경우(Some/None)를 모두 처리해야 컴파일돼요. "값이 없는 경우를 깜빡하는" 실수 자체가 원천 차단돼요.</p>`,
          code: {
            label: 'option_none.rs',
            lang: 'rust',
            src: `fn find_age(name: &str) -> Option<u32> {
    if name == "지수" {
        Some(17)
    } else {
        None
    }
}

fn main() {
    match find_age("민준") {
        Some(age) => println!("나이: {}", age),
        None => println!("찾을 수 없음"),
    }
}`,
            out: `찾을 수 없음`
          },
          after: `<div class="note"><b>정리</b> — Option&lt;T&gt;는 표준 라이브러리의 평범한 enum이에요(<code>enum Option&lt;T&gt; { Some(T), None }</code>). "null 가능성을 아예 언어에서 없애고, 타입으로 명시한다"는 게 Rust 안전성의 핵심 아이디어 중 하나예요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'Rust에 null이 없는 대신 값이 있을 수도 없을 수도 있음을 표현하는 타입은?',
          'Option<T>', ['Nullable<T>', 'Maybe<T>', 'Result<T, E>'],
          '<code>Option&lt;T&gt;</code>는 Some(값) 또는 None으로 값의 유무를 표현해요.',
          '표준 라이브러리에서 가장 많이 쓰이는 enum 중 하나예요.'
        ),
        () => {
          const found = pick([true, false]);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>let result: Option<u32> = ${found ? `Some(${age})` : 'None'}; match result { Some(age) => println!("나이: {}", age), None => println!("찾을 수 없음") }</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [found ? `나이: ${age}` : '찾을 수 없음'], placeholder: '출력 결과',
            why: found ? `Some(${age})이므로 "나이: ${age}"가 출력돼요.` : 'None이므로 "찾을 수 없음"이 출력돼요.',
            hint: 'Some과 None 중 어느 쪽인지 확인해보세요.'
          };
        },
        () => makeChoice(
          'Option<T>를 match로 처리할 때 반드시 다뤄야 하는 두 경우는?',
          'Some(값)과 None', ['Ok(값)과 Err(값)', 'True와 False', 'Some과 Null'],
          'Option은 Some(T) 또는 None, 이 두 variant만 가지는 enum이에요.',
          'Result와 헷갈리지 마세요. Result는 Ok/Err예요.'
        ),
        () => ({
          type: 'blank',
          q: `Option<T>에서 값이 있음을 나타내는 variant 이름을 쓰세요. (값을 감싸서 표현)`,
          prefix: '', suffix: '(17)', accept: ['Some'], placeholder: 'variant 이름',
          why: '<code>Some(값)</code>은 값이 존재함을 나타내는 Option의 variant예요.',
          hint: '값이 "있다"는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'code',
          q: '이름이 <code>"지수"</code>면 <code>Some(17)</code>, 아니면 <code>None</code>을 반환하는 함수 <code>find_age(name: &str) -> Option<u32></code>를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'fn find_age(name: &str) -> Option<u32> {\n    if name == "지수" {\n        Some(17)\n    } else {\n        None\n    }\n}',
          accept: ['fn find_age(name: &str) -> Option<u32> {\n    if name == "지수" {\n        Some(17)\n    } else {\n        None\n    }\n}'],
          why: 'if 표현식으로 조건에 따라 Some(17) 또는 None을 반환해요.',
          hint: 'if name == "지수" { Some(17) } else { None }'
        }),
      ],
      boss: () => {
        const items = ['사과', '바나나', '포도'];
        const target = pick([...items, '수박']);
        const found = items.includes(target);
        return {
          type: 'blank',
          q: `<code>fn find_price(name: &str) -> Option<u32> { if name == "사과" { Some(1000) } else if name == "바나나" { Some(2000) } else if name == "포도" { Some(3000) } else { None } } match find_price("${target}") { Some(p) => println!("{}원", p), None => println!("없음") }</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [found ? `${(items.indexOf(target) + 1) * 1000}원` : '없음'], placeholder: '출력 결과',
          why: found ? `"${target}"의 가격이 있으므로 해당 가격이 출력돼요.` : `"${target}"은 목록에 없어서 None이 되어 "없음"이 출력돼요.`,
          hint: '사과=1000, 바나나=2000, 포도=3000, 나머지는 없음이에요.'
        };
      }
    },
    {
      id: 'ifLetWhileLet',
      title: 'if let과 while let',
      ready: true,
      summary: '한 가지 패턴만 확인할 때 match보다 간결한 if let/while let을 배워요.',
      goals: ['if let로 한 경우만 간결하게 처리', 'else와 함께 쓰기', 'while let으로 반복 처리'],
      blocks: [
        {
          h: 'if let: match의 간결한 버전',
          html: `<p>Option 중 <code>Some</code>인 경우만 관심 있고 <code>None</code>은 무시하고 싶을 때, match 전체를 쓰는 대신 <code>if let</code>을 쓰면 훨씬 간결해요.</p>`,
          code: {
            label: 'if_let.rs',
            lang: 'rust',
            src: `fn main() {
    let age: Option<u32> = Some(17);
    if let Some(a) = age {
        println!("나이: {}", a);
    } else {
        println!("나이 정보 없음");
    }
}`,
            out: `나이: 17`
          }
        },
        {
          h: 'while let: 패턴이 맞는 동안 반복',
          html: `<p><code>while let</code>은 패턴이 계속 일치하는 동안 반복해요. 예를 들어 <code>Vec</code>에서 <code>pop()</code>(마지막 값을 꺼내며 <code>Option</code>을 반환)한 값이 <code>Some</code>인 동안 계속 처리할 때 자주 써요.</p>`,
          code: {
            label: 'while_let.rs',
            lang: 'rust',
            src: `fn main() {
    let mut stack = vec![1, 2, 3];
    while let Some(top) = stack.pop() {
        println!("{}", top);
    }
}`,
            out: `3\n2\n1`
          },
          after: `<div class="note"><b>정리</b> — if let/while let은 "여러 경우 중 딱 하나만 관심 있을 때" match보다 짧게 쓸 수 있는 문법이에요. 모든 경우를 다뤄야 한다면 여전히 match가 더 적합해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const has = pick([true, false]);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>let age: Option<u32> = ${has ? `Some(${age})` : 'None'}; if let Some(a) = age { println!("나이: {}", a); } else { println!("정보 없음"); }</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [has ? `나이: ${age}` : '정보 없음'], placeholder: '출력 결과',
            why: has ? `age가 Some(${age})이므로 패턴이 일치해 "나이: ${age}"가 출력돼요.` : 'age가 None이라 패턴이 일치하지 않아 else의 "정보 없음"이 출력돼요.',
            hint: 'if let은 패턴이 일치할 때만 안의 코드를 실행해요.'
          };
        },
        () => makeChoice(
          'Option 중 Some인 경우만 처리하고 None은 무시하고 싶을 때 match보다 간결한 문법은?',
          'if let', ['while', 'loop let', 'match let'],
          'if let Some(값) = 옵션 { ... }은 match 전체를 쓰지 않고도 한 경우만 간결하게 처리할 수 있어요.',
          'match의 축약형이라고 생각하면 돼요.'
        ),
        () => {
          const arr = [randInt(1, 5), randInt(1, 5), randInt(1, 5)];
          return {
            type: 'blank',
            q: `<code>let mut stack = vec![${arr.join(', ')}]; while let Some(top) = stack.pop() { println!("{}", top); }</code>를 실행하면, 출력 순서는? (줄바꿈으로 구분)`,
            prefix: '', suffix: '', accept: [[...arr].reverse().join('\n')], placeholder: '출력 순서',
            why: `pop()은 마지막 값부터 꺼내므로 ${[...arr].reverse().join(', ')} 순서로 출력돼요.`,
            hint: 'pop()은 Vec의 맨 뒤부터 값을 꺼내요.'
          };
        },
        () => makeChoice(
          '<code>while let Some(top) = stack.pop() { ... }</code>이 반복을 멈추는 시점은?',
          'stack.pop()이 None을 반환할 때(스택이 비었을 때)', ['stack의 길이가 0이 아닐 때', '무조건 3번 반복 후', 'break를 만나지 않으면 멈추지 않음'],
          'pop()이 더 이상 꺼낼 값이 없어 None을 반환하면 패턴이 일치하지 않아 반복이 끝나요.',
          'Vec이 완전히 비면 pop()은 None을 돌려줘요.'
        ),
        () => ({
          type: 'code',
          q: '<code>age: Option<u32> = Some(20)</code>일 때, <code>if let</code>으로 Some이면 그 값을 출력하고 아니면 "없음"을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'let age: Option<u32> = Some(20);\nif let Some(a) = age {\n    println!("{}", a);\n} else {\n    println!("없음");\n}',
          accept: ['let age: Option<u32> = Some(20);\nif let Some(a) = age {\n    println!("{}", a);\n} else {\n    println!("없음");\n}'],
          why: 'if let Some(a) = age로 패턴이 일치하면 a를 출력하고, 아니면 else의 "없음"을 출력해요.',
          hint: 'if let Some(a) = age { ... } else { ... }'
        }),
      ],
      boss: () => {
        const arr = [randInt(1, 9), randInt(1, 9), randInt(1, 9), randInt(1, 9)];
        return {
          type: 'blank',
          q: `<code>let mut stack = vec![${arr.join(', ')}]; let mut total = 0; while let Some(top) = stack.pop() { total += top; } println!("{}", total);</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(arr.reduce((a, b) => a + b, 0))], placeholder: '숫자',
          why: `while let은 스택이 빌 때까지 모든 값을 꺼내 더하므로, 합은 ${arr.reduce((a, b) => a + b, 0)}이에요.`,
          hint: '순서와 관계없이 모든 값이 한 번씩 더해져요.'
        };
      }
    },
    {
      id: 'resultAndErrorHandling',
      title: 'Result<T, E>와 ? 연산자',
      ready: true,
      summary: '실패할 수 있는 작업을 표현하는 Result와, 오류를 간결하게 전파하는 ? 연산자를 배워요.',
      goals: ['Ok(T)와 Err(E)', 'match로 Result 처리하기', '? 연산자로 오류 전파하기'],
      blocks: [
        {
          h: 'Result<T, E>: 성공 아니면 실패',
          html: `<p>실패할 수 있는 작업(파일 읽기, 파싱 등)은 <code>Result&lt;T, E&gt;</code>를 반환해요. 성공하면 <code>Ok(값)</code>, 실패하면 <code>Err(오류)</code>를 담아요.</p>`,
          code: {
            label: 'result_basic.rs',
            lang: 'rust',
            src: `fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("0으로 나눌 수 없어요"))
    } else {
        Ok(a / b)
    }
}

fn main() {
    match divide(10.0, 2.0) {
        Ok(v) => println!("결과: {}", v),
        Err(e) => println!("오류: {}", e),
    }
}`,
            out: `결과: 5`
          }
        },
        {
          h: '? 연산자: 오류를 간결하게 전파하기',
          html: `<p><code>?</code>는 Result가 <code>Err</code>이면 그 자리에서 즉시 함수 밖으로 오류를 반환하고, <code>Ok</code>이면 안의 값을 꺼내줘요. 여러 단계의 실패 가능한 작업을 연달아 처리할 때 match를 반복하지 않아도 되게 해줘요.</p>`,
          code: {
            label: 'question_mark.rs',
            lang: 'rust',
            src: `fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 { return Err(String::from("0으로 나눌 수 없어요")); }
    Ok(a / b)
}

fn calc(a: f64, b: f64) -> Result<f64, String> {
    let step1 = divide(a, b)?; // Err면 여기서 즉시 반환됨
    Ok(step1 * 2.0)
}

fn main() {
    println!("{:?}", calc(10.0, 2.0));
}`,
            out: `Ok(10.0)`
          },
          after: `<div class="note"><b>정리</b> — ? 연산자는 <code>Result</code>를 반환하는 함수 안에서만 쓸 수 있어요. "실패하면 즉시 전파, 성공하면 계속 진행"이라는 반복적인 패턴을 한 글자로 표현해줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(10, 30);
          const b = pick([2, 3, 5, 0]);
          const isZero = b === 0;
          return {
            type: 'blank',
            q: `<code>fn divide(a: f64, b: f64) -> Result<f64, String> { if b == 0.0 { Err(String::from("오류")) } else { Ok(a / b) } } match divide(${a}.0, ${b}.0) { Ok(v) => println!("결과: {}", v), Err(e) => println!("오류: {}", e) }</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [isZero ? '오류: 오류' : `결과: ${a / b}`], placeholder: '출력 결과',
            why: isZero ? 'b가 0이므로 Err가 반환되어 "오류: 오류"가 출력돼요.' : `b가 0이 아니므로 Ok(${a / b})가 되어 "결과: ${a / b}"가 출력돼요.`,
            hint: 'b가 0인지 아닌지 먼저 확인하세요.'
          };
        },
        () => makeChoice(
          'Result<T, E>에서 실패를 나타내는 variant는?',
          'Err(E)', ['None', 'Ok(E)', 'Fail(E)'],
          '성공은 Ok(T), 실패는 Err(E)로 표현해요.',
          'Option의 None과 다르게, Result는 실패 이유(E)도 함께 담아요.'
        ),
        () => makeChoice(
          '? 연산자가 Result 값에 대해 하는 일은?',
          'Err면 즉시 함수 밖으로 반환하고, Ok면 안의 값을 꺼낸다', ['항상 프로그램을 종료시킨다', 'Err를 Ok로 바꿔서 계속 진행한다', '아무 일도 하지 않는다'],
          '?는 Err인 경우 그 자리에서 즉시 함수의 반환값으로 전파하고, Ok인 경우 안의 값만 꺼내서 계속 진행하게 해줘요.',
          '오류 처리를 짧게 줄여주는 문법이에요.'
        ),
        () => ({
          type: 'blank',
          q: `Result를 반환하는 함수 안에서, 실패 시 오류를 즉시 전파하는 연산자를 쓰세요. (기호 하나)`,
          prefix: 'divide(a, b)', suffix: ';', accept: ['?'], placeholder: '기호',
          why: '<code>?</code> 연산자는 Err를 즉시 전파하고 Ok의 값만 꺼내줘요.',
          hint: '물음표 하나예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>b</code>가 0이면 <code>Err("0으로 나눌 수 없어요".to_string())</code>를, 아니면 <code>Ok(a / b)</code>를 반환하는 함수 <code>divide(a: f64, b: f64) -> Result<f64, String></code>를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'fn divide(a: f64, b: f64) -> Result<f64, String> {\n    if b == 0.0 {\n        Err("0으로 나눌 수 없어요".to_string())\n    } else {\n        Ok(a / b)\n    }\n}',
          accept: ['fn divide(a: f64, b: f64) -> Result<f64, String> {\n    if b == 0.0 {\n        Err("0으로 나눌 수 없어요".to_string())\n    } else {\n        Ok(a / b)\n    }\n}'],
          why: 'if 표현식으로 조건에 따라 Err 또는 Ok를 반환해요.',
          hint: 'if b == 0.0 { Err(...) } else { Ok(a / b) }'
        }),
      ],
      boss: () => {
        const a = randInt(20, 40);
        const b = pick([2, 4, 5]);
        return {
          type: 'blank',
          q: `<code>fn divide(a: f64, b: f64) -> Result<f64, String> { if b == 0.0 { return Err("오류".to_string()); } Ok(a / b) } fn calc(a: f64, b: f64) -> Result<f64, String> { let step1 = divide(a, b)?; Ok(step1 * 2.0) } println!("{:?}", calc(${a}.0, ${b}.0));</code>를 실행하면? (그대로 입력, 예: Ok(값))`,
          prefix: '', suffix: '', accept: [`Ok(${(a / b) * 2})`], placeholder: '출력 결과',
          why: `divide(${a}, ${b})는 Ok(${a / b})이고, ?로 값을 꺼내 2배하면 ${(a / b) * 2}가 되어 Ok(${(a / b) * 2})가 출력돼요.`,
          hint: '?는 Ok 안의 값만 꺼내서 계속 계산을 이어가요.'
        };
      }
    },
    {
      id: 'panicUnwrapExpect',
      title: 'panic!과 unwrap/expect',
      ready: true,
      summary: 'unwrap과 expect가 편리하지만 프로덕션에서는 위험한 이유를 배워요.',
      goals: ['panic!으로 즉시 중단하기', 'unwrap()의 위험성', 'expect()로 더 나은 오류 메시지 남기기'],
      blocks: [
        {
          h: 'unwrap(): 편하지만 위험해요',
          html: `<p><code>unwrap()</code>은 <code>Option</code>이나 <code>Result</code>에서 값을 바로 꺼내주지만, <code>None</code>이거나 <code>Err</code>이면 프로그램이 그 자리에서 <b>panic</b>(강제 종료)돼요. 연습이나 프로토타입에서는 편리하지만, 실제 서비스 코드에서는 예상치 못한 크래시로 이어져요.</p>`,
          code: {
            label: 'unwrap_danger.rs',
            lang: 'rust',
            src: `fn main() {
    let age: Option<u32> = None;
    let value = age.unwrap(); // panic! called \`Option::unwrap()\` on a \`None\` value
    println!("{}", value);
}`,
            out: `thread 'main' panicked at 'called \`Option::unwrap()\` on a \`None\` value'`
          }
        },
        {
          h: 'expect(): 조금 더 나은 오류 메시지',
          html: `<p><code>expect("메시지")</code>는 unwrap과 동일하게 동작하지만, panic 시 남기는 메시지를 직접 정할 수 있어요. 그래도 여전히 프로그램을 강제 종료시키므로, 실제 서비스 코드에서는 <code>match</code>나 <code>?</code>로 오류를 정상적으로 처리하는 게 훨씬 안전해요.</p>`,
          code: {
            label: 'expect_message.rs',
            lang: 'rust',
            src: `fn main() {
    let age: Option<u32> = None;
    let value = age.expect("나이 정보가 반드시 있어야 합니다");
    println!("{}", value);
}`,
            out: `thread 'main' panicked at '나이 정보가 반드시 있어야 합니다'`
          },
          after: `<div class="note"><b>정리</b> — 실무에서는 unwrap/expect를 "이 값은 절대 실패할 리 없다"고 확신하는 아주 제한적인 경우(예: 테스트 코드)에만 쓰고, 실패 가능성이 조금이라도 있는 곳은 match나 ?로 정상적으로 처리하는 게 좋아요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>None.unwrap()</code>을 호출하면 어떻게 되나요?',
          '프로그램이 panic으로 즉시 강제 종료된다', ['자동으로 기본값(0)을 반환한다', '아무 일도 일어나지 않는다', '컴파일 오류가 난다'],
          'unwrap()은 None이나 Err에 대해 호출되면 panic을 일으켜 프로그램을 즉시 종료시켜요.',
          '컴파일은 되지만 실행 중(런타임)에 문제가 생겨요.'
        ),
        () => ({
          type: 'blank',
          q: `unwrap()과 동작은 같지만, panic 시 표시할 메시지를 직접 지정할 수 있는 메서드 이름을 쓰세요.`,
          prefix: '', suffix: '("메시지")', accept: ['expect'], placeholder: '메서드 이름',
          why: '<code>expect("메시지")</code>는 panic이 발생할 때 지정한 메시지를 함께 표시해줘요.',
          hint: '"기대하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '실무(프로덕션) 코드에서 unwrap()/expect()를 남용하면 안 되는 이유는?',
          '실패 가능성을 무시하다가 예상치 못한 크래시로 이어질 수 있어서', ['속도가 너무 느려서', '문법적으로 허용되지 않아서', '테스트에서만 쓸 수 있는 문법이라서'],
          'unwrap/expect는 실패 가능성을 처리하지 않고 그냥 강제 종료시키므로, 실제 서비스에서는 예상치 못한 다운타임의 원인이 될 수 있어요.',
          'match나 ?로 실패를 정상적으로 처리하는 게 더 안전해요.'
        ),
        () => makeChoice(
          '프로덕션 코드에서 Option/Result의 실패 가능성을 안전하게 다루는 더 나은 방법은?',
          'match나 ? 연산자로 성공/실패를 모두 명시적으로 처리한다', ['항상 unwrap()을 쓰고 테스트를 열심히 한다', 'expect()에 자세한 메시지만 남긴다', '실패할 가능성이 없다고 가정한다'],
          'match나 ?는 실패 경우를 프로그램이 죽지 않고 정상적으로 처리하도록 강제해서 더 견고한 코드를 만들어요.',
          '컴파일러가 강제하는 처리 방식이 가장 안전해요.'
        ),
        () => ({
          type: 'code',
          q: '<code>age: Option<u32> = None</code>에 대해 <code>expect("나이 정보 필요")</code>를 호출해 값을 꺼내려는 코드를 두 줄로 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'let age: Option<u32> = None;\nlet value = age.expect("나이 정보 필요");',
          accept: ['let age: Option<u32> = None;\nlet value = age.expect("나이 정보 필요");'],
          why: 'expect는 None일 때 지정한 메시지와 함께 panic을 일으켜요.',
          hint: 'age.expect("메시지")'
        }),
      ],
      boss: () => makeChoice(
        '다음 중 실행 시 panic이 발생하는 코드는?',
        'let x: Option<i32> = None; println!("{}", x.unwrap());',
        ['let x: Option<i32> = Some(5); println!("{}", x.unwrap());', 'let x: Result<i32, String> = Ok(5); println!("{}", x.unwrap());', 'let x: Option<i32> = None; println!("{:?}", x);'],
        'None에 대해 unwrap()을 호출하면 panic이 발생해요. Some/Ok에 unwrap을 호출하는 것은 안전하고, {:?}로 그냥 출력하는 것도 panic을 일으키지 않아요.',
        'unwrap()이 위험해지는 건 값이 없는(None/Err) 경우예요.'
      )
    },
    {
      id: 'vectorsBasics',
      title: '벡터(Vec<T>)',
      ready: true,
      summary: '크기가 자유롭게 늘어나는 배열 같은 컬렉션, Vec을 배워요.',
      goals: ['vec! 매크로로 생성하기', 'push/pop으로 추가·제거', '인덱싱과 get()의 차이'],
      blocks: [
        {
          h: 'Vec<T>: 크기가 변하는 배열',
          html: `<p>배열([T; N])은 크기가 고정이지만, <code>Vec&lt;T&gt;</code>는 힙에 저장되어 크기가 자유롭게 늘어나요. <code>vec![]</code> 매크로로 쉽게 만들 수 있어요.</p>`,
          code: {
            label: 'vec_basic.rs',
            lang: 'rust',
            src: `fn main() {
    let mut scores = vec![90, 85, 100];
    scores.push(77);
    println!("{:?}", scores);
    println!("{}", scores[0]);
}`,
            out: `[90, 85, 100, 77]\n90`
          }
        },
        {
          h: '인덱싱 vs get(): 범위를 벗어나면?',
          html: `<p><code>scores[10]</code>처럼 대괄호로 접근하다 범위를 벗어나면 panic이 나요. 안전하게 확인하고 싶다면 <code>get(인덱스)</code>를 쓰세요. 이건 <code>Option&lt;&T&gt;</code>를 반환해서 범위를 벗어나도 panic 없이 None을 받을 수 있어요.</p>`,
          code: {
            label: 'vec_get.rs',
            lang: 'rust',
            src: `fn main() {
    let scores = vec![90, 85, 100];
    match scores.get(10) {
        Some(v) => println!("점수: {}", v),
        None => println!("그런 인덱스는 없어요"),
    }
}`,
            out: `그런 인덱스는 없어요`
          },
          after: `<div class="note"><b>정리</b> — <code>scores.len()</code>으로 길이를, <code>scores.pop()</code>으로 마지막 값을 <code>Option&lt;T&gt;</code>로 꺼낼 수 있어요. 확실히 범위 안이라면 인덱싱을, 불확실하다면 get()을 쓰는 게 안전해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const arr = [randInt(1, 9), randInt(1, 9), randInt(1, 9)];
          const add = randInt(1, 9);
          return {
            type: 'blank',
            q: `<code>let mut v = vec![${arr.join(', ')}]; v.push(${add}); println!("{:?}", v);</code>를 실행하면? (Rust 디버그 형식으로, 예: [1, 2])`,
            prefix: '', suffix: '', accept: [`[${[...arr, add].join(', ')}]`], placeholder: '출력 결과',
            why: `push(${add})는 맨 뒤에 값을 추가하므로 [${[...arr, add].join(', ')}]이 돼요.`,
            hint: 'push는 항상 벡터의 맨 뒤에 값을 추가해요.'
          };
        },
        () => makeChoice(
          '배열([T; N])과 Vec<T>의 차이는?',
          'Vec은 크기가 자유롭게 늘어나고, 배열은 크기가 고정이다', ['Vec은 항상 정수만 담을 수 있다', '배열은 push를 지원한다', '둘은 완전히 같은 타입이다'],
          '배열은 컴파일 타임에 크기가 고정되지만, Vec은 힙에 저장되어 런타임에 크기를 늘리거나 줄일 수 있어요.',
          'push/pop처럼 크기가 변하는 연산은 Vec에서만 가능해요.'
        ),
        () => makeChoice(
          '범위를 벗어난 인덱스에 접근했을 때 panic 없이 안전하게 확인하는 방법은?',
          'get(인덱스)를 써서 Option을 받는다', ['[인덱스]로 그냥 접근한다', 'push(인덱스)를 호출한다', '반드시 panic이 나므로 방법이 없다'],
          'get()은 범위를 벗어나면 panic 대신 None을 반환하는 Option<&T>를 돌려줘요.',
          '대괄호 인덱싱은 실패 시 panic, get()은 실패 시 None이에요.'
        ),
        () => {
          const arr = [randInt(1, 9), randInt(1, 9), randInt(1, 9), randInt(1, 9)];
          return {
            type: 'blank',
            q: `<code>let mut v = vec![${arr.join(', ')}]; let last = v.pop(); println!("{:?}", last);</code>를 실행하면? (Rust 디버그 형식, 예: Some(값))`,
            prefix: '', suffix: '', accept: [`Some(${arr[arr.length - 1]})`], placeholder: '출력 결과',
            why: `pop()은 마지막 값을 Option으로 꺼내므로 Some(${arr[arr.length - 1]})이 돼요.`,
            hint: 'pop()은 벡터가 비어있지 않으면 항상 Some을 반환해요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>90, 85, 100</code>을 담은 벡터 <code>scores</code>를 만들고 <code>77</code>을 추가한 뒤 전체를 출력하는 코드를 세 줄로 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'let mut scores = vec![90, 85, 100];\nscores.push(77);\nprintln!("{:?}", scores);',
          accept: ['let mut scores = vec![90, 85, 100];\nscores.push(77);\nprintln!("{:?}", scores);'],
          why: 'vec! 매크로로 생성하고 push로 값을 추가한 뒤 {:?}로 출력해요.',
          hint: 'vec![90, 85, 100]; scores.push(77); println!("{:?}", scores);'
        }),
      ],
      boss: () => {
        const arr = [randInt(1, 20), randInt(1, 20), randInt(1, 20)];
        return {
          type: 'blank',
          q: `<code>let mut v = vec![${arr.join(', ')}]; v.push(v[0] + v[1]); println!("{:?}", v);</code>를 실행하면? (Rust 디버그 형식으로 입력)`,
          prefix: '', suffix: '', accept: [`[${[...arr, arr[0] + arr[1]].join(', ')}]`], placeholder: '출력 결과',
          why: `v[0](${arr[0]}) + v[1](${arr[1]})인 ${arr[0] + arr[1]}이 맨 뒤에 추가돼요.`,
          hint: 'push 안의 표현식을 먼저 계산해보세요.'
        };
      }
    },
    {
      id: 'hashMapsBasics',
      title: '해시맵(HashMap<K, V>)',
      ready: true,
      summary: '키-값 쌍을 저장하는 HashMap의 삽입, 조회, entry API를 배워요.',
      goals: ['HashMap::new()로 생성', 'insert와 get으로 저장/조회', 'entry API로 안전하게 값 갱신'],
      blocks: [
        {
          h: 'HashMap: 키로 값을 찾는 컬렉션',
          html: `<p><code>HashMap&lt;K, V&gt;</code>는 키(key)로 값(value)을 저장하고 찾는 컬렉션이에요. <code>use std::collections::HashMap;</code>으로 가져와야 해요.</p>`,
          code: {
            label: 'hashmap_basic.rs',
            lang: 'rust',
            src: `use std::collections::HashMap;

fn main() {
    let mut scores: HashMap<String, u32> = HashMap::new();
    scores.insert(String::from("지수"), 90);
    scores.insert(String::from("민준"), 85);
    println!("{:?}", scores.get("지수"));
}`,
            out: `Some(90)`
          }
        },
        {
          h: 'entry API: 있으면 유지, 없으면 새로 넣기',
          html: `<p><code>entry(키).or_insert(기본값)</code>은 키가 이미 있으면 그 값을, 없으면 기본값을 넣고 그 값을 돌려줘요. 값을 안전하게 갱신할 때 아주 자주 쓰이는 패턴이에요.</p>`,
          code: {
            label: 'hashmap_entry.rs',
            lang: 'rust',
            src: `use std::collections::HashMap;

fn main() {
    let mut counts: HashMap<&str, i32> = HashMap::new();
    for word in ["사과", "바나나", "사과"] {
        let count = counts.entry(word).or_insert(0);
        *count += 1;
    }
    println!("{:?}", counts.get("사과"));
}`,
            out: `Some(2)`
          },
          after: `<div class="note"><b>정리</b> — <code>get()</code>은 <code>Option&lt;&V&gt;</code>를 반환해서, 키가 없어도 panic 없이 None으로 처리할 수 있어요. HashMap은 순서를 보장하지 않는다는 점도 기억하세요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          const score = randInt(60, 100);
          return {
            type: 'blank',
            q: `<code>let mut scores: HashMap<String, u32> = HashMap::new(); scores.insert(String::from("${name}"), ${score}); println!("{:?}", scores.get("${name}"));</code>를 실행하면? (Rust 디버그 형식으로, 예: Some(값))`,
            prefix: '', suffix: '', accept: [`Some(${score})`], placeholder: '출력 결과',
            why: `"${name}"이라는 키로 ${score}가 저장되어 있으므로 Some(${score})이 반환돼요.`,
            hint: 'get()은 Option<&V>를 반환해요.'
          };
        },
        () => makeChoice(
          'HashMap에서 키가 존재하지 않을 때 get()의 반환값은?',
          'None', ['panic 발생', '0', '빈 문자열'],
          '존재하지 않는 키로 get()을 호출하면 panic 없이 None을 반환해요.',
          'get()은 항상 Option으로 감싸서 돌려줘요.'
        ),
        () => makeChoice(
          '<code>entry(키).or_insert(기본값)</code>의 동작으로 옳은 것은?',
          '키가 있으면 기존 값을, 없으면 기본값을 넣고 그 값의 참조를 돌려준다', ['항상 기본값으로 덮어쓴다', '키가 없으면 panic을 일으킨다', '값을 절대 바꾸지 않는다'],
          'entry API는 키의 존재 여부에 따라 값을 유지하거나 새로 만들어서, 값을 안전하게 갱신할 수 있게 해줘요.',
          '단어 개수 세기 같은 카운팅 로직에서 아주 유용해요.'
        ),
        () => ({
          type: 'blank',
          q: `HashMap을 쓰려면 파일 맨 위에서 어떤 모듈을 <code>use</code>해야 하나요? (std::collections::___)`,
          prefix: 'use std::collections::', suffix: ';', accept: ['HashMap'], placeholder: '타입 이름',
          why: 'HashMap은 <code>use std::collections::HashMap;</code>으로 가져와야 사용할 수 있어요.',
          hint: '타입 이름 그대로 써야 해요.'
        }),
        () => ({
          type: 'code',
          q: '<code>HashMap<String, u32></code>를 만들고, <code>"지수"</code> 키에 <code>90</code>을 저장한 뒤 <code>get</code>으로 조회해 출력하는 코드를 세 줄로 작성하세요. (use 문 제외)',
          starter: '',
          rows: 3,
          placeholder: 'let mut scores: HashMap<String, u32> = HashMap::new();\nscores.insert(String::from("지수"), 90);\nprintln!("{:?}", scores.get("지수"));',
          accept: ['let mut scores: HashMap<String, u32> = HashMap::new();\nscores.insert(String::from("지수"), 90);\nprintln!("{:?}", scores.get("지수"));'],
          why: 'HashMap::new()로 만들고 insert로 저장한 뒤 get으로 조회해요.',
          hint: 'HashMap::new(); insert(키, 값); get(키)'
        }),
      ],
      boss: () => {
        const words = ['사과', '바나나', '사과', '포도', '사과'];
        const target = pick(['사과', '바나나', '포도', '수박']);
        const count = words.filter(w => w === target).length;
        return {
          type: 'blank',
          q: `<code>let words = ["${words.join('", "')}"]; let mut counts: HashMap<&str, i32> = HashMap::new(); for word in words { let c = counts.entry(word).or_insert(0); *c += 1; } println!("{:?}", counts.get("${target}"));</code>를 실행하면? (Rust 디버그 형식, 예: Some(값) 또는 None)`,
          prefix: '', suffix: '', accept: [count > 0 ? `Some(${count})` : 'None'], placeholder: '출력 결과',
          why: count > 0 ? `"${target}"은 ${count}번 등장해서 Some(${count})이 돼요.` : `"${target}"은 목록에 없어서 None이 돼요.`,
          hint: '단어를 하나씩 세어보세요.'
        };
      }
    },
    {
      id: 'hashSetsBasics',
      title: '해시셋(HashSet<T>)',
      ready: true,
      summary: '중복 없는 값들의 집합, HashSet의 삽입과 집합 연산을 배워요.',
      goals: ['HashSet으로 중복 제거하기', 'insert와 contains', '교집합/합집합 개념'],
      blocks: [
        {
          h: 'HashSet: 중복이 없는 값들의 모음',
          html: `<p><code>HashSet&lt;T&gt;</code>는 같은 값을 두 번 넣어도 딱 하나만 저장돼요. "이 값이 있는지 없는지"만 중요할 때 Vec보다 적합해요.</p>`,
          code: {
            label: 'hashset_basic.rs',
            lang: 'rust',
            src: `use std::collections::HashSet;

fn main() {
    let mut fruits: HashSet<&str> = HashSet::new();
    fruits.insert("사과");
    fruits.insert("바나나");
    fruits.insert("사과"); // 중복! 무시됨
    println!("{}", fruits.len());
}`,
            out: `2`
          }
        },
        {
          h: 'contains로 존재 여부 확인하기',
          html: `<p><code>contains(값)</code>은 해당 값이 집합에 있는지를 <code>bool</code>로 돌려줘요. Vec에서 <code>contains</code>를 쓰는 것보다 HashSet이 평균적으로 훨씬 빨라요(원소 개수와 상관없이 거의 일정한 속도).</p>`,
          code: {
            label: 'hashset_contains.rs',
            lang: 'rust',
            src: `use std::collections::HashSet;

fn main() {
    let mut fruits: HashSet<&str> = HashSet::new();
    fruits.insert("사과");
    println!("{}", fruits.contains("사과"));
    println!("{}", fruits.contains("포도"));
}`,
            out: `true\nfalse`
          },
          after: `<div class="note"><b>정리</b> — HashSet은 교집합(intersection), 합집합(union), 차집합(difference) 같은 집합 연산 메서드도 제공해요. "중복 제거"와 "빠른 존재 확인"이 필요할 때 HashSet을 떠올리세요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const items = [pick(['사과', '바나나']), pick(['포도', '수박']), '사과'];
          const unique = new Set(items).size;
          return {
            type: 'blank',
            q: `<code>let mut set: HashSet<&str> = HashSet::new(); for f in ["${items.join('", "')}"] { set.insert(f); } println!("{}", set.len());</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(unique)], placeholder: '숫자',
            why: `HashSet은 중복을 무시하므로 서로 다른 값의 개수인 ${unique}이 len()이에요.`,
            hint: '같은 값을 여러 번 넣어도 한 번만 저장돼요.'
          };
        },
        () => makeChoice(
          'HashSet에 이미 있는 값을 다시 insert하면?',
          '무시되고 집합의 크기는 그대로다', ['오류가 발생한다', '중복 저장되어 크기가 늘어난다', '기존 값이 삭제된다'],
          'HashSet은 중복 값을 허용하지 않으므로, 이미 있는 값을 다시 넣어도 아무 변화가 없어요.',
          '집합(set)의 수학적 정의와 같아요: 같은 원소는 하나로 취급돼요.'
        ),
        () => makeChoice(
          '값이 집합에 있는지 확인할 때 쓰는 메서드는?',
          'contains(값)', ['get(값)', 'find(값)', 'has(값)'],
          '<code>contains(값)</code>은 그 값이 집합에 있는지를 bool로 돌려줘요.',
          'HashMap의 get과 다르게 HashSet은 값 자체가 곧 원소라서 bool을 돌려줘요.'
        ),
        () => makeChoice(
          'Vec과 비교했을 때 HashSet이 유리한 상황은?',
          '중복을 자동으로 제거하고 존재 여부를 빠르게 확인해야 할 때', ['순서가 중요할 때', '같은 값을 여러 번 저장해야 할 때', '인덱스로 접근해야 할 때'],
          'HashSet은 중복 제거와 빠른 contains 확인에 특화되어 있어요. 순서가 중요하거나 중복을 허용해야 한다면 Vec이 더 적합해요.',
          '"중복 없음"과 "빠른 조회"가 HashSet의 핵심 장점이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>HashSet<&str></code>을 만들고 <code>"사과"</code>, <code>"바나나"</code>를 넣은 뒤 <code>"사과"</code>가 있는지 <code>contains</code>로 확인해 출력하는 코드를 작성하세요. (use 문 제외)',
          starter: '',
          rows: 4,
          placeholder: 'let mut fruits: HashSet<&str> = HashSet::new();\nfruits.insert("사과");\nfruits.insert("바나나");\nprintln!("{}", fruits.contains("사과"));',
          accept: ['let mut fruits: HashSet<&str> = HashSet::new();\nfruits.insert("사과");\nfruits.insert("바나나");\nprintln!("{}", fruits.contains("사과"));'],
          why: 'insert로 값을 넣고 contains로 존재 여부를 확인해요.',
          hint: 'HashSet::new(); insert(값); contains(값)'
        }),
      ],
      boss: () => {
        const a = ['사과', '바나나', '포도'];
        const b = ['바나나', '포도', '수박'];
        const common = a.filter(x => b.includes(x)).length;
        return {
          type: 'blank',
          q: `<code>let set_a: HashSet<&str> = ["${a.join('", "')}"].into_iter().collect(); let set_b: HashSet<&str> = ["${b.join('", "')}"].into_iter().collect(); println!("{}", set_a.intersection(&set_b).count());</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(common)], placeholder: '숫자',
          why: `intersection은 두 집합에 공통으로 있는 값의 개수를 세므로, 공통 원소 ${common}개가 나와요.`,
          hint: '두 목록에 공통으로 등장하는 항목을 세어보세요.'
        };
      }
    },
    {
      id: 'iteratorsBasics',
      title: '이터레이터 기초',
      ready: true,
      summary: 'Vec 등을 순회하는 iter(), into_iter(), for 반복의 관계를 배워요.',
      goals: ['for로 컬렉션 순회하기', 'iter()로 참조 순회하기', 'sum, count 같은 소비 메서드'],
      blocks: [
        {
          h: 'for로 Vec 순회하기',
          html: `<p><code>for 값 in &벡터</code>는 벡터의 각 원소를 참조로 하나씩 꺼내와요. 벡터 자체는 그대로 남아있어서 이후에도 계속 쓸 수 있어요.</p>`,
          code: {
            label: 'iter_for.rs',
            lang: 'rust',
            src: `fn main() {
    let scores = vec![90, 85, 100];
    for s in &scores {
        println!("{}", s);
    }
    println!("여전히 사용 가능: {:?}", scores);
}`,
            out: `90\n85\n100\n여전히 사용 가능: [90, 85, 100]`
          }
        },
        {
          h: 'sum(), count() 같은 소비 메서드',
          html: `<p><code>.iter()</code>는 이터레이터를 만들고, <code>.sum()</code>, <code>.count()</code> 같은 메서드로 그 이터레이터를 "소비"해서 결과를 얻어요.</p>`,
          code: {
            label: 'iter_sum.rs',
            lang: 'rust',
            src: `fn main() {
    let scores = vec![90, 85, 100];
    let total: i32 = scores.iter().sum();
    let count = scores.iter().count();
    println!("{} {}", total, count);
}`,
            out: `275 3`
          },
          after: `<div class="note"><b>정리</b> — <code>&벡터</code>로 순회하면 값을 빌리기만 해서 원본이 남고, <code>into_iter()</code>로 순회하면 소유권이 이동해서 각 값을 가져와요. 보통은 값을 빌리는 <code>&</code>/<code>.iter()</code> 방식을 더 자주 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const arr = [randInt(1, 20), randInt(1, 20), randInt(1, 20)];
          return {
            type: 'blank',
            q: `<code>let scores = vec![${arr.join(', ')}]; let total: i32 = scores.iter().sum(); println!("{}", total);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(arr.reduce((a, b) => a + b, 0))], placeholder: '숫자',
            why: `sum()은 모든 원소를 더하므로 ${arr.join(' + ')} = ${arr.reduce((a, b) => a + b, 0)}이에요.`,
            hint: 'sum()은 이터레이터의 모든 값을 더해요.'
          };
        },
        () => makeChoice(
          '<code>for s in &scores { ... }</code>처럼 &를 붙여서 순회하면?',
          '값을 참조로 빌려서 원본 scores가 그대로 남는다', ['scores의 소유권이 사라져 다시 쓸 수 없다', '벡터의 순서가 뒤바뀐다', '컴파일 오류가 난다'],
          '&로 순회하면 값을 빌리기만 해서, 반복이 끝난 뒤에도 원본 벡터를 그대로 쓸 수 있어요.',
          '소유권 이동 없이 값을 읽기만 해요.'
        ),
        () => {
          const arr = [randInt(1, 9), randInt(1, 9), randInt(1, 9), randInt(1, 9)];
          return {
            type: 'blank',
            q: `<code>let v = vec![${arr.join(', ')}]; println!("{}", v.iter().count());</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(arr.length)], placeholder: '숫자',
            why: `count()는 이터레이터가 만드는 값의 개수를 세므로 ${arr.length}예요.`,
            hint: 'count()는 원소의 개수를 세요.'
          };
        },
        () => makeChoice(
          '벡터의 소유권을 가져가면서(이동시키면서) 순회하는 메서드는?',
          'into_iter()', ['iter()', 'iter_mut()', 'peek()'],
          'into_iter()는 값의 소유권을 가져와서 순회하고, 순회가 끝나면 원본 벡터는 더 이상 쓸 수 없어요.',
          '이름에 "into"가 들어가면 소유권이 넘어간다고 기억하세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>vec![1, 2, 3]</code>을 만들고 <code>iter().sum()</code>으로 합계를 구해 <code>i32</code> 타입의 <code>total</code>에 담아 출력하는 코드를 세 줄로 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'let v = vec![1, 2, 3];\nlet total: i32 = v.iter().sum();\nprintln!("{}", total);',
          accept: ['let v = vec![1, 2, 3];\nlet total: i32 = v.iter().sum();\nprintln!("{}", total);'],
          why: 'iter().sum()은 벡터의 모든 값을 더해서 하나의 값으로 만들어요.',
          hint: 'v.iter().sum()의 결과 타입은 명시해야 할 때가 많아요.'
        }),
      ],
      boss: () => {
        const arr = [randInt(1, 15), randInt(1, 15), randInt(1, 15), randInt(1, 15)];
        return {
          type: 'blank',
          q: `<code>let v = vec![${arr.join(', ')}]; let total: i32 = v.iter().sum(); let count = v.iter().count(); println!("{}", total / count as i32);</code>를 실행하면? 숫자만 쓰세요. (정수 나눗셈)`,
          prefix: '', suffix: '', accept: [String(Math.trunc(arr.reduce((a, b) => a + b, 0) / arr.length))], placeholder: '숫자',
          why: `합계는 ${arr.reduce((a, b) => a + b, 0)}, 개수는 ${arr.length}이므로 평균(정수 나눗셈)은 ${Math.trunc(arr.reduce((a, b) => a + b, 0) / arr.length)}이에요.`,
          hint: '합을 개수로 나누면 평균이 나와요(소수점은 버려져요).'
        };
      }
    },
    {
      id: 'iteratorAdapters',
      title: '이터레이터 어댑터: map, filter, fold',
      ready: true,
      summary: '컬렉션을 변형·필터링·축약하는 함수형 스타일의 이터레이터 메서드를 배워요.',
      goals: ['map으로 값 변형하기', 'filter로 조건에 맞는 값만 남기기', 'fold/collect로 결과 만들기'],
      blocks: [
        {
          h: 'map: 각 값을 변형하기',
          html: `<p><code>map(클로저)</code>는 각 원소에 함수를 적용한 새로운 이터레이터를 만들어요. 원본은 그대로 두고 결과만 얻고 싶을 때 써요.</p>`,
          code: {
            label: 'iter_map.rs',
            lang: 'rust',
            src: `fn main() {
    let nums = vec![1, 2, 3];
    let doubled: Vec<i32> = nums.iter().map(|n| n * 2).collect();
    println!("{:?}", doubled);
}`,
            out: `[2, 4, 6]`
          }
        },
        {
          h: 'filter와 fold',
          html: `<p><code>filter(클로저)</code>는 조건이 참인 값만 남기고, <code>fold(초기값, 클로저)</code>는 모든 값을 하나로 누적 계산해요. 이 셋(<code>map</code>/<code>filter</code>/<code>fold</code>)은 이터레이터 체이닝의 핵심이에요.</p>`,
          code: {
            label: 'iter_filter_fold.rs',
            lang: 'rust',
            src: `fn main() {
    let nums = vec![1, 2, 3, 4, 5];
    let evens: Vec<&i32> = nums.iter().filter(|n| **n % 2 == 0).collect();
    let total = nums.iter().fold(0, |acc, n| acc + n);
    println!("{:?}", evens);
    println!("{}", total);
}`,
            out: `[2, 4]\n15`
          },
          after: `<div class="note"><b>정리</b> — <code>collect()</code>는 이터레이터를 다시 Vec 같은 컬렉션으로 모아줘요. map/filter는 지연 평가(lazy)라서, collect()나 sum() 같은 소비 메서드를 호출하기 전까지는 실제로 계산되지 않아요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const arr = [randInt(1, 9), randInt(1, 9), randInt(1, 9)];
          return {
            type: 'blank',
            q: `<code>let nums = vec![${arr.join(', ')}]; let doubled: Vec<i32> = nums.iter().map(|n| n * 2).collect(); println!("{:?}", doubled);</code>를 실행하면? (Rust 디버그 형식으로 입력)`,
            prefix: '', suffix: '', accept: [`[${arr.map(n => n * 2).join(', ')}]`], placeholder: '출력 결과',
            why: `map(|n| n * 2)는 각 값을 2배로 만들므로 [${arr.map(n => n * 2).join(', ')}]이 돼요.`,
            hint: '각 원소가 2배씩 커져요.'
          };
        },
        () => makeChoice(
          '<code>filter(|n| **n % 2 == 0)</code>가 하는 일은?',
          '짝수인 값만 남긴다', ['모든 값을 2배로 만든다', '값의 개수를 센다', '값을 정렬한다'],
          'filter는 클로저가 true를 반환하는 값만 남기고, 여기서는 2로 나눈 나머지가 0인(짝수) 값만 남겨요.',
          '% 2 == 0은 짝수 판별에 쓰이는 흔한 조건이에요.'
        ),
        () => {
          const arr = [randInt(1, 5), randInt(1, 5), randInt(1, 5), randInt(1, 5)];
          return {
            type: 'blank',
            q: `<code>let nums = vec![${arr.join(', ')}]; let total = nums.iter().fold(0, |acc, n| acc + n); println!("{}", total);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(arr.reduce((a, b) => a + b, 0))], placeholder: '숫자',
            why: `fold(0, ...)는 0부터 시작해서 모든 값을 더하므로 ${arr.reduce((a, b) => a + b, 0)}이에요.`,
            hint: 'fold의 첫 인자는 누적 시작값이에요.'
          };
        },
        () => makeChoice(
          'map()이나 filter()로 만든 이터레이터를 다시 Vec으로 모으는 메서드는?',
          'collect()', ['sum()', 'to_vec()', 'push()'],
          '<code>collect()</code>는 이터레이터의 결과를 Vec 같은 컬렉션 타입으로 모아줘요.',
          '어떤 컬렉션으로 모을지는 타입 명시(Vec<i32> 등)로 알려줘야 할 때가 많아요.'
        ),
        () => ({
          type: 'code',
          q: '<code>vec![1, 2, 3, 4]</code>에서 <code>map</code>으로 각 값을 제곱한 뒤 <code>Vec<i32></code>로 collect해서 출력하는 코드를 세 줄로 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'let nums = vec![1, 2, 3, 4];\nlet squared: Vec<i32> = nums.iter().map(|n| n * n).collect();\nprintln!("{:?}", squared);',
          accept: ['let nums = vec![1, 2, 3, 4];\nlet squared: Vec<i32> = nums.iter().map(|n| n * n).collect();\nprintln!("{:?}", squared);'],
          why: 'map(|n| n * n)은 각 값을 제곱하고, collect()로 Vec을 만들어요.',
          hint: 'map(|n| n * n).collect()'
        }),
      ],
      boss: () => {
        const arr = [randInt(1, 6), randInt(1, 6), randInt(1, 6), randInt(1, 6), randInt(1, 6)];
        const result = arr.filter(n => n % 2 === 0).reduce((a, b) => a + b, 0);
        return {
          type: 'blank',
          q: `<code>let nums = vec![${arr.join(', ')}]; let total: i32 = nums.iter().filter(|n| **n % 2 == 0).sum(); println!("{}", total);</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
          why: `짝수만 걸러서(${arr.filter(n => n % 2 === 0).join(', ') || '없음'}) 더하면 ${result}이에요.`,
          hint: '먼저 짝수만 남기고, 그 값들을 더해보세요.'
        };
      }
    },
    {
      id: 'closures',
      title: '클로저: 환경을 캡처하는 함수',
      ready: true,
      summary: '주변 변수를 붙잡아 쓸 수 있는 익명 함수, 클로저의 문법과 특징을 배워요.',
      goals: ['|매개변수| 식 문법', '클로저가 주변 변수를 캡처하는 방식', '클로저를 함수 인자로 넘기기'],
      blocks: [
        {
          h: '클로저 문법: |매개변수| 식',
          html: `<p>클로저는 <code>|매개변수| 식</code> 형태로 쓰는 이름 없는 함수예요. 타입은 대부분 추론되어 생략할 수 있어요.</p>`,
          code: {
            label: 'closure_basic.rs',
            lang: 'rust',
            src: `fn main() {
    let add_one = |x: i32| x + 1;
    println!("{}", add_one(4));
}`,
            out: `5`
          }
        },
        {
          h: '클로저는 주변 변수를 "캡처"할 수 있어요',
          html: `<p>일반 함수(<code>fn</code>)와 달리 클로저는 자신을 둘러싼 스코프의 변수를 그대로 붙잡아(캡처) 쓸 수 있어요. 이게 클로저와 함수의 가장 큰 차이예요.</p>`,
          code: {
            label: 'closure_capture.rs',
            lang: 'rust',
            src: `fn main() {
    let discount = 10;
    let apply_discount = |price: i32| price - discount;
    println!("{}", apply_discount(100));
}`,
            out: `90`
          },
          after: `<div class="note"><b>정리</b> — 클로저는 <code>map</code>, <code>filter</code>처럼 함수를 인자로 받는 곳에 자주 넘겨져요. 캡처 방식에 따라 값을 빌리거나(참조), <code>move</code> 키워드를 붙이면 값의 소유권 자체를 클로저 안으로 가져올 수도 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(1, 20);
          const add = randInt(1, 10);
          return {
            type: 'blank',
            q: `<code>let add_n = |x: i32| x + ${add}; println!("{}", add_n(${n}));</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n + add)], placeholder: '숫자',
            why: `클로저가 x에 ${add}를 더하므로 ${n} + ${add} = ${n + add}예요.`,
            hint: '클로저를 호출하면 매개변수 자리에 값이 들어가요.'
          };
        },
        () => makeChoice(
          '일반 함수(fn)와 클로저의 가장 큰 차이는?',
          '클로저는 주변 스코프의 변수를 캡처할 수 있다', ['클로저는 매개변수를 가질 수 없다', '클로저는 항상 더 빠르다', '클로저는 반환값을 가질 수 없다'],
          '클로저는 자신이 정의된 환경의 변수를 그대로 붙잡아(캡처) 쓸 수 있는 것이 fn과의 핵심 차이예요.',
          '"환경을 캡처한다"는 표현이 클로저의 정의예요.'
        ),
        () => {
          const price = randInt(50, 200);
          const discount = randInt(5, 30);
          return {
            type: 'blank',
            q: `<code>let discount = ${discount}; let apply = |price: i32| price - discount; println!("{}", apply(${price}));</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(price - discount)], placeholder: '숫자',
            why: `클로저가 바깥의 discount(${discount})를 캡처해서 사용하므로 ${price} - ${discount} = ${price - discount}예요.`,
            hint: '클로저 밖에서 정의된 discount 변수를 그대로 쓸 수 있어요.'
          };
        },
        () => makeChoice(
          '클로저를 정의하는 기본 문법은?',
          '|매개변수| 식', ['fn(매개변수) => 식', 'function(매개변수) { 식 }', 'lambda 매개변수: 식'],
          'Rust의 클로저는 <code>|매개변수| 식</code> 형태로 정의해요.',
          '세로 막대(|) 사이에 매개변수를 써요.'
        ),
        () => ({
          type: 'code',
          q: '정수를 받아 3을 곱하는 클로저 <code>triple</code>을 정의하고, <code>triple(5)</code>를 출력하는 코드를 두 줄로 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'let triple = |x: i32| x * 3;\nprintln!("{}", triple(5));',
          accept: ['let triple = |x: i32| x * 3;\nprintln!("{}", triple(5));'],
          why: '|x: i32| x * 3은 x를 받아 3배로 만드는 클로저예요.',
          hint: 'let triple = |x: i32| x * 3;'
        }),
      ],
      boss: () => {
        const tax = randInt(5, 20);
        const price = randInt(100, 500);
        const total = Math.round(price * (1 + tax / 100));
        return {
          type: 'blank',
          q: `<code>let tax_rate = ${tax}; let with_tax = |price: i32| price + price * tax_rate / 100; println!("{}", with_tax(${price}));</code>를 실행하면? 숫자만 쓰세요. (정수 나눗셈)`,
          prefix: '', suffix: '', accept: [String(price + Math.trunc(price * tax / 100))], placeholder: '숫자',
          why: `${price} + ${price} * ${tax} / 100(정수 나눗셈) = ${price + Math.trunc(price * tax / 100)}이에요.`,
          hint: '곱셈과 나눗셈이 덧셈보다 먼저 계산돼요.'
        };
      }
    },
    {
      id: 'genericsBasics',
      title: '제네릭: 여러 타입에 재사용 가능한 코드',
      ready: true,
      summary: '<T>로 타입을 매개변수화해서, 같은 함수를 여러 타입에 재사용해요.',
      goals: ['제네릭 함수 정의(<T>)', '여러 타입에 재사용되는 원리', '제네릭 구조체'],
      blocks: [
        {
          h: '제네릭 함수: 타입을 매개변수처럼',
          html: `<p><code>fn largest<T>(list: &[T]) -> T</code>처럼 <code>&lt;T&gt;</code>를 쓰면, 함수를 호출할 때 실제 타입이 무엇이든(i32든 f64든) 같은 코드를 재사용할 수 있어요.</p>`,
          code: {
            label: 'generics_fn.rs',
            lang: 'rust',
            src: `fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut max = list[0];
    for &item in list {
        if item > max {
            max = item;
        }
    }
    max
}

fn main() {
    let nums = vec![3, 7, 2, 9, 4];
    println!("{}", largest(&nums));
}`,
            out: `9`
          }
        },
        {
          h: '제네릭 구조체',
          html: `<p>구조체도 <code>struct Point<T> { x: T, y: T }</code>처럼 제네릭으로 만들 수 있어요. 이러면 <code>Point&lt;i32&gt;</code>, <code>Point&lt;f64&gt;</code> 등 다양한 타입의 좌표를 같은 구조체로 표현할 수 있어요.</p>`,
          code: {
            label: 'generics_struct.rs',
            lang: 'rust',
            src: `struct Point<T> {
    x: T,
    y: T,
}

fn main() {
    let int_point = Point { x: 3, y: 4 };
    let float_point = Point { x: 1.5, y: 2.5 };
    println!("{} {}", int_point.x, float_point.x);
}`,
            out: `3 1.5`
          },
          after: `<div class="note"><b>정리</b> — 제네릭은 런타임 비용이 없어요! 컴파일 시점에 실제로 쓰인 타입마다 코드가 각각 생성되는데(단일화, monomorphization), 그래서 "타입마다 따로 쓴 함수"만큼 빠르면서도 코드는 한 번만 쓰면 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const arr = [randInt(1, 50), randInt(1, 50), randInt(1, 50), randInt(1, 50)];
          return {
            type: 'blank',
            q: `<code>fn largest<T: PartialOrd + Copy>(list: &[T]) -> T { let mut max = list[0]; for &item in list { if item > max { max = item; } } max } let nums = vec![${arr.join(', ')}]; println!("{}", largest(&nums));</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(Math.max(...arr))], placeholder: '숫자',
            why: `largest는 리스트에서 가장 큰 값을 찾으므로 ${Math.max(...arr)}이 돼요.`,
            hint: '가장 큰 값을 찾는 함수예요.'
          };
        },
        () => makeChoice(
          '<code>fn largest<T>(list: &[T]) -> T</code>에서 <code><T></code>가 뜻하는 것은?',
          '실제 타입은 호출할 때 정해지는 타입 매개변수', ['T라는 이름의 고정된 타입', '항상 i32를 의미', '트레이트 이름'],
          '<T>는 제네릭 타입 매개변수로, 함수를 호출할 때 실제로 어떤 타입(i32, f64 등)이 쓰였는지에 따라 정해져요.',
          '함수의 "매개변수"가 값이라면, 제네릭의 <T>는 "타입의 매개변수"예요.'
        ),
        () => makeChoice(
          '제네릭 함수/구조체가 실행 속도 측면에서 갖는 장점은?',
          '컴파일 시점에 타입별로 코드가 생성되어(단일화) 런타임 비용이 없다', ['항상 인터프리터로 실행되어 빠르다', '타입 검사를 건너뛰어 빠르다', '메모리를 자동으로 압축한다'],
          'Rust의 제네릭은 컴파일 타임에 실제 사용된 타입마다 코드를 따로 생성(단일화, monomorphization)해서, 런타임에 추가 비용이 들지 않아요.',
          '"제로 비용 추상화"라는 Rust의 대표적인 특징 중 하나예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>struct Point<T> { x: T, y: T }</code>일 때 <code>let p = Point { x: 3, y: 4 }; println!("{}", p.x);</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: ['3'], placeholder: '숫자',
          why: 'p.x는 3으로 초기화되었으므로 그대로 3이 출력돼요.',
          hint: '필드에 담긴 값 그대로 출력돼요.'
        }),
        () => ({
          type: 'code',
          q: '<code>x</code>, <code>y</code> 필드를 모두 같은 타입 <code>T</code>로 갖는 제네릭 구조체 <code>Point<T></code>를 정의하세요.',
          starter: '',
          rows: 4,
          placeholder: 'struct Point<T> {\n    x: T,\n    y: T,\n}',
          accept: ['struct Point<T> {\n    x: T,\n    y: T,\n}'],
          why: '<T>로 타입 매개변수를 선언하고, 두 필드 모두 T 타입으로 정의해요.',
          hint: 'struct Point<T> { x: T, y: T, }'
        }),
      ],
      boss: () => {
        const arr = [(randInt(1, 100) / 10).toFixed(1), (randInt(1, 100) / 10).toFixed(1), (randInt(1, 100) / 10).toFixed(1)];
        const max = Math.max(...arr.map(Number)).toFixed(1);
        return {
          type: 'blank',
          q: `<code>fn largest<T: PartialOrd + Copy>(list: &[T]) -> T { let mut max = list[0]; for &item in list { if item > max { max = item; } } max } let nums = vec![${arr.join(', ')}]; println!("{}", largest(&nums));</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [max], placeholder: '출력 결과',
          why: `largest는 f64 값들 중에서도 똑같이 동작해서 가장 큰 값 ${max}를 찾아요.`,
          hint: '같은 largest 함수가 정수든 실수든 그대로 동작해요(제네릭 덕분).'
        };
      }
    },
    {
      id: 'traitBoundsAndWhere',
      title: '트레이트 경계(trait bound)와 where',
      ready: true,
      summary: '제네릭 타입에 "이런 능력이 있어야 한다"는 제약을 거는 트레이트 경계를 배워요.',
      goals: ['T: Trait로 경계 걸기', '여러 경계를 + 로 묶기', 'where 절로 가독성 높이기'],
      blocks: [
        {
          h: '트레이트 경계: "T는 이런 능력이 있어야 해"',
          html: `<p>제네릭 <code>T</code>는 원래 아무 능력도 없다고 가정돼요. <code>T: PartialOrd</code>처럼 트레이트 경계를 걸어야, 그 트레이트가 제공하는 기능(예: <code>&gt;</code> 비교)을 T에 대해 쓸 수 있어요.</p>`,
          code: {
            label: 'trait_bound.rs',
            lang: 'rust',
            src: `fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
    let mut max = list[0];
    for &item in list {
        if item > max { // PartialOrd 덕분에 > 비교가 가능
            max = item;
        }
    }
    max
}

fn main() {
    println!("{}", largest(&[3, 7, 2]));
}`,
            out: `7`
          }
        },
        {
          h: 'where 절: 경계가 많아지면 더 읽기 쉽게',
          html: `<p>경계가 여러 개거나 복잡해지면, 함수 시그니처 뒤에 <code>where</code> 절로 따로 빼서 쓸 수 있어요. 기능은 똑같고, 가독성만 좋아져요.</p>`,
          code: {
            label: 'where_clause.rs',
            lang: 'rust',
            src: `fn show_max<T>(list: &[T]) -> T
where
    T: PartialOrd + Copy,
{
    let mut max = list[0];
    for &item in list {
        if item > max { max = item; }
    }
    max
}

fn main() {
    println!("{}", show_max(&[10, 30, 20]));
}`,
            out: `30`
          },
          after: `<div class="note"><b>정리</b> — <code>T: A + B</code>는 "T가 A 트레이트와 B 트레이트를 모두 구현해야 한다"는 뜻이에요. 트레이트 경계 덕분에 "아무 타입이나 다 되는" 무분별한 제네릭이 아니라, "이 능력을 가진 타입만" 받도록 컴파일 타임에 안전하게 제한할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>fn largest<T: PartialOrd>(list: &[T]) -> T</code>에서 <code>T: PartialOrd</code>가 뜻하는 것은?',
          'T는 반드시 PartialOrd 트레이트를 구현해야 한다', ['T는 반드시 정수여야 한다', 'T는 복사할 수 없다', 'PartialOrd라는 이름의 구조체를 의미'],
          '<code>T: 트레이트이름</code>은 "T가 그 트레이트를 구현해야만 이 함수를 쓸 수 있다"는 트레이트 경계(bound)예요.',
          '콜론 뒤에 오는 게 "요구 조건"이에요.'
        ),
        () => ({
          type: 'blank',
          q: `여러 트레이트 경계를 동시에 요구할 때 트레이트 이름 사이에 쓰는 기호를 쓰세요. (예: T: PartialOrd ___ Copy)`,
          prefix: 'T: PartialOrd ', suffix: ' Copy', accept: ['+'], placeholder: '기호',
          why: '<code>+</code>로 여러 트레이트 경계를 동시에 요구할 수 있어요.',
          hint: '"그리고"를 뜻하는 기호예요.'
        }),
        () => makeChoice(
          '트레이트 경계가 많아졌을 때 함수 시그니처를 더 읽기 쉽게 만드는 문법은?',
          'where 절', ['if 절', 'match 절', 'impl 절'],
          '<code>where</code> 절은 경계 목록을 함수 시그니처 뒤로 분리해서 가독성을 높여줘요.',
          '기능은 T: 트레이트로 바로 쓰는 것과 동일해요.'
        ),
        () => makeChoice(
          '제네릭 T에 트레이트 경계를 걸지 않으면 생기는 문제는?',
          'T에 대해 비교, 출력 등 아무 기능도 쓸 수 없다', ['모든 타입에 자동으로 모든 기능이 부여된다', '컴파일이 더 느려질 뿐 기능은 그대로다', 'T는 항상 i32로 취급된다'],
          '경계가 없는 T는 아무 능력도 없다고 가정되어, > 비교나 {} 출력 같은 기능조차 쓸 수 없어요.',
          '트레이트 경계는 "이 타입엔 이런 기능이 있다"를 컴파일러에게 보장해주는 역할이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>PartialOrd</code>와 <code>Copy</code> 경계를 가진 제네릭 함수 <code>show_max<T></code>를 <code>where</code> 절을 사용해서 시그니처만 작성하세요. (본문은 <code>{}</code>만)',
          starter: '',
          rows: 4,
          placeholder: 'fn show_max<T>(list: &[T]) -> T\nwhere\n    T: PartialOrd + Copy,\n{}',
          accept: ['fn show_max<T>(list: &[T]) -> T\nwhere\n    T: PartialOrd + Copy,\n{}'],
          why: 'where 절로 T: PartialOrd + Copy 경계를 함수 시그니처 뒤에 분리해서 썼어요.',
          hint: 'fn show_max<T>(list: &[T]) -> T where T: PartialOrd + Copy, {}'
        }),
      ],
      boss: () => {
        const arr = [randInt(1, 99), randInt(1, 99), randInt(1, 99), randInt(1, 99)];
        return {
          type: 'blank',
          q: `<code>fn show_max<T>(list: &[T]) -> T where T: PartialOrd + Copy, { let mut max = list[0]; for &item in list { if item > max { max = item; } } max } println!("{}", show_max(&[${arr.join(', ')}]));</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(Math.max(...arr))], placeholder: '숫자',
          why: `where 절로 정의된 show_max도 동일하게 가장 큰 값 ${Math.max(...arr)}을 찾아요.`,
          hint: 'where 절 문법만 다를 뿐 동작은 T: 경계 방식과 같아요.'
        };
      }
    },
    {
      id: 'traitsDefiningImplementing',
      title: '트레이트 정의와 구현',
      ready: true,
      summary: '여러 타입이 공통으로 가질 수 있는 행동(메서드 시그니처)을 트레이트로 정의해요.',
      goals: ['trait로 공통 행동 정의하기', 'impl Trait for 타입으로 구현하기', '서로 다른 타입이 같은 트레이트 공유하기'],
      blocks: [
        {
          h: 'trait: "이런 메서드가 있어야 한다"는 약속',
          html: `<p><code>trait</code>는 여러 타입이 공통으로 구현해야 할 메서드의 이름과 시그니처만 정의해요. 실제 구현은 각 타입이 <code>impl 트레이트 for 타입</code>으로 채워 넣어요.</p>`,
          code: {
            label: 'trait_define.rs',
            lang: 'rust',
            src: `trait Speak {
    fn say(&self) -> String;
}

struct Dog;

impl Speak for Dog {
    fn say(&self) -> String {
        String::from("멍멍!")
    }
}

fn main() {
    let d = Dog;
    println!("{}", d.say());
}`,
            out: `멍멍!`
          }
        },
        {
          h: '여러 타입이 같은 트레이트를 각자 다르게 구현',
          html: `<p>서로 다른 구조체가 같은 트레이트를 구현하면, 각자 다른 방식으로 "같은 이름의 메서드"를 가질 수 있어요. 이게 다형성(polymorphism)의 Rust식 표현이에요.</p>`,
          code: {
            label: 'trait_multi_impl.rs',
            lang: 'rust',
            src: `trait Speak {
    fn say(&self) -> String;
}

struct Dog;
struct Cat;

impl Speak for Dog {
    fn say(&self) -> String { String::from("멍멍!") }
}
impl Speak for Cat {
    fn say(&self) -> String { String::from("야옹!") }
}

fn main() {
    println!("{}", Dog.say());
    println!("{}", Cat.say());
}`,
            out: `멍멍!\n야옹!`
          },
          after: `<div class="note"><b>정리</b> — 트레이트는 다른 언어의 "인터페이스"와 비슷한 역할을 해요. 타입이 어떤 트레이트를 구현했는지가, 그 타입이 "무엇을 할 수 있는지"를 나타내요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '트레이트(trait)의 역할을 가장 잘 설명한 것은?',
          '여러 타입이 공통으로 구현해야 할 메서드의 이름과 시그니처를 정의한다', ['구체적인 필드 값을 저장한다', '메모리 할당 방식을 결정한다', '변수의 가변성을 결정한다'],
          '트레이트는 "이런 메서드를 가져야 한다"는 약속(계약)만 정의하고, 실제 구현은 각 타입이 채워요.',
          '다른 언어의 인터페이스와 비슷한 개념이에요.'
        ),
        () => ({
          type: 'blank',
          q: `특정 타입이 트레이트를 구현할 때 쓰는 문법을 쓰세요. (impl 트레이트이름 ___ 타입이름)`,
          prefix: 'impl Speak ', suffix: ' Dog', accept: ['for'], placeholder: '키워드',
          why: '<code>impl 트레이트 for 타입</code> 형태로 특정 타입에 트레이트를 구현해요.',
          hint: '"~를 위해"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>trait Speak { fn say(&self) -> String; }</code>에서 <code>impl Speak for Dog</code>가 반드시 구현해야 하는 것은?',
          'say 메서드', ['bark라는 새 메서드', 'Dog 구조체의 필드', 'Cat 구조체'],
          'impl Speak for Dog는 트레이트가 정의한 say 메서드를 반드시 구현해야 해요.',
          '트레이트에 선언된 메서드 시그니처가 "구현 의무"예요.'
        ),
        () => makeChoice(
          '서로 다른 구조체 Dog, Cat이 같은 트레이트 Speak를 구현하면?',
          '각자 다른 방식으로 같은 이름의 메서드(say)를 가질 수 있다', ['Dog와 Cat이 하나의 타입으로 합쳐진다', 'Cat의 구현이 Dog에도 자동 적용된다', '컴파일 오류가 난다'],
          '같은 트레이트를 구현해도 각 타입은 자신만의 방식으로 메서드를 구현할 수 있어요. 이것이 다형성이에요.',
          'Dog.say()와 Cat.say()는 서로 다른 문자열을 반환할 수 있어요.'
        ),
        () => ({
          type: 'code',
          q: '<code>fn area(&self) -> f64;</code>를 요구하는 트레이트 <code>Shape</code>를 정의하세요.',
          starter: '',
          rows: 3,
          placeholder: 'trait Shape {\n    fn area(&self) -> f64;\n}',
          accept: ['trait Shape {\n    fn area(&self) -> f64;\n}'],
          why: 'trait 이름 { 메서드 시그니처; } 형태로 정의해요.',
          hint: 'trait Shape { fn area(&self) -> f64; }'
        }),
      ],
      boss: () => makeChoice(
        '<code>trait Speak { fn say(&self) -> String; } struct Dog; impl Speak for Dog { fn say(&self) -> String { String::from("멍멍!") } }</code>일 때 <code>Dog.say()</code>의 결과는?',
        '멍멍!', ['야옹!', 'Dog', '컴파일 오류'],
        'Dog가 구현한 say 메서드가 "멍멍!"을 반환하도록 정의되어 있으므로 그대로 출력돼요.',
        'impl Speak for Dog 안의 실제 구현 내용을 확인해보세요.'
      )
    },
    {
      id: 'traitDefaultMethods',
      title: '트레이트의 기본 메서드',
      ready: true,
      summary: '트레이트에 기본 구현을 넣어두면, 필요한 타입만 오버라이드할 수 있어요.',
      goals: ['트레이트에 기본 구현 작성하기', '구현체가 기본값을 그대로 쓰기', '필요할 때만 오버라이드하기'],
      blocks: [
        {
          h: '기본 메서드: 미리 구현해두고 재사용',
          html: `<p>트레이트 메서드에 본문을 미리 작성해두면, 그게 <b>기본 구현(default implementation)</b>이 돼요. <code>impl Trait for 타입</code>에서 따로 구현하지 않으면 이 기본 구현이 그대로 쓰여요.</p>`,
          code: {
            label: 'trait_default.rs',
            lang: 'rust',
            src: `trait Greet {
    fn name(&self) -> String;
    fn greet(&self) -> String {
        format!("안녕, {}!", self.name())
    }
}

struct Person { n: String }
impl Greet for Person {
    fn name(&self) -> String { self.n.clone() }
    // greet()은 구현 안 함 → 기본 구현 사용
}

fn main() {
    let p = Person { n: String::from("지수") };
    println!("{}", p.greet());
}`,
            out: `안녕, 지수!`
          }
        },
        {
          h: '필요하면 오버라이드도 가능',
          html: `<p>기본 구현이 마음에 안 들면, <code>impl</code> 블록에서 같은 이름의 메서드를 직접 작성해서 <b>덮어쓸(override)</b> 수 있어요.</p>`,
          code: {
            label: 'trait_override.rs',
            lang: 'rust',
            src: `trait Greet {
    fn name(&self) -> String;
    fn greet(&self) -> String {
        format!("안녕, {}!", self.name())
    }
}

struct Robot { n: String }
impl Greet for Robot {
    fn name(&self) -> String { self.n.clone() }
    fn greet(&self) -> String {
        format!("BEEP BOOP {} BEEP", self.name())
    }
}

fn main() {
    let r = Robot { n: String::from("R2") };
    println!("{}", r.greet());
}`,
            out: `BEEP BOOP R2 BEEP`
          },
          after: `<div class="note"><b>정리</b> — 기본 메서드 덕분에, 트레이트를 구현하는 여러 타입이 대부분 같은 동작을 공유하면서도 필요한 타입만 다르게 동작하게 만들 수 있어요. 코드 중복을 줄이는 좋은 방법이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>trait Greet { fn name(&self) -> String; fn greet(&self) -> String { format!("안녕, {}!", self.name()) } } struct Person { n: String } impl Greet for Person { fn name(&self) -> String { self.n.clone() } } let p = Person { n: String::from("${name}") }; println!("{}", p.greet());</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`안녕, ${name}!`], placeholder: '출력 결과',
            why: `Person은 greet()을 오버라이드하지 않았으므로 기본 구현이 쓰여서 "안녕, ${name}!"이 출력돼요.`,
            hint: 'greet()을 구현하지 않은 타입은 트레이트의 기본 구현을 그대로 써요.'
          };
        },
        () => makeChoice(
          '트레이트 메서드에 본문을 미리 작성해두면?',
          '구현체가 따로 작성하지 않으면 그 기본 구현이 쓰인다', ['모든 구현체가 반드시 다시 작성해야 한다', '컴파일 오류가 난다', '그 메서드는 호출할 수 없게 된다'],
          '본문이 있는 트레이트 메서드는 기본 구현이 되어, 구현체가 따로 작성하지 않아도 자동으로 쓰여요.',
          '"기본값"이라는 개념을 메서드 단위로 제공하는 것과 같아요.'
        ),
        () => ({
          type: 'blank',
          q: `트레이트의 기본 구현을 특정 타입에서 다시 작성해서 덮어쓰는 것을 영어로 뭐라고 하나요?`,
          prefix: '', suffix: '', accept: ['override'], placeholder: '영어 단어',
          why: '기존 기본 구현을 특정 타입에서 다시 정의하는 것을 오버라이드(override)라고 해요.',
          hint: '"덮어쓰다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'Robot이 greet()을 직접 구현하면 어떻게 되나요?',
          'Robot.greet()을 호출하면 Robot이 직접 쓴 구현이 실행된다', ['기본 구현과 Robot의 구현이 둘 다 실행된다', '컴파일 오류가 난다', '기본 구현만 계속 쓰인다'],
          '타입이 메서드를 직접 구현하면 그 구현이 기본 구현을 대체해요.',
          '직접 작성한 구현이 항상 기본 구현보다 우선해요.'
        ),
        () => ({
          type: 'code',
          q: '<code>name(&self) -> String</code>은 구현을 요구하고, <code>greet(&self) -> String</code>은 <code>format!("안녕, {}!", self.name())</code>을 기본 구현으로 갖는 트레이트 <code>Greet</code>를 정의하세요.',
          starter: '',
          rows: 5,
          placeholder: 'trait Greet {\n    fn name(&self) -> String;\n    fn greet(&self) -> String {\n        format!("안녕, {}!", self.name())\n    }\n}',
          accept: ['trait Greet {\n    fn name(&self) -> String;\n    fn greet(&self) -> String {\n        format!("안녕, {}!", self.name())\n    }\n}'],
          why: 'name은 시그니처만, greet은 본문이 있는 기본 구현으로 작성해요.',
          hint: '본문이 있으면 기본 구현, 세미콜론만 있으면 반드시 구현해야 하는 시그니처예요.'
        }),
      ],
      boss: () => {
        const name = pick(['R2', 'C3', 'K9']);
        return {
          type: 'blank',
          q: `<code>trait Greet { fn name(&self) -> String; fn greet(&self) -> String { format!("안녕, {}!", self.name()) } } struct Robot { n: String } impl Greet for Robot { fn name(&self) -> String { self.n.clone() } fn greet(&self) -> String { format!("BEEP {} BOOP", self.name()) } } let r = Robot { n: String::from("${name}") }; println!("{}", r.greet());</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`BEEP ${name} BOOP`], placeholder: '출력 결과',
          why: `Robot이 greet()을 직접 오버라이드했으므로 기본 구현 대신 "BEEP ${name} BOOP"가 출력돼요.`,
          hint: 'Robot의 impl 블록 안에 있는 greet 구현을 확인해보세요.'
        };
      }
    },
    {
      id: 'traitObjectsDyn',
      title: '트레이트 객체와 dyn',
      ready: true,
      summary: '서로 다른 타입을 같은 트레이트로 묶어 다루는 dyn Trait를 배워요.',
      goals: ['Box<dyn Trait>로 여러 타입 담기', '정적 디스패치 vs 동적 디스패치', '언제 dyn이 필요한지'],
      blocks: [
        {
          h: 'dyn Trait: "이 트레이트를 구현한 무언가"',
          html: `<p>같은 트레이트를 구현한 서로 다른 타입(Dog, Cat 등)을 하나의 벡터에 함께 담고 싶다면, <code>Box&lt;dyn Trait&gt;</code>를 써요. <code>dyn</code>은 "구체적인 타입은 실행 중에 결정된다"는 뜻이에요.</p>`,
          code: {
            label: 'trait_object.rs',
            lang: 'rust',
            src: `trait Speak {
    fn say(&self) -> String;
}
struct Dog;
struct Cat;
impl Speak for Dog { fn say(&self) -> String { String::from("멍멍!") } }
impl Speak for Cat { fn say(&self) -> String { String::from("야옹!") } }

fn main() {
    let animals: Vec<Box<dyn Speak>> = vec![Box::new(Dog), Box::new(Cat)];
    for a in &animals {
        println!("{}", a.say());
    }
}`,
            out: `멍멍!\n야옹!`
          }
        },
        {
          h: '정적 디스패치 vs 동적 디스패치',
          html: `<p>제네릭(<code>T: Trait</code>)은 컴파일 타임에 타입이 정해지는 <b>정적 디스패치</b>라 빠르지만, 한 곳에 여러 타입을 섞어 담을 수 없어요. <code>dyn Trait</code>는 실행 중에 어떤 타입인지 확인하는 <b>동적 디스패치</b>라 약간의 실행 비용이 있지만, 여러 타입을 유연하게 하나로 묶을 수 있어요.</p>`,
          code: {
            label: 'dispatch_compare.rs',
            lang: 'rust',
            src: `fn static_greet<T: Speak>(a: &T) {
    println!("{}", a.say());
}
fn dynamic_greet(a: &dyn Speak) {
    println!("{}", a.say());
}
trait Speak { fn say(&self) -> String; }
struct Dog;
impl Speak for Dog { fn say(&self) -> String { String::from("멍멍!") } }

fn main() {
    static_greet(&Dog);
    dynamic_greet(&Dog);
}`,
            out: `멍멍!\n멍멍!`
          },
          after: `<div class="note"><b>정리</b> — "이 함수는 항상 같은 타입 하나만 다룬다"면 제네릭(정적 디스패치)을, "실행 중에 서로 다른 타입들을 하나의 목록으로 다뤄야 한다"면 dyn Trait(동적 디스패치)를 선택해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '서로 다른 타입(Dog, Cat)을 같은 벡터에 함께 담고 싶을 때 쓰는 타입은?',
          'Vec<Box<dyn Speak>>', ['Vec<Speak>', 'Vec<T: Speak>', 'Vec<Dog, Cat>'],
          '<code>Box&lt;dyn Speak&gt;</code>로 감싸면 Speak를 구현한 서로 다른 타입들을 하나의 벡터에 담을 수 있어요.',
          'dyn은 "실행 중에 정해지는 구체적 타입"을 뜻해요.'
        ),
        () => makeChoice(
          '제네릭(정적 디스패치)과 dyn Trait(동적 디스패치)의 차이는?',
          '정적 디스패치는 컴파일 타임에, 동적 디스패치는 실행 중에 실제 타입이 결정된다', ['정적 디스패치는 항상 더 느리다', '동적 디스패치는 제네릭보다 항상 안전하다', '둘은 완전히 같은 방식으로 동작한다'],
          '정적 디스패치(제네릭)는 컴파일 타임에 타입별 코드가 생성되고, 동적 디스패치(dyn)는 실행 중에 어떤 구현을 호출할지 결정돼요.',
          '"정적"은 컴파일 시점, "동적"은 실행 시점을 뜻해요.'
        ),
        () => ({
          type: 'blank',
          q: `여러 타입을 유연하게 하나로 묶고 싶을 때 쓰는, "실행 중에 타입이 결정된다"는 뜻의 키워드를 쓰세요.`,
          prefix: 'Box<', suffix: ' Speak>', accept: ['dyn'], placeholder: '키워드',
          why: '<code>dyn</code>은 트레이트 객체(동적 디스패치)를 나타내는 키워드예요.',
          hint: '"동적인(dynamic)"의 줄임말이에요.'
        }),
        () => makeChoice(
          'dyn Trait를 선택해야 하는 상황은?',
          '실행 중에 서로 다른 타입들을 하나의 목록으로 함께 다뤄야 할 때', ['항상 하나의 고정된 타입만 다룰 때', '속도가 가장 중요할 때', '트레이트가 필요 없을 때'],
          '여러 구체 타입을 함께 담아야 하는 유연성이 필요할 때 dyn Trait가 적합해요. 성능이 최우선이고 타입이 고정이라면 제네릭이 더 낫아요.',
          '유연성 vs 약간의 성능, 이 트레이드오프를 기억하세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Dog</code>와 <code>Cat</code>(둘 다 Speak 구현)을 <code>Vec<Box<dyn Speak>></code>에 담아 각각 <code>say()</code>를 호출해 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'let animals: Vec<Box<dyn Speak>> = vec![Box::new(Dog), Box::new(Cat)];\nfor a in &animals {\n    println!("{}", a.say());\n}',
          accept: ['let animals: Vec<Box<dyn Speak>> = vec![Box::new(Dog), Box::new(Cat)];\nfor a in &animals {\n    println!("{}", a.say());\n}'],
          why: 'Box::new(...)로 각 타입을 감싸서 Vec<Box<dyn Speak>>에 함께 담고, 반복하며 say()를 호출해요.',
          hint: 'vec![Box::new(Dog), Box::new(Cat)] 다음 for a in &animals { a.say() }'
        }),
      ],
      boss: () => makeChoice(
        '다음 중 컴파일 오류가 나는 코드는?',
        'trait Speak { fn say(&self) -> String; } struct Dog; struct Cat; let animals: Vec<Speak> = vec![Dog, Cat];',
        ['trait Speak { fn say(&self) -> String; } struct Dog; struct Cat; let animals: Vec<Box<dyn Speak>> = vec![Box::new(Dog), Box::new(Cat)];', 'trait Speak { fn say(&self) -> String; } fn greet<T: Speak>(a: &T) { a.say(); }', 'trait Speak { fn say(&self) -> String; } fn greet(a: &dyn Speak) { a.say(); }'],
        'Vec<Speak>처럼 dyn 없이 트레이트 이름을 바로 타입으로 쓰는 것은 크기가 정해지지 않아서 컴파일 오류가 나요. dyn Trait나 Box<dyn Trait>로 감싸야 해요.',
        '트레이트 자체는 크기가 정해지지 않은 타입이라 dyn이나 제네릭으로 감싸야 해요.'
      )
    },
    {
      id: 'lifetimesBasics',
      title: '라이프타임 기초',
      ready: true,
      summary: '참조가 얼마나 오래 유효한지를 컴파일러에게 알려주는 라이프타임을 배워요.',
      goals: ['라이프타임이 필요한 이유', "'a 문법으로 라이프타임 표시하기", '여러 참조의 라이프타임 관계'],
      blocks: [
        {
          h: '라이프타임이 필요한 이유',
          html: `<p>함수가 참조를 반환할 때, 그 참조가 "어느 입력만큼 오래 살아있는지" 컴파일러가 스스로 알 수 없는 경우가 있어요. 이럴 때 <code>'a</code> 같은 라이프타임 표시로 "이 참조들은 서로 연관된 기간 동안 유효하다"고 알려줘야 해요.</p>`,
          code: {
            label: 'lifetime_basic.rs',
            lang: 'rust',
            src: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let s1 = String::from("hello");
    let s2 = String::from("hi");
    println!("{}", longest(&s1, &s2));
}`,
            out: `hello`
          }
        },
        {
          h: "'a는 '무엇을 저장하는지'가 아니라 '관계'를 나타내요",
          html: `<p><code>'a</code> 자체는 구체적인 기간을 정하는 게 아니라, "반환되는 참조는 x와 y 중 더 짧게 살아있는 쪽만큼만 유효하다"는 <b>관계</b>를 표현해요. 실제 기간은 함수를 호출하는 쪽의 상황에 따라 컴파일러가 계산해요.</p>`,
          code: {
            label: 'lifetime_relation.rs',
            lang: 'rust',
            src: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let s1 = String::from("긴 문자열입니다");
    let result;
    {
        let s2 = String::from("짧음");
        result = longest(&s1, &s2);
        println!("{}", result); // s2가 살아있는 동안만 안전
    }
}`,
            out: `긴 문자열입니다`
          },
          after: `<div class="note"><b>정리</b> — 라이프타임은 새로운 값을 만들지 않아요. "이미 존재하는 참조들의 유효 기간 관계"를 컴파일러에게 명시적으로 알려주는 주석 같은 역할이에요. 이 덕분에 댕글링 참조를 컴파일 타임에 확실히 막을 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '라이프타임 표시(<code>\'a</code>)가 하는 역할은?',
          '참조들의 유효 기간 사이의 관계를 컴파일러에게 알려준다', ['변수의 값을 저장하는 새로운 메모리를 만든다', '변수를 항상 더 오래 살아있게 만든다', '가비지 컬렉션을 실행한다'],
          "'a는 새로운 메모리나 값을 만드는 게 아니라, 참조들이 서로 어떻게 연관되어 유효한지를 나타내는 표시예요.",
          '"길이를 정한다"가 아니라 "관계를 설명한다"는 점이 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>fn longest<'a>(x: &'a str, y: &'a str) -> &'a str { if x.len() > y.len() { x } else { y } }</code>일 때 <code>longest("hello", "hi")</code>의 결과는? (그대로 입력)`,
          prefix: '', suffix: '', accept: ['hello'], placeholder: '출력 결과',
          why: '"hello"(5글자)가 "hi"(2글자)보다 길어서 x인 "hello"가 반환돼요.',
          hint: '더 긴 문자열을 반환하는 함수예요.'
        }),
        () => makeChoice(
          '함수가 참조를 매개변수로 받아 참조를 반환할 때 라이프타임 표시가 필요해지는 경우는?',
          '반환하는 참조가 어느 입력의 라이프타임과 연관되는지 컴파일러가 스스로 알 수 없을 때', ['항상 모든 함수에 필요하다', '값을 반환하지 않는 함수에서만 필요하다', '제네릭을 쓰지 않는 함수에서만 필요하다'],
          '입력이 여러 개의 참조이고 그중 무엇을 반환할지가 실행 시점에 결정될 때, 컴파일러가 관계를 추론하지 못해 명시가 필요해요.',
          '입력이 하나뿐이거나 관계가 명확하면 생략(elision) 규칙으로 자동 추론되기도 해요.'
        ),
        () => makeChoice(
          '라이프타임 표시를 잘못 쓰거나 관계를 어기면 어떤 일이 생기나요?',
          '컴파일 오류로 미리 잡힌다', ['런타임에 크래시가 난다', '조용히 무시되고 실행된다', '자동으로 값이 복사되어 해결된다'],
          '라이프타임 규칙 위반은 borrow checker가 컴파일 타임에 잡아내서, 실행 전에 오류로 알려줘요.',
          '이것도 borrow checker가 하는 컴파일 타임 검사의 일부예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>x</code>, <code>y</code> 두 <code>&str</code> 중 더 긴 것을 반환하는 함수 <code>longest</code>를 라이프타임 <code>\'a</code>를 사용해서 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    if x.len() > y.len() { x } else { y }\n}",
          accept: ["fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    if x.len() > y.len() { x } else { y }\n}"],
          why: "'a는 두 매개변수와 반환값이 같은 라이프타임 관계를 가진다는 것을 나타내요.",
          hint: "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str { if x.len() > y.len() { x } else { y } }"
        }),
      ],
      boss: () => {
        const utf8Len = s => {
          let n = 0;
          for (const ch of s) {
            const cp = ch.codePointAt(0);
            n += cp < 0x80 ? 1 : cp < 0x800 ? 2 : cp < 0x10000 ? 3 : 4;
          }
          return n;
        };
        const a = pick(['hello world', 'hi', '반가워요', '안녕']);
        const b = pick(['world', 'yo', '잘가요오', '또봐']);
        const result = utf8Len(a) >= utf8Len(b) ? a : b;
        return {
          type: 'blank',
          q: `<code>fn longest<'a>(x: &'a str, y: &'a str) -> &'a str { if x.len() >= y.len() { x } else { y } } println!("{}", longest("${a}", "${b}"));</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [result], placeholder: '출력 결과',
          why: `"${a}"와 "${b}" 중 바이트 길이가 더 길거나 같은(x 우선) 쪽인 "${result}"이 반환돼요.`,
          hint: '두 문자열의 길이를 비교해보세요.'
        };
      }
    },
    {
      id: 'lifetimeElisionPatterns',
      title: '라이프타임 생략 규칙과 흔한 패턴',
      ready: true,
      summary: '대부분의 경우 라이프타임을 안 적어도 되는 이유(생략 규칙)와, 구조체에서의 라이프타임을 배워요.',
      goals: ['라이프타임 생략(elision) 규칙', '입력이 하나면 생략 가능한 이유', '참조를 담는 구조체의 라이프타임'],
      blocks: [
        {
          h: '라이프타임 생략: 대부분은 안 적어도 돼요',
          html: `<p>참조를 다루는 함수라고 매번 <code>'a</code>를 적어야 하는 건 아니에요. 컴파일러는 몇 가지 흔한 패턴(생략 규칙)을 자동으로 적용해서, <b>입력이 참조 하나뿐이면</b> 굳이 쓰지 않아도 알아서 추론해줘요.</p>`,
          code: {
            label: 'lifetime_elision.rs',
            lang: 'rust',
            src: `// 아래 두 함수는 사실 동일해요(컴파일러가 생략 규칙으로 자동 추론)
fn first_word(s: &str) -> &str {
    s.split(' ').next().unwrap_or("")
}
// fn first_word<'a>(s: &'a str) -> &'a str { ... } 와 동일

fn main() {
    println!("{}", first_word("hello rust world"));
}`,
            out: `hello`
          }
        },
        {
          h: '참조를 담는 구조체는 라이프타임이 필요해요',
          html: `<p>구조체가 참조를 필드로 가지면, "그 구조체가 참조하는 데이터보다 오래 살아남으면 안 된다"는 관계를 명시해야 해요. 그래서 <code>struct 이름<'a> { 필드: &'a 타입 }</code>처럼 구조체에도 라이프타임을 붙여요.</p>`,
          code: {
            label: 'lifetime_struct.rs',
            lang: 'rust',
            src: `struct Excerpt<'a> {
    part: &'a str,
}

fn main() {
    let novel = String::from("Rust는 안전합니다. 그리고 빠릅니다.");
    let first_sentence = novel.split('.').next().unwrap();
    let excerpt = Excerpt { part: first_sentence };
    println!("{}", excerpt.part);
}`,
            out: `Rust는 안전합니다`
          },
          after: `<div class="note"><b>정리</b> — 함수 입력이 참조 하나뿐이거나, <code>&self</code>를 받는 메서드라면 대부분 생략 규칙 덕분에 라이프타임을 안 적어도 돼요. 하지만 여러 참조 중 "어느 것과 연관되는지" 애매한 경우나, 참조를 담는 구조체를 정의할 때는 명시가 꼭 필요해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '함수의 입력이 참조 하나뿐일 때 라이프타임 표시를 생략할 수 있는 이유는?',
          '컴파일러의 생략 규칙이 자동으로 라이프타임을 추론해주기 때문에', ['그런 함수는 라이프타임이 아예 필요 없기 때문에', '입력이 하나면 항상 &self이기 때문에', 'Rust 최신 버전에서는 라이프타임이 폐지되었기 때문에'],
          '컴파일러는 몇 가지 흔한 패턴(생략 규칙)을 인식해서, 애매하지 않은 경우엔 라이프타임을 자동으로 추론해줘요.',
          '입력이 하나뿐이면 반환값도 그것과 같은 라이프타임일 수밖에 없다는 게 규칙의 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `참조를 필드로 갖는 구조체를 정의할 때, 구조체 이름 뒤에 어떤 것을 표시해야 하나요? (예: struct Excerpt<___> { part: &'a str })`,
          prefix: 'struct Excerpt<', suffix: '> { part: &\'a str }', accept: ["'a"], placeholder: '표시',
          why: "참조를 담는 구조체는 struct 이름<'a> { 필드: &'a 타입 } 형태로 라이프타임을 명시해야 해요.",
          hint: '작은따옴표(\')로 시작하는 표시예요.'
        }),
        () => makeChoice(
          '<code>struct Excerpt<\'a> { part: &\'a str }</code>가 보장하는 것은?',
          'Excerpt 인스턴스가 part가 가리키는 데이터보다 오래 살아남지 않는다', ['part가 항상 새로운 String을 복사해서 저장한다', 'Excerpt는 값을 저장할 수 없다', 'part는 항상 정적(static) 문자열이어야 한다'],
          "라이프타임 'a는 Excerpt가 참조하는 데이터가 살아있는 동안만 Excerpt도 유효하다는 관계를 컴파일러가 강제하도록 해요.",
          '구조체가 참조보다 오래 살아남으면 댕글링 참조가 되니까요.'
        ),
        () => makeChoice(
          '메서드에서 <code>&self</code>를 받을 때 대부분 라이프타임을 생략할 수 있는 이유는?',
          '반환되는 참조가 self와 연관된다고 컴파일러가 추론하는 규칙이 있기 때문에', ['self는 라이프타임 개념이 아예 적용되지 않기 때문에', '메서드는 항상 값을 복사해서 반환하기 때문에', 'self는 항상 정적 수명을 갖기 때문에'],
          '생략 규칙 중 하나로, &self를 받는 메서드는 반환하는 참조의 라이프타임이 self와 같다고 자동으로 추론돼요.',
          '메서드에 특화된 생략 규칙이 하나 더 있다고 기억하면 돼요.'
        ),
        () => ({
          type: 'code',
          q: '<code>&str</code>을 필드로 갖는 구조체 <code>Excerpt<\'a></code>를 정의하세요. (필드 이름: part)',
          starter: '',
          rows: 3,
          placeholder: "struct Excerpt<'a> {\n    part: &'a str,\n}",
          accept: ["struct Excerpt<'a> {\n    part: &'a str,\n}"],
          why: "참조 필드를 가진 구조체는 struct 이름<'a> { 필드: &'a 타입 } 형태로 정의해요.",
          hint: "struct Excerpt<'a> { part: &'a str, }"
        }),
      ],
      boss: () => makeChoice(
        '다음 중 라이프타임 표시를 생략해도 컴파일되는(생략 규칙이 적용되는) 함수 시그니처는?',
        'fn first_word(s: &str) -> &str',
        ["struct Excerpt { part: &str }", "fn longest(x: &str, y: &str) -> &str", "fn pick_one(a: &str, b: &str, c: bool) -> &str"],
        '입력이 참조 하나(s: &str)뿐이면 생략 규칙이 자동으로 반환값의 라이프타임을 s와 같다고 추론해줘요. 반면 참조가 여러 개이거나(longest, pick_one) 구조체가 참조를 담는 경우(Excerpt)는 명시가 필요해요.',
        '입력 참조가 정확히 하나뿐인 경우가 생략 규칙이 적용되는 대표적인 패턴이에요.'
      )
    },
    {
      id: 'smartPointerBox',
      title: '스마트 포인터: Box<T>',
      ready: true,
      summary: '값을 힙에 저장하는 가장 단순한 스마트 포인터, Box를 배워요.',
      goals: ['Box<T>로 값을 힙에 저장하기', '크기를 알 수 없는 타입(재귀 타입) 감싸기', 'Box의 역참조(*)'],
      blocks: [
        {
          h: 'Box<T>: 값을 힙에 담기',
          html: `<p>기본적으로 Rust 값은 스택에 저장돼요. <code>Box::new(값)</code>은 그 값을 힙에 저장하고, 힙 위치를 가리키는 포인터만 스택에 남겨요. 값이 아주 크거나, 크기를 컴파일 타임에 알 수 없을 때 유용해요.</p>`,
          code: {
            label: 'box_basic.rs',
            lang: 'rust',
            src: `fn main() {
    let b = Box::new(5);
    println!("{}", *b); // *로 역참조해서 안의 값을 꺼냄
}`,
            out: `5`
          }
        },
        {
          h: 'Box가 필요한 대표적인 경우: 재귀 타입',
          html: `<p>자기 자신을 필드로 갖는 타입(연결 리스트 등)은 크기를 컴파일 타임에 알 수 없어서 그냥은 정의할 수 없어요. <code>Box&lt;T&gt;</code>는 항상 "포인터 크기"로 고정되어 있어서, 이런 재귀 타입을 가능하게 해줘요.</p>`,
          code: {
            label: 'box_recursive.rs',
            lang: 'rust',
            src: `enum List {
    Cons(i32, Box<List>),
    Nil,
}
use List::{Cons, Nil};

fn main() {
    let list = Cons(1, Box::new(Cons(2, Box::new(Nil))));
    if let Cons(v, _) = list {
        println!("{}", v);
    }
}`,
            out: `1`
          },
          after: `<div class="note"><b>정리</b> — Box는 특별한 능력(공유나 가변성 등)이 없는 "가장 단순한" 스마트 포인터예요. 오직 "값을 힙에 두겠다"는 목적 하나만 위해 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(1, 100);
          return {
            type: 'blank',
            q: `<code>let b = Box::new(${n}); println!("{}", *b);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `*b는 Box 안에 담긴 값을 꺼내므로 ${n}이 출력돼요.`,
            hint: '*(역참조)로 Box 안의 값을 꺼내요.'
          };
        },
        () => makeChoice(
          'Box<T>가 하는 일은?',
          '값을 힙에 저장하고, 그 위치를 가리키는 포인터를 남긴다', ['값을 여러 곳에서 동시에 공유 가능하게 만든다', '값을 불변에서 가변으로 바꾼다', '값을 자동으로 복사한다'],
          'Box는 스마트 포인터 중 가장 단순한 것으로, 오직 값을 힙에 저장하는 역할만 해요.',
          '공유(Rc)나 내부 가변성(RefCell) 같은 추가 기능은 없어요.'
        ),
        () => ({
          type: 'blank',
          q: `Box에 담긴 값을 꺼낼 때 앞에 붙이는 기호를 쓰세요. (예: ___b)`,
          prefix: '', suffix: 'b', accept: ['*'], placeholder: '기호',
          why: '<code>*</code>는 역참조 연산자로, Box나 참조가 가리키는 실제 값을 꺼내요.',
          hint: '곱셈 기호와 같은 모양이지만 여기선 역참조를 뜻해요.'
        }),
        () => makeChoice(
          '자기 자신을 필드로 갖는 재귀적인 enum/struct를 정의할 때 Box가 필요한 이유는?',
          'Box는 크기가 고정(포인터 크기)이라 무한히 커지는 크기 문제를 해결해준다', ['Box를 쓰면 재귀 호출 깊이 제한이 없어져서', 'Box가 자동으로 반복문으로 바꿔줘서', 'Box 없이도 항상 가능하지만 관습적으로 쓸 뿐이라서'],
          '재귀 타입은 Box 없이 정의하면 크기가 무한히 커져서 컴파일러가 크기를 계산할 수 없어요. Box는 항상 고정 크기의 포인터라서 이 문제를 해결해줘요.',
          '연결 리스트나 트리 구조를 Rust에서 만들 때 자주 나오는 패턴이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>10</code>을 <code>Box::new</code>로 힙에 저장하고, 역참조해서 출력하는 코드를 두 줄로 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'let b = Box::new(10);\nprintln!("{}", *b);',
          accept: ['let b = Box::new(10);\nprintln!("{}", *b);'],
          why: 'Box::new(10)으로 힙에 저장하고, *b로 역참조해서 값을 꺼내요.',
          hint: 'Box::new(10); println!("{}", *b);'
        }),
      ],
      boss: () => {
        const n = randInt(1, 50);
        const add = randInt(1, 50);
        return {
          type: 'blank',
          q: `<code>let b = Box::new(${n}); let result = *b + ${add}; println!("{}", result);</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(n + add)], placeholder: '숫자',
          why: `*b로 꺼낸 값 ${n}에 ${add}를 더하면 ${n + add}예요.`,
          hint: '역참조한 값은 평범한 정수처럼 계산에 쓸 수 있어요.'
        };
      }
    },
    {
      id: 'smartPointerRcRefCell',
      title: '스마트 포인터: Rc와 RefCell',
      ready: true,
      summary: '값을 여러 곳에서 공유하는 Rc와, 불변 참조로도 값을 바꾸는 RefCell을 배워요.',
      goals: ['Rc<T>로 여러 소유자 만들기', 'RefCell<T>로 내부 가변성 얻기', 'Rc<RefCell<T>> 조합 이해하기'],
      blocks: [
        {
          h: 'Rc<T>: 참조 카운팅으로 값 공유하기',
          html: `<p>소유권 규칙상 값은 소유자가 하나뿐이지만, 여러 곳에서 "같이 소유"해야 할 때가 있어요. <code>Rc&lt;T&gt;</code>(Reference Counted)는 값을 참조하는 횟수를 세어, 마지막 소유자가 사라질 때만 값을 정리해요.</p>`,
          code: {
            label: 'rc_basic.rs',
            lang: 'rust',
            src: `use std::rc::Rc;

fn main() {
    let a = Rc::new(String::from("공유 데이터"));
    let b = Rc::clone(&a); // 복사가 아니라 참조 횟수만 +1
    println!("{} {}", a, b);
    println!("참조 횟수: {}", Rc::strong_count(&a));
}`,
            out: `공유 데이터 공유 데이터\n참조 횟수: 2`
          }
        },
        {
          h: 'RefCell<T>: 불변 참조로도 값을 바꾸는 내부 가변성',
          html: `<p>보통은 <code>&mut</code>이 있어야 값을 바꿀 수 있지만, <code>RefCell&lt;T&gt;</code>는 "빌림 규칙 검사를 컴파일 타임 대신 런타임에" 해서, 불변처럼 보이는 값도 <code>borrow_mut()</code>으로 바꿀 수 있게 해줘요. 이를 <b>내부 가변성(interior mutability)</b>이라고 해요.</p>`,
          code: {
            label: 'refcell_basic.rs',
            lang: 'rust',
            src: `use std::cell::RefCell;

fn main() {
    let cell = RefCell::new(5);
    *cell.borrow_mut() += 1;
    println!("{}", cell.borrow());
}`,
            out: `6`
          },
          after: `<div class="note"><b>정리</b> — <code>Rc&lt;RefCell&lt;T&gt;&gt;</code>는 "여러 곳에서 공유하면서 + 값도 바꿀 수 있는" 아주 흔한 조합이에요. 다만 RefCell은 규칙 위반(예: 이미 빌린 상태에서 또 borrow_mut)을 런타임에 panic으로 잡기 때문에, 컴파일 타임 검사보다 위험 부담이 있다는 점을 기억하세요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'Rc<T>가 필요한 상황은?',
          '같은 값을 여러 곳에서 함께 소유해야 할 때', ['값을 절대 바꾸지 않아야 할 때', '값을 힙이 아니라 스택에 두고 싶을 때', '스레드 간 값을 공유할 때(항상)'],
          'Rc는 하나의 값을 여러 소유자가 함께 참조 카운팅으로 공유할 수 있게 해줘요.',
          '소유권 규칙("하나의 소유자")의 예외를 만드는 방법이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>let a = Rc::new(5); let b = Rc::clone(&a); println!("{}", Rc::strong_count(&a));</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: ['2'], placeholder: '숫자',
          why: 'a와 b 둘 다 같은 값을 참조하고 있으므로 참조 횟수(strong_count)는 2예요.',
          hint: 'Rc::clone은 값을 복사하는 게 아니라 참조 횟수만 늘려요.'
        }),
        () => makeChoice(
          'RefCell<T>이 제공하는 "내부 가변성(interior mutability)"이 뜻하는 것은?',
          '불변 참조만 있어도 borrow_mut()으로 값을 바꿀 수 있다', ['모든 값을 항상 자유롭게 바꿀 수 있게 만든다', '값을 절대 바꿀 수 없게 만든다', '멀티스레드에서만 동작한다'],
          'RefCell은 빌림 규칙 검사를 런타임으로 미뤄서, 겉보기엔 불변인 값도 내부적으로 바꿀 수 있게 해줘요.',
          '컴파일 타임 대신 런타임에 규칙을 검사한다는 게 핵심이에요.'
        ),
        () => {
          const start = randInt(1, 20);
          const add = randInt(1, 10);
          return {
            type: 'blank',
            q: `<code>let cell = RefCell::new(${start}); *cell.borrow_mut() += ${add}; println!("{}", cell.borrow());</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(start + add)], placeholder: '숫자',
            why: `borrow_mut()으로 값을 ${add}만큼 늘리므로 ${start} + ${add} = ${start + add}이에요.`,
            hint: 'borrow_mut()은 RefCell 안의 값을 바꿀 수 있는 참조를 돌려줘요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>RefCell::new(5)</code>로 <code>cell</code>을 만들고, <code>borrow_mut()</code>으로 값을 1 늘린 뒤 출력하는 코드를 두 줄로 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'let cell = RefCell::new(5);\n*cell.borrow_mut() += 1;',
          accept: ['let cell = RefCell::new(5);\n*cell.borrow_mut() += 1;'],
          why: 'RefCell::new로 만든 뒤 borrow_mut()으로 내부 값을 바꿔요.',
          hint: 'RefCell::new(5); *cell.borrow_mut() += 1;'
        }),
      ],
      boss: () => {
        const start = randInt(1, 30);
        return {
          type: 'blank',
          q: `<code>use std::rc::Rc; use std::cell::RefCell; let shared = Rc::new(RefCell::new(${start})); let a = Rc::clone(&shared); *a.borrow_mut() += 10; println!("{}", shared.borrow());</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(start + 10)], placeholder: '숫자',
          why: `a와 shared는 Rc로 같은 RefCell을 공유하므로, a를 통해 바꾼 값(+10)이 shared에도 그대로 반영되어 ${start + 10}이에요.`,
          hint: 'Rc로 공유된 값은 어느 쪽을 통해 바꿔도 같은 데이터가 바뀌어요.'
        };
      }
    },
    {
      id: 'modulesAndVisibility',
      title: '모듈과 pub, use',
      ready: true,
      summary: 'mod로 코드를 구역화하고, pub/use로 공개 범위와 경로를 다루는 법을 배워요.',
      goals: ['mod로 모듈 만들기', 'pub으로 공개 범위 정하기', 'use로 경로 줄이기'],
      blocks: [
        {
          h: 'mod: 코드를 구역으로 나누기',
          html: `<p><code>mod 이름 { }</code>은 관련된 코드를 하나의 이름 공간으로 묶어요. 기본적으로 모듈 안의 항목은 <b>비공개(private)</b>라서, 모듈 밖에서 쓰려면 <code>pub</code>을 붙여야 해요.</p>`,
          code: {
            label: 'mod_basic.rs',
            lang: 'rust',
            src: `mod greetings {
    pub fn hello() -> String {
        String::from("안녕하세요!")
    }
}

fn main() {
    println!("{}", greetings::hello());
}`,
            out: `안녕하세요!`
          }
        },
        {
          h: 'use: 긴 경로를 짧게 줄이기',
          html: `<p>매번 <code>greetings::hello()</code>처럼 전체 경로를 쓰지 않고, <code>use greetings::hello;</code>로 가져오면 <code>hello()</code>만으로 호출할 수 있어요.</p>`,
          code: {
            label: 'use_basic.rs',
            lang: 'rust',
            src: `mod greetings {
    pub fn hello() -> String {
        String::from("안녕하세요!")
    }
}
use greetings::hello;

fn main() {
    println!("{}", hello());
}`,
            out: `안녕하세요!`
          },
          after: `<div class="note"><b>정리</b> — 큰 프로젝트에서는 파일 하나에 mod를 다 쓰지 않고, 파일/폴더 단위로 모듈을 나눠요(예: <code>mod greetings;</code>는 <code>greetings.rs</code> 파일을 모듈로 가져와요). 기본이 비공개(private)라는 규칙은 "꼭 필요한 것만 공개한다"는 캡슐화 원칙을 언어 차원에서 강제해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'Rust 모듈 안의 항목(함수, 구조체 등)의 기본 공개 범위는?',
          '비공개(private, 모듈 밖에서 접근 불가)', ['공개(public, 어디서든 접근 가능)', '읽기 전용(read-only)', '패키지 전체에 공개'],
          '모듈 안의 항목은 기본적으로 비공개라서, 모듈 밖에서 쓰려면 pub을 명시적으로 붙여야 해요.',
          '"필요한 것만 공개한다"는 원칙이 기본값이에요.'
        ),
        () => ({
          type: 'blank',
          q: `모듈 안의 함수를 모듈 밖에서도 쓸 수 있게 공개하려면, 함수 앞에 어떤 키워드를 붙여야 하나요?`,
          prefix: '', suffix: ' fn hello() -> String { ... }', accept: ['pub'], placeholder: '키워드',
          why: '<code>pub</code>을 붙여야 모듈 밖에서도 그 항목에 접근할 수 있어요.',
          hint: '"공개된"이라는 뜻의 영어 단어의 줄임말이에요.'
        }),
        () => makeChoice(
          '<code>use greetings::hello;</code> 이후에 <code>hello()</code>를 호출하면?',
          'greetings::hello()를 매번 쓰지 않고 hello()만으로 호출할 수 있다', ['greetings 모듈 전체가 삭제된다', 'hello 함수가 복사되어 두 개가 생긴다', '컴파일 오류가 난다'],
          'use는 긴 경로를 짧게 줄여서 그 이름만으로 바로 접근할 수 있게 해줘요.',
          '실제로 코드가 복사되는 게 아니라 "경로를 줄여쓰는" 것뿐이에요.'
        ),
        () => makeChoice(
          '<code>mod greetings { fn hello() -> String { ... } }</code>(pub 없이)를 <code>main</code>에서 <code>greetings::hello()</code>로 호출하면?',
          '비공개(private)라서 컴파일 오류가 난다', ['정상적으로 호출된다', '경고만 뜨고 정상 실행된다', '자동으로 pub이 추가된다'],
          'pub이 없으면 그 항목은 비공개라서 모듈 밖에서 접근하려고 하면 컴파일 오류가 나요.',
          'pub을 빠뜨리는 건 흔한 실수예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>math</code>라는 모듈 안에 <code>pub fn add(a: i32, b: i32) -> i32 { a + b }</code>를 정의하고, <code>main</code>에서 <code>math::add(1, 2)</code>를 호출해 출력하세요.',
          starter: '',
          rows: 6,
          placeholder: 'mod math {\n    pub fn add(a: i32, b: i32) -> i32 {\n        a + b\n    }\n}\n\nfn main() {\n    println!("{}", math::add(1, 2));\n}',
          accept: ['mod math {\n    pub fn add(a: i32, b: i32) -> i32 {\n        a + b\n    }\n}\n\nfn main() {\n    println!("{}", math::add(1, 2));\n}'],
          why: 'pub fn으로 공개한 함수를 모듈이름::함수이름()으로 호출해요.',
          hint: 'mod math { pub fn add(...) { ... } } 다음 math::add(1, 2)로 호출해요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 20);
        const b = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>mod math { pub fn add(a: i32, b: i32) -> i32 { a + b } } use math::add; fn main() { println!("{}", add(${a}, ${b})); }</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
          why: `use math::add;로 경로를 줄였으므로 add(${a}, ${b})는 math::add(${a}, ${b})와 같아서 ${a + b}가 출력돼요.`,
          hint: 'use로 가져온 함수는 이름만으로 바로 호출할 수 있어요.'
        };
      }
    },
    {
      id: 'cargoAndCrates',
      title: 'Cargo와 크레이트 생태계',
      ready: true,
      summary: 'Cargo.toml로 의존성을 관리하고, cargo 명령어와 crates.io 생태계를 이해해요.',
      goals: ['Cargo.toml의 역할', 'cargo build/run/test 차이', '외부 크레이트(예: serde) 추가하기'],
      blocks: [
        {
          h: 'Cargo.toml: 프로젝트의 설정 파일',
          html: `<p><code>Cargo.toml</code>은 프로젝트 이름, 버전, 그리고 <b>의존성(dependencies)</b> 목록을 담는 설정 파일이에요. 외부 라이브러리(크레이트)를 쓰려면 이 파일에 한 줄만 추가하면 돼요.</p>`,
          code: {
            label: 'Cargo.toml',
            lang: 'rust',
            src: `[package]
name = "my_app"
version = "0.1.0"
edition = "2021"

[dependencies]
serde = { version = "1.0", features = ["derive"] }`,
            out: `(설정 파일이라 실행 결과 없음)`
          }
        },
        {
          h: 'cargo 명령어와 crates.io',
          html: `<p><code>cargo build</code>는 컴파일만, <code>cargo run</code>은 빌드 후 바로 실행, <code>cargo test</code>는 테스트를 실행해요. <a href="https://crates.io" target="_blank" rel="noopener">crates.io</a>는 수만 개의 공개 크레이트(패키지)가 모인 저장소로, <code>serde</code>(직렬화), <code>tokio</code>(비동기 런타임) 같은 인기 크레이트를 의존성에 추가해서 바로 쓸 수 있어요.</p>`,
          code: {
            label: 'cargo_commands.txt',
            lang: 'rust',
            src: `cargo new my_app     # 새 프로젝트 생성
cargo build          # 컴파일만 수행
cargo run            # 빌드 후 실행
cargo test           # 테스트 실행
cargo add serde      # Cargo.toml에 의존성 추가`,
            out: `(터미널 명령어 목록)`
          },
          after: `<div class="note"><b>정리</b> — Cargo는 빌드 도구이자 패키지 매니저 역할을 동시에 해요. 의존성 버전, 컴파일, 테스트, 문서화(cargo doc)까지 하나의 도구로 다룰 수 있다는 게 Rust 생태계의 큰 장점이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'Cargo.toml 파일의 역할은?',
          '프로젝트 정보와 의존성 목록을 관리하는 설정 파일', ['컴파일된 실행 파일 자체', 'Rust 소스 코드 파일', '테스트 결과를 저장하는 로그 파일'],
          'Cargo.toml은 프로젝트 이름, 버전, 의존성 등을 적어두는 설정 파일이에요.',
          '다른 언어의 package.json, pyproject.toml과 비슷한 역할이에요.'
        ),
        () => makeChoice(
          '빌드만 하고 실행은 하지 않는 cargo 명령어는?',
          'cargo build', ['cargo run', 'cargo test', 'cargo new'],
          '<code>cargo build</code>는 컴파일까지만 하고, <code>cargo run</code>은 빌드 후 실행까지 해줘요.',
          'run은 build + 실행이에요.'
        ),
        () => ({
          type: 'blank',
          q: `Rust의 공개 패키지(외부 라이브러리)를 부르는 이름을 쓰세요. (영어로)`,
          prefix: '', suffix: '', accept: ['crate'], placeholder: '영어 단어',
          why: 'Rust에서는 패키지를 크레이트(crate)라고 불러요.',
          hint: 'crates.io라는 저장소 이름에서 유래해요.'
        }),
        () => makeChoice(
          '테스트 코드를 실행하는 cargo 명령어는?',
          'cargo test', ['cargo check', 'cargo doc', 'cargo fmt'],
          '<code>cargo test</code>는 프로젝트 안의 #[test] 함수들을 모두 실행해요.',
          '이름 그대로 "테스트"를 실행하는 명령이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>[dependencies]</code> 아래에 <code>serde</code> 크레이트를 버전 <code>"1.0"</code>으로, <code>features = ["derive"]</code>와 함께 추가하는 Cargo.toml 한 줄을 작성하세요.',
          starter: '',
          rows: 1,
          placeholder: 'serde = { version = "1.0", features = ["derive"] }',
          accept: ['serde = { version = "1.0", features = ["derive"] }'],
          why: 'TOML 형식으로 크레이트 이름 = { version = "...", features = [...] } 형태로 작성해요.',
          hint: 'serde = { version = "1.0", features = ["derive"] }'
        }),
      ],
      boss: () => makeChoice(
        '새 Rust 프로젝트를 만들고, 의존성을 추가한 뒤, 빌드하고 실행하기까지의 순서로 알맞은 것은?',
        'cargo new → Cargo.toml에 의존성 추가 → cargo run',
        ['cargo test → cargo new → cargo build', 'cargo run → cargo new → Cargo.toml 수정', 'Cargo.toml 수정 → cargo run → cargo new'],
        '먼저 cargo new로 프로젝트 뼈대를 만들고, Cargo.toml에 필요한 의존성을 추가한 뒤, cargo run으로 빌드와 실행을 함께 해요.',
        '프로젝트가 존재해야 그 안의 설정 파일을 수정할 수 있어요.'
      )
    },
    {
      id: 'stringDeepDive',
      title: '문자열 심화: String, UTF-8, 메서드',
      ready: true,
      summary: 'Rust 문자열이 UTF-8 바이트로 저장되는 이유와, 자주 쓰는 문자열 메서드를 배워요.',
      goals: ['UTF-8과 바이트/문자의 차이', '자주 쓰는 String 메서드', '문자열 인덱싱이 안 되는 이유'],
      blocks: [
        {
          h: 'String은 UTF-8 바이트의 모음이에요',
          html: `<p>Rust의 <code>String</code>은 항상 유효한 UTF-8로 인코딩돼요. 문제는, 한글 같은 문자는 한 글자가 3바이트를 차지해서 <b>"바이트 수"와 "글자 수"가 다르다</b>는 점이에요.</p>`,
          code: {
            label: 'utf8_len.rs',
            lang: 'rust',
            src: `fn main() {
    let s = String::from("안녕");
    println!("{}", s.len());          // 바이트 길이: 6
    println!("{}", s.chars().count()); // 글자 수: 2
}`,
            out: `6\n2`
          }
        },
        {
          h: '왜 s[0] 같은 인덱싱이 안 될까?',
          html: `<p>UTF-8에서는 한 글자가 몇 바이트인지 문자마다 달라서, <code>s[0]</code>처럼 "글자 하나"를 바로 꺼낼 방법이 없어요(어중간한 바이트를 끊으면 깨진 문자가 나올 수 있으니까요). 그래서 Rust는 <code>String</code>에 정수 인덱싱을 아예 허용하지 않고, 대신 <code>chars()</code>로 순회하게 해요.</p>`,
          code: {
            label: 'chars_iterate.rs',
            lang: 'rust',
            src: `fn main() {
    let s = String::from("Hi안녕");
    for c in s.chars() {
        println!("{}", c);
    }
}`,
            out: `H\ni\n안\n녕`
          },
          after: `<div class="note"><b>정리</b> — 자주 쓰는 String 메서드: <code>len()</code>(바이트 길이), <code>push_str(&str)</code>(문자열 이어붙이기), <code>trim()</code>(양 끝 공백 제거), <code>to_uppercase()</code>/<code>to_lowercase()</code>, <code>replace(from, to)</code>, <code>split(구분자)</code> 등이 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '한글 "안녕" 같은 문자열에서 <code>len()</code>과 <code>chars().count()</code>가 다른 값을 주는 이유는?',
          'len()은 바이트 수를, chars().count()는 글자 수를 세기 때문에', ['len()이 버그이기 때문에', 'chars()가 절반만 세기 때문에', '한글은 String에 담을 수 없기 때문에'],
          'UTF-8에서 한글 한 글자는 3바이트라서, len()(바이트 수)과 chars().count()(글자 수)가 서로 다른 값을 줘요.',
          '"안녕"은 2글자지만 6바이트예요.'
        ),
        () => makeChoice(
          'Rust에서 <code>s[0]</code>처럼 String을 정수로 직접 인덱싱할 수 없는 이유는?',
          'UTF-8은 문자마다 바이트 수가 달라서, 어중간하게 끊으면 문자가 깨질 수 있기 때문에', ['String이 배열이 아니기 때문에(전혀 관련 없음)', 'Rust가 인덱싱 문법을 지원하지 않기 때문에(모든 타입에서)', '성능을 위해 일부러 금지했을 뿐 기술적 이유는 없다'],
          '한 문자가 몇 바이트인지 문자마다 다르기 때문에, 임의의 바이트 위치로 끊으면 유효하지 않은 UTF-8이 될 수 있어서 안전하게 인덱싱할 방법이 없어요.',
          '대신 chars()로 순회하거나, 바이트 슬라이스(&s[0..3])로 범위를 직접 다뤄야 해요.'
        ),
        () => ({
          type: 'blank',
          q: `문자열의 양 끝 공백을 제거하는 String 메서드 이름을 쓰세요.`,
          prefix: 's.', suffix: '()', accept: ['trim'], placeholder: '메서드 이름',
          why: '<code>trim()</code>은 문자열 양 끝의 공백(과 개행 등)을 제거해줘요.',
          hint: '"다듬다, 잘라내다"라는 뜻의 영어 단어예요.'
        }),
        () => {
          const s = pick(['Hello', 'Rust', 'World']);
          return {
            type: 'blank',
            q: `<code>let s = String::from("${s}"); println!("{}", s.to_uppercase());</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [s.toUpperCase()], placeholder: '출력 결과',
            why: `to_uppercase()는 모든 글자를 대문자로 바꾸므로 "${s.toUpperCase()}"가 돼요.`,
            hint: '전부 대문자로 바뀌어요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>"Hi안녕"</code> 문자열을 <code>chars()</code>로 순회하며 각 글자를 한 줄씩 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'let s = String::from("Hi안녕");\nfor c in s.chars() {\n    println!("{}", c);\n}',
          accept: ['let s = String::from("Hi안녕");\nfor c in s.chars() {\n    println!("{}", c);\n}'],
          why: 'chars()는 문자열을 유니코드 문자 단위로 순회하게 해줘요.',
          hint: 'for c in s.chars() { println!("{}", c); }'
        }),
      ],
      boss: () => {
        const s = pick(['안녕하세요', '반갑습니다', '코드공방']);
        const byteLen = (() => {
          let n = 0;
          for (const ch of s) {
            const cp = ch.codePointAt(0);
            n += cp < 0x80 ? 1 : cp < 0x800 ? 2 : cp < 0x10000 ? 3 : 4;
          }
          return n;
        })();
        return {
          type: 'blank',
          q: `<code>let s = String::from("${s}"); println!("{} {}", s.len(), s.chars().count());</code>를 실행하면? (그대로 입력, 공백 하나로 구분)`,
          prefix: '', suffix: '', accept: [`${byteLen} ${[...s].length}`], placeholder: '출력 결과',
          why: `"${s}"는 ${[...s].length}글자이고, 한글은 한 글자당 3바이트라서 총 바이트 길이는 ${byteLen}이에요.`,
          hint: '한글 한 글자는 UTF-8에서 3바이트를 차지해요.'
        };
      }
    },
    {
      id: 'customErrorTypes',
      title: '커스텀 오류 타입과 From/Into',
      ready: true,
      summary: '나만의 오류 타입을 정의하고, From을 이용해 ? 연산자로 자동 변환되게 만들어요.',
      goals: ['enum으로 커스텀 오류 타입 만들기', 'Display 트레이트로 오류 메시지 제공', 'From으로 오류 자동 변환하기'],
      blocks: [
        {
          h: '커스텀 오류 타입: 여러 실패 원인을 enum으로',
          html: `<p>문자열 하나로 오류를 표현하기보다, <code>enum</code>으로 "어떤 종류의 오류인지"를 명확히 구분하는 게 더 견고해요. 실무에서는 <code>thiserror</code> 같은 크레이트로 이 과정을 더 간결하게 쓰지만, 핵심 아이디어는 같아요.</p>`,
          code: {
            label: 'custom_error.rs',
            lang: 'rust',
            src: `#[derive(Debug)]
enum AppError {
    NotFound,
    InvalidInput(String),
}

fn find_user(id: u32) -> Result<String, AppError> {
    if id == 0 {
        return Err(AppError::InvalidInput(String::from("id는 0일 수 없음")));
    }
    if id == 1 {
        Ok(String::from("지수"))
    } else {
        Err(AppError::NotFound)
    }
}

fn main() {
    println!("{:?}", find_user(1));
    println!("{:?}", find_user(99));
}`,
            out: `Ok("지수")\nErr(NotFound)`
          }
        },
        {
          h: 'From: 다른 오류 타입을 내 오류 타입으로 자동 변환',
          html: `<p><code>impl From<다른오류> for 내오류</code>를 구현해두면, <code>?</code> 연산자가 다른 함수의 오류를 자동으로 내 오류 타입으로 바꿔서 전파해줘요. 이 덕분에 여러 출처의 오류를 하나의 통일된 타입으로 다룰 수 있어요.</p>`,
          code: {
            label: 'from_conversion.rs',
            lang: 'rust',
            src: `#[derive(Debug)]
enum AppError {
    ParseError,
}

impl From<std::num::ParseIntError> for AppError {
    fn from(_e: std::num::ParseIntError) -> Self {
        AppError::ParseError
    }
}

fn parse_age(s: &str) -> Result<u32, AppError> {
    let age: u32 = s.parse()?; // parse 실패시 자동으로 AppError로 변환됨
    Ok(age)
}

fn main() {
    println!("{:?}", parse_age("abc"));
}`,
            out: `Err(ParseError)`
          },
          after: `<div class="note"><b>정리</b> — Display 트레이트를 구현하면 사용자에게 보여줄 오류 메시지(<code>println!("{}", err)</code>)를, Debug(<code>#[derive(Debug)]</code>)는 개발자가 디버깅할 때 볼 상세 정보(<code>{:?}</code>)를 제공해요. 실무 오류 타입은 보통 이 둘을 함께 구현해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const id = pick([0, 1, 99]);
          const result = id === 0 ? 'Err(InvalidInput("id는 0일 수 없음"))' : (id === 1 ? 'Ok("지수")' : 'Err(NotFound)');
          return {
            type: 'blank',
            q: `<code>find_user(${id})</code>를 <code>{:?}</code>로 출력하면? (그대로 입력, 예: Ok("값") 또는 Err(...))`,
            prefix: '', suffix: '', accept: [result], placeholder: '출력 결과',
            why: id === 0 ? 'id가 0이면 InvalidInput 오류가 반환돼요.' : (id === 1 ? 'id가 1이면 "지수"를 담은 Ok가 반환돼요.' : '그 외 id는 NotFound 오류가 반환돼요.'),
            hint: 'id 값에 따라 세 가지 경우 중 하나가 나와요.'
          };
        },
        () => makeChoice(
          '문자열 하나로 오류를 표현하는 대신 enum으로 오류를 정의하는 이유는?',
          '오류의 종류를 명확히 구분하고 match로 각각 다르게 처리할 수 있어서', ['enum이 항상 더 빠르기 때문에', '문자열은 오류에 쓸 수 없기 때문에', '컴파일러가 강제하기 때문에'],
          'enum으로 오류를 표현하면 match를 통해 각 오류 종류별로 다른 처리를 명확하게 할 수 있어요.',
          '문자열만으로는 "어떤 종류의 오류인지" 프로그램이 구분하기 어려워요.'
        ),
        () => makeChoice(
          '<code>impl From<ParseIntError> for AppError</code>를 구현해두면 ? 연산자가 하는 일은?',
          'ParseIntError가 발생하면 자동으로 AppError로 변환해서 전파한다', ['ParseIntError를 무시하고 계속 진행한다', '항상 panic을 일으킨다', 'AppError를 ParseIntError로 바꾼다'],
          'From을 구현해두면 ?가 오류 타입을 자동으로 변환해줘서, 여러 출처의 오류를 하나의 타입으로 통일해 다룰 수 있어요.',
          '?는 내부적으로 From::from()을 호출해서 타입을 맞춰줘요.'
        ),
        () => ({
          type: 'blank',
          q: `개발자가 디버깅할 때 <code>{:?}</code>로 값을 출력할 수 있게 해주는, 구조체/enum 위에 붙이는 매크로 속성을 쓰세요.`,
          prefix: '#[derive(', suffix: ')]', accept: ['Debug'], placeholder: '트레이트 이름',
          why: '<code>#[derive(Debug)]</code>를 붙이면 {:?}로 값을 출력할 수 있게 돼요.',
          hint: '"디버그"용 출력을 자동으로 만들어주는 이름이에요.'
        }),
        () => ({
          type: 'code',
          q: '<code>NotFound</code>와 <code>InvalidInput(String)</code> 두 variant를 가지고 <code>#[derive(Debug)]</code>가 붙은 오류 타입 <code>AppError</code>를 정의하세요.',
          starter: '',
          rows: 4,
          placeholder: '#[derive(Debug)]\nenum AppError {\n    NotFound,\n    InvalidInput(String),\n}',
          accept: ['#[derive(Debug)]\nenum AppError {\n    NotFound,\n    InvalidInput(String),\n}'],
          why: '#[derive(Debug)]로 디버그 출력을 자동 생성하고, enum으로 두 종류의 오류를 표현해요.',
          hint: '#[derive(Debug)] enum AppError { NotFound, InvalidInput(String), }'
        }),
      ],
      boss: () => {
        const s = pick(['abc', '42', 'xyz', '7']);
        const isNum = /^\d+$/.test(s);
        return {
          type: 'blank',
          q: `<code>fn parse_age(s: &str) -> Result<u32, AppError> { let age: u32 = s.parse()?; Ok(age) } println!("{:?}", parse_age("${s}"));</code>를 실행하면? (그대로 입력, 예: Ok(값) 또는 Err(ParseError))`,
          prefix: '', suffix: '', accept: [isNum ? `Ok(${parseInt(s, 10)})` : 'Err(ParseError)'], placeholder: '출력 결과',
          why: isNum ? `"${s}"는 숫자로 잘 파싱되어 Ok(${parseInt(s, 10)})가 돼요.` : `"${s}"는 숫자가 아니라서 parse()가 실패하고, ?가 이를 AppError로 변환해 Err(ParseError)가 돼요.`,
          hint: '문자열이 순수한 숫자인지 확인해보세요.'
        };
      }
    },
    {
      id: 'threadsBasics',
      title: '스레드: std::thread',
      ready: true,
      summary: '여러 작업을 동시에 실행하는 스레드를 만들고 join으로 기다리는 법을 배워요.',
      goals: ['thread::spawn으로 스레드 만들기', 'join()으로 스레드 종료 기다리기', 'move 클로저로 값 넘기기'],
      blocks: [
        {
          h: 'thread::spawn: 새로운 스레드 시작하기',
          html: `<p><code>std::thread::spawn(클로저)</code>은 클로저 안의 코드를 새로운 스레드에서 동시에 실행해요. 반환값(<code>JoinHandle</code>)의 <code>join()</code>을 호출하면, 그 스레드가 끝날 때까지 기다려요.</p>`,
          code: {
            label: 'thread_basic.rs',
            lang: 'rust',
            src: `use std::thread;

fn main() {
    let handle = thread::spawn(|| {
        println!("새 스레드에서 실행 중");
    });
    handle.join().unwrap(); // 스레드가 끝날 때까지 기다림
    println!("메인 스레드 계속 진행");
}`,
            out: `새 스레드에서 실행 중\n메인 스레드 계속 진행`
          }
        },
        {
          h: 'move 클로저: 값의 소유권을 스레드로 넘기기',
          html: `<p>스레드는 메인 함수보다 더 오래 살아있을 수도 있어서, 클로저가 바깥 변수를 참조로 빌리는 게 위험할 수 있어요. <code>move</code>를 붙이면 클로저가 그 변수의 소유권을 통째로 가져가서 안전해져요.</p>`,
          code: {
            label: 'thread_move.rs',
            lang: 'rust',
            src: `use std::thread;

fn main() {
    let data = vec![1, 2, 3];
    let handle = thread::spawn(move || {
        println!("{:?}", data); // data의 소유권이 스레드로 이동
    });
    handle.join().unwrap();
}`,
            out: `[1, 2, 3]`
          },
          after: `<div class="note"><b>정리</b> — join()을 호출하지 않으면 메인 스레드가 먼저 끝나버려 다른 스레드의 실행이 보장되지 않을 수 있어요. 여러 스레드를 만들 때는 <code>JoinHandle</code>들을 Vec에 모아뒀다가 한꺼번에 join하는 패턴을 자주 써요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>thread::spawn(클로저)</code>이 하는 일은?',
          '클로저 안의 코드를 새로운 스레드에서 동시에 실행한다', ['클로저를 나중에 한 번만 예약 실행한다', '프로그램을 즉시 종료한다', '클로저를 다른 함수로 변환한다'],
          'thread::spawn은 클로저를 새로운 스레드에서 병렬로 실행해요.',
          '"동시에 실행"이 스레드의 핵심이에요.'
        ),
        () => makeChoice(
          '<code>handle.join()</code>을 호출하는 이유는?',
          '그 스레드가 끝날 때까지 현재 코드를 기다리게 하려고', ['스레드를 즉시 종료시키려고', '스레드를 일시정지시키려고', '스레드의 오류를 무시하려고'],
          'join()은 해당 스레드의 실행이 끝날 때까지 현재 흐름을 기다리게 해요.',
          'join 없이 메인 함수가 끝나면 스레드가 실행 중이어도 프로그램이 종료될 수 있어요.'
        ),
        () => ({
          type: 'blank',
          q: `스레드에 클로저 바깥 변수의 소유권을 통째로 넘기고 싶을 때 클로저 앞에 붙이는 키워드를 쓰세요.`,
          prefix: 'thread::spawn(', suffix: ' || { ... })', accept: ['move'], placeholder: '키워드',
          why: '<code>move</code>는 클로저가 캡처하는 변수의 소유권을 클로저 안으로 가져오게 해요.',
          hint: '"이동시키다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'move 클로저가 스레드에서 필요한 이유는?',
          '스레드가 원래 함수보다 오래 살 수 있어 참조를 빌리는 게 위험할 수 있어서', ['move가 없으면 컴파일이 아예 안 되기 때문에(항상)', '속도를 높이기 위해서', 'move는 스레드와 관련이 없다'],
          '스레드는 언제까지 실행될지 알 수 없어서, 바깥 변수를 참조로만 빌리면 그 변수가 먼저 사라질 위험이 있어요. move로 소유권을 넘기면 이 문제가 없어져요.',
          'borrow checker가 이 위험을 감지해서 종종 move를 요구해요.'
        ),
        () => ({
          type: 'code',
          q: '새 스레드에서 <code>"작업 중"</code>을 출력하고, <code>join()</code>으로 끝날 때까지 기다리는 코드를 작성하세요. (use 문 제외)',
          starter: '',
          rows: 3,
          placeholder: 'let handle = thread::spawn(|| {\n    println!("작업 중");\n});\nhandle.join().unwrap();',
          accept: ['let handle = thread::spawn(|| {\n    println!("작업 중");\n});\nhandle.join().unwrap();'],
          why: 'thread::spawn으로 스레드를 만들고 join()으로 종료를 기다려요.',
          hint: 'thread::spawn(|| { ... }); handle.join().unwrap();'
        }),
      ],
      boss: () => makeChoice(
        '다음 중 컴파일 오류가 날 가능성이 높은 코드는?',
        'let data = vec![1, 2, 3]; let handle = thread::spawn(|| { println!("{:?}", data); }); handle.join().unwrap();',
        ['let data = vec![1, 2, 3]; let handle = thread::spawn(move || { println!("{:?}", data); }); handle.join().unwrap();', 'let handle = thread::spawn(|| { println!("hi"); }); handle.join().unwrap();', 'let handle = thread::spawn(|| 1 + 1); println!("{}", handle.join().unwrap());'],
        'move 없이 클로저가 data를 참조로 캡처하면, 스레드가 얼마나 오래 살지 컴파일러가 보장할 수 없어 보통 라이프타임 오류가 나요. move를 붙이면 소유권이 이동해서 안전해져요.',
        'data처럼 함수 지역 변수를 참조로 캡처하는 스레드 클로저는 move가 필요한 경우가 많아요.'
      )
    },
    {
      id: 'mutexAndArc',
      title: '뮤텍스(Mutex)와 Arc',
      ready: true,
      summary: '여러 스레드가 안전하게 값을 공유하고 바꾸는 Mutex와 Arc의 조합을 배워요.',
      goals: ['Mutex<T>로 동시 접근 막기', 'lock()으로 값에 접근하기', 'Arc<Mutex<T>>로 스레드 간 공유하기'],
      blocks: [
        {
          h: 'Mutex<T>: 한 번에 한 스레드만 접근하게',
          html: `<p><code>Mutex&lt;T&gt;</code>(mutual exclusion, 상호 배제)는 값에 한 번에 하나의 스레드만 접근하도록 막아줘요. <code>lock()</code>을 호출하면 값을 다룰 수 있는 접근 권한을 얻고, 스코프를 벗어나면 자동으로 잠금이 풀려요.</p>`,
          code: {
            label: 'mutex_basic.rs',
            lang: 'rust',
            src: `use std::sync::Mutex;

fn main() {
    let counter = Mutex::new(0);
    {
        let mut num = counter.lock().unwrap();
        *num += 1;
    }
    println!("{}", *counter.lock().unwrap());
}`,
            out: `1`
          }
        },
        {
          h: 'Arc<Mutex<T>>: 여러 스레드가 함께 소유하며 안전하게 바꾸기',
          html: `<p>Mutex 하나를 여러 스레드가 공유하려면, 스레드 안전한 참조 카운팅인 <code>Arc&lt;T&gt;</code>(Atomic Rc)로 감싸야 해요. <code>Arc&lt;Mutex&lt;T&gt;&gt;</code>는 "여러 스레드가 공유하면서(Arc) + 안전하게 값을 바꾼다(Mutex)"는 아주 흔한 동시성 패턴이에요.</p>`,
          code: {
            label: 'arc_mutex.rs',
            lang: 'rust',
            src: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];
    for _ in 0..5 {
        let counter = Arc::clone(&counter);
        handles.push(thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        }));
    }
    for h in handles { h.join().unwrap(); }
    println!("{}", *counter.lock().unwrap());
}`,
            out: `5`
          },
          after: `<div class="note"><b>정리</b> — Rc는 스레드 안전하지 않아서 스레드 사이에는 쓸 수 없고, 반드시 Arc를 써야 해요. Mutex는 컴파일 타임에 "동시 접근 규칙"을 강제하지는 않지만, lock()을 통하지 않고는 값에 접근할 방법 자체가 없도록 타입 시스템이 설계되어 있어서 데이터 경쟁을 막아줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const start = randInt(0, 10);
          const add = randInt(1, 10);
          return {
            type: 'blank',
            q: `<code>let counter = Mutex::new(${start}); { let mut num = counter.lock().unwrap(); *num += ${add}; } println!("{}", *counter.lock().unwrap());</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(start + add)], placeholder: '숫자',
            why: `lock()으로 값을 얻어 ${add}만큼 늘렸으므로 ${start} + ${add} = ${start + add}예요.`,
            hint: 'lock().unwrap()으로 Mutex 안의 값을 안전하게 바꿀 수 있어요.'
          };
        },
        () => makeChoice(
          'Mutex<T>가 보장하는 것은?',
          '한 번에 하나의 스레드만 값에 접근할 수 있다', ['값을 여러 스레드가 동시에 자유롭게 바꿀 수 있다', '스레드를 자동으로 생성한다', '값을 항상 불변으로 만든다'],
          'Mutex는 상호 배제(mutual exclusion)를 통해 한 번에 하나의 스레드만 값에 접근하도록 보장해요.',
          '"뮤텍스"라는 이름 자체가 mutual exclusion의 줄임말이에요.'
        ),
        () => makeChoice(
          'Mutex를 여러 스레드에서 함께 소유하려면 어떤 타입으로 감싸야 하나요?',
          'Arc<Mutex<T>>', ['Rc<Mutex<T>>', 'Box<Mutex<T>>', 'RefCell<Mutex<T>>'],
          'Rc는 스레드 안전하지 않아서, 스레드 간 공유에는 스레드 안전한 참조 카운팅인 Arc를 써야 해요.',
          'Arc의 A는 Atomic(원자적)을 뜻해요.'
        ),
        () => ({
          type: 'blank',
          q: `Mutex 안의 값에 접근할 수 있는 권한을 얻기 위해 호출하는 메서드 이름을 쓰세요.`,
          prefix: 'counter.', suffix: '().unwrap()', accept: ['lock'], placeholder: '메서드 이름',
          why: '<code>lock()</code>은 Mutex를 잠그고 값에 접근할 수 있는 가드를 돌려줘요.',
          hint: '"잠그다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>Mutex::new(0)</code>으로 <code>counter</code>를 만들고, <code>lock()</code>으로 값을 1 늘린 뒤 출력하는 코드를 작성하세요. (use 문 제외)',
          starter: '',
          rows: 4,
          placeholder: 'let counter = Mutex::new(0);\n{\n    let mut num = counter.lock().unwrap();\n    *num += 1;\n}\nprintln!("{}", *counter.lock().unwrap());',
          accept: ['let counter = Mutex::new(0);\n{\n    let mut num = counter.lock().unwrap();\n    *num += 1;\n}\nprintln!("{}", *counter.lock().unwrap());'],
          why: 'lock().unwrap()으로 접근 권한을 얻어 값을 바꾸고, 다시 lock()으로 읽어서 출력해요.',
          hint: 'Mutex::new(0); lock().unwrap(); *num += 1;'
        }),
      ],
      boss: () => {
        const n = randInt(3, 8);
        return {
          type: 'blank',
          q: `<code>let counter = Arc::new(Mutex::new(0)); let mut handles = vec![]; for _ in 0..${n} { let counter = Arc::clone(&counter); handles.push(thread::spawn(move || { *counter.lock().unwrap() += 1; })); } for h in handles { h.join().unwrap(); } println!("{}", *counter.lock().unwrap());</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
          why: `${n}개의 스레드가 각각 1씩 안전하게 늘리므로 최종 값은 ${n}이에요. Mutex 덕분에 값이 경쟁 없이 정확하게 누적돼요.`,
          hint: '스레드 개수만큼 값이 정확히 늘어나요(Mutex가 경쟁을 막아주므로).'
        };
      }
    },
    {
      id: 'channelsMpsc',
      title: '채널: mpsc로 메시지 주고받기',
      ready: true,
      summary: '스레드끼리 값을 직접 공유하는 대신, 채널로 메시지를 주고받는 방식을 배워요.',
      goals: ['mpsc::channel로 송신자/수신자 만들기', 'send와 recv로 메시지 주고받기', '"메모리 공유 대신 메시지 전달"이라는 철학'],
      blocks: [
        {
          h: 'mpsc::channel: 여러 곳에서 보내고 한 곳에서 받기',
          html: `<p><code>mpsc</code>(multiple producer, single consumer)는 여러 스레드가 값을 <b>보내고(send)</b>, 하나의 스레드가 그 값들을 순서대로 <b>받는(recv)</b> 채널이에요.</p>`,
          code: {
            label: 'mpsc_basic.rs',
            lang: 'rust',
            src: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    thread::spawn(move || {
        tx.send(String::from("안녕!")).unwrap();
    });
    let received = rx.recv().unwrap();
    println!("{}", received);
}`,
            out: `안녕!`
          }
        },
        {
          h: '"메모리를 공유해서 통신하지 말고, 통신해서 메모리를 공유하라"',
          html: `<p>Mutex는 "같은 메모리를 여럿이 안전하게 나눠 쓰는" 방식이라면, 채널은 "값의 소유권 자체를 다른 스레드로 넘겨주는" 방식이에요. Go 언어의 유명한 격언처럼, Rust도 채널을 통한 메시지 전달을 동시성 프로그래밍의 좋은 방법으로 권장해요.</p>`,
          code: {
            label: 'mpsc_multi_send.rs',
            lang: 'rust',
            src: `use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();
    for i in 1..=3 {
        let tx = tx.clone();
        thread::spawn(move || {
            tx.send(i).unwrap();
        });
    }
    drop(tx); // 원본 송신자를 닫아야 수신 반복이 끝날 수 있음
    let mut total = 0;
    for received in rx {
        total += received;
    }
    println!("{}", total);
}`,
            out: `6`
          },
          after: `<div class="note"><b>정리</b> — 송신자(tx)는 <code>clone()</code>해서 여러 스레드에 나눠줄 수 있지만, 수신자(rx)는 하나뿐이에요(single consumer). <code>for received in rx</code>는 모든 송신자가 닫힐 때까지 값을 계속 받아와요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'mpsc::channel()이 반환하는 두 값(tx, rx)의 역할은?',
          'tx는 값을 보내고, rx는 값을 받는다', ['tx와 rx 둘 다 값을 보낼 수 있다', 'tx는 값을 받고, rx는 값을 보낸다', 'tx와 rx는 서로 아무 관련이 없다'],
          'tx(transmitter, 송신자)는 send로 값을 보내고, rx(receiver, 수신자)는 recv로 값을 받아요.',
          '이름 그대로 transmit(보내다), receive(받다)의 줄임말이에요.'
        ),
        () => ({
          type: 'blank',
          q: `mpsc는 무엇의 줄임말인가요? ("multiple ___, single consumer"에서 빈칸을 채우세요, 영어로)`,
          prefix: 'multiple ', suffix: ', single consumer', accept: ['producer'], placeholder: '영어 단어',
          why: 'mpsc는 multiple producer, single consumer(여러 생산자, 하나의 소비자)의 줄임말이에요.',
          hint: '값을 "생산해서" 보내는 쪽을 뜻하는 단어예요.'
        }),
        () => makeChoice(
          '채널을 이용한 방식이 Mutex와 다른 핵심 철학은?',
          '메모리를 공유하는 대신, 값의 소유권을 다른 스레드로 넘긴다(메시지 전달)', ['채널은 항상 Mutex보다 빠르다', '채널은 값을 절대 옮기지 않는다', 'Mutex와 완전히 동일한 방식이다'],
          '채널은 값을 다른 스레드로 "보내서" 소유권째로 넘기는 방식이라, 같은 메모리를 여럿이 동시에 접근하는 Mutex와는 접근 철학이 달라요.',
          '"통신을 통해 메모리를 공유하라"는 격언이 이 철학을 잘 나타내요.'
        ),
        () => makeChoice(
          '여러 스레드에서 같은 채널로 값을 보내려면 tx에 대해 무엇을 해야 하나요?',
          'clone()해서 각 스레드에 나눠준다', ['하나의 tx를 여러 스레드가 그냥 공유한다(소유권 이동 없이)', 'rx를 clone()한다', '아무것도 할 필요 없다'],
          'tx는 clone()으로 여러 개 만들 수 있어서, 각 스레드가 자신만의 tx 복사본으로 값을 보낼 수 있어요.',
          'rx(수신자)는 clone할 수 없고 하나만 존재해요.'
        ),
        () => ({
          type: 'code',
          q: '<code>mpsc::channel()</code>로 <code>tx</code>, <code>rx</code>를 만들고, 새 스레드에서 <code>tx.send("hi".to_string())</code>를 호출한 뒤, 메인에서 <code>rx.recv()</code>로 받아 출력하는 코드를 작성하세요. (use 문 제외)',
          starter: '',
          rows: 5,
          placeholder: 'let (tx, rx) = mpsc::channel();\nthread::spawn(move || {\n    tx.send("hi".to_string()).unwrap();\n});\nprintln!("{}", rx.recv().unwrap());',
          accept: ['let (tx, rx) = mpsc::channel();\nthread::spawn(move || {\n    tx.send("hi".to_string()).unwrap();\n});\nprintln!("{}", rx.recv().unwrap());'],
          why: 'channel()로 만든 tx를 move 클로저 안에서 send하고, 메인에서 recv로 받아요.',
          hint: 'mpsc::channel(); thread::spawn(move || { tx.send(...) }); rx.recv().unwrap()'
        }),
      ],
      boss: () => {
        const n = randInt(2, 5);
        const total = Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a + b, 0);
        return {
          type: 'blank',
          q: `<code>let (tx, rx) = mpsc::channel(); for i in 1..=${n} { let tx = tx.clone(); thread::spawn(move || { tx.send(i).unwrap(); }); } drop(tx); let mut total = 0; for received in rx { total += received; } println!("{}", total);</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
          why: `1부터 ${n}까지의 값을 각 스레드가 보내고 모두 더하므로 합은 ${total}이에요.`,
          hint: '1부터 n까지 더한 값이에요.'
        };
      }
    },
    {
      id: 'asyncAwaitBasics',
      title: 'async/await 기초',
      ready: true,
      summary: '스레드보다 가벼운 동시성 도구, async 함수와 await의 개념을 배워요.',
      goals: ['async fn으로 비동기 함수 정의하기', '.await로 결과 기다리기', '스레드와 async의 차이(개념 수준)'],
      blocks: [
        {
          h: 'async fn: 즉시 실행되지 않는 "미래의 값"',
          html: `<p><code>async fn</code>으로 정의한 함수를 호출하면 코드가 바로 실행되는 게 아니라, <code>Future</code>(미래에 완료될 작업)라는 값이 만들어져요. 이 Future를 <code>.await</code>해야 실제로 실행되고 결과를 얻을 수 있어요.</p>`,
          code: {
            label: 'async_basic.rs',
            lang: 'rust',
            src: `async fn greet() -> String {
    String::from("안녕, async!")
}

// 실행하려면 런타임(예: tokio)이 필요해요. 개념만 확인해볼게요.
// #[tokio::main]
// async fn main() {
//     let msg = greet().await;
//     println!("{}", msg);
// }`,
            out: `안녕, async! (런타임을 통해 실행했을 때)`
          }
        },
        {
          h: '스레드 vs async: 언제 무엇을 쓸까',
          html: `<p>스레드는 OS가 직접 관리하는 무거운 실행 단위라 개수에 한계가 있어요. <code>async</code>는 "기다리는 동안(예: 네트워크 응답 대기) 다른 작업으로 전환"하는 가벼운 동시성 방식이라, 수천~수백만 개의 동시 작업(예: 웹 서버의 요청 처리)에 적합해요. CPU 연산이 많은 작업에는 스레드가, I/O 대기가 많은 작업에는 async가 더 잘 맞아요.</p>`,
          code: {
            label: 'async_concept.txt',
            lang: 'rust',
            src: `// 개념 요약:
// - thread::spawn: OS 스레드, CPU 집약적 작업에 적합
// - async fn + .await: 가벼운 협력적 동시성, I/O 대기가 많은 작업(웹 요청 등)에 적합
// - async 코드를 실제로 돌리려면 tokio 같은 "런타임" 크레이트가 필요함`,
            out: `(개념 정리, 실행 결과 없음)`
          },
          after: `<div class="note"><b>정리</b> — Rust 표준 라이브러리는 async 문법만 제공하고, 실제로 Future를 실행하는 "런타임"은 <code>tokio</code>, <code>async-std</code> 같은 별도 크레이트가 담당해요. 이 단원은 개념 소개 수준이며, 실제 프로젝트에서는 런타임 문서를 참고해 더 깊이 배우게 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>async fn greet() -> String { ... }</code>을 그냥 호출(<code>greet()</code>)만 하면?',
          '즉시 실행되지 않고 Future 값만 만들어진다', ['바로 실행되어 String이 반환된다', '컴파일 오류가 난다', '항상 새 스레드가 생성된다'],
          'async fn을 호출하면 코드가 바로 실행되지 않고, .await되기 전까지 실행을 미루는 Future 값이 만들어져요.',
          '실행을 "지금 당장"이 아니라 "나중에"로 미루는 게 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `Future의 결과를 실제로 기다려서 얻을 때 뒤에 붙이는 키워드를 쓰세요. (예: greet()___)`,
          prefix: 'greet().', suffix: '', accept: ['await'], placeholder: '키워드',
          why: '<code>.await</code>는 Future가 완료될 때까지 기다렸다가 그 결과값을 꺼내줘요.',
          hint: '"기다리다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'I/O 대기(네트워크 응답 등)가 많은 수많은 동시 작업을 처리할 때 스레드보다 async가 유리한 이유는?',
          '스레드보다 훨씬 가벼워서 훨씬 많은 동시 작업을 다룰 수 있기 때문에', ['async는 항상 CPU 연산을 더 빠르게 계산해서', 'async는 스레드와 완전히 같은 방식이라서', 'thread::spawn은 async보다 항상 빠르기 때문에'],
          'async 작업은 OS 스레드보다 훨씬 가벼운 단위라서, 대기 시간이 긴 수많은 작업(예: 동시 접속자)을 효율적으로 처리할 수 있어요.',
          '스레드는 개수가 많아지면 메모리·전환 비용이 크게 늘어나요.'
        ),
        () => makeChoice(
          'async 코드를 실제로 실행하려면 무엇이 추가로 필요한가요?',
          'tokio 같은 비동기 런타임 크레이트', ['특별한 것 없이 표준 라이브러리만으로 충분하다', 'Mutex와 Arc', 'thread::spawn'],
          'Rust 표준 라이브러리는 async 문법만 제공하고, 실제 실행은 tokio 같은 런타임 크레이트가 담당해요.',
          '문법(async/await)과 실행 엔진(런타임)이 분리되어 있는 게 Rust async의 특징이에요.'
        ),
        () => ({
          type: 'code',
          q: '아무 매개변수 없이 <code>String</code>을 반환하는 비동기 함수 <code>greet</code>를 정의하고, 본문에서 <code>"안녕, async!"</code>를 반환하세요.',
          starter: '',
          rows: 3,
          placeholder: 'async fn greet() -> String {\n    String::from("안녕, async!")\n}',
          accept: ['async fn greet() -> String {\n    String::from("안녕, async!")\n}'],
          why: 'async fn으로 정의하면 이 함수는 즉시 실행되지 않고 Future를 반환하는 비동기 함수가 돼요.',
          hint: 'async fn greet() -> String { String::from("안녕, async!") }'
        }),
      ],
      boss: () => makeChoice(
        '다음 중 async/await에 대한 설명으로 옳은 것은?',
        'async fn은 호출 즉시 실행되지 않고, await되어야 실제로 실행된다',
        ['async fn은 일반 fn처럼 호출하는 즉시 실행된다', 'await는 스레드를 새로 만드는 키워드다', 'async는 표준 라이브러리만으로 항상 실행할 수 있다'],
        'async fn을 호출하면 Future가 만들어질 뿐, 실제 실행은 .await(그리고 런타임)를 통해 이루어져요.',
        '"만들어짐"과 "실행됨"이 분리되어 있다는 점이 핵심이에요.'
      )
    },
    {
      id: 'testingBasics',
      title: '테스트: #[test]와 assert_eq!',
      ready: true,
      summary: '함수 위에 #[test]를 붙여 자동으로 검증되는 유닛 테스트를 작성해요.',
      goals: ['#[test]로 테스트 함수 표시하기', 'assert_eq!/assert!로 결과 검증하기', 'cargo test로 실행하기'],
      blocks: [
        {
          h: '#[test]: 이 함수는 테스트예요',
          html: `<p>함수 위에 <code>#[test]</code>를 붙이면, <code>cargo test</code>를 실행할 때 그 함수가 자동으로 호출되고 통과/실패가 보고돼요. 보통 같은 파일 안 <code>mod tests</code> 블록에 몰아서 작성해요.</p>`,
          code: {
            label: 'test_basic.rs',
            lang: 'rust',
            src: `fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn adds_two_numbers() {
        assert_eq!(add(2, 3), 5);
    }
}`,
            out: `test tests::adds_two_numbers ... ok`
          }
        },
        {
          h: 'assert_eq!, assert!로 결과 검증하기',
          html: `<p><code>assert_eq!(값1, 값2)</code>는 두 값이 다르면 테스트를 실패시키고 그 차이를 보여줘요. <code>assert!(조건)</code>은 조건이 거짓이면 실패해요. 이 매크로들은 실패할 때 panic을 일으켜서, cargo test가 그 실패를 감지해요.</p>`,
          code: {
            label: 'assert_examples.rs',
            lang: 'rust',
            src: `#[cfg(test)]
mod tests {
    #[test]
    fn checks_boolean() {
        assert!(1 + 1 == 2);
    }

    #[test]
    fn checks_equality() {
        assert_eq!(2 + 2, 4);
    }
}`,
            out: `test tests::checks_boolean ... ok\ntest tests::checks_equality ... ok`
          },
          after: `<div class="note"><b>정리</b> — <code>use super::*;</code>는 테스트 모듈 바깥(파일 최상위)의 함수들을 가져와요. 테스트를 작성해두면, 나중에 코드를 리팩터링하다가 실수로 동작을 바꿔버려도 <code>cargo test</code> 한 번으로 바로 알아챌 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 20);
          const b = randInt(1, 20);
          const expected = randInt(1, 40);
          const passes = a + b === expected;
          return {
            type: 'blank',
            q: `<code>fn add(a: i32, b: i32) -> i32 { a + b } #[test] fn t() { assert_eq!(add(${a}, ${b}), ${expected}); }</code>를 <code>cargo test</code>로 실행하면? ("성공" 또는 "실패")`,
            prefix: '', suffix: '', accept: [passes ? '성공' : '실패'], placeholder: '성공 또는 실패',
            why: passes ? `add(${a}, ${b})는 ${a + b}이고 기댓값 ${expected}와 같아서 테스트가 성공해요.` : `add(${a}, ${b})는 ${a + b}인데 기댓값 ${expected}와 달라서 테스트가 실패해요.`,
            hint: 'add(a, b)의 실제 결과와 assert_eq!의 기댓값을 비교해보세요.'
          };
        },
        () => makeChoice(
          '테스트로 인식될 함수 위에 붙이는 속성은?',
          '#[test]', ['#[main]', '#[cfg(run)]', '#[assert]'],
          '<code>#[test]</code>를 붙인 함수는 cargo test 실행 시 자동으로 호출돼요.',
          '대괄호 안에 test라는 단어가 그대로 들어가요.'
        ),
        () => makeChoice(
          '<code>assert_eq!(값1, 값2)</code>가 하는 일은?',
          '두 값이 다르면 테스트를 실패시키고 차이를 보여준다', ['두 값을 항상 같게 만든다', '값1을 값2로 대입한다', '값이 같으면 프로그램을 종료한다'],
          'assert_eq!는 두 값을 비교해서 다르면 실패로 처리하고, 어떤 값이 기대와 달랐는지 알려줘요.',
          '테스트가 실패하면 어떤 값이 나왔는지 자세히 알려주는 게 assert_eq!의 장점이에요.'
        ),
        () => ({
          type: 'blank',
          q: `테스트 모듈 안에서 파일 최상위의 함수들을 가져올 때 쓰는 use 문을 쓰세요.`,
          prefix: 'use ', suffix: ';', accept: ['super::*'], placeholder: 'use 대상',
          why: '<code>use super::*;</code>는 부모 모듈(파일 최상위)의 모든 공개 항목을 가져와요.',
          hint: 'super는 "상위" 모듈을 가리켜요.'
        }),
        () => ({
          type: 'code',
          q: '<code>fn double(n: i32) -> i32 { n * 2 }</code>가 <code>double(3)</code>에서 <code>6</code>을 반환하는지 확인하는 <code>#[test]</code> 함수 <code>doubles_correctly</code>를 작성하세요. (assert_eq! 사용)',
          starter: '',
          rows: 3,
          placeholder: '#[test]\nfn doubles_correctly() {\n    assert_eq!(double(3), 6);\n}',
          accept: ['#[test]\nfn doubles_correctly() {\n    assert_eq!(double(3), 6);\n}'],
          why: '#[test]로 테스트 함수임을 표시하고, assert_eq!로 기대값과 실제 값을 비교해요.',
          hint: '#[test] fn doubles_correctly() { assert_eq!(double(3), 6); }'
        }),
      ],
      boss: () => {
        const n = randInt(1, 10);
        const expected = pick([n * n, n * n + 1]);
        const passes = n * n === expected;
        return {
          type: 'blank',
          q: `<code>fn square(n: i32) -> i32 { n * n } #[test] fn t() { assert_eq!(square(${n}), ${expected}); }</code>를 <code>cargo test</code>로 실행하면? ("성공" 또는 "실패")`,
          prefix: '', suffix: '', accept: [passes ? '성공' : '실패'], placeholder: '성공 또는 실패',
          why: passes ? `square(${n})은 ${n * n}이고 기댓값과 일치해서 성공해요.` : `square(${n})은 ${n * n}인데 기댓값(${expected})과 달라서 실패해요.`,
          hint: 'n의 제곱과 기댓값을 비교해보세요.'
        };
      }
    },
    {
      id: 'integrationTests',
      title: '통합 테스트와 단위 테스트',
      ready: true,
      summary: 'tests/ 디렉터리의 통합 테스트와, 모듈 안 단위 테스트의 차이를 배워요.',
      goals: ['단위 테스트 vs 통합 테스트', 'tests/ 폴더의 역할', '공개 API만 테스트하는 통합 테스트'],
      blocks: [
        {
          h: '단위 테스트: 코드 내부의 세부 동작 검증',
          html: `<p>지금까지 본 <code>#[cfg(test)] mod tests { }</code> 안의 테스트는 <b>단위 테스트(unit test)</b>예요. 같은 파일 안에 있어서 비공개(private) 함수도 테스트할 수 있어요. "이 함수 하나가 제대로 동작하는가"를 세밀하게 확인해요.</p>`,
          code: {
            label: 'src/lib.rs',
            lang: 'rust',
            src: `pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn unit_test_add() {
        assert_eq!(add(1, 2), 3);
    }
}`,
            out: `test tests::unit_test_add ... ok`
          }
        },
        {
          h: '통합 테스트: tests/ 폴더에서 공개 API만 검증',
          html: `<p>프로젝트 루트의 <code>tests/</code> 디렉터리에 있는 파일들은 <b>통합 테스트(integration test)</b>로 취급돼요. 이 테스트들은 라이브러리 바깥에서 <code>pub</code>으로 공개된 API만 실제 사용자처럼 호출해서 검증해요.</p>`,
          code: {
            label: 'tests/integration_test.rs',
            lang: 'rust',
            src: `use my_crate::add; // 공개된 API만 가져와서 사용

#[test]
fn integration_test_add() {
    assert_eq!(add(2, 2), 4);
}`,
            out: `test integration_test_add ... ok`
          },
          after: `<div class="note"><b>정리</b> — 단위 테스트는 "내부 구현이 세부적으로 맞는지"를, 통합 테스트는 "외부에서 봤을 때 라이브러리 전체가 의도대로 동작하는지"를 확인해요. <code>cargo test</code>는 두 종류 모두 함께 실행해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '단위 테스트(unit test)가 주로 확인하는 것은?',
          '함수 하나하나의 내부 동작이 세밀하게 맞는지', ['프로젝트 전체의 공개 API만', '다른 프로젝트와의 호환성', '실행 파일의 배포 여부'],
          '단위 테스트는 같은 파일 안에서 비공개 함수까지 포함해 세밀하게 개별 동작을 검증해요.',
          '"세밀함"이 단위 테스트의 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `프로젝트 루트에서 통합 테스트 파일들을 담아두는 디렉터리 이름을 쓰세요.`,
          prefix: '', suffix: '/', accept: ['tests'], placeholder: '디렉터리 이름',
          why: '<code>tests/</code> 디렉터리 안의 파일들은 자동으로 통합 테스트로 취급돼요.',
          hint: '영어로 "테스트들"이라는 뜻이에요.'
        }),
        () => makeChoice(
          '통합 테스트가 라이브러리의 비공개(private) 함수를 직접 테스트할 수 없는 이유는?',
          '통합 테스트는 라이브러리 바깥에서 pub 함수만 가져와 쓰기 때문에', ['통합 테스트는 애초에 함수를 호출할 수 없기 때문에', '비공개 함수는 테스트가 불가능한 문법이라서', '통합 테스트는 cargo test로 실행되지 않기 때문에'],
          '통합 테스트는 실제 사용자처럼 외부에서 크레이트를 사용하는 것을 흉내 내므로, pub으로 공개된 항목만 접근할 수 있어요.',
          '"진짜 사용자 입장"에서 테스트한다는 관점이에요.'
        ),
        () => makeChoice(
          '<code>cargo test</code>를 실행하면 어떤 테스트들이 함께 실행되나요?',
          '단위 테스트와 통합 테스트 모두', ['단위 테스트만', '통합 테스트만', '아무 테스트도 자동 실행되지 않는다'],
          'cargo test는 mod tests 안의 단위 테스트와 tests/ 폴더의 통합 테스트를 모두 실행해요.',
          '한 명령어로 프로젝트의 모든 테스트를 확인할 수 있어요.'
        ),
        () => ({
          type: 'code',
          q: '<code>tests/basic.rs</code> 파일에서, <code>my_crate</code>의 <code>add</code> 함수를 가져와 <code>add(1, 1)</code>이 <code>2</code>인지 확인하는 통합 테스트 함수 <code>it_adds</code>를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'use my_crate::add;\n\n#[test]\nfn it_adds() {\n    assert_eq!(add(1, 1), 2);\n}',
          accept: ['use my_crate::add;\n\n#[test]\nfn it_adds() {\n    assert_eq!(add(1, 1), 2);\n}'],
          why: 'use로 공개 API를 가져오고, #[test] 함수 안에서 assert_eq!로 검증해요.',
          hint: 'use my_crate::add; #[test] fn it_adds() { assert_eq!(add(1, 1), 2); }'
        }),
      ],
      boss: () => makeChoice(
        '단위 테스트와 통합 테스트의 차이를 가장 정확히 설명한 것은?',
        '단위 테스트는 파일 안에서 비공개 함수까지 세밀하게, 통합 테스트는 tests/ 폴더에서 공개 API만 외부 관점으로 검증한다',
        ['단위 테스트는 느리고, 통합 테스트는 항상 빠르다', '통합 테스트만 assert_eq!를 쓸 수 있다', '단위 테스트는 cargo build로, 통합 테스트는 cargo test로 실행한다'],
        '둘 다 cargo test로 실행되지만, 위치와 접근 범위(비공개 포함 여부)가 다르다는 게 핵심 차이예요.',
        '"어디에 위치하는가"와 "무엇에 접근할 수 있는가"를 기준으로 구분해보세요.'
      )
    },
    {
      id: 'fileIO',
      title: '파일 입출력: std::fs',
      ready: true,
      summary: '파일을 읽고 쓰는 방법과, 그 과정에서 Result로 오류를 다루는 법을 배워요.',
      goals: ['fs::read_to_string으로 파일 읽기', 'fs::write로 파일 쓰기', '? 연산자로 파일 오류 전파하기'],
      blocks: [
        {
          h: '파일 읽기: fs::read_to_string',
          html: `<p>파일 입출력은 항상 실패할 수 있어요(파일이 없거나, 권한이 없거나...). 그래서 <code>std::fs</code>의 함수들은 대부분 <code>Result</code>를 반환해요.</p>`,
          code: {
            label: 'read_file.rs',
            lang: 'rust',
            src: `use std::fs;

fn main() {
    match fs::read_to_string("greeting.txt") {
        Ok(content) => println!("내용: {}", content),
        Err(e) => println!("읽기 실패: {}", e),
    }
}`,
            out: `읽기 실패: No such file or directory (os error 2)`
          }
        },
        {
          h: '? 연산자로 파일 오류를 간결하게 전파하기',
          html: `<p>파일을 읽는 함수를 만들 때, 매번 match를 쓰지 않고 <code>?</code>로 오류를 즉시 전파할 수 있어요. 이 함수의 반환 타입도 <code>Result</code>여야 해요.</p>`,
          code: {
            label: 'read_with_question.rs',
            lang: 'rust',
            src: `use std::fs;

fn read_greeting() -> Result<String, std::io::Error> {
    let content = fs::read_to_string("greeting.txt")?;
    Ok(content)
}

fn main() {
    match read_greeting() {
        Ok(c) => println!("{}", c),
        Err(e) => println!("오류: {}", e),
    }
}`,
            out: `오류: No such file or directory (os error 2)`
          },
          after: `<div class="note"><b>정리</b> — 파일 쓰기는 <code>fs::write("파일명", 내용)</code>으로 한 번에 할 수 있어요. 파일 입출력, 네트워크 통신처럼 "외부 세계와 상호작용"하는 작업은 실패할 수 있다는 걸 항상 염두에 두고 Result로 다루는 게 Rust의 기본 철학이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>fs::read_to_string("파일명")</code>의 반환 타입은?',
          'Result<String, std::io::Error>', ['String (항상 성공)', 'Option<String>', 'bool'],
          '파일 읽기는 실패할 수 있어서 Result<String, io::Error>를 반환해요.',
          '실패 가능성이 있는 작업은 대부분 Result를 반환해요.'
        ),
        () => makeChoice(
          '존재하지 않는 파일을 <code>fs::read_to_string</code>으로 읽으려고 하면?',
          'Err(오류)가 반환된다', ['빈 문자열 Ok("")가 반환된다', '프로그램이 즉시 panic 한다', '자동으로 파일이 새로 생성된다'],
          '파일이 없으면 panic 없이 Err로 감싸진 오류가 반환되어, match나 ?로 안전하게 처리할 수 있어요.',
          'unwrap()을 쓰지 않는 한 panic이 나지 않아요.'
        ),
        () => ({
          type: 'blank',
          q: `파일에 내용을 한 번에 쓰는 함수 이름을 쓰세요. (fs::___("파일명", 내용))`,
          prefix: 'fs::', suffix: '("파일명", 내용)', accept: ['write'], placeholder: '함수 이름',
          why: '<code>fs::write(경로, 내용)</code>은 파일을 만들거나 덮어써서 내용을 저장해요.',
          hint: '"쓰다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>fn read_greeting() -> Result<String, std::io::Error> { let content = fs::read_to_string("f.txt")?; Ok(content) }</code>에서 <code>?</code>의 역할은?',
          'read_to_string이 Err를 반환하면 즉시 그 오류를 read_greeting의 반환값으로 전파한다', ['오류를 무시하고 빈 문자열로 대체한다', '항상 panic을 일으킨다', '파일을 자동으로 다시 생성한다'],
          '?는 Err인 경우 그 자리에서 즉시 함수 밖으로 오류를 반환해요.',
          '이 함수 자체도 Result를 반환하기 때문에 ?를 쓸 수 있어요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"data.txt"</code> 파일을 읽어서, 성공하면 내용을 출력하고 실패하면 <code>"오류: {메시지}"</code>를 출력하는 코드를 match로 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'match fs::read_to_string("data.txt") {\n    Ok(content) => println!("{}", content),\n    Err(e) => println!("오류: {}", e),\n}',
          accept: ['match fs::read_to_string("data.txt") {\n    Ok(content) => println!("{}", content),\n    Err(e) => println!("오류: {}", e),\n}'],
          why: 'Result를 match로 분기해서 Ok/Err 각각을 안전하게 처리해요.',
          hint: 'match fs::read_to_string(...) { Ok(c) => ..., Err(e) => ... }'
        }),
      ],
      boss: () => makeChoice(
        '다음 중 파일 입출력을 다루는 방식으로 가장 안전한 코드는?',
        'match fs::read_to_string("data.txt") { Ok(c) => println!("{}", c), Err(e) => println!("오류: {}", e) }',
        ['let c = fs::read_to_string("data.txt").unwrap();', 'let c = fs::read_to_string("data.txt").expect("무조건 있음");', 'fs::read_to_string("data.txt"); // 반환값 무시'],
        'match로 Ok/Err를 모두 처리하면 파일이 없어도 프로그램이 panic 없이 정상적으로 오류 메시지를 출력해요. unwrap/expect는 실패 시 프로그램을 강제 종료시켜요.',
        '실패 가능성이 있는 파일 작업은 unwrap보다 match/? 처리가 안전해요.'
      )
    },
    {
      id: 'deriveMacros',
      title: '흔한 파생 매크로: Debug, Clone, PartialEq',
      ready: true,
      summary: '#[derive(...)]로 반복 코드 없이 트레이트를 자동 구현하는 법을 배워요.',
      goals: ['#[derive(Debug)]로 {:?} 출력 지원', '#[derive(Clone)]로 복제 지원', '#[derive(PartialEq)]로 == 비교 지원'],
      blocks: [
        {
          h: '#[derive(...)]: 트레이트 구현을 자동으로',
          html: `<p>Debug, Clone, PartialEq 같은 트레이트는 대부분 "필드를 하나하나 비교/복사/출력"하는 뻔한 규칙으로 구현돼요. <code>#[derive(...)]</code>를 구조체/enum 위에 붙이면, 컴파일러가 이 뻔한 구현을 자동으로 만들어줘요.</p>`,
          code: {
            label: 'derive_basic.rs',
            lang: 'rust',
            src: `#[derive(Debug, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p1 = Point { x: 1, y: 2 };
    let p2 = p1.clone();
    println!("{:?}", p1);
    println!("{}", p1 == p2);
}`,
            out: `Point { x: 1, y: 2 }\ntrue`
          }
        },
        {
          h: '각 파생 매크로가 추가해주는 능력',
          html: `<p><code>Debug</code>는 <code>{:?}</code> 디버그 출력을, <code>Clone</code>은 <code>.clone()</code> 메서드로 값 복제를, <code>PartialEq</code>는 <code>==</code>/<code>!=</code> 비교를 가능하게 해줘요. 필드가 모두 그 트레이트를 구현하고 있어야 구조체 전체에도 derive할 수 있어요.</p>`,
          code: {
            label: 'derive_each.rs',
            lang: 'rust',
            src: `#[derive(Debug, PartialEq)]
struct Point { x: i32, y: i32 }

fn main() {
    let a = Point { x: 1, y: 2 };
    let b = Point { x: 1, y: 3 };
    println!("{}", a == b);
    println!("{:?}", b);
}`,
            out: `false\nPoint { x: 1, y: 3 }`
          },
          after: `<div class="note"><b>정리</b> — derive는 "직접 구현할 수도 있지만 너무 뻔해서 자동화한 것"이에요. 필드 중 하나라도 그 트레이트를 구현하지 않으면(예: 함수 포인터가 아닌 이상 대부분의 기본 타입은 다 지원), derive도 컴파일 오류가 나요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const x1 = randInt(1, 10);
          const y1 = randInt(1, 10);
          const same = pick([true, false]);
          const x2 = same ? x1 : x1 + 1;
          return {
            type: 'blank',
            q: `<code>#[derive(Debug, PartialEq)] struct Point { x: i32, y: i32 } let a = Point { x: ${x1}, y: ${y1} }; let b = Point { x: ${x2}, y: ${y1} }; println!("{}", a == b);</code>를 실행하면? (true/false)`,
            prefix: '', suffix: '', accept: [String(same)], placeholder: 'true 또는 false',
            why: same ? 'a와 b의 모든 필드 값이 같으므로 true예요.' : 'x 필드 값이 서로 달라서 false예요.',
            hint: 'PartialEq는 모든 필드가 같아야 true예요.'
          };
        },
        () => makeChoice(
          '<code>#[derive(Debug)]</code>를 구조체에 붙이면 가능해지는 것은?',
          '{:?}로 구조체를 출력할 수 있다', ['구조체를 자동으로 복제할 수 있다', '구조체를 ==로 비교할 수 있다', '구조체의 필드를 자동으로 늘릴 수 있다'],
          'Debug를 derive하면 {:?} 서식으로 구조체 내용을 출력할 수 있게 돼요.',
          '복제는 Clone, 비교는 PartialEq의 역할이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>.clone()</code> 메서드를 자동으로 만들어주는 파생 매크로 이름을 쓰세요.`,
          prefix: '#[derive(', suffix: ')]', accept: ['Clone'], placeholder: '트레이트 이름',
          why: '<code>#[derive(Clone)]</code>은 .clone() 메서드로 값을 복제할 수 있게 해줘요.',
          hint: '"복제하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '#[derive(...)]가 존재하는 이유는?',
          'Debug/Clone/PartialEq 같은 뻔한 트레이트 구현을 매번 손으로 쓰지 않게 해준다', ['모든 트레이트를 자동으로 구현해준다(예외 없이)', '구조체의 필드를 자동으로 추가해준다', '성능을 최적화해준다'],
          'derive는 필드 하나하나를 비교/복사/출력하는 뻔한 패턴을 자동으로 만들어주는 것이지, 모든 트레이트에 다 쓸 수 있는 건 아니에요.',
          '복잡한 커스텀 로직이 필요한 트레이트는 직접 impl해야 해요.'
        ),
        () => ({
          type: 'code',
          q: '<code>x: i32</code>, <code>y: i32</code> 필드를 가진 구조체 <code>Point</code>에 <code>Debug</code>, <code>Clone</code>, <code>PartialEq</code>를 모두 derive하세요.',
          starter: '',
          rows: 4,
          placeholder: '#[derive(Debug, Clone, PartialEq)]\nstruct Point {\n    x: i32,\n    y: i32,\n}',
          accept: ['#[derive(Debug, Clone, PartialEq)]\nstruct Point {\n    x: i32,\n    y: i32,\n}'],
          why: '#[derive(...)] 안에 필요한 트레이트를 쉼표로 나열해요.',
          hint: '#[derive(Debug, Clone, PartialEq)] struct Point { x: i32, y: i32, }'
        }),
      ],
      boss: () => {
        const x = randInt(1, 20);
        const y = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>#[derive(Debug, Clone, PartialEq)] struct Point { x: i32, y: i32 } let a = Point { x: ${x}, y: ${y} }; let b = a.clone(); println!("{} {:?}", a == b, b);</code>를 실행하면? (그대로 입력, 예: true Point { x: 1, y: 2 })`,
          prefix: '', suffix: '', accept: [`true Point { x: ${x}, y: ${y} }`], placeholder: '출력 결과',
          why: `clone()으로 만든 b는 a와 값이 완전히 같으므로 a == b는 true이고, {:?}로 출력하면 Point { x: ${x}, y: ${y} }가 나와요.`,
          hint: 'clone()으로 만든 복사본은 원본과 값이 동일해요.'
        };
      }
    },
    {
      id: 'patternMatchingDeepDive',
      title: '패턴 매칭 심화: 가드, @, 구조 분해',
      ready: true,
      summary: 'match 가드, @ 바인딩, 구조체/튜플 구조 분해 패턴을 배워요.',
      goals: ['match 가드(if 조건)로 추가 조건 걸기', '@ 로 값을 바인딩하며 범위 확인', '구조체/튜플 구조 분해 패턴'],
      blocks: [
        {
          h: 'match 가드: 패턴에 추가 조건 걸기',
          html: `<p>패턴 뒤에 <code>if 조건</code>을 붙이면, 패턴이 일치해도 그 조건까지 참이어야 그 분기가 선택돼요. 이를 <b>match 가드(match guard)</b>라고 해요.</p>`,
          code: {
            label: 'match_guard.rs',
            lang: 'rust',
            src: `fn main() {
    let n = 4;
    match n {
        x if x % 2 == 0 => println!("{}은 짝수", x),
        x => println!("{}은 홀수", x),
    }
}`,
            out: `4은 짝수`
          }
        },
        {
          h: '@ 바인딩과 구조 분해',
          html: `<p><code>@</code>는 범위에 매칭하면서 동시에 그 값을 변수에 담아 쓰고 싶을 때 써요. 구조체나 튜플은 <code>Point { x, y }</code>처럼 필드를 바로 변수로 <b>구조 분해(destructuring)</b>할 수 있어요.</p>`,
          code: {
            label: 'at_and_destructure.rs',
            lang: 'rust',
            src: `struct Point { x: i32, y: i32 }

fn main() {
    let age = 17;
    match age {
        n @ 13..=19 => println!("{}살, 10대예요", n),
        n => println!("{}살, 10대가 아니에요", n),
    }

    let p = Point { x: 3, y: 4 };
    let Point { x, y } = p;
    println!("{} {}", x, y);
}`,
            out: `17살, 10대예요\n3 4`
          },
          after: `<div class="note"><b>정리</b> — match 가드는 패턴만으로 표현하기 어려운 조건(짝수 여부 등)을 추가할 때, @ 바인딩은 "범위 확인 + 값 사용"을 동시에 하고 싶을 때, 구조 분해는 구조체/튜플의 필드를 한 번에 변수로 꺼내고 싶을 때 각각 유용해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(1, 20);
          const isEven = n % 2 === 0;
          return {
            type: 'blank',
            q: `<code>match ${n} { x if x % 2 == 0 => println!("{}은 짝수", x), x => println!("{}은 홀수", x) }</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [isEven ? `${n}은 짝수` : `${n}은 홀수`], placeholder: '출력 결과',
            why: `${n}은 2로 나눈 나머지가 ${n % 2}이므로 ${isEven ? '짝수' : '홀수'}예요.`,
            hint: '가드 조건 x % 2 == 0이 참인지 확인해보세요.'
          };
        },
        () => makeChoice(
          'match 패턴 뒤에 붙는 <code>if 조건</code>을 부르는 이름은?',
          'match 가드(match guard)', ['match 필터(match filter)', 'match 조건(match condition)', 'match 클로저(match closure)'],
          '패턴 매칭에 조건을 추가로 거는 것을 match 가드라고 해요.',
          '패턴이 일치해도 가드가 거짓이면 그 분기는 선택되지 않아요.'
        ),
        () => {
          const age = randInt(10, 25);
          const isTeen = age >= 13 && age <= 19;
          return {
            type: 'blank',
            q: `<code>match ${age} { n @ 13..=19 => println!("{}살, 10대예요", n), n => println!("{}살, 10대가 아니에요", n) }</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [isTeen ? `${age}살, 10대예요` : `${age}살, 10대가 아니에요`], placeholder: '출력 결과',
            why: `${age}는 13~19 범위에 ${isTeen ? '속하므로' : '속하지 않으므로'} "${isTeen ? `${age}살, 10대예요` : `${age}살, 10대가 아니에요`}"가 출력돼요.`,
            hint: '13..=19 범위 안에 드는지 확인해보세요.'
          };
        },
        () => makeChoice(
          '<code>let Point { x, y } = p;</code>처럼 구조체 필드를 변수로 바로 꺼내는 것을 부르는 이름은?',
          '구조 분해(destructuring)', ['재귀 분해(recursive decomposition)', '필드 삭제(field deletion)', '타입 변환(type casting)'],
          '구조체나 튜플의 필드를 한 번에 변수들로 꺼내는 것을 구조 분해라고 해요.',
          '패턴 매칭 문법의 일종이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>n</code>이 <code>0</code>보다 크면서 짝수인 경우 "양의 짝수"를, 그 외에는 "기타"를 출력하는 match(가드 사용)를 작성하세요. (n은 8로 선언)',
          starter: '',
          rows: 4,
          placeholder: 'let n = 8;\nmatch n {\n    x if x > 0 && x % 2 == 0 => println!("양의 짝수"),\n    _ => println!("기타"),\n}',
          accept: ['let n = 8;\nmatch n {\n    x if x > 0 && x % 2 == 0 => println!("양의 짝수"),\n    _ => println!("기타"),\n}'],
          why: '가드 조건 x > 0 && x % 2 == 0으로 양의 짝수만 걸러내요.',
          hint: 'x if x > 0 && x % 2 == 0 => ...'
        }),
      ],
      boss: () => {
        const x = randInt(1, 10);
        const y = randInt(1, 10);
        return {
          type: 'blank',
          q: `<code>struct Point { x: i32, y: i32 } let p = Point { x: ${x}, y: ${y} }; let Point { x, y } = p; println!("{}", x + y);</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(x + y)], placeholder: '숫자',
          why: `구조 분해로 x, y 변수에 각각 ${x}, ${y}가 담기므로 합은 ${x + y}예요.`,
          hint: '구조 분해된 x, y는 원래 필드 값을 그대로 담고 있어요.'
        };
      }
    },
    {
      id: 'operatorOverloading',
      title: '연산자 오버로딩: std::ops',
      ready: true,
      summary: '+ 같은 연산자를 내 타입에서도 쓸 수 있게 만드는 std::ops 트레이트를 배워요.',
      goals: ['Add 트레이트로 + 연산자 구현하기', 'operator overloading의 원리(트레이트 구현일 뿐)', '언제 연산자 오버로딩이 적절한지'],
      blocks: [
        {
          h: 'impl Add: + 연산자를 내 타입에 구현하기',
          html: `<p>Rust의 <code>+</code> 연산자는 사실 마법이 아니라 <code>std::ops::Add</code> 트레이트를 구현한 것뿐이에요. 내 구조체에 <code>Add</code>를 구현하면 <code>+</code>로 두 인스턴스를 더할 수 있게 돼요.</p>`,
          code: {
            label: 'operator_add.rs',
            lang: 'rust',
            src: `use std::ops::Add;

#[derive(Debug, Clone, Copy)]
struct Point { x: i32, y: i32 }

impl Add for Point {
    type Output = Point;
    fn add(self, other: Point) -> Point {
        Point { x: self.x + other.x, y: self.y + other.y }
    }
}

fn main() {
    let a = Point { x: 1, y: 2 };
    let b = Point { x: 3, y: 4 };
    println!("{:?}", a + b);
}`,
            out: `Point { x: 4, y: 6 }`
          }
        },
        {
          h: '연산자 오버로딩은 언제 쓰면 좋을까?',
          html: `<p>좌표, 벡터, 행렬처럼 "수학적으로 자연스러운 덧셈/곱셈이 있는" 타입에는 연산자 오버로딩이 코드를 훨씬 읽기 쉽게 만들어요. 반대로 의미가 명확하지 않은 타입에 <code>+</code>를 억지로 구현하면 오히려 코드를 헷갈리게 만들 수 있어요.</p>`,
          code: {
            label: 'operator_when.rs',
            lang: 'rust',
            src: `// 좋은 예: 벡터 덧셈은 직관적
// let v3 = v1 + v2;

// 나쁜 예: "직원 + 직원"이 무엇을 뜻하는지 불명확
// let weird = employee1 + employee2; // 이런 연산은 피하는 게 좋음`,
            out: `(설계 판단에 관한 예시, 실행 결과 없음)`
          },
          after: `<div class="note"><b>정리</b> — std::ops에는 Add 외에도 Sub(-), Mul(*), Index([]) 등 다양한 연산자에 대응하는 트레이트가 있어요. 원리는 모두 같아요: "연산자 = 트레이트 구현".</div>`
        }
      ],
      quizGenerators: [
        () => {
          const x1 = randInt(1, 10);
          const y1 = randInt(1, 10);
          const x2 = randInt(1, 10);
          const y2 = randInt(1, 10);
          return {
            type: 'blank',
            q: `<code>impl Add for Point { type Output = Point; fn add(self, other: Point) -> Point { Point { x: self.x + other.x, y: self.y + other.y } } } let a = Point { x: ${x1}, y: ${y1} }; let b = Point { x: ${x2}, y: ${y2} }; println!("{:?}", a + b);</code>를 실행하면? (Rust 디버그 형식, 예: Point { x: 1, y: 2 })`,
            prefix: '', suffix: '', accept: [`Point { x: ${x1 + x2}, y: ${y1 + y2} }`], placeholder: '출력 결과',
            why: `Add 구현대로 x끼리, y끼리 더해서 Point { x: ${x1 + x2}, y: ${y1 + y2} }가 돼요.`,
            hint: '각 필드를 따로따로 더해요.'
          };
        },
        () => makeChoice(
          'Rust에서 <code>+</code> 연산자를 내 타입에 대해 쓸 수 있게 만드는 방법은?',
          'std::ops::Add 트레이트를 구현한다', ['+ 연산자는 오버로딩할 수 없다', '#[derive(Add)]만 붙이면 자동으로 된다(표준 라이브러리 기본 기능)', '구조체 이름을 Add로 바꾼다'],
          '+ 연산자는 Add 트레이트의 add 메서드 호출로 컴파일되므로, 이 트레이트를 구현하면 + 를 쓸 수 있어요.',
          '연산자 오버로딩 = 특정 트레이트 구현이라는 것이 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>impl Add for Point { type ___ = Point; ... }</code>에서 연산 결과의 타입을 지정하는 연관 타입 이름을 쓰세요.`,
          prefix: 'type ', suffix: ' = Point;', accept: ['Output'], placeholder: '연관 타입 이름',
          why: 'Add 트레이트는 <code>type Output</code>으로 덧셈 결과의 타입을 지정해야 해요.',
          hint: '"결과, 출력"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '연산자 오버로딩을 쓰기에 적절하지 않은 경우는?',
          '더하기의 의미가 명확하지 않은 타입(예: 직원 + 직원)', ['좌표나 벡터처럼 수학적으로 자연스러운 덧셈이 있는 타입', '행렬 덧셈처럼 관습적으로 잘 알려진 연산', '복소수처럼 산술 연산이 정의된 타입'],
          '의미가 불명확한 타입에 연산자를 억지로 구현하면 코드를 읽는 사람이 헷갈릴 수 있어요.',
          '"직관적으로 이해되는가"가 판단 기준이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>x: i32</code> 필드를 가진 <code>Point</code>에 대해, <code>self.x + other.x</code>를 결과로 하는 <code>Add</code> 구현을 작성하세요. (Output은 Point)',
          starter: '',
          rows: 5,
          placeholder: 'impl Add for Point {\n    type Output = Point;\n    fn add(self, other: Point) -> Point {\n        Point { x: self.x + other.x }\n    }\n}',
          accept: ['impl Add for Point {\n    type Output = Point;\n    fn add(self, other: Point) -> Point {\n        Point { x: self.x + other.x }\n    }\n}'],
          why: 'Add 트레이트는 type Output과 add 메서드를 구현해야 해요.',
          hint: 'impl Add for Point { type Output = Point; fn add(self, other: Point) -> Point { ... } }'
        }),
      ],
      boss: () => {
        const x1 = randInt(1, 20);
        const x2 = randInt(1, 20);
        const x3 = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>impl Add for Point { type Output = Point; fn add(self, other: Point) -> Point { Point { x: self.x + other.x } } } let a = Point { x: ${x1} }; let b = Point { x: ${x2} }; let c = Point { x: ${x3} }; println!("{:?}", a + b + c);</code>를 실행하면? (Rust 디버그 형식, 예: Point { x: 값 })`,
          prefix: '', suffix: '', accept: [`Point { x: ${x1 + x2 + x3} }`], placeholder: '출력 결과',
          why: `a + b + c는 왼쪽부터 차례로 add가 호출되어 x 값이 모두 더해져 Point { x: ${x1 + x2 + x3} }가 돼요.`,
          hint: '+ 연산은 왼쪽에서 오른쪽 순서로 계산돼요.'
        };
      }
    },
    {
      id: 'customIterator',
      title: '커스텀 이터레이터: impl Iterator',
      ready: true,
      summary: '내가 만든 타입도 for로 순회하고 map/filter를 쓸 수 있게 Iterator 트레이트를 구현해요.',
      goals: ['Iterator 트레이트와 next() 메서드', '내 타입에 Iterator 구현하기', 'Iterator를 구현하면 map/filter도 공짜로 딸려옴'],
      blocks: [
        {
          h: 'Iterator 트레이트: next() 하나만 구현하면 끝',
          html: `<p><code>Iterator</code> 트레이트는 <code>next(&mut self) -> Option<Self::Item></code> 딱 하나만 요구해요. 값이 있으면 <code>Some(값)</code>, 다 돌았으면 <code>None</code>을 반환하면 돼요.</p>`,
          code: {
            label: 'custom_iterator.rs',
            lang: 'rust',
            src: `struct Counter { count: u32 }

impl Iterator for Counter {
    type Item = u32;
    fn next(&mut self) -> Option<u32> {
        if self.count < 3 {
            self.count += 1;
            Some(self.count)
        } else {
            None
        }
    }
}

fn main() {
    let c = Counter { count: 0 };
    for n in c {
        println!("{}", n);
    }
}`,
            out: `1\n2\n3`
          }
        },
        {
          h: 'next()만 구현하면 map/filter/sum도 전부 공짜',
          html: `<p>Iterator 트레이트는 <code>next()</code> 하나만 직접 구현하면, <code>map</code>, <code>filter</code>, <code>sum</code>, <code>collect</code> 같은 수십 개의 메서드를 <b>기본 구현으로 자동으로</b> 쓸 수 있게 돼요(이 메서드들은 모두 next()를 반복 호출해서 동작하니까요).</p>`,
          code: {
            label: 'custom_iterator_adapters.rs',
            lang: 'rust',
            src: `struct Counter { count: u32 }
impl Iterator for Counter {
    type Item = u32;
    fn next(&mut self) -> Option<u32> {
        if self.count < 5 {
            self.count += 1;
            Some(self.count)
        } else {
            None
        }
    }
}

fn main() {
    let total: u32 = Counter { count: 0 }.map(|n| n * 2).sum();
    println!("{}", total);
}`,
            out: `30`
          },
          after: `<div class="note"><b>정리</b> — next() 하나만 제대로 구현하면 나머지 이터레이터 생태계(map, filter, zip, take, skip 등)를 전부 무료로 얻는 게 Rust 트레이트 시스템의 강력한 점이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const limit = randInt(2, 5);
          return {
            type: 'blank',
            q: `<code>struct Counter { count: u32 } impl Iterator for Counter { type Item = u32; fn next(&mut self) -> Option<u32> { if self.count < ${limit} { self.count += 1; Some(self.count) } else { None } } } for n in (Counter { count: 0 }) { println!("{}", n); }</code>를 실행하면, 출력 순서는? (줄바꿈으로 구분)`,
            prefix: '', suffix: '', accept: [Array.from({ length: limit }, (_, i) => i + 1).join('\n')], placeholder: '출력 순서',
            why: `count가 0에서 시작해 ${limit}이 될 때까지 1씩 늘어나며 그 값을 반환하므로, 1부터 ${limit}까지 차례로 출력돼요.`,
            hint: 'next()가 count를 1씩 늘리며 Some(count)을 반환해요.'
          };
        },
        () => makeChoice(
          'Iterator 트레이트를 구현하기 위해 반드시 작성해야 하는 메서드는?',
          'next(&mut self) -> Option<Self::Item>', ['map(&self)', 'collect(&self)', 'len(&self)'],
          'Iterator 트레이트가 요구하는 필수 메서드는 next() 하나뿐이에요.',
          '나머지 메서드들은 모두 기본 구현으로 제공돼요.'
        ),
        () => makeChoice(
          '커스텀 타입에 Iterator를 구현하면 map(), filter(), sum() 같은 메서드를 추가로 구현하지 않아도 쓸 수 있는 이유는?',
          'Iterator 트레이트가 next()를 기반으로 한 기본 구현을 이미 제공하기 때문에', ['Rust 컴파일러가 자동으로 모든 메서드를 추론해서', '이 메서드들은 원래 모든 타입에 기본 제공되기 때문에', 'map/filter/sum은 매크로라서 트레이트와 무관해서'],
          'Iterator 트레이트는 next()만 구현하면, map/filter/sum 등 나머지 메서드를 기본 구현으로 제공해서 추가 구현 없이 바로 쓸 수 있어요.',
          '"기본 메서드"라는 개념이 여기서도 똑같이 적용돼요.'
        ),
        () => ({
          type: 'blank',
          q: `Iterator 트레이트에서 순회되는 값의 타입을 지정하는 연관 타입 이름을 쓰세요. (type ___ = u32;)`,
          prefix: 'type ', suffix: ' = u32;', accept: ['Item'], placeholder: '연관 타입 이름',
          why: '<code>type Item</code>은 이 이터레이터가 만들어내는 값의 타입을 지정해요.',
          hint: '"항목, 값"이라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>count: u32</code> 필드를 가진 <code>Counter</code>에 대해, <code>count</code>가 3 미만이면 늘려서 Some을, 아니면 None을 반환하는 <code>Iterator</code>를 구현하세요. (Item은 u32)',
          starter: '',
          rows: 8,
          placeholder: 'impl Iterator for Counter {\n    type Item = u32;\n    fn next(&mut self) -> Option<u32> {\n        if self.count < 3 {\n            self.count += 1;\n            Some(self.count)\n        } else {\n            None\n        }\n    }\n}',
          accept: ['impl Iterator for Counter {\n    type Item = u32;\n    fn next(&mut self) -> Option<u32> {\n        if self.count < 3 {\n            self.count += 1;\n            Some(self.count)\n        } else {\n            None\n        }\n    }\n}'],
          why: 'next()에서 조건에 따라 Some 또는 None을 반환해 순회를 제어해요.',
          hint: 'if self.count < 3 { ... Some(...) } else { None }'
        }),
      ],
      boss: () => {
        const limit = randInt(3, 6);
        const total = Array.from({ length: limit }, (_, i) => (i + 1) * 2).reduce((a, b) => a + b, 0);
        return {
          type: 'blank',
          q: `<code>struct Counter { count: u32 } impl Iterator for Counter { type Item = u32; fn next(&mut self) -> Option<u32> { if self.count < ${limit} { self.count += 1; Some(self.count) } else { None } } } let total: u32 = Counter { count: 0 }.map(|n| n * 2).sum(); println!("{}", total);</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
          why: `1부터 ${limit}까지의 값을 각각 2배로 만든 뒤 더하면 ${total}이에요.`,
          hint: '먼저 각 값을 2배로 만들고, 그 값들을 모두 더해보세요.'
        };
      }
    },
    {
      id: 'builderPattern',
      title: '빌더 패턴',
      ready: true,
      summary: '복잡한 인스턴스를 단계적으로, 읽기 쉽게 조립하는 빌더 패턴을 배워요.',
      goals: ['빌더 패턴이 필요한 이유', '메서드 체이닝으로 옵션 설정하기', 'build()로 최종 인스턴스 완성하기'],
      blocks: [
        {
          h: '왜 빌더 패턴이 필요할까?',
          html: `<p>필드가 많고 대부분 선택적(optional)인 구조체는, 생성자 하나에 인자를 다 몰아넣으면 어떤 인자가 무엇인지 읽기 어려워져요. <b>빌더 패턴</b>은 옵션을 하나씩 이름 붙여 설정하고, 마지막에 <code>build()</code>로 완성하는 방식이에요.</p>`,
          code: {
            label: 'builder_basic.rs',
            lang: 'rust',
            src: `struct Server {
    host: String,
    port: u16,
    timeout: u32,
}

struct ServerBuilder {
    host: String,
    port: u16,
    timeout: u32,
}

impl ServerBuilder {
    fn new() -> Self {
        ServerBuilder { host: String::from("localhost"), port: 8080, timeout: 30 }
    }
    fn port(mut self, port: u16) -> Self {
        self.port = port;
        self
    }
    fn build(self) -> Server {
        Server { host: self.host, port: self.port, timeout: self.timeout }
    }
}

fn main() {
    let server = ServerBuilder::new().port(9000).build();
    println!("{}:{}", server.host, server.port);
}`,
            out: `localhost:9000`
          }
        },
        {
          h: '메서드 체이닝: self를 반환해서 계속 이어붙이기',
          html: `<p>각 설정 메서드가 <code>self</code>(자기 자신)를 반환하면, <code>.port(9000).timeout(60)</code>처럼 점으로 계속 이어서 호출(<b>체이닝</b>)할 수 있어요. 마지막 <code>build()</code>는 <code>Server</code> 값을 만들어 반환해요.</p>`,
          code: {
            label: 'builder_chaining.rs',
            lang: 'rust',
            src: `struct ServerBuilder { port: u16, timeout: u32 }
impl ServerBuilder {
    fn new() -> Self { ServerBuilder { port: 8080, timeout: 30 } }
    fn port(mut self, port: u16) -> Self { self.port = port; self }
    fn timeout(mut self, timeout: u32) -> Self { self.timeout = timeout; self }
}

fn main() {
    let b = ServerBuilder::new().port(9000).timeout(60);
    println!("{} {}", b.port, b.timeout);
}`,
            out: `9000 60`
          },
          after: `<div class="note"><b>정리</b> — 빌더 패턴은 "기본값 + 필요한 것만 이름 붙여 설정"을 가능하게 해서, 선택적 옵션이 많은 API(HTTP 클라이언트, 서버 설정 등)를 훨씬 읽기 쉽게 만들어줘요. 실무 크레이트(reqwest 등)에서 정말 자주 볼 수 있는 패턴이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const port = randInt(1000, 9999);
          return {
            type: 'blank',
            q: `<code>let server = ServerBuilder::new().port(${port}).build(); println!("{}", server.port);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(port)], placeholder: '숫자',
            why: `.port(${port})로 설정했으므로 build() 후 server.port는 ${port}예요.`,
            hint: '체이닝된 메서드가 설정한 값이 최종 인스턴스에 반영돼요.'
          };
        },
        () => makeChoice(
          '빌더 패턴이 유용한 상황은?',
          '필드가 많고 대부분 선택적인 구조체를 읽기 쉽게 만들고 싶을 때', ['필드가 하나뿐인 아주 단순한 구조체를 만들 때', '값을 절대 바꾸지 말아야 할 때', '제네릭을 쓸 수 없을 때'],
          '옵션이 많고 대부분 기본값이 있는 경우, 빌더 패턴은 필요한 것만 이름 붙여 설정할 수 있게 해서 가독성을 높여줘요.',
          '생성자 인자가 너무 많아지는 문제를 해결해줘요.'
        ),
        () => ({
          type: 'blank',
          q: `빌더의 설정 메서드가 <code>.port(9000).timeout(60)</code>처럼 점으로 계속 이어 호출되게 만드는 방식을 영어로 뭐라고 하나요? (method ___)`,
          prefix: 'method ', suffix: '', accept: ['chaining'], placeholder: '영어 단어',
          why: '각 메서드가 self를 반환해서 계속 이어붙일 수 있게 하는 방식을 메서드 체이닝(method chaining)이라고 해요.',
          hint: '"사슬처럼 잇다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '빌더의 설정 메서드(예: port)가 <code>self</code>를 반환해야 하는 이유는?',
          '반환된 self에 다음 메서드를 계속 이어서 호출(체이닝)할 수 있게 하려고', ['컴파일 오류를 피하기 위해 어쩔 수 없이', 'self를 반환하지 않으면 값이 사라지기 때문에(항상)', '빌더 패턴과 무관하게 모든 메서드가 그래야 해서'],
          'self를 반환하면 그 반환값에 대해 또 다른 메서드를 호출할 수 있어서, 여러 설정을 점으로 이어붙일 수 있어요.',
          '반환값이 있어야 그 뒤에 .메서드()를 또 쓸 수 있어요.'
        ),
        () => ({
          type: 'code',
          q: '<code>port: u16</code> 필드를 가진 <code>ServerBuilder</code>에서, <code>self</code>를 받아 <code>port</code>를 바꾸고 <code>self</code>를 반환하는 메서드 <code>port</code>를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'fn port(mut self, port: u16) -> Self {\n    self.port = port;\n    self\n}',
          accept: ['fn port(mut self, port: u16) -> Self {\n    self.port = port;\n    self\n}'],
          why: 'mut self로 값을 받아 필드를 바꾸고, 마지막 줄에서 self를 반환해 체이닝이 가능하게 해요.',
          hint: 'fn port(mut self, port: u16) -> Self { self.port = port; self }'
        }),
      ],
      boss: () => {
        const port = randInt(1000, 9999);
        const timeout = randInt(10, 120);
        return {
          type: 'blank',
          q: `<code>let b = ServerBuilder::new().port(${port}).timeout(${timeout}); println!("{} {}", b.port, b.timeout);</code>를 실행하면? (그대로 입력, 공백 하나로 구분)`,
          prefix: '', suffix: '', accept: [`${port} ${timeout}`], placeholder: '출력 결과',
          why: `.port(${port})와 .timeout(${timeout})가 순서대로 체이닝되어 각각 필드에 반영돼요.`,
          hint: '체이닝된 각 메서드 호출이 순서대로 필드를 설정해요.'
        };
      }
    },
    {
      id: 'ffiAndNewtype',
      title: 'FFI 기초와 newtype 패턴',
      ready: true,
      summary: '다른 언어와의 연동(FFI) 개념과, 타입에 의미를 부여하는 newtype 패턴을 배워요.',
      goals: ['extern "C"로 다른 언어 함수 연결하기(개념)', 'unsafe가 필요한 이유', 'newtype으로 원시 타입에 의미 부여하기'],
      blocks: [
        {
          h: 'FFI: 다른 언어와 연결하기(개념 소개)',
          html: `<p>Rust는 <code>extern "C"</code> 블록으로 C 언어로 작성된 함수를 가져와 호출할 수 있어요. 컴파일러가 그 함수의 안전성을 보장할 수 없기 때문에, 이런 호출은 <code>unsafe</code> 블록 안에서만 허용돼요.</p>`,
          code: {
            label: 'ffi_concept.rs',
            lang: 'rust',
            src: `extern "C" {
    fn abs(input: i32) -> i32; // C 표준 라이브러리의 abs 함수
}

fn main() {
    unsafe {
        println!("{}", abs(-5));
    }
}`,
            out: `5`
          }
        },
        {
          h: 'newtype 패턴: 원시 타입에 의미 입히기',
          html: `<p>튜플 구조체로 원시 타입 하나를 감싸는 것을 <b>newtype 패턴</b>이라고 해요. <code>Age(u32)</code>는 그냥 <code>u32</code>와 값은 같지만, "이 숫자는 나이다"라는 의미를 타입 자체가 표현해줘서 실수로 다른 종류의 숫자와 섞어 쓰는 걸 컴파일 타임에 막아줘요.</p>`,
          code: {
            label: 'newtype_pattern.rs',
            lang: 'rust',
            src: `struct Age(u32);
struct Score(u32);

fn describe(age: Age) -> String {
    format!("나이: {}", age.0)
}

fn main() {
    let a = Age(17);
    println!("{}", describe(a));
    // describe(Score(90)); // 컴파일 오류! Score는 Age가 아님
}`,
            out: `나이: 17`
          },
          after: `<div class="note"><b>정리</b> — FFI는 이 강좌에서는 개념만 소개해요(실제로는 unsafe와 C 헤더 바인딩에 대한 깊은 이해가 추가로 필요해요). newtype은 훨씬 자주 쓰이는 실전 패턴으로, "같은 원시 타입이라도 의미가 다르면 다른 타입으로 만들어 실수를 방지한다"는 Rust식 안전 설계 철학을 보여줘요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>extern "C"</code> 블록으로 가져온 C 함수를 호출할 때 반드시 필요한 것은?',
          'unsafe 블록', ['async 블록', 'derive 매크로', 'trait 구현'],
          '컴파일러가 외부(C) 함수의 안전성을 보장할 수 없기 때문에, unsafe 블록 안에서만 호출이 허용돼요.',
          '"안전을 보장 못 하니 네가 책임져라"는 의미로 unsafe를 요구해요.'
        ),
        () => ({
          type: 'blank',
          q: `튜플 구조체로 원시 타입 하나를 감싸서 의미를 부여하는 패턴의 이름을 영어로 쓰세요.`,
          prefix: '', suffix: ' pattern', accept: ['newtype'], placeholder: '영어 단어',
          why: '이런 패턴을 newtype 패턴이라고 불러요.',
          hint: '"새로운 타입"이라는 뜻이 그대로 이름이 됐어요.'
        }),
        () => makeChoice(
          '<code>struct Age(u32); struct Score(u32);</code>처럼 같은 u32를 감싸는 두 타입을 따로 만드는 이유는?',
          'Age와 Score를 실수로 서로 바꿔 쓰는 것을 컴파일 타임에 막기 위해', ['u32보다 메모리를 더 적게 쓰기 위해', '연산 속도를 높이기 위해', 'u32로는 음수를 표현할 수 없어서'],
          '둘 다 내부적으로 u32여도 서로 다른 타입이라서, Age가 필요한 곳에 Score를 실수로 넣으면 컴파일 오류로 바로 잡을 수 있어요.',
          '"같은 모양이지만 의미가 다른 값"을 구분하는 게 핵심이에요.'
        ),
        () => makeChoice(
          'Rust에서 FFI(다른 언어와의 연동)가 unsafe를 요구하는 근본적인 이유는?',
          '외부 언어로 작성된 코드는 Rust의 소유권/빌림 규칙을 따르지 않아 컴파일러가 안전성을 검증할 수 없기 때문에', ['FFI 기능 자체가 실험적이라 항상 unsafe로 표시하기 때문에(다른 이유 없음)', 'C 언어가 항상 위험한 코드만 작성되기 때문에', 'unsafe를 붙이면 속도가 빨라지기 때문에'],
          'C 같은 다른 언어의 코드는 Rust의 안전성 규칙 검사 대상이 아니라서, 그 경계를 넘는 호출은 프로그래머가 안전성을 책임지는 unsafe로 표시해요.',
          'unsafe는 "위험하니 항상 조심하라"보다는 "컴파일러가 검증 못 하니 개발자가 검증했다는 표시"에 가까워요.'
        ),
        () => ({
          type: 'code',
          q: '<code>u32</code>를 감싸는 newtype <code>Age</code>를 튜플 구조체로 정의하세요.',
          starter: '',
          rows: 1,
          placeholder: 'struct Age(u32);',
          accept: ['struct Age(u32);'],
          why: '튜플 구조체로 원시 타입 하나를 감싸면 newtype 패턴이 돼요.',
          hint: 'struct Age(u32);'
        }),
      ],
      boss: () => makeChoice(
        '다음 중 newtype 패턴을 사용하는 목적으로 가장 알맞은 것은?',
        '같은 원시 타입이라도 의미가 다른 값끼리 실수로 섞이는 것을 컴파일 타임에 방지한다',
        ['프로그램의 실행 속도를 항상 더 빠르게 만든다', '메모리 사용량을 항상 줄여준다', '항상 스레드 안전성을 자동으로 보장한다'],
        'newtype은 성능이나 메모리보다는, 타입 수준에서 "의미"를 구분해 실수를 막는 안전성 목적이 핵심이에요.',
        'Age(u32)와 Score(u32)는 메모리 구조가 같아도, 타입으로서는 완전히 달라요.'
      )
    },
    {
      id: 'idiomaticRustRecap',
      title: '마무리: 관용적인 Rust 코드 한눈에 보기',
      ready: true,
      summary: '소유권, 트레이트, 에러 처리, 생태계까지 지금까지 배운 것을 하나의 작은 프로그램으로 정리해요.',
      goals: ['배운 개념들을 하나의 예제로 통합하기', '관용적인(idiomatic) Rust 스타일 정리', '다음 단계로 나아가기 위한 방향'],
      blocks: [
        {
          h: '지금까지 배운 것들을 한 번에',
          html: `<p>소유권과 빌림, Option/Result, 트레이트, derive, 제네릭까지 지금까지 배운 개념들을 작은 프로그램 하나로 모아봤어요. 실무 Rust 코드는 대부분 이런 조각들의 조합이에요.</p>`,
          code: {
            label: 'recap.rs',
            lang: 'rust',
            src: `#[derive(Debug, Clone)]
struct Student { name: String, score: u32 }

fn find_topper(students: &[Student]) -> Option<&Student> {
    students.iter().max_by_key(|s| s.score)
}

fn main() {
    let students = vec![
        Student { name: String::from("지수"), score: 90 },
        Student { name: String::from("민준"), score: 95 },
    ];
    match find_topper(&students) {
        Some(top) => println!("{}: {}점", top.name, top.score),
        None => println!("학생이 없어요"),
    }
}`,
            out: `민준: 95점`
          }
        },
        {
          h: '관용적인(idiomatic) Rust의 특징 정리',
          html: `<p>좋은 Rust 코드는 보통 이런 특징을 가져요: <b>불필요한 clone을 피하고 참조를 활용</b>, <b>unwrap보다 match/?로 오류 처리</b>, <b>enum과 match로 상태를 명확하게 표현</b>, <b>derive로 반복 코드 줄이기</b>, <b>제네릭+트레이트로 재사용 가능한 코드 작성</b>. 다음 단계로는 <code>cargo new</code>로 직접 작은 프로젝트를 만들어보고, crates.io에서 관심 있는 크레이트(웹 서버라면 <code>axum</code>, 비동기라면 <code>tokio</code>)를 살펴보는 것을 추천해요.</p>`,
          code: {
            label: 'idiomatic_checklist.txt',
            lang: 'rust',
            src: `체크리스트:
- 참조(&)로 충분한 곳에서 불필요한 clone()을 피했는가?
- unwrap/expect 대신 match나 ?로 실패를 처리했는가?
- 상태가 여러 경우로 나뉜다면 enum + match를 썼는가?
- 반복적인 트레이트 구현은 derive로 대체했는가?
- 여러 타입에 재사용될 코드는 제네릭+트레이트 경계로 작성했는가?`,
            out: `(자기 점검용 체크리스트)`
          },
          after: `<div class="note"><b>정리</b> — 여기까지 오셨다면 Rust의 핵심 개념(소유권, 빌림, 트레이트, 에러 처리, 동시성)을 모두 훑은 거예요. 이제부터는 직접 작은 프로젝트를 만들면서 컴파일러의 오류 메시지를 읽고 고쳐나가는 연습이 가장 빠른 성장 방법이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const scores = [randInt(60, 100), randInt(60, 100), randInt(60, 100)];
          const names = ['지수', '민준', '서연'];
          const maxIdx = scores.indexOf(Math.max(...scores));
          return {
            type: 'blank',
            q: `<code>students</code>가 (${names.map((n, i) => `${n}: ${scores[i]}점`).join(', ')})일 때, <code>find_topper</code>가 <code>max_by_key(|s| s.score)</code>로 찾은 학생을 출력하면? (형식: 이름: 점수점)`,
            prefix: '', suffix: '', accept: [`${names[maxIdx]}: ${scores[maxIdx]}점`], placeholder: '출력 결과',
            why: `점수가 가장 높은 학생은 ${names[maxIdx]}(${scores[maxIdx]}점)이에요.`,
            hint: '가장 높은 score를 가진 학생을 찾아보세요.'
          };
        },
        () => makeChoice(
          '관용적인(idiomatic) Rust 코드의 특징으로 옳지 않은 것은?',
          '가능한 모든 곳에서 unwrap()을 사용해 코드를 짧게 만든다', ['불필요한 clone()을 피하고 참조를 활용한다', '여러 상태를 enum과 match로 명확히 표현한다', '반복적인 트레이트 구현을 derive로 대체한다'],
          'unwrap()을 남용하는 것은 오히려 안 좋은 습관이에요. 실패 가능성은 match나 ?로 명시적으로 처리하는 게 관용적인 스타일이에요.',
          '"짧다"고 항상 "좋은 코드"는 아니에요.'
        ),
        () => ({
          type: 'blank',
          q: `여러 개의 값 중 특정 기준(예: score)으로 최댓값을 가진 원소를 찾는 이터레이터 메서드 이름을 쓰세요. (students.iter().___(|s| s.score))`,
          prefix: 'students.iter().', suffix: '(|s| s.score)', accept: ['max_by_key'], placeholder: '메서드 이름',
          why: '<code>max_by_key(클로저)</code>는 클로저가 반환하는 값을 기준으로 가장 큰 원소를 찾아줘요.',
          hint: '"기준(key)에 따른 최댓값(max)"이라는 뜻의 이름이에요.'
        }),
        () => makeChoice(
          '이 강좌를 마친 다음 단계로 추천되는 것은?',
          'cargo new로 직접 작은 프로젝트를 만들고 crates.io의 인기 크레이트를 살펴본다', ['모든 코드에 unsafe를 붙여서 연습한다', '더 이상 공부할 필요 없이 바로 대규모 서비스에 배포한다', 'Option과 Result 없이 코드를 짜는 연습을 한다'],
          '직접 작은 프로젝트를 만들어보고 실제 생태계(크레이트)를 탐험하는 것이 다음 성장 단계로 가장 추천돼요.',
          '이론을 실전 프로젝트에 적용해보는 게 가장 빠른 학습 방법이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Student { name: String, score: u32 }</code> 구조체 슬라이스에서 <code>score</code>가 가장 높은 학생의 참조를 <code>Option</code>으로 반환하는 함수 <code>find_topper</code>를 작성하세요. (max_by_key 사용)',
          starter: '',
          rows: 3,
          placeholder: 'fn find_topper(students: &[Student]) -> Option<&Student> {\n    students.iter().max_by_key(|s| s.score)\n}',
          accept: ['fn find_topper(students: &[Student]) -> Option<&Student> {\n    students.iter().max_by_key(|s| s.score)\n}'],
          why: 'iter().max_by_key(|s| s.score)는 score가 가장 큰 학생의 참조를 Option으로 돌려줘요.',
          hint: 'students.iter().max_by_key(|s| s.score)'
        }),
      ],
      boss: () => {
        const scores = [randInt(50, 100), randInt(50, 100), randInt(50, 100), randInt(50, 100)];
        const names = ['지수', '민준', '서연', '하늘'];
        const maxIdx = scores.indexOf(Math.max(...scores));
        return {
          type: 'blank',
          q: `<code>#[derive(Debug, Clone)] struct Student { name: String, score: u32 } fn find_topper(students: &[Student]) -> Option<&Student> { students.iter().max_by_key(|s| s.score) } let students = vec![${names.map((n, i) => `Student { name: String::from("${n}"), score: ${scores[i]} }`).join(', ')}]; match find_topper(&students) { Some(top) => println!("{}: {}점", top.name, top.score), None => println!("없음") }</code>를 실행하면? (형식: 이름: 점수점)`,
          prefix: '', suffix: '', accept: [`${names[maxIdx]}: ${scores[maxIdx]}점`], placeholder: '출력 결과',
          why: `${names.map((n, i) => `${n}(${scores[i]}점)`).join(', ')} 중 가장 높은 점수는 ${names[maxIdx]}의 ${scores[maxIdx]}점이에요.`,
          hint: 'max_by_key는 점수가 가장 높은 학생 하나를 찾아줘요.'
        };
      }
    }],
  tierBoss: {
    beginner: () => {
      const name = pick(['지수', '민준', '서연']);
      const age = randInt(14, 19);
      return {
        type: 'code',
        q: `<code>name</code>(문자열, "${name}")과 <code>age</code>(정수, ${age})를 변수로 선언하고, <code>age</code>가 18 이상이면 "성인", 아니면 "미성년자"를 출력하는 프로그램을 <code>fn main()</code> 안에 작성하세요.`,
        starter: '',
        rows: 8,
        placeholder: `fn main() {\n    let name = "${name}";\n    let age = ${age};\n    if age >= 18 {\n        println!("성인");\n    } else {\n        println!("미성년자");\n    }\n}`,
        accept: [`fn main() {\n    let name = "${name}";\n    let age = ${age};\n    if age >= 18 {\n        println!("성인");\n    } else {\n        println!("미성년자");\n    }\n}`],
        why: 'let으로 변수를 선언하고, if/else로 조건에 따라 다른 결과를 출력해요.',
        hint: 'let으로 name, age를 선언한 뒤 if age >= 18 { } else { }를 써보세요.'
      };
    },
    intermediate: () => ({
      type: 'code',
      q: '<code>Vec<i32></code>를 받아, 짝수만 골라 각 값을 제곱한 뒤 합을 반환하는 함수 <code>sum_of_even_squares(nums: &[i32]) -> i32</code>를 <code>iter()</code>, <code>filter</code>, <code>map</code>, <code>sum</code>을 이용해 작성하세요.',
      starter: '',
      rows: 4,
      placeholder: 'fn sum_of_even_squares(nums: &[i32]) -> i32 {\n    nums.iter().filter(|n| **n % 2 == 0).map(|n| n * n).sum()\n}',
      accept: ['fn sum_of_even_squares(nums: &[i32]) -> i32 {\n    nums.iter().filter(|n| **n % 2 == 0).map(|n| n * n).sum()\n}'],
      why: 'filter로 짝수만 남기고, map으로 제곱한 뒤, sum으로 모두 더해요.',
      hint: 'nums.iter().filter(|n| **n % 2 == 0).map(|n| n * n).sum()'
    }),
    advanced: () => ({
      type: 'code',
      q: '<code>fn area(&self) -> f64;</code>를 요구하는 트레이트 <code>Shape</code>를 정의하고, <code>width: f64, height: f64</code> 필드를 가진 <code>Rectangle</code> 구조체가 이를 구현(<code>area</code>는 width * height)하도록 작성하세요.',
      starter: '',
      rows: 8,
      placeholder: 'trait Shape {\n    fn area(&self) -> f64;\n}\n\nstruct Rectangle {\n    width: f64,\n    height: f64,\n}\n\nimpl Shape for Rectangle {\n    fn area(&self) -> f64 {\n        self.width * self.height\n    }\n}',
      accept: ['trait Shape {\n    fn area(&self) -> f64;\n}\n\nstruct Rectangle {\n    width: f64,\n    height: f64,\n}\n\nimpl Shape for Rectangle {\n    fn area(&self) -> f64 {\n        self.width * self.height\n    }\n}'],
      why: 'trait로 요구 사항을 정의하고, impl Shape for Rectangle로 실제 구현을 채워 넣어요.',
      hint: 'trait Shape { fn area(&self) -> f64; } 다음 struct Rectangle { ... } 다음 impl Shape for Rectangle { fn area(&self) -> f64 { self.width * self.height } }'
    }),
  }
};
