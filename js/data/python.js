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
    }],
  tierBoss: {
    beginner: () => ({
      type: 'code',
      q: '변수 <code>total</code>을 0으로 만들고, for문으로 1부터 5까지 더한 뒤, 총합이 10보다 크면 "많음"을, 아니면 "적음"을 출력하는 전체 코드를 작성하세요. (변수, 반복문, 조건문을 모두 사용하세요)',
      starter: '',
      rows: 6,
      placeholder: 'total = 0\nfor i in range(1, 6):\n    total += i\nif total > 10:\n    print("많음")\nelse:\n    print("적음")',
      accept: ['total = 0\nfor i in range(1, 6):\n    total += i\nif total > 10:\n    print("많음")\nelse:\n    print("적음")'],
      why: '1부터 5까지 더하면 15고, 15는 10보다 크니까 "많음"이 출력돼요.',
      hint: 'total = 0으로 시작해서 for문으로 다 더한 뒤, 그 결과를 if/else로 비교하세요.'
    }),
    intermediate: () => ({
      type: 'code',
      q: '리스트를 받아 그 중 가장 큰 값을 반환하는 함수 <code>find_max</code>를 만들고, <code>numbers = [3, 1, 4, 1, 5]</code>에 대해 호출한 결과를 출력하는 전체 코드를 작성하세요. (<code>max()</code> 함수를 사용하세요)',
      starter: '',
      rows: 5,
      placeholder: 'def find_max(nums):\n    return max(nums)\n\nnumbers = [3, 1, 4, 1, 5]\nprint(find_max(numbers))',
      accept: ['def find_max(nums):\n    return max(nums)\nnumbers = [3, 1, 4, 1, 5]\nprint(find_max(numbers))'],
      why: '함수 안에서 <code>max(nums)</code>로 가장 큰 값을 찾고, 리스트를 넘겨 호출한 결과(5)를 출력해요.',
      hint: 'def find_max(nums): return max(nums)로 함수를 만들고, 리스트를 넘겨 호출한 값을 출력하세요.'
    }),
    advanced: () => ({
      type: 'code',
      q: '<code>Calculator</code>라는 클래스를 만들고, <code>divide(self, a, b)</code> 메서드에서 0으로 나누면 <code>"0으로 나눌 수 없어요"</code>를 출력하도록 예외 처리를 하는 코드를 작성하세요.',
      starter: '',
      rows: 6,
      placeholder: 'class Calculator:\n    def divide(self, a, b):\n        try:\n            print(a / b)\n        except ZeroDivisionError:\n            print("0으로 나눌 수 없어요")',
      accept: ['class Calculator:\n    def divide(self, a, b):\n        try:\n            print(a / b)\n        except ZeroDivisionError:\n            print("0으로 나눌 수 없어요")'],
      why: '클래스와 메서드 안에서도 <code>try/except</code>를 똑같이 쓸 수 있어요. b가 0이면 ZeroDivisionError를 처리해요.',
      hint: 'class Calculator: 안에 def divide(self, a, b): 를 만들고, 그 안에 try/except를 넣으세요.'
    }),
  }
};
