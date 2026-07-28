/* C# (일반 프로그래밍) 강의·문제 데이터 — 단원을 추가하려면 units 배열에 항목을 넣으면 됩니다.
   주의: 이 파일은 게임 엔진(Unity)과 무관한 "범용 C# 언어/표준 라이브러리" 강좌예요.
   Unity(C#) 강좌(js/data/unity.js, COURSES.unity)와는 완전히 별개의 강좌(COURSES.csharp)입니다. */
COURSES.csharp = {
    name: 'C#',
    tagline: '유니티가 아닌, .NET 백엔드·데스크톱·엔터프라이즈 소프트웨어를 만드는 범용 C# 언어와 표준 라이브러리',
    units: [{
      id: 'intro',
      title: 'C#은 어떤 언어인가요?',
      ready: true,
      intro: true,
      summary: 'C#이 무엇이고, 어디에 쓰이고, 유니티 과정과 뭐가 다른지 알아봐요.',
      blocks: [
        {
          h: 'C#은 어떤 언어인가요?',
          html: `<p>C#은 2000년, 마이크로소프트가 자바에 대응해 만든 언어예요. .NET이라는 생태계 위에서 동작하고, 문법이 깔끔하며 최신 기능이 꾸준히 추가되고 있어요.</p>`
        },
        {
          h: '어디에 쓰이나요?',
          html: `<p>윈도우 데스크톱 앱, 기업용 백엔드 서버(ASP.NET), 그리고 유니티 게임 엔진의 스크립트 언어로도 널리 쓰여요.</p>`
        },
        {
          h: '이 과정과 유니티 과정은 뭐가 다른가요?',
          html: `<p>이 과정은 게임 엔진과 상관없이, C# 언어 자체와 표준 라이브러리(클래스, LINQ, async/await 등)를 다뤄요. 게임 개발에 쓰이는 유니티 API가 궁금하다면 별도의 "Unity(C#)" 과정을 들어보세요.</p>`,
          after: `<div class="note"><b>팁</b> — 이 단원은 읽기만 하면 되고, 문제나 예제는 없어요. 다음 단원부터 진짜 코드를 써보기 시작해요!</div>`
        }
      ]
    },
    {
      id: 'helloWorldAndComments',
      title: 'Hello, World! 와 주석',
      ready: true,
      summary: 'C# 콘솔 프로그램의 기본 구조와 주석 문법을 배워요.',
      goals: ['Main 메서드의 역할 이해하기', 'Console.WriteLine으로 출력하기', '한 줄/여러 줄 주석 쓰기'],
      blocks: [
        {
          h: '모든 C# 프로그램의 시작점: Main',
          html: `<p>C# 콘솔 프로그램은 <code>Main</code>이라는 메서드에서 실행이 시작돼요. <code>using System;</code>은 <code>Console</code> 같은 기본 클래스를 쓰기 위한 선언이고, <code>Console.WriteLine(...)</code>은 화면에 글자를 출력하고 줄바꿈까지 해줘요.</p>`,
          code: {
            label: 'Program.cs',
            lang: 'csharp',
            src: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
    }
}`,
            out: `Hello, World!`
          }
        },
        {
          h: '주석: 컴파일러가 무시하는 메모',
          html: `<p><code>//</code>는 한 줄 주석, <code>/* ... */</code>는 여러 줄 주석이에요. 주석은 실행에 전혀 영향을 주지 않고, 사람이 읽을 설명을 남기는 용도예요.</p>`,
          code: {
            label: 'Comments.cs',
            lang: 'csharp',
            src: `using System;

class Program
{
    static void Main()
    {
        // 이 줄은 실행되지 않아요
        Console.WriteLine("실행됨"); // 줄 끝에도 쓸 수 있어요
        /* 여러 줄
           주석도 가능해요 */
    }
}`,
            out: `실행됨`
          },
          after: `<div class="note"><b>정리</b> — C#은 세미콜론(;)으로 문장을 끝내고, 코드 블록은 중괄호 <code>{ }</code>로 감싸요. Unity 게임 코드가 아닌 일반 콘솔 프로그램에서도 이 기본 구조는 똑같아요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'C# 콘솔 프로그램의 실행이 시작되는 메서드 이름은?',
          'Main', ['Start', 'Run', 'Init'],
          '모든 C# 실행 파일은 <code>static void Main()</code>에서 시작해요.',
          '대문자로 시작하는 이름이에요.'
        ),
        () => ({
          type: 'blank',
          q: `화면에 글자를 출력하고 줄바꿈까지 하는 C# 메서드 이름을 쓰세요. (Console.___)`,
          prefix: 'Console.', suffix: '("Hi");', accept: ['WriteLine'], placeholder: '메서드 이름',
          why: '<code>Console.WriteLine</code>은 값을 출력한 뒤 줄바꿈까지 해줘요.',
          hint: '"Write" 뒤에 "Line"이 붙어요.'
        }),
        () => makeChoice(
          'C#에서 한 줄 주석을 시작하는 기호는?',
          '//', ['#', '--', '\'\''],
          'C#의 한 줄 주석은 <code>//</code>로 시작해요.',
          'Java, C++과 같은 기호예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>Console</code> 클래스 등 기본 기능을 쓰기 위해 파일 맨 위에 적는 선언을 쓰세요. (___ System;)`,
          prefix: '', suffix: ' System;', accept: ['using'], placeholder: '키워드',
          why: '<code>using System;</code>은 System 네임스페이스의 기능을 짧은 이름으로 쓸 수 있게 해줘요.',
          hint: '"사용하다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>Main</code> 메서드 안에서 <code>Console.WriteLine</code>으로 <code>"Hello, C#!"</code>을 출력하는 전체 프로그램을 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: 'using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Hello, C#!");\n    }\n}',
          accept: ['using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Hello, C#!");\n    }\n}'],
          why: 'class Program 안의 static void Main() 블록 안에 Console.WriteLine("Hello, C#!"); 한 줄을 넣으면 돼요.',
          hint: 'using System; 다음 class Program { static void Main() { Console.WriteLine("Hello, C#!"); } } 형태예요.'
        }),
      ],
      boss: () => ({
        type: 'blank',
        q: `<code>Console.WriteLine("코드공방");</code>을 실행하면 화면에 무엇이 출력될까요? (그대로 입력)`,
        prefix: '', suffix: '', accept: ['코드공방'], placeholder: '출력 결과',
        why: 'Console.WriteLine은 괄호 안 문자열을 그대로 출력하고 줄바꿈을 추가해요.',
        hint: '따옴표 안의 글자를 그대로 출력해요.'
      })
    },
    {
      id: 'variablesAndDataTypes',
      title: '변수와 기본 데이터 타입',
      ready: true,
      summary: 'C#은 정적 타입 언어로, 변수를 선언할 때 타입을 명시해요.',
      goals: ['int, double, bool, char, string 타입 알기', '변수 선언과 초기화하기', 'var로 타입 추론 이해하기'],
      blocks: [
        {
          h: '기본 타입: int, double, bool, char, string',
          html: `<p>C#은 컴파일 시점에 타입이 정해지는 <b>정적 타입</b> 언어예요. <code>int</code>(정수), <code>double</code>(실수), <code>bool</code>(참/거짓), <code>char</code>(문자 하나), <code>string</code>(문자열)이 가장 자주 쓰는 기본 타입이에요.</p>`,
          code: {
            label: 'Types.cs',
            lang: 'csharp',
            src: `int age = 17;
double price = 3.5;
bool isAdult = false;
char grade = 'A';
string name = "지수";

Console.WriteLine(age);
Console.WriteLine(price);
Console.WriteLine(isAdult);
Console.WriteLine(grade);
Console.WriteLine(name);`,
            out: `17
3.5
False
A
지수`
          }
        },
        {
          h: 'var: 타입 추론',
          html: `<p><code>var</code>로 선언하면 컴파일러가 오른쪽 값을 보고 타입을 스스로 추론해줘요. 하지만 <b>타입이 없어지는 게 아니라</b> 여전히 정적 타입이고, 한 번 정해진 타입은 바뀌지 않아요.</p>`,
          code: {
            label: 'VarInference.cs',
            lang: 'csharp',
            src: `var age = 17;      // int로 추론됨
var name = "지수";  // string으로 추론됨
Console.WriteLine(age + 1);
Console.WriteLine(name);`,
            out: `18
지수`
          },
          after: `<div class="note"><b>정리</b> — <code>var</code>는 코드를 짧게 써주는 문법 설탕일 뿐, 동적 타입 언어의 변수와는 달라요. 초기값이 있어야만 타입을 추론할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '참/거짓 값을 저장하는 C# 타입은?',
          'bool', ['bit', 'boolean', 'flag'],
          'C#에서 참/거짓은 <code>bool</code> 타입으로 표현해요(true 또는 false).',
          'Java의 boolean과 이름이 살짝 달라요.'
        ),
        () => ({
          type: 'blank',
          q: `문자 하나를 저장하는 C# 타입 이름을 쓰세요. (예: ___ grade = 'A';)`,
          prefix: '', suffix: ` grade = 'A';`, accept: ['char'], placeholder: '타입 이름',
          why: '<code>char</code>는 작은따옴표로 감싼 문자 하나를 저장하는 타입이에요.',
          hint: '"문자"를 뜻하는 영어 단어의 줄임말이에요.'
        }),
        () => {
          const age = randInt(10, 30);
          return {
            type: 'blank',
            q: `<code>var age = ${age}; Console.WriteLine(age + 1);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(age + 1)], placeholder: '숫자',
            why: `var는 초기값 ${age}를 보고 int로 추론하므로, age + 1은 ${age + 1}이 돼요.`,
            hint: '정수에 1을 더한 값이에요.'
          };
        },
        () => makeChoice(
          '<code>var</code> 키워드에 대한 설명으로 옳은 것은?',
          '초기값을 보고 컴파일러가 타입을 추론하지만, 이후 타입은 바뀌지 않는다', ['타입 없이 아무 값이나 넣을 수 있는 동적 타입이다', 'string 전용 키워드다', '항상 double로 추론된다'],
          'var는 정적 타입 언어의 타입 추론 문법이라, 한 번 추론된 타입은 그대로 고정돼요.',
          'C#은 끝까지 정적 타입 언어예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>int age = 20;</code>과 <code>string name = "민준";</code>을 선언하고, <code>Console.WriteLine(name);</code>과 <code>Console.WriteLine(age);</code>을 차례로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'int age = 20;\nstring name = "민준";\nConsole.WriteLine(name);\nConsole.WriteLine(age);',
          accept: ['int age = 20;\nstring name = "민준";\nConsole.WriteLine(name);\nConsole.WriteLine(age);'],
          why: '두 변수를 각각 선언한 뒤, 원하는 순서대로 Console.WriteLine에 넘기면 돼요.',
          hint: 'int age = 20; string name = "민준"; 다음 Console.WriteLine(name); Console.WriteLine(age);'
        }),
      ],
      boss: () => {
        const price = (randInt(10, 50) / 2).toFixed(1);
        return {
          type: 'blank',
          q: `<code>double price = ${price}; Console.WriteLine(price);</code>를 실행하면 무엇이 출력될까요?`,
          prefix: '', suffix: '', accept: [String(price)], placeholder: '출력 결과',
          why: 'double 변수를 그대로 출력하면 저장된 실수 값이 그대로 출력돼요.',
          hint: '변수에 대입한 값이 그대로 나와요.'
        };
      }
    },
    {
      id: 'stringInterpolationBasics',
      title: '문자열 보간과 연결',
      ready: true,
      summary: '$"" 문자열 보간으로 변수 값을 문자열 안에 깔끔하게 끼워 넣어요.',
      goals: ['+ 로 문자열 연결하기', '$"{ }" 문자열 보간 문법 익히기', '보간 문자열 안에서 식(연산) 쓰기'],
      blocks: [
        {
          h: '+ 연산자로 문자열 연결',
          html: `<p><code>+</code>로 문자열끼리, 또는 문자열과 값을 이어붙일 수 있어요. 하지만 변수가 많아지면 <code>+</code>가 계속 반복되어 읽기 불편해져요.</p>`,
          code: {
            label: 'Concat.cs',
            lang: 'csharp',
            src: `string name = "지수";
int age = 17;
Console.WriteLine("이름: " + name + ", 나이: " + age);`,
            out: `이름: 지수, 나이: 17`
          }
        },
        {
          h: '$"": 문자열 보간(interpolation)',
          html: `<p>문자열 앞에 <code>$</code>를 붙이면, <code>{ }</code> 중괄호 안에 변수나 식을 바로 넣을 수 있어요. <code>+</code>를 나열하는 것보다 훨씬 읽기 쉬워요.</p>`,
          code: {
            label: 'Interpolation.cs',
            lang: 'csharp',
            src: `string name = "지수";
int age = 17;
Console.WriteLine($"이름: {name}, 나이: {age}, 내년: {age + 1}");`,
            out: `이름: 지수, 나이: 17, 내년: 18`
          },
          after: `<div class="note"><b>정리</b> — C#의 보간 문자열은 <code>$"{ }"</code> 형태예요. 다른 언어의 <code>\${ }</code>와 헷갈리지 않게 조심하세요 — C#은 <code>$</code>가 따옴표 <b>앞</b>에 붙어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'C#에서 문자열 보간을 시작할 때 문자열 앞에 붙이는 기호는?',
          '$', ['#', '@', '%'],
          '<code>$"...{ }..."</code>처럼 문자열 앞에 <code>$</code>를 붙이면 보간 문자열이 돼요.',
          '따옴표 바로 앞에 붙는 기호예요.'
        ),
        () => ({
          type: 'blank',
          q: `변수 <code>age</code>의 값을 문자열 안에 끼워 넣으려면 중괄호를 어떻게 써야 하나요? (예: $"나이: ___")`,
          prefix: '$"나이: ', suffix: '"', accept: ['{age}'], placeholder: '중괄호 표현',
          why: '보간 문자열 안에서는 <code>{age}</code>처럼 중괄호로 변수를 감싸요.',
          hint: '중괄호 안에 변수 이름을 그대로 써요.'
        }),
        () => {
          const a = randInt(1, 10), b = randInt(1, 10);
          return {
            type: 'blank',
            q: `<code>int a = ${a}, b = ${b}; Console.WriteLine($"합: {a + b}");</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [`합: ${a + b}`], placeholder: '출력 결과',
            why: `보간 문자열 안의 {a + b}는 식으로 계산되어 ${a + b}가 출력돼요.`,
            hint: '중괄호 안의 식이 먼저 계산돼요.'
          };
        },
        () => makeChoice(
          '보간 문자열 <code>$"{ }"</code>에 대한 설명으로 옳은 것은?',
          '중괄호 안에 변수뿐 아니라 계산식도 넣을 수 있다', ['중괄호 안에는 변수 이름만 넣을 수 있다', '$ 기호는 따옴표 뒤에 붙는다', 'JavaScript의 ${ }와 문법이 완전히 같다'],
          '<code>{age + 1}</code>처럼 보간 문자열 중괄호 안에는 어떤 식이든 넣을 수 있어요.',
          '중괄호는 사실상 하나의 표현식 슬롯이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>string city = "서울";</code>과 <code>int temp = 25;</code>를 선언하고, 보간 문자열로 <code>"서울의 기온: 25도"</code>를 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'string city = "서울";\nint temp = 25;\nConsole.WriteLine($"{city}의 기온: {temp}도");',
          accept: ['string city = "서울";\nint temp = 25;\nConsole.WriteLine($"{city}의 기온: {temp}도");'],
          why: '보간 문자열 안에 {city}와 {temp}를 넣으면 값이 그대로 치환돼요.',
          hint: '$"{city}의 기온: {temp}도" 형태로 써보세요.'
        }),
      ],
      boss: () => {
        const n = randInt(2, 9);
        return {
          type: 'blank',
          q: `<code>int n = ${n}; Console.WriteLine($"{n}의 제곱은 {n * n}");</code>을 실행하면?`,
          prefix: '', suffix: '', accept: [`${n}의 제곱은 ${n * n}`], placeholder: '출력 결과',
          why: `보간 문자열의 {n * n}이 먼저 계산되어 ${n * n}으로 치환돼요.`,
          hint: '중괄호 안 곱셈을 먼저 계산하세요.'
        };
      }
    },
    {
      id: 'consoleIOAndConversion',
      title: '입력받기와 타입 변환',
      ready: true,
      summary: 'Console.ReadLine으로 입력을 받고, int.Parse/Convert로 타입을 변환해요.',
      goals: ['Console.ReadLine으로 문자열 입력받기', 'int.Parse / Convert.ToInt32로 변환하기', 'TryParse로 안전하게 변환하기'],
      blocks: [
        {
          h: 'Console.ReadLine: 항상 문자열',
          html: `<p><code>Console.ReadLine()</code>은 사용자가 입력한 한 줄을 <b>항상 string으로</b> 돌려줘요. 숫자로 계산하려면 반드시 변환 과정이 필요해요.</p>`,
          code: {
            label: 'ReadInput.cs',
            lang: 'csharp',
            src: `Console.Write("이름을 입력하세요: ");
string name = Console.ReadLine();
Console.WriteLine($"안녕하세요, {name}님!");`,
            out: `이름을 입력하세요: (입력값에 따라 인사말 출력)`
          }
        },
        {
          h: 'int.Parse / Convert.ToInt32 / TryParse',
          html: `<p><code>int.Parse(s)</code>나 <code>Convert.ToInt32(s)</code>는 문자열을 정수로 바꿔줘요. 하지만 숫자가 아닌 문자열을 넣으면 예외가 발생해요. 실패해도 프로그램이 멈추지 않게 하려면 <code>int.TryParse</code>를 써서 성공 여부를 bool로 받을 수 있어요.</p>`,
          code: {
            label: 'ParseConvert.cs',
            lang: 'csharp',
            src: `string input = "17";
int age = int.Parse(input);
Console.WriteLine(age + 1);

bool ok = int.TryParse("abc", out int result);
Console.WriteLine(ok);
Console.WriteLine(result);`,
            out: `18
False
0`
          },
          after: `<div class="note"><b>정리</b> — 사용자 입력을 다룰 때는 <code>int.Parse</code>보다 <code>int.TryParse</code>가 더 안전해요. 실패해도 예외 대신 <code>false</code>를 돌려주기 때문이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>Console.ReadLine()</code>이 항상 돌려주는 타입은?',
          'string', ['int', 'double', 'bool'],
          'Console.ReadLine()은 입력된 한 줄을 언제나 문자열로 돌려줘요.',
          '숫자를 입력해도 결과 타입은 바뀌지 않아요.'
        ),
        () => ({
          type: 'blank',
          q: `문자열을 정수로 변환하되, 실패하면 예외 대신 <code>false</code>를 돌려주는 메서드 이름을 쓰세요. (int.___)`,
          prefix: 'int.', suffix: '("abc", out int r);', accept: ['TryParse'], placeholder: '메서드 이름',
          why: '<code>int.TryParse</code>는 변환 성공 여부를 bool로 돌려주고, 성공 시 out 매개변수에 값을 담아요.',
          hint: '"시도해보다"라는 뜻의 단어가 이름에 들어가요.'
        }),
        () => makeChoice(
          '<code>int.Parse("abc")</code>를 실행하면 어떻게 되나요?',
          '변환할 수 없어 예외(FormatException)가 발생한다', ['0을 반환한다', 'null을 반환한다', '자동으로 "abc"를 그대로 반환한다'],
          '"abc"는 숫자가 아니므로 int.Parse는 FormatException 예외를 던져요.',
          'Parse는 실패를 조용히 넘어가지 않아요.'
        ),
        () => {
          const n = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>string s = "${n}"; int n = int.Parse(s); Console.WriteLine(n * 2);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n * 2)], placeholder: '숫자',
            why: `int.Parse("${n}")은 정수 ${n}이 되고, 그 두 배는 ${n * 2}예요.`,
            hint: '문자열을 정수로 바꾼 뒤 2를 곱해요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>"25"</code>라는 문자열을 <code>int.Parse</code>로 정수로 변환해 <code>age</code>에 저장하고, <code>Console.WriteLine(age + 1);</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'string s = "25";\nint age = int.Parse(s);\nConsole.WriteLine(age + 1);',
          accept: ['string s = "25";\nint age = int.Parse(s);\nConsole.WriteLine(age + 1);'],
          why: 'int.Parse(s)로 문자열을 정수로 바꾼 뒤, 계산해서 출력하면 돼요.',
          hint: 'int.Parse("25")는 정수 25가 돼요.'
        }),
      ],
      boss: () => {
        const bad = pick(['abc', '스물', 'x1']);
        return {
          type: 'blank',
          q: `<code>bool ok = int.TryParse("${bad}", out int result); Console.WriteLine(ok); Console.WriteLine(result);</code>를 실행하면 두 줄이 각각 무엇일까요? (형식: False\\n0)`,
          prefix: '', suffix: '', accept: ['False\n0'], placeholder: '출력 결과',
          why: `"${bad}"는 숫자가 아니라서 변환에 실패하고, ok는 False, result는 기본값 0이 돼요.`,
          hint: '변환 실패 시 out 변수는 기본값(0)이 돼요.'
        };
      }
    },
    {
      id: 'arithmeticAndOperators',
      title: '산술·비교·논리 연산자',
      ready: true,
      summary: '숫자 계산, 값 비교, 논리 결합에 쓰는 연산자들을 배워요.',
      goals: ['+ - * / % 산술 연산자 알기', '== != > < 등 비교 연산자 알기', '&& || ! 논리 연산자 알기'],
      blocks: [
        {
          h: '산술 연산자와 정수 나눗셈',
          html: `<p><code>+ - * /</code>는 사칙연산, <code>%</code>는 나머지예요. 주의할 점: <code>int / int</code>는 소수점을 버린 <b>정수 나눗셈</b>이에요. 실수 결과가 필요하면 둘 중 하나를 <code>double</code>로 만들어야 해요.</p>`,
          code: {
            label: 'Arithmetic.cs',
            lang: 'csharp',
            src: `int a = 7, b = 2;
Console.WriteLine(a / b);       // 정수 나눗셈
Console.WriteLine(a % b);       // 나머지
Console.WriteLine((double)a / b); // 실수 나눗셈`,
            out: `3
1
3.5`
          }
        },
        {
          h: '비교 연산자와 논리 연산자',
          html: `<p><code>==</code>는 같음, <code>!=</code>는 다름, <code>&gt; &lt; &gt;= &lt;=</code>는 크기 비교를 해요. 결과는 항상 <code>bool</code>이에요. 여러 조건을 합칠 때는 <code>&amp;&amp;</code>(그리고), <code>||</code>(또는), <code>!</code>(부정)을 써요.</p>`,
          code: {
            label: 'Logical.cs',
            lang: 'csharp',
            src: `int age = 17;
bool hasTicket = true;
Console.WriteLine(age >= 18);
Console.WriteLine(age < 18 && hasTicket);
Console.WriteLine(age < 18 || hasTicket);
Console.WriteLine(!hasTicket);`,
            out: `False
True
True
False`
          },
          after: `<div class="note"><b>정리</b> — C#은 대입(<code>=</code>)과 비교(<code>==</code>)를 엄격히 구분해요. <code>if (age = 18)</code>처럼 쓰면 컴파일 오류가 나서, 실수로 조건 안에서 대입해버리는 흔한 버그를 미리 막아줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(10, 20), b = randInt(2, 5);
          return {
            type: 'blank',
            q: `<code>int a = ${a}, b = ${b}; Console.WriteLine(a % b);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a % b)], placeholder: '숫자',
            why: `${a} % ${b}의 나머지는 ${a % b}예요.`,
            hint: '나눈 뒤 남는 값이에요.'
          };
        },
        () => makeChoice(
          '<code>int a = 7, b = 2; Console.WriteLine(a / b);</code>의 결과는?',
          '3', ['3.5', '4', '1'],
          'int끼리의 나눗셈은 소수점을 버리는 정수 나눗셈이라 7 / 2는 3이에요.',
          '실수 결과가 아니라 정수 결과예요.'
        ),
        () => ({
          type: 'blank',
          q: `"같다"를 비교하는 C# 연산자를 쓰세요. (대입 기호 =와 구분되는 것)`,
          prefix: '', suffix: '', accept: ['=='], placeholder: '연산자',
          why: '<code>==</code>는 값이 같은지 비교하고, <code>=</code>는 값을 대입해요.',
          hint: '등호가 두 번 연속으로 나와요.'
        }),
        () => makeChoice(
          '<code>bool a = true, b = false; Console.WriteLine(a && b);</code>의 결과는?',
          'False', ['True', '1', '0'],
          '&&는 두 값이 모두 true여야 true예요. b가 false라서 전체 결과는 False예요.',
          '하나라도 false면 &&는 false예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>int age = 20;</code>을 선언하고, <code>age가 18 이상인지</code>를 <code>bool</code> 변수 <code>isAdult</code>에 저장한 뒤 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'int age = 20;\nbool isAdult = age >= 18;\nConsole.WriteLine(isAdult);',
          accept: ['int age = 20;\nbool isAdult = age >= 18;\nConsole.WriteLine(isAdult);'],
          why: 'age >= 18의 결과인 bool 값을 변수에 저장한 뒤 출력하면 돼요.',
          hint: 'age >= 18은 True 또는 False를 반환해요.'
        }),
      ],
      boss: () => {
        const a = randInt(15, 25);
        return {
          type: 'blank',
          q: `<code>int age = ${a}; Console.WriteLine(age >= 18 && age < 65);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(a >= 18 && a < 65)], placeholder: 'True 또는 False',
          why: `age가 18 이상이고 65 미만인지 확인하면 ${a >= 18 && a < 65}예요.`,
          hint: '두 조건 모두 참이어야 전체가 True예요.'
        };
      }
    },
    {
      id: 'ifElseBranching',
      title: 'if / else if / else 분기',
      ready: true,
      summary: '조건에 따라 서로 다른 코드를 실행하는 분기문을 배워요.',
      goals: ['if / else 기본 구조 이해하기', 'else if로 여러 조건 연결하기', '중첩 if문 다루기'],
      blocks: [
        {
          h: 'if / else 기본',
          html: `<p><code>if (조건)</code> 뒤 중괄호 블록은 조건이 <code>true</code>일 때만 실행돼요. <code>else</code> 블록은 조건이 <code>false</code>일 때 실행돼요.</p>`,
          code: {
            label: 'IfElse.cs',
            lang: 'csharp',
            src: `int age = 17;
if (age >= 18)
{
    Console.WriteLine("성인");
}
else
{
    Console.WriteLine("미성년자");
}`,
            out: `미성년자`
          }
        },
        {
          h: 'else if: 여러 조건 연결하기',
          html: `<p>조건이 세 가지 이상 나뉠 때는 <code>else if</code>를 연결해요. 위에서부터 순서대로 검사하다가, 처음으로 <code>true</code>인 조건의 블록만 실행돼요.</p>`,
          code: {
            label: 'ElseIf.cs',
            lang: 'csharp',
            src: `int score = 85;
if (score >= 90)
{
    Console.WriteLine("A");
}
else if (score >= 80)
{
    Console.WriteLine("B");
}
else
{
    Console.WriteLine("C");
}`,
            out: `B`
          },
          after: `<div class="note"><b>정리</b> — <code>else if</code>는 위에서부터 순서대로 검사되므로, 조건 순서가 결과에 영향을 줄 수 있어요. 범위 조건은 보통 큰 값부터 검사해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const age = randInt(10, 25);
          return {
            type: 'blank',
            q: `<code>int age = ${age}; if (age >= 18) Console.WriteLine("성인"); else Console.WriteLine("미성년자");</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [age >= 18 ? '성인' : '미성년자'], placeholder: '출력 결과',
            why: `age(${age})가 18 이상이면 "성인", 아니면 "미성년자"가 출력돼요.`,
            hint: '18 이상인지 아닌지를 먼저 판단하세요.'
          };
        },
        () => makeChoice(
          '<code>if (a) { } else if (b) { } else { }</code>에서 a와 b가 모두 true일 때 실행되는 블록은?',
          'a 블록만 실행된다', ['b 블록만 실행된다', 'else 블록만 실행된다', '세 블록이 모두 실행된다'],
          '위에서부터 검사하다가 처음 true인 조건의 블록만 실행하고 나머지는 건너뛰어요.',
          '먼저 만족한 조건에서 멈춰요.'
        ),
        () => ({
          type: 'blank',
          q: `조건이 거짓일 때 실행할 코드를 적는 키워드를 쓰세요. (if 다음에 오는 것)`,
          prefix: 'if (a) { } ', suffix: ' { }', accept: ['else'], placeholder: '키워드',
          why: '<code>else</code> 블록은 if의 조건이 false일 때 실행돼요.',
          hint: '"그렇지 않으면"이라는 뜻이에요.'
        }),
        () => {
          const score = randInt(60, 100);
          let grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'D';
          return {
            type: 'blank',
            q: `<code>int score = ${score};</code>일 때, 90 이상 A, 80 이상 B, 70 이상 C, 그 외 D를 매기는 if/else if/else 결과는? (문자만 쓰세요)`,
            prefix: '', suffix: '', accept: [grade], placeholder: '등급',
            why: `score(${score})는 등급 ${grade}에 해당해요.`,
            hint: '큰 값부터 순서대로 확인해보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>int temp = 5;</code>를 선언하고, 0보다 크면 "영상", 0이면 "영도", 그 외에는 "영하"를 출력하는 if/else if/else문을 작성하세요.',
          starter: '',
          rows: 8,
          placeholder: 'int temp = 5;\nif (temp > 0)\n{\n    Console.WriteLine("영상");\n}\nelse if (temp == 0)\n{\n    Console.WriteLine("영도");\n}\nelse\n{\n    Console.WriteLine("영하");\n}',
          accept: ['int temp = 5;\nif (temp > 0)\n{\n    Console.WriteLine("영상");\n}\nelse if (temp == 0)\n{\n    Console.WriteLine("영도");\n}\nelse\n{\n    Console.WriteLine("영하");\n}'],
          why: '조건을 큰 순서(양수, 0, 나머지)로 나누어 판단하면 돼요.',
          hint: 'if (temp > 0) ... else if (temp == 0) ... else ...'
        }),
      ],
      boss: () => {
        const age = randInt(0, 100);
        const result = age < 13 ? '어린이' : age < 20 ? '청소년' : '성인';
        return {
          type: 'blank',
          q: `<code>int age = ${age};</code>일 때, 13 미만은 "어린이", 20 미만은 "청소년", 그 외는 "성인"을 출력하는 if/else if/else의 결과는?`,
          prefix: '', suffix: '', accept: [result], placeholder: '출력 결과',
          why: `age(${age})는 ${result}에 해당해요.`,
          hint: '조건을 순서대로 하나씩 확인해보세요.'
        };
      }
    },
    {
      id: 'switchStatementAndExpression',
      title: 'switch 문과 switch 식',
      ready: true,
      summary: '여러 값을 분기하는 전통적인 switch문과, C# 8의 간결한 switch 식을 배워요.',
      goals: ['switch 문의 case/break/default 구조 익히기', 'switch 식(=> 화살표)으로 간결하게 쓰기', 'when 조건과 패턴 활용 맛보기'],
      blocks: [
        {
          h: 'switch 문: case와 break',
          html: `<p>전통적인 <code>switch</code> 문은 값을 여러 <code>case</code>와 비교해요. C#에서는 각 case가 끝날 때 <code>break;</code>가 필요하고(자동으로 다음 case로 떨어지지 않아요), 어떤 case에도 해당하지 않으면 <code>default</code>가 실행돼요.</p>`,
          code: {
            label: 'SwitchStatement.cs',
            lang: 'csharp',
            src: `int day = 3;
switch (day)
{
    case 1:
        Console.WriteLine("월요일");
        break;
    case 2:
        Console.WriteLine("화요일");
        break;
    case 3:
        Console.WriteLine("수요일");
        break;
    default:
        Console.WriteLine("그 외");
        break;
}`,
            out: `수요일`
          }
        },
        {
          h: 'switch 식(expression): 값을 바로 돌려주기',
          html: `<p>C# 8부터는 <code>switch</code>를 <b>식</b>으로 써서 값을 바로 변수에 대입할 수 있어요. <code>case값 =&gt; 결과값,</code> 형태로 훨씬 간결하게 쓸 수 있고, <code>_</code>는 default 역할을 해요.</p>`,
          code: {
            label: 'SwitchExpression.cs',
            lang: 'csharp',
            src: `int day = 3;
string name = day switch
{
    1 => "월요일",
    2 => "화요일",
    3 => "수요일",
    _ => "그 외"
};
Console.WriteLine(name);`,
            out: `수요일`
          },
          after: `<div class="note"><b>정리</b> — switch 문은 여러 문장(statement)을 실행할 때, switch 식은 하나의 값을 바로 계산해서 돌려줄 때 적합해요. 요즘 C# 코드에서는 값 계산에는 switch 식을 많이 선호해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '전통적인 switch 문에서 각 case의 끝에 필요한 키워드는?',
          'break', ['continue', 'return', 'stop'],
          '<code>break;</code>가 없으면 다음 case로 실행이 흘러 들어가는 컴파일 오류가 나요(다른 언어와 달리 명시적 처리가 필요해요).',
          '반복문에서도 쓰는 그 키워드예요.'
        ),
        () => ({
          type: 'blank',
          q: `switch 식에서 "그 외 모든 경우"를 나타내는 기호를 쓰세요. (예: ___ => "기타")`,
          prefix: '', suffix: ' => "기타"', accept: ['_'], placeholder: '기호',
          why: '<code>_</code>는 switch 식에서 default 역할을 하는 와일드카드 패턴이에요.',
          hint: '밑줄 기호 하나예요.'
        }),
        () => {
          const day = randInt(1, 5);
          const names = ['월요일', '화요일', '수요일', '목요일', '금요일'];
          return {
            type: 'blank',
            q: `<code>int day = ${day}; string name = day switch { 1 => "월요일", 2 => "화요일", 3 => "수요일", 4 => "목요일", 5 => "금요일", _ => "주말" }; Console.WriteLine(name);</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [names[day - 1]], placeholder: '출력 결과',
            why: `day가 ${day}이므로 "${names[day - 1]}"이 출력돼요.`,
            hint: '숫자에 맞는 요일을 찾아보세요.'
          };
        },
        () => makeChoice(
          'switch 문과 switch 식의 차이로 옳은 것은?',
          'switch 식은 값을 계산해 바로 반환하고, switch 문은 여러 문장을 실행한다', ['switch 식은 default가 없다', 'switch 문은 C# 8부터 생겼다', '둘은 완전히 같은 문법이다'],
          'switch 식(=> 사용)은 하나의 결과값을 만들어 대입하는 데 특화됐고, switch 문(case: ... break;)은 각 case에서 여러 문장을 실행할 수 있어요.',
          '화살표(=>)가 있는지 없는지로 구분해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>int month = 12;</code>를 두고, switch 식을 사용해 12, 1, 2월이면 "겨울", 그 외는 "기타"를 <code>season</code>에 저장한 뒤 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 7,
          placeholder: 'int month = 12;\nstring season = month switch\n{\n    12 => "겨울",\n    1 => "겨울",\n    2 => "겨울",\n    _ => "기타"\n};\nConsole.WriteLine(season);',
          accept: ['int month = 12;\nstring season = month switch\n{\n    12 => "겨울",\n    1 => "겨울",\n    2 => "겨울",\n    _ => "기타"\n};\nConsole.WriteLine(season);'],
          why: 'month switch { ... } 형태로 각 case에 화살표로 결과를 매핑하고, _로 나머지를 처리해요.',
          hint: 'month switch { 12 => "겨울", 1 => "겨울", 2 => "겨울", _ => "기타" };'
        }),
      ],
      boss: () => {
        const grade = pick(['A', 'B', 'C', 'F']);
        const map = { A: '우수', B: '양호', C: '보통', F: '재수강' };
        return {
          type: 'blank',
          q: `<code>char grade = '${grade}'; string msg = grade switch { 'A' => "우수", 'B' => "양호", 'C' => "보통", _ => "재수강" }; Console.WriteLine(msg);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [map[grade]], placeholder: '출력 결과',
          why: `grade가 '${grade}'이므로 "${map[grade]}"가 출력돼요.`,
          hint: '해당하는 case의 결과를 찾아보세요.'
        };
      }
    },
    {
      id: 'whileAndDoWhileLoops',
      title: 'while / do-while 반복문',
      ready: true,
      summary: '조건이 참인 동안 반복하는 while과, 최소 한 번은 실행하는 do-while을 배워요.',
      goals: ['while 반복문 구조 이해하기', 'do-while과 while의 차이 알기', 'break/continue로 반복 흐름 제어하기'],
      blocks: [
        {
          h: 'while: 조건이 참인 동안 반복',
          html: `<p><code>while (조건)</code>은 조건을 먼저 검사하고, 참이면 블록을 실행해요. 조건이 거짓이 될 때까지 반복하고, 처음부터 거짓이면 한 번도 실행되지 않아요.</p>`,
          code: {
            label: 'WhileLoop.cs',
            lang: 'csharp',
            src: `int i = 0;
while (i < 3)
{
    Console.WriteLine(i);
    i++;
}`,
            out: `0
1
2`
          }
        },
        {
          h: 'do-while: 최소 한 번 실행',
          html: `<p><code>do { } while (조건);</code>은 블록을 먼저 실행한 뒤 조건을 검사해요. 그래서 조건이 처음부터 거짓이어도 <b>최소 한 번</b>은 실행돼요. <code>break</code>는 반복을 즉시 끝내고, <code>continue</code>는 남은 부분을 건너뛰고 다음 반복으로 넘어가요.</p>`,
          code: {
            label: 'DoWhile.cs',
            lang: 'csharp',
            src: `int i = 5;
do
{
    Console.WriteLine(i);
    i++;
} while (i < 3);`,
            out: `5`
          },
          after: `<div class="note"><b>정리</b> — while은 "조건 먼저 확인 후 실행", do-while은 "실행 먼저, 조건은 나중"이에요. 메뉴 반복 입력처럼 "최소 한 번은 실행돼야 하는" 로직에 do-while이 잘 맞아요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '조건을 나중에 검사해서 블록이 최소 한 번은 실행되는 반복문은?',
          'do-while', ['while', 'for', 'foreach'],
          'do-while은 블록을 먼저 실행한 뒤 조건을 검사하므로 최소 한 번은 실행돼요.',
          '"do"가 먼저 나오는 문법이에요.'
        ),
        () => {
          const stop = randInt(3, 6);
          return {
            type: 'blank',
            q: `<code>int i = 0; while (i < ${stop}) { Console.Write(i); i++; }</code>를 실행하면 무엇이 출력될까요? (공백 없이 이어서)`,
            prefix: '', suffix: '', accept: [Array.from({ length: stop }, (_, k) => k).join('')], placeholder: '출력 결과',
            why: `i가 0부터 ${stop - 1}까지 출력되며, 이어붙이면 ${Array.from({ length: stop }, (_, k) => k).join('')}가 돼요.`,
            hint: '0부터 조건을 만족하는 마지막 수까지예요.'
          };
        },
        () => ({
          type: 'blank',
          q: `반복문을 즉시 완전히 종료하는 키워드를 쓰세요.`,
          prefix: '', suffix: '', accept: ['break'], placeholder: '키워드',
          why: '<code>break</code>는 반복문(또는 switch)을 즉시 벗어나게 해요.',
          hint: '"부수다, 끊다"라는 뜻의 단어예요.'
        }),
        () => makeChoice(
          '<code>int i = 10; do { Console.WriteLine(i); } while (i < 3);</code>는 몇 번 실행될까요?',
          '1번', ['0번', '3번', '무한 반복'],
          'do-while은 조건과 상관없이 블록을 먼저 한 번 실행하고, 그 다음 조건(i < 3)이 거짓이라 종료돼요.',
          '먼저 실행하고 나중에 조건을 확인해요.'
        ),
        () => ({
          type: 'code',
          q: '<code>int i = 1;</code>부터 시작해 <code>i</code>가 5보다 작은 동안 <code>i</code>를 출력하고 1씩 증가시키는 while문을 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'int i = 1;\nwhile (i < 5)\n{\n    Console.WriteLine(i);\n    i++;\n}',
          accept: ['int i = 1;\nwhile (i < 5)\n{\n    Console.WriteLine(i);\n    i++;\n}'],
          why: 'while (i < 5) 블록 안에서 출력하고 i를 증가시키면 1부터 4까지 출력돼요.',
          hint: '조건 검사 후 실행, 그리고 i++를 잊지 마세요.'
        }),
      ],
      boss: () => {
        const n = randInt(3, 6);
        return {
          type: 'blank',
          q: `<code>int i = 0, sum = 0; while (i < ${n}) { sum += i; i++; } Console.WriteLine(sum);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(Array.from({ length: n }, (_, k) => k).reduce((a, b) => a + b, 0))], placeholder: '숫자',
          why: `0부터 ${n - 1}까지의 합은 ${Array.from({ length: n }, (_, k) => k).reduce((a, b) => a + b, 0)}예요.`,
          hint: '0부터 순서대로 더해보세요.'
        };
      }
    },
    {
      id: 'forLoopAndForeach',
      title: 'for 반복문과 foreach',
      ready: true,
      summary: '정해진 횟수만큼 반복하는 for문과, 컬렉션을 순회하는 foreach를 배워요.',
      goals: ['for문의 초기식/조건식/증감식 이해하기', 'foreach로 배열/컬렉션 순회하기', '중첩 반복문 다루기'],
      blocks: [
        {
          h: 'for: 초기화 · 조건 · 증감',
          html: `<p><code>for (초기화; 조건; 증감)</code>은 세 부분으로 구성돼요. 초기화는 한 번만 실행되고, 조건이 참인 동안 블록을 반복하며, 매 반복 후 증감식이 실행돼요.</p>`,
          code: {
            label: 'ForLoop.cs',
            lang: 'csharp',
            src: `for (int i = 0; i < 3; i++)
{
    Console.WriteLine(i);
}`,
            out: `0
1
2`
          }
        },
        {
          h: 'foreach: 컬렉션 순회 전용',
          html: `<p><code>foreach (타입 변수 in 컬렉션)</code>은 배열이나 리스트 같은 컬렉션의 각 원소를 처음부터 끝까지 순서대로 꺼내줘요. 인덱스를 직접 관리하지 않아도 되어 훨씬 안전하고 간결해요.</p>`,
          code: {
            label: 'ForEach.cs',
            lang: 'csharp',
            src: `string[] fruits = { "사과", "바나나", "포도" };
foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}`,
            out: `사과
바나나
포도`
          },
          after: `<div class="note"><b>정리</b> — 인덱스 자체가 필요 없다면 <code>foreach</code>가 더 안전해요(범위를 벗어나는 실수를 원천 차단). 인덱스 값 자체가 필요하거나 특정 간격으로 건너뛰어야 한다면 <code>for</code>가 더 적합해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(3, 6);
          return {
            type: 'blank',
            q: `<code>for (int i = 0; i < ${n}; i++) { Console.Write(i); }</code>를 실행하면? (공백 없이 이어서)`,
            prefix: '', suffix: '', accept: [Array.from({ length: n }, (_, k) => k).join('')], placeholder: '출력 결과',
            why: `i가 0부터 ${n - 1}까지 반복되며 이어붙이면 ${Array.from({ length: n }, (_, k) => k).join('')}가 돼요.`,
            hint: '0부터 조건을 만족하는 값까지예요.'
          };
        },
        () => makeChoice(
          '배열이나 리스트의 모든 원소를 인덱스 없이 순서대로 꺼내 쓸 때 가장 적합한 반복문은?',
          'foreach', ['while', 'do-while', 'switch'],
          'foreach는 인덱스 관리 없이 컬렉션의 각 원소를 안전하게 순회해줘요.',
          '"각각에 대해"라는 뜻의 이름이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>for (int i = 0; i < 5; ___) { }</code>에서 i를 1씩 증가시키는 증감식을 쓰세요.`,
          prefix: 'for (int i = 0; i < 5; ', suffix: ') { }', accept: ['i++'], placeholder: '증감식',
          why: '<code>i++</code>는 i를 1 증가시키는 가장 흔한 증감식이에요.',
          hint: '변수 뒤에 ++를 붙여요.'
        }),
        () => makeChoice(
          '<code>string[] fruits = { "사과", "바나나" }; foreach (string f in fruits) Console.WriteLine(f);</code>의 출력은?',
          '사과\n바나나', ['바나나\n사과', '사과바나나', 'fruits'],
          'foreach는 배열의 앞에서부터 순서대로 원소를 하나씩 꺼내 출력해요.',
          '배열에 담긴 순서 그대로예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>int[] nums = { 1, 2, 3, 4 };</code>를 foreach로 순회하며 각 값을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'int[] nums = { 1, 2, 3, 4 };\nforeach (int n in nums)\n{\n    Console.WriteLine(n);\n}',
          accept: ['int[] nums = { 1, 2, 3, 4 };\nforeach (int n in nums)\n{\n    Console.WriteLine(n);\n}'],
          why: 'foreach (int n in nums)로 배열의 각 원소를 n에 담아 순서대로 출력해요.',
          hint: 'foreach (int n in nums) { Console.WriteLine(n); }'
        }),
      ],
      boss: () => {
        const n = randInt(2, 5);
        return {
          type: 'blank',
          q: `<code>int sum = 0; for (int i = 1; i <= ${n}; i++) { sum += i; } Console.WriteLine(sum);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(Array.from({ length: n }, (_, k) => k + 1).reduce((a, b) => a + b, 0))], placeholder: '숫자',
          why: `1부터 ${n}까지의 합은 ${Array.from({ length: n }, (_, k) => k + 1).reduce((a, b) => a + b, 0)}예요.`,
          hint: '1부터 n까지 순서대로 더해보세요.'
        };
      }
    },
    {
      id: 'arraysBasics',
      title: '배열(Array) 기초',
      ready: true,
      summary: '고정된 크기의 같은 타입 값들을 순서대로 담는 배열을 배워요.',
      goals: ['배열 선언과 초기화 방법 익히기', '인덱스로 원소 읽고 쓰기', 'Length 속성과 범위 초과 오류 이해하기'],
      blocks: [
        {
          h: '배열 선언과 초기화',
          html: `<p>배열은 <code>타입[] 이름 = { 값들 };</code>로 만들어요. 배열의 크기는 한 번 정해지면 바뀌지 않고, 각 원소는 <code>0</code>부터 시작하는 인덱스로 접근해요.</p>`,
          code: {
            label: 'Arrays.cs',
            lang: 'csharp',
            src: `int[] scores = { 90, 85, 77 };
Console.WriteLine(scores[0]);
Console.WriteLine(scores[2]);
Console.WriteLine(scores.Length);`,
            out: `90
77
3`
          }
        },
        {
          h: '원소 수정과 범위 초과 오류',
          html: `<p>인덱스로 값을 다시 대입할 수도 있어요. 하지만 <code>Length</code>보다 크거나 같은 인덱스, 또는 음수 인덱스에 접근하면 <code>IndexOutOfRangeException</code> 예외가 발생해요.</p>`,
          code: {
            label: 'ArrayModify.cs',
            lang: 'csharp',
            src: `int[] scores = { 90, 85, 77 };
scores[1] = 100;
Console.WriteLine(scores[1]);
// Console.WriteLine(scores[3]); // 오류! 인덱스는 0~2까지만 유효`,
            out: `100`
          },
          after: `<div class="note"><b>정리</b> — 배열은 크기가 고정이라 원소를 추가·삭제할 수 없어요. 크기가 자유롭게 늘어나는 컬렉션이 필요하면 다음 단원에서 배우는 <code>List&lt;T&gt;</code>를 써야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'C# 배열의 첫 번째 원소의 인덱스는?',
          '0', ['1', '-1', 'Length'],
          'C# 배열은 0부터 시작하는 인덱스를 써요.',
          '대부분의 프로그래밍 언어와 같아요.'
        ),
        () => ({
          type: 'blank',
          q: `배열 <code>scores</code>의 원소 개수를 알아내는 속성을 쓰세요. (scores.___)`,
          prefix: 'scores.', suffix: '', accept: ['Length'], placeholder: '속성 이름',
          why: '<code>Length</code>는 배열에 담긴 원소의 개수를 알려줘요.',
          hint: '"길이"라는 뜻의 영어 단어예요.'
        }),
        () => {
          const a = randInt(1, 50), b = randInt(1, 50), c = randInt(1, 50);
          return {
            type: 'blank',
            q: `<code>int[] arr = { ${a}, ${b}, ${c} }; Console.WriteLine(arr[1] + arr[2]);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(b + c)], placeholder: '숫자',
            why: `arr[1]은 ${b}, arr[2]는 ${c}이므로 합은 ${b + c}예요.`,
            hint: '인덱스 1과 2의 값을 더해보세요.'
          };
        },
        () => makeChoice(
          '<code>int[] arr = { 1, 2, 3 }; Console.WriteLine(arr[3]);</code>를 실행하면 어떻게 되나요?',
          'IndexOutOfRangeException 예외가 발생한다', ['0이 출력된다', 'null이 출력된다', '자동으로 배열이 늘어난다'],
          '배열 크기가 3(인덱스 0~2)인데 인덱스 3은 범위를 벗어나서 예외가 발생해요.',
          '유효한 인덱스는 0부터 Length - 1까지예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>int[] nums = { 10, 20, 30 };</code>을 선언하고, <code>nums[1]</code>을 <code>99</code>로 바꾼 뒤 <code>nums[1]</code>을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'int[] nums = { 10, 20, 30 };\nnums[1] = 99;\nConsole.WriteLine(nums[1]);',
          accept: ['int[] nums = { 10, 20, 30 };\nnums[1] = 99;\nConsole.WriteLine(nums[1]);'],
          why: '인덱스 1에 99를 대입한 뒤, 같은 인덱스를 출력하면 99가 나와요.',
          hint: 'nums[1] = 99; 로 값을 바꿀 수 있어요.'
        }),
      ],
      boss: () => {
        const arr = [randInt(1, 20), randInt(1, 20), randInt(1, 20), randInt(1, 20)];
        return {
          type: 'blank',
          q: `<code>int[] arr = { ${arr.join(', ')} }; int sum = 0; foreach (int n in arr) { sum += n; } Console.WriteLine(sum);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(arr.reduce((a, b) => a + b, 0))], placeholder: '숫자',
          why: `배열의 모든 값을 더하면 ${arr.reduce((a, b) => a + b, 0)}이에요.`,
          hint: '배열 원소를 모두 더해보세요.'
        };
      }
    },
    {
      id: 'listOfTGeneric',
      title: 'List<T>: 크기가 자유로운 목록',
      ready: true,
      summary: '배열과 달리 원소를 자유롭게 추가·삭제할 수 있는 List<T>를 배워요.',
      goals: ['List<T> 생성과 Add/Remove 사용하기', 'Count 속성과 인덱스 접근 이해하기', 'Contains/IndexOf로 검색하기'],
      blocks: [
        {
          h: 'List<T>: 늘어나는 배열',
          html: `<p><code>List&lt;T&gt;</code>는 <code>System.Collections.Generic</code>에 있는 컬렉션으로, <code>&lt;T&gt;</code> 자리에 담을 타입을 지정해요(<code>List&lt;int&gt;</code>, <code>List&lt;string&gt;</code> 등). 배열과 달리 <code>Add</code>로 언제든 원소를 추가할 수 있어요.</p>`,
          code: {
            label: 'ListBasics.cs',
            lang: 'csharp',
            src: `using System.Collections.Generic;

List<string> names = new List<string>();
names.Add("지수");
names.Add("민준");
Console.WriteLine(names.Count);
Console.WriteLine(names[0]);`,
            out: `2
지수`
          }
        },
        {
          h: 'Remove, Contains, IndexOf',
          html: `<p><code>Remove(값)</code>은 처음 발견되는 원소를 삭제하고, <code>Contains(값)</code>은 값이 있는지 <code>bool</code>로 알려주며, <code>IndexOf(값)</code>은 값의 위치(없으면 -1)를 알려줘요.</p>`,
          code: {
            label: 'ListMethods.cs',
            lang: 'csharp',
            src: `List<string> names = new List<string> { "지수", "민준", "서연" };
names.Remove("민준");
Console.WriteLine(names.Contains("서연"));
Console.WriteLine(names.IndexOf("서연"));
Console.WriteLine(names.Count);`,
            out: `True
1
2`
          },
          after: `<div class="note"><b>정리</b> — 크기가 미리 정해진 고정 데이터라면 배열, 크기가 실행 중에 계속 바뀌는 데이터라면 <code>List&lt;T&gt;</code>가 자연스러운 선택이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'List<T>에 새 값을 맨 뒤에 추가하는 메서드는?',
          'Add', ['Push', 'Insert', 'Append'],
          '<code>Add(값)</code>은 리스트의 맨 뒤에 값을 추가해요.',
          '가장 짧고 기본적인 메서드 이름이에요.'
        ),
        () => ({
          type: 'blank',
          q: `List에 담긴 원소의 개수를 알아내는 속성을 쓰세요. (배열의 Length에 대응)`,
          prefix: 'names.', suffix: '', accept: ['Count'], placeholder: '속성 이름',
          why: 'List<T>는 <code>Length</code> 대신 <code>Count</code> 속성을 써요.',
          hint: '"개수"라는 뜻의 단어예요.'
        }),
        () => {
          const items = ['사과', '바나나', '포도', '수박'];
          const removeIdx = randInt(0, 2);
          const removed = items[removeIdx];
          const after = items.filter((_, i) => i !== removeIdx);
          return {
            type: 'blank',
            q: `<code>List<string> fruits = new List<string> { ${items.map(i => `"${i}"`).join(', ')} }; fruits.Remove("${removed}"); Console.WriteLine(fruits.Count);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(after.length)], placeholder: '숫자',
            why: `"${removed}"가 삭제되어 남은 원소는 ${after.length}개예요.`,
            hint: '원래 개수에서 1을 뺀 값이에요.'
          };
        },
        () => makeChoice(
          '<code>List<int> nums = new List<int> { 1, 2, 3 }; Console.WriteLine(nums.IndexOf(5));</code>의 결과는?',
          '-1', ['0', '3', 'null'],
          '<code>IndexOf</code>는 값을 찾지 못하면 -1을 돌려줘요.',
          '리스트에 5는 존재하지 않아요.'
        ),
        () => ({
          type: 'code',
          q: '<code>List<int></code>를 만들어 <code>10, 20, 30</code>을 순서대로 <code>Add</code>한 뒤 <code>Count</code>를 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: 'List<int> nums = new List<int>();\nnums.Add(10);\nnums.Add(20);\nnums.Add(30);\nConsole.WriteLine(nums.Count);',
          accept: ['List<int> nums = new List<int>();\nnums.Add(10);\nnums.Add(20);\nnums.Add(30);\nConsole.WriteLine(nums.Count);'],
          why: '빈 리스트를 만든 뒤 Add를 세 번 호출하면 Count는 3이 돼요.',
          hint: 'new List<int>() 다음 Add를 세 번 호출하세요.'
        }),
      ],
      boss: () => {
        const nums = [randInt(1, 10), randInt(1, 10), randInt(1, 10)];
        return {
          type: 'blank',
          q: `<code>List<int> nums = new List<int> { ${nums.join(', ')} }; nums.Add(100); Console.WriteLine(nums.Count);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(nums.length + 1)], placeholder: '숫자',
          why: `처음 ${nums.length}개에 Add로 1개가 늘어나 ${nums.length + 1}개가 돼요.`,
          hint: '기존 개수에 1을 더해보세요.'
        };
      }
    },
    {
      id: 'methodsAndParameters',
      title: '메서드 정의와 매개변수',
      ready: true,
      summary: '값을 받아 처리하고 결과를 돌려주는 메서드를 직접 만들어봐요.',
      goals: ['메서드 선언 문법(반환타입, 이름, 매개변수) 이해하기', 'return으로 값 돌려주기', 'void 메서드와 값 반환 메서드 구분하기'],
      blocks: [
        {
          h: '메서드 선언: 반환 타입 · 이름 · 매개변수',
          html: `<p>메서드는 <code>반환타입 이름(매개변수들) { 본문 }</code> 형태로 만들어요. 값을 돌려주지 않으면 반환 타입 자리에 <code>void</code>를 써요.</p>`,
          code: {
            label: 'Methods.cs',
            lang: 'csharp',
            src: `static int Add(int a, int b)
{
    return a + b;
}

static void Greet(string name)
{
    Console.WriteLine($"안녕, {name}!");
}

Console.WriteLine(Add(3, 4));
Greet("지수");`,
            out: `7
안녕, 지수!`
          }
        },
        {
          h: 'return: 값을 즉시 돌려주고 메서드 종료',
          html: `<p><code>return 값;</code>은 메서드를 즉시 끝내고 호출한 곳으로 값을 돌려줘요. <code>return</code> 이후의 코드는 실행되지 않아요. <code>void</code> 메서드에서도 <code>return;</code>만 써서 중간에 빠져나갈 수 있어요.</p>`,
          code: {
            label: 'EarlyReturn.cs',
            lang: 'csharp',
            src: `static string CheckAge(int age)
{
    if (age < 0)
    {
        return "잘못된 나이";
    }
    return age >= 18 ? "성인" : "미성년자";
}

Console.WriteLine(CheckAge(17));
Console.WriteLine(CheckAge(-5));`,
            out: `미성년자
잘못된 나이`
          },
          after: `<div class="note"><b>정리</b> — 반환 타입이 <code>void</code>가 아닌 메서드는 <b>모든 실행 경로</b>에서 반드시 값을 <code>return</code>해야 컴파일이 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '값을 돌려주지 않는 메서드의 반환 타입 자리에 쓰는 키워드는?',
          'void', ['null', 'empty', 'none'],
          '값을 돌려주지 않는 메서드는 반환 타입을 <code>void</code>로 선언해요.',
          '"비어있다"는 뜻의 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `메서드에서 값을 호출한 곳으로 돌려줄 때 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: ' a + b;', accept: ['return'], placeholder: '키워드',
          why: '<code>return</code>은 값을 돌려주고 메서드 실행을 즉시 끝내요.',
          hint: '"돌려주다"라는 뜻이에요.'
        }),
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>static int Mul(int x, int y) { return x * y; } Console.WriteLine(Mul(${a}, ${b}));</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a * b)], placeholder: '숫자',
            why: `${a} * ${b} = ${a * b}이에요.`,
            hint: '두 매개변수를 곱해보세요.'
          };
        },
        () => makeChoice(
          '<code>int</code>를 반환하도록 선언한 메서드가 지켜야 할 규칙은?',
          '모든 실행 경로에서 반드시 int 값을 return해야 한다', ['return을 아예 쓰지 않아도 된다', 'void처럼 값 없이 return;만 써도 된다', '항상 0을 자동으로 반환한다'],
          '반환 타입이 지정된 메서드는 어떤 경로로 실행되든 그 타입의 값을 return해야 컴파일 오류가 나지 않아요.',
          '컴파일러가 모든 경로를 확인해요.'
        ),
        () => ({
          type: 'code',
          q: '두 정수를 받아 더 큰 값을 반환하는 메서드 <code>static int Max(int a, int b)</code>를 작성하세요. (삼항 연산자 사용)',
          starter: '',
          rows: 3,
          placeholder: 'static int Max(int a, int b)\n{\n    return a > b ? a : b;\n}',
          accept: ['static int Max(int a, int b)\n{\n    return a > b ? a : b;\n}'],
          why: '삼항 연산자 <code>a &gt; b ? a : b</code>로 더 큰 값을 바로 반환할 수 있어요.',
          hint: 'return a > b ? a : b;'
        }),
      ],
      boss: () => {
        const a = randInt(1, 30), b = randInt(1, 30);
        return {
          type: 'blank',
          q: `<code>static int Max(int a, int b) { return a > b ? a : b; } Console.WriteLine(Max(${a}, ${b}));</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(Math.max(a, b))], placeholder: '숫자',
          why: `${a}와 ${b} 중 더 큰 값은 ${Math.max(a, b)}예요.`,
          hint: '둘 중 더 큰 수예요.'
        };
      }
    },
    {
      id: 'methodOverloading',
      title: '메서드 오버로딩',
      ready: true,
      summary: '같은 이름의 메서드를 매개변수 구성만 다르게 여러 개 만들 수 있어요.',
      goals: ['오버로딩의 개념 이해하기', '매개변수 개수/타입으로 구분되는 원리 알기', '반환 타입만 다른 오버로딩이 불가능함을 이해하기'],
      blocks: [
        {
          h: '오버로딩: 이름은 같고 매개변수는 다르게',
          html: `<p><b>메서드 오버로딩</b>은 같은 이름의 메서드를 매개변수의 <b>개수</b>나 <b>타입</b>을 다르게 하여 여러 개 정의하는 것이에요. 호출할 때 컴파일러가 전달된 인자에 맞는 버전을 자동으로 골라줘요.</p>`,
          code: {
            label: 'Overload.cs',
            lang: 'csharp',
            src: `static int Add(int a, int b)
{
    return a + b;
}

static double Add(double a, double b)
{
    return a + b;
}

static int Add(int a, int b, int c)
{
    return a + b + c;
}

Console.WriteLine(Add(1, 2));
Console.WriteLine(Add(1.5, 2.5));
Console.WriteLine(Add(1, 2, 3));`,
            out: `3
4
6`
          }
        },
        {
          h: '반환 타입만 다르면 오버로딩이 될 수 없어요',
          html: `<p>매개변수 목록(개수·순서·타입)이 완전히 같은데 <b>반환 타입만</b> 다르면 컴파일러가 어떤 버전을 호출할지 구분할 수 없어서 오류가 나요. 오버로딩은 항상 매개변수 목록으로 구분돼요.</p>`,
          code: {
            label: 'InvalidOverload.cs',
            lang: 'csharp',
            src: `// 아래 두 메서드는 매개변수가 완전히 같아서 함께 선언할 수 없어요(컴파일 오류)
// static int GetValue() { return 1; }
// static double GetValue() { return 1.0; }

static int GetValue(int x) { return x; }
static double GetValue(double x) { return x; }
Console.WriteLine(GetValue(5));
Console.WriteLine(GetValue(5.0));`,
            out: `5
5`
          },
          after: `<div class="note"><b>정리</b> — 오버로딩은 "이름은 같지만 매개변수 시그니처가 다른" 여러 메서드를 만드는 기능이에요. <code>Console.WriteLine</code> 자체도 int, string, bool 등 다양한 타입 버전으로 오버로딩되어 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '메서드 오버로딩의 정의로 옳은 것은?',
          '같은 이름, 다른 매개변수 목록을 가진 여러 메서드를 정의하는 것', ['같은 이름과 같은 매개변수를 가진 메서드를 여러 번 정의하는 것', '부모 클래스의 메서드를 자식이 다시 정의하는 것', '메서드를 여러 파일에 나눠 작성하는 것'],
          '오버로딩은 이름은 같지만 매개변수의 개수나 타입이 다른 메서드를 여러 개 만드는 거예요.',
          '"부모-자식"과는 관계없는 개념이에요(그건 오버라이딩).'
        ),
        () => ({
          type: 'blank',
          q: `<code>Add(int, int)</code>와 <code>Add(double, double)</code>처럼 이름은 같고 매개변수가 다른 메서드를 여러 개 정의하는 것을 뭐라고 하나요? (영어로)`,
          prefix: '', suffix: '', accept: ['overloading', 'Overloading'], placeholder: '용어',
          why: '이 기능을 "메서드 오버로딩(method overloading)"이라고 불러요.',
          hint: '"과적하다, 여러 번 싣다"라는 뜻의 단어예요.'
        }),
        () => makeChoice(
          '<code>static int Get() { return 1; } static double Get() { return 1.0; }</code>처럼 매개변수 목록이 완전히 같고 반환 타입만 다른 두 메서드를 함께 선언하면?',
          '컴파일 오류가 발생한다', ['정상적으로 오버로딩된다', '나중에 선언된 것만 유효해진다', '실행 시점에 랜덤으로 선택된다'],
          '반환 타입만 다르고 매개변수 목록이 같으면 오버로딩으로 인정되지 않아 컴파일 오류가 나요.',
          '오버로딩은 매개변수 목록으로만 구분돼요.'
        ),
        () => {
          const a = randInt(1, 10), b = randInt(1, 10), c = randInt(1, 10);
          return {
            type: 'blank',
            q: `<code>static int Add(int a, int b) { return a + b; } static int Add(int a, int b, int c) { return a + b + c; } Console.WriteLine(Add(${a}, ${b}, ${c}));</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b + c)], placeholder: '숫자',
            why: `인자가 3개이므로 세 개짜리 Add가 호출되어 ${a} + ${b} + ${c} = ${a + b + c}이 돼요.`,
            hint: '인자 개수에 맞는 오버로드가 호출돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>int</code> 두 개를 더하는 <code>Add(int a, int b)</code>와 <code>string</code> 두 개를 이어붙이는 <code>Add(string a, string b)</code>를 오버로딩으로 작성하세요.',
          starter: '',
          rows: 8,
          placeholder: 'static int Add(int a, int b)\n{\n    return a + b;\n}\n\nstatic string Add(string a, string b)\n{\n    return a + b;\n}',
          accept: ['static int Add(int a, int b)\n{\n    return a + b;\n}\n\nstatic string Add(string a, string b)\n{\n    return a + b;\n}'],
          why: '매개변수 타입이 다르므로 같은 이름 Add로 두 메서드를 함께 선언할 수 있어요.',
          hint: '타입만 다르고 이름과 로직 구조는 비슷하게 작성하세요.'
        }),
      ],
      boss: () => {
        const s1 = pick(['안녕', '반가워']), s2 = pick(['하세요', '요']);
        return {
          type: 'blank',
          q: `<code>static string Add(string a, string b) { return a + b; } static int Add(int a, int b) { return a + b; } Console.WriteLine(Add("${s1}", "${s2}"));</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [`${s1}${s2}`], placeholder: '출력 결과',
          why: `문자열 인자가 전달되어 string 버전이 호출되고, 두 문자열이 이어붙여져 "${s1}${s2}"가 돼요.`,
          hint: '문자열 인자니까 string 버전이 호출돼요.'
        };
      }
    },
    {
      id: 'optionalAndDefaultParams',
      title: '기본값 매개변수와 명명 인자',
      ready: true,
      summary: '매개변수에 기본값을 정해 호출을 유연하게 만들고, 이름으로 인자를 지정해요.',
      goals: ['기본값 매개변수(default parameter) 선언하기', '기본값 매개변수는 뒤쪽에 와야 함을 이해하기', '명명 인자(named argument)로 순서 상관없이 호출하기'],
      blocks: [
        {
          h: '기본값 매개변수: 생략하면 기본값 사용',
          html: `<p>매개변수에 <code>= 기본값</code>을 지정하면, 호출할 때 그 인자를 생략할 수 있어요. 기본값이 있는 매개변수는 반드시 기본값이 없는 매개변수보다 <b>뒤</b>에 와야 해요.</p>`,
          code: {
            label: 'DefaultParams.cs',
            lang: 'csharp',
            src: `static void Greet(string name, string greeting = "안녕하세요")
{
    Console.WriteLine($"{greeting}, {name}!");
}

Greet("지수");
Greet("민준", "반갑습니다");`,
            out: `안녕하세요, 지수!
반갑습니다, 민준!`
          }
        },
        {
          h: '명명 인자(named argument)',
          html: `<p>호출할 때 <code>매개변수이름: 값</code> 형태로 쓰면, 인자의 <b>순서와 상관없이</b> 어떤 매개변수에 값을 줄지 명확히 지정할 수 있어요. 매개변수가 여러 개이고 기본값이 섞여 있을 때 특히 유용해요.</p>`,
          code: {
            label: 'NamedArgs.cs',
            lang: 'csharp',
            src: `static void PrintInfo(string name, int age = 0, string city = "서울")
{
    Console.WriteLine($"{name}({age}) - {city}");
}

PrintInfo("지수", city: "부산");
PrintInfo(name: "민준", age: 20);`,
            out: `지수(0) - 부산
민준(20) - 서울`
          },
          after: `<div class="note"><b>정리</b> — 기본값 매개변수는 호출 코드를 간결하게 만들고, 명명 인자는 어떤 값이 어떤 의미인지 호출부에서부터 명확하게 해줘요. 둘을 함께 쓰면 유연하고 읽기 쉬운 API를 만들 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '기본값 매개변수를 선언하는 문법은?',
          '타입 이름 = 기본값', ['default(타입) 이름', '타입 이름? 기본값', '이름: 타입 = 기본값'],
          '<code>string greeting = "안녕하세요"</code>처럼 매개변수 뒤에 <code>= 값</code>을 붙여요.',
          '변수 초기화와 비슷한 모양이에요.'
        ),
        () => ({
          type: 'blank',
          q: `호출할 때 <code>city: "부산"</code>처럼 매개변수 이름을 밝혀서 넘기는 인자를 뭐라고 하나요? (영어 두 단어, 예: ___ argument)`,
          prefix: '', suffix: ' argument', accept: ['named'], placeholder: '단어',
          why: '이런 방식을 "명명 인자(named argument)"라고 불러요.',
          hint: '"이름 붙은"이라는 뜻의 단어예요.'
        }),
        () => makeChoice(
          '<code>static void F(string a, int b = 1, int c) { }</code>처럼 선언하면 어떻게 되나요?',
          '컴파일 오류가 발생한다(기본값 없는 매개변수가 기본값 매개변수 뒤에 옴)', ['정상적으로 컴파일된다', 'c에도 자동으로 기본값이 생긴다', 'b의 기본값이 무시된다'],
          '기본값이 있는 매개변수(b) 뒤에 기본값이 없는 매개변수(c)가 오면 컴파일 오류예요.',
          '기본값 매개변수는 항상 맨 뒤 그룹이어야 해요.'
        ),
        () => {
          const age = randInt(15, 40);
          return {
            type: 'blank',
            q: `<code>static void P(string name, int age = 0) { Console.WriteLine($"{name}:{age}"); } P("서연", age: ${age});</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [`서연:${age}`], placeholder: '출력 결과',
            why: `name은 "서연", age는 명명 인자로 ${age}가 전달되어 "서연:${age}"가 출력돼요.`,
            hint: '명명 인자는 값을 그대로 그 매개변수에 넣어줘요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>string name</code>과 기본값이 <code>"서울"</code>인 <code>string city = "서울"</code>을 매개변수로 받아 <code>"{name}은 {city}에 살아요"</code>를 출력하는 메서드 <code>Introduce</code>를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'static void Introduce(string name, string city = "서울")\n{\n    Console.WriteLine($"{name}은 {city}에 살아요");\n}',
          accept: ['static void Introduce(string name, string city = "서울")\n{\n    Console.WriteLine($"{name}은 {city}에 살아요");\n}'],
          why: 'city 매개변수에 기본값 "서울"을 지정하면 생략 시 자동으로 사용돼요.',
          hint: 'string city = "서울" 형태로 기본값을 지정하세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '하늘']);
        return {
          type: 'blank',
          q: `<code>static void P(string name, int age = 10) { Console.WriteLine($"{name}-{age}"); } P("${name}");</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [`${name}-10`], placeholder: '출력 결과',
          why: `age를 생략했으므로 기본값 10이 사용되어 "${name}-10"이 출력돼요.`,
          hint: '생략된 인자는 기본값을 써요.'
        };
      }
    },
    {
      id: 'refAndOutParams',
      title: 'ref와 out 매개변수',
      ready: true,
      summary: '메서드 안에서 호출자의 변수를 직접 바꾸는 ref/out 매개변수를 배워요.',
      goals: ['ref로 값을 전달·수정하는 방법 이해하기', 'out으로 여러 값을 반환하는 방법 이해하기', 'ref와 out의 차이(초기화 필요 여부) 알기'],
      blocks: [
        {
          h: 'ref: 참조로 전달해서 값을 바꾸기',
          html: `<p>기본적으로 C#의 매개변수는 값이 <b>복사</b>되어 전달돼요. <code>ref</code>를 붙이면 원본 변수를 그대로 참조하게 되어, 메서드 안에서 값을 바꾸면 호출자의 변수도 함께 바뀌어요. ref로 넘길 변수는 호출 전에 반드시 초기화돼 있어야 해요.</p>`,
          code: {
            label: 'RefParam.cs',
            lang: 'csharp',
            src: `static void Double(ref int x)
{
    x = x * 2;
}

int num = 5;
Double(ref num);
Console.WriteLine(num);`,
            out: `10`
          }
        },
        {
          h: 'out: 메서드 안에서 값을 "출력"하기',
          html: `<p><code>out</code>은 ref와 비슷하지만, 호출 전 변수를 초기화하지 않아도 되고(오히려 무의미해요) 메서드 안에서 <b>반드시</b> 값을 대입해야 해요. 여러 값을 동시에 돌려주고 싶을 때 자주 써요.</p>`,
          code: {
            label: 'OutParam.cs',
            lang: 'csharp',
            src: `static void Divide(int a, int b, out int quotient, out int remainder)
{
    quotient = a / b;
    remainder = a % b;
}

Divide(17, 5, out int q, out int r);
Console.WriteLine(q);
Console.WriteLine(r);`,
            out: `3
2`
          },
          after: `<div class="note"><b>정리</b> — <code>ref</code>는 "이미 있는 값을 넘겨서 바꿀 때", <code>out</code>은 "메서드가 여러 결과를 새로 만들어 돌려줄 때" 주로 써요. int.TryParse의 out 매개변수를 떠올려보면 이해가 쉬워요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '메서드 안에서 호출자의 변수 값을 직접 바꾸려면 매개변수 앞에 어떤 키워드를 붙여야 하나요?',
          'ref', ['const', 'static', 'this'],
          '<code>ref</code>를 붙이면 값이 복사되지 않고 원본 변수를 참조해서 수정할 수 있어요.',
          '"참조(reference)"의 줄임말이에요.'
        ),
        () => ({
          type: 'blank',
          q: `메서드가 여러 값을 동시에 반환하고 싶을 때, 호출 전 초기화가 필요 없는 매개변수 키워드를 쓰세요.`,
          prefix: '', suffix: '', accept: ['out'], placeholder: '키워드',
          why: '<code>out</code> 매개변수는 호출 전 초기화가 필요 없지만, 메서드 안에서 반드시 값을 대입해야 해요.',
          hint: '"밖으로 내보내다"라는 뜻과 관련 있어요.'
        }),
        () => makeChoice(
          'ref와 out의 차이로 옳은 것은?',
          'ref는 호출 전 반드시 초기화되어야 하지만, out은 그럴 필요가 없다', ['ref는 값 타입에만, out은 참조 타입에만 쓸 수 있다', 'out은 여러 개 쓸 수 없지만 ref는 여러 개 쓸 수 있다', '둘은 완전히 같은 키워드다'],
          'ref는 이미 값이 있는 변수를 넘겨야 하고, out은 초기화 여부와 상관없이 넘길 수 있는 대신 메서드 안에서 반드시 값을 채워야 해요.',
          '"이미 값이 있어야 하는가"가 핵심 차이예요.'
        ),
        () => {
          const x = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>static void Inc(ref int x) { x = x + 1; } int n = ${x}; Inc(ref n); Console.WriteLine(n);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(x + 1)], placeholder: '숫자',
            why: `ref로 전달된 n은 메서드 안에서 직접 수정되어 ${x + 1}이 돼요.`,
            hint: 'ref는 원본을 그대로 바꿔요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>int a</code>와 <code>int b</code>를 <code>ref</code>로 받아 두 값을 서로 맞바꾸는 메서드 <code>static void Swap(ref int a, ref int b)</code>를 작성하세요. (임시 변수 temp 사용)',
          starter: '',
          rows: 5,
          placeholder: 'static void Swap(ref int a, ref int b)\n{\n    int temp = a;\n    a = b;\n    b = temp;\n}',
          accept: ['static void Swap(ref int a, ref int b)\n{\n    int temp = a;\n    a = b;\n    b = temp;\n}'],
          why: 'temp에 a를 잠시 보관한 뒤, a에 b를, b에 temp(원래 a)를 대입하면 값이 맞바뀌어요.',
          hint: 'int temp = a; a = b; b = temp;'
        }),
      ],
      boss: () => {
        const a = randInt(10, 30), b = randInt(2, 9);
        return {
          type: 'blank',
          q: `<code>static void Div(int a, int b, out int q, out int r) { q = a / b; r = a % b; } Div(${a}, ${b}, out int q, out int r); Console.WriteLine($"{q} {r}");</code>를 실행하면? (형식: 몫 나머지)`,
          prefix: '', suffix: '', accept: [`${Math.floor(a / b)} ${a % b}`], placeholder: '출력 결과',
          why: `${a} ÷ ${b}의 몫은 ${Math.floor(a / b)}, 나머지는 ${a % b}예요.`,
          hint: '정수 나눗셈의 몫과 나머지를 각각 계산해보세요.'
        };
      }
    },
    {
      id: 'classesAndObjectsBasics',
      title: '클래스와 객체 기초',
      ready: true,
      summary: '필드와 생성자로 이루어진 클래스를 정의하고 객체를 만들어봐요.',
      goals: ['클래스와 필드, 생성자의 관계 이해하기', 'new로 객체(인스턴스) 만들기', '메서드로 객체의 동작 정의하기'],
      blocks: [
        {
          h: '클래스: 필드와 생성자',
          html: `<p>클래스는 데이터(필드)와 동작(메서드)을 하나로 묶는 설계도예요. <b>생성자</b>는 클래스와 이름이 같은 특수 메서드로, <code>new</code>로 객체를 만들 때 자동으로 호출되어 초기값을 채워줘요.</p>`,
          code: {
            label: 'ClassBasics.cs',
            lang: 'csharp',
            src: `class Student
{
    public string Name;
    public int Age;

    public Student(string name, int age)
    {
        Name = name;
        Age = age;
    }
}

Student s = new Student("지수", 17);
Console.WriteLine(s.Name);
Console.WriteLine(s.Age);`,
            out: `지수
17`
          }
        },
        {
          h: '메서드: 객체의 동작',
          html: `<p>클래스 안에 메서드를 정의하면, 그 객체가 할 수 있는 동작이 돼요. 메서드 안에서는 같은 객체의 필드에 바로 접근할 수 있어요.</p>`,
          code: {
            label: 'ClassMethod.cs',
            lang: 'csharp',
            src: `class Student
{
    public string Name;
    public int Age;

    public Student(string name, int age)
    {
        Name = name;
        Age = age;
    }

    public void Introduce()
    {
        Console.WriteLine($"저는 {Name}이고, {Age}살이에요.");
    }
}

Student s = new Student("민준", 20);
s.Introduce();`,
            out: `저는 민준이고, 20살이에요.`
          },
          after: `<div class="note"><b>정리</b> — 같은 클래스로 <code>new</code>를 여러 번 호출하면 서로 독립된 객체(인스턴스)가 만들어져요. 각 객체는 자신만의 필드 값을 따로 가져요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'C#에서 클래스로부터 실제 객체(인스턴스)를 만드는 키워드는?',
          'new', ['make', 'create', 'this'],
          '<code>new 클래스명(...)</code>은 생성자를 호출해 새 객체를 만들어요.',
          '"새로운"이라는 뜻의 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `클래스와 이름이 같고, 객체가 만들어질 때 자동으로 호출되는 특수 메서드를 뭐라고 하나요? (영어로)`,
          prefix: '', suffix: '', accept: ['constructor', 'Constructor'], placeholder: '용어',
          why: '이 특수 메서드를 "생성자(constructor)"라고 불러요.',
          hint: '"만들다"라는 뜻의 단어에서 왔어요.'
        }),
        () => {
          const name = pick(['지수', '민준', '서연']);
          const age = randInt(15, 25);
          return {
            type: 'blank',
            q: `<code>Student s = new Student("${name}", ${age}); Console.WriteLine(s.Name); Console.WriteLine(s.Age);</code>를 실행하면? (두 줄, 형식: 이름\\n나이)`,
            prefix: '', suffix: '', accept: [`${name}\n${age}`], placeholder: '출력 결과',
            why: `생성자에서 Name과 Age에 각각 "${name}"과 ${age}가 저장돼요.`,
            hint: '생성자 인자 순서 그대로 Name, Age에 대입돼요.'
          };
        },
        () => makeChoice(
          '같은 클래스로 <code>new</code>를 두 번 호출해 만든 두 객체에 대한 설명으로 옳은 것은?',
          '서로 독립적인 필드 값을 가진다', ['항상 같은 필드 값을 공유한다', '두 번째 객체를 만들면 첫 번째가 사라진다', '객체는 하나만 만들 수 있다'],
          '각 객체(인스턴스)는 자신만의 필드 값을 독립적으로 가져요.',
          '객체는 서로 별개의 "복제본"과 비슷해요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Name</code>과 <code>Price</code> 필드를 가지고, 생성자에서 두 값을 받아 초기화하는 <code>Product</code> 클래스를 작성하세요.',
          starter: '',
          rows: 8,
          placeholder: 'class Product\n{\n    public string Name;\n    public int Price;\n\n    public Product(string name, int price)\n    {\n        Name = name;\n        Price = price;\n    }\n}',
          accept: ['class Product\n{\n    public string Name;\n    public int Price;\n\n    public Product(string name, int price)\n    {\n        Name = name;\n        Price = price;\n    }\n}'],
          why: '필드 두 개를 선언하고, 생성자에서 매개변수 값을 필드에 대입하면 돼요.',
          hint: 'public Product(string name, int price) { Name = name; Price = price; }'
        }),
      ],
      boss: () => {
        const price = randInt(1000, 9000);
        return {
          type: 'blank',
          q: `<code>class Product { public string Name; public int Price; public Product(string name, int price) { Name = name; Price = price; } } Product p = new Product("사과", ${price}); Console.WriteLine(p.Price);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(price)], placeholder: '숫자',
          why: `생성자에서 Price 필드에 ${price}가 저장돼요.`,
          hint: '생성자에 전달된 값이 그대로 필드에 저장돼요.'
        };
      }
    },
    {
      id: 'autoPropertiesBasics',
      title: '자동 구현 프로퍼티 { get; set; }',
      ready: true,
      summary: '필드를 직접 노출하는 대신, 프로퍼티로 안전하게 값을 감싸는 방법을 배워요.',
      goals: ['자동 구현 프로퍼티 문법 익히기', 'get/set 접근자의 역할 이해하기', 'private set으로 읽기 전용에 가깝게 만들기'],
      blocks: [
        {
          h: '프로퍼티: get/set으로 감싼 값',
          html: `<p><b>프로퍼티</b>는 필드처럼 보이지만 실제로는 <code>get</code>(읽기)과 <code>set</code>(쓰기) 메서드로 동작해요. <code>{ get; set; }</code>만 쓰면 컴파일러가 내부 필드를 자동으로 만들어줘서 <b>자동 구현 프로퍼티</b>라고 불러요.</p>`,
          code: {
            label: 'AutoProperty.cs',
            lang: 'csharp',
            src: `class Student
{
    public string Name { get; set; }
    public int Age { get; set; }
}

Student s = new Student();
s.Name = "지수";
s.Age = 17;
Console.WriteLine(s.Name);
Console.WriteLine(s.Age);`,
            out: `지수
17`
          }
        },
        {
          h: 'private set: 바깥에서 못 바꾸게 막기',
          html: `<p><code>set</code> 접근자에 <code>private</code>를 붙이면, 클래스 <b>내부(생성자 등)</b>에서만 값을 바꿀 수 있고 클래스 바깥에서는 읽기만 가능해져요. 값이 함부로 바뀌는 걸 막는 흔한 방법이에요.</p>`,
          code: {
            label: 'PrivateSet.cs',
            lang: 'csharp',
            src: `class Student
{
    public string Name { get; private set; }

    public Student(string name)
    {
        Name = name;
    }
}

Student s = new Student("민준");
Console.WriteLine(s.Name);
// s.Name = "다른이름"; // 오류! private set이라 바깥에서 못 바꿔요`,
            out: `민준`
          },
          after: `<div class="note"><b>정리</b> — 필드를 <code>public</code>으로 그대로 노출하는 대신 프로퍼티를 쓰면, 나중에 검증 로직을 추가하거나 읽기 전용으로 바꾸는 등 <b>캡슐화</b>가 훨씬 쉬워져요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>public int Age { get; set; }</code>처럼 컴파일러가 내부 필드를 자동으로 만들어주는 프로퍼티를 뭐라고 부르나요?',
          '자동 구현 프로퍼티(auto-implemented property)', ['정적 프로퍼티', '읽기 전용 필드', '익명 타입'],
          '{ get; set; }만 적으면 컴파일러가 뒤에 숨겨진 필드를 자동으로 만들어주는 자동 구현 프로퍼티예요.',
          '"자동으로 구현됐다"는 뜻의 이름이에요.'
        ),
        () => ({
          type: 'blank',
          q: `프로퍼티의 set 접근자를 클래스 내부에서만 쓸 수 있게 제한하려면 어떤 키워드를 set 앞에 붙이나요?`,
          prefix: 'public string Name { get; ', suffix: ' set; }', accept: ['private'], placeholder: '키워드',
          why: '<code>private set</code>은 클래스 바깥에서 값을 바꾸지 못하게 막아요.',
          hint: '접근 제한자 중 가장 좁은 범위예요.'
        }),
        () => {
          const age = randInt(15, 30);
          return {
            type: 'blank',
            q: `<code>class P { public int Age { get; set; } } P p = new P(); p.Age = ${age}; Console.WriteLine(p.Age);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(age)], placeholder: '숫자',
            why: `set으로 대입한 ${age}가 get으로 그대로 읽혀요.`,
            hint: '대입한 값이 그대로 조회돼요.'
          };
        },
        () => makeChoice(
          '필드를 public으로 그대로 노출하지 않고 프로퍼티를 쓰는 이유로 가장 알맞은 것은?',
          '나중에 값 검증이나 접근 제한 로직을 추가하기 쉬워진다(캡슐화)', ['프로퍼티가 필드보다 항상 실행 속도가 빠르다', '프로퍼티는 static이어야만 한다', '프로퍼티는 생성자에서 쓸 수 없다'],
          '프로퍼티는 겉보기엔 필드 같지만 get/set 로직을 자유롭게 바꿀 수 있어 캡슐화에 유리해요.',
          '"나중에 바꾸기 쉬운가"를 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Title</code>(string)과 <code>Pages</code>(int) 자동 구현 프로퍼티를 가진 <code>Book</code> 클래스를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'class Book\n{\n    public string Title { get; set; }\n    public int Pages { get; set; }\n}',
          accept: ['class Book\n{\n    public string Title { get; set; }\n    public int Pages { get; set; }\n}'],
          why: '{ get; set; }를 붙이면 컴파일러가 내부 필드를 자동으로 만들어줘요.',
          hint: 'public string Title { get; set; } 형태로 두 프로퍼티를 선언하세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        return {
          type: 'blank',
          q: `<code>class Student { public string Name { get; private set; } public Student(string name) { Name = name; } } Student s = new Student("${name}"); Console.WriteLine(s.Name);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [name], placeholder: '출력 결과',
          why: `생성자에서 대입된 Name 값 "${name}"이 get으로 그대로 읽혀요.`,
          hint: '생성자에서 설정한 값이 그대로 조회돼요.'
        };
      }
    },
    {
      id: 'accessModifiersEncapsulation',
      title: '접근 제한자와 캡슐화',
      ready: true,
      summary: 'public/private/protected/internal로 접근 범위를 제어하는 캡슐화를 배워요.',
      goals: ['public/private/protected/internal의 차이 이해하기', '필드를 private으로 숨기고 프로퍼티로 노출하기', '캡슐화의 목적(내부 구현 보호) 이해하기'],
      blocks: [
        {
          h: '네 가지 접근 제한자',
          html: `<p><code>public</code>은 어디서나, <code>private</code>는 같은 클래스 안에서만, <code>protected</code>는 같은 클래스와 <b>파생 클래스</b>에서, <code>internal</code>은 같은 <b>어셈블리(프로젝트)</b> 안에서 접근 가능해요.</p>`,
          code: {
            label: 'AccessModifiers.cs',
            lang: 'csharp',
            src: `class BankAccount
{
    private decimal balance;

    public BankAccount(decimal initial)
    {
        balance = initial;
    }

    public decimal GetBalance()
    {
        return balance;
    }
}

BankAccount acc = new BankAccount(1000);
Console.WriteLine(acc.GetBalance());
// Console.WriteLine(acc.balance); // 오류! balance는 private`,
            out: `1000`
          }
        },
        {
          h: '캡슐화: 내부 구현을 숨기고 안전한 통로만 제공',
          html: `<p><b>캡슐화</b>는 내부 데이터를 직접 건드리지 못하게 숨기고, 정해진 메서드/프로퍼티를 통해서만 접근하게 만드는 설계 원칙이에요. 이렇게 하면 잘못된 값이 들어오는 걸 미리 막을 수 있어요.</p>`,
          code: {
            label: 'Encapsulation.cs',
            lang: 'csharp',
            src: `class BankAccount
{
    private decimal balance;

    public BankAccount(decimal initial)
    {
        balance = initial;
    }

    public void Deposit(decimal amount)
    {
        if (amount > 0)
        {
            balance += amount;
        }
    }

    public decimal GetBalance()
    {
        return balance;
    }
}

BankAccount acc = new BankAccount(1000);
acc.Deposit(-500); // 무시됨(검증 로직 덕분에)
acc.Deposit(200);
Console.WriteLine(acc.GetBalance());`,
            out: `1200`
          },
          after: `<div class="note"><b>정리</b> — balance를 public으로 뒀다면 <code>acc.balance = -9999;</code> 같은 코드로 잔액이 마음대로 망가질 수 있어요. private + Deposit 메서드 조합이 그런 사고를 막아줘요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '같은 클래스 내부에서만 접근할 수 있게 만드는 접근 제한자는?',
          'private', ['public', 'protected', 'internal'],
          '<code>private</code>는 선언된 클래스 내부에서만 접근할 수 있어요.',
          '"사적인, 개인적인"이라는 뜻이에요.'
        ),
        () => ({
          type: 'blank',
          q: `자기 클래스와 그 클래스를 상속한 파생 클래스에서 접근할 수 있게 하는 접근 제한자를 쓰세요.`,
          prefix: '', suffix: '', accept: ['protected'], placeholder: '키워드',
          why: '<code>protected</code>는 자신과 파생 클래스에서만 접근 가능해요.',
          hint: '"보호된"이라는 뜻이에요.'
        }),
        () => makeChoice(
          '필드를 private으로 감추고 public 메서드/프로퍼티로만 접근하게 만드는 설계 원칙의 이름은?',
          '캡슐화(encapsulation)', ['상속(inheritance)', '다형성(polymorphism)', '오버로딩(overloading)'],
          '내부 상태를 숨기고 정해진 통로로만 접근하게 하는 원칙을 캡슐화라고 해요.',
          '"캡슐에 감싸다"라는 이미지를 떠올려보세요.'
        ),
        () => {
          const dep = randInt(100, 500);
          return {
            type: 'blank',
            q: `<code>class Acc { private int balance = 1000; public void Deposit(int a) { if (a > 0) balance += a; } public int Get() { return balance; } } Acc acc = new Acc(); acc.Deposit(${dep}); Console.WriteLine(acc.Get());</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(1000 + dep)], placeholder: '숫자',
            why: `1000에 ${dep}가 더해져 ${1000 + dep}이 돼요.`,
            hint: '초기값에 입금액을 더해보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>private int score;</code> 필드와, 생성자로 초기화하고 <code>public int GetScore()</code>로 값을 읽게 하는 <code>Exam</code> 클래스를 작성하세요.',
          starter: '',
          rows: 8,
          placeholder: 'class Exam\n{\n    private int score;\n\n    public Exam(int score)\n    {\n        this.score = score;\n    }\n\n    public int GetScore()\n    {\n        return score;\n    }\n}',
          accept: ['class Exam\n{\n    private int score;\n\n    public Exam(int score)\n    {\n        this.score = score;\n    }\n\n    public int GetScore()\n    {\n        return score;\n    }\n}'],
          why: 'private 필드는 바깥에서 직접 접근할 수 없으므로 GetScore 같은 public 메서드로 읽게 해요.',
          hint: 'this.score = score;로 매개변수와 필드 이름 충돌을 해결해요.'
        }),
      ],
      boss: () => {
        const init = randInt(1000, 5000);
        return {
          type: 'blank',
          q: `<code>class Acc { private int balance; public Acc(int b) { balance = b; } public int Get() { return balance; } } Acc a = new Acc(${init}); Console.WriteLine(a.Get());</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(init)], placeholder: '숫자',
          why: `생성자에서 balance에 ${init}이 저장되고, Get()으로 그대로 읽혀요.`,
          hint: '생성자 인자가 그대로 필드에 저장돼요.'
        };
      }
    },
    {
      id: 'staticConstReadonly',
      title: 'static, const, readonly',
      ready: true,
      summary: '객체마다가 아닌 클래스 전체가 공유하는 static 멤버와, 두 종류의 상수를 배워요.',
      goals: ['static 필드/메서드는 객체 없이 공유됨을 이해하기', 'const는 컴파일 시점 상수임을 이해하기', 'readonly는 실행 중 한 번만 대입 가능함을 이해하기'],
      blocks: [
        {
          h: 'static: 객체가 아니라 클래스에 속하는 멤버',
          html: `<p><code>static</code> 필드/메서드는 특정 객체가 아니라 <b>클래스 자체</b>에 속해요. 모든 객체가 <b>하나의 값을 공유</b>하고, <code>클래스이름.멤버</code>로 접근하며 객체(인스턴스)를 만들지 않아도 사용할 수 있어요.</p>`,
          code: {
            label: 'StaticMembers.cs',
            lang: 'csharp',
            src: `class Counter
{
    public static int Total = 0;

    public Counter()
    {
        Total++;
    }
}

new Counter();
new Counter();
new Counter();
Console.WriteLine(Counter.Total);`,
            out: `3`
          }
        },
        {
          h: 'const vs readonly',
          html: `<p><code>const</code>는 선언과 동시에 값을 주는 <b>컴파일 시점 상수</b>로, 절대 바뀌지 않아요. <code>readonly</code>는 선언 시점이나 <b>생성자 안에서 딱 한 번</b> 값을 대입할 수 있고, 이후에는 바꿀 수 없어요(객체마다 다른 값이 가능해요).</p>`,
          code: {
            label: 'ConstReadonly.cs',
            lang: 'csharp',
            src: `class Circle
{
    public const double Pi = 3.14159;
    public readonly double Radius;

    public Circle(double radius)
    {
        Radius = radius; // 생성자에서 한 번만 대입 가능
    }
}

Circle c = new Circle(2.0);
Console.WriteLine(Circle.Pi);
Console.WriteLine(c.Radius);`,
            out: `3.14159
2`
          },
          after: `<div class="note"><b>정리</b> — const는 값 자체가 코드에 새겨져 절대 안 바뀌고(예: 원주율), readonly는 객체마다 다른 값을 가지되 한 번 정해지면 안 바뀌는 값(예: 반지름)에 알맞아요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '객체를 만들지 않고 클래스 이름으로 바로 접근할 수 있는 멤버를 만드는 키워드는?',
          'static', ['const', 'readonly', 'private'],
          '<code>static</code> 멤버는 클래스 전체에 하나만 존재하고 클래스 이름으로 접근해요.',
          '"정적인"이라는 뜻으로, 객체마다 따로 있지 않아요.'
        ),
        () => ({
          type: 'blank',
          q: `선언 시점 또는 생성자 안에서 딱 한 번만 값을 대입할 수 있는 필드 키워드를 쓰세요. (const보다 유연함)`,
          prefix: '', suffix: '', accept: ['readonly'], placeholder: '키워드',
          why: '<code>readonly</code>는 생성자에서 객체마다 다른 값을 한 번만 대입할 수 있어요.',
          hint: '"읽기 전용"이라는 뜻이에요.'
        }),
        () => makeChoice(
          'const와 readonly의 차이로 옳은 것은?',
          'const는 선언과 동시에 고정값이어야 하지만, readonly는 생성자에서 객체마다 다른 값을 줄 수 있다', ['const는 객체마다 다른 값을 가질 수 있다', 'readonly는 값을 여러 번 바꿀 수 있다', '둘은 완전히 같은 의미다'],
          'const는 컴파일 시점에 고정된 하나의 값, readonly는 객체 생성 시점에 한 번 정해지는 값이라는 차이가 있어요.',
          '"생성자에서 값을 다르게 줄 수 있는가"가 핵심이에요.'
        ),
        () => {
          const n = randInt(2, 6);
          return {
            type: 'blank',
            q: `<code>class C { public static int Total = 0; public C() { Total++; } } for (int i = 0; i < ${n}; i++) { new C(); } Console.WriteLine(C.Total);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `new C()가 ${n}번 호출될 때마다 정적 필드 Total이 1씩 늘어 ${n}이 돼요.`,
            hint: '객체가 만들어질 때마다 static 값이 공유되어 늘어나요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>public const double Pi = 3.14;</code>와, 생성자에서만 값을 받는 <code>public readonly double Radius;</code>를 가진 <code>Circle</code> 클래스를 작성하세요.',
          starter: '',
          rows: 8,
          placeholder: 'class Circle\n{\n    public const double Pi = 3.14;\n    public readonly double Radius;\n\n    public Circle(double radius)\n    {\n        Radius = radius;\n    }\n}',
          accept: ['class Circle\n{\n    public const double Pi = 3.14;\n    public readonly double Radius;\n\n    public Circle(double radius)\n    {\n        Radius = radius;\n    }\n}'],
          why: 'const는 선언과 동시에 값을 주고, readonly는 생성자 안에서 한 번 대입해요.',
          hint: 'const는 즉시 초기화, readonly는 생성자에서 초기화하세요.'
        }),
      ],
      boss: () => {
        const n = randInt(3, 7);
        return {
          type: 'blank',
          q: `<code>class C { public static int Total = 0; public C() { Total++; } } for (int i = 0; i < ${n}; i++) { new C(); } Console.WriteLine(C.Total);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
          why: `static 필드는 모든 객체가 공유하므로, ${n}번 생성되면 ${n}이 돼요.`,
          hint: '생성자 호출 횟수만큼 static 값이 늘어나요.'
        };
      }
    },
    {
      id: 'structVsClassGeneral',
      title: 'struct와 class: 값 타입 vs 참조 타입',
      ready: true,
      summary: '값이 복사되는 struct(값 타입)와 참조가 공유되는 class(참조 타입)의 차이를 배워요.',
      goals: ['값 타입과 참조 타입의 근본적 차이 이해하기', 'struct 대입 시 복사가 일어남을 확인하기', 'class 대입 시 같은 객체를 가리키게 됨을 확인하기'],
      blocks: [
        {
          h: 'struct: 값 타입(value type)',
          html: `<p><code>struct</code>로 만든 타입은 <b>값 타입</b>이에요. 변수에 대입하거나 메서드에 전달하면 값이 통째로 <b>복사</b>돼요. 그래서 복사본을 바꿔도 원본은 영향받지 않아요. <code>int</code>, <code>double</code>, <code>bool</code> 같은 기본 타입도 모두 struct 기반이에요.</p>`,
          code: {
            label: 'StructValueType.cs',
            lang: 'csharp',
            src: `struct Point
{
    public int X;
    public int Y;
}

Point p1 = new Point { X = 1, Y = 2 };
Point p2 = p1; // 값이 복사됨
p2.X = 99;

Console.WriteLine(p1.X);
Console.WriteLine(p2.X);`,
            out: `1
99`
          }
        },
        {
          h: 'class: 참조 타입(reference type)',
          html: `<p><code>class</code>로 만든 타입은 <b>참조 타입</b>이에요. 변수에는 객체 자체가 아니라 객체를 가리키는 <b>참조(주소)</b>가 저장돼요. 대입하면 참조만 복사되어, 두 변수가 <b>같은 객체</b>를 가리키게 돼요.</p>`,
          code: {
            label: 'ClassReferenceType.cs',
            lang: 'csharp',
            src: `class PointClass
{
    public int X;
    public int Y;
}

PointClass p1 = new PointClass { X = 1, Y = 2 };
PointClass p2 = p1; // 참조가 복사됨(같은 객체를 가리킴)
p2.X = 99;

Console.WriteLine(p1.X);
Console.WriteLine(p2.X);`,
            out: `99
99`
          },
          after: `<div class="note"><b>정리</b> — struct는 "값 자체를 복사"하고 class는 "참조를 복사"해요. 작고 불변에 가까운 데이터(좌표, 색상 등)는 struct로, 크고 정체성이 중요한 객체(사람, 계좌 등)는 class로 만드는 게 일반적이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'struct 타입 변수를 다른 변수에 대입했을 때 일어나는 일은?',
          '값 전체가 복사되어 서로 독립된 사본이 된다', ['같은 객체를 가리키는 참조가 복사된다', '원본이 사라지고 새 변수만 남는다', '컴파일 오류가 발생한다'],
          'struct는 값 타입이라 대입 시 값 전체가 복사되어 서로 영향을 주지 않아요.',
          '"복사본을 만든다"는 이미지를 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `int, double, bool처럼 대입 시 값이 복사되는 타입을 뭐라고 부르나요? (영어 두 단어, 예: ___ type)`,
          prefix: '', suffix: ' type', accept: ['value'], placeholder: '단어',
          why: '값이 그대로 복사되는 타입을 "값 타입(value type)"이라고 불러요.',
          hint: '"값"이라는 뜻의 단어예요.'
        }),
        () => makeChoice(
          'class 타입 변수 두 개가 같은 객체를 대입받았을 때, 하나를 통해 필드 값을 바꾸면?',
          '다른 변수로 봐도 바뀐 값이 보인다(같은 객체를 참조하므로)', ['다른 변수는 영향받지 않는다', '두 변수 모두 null이 된다', '컴파일 오류가 발생한다'],
          'class는 참조 타입이라 두 변수가 같은 객체를 가리키므로, 한쪽에서 바꾼 값이 다른 쪽에도 그대로 보여요.',
          '두 변수가 "같은 대상"을 가리키고 있어요.'
        ),
        () => {
          const x1 = randInt(1, 10), newX = randInt(50, 99);
          return {
            type: 'blank',
            q: `<code>struct P { public int X; } P a = new P { X = ${x1} }; P b = a; b.X = ${newX}; Console.WriteLine(a.X);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(x1)], placeholder: '숫자',
            why: `struct는 값이 복사되므로 b.X를 바꿔도 a.X는 그대로 ${x1}이에요.`,
            hint: '값 타입은 복사되므로 원본이 영향받지 않아요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>X</code>와 <code>Y</code>(둘 다 int) 필드를 가진 <code>struct Point</code>를 정의하세요.',
          starter: '',
          rows: 4,
          placeholder: 'struct Point\n{\n    public int X;\n    public int Y;\n}',
          accept: ['struct Point\n{\n    public int X;\n    public int Y;\n}'],
          why: 'struct 키워드로 값 타입 Point를 정의하고 두 필드를 선언하면 돼요.',
          hint: 'struct Point { public int X; public int Y; }'
        }),
      ],
      boss: () => {
        const x1 = randInt(1, 10), newX = randInt(50, 99);
        return {
          type: 'blank',
          q: `<code>class P { public int X; } P a = new P { X = ${x1} }; P b = a; b.X = ${newX}; Console.WriteLine(a.X);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(newX)], placeholder: '숫자',
          why: `class는 참조 타입이라 a와 b가 같은 객체를 가리키므로, b.X를 바꾸면 a.X도 ${newX}가 돼요.`,
          hint: '참조 타입은 두 변수가 같은 객체를 가리켜요.'
        };
      }
    },
    {
      id: 'enumTypesCSharp',
      title: '열거형(enum)',
      ready: true,
      summary: '정해진 값들만 가질 수 있는 타입인 enum을 정의하고 사용해요.',
      goals: ['enum으로 이름 붙은 상수 집합 정의하기', 'enum 값이 내부적으로 정수임을 이해하기', '명시적으로 숫자 값을 지정하는 방법 알기'],
      blocks: [
        {
          h: 'enum: 이름 붙은 값들의 집합',
          html: `<p><code>enum</code>은 정해진 값들만 가질 수 있는 타입을 정의해요. 매직 넘버(0, 1, 2...)나 아무 문자열이나 쓰는 대신, 의미 있는 이름으로 상태를 표현할 수 있어요.</p>`,
          code: {
            label: 'EnumBasics.cs',
            lang: 'csharp',
            src: `enum Weekday
{
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday
}

Weekday today = Weekday.Wednesday;
Console.WriteLine(today);
Console.WriteLine((int)today);`,
            out: `Wednesday
2`
          }
        },
        {
          h: '기본값은 0부터, 명시적 값도 지정 가능',
          html: `<p>enum 값은 내부적으로 정수예요. 아무것도 지정하지 않으면 첫 번째 값이 0, 그다음이 1... 순서대로 매겨져요. 필요하면 <code>= 값</code>으로 직접 숫자를 지정할 수도 있어요.</p>`,
          code: {
            label: 'EnumExplicitValues.cs',
            lang: 'csharp',
            src: `enum HttpStatus
{
    Ok = 200,
    NotFound = 404,
    ServerError = 500
}

HttpStatus status = HttpStatus.NotFound;
Console.WriteLine(status);
Console.WriteLine((int)status);`,
            out: `NotFound
404`
          },
          after: `<div class="note"><b>정리</b> — enum은 "여러 개의 정해진 상태 중 하나"를 표현할 때 문자열이나 숫자보다 훨씬 안전해요. 오타로 잘못된 값을 넣는 실수를 컴파일 시점에 막아줘요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'enum에 아무 숫자도 지정하지 않으면 첫 번째 값은 몇 번부터 시작하나요?',
          '0', ['1', '-1', '알 수 없음'],
          'enum 값을 따로 지정하지 않으면 첫 번째 값부터 0, 1, 2... 순서로 자동 매겨져요.',
          '대부분의 인덱스처럼 0부터 시작해요.'
        ),
        () => ({
          type: 'blank',
          q: `정해진 이름 붙은 값들의 집합을 정의하는 C# 키워드를 쓰세요.`,
          prefix: '', suffix: ' Weekday { Monday, Tuesday }', accept: ['enum'], placeholder: '키워드',
          why: '<code>enum</code>은 이름 붙은 상수 집합을 정의하는 키워드예요.',
          hint: '"열거하다"라는 뜻의 단어예요.'
        }),
        () => {
          const idx = randInt(0, 4);
          const names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
          return {
            type: 'blank',
            q: `<code>enum Weekday { Monday, Tuesday, Wednesday, Thursday, Friday } Weekday d = Weekday.${names[idx]}; Console.WriteLine((int)d);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(idx)], placeholder: '숫자',
            why: `${names[idx]}는 순서상 ${idx}번째(0부터 시작)이므로 정수값은 ${idx}예요.`,
            hint: '선언 순서대로 0부터 번호가 매겨져요.'
          };
        },
        () => makeChoice(
          '<code>enum HttpStatus { Ok = 200, NotFound = 404 }</code>에서 <code>HttpStatus.Ok</code>를 <code>(int)</code>로 변환하면?',
          '200', ['0', '1', '404'],
          'Ok에 명시적으로 200을 지정했으므로 그 값 그대로예요.',
          '지정된 숫자가 그대로 사용돼요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Red</code>, <code>Green</code>, <code>Blue</code> 값을 가진 <code>enum Color</code>를 정의하세요.',
          starter: '',
          rows: 5,
          placeholder: 'enum Color\n{\n    Red,\n    Green,\n    Blue\n}',
          accept: ['enum Color\n{\n    Red,\n    Green,\n    Blue\n}'],
          why: 'enum 키워드 뒤에 이름을 쓰고, 중괄호 안에 값들을 쉼표로 나열하면 돼요.',
          hint: 'enum Color { Red, Green, Blue }'
        }),
      ],
      boss: () => {
        const status = pick(['Ok', 'NotFound', 'ServerError']);
        const map = { Ok: 200, NotFound: 404, ServerError: 500 };
        return {
          type: 'blank',
          q: `<code>enum HttpStatus { Ok = 200, NotFound = 404, ServerError = 500 } HttpStatus s = HttpStatus.${status}; Console.WriteLine((int)s);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(map[status])], placeholder: '숫자',
          why: `${status}에 명시적으로 지정된 값은 ${map[status]}이에요.`,
          hint: '각 값에 지정된 숫자를 확인하세요.'
        };
      }
    },
    {
      id: 'inheritanceBasicsCSharp',
      title: '상속: base class와 derived class',
      ready: true,
      summary: '기존 클래스의 기능을 물려받아 확장하는 상속을 배워요.',
      goals: [': 로 클래스 상속하기', '파생 클래스가 부모의 필드/메서드를 물려받음을 이해하기', 'base()로 부모 생성자 호출하기'],
      blocks: [
        {
          h: '상속: 부모의 기능을 물려받기',
          html: `<p><code>class Derived : Base</code>처럼 콜론(<code>:</code>)을 쓰면 <b>상속</b>이 이루어져요. 파생(자식) 클래스는 부모(기반) 클래스의 <code>public</code>/<code>protected</code> 멤버를 그대로 물려받아 쓸 수 있어요.</p>`,
          code: {
            label: 'InheritanceBasics.cs',
            lang: 'csharp',
            src: `class Animal
{
    public string Name;

    public void Eat()
    {
        Console.WriteLine($"{Name}이(가) 먹이를 먹어요.");
    }
}

class Dog : Animal
{
    public void Bark()
    {
        Console.WriteLine($"{Name}이(가) 짖어요: 멍멍!");
    }
}

Dog d = new Dog();
d.Name = "초코";
d.Eat();
d.Bark();`,
            out: `초코이(가) 먹이를 먹어요.
초코이(가) 짖어요: 멍멍!`
          }
        },
        {
          h: 'base(): 부모의 생성자 호출하기',
          html: `<p>부모 클래스에 생성자가 있으면, 자식 클래스의 생성자에서 <code>: base(인자들)</code>로 부모 생성자를 명시적으로 호출할 수 있어요.</p>`,
          code: {
            label: 'BaseConstructor.cs',
            lang: 'csharp',
            src: `class Animal
{
    public string Name;

    public Animal(string name)
    {
        Name = name;
    }
}

class Dog : Animal
{
    public Dog(string name) : base(name)
    {
    }
}

Dog d = new Dog("초코");
Console.WriteLine(d.Name);`,
            out: `초코`
          },
          after: `<div class="note"><b>정리</b> — 상속은 "is-a(~은 ~이다)" 관계에 알맞아요. Dog는 Animal의 한 종류(Dog is an Animal)이므로 Animal의 공통 기능을 물려받고, Dog만의 기능(Bark)을 추가하는 식이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'C#에서 클래스 상속을 표현하는 문법은?',
          'class Dog : Animal', ['class Dog extends Animal', 'class Dog implements Animal', 'class Dog inherits Animal'],
          'C#은 콜론(:) 하나로 클래스 상속과 인터페이스 구현을 모두 표현해요.',
          'Java의 extends와는 다른 기호예요.'
        ),
        () => ({
          type: 'blank',
          q: `자식 클래스 생성자에서 부모 클래스의 생성자를 명시적으로 호출할 때 쓰는 키워드를 쓰세요. (: ___(인자))`,
          prefix: 'public Dog(string name) : ', suffix: '(name) { }', accept: ['base'], placeholder: '키워드',
          why: '<code>: base(인자)</code>는 부모 클래스의 생성자를 호출해요.',
          hint: '"기반, 토대"라는 뜻의 단어예요.'
        }),
        () => {
          const name = pick(['초코', '뽀삐', '보리']);
          return {
            type: 'blank',
            q: `<code>class Animal { public string Name; public void Eat() { Console.WriteLine($"{Name} 먹는 중"); } } class Dog : Animal { } Dog d = new Dog(); d.Name = "${name}"; d.Eat();</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [`${name} 먹는 중`], placeholder: '출력 결과',
            why: `Dog는 Animal을 상속받아 Eat()과 Name을 그대로 물려받아요.`,
            hint: '자식 클래스는 부모의 public 멤버를 그대로 쓸 수 있어요.'
          };
        },
        () => makeChoice(
          '상속 관계를 잘 나타내는 설명은?',
          '"Dog는 Animal의 한 종류다"처럼 is-a 관계에 알맞다', ['상속은 아무 클래스끼리나 관련 없이 코드를 재사용할 때 쓴다', '상속받으면 부모의 private 멤버도 자유롭게 쓸 수 있다', '한 클래스는 상속을 받을 수 없다'],
          '상속은 "A는 B의 한 종류다(is-a)"라는 개념적 관계가 성립할 때 쓰는 게 자연스러워요.',
          '"종류(kind of)" 관계를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Name</code> 필드를 가진 <code>Animal</code> 클래스와, 이를 상속하며 <code>Bark()</code> 메서드를 추가로 가진 <code>Dog : Animal</code> 클래스를 작성하세요.',
          starter: '',
          rows: 10,
          placeholder: 'class Animal\n{\n    public string Name;\n}\n\nclass Dog : Animal\n{\n    public void Bark()\n    {\n        Console.WriteLine($"{Name}이(가) 짖어요!");\n    }\n}',
          accept: ['class Animal\n{\n    public string Name;\n}\n\nclass Dog : Animal\n{\n    public void Bark()\n    {\n        Console.WriteLine($"{Name}이(가) 짖어요!");\n    }\n}'],
          why: 'class Dog : Animal로 상속받으면 Name 필드도 그대로 쓸 수 있어요.',
          hint: 'class Dog : Animal { public void Bark() { ... } }'
        }),
      ],
      boss: () => {
        const name = pick(['초코', '뽀삐', '보리']);
        return {
          type: 'blank',
          q: `<code>class Animal { public string Name; public Animal(string name) { Name = name; } } class Dog : Animal { public Dog(string name) : base(name) { } } Dog d = new Dog("${name}"); Console.WriteLine(d.Name);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [name], placeholder: '출력 결과',
          why: `Dog의 생성자가 base(name)으로 Animal의 생성자를 호출해 Name에 "${name}"을 저장해요.`,
          hint: 'base()가 부모 생성자를 그대로 실행해요.'
        };
      }
    },
    {
      id: 'overrideVirtualBase',
      title: 'virtual / override / base로 동작 재정의하기',
      ready: true,
      summary: '부모의 메서드를 자식이 다르게 동작하도록 재정의하는 다형성을 배워요.',
      goals: ['virtual로 재정의 가능한 메서드 선언하기', 'override로 자식에서 동작 재정의하기', 'base.메서드()로 부모의 원래 동작 호출하기'],
      blocks: [
        {
          h: 'virtual과 override: 다형성의 핵심',
          html: `<p>부모 클래스에서 메서드를 <code>virtual</code>로 선언하면, 자식 클래스에서 <code>override</code>로 그 메서드를 <b>다시 정의</b>할 수 있어요. 부모 타입 변수에 자식 객체를 담아 호출해도, 실제로는 자식이 재정의한 버전이 실행돼요(다형성).</p>`,
          code: {
            label: 'VirtualOverride.cs',
            lang: 'csharp',
            src: `class Animal
{
    public virtual void Speak()
    {
        Console.WriteLine("...");
    }
}

class Dog : Animal
{
    public override void Speak()
    {
        Console.WriteLine("멍멍!");
    }
}

Animal a = new Dog();
a.Speak();`,
            out: `멍멍!`
          }
        },
        {
          h: 'base.메서드(): 부모의 원래 동작도 함께 실행하기',
          html: `<p>재정의한 메서드 안에서 <code>base.메서드()</code>를 호출하면, 부모의 원래 구현도 함께 실행할 수 있어요. 완전히 새로 만드는 대신 부모 동작에 <b>덧붙이는</b> 방식이에요.</p>`,
          code: {
            label: 'BaseCall.cs',
            lang: 'csharp',
            src: `class Animal
{
    public virtual void Speak()
    {
        Console.WriteLine("동물이 소리를 내요.");
    }
}

class Dog : Animal
{
    public override void Speak()
    {
        base.Speak();
        Console.WriteLine("멍멍!");
    }
}

Animal a = new Dog();
a.Speak();`,
            out: `동물이 소리를 내요.
멍멍!`
          },
          after: `<div class="note"><b>정리</b> — virtual/override 없이 그냥 새 메서드를 만들면(이름만 같게) "숨김(hiding)"이 되어 다형성이 깨져요. 진짜 재정의를 원한다면 반드시 부모는 virtual, 자식은 override를 써야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '자식 클래스가 재정의할 수 있도록 부모 클래스 메서드에 붙이는 키워드는?',
          'virtual', ['static', 'sealed', 'const'],
          '<code>virtual</code>로 선언된 메서드만 자식에서 override할 수 있어요.',
          '"가상의"라는 뜻으로, 실제 실행될 버전이 나중에 정해질 수 있어요.'
        ),
        () => ({
          type: 'blank',
          q: `자식 클래스에서 부모의 virtual 메서드를 다시 정의할 때 붙이는 키워드를 쓰세요.`,
          prefix: 'public ', suffix: ' void Speak() { }', accept: ['override'], placeholder: '키워드',
          why: '<code>override</code>는 부모의 virtual 메서드를 재정의해요.',
          hint: '"재정의하다"라는 뜻의 단어예요.'
        }),
        () => makeChoice(
          '<code>Animal a = new Dog();</code>처럼 부모 타입 변수에 자식 객체를 담고 override된 메서드를 호출하면?',
          '실제 객체(Dog)의 재정의된 버전이 실행된다', ['변수의 선언 타입(Animal)의 버전이 실행된다', '컴파일 오류가 발생한다', '아무 것도 실행되지 않는다'],
          'virtual/override 덕분에 실제 객체 타입의 메서드가 실행돼요. 이를 다형성(polymorphism)이라고 해요.',
          '변수의 "선언 타입"이 아니라 "실제 객체"가 기준이에요.'
        ),
        () => {
          const sound = pick(['야옹!', '음메!', '꿀꿀!']);
          return {
            type: 'blank',
            q: `<code>class Animal { public virtual void Speak() { Console.WriteLine("..."); } } class Cat : Animal { public override void Speak() { Console.WriteLine("${sound}"); } } Animal a = new Cat(); a.Speak();</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [sound], placeholder: '출력 결과',
            why: `a는 Animal 타입이지만 실제 객체는 Cat이므로 재정의된 Speak()가 실행돼요.`,
            hint: '실제 객체 타입의 메서드가 호출돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>virtual void Speak()</code>를 가진 <code>Animal</code> 클래스와, 이를 <code>override</code>하여 <code>"야옹!"</code>을 출력하는 <code>Cat : Animal</code> 클래스를 작성하세요.',
          starter: '',
          rows: 10,
          placeholder: 'class Animal\n{\n    public virtual void Speak()\n    {\n        Console.WriteLine("...");\n    }\n}\n\nclass Cat : Animal\n{\n    public override void Speak()\n    {\n        Console.WriteLine("야옹!");\n    }\n}',
          accept: ['class Animal\n{\n    public virtual void Speak()\n    {\n        Console.WriteLine("...");\n    }\n}\n\nclass Cat : Animal\n{\n    public override void Speak()\n    {\n        Console.WriteLine("야옹!");\n    }\n}'],
          why: '부모는 virtual로, 자식은 override로 선언해야 재정의가 성립해요.',
          hint: 'public virtual void Speak() 와 public override void Speak() 짝을 맞추세요.'
        }),
      ],
      boss: () => {
        const sound = pick(['멍멍!', '야옹!', '꽥꽥!']);
        return {
          type: 'blank',
          q: `<code>class Animal { public virtual void Speak() { Console.WriteLine("동물 소리"); } } class Duck : Animal { public override void Speak() { base.Speak(); Console.WriteLine("${sound}"); } } Animal a = new Duck(); a.Speak();</code>를 실행하면? (두 줄, 형식: 동물 소리\\n${sound})`,
          prefix: '', suffix: '', accept: [`동물 소리\n${sound}`], placeholder: '출력 결과',
          why: `base.Speak()로 부모의 출력을 먼저 실행한 뒤, 자식이 추가한 "${sound}"이 출력돼요.`,
          hint: 'base.Speak() 호출이 먼저 실행돼요.'
        };
      }
    },
    {
      id: 'abstractClassesGeneral',
      title: '추상 클래스(abstract class)',
      ready: true,
      summary: '직접 객체를 만들 수 없고, 공통 틀만 정의하는 추상 클래스를 배워요.',
      goals: ['abstract class는 인스턴스화할 수 없음을 이해하기', 'abstract 메서드는 반드시 자식이 구현해야 함을 이해하기', '일반 메서드와 abstract 메서드를 함께 가질 수 있음을 알기'],
      blocks: [
        {
          h: 'abstract class: 직접 만들 수 없는 설계도',
          html: `<p><code>abstract class</code>는 <code>new</code>로 직접 객체를 만들 수 없어요. 오직 <b>상속받는 용도</b>로만 존재하며, 공통 필드나 이미 구현된 메서드를 자식들에게 물려주는 역할을 해요.</p>`,
          code: {
            label: 'AbstractClassBasics.cs',
            lang: 'csharp',
            src: `abstract class Shape
{
    public string Name = "도형";

    public void PrintName()
    {
        Console.WriteLine(Name);
    }
}

// Shape s = new Shape(); // 오류! 추상 클래스는 직접 만들 수 없어요

class Circle : Shape
{
}

Circle c = new Circle();
c.PrintName();`,
            out: `도형`
          }
        },
        {
          h: 'abstract 메서드: 자식이 반드시 구현해야 하는 약속',
          html: `<p><code>abstract</code> 메서드는 본문(구현) 없이 선언만 하고, 자식 클래스가 <code>override</code>로 반드시 구현해야 해요. 구현하지 않으면 컴파일 오류가 나요.</p>`,
          code: {
            label: 'AbstractMethod.cs',
            lang: 'csharp',
            src: `abstract class Shape
{
    public abstract double Area();
}

class Rectangle : Shape
{
    public double Width, Height;

    public override double Area()
    {
        return Width * Height;
    }
}

Rectangle r = new Rectangle { Width = 3, Height = 4 };
Console.WriteLine(r.Area());`,
            out: `12`
          },
          after: `<div class="note"><b>정리</b> — abstract class는 "일부는 이미 구현됐지만, 일부는 자식마다 반드시 다르게 구현해야 하는" 공통 기반을 만들 때 알맞아요. 자식마다 계산 방식이 다른 Area()가 대표적인 예예요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'abstract class에 대한 설명으로 옳은 것은?',
          'new로 직접 객체를 만들 수 없고 상속 전용으로만 쓰인다', ['일반 클래스처럼 자유롭게 인스턴스화할 수 있다', 'abstract 메서드를 하나도 가질 수 없다', '다른 클래스가 상속받을 수 없다'],
          'abstract class는 직접 인스턴스화가 금지되고, 오직 상속받는 자식 클래스를 통해서만 쓰여요.',
          '"추상적인, 실체가 없는"이라는 뜻을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `본문 없이 선언만 하고 자식이 반드시 구현해야 하는 메서드에 붙이는 키워드를 쓰세요.`,
          prefix: 'public ', suffix: ' double Area();', accept: ['abstract'], placeholder: '키워드',
          why: '<code>abstract</code> 메서드는 자식 클래스가 반드시 override로 구현해야 해요.',
          hint: '클래스 앞에도 붙는 그 키워드예요.'
        }),
        () => makeChoice(
          'abstract 메서드를 가진 자식 클래스가 그 메서드를 구현하지 않으면?',
          '컴파일 오류가 발생한다', ['기본 동작(아무 것도 안 함)으로 자동 채워진다', '실행 시점에만 오류가 발생한다', '문제없이 정상 동작한다'],
          'abstract 메서드는 반드시 override로 구현해야 하며, 하지 않으면 컴파일 자체가 안 돼요.',
          '컴파일러가 "약속을 지켰는지" 미리 확인해요.'
        ),
        () => {
          const w = randInt(2, 8), h = randInt(2, 8);
          return {
            type: 'blank',
            q: `<code>abstract class Shape { public abstract double Area(); } class Rect : Shape { public double W, H; public override double Area() { return W * H; } } Rect r = new Rect { W = ${w}, H = ${h} }; Console.WriteLine(r.Area());</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(w * h)], placeholder: '숫자',
            why: `Area()는 W * H를 계산하므로 ${w} * ${h} = ${w * h}이에요.`,
            hint: '너비와 높이를 곱해보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>abstract double Area();</code>를 가진 <code>Shape</code> 추상 클래스와, <code>Radius</code> 필드로 넓이(<code>3.14 * Radius * Radius</code>)를 계산해 override하는 <code>Circle : Shape</code>를 작성하세요.',
          starter: '',
          rows: 10,
          placeholder: 'abstract class Shape\n{\n    public abstract double Area();\n}\n\nclass Circle : Shape\n{\n    public double Radius;\n\n    public override double Area()\n    {\n        return 3.14 * Radius * Radius;\n    }\n}',
          accept: ['abstract class Shape\n{\n    public abstract double Area();\n}\n\nclass Circle : Shape\n{\n    public double Radius;\n\n    public override double Area()\n    {\n        return 3.14 * Radius * Radius;\n    }\n}'],
          why: 'abstract 메서드를 override로 구현하며 원 넓이 공식을 사용해요.',
          hint: 'public override double Area() { return 3.14 * Radius * Radius; }'
        }),
      ],
      boss: () => {
        const w = randInt(2, 10), h = randInt(2, 10);
        return {
          type: 'blank',
          q: `<code>abstract class Shape { public abstract double Area(); } class Triangle : Shape { public double Base, Height; public override double Area() { return Base * Height / 2; } } Triangle t = new Triangle { Base = ${w}, Height = ${h} }; Console.WriteLine(t.Area());</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String((w * h) / 2)], placeholder: '숫자',
          why: `삼각형 넓이는 밑변 × 높이 ÷ 2이므로 ${w} * ${h} / 2 = ${(w * h) / 2}이에요.`,
          hint: '밑변과 높이를 곱한 뒤 2로 나눠보세요.'
        };
      }
    },
    {
      id: 'interfacesGeneral',
      title: '인터페이스: 여러 개 구현하는 계약',
      ready: true,
      summary: '구현 없이 규격만 정의하고, 여러 개를 동시에 구현할 수 있는 인터페이스를 배워요.',
      goals: ['interface의 역할(구현부 없는 계약) 이해하기', '클래스가 여러 인터페이스를 동시에 구현할 수 있음을 알기', '인터페이스와 추상 클래스의 차이 이해하기'],
      blocks: [
        {
          h: 'interface: 구현 없는 순수한 규격',
          html: `<p><code>interface</code>는 메서드의 <b>이름과 시그니처만</b> 정의하고 구현은 갖지 않아요(C# 8 이전 기준). 이름은 관례상 <code>I</code>로 시작해요(<code>IFlyable</code>처럼). 클래스가 인터페이스를 구현할 때는 콜론(<code>:</code>)을 써요.</p>`,
          code: {
            label: 'InterfaceBasics.cs',
            lang: 'csharp',
            src: `interface IFlyable
{
    void Fly();
}

class Bird : IFlyable
{
    public void Fly()
    {
        Console.WriteLine("새가 날아요.");
    }
}

IFlyable f = new Bird();
f.Fly();`,
            out: `새가 날아요.`
          }
        },
        {
          h: '여러 인터페이스를 동시에 구현하기',
          html: `<p>C#은 클래스가 부모 클래스는 <b>하나만</b> 상속할 수 있지만, 인터페이스는 <b>여러 개를</b> 동시에 구현할 수 있어요. 콤마로 나열해요.</p>`,
          code: {
            label: 'MultipleInterfaces.cs',
            lang: 'csharp',
            src: `interface IFlyable
{
    void Fly();
}

interface ISwimmable
{
    void Swim();
}

class Duck : IFlyable, ISwimmable
{
    public void Fly() { Console.WriteLine("오리가 날아요."); }
    public void Swim() { Console.WriteLine("오리가 헤엄쳐요."); }
}

Duck d = new Duck();
d.Fly();
d.Swim();`,
            out: `오리가 날아요.
오리가 헤엄쳐요.`
          },
          after: `<div class="note"><b>정리</b> — 추상 클래스는 "공통 조상"이 명확한 is-a 관계에, 인터페이스는 "이 기능을 할 수 있다(can-do)"는 능력을 여러 클래스에 공통으로 부여하고 싶을 때 알맞아요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'C#에서 인터페이스 이름을 지을 때 관례적으로 붙이는 접두사는?',
          'I', ['Interface', 'Abs', 'Base'],
          '관례적으로 <code>IFlyable</code>, <code>IDisposable</code>처럼 대문자 I로 시작해요.',
          '"Interface"의 첫 글자예요.'
        ),
        () => ({
          type: 'blank',
          q: `클래스는 부모 클래스를 하나만 상속할 수 있지만, ___는 여러 개를 동시에 구현할 수 있어요.`,
          prefix: '', suffix: '', accept: ['인터페이스', 'interface'], placeholder: '용어',
          why: '인터페이스는 콤마로 나열해 여러 개를 동시에 구현할 수 있어요.',
          hint: 'I로 시작하는 그 개념이에요.'
        }),
        () => makeChoice(
          '클래스 <code>class Duck : IFlyable, ISwimmable</code>에 대한 설명으로 옳은 것은?',
          'Duck은 두 인터페이스의 메서드를 모두 구현해야 한다', ['Duck은 IFlyable만 구현하면 된다', '이 코드는 컴파일 오류다(인터페이스는 하나만 구현 가능)', 'Duck은 인터페이스 없이도 이 코드가 동작한다'],
          '콤마로 나열된 모든 인터페이스의 메서드를 클래스가 구현해야 컴파일이 돼요.',
          '나열된 모든 계약을 지켜야 해요.'
        ),
        () => {
          const sound = pick(['멍멍!', '야옹!', '꽥꽥!']);
          return {
            type: 'blank',
            q: `<code>interface ISpeaker { void Speak(); } class Robot : ISpeaker { public void Speak() { Console.WriteLine("${sound}"); } } ISpeaker s = new Robot(); s.Speak();</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [sound], placeholder: '출력 결과',
            why: 'ISpeaker 타입 변수에 담긴 Robot 객체의 Speak()가 실행돼요.',
            hint: '실제 객체(Robot)의 구현이 호출돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>void Ignite();</code>를 요구하는 <code>IEngine</code> 인터페이스와, 이를 구현하며 <code>"시동 걸림"</code>을 출력하는 <code>Car</code> 클래스를 작성하세요.',
          starter: '',
          rows: 8,
          placeholder: 'interface IEngine\n{\n    void Ignite();\n}\n\nclass Car : IEngine\n{\n    public void Ignite()\n    {\n        Console.WriteLine("시동 걸림");\n    }\n}',
          accept: ['interface IEngine\n{\n    void Ignite();\n}\n\nclass Car : IEngine\n{\n    public void Ignite()\n    {\n        Console.WriteLine("시동 걸림");\n    }\n}'],
          why: 'interface로 규격을 선언하고, 클래스가 콜론(:)으로 구현하면 돼요.',
          hint: 'interface IEngine { void Ignite(); } 다음 class Car : IEngine { public void Ignite() { ... } }'
        }),
      ],
      boss: () => {
        const w = pick(['날아요', '헤엄쳐요', '달려요']);
        return {
          type: 'blank',
          q: `<code>interface IMover { void Move(); } class Duck : IMover { public void Move() { Console.WriteLine("오리가 ${w}."); } } IMover m = new Duck(); m.Move();</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [`오리가 ${w}.`], placeholder: '출력 결과',
          why: `IMover 타입 변수에 담긴 실제 객체(Duck)의 Move() 구현이 실행돼요.`,
          hint: '실제 객체의 구현부가 실행돼요.'
        };
      }
    },
    {
      id: 'interfaceDefaultImplementations',
      title: '인터페이스의 기본 구현 (C# 8+)',
      ready: true,
      summary: 'C# 8부터 인터페이스 메서드에 기본 본문을 줄 수 있게 되었어요.',
      goals: ['인터페이스 기본 구현의 목적 이해하기', '구현 클래스가 기본 구현을 그대로 쓰거나 재정의할 수 있음을 알기', '기존 인터페이스에 멤버를 추가할 때의 이점 이해하기'],
      blocks: [
        {
          h: '기본 구현이 있는 인터페이스 메서드',
          html: `<p>C# 8부터 인터페이스 메서드에 <b>기본 본문(default implementation)</b>을 바로 줄 수 있어요. 이를 구현하는 클래스는 그 메서드를 따로 구현하지 않아도 기본 동작을 그대로 물려받아요.</p>`,
          code: {
            label: 'DefaultInterfaceMethod.cs',
            lang: 'csharp',
            src: `interface IGreeter
{
    void Greet()
    {
        Console.WriteLine("안녕하세요!");
    }
}

class Person : IGreeter
{
}

IGreeter p = new Person();
p.Greet();`,
            out: `안녕하세요!`
          }
        },
        {
          h: '필요하면 재정의도 가능해요',
          html: `<p>구현 클래스는 기본 구현을 그대로 써도 되고, 필요하면 자신만의 버전으로 다시 정의(override 없이 그냥 같은 이름의 public 메서드를 정의)할 수도 있어요.</p>`,
          code: {
            label: 'OverrideDefault.cs',
            lang: 'csharp',
            src: `interface IGreeter
{
    void Greet()
    {
        Console.WriteLine("안녕하세요!");
    }
}

class Robot : IGreeter
{
    public void Greet()
    {
        Console.WriteLine("삐빅. 인사 프로토콜 실행.");
    }
}

IGreeter r = new Robot();
r.Greet();`,
            out: `삐빅. 인사 프로토콜 실행.`
          },
          after: `<div class="note"><b>정리</b> — 기본 구현 덕분에 이미 널리 쓰이는 인터페이스에 새 메서드를 추가해도, 기존에 그 인터페이스를 구현하던 모든 클래스가 당장 깨지지 않아요(기본 동작을 자동으로 물려받으니까요).</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'C# 몇 버전부터 인터페이스 메서드에 기본 구현(본문)을 줄 수 있게 되었나요?',
          'C# 8', ['C# 1', 'C# 4', 'C# 6'],
          '인터페이스 기본 구현은 C# 8.0에서 추가된 기능이에요.',
          '비교적 최근에 추가된 기능이에요.'
        ),
        () => ({
          type: 'blank',
          q: `인터페이스 메서드에 본문을 준 기본 구현을 클래스가 구현하지 않고 그대로 쓰면, 호출 시 어떤 코드가 실행되나요? (인터페이스에 적힌 것/기본 것 중 선택해 쓰세요)`,
          prefix: '', suffix: '', accept: ['기본 구현', '기본구현'], placeholder: '용어',
          why: '클래스가 따로 재정의하지 않으면 인터페이스에 적힌 기본 구현이 그대로 실행돼요.',
          hint: '따로 정의하지 않으면 "기본값"이 쓰이는 원리와 비슷해요.'
        }),
        () => makeChoice(
          '인터페이스 기본 구현의 실용적인 장점으로 가장 알맞은 것은?',
          '기존 인터페이스에 새 메서드를 추가해도 이미 구현한 클래스들이 깨지지 않는다', ['클래스가 인터페이스를 구현하지 않아도 된다', '인터페이스가 여러 개의 abstract 클래스를 상속받을 수 있게 된다', '기본 구현이 있으면 클래스가 그 인터페이스를 구현할 수 없다'],
          '기본 구현이 있으면, 새 메서드가 추가돼도 기존 구현 클래스들이 자동으로 기본 동작을 물려받아 컴파일이 깨지지 않아요.',
          '"이미 있는 코드를 안 건드리고 확장하기"를 생각해보세요.'
        ),
        () => {
          const msg = pick(['환영합니다!', '반갑습니다!', '어서오세요!']);
          return {
            type: 'blank',
            q: `<code>interface IGreeter { void Greet() { Console.WriteLine("${msg}"); } } class Person : IGreeter { } IGreeter p = new Person(); p.Greet();</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [msg], placeholder: '출력 결과',
            why: 'Person이 Greet()를 재정의하지 않았으므로 인터페이스의 기본 구현이 그대로 실행돼요.',
            hint: '재정의하지 않았으니 기본 구현이 실행돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>void Log()</code>에 <code>"기록 중..."</code>을 출력하는 기본 구현을 가진 <code>ILogger</code> 인터페이스와, 이를 아무 재정의 없이 구현하는 <code>FileLogger</code> 클래스를 작성하세요.',
          starter: '',
          rows: 8,
          placeholder: 'interface ILogger\n{\n    void Log()\n    {\n        Console.WriteLine("기록 중...");\n    }\n}\n\nclass FileLogger : ILogger\n{\n}',
          accept: ['interface ILogger\n{\n    void Log()\n    {\n        Console.WriteLine("기록 중...");\n    }\n}\n\nclass FileLogger : ILogger\n{\n}'],
          why: '인터페이스 메서드에 본문을 주면 구현 클래스는 아무것도 정의하지 않아도 돼요.',
          hint: 'void Log() { Console.WriteLine("기록 중..."); }를 인터페이스 안에 바로 작성하세요.'
        }),
      ],
      boss: () => {
        const msg = pick(['시작합니다', '준비되었습니다', '완료되었습니다']);
        return {
          type: 'blank',
          q: `<code>interface ITask { void Run() { Console.WriteLine("${msg}"); } } class SimpleTask : ITask { } ITask t = new SimpleTask(); t.Run();</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [msg], placeholder: '출력 결과',
          why: 'SimpleTask가 Run()을 재정의하지 않아 인터페이스의 기본 구현이 그대로 실행돼요.',
          hint: '재정의가 없으면 기본 본문이 실행돼요.'
        };
      }
    },
    {
      id: 'exceptionHandlingGeneral',
      title: '예외 처리: try / catch / finally',
      ready: true,
      summary: '실행 중 발생하는 오류(예외)를 잡아 프로그램이 멈추지 않게 처리해요.',
      goals: ['try/catch로 예외를 잡는 기본 구조 이해하기', '여러 catch 블록으로 예외 종류별 처리하기', 'finally가 항상 실행됨을 이해하기'],
      blocks: [
        {
          h: 'try / catch: 예외를 잡아서 처리하기',
          html: `<p><code>try</code> 블록 안에서 예외가 발생하면, 프로그램이 그대로 멈추는 대신 <code>catch</code> 블록으로 실행이 넘어가요. 예외 객체는 보통 <code>Exception</code> 타입(또는 그 하위 타입)이에요.</p>`,
          code: {
            label: 'TryCatch.cs',
            lang: 'csharp',
            src: `try
{
    int[] nums = { 1, 2, 3 };
    Console.WriteLine(nums[5]);
}
catch (Exception e)
{
    Console.WriteLine($"오류 발생: {e.Message}");
}
Console.WriteLine("프로그램 계속 실행됨");`,
            out: `오류 발생: Index was outside the bounds of the array.
프로그램 계속 실행됨`
          }
        },
        {
          h: '여러 catch와 finally',
          html: `<p>서로 다른 종류의 예외를 구체적으로 다루려면 <code>catch</code>를 여러 개 쓸 수 있어요(더 구체적인 타입을 먼저!). <code>finally</code> 블록은 예외 발생 여부와 상관없이 <b>항상</b> 실행돼요. 파일 닫기 같은 정리 작업에 알맞아요.</p>`,
          code: {
            label: 'MultipleCatchFinally.cs',
            lang: 'csharp',
            src: `try
{
    int a = 10, b = 0;
    Console.WriteLine(a / b);
}
catch (DivideByZeroException e)
{
    Console.WriteLine("0으로 나눌 수 없어요.");
}
catch (Exception e)
{
    Console.WriteLine("알 수 없는 오류");
}
finally
{
    Console.WriteLine("정리 작업 완료");
}`,
            out: `0으로 나눌 수 없어요.
정리 작업 완료`
          },
          after: `<div class="note"><b>정리</b> — 예외를 예상되는 오류 처리 흐름으로만 남용하면 안 되지만, 파일 접근·네트워크 통신·사용자 입력처럼 실패할 수 있는 작업에는 try/catch가 필수예요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '예외가 발생하든 안 하든 항상 실행되는 블록은?',
          'finally', ['try', 'catch', 'throw'],
          '<code>finally</code> 블록은 예외 발생 여부와 관계없이 항상 실행돼요.',
          '"마침내, 결국"이라는 뜻이에요.'
        ),
        () => ({
          type: 'blank',
          q: `예외가 발생할 수 있는 코드를 감싸는 블록의 키워드를 쓰세요.`,
          prefix: '', suffix: ' { int x = 1 / 0; }', accept: ['try'], placeholder: '키워드',
          why: '<code>try</code> 블록 안의 코드에서 예외가 발생하면 catch로 처리 흐름이 넘어가요.',
          hint: '"시도하다"라는 뜻이에요.'
        }),
        () => makeChoice(
          '여러 개의 catch 블록을 쓸 때 주의할 점은?',
          '더 구체적인 예외 타입을 먼저 catch해야 한다', ['catch 순서는 결과에 영향을 주지 않는다', 'catch는 딱 하나만 쓸 수 있다', 'Exception 타입은 catch에 쓸 수 없다'],
          '구체적인 타입(예: DivideByZeroException)을 먼저 catch하고, 일반적인 Exception은 마지막에 둬야 의도대로 동작해요.',
          '더 좁은 범위를 먼저, 넓은 범위를 나중에 검사해요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>try { Console.WriteLine("A"); throw new Exception("문제"); } catch (Exception e) { Console.WriteLine("B"); } finally { Console.WriteLine("C"); }</code>를 실행하면? (세 줄, 형식: A\\nB\\nC)`,
          prefix: '', suffix: '', accept: ['A\nB\nC'], placeholder: '출력 결과',
          why: 'A가 출력된 뒤 예외가 던져져 catch로 넘어가 B가 출력되고, finally는 항상 실행되어 C가 출력돼요.',
          hint: 'try에서 예외가 발생하면 그 아래 코드는 건너뛰고 catch로 가요.'
        }),
        () => ({
          type: 'code',
          q: '<code>int[] arr = { 1, 2, 3 };</code>에서 <code>arr[10]</code>에 접근하는 코드를 try로 감싸고, catch (Exception e)에서 <code>"인덱스 오류"</code>를 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 8,
          placeholder: 'try\n{\n    int[] arr = { 1, 2, 3 };\n    Console.WriteLine(arr[10]);\n}\ncatch (Exception e)\n{\n    Console.WriteLine("인덱스 오류");\n}',
          accept: ['try\n{\n    int[] arr = { 1, 2, 3 };\n    Console.WriteLine(arr[10]);\n}\ncatch (Exception e)\n{\n    Console.WriteLine("인덱스 오류");\n}'],
          why: '범위를 벗어난 인덱스 접근은 예외를 던지므로 catch 블록이 실행돼요.',
          hint: 'try { ... } catch (Exception e) { Console.WriteLine("인덱스 오류"); }'
        }),
      ],
      boss: () => ({
        type: 'blank',
        q: `<code>try { int a = 5, b = 0; Console.WriteLine(a / b); } catch (DivideByZeroException) { Console.WriteLine("0으로 나눌 수 없음"); } finally { Console.WriteLine("종료"); }</code>를 실행하면? (두 줄, 형식: 0으로 나눌 수 없음\\n종료)`,
        prefix: '', suffix: '', accept: ['0으로 나눌 수 없음\n종료'], placeholder: '출력 결과',
        why: '0으로 나누면 DivideByZeroException이 발생해 catch가 실행되고, finally는 항상 실행돼요.',
        hint: '나눗셈 예외가 catch로 잡히고, finally는 항상 실행돼요.'
      })
    },
    {
      id: 'customExceptionClasses',
      title: '사용자 정의 예외 클래스',
      ready: true,
      summary: 'Exception을 상속받아 우리 프로그램만의 의미 있는 예외를 만들어요.',
      goals: ['Exception을 상속한 사용자 정의 예외 만들기', 'throw로 예외를 직접 던지기', '의미 있는 예외 타입이 코드를 더 명확하게 함을 이해하기'],
      blocks: [
        {
          h: 'Exception 상속: 우리만의 예외 타입',
          html: `<p>내장 예외(<code>DivideByZeroException</code> 등)로 표현하기 애매한 우리 프로그램만의 오류 상황은, <code>Exception</code>을 상속받아 <b>의미 있는 이름</b>의 예외 클래스로 만들 수 있어요.</p>`,
          code: {
            label: 'CustomException.cs',
            lang: 'csharp',
            src: `class InsufficientBalanceException : Exception
{
    public InsufficientBalanceException(string message) : base(message)
    {
    }
}

void Withdraw(int balance, int amount)
{
    if (amount > balance)
    {
        throw new InsufficientBalanceException("잔액이 부족해요.");
    }
    Console.WriteLine($"{amount}원 출금 완료");
}

try
{
    Withdraw(1000, 5000);
}
catch (InsufficientBalanceException e)
{
    Console.WriteLine(e.Message);
}`,
            out: `잔액이 부족해요.`
          }
        },
        {
          h: 'throw: 예외를 직접 발생시키기',
          html: `<p><code>throw new 예외타입(메시지)</code>로 원하는 시점에 직접 예외를 던질 수 있어요. 이렇게 하면 잘못된 상태를 아무렇지 않게 넘어가지 않고, 문제를 명확히 알릴 수 있어요.</p>`,
          code: {
            label: 'ThrowKeyword.cs',
            lang: 'csharp',
            src: `class NegativeAgeException : Exception
{
    public NegativeAgeException(string message) : base(message) { }
}

void SetAge(int age)
{
    if (age < 0)
    {
        throw new NegativeAgeException("나이는 음수일 수 없어요.");
    }
    Console.WriteLine($"나이 설정: {age}");
}

try
{
    SetAge(-5);
}
catch (NegativeAgeException e)
{
    Console.WriteLine($"오류: {e.Message}");
}`,
            out: `오류: 나이는 음수일 수 없어요.`
          },
          after: `<div class="note"><b>정리</b> — 사용자 정의 예외 이름은 <code>InsufficientBalanceException</code>처럼 관례상 <code>Exception</code>으로 끝나요. 의미 있는 이름 덕분에 catch 블록에서 어떤 문제인지 코드만 보고도 알 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '사용자 정의 예외 클래스를 만들 때 상속받아야 하는 기반 클래스는?',
          'Exception', ['Object', 'Error', 'Throwable'],
          '사용자 정의 예외는 System.Exception(또는 그 하위 클래스)을 상속받아 만들어요.',
          'C#의 모든 예외의 조상이에요.'
        ),
        () => ({
          type: 'blank',
          q: `원하는 시점에 직접 예외를 발생시킬 때 쓰는 키워드를 쓰세요. (예: ___ new Exception("문제"))`,
          prefix: '', suffix: ' new Exception("문제");', accept: ['throw'], placeholder: '키워드',
          why: '<code>throw</code>는 예외 객체를 만들어 즉시 던지는 키워드예요.',
          hint: '"던지다"라는 뜻이에요.'
        }),
        () => makeChoice(
          '사용자 정의 예외 클래스 이름에 관례적으로 붙이는 접미사는?',
          'Exception', ['Error', 'Fail', 'Problem'],
          '<code>InsufficientBalanceException</code>처럼 이름이 Exception으로 끝나는 게 관례예요.',
          '기반 클래스 이름과 같은 단어예요.'
        ),
        () => {
          const msg = pick(['재고가 부족해요', '입력값이 올바르지 않아요', '권한이 없어요']);
          return {
            type: 'blank',
            q: `<code>class MyException : Exception { public MyException(string m) : base(m) { } } try { throw new MyException("${msg}"); } catch (MyException e) { Console.WriteLine(e.Message); }</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [msg], placeholder: '출력 결과',
            why: 'base(m)으로 전달된 메시지가 e.Message로 그대로 읽혀요.',
            hint: '생성자에 전달된 메시지가 그대로 출력돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>Exception</code>을 상속하고 생성자에서 <code>base(message)</code>를 호출하는 <code>InvalidAgeException</code> 클래스를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'class InvalidAgeException : Exception\n{\n    public InvalidAgeException(string message) : base(message)\n    {\n    }\n}',
          accept: ['class InvalidAgeException : Exception\n{\n    public InvalidAgeException(string message) : base(message)\n    {\n    }\n}'],
          why: 'Exception을 상속하고 base(message)로 부모 생성자에 메시지를 전달하면 e.Message로 조회할 수 있어요.',
          hint: 'class InvalidAgeException : Exception { public InvalidAgeException(string message) : base(message) { } }'
        }),
      ],
      boss: () => {
        const msg = pick(['재고가 없어요', '잘못된 요청이에요', '연결이 끊겼어요']);
        return {
          type: 'blank',
          q: `<code>class AppException : Exception { public AppException(string m) : base(m) { } } void Check() { throw new AppException("${msg}"); } try { Check(); } catch (AppException e) { Console.WriteLine(e.Message); }</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [msg], placeholder: '출력 결과',
          why: '던져진 예외의 메시지가 catch에서 e.Message로 그대로 출력돼요.',
          hint: 'throw에 전달한 메시지가 그대로 조회돼요.'
        };
      }
    },
    {
      id: 'genericsMethodsAndClasses',
      title: '제네릭 메서드와 제네릭 클래스',
      ready: true,
      summary: '타입을 매개변수처럼 다루어, 여러 타입에 재사용 가능한 코드를 만들어요.',
      goals: ['제네릭 메서드 <T> 문법 이해하기', '제네릭 클래스 정의하고 사용하기', '제네릭이 코드 중복을 줄여주는 원리 이해하기'],
      blocks: [
        {
          h: '제네릭 메서드: 타입을 매개변수처럼',
          html: `<p>제네릭 메서드는 <code>&lt;T&gt;</code>처럼 타입 매개변수를 받아, <b>어떤 타입에도</b> 재사용할 수 있는 하나의 메서드를 만들어요. 오버로딩으로 타입마다 따로 만들 필요가 없어져요.</p>`,
          code: {
            label: 'GenericMethod.cs',
            lang: 'csharp',
            src: `static void PrintTwice<T>(T value)
{
    Console.WriteLine(value);
    Console.WriteLine(value);
}

PrintTwice<int>(42);
PrintTwice("안녕");`,
            out: `42
42
안녕
안녕`
          }
        },
        {
          h: '제네릭 클래스: Box<T>',
          html: `<p>클래스 자체도 제네릭으로 만들 수 있어요. <code>class Box&lt;T&gt;</code>처럼 선언하면, 사용할 때 <code>Box&lt;int&gt;</code>, <code>Box&lt;string&gt;</code>처럼 원하는 타입을 지정해 쓸 수 있어요.</p>`,
          code: {
            label: 'GenericClass.cs',
            lang: 'csharp',
            src: `class Box<T>
{
    public T Value;

    public Box(T value)
    {
        Value = value;
    }
}

Box<int> intBox = new Box<int>(10);
Box<string> strBox = new Box<string>("지수");
Console.WriteLine(intBox.Value);
Console.WriteLine(strBox.Value);`,
            out: `10
지수`
          },
          after: `<div class="note"><b>정리</b> — 실제로 <code>List&lt;T&gt;</code>, <code>Dictionary&lt;K,V&gt;</code> 같은 표준 컬렉션도 모두 제네릭 클래스예요. 제네릭 덕분에 타입마다 똑같은 로직을 복사-붙여넣기 하지 않아도 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '제네릭에서 타입을 나타내는 매개변수를 감싸는 기호는?',
          '<>', ['[]', '()', '{}'],
          '<code>&lt;T&gt;</code>처럼 꺾쇠 괄호로 타입 매개변수를 감싸요.',
          'List<int>에서 int를 감싸는 그 기호예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>class Box<T> { public T Value; }</code>에서 T가 의미하는 것은 무엇인가요? (영어로: 타입 ___)`,
          prefix: '타입 ', suffix: '', accept: ['매개변수', 'parameter'], placeholder: '단어',
          why: 'T는 실제 사용 시 int, string 등으로 채워질 "타입 매개변수"예요.',
          hint: '메서드의 매개변수와 비슷한 역할을 타입에 대해 해요.'
        }),
        () => makeChoice(
          '제네릭을 쓰는 주된 이유로 가장 알맞은 것은?',
          '여러 타입에 대해 같은 로직을 중복 작성하지 않고 재사용할 수 있다', ['제네릭은 실행 속도만 빠르게 해준다', '제네릭 클래스는 상속을 받을 수 없다', '제네릭은 string 타입에서만 쓸 수 있다'],
          '제네릭 덕분에 int용, string용 코드를 따로 만들지 않고 하나의 코드로 여러 타입을 지원할 수 있어요.',
          '"코드 재사용"이 핵심 키워드예요.'
        ),
        () => {
          const v = randInt(1, 100);
          return {
            type: 'blank',
            q: `<code>class Box<T> { public T Value; public Box(T v) { Value = v; } } Box<int> b = new Box<int>(${v}); Console.WriteLine(b.Value);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(v)], placeholder: '숫자',
            why: `생성자에 전달된 ${v}가 Value 필드에 저장돼요.`,
            hint: '생성자 인자가 그대로 저장돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>T</code> 타입 값을 받아 콘솔에 출력하는 제네릭 메서드 <code>static void Show<T>(T value)</code>를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'static void Show<T>(T value)\n{\n    Console.WriteLine(value);\n}',
          accept: ['static void Show<T>(T value)\n{\n    Console.WriteLine(value);\n}'],
          why: '<T>는 어떤 타입이든 받을 수 있는 타입 매개변수예요.',
          hint: 'static void Show<T>(T value) { Console.WriteLine(value); }'
        }),
      ],
      boss: () => {
        const s = pick(['지수', '민준', '서연']);
        return {
          type: 'blank',
          q: `<code>class Box<T> { public T Value; public Box(T v) { Value = v; } } Box<string> b = new Box<string>("${s}"); Console.WriteLine(b.Value);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [s], placeholder: '출력 결과',
          why: `T가 string으로 채워져 "${s}"가 Value에 저장돼요.`,
          hint: '생성자 인자가 그대로 저장돼요.'
        };
      }
    },
    {
      id: 'genericConstraints',
      title: '제네릭 제약 조건 (where T : ...)',
      ready: true,
      summary: '타입 매개변수 T가 특정 조건을 만족하도록 제한하는 제약을 배워요.',
      goals: ['where T : 구조로 제약 조건 걸기', 'class/struct 제약과 인터페이스 제약 이해하기', 'new() 제약으로 기본 생성자 요구하기'],
      blocks: [
        {
          h: '제약이 없으면 할 수 있는 게 제한적이에요',
          html: `<p>제네릭 T는 아무 타입이나 될 수 있기 때문에, 제약이 없으면 컴파일러는 T에 대해 <code>+</code>, <code>.CompareTo()</code> 같은 특정 기능을 함부로 쓸 수 없게 해요. <code>where</code>로 "T는 이런 조건을 만족해야 해"라고 제한하면 더 많은 걸 할 수 있어요.</p>`,
          code: {
            label: 'InterfaceConstraint.cs',
            lang: 'csharp',
            src: `interface IHasName
{
    string Name { get; }
}

static void PrintName<T>(T item) where T : IHasName
{
    Console.WriteLine(item.Name);
}

class Student : IHasName
{
    public string Name { get; set; }
}

PrintName(new Student { Name = "지수" });`,
            out: `지수`
          }
        },
        {
          h: 'class / struct / new() 제약',
          html: `<p><code>where T : class</code>는 T가 참조 타입이어야 함을, <code>where T : struct</code>는 값 타입이어야 함을 요구해요. <code>where T : new()</code>는 T가 매개변수 없는 기본 생성자를 가져야 함을 요구해서, 제네릭 메서드 안에서 <code>new T()</code>를 쓸 수 있게 해줘요.</p>`,
          code: {
            label: 'NewConstraint.cs',
            lang: 'csharp',
            src: `static T CreateDefault<T>() where T : new()
{
    return new T();
}

class Empty { }

Empty e = CreateDefault<Empty>();
Console.WriteLine(e != null);`,
            out: `True`
          },
          after: `<div class="note"><b>정리</b> — 제약 조건은 "T가 뭔지는 몰라도, 최소한 이런 능력은 있다"는 걸 컴파일러에게 보장해줘서, 제네릭 코드 안에서 그 능력을 안전하게 쓸 수 있게 해줘요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>where T : new()</code> 제약이 요구하는 것은?',
          'T가 매개변수 없는 기본 생성자를 가져야 한다', ['T가 반드시 class여야 한다', 'T가 반드시 배열이어야 한다', 'T가 static 멤버만 가져야 한다'],
          '<code>new()</code> 제약은 T에 매개변수 없는 생성자가 있어야 함을 요구해서, 제네릭 코드 안에서 <code>new T()</code>를 쓸 수 있게 해요.',
          '괄호가 빈 생성자를 뜻해요.'
        ),
        () => ({
          type: 'blank',
          q: `제네릭 타입 매개변수에 조건을 붙일 때 쓰는 키워드를 쓰세요. (예: <T> ___ T : IComparable)`,
          prefix: '<T> ', suffix: ' T : IComparable', accept: ['where'], placeholder: '키워드',
          why: '<code>where T : 조건</code>으로 타입 매개변수에 제약을 걸어요.',
          hint: '"~인 경우에"라는 뜻이에요.'
        }),
        () => makeChoice(
          '<code>where T : class</code> 제약이 의미하는 것은?',
          'T는 반드시 참조 타입이어야 한다', ['T는 반드시 값 타입이어야 한다', 'T는 반드시 abstract 클래스여야 한다', 'T는 인터페이스를 구현할 수 없다'],
          'class 제약은 T가 참조 타입(클래스, 인터페이스, 배열 등)이어야 함을 뜻해요.',
          'struct의 반대 개념이에요.'
        ),
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>interface IHasName { string Name { get; } } static void P<T>(T item) where T : IHasName { Console.WriteLine(item.Name); } class S : IHasName { public string Name { get; set; } } P(new S { Name = "${name}" });</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [name], placeholder: '출력 결과',
            why: 'T가 IHasName을 만족하므로 item.Name에 안전하게 접근할 수 있고, 값은 "' + name + '"이에요.',
            hint: '전달된 객체의 Name 값이 그대로 출력돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>T</code>가 <code>IComparable</code>을 구현해야 한다는 제약을 가진 제네릭 메서드 <code>static bool IsGreater<T>(T a, T b) where T : IComparable</code>를 <code>a.CompareTo(b) > 0</code>을 반환하도록 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'static bool IsGreater<T>(T a, T b) where T : IComparable\n{\n    return a.CompareTo(b) > 0;\n}',
          accept: ['static bool IsGreater<T>(T a, T b) where T : IComparable\n{\n    return a.CompareTo(b) > 0;\n}'],
          why: 'IComparable 제약 덕분에 T 값끼리 CompareTo로 비교할 수 있어요.',
          hint: 'where T : IComparable 뒤에 CompareTo를 사용하세요.'
        }),
      ],
      boss: () => ({
        type: 'blank',
        q: `<code>static T CreateDefault<T>() where T : new() { return new T(); } class Empty { } Empty e = CreateDefault<Empty>(); Console.WriteLine(e != null);</code>를 실행하면?`,
        prefix: '', suffix: '', accept: ['True'], placeholder: 'True 또는 False',
        why: 'new() 제약 덕분에 CreateDefault<Empty>()는 실제로 새 Empty 객체를 만들어 반환하므로 null이 아니에요.',
        hint: 'new T()로 실제 객체가 만들어져요.'
      })
    },
    {
      id: 'dictionaryCollection',
      title: 'Dictionary<K, V>: 키-값 저장소',
      ready: true,
      summary: '키로 값을 빠르게 찾아내는 Dictionary 컬렉션을 배워요.',
      goals: ['Dictionary<K,V> 생성과 값 추가/조회하기', 'ContainsKey로 안전하게 확인하기', 'foreach로 키-값 쌍 순회하기'],
      blocks: [
        {
          h: 'Dictionary: 키로 값을 찾는 자료구조',
          html: `<p><code>Dictionary&lt;K, V&gt;</code>는 <b>키(key)</b>와 <b>값(value)</b>의 쌍을 저장해요. 배열처럼 순번(정수)이 아니라, 원하는 타입의 키로 값을 빠르게 찾을 수 있어요.</p>`,
          code: {
            label: 'DictionaryBasics.cs',
            lang: 'csharp',
            src: `using System.Collections.Generic;

Dictionary<string, int> scores = new Dictionary<string, int>();
scores["지수"] = 90;
scores["민준"] = 85;

Console.WriteLine(scores["지수"]);
Console.WriteLine(scores.Count);`,
            out: `90
2`
          }
        },
        {
          h: 'ContainsKey: 안전하게 확인하기',
          html: `<p>존재하지 않는 키로 조회하면 <code>KeyNotFoundException</code> 예외가 발생해요. <code>ContainsKey(키)</code>로 미리 존재 여부를 확인하거나, <code>TryGetValue</code>로 안전하게 값을 꺼낼 수 있어요.</p>`,
          code: {
            label: 'DictionarySafeAccess.cs',
            lang: 'csharp',
            src: `Dictionary<string, int> scores = new Dictionary<string, int> { { "지수", 90 } };

if (scores.ContainsKey("서연"))
{
    Console.WriteLine(scores["서연"]);
}
else
{
    Console.WriteLine("서연은 없어요.");
}

foreach (KeyValuePair<string, int> pair in scores)
{
    Console.WriteLine($"{pair.Key}: {pair.Value}");
}`,
            out: `서연은 없어요.
지수: 90`
          },
          after: `<div class="note"><b>정리</b> — Dictionary는 이름으로 값을 찾는 전화번호부처럼, "무언가를 키로 빠르게 찾아야 하는" 거의 모든 상황에 적합한 자료구조예요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'Dictionary<K, V>가 저장하는 것은?',
          '키와 값의 쌍', ['값만 순서대로', '키만 중복 없이', '항상 정수 인덱스'],
          'Dictionary는 키-값(key-value) 쌍을 저장해서 키로 값을 빠르게 찾을 수 있게 해요.',
          '전화번호부(이름 → 번호)를 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `존재하지 않는 키에 접근하기 전에, 키가 있는지 미리 확인하는 메서드를 쓰세요.`,
          prefix: 'scores.', suffix: '("서연")', accept: ['ContainsKey'], placeholder: '메서드 이름',
          why: '<code>ContainsKey(키)</code>는 그 키가 존재하는지 bool로 알려줘요.',
          hint: '"키를 포함하는가"라는 뜻이에요.'
        }),
        () => {
          const val = randInt(50, 100);
          return {
            type: 'blank',
            q: `<code>Dictionary<string, int> d = new Dictionary<string, int>(); d["a"] = ${val}; Console.WriteLine(d["a"]);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(val)], placeholder: '숫자',
            why: `키 "a"에 대입한 ${val}이 그대로 조회돼요.`,
            hint: '대입한 값이 그대로 나와요.'
          };
        },
        () => makeChoice(
          '존재하지 않는 키로 <code>dict[키]</code>를 읽으면 어떻게 되나요?',
          'KeyNotFoundException 예외가 발생한다', ['null이 반환된다', '0이 반환된다', '자동으로 키가 추가된다'],
          '존재하지 않는 키로 인덱서를 읽으면 예외가 발생해요. TryGetValue나 ContainsKey로 미리 확인해야 해요.',
          '배열의 범위 초과와 비슷한 위험이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Dictionary<string, int></code>를 만들어 <code>"사과"</code>에 <code>1000</code>, <code>"바나나"</code>에 <code>500</code>을 저장하고 <code>"사과"</code>의 값을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'Dictionary<string, int> prices = new Dictionary<string, int>();\nprices["사과"] = 1000;\nprices["바나나"] = 500;\nConsole.WriteLine(prices["사과"]);',
          accept: ['Dictionary<string, int> prices = new Dictionary<string, int>();\nprices["사과"] = 1000;\nprices["바나나"] = 500;\nConsole.WriteLine(prices["사과"]);'],
          why: '문자열 키로 값을 저장하고, 같은 키로 조회하면 저장된 값이 나와요.',
          hint: 'prices["사과"] = 1000; 형태로 값을 저장하세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1000, 5000), b = randInt(1000, 5000);
        return {
          type: 'blank',
          q: `<code>Dictionary<string, int> d = new Dictionary<string, int> { { "사과", ${a} }, { "포도", ${b} } }; Console.WriteLine(d["사과"] + d["포도"]);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
          why: `두 값을 더하면 ${a} + ${b} = ${a + b}이에요.`,
          hint: '두 키의 값을 각각 조회해 더해보세요.'
        };
      }
    },
    {
      id: 'hashSetQueueStack',
      title: 'HashSet, Queue, Stack',
      ready: true,
      summary: '중복 없는 집합 HashSet과, 순서를 관리하는 Queue/Stack을 배워요.',
      goals: ['HashSet<T>로 중복 제거하고 집합 연산하기', 'Queue<T>의 FIFO(선입선출) 동작 이해하기', 'Stack<T>의 LIFO(후입선출) 동작 이해하기'],
      blocks: [
        {
          h: 'HashSet<T>: 중복이 없는 집합',
          html: `<p><code>HashSet&lt;T&gt;</code>는 <b>같은 값을 두 번 담지 않는</b> 컬렉션이에요. <code>Add</code>로 이미 있는 값을 또 추가해도 무시되고, <code>Contains</code>로 값의 존재 여부를 빠르게 확인할 수 있어요.</p>`,
          code: {
            label: 'HashSetBasics.cs',
            lang: 'csharp',
            src: `using System.Collections.Generic;

HashSet<string> tags = new HashSet<string>();
tags.Add("C#");
tags.Add("백엔드");
tags.Add("C#"); // 중복이라 무시됨

Console.WriteLine(tags.Count);
Console.WriteLine(tags.Contains("백엔드"));`,
            out: `2
True`
          }
        },
        {
          h: 'Queue<T>(FIFO)와 Stack<T>(LIFO)',
          html: `<p><code>Queue&lt;T&gt;</code>는 먼저 넣은 게 먼저 나오는 <b>선입선출(FIFO)</b> 구조로, <code>Enqueue</code>(넣기)/<code>Dequeue</code>(꺼내기)를 써요. <code>Stack&lt;T&gt;</code>는 나중에 넣은 게 먼저 나오는 <b>후입선출(LIFO)</b> 구조로, <code>Push</code>(넣기)/<code>Pop</code>(꺼내기)을 써요.</p>`,
          code: {
            label: 'QueueStack.cs',
            lang: 'csharp',
            src: `Queue<string> queue = new Queue<string>();
queue.Enqueue("첫번째");
queue.Enqueue("두번째");
Console.WriteLine(queue.Dequeue());

Stack<string> stack = new Stack<string>();
stack.Push("첫번째");
stack.Push("두번째");
Console.WriteLine(stack.Pop());`,
            out: `첫번째
두번째`
          },
          after: `<div class="note"><b>정리</b> — 대기줄(먼저 온 사람 먼저 처리)은 Queue, 되돌리기(가장 최근 작업 먼저 취소)는 Stack이 자연스러운 비유예요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '같은 값을 중복해서 저장하지 않는 컬렉션은?',
          'HashSet<T>', ['List<T>', 'Queue<T>', 'Stack<T>'],
          'HashSet<T>는 값의 중복을 자동으로 제거해요.',
          '수학의 "집합" 개념과 비슷해요.'
        ),
        () => ({
          type: 'blank',
          q: `Queue<T>에서 값을 꺼낼 때 쓰는 메서드를 쓰세요. (넣을 때는 Enqueue)`,
          prefix: 'queue.', suffix: '()', accept: ['Dequeue'], placeholder: '메서드 이름',
          why: 'Queue는 <code>Enqueue</code>로 넣고 <code>Dequeue</code>로 먼저 넣은 값부터 꺼내요.',
          hint: 'En 대신 De가 붙어요.'
        }),
        () => makeChoice(
          'Stack<T>의 동작 방식을 설명하는 용어는?',
          'LIFO(후입선출)', ['FIFO(선입선출)', '무작위 순서', '정렬된 순서'],
          'Stack은 나중에 넣은 값이 먼저 나오는 후입선출(LIFO) 구조예요.',
          '접시를 쌓아올리는 모습을 떠올려보세요.'
        ),
        () => {
          const vals = [randInt(1, 9), randInt(10, 19), randInt(20, 29)];
          return {
            type: 'blank',
            q: `<code>Queue<int> q = new Queue<int>(); q.Enqueue(${vals[0]}); q.Enqueue(${vals[1]}); q.Enqueue(${vals[2]}); Console.WriteLine(q.Dequeue());</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(vals[0])], placeholder: '숫자',
            why: `Queue는 FIFO이므로 가장 먼저 넣은 ${vals[0]}이 먼저 나와요.`,
            hint: '가장 먼저 넣은 값이 먼저 나와요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>Stack<int></code>를 만들어 <code>1, 2, 3</code>을 순서대로 <code>Push</code>한 뒤 <code>Pop()</code>한 값을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: 'Stack<int> stack = new Stack<int>();\nstack.Push(1);\nstack.Push(2);\nstack.Push(3);\nConsole.WriteLine(stack.Pop());',
          accept: ['Stack<int> stack = new Stack<int>();\nstack.Push(1);\nstack.Push(2);\nstack.Push(3);\nConsole.WriteLine(stack.Pop());'],
          why: 'Stack은 LIFO이므로 마지막에 넣은 3이 먼저 나와요.',
          hint: '가장 나중에 Push한 값이 Pop됩니다.'
        }),
      ],
      boss: () => {
        const vals = [randInt(1, 9), randInt(10, 19), randInt(20, 29)];
        return {
          type: 'blank',
          q: `<code>Stack<int> s = new Stack<int>(); s.Push(${vals[0]}); s.Push(${vals[1]}); s.Push(${vals[2]}); Console.WriteLine(s.Pop());</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(vals[2])], placeholder: '숫자',
          why: `Stack은 LIFO이므로 마지막에 넣은 ${vals[2]}이 먼저 나와요.`,
          hint: '가장 나중에 넣은 값이 먼저 나와요.'
        };
      }
    },
    {
      id: 'linqMethodSyntax',
      title: 'LINQ 메서드 문법: Where, Select, OrderBy',
      ready: true,
      summary: '컬렉션을 필터링·변환·정렬하는 LINQ의 핵심 메서드들을 배워요.',
      goals: ['Where로 조건에 맞는 원소 걸러내기', 'Select로 각 원소를 변환하기', 'OrderBy/OrderByDescending으로 정렬하기'],
      blocks: [
        {
          h: 'Where: 조건에 맞는 것만 걸러내기',
          html: `<p><code>using System.Linq;</code>를 추가하면 컬렉션에 <b>LINQ</b> 메서드들을 쓸 수 있어요. <code>Where(조건 람다)</code>는 조건이 참인 원소만 남긴 새로운 시퀀스를 돌려줘요.</p>`,
          code: {
            label: 'LinqWhere.cs',
            lang: 'csharp',
            src: `using System.Linq;
using System.Collections.Generic;

List<int> nums = new List<int> { 1, 2, 3, 4, 5, 6 };
var evens = nums.Where(n => n % 2 == 0);

foreach (int n in evens)
{
    Console.WriteLine(n);
}`,
            out: `2
4
6`
          }
        },
        {
          h: 'Select와 OrderBy',
          html: `<p><code>Select(변환 람다)</code>는 각 원소를 다른 값으로 <b>변환</b>해요. <code>OrderBy(기준 람다)</code>는 오름차순, <code>OrderByDescending</code>은 내림차순으로 정렬해요.</p>`,
          code: {
            label: 'LinqSelectOrder.cs',
            lang: 'csharp',
            src: `using System.Linq;
using System.Collections.Generic;

List<int> nums = new List<int> { 3, 1, 4, 1, 5 };
var squared = nums.Select(n => n * n);
var sorted = nums.OrderBy(n => n);

Console.WriteLine(string.Join(",", squared));
Console.WriteLine(string.Join(",", sorted));`,
            out: `9,1,16,1,25
1,1,3,4,5`
          },
          after: `<div class="note"><b>정리</b> — Where/Select/OrderBy는 원본 컬렉션을 바꾸지 않고 <b>새로운 시퀀스</b>를 돌려줘요. 여러 메서드를 <code>.</code>으로 이어붙여(체이닝) "필터링 → 변환 → 정렬"을 한 줄로 표현할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '컬렉션에서 조건에 맞는 원소만 걸러낼 때 쓰는 LINQ 메서드는?',
          'Where', ['Select', 'OrderBy', 'Aggregate'],
          '<code>Where(조건)</code>은 조건이 true인 원소만 남긴 시퀀스를 돌려줘요.',
          '"어디에 해당하는가"라는 뜻이에요.'
        ),
        () => ({
          type: 'blank',
          q: `각 원소를 다른 값으로 변환하는 LINQ 메서드를 쓰세요. (예: nums.___(n => n * n))`,
          prefix: 'nums.', suffix: '(n => n * n)', accept: ['Select'], placeholder: '메서드 이름',
          why: '<code>Select(변환식)</code>은 각 원소를 새 값으로 바꾼 시퀀스를 만들어요.',
          hint: '"선택하다, 골라내다"보다는 "매핑하다"에 가까운 뜻이에요.'
        }),
        () => {
          const nums = [randInt(1, 5), randInt(6, 10), randInt(11, 15)];
          const evens = nums.filter(n => n % 2 === 0);
          return {
            type: 'blank',
            q: `<code>List<int> nums = new List<int> { ${nums.join(', ')} }; var evens = nums.Where(n => n % 2 == 0); Console.WriteLine(evens.Count());</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(evens.length)], placeholder: '숫자',
            why: `${nums.join(', ')} 중 짝수는 ${evens.length}개예요.`,
            hint: '짝수만 세어보세요.'
          };
        },
        () => makeChoice(
          '<code>nums.OrderBy(n => n)</code>과 <code>nums.OrderByDescending(n => n)</code>의 차이는?',
          '오름차순 정렬과 내림차순 정렬', ['둘 다 같은 결과다', 'OrderBy는 원본을 바꾸지만 OrderByDescending은 안 바꾼다', 'OrderByDescending은 필터링을 한다'],
          'OrderBy는 오름차순, OrderByDescending은 내림차순으로 정렬한 시퀀스를 돌려줘요.',
          '"Descending"은 "내림차순"이라는 뜻이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>List<int> nums = new List<int> { 5, 2, 8, 1 };</code>에서 <code>Where</code>로 3보다 큰 값만 걸러내고, <code>foreach</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'List<int> nums = new List<int> { 5, 2, 8, 1 };\nvar big = nums.Where(n => n > 3);\nforeach (int n in big)\n{\n    Console.WriteLine(n);\n}',
          accept: ['List<int> nums = new List<int> { 5, 2, 8, 1 };\nvar big = nums.Where(n => n > 3);\nforeach (int n in big)\n{\n    Console.WriteLine(n);\n}'],
          why: 'Where(n => n > 3)은 3보다 큰 값만 남긴 시퀀스를 만들어요.',
          hint: 'nums.Where(n => n > 3)'
        }),
      ],
      boss: () => {
        const nums = [randInt(1, 10), randInt(11, 20), randInt(21, 30)];
        return {
          type: 'blank',
          q: `<code>List<int> nums = new List<int> { ${nums.join(', ')} }; var doubled = nums.Select(n => n * 2); Console.WriteLine(string.Join(",", doubled));</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [nums.map(n => n * 2).join(',')], placeholder: '출력 결과',
          why: `각 값을 2배로 만들면 ${nums.map(n => n * 2).join(', ')}이에요.`,
          hint: '각 원소에 2를 곱해보세요.'
        };
      }
    },
    {
      id: 'linqGroupByAggregate',
      title: 'LINQ 그룹화·집계와 쿼리 문법',
      ready: true,
      summary: 'GroupBy로 묶고 Aggregate로 집계하며, 쿼리 문법(from...select)도 맛봐요.',
      goals: ['GroupBy로 기준별로 묶기', 'Aggregate/Sum/Average로 집계하기', 'from...where...select 쿼리 문법 읽기'],
      blocks: [
        {
          h: 'GroupBy: 기준에 따라 묶기',
          html: `<p><code>GroupBy(기준 람다)</code>는 컬렉션을 기준값이 같은 것끼리 묶은 그룹들로 나눠요. 각 그룹은 <code>Key</code>(묶은 기준값)와 그 그룹에 속한 원소들을 가져요.</p>`,
          code: {
            label: 'LinqGroupBy.cs',
            lang: 'csharp',
            src: `using System.Linq;
using System.Collections.Generic;

List<int> nums = new List<int> { 1, 2, 3, 4, 5, 6 };
var groups = nums.GroupBy(n => n % 2 == 0 ? "짝수" : "홀수");

foreach (var g in groups)
{
    Console.WriteLine($"{g.Key}: {string.Join(",", g)}");
}`,
            out: `홀수: 1,3,5
짝수: 2,4,6`
          }
        },
        {
          h: 'Aggregate, Sum, Average와 쿼리 문법',
          html: `<p><code>Sum()</code>, <code>Average()</code>는 흔한 집계를 바로 계산해주고, <code>Aggregate(누적식)</code>는 직접 정의한 방식으로 값을 하나로 누적해요. LINQ는 SQL과 비슷한 <b>쿼리 문법</b>(<code>from ... where ... select ...</code>)으로도 쓸 수 있어요.</p>`,
          code: {
            label: 'LinqAggregateQuery.cs',
            lang: 'csharp',
            src: `using System.Linq;
using System.Collections.Generic;

List<int> nums = new List<int> { 1, 2, 3, 4, 5 };
int sum = nums.Sum();
int product = nums.Aggregate((acc, n) => acc * n);

var evensQuery = from n in nums
                 where n % 2 == 0
                 select n;

Console.WriteLine(sum);
Console.WriteLine(product);
Console.WriteLine(string.Join(",", evensQuery));`,
            out: `15
120
2,4`
          },
          after: `<div class="note"><b>정리</b> — 실무에서는 메서드 문법(<code>.Where().Select()</code>)이 더 널리 쓰이지만, 조건이 여러 개 얽힌 복잡한 조회는 쿼리 문법이 SQL처럼 읽혀서 더 편할 때도 있어요. 두 문법 모두 같은 LINQ 기능을 나타내는 다른 표현일 뿐이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '컬렉션을 기준값이 같은 것끼리 묶는 LINQ 메서드는?',
          'GroupBy', ['OrderBy', 'Select', 'Where'],
          '<code>GroupBy(기준)</code>는 같은 기준값을 가진 원소들을 하나의 그룹으로 묶어요.',
          '"그룹으로 묶다"라는 뜻이에요.'
        ),
        () => ({
          type: 'blank',
          q: `숫자 컬렉션의 총합을 구하는 LINQ 메서드를 쓰세요. (nums.___())`,
          prefix: 'nums.', suffix: '()', accept: ['Sum'], placeholder: '메서드 이름',
          why: '<code>Sum()</code>은 컬렉션의 모든 값을 더한 결과를 돌려줘요.',
          hint: '"합계"라는 뜻의 단어예요.'
        }),
        () => {
          const nums = [randInt(1, 10), randInt(1, 10), randInt(1, 10), randInt(1, 10)];
          return {
            type: 'blank',
            q: `<code>List<int> nums = new List<int> { ${nums.join(', ')} }; Console.WriteLine(nums.Average());</code>를 실행하면? (소수 첫째 자리까지)`,
            prefix: '', suffix: '', accept: [(nums.reduce((a, b) => a + b, 0) / nums.length).toString()], placeholder: '숫자',
            why: `평균은 (${nums.join('+')}) / ${nums.length} = ${nums.reduce((a, b) => a + b, 0) / nums.length}이에요.`,
            hint: '모두 더한 뒤 개수로 나눠보세요.'
          };
        },
        () => makeChoice(
          'LINQ 쿼리 문법 <code>from n in nums where n > 3 select n;</code>과 같은 의미의 메서드 문법은?',
          'nums.Where(n => n > 3)', ['nums.Select(n => n > 3)', 'nums.GroupBy(n => n > 3)', 'nums.OrderBy(n => n > 3)'],
          '쿼리 문법의 where 절은 메서드 문법의 Where와 같은 역할을 해요.',
          '조건으로 걸러내는 것은 Where예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>List<int> nums = new List<int> { 1, 2, 3, 4 };</code>의 합을 <code>Aggregate</code>로 계산해(누적식 <code>(acc, n) => acc + n</code>) 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'List<int> nums = new List<int> { 1, 2, 3, 4 };\nint sum = nums.Aggregate((acc, n) => acc + n);\nConsole.WriteLine(sum);',
          accept: ['List<int> nums = new List<int> { 1, 2, 3, 4 };\nint sum = nums.Aggregate((acc, n) => acc + n);\nConsole.WriteLine(sum);'],
          why: 'Aggregate는 누적값(acc)과 다음 원소(n)를 받아 하나로 누적해요.',
          hint: 'nums.Aggregate((acc, n) => acc + n)'
        }),
      ],
      boss: () => {
        const nums = [1, 2, 3, 4, 5];
        return {
          type: 'blank',
          q: `<code>List<int> nums = new List<int> { 1, 2, 3, 4, 5 }; var groups = nums.GroupBy(n => n % 2 == 0 ? "짝수" : "홀수"); foreach (var g in groups) { Console.WriteLine($"{g.Key}: {g.Count()}"); }</code>를 실행하면? (두 줄, 형식: 홀수: 3\\n짝수: 2)`,
          prefix: '', suffix: '', accept: ['홀수: 3\n짝수: 2'], placeholder: '출력 결과',
          why: '1,3,5는 홀수(3개), 2,4는 짝수(2개)로 그룹화되며, 홀수 그룹이 먼저 나와요(원본 순서 기준 첫 등장 그룹부터).',
          hint: '홀수와 짝수로 나눈 뒤 각 그룹의 개수를 세어보세요.'
        };
      }
    },
    {
      id: 'delegatesFuncAction',
      title: '델리게이트와 Func / Action',
      ready: true,
      summary: '메서드 자체를 값처럼 담아 전달하는 델리게이트, Func, Action을 배워요.',
      goals: ['delegate 타입 선언과 사용 이해하기', 'Func<T,TResult>로 반환값 있는 메서드 담기', 'Action<T>로 반환값 없는 메서드 담기'],
      blocks: [
        {
          h: 'delegate: 메서드를 가리키는 타입',
          html: `<p><code>delegate</code>는 특정 시그니처(매개변수·반환 타입)를 가진 메서드를 <b>변수처럼 담을 수 있는 타입</b>을 정의해요. 메서드 이름을 그 변수에 대입하면, 나중에 변수를 통해 그 메서드를 호출할 수 있어요.</p>`,
          code: {
            label: 'DelegateBasics.cs',
            lang: 'csharp',
            src: `delegate int Operation(int a, int b);

static int Add(int a, int b) => a + b;
static int Multiply(int a, int b) => a * b;

Operation op = Add;
Console.WriteLine(op(3, 4));

op = Multiply;
Console.WriteLine(op(3, 4));`,
            out: `7
12`
          }
        },
        {
          h: 'Func<T, TResult>와 Action<T>: 이미 만들어진 델리게이트',
          html: `<p>직접 <code>delegate</code>를 선언하지 않아도, .NET에는 이미 준비된 <code>Func&lt;...,TResult&gt;</code>(값을 반환하는 메서드용)와 <code>Action&lt;...&gt;</code>(값을 반환하지 않는 메서드용)가 있어요. 마지막 타입 매개변수가 <code>Func</code>의 반환 타입이에요.</p>`,
          code: {
            label: 'FuncAction.cs',
            lang: 'csharp',
            src: `Func<int, int, int> add = (a, b) => a + b;
Action<string> greet = name => Console.WriteLine($"안녕, {name}!");

Console.WriteLine(add(3, 4));
greet("지수");`,
            out: `7
안녕, 지수!`
          },
          after: `<div class="note"><b>정리</b> — 직접 delegate를 선언하는 경우는 드물고, 대부분의 실무 코드는 <code>Func</code>와 <code>Action</code>을 그대로 써요. 매개변수가 없으면 <code>Action</code>, 매개변수와 반환값이 모두 있으면 <code>Func&lt;매개변수타입들, 반환타입&gt;</code>이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '값을 반환하지 않는 메서드를 담는 델리게이트 타입은?',
          'Action', ['Func', 'delegate', 'Task'],
          '<code>Action</code>은 반환값이 없는(void) 메서드를 담을 때 써요.',
          '"동작"이라는 뜻으로, 결과값 없이 무언가를 실행해요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>Func<int, int, int></code>에서 마지막 타입 매개변수(세 번째 int)가 의미하는 것은? (한글로: ___ 타입)`,
          prefix: '', suffix: ' 타입', accept: ['반환'], placeholder: '단어',
          why: 'Func의 마지막 타입 매개변수는 항상 반환 타입을 의미해요.',
          hint: '메서드가 "결과로 내놓는" 값의 타입이에요.'
        }),
        () => {
          const a = randInt(1, 10), b = randInt(1, 10);
          return {
            type: 'blank',
            q: `<code>Func<int, int, int> mul = (x, y) => x * y; Console.WriteLine(mul(${a}, ${b}));</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a * b)], placeholder: '숫자',
            why: `${a} * ${b} = ${a * b}이에요.`,
            hint: '람다가 두 값을 곱해요.'
          };
        },
        () => makeChoice(
          '<code>delegate int Op(int a, int b);</code>에 대한 설명으로 옳은 것은?',
          'int를 받아 int를 반환하는 시그니처를 가진 메서드를 담을 수 있는 타입을 정의한다', ['Op라는 이름의 메서드를 즉시 실행한다', 'int 타입의 변수 두 개를 선언한다', '클래스를 상속받는 문법이다'],
          'delegate 선언은 특정 매개변수·반환 타입 조합(시그니처)을 가진 메서드를 담을 수 있는 새 타입을 만들어요.',
          '"메서드를 위한 타입"이라고 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '두 정수를 받아 곱을 반환하는 <code>Func<int, int, int></code> 델리게이트 변수 <code>multiply</code>를 람다식으로 만들고 <code>multiply(3, 4)</code>를 출력하세요.',
          starter: '',
          rows: 2,
          placeholder: 'Func<int, int, int> multiply = (a, b) => a * b;\nConsole.WriteLine(multiply(3, 4));',
          accept: ['Func<int, int, int> multiply = (a, b) => a * b;\nConsole.WriteLine(multiply(3, 4));'],
          why: 'Func<int, int, int>는 int 두 개를 받아 int를 반환하는 메서드를 담아요.',
          hint: 'Func<int, int, int> multiply = (a, b) => a * b;'
        }),
      ],
      boss: () => {
        const a = randInt(1, 20), b = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>Func<int, int, int> add = (x, y) => x + y; Action<int> print = n => Console.WriteLine(n); print(add(${a}, ${b}));</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
          why: `add(${a}, ${b})는 ${a + b}를 반환하고, print가 그 값을 출력해요.`,
          hint: 'Func의 결과를 Action에 전달해요.'
        };
      }
    },
    {
      id: 'eventsPublisherSubscriber',
      title: '이벤트(event): 발행자-구독자 패턴',
      ready: true,
      summary: '한 객체의 상태 변화를 여러 구독자에게 알리는 event 키워드를 배워요.',
      goals: ['event 키워드로 이벤트 선언하기', '+= 로 이벤트 핸들러 구독하기', '이벤트를 발생시켜(invoke) 구독자들에게 알리기'],
      blocks: [
        {
          h: 'event: 델리게이트를 안전하게 감싼 알림 창구',
          html: `<p><code>event</code>는 델리게이트를 기반으로 하지만, 선언한 클래스 <b>내부에서만</b> 직접 호출(invoke)할 수 있고 외부에서는 <code>+=</code>로 구독만 가능해요. 값이 바뀌었을 때 다른 코드에 "알림"을 보내는 용도로 자주 써요.</p>`,
          code: {
            label: 'EventBasics.cs',
            lang: 'csharp',
            src: `class Alarm
{
    public event Action Ring;

    public void Trigger()
    {
        Ring?.Invoke();
    }
}

Alarm alarm = new Alarm();
alarm.Ring += () => Console.WriteLine("삐빅! 일어나세요!");
alarm.Trigger();`,
            out: `삐빅! 일어나세요!`
          }
        },
        {
          h: '여러 구독자에게 동시에 알리기',
          html: `<p><code>+=</code>를 여러 번 하면 여러 메서드가 <b>순서대로</b> 같은 이벤트에 등록돼요. 이벤트가 발생(Invoke)하면 등록된 모든 핸들러가 차례로 호출돼요. <code>-=</code>로 구독을 해지할 수도 있어요.</p>`,
          code: {
            label: 'EventMultipleSubscribers.cs',
            lang: 'csharp',
            src: `class Alarm
{
    public event Action Ring;

    public void Trigger()
    {
        Ring?.Invoke();
    }
}

Alarm alarm = new Alarm();
alarm.Ring += () => Console.WriteLine("첫 번째 구독자");
alarm.Ring += () => Console.WriteLine("두 번째 구독자");
alarm.Trigger();`,
            out: `첫 번째 구독자
두 번째 구독자`
          },
          after: `<div class="note"><b>정리</b> — event는 "무슨 일이 일어났을 때, 관심 있는 여러 코드에게 알려주는" 발행자-구독자(publisher-subscriber) 패턴의 핵심이에요. <code>Ring?.Invoke()</code>처럼 <code>?.</code>를 쓰면 구독자가 없어도(null이어도) 안전하게 처리돼요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '클래스에 이벤트를 선언할 때 쓰는 키워드는?',
          'event', ['delegate', 'signal', 'notify'],
          '<code>public event Action Ring;</code>처럼 event 키워드로 이벤트를 선언해요.',
          '"사건, 이벤트"라는 뜻 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `이벤트에 핸들러(메서드)를 등록(구독)할 때 쓰는 연산자를 쓰세요.`,
          prefix: 'alarm.Ring ', suffix: ' () => Console.WriteLine("!");', accept: ['+='], placeholder: '연산자',
          why: '<code>+=</code>로 이벤트에 메서드(또는 람다)를 추가로 등록해요.',
          hint: '"더해서 등록한다"는 느낌이에요.'
        }),
        () => makeChoice(
          '<code>Ring?.Invoke()</code>에서 <code>?.</code>를 쓰는 이유는?',
          '구독자가 아무도 없어(Ring이 null) 있을 때 예외 없이 안전하게 넘어가기 위해', ['이벤트를 강제로 해지하기 위해', 'Invoke를 비동기로 만들기 위해', '문법상 반드시 필요해서(다른 의미 없음)'],
          '아무도 구독하지 않으면 Ring은 null이라, 그냥 Invoke()하면 예외가 나요. ?.는 null이면 호출을 건너뛰어요.',
          '널 조건 연산자의 안전성을 떠올려보세요.'
        ),
        () => {
          const n = randInt(2, 3);
          const msgs = ['A', 'B', 'C'].slice(0, n);
          return {
            type: 'blank',
            q: `<code>event Action E; ${msgs.map(m => `E += () => Console.WriteLine("${m}");`).join(' ')} E?.Invoke();</code>를 실행하면? (${n}줄, 줄바꿈으로 구분)`,
            prefix: '', suffix: '', accept: [msgs.join('\n')], placeholder: '출력 결과',
            why: '등록된 순서대로 모든 핸들러가 차례로 호출돼요.',
            hint: '등록한 순서 그대로 출력돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>event Action</code> 타입의 <code>OnClick</code> 이벤트를 가진 <code>Button</code> 클래스와, <code>Invoke</code>하는 <code>Click()</code> 메서드를 작성하세요.',
          starter: '',
          rows: 8,
          placeholder: 'class Button\n{\n    public event Action OnClick;\n\n    public void Click()\n    {\n        OnClick?.Invoke();\n    }\n}',
          accept: ['class Button\n{\n    public event Action OnClick;\n\n    public void Click()\n    {\n        OnClick?.Invoke();\n    }\n}'],
          why: 'event Action으로 이벤트를 선언하고, ?.Invoke()로 안전하게 발생시켜요.',
          hint: 'public event Action OnClick; 다음 public void Click() { OnClick?.Invoke(); }'
        }),
      ],
      boss: () => {
        const msg = pick(['일어나세요', '시간이 다 됐어요', '알람입니다']);
        return {
          type: 'blank',
          q: `<code>class Alarm { public event Action Ring; public void Trigger() { Ring?.Invoke(); } } Alarm a = new Alarm(); a.Ring += () => Console.WriteLine("${msg}"); a.Trigger();</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [msg], placeholder: '출력 결과',
          why: `구독한 람다가 Trigger() 호출 시 실행되어 "${msg}"가 출력돼요.`,
          hint: '등록된 핸들러가 그대로 실행돼요.'
        };
      }
    },
    {
      id: 'lambdaExpressionsDeepDive',
      title: '람다식 깊이 보기',
      ready: true,
      summary: '=> 로 만드는 익명 함수인 람다식의 다양한 형태를 배워요.',
      goals: ['매개변수 0개/1개/여러 개 람다식 문법 익히기', '식 본문과 블록 본문 람다의 차이 알기', '람다식이 변수(클로저)를 캡처하는 방식 이해하기'],
      blocks: [
        {
          h: '람다식의 다양한 형태',
          html: `<p>람다식은 <code>(매개변수) =&gt; 식또는블록</code> 형태의 익명 함수예요. 매개변수가 하나면 괄호를 생략할 수 있고, 없으면 <code>()</code>를 그대로 써요. 본문이 한 줄이면 식 본문(값을 그대로 반환), 여러 줄이면 중괄호 블록 본문을 써요.</p>`,
          code: {
            label: 'LambdaForms.cs',
            lang: 'csharp',
            src: `Func<int> getFive = () => 5;
Func<int, int> square = x => x * x;
Func<int, int, int> add = (a, b) => a + b;
Func<int, string> describe = n =>
{
    if (n % 2 == 0) return "짝수";
    return "홀수";
};

Console.WriteLine(getFive());
Console.WriteLine(square(4));
Console.WriteLine(add(2, 3));
Console.WriteLine(describe(7));`,
            out: `5
16
5
홀수`
          }
        },
        {
          h: '클로저: 바깥 변수를 기억하는 람다',
          html: `<p>람다식은 자신이 정의된 위치의 <b>바깥 변수를 그대로 캡처(기억)</b>할 수 있어요. 이렇게 바깥 변수를 참조하는 함수를 <b>클로저(closure)</b>라고 불러요.</p>`,
          code: {
            label: 'ClosureCapture.cs',
            lang: 'csharp',
            src: `int discount = 10;
Func<int, int> applyDiscount = price => price - discount;

Console.WriteLine(applyDiscount(100));
discount = 20;
Console.WriteLine(applyDiscount(100));`,
            out: `90
80`
          },
          after: `<div class="note"><b>정리</b> — 클로저 덕분에 람다가 실행되는 시점의 최신 바깥 변수 값을 참조해요(위 예시처럼 discount를 나중에 바꾸면 람다 호출 결과도 바뀌어요). LINQ의 Where/Select 람다에서 바깥의 기준값을 참조하는 경우가 대표적이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '람다식에서 매개변수와 본문을 구분하는 기호는?',
          '=>', ['->', '::', ':'],
          '<code>(매개변수) =&gt; 본문</code> 형태로 화살표를 써요.',
          '"고이 화살표(fat arrow)"라고도 불려요.'
        ),
        () => ({
          type: 'blank',
          q: `바깥 변수를 참조해서 기억하는 람다식을 뭐라고 부르나요? (영어로)`,
          prefix: '', suffix: '', accept: ['closure', 'Closure'], placeholder: '용어',
          why: '이런 람다를 "클로저(closure)"라고 불러요.',
          hint: '"닫혀있다, 감싸다"라는 뜻에서 온 이름이에요.'
        }),
        () => {
          const disc = randInt(5, 30), price = randInt(50, 200);
          return {
            type: 'blank',
            q: `<code>int d = ${disc}; Func<int, int> apply = p => p - d; Console.WriteLine(apply(${price}));</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(price - disc)], placeholder: '숫자',
            why: `${price} - ${disc} = ${price - disc}이에요.`,
            hint: '람다가 바깥 변수 d를 그대로 사용해요.'
          };
        },
        () => makeChoice(
          '<code>Func<int, int, int> add = (a, b) => a + b;</code>에 대한 설명으로 옳은 것은?',
          '매개변수 두 개를 받아 그 합을 반환하는 식 본문 람다이다', ['매개변수가 없는 람다이다', 'a와 b를 출력만 하고 반환값이 없다', '컴파일 오류가 나는 문법이다'],
          '식 본문 람다는 <code>=&gt;</code> 뒤의 식의 값을 그대로 반환해요.',
          '=> 뒤에 있는 계산 결과가 곧 반환값이에요.'
        ),
        () => ({
          type: 'code',
          q: '정수 하나를 받아 그 값이 짝수면 true를 반환하는 람다식을 <code>Func<int, bool> isEven</code>에 대입하고, <code>isEven(4)</code>를 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'Func<int, bool> isEven = n => n % 2 == 0;\nConsole.WriteLine(isEven(4));',
          accept: ['Func<int, bool> isEven = n => n % 2 == 0;\nConsole.WriteLine(isEven(4));'],
          why: 'n % 2 == 0은 n이 짝수인지 여부를 bool로 반환해요.',
          hint: 'Func<int, bool> isEven = n => n % 2 == 0;'
        }),
      ],
      boss: () => {
        const base = randInt(5, 20);
        return {
          type: 'blank',
          q: `<code>int bonus = ${base}; Func<int, int> addBonus = score => score + bonus; bonus = ${base * 2}; Console.WriteLine(addBonus(10));</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(10 + base * 2)], placeholder: '숫자',
          why: `람다는 호출 시점의 bonus 값(${base * 2})을 사용하므로 10 + ${base * 2} = ${10 + base * 2}예요.`,
          hint: '람다는 바뀐 최신 변수 값을 참조해요.'
        };
      }
    },
    {
      id: 'nullableValueTypes',
      title: 'Nullable 값 타입 (int?)',
      ready: true,
      summary: 'int, bool 같은 값 타입에 null을 허용하는 Nullable 타입을 배워요.',
      goals: ['int? 문법으로 값 타입에 null 허용하기', 'HasValue와 Value로 안전하게 값 꺼내기', 'GetValueOrDefault로 기본값과 함께 꺼내기'],
      blocks: [
        {
          h: 'int?: 값 타입도 "값이 없음"을 표현하기',
          html: `<p><code>int</code>, <code>bool</code>, <code>DateTime</code> 같은 값 타입은 원래 <code>null</code>이 될 수 없어요. 타입 뒤에 <code>?</code>를 붙이면(<code>int?</code>) "값이 있을 수도, 없을 수도(null) 있는" 타입이 돼요. "아직 입력 안 됨", "알 수 없음" 같은 상황을 표현할 때 유용해요.</p>`,
          code: {
            label: 'NullableBasics.cs',
            lang: 'csharp',
            src: `int? age = null;
Console.WriteLine(age.HasValue);

age = 17;
Console.WriteLine(age.HasValue);
Console.WriteLine(age.Value);`,
            out: `False
True
17`
          }
        },
        {
          h: 'GetValueOrDefault: 값이 없으면 기본값',
          html: `<p><code>age.Value</code>는 값이 없을 때(null일 때) 호출하면 예외가 발생해요. <code>GetValueOrDefault()</code>나 <code>GetValueOrDefault(기본값)</code>을 쓰면 null일 때도 안전하게 대체값을 받을 수 있어요.</p>`,
          code: {
            label: 'GetValueOrDefault.cs',
            lang: 'csharp',
            src: `int? score = null;
Console.WriteLine(score.GetValueOrDefault());
Console.WriteLine(score.GetValueOrDefault(50));

score = 90;
Console.WriteLine(score.GetValueOrDefault(50));`,
            out: `0
50
90`
          },
          after: `<div class="note"><b>정리</b> — Nullable 값 타입은 데이터베이스에서 값이 비어있을 수 있는 컬럼(예: 아직 등록 안 된 나이)을 표현할 때 자주 쓰여요. null 여부를 확인하지 않고 <code>.Value</code>를 바로 쓰는 실수(InvalidOperationException)를 조심해야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>int</code> 값 타입에 null을 허용하도록 만드는 문법은?',
          'int?', ['int!', 'null int', 'Nullable int'],
          '타입 뒤에 <code>?</code>를 붙이면 Nullable 타입이 돼요(int?는 Nullable<int>의 줄임 표기).',
          '물음표 하나만 붙이면 돼요.'
        ),
        () => ({
          type: 'blank',
          q: `Nullable 값 타입 변수가 실제 값을 가지고 있는지 확인하는 속성을 쓰세요. (age.___)`,
          prefix: 'age.', suffix: '', accept: ['HasValue'], placeholder: '속성 이름',
          why: '<code>HasValue</code>는 값이 있으면 true, null이면 false를 돌려줘요.',
          hint: '"값을 가지고 있는가"라는 뜻이에요.'
        }),
        () => makeChoice(
          '<code>int? x = null; Console.WriteLine(x.Value);</code>를 실행하면?',
          'InvalidOperationException 예외가 발생한다', ['0이 출력된다', 'null이 출력된다', '컴파일 오류가 발생한다'],
          'null인 상태에서 .Value에 접근하면 실행 중 예외가 발생해요. HasValue로 미리 확인해야 해요.',
          '값이 없는데 값을 꺼내려고 하면 문제가 생겨요.'
        ),
        () => {
          const def = randInt(1, 50);
          return {
            type: 'blank',
            q: `<code>int? x = null; Console.WriteLine(x.GetValueOrDefault(${def}));</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(def)], placeholder: '숫자',
            why: `x가 null이므로 GetValueOrDefault의 인자로 준 기본값 ${def}이 반환돼요.`,
            hint: '값이 없으면 지정한 기본값이 쓰여요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>int? age = null;</code>을 선언하고, <code>HasValue</code>가 false이면 <code>"나이 미입력"</code>, true이면 <code>age.Value</code>를 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'int? age = null;\nif (age.HasValue)\n{\n    Console.WriteLine(age.Value);\n}\nelse\n{\n    Console.WriteLine("나이 미입력");\n}',
          accept: ['int? age = null;\nif (age.HasValue)\n{\n    Console.WriteLine(age.Value);\n}\nelse\n{\n    Console.WriteLine("나이 미입력");\n}'],
          why: 'HasValue로 값 유무를 먼저 확인한 뒤 안전하게 Value에 접근해요.',
          hint: 'if (age.HasValue) { ... } else { Console.WriteLine("나이 미입력"); }'
        }),
      ],
      boss: () => {
        const v = randInt(10, 40);
        return {
          type: 'blank',
          q: `<code>int? score = ${v}; Console.WriteLine(score.HasValue); Console.WriteLine(score.Value);</code>를 실행하면? (두 줄, 형식: True\\n${v})`,
          prefix: '', suffix: '', accept: [`True\n${v}`], placeholder: '출력 결과',
          why: `score에 값 ${v}이 있으므로 HasValue는 True, Value는 ${v}이에요.`,
          hint: '값이 있으므로 HasValue는 True예요.'
        };
      }
    },
    {
      id: 'nullConditionalCoalescing',
      title: '?. 널 조건 연산자와 ??, ??= 널 병합 연산자',
      ready: true,
      summary: 'null을 안전하고 간결하게 다루는 세 가지 연산자를 배워요.',
      goals: ['?. 로 null이면 예외 없이 건너뛰기', '?? 로 null일 때 대체값 지정하기', '??= 로 null일 때만 값 대입하기'],
      blocks: [
        {
          h: '?.: null이면 조용히 건너뛰기',
          html: `<p><code>객체?.멤버</code>는 객체가 <code>null</code>이 아닐 때만 멤버에 접근하고, <code>null</code>이면 예외 대신 결과 전체가 <code>null</code>이 돼요. <code>NullReferenceException</code>을 막아주는 아주 흔한 패턴이에요.</p>`,
          code: {
            label: 'NullConditional.cs',
            lang: 'csharp',
            src: `string name = null;
Console.WriteLine(name?.Length);

name = "지수";
Console.WriteLine(name?.Length);`,
            out: `
2`
          }
        },
        {
          h: '??와 ??=: 널 병합 연산자',
          html: `<p><code>값 ?? 대체값</code>은 왼쪽이 <code>null</code>이면 오른쪽 대체값을 쓰고, 아니면 왼쪽 값을 그대로 써요. <code>변수 ??= 값</code>은 변수가 <code>null</code>일 때만 값을 대입해요(이미 값이 있으면 그대로 둬요).</p>`,
          code: {
            label: 'NullCoalescing.cs',
            lang: 'csharp',
            src: `string name = null;
string display = name ?? "이름 없음";
Console.WriteLine(display);

name ??= "지수";
Console.WriteLine(name);

name ??= "다른이름";
Console.WriteLine(name);`,
            out: `이름 없음
지수
지수`
          },
          after: `<div class="note"><b>정리</b> — <code>?.</code>, <code>??</code>, <code>??=</code>는 <code>if (x == null)</code> 검사를 여러 줄로 반복하지 않고도 null을 안전하고 간결하게 다룰 수 있게 해줘요. 세 연산자를 조합한 <code>x?.Length ?? 0</code> 같은 패턴도 흔해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>obj?.Method()</code>에서 obj가 null이면 어떻게 되나요?',
          '예외 없이 전체 식이 null이 된다', ['NullReferenceException이 발생한다', 'Method()가 강제로 호출된다', '컴파일 오류가 발생한다'],
          '?.는 왼쪽이 null이면 오른쪽 접근을 건너뛰고 전체 결과를 null로 만들어요.',
          '"null이면 안전하게 넘어간다"가 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `왼쪽 값이 null일 때만 오른쪽 값을 대입하는 연산자를 쓰세요. (변수 ___ 값)`,
          prefix: 'name ', suffix: ' "지수";', accept: ['??='], placeholder: '연산자',
          why: '<code>??=</code>는 변수가 null일 때만 새 값을 대입해요.',
          hint: '??에 등호가 하나 더 붙어요.'
        }),
        () => {
          const def = pick(['손님', '익명', '없음']);
          return {
            type: 'blank',
            q: `<code>string name = null; Console.WriteLine(name ?? "${def}");</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [def], placeholder: '출력 결과',
            why: `name이 null이므로 ??의 오른쪽 값 "${def}"가 출력돼요.`,
            hint: 'null이면 ?? 뒤의 값이 쓰여요.'
          };
        },
        () => makeChoice(
          '<code>string s = "값있음"; s ??= "새값"; Console.WriteLine(s);</code>의 결과는?',
          '값있음', ['새값', 'null', '컴파일 오류'],
          's가 이미 null이 아니므로 ??=는 아무 것도 하지 않고 기존 값이 그대로 유지돼요.',
          '??=는 null일 때만 대입해요.'
        ),
        () => ({
          type: 'code',
          q: '<code>string city = null;</code>을 선언하고, <code>city ?? "알 수 없음"</code>을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'string city = null;\nConsole.WriteLine(city ?? "알 수 없음");',
          accept: ['string city = null;\nConsole.WriteLine(city ?? "알 수 없음");'],
          why: 'city가 null이므로 ?? 뒤의 "알 수 없음"이 출력돼요.',
          hint: 'city ?? "알 수 없음"'
        }),
      ],
      boss: () => {
        const def = pick(['0점', '없음', '미응시']);
        return {
          type: 'blank',
          q: `<code>string result = null; string display = result?.ToUpper() ?? "${def}"; Console.WriteLine(display);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [def], placeholder: '출력 결과',
          why: `result가 null이라 ?.는 null을 만들고, ??가 그 null을 감지해 "${def}"로 대체해요.`,
          hint: '?.와 ??가 함께 동작해요.'
        };
      }
    },
    {
      id: 'asyncAwaitTaskBasics',
      title: 'async/await와 Task 기초',
      ready: true,
      summary: '오래 걸리는 작업을 기다리는 동안 프로그램이 멈추지 않게 하는 비동기 프로그래밍을 배워요.',
      goals: ['Task와 async 메서드의 관계 이해하기', 'await로 비동기 작업 완료를 기다리기', 'Task.Delay로 비동기 대기 흉내내기'],
      blocks: [
        {
          h: 'async / await: 비동기 메서드의 기본',
          html: `<p><code>async</code>가 붙은 메서드는 <code>Task</code>(또는 <code>Task&lt;T&gt;</code>)를 반환할 수 있고, 그 안에서 <code>await</code>로 다른 비동기 작업이 끝날 때까지 <b>기다리면서도 스레드를 막지 않아요</b>. 파일 읽기, 네트워크 요청처럼 시간이 걸리는 작업에 적합해요.</p>`,
          code: {
            label: 'AsyncAwaitBasics.cs',
            lang: 'csharp',
            src: `static async Task<int> GetNumberAsync()
{
    await Task.Delay(100); // 100ms 동안 비동기로 대기(네트워크 요청 흉내)
    return 42;
}

static async Task RunAsync()
{
    Console.WriteLine("요청 시작");
    int result = await GetNumberAsync();
    Console.WriteLine($"결과: {result}");
}

await RunAsync();`,
            out: `요청 시작
결과: 42`
          }
        },
        {
          h: 'Task는 "미래에 끝날 작업"을 나타내요',
          html: `<p><code>Task</code>(또는 <code>Task&lt;T&gt;</code>)는 지금 당장 끝나지 않았을 수도 있는 작업을 표현하는 객체예요. <code>await</code>를 만나면, 그 Task가 끝날 때까지 현재 메서드의 실행을 잠시 멈추고(다른 작업은 계속 진행 가능하게 양보하고) 끝나면 이어서 실행해요.</p>`,
          code: {
            label: 'TaskSequential.cs',
            lang: 'csharp',
            src: `static async Task Step(string name, int ms)
{
    await Task.Delay(ms);
    Console.WriteLine($"{name} 완료");
}

static async Task RunAsync()
{
    await Step("1단계", 50);
    await Step("2단계", 50);
    Console.WriteLine("모두 완료");
}

await RunAsync();`,
            out: `1단계 완료
2단계 완료
모두 완료`
          },
          after: `<div class="note"><b>정리</b> — <code>await</code>로 순서대로 기다리면 위 예시처럼 1단계 → 2단계 → 완료 순서가 보장돼요. async/await는 "코드는 순서대로 읽히지만, 실제로는 기다리는 동안 스레드를 낭비하지 않는" 방식으로 동작해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '비동기 메서드를 선언할 때 메서드 앞에 붙이는 키워드는?',
          'async', ['await', 'task', 'defer'],
          '<code>async</code>가 붙은 메서드 안에서만 <code>await</code>를 쓸 수 있어요.',
          '"비동기의"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `다른 비동기 작업(Task)이 끝날 때까지 기다릴 때 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: ' Task.Delay(100);', accept: ['await'], placeholder: '키워드',
          why: '<code>await</code>는 Task가 완료될 때까지 기다리되, 스레드를 막지 않아요.',
          hint: '"기다리다"라는 뜻이에요.'
        }),
        () => makeChoice(
          '<code>Task</code>가 나타내는 것은?',
          '지금 당장은 끝나지 않았을 수도 있는, 미래에 완료될 작업', ['항상 즉시 완료되는 동기 작업', '값을 절대 반환하지 않는 작업', '스레드 자체를 의미하는 타입'],
          'Task는 "언젠가 끝날 작업"을 표현하는 객체이고, await로 그 완료를 기다릴 수 있어요.',
          '"미래의 결과를 담는 상자"라고 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>static async Task<int> F() { await Task.Delay(10); return 7; } int r = await F(); Console.WriteLine(r);</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: ['7'], placeholder: '숫자',
          why: 'F()는 Task.Delay 이후 7을 반환하고, await로 그 값을 그대로 받아요.',
          hint: 'await 이후 return된 값이 그대로 변수에 담겨요.'
        }),
        () => ({
          type: 'code',
          q: '<code>await Task.Delay(100);</code> 후 <code>7</code>을 반환하는 <code>static async Task<int> GetSevenAsync()</code> 메서드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'static async Task<int> GetSevenAsync()\n{\n    await Task.Delay(100);\n    return 7;\n}',
          accept: ['static async Task<int> GetSevenAsync()\n{\n    await Task.Delay(100);\n    return 7;\n}'],
          why: 'async Task<int> 메서드는 await로 비동기 대기 후 int 값을 반환할 수 있어요.',
          hint: 'static async Task<int> GetSevenAsync() { await Task.Delay(100); return 7; }'
        }),
      ],
      boss: () => ({
        type: 'blank',
        q: `<code>static async Task Step(string name) { await Task.Delay(10); Console.WriteLine(name); } static async Task RunAsync() { await Step("A"); await Step("B"); } await RunAsync();</code>를 실행하면? (두 줄, 형식: A\\nB)`,
        prefix: '', suffix: '', accept: ['A\nB'], placeholder: '출력 결과',
        why: 'await로 순서대로 기다리므로 Step("A")가 완료된 뒤 Step("B")가 실행돼 A, B 순서로 출력돼요.',
        hint: 'await는 순서를 보장해요.'
      })
    },
    {
      id: 'taskWhenAllAndAsyncExceptions',
      title: 'Task.WhenAll과 비동기 예외 처리',
      ready: true,
      summary: '여러 작업을 동시에 실행하고 기다리는 방법과, 비동기 코드의 예외 처리를 배워요.',
      goals: ['Task.WhenAll로 여러 작업을 동시에 기다리기', '순차 await와 동시 실행의 차이 이해하기', 'async 메서드에서도 try/catch가 그대로 동작함을 알기'],
      blocks: [
        {
          h: 'Task.WhenAll: 여러 작업을 동시에',
          html: `<p>여러 개의 <code>await</code>를 하나씩 순서대로 하면 각 작업이 <b>차례대로</b> 끝나야 다음이 시작돼요. 서로 관련 없는 작업들이라면 <code>Task.WhenAll(작업들)</code>로 <b>동시에 시작</b>해서 전체 시간을 줄일 수 있어요.</p>`,
          code: {
            label: 'TaskWhenAll.cs',
            lang: 'csharp',
            src: `static async Task<int> FetchAsync(int id)
{
    await Task.Delay(50);
    return id * 10;
}

static async Task RunAsync()
{
    Task<int> t1 = FetchAsync(1);
    Task<int> t2 = FetchAsync(2);
    Task<int> t3 = FetchAsync(3);

    int[] results = await Task.WhenAll(t1, t2, t3);
    Console.WriteLine(string.Join(",", results));
}

await RunAsync();`,
            out: `10,20,30`
          }
        },
        {
          h: '비동기 코드에서도 try/catch가 그대로 동작해요',
          html: `<p><code>async</code> 메서드 안에서 예외가 발생해도 일반 코드와 똑같이 <code>try/catch</code>로 잡을 수 있어요. <code>await</code>가 예외를 다시 던져주기 때문에, 마치 동기 코드를 다루듯 자연스럽게 예외 처리를 할 수 있어요.</p>`,
          code: {
            label: 'AsyncTryCatch.cs',
            lang: 'csharp',
            src: `static async Task<int> RiskyAsync()
{
    await Task.Delay(10);
    throw new InvalidOperationException("실패!");
}

static async Task RunAsync()
{
    try
    {
        int r = await RiskyAsync();
        Console.WriteLine(r);
    }
    catch (InvalidOperationException e)
    {
        Console.WriteLine($"오류 처리: {e.Message}");
    }
}

await RunAsync();`,
            out: `오류 처리: 실패!`
          },
          after: `<div class="note"><b>정리</b> — 서로 의존하지 않는 작업(여러 API 호출 등)은 Task.WhenAll로 동시에 실행해 전체 대기 시간을 줄이고, 한 작업의 결과가 다음 작업에 필요할 때만 순차적으로 await하는 게 효율적이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '서로 독립적인 여러 Task를 동시에 실행하고 모두 끝나길 기다릴 때 쓰는 메서드는?',
          'Task.WhenAll', ['Task.Delay', 'Task.Run', 'Task.Wait'],
          '<code>Task.WhenAll(작업들)</code>은 전달된 모든 Task가 끝날 때까지 기다려요.',
          '"모두(All)를 기다린다(When)"는 이름 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `async 메서드 안에서 발생한 예외를 잡으려면 일반 코드와 마찬가지로 무엇을 쓰나요? (블록 이름, 예: ___/catch)`,
          prefix: '', suffix: '/catch', accept: ['try'], placeholder: '키워드',
          why: 'async 메서드에서도 try/catch가 그대로 동작해요.',
          hint: '동기 코드의 예외 처리와 똑같아요.'
        }),
        () => makeChoice(
          '세 개의 독립적인 Task를 <code>await t1; await t2; await t3;</code>처럼 순서대로 기다리는 것과, <code>await Task.WhenAll(t1, t2, t3);</code>의 차이는?',
          '전자는 각 작업을 순서대로(합산된 시간), 후자는 동시에 실행해(가장 오래 걸리는 것 기준) 더 빠를 수 있다', ['둘의 실행 시간은 항상 같다', '후자는 예외를 처리할 수 없다', '전자만 결과값을 받을 수 있다'],
          '동시에 시작해서 병렬로 기다리면 전체 대기 시간이 가장 오래 걸리는 작업 하나만큼으로 줄어들 수 있어요.',
          '"순서대로 vs 동시에"의 차이를 생각해보세요.'
        ),
        () => {
          const a = randInt(1, 5), b = randInt(1, 5);
          return {
            type: 'blank',
            q: `<code>static async Task<int> F(int x) { await Task.Delay(10); return x * x; } int[] r = await Task.WhenAll(F(${a}), F(${b})); Console.WriteLine(string.Join(",", r));</code>를 실행하면? (형식: 값1,값2)`,
            prefix: '', suffix: '', accept: [`${a * a},${b * b}`], placeholder: '출력 결과',
            why: `각 Task의 결과인 ${a * a}와 ${b * b}가 순서대로 배열에 담겨요.`,
            hint: '전달한 순서대로 결과가 배열에 담겨요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>await Task.Delay(10);</code> 후 <code>InvalidOperationException</code>을 던지는 async 메서드를 <code>try/catch</code>로 감싸 <code>catch</code>에서 <code>"처리됨"</code>을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 8,
          placeholder: 'try\n{\n    await Task.Delay(10);\n    throw new InvalidOperationException("실패");\n}\ncatch (InvalidOperationException e)\n{\n    Console.WriteLine("처리됨");\n}',
          accept: ['try\n{\n    await Task.Delay(10);\n    throw new InvalidOperationException("실패");\n}\ncatch (InvalidOperationException e)\n{\n    Console.WriteLine("처리됨");\n}'],
          why: 'async 코드 안에서도 try/catch로 예외를 그대로 잡을 수 있어요.',
          hint: 'try { ... throw ... } catch (InvalidOperationException e) { Console.WriteLine("처리됨"); }'
        }),
      ],
      boss: () => {
        const vals = [randInt(1, 9), randInt(1, 9)];
        return {
          type: 'blank',
          q: `<code>static async Task<int> F(int x) { await Task.Delay(5); return x + 100; } int[] r = await Task.WhenAll(F(${vals[0]}), F(${vals[1]})); Console.WriteLine(r[0] + r[1]);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(vals[0] + 100 + vals[1] + 100)], placeholder: '숫자',
          why: `각 F 호출 결과는 ${vals[0] + 100}과 ${vals[1] + 100}이고, 합은 ${vals[0] + 100 + vals[1] + 100}이에요.`,
          hint: '각 결과에 100을 더한 뒤 서로 더해보세요.'
        };
      }
    },
    {
      id: 'fileIOBasics',
      title: '파일 입출력 기초 (System.IO)',
      ready: true,
      summary: '파일을 읽고 쓰는 File 클래스와 스트림 기반 리더/라이터를 배워요.',
      goals: ['File.WriteAllText/ReadAllText로 간단히 읽고 쓰기', 'StreamWriter/StreamReader의 역할 이해하기', 'using으로 파일 자원을 안전하게 정리하기'],
      blocks: [
        {
          h: 'File.WriteAllText / ReadAllText: 가장 간단한 방법',
          html: `<p><code>System.IO.File</code>의 <code>WriteAllText(경로, 내용)</code>과 <code>ReadAllText(경로)</code>는 파일 하나를 통째로 쓰고 읽는 가장 간단한 방법이에요. 짧은 텍스트 파일을 다룰 때 적합해요.</p>`,
          code: {
            label: 'FileBasics.cs',
            lang: 'csharp',
            src: `using System.IO;

File.WriteAllText("memo.txt", "안녕하세요!");
string content = File.ReadAllText("memo.txt");
Console.WriteLine(content);`,
            out: `안녕하세요!`
          }
        },
        {
          h: 'StreamWriter / StreamReader와 using',
          html: `<p>더 세밀하게 제어하려면(예: 한 줄씩 쓰기/읽기) <code>StreamWriter</code>, <code>StreamReader</code>를 써요. 이들은 파일 핸들 같은 <b>외부 자원</b>을 쓰기 때문에, 다 쓰면 반드시 닫아야(Dispose) 해요. <code>using</code> 블록을 쓰면 블록이 끝날 때 자동으로 정리해줘요.</p>`,
          code: {
            label: 'StreamReaderWriter.cs',
            lang: 'csharp',
            src: `using System.IO;

using (StreamWriter writer = new StreamWriter("log.txt"))
{
    writer.WriteLine("첫 줄");
    writer.WriteLine("둘째 줄");
}

using (StreamReader reader = new StreamReader("log.txt"))
{
    string line;
    while ((line = reader.ReadLine()) != null)
    {
        Console.WriteLine(line);
    }
}`,
            out: `첫 줄
둘째 줄`
          },
          after: `<div class="note"><b>정리</b> — 짧은 텍스트는 File.WriteAllText/ReadAllText로 간단히, 줄 단위 처리나 큰 파일은 StreamReader/StreamWriter로 다뤄요. 파일·네트워크 연결 같은 자원은 <code>using</code>으로 감싸는 습관이 중요해요(자원 누수 방지).</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '파일 전체 내용을 문자열 하나로 간단히 읽어오는 메서드는?',
          'File.ReadAllText', ['File.Open', 'StreamReader.New', 'File.Load'],
          '<code>File.ReadAllText(경로)</code>는 파일 전체를 문자열로 한 번에 읽어와요.',
          '"모든 텍스트를 읽는다"는 뜻 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `StreamWriter, StreamReader 같은 외부 자원을 블록이 끝날 때 자동으로 정리(Dispose)해주는 키워드를 쓰세요.`,
          prefix: '', suffix: ' (StreamWriter w = new StreamWriter("a.txt")) { }', accept: ['using'], placeholder: '키워드',
          why: '<code>using (자원) { }</code> 블록이 끝나면 자원이 자동으로 Dispose(정리)돼요.',
          hint: '파일 맨 위의 네임스페이스 선언과 같은 단어지만 여기선 다른 의미예요.'
        }),
        () => makeChoice(
          'StreamWriter/StreamReader 같은 자원을 다 쓴 뒤 명시적으로 닫지 않으면 생길 수 있는 문제는?',
          '파일이 잠긴 채로 남아 다른 코드가 접근하지 못하는 자원 누수가 생길 수 있다', ['프로그램이 항상 즉시 종료된다', '파일 내용이 자동으로 삭제된다', '아무 문제도 생기지 않는다'],
          '파일 핸들 같은 외부 자원을 닫지 않으면 자원이 계속 점유되어 문제가 생길 수 있어요. using이 이를 막아줘요.',
          '"자원을 계속 붙잡고 있다"를 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>using (StreamWriter w = new StreamWriter("a.txt")) { w.WriteLine("Hi"); } using (StreamReader r = new StreamReader("a.txt")) { Console.WriteLine(r.ReadLine()); }</code>를 실행하면?`,
          prefix: '', suffix: '', accept: ['Hi'], placeholder: '출력 결과',
          why: '쓰기 블록에서 저장한 "Hi"를 읽기 블록에서 ReadLine으로 그대로 읽어와요.',
          hint: '쓴 내용을 그대로 읽어와요.'
        }),
        () => ({
          type: 'code',
          q: '<code>"note.txt"</code>에 <code>File.WriteAllText</code>로 <code>"기록완료"</code>를 저장한 뒤, <code>File.ReadAllText</code>로 읽어 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'File.WriteAllText("note.txt", "기록완료");\nstring text = File.ReadAllText("note.txt");\nConsole.WriteLine(text);',
          accept: ['File.WriteAllText("note.txt", "기록완료");\nstring text = File.ReadAllText("note.txt");\nConsole.WriteLine(text);'],
          why: 'WriteAllText로 저장한 내용을 ReadAllText로 그대로 읽어올 수 있어요.',
          hint: 'File.WriteAllText(경로, 내용); 다음 File.ReadAllText(경로);'
        }),
      ],
      boss: () => {
        const msg = pick(['완료되었습니다', '저장되었습니다', '기록됐습니다']);
        return {
          type: 'blank',
          q: `<code>File.WriteAllText("x.txt", "${msg}"); string s = File.ReadAllText("x.txt"); Console.WriteLine(s);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [msg], placeholder: '출력 결과',
          why: `저장한 내용 "${msg}"가 그대로 읽혀 출력돼요.`,
          hint: '쓴 내용 그대로 읽혀요.'
        };
      }
    },
    {
      id: 'stringBuilderAndFormatting',
      title: 'StringBuilder와 문자열 포맷팅',
      ready: true,
      summary: '반복적인 문자열 연결을 효율적으로 처리하는 StringBuilder를 배워요.',
      goals: ['string이 불변(immutable)이라 + 반복이 비효율적임을 이해하기', 'StringBuilder.Append로 효율적으로 문자열 만들기', 'ToString(포맷)으로 숫자 형식 지정하기'],
      blocks: [
        {
          h: 'string은 불변: + 연결을 반복하면 비효율적',
          html: `<p>C#의 <code>string</code>은 <b>불변(immutable)</b>이에요. <code>+</code>로 문자열을 이어붙일 때마다 실제로는 <b>새 문자열 객체</b>가 만들어져요. 반복문 안에서 <code>+=</code>를 수천 번 하면 그만큼 많은 임시 객체가 생겨 느려질 수 있어요.</p>`,
          code: {
            label: 'StringImmutable.cs',
            lang: 'csharp',
            src: `string result = "";
for (int i = 0; i < 3; i++)
{
    result += i; // 매번 새 문자열이 만들어짐
}
Console.WriteLine(result);`,
            out: `012`
          }
        },
        {
          h: 'StringBuilder: 효율적으로 문자열 조립하기',
          html: `<p><code>StringBuilder</code>는 내부 버퍼에 이어붙이며 새 객체를 반복해서 만들지 않아요. <code>Append</code>로 이어붙이고, 다 만든 뒤 <code>ToString()</code>으로 최종 문자열을 얻어요. 반복이 많은 문자열 조립에 훨씬 효율적이에요.</p>`,
          code: {
            label: 'StringBuilderBasics.cs',
            lang: 'csharp',
            src: `using System.Text;

StringBuilder sb = new StringBuilder();
for (int i = 0; i < 3; i++)
{
    sb.Append(i);
}
string result = sb.ToString();
Console.WriteLine(result);

double pi = 3.14159;
Console.WriteLine(pi.ToString("F2"));`,
            out: `012
3.14`
          },
          after: `<div class="note"><b>정리</b> — <code>ToString("F2")</code>처럼 형식 문자열을 주면 소수점 자릿수 등을 원하는 대로 지정할 수 있어요("F2"는 소수점 둘째 자리까지). 짧은 연결 몇 번은 +로도 충분하지만, 반복문 안의 문자열 조립은 StringBuilder가 정석이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'C#의 string 타입에 대한 설명으로 옳은 것은?',
          '한 번 만들어지면 내용이 바뀌지 않는 불변 타입이다', ['배열처럼 언제든 내용을 직접 수정할 수 있다', 'StringBuilder보다 항상 반복 연결에 효율적이다', '값 타입이 아니라 항상 null이 기본값일 수 없다'],
          'string은 불변이라 + 연결마다 새 문자열 객체가 만들어져요.',
          '"바뀌지 않는다(immutable)"는 뜻을 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `StringBuilder에 문자열을 이어붙일 때 쓰는 메서드를 쓰세요.`,
          prefix: 'sb.', suffix: '("Hi");', accept: ['Append'], placeholder: '메서드 이름',
          why: '<code>Append(값)</code>은 StringBuilder의 끝에 값을 덧붙여요.',
          hint: '"덧붙이다"라는 뜻이에요.'
        }),
        () => makeChoice(
          '반복문 안에서 문자열을 수천 번 이어붙여야 할 때 더 효율적인 방법은?',
          'StringBuilder의 Append를 사용한다', ['string에 + 연산자를 반복해서 쓴다', '반드시 배열로 바꿔서 처리한다', '아무 차이가 없다'],
          '+ 연결은 매번 새 문자열을 만들지만, StringBuilder는 내부 버퍼에 이어붙이므로 반복이 많을 때 훨씬 효율적이에요.',
          '"새 객체를 계속 만드는가"가 핵심이에요.'
        ),
        () => {
          const n = randInt(2, 5);
          return {
            type: 'blank',
            q: `<code>StringBuilder sb = new StringBuilder(); for (int i = 1; i <= ${n}; i++) { sb.Append(i); } Console.WriteLine(sb.ToString());</code>를 실행하면? (숫자를 이어붙인 문자열)`,
            prefix: '', suffix: '', accept: [Array.from({ length: n }, (_, k) => k + 1).join('')], placeholder: '출력 결과',
            why: `1부터 ${n}까지 이어붙이면 ${Array.from({ length: n }, (_, k) => k + 1).join('')}이 돼요.`,
            hint: '1부터 순서대로 이어붙여보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>StringBuilder</code>를 만들어 <code>"안녕"</code>과 <code>"하세요"</code>를 순서대로 <code>Append</code>한 뒤 <code>ToString()</code> 결과를 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'StringBuilder sb = new StringBuilder();\nsb.Append("안녕");\nsb.Append("하세요");\nConsole.WriteLine(sb.ToString());',
          accept: ['StringBuilder sb = new StringBuilder();\nsb.Append("안녕");\nsb.Append("하세요");\nConsole.WriteLine(sb.ToString());'],
          why: 'Append를 두 번 호출하면 순서대로 이어붙은 문자열이 만들어져요.',
          hint: 'sb.Append("안녕"); sb.Append("하세요");'
        }),
      ],
      boss: () => {
        const num = (randInt(100, 999) / 100).toFixed(4);
        return {
          type: 'blank',
          q: `<code>double x = ${num}; Console.WriteLine(x.ToString("F2"));</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [Number(num).toFixed(2)], placeholder: '숫자',
          why: `"F2" 형식은 소수점 둘째 자리까지 반올림해 표시해요.`,
          hint: '소수점 둘째 자리까지 반올림돼요.'
        };
      }
    },
    {
      id: 'extensionMethodsGeneral',
      title: '확장 메서드(extension method)',
      ready: true,
      summary: '기존 타입을 수정하지 않고도 새 메서드를 추가하는 확장 메서드를 배워요.',
      goals: ['static 클래스 + this 매개변수로 확장 메서드 정의하기', '기존 타입(예: string, int)에 메서드처럼 호출하는 방법 이해하기', '확장 메서드가 실제로는 정적 메서드 호출임을 알기'],
      blocks: [
        {
          h: '확장 메서드: 기존 타입에 메서드를 "추가"하기',
          html: `<p>확장 메서드는 <code>static class</code> 안의 <code>static</code> 메서드로, 첫 번째 매개변수에 <code>this</code>를 붙여서 만들어요. 이렇게 하면 마치 그 타입에 원래 있던 메서드처럼 <code>값.메서드()</code> 형태로 호출할 수 있어요.</p>`,
          code: {
            label: 'ExtensionMethodBasics.cs',
            lang: 'csharp',
            src: `static class StringExtensions
{
    public static bool IsPalindrome(this string s)
    {
        string reversed = new string(s.Reverse().ToArray());
        return s == reversed;
    }
}

Console.WriteLine("level".IsPalindrome());
Console.WriteLine("hello".IsPalindrome());`,
            out: `True
False`
          }
        },
        {
          h: '실제로는 정적 메서드를 호출하는 것뿐이에요',
          html: `<p>확장 메서드는 문법적 편의(syntactic sugar)일 뿐이에요. <code>s.IsPalindrome()</code>은 컴파일러가 내부적으로 <code>StringExtensions.IsPalindrome(s)</code>로 바꿔서 실행해요. 즉, string 클래스 자체를 수정하지 않고도 새 기능을 "추가한 것처럼" 쓸 수 있어요.</p>`,
          code: {
            label: 'IntExtension.cs',
            lang: 'csharp',
            src: `static class IntExtensions
{
    public static bool IsEven(this int n)
    {
        return n % 2 == 0;
    }
}

int x = 4;
Console.WriteLine(x.IsEven());
Console.WriteLine(IntExtensions.IsEven(x)); // 위와 완전히 같은 호출`,
            out: `True
True`
          },
          after: `<div class="note"><b>정리</b> — 확장 메서드는 남의 라이브러리 타입(내가 소스코드를 고칠 수 없는 타입)에도 새 기능을 붙일 수 있어 매우 유용해요. LINQ의 Where, Select 자체도 모두 IEnumerable&lt;T&gt;에 대한 확장 메서드예요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '확장 메서드를 정의할 때 첫 번째 매개변수 앞에 붙이는 키워드는?',
          'this', ['self', 'ref', 'extend'],
          '<code>public static bool IsEven(this int n)</code>처럼 첫 매개변수에 this를 붙여요.',
          '"자기 자신"을 가리키는 그 키워드예요.'
        ),
        () => ({
          type: 'blank',
          q: `확장 메서드를 담는 클래스는 반드시 어떤 종류의 클래스여야 하나요? (영어로: ___ class)`,
          prefix: '', suffix: ' class', accept: ['static'], placeholder: '단어',
          why: '확장 메서드는 반드시 static 클래스 안의 static 메서드로 정의해야 해요.',
          hint: '객체 없이 클래스 이름으로 바로 접근하는 그 키워드예요.'
        }),
        () => makeChoice(
          '<code>"level".IsPalindrome()</code>이 실제로 컴파일되는 방식은?',
          'StringExtensions.IsPalindrome("level")처럼 정적 메서드 호출로 바뀐다', ['string 클래스 자체가 수정되어 새 메서드가 생긴다', '런타임에 동적으로 메서드가 생성된다', '컴파일 오류가 발생한다'],
          '확장 메서드는 문법적 편의일 뿐이라, 실제로는 정적 메서드를 호출하는 코드로 컴파일돼요.',
          '겉모습만 인스턴스 메서드처럼 보여요.'
        ),
        () => {
          const s = pick(['기러기', 'hello', '토마토', 'world']);
          const isPal = s === s.split('').reverse().join('');
          return {
            type: 'blank',
            q: `<code>static class E { public static bool IsPalindrome(this string s) { return s == new string(s.Reverse().ToArray()); } } Console.WriteLine("${s}".IsPalindrome());</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [isPal ? 'True' : 'False'], placeholder: 'True 또는 False',
            why: `"${s}"는 뒤집어도 ${isPal ? '같으므로 True' : '다르므로 False'}예요.`,
            hint: '문자열을 거꾸로 읽어도 같은지 확인해보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>int</code>에 대한 확장 메서드 <code>public static int Square(this int n)</code>을 static 클래스 <code>IntExtensions</code> 안에 <code>n * n</code>을 반환하도록 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'static class IntExtensions\n{\n    public static int Square(this int n)\n    {\n        return n * n;\n    }\n}',
          accept: ['static class IntExtensions\n{\n    public static int Square(this int n)\n    {\n        return n * n;\n    }\n}'],
          why: 'this int n으로 int 타입에 대한 확장 메서드를 정의할 수 있어요.',
          hint: 'static class IntExtensions { public static int Square(this int n) { return n * n; } }'
        }),
      ],
      boss: () => {
        const n = randInt(2, 10);
        return {
          type: 'blank',
          q: `<code>static class E { public static int Square(this int n) { return n * n; } } int x = ${n}; Console.WriteLine(x.Square());</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(n * n)], placeholder: '숫자',
          why: `${n}의 제곱은 ${n * n}이에요.`,
          hint: 'x.Square()는 x * x와 같아요.'
        };
      }
    },
    {
      id: 'recordsImmutableData',
      title: '레코드(record): 불변 데이터 타입',
      ready: true,
      summary: 'C# 9의 record로 값 기반 비교와 불변성을 갖춘 데이터 타입을 만들어요.',
      goals: ['record의 값 기반 동등성(Equals) 이해하기', 'record가 기본적으로 불변에 가까움을 이해하기', 'with 식으로 일부만 바꾼 복사본 만들기'],
      blocks: [
        {
          h: 'record: 값이 같으면 같은 것으로 취급',
          html: `<p>일반 <code>class</code>는 참조가 같아야 <code>Equals</code>가 true예요. <code>record</code>는 <b>모든 필드/프로퍼티 값이 같으면</b> 서로 다른 객체여도 같다고 판단해요("값 기반 동등성"). 데이터 그 자체를 표현하는 타입에 알맞아요.</p>`,
          code: {
            label: 'RecordBasics.cs',
            lang: 'csharp',
            src: `record Point(int X, int Y);

Point p1 = new Point(1, 2);
Point p2 = new Point(1, 2);

Console.WriteLine(p1 == p2);
Console.WriteLine(p1.Equals(p2));`,
            out: `True
True`
          }
        },
        {
          h: 'with 식: 일부만 바꾼 새 복사본 만들기',
          html: `<p>record는 <code>with</code> 식으로 기존 값을 기반으로 <b>일부 프로퍼티만 바꾼 새 복사본</b>을 쉽게 만들 수 있어요. 원본은 바뀌지 않고, 지정하지 않은 나머지 값은 그대로 복사돼요.</p>`,
          code: {
            label: 'RecordWithExpression.cs',
            lang: 'csharp',
            src: `record Student(string Name, int Age);

Student s1 = new Student("지수", 17);
Student s2 = s1 with { Age = 18 };

Console.WriteLine(s1);
Console.WriteLine(s2);`,
            out: `Student { Name = 지수, Age = 17 }
Student { Name = 지수, Age = 18 }`
          },
          after: `<div class="note"><b>정리</b> — record는 이름, 좌표, 설정값처럼 "정체성보다 값 자체가 중요한" 데이터를 표현할 때 class보다 자연스러워요. 기본 생성자 문법(<code>record Point(int X, int Y);</code>)만으로 프로퍼티, 생성자, Equals, ToString이 자동으로 만들어져요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'record와 class의 동등성 비교(==) 차이로 옳은 것은?',
          'record는 값이 모두 같으면 true, class는 기본적으로 참조가 같아야 true', ['record는 항상 false를 반환한다', 'class는 값이 같으면 항상 true다', '둘의 동작은 완전히 같다'],
          'record는 값 기반 동등성을, 일반 class는 참조 기반 동등성을 기본으로 가져요.',
          '"내용이 같은가" vs "같은 객체인가"의 차이예요.'
        ),
        () => ({
          type: 'blank',
          q: `기존 record 값을 기반으로 일부 프로퍼티만 바꾼 새 복사본을 만들 때 쓰는 식을 쓰세요. (변수 ___ { 프로퍼티 = 새값 })`,
          prefix: 's1 ', suffix: ' { Age = 18 };', accept: ['with'], placeholder: '키워드',
          why: '<code>with</code> 식은 나머지는 그대로 복사하고 지정한 프로퍼티만 바꾼 새 객체를 만들어요.',
          hint: '"~와 함께"라는 뜻이지만 여기선 특수한 문법이에요.'
        }),
        () => makeChoice(
          '<code>record Point(int X, int Y);</code> 한 줄로 자동으로 만들어지지 않는 것은?',
          '무작위 X, Y 값', ['생성자', 'Equals(값 기반 비교)', 'ToString()'],
          '이 한 줄만으로 프로퍼티, 생성자, 값 기반 Equals, ToString이 모두 자동 생성되지만, 값 자체는 직접 넣어줘야 해요.',
          '"자동으로 만들어지는 기능"이 아닌 것을 찾아보세요.'
        ),
        () => {
          const age1 = randInt(15, 20), age2 = randInt(21, 30);
          return {
            type: 'blank',
            q: `<code>record P(string Name, int Age); P a = new P("민준", ${age1}); P b = a with { Age = ${age2} }; Console.WriteLine(b.Age);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(age2)], placeholder: '숫자',
            why: `with 식에서 Age만 ${age2}로 바꾼 새 복사본이 만들어졌어요.`,
            hint: 'with에서 지정한 값이 그대로 반영돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>Name</code>(string)과 <code>Price</code>(int)를 가진 <code>record Product(string Name, int Price);</code>를 정의하세요.',
          starter: '',
          rows: 1,
          placeholder: 'record Product(string Name, int Price);',
          accept: ['record Product(string Name, int Price);'],
          why: '이 한 줄로 프로퍼티, 생성자, 값 기반 Equals가 모두 자동으로 만들어져요.',
          hint: 'record 타입이름(타입 프로퍼티1, 타입 프로퍼티2);'
        }),
      ],
      boss: () => {
        const p1 = randInt(1000, 5000), p2 = randInt(6000, 9000);
        return {
          type: 'blank',
          q: `<code>record Product(string Name, int Price); Product a = new Product("사과", ${p1}); Product b = a with { Price = ${p2} }; Console.WriteLine(a.Price); Console.WriteLine(b.Price);</code>를 실행하면? (두 줄, 형식: ${p1}\\n${p2})`,
          prefix: '', suffix: '', accept: [`${p1}\n${p2}`], placeholder: '출력 결과',
          why: 'with 식은 원본(a)은 그대로 두고 Price만 바꾼 새 객체(b)를 만들어요.',
          hint: '원본은 바뀌지 않고, 새 복사본만 바뀐 값을 가져요.'
        };
      }
    },
    {
      id: 'patternMatchingSwitchExpr',
      title: '패턴 매칭: is 패턴과 속성 패턴',
      ready: true,
      summary: '값의 타입이나 형태를 검사하고 즉시 변수로 꺼내는 패턴 매칭을 배워요.',
      goals: ['is 패턴으로 타입 검사와 변수 선언을 동시에 하기', 'switch 식에서 타입 패턴 활용하기', '속성 패턴(property pattern)으로 객체 내부 값 검사하기'],
      blocks: [
        {
          h: 'is 패턴: 타입 검사와 동시에 변수로 꺼내기',
          html: `<p><code>obj is 타입 변수명</code>은 obj가 그 타입이면 <code>true</code>를 반환하면서 동시에 그 타입으로 캐스팅된 값을 새 변수에 담아줘요. 타입 검사와 캐스팅을 한 번에 안전하게 처리해요.</p>`,
          code: {
            label: 'IsPattern.cs',
            lang: 'csharp',
            src: `object value = "지수";

if (value is string s)
{
    Console.WriteLine($"문자열: {s}, 길이: {s.Length}");
}
else
{
    Console.WriteLine("문자열이 아니에요");
}`,
            out: `문자열: 지수, 길이: 2`
          }
        },
        {
          h: 'switch 식의 타입 패턴과 속성 패턴',
          html: `<p>switch 식에서도 <code>case 타입 변수명 =&gt; ...</code>처럼 타입별로 분기할 수 있어요. 더 나아가 <code>{ 프로퍼티: 값 }</code> 형태의 <b>속성 패턴</b>으로 객체 내부 값까지 조건에 포함시킬 수 있어요.</p>`,
          code: {
            label: 'PropertyPattern.cs',
            lang: 'csharp',
            src: `record Student(string Name, int Score);

string Grade(Student s) => s switch
{
    { Score: >= 90 } => "A",
    { Score: >= 80 } => "B",
    { Score: >= 70 } => "C",
    _ => "F"
};

Console.WriteLine(Grade(new Student("지수", 95)));
Console.WriteLine(Grade(new Student("민준", 65)));`,
            out: `A
F`
          },
          after: `<div class="note"><b>정리</b> — 패턴 매칭은 "타입이 무엇인지", "내부 값이 어떤 조건인지"를 <code>if</code>를 여러 겹으로 중첩하지 않고도 선언적으로 표현하게 해줘요. 요즘 C# 코드에서 매우 자주 쓰이는 스타일이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>if (value is string s)</code>에 대한 설명으로 옳은 것은?',
          'value가 string이면 true를 반환하며 동시에 s에 캐스팅된 값을 담는다', ['value를 무조건 string으로 강제 변환한다', 's라는 이름의 새 클래스를 정의한다', 'value가 null인지만 확인한다'],
          'is 패턴은 타입 확인과 캐스팅, 변수 선언을 한 번에 처리해줘요.',
          '"~인 경우, 동시에 값을 꺼낸다"는 의미예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>{ Score: >= 90 }</code>처럼 객체 내부 프로퍼티 값을 조건에 포함시키는 패턴을 뭐라고 부르나요? (한글로: ___ 패턴)`,
          prefix: '', suffix: ' 패턴', accept: ['속성'], placeholder: '단어',
          why: '이런 패턴을 "속성 패턴(property pattern)"이라고 불러요.',
          hint: '객체의 "속성(프로퍼티)"을 검사해요.'
        }),
        () => {
          const score = randInt(60, 100);
          let grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'F';
          return {
            type: 'blank',
            q: `<code>record S(int Score); string G(S s) => s switch { { Score: >= 90 } => "A", { Score: >= 80 } => "B", { Score: >= 70 } => "C", _ => "F" }; Console.WriteLine(G(new S(${score})));</code>를 실행하면?`,
            prefix: '', suffix: '', accept: [grade], placeholder: '등급',
            why: `점수 ${score}는 등급 ${grade}에 해당해요.`,
            hint: '위에서부터 순서대로 조건을 확인해보세요.'
          };
        },
        () => makeChoice(
          '<code>object x = 42; if (x is int n && n > 0) { Console.WriteLine(n); }</code>에 대한 설명으로 옳은 것은?',
          'x가 int이고 그 값이 0보다 클 때만 n을 출력한다', ['x가 int가 아니어도 항상 실행된다', 'n은 이 블록 밖에서도 계속 사용 가능하다(범위 제한 없음)', '컴파일 오류가 발생한다'],
          'is 패턴으로 만든 변수 n은 그 뒤 조건(&&)에서 바로 사용할 수 있고, 조건이 모두 만족할 때만 블록이 실행돼요.',
          'is로 만든 변수는 그 자리에서 바로 조건에 쓸 수 있어요.'
        ),
        () => ({
          type: 'code',
          q: '<code>object value</code>를 받아 <code>value is int n</code>이면 <code>"정수: {n}"</code>을, 아니면 <code>"정수 아님"</code>을 출력하는 코드를 작성하세요. (value는 <code>10</code>으로 가정)',
          starter: '',
          rows: 8,
          placeholder: 'object value = 10;\nif (value is int n)\n{\n    Console.WriteLine($"정수: {n}");\n}\nelse\n{\n    Console.WriteLine("정수 아님");\n}',
          accept: ['object value = 10;\nif (value is int n)\n{\n    Console.WriteLine($"정수: {n}");\n}\nelse\n{\n    Console.WriteLine("정수 아님");\n}'],
          why: 'is 패턴으로 타입을 확인하고 동시에 n에 값을 담아 사용해요.',
          hint: 'if (value is int n) { ... } else { ... }'
        }),
      ],
      boss: () => {
        const score = randInt(50, 100);
        let grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'F';
        return {
          type: 'blank',
          q: `<code>record S(int Score); string G(S s) => s switch { { Score: >= 90 } => "A", { Score: >= 80 } => "B", { Score: >= 70 } => "C", _ => "F" }; Console.WriteLine(G(new S(${score})));</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [grade], placeholder: '등급',
          why: `점수 ${score}는 등급 ${grade}예요.`,
          hint: '조건을 위에서부터 순서대로 확인해보세요.'
        };
      }
    },
    {
      id: 'operatorOverloading',
      title: '연산자 오버로딩',
      ready: true,
      summary: '+ 같은 연산자를 우리가 만든 타입에도 쓸 수 있도록 재정의해요.',
      goals: ['operator 키워드로 + 연산자 재정의하기', '연산자 오버로딩은 static 메서드로 정의됨을 이해하기', '연산자 오버로딩이 코드 가독성을 높이는 상황 이해하기'],
      blocks: [
        {
          h: 'operator +: 우리 타입에 + 연산 추가하기',
          html: `<p><code>public static 타입 operator +(타입 a, 타입 b)</code> 형태로 <code>+</code> 연산자를 재정의하면, 우리가 만든 타입끼리도 <code>+</code>로 자연스럽게 연산할 수 있어요.</p>`,
          code: {
            label: 'OperatorOverload.cs',
            lang: 'csharp',
            src: `struct Point2D
{
    public double X, Y;

    public static Point2D operator +(Point2D a, Point2D b)
    {
        return new Point2D { X = a.X + b.X, Y = a.Y + b.Y };
    }
}

Point2D v1 = new Point2D { X = 1, Y = 2 };
Point2D v2 = new Point2D { X = 3, Y = 4 };
Point2D sum = v1 + v2;

Console.WriteLine($"{sum.X}, {sum.Y}");`,
            out: `4, 6`
          }
        },
        {
          h: '== 와 != 는 함께 오버로딩하는 게 관례예요',
          html: `<p><code>==</code>를 오버로딩하면 컴파일러가 <code>!=</code>도 함께 정의하라고 요구해요(짝을 이뤄야 함). 두 연산자는 항상 반대 의미가 되도록 일관성 있게 구현해야 해요.</p>`,
          code: {
            label: 'EqualityOperator.cs',
            lang: 'csharp',
            src: `struct Point
{
    public int X, Y;

    public static bool operator ==(Point a, Point b)
    {
        return a.X == b.X && a.Y == b.Y;
    }

    public static bool operator !=(Point a, Point b)
    {
        return !(a == b);
    }

    public override bool Equals(object obj) => obj is Point p && this == p;
    public override int GetHashCode() => (X, Y).GetHashCode();
}

Point p1 = new Point { X = 1, Y = 2 };
Point p2 = new Point { X = 1, Y = 2 };
Console.WriteLine(p1 == p2);`,
            out: `True`
          },
          after: `<div class="note"><b>정리</b> — 연산자 오버로딩은 좌표, 벡터, 금액처럼 "덧셈이나 비교가 자연스러운 개념"을 가진 타입에 쓰면 코드가 수학 표기처럼 읽혀 가독성이 좋아져요. 남용하면 오히려 헷갈릴 수 있으니 의미가 명확할 때만 쓰는 게 좋아요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '연산자를 재정의할 때 쓰는 키워드는?',
          'operator', ['override', 'overload', 'operate'],
          '<code>public static 타입 operator +(...)</code> 형태로 연산자를 재정의해요.',
          '"연산자"라는 뜻의 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `연산자 오버로딩 메서드는 항상 어떤 종류의 메서드로 정의되나요? (영어로: ___ 메서드)`,
          prefix: '', suffix: ' 메서드', accept: ['static', 'Static'], placeholder: '단어',
          why: '연산자 오버로딩은 항상 <code>public static</code> 메서드로 정의돼요.',
          hint: '객체 없이 타입 자체에 속하는 메서드예요.'
        }),
        () => makeChoice(
          '<code>==</code> 연산자를 오버로딩할 때 지켜야 할 관례는?',
          '!=도 함께 오버로딩해서 반대 의미가 되도록 구현한다', ['==만 정의하면 충분하다', 'Equals와 GetHashCode는 절대 건드리면 안 된다', '== 는 오버로딩할 수 없다'],
          '==를 오버로딩하면 반드시 !=도 함께 정의해야 하고, 보통 Equals/GetHashCode도 일관되게 맞춰줘요.',
          '두 연산자는 항상 서로 반대여야 자연스러워요.'
        ),
        () => {
          const x1 = randInt(1, 10), y1 = randInt(1, 10), x2 = randInt(1, 10), y2 = randInt(1, 10);
          return {
            type: 'blank',
            q: `<code>struct V { public int X, Y; public static V operator +(V a, V b) => new V { X = a.X + b.X, Y = a.Y + b.Y }; } V a = new V { X = ${x1}, Y = ${y1} }; V b = new V { X = ${x2}, Y = ${y2} }; V c = a + b; Console.WriteLine($"{c.X},{c.Y}");</code>를 실행하면? (형식: x,y)`,
            prefix: '', suffix: '', accept: [`${x1 + x2},${y1 + y2}`], placeholder: '출력 결과',
            why: `X끼리, Y끼리 각각 더해 (${x1 + x2}, ${y1 + y2})가 돼요.`,
            hint: '같은 성분끼리 더해보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>X</code>, <code>Y</code>(둘 다 int) 필드를 가진 <code>struct Point</code>에, 두 Point를 더하는 <code>public static Point operator +(Point a, Point b)</code>를 작성하세요.',
          starter: '',
          rows: 8,
          placeholder: 'struct Point\n{\n    public int X, Y;\n\n    public static Point operator +(Point a, Point b)\n    {\n        return new Point { X = a.X + b.X, Y = a.Y + b.Y };\n    }\n}',
          accept: ['struct Point\n{\n    public int X, Y;\n\n    public static Point operator +(Point a, Point b)\n    {\n        return new Point { X = a.X + b.X, Y = a.Y + b.Y };\n    }\n}'],
          why: 'operator +는 두 Point의 X끼리, Y끼리 더한 새 Point를 반환해요.',
          hint: 'X = a.X + b.X, Y = a.Y + b.Y'
        }),
      ],
      boss: () => {
        const x1 = randInt(1, 20), x2 = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>struct M { public int Value; public static M operator +(M a, M b) => new M { Value = a.Value + b.Value }; } M a = new M { Value = ${x1} }; M b = new M { Value = ${x2} }; M c = a + b; Console.WriteLine(c.Value);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(x1 + x2)], placeholder: '숫자',
          why: `${x1} + ${x2} = ${x1 + x2}이에요.`,
          hint: 'Value끼리 더해보세요.'
        };
      }
    },
    {
      id: 'indexersCustom',
      title: '인덱서(indexer): this[] 로 배열처럼 접근하기',
      ready: true,
      summary: '우리가 만든 클래스도 대괄호로 값에 접근할 수 있게 하는 인덱서를 배워요.',
      goals: ['this[인덱스] 문법으로 인덱서 정의하기', '인덱서의 get/set 접근자 이해하기', '인덱서가 배열처럼 보이지만 내부는 자유롭게 구현됨을 알기'],
      blocks: [
        {
          h: '인덱서: 객체를 배열처럼 다루기',
          html: `<p><code>public 타입 this[인덱스타입 i] { get; set; }</code> 형태로 <b>인덱서</b>를 정의하면, 그 클래스의 객체를 <code>obj[i]</code>처럼 대괄호로 접근할 수 있어요. 내부적으로는 배열, Dictionary 등 어떤 자료구조든 자유롭게 쓸 수 있어요.</p>`,
          code: {
            label: 'IndexerBasics.cs',
            lang: 'csharp',
            src: `class NameList
{
    private string[] names = new string[3];

    public string this[int index]
    {
        get { return names[index]; }
        set { names[index] = value; }
    }
}

NameList list = new NameList();
list[0] = "지수";
Console.WriteLine(list[0]);`,
            out: `지수`
          }
        },
        {
          h: '문자열 키를 쓰는 인덱서도 가능해요',
          html: `<p>인덱서의 인덱스 타입은 <code>int</code>가 아니어도 돼요. <code>string</code> 등 원하는 타입으로 만들면, 마치 Dictionary처럼 이름으로 값을 찾는 인덱서도 만들 수 있어요.</p>`,
          code: {
            label: 'StringIndexer.cs',
            lang: 'csharp',
            src: `using System.Collections.Generic;

class ScoreBoard
{
    private Dictionary<string, int> scores = new Dictionary<string, int>();

    public int this[string name]
    {
        get => scores.ContainsKey(name) ? scores[name] : 0;
        set => scores[name] = value;
    }
}

ScoreBoard board = new ScoreBoard();
board["지수"] = 90;
Console.WriteLine(board["지수"]);
Console.WriteLine(board["민준"]);`,
            out: `90
0`
          },
          after: `<div class="note"><b>정리</b> — 인덱서는 <code>List&lt;T&gt;</code>의 <code>list[i]</code>, <code>Dictionary&lt;K,V&gt;</code>의 <code>dict[key]</code>가 실제로 쓰는 문법이에요. 우리 클래스도 "컬렉션처럼 느껴지는" 개념이라면 인덱서로 자연스러운 API를 만들 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '클래스에 <code>obj[i]</code> 형태의 대괄호 접근을 추가하는 문법은?',
          'this[인덱스] { get; set; }', ['operator[] { }', 'index(int i) { }', 'array[i] { }'],
          '<code>public 타입 this[인덱스타입 i] { get; set; }</code>가 인덱서 선언 문법이에요.',
          '"this" 키워드에 대괄호가 붙어요.'
        ),
        () => ({
          type: 'blank',
          q: `인덱서의 인덱스 타입이 반드시 int여야 하나요, 아니면 다른 타입(예: string)도 가능한가요? (가능/불가능 중 한글로)`,
          prefix: '', suffix: '', accept: ['가능'], placeholder: '답',
          why: '인덱서의 인덱스 타입은 자유롭게 정할 수 있어요(string도 가능해요).',
          hint: 'Dictionary의 문자열 키 인덱서를 떠올려보세요.'
        }),
        () => makeChoice(
          '인덱서와 배열의 관계로 옳은 설명은?',
          '인덱서는 배열처럼 보이지만 내부 구현은 자유롭다(배열, Dictionary 등 무엇이든 가능)', ['인덱서는 반드시 내부적으로 배열만 써야 한다', '인덱서는 값을 읽기(get)만 할 수 있고 쓰기(set)는 불가능하다', '인덱서는 하나의 클래스에 최대 1개만 만들 수 있다'],
          '인덱서는 문법적으로 대괄호 접근을 제공할 뿐, 내부에서 어떤 자료구조를 쓰든 자유예요.',
          '"겉모습만 배열 같다"는 점이 핵심이에요.'
        ),
        () => {
          const v = randInt(50, 100);
          return {
            type: 'blank',
            q: `<code>class Box { private int[] arr = new int[3]; public int this[int i] { get => arr[i]; set => arr[i] = value; } } Box b = new Box(); b[1] = ${v}; Console.WriteLine(b[1]);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(v)], placeholder: '숫자',
            why: `인덱서의 set으로 대입한 ${v}가 get으로 그대로 조회돼요.`,
            hint: '대입한 값이 그대로 읽혀요.'
          };
        },
        () => ({
          type: 'code',
          q: '내부에 <code>int[] arr = new int[5];</code>를 가지고, <code>this[int i]</code> 인덱서로 <code>arr[i]</code>를 읽고 쓰는 <code>IntBox</code> 클래스를 작성하세요.',
          starter: '',
          rows: 8,
          placeholder: 'class IntBox\n{\n    private int[] arr = new int[5];\n\n    public int this[int i]\n    {\n        get { return arr[i]; }\n        set { arr[i] = value; }\n    }\n}',
          accept: ['class IntBox\n{\n    private int[] arr = new int[5];\n\n    public int this[int i]\n    {\n        get { return arr[i]; }\n        set { arr[i] = value; }\n    }\n}'],
          why: 'this[int i] { get; set; }로 내부 배열에 대괄호 접근을 제공해요.',
          hint: 'public int this[int i] { get { return arr[i]; } set { arr[i] = value; } }'
        }),
      ],
      boss: () => {
        const v = randInt(1, 100);
        return {
          type: 'blank',
          q: `<code>class Box { private int[] arr = new int[3]; public int this[int i] { get => arr[i]; set => arr[i] = value; } } Box b = new Box(); b[0] = ${v}; Console.WriteLine(b[0]);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(v)], placeholder: '숫자',
          why: `대입한 값 ${v}이 인덱서 get을 통해 그대로 조회돼요.`,
          hint: '대입한 값이 그대로 나와요.'
        };
      }
    },
    {
      id: 'tuplesAndDeconstruction',
      title: '튜플과 분해(deconstruction)',
      ready: true,
      summary: '여러 값을 간단히 묶는 튜플과, 그 값을 변수로 풀어내는 분해를 배워요.',
      goals: ['(타입, 타입) 튜플 문법 이해하기', '이름 붙은 튜플 요소 사용하기', '분해 구문으로 여러 변수에 한 번에 대입하기'],
      blocks: [
        {
          h: '튜플: 여러 값을 간단히 묶기',
          html: `<p>클래스를 따로 만들기엔 너무 간단한, 여러 값을 임시로 묶고 싶을 때 <b>튜플</b>을 써요. <code>(타입1, 타입2) 이름 = (값1, 값2);</code> 형태로 만들고, <code>이름.Item1</code>, <code>이름.Item2</code>로 접근하거나 이름을 붙여 접근할 수 있어요.</p>`,
          code: {
            label: 'TupleBasics.cs',
            lang: 'csharp',
            src: `(string name, int age) person = ("지수", 17);
Console.WriteLine(person.name);
Console.WriteLine(person.age);

var pair = (10, 20);
Console.WriteLine(pair.Item1 + pair.Item2);`,
            out: `지수
17
30`
          }
        },
        {
          h: '분해(deconstruction): 튜플을 여러 변수로 풀어내기',
          html: `<p>튜플을 반환하는 메서드가 있으면, <code>(변수1, 변수2) = 메서드()</code> 형태로 한 번에 여러 변수에 나눠 담을 수 있어요. 이를 <b>분해(deconstruction)</b>라고 해요.</p>`,
          code: {
            label: 'TupleDeconstruction.cs',
            lang: 'csharp',
            src: `static (int min, int max) FindMinMax(int[] nums)
{
    int min = nums[0], max = nums[0];
    foreach (int n in nums)
    {
        if (n < min) min = n;
        if (n > max) max = n;
    }
    return (min, max);
}

(int min, int max) = FindMinMax(new int[] { 5, 2, 8, 1, 9 });
Console.WriteLine($"최소: {min}, 최대: {max}");`,
            out: `최소: 1, 최대: 9`
          },
          after: `<div class="note"><b>정리</b> — 튜플은 메서드가 값 하나가 아니라 <b>여러 값을 동시에 반환</b>하고 싶을 때 out 매개변수보다 더 간결한 방법이에요. 다만 값들의 의미가 복잡해지면 별도의 클래스나 record로 만드는 게 더 명확해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '이름을 붙이지 않은 튜플의 각 요소에 접근할 때 쓰는 기본 속성 이름은?',
          'Item1, Item2, ...', ['First, Second, ...', 'Value1, Value2, ...', 'X, Y, ...'],
          '이름을 붙이지 않으면 Item1, Item2 순서로 접근해요.',
          '"항목(Item)"이라는 뜻의 단어에 번호가 붙어요.'
        ),
        () => ({
          type: 'blank',
          q: `튜플을 반환하는 메서드의 결과를 여러 변수에 한 번에 나눠 담는 것을 뭐라고 부르나요? (영어로)`,
          prefix: '', suffix: '', accept: ['deconstruction', 'Deconstruction'], placeholder: '용어',
          why: '이 기능을 "분해(deconstruction)"라고 불러요.',
          hint: '"구조를 해체한다"는 뜻이에요.'
        }),
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>(int a, int b) t = (${a}, ${b}); Console.WriteLine(t.a + t.b);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `${a} + ${b} = ${a + b}이에요.`,
            hint: '이름 붙은 두 요소를 더해보세요.'
          };
        },
        () => makeChoice(
          '<code>(int min, int max) = FindMinMax(nums);</code>에 대한 설명으로 옳은 것은?',
          'FindMinMax가 반환한 튜플의 두 값이 min, max 변수에 각각 대입된다', ['min과 max에 같은 값이 대입된다', 'FindMinMax는 값을 하나만 반환할 수 있다', '컴파일 오류가 발생한다'],
          '분해 구문은 튜플의 각 요소를 순서대로 왼쪽의 변수들에 대입해요.',
          '튜플의 순서와 변수의 순서가 대응돼요.'
        ),
        () => ({
          type: 'code',
          q: '<code>int</code> 두 개를 받아 <code>(합, 차)</code> 튜플을 반환하는 메서드 <code>static (int sum, int diff) Calc(int a, int b)</code>를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'static (int sum, int diff) Calc(int a, int b)\n{\n    return (a + b, a - b);\n}',
          accept: ['static (int sum, int diff) Calc(int a, int b)\n{\n    return (a + b, a - b);\n}'],
          why: '튜플 (a + b, a - b)를 그대로 반환하면 돼요.',
          hint: 'return (a + b, a - b);'
        }),
      ],
      boss: () => {
        const a = randInt(10, 30), b = randInt(1, 9);
        return {
          type: 'blank',
          q: `<code>static (int sum, int diff) Calc(int a, int b) { return (a + b, a - b); } (int s, int d) = Calc(${a}, ${b}); Console.WriteLine($"{s} {d}");</code>를 실행하면? (형식: 합 차)`,
          prefix: '', suffix: '', accept: [`${a + b} ${a - b}`], placeholder: '출력 결과',
          why: `합은 ${a + b}, 차는 ${a - b}예요.`,
          hint: '튜플의 두 값이 순서대로 s, d에 담겨요.'
        };
      }
    },
    {
      id: 'customIteratorsYieldReturn',
      title: '사용자 정의 반복자: yield return',
      ready: true,
      summary: '내가 만든 시퀀스를 foreach로 순회할 수 있게 해주는 yield return을 배워요.',
      goals: ['yield return으로 값을 하나씩 지연 생성하기', 'IEnumerable<T> 반환 메서드 만들기', '전체를 미리 만들지 않고 필요할 때마다 계산하는 이점 이해하기'],
      blocks: [
        {
          h: 'yield return: 값을 하나씩 만들어내기',
          html: `<p><code>IEnumerable&lt;T&gt;</code>를 반환하는 메서드 안에서 <code>yield return 값;</code>을 쓰면, 배열이나 리스트를 미리 다 만들지 않고도 <b>foreach가 하나씩 값을 요청할 때마다</b> 그 자리에서 값을 만들어 줄 수 있어요.</p>`,
          code: {
            label: 'YieldReturnBasics.cs',
            lang: 'csharp',
            src: `using System.Collections.Generic;

static IEnumerable<int> CountUpTo(int max)
{
    for (int i = 1; i <= max; i++)
    {
        yield return i;
    }
}

foreach (int n in CountUpTo(4))
{
    Console.WriteLine(n);
}`,
            out: `1
2
3
4`
          }
        },
        {
          h: '지연 실행: 필요할 때만 계산돼요',
          html: `<p><code>yield return</code>이 있는 메서드는 호출해도 <b>즉시 실행되지 않아요</b>. foreach가 다음 값을 요청할 때마다 그 지점까지만 실행하고 멈춰요("지연 실행"). 무한히 이어지는 시퀀스나, 필요한 만큼만 계산해서 자원을 아끼고 싶을 때 유용해요.</p>`,
          code: {
            label: 'LazyEvaluation.cs',
            lang: 'csharp',
            src: `using System.Collections.Generic;

static IEnumerable<int> Numbers()
{
    Console.WriteLine("1 생성");
    yield return 1;
    Console.WriteLine("2 생성");
    yield return 2;
}

foreach (int n in Numbers())
{
    Console.WriteLine($"받음: {n}");
}`,
            out: `1 생성
받음: 1
2 생성
받음: 2`
          },
          after: `<div class="note"><b>정리</b> — LINQ의 Where, Select도 내부적으로 이런 지연 실행 방식으로 동작해요. yield return 덕분에 "전체를 미리 메모리에 다 올려두지 않고, 필요한 만큼만 순차적으로 만들어내는" 효율적인 시퀀스를 쉽게 만들 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '메서드 안에서 값을 하나씩 지연 생성해 돌려줄 때 쓰는 키워드는?',
          'yield return', ['return', 'delay return', 'lazy return'],
          '<code>yield return 값;</code>은 값을 하나 내어주고, 다음 요청이 오면 이어서 실행해요.',
          '"내어주다, 양보하다"라는 뜻의 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>yield return</code>을 쓰는 메서드가 반환하는 타입을 쓰세요. (예: static ___<int> F())`,
          prefix: 'static ', suffix: '<int> F()', accept: ['IEnumerable'], placeholder: '타입',
          why: 'yield return을 쓰려면 반환 타입이 <code>IEnumerable&lt;T&gt;</code>(또는 IEnumerator&lt;T&gt;)여야 해요.',
          hint: '"열거할 수 있다"는 뜻의 인터페이스예요.'
        }),
        () => {
          const n = randInt(2, 5);
          return {
            type: 'blank',
            q: `<code>static IEnumerable<int> F(int max) { for (int i = 1; i <= max; i++) yield return i * i; } foreach (int n in F(${n})) Console.Write(n);</code>를 실행하면? (공백 없이 이어서)`,
            prefix: '', suffix: '', accept: [Array.from({ length: n }, (_, k) => (k + 1) * (k + 1)).join('')], placeholder: '출력 결과',
            why: `1부터 ${n}까지의 제곱을 이어붙이면 ${Array.from({ length: n }, (_, k) => (k + 1) * (k + 1)).join('')}이에요.`,
            hint: '각 숫자의 제곱을 순서대로 이어붙여보세요.'
          };
        },
        () => makeChoice(
          'yield return을 쓰는 메서드의 "지연 실행"에 대한 설명으로 옳은 것은?',
          'foreach가 다음 값을 요청할 때마다 그 지점까지만 실행된다', ['메서드를 호출하는 즉시 전체가 실행되어 배열로 만들어진다', 'yield return은 항상 무한 루프를 의미한다', '지연 실행은 예외 처리를 할 수 없게 만든다'],
          'yield return이 있는 메서드는 값을 요청받을 때마다 그 지점까지 실행되고 멈춰요.',
          '"필요할 때만 실행된다"가 핵심이에요.'
        ),
        () => ({
          type: 'code',
          q: '1부터 <code>max</code>까지의 짝수만 <code>yield return</code>으로 반환하는 <code>static IEnumerable<int> Evens(int max)</code> 메서드를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: 'static IEnumerable<int> Evens(int max)\n{\n    for (int i = 1; i <= max; i++)\n    {\n        if (i % 2 == 0)\n        {\n            yield return i;\n        }\n    }\n}',
          accept: ['static IEnumerable<int> Evens(int max)\n{\n    for (int i = 1; i <= max; i++)\n    {\n        if (i % 2 == 0)\n        {\n            yield return i;\n        }\n    }\n}'],
          why: '짝수 조건을 만족할 때만 yield return으로 값을 내어줘요.',
          hint: 'if (i % 2 == 0) { yield return i; }'
        }),
      ],
      boss: () => {
        const n = randInt(3, 6);
        return {
          type: 'blank',
          q: `<code>static IEnumerable<int> F(int max) { for (int i = 1; i <= max; i++) yield return i; } int sum = 0; foreach (int n in F(${n})) { sum += n; } Console.WriteLine(sum);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [String(Array.from({ length: n }, (_, k) => k + 1).reduce((a, b) => a + b, 0))], placeholder: '숫자',
          why: `1부터 ${n}까지의 합은 ${Array.from({ length: n }, (_, k) => k + 1).reduce((a, b) => a + b, 0)}이에요.`,
          hint: '1부터 n까지 순서대로 더해보세요.'
        };
      }
    },
    {
      id: 'attributesAndReflectionBasics',
      title: '어트리뷰트와 리플렉션 기초',
      ready: true,
      summary: '코드에 메타데이터를 붙이는 어트리뷰트와, 실행 중 타입 정보를 살펴보는 리플렉션을 배워요.',
      goals: ['[Attribute] 문법으로 메타데이터 붙이기', 'GetType()과 typeof로 타입 정보 얻기', '리플렉션으로 실행 중 타입의 이름/멤버를 확인하는 개념 이해하기'],
      blocks: [
        {
          h: '어트리뷰트: 코드에 붙이는 꼬리표',
          html: `<p><b>어트리뷰트</b>는 <code>[이름]</code> 형태로 클래스, 메서드 등에 붙이는 메타데이터(추가 정보)예요. 코드의 동작 자체를 바꾸진 않지만, 컴파일러나 다른 도구(테스트 프레임워크, 직렬화 라이브러리 등)가 이 정보를 읽어서 특별하게 처리해요.</p>`,
          code: {
            label: 'AttributeBasics.cs',
            lang: 'csharp',
            src: `class Product
{
    [Obsolete("대신 NewMethod를 쓰세요")]
    public void OldMethod()
    {
        Console.WriteLine("옛날 방식");
    }

    public void NewMethod()
    {
        Console.WriteLine("새로운 방식");
    }
}

Product p = new Product();
p.NewMethod(); // OldMethod를 호출하면 컴파일러가 경고를 보여줘요`,
            out: `새로운 방식`
          }
        },
        {
          h: 'GetType(), typeof: 실행 중 타입 정보 확인하기(리플렉션)',
          html: `<p><b>리플렉션</b>은 프로그램이 실행되는 중에 <b>자기 자신의 타입 정보</b>(클래스 이름, 메서드 목록 등)를 들여다보는 기능이에요. <code>객체.GetType()</code>은 실제 객체의 타입을, <code>typeof(타입)</code>은 컴파일 시점에 아는 타입 정보를 가져와요.</p>`,
          code: {
            label: 'ReflectionBasics.cs',
            lang: 'csharp',
            src: `class Student { }

Student s = new Student();
Console.WriteLine(s.GetType().Name);
Console.WriteLine(typeof(Student).Name);
Console.WriteLine(s.GetType() == typeof(Student));`,
            out: `Student
Student
True`
          },
          after: `<div class="note"><b>정리</b> — 리플렉션은 강력하지만 일반 코드보다 느리고 복잡해서, 프레임워크(테스트 러너, DI 컨테이너, 직렬화 라이브러리 등)를 만들 때 주로 쓰여요. 일반 애플리케이션 코드에서는 꼭 필요할 때만 신중하게 사용해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '클래스나 메서드에 메타데이터를 붙일 때 쓰는 문법은?',
          '[어트리뷰트이름]', ['<어트리뷰트이름>', '#어트리뷰트이름', '@어트리뷰트이름'],
          '<code>[Obsolete("...")]</code>처럼 대괄호로 어트리뷰트를 붙여요.',
          '대괄호 안에 이름을 써요.'
        ),
        () => ({
          type: 'blank',
          q: `객체의 실제 실행 중 타입 정보를 얻을 때 호출하는 메서드를 쓰세요. (obj.___())`,
          prefix: 's.', suffix: '()', accept: ['GetType'], placeholder: '메서드 이름',
          why: '<code>GetType()</code>은 그 객체의 실제 런타임 타입 정보를 돌려줘요.',
          hint: '"타입을 가져온다"는 뜻이에요.'
        }),
        () => makeChoice(
          '리플렉션에 대한 설명으로 옳은 것은?',
          '실행 중에 타입의 이름, 멤버 등 메타데이터를 들여다보는 기능이다', ['컴파일 오류를 자동으로 고쳐주는 기능이다', '항상 일반 코드보다 빠르게 실행된다', 'C#에서는 지원되지 않는 기능이다'],
          '리플렉션은 실행 중에 타입 정보 자체를 조사할 수 있게 해주는 기능이에요.',
          '"자기 자신을 되돌아본다"는 이름 그대로예요.'
        ),
        () => makeChoice(
          '<code>typeof(Student)</code>와 <code>student.GetType()</code>의 공통점은?',
          '둘 다 Type 객체(타입 정보)를 나타낸다', ['둘 다 새 객체를 생성한다', '둘 다 항상 다른 결과를 반환한다', '하나는 정적 메서드, 하나는 연산자로 완전히 다른 개념이다'],
          '둘 다 결과적으로 타입 정보를 담은 Type 객체를 돌려줘요.',
          '"타입 정보를 나타내는 객체"라는 공통점을 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>class Animal { }</code> 클래스의 객체 <code>a</code>를 만들고, <code>a.GetType().Name</code>을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'class Animal { }\n\nAnimal a = new Animal();\nConsole.WriteLine(a.GetType().Name);',
          accept: ['class Animal { }\n\nAnimal a = new Animal();\nConsole.WriteLine(a.GetType().Name);'],
          why: 'GetType().Name은 실제 객체의 클래스 이름을 문자열로 알려줘요.',
          hint: 'a.GetType().Name은 "Animal"을 돌려줘요.'
        }),
      ],
      boss: () => {
        const name = pick(['Cat', 'Dog', 'Bird']);
        return {
          type: 'blank',
          q: `<code>class ${name} { } ${name} obj = new ${name}(); Console.WriteLine(obj.GetType().Name);</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [name], placeholder: '출력 결과',
          why: `GetType().Name은 실제 클래스 이름인 "${name}"을 그대로 돌려줘요.`,
          hint: '클래스 이름 그대로가 출력돼요.'
        };
      }
    },
    {
      id: 'multithreadingBasicsCSharp',
      title: '멀티스레딩 기초: Task.Run과 lock',
      ready: true,
      summary: '여러 작업을 동시에 실행하는 멀티스레딩과, 공유 자원을 안전하게 보호하는 lock을 배워요.',
      goals: ['Task.Run으로 작업을 별도 스레드에서 실행하기', '여러 스레드가 같은 데이터를 건드릴 때의 위험(경쟁 상태) 이해하기', 'lock으로 임계 구역을 보호하기'],
      blocks: [
        {
          h: 'Task.Run: 별도 스레드에서 작업 실행하기',
          html: `<p><code>Task.Run(() =&gt; { ... })</code>은 전달된 코드를 <b>다른 스레드</b>에서 실행해요. CPU를 많이 쓰는 계산을 메인 흐름과 동시에 처리하고 싶을 때 써요. <code>await</code>로 그 작업이 끝나기를 기다릴 수 있어요.</p>`,
          code: {
            label: 'TaskRunBasics.cs',
            lang: 'csharp',
            src: `static int HeavyCalculation()
{
    int sum = 0;
    for (int i = 1; i <= 1000; i++) sum += i;
    return sum;
}

int result = await Task.Run(() => HeavyCalculation());
Console.WriteLine(result);`,
            out: `500500`
          }
        },
        {
          h: 'lock: 여러 스레드가 동시에 건드리는 걸 막기',
          html: `<p>여러 스레드가 <b>같은 데이터를 동시에</b> 바꾸면 값이 꼬이는 <b>경쟁 상태(race condition)</b>가 생길 수 있어요. <code>lock (객체) { ... }</code> 블록은 한 번에 한 스레드만 그 블록에 들어갈 수 있게 해서, 공유 데이터를 안전하게 보호해요.</p>`,
          code: {
            label: 'LockBasics.cs',
            lang: 'csharp',
            src: `class Counter
{
    private int count = 0;
    private readonly object lockObj = new object();

    public void Increment()
    {
        lock (lockObj)
        {
            count++;
        }
    }

    public int GetCount() => count;
}

Counter counter = new Counter();
Task[] tasks = new Task[100];
for (int i = 0; i < 100; i++)
{
    tasks[i] = Task.Run(() => counter.Increment());
}
await Task.WhenAll(tasks);
Console.WriteLine(counter.GetCount());`,
            out: `100`
          },
          after: `<div class="note"><b>정리</b> — lock 없이 여러 스레드가 <code>count++</code>를 동시에 실행하면 일부 증가가 "덮어써져서" 사라질 수 있어요(경쟁 상태). lock은 그 순간 딱 하나의 스레드만 안전하게 값을 바꾸도록 보장해줘요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '전달된 코드를 별도의 스레드에서 실행하는 메서드는?',
          'Task.Run', ['Task.Delay', 'Task.WhenAll', 'Task.Wait'],
          '<code>Task.Run(() =&gt; { ... })</code>은 코드를 다른 스레드 풀 스레드에서 실행해요.',
          '"실행하다"라는 뜻의 이름이에요.'
        ),
        () => ({
          type: 'blank',
          q: `여러 스레드가 동시에 접근하지 못하게 코드 블록을 보호하는 키워드를 쓰세요.`,
          prefix: '', suffix: ' (obj) { count++; }', accept: ['lock'], placeholder: '키워드',
          why: '<code>lock (obj) { ... }</code> 블록은 한 번에 한 스레드만 들어갈 수 있어요.',
          hint: '"잠그다"라는 뜻이에요.'
        }),
        () => makeChoice(
          '여러 스레드가 lock 없이 같은 변수를 동시에 수정할 때 생길 수 있는 문제는?',
          '경쟁 상태(race condition)로 값이 예상과 다르게 꼬일 수 있다', ['프로그램이 항상 즉시 종료된다', '컴파일 오류가 발생한다', '자동으로 값이 두 배가 된다'],
          '동시 접근이 겹치면 일부 변경이 사라지는 등 예측 불가능한 값이 될 수 있어요. 이를 경쟁 상태라고 해요.',
          '"동시에 건드려서 꼬인다"는 상황이에요.'
        ),
        () => makeChoice(
          '<code>lock (lockObj) { count++; }</code>에 대한 설명으로 옳은 것은?',
          '한 스레드가 블록 안에 있는 동안 다른 스레드는 같은 lockObj로 잠긴 블록에 들어가지 못하고 기다린다', ['lock은 코드 실행 속도를 항상 더 빠르게 만든다', 'lock은 스레드를 아예 생성하지 못하게 막는다', 'lockObj는 반드시 int 타입이어야 한다'],
          'lock은 같은 lockObj를 기준으로 한 번에 한 스레드만 블록에 진입하게 해서 안전을 보장해요.',
          '"기다렸다가 순서대로 들어간다"는 원리예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>private int count = 0;</code>과 <code>private readonly object lockObj = new object();</code>를 가진 클래스에서, <code>lock</code>으로 <code>count</code>를 안전하게 증가시키는 <code>Increment()</code> 메서드를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'public void Increment()\n{\n    lock (lockObj)\n    {\n        count++;\n    }\n}',
          accept: ['public void Increment()\n{\n    lock (lockObj)\n    {\n        count++;\n    }\n}'],
          why: 'lock 블록 안에서 count를 바꾸면 여러 스레드가 동시에 호출해도 안전해요.',
          hint: 'lock (lockObj) { count++; }'
        }),
      ],
      boss: () => ({
        type: 'blank',
        q: `<code>static int Sum() { int s = 0; for (int i = 1; i <= 100; i++) s += i; return s; } int r = await Task.Run(() => Sum()); Console.WriteLine(r);</code>를 실행하면?`,
        prefix: '', suffix: '', accept: ['5050'], placeholder: '숫자',
        why: '1부터 100까지의 합은 5050이고, Task.Run은 그 결과를 그대로 돌려줘요.',
        hint: '1부터 100까지 더한 값이에요.'
      })
    },
    {
      id: 'dependencyInjectionConcept',
      title: '의존성 주입(Dependency Injection) 개념',
      ready: true,
      summary: '객체가 필요한 의존 대상을 직접 만들지 않고 외부에서 전달받는 설계 원칙을 배워요.',
      goals: ['직접 new로 의존 대상을 만들 때의 문제점 이해하기', '생성자 주입(constructor injection) 패턴 이해하기', '인터페이스에 의존하면 구현체를 자유롭게 교체할 수 있음을 알기'],
      blocks: [
        {
          h: '직접 new 하면 생기는 문제: 강한 결합',
          html: `<p>클래스 안에서 필요한 다른 객체를 <code>new</code>로 직접 만들면, 그 클래스는 특정 구현에 <b>강하게 결합</b>돼요. 나중에 다른 구현으로 바꾸거나, 테스트용 가짜 객체로 교체하기 어려워져요.</p>`,
          code: {
            label: 'TightCoupling.cs',
            lang: 'csharp',
            src: `class EmailSender
{
    public void Send(string msg) => Console.WriteLine($"이메일 발송: {msg}");
}

class OrderService
{
    private EmailSender sender = new EmailSender(); // 직접 생성(강한 결합)

    public void PlaceOrder()
    {
        sender.Send("주문이 완료되었습니다.");
    }
}

new OrderService().PlaceOrder();`,
            out: `이메일 발송: 주문이 완료되었습니다.`
          }
        },
        {
          h: '생성자 주입: 필요한 것을 외부에서 받기',
          html: `<p><b>의존성 주입(DI)</b>은 객체가 필요한 대상(의존성)을 직접 만들지 않고, <b>생성자를 통해 외부에서 전달받는</b> 방식이에요. 인터페이스에 의존하면, 실제 구현체를 자유롭게 바꿔 끼울 수 있어요(예: 테스트에서는 가짜 발송기 사용).</p>`,
          code: {
            label: 'ConstructorInjection.cs',
            lang: 'csharp',
            src: `interface INotifier
{
    void Send(string msg);
}

class EmailNotifier : INotifier
{
    public void Send(string msg) => Console.WriteLine($"이메일: {msg}");
}

class FakeNotifier : INotifier
{
    public void Send(string msg) => Console.WriteLine($"[테스트] {msg}");
}

class OrderService
{
    private readonly INotifier notifier;

    public OrderService(INotifier notifier)
    {
        this.notifier = notifier;
    }

    public void PlaceOrder()
    {
        notifier.Send("주문이 완료되었습니다.");
    }
}

new OrderService(new EmailNotifier()).PlaceOrder();
new OrderService(new FakeNotifier()).PlaceOrder();`,
            out: `이메일: 주문이 완료되었습니다.
[테스트] 주문이 완료되었습니다.`
          },
          after: `<div class="note"><b>정리</b> — DI의 핵심은 "이 객체가 무엇이 필요한지는 알지만, 그것을 어떻게 만들지는 직접 신경 쓰지 않는다"예요. 덕분에 실제 서비스에서는 진짜 구현체를, 테스트에서는 가짜(mock) 구현체를 자유롭게 주입할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '의존성 주입(DI)의 핵심 아이디어로 가장 알맞은 것은?',
          '객체가 필요한 의존 대상을 직접 만들지 않고 외부에서 전달받는다', ['모든 클래스는 static이어야 한다', '객체는 절대 다른 객체를 참조할 수 없다', '인터페이스는 절대 쓰지 않는다'],
          'DI는 필요한 객체를 직접 생성하지 않고 외부(주로 생성자)에서 주입받는 설계예요.',
          '"주입(injection)"이라는 단어를 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `생성자의 매개변수로 의존 대상을 전달받는 DI 방식을 뭐라고 부르나요? (한글로: 생성자 ___)`,
          prefix: '생성자 ', suffix: '', accept: ['주입'], placeholder: '단어',
          why: '이 방식을 "생성자 주입(constructor injection)"이라고 불러요.',
          hint: '"넣어준다"는 뜻의 단어예요.'
        }),
        () => makeChoice(
          '<code>class OrderService { private EmailSender s = new EmailSender(); }</code>처럼 클래스 내부에서 직접 의존 대상을 new하는 방식의 단점은?',
          '다른 구현체(예: 테스트용 가짜 객체)로 교체하기 어렵다(강한 결합)', ['코드가 항상 더 빨라진다', '클래스가 더 재사용하기 쉬워진다', '단점이 전혀 없다'],
          '직접 new하면 그 구체 클래스에 강하게 묶여서, 유연하게 교체하거나 테스트하기 어려워져요.',
          '"바꿔 끼우기 쉬운가"를 생각해보세요.'
        ),
        () => makeChoice(
          '인터페이스에 의존하도록 설계했을 때의 장점은?',
          '실제 구현체를 자유롭게 교체할 수 있다(운영용/테스트용 등)', ['인터페이스는 필드를 가질 수 있어서 더 편하다', '인터페이스를 쓰면 컴파일 속도가 항상 빨라진다', '인터페이스는 상속을 대체할 수 없다'],
          '인터페이스 타입으로 의존성을 받으면, 그 인터페이스를 구현한 어떤 클래스든 자유롭게 주입할 수 있어요.',
          '"어떤 구현이든 갈아 끼울 수 있는가"가 핵심이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>void Send(string msg);</code>를 가진 <code>INotifier</code> 인터페이스에 의존하는 <code>OrderService</code> 클래스를(생성자로 INotifier를 받아 필드에 저장) 작성하세요.',
          starter: '',
          rows: 8,
          placeholder: 'class OrderService\n{\n    private readonly INotifier notifier;\n\n    public OrderService(INotifier notifier)\n    {\n        this.notifier = notifier;\n    }\n}',
          accept: ['class OrderService\n{\n    private readonly INotifier notifier;\n\n    public OrderService(INotifier notifier)\n    {\n        this.notifier = notifier;\n    }\n}'],
          why: '생성자로 INotifier를 받아 필드에 저장하면, 어떤 구현체든 외부에서 주입받을 수 있어요.',
          hint: 'public OrderService(INotifier notifier) { this.notifier = notifier; }'
        }),
      ],
      boss: () => {
        const msg = pick(['배송 시작', '결제 완료', '주문 접수']);
        return {
          type: 'blank',
          q: `<code>interface INotifier { void Send(string m); } class Fake : INotifier { public void Send(string m) => Console.WriteLine($"[FAKE] {m}"); } class S { private readonly INotifier n; public S(INotifier n) { this.n = n; } public void Run() => n.Send("${msg}"); } new S(new Fake()).Run();</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [`[FAKE] ${msg}`], placeholder: '출력 결과',
          why: `생성자로 주입된 Fake 구현체의 Send가 호출되어 "[FAKE] ${msg}"가 출력돼요.`,
          hint: '주입된 구현체(Fake)의 동작이 실행돼요.'
        };
      }
    },
    {
      id: 'unitTestingConceptCSharp',
      title: '단위 테스트(Unit Test) 개념',
      ready: true,
      summary: 'Assert 스타일로 코드가 의도대로 동작하는지 자동으로 검증하는 단위 테스트를 배워요.',
      goals: ['단위 테스트가 검증하는 것(작은 단위의 예상 동작) 이해하기', 'Arrange-Act-Assert 흐름 이해하기', 'xUnit 스타일 [Fact]와 Assert.Equal 개념 익히기'],
      blocks: [
        {
          h: '단위 테스트: 코드가 스스로 자신을 검증하게 하기',
          html: `<p><b>단위 테스트</b>는 메서드나 클래스 하나(단위)가 예상대로 동작하는지 <b>코드로 자동 검증</b>하는 테스트예요. 사람이 매번 콘솔 출력을 눈으로 확인하는 대신, 조건이 맞는지 <code>Assert</code>(단언)로 프로그램이 스스로 판정해요.</p>`,
          code: {
            label: 'Calculator.cs',
            lang: 'csharp',
            src: `class Calculator
{
    public int Add(int a, int b)
    {
        return a + b;
    }
}

// 실제 사용 코드
Calculator calc = new Calculator();
Console.WriteLine(calc.Add(2, 3));`,
            out: `5`
          }
        },
        {
          h: 'xUnit 스타일: [Fact]와 Assert',
          html: `<p>C# 생태계에서 널리 쓰이는 xUnit 같은 테스트 프레임워크는 <code>[Fact]</code> 어트리뷰트가 붙은 메서드를 테스트로 인식해 자동 실행해줘요. 보통 <b>Arrange(준비) → Act(실행) → Assert(검증)</b> 순서로 작성해요.</p>`,
          code: {
            label: 'CalculatorTests.cs',
            lang: 'csharp',
            src: `// xUnit 스타일 예시(개념 설명용)
class CalculatorTests
{
    [Fact]
    public void Add_TwoAndThree_ReturnsFive()
    {
        // Arrange
        Calculator calc = new Calculator();

        // Act
        int result = calc.Add(2, 3);

        // Assert
        Assert.Equal(5, result);
    }
}`,
            out: `(테스트 러너가 실행하면) Add_TwoAndThree_ReturnsFive 통과`
          },
          after: `<div class="note"><b>정리</b> — 단위 테스트 덕분에 코드를 수정한 뒤 "혹시 다른 부분이 망가지지 않았을까?"를 매번 손으로 확인하지 않고도, 테스트를 다시 실행해 빠르게 검증할 수 있어요. Assert.Equal(예상값, 실제값)이 다르면 테스트가 실패로 표시돼요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '단위 테스트가 하는 일로 가장 알맞은 것은?',
          '메서드/클래스 단위가 예상대로 동작하는지 코드로 자동 검증한다', ['프로그램의 UI 디자인을 자동으로 개선한다', '코드의 실행 속도를 항상 두 배로 만든다', '컴파일 오류를 자동으로 수정한다'],
          '단위 테스트는 작은 단위의 코드가 기대한 대로 동작하는지 자동으로 검증해요.',
          '"검증(테스트)한다"는 뜻 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `단위 테스트 코드 작성의 세 단계(준비-실행-검증)를 영어로 순서대로 쓰세요. (예: ___-Act-Assert)`,
          prefix: '', suffix: '-Act-Assert', accept: ['Arrange'], placeholder: '단어',
          why: 'Arrange(준비) → Act(실행) → Assert(검증) 순서로 테스트를 구성하는 게 흔한 패턴이에요.',
          hint: '"준비하다, 배치하다"라는 뜻이에요.'
        }),
        () => makeChoice(
          '<code>Assert.Equal(5, result);</code>가 하는 일은?',
          'result의 값이 5와 같은지 확인하고, 다르면 테스트를 실패시킨다', ['result에 5를 강제로 대입한다', '5와 result를 더한다', '아무 동작도 하지 않는다'],
          'Assert.Equal(예상값, 실제값)은 두 값이 같은지 확인하고, 다르면 테스트 실패로 처리해요.',
          '"같은지 단언(assert)한다"는 뜻이에요.'
        ),
        () => makeChoice(
          'xUnit 스타일에서 테스트 메서드임을 표시하는 어트리뷰트는?',
          '[Fact]', ['[Test]', '[Run]', '[Check]'],
          'xUnit에서는 <code>[Fact]</code>가 붙은 메서드를 테스트로 인식해서 자동 실행해요.',
          '"사실, 검증된 것"이라는 뜻의 단어예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Calculator</code> 클래스에 <code>public int Add(int a, int b) { return a + b; }</code> 메서드가 있다고 할 때, <code>Add(2, 3)</code>의 결과를 <code>result</code> 변수에 담고 <code>Console.WriteLine</code>으로 출력하는 코드를 작성하세요. (Arrange-Act 흐름)',
          starter: '',
          rows: 3,
          placeholder: 'Calculator calc = new Calculator();\nint result = calc.Add(2, 3);\nConsole.WriteLine(result);',
          accept: ['Calculator calc = new Calculator();\nint result = calc.Add(2, 3);\nConsole.WriteLine(result);'],
          why: 'Calculator 객체를 준비(Arrange)하고, Add를 실행(Act)한 뒤 결과를 확인해요.',
          hint: 'Calculator calc = new Calculator(); int result = calc.Add(2, 3);'
        }),
      ],
      boss: () => {
        const a = randInt(1, 20), b = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>class Calculator { public int Add(int a, int b) { return a + b; } } Calculator calc = new Calculator(); int result = calc.Add(${a}, ${b}); Console.WriteLine(result == ${a + b});</code>를 실행하면? (Assert.Equal이 통과하는지 확인하는 것과 같아요)`,
          prefix: '', suffix: '', accept: ['True'], placeholder: 'True 또는 False',
          why: `Add(${a}, ${b})의 결과는 ${a + b}이므로, 예상값과 같아 True가 출력돼요.`,
          hint: 'result와 예상값이 실제로 같은지 확인해보세요.'
        };
      }
    },
    {
      id: 'capstoneOopLinqAsync',
      title: '캡스톤: OOP + LINQ + async 종합 실습',
      ready: true,
      summary: '클래스 설계, LINQ 데이터 처리, 비동기 저장까지 하나로 합친 작은 프로그램을 만들어봐요.',
      goals: ['클래스/인터페이스로 도메인 모델 설계하기', 'LINQ로 데이터를 가공해 원하는 결과 뽑아내기', 'async/await로 결과를 비동기적으로 저장하는 흐름 이해하기'],
      blocks: [
        {
          h: '1단계: 도메인 모델과 데이터 준비',
          html: `<p>먼저 <code>record</code>로 간단한 데이터 모델을 만들고, 여러 개의 데이터를 <code>List&lt;T&gt;</code>에 담아요. 지금까지 배운 클래스/record, 컬렉션 지식이 여기서 합쳐져요.</p>`,
          code: {
            label: 'CapstoneModel.cs',
            lang: 'csharp',
            src: `record Student(string Name, int Score);

List<Student> students = new List<Student>
{
    new Student("지수", 95),
    new Student("민준", 72),
    new Student("서연", 88),
    new Student("하늘", 60),
};

Console.WriteLine(students.Count);`,
            out: `4`
          }
        },
        {
          h: '2단계: LINQ로 합격자 골라내고 정렬하기',
          html: `<p>준비된 데이터를 <code>Where</code>(80점 이상 합격자만)와 <code>OrderByDescending</code>(점수 내림차순)으로 가공해요. LINQ 메서드를 체이닝하면 "무엇을, 어떤 순서로"를 선언적으로 표현할 수 있어요.</p>`,
          code: {
            label: 'CapstoneLinq.cs',
            lang: 'csharp',
            src: `record Student(string Name, int Score);

List<Student> students = new List<Student>
{
    new Student("지수", 95),
    new Student("민준", 72),
    new Student("서연", 88),
    new Student("하늘", 60),
};

var passed = students
    .Where(s => s.Score >= 80)
    .OrderByDescending(s => s.Score)
    .ToList();

foreach (Student s in passed)
{
    Console.WriteLine($"{s.Name}: {s.Score}");
}`,
            out: `지수: 95
서연: 88`
          },
          after: `<div class="note"><b>정리</b> — Where로 조건에 맞는 것만 남기고, OrderByDescending으로 정렬한 뒤 ToList()로 확정하는 흐름은 실무 데이터 처리에서 정말 자주 쓰는 패턴이에요.</div>`
        },
        {
          h: '3단계: async로 결과를 비동기 저장하기',
          html: `<p>마지막으로, LINQ로 뽑아낸 결과를 <b>비동기적으로</b>(파일 저장이나 네트워크 전송을 흉내내어) 처리해요. <code>async Task</code> 메서드 안에서 <code>await Task.Delay</code>로 지연을 흉내내고, 완료되면 결과를 출력해요. 클래스 설계 + LINQ + async가 한 프로그램 안에서 자연스럽게 어우러져요.</p>`,
          code: {
            label: 'CapstoneAsyncSave.cs',
            lang: 'csharp',
            src: `record Student(string Name, int Score);

static async Task SaveResultsAsync(List<Student> passed)
{
    await Task.Delay(50); // 저장 작업을 흉내냄
    foreach (Student s in passed)
    {
        Console.WriteLine($"저장됨: {s.Name} ({s.Score}점)");
    }
}

List<Student> students = new List<Student>
{
    new Student("지수", 95),
    new Student("민준", 72),
    new Student("서연", 88),
    new Student("하늘", 60),
};

var passed = students
    .Where(s => s.Score >= 80)
    .OrderByDescending(s => s.Score)
    .ToList();

await SaveResultsAsync(passed);
Console.WriteLine("모든 처리 완료");`,
            out: `저장됨: 지수 (95점)
저장됨: 서연 (88점)
모든 처리 완료`
          },
          after: `<div class="note"><b>정리</b> — 이 캡스톤은 클래스/record로 데이터를 표현하고(OOP), LINQ로 원하는 데이터만 가공하고(함수형 스타일), async/await로 시간이 걸리는 작업을 처리하는(비동기) 세 가지 축을 하나로 합친 예시예요. 실제 백엔드 서비스 코드도 이 세 가지가 늘 함께 쓰여요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const scores = [randInt(80, 100), randInt(60, 79), randInt(80, 100), randInt(60, 79)];
          const names = ['지수', '민준', '서연', '하늘'];
          const passedList = names.map((n, i) => ({ n, s: scores[i] })).filter(x => x.s >= 80).sort((a, b) => b.s - a.s);
          return {
            type: 'blank',
            q: `<code>List<Student> students = new List<Student> { ${names.map((n, i) => `new Student("${n}", ${scores[i]})`).join(', ')} }; var passed = students.Where(s => s.Score >= 80).OrderByDescending(s => s.Score).ToList(); Console.WriteLine(passed.Count);</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(passedList.length)], placeholder: '숫자',
            why: `80점 이상인 학생은 ${passedList.length}명이에요.`,
            hint: '80점 이상인 학생 수를 세어보세요.'
          };
        },
        () => makeChoice(
          '이 캡스톤 프로그램에서 "합격자만 골라 점수 내림차순으로 정렬"하는 데 사용된 두 LINQ 메서드는?',
          'Where와 OrderByDescending', ['Select와 GroupBy', 'Aggregate와 Sum', 'First와 Last'],
          'Where(조건)로 걸러내고 OrderByDescending(기준)으로 내림차순 정렬했어요.',
          '"조건으로 거르기"와 "내림차순 정렬"에 해당하는 메서드를 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `저장 작업을 비동기로 흉내내기 위해 <code>await Task.___(50);</code>로 지연을 주는 메서드를 쓰세요.`,
          prefix: 'await Task.', suffix: '(50);', accept: ['Delay'], placeholder: '메서드 이름',
          why: '<code>Task.Delay(ms)</code>는 실제 스레드를 막지 않고 지정한 시간만큼 비동기로 기다려요.',
          hint: '"지연시키다"라는 뜻이에요.'
        }),
        () => makeChoice(
          '이 캡스톤이 통합적으로 보여주는 세 가지 축으로 가장 알맞은 것은?',
          '객체지향(record/클래스), 함수형 데이터 처리(LINQ), 비동기 프로그래밍(async/await)', ['오직 반복문과 조건문뿐이다', 'GUI 디자인, 애니메이션, 사운드', '게임 물리 엔진과 충돌 처리'],
          'record로 데이터를 모델링하고, LINQ로 가공하고, async/await로 저장 흐름을 처리하는 세 축이 함께 쓰였어요.',
          '지금까지 배운 큰 주제들을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>record Student(string Name, int Score);</code>와 학생 리스트가 있다고 할 때, <code>Where</code>로 70점 이상만 걸러 <code>foreach</code>로 <code>Name</code>을 출력하는 코드를 작성하세요. (리스트 변수명 students)',
          starter: '',
          rows: 5,
          placeholder: 'var passed = students.Where(s => s.Score >= 70);\nforeach (Student s in passed)\n{\n    Console.WriteLine(s.Name);\n}',
          accept: ['var passed = students.Where(s => s.Score >= 70);\nforeach (Student s in passed)\n{\n    Console.WriteLine(s.Name);\n}'],
          why: 'Where(s => s.Score >= 70)로 70점 이상만 걸러낸 뒤 각 이름을 출력해요.',
          hint: 'students.Where(s => s.Score >= 70)'
        }),
      ],
      boss: () => {
        const scores = [randInt(85, 100), randInt(50, 69), randInt(70, 84)];
        const names = ['지수', '민준', '서연'];
        const top = names.map((n, i) => ({ n, s: scores[i] })).sort((a, b) => b.s - a.s)[0];
        return {
          type: 'blank',
          q: `<code>List<Student> students = new List<Student> { ${names.map((n, i) => `new Student("${n}", ${scores[i]})`).join(', ')} }; var top = students.OrderByDescending(s => s.Score).First(); Console.WriteLine($"{top.Name}: {top.Score}");</code>를 실행하면? (형식: 이름: 점수)`,
          prefix: '', suffix: '', accept: [`${top.n}: ${top.s}`], placeholder: '출력 결과',
          why: `가장 높은 점수는 ${top.n}의 ${top.s}점이에요.`,
          hint: '점수가 가장 높은 학생을 찾아보세요.'
        };
      }
    }],
    tierBoss: {
      beginner: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        return {
          type: 'code',
          q: `<code>name</code>(문자열, "${name}")과 <code>age</code>(정수, ${age})를 변수로 선언하고, <code>age</code>가 18 이상이면 "성인", 아니면 "미성년자"를 출력하는 프로그램을 <code>Main</code> 안에 작성하세요.`,
          starter: '',
          rows: 10,
          placeholder: `using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string name = "${name}";\n        int age = ${age};\n        if (age >= 18)\n        {\n            Console.WriteLine("성인");\n        }\n        else\n        {\n            Console.WriteLine("미성년자");\n        }\n    }\n}`,
          accept: [`using System;\n\nclass Program\n{\n    static void Main()\n    {\n        string name = "${name}";\n        int age = ${age};\n        if (age >= 18)\n        {\n            Console.WriteLine("성인");\n        }\n        else\n        {\n            Console.WriteLine("미성년자");\n        }\n    }\n}`],
          why: '변수를 선언하고, if/else로 조건에 따라 다른 결과를 출력해요.',
          hint: 'string name = ...; int age = ...; 다음 if (age >= 18) { ... } else { ... }'
        };
      },
      intermediate: () => ({
        type: 'code',
        q: '<code>List<int></code>를 받아, 짝수만 골라 각 값을 제곱한 뒤 합을 반환하는 메서드 <code>static int SumOfEvenSquares(List<int> nums)</code>를 LINQ의 <code>Where</code>, <code>Select</code>, <code>Sum</code>을 이용해 작성하세요.',
        starter: '',
        rows: 4,
        placeholder: 'static int SumOfEvenSquares(List<int> nums)\n{\n    return nums.Where(n => n % 2 == 0).Select(n => n * n).Sum();\n}',
        accept: ['static int SumOfEvenSquares(List<int> nums)\n{\n    return nums.Where(n => n % 2 == 0).Select(n => n * n).Sum();\n}'],
        why: 'Where로 짝수만 남기고, Select로 제곱한 뒤, Sum으로 모두 더해요.',
        hint: 'nums.Where(n => n % 2 == 0).Select(n => n * n).Sum()'
      }),
      advanced: () => ({
        type: 'code',
        q: '<code>double Area();</code>를 요구하는 인터페이스 <code>IShape</code>를 정의하고, <code>Width</code>, <code>Height</code>(둘 다 double) 필드를 가진 <code>Rectangle</code> 클래스가 이를 구현(<code>Area</code>는 Width * Height)하도록 작성하세요.',
        starter: '',
        rows: 10,
        placeholder: 'interface IShape\n{\n    double Area();\n}\n\nclass Rectangle : IShape\n{\n    public double Width;\n    public double Height;\n\n    public double Area()\n    {\n        return Width * Height;\n    }\n}',
        accept: ['interface IShape\n{\n    double Area();\n}\n\nclass Rectangle : IShape\n{\n    public double Width;\n    public double Height;\n\n    public double Area()\n    {\n        return Width * Height;\n    }\n}'],
        why: 'interface로 요구 사항을 정의하고, class Rectangle : IShape로 실제 구현을 채워 넣어요.',
        hint: 'interface IShape { double Area(); } 다음 class Rectangle : IShape { ... public double Area() { return Width * Height; } }'
      }),
    }
};
