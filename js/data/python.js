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
