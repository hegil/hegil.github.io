/* TypeScript 강의·문제 데이터 — 단원을 추가하려면 units 배열에 항목을 넣으면 됩니다. */
COURSES.typescript = {
    name: 'TypeScript',
    tagline: '이미 배운 JavaScript에 "타입"을 더해서, 실수를 미리 잡아주는 언어',
    units: [{
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
