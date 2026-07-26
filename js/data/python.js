/* Python 강의·문제 데이터 — 단원을 추가하려면 units 배열에 항목을 넣으면 됩니다. */
COURSES.python = {
    name: 'Python',
    tagline: '문법이 짧고 쉬워서 첫 언어로 가장 많이 추천되는 언어',
    units: [{
      id: 'vars',
      title: '변수와 자료형',
      ready: true,
      summary: '컴퓨터에게 값을 "기억"시키는 방법과, 그 값이 어떤 종류인지 배워요. 완전 처음이어도 괜찮아요.',
      goals: ['변수 만들기', '숫자·글자·참거짓 값', 'type()으로 확인하기', '형변환', 'f-string'],
      blocks: [
        {
          h: '변수는 "이름표가 붙은 상자"예요',
          html: `<p>상자에 이름표를 붙이고 그 안에 물건을 넣어두면, 나중에 이름표만 보고 무엇이 들었는지 알 수 있죠? 프로그래밍에서 <b>변수</b>도 똑같아요. 값에 이름을 붙여서 나중에 다시 꺼내 쓰는 거예요.</p>
                 <p>파이썬에서는 <code>이름 = 값</code>이라고만 쓰면 변수가 만들어져요. 이때 <code>=</code>는 "같다"가 아니라 <b>"오른쪽 값을 왼쪽 이름에 넣어라"</b>는 뜻이에요. 두 값이 진짜로 같은지 물어볼 때는 <code>==</code>처럼 등호를 두 번 씁니다.</p>`,
          code: {
            label: 'variables.py',
            src: `name = "지수"      # 글자(문자열)
age = 17           # 정수(숫자)
height = 165.3     # 소수점이 있는 숫자
is_student = True  # 참(True) 또는 거짓(False)

print(name, age)
print(type(height))`,
            out: `지수 17\n<class 'float'>`
          }
        },
        {
          h: '값에는 네 가지 기본 "종류"가 있어요',
          html: `<p>사람도 "이건 과일이야, 이건 채소야"처럼 종류를 나누듯이, 컴퓨터도 값의 종류(자료형)를 구분해요. 종류가 다르면 계산하는 방식도 달라지거든요.</p>
                 <table>
                   <tr><th>종류(자료형)</th><th>예시</th><th>쉬운 설명</th></tr>
                   <tr><td><code>int</code></td><td><code>17</code></td><td>소수점이 없는 숫자</td></tr>
                   <tr><td><code>float</code></td><td><code>3.14</code></td><td>소수점이 있는 숫자</td></tr>
                   <tr><td><code>str</code></td><td><code>"안녕"</code></td><td>따옴표로 감싼 글자</td></tr>
                   <tr><td><code>bool</code></td><td><code>True</code></td><td>참(True) 또는 거짓(False), 딱 두 가지 뿐</td></tr>
                 </table>
                 <p>이 값이 무슨 종류인지 헷갈리면 <code>type(값)</code>이라고 써 보세요. 컴퓨터가 바로 알려줘요.</p>`
        },
        {
          h: '다른 종류로 바꾸기 (형변환)',
          html: `<p>사람이 키보드로 입력한 값은 <code>input()</code>으로 받는데, 이건 <b>항상 글자(문자열)</b>로 들어와요. 숫자로 계산하려면 <code>int()</code>나 <code>float()</code>로 바꿔줘야 해요.</p>
                 <p>또, 문장 중간에 변수 값을 끼워 넣고 싶을 때는 따옴표 앞에 <code>f</code>를 붙이고, 변수 이름을 중괄호 <code>{ }</code>로 감싸면 돼요. 이걸 <b>f-string</b>이라고 불러요.</p>`,
          code: {
            label: 'convert.py',
            src: `year = input("태어난 해? ")   # "2009" 처럼 글자로 들어옴
year = int(year)               # 2009, 이제 숫자
age = 2026 - year

print(f"{age}살이네요!")
print("2" + "3")     # 글자끼리 이어붙임 → "23"
print(2 + 3)         # 숫자끼리 더함 → 5`,
            out: `태어난 해? 2009\n17살이네요!\n23\n5`
          },
          after: `<div class="note"><b>자주 하는 실수</b> — <code>"2" + 3</code>처럼 글자와 숫자를 그냥 더하면 오류(<code>TypeError</code>)가 나요. 둘 중 하나를 먼저 같은 종류로 바꿔줘야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const items = [
            { val: `${randInt(1, 999)}`, type: 'int', ko: '소수점 없는 숫자' },
            { val: `${randInt(1, 99)}.${randInt(1, 99)}`, type: 'float', ko: '소수점이 있는 숫자' },
            { val: `"${pick(['안녕', '파이썬', '고양이', '바나나'])}"`, type: 'str', ko: '따옴표로 감싼 글자' },
            { val: pick(['True', 'False']), type: 'bool', ko: '참/거짓 값' },
          ];
          const it = pick(items);
          const others = ['int', 'float', 'str', 'bool'].filter(t => t !== it.type);
          return makeChoice(
            `<code>x = ${it.val}</code> 라고 썼을 때, <code>type(x)</code>의 결과로 알맞은 것은?`,
            `<code>&lt;class '${it.type}'&gt;</code>`,
            others.map(t => `<code>&lt;class '${t}'&gt;</code>`),
            `${it.val}은(는) ${it.ko}라서 <code>${it.type}</code> 종류예요.`,
            '값에 소수점이 있는지, 따옴표가 있는지, True/False인지를 먼저 살펴보세요.'
          );
        },
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          const op = pick(['+', '-', '*']);
          const result = op === '+' ? a + b : op === '-' ? a - b : a * b;
          return {
            type: 'blank',
            q: `<code>print(${a} ${op} ${b})</code>를 실행하면 어떤 숫자가 출력될까요? 숫자만 입력하세요.`,
            prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
            why: `${a} ${op} ${b} = ${result} 예요.`,
            hint: '보통 수학 계산과 똑같아요. 순서대로 계산해보세요.'
          };
        },
        () => {
          const isFloat = Math.random() < 0.5;
          const raw = isFloat ? `${randInt(1, 50)}.${randInt(1, 9)}` : `${randInt(1, 999)}`;
          const fn = isFloat ? 'float' : 'int';
          return {
            type: 'blank',
            q: `글자 <code>"${raw}"</code>를 계산에 쓸 수 있는 숫자로 바꾸려고 해요. 빈칸에 알맞은 함수 이름을 쓰세요.`,
            prefix: 'n = ', suffix: `("${raw}")`, accept: [fn], placeholder: '함수 이름',
            why: `"${raw}"는 ${isFloat ? '소수점이 있으니 float' : '소수점이 없으니 int'}로 바꿔요.`,
            hint: '소수점이 있으면 float, 없으면 int예요.'
          };
        },
        () => {
          const name = pick(['age', 'score', 'count', 'price']);
          const ko = { age: '나이', score: '점수', count: '개수', price: '가격' }[name];
          return {
            type: 'blank',
            q: `변수 <code>${name}</code>(${ko})의 값을 문장 속에 끼워서 출력하려고 해요. 빈칸을 채우세요.`,
            prefix: `print(f"${ko}: `, suffix: `")`, accept: [`{${name}}`], placeholder: '{...}',
            why: `f-string 안에서는 <code>{${name}}</code>처럼 중괄호로 변수를 감싸서 값을 끼워 넣어요.`,
            hint: '중괄호 { } 안에 변수 이름을 그대로 넣으면 돼요.'
          };
        },
        () => makeChoice(
          '파이썬에서 "참"을 나타내는 올바른 표기는 무엇일까요?',
          '<code>True</code>', ['<code>true</code>', '<code>TRUE</code>', '<code>1</code>'],
          '파이썬의 참/거짓 값은 <code>True</code>, <code>False</code>처럼 첫 글자만 대문자예요.',
          '파이썬은 첫 글자만 대문자로 쓰는 특이한 규칙이 있어요.'
        ),
        () => ({
          type: 'code',
          q: '정수 <code>20</code>을 담는 변수 <code>age</code>를 만드는 코드를 직접 작성하세요.',
          starter: '',
          placeholder: 'age = 20',
          accept: ['age = 20'],
          why: '변수는 <code>이름 = 값</code> 형태로 만들어요. <code>age = 20</code>이라고 쓰면 돼요.',
          hint: '등호(=) 왼쪽에 변수 이름, 오른쪽에 값을 놓으면 돼요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연', '도윤']);
        const age = randInt(10, 19);
        const next = age + 1;
        return {
          type: 'blank',
          q: `<code>name = "${name}"</code>, <code>age = ${age}</code>로 정한 뒤, <code>print(f"{name}은(는) 내년에 {age + 1}살이 돼요")</code>를 실행하면 무엇이 출력될까요? 따옴표 없이 그대로 입력하세요.`,
          prefix: '', suffix: '', accept: [`${name}은(는) 내년에 ${next}살이 돼요`], placeholder: '출력될 문장',
          why: `f-string 중괄호 안의 <code>{age + 1}</code>은 먼저 계산(${age} + 1 = ${next})된 뒤 글자로 합쳐져요.`,
          hint: 'f-string 중괄호 안에 변수만 아니라 계산식도 넣을 수 있고, 계산까지 끝난 값이 들어가요.'
        };
      }
    },
    {
      id: 'flow',
      title: '조건문과 분기',
      ready: true,
      summary: '조건에 따라 다른 코드를 실행하는 방법을 배워요. "만약 ~라면"을 코드로 쓰는 거예요.',
      goals: ['if / elif / else', '비교 연산자', 'and / or / not', '들여쓰기 규칙'],
      blocks: [
        {
          h: '"만약 ~라면" — if 문',
          html: `<p>갈림길 앞에서 "비가 오면 우산을 챙기고, 아니면 그냥 나간다"처럼 조건에 따라 다른 행동을 고르는 걸 코드로 쓸 수 있어요. 이게 <code>if</code>문이에요.</p>
                 <p>조건이 <b>참(True)</b>이면 그 아래 들여쓰기된 코드가 실행되고, <b>거짓(False)</b>이면 건너뛰어요. 여러 조건을 순서대로 검사하려면 <code>elif</code>(추가 조건), 마지막으로 아무 조건도 안 맞을 때는 <code>else</code>를 씁니다.</p>`,
          code: {
            label: 'flow.py',
            src: `age = 17

if age >= 20:
    print("성인이에요")
elif age >= 13:
    print("청소년이에요")
else:
    print("어린이예요")`,
            out: `청소년이에요`
          }
        },
        {
          h: '비교 연산자와 and / or',
          html: `<table>
                   <tr><th>연산자</th><th>뜻</th></tr>
                   <tr><td><code>==</code></td><td>같다</td></tr>
                   <tr><td><code>!=</code></td><td>다르다</td></tr>
                   <tr><td><code>&gt;</code>, <code>&lt;</code></td><td>크다, 작다</td></tr>
                   <tr><td><code>&gt;=</code>, <code>&lt;=</code></td><td>크거나 같다, 작거나 같다</td></tr>
                 </table>
                 <p>조건을 여러 개 합칠 땐 <b>둘 다 참이어야 하면</b> <code>and</code>, <b>하나만 참이어도 되면</b> <code>or</code>를 씁니다. <code>not</code>은 참/거짓을 뒤집어요.</p>`,
          code: {
            label: 'and_or.py',
            src: `age = 17
has_ticket = True

if age >= 14 and has_ticket:
    print("입장 가능")
else:
    print("입장 불가")`,
            out: `입장 가능`
          }
        },
        {
          h: '들여쓰기가 곧 문법이에요',
          html: `<p>파이썬은 중괄호 대신 <b>들여쓰기(칸 맞추기)</b>로 "이 코드가 if 안에 속해 있다"를 표시해요. 그래서 들여쓰기 칸 수가 다르면 오류가 나요. <code>if</code>, <code>elif</code>, <code>else</code> 뒤에는 항상 콜론(<code>:</code>)을 붙여야 해요.</p>`,
          after: `<div class="note"><b>자주 하는 실수</b> — <code>if age &gt;= 20</code> 뒤에 <code>:</code>를 빼먹으면 오류가 나요. 콜론은 "이 조건 아래에 실행할 코드가 온다"는 신호예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const age = randInt(1, 25);
          const label = age >= 20 ? '성인이에요' : age >= 13 ? '청소년이에요' : '어린이예요';
          return {
            type: 'blank',
            q: `나이가 <code>${age}</code>살일 때, 20살 이상이면 "성인이에요", 13살 이상이면 "청소년이에요", 그 미만이면 "어린이예요"를 출력하는 코드가 있어요. 무엇이 출력될까요? 따옴표 없이 그대로 입력하세요.`,
            prefix: '', suffix: '', accept: [label], placeholder: '출력될 문장',
            why: `${age}살은 ${age >= 20 ? '20살 이상이라 "성인이에요"' : age >= 13 ? '13살 이상 20살 미만이라 "청소년이에요"' : '13살 미만이라 "어린이예요"'}가 출력돼요.`,
            hint: '나이를 20살, 13살 두 기준과 순서대로 비교해보세요.'
          };
        },
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          const op = pick(['==', '!=', '>', '<']);
          const result = op === '==' ? a === b : op === '!=' ? a !== b : op === '>' ? a > b : a < b;
          return makeChoice(
            `<code>print(${a} ${op} ${b})</code>의 출력은?`,
            `<code>${result}</code>`, [`<code>${!result}</code>`],
            `${a} ${op} ${b}는 ${result}예요.`,
            '두 수를 비교 연산자에 맞게 참(True)인지 거짓(False)인지 판단해보세요.'
          );
        },
        () => {
          const p1 = Math.random() < 0.5, p2 = Math.random() < 0.5;
          const useAnd = Math.random() < 0.5;
          const result = useAnd ? (p1 && p2) : (p1 || p2);
          return makeChoice(
            `<code>print(${p1} ${useAnd ? 'and' : 'or'} ${p2})</code>의 출력은?`,
            `<code>${result}</code>`, [`<code>${!result}</code>`],
            useAnd ? '<code>and</code>는 둘 다 참일 때만 참이에요.' : '<code>or</code>는 하나만 참이어도 참이에요.',
            'and는 둘 다 참이어야, or는 하나만 참이어도 결과가 참이에요.'
          );
        },
        () => ({
          type: 'blank',
          q: `조건문 뒤에는 항상 어떤 문장 부호를 붙여야 할까요?`,
          prefix: 'if age >= 20', suffix: '\n    print("성인")', accept: [':'], placeholder: '문장 부호',
          why: '<code>if</code>, <code>elif</code>, <code>else</code> 뒤에는 항상 콜론(:)을 붙여요.',
          hint: '문장 끝에 오는, 마침표처럼 생긴 그 문장 부호예요.'
        }),
        () => makeChoice(
          '아무 조건도 맞지 않을 때 실행되는 부분은?',
          '<code>else</code>', ['<code>elif</code>', '<code>if</code>', '<code>and</code>'],
          '<code>else</code>는 앞의 모든 조건이 거짓일 때 실행돼요.',
          '앞의 모든 조건이 거짓일 때 마지막으로 실행되는 부분을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '변수 <code>score</code>가 60 이상이면 <code>"합격"</code>을, 아니면 <code>"불합격"</code>을 출력하는 if-else문을 작성하세요. (<code>score</code>는 이미 정의되어 있다고 가정)',
          starter: '',
          rows: 4,
          placeholder: 'if score >= 60:\n    print("합격")\nelse:\n    print("불합격")',
          accept: ['if score >= 60:\n    print("합격")\nelse:\n    print("불합격")'],
          why: '<code>if 조건:</code> 다음 줄에 들여써서 실행할 코드를, <code>else:</code> 다음 줄에도 들여써서 실행할 코드를 써요.',
          hint: 'if score >= 60: 그 아래 줄에 print("합격"), else: 그 아래 줄에 print("불합격")을 써보세요.'
        }),
      ],
      boss: () => {
        const age = randInt(1, 25);
        const hasTicket = Math.random() < 0.5;
        const ok = age >= 14 && hasTicket;
        const label = ok ? '입장 가능' : '입장 불가';
        return {
          type: 'blank',
          q: `<code>age = ${age}</code>, <code>has_ticket = ${hasTicket ? 'True' : 'False'}</code>일 때, "나이가 14살 이상이고 티켓이 있으면 입장 가능, 아니면 입장 불가"를 출력하는 코드의 결과는? 따옴표 없이 입력하세요.`,
          prefix: '', suffix: '', accept: [label], placeholder: '출력될 문장',
          why: `나이는 ${age >= 14 ? '14살 이상' : '14살 미만'}이고 티켓은 ${hasTicket ? '있어요' : '없어요'}. 둘 다 참이어야 하는 and 조건이 ${ok ? '참이라 "입장 가능"' : '거짓이라 "입장 불가"'}이 출력돼요.`,
          hint: 'and는 두 조건이 모두 참이어야 참이에요. 나이 조건과 티켓 조건을 각각 따로 확인해보세요.'
        };
      }
    },
    {
      id: 'loop',
      title: '반복문',
      ready: true,
      summary: '같은 일을 여러 번 반복시키는 방법을 배워요. 컴퓨터는 지치지 않고 몇 번이든 반복할 수 있어요.',
      goals: ['for와 range()', 'while', 'break / continue'],
      blocks: [
        {
          h: '정해진 횟수만큼 반복하기: for',
          html: `<p>"팔굽혀펴기 10번"처럼 정해진 횟수만큼 반복할 땐 <code>for</code>문을 써요. <code>range(n)</code>은 0부터 <code>n-1</code>까지 숫자를 하나씩 꺼내줘요. 그래서 <code>range(5)</code>는 정확히 5번 반복돼요.</p>`,
          code: {
            label: 'for.py',
            src: `for i in range(5):
    print(f"{i}번째 인사")`,
            out: `0번째 인사\n1번째 인사\n2번째 인사\n3번째 인사\n4번째 인사`
          }
        },
        {
          h: '조건이 참인 동안 반복하기: while',
          html: `<p>"배터리가 남아있는 동안 계속 작동"처럼, 몇 번 반복할지 미리 모를 땐 <code>while</code>을 써요. 조건이 거짓이 될 때까지 계속 반복해요.</p>
                 <p><b>주의</b> — 조건이 절대 거짓이 되지 않으면 <b>무한히 반복</b>돼요(무한 루프). 그래서 반복문 안에서 조건을 바꿔주는 코드를 꼭 넣어야 해요.</p>`,
          code: {
            label: 'while.py',
            src: `count = 3
while count > 0:
    print(count)
    count = count - 1
print("발사!")`,
            out: `3\n2\n1\n발사!`
          }
        },
        {
          h: '중간에 멈추거나 건너뛰기: break, continue',
          html: `<p><code>break</code>는 반복문을 그 자리에서 완전히 끝내고, <code>continue</code>는 이번 한 번만 건너뛰고 다음 반복으로 넘어가요.</p>`,
          after: `<div class="note"><b>비유</b> — <code>break</code>는 "그만 뛰기", <code>continue</code>는 "한 바퀴만 쉬고 계속 뛰기"예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 8);
          return {
            type: 'blank',
            q: `<code>for i in range(${n}): print("hi")</code>는 총 몇 번 반복될까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `<code>range(${n})</code>은 0부터 ${n - 1}까지, 총 ${n}개의 숫자를 만들어서 ${n}번 반복해요.`,
            hint: 'range(n)은 0부터 n-1까지, 딱 n개의 숫자를 만들어요.'
          };
        },
        () => {
          const n = randInt(3, 6);
          let sum = 0;
          for (let i = 0; i < n; i++) sum += i;
          return {
            type: 'blank',
            q: `<code>total = 0</code>에서 시작해 <code>for i in range(${n}):</code>로 매번 <code>total = total + i</code>를 실행했어요. 실행 후 <code>total</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
            why: `0부터 ${n - 1}까지 다 더하면 ${sum}이에요.`,
            hint: '0부터 하나씩 늘려가며 다 더해보세요.'
          };
        },
        () => {
          const start = randInt(3, 6);
          return {
            type: 'blank',
            q: `<code>count = ${start}</code>에서 시작해 <code>count</code>가 <code>0</code>보다 클 때마다 1씩 줄이는 while 반복문은 총 몇 번 실행될까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(start)], placeholder: '숫자',
            why: `${start}, ${start - 1}, ... 1까지 총 ${start}번 실행되고 0이 되면 멈춰요.`,
            hint: '0이 될 때까지 하나씩 줄어드는 횟수를 세어보세요.'
          };
        },
        () => makeChoice(
          '반복문을 도중에 완전히 끝내고 싶을 때 쓰는 키워드는?',
          '<code>break</code>', ['<code>continue</code>', '<code>return</code>', '<code>stop</code>'],
          '<code>break</code>는 반복문을 그 자리에서 완전히 끝내요.',
          '"그만 뛰기"에 해당하는 키워드예요.'
        ),
        () => makeChoice(
          '이번 반복만 건너뛰고 다음 반복으로 넘어가고 싶을 때 쓰는 키워드는?',
          '<code>continue</code>', ['<code>break</code>', '<code>pass</code>', '<code>skip</code>'],
          '<code>continue</code>는 이번 한 번만 건너뛰고 다음 반복을 계속해요.',
          '"한 바퀴만 쉬고 계속 뛰기"에 해당하는 키워드예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>range(5)</code>를 이용해 0부터 4까지 각 숫자를 한 줄씩 출력하는 for문을 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'for i in range(5):\n    print(i)',
          accept: ['for i in range(5):\n    print(i)'],
          why: '<code>for i in range(5):</code> 다음 줄에 들여써서 <code>print(i)</code>를 쓰면 0부터 4까지 출력돼요.',
          hint: 'for i in range(5): 그 아래 줄에 print(i)를 써보세요.'
        }),
      ],
      boss: () => {
        const n = randInt(4, 8);
        let total = 0;
        for (let i = 0; i < n; i++) if (i % 2 === 0) total += i;
        return {
          type: 'blank',
          q: `<code>total = 0</code>으로 시작해서, <code>range(${n})</code>의 숫자들 중 짝수(2로 나눈 나머지가 0인 수)만 골라 <code>total</code>에 더하는 코드가 있어요. 실행 후 <code>total</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
          why: `0부터 ${n - 1}까지 중 짝수만 더하면 ${total}이에요.`,
          hint: 'range(n)은 0부터 n-1까지 반복해요. 그 중 2로 나눈 나머지가 0인 수(i % 2 == 0)만 골라 더해보세요.'
        };
      }
    },
    {
      id: 'func',
      title: '함수',
      ready: true,
      summary: '반복해서 쓰는 코드 덩어리에 이름을 붙여두고, 필요할 때마다 불러 쓰는 방법을 배워요.',
      goals: ['def로 함수 만들기', '매개변수와 반환값', '기본값 매개변수'],
      blocks: [
        {
          h: '함수는 "자판기"예요',
          html: `<p>자판기에 동전(입력)을 넣으면 음료수(출력)가 나오죠? 함수도 똑같아요. 값을 넣어주면(매개변수) 계산해서 결과를 돌려줘요(반환값, <code>return</code>).</p>
                 <p><code>def</code>로 함수를 만들고, 함수 이름 뒤 괄호 안에 입력받을 값(매개변수)을 적어요.</p>`,
          code: {
            label: 'func.py',
            src: `def add(a, b):
    return a + b

result = add(3, 4)
print(result)`,
            out: `7`
          }
        },
        {
          h: '기본값을 가진 매개변수',
          html: `<p>매개변수에 미리 기본값을 정해두면, 값을 안 넘겨도 그 기본값이 쓰여요.</p>`,
          code: {
            label: 'default.py',
            src: `def greet(name, greeting="안녕"):
    print(f"{greeting}, {name}!")

greet("지수")
greet("민준", "반가워")`,
            out: `안녕, 지수!\n반가워, 민준!`
          }
        },
        {
          h: 'return이 없는 함수',
          html: `<p><code>return</code>을 쓰지 않은 함수는 자동으로 <code>None</code>(아무 값도 없음)을 돌려줘요. 화면에 출력만 하고 값을 돌려줄 필요가 없다면 <code>return</code>이 없어도 괜찮아요.</p>`,
          after: `<div class="note"><b>주의</b> — <code>print()</code>는 화면에 "보여주기"만 하고, <code>return</code>은 값을 "돌려주기"예요. 둘은 달라요!</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>def add(a, b): return a + b</code> 함수에 <code>add(${a}, ${b})</code>라고 호출하면 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `${a} + ${b} = ${a + b}이 반환돼요.`,
            hint: '매개변수 a, b 자리에 순서대로 값이 들어간다고 생각하고 계산해보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `함수를 만들 때 맨 앞에 쓰는 키워드는 무엇일까요?`,
          prefix: '', suffix: ' add(a, b):\n    return a + b', accept: ['def'], placeholder: '키워드',
          why: '파이썬에서 함수는 <code>def</code>로 시작해요.',
          hint: 'definition(정의)의 줄임말이에요.'
        }),
        () => ({
          type: 'blank',
          q: `함수의 결과값을 돌려주는 키워드는 무엇일까요?`,
          prefix: 'def add(a, b):\n    ', suffix: ' a + b', accept: ['return'], placeholder: '키워드',
          why: '<code>return</code>은 함수 밖으로 값을 돌려줘요.',
          hint: '"돌려주다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          `<code>def greet(name, greeting="안녕")</code>에서 <code>greet("지수")</code>처럼 두 번째 값을 안 넘기면 <code>greeting</code>은?`,
          '<code>"안녕"</code>(기본값)', ['오류가 난다', '빈 문자열이 된다', '<code>None</code>이 된다'],
          '기본값이 정해진 매개변수는 값을 안 넘기면 그 기본값이 그대로 쓰여요.',
          '매개변수 옆에 <code>= 값</code>으로 미리 정해둔 값을 기본값이라고 해요.'
        ),
        () => makeChoice(
          '<code>return</code>이 없는 함수를 호출해서 결과를 변수에 저장하면?',
          '<code>None</code>이 저장된다', ['오류가 난다', '0이 저장된다', '빈 문자열이 저장된다'],
          '<code>return</code>이 없으면 함수는 자동으로 <code>None</code>을 돌려줘요.',
          '"돌려줄 값이 없음"을 나타내는 특별한 값을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '매개변수 두 개(<code>a</code>, <code>b</code>)를 받아서 곱을 반환하는 함수 <code>multiply</code>를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'def multiply(a, b):\n    return a * b',
          accept: ['def multiply(a, b):\n    return a * b'],
          why: '<code>def multiply(a, b):</code> 다음 줄에 들여써서 <code>return a * b</code>를 쓰면 돼요.',
          hint: 'def multiply(a, b): 그 아래 줄에 return a * b를 써보세요.'
        }),
      ],
      boss: () => {
        const base = randInt(1, 20);
        const bonusUsed = Math.random() < 0.5;
        const bonus = randInt(1, 10);
        const result = bonusUsed ? base + bonus : base + 5;
        return {
          type: 'blank',
          q: `<code>def add_bonus(score, bonus=5): return score + bonus</code> 함수가 있을 때, <code>add_bonus(${base}${bonusUsed ? `, ${bonus}` : ''})</code>라고 호출하면 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
          why: bonusUsed
            ? `bonus에 ${bonus}를 직접 넘겼으니 ${base} + ${bonus} = ${result}이에요.`
            : `bonus를 안 넘겼으니 기본값 5가 쓰여서 ${base} + 5 = ${result}이에요.`,
          hint: '두 번째 값을 안 넘기면 기본값(=5)이 쓰이고, 넘기면 그 값이 기본값 대신 쓰여요.'
        };
      }
    },
    {
      id: 'coll',
      title: '리스트와 자료구조',
      ready: true,
      summary: '값을 여러 개 한 번에 담는 상자, 리스트와 딕셔너리를 배워요.',
      goals: ['리스트 만들기', '인덱싱(순번으로 꺼내기)', 'append로 추가', '딕셔너리 기초'],
      blocks: [
        {
          h: '여러 값을 한 줄로 담는 상자: 리스트',
          html: `<p>변수 하나에 값 하나만 담을 수 있었죠? <b>리스트</b>는 여러 값을 순서대로 한 번에 담는 상자예요. 대괄호 <code>[ ]</code>로 만들고, 값 사이는 쉼표로 구분해요.</p>
                 <p>리스트 안의 값을 꺼낼 땐 <b>순번(인덱스)</b>을 씁니다. 파이썬은 순번을 <b>0부터</b> 세요! 그래서 첫 번째 값은 <code>[0]</code>이에요.</p>`,
          code: {
            label: 'list.py',
            src: `fruits = ["사과", "바나나", "포도"]

print(fruits[0])   # 사과 (첫 번째)
print(fruits[2])   # 포도 (세 번째)
print(len(fruits)) # 리스트 길이: 3`,
            out: `사과\n포도\n3`
          }
        },
        {
          h: '리스트에 값 추가하기: append',
          html: `<p>리스트 뒤에 새 값을 붙이려면 <code>.append(값)</code>을 써요.</p>`,
          code: {
            label: 'append.py',
            src: `fruits = ["사과", "바나나"]
fruits.append("딸기")
print(fruits)`,
            out: `['사과', '바나나', '딸기']`
          }
        },
        {
          h: '이름표로 꺼내는 상자: 딕셔너리',
          html: `<p>리스트가 순번으로 꺼낸다면, <b>딕셔너리</b>는 "이름표(키)"로 값을 꺼내요. <code>{ 키: 값 }</code> 형태로 만듭니다.</p>`,
          code: {
            label: 'dict.py',
            src: `student = {"name": "지수", "age": 17}
print(student["name"])`,
            out: `지수`
          },
          after: `<div class="note"><b>비유</b> — 리스트는 "몇 번째 서랍" 식으로 꺼내고, 딕셔너리는 "이름이 붙은 서랍"에서 바로 꺼내는 거예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const items = shuffle(['사과', '바나나', '포도', '딸기', '수박']).slice(0, 4);
          const idx = randInt(0, items.length - 1);
          return {
            type: 'blank',
            q: `<code>fruits = [${items.map(v => `'${v}'`).join(', ')}]</code>일 때, <code>fruits[${idx}]</code>의 값은 무엇일까요? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [items[idx]], placeholder: '값',
            why: `순번은 0부터 세니까 <code>[${idx}]</code>는 ${idx + 1}번째 값인 "${items[idx]}"예요.`,
            hint: '순번은 0부터 시작해요. 앞에서부터 하나씩 세어보세요.'
          };
        },
        () => {
          const n = randInt(2, 5);
          return {
            type: 'blank',
            q: `<code>fruits</code>에 값이 ${n}개 들어있을 때, <code>len(fruits)</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `<code>len()</code>은 리스트에 들어있는 값의 개수를 알려줘요. 지금은 ${n}개예요.`,
            hint: 'len()은 그냥 리스트 안에 값이 몇 개 있는지 세어줘요.'
          };
        },
        () => ({
          type: 'blank',
          q: `리스트 <code>fruits</code>의 맨 뒤에 <code>"딸기"</code>를 추가하는 코드를 완성하세요.`,
          prefix: 'fruits.', suffix: '("딸기")', accept: ['append'], placeholder: '메서드 이름',
          why: '<code>.append(값)</code>은 리스트 맨 뒤에 새 값을 붙여줘요.',
          hint: '"덧붙이다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '파이썬에서 리스트의 첫 번째 값을 가리키는 순번(인덱스)은?',
          '<code>0</code>', ['<code>1</code>', '<code>-1</code>', '<code>첫번째</code>'],
          '파이썬은 순번을 0부터 세기 때문에 첫 번째 값은 <code>[0]</code>이에요.',
          '파이썬은 항상 순번을 이 숫자부터 세기 시작해요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>student = {"name": "지수", "age": 17}</code>일 때, 이름을 꺼내는 코드를 완성하세요.`,
          prefix: 'student[', suffix: ']', accept: ['"name"', "'name'"], placeholder: '"키"',
          why: '딕셔너리는 <code>student["name"]</code>처럼 키를 대괄호 안에 넣어서 값을 꺼내요.',
          hint: '딕셔너리는 순번이 아니라 키(이름표)로 값을 꺼내요. 큰따옴표를 잊지 마세요.'
        }),
        () => ({
          type: 'code',
          q: '리스트 <code>numbers = [1, 2, 3]</code>에 <code>4</code>를 추가하는 코드를 작성하세요. (리스트는 이미 정의되어 있다고 가정)',
          starter: '',
          placeholder: 'numbers.append(4)',
          accept: ['numbers.append(4)'],
          why: '<code>.append(값)</code>은 리스트 맨 뒤에 새 값을 붙여줘요.',
          hint: '변수 이름 뒤에 점을 찍고 append(4)를 붙이면 돼요.'
        }),
      ],
      boss: () => {
        const items = shuffle(['사과', '바나나', '포도', '딸기', '수박', '망고']).slice(0, randInt(2, 4));
        const newItem = pick(['키위', '자두', '체리'].filter(x => !items.includes(x)));
        return {
          type: 'blank',
          q: `<code>fruits = [${items.map(v => `'${v}'`).join(', ')}]</code>에서 <code>fruits.append('${newItem}')</code>을 실행한 뒤, <code>fruits[len(fruits) - 1]</code>의 값은 무엇일까요? (따옴표 없이)`,
          prefix: '', suffix: '', accept: [newItem], placeholder: '값',
          why: `append로 추가한 값은 항상 리스트 맨 뒤에 붙어요. <code>len(fruits) - 1</code>은 "마지막 순번"이라서 방금 추가한 '${newItem}'이 나와요.`,
          hint: 'append로 추가한 값은 리스트 맨 마지막에 들어가고, len(fruits) - 1은 "마지막 순번"을 가리켜요.'
        };
      }
    },
    {
      id: 'oop',
      title: '클래스와 객체',
      ready: true,
      summary: '값과 행동을 하나로 묶는 "클래스"를 만들고, 그걸로 실제 객체를 만드는 법을 배워요.',
      goals: ['class로 클래스 만들기', '__init__ 생성자', 'self', '메서드 만들기'],
      blocks: [
        {
          h: '클래스는 "붕어빵 틀"이에요',
          html: `<p>변수와 함수를 따로따로 여러 개 만드는 대신, 관련된 값과 동작을 하나로 묶어서 "학생"이라는 새로운 종류(자료형)를 직접 만들 수 있어요. 이 틀을 <b>클래스</b>라고 해요.</p>
                 <p><code>class</code>로 클래스를 만들고, 그 틀로 찍어낸 실제 대상을 <b>객체(인스턴스)</b>라고 불러요. 붕어빵 틀이 클래스라면, 그 틀로 구운 붕어빵 하나하나가 객체예요.</p>`,
          code: {
            label: 'student.py',
            src: `class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

jisu = Student("지수", 17)
print(jisu.name, jisu.age)`,
            out: `지수 17`
          }
        },
        {
          h: '__init__과 self',
          html: `<p><code>__init__</code>은 객체가 만들어지는 바로 그 순간에 자동으로 실행되는 특별한 메서드(생성자)예요. 여기서 객체가 처음 가질 값들을 정해줘요.</p>
                 <p><code>self</code>는 "지금 만들어지고 있는(또는 다루고 있는) 이 객체 자기 자신"을 가리켜요. 클래스 안의 모든 메서드는 첫 번째 매개변수로 <code>self</code>를 받아요.</p>`
        },
        {
          h: '메서드로 행동 추가하기',
          html: `<p>클래스 안에 함수(메서드)를 추가하면, 객체가 "할 수 있는 일"을 정의할 수 있어요. 메서드를 부를 때는 <code>객체.메서드()</code>처럼 점을 찍어서 불러요.</p>`,
          code: {
            label: 'greet.py',
            src: `class Student:
    def __init__(self, name):
        self.name = name

    def greet(self):
        print(f"안녕, 나는 {self.name}이야")

jisu = Student("지수")
jisu.greet()`,
            out: `안녕, 나는 지수이야`
          },
          after: `<div class="note"><b>비유</b> — 클래스는 "설계도", 그 설계도로 만든 <code>jisu</code>는 "실제 물건(객체)"이에요. 같은 설계도로 객체를 여러 개 만들 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: '새로운 클래스를 만들 때 맨 앞에 쓰는 키워드는 무엇일까요?',
          prefix: '', suffix: ' Student:', accept: ['class'], placeholder: '키워드',
          why: '파이썬에서 클래스는 <code>class</code>로 시작해요.',
          hint: '"종류, 부류"를 뜻하는 영어 단어예요.'
        }),
        () => ({
          type: 'blank',
          q: '객체가 만들어질 때 자동으로 실행되는 특별한 메서드의 이름을 쓰세요.',
          prefix: 'class Student:\n    def ', suffix: '(self, name):\n        self.name = name', accept: ['__init__'], placeholder: '메서드 이름',
          why: '<code>__init__</code>은 객체가 생성되는 순간 자동으로 실행돼서, 처음 값을 정해줘요.',
          hint: '앞뒤로 밑줄(_) 두 개씩 붙은 특별한 이름이에요.'
        }),
        () => makeChoice(
          '클래스 안 메서드에서 <code>self</code>가 가리키는 것은?',
          '지금 다루고 있는 객체 자기 자신', ['클래스 이름', '가장 처음 만든 객체', '항상 고정된 값'],
          '<code>self</code>는 메서드가 불릴 때, "그 메서드를 부른 객체" 자신을 가리켜요.',
          '메서드를 호출한 객체가 누구인지를 나타내는 자리예요.'
        ),
        () => {
          const name = pick(['민준', '서연', '도윤']);
          const age = randInt(10, 19);
          return {
            type: 'blank',
            q: `<code>class Student:</code> 안에 <code>def __init__(self, name, age): self.name = name; self.age = age</code>가 있을 때, <code>s = Student("${name}", ${age})</code> 후 <code>print(s.age)</code>를 실행하면 무엇이 출력될까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(age)], placeholder: '숫자',
            why: `생성자에서 <code>self.age = age</code>로 저장했으니, <code>s.age</code>는 넘겨준 값인 ${age}예요.`,
            hint: '생성자에서 self.age = age로 저장한 값을 그대로 꺼내는 거예요.'
          };
        },
        () => ({
          type: 'blank',
          q: '객체 <code>jisu</code>가 가진 <code>greet</code> 메서드를 호출하는 코드를 완성하세요.',
          prefix: '', suffix: '()', accept: ['jisu.greet'], placeholder: '객체.메서드',
          why: '메서드를 부를 때는 <code>객체.메서드()</code>처럼 점을 찍어서 불러요.',
          hint: '객체 이름 뒤에 점(.)을 찍고 메서드 이름을 쓰면 돼요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const bonus = randInt(1, 10);
        return {
          type: 'blank',
          q: `<code>class Player:</code> 안에 <code>def __init__(self, name): self.name = name; self.score = 0</code>과 <code>def add(self, point): self.score += point</code>가 있어요. <code>p = Player("${name}")</code> 후 <code>p.add(${bonus})</code>를 실행하고 <code>print(p.score)</code>를 하면 무엇이 출력될까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(bonus)], placeholder: '숫자',
          why: `score는 0에서 시작해서, <code>add(${bonus})</code>로 ${bonus}만큼 늘었으니 결과는 ${bonus}예요.`,
          hint: '생성자에서 score를 0으로 시작하고, add 메서드가 그 값을 늘려요.'
        };
      }
    },
    {
      id: 'error',
      title: '예외 처리',
      ready: true,
      summary: '오류가 나도 프로그램이 멈추지 않도록 미리 대비하는 방법을 배워요.',
      goals: ['try / except', '오류 종류 지정하기', 'finally'],
      blocks: [
        {
          h: '오류가 나도 멈추지 않게: try / except',
          html: `<p>코드를 실행하다가 오류(예외)가 나면 프로그램이 그 자리에서 멈춰버려요. <code>try</code> 블록 안에서 오류가 날 수도 있는 코드를 실행하고, 오류가 나면 <code>except</code> 블록이 대신 실행돼서 프로그램이 멈추지 않아요.</p>`,
          code: {
            label: 'try_basic.py',
            src: `try:
    num = int("abc")
except:
    print("숫자로 바꿀 수 없어요")`,
            out: `숫자로 바꿀 수 없어요`
          }
        },
        {
          h: '어떤 오류인지 지정하기',
          html: `<p>오류마다 이름(종류)이 있어요. <code>except</code> 뒤에 오류 이름을 적으면, 그 오류가 났을 때만 그 블록을 실행해요. 흔한 오류로 <code>ValueError</code>(값이 이상함), <code>ZeroDivisionError</code>(0으로 나눔)가 있어요.</p>`,
          code: {
            label: 'try_specific.py',
            src: `try:
    result = 10 / 0
except ZeroDivisionError:
    print("0으로 나눌 수 없어요")`,
            out: `0으로 나눌 수 없어요`
          }
        },
        {
          h: '항상 실행되는 finally',
          html: `<p><code>finally</code> 블록은 오류가 나든 안 나든 <b>항상</b> 마지막에 실행돼요. 파일 닫기처럼 "무슨 일이 있어도 꼭 해야 하는 마무리 작업"에 써요.</p>`,
          after: `<div class="note"><b>순서</b> — <code>try</code>(시도) → 오류가 나면 <code>except</code>(처리) → 마지막에 <code>finally</code>(항상 실행) 순서예요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: '오류가 날 수도 있는 코드를 감싸는, <code>try</code> 다음에 오는 블록의 이름을 쓰세요.',
          prefix: 'try:\n    ...\n', suffix: ':\n    print("오류 발생")', accept: ['except'], placeholder: '키워드',
          why: '<code>try</code> 블록에서 오류가 나면 <code>except</code> 블록이 실행돼요.',
          hint: '"제외하다, 예외"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '숫자를 0으로 나눴을 때 발생하는 오류의 이름은?',
          '<code>ZeroDivisionError</code>', ['<code>ValueError</code>', '<code>TypeError</code>', '<code>NameError</code>'],
          '0으로 나누면 <code>ZeroDivisionError</code>가 발생해요.',
          '"0으로 나누기 오류"를 그대로 영어로 옮긴 이름이에요.'
        ),
        () => makeChoice(
          '<code>int("abc")</code>처럼 문자열을 숫자로 바꿀 수 없을 때 발생하는 오류는?',
          '<code>ValueError</code>', ['<code>ZeroDivisionError</code>', '<code>IndexError</code>', '<code>KeyError</code>'],
          '값 자체가 변환하기에 적절하지 않을 때 <code>ValueError</code>가 발생해요.',
          '"값(value)이 잘못됐다"는 뜻의 오류예요.'
        ),
        () => {
          const a = randInt(10, 50), b = pick([0, randInt(2, 9)]);
          const isZero = b === 0;
          const label = isZero ? '0으로 나눌 수 없어요' : String(Math.floor(a / b));
          return {
            type: 'blank',
            q: `<code>try: result = ${a} / ${b}; print(result)</code> / <code>except ZeroDivisionError: print("0으로 나눌 수 없어요")</code>를 실행하면 무엇이 출력될까요? ${isZero ? '문장 그대로' : '숫자만'} 쓰세요.`,
            prefix: '', suffix: '', accept: [label], placeholder: isZero ? '출력될 문장' : '숫자',
            why: isZero
              ? `${b}으로 나누면 <code>ZeroDivisionError</code>가 나서 except 블록이 실행돼요.`
              : `${b}은(는) 0이 아니라서 오류 없이 ${a} / ${b}의 결과가 그대로 출력돼요.`,
            hint: '나누는 수가 0인지 아닌지 먼저 확인해보세요.'
          };
        },
        () => makeChoice(
          '오류가 나든 안 나든 항상 마지막에 실행되는 블록은?',
          '<code>finally</code>', ['<code>except</code>', '<code>try</code>', '<code>else</code>'],
          '<code>finally</code>는 오류 발생 여부와 상관없이 항상 실행돼요.',
          '"마침내, 결국"이라는 뜻의 영어 단어예요.'
        ),
      ],
      boss: () => {
        const b = pick([0, randInt(2, 9)]);
        const isZero = b === 0;
        return {
          type: 'code',
          q: `<code>10</code>을 <code>${b}</code>으로 나누되, 0으로 나누는 오류가 나면 <code>"0으로 나눌 수 없어요"</code>를 출력하고, 오류가 없으면 계산 결과를 출력하는 <code>try/except</code> 코드를 작성하세요.`,
          starter: '',
          rows: 4,
          placeholder: `try:\n    print(10 / ${b})\nexcept ZeroDivisionError:\n    print("0으로 나눌 수 없어요")`,
          accept: [`try:\n    print(10 / ${b})\nexcept ZeroDivisionError:\n    print("0으로 나눌 수 없어요")`],
          why: isZero
            ? '10을 0으로 나누면 ZeroDivisionError가 나서 except 블록의 메시지가 출력돼요.'
            : `10을 ${b}로 나누면 오류 없이 결과(${10 / b})가 출력돼요.`,
          hint: 'try 블록 안에 나눗셈과 출력을, except ZeroDivisionError: 블록 안에 오류 메시지 출력을 넣으세요.'
        };
      }
    },
    {
      id: 'inherit',
      title: '상속과 다형성',
      ready: true,
      summary: '이미 만든 클래스를 물려받아서 새 클래스를 만드는 상속을 배워요.',
      goals: ['클래스 상속', 'super()', '메서드 오버라이딩', '다형성'],
      blocks: [
        {
          h: '이미 있는 클래스를 물려받기: 상속',
          html: `<p>완전히 새로운 클래스를 처음부터 만들지 않고, 이미 있는 클래스의 속성과 메서드를 그대로 물려받아서 시작할 수 있어요. 이걸 <b>상속</b>이라고 하고, <code>class 자식(부모):</code> 형태로 씁니다.</p>`,
          code: {
            label: 'inherit.py',
            src: `class Animal:
    def __init__(self, name):
        self.name = name
    def sound(self):
        return "..."

class Dog(Animal):
    def sound(self):
        return "멍멍!"

d = Dog("초코")
print(d.name, d.sound())`,
            out: `초코 멍멍!`
          }
        },
        {
          h: '부모의 기능도 같이 쓰고 싶다면: super()',
          html: `<p><code>Dog</code>은 <code>Animal</code>의 <code>__init__</code>을 그대로 물려받지만, 자식 클래스에서 <code>__init__</code>을 새로 정의하면서도 부모의 초기화 코드를 재사용하고 싶을 땐 <code>super().__init__(...)</code>으로 부모의 메서드를 호출할 수 있어요.</p>`,
          code: {
            label: 'super.py',
            src: `class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed

d = Dog("초코", "포메라니안")
print(d.name, d.breed)`,
            out: `초코 포메라니안`
          }
        },
        {
          h: '같은 이름, 다른 동작: 다형성',
          html: `<p><code>Dog</code>과 <code>Cat</code>이 둘 다 <code>sound()</code> 메서드를 갖고 있지만, 실제로 호출하면 각자 다르게 동작해요. 이렇게 "같은 이름의 메서드가 객체마다 다르게 동작하는 것"을 <b>다형성</b>이라고 불러요. 자식 클래스에서 부모의 메서드를 새로 정의하는 걸 <b>오버라이딩(재정의)</b>이라고 해요.</p>`,
          after: `<div class="note"><b>비유</b> — Animal은 "동물"이라는 큰 틀이고, Dog·Cat은 그 틀 안에서 각자 "짖는 소리"만 다르게 정한 것과 같아요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '이미 있는 클래스의 속성과 메서드를 물려받아 새 클래스를 만드는 것을 무엇이라고 하나요?',
          '상속', ['다형성', '캡슐화', '오버로딩'],
          '이미 있는 클래스를 물려받아 시작하는 것을 <b>상속</b>이라고 해요.',
          '"부모의 것을 물려받는다"는 뜻의 한글 단어예요.'
        ),
        () => {
          const name = pick(['초코', '보리', '몽이']);
          return {
            type: 'blank',
            q: `<code>class Animal: def __init__(self, name): self.name = name</code>이고, <code>class Dog(Animal): def sound(self): return "멍멍!"</code>일 때, <code>d = Dog("${name}")</code> 후 <code>print(d.name)</code>을 실행하면? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [name], placeholder: '값',
            why: `<code>Dog</code>은 <code>__init__</code>을 따로 정의하지 않아서, 부모 <code>Animal</code>의 <code>__init__</code>을 그대로 물려받아 <code>d.name</code>이 "${name}"이 돼요.`,
            hint: '자식 클래스가 __init__을 따로 정의하지 않으면, 부모의 __init__을 그대로 물려받아요.'
          };
        },
        () => ({
          type: 'blank',
          q: `자식 클래스의 <code>__init__</code>에서 부모 클래스의 <code>__init__</code>을 호출하려고 해요. 빈칸을 채우세요.`,
          prefix: 'class Dog(Animal):\n    def __init__(self, name, breed):\n        ', suffix: '().__init__(name)\n        self.breed = breed', accept: ['super'], placeholder: '키워드',
          why: '<code>super()</code>는 부모 클래스를 가리켜서, 부모의 메서드를 호출할 수 있게 해줘요.',
          hint: '"위, 상위"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '자식 클래스에서 부모 클래스의 메서드를 같은 이름으로 새로 정의하는 것을 무엇이라고 하나요?',
          '오버라이딩(재정의)', ['오버로딩', '상속', '캡슐화'],
          '부모의 메서드를 자식 클래스에서 다시 정의하는 걸 <b>오버라이딩</b>이라고 해요.',
          '"덮어쓰다, 다시 정의하다"라는 뜻이 담긴 단어예요.'
        ),
        () => {
          const child = pick(['Dog', 'Cat', 'Bird']);
          return {
            type: 'blank',
            q: `<code>Animal</code>을 물려받는 <code>${child}</code> 클래스를 만들려고 해요. 클래스 선언을 완성하세요.`,
            prefix: 'class ', suffix: ':\n    ...', accept: [`${child}(Animal)`], placeholder: '클래스이름(부모)',
            why: `<code>class ${child}(Animal):</code>처럼 괄호 안에 부모 클래스 이름을 넣으면 상속받아요.`,
            hint: '클래스 이름 뒤 괄호 안에 물려받을 부모 클래스 이름을 넣으면 돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>Animal</code> 클래스(생성자에서 <code>self.name = name</code>)를 물려받는 <code>Cat</code> 클래스를 만들고, <code>sound()</code> 메서드가 <code>"야옹!"</code>을 반환하도록 오버라이딩하세요.',
          starter: '',
          rows: 3,
          placeholder: 'class Cat(Animal):\n    def sound(self):\n        return "야옹!"',
          accept: ['class Cat(Animal):\n    def sound(self):\n        return "야옹!"'],
          why: '<code>class Cat(Animal):</code>로 상속받고, <code>sound()</code> 메서드만 새로 정의(오버라이딩)하면 나머지는 그대로 물려받아요.',
          hint: 'class Cat(Animal): 다음 줄에 def sound(self): return "야옹!"을 쓰세요.'
        }),
      ],
      boss: () => {
        const name = pick(['초코', '보리', '몽이']);
        const breed = pick(['포메라니안', '진돗개', '푸들']);
        return {
          type: 'blank',
          q: `<code>class Animal: def __init__(self, name): self.name = name</code>이고, <code>class Dog(Animal): def __init__(self, name, breed): super().__init__(name); self.breed = breed</code>일 때, <code>d = Dog("${name}", "${breed}")</code> 후 <code>print(d.name, d.breed)</code>를 실행하면? (공백 하나로 구분해서 그대로 입력)`,
          prefix: '', suffix: '', accept: [`${name} ${breed}`], placeholder: '이름 견종',
          why: `<code>super().__init__(name)</code>이 부모의 초기화를 실행해 <code>d.name</code>을 "${name}"으로, 자식의 코드가 <code>d.breed</code>를 "${breed}"로 만들어요.`,
          hint: 'super().__init__(name)은 부모 클래스가 name을 저장하게 해주고, 그 아래 줄이 breed를 저장해요.'
        };
      }
    },
    {
      id: 'module',
      title: '모듈과 파일 다루기',
      ready: true,
      summary: '다른 사람이 미리 만들어둔 기능을 가져다 쓰고, 파일에 내용을 저장하고 다시 읽는 방법을 배워요.',
      goals: ['import로 모듈 가져오기', 'math / random 모듈', '파일 쓰고 읽기(open)'],
      blocks: [
        {
          h: '이미 만들어진 기능 가져다 쓰기: import',
          html: `<p>파이썬은 자주 쓰는 기능들을 <b>모듈</b>이라는 파일 묶음으로 미리 만들어뒀어요. <code>import 모듈이름</code>으로 가져오면, <code>모듈이름.기능()</code> 형태로 바로 쓸 수 있어요. 직접 코드를 짤 필요 없이 빌려 쓰는 거예요.</p>`,
          code: {
            label: 'import_math.py',
            src: `import math

print(math.sqrt(16))
print(math.pi)`,
            out: `4.0\n3.141592653589793`
          }
        },
        {
          h: '무작위 값이 필요할 때: random 모듈',
          html: `<p><code>random</code> 모듈의 <code>random.randint(시작, 끝)</code>은 그 범위 안에서(양 끝 포함) 무작위 정수 하나를 뽑아줘요. 실행할 때마다 다른 값이 나와요.</p>`,
          code: {
            label: 'import_random.py',
            src: `import random

dice = random.randint(1, 6)
print(dice)  # 실행할 때마다 1~6 사이 다른 값`
          }
        },
        {
          h: '내용을 저장하고 다시 읽기: open()',
          html: `<p><code>open(파일이름, 모드)</code>로 파일을 열 수 있어요. <code>"w"</code>는 쓰기(write, 기존 내용은 지워짐), <code>"r"</code>은 읽기(read)예요. <code>with</code>와 함께 쓰면 작업이 끝난 뒤 파일을 자동으로 닫아줘서 안전해요.</p>`,
          code: {
            label: 'file_io.py',
            src: `with open("note.txt", "w") as f:
    f.write("안녕하세요")

with open("note.txt", "r") as f:
    content = f.read()
    print(content)`,
            out: `안녕하세요`
          },
          after: `<div class="note"><b>기억하기</b> — <code>with open(...) as f:</code> 블록을 벗어나면 파일이 자동으로 닫혀요. 직접 <code>f.close()</code>를 안 챙겨도 돼서 실수를 줄여줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = pick([4, 9, 16, 25, 36]);
          return {
            type: 'blank',
            q: `<code>import math</code>를 한 뒤, ${n}의 제곱근을 구하는 코드를 완성하세요.`,
            prefix: 'print(math.', suffix: `(${n}))`, accept: ['sqrt'], placeholder: '함수 이름',
            why: `<code>math.sqrt(${n})</code>는 ${n}의 제곱근인 ${Math.sqrt(n)}을 돌려줘요.`,
            hint: '"제곱근(square root)"의 줄임말이에요.'
          };
        },
        () => ({
          type: 'blank',
          q: `다른 모듈의 기능을 가져다 쓰려고 해요. 맨 앞에 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: ' math', accept: ['import'], placeholder: '키워드',
          why: '<code>import 모듈이름</code>으로 그 모듈 안의 기능들을 가져다 쓸 수 있어요.',
          hint: '"가져오다, 수입하다"라는 뜻의 영어 단어예요.'
        }),
        () => {
          const lo = randInt(1, 5), hi = randInt(6, 20);
          return {
            type: 'blank',
            q: `${lo}부터 ${hi}까지 범위에서 무작위 정수 하나를 뽑는 코드를 완성하세요. (random을 이미 import 했다고 가정해요)`,
            prefix: 'dice = random.', suffix: `(${lo}, ${hi})`, accept: ['randint'], placeholder: '함수 이름',
            why: `<code>random.randint(${lo}, ${hi})</code>는 ${lo}부터 ${hi}까지(양 끝 포함) 중 무작위 정수를 하나 뽑아줘요.`,
            hint: '"무작위 정수"를 뜻하는 영어 단어 조합이에요.'
          };
        },
        () => makeChoice(
          '파일을 새로 쓰기(기존 내용을 지우고 처음부터 쓰기) 모드로 열 때 쓰는 문자는?',
          `<code>"w"</code>`, [`<code>"r"</code>`, `<code>"a"</code>`, `<code>"x"</code>`],
          `<code>"w"</code>(write)는 파일을 쓰기 모드로 열어요. 기존 내용이 있다면 지워지고 새로 써져요.`,
          '"쓰다(write)"의 첫 글자예요.'
        ),
        () => ({
          type: 'blank',
          q: `파일 작업이 끝나면 자동으로 파일을 닫아주는, <code>open(...)</code> 앞에 붙이는 키워드를 쓰세요.`,
          prefix: '', suffix: ' open("note.txt", "r") as f:\n    ...', accept: ['with'], placeholder: '키워드',
          why: '<code>with open(...) as f:</code> 블록을 쓰면, 블록이 끝날 때 파일이 자동으로 닫혀요.',
          hint: '"~와 함께"라는 뜻의 영어 단어로, 자원을 안전하게 관리할 때 자주 써요.'
        }),
        () => ({
          type: 'code',
          q: '<code>with open("note.txt", "w") as f:</code> 블록 안에서 <code>"안녕"</code>이라는 내용을 파일에 쓰는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'with open("note.txt", "w") as f:\n    f.write("안녕")',
          accept: ['with open("note.txt", "w") as f:\n    f.write("안녕")'],
          why: '<code>f.write(내용)</code>은 열어둔 파일 f에 그 내용을 써요.',
          hint: 'with open(...) as f: 블록 안에 f.write("안녕")을 넣으세요.'
        }),
      ],
      boss: () => {
        const n = pick([9, 16, 25, 49]);
        const root = Math.sqrt(n);
        return {
          type: 'blank',
          q: `<code>import math</code>를 한 뒤, <code>print(math.sqrt(${n}))</code>를 실행하면 무엇이 출력될까요? (소수점 포함, 예: 4.0)`,
          prefix: '', suffix: '', accept: [`${root}.0`], placeholder: '숫자',
          why: `<code>math.sqrt(${n})</code>는 ${n}의 제곱근인 ${root}을 실수(float)로 돌려주기 때문에 <code>${root}.0</code>처럼 출력돼요.`,
          hint: '제곱근을 구한 뒤, 파이썬은 그 결과를 항상 실수(소수점 포함)로 보여줘요.'
        };
      }
    },
    {
      id: 'decorators',
      title: '데코레이터와 제너레이터',
      ready: true,
      summary: '값을 한 번에 다 만들지 않고 하나씩 내놓는 제너레이터와, 함수를 감싸서 기능을 더하는 데코레이터를 배워요.',
      goals: ['yield로 값 하나씩 만들기', '제너레이터 함수', '@로 함수 감싸기(데코레이터)'],
      blocks: [
        {
          h: '한 번에 다 만들지 않고, 하나씩: yield',
          html: `<p><code>return</code>은 값을 하나 돌려주고 함수를 완전히 끝내지만, <code>yield</code>는 값을 하나 "내놓고" 그 자리에서 잠깐 멈춰요. 다음에 또 값이 필요해지면, 멈췄던 자리부터 다시 이어서 실행돼요. 이런 함수를 <b>제너레이터</b>라고 불러요.</p>`,
          code: {
            label: 'generator.py',
            src: `def count_up(n):
    for i in range(1, n + 1):
        yield i

for num in count_up(3):
    print(num)`,
            out: `1\n2\n3`
          }
        },
        {
          h: '왜 굳이 yield를 쓸까? 메모리를 아껴요',
          html: `<p><code>range(1000000)</code>처럼 값이 아주 많아도, 제너레이터는 한 번에 다 만들어서 리스트에 쌓아두지 않고 <b>필요할 때마다 하나씩만</b> 만들어요. 그래서 값이 아주 많거나 끝이 없는 경우에도 메모리를 아낄 수 있어요.</p>`
        },
        {
          h: '함수를 감싸서 기능을 더하기: 데코레이터',
          html: `<p><b>데코레이터</b>는 기존 함수를 고치지 않고, 그 위에 <code>@데코레이터이름</code>을 붙여서 실행 앞뒤에 새로운 동작을 끼워 넣는 문법이에요. "함수를 함수로 감싼다"고 생각하면 쉬워요.</p>`,
          code: {
            label: 'decorator.py',
            src: `def shout(func):
    def wrapper():
        result = func()
        return result.upper()
    return wrapper

@shout
def greet():
    return "hello"

print(greet())`,
            out: `HELLO`
          },
          after: `<div class="note"><b>정리</b> — <code>@shout</code>를 붙이면, <code>greet()</code>를 호출할 때 사실은 <code>shout(greet)()</code>가 실행돼요. greet의 코드는 그대로 두고, 결과만 대문자로 바꿔서 돌려준 거예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 5);
          return {
            type: 'blank',
            q: `<code>def count_up(n): for i in range(1, n + 1): yield i</code> 함수에 <code>for num in count_up(${n}): print(num)</code>을 실행하면, 마지막 줄에 무엇이 출력될까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `<code>count_up(${n})</code>은 1부터 ${n}까지 하나씩 내놓아요. 마지막으로 나오는 값은 ${n}이에요.`,
            hint: 'range(1, n+1)은 1부터 n까지 하나씩 만들어줘요.'
          };
        },
        () => makeChoice(
          '함수 안에서 값을 하나 "내놓고" 그 자리에서 멈추는(다음에 이어서 실행되는) 키워드는?',
          '<code>yield</code>', ['<code>return</code>', '<code>pass</code>', '<code>break</code>'],
          '<code>yield</code>는 값을 하나 내놓고 멈췄다가, 다음에 또 필요해지면 이어서 실행돼요.',
          '"내주다, 양보하다"라는 뜻의 영어 단어예요.'
        ),
        () => makeChoice(
          '<code>yield</code>를 하나 이상 사용한 함수를 부르는 이름은?',
          '제너레이터 함수', ['데코레이터 함수', '람다 함수', '재귀 함수'],
          '<code>yield</code>가 들어있는 함수는 호출해도 바로 실행되지 않고, 값을 하나씩 만들어내는 "제너레이터"가 돼요.',
          '"만들어내다(generate)"라는 뜻의 영어 단어에서 온 이름이에요.'
        ),
        () => ({
          type: 'blank',
          q: `함수 <code>greet</code>를 <code>shout</code> 데코레이터로 감싸려고 해요. <code>def greet(): ...</code> 바로 위에 쓰는 문법을 완성하세요.`,
          prefix: '', suffix: 'shout\ndef greet():\n    return "hello"', accept: ['@'], placeholder: '기호',
          why: '<code>@데코레이터이름</code>을 함수 정의 바로 위에 쓰면, 그 함수가 데코레이터로 감싸져요.',
          hint: '"골뱅이"라고도 부르는, 이메일 주소에도 쓰이는 그 기호예요.'
        }),
        () => ({
          type: 'code',
          q: '1부터 <code>n</code>까지의 제곱을 하나씩 <code>yield</code>하는 제너레이터 함수 <code>squares(n)</code>을 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'def squares(n):\n    for i in range(1, n + 1):\n        yield i * i',
          accept: ['def squares(n):\n    for i in range(1, n + 1):\n        yield i * i'],
          why: '반복문 안에서 <code>i * i</code>를 <code>yield</code>하면, 호출할 때마다 제곱값을 하나씩 내놓아요.',
          hint: 'for i in range(1, n + 1): 안에 yield i * i를 쓰세요.'
        }),
      ],
      boss: () => {
        const n = randInt(2, 5);
        const squares = Array.from({ length: n }, (_, i) => (i + 1) * (i + 1));
        return {
          type: 'blank',
          q: `<code>def squares(n): for i in range(1, n + 1): yield i * i</code> 함수에 <code>for s in squares(${n}): print(s)</code>를 실행하면, 순서대로 무엇이 출력될까요? 쉼표로 구분해서 쓰세요. (예: 1, 4, 9)`,
          prefix: '', suffix: '', accept: [squares.join(', '), squares.join(',')], placeholder: '숫자, 숫자, ...',
          why: `1부터 ${n}까지 각각 제곱하면 ${squares.join(', ')}이 순서대로 출력돼요.`,
          hint: '1의 제곱, 2의 제곱, ... 순서대로 하나씩 계산해보세요.'
        };
      }
    },
    {
      id: 'string',
      title: '문자열 다루기',
      ready: true,
      summary: '글자를 잘라내고, 다듬고, 나누고 합치는 등 실전에서 정말 자주 쓰는 문자열 다루기를 배워요.',
      goals: ['슬라이싱', 'upper/lower/strip', 'split과 join', 'replace'],
      blocks: [
        {
          h: '문자열도 순서대로 잘라낼 수 있어요: 슬라이싱',
          html: `<p>문자열도 리스트처럼 순번(인덱스)이 있어서 <code>[시작:끝]</code>으로 일부만 잘라낼 수 있어요. 이걸 <b>슬라이싱</b>이라고 해요. <b>끝 번호는 포함되지 않는다</b>는 걸 꼭 기억하세요.</p>`,
          code: {
            label: 'slice.py',
            src: `word = "PYTHON"

print(word[0:3])   # 0번부터 2번까지
print(word[3:])    # 3번부터 끝까지
print(word[-1])    # 맨 뒤 글자`,
            out: `PYT\nHON\nN`
          }
        },
        {
          h: '대소문자와 공백 다듬기',
          html: `<p><code>.upper()</code>는 모두 대문자로, <code>.lower()</code>는 모두 소문자로 바꿔요. <code>.strip()</code>은 문자열 앞뒤에 붙은 필요 없는 공백을 없애줘요(가운데 공백은 그대로 둬요).</p>`,
          code: {
            label: 'clean.py',
            src: `text = "  Hello World  "

print(text.strip())
print(text.strip().upper())`,
            out: `Hello World\nHELLO WORLD`
          }
        },
        {
          h: '나누고 합치기: split과 join',
          html: `<p><code>.split(구분자)</code>는 문자열을 구분자 기준으로 잘라 리스트로 만들어요. 반대로 <code>"구분자".join(리스트)</code>는 리스트의 값들을 그 구분자로 이어 붙여서 다시 하나의 문자열로 만들어요.</p>`,
          code: {
            label: 'split_join.py',
            src: `csv = "지수,민준,서연"

names = csv.split(",")
print(names)
print("-".join(names))`,
            out: `['지수', '민준', '서연']\n지수-민준-서연`
          },
          after: `<div class="note"><b>덤</b> — <code>.replace(old, new)</code>는 문자열 안의 <code>old</code>를 전부 <code>new</code>로 바꿔줘요. 예: <code>"hi hi".replace("hi", "bye")</code> → <code>"bye bye"</code>.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const words = ['PYTHON', 'BANANA', 'STUDENT', 'KOREA'];
          const w = pick(words);
          const start = randInt(0, w.length - 3);
          const end = randInt(start + 1, w.length - 1);
          return {
            type: 'blank',
            q: `<code>word = "${w}"</code>일 때, <code>word[${start}:${end}]</code>의 결과는 무엇일까요? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [w.slice(start, end)], placeholder: '값',
            why: `<code>[${start}:${end}]</code>는 ${start}번부터 ${end - 1}번까지(끝 번호 ${end}는 포함 안 됨) 글자를 잘라내서 "${w.slice(start, end)}"가 돼요.`,
            hint: '끝 번호는 포함되지 않는다는 걸 잊지 마세요. 시작 번호부터 끝 번호 바로 앞까지예요.'
          };
        },
        () => makeChoice(
          '문자열 앞뒤의 필요 없는 공백만 없애주는 메서드는?',
          '<code>.strip()</code>', ['<code>.upper()</code>', '<code>.split()</code>', '<code>.join()</code>'],
          '<code>.strip()</code>은 문자열 양 끝의 공백을 없애줘요.',
          '"벗겨내다"라는 뜻의 영어 단어예요.'
        ),
        () => {
          const items = shuffle(['사과', '바나나', '포도', '딸기', '수박']).slice(0, randInt(3, 5));
          const csv = items.join(',');
          return {
            type: 'blank',
            q: `<code>"${csv}".split(",")</code>의 결과로 만들어지는 리스트의 길이(<code>len()</code>)는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(items.length)], placeholder: '숫자',
            why: `쉼표를 기준으로 나누면 ${items.length}개의 값으로 이루어진 리스트가 만들어져요.`,
            hint: '쉼표(,)가 몇 개 있는지 세어보고 그보다 하나 더 많은 조각이 나온다는 걸 떠올려보세요.'
          };
        },
        () => {
          const items = shuffle(['지수', '민준', '서연']).slice(0, 3);
          const sep = pick(['-', ' & ', '/']);
          return {
            type: 'blank',
            q: `리스트 <code>names = [${items.map(v => `'${v}'`).join(', ')}]</code>를 <code>"${sep}"</code>로 이어 붙인 하나의 문자열로 만드는 코드를 완성하세요.`,
            prefix: `"${sep}".`, suffix: '(names)', accept: ['join'], placeholder: '메서드 이름',
            why: `<code>"${sep}".join(names)</code>는 결과로 "${items.join(sep)}"를 만들어요.`,
            hint: '구분자 문자열 뒤에 점을 찍고, 리스트를 이어 붙이는 메서드를 쓰세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `문자열 <code>"hi hi"</code> 안의 <code>"hi"</code>를 전부 <code>"bye"</code>로 바꾸는 코드를 완성하세요.`,
          prefix: '"hi hi".', suffix: '("hi", "bye")', accept: ['replace'], placeholder: '메서드 이름',
          why: `<code>.replace("hi", "bye")</code>는 문자열 안의 모든 "hi"를 "bye"로 바꿔서 "bye bye"가 돼요.`,
          hint: '"바꾸다, 대체하다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'code',
          q: '문자열 <code>"  hello  "</code>의 앞뒤 공백을 없앤 뒤 모두 대문자로 바꿔서 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'print("  hello  ".strip().upper())',
          accept: ['print("  hello  ".strip().upper())'],
          why: '<code>.strip()</code>으로 공백을 없앤 뒤 <code>.upper()</code>로 대문자로 바꿔서 출력해요.',
          hint: '.strip()과 .upper()를 점(.)으로 이어서 붙여 써보세요.'
        }),
      ],
      boss: () => {
        const items = shuffle(['지수', '민준', '서연', '도윤']).slice(0, randInt(3, 4));
        const csv = items.join(',');
        return {
          type: 'blank',
          q: `<code>"${csv}".split(",")</code>로 만든 리스트를 다시 <code>" / ".join(...)</code>으로 이어 붙이면 어떤 문자열이 될까요? (따옴표 없이)`,
          prefix: '', suffix: '', accept: [items.join(' / ')], placeholder: '값',
          why: `split으로 쉼표 기준으로 나눈 리스트 [${items.map(v => `'${v}'`).join(', ')}]를 " / "로 다시 이어 붙이면 "${items.join(' / ')}"가 돼요.`,
          hint: 'split으로 먼저 나눈 뒤, 그 결과 리스트를 join으로 다른 구분자를 써서 다시 이어 붙이는 순서를 떠올려보세요.'
        };
      }
    },
    {
      id: 'tupleset',
      title: '튜플과 집합',
      ready: true,
      summary: '한 번 정하면 못 바꾸는 튜플과, 중복 없이 값을 모으는 집합(set)을 배워요.',
      goals: ['튜플 만들기와 특징', '집합(set) 만들기', '중복 제거', '교집합/합집합'],
      blocks: [
        {
          h: '한 번 정하면 못 바꾸는 상자: 튜플',
          html: `<p><b>튜플</b>은 리스트와 비슷하게 여러 값을 순서대로 담지만, 대괄호 <code>[ ]</code> 대신 소괄호 <code>( )</code>를 쓰고 <b>한 번 만들면 값을 바꿀 수 없어요</b>. 좌표처럼 "절대 바뀌면 안 되는 값 묶음"에 잘 어울려요.</p>`,
          code: {
            label: 'tuple.py',
            src: `point = (3, 4)
print(point[0], point[1])`,
            out: `3 4`
          },
          after: `<div class="note"><b>자주 하는 실수</b> — <code>point[0] = 10</code>처럼 튜플 값을 바꾸려 하면 <code>TypeError</code>가 나요. 바꾸고 싶다면 리스트를 쓰세요.</div>`
        },
        {
          h: '중복을 허용하지 않는 상자: 집합(set)',
          html: `<p><b>집합</b>은 중괄호 <code>{ }</code>로 만들고, 같은 값이 여러 번 들어와도 <b>딱 하나만</b> 남겨요. 순서도 따로 정해져 있지 않아요. 그래서 "중복 제거"가 필요할 때 아주 유용해요.</p>`,
          code: {
            label: 'set.py',
            src: `nums = {1, 2, 2, 3, 3, 3}
print(nums)`,
            out: `{1, 2, 3}`
          }
        },
        {
          h: '집합끼리 비교하기: 교집합과 합집합',
          html: `<p>두 집합에 <b>공통으로</b> 들어있는 값만 보고 싶으면 <code>&</code>(교집합), <b>둘 중 하나에라도</b> 있는 값을 모두 모으고 싶으면 <code>|</code>(합집합)를 써요.</p>`,
          code: {
            label: 'set_ops.py',
            src: `a = {1, 2, 3}
b = {2, 3, 4}

print(a & b)
print(a | b)`,
            out: `{2, 3}\n{1, 2, 3, 4}`
          }
        }
      ],
      quizGenerators: [
        () => {
          const x = randInt(1, 20), y = randInt(1, 20);
          const idx = pick([0, 1]);
          return {
            type: 'blank',
            q: `<code>point = (${x}, ${y})</code>일 때, <code>point[${idx}]</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(idx === 0 ? x : y)], placeholder: '숫자',
            why: `튜플도 리스트처럼 순번으로 꺼내서, <code>[${idx}]</code>는 ${idx === 0 ? x : y}예요.`,
            hint: '튜플도 리스트와 똑같이 0번부터 순번을 세요.'
          };
        },
        () => makeChoice(
          '이미 만든 튜플의 값을 바꾸려고 하면 어떻게 될까요?',
          '<code>TypeError</code>가 난다', ['조용히 바뀐다', '아무 일도 안 일어난다', '자동으로 리스트가 된다'],
          '튜플은 한 번 만들면 값을 바꿀 수 없어서(불변), 바꾸려 하면 <code>TypeError</code>가 나요.',
          '튜플의 가장 큰 특징은 "바꿀 수 없다"는 점이에요.'
        ),
        () => {
          const nums = Array.from({ length: randInt(6, 9) }, () => randInt(1, 4));
          const uniqueCount = new Set(nums).size;
          return {
            type: 'blank',
            q: `<code>nums = [${nums.join(', ')}]</code>일 때, <code>len(set(nums))</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(uniqueCount)], placeholder: '숫자',
            why: `<code>set(nums)</code>는 중복을 없애서 서로 다른 값 ${uniqueCount}개만 남겨요.`,
            hint: '리스트 안에서 서로 다른 값이 몇 종류인지 세어보세요.'
          };
        },
        () => {
          const a = shuffle([1, 2, 3, 4, 5]).slice(0, 3).sort((x, y) => x - y);
          const b = shuffle([1, 2, 3, 4, 5]).slice(0, 3).sort((x, y) => x - y);
          const inter = a.filter(v => b.includes(v)).sort((x, y) => x - y);
          return {
            type: 'blank',
            q: `<code>a = {${a.join(', ')}}</code>, <code>b = {${b.join(', ')}}</code>일 때, <code>a & b</code>(교집합)의 결과를 중괄호 없이 쉼표로 구분해서 쓰세요. (없으면 "없음")`,
            prefix: '', suffix: '', accept: [inter.length ? inter.join(', ') : '없음'], placeholder: '값, 값, ...',
            why: inter.length
              ? `두 집합에 공통으로 들어있는 값은 ${inter.join(', ')}예요.`
              : `두 집합에 공통으로 들어있는 값이 하나도 없어요.`,
            hint: '두 집합에 동시에 들어있는 값만 골라보세요.'
          };
        },
        () => makeChoice(
          '두 집합 중 하나에라도 들어있는 값을 모두 모으고 싶을 때 쓰는 연산자는?',
          '<code>|</code>', ['<code>&</code>', '<code>+</code>', '<code>and</code>'],
          '<code>|</code>(합집합)은 두 집합 중 하나에라도 있는 값을 모두 모아요.',
          '교집합(&)과 반대로, "둘 중 하나만 있어도" 되는 쪽이에요.'
        ),
        () => ({
          type: 'code',
          q: '리스트 <code>[1, 2, 2, 3, 3, 3]</code>에서 중복을 없앤 집합을 만들어 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'print(set([1, 2, 2, 3, 3, 3]))',
          accept: ['print(set([1, 2, 2, 3, 3, 3]))'],
          why: '<code>set(리스트)</code>는 리스트를 집합으로 바꾸면서 중복된 값을 자동으로 없애줘요.',
          hint: 'set( ) 안에 리스트를 그대로 넣어보세요.'
        }),
      ],
      boss: () => {
        const a = shuffle([1, 2, 3, 4, 5, 6]).slice(0, 4).sort((x, y) => x - y);
        const b = shuffle([1, 2, 3, 4, 5, 6]).slice(0, 4).sort((x, y) => x - y);
        const union = [...new Set([...a, ...b])].sort((x, y) => x - y);
        return {
          type: 'blank',
          q: `<code>a = {${a.join(', ')}}</code>, <code>b = {${b.join(', ')}}</code>일 때, <code>a | b</code>(합집합)의 결과를 중괄호 없이 쉼표로 구분해서 쓰세요.`,
          prefix: '', suffix: '', accept: [union.join(', ')], placeholder: '값, 값, ...',
          why: `합집합은 두 집합에 있는 값을 모두 모으되 중복은 한 번만 남겨서 ${union.join(', ')}가 돼요.`,
          hint: '두 집합의 값을 전부 모은 뒤, 겹치는 값은 한 번만 세면 돼요.'
        };
      }
    },
    {
      id: 'comprehension',
      title: '컴프리헨션과 람다',
      ready: true,
      summary: '반복문을 한 줄로 줄이는 리스트 컴프리헨션과, 이름 없는 짧은 함수인 람다를 배워요.',
      goals: ['리스트 컴프리헨션', '조건 붙이기', 'lambda', 'map으로 값 변환하기'],
      blocks: [
        {
          h: '반복문을 한 줄로: 리스트 컴프리헨션',
          html: `<p><code>[값 for 항목 in 반복대상]</code> 형태로 쓰면, for문으로 리스트를 만드는 코드를 한 줄로 줄일 수 있어요. 이걸 <b>리스트 컴프리헨션</b>이라고 해요.</p>`,
          code: {
            label: 'comp.py',
            src: `squares = [n * n for n in range(1, 6)]
print(squares)`,
            out: `[1, 4, 9, 16, 25]`
          }
        },
        {
          h: '조건을 붙여 골라내기',
          html: `<p>맨 뒤에 <code>if 조건</code>을 붙이면, 그 조건을 만족하는 값만 골라서 리스트에 담아요.</p>`,
          code: {
            label: 'comp_if.py',
            src: `nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [n for n in nums if n % 2 == 0]
print(evens)`,
            out: `[2, 4, 6, 8, 10]`
          }
        },
        {
          h: '이름 없는 짧은 함수: 람다',
          html: `<p><code>lambda 매개변수: 결과식</code>은 이름 없이 값 하나만 계산해서 바로 돌려주는 아주 짧은 함수예요. <code>map(함수, 리스트)</code>와 함께 쓰면, 리스트의 값 전부에 그 함수를 적용한 새 리스트를 만들 수 있어요.</p>`,
          code: {
            label: 'lambda.py',
            src: `square = lambda x: x * x
print(square(5))

nums = [1, 2, 3]
print(list(map(lambda x: x * 2, nums)))`,
            out: `25\n[2, 4, 6]`
          },
          after: `<div class="note"><b>비교</b> — <code>def</code>는 이름 붙은 여러 줄짜리 함수를 만들 때, <code>lambda</code>는 계산 하나만 바로 하고 버려도 되는 아주 짧은 함수를 만들 때 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(3, 6);
          const squares = Array.from({ length: n }, (_, i) => (i + 1) * (i + 1));
          return {
            type: 'blank',
            q: `<code>[n * n for n in range(1, ${n + 1})]</code>의 결과를 대괄호 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`[${squares.join(', ')}]`], placeholder: '[숫자, 숫자, ...]',
            why: `1부터 ${n}까지 각각 제곱하면 [${squares.join(', ')}]이 돼요.`,
            hint: '1의 제곱, 2의 제곱, ... 순서대로 계산해서 리스트로 만들어보세요.'
          };
        },
        () => {
          const max = randInt(8, 12);
          const odds = [];
          for (let i = 1; i <= max; i++) if (i % 2 !== 0) odds.push(i);
          return {
            type: 'blank',
            q: `<code>[n for n in range(1, ${max + 1}) if n % 2 != 0]</code>의 결과를 대괄호 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`[${odds.join(', ')}]`], placeholder: '[숫자, 숫자, ...]',
            why: `1부터 ${max}까지 중 홀수(2로 나눈 나머지가 0이 아닌 수)만 골라내면 [${odds.join(', ')}]이 돼요.`,
            hint: 'n % 2 != 0은 "홀수일 때"라는 뜻이에요.'
          };
        },
        () => ({
          type: 'blank',
          q: `이름 없는 짧은 함수를 만들 때 쓰는 키워드는 무엇일까요?`,
          prefix: 'square = ', suffix: ' x: x * x', accept: ['lambda'], placeholder: '키워드',
          why: '<code>lambda 매개변수: 결과식</code> 형태로 이름 없는 짧은 함수를 만들어요.',
          hint: '그리스 문자 이름을 딴 파이썬 키워드예요.'
        }),
        () => {
          const nums = Array.from({ length: 3 }, () => randInt(1, 10));
          const doubled = nums.map(n => n * 2);
          return {
            type: 'blank',
            q: `<code>nums = [${nums.join(', ')}]</code>일 때, <code>list(map(lambda x: x * 2, nums))</code>의 결과를 대괄호 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`[${doubled.join(', ')}]`], placeholder: '[숫자, 숫자, ...]',
            why: `map은 리스트의 각 값에 lambda를 적용해서, 각 값을 2배로 만들면 [${doubled.join(', ')}]이 돼요.`,
            hint: '리스트 안의 각 숫자를 하나씩 2배로 만들어보세요.'
          };
        },
        () => makeChoice(
          '리스트의 모든 값에 함수를 하나씩 적용한 새 리스트를 만들고 싶을 때 쓰는 함수는?',
          '<code>map</code>', ['<code>zip</code>', '<code>sorted</code>', '<code>range</code>'],
          '<code>map(함수, 리스트)</code>는 리스트의 각 값에 함수를 적용한 결과를 만들어줘요.',
          '"대응시키다, 변환하다"라는 뜻과 관련 있는 단어예요.'
        ),
        () => ({
          type: 'code',
          q: '1부터 5까지의 세제곱(n ** 3)을 담은 리스트를 컴프리헨션으로 만들어 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'print([n ** 3 for n in range(1, 6)])',
          accept: ['print([n ** 3 for n in range(1, 6)])'],
          why: '<code>[n ** 3 for n in range(1, 6)]</code>은 1부터 5까지 각각 세제곱한 값을 리스트로 만들어요.',
          hint: 'range(1, 6)은 1부터 5까지고, n ** 3은 세제곱이에요.'
        }),
      ],
      boss: () => {
        const max = randInt(10, 15);
        const result = [];
        for (let i = 1; i <= max; i++) if (i % 3 === 0) result.push(i * i);
        return {
          type: 'blank',
          q: `<code>[n * n for n in range(1, ${max + 1}) if n % 3 == 0]</code>의 결과를 대괄호 포함해서 쓰세요.`,
          prefix: '', suffix: '', accept: [`[${result.join(', ')}]`], placeholder: '[숫자, 숫자, ...]',
          why: `1부터 ${max}까지 중 3의 배수만 골라 제곱하면 [${result.join(', ')}]이 돼요.`,
          hint: '먼저 3의 배수를 골라낸 뒤, 그 수들을 각각 제곱해보세요.'
        };
      }
    },
    {
      id: 'recursion',
      title: '재귀 함수',
      ready: true,
      summary: '함수가 자기 자신을 다시 부르는 재귀를 배우고, 언제 멈추는지(기저 조건)를 이해해요.',
      goals: ['재귀 함수란', '기저 조건(base case)', '팩토리얼 계산'],
      blocks: [
        {
          h: '자기 자신을 다시 부르는 함수: 재귀',
          html: `<p><b>재귀 함수</b>는 함수 안에서 자기 자신을 다시 호출하는 함수예요. 러시아 인형(마트료시카)처럼, 안을 열면 똑같이 생긴 조금 더 작은 인형이 또 나오는 모습을 떠올리면 이해하기 쉬워요.</p>`,
          code: {
            label: 'countdown.py',
            src: `def countdown(n):
    if n == 0:
        print("발사!")
    else:
        print(n)
        countdown(n - 1)

countdown(3)`,
            out: `3\n2\n1\n발사!`
          }
        },
        {
          h: '꼭 필요한 멈추는 조건: 기저 조건',
          html: `<p>재귀 함수는 반드시 <b>더 이상 자기 자신을 부르지 않고 끝내는 조건</b>(기저 조건, base case)이 있어야 해요. 위 코드에서는 <code>n == 0</code>일 때가 그 조건이에요. 기저 조건이 없거나 절대 만족되지 않으면, 함수가 끝없이 자기 자신을 불러서 결국 <code>RecursionError</code>가 나요.</p>`
        },
        {
          h: '재귀로 계산하기: 팩토리얼',
          html: `<p>팩토리얼(<code>n!</code>)은 "1부터 n까지 모두 곱한 값"이에요. <code>n! = n × (n-1)!</code>로 정의할 수 있어서 재귀와 잘 어울려요. 기저 조건은 <code>n이 1 이하일 때 1을 반환</code>하는 거예요.</p>`,
          code: {
            label: 'factorial.py',
            src: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(4))`,
            out: `24`
          },
          after: `<div class="note"><b>참고</b> — 팩토리얼은 for문(반복문)으로도 똑같이 계산할 수 있어요. 재귀는 "더 작은 같은 문제로 쪼개지는" 상황을 더 자연스럽게 표현할 때 자주 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 5);
          return {
            type: 'blank',
            q: `<code>def countdown(n): if n == 0: print("발사!") else: print(n); countdown(n - 1)</code> 함수에 <code>countdown(${n})</code>을 호출하면, 맨 마지막 줄에 무엇이 출력될까요? (따옴표 없이)`,
            prefix: '', suffix: '', accept: ['발사!'], placeholder: '출력될 문장',
            why: `${n}, ${n - 1}, ... 1까지 세어 내려간 뒤 마지막엔 항상 기저 조건(n == 0)에 도달해서 "발사!"가 출력돼요.`,
            hint: '재귀는 결국 기저 조건에 도달할 때까지 계속 자기 자신을 불러요.'
          };
        },
        () => {
          const n = randInt(3, 6);
          let fact = 1;
          for (let i = 2; i <= n; i++) fact *= i;
          return {
            type: 'blank',
            q: `<code>def factorial(n): if n &lt;= 1: return 1; return n * factorial(n - 1)</code> 함수에 <code>factorial(${n})</code>을 호출하면 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(fact)], placeholder: '숫자',
            why: `${n}! = ${Array.from({ length: n }, (_, i) => i + 1).join(' × ')} = ${fact}이에요.`,
            hint: '1부터 그 수까지 순서대로 전부 곱해보세요.'
          };
        },
        () => makeChoice(
          '재귀 함수에서 더 이상 자기 자신을 부르지 않고 끝내는 조건을 부르는 이름은?',
          '기저 조건(base case)', ['반복 조건', '예외 조건', '초기 조건'],
          '기저 조건은 재귀 호출을 멈추고 바로 값을 돌려주는 조건이에요.',
          '"기초가 되는, 바탕이 되는"이라는 뜻의 단어가 들어가요.'
        ),
        () => makeChoice(
          '재귀 함수에 기저 조건이 없거나 절대 만족되지 않으면 어떤 일이 생길까요?',
          '<code>RecursionError</code>가 난다', ['자동으로 멈춘다', '0을 반환한다', '아무 일도 안 일어난다'],
          '기저 조건 없이 계속 자기 자신을 부르면 결국 호출 한도를 넘어서 <code>RecursionError</code>가 나요.',
          '무한 루프처럼, 재귀도 멈추는 조건이 없으면 끝없이 반복돼요.'
        ),
        () => ({
          type: 'code',
          q: '1부터 <code>n</code>까지 더한 값을 재귀로 계산하는 함수 <code>sum_to(n)</code>을 작성하세요. (기저 조건: <code>n</code>이 0이면 0을 반환)',
          starter: '',
          rows: 4,
          placeholder: 'def sum_to(n):\n    if n == 0:\n        return 0\n    return n + sum_to(n - 1)',
          accept: ['def sum_to(n):\n    if n == 0:\n        return 0\n    return n + sum_to(n - 1)'],
          why: '기저 조건(n == 0일 때 0 반환)에 도달할 때까지, 매번 n을 더하고 더 작은 문제(n - 1)로 자기 자신을 불러요.',
          hint: 'if n == 0: return 0을 먼저 쓰고, 그 다음 줄에 return n + sum_to(n - 1)을 쓰세요.'
        }),
      ],
      boss: () => {
        const n = randInt(4, 7);
        let sum = 0;
        for (let i = 1; i <= n; i++) sum += i;
        return {
          type: 'blank',
          q: `<code>def sum_to(n): if n == 0: return 0; return n + sum_to(n - 1)</code> 함수에 <code>sum_to(${n})</code>을 호출하면 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `1부터 ${n}까지 재귀적으로 더하면 ${sum}이에요.`,
          hint: '기저 조건에 도달할 때까지 n, n-1, n-2, ... 순서로 더해진다고 생각해보세요.'
        };
      }
    },
    {
      id: 'customexc',
      title: '나만의 예외와 클래스 심화',
      ready: true,
      summary: '직접 오류를 발생시키는 raise와 나만의 예외 클래스, 그리고 객체 없이도 부를 수 있는 메서드를 배워요.',
      goals: ['raise로 오류 직접 내기', '나만의 예외 클래스 만들기', '@staticmethod', '__str__로 출력 모습 바꾸기'],
      blocks: [
        {
          h: '직접 오류를 일으키기: raise',
          html: `<p><code>raise 오류종류("메시지")</code>를 쓰면, 조건에 맞지 않는 상황에서 내가 직접 오류를 발생시킬 수 있어요. 이렇게 발생시킨 오류도 <code>try/except</code>로 잡을 수 있어요.</p>`,
          code: {
            label: 'raise.py',
            src: `def set_age(age):
    if age < 0:
        raise ValueError("나이는 음수일 수 없어요")
    return age

try:
    set_age(-5)
except ValueError as e:
    print(e)`,
            out: `나이는 음수일 수 없어요`
          }
        },
        {
          h: '나만의 예외 클래스 만들기',
          html: `<p><code>Exception</code>을 상속받는 클래스를 만들면, "이 상황에서 왜 오류가 났는지"를 이름만 봐도 알 수 있는 나만의 예외를 만들 수 있어요.</p>`,
          code: {
            label: 'custom_error.py',
            src: `class NotEnoughMoneyError(Exception):
    pass

def buy(money, price):
    if money < price:
        raise NotEnoughMoneyError("돈이 부족해요")
    return "구매 완료"

try:
    buy(1000, 5000)
except NotEnoughMoneyError as e:
    print(e)`,
            out: `돈이 부족해요`
          }
        },
        {
          h: '객체 없이도 부를 수 있는 메서드: @staticmethod',
          html: `<p><code>@staticmethod</code>가 붙은 메서드는 <code>self</code>를 받지 않고, 객체를 만들지 않아도 <code>클래스이름.메서드()</code>로 바로 부를 수 있어요. 그 클래스와 관련은 있지만 객체의 값이 필요 없는 기능에 써요.</p>`,
          code: {
            label: 'staticmethod.py',
            src: `class MathUtil:
    @staticmethod
    def add(a, b):
        return a + b

print(MathUtil.add(3, 4))`,
            out: `7`
          }
        },
        {
          h: '객체를 print할 때의 모습 바꾸기: __str__',
          html: `<p><code>__str__(self)</code> 메서드를 정의하면, 그 객체를 <code>print()</code>할 때 보여줄 문자열을 직접 정할 수 있어요. 정의하지 않으면 알아보기 힘든 기본 모습이 출력돼요.</p>`,
          code: {
            label: 'str_method.py',
            src: `class Item:
    def __init__(self, name, price):
        self.name = name
        self.price = price
    def __str__(self):
        return f"{self.name} ({self.price}원)"

apple = Item("사과", 1000)
print(apple)`,
            out: `사과 (1000원)`
          },
          after: `<div class="note"><b>기억하기</b> — 이름 앞뒤로 밑줄 두 개가 붙은 <code>__init__</code>, <code>__str__</code> 같은 메서드를 "매직 메서드"라고 불러요. 파이썬이 특정 상황(객체 생성, print 등)에서 자동으로 불러줘요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `조건에 맞지 않을 때 직접 오류를 발생시키는 키워드는 무엇일까요?`,
          prefix: '', suffix: ' ValueError("나이는 음수일 수 없어요")', accept: ['raise'], placeholder: '키워드',
          why: '<code>raise 오류종류(메시지)</code>로 직접 오류를 발생시켜요.',
          hint: '"일으키다, 발생시키다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'blank',
          q: `나만의 예외 클래스를 만들려고 해요. <code>Exception</code>을 물려받는 빈 클래스를 완성하세요.`,
          prefix: 'class NotEnoughMoneyError(', suffix: '):\n    pass', accept: ['Exception'], placeholder: '클래스 이름',
          why: '나만의 예외는 <code>Exception</code>을 상속받아서 만들어요.',
          hint: '모든 예외의 "조상"이 되는 기본 클래스 이름이에요.'
        }),
        () => makeChoice(
          '<code>@staticmethod</code>가 붙은 메서드의 특징으로 알맞은 것은?',
          '객체를 만들지 않아도 클래스이름으로 바로 부를 수 있다',
          ['self를 반드시 받아야 한다', '객체를 만들어야만 부를 수 있다', '항상 자동으로 실행된다'],
          '<code>@staticmethod</code>는 self 없이, 객체 없이도 클래스이름으로 바로 부를 수 있어요.',
          '"정적인, 고정된"이라는 뜻의 static이 붙은 이유를 생각해보세요.'
        ),
        () => makeChoice(
          '객체를 print()할 때 보여줄 모습을 직접 정하고 싶을 때 정의하는 메서드는?',
          '<code>__str__</code>', ['<code>__init__</code>', '<code>__main__</code>', '<code>__len__</code>'],
          '<code>__str__(self)</code>은 그 객체를 print()할 때 어떤 문자열로 보여줄지 정해줘요.',
          '"문자열(string)"과 관련된 매직 메서드 이름이에요.'
        ),
        () => {
          const money = randInt(1000, 4000);
          const price = randInt(1000, 5000);
          const ok = money >= price;
          return {
            type: 'blank',
            q: `<code>money = ${money}</code>, <code>price = ${price}</code>일 때, <code>if money &lt; price: raise NotEnoughMoneyError("돈이 부족해요")</code>를 <code>try/except NotEnoughMoneyError as e: print(e)</code>로 감쌌어요. 무엇이 출력될까요? (오류가 안 나면 "정상")`,
            prefix: '', suffix: '', accept: [ok ? '정상' : '돈이 부족해요'], placeholder: '출력될 문장',
            why: ok
              ? `${money}는 ${price}보다 크거나 같아서 오류가 나지 않아요.`
              : `${money}는 ${price}보다 작아서 <code>NotEnoughMoneyError</code>가 나고, except가 그 메시지를 출력해요.`,
            hint: 'money가 price보다 작은지 아닌지 먼저 비교해보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>Exception</code>을 상속받는 <code>InvalidScoreError</code>라는 나만의 예외 클래스를 만드세요. (내용은 <code>pass</code>만 있으면 돼요)',
          starter: '',
          placeholder: 'class InvalidScoreError(Exception):\n    pass',
          accept: ['class InvalidScoreError(Exception):\n    pass'],
          why: '<code>class 이름(Exception): pass</code> 형태로 나만의 예외를 만들 수 있어요.',
          hint: 'class InvalidScoreError(Exception): 다음 줄에 pass를 쓰세요.'
        }),
      ],
      boss: () => {
        const price = randInt(1000, 3000);
        const stock = randInt(0, 5);
        const ok = stock > 0;
        return {
          type: 'code',
          q: `<code>OutOfStockError</code>라는 나만의 예외 클래스(<code>Exception</code> 상속)를 만드세요. <code>stock = ${stock}</code>일 때, <code>stock</code>이 0이면 <code>raise OutOfStockError("품절이에요")</code>를, 아니면 <code>print(f"재고 {stock}개 남음")</code>을 실행하는 <code>try/except OutOfStockError as e: print(e)</code> 전체 코드를 작성하세요.`,
          starter: '',
          rows: 9,
          placeholder: `class OutOfStockError(Exception):\n    pass\n\nstock = ${stock}\ntry:\n    if stock == 0:\n        raise OutOfStockError("품절이에요")\n    print(f"재고 {stock}개 남음")\nexcept OutOfStockError as e:\n    print(e)`,
          accept: [`class OutOfStockError(Exception):\n    pass\nstock = ${stock}\ntry:\n    if stock == 0:\n        raise OutOfStockError("품절이에요")\n    print(f"재고 {stock}개 남음")\nexcept OutOfStockError as e:\n    print(e)`],
          why: ok
            ? `stock이 ${stock}로 0이 아니라서 오류 없이 "재고 ${stock}개 남음"이 출력돼요.`
            : `stock이 0이라서 OutOfStockError가 발생하고, except가 그 메시지 "품절이에요"를 출력해요.`,
          hint: '클래스를 먼저 정의한 뒤, try 블록 안에서 stock이 0인지 확인해 raise하거나 print하고, except OutOfStockError로 감싸세요.'
        };
      }
    },
    {
      id: 'sorting',
      title: '정렬과 검색',
      ready: true,
      summary: '리스트를 원하는 순서로 줄 세우고, 원하는 기준으로 정렬하고, 값이 들어있는지 확인하는 방법을 배워요.',
      goals: ['sorted()로 정렬하기', 'reverse 옵션', 'key로 정렬 기준 정하기', 'in으로 포함 여부 확인'],
      blocks: [
        {
          h: '리스트를 순서대로 줄 세우기: sorted()',
          html: `<p><code>sorted(리스트)</code>는 원래 리스트는 그대로 두고, <b>정렬된 새 리스트</b>를 만들어 돌려줘요. <code>reverse=True</code>를 넣으면 큰 값부터 작은 값 순서로(내림차순) 정렬돼요.</p>`,
          code: {
            label: 'sorted.py',
            src: `nums = [5, 2, 8, 1]

print(sorted(nums))
print(sorted(nums, reverse=True))`,
            out: `[1, 2, 5, 8]\n[8, 5, 2, 1]`
          }
        },
        {
          h: '정렬 기준을 직접 정하기: key',
          html: `<p>값 자체가 아니라 다른 기준으로 정렬하고 싶으면 <code>key=함수</code>를 써요. 예를 들어 <code>key=len</code>을 쓰면 "글자 수가 적은 순서"로 정렬돼요.</p>`,
          code: {
            label: 'key.py',
            src: `words = ["banana", "fig", "apple"]

print(sorted(words, key=len))`,
            out: `['fig', 'apple', 'banana']`
          },
          after: `<div class="note"><b>기억하기</b> — <code>key=len</code>은 알파벳 순서가 아니라 <b>글자 수</b> 기준으로 정렬해요. "fig"(3글자) → "apple"(5글자) → "banana"(6글자) 순이에요.</div>`
        },
        {
          h: '리스트 안에 값이 있는지 확인하기: in',
          html: `<p><code>값 in 리스트</code>는 그 값이 리스트 안에 있으면 <code>True</code>, 없으면 <code>False</code>를 돌려줘요. 하나하나 순번을 확인할 필요 없이 바로 물어볼 수 있어요.</p>`,
          code: {
            label: 'membership.py',
            src: `fruits = ["사과", "바나나", "포도"]

print("바나나" in fruits)
print("수박" in fruits)`,
            out: `True\nFalse`
          }
        }
      ],
      quizGenerators: [
        () => {
          const nums = Array.from({ length: randInt(4, 6) }, () => randInt(1, 50));
          const sorted = [...nums].sort((a, b) => a - b);
          return {
            type: 'blank',
            q: `<code>sorted([${nums.join(', ')}])</code>의 결과를 대괄호 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`[${sorted.join(', ')}]`], placeholder: '[숫자, 숫자, ...]',
            why: `작은 값부터 순서대로 늘어놓으면 [${sorted.join(', ')}]이 돼요.`,
            hint: '가장 작은 값부터 차례로 늘어놓아 보세요.'
          };
        },
        () => {
          const nums = Array.from({ length: randInt(4, 6) }, () => randInt(1, 50));
          const sorted = [...nums].sort((a, b) => b - a);
          return {
            type: 'blank',
            q: `<code>sorted([${nums.join(', ')}], reverse=True)</code>의 결과를 대괄호 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`[${sorted.join(', ')}]`], placeholder: '[숫자, 숫자, ...]',
            why: `<code>reverse=True</code>는 큰 값부터 늘어놓아서 [${sorted.join(', ')}]이 돼요.`,
            hint: '가장 큰 값부터 차례로 늘어놓아 보세요.'
          };
        },
        () => {
          const words = shuffle(['ox', 'cat', 'lion', 'zebra', 'horse']).slice(0, 4);
          const sorted = [...words].sort((a, b) => a.length - b.length);
          return {
            type: 'blank',
            q: `<code>sorted([${words.map(w => `'${w}'`).join(', ')}], key=len)</code>의 결과를 대괄호와 따옴표 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`[${sorted.map(w => `'${w}'`).join(', ')}]`], placeholder: "['값', '값', ...]",
            why: `<code>key=len</code>은 글자 수가 적은 순서로 정렬해서 [${sorted.map(w => `'${w}'`).join(', ')}]이 돼요.`,
            hint: '알파벳 순서가 아니라, 글자가 몇 개인지(길이) 순서로 줄을 세워보세요.'
          };
        },
        () => {
          const fruits = shuffle(['사과', '바나나', '포도', '딸기']).slice(0, 3);
          const target = pick([...fruits, '수박', '망고'].filter((v, i, a) => a.indexOf(v) === i));
          const isIn = fruits.includes(target);
          return {
            type: 'blank',
            q: `<code>fruits = [${fruits.map(v => `'${v}'`).join(', ')}]</code>일 때, <code>"${target}" in fruits</code>의 결과는? (<code>True</code> 또는 <code>False</code>)`,
            prefix: '', suffix: '', accept: [String(isIn)], placeholder: 'True 또는 False',
            why: `fruits 안에 "${target}"이(가) ${isIn ? '있어서 True' : '없어서 False'}예요.`,
            hint: '리스트 안에 그 값이 실제로 있는지 하나씩 확인해보세요.'
          };
        },
        () => makeChoice(
          '원래 리스트는 그대로 두고, 정렬된 새 리스트를 만들어 돌려주는 함수는?',
          '<code>sorted()</code>', ['<code>sort()</code>', '<code>order()</code>', '<code>reverse()</code>'],
          '<code>sorted(리스트)</code>는 원본은 안 바꾸고 정렬된 새 리스트를 만들어요.',
          '(참고로 <code>.sort()</code>는 리스트 자체를 직접 바꿔버려요.)'
        ),
        () => ({
          type: 'code',
          q: '리스트 <code>scores = [70, 95, 60, 88]</code>를 큰 값부터 작은 값 순서로 정렬해서 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'print(sorted(scores, reverse=True))',
          accept: ['print(sorted(scores, reverse=True))'],
          why: '<code>sorted(scores, reverse=True)</code>는 큰 값부터 작은 값 순서로 정렬해줘요.',
          hint: 'sorted( ) 안에 리스트와 함께 reverse=True를 넣어보세요.'
        }),
      ],
      boss: () => {
        const words = shuffle(['dog', 'ant', 'whale', 'owl', 'tiger']).slice(0, 4);
        const sorted = [...words].sort((a, b) => a.length - b.length);
        const first = sorted[0];
        return {
          type: 'blank',
          q: `<code>animals = [${words.map(w => `'${w}'`).join(', ')}]</code>을 <code>sorted(animals, key=len)</code>로 정렬한 뒤, <code>"${first}" in sorted(animals, key=len)[:1]</code>의 결과는? (<code>True</code> 또는 <code>False</code>)`,
          prefix: '', suffix: '', accept: ['True'], placeholder: 'True 또는 False',
          why: `길이순으로 정렬하면 가장 짧은 단어인 "${first}"가 맨 앞에 오고, <code>[:1]</code>은 그 첫 번째 값만 담은 리스트예요. 그 안에 "${first}"가 있으니 True예요.`,
          hint: '먼저 길이 순으로 정렬했을 때 어떤 단어가 맨 앞에 오는지 찾아보세요.'
        };
      }
    },
    {
      id: 'scope',
      title: '변수의 범위와 클로저',
      ready: true,
      summary: '함수 안과 밖의 변수가 서로 어떻게 다른지, 그리고 함수가 값을 "기억"하는 클로저를 배워요.',
      goals: ['지역변수와 전역변수', 'global 키워드', 'nonlocal과 클로저'],
      blocks: [
        {
          h: '함수 안과 밖의 변수는 서로 달라요',
          html: `<p>함수 <b>안에서</b> 만든 변수(지역변수)는 그 함수 밖에서는 존재하지 않아요. 함수 밖에 있는 변수(전역변수)와 이름이 같아도, 함수 안에서 <code>이름 = 값</code>을 쓰면 <b>새로운 지역변수</b>가 만들어질 뿐, 바깥 변수는 안 바뀌어요.</p>`,
          code: {
            label: 'scope.py',
            src: `x = 10

def show():
    x = 20
    print(x)

show()
print(x)`,
            out: `20\n10`
          }
        },
        {
          h: '함수 안에서 전역변수를 진짜로 바꾸고 싶다면: global',
          html: `<p>함수 안에서 바깥(전역) 변수를 <b>진짜로 바꾸고</b> 싶다면, 그 변수를 쓰기 전에 <code>global 이름</code>이라고 먼저 선언해야 해요.</p>`,
          code: {
            label: 'global.py',
            src: `count = 0

def increase():
    global count
    count += 1

increase()
increase()
print(count)`,
            out: `2`
          }
        },
        {
          h: '값을 "기억"하는 함수: 클로저',
          html: `<p>함수 안에 또 다른 함수를 만들고, 그 안쪽 함수가 바깥 함수의 변수를 계속 기억하며 쓰는 걸 <b>클로저</b>라고 해요. 안쪽 함수에서 바깥 함수의 변수를 바꾸려면 <code>nonlocal</code>을 써요.</p>`,
          code: {
            label: 'closure.py',
            src: `def make_counter():
    count = 0
    def counter():
        nonlocal count
        count += 1
        return count
    return counter

c = make_counter()
print(c())
print(c())`,
            out: `1\n2`
          },
          after: `<div class="note"><b>신기한 점</b> — <code>make_counter()</code>는 이미 끝났는데도, <code>c</code>는 그 안의 <code>count</code> 값을 계속 기억하고 있어요. 이게 클로저의 핵심이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const outer = randInt(1, 20), inner = randInt(21, 40);
          return {
            type: 'blank',
            q: `<code>x = ${outer}</code>로 시작해서, 함수 안에서 <code>x = ${inner}</code>로 지역변수를 새로 만들고 출력한 뒤, 함수 밖에서 다시 <code>x</code>를 출력하면 두 번째로 출력되는 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(outer)], placeholder: '숫자',
            why: `함수 안의 <code>x = ${inner}</code>는 지역변수라서 함수 밖의 <code>x</code>(=${outer})에는 영향을 안 줘요.`,
            hint: '함수 안에서 만든 변수는 함수 밖의 같은 이름 변수와 서로 다른 상자예요.'
          };
        },
        () => ({
          type: 'blank',
          q: `함수 안에서 전역변수의 값을 진짜로 바꾸고 싶을 때, 그 변수를 쓰기 전에 선언하는 키워드는 무엇일까요?`,
          prefix: 'def increase():\n    ', suffix: ' count\n    count += 1', accept: ['global'], placeholder: '키워드',
          why: '<code>global 변수이름</code>을 먼저 써야 함수 안에서 전역변수를 실제로 바꿀 수 있어요.',
          hint: '"전체적인, 전역의"라는 뜻의 영어 단어예요.'
        }),
        () => {
          const start = randInt(0, 5);
          const calls = randInt(2, 4);
          return {
            type: 'blank',
            q: `<code>count = ${start}</code>로 시작해서, <code>global count; count += 1</code>인 <code>increase()</code> 함수를 <code>${calls}</code>번 호출했어요. 그 뒤 <code>count</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(start + calls)], placeholder: '숫자',
            why: `${start}에서 시작해서 ${calls}번 1씩 늘었으니 ${start + calls}이에요.`,
            hint: '시작 값에 호출 횟수만큼 1씩 더해보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `클로저(안쪽 함수)에서 바깥 함수의 변수를 바꾸고 싶을 때 쓰는 키워드는 무엇일까요? (전역변수용 global과는 달라요)`,
          prefix: '    def counter():\n        ', suffix: ' count\n        count += 1', accept: ['nonlocal'], placeholder: '키워드',
          why: '<code>nonlocal</code>은 바로 바깥(전역이 아닌) 함수의 변수를 가리킬 때 써요.',
          hint: '"지역이 아닌"이라는 뜻의 단어예요. global과 헷갈리지 마세요.'
        }),
        () => makeChoice(
          '함수가 끝난 뒤에도, 안쪽 함수가 바깥 함수의 변수 값을 계속 기억하는 구조를 부르는 이름은?',
          '클로저', ['재귀', '데코레이터', '제너레이터'],
          '이렇게 바깥 함수의 변수를 기억하며 동작하는 안쪽 함수를 클로저라고 해요.',
          '"닫혀있지만 안의 값을 계속 품고 있다"는 이미지를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>make_counter()</code> 함수를 작성하세요: 안에서 <code>count = 0</code>으로 시작하고, 내부 함수 <code>counter()</code>는 <code>nonlocal count</code> 선언 후 <code>count</code>를 1 늘리고 반환해요. <code>make_counter()</code>는 그 <code>counter</code> 함수를 반환해요.',
          starter: '',
          rows: 5,
          placeholder: 'def make_counter():\n    count = 0\n    def counter():\n        nonlocal count\n        count += 1\n        return count\n    return counter',
          accept: ['def make_counter():\n    count = 0\n    def counter():\n        nonlocal count\n        count += 1\n        return count\n    return counter'],
          why: '바깥 함수에서 count를 만들고, 안쪽 함수가 nonlocal로 그 값을 늘려서 반환하고, 바깥 함수는 안쪽 함수를 그대로 반환해요.',
          hint: 'make_counter 안에 count = 0, 그 안에 counter 함수를 정의하고 nonlocal count를 첫 줄에 쓰세요.'
        }),
      ],
      boss: () => {
        const calls = randInt(3, 5);
        return {
          type: 'blank',
          q: `<code>make_counter()</code>가 <code>count = 0</code>에서 시작해 호출할 때마다 1씩 늘려 반환하는 <code>counter</code>를 돌려줘요. <code>c = make_counter()</code> 후 <code>c()</code>를 <code>${calls}</code>번 연달아 호출했을 때, 마지막 호출의 반환값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(calls)], placeholder: '숫자',
          why: `0에서 시작해서 호출할 때마다 1씩 늘어나니, ${calls}번째 호출에서는 ${calls}이 반환돼요.`,
          hint: '클로저는 이전 호출의 값을 계속 기억하고 있다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'datetime',
      title: '날짜와 시간 다루기',
      ready: true,
      summary: '오늘 날짜를 구하고, 원하는 모양으로 꾸미고, 날짜끼리 며칠 차이인지 계산하는 방법을 배워요.',
      goals: ['datetime으로 날짜 다루기', 'strftime으로 서식 지정', '날짜 차이 계산하기'],
      blocks: [
        {
          h: '날짜를 값으로 다루기: datetime',
          html: `<p><code>datetime</code> 모듈의 <code>date(년, 월, 일)</code>로 특정 날짜를 값으로 만들 수 있어요. 만들어진 값에서 <code>.year</code>, <code>.month</code>, <code>.day</code>로 각각 꺼낼 수 있어요.</p>`,
          code: {
            label: 'date_basic.py',
            src: `from datetime import date

d = date(2026, 3, 5)
print(d.year)
print(d.month)
print(d.day)`,
            out: `2026\n3\n5`
          }
        },
        {
          h: '원하는 모양으로 날짜 꾸미기: strftime',
          html: `<p><code>.strftime(서식)</code>은 날짜를 원하는 글자 모양으로 바꿔줘요. <code>%Y</code>는 4자리 연도, <code>%m</code>은 2자리 월, <code>%d</code>는 2자리 일이에요.</p>`,
          code: {
            label: 'strftime.py',
            src: `from datetime import date

d = date(2026, 3, 5)
print(d.strftime("%Y-%m-%d"))`,
            out: `2026-03-05`
          }
        },
        {
          h: '날짜끼리 며칠 차이인지 계산하기',
          html: `<p>날짜 값끼리 <code>-</code>로 빼면, 그 차이를 나타내는 값이 나와요. <code>.days</code>를 붙이면 "며칠 차이인지" 숫자로 알 수 있어요.</p>`,
          code: {
            label: 'timedelta.py',
            src: `from datetime import date

d1 = date(2026, 1, 1)
d2 = date(2026, 3, 5)
diff = d2 - d1
print(diff.days)`,
            out: `63`
          },
          after: `<div class="note"><b>참고</b> — 이렇게 두 날짜의 차이로 만들어지는 값을 <code>timedelta</code>라고 불러요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const y = randInt(2024, 2027), m = randInt(1, 12), d = randInt(1, 28);
          const mm = String(m).padStart(2, '0'), dd = String(d).padStart(2, '0');
          return {
            type: 'blank',
            q: `<code>d = date(${y}, ${m}, ${d})</code>일 때, <code>d.strftime("%Y-%m-%d")</code>의 결과는?`,
            prefix: '', suffix: '', accept: [`${y}-${mm}-${dd}`], placeholder: 'YYYY-MM-DD',
            why: `%Y는 연도(${y}), %m은 2자리 월(${mm}), %d는 2자리 일(${dd})로 바뀌어서 "${y}-${mm}-${dd}"가 돼요.`,
            hint: '월과 일이 한 자리 수여도 항상 두 자리(앞에 0)로 표시돼요.'
          };
        },
        () => {
          const y = randInt(2024, 2027), m = randInt(1, 12), d = randInt(1, 28);
          return {
            type: 'blank',
            q: `<code>d = date(${y}, ${m}, ${d})</code>일 때, <code>d.month</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(m)], placeholder: '숫자',
            why: `<code>date(년, 월, 일)</code>에서 두 번째 값이 월이라서 <code>.month</code>는 ${m}이에요.`,
            hint: 'date(년, 월, 일)에서 두 번째로 넣은 값을 떠올려보세요.'
          };
        },
        () => {
          const y = randInt(2025, 2026), m1 = randInt(1, 6), d1 = randInt(1, 20);
          const days = randInt(5, 40);
          const start = new Date(y, m1 - 1, d1);
          const end = new Date(start.getTime() + days * 86400000);
          return {
            type: 'blank',
            q: `<code>d1 = date(${y}, ${m1}, ${d1})</code>, <code>d2 = date(${end.getFullYear()}, ${end.getMonth() + 1}, ${end.getDate()})</code>일 때, <code>(d2 - d1).days</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(days)], placeholder: '숫자',
            why: `두 날짜 사이는 ${days}일 차이가 나요.`,
            hint: '두 날짜 값을 빼고 .days를 붙이면 그 사이 날짜 수가 나와요.'
          };
        },
        () => ({
          type: 'blank',
          q: `날짜와 시간을 다루는 기능을 가져오려면 맨 위에 어떤 모듈을 import 해야 할까요? (from ${'{모듈}'} import date 형태)`,
          prefix: 'from ', suffix: ' import date', accept: ['datetime'], placeholder: '모듈 이름',
          why: '<code>from datetime import date</code>로 날짜 관련 기능을 가져와요.',
          hint: '"날짜와 시간"을 그대로 영어로 합친 이름이에요.'
        }),
        () => makeChoice(
          '<code>strftime</code> 서식에서 4자리 연도를 나타내는 기호는?',
          '<code>%Y</code>', ['<code>%m</code>', '<code>%d</code>', '<code>%y</code>'],
          '<code>%Y</code>는 4자리 연도를 나타내요. (소문자 <code>%y</code>는 2자리예요)',
          '대문자와 소문자가 서로 다른 뜻이라는 걸 기억하세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>date(2026, 12, 25)</code> 값을 만들어 <code>"%Y년 %m월 %d일"</code> 형식으로 출력하는 코드를 작성하세요. (from datetime import date는 이미 되어 있다고 가정)',
          starter: '',
          placeholder: 'print(date(2026, 12, 25).strftime("%Y년 %m월 %d일"))',
          accept: ['print(date(2026, 12, 25).strftime("%Y년 %m월 %d일"))'],
          why: '<code>date(2026, 12, 25).strftime("%Y년 %m월 %d일")</code>은 "2026년 12월 25일"을 만들어줘요.',
          hint: 'date(...)로 값을 만들고 바로 .strftime(서식)을 이어붙이면 돼요.'
        }),
      ],
      boss: () => {
        const y = randInt(2025, 2026);
        const start = new Date(y, 0, 1);
        const days = randInt(60, 300);
        const end = new Date(start.getTime() + days * 86400000);
        return {
          type: 'blank',
          q: `<code>d1 = date(${y}, 1, 1)</code>, <code>d2 = date(${end.getFullYear()}, ${end.getMonth() + 1}, ${end.getDate()})</code>일 때, <code>(d2 - d1).days</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(days)], placeholder: '숫자',
          why: `1월 1일부터 그 날짜까지는 ${days}일이 차이나요.`,
          hint: '두 날짜를 빼고 .days를 붙이면 그 사이 일수가 나와요.'
        };
      }
    },
    {
      id: 'json',
      title: 'JSON 다루기',
      ready: true,
      summary: '파이썬 값을 JSON이라는 표준 형식의 문자열로 바꾸고, 다시 파이썬 값으로 되돌리는 방법을 배워요.',
      goals: ['json.dumps로 문자열 만들기', 'json.loads로 다시 불러오기', 'JSON을 쓰는 이유'],
      blocks: [
        {
          h: '파이썬 값을 JSON 문자열로: json.dumps',
          html: `<p><b>JSON</b>은 여러 프로그램·언어끼리 데이터를 주고받을 때 자주 쓰는 표준 텍스트 형식이에요. <code>json.dumps(값)</code>은 딕셔너리 같은 파이썬 값을 JSON 형식의 문자열로 바꿔줘요.</p>`,
          code: {
            label: 'dumps.py',
            src: `import json

student = {"name": "지수", "age": 17}
text = json.dumps(student, ensure_ascii=False)
print(text)`,
            out: `{"name": "지수", "age": 17}`
          },
          after: `<div class="note"><b>참고</b> — <code>ensure_ascii=False</code>를 안 붙이면, 한글 같은 영어가 아닌 글자는 <code>\\uAC00</code> 같은 코드로 바뀌어서 출력돼요. 사람이 읽기 좋게 하려고 붙였어요.</div>`
        },
        {
          h: 'JSON 문자열을 다시 파이썬 값으로: json.loads',
          html: `<p><code>json.loads(문자열)</code>은 JSON 형식의 문자열을 다시 파이썬 딕셔너리(또는 리스트)로 되돌려줘요. <code>dumps</code>(내보내기)와 정반대예요.</p>`,
          code: {
            label: 'loads.py',
            src: `import json

text = '{"name": "민준", "age": 16}'
data = json.loads(text)
print(data["name"])`,
            out: `민준`
          }
        },
        {
          h: '왜 JSON을 쓸까요?',
          html: `<p>딕셔너리는 파이썬 안에서만 쓸 수 있는 값이지만, JSON 문자열은 그냥 <b>글자</b>라서 파일에 저장하거나, 인터넷으로 다른 프로그램(다른 언어로 만들어졌어도!)에 보낼 수 있어요. 그래서 데이터를 주고받는 표준 형식으로 아주 널리 쓰여요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `딕셔너리 같은 파이썬 값을 JSON 문자열로 바꾸는 함수의 이름을 쓰세요. (<code>import json</code> 이후)`,
          prefix: 'json.', suffix: '(student)', accept: ['dumps'], placeholder: '함수 이름',
          why: '<code>json.dumps(값)</code>은 파이썬 값을 JSON 문자열로 바꿔줘요.',
          hint: '"내보내다, 버리다"라는 뜻과 관련된 단어예요.'
        }),
        () => ({
          type: 'blank',
          q: `JSON 문자열을 다시 파이썬 값으로 되돌리는 함수의 이름을 쓰세요.`,
          prefix: 'data = json.', suffix: '(text)', accept: ['loads'], placeholder: '함수 이름',
          why: '<code>json.loads(문자열)</code>은 JSON 문자열을 파이썬 값으로 되돌려줘요.',
          hint: '"불러오다"라는 뜻과 관련된 단어예요.'
        }),
        () => {
          const name = pick(['서연', '도윤', '하은']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>text = '{"name": "${name}", "age": ${age}}'</code>일 때, <code>json.loads(text)["age"]</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(age)], placeholder: '숫자',
            why: `loads로 되돌린 딕셔너리에서 "age" 키의 값은 ${age}예요.`,
            hint: 'JSON 문자열을 파이썬 딕셔너리로 되돌린 뒤, 키로 값을 꺼내는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          'JSON을 여러 프로그램·언어가 함께 쓰는 이유로 가장 알맞은 것은?',
          '텍스트라서 어떤 언어·프로그램에서도 읽고 쓸 수 있어서',
          ['파이썬에서만 쓸 수 있어서', '실행 속도가 가장 빨라서', '숫자만 저장할 수 있어서'],
          'JSON은 그냥 글자(텍스트)라서, 어떤 프로그래밍 언어로 만든 프로그램이든 읽고 쓸 수 있어요.',
          'JSON이 "특정 언어의 문법"이 아니라 "글자로 이루어진 형식"이라는 점을 생각해보세요.'
        ),
        () => makeChoice(
          '<code>json.dumps</code>에서 한글이 <code>\\uAC00</code> 같은 코드로 안 바뀌고 그대로 보이게 하려면?',
          '<code>ensure_ascii=False</code>를 추가한다', ['<code>korean=True</code>를 추가한다', 'import를 두 번 한다', '아무것도 할 수 없다'],
          '<code>ensure_ascii=False</code>를 주면 영어가 아닌 글자도 코드로 안 바뀌고 그대로 출력돼요.',
          'ASCII(영어 알파벳 등)만 쓰도록 "보장"하는 옵션을 꺼야 해요.'
        ),
        () => ({
          type: 'code',
          q: '딕셔너리 <code>{"name": "지수", "age": 17}</code>를 <code>ensure_ascii=False</code>를 붙여서 JSON 문자열로 만들어 출력하는 코드를 작성하세요. (import json은 이미 되어 있다고 가정)',
          starter: '',
          placeholder: 'print(json.dumps({"name": "지수", "age": 17}, ensure_ascii=False))',
          accept: ['print(json.dumps({"name": "지수", "age": 17}, ensure_ascii=False))'],
          why: '<code>json.dumps(딕셔너리, ensure_ascii=False)</code>는 한글이 그대로 보이는 JSON 문자열을 만들어요.',
          hint: 'json.dumps( ) 안에 딕셔너리와 ensure_ascii=False를 함께 넣으세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        const city = pick(['서울', '부산', '대구']);
        return {
          type: 'blank',
          q: `<code>json.dumps({"name": "${name}", "age": ${age}, "city": "${city}"}, ensure_ascii=False)</code>의 결과를 그대로 쓰세요. (중괄호와 따옴표 포함, 순서 그대로)`,
          prefix: '', suffix: '', accept: [`{"name": "${name}", "age": ${age}, "city": "${city}"}`], placeholder: '{"key": "value", ...}',
          why: `딕셔너리에 넣은 순서 그대로 JSON 문자열이 만들어지고, <code>ensure_ascii=False</code>라서 한글도 그대로 나와요.`,
          hint: '딕셔너리를 만들 때 쓴 키와 값 순서를 그대로 JSON 형식({"키": 값, ...})으로 옮겨써보세요.'
        };
      }
    },
    {
      id: 'collections_mod',
      title: '유용한 컬렉션 도구',
      ready: true,
      summary: 'collections 모듈의 Counter와 defaultdict로, 개수를 세거나 기본값을 자동으로 만드는 법을 배워요.',
      goals: ['Counter로 개수 세기', 'most_common으로 가장 많은 값 찾기', 'defaultdict로 기본값 자동 생성'],
      blocks: [
        {
          h: '값이 몇 번씩 나왔는지 한 번에 세기: Counter',
          html: `<p><code>Counter(리스트)</code>는 리스트 안의 각 값이 몇 번씩 나왔는지 딕셔너리처럼 세어줘요. 반복문으로 하나하나 세는 코드를 직접 안 짜도 돼요.</p>`,
          code: {
            label: 'counter.py',
            src: `from collections import Counter

words = ["사과", "바나나", "사과", "포도", "사과"]
count = Counter(words)
print(count["사과"])`,
            out: `3`
          }
        },
        {
          h: '가장 많이 나온 값 찾기: most_common',
          html: `<p><code>.most_common(n)</code>은 가장 많이 나온 값부터 <code>n</code>개를 <code>(값, 개수)</code> 튜플로 알려줘요.</p>`,
          code: {
            label: 'most_common.py',
            src: `print(count.most_common(1))`,
            out: `[('사과', 3)]`
          }
        },
        {
          h: '키가 없어도 자동으로 기본값을 만들어주는 딕셔너리: defaultdict',
          html: `<p>보통 딕셔너리는 없는 키에 바로 <code>.append()</code>하면 오류가 나요. <code>defaultdict(list)</code>는 <b>없는 키에 처음 접근하는 순간</b> 자동으로 빈 리스트를 만들어줘서, 그런 오류 없이 바로 값을 추가할 수 있어요.</p>`,
          code: {
            label: 'defaultdict.py',
            src: `from collections import defaultdict

groups = defaultdict(list)
groups["fruit"].append("사과")
groups["fruit"].append("바나나")
print(groups["fruit"])`,
            out: `['사과', '바나나']`
          },
          after: `<div class="note"><b>비교</b> — 보통 딕셔너리였다면 <code>groups["fruit"]</code>이 없을 때 <code>if "fruit" not in groups: groups["fruit"] = []</code>를 먼저 해줘야 했어요. <code>defaultdict</code>는 이 과정을 자동으로 해줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const pool = ['사과', '바나나', '포도'];
          const target = pick(pool);
          const items = Array.from({ length: randInt(6, 9) }, () => pick(pool));
          const count = items.filter(v => v === target).length;
          return {
            type: 'blank',
            q: `<code>words = [${items.map(v => `'${v}'`).join(', ')}]</code>일 때, <code>Counter(words)["${target}"]</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(count)], placeholder: '숫자',
            why: `words 안에 "${target}"이(가) ${count}번 나와요.`,
            hint: '리스트 안에서 그 값이 몇 번 나오는지 세어보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `리스트 안의 값들이 몇 번씩 나왔는지 세어주는, collections 모듈의 도구 이름을 쓰세요.`,
          prefix: 'from collections import ', suffix: '', accept: ['Counter'], placeholder: '이름',
          why: '<code>Counter(리스트)</code>는 각 값이 몇 번 나왔는지 세어줘요.',
          hint: '"세는 사람/도구"라는 뜻의 영어 단어예요. 첫 글자는 대문자예요.'
        }),
        () => makeChoice(
          '<code>Counter</code> 객체에서 가장 많이 나온 값 1개를 <code>(값, 개수)</code> 형태로 알고 싶을 때 쓰는 메서드는?',
          '<code>.most_common(1)</code>', ['<code>.top(1)</code>', '<code>.max(1)</code>', '<code>.best(1)</code>'],
          '<code>.most_common(n)</code>은 가장 많이 나온 순서로 n개를 알려줘요.',
          '"가장 흔한"이라는 뜻의 영어 표현이에요.'
        ),
        () => makeChoice(
          '<code>defaultdict(list)</code>의 특징으로 알맞은 것은?',
          '없는 키에 처음 접근하면 자동으로 빈 리스트를 만들어준다',
          ['모든 키의 기본값이 항상 0이다', '리스트에만 쓸 수 있고 딕셔너리처럼은 못 쓴다', '키를 미리 다 등록해야만 쓸 수 있다'],
          '<code>defaultdict(list)</code>는 없는 키에 접근하는 순간 자동으로 빈 리스트를 만들어서, 오류 없이 바로 append할 수 있어요.',
          '보통 딕셔너리와 다르게, "없는 키" 접근 시 무슨 일이 생기는지를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>collections</code>의 <code>defaultdict</code>로 값이 리스트인 <code>groups</code>를 만들고, <code>groups["fruit"]</code>에 <code>"사과"</code>를 추가하는 코드를 작성하세요. (import는 이미 되어 있다고 가정)',
          starter: '',
          placeholder: 'groups = defaultdict(list)\ngroups["fruit"].append("사과")',
          accept: ['groups = defaultdict(list)\ngroups["fruit"].append("사과")'],
          why: '<code>defaultdict(list)</code>로 만들면, 없는 키에도 바로 <code>.append()</code>를 쓸 수 있어요.',
          hint: 'defaultdict(list)로 groups를 만들고, groups["fruit"].append("사과")를 쓰세요.'
        }),
      ],
      boss: () => {
        const pool = ['개', '고양이', '토끼', '햄스터'];
        const items = Array.from({ length: randInt(7, 10) }, () => pick(pool));
        const counts = pool.map(v => [v, items.filter(x => x === v).length]).filter(([, c]) => c > 0);
        counts.sort((a, b) => b[1] - a[1]);
        const [topWord, topCount] = counts[0];
        return {
          type: 'blank',
          q: `<code>pets = [${items.map(v => `'${v}'`).join(', ')}]</code>일 때, <code>Counter(pets).most_common(1)</code>의 결과를 그대로 쓰세요. (예: <code>[('개', 3)]</code>)`,
          prefix: '', suffix: '', accept: [`[('${topWord}', ${topCount})]`], placeholder: "[('값', 숫자)]",
          why: `pets 안에서 가장 많이 나온 값은 "${topWord}"(${topCount}번)예요.`,
          hint: '각 값이 몇 번씩 나왔는지 세어보고, 그중 가장 많이 나온 값 하나를 찾아보세요.'
        };
      }
    },
    {
      id: 'args_kwargs',
      title: '가변 인자: *args와 **kwargs',
      ready: true,
      summary: '함수가 몇 개의 값이 들어올지 모를 때도 자유롭게 받을 수 있는 *args와 **kwargs를 배워요.',
      goals: ['*args로 여러 값 받기', '**kwargs로 이름=값 여러 개 받기', '리스트를 낱개 인자로 풀어서 넘기기'],
      blocks: [
        {
          h: '몇 개가 올지 모를 때: *args',
          html: `<p>매개변수 앞에 <code>*</code>를 붙이면, 호출할 때 넘긴 값 개수와 상관없이 전부 하나의 <b>튜플</b>로 모아서 받을 수 있어요.</p>`,
          code: {
            label: 'args.py',
            src: `def total(*args):
    return sum(args)

print(total(1, 2, 3))
print(total(10, 20))`,
            out: `6\n30`
          }
        },
        {
          h: '이름=값 형태로 몇 개든 받기: **kwargs',
          html: `<p><code>**</code>를 붙이면, <code>이름=값</code> 형태로 넘긴 값들을 전부 하나의 <b>딕셔너리</b>로 모아서 받을 수 있어요.</p>`,
          code: {
            label: 'kwargs.py',
            src: `def show_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

show_info(name="지수", age=17)`,
            out: `name: 지수\nage: 17`
          }
        },
        {
          h: '리스트를 낱개 인자로 풀어서 넘기기',
          html: `<p>반대로, 이미 있는 리스트를 함수 호출할 때 <code>*리스트</code>로 넘기면, 리스트 안의 값들이 하나씩 낱개 인자로 풀려서 전달돼요.</p>`,
          code: {
            label: 'unpack_call.py',
            src: `def add3(a, b, c):
    return a + b + c

nums = [1, 2, 3]
print(add3(*nums))`,
            out: `6`
          },
          after: `<div class="note"><b>정리</b> — <code>*</code>는 함수를 <b>정의할 때</b> 쓰면 "여러 값을 모아 받기", 함수를 <b>부를 때</b> 쓰면 "리스트를 풀어서 넘기기"라는 반대 역할을 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const nums = Array.from({ length: randInt(2, 4) }, () => randInt(1, 30));
          const sum = nums.reduce((a, b) => a + b, 0);
          return {
            type: 'blank',
            q: `<code>def total(*args): return sum(args)</code>에 <code>total(${nums.join(', ')})</code>라고 호출하면 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
            why: `*args가 넘긴 값 [${nums.join(', ')}]을 모두 튜플로 모아서, sum()으로 다 더하면 ${sum}이에요.`,
            hint: '넘긴 숫자들을 전부 더해보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `함수가 몇 개든 값을 받을 수 있게 하려면, 매개변수 앞에 어떤 기호를 붙일까요?`,
          prefix: 'def total(', suffix: 'args):\n    return sum(args)', accept: ['*'], placeholder: '기호',
          why: '<code>*args</code>처럼 별표를 붙이면 여러 값을 하나의 튜플로 모아 받아요.',
          hint: '곱셈에도 쓰이는 그 기호예요.'
        }),
        () => {
          const nums = Array.from({ length: 3 }, () => randInt(1, 20));
          const sum = nums.reduce((a, b) => a + b, 0);
          return {
            type: 'blank',
            q: `<code>def add3(a, b, c): return a + b + c</code>가 있을 때, <code>nums = [${nums.join(', ')}]</code>로 <code>add3(*nums)</code>를 호출하면 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
            why: `<code>*nums</code>는 리스트를 낱개 인자로 풀어서 넘겨서, <code>add3(${nums.join(', ')})</code>와 같아요. 합은 ${sum}이에요.`,
            hint: '*nums는 리스트를 낱개로 풀어서 함수에 넘긴다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          '<code>def f(**kwargs)</code>에서 <code>kwargs</code>는 어떤 자료형으로 값을 모을까요?',
          '딕셔너리', ['리스트', '튜플', '집합'],
          '<code>**kwargs</code>는 <code>이름=값</code> 형태로 넘긴 것들을 딕셔너리로 모아요.',
          '키(이름)와 값이 짝지어져 있다는 걸 생각해보세요.'
        ),
        () => makeChoice(
          '<code>*args</code>는 넘긴 값들을 어떤 자료형으로 모을까요?',
          '튜플', ['딕셔너리', '집합', '문자열'],
          '<code>*args</code>는 여러 값을 하나의 튜플로 모아서 받아요.',
          '순서가 있고, 한 번 만들면 안 바뀌는 자료형이에요.'
        ),
        () => ({
          type: 'code',
          q: '넘겨받은 값들 중 가장 큰 값을 반환하는 함수 <code>find_max(*args)</code>를 작성하세요. (<code>max()</code> 함수를 활용하세요)',
          starter: '',
          rows: 2,
          placeholder: 'def find_max(*args):\n    return max(args)',
          accept: ['def find_max(*args):\n    return max(args)'],
          why: '<code>*args</code>로 모은 튜플을 <code>max()</code>에 넣으면 그중 가장 큰 값을 돌려줘요.',
          hint: 'def find_max(*args): 다음 줄에 return max(args)를 쓰세요.'
        }),
      ],
      boss: () => {
        const nums = Array.from({ length: randInt(3, 5) }, () => randInt(1, 50));
        const maxVal = Math.max(...nums);
        return {
          type: 'blank',
          q: `<code>def find_max(*args): return max(args)</code> 함수에 <code>find_max(${nums.join(', ')})</code>라고 호출하면 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(maxVal)], placeholder: '숫자',
          why: `넘긴 값들 중 가장 큰 값은 ${maxVal}이에요.`,
          hint: '넘긴 숫자들 중에서 가장 큰 값을 찾아보세요.'
        };
      }
    },
    {
      id: 'enumerate_zip',
      title: 'enumerate와 zip으로 함께 순회하기',
      ready: true,
      summary: '순번과 값을 같이 꺼내는 enumerate, 여러 리스트를 나란히 순회하는 zip을 배워요.',
      goals: ['enumerate로 순번과 함께 꺼내기', 'zip으로 여러 리스트 동시에 순회하기'],
      blocks: [
        {
          h: '순번과 값을 동시에 꺼내기: enumerate',
          html: `<p>보통 <code>for item in 리스트:</code>는 값만 꺼내주지만, <code>enumerate(리스트)</code>를 쓰면 <b>순번</b>과 <b>값</b>을 한 번에 꺼낼 수 있어요.</p>`,
          code: {
            label: 'enumerate.py',
            src: `fruits = ["사과", "바나나", "포도"]

for i, fruit in enumerate(fruits):
    print(i, fruit)`,
            out: `0 사과\n1 바나나\n2 포도`
          }
        },
        {
          h: '여러 리스트를 나란히 순회하기: zip',
          html: `<p><code>zip(리스트1, 리스트2)</code>는 두 리스트의 같은 순번 값끼리 짝지어서 하나씩 꺼내줘요. 두 리스트의 길이가 다르면, <b>더 짧은 쪽 길이</b>만큼만 짝지어져요.</p>`,
          code: {
            label: 'zip.py',
            src: `names = ["지수", "민준"]
scores = [90, 85]

for name, score in zip(names, scores):
    print(f"{name}: {score}")`,
            out: `지수: 90\n민준: 85`
          },
          after: `<div class="note"><b>기억하기</b> — <code>enumerate</code>는 "하나의 리스트 + 순번", <code>zip</code>은 "여러 리스트를 나란히"라고 구분해서 기억하면 헷갈리지 않아요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const items = shuffle(['사과', '바나나', '포도', '딸기']).slice(0, randInt(2, 4));
          const idx = randInt(0, items.length - 1);
          return {
            type: 'blank',
            q: `<code>fruits = [${items.map(v => `'${v}'`).join(', ')}]</code>일 때, <code>for i, fruit in enumerate(fruits):</code>로 반복하면, <code>i</code>가 <code>${idx}</code>일 때 <code>fruit</code>의 값은? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [items[idx]], placeholder: '값',
            why: `<code>enumerate</code>는 0부터 순번을 매기니까, 순번 ${idx}은 "${items[idx]}"예요.`,
            hint: 'enumerate의 순번도 0부터 시작해요.'
          };
        },
        () => {
          const names = shuffle(['지수', '민준', '서연']).slice(0, 2);
          const scores = Array.from({ length: 2 }, () => randInt(60, 100));
          return {
            type: 'blank',
            q: `<code>names = [${names.map(v => `'${v}'`).join(', ')}]</code>, <code>scores = [${scores.join(', ')}]</code>일 때, <code>zip(names, scores)</code>로 만들어지는 짝을 첫 번째부터 순서대로 "이름-점수, 이름-점수" 형태로 쓰세요.`,
            prefix: '', suffix: '', accept: [names.map((n, i) => `${n}-${scores[i]}`).join(', ')], placeholder: '이름-점수, 이름-점수',
            why: `같은 순번끼리 짝지어져서 ${names.map((n, i) => `${n}과 ${scores[i]}`).join(', ')}가 짝이 돼요.`,
            hint: '같은 순번(0번끼리, 1번끼리)에 있는 값들이 서로 짝지어져요.'
          };
        },
        () => {
          const n1 = randInt(2, 3), n2 = n1 + randInt(1, 2);
          return {
            type: 'blank',
            q: `리스트 A에 값이 ${n1}개, 리스트 B에 값이 ${n2}개 있을 때, <code>zip(A, B)</code>로 만들어지는 짝의 개수는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n1)], placeholder: '숫자',
            why: `zip은 더 짧은 쪽 길이만큼만 짝지어지니까, 더 짧은 ${n1}개만큼만 짝이 만들어져요.`,
            hint: '두 리스트 중 더 짧은 쪽 길이를 생각해보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `순번과 값을 함께 꺼내주는 함수의 이름을 쓰세요.`,
          prefix: 'for i, fruit in ', suffix: '(fruits):', accept: ['enumerate'], placeholder: '함수 이름',
          why: '<code>enumerate(리스트)</code>는 순번과 값을 함께 꺼내줘요.',
          hint: '"번호를 매기다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'blank',
          q: `여러 리스트를 나란히 짝지어서 순회하는 함수의 이름을 쓰세요.`,
          prefix: 'for name, score in ', suffix: '(names, scores):', accept: ['zip'], placeholder: '함수 이름',
          why: '<code>zip(리스트1, 리스트2)</code>는 여러 리스트를 나란히 짝지어줘요.',
          hint: '옷의 "지퍼"처럼 두 줄을 나란히 맞물리는 모습을 떠올려보세요.'
        }),
        () => ({
          type: 'code',
          q: '<code>names = ["지수", "민준"]</code>과 <code>ages = [17, 16]</code>을 <code>zip</code>으로 함께 순회하며 <code>f"{name}은 {age}살"</code>을 출력하는 for문을 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'for name, age in zip(names, ages):\n    print(f"{name}은 {age}살")',
          accept: ['for name, age in zip(names, ages):\n    print(f"{name}은 {age}살")'],
          why: '<code>zip(names, ages)</code>로 두 리스트를 나란히 순회하며 각각 <code>name</code>, <code>age</code>로 꺼내요.',
          hint: 'for name, age in zip(names, ages): 다음 줄에 들여써서 print를 쓰세요.'
        }),
      ],
      boss: () => {
        const names = shuffle(['지수', '민준', '서연', '도윤']).slice(0, 3);
        const scores = Array.from({ length: 3 }, () => randInt(60, 100));
        const idx = randInt(0, 2);
        return {
          type: 'blank',
          q: `<code>names = [${names.map(v => `'${v}'`).join(', ')}]</code>, <code>scores = [${scores.join(', ')}]</code>일 때, <code>for i, (name, score) in enumerate(zip(names, scores)):</code>로 반복하면서 <code>i</code>가 <code>${idx}</code>일 때 <code>f"{i}: {name}-{score}"</code>는 무엇이 출력될까요?`,
          prefix: '', suffix: '', accept: [`${idx}: ${names[idx]}-${scores[idx]}`], placeholder: '출력될 문장',
          why: `enumerate와 zip을 함께 쓰면, 순번 ${idx}에서 name은 "${names[idx]}", score는 ${scores[idx]}이 짝지어져요.`,
          hint: 'zip으로 먼저 이름과 점수를 짝짓고, 그 결과에 enumerate로 순번을 매긴다고 생각해보세요.'
        };
      }
    },
    {
      id: 'unpacking',
      title: '언패킹과 다중 할당',
      ready: true,
      summary: '여러 변수에 값을 한 번에 넣고, 값을 맞바꾸고, 나머지 값을 한 번에 담는 방법을 배워요.',
      goals: ['다중 할당', '값 맞바꾸기(swap)', '*로 나머지 담기'],
      blocks: [
        {
          h: '여러 변수에 한 번에 값 넣기',
          html: `<p><code>x, y = 1, 2</code>처럼 쓰면, 쉼표로 구분된 값들이 순서대로 각 변수에 들어가요. 이걸 <b>다중 할당</b>이라고 해요.</p>`,
          code: {
            label: 'multi.py',
            src: `x, y = 1, 2
print(x, y)`,
            out: `1 2`
          }
        },
        {
          h: '임시 변수 없이 값 맞바꾸기',
          html: `<p>다른 언어에서는 두 값을 맞바꾸려면 임시 변수가 필요한 경우가 많지만, 파이썬은 <code>x, y = y, x</code>로 바로 맞바꿀 수 있어요.</p>`,
          code: {
            label: 'swap.py',
            src: `x, y = 1, 2
x, y = y, x
print(x, y)`,
            out: `2 1`
          }
        },
        {
          h: '나머지 값을 한 번에 담기: *',
          html: `<p>변수 앞에 <code>*</code>를 붙이면, 나머지 값들을 전부 <b>리스트</b>로 모아서 받을 수 있어요.</p>`,
          code: {
            label: 'star_unpack.py',
            src: `first, *rest = [1, 2, 3, 4]
print(first)
print(rest)`,
            out: `1\n[2, 3, 4]`
          },
          after: `<div class="note"><b>참고</b> — <code>*rest</code>는 함수의 <code>*args</code>와 같은 원리예요. "나머지를 전부 모아 받는다"는 뜻이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>x, y = ${a}, ${b}</code>를 실행한 뒤 <code>print(x, y)</code>를 하면 무엇이 출력될까요?`,
            prefix: '', suffix: '', accept: [`${a} ${b}`], placeholder: '숫자 숫자',
            why: `쉼표 순서대로 x에 ${a}, y에 ${b}가 들어가요.`,
            hint: '쉼표로 나눈 순서 그대로 각 변수에 들어가요.'
          };
        },
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>x, y = ${a}, ${b}</code> 후 <code>x, y = y, x</code>를 실행하면, <code>x</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(b)], placeholder: '숫자',
            why: `<code>x, y = y, x</code>는 두 값을 맞바꿔서, x는 원래 y였던 ${b}이 돼요.`,
            hint: '맞바꾸기니까, x는 원래 y의 값을 가져가요.'
          };
        },
        () => {
          const nums = Array.from({ length: randInt(4, 6) }, () => randInt(1, 20));
          const rest = nums.slice(1);
          return {
            type: 'blank',
            q: `<code>first, *rest = [${nums.join(', ')}]</code>를 실행하면, <code>rest</code>의 값은? 대괄호 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`[${rest.join(', ')}]`], placeholder: '[숫자, 숫자, ...]',
            why: `<code>first</code>가 맨 앞 값(${nums[0]})을 가져가고, 나머지 [${rest.join(', ')}]는 전부 <code>rest</code>(리스트)에 담겨요.`,
            hint: 'first가 첫 번째 값만 가져가고, 나머지 전부가 리스트로 rest에 담겨요.'
          };
        },
        () => makeChoice(
          '변수 앞에 <code>*</code>를 붙여서 나머지 값을 모아 받으면, 그 변수의 자료형은?',
          '리스트', ['튜플', '딕셔너리', '집합'],
          '<code>*rest</code>는 나머지 값들을 리스트로 모아서 받아요.',
          '대괄호로 표현되는, 값을 바꿀 수 있는 자료형이에요.'
        ),
        () => ({
          type: 'code',
          q: '변수 <code>a</code>와 <code>b</code>의 값을 임시 변수 없이 맞바꾸는 코드를 작성하세요. (a, b는 이미 정의되어 있다고 가정)',
          starter: '',
          placeholder: 'a, b = b, a',
          accept: ['a, b = b, a'],
          why: '<code>a, b = b, a</code>는 두 값을 한 번에 맞바꿔줘요.',
          hint: '등호 오른쪽에 b, a 순서로 쓰고 왼쪽에 a, b를 쓰세요.'
        }),
      ],
      boss: () => {
        const nums = Array.from({ length: randInt(4, 6) }, () => randInt(1, 30));
        const middle = nums.slice(1, -1);
        return {
          type: 'blank',
          q: `<code>first, *middle, last = [${nums.join(', ')}]</code>를 실행하면, <code>middle</code>의 값은? 대괄호 포함해서 쓰세요.`,
          prefix: '', suffix: '', accept: [`[${middle.join(', ')}]`], placeholder: '[숫자, 숫자, ...]',
          why: `<code>first</code>는 맨 앞(${nums[0]}), <code>last</code>는 맨 뒤(${nums[nums.length - 1]})를 가져가고, 그 사이 값들이 전부 <code>middle</code>에 담겨서 [${middle.join(', ')}]이 돼요.`,
          hint: '맨 앞과 맨 뒤를 first, last가 각각 가져가고, 그 사이에 남은 값들이 모두 middle에 담겨요.'
        };
      }
    },
    {
      id: 'regex',
      title: '정규표현식 기초',
      ready: true,
      summary: '문자열 속에서 원하는 패턴을 찾아내는 정규표현식(re)의 기본을 배워요.',
      goals: ['re.search로 패턴 찾기', 're.findall로 전부 찾기', '자주 쓰는 기호: \\d, +'],
      blocks: [
        {
          h: '문자열 안에서 패턴 찾기: re.search',
          html: `<p><b>정규표현식</b>은 "이런 모양의 글자를 찾아줘"라고 패턴으로 표현하는 방법이에요. <code>\\d</code>는 숫자 하나, <code>+</code>는 "바로 앞의 것이 1개 이상 연속"이라는 뜻이에요. <code>re.search(패턴, 문자열)</code>은 그 패턴과 맞는 부분을 처음 찾아줘요.</p>`,
          code: {
            label: 'search.py',
            src: `import re

text = "제 나이는 17살이에요"
m = re.search(r"\\d+", text)
print(m.group())`,
            out: `17`
          },
          after: `<div class="note"><b>참고</b> — <code>m.group()</code>은 찾은 부분을 실제 문자열로 꺼내줘요. 패턴 앞의 <code>r</code>은 "이 문자열을 있는 그대로(raw) 봐줘"라는 뜻이에요.</div>`
        },
        {
          h: '패턴에 맞는 걸 전부 찾기: re.findall',
          html: `<p><code>re.findall(패턴, 문자열)</code>은 처음 하나만 찾는 <code>search</code>와 다르게, 맞는 부분을 <b>전부</b> 리스트로 찾아줘요.</p>`,
          code: {
            label: 'findall.py',
            src: `import re

text = "사과 10개, 바나나 20개"
nums = re.findall(r"\\d+", text)
print(nums)`,
            out: `['10', '20']`
          }
        },
        {
          h: '자주 쓰는 기호 정리',
          html: `<table>
                   <tr><th>기호</th><th>뜻</th></tr>
                   <tr><td><code>\\d</code></td><td>숫자 하나</td></tr>
                   <tr><td><code>+</code></td><td>바로 앞의 것이 1개 이상 연속</td></tr>
                   <tr><td><code>*</code></td><td>바로 앞의 것이 0개 이상 연속</td></tr>
                 </table>
                 <p>그래서 <code>\\d+</code>는 "숫자가 하나 이상 연속된 부분(즉, 여러 자리 숫자)"을 뜻해요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(10, 99);
          return {
            type: 'blank',
            q: `<code>text = "제 나이는 ${n}살이에요"</code>일 때, <code>re.search(r"\\d+", text).group()</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `<code>\\d+</code>는 연속된 숫자를 찾아서 "${n}"을 찾아줘요.`,
            hint: '문자열 안에서 숫자로만 이루어진 부분을 찾아보세요.'
          };
        },
        () => {
          const a = randInt(1, 30), b = randInt(1, 30);
          return {
            type: 'blank',
            q: `<code>text = "사과 ${a}개, 바나나 ${b}개"</code>일 때, <code>re.findall(r"\\d+", text)</code>의 결과를 대괄호와 따옴표 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`['${a}', '${b}']`], placeholder: "['숫자', '숫자']",
            why: `<code>findall</code>은 맞는 부분을 전부 찾아서 ['${a}', '${b}']를 돌려줘요. (문자열로 찾아진다는 점에 주의하세요)`,
            hint: '문자열 안에서 숫자로 된 부분을 전부 순서대로 찾아보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `정규표현식 관련 기능을 쓰려면 맨 위에 어떤 모듈을 import 해야 할까요?`,
          prefix: 'import ', suffix: '', accept: ['re'], placeholder: '모듈 이름',
          why: '<code>import re</code>로 정규표현식 기능을 가져와요.',
          hint: '"정규표현식(regular expression)"의 줄임말이에요.'
        }),
        () => makeChoice(
          '패턴과 맞는 부분을 문자열 안에서 처음 하나만 찾고 싶을 때 쓰는 함수는?',
          '<code>re.search</code>', ['<code>re.findall</code>', '<code>re.split</code>', '<code>re.count</code>'],
          '<code>re.search</code>는 패턴과 맞는 부분을 맨 처음 하나만 찾아줘요.',
          '전부 다가 아니라 "하나만 찾는다"는 뜻의 함수예요.'
        ),
        () => makeChoice(
          '정규표현식에서 <code>\\d</code>가 뜻하는 것은?',
          '숫자 하나', ['글자 하나(아무거나)', '공백 하나', '알파벳 하나'],
          '<code>\\d</code>는 숫자(digit) 하나를 뜻해요.',
          '"digit(숫자)"의 첫 글자를 딴 기호예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>text</code>라는 문자열 안에서 연속된 숫자를 전부 찾아 리스트로 만드는 코드를 작성하세요. (import re는 이미 되어 있고, text는 정의되어 있다고 가정)',
          starter: '',
          placeholder: 'nums = re.findall(r"\\d+", text)',
          accept: ['nums = re.findall(r"\\d+", text)'],
          why: '<code>re.findall(r"\\d+", text)</code>는 text 안의 연속된 숫자를 전부 리스트로 찾아줘요.',
          hint: 're.findall( ) 안에 패턴 r"\\d+"와 text를 순서대로 넣으세요.'
        }),
      ],
      boss: () => {
        const a = randInt(10, 99), b = randInt(10, 99);
        const sum = a + b;
        return {
          type: 'blank',
          q: `<code>text = "사과 ${a}개, 바나나 ${b}개"</code>일 때, <code>nums = re.findall(r"\\d+", text)</code> 후 <code>sum(int(n) for n in nums)</code>을 실행하면 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sum)], placeholder: '숫자',
          why: `findall로 찾은 문자열 '${a}'와 '${b}'를 각각 int로 바꿔서 더하면 ${a} + ${b} = ${sum}이에요.`,
          hint: 'findall이 찾아준 값은 문자열이라서, 계산하려면 int()로 바꿔야 한다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'typehints',
      title: '타입 힌트',
      ready: true,
      summary: '함수의 매개변수와 반환값에 어떤 타입이 오가는지 미리 적어두는 타입 힌트를 배워요.',
      goals: ['매개변수에 타입 표시하기', '반환값 타입 표시하기(->)', '타입 힌트가 유용한 이유'],
      blocks: [
        {
          h: '매개변수와 반환값에 타입을 적어두기',
          html: `<p><code>매개변수: 타입</code>으로 어떤 값이 들어와야 하는지, <code>-> 타입</code>으로 무엇을 돌려주는지 미리 적어둘 수 있어요. 이걸 <b>타입 힌트</b>라고 해요.</p>`,
          code: {
            label: 'typehint.py',
            src: `def add(a: int, b: int) -> int:
    return a + b

print(add(3, 4))`,
            out: `7`
          },
          after: `<div class="note"><b>중요</b> — 타입 힌트는 파이썬이 실제로 <b>강제하지는 않아요</b>. <code>add("3", "4")</code>처럼 다른 타입을 넣어도 오류 없이 실행돼요(결과가 이상해질 뿐). 힌트는 어디까지나 "약속, 안내문"이에요.</div>`
        },
        {
          h: '왜 타입 힌트를 쓸까요?',
          html: `<p>타입 힌트가 있으면, 코드를 읽는 사람(또는 나중의 나 자신)이 함수를 어떻게 써야 할지 바로 알 수 있어요. 또한 에디터나 별도 도구(mypy 등)가 타입이 안 맞는 실수를 미리 알려주는 데도 도움이 돼요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>def add(a: int, b: int) -> int: return a + b</code> 함수에 <code>add(${a}, ${b})</code>라고 호출하면 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `타입 힌트는 결과 계산에 영향을 안 줘서, 그냥 ${a} + ${b} = ${a + b}예요.`,
            hint: '타입 힌트는 계산 자체와는 상관없어요. 그냥 평소처럼 더하면 돼요.'
          };
        },
        () => ({
          type: 'blank',
          q: `함수가 <code>int</code> 타입의 매개변수 <code>a</code>를 받는다고 표시하는 문법을 완성하세요.`,
          prefix: 'def show(a', suffix: '):\n    print(a)', accept: [': int'], placeholder: ': 타입',
          why: '<code>매개변수: 타입</code> 형태로 타입 힌트를 써요.',
          hint: '콜론(:) 다음에 타입 이름을 쓰세요.'
        }),
        () => ({
          type: 'blank',
          q: `함수가 <code>str</code> 타입의 값을 반환한다고 표시하는 기호를 쓰세요. (예: <code>def greet() ${'{화살표}'} str:</code>)`,
          prefix: 'def greet() ', suffix: ' str:\n    return "hi"', accept: ['->'], placeholder: '기호',
          why: '<code>-> 타입</code>으로 함수가 반환할 값의 타입을 표시해요.',
          hint: '빼기 기호(-)와 부등호(>)를 붙여 만드는 화살표 모양이에요.'
        }),
        () => makeChoice(
          '<code>def add(a: int, b: int) -> int</code>에서, <code>add("3", "4")</code>처럼 문자열을 넣으면 어떻게 될까요?',
          '오류 없이 실행된다(타입 힌트는 강제하지 않음)', ['바로 TypeError가 난다', '자동으로 int로 바뀐다', '경고 메시지가 뜨며 멈춘다'],
          '타입 힌트는 "약속"일 뿐 실제로 강제하지 않아서, 다른 타입을 넣어도 오류 없이 실행돼요(결과가 이상해질 수는 있어요).',
          '타입 힌트는 파이썬 실행 자체를 막지는 않는다는 점을 떠올려보세요.'
        ),
        () => makeChoice(
          '타입 힌트를 쓰는 주된 이유로 가장 알맞은 것은?',
          '어떤 값이 오가는지 문서처럼 알려주고, 도구가 실수를 미리 잡는 데 도움을 줘서',
          ['실행 속도가 훨씬 빨라져서', '타입이 안 맞으면 실행 자체가 안 되게 만들어서', '메모리를 아껴줘서'],
          '타입 힌트는 가독성과 도구 지원(에디터 자동완성, mypy 같은 타입 검사기)을 위한 것이에요.',
          '타입 힌트가 "강제"가 아니라 "안내"라는 점과 연결해서 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '문자열 <code>name</code>을 받아서 <code>str</code> 타입을 반환하는, 인사말을 만드는 함수 <code>greet(name: str) -> str</code>을 작성하세요. (반환값은 <code>f"안녕, {name}!"</code>)',
          starter: '',
          rows: 2,
          placeholder: 'def greet(name: str) -> str:\n    return f"안녕, {name}!"',
          accept: ['def greet(name: str) -> str:\n    return f"안녕, {name}!"'],
          why: '매개변수에 <code>: str</code>, 반환 타입에 <code>-> str</code>을 붙여서 타입 힌트를 표시해요.',
          hint: 'def greet(name: str) -> str: 다음 줄에 return f"안녕, {name}!"을 쓰세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 20), b = randInt(1, 20);
        return {
          type: 'code',
          q: `<code>a: int</code>, <code>b: int</code>를 매개변수로 받고 <code>int</code>를 반환하는(<code>-> int</code>) 함수 <code>multiply(a, b)</code>를 작성하고, <code>print(multiply(${a}, ${b}))</code>까지 포함한 전체 코드를 작성하세요.`,
          starter: '',
          rows: 4,
          placeholder: `def multiply(a: int, b: int) -> int:\n    return a * b\n\nprint(multiply(${a}, ${b}))`,
          accept: [`def multiply(a: int, b: int) -> int:\n    return a * b\nprint(multiply(${a}, ${b}))`],
          why: `${a} × ${b} = ${a * b}이 출력돼요. 타입 힌트는 계산에는 영향을 안 줘요.`,
          hint: '매개변수 각각에 : int를, 함수 이름 뒤 괄호 다음에 -> int를 붙이는 걸 잊지 마세요.'
        };
      }
    },
    {
      id: 'abstract',
      title: '추상 클래스와 다중 상속',
      ready: true,
      summary: '자식 클래스가 반드시 구현하도록 강제하는 추상 클래스와, 한 번에 여러 클래스를 물려받는 다중 상속을 배워요.',
      goals: ['abc로 추상 클래스 만들기', '@abstractmethod로 구현 강제하기', '다중 상속 기초'],
      blocks: [
        {
          h: '반드시 구현하도록 강제하기: 추상 클래스',
          html: `<p><b>추상 클래스</b>는 "이 클래스를 물려받는 자식은 반드시 이 메서드를 직접 구현해야 해"라고 강제하는 클래스예요. <code>ABC</code>를 상속받고, 강제하고 싶은 메서드 위에 <code>@abstractmethod</code>를 붙여요.</p>`,
          code: {
            label: 'abstract.py',
            src: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h
    def area(self):
        return self.w * self.h

r = Rectangle(3, 4)
print(r.area())`,
            out: `12`
          },
          after: `<div class="note"><b>기억하기</b> — <code>Rectangle</code>이 <code>area()</code>를 구현하지 않았다면, <code>Rectangle(3, 4)</code>을 만드는 순간 오류가 나요. 추상 클래스 <code>Shape</code>는 그 자체로는 객체를 만들 수도 없어요.</div>`
        },
        {
          h: '한 번에 여러 클래스를 물려받기: 다중 상속',
          html: `<p>파이썬은 <code>class 자식(부모1, 부모2):</code>처럼 <b>여러 클래스를 한 번에</b> 물려받을 수 있어요. 자식은 부모1과 부모2의 메서드를 전부 쓸 수 있게 돼요.</p>`,
          code: {
            label: 'multi_inherit.py',
            src: `class Flyer:
    def fly(self):
        return "날아요"

class Swimmer:
    def swim(self):
        return "헤엄쳐요"

class Duck(Flyer, Swimmer):
    pass

d = Duck()
print(d.fly())
print(d.swim())`,
            out: `날아요\n헤엄쳐요`
          }
        }
      ],
      quizGenerators: [
        () => {
          const w = randInt(2, 10), h = randInt(2, 10);
          return {
            type: 'blank',
            q: `<code>Rectangle</code>이 <code>area(self): return self.w * self.h</code>로 구현돼 있을 때, <code>Rectangle(${w}, ${h}).area()</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(w * h)], placeholder: '숫자',
            why: `${w} × ${h} = ${w * h}이에요.`,
            hint: '너비와 높이를 곱해보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `추상 클래스에서, 자식이 반드시 구현하도록 강제하고 싶은 메서드 위에 붙이는 데코레이터는?`,
          prefix: '', suffix: '\ndef area(self):\n    pass', accept: ['@abstractmethod'], placeholder: '@데코레이터',
          why: '<code>@abstractmethod</code>를 붙인 메서드는 자식 클래스가 반드시 구현해야 해요.',
          hint: '골뱅이(@) 뒤에 "추상 메서드"를 뜻하는 영어 단어를 붙이세요.'
        }),
        () => ({
          type: 'blank',
          q: `추상 클래스를 만들기 위해 상속받는, <code>abc</code> 모듈 안의 클래스 이름을 쓰세요.`,
          prefix: 'from abc import ', suffix: ', abstractmethod', accept: ['ABC'], placeholder: '클래스 이름',
          why: '<code>ABC</code>(Abstract Base Class)를 상속받아야 추상 클래스가 돼요.',
          hint: '"추상 기본 클래스"의 영어 약자예요. 모두 대문자예요.'
        }),
        () => makeChoice(
          '추상 메서드를 구현하지 않은 자식 클래스로 객체를 만들려고 하면 어떻게 될까요?',
          '오류(TypeError)가 난다', ['조용히 만들어진다', '자동으로 빈 메서드가 채워진다', '경고만 뜨고 계속 진행된다'],
          '추상 메서드를 구현하지 않으면 객체를 만드는 순간 <code>TypeError</code>가 나요.',
          '"강제한다"는 말의 의미를 생각해보세요 — 안 지키면 오류가 나야 진짜 강제겠죠.'
        ),
        () => ({
          type: 'code',
          q: '<code>class Flyer:</code>에 <code>fly(self)</code>가 <code>"날아요"</code>를 반환하고, <code>class Swimmer:</code>에 <code>swim(self)</code>가 <code>"헤엄쳐요"</code>를 반환해요. 이 둘을 모두 물려받는 <code>Duck</code> 클래스를 작성하세요. (내용은 <code>pass</code>만 있으면 돼요)',
          starter: '',
          placeholder: 'class Duck(Flyer, Swimmer):\n    pass',
          accept: ['class Duck(Flyer, Swimmer):\n    pass'],
          why: '<code>class Duck(Flyer, Swimmer):</code>처럼 괄호 안에 여러 부모 클래스를 쉼표로 나열하면 다중 상속이 돼요.',
          hint: 'class 이름(부모1, 부모2): 형태로 쓰고, 안에는 pass만 쓰면 돼요.'
        }),
      ],
      boss: () => {
        const r = randInt(2, 8);
        const area = Math.round(3.14 * r * r);
        return {
          type: 'blank',
          q: `<code>Shape(ABC)</code>를 상속받은 <code>Circle</code>이 <code>area(self): return 3.14 * self.r * self.r</code>로 구현돼 있을 때, <code>Circle(${r}).area()</code>를 반올림한 정수 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(area)], placeholder: '숫자',
          why: `3.14 × ${r} × ${r} = ${(3.14 * r * r).toFixed(2)}이고, 반올림하면 ${area}이에요.`,
          hint: '3.14에 반지름을 두 번 곱한 값을 반올림해보세요.'
        };
      }
    },
    {
      id: 'operators',
      title: '연산자 오버로딩',
      ready: true,
      summary: '내가 만든 클래스의 객체끼리 ==, +, < 같은 연산자로 비교하고 계산할 수 있게 만드는 방법을 배워요.',
      goals: ['__eq__로 == 동작 정하기', '__add__로 + 동작 정하기', '__lt__로 < 동작 정하기'],
      blocks: [
        {
          h: '내가 만든 객체끼리 ==으로 비교하기: __eq__',
          html: `<p>보통 <code>==</code>은 두 객체가 "완전히 같은 객체(메모리상 같은 것)"인지만 비교해요. <code>__eq__(self, other)</code>를 정의하면, "값이 같으면 같다고 본다"처럼 <b>내가 원하는 기준</b>으로 비교하게 만들 수 있어요.</p>`,
          code: {
            label: 'eq.py',
            src: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

p1 = Point(1, 2)
p2 = Point(1, 2)
print(p1 == p2)`,
            out: `True`
          }
        },
        {
          h: '내가 만든 객체끼리 +로 더하기: __add__',
          html: `<p><code>__add__(self, other)</code>를 정의하면, <code>객체1 + 객체2</code>가 무엇을 돌려줄지 직접 정할 수 있어요.</p>`,
          code: {
            label: 'add.py',
            src: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __add__(self, other):
        return Point(self.x + other.x, self.y + other.y)
    def __str__(self):
        return f"({self.x}, {self.y})"

p3 = Point(1, 2) + Point(3, 4)
print(p3)`,
            out: `(4, 6)`
          }
        },
        {
          h: '크기 비교하기: __lt__',
          html: `<p><code>__lt__(self, other)</code>(less than)를 정의하면, <code>객체1 &lt; 객체2</code>가 어떤 기준으로 비교될지 정할 수 있어요.</p>`,
          code: {
            label: 'lt.py',
            src: `class Player:
    def __init__(self, name, score):
        self.name = name
        self.score = score
    def __lt__(self, other):
        return self.score < other.score

p1 = Player("지수", 80)
p2 = Player("민준", 90)
print(p1 < p2)`,
            out: `True`
          },
          after: `<div class="note"><b>정리</b> — <code>__eq__</code>는 <code>==</code>, <code>__add__</code>는 <code>+</code>, <code>__lt__</code>는 <code>&lt;</code>와 연결돼요. 이렇게 연산자 동작을 직접 정하는 걸 "연산자 오버로딩"이라고 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const x1 = randInt(1, 10), y1 = randInt(1, 10);
          const same = Math.random() < 0.5;
          const x2 = same ? x1 : x1 + randInt(1, 5);
          const y2 = same ? y1 : y1;
          const result = x1 === x2 && y1 === y2;
          return {
            type: 'blank',
            q: `<code>Point</code>에 <code>__eq__</code>가 x, y 둘 다 같은지 비교하도록 정의돼 있을 때, <code>Point(${x1}, ${y1}) == Point(${x2}, ${y2})</code>의 결과는? (<code>True</code> 또는 <code>False</code>)`,
            prefix: '', suffix: '', accept: [String(result)], placeholder: 'True 또는 False',
            why: `x끼리(${x1}, ${x2})와 y끼리(${y1}, ${y2})가 ${result ? '둘 다 같아서 True' : '하나라도 달라서 False'}예요.`,
            hint: 'x끼리, y끼리 각각 같은지 확인해보세요. 둘 다 같아야 True예요.'
          };
        },
        () => {
          const x1 = randInt(1, 10), y1 = randInt(1, 10), x2 = randInt(1, 10), y2 = randInt(1, 10);
          return {
            type: 'blank',
            q: `<code>Point</code>에 <code>__add__</code>가 x끼리, y끼리 더해서 새 Point를 만들도록 정의돼 있고 <code>__str__</code>은 <code>f"({self.x}, {self.y})"</code>를 반환해요. <code>print(Point(${x1}, ${y1}) + Point(${x2}, ${y2}))</code>의 결과는?`,
            prefix: '', suffix: '', accept: [`(${x1 + x2}, ${y1 + y2})`], placeholder: '(숫자, 숫자)',
            why: `x끼리 더하면 ${x1} + ${x2} = ${x1 + x2}, y끼리 더하면 ${y1} + ${y2} = ${y1 + y2}이에요.`,
            hint: 'x끼리 더하고, y끼리 따로 더해보세요.'
          };
        },
        () => {
          const s1 = randInt(50, 100), s2 = randInt(50, 100);
          const result = s1 < s2;
          return {
            type: 'blank',
            q: `<code>Player</code>에 <code>__lt__</code>가 <code>self.score &lt; other.score</code>로 정의돼 있을 때, <code>Player("A", ${s1}) &lt; Player("B", ${s2})</code>의 결과는? (<code>True</code> 또는 <code>False</code>)`,
            prefix: '', suffix: '', accept: [String(result)], placeholder: 'True 또는 False',
            why: `점수 ${s1}이(가) ${s2}보다 ${result ? '작아서 True' : '작지 않아서 False'}예요.`,
            hint: '두 점수를 비교해보세요.'
          };
        },
        () => makeChoice(
          '<code>==</code> 연산자의 동작을 직접 정하고 싶을 때 정의하는 메서드는?',
          '<code>__eq__</code>', ['<code>__add__</code>', '<code>__lt__</code>', '<code>__str__</code>'],
          '<code>__eq__(self, other)</code>는 <code>==</code>의 동작을 정해요.',
          '"equal(같다)"과 관련된 이름이에요.'
        ),
        () => makeChoice(
          '<code>+</code> 연산자의 동작을 직접 정하고 싶을 때 정의하는 메서드는?',
          '<code>__add__</code>', ['<code>__eq__</code>', '<code>__lt__</code>', '<code>__init__</code>'],
          '<code>__add__(self, other)</code>는 <code>+</code>의 동작을 정해요.',
          '"더하다(add)"와 관련된 이름이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Point</code> 클래스(생성자에서 <code>self.x</code>, <code>self.y</code> 저장)에, x와 y가 둘 다 같으면 같다고 판단하는 <code>__eq__(self, other)</code> 메서드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'def __eq__(self, other):\n    return self.x == other.x and self.y == other.y',
          accept: ['def __eq__(self, other):\n    return self.x == other.x and self.y == other.y'],
          why: 'x끼리 같고 y끼리도 같을 때만 <code>True</code>를 반환해야 하니, <code>and</code>로 두 조건을 모두 확인해요.',
          hint: 'self.x == other.x and self.y == other.y를 그대로 반환해보세요.'
        }),
      ],
      boss: () => {
        const x1 = randInt(1, 10), y1 = randInt(1, 10), x2 = randInt(1, 10), y2 = randInt(1, 10);
        const sumX = x1 + x2, sumY = y1 + y2;
        const eqResult = sumX === x1 && sumY === y1;
        return {
          type: 'blank',
          q: `<code>Point</code>에 <code>__add__</code>(x, y끼리 더함)와 <code>__eq__</code>(x, y 둘 다 같은지)가 정의돼 있을 때, <code>(Point(${x1}, ${y1}) + Point(${x2}, ${y2})) == Point(${x1}, ${y1})</code>의 결과는? (<code>True</code> 또는 <code>False</code>)`,
          prefix: '', suffix: '', accept: [String(eqResult)], placeholder: 'True 또는 False',
          why: `더한 결과는 Point(${sumX}, ${sumY})이고, 이걸 Point(${x1}, ${y1})와 비교하면 ${eqResult ? '값이 같아서 True' : '값이 달라서 False'}예요.`,
          hint: '먼저 두 Point를 더한 결과의 x, y를 구한 뒤, 그걸 비교 대상과 같은지 확인해보세요.'
        };
      }
    },
    {
      id: 'iterator_protocol',
      title: '나만의 반복 가능한 객체 만들기',
      ready: true,
      summary: 'for문이 실제로 어떻게 동작하는지 이해하고, __iter__와 __next__로 직접 반복 가능한 객체를 만들어요.',
      goals: ['__iter__와 __next__', 'StopIteration', 'for문의 원리'],
      blocks: [
        {
          h: 'for문이 실제로 하는 일',
          html: `<p><code>for</code>문은 사실 대상 객체의 <code>__iter__()</code>를 한 번 부르고, 그 다음 <code>__next__()</code>를 값이 다 떨어질 때까지 계속 불러요. 이 두 메서드를 직접 만들면, 내가 원하는 방식으로 반복되는 나만의 객체를 만들 수 있어요.</p>`,
          code: {
            label: 'iterator.py',
            src: `class Countdown:
    def __init__(self, start):
        self.current = start
    def __iter__(self):
        return self
    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value

for num in Countdown(3):
    print(num)`,
            out: `3\n2\n1`
          }
        },
        {
          h: '멈추는 신호: StopIteration',
          html: `<p><code>__next__</code> 안에서 더 이상 줄 값이 없으면 <code>raise StopIteration</code>을 해요. <code>for</code>문은 이 신호를 받으면 오류로 취급하지 않고, 그냥 조용히 반복을 끝내요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const start = randInt(2, 6);
          const nums = Array.from({ length: start }, (_, i) => start - i);
          return {
            type: 'blank',
            q: `<code>Countdown</code>이 위 코드처럼 정의돼 있을 때, <code>for num in Countdown(${start}): print(num)</code>을 실행하면 순서대로 무엇이 출력될까요? 쉼표로 구분해서 쓰세요.`,
            prefix: '', suffix: '', accept: [nums.join(', '), nums.join(',')], placeholder: '숫자, 숫자, ...',
            why: `${start}부터 1까지 하나씩 줄어들며 출력돼서 ${nums.join(', ')}이 돼요.`,
            hint: `${start}부터 시작해서 1씩 줄어들다가 0이 되면 멈춰요.`
          };
        },
        () => ({
          type: 'blank',
          q: `<code>for</code>문이 반복을 시작할 때 처음으로 부르는, 보통 <code>self</code>를 그대로 반환하는 메서드는?`,
          prefix: '    def ', suffix: '(self):\n        return self', accept: ['__iter__'], placeholder: '메서드 이름',
          why: '<code>for</code>문은 반복을 시작할 때 먼저 <code>__iter__()</code>를 불러요.',
          hint: '"반복하다(iterate)"와 관련된 매직 메서드예요.'
        }),
        () => ({
          type: 'blank',
          q: `<code>for</code>문이 매번 다음 값을 꺼낼 때 부르는 메서드는?`,
          prefix: '    def ', suffix: '(self):\n        ...', accept: ['__next__'], placeholder: '메서드 이름',
          why: '<code>for</code>문은 값이 필요할 때마다 <code>__next__()</code>를 불러요.',
          hint: '"다음(next)"이라는 뜻의 단어가 들어가요.'
        }),
        () => ({
          type: 'blank',
          q: `더 이상 내놓을 값이 없을 때, <code>__next__</code> 안에서 반복을 끝내기 위해 발생시키는 예외의 이름은?`,
          prefix: 'raise ', suffix: '', accept: ['StopIteration'], placeholder: '예외 이름',
          why: '<code>StopIteration</code>이 발생하면 <code>for</code>문은 오류로 취급하지 않고 조용히 반복을 끝내요.',
          hint: '"반복을 멈춘다"는 뜻을 그대로 영어로 옮긴 이름이에요.'
        }),
        () => makeChoice(
          '<code>for x in obj:</code>가 실제로 하는 일로 알맞은 것은?',
          'obj.__iter__()를 한 번 부르고, 값이 떨어질 때까지 __next__()를 반복해서 부른다',
          ['obj의 모든 값을 한 번에 리스트로 만든다', 'obj.append()를 반복해서 부른다', '아무 메서드도 부르지 않는다'],
          '<code>for</code>문은 <code>__iter__()</code>로 반복자를 얻고, <code>StopIteration</code>이 날 때까지 <code>__next__()</code>를 계속 불러요.',
          'for문 안에서 매번 다음 값을 어떻게 꺼내오는지를 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Countdown</code> 클래스의 <code>__next__(self)</code> 메서드를 작성하세요: <code>self.current</code>가 0 이하이면 <code>StopIteration</code>을 발생시키고, 아니면 현재 값을 저장해두고 1을 줄인 뒤 저장해둔 값을 반환하세요.',
          starter: '',
          rows: 6,
          placeholder: 'def __next__(self):\n    if self.current <= 0:\n        raise StopIteration\n    value = self.current\n    self.current -= 1\n    return value',
          accept: ['def __next__(self):\n    if self.current <= 0:\n        raise StopIteration\n    value = self.current\n    self.current -= 1\n    return value'],
          why: '현재 값이 0 이하면 멈추고, 아니면 값을 기억해뒀다가 줄인 뒤 그 기억해둔 값을 반환해야 순서가 맞아요.',
          hint: 'if로 먼저 멈출 조건을 확인하고, 그 다음 value에 현재 값을 저장한 뒤 줄이고, 마지막에 value를 반환하세요.'
        }),
      ],
      boss: () => {
        const start = randInt(4, 7);
        const nums = Array.from({ length: start }, (_, i) => start - i);
        return {
          type: 'blank',
          q: `<code>Countdown(${start})</code>을 <code>for</code>문으로 순회하며 각 값을 <code>total</code>에 더한다면(<code>total = 0</code>에서 시작), 최종 <code>total</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(nums.reduce((a, b) => a + b, 0))], placeholder: '숫자',
          why: `${start}부터 1까지 다 더하면 ${nums.reduce((a, b) => a + b, 0)}이에요.`,
          hint: `${start}, ${start - 1}, ..., 1까지 순서대로 나오는 값들을 전부 더해보세요.`
        };
      }
    },
    {
      id: 'format_spec',
      title: '문자열 서식 지정',
      ready: true,
      summary: 'f-string 안에서 소수점 자리수, 0으로 채우기, 천 단위 구분 쉼표 같은 서식을 지정하는 법을 배워요.',
      goals: ['소수점 자리수 정하기(:.2f)', '0으로 자리수 채우기(:03d)', '천 단위 구분 쉼표(:,)'],
      blocks: [
        {
          h: '소수점 자리수 정하기: :.2f',
          html: `<p>f-string 안에서 <code>{값:.2f}</code>처럼 쓰면, 소수점 아래 <b>정확히 2자리</b>까지만 보여주도록 반올림해서 서식을 지정할 수 있어요.</p>`,
          code: {
            label: 'float_format.py',
            src: `pi = 3.14159
print(f"{pi:.2f}")`,
            out: `3.14`
          }
        },
        {
          h: '0으로 자리수 채우기: :03d',
          html: `<p><code>{값:03d}</code>는 정수를 <b>항상 3자리</b>로 보여주되, 자리가 모자라면 앞을 0으로 채워요. 순번이나 시각처럼 자리수를 맞춰야 하는 경우에 자주 써요.</p>`,
          code: {
            label: 'zero_pad.py',
            src: `print(f"{5:03d}")
print(f"{42:03d}")`,
            out: `005\n042`
          }
        },
        {
          h: '천 단위 구분 쉼표: :,',
          html: `<p><code>{값:,}</code>는 큰 숫자를 세 자리마다 쉼표로 끊어서 읽기 편하게 보여줘요.</p>`,
          code: {
            label: 'comma.py',
            src: `print(f"{1234567:,}")`,
            out: `1,234,567`
          },
          after: `<div class="note"><b>정리</b> — <code>:</code> 뒤에 오는 부분을 "서식 지정자"라고 불러요. <code>.2f</code>(소수점 2자리), <code>03d</code>(0으로 채운 3자리 정수), <code>,</code>(천 단위 쉼표)처럼 필요한 모양을 골라서 쓸 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const num = (randInt(100, 99999) / 1000);
          const rounded = num.toFixed(2);
          return {
            type: 'blank',
            q: `<code>x = ${num}</code>일 때, <code>f"{x:.2f}"</code>의 결과는?`,
            prefix: '', suffix: '', accept: [rounded], placeholder: '숫자.숫자숫자',
            why: `소수점 아래 2자리까지 반올림하면 ${rounded}이에요.`,
            hint: '소수점 셋째 자리에서 반올림해서 둘째 자리까지만 남겨보세요.'
          };
        },
        () => {
          const n = randInt(1, 99);
          const padded = String(n).padStart(3, '0');
          return {
            type: 'blank',
            q: `<code>f"{${n}:03d}"</code>의 결과는?`,
            prefix: '', suffix: '', accept: [padded], placeholder: '000',
            why: `${n}을 3자리로 맞추기 위해 앞을 0으로 채우면 "${padded}"가 돼요.`,
            hint: '숫자 앞에 0을 채워서 자리수를 3자리로 맞춰보세요.'
          };
        },
        () => {
          const n = randInt(10000, 9999999);
          const withCommas = n.toLocaleString('en-US');
          return {
            type: 'blank',
            q: `<code>f"{${n}:,}"</code>의 결과는?`,
            prefix: '', suffix: '', accept: [withCommas], placeholder: '1,234,567',
            why: `세 자리마다 쉼표를 넣으면 "${withCommas}"가 돼요.`,
            hint: '뒤에서부터 세 자리마다 쉼표를 넣어보세요.'
          };
        },
        () => makeChoice(
          '소수점 아래 2자리까지만 보여주고 싶을 때 쓰는 서식 지정자는?',
          '<code>:.2f</code>', ['<code>:03d</code>', '<code>:,</code>', '<code>:.2d</code>'],
          '<code>:.2f</code>는 소수(float)를 소수점 아래 2자리까지 보여줘요.',
          '소수(float)의 f와 소수점 자리수(2)가 함께 들어가요.'
        ),
        () => makeChoice(
          '정수를 항상 3자리로, 모자란 자리는 0으로 채워서 보여주고 싶을 때 쓰는 서식 지정자는?',
          '<code>:03d</code>', ['<code>:.2f</code>', '<code>:,</code>', '<code>:3f</code>'],
          '<code>:03d</code>는 정수(int, d)를 3자리로, 모자라면 0으로 채워요.',
          '0(채울 문자), 3(자리수), d(정수)가 순서대로 들어가요.'
        ),
        () => ({
          type: 'code',
          q: '변수 <code>price = 1234567</code>를 천 단위 쉼표를 넣어서 출력하는 f-string 코드를 작성하세요.',
          starter: '',
          placeholder: 'print(f"{price:,}")',
          accept: ['print(f"{price:,}")'],
          why: '<code>f"{price:,}"</code>는 숫자를 세 자리마다 쉼표로 끊어서 보여줘요.',
          hint: '중괄호 안에 변수 이름 뒤에 콜론(:)과 쉼표(,)를 붙이세요.'
        }),
      ],
      boss: () => {
        const price = randInt(1000, 999999);
        const rate = randInt(1, 20) / 100;
        const discounted = Math.round(price * (1 - rate));
        const withCommas = discounted.toLocaleString('en-US');
        return {
          type: 'blank',
          q: `<code>price = ${price}</code>에서 <code>${Math.round(rate * 100)}%</code> 할인된 가격을 반올림한 정수를 천 단위 쉼표를 넣어 <code>f"{할인가:,}"</code>로 출력하면 결과는?`,
          prefix: '', suffix: '', accept: [withCommas], placeholder: '1,234',
          why: `${price} × (1 - ${rate})를 반올림하면 ${discounted}이고, 쉼표를 넣으면 "${withCommas}"가 돼요.`,
          hint: '먼저 할인된 가격을 반올림한 뒤, 천 단위마다 쉼표를 넣어보세요.'
        };
      }
    },
    {
      id: 'testing',
      title: 'assert와 간단한 테스트 작성',
      ready: true,
      summary: '코드가 예상대로 동작하는지 직접 확인하는 assert 문과, 테스트 함수를 작성하는 습관을 배워요.',
      goals: ['assert로 조건 확인하기', '테스트 함수 작성하기', '실패 시 벌어지는 일'],
      blocks: [
        {
          h: '조건이 맞는지 확인하기: assert',
          html: `<p><code>assert 조건</code>은 그 조건이 <b>참이면 아무 일도 안 일어나고</b>, <b>거짓이면 AssertionError를 내며 멈춰요</b>. 코드가 내가 예상한 대로 동작하는지 빠르게 확인할 때 써요.</p>`,
          code: {
            label: 'assert_basic.py',
            src: `def add(a, b):
    return a + b

assert add(2, 3) == 5
print("테스트 통과!")`,
            out: `테스트 통과!`
          }
        },
        {
          h: '여러 경우를 한 번에 확인하는 테스트 함수',
          html: `<p>assert 여러 개를 함수 하나로 묶어두면, 코드를 고칠 때마다 그 함수 하나만 실행해서 "이전처럼 잘 동작하는지"를 빠르게 확인할 수 있어요.</p>`,
          code: {
            label: 'test_func.py',
            src: `def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0
    assert add(0, 0) == 0
    print("모든 테스트 통과!")

test_add()`,
            out: `모든 테스트 통과!`
          }
        },
        {
          h: '실패하면 무슨 일이 생길까요?',
          html: `<p><code>assert</code>의 조건이 거짓이면 <code>AssertionError</code>가 나면서 프로그램이 그 자리에서 멈춰요. 그래서 미리 여러 경우를 assert로 확인해두면, 나중에 코드를 고치다가 실수로 무언가 깨뜨렸을 때 바로 알아챌 수 있어요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `어떤 조건이 참인지 확인하고, 거짓이면 오류를 내며 멈추게 하는 키워드는 무엇일까요?`,
          prefix: '', suffix: ' add(2, 3) == 5', accept: ['assert'], placeholder: '키워드',
          why: '<code>assert 조건</code>은 조건이 거짓이면 <code>AssertionError</code>를 내요.',
          hint: '"확인하다, 단언하다"라는 뜻의 영어 단어예요.'
        }),
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          const wrong = Math.random() < 0.5;
          const expected = wrong ? a + b + randInt(1, 5) : a + b;
          const passes = a + b === expected;
          return {
            type: 'blank',
            q: `<code>def add(a, b): return a + b</code>가 있을 때, <code>assert add(${a}, ${b}) == ${expected}</code>를 실행하면 어떻게 될까요? (통과하면 "통과", 실패하면 "AssertionError")`,
            prefix: '', suffix: '', accept: [passes ? '통과' : 'AssertionError'], placeholder: '통과 또는 AssertionError',
            why: `add(${a}, ${b})는 ${a + b}인데, ${expected}와(과) ${passes ? '같아서 통과해요' : '달라서 AssertionError가 나요'}.`,
            hint: `add(${a}, ${b})의 실제 결과와 assert에서 비교하는 값이 같은지 확인해보세요.`
          };
        },
        () => makeChoice(
          '<code>assert</code>의 조건이 거짓일 때 발생하는 오류는?',
          '<code>AssertionError</code>', ['<code>ValueError</code>', '<code>TypeError</code>', '<code>NameError</code>'],
          '<code>assert</code>가 실패하면 <code>AssertionError</code>가 나요.',
          '"확인(assert)"이 실패했다는 뜻의 오류 이름이에요.'
        ),
        () => makeChoice(
          '여러 assert를 모아 테스트 함수로 만들어두면 좋은 이유로 가장 알맞은 것은?',
          '코드를 고친 뒤에도 실수를 빠르게 발견할 수 있어서',
          ['프로그램 실행 속도가 빨라져서', 'assert 없이는 함수가 아예 실행이 안 돼서', '코드 줄 수를 줄일 수 있어서'],
          '테스트 함수를 미리 만들어두면, 코드를 고칠 때마다 그 함수만 실행해서 기존 동작이 깨졌는지 빠르게 확인할 수 있어요.',
          '테스트를 왜 "미리" 만들어두는지 생각해보세요 — 나중에 뭔가 바뀌었을 때를 대비하는 거예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>def square(n): return n * n</code> 함수가 <code>square(4)</code>에서 <code>16</code>을 돌려주는지 확인하는 assert 문을 작성하세요.',
          starter: '',
          placeholder: 'assert square(4) == 16',
          accept: ['assert square(4) == 16'],
          why: '<code>assert 조건</code> 형태로, square(4)의 결과가 16과 같은지 확인해요.',
          hint: 'assert 뒤에 square(4) == 16을 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const cases = Array.from({ length: 3 }, () => {
          const a = randInt(-10, 10), b = randInt(-10, 10);
          return { a, b, expected: a + b };
        });
        return {
          type: 'code',
          q: `<code>def add(a, b): return a + b</code>가 이미 있다고 가정하고, 다음 세 경우를 모두 확인하는 <code>test_add()</code> 함수를 작성하세요: <code>add(${cases[0].a}, ${cases[0].b}) == ${cases[0].expected}</code>, <code>add(${cases[1].a}, ${cases[1].b}) == ${cases[1].expected}</code>, <code>add(${cases[2].a}, ${cases[2].b}) == ${cases[2].expected}</code>. 마지막 줄에 <code>print("모든 테스트 통과!")</code>도 넣으세요.`,
          starter: '',
          rows: 5,
          placeholder: `def test_add():\n    assert add(${cases[0].a}, ${cases[0].b}) == ${cases[0].expected}\n    assert add(${cases[1].a}, ${cases[1].b}) == ${cases[1].expected}\n    assert add(${cases[2].a}, ${cases[2].b}) == ${cases[2].expected}\n    print("모든 테스트 통과!")`,
          accept: [`def test_add():\n    assert add(${cases[0].a}, ${cases[0].b}) == ${cases[0].expected}\n    assert add(${cases[1].a}, ${cases[1].b}) == ${cases[1].expected}\n    assert add(${cases[2].a}, ${cases[2].b}) == ${cases[2].expected}\n    print("모든 테스트 통과!")`],
          why: '세 개의 assert가 모두 참이라서 오류 없이 "모든 테스트 통과!"까지 출력돼요.',
          hint: 'def test_add(): 안에 assert 세 줄을 차례로 쓰고, 마지막에 print("모든 테스트 통과!")를 쓰세요.'
        };
      }
    },
    {
      id: 'dataclass',
      title: 'dataclass로 간결한 클래스 만들기',
      ready: true,
      summary: '값을 담기만 하는 클래스를 훨씬 짧게 만들어주는 dataclass를 배워요. 실무에서 데이터를 주고받는 구조를 만들 때 정말 자주 써요.',
      goals: ['@dataclass로 클래스 짧게 만들기', '자동으로 생기는 기능들', '기본값 지정하기'],
      blocks: [
        {
          h: '__init__을 직접 안 써도 되는 클래스: @dataclass',
          html: `<p>값을 몇 개 담아두는 게 목적인 클래스는, <code>__init__</code>이나 <code>__repr__</code>(출력용)을 매번 손으로 쓰기 귀찮아요. <code>@dataclass</code>를 클래스 위에 붙이면, 변수 이름과 타입만 적어도 그 기능들이 <b>자동으로</b> 만들어져요.</p>`,
          code: {
            label: 'dataclass_basic.py',
            src: `from dataclasses import dataclass

@dataclass
class Student:
    name: str
    age: int

s = Student("지수", 17)
print(s.name, s.age)`,
            out: `지수 17`
          },
          after: `<div class="note"><b>비교</b> — @dataclass 없이 똑같이 만들려면 <code>def __init__(self, name, age): self.name = name; self.age = age</code>를 직접 써야 해요. @dataclass는 이걸 자동으로 해줘요.</div>`
        },
        {
          h: '자동으로 생기는 것: 값 비교와 출력',
          html: `<p>@dataclass는 <code>__init__</code>뿐 아니라, 값이 전부 같으면 <code>==</code>으로 같다고 인식하는 <code>__eq__</code>와, 내용을 보기 좋게 보여주는 <code>__repr__</code>도 자동으로 만들어줘요.</p>`,
          code: {
            label: 'dataclass_eq.py',
            src: `s1 = Student("지수", 17)
s2 = Student("지수", 17)
print(s1 == s2)
print(s1)`,
            out: `True\nStudent(name='지수', age=17)`
          }
        },
        {
          h: '기본값 지정하기',
          html: `<p>보통 클래스처럼, <code>변수: 타입 = 기본값</code> 형태로 기본값을 지정할 수 있어요.</p>`,
          code: {
            label: 'dataclass_default.py',
            src: `@dataclass
class Item:
    name: str
    price: int = 1000

i = Item("연필")
print(i.price)`,
            out: `1000`
          }
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>@dataclass</code>로 <code>name: str</code>, <code>age: int</code>를 가진 <code>Student</code>를 만들었을 때, <code>Student("${name}", ${age}).age</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(age)], placeholder: '숫자',
            why: `dataclass는 넘긴 순서대로 값을 저장해줘서, age는 ${age}예요.`,
            hint: '넘긴 값이 정의한 순서대로 각 변수에 들어가요.'
          };
        },
        () => ({
          type: 'blank',
          q: `클래스 위에 붙여서 __init__을 자동으로 만들게 하는 데코레이터를 쓰세요.`,
          prefix: '', suffix: '\nclass Student:\n    name: str\n    age: int', accept: ['@dataclass'], placeholder: '@데코레이터',
          why: '<code>@dataclass</code>는 변수 이름과 타입만으로 __init__ 등을 자동으로 만들어줘요.',
          hint: '"데이터를 담는 클래스"라는 뜻의 영어 표현을 그대로 써요.'
        }),
        () => makeChoice(
          '@dataclass가 자동으로 만들어주지 않는 것은?',
          '데이터베이스 저장 기능', ['__init__', '__eq__(값 비교)', '__repr__(출력용 모습)'],
          '@dataclass는 __init__, __eq__, __repr__ 같은 것들을 자동으로 만들어주지만, 데이터베이스 저장 같은 기능은 직접 만들어야 해요.',
          'dataclass는 "값을 담고 다루는" 기본 기능만 자동화해줘요.'
        ),
        () => {
          const price = randInt(500, 5000);
          return {
            type: 'blank',
            q: `<code>@dataclass class Item: name: str; price: int = ${price}</code>일 때, <code>Item("지우개").price</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(price)], placeholder: '숫자',
            why: `price 값을 안 넘겼으니 기본값 ${price}가 그대로 쓰여요.`,
            hint: '값을 안 넘기면 <code>= 기본값</code>으로 정해둔 값이 쓰여요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>@dataclass</code>를 이용해 <code>name: str</code>, <code>price: int</code>, 기본값이 <code>1</code>인 <code>quantity: int</code>를 가진 <code>Product</code> 클래스를 작성하세요. (import는 이미 되어 있다고 가정)',
          starter: '',
          rows: 4,
          placeholder: '@dataclass\nclass Product:\n    name: str\n    price: int\n    quantity: int = 1',
          accept: ['@dataclass\nclass Product:\n    name: str\n    price: int\n    quantity: int = 1'],
          why: '@dataclass 아래 변수와 타입을 적어주면 클래스가 완성돼요. 기본값은 <code>= 값</code>으로 붙여요.',
          hint: '@dataclass 다음 줄에 class Product:, 그 안에 세 변수를 순서대로 쓰세요.'
        }),
      ],
      boss: () => {
        const n1 = pick(['지수', '민준']);
        const n2 = pick(['지수', '민준']);
        const a1 = randInt(15, 18), a2 = n1 === n2 ? a1 : randInt(15, 18);
        const eq = n1 === n2 && a1 === a2;
        return {
          type: 'blank',
          q: `<code>@dataclass</code>로 만든 <code>Student(name: str, age: int)</code>일 때, <code>Student("${n1}", ${a1}) == Student("${n2}", ${a2})</code>의 결과는? (<code>True</code> 또는 <code>False</code>)`,
          prefix: '', suffix: '', accept: [String(eq)], placeholder: 'True 또는 False',
          why: `@dataclass는 모든 값이 같아야 True예요. 이름은 ${n1 === n2 ? '같고' : '다르고'}, 나이는 ${a1 === a2 ? '같아서' : '달라서'} 결과는 ${eq}예요.`,
          hint: '이름과 나이가 둘 다 같아야 True가 된다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'enum_type',
      title: 'Enum으로 상수 그룹 관리하기',
      ready: true,
      summary: '"몇 가지 정해진 값 중 하나"를 안전하게 표현하는 Enum을 배워요. 실무에서 상태값이나 종류를 다룰 때 자주 써요.',
      goals: ['Enum으로 상수 묶기', '값과 이름 꺼내기', '왜 그냥 문자열 대신 Enum을 쓰는지'],
      blocks: [
        {
          h: '정해진 값 중 하나만 갖는 그룹: Enum',
          html: `<p>"상태는 대기/진행중/완료 중 하나"처럼, <b>정해진 몇 가지 값 중 하나만</b> 가져야 하는 경우가 많아요. <code>Enum</code>을 상속받은 클래스로 이런 값들을 묶어서 관리할 수 있어요.</p>`,
          code: {
            label: 'enum_basic.py',
            src: `from enum import Enum

class Status(Enum):
    WAITING = 1
    IN_PROGRESS = 2
    DONE = 3

s = Status.IN_PROGRESS
print(s)
print(s.name)
print(s.value)`,
            out: `Status.IN_PROGRESS\nIN_PROGRESS\n2`
          }
        },
        {
          h: '왜 그냥 문자열이나 숫자 대신 Enum을 쓸까요?',
          html: `<p>상태를 <code>"진행중"</code> 같은 문자열로 관리하면, 어딘가에서 오타(<code>"진행중 "</code>처럼 공백이 들어가거나)를 내도 파이썬은 알아채지 못해요. <code>Enum</code>을 쓰면 <code>Status.IN_PROGRESS</code>처럼 정해진 이름만 쓸 수 있어서, 오타로 인한 실수를 미리 막아줘요.</p>`
        },
        {
          h: 'Enum끼리 비교하기',
          html: `<p>같은 Enum 값끼리는 <code>==</code>으로 바로 비교할 수 있어요.</p>`,
          code: {
            label: 'enum_compare.py',
            src: `if s == Status.IN_PROGRESS:
    print("진행 중이에요")`,
            out: `진행 중이에요`
          }
        }
      ],
      quizGenerators: [
        () => {
          const items = [['WAITING', 1], ['IN_PROGRESS', 2], ['DONE', 3]];
          const [name, value] = pick(items);
          return {
            type: 'blank',
            q: `<code>class Status(Enum): WAITING = 1; IN_PROGRESS = 2; DONE = 3</code>일 때, <code>Status.${name}.value</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(value)], placeholder: '숫자',
            why: `<code>Status.${name}</code>에 지정된 값은 ${value}예요.`,
            hint: '.value는 그 이름에 지정해둔 값을 그대로 꺼내줘요.'
          };
        },
        () => {
          const items = ['WAITING', 'IN_PROGRESS', 'DONE'];
          const name = pick(items);
          return {
            type: 'blank',
            q: `<code>s = Status.${name}</code>일 때, <code>s.name</code>의 값은? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [name], placeholder: '값',
            why: `<code>.name</code>은 그 Enum 값의 이름 그대로("${name}")를 문자열로 돌려줘요.`,
            hint: '.name은 값이 아니라 정의할 때 쓴 이름 자체를 돌려줘요.'
          };
        },
        () => ({
          type: 'blank',
          q: `정해진 몇 가지 값 중 하나만 갖는 상수 그룹을 만들 때 상속받는 클래스 이름을 쓰세요.`,
          prefix: 'from enum import ', suffix: '\n\nclass Status(Enum):\n    ...', accept: ['Enum'], placeholder: '클래스 이름',
          why: '<code>Enum</code>을 상속받아서 정해진 값들의 그룹을 만들어요.',
          hint: '"열거하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '상태값을 그냥 문자열("진행중" 등)로 관리하는 대신 Enum을 쓰는 가장 큰 이유는?',
          '오타로 인한 실수를 미리 막아줘서', ['실행 속도가 훨씬 빨라져서', '메모리를 아예 안 써서', '문자열보다 짧게 써져서'],
          'Enum은 정해진 이름만 쓸 수 있어서, 문자열 오타 같은 실수를 파이썬이 미리 잡아줄 수 있어요.',
          '"진행중"과 "진행중 "(끝에 공백)처럼 겉보기엔 비슷한 오타를 파이썬이 다른 값으로 취급한다는 문제를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Enum</code>을 상속받아 <code>LOW = 1</code>, <code>MEDIUM = 2</code>, <code>HIGH = 3</code>을 갖는 <code>Priority</code> 클래스를 작성하세요. (import는 이미 되어 있다고 가정)',
          starter: '',
          rows: 4,
          placeholder: 'class Priority(Enum):\n    LOW = 1\n    MEDIUM = 2\n    HIGH = 3',
          accept: ['class Priority(Enum):\n    LOW = 1\n    MEDIUM = 2\n    HIGH = 3'],
          why: '<code>class 이름(Enum):</code> 안에 이름 = 값 형태로 원하는 만큼 적어주면 돼요.',
          hint: 'class Priority(Enum): 다음 줄부터 이름 = 값을 세 줄에 걸쳐 쓰세요.'
        }),
      ],
      boss: () => {
        const target = pick(['WAITING', 'IN_PROGRESS', 'DONE']);
        const values = { WAITING: 1, IN_PROGRESS: 2, DONE: 3 };
        return {
          type: 'blank',
          q: `<code>class Status(Enum): WAITING = 1; IN_PROGRESS = 2; DONE = 3</code>일 때, <code>s = Status.${target}</code> 후 <code>if s == Status.${target}: print("일치")</code> else <code>print("불일치")</code>를 실행하면 무엇이 출력될까요?`,
          prefix: '', suffix: '', accept: ['일치'], placeholder: '출력될 문장',
          why: `s는 Status.${target}이고 비교 대상도 Status.${target}이라 같아서 "일치"가 출력돼요.`,
          hint: '같은 Enum 값끼리 비교하면 항상 True예요.'
        };
      }
    },
    {
      id: 'copy_deepcopy',
      title: '얕은 복사와 깊은 복사',
      ready: true,
      summary: '리스트나 딕셔너리를 "복사"할 때 실수하기 쉬운 함정과, copy/deepcopy로 안전하게 복사하는 법을 배워요.',
      goals: ['대입은 복사가 아니다', '얕은 복사(copy)', '깊은 복사(deepcopy)'],
      blocks: [
        {
          h: '대입(=)은 복사가 아니에요',
          html: `<p>리스트를 <code>b = a</code>처럼 그냥 대입하면, <code>b</code>는 새 리스트가 아니라 <b>a와 똑같은 리스트를 가리키는 또 다른 이름표</b>일 뿐이에요. 그래서 <code>b</code>를 바꾸면 <code>a</code>도 같이 바뀌어요.</p>`,
          code: {
            label: 'assign_trap.py',
            src: `a = [1, 2, 3]
b = a
b.append(4)
print(a)`,
            out: `[1, 2, 3, 4]`
          },
          after: `<div class="note"><b>주의</b> — 초보자가 정말 자주 걸리는 함정이에요. "복사했다고 생각했는데 원본까지 바뀌었어요!"라는 버그는 대부분 여기서 나와요.</div>`
        },
        {
          h: '진짜 복사하기: copy',
          html: `<p><code>리스트.copy()</code>(또는 <code>list(리스트)</code>)를 쓰면, <b>내용이 같은 새 리스트</b>가 만들어져요. 이걸 복사하면 원본에는 영향을 안 줘요.</p>`,
          code: {
            label: 'shallow_copy.py',
            src: `a = [1, 2, 3]
b = a.copy()
b.append(4)
print(a)
print(b)`,
            out: `[1, 2, 3]\n[1, 2, 3, 4]`
          }
        },
        {
          h: '리스트 안에 리스트가 있다면: deepcopy',
          html: `<p>리스트 <b>안에 또 리스트</b>가 들어있는 경우, <code>.copy()</code>는 바깥 리스트만 새로 만들고 <b>안쪽 리스트는 여전히 같은 걸 공유</b>해요(얕은 복사). 안쪽까지 완전히 새로 복사하려면 <code>copy.deepcopy()</code>를 써야 해요.</p>`,
          code: {
            label: 'deepcopy.py',
            src: `import copy

a = [[1, 2], [3, 4]]
b = copy.deepcopy(a)
b[0].append(99)
print(a)
print(b)`,
            out: `[[1, 2], [3, 4]]\n[[1, 2, 99], [3, 4]]`
          }
        }
      ],
      quizGenerators: [
        () => {
          const nums = Array.from({ length: 3 }, () => randInt(1, 20));
          const added = randInt(21, 30);
          return {
            type: 'blank',
            q: `<code>a = [${nums.join(', ')}]</code>, <code>b = a</code> 후 <code>b.append(${added})</code>를 실행하면, <code>a</code>의 값은? 대괄호 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`[${[...nums, added].join(', ')}]`], placeholder: '[숫자, ...]',
            why: `<code>b = a</code>는 복사가 아니라서, b를 바꾸면 a도 똑같이 바뀌어서 [${[...nums, added].join(', ')}]이 돼요.`,
            hint: 'b = a는 같은 리스트를 가리키는 또 다른 이름표일 뿐이라는 걸 떠올려보세요.'
          };
        },
        () => {
          const nums = Array.from({ length: 3 }, () => randInt(1, 20));
          const added = randInt(21, 30);
          return {
            type: 'blank',
            q: `<code>a = [${nums.join(', ')}]</code>, <code>b = a.copy()</code> 후 <code>b.append(${added})</code>를 실행하면, <code>a</code>의 값은? 대괄호 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`[${nums.join(', ')}]`], placeholder: '[숫자, ...]',
            why: `<code>.copy()</code>는 새 리스트를 만들어서, b를 바꿔도 a는 그대로 [${nums.join(', ')}]예요.`,
            hint: '.copy()로 만든 건 완전히 다른 리스트라서, 서로 영향을 안 줘요.'
          };
        },
        () => makeChoice(
          '<code>a = [[1, 2], [3, 4]]</code>를 <code>.copy()</code>(얕은 복사)로 복사한 뒤, 복사본의 <b>안쪽 리스트</b>를 바꾸면?',
          '원본의 안쪽 리스트도 같이 바뀐다', ['원본은 절대 안 바뀐다', '오류가 난다', '복사본만 사라진다'],
          '얕은 복사는 바깥 리스트만 새로 만들고, 안쪽 리스트는 여전히 원본과 공유해요.',
          '"얕은" 복사라는 이름처럼, 겉만 새로 만들고 안쪽은 그대로 공유한다는 뜻이에요.'
        ),
        () => ({
          type: 'blank',
          q: `리스트 안에 리스트가 있어도 완전히 독립적인 복사본을 만들고 싶을 때 쓰는, <code>copy</code> 모듈의 함수 이름을 쓰세요.`,
          prefix: 'import copy\nb = copy.', suffix: '(a)', accept: ['deepcopy'], placeholder: '함수 이름',
          why: '<code>copy.deepcopy(a)</code>는 안쪽까지 전부 새로 복사해줘요.',
          hint: '"깊은(deep)" + "복사(copy)"를 합친 이름이에요.'
        }),
        () => ({
          type: 'code',
          q: '리스트 <code>a</code>의 내용이 같은, 완전히 새로운 리스트 <code>b</code>를 만드는 코드를 작성하세요. (a는 이미 정의되어 있다고 가정, 안쪽에 리스트는 없다고 가정)',
          starter: '',
          placeholder: 'b = a.copy()',
          accept: ['b = a.copy()', 'b = list(a)'],
          why: '<code>.copy()</code>(또는 <code>list(a)</code>)는 내용이 같은 새 리스트를 만들어줘요.',
          hint: 'a.copy()를 b에 대입해보세요.'
        }),
      ],
      boss: () => {
        const outer = [[randInt(1, 10), randInt(1, 10)], [randInt(1, 10), randInt(1, 10)]];
        const added = randInt(90, 99);
        const expectedA = JSON.parse(JSON.stringify(outer));
        return {
          type: 'blank',
          q: `<code>a = ${JSON.stringify(outer)}</code>를 <code>copy.deepcopy</code>로 <code>b</code>에 복사한 뒤, <code>b[0].append(${added})</code>를 실행했어요. 이때 <code>a</code>의 값은? (그대로, 대괄호 포함)`,
          prefix: '', suffix: '', accept: [JSON.stringify(expectedA)], placeholder: '[[숫자, 숫자], [숫자, 숫자]]',
          why: `deepcopy는 안쪽 리스트까지 완전히 새로 복사해서, b를 바꿔도 a는 전혀 안 바뀌고 그대로 ${JSON.stringify(expectedA)}예요.`,
          hint: 'deepcopy는 안쪽 리스트까지 독립적인 복사본이라서, 원본은 절대 영향을 안 받아요.'
        };
      }
    },
    {
      id: 'logging_mod',
      title: 'print 대신 logging 쓰기',
      ready: true,
      summary: '실무에서는 print() 대신, 중요도를 구분할 수 있는 logging 모듈로 기록을 남겨요. 그 기본기를 배워요.',
      goals: ['logging의 기본 사용법', '로그 레벨(debug/info/warning/error)', 'print 대신 logging을 쓰는 이유'],
      blocks: [
        {
          h: '기록을 남기는 표준 방법: logging',
          html: `<p><code>print()</code>는 화면에 그냥 보여주기만 하지만, <code>logging</code>은 "언제, 얼마나 중요한 일이 있었는지"까지 함께 기록해요. 실무 프로그램은 대부분 print 대신 logging을 써요.</p>`,
          code: {
            label: 'logging_basic.py',
            src: `import logging

logging.warning("메모리가 부족할 수 있어요")`,
            out: `WARNING:root:메모리가 부족할 수 있어요`
          }
        },
        {
          h: '중요도에 따라 나뉘는 로그 레벨',
          html: `<p>로그는 중요도 순서로 <code>DEBUG</code> &lt; <code>INFO</code> &lt; <code>WARNING</code> &lt; <code>ERROR</code> &lt; <code>CRITICAL</code> 단계가 있어요. 각각 <code>logging.debug()</code>, <code>logging.info()</code> 같은 함수로 남겨요.</p>
                 <table>
                   <tr><th>레벨</th><th>언제 쓰나요</th></tr>
                   <tr><td><code>INFO</code></td><td>정상적으로 잘 진행되고 있다는 기록</td></tr>
                   <tr><td><code>WARNING</code></td><td>문제가 될 수도 있지만 아직 멈출 정도는 아님</td></tr>
                   <tr><td><code>ERROR</code></td><td>실제로 오류가 나서 그 작업이 실패함</td></tr>
                 </table>`
        },
        {
          h: '왜 print 대신 logging을 쓸까요?',
          html: `<p><code>logging</code>은 <b>중요도별로 걸러서 볼 수 있고</b>(예: "ERROR 이상만 보기"), <b>시간</b>도 자동으로 기록해주고, 나중에 파일로 저장하도록 설정만 바꾸면 코드 수정 없이 그대로 쓸 수 있어요. <code>print</code>는 이런 걸 하나도 못 해줘요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const level = pick(['warning', 'error', 'info']);
          const levelUpper = level.toUpperCase();
          const msg = pick(['서버 응답 지연', '파일을 찾을 수 없어요', '접속자 수 증가']);
          return {
            type: 'blank',
            q: `<code>logging.${level}("${msg}")</code>를 실행하면 어떤 형태로 출력될까요? (예: <code>WARNING:root:메시지</code> 형태)`,
            prefix: '', suffix: '', accept: [`${levelUpper}:root:${msg}`], placeholder: 'LEVEL:root:메시지',
            why: `<code>logging.${level}(...)</code>은 "${levelUpper}:root:${msg}" 형태로 레벨과 함께 출력돼요.`,
            hint: '레벨 이름을 대문자로, 그 뒤에 :root:와 메시지가 이어져요.'
          };
        },
        () => ({
          type: 'blank',
          q: `<code>import</code>해야 하는, 기록(로그)을 남기는 표준 모듈의 이름을 쓰세요.`,
          prefix: 'import ', suffix: '', accept: ['logging'], placeholder: '모듈 이름',
          why: '<code>import logging</code>으로 로그 관련 기능을 가져와요.',
          hint: '"기록을 남기다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '로그 레벨 중 "문제가 될 수도 있지만 아직 프로그램이 멈출 정도는 아닌" 상황에 쓰는 레벨은?',
          '<code>WARNING</code>', ['<code>DEBUG</code>', '<code>ERROR</code>', '<code>CRITICAL</code>'],
          '<code>WARNING</code>은 "주의가 필요하지만 아직 심각하진 않은" 상황에 써요.',
          '"경고"라는 뜻의 영어 단어예요.'
        ),
        () => makeChoice(
          '실무에서 <code>print()</code> 대신 <code>logging</code>을 쓰는 주된 이유로 알맞은 것은?',
          '중요도별로 걸러 보고, 시간 기록과 파일 저장 같은 설정을 코드 수정 없이 바꿀 수 있어서',
          ['logging이 print보다 실행 속도가 훨씬 빨라서', 'print는 한글을 출력할 수 없어서', 'logging은 오류가 있어도 프로그램이 멈추지 않게 해줘서'],
          'logging은 중요도 구분, 시간 기록, 출력 위치(화면/파일) 설정 등을 유연하게 다룰 수 있어서 실무에서 표준으로 써요.',
          'print는 그냥 화면에 보여주기만 한다는 점과 비교해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"결제에 실패했어요"</code>라는 오류 로그를 남기는 코드를 작성하세요. (심각한 문제이니 error 레벨로, import는 이미 되어 있다고 가정)',
          starter: '',
          placeholder: 'logging.error("결제에 실패했어요")',
          accept: ['logging.error("결제에 실패했어요")'],
          why: '실패한 오류 상황이니 <code>logging.error(메시지)</code>가 알맞아요.',
          hint: 'logging.error( ) 안에 메시지를 그대로 넣으세요.'
        }),
      ],
      boss: () => {
        const scenario = pick([
          { msg: '결제 서버 연결 실패', level: 'error' },
          { msg: '캐시 적중률이 낮아지고 있어요', level: 'warning' },
          { msg: '사용자 로그인 성공', level: 'info' },
        ]);
        return {
          type: 'blank',
          q: `"${scenario.msg}"라는 상황을 로그로 남기려고 해요. 이 상황에 가장 알맞은 레벨로 남긴 <code>logging.${'{레벨}'}("${scenario.msg}")</code> 호출에서, 빈칸에 들어갈 레벨 이름(소문자)은?`,
          prefix: 'logging.', suffix: `("${scenario.msg}")`, accept: [scenario.level], placeholder: '레벨 이름',
          why: `이 상황은 ${scenario.level === 'error' ? '실제로 실패한 오류라서 error가' : scenario.level === 'warning' ? '아직 심각하진 않지만 주의가 필요해서 warning이' : '정상적으로 잘 진행된 상황이라서 info가'} 알맞아요.`,
          hint: '상황이 실패인지, 주의가 필요한 수준인지, 정상 진행인지를 먼저 판단해보세요.'
        };
      }
    },
    {
      id: 'context_manager',
      title: '나만의 컨텍스트 매니저 만들기',
      ready: true,
      summary: '"시작과 마무리를 항상 짝지어 실행"해주는 with문의 원리를 이해하고, 직접 만드는 법을 배워요.',
      goals: ['with문의 원리', '__enter__와 __exit__', '@contextmanager로 간단히 만들기'],
      blocks: [
        {
          h: 'with문이 실제로 하는 일',
          html: `<p><code>with open(...) as f:</code>처럼 쓰면, 블록이 끝날 때 파일이 자동으로 닫혔죠? 이건 <code>__enter__</code>(시작할 때)와 <code>__exit__</code>(끝날 때 항상 실행)를 가진 클래스라면 무엇이든 똑같이 쓸 수 있어요.</p>`,
          code: {
            label: 'context_class.py',
            src: `class Timer:
    def __enter__(self):
        print("시작!")
        return self
    def __exit__(self, *args):
        print("종료!")

with Timer():
    print("작업 중...")`,
            out: `시작!\n작업 중...\n종료!`
          },
          after: `<div class="note"><b>핵심</b> — <code>__exit__</code>는 블록 안에서 오류가 나든 안 나든 <b>항상</b> 실행돼요. try/finally의 finally와 비슷한 역할이에요.</div>`
        },
        {
          h: '함수로 더 간단하게: @contextmanager',
          html: `<p>클래스를 통째로 안 만들어도, <code>@contextmanager</code>를 붙인 함수로 더 짧게 만들 수 있어요. <code>yield</code> <b>이전</b>은 시작할 때, <b>이후</b>는 끝날 때 실행돼요.</p>`,
          code: {
            label: 'context_func.py',
            src: `from contextlib import contextmanager

@contextmanager
def timer():
    print("시작!")
    yield
    print("종료!")

with timer():
    print("작업 중...")`,
            out: `시작!\n작업 중...\n종료!`
          }
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>with</code>문과 함께 쓰일 클래스가 "시작할 때" 실행되도록 정의하는 메서드는?',
          '<code>__enter__</code>', ['<code>__exit__</code>', '<code>__init__</code>', '<code>__start__</code>'],
          '<code>__enter__</code>는 <code>with</code> 블록에 들어갈 때 실행돼요.',
          '"들어가다(enter)"라는 뜻의 영어 단어예요.'
        ),
        () => makeChoice(
          '<code>with</code>문 블록이 끝날 때(오류가 나든 안 나든) 항상 실행되는 메서드는?',
          '<code>__exit__</code>', ['<code>__enter__</code>', '<code>__del__</code>', '<code>__close__</code>'],
          '<code>__exit__</code>는 with 블록을 벗어날 때 항상 실행돼요.',
          '"나가다(exit)"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>class Timer:</code>에 <code>__enter__</code>가 <code>"시작!"</code>을, <code>__exit__</code>가 <code>"종료!"</code>를 출력하도록 정의돼 있을 때, <code>with Timer(): print("작업 중...")</code>를 실행하면 두 번째 줄에 무엇이 출력될까요? (따옴표 없이)`,
          prefix: '', suffix: '', accept: ['작업 중...'], placeholder: '출력될 문장',
          why: '순서대로 "시작!"(enter) → "작업 중..."(블록 안) → "종료!"(exit)가 출력돼서, 두 번째는 "작업 중..."이에요.',
          hint: '__enter__ → 블록 안의 코드 → __exit__ 순서로 실행된다는 걸 떠올려보세요.'
        }),
        () => ({
          type: 'blank',
          q: `함수를 컨텍스트 매니저로 간단히 만들 때 붙이는 데코레이터를 쓰세요. (from contextlib import ${'{이것}'})`,
          prefix: '@', suffix: '\ndef timer():\n    print("시작!")\n    yield\n    print("종료!")', accept: ['contextmanager'], placeholder: '데코레이터 이름',
          why: '<code>@contextmanager</code>를 붙이면, <code>yield</code> 앞뒤로 시작/종료 코드를 나누는 함수를 컨텍스트 매니저로 쓸 수 있어요.',
          hint: '"컨텍스트(문맥) 매니저"를 그대로 영어로 합친 이름이에요.'
        }),
        () => ({
          type: 'code',
          q: '<code>@contextmanager</code>가 붙은 <code>timer()</code> 함수를 작성하세요: <code>yield</code> 전에 <code>"시작!"</code>을, 후에 <code>"종료!"</code>를 출력해요. (import는 이미 되어 있다고 가정)',
          starter: '',
          rows: 4,
          placeholder: '@contextmanager\ndef timer():\n    print("시작!")\n    yield\n    print("종료!")',
          accept: ['@contextmanager\ndef timer():\n    print("시작!")\n    yield\n    print("종료!")'],
          why: '<code>yield</code>를 기준으로 앞이 시작 코드, 뒤가 종료 코드가 돼요.',
          hint: '@contextmanager 다음 줄에 함수를 정의하고, print("시작!"), yield, print("종료!") 순서로 쓰세요.'
        }),
      ],
      boss: () => {
        const label = pick(['DB 연결', '파일 잠금', '타이머']);
        return {
          type: 'code',
          q: `"${label}"이라는 작업을 나타내는 컨텍스트 매니저를 <code>@contextmanager</code>가 붙은 <code>work()</code> 함수로 작성하세요: <code>yield</code> 전에 <code>f"${label} 시작"</code>을, 후에 <code>f"${label} 종료"</code>를 출력해요. 그리고 <code>with work(): print("처리 중")</code>까지 포함한 전체 코드를 작성하세요.`,
          starter: '',
          rows: 8,
          placeholder: `@contextmanager\ndef work():\n    print(f"${label} 시작")\n    yield\n    print(f"${label} 종료")\n\nwith work():\n    print("처리 중")`,
          accept: [`@contextmanager\ndef work():\n    print(f"${label} 시작")\n    yield\n    print(f"${label} 종료")\nwith work():\n    print("처리 중")`],
          why: `실행하면 "${label} 시작" → "처리 중" → "${label} 종료" 순서로 출력돼요.`,
          hint: '@contextmanager 함수를 먼저 정의하고, 그 아래에 with work(): 블록을 이어서 쓰세요.'
        };
      }
    },
    {
      id: 'async_basics',
      title: '비동기 프로그래밍 기초',
      ready: true,
      summary: '기다리는 시간이 있는 작업을 여러 개 동시에 처리하는 async/await의 기본 원리를 배워요. 실무 웹서버에서 정말 많이 써요.',
      goals: ['async def로 코루틴 만들기', 'await로 기다리기', 'asyncio.gather로 동시에 실행하기'],
      blocks: [
        {
          h: '기다리는 동안 멈춰있지 않게: async / await',
          html: `<p>네트워크 응답을 기다리거나 파일을 읽는 작업은 "기다리는 시간"이 있어요. 보통 함수는 그 시간 동안 완전히 멈춰있지만, <code>async def</code>로 만든 함수(코루틴)는 <code>await</code>에서 <b>잠깐 양보</b>하고, 그 사이 다른 작업을 진행할 수 있어요.</p>`,
          code: {
            label: 'async_basic.py',
            src: `import asyncio

async def say_hello():
    print("시작")
    await asyncio.sleep(1)
    print("1초 후 완료")

asyncio.run(say_hello())`,
            out: `시작\n1초 후 완료`
          },
          after: `<div class="note"><b>참고</b> — 여기서 <code>asyncio.sleep(1)</code>은 "네트워크 응답을 1초간 기다린다"를 흉내 낸 거예요. 실제로는 API 호출, DB 조회 같은 대기 작업이 이 자리에 들어가요.</div>`
        },
        {
          h: '여러 개를 동시에 기다리기: asyncio.gather',
          html: `<p><code>await task1(); await task2()</code>처럼 하나씩 순서대로 기다리면 시간이 그대로 더해져요. <code>asyncio.gather(task1(), task2())</code>로 <b>동시에</b> 시작시키면, 둘 다 기다리는 중에 서로 방해 안 하고 동시에 진행돼서 <b>더 오래 걸리는 쪽 시간만</b> 걸려요.</p>`,
          code: {
            label: 'gather.py',
            src: `import asyncio

async def task(name, delay):
    await asyncio.sleep(delay)
    print(f"{name} 완료")

async def main():
    await asyncio.gather(task("A", 1), task("B", 2))

asyncio.run(main())`,
            out: `A 완료\nB 완료`
          },
          after: `<div class="note"><b>속도 차이</b> — A(1초)와 B(2초)를 <b>순서대로</b> 기다렸다면 총 3초가 걸리지만, <code>gather</code>로 <b>동시에</b> 실행하면 둘 중 더 오래 걸리는 2초만 걸려요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `비동기 함수(코루틴)를 만들 때, <code>def</code> 앞에 붙이는 키워드를 쓰세요.`,
          prefix: '', suffix: ' def say_hello():\n    ...', accept: ['async'], placeholder: '키워드',
          why: '<code>async def</code>로 비동기 함수(코루틴)를 만들어요.',
          hint: '"비동기(asynchronous)"의 줄임말이에요.'
        }),
        () => ({
          type: 'blank',
          q: `코루틴 안에서, 시간이 걸리는 작업을 "기다리며 양보"할 때 앞에 붙이는 키워드를 쓰세요.`,
          prefix: '', suffix: ' asyncio.sleep(1)', accept: ['await'], placeholder: '키워드',
          why: '<code>await</code>는 그 작업이 끝날 때까지 기다리되, 그 사이 다른 코드가 실행될 수 있게 양보해요.',
          hint: '"기다리다"라는 뜻의 영어 단어예요.'
        }),
        () => {
          const d1 = randInt(1, 3), d2 = randInt(1, 3);
          const sequential = d1 + d2;
          const concurrent = Math.max(d1, d2);
          return {
            type: 'blank',
            q: `작업 A(${d1}초), 작업 B(${d2}초)를 <code>asyncio.gather</code>로 <b>동시에</b> 실행하면, 총 몇 초쯤 걸릴까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(concurrent)], placeholder: '숫자',
            why: `동시에 실행하면 더 오래 걸리는 쪽인 ${concurrent}초만 걸려요. (순서대로 했다면 ${sequential}초가 걸렸을 거예요)`,
            hint: '동시에 실행하면, 둘 중 더 오래 걸리는 작업의 시간만큼만 기다리면 돼요.'
          };
        },
        () => makeChoice(
          '비동기 프로그래밍이 실무에서 유용한 대표적인 이유는?',
          '네트워크 응답을 기다리는 여러 작업을 동시에 처리해서 전체 시간을 줄일 수 있어서',
          ['계산 자체가 항상 더 빨라져서', '코드 줄 수가 항상 줄어들어서', '오류가 절대 안 나게 해줘서'],
          '비동기는 "기다리는 시간"이 있는 작업(네트워크, 파일 I/O 등)을 여러 개 동시에 진행시켜서 전체 대기 시간을 줄여줘요.',
          '순수 계산이 아니라 "기다림"이 있는 작업에서 이점이 있다는 걸 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"작업 완료"</code>를 출력하기 전에 1초를 기다리는 비동기 함수 <code>work()</code>를 작성하세요. (import asyncio는 이미 되어 있다고 가정)',
          starter: '',
          rows: 3,
          placeholder: 'async def work():\n    await asyncio.sleep(1)\n    print("작업 완료")',
          accept: ['async def work():\n    await asyncio.sleep(1)\n    print("작업 완료")'],
          why: '<code>async def</code>로 코루틴을 만들고, <code>await asyncio.sleep(1)</code>로 1초를 기다린 뒤 출력해요.',
          hint: 'async def work(): 다음 줄에 await asyncio.sleep(1), 그 다음 줄에 print를 쓰세요.'
        }),
      ],
      boss: () => {
        const delays = [randInt(1, 4), randInt(1, 4), randInt(1, 4)];
        const total = Math.max(...delays);
        return {
          type: 'blank',
          q: `세 작업의 대기 시간이 각각 ${delays.join('초, ')}초일 때, <code>asyncio.gather</code>로 셋을 동시에 실행하면 총 몇 초쯤 걸릴까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
          why: `동시에 실행하면 셋 중 가장 오래 걸리는 ${total}초만 걸려요.`,
          hint: '여러 작업을 동시에 실행하면, 가장 오래 걸리는 작업의 시간이 전체 시간이 돼요.'
        };
      }
    },
    {
      id: 'requests_lib',
      title: 'HTTP 요청 다루기',
      ready: true,
      summary: 'requests 라이브러리로 인터넷 너머의 서버에서 데이터를 가져오는, 실무에서 정말 자주 쓰는 기능을 배워요.',
      goals: ['requests.get으로 데이터 가져오기', '상태 코드 확인하기', 'JSON 응답 다루기'],
      blocks: [
        {
          h: '웹에서 데이터를 가져오기: requests.get',
          html: `<p><code>requests</code>는 다른 서버에 "이 데이터 좀 줘"라고 요청하는 라이브러리예요. <code>requests.get(주소)</code>로 요청을 보내면, 그 결과를 응답(response) 객체로 돌려받아요.</p>`,
          code: {
            label: 'requests_get.py',
            src: `import requests

response = requests.get("https://api.example.com/users/1")
print(response.status_code)`,
            out: `200`
          }
        },
        {
          h: '상태 코드로 성공/실패 확인하기',
          html: `<p><code>status_code</code>는 요청이 어떻게 됐는지 알려주는 숫자예요.</p>
                 <table>
                   <tr><th>코드</th><th>뜻</th></tr>
                   <tr><td><code>200</code></td><td>성공</td></tr>
                   <tr><td><code>404</code></td><td>요청한 게 없음(Not Found)</td></tr>
                   <tr><td><code>500</code></td><td>서버 쪽 오류</td></tr>
                 </table>`
        },
        {
          h: 'JSON 응답을 파이썬 값으로 바로 바꾸기',
          html: `<p>많은 API는 JSON 형식으로 응답해요. <code>response.json()</code>을 쓰면, 그 JSON을 바로 파이썬 딕셔너리로 바꿔서 편하게 쓸 수 있어요.</p>`,
          code: {
            label: 'requests_json.py',
            src: `data = response.json()
print(data["name"])`,
            out: `지수`
          },
          after: `<div class="note"><b>기억하기</b> — <code>response.text</code>는 응답을 그냥 글자로, <code>response.json()</code>은 JSON을 파이썬 값(주로 딕셔너리)으로 바꿔줘요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `주소로 GET 요청을 보내는, requests 라이브러리의 함수 이름을 쓰세요.`,
          prefix: 'response = requests.', suffix: '("https://api.example.com")', accept: ['get'], placeholder: '함수 이름',
          why: '<code>requests.get(주소)</code>로 GET 요청을 보내요.',
          hint: '데이터를 "가져온다"는 뜻의 HTTP 방식이에요.'
        }),
        () => makeChoice(
          '요청이 성공했음을 나타내는 상태 코드는?',
          '<code>200</code>', ['<code>404</code>', '<code>500</code>', '<code>0</code>'],
          '<code>200</code>은 요청이 성공했다는 뜻이에요.',
          '가장 기본적인 "성공" 코드예요.'
        ),
        () => makeChoice(
          '요청한 자원을 서버에서 찾을 수 없을 때의 상태 코드는?',
          '<code>404</code>', ['<code>200</code>', '<code>500</code>', '<code>301</code>'],
          '<code>404</code>는 "Not Found", 요청한 게 없다는 뜻이에요.',
          '흔히 "페이지를 찾을 수 없습니다"라는 오류 화면에서 보는 그 숫자예요.'
        ),
        () => ({
          type: 'blank',
          q: `응답 <code>response</code>가 JSON 형식일 때, 이를 파이썬 딕셔너리로 바꿔주는 메서드를 쓰세요.`,
          prefix: 'data = response.', suffix: '()', accept: ['json'], placeholder: '메서드 이름',
          why: '<code>response.json()</code>은 JSON 응답을 파이썬 값으로 바꿔줘요.',
          hint: '응답 형식의 이름을 그대로 쓰는 메서드예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>"https://api.example.com/ping"</code>에 GET 요청을 보내고, 상태 코드가 200이면 <code>"성공"</code>을, 아니면 <code>"실패"</code>를 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'response = requests.get("https://api.example.com/ping")\nif response.status_code == 200:\n    print("성공")\nelse:\n    print("실패")',
          accept: ['response = requests.get("https://api.example.com/ping")\nif response.status_code == 200:\n    print("성공")\nelse:\n    print("실패")'],
          why: 'requests.get()으로 요청을 보낸 뒤, status_code가 200인지 확인해서 성공/실패를 구분해요.',
          hint: 'requests.get(주소)로 응답을 받고, if response.status_code == 200:으로 확인하세요.'
        }),
      ],
      boss: () => {
        const code = pick([200, 404, 500]);
        const label = code === 200 ? '성공' : code === 404 ? '찾을 수 없음' : '서버 오류';
        return {
          type: 'blank',
          q: `<code>response.status_code</code>가 <code>${code}</code>일 때, <code>if response.status_code == 200: print("성공") elif response.status_code == 404: print("찾을 수 없음") else: print("서버 오류")</code>를 실행하면 무엇이 출력될까요?`,
          prefix: '', suffix: '', accept: [label], placeholder: '출력될 문장',
          why: `상태 코드 ${code}는 "${label}"에 해당해요.`,
          hint: '200, 404, 그 외의 경우로 나눠서 어디에 해당하는지 확인해보세요.'
        };
      }
    },
    {
      id: 'sqlite_db',
      title: 'sqlite3로 실제 DB 다루기',
      ready: true,
      summary: '파이썬에서 실제 데이터베이스 파일에 연결해서, SQL로 데이터를 저장하고 조회하는 법을 배워요.',
      goals: ['sqlite3.connect로 DB 연결하기', 'execute로 SQL 실행하기', 'fetchall로 결과 가져오기', 'SQL 인젝션 막기'],
      blocks: [
        {
          h: '파이썬에서 DB 파일에 연결하기',
          html: `<p><code>sqlite3</code>는 파이썬에 기본으로 들어있는, 파일 하나가 곧 데이터베이스가 되는 가벼운 DB예요. <code>connect()</code>로 연결하고, <code>cursor()</code>로 SQL을 실행할 준비를 해요.</p>`,
          code: {
            label: 'connect.py',
            src: `import sqlite3

conn = sqlite3.connect("students.db")
cursor = conn.cursor()`
          }
        },
        {
          h: '테이블 만들고 데이터 넣기',
          html: `<p><code>cursor.execute(SQL문)</code>로 SQL을 실행해요. 값을 안전하게 넣을 땐 문자열을 직접 이어붙이지 말고, <code>?</code> 자리표시자와 값을 따로 넘겨요. <code>conn.commit()</code>을 해야 실제로 파일에 저장돼요.</p>`,
          code: {
            label: 'insert.py',
            src: `cursor.execute("CREATE TABLE students (name TEXT, age INTEGER)")
cursor.execute("INSERT INTO students VALUES (?, ?)", ("지수", 17))
conn.commit()`
          },
          after: `<div class="note"><b>중요(보안)</b> — 값을 <code>f"INSERT INTO students VALUES ('{name}', {age})"</code>처럼 문자열로 직접 이어붙이면, 이름에 이상한 SQL 코드가 들어있을 때 DB가 공격당할 수 있어요(SQL 인젝션). <code>?</code> 자리표시자를 쓰면 값이 안전하게 처리돼서 이 문제를 막아줘요.</div>`
        },
        {
          h: '데이터 조회하기: fetchall',
          html: `<p><code>SELECT</code>로 조회한 뒤 <code>cursor.fetchall()</code>을 부르면, 결과를 튜플들의 리스트로 가져올 수 있어요.</p>`,
          code: {
            label: 'select.py',
            src: `cursor.execute("SELECT * FROM students")
print(cursor.fetchall())`,
            out: `[('지수', 17)]`
          }
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>"students.db"</code> 파일에 연결하는 코드를 완성하세요.`,
          prefix: 'conn = sqlite3.', suffix: '("students.db")', accept: ['connect'], placeholder: '함수 이름',
          why: '<code>sqlite3.connect(파일이름)</code>으로 DB 파일에 연결해요.',
          hint: '"연결하다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'blank',
          q: `커서로 SQL문을 실행하는 메서드 이름을 쓰세요.`,
          prefix: 'cursor.', suffix: '("SELECT * FROM students")', accept: ['execute'], placeholder: '메서드 이름',
          why: '<code>cursor.execute(SQL문)</code>으로 SQL을 실행해요.',
          hint: '"실행하다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'blank',
          q: `<code>SELECT</code> 실행 후, 결과를 전부 리스트로 가져오는 메서드 이름을 쓰세요.`,
          prefix: 'cursor.execute("SELECT * FROM students")\nrows = cursor.', suffix: '()', accept: ['fetchall'], placeholder: '메서드 이름',
          why: '<code>cursor.fetchall()</code>은 조회 결과를 전부 가져와요.',
          hint: '"전부(all) 가져오다(fetch)"라는 뜻이 합쳐진 이름이에요.'
        }),
        () => makeChoice(
          '값을 SQL문에 안전하게 넣기 위해 쓰는 자리표시자는?',
          '<code>?</code>', ['<code>%s</code>', '<code>{}</code>', '<code>$</code>'],
          'sqlite3에서는 <code>?</code>를 자리표시자로 쓰고, 실제 값은 따로 튜플로 넘겨요.',
          '물음표 하나가 값 하나의 자리를 나타내요.'
        ),
        () => makeChoice(
          '문자열을 직접 이어붙여서 SQL문을 만들면 위험한 이유는?',
          '악의적인 값이 SQL 코드처럼 실행될 수 있어서(SQL 인젝션)',
          ['실행 속도가 느려져서', '한글이 깨져서', 'DB 파일 용량이 커져서'],
          '문자열을 직접 이어붙이면, 입력값 안에 SQL 명령어가 숨어있을 때 그대로 실행될 위험이 있어요. 이를 SQL 인젝션이라고 해요.',
          '입력값 안에 예상치 못한 SQL 코드가 섞여 들어갈 수 있다는 점을 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>students</code> 테이블에 이름 <code>"민준"</code>, 나이 <code>16</code>을 <code>?</code> 자리표시자를 이용해 안전하게 추가하고 커밋하는 코드를 작성하세요. (cursor, conn은 이미 준비되어 있다고 가정)',
          starter: '',
          rows: 2,
          placeholder: 'cursor.execute("INSERT INTO students VALUES (?, ?)", ("민준", 16))\nconn.commit()',
          accept: ['cursor.execute("INSERT INTO students VALUES (?, ?)", ("민준", 16))\nconn.commit()'],
          why: '<code>?</code> 자리표시자에 실제 값을 튜플로 넘기고, <code>commit()</code>으로 저장을 확정해요.',
          hint: 'execute의 두 번째 인자로 ("민준", 16) 튜플을 넘기고, 그 다음 줄에 conn.commit()을 쓰세요.'
        }),
      ],
      boss: () => {
        const rows = shuffle([['지수', 17], ['민준', 16], ['서연', 18]]).slice(0, 2);
        const rowsStr = `[${rows.map(([n, a]) => `('${n}', ${a})`).join(', ')}]`;
        return {
          type: 'blank',
          q: `<code>students</code> 테이블에 ${rows.map(([n, a]) => `("${n}", ${a})`).join(', ')} 순서로 두 행을 넣고 커밋한 뒤, <code>cursor.execute("SELECT * FROM students"); print(cursor.fetchall())</code>을 실행하면 결과는? (넣은 순서 그대로)`,
          prefix: '', suffix: '', accept: [rowsStr], placeholder: "[('이름', 나이), ...]",
          why: `넣은 순서대로 조회되어서 ${rowsStr}이 출력돼요.`,
          hint: '넣은 순서 그대로, 각 행이 튜플로 리스트에 담겨서 나와요.'
        };
      }
    },
    {
      id: 'venv_pip',
      title: '가상환경과 패키지 관리',
      ready: true,
      summary: '프로젝트마다 독립된 파이썬 환경을 만드는 가상환경과, 패키지를 설치·공유하는 pip을 배워요. 실무 프로젝트의 기본기예요.',
      goals: ['가상환경이 왜 필요한지', 'venv로 가상환경 만들기', 'pip으로 패키지 설치하기', 'requirements.txt로 공유하기'],
      blocks: [
        {
          h: '프로젝트마다 독립된 환경이 필요한 이유',
          html: `<p>프로젝트 A는 <code>requests 2.0</code>이 필요하고, 프로젝트 B는 <code>requests 3.0</code>이 필요하다면? 패키지를 컴퓨터 전체에 하나만 설치하면 둘 중 하나는 항상 버전이 안 맞아요. <b>가상환경</b>은 프로젝트마다 <b>독립된 패키지 설치 공간</b>을 만들어서 이 문제를 해결해요.</p>`
        },
        {
          h: '가상환경 만들고 켜기',
          html: `<p><code>python -m venv venv</code>로 <code>venv</code>라는 이름의 가상환경 폴더를 만들어요. 그 다음 그 환경을 "켜야"(활성화) 그 안에 패키지를 설치할 수 있어요.</p>`,
          code: {
            label: 'terminal',
            lang: 'bash',
            src: `python -m venv venv
# Windows
venv\\Scripts\\activate
# macOS/Linux
source venv/bin/activate`
          }
        },
        {
          h: '패키지 설치와 공유: pip, requirements.txt',
          html: `<p><code>pip install 패키지이름</code>으로 패키지를 설치해요. 지금 설치된 패키지 목록을 <code>pip freeze &gt; requirements.txt</code>로 파일에 저장해두면, 다른 컴퓨터에서도 <code>pip install -r requirements.txt</code> 한 번으로 <b>똑같은 환경을 그대로</b> 재현할 수 있어요.</p>`,
          code: {
            label: 'terminal',
            lang: 'bash',
            src: `pip install requests
pip freeze > requirements.txt
pip install -r requirements.txt`
          },
          after: `<div class="note"><b>기억하기</b> — <code>requirements.txt</code>는 "이 프로젝트를 돌리려면 이 패키지들이 이 버전으로 필요해요"라는 목록이에요. 실무 프로젝트에는 거의 항상 이 파일이 들어있어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>venv</code>라는 이름의 가상환경을 새로 만드는 명령어를 쓰세요.`,
          prefix: '', suffix: ' venv', accept: ['python -m venv'], placeholder: '명령어',
          why: '<code>python -m venv venv</code>로 venv라는 이름의 가상환경 폴더를 만들어요.',
          hint: 'python -m 뒤에 가상환경 도구 이름을 쓰세요.'
        }),
        () => {
          const pkg = pick(['requests', 'numpy', 'flask']);
          return {
            type: 'blank',
            q: `<code>${pkg}</code> 패키지를 설치하는 명령어를 쓰세요.`,
            prefix: '', suffix: ` ${pkg}`, accept: [`pip install`], placeholder: '명령어',
            why: `<code>pip install ${pkg}</code>로 패키지를 설치해요.`,
            hint: 'pip 뒤에 "설치하다"라는 뜻의 영어 단어를 쓰세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `지금 설치된 패키지 목록을 <code>requirements.txt</code> 파일로 저장하는 명령어를 쓰세요.`,
          prefix: '', suffix: ' > requirements.txt', accept: ['pip freeze'], placeholder: '명령어',
          why: '<code>pip freeze &gt; requirements.txt</code>는 현재 설치된 패키지 목록을 파일로 저장해요.',
          hint: '"목록을 그대로 얼려서 저장한다"는 느낌의 pip 명령어예요.'
        }),
        () => ({
          type: 'blank',
          q: `<code>requirements.txt</code>에 적힌 패키지들을 한 번에 설치하는 명령어를 쓰세요.`,
          prefix: '', suffix: ' -r requirements.txt', accept: ['pip install'], placeholder: '명령어',
          why: '<code>pip install -r requirements.txt</code>는 그 파일에 적힌 패키지들을 전부 설치해요.',
          hint: '패키지 설치 명령어에 -r 옵션과 파일 이름을 붙여요.'
        }),
        () => makeChoice(
          '가상환경을 쓰는 가장 큰 이유는?',
          '프로젝트마다 독립된 패키지 버전을 유지해서 서로 충돌하지 않게 하려고',
          ['파이썬 실행 속도를 높이려고', '코드를 자동으로 압축하려고', '인터넷 없이도 코드를 실행하려고'],
          '가상환경은 프로젝트별로 패키지 설치 공간을 분리해서, 버전 충돌 문제를 막아줘요.',
          '여러 프로젝트가 서로 다른 버전의 같은 패키지를 필요로 할 때를 생각해보세요.'
        ),
      ],
      boss: () => ({
        type: 'blank',
        q: `새 컴퓨터에서 어떤 프로젝트를 받아서, <code>requirements.txt</code>에 적힌 패키지들을 전부 설치하려고 해요. 어떤 명령어를 실행해야 할까요?`,
        prefix: '', suffix: '', accept: ['pip install -r requirements.txt'], placeholder: '명령어',
        why: '<code>pip install -r requirements.txt</code>는 그 파일에 적힌 패키지 전부를 그대로 설치해줘요.',
        hint: 'pip install에 -r 옵션과 파일 이름을 함께 써보세요.'
      })
    },
    {
      id: 'functools_itertools',
      title: 'functools와 itertools',
      ready: true,
      summary: '리스트를 하나의 값으로 누적 계산하는 reduce, 결과를 기억해두는 lru_cache, 조합을 만드는 itertools를 배워요.',
      goals: ['functools.reduce로 누적 계산', 'functools.lru_cache로 캐싱', 'itertools.combinations으로 조합 만들기'],
      blocks: [
        {
          h: '리스트를 하나의 값으로 누적 계산하기: reduce',
          html: `<p><code>reduce(함수, 리스트)</code>는 리스트의 값들을 <b>왼쪽부터 순서대로</b> 함수에 넣어 계속 누적시켜서, 결국 값 하나로 만들어줘요.</p>`,
          code: {
            label: 'reduce.py',
            src: `from functools import reduce

nums = [1, 2, 3, 4]
total = reduce(lambda acc, n: acc + n, nums)
print(total)`,
            out: `10`
          }
        },
        {
          h: '느린 함수의 결과를 기억해두기: lru_cache',
          html: `<p><code>@lru_cache</code>를 붙이면, 함수가 <b>같은 입력값으로 다시 불릴 때</b> 처음 계산한 결과를 그대로 재사용해서 다시 계산 안 해요. 재귀 함수처럼 같은 계산이 반복되는 경우 훨씬 빨라져요.</p>`,
          code: {
            label: 'lru_cache.py',
            src: `from functools import lru_cache

@lru_cache
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(10))`,
            out: `55`
          },
          after: `<div class="note"><b>왜 빨라질까요?</b> — 캐시가 없으면 <code>fib(10)</code>을 구하는 동안 <code>fib(5)</code> 같은 같은 계산을 몇 번이고 반복해요. <code>lru_cache</code>는 한 번 계산한 값을 저장해뒀다가 재사용해요.</div>`
        },
        {
          h: '가능한 조합을 모두 만들기: itertools.combinations',
          html: `<p><code>combinations(리스트, n)</code>은 리스트에서 <b>순서 상관없이</b> <code>n</code>개를 고르는 모든 조합을 만들어줘요.</p>`,
          code: {
            label: 'combinations.py',
            src: `from itertools import combinations

items = ["A", "B", "C"]
for pair in combinations(items, 2):
    print(pair)`,
            out: `('A', 'B')\n('A', 'C')\n('B', 'C')`
          }
        }
      ],
      quizGenerators: [
        () => {
          const nums = Array.from({ length: randInt(3, 5) }, () => randInt(1, 20));
          const total = nums.reduce((a, b) => a + b, 0);
          return {
            type: 'blank',
            q: `<code>reduce(lambda acc, n: acc + n, [${nums.join(', ')}])</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
            why: `왼쪽부터 순서대로 다 더하면 ${total}이에요.`,
            hint: '리스트의 모든 값을 순서대로 누적해서 더해보세요.'
          };
        },
        () => {
          const nums = Array.from({ length: randInt(3, 4) }, () => randInt(1, 5));
          const product = nums.reduce((a, b) => a * b, 1);
          return {
            type: 'blank',
            q: `<code>reduce(lambda acc, n: acc * n, [${nums.join(', ')}])</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(product)], placeholder: '숫자',
            why: `왼쪽부터 순서대로 다 곱하면 ${product}이에요.`,
            hint: '이번엔 더하기가 아니라 곱하기로 누적된다는 점에 주의하세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `함수의 계산 결과를 같은 입력값에 대해 저장해뒀다가 재사용하게 해주는 데코레이터를 쓰세요.`,
          prefix: 'from functools import lru_cache\n\n@', suffix: '\ndef fib(n):\n    ...', accept: ['lru_cache'], placeholder: '데코레이터 이름',
          why: '<code>@lru_cache</code>는 같은 입력에 대한 계산 결과를 기억해뒀다가 재사용해요.',
          hint: '"최근에 적게 쓰인 것부터 캐시"라는 뜻의 영어 줄임말이에요.'
        }),
        () => {
          const items = shuffle(['A', 'B', 'C', 'D']).slice(0, randInt(3, 4));
          const n = 2;
          const pairs = [];
          for (let i = 0; i < items.length; i++) {
            for (let j = i + 1; j < items.length; j++) pairs.push(`('${items[i]}', '${items[j]}')`);
          }
          return {
            type: 'blank',
            q: `<code>list(combinations([${items.map(v => `'${v}'`).join(', ')}], 2))</code>로 만들어지는 조합의 <b>개수</b>는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(pairs.length)], placeholder: '숫자',
            why: `${items.length}개 중 2개를 순서 상관없이 고르는 조합은 ${pairs.length}가지예요.`,
            hint: `${items.length}개 중 2개를 고르는 방법의 수를 세어보세요. (순서는 상관없어요)`
          };
        },
        () => ({
          type: 'code',
          q: '<code>functools.reduce</code>와 람다를 이용해, 리스트 <code>nums</code>의 모든 값을 곱한 값을 구하는 코드를 작성하세요. (from functools import reduce는 이미 되어 있다고 가정)',
          starter: '',
          placeholder: 'result = reduce(lambda acc, n: acc * n, nums)',
          accept: ['result = reduce(lambda acc, n: acc * n, nums)'],
          why: '<code>reduce(lambda acc, n: acc * n, nums)</code>는 nums의 모든 값을 왼쪽부터 순서대로 곱해줘요.',
          hint: 'reduce의 lambda 안에서 더하기(+) 대신 곱하기(*)를 쓰세요.'
        }),
      ],
      boss: () => {
        const items = shuffle(['1번', '2번', '3번', '4번', '5번']).slice(0, randInt(3, 5));
        const n = 3;
        let count = 0;
        if (items.length >= n) {
          const choose = (arr, k) => {
            if (k === 0) return 1;
            if (arr.length < k) return 0;
            return choose(arr.slice(1), k - 1) + choose(arr.slice(1), k);
          };
          count = choose(items, n);
        }
        return {
          type: 'blank',
          q: `<code>items</code>에 서로 다른 값이 ${items.length}개 있을 때, <code>list(combinations(items, 3))</code>로 만들어지는 조합의 개수는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(count)], placeholder: '숫자',
          why: `${items.length}개 중 3개를 순서 상관없이 고르는 조합은 ${count}가지예요.`,
          hint: `${items.length}개 중 3개를 고르는 경우의 수를 세어보세요.`
        };
      }
    },
    {
      id: 'pathlib',
      title: '경로와 파일을 객체로 다루기: pathlib',
      ready: true,
      summary: '파일 경로를 문자열이 아니라 객체로 다뤄서, 실수 없이 경로를 조합하고 파일 정보를 다루는 법을 배워요.',
      goals: ['Path 객체 만들기', '/ 로 경로 이어붙이기', '파일 이름과 확장자 꺼내기'],
      blocks: [
        {
          h: '경로를 문자열이 아니라 객체로: Path',
          html: `<p>경로를 <code>"data/students.txt"</code>처럼 그냥 문자열로 다루면, 운영체제마다 구분자(<code>/</code> vs <code>\\</code>)가 달라 실수하기 쉬워요. <code>pathlib.Path</code>는 경로를 <b>객체</b>로 다뤄서 이런 문제를 없애줘요.</p>`,
          code: {
            label: 'path_basic.py',
            src: `from pathlib import Path

p = Path("data/students.txt")
print(p.name)
print(p.suffix)`,
            out: `students.txt\n.txt`
          }
        },
        {
          h: '경로 이어붙이기: /',
          html: `<p>문자열을 <code>+</code>로 이어붙이는 대신, <code>Path</code> 객체는 <code>/</code> 연산자로 경로를 자연스럽게 이어붙일 수 있어요.</p>`,
          code: {
            label: 'path_join.py',
            src: `folder = Path("data")
file_path = folder / "students.txt"
print(file_path)`,
            out: `data/students.txt`
          }
        },
        {
          h: '파일이 있는지 확인하기',
          html: `<p><code>.exists()</code>로 그 경로에 실제 파일(또는 폴더)이 있는지 확인할 수 있어요.</p>`,
          code: {
            label: 'path_exists.py',
            src: `p = Path("data/students.txt")
print(p.exists())`,
            out: `True`
          },
          after: `<div class="note"><b>기억하기</b> — <code>.name</code>은 파일 이름(확장자 포함), <code>.suffix</code>는 확장자만, <code>.stem</code>은 확장자를 뺀 이름을 돌려줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const stem = pick(['report', 'scores', 'notes', 'log']);
          const ext = pick(['.txt', '.csv', '.json']);
          return {
            type: 'blank',
            q: `<code>p = Path("data/${stem}${ext}")</code>일 때, <code>p.suffix</code>의 값은? (점 포함)`,
            prefix: '', suffix: '', accept: [ext], placeholder: '.확장자',
            why: `<code>.suffix</code>는 확장자만 꺼내주니 "${ext}"예요.`,
            hint: '파일 이름 중 마지막 점(.) 뒤 부분이 확장자예요.'
          };
        },
        () => {
          const stem = pick(['report', 'scores', 'notes']);
          const ext = pick(['.txt', '.csv']);
          return {
            type: 'blank',
            q: `<code>p = Path("data/${stem}${ext}")</code>일 때, <code>p.name</code>의 값은?`,
            prefix: '', suffix: '', accept: [`${stem}${ext}`], placeholder: '파일이름.확장자',
            why: `<code>.name</code>은 경로 중 파일 이름 부분(확장자 포함)인 "${stem}${ext}"를 돌려줘요.`,
            hint: '경로에서 맨 마지막 부분(폴더 이름 제외)이 .name이에요.'
          };
        },
        () => ({
          type: 'blank',
          q: `<code>Path</code>끼리 경로를 이어붙일 때 쓰는 연산자를 쓰세요.`,
          prefix: 'folder ', suffix: ' "students.txt"', accept: ['/'], placeholder: '기호',
          why: '<code>폴더 / "파일이름"</code>처럼 슬래시로 경로를 이어붙여요.',
          hint: '나눗셈에도 쓰이는 그 기호예요.'
        }),
        () => makeChoice(
          '경로를 <code>Path</code> 객체로 다루면 좋은 점은?',
          '운영체제별 경로 구분자 차이를 신경 안 써도 돼서', ['파일 크기가 항상 줄어들어서', '문자열보다 항상 짧아서', '한글 경로를 못 쓰게 막아줘서'],
          '<code>Path</code>는 윈도우(\\)와 macOS/리눅스(/)의 경로 구분자 차이를 자동으로 처리해줘요.',
          '문자열로 직접 경로를 이어붙일 때 생기는 운영체제별 차이를 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Path("data")</code> 폴더 안의 <code>"scores.csv"</code> 파일 경로를 만들어 출력하는 코드를 작성하세요. (from pathlib import Path는 이미 되어 있다고 가정)',
          starter: '',
          placeholder: 'print(Path("data") / "scores.csv")',
          accept: ['print(Path("data") / "scores.csv")'],
          why: '<code>Path("data") / "scores.csv"</code>는 "data/scores.csv" 경로를 만들어줘요.',
          hint: 'Path("data") 뒤에 슬래시(/)와 파일 이름을 이어붙이세요.'
        }),
      ],
      boss: () => {
        const stem = pick(['final_report', 'weekly_log', 'user_data']);
        const ext = pick(['.txt', '.json', '.csv']);
        return {
          type: 'blank',
          q: `<code>p = Path("archive/2026") / "${stem}${ext}"</code>일 때, <code>p.name</code>과 <code>p.suffix</code>를 "이름, 확장자" 형태로 쓰세요.`,
          prefix: '', suffix: '', accept: [`${stem}${ext}, ${ext}`], placeholder: '이름, .확장자',
          why: `합쳐진 경로의 파일 이름은 "${stem}${ext}", 확장자는 "${ext}"예요.`,
          hint: '경로를 이어붙여도 .name과 .suffix는 맨 마지막 파일 이름 기준으로 똑같이 동작해요.'
        };
      }
    },
    {
      id: 'csv_files',
      title: 'CSV 파일 다루기',
      ready: true,
      summary: '엑셀에서도 열리는 표 형태 텍스트 파일인 CSV를 파이썬으로 읽고 쓰는 법을 배워요. 실무 데이터 교환에 정말 자주 써요.',
      goals: ['csv.reader로 읽기', 'csv.writer로 쓰기', 'DictReader로 컬럼 이름으로 읽기'],
      blocks: [
        {
          h: '엑셀에서도 열리는 파일: CSV',
          html: `<p><b>CSV</b>(Comma-Separated Values)는 표 데이터를 "쉼표로 값을 구분한 줄"들로 저장하는 아주 단순한 텍스트 형식이에요. 엑셀, 구글 스프레드시트 등 거의 모든 프로그램이 CSV를 읽고 쓸 수 있어서 데이터 교환에 널리 쓰여요.</p>`
        },
        {
          h: '한 줄씩 읽기: csv.reader',
          html: `<p><code>csv.reader(파일)</code>은 파일을 한 줄씩, 쉼표로 나뉜 값들의 리스트로 읽어줘요.</p>`,
          code: {
            label: 'csv_read.py',
            src: `import csv

with open("students.csv") as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)`,
            out: `['name', 'age']\n['지수', '17']\n['민준', '16']`
          }
        },
        {
          h: '컬럼 이름으로 편하게 읽기: DictReader',
          html: `<p><code>csv.DictReader</code>는 첫 줄을 컬럼 이름(헤더)으로 보고, 각 줄을 <b>딕셔너리</b>로 만들어줘서 <code>row["name"]</code>처럼 이름으로 바로 꺼낼 수 있어요.</p>`,
          code: {
            label: 'csv_dictread.py',
            src: `with open("students.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"])`,
            out: `지수\n민준`
          },
          after: `<div class="note"><b>참고</b> — CSV 파일을 쓸 때는 <code>csv.writer(f).writerow([...])</code>로 한 줄씩 쓰면 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `CSV 파일을 한 줄씩 리스트로 읽어주는, csv 모듈의 함수 이름을 쓰세요.`,
          prefix: 'reader = csv.', suffix: '(f)', accept: ['reader'], placeholder: '함수 이름',
          why: '<code>csv.reader(f)</code>는 파일을 한 줄씩 리스트로 읽어줘요.',
          hint: '"읽는 도구"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'blank',
          q: `첫 줄을 헤더로 보고 각 줄을 딕셔너리로 읽어주는 클래스 이름을 쓰세요.`,
          prefix: 'reader = csv.', suffix: '(f)', accept: ['DictReader'], placeholder: '클래스 이름',
          why: '<code>csv.DictReader(f)</code>는 첫 줄을 키로 써서 각 줄을 딕셔너리로 만들어줘요.',
          hint: '"딕셔너리로 읽는다"는 뜻이 이름에 그대로 들어가요.'
        }),
        () => {
          const rows = [['지수', '17'], ['민준', '16'], ['서연', '18']];
          const idx = randInt(0, 2);
          return {
            type: 'blank',
            q: `CSV 파일의 두 번째 줄부터 순서대로 ${rows.map(r => `[${r.map(v => `'${v}'`).join(', ')}]`).join(', ')}이고, <code>csv.reader</code>로 각 줄을 <code>print(row)</code>했을 때, ${idx + 1}번째로 출력된 값은?`,
            prefix: '', suffix: '', accept: [`[${rows[idx].map(v => `'${v}'`).join(', ')}]`], placeholder: "['값', '값']",
            why: `${idx + 1}번째 줄은 [${rows[idx].map(v => `'${v}'`).join(', ')}]예요.`,
            hint: '순서대로 한 줄씩 리스트로 나온다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          'CSV 파일을 여러 프로그램(엑셀 등)에서 함께 쓸 수 있는 이유는?',
          '그냥 쉼표로 구분된 텍스트라서 어떤 프로그램이든 읽을 수 있어서',
          ['파이썬 전용 형식이라서', '실행 속도가 가장 빨라서', '이미지도 저장할 수 있어서'],
          'CSV는 특정 언어·프로그램 전용이 아니라 그냥 텍스트 형식이라, 거의 모든 프로그램이 읽고 쓸 수 있어요.',
          'JSON을 여러 언어가 함께 쓰는 이유와 비슷한 이유예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>reader = csv.DictReader(f)</code>로 읽은 각 줄에서 <code>"age"</code> 컬럼 값을 출력하는 for문을 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'for row in reader:\n    print(row["age"])',
          accept: ['for row in reader:\n    print(row["age"])'],
          why: 'DictReader로 읽은 각 row는 딕셔너리라서 <code>row["age"]</code>로 값을 꺼낼 수 있어요.',
          hint: 'for row in reader: 다음 줄에 print(row["age"])를 쓰세요.'
        }),
      ],
      boss: () => {
        const rows = [['name', 'score'], ['지수', '90'], ['민준', '85'], ['서연', '95']];
        const total = rows.slice(1).reduce((a, r) => a + Number(r[1]), 0);
        return {
          type: 'blank',
          q: `CSV 헤더가 <code>name, score</code>이고 데이터 줄이 ${rows.slice(1).map(r => r.join(',')).join(' / ')}일 때, <code>DictReader</code>로 각 줄의 <code>int(row["score"])</code>를 전부 더하면 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
          why: `점수들을 다 더하면 ${total}이에요.`,
          hint: '각 줄의 score 값을 정수로 바꿔서 전부 더해보세요.'
        };
      }
    },
    {
      id: 'argparse_cli',
      title: '커맨드라인 도구 만들기: argparse',
      ready: true,
      summary: '터미널에서 옵션과 함께 실행할 수 있는 파이썬 프로그램을 만드는 argparse의 기본을 배워요.',
      goals: ['add_argument로 인자 정의하기', 'parse_args로 값 받기', '--옵션과 필수 인자'],
      blocks: [
        {
          h: '터미널에서 값을 받아오기: argparse',
          html: `<p>실무 스크립트는 <code>python script.py --name 지수</code>처럼, 실행할 때 옵션을 받아 동작을 바꾸는 경우가 많아요. <code>argparse</code>는 이런 커맨드라인 인자를 쉽게 정의하고 읽을 수 있게 해줘요.</p>`,
          code: {
            label: 'argparse_basic.py',
            src: `import argparse

parser = argparse.ArgumentParser()
parser.add_argument("--name", required=True)
args = parser.parse_args()

print(f"안녕, {args.name}!")`
          },
          after: `<div class="note"><b>실행 예시</b> — 터미널에서 <code>python argparse_basic.py --name 지수</code>라고 실행하면 <code>안녕, 지수!</code>가 출력돼요.</div>`
        },
        {
          h: '기본값과 타입 지정하기',
          html: `<p><code>default</code>로 값을 안 넘겼을 때 쓸 기본값을, <code>type</code>으로 어떤 타입으로 바꿔 받을지 지정할 수 있어요.</p>`,
          code: {
            label: 'argparse_default.py',
            src: `parser.add_argument("--age", type=int, default=17)
args = parser.parse_args()
print(args.age)`
          },
          after: `<div class="note"><b>기억하기</b> — 커맨드라인 인자는 원래 전부 문자열로 들어와서, 숫자로 쓰려면 <code>type=int</code>처럼 지정해줘야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `새로운 커맨드라인 옵션을 정의하는 메서드 이름을 쓰세요.`,
          prefix: 'parser.', suffix: '("--name")', accept: ['add_argument'], placeholder: '메서드 이름',
          why: '<code>parser.add_argument("--name")</code>로 새 옵션을 정의해요.',
          hint: '"인자를 추가한다"는 뜻의 영어 표현이에요.'
        }),
        () => ({
          type: 'blank',
          q: `터미널에서 실제로 넘겨받은 값들을 읽어오는 메서드 이름을 쓰세요.`,
          prefix: 'args = parser.', suffix: '()', accept: ['parse_args'], placeholder: '메서드 이름',
          why: '<code>parser.parse_args()</code>로 실제 넘겨받은 값을 읽어와요.',
          hint: '"인자를 해석(parse)한다"는 뜻이에요.'
        }),
        () => {
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>parser.add_argument("--age", type=int, default=17)</code>일 때, 터미널에서 <code>--age ${age}</code>를 넘기면 <code>args.age</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(age)], placeholder: '숫자',
            why: `직접 값을 넘겼으니 기본값 대신 넘긴 ${age}가 쓰이고, type=int라서 정수로 저장돼요.`,
            hint: '값을 직접 넘기면 기본값 대신 그 값이 쓰여요.'
          };
        },
        () => makeChoice(
          '<code>--age</code>를 넘기지 않고 실행하면, <code>parser.add_argument("--age", type=int, default=17)</code>일 때 <code>args.age</code>는?',
          '17', ['0', 'None', '오류가 난다'],
          '값을 안 넘기면 <code>default=17</code>이 그대로 쓰여요.',
          '기본값(default)이 정확히 뭘 위한 옵션인지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>--score</code>라는, 정수 타입이고 기본값이 <code>0</code>인 옵션을 추가하는 코드를 작성하세요. (parser는 이미 만들어져 있다고 가정)',
          starter: '',
          placeholder: 'parser.add_argument("--score", type=int, default=0)',
          accept: ['parser.add_argument("--score", type=int, default=0)'],
          why: '<code>add_argument("--score", type=int, default=0)</code>는 정수 타입, 기본값 0인 옵션을 만들어요.',
          hint: 'add_argument에 이름, type=int, default=0을 순서대로 넣으세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>--name</code>(필수), <code>--age</code>(type=int, default=17)가 정의돼 있을 때, 터미널에서 <code>python script.py --name ${name} --age ${age}</code>로 실행하고 <code>print(f"{args.name}({args.age})")</code>를 실행하면 결과는?`,
          prefix: '', suffix: '', accept: [`${name}(${age})`], placeholder: '이름(나이)',
          why: `넘긴 값 그대로 name은 "${name}", age는 ${age}가 저장돼서 "${name}(${age})"가 출력돼요.`,
          hint: '넘긴 옵션 값들이 그대로 args에 저장된다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'threading_multiprocessing',
      title: 'threading과 multiprocessing',
      ready: true,
      summary: '여러 작업을 동시에 실행하는 두 가지 방법, threading과 multiprocessing의 차이와 GIL 개념을 배워요.',
      goals: ['threading으로 동시에 실행하기', 'GIL이 뭔지', 'multiprocessing으로 진짜 병렬 처리하기'],
      blocks: [
        {
          h: '여러 작업을 동시에: threading',
          html: `<p><code>threading.Thread</code>는 여러 함수를 "동시에" 실행하는 것처럼 보이게 해줘요. 파일 읽기, 네트워크 요청처럼 <b>기다리는 시간이 있는 작업</b>에 특히 효과적이에요.</p>`,
          code: {
            label: 'threading_basic.py',
            src: `import threading

def work(name):
    print(f"{name} 작업 시작")

t1 = threading.Thread(target=work, args=("A",))
t2 = threading.Thread(target=work, args=("B",))
t1.start()
t2.start()
t1.join()
t2.join()`,
          },
          after: `<div class="note"><b>참고</b> — <code>.start()</code>는 스레드를 실행시키고, <code>.join()</code>은 그 스레드가 끝날 때까지 기다려요.</div>`
        },
        {
          h: '왜 계산이 많은 작업은 threading으로 안 빨라질까요: GIL',
          html: `<p>파이썬(CPython)에는 <b>GIL</b>(Global Interpreter Lock)이라는 게 있어서, 한 순간에 <b>딱 하나의 스레드만</b> 파이썬 코드를 실행할 수 있어요. 그래서 순수 계산 작업은 스레드를 여러 개 만들어도 실제로 동시에 빨라지지 않아요. 반면 네트워크·파일 대기처럼 "기다리는" 작업은 그 사이 다른 스레드가 실행될 수 있어서 threading이 효과적이에요.</p>`
        },
        {
          h: '진짜 동시에 계산하고 싶다면: multiprocessing',
          html: `<p><code>multiprocessing</code>은 아예 <b>별도의 파이썬 프로세스</b>를 여러 개 띄워서, 각자 자기만의 GIL을 가지고 진짜로 동시에 계산해요. 계산량이 많은 작업(이미지 처리, 대량 데이터 연산 등)에는 threading 대신 이걸 써요.</p>`,
          code: {
            label: 'multiprocessing_basic.py',
            src: `from multiprocessing import Process

def work(name):
    print(f"{name} 작업 시작")

p1 = Process(target=work, args=("A",))
p2 = Process(target=work, args=("B",))
p1.start()
p2.start()`
          }
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `스레드를 실제로 실행시키는 메서드 이름을 쓰세요.`,
          prefix: 't1.', suffix: '()', accept: ['start'], placeholder: '메서드 이름',
          why: '<code>.start()</code>로 스레드를 실행시켜요.',
          hint: '"시작하다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'blank',
          q: `다른 스레드가 끝날 때까지 기다리는 메서드 이름을 쓰세요.`,
          prefix: 't1.', suffix: '()', accept: ['join'], placeholder: '메서드 이름',
          why: '<code>.join()</code>은 그 스레드가 끝날 때까지 기다려요.',
          hint: '"합류하다, 함께하다"라는 뜻이지만, 여기선 "끝날 때까지 기다린다"는 의미로 써요.'
        }),
        () => ({
          type: 'blank',
          q: `한 순간에 파이썬 코드를 딱 하나의 스레드만 실행하게 만드는 CPython의 제약을 부르는 이름(약자)을 쓰세요.`,
          prefix: '', suffix: '', accept: ['GIL'], placeholder: '약자',
          why: '<code>GIL</code>(Global Interpreter Lock) 때문에 한 순간에 하나의 스레드만 파이썬 코드를 실행해요.',
          hint: '"전역 인터프리터 잠금"의 영어 약자예요. 모두 대문자예요.'
        }),
        () => makeChoice(
          '순수 계산이 많은(CPU를 많이 쓰는) 작업을 진짜로 동시에 빠르게 처리하고 싶을 때 적합한 것은?',
          'multiprocessing', ['threading', 'asyncio', 'print를 여러 번 쓰기'],
          '<code>multiprocessing</code>은 별도 프로세스를 써서 GIL의 영향을 안 받고 진짜로 병렬 계산할 수 있어요.',
          'GIL 때문에 스레드로는 계산 작업이 진짜로 동시에 빨라지지 않는다는 점을 떠올려보세요.'
        ),
        () => makeChoice(
          '네트워크 응답을 기다리는 것처럼 "대기 시간이 있는" 작업에 적합한 것은?',
          'threading (또는 asyncio)', ['오직 multiprocessing만', '오직 반복문만', '아무것도 도움이 안 됨'],
          '대기 작업은 GIL이 풀리는 동안 다른 스레드가 실행될 수 있어서, threading으로도 효과적으로 처리할 수 있어요.',
          '계산이 아니라 "기다림"이 많은 작업이라는 점이 핵심이에요.'
        ),
      ],
      boss: () => ({
        type: 'code',
        q: '<code>work(name)</code> 함수를 인자로 받는 스레드 두 개(<code>"A"</code>, <code>"B"</code>)를 만들어 각각 <code>start()</code>한 뒤, 둘 다 <code>join()</code>으로 기다리는 코드를 작성하세요. (import threading은 이미 되어 있고, work 함수는 정의되어 있다고 가정)',
        starter: '',
        rows: 6,
        placeholder: 't1 = threading.Thread(target=work, args=("A",))\nt2 = threading.Thread(target=work, args=("B",))\nt1.start()\nt2.start()\nt1.join()\nt2.join()',
        accept: ['t1 = threading.Thread(target=work, args=("A",))\nt2 = threading.Thread(target=work, args=("B",))\nt1.start()\nt2.start()\nt1.join()\nt2.join()'],
        why: '두 스레드를 만들어 각각 start()한 뒤, join()으로 둘 다 끝날 때까지 기다려야 안전하게 마무리돼요.',
        hint: 'Thread(target=work, args=(이름,))으로 두 개를 만들고, start() 두 번, join() 두 번을 순서대로 쓰세요.'
      })
    },
    {
      id: 'concurrent_futures',
      title: 'concurrent.futures로 동시 작업 관리하기',
      ready: true,
      summary: '스레드나 프로세스를 직접 하나하나 만들지 않고, 여러 작업을 훨씬 편하게 동시에 실행하는 방법을 배워요.',
      goals: ['ThreadPoolExecutor로 여러 작업 동시 실행', 'map으로 결과 한 번에 받기', '언제 Process/ThreadPoolExecutor를 쓰는지'],
      blocks: [
        {
          h: '스레드를 미리 여러 개 준비해두는 풀: ThreadPoolExecutor',
          html: `<p>스레드를 매번 직접 만들고 start/join 하는 대신, <code>ThreadPoolExecutor</code>는 미리 정해둔 개수의 스레드를 준비해두고, 여러 작업을 그 안에서 알아서 나눠 실행해줘요.</p>`,
          code: {
            label: 'thread_pool.py',
            src: `from concurrent.futures import ThreadPoolExecutor

def square(n):
    return n * n

with ThreadPoolExecutor(max_workers=3) as executor:
    results = list(executor.map(square, [1, 2, 3, 4]))

print(results)`,
            out: `[1, 4, 9, 16]`
          }
        },
        {
          h: '언제 Thread, 언제 Process 버전을 쓸까요?',
          html: `<p><code>ThreadPoolExecutor</code>는 대기 시간이 있는 작업(네트워크, 파일)에, <code>ProcessPoolExecutor</code>는 계산이 많은 작업에 알맞아요. 사용법은 거의 똑같고, 이름만 <code>Thread</code> ↔ <code>Process</code>로 바꾸면 돼요.</p>`,
          code: {
            label: 'process_pool.py',
            src: `from concurrent.futures import ProcessPoolExecutor

with ProcessPoolExecutor(max_workers=3) as executor:
    results = list(executor.map(square, [1, 2, 3, 4]))

print(results)`,
            out: `[1, 4, 9, 16]`
          },
          after: `<div class="note"><b>정리</b> — <code>with</code>로 쓰면 작업이 끝난 뒤 스레드/프로세스 풀이 자동으로 정리돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const nums = Array.from({ length: 4 }, () => randInt(1, 10));
          const results = nums.map(n => n * n);
          return {
            type: 'blank',
            q: `<code>with ThreadPoolExecutor(max_workers=3) as executor: results = list(executor.map(square, [${nums.join(', ')}]))</code>에서 <code>square(n)</code>이 <code>n * n</code>을 반환할 때, <code>results</code>의 값은? 대괄호 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`[${results.join(', ')}]`], placeholder: '[숫자, ...]',
            why: `각 값을 제곱하면 [${results.join(', ')}]이 돼요. (순서는 원래 리스트 순서 그대로예요)`,
            hint: 'map은 각 값에 함수를 적용한 결과를, 원래 순서 그대로 돌려줘요.'
          };
        },
        () => ({
          type: 'blank',
          q: `여러 작업을 미리 준비된 스레드들에 나눠 실행해주는 클래스 이름을 쓰세요. (from concurrent.futures import ${'{이것}'})`,
          prefix: 'from concurrent.futures import ', suffix: '', accept: ['ThreadPoolExecutor'], placeholder: '클래스 이름',
          why: '<code>ThreadPoolExecutor</code>는 여러 작업을 스레드 풀에 나눠 실행해줘요.',
          hint: '"스레드(thread) + 풀(pool) + 실행자(executor)"가 합쳐진 이름이에요.'
        }),
        () => makeChoice(
          '이미지 처리처럼 계산량이 아주 많은 작업을 동시에 처리하고 싶을 때 적합한 것은?',
          '<code>ProcessPoolExecutor</code>', ['<code>ThreadPoolExecutor</code>', '<code>SingleExecutor</code>', '<code>print</code>를 여러 번 쓰기'],
          '계산이 많은 작업은 GIL의 영향을 안 받는 <code>ProcessPoolExecutor</code>(별도 프로세스)가 더 적합해요.',
          'CPU 계산이 많은 작업엔 스레드보다 프로세스가 유리하다는 걸 떠올려보세요.'
        ),
        () => makeChoice(
          '여러 파일을 동시에 다운로드하는 것처럼 대기 시간이 있는 작업에 적합한 것은?',
          '<code>ThreadPoolExecutor</code>', ['<code>ProcessPoolExecutor</code>만 가능', '아무것도 도움이 안 됨', 'for문을 두 번 돌리기'],
          '대기 시간이 있는 작업은 <code>ThreadPoolExecutor</code>로도 충분히 효과적으로 동시에 처리할 수 있어요.',
          '네트워크 대기처럼 "기다리는" 작업이라는 점이 핵심이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>double(n)</code> 함수를 <code>[1, 2, 3]</code>에 대해 <code>ThreadPoolExecutor</code>(<code>max_workers=2</code>)로 동시에 적용해서 결과 리스트를 만드는 코드를 작성하세요. (import는 이미 되어 있고 double은 정의되어 있다고 가정)',
          starter: '',
          rows: 2,
          placeholder: 'with ThreadPoolExecutor(max_workers=2) as executor:\n    results = list(executor.map(double, [1, 2, 3]))',
          accept: ['with ThreadPoolExecutor(max_workers=2) as executor:\n    results = list(executor.map(double, [1, 2, 3]))'],
          why: '<code>executor.map(함수, 리스트)</code>로 여러 값에 함수를 동시에 적용하고, <code>list()</code>로 결과를 리스트로 만들어요.',
          hint: 'with ThreadPoolExecutor(...) as executor: 다음 줄에 executor.map을 list()로 감싸서 결과를 받으세요.'
        }),
      ],
      boss: () => {
        const nums = Array.from({ length: 5 }, () => randInt(1, 8));
        const results = nums.map(n => n * n * n);
        return {
          type: 'blank',
          q: `<code>cube(n)</code>이 <code>n ** 3</code>을 반환할 때, <code>list(executor.map(cube, [${nums.join(', ')}]))</code>의 결과는? 대괄호 포함해서 쓰세요.`,
          prefix: '', suffix: '', accept: [`[${results.join(', ')}]`], placeholder: '[숫자, ...]',
          why: `각 값을 세제곱하면 [${results.join(', ')}]이 돼요.`,
          hint: '각 숫자를 세 번 곱한(세제곱한) 값을 순서대로 나열해보세요.'
        };
      }
    },
    {
      id: 'typing_advanced',
      title: '타입 힌트 심화',
      ready: true,
      summary: '값이 없을 수도 있는 경우, 여러 타입 중 하나일 수 있는 경우까지 표현하는 타입 힌트 심화 문법을 배워요.',
      goals: ['Optional로 없을 수도 있는 값 표시하기', 'Union으로 여러 타입 중 하나 표시하기', 'list[int] 같은 제네릭 타입'],
      blocks: [
        {
          h: '값이 없을 수도 있다는 표시: Optional',
          html: `<p>함수가 <code>str</code>을 돌려줄 수도, <code>None</code>(값 없음)을 돌려줄 수도 있다면, <code>Optional[str]</code>로 그 가능성을 미리 표시할 수 있어요. <code>Optional[str]</code>은 사실 <code>Union[str, None]</code>과 같은 뜻이에요.</p>`,
          code: {
            label: 'optional.py',
            src: `from typing import Optional

def find_user(user_id: int) -> Optional[str]:
    users = {1: "지수", 2: "민준"}
    return users.get(user_id)

print(find_user(1))
print(find_user(99))`,
            out: `지수\nNone`
          }
        },
        {
          h: '여러 타입 중 하나: Union',
          html: `<p><code>Union[int, float]</code>은 "int 또는 float 둘 중 하나"라는 뜻이에요. 매개변수가 여러 타입을 받을 수 있을 때 써요.</p>`,
          code: {
            label: 'union.py',
            src: `from typing import Union

def add(a: Union[int, float], b: Union[int, float]) -> float:
    return a + b

print(add(1, 2.5))`,
            out: `3.5`
          }
        },
        {
          h: '리스트 안의 타입까지 표시하기',
          html: `<p><code>list[int]</code>는 "int들이 담긴 리스트"를 뜻해요. 딕셔너리는 <code>dict[str, int]</code>처럼 키와 값의 타입을 같이 표시할 수 있어요.</p>`,
          code: {
            label: 'generic.py',
            src: `def total(scores: list[int]) -> int:
    return sum(scores)

print(total([90, 85, 100]))`,
            out: `275`
          },
          after: `<div class="note"><b>참고</b> — <code>list[int]</code>처럼 대괄호를 바로 쓰는 문법은 파이썬 3.9부터 가능해요. 그 이전 버전에서는 <code>from typing import List</code> 후 <code>List[int]</code>로 써야 했어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `값이 있을 수도, <code>None</code>일 수도 있다는 뜻의 타입 힌트를 만들 때 쓰는 이름을 쓰세요. (<code>from typing import ${'{이것}'}</code>)`,
          prefix: 'from typing import ', suffix: '', accept: ['Optional'], placeholder: '이름',
          why: '<code>Optional[str]</code>은 "str 또는 None"이라는 뜻이에요.',
          hint: '"선택적인, 있어도 되고 없어도 되는"이라는 뜻의 영어 단어예요.'
        }),
        () => {
          const found = Math.random() < 0.5;
          const name = pick(['지수', '민준']);
          return {
            type: 'blank',
            q: `<code>users = {1: "${name}"}</code>에서 <code>find_user(user_id: int) -> Optional[str]</code>가 <code>users.get(user_id)</code>를 반환할 때, <code>find_user(${found ? 1 : 99})</code>의 결과는? (없으면 <code>None</code>)`,
            prefix: '', suffix: '', accept: [found ? name : 'None'], placeholder: '값 또는 None',
            why: found ? `1번 키가 있으니 "${name}"이 반환돼요.` : `99번 키가 없으니 <code>.get()</code>은 None을 반환해요.`,
            hint: '.get()은 키가 없으면 None을 돌려준다는 걸 떠올려보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `int 또는 float 둘 중 하나라는 뜻의 타입 힌트를 만들 때 쓰는 이름을 쓰세요.`,
          prefix: 'from typing import ', suffix: '', accept: ['Union'], placeholder: '이름',
          why: '<code>Union[int, float]</code>은 int 또는 float 중 하나라는 뜻이에요.',
          hint: '"연합, 합집합"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>Optional[str]</code>이 뜻하는 것은?',
          'str 값이거나 None', ['항상 str이어야 함', 'str이 아니면 오류가 남', '아무 값이나 가능'],
          '<code>Optional[str]</code>은 <code>Union[str, None]</code>과 같아서, str이거나 None일 수 있다는 뜻이에요.',
          '"선택적"이라는 이름처럼, 값이 없을(None) 가능성까지 포함한다는 걸 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '정수 리스트(<code>list[int]</code>)를 받아 그 평균을 <code>float</code>로 반환하는 함수 <code>average(scores: list[int]) -> float</code>를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'def average(scores: list[int]) -> float:\n    return sum(scores) / len(scores)',
          accept: ['def average(scores: list[int]) -> float:\n    return sum(scores) / len(scores)'],
          why: '매개변수에 <code>list[int]</code>, 반환 타입에 <code>float</code>을 표시하고, 평균은 합을 개수로 나눠서 구해요.',
          hint: 'sum(scores) / len(scores)로 평균을 구하고, 타입 힌트를 함수 정의에 붙이세요.'
        }),
      ],
      boss: () => {
        const found = Math.random() < 0.5;
        const id = found ? 1 : 99;
        const name = '서연';
        return {
          type: 'blank',
          q: `<code>def find_user(user_id: int) -> Optional[str]:</code>가 <code>{1: "${name}"}.get(user_id)</code>를 반환할 때, <code>result = find_user(${id})</code> 후 <code>print(result if result else "사용자 없음")</code>을 실행하면 결과는?`,
          prefix: '', suffix: '', accept: [found ? name : '사용자 없음'], placeholder: '값',
          why: found ? `1번 키가 있어서 "${name}"이 그대로 출력돼요.` : `99번 키가 없어서 result는 None이 되고, "사용자 없음"이 출력돼요.`,
          hint: 'result가 None이면 (거짓으로 취급되어) else 쪽 값이 쓰인다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'pytest_basics',
      title: 'pytest로 테스트하기',
      ready: true,
      summary: '실무에서 assert 기반 테스트를 더 편하게 관리하게 해주는 pytest의 기본 사용법을 배워요.',
      goals: ['test_로 시작하는 함수 작성', 'pytest 명령어로 실행하기', '왜 unittest 대신 pytest를 많이 쓰는지'],
      blocks: [
        {
          h: '이름이 test_로 시작하는 함수: pytest',
          html: `<p><code>pytest</code>는 파일 안에서 이름이 <code>test_</code>로 시작하는 함수를 자동으로 찾아서 전부 실행해줘요. 함수 안에는 그냥 <code>assert</code>를 쓰면 돼요 — 앞서 배운 <code>assert</code> 문법을 그대로 재사용해요.</p>`,
          code: {
            label: 'test_math.py',
            src: `def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5

def test_add_negative():
    assert add(-1, -1) == -2`
          }
        },
        {
          h: '터미널에서 실행하기',
          html: `<p>터미널에서 <code>pytest</code>라고만 치면, 현재 폴더에서 <code>test_</code>로 시작하는 파일·함수를 전부 찾아서 실행하고 결과를 요약해줘요.</p>`,
          code: {
            label: 'terminal',
            lang: 'bash',
            src: `pytest test_math.py`
          },
          after: `<div class="note"><b>실무에서 unittest보다 pytest를 더 많이 쓰는 이유</b> — 그냥 <code>assert</code>만 쓰면 돼서 문법이 훨씬 간단하고, 실패했을 때 어떤 값이 왜 다른지 훨씬 자세히 보여줘요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `pytest가 자동으로 찾아서 실행하는 함수 이름은 어떤 접두어로 시작해야 할까요?`,
          prefix: 'def ', suffix: 'add():\n    assert add(2, 3) == 5', accept: ['test_'], placeholder: '접두어',
          why: '<code>test_</code>로 시작하는 함수를 pytest가 자동으로 찾아서 실행해요.',
          hint: '"테스트"라는 뜻의 영어 단어 뒤에 밑줄(_)이 붙어요.'
        }),
        () => ({
          type: 'blank',
          q: `터미널에서 pytest로 테스트를 실행하는 명령어를 쓰세요.`,
          prefix: '', suffix: '', accept: ['pytest'], placeholder: '명령어',
          why: '터미널에 <code>pytest</code>라고 치면 test_로 시작하는 함수들을 전부 실행해요.',
          hint: '도구 이름 그대로가 명령어예요.'
        }),
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          const ok = Math.random() < 0.5;
          const expected = ok ? a + b : a + b + randInt(1, 5);
          return {
            type: 'blank',
            q: `<code>def test_add(): assert add(${a}, ${b}) == ${expected}</code>를 pytest로 실행하면 어떻게 될까요? (통과하면 "PASSED", 실패하면 "FAILED")`,
            prefix: '', suffix: '', accept: [ok ? 'PASSED' : 'FAILED'], placeholder: 'PASSED 또는 FAILED',
            why: `add(${a}, ${b})는 ${a + b}인데, ${expected}와(과) ${ok ? '같아서 PASSED' : '달라서 FAILED'}예요.`,
            hint: `add(${a}, ${b})의 실제 값과 비교 대상이 같은지 확인해보세요.`
          };
        },
        () => makeChoice(
          '실무에서 unittest보다 pytest를 더 자주 쓰는 이유로 알맞은 것은?',
          '평범한 assert만으로 테스트를 쓸 수 있고, 실패 원인을 더 자세히 보여줘서',
          ['pytest가 유일하게 지원되는 테스트 도구라서', 'pytest는 assert를 아예 안 써도 돼서', '테스트를 안 만들어도 자동으로 통과되어서'],
          'pytest는 특별한 클래스 없이 그냥 assert만으로 테스트를 쓸 수 있고, 실패했을 때 어떤 값이 왜 다른지 자세히 보여줘요.',
          '문법이 얼마나 간단한지, 실패했을 때 정보가 얼마나 자세한지를 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>def subtract(a, b): return a - b</code> 함수가 <code>subtract(10, 3)</code>에서 <code>7</code>을 돌려주는지 확인하는 pytest 테스트 함수 <code>test_subtract()</code>를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'def test_subtract():\n    assert subtract(10, 3) == 7',
          accept: ['def test_subtract():\n    assert subtract(10, 3) == 7'],
          why: '<code>test_</code>로 시작하는 함수 안에 assert로 확인하고 싶은 조건을 쓰면 돼요.',
          hint: 'def test_subtract(): 다음 줄에 들여써서 assert subtract(10, 3) == 7을 쓰세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 30), b = randInt(1, 30);
        return {
          type: 'code',
          q: `<code>def multiply(a, b): return a * b</code> 함수가 <code>multiply(${a}, ${b})</code>에서 <code>${a * b}</code>을 돌려주는지 확인하는 pytest 테스트 함수 <code>test_multiply()</code>를 작성하세요.`,
          starter: '',
          rows: 2,
          placeholder: `def test_multiply():\n    assert multiply(${a}, ${b}) == ${a * b}`,
          accept: [`def test_multiply():\n    assert multiply(${a}, ${b}) == ${a * b}`],
          why: `${a} × ${b} = ${a * b}이 맞는지 assert로 확인하는 테스트예요.`,
          hint: 'def test_multiply(): 다음 줄에 assert multiply(...) == 결과값을 쓰세요.'
        };
      }
    },
    {
      id: 'hashlib_security',
      title: '비밀번호 해싱과 보안 기초',
      ready: true,
      summary: '비밀번호를 안전하게 저장하기 위한 해시(hash)의 개념과, hashlib로 실제 해시값을 만드는 법을 배워요.',
      goals: ['hashlib로 해시값 만들기', '비밀번호를 그대로 저장하면 안 되는 이유', 'salt 개념'],
      blocks: [
        {
          h: '되돌릴 수 없게 값을 바꾸기: 해시',
          html: `<p><b>해시</b>는 어떤 값을 정해진 규칙으로 완전히 뒤섞어서, <b>같은 입력이면 항상 같은 결과가 나오지만 결과에서 원래 값을 되돌릴 수는 없는</b> 값으로 바꿔줘요. <code>hashlib.sha256(값)</code>으로 해시를 만들 수 있어요.</p>`,
          code: {
            label: 'hash_basic.py',
            src: `import hashlib

password = "mypassword123"
hashed = hashlib.sha256(password.encode()).hexdigest()
print(len(hashed))`,
            out: `64`
          },
          after: `<div class="note"><b>참고</b> — <code>.encode()</code>는 문자열을 해시 함수가 다룰 수 있는 바이트로 바꿔주고, <code>.hexdigest()</code>는 결과를 16진수 문자열(64자리)로 보여줘요.</div>`
        },
        {
          h: '왜 비밀번호를 그대로 저장하면 안 될까요',
          html: `<p>비밀번호를 그대로(평문으로) 저장하면, DB가 유출됐을 때 모든 사용자의 비밀번호가 그대로 드러나요. 대신 <b>해시값만</b> 저장해두면, 해시는 원래 값으로 되돌릴 수 없어서 유출돼도 실제 비밀번호는 알 수 없어요. 로그인할 때는 입력값을 <b>같은 방식으로 해시해서</b> 저장된 해시와 비교해요.</p>`
        },
        {
          h: '같은 비밀번호라도 다르게: salt',
          html: `<p>두 사람이 똑같은 비밀번호를 쓰면 해시값도 똑같아져서, 같은 비밀번호를 쓰는 사람이 있다는 게 드러날 수 있어요. <b>salt</b>(사용자마다 다른 무작위 값)를 비밀번호에 섞어서 해시하면, 같은 비밀번호라도 사람마다 전혀 다른 해시값이 나와서 이 문제를 막아줘요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `해시값을 만드는 hashlib의 흔한 함수 이름을 쓰세요. (SHA-256 알고리즘)`,
          prefix: 'hashlib.', suffix: '(password.encode())', accept: ['sha256'], placeholder: '함수 이름',
          why: '<code>hashlib.sha256(...)</code>은 SHA-256 방식으로 해시를 만들어요.',
          hint: '알고리즘 이름을 그대로 소문자로 쓴 함수예요.'
        }),
        () => ({
          type: 'blank',
          q: `해시 결과를 16진수 문자열로 꺼내는 메서드 이름을 쓰세요.`,
          prefix: 'hashlib.sha256(password.encode()).', suffix: '()', accept: ['hexdigest'], placeholder: '메서드 이름',
          why: '<code>.hexdigest()</code>는 해시 결과를 16진수(hex) 문자열로 꺼내줘요.',
          hint: '"16진수(hex) + 요약값(digest)"이 합쳐진 이름이에요.'
        }),
        () => ({
          type: 'blank',
          q: `문자열을 해시 함수가 다룰 수 있는 형태(바이트)로 바꾸는 메서드 이름을 쓰세요.`,
          prefix: 'password.', suffix: '()', accept: ['encode'], placeholder: '메서드 이름',
          why: '<code>.encode()</code>는 문자열을 바이트로 바꿔서 해시 함수에 넣을 수 있게 해줘요.',
          hint: '"부호화하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '비밀번호를 DB에 그대로(평문으로) 저장하면 안 되는 가장 큰 이유는?',
          'DB가 유출되면 모든 사용자의 실제 비밀번호가 그대로 드러나서',
          ['저장 공간을 많이 차지해서', '로그인 속도가 느려져서', '한글 비밀번호를 못 써서'],
          '평문으로 저장하면 유출 시 비밀번호가 그대로 노출되지만, 해시값은 되돌릴 수 없어서 실제 비밀번호는 알 수 없어요.',
          '"되돌릴 수 없다"는 해시의 특징이 왜 안전한지 생각해보세요.'
        ),
        () => makeChoice(
          '같은 비밀번호를 쓰는 사람들의 해시값이 서로 다르게 나오도록 섞어주는 무작위 값을 무엇이라고 부를까요?',
          'salt', ['pepper', 'token', 'session'],
          'salt는 비밀번호에 섞어 넣는 사용자별 무작위 값으로, 같은 비밀번호도 다른 해시가 나오게 해줘요.',
          '음식에 "소금"을 뿌리듯, 값에 섞어 넣는다는 이미지를 떠올려보세요.'
        ),
      ],
      boss: () => ({
        type: 'code',
        q: '문자열 <code>password</code>를 SHA-256으로 해시해서, 그 16진수 문자열의 길이를 출력하는 코드를 작성하세요. (import hashlib는 이미 되어 있고 password는 정의되어 있다고 가정)',
        starter: '',
        placeholder: 'print(len(hashlib.sha256(password.encode()).hexdigest()))',
        accept: ['print(len(hashlib.sha256(password.encode()).hexdigest()))'],
        why: 'SHA-256 해시를 16진수로 꺼내면 항상 64자리 문자열이 나와요.',
        hint: 'password.encode()를 sha256에 넣고, hexdigest()로 꺼낸 뒤 len()으로 길이를 구하세요.'
      })
    },
    {
      id: 'debugging_pdb',
      title: '디버깅 기법: pdb와 traceback 읽기',
      ready: true,
      summary: 'print로 값을 하나하나 찍어보는 대신, 코드 중간에 멈춰서 상태를 살펴보는 디버깅 도구와, 오류 메시지 읽는 법을 배워요.',
      goals: ['pdb로 코드 중간에 멈추기', 'traceback 읽는 법', 'print 디버깅의 한계'],
      blocks: [
        {
          h: '코드 중간에 멈춰서 들여다보기: pdb',
          html: `<p><code>pdb.set_trace()</code>를 코드 중간에 넣으면, 실행이 그 줄에서 <b>멈추고</b> 그 순간의 변수 값들을 자유롭게 확인할 수 있는 대화형 창이 열려요. <code>n</code>(다음 줄), <code>p 변수이름</code>(값 확인), <code>c</code>(계속 실행) 같은 명령을 그 안에서 쓸 수 있어요.</p>`,
          code: {
            label: 'pdb_basic.py',
            src: `import pdb

def calc(a, b):
    pdb.set_trace()
    return a / b

calc(10, 0)`
          },
          after: `<div class="note"><b>print 디버깅과 비교</b> — print()로 값을 찍어보려면 코드를 수정하고, 확인한 뒤 다시 지워야 해요. pdb는 코드를 안 바꾸고 그 순간에 <b>원하는 값을 자유롭게</b> 확인할 수 있어요.</div>`
        },
        {
          h: '오류 메시지(traceback) 읽는 법',
          html: `<p>오류가 나면 파이썬은 <b>traceback</b>을 보여줘요. 이건 "어디서 어디로 호출되다가 오류가 났는지"의 경로예요. <b>맨 아래 줄</b>이 실제로 어떤 오류(예: <code>ZeroDivisionError</code>)가, 어떤 메시지와 함께 났는지를 알려줘요. 위쪽 줄들은 그 오류가 나기까지 어떤 함수들을 거쳐왔는지를 순서대로 보여줘요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `코드 중간에서 실행을 멈추고 그 순간의 상태를 살펴보게 해주는, pdb 모듈의 함수를 쓰세요.`,
          prefix: 'import pdb\n', suffix: '()', accept: ['pdb.set_trace'], placeholder: '함수',
          why: '<code>pdb.set_trace()</code>는 그 줄에서 실행을 멈추고 대화형 디버깅 창을 열어요.',
          hint: '"추적을 설정한다"는 뜻의 영어 표현이에요.'
        }),
        () => makeChoice(
          'traceback에서 실제 오류의 종류와 메시지를 확인할 수 있는 곳은?',
          '맨 아래 줄', ['맨 위 줄', '가운데 아무 줄', 'traceback에는 안 나옴'],
          'traceback의 맨 아래 줄에 실제 오류 종류(예: ZeroDivisionError)와 메시지가 나와요.',
          '오류가 "최종적으로" 발생한 지점이 어디인지 생각해보세요.'
        ),
        () => makeChoice(
          'print()로 값을 찍어보며 디버깅하는 방식의 단점으로 알맞은 것은?',
          '코드를 매번 수정하고 나중에 다시 지워야 해서', ['실행 속도가 항상 느려져서', '한글을 출력할 수 없어서', 'print는 오류를 아예 못 찾아서'],
          'print 디버깅은 확인할 때마다 코드를 고치고, 확인이 끝나면 다시 지워야 하는 번거로움이 있어요.',
          'pdb는 코드를 수정하지 않고도 원하는 값을 자유롭게 확인할 수 있다는 점과 비교해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `pdb 대화형 창에서, 멈춘 지점부터 코드를 끝까지 계속 실행시키는 명령(한 글자)을 쓰세요.`,
          prefix: '(Pdb) ', suffix: '', accept: ['c'], placeholder: '명령어',
          why: '<code>c</code>(continue)는 멈춘 지점부터 코드를 계속 실행시켜요.',
          hint: '"계속하다(continue)"의 첫 글자예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>def divide(a, b): return a / b</code> 함수의 <code>return</code> 줄 바로 앞에 pdb로 멈추는 코드를 추가하세요. (import pdb는 이미 되어 있다고 가정)',
          starter: '',
          rows: 3,
          placeholder: 'def divide(a, b):\n    pdb.set_trace()\n    return a / b',
          accept: ['def divide(a, b):\n    pdb.set_trace()\n    return a / b'],
          why: '<code>pdb.set_trace()</code>를 원하는 줄 앞에 넣으면 그 지점에서 실행이 멈춰요.',
          hint: 'def divide(a, b): 다음 줄에 pdb.set_trace()를 넣고, 그 다음에 return을 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        'traceback을 읽을 때 가장 먼저 확인해야 할 부분과 그 이유로 가장 알맞은 것은?',
        '맨 아래 줄 — 실제 오류 종류와 메시지가 나와 있어서', ['맨 위 줄 — 프로그램이 시작된 지점이라서', '중간 아무 줄 — 어차피 다 비슷해서', '아무 데도 안 봐도 됨 — 어차피 자동으로 고쳐져서'],
        'traceback은 위에서 아래로 호출 경로를 보여주고, 맨 아래에 실제로 무슨 오류가 났는지가 나와요. 그래서 맨 아래부터 확인하는 게 가장 빨라요.',
        '오류가 "최종적으로 어디서, 왜" 났는지가 어디에 적혀 있을지 생각해보세요.'
      )
    },
    {
      id: 'profiling',
      title: '성능 측정: timeit과 cProfile',
      ready: true,
      summary: '코드가 얼마나 오래 걸리는지 재고, 어느 부분이 느린지 구체적으로 찾아내는 도구를 배워요.',
      goals: ['timeit으로 실행 시간 재기', 'cProfile로 느린 부분 찾기', '추측 대신 측정으로 최적화하기'],
      blocks: [
        {
          h: '코드가 얼마나 걸리는지 재보기: timeit',
          html: `<p><code>timeit.timeit(함수, number=n)</code>은 그 함수를 <code>n</code>번 반복 실행해서 걸린 <b>총 시간(초)</b>을 재줘요. 한 번만 재면 컴퓨터 상황에 따라 들쭉날쭉할 수 있어서, 여러 번 반복해서 재는 거예요.</p>`,
          code: {
            label: 'timeit_basic.py',
            src: `import timeit

def slow():
    return sum(range(1000000))

print(timeit.timeit(slow, number=10))`
          },
          after: `<div class="note"><b>참고</b> — 결과 값(초)은 실행하는 컴퓨터와 그 순간 상황에 따라 매번 달라져요. 중요한 건 "이 코드가 저 코드보다 빠른가/느린가"를 비교하는 용도로 쓰는 거예요.</div>`
        },
        {
          h: '어디가 느린지 자세히 찾기: cProfile',
          html: `<p><code>timeit</code>이 "전체가 얼마나 걸리는지"만 알려준다면, <code>cProfile</code>은 <b>함수별로</b> 몇 번 호출됐고 각각 얼마나 걸렸는지까지 자세히 보여줘요. 여러 함수가 얽힌 프로그램에서 "진짜 느린 부분"을 찾을 때 써요.</p>`,
          code: {
            label: 'cprofile_basic.py',
            src: `import cProfile

def main():
    total = sum(range(1000000))
    print(total)

cProfile.run("main()")`
          },
          after: `<div class="note"><b>핵심 원칙</b> — "여기가 느릴 것 같다"고 추측만 하지 말고, 반드시 <b>측정해서 확인</b>한 뒤에 최적화하세요. 추측과 실제 병목 지점은 다른 경우가 정말 많아요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `함수를 여러 번 반복 실행해서 걸린 총 시간을 재는, timeit 모듈의 함수를 쓰세요.`,
          prefix: 'timeit.', suffix: '(slow, number=10)', accept: ['timeit'], placeholder: '함수 이름',
          why: '<code>timeit.timeit(함수, number=n)</code>은 n번 실행한 총 시간을 재줘요.',
          hint: '모듈 이름과 똑같은 이름의 함수예요.'
        }),
        () => ({
          type: 'blank',
          q: `함수별 호출 횟수와 소요 시간을 자세히 보여주는 모듈의 <code>run()</code>을 호출하는 코드를 완성하세요.`,
          prefix: '', suffix: '.run("main()")', accept: ['cProfile'], placeholder: '모듈 이름',
          why: '<code>cProfile.run("main()")</code>은 main() 실행 중 함수별 세부 시간을 보여줘요.',
          hint: '대문자 P가 중간에 들어가는 모듈 이름이에요.'
        }),
        () => makeChoice(
          '전체 실행 시간이 아니라, 어느 함수가 얼마나 자주 불려서 느린지 자세히 알고 싶을 때 쓰는 도구는?',
          'cProfile', ['timeit', 'pdb', 'logging'],
          'cProfile은 함수별 호출 횟수와 시간을 자세히 분석해줘요.',
          '"전체 시간 한 번 재기"와 "함수별 자세히 분석하기"의 차이를 생각해보세요.'
        ),
        () => makeChoice(
          '코드 최적화 전에 꼭 먼저 해야 할 일로 가장 알맞은 것은?',
          '실제로 어디가 느린지 측정해서 확인하기', ['일단 눈에 보이는 모든 코드를 다 고치기', '함수 이름을 전부 짧게 바꾸기', '변수 이름을 영어로 바꾸기'],
          '추측만으로 최적화하면 진짜 느린 부분을 놓치기 쉬워요. timeit/cProfile로 먼저 측정해야 해요.',
          '"느릴 것 같다"는 감과 실제 측정 결과가 다를 수 있다는 점을 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>slow()</code> 함수를 100번 반복 실행한 총 시간을 재서 출력하는 코드를 작성하세요. (import timeit은 이미 되어 있고 slow는 정의되어 있다고 가정)',
          starter: '',
          placeholder: 'print(timeit.timeit(slow, number=100))',
          accept: ['print(timeit.timeit(slow, number=100))'],
          why: '<code>timeit.timeit(함수, number=100)</code>은 100번 실행한 총 시간을 재줘요.',
          hint: 'timeit.timeit()의 두 번째 인자로 number=100을 넘기세요.'
        }),
      ],
      boss: () => makeChoice(
        '한 프로그램 안에 함수 A, B, C가 있는데 전체가 느려요. 어떤 함수가 병목인지 정확히 찾고 싶을 때 가장 적합한 도구는?',
        'cProfile', ['timeit', 'print()로 각 함수 앞뒤에 시간 찍기', '그냥 감으로 짐작하기'],
        'cProfile은 A, B, C 각각이 몇 번 불렸고 얼마나 걸렸는지 자세히 보여줘서, 정확히 어디가 병목인지 찾을 수 있어요.',
        '여러 함수 중 "어느 것이" 문제인지 콕 집어야 하는 상황이라는 점에 주목하세요.'
      )
    },
    {
      id: 'design_patterns',
      title: '자주 쓰이는 디자인 패턴',
      ready: true,
      summary: '여러 개발자가 자주 마주치는 문제에 대한 검증된 해결 방식인 디자인 패턴 중, 싱글턴과 팩토리를 배워요.',
      goals: ['싱글턴 패턴', '팩토리 패턴', '디자인 패턴을 배우는 이유'],
      blocks: [
        {
          h: '딱 하나만 존재하게 만들기: 싱글턴',
          html: `<p>설정(config)처럼 프로그램 전체에서 <b>딱 하나만</b> 있어야 하는 객체가 있어요. <code>__new__</code>를 직접 정의해서, 이미 만들어진 게 있으면 새로 안 만들고 <b>그 하나를 계속 돌려주도록</b> 만들 수 있어요.</p>`,
          code: {
            label: 'singleton.py',
            src: `class Config:
    _instance = None
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

a = Config()
b = Config()
print(a is b)`,
            out: `True`
          },
          after: `<div class="note"><b>기억하기</b> — <code>__init__</code>은 매번 값을 초기화할 때 쓰지만, <code>__new__</code>는 객체를 "만들지 말지"까지 직접 결정할 수 있는 더 이른 단계의 메서드예요.</div>`
        },
        {
          h: '상황에 따라 다른 객체를 만들어주기: 팩토리',
          html: `<p><b>팩토리</b> 패턴은 "어떤 종류의 객체가 필요한지"를 함수에 넘기면, 그 함수가 알맞은 클래스의 객체를 대신 만들어서 돌려주는 방식이에요. 객체를 만드는 방법을 한 곳에 모아두고 싶을 때 써요.</p>`,
          code: {
            label: 'factory.py',
            src: `class Dog:
    def speak(self):
        return "멍멍"

class Cat:
    def speak(self):
        return "야옹"

def animal_factory(kind):
    if kind == "dog":
        return Dog()
    elif kind == "cat":
        return Cat()

a = animal_factory("dog")
print(a.speak())`,
            out: `멍멍`
          }
        },
        {
          h: '왜 디자인 패턴을 배울까요',
          html: `<p>디자인 패턴은 완전히 새로운 기술이 아니라, "이런 상황엔 보통 이렇게 해결해요"라는 <b>이름이 붙은 관용구</b>예요. 이름을 알아두면 "이건 팩토리 패턴으로 풀면 되겠다"처럼, 다른 개발자와 훨씬 빠르게 의사소통할 수 있어요.</p>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '싱글턴 패턴으로 만든 클래스에서, <code>a = Config()</code>와 <code>b = Config()</code>를 각각 만들었을 때 <code>a is b</code>의 결과는?',
          'True', ['False', '오류가 난다', 'None'],
          '싱글턴은 이미 만든 객체가 있으면 그걸 그대로 돌려주기 때문에, <code>a</code>와 <code>b</code>는 사실 완전히 같은 객체예요.',
          '"딱 하나만 존재한다"는 싱글턴의 정의를 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `객체를 "만들지 말지"까지 결정할 수 있는, <code>__init__</code>보다 더 이른 단계에서 실행되는 메서드 이름을 쓰세요.`,
          prefix: '    def ', suffix: '(cls):\n        if cls._instance is None:\n            cls._instance = super().__new__(cls)\n        return cls._instance', accept: ['__new__'], placeholder: '메서드 이름',
          why: '<code>__new__</code>를 직접 정의해서 객체 생성 자체를 제어할 수 있어요.',
          hint: '"새로 만들다(new)"라는 뜻의 매직 메서드예요.'
        }),
        () => {
          const kind = pick(['dog', 'cat']);
          const sound = kind === 'dog' ? '멍멍' : '야옹';
          return {
            type: 'blank',
            q: `<code>animal_factory(kind)</code>가 "dog"면 <code>Dog()</code>를, "cat"이면 <code>Cat()</code>을 반환할 때, <code>animal_factory("${kind}").speak()</code>의 결과는? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [sound], placeholder: '값',
            why: `"${kind}"에 해당하는 클래스의 speak()는 "${sound}"를 반환해요.`,
            hint: `${kind === 'dog' ? 'Dog' : 'Cat'} 클래스의 speak() 결과를 떠올려보세요.`
          };
        },
        () => makeChoice(
          '디자인 패턴을 배우는 주된 이유로 알맞은 것은?',
          '자주 마주치는 문제에 대한 검증된 해결 방식과 공통 용어를 익혀서, 다른 개발자와 빠르게 소통하려고',
          ['디자인 패턴을 안 쓰면 코드가 아예 실행이 안 돼서', '패턴을 쓰면 항상 실행 속도가 빨라져서', '패턴 이름을 외우면 자동으로 버그가 없어져서'],
          '디자인 패턴은 "이런 상황엔 보통 이렇게"라는 이름 붙은 관용구라서, 이름만으로도 의도를 빠르게 전달할 수 있어요.',
          '패턴 자체가 마법의 성능 향상 도구가 아니라, "이름 붙은 해결 방식"이라는 점을 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"circle"</code>이면 <code>Circle()</code>을, <code>"square"</code>이면 <code>Square()</code>를 반환하는 <code>shape_factory(kind)</code> 함수를 작성하세요. (Circle, Square 클래스는 이미 정의되어 있다고 가정)',
          starter: '',
          rows: 4,
          placeholder: 'def shape_factory(kind):\n    if kind == "circle":\n        return Circle()\n    elif kind == "square":\n        return Square()',
          accept: ['def shape_factory(kind):\n    if kind == "circle":\n        return Circle()\n    elif kind == "square":\n        return Square()'],
          why: 'kind 값에 따라 if/elif로 알맞은 클래스의 객체를 만들어 반환해요.',
          hint: 'if kind == "circle": return Circle(), elif kind == "square": return Square()를 쓰세요.'
        }),
      ],
      boss: () => {
        const kind = pick(['dog', 'cat']);
        const sound = kind === 'dog' ? '멍멍' : '야옹';
        return {
          type: 'blank',
          q: `<code>animal_factory(kind)</code>로 만든 객체를 <code>a = animal_factory("${kind}")</code>, <code>b = animal_factory("${kind}")</code>로 각각 만들었을 때, <code>a is b</code>와 <code>a.speak() == b.speak()</code>의 결과를 "True, True"처럼 순서대로 쓰세요.`,
          prefix: '', suffix: '', accept: ['False, True'], placeholder: 'True 또는 False, True 또는 False',
          why: `팩토리는 (싱글턴과 달리) 호출할 때마다 <b>새 객체</b>를 만들어서 <code>a is b</code>는 False지만, 둘 다 같은 종류라 speak() 결과는 "${sound}"로 같아서 True예요.`,
          hint: '팩토리 패턴은 매번 새 객체를 만든다는 점이 싱글턴과 다르다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'zipfile_mod',
      title: '압축 파일 다루기: zipfile',
      ready: true,
      summary: '여러 파일을 하나로 압축하고, 압축을 풀고, 압축 안의 목록을 확인하는 법을 배워요.',
      goals: ['zipfile로 압축하기', '압축 풀기', '압축 안의 파일 목록 보기'],
      blocks: [
        {
          h: '여러 파일을 하나로 압축하기',
          html: `<p><code>zipfile.ZipFile(이름, "w")</code>로 새 압축 파일을 만들고, <code>.write(파일이름)</code>으로 파일을 추가할 수 있어요.</p>`,
          code: {
            label: 'zip_write.py',
            src: `import zipfile

with zipfile.ZipFile("archive.zip", "w") as zf:
    zf.write("report.txt")
    zf.write("data.csv")`
          }
        },
        {
          h: '압축 풀기',
          html: `<p><code>"r"</code>(읽기) 모드로 열고 <code>.extractall(폴더)</code>를 부르면, 압축된 파일들을 그 폴더에 전부 풀어줘요.</p>`,
          code: {
            label: 'zip_extract.py',
            src: `with zipfile.ZipFile("archive.zip", "r") as zf:
    zf.extractall("output")`
          }
        },
        {
          h: '압축 파일 안의 목록 보기',
          html: `<p>압축을 안 풀어도, <code>.namelist()</code>로 그 안에 어떤 파일들이 들어있는지 미리 확인할 수 있어요.</p>`,
          code: {
            label: 'zip_list.py',
            src: `with zipfile.ZipFile("archive.zip", "r") as zf:
    print(zf.namelist())`,
            out: `['report.txt', 'data.csv']`
          }
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '새 압축 파일을 만들기 위해 <code>ZipFile</code>을 여는 모드는?',
          '<code>"w"</code>', ['<code>"r"</code>', '<code>"a"</code>', '<code>"x"</code>'],
          '<code>"w"</code>(write)로 열어야 새로 압축 파일을 만들 수 있어요.',
          '"쓰기"의 첫 글자예요.'
        ),
        () => ({
          type: 'blank',
          q: `압축 파일에 새 파일을 추가하는 메서드 이름을 쓰세요.`,
          prefix: 'zf.', suffix: '("report.txt")', accept: ['write'], placeholder: '메서드 이름',
          why: '<code>zf.write(파일이름)</code>으로 압축 파일에 파일을 추가해요.',
          hint: '"쓰다, 추가하다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'blank',
          q: `압축 파일 안의 내용을 지정한 폴더에 전부 풀어주는 메서드 이름을 쓰세요.`,
          prefix: 'zf.', suffix: '("output")', accept: ['extractall'], placeholder: '메서드 이름',
          why: '<code>.extractall(폴더)</code>는 압축 안의 모든 파일을 그 폴더에 풀어줘요.',
          hint: '"전부(all) 꺼내다(extract)"가 합쳐진 이름이에요.'
        }),
        () => {
          const files = shuffle(['report.txt', 'data.csv', 'notes.md', 'photo.png']).slice(0, randInt(2, 4));
          return {
            type: 'blank',
            q: `<code>archive.zip</code> 안에 순서대로 ${files.join(', ')}이 들어있을 때, <code>zf.namelist()</code>의 결과를 대괄호와 따옴표 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`[${files.map(f => `'${f}'`).join(', ')}]`], placeholder: "['파일이름', ...]",
            why: `<code>namelist()</code>는 압축 안의 파일 이름을 순서 그대로 리스트로 돌려줘서 [${files.map(f => `'${f}'`).join(', ')}]이에요.`,
            hint: '압축에 넣은 순서 그대로 리스트로 나온다는 걸 떠올려보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>"backup.zip"</code>이라는 새 압축 파일을 만들어 <code>"notes.txt"</code>를 추가하는 코드를 작성하세요. (import zipfile은 이미 되어 있다고 가정)',
          starter: '',
          rows: 2,
          placeholder: 'with zipfile.ZipFile("backup.zip", "w") as zf:\n    zf.write("notes.txt")',
          accept: ['with zipfile.ZipFile("backup.zip", "w") as zf:\n    zf.write("notes.txt")'],
          why: '<code>"w"</code> 모드로 새 압축 파일을 열고, <code>.write()</code>로 파일을 추가해요.',
          hint: 'with zipfile.ZipFile("backup.zip", "w") as zf: 다음 줄에 zf.write("notes.txt")를 쓰세요.'
        }),
      ],
      boss: () => {
        const files = shuffle(['a.txt', 'b.txt', 'c.csv', 'd.png', 'e.md']).slice(0, randInt(3, 5));
        return {
          type: 'blank',
          q: `<code>archive.zip</code>에 ${files.join(', ')}을 순서대로 압축했을 때, <code>len(zf.namelist())</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(files.length)], placeholder: '숫자',
          why: `압축한 파일 개수는 ${files.length}개예요.`,
          hint: '압축에 넣은 파일 개수를 세어보세요.'
        };
      }
    },
    {
      id: 'config_files',
      title: '설정 파일 다루기',
      ready: true,
      summary: '환경마다 달라지는 값을 코드에서 분리해서 관리하는 설정 파일의 개념과, configparser로 다루는 법을 배워요.',
      goals: ['설정을 코드 밖으로 빼는 이유', 'configparser로 .ini 파일 읽기', 'YAML/TOML도 자주 쓰인다는 것'],
      blocks: [
        {
          h: '설정값을 코드 밖으로 빼기',
          html: `<p>DB 주소나 포트 번호처럼 <b>환경(개발/운영)마다 달라지는 값</b>을 코드에 직접 써두면, 값이 바뀔 때마다 코드를 고치고 다시 배포해야 해요. 이런 값들을 <b>설정 파일</b>로 분리해두면, 코드는 그대로 두고 설정 파일만 바꾸면 돼요.</p>`
        },
        {
          h: '.ini 파일 읽기: configparser',
          html: `<p><code>configparser</code>는 파이썬 표준 라이브러리로, <code>[섹션]</code>과 <code>키 = 값</code> 형태로 쓰인 <code>.ini</code> 설정 파일을 읽을 수 있어요.</p>
                 <figure class="code"><figcaption>settings.ini</figcaption><pre><code>[database]
host = localhost
port = 5432</code></pre></figure>`,
          code: {
            label: 'configparser_basic.py',
            src: `import configparser

config = configparser.ConfigParser()
config.read("settings.ini")
print(config["database"]["host"])`,
            out: `localhost`
          }
        },
        {
          h: '실무에서는 YAML/TOML도 많이 써요',
          html: `<p><b>YAML</b>(<code>.yml</code>)은 들여쓰기로 구조를 표현해서 사람이 읽기 편하고, <b>TOML</b>(<code>.toml</code>)은 파이썬 패키지 설정(<code>pyproject.toml</code>)의 표준 형식이에요. 파이썬 3.11부터는 표준 라이브러리 <code>tomllib</code>로 TOML을 바로 읽을 수 있어요.</p>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '설정값을 코드에 직접 쓰지 않고 설정 파일로 분리하는 주된 이유는?',
          '값이 바뀌어도 코드는 그대로 두고 설정 파일만 바꾸면 되도록 하려고',
          ['파일 개수를 늘리기 위해서', '실행 속도를 높이기 위해서', '한글을 지원하지 않는 값을 다루기 위해서'],
          '설정을 분리해두면, 값이 바뀔 때 코드를 고치고 다시 배포할 필요 없이 설정 파일만 바꾸면 돼요.',
          '환경(개발/운영)마다 값이 달라질 수 있다는 상황을 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>.ini</code> 설정 파일을 읽어들이는, ConfigParser 객체의 메서드 이름을 쓰세요.`,
          prefix: 'config.', suffix: '("settings.ini")', accept: ['read'], placeholder: '메서드 이름',
          why: '<code>config.read(파일이름)</code>으로 .ini 파일을 읽어와요.',
          hint: '"읽다"라는 뜻의 영어 단어예요.'
        }),
        () => {
          const host = pick(['localhost', '127.0.0.1', 'db.example.com']);
          const port = pick([5432, 3306, 6379]);
          return {
            type: 'blank',
            q: `<code>settings.ini</code>에 <code>[database]</code> 섹션 아래 <code>host = ${host}</code>, <code>port = ${port}</code>가 있을 때, <code>config["database"]["port"]</code>의 값은? (문자열, 따옴표 없이)`,
            prefix: '', suffix: '', accept: [String(port)], placeholder: '값',
            why: `<code>[섹션]["키"]</code>로 그 섹션 안의 값을 꺼내니, port 값은 ${port}예요.`,
            hint: 'config["섹션이름"]["키이름"]으로 값을 꺼낸다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          '파이썬 패키지 설정(pyproject.toml)의 표준 형식으로 자주 쓰이는 것은?',
          'TOML', ['YAML', 'INI', 'CSV'],
          'pyproject.toml처럼, 파이썬 패키지 설정에는 TOML 형식이 표준으로 쓰여요.',
          '파일 확장자(.toml)에 이미 답이 들어있어요.'
        ),
        () => ({
          type: 'code',
          q: '<code>ConfigParser</code>로 <code>"settings.ini"</code>를 읽어서, <code>[server]</code> 섹션의 <code>port</code> 값을 출력하는 코드를 작성하세요. (import configparser는 이미 되어 있다고 가정)',
          starter: '',
          rows: 3,
          placeholder: 'config = configparser.ConfigParser()\nconfig.read("settings.ini")\nprint(config["server"]["port"])',
          accept: ['config = configparser.ConfigParser()\nconfig.read("settings.ini")\nprint(config["server"]["port"])'],
          why: 'ConfigParser 객체를 만들고 read()로 파일을 읽은 뒤, [섹션]["키"]로 값을 꺼내요.',
          hint: 'ConfigParser()로 객체를 만들고, .read()로 파일을 읽은 뒤 [ ][ ]로 값을 꺼내세요.'
        }),
      ],
      boss: () => {
        const host = pick(['localhost', 'db.internal']);
        const port = pick([5432, 3306]);
        const name = pick(['myapp', 'shopdb']);
        return {
          type: 'blank',
          q: `<code>settings.ini</code>의 <code>[database]</code> 섹션에 <code>host = ${host}</code>, <code>port = ${port}</code>, <code>name = ${name}</code>이 있을 때, <code>f"{config['database']['host']}:{config['database']['port']}/{config['database']['name']}"</code>의 결과는?`,
          prefix: '', suffix: '', accept: [`${host}:${port}/${name}`], placeholder: '값',
          why: `세 값을 순서대로 이어붙이면 "${host}:${port}/${name}"이 돼요.`,
          hint: '각 키의 값을 콜론(:)과 슬래시(/)로 이어붙여보세요.'
        };
      }
    },
    {
      id: 'generators_advanced',
      title: '제너레이터 심화: yield from',
      ready: true,
      summary: '제너레이터 안에서 다른 제너레이터를 이어붙이는 yield from과, 한 줄로 만드는 제너레이터 표현식을 배워요.',
      goals: ['yield from으로 제너레이터 이어붙이기', '제너레이터 표현식', '리스트 대신 제너레이터를 쓰는 이유'],
      blocks: [
        {
          h: '다른 제너레이터의 값을 그대로 넘겨주기: yield from',
          html: `<p><code>yield from 다른제너레이터</code>는 그 제너레이터가 내놓는 값들을 <b>하나씩 그대로</b> 이어서 내놓아요. 여러 개의 <code>yield</code>를 직접 안 써도 돼요.</p>`,
          code: {
            label: 'yield_from.py',
            src: `def small():
    yield 1
    yield 2

def big():
    yield from small()
    yield 3

for n in big():
    print(n)`,
            out: `1\n2\n3`
          }
        },
        {
          h: '한 줄로 만드는 제너레이터: 제너레이터 표현식',
          html: `<p>리스트 컴프리헨션이 <code>[ ]</code>로 값을 전부 한 번에 만든다면, 같은 문법을 <code>( )</code>로 쓰면 <b>필요할 때 하나씩만</b> 만드는 제너레이터가 돼요.</p>`,
          code: {
            label: 'gen_expr.py',
            src: `squares = (n * n for n in range(5))
print(next(squares))
print(next(squares))`,
            out: `0\n1`
          },
          after: `<div class="note"><b>왜 다를까요</b> — <code>[n*n for n in range(백만)]</code>은 백만 개를 전부 메모리에 만들지만, <code>(n*n for n in range(백만))</code>은 값이 필요할 때마다 딱 하나씩만 계산해서 메모리를 훨씬 아껴요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 5), b = randInt(6, 10);
          return {
            type: 'blank',
            q: `<code>def small(): yield ${a}; yield ${b}</code>, <code>def big(): yield from small(); yield 99</code>일 때, <code>for n in big(): print(n)</code>을 실행하면 마지막 줄에 무엇이 출력될까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: ['99'], placeholder: '숫자',
            why: `small()의 값들(${a}, ${b})이 먼저 나오고, 그 다음 big() 자신의 <code>yield 99</code>가 마지막으로 나와요.`,
            hint: 'yield from으로 다른 제너레이터의 값들이 먼저 다 나온 뒤, 그 아래 코드가 이어서 실행돼요.'
          };
        },
        () => ({
          type: 'blank',
          q: `다른 제너레이터의 값들을 하나씩 그대로 이어서 내놓을 때 쓰는 문법을 쓰세요. (예: <code>${'{이것}'} small()</code>)`,
          prefix: '', suffix: ' small()', accept: ['yield from'], placeholder: '문법',
          why: '<code>yield from 제너레이터</code>는 그 제너레이터의 값들을 하나씩 그대로 내놓아요.',
          hint: 'yield 뒤에 "~으로부터"라는 뜻의 영어 전치사를 붙여요.'
        }),
        () => {
          const n = randInt(2, 5);
          const sq = n * n;
          return {
            type: 'blank',
            q: `<code>squares = (n * n for n in range(10))</code>일 때, <code>next(squares)</code>를 ${n}번 연달아 호출하면 마지막 호출의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String((n - 1) * (n - 1))], placeholder: '숫자',
            why: `range(10)은 0부터 시작하니, ${n}번째로 나오는 값은 (${n - 1})의 제곱인 ${(n - 1) * (n - 1)}이에요.`,
            hint: '제너레이터 표현식도 range처럼 0부터 순서대로 값을 내놓는다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          '<code>[n*n for n in range(1000000)]</code> 대신 <code>(n*n for n in range(1000000))</code>을 쓰는 이유는?',
          '값을 전부 미리 만들지 않고 필요할 때마다 하나씩만 만들어서 메모리를 아낄 수 있어서',
          ['계산 결과가 더 정확해서', '더 큰 숫자까지 계산할 수 있어서', '음수도 다룰 수 있어서'],
          '제너레이터 표현식은 값을 필요할 때마다 하나씩만 만들어서, 값이 아주 많을 때 메모리를 훨씬 아껴요.',
          '대괄호(전부 미리 만듦)와 소괄호(필요할 때 하나씩)의 차이를 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>evens()</code> 제너레이터가 <code>2, 4, 6</code>을, <code>odds()</code> 제너레이터가 <code>1, 3, 5</code>를 yield할 때, <code>evens()</code>의 값을 먼저, 그 다음 <code>odds()</code>의 값을 이어서 내놓는 <code>combined()</code> 제너레이터 함수를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'def combined():\n    yield from evens()\n    yield from odds()',
          accept: ['def combined():\n    yield from evens()\n    yield from odds()'],
          why: '<code>yield from</code>을 두 번 써서 두 제너레이터의 값을 순서대로 이어붙여요.',
          hint: 'def combined(): 다음 줄에 yield from evens(), 그 다음 줄에 yield from odds()를 쓰세요.'
        }),
      ],
      boss: () => {
        const a = randInt(1, 3), b = randInt(4, 6), c = randInt(7, 9);
        return {
          type: 'blank',
          q: `<code>def g1(): yield ${a}</code>, <code>def g2(): yield ${b}; yield ${c}</code>, <code>def g3(): yield from g1(); yield from g2()</code>일 때, <code>list(g3())</code>의 결과를 대괄호 포함해서 쓰세요.`,
          prefix: '', suffix: '', accept: [`[${a}, ${b}, ${c}]`], placeholder: '[숫자, ...]',
          why: `g1()의 값(${a}) 다음 g2()의 값들(${b}, ${c})이 순서대로 이어져서 [${a}, ${b}, ${c}]가 돼요.`,
          hint: 'yield from이 쓰인 순서대로 각 제너레이터의 값들이 이어진다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'env_vars',
      title: '환경 변수와 설정값 관리',
      ready: true,
      summary: '비밀번호나 API 키 같은 민감한 값을 코드에 직접 쓰지 않고, 환경 변수로 안전하게 관리하는 법을 배워요.',
      goals: ['os.environ으로 환경 변수 읽기', '기본값 지정하기', '.env 파일과 시크릿 관리'],
      blocks: [
        {
          h: '운영체제가 들고 있는 값 읽기: os.environ',
          html: `<p><b>환경 변수</b>는 운영체제 차원에서 관리되는 값이에요. <code>os.environ.get(이름, 기본값)</code>으로 읽을 수 있고, 그 환경 변수가 없으면 <b>기본값</b>이 쓰여요.</p>`,
          code: {
            label: 'env_basic.py',
            src: `import os

db_host = os.environ.get("DB_HOST", "localhost")
print(db_host)`,
            out: `localhost`
          }
        },
        {
          h: '코드에 비밀번호를 직접 쓰면 안 되는 이유',
          html: `<p>API 키나 비밀번호를 코드에 그대로 적으면, 그 코드를 깃허브 같은 곳에 올릴 때 <b>비밀번호도 함께 유출</b>돼요. 대신 환경 변수로 관리하면, 코드에는 <code>os.environ.get("API_KEY")</code>만 남고 실제 값은 코드 밖(서버 설정, <code>.env</code> 파일 등)에만 존재해요.</p>`
        },
        {
          h: '.env 파일로 관리하기',
          html: `<p>로컬 개발에서는 <code>.env</code> 파일에 환경 변수를 적어두고, <code>python-dotenv</code> 라이브러리의 <code>load_dotenv()</code>로 그 파일 내용을 자동으로 환경 변수에 넣을 수 있어요. <code>.env</code> 파일은 <b>절대 git에 올리지 않아요</b>(보통 <code>.gitignore</code>에 추가해요).</p>`,
          code: {
            label: '.env',
            lang: 'bash',
            src: `DB_HOST=localhost
DB_PASSWORD=supersecret123`
          }
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `환경 변수 <code>DB_HOST</code>를 읽되, 없으면 <code>"localhost"</code>를 쓰도록 하는 코드를 완성하세요.`,
          prefix: 'db_host = os.environ.', suffix: '("DB_HOST", "localhost")', accept: ['get'], placeholder: '메서드 이름',
          why: '<code>os.environ.get(이름, 기본값)</code>은 환경 변수가 없을 때 기본값을 대신 써줘요.',
          hint: '딕셔너리에서 값을 안전하게 꺼낼 때 쓰던 그 메서드와 같아요.'
        }),
        () => {
          const has = Math.random() < 0.5;
          const value = pick(['prod-db.example.com', 'db.internal']);
          return {
            type: 'blank',
            q: `환경 변수 <code>DB_HOST</code>가 ${has ? `"${value}"로 설정돼 있을` : '설정돼 있지 않을'} 때, <code>os.environ.get("DB_HOST", "localhost")</code>의 결과는?`,
            prefix: '', suffix: '', accept: [has ? value : 'localhost'], placeholder: '값',
            why: has ? `환경 변수가 설정돼 있으니 그 값 "${value}"가 쓰여요.` : `환경 변수가 없으니 기본값 "localhost"가 쓰여요.`,
            hint: '환경 변수가 있으면 그 값을, 없으면 기본값을 쓴다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          'API 키나 비밀번호를 코드에 직접 적어두면 안 되는 이유는?',
          '코드를 깃허브 등에 올릴 때 비밀 값도 함께 유출될 수 있어서',
          ['코드 실행 속도가 느려져서', '오타가 나면 프로그램이 멈춰서', '한글이 깨져서'],
          '코드에 비밀번호를 직접 쓰면, 그 코드가 공개되는 순간(깃허브 등) 비밀번호도 함께 노출돼요.',
          '코드는 여러 사람과 공유될 수 있다는 점을 생각해보세요.'
        ),
        () => makeChoice(
          '<code>.env</code> 파일을 다룰 때 지켜야 할 규칙으로 알맞은 것은?',
          'git에 올리지 않도록 .gitignore에 추가한다', ['항상 코드와 함께 커밋한다', '파일 이름을 자주 바꾼다', '내용을 암호화하지 않고 공개 저장소에 올린다'],
          '.env 파일에는 비밀번호 같은 민감한 값이 들어있어서, git에 올라가지 않도록 .gitignore에 추가해야 해요.',
          '.env 파일 안에 어떤 값들이 들어있는지 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '환경 변수 <code>"API_KEY"</code>를 읽되, 없으면 <code>None</code>을 기본값으로 갖도록 읽어서 <code>api_key</code>에 저장하는 코드를 작성하세요. (import os는 이미 되어 있다고 가정)',
          starter: '',
          placeholder: 'api_key = os.environ.get("API_KEY")',
          accept: ['api_key = os.environ.get("API_KEY")', 'api_key = os.environ.get("API_KEY", None)'],
          why: '<code>os.environ.get("API_KEY")</code>는 기본값을 안 주면 자동으로 None을 기본값으로 써요.',
          hint: 'os.environ.get()에 환경 변수 이름만 넣으면, 없을 때 자동으로 None이 돼요.'
        }),
      ],
      boss: () => {
        const hasHost = Math.random() < 0.5;
        const hasPort = Math.random() < 0.5;
        const host = hasHost ? 'prod.example.com' : 'localhost';
        const port = hasPort ? '8080' : '5432';
        return {
          type: 'blank',
          q: `환경 변수 <code>HOST</code>가 ${hasHost ? '"prod.example.com"으로 설정돼 있고' : '설정돼 있지 않고'}, <code>PORT</code>가 ${hasPort ? '"8080"으로 설정돼 있을' : '설정돼 있지 않을'} 때, <code>f"{os.environ.get('HOST', 'localhost')}:{os.environ.get('PORT', '5432')}"</code>의 결과는?`,
          prefix: '', suffix: '', accept: [`${host}:${port}`], placeholder: '값:값',
          why: `HOST는 ${hasHost ? '설정된 값' : '기본값 localhost'}, PORT는 ${hasPort ? '설정된 값' : '기본값 5432'}가 쓰여서 "${host}:${port}"가 돼요.`,
          hint: '각 환경 변수가 설정돼 있는지 없는지에 따라 값 또는 기본값이 쓰인다는 걸 떠올려보세요.'
        };
      }
    }],
  tierBoss: {
    beginner: () => ({
      type: 'code',
      q: '1부터 <code>n</code>까지의 합을 반환하는 함수 <code>sum_range(n)</code>을 만드세요(변수와 for문 사용). <code>sum_range(5)</code>의 결과가 10보다 크면 "많음"을, 아니면 "적음"을 출력하는 전체 코드를 작성하세요.',
      starter: '',
      rows: 9,
      placeholder: 'def sum_range(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\n\nif sum_range(5) > 10:\n    print("많음")\nelse:\n    print("적음")',
      accept: ['def sum_range(n):\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\nif sum_range(5) > 10:\n    print("많음")\nelse:\n    print("적음")'],
      why: 'sum_range(5)는 1부터 5까지 더한 15를 반환하고, 15는 10보다 크니까 "많음"이 출력돼요.',
      hint: '함수 안에서 total = 0으로 시작해 for문으로 더한 값을 return한 뒤, 그 결과를 if/else로 비교하세요.'
    }),
    intermediate: () => ({
      type: 'code',
      q: '생성자에서 <code>self.scores = []</code>로 시작하고, <code>add(self, score)</code> 메서드가 <code>self.scores.append(score)</code>를, <code>average(self)</code> 메서드가 <code>sum(self.scores) / len(self.scores)</code>를 반환하는 <code>Scoreboard</code> 클래스를 만드세요. <code>sb = Scoreboard()</code>를 만들고(점수는 하나도 추가하지 않고), <code>try/except</code>로 <code>sb.average()</code>를 호출해서 <code>ZeroDivisionError</code>가 나면 <code>"점수가 없어서 평균을 구할 수 없어요"</code>를 출력하는 전체 코드를 작성하세요.',
      starter: '',
      rows: 12,
      placeholder: 'class Scoreboard:\n    def __init__(self):\n        self.scores = []\n    def add(self, score):\n        self.scores.append(score)\n    def average(self):\n        return sum(self.scores) / len(self.scores)\n\nsb = Scoreboard()\ntry:\n    print(sb.average())\nexcept ZeroDivisionError:\n    print("점수가 없어서 평균을 구할 수 없어요")',
      accept: ['class Scoreboard:\n    def __init__(self):\n        self.scores = []\n    def add(self, score):\n        self.scores.append(score)\n    def average(self):\n        return sum(self.scores) / len(self.scores)\nsb = Scoreboard()\ntry:\n    print(sb.average())\nexcept ZeroDivisionError:\n    print("점수가 없어서 평균을 구할 수 없어요")'],
      why: 'scores 리스트가 비어있는 상태에서 average()를 호출하면 len(self.scores)가 0이라서 ZeroDivisionError가 나고, except 블록이 그 오류를 잡아 메시지를 출력해요.',
      hint: 'Scoreboard 클래스에 scores 리스트, add, average를 각각 만들고, average() 호출을 try/except로 감싸세요.'
    }),
    advanced: () => ({
      type: 'code',
      q: '맨 위에 <code>import math</code>를 쓰세요. 함수를 감싸서 결과를 <code>math.floor</code>로 내림하는 데코레이터 <code>rounded(func)</code>를 만드세요(<code>def wrapper(*args): return math.floor(func(*args))</code> 형태). <code>Animal</code> 클래스(생성자에서 <code>self.name = name</code>)를 물려받는 <code>Robot</code> 클래스를 만드세요. <code>Robot</code>의 생성자는 <code>super().__init__(name)</code>을 호출한 뒤 <code>self.battery</code>, <code>self.max_battery</code>를 저장하고, <code>@rounded</code>로 감싼 <code>battery_percent(self)</code> 메서드는 <code>self.battery / self.max_battery * 100</code>을 반환해요. <code>r = Robot("R2", 50, 100)</code>을 만들어 <code>print(r.battery_percent())</code>를 출력하는 전체 코드를 작성하세요.',
      starter: '',
      rows: 20,
      placeholder: 'import math\n\ndef rounded(func):\n    def wrapper(*args):\n        return math.floor(func(*args))\n    return wrapper\n\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Robot(Animal):\n    def __init__(self, name, battery, max_battery):\n        super().__init__(name)\n        self.battery = battery\n        self.max_battery = max_battery\n    @rounded\n    def battery_percent(self):\n        return self.battery / self.max_battery * 100\n\nr = Robot("R2", 50, 100)\nprint(r.battery_percent())',
      accept: ['import math\ndef rounded(func):\n    def wrapper(*args):\n        return math.floor(func(*args))\n    return wrapper\nclass Animal:\n    def __init__(self, name):\n        self.name = name\nclass Robot(Animal):\n    def __init__(self, name, battery, max_battery):\n        super().__init__(name)\n        self.battery = battery\n        self.max_battery = max_battery\n    @rounded\n    def battery_percent(self):\n        return self.battery / self.max_battery * 100\nr = Robot("R2", 50, 100)\nprint(r.battery_percent())'],
      why: '@rounded 데코레이터가 battery_percent의 결과를 math.floor로 내림해서 정수로 만들고, Robot은 Animal을 상속받아 super().__init__(name)으로 이름을 저장해요. 50/100*100=50.0이 내림되어 50이 출력돼요.',
      hint: 'import math와 rounded 데코레이터를 먼저 만들고, class Robot(Animal)에서 super().__init__(name) 후 필드를 저장한 뒤, @rounded를 battery_percent 메서드 위에 붙이세요.'
    }),
  }
};
