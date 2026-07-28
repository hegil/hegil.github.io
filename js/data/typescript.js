/* TypeScript 강의·문제 데이터 — 단원을 추가하려면 units 배열에 항목을 넣으면 됩니다. */
COURSES.typescript = {
    name: 'TypeScript',
    tagline: '이미 배운 JavaScript에 "타입"을 더해서, 실수를 미리 잡아주는 언어',
    units: [{
      id: 'intro',
      title: '타입스크립트는 어떤 언어인가요?',
      ready: true,
      intro: true,
      summary: '타입스크립트가 무엇이고, 자바스크립트와 어떻게 다르고, 왜 배우면 좋은지 알아봐요.',
      blocks: [
        {
          h: '타입스크립트는 어떤 언어인가요?',
          html: `<p>타입스크립트는 마이크로소프트가 만든 언어로, 자바스크립트에 "타입"을 더한 거예요. 우리가 쓴 타입스크립트 코드는 최종적으로 자바스크립트로 변환(컴파일)되어 브라우저에서 실행돼요.</p>`
        },
        {
          h: '자바스크립트와 뭐가 다른가요?',
          html: `<p>자바스크립트는 변수에 어떤 값이든 자유롭게 넣을 수 있지만, 실수를 실행 전까지 못 알아채는 단점이 있어요. 타입스크립트는 값의 종류(타입)를 미리 정해둬서, 그런 실수를 코드를 실행하기도 전에 미리 잡아줘요.</p>`
        },
        {
          h: '왜 배우면 좋을까요?',
          html: `<p>규모가 큰 웹 프로젝트에서 버그를 미리 방지해주기 때문에, 요즘 대부분의 최신 프론트엔드 프로젝트에서 기본으로 선택하는 언어예요. 자바스크립트를 이미 안다면 타입 관련 문법만 추가로 배우면 되고, 실무 채용 시장에서도 사실상 필수로 요구돼요.</p>`,
          after: `<div class="note"><b>팁</b> — 이 단원은 읽기만 하면 되고, 문제나 예제는 없어요. 다음 단원부터 진짜 코드를 써보기 시작해요!</div>`
        }
      ]
    },
    {
      id: 'basics',
      title: '타입 표기 기초',
      ready: true,
      summary: 'JavaScript에 자료형(타입)을 미리 적어두면 무엇이 좋은지, 기본 문법부터 배워요.',
      goals: ['변수에 타입 붙이기', 'string/number/boolean', '타입이 다르면 나는 오류'],
      blocks: [
        {
          h: '왜 굳이 타입을 적을까?',
          html: `<p>JavaScript는 변수에 어떤 값이든 자유롭게 넣을 수 있어요. 편리하지만, 실수로 숫자 자리에 글자를 넣어도 프로그램이 실행되기 전까지는 알 수 없어요. <b>TypeScript</b>는 변수를 만들 때 "이 변수는 이런 종류의 값만 담을 거야"라고 미리 적어둬서, 실수를 코드를 실행하기도 전에 미리 알려줘요.</p>`
        },
        {
          h: '기본 타입 표기법: 콜론(:)으로 적어요',
          html: `<p><code>let 이름: 타입 = 값;</code> 형태로, 변수 이름 뒤에 콜론(<code>:</code>)과 타입을 적어요. <code>string</code>(문자열), <code>number</code>(숫자), <code>boolean</code>(참/거짓)이 가장 기본적인 타입이에요.</p>`,
          code: {
            label: 'basics.ts',
            lang: 'typescript',
            src: `let age: number = 17;
let name: string = "지수";
let isStudent: boolean = true;

console.log(name, age, isStudent);`,
            out: `지수 17 true`
          }
        },
        {
          h: '타입이 안 맞으면, 실행 전에 바로 알려줘요',
          html: `<p><code>number</code>로 선언한 변수에 문자열을 넣으려고 하면, TypeScript는 코드를 실행하기 전에(컴파일할 때) 바로 오류를 알려줘요. 이게 JavaScript와 가장 큰 차이예요 — JavaScript였다면 이런 실수를 프로그램이 실제로 이상하게 동작할 때까지 몰랐을 거예요.</p>`,
          code: {
            label: 'error.ts',
            lang: 'typescript',
            src: `let age: number = 17;
age = "열일곱"; // 오류! Type 'string' is not assignable to type 'number'`
          },
          after: `<div class="note"><b>비유</b> — 타입은 "이 상자에는 이런 모양의 물건만 들어갈 수 있어요"라고 상자에 미리 붙여두는 이름표예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const kind = pick([
            { val: '17', type: 'number' },
            { val: '"지수"', type: 'string' },
            { val: 'true', type: 'boolean' },
          ]);
          return {
            type: 'blank',
            q: `값 <code>${kind.val}</code>을(를) 담는 변수를 선언하려고 해요. 콜론 뒤에 들어갈 타입을 쓰세요.`,
            prefix: 'let value: ', suffix: ` = ${kind.val};`, accept: [kind.type], placeholder: '타입',
            why: `<code>${kind.val}</code>은(는) <code>${kind.type}</code> 타입의 값이에요.`,
            hint: '따옴표가 있는지, true/false인지, 숫자인지를 보면 타입을 알 수 있어요.'
          };
        },
        () => makeChoice(
          'TypeScript에서 변수의 타입을 적을 때 쓰는 문장 부호는?',
          '<code>:</code>(콜론)', ['<code>;</code>(세미콜론)', '<code>=</code>(등호)', '<code>-</code>(하이픈)'],
          '<code>변수이름: 타입</code>처럼 콜론으로 타입을 적어요.',
          '시간을 나타낼 때(예: 3:00)도 쓰는 그 문장 부호예요.'
        ),
        () => {
          const name = pick(['민준', '서연', '하늘']);
          return {
            type: 'blank',
            q: `문자열 "${name}"을(를) 담는 변수 <code>name</code>을 선언하는 코드를 완성하세요.`,
            prefix: 'let name: string = ', suffix: ';', accept: [`"${name}"`, `'${name}'`], placeholder: '값',
            why: `<code>string</code> 타입에는 큰따옴표나 작은따옴표로 감싼 글자를 넣어요.`,
            hint: '타입이 string이니까, 따옴표로 감싼 값을 넣으면 돼요.'
          };
        },
        () => makeChoice(
          'JavaScript와 비교했을 때 TypeScript의 가장 큰 장점은?',
          '실수를 코드 실행 전에 미리 알려준다', ['실행 속도가 항상 더 빠르다', '더 적은 코드로 짤 수 있다', '브라우저가 아닌 곳에서도 실행된다'],
          'TypeScript는 타입이 잘못됐을 때 실행 전에 바로 알려줘서 실수를 미리 잡을 수 있어요.',
          '"미리 알려준다"는 표현이 핵심이에요.'
        ),
        () => ({
          type: 'code',
          q: '나이를 담는 변수 <code>age</code>(number 타입, 값 16)와 이름을 담는 변수 <code>name</code>(string 타입, 값 "민준")을 선언하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'let age: number = 16;\nlet name: string = "민준";',
          accept: ['let age: number = 16;\nlet name: string = "민준";'],
          why: '각 변수 이름 뒤에 콜론과 타입을 적고, 값을 대입해요.',
          hint: 'let 변수이름: 타입 = 값; 형태를 두 줄 쓰세요.'
        }),
      ],
      boss: () => {
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>let age: number = ${age};</code> 다음 줄에 <code>age = "${age}살";</code>을 쓰면 어떻게 될까요?`,
          prefix: '', suffix: '', accept: ['오류가 난다', '오류'], placeholder: '결과',
          why: `<code>age</code>는 <code>number</code> 타입인데 문자열을 넣으려고 해서, TypeScript가 실행 전에 타입 오류를 알려줘요.`,
          hint: 'number 타입 변수에 문자열을 넣으려고 하면 어떻게 될지 떠올려보세요.'
        };
      }
    },
    {
      id: 'functions',
      title: '함수와 타입',
      ready: true,
      summary: '함수의 매개변수와 반환값에도 타입을 붙여서, 잘못된 값이 들어오는 걸 미리 막아요.',
      goals: ['매개변수 타입', '반환 타입', '선택적 매개변수(?)'],
      blocks: [
        {
          h: '매개변수에 타입 붙이기',
          html: `<p>함수의 매개변수 뒤에도 콜론으로 타입을 적어요. 그러면 그 함수를 호출할 때 잘못된 타입의 값을 넘기면 바로 오류가 나요.</p>`,
          code: {
            label: 'func.ts',
            lang: 'typescript',
            src: `function add(a: number, b: number): number {
  return a + b;
}

console.log(add(3, 4));
// add("3", 4); // 오류! string은 number 자리에 못 들어감`,
            out: `7`
          }
        },
        {
          h: '함수의 반환 타입',
          html: `<p>매개변수 목록의 괄호 뒤에 콜론을 붙이고 타입을 적으면, 그 함수가 <b>무엇을 돌려줄지</b>를 미리 정해두는 거예요. 위 예시의 <code>: number</code>가 바로 반환 타입이에요.</p>`
        },
        {
          h: '있어도 되고 없어도 되는 값: 선택적 매개변수(?)',
          html: `<p>매개변수 이름 뒤에 물음표(<code>?</code>)를 붙이면 "이 값은 안 넘겨도 괜찮다"는 뜻이 돼요. 값을 안 넘기면 그 매개변수는 <code>undefined</code>가 돼요.</p>`,
          code: {
            label: 'optional.ts',
            lang: 'typescript',
            src: `function greet(name: string, title?: string): string {
  if (title) {
    return \`안녕하세요, \${title} \${name}님\`;
  }
  return \`안녕하세요, \${name}님\`;
}

console.log(greet("지수"));
console.log(greet("민준", "박사"));`,
            out: `안녕하세요, 지수님\n안녕하세요, 박사 민준님`
          },
          after: `<div class="note"><b>주의</b> — 선택적 매개변수(<code>?</code>)는 항상 필수 매개변수 뒤에 와야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>function add(a: number, b: number): number { return a + b; }</code>에 <code>add(${a}, ${b})</code>라고 호출하면 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `${a} + ${b} = ${a + b}가 반환돼요.`,
            hint: '매개변수 타입은 그냥 계산에 필요한 값이 뭔지 알려줄 뿐, 계산 자체는 평소와 같아요.'
          };
        },
        () => ({
          type: 'blank',
          q: `함수가 <code>number</code> 값을 반환한다고 표시하려고 해요. 빈칸을 채우세요.`,
          prefix: 'function square(n: number)', suffix: ' { return n * n; }', accept: [': number'], placeholder: ': 타입',
          why: '매개변수 괄호 뒤에 <code>: number</code>를 적으면 반환 타입을 지정해요.',
          hint: '괄호 뒤, 중괄호 앞에 콜론과 타입을 적으면 돼요.'
        }),
        () => makeChoice(
          '매개변수를 "있어도 되고 없어도 되는 값"으로 만드는 기호는?',
          '<code>?</code>', ['<code>!</code>', '<code>*</code>', '<code>&</code>'],
          '<code>이름?: 타입</code>처럼 물음표를 붙이면 선택적 매개변수가 돼요.',
          '"물음표"는 "있을 수도, 없을 수도"라는 불확실함을 나타내죠.'
        ),
        () => makeChoice(
          '선택적 매개변수(?)를 넘기지 않고 함수를 호출하면, 그 매개변수의 값은?',
          '<code>undefined</code>', ['<code>null</code>', '<code>0</code>', '오류가 난다'],
          '값을 넘기지 않으면 그 매개변수는 <code>undefined</code>가 돼요.',
          '"아직 정해지지 않음"을 뜻하는 값이에요.'
        ),
        () => ({
          type: 'code',
          q: '두 수를 곱해서 반환하는 함수 <code>multiply</code>를 작성하세요. 매개변수 <code>a</code>, <code>b</code>와 반환값 모두 <code>number</code> 타입이어야 해요.',
          starter: '',
          rows: 3,
          placeholder: 'function multiply(a: number, b: number): number {\n  return a * b;\n}',
          accept: ['function multiply(a: number, b: number): number {\n  return a * b;\n}'],
          why: '매개변수 두 개에 각각 <code>: number</code>를 붙이고, 함수 자체에도 <code>: number</code>로 반환 타입을 붙여요.',
          hint: 'function multiply(a: number, b: number): number { } 안에 return a * b;를 쓰세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const hasTitle = Math.random() < 0.5;
        const title = pick(['박사', '선생님', '팀장']);
        const result = hasTitle ? `안녕하세요, ${title} ${name}님` : `안녕하세요, ${name}님`;
        return {
          type: 'blank',
          q: `<code>function greet(name: string, title?: string): string { if (title) { return \`안녕하세요, \${title} \${name}님\`; } return \`안녕하세요, \${name}님\`; }</code>일 때, <code>greet("${name}"${hasTitle ? `, "${title}"` : ''})</code>의 결과는? (그대로 입력)`,
          prefix: '', suffix: '', accept: [result], placeholder: '출력될 문장',
          why: hasTitle
            ? `title에 "${title}"을 넘겼으니 <code>if (title)</code>가 참이 되어 "${result}"가 반환돼요.`
            : `title을 넘기지 않아 undefined가 되어 <code>if (title)</code>가 거짓이 되고, "${result}"가 반환돼요.`,
          hint: 'title을 넘겼는지 안 넘겼는지에 따라 if문의 결과가 달라져요.'
        };
      }
    },
    {
      id: 'interfaces',
      title: '인터페이스로 객체 모양 정의하기',
      ready: true,
      summary: '객체가 어떤 속성들을 가져야 하는지 미리 정해두는 interface를 배워요.',
      goals: ['interface', '객체 타입 검사', '선택적 속성'],
      blocks: [
        {
          h: '객체의 생김새를 미리 정하기: interface',
          html: `<p><code>interface</code>는 "이런 모양의 객체만 인정한다"는 약속을 정해두는 문법이에요. 객체가 <code>interface</code>에 정해둔 속성들을 갖고 있지 않으면 TypeScript가 오류를 알려줘요.</p>`,
          code: {
            label: 'interface.ts',
            lang: 'typescript',
            src: `interface Student {
  name: string;
  age: number;
}

const jisu: Student = { name: "지수", age: 17 };
console.log(jisu.name, jisu.age);`,
            out: `지수 17`
          }
        },
        {
          h: '속성이 하나라도 빠지면 오류예요',
          html: `<p><code>Student</code> 인터페이스는 <code>name</code>과 <code>age</code>를 <b>둘 다</b> 요구해요. 하나라도 빠뜨리고 객체를 만들면 TypeScript가 바로 알려줘요.</p>`,
          code: {
            label: 'missing.ts',
            lang: 'typescript',
            src: `interface Student {
  name: string;
  age: number;
}

const wrong: Student = { name: "민준" };
// 오류! age가 없어요`
          }
        },
        {
          h: '있어도 되고 없어도 되는 속성: ?',
          html: `<p>함수의 선택적 매개변수처럼, 인터페이스의 속성 이름 뒤에도 <code>?</code>를 붙이면 "이 속성은 있어도 되고 없어도 된다"는 뜻이 돼요.</p>`,
          code: {
            label: 'optional_prop.ts',
            lang: 'typescript',
            src: `interface Student {
  name: string;
  age: number;
  club?: string;
}

const minjun: Student = { name: "민준", age: 16 };
console.log(minjun.club);`,
            out: `undefined`
          },
          after: `<div class="note"><b>정리</b> — interface는 객체를 위한 "체크리스트"라고 생각하면 쉬워요. 필수 항목은 반드시, 선택 항목(?)은 있어도 없어도 괜찮아요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '객체가 어떤 속성들을 가져야 하는지 미리 정해두는 문법은?',
          '<code>interface</code>', ['<code>function</code>', '<code>import</code>', '<code>const</code>'],
          '<code>interface</code>는 객체의 모양(속성과 타입)을 미리 정해두는 약속이에요.',
          '"~사이의 접점, 규격"이라는 뜻의 영어 단어예요.'
        ),
        () => {
          const age = randInt(14, 19);
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>interface Student { name: string; age: number; }</code>이고 <code>const s: Student = { name: "${name}", age: ${age} };</code>일 때, <code>s.age</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(age)], placeholder: '숫자',
            why: `<code>s</code> 객체의 <code>age</code> 속성에 ${age}를 넣었으니 그대로 ${age}예요.`,
            hint: '인터페이스는 타입 검사만 할 뿐, 객체 안의 값을 꺼내는 방법은 평소와 똑같아요.'
          };
        },
        () => ({
          type: 'blank',
          q: `<code>Student</code> 인터페이스에 "있어도 되고 없어도 되는" 속성 <code>club</code>(문자열)을 추가하려고 해요. 빈칸을 채우세요.`,
          prefix: 'interface Student { name: string; age: number; club', suffix: ': string; }', accept: ['?'], placeholder: '기호',
          why: '속성 이름 뒤에 <code>?</code>를 붙이면 선택적 속성이 돼요.',
          hint: '함수의 선택적 매개변수에도 쓰는 그 기호예요.'
        }),
        () => makeChoice(
          '<code>interface Student { name: string; age: number; }</code>일 때, <code>const s: Student = { name: "지수" };</code>는 어떻게 될까요?',
          '오류가 난다 (age가 빠졌어요)', ['정상적으로 실행된다', 's.age가 자동으로 0이 된다', 's.age가 undefined가 된다(오류 없이)'],
          'age는 필수 속성인데 빠졌으니 TypeScript가 오류를 알려줘요.',
          '물음표(?)가 없는 속성은 반드시 있어야 해요.'
        ),
        () => ({
          type: 'code',
          q: '<code>name</code>(string)과 <code>score</code>(number) 속성을 가지는 <code>Player</code> 인터페이스를 정의하고, <code>const p: Player = { name: "서연", score: 90 };</code>로 객체를 만드는 코드를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'interface Player {\n  name: string;\n  score: number;\n}\n\nconst p: Player = { name: "서연", score: 90 };',
          accept: ['interface Player {\n  name: string;\n  score: number;\n}\n\nconst p: Player = { name: "서연", score: 90 };'],
          why: 'interface로 Player의 모양을 정의하고, 그 타입에 맞춰 객체를 만들어요.',
          hint: 'interface Player { name: string; score: number; } 다음에, 그 타입에 맞는 객체를 만들어보세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        const hasClub = Math.random() < 0.5;
        const club = pick(['농구부', '미술부', '방송부']);
        const result = hasClub ? club : 'undefined';
        return {
          type: 'blank',
          q: `<code>interface Student { name: string; age: number; club?: string; }</code>이고 <code>const s: Student = { name: "${name}", age: ${age}${hasClub ? `, club: "${club}"` : ''} };</code>일 때, <code>console.log(s.club);</code>의 결과는? (따옴표 없이, 없으면 undefined라고 쓰세요)`,
          prefix: '', suffix: '', accept: [result], placeholder: '값',
          why: hasClub
            ? `club에 "${club}"을 넣었으니 그대로 출력돼요.`
            : `club은 선택적 속성이라 넣지 않아도 오류가 안 나지만, 값이 없으니 undefined가 출력돼요.`,
          hint: 'club을 객체에 넣었는지 안 넣었는지 확인해보세요. 선택적 속성은 안 넣어도 오류가 안 나요.'
        };
      }
    },
    {
      id: 'union',
      title: '유니언 타입과 타입 좁히기',
      ready: true,
      summary: '"이거 아니면 저거" 식으로 여러 타입 중 하나를 허용하는 유니언 타입을 배워요.',
      goals: ['유니언 타입(|)', 'typeof로 좁히기', '리터럴 타입'],
      blocks: [
        {
          h: '여러 타입 중 하나: 유니언(|)',
          html: `<p><code>타입1 | 타입2</code>처럼 세로 막대(<code>|</code>)로 이으면 "이 값은 타입1이거나 타입2다"라는 뜻이 돼요. 예를 들어 학번이 숫자로 된 경우도 있고 문자로 된 경우도 있다면 <code>number | string</code>으로 표현해요.</p>`,
          code: {
            label: 'union.ts',
            lang: 'typescript',
            src: `let id: number | string;

id = 101;
console.log(id);

id = "A101";
console.log(id);`,
            out: `101\nA101`
          }
        },
        {
          h: 'typeof로 안전하게 좁히기',
          html: `<p>유니언 타입 변수를 쓸 때는, 지금 <b>실제로 어떤 타입인지</b> 확인하고 나서 그 타입에 맞는 동작을 해야 안전해요. <code>typeof 값 === "타입이름"</code>으로 확인하는 걸 <b>타입 좁히기</b>라고 해요.</p>`,
          code: {
            label: 'narrowing.ts',
            lang: 'typescript',
            src: `function printId(id: number | string) {
  if (typeof id === "number") {
    console.log("숫자 학번: " + id);
  } else {
    console.log("문자 학번: " + id);
  }
}

printId(101);
printId("A101");`,
            out: `숫자 학번: 101\n문자 학번: A101`
          }
        },
        {
          h: '정해진 값만 허용하기: 리터럴 타입',
          html: `<p>타입 자리에 특정 문자열 값을 그대로 적으면, "이 값들 중 하나만 허용한다"는 뜻이 돼요. 예를 들어 <code>let dir: "left" | "right";</code>라고 하면 <code>dir</code>에는 정말로 <code>"left"</code>나 <code>"right"</code>만 넣을 수 있어요.</p>`,
          after: `<div class="note"><b>비유</b> — 유니언 타입은 "이 문은 열쇠 A나 열쇠 B로만 열 수 있어요"라는 뜻이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '"이 값은 이 타입이거나 저 타입이다"를 나타낼 때 쓰는 기호는?',
          '<code>|</code>', ['<code>&amp;</code>', '<code>?</code>', '<code>:</code>'],
          '<code>타입1 | 타입2</code>는 둘 중 하나를 허용하는 유니언 타입이에요.',
          '세로로 곧게 뻗은 막대 기호예요. 키보드에서 Shift+역슬래시 위치에 있어요.'
        ),
        () => {
          const useNumber = Math.random() < 0.5;
          const val = useNumber ? randInt(1, 999) : `"A${randInt(100, 999)}"`;
          const type = useNumber ? 'number' : 'string';
          return {
            type: 'blank',
            q: `<code>let id: number | string; id = ${val};</code> 후, <code>typeof id</code>의 결과는? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [type], placeholder: '타입 이름',
            why: `${val}은(는) ${type} 타입의 값이라서, <code>typeof id</code>는 "${type}"이에요.`,
            hint: '지금 실제로 들어있는 값이 숫자인지 글자인지 보면 알 수 있어요.'
          };
        },
        () => ({
          type: 'blank',
          q: `유니언 타입 변수의 실제 타입을 확인할 때 쓰는 연산자를 쓰세요.`,
          prefix: 'if (', suffix: ' id === "number") { ... }', accept: ['typeof'], placeholder: '연산자',
          why: '<code>typeof 값</code>은 그 값의 실제 타입을 문자열로 알려줘요.',
          hint: '"~의 타입"이라는 뜻의 영어 단어 조합이에요.'
        }),
        () => makeChoice(
          '<code>let dir: "left" | "right";</code>에 <code>dir = "up";</code>을 넣으면 어떻게 될까요?',
          '오류가 난다 ("up"은 허용된 값이 아니에요)', ['정상적으로 저장된다', '자동으로 "left"로 바뀐다', 'undefined가 된다'],
          '리터럴 유니언 타입은 정해둔 값들만 허용해서, 그 외의 값을 넣으면 오류가 나요.',
          '"left"와 "right"만 허용했지, "up"은 그 목록에 없어요.'
        ),
        () => ({
          type: 'code',
          q: '<code>id</code>가 <code>number | string</code> 타입인 매개변수를 받아, <code>typeof id === "number"</code>이면 <code>"숫자"</code>를, 아니면 <code>"문자"</code>를 반환하는 함수 <code>checkType</code>을 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: 'function checkType(id: number | string) {\n  if (typeof id === "number") {\n    return "숫자";\n  } else {\n    return "문자";\n  }\n}',
          accept: ['function checkType(id: number | string) {\n  if (typeof id === "number") {\n    return "숫자";\n  } else {\n    return "문자";\n  }\n}'],
          why: 'typeof로 실제 타입을 확인한 뒤, 그에 맞는 값을 반환해요.',
          hint: 'function checkType(id: number | string) { } 안에서 typeof id로 타입을 확인하는 if/else를 쓰세요.'
        }),
      ],
      boss: () => {
        const useNumber = Math.random() < 0.5;
        const val = useNumber ? randInt(100, 999) : `"A${randInt(100, 999)}"`;
        const result = useNumber ? '숫자 학번' : '문자 학번';
        return {
          type: 'blank',
          q: `<code>function printId(id: number | string) { if (typeof id === "number") { return "숫자 학번: " + id; } else { return "문자 학번: " + id; } }</code>일 때, <code>printId(${val})</code>의 결과는? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`${result}: ${useNumber ? val : val.replace(/"/g, '')}`], placeholder: '출력될 문장',
          why: `${val}은(는) ${useNumber ? 'number' : 'string'} 타입이라서 "${result}: ..."가 반환돼요.`,
          hint: '넘긴 값이 숫자인지 문자인지에 따라 typeof 결과가 갈려요.'
        };
      }
    },
    {
      id: 'generics',
      title: '제네릭 기초',
      ready: true,
      summary: '자료형을 나중에 정할 수 있게 해주는 제네릭을 배워요. 배열 타입 표기법도 함께 배워요.',
      goals: ['배열 타입 표기(T[])', '제네릭 함수 <T>', '여러 타입에 재사용하기'],
      blocks: [
        {
          h: '배열에도 타입을 붙여요',
          html: `<p>배열의 타입은 <code>타입[]</code> 형태로 적어요. <code>number[]</code>는 "숫자로만 이루어진 배열"이라는 뜻이에요.</p>`,
          code: {
            label: 'array_type.ts',
            lang: 'typescript',
            src: `const scores: number[] = [90, 85, 100];
const names: string[] = ["지수", "민준"];

console.log(scores[0], names[1]);`,
            out: `90 민준`
          }
        },
        {
          h: '자료형을 나중에 정하는 함수: 제네릭',
          html: `<p><code>&lt;T&gt;</code>(타입 매개변수)를 쓰면, 함수 하나를 여러 자료형에 재사용할 수 있어요. <code>T</code>는 "이 함수를 호출할 때 정해질 자료형"을 뜻해요.</p>`,
          code: {
            label: 'generic.ts',
            lang: 'typescript',
            src: `function identity<T>(value: T): T {
  return value;
}

console.log(identity<number>(42));
console.log(identity<string>("안녕"));`,
            out: `42\n안녕`
          }
        },
        {
          h: '함수 하나로 여러 타입을 다 처리해요',
          html: `<p>제네릭이 없다면 숫자용 함수, 문자열용 함수를 각각 따로 만들어야 했을 거예요. 제네릭 덕분에 <code>identity</code> 함수 하나로 숫자든 문자열이든 객체든 다 처리할 수 있어요.</p>`,
          after: `<div class="note"><b>비유</b> — 제네릭은 "어떤 모양의 물건이든 담을 수 있는 만능 상자"예요. 상자를 쓸 때 "이번엔 숫자를 담을게"라고 정해주는 거예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const items = shuffle([70, 80, 90, 100, 60]).slice(0, 3);
          const idx = randInt(0, items.length - 1);
          return {
            type: 'blank',
            q: `<code>const scores: number[] = [${items.join(', ')}];</code>일 때, <code>scores[${idx}]</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(items[idx])], placeholder: '숫자',
            why: `배열 타입 표기(<code>number[]</code>)는 값을 꺼내는 방법에 영향을 주지 않아요. <code>scores[${idx}]</code>는 ${items[idx]}예요.`,
            hint: '타입 표기는 "이 배열엔 숫자만 들어간다"는 약속일 뿐, 인덱싱 방법은 똑같아요.'
          };
        },
        () => makeChoice(
          '숫자로만 이루어진 배열의 타입 표기로 옳은 것은?',
          '<code>number[]</code>', ['<code>[number]</code>', '<code>Array(number)</code>', '<code>number()</code>'],
          '<code>타입[]</code> 형태로 배열의 타입을 표기해요.',
          '타입 이름 뒤에 대괄호를 붙이면 그 타입의 배열이 돼요.'
        ),
        () => ({
          type: 'blank',
          q: `함수를 여러 자료형에 재사용할 수 있게, 타입 매개변수를 나타내는 표기를 완성하세요.`,
          prefix: 'function identity', suffix: '(value: T): T { return value; }', accept: ['<T>'], placeholder: '<타입매개변수>',
          why: '<code>&lt;T&gt;</code>는 "T는 나중에 정해질 자료형"이라는 뜻이에요.',
          hint: '꺾쇠괄호 안에 대문자 T를 넣으면 돼요.'
        }),
        () => {
          const val = pick([{ v: '42', t: 'number' }, { v: '"안녕"', t: 'string' }, { v: 'true', t: 'boolean' }]);
          return {
            type: 'blank',
            q: `<code>function identity&lt;T&gt;(value: T): T { return value; }</code>에 <code>identity(${val.v})</code>라고 호출하면 결과는? (그대로 입력, 문자열이면 따옴표 없이)`,
            prefix: '', suffix: '', accept: [val.v.replace(/"/g, '')], placeholder: '값',
            why: `<code>identity</code>는 넘긴 값을 그대로 돌려주는 함수라서, ${val.v}를 그대로 돌려줘요.`,
            hint: 'identity 함수는 받은 값을 그대로 반환할 뿐이에요.'
          };
        },
        () => ({
          type: 'code',
          q: '배열을 받아 첫 번째 값을 반환하는 제네릭 함수 <code>firstItem&lt;T&gt;</code>를 작성하세요. 매개변수는 <code>items: T[]</code>, 반환 타입은 <code>T</code>예요.',
          starter: '',
          rows: 3,
          placeholder: 'function firstItem<T>(items: T[]): T {\n  return items[0];\n}',
          accept: ['function firstItem<T>(items: T[]): T {\n  return items[0];\n}'],
          why: '<code>&lt;T&gt;</code>로 타입 매개변수를 선언하고, <code>T[]</code>로 그 타입의 배열을 받아, 첫 번째 값을 <code>T</code> 타입으로 반환해요.',
          hint: 'function firstItem<T>(items: T[]): T { } 안에 return items[0];을 쓰세요.'
        }),
      ],
      boss: () => {
        const items = shuffle(['지수', '민준', '서연', '하늘']).slice(0, randInt(2, 4));
        return {
          type: 'blank',
          q: `<code>function firstItem&lt;T&gt;(items: T[]): T { return items[0]; }</code>이고 <code>const names: string[] = [${items.map(v => `"${v}"`).join(', ')}];</code>일 때, <code>firstItem(names)</code>의 결과는? (따옴표 없이)`,
          prefix: '', suffix: '', accept: [items[0]], placeholder: '값',
          why: `<code>firstItem</code>은 배열의 첫 번째 값을 반환하는 함수라서, "${items[0]}"이 반환돼요.`,
          hint: 'firstItem 함수는 배열의 items[0]을 그대로 반환해요.'
        };
      }
    },
    {
      id: 'typeAlias',
      title: '타입 별칭(type)',
      ready: true,
      summary: '자주 쓰는 타입에 이름을 붙여두는 타입 별칭을 배워요.',
      goals: ['type으로 타입에 이름 붙이기', '객체 타입도 별칭으로 만들기', '왜 타입 별칭이 편리한지'],
      blocks: [
        {
          h: '타입에 이름 붙이기: type',
          html: `<p><code>type 이름 = 타입;</code>으로, 자주 쓰는 타입에 이름을 붙일 수 있어요.</p>`,
          code: {
            label: 'type_alias_basic.ts',
            lang: 'typescript',
            src: `type ID = number;

const userId: ID = 42;
console.log(userId);`,
            out: `42`
          }
        },
        {
          h: '객체 모양도 별칭으로',
          html: `<p>객체의 모양(어떤 속성을 가지는지)도 <code>type</code>으로 이름 붙일 수 있어요.</p>`,
          code: {
            label: 'type_alias_object.ts',
            lang: 'typescript',
            src: `type Point = { x: number; y: number };

const p: Point = { x: 3, y: 4 };
console.log(p.x, p.y);`,
            out: `3 4`
          }
        },
        {
          h: '왜 타입 별칭이 편리할까요',
          html: `<p>복잡한 타입을 매번 다시 쓰지 않고, 이름 하나로 재사용할 수 있어서 코드가 훨씬 짧고 읽기 쉬워져요.</p>`,
          after: `<div class="note"><b>참고</b> — 객체 모양을 표현할 땐 <code>interface</code>도 비슷하게 쓸 수 있어요. <code>type</code>은 그 외에도 유니언 타입 등 더 다양한 걸 담을 수 있다는 차이가 있어요(다음 단원에서 이어서 배워요).</div>`
        }
      ],
      quizGenerators: [
        () => {
          const val = randInt(1, 100);
          return {
            type: 'blank',
            q: `<code>type ID = number; const userId: ID = ${val};</code>일 때, <code>userId</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(val)], placeholder: '숫자',
            why: `ID는 number의 별칭일 뿐이라, userId는 그대로 ${val}이에요.`,
            hint: '타입 별칭은 실제 값에 영향을 주지 않고, 이름만 붙여줘요.'
          };
        },
        () => ({
          type: 'blank',
          q: `타입에 이름을 붙일 때 맨 앞에 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: ' ID = number;', accept: ['type'], placeholder: '키워드',
          why: '<code>type 이름 = 타입;</code>으로 타입 별칭을 만들어요.',
          hint: '"타입"이라는 뜻 그대로예요.'
        }),
        () => {
          const x = randInt(1, 20), y = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>type Point = { x: number; y: number }; const p: Point = { x: ${x}, y: ${y} };</code>일 때, <code>p.x + p.y</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(x + y)], placeholder: '숫자',
            why: `p.x는 ${x}, p.y는 ${y}이고, 더하면 ${x + y}예요.`,
            hint: '객체 속성 값을 그대로 더해보세요.'
          };
        },
        () => makeChoice(
          '타입 별칭(type)을 쓰면 좋은 점은?',
          '복잡한 타입을 이름 하나로 재사용할 수 있어서 코드가 짧고 읽기 쉬워져서',
          ['타입 별칭 없이는 변수를 선언할 수 없어서', '실행 속도가 항상 빨라져서', '타입 별칭은 런타임에 실제로 존재하는 값이라서'],
          '타입 별칭은 복잡한 타입에 이름을 붙여서, 매번 그 타입을 반복해서 쓰지 않아도 되게 해줘요.',
          '긴 객체 타입을 여러 곳에서 반복해서 쓰는 것과 이름 하나로 쓰는 것 중 어느 게 편할지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>name</code>(string)과 <code>age</code>(number)를 가진 객체 타입을 <code>Student</code>라는 이름으로 만드는 코드를 작성하세요.',
          starter: '',
          placeholder: 'type Student = { name: string; age: number };',
          accept: ['type Student = { name: string; age: number };'],
          why: 'type 이름 = { 속성: 타입; ... }; 형태로 객체 타입에 이름을 붙여요.',
          hint: 'type Student = { name: string; age: number };를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>type Student = { name: string; age: number };</code>로 만든 <code>const s: Student = { name: "${name}", age: ${age} };</code>일 때, <code>\`\${s.name}(\${s.age})\`</code>의 결과는?`,
          prefix: '', suffix: '', accept: [`${name}(${age})`], placeholder: '값',
          why: `s.name은 "${name}", s.age는 ${age}라서 "${name}(${age})"가 돼요.`,
          hint: '객체 속성 값을 템플릿 리터럴에 그대로 넣어보세요.'
        };
      }
    },
    {
      id: 'literalTypes',
      title: '리터럴 타입',
      ready: true,
      summary: '정확히 정해진 값만 허용하는 리터럴 타입으로, 오타 같은 실수를 컴파일 시점에 잡는 법을 배워요.',
      goals: ['정확한 값 하나만 허용하는 타입', '리터럴 유니언으로 여러 값 중 하나 허용하기', '오타 방지 효과'],
      blocks: [
        {
          h: '정확한 값만 허용하기: 리터럴 타입',
          html: `<p>문자열이나 숫자 <b>값 자체</b>를 타입으로 쓸 수 있어요. <code>"up" | "down" | "left" | "right"</code>는 "이 네 가지 문자열 중 하나만" 허용한다는 뜻이에요.</p>`,
          code: {
            label: 'literal_basic.ts',
            lang: 'typescript',
            src: `let direction: "up" | "down" | "left" | "right";
direction = "up";
console.log(direction);`,
            out: `up`
          }
        },
        {
          h: '함수 매개변수에도 활용하기',
          html: `<p>리터럴 유니언을 타입 별칭으로 만들어서 함수 매개변수에 쓰면, <b>정해진 값 외에는 아예 넘길 수 없게</b> 만들 수 있어요.</p>`,
          code: {
            label: 'literal_function.ts',
            lang: 'typescript',
            src: `type Direction = "up" | "down" | "left" | "right";

function move(dir: Direction) {
  console.log(dir);
}

move("up");`,
            out: `up`
          },
          after: `<div class="note"><b>오타 방지</b> — <code>move("Up")</code>처럼 대문자를 잘못 쓰면, 컴파일 시점에 바로 오류가 나서 실수를 미리 잡아줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const dirs = ['up', 'down', 'left', 'right'];
          const dir = pick(dirs);
          return {
            type: 'blank',
            q: `<code>type Direction = "up" | "down" | "left" | "right"; function move(dir: Direction) { console.log(dir); }</code>일 때, <code>move("${dir}")</code>의 출력은? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [dir], placeholder: '값',
            why: `move는 넘긴 값을 그대로 출력해서 "${dir}"이에요.`,
            hint: '함수는 넘긴 dir 값을 그대로 출력할 뿐이에요.'
          };
        },
        () => makeChoice(
          '<code>type Direction = "up" | "down" | "left" | "right";</code>일 때, <code>move("Up")</code>(대문자 U)처럼 잘못 쓰면?',
          '컴파일 시점에 타입 오류가 난다', ['조용히 "up"으로 자동 변환된다', '실행은 되지만 아무것도 출력 안 된다', '런타임에서만 오류가 난다'],
          '리터럴 유니언 타입은 정확히 정해진 값만 허용해서, "Up"처럼 대소문자가 다르면 컴파일 시점에 바로 오류가 나요.',
          '리터럴 타입의 핵심은 "정확히 이 값들만" 허용한다는 점이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>"a"</code>, <code>"b"</code>, <code>"c"</code> 중 하나만 허용하는 타입을 표기하세요. (예: <code>let x: ${'{이것}'};</code>)`,
          prefix: 'let x: ', suffix: ';', accept: ['"a" | "b" | "c"'], placeholder: '타입',
          why: '리터럴 값들을 <code>|</code>(유니언)으로 이어서 "이 중 하나"라는 타입을 만들어요.',
          hint: '각 리터럴 값을 세로 막대(|)로 이어보세요.'
        }),
        () => makeChoice(
          '리터럴 타입을 쓰는 이유로 알맞은 것은?',
          '정해진 값 외에는 아예 못 넘기게 해서, 오타 같은 실수를 미리 막을 수 있어서',
          ['리터럴 타입 없이는 문자열을 아예 못 써서', '실행 속도가 항상 빨라져서', '메모리를 아예 안 써서'],
          '리터럴 타입은 딱 정해진 값들만 허용해서, 오타나 잘못된 값 전달을 컴파일 시점에 잡아줘요.',
          '일반 string 타입과 달리 "정확히 이 값들만" 허용한다는 점을 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"success"</code> 또는 <code>"error"</code> 중 하나만 받는 <code>Status</code> 타입 별칭을 만드세요.',
          starter: '',
          placeholder: 'type Status = "success" | "error";',
          accept: ['type Status = "success" | "error";'],
          why: '리터럴 값 두 개를 |로 이어서 타입 별칭을 만들어요.',
          hint: 'type Status = "success" | "error";를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const status = pick(['success', 'error', 'pending']);
        const msg = status === 'success' ? '성공했어요' : status === 'error' ? '실패했어요' : '진행 중이에요';
        return {
          type: 'blank',
          q: `<code>type Status = "success" | "error" | "pending";</code>이고, <code>status</code>가 <code>"${status}"</code>일 때, <code>if (status === "success") console.log("성공했어요"); else if (status === "error") console.log("실패했어요"); else console.log("진행 중이에요");</code>를 실행하면 출력은?`,
          prefix: '', suffix: '', accept: [msg], placeholder: '값',
          why: `status가 "${status}"라서 "${msg}"가 출력돼요.`,
          hint: '각 리터럴 값에 해당하는 분기를 확인해보세요.'
        };
      }
    },
    {
      id: 'intersectionTypes',
      title: '인터섹션 타입',
      ready: true,
      summary: '여러 타입을 동시에 만족하는 인터섹션 타입(&)을 배우고, 유니언(|)과의 차이를 알아봐요.',
      goals: ['&로 여러 타입 합치기', '유니언과 인터섹션의 차이', '객체 타입 합치기'],
      blocks: [
        {
          h: '여러 타입을 하나로 합치기: &',
          html: `<p><code>타입A & 타입B</code>는 "타입A의 조건과 타입B의 조건을 <b>둘 다</b> 만족해야 한다"는 뜻이에요.</p>`,
          code: {
            label: 'intersection_basic.ts',
            lang: 'typescript',
            src: `type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;

const p: Person = { name: "지수", age: 17 };
console.log(p.name, p.age);`,
            out: `지수 17`
          }
        },
        {
          h: '유니언(|)과 인터섹션(&)의 차이',
          html: `<p><b>유니언</b>(<code>|</code>)은 "이것 또는 저것"(둘 중 하나만 만족해도 됨), <b>인터섹션</b>(<code>&</code>)은 "이것 그리고 저것"(둘 다 만족해야 함)이에요. <code>Person</code> 타입의 값은 <code>name</code>과 <code>age</code>를 <b>둘 다</b> 가지고 있어야 해요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>type Person = { name: string } & { age: number };</code>로 만든 <code>const p: Person = { name: "${name}", age: ${age} };</code>일 때, <code>p.age</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(age)], placeholder: '숫자',
            why: `인터섹션 타입은 두 타입의 속성을 모두 가져서, p.age에 접근할 수 있고 값은 ${age}예요.`,
            hint: 'Person은 name과 age 속성을 둘 다 가진 타입이에요.'
          };
        },
        () => ({
          type: 'blank',
          q: `<code>Named</code>와 <code>Aged</code> 두 타입을 모두 만족하는 <code>Person</code> 타입을 만드는 연산자를 쓰세요.`,
          prefix: 'type Person = Named ', suffix: ' Aged;', accept: ['&'], placeholder: '기호',
          why: '<code>&</code>(인터섹션)로 두 타입을 합쳐서 모두 만족하는 타입을 만들어요.',
          hint: '"그리고(and)"라는 뜻과 관련된 기호예요.'
        }),
        () => makeChoice(
          '유니언 타입(<code>|</code>)과 인터섹션 타입(<code>&</code>)의 차이는?',
          '유니언은 "둘 중 하나", 인터섹션은 "둘 다 만족"이라는 뜻이다', ['유니언과 인터섹션은 완전히 같은 것이다', '유니언은 객체에만, 인터섹션은 문자열에만 쓸 수 있다', '인터섹션은 배열에만 쓸 수 있다'],
          '<code>|</code>는 "이것 또는 저것", <code>&</code>는 "이것 그리고 저것"이라는 뜻이에요.',
          '"또는"과 "그리고"의 차이를 생각해보세요.'
        ),
        () => makeChoice(
          '<code>type Person = Named & Aged;</code>로 만든 값이 <b>반드시</b> 가져야 하는 속성은?',
          'Named의 모든 속성과 Aged의 모든 속성 전부', ['Named 또는 Aged 중 하나만', '아무 속성도 필요 없다', 'Named의 속성만'],
          '인터섹션 타입은 두 타입의 조건을 모두 만족해야 해서, 양쪽의 모든 속성이 다 필요해요.',
          '"그리고(and)"라는 의미를 다시 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>{ id: number }</code>와 <code>{ name: string }</code>을 합친 인터섹션 타입 <code>Item</code>을 만드세요.',
          starter: '',
          placeholder: 'type Item = { id: number } & { name: string };',
          accept: ['type Item = { id: number } & { name: string };'],
          why: '& 연산자로 두 객체 타입을 합쳐서 둘 다 만족하는 타입을 만들어요.',
          hint: 'type Item = { id: number } & { name: string };를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const id = randInt(1, 100);
        const name = pick(['지수', '민준', '서연']);
        const price = randInt(1000, 5000);
        return {
          type: 'blank',
          q: `<code>type Item = { id: number } & { name: string } & { price: number };</code>로 만든 <code>const item: Item = { id: ${id}, name: "${name}", price: ${price} };</code>일 때, <code>\`\${item.name}: \${item.price}원\`</code>의 결과는?`,
          prefix: '', suffix: '', accept: [`${name}: ${price}원`], placeholder: '값',
          why: `세 타입을 모두 합친 Item은 id, name, price를 다 가져서, name과 price를 이어붙이면 "${name}: ${price}원"이에요.`,
          hint: '세 개의 타입을 &로 합쳐도 원리는 똑같이, 모든 속성을 다 가진다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'optionalReadonly',
      title: '옵셔널과 readonly',
      ready: true,
      summary: '있어도 되고 없어도 되는 속성을 표시하는 ?와, 값을 못 바꾸게 하는 readonly를 배워요.',
      goals: ['?로 선택적 속성 표시하기', 'readonly로 값 못 바꾸게 하기', '둘을 함께 쓰기'],
      blocks: [
        {
          h: '있어도 없어도 되는 속성: ?',
          html: `<p>속성 이름 뒤에 <code>?</code>를 붙이면, 그 속성은 <b>있어도 되고 없어도 되는</b> 선택적 속성이 돼요.</p>`,
          code: {
            label: 'optional_prop.ts',
            lang: 'typescript',
            src: `type User = {
  name: string;
  nickname?: string;
};

const u1: User = { name: "지수" };
const u2: User = { name: "민준", nickname: "민민" };
console.log(u2.nickname);`,
            out: `민민`
          }
        },
        {
          h: '못 바꾸게 하기: readonly',
          html: `<p><code>readonly</code>가 붙은 속성은 처음 만들어질 때만 값을 정할 수 있고, <b>그 뒤로는 바꿀 수 없어요</b>.</p>`,
          code: {
            label: 'readonly_prop.ts',
            lang: 'typescript',
            src: `type Point = {
  readonly x: number;
  readonly y: number;
};

const p: Point = { x: 3, y: 4 };
// p.x = 10; // 오류!`
          }
        },
        {
          h: '옵셔널 속성에 접근할 때 주의하기',
          html: `<p><code>nickname</code>처럼 있을 수도 없을 수도 있는 속성에 접근할 땐, <code>u1?.nickname</code>처럼 <b>옵셔널 체이닝</b>과 함께 쓰는 게 안전해요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const has = Math.random() < 0.5;
          const nick = pick(['민민', '수수']);
          return {
            type: 'blank',
            q: `<code>type User = { name: string; nickname?: string; };</code>로 만든 <code>const u: User = { name: "지수"${has ? `, nickname: "${nick}"` : ''} };</code>일 때, <code>u.nickname</code>의 값은? (없으면 <code>undefined</code>)`,
            prefix: '', suffix: '', accept: [has ? nick : 'undefined'], placeholder: '값',
            why: has ? `nickname을 지정했으니 "${nick}"이에요.` : `nickname을 안 넣었으니 undefined예요.`,
            hint: '선택적 속성은 안 넣으면 undefined가 된다는 걸 떠올려보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `<code>nickname</code> 속성을 선택적(있어도 없어도 되는)으로 만드는 기호를 쓰세요.`,
          prefix: '  nickname', suffix: ': string;', accept: ['?'], placeholder: '기호',
          why: '<code>?</code>를 속성 이름 뒤에 붙이면 선택적 속성이 돼요.',
          hint: '물음표 하나를 붙이면 돼요.'
        }),
        () => makeChoice(
          '<code>readonly</code>가 붙은 속성의 특징은?',
          '처음 만들어질 때만 값을 정할 수 있고, 그 뒤엔 바꿀 수 없다', ['선택적으로 있어도 없어도 된다', '항상 undefined여야 한다', '숫자 타입에만 쓸 수 있다'],
          'readonly는 값을 한 번 정하면 이후에는 바꿀 수 없게 만들어요.',
          '"읽기 전용"이라는 이름의 뜻을 생각해보세요.'
        ),
        () => makeChoice(
          '옵셔널 속성(?)에 안전하게 접근하려면 어떤 문법을 함께 쓰면 좋을까요?',
          '옵셔널 체이닝(<code>?.</code>)', ['느낌표(<code>!</code>)만', 'readonly', '인터섹션(&)'],
          '값이 없을 수도 있는 속성은 옵셔널 체이닝(?.)으로 안전하게 접근하는 게 좋아요.',
          '값이 undefined일 수도 있는 상황에서 오류 없이 접근하는 방법을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>readonly id: number</code>와 선택적 속성 <code>email?: string</code>을 가진 <code>User</code> 타입을 만드세요.',
          starter: '',
          rows: 4,
          placeholder: 'type User = {\n  readonly id: number;\n  email?: string;\n};',
          accept: ['type User = {\n  readonly id: number;\n  email?: string;\n};'],
          why: 'readonly와 ?를 각각의 속성 앞뒤에 붙여서 표시해요.',
          hint: 'type User = { readonly id: number; email?: string; };를 쓰세요.'
        }),
      ],
      boss: () => {
        const has = Math.random() < 0.5;
        const email = pick(['jisu@test.com', 'minjun@test.com']);
        return {
          type: 'blank',
          q: `<code>type User = { readonly id: number; email?: string; };</code>로 만든 <code>const u: User = { id: 1${has ? `, email: "${email}"` : ''} };</code>일 때, <code>u.email ?? "이메일 없음"</code>의 결과는?`,
          prefix: '', suffix: '', accept: [has ? email : '이메일 없음'], placeholder: '값',
          why: has ? `email이 있으니 "${email}"이 그대로 나와요.` : `email이 없어서(undefined) ??의 기본값 "이메일 없음"이 나와요.`,
          hint: '?? 연산자는 왼쪽 값이 null/undefined일 때만 오른쪽 기본값을 쓴다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'enumTS',
      title: '열거형(enum)',
      ready: true,
      summary: '정해진 값들을 이름 붙여 관리하는 enum과, 숫자 enum·문자열 enum의 차이를 배워요.',
      goals: ['enum으로 정해진 값 묶기', '기본값은 0부터 순서대로', '문자열 enum'],
      blocks: [
        {
          h: '이름 붙은 상수의 모임: enum',
          html: `<p><code>enum</code>으로 정해진 값들의 목록을 만들어요. 기본적으로 각 값은 <b>0부터 순서대로</b> 매겨지는 숫자예요.</p>`,
          code: {
            label: 'enum_numeric.ts',
            lang: 'typescript',
            src: `enum Direction {
  Up,
  Down,
  Left,
  Right
}

let dir: Direction = Direction.Up;
console.log(dir);`,
            out: `0`
          }
        },
        {
          h: '문자열 값을 가진 enum',
          html: `<p>숫자 대신 문자열 값을 직접 지정하는 <b>문자열 enum</b>도 만들 수 있어요. 값 자체가 의미를 담고 있어서, 로그로 찍었을 때 더 읽기 쉬워요.</p>`,
          code: {
            label: 'enum_string.ts',
            lang: 'typescript',
            src: `enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

console.log(Color.Green);`,
            out: `GREEN`
          },
          after: `<div class="note"><b>참고</b> — 숫자 enum은 <code>0</code>, <code>1</code>처럼 값 자체만 봐서는 의미를 알기 어려운 반면, 문자열 enum은 <code>"GREEN"</code>처럼 값 자체가 뜻을 담고 있어서 디버깅하기 더 편해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const names = ['Up', 'Down', 'Left', 'Right'];
          const idx = randInt(0, 3);
          return {
            type: 'blank',
            q: `<code>enum Direction { Up, Down, Left, Right }</code>일 때, <code>Direction.${names[idx]}</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(idx)], placeholder: '숫자',
            why: `enum의 기본값은 0부터 순서대로 매겨져서, ${names[idx]}는 ${idx}예요.`,
            hint: '첫 번째 값은 0, 그 다음은 1씩 늘어난다는 걸 떠올려보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `정해진 값들의 목록을 만들 때 맨 앞에 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: ' Direction { Up, Down, Left, Right }', accept: ['enum'], placeholder: '키워드',
          why: '<code>enum</code>으로 이름 붙은 상수들의 목록을 만들어요.',
          hint: '"열거하다"라는 뜻의 영어 단어예요.'
        }),
        () => {
          const colors = [['Red', 'RED'], ['Green', 'GREEN'], ['Blue', 'BLUE']];
          const [name, value] = pick(colors);
          return {
            type: 'blank',
            q: `<code>enum Color { Red = "RED", Green = "GREEN", Blue = "BLUE" }</code>일 때, <code>Color.${name}</code>의 값은? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [value], placeholder: '값',
            why: `Color.${name}에는 "${value}"라는 문자열 값이 지정돼 있어요.`,
            hint: '= 뒤에 지정한 값이 그대로 그 이름의 값이 돼요.'
          };
        },
        () => makeChoice(
          '숫자 enum 대신 문자열 enum을 쓰면 좋은 점은?',
          '값 자체가 의미를 담고 있어서 로그나 디버깅 시 더 읽기 쉬워서', ['문자열 enum만 컴파일이 가능해서', '문자열 enum이 항상 더 빠르게 실행돼서', '숫자 enum은 아예 못 만들어서'],
          '문자열 enum은 "RED", "GREEN"처럼 값 자체가 뜻을 담고 있어서, 숫자보다 이해하기 쉬워요.',
          '0, 1, 2 같은 숫자만 봐서는 의미를 알기 어렵다는 문제를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Small = "S"</code>, <code>Medium = "M"</code>, <code>Large = "L"</code> 값을 가진 <code>Size</code>라는 문자열 enum을 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'enum Size {\n  Small = "S",\n  Medium = "M",\n  Large = "L"\n}',
          accept: ['enum Size {\n  Small = "S",\n  Medium = "M",\n  Large = "L"\n}'],
          why: 'enum 이름 { 이름 = "값", ... } 형태로 문자열 enum을 만들어요.',
          hint: 'enum Size { Small = "S", Medium = "M", Large = "L" }를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const names = ['Up', 'Down', 'Left', 'Right'];
        const idx1 = randInt(0, 3), idx2 = randInt(0, 3);
        const sum = idx1 + idx2;
        return {
          type: 'blank',
          q: `<code>enum Direction { Up, Down, Left, Right }</code>일 때, <code>Direction.${names[idx1]} + Direction.${names[idx2]}</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `${names[idx1]}은 ${idx1}, ${names[idx2]}는 ${idx2}이고, 더하면 ${sum}이에요.`,
          hint: '각 이름의 실제 숫자값을 계산한 뒤 더해보세요.'
        };
      }
    },
    {
      id: 'classAccessModifiers',
      title: '클래스 접근 제어자와 interface 구현',
      ready: true,
      summary: 'public/private/protected로 클래스 멤버의 접근 범위를 정하고, interface를 클래스로 구현하는 법을 배워요.',
      goals: ['public/private/protected로 접근 범위 정하기', 'interface를 클래스로 구현하기(implements)', '왜 private이 유용한지'],
      blocks: [
        {
          h: '접근 범위 정하기: public, private, protected',
          html: `<p><code>public</code>은 어디서나, <code>private</code>은 그 클래스 <b>내부에서만</b>, <code>protected</code>는 그 클래스와 <b>자식 클래스에서만</b> 접근할 수 있어요.</p>`,
          code: {
            label: 'access_modifiers.ts',
            lang: 'typescript',
            src: `class Person {
  public name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  introduce(): string {
    return \`\${this.name}, \${this.age}살\`;
  }
}

const p = new Person("지수", 17);
console.log(p.name);
// console.log(p.age); // 오류! private이라 외부 접근 불가`,
            out: `지수`
          }
        },
        {
          h: 'interface를 클래스로 구현하기: implements',
          html: `<p><code>class 이름 implements 인터페이스</code>로, 그 인터페이스가 정한 모양을 반드시 갖추도록 클래스를 만들 수 있어요.</p>`,
          code: {
            label: 'implements_basic.ts',
            lang: 'typescript',
            src: `interface Greetable {
  greet(): string;
}

class Korean implements Greetable {
  greet(): string {
    return "안녕하세요";
  }
}

const k = new Korean();
console.log(k.greet());`,
            out: `안녕하세요`
          }
        },
        {
          h: '왜 private이 유용할까요',
          html: `<p>클래스 내부에서만 다뤄야 하는 값을, 외부에서 실수로 직접 바꿔버리는 걸 막아줘요. 값을 바꾸는 방법을 클래스 안의 메서드로만 제한할 수 있어요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>class Person { public name: string; ... }</code>으로 만든 <code>const p = new Person("${name}", 17);</code>일 때, <code>p.name</code>의 값은? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [name], placeholder: '값',
            why: `name은 public이라 외부에서도 접근할 수 있고, 값은 "${name}"이에요.`,
            hint: 'public 속성은 클래스 밖에서도 자유롭게 접근할 수 있어요.'
          };
        },
        () => makeChoice(
          'Person 클래스의 <code>age</code>가 <code>private</code>일 때, 클래스 밖에서 <code>p.age</code>에 접근하려고 하면?',
          '컴파일 오류가 난다', ['정상적으로 값이 나온다', 'undefined가 나온다', '자동으로 public으로 바뀐다'],
          'private 속성은 그 클래스 내부에서만 접근할 수 있어서, 외부에서 접근하면 컴파일 오류가 나요.',
          '"개인적인, 비공개"라는 뜻의 private이 무엇을 막는지 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `클래스가 특정 인터페이스의 모양을 갖추도록 만들 때 쓰는 키워드를 쓰세요.`,
          prefix: 'class Korean ', suffix: ' Greetable { ... }', accept: ['implements'], placeholder: '키워드',
          why: '<code>class 이름 implements 인터페이스</code>로 인터페이스를 구현해요.',
          hint: '"구현하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'private을 쓰면 좋은 이유는?',
          '클래스 내부 값을 외부에서 실수로 직접 바꾸는 걸 막을 수 있어서', ['private이 없으면 클래스를 아예 만들 수 없어서', '실행 속도가 항상 빨라져서', 'private은 메모리를 아예 안 써서'],
          'private은 외부에서의 직접적인 접근/수정을 막아서, 값이 예상치 못하게 바뀌는 걸 방지해요.',
          '클래스 내부 상태를 안전하게 보호한다는 개념을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Greetable</code> 인터페이스(메서드 <code>greet(): string</code>)를 구현하는 <code>English</code> 클래스를 작성하세요. greet()는 <code>"Hello"</code>를 반환해요.',
          starter: '',
          rows: 4,
          placeholder: 'class English implements Greetable {\n  greet(): string {\n    return "Hello";\n  }\n}',
          accept: ['class English implements Greetable {\n  greet(): string {\n    return "Hello";\n  }\n}'],
          why: 'implements로 인터페이스를 구현하고, 그 인터페이스가 요구하는 메서드를 실제로 작성해요.',
          hint: 'class English implements Greetable { greet(): string { return "Hello"; } }를 쓰세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>class Person { public name: string; private age: number; constructor(name: string, age: number) { this.name = name; this.age = age; } introduce(): string { return \`\${this.name}, \${this.age}살\`; } }</code>로 만든 <code>const p = new Person("${name}", ${age});</code>일 때, <code>p.introduce()</code>의 결과는?`,
          prefix: '', suffix: '', accept: [`${name}, ${age}살`], placeholder: '값',
          why: `introduce()는 private인 age도 클래스 내부에서는 접근 가능해서, "${name}, ${age}살"을 반환해요.`,
          hint: 'private이라도 그 클래스 내부의 메서드에서는 자유롭게 접근할 수 있어요.'
        };
      }
    },
    {
      id: 'genericConstraints',
      title: '제네릭 제약',
      ready: true,
      summary: '제네릭 타입이 아무 타입이나 받지 않고, 특정 조건을 만족하는 타입만 받도록 제한하는 법을 배워요.',
      goals: ['extends로 제네릭에 조건 걸기', '제약이 없으면 생기는 문제', '여러 타입 매개변수 쓰기'],
      blocks: [
        {
          h: '아무 타입이나 다 받으면 위험할 때: 제네릭 제약',
          html: `<p><code>T extends { length: number }</code>는 "<code>length</code> 속성을 가진 타입만" 허용한다는 뜻이에요. 이렇게 조건을 거는 걸 <b>제네릭 제약</b>이라고 해요.</p>`,
          code: {
            label: 'generic_constraint.ts',
            lang: 'typescript',
            src: `function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

console.log(getLength("hello"));
console.log(getLength([1, 2, 3]));`,
            out: `5\n3`
          },
          after: `<div class="note"><b>제약이 없다면</b> — <code>getLength(42)</code>처럼 length가 없는 값을 넘기면, 함수 안에서 <code>item.length</code>가 오류를 일으켜요. 제약을 걸어두면 이런 값은 애초에 컴파일 시점에 막혀요.</div>`
        },
        {
          h: '여러 타입 매개변수 쓰기',
          html: `<p>타입 매개변수는 여러 개 쓸 수도 있어요. <code>&lt;A, B&gt;</code>처럼요.</p>`,
          code: {
            label: 'multiple_type_params.ts',
            lang: 'typescript',
            src: `function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}

console.log(pair("지수", 17));`,
            out: `[ '지수', 17 ]`
          }
        }
      ],
      quizGenerators: [
        () => {
          const word = pick(['hello', 'world', 'typescript']);
          return {
            type: 'blank',
            q: `<code>function getLength&lt;T extends { length: number }&gt;(item: T): number { return item.length; }</code>일 때, <code>getLength("${word}")</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(word.length)], placeholder: '숫자',
            why: `문자열의 length는 글자 수라서, "${word}"는 ${word.length}예요.`,
            hint: '문자열의 length는 그 문자열의 글자 수예요.'
          };
        },
        () => {
          const arr = Array.from({ length: randInt(2, 6) }, () => randInt(1, 20));
          return {
            type: 'blank',
            q: `<code>getLength([${arr.join(', ')}])</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(arr.length)], placeholder: '숫자',
            why: `배열의 length는 요소 개수라서 ${arr.length}예요.`,
            hint: '배열의 length는 담긴 값의 개수예요.'
          };
        },
        () => ({
          type: 'blank',
          q: `타입 매개변수 T가 <code>length</code> 속성을 가진 타입이어야 한다는 제약을 표기하세요. (예: <code>&lt;T ${'{이것}'} { length: number }&gt;</code>)`,
          prefix: '<T ', suffix: ' { length: number }>', accept: ['extends'], placeholder: '키워드',
          why: '<code>T extends 조건</code>으로 제네릭에 제약을 걸어요.',
          hint: '"~을 확장하다, ~의 조건을 만족하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>T extends { length: number }</code> 제약이 없다면 생길 수 있는 문제는?',
          'length 속성이 없는 값(예: 숫자)을 넘겨도 컴파일 시점에 못 막아서, 실행 중 오류가 날 수 있다',
          ['모든 타입에서 항상 정상 동작한다', '제약이 없으면 컴파일 자체가 안 된다', '제약이 없으면 함수를 아예 호출할 수 없다'],
          '제약이 없으면 length가 없는 타입도 넘길 수 있게 돼서, item.length에서 실제로 문제가 생길 수 있어요.',
          '제약이 하는 역할이 "이 타입만 허용"이라는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>length</code> 속성을 가진 타입만 받아서 그 길이를 두 배로 반환하는 제네릭 함수 <code>doubleLength&lt;T extends { length: number }&gt;(item: T): number</code>를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'function doubleLength<T extends { length: number }>(item: T): number {\n  return item.length * 2;\n}',
          accept: ['function doubleLength<T extends { length: number }>(item: T): number {\n  return item.length * 2;\n}'],
          why: 'T extends { length: number }로 제약을 걸고, item.length * 2를 반환해요.',
          hint: 'function doubleLength<T extends { length: number }>(item: T): number { return item.length * 2; }를 쓰세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>function pair&lt;A, B&gt;(a: A, b: B): [A, B] { return [a, b]; }</code>일 때, <code>pair("${name}", ${age})</code>의 결과를 배열 형태로 쓰세요. (예: <code>['값', 숫자]</code>)`,
          prefix: '', suffix: '', accept: [`['${name}', ${age}]`], placeholder: "['값', 숫자]",
          why: `pair는 두 값을 그대로 배열에 담아 반환해서 ['${name}', ${age}]가 돼요.`,
          hint: 'pair 함수는 넘긴 두 값을 순서 그대로 튜플(배열)에 담아 반환해요.'
        };
      }
    },
    {
      id: 'utilityTypesPartialPickOmit',
      title: 'Partial, Pick, Omit',
      ready: true,
      summary: '기존 타입을 변형해서 새 타입을 만드는 유틸리티 타입 Partial, Pick, Omit을 배워요.',
      goals: ['Partial로 모든 속성을 선택적으로', 'Pick으로 일부 속성만 고르기', 'Omit으로 일부 속성 빼기'],
      blocks: [
        {
          h: '모든 속성을 선택적으로: Partial',
          html: `<p><code>Partial&lt;타입&gt;</code>은 그 타입의 <b>모든 속성을 선택적(?)</b>으로 바꿔줘요. 값을 일부만 채워서 업데이트할 때 자주 써요.</p>`,
          code: {
            label: 'partial_basic.ts',
            lang: 'typescript',
            src: `type User = { name: string; age: number };
type PartialUser = Partial<User>;

const u: PartialUser = { name: "지수" };  // age 없어도 OK`
          }
        },
        {
          h: '원하는 속성만 고르기: Pick',
          html: `<p><code>Pick&lt;타입, "속성이름"&gt;</code>은 그 타입에서 <b>지정한 속성만</b> 뽑아낸 새 타입을 만들어요.</p>`,
          code: {
            label: 'pick_basic.ts',
            lang: 'typescript',
            src: `type NameOnly = Pick<User, "name">;

const n: NameOnly = { name: "지수" };
console.log(n.name);`,
            out: `지수`
          }
        },
        {
          h: '원하는 속성만 빼기: Omit',
          html: `<p><code>Omit&lt;타입, "속성이름"&gt;</code>은 <code>Pick</code>과 반대로, 지정한 속성을 <b>뺀 나머지</b>로 새 타입을 만들어요.</p>`,
          code: {
            label: 'omit_basic.ts',
            lang: 'typescript',
            src: `type WithoutAge = Omit<User, "age">;

const w: WithoutAge = { name: "민준" };
console.log(w.name);`,
            out: `민준`
          }
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>type User = { name: string; age: number }; type PartialUser = Partial&lt;User&gt;;</code>일 때, <code>const u: PartialUser = {};</code>는 오류가 날까요?',
          '오류가 안 난다(모든 속성이 선택적이라서)', ['오류가 난다(둘 다 필수라서)', 'name만 있으면 안 된다', 'age만 있으면 안 된다'],
          'Partial은 모든 속성을 선택적으로 만들어서, 빈 객체 {}도 유효해요.',
          'Partial이 "모든 속성에 ?를 붙인 것"과 같다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>type User = { name: string; age: number };</code>에서 <code>name</code>만 남긴 타입을 만드는 코드를 완성하세요.`,
          prefix: 'type NameOnly = ', suffix: '<User, "name">;', accept: ['Pick'], placeholder: '유틸리티 타입',
          why: '<code>Pick&lt;User, "name"&gt;</code>은 User에서 name만 골라낸 타입이에요.',
          hint: '"고르다, 선택하다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'blank',
          q: `<code>type User = { name: string; age: number };</code>에서 <code>age</code>를 뺀 나머지로 타입을 만드는 코드를 완성하세요.`,
          prefix: 'type WithoutAge = ', suffix: '<User, "age">;', accept: ['Omit'], placeholder: '유틸리티 타입',
          why: '<code>Omit&lt;User, "age"&gt;</code>는 User에서 age를 뺀 나머지로 만든 타입이에요.',
          hint: '"빼다, 생략하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>Pick&lt;User, "name"&gt;</code>과 <code>Omit&lt;User, "age"&gt;</code>의 관계는? (User가 name, age만 가질 때)',
          '두 타입은 결과적으로 같은 모양(name만 남은 타입)이 된다', ['서로 정반대의 결과가 나온다', 'Pick만 유효한 타입이다', '둘 다 오류가 난다'],
          'User가 name과 age만 가진다면, name만 고르는 것(Pick)과 age만 빼는 것(Omit)은 결과적으로 같아요.',
          '전체가 두 속성뿐이라면, "하나만 고르기"와 "다른 하나 빼기"가 같은 결과를 낸다는 걸 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>type Product = { id: number; name: string; price: number };</code>에서 모든 속성을 선택적으로 만든 <code>PartialProduct</code> 타입을 작성하세요.',
          starter: '',
          placeholder: 'type PartialProduct = Partial<Product>;',
          accept: ['type PartialProduct = Partial<Product>;'],
          why: 'Partial<타입>으로 모든 속성을 선택적으로 만들어요.',
          hint: 'type PartialProduct = Partial<Product>;를 그대로 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '<code>type Product = { id: number; name: string; price: number };</code>에서, id와 name만 필요하고 price는 빼고 싶어요. 어떤 유틸리티 타입이 가장 직접적으로 이 요구를 표현할까요?',
        '<code>Pick&lt;Product, "id" | "name"&gt;</code>', ['<code>Partial&lt;Product&gt;</code>', '<code>Omit&lt;Product, "id" | "name"&gt;</code>', '<code>Record&lt;Product, string&gt;</code>'],
        'Pick<Product, "id" | "name">은 정확히 id와 name 두 속성만 골라낸 타입을 만들어줘요.',
        '"이것들만 골라서 남기고 싶다"는 요구에 맞는 유틸리티 타입을 생각해보세요.'
      )
    },
    {
      id: 'recordUtilityType',
      title: 'Record 유틸리티 타입',
      ready: true,
      summary: '키와 값의 타입을 한 번에 정해서 객체를 딕셔너리처럼 다루는 Record 타입을 배워요.',
      goals: ['Record로 키-값 타입 만들기', '정해진 키만 허용하기', '언제 Record를 쓸지'],
      blocks: [
        {
          h: '키와 값의 타입을 한 번에 정하기: Record',
          html: `<p><code>Record&lt;키타입, 값타입&gt;</code>은 "키는 이 타입, 값은 이 타입"인 객체 타입을 만들어줘요.</p>`,
          code: {
            label: 'record_basic.ts',
            lang: 'typescript',
            src: `type Scores = Record<string, number>;

const scores: Scores = {
  지수: 90,
  민준: 85
};
console.log(scores["지수"]);`,
            out: `90`
          }
        },
        {
          h: '정해진 키만 허용하기',
          html: `<p>키 타입으로 <b>리터럴 유니언</b>을 쓰면, "이 키들을 반드시 다 가져야 하는" 객체 타입을 만들 수 있어요.</p>`,
          code: {
            label: 'record_literal_keys.ts',
            lang: 'typescript',
            src: `type Day = "mon" | "tue" | "wed";
type Schedule = Record<Day, string>;

const schedule: Schedule = {
  mon: "수학",
  tue: "영어",
  wed: "과학"
};
console.log(schedule.tue);`,
            out: `영어`
          },
          after: `<div class="note"><b>기억하기</b> — <code>Record&lt;Day, string&gt;</code>은 mon, tue, wed를 <b>하나라도 빠뜨리면 오류</b>가 나요. 정해진 키를 빠짐없이 채우도록 강제해줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          const score = randInt(60, 100);
          return {
            type: 'blank',
            q: `<code>type Scores = Record&lt;string, number&gt;; const scores: Scores = { ${name}: ${score} };</code>일 때, <code>scores["${name}"]</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(score)], placeholder: '숫자',
            why: `Record는 그냥 키-값을 담은 객체라서, scores["${name}"]은 ${score}예요.`,
            hint: '대괄호로 키를 이용해 값을 꺼내는 방식은 일반 객체와 같아요.'
          };
        },
        () => ({
          type: 'blank',
          q: `키는 string, 값은 number인 객체 타입을 만드는 유틸리티 타입을 쓰세요.`,
          prefix: 'type Scores = ', suffix: '<string, number>;', accept: ['Record'], placeholder: '유틸리티 타입',
          why: '<code>Record&lt;키타입, 값타입&gt;</code>으로 키-값 타입을 정해요.',
          hint: '"기록하다"라는 뜻이지만 여기선 "표(레코드)"라는 이미지로 기억하면 좋아요.'
        }),
        () => {
          const days = [['mon', '수학'], ['tue', '영어'], ['wed', '과학']];
          const [day, subject] = pick(days);
          return {
            type: 'blank',
            q: `<code>type Day = "mon" | "tue" | "wed"; type Schedule = Record&lt;Day, string&gt;;</code>로 만든 <code>schedule</code>이 <code>{ mon: "수학", tue: "영어", wed: "과학" }</code>일 때, <code>schedule.${day}</code>의 값은? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [subject], placeholder: '값',
            why: `schedule.${day}은 "${subject}"예요.`,
            hint: '점(.) 표기로 그 키에 해당하는 값을 꺼내보세요.'
          };
        },
        () => makeChoice(
          '<code>type Schedule = Record&lt;"mon" | "tue" | "wed", string&gt;;</code>일 때, <code>mon</code>과 <code>tue</code>만 값을 채운 객체를 만들면?',
          '컴파일 오류가 난다(wed가 빠져서)', ['정상적으로 만들어진다', 'wed는 자동으로 빈 문자열이 된다', 'mon과 tue만 있어도 항상 괜찮다'],
          'Record<리터럴유니언, 타입>은 그 유니언의 모든 값을 키로 반드시 가져야 해요. 하나라도 빠지면 오류가 나요.',
          '리터럴 유니언을 키로 쓰면 "전부 다 채워야 한다"는 제약이 생긴다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '키는 string, 값은 boolean인 <code>Flags</code>라는 Record 타입을 만드세요.',
          starter: '',
          placeholder: 'type Flags = Record<string, boolean>;',
          accept: ['type Flags = Record<string, boolean>;'],
          why: 'Record<string, boolean>은 키가 string, 값이 boolean인 객체 타입이에요.',
          hint: 'type Flags = Record<string, boolean>;를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const days = [['mon', '수학'], ['tue', '영어'], ['wed', '과학']];
        const target = pick(days);
        return {
          type: 'blank',
          q: `<code>type Schedule = Record&lt;"mon" | "tue" | "wed", string&gt;;</code>로 만든 <code>schedule</code>이 mon="수학", tue="영어", wed="과학"일 때, <code>Object.values(schedule).join(", ")</code>의 결과는?`,
          prefix: '', suffix: '', accept: ['수학, 영어, 과학'], placeholder: '값',
          why: `Object.values는 모든 값을 배열로, join(", ")은 그걸 쉼표로 이어붙여서 "수학, 영어, 과학"이 돼요.`,
          hint: '객체의 모든 값을 순서대로 나열하고 쉼표로 이어붙여보세요.'
        };
      }
    },
    {
      id: 'typeGuards',
      title: '사용자 정의 타입 가드',
      ready: true,
      summary: '유니언 타입을 다룰 때, 지금 이 값이 정확히 어떤 타입인지 TS에게 알려주는 나만의 타입 가드를 만들어요.',
      goals: ['is 키워드로 타입 가드 만들기', '타입 가드가 하는 역할', '왜 유용한지'],
      blocks: [
        {
          h: '나만의 타입 가드 만들기: is',
          html: `<p>함수의 반환 타입을 <code>매개변수 is 타입</code>으로 쓰면, "이 함수가 <code>true</code>를 반환하면, 그 매개변수는 진짜 그 타입"이라고 TS에게 알려주는 <b>타입 가드</b>가 돼요.</p>`,
          code: {
            label: 'type_guard_basic.ts',
            lang: 'typescript',
            src: `type Cat = { meow(): void };
type Dog = { bark(): void };

function isCat(animal: Cat | Dog): animal is Cat {
  return "meow" in animal;
}`
          }
        },
        {
          h: '타입 가드로 안전하게 분기하기',
          html: `<p>타입 가드 함수를 <code>if</code> 조건으로 쓰면, 그 블록 안에서는 TS가 <b>진짜 그 타입으로 좁혀서</b> 인식해줘서, 그 타입 전용 기능을 안전하게 쓸 수 있어요.</p>`,
          code: {
            label: 'type_guard_usage.ts',
            lang: 'typescript',
            src: `function makeSound(animal: Cat | Dog) {
  if (isCat(animal)) {
    animal.meow();
  } else {
    animal.bark();
  }
}`
          },
          after: `<div class="note"><b>왜 유용할까요</b> — 타입 가드가 없다면, animal이 Cat인지 Dog인지 확신할 수 없어서 meow()나 bark()를 바로 부를 수 없어요. 타입 가드는 "지금 이건 확실히 Cat이야"라고 TS에게 알려주는 역할을 해요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `함수가 매개변수 <code>animal</code>을 <code>Cat</code> 타입으로 좁혀준다는 걸 나타내는 반환 타입 표기를 완성하세요. (예: <code>function isCat(animal: Cat | Dog): ${'{이것}'} { ... }</code>)`,
          prefix: 'function isCat(animal: Cat | Dog): ', suffix: ' { ... }', accept: ['animal is Cat'], placeholder: '반환 타입',
          why: '<code>animal is Cat</code>은 "이 함수가 true를 반환하면 animal은 Cat"이라는 뜻이에요.',
          hint: '매개변수 이름 뒤에 is와 타입 이름을 쓰세요.'
        }),
        () => makeChoice(
          '<code>function isCat(animal: Cat | Dog): animal is Cat</code>이 <code>true</code>를 반환하면, TS는 그 이후 코드에서 <code>animal</code>을 어떻게 취급할까요?',
          '진짜 Cat 타입으로 좁혀서, Cat 전용 기능을 안전하게 쓸 수 있게 해준다',
          ['여전히 Cat | Dog 유니언 타입 그대로 취급한다', 'Dog 타입으로 바뀐다', 'any 타입으로 바뀐다'],
          '타입 가드가 true를 반환하면, TS는 그 블록 안에서 animal을 Cat으로 확실히 좁혀서 인식해요.',
          '타입 가드의 핵심 역할이 "타입을 좁혀준다"는 점이에요.'
        ),
        () => makeChoice(
          '타입 가드가 없다면 <code>Cat | Dog</code> 타입의 값에 <code>animal.meow()</code>를 바로 부르면 어떻게 될까요?',
          '컴파일 오류가 난다(Dog일 수도 있어서 meow가 없을 수 있으므로)', ['항상 정상적으로 실행된다', 'Dog이면 자동으로 bark()가 대신 실행된다', 'meow가 없으면 자동으로 무시된다'],
          'Cat | Dog 타입은 Dog일 수도 있어서, meow가 없을 수도 있다고 TS가 판단해 오류를 내요.',
          '유니언 타입은 "둘 중 하나"라서, 확실히 좁히기 전까진 공통 기능만 쓸 수 있어요.'
        ),
        () => ({
          type: 'code',
          q: '<code>type Circle = { radius: number }; type Square = { side: number };</code>일 때, <code>shape</code>가 <code>Circle</code>인지 확인하는 타입 가드 함수 <code>isCircle(shape: Circle | Square): shape is Circle</code>을 작성하세요. ("radius" in shape로 확인)',
          starter: '',
          rows: 3,
          placeholder: 'function isCircle(shape: Circle | Square): shape is Circle {\n  return "radius" in shape;\n}',
          accept: ['function isCircle(shape: Circle | Square): shape is Circle {\n  return "radius" in shape;\n}'],
          why: '"radius" in shape로 Circle인지 확인하고, 반환 타입에 shape is Circle을 써서 타입 가드로 만들어요.',
          hint: 'function isCircle(shape: Circle | Square): shape is Circle { return "radius" in shape; }를 쓰세요.'
        }),
      ],
      boss: () => {
        const isCircle = Math.random() < 0.5;
        const value = isCircle ? randInt(1, 10) : randInt(1, 10);
        return {
          type: 'blank',
          q: `<code>isCircle(shape)</code>이 shape가 Circle인지 확인할 때, <code>shape</code>가 ${isCircle ? `{ radius: ${value} }` : `{ side: ${value} }`}이면 <code>if (isCircle(shape)) console.log("원, 반지름:" + shape.radius); else console.log("사각형, 변:" + shape.side);</code>를 실행한 결과는?`,
          prefix: '', suffix: '', accept: [isCircle ? `원, 반지름:${value}` : `사각형, 변:${value}`], placeholder: '값',
          why: isCircle ? `radius가 있으니 Circle로 판별되어 "원, 반지름:${value}"가 출력돼요.` : `side가 있으니 Square로 판별되어 "사각형, 변:${value}"가 출력돼요.`,
          hint: 'shape에 radius가 있는지 side가 있는지로 어느 타입인지 판단해보세요.'
        };
      }
    },
    {
      id: 'neverType',
      title: 'never 타입',
      ready: true,
      summary: '절대 발생하지 않는 값을 나타내는 never 타입과, 이를 이용해 모든 경우를 다 처리했는지 확인하는 기법을 배워요.',
      goals: ['never가 뭔지', '항상 오류를 던지는 함수의 반환 타입', 'switch에서 모든 경우 처리 확인하기'],
      blocks: [
        {
          h: '절대 발생하지 않는 값: never',
          html: `<p>정상적으로 "값을 반환"하는 경우가 <b>절대 없는</b> 함수(항상 예외를 던지거나 무한 반복하는 함수)의 반환 타입은 <code>never</code>예요.</p>`,
          code: {
            label: 'never_basic.ts',
            lang: 'typescript',
            src: `function throwError(message: string): never {
  throw new Error(message);
}`
          }
        },
        {
          h: '모든 경우를 다 처리했는지 확인하기',
          html: `<p><code>switch</code>의 <code>default</code>에서 남은 값을 <code>never</code> 타입 변수에 대입해두면, 나중에 새로운 값이 추가됐는데 그 경우를 빠뜨리면 <b>컴파일 오류로 바로 알아챌 수 있어요</b>.</p>`,
          code: {
            label: 'exhaustive_check.ts',
            lang: 'typescript',
            src: `type Shape = "circle" | "square";

function getArea(shape: Shape): number {
  switch (shape) {
    case "circle": return 3.14;
    case "square": return 4;
    default:
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}`
          },
          after: `<div class="note"><b>동작 원리</b> — 만약 <code>Shape</code>에 <code>"triangle"</code>이 추가됐는데 그 case를 안 만들면, default에서의 shape가 더 이상 never가 아니게 돼서(triangle이 남아있어서) 컴파일 오류가 나요. 빠뜨린 경우를 미리 잡아주는 유용한 기법이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '항상 예외를 던지거나 무한히 실행돼서, 정상적으로 값을 반환하는 경우가 전혀 없는 함수의 반환 타입은?',
          '<code>never</code>', ['<code>void</code>', '<code>undefined</code>', '<code>unknown</code>'],
          'never는 "절대 발생하지 않는 값"을 나타내서, 이런 함수의 반환 타입으로 적합해요.',
          '"결코 ~않다"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `메시지를 받아서 항상 예외를 던지는 <code>throwError</code> 함수의 반환 타입을 쓰세요.`,
          prefix: 'function throwError(message: string): ', suffix: ' {\n  throw new Error(message);\n}', accept: ['never'], placeholder: '타입',
          why: '항상 예외를 던지고 정상 반환이 없는 함수는 반환 타입이 never예요.',
          hint: '"절대 발생하지 않는다"는 뜻의 타입이에요.'
        }),
        () => makeChoice(
          '<code>never</code>를 이용한 "모든 경우 확인(exhaustive check)" 기법이 하는 일은?',
          '나중에 새로운 값이 추가됐는데 그 경우를 처리하는 case를 빠뜨리면, 컴파일 오류로 미리 알려준다',
          ['실행 속도를 항상 빠르게 만들어준다', 'switch문을 아예 못 쓰게 막는다', '모든 case를 자동으로 만들어준다'],
          'default에서 남은 값이 never가 아니게 되면(빠뜨린 값이 있으면) 컴파일 오류가 나서, 실수를 미리 잡아줘요.',
          '새로운 값이 추가됐을 때 그 처리를 깜빡하는 실수를 미리 방지한다는 걸 생각해보세요.'
        ),
        () => makeChoice(
          '<code>void</code>와 <code>never</code>의 차이는?',
          'void는 "값 없이 정상적으로 끝난다"는 뜻이고, never는 "정상적으로 끝나는 경우가 아예 없다"는 뜻이다',
          ['void와 never는 완전히 같은 뜻이다', 'never는 숫자 0을 의미한다', 'void는 오류가 났다는 뜻이다'],
          'void 함수는 정상적으로 실행이 끝나지만 값을 안 돌려주는 것이고, never 함수는 정상적으로 끝나는 경우 자체가 없어요.',
          '함수가 "끝나긴 하는지" 여부의 차이를 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '항상 <code>"지원되지 않는 기능"</code>이라는 오류를 던지는, 반환 타입이 <code>never</code>인 함수 <code>notSupported()</code>를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'function notSupported(): never {\n  throw new Error("지원되지 않는 기능");\n}',
          accept: ['function notSupported(): never {\n  throw new Error("지원되지 않는 기능");\n}'],
          why: '반환 타입을 never로 쓰고, 항상 예외를 던지는 함수로 만들어요.',
          hint: 'function notSupported(): never { throw new Error("지원되지 않는 기능"); }를 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '<code>type Shape = "circle" | "square";</code>였는데 나중에 <code>"triangle"</code>이 추가됐어요. exhaustive check(default에서 never에 대입하는 방식)를 쓰고 있었다면 어떤 일이 일어날까요?',
        'triangle을 처리하는 case를 안 만들면 컴파일 오류가 나서, 빠뜨린 걸 바로 알아챌 수 있다',
        ['아무 경고 없이 조용히 넘어간다', '자동으로 triangle의 넓이가 계산된다', '기존 case들이 모두 무효화된다'],
        'default의 shape가 더 이상 never가 아니게 돼서(triangle이 남아서), never 타입에 대입하려는 부분에서 컴파일 오류가 나요.',
        'exhaustive check의 핵심이 "빠뜨린 경우를 컴파일 시점에 알려준다"는 거예요.'
      )
    },
    {
      id: 'unknownVsAny',
      title: 'unknown과 any',
      ready: true,
      summary: '타입 검사를 완전히 포기하는 any와, 안전하게 확인 후 다뤄야 하는 unknown의 차이를 배워요.',
      goals: ['any: 타입 검사를 포기하는 타입', 'unknown: 안전하게 다뤄야 하는 미지의 타입', '왜 any 대신 unknown을 권장하는지'],
      blocks: [
        {
          h: '타입 검사를 포기하는: any',
          html: `<p><code>any</code>로 선언한 값은 <b>어떤 타입 검사도 받지 않아요</b>. 그래서 실수로 잘못된 값을 써도 컴파일러가 잡아주지 않아요.</p>`,
          code: {
            label: 'any_basic.ts',
            lang: 'typescript',
            src: `let value: any = 42;
value = "이제 문자열";
value.toUpperCase(); // 컴파일러가 아무 체크도 안 함(위험)`
          }
        },
        {
          h: '안전하게 다뤄야 하는: unknown',
          html: `<p><code>unknown</code>도 "어떤 타입인지 모른다"는 뜻이지만, <b>실제로 쓰기 전에 반드시 타입을 확인</b>하도록 강제해요.</p>`,
          code: {
            label: 'unknown_basic.ts',
            lang: 'typescript',
            src: `let value: unknown = 42;
// value.toUpperCase(); // 오류! 먼저 타입 확인 필요

if (typeof value === "number") {
  console.log(value + 1);
}`,
            out: `43`
          }
        },
        {
          h: '왜 any 대신 unknown을 권장할까요',
          html: `<p><code>any</code>는 타입 안전성을 완전히 포기하는 거라, TS를 쓰는 의미가 크게 줄어들어요. <code>unknown</code>은 "모르는 값이니 확인부터 하자"를 강제해서 훨씬 안전해요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const val = randInt(1, 50);
          return {
            type: 'blank',
            q: `<code>let value: unknown = ${val}; if (typeof value === "number") { console.log(value + 1); }</code>를 실행하면 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(val + 1)], placeholder: '숫자',
            why: `typeof로 number임을 확인한 뒤라서 value + 1을 계산할 수 있고, ${val} + 1 = ${val + 1}이에요.`,
            hint: 'typeof 확인을 통과했으니, 그 블록 안에서는 value가 number로 좁혀져요.'
          };
        },
        () => makeChoice(
          'any와 unknown의 가장 큰 차이는?',
          'any는 아무 검사 없이 바로 쓸 수 있지만, unknown은 실제로 쓰기 전에 타입 확인이 강제된다',
          ['any와 unknown은 완전히 같다', 'unknown은 숫자에만 쓸 수 있다', 'any는 객체에만 쓸 수 있다'],
          'any는 타입 검사를 완전히 꺼버리지만, unknown은 안전하게 확인한 뒤에만 쓸 수 있게 강제해요.',
          '"안전한 미지의 타입"과 "검사를 포기한 타입"의 차이를 생각해보세요.'
        ),
        () => makeChoice(
          '실무에서 any 대신 unknown을 권장하는 이유는?',
          'unknown은 실제로 값을 다루기 전에 타입 확인을 강제해서 실수를 미리 잡아주기 때문',
          ['unknown이 항상 실행 속도가 더 빨라서', 'any는 컴파일이 아예 안 돼서', 'unknown은 숫자 타입 전용이라서'],
          'unknown은 타입 안전성을 유지하면서도 "아직 모르는 값"을 표현할 수 있어서, any보다 훨씬 안전해요.',
          '타입스크립트를 쓰는 이유(안전성) 자체를 지켜주는 쪽이 어느 것일지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>value: unknown</code>이 문자열인지 <code>typeof</code>로 확인한 뒤, 문자열이면 <code>.length</code>를 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'if (typeof value === "string") {\n  console.log(value.length);\n}',
          accept: ['if (typeof value === "string") {\n  console.log(value.length);\n}'],
          why: 'typeof로 string임을 확인한 뒤에만 .length에 안전하게 접근할 수 있어요.',
          hint: 'if (typeof value === "string") { console.log(value.length); }를 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '외부에서 받은 데이터의 타입을 아직 모를 때, any와 unknown 중 어느 걸 쓰는 게 더 안전할까요?',
        'unknown — 실제로 쓰기 전에 타입 확인을 강제해서', ['any — 검사가 없어서 더 편하니까', '둘 다 안전성 차이가 없다', 'any와 unknown 둘 다 쓰면 안 된다'],
        'unknown은 값을 실제로 사용하기 전에 타입을 확인하도록 강제해서, 예상치 못한 오류를 미리 막아줘요.',
        '"타입을 모른다"는 상황에서 안전하게 다루는 방법이 무엇인지 생각해보세요.'
      )
    },
    {
      id: 'indexSignatures',
      title: '인덱스 시그니처',
      ready: true,
      summary: '어떤 이름의 키든 올 수 있는 객체를 표현하는 인덱스 시그니처를 배워요.',
      goals: ['[key: string]: type으로 동적인 키 다루기', '언제 인덱스 시그니처가 필요한지', 'Record와의 관계'],
      blocks: [
        {
          h: '어떤 이름의 키든 올 수 있을 때: 인덱스 시그니처',
          html: `<p><code>{ [key: string]: 타입 }</code>은 "키 이름은 뭐든 될 수 있지만, 값은 항상 이 타입"이라는 뜻이에요.</p>`,
          code: {
            label: 'index_signature.ts',
            lang: 'typescript',
            src: `type Scores = {
  [key: string]: number;
};

const scores: Scores = {};
scores["지수"] = 90;
scores["민준"] = 85;
console.log(scores["지수"]);`,
            out: `90`
          }
        },
        {
          h: 'Record와의 관계',
          html: `<p><code>Record&lt;string, number&gt;</code>는 사실 이 인덱스 시그니처를 <b>더 짧게 쓴 것</b>과 거의 같아요.</p>`
        },
        {
          h: '정해진 속성과 함께 쓰기',
          html: `<p>특정 필수 속성(<code>name</code>)과 함께, 나머지는 자유로운 키를 허용하는 조합도 가능해요.</p>`,
          code: {
            label: 'index_signature_mixed.ts',
            lang: 'typescript',
            src: `type Config = {
  name: string;
  [key: string]: string;
};`
          }
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          const score = randInt(60, 100);
          return {
            type: 'blank',
            q: `<code>type Scores = { [key: string]: number }; const scores: Scores = {}; scores["${name}"] = ${score};</code>일 때, <code>scores["${name}"]</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(score)], placeholder: '숫자',
            why: `인덱스 시그니처는 자유로운 키에 값을 담을 수 있게 해줘서, scores["${name}"]은 ${score}예요.`,
            hint: '대괄호로 원하는 이름의 키에 값을 저장하고 꺼낼 수 있어요.'
          };
        },
        () => ({
          type: 'blank',
          q: `키가 어떤 문자열이든 되고 값은 number인 타입을 나타내는 인덱스 시그니처를 완성하세요. (예: <code>{ [key: string]: ${'{이것}'} }</code>)`,
          prefix: '{ [key: string]: ', suffix: ' }', accept: ['number'], placeholder: '타입',
          why: '<code>[key: string]: number</code>는 어떤 문자열 키든 값은 number여야 한다는 뜻이에요.',
          hint: '값의 타입을 그대로 쓰면 돼요.'
        }),
        () => makeChoice(
          '<code>Record&lt;string, number&gt;</code>와 <code>{ [key: string]: number }</code>의 관계는?',
          '거의 같은 뜻으로, Record가 인덱스 시그니처를 더 짧게 표현한 것이다',
          ['서로 완전히 다른 개념이다', 'Record는 숫자 키에만 쓸 수 있다', '인덱스 시그니처만 유효한 문법이다'],
          'Record<string, number>는 { [key: string]: number }와 거의 같은 타입을 만들어줘요.',
          'Record가 유틸리티 타입으로서 인덱스 시그니처를 대신 만들어준다고 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '키는 string, 값은 boolean인 타입 <code>Flags</code>를 인덱스 시그니처로 만드세요.',
          starter: '',
          placeholder: 'type Flags = { [key: string]: boolean };',
          accept: ['type Flags = { [key: string]: boolean };'],
          why: '{ [key: string]: boolean } 형태로 인덱스 시그니처를 써요.',
          hint: 'type Flags = { [key: string]: boolean };를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const entries = [['지수', randInt(60, 100)], ['민준', randInt(60, 100)], ['서연', randInt(60, 100)]].slice(0, randInt(2, 3));
        return {
          type: 'blank',
          q: `<code>type Scores = { [key: string]: number }; const scores: Scores = { ${entries.map(([n, s]) => `${n}: ${s}`).join(', ')} };</code>일 때, 모든 값을 다 더하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(entries.reduce((sum, [, s]) => sum + s, 0))], placeholder: '숫자',
          why: `모든 값을 더하면 ${entries.reduce((sum, [, s]) => sum + s, 0)}이에요.`,
          hint: '각 키에 담긴 값들을 다 더해보세요.'
        };
      }
    },
    {
      id: 'functionOverloads',
      title: '함수 오버로드',
      ready: true,
      summary: '입력 타입 조합에 따라 정확한 반환 타입을 알려주는 함수 오버로드를 배워요.',
      goals: ['함수 오버로드가 뭔지', '여러 시그니처와 하나의 구현', '왜 유용한지'],
      blocks: [
        {
          h: '입력에 따라 다른 반환 타입: 함수 오버로드',
          html: `<p>같은 함수 이름에 대해 <b>여러 개의 시그니처(가능한 호출 형태)</b>를 먼저 선언하고, 실제 구현은 <b>하나</b>로 만들 수 있어요.</p>`,
          code: {
            label: 'overload_basic.ts',
            lang: 'typescript',
            src: `function combine(a: string, b: string): string;
function combine(a: number, b: number): number;
function combine(a: any, b: any): any {
  return a + b;
}

console.log(combine("안녕, ", "지수"));
console.log(combine(1, 2));`,
            out: `안녕, 지수\n3`
          }
        },
        {
          h: '왜 유용할까요',
          html: `<p>하나의 함수 이름으로 여러 입력 조합을 다루면서도, <b>각 조합에 맞는 정확한 반환 타입</b>을 호출하는 쪽에 알려줄 수 있어요. <code>combine("a", "b")</code>는 string을, <code>combine(1, 2)</code>는 number를 반환한다고 정확히 알 수 있어요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const a = pick(['안녕, ', '반가워, ']);
          const b = pick(['지수', '민준']);
          return {
            type: 'blank',
            q: `<code>function combine(a: string, b: string): string; function combine(a: number, b: number): number; function combine(a: any, b: any): any { return a + b; }</code>일 때, <code>combine("${a}", "${b}")</code>의 결과는? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [`${a}${b}`], placeholder: '값',
            why: `문자열끼리는 이어붙여져서 "${a}${b}"가 돼요.`,
            hint: '문자열 + 문자열은 이어붙이기가 된다는 걸 떠올려보세요.'
          };
        },
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>combine(${a}, ${b})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `숫자끼리는 더해져서 ${a} + ${b} = ${a + b}예요.`,
            hint: '숫자 + 숫자는 덧셈이 된다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          '함수 오버로드에서, <code>function combine(a: string, b: string): string;</code>과 <code>function combine(a: number, b: number): number;</code> 같은 줄들의 역할은?',
          '실제 구현이 아니라, "이런 방식으로 호출할 수 있다"는 시그니처 선언이다',
          ['각각 독립적으로 실제 실행되는 구현이다', '둘 다 동시에 실행된다', '오류를 발생시키는 코드다'],
          '오버로드 시그니처들은 실제 동작이 아니라, 호출 가능한 형태를 알려주는 선언이에요. 실제 구현은 마지막 함수 하나뿐이에요.',
          '시그니처(선언)와 구현(실제 동작)의 차이를 생각해보세요.'
        ),
        () => makeChoice(
          '함수 오버로드를 쓰면 좋은 점은?',
          '입력 타입 조합에 따라 정확한 반환 타입을 호출하는 쪽에 알려줄 수 있어서',
          ['오버로드 없이는 함수를 아예 못 만들어서', '실행 속도가 항상 빨라져서', '오버로드는 매개변수를 하나만 받을 수 있게 제한해서'],
          '오버로드는 여러 입력 형태 각각에 맞는 정확한 반환 타입을 알려줘서, 사용하는 쪽에서 더 안전하게 쓸 수 있어요.',
          'combine("a","b")가 string을, combine(1,2)가 number를 반환한다고 정확히 아는 게 왜 유용할지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>double(a: number): number</code>와 <code>double(a: string): string</code> 두 시그니처를 갖고, 실제로는 <code>a</code>가 number면 2를 곱하고 string이면 그대로 두 번 반복하는 <code>double</code> 함수를 작성하세요. (구현은 any로)',
          starter: '',
          rows: 8,
          placeholder: 'function double(a: number): number;\nfunction double(a: string): string;\nfunction double(a: any): any {\n  if (typeof a === "number") {\n    return a * 2;\n  }\n  return a + a;\n}',
          accept: ['function double(a: number): number;\nfunction double(a: string): string;\nfunction double(a: any): any {\n  if (typeof a === "number") {\n    return a * 2;\n  }\n  return a + a;\n}'],
          why: '두 시그니처를 먼저 선언하고, any 타입의 구현 안에서 typeof로 분기해요.',
          hint: '시그니처 두 줄 다음에, 실제 구현 함수 안에서 typeof a === "number"로 분기하세요.'
        }),
      ],
      boss: () => {
        const useString = Math.random() < 0.5;
        const a = useString ? pick(['안녕', '반가워']) : randInt(1, 20);
        const b = useString ? pick(['지수', '민준']) : randInt(1, 20);
        const result = useString ? `${a}${b}` : a + b;
        return {
          type: 'blank',
          q: `<code>combine</code>이 문자열끼리는 이어붙이고 숫자끼리는 더할 때, <code>combine(${useString ? `"${a}"` : a}, ${useString ? `"${b}"` : b})</code>의 결과는?`,
          prefix: '', suffix: '', accept: [String(result)], placeholder: '값',
          why: useString ? `문자열이라 이어붙여서 "${result}"예요.` : `숫자라 더해져서 ${result}예요.`,
          hint: '넘긴 값이 문자열인지 숫자인지 먼저 확인해보세요.'
        };
      }
    },
    {
      id: 'typeAssertions',
      title: '타입 단언',
      ready: true,
      summary: '컴파일러의 추론을 무시하고 "이건 이 타입이다"라고 알려주는 타입 단언(as, !)과 그 위험성을 배워요.',
      goals: ['as로 타입을 강제로 지정하기', '!(non-null assertion)로 null 아님을 단언하기', '단언이 위험할 수 있는 이유'],
      blocks: [
        {
          h: '내가 더 잘 안다고 알려주기: as',
          html: `<p><code>값 as 타입</code>은 컴파일러의 타입 추론을 무시하고, "이건 이 타입이다"라고 <b>강제로</b> 알려주는 거예요.</p>`,
          code: {
            label: 'as_assertion.ts',
            lang: 'typescript',
            src: `const value: unknown = "안녕하세요";
const str = value as string;
console.log(str.length);`,
            out: `5`
          }
        },
        {
          h: 'null이 아니라고 확신할 때: !',
          html: `<p><code>값!</code>은 "이건 절대 <code>null</code>이나 <code>undefined</code>가 아니야"라고 단언하는 거예요.</p>`,
          code: {
            label: 'non_null_assertion.ts',
            lang: 'typescript',
            src: `function getLength(str: string | null) {
  return str!.length;
}`
          }
        },
        {
          h: '단언은 위험할 수 있어요',
          html: `<p>단언은 컴파일러를 <b>속이는 것</b>과 비슷해요. 실제로 그 타입이 아니거나 진짜 <code>null</code>이면, <b>런타임에 오류</b>가 날 수 있어요. 확신이 없다면 타입 단언 대신 <b>타입 가드로 실제 확인</b>하는 게 더 안전해요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const word = pick(['안녕하세요', '타입스크립트', '반갑습니다']);
          return {
            type: 'blank',
            q: `<code>const value: unknown = "${word}"; const str = value as string;</code>일 때, <code>str.length</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(word.length)], placeholder: '숫자',
            why: `as string으로 단언한 뒤엔 문자열처럼 다룰 수 있어서, "${word}"의 길이인 ${word.length}가 나와요.`,
            hint: '단언 후에는 그 타입의 기능(length 등)을 쓸 수 있어요.'
          };
        },
        () => ({
          type: 'blank',
          q: `<code>unknown</code> 타입의 <code>value</code>를 <code>string</code>으로 강제 지정하는 문법을 완성하세요.`,
          prefix: 'const str = value ', suffix: ' string;', accept: ['as'], placeholder: '키워드',
          why: '<code>값 as 타입</code>으로 타입을 강제로 지정해요.',
          hint: '"~로서"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>str!.length</code>에서 <code>!</code>가 하는 역할은?',
          'str이 null이나 undefined가 아니라고 단언한다', ['str을 무조건 문자열로 바꾼다', 'str의 값을 반전시킨다', '아무 역할도 하지 않는다'],
          '<code>!</code>(non-null assertion)는 그 값이 null/undefined가 아니라고 컴파일러에게 알려줘요.',
          '느낌표가 논리 부정에도 쓰이지만, 여기서는 "null이 아님을 단언"하는 뜻이에요.'
        ),
        () => makeChoice(
          '타입 단언(as, !)이 위험할 수 있는 이유는?',
          '실제로 그 타입이 아니거나 null인데 단언하면, 런타임에 오류가 날 수 있어서',
          ['단언은 항상 100% 안전해서 위험하지 않다', '단언을 쓰면 컴파일이 아예 안 돼서', '단언은 숫자에만 쓸 수 있어서'],
          '단언은 컴파일러의 검사를 건너뛰는 거라, 실제 값이 다르면 런타임에서 문제가 생길 수 있어요.',
          '컴파일러를 "속이는" 것과 비슷하다는 비유를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>unknown</code> 타입의 <code>data</code>를 <code>number</code>로 단언해서 <code>data + 1</code>을 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'console.log((data as number) + 1);',
          accept: ['console.log((data as number) + 1);'],
          why: '(data as number)로 단언한 뒤 숫자 연산을 할 수 있어요.',
          hint: '(data as number) + 1을 console.log로 출력하세요.'
        }),
      ],
      boss: () => makeChoice(
        '<code>const value: unknown = "hello"; const num = value as number; console.log(num + 1);</code>처럼, 실제로는 문자열인데 number로 잘못 단언했어요. 어떤 일이 일어날까요?',
        '컴파일은 통과하지만 실행 시 예상과 다른(문자열 이어붙이기 등) 결과나 오류가 날 수 있다',
        ['컴파일 시점에 바로 오류가 나서 안전하게 막아준다', '자동으로 문자열이 숫자로 정확히 변환된다', '아무 문제 없이 항상 올바른 숫자 계산이 된다'],
        '단언은 컴파일러의 타입 검사를 건너뛰어서, 실제 타입이 다르면 컴파일은 통과해도 실행 중 예상과 다른 동작이 나올 수 있어요.',
        '단언이 "컴파일러를 속인다"는 위험성을 다시 떠올려보세요.'
      )
    },
    {
      id: 'tupleTypes',
      title: '튜플 타입',
      ready: true,
      summary: '정해진 개수와 각 위치마다 다른 타입을 가질 수 있는 튜플을 배우고, 일반 배열과 어떻게 다른지 알아봐요.',
      goals: ['튜플이 뭔지: 정해진 개수/타입의 배열', '각 위치마다 다른 타입 허용하기', '일반 배열과의 차이'],
      blocks: [
        {
          h: '정해진 개수와 타입의 배열: 튜플',
          html: `<p><code>[타입1, 타입2]</code> 형태로 <b>정확히 몇 개</b>의 값을, <b>각 자리마다 어떤 타입</b>으로 담을지 정할 수 있어요. 이런 배열을 <b>튜플</b>이라고 해요.</p>`,
          code: {
            label: 'tuple_basic.ts',
            lang: 'typescript',
            src: `let point: [number, number] = [3, 4];
console.log(point[0], point[1]);`,
            out: `3 4`
          }
        },
        {
          h: '각 위치마다 다른 타입 허용하기',
          html: `<p>튜플의 각 자리는 <b>서로 다른 타입</b>이어도 돼요.</p>`,
          code: {
            label: 'tuple_mixed.ts',
            lang: 'typescript',
            src: `let user: [string, number] = ["지수", 17];
console.log(user[0]);
console.log(user[1]);`,
            out: `지수\n17`
          }
        },
        {
          h: '일반 배열과의 차이',
          html: `<p>일반 배열(<code>string[]</code>)은 <b>몇 개든, 어떤 순서든</b> 그 타입의 값만 담을 수 있어요. 반면 튜플은 <b>정확히 몇 개, 각 자리마다 어떤 타입</b>인지까지 정해져 있어요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const x = randInt(1, 20), y = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>let point: [number, number] = [${x}, ${y}];</code>일 때, <code>point[1]</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(y)], placeholder: '숫자',
            why: `point[1]은 두 번째 값인 ${y}예요.`,
            hint: '순번은 0부터 시작해요. [1]은 두 번째 값이에요.'
          };
        },
        () => {
          const name = pick(['지수', '민준', '서연']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>let user: [string, number] = ["${name}", ${age}];</code>일 때, <code>user[0]</code>의 값은? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [name], placeholder: '값',
            why: `user[0]은 첫 번째 값인 "${name}"이에요.`,
            hint: '첫 번째 자리는 string 타입으로 정해져 있어요.'
          };
        },
        () => ({
          type: 'blank',
          q: `문자열과 숫자를 순서대로 담는 튜플 타입을 완성하세요. (예: <code>let user: ${'{이것}'} = ["지수", 17];</code>)`,
          prefix: 'let user: ', suffix: ' = ["지수", 17];', accept: ['[string, number]'], placeholder: '[타입, 타입]',
          why: '<code>[string, number]</code>는 첫 자리가 문자열, 두 번째 자리가 숫자인 튜플이에요.',
          hint: '대괄호 안에 순서대로 타입을 나열하세요.'
        }),
        () => makeChoice(
          '튜플과 일반 배열의 가장 큰 차이는?',
          '튜플은 정해진 개수와 각 자리의 타입까지 고정되지만, 배열은 개수 제한 없이 같은 타입만 담는다',
          ['튜플과 배열은 완전히 같은 것이다', '튜플은 숫자만, 배열은 문자열만 담을 수 있다', '배열이 튜플보다 항상 더 안전하다'],
          '튜플은 "정확히 몇 개, 각 자리 무슨 타입"까지 정해지지만, 배열은 개수 제한 없이 같은 타입의 값들을 담아요.',
          '[number, number]와 number[]의 차이를 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '이름(string)과 점수(number)를 순서대로 담는 튜플 <code>student</code>를 <code>"민준"</code>과 <code>85</code>로 만드세요.',
          starter: '',
          placeholder: 'let student: [string, number] = ["민준", 85];',
          accept: ['let student: [string, number] = ["민준", 85];'],
          why: '[string, number] 타입으로 이름과 점수를 순서대로 담아요.',
          hint: 'let student: [string, number] = ["민준", 85];를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        const city = pick(['서울', '부산', '대구']);
        return {
          type: 'blank',
          q: `<code>let info: [string, number, string] = ["${name}", ${age}, "${city}"];</code>일 때, <code>\`\${info[0]}(\${info[1]}, \${info[2]})\`</code>의 결과는?`,
          prefix: '', suffix: '', accept: [`${name}(${age}, ${city})`], placeholder: '값',
          why: `info[0]은 "${name}", info[1]은 ${age}, info[2]는 "${city}"라서 "${name}(${age}, ${city})"가 돼요.`,
          hint: '각 자리의 값을 순서대로 템플릿 리터럴에 넣어보세요.'
        };
      }
    },
    {
      id: 'keyofOperator',
      title: 'keyof 연산자',
      ready: true,
      summary: '타입이 가진 키 이름들을 유니언 타입으로 뽑아내는 keyof 연산자를 배워요.',
      goals: ['keyof로 타입의 키들을 유니언으로 뽑기', '제네릭과 함께 안전하게 속성 접근하기', '왜 유용한지'],
      blocks: [
        {
          h: '타입의 키 이름들을 뽑아내기: keyof',
          html: `<p><code>keyof 타입</code>은 그 타입이 가진 <b>키 이름들을 리터럴 유니언</b>으로 뽑아줘요.</p>`,
          code: {
            label: 'keyof_basic.ts',
            lang: 'typescript',
            src: `type User = { name: string; age: number };
type UserKey = keyof User;  // "name" | "age"

let key: UserKey = "name";`
          }
        },
        {
          h: '제네릭과 함께 안전하게 속성 접근하기',
          html: `<p><code>K extends keyof T</code>는 "key가 반드시 그 객체에 <b>진짜 있는</b> 속성 이름이어야 한다"는 걸 강제해줘요. 오타나 없는 속성 이름을 넘기면 컴파일 오류가 나요.</p>`,
          code: {
            label: 'keyof_generic.ts',
            lang: 'typescript',
            src: `function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "지수", age: 17 };
console.log(getProp(user, "name"));`,
            out: `지수`
          }
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>type User = { name: string; age: number }; type UserKey = keyof User;</code>일 때, <code>UserKey</code>는 어떤 타입일까요?',
          '<code>"name" | "age"</code>', ['<code>string | number</code>', '<code>User</code>와 완전히 같은 타입', '<code>never</code>'],
          'keyof User는 User의 키 이름들을 리터럴 유니언으로 뽑아서 "name" | "age"가 돼요.',
          '값의 타입이 아니라 "키 이름들"을 뽑아낸다는 점을 기억하세요.'
        ),
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>function getProp&lt;T, K extends keyof T&gt;(obj: T, key: K): T[K] { return obj[key]; }</code>이고 <code>const user = { name: "${name}", age: 17 };</code>일 때, <code>getProp(user, "name")</code>의 결과는? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [name], placeholder: '값',
            why: `getProp은 obj[key]를 그대로 반환해서, key가 "name"이니 "${name}"이 나와요.`,
            hint: 'getProp은 넘긴 key에 해당하는 속성 값을 그대로 꺼내줘요.'
          };
        },
        () => ({
          type: 'blank',
          q: `<code>User</code> 타입의 키 이름들을 유니언으로 뽑아내는 연산자를 쓰세요.`,
          prefix: 'type UserKey = ', suffix: ' User;', accept: ['keyof'], placeholder: '연산자',
          why: '<code>keyof User</code>는 User의 키 이름들을 유니언으로 뽑아줘요.',
          hint: '"키(key)의"라는 뜻이 그대로 이름이 된 연산자예요.'
        }),
        () => makeChoice(
          '<code>K extends keyof T</code>가 하는 역할은?',
          'key가 실제로 T에 존재하는 속성 이름이어야 한다고 강제한다', ['key가 항상 문자열이어야 한다고 강제한다', 'T가 배열이어야 한다고 강제한다', 'K가 숫자여야 한다고 강제한다'],
          'K extends keyof T는 key로 넘기는 값이 진짜 T의 속성 이름 중 하나여야 한다고 제약을 걸어요.',
          '오타난 속성 이름을 넘기면 어떻게 될지 생각해보세요 — 이 제약이 그걸 막아줘요.'
        ),
        () => ({
          type: 'code',
          q: '<code>obj</code>(타입 T)와 <code>key</code>(타입 K, K는 keyof T의 제약을 받음)를 받아 <code>obj[key]</code>를 반환하는 제네릭 함수 <code>getProp</code>을 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}',
          accept: ['function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}'],
          why: 'K extends keyof T로 안전한 키만 받도록 제약을 걸고, obj[key]를 반환해요.',
          hint: 'function getProp<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }를 쓰세요.'
        }),
      ],
      boss: () => {
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>const user = { name: "지수", age: ${age} };</code>일 때, <code>getProp(user, "age")</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(age)], placeholder: '숫자',
          why: `getProp은 key가 "age"일 때 user.age인 ${age}를 반환해요.`,
          hint: 'getProp(obj, key)는 obj[key]와 같은 결과를 낸다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'mappedTypes',
      title: '매핑된 타입 기초',
      ready: true,
      summary: '기존 타입의 속성들을 순회하며 새로운 타입을 만드는 매핑된 타입을 배워요.',
      goals: ['[K in keyof T]로 속성 순회하기', '기존 타입을 변형해 새 타입 만들기', 'Partial이 실제로 동작하는 원리'],
      blocks: [
        {
          h: '기존 타입의 각 속성을 순회하며 새 타입 만들기',
          html: `<p><code>[K in keyof T]</code>는 "T의 각 키(K)에 대해 반복한다"는 뜻이에요. 이렇게 기존 타입을 순회해서 새 타입을 만드는 걸 <b>매핑된 타입</b>이라고 해요.</p>`,
          code: {
            label: 'mapped_type_basic.ts',
            lang: 'typescript',
            src: `type User = { name: string; age: number };

type ReadonlyUser = {
  readonly [K in keyof User]: User[K];
};`
          }
        },
        {
          h: 'Partial이 실제로 이렇게 만들어져요',
          html: `<p>앞서 배운 <code>Partial&lt;T&gt;</code> 유틸리티 타입도, 사실 이런 매핑된 타입으로 구현돼 있어요.</p>`,
          code: {
            label: 'mapped_type_partial.ts',
            lang: 'typescript',
            src: `type MyPartial<T> = {
  [K in keyof T]?: T[K];
};`
          },
          after: `<div class="note"><b>정리</b> — <code>[K in keyof T]</code>로 각 속성을 순회하면서, <code>?</code>를 붙이면 Partial처럼, <code>readonly</code>를 붙이면 Readonly처럼 동작하는 새 타입을 직접 만들 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>[K in keyof T]</code>가 뜻하는 것은?',
          'T가 가진 각 키(K)에 대해 반복하며 새 타입을 만든다', ['T의 값 중 하나를 무작위로 고른다', 'T를 배열로 바꾼다', 'T의 키를 전부 삭제한다'],
          '[K in keyof T]는 T의 키들을 하나씩 순회하면서 그 각각에 대해 새 타입을 만들어요.',
          '"for...in"과 비슷하게, 키들을 순회한다는 이미지를 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>User</code> 타입의 모든 속성을 readonly로 만드는 매핑된 타입을 완성하세요. (예: <code>type ReadonlyUser = { readonly ${'{이것}'}: User[K]; };</code>)`,
          prefix: 'type ReadonlyUser = {\n  readonly ', suffix: ': User[K];\n};', accept: ['[K in keyof User]'], placeholder: '매핑 문법',
          why: '<code>[K in keyof User]</code>로 User의 각 키를 순회하며 readonly를 붙여요.',
          hint: 'K in keyof 타입이름을 대괄호로 감싸세요.'
        }),
        () => makeChoice(
          '우리가 앞서 배운 <code>Partial&lt;T&gt;</code> 유틸리티 타입은 실제로 어떻게 동작할까요?',
          '내부적으로 매핑된 타입 [K in keyof T]?: T[K] 형태로 구현돼 있다', ['완전히 다른 특별한 문법으로 만들어진다', 'Partial은 매핑된 타입과 아무 관련이 없다', '항상 빈 객체 타입만 만든다'],
          'Partial<T>는 사실 [K in keyof T]?: T[K] 형태의 매핑된 타입으로 구현돼 있어요.',
          '유틸리티 타입들이 매핑된 타입을 기반으로 만들어졌다는 걸 떠올려보세요.'
        ),
        () => makeChoice(
          '매핑된 타입을 직접 만들 줄 알면 좋은 점은?',
          'Partial, Readonly 같은 기존 유틸리티로 표현 안 되는 나만의 변형 타입도 만들 수 있어서',
          ['매핑된 타입 없이는 객체 타입을 아예 못 만들어서', '매핑된 타입은 배열에만 쓸 수 있어서', '항상 실행 속도가 빨라져서'],
          '매핑된 타입의 원리를 알면, 기존 유틸리티 타입으로 해결 안 되는 상황에서도 직접 필요한 변형 타입을 만들 수 있어요.',
          '기존 유틸리티 타입들이 이 원리로 만들어졌다는 걸 응용해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>User</code> 타입(name, age)의 모든 속성을 선택적(?)으로 만드는 매핑된 타입 <code>MyPartialUser</code>를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'type MyPartialUser = {\n  [K in keyof User]?: User[K];\n};',
          accept: ['type MyPartialUser = {\n  [K in keyof User]?: User[K];\n};'],
          why: '[K in keyof User]?: User[K] 형태로 모든 속성을 순회하며 선택적으로 만들어요.',
          hint: 'type MyPartialUser = { [K in keyof User]?: User[K]; };를 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '<code>type Config = { host: string; port: number; debug: boolean };</code>의 모든 속성을 readonly로 만들고 싶어요. 매핑된 타입으로 어떻게 표현할까요?',
        '<code>{ readonly [K in keyof Config]: Config[K] }</code>', ['<code>{ [K in keyof Config]: readonly Config }</code>', '<code>Partial&lt;Config&gt;</code>', '<code>Config[]</code>'],
        '[K in keyof Config]로 각 속성을 순회하며 readonly를 붙이면 모든 속성이 읽기 전용이 돼요.',
        'Partial은 선택적으로 만드는 것이지 readonly로 만드는 게 아니라는 점에 주의하세요.'
      )
    },
    {
      id: 'tsconfigStrict',
      title: 'tsconfig.json과 strict 모드',
      ready: true,
      summary: '컴파일 설정을 담는 tsconfig.json과, 엄격한 타입 검사를 켜는 strict 모드를 배워요.',
      goals: ['tsconfig.json이 뭔지', 'strict 모드가 켜는 것들', '실무에서 strict를 켜는 이유'],
      blocks: [
        {
          h: '컴파일 설정을 담는 파일: tsconfig.json',
          html: `<p><code>tsconfig.json</code>에 컴파일 옵션을 적어두면, <code>tsc</code>(TypeScript 컴파일러) 명령이 그 설정대로 컴파일해요.</p>`,
          code: {
            label: 'tsconfig.json',
            lang: 'json',
            src: `{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020"
  }
}`
          }
        },
        {
          h: '엄격한 검사를 한 번에 켜는: strict',
          html: `<p><code>"strict": true</code>는 사실 여러 세부 옵션(<code>noImplicitAny</code>, <code>strictNullChecks</code> 등)을 <b>한 번에 다 켜는</b> 것이에요. "혹시 값이 없을 수도 있는데 확인 안 했다" 같은 상황을 훨씬 엄격하게 잡아줘요.</p>`
        },
        {
          h: '실무에서 strict를 켜는 이유',
          html: `<p>처음엔 오류가 많아 보여서 귀찮게 느껴질 수 있지만, 실제 버그를 <b>컴파일 시점에 훨씬 많이</b> 잡아줘서 실무 프로젝트에서는 거의 항상 켜둬요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `TypeScript 컴파일 설정을 담는 파일의 이름을 쓰세요.`,
          prefix: '', suffix: '', accept: ['tsconfig.json'], placeholder: '파일 이름',
          why: '<code>tsconfig.json</code>에 컴파일 옵션을 적어둬요.',
          hint: '"TS 설정(config)"이 합쳐진 이름에 json 확장자가 붙어요.'
        }),
        () => makeChoice(
          '<code>"strict": true</code>가 하는 일은?',
          '여러 엄격한 타입 검사 옵션들을 한 번에 다 켠다', ['컴파일 속도만 빠르게 만든다', 'strict 옵션은 실제로 아무 효과가 없다', 'JavaScript 파일만 컴파일하게 만든다'],
          'strict: true는 noImplicitAny, strictNullChecks 등 여러 세부 옵션을 한꺼번에 켜서 훨씬 엄격한 검사를 해요.',
          '하나의 옵션으로 여러 세부 검사를 한 번에 활성화한다는 점을 기억하세요.'
        ),
        () => makeChoice(
          '실무 프로젝트에서 strict 모드를 거의 항상 켜두는 이유는?',
          '실제 버그를 컴파일 시점에 더 많이 잡아줘서 나중에 발견할 문제를 미리 줄일 수 있어서',
          ['strict를 켜야만 코드가 실행되기 때문에', 'strict를 켜면 파일 크기가 줄어들어서', 'strict가 없으면 TypeScript를 아예 못 써서'],
          'strict 모드는 처음엔 오류가 많아 보이지만, 실제로 숨어있는 버그를 미리 잡아줘서 장기적으로 안전해요.',
          '초반의 번거로움과 장기적인 안전성 중 실무에서 무엇을 더 중요하게 여길지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>strict</code>를 true로, <code>target</code>을 <code>"ES2020"</code>으로 설정하는 <code>tsconfig.json</code>의 <code>compilerOptions</code> 부분을 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: '{\n  "compilerOptions": {\n    "strict": true,\n    "target": "ES2020"\n  }\n}',
          accept: ['{\n  "compilerOptions": {\n    "strict": true,\n    "target": "ES2020"\n  }\n}'],
          why: 'compilerOptions 안에 strict와 target을 각각 설정해요.',
          hint: '{ "compilerOptions": { "strict": true, "target": "ES2020" } }를 그대로 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '새 TypeScript 프로젝트를 시작하는데, "값이 undefined일 수도 있는데 확인 안 하고 쓰는" 실수를 컴파일 시점에 최대한 많이 잡고 싶어요. tsconfig.json에서 무엇을 켜야 할까요?',
        '<code>"strict": true</code>', ['<code>"strict": false</code>', 'target만 설정하면 충분하다', 'tsconfig.json은 이런 것과 관련이 없다'],
        'strict: true는 strictNullChecks를 포함한 여러 엄격한 검사를 켜서, undefined 관련 실수를 컴파일 시점에 잡아줘요.',
        'strict 모드가 정확히 어떤 종류의 실수들을 잡아주는지 떠올려보세요.'
      )
    },
    {
      id: 'declarationFiles',
      title: '.d.ts 선언 파일',
      ready: true,
      summary: '순수 자바스크립트로 만들어진 라이브러리에 타입 정보를 붙여주는 .d.ts 선언 파일을 배워요.',
      goals: ['.d.ts가 뭔지: 타입 정보만 담은 파일', 'declare로 선언하기', '@types 패키지(DefinitelyTyped)'],
      blocks: [
        {
          h: '타입 정보만 담은 파일: .d.ts',
          html: `<p><code>.d.ts</code> 파일은 실제 구현 없이 <b>"이런 함수/타입이 있다"는 선언만</b> 담아요. <code>declare</code> 키워드로 선언해요.</p>`,
          code: {
            label: 'math.d.ts',
            lang: 'typescript',
            src: `declare function add(a: number, b: number): number;`
          }
        },
        {
          h: '자바스크립트 라이브러리에 타입 붙이기',
          html: `<p>원래 타입 정보가 없는 순수 JS 라이브러리를 TS 프로젝트에서 쓸 때, 그 라이브러리용 <code>.d.ts</code>가 있으면 자동완성과 타입 검사를 받을 수 있어요.</p>`
        },
        {
          h: '커뮤니티가 만든 타입: @types 패키지',
          html: `<p>유명한 JS 라이브러리 대부분은 <b>DefinitelyTyped</b>라는 프로젝트에서 커뮤니티가 만든 <code>.d.ts</code>를 <code>@types/이름</code>으로 설치해서 쓸 수 있어요.</p>`,
          code: {
            label: 'terminal',
            lang: 'bash',
            src: `npm install --save-dev @types/lodash`
          }
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '.d.ts 파일에 담기는 내용은?',
          '실제 구현 없이, 함수/타입이 어떤 모양인지에 대한 선언만', ['실제로 실행되는 완전한 구현 코드', '컴파일된 JS 코드 전체', '테스트 코드'],
          '.d.ts는 "이런 함수/타입이 있다"는 선언만 담고, 실제 동작 코드는 담지 않아요.',
          '"선언 파일"이라는 이름 자체가 힌트예요.'
        ),
        () => ({
          type: 'blank',
          q: `.d.ts 파일에서 실제 구현 없이 함수의 타입만 선언할 때 앞에 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: ' function add(a: number, b: number): number;', accept: ['declare'], placeholder: '키워드',
          why: '<code>declare</code>는 "이 함수/변수가 어딘가에 이미 존재한다"고 선언만 해요.',
          hint: '"선언하다"라는 뜻 그대로예요.'
        }),
        () => makeChoice(
          '순수 JavaScript로 만들어진 유명한 라이브러리를 TypeScript 프로젝트에서 타입 지원 받으며 쓰고 싶을 때 설치하는 것은?',
          'DefinitelyTyped의 @types 패키지', ['그 라이브러리를 처음부터 TypeScript로 다시 짠다', 'tsconfig.json만 수정한다', 'strict 모드를 끈다'],
          '@types/라이브러리이름 패키지를 설치하면, 그 라이브러리에 대한 커뮤니티 제작 타입 선언을 받아 쓸 수 있어요.',
          'DefinitelyTyped가 유명한 JS 라이브러리들의 타입 선언을 모아둔 프로젝트라는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>multiply(a: number, b: number): number</code>라는 함수가 어딘가에 이미 존재한다고 선언하는 .d.ts 코드를 작성하세요.',
          starter: '',
          placeholder: 'declare function multiply(a: number, b: number): number;',
          accept: ['declare function multiply(a: number, b: number): number;'],
          why: 'declare function으로 실제 구현 없이 함수의 타입만 선언해요.',
          hint: 'declare function multiply(a: number, b: number): number;를 그대로 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '팀에서 오래전부터 써온 순수 JavaScript 유틸 라이브러리(타입 정보 없음)를 TypeScript 프로젝트에 그대로 가져와 쓰면서도 자동완성과 타입 검사를 받고 싶어요. 어떻게 해야 할까요?',
        '그 라이브러리를 위한 .d.ts 선언 파일을 만들거나, 이미 있는 @types 패키지를 설치한다',
        ['라이브러리 전체를 처음부터 다시 TypeScript로 재작성한다', 'strict 모드를 끄면 자동으로 해결된다', '아무것도 할 수 없다'],
        '.d.ts 선언 파일(직접 작성하거나 @types 패키지)을 추가하면, 기존 JS 코드를 그대로 두고도 타입 지원을 받을 수 있어요.',
        '기존 구현은 그대로 두고 "타입 정보만" 추가하는 방법을 생각해보세요.'
      )
    },
    {
      id: 'discriminatedUnions',
      title: '판별 유니언(Discriminated Union)',
      ready: true,
      summary: '공통된 "종류" 속성으로 유니언 타입의 각 경우를 구분해서, 안전하게 분기하는 실무 패턴을 배워요.',
      goals: ['공통 kind 속성으로 유니언 구분하기', 'if/switch로 안전하게 분기하기', '실무에서 자주 쓰이는 이유'],
      blocks: [
        {
          h: '여러 모양의 객체를 하나의 타입으로 묶기',
          html: `<p>서로 다른 모양의 객체 타입들을 유니언으로 묶고, 공통 속성(흔히 <code>kind</code>라는 이름을 써요)으로 "지금 이게 어떤 경우인지" 구분하는 패턴을 <b>판별 유니언</b>이라고 해요.</p>`,
          code: {
            label: 'discriminated_basic.ts',
            lang: 'typescript',
            src: `type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; side: number };
type Shape = Circle | Square;

function area(shape: Shape): number {
  if (shape.kind === "circle") {
    return 3.14 * shape.radius * shape.radius;
  }
  return shape.side * shape.side;
}

console.log(area({ kind: "square", side: 4 }));`,
            out: `16`
          }
        },
        {
          h: 'kind로 안전하게 좁혀져요',
          html: `<p><code>shape.kind === "circle"</code>이 참으로 확인된 블록 안에서는, TypeScript가 <code>shape</code>를 자동으로 <code>Circle</code> 타입으로 좁혀서 <code>radius</code>에 안전하게 접근할 수 있게 해줘요. Square 쪽 블록에서는 반대로 <code>side</code>에 접근할 수 있어요.</p>`,
          after: `<div class="note"><b>실무에서 왜 자주 쓰일까요</b> — API 응답이나 화면의 상태(state)처럼 "여러 경우의 수 중 하나"를 다뤄야 할 때, 판별 유니언과 kind 분기를 쓰면 있을 수 없는 조합을 컴파일 시점에 막을 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const side = randInt(2, 9);
          return {
            type: 'blank',
            q: `위 area 함수에서, <code>area({ kind: "square", side: ${side} })</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(side * side)], placeholder: '숫자',
            why: `kind가 "square"이니 shape.side * shape.side가 계산되어 ${side * side}가 나와요.`,
            hint: 'square일 때는 side * side를 계산해서 반환해요.'
          };
        },
        () => makeChoice(
          '판별 유니언에서, 유니언에 속한 각 타입을 구분하기 위해 공통으로 넣어두는 속성(예: kind)을 무엇이라고 부르나요?',
          '판별자(discriminant) 속성', ['private 속성', 'readonly 속성', 'static 속성'],
          '보통 kind나 type처럼, 각 타입마다 다른 리터럴 값을 갖는 공통 속성을 판별자 속성이라고 해요.',
          '"구분해주는 열쇠가 되는 속성"이라는 뜻이에요.'
        ),
        () => makeChoice(
          'Shape 유니언에서 <code>shape.kind === "circle"</code>이 참으로 확인된 블록 안에서는, TypeScript가 shape를 어떤 타입으로 이해할까요?',
          'Circle 타입 (radius에 안전하게 접근 가능)', ['Square 타입', 'Shape 타입 그대로(둘 다 가능)', 'never 타입'],
          'kind로 조건을 확인하고 나면, TypeScript는 그 블록 안에서 shape를 Circle로 좁혀서 radius에 안전하게 접근하게 해줘요.',
          '판별자 속성으로 조건을 걸면, 그 안에서는 정확히 어떤 타입인지 TypeScript도 알게 돼요.'
        ),
        () => makeChoice(
          '판별 유니언 패턴이 실무에서 자주 쓰이는 이유는?',
          'API 응답이나 상태(state)처럼 "여러 경우의 수" 중 하나를 안전하게 구분해서 처리할 수 있어서',
          ['실행 속도가 항상 빨라져서', '타입을 하나도 안 써도 되게 해줘서', '변수 이름을 자동으로 지어줘서'],
          '판별 유니언은 여러 경우(성공/실패, 원/사각형 등)를 하나의 타입으로 묶고, kind로 안전하게 구분해서 처리할 수 있게 해줘요.',
          '여러 "경우의 수"를 안전하게 다뤄야 하는 상황을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Shape</code>(Circle | Square, kind로 구분)를 받아, kind가 "square"이면 <code>"정사각형"</code>을, 아니면 <code>"원"</code>을 반환하는 함수 <code>shapeName(shape: Shape): string</code>을 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'function shapeName(shape: Shape): string {\n  if (shape.kind === "square") {\n    return "정사각형";\n  }\n  return "원";\n}',
          accept: ['function shapeName(shape: Shape): string {\n  if (shape.kind === "square") {\n    return "정사각형";\n  }\n  return "원";\n}'],
          why: 'kind가 "square"인지 확인해서 각각 다른 문자열을 반환해요.',
          hint: 'if (shape.kind === "square") { ... } 다음에 return "원";으로 끝내면 나머지 경우를 다 처리할 수 있어요.'
        }),
      ],
      boss: () => {
        const side = randInt(2, 12);
        return {
          type: 'blank',
          q: `위 area 함수에서, <code>area({ kind: "square", side: ${side} })</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(side * side)], placeholder: '숫자',
          why: `kind가 "square"이니 side * side가 계산되어 ${side * side}가 나와요.`,
          hint: 'square일 때는 side * side를 반환한다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'conditionalTypes',
      title: '조건부 타입(Conditional Types)',
      ready: true,
      summary: '"이 타입이 저 타입에 속하면 A, 아니면 B"처럼 타입 레벨에서 조건 분기를 하는 조건부 타입을 배워요.',
      goals: ['extends ? : 문법으로 타입 분기하기', '값의 삼항 연산자와 비교하기', '실제로 어디에 쓰이는지 감 잡기'],
      blocks: [
        {
          h: '값이 아니라 타입에 조건을 걸기',
          html: `<p>값에서 쓰는 삼항 연산자(<code>조건 ? A : B</code>)처럼, 타입에서도 <code>T extends U ? X : Y</code>로 "T가 U에 속하면 X, 아니면 Y"라는 조건부 타입을 만들 수 있어요.</p>`,
          code: {
            label: 'conditional_basic.ts',
            lang: 'typescript',
            src: `type IsString<T> = T extends string ? "yes" : "no";

type A = IsString<string>;  // "yes"
type B = IsString<number>;  // "no"

let result: A = "yes";
console.log(result);`,
            out: `yes`
          }
        },
        {
          h: '실제로 어디에 쓰일까요',
          html: `<p>조건부 타입은 라이브러리 내부에서 "이 값이 배열이면 요소 타입을, 아니면 그 타입 자체를 돌려줘" 같은 복잡한 타입 계산에 많이 쓰여요. 처음엔 직접 만들기보다, <b>남이 만든 조건부 타입을 이해하는 것</b>부터 시작해도 충분해요.</p>`,
          after: `<div class="note"><b>비유</b> — 조건부 타입은 "이 재료가 채소면 이 칸에, 아니면 저 칸에 담아라"는 분류 규칙을 타입의 세계에 적용한 거예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const useString = Math.random() < 0.5;
          const typeArg = useString ? 'string' : 'number';
          return {
            type: 'blank',
            q: `<code>type IsString&lt;T&gt; = T extends string ? "yes" : "no";</code>일 때, <code>IsString&lt;${typeArg}&gt;</code>의 결과 타입은? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [useString ? 'yes' : 'no'], placeholder: '값',
            why: useString ? `${typeArg}은 string에 속하니 "yes"예요.` : `${typeArg}은 string에 속하지 않으니 "no"예요.`,
            hint: '타입 인자가 string인지 아닌지를 먼저 확인해보세요.'
          };
        },
        () => makeChoice(
          '조건부 타입 <code>T extends U ? X : Y</code>에서, 값의 세계에서 이와 가장 비슷한 문법은?',
          '삼항 연산자(<code>조건 ? A : B</code>)', ['if문', 'for문', 'switch문'],
          '둘 다 "조건에 따라 둘 중 하나를 고른다"는 점에서 똑같은 구조예요.',
          '조건, 물음표, 콜론이 나란히 있는 문법을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `타입 조건 분기에서 "T가 U에 속하는지" 검사할 때 쓰는 키워드를 쓰세요.`,
          prefix: 'type IsString<T> = T ', suffix: ' string ? "yes" : "no";', accept: ['extends'], placeholder: '키워드',
          why: '<code>T extends U ? X : Y</code>에서 extends는 "T가 U에 속하면"이라는 조건을 나타내요.',
          hint: '제네릭 제약에서도 봤던 그 키워드예요.'
        }),
        () => makeChoice(
          '조건부 타입이 실무에서 주로 쓰이는 경우는?',
          '라이브러리 내부에서 복잡한 타입 계산(예: 배열이면 요소 타입 추출)을 자동화할 때',
          ['변수의 실행 시점 값을 바꿀 때', '함수 실행 속도를 높일 때', 'CSS 스타일을 지정할 때'],
          '조건부 타입은 실제 값이 아니라 타입 레벨의 계산이라서, 라이브러리 내부의 복잡한 타입 추론을 자동화하는 데 주로 쓰여요.',
          '"타입 레벨의 계산"이라는 표현이 힌트예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>T</code>가 <code>number</code>에 속하면 <code>"yes"</code>, 아니면 <code>"no"</code>가 되는 조건부 타입 <code>IsNumber&lt;T&gt;</code>를 작성하세요.',
          starter: '',
          placeholder: 'type IsNumber<T> = T extends number ? "yes" : "no";',
          accept: ['type IsNumber<T> = T extends number ? "yes" : "no";'],
          why: 'T extends number ? "yes" : "no" 형태로 조건부 타입을 만들어요.',
          hint: 'IsString<T>와 똑같은 구조에서 string 자리만 number로 바꾸면 돼요.'
        }),
      ],
      boss: () => {
        const useString = Math.random() < 0.5;
        const typeArg = useString ? '"안녕"' : '42';
        const typeArgType = useString ? 'string' : 'number';
        return {
          type: 'blank',
          q: `<code>type IsString&lt;T&gt; = T extends string ? "yes" : "no";</code>이고, <code>check(value)</code>가 <code>IsString&lt;typeof value&gt;</code>를 반환한다고 할 때, <code>value</code>가 <code>${typeArg}</code>이면 <code>check(value)</code>의 결과는? (따옴표 없이)`,
          prefix: '', suffix: '', accept: [useString ? 'yes' : 'no'], placeholder: '값',
          why: `${typeArg}은 ${typeArgType} 타입이라서, ${useString ? '"yes"' : '"no"'}가 반환돼요.`,
          hint: '값의 타입이 string인지 아닌지를 먼저 판단해보세요.'
        };
      }
    },
    {
      id: 'asyncAwaitTypes',
      title: 'async/await와 Promise 타입',
      ready: true,
      summary: '비동기 함수의 반환 타입을 Promise<T>로 표기하고, await로 그 안의 값을 안전하게 꺼내는 법을 배워요.',
      goals: ['Promise<T> 타입 표기', 'async 함수와 await', '비동기 코드에서 타입이 주는 안전함'],
      blocks: [
        {
          h: '비동기 함수의 반환 타입: Promise<T>',
          html: `<p><code>async</code> 함수는 항상 Promise를 반환해요. 그 Promise가 나중에 어떤 타입의 값을 담아 줄지는 <code>Promise&lt;T&gt;</code>로 표기해요.</p>`,
          code: {
            label: 'async_basic.ts',
            lang: 'typescript',
            src: `async function fetchAge(): Promise<number> {
  return 17;
}

fetchAge().then(age => console.log(age));`,
            out: `17`
          }
        },
        {
          h: 'await로 Promise 안의 값 꺼내기',
          html: `<p><code>await</code>를 쓰면 Promise가 끝날 때까지 기다렸다가, 그 안의 값을 <b>Promise가 아닌 원래 타입 그대로</b> 꺼내올 수 있어요.</p>`,
          code: {
            label: 'await_basic.ts',
            lang: 'typescript',
            src: `async function greetAsync(name: string): Promise<string> {
  const age: number = await fetchAge();
  return \`\${name}님은 \${age}살이에요\`;
}

greetAsync("지수").then(msg => console.log(msg));`,
            out: `지수님은 17살이에요`
          },
          after: `<div class="note"><b>타입이 주는 안전함</b> — age의 타입을 number라고 미리 적어두면, await 뒤에 실수로 다른 타입을 기대하는 코드를 써도 컴파일 시점에 바로 잡아줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `fetchAge()는 17을 반환하는 비동기 함수이고, greetAsync(name)은 그 값을 await로 꺼내 "이름님은 나이살이에요" 형태의 문장을 반환해요. <code>greetAsync("${name}")</code>이 반환하는 Promise가 담게 될 값은?`,
            prefix: '', suffix: '', accept: [`${name}님은 17살이에요`], placeholder: '값',
            why: `await fetchAge()는 17을 꺼내주고, "${name}님은 17살이에요"가 만들어져요.`,
            hint: 'await는 Promise 안의 값을 꺼내주는 것뿐, 계산 자체는 평소와 같아요.'
          };
        },
        () => makeChoice(
          'async 함수를 선언하면 그 함수의 반환 타입은 항상 어떤 형태가 되나요?',
          '<code>Promise&lt;T&gt;</code> (실제로 반환하는 값의 타입을 T 자리에 감싼 형태)',
          ['항상 <code>void</code>', '항상 <code>any</code>', '반환 타입을 표기할 수 없다'],
          'async 함수는 항상 Promise를 반환해서, 반환 타입은 Promise<T> 형태로 표기해요.',
          '함수 안에서 return하는 값의 타입을 Promise로 감싼다고 생각하면 돼요.'
        ),
        () => ({
          type: 'blank',
          q: `Promise를 반환하는 함수를 호출한 결과에서, 그 안의 값을 곧바로 꺼내 쓰고 싶을 때 앞에 붙이는 키워드를 쓰세요.`,
          prefix: 'const age = ', suffix: ' fetchAge();', accept: ['await'], placeholder: '키워드',
          why: '<code>await</code>는 Promise가 끝날 때까지 기다렸다가 그 안의 값을 꺼내줘요.',
          hint: 'async와 짝을 이루는 그 키워드예요.'
        }),
        () => makeChoice(
          'await를 함수 안에서 쓰려면, 그 함수 앞에 반드시 붙여야 하는 키워드는?',
          '<code>async</code>', ['<code>static</code>', '<code>public</code>', '<code>readonly</code>'],
          'await는 async 함수 안에서만 쓸 수 있어요.',
          'Promise와 짝을 이루는 그 함수 선언 키워드예요.'
        ),
        () => ({
          type: 'code',
          q: '점수(number) 90을 반환하는 비동기 함수 <code>fetchScore</code>를 작성하세요. 반환 타입은 <code>Promise&lt;number&gt;</code>로 표기하세요.',
          starter: '',
          rows: 3,
          placeholder: 'async function fetchScore(): Promise<number> {\n  return 90;\n}',
          accept: ['async function fetchScore(): Promise<number> {\n  return 90;\n}'],
          why: 'async 함수는 반환 타입을 Promise<T>로 감싸서 표기해요.',
          hint: 'async function fetchScore(): Promise<number> { return 90; }를 쓰세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `fetchAge()가 이번엔 ${age}를 반환한다고 할 때, <code>greetAsync("${name}")</code>이 반환하는 Promise가 담게 될 값은?`,
          prefix: '', suffix: '', accept: [`${name}님은 ${age}살이에요`], placeholder: '값',
          why: `await fetchAge()는 ${age}를 꺼내줘서 "${name}님은 ${age}살이에요"가 돼요.`,
          hint: '이번엔 fetchAge가 17이 아니라 다른 값을 반환한다는 점만 다르고, 원리는 똑같아요.'
        };
      }
    },
    {
      id: 'classInheritanceAbstract',
      title: '클래스 상속과 추상 클래스',
      ready: true,
      summary: 'extends로 클래스를 상속받고, abstract로 "직접 만들 수는 없지만 부모 역할만 하는" 추상 클래스를 만드는 법을 배워요.',
      goals: ['extends로 클래스 상속하기', 'super()로 부모 생성자 호출하기', 'abstract 클래스와 추상 메서드'],
      blocks: [
        {
          h: '클래스 상속하기: extends',
          html: `<p><code>class 자식 extends 부모</code>로, 부모 클래스의 속성과 메서드를 그대로 물려받는 자식 클래스를 만들 수 있어요. 자식에서 같은 이름의 메서드를 다시 정의하면(오버라이드), 자식의 버전이 실행돼요.</p>`,
          code: {
            label: 'inheritance_basic.ts',
            lang: 'typescript',
            src: `class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  speak(): string {
    return \`\${this.name}가 소리를 내요\`;
  }
}

class Dog extends Animal {
  speak(): string {
    return \`\${this.name}가 멍멍 짖어요\`;
  }
}

const d = new Dog("초코");
console.log(d.speak());`,
            out: `초코가 멍멍 짖어요`
          }
        },
        {
          h: '부모의 생성자 호출하기: super()',
          html: `<p>자식 클래스에서 생성자를 직접 만들 때는, 맨 처음에 <code>super(...)</code>로 부모 클래스의 생성자를 먼저 호출해줘야 해요.</p>`,
          code: {
            label: 'super_basic.ts',
            lang: 'typescript',
            src: `class Cat extends Animal {
  color: string;
  constructor(name: string, color: string) {
    super(name);
    this.color = color;
  }
}

const c = new Cat("나비", "회색");
console.log(c.name, c.color);`,
            out: `나비 회색`
          }
        },
        {
          h: '직접 만들 수 없는 부모: abstract 클래스',
          html: `<p><code>abstract class</code>는 <b>직접 new로 만들 수 없고</b>, 반드시 자식 클래스가 상속받아서 써야 하는 클래스예요. <code>abstract</code> 메서드는 "이 메서드는 자식이 반드시 구현해야 한다"는 뜻이에요.</p>`,
          code: {
            label: 'abstract_basic.ts',
            lang: 'typescript',
            src: `abstract class Shape {
  abstract area(): number;
  describe(): string {
    return \`넓이는 \${this.area()}예요\`;
  }
}

class Square extends Shape {
  constructor(private side: number) {
    super();
  }
  area(): number {
    return this.side * this.side;
  }
}

console.log(new Square(4).describe());`,
            out: `넓이는 16이에요`
          },
          after: `<div class="note"><b>주의</b> — <code>new Shape()</code>처럼 abstract 클래스를 직접 만들려고 하면 컴파일 오류가 나요. 반드시 Square처럼 area()를 구현한 자식 클래스로만 만들 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['초코', '보리', '두부']);
          return {
            type: 'blank',
            q: `Dog는 Animal을 상속받아 speak()를 새로 정의했고, "이름가 멍멍 짖어요" 형태의 문장을 반환해요. <code>const d = new Dog("${name}");</code>일 때, <code>d.speak()</code>의 결과는?`,
            prefix: '', suffix: '', accept: [`${name}가 멍멍 짖어요`], placeholder: '값',
            why: `Dog가 speak()를 오버라이드했으니 그 버전이 실행되어 "${name}가 멍멍 짖어요"가 돼요.`,
            hint: '자식 클래스가 부모의 메서드를 다시 정의(오버라이드)하면, 자식의 버전이 실행돼요.'
          };
        },
        () => makeChoice(
          '자식 클래스의 생성자에서 부모 클래스의 생성자를 호출할 때 쓰는 것은?',
          '<code>super(...)</code>', ['<code>parent(...)</code>', '<code>base(...)</code>', '<code>this.super(...)</code>'],
          '<code>super(...)</code>로 부모 클래스의 생성자를 호출해요.',
          '"위, 상위"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `Dog 클래스가 Animal 클래스를 상속받도록 만드는 키워드를 쓰세요.`,
          prefix: 'class Dog ', suffix: ' Animal { ... }', accept: ['extends'], placeholder: '키워드',
          why: '<code>class 자식 extends 부모</code>로 상속을 표현해요.',
          hint: '"확장하다"라는 뜻의 그 키워드, 제네릭 제약에서도 봤어요.'
        }),
        () => makeChoice(
          'abstract 클래스에 대한 설명으로 옳은 것은?',
          '직접 new로 인스턴스를 만들 수 없고, 자식 클래스가 상속받아야 한다',
          ['일반 클래스와 완전히 똑같이 동작한다', 'abstract 클래스는 메서드를 하나도 가질 수 없다', 'abstract 클래스는 상속받을 수 없다'],
          'abstract 클래스는 직접 만들 수 없는 "부모 전용" 클래스로, 자식 클래스가 상속받아서만 쓸 수 있어요.',
          '"추상적인, 실체가 없는"이라는 뜻의 abstract를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>abstract class Shape { abstract area(): number; }</code>를 상속받아, <code>radius</code>(number)를 받는 생성자와 <code>area()</code>(반지름 × 반지름 × 3을 반환)를 구현하는 <code>Circle</code> 클래스를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: 'class Circle extends Shape {\n  constructor(private radius: number) {\n    super();\n  }\n  area(): number {\n    return this.radius * this.radius * 3;\n  }\n}',
          accept: ['class Circle extends Shape {\n  constructor(private radius: number) {\n    super();\n  }\n  area(): number {\n    return this.radius * this.radius * 3;\n  }\n}'],
          why: 'extends로 Shape를 상속받고, super()로 부모 생성자를 호출한 뒤, area()를 실제로 구현해요.',
          hint: 'constructor 맨 처음에 super();를 꼭 넣어야 해요.'
        }),
      ],
      boss: () => {
        const side = randInt(2, 9);
        return {
          type: 'blank',
          q: `Square는 Shape를 상속받아 area()를 side * side로 구현했고, describe()는 "넓이는 (결과)예요" 형태의 문장을 반환해요. <code>const s = new Square(${side});</code>일 때, <code>s.describe()</code>의 결과는?`,
          prefix: '', suffix: '', accept: [`넓이는 ${side * side}예요`], placeholder: '값',
          why: `area()는 ${side} * ${side} = ${side * side}를 반환하고, describe()는 그 값을 문장에 넣어 "넓이는 ${side * side}예요"가 돼요.`,
          hint: 'area()의 결과를 먼저 계산한 뒤, describe()의 문장 형태에 넣어보세요.'
        };
      }
    },
    {
      id: 'moreUtilityTypes',
      title: '더 많은 유틸리티 타입 (Readonly, Required, ReturnType)',
      ready: true,
      summary: 'Partial/Pick/Omit에 이어, 값을 못 바꾸게 하거나(Readonly) 모든 속성을 필수로 만들거나(Required), 함수의 반환 타입을 뽑아내는(ReturnType) 유틸리티 타입을 배워요.',
      goals: ['Readonly<T>로 전체를 읽기전용으로', 'Required<T>로 전체를 필수로', 'ReturnType<T>로 함수의 반환 타입 뽑기'],
      blocks: [
        {
          h: '모든 속성을 읽기전용으로: Readonly<T>',
          html: `<p><code>Readonly&lt;T&gt;</code>는 T의 모든 속성 앞에 <code>readonly</code>를 붙인 것과 같은 효과를 줘요. 객체를 만든 뒤에는 어떤 속성도 바꿀 수 없게 돼요.</p>`,
          code: {
            label: 'readonly_utility.ts',
            lang: 'typescript',
            src: `type User = { name: string; age: number };
type ReadonlyUser = Readonly<User>;

const u: ReadonlyUser = { name: "지수", age: 17 };
// u.age = 18; // 오류! 읽기전용이라 바꿀 수 없어요
console.log(u.age);`,
            out: `17`
          }
        },
        {
          h: '모든 속성을 필수로: Required<T>',
          html: `<p>속성에 <code>?</code>가 붙어 선택적이던 타입을 <code>Required&lt;T&gt;</code>로 감싸면 <b>모든 속성이 필수</b>가 돼요. Partial과 정반대 역할이에요.</p>`,
          code: {
            label: 'required_utility.ts',
            lang: 'typescript',
            src: `type Profile = { name: string; nickname?: string };
type FullProfile = Required<Profile>;

const p: FullProfile = { name: "민준", nickname: "민민" };
console.log(p.nickname);`,
            out: `민민`
          }
        },
        {
          h: '함수의 반환 타입 뽑아내기: ReturnType<T>',
          html: `<p><code>ReturnType&lt;typeof 함수&gt;</code>는 그 함수가 <b>반환하는 값의 타입</b>을 뽑아줘요. 함수 반환 타입이 바뀌면 자동으로 함께 바뀌어서 편리해요.</p>`,
          code: {
            label: 'returntype_utility.ts',
            lang: 'typescript',
            src: `function makeUser(name: string) {
  return { name, age: 0 };
}

type MadeUser = ReturnType<typeof makeUser>;
const u2: MadeUser = { name: "서연", age: 18 };
console.log(u2.age);`,
            out: `18`
          },
          after: `<div class="note"><b>정리</b> — Partial(모두 선택적), Required(모두 필수), Readonly(모두 읽기전용), ReturnType(함수의 반환 타입 추출) 넷 다 "기존 타입을 가공해서 새 타입을 만든다"는 공통점이 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>type User = { name: string; age: number }; type ReadonlyUser = Readonly&lt;User&gt;; const u: ReadonlyUser = { name: "지수", age: ${age} };</code>일 때, <code>u.age</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(age)], placeholder: '숫자',
            why: `Readonly는 값을 못 바꾸게 할 뿐, 처음 만들 때 넣은 값(${age})은 그대로 읽을 수 있어요.`,
            hint: 'Readonly는 "바꾸는 것"만 막지, 값을 읽는 건 평소와 똑같아요.'
          };
        },
        () => makeChoice(
          'Readonly<User> 타입의 객체를 만든 뒤, <code>u.age = 20;</code>처럼 값을 바꾸려고 하면?',
          '컴파일 오류가 난다', ['정상적으로 바뀐다', 'age가 자동으로 0이 된다', '아무 일도 안 일어나고 그대로 유지된다(오류 없이)'],
          'Readonly로 감싼 속성은 처음 만들 때만 값을 정할 수 있고, 그 뒤에 바꾸려고 하면 컴파일 오류가 나요.',
          '"읽기 전용"이라는 이름 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>type Profile = { name: string; nickname?: string };</code>에서, nickname처럼 선택적인 속성들까지 전부 필수로 만드는 유틸리티 타입을 쓰세요.`,
          prefix: 'type FullProfile = ', suffix: '<Profile>;', accept: ['Required'], placeholder: '유틸리티 타입',
          why: '<code>Required&lt;T&gt;</code>는 T의 모든 속성을 필수로 만들어요.',
          hint: 'Partial의 정반대 역할을 하는 유틸리티 타입이에요.'
        }),
        () => makeChoice(
          '<code>ReturnType&lt;typeof 함수&gt;</code>가 뽑아내는 것은?',
          '그 함수가 반환하는 값의 타입', ['그 함수의 매개변수 타입들', '그 함수의 이름', '그 함수가 비동기인지 여부'],
          'ReturnType은 함수의 반환값 타입만 뽑아내요. 매개변수 타입을 뽑으려면 Parameters를 써요.',
          '이름 그대로 "반환(Return) 타입(Type)"을 뽑아내요.'
        ),
        () => ({
          type: 'code',
          q: '<code>function makeScore(value: number) { return { value, passed: value >= 60 }; }</code>가 반환하는 값의 타입을 뽑아내는 타입 별칭 <code>ScoreResult</code>를 ReturnType으로 만드세요.',
          starter: '',
          placeholder: 'type ScoreResult = ReturnType<typeof makeScore>;',
          accept: ['type ScoreResult = ReturnType<typeof makeScore>;'],
          why: 'ReturnType<typeof 함수>로 함수의 반환 타입을 뽑아내요.',
          hint: 'type ScoreResult = ReturnType<typeof makeScore>;를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const nickname = pick(['수수', '민민', '서서']);
        return {
          type: 'blank',
          q: `<code>type Profile = { name: string; nickname?: string }; type FullProfile = Required&lt;Profile&gt;; const p: FullProfile = { name: "${name}", nickname: "${nickname}" };</code>일 때, <code>p.nickname</code>의 값은? (따옴표 없이)`,
          prefix: '', suffix: '', accept: [nickname], placeholder: '값',
          why: `Required로 감싸도 실제 값은 그대로라서, nickname은 "${nickname}"이에요.`,
          hint: 'Required는 "선택적이었던 속성도 필수로 만든다"는 뜻일 뿐, 넣은 값은 그대로예요.'
        };
      }
    },
    {
      id: 'narrowingInstanceofIn',
      title: 'instanceof와 in으로 타입 좁히기',
      ready: true,
      summary: 'typeof에 이어, 클래스 인스턴스를 구분하는 instanceof와 객체에 특정 속성이 있는지 확인하는 in 연산자로 타입을 좁히는 법을 배워요.',
      goals: ['instanceof로 클래스 인스턴스 구분하기', 'in 연산자로 속성 존재 확인하기', '어떤 상황에 어떤 걸 쓸지'],
      blocks: [
        {
          h: '클래스 인스턴스 구분하기: instanceof',
          html: `<p><code>값 instanceof 클래스</code>는 "그 값이 이 클래스로 만들어졌는지"를 확인해줘요. 참이면 그 블록 안에서 TypeScript가 값을 그 클래스 타입으로 좁혀줘요.</p>`,
          code: {
            label: 'instanceof_basic.ts',
            lang: 'typescript',
            src: `class Dog {
  bark(): string { return "멍멍"; }
}
class Cat {
  meow(): string { return "야옹"; }
}

function makeSound(animal: Dog | Cat): string {
  if (animal instanceof Dog) {
    return animal.bark();
  }
  return animal.meow();
}

console.log(makeSound(new Dog()));`,
            out: `멍멍`
          }
        },
        {
          h: '객체에 속성이 있는지 확인하기: in',
          html: `<p>클래스가 아니라 일반 객체 타입의 유니언이라면, <code>"속성이름" in 객체</code>로 그 속성이 있는지 확인해서 타입을 좁힐 수 있어요.</p>`,
          code: {
            label: 'in_operator.ts',
            lang: 'typescript',
            src: `type Fish = { swim: () => string };
type Bird = { fly: () => string };

function move(animal: Fish | Bird): string {
  if ("swim" in animal) {
    return animal.swim();
  }
  return animal.fly();
}

console.log(move({ swim: () => "헤엄쳐요" }));`,
            out: `헤엄쳐요`
          },
          after: `<div class="note"><b>언제 어떤 걸 쓸까요</b> — 클래스로 만든 값은 instanceof, 클래스가 아닌 객체 타입(interface/type)의 유니언은 in을 주로 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const useDog = Math.random() < 0.5;
          return {
            type: 'blank',
            q: `makeSound는 <code>animal instanceof Dog</code>이면 bark()("멍멍")를, 아니면 meow()("야옹")를 반환해요. <code>makeSound(new ${useDog ? 'Dog' : 'Cat'}())</code>의 결과는? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [useDog ? '멍멍' : '야옹'], placeholder: '값',
            why: useDog ? 'Dog 인스턴스라서 bark()가 실행되어 "멍멍"이에요.' : 'Cat 인스턴스라서 meow()가 실행되어 "야옹"이에요.',
            hint: 'instanceof로 어떤 클래스인지 확인한 뒤, 그에 맞는 메서드가 실행돼요.'
          };
        },
        () => makeChoice(
          'instanceof로 타입을 좁히는 건 주로 어떤 값에 쓰나요?',
          '클래스로 만든(new로 생성한) 인스턴스', ['모든 객체 리터럴', '숫자와 문자열', '함수의 매개변수 이름'],
          'instanceof는 그 값이 특정 클래스로 만들어졌는지를 확인하는 연산자라서, 클래스 인스턴스에 주로 써요.',
          '"이것은 ~의 인스턴스인가?"라는 뜻을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `객체에 특정 속성이 있는지 확인해서 타입을 좁힐 때 쓰는 연산자를 쓰세요. (예: "swim" ___ animal)`,
          prefix: '"swim" ', suffix: ' animal', accept: ['in'], placeholder: '연산자',
          why: '<code>"속성" in 객체</code>는 그 객체가 해당 속성을 가지고 있는지 확인해요.',
          hint: '"~안에"라는 뜻의 짧은 영어 단어예요.'
        }),
        () => makeChoice(
          'move 함수에서 "swim" in animal이 거짓일 때, TypeScript는 animal을 어떤 타입으로 좁혀서 이해할까요?',
          'Bird 타입', ['Fish 타입', 'Fish | Bird 그대로', 'never 타입'],
          'swim 속성이 없다고 확인됐으니, 남은 가능성인 Bird로 좁혀져요.',
          'Fish와 Bird 중 swim이 없는 쪽이 뭔지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Dog</code>(bark(): string)와 <code>Cat</code>(meow(): string) 클래스의 유니언을 받아, instanceof로 구분해서 알맞은 메서드를 호출하고 그 결과를 반환하는 함수 <code>makeSound(animal: Dog | Cat): string</code>을 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'function makeSound(animal: Dog | Cat): string {\n  if (animal instanceof Dog) {\n    return animal.bark();\n  }\n  return animal.meow();\n}',
          accept: ['function makeSound(animal: Dog | Cat): string {\n  if (animal instanceof Dog) {\n    return animal.bark();\n  }\n  return animal.meow();\n}'],
          why: 'instanceof로 Dog인지 확인해서, 맞으면 bark(), 아니면 meow()를 호출해요.',
          hint: 'if (animal instanceof Dog) { ... } 다음에 나머지 경우를 처리하면 돼요.'
        }),
      ],
      boss: () => {
        const isFish = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `move 함수는 "swim" in animal이면 animal.swim()을("헤엄쳐요"), 아니면 animal.fly()를("날아가요") 반환해요. animal이 ${isFish ? '{ swim: () => "헤엄쳐요" }' : '{ fly: () => "날아가요" }'}일 때, move(animal)의 결과는? (따옴표 없이)`,
          prefix: '', suffix: '', accept: [isFish ? '헤엄쳐요' : '날아가요'], placeholder: '값',
          why: isFish ? 'swim 속성이 있으니 "헤엄쳐요"가 반환돼요.' : 'swim 속성이 없고 fly만 있으니 "날아가요"가 반환돼요.',
          hint: '"swim" in animal이 참인지 거짓인지 먼저 확인해보세요.'
        };
      }
    },
    {
      id: 'nonNullAssertion',
      title: '옵셔널 체이닝, 널 병합, 비-null 단언',
      ready: true,
      summary: '값이 null/undefined일 수도 있는 상황을 안전하게 다루는 ?.와 ??, 그리고 "이건 절대 null이 아니야"라고 알려주는 ! 연산자를 배워요.',
      goals: ['?.(옵셔널 체이닝)로 안전하게 접근하기', '??(널 병합)로 기본값 정하기', '!(비-null 단언)를 신중하게 쓰기'],
      blocks: [
        {
          h: '있을 수도, 없을 수도 있는 값에 안전하게 접근하기: ?.',
          html: `<p><code>객체?.속성</code>은 객체가 null이나 undefined이면 오류 없이 그냥 undefined를 돌려주고, 값이 있으면 평소처럼 속성에 접근해요.</p>`,
          code: {
            label: 'optional_chaining.ts',
            lang: 'typescript',
            src: `type User = { profile?: { nickname: string } };

const u1: User = {};
const u2: User = { profile: { nickname: "민민" } };

console.log(u1.profile?.nickname);
console.log(u2.profile?.nickname);`,
            out: `undefined\n민민`
          }
        },
        {
          h: '값이 없을 때 기본값 정하기: ??',
          html: `<p><code>값 ?? 기본값</code>은 왼쪽 값이 null이나 undefined일 때만 오른쪽 기본값을 써요. (숫자 0이나 빈 문자열은 "값이 있다"고 보고 그대로 써요 — <code>||</code>와의 차이예요.)</p>`,
          code: {
            label: 'nullish_coalescing.ts',
            lang: 'typescript',
            src: `const nickname: string | undefined = undefined;
console.log(nickname ?? "닉네임 없음");

const score: number | undefined = 0;
console.log(score ?? 100);`,
            out: `닉네임 없음\n0`
          },
          after: `<div class="note"><b>|| 와의 차이</b> — score || 100이었다면 0은 "거짓 같은 값"으로 취급되어 100이 나왔을 거예요. ??는 정말 null/undefined일 때만 기본값을 써서 이런 실수를 막아줘요.</div>`
        },
        {
          h: '"이건 절대 null이 아니야": 비-null 단언(!)',
          html: `<p>값 뒤에 <code>!</code>를 붙이면 "나는 이 값이 null이나 undefined가 아니라는 걸 확신한다"고 TypeScript에게 알려주는 거예요. 컴파일러는 그 확신을 믿고 오류를 내지 않지만, <b>확신이 틀리면 실행 중 진짜 오류</b>가 나니 신중하게 써야 해요.</p>`,
          code: {
            label: 'non_null_assertion.ts',
            lang: 'typescript',
            src: `function getNickname(u: User): string {
  return u.profile!.nickname;
}

console.log(getNickname(u2));`,
            out: `민민`
          }
        }
      ],
      quizGenerators: [
        () => {
          const has = Math.random() < 0.5;
          const nick = pick(['민민', '수수']);
          return {
            type: 'blank',
            q: `<code>type User = { profile?: { nickname: string } }; const u: User = ${has ? `{ profile: { nickname: "${nick}" } }` : '{}'};</code>일 때, <code>u.profile?.nickname</code>의 값은? (없으면 undefined)`,
            prefix: '', suffix: '', accept: [has ? nick : 'undefined'], placeholder: '값',
            why: has ? `profile이 있으니 그 안의 nickname인 "${nick}"이 나와요.` : 'profile 자체가 없으니 ?.가 안전하게 undefined를 돌려줘요.',
            hint: '?.는 객체가 없으면 오류 대신 undefined를 돌려줘요.'
          };
        },
        () => makeChoice(
          '<code>score ?? 100</code>에서 score가 0일 때 결과는?',
          '0 (0은 null/undefined가 아니라서 그대로 써요)', ['100', 'undefined', '오류가 난다'],
          '??는 정말 null이나 undefined일 때만 오른쪽 기본값을 써요. 0은 그 자체로 유효한 값이라 그대로 나와요.',
          '?? 는 "값이 없을 때"만 기본값을 쓰지, "값이 0이나 빈 문자열일 때"는 신경 쓰지 않아요.'
        ),
        () => ({
          type: 'blank',
          q: `왼쪽 값이 null이나 undefined일 때만 오른쪽 기본값을 쓰는 연산자를 쓰세요.`,
          prefix: 'const nickname = value ', suffix: ' "기본값";', accept: ['??'], placeholder: '연산자',
          why: '<code>??</code>(널 병합 연산자)는 정말 null/undefined일 때만 오른쪽 값을 써요.',
          hint: '물음표 두 개를 나란히 쓰는 연산자예요.'
        }),
        () => makeChoice(
          '! (비-null 단언)를 쓸 때 주의할 점은?',
          '확신이 틀리면 실행 중에 진짜 오류가 날 수 있다', ['항상 100% 안전하다', '컴파일 속도가 느려진다', '값의 타입을 자동으로 바꿔준다'],
          '!는 컴파일러에게 "이건 null이 아니다"라고 약속하는 것뿐이라, 실제로 null이면 실행 중 오류가 나요.',
          '컴파일러의 타입 검사를 "우회"하는 것에 가깝다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>type User = { profile?: { nickname: string } };</code>일 때, profile이 반드시 있다고 확신하고 <code>u.profile.nickname</code>을 비-null 단언(!)으로 바로 꺼내 반환하는 함수 <code>getNickname(u: User): string</code>을 작성하세요.',
          starter: '',
          placeholder: 'function getNickname(u: User): string {\n  return u.profile!.nickname;\n}',
          accept: ['function getNickname(u: User): string {\n  return u.profile!.nickname;\n}'],
          why: 'profile 뒤에 !를 붙여서 "이건 null이 아니다"라고 TypeScript에게 알려줘요.',
          hint: 'u.profile 뒤에 !를 붙이고 .nickname을 이어 쓰세요.'
        }),
      ],
      boss: () => {
        const has = Math.random() < 0.5;
        const nick = pick(['민민', '수수', '지지']);
        return {
          type: 'blank',
          q: `<code>const nickname = u.profile?.nickname ?? "닉네임 없음";</code>이고 <code>u.profile</code>이 ${has ? `{ nickname: "${nick}" }` : '없음(undefined)'}일 때, nickname의 값은?`,
          prefix: '', suffix: '', accept: [has ? nick : '닉네임 없음'], placeholder: '값',
          why: has ? `profile.nickname이 있으니 "${nick}"이 그대로 쓰여요.` : `profile이 없어서 ?.가 undefined를 주고, ??가 기본값 "닉네임 없음"을 대신 써요.`,
          hint: '?.가 먼저 안전하게 값을 꺼내려 시도하고, 그 결과가 null/undefined면 ??가 기본값을 대신 써요.'
        };
      }
    },
    {
      id: 'templateLiteralTypes',
      title: '템플릿 리터럴 타입',
      ready: true,
      summary: '문자열 템플릿 리터럴처럼, 문자열 타입 조각들을 이어붙여 새로운 문자열 타입을 만드는 법을 배워요.',
      goals: ['백틱 템플릿 문법으로 문자열 타입 만들기', '유니언과 함께 여러 조합 만들기', '실무 활용 예 감 잡기'],
      blocks: [
        {
          h: '문자열 값처럼, 문자열 타입도 조립할 수 있어요',
          html: `<p>값에서 쓰는 템플릿 리터럴처럼, 타입에서도 백틱과 <code>\${...}</code>로 문자열 타입 조각들을 이어붙일 수 있어요.</p>`,
          code: {
            label: 'template_literal_basic.ts',
            lang: 'typescript',
            src: `type Greeting = \`안녕, \${string}님\`;

let g1: Greeting = "안녕, 지수님";
console.log(g1);`,
            out: `안녕, 지수님`
          }
        },
        {
          h: '유니언과 함께 쓰면 여러 조합이 한 번에 만들어져요',
          html: `<p>템플릿 리터럴 타입 안에 유니언을 넣으면, 가능한 모든 조합이 자동으로 만들어져요.</p>`,
          code: {
            label: 'template_literal_union.ts',
            lang: 'typescript',
            src: `type Size = "small" | "medium" | "large";
type ButtonClass = \`btn-\${Size}\`;
// "btn-small" | "btn-medium" | "btn-large"

let cls: ButtonClass = "btn-medium";
console.log(cls);`,
            out: `btn-medium`
          },
          after: `<div class="note"><b>실무 활용</b> — 이벤트 이름이나 CSS 클래스 이름처럼, 정해진 규칙을 따르는 문자열들을 다룰 때 자주 쓰여요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const size = pick(['small', 'medium', 'large']);
          return {
            type: 'blank',
            q: `Size는 "small" | "medium" | "large" 유니언이고, ButtonClass는 그 앞에 "btn-"을 붙인 템플릿 리터럴 타입이에요. <code>let cls: ButtonClass = "btn-${size}";</code>는 오류 없이 허용될까요? ("예" 또는 "아니오")`,
            prefix: '', suffix: '', accept: ['예'], placeholder: '예/아니오',
            why: `"btn-${size}"는 ButtonClass가 허용하는 조합 중 하나라서 오류 없이 허용돼요.`,
            hint: 'Size에 속한 값 뒤에 btn- 접두사를 붙인 형태라면 모두 ButtonClass에 포함돼요.'
          };
        },
        () => makeChoice(
          '템플릿 리터럴 타입에 유니언을 넣으면 어떤 일이 생기나요?',
          '가능한 모든 조합이 자동으로 합쳐진 유니언 타입이 만들어진다',
          ['첫 번째 값만 사용된다', '유니언은 템플릿 리터럴 타입 안에 넣을 수 없다', '컴파일 오류가 난다'],
          'Size의 각 값마다 btn- 접두사가 붙은 조합이 전부 만들어져서, 그 자체로 유니언 타입이 돼요.',
          '유니언의 각 값에 대해 접두사가 하나씩 붙는다고 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: '문자열 타입 조각들을 백틱과 ${...}로 이어붙여 새로운 문자열 타입을 만드는 문법을 템플릿 리터럴 타입이라고 해요. Size 유니언 앞에 "btn-"을 붙인 타입을 완성하세요.',
          prefix: 'type ButtonClass = `btn-${', suffix: '}`;', accept: ['Size'], placeholder: '타입',
          why: '`btn-${Size}`처럼 Size 유니언을 템플릿 리터럴 타입 안에 넣으면 모든 조합이 만들어져요.',
          hint: '앞에서 만든 유니언 타입 이름을 그대로 넣으면 돼요.'
        }),
        () => makeChoice(
          '템플릿 리터럴 타입이 실무에서 활용되는 예로 알맞은 것은?',
          'CSS 클래스 이름이나 이벤트 이름처럼, 정해진 규칙을 따르는 문자열들을 타입으로 안전하게 표현할 때',
          ['배열의 길이를 계산할 때', '숫자 연산을 더 빠르게 할 때', '클래스 상속 관계를 표현할 때'],
          '템플릿 리터럴 타입은 문자열 "패턴"을 타입으로 표현해서, 정해진 규칙을 따르는 문자열들을 안전하게 다룰 수 있게 해줘요.',
          '문자열의 "형태"를 다루는 기능이라는 점을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: 'Size(유니언 "small" | "medium" | "large") 앞에 "icon-"을 붙인 템플릿 리터럴 타입 IconClass를 만드세요.',
          starter: '',
          placeholder: 'type IconClass = `icon-${Size}`;',
          accept: ['type IconClass = `icon-${Size}`;'],
          why: '템플릿 리터럴 타입 문법으로 접두사를 붙인 문자열 타입을 만들어요.',
          hint: 'type IconClass = `icon-${Size}`;를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const size = pick(['small', 'medium', 'large']);
        return {
          type: 'blank',
          q: `ButtonClass가 "btn-" + Size 조합이라고 할 때, <code>"btn-${size}"</code>가 ButtonClass 타입에 속하는지 "예"/"아니오"로 답하세요.`,
          prefix: '', suffix: '', accept: ['예'], placeholder: '예/아니오',
          why: `"btn-${size}"는 Size에 속한 값 뒤에 btn- 접두사를 붙인 형태라서 ButtonClass에 포함돼요.`,
          hint: 'Size에 속하는 값이라면 항상 예예요.'
        };
      }
    },
    {
      id: 'genericClasses',
      title: '제네릭 클래스',
      ready: true,
      summary: '제네릭 함수처럼, 클래스도 타입 매개변수를 받아 여러 자료형에 재사용할 수 있게 만드는 법을 배워요.',
      goals: ['class 이름<T> 문법', '제네릭 클래스의 프로퍼티/메서드에서 T 쓰기', '여러 타입으로 인스턴스 만들기'],
      blocks: [
        {
          h: '클래스도 타입 매개변수를 받을 수 있어요',
          html: `<p><code>class 이름&lt;T&gt;</code>처럼 클래스 이름 뒤에 타입 매개변수를 붙이면, 그 클래스 안에서 T를 자료형처럼 쓸 수 있어요. 인스턴스를 만들 때 T가 무엇이 될지 정해줘요.</p>`,
          code: {
            label: 'generic_class_basic.ts',
            lang: 'typescript',
            src: `class Box<T> {
  constructor(private value: T) {}
  getValue(): T {
    return this.value;
  }
}

const numberBox = new Box<number>(42);
const stringBox = new Box<string>("안녕");

console.log(numberBox.getValue(), stringBox.getValue());`,
            out: `42 안녕`
          }
        },
        {
          h: '스택(Stack) 같은 자료구조에 특히 유용해요',
          html: `<p>제네릭 클래스는 "숫자만 담는 스택", "문자열만 담는 스택"을 각각 만들 필요 없이, 하나의 <code>Stack&lt;T&gt;</code>로 어떤 자료형이든 안전하게 담을 수 있게 해줘요.</p>`,
          code: {
            label: 'generic_stack.ts',
            lang: 'typescript',
            src: `class Stack<T> {
  private items: T[] = [];
  push(item: T): void {
    this.items.push(item);
  }
  pop(): T | undefined {
    return this.items.pop();
  }
}

const numbers = new Stack<number>();
numbers.push(1);
numbers.push(2);
console.log(numbers.pop());`,
            out: `2`
          }
        }
      ],
      quizGenerators: [
        () => {
          const val = randInt(1, 100);
          return {
            type: 'blank',
            q: `<code>class Box&lt;T&gt; { constructor(private value: T) {} getValue(): T { return this.value; } }</code>이고 <code>const b = new Box&lt;number&gt;(${val});</code>일 때, <code>b.getValue()</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(val)], placeholder: '숫자',
            why: `getValue()는 생성자에서 받은 값을 그대로 반환해서 ${val}이에요.`,
            hint: 'Box는 넘긴 값을 그대로 담았다가 그대로 돌려주는 상자예요.'
          };
        },
        () => makeChoice(
          '제네릭 클래스를 쓰는 이유로 알맞은 것은?',
          '숫자용, 문자열용 클래스를 각각 만들지 않고 하나의 클래스로 여러 자료형을 안전하게 다룰 수 있어서',
          ['클래스를 상속받을 수 없게 하려고', '실행 속도를 항상 높이려고', 'private 속성을 없애려고'],
          '제네릭 클래스는 자료형이 다른 여러 경우를 하나의 클래스 정의로 재사용할 수 있게 해줘요.',
          '제네릭 함수를 쓰는 이유와 똑같은 맥락이에요.'
        ),
        () => ({
          type: 'blank',
          q: `클래스가 타입 매개변수 T를 받도록 만드는 표기를 완성하세요.`,
          prefix: 'class Box', suffix: ' { constructor(private value: T) {} }', accept: ['<T>'], placeholder: '<타입매개변수>',
          why: '<code>class 이름&lt;T&gt;</code>처럼 클래스 이름 뒤에 꺾쇠괄호로 타입 매개변수를 선언해요.',
          hint: '제네릭 함수에서 쓰던 것과 똑같은 표기예요.'
        }),
        () => makeChoice(
          'Stack<T>의 pop() 메서드가 T | undefined를 반환하는 이유는?',
          '스택이 비어있으면 꺼낼 값이 없어서 undefined가 될 수 있어서',
          ['항상 undefined만 반환해서', '제네릭은 원래 undefined를 포함해야 해서', 'pop은 push의 반대말이라서'],
          '빈 스택에서 pop()을 호출하면 꺼낼 값이 없으니 undefined가 나올 수 있어서, 반환 타입에 그 가능성을 포함해요.',
          '스택이 비어있을 때 어떤 일이 생길지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '값 하나를 담고 <code>getValue(): T</code>로 꺼낼 수 있는 제네릭 클래스 <code>Box&lt;T&gt;</code>를 작성하세요. 생성자에서 <code>value: T</code>를 받아 저장해요.',
          starter: '',
          rows: 4,
          placeholder: 'class Box<T> {\n  constructor(private value: T) {}\n  getValue(): T {\n    return this.value;\n  }\n}',
          accept: ['class Box<T> {\n  constructor(private value: T) {}\n  getValue(): T {\n    return this.value;\n  }\n}'],
          why: 'class Box<T>로 타입 매개변수를 선언하고, private value: T로 값을 저장한 뒤 getValue()로 꺼내요.',
          hint: 'class Box<T> { constructor(private value: T) {} getValue(): T { return this.value; } }를 쓰세요.'
        }),
      ],
      boss: () => {
        const items = shuffle([10, 20, 30, 40, 50]).slice(0, randInt(2, 4));
        const pushList = items.join(', ');
        return {
          type: 'blank',
          q: `Stack&lt;T&gt;에 순서대로 ${pushList}를 push한 뒤 pop()을 호출하면 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(items[items.length - 1])], placeholder: '숫자',
          why: `pop()은 가장 마지막에 push한 값을 꺼내서, ${items[items.length - 1]}이 나와요.`,
          hint: '스택은 마지막에 넣은 값이 가장 먼저 나오는 구조예요(LIFO).'
        };
      }
    },
    {
      id: 'moduleImportExport',
      title: 'ES 모듈: import/export',
      ready: true,
      summary: '코드를 여러 파일로 나누고, export로 내보내고 import로 가져와 쓰는 ES 모듈 시스템의 타입 관련 문법을 배워요.',
      goals: ['export로 내보내기(named/default)', 'import로 가져오기', 'import type으로 타입만 가져오기'],
      blocks: [
        {
          h: '값을 내보내고 가져오기: export / import',
          html: `<p>다른 파일에서 쓸 함수나 변수, 타입 앞에 <code>export</code>를 붙이면 그 파일 밖에서도 <code>import</code>로 가져와 쓸 수 있어요. 이렇게 이름을 그대로 내보내는 걸 <b>named export</b>라고 해요.</p>`,
          code: {
            label: 'named_export.ts',
            lang: 'typescript',
            src: `// math.ts
export function add(a: number, b: number): number {
  return a + b;
}
export const PI = 3.14;

// main.ts
import { add, PI } from "./math";
console.log(add(2, 3), PI);`,
            out: `5 3.14`
          }
        },
        {
          h: '파일마다 하나만 내보내는 대표 값: default export',
          html: `<p><code>export default</code>는 그 파일에서 <b>딱 하나</b>만 내보낼 수 있는 대표 값을 정할 때 써요. 가져올 때는 중괄호 없이, 원하는 이름으로 가져올 수 있어요.</p>`,
          code: {
            label: 'default_export.ts',
            lang: 'typescript',
            src: `// user.ts
export default class User {
  constructor(public name: string) {}
}

// main.ts
import User from "./user";
const u = new User("지수");
console.log(u.name);`,
            out: `지수`
          }
        },
        {
          h: '타입만 가져오기: import type',
          html: `<p>런타임에는 실제로 존재하지 않는 <b>타입만</b> 가져올 때는 <code>import type</code>을 쓰면, 빌드 결과물에서 그 import가 아예 사라져서 더 가벼워져요.</p>`,
          code: {
            label: 'import_type.ts',
            lang: 'typescript',
            src: `// types.ts
export type User = { name: string; age: number };

// main.ts
import type { User } from "./types";
const u: User = { name: "민준", age: 16 };`
          }
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `math.ts에서 <code>export function add(a: number, b: number): number { return a + b; }</code>를 내보내고, main.ts에서 <code>import { add } from "./math";</code>로 가져왔을 때, <code>add(${a}, ${b})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `${a} + ${b} = ${a + b}가 반환돼요. export/import는 어디서 쓸 수 있는지만 정할 뿐, 계산 자체는 똑같아요.`,
            hint: 'export/import는 함수를 다른 파일에서도 쓸 수 있게 해줄 뿐, 함수 내용 자체는 그대로예요.'
          };
        },
        () => makeChoice(
          '한 파일에서 여러 개를 이름 그대로 내보낼 때 쓰는 방식은?',
          'export (named export) — export function, export const 등',
          ['export default만 여러 번 쓴다', 'import만 여러 번 쓴다', '파일을 여러 개로 쪼개면 자동으로 내보내진다'],
          'named export는 export function, export const처럼 이름을 그대로 유지한 채 여러 개를 내보낼 수 있어요.',
          '"이름이 그대로 붙어서 나간다"는 의미를 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `한 파일에서 "대표로 하나만" 내보낼 때 export 뒤에 붙이는 키워드를 쓰세요.`,
          prefix: 'export ', suffix: ' class User { ... }', accept: ['default'], placeholder: '키워드',
          why: '<code>export default</code>는 그 파일의 대표 값 하나를 내보내요.',
          hint: '"기본값"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'import type을 쓰는 이유는?',
          '타입만 가져와서, 빌드 결과물에서 그 import가 사라져 더 가벼워지도록 하려고',
          ['타입을 실행 중에도 값처럼 쓰기 위해서', 'import 속도를 항상 느리게 하려고', 'default export만 가능하게 하려고'],
          '타입은 런타임에 실제로 존재하지 않기 때문에, import type으로 명시하면 빌드 시 그 import가 완전히 제거돼요.',
          '타입은 실행 중에는 사라진다는 TypeScript의 특징을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Score</code>라는 상수(number, 값 100)를 named export로 내보내는 코드를 작성하세요.',
          starter: '',
          placeholder: 'export const Score = 100;',
          accept: ['export const Score = 100;'],
          why: 'export const 이름 = 값; 형태로 값을 named export로 내보내요.',
          hint: 'export const Score = 100;를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 30), b = randInt(1, 30);
        return {
          type: 'blank',
          q: `math.ts가 <code>export function add(a: number, b: number): number { return a + b; }</code>와 <code>export function subtract(a: number, b: number): number { return a - b; }</code>를 내보내고, main.ts에서 <code>import { add, subtract } from "./math";</code>로 가져왔을 때, <code>add(${a}, ${b}) - subtract(${a}, ${b})</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String((a + b) - (a - b))], placeholder: '숫자',
          why: `add(${a}, ${b}) = ${a + b}, subtract(${a}, ${b}) = ${a - b}이고, ${a + b} - ${a - b} = ${(a + b) - (a - b)}예요.`,
          hint: '두 함수를 각각 계산한 다음, 그 결과끼리 빼보세요.'
        };
      }
    },
    {
      id: 'satisfiesOperator',
      title: 'satisfies 연산자',
      ready: true,
      summary: '값의 타입을 바꾸지 않으면서, 그 값이 특정 타입의 조건을 만족하는지만 검사해주는 satisfies 연산자를 배워요.',
      goals: ['satisfies로 타입 검사하기', 'as 단언과의 차이 이해하기', '리터럴 타입을 유지하면서 검사하는 이유'],
      blocks: [
        {
          h: '타입은 그대로, 검사만 해주세요: satisfies',
          html: `<p><code>값 satisfies 타입</code>이라고 쓰면, "이 값이 정말로 이 타입의 조건을 만족하는지" 검사만 해줘요. <code>as</code>와 달리 값의 <b>실제 추론된 타입은 바꾸지 않아요.</b></p>`,
          code: {
            label: 'satisfies_basic.ts',
            lang: 'typescript',
            src: `type Colors = "red" | "green" | "blue";

const palette = {
  primary: "red",
  secondary: "green",
} satisfies Record<string, Colors>;

console.log(palette.primary);`,
            out: `red`
          }
        },
        {
          h: '타입 표기와 뭐가 다를까요',
          html: `<p>객체에 <code>: Record&lt;string, Colors&gt;</code>처럼 직접 타입을 붙이면, <code>palette.primary</code>의 타입이 <code>Colors</code>(넓은 유니언)로 바뀌어요. 반면 <code>satisfies</code>를 쓰면 조건을 만족하는지 검사만 하고, <code>palette.primary</code>는 여전히 <code>"red"</code>라는 좁은 리터럴 타입 그대로 남아요.</p>`,
          code: {
            label: 'satisfies_vs_annotation.ts',
            lang: 'typescript',
            src: `const wrongPalette = {
  primary: "red",
  secondary: "yellow",
} satisfies Record<string, Colors>;
// 오류! "yellow"는 Colors에 없는 값`,
          },
          after: `<div class="note"><b>비유</b> — satisfies는 "이 재료가 레시피 조건에 맞는지 검사만 하고, 재료 자체의 이름표는 그대로 둔다"는 느낌이에요. as는 이름표를 아예 새로 붙여버려요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'satisfies와 as 단언의 가장 큰 차이는?',
          'satisfies는 값의 실제 타입은 그대로 두면서 조건만 검사하고, as는 타입 자체를 강제로 바꾼다',
          ['satisfies는 실행 시점에 값을 검사한다', 'as는 컴파일 오류를 절대 내지 않는다', 'satisfies는 인터페이스에서만 쓸 수 있다'],
          'satisfies는 검사만 하고 원래 추론된 좁은 타입을 유지하지만, as는 타입을 강제로 바꿔치기해요.',
          '"검사만 한다"와 "바꿔버린다"의 차이를 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `객체 리터럴이 <code>Record&lt;string, Colors&gt;</code> 조건을 만족하는지 검사하면서도, 각 속성의 리터럴 타입은 그대로 유지하고 싶을 때 쓰는 연산자를 쓰세요.`,
          prefix: '{ primary: "red" } ', suffix: ' Record<string, Colors>', accept: ['satisfies'], placeholder: '연산자',
          why: '<code>satisfies</code>는 타입 조건을 검사하면서도 원래의 좁은 리터럴 타입을 그대로 남겨줘요.',
          hint: '이 단원의 제목이기도 한 그 영단어예요.'
        }),
        () => makeChoice(
          '<code>const wrongPalette = { primary: "red", secondary: "yellow" } satisfies Record&lt;string, Colors&gt;;</code>일 때(Colors는 "red"|"green"|"blue"), 결과는?',
          '컴파일 오류가 난다 ("yellow"는 Colors에 없으므로)',
          ['정상적으로 통과한다', 'secondary가 자동으로 "green"으로 바뀐다', '실행할 때만 오류가 난다'],
          '"yellow"는 Colors 유니언에 없는 값이라서, satisfies가 검사할 때 바로 오류를 내요.',
          'Colors에 어떤 값들이 허용되는지 다시 확인해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>satisfies</code>를 쓴 뒤에도 <code>palette.primary</code>의 타입이 넓은 <code>Colors</code>가 아니라 좁은 리터럴 <code>"red"</code> 그대로 남는 이유는 satisfies가 값의 실제 타입을 (무엇)하지 않기 때문일까요? 한 단어로 쓰세요.`,
          prefix: '', suffix: '', accept: ['변경', '변경하지'], placeholder: '단어',
          why: 'satisfies는 조건을 만족하는지 검사만 할 뿐, 값의 실제 추론된 타입을 바꾸지 않아요.',
          hint: '타입 표기(: 타입)와 satisfies의 차이를 떠올려보세요.'
        }),
        () => ({
          type: 'code',
          q: '<code>type Level = "low" | "mid" | "high";</code>일 때, <code>{ score: "high" }</code> 객체가 <code>Record&lt;string, Level&gt;</code> 조건을 만족하는지 satisfies로 검사하는 코드를 작성하세요. (const config = ... 형태)',
          starter: '',
          placeholder: 'const config = { score: "high" } satisfies Record<string, Level>;',
          accept: ['const config = { score: "high" } satisfies Record<string, Level>;'],
          why: '객체 리터럴 뒤에 satisfies와 검사할 타입을 적으면 돼요.',
          hint: '{ score: "high" } satisfies Record<string, Level>; 형태로 쓰세요.'
        }),
      ],
      boss: () => {
        const color = pick(['red', 'green', 'blue']);
        return {
          type: 'blank',
          q: `<code>type Colors = "red" | "green" | "blue"; const palette = { primary: "${color}" } satisfies Record&lt;string, Colors&gt;;</code>일 때, <code>palette.primary</code>의 값은?`,
          prefix: '', suffix: '', accept: [color], placeholder: '값',
          why: `satisfies는 타입 검사만 하고 값은 그대로 두므로, palette.primary는 "${color}"예요.`,
          hint: 'satisfies는 값 자체를 바꾸지 않는다는 점을 떠올려보세요.'
        };
      }
    },
    {
      id: 'inferKeyword',
      title: '조건부 타입 안의 infer',
      ready: true,
      summary: '조건부 타입 안에서 infer 키워드로 특정 위치의 타입을 변수처럼 붙잡아, 그 타입을 꺼내 쓰는 법을 배워요.',
      goals: ['infer로 타입 캡처하기', '배열/함수에서 타입 추출하기', 'infer는 어디서만 쓸 수 있는지 알기'],
      blocks: [
        {
          h: '배열 안의 요소 타입을 꺼내기',
          html: `<p><code>T extends (infer U)[] ? U : T</code>처럼 쓰면, T가 배열이면 그 <b>요소의 타입</b>을 U라는 이름으로 붙잡아서 돌려줘요. infer는 "여기 들어갈 타입을 이 이름으로 잡아줘"라는 뜻이에요.</p>`,
          code: {
            label: 'infer_array.ts',
            lang: 'typescript',
            src: `type ElementType<T> = T extends (infer U)[] ? U : T;

type A = ElementType<string[]>; // string
type B = ElementType<number>;   // number

let x: A = "hello";
console.log(x);`,
            out: `hello`
          }
        },
        {
          h: '함수의 반환 타입 직접 추출해보기',
          html: `<p>TypeScript가 기본 제공하는 <code>ReturnType&lt;T&gt;</code>도 사실 내부에서 infer로 만들어져요. 함수 타입에서 반환 타입 자리를 infer로 붙잡으면 돼요.</p>`,
          code: {
            label: 'infer_function.ts',
            lang: 'typescript',
            src: `type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getName(): string {
  return "지수";
}

type NameType = MyReturnType<typeof getName>; // string
let result: NameType = "민준";
console.log(result);`,
            out: `민준`
          },
          after: `<div class="note"><b>주의</b> — infer는 반드시 <code>extends</code> 조건부 타입 안에서만 쓸 수 있어요. 조건 없이 <code>type X = infer U</code>처럼 단독으로는 쓸 수 없어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const kind = pick([
            { arr: 'boolean[]', el: 'boolean' },
            { arr: 'number[]', el: 'number' },
            { arr: 'string[]', el: 'string' },
          ]);
          return {
            type: 'blank',
            q: `<code>type ElementType&lt;T&gt; = T extends (infer U)[] ? U : T;</code>일 때, <code>ElementType&lt;${kind.arr}&gt;</code>의 결과 타입은?`,
            prefix: '', suffix: '', accept: [kind.el], placeholder: '타입',
            why: `${kind.arr}는 ${kind.el} 배열이므로, infer U가 ${kind.el}을 붙잡아요.`,
            hint: '배열 타입에서 대괄호 앞부분이 요소 타입이에요.'
          };
        },
        () => makeChoice(
          'infer 키워드가 하는 역할은?',
          '조건부 타입 안에서 특정 위치의 타입을 이름을 붙여 붙잡아, 참/거짓 결과 쪽에서 그 타입을 쓸 수 있게 해준다',
          ['런타임에 변수의 값을 추론해서 출력한다', '타입을 자동으로 number로 바꿔준다', 'as 단언을 대신하는 문법이다'],
          'infer는 조건부 타입의 extends 오른쪽에서 특정 타입 조각을 캡처해서, 이후 X 자리에서 그 타입을 쓸 수 있게 해줘요.',
          '"캡처해서 이름을 붙인다"는 표현이 핵심이에요.'
        ),
        () => makeChoice(
          'infer 키워드는 어디에서만 쓸 수 있나요?',
          'extends를 쓰는 조건부 타입 안에서만', ['어디서든 자유롭게 쓸 수 있다', 'interface 선언 안에서만', 'enum 선언 안에서만'],
          'infer는 반드시 T extends ... ? ... : ... 형태의 조건부 타입 안에서만 등장할 수 있어요.',
          '조건부 타입과 항상 짝을 이룬다는 점을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>type MyReturnType&lt;T&gt; = T extends (...args: any[]) =&gt; infer R ? R : never;</code>에서, infer가 캡처하는 대상은 함수의 (무엇) 타입일까요? 한 단어로 쓰세요.`,
          prefix: '', suffix: '', accept: ['반환', '반환값', '반환타입'], placeholder: '단어',
          why: '<code>=&gt; infer R</code>은 화살표 뒤, 즉 함수의 반환 타입 자리를 R로 캡처해요.',
          hint: '함수 타입에서 화살표 뒤에 오는 게 뭔지 떠올려보세요.'
        }),
        () => ({
          type: 'code',
          q: '<code>Promise&lt;T&gt;</code>에서 안에 담긴 타입을 꺼내는 조건부 타입 <code>UnwrapPromise&lt;T&gt;</code>를 infer를 사용해 작성하세요. (Promise가 아니면 T 그대로)',
          starter: '',
          placeholder: 'type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;',
          accept: ['type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;'],
          why: 'Promise<infer U> 자리에서 U가 Promise 안의 타입을 캡처해요.',
          hint: 'ElementType과 같은 구조에서, (infer U)[] 대신 Promise<infer U>를 쓰면 돼요.'
        }),
      ],
      boss: () => {
        const kind = pick([
          { arr: 'string[]', el: 'string' },
          { arr: 'boolean[]', el: 'boolean' },
        ]);
        return {
          type: 'blank',
          q: `<code>type ElementType&lt;T&gt; = T extends (infer U)[] ? U : T;</code>일 때, <code>ElementType&lt;${kind.arr}&gt;</code>의 결과 타입은?`,
          prefix: '', suffix: '', accept: [kind.el], placeholder: '타입',
          why: `${kind.arr}의 요소 타입은 ${kind.el}이라서, infer U가 ${kind.el}을 캡처해요.`,
          hint: '배열 타입의 대괄호 앞부분을 보세요.'
        };
      }
    },
    {
      id: 'variadicTuples',
      title: '가변 개수 튜플(Variadic Tuple Types)',
      ready: true,
      summary: '튜플 안에서도 스프레드(...)를 써서, "고정된 부분 + 나머지"를 표현하는 가변 개수 튜플 타입을 배워요.',
      goals: ['튜플 안에서 ... 스프레드 쓰기', '두 튜플을 이어붙이는 타입 만들기', '함수 매개변수 표현에 활용되는 이유'],
      blocks: [
        {
          h: '튜플 안에 다른 튜플 펼쳐 넣기',
          html: `<p>값의 스프레드(<code>...</code>)처럼, 튜플 타입 안에서도 <code>...다른튜플타입</code>으로 그 튜플의 항목들을 그대로 펼쳐 넣을 수 있어요.</p>`,
          code: {
            label: 'variadic_basic.ts',
            lang: 'typescript',
            src: `type Point = [number, number];
type Labeled = [string, ...Point];

const p: Labeled = ["원점", 0, 0];
console.log(p[0], p[1], p[2]);`,
            out: `원점 0 0`
          }
        },
        {
          h: '제네릭과 함께 쓰면: 두 튜플 이어붙이기',
          html: `<p>제네릭 매개변수에 <code>...T</code>와 <code>...U</code>를 함께 펼치면, 어떤 튜플이 들어오든 그 둘을 이어붙인 튜플 타입을 만들 수 있어요.</p>`,
          code: {
            label: 'variadic_concat.ts',
            lang: 'typescript',
            src: `type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

type Result = Concat<[string, number], [boolean]>;
// [string, number, boolean]

const r: Result = ["나이", 17, true];
console.log(r.length);`,
            out: `3`
          },
          after: `<div class="note"><b>어디에 쓰일까요</b> — 함수의 매개변수 목록도 사실 튜플이에요. 그래서 variadic tuple은 "앞의 몇 개는 고정, 나머지는 자유"인 함수 타입(예: bind, 커링 함수)을 정확히 표현하는 데 자주 쓰여요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `튜플 타입 <code>[string, ...Point]</code>에서, 다른 튜플 타입을 그대로 펼쳐 넣을 때 쓰는 기호 세 글자를 쓰세요.`,
          prefix: '[string, ', suffix: 'Point]', accept: ['...'], placeholder: '기호',
          why: '<code>...</code>(스프레드)는 값뿐 아니라 튜플 타입 안에서도 다른 타입을 펼쳐 넣을 때 써요.',
          hint: '값의 스프레드 문법과 똑같은 기호예요.'
        }),
        () => makeChoice(
          'variadic tuple type(가변 개수 튜플)이 실무에서 유용한 경우는?',
          '"앞의 몇 개는 고정, 나머지는 자유"인 함수 매개변수 목록을 정확한 타입으로 표현할 때',
          ['배열의 실행 속도를 높일 때', 'CSS 애니메이션 길이를 정할 때', '항상 배열을 정렬할 때'],
          '함수 매개변수도 결국 튜플이라서, 일부는 고정하고 나머지는 유연하게 받는 함수 타입을 정확히 표현하는 데 자주 쓰여요.',
          '함수 매개변수 목록이 바로 튜플이라는 점을 떠올려보세요.'
        ),
        () => {
          const t1len = randInt(1, 3), t2len = randInt(1, 3);
          return {
            type: 'blank',
            q: `<code>type Concat&lt;T extends unknown[], U extends unknown[]&gt; = [...T, ...U];</code>일 때, 길이가 ${t1len}인 튜플과 길이가 ${t2len}인 튜플을 Concat하면 결과 튜플의 길이는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(t1len + t2len)], placeholder: '숫자',
            why: `두 튜플을 이어붙이므로 ${t1len} + ${t2len} = ${t1len + t2len}이에요.`,
            hint: '두 튜플의 길이를 그냥 더하면 돼요.'
          };
        },
        () => makeChoice(
          '<code>type Labeled = [string, ...Point];</code>에서 Point가 <code>[number, number]</code>라면, Labeled 튜플의 전체 길이는?',
          '3', ['1', '2', '4'],
          'string 하나 + Point의 요소 2개(number, number)를 합쳐 총 3개예요.',
          'string 1개와 Point의 요소 개수를 더해보세요.'
        ),
        () => ({
          type: 'code',
          q: '문자열 하나와 그 뒤로 숫자를 몇 개든 받을 수 있는 튜플 타입 <code>Scored</code>를 작성하세요. (예: ["지수", 90, 85, 100]처럼 쓸 수 있어야 해요)',
          starter: '',
          placeholder: 'type Scored = [string, ...number[]];',
          accept: ['type Scored = [string, ...number[]];'],
          why: '<code>...number[]</code>는 "숫자를 0개 이상 자유롭게"라는 뜻이에요.',
          hint: '[string, ...number[]] 형태로 쓰세요.'
        }),
      ],
      boss: () => {
        const t1len = randInt(1, 4), t2len = randInt(1, 4);
        return {
          type: 'blank',
          q: `<code>type Concat&lt;T extends unknown[], U extends unknown[]&gt; = [...T, ...U];</code>이고, 길이가 ${t1len}인 튜플과 길이가 ${t2len}인 튜플을 Concat한 결과 튜플의 길이는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(t1len + t2len)], placeholder: '숫자',
          why: `${t1len} + ${t2len} = ${t1len + t2len}이에요.`,
          hint: '두 튜플 길이를 더하면 돼요.'
        };
      }
    },
    {
      id: 'moduleAugmentation',
      title: '모듈 보강(Module Augmentation)',
      ready: true,
      summary: '이미 존재하는 인터페이스나 전역 타입에, 원본 코드를 고치지 않고 속성을 추가하는 모듈 보강을 배워요.',
      goals: ['declare global로 전역 타입 확장하기', '선언 병합(declaration merging) 이해하기', '왜 원본을 고치지 않는지 알기'],
      blocks: [
        {
          h: '이미 있는 타입에 속성 추가하기',
          html: `<p>같은 이름의 <code>interface</code>를 여러 번 선언하면, TypeScript는 이걸 오류로 보지 않고 <b>하나로 합쳐줘요(선언 병합)</b>. 이 성질을 이용해서, 전역 타입이나 외부 라이브러리의 타입에 내가 필요한 속성을 "끼워 넣을" 수 있어요.</p>`,
          code: {
            label: 'augment_global.ts',
            lang: 'typescript',
            src: `declare global {
  interface String {
    shout(): string;
  }
}

String.prototype.shout = function (this: string) {
  return this.toUpperCase() + "!!!";
};

console.log("hello".shout());`,
            out: `HELLO!!!`
          }
        },
        {
          h: '외부 모듈의 타입 보강하기',
          html: `<p>내가 만들지 않은 라이브러리의 타입에 속성을 추가하고 싶을 때는, <code>declare module "모듈이름"</code> 블록 안에 추가할 속성을 적어요. 라이브러리의 원본 코드는 전혀 건드리지 않아요.</p>`,
          code: {
            label: 'augment_module.ts',
            lang: 'typescript',
            src: `// express-augment.d.ts 같은 파일에서
declare module "express" {
  interface Request {
    userId?: string;
  }
}
// 이후 어디서든 Request 타입에 userId 속성이 존재하는 것처럼 인식됨`,
          },
          after: `<div class="note"><b>왜 유용할까요</b> — 라이브러리의 node_modules 코드를 직접 고치면 업데이트할 때마다 사라져요. 모듈 보강은 원본은 그대로 두고, 내 프로젝트 쪽에서 타입만 안전하게 확장하는 방법이에요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `외부 모듈 "express"의 <code>Request</code> 인터페이스에 <code>userId</code> 속성을 추가하고 싶을 때, declare 뒤에 오는 키워드를 쓰세요. (예: declare ___ "express" { ... })`,
          prefix: 'declare ', suffix: ' "express" { interface Request { userId?: string; } }', accept: ['module'], placeholder: '키워드',
          why: '<code>declare module "모듈이름"</code>으로 이미 있는 모듈의 타입을 확장할 수 있어요.',
          hint: '"모듈을 선언한다"는 뜻의 영단어예요.'
        }),
        () => makeChoice(
          '같은 이름의 interface를 여러 파일에서 선언하면 TypeScript는 어떻게 처리하나요?',
          '오류를 내지 않고, 두 선언의 속성을 하나로 합친다(선언 병합)',
          ['나중에 선언한 쪽으로 완전히 덮어쓴다', '항상 컴파일 오류를 낸다', '먼저 선언한 쪽만 유효하다'],
          'TypeScript는 같은 이름의 interface 선언들을 자동으로 합쳐주는 선언 병합(declaration merging) 기능이 있어요.',
          '"병합"이라는 단어가 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `전역(global) 스코프의 타입(예: 내장 String)에 속성을 추가하고 싶을 때, declare 뒤에 쓰는 키워드를 쓰세요.`,
          prefix: 'declare ', suffix: ' { interface String { shout(): string; } }', accept: ['global'], placeholder: '키워드',
          why: '<code>declare global</code>은 전역 스코프의 타입을 확장할 때 써요.',
          hint: '"전역"을 뜻하는 영단어예요.'
        }),
        () => makeChoice(
          '모듈 보강(module augmentation)을 쓰는 가장 큰 이유는?',
          '라이브러리의 원본 코드를 고치지 않고도, 필요한 타입 속성을 안전하게 추가할 수 있어서',
          ['실행 속도를 더 빠르게 만들기 위해서', '타입 검사를 완전히 꺼버리기 위해서', 'JavaScript 코드를 자동 생성하기 위해서'],
          'node_modules의 원본 코드를 직접 고치면 업데이트 시 사라지지만, 모듈 보강은 내 프로젝트에서 안전하게 타입만 확장해요.',
          '원본을 "고치지 않는다"는 점이 핵심이에요.'
        ),
        () => ({
          type: 'code',
          q: '전역 <code>Array</code> 인터페이스에 <code>number</code>를 반환하는 <code>sum()</code> 메서드를 추가하는 모듈 보강 코드를 <code>declare global</code>로 작성하세요.',
          starter: '',
          placeholder: 'declare global {\n  interface Array<T> {\n    sum(): number;\n  }\n}',
          accept: ['declare global {\n  interface Array<T> {\n    sum(): number;\n  }\n}'],
          why: 'declare global 블록 안에 interface Array<T>를 다시 선언하면서 sum() 메서드를 추가해요.',
          hint: 'declare global { interface Array<T> { sum(): number; } }를 쓰세요.'
        }),
      ],
      boss: () => {
        const word = pick(['hello', 'world', 'code']);
        return {
          type: 'blank',
          q: `<code>declare global { interface String { shout(): string; } } String.prototype.shout = function (this: string) { return this.toUpperCase() + "!!!"; };</code>일 때, <code>"${word}".shout()</code>의 결과는?`,
          prefix: '', suffix: '', accept: [`${word.toUpperCase()}!!!`], placeholder: '값',
          why: `"${word}"를 대문자로 바꾸고 "!!!"를 붙이면 "${word.toUpperCase()}!!!"가 돼요.`,
          hint: 'toUpperCase()로 대문자로 바꾼 뒤 "!!!"를 이어붙여보세요.'
        };
      }
    },
    {
      id: 'enumVsUnion',
      title: 'enum vs 유니언 타입, 무엇을 쓸까',
      ready: true,
      summary: '상태 값을 표현할 때 enum과 문자열 리터럴 유니언 중 무엇을 고를지, 각각의 장단점을 비교해요.',
      goals: ['enum이 컴파일 후 남기는 것 이해하기', '리터럴 유니언의 가벼움 이해하기', '상황에 맞는 선택 기준 세우기'],
      blocks: [
        {
          h: '같은 걸 표현하는 두 가지 방법',
          html: `<p>"활성/비활성/대기중" 같은 상태는 <code>enum</code>으로도, 문자열 리터럴의 <code>유니언 타입</code>으로도 표현할 수 있어요. 둘 다 "정해진 값 중 하나"라는 점은 같아요.</p>`,
          code: {
            label: 'enum_vs_union.ts',
            lang: 'typescript',
            src: `enum StatusEnum {
  Active,
  Inactive,
  Pending,
}

type StatusUnion = "active" | "inactive" | "pending";

let s1: StatusEnum = StatusEnum.Active;
let s2: StatusUnion = "active";

console.log(s1, s2);`,
            out: `0 active`
          }
        },
        {
          h: '컴파일 후에 남는 것이 다르다',
          html: `<p><code>enum</code>은 컴파일되면 실제 JavaScript 객체(런타임 코드)로 남아서 번들 크기가 늘어나요. 반면 리터럴 유니언(<code>"active" | "inactive"</code>)은 <b>타입 전용</b>이라서 컴파일 후 완전히 사라지고, 값 자체는 이미 사람이 읽기 쉬운 문자열이에요.</p>`
        },
        {
          h: '그럼 언제 뭘 쓸까요',
          html: `<p>가볍고 문자열 그대로 로그·JSON에 쓰고 싶다면 <b>리터럴 유니언</b>이 유리해요. 값들을 하나의 이름 아래 묶어 관리하거나(예: <code>StatusEnum.Active</code>처럼 자동완성 그룹핑), 역방향 매핑(숫자→이름)이 필요하면 <b>enum</b>이 유리할 수 있어요.</p>`,
          after: `<div class="note"><b>실무 팁</b> — 최근 TypeScript 프로젝트에서는 번들 크기와 직렬화 편의성 때문에 리터럴 유니언을 더 선호하는 경향이 있어요. enum은 팀 컨벤션에 따라 선택하면 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '컴파일 후 실제 JavaScript 코드(객체)로 남는 것은?',
          'enum', ['문자열 리터럴 유니언 타입', '둘 다 남지 않는다', '둘 다 남는다'],
          'enum은 실제 런타임 객체로 컴파일되지만, 리터럴 유니언은 타입 전용이라 컴파일 후 사라져요.',
          '"런타임에 존재하는가"를 기준으로 생각해보세요.'
        ),
        () => makeChoice(
          '문자열 리터럴 유니언 타입(<code>"active" | "inactive"</code>)의 장점은?',
          '컴파일 후 완전히 사라져 번들이 가볍고, 값 자체가 이미 읽기 쉬운 문자열이다',
          ['항상 숫자로 자동 변환된다', 'IDE 자동완성을 지원하지 않는다', '역방향 매핑을 자동으로 지원한다'],
          '리터럴 유니언은 타입 전용이라 번들에 영향을 안 주고, 값 자체가 사람이 읽기 쉬운 문자열이에요.',
          '"타입 전용"이라는 표현을 떠올려보세요.'
        ),
        () => {
          const idx = randInt(0, 2);
          const names = ['Active', 'Inactive', 'Pending'];
          return {
            type: 'blank',
            q: `<code>enum StatusEnum { Active, Inactive, Pending }</code>일 때, <code>StatusEnum.${names[idx]}</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(idx)], placeholder: '숫자',
            why: `enum은 기본적으로 0부터 순서대로 번호가 매겨져서, ${names[idx]}는 ${idx}예요.`,
            hint: 'Active가 0부터 시작해서 순서대로 번호가 붙어요.'
          };
        },
        () => makeChoice(
          '여러 상태 값을 JSON으로 그대로 저장하거나 로그로 남기기 편한 쪽은?',
          '문자열 리터럴 유니언 ("active" 같은 값 자체를 쓰므로)',
          ['enum (항상 숫자만 저장되므로 더 편하다)', '값 저장 방식에 차이가 없다', 'enum과 유니언 모두 JSON으로 저장할 수 없다'],
          '리터럴 유니언은 값 자체가 "active" 같은 읽기 쉬운 문자열이라, JSON이나 로그에 그대로 남기기 편해요.',
          '숫자보다 문자열이 사람이 읽기에 더 명확하다는 점을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '"pending", "shipped", "delivered" 세 가지 값 중 하나를 가지는 문자열 리터럴 유니언 타입 <code>OrderStatus</code>를 작성하세요.',
          starter: '',
          placeholder: 'type OrderStatus = "pending" | "shipped" | "delivered";',
          accept: ['type OrderStatus = "pending" | "shipped" | "delivered";'],
          why: '문자열 리터럴들을 |로 연결하면 리터럴 유니언 타입이 돼요.',
          hint: 'type OrderStatus = "pending" | "shipped" | "delivered"; 를 쓰세요.'
        }),
      ],
      boss: () => {
        const idx = randInt(0, 2);
        const names = ['Active', 'Inactive', 'Pending'];
        return {
          type: 'blank',
          q: `<code>enum StatusEnum { Active, Inactive, Pending }</code>일 때, <code>StatusEnum.${names[idx]}</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(idx)], placeholder: '숫자',
          why: `0번부터 순서대로 번호가 매겨지므로 ${names[idx]}는 ${idx}예요.`,
          hint: '배열 인덱스처럼 0부터 순서를 세어보세요.'
        };
      }
    },
    {
      id: 'abstractConstructorTypes',
      title: '추상 생성자 타입(Abstract Constructor Types)',
      ready: true,
      summary: '"new로 직접 만들 수는 없지만, 자식 클래스의 생성자여야 한다"는 조건을 표현하는 추상 생성자 타입을 배워요.',
      goals: ['abstract new () => T 문법 이해하기', '일반 생성자 타입과의 차이', '팩토리 함수에 활용하기'],
      blocks: [
        {
          h: '생성자를 매개변수로 받는 함수',
          html: `<p>클래스 자체(생성자 함수)를 매개변수로 받아서 <code>new</code>로 인스턴스를 만들어주는 함수를 만들 수 있어요. 이때 매개변수 타입은 <code>new () =&gt; T</code> 형태로 적어요.</p>`,
          code: {
            label: 'ctor_basic.ts',
            lang: 'typescript',
            src: `class Dog {
  speak(): string {
    return "멍멍";
  }
}

function createInstance<T>(Ctor: new () => T): T {
  return new Ctor();
}

const d = createInstance(Dog);
console.log(d.speak());`,
            out: `멍멍`
          }
        },
        {
          h: 'abstract 클래스는 new로 못 만든다',
          html: `<p><code>abstract class</code>는 직접 <code>new</code>로 인스턴스를 만들 수 없어요. 그래서 <code>new () =&gt; T</code> 타입에는 추상 클래스를 넘길 수 없고, 이때는 <code>abstract new () =&gt; T</code>라는 <b>추상 생성자 타입</b>을 써야 해요.</p>`,
          code: {
            label: 'ctor_abstract.ts',
            lang: 'typescript',
            src: `abstract class Animal {
  abstract speak(): string;
}

class Cat extends Animal {
  speak(): string {
    return "야옹";
  }
}

function describe<T extends Animal>(Ctor: abstract new () => T): string {
  return Ctor.name;
}

console.log(describe(Cat));`,
            out: `Cat`
          },
          after: `<div class="note"><b>왜 유용할까요</b> — describe 함수는 인스턴스를 직접 만들지 않고 클래스 이름만 확인하니까, 추상 클래스 자체(Animal)도 넘길 수 있어요. 이렇게 "new로 만들 수 있는지"를 타입으로 구분해두면, 실수로 추상 클래스를 new하려는 코드를 미리 막을 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `클래스 자체를 매개변수로 받아 <code>new</code>로 인스턴스를 만들 수 있다는 걸 나타내는 타입 표기를 완성하세요. (T는 결과 타입)`,
          prefix: 'function createInstance<T>(Ctor: ', suffix: '): T { return new Ctor(); }', accept: ['new () => T'], placeholder: '타입',
          why: '<code>new () =&gt; T</code>는 "매개변수 없이 new로 호출하면 T를 만들어내는 생성자"라는 뜻이에요.',
          hint: '일반 함수 타입 앞에 new 키워드를 붙이면 돼요.'
        }),
        () => makeChoice(
          'abstract class를 new () => T 타입의 매개변수로 넘기려고 하면 어떻게 되나요?',
          '컴파일 오류가 난다 (추상 클래스는 직접 new로 만들 수 없으므로)',
          ['정상적으로 인스턴스가 만들어진다', '자동으로 일반 클래스로 바뀐다', '항상 undefined가 반환된다'],
          'abstract class는 new로 직접 인스턴스를 만들 수 없기 때문에, 일반 생성자 타입(new () => T)에는 맞지 않아요.',
          'abstract class의 가장 큰 특징이 뭐였는지 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `추상 클래스도 받을 수 있는 생성자 타입을 만들려면, <code>new () =&gt; T</code> 앞에 어떤 키워드를 붙여야 할까요?`,
          prefix: 'Ctor: ', suffix: ' new () => T', accept: ['abstract'], placeholder: '키워드',
          why: '<code>abstract new () =&gt; T</code>는 "new로 직접 만들 수는 없지만, 그런 생성자여야 한다"는 뜻이에요.',
          hint: 'abstract class를 선언할 때 쓰는 그 키워드예요.'
        }),
        () => makeChoice(
          '추상 생성자 타입(abstract new () => T)을 쓰는 이유는?',
          '실제로 new하지 않고 클래스 자체(정적 속성 등)만 다루는 함수에서, 추상 클래스도 인자로 받을 수 있게 하려고',
          ['모든 클래스를 abstract로 강제하려고', '함수 실행 속도를 높이려고', 'new 키워드 사용을 아예 막으려고'],
          'describe 같은 함수는 인스턴스를 만들지 않으니, 추상 클래스까지 포함해서 더 넓은 범위의 클래스를 받을 수 있어요.',
          '함수 안에서 실제로 new를 호출하는지 안 하는지를 살펴보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>abstract class Shape { abstract area(): number; }</code>를 상속하는 어떤 클래스든 받아서, 그 클래스의 이름(<code>.name</code>)을 반환하는 함수 <code>getClassName&lt;T extends Shape&gt;(Ctor: abstract new () =&gt; T): string</code>을 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'function getClassName<T extends Shape>(Ctor: abstract new () => T): string {\n  return Ctor.name;\n}',
          accept: ['function getClassName<T extends Shape>(Ctor: abstract new () => T): string {\n  return Ctor.name;\n}'],
          why: 'abstract new () => T 타입의 매개변수를 받아 Ctor.name을 반환하면 돼요.',
          hint: 'function getClassName<T extends Shape>(Ctor: abstract new () => T): string { return Ctor.name; }를 쓰세요.'
        }),
      ],
      boss: () => {
        const name = pick(['Cat', 'Bird', 'Fish']);
        return {
          type: 'blank',
          q: `<code>function describe&lt;T extends Animal&gt;(Ctor: abstract new () =&gt; T): string { return Ctor.name; }</code>일 때, <code>class ${name} extends Animal { speak() { return ""; } }</code>를 <code>describe(${name})</code>로 호출한 결과는?`,
          prefix: '', suffix: '', accept: [name], placeholder: '값',
          why: `describe는 클래스의 이름(.name)을 그대로 반환하므로, "${name}"이 나와요.`,
          hint: '클래스의 .name 속성은 그 클래스 이름 그대로예요.'
        };
      }
    },
    {
      id: 'overloadResolution',
      title: '함수 오버로드의 해석 순서',
      ready: true,
      summary: '여러 오버로드 시그니처가 있을 때, TypeScript가 위에서부터 순서대로 맞는 것을 찾는다는 해석 규칙을 배워요.',
      goals: ['오버로드 시그니처를 위에서부터 검사하는 원리', '순서가 잘못되면 생기는 문제', '구현 시그니처는 호출자에게 안 보인다는 점'],
      blocks: [
        {
          h: '위에서부터 순서대로 검사해요',
          html: `<p>오버로드 시그니처가 여러 개 있으면, TypeScript는 함수를 호출할 때 <b>위에서부터 순서대로</b> 맞는 시그니처를 찾다가, 가장 먼저 맞는 것을 사용해요.</p>`,
          code: {
            label: 'overload_order.ts',
            lang: 'typescript',
            src: `function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value.trim();
}

console.log(format(3.5));
console.log(format("  hi  "));`,
            out: `3.50\nhi`
          }
        },
        {
          h: '순서가 잘못되면 생기는 문제',
          html: `<p>더 넓은 타입을 받는 시그니처를 위에 두면, 그 아래 있는 더 좁은 시그니처는 <b>영원히 선택될 기회를 잃어요</b>. 그래서 오버로드는 항상 <b>좁고 구체적인 시그니처를 위에</b>, 넓은 시그니처를 아래에 둬야 해요.</p>`,
          code: {
            label: 'overload_wrong_order.ts',
            lang: 'typescript',
            src: `function pick(value: string | number): string; // 너무 넓은 게 맨 위
function pick(value: string): string;           // 이 줄은 절대 선택되지 못함
function pick(value: string | number): string {
  return String(value);
}`,
          },
          after: `<div class="note"><b>주의</b> — 실제로 호출하는 쪽에서는 마지막의 구현 시그니처(<code>value: string | number</code>)가 보이지 않아요. 호출자는 오직 위쪽의 오버로드 시그니처들만 보고 어떤 형태로 호출할 수 있는지 판단해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '여러 오버로드 시그니처가 있을 때, TypeScript는 어떤 순서로 맞는 시그니처를 찾나요?',
          '위에서부터 순서대로 검사해서 가장 먼저 맞는 것을 쓴다',
          ['아래에서부터 순서대로 검사한다', '가장 구체적인 것을 자동으로 찾아준다(순서 무관)', '무작위로 하나를 고른다'],
          'TypeScript는 오버로드 시그니처를 위에서부터 순서대로 검사해서, 가장 먼저 맞는 것을 선택해요.',
          '"위에서부터"라는 표현이 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>function format(value: string): string; function format(value: number): string; function format(value: string | number): string { ... }</code>에서, 호출하는 쪽에 실제로 보이는 시그니처는 몇 개인가요? (구현 시그니처 제외) 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: ['2'], placeholder: '숫자',
          why: '오버로드 시그니처 2개(string 버전, number 버전)만 호출자에게 보이고, 마지막 구현 시그니처는 보이지 않아요.',
          hint: '맨 아래 실제 구현부는 호출자에게 안 보인다는 점을 떠올려보세요.'
        }),
        () => makeChoice(
          '넓은 타입(string | number)을 받는 오버로드 시그니처를 맨 위에 두면 생기는 문제는?',
          '그 아래 있는 더 좁은 시그니처들이 영원히 선택되지 못한다',
          ['컴파일 오류가 즉시 발생한다', '더 좁은 시그니처가 먼저 선택된다', '아무 문제도 생기지 않는다'],
          '넓은 시그니처가 위에 있으면 그보다 좁은 타입의 호출도 먼저 매칭돼버려서, 아래 시그니처들은 쓰일 기회가 없어요.',
          '위에서부터 순서대로 검사한다는 규칙을 다시 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `오버로드 시그니처를 쓸 때, 좁고 구체적인 시그니처와 넓은 시그니처 중 어느 것을 위쪽에 둬야 할까요? (좁은/넓은 중 하나로 답하세요)`,
          prefix: '', suffix: '', accept: ['좁은'], placeholder: '단어',
          why: '좁고 구체적인 시그니처를 위에 둬야, 그 아래 넓은 시그니처에 가려지지 않고 제대로 선택돼요.',
          hint: '더 구체적인 것이 먼저 검사돼야 기회를 놓치지 않아요.'
        }),
        () => ({
          type: 'code',
          q: '<code>combine</code> 함수에 오버로드 시그니처 두 개를 작성하세요: 매개변수가 둘 다 <code>string</code>이면 반환도 <code>string</code>, 둘 다 <code>number</code>이면 반환도 <code>number</code>. 구현부는 작성하지 않고 시그니처 두 줄만 쓰세요.',
          starter: '',
          rows: 2,
          placeholder: 'function combine(a: string, b: string): string;\nfunction combine(a: number, b: number): number;',
          accept: ['function combine(a: string, b: string): string;\nfunction combine(a: number, b: number): number;'],
          why: '각 타입 조합마다 오버로드 시그니처를 하나씩 적어요.',
          hint: 'function combine(a: string, b: string): string;\nfunction combine(a: number, b: number): number; 를 쓰세요.'
        }),
      ],
      boss: () => {
        const useNumber = Math.random() < 0.5;
        const val = useNumber ? randInt(1, 9) + 0.5 : '  hi  ';
        return {
          type: 'blank',
          q: `<code>function format(value: string): string; function format(value: number): string; function format(value: string | number): string { if (typeof value === "number") return value.toFixed(2); return value.trim(); }</code>일 때, <code>format(${useNumber ? val : `"${val}"`})</code>의 결과는? (그대로 입력)`,
          prefix: '', suffix: '', accept: [useNumber ? val.toFixed(2) : val.trim()], placeholder: '값',
          why: useNumber ? `숫자이므로 toFixed(2)가 적용되어 "${val.toFixed(2)}"가 돼요.` : `문자열이므로 trim()이 적용되어 "${val.trim()}"이 돼요.`,
          hint: '값이 숫자인지 문자열인지에 따라 다른 처리가 일어나요.'
        };
      }
    },
    {
      id: 'assertionFunctions',
      title: '단언 함수(Assertion Functions)',
      ready: true,
      summary: 'asserts 키워드로, "이 함수를 통과하면 그 값은 반드시 이런 조건을 만족한다"고 TS에게 알려주는 단언 함수를 배워요.',
      goals: ['asserts condition 문법 이해하기', 'asserts value is Type 문법 이해하기', '타입 가드(is)와의 차이'],
      blocks: [
        {
          h: '조건이 참임을 단언하기: asserts condition',
          html: `<p>함수가 <code>asserts 조건</code>을 반환 타입으로 가지면, "이 함수가 정상적으로 리턴되면(오류를 던지지 않으면) 그 조건은 반드시 참"이라고 TS에게 알려줘요.</p>`,
          code: {
            label: 'assert_condition.ts',
            lang: 'typescript',
            src: `function assertIsPositive(value: number): asserts value is number {
  if (value <= 0) {
    throw new Error("양수가 아니에요");
  }
}

function process(n: number) {
  assertIsPositive(n);
  console.log(Math.sqrt(n));
}

process(16);`,
            out: `4`
          }
        },
        {
          h: '타입 가드(is)와 뭐가 다를까요',
          html: `<p>타입 가드 함수(<code>x is Type</code>)는 <code>if</code> 조건으로 써야 타입이 좁혀지지만, 단언 함수(<code>asserts x is Type</code>)는 <b>호출하는 순간 그 아래 코드 전체에서</b> 타입이 좁혀져요. 조건을 만족 못 하면 예외를 던지는 방식이에요.</p>`,
          code: {
            label: 'assert_value.ts',
            lang: 'typescript',
            src: `function assertIsString(value: unknown): asserts value is string {
  if (typeof value !== "string") {
    throw new Error("문자열이 아니에요");
  }
}

function greet(value: unknown) {
  assertIsString(value);
  console.log(value.toUpperCase()); // 여기서부터 value는 string
}

greet("hello");`,
            out: `HELLO`
          },
          after: `<div class="note"><b>비유</b> — 타입 가드가 "이 문 너머는 안전한지 미리 확인하는 검문소"라면, 단언 함수는 "조건이 안 맞으면 그 자리에서 바로 통행을 막아버리는(예외를 던지는) 검문소"예요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `함수가 "정상적으로 리턴되면 value는 반드시 string"이라는 걸 나타내는 반환 타입 표기를 완성하세요.`,
          prefix: 'function assertIsString(value: unknown): ', suffix: ' { ... }', accept: ['asserts value is string'], placeholder: '반환 타입',
          why: '<code>asserts value is string</code>은 "이 함수가 정상 종료되면 value는 string"이라는 뜻이에요.',
          hint: 'asserts 뒤에 매개변수 이름, is, 타입 순서로 쓰세요.'
        }),
        () => makeChoice(
          '단언 함수(asserts)와 일반 타입 가드(is)의 가장 큰 차이는?',
          '단언 함수는 호출하는 순간 그 아래 코드 전체에서 타입이 좁혀지지만, 타입 가드는 if 블록 안에서만 좁혀진다',
          ['단언 함수는 항상 boolean을 반환한다', '타입 가드는 예외를 던질 수 없다', '차이가 전혀 없다'],
          '타입 가드는 if로 감싸야 그 블록 안에서만 좁혀지지만, 단언 함수는 호출 이후 코드 전체에 적용돼요.',
          '"if 없이도 적용된다"는 점이 단언 함수의 특징이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>function assertIsPositive(value: number): asserts value is number { if (value &lt;= 0) throw new Error(""); }</code>에서, 조건을 만족하지 못하면 함수가 하는 일은? (한 단어: 예외/오류를 어떻게 하나요)`,
          prefix: '', suffix: '', accept: ['던진다', '던짐', 'throw'], placeholder: '단어',
          why: '조건이 거짓이면 예외를 던져서(throw), 그 뒤 코드가 실행되지 않게 막아요.',
          hint: '코드에 있는 throw new Error(...) 부분을 보세요.'
        }),
        () => makeChoice(
          '단언 함수를 호출한 뒤 예외 없이 다음 줄로 넘어갔다면, TypeScript는 무엇을 보장받았다고 판단하나요?',
          '단언한 조건이 참이라는 것', ['함수가 항상 빠르게 실행됐다는 것', '메모리 누수가 없다는 것', '아무것도 보장받지 않는다'],
          '단언 함수가 예외 없이 정상 종료됐다는 건, asserts 뒤에 적은 조건이 참이라는 뜻이에요.',
          '"asserts"라는 단어 자체가 "단언한다"는 뜻이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>value</code>가 <code>null</code>이거나 <code>undefined</code>이면 오류를 던지고, 아니면 그냥 통과하는 단언 함수 <code>assertIsDefined&lt;T&gt;(value: T): asserts value is NonNullable&lt;T&gt;</code>를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {\n  if (value === null || value === undefined) {\n    throw new Error("값이 없어요");\n  }\n}',
          accept: ['function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {\n  if (value === null || value === undefined) {\n    throw new Error("값이 없어요");\n  }\n}'],
          why: 'null이나 undefined일 때 예외를 던지고, 반환 타입에 asserts value is NonNullable<T>를 적어요.',
          hint: 'if (value === null || value === undefined) { throw new Error(...); } 형태로 작성하세요.'
        }),
      ],
      boss: () => {
        const n = randInt(1, 10);
        const square = n * n;
        return {
          type: 'blank',
          q: `<code>function assertIsPositive(value: number): asserts value is number { if (value &lt;= 0) throw new Error(""); } function square(n: number) { assertIsPositive(n); return n * n; }</code>일 때, <code>square(${n})</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(square)], placeholder: '숫자',
          why: `${n}은 양수라서 단언을 통과하고, ${n} * ${n} = ${square}가 반환돼요.`,
          hint: 'assertIsPositive는 양수일 때만 통과시키고, 그 다음 n * n을 계산해요.'
        };
      }
    },
    {
      id: 'genericDefaults',
      title: '제네릭 기본 타입 매개변수',
      ready: true,
      summary: '제네릭 타입 매개변수에 기본값을 지정해서, 타입 인자를 생략해도 되는 제네릭을 만드는 법을 배워요.',
      goals: ['<T = 기본타입> 문법 이해하기', '기본값이 적용되는 시점', '여러 타입 매개변수와 기본값 함께 쓰기'],
      blocks: [
        {
          h: '타입 인자를 생략할 수 있게 하기',
          html: `<p>함수 매개변수에 기본값을 줄 수 있듯, 제네릭 타입 매개변수에도 <code>&lt;T = 기본타입&gt;</code>처럼 기본값을 줄 수 있어요. 타입 인자를 생략하면 이 기본값이 쓰여요.</p>`,
          code: {
            label: 'generic_default_basic.ts',
            lang: 'typescript',
            src: `interface Box<T = string> {
  value: T;
}

const b1: Box = { value: "안녕" };        // T는 기본값 string
const b2: Box<number> = { value: 42 };  // T는 명시적으로 number

console.log(b1.value, b2.value);`,
            out: `안녕 42`
          }
        },
        {
          h: '여러 타입 매개변수와 함께 쓰기',
          html: `<p>타입 매개변수가 여러 개일 때도, 뒤쪽 매개변수에 기본값을 주면 자주 쓰는 조합을 더 짧게 쓸 수 있어요.</p>`,
          code: {
            label: 'generic_default_multi.ts',
            lang: 'typescript',
            src: `interface ApiResponse<T, E = string> {
  data: T;
  error?: E;
}

const res: ApiResponse<number> = { data: 100 }; // E는 기본값 string
console.log(res.data);`,
            out: `100`
          },
          after: `<div class="note"><b>주의</b> — 함수 매개변수 기본값처럼, 기본값이 있는 타입 매개변수는 보통 기본값이 없는 타입 매개변수보다 <b>뒤쪽</b>에 둬야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>Box&lt;T&gt;</code>에서 타입 인자를 생략하면 자동으로 <code>string</code>이 쓰이도록, T의 기본값을 지정하는 문법을 완성하세요.`,
          prefix: 'interface Box<T', suffix: '> { value: T; }', accept: [' = string'], placeholder: ' = 타입',
          why: '<code>&lt;T = string&gt;</code>처럼 등호로 기본 타입을 지정해요.',
          hint: '함수 매개변수 기본값(= 값)과 비슷한 자리에 = 타입을 쓰면 돼요.'
        }),
        () => makeChoice(
          '<code>interface Box&lt;T = string&gt; { value: T; }</code>일 때, <code>const b: Box = { value: "hi" };</code>처럼 타입 인자 없이 쓰면 T는 무엇이 되나요?',
          'string (기본값이 그대로 적용됨)', ['number', 'any', '오류가 난다'],
          '타입 인자를 생략하면 지정해둔 기본값 string이 그대로 적용돼요.',
          '함수의 기본 매개변수 값과 똑같은 원리예요.'
        ),
        () => makeChoice(
          '제네릭에서 기본값이 있는 타입 매개변수는 보통 어디에 둬야 하나요?',
          '기본값이 없는 타입 매개변수보다 뒤쪽에', ['항상 맨 앞에', '아무 위치나 상관없다', '기본값이 있으면 다른 매개변수를 쓸 수 없다'],
          '함수의 기본 매개변수처럼, 기본값이 있는 타입 매개변수는 뒤쪽에 둬야 자연스럽게 생략할 수 있어요.',
          '함수 매개변수 기본값의 순서 규칙을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>interface ApiResponse&lt;T, E = string&gt; { data: T; error?: E; }</code>에서, <code>ApiResponse&lt;number&gt;</code>로 쓰면 E는 무엇이 되나요?`,
          prefix: '', suffix: '', accept: ['string'], placeholder: '타입',
          why: 'E의 타입 인자를 생략했으니 기본값 string이 적용돼요.',
          hint: 'E = string으로 정의된 기본값을 떠올려보세요.'
        }),
        () => ({
          type: 'code',
          q: '<code>value: T</code> 속성을 가지는 제네릭 인터페이스 <code>Wrapper&lt;T&gt;</code>를 작성하되, 타입 인자를 생략하면 <code>number</code>가 기본값이 되도록 하세요.',
          starter: '',
          placeholder: 'interface Wrapper<T = number> {\n  value: T;\n}',
          accept: ['interface Wrapper<T = number> {\n  value: T;\n}'],
          why: '<T = number>로 기본 타입을 number로 지정해요.',
          hint: 'interface Wrapper<T = number> { value: T; }를 쓰세요.'
        }),
      ],
      boss: () => {
        const useDefault = Math.random() < 0.5;
        const val = useDefault ? '"안녕"' : '42';
        return {
          type: 'blank',
          q: `<code>interface Box&lt;T = string&gt; { value: T; }</code>일 때, <code>const b: ${useDefault ? 'Box' : 'Box<number>'} = { value: ${val} };</code>에서 T의 타입은?`,
          prefix: '', suffix: '', accept: [useDefault ? 'string' : 'number'], placeholder: '타입',
          why: useDefault ? '타입 인자를 생략했으니 기본값 string이 적용돼요.' : '타입 인자로 number를 명시했으니 T는 number예요.',
          hint: '타입 인자를 직접 썼는지, 생략했는지를 확인해보세요.'
        };
      }
    },
    {
      id: 'readonlyArraysTuples',
      title: '읽기 전용 배열과 튜플',
      ready: true,
      summary: 'readonly 배열/튜플로, 한 번 만든 뒤에는 요소를 바꾸거나 추가/삭제할 수 없는 안전한 목록을 만드는 법을 배워요.',
      goals: ['readonly T[] / ReadonlyArray<T> 문법', 'readonly 튜플 만들기', '변경 메서드가 막히는 이유'],
      blocks: [
        {
          h: '배열 앞에 readonly 붙이기',
          html: `<p><code>readonly T[]</code>나 <code>ReadonlyArray&lt;T&gt;</code>로 선언하면, 그 배열은 <code>push</code>, <code>pop</code>, 인덱스 대입(<code>arr[0] = ...</code>) 같은 <b>변경 동작이 모두 막혀요.</b></p>`,
          code: {
            label: 'readonly_array.ts',
            lang: 'typescript',
            src: `const scores: readonly number[] = [90, 85, 100];

console.log(scores[0]);
// scores.push(70);   // 오류! push는 readonly 배열에 없음
// scores[0] = 0;      // 오류! 요소를 바꿀 수 없음`,
            out: `90`
          }
        },
        {
          h: 'readonly 튜플',
          html: `<p>튜플에도 <code>readonly</code>를 붙일 수 있어요. <code>readonly [string, number]</code>로 선언하면, 각 자리의 값을 나중에 바꿀 수 없어요.</p>`,
          code: {
            label: 'readonly_tuple.ts',
            lang: 'typescript',
            src: `const point: readonly [number, number] = [3, 4];

console.log(point[0], point[1]);
// point[0] = 10; // 오류! readonly 튜플의 요소는 바꿀 수 없음`,
            out: `3 4`
          },
          after: `<div class="note"><b>왜 유용할까요</b> — 함수의 매개변수를 <code>readonly T[]</code>로 받으면, "이 함수는 배열을 절대 변경하지 않는다"는 약속을 타입으로 명확히 드러낼 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `숫자 배열을 읽기 전용으로 선언하는 표기를 완성하세요. (예: const scores: ___ number[] = [1,2,3];)`,
          prefix: 'const scores: ', suffix: ' number[] = [90, 85, 100];', accept: ['readonly'], placeholder: '키워드',
          why: '<code>readonly number[]</code>는 변경이 금지된 숫자 배열 타입이에요.',
          hint: '객체 속성에 붙이는 그 키워드를 배열 타입 앞에도 붙일 수 있어요.'
        }),
        () => makeChoice(
          '<code>const scores: readonly number[] = [90, 85];</code>일 때, <code>scores.push(70);</code>을 쓰면?',
          '컴파일 오류가 난다 (readonly 배열에는 push 메서드 자체가 없으므로)',
          ['정상적으로 70이 추가된다', 'scores가 [70]으로 바뀐다', '경고만 뜨고 실행은 된다'],
          'readonly 배열 타입에는 push, pop 같은 변경 메서드 자체가 타입 정의에서 빠져 있어서 사용할 수 없어요.',
          'readonly 배열의 타입에 어떤 메서드들이 있을지 생각해보세요.'
        ),
        () => makeChoice(
          '함수의 매개변수 타입을 <code>readonly T[]</code>로 받는 이유는?',
          '이 함수가 배열을 변경하지 않는다는 약속을 타입으로 명확히 드러내기 위해',
          ['함수 실행 속도를 높이기 위해', '배열의 길이를 자동으로 고정하기 위해', 'undefined 값을 막기 위해'],
          'readonly 매개변수는 "이 함수 안에서 원본 배열을 건드리지 않는다"는 걸 타입 시스템으로 보장해줘요.',
          '"약속을 명확히 드러낸다"는 표현을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>const point: readonly [number, number] = [3, 4]; point[0] = 10;</code>를 실행하면 어떻게 되나요? (한 단어)`,
          prefix: '', suffix: '', accept: ['오류', '오류가 난다'], placeholder: '결과',
          why: 'readonly 튜플의 요소는 바꿀 수 없어서, 대입하려고 하면 컴파일 오류가 나요.',
          hint: 'readonly가 붙은 값에 대입을 시도하면 어떻게 될지 떠올려보세요.'
        }),
        () => ({
          type: 'code',
          q: '이름 두 개를 담는 읽기 전용 튜플 타입의 상수 <code>names</code>를 선언하세요. 값은 <code>["지수", "민준"]</code>이어야 해요.',
          starter: '',
          placeholder: 'const names: readonly [string, string] = ["지수", "민준"];',
          accept: ['const names: readonly [string, string] = ["지수", "민준"];'],
          why: 'readonly [string, string]로 선언하면 두 자리 모두 변경할 수 없는 튜플이 돼요.',
          hint: 'const names: readonly [string, string] = ["지수", "민준"]; 를 쓰세요.'
        }),
      ],
      boss: () => {
        const arr = [randInt(1, 100), randInt(1, 100), randInt(1, 100)];
        const idx = randInt(0, 2);
        return {
          type: 'blank',
          q: `<code>const scores: readonly number[] = [${arr.join(', ')}];</code>일 때, <code>scores[${idx}]</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(arr[idx])], placeholder: '숫자',
          why: `readonly 배열도 읽는 것(인덱스 접근)은 자유로워서, scores[${idx}]는 ${arr[idx]}예요.`,
          hint: 'readonly는 "쓰기"만 막을 뿐, 읽는 것은 평소와 똑같아요.'
        };
      }
    },
    {
      id: 'recursiveTypeAliases',
      title: '재귀적 타입 별칭',
      ready: true,
      summary: '타입이 자기 자신을 다시 참조하는 재귀적 타입 별칭으로, JSON이나 트리처럼 중첩 깊이가 정해지지 않은 구조를 표현해요.',
      goals: ['타입이 자기 자신을 참조하는 방법', 'JSON 값 타입 직접 만들어보기', '트리 구조 표현하기'],
      blocks: [
        {
          h: '타입이 자기 자신을 참조할 수 있어요',
          html: `<p>함수가 자기 자신을 호출하는 재귀처럼, 타입 별칭도 자기 자신을 정의 안에서 다시 참조할 수 있어요. 이러면 "몇 겹으로 중첩될지 미리 알 수 없는" 구조를 표현할 수 있어요.</p>`,
          code: {
            label: 'recursive_json.ts',
            lang: 'typescript',
            src: `type Json =
  | string
  | number
  | boolean
  | null
  | Json[]
  | { [key: string]: Json };

const data: Json = {
  name: "지수",
  tags: ["학생", "17세"],
  address: { city: "서울", zipcode: null },
};

console.log(data.name);`,
            out: `지수`
          }
        },
        {
          h: '트리 구조 표현하기',
          html: `<p>재귀적 타입은 트리처럼 "같은 모양이 계속 반복되는" 구조를 표현할 때도 유용해요. 자식 노드의 타입이 바로 자기 자신(TreeNode)이에요.</p>`,
          code: {
            label: 'recursive_tree.ts',
            lang: 'typescript',
            src: `type TreeNode = {
  value: number;
  children: TreeNode[];
};

const tree: TreeNode = {
  value: 1,
  children: [
    { value: 2, children: [] },
    { value: 3, children: [{ value: 4, children: [] }] },
  ],
};

console.log(tree.children[1].children[0].value);`,
            out: `4`
          },
          after: `<div class="note"><b>주의</b> — 재귀적 타입 별칭은 반드시 배열, 객체, 유니언처럼 "간접적으로" 자기 자신을 참조해야 해요. <code>type A = A;</code>처럼 직접 자기 자신과 완전히 같으면 오류가 나요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '재귀적 타입 별칭이 유용한 경우는?',
          'JSON 값이나 트리처럼, 중첩 깊이가 미리 정해지지 않은 구조를 표현할 때',
          ['항상 두 단계까지만 중첩되는 구조를 표현할 때', '숫자 계산 속도를 높일 때', '함수의 매개변수 개수를 제한할 때'],
          '재귀적 타입은 몇 겹으로 중첩되든 상관없이 같은 규칙을 반복 적용할 수 있어서, JSON이나 트리 구조에 잘 맞아요.',
          '"깊이가 정해지지 않았다"는 표현을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>type TreeNode = { value: number; children: TreeNode[]; };</code>에서, children의 타입이 자기 자신인 TreeNode를 다시 참조하는 걸 (무엇)적 타입이라고 부르나요? (두 글자)`,
          prefix: '', suffix: '', accept: ['재귀'], placeholder: '단어',
          why: '타입이 자기 자신을 정의 안에서 다시 참조하는 걸 재귀적 타입이라고 해요.',
          hint: '함수가 자기 자신을 호출하는 것과 같은 원리의 이름이에요.'
        }),
        () => makeChoice(
          '<code>type A = A;</code>처럼 타입을 직접적으로 자기 자신과 완전히 같게 정의하면 어떻게 되나요?',
          '컴파일 오류가 난다 (직접 재귀는 허용되지 않으므로)',
          ['정상적으로 동작한다', 'any 타입으로 자동 변환된다', '무한히 중첩된 타입이 만들어진다'],
          '배열이나 객체 속성처럼 간접적으로 참조해야 하고, 완전히 직접적인 자기 참조는 오류가 나요.',
          '"간접적으로"라는 표현이 힌트예요.'
        ),
        () => {
          const val = randInt(1, 100);
          return {
            type: 'blank',
            q: `<code>type TreeNode = { value: number; children: TreeNode[]; }; const tree: TreeNode = { value: 1, children: [{ value: ${val}, children: [] }] };</code>일 때, <code>tree.children[0].value</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(val)], placeholder: '숫자',
            why: `tree의 children 배열 첫 번째 요소의 value는 ${val}이에요.`,
            hint: '중첩된 객체를 하나씩 따라가며 값을 찾아보세요.'
          };
        },
        () => ({
          type: 'code',
          q: 'JSON에서 올 수 있는 값의 타입 <code>Json</code>을 재귀적으로 정의하세요. string, number, boolean, null, Json 배열, 그리고 문자열 키를 가지는 Json 객체를 모두 포함해야 해요.',
          starter: '',
          rows: 7,
          placeholder: 'type Json =\n  | string\n  | number\n  | boolean\n  | null\n  | Json[]\n  | { [key: string]: Json };',
          accept: ['type Json =\n  | string\n  | number\n  | boolean\n  | null\n  | Json[]\n  | { [key: string]: Json };'],
          why: '기본 값 타입들과 함께, Json[]과 { [key: string]: Json }으로 자기 자신을 재귀적으로 참조해요.',
          hint: '유니언에 Json[]과 { [key: string]: Json }을 포함시키세요.'
        }),
      ],
      boss: () => {
        const val = randInt(1, 50);
        return {
          type: 'blank',
          q: `<code>type TreeNode = { value: number; children: TreeNode[]; }; const t: TreeNode = { value: 0, children: [{ value: 0, children: [{ value: ${val}, children: [] }] }] };</code>일 때, <code>t.children[0].children[0].value</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(val)], placeholder: '숫자',
          why: `children을 두 번 따라 들어가면 value가 ${val}인 노드에 도달해요.`,
          hint: 'children[0]을 두 번 따라가 보세요.'
        };
      }
    },
    {
      id: 'brandedTypes',
      title: '브랜드 타입(Branded Types)',
      ready: true,
      summary: '구조가 같아도 의미가 다른 값들을 구분하기 위해, 타입에 가짜 표식을 붙이는 브랜드 타입 기법을 배워요.',
      goals: ['구조적 타이핑의 한계 이해하기', '브랜드 표식 붙이는 법', '전용 생성 함수로 안전하게 만들기'],
      blocks: [
        {
          h: '구조가 같으면 다른 의미도 섞여요',
          html: `<p>TypeScript는 <b>구조적 타이핑</b>이라서, <code>UserId</code>와 <code>ProductId</code>가 둘 다 <code>string</code>이면 서로 실수로 바꿔 써도 오류가 나지 않아요.</p>`,
          code: {
            label: 'brand_problem.ts',
            lang: 'typescript',
            src: `type UserId = string;
type ProductId = string;

function getUser(id: UserId) {
  return \`유저 \${id}\`;
}

const productId: ProductId = "prod-1";
console.log(getUser(productId)); // 실수인데 오류가 안 남!`,
            out: `유저 prod-1`
          }
        },
        {
          h: '가짜 표식(브랜드)으로 구분하기',
          html: `<p>실제로는 존재하지 않는 속성(<code>__brand</code>)을 타입에 끼워 넣으면, 구조가 같아도 서로 <b>다른 타입</b>으로 취급돼서 실수로 섞어 쓸 수 없게 돼요.</p>`,
          code: {
            label: 'brand_solution.ts',
            lang: 'typescript',
            src: `type UserId = string & { readonly __brand: "UserId" };
type ProductId = string & { readonly __brand: "ProductId" };

function toUserId(id: string): UserId {
  return id as UserId;
}

function getUser(id: UserId) {
  return \`유저 \${id}\`;
}

const uid = toUserId("u-1");
console.log(getUser(uid));
// getUser(productId); // 이제 오류! ProductId는 UserId가 아님`,
            out: `유저 u-1`
          },
          after: `<div class="note"><b>비유</b> — 브랜드 타입은 겉모습이 똑같은 열쇠 두 개에, 눈에 안 보이는 미세한 홈을 하나씩 파서 "이건 현관용, 저건 자물쇠용"으로 구분해두는 것과 비슷해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'TypeScript에서 <code>type UserId = string; type ProductId = string;</code>일 때, ProductId 값을 UserId를 요구하는 곳에 넘기면?',
          '구조가 둘 다 string이라 오류 없이 통과된다 (구조적 타이핑)',
          ['이름이 다르므로 항상 오류가 난다', 'ProductId가 자동으로 UserId로 바뀐다', '실행할 때만 오류가 난다'],
          'TypeScript는 이름이 아니라 구조를 보고 타입을 판단하는 구조적 타이핑이라서, 둘 다 string이면 구분하지 못해요.',
          '"구조적 타이핑"이 무엇을 기준으로 타입을 비교하는지 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>type UserId = string & { readonly __brand: "UserId" };</code>처럼, 실제로 존재하지 않는 속성을 타입에 끼워 넣어 구조가 같은 타입들을 구분하는 기법을 (무엇) 타입이라고 부르나요? (영어로)`,
          prefix: '', suffix: '', accept: ['branded', 'brand'], placeholder: '단어',
          why: '이런 기법을 브랜드(branded) 타입 또는 나미널(nominal) 타이핑 흉내라고 불러요.',
          hint: '소, 가축 등에 찍는 낙인이라는 뜻의 영단어예요.'
        }),
        () => makeChoice(
          '브랜드 타입을 만들 때 <code>string & { __brand: "UserId" }</code>처럼 인터섹션(&)을 쓰는 이유는?',
          'string이 가진 원래 기능은 그대로 쓰면서, 구분을 위한 가짜 표식만 추가로 덧붙이기 위해',
          ['런타임에 실제로 __brand 속성을 만들기 위해', 'string 타입을 완전히 대체하기 위해', '유니언 타입을 만들기 위해'],
          '인터섹션은 기존 타입의 기능은 유지한 채 표식 속성만 타입 레벨에서 추가해줘요. 실제 런타임에는 __brand 값이 존재하지 않아요.',
          '인터섹션(&)이 "둘 다 만족"을 뜻한다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `브랜드 타입에서 <code>__brand</code> 같은 속성은 실제 런타임에 (존재한다/존재하지 않는다) 중 무엇일까요?`,
          prefix: '', suffix: '', accept: ['존재하지 않는다', '존재하지않는다'], placeholder: '답',
          why: '__brand는 오직 컴파일 시점의 타입 검사만을 위한 가짜 표식이라서, 실제 객체에는 존재하지 않아요.',
          hint: '타입은 컴파일 후 사라진다는 TS의 기본 성질을 떠올려보세요.'
        }),
        () => ({
          type: 'code',
          q: '<code>string</code> 기반의 브랜드 타입 <code>Email</code>을 <code>__brand: "Email"</code> 표식을 사용해 정의하세요.',
          starter: '',
          placeholder: 'type Email = string & { readonly __brand: "Email" };',
          accept: ['type Email = string & { readonly __brand: "Email" };'],
          why: 'string과 { readonly __brand: "Email" }을 인터섹션으로 합쳐 브랜드 타입을 만들어요.',
          hint: 'type Email = string & { readonly __brand: "Email" }; 를 쓰세요.'
        }),
      ],
      boss: () => {
        const kind = pick(['UserId', 'ProductId', 'OrderId']);
        return {
          type: 'blank',
          q: `<code>type ${kind} = string & { readonly __brand: "${kind}" };</code>일 때, 이 타입의 값을 만들 때 실제 런타임에 <code>__brand</code>라는 속성이 객체에 존재하나요? (예/아니오)`,
          prefix: '', suffix: '', accept: ['아니오', '아니요'], placeholder: '답',
          why: '__brand는 타입 검사 전용 가짜 속성이라서, 실제 값에는 존재하지 않아요.',
          hint: '브랜드 타입의 표식은 컴파일 타임에만 존재한다는 점을 떠올려보세요.'
        };
      }
    },
    {
      id: 'constTypeParameters',
      title: 'const 타입 매개변수',
      ready: true,
      summary: '제네릭 타입 매개변수 앞에 const를 붙여서, 넘겨받은 값을 자동으로 리터럴 타입 그대로 추론하게 만드는 법을 배워요.',
      goals: ['const 타입 매개변수 문법', 'as const와의 관계', '넓혀지지 않은 리터럴 타입 유지하기'],
      blocks: [
        {
          h: '제네릭이 값을 너무 넓게 추론하는 문제',
          html: `<p>보통 제네릭 함수에 배열 리터럴을 넘기면, TypeScript는 각 요소를 <code>string</code>처럼 넓은 타입으로 추론해버려서 정확한 값("red" 같은 리터럴)을 잃어버려요.</p>`,
          code: {
            label: 'const_param_problem.ts',
            lang: 'typescript',
            src: `function firstOf<T>(arr: T[]): T {
  return arr[0];
}

const result = firstOf(["red", "green", "blue"]);
// result의 타입은 string (넓어짐)`,
          }
        },
        {
          h: 'const 타입 매개변수로 리터럴 그대로 유지하기',
          html: `<p>타입 매개변수 앞에 <code>const</code>를 붙이면, <code>as const</code>를 쓴 것처럼 넘겨받은 값의 <b>좁은 리터럴 타입</b>을 그대로 유지한 채 추론해줘요.</p>`,
          code: {
            label: 'const_param_solution.ts',
            lang: 'typescript',
            src: `function firstOf<const T>(arr: T[]): T {
  return arr[0];
}

const result = firstOf(["red", "green", "blue"]);
// result의 타입은 "red" (좁은 리터럴 그대로!)

console.log(result);`,
            out: `red`
          },
          after: `<div class="note"><b>비유</b> — 호출할 때마다 매번 <code>as const</code>를 손으로 붙이는 대신, 함수 쪽에서 "여기 들어오는 값은 항상 리터럴 그대로 취급해줘"라고 미리 약속해두는 것과 같아요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `제네릭 함수 <code>firstOf&lt;T&gt;(arr: T[]): T</code>가 넘겨받은 배열 요소의 리터럴 타입을 넓히지 않고 그대로 유지하도록 만들려면, T 앞에 어떤 키워드를 붙여야 할까요?`,
          prefix: 'function firstOf<', suffix: ' T>(arr: T[]): T { return arr[0]; }', accept: ['const'], placeholder: '키워드',
          why: '<code>&lt;const T&gt;</code>로 쓰면 넘겨받은 값의 좁은 리터럴 타입을 그대로 유지해요.',
          hint: '이 단원의 제목이기도 한 그 키워드예요.'
        }),
        () => makeChoice(
          'const 타입 매개변수를 쓰지 않은 일반 제네릭 함수에 <code>["red", "green"]</code>을 넘기면, 각 요소의 타입은 보통 어떻게 추론되나요?',
          '넓은 string 타입으로 추론된다', ['리터럴 "red" | "green" 그대로 유지된다', '항상 any로 추론된다', '오류가 난다'],
          '일반 제네릭은 리터럴 값을 더 넓은 타입(string)으로 추론해버려요.',
          '"넓힌다(widening)"는 TS의 기본 추론 동작을 떠올려보세요.'
        ),
        () => makeChoice(
          'const 타입 매개변수가 하는 역할과 가장 비슷한, 값에서 쓰는 문법은?',
          '<code>as const</code>', ['<code>as any</code>', '<code>satisfies</code>', '<code>readonly</code> 단독'],
          'const 타입 매개변수는 함수를 호출할 때마다 자동으로 as const를 적용한 것과 같은 효과를 줘요.',
          '리터럴을 넓히지 않고 그대로 유지하는 그 문법을 떠올려보세요.'
        ),
        () => {
          const color = pick(['red', 'green', 'blue']);
          return {
            type: 'blank',
            q: `<code>function firstOf&lt;const T&gt;(arr: T[]): T { return arr[0]; }</code>일 때, <code>firstOf(["${color}", "yellow"])</code>의 반환값 타입(그리고 값)은?`,
            prefix: '', suffix: '', accept: [color], placeholder: '값',
            why: `const 타입 매개변수 덕분에 배열의 첫 요소인 "${color}" 리터럴 타입 그대로 반환돼요.`,
            hint: '배열의 첫 번째 요소가 그대로 반환된다는 점을 떠올려보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '넘겨받은 배열의 리터럴 타입을 그대로 유지하며 배열을 그대로 반환하는 제네릭 함수 <code>freeze</code>를 const 타입 매개변수를 사용해 작성하세요. (매개변수 arr: T[], 반환 타입 T[])',
          starter: '',
          rows: 3,
          placeholder: 'function freeze<const T>(arr: T[]): T[] {\n  return arr;\n}',
          accept: ['function freeze<const T>(arr: T[]): T[] {\n  return arr;\n}'],
          why: '<const T>로 타입 매개변수를 선언하면, 넘겨받은 배열의 리터럴 타입이 넓혀지지 않아요.',
          hint: 'function freeze<const T>(arr: T[]): T[] { return arr; } 를 쓰세요.'
        }),
      ],
      boss: () => {
        const color = pick(['red', 'green', 'blue', 'yellow']);
        return {
          type: 'blank',
          q: `<code>function firstOf&lt;const T&gt;(arr: T[]): T { return arr[0]; }</code>일 때, <code>firstOf(["${color}", "black"])</code>의 반환값은?`,
          prefix: '', suffix: '', accept: [color], placeholder: '값',
          why: `첫 번째 요소인 "${color}"이 그대로 반환돼요.`,
          hint: '배열의 첫 요소를 반환하는 함수라는 점을 떠올려보세요.'
        };
      }
    },
    {
      id: 'structuralTypingEdgeCases',
      title: '구조적 타이핑의 함정: 초과 속성 검사',
      ready: true,
      summary: '구조만 맞으면 호환되는 구조적 타이핑의 원리와, 객체 리터럴을 직접 넘길 때만 발동하는 초과 속성 검사의 예외를 배워요.',
      goals: ['구조적 타이핑 기본 원리 복습', '초과 속성 검사가 발동하는 조건', '변수를 거치면 검사가 느슨해지는 이유'],
      blocks: [
        {
          h: '구조만 맞으면 통과되는 구조적 타이핑',
          html: `<p>TypeScript는 이름이 아니라 <b>속성 구조</b>로 타입 호환을 판단해요. 필요한 속성을 다 갖추고 있다면, 그 이상 속성이 더 있어도 대입 자체는 허용돼요.</p>`,
          code: {
            label: 'structural_basic.ts',
            lang: 'typescript',
            src: `interface Point {
  x: number;
  y: number;
}

const p3d = { x: 1, y: 2, z: 3 };
const p: Point = p3d; // 변수를 거치면 통과됨(z는 무시)

console.log(p.x, p.y);`,
            out: `1 2`
          }
        },
        {
          h: '객체 리터럴을 직접 넘기면 더 엄격해져요',
          html: `<p>하지만 변수 없이 <b>객체 리터럴을 바로</b> 대입하면, TypeScript는 "필요 없는 속성이 실수로 들어간 건 아닌지" <b>초과 속성 검사</b>를 추가로 해요. 이때는 정의에 없는 속성이 있으면 오류가 나요.</p>`,
          code: {
            label: 'structural_excess.ts',
            lang: 'typescript',
            src: `const q: Point = { x: 1, y: 2, z: 3 };
// 오류! Point에 없는 z 속성이 있음 (초과 속성 검사)`,
          },
          after: `<div class="note"><b>왜 이렇게 만들었을까요</b> — 오타(예: 원래 쓰려던 속성 이름을 잘못 씀)를 실수로 지나치기 쉬운 게 객체 리터럴 직접 대입이라서, TS가 이 경우에만 특별히 더 엄격하게 검사해요. 변수를 거치면 이미 다른 곳에서 쓰이고 있을 수 있어서 검사를 완화해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'TypeScript가 두 타입이 호환되는지 판단하는 기본 기준은?',
          '타입의 이름이 아니라, 실제로 가진 속성들의 구조', ['타입을 선언한 파일 이름', '타입 이름이 똑같은지', '선언한 순서'],
          'TypeScript는 구조적 타이핑을 쓰기 때문에, 이름과 상관없이 필요한 속성 구조만 맞으면 호환된다고 판단해요.',
          '"구조적" 타이핑이라는 이름 자체가 기준을 알려줘요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>interface Point { x: number; y: number; } const q: Point = { x: 1, y: 2, z: 3 };</code>처럼 객체 리터럴을 바로 대입할 때, 정의에 없는 속성이 있으면 발동하는 특별한 검사를 (무엇) 검사라고 부르나요? (한글로)`,
          prefix: '', suffix: ' 속성 검사', accept: ['초과'], placeholder: '단어',
          why: '이 검사를 초과 속성 검사(excess property check)라고 불러요.',
          hint: '정의보다 "초과"한 속성이 있는지 확인한다는 뜻이에요.'
        }),
        () => makeChoice(
          '<code>const p3d = { x: 1, y: 2, z: 3 }; const p: Point = p3d;</code>처럼 변수를 거쳐서 대입하면 어떻게 되나요? (Point는 x, y만 정의)',
          '정상적으로 통과된다 (변수를 거치면 초과 속성 검사가 발동하지 않으므로)',
          ['객체 리터럴 직접 대입과 똑같이 오류가 난다', 'z 속성이 자동으로 제거된다', 'p3d의 타입이 Point로 강제 변환된다'],
          '변수를 거쳐서 대입하면 초과 속성 검사가 발동하지 않고, 구조적 타이핑의 일반 규칙(필요한 속성만 있으면 통과)만 적용돼요.',
          '초과 속성 검사는 "객체 리터럴을 직접 대입할 때만" 발동한다는 점을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `초과 속성 검사가 "발동한다/발동하지 않는다" 중 무엇일까요, 변수에 담긴 객체를 대입할 때는?`,
          prefix: '', suffix: '', accept: ['발동하지 않는다', '발동안한다', '발동하지않는다'], placeholder: '답',
          why: '초과 속성 검사는 객체 리터럴을 직접 대입할 때만 발동하고, 변수를 거치면 발동하지 않아요.',
          hint: '리터럴 직접 대입과 변수 경유의 차이를 떠올려보세요.'
        }),
        () => ({
          type: 'code',
          q: '<code>interface Config { timeout: number; }</code>일 때, 객체 <code>{ timeout: 3000, retries: 3 }</code>을 먼저 변수 <code>raw</code>에 담은 뒤, 그 변수를 <code>Config</code> 타입 상수 <code>cfg</code>에 대입하는 코드를 작성하세요. (초과 속성 검사를 피하는 방식)',
          starter: '',
          rows: 2,
          placeholder: 'const raw = { timeout: 3000, retries: 3 };\nconst cfg: Config = raw;',
          accept: ['const raw = { timeout: 3000, retries: 3 };\nconst cfg: Config = raw;'],
          why: '객체를 변수에 먼저 담아 대입하면 초과 속성 검사를 우회할 수 있어요.',
          hint: 'const raw = { ... }; 로 먼저 만든 뒤, const cfg: Config = raw; 로 대입하세요.'
        }),
      ],
      boss: () => {
        const z = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>interface Point { x: number; y: number; } const raw = { x: 5, y: 7, z: ${z} }; const p: Point = raw;</code>일 때, <code>p.x + p.y</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: ['12'], placeholder: '숫자',
          why: '변수를 거쳐 대입했으니 오류 없이 통과되고, p.x + p.y = 5 + 7 = 12예요.',
          hint: 'z는 무시하고 x와 y만 더하면 돼요.'
        };
      }
    },
    {
      id: 'awaitedUtilityType',
      title: 'Awaited<T> 유틸리티 타입',
      ready: true,
      summary: 'Promise가 몇 겹으로 중첩되어 있어도, 최종적으로 await했을 때 얻게 될 값의 타입을 뽑아내는 Awaited<T>를 배워요.',
      goals: ['Awaited<T>의 역할 이해하기', '중첩된 Promise에서도 동작하는 이유', 'async 함수 반환 타입 계산에 활용하기'],
      blocks: [
        {
          h: 'Promise 안의 진짜 값 타입 뽑아내기',
          html: `<p><code>Awaited&lt;T&gt;</code>는 <code>T</code>가 <code>Promise&lt;X&gt;</code>이면 <code>X</code>를, Promise가 아니면 <code>T</code> 그대로를 돌려주는 유틸리티 타입이에요. <code>await</code>를 실제로 했을 때 얻는 타입과 똑같아요.</p>`,
          code: {
            label: 'awaited_basic.ts',
            lang: 'typescript',
            src: `type A = Awaited<Promise<string>>; // string
type B = Awaited<number>;          // number (Promise가 아니면 그대로)

let a: A = "안녕";
console.log(a);`,
            out: `안녕`
          }
        },
        {
          h: '중첩된 Promise도 한 번에 풀어줘요',
          html: `<p><code>await</code>를 여러 번 해야 하는 <code>Promise&lt;Promise&lt;T&gt;&gt;</code> 같은 중첩 구조도, <code>Awaited</code>는 안쪽 실제 값의 타입까지 한 번에 뽑아내 줘요.</p>`,
          code: {
            label: 'awaited_nested.ts',
            lang: 'typescript',
            src: `type Nested = Awaited<Promise<Promise<number>>>; // number

async function fetchNested(): Promise<Promise<number>> {
  return Promise.resolve(42);
}

async function run() {
  const value: Nested = await fetchNested();
  console.log(value);
}

run();`,
            out: `42`
          },
          after: `<div class="note"><b>왜 유용할까요</b> — async 함수 여러 개를 조합하는 라이브러리 타입을 만들 때, "최종적으로 무슨 값을 받게 되는지"를 표현하려면 Awaited가 꼭 필요해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const kind = pick([
            { t: 'Promise<string>', r: 'string' },
            { t: 'Promise<boolean>', r: 'boolean' },
            { t: 'number', r: 'number' },
          ]);
          return {
            type: 'blank',
            q: `<code>Awaited&lt;${kind.t}&gt;</code>의 결과 타입은?`,
            prefix: '', suffix: '', accept: [kind.r], placeholder: '타입',
            why: kind.t.startsWith('Promise') ? `Promise 안의 값 타입인 ${kind.r}을 뽑아내요.` : `Promise가 아니므로 그대로 ${kind.r}이에요.`,
            hint: 'Promise<X> 형태이면 X만 남기고, 아니면 그대로예요.'
          };
        },
        () => makeChoice(
          'Awaited<T>가 하는 역할은?',
          'T가 Promise면 그 안의 실제 값 타입을, Promise가 아니면 T 그대로를 돌려준다',
          ['모든 타입을 Promise로 감싸준다', '함수의 실행 순서를 바꿔준다', 'async 함수를 동기 함수로 바꿔준다'],
          'Awaited는 실제로 await했을 때 최종적으로 얻게 될 타입을 계산해줘요.',
          '"await 했을 때 얻는 타입"이라는 표현을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>type Nested = Awaited&lt;Promise&lt;Promise&lt;number&gt;&gt;&gt;;</code>의 결과 타입은?`,
          prefix: '', suffix: '', accept: ['number'], placeholder: '타입',
          why: 'Awaited는 중첩된 Promise도 한 번에 풀어서 최종 값의 타입(number)까지 뽑아내요.',
          hint: 'Promise가 몇 겹이든 상관없이 가장 안쪽 값의 타입을 찾으면 돼요.'
        }),
        () => makeChoice(
          'Awaited<T>가 특히 필요한 상황은?',
          'async 함수 여러 개를 조합하는 라이브러리에서, 최종적으로 어떤 값을 받게 되는지 타입으로 표현할 때',
          ['동기 함수의 반환 타입을 표현할 때', '배열의 요소 타입을 추출할 때', '문자열을 숫자로 변환할 때'],
          'Awaited는 Promise가 여러 겹 중첩돼도 최종적으로 await한 결과의 타입을 정확히 계산해줘요.',
          'Promise, await와 관련된 상황을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Promise&lt;boolean&gt;</code>을 await했을 때 얻는 타입을 <code>Awaited</code>로 뽑아낸 타입 별칭 <code>Result</code>를 작성하세요.',
          starter: '',
          placeholder: 'type Result = Awaited<Promise<boolean>>;',
          accept: ['type Result = Awaited<Promise<boolean>>;'],
          why: 'Awaited<Promise<boolean>>는 boolean이 돼요.',
          hint: 'type Result = Awaited<Promise<boolean>>; 를 쓰세요.'
        }),
      ],
      boss: () => {
        const kind = pick([
          { t: 'Promise<Promise<string>>', r: 'string' },
          { t: 'Promise<number>', r: 'number' },
          { t: 'boolean', r: 'boolean' },
        ]);
        return {
          type: 'blank',
          q: `<code>Awaited&lt;${kind.t}&gt;</code>의 결과 타입은?`,
          prefix: '', suffix: '', accept: [kind.r], placeholder: '타입',
          why: `최종적으로 await했을 때 얻는 값의 타입은 ${kind.r}이에요.`,
          hint: 'Promise가 몇 겹이든 가장 안쪽 값의 타입을 찾으세요.'
        };
      }
    },
    {
      id: 'functionComposition',
      title: '함수 합성의 타입 표현',
      ready: true,
      summary: '여러 함수를 이어붙여 하나로 만드는 함수 합성(compose)을, 제네릭으로 안전하게 타입을 표현하는 법을 배워요.',
      goals: ['두 함수를 이어붙이는 compose 만들기', '제네릭으로 입출력 타입 연결하기', '타입이 안 맞으면 막히는 이유'],
      blocks: [
        {
          h: '두 함수를 하나로 이어붙이기',
          html: `<p>함수 합성이란, <code>f</code>의 결과를 <code>g</code>에 넘기는 <code>g(f(x))</code>를 하나의 새 함수로 만드는 걸 말해요. 제네릭을 쓰면 <code>f</code>의 반환 타입과 <code>g</code>의 매개변수 타입이 <b>반드시 같도록</b> 강제할 수 있어요.</p>`,
          code: {
            label: 'compose_basic.ts',
            lang: 'typescript',
            src: `function compose<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C {
  return (a: A) => g(f(a));
}

const toLength = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const lengthTimesTwo = compose(toLength, double);
console.log(lengthTimesTwo("hello"));`,
            out: `10`
          }
        },
        {
          h: '타입이 안 맞으면 합성 자체가 막혀요',
          html: `<p><code>f</code>의 반환 타입(<code>B</code>)과 <code>g</code>의 매개변수 타입(<code>B</code>)이 제네릭으로 <b>같은 이름</b>에 묶여 있어서, 실제로 두 타입이 안 맞으면 TypeScript가 컴파일 시점에 바로 막아줘요.</p>`,
          code: {
            label: 'compose_mismatch.ts',
            lang: 'typescript',
            src: `const toLength2 = (s: string): number => s.length;
const shout = (s: string): string => s.toUpperCase();

// const broken = compose(toLength2, shout);
// 오류! toLength2는 number를 반환하는데, shout은 string을 받음`,
          },
          after: `<div class="note"><b>왜 유용할까요</b> — 함수를 여러 개 파이프라인처럼 이어붙이는 코드에서, 중간에 타입이 어긋나는 실수를 실행 전에 바로 잡을 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>function compose&lt;A, B, C&gt;(f: (a: A) =&gt; B, g: (b: B) =&gt; C): (a: A) =&gt; C</code>에서, f의 반환 타입과 g의 매개변수 타입은 같은 제네릭 이름 (무엇)으로 묶여 있나요? (알파벳 한 글자)`,
          prefix: '', suffix: '', accept: ['B'], placeholder: '글자',
          why: 'f: (a: A) => B와 g: (b: B) => C에서, f의 결과와 g의 입력이 모두 B로 연결돼 있어요.',
          hint: 'f가 돌려주는 타입 이름을 보세요.'
        }),
        () => makeChoice(
          'compose(f, g)에서 f의 반환 타입과 g의 매개변수 타입이 서로 다르면 어떻게 되나요?',
          '컴파일 오류가 난다 (제네릭 B가 서로 다른 타입으로 동시에 만족될 수 없으므로)',
          ['자동으로 타입 변환이 일어난다', '실행할 때만 오류가 난다', 'g의 매개변수 타입이 자동으로 f의 반환 타입에 맞춰진다'],
          '제네릭 B가 f의 반환 타입이면서 동시에 g의 매개변수 타입이어야 하므로, 둘이 다르면 이 제약을 만족하는 타입을 찾을 수 없어 오류가 나요.',
          '하나의 제네릭 이름이 두 군데서 동시에 쓰인다는 점을 떠올려보세요.'
        ),
        () => {
          const word = pick(['hello', 'world', 'code']);
          return {
            type: 'blank',
            q: `<code>const toLength = (s: string): number =&gt; s.length; const double = (n: number): number =&gt; n * 2; const f = compose(toLength, double);</code>일 때, <code>f("${word}")</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(word.length * 2)], placeholder: '숫자',
            why: `"${word}".length는 ${word.length}이고, 그 값을 2배 하면 ${word.length * 2}예요.`,
            hint: '먼저 문자열 길이를 구한 다음, 그 값을 2배 하세요.'
          };
        },
        () => makeChoice(
          '함수 합성을 제네릭으로 표현할 때 얻는 이점은?',
          '두 함수의 입출력 타입이 실제로 맞물리는지 컴파일 시점에 검사할 수 있다',
          ['실행 속도가 항상 빨라진다', '함수를 몇 개든 자동으로 합쳐준다', '매개변수 개수를 자동으로 줄여준다'],
          '제네릭으로 f의 출력과 g의 입력을 같은 타입 이름으로 묶으면, 실제로 안 맞는 조합을 실행 전에 걸러낼 수 있어요.',
          '"타입이 안 맞으면 막힌다"는 점이 핵심 이점이에요.'
        ),
        () => ({
          type: 'code',
          q: '문자열을 받아 boolean을 반환하는 함수 <code>f</code>와, boolean을 받아 string을 반환하는 함수 <code>g</code>를 합성하는 제네릭 함수 <code>compose&lt;A, B, C&gt;(f: (a: A) =&gt; B, g: (b: B) =&gt; C): (a: A) =&gt; C</code>를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'function compose<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C {\n  return (a: A) => g(f(a));\n}',
          accept: ['function compose<A, B, C>(f: (a: A) => B, g: (b: B) => C): (a: A) => C {\n  return (a: A) => g(f(a));\n}'],
          why: '반환하는 함수 안에서 f(a)의 결과를 g에 그대로 넘기면 돼요.',
          hint: 'return (a: A) => g(f(a)); 형태로 작성하세요.'
        }),
      ],
      boss: () => {
        const word = pick(['hi', 'test', 'typescript']);
        return {
          type: 'blank',
          q: `<code>const toLength = (s: string): number =&gt; s.length; const double = (n: number): number =&gt; n * 2; const f = compose(toLength, double);</code>일 때, <code>f("${word}")</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(word.length * 2)], placeholder: '숫자',
          why: `"${word}".length는 ${word.length}이고, 2배 하면 ${word.length * 2}예요.`,
          hint: '문자열 길이를 먼저 구하고, 2를 곱하세요.'
        };
      }
    },
    {
      id: 'indexAccessTypes',
      title: '인덱스 접근 타입(T[\\'key\\'])',
      ready: true,
      summary: '객체 타입에서 특정 속성만 콕 집어 그 속성의 타입을 그대로 재사용하는 인덱스 접근 타입을 배워요.',
      goals: ['T[\\'key\\'] 문법 이해하기', '값의 속성 접근과 타입의 인덱스 접근 비교하기', 'keyof와 함께 모든 속성 타입 뽑아내기'],
      blocks: [
        {
          h: '속성 하나의 타입만 뽑아내기',
          html: `<p><code>T['속성이름']</code>이라고 쓰면, 타입 <code>T</code>에서 그 속성이 어떤 타입인지 그대로 가져올 수 있어요. 값에서 <code>obj.속성</code>으로 값을 꺼내는 것과 비슷한 원리예요.</p>`,
          code: {
            label: 'index_access_basic.ts',
            lang: 'typescript',
            src: `interface Student {
  name: string;
  age: number;
}

type AgeType = Student["age"]; // number

let a: AgeType = 17;
console.log(a);`,
            out: `17`
          }
        },
        {
          h: 'keyof와 함께 쓰면: 모든 속성의 타입을 유니언으로',
          html: `<p><code>T[keyof T]</code>처럼 <code>keyof</code>와 함께 쓰면, "이 타입이 가질 수 있는 모든 속성 값의 타입"을 유니언으로 한 번에 뽑아낼 수 있어요.</p>`,
          code: {
            label: 'index_access_keyof.ts',
            lang: 'typescript',
            src: `type StudentValue = Student[keyof Student]; // string | number

let v: StudentValue = "지수";
v = 17; // 둘 다 가능
console.log(v);`,
            out: `17`
          },
          after: `<div class="note"><b>어디에 쓰일까요</b> — 라이브러리에서 "이 객체의 특정 속성과 똑같은 타입"을 매개변수로 요구할 때, 그 타입을 새로 적지 않고 <code>T['속성']</code>으로 재사용할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>interface Student { name: string; age: number; }</code>에서, age 속성만의 타입을 뽑아내는 표기를 쓰세요.`,
          prefix: 'type AgeType = Student[', suffix: '];', accept: ['"age"', "'age'"], placeholder: "'속성이름'",
          why: `<code>Student["age"]</code>는 Student의 age 속성 타입인 number를 그대로 가져와요.`,
          hint: '대괄호 안에 속성 이름을 문자열처럼 적어요.'
        }),
        () => makeChoice(
          '<code>Student["age"]</code>가 뽑아내는 것은?',
          'Student 인터페이스에서 age 속성이 어떤 타입인지(number)',
          ['Student 객체의 age 속성의 실제 값', 'Student의 age 속성이 존재하는지 여부(boolean)', 'age라는 이름의 새로운 타입'],
          '인덱스 접근 타입은 값이 아니라, 그 속성이 어떤 타입인지를 타입 레벨에서 가져와요.',
          '이건 값이 아니라 타입을 다루는 문법이라는 점을 떠올려보세요.'
        ),
        () => makeChoice(
          '<code>Student[keyof Student]</code>는 무엇을 뜻하나요? (Student는 name: string, age: number)',
          'string | number (Student가 가질 수 있는 모든 속성 값 타입의 유니언)',
          ['"name" | "age" (속성 이름들의 유니언)', 'number (age 타입만)', 'Student 타입 자체와 완전히 같은 타입'],
          'keyof Student는 "name" | "age"이고, 그 각각을 인덱스로 접근한 타입들을 유니언으로 합치면 string | number예요.',
          'keyof로 얻는 것과 그 결과를 다시 인덱스로 쓸 때의 차이를 생각해보세요.'
        ),
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>interface Student { name: string; age: number; } type NameType = Student["name"]; const n: NameType = "${name}";</code>일 때, <code>n</code>의 값은?`,
            prefix: '', suffix: '', accept: [name], placeholder: '값',
            why: `NameType은 string이므로, n에는 "${name}"이 그대로 담겨요.`,
            hint: '인덱스 접근 타입은 그냥 그 속성의 타입일 뿐, 값 자체는 평소와 같아요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>interface Product { id: number; price: number; }</code>에서, price 속성만의 타입을 그대로 가져와 타입 별칭 <code>PriceType</code>을 만드세요.',
          starter: '',
          placeholder: 'type PriceType = Product["price"];',
          accept: ['type PriceType = Product["price"];'],
          why: 'Product["price"]로 price 속성의 타입(number)을 그대로 가져와요.',
          hint: 'type PriceType = Product["price"]; 를 쓰세요.'
        }),
      ],
      boss: () => {
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>interface Student { name: string; age: number; } type AgeType = Student["age"]; const a: AgeType = ${age};</code>일 때, <code>a</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(age)], placeholder: '숫자',
          why: `AgeType은 number이므로, a에는 ${age}가 그대로 담겨요.`,
          hint: '인덱스 접근 타입은 값이 아니라 타입만 가져온다는 점을 떠올려보세요.'
        };
      }
    },
    {
      id: 'parametersReturnTypeCombos',
      title: 'Parameters와 ReturnType 조합하기',
      ready: true,
      summary: '함수 타입에서 매개변수 목록과 반환 타입을 각각 뽑아내는 Parameters<T>와 ReturnType<T>를 조합해서 활용하는 법을 배워요.',
      goals: ['Parameters<T>로 매개변수 튜플 뽑기', 'ReturnType<T>로 반환 타입 뽑기', '두 유틸리티를 함께 조합해 활용하기'],
      blocks: [
        {
          h: '함수의 매개변수 목록을 튜플로 뽑기',
          html: `<p><code>Parameters&lt;T&gt;</code>는 함수 타입 <code>T</code>의 매개변수들을 <b>튜플 타입</b>으로 뽑아줘요. <code>ReturnType&lt;T&gt;</code>는 그 함수의 반환 타입을 뽑아줘요.</p>`,
          code: {
            label: 'params_return_basic.ts',
            lang: 'typescript',
            src: `function greet(name: string, age: number): string {
  return \`\${name}(\${age})\`;
}

type Params = Parameters<typeof greet>; // [string, number]
type Result = ReturnType<typeof greet>; // string

const args: Params = ["지수", 17];
console.log(greet(...args));`,
            out: `지수(17)`
          }
        },
        {
          h: '두 유틸리티 조합하기: 함수 감싸는 유틸 만들기',
          html: `<p>기존 함수와 <b>똑같은 매개변수와 반환 타입</b>을 갖는 새 함수를 만들 때, 원래 함수의 타입을 다시 손으로 적지 않고 <code>Parameters</code>와 <code>ReturnType</code>으로 그대로 재사용할 수 있어요.</p>`,
          code: {
            label: 'params_return_combo.ts',
            lang: 'typescript',
            src: `function logged(fn: (...args: Parameters<typeof greet>) => ReturnType<typeof greet>) {
  return (...args: Parameters<typeof greet>): ReturnType<typeof greet> => {
    console.log("호출됨:", args);
    return fn(...args);
  };
}

const loggedGreet = logged(greet);
console.log(loggedGreet("민준", 16));`,
            out: `호출됨: [ '민준', 16 ]\n민준(16)`
          },
          after: `<div class="note"><b>왜 유용할까요</b> — 로깅, 캐싱처럼 "어떤 함수든 감싸서 기능을 덧붙이는" 유틸리티를 만들 때, 원본 함수의 타입 정보를 그대로 재사용해 타입 안전성을 유지할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>function greet(name: string, age: number): string { ... }</code>일 때, <code>Parameters&lt;typeof greet&gt;</code>의 결과 타입은? (튜플 형태로 쓰세요)`,
          prefix: '', suffix: '', accept: ['[string, number]'], placeholder: '타입',
          why: 'Parameters는 함수의 매개변수들을 튜플로 뽑아주므로, [string, number]가 돼요.',
          hint: '매개변수 순서 그대로 대괄호 튜플로 나열하세요.'
        }),
        () => makeChoice(
          'ReturnType<T>가 하는 역할은?',
          '함수 타입 T의 반환 타입을 뽑아낸다', ['함수의 매개변수 개수를 센다', '함수를 실제로 호출해서 반환값을 얻는다', '함수 이름을 문자열로 뽑아낸다'],
          'ReturnType은 실행이 아니라 타입 레벨에서, 함수가 반환하는 값의 타입을 뽑아줘요.',
          '"Return"이 반환을 뜻한다는 점에서 짐작해보세요.'
        ),
        () => makeChoice(
          '기존 함수를 감싸서 로깅 기능을 추가하는 유틸 함수를 만들 때, Parameters와 ReturnType을 함께 쓰는 이유는?',
          '원본 함수의 매개변수·반환 타입 정보를 다시 적지 않고 그대로 재사용해서 타입 안전성을 유지하려고',
          ['함수 실행 속도를 높이기 위해서', '매개변수 개수를 자동으로 줄이기 위해서', '함수를 async로 자동 변환하기 위해서'],
          '두 유틸리티를 조합하면 원본 함수의 시그니처를 그대로 재사용하면서 감싸는 함수를 만들 수 있어요.',
          '"타입을 다시 적지 않고 재사용한다"는 표현이 핵심이에요.'
        ),
        () => {
          const name = pick(['지수', '민준']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>function greet(name: string, age: number): string { return \`\${name}(\${age})\`; }</code>이고 <code>const args: Parameters&lt;typeof greet&gt; = ["${name}", ${age}];</code>일 때, <code>greet(...args)</code>의 결과는?`,
            prefix: '', suffix: '', accept: [`${name}(${age})`], placeholder: '값',
            why: `args를 펼쳐서 greet에 넘기면 "${name}(${age})"가 반환돼요.`,
            hint: '...args로 튜플을 펼쳐서 greet에 그대로 넘겨준다는 점을 떠올려보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>function add(a: number, b: number): number { return a + b; }</code>일 때, add와 똑같은 매개변수·반환 타입을 갖는 타입 별칭 두 개 <code>AddParams</code>(Parameters 사용)와 <code>AddResult</code>(ReturnType 사용)를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'type AddParams = Parameters<typeof add>;\ntype AddResult = ReturnType<typeof add>;',
          accept: ['type AddParams = Parameters<typeof add>;\ntype AddResult = ReturnType<typeof add>;'],
          why: 'Parameters<typeof add>와 ReturnType<typeof add>로 각각 매개변수 튜플과 반환 타입을 뽑아요.',
          hint: 'type AddParams = Parameters<typeof add>;\ntype AddResult = ReturnType<typeof add>; 를 쓰세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>function greet(name: string, age: number): string { return \`\${name}(\${age})\`; }</code>이고 <code>const args: Parameters&lt;typeof greet&gt; = ["${name}", ${age}];</code>일 때, <code>greet(...args)</code>의 결과는?`,
          prefix: '', suffix: '', accept: [`${name}(${age})`], placeholder: '값',
          why: `args가 펼쳐져 greet(${JSON.stringify(name)}, ${age})처럼 호출되어 "${name}(${age})"가 나와요.`,
          hint: '튜플을 펼쳐서 원래 함수를 호출한다고 생각하세요.'
        };
      }
    },
    {
      id: 'decoratorsBasics',
      title: '데코레이터 기초',
      ready: true,
      summary: '클래스와 메서드 앞에 @을 붙여, 코드를 고치지 않고도 부가 기능을 덧붙이는 데코레이터의 기본 개념을 배워요.',
      goals: ['@ 문법으로 데코레이터 적용하기', '메서드 데코레이터의 동작 원리', '데코레이터가 실제로 하는 일 이해하기'],
      blocks: [
        {
          h: '메서드 앞에 @을 붙이면',
          html: `<p>데코레이터는 클래스나 메서드 앞에 <code>@함수이름</code> 형태로 붙여서, 그 대상에 <b>추가 동작을 끼워 넣는</b> 함수예요. 메서드 데코레이터는 원래 메서드를 감싸는 새 함수로 바꿔치기할 수 있어요.</p>`,
          code: {
            label: 'decorator_method.ts',
            lang: 'typescript',
            src: `function log(target: any, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name);
  return function (this: any, ...args: any[]) {
    console.log(\`\${methodName} 호출됨\`);
    return target.call(this, ...args);
  };
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

const calc = new Calculator();
console.log(calc.add(3, 4));`,
            out: `add 호출됨\n7`
          }
        },
        {
          h: '클래스 데코레이터: 클래스 자체를 감싸기',
          html: `<p>클래스 앞에 붙이는 데코레이터는 클래스 자체를 매개변수로 받아서, 새로운 클래스로 바꾸거나 정적 속성을 덧붙이는 등의 작업을 할 수 있어요.</p>`,
          code: {
            label: 'decorator_class.ts',
            lang: 'typescript',
            src: `function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Config {
  timeout = 3000;
}`,
          },
          after: `<div class="note"><b>왜 유용할까요</b> — 로깅, 권한 검사, 캐싱처럼 여러 메서드에 공통으로 필요한 부가 기능을, 메서드 본문을 하나하나 고치지 않고 데코레이터 한 줄로 붙일 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `메서드 <code>add</code>에 <code>log</code>라는 데코레이터를 적용하는 문법을 쓰세요.`,
          prefix: 'class Calculator {\n  ', suffix: '\n  add(a: number, b: number): number { return a + b; }\n}', accept: ['@log'], placeholder: '데코레이터',
          why: '<code>@log</code>처럼 @ 기호와 데코레이터 함수 이름을 메서드 바로 위에 적어요.',
          hint: '골뱅이(@) 기호와 함수 이름을 붙여 쓰세요.'
        }),
        () => makeChoice(
          '메서드 데코레이터가 하는 일로 가장 알맞은 설명은?',
          '원래 메서드를 감싸는 새로운 함수로 바꿔치기해서, 호출 전후에 추가 동작을 끼워 넣을 수 있다',
          ['메서드의 매개변수 개수를 자동으로 바꾼다', '클래스를 완전히 다른 클래스로 대체한다', '메서드를 항상 비동기로 만든다'],
          '데코레이터는 원래 메서드(target)를 감싸는 새 함수를 반환해서, 호출 전후에 로깅 같은 부가 동작을 끼워 넣을 수 있어요.',
          '"감싼다", "끼워 넣는다"는 표현이 핵심이에요.'
        ),
        () => makeChoice(
          '데코레이터를 쓰는 가장 큰 이유는?',
          '여러 곳에서 공통으로 필요한 부가 기능(로깅, 캐싱 등)을 원본 코드를 고치지 않고 덧붙이기 위해',
          ['타입 검사를 완전히 꺼버리기 위해', '클래스를 인터페이스로 자동 변환하기 위해', '실행 속도를 항상 높이기 위해'],
          '데코레이터는 원본 메서드나 클래스의 본문은 그대로 둔 채, 바깥에서 부가 기능을 덧붙일 수 있게 해줘요.',
          '"원본을 고치지 않는다"는 점을 떠올려보세요.'
        ),
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>@log</code> 데코레이터가 붙은 <code>add(a, b)</code> 메서드를 <code>calc.add(${a}, ${b})</code>로 호출하면, 로그가 찍힌 뒤 반환되는 숫자는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `데코레이터는 로그만 추가로 찍을 뿐, 실제 계산 결과는 그대로 ${a} + ${b} = ${a + b}예요.`,
            hint: '데코레이터가 계산 자체를 바꾸는 건 아니라는 점을 떠올려보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '클래스 <code>Config</code>에 <code>@sealed</code> 데코레이터를 적용하는 코드를 작성하세요. (Config는 <code>timeout = 3000;</code> 속성 하나를 가짐)',
          starter: '',
          rows: 3,
          placeholder: '@sealed\nclass Config {\n  timeout = 3000;\n}',
          accept: ['@sealed\nclass Config {\n  timeout = 3000;\n}'],
          why: '클래스 선언 바로 위에 @sealed를 적으면 클래스 데코레이터가 적용돼요.',
          hint: '@sealed\\nclass Config { timeout = 3000; } 형태로 쓰세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 30), b = randInt(1, 30);
        return {
          type: 'blank',
          q: `<code>@log</code>가 붙은 <code>add(a, b)</code> 메서드를 <code>calc.add(${a}, ${b})</code>로 호출했을 때, 콘솔에 로그가 한 번 찍힌 뒤 반환되는 숫자는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
          why: `데코레이터는 부가 동작만 추가할 뿐 계산 로직은 그대로라서, ${a} + ${b} = ${a + b}예요.`,
          hint: '데코레이터가 있어도 원래 함수의 계산 결과는 바뀌지 않아요.'
        };
      }
    },
    {
      id: 'polymorphicThisTypes',
      title: '다형적 this 타입과 메서드 체이닝',
      ready: true,
      summary: '메서드가 자기 자신을 가리키는 this 타입을 반환하도록 만들어서, 자식 클래스에서도 안전하게 메서드 체이닝을 이어가는 법을 배워요.',
      goals: ['반환 타입으로서의 this 이해하기', '메서드 체이닝(fluent interface) 만들기', '상속 시에도 정확한 타입이 유지되는 이유'],
      blocks: [
        {
          h: 'this를 반환 타입으로 쓰기',
          html: `<p>메서드의 반환 타입을 <code>this</code>로 적으면, "이 메서드는 항상 자기 자신의 인스턴스를 반환한다"는 뜻이 돼요. 이러면 메서드를 점(.)으로 계속 이어 부르는 <b>메서드 체이닝</b>을 만들 수 있어요.</p>`,
          code: {
            label: 'this_return_basic.ts',
            lang: 'typescript',
            src: `class Builder {
  private parts: string[] = [];

  add(part: string): this {
    this.parts.push(part);
    return this;
  }

  build(): string {
    return this.parts.join(" ");
  }
}

const result = new Builder().add("안녕").add("하세요").build();
console.log(result);`,
            out: `안녕 하세요`
          }
        },
        {
          h: '상속받은 자식 클래스에서도 정확하게 유지돼요',
          html: `<p>반환 타입을 <code>Builder</code>처럼 구체적으로 적으면, 자식 클래스에서 체이닝했을 때 자식만의 메서드가 안 보일 수 있어요. 하지만 <code>this</code>로 적으면 <b>실제 호출한 인스턴스의 타입</b>을 그대로 유지해줘서, 자식 클래스 메서드까지 안전하게 이어 부를 수 있어요.</p>`,
          code: {
            label: 'this_return_inherit.ts',
            lang: 'typescript',
            src: `class SpecialBuilder extends Builder {
  shout(): this {
    console.log("짜잔!");
    return this;
  }
}

const r2 = new SpecialBuilder().add("안녕").shout().add("하세요").build();
console.log(r2);`,
            out: `짜잔!\n안녕 하세요`
          },
          after: `<div class="note"><b>비유</b> — this 반환 타입은 "누가 나를 불렀든, 부른 사람과 똑같은 타입으로 돌아간다"는 약속이에요. 그래서 자식 클래스가 불러도 자식 타입 그대로 이어져요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `메서드가 자기 자신의 인스턴스를 반환한다는 걸 나타내는 반환 타입 표기를 쓰세요. (예: add(part: string): ___)`,
          prefix: 'add(part: string): ', suffix: ' { this.parts.push(part); return this; }', accept: ['this'], placeholder: '타입',
          why: '<code>this</code>를 반환 타입으로 쓰면, 이 메서드가 항상 자기 자신의 인스턴스를 반환한다는 뜻이 돼요.',
          hint: '자바스크립트에서 "이 인스턴스"를 가리키는 그 키워드예요.'
        }),
        () => makeChoice(
          '메서드 반환 타입을 this로 적으면 얻는 장점은?',
          '자식 클래스가 상속받아 체이닝해도, 자식 클래스만의 타입과 메서드까지 안전하게 이어 부를 수 있다',
          ['메서드 실행 속도가 빨라진다', '메서드를 static으로 자동 변환해준다', '매개변수 타입 검사를 생략한다'],
          'this 반환 타입은 실제로 호출한 인스턴스의 타입을 그대로 유지해줘서, 자식 클래스에서도 체이닝이 안전하게 이어져요.',
          '"실제로 호출한 인스턴스의 타입을 유지한다"는 표현이 핵심이에요.'
        ),
        () => makeChoice(
          '반환 타입을 this 대신 구체적인 클래스 이름(Builder)으로 고정하면 생기는 문제는?',
          '자식 클래스에서 체이닝할 때, 자식 클래스만의 메서드가 안 보일 수 있다',
          ['부모 클래스의 메서드가 모두 사라진다', '컴파일이 항상 실패한다', '아무 문제도 생기지 않는다'],
          '반환 타입을 Builder로 고정하면, 자식 인스턴스로 호출해도 Builder 타입으로 취급돼서 자식만의 메서드에 접근할 수 없어요.',
          '반환 타입이 "고정된 이름"이면 실제 호출자가 누구인지 상관없이 그 타입으로 취급된다는 점을 생각해보세요.'
        ),
        () => {
          const w1 = pick(['안녕', '반가워']);
          const w2 = pick(['하세요', '요']);
          return {
            type: 'blank',
            q: `<code>class Builder { private parts: string[] = []; add(part: string): this { this.parts.push(part); return this; } build(): string { return this.parts.join(" "); } }</code>일 때, <code>new Builder().add("${w1}").add("${w2}").build()</code>의 결과는?`,
            prefix: '', suffix: '', accept: [`${w1} ${w2}`], placeholder: '값',
            why: `add를 호출할 때마다 parts 배열에 문자열이 쌓이고, build()가 공백으로 이어붙이므로 "${w1} ${w2}"가 돼요.`,
            hint: '각 add 호출로 추가된 문자열들이 공백으로 이어져요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>count</code>라는 number 속성(초기값 0)을 가지는 클래스 <code>Counter</code>에, 호출할 때마다 count를 1 증가시키고 <code>this</code>를 반환하는 메서드 <code>increment(): this</code>를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'class Counter {\n  count = 0;\n  increment(): this {\n    this.count++;\n    return this;\n  }\n}',
          accept: ['class Counter {\n  count = 0;\n  increment(): this {\n    this.count++;\n    return this;\n  }\n}'],
          why: 'increment 안에서 count를 늘리고 this를 반환하면, 메서드 체이닝이 가능해져요.',
          hint: 'increment(): this { this.count++; return this; } 형태로 작성하세요.'
        }),
      ],
      boss: () => {
        const w1 = pick(['안녕', '반가워', '환영해']);
        const w2 = pick(['하세요', '요', '!']);
        return {
          type: 'blank',
          q: `<code>class Builder { private parts: string[] = []; add(part: string): this { this.parts.push(part); return this; } build(): string { return this.parts.join(" "); } }</code>일 때, <code>new Builder().add("${w1}").add("${w2}").build()</code>의 결과는?`,
          prefix: '', suffix: '', accept: [`${w1} ${w2}`], placeholder: '값',
          why: `두 번의 add 호출로 쌓인 문자열이 공백으로 이어져 "${w1} ${w2}"가 돼요.`,
          hint: 'add가 호출된 순서대로 문자열이 공백을 사이에 두고 이어져요.'
        };
      }
    }],
  tierBoss: {
    beginner: () => ({
      type: 'code',
      q: '나이를 담는 변수 <code>age</code>(number, 값 17)를 선언하고, 두 수를 더해 반환하는 함수 <code>add</code>(매개변수 <code>a</code>, <code>b</code>와 반환값 모두 number)를 작성한 뒤, <code>console.log(add(age, 3));</code>을 실행하는 전체 코드를 작성하세요.',
      starter: '',
      rows: 5,
      placeholder: 'let age: number = 17;\n\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(add(age, 3));',
      accept: ['let age: number = 17;\n\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n\nconsole.log(add(age, 3));'],
      why: 'age는 17이고, add(age, 3)은 17 + 3 = 20을 반환해서 출력해요.',
      hint: 'let age: number = 17;을 먼저 쓰고, add 함수를 만든 뒤 호출·출력하세요.'
    }),
    intermediate: () => ({
      type: 'code',
      q: '<code>name</code>(string)과 <code>age</code>(number) 속성을 가지는 <code>Student</code> 인터페이스를 정의하세요. <code>id: number | string</code> 매개변수를 받아 <code>typeof id === "number"</code>이면 <code>"숫자 학번"</code>을, 아니면 <code>"문자 학번"</code>을 반환하는 함수 <code>checkId</code>도 작성하고, <code>const s: Student = { name: "지수", age: 17 };</code>를 만든 뒤 <code>console.log(checkId(101));</code>을 실행하는 전체 코드를 작성하세요.',
      starter: '',
      rows: 12,
      placeholder: 'interface Student {\n  name: string;\n  age: number;\n}\n\nfunction checkId(id: number | string) {\n  if (typeof id === "number") {\n    return "숫자 학번";\n  } else {\n    return "문자 학번";\n  }\n}\n\nconst s: Student = { name: "지수", age: 17 };\nconsole.log(checkId(101));',
      accept: ['interface Student {\n  name: string;\n  age: number;\n}\n\nfunction checkId(id: number | string) {\n  if (typeof id === "number") {\n    return "숫자 학번";\n  } else {\n    return "문자 학번";\n  }\n}\n\nconst s: Student = { name: "지수", age: 17 };\nconsole.log(checkId(101));'],
      why: 'Student 인터페이스로 객체 모양을 정하고, checkId는 유니언 타입을 typeof로 좁혀서 판단해요. 101은 number라서 "숫자 학번"이 출력돼요.',
      hint: 'interface Student를 먼저 만들고, checkId 함수(유니언 타입 매개변수 + typeof)를 작성한 뒤, 객체를 만들어 checkId를 호출하세요.'
    }),
    advanced: () => ({
      type: 'code',
      q: '배열을 받아 첫 번째 값을 반환하는 제네릭 함수 <code>firstItem&lt;T&gt;</code>(매개변수 <code>items: T[]</code>, 반환 타입 <code>T</code>)를 작성하세요. <code>const scores: number[] = [90, 85, 100];</code>를 만들고 <code>console.log(firstItem(scores));</code>를 실행하는 전체 코드를 작성하세요.',
      starter: '',
      rows: 6,
      placeholder: 'function firstItem<T>(items: T[]): T {\n  return items[0];\n}\n\nconst scores: number[] = [90, 85, 100];\nconsole.log(firstItem(scores));',
      accept: ['function firstItem<T>(items: T[]): T {\n  return items[0];\n}\n\nconst scores: number[] = [90, 85, 100];\nconsole.log(firstItem(scores));'],
      why: 'firstItem은 배열의 첫 번째 값을 반환하는 제네릭 함수라서, scores[0]인 90이 출력돼요.',
      hint: 'firstItem<T> 제네릭 함수를 만들고, number[] 배열을 만들어 그 함수에 넘겨보세요.'
    }),
  }
};
