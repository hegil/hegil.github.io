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
