/* C++ 강의·문제 데이터 — 단원을 추가하려면 units 배열에 항목을 넣으면 됩니다. */
COURSES.cpp = {
    name: 'C++',
    tagline: '게임, 시스템 프로그래밍, 코딩 테스트에서 여전히 강력한, C에 객체지향과 STL을 더한 언어',
    units: [{
      id: 'intro',
      title: 'C++는 어떤 언어인가요?',
      ready: true,
      intro: true,
      summary: 'C++가 무엇이고, C와 뭐가 다르고, 어디에 쓰이는지 알아봐요.',
      blocks: [
        {
          h: 'C++는 어떤 언어인가요?',
          html: `<p>C++는 1985년, C 언어에 객체지향 프로그래밍과 다양한 고급 기능을 더해 만들어진 언어예요. C의 빠른 성능은 그대로 유지하면서, 더 편리한 문법과 도구(STL, 스마트 포인터 등)를 제공해요.</p>`
        },
        {
          h: '어디에 쓰이나요?',
          html: `<p>언리얼 엔진 같은 게임 엔진, 초고속 처리가 필요한 금융 거래 시스템, 임베디드 소프트웨어, 그리고 코딩 대회(경쟁 프로그래밍)에서 지금도 표준으로 쓰여요.</p>`
        },
        {
          h: '왜 배우면 좋을까요?',
          html: `<p>배우기 어렵기로 유명하지만, 그만큼 "실행 속도"와 "세밀한 제어"가 동시에 필요한 분야에서 대체하기 어려운 선택지예요. C를 이미 안다면 객체지향·템플릿·표준 라이브러리 같은 새로운 무기를 추가로 얻는 셈이에요.</p>`,
          after: `<div class="note"><b>팁</b> — 이 단원은 읽기만 하면 되고, 문제나 예제는 없어요. 다음 단원부터 진짜 코드를 써보기 시작해요!</div>`
        }
      ]
    },
    {
      id: 'helloAndCompile',
      title: 'C++ 시작하기 — 컴파일과 첫 프로그램',
      ready: true,
      summary: 'C++ 코드가 실행 파일이 되는 과정을 알아보고, iostream으로 화면에 글자를 출력해요.',
      goals: ['#include와 iostream', 'std::cout으로 출력하기', '컴파일 과정 이해'],
      blocks: [
        {
          h: 'C++는 어떻게 실행될까요?',
          html: `<p>파이썬이나 자바스크립트는 코드를 바로 한 줄씩 실행하지만, C++는 C처럼 <b>컴파일</b>이 필요해요. 사람이 쓴 <code>.cpp</code> 소스 코드를 컴파일러가 기계어로 번역하고, 여러 파일을 하나로 합치는 <b>링크</b> 과정을 거쳐야 실행 파일이 만들어져요.</p>
                 <p>C++는 C의 문법을 대부분 그대로 이어받으면서, <b>클래스(객체지향)</b>, <b>템플릿</b>, <b>STL(표준 템플릿 라이브러리)</b> 같은 강력한 도구를 더한 언어예요. 이 강좌에서는 C와 겹치는 기초 문법은 빠르게 훑고, C++만의 특징에 집중해요.</p>`,
          code: {
            label: 'hello.cpp',
            lang: 'cpp',
            src: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    std::cout << "C++를 시작해봐요!\\n";
    return 0;
}`,
            out: `Hello, World!\nC++를 시작해봐요!`
          }
        },
        {
          h: 'std::cout과 <<',
          html: `<p><code>std::cout</code>은 화면(표준 출력)에 값을 내보내는 객체예요. <code><<</code> 연산자로 출력할 값을 이어붙일 수 있고, <code>std::endl</code>은 줄바꿈을 하면서 출력 버퍼도 비워줘요. 그냥 줄바꿈만 하고 싶다면 문자열 안에 <code>\\n</code>을 써도 충분해요.</p>
                 <p><code>std::</code>는 "표준 라이브러리(std 네임스페이스) 안에 있는 것"이라는 뜻이에요.</p>`,
          code: {
            label: 'using_std.cpp',
            lang: 'cpp',
            src: `using namespace std;

int main() {
    cout << "std::를 매번 안 써도 돼요!" << endl;
    return 0;
}`,
            out: `std::를 매번 안 써도 돼요!`
          },
          after: `<div class="note"><b>주의</b> — <code>using namespace std;</code>는 작은 예제에서는 편하지만, 큰 프로젝트나 헤더 파일에서는 이름이 겹칠 위험이 있어서 <code>std::cout</code>처럼 꼬박꼬박 쓰는 걸 권장해요. 이 강좌에서는 두 방식을 상황에 맞게 섞어서 보여줄게요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>std::cout</code>과 <code>std::cin</code>을 쓰기 위해 맨 위에 포함(include)해야 하는 헤더 이름을 &lt;&gt; 없이 쓰세요.`,
          prefix: '#include <', suffix: '>', accept: ['iostream'], placeholder: '헤더 이름',
          why: '입출력 스트림 기능은 <code>&lt;iostream&gt;</code> 헤더에 들어있어요.',
          hint: '"입출력 스트림"이라는 뜻의 영단어 조합이에요.'
        }),
        () => makeChoice(
          '<code>std::cout << "안녕";</code>이 하는 일로 옳은 것은?',
          '화면에 "안녕"을 출력한다', ['키보드로 값을 입력받는다', '파일을 연다', '변수를 선언한다'],
          '<code>cout</code>은 표준 출력(화면)으로 값을 내보내는 객체예요.',
          '"out"이 들어간 이름이라는 걸 떠올려보세요.'
        ),
        () => {
          const word = pick(['안녕', '반가워요', 'C++']);
          return {
            type: 'blank',
            q: `<code>std::cout << "${word}" << std::endl;</code>과 똑같은 결과를 내려면, <code>std::endl</code> 대신 문자열 끝에 어떤 두 글자를 붙이면 될까요? (예: \\n)`,
            prefix: '', suffix: '', accept: ['\\n'], placeholder: '\\n',
            why: '<code>std::endl</code>은 줄바꿈 + 버퍼 비우기를 하는데, 단순 줄바꿈만 필요하면 <code>\\n</code>으로 충분해요.',
            hint: '역슬래시와 소문자 n이에요.'
          };
        },
        () => makeChoice(
          '<code>using namespace std;</code>를 쓰지 않았을 때 <code>cout</code> 대신 써야 하는 것은?',
          'std::cout', ['std.cout', 'cout::std', 'std->cout'],
          '네임스페이스 안의 이름을 쓸 때는 <code>::</code>(범위 지정 연산자)를 써서 <code>std::cout</code>처럼 접근해요.',
          '콜론 두 개를 쓰는 연산자예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>std::cout</code>을 이용해 "안녕하세요"를 출력하고 줄바꿈까지 하는 한 줄 코드를 작성하세요. (std::endl 사용)',
          starter: '',
          placeholder: 'std::cout << "안녕하세요" << std::endl;',
          accept: ['std::cout << "안녕하세요" << std::endl;'],
          why: '<code>std::cout << 값 << std::endl;</code> 형태로 출력하고 줄을 바꿔요.',
          hint: 'cout 뒤에 << 로 문자열과 endl을 이어붙이세요.'
        }),
      ],
      boss: () => {
        const a = pick(['C++', '코딩', '컴파일']);
        const b = pick(['재미있어요', '어렵지 않아요', '흥미로워요']);
        return {
          type: 'blank',
          q: `<code>std::cout << "${a}" << std::endl; std::cout << "${b}";</code>를 실행하면 무엇이 출력될까요? (두 줄, 줄바꿈은 엔터로 표시)`,
          prefix: '', suffix: '', accept: [`${a}\n${b}`], placeholder: '출력 결과',
          why: `첫 줄은 <code>std::endl</code>로 줄바꿈되어 "${a}"가 출력되고, 이어서 "${b}"가 출력돼요.`,
          hint: 'endl은 줄바꿈을 만들어요.'
        };
      }
    },
    {
      id: 'variablesAndTypes',
      title: '변수와 기본 자료형',
      ready: true,
      summary: 'int, double, char, bool 등 C++의 기본 자료형과 변수 선언 방법을 배워요.',
      goals: ['기본 자료형 (int/double/char/bool)', 'auto 없이 명시적 타입 선언', '초기화 문법 종류'],
      blocks: [
        {
          h: 'C++의 기본 자료형',
          html: `<p>C++의 기본 자료형은 C와 거의 같아요: <code>int</code>(정수), <code>double</code>(실수, float보다 정밀함), <code>char</code>(문자 1개), <code>bool</code>(참/거짓). C++는 C와 달리 <b>진짜 boolean 타입</b>이 있어서 <code>true</code>/<code>false</code>를 그대로 쓸 수 있어요.</p>`,
          code: {
            label: 'types.cpp',
            lang: 'cpp',
            src: `int age = 17;
double height = 165.3;
char grade = 'A';
bool isStudent = true;

std::cout << age << " " << height << " " << grade << " " << isStudent << std::endl;`,
            out: `17 165.3 A 1`
          },
          after: `<div class="note"><b>주의</b> — <code>std::cout</code>으로 <code>bool</code>을 출력하면 <code>true</code>/<code>false</code>가 아니라 <code>1</code>/<code>0</code>으로 나와요. 글자로 보고 싶다면 <code>std::boolalpha</code>를 쓸 수 있어요.</div>`
        },
        {
          h: '변수를 초기화하는 여러 방법',
          html: `<p>C++는 변수를 초기화하는 문법이 여러 가지예요: <code>int x = 10;</code>(C 스타일), <code>int x(10);</code>(생성자 스타일), <code>int x{10};</code>(중괄호 초기화, C++11부터). 중괄호 초기화는 <b>타입이 좁아지는 실수</b>(예: double을 int에 넣기)를 컴파일 단계에서 막아준다는 장점이 있어요.</p>`,
          code: {
            label: 'init_styles.cpp',
            lang: 'cpp',
            src: `int a = 10;
int b(10);
int c{10};
std::cout << a << " " << b << " " << c << std::endl;`,
            out: `10 10 10`
          }
        }
      ],
      quizGenerators: [
        () => {
          const kinds = [
            { desc: '정수', type: 'int', ex: String(randInt(1, 999)) },
            { desc: '실수', type: 'double', ex: `${randInt(1, 99)}.${randInt(1, 9)}` },
            { desc: '참/거짓', type: 'bool', ex: pick(['true', 'false']) },
            { desc: '문자 하나', type: 'char', ex: `'${pick(['A', 'b', 'Z'])}'` },
          ];
          const it = pick(kinds);
          const others = ['int', 'double', 'bool', 'char'].filter(t => t !== it.type);
          return makeChoice(
            `${it.desc} 값 <code>${it.ex}</code>을(를) 담기에 알맞은 자료형은?`,
            it.type, others,
            `${it.desc} 값은 <code>${it.type}</code>에 담아요.`,
            'int/double/bool/char 네 가지 중 하나예요.'
          );
        },
        () => makeChoice(
          '다음 중 C와 달리 C++에서 그대로 쓸 수 있는 진짜 자료형은?',
          'bool', ['integer', 'boolean', 'string(기본 자료형으로)'],
          'C++는 <code>bool</code>이라는 실제 자료형이 있어서 <code>true</code>/<code>false</code>를 바로 쓸 수 있어요.',
          'C에는 없던 자료형이에요.'
        ),
        () => {
          const n = randInt(1, 9);
          return {
            type: 'blank',
            q: `<code>int c{${n}};</code>처럼 중괄호로 변수를 초기화하는 문법의 이름은 "OO 초기화"라고 불러요. OO에 들어갈 두 글자는? (한글로)`,
            prefix: '', suffix: ' 초기화', accept: ['중괄호'], placeholder: '중괄호',
            why: '<code>{ }</code>를 쓰는 초기화 방식을 중괄호 초기화(brace initialization)라고 해요.',
            hint: '{ } 이 기호의 이름이에요.'
          };
        },
        () => makeChoice(
          '중괄호 초기화(<code>int x{3.5};</code>처럼 실수를 int에 넣는 경우)의 장점은?',
          '타입이 좁아지는 실수를 컴파일 단계에서 막아준다', ['실행 속도가 항상 더 빠르다', '메모리를 아낀다', '더 짧게 쓸 수 있다(글자 수가 항상 적다)'],
          '중괄호 초기화는 값이 손실될 수 있는 대입(narrowing conversion)을 컴파일 오류로 잡아줘요.',
          '"안전성"과 관련된 장점이에요.'
        ),
        () => ({
          type: 'code',
          q: '정수 25를 담는 변수 age와, 참 값을 담는 변수 isReady를 각각 선언하는 두 줄을 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'int age = 25;\nbool isReady = true;',
          accept: ['int age = 25;\nbool isReady = true;'],
          why: '정수는 <code>int</code>, 참/거짓은 <code>bool</code>로 선언해요.',
          hint: 'int age = 25; 다음 줄에 bool isReady = true;'
        }),
      ],
      boss: () => {
        const age = randInt(10, 99);
        const height = `${randInt(150, 190)}.${randInt(1, 9)}`;
        return {
          type: 'blank',
          q: `<code>int age = ${age}; double height = ${height}; bool isAdult = age >= 20; std::cout << age << " " << height << " " << isAdult;</code>를 실행하면? (공백으로 구분해서 그대로)`,
          prefix: '', suffix: '', accept: [`${age} ${height} ${age >= 20 ? 1 : 0}`], placeholder: '출력 결과',
          why: `bool 값은 출력될 때 true는 1, false는 0으로 나와요. age(${age})가 20 이상인지에 따라 결과가 정해져요.`,
          hint: 'bool은 화면에 1 또는 0으로 보여요.'
        };
      }
    },
    {
      id: 'stdStringBasics',
      title: 'std::string — C++의 문자열',
      ready: true,
      summary: 'C 스타일 문자 배열 대신, 훨씬 다루기 쉬운 std::string으로 문자열을 다뤄요.',
      goals: ['std::string 선언과 대입', '문자열 이어붙이기(+)', 'length()/size(), 인덱싱'],
      blocks: [
        {
          h: 'C 스타일 문자열의 불편함',
          html: `<p>C는 문자열을 <code>char</code> 배열로 표현해서, 길이를 직접 관리하고 <code>strcpy</code>/<code>strcat</code> 같은 함수를 조심스럽게 써야 했어요. C++는 <code>&lt;string&gt;</code> 헤더의 <code>std::string</code> 클래스로 이런 번거로움을 없앴어요.</p>`,
          code: {
            label: 'strings.cpp',
            lang: 'cpp',
            src: `#include <iostream>
#include <string>

int main() {
    std::string name = "지수";
    std::string greeting = "안녕하세요, " + name + "님!";
    std::cout << greeting << std::endl;
    std::cout << "길이: " << greeting.length() << std::endl;
    return 0;
}`,
            out: `안녕하세요, 지수님!\n길이: 22`
          }
        },
        {
          h: '문자열 다루기: 인덱싱과 substr',
          html: `<p><code>std::string</code>은 배열처럼 <code>[]</code>로 각 글자에 접근할 수 있고, <code>substr(시작, 길이)</code>로 부분 문자열을 잘라낼 수 있어요.</p>`,
          code: {
            label: 'substr.cpp',
            lang: 'cpp',
            src: `std::string word = "Hello";
std::cout << word[0] << std::endl;        // H
std::cout << word.substr(1, 3) << std::endl; // ell`,
            out: `H\nell`
          },
          after: `<div class="note"><b>참고</b> — <code>std::string</code>은 한글처럼 여러 바이트로 이루어진 문자(UTF-8)를 다룰 때는 <code>length()</code>가 "바이트 수"를 센다는 점에 주의하세요. 영문 글자 수와는 다를 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = pick(['안녕', '반가워', '좋은 아침']);
          const b = pick(['하세요', '요', '입니다']);
          return {
            type: 'blank',
            q: `<code>std::string s = "${a}" + std::string("${b}"); std::cout << s;</code>의 출력은?`,
            prefix: '', suffix: '', accept: [`${a}${b}`], placeholder: '출력 결과',
            why: '<code>+</code>는 두 std::string을 이어붙여요.',
            hint: '두 문자열을 그대로 붙이면 돼요.'
          };
        },
        () => makeChoice(
          'C 스타일 char 배열 대신 std::string을 쓰는 이유로 알맞은 것은?',
          '길이 관리와 이어붙이기 등을 훨씬 안전하고 편하게 할 수 있어서', ['C++에서는 char 배열을 아예 쓸 수 없어서', 'std::string이 항상 메모리를 더 적게 써서', '문자열을 쓸 때 항상 반드시 std::string을 써야 해서(문법 강제)'],
          'std::string은 길이 계산, 이어붙이기, 비교 등을 멤버 함수로 안전하게 제공해줘요.',
          '"편의성과 안전성"에 대한 이유예요.'
        ),
        () => {
          const s = pick(['Hello', 'World', 'Coding']);
          return {
            type: 'blank',
            q: `<code>std::string s = "${s}"; std::cout << s.length();</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(s.length)], placeholder: '숫자',
            why: `"${s}"의 글자 수는 ${s.length}개예요.`,
            hint: 'length()는 문자열의 글자 수를 세줘요.'
          };
        },
        () => makeChoice(
          '<code>std::string word = "Coding"; word.substr(1, 3);</code>의 결과는?',
          '"odi"', ['"Cod"', '"ing"', '"Codi"'],
          'substr(시작 인덱스, 길이)이므로 인덱스 1부터 3글자인 "odi"가 나와요.',
          'C도 마찬가지로 인덱스는 0부터 시작해요.'
        ),
        () => ({
          type: 'code',
          q: 'std::string 타입 변수 name에 "민준"을 대입하고, std::cout으로 출력하는 두 줄을 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'std::string name = "민준";\nstd::cout << name;',
          accept: ['std::string name = "민준";\nstd::cout << name;'],
          why: 'std::string 변수를 선언하고 std::cout으로 출력해요.',
          hint: 'std::string name = "민준"; 다음 std::cout << name;'
        }),
      ],
      boss: () => {
        const first = pick(['김', '이', '박']);
        const rest = pick(['민준', '서연', '지호']);
        return {
          type: 'blank',
          q: `<code>std::string first = "${first}"; std::string rest = "${rest}"; std::string full = first + rest; std::cout << full << " (" << full.length() << ")";</code>를 실행하면? (형식: 이름 (숫자))`,
          prefix: '', suffix: '', accept: [`${first}${rest} (${(first + rest).length})`], placeholder: '출력 결과',
          why: `문자열을 이어붙인 뒤 length()로 글자(바이트) 수를 함께 출력해요.`,
          hint: '이어붙인 문자열과 그 길이를 순서대로 출력해요.'
        };
      }
    },
    {
      id: 'ioStreamCinCout',
      title: '입력받기 — std::cin',
      ready: true,
      summary: 'std::cin으로 키보드 입력을 변수에 저장하는 방법을 배워요.',
      goals: ['std::cin >> 변수', '여러 값 한 번에 입력받기', 'cin과 getline의 차이'],
      blocks: [
        {
          h: 'std::cin으로 값 입력받기',
          html: `<p><code>std::cin >> 변수;</code>는 키보드로 입력한 값을 읽어서 변수에 저장해요. <code>>></code> 화살표가 "입력이 변수 쪽으로 흘러 들어간다"는 방향을 나타내요.</p>`,
          code: {
            label: 'input.cpp',
            lang: 'cpp',
            src: `int age;
std::cout << "나이를 입력하세요: ";
std::cin >> age;
std::cout << "당신은 " << age << "살이군요!" << std::endl;`,
            out: `나이를 입력하세요: (입력값에 따라 달라짐)`
          }
        },
        {
          h: '여러 값을 한 번에, 그리고 문장은 getline으로',
          html: `<p><code>std::cin >> a >> b;</code>처럼 <code>>></code>를 이어 쓰면 공백으로 구분된 여러 값을 한 번에 입력받을 수 있어요. 다만 <code>cin >></code>은 <b>공백에서 멈추기</b> 때문에, 띄어쓰기가 있는 문장 전체를 받으려면 <code>std::getline(std::cin, 변수)</code>를 써야 해요.</p>`,
          code: {
            label: 'getline.cpp',
            lang: 'cpp',
            src: `std::string fullLine;
std::cout << "한 줄 문장을 입력하세요: ";
std::cin.ignore(); // 이전 입력의 남은 개행 문자 제거
std::getline(std::cin, fullLine);
std::cout << "입력한 문장: " << fullLine << std::endl;`,
            out: `한 줄 문장을 입력하세요: (입력값에 따라 달라짐)`
          },
          after: `<div class="note"><b>참고</b> — 이 강좌의 실습장은 브라우저에서 동작해서 실제 키보드 입력은 받지 않지만, 실제 C++ 프로그램에서는 이렇게 <code>cin</code>과 <code>getline</code>으로 사용자 입력을 받아요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>std::cin >> age;</code>가 하는 일은?',
          '키보드로 입력받은 값을 age 변수에 저장한다', ['age 변수의 값을 화면에 출력한다', 'age 변수를 삭제한다', 'age를 항상 0으로 만든다'],
          '<code>cin >></code>은 입력을 읽어서 오른쪽 변수에 저장해요.',
          '화살표 방향이 "입력 → 변수"예요.'
        ),
        () => makeChoice(
          '띄어쓰기가 포함된 문장 전체를 한 줄로 입력받고 싶을 때 알맞은 방법은?',
          'std::getline(std::cin, 변수)', ['std::cin >> 변수', 'std::cout << 변수', 'std::cin.skip(변수)'],
          '<code>cin >></code>은 공백에서 멈추기 때문에, 문장 전체는 <code>getline</code>으로 받아야 해요.',
          '"한 줄을 얻는다"는 뜻의 함수 이름이에요.'
        ),
        () => {
          const a = randInt(1, 50), b = randInt(1, 50);
          return {
            type: 'blank',
            q: `<code>int a, b; std::cin >> a >> b;</code>에서 입력으로 "${a} ${b}"를 넣으면, <code>a + b</code>의 값은?`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `공백으로 구분된 두 값이 순서대로 a, b에 들어가요. ${a} + ${b} = ${a + b}`,
            hint: '앞의 숫자가 a, 뒤의 숫자가 b예요.'
          };
        },
        () => makeChoice(
          '<code>std::cin >></code>과 <code>std::getline</code>의 차이로 옳은 것은?',
          'cin >>은 공백에서 멈추지만, getline은 줄바꿈 전까지 공백을 포함해 모두 읽는다', ['둘은 완전히 같다', 'getline은 숫자만 읽을 수 있다', 'cin >>은 파일에서만 쓸 수 있다'],
          'cin >>은 공백/개행에서 멈추고, getline은 개행 전까지 공백 포함 한 줄 전체를 읽어요.',
          '"단어 단위" vs "줄 단위"로 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '정수를 담을 변수 score를 선언하고, std::cin으로 값을 입력받는 두 줄을 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'int score;\nstd::cin >> score;',
          accept: ['int score;\nstd::cin >> score;'],
          why: '변수를 먼저 선언한 뒤 cin >>으로 값을 채워 넣어요.',
          hint: 'int score; 다음 줄에 std::cin >> score;'
        }),
      ],
      boss: () => {
        const w = randInt(1, 100), h = randInt(1, 100);
        return {
          type: 'blank',
          q: `<code>int w, h; std::cin >> w >> h; std::cout << (w * h);</code>에서 입력으로 "${w} ${h}"를 주면 출력은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(w * h)], placeholder: '숫자',
          why: `w에는 ${w}, h에는 ${h}가 들어가고 그 곱은 ${w * h}예요.`,
          hint: '두 수를 순서대로 곱해보세요.'
        };
      }
    },
    {
      id: 'constAndReferences',
      title: 'const와 참조(&) 맛보기',
      ready: true,
      summary: '값이 바뀌지 않게 막는 const와, 변수의 또 다른 이름인 참조(&)를 배워요.',
      goals: ['const로 상수 만들기', '참조(&)란 무엇인가', '참조와 원본 변수의 관계'],
      blocks: [
        {
          h: 'const — 바뀌면 안 되는 값',
          html: `<p><code>const</code>를 붙인 변수는 처음 값을 정한 뒤 다시는 바꿀 수 없어요. 바꾸려고 하면 컴파일 오류가 나기 때문에, "이 값은 절대 바뀌면 안 된다"는 의도를 컴파일러가 지켜줘요.</p>`,
          code: {
            label: 'const_demo.cpp',
            lang: 'cpp',
            src: `const double PI = 3.14159;
std::cout << PI << std::endl;
// PI = 3.0;  // 오류! const 변수는 다시 대입할 수 없어요`,
            out: `3.14159`
          }
        },
        {
          h: '참조(&) — 변수의 또 다른 이름',
          html: `<p>C++만의 특별한 개념인 <b>참조(reference)</b>는 이미 있는 변수에 <b>별명</b>을 붙이는 것과 같아요. <code>int& ref = original;</code>처럼 선언하면, <code>ref</code>는 <code>original</code>과 완전히 같은 메모리를 가리켜서 둘 중 하나를 바꾸면 다른 하나도 같이 바뀐 것처럼 보여요.</p>`,
          code: {
            label: 'refs.cpp',
            lang: 'cpp',
            src: `int original = 10;
int& ref = original;
ref = 20;
std::cout << original << std::endl; // 20 (원본도 바뀜)`,
            out: `20`
          },
          after: `<div class="note"><b>포인터와 헷갈리지 마세요</b> — 참조는 포인터와 달리 <code>*</code>로 역참조할 필요 없이 원본처럼 바로 쓸 수 있고, 한 번 정해지면 다른 변수를 가리키도록 바꿀 수 없어요. 뒤에서 참조와 포인터를 자세히 비교해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>const int MAX = 100;</code> 다음에 <code>MAX = 200;</code>을 실행하면?',
          '컴파일 오류가 난다', ['MAX가 200으로 바뀐다', 'MAX가 100과 200 둘 다 된다', '아무 일도 일어나지 않는다'],
          'const로 선언한 변수는 값을 다시 대입할 수 없어서 컴파일 오류가 나요.',
          'const는 "상수(바뀌지 않음)"라는 뜻이에요.'
        ),
        () => {
          const n = randInt(1, 100);
          return {
            type: 'blank',
            q: `<code>int a = ${n}; int& b = a; b = ${n + 5};</code>를 실행한 뒤 <code>std::cout << a;</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n + 5)], placeholder: '숫자',
            why: `b는 a의 참조(별명)라서, b를 바꾸면 a도 똑같이 바뀌어요. 그래서 ${n + 5}가 출력돼요.`,
            hint: '참조는 원본과 같은 메모리를 가리켜요.'
          };
        },
        () => makeChoice(
          '참조(reference)에 대한 설명으로 옳은 것은?',
          '이미 있는 변수에 붙이는 또 다른 이름(별명)이다', ['새로운 메모리 공간을 항상 따로 만든다', '반드시 *로 값에 접근해야 한다', '한 번 정한 뒤에도 다른 변수를 다시 가리키도록 바꿀 수 있다'],
          '참조는 기존 변수의 별명이라서 같은 메모리를 공유해요.',
          '포인터와 다르게 "별명"이라는 개념으로 이해하세요.'
        ),
        () => makeChoice(
          '<code>int& r = x;</code>로 선언한 뒤 <code>r</code>이 다른 변수를 가리키도록 바꿀 수 있는가?',
          '없다 — 참조는 처음 정한 대상을 계속 가리킨다', ['있다 — 언제든 자유롭게 바꿀 수 있다', '있다 — 하지만 한 번만 바꿀 수 있다', '조건에 따라 다르다'],
          '참조는 선언 시점에 가리킬 대상이 고정되고, 이후에는 바꿀 수 없어요.',
          '포인터는 다른 곳을 가리키도록 재대입할 수 있지만, 참조는 그럴 수 없어요.'
        ),
        () => ({
          type: 'code',
          q: '변경되지 않는 실수 상수 TAX_RATE에 0.1을 담아 선언하는 한 줄을 작성하세요.',
          starter: '',
          placeholder: 'const double TAX_RATE = 0.1;',
          accept: ['const double TAX_RATE = 0.1;'],
          why: 'const를 자료형 앞에 붙여서 값이 바뀌지 않는 변수를 만들어요.',
          hint: 'const double 이름 = 값;'
        }),
      ],
      boss: () => {
        const n = randInt(10, 50);
        return {
          type: 'blank',
          q: `<code>int score = ${n}; int& refScore = score; refScore += 10; score *= 2; std::cout << refScore;</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String((n + 10) * 2)], placeholder: '숫자',
          why: `refScore는 score의 참조라서 같은 값을 공유해요. ${n} + 10 = ${n + 10}, 그다음 *2를 하면 ${(n + 10) * 2}예요.`,
          hint: '참조는 원본과 완전히 같은 값을 가져요. 순서대로 계산해보세요.'
        };
      }
    },
    {
      id: 'ifElseSwitch',
      title: '조건문 — if/else와 switch',
      ready: true,
      summary: 'C와 비슷한 if/else에 더해, 여러 경우를 깔끔하게 나누는 switch문을 배워요.',
      goals: ['if / else if / else', '비교·논리 연산자(&&, ||, !)', 'switch / case / break'],
      blocks: [
        {
          h: 'if / else — C와 거의 같아요',
          html: `<p>C++의 조건문은 C와 문법이 거의 같아요. 다만 조건식 결과가 진짜 <code>bool</code>(true/false)이라는 점이 달라요.</p>`,
          code: {
            label: 'if_else.cpp',
            lang: 'cpp',
            src: `int age = 17;
if (age >= 20) {
    std::cout << "성인이에요" << std::endl;
} else if (age >= 13) {
    std::cout << "청소년이에요" << std::endl;
} else {
    std::cout << "어린이예요" << std::endl;
}`,
            out: `청소년이에요`
          }
        },
        {
          h: 'switch — 여러 경우를 깔끔하게',
          html: `<p>하나의 값에 따라 여러 경우로 나뉠 때는 <code>switch</code>가 <code>if/else</code>보다 읽기 편해요. 각 <code>case</code> 끝에 <code>break;</code>를 빼먹으면 다음 case까지 이어서 실행되니(fall-through) 주의하세요.</p>`,
          code: {
            label: 'switch.cpp',
            lang: 'cpp',
            src: `int day = 3;
switch (day) {
    case 1:
        std::cout << "월요일" << std::endl;
        break;
    case 2:
        std::cout << "화요일" << std::endl;
        break;
    case 3:
        std::cout << "수요일" << std::endl;
        break;
    default:
        std::cout << "그 외 요일" << std::endl;
}`,
            out: `수요일`
          },
          after: `<div class="note"><b>fall-through</b> — <code>break;</code>가 없으면 조건이 맞는 case부터 그 아래 모든 case가 순서대로 실행돼요. 가끔 일부러 이 특성을 쓰기도 하지만, 대부분은 실수로 이어지니 항상 break를 잊지 마세요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const age = randInt(1, 25);
          const label = age >= 20 ? '성인이에요' : age >= 13 ? '청소년이에요' : '어린이예요';
          return {
            type: 'blank',
            q: `나이가 <code>${age}</code>일 때, 위 예제의 if/else if/else를 실행하면 무엇이 출력될까요? 따옴표 없이 쓰세요.`,
            prefix: '', suffix: '', accept: [label], placeholder: '출력될 문장',
            why: `${age}는 ${age >= 20 ? '20 이상' : age >= 13 ? '13 이상 20 미만' : '13 미만'}이라 "${label}"이 출력돼요.`,
            hint: '20, 13 두 기준과 순서대로 비교해보세요.'
          };
        },
        () => makeChoice(
          '<code>switch</code>문에서 <code>case</code> 끝에 <code>break;</code>를 빼먹으면 어떻게 되나요?',
          '다음 case의 코드까지 이어서 실행된다(fall-through)', ['컴파일 오류가 난다', '그 case만 실행되고 자동으로 멈춘다', 'switch 전체가 무시된다'],
          'break가 없으면 조건이 맞은 case부터 그 아래로 계속 실행이 이어져요.',
          '"떨어져서 통과한다(fall-through)"는 뜻의 특성이에요.'
        ),
        () => {
          const d = randInt(1, 3);
          const names = ['월요일', '화요일', '수요일'];
          return {
            type: 'blank',
            q: `<code>int day = ${d};</code>일 때 위 switch 예제를 실행하면? 따옴표 없이 쓰세요.`,
            prefix: '', suffix: '', accept: [names[d - 1]], placeholder: '출력될 문장',
            why: `day가 ${d}이므로 case ${d}가 실행되어 "${names[d - 1]}"이 출력돼요.`,
            hint: 'case 번호와 day 값을 맞춰보세요.'
          };
        },
        () => makeChoice(
          '<code>bool ok = (5 > 3) && (2 < 1);</code>에서 ok의 값은?',
          'false', ['true', '컴파일 오류', '알 수 없음'],
          '&&는 둘 다 참이어야 참이에요. (2 < 1)이 거짓이라서 전체가 false예요.',
          '&&는 "그리고"라는 뜻이에요.'
        ),
        () => ({
          type: 'code',
          q: '정수 score가 90 이상이면 "A", 아니면 "B"를 출력하는 if/else 코드를 작성하세요. (score는 이미 선언되어 있다고 가정)',
          starter: '',
          rows: 4,
          placeholder: 'if (score >= 90) {\n    std::cout << "A";\n} else {\n    std::cout << "B";\n}',
          accept: ['if (score >= 90) {\n    std::cout << "A";\n} else {\n    std::cout << "B";\n}'],
          why: 'if 조건이 참이면 A, 거짓이면 else 블록에서 B를 출력해요.',
          hint: 'if (score >= 90) { } else { } 형태예요.'
        }),
      ],
      boss: () => {
        const score = randInt(0, 100);
        const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'F';
        return {
          type: 'blank',
          q: `<code>int score = ${score}; if (score >= 90) std::cout << "A"; else if (score >= 80) std::cout << "B"; else if (score >= 70) std::cout << "C"; else std::cout << "F";</code>를 실행하면? (알파벳 한 글자)`,
          prefix: '', suffix: '', accept: [grade], placeholder: '알파벳',
          why: `${score}점은 등급 "${grade}"에 해당해요.`,
          hint: '90, 80, 70을 기준으로 순서대로 비교해보세요.'
        };
      }
    },
    {
      id: 'loopsForWhile',
      title: '반복문 — for, while, do-while',
      ready: true,
      summary: '정해진 횟수만큼, 혹은 조건이 참인 동안 코드를 반복하는 세 가지 반복문을 배워요.',
      goals: ['for문의 3단계 구조', 'while / do-while 차이', 'break와 continue'],
      blocks: [
        {
          h: 'for문 — 횟수를 정해서 반복',
          html: `<p><code>for (초기화; 조건; 증감)</code> 형태로, 반복 횟수를 미리 알 때 가장 많이 써요.</p>`,
          code: {
            label: 'for_loop.cpp',
            lang: 'cpp',
            src: `for (int i = 1; i <= 5; i++) {
    std::cout << i << " ";
}
std::cout << std::endl;`,
            out: `1 2 3 4 5 `
          }
        },
        {
          h: 'while과 do-while',
          html: `<p><code>while</code>은 조건이 참인 동안 반복하고, 매번 조건을 먼저 확인해요. <code>do-while</code>은 일단 한 번 실행하고 나서 조건을 확인해서, <b>최소 한 번은 무조건 실행</b>돼요.</p>`,
          code: {
            label: 'while_loop.cpp',
            lang: 'cpp',
            src: `int count = 0;
while (count < 3) {
    std::cout << "반복 " << count << std::endl;
    count++;
}

int n = 10;
do {
    std::cout << "무조건 한 번은 실행" << std::endl;
} while (n < 5);`,
            out: `반복 0\n반복 1\n반복 2\n무조건 한 번은 실행`
          },
          after: `<div class="note"><b>break/continue</b> — <code>break</code>는 반복문을 완전히 빠져나가고, <code>continue</code>는 현재 반복만 건너뛰고 다음 반복으로 넘어가요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(3, 6);
          const nums = Array.from({ length: n }, (_, i) => i + 1).join(' ');
          return {
            type: 'blank',
            q: `<code>for (int i = 1; i <= ${n}; i++) { std::cout << i << " "; }</code>의 출력은? (숫자 사이 공백 하나씩, 끝에 공백 없이)`,
            prefix: '', suffix: '', accept: [nums], placeholder: '출력 결과',
            why: `1부터 ${n}까지 순서대로 출력돼요.`,
            hint: '1부터 조건이 참인 동안 하나씩 늘려가며 출력해요.'
          };
        },
        () => makeChoice(
          'while과 do-while의 가장 큰 차이는?',
          'do-while은 조건과 상관없이 최소 한 번은 실행된다', ['do-while은 조건을 절대 확인하지 않는다', 'while은 항상 무한 반복한다', '둘은 완전히 같다'],
          'do-while은 몸체를 먼저 실행한 뒤 조건을 확인하기 때문에 최소 한 번은 실행돼요.',
          '"먼저 실행하고 나중에 확인"하는 쪽이 do-while이에요.'
        ),
        () => {
          const n = randInt(4, 8);
          const skip = randInt(2, n - 1);
          const result = Array.from({ length: n }, (_, i) => i + 1).filter(x => x !== skip).join(' ');
          return {
            type: 'blank',
            q: `<code>for (int i = 1; i <= ${n}; i++) { if (i == ${skip}) continue; std::cout << i << " "; }</code>의 출력은? (공백으로 구분)`,
            prefix: '', suffix: '', accept: [result], placeholder: '출력 결과',
            why: `continue는 그 반복만 건너뛰기 때문에 ${skip}만 빠지고 나머지가 출력돼요.`,
            hint: 'continue를 만나면 그 숫자의 출력을 건너뛰어요.'
          };
        },
        () => makeChoice(
          '<code>for (int i = 0; i < 10; i++) { if (i == 3) break; std::cout << i; }</code>의 출력은?',
          '012', ['0123456789', '0129', '345'],
          'break는 반복문을 완전히 끝내기 때문에 i가 3이 되는 순간 반복이 멈춰요.',
          'break는 그 반복문 전체를 빠져나가요.'
        ),
        () => ({
          type: 'code',
          q: '1부터 3까지 순서대로 출력하는 for문을 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'for (int i = 1; i <= 3; i++) {\n    std::cout << i;\n}',
          accept: ['for (int i = 1; i <= 3; i++) {\n    std::cout << i;\n}'],
          why: 'i를 1부터 3까지 증가시키며 출력해요.',
          hint: 'for (int i = 1; i <= 3; i++) { std::cout << i; }'
        }),
      ],
      boss: () => {
        const n = randInt(4, 7);
        let sum = 0;
        for (let i = 1; i <= n; i++) if (i % 2 === 0) sum += i;
        return {
          type: 'blank',
          q: `<code>int sum = 0; for (int i = 1; i <= ${n}; i++) { if (i % 2 != 0) continue; sum += i; } std::cout << sum;</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `1부터 ${n}까지 중 짝수만 더하면 ${sum}이에요.`,
          hint: '홀수는 continue로 건너뛰고 짝수만 더해요.'
        };
      }
    },
    {
      id: 'functionsBasics',
      title: '함수 기초 — 선언과 반환',
      ready: true,
      summary: '값을 반환하는 함수를 정의하고 호출하는 방법을 배워요.',
      goals: ['반환 타입 / 함수 이름 / 매개변수', 'return으로 값 돌려주기', 'void 함수'],
      blocks: [
        {
          h: '함수의 기본 구조',
          html: `<p>C++ 함수는 <code>반환타입 함수이름(매개변수들) { ... }</code> 형태예요. 값을 돌려줄 필요가 없으면 반환 타입에 <code>void</code>를 써요.</p>`,
          code: {
            label: 'functions.cpp',
            lang: 'cpp',
            src: `int add(int a, int b) {
    return a + b;
}

void greet(std::string name) {
    std::cout << "안녕, " << name << "!" << std::endl;
}

int main() {
    std::cout << add(3, 4) << std::endl;
    greet("지수");
    return 0;
}`,
            out: `7\n안녕, 지수!`
          },
          after: `<div class="note"><b>선언과 정의</b> — 큰 프로그램에서는 함수 <b>선언(원형)</b>을 헤더 파일이나 코드 위쪽에 미리 적어두고, 실제 <b>정의</b>는 나중에 하기도 해요. 예: <code>int add(int a, int b);</code>로 먼저 알려주는 방식이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 50), b = randInt(1, 50);
          return {
            type: 'blank',
            q: `<code>int add(int a, int b) { return a + b; } std::cout << add(${a}, ${b});</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `add(${a}, ${b})는 ${a} + ${b} = ${a + b}를 반환해요.`,
            hint: 'return a + b;가 실행돼요.'
          };
        },
        () => makeChoice(
          '값을 돌려줄 필요가 없는 함수의 반환 타입으로 쓰는 키워드는?',
          'void', ['null', 'empty', 'none'],
          '아무 값도 반환하지 않는 함수는 반환 타입을 <code>void</code>로 써요.',
          '"비어있음"이라는 뜻의 영단어예요.'
        ),
        () => makeChoice(
          '함수 안에서 <code>return</code>을 만나면?',
          '그 값을 돌려주고 함수 실행을 즉시 끝낸다', ['그 줄만 건너뛰고 함수는 계속 실행된다', '프로그램 전체가 종료된다', '아무 일도 일어나지 않는다'],
          'return은 값을 돌려주는 동시에 함수 실행을 끝내요.',
          '함수 실행이 거기서 멈춰요.'
        ),
        () => {
          const n = randInt(2, 10);
          return {
            type: 'blank',
            q: `<code>int square(int x) { return x * x; } std::cout << square(${n});</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n * n)], placeholder: '숫자',
            why: `${n}의 제곱은 ${n * n}이에요.`,
            hint: 'x * x를 계산해요.'
          };
        },
        () => ({
          type: 'code',
          q: '두 정수 a, b를 받아 곱한 값을 반환하는 함수 multiply를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'int multiply(int a, int b) {\n    return a * b;\n}',
          accept: ['int multiply(int a, int b) {\n    return a * b;\n}'],
          why: 'int를 반환하는 함수를 만들고, a * b를 return해요.',
          hint: 'int multiply(int a, int b) { return a * b; }'
        }),
      ],
      boss: () => {
        const a = randInt(1, 20), b = randInt(1, 20), c = randInt(1, 20);
        const sum = a + b + c;
        return {
          type: 'blank',
          q: `<code>int sum3(int a, int b, int c) { return a + b + c; } std::cout << sum3(${a}, ${b}, ${c});</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `${a} + ${b} + ${c} = ${sum}`,
          hint: '세 매개변수를 모두 더해요.'
        };
      }
    },
    {
      id: 'functionOverloading',
      title: '함수 오버로딩',
      ready: true,
      summary: '같은 이름이지만 매개변수가 다른 여러 함수를 만드는 오버로딩을 배워요.',
      goals: ['매개변수 개수/타입으로 구분되는 오버로딩', '컴파일러의 함수 선택 방식', '반환 타입만 다른 오버로딩은 불가능'],
      blocks: [
        {
          h: '같은 이름, 다른 매개변수',
          html: `<p>C++에서는 <b>매개변수의 개수나 타입이 다르면</b> 같은 이름의 함수를 여러 개 만들 수 있어요. 이를 <b>함수 오버로딩</b>이라고 해요. 컴파일러가 호출할 때 넘긴 인자를 보고 알맞은 버전을 자동으로 골라줘요.</p>`,
          code: {
            label: 'overload.cpp',
            lang: 'cpp',
            src: `int add(int a, int b) {
    return a + b;
}
double add(double a, double b) {
    return a + b;
}
int add(int a, int b, int c) {
    return a + b + c;
}

std::cout << add(1, 2) << std::endl;       // int 버전
std::cout << add(1.5, 2.5) << std::endl;   // double 버전
std::cout << add(1, 2, 3) << std::endl;    // 매개변수 3개 버전`,
            out: `3\n4\n6`
          },
          after: `<div class="note"><b>불가능한 오버로딩</b> — <code>int add(int a, int b)</code>와 <code>double add(int a, int b)</code>처럼 <b>매개변수는 완전히 같고 반환 타입만 다른 경우</b>는 오버로딩으로 인정되지 않고 컴파일 오류가 나요. 컴파일러는 호출 코드만 보고 매개변수로 어떤 버전인지 구분하기 때문이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '함수 오버로딩이 성립하려면 무엇이 달라야 하나요?',
          '매개변수의 개수나 타입', ['함수 이름', '반환 타입만', '함수가 정의된 줄 번호'],
          '오버로딩은 매개변수의 개수나 타입으로 구분돼요. 이름은 오히려 같아야 해요.',
          '컴파일러는 "호출할 때 뭘 넘겼는지"로 구분해요.'
        ),
        () => {
          const a = randInt(1, 20), b = randInt(1, 20), c = randInt(1, 20);
          return {
            type: 'blank',
            q: `위 예제의 <code>add</code> 오버로딩들이 있을 때, <code>add(${a}, ${b}, ${c})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b + c)], placeholder: '숫자',
            why: `인자가 3개라서 매개변수 3개짜리 버전이 호출되어 ${a}+${b}+${c}=${a + b + c}가 나와요.`,
            hint: '인자 개수에 맞는 오버로딩 버전이 골라져요.'
          };
        },
        () => makeChoice(
          '<code>int add(int a, int b)</code>가 있을 때, <code>double add(int a, int b)</code>를 추가로 정의하면?',
          '컴파일 오류 — 매개변수가 같고 반환 타입만 달라서 오버로딩으로 인정되지 않는다', ['정상적으로 오버로딩된다', '기존 함수를 덮어쓴다', '실행할 때만 오류가 난다'],
          '반환 타입만 다른 것은 오버로딩 기준으로 인정되지 않아서 컴파일 오류가 나요.',
          '컴파일러는 반환 타입으로 함수를 구분하지 않아요.'
        ),
        () => makeChoice(
          '함수 오버로딩의 장점으로 알맞은 것은?',
          '비슷한 동작을 하는 함수에 같은 이름을 재사용해서 코드를 더 직관적으로 만든다', ['프로그램 실행 속도가 항상 빨라진다', '메모리 사용량이 항상 줄어든다', '변수 이름을 자유롭게 지을 수 있게 해준다'],
          '오버로딩은 비슷한 역할의 함수에 하나의 이름을 재사용해 코드를 더 읽기 쉽게 만들어줘요.',
          '"이름 재사용으로 인한 직관성"이 핵심이에요.'
        ),
        () => ({
          type: 'code',
          q: 'int 두 개를 더하는 add(int, int)와, double 두 개를 더하는 add(double, double) 오버로딩 함수 두 개를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: 'int add(int a, int b) {\n    return a + b;\n}\ndouble add(double a, double b) {\n    return a + b;\n}',
          accept: ['int add(int a, int b) {\n    return a + b;\n}\ndouble add(double a, double b) {\n    return a + b;\n}'],
          why: '매개변수 타입이 다른 두 개의 add 함수를 각각 정의해요.',
          hint: 'int 버전과 double 버전을 각각 만들어요.'
        }),
      ],
      boss: () => {
        const x = randInt(1, 10), y = randInt(1, 10);
        return {
          type: 'blank',
          q: `<code>int area(int side) { return side * side; } int area(int w, int h) { return w * h; } std::cout << area(${x}, ${y});</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(x * y)], placeholder: '숫자',
          why: `인자가 2개라서 area(int, int) 버전이 호출되어 ${x} * ${y} = ${x * y}가 나와요.`,
          hint: '인자 개수에 맞는 오버로딩이 선택돼요.'
        };
      }
    },
    {
      id: 'defaultParameters',
      title: '기본 매개변수 값',
      ready: true,
      summary: '함수 호출 시 값을 생략하면 자동으로 쓰이는 기본값을 매개변수에 정해봐요.',
      goals: ['매개변수 = 기본값 문법', '기본값 있는 매개변수는 뒤쪽에 몰아야 함', '호출 시 값 생략하기'],
      blocks: [
        {
          h: '매개변수에 기본값 정하기',
          html: `<p>매개변수 선언에 <code>= 값</code>을 붙이면, 호출할 때 그 인자를 생략해도 기본값이 자동으로 쓰여요. 기본값이 있는 매개변수는 반드시 <b>뒤쪽</b>에 몰아서 선언해야 해요.</p>`,
          code: {
            label: 'default_args.cpp',
            lang: 'cpp',
            src: `void greet(std::string name, std::string greeting = "안녕하세요") {
    std::cout << greeting << ", " << name << "!" << std::endl;
}

greet("지수");                 // 기본값 사용
greet("민준", "반가워요");     // 기본값 대신 직접 지정`,
            out: `안녕하세요, 지수!\n반가워요, 민준!`
          },
          after: `<div class="note"><b>순서 규칙</b> — <code>void f(int a = 1, int b)</code>처럼 기본값 있는 매개변수 뒤에 기본값 없는 매개변수가 오면 컴파일 오류예요. 기본값은 항상 오른쪽부터 채워야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '기본 매개변수 값을 정하는 문법은?',
          '매개변수 = 기본값', ['매개변수 : 기본값', 'default(매개변수, 기본값)', '매개변수 == 기본값'],
          '<code>타입 이름 = 기본값</code> 형태로 매개변수 선언에 등호를 붙여요.',
          '등호(=) 하나를 매개변수 뒤에 붙여요.'
        ),
        () => makeChoice(
          '<code>void f(int a, int b = 5, int c)</code>처럼 선언하면?',
          '컴파일 오류 — 기본값 있는 매개변수 뒤에 기본값 없는 매개변수가 올 수 없다', ['정상적으로 컴파일된다', 'c에도 자동으로 5가 들어간다', 'a와 b만 사용 가능해진다'],
          '기본값이 있는 매개변수는 반드시 맨 뒤쪽에 몰아서 선언해야 해요.',
          '기본값은 "오른쪽부터" 채워야 한다는 규칙을 떠올려보세요.'
        ),
        () => {
          const name = pick(['서연', '하늘', '지호']);
          return {
            type: 'blank',
            q: `<code>void greet(std::string name, std::string msg = "환영해요") { std::cout << msg << " " << name; } greet("${name}");</code>의 출력은?`,
            prefix: '', suffix: '', accept: [`환영해요 ${name}`], placeholder: '출력 결과',
            why: `msg 인자를 생략했으므로 기본값 "환영해요"가 쓰여요.`,
            hint: '두 번째 인자를 생략하면 기본값이 쓰여요.'
          };
        },
        () => makeChoice(
          '기본 매개변수 값을 쓰는 이유로 가장 알맞은 것은?',
          '자주 같은 값을 넘기는 경우, 호출 코드를 더 간결하게 만들 수 있어서', ['함수의 실행 속도를 높이기 위해서', '메모리를 아끼기 위해서', '오버로딩을 아예 금지하기 위해서'],
          '자주 쓰이는 값을 기본값으로 정해두면 호출할 때 매번 넘기지 않아도 되어 코드가 간결해져요.',
          '"자주 쓰이는 값 생략"이 핵심이에요.'
        ),
        () => ({
          type: 'code',
          q: '정수 base와 기본값이 2인 정수 exp를 매개변수로 받아, exp가 2일 때를 가정해 base * base를 반환하는 함수 square를 작성하세요 (단순화를 위해 항상 base*base를 반환).',
          starter: '',
          rows: 3,
          placeholder: 'int square(int base, int exp = 2) {\n    return base * base;\n}',
          accept: ['int square(int base, int exp = 2) {\n    return base * base;\n}'],
          why: '두 번째 매개변수에 기본값 2를 지정해요.',
          hint: 'int square(int base, int exp = 2) { return base * base; }'
        }),
      ],
      boss: () => {
        const price = randInt(1000, 5000);
        const rate = pick([10, 20]);
        const discounted = Math.round(price * (1 - rate / 100));
        return {
          type: 'blank',
          q: `<code>int discount(int price, int rate = 10) { return price - price * rate / 100; } std::cout << discount(${price}, ${rate});</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(price - Math.floor(price * rate / 100))], placeholder: '숫자',
          why: `rate를 직접 ${rate}로 넘겼으므로 기본값 대신 그 값이 쓰여요.`,
          hint: '두 번째 인자를 직접 넘기면 기본값 대신 그 값이 쓰여요.'
        };
      }
    },
    {
      id: 'referencesVsPointers',
      title: '참조 vs 포인터',
      ready: true,
      summary: '포인터 문법을 간단히 복습하고, 참조와 포인터가 어떻게 다른지 비교해봐요.',
      goals: ['포인터 기초 복습(&, *)', '참조와 포인터의 차이', '상황에 맞게 선택하는 기준'],
      blocks: [
        {
          h: '포인터 잠깐 복습',
          html: `<p>C에서 배운 포인터는 C++에서도 그대로 써요. <code>&</code>는 변수의 주소를, <code>*</code>는 포인터가 가리키는 값(역참조)을 얻는 연산자예요.</p>`,
          code: {
            label: 'pointer_recap.cpp',
            lang: 'cpp',
            src: `int x = 10;
int* p = &x;
*p = 20;
std::cout << x << std::endl; // 20`,
            out: `20`
          }
        },
        {
          h: '참조와 포인터, 무엇이 다를까요?',
          html: `<table>
                   <tr><th>특징</th><th>포인터</th><th>참조</th></tr>
                   <tr><td>null 가능?</td><td>가능(nullptr)</td><td>불가능(항상 무언가를 가리켜야 함)</td></tr>
                   <tr><td>재대입</td><td>다른 대상을 가리키도록 변경 가능</td><td>한 번 정하면 변경 불가</td></tr>
                   <tr><td>사용 문법</td><td><code>*p</code>로 역참조 필요</td><td>원본 변수처럼 그대로 사용</td></tr>
                 </table>
                 <p>일반적으로 <b>"반드시 값이 있어야 하고, 대상이 안 바뀌어도 되는 경우"</b>엔 참조를, <b>"null일 수도 있고, 나중에 다른 것을 가리켜야 하는 경우"</b>엔 포인터를 선택해요.</p>`,
          code: {
            label: 'ref_vs_ptr.cpp',
            lang: 'cpp',
            src: `void modifyByRef(int& r) { r += 1; }
void modifyByPtr(int* p) { *p += 1; }

int a = 5, b = 5;
modifyByRef(a);
modifyByPtr(&b);
std::cout << a << " " << b << std::endl; // 6 6`,
            out: `6 6`
          },
          after: `<div class="note"><b>실전 팁</b> — 함수 매개변수로 큰 객체를 넘길 때, 값을 바꿀 필요가 없다면 <code>const 타입&</code>로 받아서 복사 비용 없이 안전하게 읽기만 하는 패턴을 아주 자주 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(1, 50);
          return {
            type: 'blank',
            q: `<code>int x = ${n}; int* p = &x; *p += 10; std::cout << x;</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n + 10)], placeholder: '숫자',
            why: `*p로 역참조해서 x의 실제 값을 10 더했으므로 ${n + 10}이 돼요.`,
            hint: '*p는 p가 가리키는 실제 값이에요.'
          };
        },
        () => makeChoice(
          '포인터는 될 수 있지만 참조는 될 수 없는 것은?',
          'nullptr(아무것도 가리키지 않음)이 되는 것', ['함수의 매개변수가 되는 것', '변수의 값을 바꾸는 것', '변수처럼 보이는 것'],
          '참조는 반드시 선언 시점에 실제 변수를 가리켜야 하고, null일 수 없어요.',
          '"아무것도 안 가리킴"이 가능한 쪽이 포인터예요.'
        ),
        () => makeChoice(
          '참조(&)로 선언한 매개변수의 장점은?',
          '포인터처럼 * 없이 원본 변수를 그대로 다루면서, 값을 바꿀 수도 있다', ['항상 원본을 복사해서 더 안전하다', 'null 값을 자유롭게 넣을 수 있다', '다른 함수에서 재사용할 수 없다'],
          '참조는 포인터의 기능(원본 수정)을 갖되, 역참조 없이 변수처럼 편하게 쓸 수 있어요.',
          '"편리함 + 원본 수정 가능"이 핵심이에요.'
        ),
        () => makeChoice(
          '한 번 특정 변수를 가리키도록 정한 참조를 나중에 다른 변수를 가리키게 바꿀 수 있나요?',
          '없다', ['있다', '조건에 따라 다르다', 'const가 아니면 가능하다'],
          '참조는 선언 시점에 대상이 고정되고 절대 바뀌지 않아요.',
          '포인터와 다른 결정적인 차이예요.'
        ),
        () => ({
          type: 'code',
          q: '정수 참조 매개변수 r을 받아 값을 두 배로 만드는 함수 doubleIt을 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'void doubleIt(int& r) {\n    r *= 2;\n}',
          accept: ['void doubleIt(int& r) {\n    r *= 2;\n}'],
          why: '참조 매개변수는 원본을 그대로 가리키므로 r *= 2;로 원본을 두 배로 만들어요.',
          hint: 'void doubleIt(int& r) { r *= 2; }'
        }),
      ],
      boss: () => {
        const n = randInt(1, 30);
        return {
          type: 'blank',
          q: `<code>void addTen(int& r) { r += 10; } int val = ${n}; int* p = &val; addTen(*p); std::cout << val;</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(n + 10)], placeholder: '숫자',
          why: `*p는 val 자체를 뜻하므로, addTen(*p)는 val에 10을 더해서 ${n + 10}이 돼요.`,
          hint: '*p는 포인터가 가리키는 실제 변수예요.'
        };
      }
    },
    {
      id: 'arraysBasics',
      title: '배열 — 정해진 크기의 상자들',
      ready: true,
      summary: 'C에서처럼 크기가 고정된 배열을 선언하고, 그 한계를 알아봐요.',
      goals: ['배열 선언과 인덱싱', '배열 크기가 고정된다는 한계', '범위를 벗어난 접근의 위험'],
      blocks: [
        {
          h: '배열 선언과 사용',
          html: `<p>C++ 배열은 C와 문법이 같아요. <code>타입 이름[크기];</code>로 선언하고, 인덱스는 0부터 시작해요.</p>`,
          code: {
            label: 'array.cpp',
            lang: 'cpp',
            src: `int scores[3] = {90, 85, 100};
std::cout << scores[0] << " " << scores[2] << std::endl;
std::cout << "크기: " << sizeof(scores) / sizeof(scores[0]) << std::endl;`,
            out: `90 100\n크기: 3`
          }
        },
        {
          h: '배열의 한계',
          html: `<p>배열은 선언할 때 정한 크기를 <b>나중에 바꿀 수 없어요</b>. 값을 몇 개 더 넣고 싶어져도 배열 자체를 다시 만들어야 하죠. 게다가 범위를 벗어난 인덱스(<code>scores[3]</code>처럼)에 접근해도 컴파일러가 막아주지 않아서, 실행 중 예측 불가능한 값을 읽거나 프로그램이 망가질 수 있어요.</p>`,
          after: `<div class="note"><b>다음 단원 예고</b> — 이런 불편함 때문에 실무 C++에서는 크기가 자유롭게 늘어나는 <code>std::vector</code>를 배열 대신 훨씬 더 많이 써요. 바로 다음 단원에서 배워요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const arr = [randInt(1, 100), randInt(1, 100), randInt(1, 100)];
          const idx = randInt(0, 2);
          return {
            type: 'blank',
            q: `<code>int nums[3] = {${arr.join(', ')}}; std::cout << nums[${idx}];</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(arr[idx])], placeholder: '숫자',
            why: `인덱스는 0부터 시작하므로 nums[${idx}]는 ${arr[idx]}예요.`,
            hint: '첫 번째 값의 인덱스는 0이에요.'
          };
        },
        () => makeChoice(
          'C++ 배열의 한계로 옳은 것은?',
          '한 번 정한 크기를 나중에 바꿀 수 없다', ['인덱스가 1부터 시작한다', '정수만 담을 수 있다', '한 개의 값만 담을 수 있다'],
          '배열은 크기가 고정되어 있어서, 더 늘리려면 새로 만들어야 해요.',
          '"크기 변경 불가"가 핵심 한계예요.'
        ),
        () => makeChoice(
          '<code>int arr[3] = {1,2,3}; std::cout << arr[5];</code>를 실행하면 어떻게 되나요?',
          '컴파일은 되지만, 범위를 벗어난 값이라 실행 결과를 예측할 수 없다', ['컴파일 오류가 난다', '항상 0이 출력된다', '자동으로 배열 크기가 늘어난다'],
          'C++는 배열의 범위를 자동으로 검사해주지 않아서, 범위를 벗어나도 컴파일은 되지만 실행 시 어떤 값이 나올지 알 수 없어요.',
          '배열은 범위 검사를 해주지 않아요.'
        ),
        () => {
          const n = randInt(3, 5);
          return {
            type: 'blank',
            q: `<code>int arr[${n}];</code>처럼 선언했을 때, 유효한 인덱스의 범위는 0부터 몇까지인가요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n - 1)], placeholder: '숫자',
            why: `크기가 ${n}이면 인덱스는 0부터 ${n - 1}까지예요.`,
            hint: '크기에서 1을 빼면 마지막 인덱스예요.'
          };
        },
        () => ({
          type: 'code',
          q: '정수 1, 2, 3을 담은 크기 3짜리 배열 nums를 선언하는 한 줄을 작성하세요.',
          starter: '',
          placeholder: 'int nums[3] = {1, 2, 3};',
          accept: ['int nums[3] = {1, 2, 3};'],
          why: '중괄호로 초기값을 나열해서 배열을 선언해요.',
          hint: 'int nums[3] = {1, 2, 3};'
        }),
      ],
      boss: () => {
        const arr = [randInt(1, 50), randInt(1, 50), randInt(1, 50), randInt(1, 50)];
        const sum = arr.reduce((a, b) => a + b, 0);
        return {
          type: 'blank',
          q: `<code>int arr[4] = {${arr.join(', ')}}; int sum = 0; for (int i = 0; i < 4; i++) { sum += arr[i]; } std::cout << sum;</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `배열의 모든 값을 더하면 ${arr.join(' + ')} = ${sum}이에요.`,
          hint: 'for문으로 배열의 모든 값을 sum에 더해요.'
        };
      }
    },
    {
      id: 'vectorBasics',
      title: 'std::vector — 크기가 자유로운 배열',
      ready: true,
      summary: '배열의 한계를 극복한, C++에서 가장 많이 쓰는 컨테이너 std::vector를 배워요.',
      goals: ['#include <vector>와 선언', 'push_back으로 값 추가하기', '동적으로 크기가 늘어나는 원리'],
      blocks: [
        {
          h: 'vector 선언과 push_back',
          html: `<p><code>std::vector</code>는 <code>&lt;vector&gt;</code> 헤더에 있는, 크기가 자유롭게 늘어나는 배열이에요. <code>push_back(값)</code>으로 뒤에 값을 계속 추가할 수 있어서, 몇 개가 들어올지 미리 몰라도 걱정 없어요.</p>`,
          code: {
            label: 'vector_basics.cpp',
            lang: 'cpp',
            src: `#include <vector>

std::vector<int> scores;
scores.push_back(90);
scores.push_back(85);
scores.push_back(100);

std::cout << scores[0] << " " << scores.size() << std::endl;`,
            out: `90 3`
          }
        },
        {
          h: '초기값과 함께 선언하기',
          html: `<p>배열처럼 처음부터 값을 채워서 선언할 수도 있어요. <code>std::vector&lt;타입&gt;</code>에서 <code>&lt;타입&gt;</code>은 이 vector가 담을 값의 종류를 나타내요(템플릿이라는 개념인데, 뒤에서 자세히 배워요).</p>`,
          code: {
            label: 'vector_init.cpp',
            lang: 'cpp',
            src: `std::vector<std::string> names = {"지수", "민준", "서연"};
std::cout << names.size() << "명: " << names[1] << std::endl;`,
            out: `3명: 민준`
          },
          after: `<div class="note"><b>실무 관행</b> — 요즘 C++에서는 크기가 고정된 게 확실한 특수한 경우가 아니면, 배열보다 <code>std::vector</code>를 기본으로 선택해요. 그만큼 안전하고 편리하기 때문이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const vals = [randInt(1, 100), randInt(1, 100), randInt(1, 100)];
          return {
            type: 'blank',
            q: `<code>std::vector<int> v; v.push_back(${vals[0]}); v.push_back(${vals[1]}); v.push_back(${vals[2]}); std::cout << v.size();</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: ['3'], placeholder: '숫자',
            why: 'push_back을 3번 했으므로 크기는 3이에요.',
            hint: 'size()는 담긴 값의 개수를 알려줘요.'
          };
        },
        () => makeChoice(
          '<code>std::vector</code>를 쓰려면 어떤 헤더를 include해야 하나요?',
          '<vector>', ['<array>', '<list>', '<vector.h>'],
          'std::vector는 <code>&lt;vector&gt;</code> 헤더에 정의되어 있어요.',
          '자료구조 이름 그대로예요.'
        ),
        () => makeChoice(
          'std::vector가 배열보다 나은 점으로 알맞은 것은?',
          'push_back으로 크기를 자유롭게 늘릴 수 있다', ['항상 배열보다 메모리를 적게 쓴다', '정수만 담을 수 있다', '인덱스가 1부터 시작한다'],
          'vector는 필요할 때마다 크기를 자동으로 늘려주는 동적 배열이에요.',
          '"동적으로 크기 조절"이 핵심이에요.'
        ),
        () => {
          const names = ['하늘', '지호', '서준'];
          const idx = randInt(0, 2);
          return {
            type: 'blank',
            q: `<code>std::vector<std::string> v = {"${names[0]}", "${names[1]}", "${names[2]}"}; std::cout << v[${idx}];</code>의 출력은?`,
            prefix: '', suffix: '', accept: [names[idx]], placeholder: '출력 결과',
            why: `인덱스 ${idx}번째 값은 "${names[idx]}"예요.`,
            hint: '인덱스는 0부터 시작해요.'
          };
        },
        () => ({
          type: 'code',
          q: 'int를 담는 빈 vector v를 선언하고, push_back으로 10을 추가하는 두 줄을 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'std::vector<int> v;\nv.push_back(10);',
          accept: ['std::vector<int> v;\nv.push_back(10);'],
          why: '빈 vector를 선언한 뒤 push_back으로 값을 추가해요.',
          hint: 'std::vector<int> v; 다음 줄에 v.push_back(10);'
        }),
      ],
      boss: () => {
        const vals = [randInt(1, 50), randInt(1, 50), randInt(1, 50)];
        return {
          type: 'blank',
          q: `<code>std::vector<int> v = {${vals.join(', ')}}; v.push_back(${vals[0] + vals[1]}); std::cout << v.size() << " " << v[3];</code>를 실행하면? (형식: 숫자 숫자)`,
          prefix: '', suffix: '', accept: [`4 ${vals[0] + vals[1]}`], placeholder: '출력 결과',
          why: `push_back으로 값이 하나 더 추가되어 크기가 4가 되고, v[3]은 새로 추가한 값이에요.`,
          hint: 'push_back한 값은 맨 뒤(인덱스 3)에 들어가요.'
        };
      }
    },
    {
      id: 'vectorOperations',
      title: 'vector 다루기 — 인덱싱, size(), 반복',
      ready: true,
      summary: 'vector를 for문으로 순회하고, 2차원 vector로 표(행렬)를 표현해봐요.',
      goals: ['for문으로 vector 순회', 'size()와 인덱스의 관계', '2차원 vector'],
      blocks: [
        {
          h: 'for문으로 vector 순회하기',
          html: `<p>배열처럼 <code>size()</code>를 이용해 인덱스로 순회할 수 있어요.</p>`,
          code: {
            label: 'vector_loop.cpp',
            lang: 'cpp',
            src: `std::vector<int> nums = {10, 20, 30};
int total = 0;
for (int i = 0; i < nums.size(); i++) {
    total += nums[i];
}
std::cout << total << std::endl;`,
            out: `60`
          }
        },
        {
          h: '2차원 vector — 표(행렬) 표현하기',
          html: `<p><code>std::vector&lt;std::vector&lt;int&gt;&gt;</code>처럼 vector 안에 vector를 넣으면 표(행렬)를 표현할 수 있어요. 배열과 달리 각 행의 길이가 달라도 괜찮아요.</p>`,
          code: {
            label: 'vector2d.cpp',
            lang: 'cpp',
            src: `std::vector<std::vector<int>> grid = {
    {1, 2, 3},
    {4, 5, 6}
};
std::cout << grid[1][2] << std::endl; // 2번째 행(인덱스1)의 3번째 값(인덱스2)`,
            out: `6`
          },
          after: `<div class="note"><b>size() 반환 타입 주의</b> — <code>size()</code>는 부호 없는 정수(<code>size_t</code>)를 반환해요. <code>int i</code>와 비교할 때 컴파일러가 경고를 낼 수 있으니, 요즘은 <code>for (size_t i = 0; ...)</code>나 다음 단원에서 배울 범위 기반 for문을 더 많이 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const vals = [randInt(1, 30), randInt(1, 30), randInt(1, 30), randInt(1, 30)];
          const sum = vals.reduce((a, b) => a + b, 0);
          return {
            type: 'blank',
            q: `<code>std::vector<int> v = {${vals.join(', ')}}; int total = 0; for (int i = 0; i < v.size(); i++) { total += v[i]; } std::cout << total;</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
            why: `모든 값을 더하면 ${vals.join('+')}=${sum}이에요.`,
            hint: 'for문이 각 값을 total에 누적해요.'
          };
        },
        () => makeChoice(
          '<code>std::vector<int> v(5);</code>에서 <code>v.size()</code>의 값은?',
          '5', ['0', '1', '알 수 없음'],
          '<code>vector<int> v(5)</code>는 크기가 5이고 각 값이 0으로 초기화된 vector를 만들어요.',
          '괄호 안 숫자가 크기를 정해요.'
        ),
        () => {
          const grid = [[randInt(1, 9), randInt(1, 9)], [randInt(1, 9), randInt(1, 9)]];
          return {
            type: 'blank',
            q: `<code>std::vector<std::vector<int>> g = {{${grid[0].join(', ')}}, {${grid[1].join(', ')}}}; std::cout << g[1][0];</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(grid[1][0])], placeholder: '숫자',
            why: `g[1]은 두 번째 행 {${grid[1].join(', ')}}이고, 그중 인덱스 0은 ${grid[1][0]}이에요.`,
            hint: '먼저 행을 고르고, 그 안에서 열을 골라요.'
          };
        },
        () => makeChoice(
          '2차원 vector <code>std::vector<std::vector<int>></code>를 쓰는 이유는?',
          '표(행렬)처럼 행과 열이 있는 데이터를 표현하기 위해', ['1차원 vector보다 항상 빠르기 때문에', '문자열만 담기 위해', 'size()를 쓸 수 없게 하려고'],
          'vector 안에 vector를 넣으면 행과 열로 이루어진 표 형태의 데이터를 표현할 수 있어요.',
          '"행렬, 표"라는 키워드를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: 'vector<int> v의 모든 값을 더해 total에 누적하는 for문을 작성하세요. (v와 total은 이미 선언되어 있다고 가정)',
          starter: '',
          rows: 3,
          placeholder: 'for (int i = 0; i < v.size(); i++) {\n    total += v[i];\n}',
          accept: ['for (int i = 0; i < v.size(); i++) {\n    total += v[i];\n}'],
          why: 'size()만큼 반복하며 각 값을 total에 더해요.',
          hint: 'for (int i = 0; i < v.size(); i++) { total += v[i]; }'
        }),
      ],
      boss: () => {
        const grid = [[randInt(1, 9), randInt(1, 9), randInt(1, 9)], [randInt(1, 9), randInt(1, 9), randInt(1, 9)]];
        let sum = 0;
        for (const row of grid) for (const v of row) sum += v;
        return {
          type: 'blank',
          q: `<code>std::vector<std::vector<int>> g = {{${grid[0].join(', ')}}, {${grid[1].join(', ')}}}; int total = 0; for (int i = 0; i < g.size(); i++) { for (int j = 0; j < g[i].size(); j++) { total += g[i][j]; } } std::cout << total;</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `모든 행의 모든 값을 더하면 ${sum}이에요.`,
          hint: '이중 for문으로 모든 행과 열을 순회해요.'
        };
      }
    },
    {
      id: 'structsVsClasses',
      title: 'struct vs class — 접근 제어의 시작',
      ready: true,
      summary: '관련 있는 데이터를 하나로 묶는 struct와 class, 그리고 public/private 접근 제어를 배워요.',
      goals: ['struct로 데이터 묶기', 'class와 public/private', 'struct와 class의 유일한 차이'],
      blocks: [
        {
          h: 'struct — 데이터를 하나로 묶기',
          html: `<p><code>struct</code>는 서로 관련 있는 변수(멤버)들을 하나의 이름으로 묶어요. C에서 배운 것과 문법이 같아요.</p>`,
          code: {
            label: 'struct_basic.cpp',
            lang: 'cpp',
            src: `struct Point {
    int x;
    int y;
};

Point p1;
p1.x = 3;
p1.y = 4;
std::cout << p1.x << ", " << p1.y << std::endl;`,
            out: `3, 4`
          }
        },
        {
          h: 'class와 접근 제어(public/private)',
          html: `<p>C++의 <code>class</code>는 struct와 거의 같지만, <b>접근 제어</b>가 기본값부터 달라요. <code>public</code>은 클래스 밖에서도 접근 가능, <code>private</code>는 클래스 내부(멤버 함수)에서만 접근 가능해요.</p>
                 <p><b>struct와 class의 유일한 차이</b>는 멤버의 <b>기본 접근 제어</b>예요: struct는 기본이 <code>public</code>, class는 기본이 <code>private</code>. 그래서 관례적으로 단순 데이터 묶음엔 struct를, 동작(메서드)이 있는 진짜 객체엔 class를 써요.</p>`,
          code: {
            label: 'class_basic.cpp',
            lang: 'cpp',
            src: `class Point {
public:
    int x;
    int y;
};

class Hidden {
    int secret = 42; // 기본이 private이라 외부에서 접근 불가
};`,
            out: `(컴파일만 되는 예시)`
          },
          after: `<div class="note"><b>주의</b> — <code>class Hidden</code>의 <code>secret</code>은 private라서 <code>Hidden h; h.secret;</code>처럼 외부에서 접근하면 컴파일 오류가 나요. 다음 단원부터 이 private 멤버에 접근하는 올바른 방법(생성자, 메서드)을 배워요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'struct와 class의 유일한 차이는?',
          '멤버의 기본 접근 제어(struct는 public, class는 private)', ['struct는 함수를 가질 수 없다', 'class는 C++11부터 생긴 문법이다', 'struct는 힙에만 만들 수 있다'],
          'struct는 멤버가 기본적으로 public이고, class는 기본적으로 private이라는 점만 달라요.',
          '기본 접근 제어 수준을 떠올려보세요.'
        ),
        () => makeChoice(
          '<code>class</code>에서 <code>public:</code> 아래에 있는 멤버는?',
          '클래스 외부에서도 자유롭게 접근할 수 있다', ['클래스 내부에서만 접근할 수 있다', '자식 클래스에서만 접근할 수 있다', '아예 접근할 수 없다'],
          'public 멤버는 클래스 외부 어디서든 <code>객체.멤버</code>로 접근 가능해요.',
          '"공개"라는 뜻의 단어예요.'
        ),
        () => {
          const x = randInt(1, 20), y = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>struct Point { int x; int y; }; Point p; p.x = ${x}; p.y = ${y}; std::cout << p.x + p.y;</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(x + y)], placeholder: '숫자',
            why: `p.x와 p.y를 더하면 ${x} + ${y} = ${x + y}예요.`,
            hint: '점(.)으로 멤버에 접근해서 더해요.'
          };
        },
        () => makeChoice(
          '단순한 데이터 묶음(예: 좌표, 색상값)에 관례적으로 더 자주 쓰이는 것은?',
          'struct', ['class', '둘 다 절대 쓸 수 없다', 'union'],
          '동작(메서드)보다 데이터 자체가 중요한 단순한 묶음에는 관례적으로 struct를 써요.',
          '"기본이 public"인 쪽이 데이터 묶음에 어울려요.'
        ),
        () => ({
          type: 'code',
          q: 'int 타입 width, height 두 멤버를 가진 struct Rectangle을 정의하세요.',
          starter: '',
          rows: 4,
          placeholder: 'struct Rectangle {\n    int width;\n    int height;\n};',
          accept: ['struct Rectangle {\n    int width;\n    int height;\n};'],
          why: 'struct 안에 두 개의 int 멤버를 선언해요.',
          hint: 'struct Rectangle { int width; int height; };'
        }),
      ],
      boss: () => {
        const w = randInt(2, 10), h = randInt(2, 10);
        return {
          type: 'blank',
          q: `<code>struct Rectangle { int width; int height; }; Rectangle r; r.width = ${w}; r.height = ${h}; std::cout << r.width * r.height;</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(w * h)], placeholder: '숫자',
          why: `너비와 높이를 곱하면 ${w} * ${h} = ${w * h}예요.`,
          hint: 'width와 height를 곱해요.'
        };
      }
    },
    {
      id: 'classConstructors',
      title: '생성자 — 객체를 만들 때 자동 실행',
      ready: true,
      summary: '객체가 만들어지는 순간 자동으로 실행되는 생성자로, 멤버를 안전하게 초기화해요.',
      goals: ['기본 생성자와 매개변수 있는 생성자', '멤버 초기화 리스트', '생성자 오버로딩'],
      blocks: [
        {
          h: '생성자 — 클래스 이름과 같은 특별한 함수',
          html: `<p><b>생성자(constructor)</b>는 클래스와 이름이 같고 반환 타입이 없는 특별한 함수로, 객체가 만들어질 때 <b>자동으로</b> 호출돼요. 멤버를 빠짐없이 초기화하는 데 딱이에요.</p>`,
          code: {
            label: 'constructor.cpp',
            lang: 'cpp',
            src: `class Player {
public:
    std::string name;
    int hp;

    Player(std::string n, int h) {
        name = n;
        hp = h;
    }
};

Player p("전사", 100);
std::cout << p.name << " " << p.hp << std::endl;`,
            out: `전사 100`
          }
        },
        {
          h: '멤버 초기화 리스트',
          html: `<p>생성자 몸체 안에서 대입하는 대신, <code>: 멤버(값)</code> 형태의 <b>멤버 초기화 리스트</b>를 쓰면 멤버가 "생성되는 시점"에 바로 값이 정해져요(대입이 아니라 진짜 초기화). const 멤버나 참조 멤버는 반드시 이 방식으로만 초기화할 수 있어요.</p>`,
          code: {
            label: 'init_list.cpp',
            lang: 'cpp',
            src: `class Player {
public:
    std::string name;
    int hp;

    Player(std::string n, int h) : name(n), hp(h) {}
    Player() : name("이름없음"), hp(100) {} // 기본 생성자(오버로딩)
};

Player p1("궁수", 80);
Player p2;
std::cout << p1.name << " " << p2.name << std::endl;`,
            out: `궁수 이름없음`
          },
          after: `<div class="note"><b>생성자 오버로딩</b> — 함수처럼 생성자도 매개변수가 다르면 여러 개 만들 수 있어요. 매개변수 없이 부르는 <code>Player p2;</code>를 위해 매개변수 없는 생성자(기본 생성자)를 따로 만든 것을 눈여겨보세요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['전사', '마법사', '궁수']);
          const hp = randInt(50, 150);
          return {
            type: 'blank',
            q: `<code>class P { public: std::string name; int hp; P(std::string n, int h) : name(n), hp(h) {} }; P p("${name}", ${hp}); std::cout << p.name << " " << p.hp;</code>의 출력은?`,
            prefix: '', suffix: '', accept: [`${name} ${hp}`], placeholder: '출력 결과',
            why: '생성자가 매개변수로 받은 값을 멤버 초기화 리스트로 바로 채워요.',
            hint: '생성자에 넘긴 순서대로 name과 hp가 정해져요.'
          };
        },
        () => makeChoice(
          '생성자에 대한 설명으로 옳은 것은?',
          '클래스와 이름이 같고, 객체가 만들어질 때 자동으로 호출된다', ['반드시 void를 반환해야 한다', '한 클래스에 하나만 만들 수 있다', '수동으로 직접 호출해야만 실행된다'],
          '생성자는 클래스 이름과 같은 특별한 함수로, 객체 생성 시 자동으로 실행돼요.',
          '"자동 호출"이 핵심이에요.'
        ),
        () => makeChoice(
          '멤버 초기화 리스트(<code>: name(n), hp(h)</code>)를 쓰는 이유로 옳은 것은?',
          '대입이 아니라 멤버가 생성되는 시점에 바로 값을 정할 수 있고, const/참조 멤버도 초기화할 수 있어서', ['코드를 더 길게 만들기 위해서', '생성자를 여러 개 못 만들게 막기 위해서', '멤버 변수를 private으로 바꾸기 위해서'],
          '초기화 리스트는 대입보다 효율적이고, const나 참조 멤버는 이 방식이 아니면 초기화할 수 없어요.',
          '"생성 시점의 진짜 초기화"라는 점이 중요해요.'
        ),
        () => makeChoice(
          '매개변수 없이 <code>Player p;</code>처럼 객체를 만들려면 어떤 생성자가 필요한가요?',
          '매개변수가 없는 생성자(기본 생성자)', ['매개변수가 있는 생성자만 있으면 충분하다', '소멸자', '어떤 생성자도 필요 없다'],
          '매개변수 없이 객체를 만들려면 매개변수 없는 생성자(기본 생성자)가 정의되어 있어야 해요.',
          '"기본"이라는 이름이 붙은 생성자예요.'
        ),
        () => ({
          type: 'code',
          q: 'std::string name과 int age 멤버를 가진 클래스 Person의 생성자를, 멤버 초기화 리스트를 사용해 작성하세요. (클래스 선언 없이 생성자 부분만)',
          starter: '',
          rows: 1,
          placeholder: 'Person(std::string n, int a) : name(n), age(a) {}',
          accept: ['Person(std::string n, int a) : name(n), age(a) {}'],
          why: '생성자 이름은 클래스 이름과 같고, 콜론 뒤에 멤버 초기화 리스트를 써요.',
          hint: 'Person(std::string n, int a) : name(n), age(a) {}'
        }),
      ],
      boss: () => {
        const name = pick(['하늘', '별', '바람']);
        const level = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>class Char { public: std::string name; int level; Char(std::string n, int l) : name(n), level(l) {} Char() : name("무명"), level(1) {} }; Char c1("${name}", ${level}); Char c2; std::cout << c1.name << c1.level << " " << c2.name << c2.level;</code>를 실행하면? (형식: 이름레벨 이름레벨)`,
          prefix: '', suffix: '', accept: [`${name}${level} 무명1`], placeholder: '출력 결과',
          why: 'c1은 값을 전달받은 생성자, c2는 매개변수 없는 기본 생성자가 각각 호출돼요.',
          hint: '두 개의 서로 다른 생성자가 각각 어떤 값으로 초기화하는지 확인해보세요.'
        };
      }
    },
    {
      id: 'destructorsAndThis',
      title: '소멸자와 this 포인터',
      ready: true,
      summary: '객체가 사라질 때 자동 실행되는 소멸자와, 자기 자신을 가리키는 this 포인터를 배워요.',
      goals: ['소멸자(~클래스이름)의 역할', '객체 소멸 시점(스코프를 벗어날 때)', 'this 포인터로 자기 자신 참조'],
      blocks: [
        {
          h: '소멸자 — 뒷정리를 자동으로',
          html: `<p><b>소멸자(destructor)</b>는 <code>~클래스이름()</code> 형태로 만들며, 객체가 <b>사라지는 순간</b>(스코프를 벗어나거나 delete될 때) 자동으로 호출돼요. 주로 동적으로 할당했던 자원을 정리하는 데 쓰여요.</p>`,
          code: {
            label: 'destructor.cpp',
            lang: 'cpp',
            src: `class Logger {
public:
    Logger() { std::cout << "Logger 생성" << std::endl; }
    ~Logger() { std::cout << "Logger 소멸" << std::endl; }
};

void run() {
    Logger log;
    std::cout << "작업 중..." << std::endl;
} // log의 스코프가 끝나며 소멸자 자동 호출

int main() {
    run();
    return 0;
}`,
            out: `Logger 생성\n작업 중...\nLogger 소멸`
          }
        },
        {
          h: 'this — "나 자신"을 가리키는 포인터',
          html: `<p>멤버 함수 안에서 <code>this</code>는 현재 호출된 객체 자신을 가리키는 포인터예요. 매개변수 이름이 멤버 이름과 겹칠 때 구분하거나, 메서드 체이닝을 할 때 유용해요.</p>`,
          code: {
            label: 'this_ptr.cpp',
            lang: 'cpp',
            src: `class Box {
public:
    int size;
    Box(int size) {
        this->size = size; // 매개변수 size와 멤버 size를 this로 구분
    }
};

Box b(7);
std::cout << b.size << std::endl;`,
            out: `7`
          },
          after: `<div class="note"><b>참고</b> — <code>this</code>의 타입은 "자신의 클래스 타입에 대한 포인터"예요. 그래서 <code>this->멤버</code>처럼 화살표(<code>-></code>)로 접근해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '소멸자는 언제 자동으로 호출되나요?',
          '객체가 스코프를 벗어나거나 delete될 때', ['객체를 만들 때', '프로그램이 시작될 때', '멤버 함수를 부를 때마다'],
          '소멸자는 객체의 수명이 끝나는 순간(스코프 종료, delete 등)에 자동 호출돼요.',
          '생성자의 정반대 시점이에요.'
        ),
        () => {
          const name = pick(['Cat', 'Dog', 'Bird']);
          return {
            type: 'blank',
            q: `클래스 이름이 <code>${name}</code>일 때, 소멸자를 선언하는 문법은? (물결표 포함)`,
            prefix: '', suffix: '() {}', accept: [`~${name}`], placeholder: `~${name}`,
            why: `소멸자는 <code>~클래스이름()</code> 형태로 만들어요.`,
            hint: '물결표(~) 뒤에 클래스 이름을 붙여요.'
          };
        },
        () => makeChoice(
          '멤버 함수 안에서 <code>this</code>가 가리키는 것은?',
          '그 함수를 호출한 객체 자신', ['클래스 전체', '가장 처음 만들어진 객체', '항상 nullptr'],
          'this는 현재 멤버 함수를 호출한 객체 자기 자신을 가리키는 포인터예요.',
          '"나 자신"이라는 뜻으로 기억하세요.'
        ),
        () => makeChoice(
          '<code>this->size = size;</code>에서 <code>this-></code>가 필요한 이유는?',
          '매개변수 이름과 멤버 이름이 같아서 구분하기 위해', ['size가 static 멤버라서', '포인터가 아니면 컴파일이 안 되어서', 'C++ 문법상 항상 필수라서'],
          '매개변수와 멤버의 이름이 같을 때, this->로 "이건 멤버 쪽이야"라고 명확히 해줘요.',
          '이름이 겹칠 때 구분하는 용도예요.'
        ),
        () => ({
          type: 'code',
          q: '클래스 Resource의 소멸자를 작성하세요. 소멸자는 "자원 해제"를 출력합니다.',
          starter: '',
          rows: 3,
          placeholder: '~Resource() {\n    std::cout << "자원 해제";\n}',
          accept: ['~Resource() {\n    std::cout << "자원 해제";\n}'],
          why: '소멸자는 ~클래스이름() 형태이며 매개변수를 받지 않아요.',
          hint: '~Resource() { std::cout << "자원 해제"; }'
        }),
      ],
      boss: () => {
        const cnt = randInt(2, 4);
        return {
          type: 'blank',
          q: `<code>class Guard { public: Guard() { std::cout << "열림 "; } ~Guard() { std::cout << "닫힘 "; } }; void run() { for (int i = 0; i < ${cnt}; i++) { Guard g; } } run();</code>를 실행하면 "열림 닫힘 "이 몇 번 반복될까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(cnt)], placeholder: '숫자',
          why: `반복문 안에서 매번 g가 새로 만들어지고 그 반복이 끝날 때마다 스코프를 벗어나 소멸되므로, "열림 닫힘"이 ${cnt}번 반복돼요.`,
          hint: '반복문 몸체 안에서 선언된 객체는 매 반복마다 생성되고 소멸돼요.'
        };
      }
    },
    {
      id: 'encapsulationGettersSetters',
      title: '캡슐화 — getter/setter',
      ready: true,
      summary: 'private 멤버를 안전하게 다루는 getter/setter 패턴으로 캡슐화를 실천해요.',
      goals: ['private 멤버 보호', 'getter/setter 메서드', '유효성 검사를 setter에 넣기'],
      blocks: [
        {
          h: '왜 멤버를 private으로 숨길까요?',
          html: `<p>멤버를 <code>public</code>으로 열어두면, 외부에서 아무 값이나 마음대로 넣을 수 있어요(예: 나이에 음수). <b>캡슐화</b>는 데이터(멤버)를 <code>private</code>로 숨기고, <code>public</code> 메서드로만 접근하게 해서 <b>잘못된 값이 들어오지 못하게 막는</b> 설계 원칙이에요.</p>`,
          code: {
            label: 'encapsulation.cpp',
            lang: 'cpp',
            src: `class Person {
private:
    int age;

public:
    void setAge(int a) {
        if (a >= 0) age = a; // 유효성 검사
        else std::cout << "잘못된 나이입니다" << std::endl;
    }
    int getAge() {
        return age;
    }
};

Person p;
p.setAge(-5);   // 거부됨
p.setAge(17);
std::cout << p.getAge() << std::endl;`,
            out: `잘못된 나이입니다\n17`
          },
          after: `<div class="note"><b>getter/setter 이름 관례</b> — 흔히 <code>get멤버이름()</code>, <code>set멤버이름(값)</code>처럼 짓지만, 딱 정해진 문법 규칙은 아니고 관례예요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '캡슐화를 하는 주된 목적은?',
          '데이터를 숨기고 메서드를 통해서만 안전하게 접근/수정하게 하기 위해', ['프로그램 실행 속도를 높이기 위해', '변수 이름을 짧게 짓기 위해', '클래스를 여러 개 못 만들게 막기 위해'],
          '캡슐화는 잘못된 값이 들어오는 것을 막고, 데이터를 안전하게 보호하는 설계 원칙이에요.',
          '"보호"라는 키워드를 떠올려보세요.'
        ),
        () => {
          const age = randInt(-10, -1);
          return {
            type: 'blank',
            q: `위 Person 예제에서 <code>p.setAge(${age});</code>를 호출하면 무엇이 출력될까요? 따옴표 없이 쓰세요.`,
            prefix: '', suffix: '', accept: ['잘못된 나이입니다'], placeholder: '출력 문장',
            why: `${age}는 음수라서 유효성 검사(<code>a >= 0</code>)에 걸려 거부돼요.`,
            hint: '음수 나이는 setAge 안의 if문을 통과하지 못해요.'
          };
        },
        () => makeChoice(
          'age 멤버를 private으로 두고 getAge()/setAge()를 만드는 이유는?',
          'setAge 안에서 유효성 검사를 하는 등, 값이 바뀌는 과정을 통제할 수 있어서', ['private 멤버가 더 빠르게 동작해서', 'get/set 함수가 있어야 컴파일이 되어서', 'age를 두 번 선언할 수 있게 하려고'],
          'setter 안에 검사 로직을 넣으면 잘못된 값이 들어오는 걸 그 지점에서 막을 수 있어요.',
          '"검사를 한 곳에 모을 수 있다"는 장점이에요.'
        ),
        () => makeChoice(
          '멤버를 모두 public으로 열어두면 생길 수 있는 문제는?',
          '외부 어디서든 값을 직접 바꿀 수 있어 잘못된 값이 들어와도 막을 방법이 없다', ['프로그램이 컴파일되지 않는다', '멤버 함수를 만들 수 없게 된다', '객체를 여러 개 만들 수 없게 된다'],
          'public 멤버는 검사 없이 바로 값을 바꿀 수 있어서, 유효하지 않은 상태가 될 위험이 있어요.',
          '"검사를 거치지 않은 직접 접근"이 문제예요.'
        ),
        () => ({
          type: 'code',
          q: 'private int score 멤버에 대한 getter getScore()를 작성하세요. (score는 이미 클래스에 선언되어 있다고 가정)',
          starter: '',
          rows: 3,
          placeholder: 'int getScore() {\n    return score;\n}',
          accept: ['int getScore() {\n    return score;\n}'],
          why: 'getter는 private 멤버의 값을 그대로 반환하는 public 메서드예요.',
          hint: 'int getScore() { return score; }'
        }),
      ],
      boss: () => {
        const a = randInt(1, 100), b = randInt(-20, -1);
        return {
          type: 'blank',
          q: `<code>class Acc { private: int balance = 0; public: void deposit(int amt) { if (amt > 0) balance += amt; } int getBalance() { return balance; } }; Acc acc; acc.deposit(${a}); acc.deposit(${b}); std::cout << acc.getBalance();</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(a)], placeholder: '숫자',
          why: `deposit은 amt가 양수일 때만 반영되므로, 음수인 ${b}는 무시되고 balance는 ${a} 그대로예요.`,
          hint: 'if (amt > 0) 조건을 통과하지 못하는 값은 반영되지 않아요.'
        };
      }
    },
    {
      id: 'inheritanceBasics',
      title: '상속 — 코드 재사용의 시작',
      ready: true,
      summary: '기존 클래스의 멤버를 물려받아 새 클래스를 만드는 상속을 배워요.',
      goals: [': public 부모클래스 문법', '자식이 물려받는 멤버/메서드', '생성자 호출 순서(부모 먼저)'],
      blocks: [
        {
          h: '상속 — "~는 ~의 한 종류다"',
          html: `<p><b>상속(inheritance)</b>은 기존 클래스(부모, base class)의 멤버와 메서드를 새 클래스(자식, derived class)가 그대로 물려받는 기능이에요. <code>class 자식 : public 부모</code> 형태로 선언해요.</p>`,
          code: {
            label: 'inheritance.cpp',
            lang: 'cpp',
            src: `class Animal {
public:
    std::string name;
    Animal(std::string n) : name(n) {}
    void eat() { std::cout << name << "가 먹어요" << std::endl; }
};

class Dog : public Animal {
public:
    Dog(std::string n) : Animal(n) {} // 부모 생성자 호출
    void bark() { std::cout << name << "가 짖어요: 멍멍!" << std::endl; }
};

Dog d("초코");
d.eat();  // 부모(Animal)에게서 물려받음
d.bark(); // 자식(Dog)만의 기능`,
            out: `초코가 먹어요\n초코가 짖어요: 멍멍!`
          },
          after: `<div class="note"><b>생성자 호출 순서</b> — 자식 객체가 만들어질 때는 항상 <b>부모의 생성자가 먼저</b> 실행되고, 그다음 자식의 생성자가 실행돼요. <code>Dog(std::string n) : Animal(n) {}</code>처럼 초기화 리스트에서 부모 생성자를 명시적으로 호출할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>class Dog : public Animal</code>에서 Dog가 물려받는 것은?',
          'Animal의 public/protected 멤버와 메서드', ['Animal의 private 멤버까지 전부', 'Animal의 이름만', '아무것도 물려받지 않는다'],
          '자식 클래스는 부모의 public/protected 멤버를 물려받아요(private은 직접 접근 불가).',
          'private은 상속되어도 자식이 직접 접근할 수 없어요.'
        ),
        () => {
          const name = pick(['초코', '나비', '보리']);
          return {
            type: 'blank',
            q: `위 Animal/Dog 예제에서 <code>Dog d("${name}"); d.eat();</code>의 출력은?`,
            prefix: '', suffix: '', accept: [`${name}가 먹어요`], placeholder: '출력 결과',
            why: 'eat()은 부모 Animal의 메서드지만 Dog가 상속받아 그대로 쓸 수 있어요.',
            hint: 'Dog는 Animal의 eat()을 그대로 물려받아요.'
          };
        },
        () => makeChoice(
          '자식 객체가 만들어질 때 생성자 호출 순서는?',
          '부모 생성자가 먼저, 그다음 자식 생성자', ['자식 생성자가 먼저, 그다음 부모 생성자', '동시에 실행된다', '부모 생성자는 호출되지 않는다'],
          '자식 객체를 만들 때는 항상 부모 부분이 먼저 초기화된 뒤 자식 부분이 초기화돼요.',
          '"기반이 먼저 준비되어야 한다"는 순서예요.'
        ),
        () => makeChoice(
          '상속을 쓰는 주된 이유는?',
          '공통 기능을 부모 클래스에 모아두고 여러 자식 클래스가 재사용하기 위해', ['프로그램 실행 속도를 높이기 위해', '클래스 이름을 감추기 위해', 'private 멤버를 없애기 위해'],
          '상속은 공통된 데이터/동작을 부모에 정의해 코드 중복 없이 재사용할 수 있게 해줘요.',
          '"코드 재사용"이 핵심 목적이에요.'
        ),
        () => ({
          type: 'code',
          q: 'std::string brand 멤버와 생성자를 가진 부모 Vehicle을 상속받는 자식 클래스 Car를 선언하세요. (Car만의 멤버는 없어도 됨, 생성자 없이 상속 선언만)',
          starter: '',
          placeholder: 'class Car : public Vehicle {\n};',
          accept: ['class Car : public Vehicle {\n};'],
          why: ': public 부모클래스 형태로 상속을 선언해요.',
          hint: 'class Car : public Vehicle { };'
        }),
      ],
      boss: () => {
        const name = pick(['사자', '호랑이', '표범']);
        return {
          type: 'blank',
          q: `<code>class Animal { public: std::string name; Animal(std::string n) : name(n) {} void intro() { std::cout << name << "입니다 "; } }; class Cat : public Animal { public: Cat(std::string n) : Animal(n) {} void meow() { std::cout << "야옹!"; } }; Cat c("${name}"); c.intro(); c.meow();</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [`${name}입니다 야옹!`], placeholder: '출력 결과',
          why: 'intro()는 부모에게서 물려받은 메서드, meow()는 자식만의 메서드예요.',
          hint: '두 메서드가 순서대로 실행돼요.'
        };
      }
    },
    {
      id: 'protectedAndOverriding',
      title: 'protected 접근과 메서드 재정의',
      ready: true,
      summary: '자식 클래스에만 열어주는 protected와, 부모의 메서드를 자식이 새로 정의하는 방법을 배워요.',
      goals: ['protected: 자식 클래스에서만 접근 가능', '자식에서 부모 메서드 재정의하기', '숨김(hiding)과 오버라이딩의 차이 예고'],
      blocks: [
        {
          h: 'protected — 자식에게만 열어주기',
          html: `<p><code>protected</code> 멤버는 <code>private</code>처럼 외부에서는 접근할 수 없지만, <b>자식 클래스 내부에서는 접근 가능</b>해요. "가족끼리는 공유하지만 남에게는 안 보여준다"는 느낌이에요.</p>`,
          code: {
            label: 'protected_demo.cpp',
            lang: 'cpp',
            src: `class Animal {
protected:
    int age;
public:
    Animal(int a) : age(a) {}
};

class Dog : public Animal {
public:
    Dog(int a) : Animal(a) {}
    void showAge() {
        std::cout << "나이: " << age << std::endl; // 부모의 protected 멤버에 접근 가능
    }
};

Dog d(3);
d.showAge();
// d.age;  // 오류! 외부에서는 protected에 접근 불가`,
            out: `나이: 3`
          }
        },
        {
          h: '자식에서 부모 메서드를 새로 정의하기',
          html: `<p>자식 클래스에서 부모와 <b>같은 이름의 메서드</b>를 새로 만들면, 자식 객체를 통해 부를 때는 자식의 버전이 실행돼요. 이걸 메서드 <b>재정의</b>라고 하는데, 지금 방식은 아직 <code>virtual</code> 없이 하는 단순한 재정의예요.</p>`,
          code: {
            label: 'redefine.cpp',
            lang: 'cpp',
            src: `class Animal {
public:
    void speak() { std::cout << "동물이 소리를 내요" << std::endl; }
};

class Dog : public Animal {
public:
    void speak() { std::cout << "멍멍!" << std::endl; } // 재정의
};

Dog d;
d.speak(); // 멍멍!`,
            out: `멍멍!`
          },
          after: `<div class="note"><b>중요한 함정 예고</b> — 지금처럼 virtual 없이 재정의하면, <code>Animal* p = &d; p->speak();</code>처럼 <b>부모 타입 포인터/참조</b>로 부를 땐 자식이 아니라 부모의 <code>speak()</code>가 실행돼버려요! 이 문제를 해결하는 <code>virtual</code> 키워드를 다음 단원에서 배워요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'protected 멤버를 접근할 수 있는 곳은?',
          '클래스 내부와, 그 클래스를 상속받은 자식 클래스 내부', ['어디서든 접근 가능', '클래스 내부에서만(자식도 불가)', '전혀 접근할 수 없다'],
          'protected는 private과 달리 자식 클래스에서는 접근이 허용돼요.',
          '"가족(자식)에게는 공개"라는 느낌이에요.'
        ),
        () => {
          const age = randInt(1, 15);
          return {
            type: 'blank',
            q: `위 Animal/Dog 예제(protected age)에서 <code>Dog d(${age}); d.showAge();</code>의 출력은?`,
            prefix: '', suffix: '', accept: [`나이: ${age}`], placeholder: '출력 결과',
            why: 'Dog는 자식 클래스라서 부모의 protected 멤버 age에 접근할 수 있어요.',
            hint: 'showAge()가 age 값을 그대로 출력해요.'
          };
        },
        () => makeChoice(
          '<code>Animal* p = &d; p->speak();</code>를 virtual 없이 재정의된 speak()에서 호출하면?',
          '자식(Dog)이 아니라 부모(Animal)의 speak()가 실행된다', ['항상 자식의 speak()가 실행된다', '컴파일 오류가 난다', '둘 다 실행된다'],
          'virtual이 없으면 포인터/참조의 "선언된 타입"을 기준으로 메서드가 결정돼서, 부모 타입으로 다루면 부모 버전이 실행돼요.',
          '다음 단원에서 배울 다형성의 핵심 문제예요.'
        ),
        () => makeChoice(
          '자식 클래스에서 부모와 같은 이름의 메서드를 새로 만드는 것을 뭐라고 하나요?',
          '재정의(메서드 오버라이딩의 기초 형태)', ['오버로딩', '캡슐화', '다중 상속'],
          '이름이 같은 메서드를 자식이 새로 정의하는 것을 재정의라고 해요(virtual을 붙이면 진짜 오버라이딩이 돼요).',
          '오버로딩(매개변수가 다름)과 혼동하지 마세요.'
        ),
        () => ({
          type: 'code',
          q: 'protected int hp 멤버를 가진 클래스 Character를 정의하고, 생성자에서 hp를 초기화하세요.',
          starter: '',
          rows: 5,
          placeholder: 'class Character {\nprotected:\n    int hp;\npublic:\n    Character(int h) : hp(h) {}\n};',
          accept: ['class Character {\nprotected:\n    int hp;\npublic:\n    Character(int h) : hp(h) {}\n};'],
          why: 'protected: 아래에 멤버를 두고, 생성자로 초기화해요.',
          hint: 'protected: 아래 int hp; 를 두고 생성자에서 hp(h)로 초기화하세요.'
        }),
      ],
      boss: () => {
        const hp = randInt(50, 150);
        return {
          type: 'blank',
          q: `<code>class Char { protected: int hp; public: Char(int h) : hp(h) {} }; class Hero : public Char { public: Hero(int h) : Char(h) {} void show() { std::cout << "체력: " << hp; } }; Hero h(${hp}); h.show();</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [`체력: ${hp}`], placeholder: '출력 결과',
          why: 'Hero는 자식 클래스라서 부모 Char의 protected 멤버 hp에 접근할 수 있어요.',
          hint: '자식은 protected 멤버를 그대로 쓸 수 있어요.'
        };
      }
    },
    {
      id: 'polymorphismVirtual',
      title: '다형성 — virtual 함수',
      ready: true,
      summary: 'virtual 키워드로 부모 타입을 통해서도 자식의 메서드가 실행되게 만드는 다형성을 배워요.',
      goals: ['virtual 키워드의 역할', '부모 포인터/참조로 자식 메서드 호출', 'override 키워드로 실수 방지'],
      blocks: [
        {
          h: 'virtual — 진짜 다형성의 시작',
          html: `<p>이전 단원에서 본 문제(부모 포인터로 부르면 부모 메서드가 실행되는)를 해결하는 게 <code>virtual</code>이에요. 부모 메서드 앞에 <code>virtual</code>을 붙이면, 실제로 가리키는 <b>객체의 진짜 타입</b>에 맞는 메서드가 실행돼요. 이걸 <b>다형성(polymorphism)</b>이라고 해요.</p>`,
          code: {
            label: 'virtual.cpp',
            lang: 'cpp',
            src: `class Animal {
public:
    virtual void speak() { std::cout << "동물이 소리를 내요" << std::endl; }
};

class Dog : public Animal {
public:
    void speak() override { std::cout << "멍멍!" << std::endl; }
};

Animal* p = new Dog();
p->speak(); // virtual 덕분에 Dog의 speak()가 실행됨!
delete p;`,
            out: `멍멍!`
          }
        },
        {
          h: 'override 키워드 — 실수 방지',
          html: `<p><code>override</code>는 "이 메서드는 부모의 virtual 메서드를 재정의하는 거예요"라고 컴파일러에게 알려주는 키워드예요. 만약 이름이나 매개변수를 잘못 적어서 실제로는 재정의가 안 됐다면, <code>override</code> 덕분에 컴파일 오류로 바로 알 수 있어요.</p>`,
          code: {
            label: 'override_check.cpp',
            lang: 'cpp',
            src: `class Animal {
public:
    virtual void speak() {}
};

class Cat : public Animal {
public:
    void Speak() override {} // 오류! 대문자 S로 오타 -> 재정의 실패
};`,
            out: `(컴파일 오류: Speak는 재정의할 대상이 없음)`
          },
          after: `<div class="note"><b>실무 습관</b> — virtual 함수를 재정의할 때는 항상 <code>override</code>를 붙이는 습관을 들이면, 이런 오타를 컴파일 시점에 바로 잡을 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>virtual</code>을 부모 메서드에 붙이는 이유는?',
          '부모 포인터/참조로 다뤄도 실제 객체(자식)의 메서드가 실행되게 하려고', ['함수 실행 속도를 높이려고', '메서드를 private으로 만들려고', '메서드 오버로딩을 가능하게 하려고'],
          'virtual은 실행 시점에 실제 객체 타입에 맞는 메서드를 찾아 실행하게 해줘요(동적 바인딩).',
          '"실제 객체 타입 기준"이 핵심이에요.'
        ),
        () => {
          const sound = pick(['야옹!', '음메!', '꿀꿀!']);
          return {
            type: 'blank',
            q: `<code>class Animal { public: virtual void speak() { std::cout << "..."; } }; class X : public Animal { public: void speak() override { std::cout << "${sound}"; } }; Animal* p = new X(); p->speak();</code>의 출력은?`,
            prefix: '', suffix: '', accept: [sound], placeholder: '출력 결과',
            why: 'virtual 덕분에 p가 실제로 가리키는 X의 speak()가 실행돼요.',
            hint: 'virtual이 있으면 실제 객체(X) 기준으로 메서드가 정해져요.'
          };
        },
        () => makeChoice(
          '<code>override</code> 키워드의 역할은?',
          '부모의 virtual 메서드를 제대로 재정의했는지 컴파일러가 검사하게 한다', ['메서드를 virtual로 자동으로 만들어준다', '메서드를 private으로 바꾼다', '메서드 오버로딩을 금지한다'],
          'override는 실수로 재정의에 실패했을 때(이름/매개변수 오타 등) 컴파일 오류로 알려줘요.',
          '"검증 도구"라고 생각하세요.'
        ),
        () => makeChoice(
          'virtual 없이 재정의한 메서드를 부모 포인터로 호출하면?',
          '부모의 메서드가 실행된다(정적 바인딩)', ['자식의 메서드가 실행된다', '컴파일 오류가 난다', '무작위로 결정된다'],
          'virtual이 없으면 포인터의 "선언된 타입"을 기준으로 메서드가 정해져요(정적 바인딩).',
          '이전 단원에서 배운 함정을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '부모 클래스 Shape에 virtual void draw()를 선언하고, 자식 클래스 Circle에서 override로 재정의하여 "원 그리기"를 출력하세요. (Shape 정의는 생략, Circle 전체만 작성)',
          starter: '',
          rows: 3,
          placeholder: 'class Circle : public Shape {\npublic:\n    void draw() override { std::cout << "원 그리기"; }\n};',
          accept: ['class Circle : public Shape {\npublic:\n    void draw() override { std::cout << "원 그리기"; }\n};'],
          why: 'override로 부모의 virtual 메서드를 재정의해요.',
          hint: 'void draw() override { std::cout << "원 그리기"; } 형태로 작성하세요.'
        }),
      ],
      boss: () => {
        const shapes = [
          { name: 'Circle', out: '원' },
          { name: 'Square', out: '사각형' }
        ];
        const chosen = pick(shapes);
        return {
          type: 'blank',
          q: `<code>class Shape { public: virtual void draw() { std::cout << "도형"; } }; class Circle : public Shape { public: void draw() override { std::cout << "원"; } }; class Square : public Shape { public: void draw() override { std::cout << "사각형"; } }; Shape* s = new ${chosen.name}(); s->draw();</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [chosen.out], placeholder: '출력 결과',
          why: `virtual 덕분에 s가 실제로 가리키는 ${chosen.name}의 draw()가 실행돼요.`,
          hint: 'new로 만든 실제 타입의 draw()가 실행돼요.'
        };
      }
    },
    {
      id: 'virtualDestructors',
      title: 'virtual 소멸자',
      ready: true,
      summary: '부모 포인터로 자식 객체를 delete할 때 반드시 필요한 virtual 소멸자를 배워요.',
      goals: ['virtual 소멸자가 필요한 이유', '부모 포인터로 delete할 때의 위험', '다형성을 쓰는 클래스의 소멸자 규칙'],
      blocks: [
        {
          h: '소멸자에도 virtual이 필요해요',
          html: `<p>부모 타입 포인터로 자식 객체를 <code>delete</code>할 때, 부모 소멸자가 <code>virtual</code>이 <b>아니면</b> 부모의 소멸자만 실행되고 <b>자식의 소멸자는 호출되지 않아요</b>. 자식이 동적으로 할당한 자원이 있다면 그대로 새어나가는(메모리 누수) 심각한 문제가 생겨요.</p>`,
          code: {
            label: 'virtual_destructor.cpp',
            lang: 'cpp',
            src: `class Base {
public:
    virtual ~Base() { std::cout << "Base 소멸" << std::endl; }
};

class Derived : public Base {
public:
    ~Derived() override { std::cout << "Derived 소멸" << std::endl; }
};

Base* p = new Derived();
delete p; // virtual 소멸자 덕분에 Derived 소멸자도 호출됨`,
            out: `Derived 소멸\nBase 소멸`
          },
          after: `<div class="note"><b>규칙</b> — <b>virtual 함수가 하나라도 있는 클래스</b>는 소멸자도 반드시 <code>virtual</code>로 선언하는 것이 관례예요. 다형적으로(부모 타입으로) 쓰일 가능성이 있는 클래스라는 뜻이기 때문이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '부모 소멸자가 virtual이 아닐 때, <code>Base* p = new Derived(); delete p;</code>를 실행하면?',
          'Derived의 소멸자가 호출되지 않아 자원이 새어나갈 수 있다', ['Derived의 소멸자만 호출된다', '컴파일 오류가 난다', 'Base와 Derived 소멸자가 둘 다 정상 호출된다'],
          'virtual이 없으면 포인터의 선언 타입(Base) 기준으로 소멸자가 결정되어 Derived의 소멸자가 건너뛰어져요.',
          '동적 바인딩이 안 되니 자식 부분이 정리되지 않아요.'
        ),
        () => makeChoice(
          'virtual 소멸자를 언제 선언해야 하나요?',
          '그 클래스가 다형적으로(부모 타입 포인터로) 쓰일 가능성이 있을 때', ['모든 클래스에 예외 없이 항상', '소멸자를 아예 만들지 않을 때', 'private 멤버가 있을 때만'],
          '다형성을 쓰는(virtual 함수가 있는) 클래스는 소멸자도 virtual로 만드는 게 안전해요.',
          '"부모 타입으로 다뤄질 가능성"이 기준이에요.'
        ),
        () => {
          const n = randInt(1, 5);
          return {
            type: 'blank',
            q: `위 Base/Derived 예제(virtual 소멸자)에서 <code>Base* p = new Derived(); delete p;</code>를 실행하면 소멸자가 몇 번 출력될까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: ['2'], placeholder: '숫자',
            why: 'Derived 소멸자와 Base 소멸자가 순서대로 각각 한 번씩, 총 2번 출력돼요.',
            hint: '자식 소멸자 다음 부모 소멸자가 실행돼요.'
          };
        },
        () => makeChoice(
          'virtual 함수가 하나라도 있는 클래스에 대한 관례로 옳은 것은?',
          '소멸자도 virtual로 선언하는 것이 안전하다', ['생성자를 만들면 안 된다', 'private 상속만 써야 한다', '멤버를 모두 static으로 만들어야 한다'],
          'virtual 함수가 있다는 건 다형적으로 쓰일 가능성이 크다는 뜻이라, 소멸자도 virtual로 맞춰야 안전해요.',
          '일관성 있는 다형성 설계를 위한 규칙이에요.'
        ),
        () => ({
          type: 'code',
          q: '클래스 Base의 virtual 소멸자를 작성하세요. 소멸자는 "Base 정리"를 출력합니다.',
          starter: '',
          rows: 3,
          placeholder: 'virtual ~Base() {\n    std::cout << "Base 정리";\n}',
          accept: ['virtual ~Base() {\n    std::cout << "Base 정리";\n}'],
          why: 'virtual을 소멸자 앞에 붙여서 다형적으로 안전하게 delete될 수 있도록 해요.',
          hint: 'virtual ~Base() { std::cout << "Base 정리"; }'
        }),
      ],
      boss: () => {
        return {
          type: 'blank',
          q: `<code>class Base { public: virtual ~Base() { std::cout << "B "; } }; class Mid : public Base { public: ~Mid() override { std::cout << "M "; } }; class Leaf : public Mid { public: ~Leaf() override { std::cout << "L "; } }; Base* p = new Leaf(); delete p;</code>를 실행하면 어떤 순서로 출력될까요? (공백으로 구분)`,
          prefix: '', suffix: '', accept: ['L M B'], placeholder: '출력 결과',
          why: '소멸자는 항상 자식에서 부모 방향으로 순서대로 호출돼요: Leaf -> Mid -> Base.',
          hint: '생성자와 반대로, 소멸자는 자식부터 실행돼요.'
        };
      }
    },
    {
      id: 'abstractClassesInterfaces',
      title: '추상 클래스와 순수 가상 함수',
      ready: true,
      summary: '몸체가 없는 순수 가상 함수로, 객체를 만들 수 없는 "설계도" 클래스를 만들어봐요.',
      goals: ['순수 가상 함수(= 0) 문법', '추상 클래스는 객체를 만들 수 없음', '인터페이스처럼 활용하기'],
      blocks: [
        {
          h: '순수 가상 함수 — 몸체 없는 약속',
          html: `<p><code>virtual 반환타입 함수이름(...) = 0;</code>처럼 몸체 없이 <code>= 0</code>을 붙이면 <b>순수 가상 함수</b>가 돼요. 이런 함수가 하나라도 있는 클래스는 <b>추상 클래스</b>가 되어, 그 자체로는 객체를 만들 수 없고 <b>자식이 반드시 구현해야</b> 해요.</p>`,
          code: {
            label: 'abstract.cpp',
            lang: 'cpp',
            src: `class Shape { // 추상 클래스
public:
    virtual double area() const = 0; // 순수 가상 함수
};

class Rectangle : public Shape {
public:
    double width, height;
    Rectangle(double w, double h) : width(w), height(h) {}
    double area() const override { return width * height; }
};

// Shape s;  // 오류! 추상 클래스는 객체를 만들 수 없음
Shape* s = new Rectangle(3, 4);
std::cout << s->area() << std::endl;`,
            out: `12`
          }
        },
        {
          h: '인터페이스처럼 쓰기',
          html: `<p>C++에는 자바의 <code>interface</code> 키워드가 따로 없지만, <b>순수 가상 함수만 있는 추상 클래스</b>가 사실상 인터페이스 역할을 해요. "이 기능을 구현하는 클래스라면 반드시 이 메서드가 있어야 한다"는 <b>규약</b>을 강제하는 용도예요.</p>`,
          code: {
            label: 'interface_style.cpp',
            lang: 'cpp',
            src: `class Drawable {
public:
    virtual void draw() const = 0;
    virtual ~Drawable() = default; // 인터페이스에도 virtual 소멸자 권장
};

class Circle : public Drawable {
public:
    void draw() const override { std::cout << "원을 그려요" << std::endl; }
};`,
            out: `(컴파일만 되는 예시)`
          },
          after: `<div class="note"><b>참고</b> — <code>= default</code>는 컴파일러가 기본으로 만들어주는 버전을 그대로 쓰겠다는 뜻이에요. 몸체를 비워둔 것과 거의 같지만 의도를 더 명확히 드러내요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '순수 가상 함수를 선언하는 문법은?',
          'virtual 반환타입 이름(...) = 0;', ['virtual 반환타입 이름(...) {}', 'abstract 반환타입 이름(...);', 'pure virtual 반환타입 이름(...);'],
          '몸체 대신 <code>= 0</code>을 붙이면 순수 가상 함수가 돼요.',
          '등호와 숫자 0을 붙여요.'
        ),
        () => makeChoice(
          '순수 가상 함수가 하나라도 있는 클래스(추상 클래스)에 대한 설명으로 옳은 것은?',
          '그 클래스 자체로는 객체를 만들 수 없다', ['일반 클래스처럼 자유롭게 객체를 만들 수 있다', '상속할 수 없다', '멤버 변수를 가질 수 없다'],
          '추상 클래스는 불완전한 설계도라서, 자식이 순수 가상 함수를 구현해야 실제 객체를 만들 수 있어요.',
          '"설계도"이지 "완성품"이 아니에요.'
        ),
        () => {
          const w = randInt(2, 10), h = randInt(2, 10);
          return {
            type: 'blank',
            q: `위 Shape/Rectangle 예제에서 <code>Shape* s = new Rectangle(${w}, ${h}); std::cout << s->area();</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(w * h)], placeholder: '숫자',
            why: `Rectangle의 area()는 width * height를 반환하므로 ${w} * ${h} = ${w * h}예요.`,
            hint: '너비와 높이를 곱해요.'
          };
        },
        () => makeChoice(
          '추상 클래스를 인터페이스처럼 쓰는 목적으로 알맞은 것은?',
          '특정 기능을 구현하는 모든 클래스가 꼭 가져야 할 메서드 목록(규약)을 강제하기 위해', ['프로그램 실행 속도를 높이기 위해', '멤버 변수를 숨기기 위해', '함수 오버로딩을 막기 위해'],
          '순수 가상 함수로 이루어진 추상 클래스는 "이 기능을 하려면 이 메서드들을 반드시 구현하라"는 규약 역할을 해요.',
          '자바의 interface와 비슷한 역할이에요.'
        ),
        () => ({
          type: 'code',
          q: 'virtual double perimeter() const = 0; 형태의 순수 가상 함수를 가진 추상 클래스 Shape를 정의하세요.',
          starter: '',
          rows: 3,
          placeholder: 'class Shape {\npublic:\n    virtual double perimeter() const = 0;\n};',
          accept: ['class Shape {\npublic:\n    virtual double perimeter() const = 0;\n};'],
          why: '= 0을 붙인 virtual 함수는 순수 가상 함수가 되어 클래스를 추상 클래스로 만들어요.',
          hint: 'virtual double perimeter() const = 0;'
        }),
      ],
      boss: () => {
        const side = randInt(2, 8);
        return {
          type: 'blank',
          q: `<code>class Shape { public: virtual double area() const = 0; }; class Square : public Shape { public: double side; Square(double s) : side(s) {} double area() const override { return side * side; } }; Shape* s = new Square(${side}); std::cout << s->area();</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(side * side)], placeholder: '숫자',
          why: `정사각형의 넓이는 변의 길이의 제곱이므로 ${side} * ${side} = ${side * side}예요.`,
          hint: 'side * side를 계산해요.'
        };
      }
    },
    {
      id: 'operatorOverloading',
      title: '연산자 오버로딩',
      ready: true,
      summary: '내가 만든 클래스에도 +, ==, << 같은 연산자를 직접 정의해 자연스럽게 쓸 수 있게 해요.',
      goals: ['operator+ 등 멤버 함수로 오버로딩', '연산자 오버로딩의 문법 형태', '<<를 위한 friend 함수 예고'],
      blocks: [
        {
          h: '내 클래스에 + 연산자 만들기',
          html: `<p><code>operator+</code>처럼 <code>operator</code> 뒤에 연산자 기호를 붙인 함수를 만들면, 그 클래스의 객체끼리 <code>+</code>로 계산할 수 있게 돼요.</p>`,
          code: {
            label: 'operator_plus.cpp',
            lang: 'cpp',
            src: `class Vector2 {
public:
    double x, y;
    Vector2(double x, double y) : x(x), y(y) {}

    Vector2 operator+(const Vector2& other) const {
        return Vector2(x + other.x, y + other.y);
    }
};

Vector2 a(1, 2), b(3, 4);
Vector2 c = a + b; // operator+ 호출
std::cout << c.x << ", " << c.y << std::endl;`,
            out: `4, 6`
          }
        },
        {
          h: '비교 연산자 오버로딩',
          html: `<p><code>operator==</code>도 같은 방식으로 만들어서, 객체 두 개가 "같다"는 게 무엇인지 직접 정의할 수 있어요.</p>`,
          code: {
            label: 'operator_eq.cpp',
            lang: 'cpp',
            src: `class Point {
public:
    int x, y;
    Point(int x, int y) : x(x), y(y) {}

    bool operator==(const Point& other) const {
        return x == other.x && y == other.y;
    }
};

Point p1(1, 2), p2(1, 2);
std::cout << (p1 == p2) << std::endl; // 1(true)`,
            out: `1`
          },
          after: `<div class="note"><b>출력용 <<는 조금 달라요</b> — <code>std::cout << 객체</code>처럼 쓰려면 <code>operator<<</code>를 <b>멤버 함수가 아닌 friend 함수</b>로 만들어야 해요(왼쪽 피연산자가 cout이라서). 이 방법은 friend를 배우는 단원에서 자세히 다뤄요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '내가 만든 클래스에서 <code>+</code> 연산자를 쓸 수 있게 하려면?',
          'operator+라는 이름의 멤버 함수를 정의한다', ['클래스 이름을 Plus로 짓는다', '멤버 변수를 public으로 만든다', 'C++는 이 기능을 지원하지 않는다'],
          '<code>operator+</code>라는 특별한 이름의 함수를 정의하면 <code>+</code>를 오버로딩할 수 있어요.',
          '"operator" 뒤에 연산자 기호를 붙여요.'
        ),
        () => {
          const x1 = randInt(1, 10), y1 = randInt(1, 10), x2 = randInt(1, 10), y2 = randInt(1, 10);
          return {
            type: 'blank',
            q: `위 Vector2 예제에서 <code>Vector2 a(${x1}, ${y1}), b(${x2}, ${y2}); Vector2 c = a + b; std::cout << c.x << ", " << c.y;</code>의 출력은? (형식: 숫자, 숫자)`,
            prefix: '', suffix: '', accept: [`${x1 + x2}, ${y1 + y2}`], placeholder: '출력 결과',
            why: `operator+는 x와 y를 각각 더하므로 (${x1}+${x2}, ${y1}+${y2}) = (${x1 + x2}, ${y1 + y2})예요.`,
            hint: 'x끼리, y끼리 각각 더해요.'
          };
        },
        () => makeChoice(
          '연산자 오버로딩을 쓰는 이유로 알맞은 것은?',
          '내가 만든 타입도 기본 타입처럼 자연스러운 문법(+, ==)으로 다룰 수 있게 하려고', ['프로그램 실행 속도를 항상 높이기 위해', '멤버 변수 개수를 줄이기 위해', '상속을 못 하게 막기 위해'],
          '연산자 오버로딩은 사용자 정의 타입도 내장 타입처럼 직관적인 문법으로 쓸 수 있게 해줘요.',
          '"직관적인 문법"이 핵심이에요.'
        ),
        () => makeChoice(
          '<code>std::cout << 내객체</code>처럼 쓰려면 왜 멤버 함수로는 어렵나요?',
          '왼쪽 피연산자가 cout(다른 클래스)이라서 멤버 함수로는 자연스럽게 정의하기 어렵다', ['<<는 오버로딩이 아예 불가능해서', 'cout이 private이라서', '멤버 함수는 항상 오른쪽 피연산자를 요구해서'],
          '멤버 함수의 왼쪽 피연산자는 항상 자기 자신(this)이어야 하는데, <<는 왼쪽이 cout이라서 friend 함수 방식을 써요.',
          '연산자의 "왼쪽"이 무엇인지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: 'int x 멤버를 가진 Num 클래스에서, 두 Num을 더해 x끼리 합한 새 Num을 반환하는 operator+를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'Num operator+(const Num& other) const {\n    return Num(x + other.x);\n}',
          accept: ['Num operator+(const Num& other) const {\n    return Num(x + other.x);\n}'],
          why: 'operator+는 자신의 x와 매개변수 other의 x를 더한 새 객체를 반환해요.',
          hint: 'Num operator+(const Num& other) const { return Num(x + other.x); }'
        }),
      ],
      boss: () => {
        const x1 = randInt(1, 20), x2 = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>class Num { public: int x; Num(int x) : x(x) {} Num operator+(const Num& o) const { return Num(x + o.x); } bool operator==(const Num& o) const { return x == o.x; } }; Num a(${x1}), b(${x2}); Num c = a + b; std::cout << c.x << " " << (c == Num(${x1 + x2}));</code>를 실행하면? (형식: 숫자 숫자)`,
          prefix: '', suffix: '', accept: [`${x1 + x2} 1`], placeholder: '출력 결과',
          why: `a+b의 x는 ${x1}+${x2}=${x1 + x2}이고, 이는 Num(${x1 + x2})와 같으므로 true(1)예요.`,
          hint: 'operator+로 더한 값과 operator==로 비교한 결과를 순서대로 출력해요.'
        };
      }
    },
    {
      id: 'constCorrectness',
      title: 'const 정확성 — const 매개변수와 const 메서드',
      ready: true,
      summary: 'const를 매개변수와 멤버 함수에 붙여서, 바뀌면 안 되는 것을 컴파일러가 지켜주게 해요.',
      goals: ['const 참조 매개변수(const T&)', 'const 멤버 함수', 'const 객체는 const 메서드만 호출 가능'],
      blocks: [
        {
          h: 'const 참조 매개변수 — 복사 없이 안전하게 읽기',
          html: `<p>큰 객체(예: std::string, std::vector)를 함수에 넘길 때 값으로 넘기면 매번 복사가 일어나 비효율적이에요. <code>const 타입&</code>로 받으면 <b>복사 없이</b>(참조처럼) 넘기면서도, <b>바꿀 수 없음</b>을 보장해서 안전해요. 이 패턴은 C++에서 아주 자주 쓰여요.</p>`,
          code: {
            label: 'const_ref_param.cpp',
            lang: 'cpp',
            src: `void printName(const std::string& name) {
    std::cout << "이름: " << name << std::endl;
    // name = "변경";  // 오류! const라서 수정 불가
}

printName("지수");`,
            out: `이름: 지수`
          }
        },
        {
          h: 'const 멤버 함수',
          html: `<p>멤버 함수 선언 끝에 <code>const</code>를 붙이면 "이 함수는 멤버 변수를 바꾸지 않는다"는 약속이에요. <b>const 객체</b>는 <b>const 멤버 함수만</b> 호출할 수 있어요.</p>`,
          code: {
            label: 'const_method.cpp',
            lang: 'cpp',
            src: `class Point {
public:
    int x, y;
    Point(int x, int y) : x(x), y(y) {}
    int getX() const { return x; } // const 멤버 함수
    void setX(int newX) { x = newX; } // const 아님(값을 바꿈)
};

const Point p(3, 4);
std::cout << p.getX() << std::endl; // OK
// p.setX(10);  // 오류! const 객체는 const 함수만 호출 가능`,
            out: `3`
          },
          after: `<div class="note"><b>습관 팁</b> — 값을 바꾸지 않는 멤버 함수(getter 등)에는 항상 <code>const</code>를 붙이는 습관을 들이면, 나중에 const 객체와 함께 안전하게 쓸 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '함수 매개변수를 <code>const std::string&</code>로 받는 주된 이유는?',
          '복사 비용 없이 값을 넘기면서, 함수 안에서 실수로 값을 바꾸지 못하게 막기 위해', ['값을 반드시 복사해서 넘기기 위해', 'string을 int로 바꾸기 위해', '함수를 static으로 만들기 위해'],
          '참조로 넘기면 복사가 없고, const를 붙이면 원본이 바뀔 걱정도 없어요.',
          '"복사 없음 + 수정 방지" 두 가지 장점이에요.'
        ),
        () => makeChoice(
          'const 멤버 함수에 대한 설명으로 옳은 것은?',
          '함수 안에서 멤버 변수의 값을 바꾸지 않겠다는 약속이다', ['클래스 전체를 const로 만든다', '반환값을 항상 const로 만든다', '매개변수를 받을 수 없게 만든다'],
          'const를 멤버 함수 끝에 붙이면 그 함수는 멤버를 수정하지 않는다는 걸 컴파일러가 보장해줘요.',
          '함수 자체의 "동작 약속"이에요.'
        ),
        () => makeChoice(
          '<code>const Point p(3, 4);</code>로 만든 객체에서 호출할 수 있는 메서드는?',
          'const로 선언된 멤버 함수만', ['모든 멤버 함수', 'private 멤버 함수만', '아무 메서드도 호출할 수 없다'],
          'const 객체는 값이 바뀌지 않는다는 걸 보장해야 하므로, const가 붙은(안 바꾸는) 멤버 함수만 호출 가능해요.',
          'const 객체는 "안전 보장이 되는 함수"만 허용해요.'
        ),
        () => {
          const x = randInt(1, 50);
          return {
            type: 'blank',
            q: `위 Point 예제에서 <code>const Point p(${x}, 0); std::cout << p.getX();</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(x)], placeholder: '숫자',
            why: `getX()는 const 멤버 함수라서 const 객체에서도 호출 가능하고, x값 ${x}를 그대로 반환해요.`,
            hint: 'getX()는 x를 그대로 돌려줘요.'
          };
        },
        () => ({
          type: 'code',
          q: 'int score 멤버를 반환하는 const 멤버 함수 getScore를 작성하세요.',
          starter: '',
          placeholder: 'int getScore() const {\n    return score;\n}',
          accept: ['int getScore() const {\n    return score;\n}'],
          why: '함수 끝에 const를 붙여 멤버를 바꾸지 않음을 명시해요.',
          hint: 'int getScore() const { return score; }'
        }),
      ],
      boss: () => {
        const x = randInt(1, 30), y = randInt(1, 30);
        return {
          type: 'blank',
          q: `<code>class Pt { public: int x, y; Pt(int x, int y) : x(x), y(y) {} int sum() const { return x + y; } }; const Pt p(${x}, ${y}); std::cout << p.sum();</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(x + y)], placeholder: '숫자',
          why: `sum()은 const 멤버 함수라서 const 객체 p에서도 호출 가능하고, ${x}+${y}=${x + y}를 반환해요.`,
          hint: 'const 객체는 const 메서드를 호출할 수 있어요.'
        };
      }
    },
    {
      id: 'staticMembers',
      title: 'static 멤버와 static 메서드',
      ready: true,
      summary: '객체마다 따로 갖지 않고 클래스 전체가 공유하는 static 멤버와 메서드를 배워요.',
      goals: ['static 멤버 변수 — 모든 객체가 공유', 'static 멤버 함수 — 객체 없이 호출', '클래스 밖에서 static 멤버 정의하기'],
      blocks: [
        {
          h: 'static 멤버 변수 — 모두가 공유하는 값',
          html: `<p>일반 멤버 변수는 객체마다 따로 존재하지만, <code>static</code> 멤버 변수는 <b>그 클래스의 모든 객체가 딱 하나만 공유</b>해요. "지금까지 몇 개의 객체가 만들어졌는지" 세는 데 자주 쓰여요.</p>`,
          code: {
            label: 'static_member.cpp',
            lang: 'cpp',
            src: `class Player {
public:
    static int count; // 선언
    Player() { count++; }
};
int Player::count = 0; // 클래스 밖에서 정의(초기화)

Player p1, p2, p3;
std::cout << Player::count << std::endl;`,
            out: `3`
          }
        },
        {
          h: 'static 멤버 함수 — 객체 없이 부르기',
          html: `<p><code>static</code> 멤버 함수는 특정 객체에 속하지 않아서, <code>객체.함수()</code>가 아니라 <code>클래스이름::함수()</code>로 바로 호출할 수 있어요. 그래서 <code>this</code>가 없고, static이 아닌 멤버 변수에는 접근할 수 없어요.</p>`,
          code: {
            label: 'static_method.cpp',
            lang: 'cpp',
            src: `class MathUtil {
public:
    static int square(int x) {
        return x * x;
    }
};

std::cout << MathUtil::square(5) << std::endl; // 객체 없이 바로 호출`,
            out: `25`
          },
          after: `<div class="note"><b>정의 위치 주의</b> — static 멤버 변수는 클래스 선언 안에서는 <b>선언</b>만 하고, 클래스 <b>밖</b>에서 <code>타입 클래스이름::변수이름 = 초기값;</code>으로 딱 한 번 정의해야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'static 멤버 변수의 특징으로 옳은 것은?',
          '그 클래스의 모든 객체가 하나의 값을 공유한다', ['객체마다 따로 값을 가진다', '함수 안에서만 쓸 수 있다', 'private으로만 선언해야 한다'],
          'static 멤버는 객체별로 따로 있지 않고, 클래스 전체에 딱 하나만 존재해서 공유돼요.',
          '"공유"라는 단어가 핵심이에요.'
        ),
        () => {
          const n = randInt(2, 6);
          return {
            type: 'blank',
            q: `위 Player 예제(static int count)에서 <code>Player</code> 객체를 ${n}개 만들면 <code>Player::count</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `생성자마다 count++가 실행되므로, 객체 ${n}개를 만들면 count는 ${n}이 돼요.`,
            hint: '생성자가 호출될 때마다 count가 1씩 늘어나요.'
          };
        },
        () => makeChoice(
          'static 멤버 함수를 호출하는 올바른 방법은?',
          '클래스이름::함수이름()', ['객체이름.함수이름()만 가능', 'new 클래스이름().함수이름()', '함수이름() 단독으로만 가능'],
          'static 멤버 함수는 특정 객체 없이 클래스 이름으로 바로 호출할 수 있어요.',
          ':: 연산자로 클래스에 바로 접근해요.'
        ),
        () => makeChoice(
          'static 멤버 함수 안에서 할 수 없는 것은?',
          'static이 아닌(일반) 멤버 변수에 접근하는 것', ['static 멤버 변수에 접근하는 것', '매개변수를 받는 것', '값을 반환하는 것'],
          'static 함수는 특정 객체에 속하지 않아 this가 없으므로, 객체별로 다른 일반 멤버에는 접근할 수 없어요.',
          '"어떤 객체의 것인지 알 수 없다"는 점이 이유예요.'
        ),
        () => ({
          type: 'code',
          q: 'int 두 값을 받아 더 큰 값을 반환하는 static 멤버 함수 max를 MathUtil 클래스 안에 작성하세요. (클래스 선언 없이 함수만)',
          starter: '',
          rows: 3,
          placeholder: 'static int max(int a, int b) {\n    return a > b ? a : b;\n}',
          accept: ['static int max(int a, int b) {\n    return a > b ? a : b;\n}'],
          why: 'static 키워드를 붙여서 객체 없이 호출 가능한 함수를 만들어요.',
          hint: 'static int max(int a, int b) { return a > b ? a : b; }'
        }),
      ],
      boss: () => {
        const n = randInt(3, 8);
        return {
          type: 'blank',
          q: `<code>class Item { public: static int total; Item() { total++; } }; int Item::total = 0; for (int i = 0; i < ${n}; i++) { Item it; } std::cout << Item::total;</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
          why: `반복문 안에서 Item 객체가 ${n}번 만들어질 때마다 생성자가 total을 1씩 늘려서 총 ${n}이 돼요.`,
          hint: '반복 횟수만큼 생성자가 호출돼요.'
        };
      }
    },
    {
      id: 'friendFunctions',
      title: 'friend 함수와 friend 클래스',
      ready: true,
      summary: '캡슐화의 예외로, 특정 함수/클래스에게만 private 멤버 접근을 허락하는 friend를 배워요.',
      goals: ['friend 함수 선언', 'operator<<를 friend로 구현하기', 'friend 사용 시 주의점'],
      blocks: [
        {
          h: 'friend — 예외적으로 접근을 허락하기',
          html: `<p><code>friend</code>로 선언된 함수나 클래스는, 멤버가 아니어도 그 클래스의 <code>private</code>/<code>protected</code> 멤버에 접근할 수 있어요. 캡슐화 원칙의 <b>의도적인 예외</b>라서, 꼭 필요할 때만 신중하게 써야 해요.</p>`,
          code: {
            label: 'friend_func.cpp',
            lang: 'cpp',
            src: `class Box {
private:
    int width;
public:
    Box(int w) : width(w) {}
    friend void printWidth(const Box& b); // friend 선언
};

void printWidth(const Box& b) {
    std::cout << b.width << std::endl; // private 멤버에 접근 가능
}

Box b(15);
printWidth(b);`,
            out: `15`
          }
        },
        {
          h: '가장 흔한 쓰임 — operator<< 구현',
          html: `<p>이전 단원에서 예고했던 <code>std::cout << 객체</code>를 만드는 방법이 바로 friend 함수예요. <code><<</code>의 왼쪽이 <code>ostream&</code>(cout)이라서 멤버 함수로는 안 되고, 클래스 밖의 <b>friend 함수</b>로 만들어요.</p>`,
          code: {
            label: 'friend_stream.cpp',
            lang: 'cpp',
            src: `class Point {
private:
    int x, y;
public:
    Point(int x, int y) : x(x), y(y) {}
    friend std::ostream& operator<<(std::ostream& os, const Point& p);
};

std::ostream& operator<<(std::ostream& os, const Point& p) {
    os << "(" << p.x << ", " << p.y << ")";
    return os;
}

Point p(3, 4);
std::cout << p << std::endl; // (3, 4)`,
            out: `(3, 4)`
          },
          after: `<div class="note"><b>주의</b> — friend를 남용하면 캡슐화가 무너져서 어떤 외부 코드든 private 멤버를 건드릴 수 있게 돼요. 정말 필요한 소수의 함수/클래스에만 제한적으로 쓰는 게 좋아요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'friend로 선언된 함수의 특징은?',
          '멤버 함수가 아니지만 그 클래스의 private 멤버에 접근할 수 있다', ['자동으로 그 클래스의 멤버 함수가 된다', 'private 멤버에도 절대 접근할 수 없다', '반드시 static이어야 한다'],
          'friend는 캡슐화의 예외로, 멤버가 아니어도 private/protected에 접근할 권한을 주는 선언이에요.',
          '"예외적인 접근 허가"라고 생각하세요.'
        ),
        () => {
          const w = randInt(1, 100);
          return {
            type: 'blank',
            q: `위 Box 예제(friend printWidth)에서 <code>Box b(${w}); printWidth(b);</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(w)], placeholder: '숫자',
            why: 'friend로 선언된 printWidth가 private 멤버 width에 접근해서 그대로 출력해요.',
            hint: 'width 값이 그대로 출력돼요.'
          };
        },
        () => makeChoice(
          '<code>std::cout << 객체</code>를 위한 <code>operator<<</code>를 보통 멤버 함수가 아닌 friend 함수로 만드는 이유는?',
          '<<의 왼쪽 피연산자가 cout(ostream)이라서 멤버 함수로는 자연스럽게 정의할 수 없어서', ['friend가 항상 더 빨라서', 'operator<<는 멤버 함수로 만드는 게 금지되어서', 'cout이 private이라서'],
          '멤버 함수는 왼쪽 피연산자가 항상 자기 자신이어야 하는데, <<는 왼쪽이 cout이라 friend 방식을 써요.',
          '연산자 오버로딩 단원에서 예고했던 내용이에요.'
        ),
        () => makeChoice(
          'friend를 신중하게 써야 하는 이유는?',
          '남용하면 캡슐화(데이터 보호)가 무너질 수 있어서', ['컴파일 속도가 항상 느려져서', '메모리를 두 배로 쓰기 때문에', 'friend는 C++ 표준이 아니라서'],
          'friend가 많아지면 어떤 코드든 private 멤버를 건드릴 수 있어 캡슐화의 의미가 약해져요.',
          '캡슐화 단원에서 배운 "보호"의 의미를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: 'Box 클래스 안에서 함수 void showArea(const Box& b)를 friend로 선언하는 한 줄을 작성하세요.',
          starter: '',
          placeholder: 'friend void showArea(const Box& b);',
          accept: ['friend void showArea(const Box& b);'],
          why: 'friend 키워드 뒤에 함수 원형을 그대로 적어요.',
          hint: 'friend void showArea(const Box& b);'
        }),
      ],
      boss: () => {
        const w = randInt(2, 10), h = randInt(2, 10);
        return {
          type: 'blank',
          q: `<code>class Box { private: int w, h; public: Box(int w, int h) : w(w), h(h) {} friend int area(const Box& b); }; int area(const Box& b) { return b.w * b.h; } Box box(${w}, ${h}); std::cout << area(box);</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(w * h)], placeholder: '숫자',
          why: `friend 함수 area가 private 멤버 w, h에 접근해서 ${w} * ${h} = ${w * h}를 반환해요.`,
          hint: 'friend 함수는 private 멤버를 그대로 쓸 수 있어요.'
        };
      }
    },
    {
      id: 'copyConstructorRuleOfThree',
      title: '복사 생성자와 대입 연산자, Rule of Three',
      ready: true,
      summary: '객체를 복사할 때 무슨 일이 일어나는지, 그리고 직접 자원을 관리할 때의 규칙을 배워요.',
      goals: ['복사 생성자(Class(const Class&))', '복사 대입 연산자(operator=)', 'Rule of Three: 하나 만들면 셋 다 고려'],
      blocks: [
        {
          h: '기본 복사의 문제 — 얕은 복사',
          html: `<p>클래스가 <code>new</code>로 할당한 포인터 멤버를 가지고 있을 때, 아무것도 정의하지 않으면 컴파일러가 만들어주는 <b>기본 복사 생성자</b>는 포인터 값(주소)만 그대로 복사해요(<b>얕은 복사</b>). 그러면 두 객체가 <b>같은 메모리</b>를 가리키게 되어, 하나가 소멸될 때 delete하면 다른 객체는 이미 해제된 메모리를 가리키는 위험한 상태(dangling pointer)가 돼요.</p>`,
          code: {
            label: 'shallow_copy_problem.cpp',
            lang: 'cpp',
            src: `class Buffer {
public:
    int* data;
    Buffer(int size) { data = new int[size]; }
    ~Buffer() { delete[] data; }
    // 복사 생성자를 직접 만들지 않으면 컴파일러가 얕은 복사를 만들어줌
};

Buffer a(10);
Buffer b = a; // 얕은 복사: b.data와 a.data가 같은 주소를 가리킴!
// 이후 a와 b가 각각 소멸되며 delete[]가 두 번 호출되어 문제가 생김`,
            out: `(정의되지 않은 동작 — 이중 해제 위험)`
          }
        },
        {
          h: '복사 생성자와 복사 대입 연산자로 깊은 복사',
          html: `<p>이 문제를 막으려면 <b>복사 생성자</b>(<code>Class(const Class& other)</code>)와 <b>복사 대입 연산자</b>(<code>operator=(const Class& other)</code>)를 직접 정의해서, 새 메모리를 따로 할당하는 <b>깊은 복사</b>를 해줘야 해요. 소멸자까지 포함해 이 세 가지를 함께 챙기는 원칙을 <b>Rule of Three</b>라고 불러요: <b>소멸자, 복사 생성자, 복사 대입 연산자 중 하나라도 직접 정의해야 한다면, 셋 다 신경 써야 한다</b>는 뜻이에요.</p>`,
          code: {
            label: 'deep_copy.cpp',
            lang: 'cpp',
            src: `class Buffer {
public:
    int* data;
    int size;
    Buffer(int s) : size(s) { data = new int[s]; }
    Buffer(const Buffer& other) : size(other.size) { // 복사 생성자
        data = new int[size];
        for (int i = 0; i < size; i++) data[i] = other.data[i];
    }
    ~Buffer() { delete[] data; }
};

Buffer a(3);
Buffer b = a; // 깊은 복사: 별도의 메모리를 새로 할당함`,
            out: `(각자 독립된 메모리를 가짐)`
          },
          after: `<div class="note"><b>다음 단원 예고</b> — 사실 요즘 C++에서는 이렇게 직접 new/delete를 관리하는 대신, 스마트 포인터를 써서 이런 복잡함 자체를 피하는 방법을 훨씬 많이 써요. 바로 다음 단원들에서 배워요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '"얕은 복사"의 문제점은?',
          '포인터 멤버의 주소만 복사되어, 두 객체가 같은 메모리를 가리키게 된다', ['복사 자체가 아예 안 된다', '메모리를 두 배로 할당한다', '컴파일 오류가 발생한다'],
          '얕은 복사는 포인터 값만 그대로 복사해서 원본과 사본이 같은 메모리를 공유하게 돼요.',
          '"주소만 복사"가 핵심이에요.'
        ),
        () => makeChoice(
          'Rule of Three가 뜻하는 것은?',
          '소멸자, 복사 생성자, 복사 대입 연산자 중 하나를 직접 정의하면 나머지도 신경 써야 한다', ['클래스마다 딱 3개의 멤버만 가져야 한다', '생성자를 3개까지만 오버로딩할 수 있다', '상속은 최대 3단계까지만 가능하다'],
          '자원을 직접 관리하는 클래스는 이 세 가지를 세트로 고려해야 안전해요.',
          '"3가지 특수 멤버 함수"를 가리켜요.'
        ),
        () => makeChoice(
          '복사 생성자를 직접 정의해서 "깊은 복사"를 하는 이유는?',
          '원본과 사본이 서로 다른 메모리를 갖게 해서, 하나가 소멸되어도 다른 하나에 영향이 없게 하려고', ['복사 속도를 항상 더 빠르게 하려고', '메모리 사용량을 줄이기 위해서', '얕은 복사가 문법적으로 금지되어 있어서'],
          '깊은 복사는 새 메모리를 따로 할당해서, 두 객체가 독립적으로 안전하게 존재하게 해줘요.',
          '"독립된 메모리"가 핵심이에요.'
        ),
        () => {
          const size = randInt(2, 5);
          return {
            type: 'blank',
            q: `깊은 복사를 구현한 Buffer 클래스에서 <code>Buffer a(${size}); Buffer b = a;</code>를 실행한 뒤, <code>a.data</code>와 <code>b.data</code>가 같은 주소를 가리키나요? (예/아니오)`,
            prefix: '', suffix: '', accept: ['아니오'], placeholder: '예/아니오',
            why: '깊은 복사는 별도의 메모리를 새로 할당하므로 두 포인터는 서로 다른 주소를 가리켜요.',
            hint: '깊은 복사의 목적을 떠올려보세요.'
          };
        },
        () => ({
          type: 'code',
          q: 'int* data와 int size 멤버를 가진 클래스 Buffer의 복사 생성자를 작성하세요. 새 메모리를 할당하고 값을 하나씩 복사합니다.',
          starter: '',
          rows: 4,
          placeholder: 'Buffer(const Buffer& other) : size(other.size) {\n    data = new int[size];\n    for (int i = 0; i < size; i++) data[i] = other.data[i];\n}',
          accept: ['Buffer(const Buffer& other) : size(other.size) {\n    data = new int[size];\n    for (int i = 0; i < size; i++) data[i] = other.data[i];\n}'],
          why: '새 메모리를 할당한 뒤 값을 하나씩 복사하는 것이 깊은 복사예요.',
          hint: 'size를 먼저 복사하고, new로 새 배열을 만든 뒤 for문으로 값을 채워요.'
        }),
      ],
      boss: () => {
        const size = randInt(2, 4);
        const vals = Array.from({ length: size }, () => randInt(1, 20));
        return {
          type: 'blank',
          q: `<code>class Buf { public: int* data; int size; Buf(int s) : size(s) { data = new int[s]; } Buf(const Buf& o) : size(o.size) { data = new int[size]; for (int i=0;i<size;i++) data[i]=o.data[i]; } }; Buf a(${size}); for (int i=0;i<${size};i++) a.data[i] = ${vals.join('+i*0+')}; </code> 이런 방식으로 a.data에 [${vals.join(', ')}]가 채워진 후 <code>Buf b = a; b.data[0] = 999; std::cout << a.data[0];</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(vals[0])], placeholder: '숫자',
          why: `깊은 복사 덕분에 b.data는 a.data와 별개의 메모리라서, b를 바꿔도 a.data[0]은 원래 값 ${vals[0]} 그대로예요.`,
          hint: '깊은 복사는 서로 영향을 주지 않는 별도의 메모리를 가져요.'
        };
      }
    },
    {
      id: 'dynamicMemoryNewDelete',
      title: '동적 메모리 — new와 delete',
      ready: true,
      summary: '실행 중에 필요한 만큼 메모리를 직접 할당하는 new/delete와, 그 위험성을 배워요.',
      goals: ['new로 힙 메모리 할당', 'delete로 반드시 해제하기', '메모리 누수와 이중 해제의 위험'],
      blocks: [
        {
          h: 'new로 힙에 메모리 할당하기',
          html: `<p><code>new</code>는 힙(heap)이라는 메모리 영역에 공간을 만들고 그 주소를 반환해요. 배열도 <code>new 타입[개수]</code>로 만들 수 있어요.</p>`,
          code: {
            label: 'new_delete.cpp',
            lang: 'cpp',
            src: `int* p = new int(42);
std::cout << *p << std::endl;
delete p; // 반드시 해제해야 함

int* arr = new int[5];
arr[0] = 100;
std::cout << arr[0] << std::endl;
delete[] arr; // 배열은 delete[]로 해제`,
            out: `42\n100`
          }
        },
        {
          h: 'new/delete가 위험한 이유',
          html: `<p><code>new</code>로 할당한 메모리는 <code>delete</code>로 <b>직접, 정확히 한 번</b> 해제해야 해요. 이걸 사람이 직접 관리하다 보면 흔히 이런 실수가 생겨요:</p>
                 <ul>
                   <li><b>메모리 누수(leak)</b> — delete를 깜빡해서 메모리가 계속 남아있는 것</li>
                   <li><b>이중 해제(double free)</b> — 같은 메모리를 두 번 delete하는 것</li>
                   <li><b>댕글링 포인터</b> — delete한 뒤에도 그 포인터를 계속 쓰는 것</li>
                 </ul>`,
          code: {
            label: 'leak_example.cpp',
            lang: 'cpp',
            src: `void leaky() {
    int* p = new int(10);
    // delete p;를 깜빡함 -> 이 함수가 끝나도 메모리가 회수되지 않음(누수)
}`,
            out: `(컴파일은 되지만 메모리 누수가 발생하는 예시)`
          },
          after: `<div class="note"><b>다음 단원 예고</b> — 이런 실수를 원천적으로 막기 위해, 요즘 C++는 <code>new</code>/<code>delete</code>를 직접 쓰는 대신 <b>스마트 포인터</b>를 쓰는 것이 표준적인 관행이에요. 바로 다음 단원에서 배워요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>new int[5]</code>로 할당한 배열을 해제하는 올바른 방법은?',
          'delete[] arr;', ['delete arr;', 'free(arr);', 'arr.delete();'],
          '배열로 할당했다면(new T[])은 반드시 <code>delete[]</code>로 해제해야 해요.',
          '대괄호가 붙은 delete예요.'
        ),
        () => {
          const n = randInt(1, 100);
          return {
            type: 'blank',
            q: `<code>int* p = new int(${n}); std::cout << *p; delete p;</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `*p는 p가 가리키는 값 ${n}이에요.`,
            hint: '*p로 역참조하면 값을 얻어요.'
          };
        },
        () => makeChoice(
          '메모리 누수(memory leak)란?',
          'new로 할당한 메모리를 delete하지 않아 계속 사용되지 않는 채로 남는 것', ['메모리를 너무 적게 할당하는 것', 'delete를 두 번 호출하는 것', '포인터에 nullptr을 대입하는 것'],
          'delete를 빠뜨리면 그 메모리는 프로그램이 끝날 때까지 회수되지 않고 낭비돼요.',
          '"회수되지 않고 새어나간다"는 뜻이에요.'
        ),
        () => makeChoice(
          '같은 포인터를 <code>delete</code>한 뒤 또 <code>delete</code>하면 생기는 문제는?',
          '이중 해제(double free) — 정의되지 않은 동작으로 프로그램이 망가질 수 있다', ['메모리가 두 배로 늘어난다', '아무 문제 없이 안전하게 무시된다', '컴파일 오류가 난다'],
          '이미 해제된 메모리를 또 해제하면 프로그램이 예측 불가능하게 동작하거나 충돌할 수 있어요.',
          '"한 번만" 해제해야 한다는 규칙을 어긴 경우예요.'
        ),
        () => ({
          type: 'code',
          q: 'int 값 100을 담는 메모리를 new로 할당해 포인터 p에 저장하고, delete로 해제하는 두 줄을 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'int* p = new int(100);\ndelete p;',
          accept: ['int* p = new int(100);\ndelete p;'],
          why: 'new로 할당하고 반드시 delete로 짝을 맞춰 해제해요.',
          hint: 'int* p = new int(100); 다음 줄에 delete p;'
        }),
      ],
      boss: () => {
        const n = randInt(1, 5);
        const vals = Array.from({ length: n }, () => randInt(1, 50));
        const sum = vals.reduce((a, b) => a + b, 0);
        return {
          type: 'blank',
          q: `<code>int* arr = new int[${n}]{${vals.join(', ')}}; int sum = 0; for (int i = 0; i < ${n}; i++) sum += arr[i]; delete[] arr; std::cout << sum;</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `배열의 모든 값을 더하면 ${vals.join('+')} = ${sum}이에요.`,
          hint: 'delete[] 이전에 for문으로 이미 값을 다 더했어요.'
        };
      }
    },
    {
      id: 'smartPointerUniquePtr',
      title: '스마트 포인터 — std::unique_ptr와 RAII',
      ready: true,
      summary: '자동으로 메모리를 해제해주는 unique_ptr로, 메모리 누수 걱정을 없애봐요.',
      goals: ['RAII 원칙 이해', 'std::unique_ptr 사용법', '단독 소유권 — 복사 불가, 이동만 가능'],
      blocks: [
        {
          h: 'RAII — 자원 관리를 객체의 수명에 맡기기',
          html: `<p><b>RAII(Resource Acquisition Is Initialization)</b>는 "자원을 객체 생성 시점에 확보하고, 그 객체가 소멸될 때 자동으로 해제한다"는 C++의 핵심 철학이에요. <code>std::unique_ptr</code>는 이 철학을 포인터에 적용한 <b>스마트 포인터</b>로, 소멸자에서 자동으로 <code>delete</code>를 호출해줘요.</p>`,
          code: {
            label: 'unique_ptr.cpp',
            lang: 'cpp',
            src: `#include <memory>

void useResource() {
    std::unique_ptr<int> p = std::make_unique<int>(42);
    std::cout << *p << std::endl;
} // 함수가 끝나는 순간 p의 소멸자가 자동으로 delete를 호출함(누수 없음!)

useResource();`,
            out: `42`
          }
        },
        {
          h: 'unique_ptr — 단독 소유권',
          html: `<p>이름처럼 <code>unique_ptr</code>는 그 메모리를 <b>단 하나의 unique_ptr만</b> 소유할 수 있어요. 그래서 <b>복사가 금지</b>되어 있고, <code>std::move</code>로 소유권을 <b>이동</b>만 시킬 수 있어요(이동은 다음 단원에서 자세히 배워요).</p>`,
          code: {
            label: 'unique_ownership.cpp',
            lang: 'cpp',
            src: `std::unique_ptr<int> a = std::make_unique<int>(10);
// std::unique_ptr<int> b = a;  // 오류! 복사 금지
std::unique_ptr<int> b = std::move(a); // 소유권 이동은 가능
std::cout << *b << std::endl;
// a는 이제 아무것도 가리키지 않음(nullptr)`,
            out: `10`
          },
          after: `<div class="note"><b>실무 관행</b> — 요즘 C++에서는 소유권이 명확한 단일 객체를 다룰 땐 <code>new</code>/<code>delete</code> 대신 <b>거의 항상</b> <code>std::make_unique</code>를 써요. 안전하면서도 성능 손해가 거의 없기 때문이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'std::unique_ptr가 메모리 누수를 막아주는 원리는?',
          '가리키는 대상이 스코프를 벗어날 때 소멸자가 자동으로 delete를 호출해줘서', ['메모리를 아예 할당하지 않아서', 'delete를 직접 여러 번 호출해야 해서', 'new를 쓸 수 없게 막아서'],
          'unique_ptr는 RAII 원칙에 따라, 소멸자에서 자동으로 delete를 호출해 사람이 잊어도 안전해요.',
          '"자동 해제"가 핵심이에요.'
        ),
        () => {
          const n = randInt(1, 100);
          return {
            type: 'blank',
            q: `<code>std::unique_ptr<int> p = std::make_unique<int>(${n}); std::cout << *p;</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `*p로 unique_ptr가 가리키는 값을 얻으면 ${n}이에요.`,
            hint: '스마트 포인터도 *로 역참조해요.'
          };
        },
        () => makeChoice(
          '<code>std::unique_ptr<int> b = a;</code>(대입, 복사)를 시도하면?',
          '컴파일 오류 — unique_ptr는 복사를 허용하지 않는다', ['정상적으로 복사된다', 'a가 자동으로 삭제된다', 'a와 b가 같은 값을 공유하며 복사된다'],
          'unique_ptr는 단독 소유권이 원칙이라 복사 생성자/대입이 막혀 있어요. std::move로 이동만 가능해요.',
          '"단독(unique)"이라는 이름이 힌트예요.'
        ),
        () => makeChoice(
          'RAII 원칙이 뜻하는 것은?',
          '자원을 객체 생성 시 확보하고, 객체가 소멸할 때 자동으로 해제하는 설계 방식', ['자원을 절대 해제하지 않는 방식', '모든 변수를 전역으로 선언하는 방식', '함수 안에서 static 변수만 쓰는 방식'],
          'RAII는 자원 관리를 객체의 생성자/소멸자에 맡겨서 실수로 자원이 새는 것을 막아요.',
          '"객체의 생명주기에 자원 관리를 맡긴다"는 뜻이에요.'
        ),
        () => ({
          type: 'code',
          q: 'std::make_unique를 이용해 정수 7을 가리키는 unique_ptr<int> p를 만드는 한 줄을 작성하세요.',
          starter: '',
          placeholder: 'std::unique_ptr<int> p = std::make_unique<int>(7);',
          accept: ['std::unique_ptr<int> p = std::make_unique<int>(7);'],
          why: 'make_unique로 안전하게 unique_ptr를 생성해요.',
          hint: 'std::unique_ptr<int> p = std::make_unique<int>(7);'
        }),
      ],
      boss: () => {
        const a = randInt(1, 50);
        return {
          type: 'blank',
          q: `<code>std::unique_ptr<int> p1 = std::make_unique<int>(${a}); std::unique_ptr<int> p2 = std::move(p1); std::cout << (p1 == nullptr) << " " << *p2;</code>를 실행하면? (형식: 숫자 숫자)`,
          prefix: '', suffix: '', accept: [`1 ${a}`], placeholder: '출력 결과',
          why: `std::move 이후 p1은 아무것도 가리키지 않아 nullptr과 같으므로 true(1)이고, p2가 값 ${a}를 갖게 돼요.`,
          hint: '이동 후 원래 포인터는 비워져요.'
        };
      }
    },
    {
      id: 'smartPointerSharedWeak',
      title: '스마트 포인터 — shared_ptr와 weak_ptr',
      ready: true,
      summary: '여러 곳에서 함께 소유할 수 있는 shared_ptr와, 순환 참조를 막는 weak_ptr를 배워요.',
      goals: ['std::shared_ptr — 참조 카운트 기반 공유 소유권', '마지막 소유자가 사라질 때 자동 해제', 'std::weak_ptr로 순환 참조 방지'],
      blocks: [
        {
          h: 'shared_ptr — 여럿이 함께 소유하기',
          html: `<p><code>std::shared_ptr</code>는 <b>여러 shared_ptr가 같은 객체를 함께 소유</b>할 수 있어요. 내부적으로 "지금 몇 개가 이 객체를 가리키고 있는지" <b>참조 카운트</b>를 세다가, 마지막 shared_ptr까지 사라지는 순간 객체가 자동으로 삭제돼요.</p>`,
          code: {
            label: 'shared_ptr.cpp',
            lang: 'cpp',
            src: `#include <memory>

std::shared_ptr<int> a = std::make_shared<int>(100);
std::cout << a.use_count() << std::endl; // 1

{
    std::shared_ptr<int> b = a; // 공유! 참조 카운트 증가
    std::cout << a.use_count() << std::endl; // 2
} // b가 스코프를 벗어나며 카운트 감소

std::cout << a.use_count() << std::endl; // 1`,
            out: `1\n2\n1`
          }
        },
        {
          h: 'weak_ptr — 소유하지 않고 지켜보기',
          html: `<p>두 객체가 <code>shared_ptr</code>로 <b>서로를</b> 가리키면, 참조 카운트가 절대 0이 되지 않아 <b>영원히 해제되지 않는 순환 참조</b>가 생겨요. <code>std::weak_ptr</code>는 참조 카운트를 늘리지 <b>않으면서</b> 객체를 살짝 엿볼 수 있는 포인터로, 이 문제를 해결해요.</p>`,
          code: {
            label: 'weak_ptr.cpp',
            lang: 'cpp',
            src: `struct Node {
    std::shared_ptr<Node> next;
    std::weak_ptr<Node> prev; // weak_ptr로 순환 참조 방지
};

std::shared_ptr<Node> a = std::make_shared<Node>();
std::shared_ptr<Node> b = std::make_shared<Node>();
a->next = b;
b->prev = a; // weak_ptr라서 참조 카운트를 늘리지 않음`,
            out: `(컴파일만 되는 예시 — 순환 참조 없이 안전하게 해제됨)`
          },
          after: `<div class="note"><b>선택 기준</b> — 소유자가 명확히 하나뿐이면 <code>unique_ptr</code>, 여러 곳에서 공유해야 하면 <code>shared_ptr</code>, 소유하지 않고 살짝 참조만 하고 싶으면(특히 순환 구조에서) <code>weak_ptr</code>를 선택해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'std::shared_ptr가 객체를 삭제하는 시점은?',
          '그 객체를 가리키는 마지막 shared_ptr까지 사라졌을 때', ['첫 번째 shared_ptr가 사라지는 즉시', '프로그램이 끝날 때만', '수동으로 delete를 호출했을 때만'],
          'shared_ptr는 참조 카운트가 0이 되는 순간(마지막 소유자가 사라질 때) 자동으로 객체를 삭제해요.',
          '"참조 카운트가 0"이 되는 순간이에요.'
        ),
        () => {
          const n = randInt(2, 4);
          return {
            type: 'blank',
            q: `<code>std::shared_ptr<int> a = std::make_shared<int>(1);</code> 다음 <code>a</code>를 복사해서 총 ${n}개의 shared_ptr가 같은 객체를 가리키게 했을 때, <code>a.use_count()</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `use_count()는 현재 그 객체를 가리키는 shared_ptr의 개수를 알려줘요.`,
            hint: '몇 개가 공유하고 있는지를 세는 값이에요.'
          };
        },
        () => makeChoice(
          'weak_ptr를 쓰는 주된 이유는?',
          '두 객체가 shared_ptr로 서로를 가리키는 순환 참조를 막기 위해', ['shared_ptr보다 항상 빠르기 때문에', '객체를 소유하기 위해서', 'unique_ptr 대신 항상 써야 해서'],
          'weak_ptr는 참조 카운트를 늘리지 않아서, 서로 가리키는 순환 구조에서도 메모리가 안전하게 해제될 수 있게 해줘요.',
          '"순환 참조 방지"가 핵심이에요.'
        ),
        () => makeChoice(
          'shared_ptr와 weak_ptr의 결정적 차이는?',
          'weak_ptr는 참조 카운트를 늘리지 않고 소유권을 갖지 않는다', ['weak_ptr는 절대 nullptr이 될 수 없다', 'shared_ptr는 하나만 만들 수 있다', '둘은 완전히 같은 기능이다'],
          'shared_ptr는 소유권을 공유하며 카운트를 늘리지만, weak_ptr는 소유하지 않고 카운트에 영향을 주지 않아요.',
          '"소유(ownership)" 여부가 핵심 차이예요.'
        ),
        () => ({
          type: 'code',
          q: 'std::make_shared를 이용해 정수 50을 가리키는 shared_ptr<int> p를 만드는 한 줄을 작성하세요.',
          starter: '',
          placeholder: 'std::shared_ptr<int> p = std::make_shared<int>(50);',
          accept: ['std::shared_ptr<int> p = std::make_shared<int>(50);'],
          why: 'make_shared로 안전하게 shared_ptr를 생성해요.',
          hint: 'std::shared_ptr<int> p = std::make_shared<int>(50);'
        }),
      ],
      boss: () => {
        const v = randInt(1, 100);
        return {
          type: 'blank',
          q: `<code>std::shared_ptr<int> a = std::make_shared<int>(${v}); std::shared_ptr<int> b = a; std::shared_ptr<int> c = a; std::cout << a.use_count() << " " << *b;</code>를 실행하면? (형식: 숫자 숫자)`,
          prefix: '', suffix: '', accept: [`3 ${v}`], placeholder: '출력 결과',
          why: `a, b, c 셋 다 같은 객체를 가리키므로 use_count()는 3이고, *b는 ${v}예요.`,
          hint: '몇 개의 shared_ptr가 공유하는지 세어보세요.'
        };
      }
    },
    {
      id: 'moveSemanticsRuleOfFive',
      title: '이동 의미론과 Rule of Five',
      ready: true,
      summary: '불필요한 복사를 없애는 이동 의미론과, rvalue 참조, Rule of Five를 배워요.',
      goals: ['rvalue 참조(&&)란 무엇인가', '이동 생성자/이동 대입 연산자', 'Rule of Five'],
      blocks: [
        {
          h: '복사 대신 "이동" — 불필요한 복사 없애기',
          html: `<p>임시 객체(곧 사라질 값, <b>rvalue</b>)를 대입할 때 굳이 내용을 복사할 필요 없이, 그 자원(예: 힙 메모리 포인터)을 <b>통째로 넘겨받고</b> 원본은 비워버리면 훨씬 효율적이에요. 이를 <b>이동(move)</b>이라고 하고, <code>&&</code>(rvalue 참조)로 이런 임시 값을 받을 수 있어요.</p>`,
          code: {
            label: 'move_basic.cpp',
            lang: 'cpp',
            src: `#include <utility>

class Buffer {
public:
    int* data;
    int size;
    Buffer(int s) : size(s) { data = new int[s]; }
    Buffer(Buffer&& other) noexcept : data(other.data), size(other.size) { // 이동 생성자
        other.data = nullptr; // 원본은 비움(자원을 뺏어옴)
        other.size = 0;
    }
    ~Buffer() { delete[] data; }
};

Buffer makeBuffer() { return Buffer(100); }
Buffer b = makeBuffer(); // 복사 대신 이동이 일어남(효율적)`,
            out: `(불필요한 복사 없이 자원이 그대로 옮겨감)`
          }
        },
        {
          h: 'Rule of Five',
          html: `<p>C++11부터는 이동 기능이 추가되면서 Rule of Three가 <b>Rule of Five</b>로 확장됐어요: <b>소멸자, 복사 생성자, 복사 대입 연산자, 이동 생성자, 이동 대입 연산자</b> — 자원을 직접 관리하는 클래스라면 이 다섯 가지를 함께 고려해야 해요.</p>`,
          code: {
            label: 'rule_of_five.cpp',
            lang: 'cpp',
            src: `class Buffer {
public:
    int* data; int size;
    Buffer(int s) : size(s) { data = new int[s]; }                              // 생성자
    Buffer(const Buffer& o);            // 1. 복사 생성자
    Buffer& operator=(const Buffer& o); // 2. 복사 대입
    Buffer(Buffer&& o) noexcept;        // 3. 이동 생성자
    Buffer& operator=(Buffer&& o) noexcept; // 4. 이동 대입
    ~Buffer();                          // 5. 소멸자
};`,
            out: `(선언만 있는 예시)`
          },
          after: `<div class="note"><b>실무 팁</b> — std::vector나 unique_ptr 같은 표준 라이브러리 멤버만 쓴다면, 컴파일러가 만들어주는 기본 버전으로도 충분한 경우가 많아요. 직접 <code>new</code>/포인터를 관리할 때만 Rule of Five를 신경 쓰면 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '이동(move)이 복사보다 효율적인 이유는?',
          '내용을 복사하지 않고 자원(포인터 등)의 소유권만 넘기기 때문에', ['항상 메모리를 더 적게 쓰기 때문에', '컴파일 시간이 줄어들기 때문에', '이동은 실제로는 복사와 똑같기 때문에'],
          '이동은 값을 하나하나 복사하는 대신 내부 포인터만 옮기고 원본을 비워서 훨씬 빨라요.',
          '"자원 자체를 옮긴다"가 핵심이에요.'
        ),
        () => makeChoice(
          'Rule of Five에 새로 추가된 두 가지는?',
          '이동 생성자와 이동 대입 연산자', ['기본 생성자와 소멸자', '복사 생성자와 복사 대입 연산자', 'static 멤버와 friend 함수'],
          'Rule of Three(소멸자, 복사 생성자, 복사 대입)에 이동 생성자와 이동 대입이 추가되어 Rule of Five가 됐어요.',
          '"이동"이라는 키워드가 붙은 두 가지예요.'
        ),
        () => makeChoice(
          'rvalue 참조(<code>&&</code>)가 받는 값의 종류는?',
          '곧 사라질 임시 값(rvalue)', ['이름이 있는 일반 변수만', 'const 변수만', '포인터만'],
          '<code>&&</code>는 임시 객체처럼 곧 버려질 값을 받아서, 복사 대신 이동할 수 있게 해줘요.',
          '"임시 값"이라는 개념이 핵심이에요.'
        ),
        () => {
          const n = randInt(1, 50);
          return {
            type: 'blank',
            q: `이동 생성자에서 <code>other.data = nullptr;</code>로 원본을 비우는 이유는? ("이중 OO 방지"에서 OO를 한글로)`,
            prefix: '', suffix: ' 방지', accept: ['해제'], placeholder: '해제',
            why: '원본을 비워두지 않으면, 원본과 새 객체가 둘 다 같은 메모리를 delete하려다 이중 해제 문제가 생겨요.',
            hint: '소멸자에서 delete가 두 번 일어나는 것을 막으려는 거예요.'
          };
        },
        () => ({
          type: 'code',
          q: 'int* data 멤버를 가진 Buffer의 이동 생성자를 작성하세요. data를 그대로 받고 원본의 data는 nullptr로 비웁니다.',
          starter: '',
          rows: 3,
          placeholder: 'Buffer(Buffer&& other) noexcept : data(other.data) {\n    other.data = nullptr;\n}',
          accept: ['Buffer(Buffer&& other) noexcept : data(other.data) {\n    other.data = nullptr;\n}'],
          why: '자원(data)을 그대로 넘겨받고, 원본은 비워서 이중 해제를 막아요.',
          hint: 'Buffer(Buffer&& other) noexcept : data(other.data) { other.data = nullptr; }'
        }),
      ],
      boss: () => {
        const size = randInt(2, 6);
        return {
          type: 'blank',
          q: `<code>class Buf { public: int* data; Buf(int s) { data = new int[s]; data[0] = ${size}; } Buf(Buf&& o) noexcept : data(o.data) { o.data = nullptr; } ~Buf() { delete[] data; } }; Buf a(${size}); Buf b = std::move(a); std::cout << (a.data == nullptr) << " " << b.data[0];</code>를 실행하면? (형식: 숫자 숫자)`,
          prefix: '', suffix: '', accept: [`1 ${size}`], placeholder: '출력 결과',
          why: `std::move 이후 a.data는 nullptr(true=1)이 되고, b.data가 원래 값 ${size}를 가져요.`,
          hint: '이동 후 원본은 비워지고 새 객체가 자원을 가져요.'
        };
      }
    },
    {
      id: 'functionTemplates',
      title: '함수 템플릿 — 타입을 매개변수로',
      ready: true,
      summary: '같은 로직을 여러 타입에 대해 반복하지 않도록, 타입 자체를 매개변수로 받는 템플릿을 배워요.',
      goals: ['template<typename T> 문법', '템플릿 함수의 타입 추론', '여러 타입 매개변수 템플릿'],
      blocks: [
        {
          h: '똑같은 로직, 다른 타입 — 오버로딩의 한계',
          html: `<p><code>int max(int, int)</code>, <code>double max(double, double)</code>처럼 타입마다 오버로딩을 반복해서 만드는 건 비효율적이에요. <b>템플릿</b>은 "이 타입이 무엇이든 상관없다"는 뜻의 <code>typename T</code>를 써서, 컴파일러가 실제 호출 시점에 알맞은 타입으로 코드를 자동으로 만들어내게 해요.</p>`,
          code: {
            label: 'function_template.cpp',
            lang: 'cpp',
            src: `template<typename T>
T myMax(T a, T b) {
    return (a > b) ? a : b;
}

std::cout << myMax(3, 7) << std::endl;       // T = int
std::cout << myMax(3.5, 2.1) << std::endl;   // T = double
std::cout << myMax(std::string("가"), std::string("나")) << std::endl; // T = std::string`,
            out: `7\n3.5\n나`
          }
        },
        {
          h: '여러 개의 타입 매개변수',
          html: `<p>템플릿은 타입 매개변수를 여러 개 받을 수도 있어요. <code><T, U></code>처럼 콤마로 나열해요.</p>`,
          code: {
            label: 'multi_template.cpp',
            lang: 'cpp',
            src: `template<typename T, typename U>
void printPair(T a, U b) {
    std::cout << a << " - " << b << std::endl;
}

printPair(1, "하나");     // T=int, U=const char*
printPair(3.14, true);   // T=double, U=bool`,
            out: `1 - 하나\n3.14 - 1`
          },
          after: `<div class="note"><b>참고</b> — 템플릿은 실제로 호출될 때(예: int로, double로) 그 타입에 맞는 코드가 컴파일 시점에 각각 만들어져요. 이 과정을 "템플릿 인스턴스화"라고 해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '함수 템플릿을 쓰는 주된 이유는?',
          '같은 로직을 여러 타입에 대해 매번 오버로딩으로 반복해서 작성하지 않기 위해', ['프로그램 실행 속도를 항상 높이기 위해', '함수의 이름을 숨기기 위해', '변수 타입 검사를 아예 없애기 위해'],
          '템플릿은 타입을 매개변수처럼 다뤄서, 하나의 코드로 여러 타입을 지원할 수 있게 해줘요.',
          '"코드 중복 제거"가 핵심이에요.'
        ),
        () => {
          const a = randInt(1, 50), b = randInt(1, 50);
          return {
            type: 'blank',
            q: `<code>template<typename T> T myMax(T a, T b) { return (a > b) ? a : b; } std::cout << myMax(${a}, ${b});</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(Math.max(a, b))], placeholder: '숫자',
            why: `myMax는 두 값 중 더 큰 값을 반환하므로 ${Math.max(a, b)}가 나와요.`,
            hint: '더 큰 값을 골라줘요.'
          };
        },
        () => makeChoice(
          '<code>template<typename T></code>에서 typename T가 뜻하는 것은?',
          '호출 시점에 결정될 임의의 타입을 나타내는 자리표시자', ['반드시 int만 허용한다는 뜻', '함수 이름의 일부', '반환값이 없다는 뜻'],
          'T는 실제 타입이 나중에 정해지는 자리표시자로, 호출할 때 넘긴 인자의 타입으로 자동 추론돼요.',
          '"타입 자체를 매개변수처럼" 다루는 것이 템플릿이에요.'
        ),
        () => makeChoice(
          '템플릿 함수가 여러 타입으로 호출될 때 일어나는 일은?',
          '컴파일 시점에 각 타입에 맞는 코드가 각각 만들어진다(템플릿 인스턴스화)', ['실행 시점에 매번 타입을 검사한다', '항상 딱 하나의 코드만 만들어진다', '컴파일 오류가 난다'],
          '템플릿은 실제 쓰이는 타입별로 컴파일 시점에 별도의 코드가 생성돼요.',
          '"인스턴스화"라는 용어를 기억하세요.'
        ),
        () => ({
          type: 'code',
          q: '두 값 중 더 작은 값을 반환하는 함수 템플릿 myMin을 작성하세요. (typename T 사용)',
          starter: '',
          rows: 3,
          placeholder: 'template<typename T>\nT myMin(T a, T b) {\n    return (a < b) ? a : b;\n}',
          accept: ['template<typename T>\nT myMin(T a, T b) {\n    return (a < b) ? a : b;\n}'],
          why: 'template<typename T>를 함수 위에 붙이고, 더 작은 값을 반환해요.',
          hint: 'template<typename T> T myMin(T a, T b) { return (a < b) ? a : b; }'
        }),
      ],
      boss: () => {
        const a = randInt(1, 30), b = randInt(1, 30), c = randInt(1, 30);
        const maxVal = Math.max(a, Math.max(b, c));
        return {
          type: 'blank',
          q: `<code>template<typename T> T myMax(T a, T b) { return (a > b) ? a : b; } std::cout << myMax(myMax(${a}, ${b}), ${c});</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(maxVal)], placeholder: '숫자',
          why: `세 값 중 가장 큰 값은 ${maxVal}이에요. myMax를 중첩 호출해서 셋 중 최댓값을 구했어요.`,
          hint: '안쪽 myMax부터 계산해보세요.'
        };
      }
    },
    {
      id: 'classTemplates',
      title: '클래스 템플릿 — 제네릭 클래스 만들기',
      ready: true,
      summary: 'int든 std::string이든 어떤 타입이든 담을 수 있는 클래스를 템플릿으로 만들어봐요.',
      goals: ['template<typename T> class', '템플릿 클래스의 멤버 함수', '템플릿 클래스 사용 시 <타입> 명시'],
      blocks: [
        {
          h: '클래스에도 템플릿을 붙일 수 있어요',
          html: `<p>함수와 마찬가지로 클래스도 <code>template<typename T></code>를 앞에 붙이면, T가 어떤 타입이든 담을 수 있는 <b>제네릭 클래스</b>가 돼요. std::vector도 사실 이렇게 만들어진 템플릿 클래스예요.</p>`,
          code: {
            label: 'class_template.cpp',
            lang: 'cpp',
            src: `template<typename T>
class Box {
private:
    T value;
public:
    Box(T v) : value(v) {}
    T getValue() const { return value; }
};

Box<int> intBox(42);
Box<std::string> strBox("안녕");
std::cout << intBox.getValue() << " " << strBox.getValue() << std::endl;`,
            out: `42 안녕`
          }
        },
        {
          h: '두 가지 타입을 담는 템플릿 클래스',
          html: `<p>여러 타입 매개변수를 받는 클래스 템플릿도 만들 수 있어요. std::pair가 바로 이런 구조예요(다음 단원에서 std::pair 자체를 배워요).</p>`,
          code: {
            label: 'pair_template.cpp',
            lang: 'cpp',
            src: `template<typename K, typename V>
class KeyValue {
public:
    K key;
    V value;
    KeyValue(K k, V v) : key(k), value(v) {}
    void print() const { std::cout << key << ": " << value << std::endl; }
};

KeyValue<std::string, int> kv("나이", 17);
kv.print();`,
            out: `나이: 17`
          },
          after: `<div class="note"><b>참고</b> — <code>Box<int></code>, <code>Box<std::string></code>는 겉으로는 같은 코드처럼 보이지만, 컴파일러 입장에서는 완전히 별개의 타입이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(1, 100);
          return {
            type: 'blank',
            q: `<code>template<typename T> class Box { T v; public: Box(T v) : v(v) {} T get() const { return v; } }; Box<int> b(${n}); std::cout << b.get();</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `get()은 생성자로 넘긴 값 ${n}을 그대로 반환해요.`,
            hint: 'get()이 저장된 값을 그대로 돌려줘요.'
          };
        },
        () => makeChoice(
          '클래스 템플릿을 실제로 쓸 때(<code>Box<int> b(3);</code>처럼) 반드시 해야 하는 것은?',
          '<> 안에 실제 타입을 명시한다', ['생성자를 만들지 않는다', 'private 멤버를 없앤다', '항상 int만 써야 한다'],
          '클래스 템플릿은 함수 템플릿과 달리 타입 추론이 항상 되지는 않아서, <> 안에 타입을 명시하는 경우가 많아요.',
          '<타입> 형태로 명시해요.'
        ),
        () => makeChoice(
          'std::vector가 클래스 템플릿의 대표적인 예인 이유는?',
          'std::vector<int>, std::vector<std::string>처럼 어떤 타입이든 담을 수 있게 만들어졌기 때문에', ['std::vector는 템플릿이 아니기 때문에', 'std::vector는 int만 담을 수 있기 때문에', '클래스 템플릿과 아무 관련이 없기 때문에'],
          'std::vector<T>는 T 자리에 어떤 타입이 와도 동작하는 클래스 템플릿으로 구현되어 있어요.',
          '이미 배운 std::vector를 떠올려보세요.'
        ),
        () => makeChoice(
          '<code>Box<int></code>와 <code>Box<std::string></code>의 관계는?',
          '같은 템플릿에서 나왔지만 컴파일러에게는 완전히 다른 타입이다', ['완전히 같은 타입이다', 'Box<int>가 Box<std::string>을 상속한다', '둘 중 하나만 존재할 수 있다'],
          '템플릿 인스턴스화는 타입마다 독립적인 별개의 타입을 만들어내요.',
          '"별개의 타입"이라는 점이 중요해요.'
        ),
        () => ({
          type: 'code',
          q: 'T 타입 값 하나를 저장하고 반환하는 getValue()를 가진 클래스 템플릿 Holder를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'template<typename T>\nclass Holder {\nprivate:\n    T value;\npublic:\n    Holder(T v) : value(v) {}\n    T getValue() const { return value; }\n};',
          accept: ['template<typename T>\nclass Holder {\nprivate:\n    T value;\npublic:\n    Holder(T v) : value(v) {}\n    T getValue() const { return value; }\n};'],
          why: 'template<typename T>를 클래스 앞에 붙이고, T 타입 멤버와 생성자, getter를 만들어요.',
          hint: 'template<typename T> class Holder { ... T value; ... Holder(T v) : value(v) {} T getValue() const { return value; } };'
        }),
      ],
      boss: () => {
        const s = pick(['하늘', '바다', '숲']);
        const n = randInt(1, 50);
        return {
          type: 'blank',
          q: `<code>template<typename T> class Box { T v; public: Box(T v) : v(v) {} T get() const { return v; } }; Box<std::string> a("${s}"); Box<int> b(${n}); std::cout << a.get() << " " << b.get();</code>를 실행하면? (형식: 문자열 숫자)`,
          prefix: '', suffix: '', accept: [`${s} ${n}`], placeholder: '출력 결과',
          why: '같은 템플릿에서 나온 두 개의 서로 다른 인스턴스가 각각의 값을 저장해요.',
          hint: '각 Box가 담고 있는 값을 순서대로 출력해요.'
        };
      }
    },
    {
      id: 'stlMapSetPair',
      title: 'STL 컨테이너 — map, set, pair',
      ready: true,
      summary: '키-값 쌍을 저장하는 map, 중복 없는 set, 두 값을 묶는 pair를 배워요.',
      goals: ['std::map으로 키-값 저장', 'std::set으로 중복 제거', 'std::pair로 두 값 묶기'],
      blocks: [
        {
          h: 'std::map — 키로 값을 찾는 사전',
          html: `<p><code>std::map<K, V></code>는 <b>키(key)</b>로 <b>값(value)</b>을 찾는 사전과 같아요. 키는 자동으로 정렬된 상태로 저장돼요.</p>`,
          code: {
            label: 'map_basic.cpp',
            lang: 'cpp',
            src: `#include <map>

std::map<std::string, int> scores;
scores["지수"] = 90;
scores["민준"] = 85;

std::cout << scores["지수"] << std::endl;
std::cout << scores.count("서연") << std::endl; // 없는 키 -> 0`,
            out: `90\n0`
          }
        },
        {
          h: 'std::set — 중복 없는 모음, std::pair — 두 값 묶기',
          html: `<p><code>std::set<T></code>는 <b>중복을 허용하지 않는</b> 정렬된 값들의 모음이에요. <code>std::pair<A, B></code>는 서로 다른 타입 두 개를 하나로 묶는 간단한 구조체예요.</p>`,
          code: {
            label: 'set_pair.cpp',
            lang: 'cpp',
            src: `#include <set>
#include <utility>

std::set<int> nums = {3, 1, 2, 3, 1}; // 중복은 자동으로 제거됨
std::cout << nums.size() << std::endl; // 3 (1, 2, 3만 남음)

std::pair<std::string, int> p = {"나이", 17};
std::cout << p.first << ": " << p.second << std::endl;`,
            out: `3\n나이: 17`
          },
          after: `<div class="note"><b>unordered_map</b> — 순서가 중요하지 않고 속도가 중요하다면, 정렬을 하지 않는 대신 더 빠른 <code>std::unordered_map</code>/<code>std::unordered_set</code>을 쓸 수도 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const key = pick(['사과', '바나나', '포도']);
          const val = randInt(1000, 5000);
          return {
            type: 'blank',
            q: `<code>std::map<std::string, int> prices; prices["${key}"] = ${val}; std::cout << prices["${key}"];</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(val)], placeholder: '숫자',
            why: `map은 키 "${key}"에 저장된 값 ${val}을 그대로 돌려줘요.`,
            hint: '[] 로 저장한 값을 그대로 꺼내요.'
          };
        },
        () => makeChoice(
          'std::set의 특징으로 옳은 것은?',
          '중복된 값을 자동으로 하나만 남긴다', ['같은 값을 여러 번 저장할 수 있다', '키-값 쌍을 저장한다', '값을 저장할 수 없다'],
          'set은 값의 중복을 허용하지 않는 컨테이너예요.',
          '"중복 없음"이 핵심 특징이에요.'
        ),
        () => {
          const nums = [randInt(1, 9), randInt(1, 9), randInt(1, 9)];
          const uniq = new Set(nums).size;
          return {
            type: 'blank',
            q: `<code>std::set<int> s = {${nums.join(', ')}}; std::cout << s.size();</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(uniq)], placeholder: '숫자',
            why: `set은 중복을 제거하므로 서로 다른 값의 개수인 ${uniq}가 크기가 돼요.`,
            hint: '같은 값은 한 번만 세어요.'
          };
        },
        () => makeChoice(
          '<code>std::pair<std::string, int> p = {"이름", 5};</code>에서 5에 접근하는 방법은?',
          'p.second', ['p.value', 'p[1]', 'p.get(1)'],
          'pair는 첫 번째 값을 first, 두 번째 값을 second로 접근해요.',
          '"두 번째"라는 뜻의 단어예요.'
        ),
        () => ({
          type: 'code',
          q: 'std::string을 키로, int를 값으로 갖는 map inventory를 선언하고, "사과"에 3을 저장하는 두 줄을 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'std::map<std::string, int> inventory;\ninventory["사과"] = 3;',
          accept: ['std::map<std::string, int> inventory;\ninventory["사과"] = 3;'],
          why: 'map을 선언한 뒤 []로 키에 값을 저장해요.',
          hint: 'std::map<std::string, int> inventory; 다음 줄에 inventory["사과"] = 3;'
        }),
      ],
      boss: () => {
        const nums = [randInt(1, 9), randInt(1, 9), randInt(1, 9), randInt(1, 9)];
        const uniq = new Set(nums).size;
        const key = pick(['국어', '수학', '영어']);
        const val = randInt(60, 100);
        return {
          type: 'blank',
          q: `<code>std::set<int> s = {${nums.join(', ')}}; std::map<std::string, int> m; m["${key}"] = ${val}; std::cout << s.size() << " " << m["${key}"];</code>를 실행하면? (형식: 숫자 숫자)`,
          prefix: '', suffix: '', accept: [`${uniq} ${val}`], placeholder: '출력 결과',
          why: `set은 중복을 제거해 크기가 ${uniq}이고, map은 저장한 값 ${val}을 그대로 반환해요.`,
          hint: 'set의 크기와 map에 저장된 값을 순서대로 출력해요.'
        };
      }
    },
    {
      id: 'iteratorsBasics',
      title: '반복자(iterator) 기초',
      ready: true,
      summary: 'vector, map 등 여러 컨테이너를 똑같은 방식으로 순회할 수 있게 해주는 반복자를 배워요.',
      goals: ['begin()/end()와 반복자', '반복자로 컨테이너 순회하기', 'auto와 함께 쓰기'],
      blocks: [
        {
          h: '반복자 — 컨테이너를 순회하는 공통 방법',
          html: `<p><b>반복자(iterator)</b>는 컨테이너의 각 원소를 가리키며 앞으로 이동할 수 있는 객체예요. <code>begin()</code>은 첫 원소를, <code>end()</code>는 "마지막 원소 다음"을 가리켜요. 포인터처럼 <code>*</code>로 값에 접근하고 <code>++</code>로 다음으로 이동해요.</p>`,
          code: {
            label: 'iterator_basic.cpp',
            lang: 'cpp',
            src: `std::vector<int> nums = {10, 20, 30};

for (std::vector<int>::iterator it = nums.begin(); it != nums.end(); ++it) {
    std::cout << *it << " ";
}
std::cout << std::endl;`,
            out: `10 20 30 `
          }
        },
        {
          h: 'auto로 반복자 타입을 짧게 쓰기',
          html: `<p><code>std::vector<int>::iterator</code>처럼 긴 타입 이름을 매번 쓰기 번거로우니, <code>auto</code>를 쓰면 컴파일러가 알아서 타입을 추론해줘요. map의 반복자는 <code>*it</code>가 <code>std::pair<K, V></code>를 가리켜요.</p>`,
          code: {
            label: 'auto_iterator.cpp',
            lang: 'cpp',
            src: `std::map<std::string, int> scores = {{"지수", 90}, {"민준", 85}};

for (auto it = scores.begin(); it != scores.end(); ++it) {
    std::cout << it->first << ": " << it->second << std::endl;
}`,
            out: `민준: 85\n지수: 90`
          },
          after: `<div class="note"><b>왜 "민준"이 먼저 나올까요?</b> — std::map은 키를 자동으로 정렬해서 저장하기 때문에, 문자열 사전 순서(가나다 순서와 비슷한 바이트 순서)로 "민준"이 "지수"보다 먼저 나와요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '반복자에서 <code>*it</code>가 뜻하는 것은?',
          'it이 현재 가리키고 있는 원소의 값', ['컨테이너의 전체 크기', 'it이 가리키는 원소의 인덱스', '컨테이너 자체'],
          '반복자는 포인터와 비슷하게, *로 역참조하면 현재 가리키는 값을 얻어요.',
          '포인터의 * 역참조와 비슷한 개념이에요.'
        ),
        () => {
          const vals = [randInt(1, 50), randInt(1, 50), randInt(1, 50)];
          return {
            type: 'blank',
            q: `<code>std::vector<int> v = {${vals.join(', ')}}; auto it = v.begin(); std::cout << *it;</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(vals[0])], placeholder: '숫자',
            why: `begin()은 첫 번째 원소를 가리키므로 *it은 ${vals[0]}이에요.`,
            hint: 'begin()은 첫 번째 원소를 가리켜요.'
          };
        },
        () => makeChoice(
          '<code>end()</code>가 가리키는 것은?',
          '마지막 원소의 "바로 다음" 위치(원소가 없는 곳)', ['마지막 원소 자체', '첫 번째 원소', '컨테이너의 중간 지점'],
          'end()는 "마지막 원소 다음"을 가리키는 특별한 위치라서, *end()로 값을 얻으면 안 돼요.',
          '"끝을 지난 지점"이라고 생각하면 돼요.'
        ),
        () => makeChoice(
          '<code>auto it = m.begin();</code>에서 auto를 쓰는 이유는?',
          'std::map<K,V>::iterator처럼 긴 타입 이름을 직접 쓰지 않아도 되게 하려고', ['it의 값을 자동으로 바꾸기 위해서', 'begin()이 auto 타입만 반환해서', 'for문에서만 쓸 수 있는 특수 키워드라서'],
          'auto는 컴파일러가 대입되는 값을 보고 타입을 자동으로 추론하게 해줘요.',
          '"타입 이름을 대신 써준다"고 생각하세요.'
        ),
        () => ({
          type: 'code',
          q: 'vector<int> v를 반복자로 순회하며 각 값을 출력하는 for문을 작성하세요. (auto 사용, v는 이미 선언되어 있다고 가정)',
          starter: '',
          rows: 3,
          placeholder: 'for (auto it = v.begin(); it != v.end(); ++it) {\n    std::cout << *it;\n}',
          accept: ['for (auto it = v.begin(); it != v.end(); ++it) {\n    std::cout << *it;\n}'],
          why: 'begin()부터 end() 전까지 반복자를 이동시키며 값을 출력해요.',
          hint: 'for (auto it = v.begin(); it != v.end(); ++it) { std::cout << *it; }'
        }),
      ],
      boss: () => {
        const vals = [randInt(1, 20), randInt(1, 20), randInt(1, 20)];
        const sum = vals.reduce((a, b) => a + b, 0);
        return {
          type: 'blank',
          q: `<code>std::vector<int> v = {${vals.join(', ')}}; int total = 0; for (auto it = v.begin(); it != v.end(); ++it) { total += *it; } std::cout << total;</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `반복자로 모든 값을 순회하며 더하면 ${vals.join('+')} = ${sum}이에요.`,
          hint: '반복자가 가리키는 값을 모두 더해요.'
        };
      }
    },
    {
      id: 'stlAlgorithms',
      title: 'STL 알고리즘 — <algorithm>',
      ready: true,
      summary: 'sort, find, count_if 등 컨테이너를 다루는 검증된 알고리즘 함수들을 배워요.',
      goals: ['std::sort로 정렬하기', 'std::find로 값 찾기', 'std::count_if로 조건에 맞는 개수 세기'],
      blocks: [
        {
          h: 'std::sort — 정렬을 직접 구현하지 마세요',
          html: `<p><code>&lt;algorithm&gt;</code> 헤더의 <code>std::sort(시작, 끝)</code>은 반복자 범위를 정렬해줘요. 정렬 알고리즘을 직접 짜는 대신 이미 검증된 이 함수를 쓰는 게 훨씬 안전하고 빨라요.</p>`,
          code: {
            label: 'sort_demo.cpp',
            lang: 'cpp',
            src: `#include <algorithm>
#include <vector>

std::vector<int> nums = {5, 2, 8, 1, 9};
std::sort(nums.begin(), nums.end());
for (int n : nums) std::cout << n << " ";
std::cout << std::endl;`,
            out: `1 2 5 8 9 `
          }
        },
        {
          h: 'find와 count_if',
          html: `<p><code>std::find(시작, 끝, 값)</code>은 값을 찾아 그 위치의 반복자를 반환하고(못 찾으면 end()), <code>std::count_if(시작, 끝, 조건함수)</code>는 조건을 만족하는 원소의 개수를 세요.</p>`,
          code: {
            label: 'find_count.cpp',
            lang: 'cpp',
            src: `std::vector<int> nums = {5, 2, 8, 1, 9};

auto it = std::find(nums.begin(), nums.end(), 8);
std::cout << (it != nums.end()) << std::endl; // 1(찾음)

int evenCount = std::count_if(nums.begin(), nums.end(), [](int n) { return n % 2 == 0; });
std::cout << evenCount << std::endl;`,
            out: `1\n1`
          },
          after: `<div class="note"><b>다음 단원 예고</b> — <code>[](int n) { return n % 2 == 0; }</code> 부분은 <b>람다 표현식</b>이라는, 이름 없이 즉석에서 만드는 함수예요. 바로 다음 단원에서 자세히 배워요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const vals = [5, 2, 8, 1, 9].sort(() => Math.random() - 0.5);
          const sorted = [...vals].sort((a, b) => a - b).join(' ');
          return {
            type: 'blank',
            q: `<code>std::vector<int> v = {${vals.join(', ')}}; std::sort(v.begin(), v.end()); for (int n : v) std::cout << n << " ";</code>의 출력은? (공백으로 구분, 끝에 공백 포함)`,
            prefix: '', suffix: '', accept: [sorted + ' '], placeholder: '출력 결과',
            why: 'std::sort는 오름차순으로 정렬해요.',
            hint: '작은 값부터 순서대로예요.'
          };
        },
        () => makeChoice(
          'std::sort(v.begin(), v.end())가 하는 일은?',
          'v의 모든 원소를 오름차순으로 정렬한다', ['v의 값을 모두 지운다', 'v를 뒤집는다', 'v에서 중복을 제거한다'],
          'std::sort는 지정된 범위를 기본적으로 오름차순으로 정렬해줘요.',
          '"정렬"이라는 이름 그대로예요.'
        ),
        () => makeChoice(
          '<code>std::find(v.begin(), v.end(), x)</code>가 x를 찾지 못하면 반환하는 값은?',
          'v.end()', ['-1', 'nullptr', 'v.begin()'],
          '못 찾았을 때는 "찾지 못했다"는 뜻으로 end()를 반환해요.',
          '"끝을 넘었다"는 뜻의 반복자예요.'
        ),
        () => {
          const nums = [randInt(1, 9), randInt(1, 9), randInt(1, 9), randInt(1, 9), randInt(1, 9)];
          const cnt = nums.filter(n => n % 2 === 0).length;
          return {
            type: 'blank',
            q: `<code>std::vector<int> v = {${nums.join(', ')}}; int c = std::count_if(v.begin(), v.end(), [](int n) { return n % 2 == 0; }); std::cout << c;</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(cnt)], placeholder: '숫자',
            why: `짝수의 개수를 세면 ${cnt}개예요.`,
            hint: '조건(짝수)을 만족하는 값의 개수를 세요.'
          };
        },
        () => ({
          type: 'code',
          q: 'vector<int> v를 오름차순으로 정렬하는 한 줄을 작성하세요. (v는 이미 선언되어 있다고 가정, algorithm은 이미 include됨)',
          starter: '',
          placeholder: 'std::sort(v.begin(), v.end());',
          accept: ['std::sort(v.begin(), v.end());'],
          why: 'std::sort에 시작과 끝 반복자를 넘겨서 정렬해요.',
          hint: 'std::sort(v.begin(), v.end());'
        }),
      ],
      boss: () => {
        const nums = [randInt(1, 20), randInt(1, 20), randInt(1, 20), randInt(1, 20)];
        const target = pick(nums);
        const sorted = [...nums].sort((a, b) => a - b).join(' ');
        return {
          type: 'blank',
          q: `<code>std::vector<int> v = {${nums.join(', ')}}; std::sort(v.begin(), v.end()); auto it = std::find(v.begin(), v.end(), ${target}); std::cout << (it != v.end()) << " ";  for (int n : v) std::cout << n << " ";</code>를 실행하면? (형식: 숫자 그리고 정렬된 숫자들, 끝에 공백 포함)`,
          prefix: '', suffix: '', accept: [`1  ${sorted} `], placeholder: '출력 결과',
          why: `${target}은 v 안에 있으므로 find는 성공(1)하고, 정렬된 결과는 ${sorted}예요.`,
          hint: '먼저 찾았는지(1) 출력하고, 그다음 정렬된 값들을 출력해요.'
        };
      }
    },
    {
      id: 'lambdaExpressions',
      title: '람다 표현식 — 이름 없는 함수',
      ready: true,
      summary: '그 자리에서 즉석으로 만들어 쓰는 이름 없는 함수, 람다를 배워요.',
      goals: ['[캡처](매개변수) { 몸체 } 문법', '캡처 리스트([&], [=], [x])', 'STL 알고리즘과 람다 조합'],
      blocks: [
        {
          h: '람다 — 그 자리에서 만드는 함수',
          html: `<p><b>람다 표현식</b>은 이름을 붙이지 않고 그 자리에서 바로 만들어 쓰는 함수예요. <code>[캡처](매개변수) { 몸체 }</code> 형태이고, 주로 <code>std::sort</code>나 <code>std::count_if</code>처럼 "함수를 인자로 받는" 곳에 즉석으로 넘길 때 편해요.</p>`,
          code: {
            label: 'lambda_basic.cpp',
            lang: 'cpp',
            src: `auto add = [](int a, int b) { return a + b; };
std::cout << add(3, 4) << std::endl;

std::vector<int> nums = {5, 3, 8, 1};
std::sort(nums.begin(), nums.end(), [](int a, int b) { return a > b; }); // 내림차순
for (int n : nums) std::cout << n << " ";`,
            out: `7\n8 5 3 1 `
          }
        },
        {
          h: '캡처 리스트 — 바깥 변수 가져오기',
          html: `<p><code>[]</code> 안의 <b>캡처 리스트</b>는 람다 밖에 있는 변수를 안에서 쓸 수 있게 해줘요. <code>[=]</code>는 바깥 변수를 <b>값으로 복사</b>해서 캡처하고, <code>[&]</code>는 <b>참조로</b> 캡처해서 원본을 바꿀 수도 있어요.</p>`,
          code: {
            label: 'lambda_capture.cpp',
            lang: 'cpp',
            src: `int threshold = 5;
std::vector<int> nums = {2, 7, 3, 9, 4};

int countAbove = std::count_if(nums.begin(), nums.end(), [threshold](int n) {
    return n > threshold; // threshold를 값으로 캡처해서 사용
});
std::cout << countAbove << std::endl;`,
            out: `2`
          },
          after: `<div class="note"><b>캡처 종류 요약</b> — <code>[]</code>(아무것도 캡처 안 함), <code>[x]</code>(x만 값으로), <code>[&x]</code>(x만 참조로), <code>[=]</code>(전체를 값으로), <code>[&]</code>(전체를 참조로) 등 상황에 맞게 골라 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 30), b = randInt(1, 30);
          return {
            type: 'blank',
            q: `<code>auto mul = [](int a, int b) { return a * b; }; std::cout << mul(${a}, ${b});</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a * b)], placeholder: '숫자',
            why: `람다 mul은 두 값을 곱해서 반환하므로 ${a} * ${b} = ${a * b}예요.`,
            hint: '두 매개변수를 곱해요.'
          };
        },
        () => makeChoice(
          '람다 표현식의 기본 형태로 옳은 것은?',
          '[캡처](매개변수) { 몸체 }', ['lambda(매개변수) { 몸체 }', 'function(매개변수) => 몸체', 'def(매개변수): 몸체'],
          '람다는 대괄호로 시작하는 캡처 리스트, 매개변수, 중괄호 몸체로 이루어져요.',
          '대괄호 []가 람다의 시작이에요.'
        ),
        () => makeChoice(
          '<code>[threshold](int n) { return n > threshold; }</code>에서 <code>[threshold]</code>가 하는 일은?',
          '람다 밖에 있는 threshold 변수를 값으로 캡처해서 람다 안에서 쓸 수 있게 한다', ['threshold를 매개변수로 받는다', 'threshold를 항상 0으로 초기화한다', '캡처 없이 새로 선언한다'],
          '캡처 리스트에 변수 이름을 적으면, 바깥의 그 변수를 값으로 복사해 람다 안에서 사용할 수 있어요.',
          '"바깥 변수를 가져다 쓴다"는 개념이에요.'
        ),
        () => makeChoice(
          '<code>[&]</code> 캡처와 <code>[=]</code> 캡처의 차이는?',
          '[&]는 참조로 캡처해서 원본을 바꿀 수 있고, [=]는 값으로 복사해서 원본에 영향이 없다', ['[&]는 아무것도 캡처하지 않는다', '[=]는 매개변수를 받을 수 없다', '둘은 완전히 같다'],
          '&는 참조 캡처(원본 공유), =는 값 캡처(복사본)라는 뜻이에요.',
          '변수 앞에 붙이는 & 참조 기호를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '두 정수를 받아 큰 값을 반환하는 람다를 만들어 변수 myMax에 저장하는 한 줄을 작성하세요.',
          starter: '',
          placeholder: 'auto myMax = [](int a, int b) { return a > b ? a : b; };',
          accept: ['auto myMax = [](int a, int b) { return a > b ? a : b; };'],
          why: '람다를 auto 변수에 저장해서 나중에 함수처럼 호출할 수 있어요.',
          hint: 'auto myMax = [](int a, int b) { return a > b ? a : b; };'
        }),
      ],
      boss: () => {
        const nums = [randInt(1, 30), randInt(1, 30), randInt(1, 30), randInt(1, 30)];
        const th = randInt(5, 20);
        const cnt = nums.filter(n => n > th).length;
        return {
          type: 'blank',
          q: `<code>std::vector<int> v = {${nums.join(', ')}}; int th = ${th}; int c = std::count_if(v.begin(), v.end(), [th](int n) { return n > th; }); std::cout << c;</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(cnt)], placeholder: '숫자',
          why: `${th}보다 큰 값의 개수는 ${cnt}개예요.`,
          hint: 'th보다 큰 값이 몇 개인지 세어보세요.'
        };
      }
    },
    {
      id: 'exceptionHandling',
      title: '예외 처리 — try/catch/throw',
      ready: true,
      summary: '예상치 못한 오류 상황을 안전하게 처리하는 예외 처리 문법을 배워요.',
      goals: ['throw로 예외 던지기', 'try/catch로 예외 잡기', 'std::exception 계층'],
      blocks: [
        {
          h: 'throw와 try/catch',
          html: `<p><code>throw</code>는 문제가 생겼을 때 "예외"라는 특별한 값을 던지는 키워드예요. <code>try</code> 블록 안에서 발생한 예외는 그 뒤에 오는 <code>catch</code> 블록이 잡아서 처리해요.</p>`,
          code: {
            label: 'try_catch.cpp',
            lang: 'cpp',
            src: `double divide(double a, double b) {
    if (b == 0) throw std::runtime_error("0으로 나눌 수 없어요");
    return a / b;
}

try {
    std::cout << divide(10, 0) << std::endl;
} catch (const std::runtime_error& e) {
    std::cout << "오류: " << e.what() << std::endl;
}`,
            out: `오류: 0으로 나눌 수 없어요`
          }
        },
        {
          h: 'std::exception 계층 구조',
          html: `<p>C++ 표준 라이브러리의 예외 타입들은 <code>std::exception</code>을 부모로 하는 계층 구조예요(<code>std::runtime_error</code>, <code>std::logic_error</code>, <code>std::out_of_range</code> 등). 모두 <code>what()</code> 메서드로 오류 메시지를 얻을 수 있어요.</p>`,
          code: {
            label: 'exception_hierarchy.cpp',
            lang: 'cpp',
            src: `try {
    std::vector<int> v = {1, 2, 3};
    std::cout << v.at(10) << std::endl; // 범위를 벗어난 접근
} catch (const std::out_of_range& e) {
    std::cout << "범위 오류: " << e.what() << std::endl;
} catch (const std::exception& e) { // 그 외 모든 표준 예외
    std::cout << "다른 오류: " << e.what() << std::endl;
}`,
            out: `범위 오류: vector::_M_range_check`
          },
          after: `<div class="note"><b>[] vs at()</b> — vector의 <code>[]</code>는 범위를 벗어나도 검사하지 않지만, <code>at()</code>은 범위를 검사해서 벗어나면 <code>std::out_of_range</code> 예외를 던져줘요. 안전성이 중요한 곳에서는 at()을 써요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'try/catch를 쓰는 목적은?',
          '예상치 못한 오류 상황을 프로그램이 멈추지 않고 안전하게 처리하기 위해', ['프로그램 실행 속도를 높이기 위해', '변수를 자동으로 선언하기 위해', '함수 오버로딩을 가능하게 하기 위해'],
          '예외 처리는 오류가 발생해도 프로그램이 무너지지 않고 적절히 대응할 수 있게 해줘요.',
          '"안전한 오류 대응"이 핵심이에요.'
        ),
        () => makeChoice(
          '<code>throw std::runtime_error("메시지");</code>가 하는 일은?',
          'runtime_error 타입의 예외를 발생시켜, 이를 처리할 catch 블록을 찾게 한다', ['프로그램을 즉시 강제 종료한다', '메시지를 화면에 바로 출력한다', '아무 일도 하지 않는다'],
          'throw는 예외를 던져서, 가장 가까운 알맞은 catch 블록이 처리하게 해요.',
          '"던지고, 잡는다"는 비유를 떠올려보세요.'
        ),
        () => makeChoice(
          '예외 객체의 <code>what()</code> 메서드가 반환하는 것은?',
          '오류에 대한 설명 메시지', ['예외가 발생한 줄 번호', '프로그램 종료 코드', '아무것도 반환하지 않는다'],
          'what()은 그 예외가 왜 발생했는지 설명하는 문자열을 반환해요.',
          '"오류가 무엇(what)인지" 설명해줘요.'
        ),
        () => makeChoice(
          'vector의 <code>[]</code>와 <code>at()</code>의 차이는?',
          'at()은 범위를 검사해 벗어나면 예외를 던지지만, []는 검사하지 않는다', ['[]가 항상 더 안전하다', '둘은 완전히 똑같다', 'at()은 값을 읽을 수만 있고 쓸 수는 없다'],
          'at()은 범위 검사를 해주는 안전한 버전이고, []는 속도를 위해 검사를 생략해요.',
          '"안전성 검사 여부"가 차이예요.'
        ),
        () => ({
          type: 'code',
          q: 'b가 0이면 std::runtime_error("나눌 수 없음")을 던지고, 아니면 a/b를 반환하는 함수 safeDivide를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'double safeDivide(double a, double b) {\n    if (b == 0) throw std::runtime_error("나눌 수 없음");\n    return a / b;\n}',
          accept: ['double safeDivide(double a, double b) {\n    if (b == 0) throw std::runtime_error("나눌 수 없음");\n    return a / b;\n}'],
          why: '조건을 검사해 문제가 있으면 throw로 예외를 던지고, 아니면 정상적으로 값을 반환해요.',
          hint: 'if (b == 0) throw std::runtime_error("나눌 수 없음"); return a / b;'
        }),
      ],
      boss: () => {
        const a = randInt(10, 100);
        return {
          type: 'blank',
          q: `<code>double div(double a, double b) { if (b == 0) throw std::runtime_error("0으로 나눔"); return a / b; } try { std::cout << div(${a}, 0); } catch (const std::exception& e) { std::cout << "잡음: " << e.what(); }</code>를 실행하면?`,
          prefix: '', suffix: '', accept: ['잡음: 0으로 나눔'], placeholder: '출력 결과',
          why: 'b가 0이라 예외가 던져지고, catch 블록이 std::exception&으로 이를 잡아 메시지를 출력해요.',
          hint: 'runtime_error도 std::exception의 자식이라 catch(const std::exception&)로 잡을 수 있어요.'
        };
      }
    },
    {
      id: 'namespaces',
      title: '네임스페이스 — 이름 충돌 방지',
      ready: true,
      summary: '큰 프로그램에서 이름이 겹치는 걸 막아주는 네임스페이스를 배워요.',
      goals: ['namespace 선언 문법', '네임스페이스::이름으로 접근', 'using으로 간단히 쓰기'],
      blocks: [
        {
          h: '네임스페이스 — 이름을 위한 울타리',
          html: `<p>큰 프로그램에서 여러 사람이 만든 코드를 합치다 보면 같은 이름의 함수/클래스가 겹칠 수 있어요. <code>namespace</code>는 이름들을 하나의 울타리 안에 묶어서, <code>울타리이름::이름</code>으로 구분해 접근하게 해줘요. <code>std::cout</code>의 <code>std</code>도 사실 네임스페이스예요.</p>`,
          code: {
            label: 'namespace_basic.cpp',
            lang: 'cpp',
            src: `namespace Game {
    int score = 0;
    void addScore(int n) { score += n; }
}

Game::addScore(10);
std::cout << Game::score << std::endl;`,
            out: `10`
          }
        },
        {
          h: '이름이 겹칠 때 네임스페이스가 빛을 발해요',
          html: `<p>서로 다른 네임스페이스에 있으면 <b>같은 이름</b>의 함수를 각각 만들어도 충돌하지 않아요.</p>`,
          code: {
            label: 'namespace_conflict.cpp',
            lang: 'cpp',
            src: `namespace Math1 {
    int add(int a, int b) { return a + b; }
}
namespace Math2 {
    int add(int a, int b) { return a + b + 100; } // 이름은 같지만 다른 네임스페이스
}

std::cout << Math1::add(1, 2) << std::endl;
std::cout << Math2::add(1, 2) << std::endl;`,
            out: `3\n103`
          },
          after: `<div class="note"><b>using namespace</b> — <code>using namespace Game;</code>를 쓰면 그 뒤로는 <code>Game::</code>을 생략하고 <code>addScore(10);</code>처럼 쓸 수 있지만, 이름 충돌 위험이 있으니 큰 프로젝트에서는 신중히 써요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '네임스페이스를 쓰는 주된 목적은?',
          '큰 프로그램에서 이름이 우연히 겹치는 것을 막기 위해', ['프로그램 실행 속도를 높이기 위해', '변수를 자동으로 삭제하기 위해', '함수를 오버로딩하지 못하게 막기 위해'],
          '네임스페이스는 이름들을 그룹으로 묶어서, 같은 이름이 다른 그룹에 있으면 충돌 없이 공존하게 해줘요.',
          '"이름 충돌 방지"가 핵심이에요.'
        ),
        () => {
          const n = randInt(1, 50);
          return {
            type: 'blank',
            q: `<code>namespace Util { int square(int x) { return x * x; } } std::cout << Util::square(${n});</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n * n)], placeholder: '숫자',
            why: `Util 네임스페이스 안의 square(${n})는 ${n}*${n}=${n * n}을 반환해요.`,
            hint: 'square는 값을 제곱해요.'
          };
        },
        () => makeChoice(
          '<code>std::cout</code>에서 <code>std</code>는 무엇인가요?',
          '표준 라이브러리 전체를 담고 있는 네임스페이스', ['클래스 이름', '변수 이름', '함수 이름'],
          'std는 C++ 표준 라이브러리의 모든 이름을 담고 있는 네임스페이스예요.',
          '이미 첫 단원부터 계속 써온 그 이름이에요.'
        ),
        () => makeChoice(
          '서로 다른 네임스페이스 A와 B에 각각 <code>add</code>라는 함수가 있을 때 벌어지는 일은?',
          '이름이 같아도 충돌 없이 A::add와 B::add로 구분해서 각각 쓸 수 있다', ['컴파일 오류가 난다', '나중에 정의된 것으로 자동 통합된다', '둘 중 하나는 강제로 이름이 바뀐다'],
          '네임스페이스로 구분되면 이름이 같아도 서로 다른 것으로 취급되어 충돌하지 않아요.',
          '":: 로 구분되면 서로 다른 이름"이라고 생각하세요.'
        ),
        () => ({
          type: 'code',
          q: 'MyLib라는 네임스페이스 안에 int triple(int x) { return x * 3; } 함수를 정의하세요.',
          starter: '',
          rows: 3,
          placeholder: 'namespace MyLib {\n    int triple(int x) { return x * 3; }\n}',
          accept: ['namespace MyLib {\n    int triple(int x) { return x * 3; }\n}'],
          why: 'namespace 이름 { } 안에 함수를 넣으면 그 네임스페이스에 속하게 돼요.',
          hint: 'namespace MyLib { int triple(int x) { return x * 3; } }'
        }),
      ],
      boss: () => {
        const a = randInt(1, 20), b = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>namespace V1 { int add(int a, int b) { return a + b; } } namespace V2 { int add(int a, int b) { return (a + b) * 2; } } std::cout << V1::add(${a}, ${b}) << " " << V2::add(${a}, ${b});</code>를 실행하면? (형식: 숫자 숫자)`,
          prefix: '', suffix: '', accept: [`${a + b} ${(a + b) * 2}`], placeholder: '출력 결과',
          why: `V1::add는 ${a}+${b}=${a + b}, V2::add는 그 두 배인 ${(a + b) * 2}를 반환해요.`,
          hint: '각 네임스페이스의 add가 서로 다르게 동작해요.'
        };
      }
    },
    {
      id: 'fileIOStreams',
      title: '파일 입출력 — fstream',
      ready: true,
      summary: 'ifstream/ofstream으로 파일에 데이터를 쓰고 읽는 방법을 배워요.',
      goals: ['std::ofstream으로 파일 쓰기', 'std::ifstream으로 파일 읽기', '파일이 열렸는지 확인하기'],
      blocks: [
        {
          h: 'ofstream — 파일에 쓰기',
          html: `<p><code>&lt;fstream&gt;</code> 헤더의 <code>std::ofstream</code>은 파일에 쓰기 위한 스트림이에요. <code>std::cout</code>과 똑같이 <code><<</code>로 값을 흘려보내면 파일에 저장돼요.</p>`,
          code: {
            label: 'write_file.cpp',
            lang: 'cpp',
            src: `#include <fstream>

std::ofstream out("scores.txt");
if (out.is_open()) {
    out << "지수 90" << std::endl;
    out << "민준 85" << std::endl;
    out.close();
}`,
            out: `(scores.txt 파일에 두 줄이 저장됨)`
          }
        },
        {
          h: 'ifstream — 파일에서 읽기',
          html: `<p><code>std::ifstream</code>은 파일에서 읽는 스트림이에요. <code>std::cin</code>처럼 <code>>></code>나 <code>getline</code>으로 값을 읽어올 수 있어요.</p>`,
          code: {
            label: 'read_file.cpp',
            lang: 'cpp',
            src: `std::ifstream in("scores.txt");
std::string name;
int score;
while (in >> name >> score) {
    std::cout << name << "의 점수: " << score << std::endl;
}
in.close();`,
            out: `지수의 점수: 90\n민준의 점수: 85`
          },
          after: `<div class="note"><b>is_open() 확인 습관</b> — 파일이 존재하지 않거나 권한이 없으면 열기가 실패할 수 있어서, 실제 코드를 쓰기 전에 <code>if (out.is_open())</code>처럼 성공 여부를 확인하는 습관이 중요해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '파일에 데이터를 쓰기 위해 쓰는 클래스는?',
          'std::ofstream', ['std::ifstream', 'std::sstream', 'std::cin'],
          'ofstream은 "output file stream"의 줄임말로, 파일에 쓰기 위한 스트림이에요.',
          'o가 "output(출력)"을 뜻해요.'
        ),
        () => makeChoice(
          '파일에서 데이터를 읽기 위해 쓰는 클래스는?',
          'std::ifstream', ['std::ofstream', 'std::cout', 'std::endl'],
          'ifstream은 "input file stream"의 줄임말로, 파일을 읽기 위한 스트림이에요.',
          'i가 "input(입력)"을 뜻해요.'
        ),
        () => makeChoice(
          '<code>if (out.is_open())</code>을 확인하는 이유는?',
          '파일이 실제로 성공적으로 열렸는지 확인하기 위해서', ['파일 크기를 알기 위해서', '파일을 자동으로 삭제하기 위해서', '항상 필요한 건 아니라 생략해도 무방하다'],
          '파일 열기는 권한 문제나 경로 오류로 실패할 수 있어서, 실제 작업 전에 성공 여부를 확인해야 안전해요.',
          '"성공적으로 열렸는지"를 확인하는 습관이에요.'
        ),
        () => {
          const name = pick(['지수', '민준']);
          const score = randInt(60, 100);
          return {
            type: 'blank',
            q: `<code>std::ifstream in("data.txt"); std::string name; int score; in >> name >> score;</code>에서 파일 첫 줄이 "${name} ${score}"라면, <code>score</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(score)], placeholder: '숫자',
            why: `>>는 공백으로 구분해서 순서대로 읽으므로, 두 번째 값 ${score}가 score에 들어가요.`,
            hint: '첫 값은 name, 두 번째 값은 score로 들어가요.'
          };
        },
        () => ({
          type: 'code',
          q: '"log.txt" 파일을 쓰기용으로 열어 "시작"이라는 문자열을 쓰고 파일을 닫는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'std::ofstream out("log.txt");\nout << "시작";\nout.close();',
          accept: ['std::ofstream out("log.txt");\nout << "시작";\nout.close();'],
          why: 'ofstream으로 파일을 열고, <<로 값을 쓴 뒤 close()로 닫아요.',
          hint: 'std::ofstream out("log.txt"); out << "시작"; out.close();'
        }),
      ],
      boss: () => {
        const n1 = randInt(60, 100), n2 = randInt(60, 100);
        return {
          type: 'blank',
          q: `<code>std::ifstream in("scores.txt");</code>로 연 파일에 "A ${n1}"과 "B ${n2}" 두 줄이 있을 때, <code>std::string name; int score; int total = 0; while (in >> name >> score) { total += score; } std::cout << total;</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(n1 + n2)], placeholder: '숫자',
          why: `두 줄의 점수를 모두 더하면 ${n1} + ${n2} = ${n1 + n2}예요.`,
          hint: 'while문이 파일 끝까지 각 줄의 점수를 total에 더해요.'
        };
      }
    },
    {
      id: 'autoTypeInference',
      title: 'auto — 타입 자동 추론',
      ready: true,
      summary: '컴파일러가 변수의 타입을 대신 추론해주는 auto 키워드를 배워요.',
      goals: ['auto의 타입 추론 원리', 'auto를 쓰기 좋은 상황', 'auto 사용 시 주의점'],
      blocks: [
        {
          h: 'auto — 대입되는 값을 보고 타입을 추론',
          html: `<p><code>auto</code>로 변수를 선언하면, 오른쪽에 대입되는 값을 보고 컴파일러가 <b>알아서 타입을 정해줘요</b>. 타입을 안 쓴다고 타입이 없어지는 게 아니라, 컴파일 시점에 이미 정확한 타입으로 정해져요(동적 타입 언어와는 다른 개념이에요).</p>`,
          code: {
            label: 'auto_basic.cpp',
            lang: 'cpp',
            src: `auto x = 10;          // int로 추론
auto y = 3.14;         // double로 추론
auto s = std::string("안녕"); // std::string으로 추론

std::cout << x << " " << y << " " << s << std::endl;`,
            out: `10 3.14 안녕`
          }
        },
        {
          h: 'auto가 특히 유용한 상황',
          html: `<p><code>std::map<std::string, std::vector<int>>::iterator</code>처럼 <b>타입 이름이 아주 길어질 때</b>, auto를 쓰면 코드가 훨씬 읽기 편해져요. 특히 반복자나 람다를 저장할 때 자주 써요.</p>`,
          code: {
            label: 'auto_useful.cpp',
            lang: 'cpp',
            src: `std::vector<std::pair<std::string, int>> data = {{"지수", 90}, {"민준", 85}};

for (auto it = data.begin(); it != data.end(); ++it) {
    std::cout << it->first << ": " << it->second << std::endl;
}`,
            out: `지수: 90\n민준: 85`
          },
          after: `<div class="note"><b>주의</b> — auto는 편리하지만, 남용하면 코드를 읽는 사람이 실제 타입을 짐작하기 어려워질 수 있어요. 타입이 명확할 때는 그대로 쓰는 것도 좋은 선택이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>auto x = 3.14;</code>에서 x의 실제 타입은?',
          'double', ['int', 'std::string', '타입이 정해지지 않는다'],
          '3.14는 소수점이 있는 리터럴이라 double로 추론돼요.',
          '소수점이 있는 숫자는 보통 double이에요.'
        ),
        () => makeChoice(
          'auto의 타입 추론이 일어나는 시점은?',
          '컴파일 시점 — 실행 전에 이미 정확한 타입으로 확정된다', ['실행 시점마다 매번 다시 추론된다', '프로그램이 끝날 때', '추론되지 않고 항상 변할 수 있다'],
          'C++의 auto는 컴파일 시점에 타입이 완전히 고정되는 정적 타입 추론이에요.',
          '파이썬 같은 동적 타입과 다르다는 점이 중요해요.'
        ),
        () => {
          const s = pick(['하늘', '바다', '숲']);
          return {
            type: 'blank',
            q: `<code>auto name = std::string("${s}"); std::cout << name;</code>의 출력은?`,
            prefix: '', suffix: '', accept: [s], placeholder: '출력 결과',
            why: 'auto는 대입된 std::string 값을 그대로 저장해요.',
            hint: 'name에 저장된 문자열이 그대로 출력돼요.'
          };
        },
        () => makeChoice(
          'auto를 쓰기 좋은 대표적인 상황은?',
          '반복자처럼 타입 이름이 아주 길어서 직접 쓰기 번거로울 때', ['타입을 절대 알고 싶지 않을 때', '변수를 선언하지 않으려 할 때', '함수의 반환 타입을 void로 만들고 싶을 때'],
          '긴 반복자 타입 등을 auto로 대체하면 코드가 훨씬 간결하고 읽기 편해져요.',
          '"타입 이름이 길 때" 진가를 발휘해요.'
        ),
        () => ({
          type: 'code',
          q: 'auto를 이용해 정수 100을 담는 변수 count를 선언하는 한 줄을 작성하세요.',
          starter: '',
          placeholder: 'auto count = 100;',
          accept: ['auto count = 100;'],
          why: '100은 정수 리터럴이라 auto가 int로 추론해줘요.',
          hint: 'auto count = 100;'
        }),
      ],
      boss: () => {
        const pairs = [[pick(['가', '나']), randInt(1, 100)], [pick(['다', '라']), randInt(1, 100)]];
        return {
          type: 'blank',
          q: `<code>std::vector<std::pair<std::string, int>> data = {{"${pairs[0][0]}", ${pairs[0][1]}}, {"${pairs[1][0]}", ${pairs[1][1]}}}; int total = 0; for (auto it = data.begin(); it != data.end(); ++it) { total += it->second; } std::cout << total;</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(pairs[0][1] + pairs[1][1])], placeholder: '숫자',
          why: `각 pair의 second 값을 더하면 ${pairs[0][1]} + ${pairs[1][1]} = ${pairs[0][1] + pairs[1][1]}이에요.`,
          hint: 'it->second로 각 pair의 두 번째 값에 접근해요.'
        };
      }
    },
    {
      id: 'rangeBasedFor',
      title: '범위 기반 for문',
      ready: true,
      summary: '반복자나 인덱스 없이, 컨테이너의 값을 훨씬 간결하게 순회하는 문법을 배워요.',
      goals: ['for (auto x : container) 문법', '참조로 순회하며 값 바꾸기(auto&)', 'const auto&로 안전하게 읽기'],
      blocks: [
        {
          h: '범위 기반 for — 훨씬 간결한 순회',
          html: `<p><code>for (auto x : container)</code>는 반복자나 인덱스를 신경 쓰지 않고 컨테이너의 모든 값을 순서대로 하나씩 <code>x</code>에 담아줘요. 읽기만 할 때 가장 깔끔한 방법이에요.</p>`,
          code: {
            label: 'range_for.cpp',
            lang: 'cpp',
            src: `std::vector<int> nums = {10, 20, 30};
for (auto n : nums) {
    std::cout << n << " ";
}
std::cout << std::endl;`,
            out: `10 20 30 `
          }
        },
        {
          h: '참조로 순회하기 — auto&, const auto&',
          html: `<p><code>for (auto x : nums)</code>는 매번 값을 <b>복사</b>해요. 값을 <b>바꾸고 싶다면</b> <code>auto&</code>(참조)로, 복사도 하지 않고 <b>바꾸지도 않을 거라면</b> <code>const auto&</code>로 순회하는 게 효율적이에요.</p>`,
          code: {
            label: 'range_for_ref.cpp',
            lang: 'cpp',
            src: `std::vector<int> nums = {1, 2, 3};
for (auto& n : nums) {
    n *= 10; // 참조라서 원본이 실제로 바뀜
}
for (const auto& n : nums) { // 복사 없이 읽기만
    std::cout << n << " ";
}`,
            out: `10 20 30 `
          },
          after: `<div class="note"><b>선택 기준</b> — 값이 작은 타입(int 등)은 그냥 <code>auto</code>로도 충분하지만, std::string이나 큰 객체를 읽기만 할 때는 복사 비용을 줄이기 위해 <code>const auto&</code>를 습관적으로 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const vals = [randInt(1, 30), randInt(1, 30), randInt(1, 30)];
          const sum = vals.reduce((a, b) => a + b, 0);
          return {
            type: 'blank',
            q: `<code>std::vector<int> v = {${vals.join(', ')}}; int total = 0; for (auto n : v) { total += n; } std::cout << total;</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
            why: `범위 기반 for로 모든 값을 더하면 ${vals.join('+')} = ${sum}이에요.`,
            hint: '컨테이너의 모든 값을 하나씩 더해요.'
          };
        },
        () => makeChoice(
          '<code>for (auto n : v)</code>에서 n을 바꿔도 원본 v가 바뀌지 않는 이유는?',
          'n은 각 원소의 복사본이기 때문에', ['for문 안에서는 값을 바꿀 수 없어서', 'v가 const로 선언되어서', '컴파일 오류가 나서'],
          'auto(참조 아님)로 순회하면 매번 값을 복사해서 n에 담기 때문에 원본과 무관해요.',
          '"복사본"이라는 점이 핵심이에요.'
        ),
        () => {
          const vals = [randInt(1, 10), randInt(1, 10), randInt(1, 10)];
          const doubled = vals.map(v => v * 2).join(' ');
          return {
            type: 'blank',
            q: `<code>std::vector<int> v = {${vals.join(', ')}}; for (auto& n : v) { n *= 2; } for (auto n : v) std::cout << n << " ";</code>의 출력은? (끝에 공백 포함)`,
            prefix: '', suffix: '', accept: [doubled + ' '], placeholder: '출력 결과',
            why: 'auto&로 순회하면 원본이 실제로 바뀌어서, 각 값이 2배가 돼요.',
            hint: '참조로 순회하면 원본 값 자체가 바뀌어요.'
          };
        },
        () => makeChoice(
          '큰 객체(예: std::string)를 읽기만 하며 순회할 때 권장되는 방식은?',
          'const auto&', ['auto(값 복사)', 'auto*', 'auto&&만 사용'],
          'const auto&는 복사 비용 없이 안전하게 읽기만 할 수 있어서 효율적이에요.',
          '"복사 없이 + 수정 방지"를 동시에 만족하는 방식이에요.'
        ),
        () => ({
          type: 'code',
          q: 'vector<std::string> names의 모든 값을 범위 기반 for문(const auto&)으로 출력하는 코드를 작성하세요. (names는 이미 선언되어 있다고 가정)',
          starter: '',
          rows: 3,
          placeholder: 'for (const auto& name : names) {\n    std::cout << name;\n}',
          accept: ['for (const auto& name : names) {\n    std::cout << name;\n}'],
          why: 'const auto&로 복사 없이 각 이름을 읽어서 출력해요.',
          hint: 'for (const auto& name : names) { std::cout << name; }'
        }),
      ],
      boss: () => {
        const vals = [randInt(1, 15), randInt(1, 15), randInt(1, 15)];
        const inc = vals.map(v => v + 1);
        const sum = inc.reduce((a, b) => a + b, 0);
        return {
          type: 'blank',
          q: `<code>std::vector<int> v = {${vals.join(', ')}}; for (auto& n : v) { n += 1; } int total = 0; for (const auto& n : v) { total += n; } std::cout << total;</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `각 값에 1을 더한 뒤(${inc.join(', ')}) 모두 합하면 ${sum}이에요.`,
          hint: '먼저 참조로 값을 1씩 늘리고, 그다음 모두 더해요.'
        };
      }
    },
    {
      id: 'optionalPairTuple',
      title: 'std::optional, tuple, 구조적 바인딩',
      ready: true,
      summary: '값이 없을 수도 있음을 표현하는 optional과, 여러 값을 한 번에 다루는 tuple/구조적 바인딩을 배워요.',
      goals: ['std::optional<T>로 "값이 없을 수도 있음" 표현', 'std::tuple로 여러 값 묶기', '구조적 바인딩(auto [a, b])'],
      blocks: [
        {
          h: 'std::optional — "값이 있을 수도, 없을 수도"',
          html: `<p>함수가 항상 값을 반환할 수 없을 때(예: 찾는 값이 없을 때), 예전에는 -1이나 nullptr 같은 특수한 값으로 "없음"을 표현했어요. <code>std::optional<T></code>는 <b>"값이 있음" 또는 "값이 없음"을 명확하게</b> 표현하는 타입이에요.</p>`,
          code: {
            label: 'optional_basic.cpp',
            lang: 'cpp',
            src: `#include <optional>

std::optional<int> findAge(std::string name) {
    if (name == "지수") return 17;
    return std::nullopt; // 값이 없음을 명시
}

auto result = findAge("모름");
if (result.has_value()) {
    std::cout << *result << std::endl;
} else {
    std::cout << "찾을 수 없어요" << std::endl;
}`,
            out: `찾을 수 없어요`
          }
        },
        {
          h: 'tuple과 구조적 바인딩',
          html: `<p><code>std::tuple</code>은 <code>pair</code>를 확장해서 <b>세 개 이상</b>의 값을 하나로 묶어요. C++17부터는 <code>auto [a, b, c] = ...</code> 형태의 <b>구조적 바인딩</b>으로, tuple이나 pair의 각 값을 이름 붙은 변수로 한 번에 꺼낼 수 있어요.</p>`,
          code: {
            label: 'tuple_binding.cpp',
            lang: 'cpp',
            src: `#include <tuple>

std::tuple<std::string, int, double> student = {"민준", 17, 92.5};
auto [name, age, score] = student; // 구조적 바인딩
std::cout << name << " " << age << " " << score << std::endl;`,
            out: `민준 17 92.5`
          },
          after: `<div class="note"><b>참고</b> — 구조적 바인딩은 <code>std::pair</code>, <code>std::tuple</code>뿐 아니라 struct에도 쓸 수 있어요: <code>auto [x, y] = point;</code>처럼요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'std::optional<int>를 쓰는 이유는?',
          '값이 있을 수도, 없을 수도 있는 상황을 명확하게 표현하기 위해', ['int보다 항상 메모리를 적게 쓰기 위해', '함수가 여러 값을 반환하게 하려고', '정수 연산 속도를 높이기 위해'],
          'optional은 "값 없음"을 -1 같은 특수 값이 아니라 타입 시스템으로 명확히 표현해요.',
          '"값의 있음/없음"이 핵심 개념이에요.'
        ),
        () => makeChoice(
          '<code>std::optional<int> r = std::nullopt;</code>에서 <code>r.has_value()</code>의 값은?',
          'false', ['true', '0', '컴파일 오류'],
          'std::nullopt는 "값이 없음"을 뜻하므로 has_value()는 false예요.',
          '"없음"을 나타내는 특수 값이에요.'
        ),
        () => {
          const name = pick(['서연', '하늘', '지호']);
          const age = randInt(10, 19);
          return {
            type: 'blank',
            q: `<code>std::tuple<std::string, int> t = {"${name}", ${age}}; auto [n, a] = t; std::cout << n << " " << a;</code>의 출력은? (형식: 이름 숫자)`,
            prefix: '', suffix: '', accept: [`${name} ${age}`], placeholder: '출력 결과',
            why: '구조적 바인딩이 tuple의 각 값을 순서대로 n, a에 담아요.',
            hint: '첫 번째 값은 n, 두 번째 값은 a에 들어가요.'
          };
        },
        () => makeChoice(
          '구조적 바인딩(<code>auto [a, b] = pair;</code>)의 장점은?',
          'pair.first, pair.second 대신 의미 있는 이름으로 값을 바로 꺼낼 수 있다', ['pair를 tuple로 자동 변환해준다', '값을 복사하지 않고 항상 참조로만 다룬다', '함수의 반환 타입을 없애준다'],
          '구조적 바인딩은 first/second 같은 딱딱한 이름 대신 의미가 담긴 변수 이름을 바로 쓸 수 있게 해줘요.',
          '"의미 있는 이름"으로 값을 꺼내는 게 핵심이에요.'
        ),
        () => ({
          type: 'code',
          q: 'name이 "관리자"이면 100을, 아니면 std::nullopt를 반환하는 함수 findScore를 std::optional<int>로 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'std::optional<int> findScore(std::string name) {\n    if (name == "관리자") return 100;\n    return std::nullopt;\n}',
          accept: ['std::optional<int> findScore(std::string name) {\n    if (name == "관리자") return 100;\n    return std::nullopt;\n}'],
          why: '조건에 맞으면 값을, 아니면 nullopt를 반환해서 "없음"을 명확히 표현해요.',
          hint: 'if (name == "관리자") return 100; return std::nullopt;'
        }),
      ],
      boss: () => {
        const name = pick(['민준', '서연']);
        const age = randInt(10, 19);
        const score = randInt(60, 100);
        return {
          type: 'blank',
          q: `<code>std::tuple<std::string, int, int> t = {"${name}", ${age}, ${score}}; auto [n, a, s] = t; std::optional<int> bonus = s >= 90 ? std::optional<int>(10) : std::nullopt; std::cout << n << " " << (a + s + (bonus.has_value() ? *bonus : 0));</code>를 실행하면? (형식: 이름 숫자)`,
          prefix: '', suffix: '', accept: [`${name} ${age + score + (score >= 90 ? 10 : 0)}`], placeholder: '출력 결과',
          why: `age+score를 더하고, score가 90 이상이면 보너스 10을 추가해요: ${age}+${score}${score >= 90 ? '+10' : ''}=${age + score + (score >= 90 ? 10 : 0)}`,
          hint: 'bonus가 있으면(has_value) 그 값을 더해요.'
        };
      }
    },
    {
      id: 'enumClasses',
      title: 'enum class — 안전한 열거형',
      ready: true,
      summary: '일반 enum의 문제를 해결한, 타입 안전성이 강화된 enum class를 배워요.',
      goals: ['일반 enum의 한계(이름 충돌, 암묵적 변환)', 'enum class 문법', '값 접근 시 이름::값 표기'],
      blocks: [
        {
          h: '일반 enum의 문제점',
          html: `<p>C 스타일의 일반 <code>enum</code>은 값들이 <b>전역 범위</b>에 노출되어서 이름이 겹칠 수 있고, <code>int</code>로 <b>암묵적으로 변환</b>되어 실수로 다른 종류의 값과 비교해도 컴파일러가 막아주지 않아요.</p>`,
          code: {
            label: 'plain_enum_problem.cpp',
            lang: 'cpp',
            src: `enum Color { RED, GREEN, BLUE }; // RED, GREEN, BLUE가 전역 이름 공간에 노출됨
enum Fruit { APPLE, BANANA };

int x = RED; // int로 암묵적 변환됨 -- 의도치 않은 실수 가능
if (RED == APPLE) { /* 둘 다 0이라 참이 됨! 논리적으로 말이 안 되는데도 컴파일됨 */ }`,
            out: `(컴파일은 되지만 의미 없는 비교가 허용됨)`
          }
        },
        {
          h: 'enum class — 이름과 타입을 안전하게',
          html: `<p><code>enum class</code>는 값들이 <code>enum이름::값</code>으로만 접근되어 <b>이름 충돌이 없고</b>, 다른 enum class나 int로 <b>암묵적 변환도 되지 않아</b> 훨씬 안전해요.</p>`,
          code: {
            label: 'enum_class.cpp',
            lang: 'cpp',
            src: `enum class Color { Red, Green, Blue };
enum class Fruit { Apple, Banana };

Color c = Color::Red;
// if (c == Fruit::Apple) {}  // 오류! 서로 다른 enum class는 비교 불가
if (c == Color::Red) {
    std::cout << "빨간색이에요" << std::endl;
}`,
            out: `빨간색이에요`
          },
          after: `<div class="note"><b>실무 관행</b> — 요즘 C++ 코드에서는 특별한 이유가 없다면 일반 enum 대신 <code>enum class</code>를 기본으로 써요. 그만큼 실수를 컴파일 단계에서 막아주는 게 크기 때문이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '일반 enum(C 스타일)의 문제점으로 옳은 것은?',
          '값들이 전역 이름 공간에 노출되어 이름이 겹칠 수 있고, int로 암묵적 변환된다', ['값에 이름을 붙일 수 없다', '값을 하나만 정의할 수 있다', '함수 안에서 쓸 수 없다'],
          '일반 enum의 값은 그 enum 이름 없이도 바로 접근 가능해서 충돌 위험이 있고, int로 자유롭게 변환돼요.',
          '"전역 노출"과 "암묵적 변환"이 핵심 문제예요.'
        ),
        () => makeChoice(
          '<code>enum class Color { Red, Green };</code>에서 Red에 접근하는 올바른 방법은?',
          'Color::Red', ['Red', 'Color.Red', 'Color->Red'],
          'enum class의 값은 반드시 enum이름:: 을 붙여서 접근해야 해요.',
          ':: 연산자로 접근해요.'
        ),
        () => makeChoice(
          '<code>enum class</code>가 일반 enum보다 안전한 이유는?',
          '이름 충돌이 없고, 서로 다른 enum class 간의 암묵적 비교/변환이 금지되어 있어서', ['enum class는 값을 하나만 가질 수 있어서', 'enum class는 항상 더 적은 메모리를 써서', 'enum class는 함수 안에서만 쓸 수 있어서'],
          'enum class는 스코프가 있고(이름 충돌 없음), 타입이 엄격해서(암묵적 변환 없음) 실수를 컴파일 단계에서 막아줘요.',
          '"스코프"와 "타입 안전성" 두 가지가 개선된 점이에요.'
        ),
        () => {
          const colors = ['Red', 'Green', 'Blue'];
          const chosen = pick(colors);
          return {
            type: 'blank',
            q: `<code>enum class Color { Red, Green, Blue }; Color c = Color::${chosen}; if (c == Color::${chosen}) std::cout << "일치"; else std::cout << "불일치";</code>의 출력은?`,
            prefix: '', suffix: '', accept: ['일치'], placeholder: '출력 결과',
            why: 'c에 대입한 값과 비교하는 값이 같으므로 "일치"가 출력돼요.',
            hint: '같은 값끼리 비교하면 항상 참이에요.'
          };
        },
        () => ({
          type: 'code',
          q: 'Weekday라는 이름으로 Mon, Tue, Wed 세 값을 갖는 enum class를 정의하세요.',
          starter: '',
          placeholder: 'enum class Weekday { Mon, Tue, Wed };',
          accept: ['enum class Weekday { Mon, Tue, Wed };'],
          why: 'enum class 뒤에 이름과 중괄호 안에 값들을 나열해요.',
          hint: 'enum class Weekday { Mon, Tue, Wed };'
        }),
      ],
      boss: () => {
        const statuses = ['Pending', 'Active', 'Done'];
        const chosen = pick(statuses);
        const msgs = { Pending: '대기 중', Active: '진행 중', Done: '완료' };
        return {
          type: 'blank',
          q: `<code>enum class Status { Pending, Active, Done }; Status s = Status::${chosen}; if (s == Status::Pending) std::cout << "대기 중"; else if (s == Status::Active) std::cout << "진행 중"; else std::cout << "완료";</code>를 실행하면?`,
          prefix: '', suffix: '', accept: [msgs[chosen]], placeholder: '출력 결과',
          why: `s가 Status::${chosen}이므로 "${msgs[chosen]}"이 출력돼요.`,
          hint: '각 상태에 맞는 문자열을 확인해보세요.'
        };
      }
    },
    {
      id: 'multipleInheritanceDiamond',
      title: '다중 상속과 다이아몬드 문제',
      ready: true,
      summary: '두 개 이상의 부모를 갖는 다중 상속과, 그로 인해 생기는 다이아몬드 문제를 개념적으로 살펴봐요.',
      goals: ['다중 상속 문법', '다이아몬드 문제란 무엇인가', 'virtual 상속으로 해결하는 방법 맛보기'],
      blocks: [
        {
          h: '다중 상속 — 부모가 둘 이상',
          html: `<p>C++는 한 클래스가 <b>여러 부모</b>를 동시에 상속받는 <b>다중 상속</b>을 허용해요. <code>class 자식 : public 부모1, public 부모2</code> 형태예요.</p>`,
          code: {
            label: 'multiple_inheritance.cpp',
            lang: 'cpp',
            src: `class Flyable {
public:
    void fly() { std::cout << "날아요" << std::endl; }
};
class Swimmable {
public:
    void swim() { std::cout << "헤엄쳐요" << std::endl; }
};

class Duck : public Flyable, public Swimmable {}; // 둘 다 상속

Duck d;
d.fly();
d.swim();`,
            out: `날아요\n헤엄쳐요`
          }
        },
        {
          h: '다이아몬드 문제',
          html: `<p>두 부모가 <b>같은 조상</b>을 상속받고 있으면 문제가 생겨요. 예를 들어 <code>Flyable</code>과 <code>Swimmable</code>이 둘 다 <code>Animal</code>을 상속받고, <code>Duck</code>이 그 둘을 상속받으면, <code>Duck</code> 안에 <code>Animal</code>이 <b>두 벌</b> 생기는 <b>다이아몬드 문제</b>가 발생해요. 어느 쪽 Animal 멤버를 써야 할지 모호해지죠.</p>`,
          code: {
            label: 'diamond_problem.txt',
            lang: 'cpp',
            src: `      Animal
      /    \\
Flyable    Swimmable
      \\    /
       Duck

// Duck 객체 안에 Animal이 두 벌 생겨서 모호함이 생길 수 있어요.
// class Flyable : public virtual Animal { ... };
// class Swimmable : public virtual Animal { ... };
// 이렇게 "virtual 상속"을 쓰면 Animal을 한 벌만 공유하게 만들 수 있어요.`,
            out: `(개념 설명용 다이어그램)`
          },
          after: `<div class="note"><b>실무 팁</b> — 다중 상속과 다이아몬드 문제는 복잡해서, 실무에서는 여러 부모를 상속받는 대신 <b>순수 가상 함수로만 이루어진 여러 개의 인터페이스(추상 클래스)</b>를 상속받는 방식을 훨씬 더 선호해요. 데이터 중복 문제가 생기지 않기 때문이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '다중 상속(multiple inheritance)이란?',
          '한 클래스가 두 개 이상의 부모 클래스를 동시에 상속받는 것', ['한 부모가 여러 자식을 갖는 것', '클래스가 자기 자신을 상속받는 것', '상속을 여러 번 반복하는 것(3단계 이상)'],
          '다중 상속은 하나의 자식이 동시에 여러 부모의 멤버를 물려받는 구조예요.',
          '"여러 부모"라는 표현이 핵심이에요.'
        ),
        () => makeChoice(
          '다이아몬드 문제가 발생하는 상황은?',
          '두 부모가 같은 조상 클래스를 상속받고, 자식이 그 두 부모를 다중 상속받을 때', ['클래스에 멤버가 하나도 없을 때', '생성자가 여러 개일 때', 'private 상속만 사용할 때'],
          '같은 조상이 두 경로로 자식에게 중복 상속되어, 모양이 다이아몬드처럼 보이는 데서 이름이 유래했어요.',
          '상속 관계를 그림으로 그려보면 마름모(다이아몬드) 모양이 돼요.'
        ),
        () => makeChoice(
          '다이아몬드 문제로 생기는 구체적인 문제는?',
          '조상 클래스의 멤버가 중복되어, 어느 경로의 멤버를 써야 할지 모호해진다', ['컴파일 속도가 항상 두 배로 늘어난다', '메모리를 아예 할당할 수 없게 된다', '자식 클래스에 멤버를 추가할 수 없게 된다'],
          '중복된 조상 멤버 중 어느 것을 참조해야 할지 애매해지는 게 다이아몬드 문제의 핵심이에요.',
          '"중복"과 "모호함"이 키워드예요.'
        ),
        () => makeChoice(
          '실무에서 다중 상속의 복잡함을 피하기 위해 흔히 쓰는 대안은?',
          '데이터 없이 순수 가상 함수로만 이루어진 여러 인터페이스(추상 클래스)를 상속받는다', ['상속을 아예 쓰지 않는다', '모든 멤버를 static으로 만든다', '클래스를 하나만 만든다'],
          '데이터가 없는 순수한 인터페이스를 여러 개 상속받으면 다이아몬드 문제의 데이터 중복이 생기지 않아요.',
          '데이터 없는 "설계도"만 여러 개 상속받는 방식이에요.'
        ),
        () => ({
          type: 'code',
          q: 'Walkable과 Swimmable 두 클래스를 다중 상속받는 클래스 Frog를 선언하세요. (멤버 없이 상속 선언만)',
          starter: '',
          placeholder: 'class Frog : public Walkable, public Swimmable {\n};',
          accept: ['class Frog : public Walkable, public Swimmable {\n};'],
          why: '콤마로 여러 부모 클래스를 나열해 다중 상속을 선언해요.',
          hint: 'class Frog : public Walkable, public Swimmable { };'
        }),
      ],
      boss: () => {
        return {
          type: 'blank',
          q: `<code>class A { public: void hello() { std::cout << "A"; } }; class B { public: void world() { std::cout << "B"; } }; class C : public A, public B {}; C c; c.hello(); c.world();</code>를 실행하면?`,
          prefix: '', suffix: '', accept: ['AB'], placeholder: '출력 결과',
          why: 'C는 A와 B를 둘 다 상속받아서 두 메서드를 모두 쓸 수 있어요.',
          hint: '두 부모의 메서드가 순서대로 실행돼요.'
        };
      }
    },
    {
      id: 'constexprBasics',
      title: 'constexpr — 컴파일 시점 계산',
      ready: true,
      summary: '프로그램이 실행되기도 전에 컴파일러가 미리 계산해버리는 constexpr을 배워요.',
      goals: ['constexpr의 의미(컴파일 시점 상수)', 'const와 constexpr의 차이', 'constexpr 함수'],
      blocks: [
        {
          h: 'const vs constexpr',
          html: `<p><code>const</code>는 "실행 중에 값이 바뀌지 않는다"는 뜻이지만, 그 값 자체는 실행 시점에 정해질 수도 있어요. <code>constexpr</code>은 한 발 더 나아가 "이 값은 <b>컴파일 시점</b>에 이미 계산되어 있다"는 걸 보장해요. 그만큼 실행 속도에 이득이 있어요.</p>`,
          code: {
            label: 'constexpr_var.cpp',
            lang: 'cpp',
            src: `constexpr int MAX_USERS = 100; // 컴파일 시점에 100으로 확정
int arr[MAX_USERS]; // 배열 크기처럼 컴파일 시점에 필요한 곳에도 사용 가능

std::cout << MAX_USERS << std::endl;`,
            out: `100`
          }
        },
        {
          h: 'constexpr 함수 — 조건이 맞으면 컴파일 시점에 실행',
          html: `<p>함수에 <code>constexpr</code>을 붙이면, 인자가 컴파일 시점에 알 수 있는 값(상수)일 경우 그 함수 호출 자체가 <b>컴파일 시점에 미리 계산</b>돼요. 실행할 때는 이미 답이 정해져 있어서 실행 속도가 빨라져요.</p>`,
          code: {
            label: 'constexpr_func.cpp',
            lang: 'cpp',
            src: `constexpr int square(int x) {
    return x * x;
}

constexpr int result = square(5); // 컴파일 시점에 25로 계산됨
std::cout << result << std::endl;`,
            out: `25`
          },
          after: `<div class="note"><b>실무에서는</b> — 배열 크기, 수학 상수, 룩업 테이블처럼 "미리 정해도 되는 값"에 constexpr을 쓰면 실행 시점의 계산을 줄여 성능을 높일 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'const와 constexpr의 차이는?',
          'constexpr은 값이 컴파일 시점에 이미 확정됨을 보장하지만, const는 그렇지 않을 수도 있다', ['const가 constexpr보다 더 엄격하다', '둘은 완전히 같은 의미다', 'constexpr은 변수에는 쓸 수 없다'],
          'const는 "실행 중 불변"만 보장하지만, constexpr은 "컴파일 시점에 계산 완료"까지 보장해요.',
          '"언제 값이 정해지는가"가 차이예요.'
        ),
        () => {
          const n = randInt(2, 10);
          return {
            type: 'blank',
            q: `<code>constexpr int square(int x) { return x * x; } constexpr int r = square(${n}); std::cout << r;</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n * n)], placeholder: '숫자',
            why: `square(${n})는 ${n}*${n}=${n * n}을 컴파일 시점에 계산해요.`,
            hint: 'x*x를 계산해요.'
          };
        },
        () => makeChoice(
          'constexpr 변수를 배열의 크기로 쓸 수 있는 이유는?',
          '배열 크기는 컴파일 시점에 알아야 하는데, constexpr은 그 시점에 값이 이미 확정되어 있어서', ['constexpr은 항상 0이라서', '배열은 constexpr만 허용하기 때문에(다른 값은 아예 못 씀)', 'constexpr은 int로만 선언 가능해서'],
          '일반 배열의 크기는 컴파일 시점에 알려진 값이어야 하는데, constexpr이 정확히 그 조건을 만족해요.',
          '"컴파일 시점에 정해짐"이 핵심 이유예요.'
        ),
        () => makeChoice(
          'constexpr을 쓰는 이유로 알맞은 것은?',
          '컴파일 시점에 미리 계산해서 실행 시점의 부담을 줄이기 위해', ['코드를 더 길게 만들기 위해', 'private 멤버를 없애기 위해', '반드시 클래스 안에서만 쓰기 위해'],
          '컴파일 시점에 계산이 끝나 있으면 실행할 때 다시 계산할 필요가 없어 성능에 유리해요.',
          '"미리 계산해둔다"는 개념이에요.'
        ),
        () => ({
          type: 'code',
          q: '컴파일 시점에 100으로 확정되는 constexpr 정수 상수 MAX를 선언하세요.',
          starter: '',
          placeholder: 'constexpr int MAX = 100;',
          accept: ['constexpr int MAX = 100;'],
          why: 'constexpr 키워드로 컴파일 시점 상수를 선언해요.',
          hint: 'constexpr int MAX = 100;'
        }),
      ],
      boss: () => {
        const n = randInt(2, 8);
        return {
          type: 'blank',
          q: `<code>constexpr int cube(int x) { return x * x * x; } constexpr int r = cube(${n}); int arr[cube(2)]; std::cout << r << " " << sizeof(arr) / sizeof(arr[0]);</code>를 실행하면? (형식: 숫자 숫자)`,
          prefix: '', suffix: '', accept: [`${n * n * n} 8`], placeholder: '출력 결과',
          why: `cube(${n})=${n * n * n}이고, cube(2)=8이라서 arr의 크기(원소 개수)도 8이에요.`,
          hint: 'cube(2)는 2*2*2=8이에요.'
        };
      }
    },
    {
      id: 'threadsBasics',
      title: '멀티스레딩 기초 — std::thread',
      ready: true,
      summary: '여러 작업을 동시에(병렬로) 실행하는 스레드의 기본 사용법을 배워요.',
      goals: ['std::thread로 새 스레드 만들기', 'join()으로 스레드 종료 기다리기', '여러 스레드 동시 실행'],
      blocks: [
        {
          h: 'std::thread — 새로운 실행 흐름 만들기',
          html: `<p><code>&lt;thread&gt;</code> 헤더의 <code>std::thread</code>는 함수를 <b>별도의 실행 흐름(스레드)</b>에서 동시에 실행해줘요. 이렇게 하면 하나의 프로그램이 여러 작업을 동시에(병렬로) 처리할 수 있어요.</p>`,
          code: {
            label: 'thread_basic.cpp',
            lang: 'cpp',
            src: `#include <thread>

void printMessage() {
    std::cout << "스레드에서 실행 중!" << std::endl;
}

std::thread t(printMessage); // 새 스레드에서 printMessage 실행 시작
t.join(); // 메인 스레드가 t가 끝날 때까지 기다림`,
            out: `스레드에서 실행 중!`
          }
        },
        {
          h: 'join()을 꼭 호출해야 하는 이유',
          html: `<p><code>join()</code>은 그 스레드가 끝날 때까지 기다리는 함수예요. <code>join()</code>이나 <code>detach()</code>(따로 떼어 알아서 돌게 하기)를 <b>호출하지 않고</b> thread 객체가 소멸되면, 프로그램이 강제 종료돼요. 실수를 막기 위해 항상 join() 또는 detach()를 명시적으로 호출해야 해요.</p>`,
          code: {
            label: 'multi_thread.cpp',
            lang: 'cpp',
            src: `void task(int id) {
    std::cout << "작업 " << id << " 실행" << std::endl;
}

std::thread t1(task, 1);
std::thread t2(task, 2);
t1.join();
t2.join();
std::cout << "모든 작업 완료" << std::endl;`,
            out: `작업 1 실행\n작업 2 실행\n모든 작업 완료`
          },
          after: `<div class="note"><b>주의</b> — 여러 스레드가 실제로 어떤 순서로 출력될지는 운영체제 스케줄링에 따라 달라질 수 있어요(작업 2가 먼저 출력될 수도 있어요). "모든 작업 완료"는 두 join()이 모두 끝난 뒤에만 출력돼요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'std::thread를 쓰는 목적은?',
          '함수를 별도의 실행 흐름에서 동시에(병렬로) 실행하기 위해', ['함수를 더 천천히 실행하기 위해', '변수를 전역으로 만들기 위해', '컴파일 오류를 방지하기 위해'],
          'thread는 여러 작업을 동시에 처리할 수 있게 해주는 병렬 실행의 기본 도구예요.',
          '"동시에 실행"이 핵심이에요.'
        ),
        () => makeChoice(
          '<code>t.join()</code>이 하는 일은?',
          '스레드 t가 끝날 때까지 현재 실행 흐름이 기다린다', ['스레드 t를 즉시 강제 종료한다', '스레드 t를 다시 시작한다', '아무 일도 하지 않는다'],
          'join()은 그 스레드의 작업이 끝날 때까지 대기하는 함수예요.',
          '"합류하다(join)"는 뜻 그대로, 끝날 때까지 기다려요.'
        ),
        () => makeChoice(
          'thread 객체가 소멸되기 전에 join()도 detach()도 호출하지 않으면?',
          '프로그램이 강제 종료(std::terminate)된다', ['자동으로 join()이 호출된다', '자동으로 detach()가 호출된다', '경고만 뜨고 정상 진행된다'],
          'C++는 이 상황을 프로그래머의 실수로 간주해 프로그램을 강제 종료시켜요.',
          '반드시 join()이나 detach() 중 하나를 명시적으로 호출해야 해요.'
        ),
        () => makeChoice(
          '두 개의 스레드가 각각 출력할 때, 실제 출력 순서는?',
          '운영체제 스케줄링에 따라 달라질 수 있어 항상 같다고 보장할 수 없다', ['항상 만든 순서 그대로 출력된다', '항상 역순으로 출력된다', '항상 알파벳 순으로 정렬되어 출력된다'],
          '스레드의 실행 순서는 운영체제가 결정하기 때문에, 코드 작성 순서와 실제 실행 순서가 다를 수 있어요.',
          '"동시성"의 특징 중 하나예요.'
        ),
        () => ({
          type: 'code',
          q: '함수 doWork를 별도 스레드로 실행하고, join()으로 끝날 때까지 기다리는 두 줄을 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'std::thread t(doWork);\nt.join();',
          accept: ['std::thread t(doWork);\nt.join();'],
          why: 'thread를 만들면 즉시 실행이 시작되고, join()으로 끝날 때까지 기다려요.',
          hint: 'std::thread t(doWork); 다음 줄에 t.join();'
        }),
      ],
      boss: () => {
        return {
          type: 'blank',
          q: `<code>void hello() { std::cout << "hi"; } std::thread t(hello); t.join(); std::cout << " done";</code>를 실행하면?`,
          prefix: '', suffix: '', accept: ['hi done'], placeholder: '출력 결과',
          why: 'join()으로 스레드가 끝날 때까지 기다린 뒤에야 " done"이 출력돼서, 항상 "hi done" 순서가 보장돼요.',
          hint: 'join() 덕분에 순서가 보장돼요.'
        };
      }
    },
    {
      id: 'mutexAndLockGuard',
      title: 'mutex와 lock_guard — 안전한 공유',
      ready: true,
      summary: '여러 스레드가 같은 데이터를 동시에 건드릴 때 생기는 문제와 이를 막는 mutex를 배워요.',
      goals: ['경쟁 상태(race condition)란 무엇인가', 'std::mutex로 잠그기', 'std::lock_guard로 안전하게 관리'],
      blocks: [
        {
          h: '경쟁 상태 — 여러 스레드가 동시에 값을 바꾸면',
          html: `<p>여러 스레드가 <b>같은 변수</b>를 동시에 읽고 쓰면, 예상과 다른 값이 나오는 <b>경쟁 상태(race condition)</b>가 생길 수 있어요. 예를 들어 <code>counter++</code>는 "읽기 -> 더하기 -> 쓰기" 세 단계인데, 두 스레드가 동시에 끼어들면 일부 증가가 무시될 수 있어요.</p>`,
          code: {
            label: 'race_condition.cpp',
            lang: 'cpp',
            src: `int counter = 0;

void increment() {
    for (int i = 0; i < 100000; i++) {
        counter++; // 두 스레드가 동시에 실행하면 값이 씹힐 수 있음
    }
}

std::thread t1(increment);
std::thread t2(increment);
t1.join(); t2.join();
std::cout << counter << std::endl; // 200000이 아닐 수도 있음!`,
            out: `(200000이 예상되지만, 실제로는 더 작은 값이 나올 수 있음)`
          }
        },
        {
          h: 'mutex와 lock_guard로 안전하게',
          html: `<p><code>std::mutex</code>는 "한 번에 한 스레드만 이 구간에 들어올 수 있다"는 잠금 장치예요. <code>std::lock_guard</code>로 감싸면, 그 스코프를 벗어날 때 <b>자동으로</b> 잠금이 풀려서(RAII 패턴) 잠금 해제를 깜빡할 위험이 없어요.</p>`,
          code: {
            label: 'mutex_lock.cpp',
            lang: 'cpp',
            src: `#include <mutex>

int counter = 0;
std::mutex mtx;

void increment() {
    for (int i = 0; i < 100000; i++) {
        std::lock_guard<std::mutex> lock(mtx); // 스코프 진입 시 잠금
        counter++;
    } // 스코프를 벗어나며 자동으로 잠금 해제
}

std::thread t1(increment);
std::thread t2(increment);
t1.join(); t2.join();
std::cout << counter << std::endl; // 항상 200000`,
            out: `200000`
          },
          after: `<div class="note"><b>RAII의 또 다른 예</b> — lock_guard도 unique_ptr처럼 RAII 원칙을 따라요: "잠금을 획득하는 것"이 객체 생성이고, "스코프를 벗어나는 것"이 자동 해제예요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '경쟁 상태(race condition)가 생기는 이유는?',
          '여러 스레드가 같은 데이터를 동시에 읽고 써서 예상과 다른 결과가 나올 수 있어서', ['스레드가 하나만 실행돼서', '변수에 값을 대입하지 않아서', 'mutex를 쓰지 않으면 프로그램이 컴파일되지 않아서'],
          '여러 스레드가 순서를 보장받지 못한 채 같은 데이터를 건드리면 일부 연산이 유실될 수 있어요.',
          '"동시에 같은 데이터를 건드림"이 원인이에요.'
        ),
        () => makeChoice(
          'std::mutex의 역할은?',
          '한 번에 하나의 스레드만 특정 구간에 들어올 수 있게 잠그는 것', ['스레드를 여러 개 동시에 만드는 것', '변수를 자동으로 초기화하는 것', '프로그램 실행 속도를 항상 높이는 것'],
          'mutex는 "상호 배제(mutual exclusion)"의 줄임말로, 동시 접근을 막는 잠금 도구예요.',
          '"잠금 장치"라고 생각하세요.'
        ),
        () => makeChoice(
          'std::lock_guard를 쓰는 이유는?',
          '스코프를 벗어날 때 자동으로 잠금이 해제되어, 잠금 해제를 깜빡하는 실수를 막을 수 있어서', ['mutex보다 항상 빠르기 때문에', '여러 스레드를 한 번에 만들어주기 때문에', '변수의 타입을 자동으로 바꿔주기 때문에'],
          'lock_guard는 RAII 원칙에 따라 자동으로 잠금을 관리해줘서 안전해요.',
          'unique_ptr와 비슷한 RAII 패턴이에요.'
        ),
        () => makeChoice(
          '<code>std::lock_guard<std::mutex> lock(mtx);</code>가 선언된 스코프를 벗어나면?',
          'mtx의 잠금이 자동으로 해제된다', ['mtx가 삭제된다', '프로그램이 종료된다', '잠금이 계속 유지된다'],
          'lock_guard의 소멸자가 자동으로 unlock을 호출해줘요.',
          '소멸자가 자동으로 뒷정리를 해줘요.'
        ),
        () => ({
          type: 'code',
          q: 'std::mutex mtx를 이용해, 함수 안에서 lock_guard로 잠근 뒤 counter를 1 증가시키는 한 줄(lock_guard 선언)과 counter++ 두 줄을 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'std::lock_guard<std::mutex> lock(mtx);\ncounter++;',
          accept: ['std::lock_guard<std::mutex> lock(mtx);\ncounter++;'],
          why: 'lock_guard로 mtx를 잠근 뒤 counter를 안전하게 증가시켜요.',
          hint: 'std::lock_guard<std::mutex> lock(mtx); 다음 줄에 counter++;'
        }),
      ],
      boss: () => {
        return {
          type: 'blank',
          q: `<code>std::mutex mtx; int total = 0; void add(int n) { std::lock_guard<std::mutex> lock(mtx); total += n; } std::thread t1(add, 10); std::thread t2(add, 20); t1.join(); t2.join(); std::cout << total;</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: ['30'], placeholder: '숫자',
          why: 'mutex 덕분에 두 스레드의 덧셈이 안전하게 순서대로 반영되어, 결과는 항상 10+20=30이에요.',
          hint: 'lock_guard가 경쟁 상태를 막아줘서 값이 정확히 더해져요.'
        };
      }
    },
    {
      id: 'preprocessorMacros',
      title: '전처리기와 매크로',
      ready: true,
      summary: '컴파일 전에 텍스트를 치환하는 전처리기와, 헤더 파일 중복 포함을 막는 방법을 배워요.',
      goals: ['#define으로 매크로 만들기', '#include 헤더 가드', '#pragma once — 더 간단한 대안'],
      blocks: [
        {
          h: '#define — 컴파일 전에 텍스트 치환',
          html: `<p><code>#define</code>으로 만든 <b>매크로</b>는 실제 컴파일이 시작되기 <b>전에</b>, 코드에 있는 이름을 지정된 텍스트로 그대로 바꿔치기해요. 상수처럼 쓸 수도 있지만, 요즘은 타입 검사가 되는 <code>const</code>나 <code>constexpr</code>을 더 권장해요.</p>`,
          code: {
            label: 'define_macro.cpp',
            lang: 'cpp',
            src: `#define MAX_SCORE 100
#define SQUARE(x) ((x) * (x))

std::cout << MAX_SCORE << std::endl;
std::cout << SQUARE(5) << std::endl;`,
            out: `100\n25`
          }
        },
        {
          h: '헤더 가드와 #pragma once',
          html: `<p>같은 헤더 파일이 여러 번 <code>#include</code>되면 "이미 정의됨" 같은 컴파일 오류가 날 수 있어요. 전통적으로는 <b>헤더 가드</b>(<code>#ifndef</code>/<code>#define</code>/<code>#endif</code>)로 막았고, 요즘은 훨씬 간단한 <code>#pragma once</code>를 많이 써요.</p>`,
          code: {
            label: 'header_guard.h',
            lang: 'cpp',
            src: `// 전통적인 헤더 가드 방식
#ifndef MY_HEADER_H
#define MY_HEADER_H

void doSomething();

#endif

// 요즘 더 많이 쓰는 방식
#pragma once

void doSomethingElse();`,
            out: `(둘 다 같은 헤더가 여러 번 include되어도 오류가 안 나게 해줌)`
          },
          after: `<div class="note"><b>비교</b> — 헤더 가드는 모든 컴파일러에서 표준적으로 동작하고, <code>#pragma once</code>는 표준은 아니지만 사실상 모든 주요 컴파일러가 지원해서 짧고 편리하다는 이유로 실무에서 널리 쓰여요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '#define으로 만든 매크로가 동작하는 시점은?',
          '컴파일이 시작되기 전, 전처리 단계에서 텍스트로 그대로 치환된다', ['프로그램이 실행되는 도중에', '프로그램이 끝난 뒤에', '링크 단계에서'],
          '매크로는 컴파일러가 실제 코드를 분석하기 전, 전처리기가 텍스트를 치환하는 단계에서 처리돼요.',
          '"전처리"라는 이름 그대로 컴파일 이전 단계예요.'
        ),
        () => {
          const n = randInt(2, 10);
          return {
            type: 'blank',
            q: `<code>#define SQUARE(x) ((x) * (x)) std::cout << SQUARE(${n});</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n * n)], placeholder: '숫자',
            why: `SQUARE(${n})는 (${n}) * (${n}) = ${n * n}으로 치환돼요.`,
            hint: '매크로가 그대로 텍스트로 치환된 걸 생각해보세요.'
          };
        },
        () => makeChoice(
          '헤더 가드(#ifndef/#define/#endif)를 쓰는 이유는?',
          '같은 헤더 파일이 여러 번 include되어도 중복 정의 오류가 나지 않게 하려고', ['매크로 함수를 만들기 위해서', '컴파일 속도를 항상 높이기 위해서', 'const 변수를 정의하기 위해서'],
          '헤더 가드는 이미 include된 적이 있으면 그 내용을 다시 포함하지 않도록 막아줘요.',
          '"중복 방지"가 핵심 목적이에요.'
        ),
        () => makeChoice(
          '#pragma once와 전통적인 헤더 가드의 관계는?',
          '#pragma once는 같은 목적(중복 include 방지)을 더 짧게 달성하는 실무적 대안이다', ['#pragma once는 매크로를 정의하는 문법이다', '#pragma once는 헤더 가드와 전혀 다른 목적을 갖는다', '#pragma once는 표준에 정의된 유일한 방법이다'],
          '둘은 목적이 같지만, #pragma once가 한 줄로 더 간결하게 같은 효과를 내요.',
          '"더 짧은 대안"이라는 점이 핵심이에요.'
        ),
        () => ({
          type: 'code',
          q: 'MY_HEADER_H라는 이름으로 헤더 가드를 만드는 #ifndef, #define 두 줄을 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: '#ifndef MY_HEADER_H\n#define MY_HEADER_H',
          accept: ['#ifndef MY_HEADER_H\n#define MY_HEADER_H'],
          why: '#ifndef로 아직 정의 안 됐는지 확인하고, #define으로 정의해요.',
          hint: '#ifndef MY_HEADER_H 다음 줄에 #define MY_HEADER_H'
        }),
      ],
      boss: () => {
        const n = randInt(2, 8);
        return {
          type: 'blank',
          q: `<code>#define DOUBLE(x) ((x) * 2) #define MAX_N 10 std::cout << DOUBLE(${n}) << " " << MAX_N;</code>를 실행하면? (형식: 숫자 숫자)`,
          prefix: '', suffix: '', accept: [`${n * 2} 10`], placeholder: '출력 결과',
          why: `DOUBLE(${n})은 ${n}*2=${n * 2}로 치환되고, MAX_N은 10으로 치환돼요.`,
          hint: '두 매크로가 각각 텍스트로 치환돼요.'
        };
      }
    },
    {
      id: 'stringManipulationDeepDive',
      title: '문자열 심화 — find, replace, stringstream',
      ready: true,
      summary: '문자열을 검색하고 바꾸고, 숫자와 문자열을 서로 변환하는 실전 문자열 기법을 배워요.',
      goals: ['find/substr로 검색과 자르기', 'replace로 부분 문자열 바꾸기', 'stringstream으로 문자열-숫자 변환'],
      blocks: [
        {
          h: 'find와 replace',
          html: `<p><code>find(부분문자열)</code>은 찾는 위치(인덱스)를 반환하고, 없으면 <code>std::string::npos</code>라는 특별한 값을 반환해요. <code>replace(시작, 길이, 새문자열)</code>은 그 구간을 다른 문자열로 바꿔치기해요.</p>`,
          code: {
            label: 'find_replace.cpp',
            lang: 'cpp',
            src: `std::string s = "Hello, World!";
size_t pos = s.find("World");
if (pos != std::string::npos) {
    std::cout << "찾은 위치: " << pos << std::endl;
}
s.replace(pos, 5, "C++");
std::cout << s << std::endl;`,
            out: `찾은 위치: 7\nHello, C++!`
          }
        },
        {
          h: 'stringstream — 문자열과 숫자 사이 변환',
          html: `<p><code>&lt;sstream&gt;</code>의 <code>std::stringstream</code>은 문자열을 <code>cin</code>/<code>cout</code>처럼 다룰 수 있게 해줘서, 문자열을 공백 기준으로 쪼개거나 숫자로 변환할 때 유용해요. 더 간단히는 <code>std::to_string(숫자)</code>, <code>std::stoi(문자열)</code>도 자주 써요.</p>`,
          code: {
            label: 'stringstream.cpp',
            lang: 'cpp',
            src: `#include <sstream>

std::string line = "지수 90 민준 85";
std::stringstream ss(line);
std::string name;
int score;
while (ss >> name >> score) {
    std::cout << name << ": " << score << std::endl;
}

std::string numStr = std::to_string(42);
int num = std::stoi("123");
std::cout << numStr << " " << num << std::endl;`,
            out: `지수: 90\n민준: 85\n42 123`
          },
          after: `<div class="note"><b>참고</b> — stringstream은 cin과 똑같은 방식(<code>>></code>)으로 공백 기준으로 값을 하나씩 읽기 때문에, "한 줄을 여러 조각으로 나누는" 작업에 특히 편리해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const word = pick(['Hello', 'World', 'Coding']);
          const s = `${word} there`;
          return {
            type: 'blank',
            q: `<code>std::string s = "${s}"; std::cout << s.find("${word}");</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: ['0'], placeholder: '숫자',
            why: `"${word}"가 문자열의 맨 앞(인덱스 0)에서 시작하므로 0이 출력돼요.`,
            hint: '문자열의 시작 위치는 인덱스 0이에요.'
          };
        },
        () => makeChoice(
          '<code>s.find("찾을값")</code>이 값을 찾지 못했을 때 반환하는 것은?',
          'std::string::npos', ['-1', '0', 'nullptr'],
          'find는 못 찾으면 -1이 아니라 std::string::npos라는 특별한 상수를 반환해요.',
          '"no position(위치 없음)"의 줄임말이에요.'
        ),
        () => {
          const n = randInt(1, 999);
          return {
            type: 'blank',
            q: `<code>int n = std::stoi("${n}"); std::cout << n + 1;</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n + 1)], placeholder: '숫자',
            why: `stoi("${n}")는 문자열을 정수 ${n}으로 바꿔주고, 여기에 1을 더하면 ${n + 1}이에요.`,
            hint: 'stoi는 문자열을 정수로 변환해줘요.'
          };
        },
        () => makeChoice(
          'std::to_string(숫자)이 하는 일은?',
          '숫자를 문자열로 변환한다', ['문자열을 숫자로 변환한다', '문자열의 길이를 센다', '문자열을 정렬한다'],
          'to_string은 숫자를 사람이 읽는 문자열 형태로 바꿔줘요(stoi와 반대 방향).',
          '"숫자를 문자열로(to string)"라는 이름 그대로예요.'
        ),
        () => ({
          type: 'code',
          q: '"a b c" 문자열을 stringstream으로 읽어, 공백으로 구분된 각 단어를 std::string word에 담아 출력하는 while문을 작성하세요. (ss는 이미 그 문자열로 초기화된 stringstream이라고 가정)',
          starter: '',
          rows: 3,
          placeholder: 'std::string word;\nwhile (ss >> word) {\n    std::cout << word;\n}',
          accept: ['std::string word;\nwhile (ss >> word) {\n    std::cout << word;\n}'],
          why: 'stringstream도 cin처럼 >>로 공백 단위로 값을 읽을 수 있어요.',
          hint: 'std::string word; while (ss >> word) { std::cout << word; }'
        }),
      ],
      boss: () => {
        const a = randInt(1, 50), b = randInt(1, 50);
        return {
          type: 'blank',
          q: `<code>std::string s = "결과: " + std::to_string(${a} + ${b}); std::cout << s << " " << s.find("결과");</code>를 실행하면? (형식: 문자열 숫자)`,
          prefix: '', suffix: '', accept: [`결과: ${a + b} 0`], placeholder: '출력 결과',
          why: `to_string으로 합(${a + b})을 문자열로 바꿔 이어붙이고, "결과"는 맨 앞(인덱스 0)에서 찾아져요.`,
          hint: '숫자를 문자열로 바꿔 이어붙인 뒤, find로 위치를 찾아요.'
        };
      }
    },
    {
      id: 'stlContainersDeepDive',
      title: 'STL 컨테이너 선택 가이드',
      ready: true,
      summary: 'vector, deque, list, stack, queue 등 상황에 맞는 컨테이너를 고르는 기준을 배워요.',
      goals: ['deque와 list의 특징', 'stack과 queue(어댑터 컨테이너)', '상황별 컨테이너 선택 기준'],
      blocks: [
        {
          h: 'deque와 list — vector의 대안들',
          html: `<p><code>std::deque</code>는 <b>앞/뒤 양쪽</b>에서 빠르게 추가/삭제할 수 있는 컨테이너예요(vector는 뒤에서만 빨라요). <code>std::list</code>는 <b>이중 연결 리스트</b>로, 중간에 값을 추가/삭제하는 게 빠르지만 인덱스로 바로 접근(<code>[]</code>)할 수는 없어요.</p>`,
          code: {
            label: 'deque_list.cpp',
            lang: 'cpp',
            src: `#include <deque>
#include <list>

std::deque<int> dq = {2, 3, 4};
dq.push_front(1); // 앞에 추가(vector는 못 하거나 느림)
dq.push_back(5);
for (int n : dq) std::cout << n << " ";
std::cout << std::endl;

std::list<int> lst = {1, 2, 3};
lst.push_front(0);
for (int n : lst) std::cout << n << " ";`,
            out: `1 2 3 4 5 \n0 1 2 3 `
          }
        },
        {
          h: 'stack과 queue — 어댑터 컨테이너',
          html: `<p><code>std::stack</code>은 <b>후입선출(LIFO)</b>, <code>std::queue</code>는 <b>선입선출(FIFO)</b>이에요. 이 둘은 다른 컨테이너(기본은 deque) 위에서 동작하는 <b>어댑터</b>라서, 인덱스 접근 없이 정해진 규칙(push/pop/top 또는 front)으로만 값을 다뤄요.</p>`,
          code: {
            label: 'stack_queue.cpp',
            lang: 'cpp',
            src: `#include <stack>
#include <queue>

std::stack<int> st;
st.push(1); st.push(2); st.push(3);
std::cout << st.top() << std::endl; // 3 (마지막에 넣은 것)

std::queue<int> q;
q.push(1); q.push(2); q.push(3);
std::cout << q.front() << std::endl; // 1 (처음 넣은 것)`,
            out: `3\n1`
          },
          after: `<div class="note"><b>선택 요약</b> — 인덱스 접근과 끝에서의 추가가 많다면 <code>vector</code>(기본 선택), 양쪽 끝에서 추가/삭제가 필요하면 <code>deque</code>, 중간 삽입/삭제가 잦다면 <code>list</code>, 되돌리기 같은 LIFO엔 <code>stack</code>, 대기열 같은 FIFO엔 <code>queue</code>를 선택해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'std::stack의 동작 방식은?',
          '후입선출(LIFO) — 마지막에 넣은 값이 가장 먼저 나온다', ['선입선출(FIFO) — 처음 넣은 값이 가장 먼저 나온다', '무작위 순서로 나온다', '항상 정렬된 순서로 나온다'],
          'stack은 접시를 쌓듯 마지막에 넣은 게 제일 위에 있어서 먼저 꺼내져요.',
          '"쌓는다"는 이미지를 떠올려보세요.'
        ),
        () => {
          const vals = [randInt(1, 20), randInt(1, 20), randInt(1, 20)];
          return {
            type: 'blank',
            q: `<code>std::stack<int> st; st.push(${vals[0]}); st.push(${vals[1]}); st.push(${vals[2]}); std::cout << st.top();</code>의 출력은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(vals[2])], placeholder: '숫자',
            why: `top()은 가장 마지막에 넣은 값 ${vals[2]}를 보여줘요.`,
            hint: '가장 나중에 넣은 값이 top이에요.'
          };
        },
        () => makeChoice(
          'std::queue의 동작 방식은?',
          '선입선출(FIFO) — 처음 넣은 값이 가장 먼저 나온다', ['후입선출(LIFO) — 마지막에 넣은 값이 가장 먼저 나온다', '항상 역순으로 나온다', '가장 큰 값이 먼저 나온다'],
          'queue는 줄을 서듯 먼저 온 사람(값)이 먼저 나가요.',
          '"줄서기(대기열)"를 떠올려보세요.'
        ),
        () => makeChoice(
          '중간 위치에 값을 자주 추가/삭제해야 할 때 가장 적합한 컨테이너는?',
          'std::list', ['std::vector', 'std::stack', 'std::queue'],
          'list는 연결 리스트 구조라서 중간 삽입/삭제가 vector보다 효율적이에요.',
          '연결 리스트 구조의 장점을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: 'std::queue<int> q에 1, 2, 3을 순서대로 push한 뒤 front()를 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'q.push(1);\nq.push(2);\nq.push(3);\nstd::cout << q.front();',
          accept: ['q.push(1);\nq.push(2);\nq.push(3);\nstd::cout << q.front();'],
          why: 'queue는 FIFO라서 front()는 가장 먼저 넣은 값을 보여줘요.',
          hint: 'push를 세 번 한 뒤 front()를 출력해요.'
        }),
      ],
      boss: () => {
        const vals = [randInt(1, 20), randInt(1, 20), randInt(1, 20)];
        return {
          type: 'blank',
          q: `<code>std::stack<int> st; std::queue<int> q; for (int v : {${vals.join(', ')}}) { st.push(v); q.push(v); } std::cout << st.top() << " " << q.front();</code>를 실행하면? (형식: 숫자 숫자)`,
          prefix: '', suffix: '', accept: [`${vals[2]} ${vals[0]}`], placeholder: '출력 결과',
          why: `stack의 top()은 마지막 값(${vals[2]}), queue의 front()는 첫 값(${vals[0]})이에요.`,
          hint: 'stack은 LIFO, queue는 FIFO예요.'
        };
      }
    },
    {
      id: 'smartPointersInPractice',
      title: '실전 스마트 포인터 — make_unique와 커스텀 삭제자',
      ready: true,
      summary: '스마트 포인터를 실전에서 다루는 관행과, 배열/커스텀 자원에 대한 활용법을 정리해요.',
      goals: ['new 대신 항상 make_unique/make_shared 쓰기', '함수에서 unique_ptr 넘기고 반환하기', '벡터로 여러 스마트 포인터 관리하기'],
      blocks: [
        {
          h: '왜 new 대신 make_unique/make_shared를 쓸까요?',
          html: `<p><code>std::make_unique<T>(인자)</code>와 <code>std::make_shared<T>(인자)</code>는 <code>new</code>를 직접 쓰는 것보다 <b>예외 안전성</b>이 좋고(생성 도중 예외가 나도 누수가 안 생김), 코드도 더 짧아요. 그래서 실무에서는 <b>직접 new를 쓰는 경우가 거의 없어요</b>.</p>`,
          code: {
            label: 'make_functions.cpp',
            lang: 'cpp',
            src: `class Player {
public:
    std::string name;
    Player(std::string n) : name(n) {}
};

// 권장: make_unique
auto p1 = std::make_unique<Player>("지수");
// 비권장: new를 직접 사용
std::unique_ptr<Player> p2(new Player("민준"));

std::cout << p1->name << " " << p2->name << std::endl;`,
            out: `지수 민준`
          }
        },
        {
          h: '스마트 포인터를 함수에 넘기고 컨테이너에 담기',
          html: `<p>함수가 소유권을 넘겨받아야 한다면 <code>unique_ptr</code>를 <b>값으로</b>(이동해서) 받고, 그냥 잠깐 쓰기만 한다면 <b>참조나 원시 포인터</b>로 받아도 충분해요. 여러 개의 다형적 객체는 <code>std::vector<std::unique_ptr<Base>></code>처럼 담아서 관리하는 패턴이 아주 흔해요.</p>`,
          code: {
            label: 'vector_of_ptrs.cpp',
            lang: 'cpp',
            src: `class Shape {
public:
    virtual void draw() const = 0;
    virtual ~Shape() = default;
};
class Circle : public Shape {
public:
    void draw() const override { std::cout << "원 " ; }
};
class Square : public Shape {
public:
    void draw() const override { std::cout << "사각형 "; }
};

std::vector<std::unique_ptr<Shape>> shapes;
shapes.push_back(std::make_unique<Circle>());
shapes.push_back(std::make_unique<Square>());
for (const auto& s : shapes) s->draw();`,
            out: `원 사각형 `
          },
          after: `<div class="note"><b>정리</b> — 여러 종류의 자식 객체를 다형적으로 묶어서 관리하고 싶을 땐, <code>vector<unique_ptr<Base>></code> 패턴이 new/delete를 직접 관리하는 것보다 훨씬 안전하고 널리 쓰여요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'std::make_unique를 new보다 선호하는 이유는?',
          '예외 안전성이 더 좋고 코드가 더 간결해서', ['make_unique가 항상 메모리를 덜 쓰기 때문에', 'new는 C++14부터 사용이 금지되어서', 'make_unique만 delete가 자동으로 되기 때문에(new는 항상 자동 안 됨)'],
          'make_unique는 객체 생성과 스마트 포인터 생성을 한 번에 안전하게 처리해줘서 예외 상황에서도 누수가 없어요.',
          '"예외 안전성"이 핵심 키워드예요.'
        ),
        () => {
          const name = pick(['하늘', '별', '구름']);
          return {
            type: 'blank',
            q: `<code>class P { public: std::string name; P(std::string n) : name(n) {} }; auto p = std::make_unique<P>("${name}"); std::cout << p->name;</code>의 출력은?`,
            prefix: '', suffix: '', accept: [name], placeholder: '출력 결과',
            why: 'unique_ptr도 ->로 멤버에 접근할 수 있어요.',
            hint: 'p->name으로 접근해요.'
          };
        },
        () => makeChoice(
          '<code>std::vector<std::unique_ptr<Shape>></code> 패턴을 쓰는 이유는?',
          '서로 다른 자식 타입(Circle, Square 등)을 하나의 컨테이너에서 다형적으로 안전하게 관리하기 위해', ['vector에는 unique_ptr만 담을 수 있어서(다른 건 불가능)', '항상 메모리를 아끼기 위해서', 'Shape가 추상 클래스이면 안 되기 때문에'],
          '여러 종류의 도형 객체를 unique_ptr로 감싸 하나의 컨테이너에 담으면, 다형성을 안전하게 유지하며 관리할 수 있어요.',
          '"다형적 객체 모음 관리"가 목적이에요.'
        ),
        () => makeChoice(
          '함수가 unique_ptr의 소유권을 완전히 넘겨받아야 할 때 매개변수로 적합한 형태는?',
          'std::unique_ptr<T> (값으로 받아서 이동)', ['std::unique_ptr<T>& (참조)만 항상 사용', 'T* (원시 포인터)만 항상 사용', 'std::shared_ptr<T>로 무조건 바꿔서 사용'],
          '소유권 이전이 목적이라면 값으로 받아 std::move로 넘기는 게 의도를 가장 명확히 드러내요.',
          '"소유권 이전"이 핵심이면 값으로 받는 게 맞아요.'
        ),
        () => ({
          type: 'code',
          q: 'std::make_unique를 이용해 Player("지수") 객체를 가리키는 unique_ptr<Player> p를 만드는 한 줄을 작성하세요.',
          starter: '',
          placeholder: 'auto p = std::make_unique<Player>("지수");',
          accept: ['auto p = std::make_unique<Player>("지수");'],
          why: 'make_unique에 생성자 인자를 그대로 넘겨서 안전하게 생성해요.',
          hint: 'auto p = std::make_unique<Player>("지수");'
        }),
      ],
      boss: () => {
        const names = [pick(['원', '삼각형']), pick(['사각형', '오각형'])];
        return {
          type: 'blank',
          q: `<code>class Shape { public: virtual void draw() const = 0; virtual ~Shape() = default; }; class A : public Shape { public: void draw() const override { std::cout << "${names[0]} "; } }; class B : public Shape { public: void draw() const override { std::cout << "${names[1]} "; } }; std::vector<std::unique_ptr<Shape>> v; v.push_back(std::make_unique<A>()); v.push_back(std::make_unique<B>()); for (const auto& s : v) s->draw();</code>를 실행하면? (끝에 공백 포함)`,
          prefix: '', suffix: '', accept: [`${names[0]} ${names[1]} `], placeholder: '출력 결과',
          why: '각 unique_ptr가 가리키는 실제 객체의 draw()가 virtual 덕분에 순서대로 호출돼요.',
          hint: 'vector에 담긴 순서대로 draw()가 실행돼요.'
        };
      }
    },
    {
      id: 'capstoneClassHierarchy',
      title: '캡스톤 — 스마트 포인터와 클래스 계층 종합',
      ready: true,
      summary: '상속, 다형성, 스마트 포인터, STL을 모두 활용한 작은 프로그램을 완성해봐요.',
      goals: ['추상 클래스로 공통 인터페이스 설계', 'vector<unique_ptr<Base>>로 여러 객체 관리', 'STL 알고리즘으로 집계하기'],
      blocks: [
        {
          h: '동물원 만들기 — 배운 것 총동원',
          html: `<p>지금까지 배운 것들을 모두 조합해봐요: <b>추상 클래스</b>로 공통 인터페이스(<code>Animal</code>)를 만들고, 여러 <b>자식 클래스</b>가 이를 <b>다형적으로</b> 구현하고, <code>std::vector<std::unique_ptr<Animal>></code>로 안전하게 관리해요.</p>`,
          code: {
            label: 'zoo.cpp',
            lang: 'cpp',
            src: `class Animal {
public:
    std::string name;
    Animal(std::string n) : name(n) {}
    virtual std::string sound() const = 0;
    virtual ~Animal() = default;
};
class Dog : public Animal {
public:
    Dog(std::string n) : Animal(n) {}
    std::string sound() const override { return "멍멍"; }
};
class Cat : public Animal {
public:
    Cat(std::string n) : Animal(n) {}
    std::string sound() const override { return "야옹"; }
};

std::vector<std::unique_ptr<Animal>> zoo;
zoo.push_back(std::make_unique<Dog>("초코"));
zoo.push_back(std::make_unique<Cat>("나비"));

for (const auto& a : zoo) {
    std::cout << a->name << ": " << a->sound() << std::endl;
}`,
            out: `초코: 멍멍\n나비: 야옹`
          }
        },
        {
          h: 'STL 알고리즘으로 동물원 집계하기',
          html: `<p>람다와 <code>std::count_if</code>를 조합해서, 예를 들어 "멍멍 소리를 내는 동물이 몇 마리인지" 세어볼 수 있어요.</p>`,
          code: {
            label: 'zoo_count.cpp',
            lang: 'cpp',
            src: `int dogCount = std::count_if(zoo.begin(), zoo.end(), [](const std::unique_ptr<Animal>& a) {
    return a->sound() == "멍멍";
});
std::cout << "개는 " << dogCount << "마리" << std::endl;`,
            out: `개는 1마리`
          },
          after: `<div class="note"><b>정리</b> — 이 한 예제 안에 캡슐화(private+생성자), 상속, 다형성(virtual), 추상 클래스(순수 가상 함수), 스마트 포인터(unique_ptr, RAII), STL 컨테이너(vector), 람다, STL 알고리즘(count_if)이 모두 들어있어요. 이 조합이 실무 C++ 코드의 아주 전형적인 모습이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const sounds = ['멍멍', '야옹', '음메'];
          const s = pick(sounds);
          return {
            type: 'blank',
            q: `<code>class A { public: virtual std::string sound() const = 0; virtual ~A() = default; }; class Dog : public A { public: std::string sound() const override { return "${s}"; } }; std::unique_ptr<A> p = std::make_unique<Dog>(); std::cout << p->sound();</code>의 출력은?`,
            prefix: '', suffix: '', accept: [s], placeholder: '출력 결과',
            why: 'unique_ptr를 통해서도 virtual 함수는 실제 객체(Dog)의 버전이 호출돼요.',
            hint: 'virtual 덕분에 실제 타입의 메서드가 실행돼요.'
          };
        },
        () => makeChoice(
          '<code>std::vector<std::unique_ptr<Animal>></code>를 쓰는 이유로 가장 알맞은 것은?',
          '서로 다른 자식 타입의 동물들을 하나의 컨테이너에서 다형적으로, 안전하게(자동 메모리 해제) 관리하기 위해', ['Animal은 반드시 vector로만 만들 수 있어서', '메모리를 아예 쓰지 않기 위해서', 'unique_ptr가 없으면 vector를 만들 수 없어서'],
          '이 패턴은 다형성과 자동 메모리 관리를 동시에 만족시키는 실무의 표준적인 방법이에요.',
          '"다형성 + 자동 해제"가 핵심이에요.'
        ),
        () => {
          const dogs = randInt(1, 3), cats = randInt(1, 3);
          return {
            type: 'blank',
            q: `동물원에 개가 ${dogs}마리, 고양이가 ${cats}마리 있을 때, <code>std::count_if(zoo.begin(), zoo.end(), [](const auto& a) { return a->sound() == "멍멍"; })</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(dogs)], placeholder: '숫자',
            why: `"멍멍" 소리를 내는 동물(개)의 수는 ${dogs}마리예요.`,
            hint: 'count_if는 조건에 맞는 개수만 세요.'
          };
        },
        () => makeChoice(
          '추상 클래스 Animal에 <code>virtual ~Animal() = default;</code>를 넣는 이유는?',
          '부모 포인터(unique_ptr<Animal>)로 자식 객체를 안전하게 소멸시키기 위해', ['소멸자를 아예 없애기 위해서', '생성자를 오버로딩하기 위해서', 'Animal을 abstract가 아니게 만들기 위해서'],
          '다형적으로 쓰이는 클래스는 virtual 소멸자가 있어야 자식의 자원까지 안전하게 정리돼요.',
          '이전에 배운 virtual 소멸자 단원을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '추상 클래스 Shape(virtual double area() const = 0;, virtual 소멸자)를 상속받는 Circle 클래스를 작성하세요. Circle은 double r 멤버와 생성자를 가지고, area()는 3.14 * r * r을 반환합니다.',
          starter: '',
          rows: 5,
          placeholder: 'class Circle : public Shape {\npublic:\n    double r;\n    Circle(double radius) : r(radius) {}\n    double area() const override { return 3.14 * r * r; }\n};',
          accept: ['class Circle : public Shape {\npublic:\n    double r;\n    Circle(double radius) : r(radius) {}\n    double area() const override { return 3.14 * r * r; }\n};'],
          why: '부모의 순수 가상 함수 area()를 override로 구현해요.',
          hint: 'class Circle : public Shape { public: double r; Circle(double radius) : r(radius) {} double area() const override { return 3.14 * r * r; } };'
        }),
      ],
      boss: () => {
        const dogName = pick(['초코', '보리']);
        const catName = pick(['나비', '루시']);
        return {
          type: 'blank',
          q: `<code>class Animal { public: std::string name; Animal(std::string n) : name(n) {} virtual std::string sound() const = 0; virtual ~Animal() = default; }; class Dog : public Animal { public: Dog(std::string n) : Animal(n) {} std::string sound() const override { return "멍멍"; } }; class Cat : public Animal { public: Cat(std::string n) : Animal(n) {} std::string sound() const override { return "야옹"; } }; std::vector<std::unique_ptr<Animal>> zoo; zoo.push_back(std::make_unique<Dog>("${dogName}")); zoo.push_back(std::make_unique<Cat>("${catName}")); int dogs = std::count_if(zoo.begin(), zoo.end(), [](const auto& a) { return a->sound() == "멍멍"; }); std::cout << zoo[0]->name << " " << dogs;</code>를 실행하면? (형식: 이름 숫자)`,
          prefix: '', suffix: '', accept: [`${dogName} 1`], placeholder: '출력 결과',
          why: `zoo[0]은 ${dogName}(Dog)이고, count_if로 센 개의 수는 1마리예요.`,
          hint: '첫 번째 동물의 이름과, 멍멍 소리를 내는 동물의 수를 출력해요.'
        };
      }
    },
    {
      id: 'modernCppRecap',
      title: '정리 — 모던 C++와 다음 단계',
      ready: true,
      summary: '이 강좌에서 배운 핵심 개념들을 정리하고, 다음 학습 방향을 알아봐요.',
      goals: ['모던 C++의 핵심 습관 정리', '더 배우면 좋은 주제 살펴보기', '실전 프로젝트로 나아가기'],
      blocks: [
        {
          h: '모던 C++ 체크리스트',
          html: `<p>좋은 C++ 코드는 보통 이런 습관을 따라요: <b>new/delete 대신 스마트 포인터</b>, <b>배열 대신 std::vector</b>, <b>원시 반복문 대신 STL 알고리즘/람다</b>, <b>virtual 함수를 쓰면 override와 virtual 소멸자를 세트로</b>, <b>const를 붙일 수 있는 곳엔 최대한 붙이기</b>.</p>`,
          code: {
            label: 'modern_cpp_checklist.txt',
            lang: 'cpp',
            src: `체크리스트:
- new/delete 대신 std::unique_ptr / std::shared_ptr를 썼는가?
- 배열 대신 std::vector를 기본으로 선택했는가?
- 원시 for문 대신 STL 알고리즘 + 람다를 고려했는가?
- virtual 함수를 쓴다면 override와 virtual 소멸자를 함께 챙겼는가?
- 값을 바꾸지 않는 매개변수/메서드에 const를 붙였는가?
- 자원을 직접 관리하는 클래스라면 Rule of Five를 고려했는가?`,
            out: `(자기 점검용 체크리스트)`
          }
        },
        {
          h: '다음으로 가볼 만한 곳',
          html: `<p>여기까지 오셨다면 C++의 핵심(객체지향, 템플릿, STL, 스마트 포인터, 예외 처리, 동시성)을 모두 훑은 거예요. 다음 단계로는 직접 작은 프로젝트(예: 간단한 계산기, 텍스트 기반 게임)를 만들어보면서 컴파일러 오류를 하나씩 해결해나가는 게 가장 빠른 성장 방법이에요. 더 깊이 파고들고 싶다면 <b>CMake</b>(빌드 도구), <b>Boost/Abseil</b> 같은 라이브러리, <b>C++20의 concepts/coroutines</b> 같은 최신 기능도 살펴볼 만해요.</p>`,
          after: `<div class="note"><b>수고하셨어요!</b> — C++는 배울 것이 많은 언어지만, 그만큼 게임 엔진, 시스템 프로그래밍, 금융 시스템, 코딩 테스트 등 정말 다양한 분야에서 여전히 강력하게 쓰이고 있어요. 여기서 배운 기초가 그 모든 곳으로 향하는 든든한 발판이 될 거예요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '모던 C++에서 new/delete 대신 권장되는 것은?',
          '스마트 포인터(unique_ptr, shared_ptr)', ['더 많은 전역 변수', 'malloc/free', '매크로'],
          '스마트 포인터는 RAII로 메모리 관리를 자동화해서 실수를 줄여줘요.',
          '이 강좌의 여러 단원에서 반복해서 강조한 내용이에요.'
        ),
        () => makeChoice(
          'virtual 함수를 재정의할 때 함께 챙겨야 할 두 가지는?',
          'override 키워드와 부모의 virtual 소멸자', ['static과 friend', 'const와 constexpr', 'namespace와 using'],
          'override는 재정의 실수를 막고, virtual 소멸자는 다형적 삭제를 안전하게 해줘요.',
          '다형성 관련 단원들에서 배운 짝꿍 개념이에요.'
        ),
        () => makeChoice(
          '배열 대신 std::vector를 기본으로 선택하는 이유는?',
          '크기를 자유롭게 늘릴 수 있고 더 안전하게 다룰 수 있어서', ['vector가 항상 배열보다 메모리를 적게 써서', '배열은 C++에서 아예 쓸 수 없어서', 'vector만 sizeof를 지원해서'],
          'vector는 동적으로 크기가 조절되고, size() 같은 안전한 기능도 함께 제공해요.',
          '배열의 한계를 다룬 단원을 떠올려보세요.'
        ),
        () => makeChoice(
          '이 강좌를 마친 다음 단계로 가장 추천되는 것은?',
          '작은 프로젝트를 직접 만들며 컴파일러 오류를 해결해나가는 것', ['모든 코드에서 new/delete만 사용해보는 것', '이론만 계속 반복해서 읽는 것', 'C 언어로 다시 돌아가는 것'],
          '직접 만들어보며 실전 문제를 해결하는 경험이 가장 빠르게 실력을 키워줘요.',
          '"직접 만들어보기"가 핵심 조언이에요.'
        ),
        () => ({
          type: 'code',
          q: 'std::vector<int>를 받아, 짝수만 골라 제곱한 값들의 합을 반환하는 함수 sumOfEvenSquares를 작성하세요. (for문 또는 STL 알고리즘 중 편한 방식으로)',
          starter: '',
          rows: 6,
          placeholder: 'int sumOfEvenSquares(const std::vector<int>& nums) {\n    int total = 0;\n    for (int n : nums) {\n        if (n % 2 == 0) total += n * n;\n    }\n    return total;\n}',
          accept: ['int sumOfEvenSquares(const std::vector<int>& nums) {\n    int total = 0;\n    for (int n : nums) {\n        if (n % 2 == 0) total += n * n;\n    }\n    return total;\n}'],
          why: '짝수를 걸러서 제곱한 뒤 모두 더하는 로직을 범위 기반 for문으로 구현해요.',
          hint: 'for (int n : nums) { if (n % 2 == 0) total += n * n; }'
        }),
      ],
      boss: () => {
        const nums = [randInt(1, 10), randInt(1, 10), randInt(1, 10), randInt(1, 10)];
        const sum = nums.filter(n => n % 2 === 0).reduce((a, b) => a + b * b, 0);
        return {
          type: 'blank',
          q: `<code>int sumOfEvenSquares(const std::vector<int>& nums) { int total = 0; for (int n : nums) { if (n % 2 == 0) total += n * n; } return total; } std::vector<int> v = {${nums.join(', ')}}; std::cout << sumOfEvenSquares(v);</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `짝수만 골라 제곱해서 더하면 ${sum}이에요.`,
          hint: '짝수인 값들만 제곱해서 더해보세요.'
        };
      }
    }],
  tierBoss: {
    beginner: () => {
      const name = pick(['지수', '민준', '서연']);
      const age = randInt(14, 19);
      return {
        type: 'code',
        q: `<code>std::string</code> 타입 name("${name}")과 int 타입 age(${age})를 선언하고, age가 18 이상이면 "성인", 아니면 "미성년자"를 출력하는 프로그램을 작성하세요. (int main() 없이, 코드만)`,
        starter: '',
        rows: 6,
        placeholder: `std::string name = "${name}";\nint age = ${age};\nif (age >= 18) {\n    std::cout << "성인";\n} else {\n    std::cout << "미성년자";\n}`,
        accept: [`std::string name = "${name}";\nint age = ${age};\nif (age >= 18) {\n    std::cout << "성인";\n} else {\n    std::cout << "미성년자";\n}`],
        why: '변수를 선언하고, if/else로 조건에 따라 다른 결과를 출력해요.',
        hint: 'std::string name = "..."; int age = ...; 다음 if (age >= 18) { } else { }를 써보세요.'
      };
    },
    intermediate: () => ({
      type: 'code',
      q: 'std::vector<int>를 받아, 짝수만 골라 각 값을 제곱한 뒤 합을 반환하는 함수 sumOfEvenSquares(const std::vector<int>& nums)를 작성하세요.',
      starter: '',
      rows: 6,
      placeholder: 'int sumOfEvenSquares(const std::vector<int>& nums) {\n    int total = 0;\n    for (int n : nums) {\n        if (n % 2 == 0) total += n * n;\n    }\n    return total;\n}',
      accept: ['int sumOfEvenSquares(const std::vector<int>& nums) {\n    int total = 0;\n    for (int n : nums) {\n        if (n % 2 == 0) total += n * n;\n    }\n    return total;\n}'],
      why: '범위 기반 for문으로 각 값을 확인해, 짝수면 제곱해서 total에 더해요.',
      hint: 'for (int n : nums) { if (n % 2 == 0) total += n * n; } return total;'
    }),
    advanced: () => ({
      type: 'code',
      q: 'virtual double area() const = 0;를 요구하는 추상 클래스 Shape(virtual 소멸자 포함)를 정의하고, double width, height 필드를 가진 Rectangle이 이를 구현(area는 width * height)하도록 작성하세요.',
      starter: '',
      rows: 12,
      placeholder: 'class Shape {\npublic:\n    virtual double area() const = 0;\n    virtual ~Shape() = default;\n};\n\nclass Rectangle : public Shape {\npublic:\n    double width, height;\n    Rectangle(double w, double h) : width(w), height(h) {}\n    double area() const override { return width * height; }\n};',
      accept: ['class Shape {\npublic:\n    virtual double area() const = 0;\n    virtual ~Shape() = default;\n};\n\nclass Rectangle : public Shape {\npublic:\n    double width, height;\n    Rectangle(double w, double h) : width(w), height(h) {}\n    double area() const override { return width * height; }\n};'],
      why: '추상 클래스로 규약을 정의하고, 자식 클래스가 override로 실제 구현을 채워 넣어요.',
      hint: 'class Shape { public: virtual double area() const = 0; virtual ~Shape() = default; }; 다음 class Rectangle : public Shape { public: double width, height; Rectangle(double w, double h) : width(w), height(h) {} double area() const override { return width * height; } };'
    }),
  }
};
