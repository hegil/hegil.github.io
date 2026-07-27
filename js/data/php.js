/* PHP 강의·문제 데이터 — 단원을 추가하려면 units 배열에 항목을 넣으면 됩니다. */
COURSES.php = {
    name: 'PHP',
    tagline: '웹의 뒷단(서버)을 움직이는, 웹 개발에 특화된 언어',
    units: [{
      id: 'variablesOutput',
      title: '변수와 출력',
      ready: true,
      summary: 'PHP에서 값을 저장하는 변수와, 화면에 출력하는 echo를 배워요.',
      goals: ['$로 시작하는 변수', 'echo로 출력하기', '문자열 안에서 변수 값 넣기(보간)'],
      blocks: [
        {
          h: '$로 시작하는 변수',
          html: `<p>PHP의 변수는 항상 <code>$</code>로 시작해야 해요(다른 언어와 다른 점이에요). <code>echo</code>는 화면에 값을 출력해요. 여러 <code>echo</code>는 줄바꿈 없이 이어서 출력돼요.</p>`,
          code: {
            label: 'variables.php',
            lang: 'php',
            src: `<?php
$name = "지수";
$age = 17;
echo $name;
echo $age;`,
            out: `지수17`
          }
        },
        {
          h: '문자열 안에서 변수 값 그대로 넣기',
          html: `<p>큰따옴표(<code>"</code>) 문자열 안에서는 <code>$변수</code>를 그대로 쓰면 그 값으로 자동 치환돼요(보간). 작은따옴표(<code>'</code>) 문자열은 이 기능이 없어요.</p>`,
          code: {
            label: 'interpolation.php',
            lang: 'php',
            src: `<?php
$name = "지수";
echo "안녕하세요, $name님!";`,
            out: `안녕하세요, 지수님!`
          },
          after: `<div class="note"><b>정리</b> — PHP 파일은 <code>&lt;?php</code>로 시작해야 그 뒤가 PHP 코드로 실행돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>$name = "${name}"; $age = ${age}; echo $name; echo $age;</code>를 실행하면? (그대로 입력, 공백 없이 이어서)`,
            prefix: '', suffix: '', accept: [`${name}${age}`], placeholder: '출력 결과',
            why: `echo를 두 번 부르면 줄바꿈 없이 그대로 이어져서 "${name}${age}"가 돼요.`,
            hint: 'echo는 자동으로 줄바꿈을 넣어주지 않아요.'
          };
        },
        () => makeChoice(
          'PHP 변수 이름을 만드는 규칙으로 알맞은 것은?',
          '항상 <code>$</code>로 시작해야 한다', ['항상 대문자로 시작해야 한다', '숫자로 시작해도 된다', '띄어쓰기를 포함할 수 있다'],
          'PHP는 변수 앞에 반드시 $를 붙여야 해요. 다른 언어에는 없는 PHP만의 특징이에요.',
          '$name, $age처럼 항상 붙어있는 그 기호예요.'
        ),
        () => {
          const name = pick(['민준', '서연', '도윤']);
          return {
            type: 'blank',
            q: `<code>$name = "${name}"; echo "반가워요, $name님!";</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`반가워요, ${name}님!`], placeholder: '출력 결과',
            why: `큰따옴표 문자열 안의 $name이 실제 값 "${name}"으로 바뀌어서 "반가워요, ${name}님!"이 돼요.`,
            hint: '큰따옴표 문자열 안의 $변수는 그 값으로 자동으로 바뀌어요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>$city</code>라는 변수에 <code>"서울"</code>을 담고 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: '$city = "서울";\necho $city;',
          accept: ['$city = "서울";\necho $city;'],
          why: '$city = "서울";로 변수를 선언하고, echo로 출력해요.',
          hint: '$city = "서울"; 다음 줄에 echo $city;를 쓰세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>$name = "${name}"; $age = ${age}; echo "$name(은)는 $age살입니다";</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`${name}(은)는 ${age}살입니다`], placeholder: '출력 결과',
          why: `큰따옴표 문자열 안의 $name, $age가 각각 실제 값으로 바뀌어요.`,
          hint: '문자열 보간은 변수가 몇 개 있든 모두 값으로 바뀌어요.'
        };
      }
    },
    {
      id: 'controlFlowPhp',
      title: '조건문과 반복문',
      ready: true,
      summary: 'PHP의 조건문 if/elseif/else와, for·foreach·while 반복문을 배워요.',
      goals: ['if/elseif/else', 'for와 while', 'foreach로 배열 순회하기'],
      blocks: [
        {
          h: '조건문: if/elseif/else',
          html: `<p>PHP의 조건문은 다른 C 계열 언어와 비슷해요. 조건은 괄호로 감싸고, 블록은 중괄호로 감싸요.</p>`,
          code: {
            label: 'if_else.php',
            lang: 'php',
            src: `<?php
$age = 17;
if ($age >= 18) {
    echo "성인";
} else {
    echo "미성년자";
}`,
            out: `미성년자`
          }
        },
        {
          h: '배열을 순회하는 foreach',
          html: `<p><code>foreach ($배열 as $값)</code>은 배열의 각 값을 하나씩 꺼내서 반복해요 — PHP에서 배열을 다룰 때 가장 많이 쓰는 반복문이에요.</p>`,
          code: {
            label: 'foreach_basic.php',
            lang: 'php',
            src: `<?php
$fruits = ["사과", "바나나", "포도"];
foreach ($fruits as $fruit) {
    echo $fruit . " ";
}`,
            out: `사과 바나나 포도 `
          },
          after: `<div class="note"><b>정리</b> — 정해진 횟수만큼 반복할 땐 <code>for</code>, 조건이 참인 동안 반복할 땐 <code>while</code>, 배열을 순회할 땐 <code>foreach</code>를 주로 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const age = randInt(14, 22);
          const isAdult = age >= 18;
          return {
            type: 'blank',
            q: `<code>$age = ${age}; if ($age >= 18) { echo "성인"; } else { echo "미성년자"; }</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [isAdult ? '성인' : '미성년자'], placeholder: '출력 결과',
            why: `${age}는 18 ${isAdult ? '이상이므로' : '미만이므로'} "${isAdult ? '성인' : '미성년자'}"가 출력돼요.`,
            hint: '18 이상인지 아닌지를 확인해보세요.'
          };
        },
        () => makeChoice(
          '<code>foreach ($fruits as $fruit)</code>의 역할로 알맞은 것은?',
          '배열 $fruits의 각 값을 하나씩 $fruit에 담아 반복한다', ['배열의 길이를 세어 그 횟수만큼 반복한다', '배열의 첫 번째 값만 반복해서 출력한다', '배열을 정렬한 뒤 삭제한다'],
          'foreach는 배열의 각 원소를 순서대로 하나씩 꺼내서 반복 처리해요.',
          '"각각에 대하여(for each)"라는 이름 그대로예요.'
        ),
        () => {
          const n = randInt(3, 6);
          let total = 0;
          for (let i = 0; i < n; i++) total += i;
          return {
            type: 'blank',
            q: `<code>$total = 0; for ($i = 0; $i < ${n}; $i++) { $total += $i; }</code>를 실행한 뒤 <code>$total</code>은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
            why: `0부터 ${n - 1}까지 더하면 ${total}이에요.`,
            hint: '$i는 0부터 시작해서 $i < ${n}인 동안 반복돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>$fruits</code>(배열)의 각 값을 <code>$fruit</code>에 담아 출력하는 <code>foreach</code> 반복문을 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'foreach ($fruits as $fruit) {\n    echo $fruit;\n}',
          accept: ['foreach ($fruits as $fruit) {\n    echo $fruit;\n}'],
          why: 'foreach ($배열 as $값) { } 형태로 배열을 순회해요.',
          hint: 'foreach ($fruits as $fruit) { echo $fruit; } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const n = randInt(2, 5);
        return {
          type: 'blank',
          q: `<code>$count = 0; while ($count < ${n}) { echo $count; $count++; }</code>를 실행하면, 총 몇 번 <code>echo</code>가 실행될까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
          why: `count가 0부터 ${n - 1}까지 총 ${n}번 조건을 만족하며 반복돼요.`,
          hint: 'count가 n보다 작은 동안 반복이 계속돼요.'
        };
      }
    },
    {
      id: 'functionsPhp',
      title: '함수',
      ready: true,
      summary: 'PHP 함수의 기본 문법과, 기본값이 있는 매개변수를 배워요.',
      goals: ['function으로 함수 만들기', '기본값이 있는 매개변수', '반환값(return)'],
      blocks: [
        {
          h: '함수 만들기: function',
          html: `<p>PHP 함수는 <code>function 이름(매개변수) { }</code> 형태로 만들어요.</p>`,
          code: {
            label: 'func_basic.php',
            lang: 'php',
            src: `<?php
function add($a, $b) {
    return $a + $b;
}

echo add(3, 4);`,
            out: `7`
          }
        },
        {
          h: '값을 안 넘기면 쓸 기본값: 기본 매개변수',
          html: `<p>매개변수에 <code>= 값</code>을 붙이면, 호출할 때 그 값을 안 넘겨도 기본값이 쓰여요.</p>`,
          code: {
            label: 'default_param.php',
            lang: 'php',
            src: `<?php
function greet($name, $greeting = "안녕") {
    echo "$greeting, $name!";
}

greet("지수");`,
            out: `안녕, 지수!`
          },
          after: `<div class="note"><b>정리</b> — 기본값이 있는 매개변수는 항상 기본값이 없는 매개변수보다 뒤에 와야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>function add($a, $b) { return $a + $b; }</code>일 때, <code>add(${a}, ${b})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `${a} + ${b} = ${a + b}예요.`,
            hint: '매개변수 a, b 자리에 순서대로 값이 들어가요.'
          };
        },
        () => makeChoice(
          '기본값이 있는 매개변수(<code>$greeting = "안녕"</code>)의 특징으로 알맞은 것은?',
          '호출할 때 그 값을 넘기지 않으면 기본값이 대신 쓰인다', ['반드시 값을 넘겨야 하며, 안 넘기면 오류가 난다', '항상 첫 번째 매개변수여야 한다', '문자열만 기본값으로 쓸 수 있다'],
          '값을 생략하면 = 뒤에 적어둔 기본값이 대신 쓰여요.',
          '값을 "안 넘겨도 되게" 해주는 게 기본값의 역할이에요.'
        ),
        () => {
          const greeting = pick(['안녕', '반가워', '환영해']);
          return {
            type: 'blank',
            q: `<code>function greet($name, $greeting = "${greeting}") { echo "$greeting, $name!"; }</code>이고 <code>greet("지수")</code>라고 호출하면(두 번째 인자 없이)? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${greeting}, 지수!`], placeholder: '출력될 문장',
            why: `greeting을 안 넘겼으니 기본값 "${greeting}"이 쓰여서 "${greeting}, 지수!"가 출력돼요.`,
            hint: '두 번째 인자를 안 넘기면 = 뒤에 적어둔 기본값이 쓰여요.'
          };
        },
        () => ({
          type: 'code',
          q: '두 수를 곱해 반환하는 함수 <code>multiply</code>를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'function multiply($a, $b) {\n    return $a * $b;\n}',
          accept: ['function multiply($a, $b) {\n    return $a * $b;\n}'],
          why: 'function 이름($매개변수들) { return 계산식; } 형태로 함수를 만들어요.',
          hint: 'function multiply($a, $b) { return $a * $b; } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const base = randInt(1, 20);
        const bonusUsed = Math.random() < 0.5;
        const bonus = randInt(1, 10);
        const result = bonusUsed ? base + bonus : base + 5;
        return {
          type: 'blank',
          q: `<code>function addBonus($score, $bonus = 5) { return $score + $bonus; }</code>일 때, <code>addBonus(${base}${bonusUsed ? `, ${bonus}` : ''})</code>라고 호출하면 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
          why: bonusUsed
            ? `bonus에 ${bonus}를 직접 넘겼으니 ${base} + ${bonus} = ${result}이에요.`
            : `bonus를 안 넘겼으니 기본값 5가 쓰여서 ${base} + 5 = ${result}이에요.`,
          hint: '매개변수에 = 5처럼 기본값이 있으면, 값을 안 넘겼을 때만 그 기본값이 쓰여요.'
        };
      }
    },
    {
      id: 'arraysPhp',
      title: '배열',
      ready: true,
      summary: '여러 값을 순서대로 담는 인덱스 배열을 배워요.',
      goals: ['[]로 배열 만들기', '인덱스로 값 접근', '값 추가하기와 count()'],
      blocks: [
        {
          h: '배열 만들고 접근하기',
          html: `<p><code>[값1, 값2, ...]</code>로 배열을 만들고, <code>배열[인덱스]</code>(0부터 시작)로 값에 접근해요. <code>count()</code>는 배열에 든 값의 개수를 알려줘요.</p>`,
          code: {
            label: 'array_basic.php',
            lang: 'php',
            src: `<?php
$fruits = ["사과", "바나나", "포도"];
echo $fruits[0];
echo count($fruits);`,
            out: `사과3`
          }
        },
        {
          h: '값 추가하기',
          html: `<p><code>$배열[] = 값</code>은 배열 맨 뒤에 값을 추가해요(다른 언어의 push와 비슷해요).</p>`,
          code: {
            label: 'array_push.php',
            lang: 'php',
            src: `<?php
$fruits = ["사과", "바나나", "포도"];
$fruits[] = "수박";
echo count($fruits);`,
            out: `4`
          },
          after: `<div class="note"><b>정리</b> — 배열의 첫 번째 값은 인덱스 0이에요(1이 아니라!). 이 부분은 실수하기 쉬우니 기억해두세요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const items = [pick(['사과', '딸기']), pick(['바나나', '포도']), pick(['수박', '망고'])];
          const idx = randInt(0, 2);
          return {
            type: 'blank',
            q: `<code>$fruits = ["${items[0]}", "${items[1]}", "${items[2]}"];</code>일 때, <code>$fruits[${idx}]</code>의 값은? (그대로 입력)`,
            prefix: '', suffix: '', accept: [items[idx]], placeholder: '값',
            why: `인덱스는 0부터 시작하므로 $fruits[${idx}]는 "${items[idx]}"예요.`,
            hint: '배열의 첫 번째 값은 인덱스 0이에요.'
          };
        },
        () => makeChoice(
          '<code>count($fruits)</code>가 하는 일은?',
          '배열 $fruits에 담긴 값의 개수를 돌려준다', ['배열의 첫 번째 값을 돌려준다', '배열을 비운다', '배열을 정렬한다'],
          'count()는 배열(또는 셀 수 있는 값)에 담긴 원소의 개수를 세어줘요.',
          '"세다(count)"라는 이름 그대로예요.'
        ),
        () => {
          const n = randInt(2, 5);
          return {
            type: 'blank',
            q: `<code>$items = [${Array.from({ length: n }, (_, i) => i + 1).join(', ')}];</code>이고 <code>$items[] = 99;</code>를 실행한 뒤 <code>count($items)</code>는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n + 1)], placeholder: '숫자',
            why: `원래 ${n}개였는데 하나 추가되어 ${n + 1}개가 돼요.`,
            hint: '$배열[] = 값은 배열 끝에 값을 하나 추가해요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>"지수"</code>, <code>"민준"</code>, <code>"서연"</code>을 담는 배열 <code>$names</code>를 만드세요.',
          starter: '',
          placeholder: '$names = ["지수", "민준", "서연"];',
          accept: ['$names = ["지수", "민준", "서연"];'],
          why: '[값1, 값2, 값3] 형태로 배열을 만들어요.',
          hint: '$names = ["지수", "민준", "서연"]; 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const items = Array.from({ length: 3 }, () => randInt(1, 50));
        const added = randInt(1, 50);
        return {
          type: 'blank',
          q: `<code>$nums = [${items.join(', ')}];</code>이고 <code>$nums[] = ${added};</code>를 실행한 뒤 <code>echo $nums[count($nums) - 1];</code>를 하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(added)], placeholder: '숫자',
          why: `count($nums) - 1은 마지막 인덱스를 가리키므로, 방금 추가한 값 ${added}가 출력돼요.`,
          hint: '배열의 마지막 인덱스는 count() - 1이에요.'
        };
      }
    },
    {
      id: 'stringsPhp',
      title: '문자열 다루기',
      ready: true,
      summary: '문자열을 이어붙이고, 자주 쓰는 문자열 함수들을 배워요.',
      goals: ['.으로 문자열 이어붙이기', 'strlen/strtoupper 같은 함수', 'sprintf로 서식 있는 문자열 만들기'],
      blocks: [
        {
          h: '문자열 이어붙이기: .',
          html: `<p>PHP는 문자열을 이어붙일 때 <code>+</code>가 아니라 마침표(<code>.</code>)를 써요.</p>`,
          code: {
            label: 'concat.php',
            lang: 'php',
            src: `<?php
$first = "안녕";
$second = "하세요";
echo $first . $second;`,
            out: `안녕하세요`
          }
        },
        {
          h: '자주 쓰는 문자열 함수',
          html: `<p><code>strlen</code>은 문자열의 길이(바이트 수)를, <code>strtoupper</code>는 대문자로 바꾼 문자열을 돌려줘요.</p>`,
          code: {
            label: 'string_functions.php',
            lang: 'php',
            src: `<?php
echo strlen("hello");
echo strtoupper("hello");`,
            out: `5HELLO`
          },
          after: `<div class="note"><b>정리</b> — PHP에는 문자열 관련 함수가 아주 많아요(str_replace, substr, trim 등). 필요할 때마다 공식 문서에서 찾아 쓰는 것도 좋은 습관이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = pick(['좋은', '멋진', '행복한']);
          const b = pick(['하루', '시간', '순간']);
          return {
            type: 'blank',
            q: `<code>$a = "${a}"; $b = "${b}"; echo $a . $b;</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${a}${b}`], placeholder: '출력 결과',
            why: `.(마침표)로 이어붙이므로 "${a}${b}"가 돼요.`,
            hint: '.은 두 문자열을 그대로 이어붙여요(공백 없이).'
          };
        },
        () => makeChoice(
          'PHP에서 두 문자열을 이어붙일 때 쓰는 연산자는?',
          '<code>.</code>(마침표)', ['<code>+</code>', '<code>&amp;</code>', '<code>++</code>'],
          'PHP는 문자열 이어붙이기에 마침표(.)를 써요(+는 숫자 덧셈 전용이에요).',
          '다른 언어의 +와 헷갈리기 쉬우니 꼭 기억해두세요.'
        ),
        () => {
          const word = pick(['hello', 'world', 'code']);
          return {
            type: 'blank',
            q: `<code>echo strlen("${word}");</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(word.length)], placeholder: '숫자',
            why: `"${word}"의 글자 수는 ${word.length}예요.`,
            hint: 'strlen은 문자열의 길이를 알려줘요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>$first</code>("안녕")와 <code>$last</code>("하세요")를 이어붙여 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'echo $first . $last;',
          accept: ['echo $first . $last;'],
          why: '.으로 두 변수를 이어붙여요.',
          hint: 'echo $first . $last; 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const score = randInt(60, 100);
        return {
          type: 'blank',
          q: `<code>$name = "${name}"; $score = ${score}; echo $name . "님의 점수: " . $score;</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`${name}님의 점수: ${score}`], placeholder: '출력 결과',
          why: `세 부분을 .으로 이어붙이면 "${name}님의 점수: ${score}"가 돼요.`,
          hint: '.을 여러 번 써서 여러 값을 이어붙일 수 있어요.'
        };
      }
    },
    {
      id: 'associativeArrays',
      title: '연관 배열',
      ready: true,
      summary: '숫자 인덱스 대신 이름(키)으로 값을 저장하는 연관 배열을 배워요.',
      goals: ['키-값 쌍으로 배열 만들기', '키로 값 접근하기', 'foreach로 키와 값 함께 순회하기'],
      blocks: [
        {
          h: '키-값 쌍으로 배열 만들기',
          html: `<p><code>["키" => 값, ...]</code> 형태로 숫자 대신 이름(키)을 붙여 값을 저장하는 연관 배열을 만들어요.</p>`,
          code: {
            label: 'assoc_basic.php',
            lang: 'php',
            src: `<?php
$student = ["name" => "지수", "age" => 17];
echo $student["name"];
echo $student["age"];`,
            out: `지수17`
          }
        },
        {
          h: '키와 값 함께 순회하기',
          html: `<p><code>foreach ($배열 as $키 => $값)</code>으로 연관 배열의 키와 값을 동시에 꺼내며 순회할 수 있어요.</p>`,
          code: {
            label: 'assoc_foreach.php',
            lang: 'php',
            src: `<?php
$scores = ["지수" => 90, "민준" => 85];
foreach ($scores as $name => $score) {
    echo "$name: $score ";
}`,
            out: `지수: 90 민준: 85 `
          },
          after: `<div class="note"><b>정리</b> — 연관 배열은 "이름표가 붙은 서랍"이라고 생각하면 편해요. 순서보다 "어떤 키에 어떤 값이 있는지"가 중요할 때 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          const age = randInt(14, 19);
          const pickAge = Math.random() < 0.5;
          return {
            type: 'blank',
            q: `<code>$student = ["name" => "${name}", "age" => ${age}];</code>일 때, <code>$student["${pickAge ? 'age' : 'name'}"]</code>의 값은? (그대로 입력)`,
            prefix: '', suffix: '', accept: [pickAge ? String(age) : name], placeholder: '값',
            why: `"${pickAge ? 'age' : 'name'}" 키로 저장된 값은 ${pickAge ? age : name}예요.`,
            hint: '대괄호 안의 키 이름으로 그 값을 그대로 꺼내요.'
          };
        },
        () => makeChoice(
          '연관 배열의 특징으로 알맞은 것은?',
          '숫자 인덱스 대신 문자열 등의 키로 값을 저장하고 꺼낸다', ['값을 오직 숫자로만 저장할 수 있다', '한 번 만들면 값을 바꿀 수 없다', 'foreach로는 순회할 수 없다'],
          '연관 배열은 "키 => 값" 형태로, 이름(키)을 통해 값을 관리해요.',
          '"연관(associative)"이라는 이름처럼, 키와 값이 서로 연관돼 있어요.'
        ),
        () => {
          const pairs = [['지수', 90], ['민준', 85]];
          return {
            type: 'blank',
            q: `<code>$scores = ["${pairs[0][0]}" => ${pairs[0][1]}, "${pairs[1][0]}" => ${pairs[1][1]}]; foreach ($scores as $name => $score) { echo "$name: $score "; }</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${pairs[0][0]}: ${pairs[0][1]} ${pairs[1][0]}: ${pairs[1][1]} `], placeholder: '출력 결과',
            why: `각 키-값 쌍을 순서대로 "이름: 점수 " 형태로 출력해요.`,
            hint: '$name과 $score에 각 쌍의 키와 값이 순서대로 담겨요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>"name"</code>은 <code>"지수"</code>, <code>"age"</code>는 <code>17</code>인 연관 배열 <code>$student</code>를 만드세요.',
          starter: '',
          placeholder: '$student = ["name" => "지수", "age" => 17];',
          accept: ['$student = ["name" => "지수", "age" => 17];'],
          why: '["키" => 값, "키" => 값] 형태로 연관 배열을 만들어요.',
          hint: '$student = ["name" => "지수", "age" => 17]; 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const city = pick(['서울', '부산', '대구']);
        return {
          type: 'blank',
          q: `<code>$student = ["name" => "${name}", "city" => "${city}"];</code>일 때, <code>echo $student["name"] . "는 " . $student["city"] . "에 살아요";</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`${name}는 ${city}에 살아요`], placeholder: '출력 결과',
          why: `각 키의 값을 꺼내 이어붙이면 "${name}는 ${city}에 살아요"가 돼요.`,
          hint: '두 키의 값을 각각 꺼내서 문자열로 이어붙여보세요.'
        };
      }
    },
    {
      id: 'arrayFunctions',
      title: '배열 함수: array_map과 array_filter',
      ready: true,
      summary: '배열의 각 값을 변환하는 array_map과, 조건에 맞는 값만 걸러내는 array_filter를 배워요.',
      goals: ['array_map으로 값 변환하기', 'array_filter로 조건에 맞는 값만 남기기', '화살표 함수(fn) 문법'],
      blocks: [
        {
          h: '값 변환하기: array_map',
          html: `<p><code>array_map(함수, 배열)</code>은 배열의 각 값에 함수를 적용한 새 배열을 만들어요. <code>fn($n) => $n * 2</code>는 화살표 함수(짧은 익명 함수) 문법이에요.</p>`,
          code: {
            label: 'array_map.php',
            lang: 'php',
            src: `<?php
$nums = [1, 2, 3];
$doubled = array_map(fn($n) => $n * 2, $nums);
echo implode(", ", $doubled);`,
            out: `2, 4, 6`
          }
        },
        {
          h: '조건에 맞는 값만 남기기: array_filter',
          html: `<p><code>array_filter(배열, 함수)</code>는 함수가 true를 반환하는 값만 남긴 새 배열을 만들어요.</p>`,
          code: {
            label: 'array_filter.php',
            lang: 'php',
            src: `<?php
$nums = [1, 2, 3, 4, 5, 6];
$evens = array_filter($nums, fn($n) => $n % 2 == 0);
echo implode(", ", $evens);`,
            out: `2, 4, 6`
          },
          after: `<div class="note"><b>정리</b> — implode(구분자, 배열)는 배열의 값들을 구분자로 이어붙인 하나의 문자열로 만들어줘요(출력 확인용으로 자주 써요).</div>`
        }
      ],
      quizGenerators: [
        () => {
          const nums = Array.from({ length: 4 }, () => randInt(1, 15));
          return {
            type: 'blank',
            q: `<code>$nums = [${nums.join(', ')}]; $doubled = array_map(fn($n) => $n * 2, $nums); echo implode(", ", $doubled);</code>를 실행하면? (쉼표와 공백으로 구분)`,
            prefix: '', suffix: '', accept: [nums.map(n => n * 2).join(', ')], placeholder: '숫자, 숫자, ...',
            why: `각 값을 2배로 만들면 ${nums.map(n => n * 2).join(', ')}이 돼요.`,
            hint: 'array_map은 각 값에 함수를 적용한 새 배열을 만들어요.'
          };
        },
        () => makeChoice(
          '<code>array_filter($nums, fn($n) => $n % 2 == 0)</code>이 하는 일은?',
          '$nums 중 짝수인 값만 남긴 새 배열을 만든다', ['$nums의 모든 값을 2배로 만든다', '$nums를 오름차순으로 정렬한다', '$nums의 값을 모두 삭제한다'],
          'array_filter는 함수가 true를 반환하는 값만 남겨요. 여기선 짝수 조건이에요.',
          '"거르다(filter)"라는 이름 그대로예요.'
        ),
        () => {
          const nums = Array.from({ length: 5 }, () => randInt(1, 20));
          const evens = nums.filter(n => n % 2 === 0);
          return {
            type: 'blank',
            q: `<code>$nums = [${nums.join(', ')}]; $evens = array_filter($nums, fn($n) => $n % 2 == 0); echo implode(", ", $evens);</code>를 실행하면? (쉼표와 공백으로 구분, 없으면 '빈 문자열')`,
            prefix: '', suffix: '', accept: [evens.length ? evens.join(', ') : '빈 문자열'], placeholder: '숫자, 숫자 또는 빈 문자열',
            why: evens.length ? `짝수만 남기면 ${evens.join(', ')}이에요.` : '짝수가 하나도 없어서 빈 문자열이 출력돼요.',
            hint: '2로 나눈 나머지가 0인 값만 남아요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>$nums</code>의 각 값을 제곱(<code>$n * $n</code>)으로 변환한 새 배열을 <code>$squared</code>에 담는 코드를 작성하세요.',
          starter: '',
          placeholder: '$squared = array_map(fn($n) => $n * $n, $nums);',
          accept: ['$squared = array_map(fn($n) => $n * $n, $nums);'],
          why: 'array_map(fn($n) => $n * $n, 배열)로 각 값을 제곱한 새 배열을 만들어요.',
          hint: '$squared = array_map(fn($n) => $n * $n, $nums); 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const nums = Array.from({ length: 5 }, () => randInt(1, 15));
        const result = nums.filter(n => n >= 5).map(n => n * 2);
        return {
          type: 'blank',
          q: `<code>$nums = [${nums.join(', ')}]; $result = array_map(fn($n) => $n * 2, array_filter($nums, fn($n) => $n >= 5)); echo implode(", ", $result);</code>를 실행하면? (쉼표와 공백으로 구분, 없으면 '빈 문자열')`,
          prefix: '', suffix: '', accept: [result.length ? result.join(', ') : '빈 문자열'], placeholder: '숫자, 숫자 또는 빈 문자열',
          why: result.length
            ? `5 이상인 값만 걸러서(${nums.filter(n => n >= 5).join(', ') || '없음'}) 각각 2배로 만들면 ${result.join(', ')}이에요.`
            : '5 이상인 값이 하나도 없어서 빈 문자열이 출력돼요.',
          hint: '먼저 array_filter로 5 이상만 남기고, 그 결과를 array_map으로 2배씩 만들어보세요.'
        };
      }
    },
    {
      id: 'typeComparison',
      title: '타입 비교: ==와 ===',
      ready: true,
      summary: '값만 비교하는 ==와, 값과 타입까지 비교하는 ===의 차이를 배워요.',
      goals: ['==는 타입을 자동 변환해서 비교', '===는 타입까지 정확히 같아야 함', '실무에서는 ===를 권장'],
      blocks: [
        {
          h: '==의 특징: 타입을 자동으로 맞춰서 비교',
          html: `<p><code>==</code>는 두 값의 타입이 달라도, 타입을 자동으로 맞춰서(형변환해서) 비교해요. 그래서 문자열 <code>"5"</code>와 정수 <code>5</code>도 같다고 나와요.</p>`,
          code: {
            label: 'loose_equal.php',
            lang: 'php',
            src: `<?php
var_dump("5" == 5);`,
            out: `bool(true)`
          }
        },
        {
          h: '===로 정확하게 비교하기',
          html: `<p><code>===</code>는 값뿐만 아니라 <b>타입까지</b> 정확히 같아야 true예요. <code>"5"</code>(문자열)와 <code>5</code>(정수)는 타입이 다르므로 false가 나와요.</p>`,
          code: {
            label: 'strict_equal.php',
            lang: 'php',
            src: `<?php
var_dump("5" === 5);`,
            out: `bool(false)`
          },
          after: `<div class="note"><b>정리</b> — ==의 예상치 못한 자동 변환 때문에 생기는 버그를 피하려고, 실무에서는 거의 항상 ===(그리고 !==)를 쓰는 걸 권장해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const num = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>var_dump("${num}" == ${num});</code>를 실행하면? (true/false)`,
            prefix: '', suffix: '', accept: ['true'], placeholder: 'true / false',
            why: `==는 타입을 자동으로 맞춰서 비교하므로, 문자열 "${num}"과 정수 ${num}은 값이 같아 true예요.`,
            hint: '==는 타입이 달라도 값만 같으면 true로 봐요.'
          };
        },
        () => makeChoice(
          '<code>==</code>와 <code>===</code>의 차이로 알맞은 것은?',
          '==는 타입을 자동으로 맞춰서 값만 비교하고, ===는 타입까지 정확히 같아야 한다', ['==와 ===는 완전히 같은 기능이다', '===는 문자열끼리만 비교할 수 있다', '==가 ===보다 항상 더 엄격하다'],
          '===가 더 엄격해서, 타입까지 같아야만 true가 나와요.',
          '등호가 하나 더 있는 쪽(===)이 "더 엄격하게" 비교한다고 기억하세요.'
        ),
        () => {
          const num = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>var_dump("${num}" === ${num});</code>를 실행하면? (true/false)`,
            prefix: '', suffix: '', accept: ['false'], placeholder: 'true / false',
            why: `===는 타입까지 비교하는데, 문자열 "${num}"과 정수 ${num}은 타입이 다르므로 false예요.`,
            hint: '===는 값이 같아도 타입이 다르면 false예요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>$a</code>와 <code>$b</code>가 값과 타입까지 정확히 같은지 확인해서 결과를 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'var_dump($a === $b);',
          accept: ['var_dump($a === $b);'],
          why: '===는 값과 타입이 모두 같아야 true를 반환해요.',
          hint: 'var_dump($a === $b); 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const useStrings = Math.random() < 0.5;
        const num = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>$a = ${useStrings ? `"${num}"` : num}; $b = ${num};</code>일 때, <code>var_dump($a === $b);</code>의 결과는? (true/false)`,
          prefix: '', suffix: '', accept: [useStrings ? 'false' : 'true'], placeholder: 'true / false',
          why: useStrings
            ? `$a는 문자열, $b는 정수라서 타입이 달라 false예요.`
            : `$a와 $b 모두 정수이고 값도 같으므로 true예요.`,
          hint: '===는 값뿐만 아니라 타입도 같은지 확인해요.'
        };
      }
    },
    {
      id: 'ternaryNullCoalesce',
      title: '삼항 연산자와 null 병합 연산자',
      ready: true,
      summary: '짧은 조건식을 만드는 삼항 연산자(?:)와, null일 때 기본값을 주는 null 병합 연산자(??)를 배워요.',
      goals: ['조건 ? 참 : 거짓 문법', 'null 병합 연산자 ??', '값이 없어도 안전하게 기본값 쓰기'],
      blocks: [
        {
          h: '짧은 조건식: 삼항 연산자',
          html: `<p><code>조건 ? 참일때값 : 거짓일때값</code>은 if/else를 한 줄로 줄여 쓰는 방법이에요.</p>`,
          code: {
            label: 'ternary.php',
            lang: 'php',
            src: `<?php
$age = 17;
$status = ($age >= 18) ? "성인" : "미성년자";
echo $status;`,
            out: `미성년자`
          }
        },
        {
          h: '값이 없을 때 기본값: ??',
          html: `<p><code>??</code>(null 병합 연산자)는 왼쪽 값이 <code>null</code>(또는 존재하지 않으면)이면 오른쪽 기본값을 써요. 값이 있을지 없을지 모르는 상황(폼 입력값 등)에서 아주 자주 써요.</p>`,
          code: {
            label: 'null_coalesce.php',
            lang: 'php',
            src: `<?php
$name = $_GET['name'] ?? "손님";
echo $name;`
          },
          after: `<div class="note"><b>정리</b> — ??는 "값이 없으면 이거라도 써라"는 뜻의 안전장치예요. isset()과 삼항 연산자를 합친 것과 비슷한 효과예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const age = randInt(14, 22);
          const isAdult = age >= 18;
          return {
            type: 'blank',
            q: `<code>$age = ${age}; $status = ($age >= 18) ? "성인" : "미성년자"; echo $status;</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [isAdult ? '성인' : '미성년자'], placeholder: '출력 결과',
            why: `${age}는 18 ${isAdult ? '이상이므로' : '미만이므로'} "${isAdult ? '성인' : '미성년자'}"가 출력돼요.`,
            hint: '삼항 연산자는 조건이 참이면 첫 번째 값, 거짓이면 두 번째 값이에요.'
          };
        },
        () => makeChoice(
          '<code>$value ?? "기본값"</code>에서 <code>??</code>의 역할은?',
          '$value가 null이면 "기본값"을, 아니면 $value를 그대로 쓴다', ['$value가 null이 아니면 항상 "기본값"을 쓴다', '$value와 "기본값"을 이어붙인다', '$value를 항상 문자열로 바꾼다'],
          '??는 왼쪽이 null일 때만 오른쪽 기본값을 대신 써요.',
          '"null이면 병합(대체)한다"는 이름 그대로예요.'
        ),
        () => {
          const hasValue = Math.random() < 0.5;
          const val = pick(['지수', '민준']);
          return {
            type: 'blank',
            q: `<code>$name = ${hasValue ? `"${val}"` : 'null'}; echo $name ?? "손님";</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [hasValue ? val : '손님'], placeholder: '출력 결과',
            why: hasValue
              ? `$name이 null이 아니므로 그 값 "${val}"이 그대로 출력돼요.`
              : '$name이 null이므로 ?? 뒤의 기본값 "손님"이 출력돼요.',
            hint: '??는 왼쪽이 null일 때만 오른쪽 기본값을 써요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>$nickname</code>이 null이면 <code>"익명"</code>을 대신 쓰는 코드를 한 줄로 작성하세요.',
          starter: '',
          placeholder: '$name = $nickname ?? "익명";',
          accept: ['$name = $nickname ?? "익명";'],
          why: '??로 null일 때의 기본값을 지정해요.',
          hint: '$name = $nickname ?? "익명"; 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const age = randInt(14, 22);
        const isAdult = age >= 18;
        const hasNickname = Math.random() < 0.5;
        const nickname = pick(['코더', '개발자']);
        return {
          type: 'blank',
          q: `<code>$age = ${age}; $status = ($age >= 18) ? "성인" : "미성년자"; $nickname = ${hasNickname ? `"${nickname}"` : 'null'}; echo $status . ": " . ($nickname ?? "이름없음");</code>을 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`${isAdult ? '성인' : '미성년자'}: ${hasNickname ? nickname : '이름없음'}`], placeholder: '출력 결과',
          why: `상태는 "${isAdult ? '성인' : '미성년자'}"이고, 닉네임은 ${hasNickname ? `"${nickname}"` : 'null이라 "이름없음"'}이 쓰여요.`,
          hint: '삼항 연산자와 ??를 각각 따로 계산해보세요.'
        };
      }
    },
    {
      id: 'switchMatch',
      title: 'switch와 match',
      ready: true,
      summary: '여러 조건을 깔끔하게 나누는 switch문과, PHP 8의 더 안전한 match 표현식을 배워요.',
      goals: ['switch/case/break', 'match 표현식(PHP 8)', 'match는 ===로 비교하고 값을 반환함'],
      blocks: [
        {
          h: '여러 경우 나누기: switch',
          html: `<p><code>switch</code>는 각 <code>case</code> 끝에 <code>break</code>가 없으면 다음 case로 계속 넘어가버려요(fallthrough) — 실수하기 쉬운 부분이에요.</p>`,
          code: {
            label: 'switch_basic.php',
            lang: 'php',
            src: `<?php
$day = 3;
switch ($day) {
    case 1:
        echo "월요일";
        break;
    case 2:
        echo "화요일";
        break;
    default:
        echo "다른 요일";
}`,
            out: `다른 요일`
          }
        },
        {
          h: '더 안전한 대안: match (PHP 8+)',
          html: `<p><code>match</code>는 <code>break</code>가 필요 없고(자동으로 안 넘어가요), <code>===</code>로 정확히 비교하며, 값을 바로 반환해서 변수에 담을 수 있어요 — switch보다 실수할 여지가 적어요.</p>`,
          code: {
            label: 'match_basic.php',
            lang: 'php',
            src: `<?php
$day = 3;
$name = match ($day) {
    1 => "월요일",
    2 => "화요일",
    default => "다른 요일",
};
echo $name;`,
            out: `다른 요일`
          },
          after: `<div class="note"><b>정리</b> — 새 코드를 짤 때는 switch보다 match를 쓰는 걸 권장하는 경우가 많아요. break를 깜빡하는 실수 자체가 안 생기기 때문이에요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>$day = 1; switch ($day) { case 1: echo "월요일"; case 2: echo "화요일"; break; default: echo "다른 요일"; }</code>를 실행하면? (그대로 입력, break가 1번 case에 없어요)`,
          prefix: '', suffix: '', accept: ['월요일화요일'], placeholder: '출력 결과',
          why: 'case 1에 break가 없어서 case 2로 그대로 넘어가(fallthrough) "월요일"과 "화요일"이 모두 출력돼요.',
          hint: 'break가 없으면 다음 case도 계속 실행돼요.'
        }),
        () => makeChoice(
          'match와 switch의 차이로 알맞은 것은?',
          'match는 break가 필요 없고 ===로 비교하며 값을 바로 반환한다', ['match는 switch보다 항상 느리다', 'match는 문자열만 비교할 수 있다', 'switch는 값을 반환할 수 있고 match는 못 한다'],
          'match는 자동으로 다음 case로 안 넘어가고, 정확한 타입 비교(===)를 하며, 결과를 변수에 바로 담을 수 있어요.',
          'switch의 break 깜빡임 문제를 match가 근본적으로 없앴어요.'
        ),
        () => {
          const day = randInt(1, 4);
          const names = { 1: '월요일', 2: '화요일', 3: '기타1', 4: '기타2' };
          const expected = day <= 2 ? names[day] : '다른 요일';
          return {
            type: 'blank',
            q: `<code>$day = ${day}; $name = match ($day) { 1 => "월요일", 2 => "화요일", default => "다른 요일" }; echo $name;</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [expected], placeholder: '출력 결과',
            why: `$day가 ${day}이므로 ${day <= 2 ? `해당 case가 실행되어 "${expected}"` : `일치하는 case가 없어 default인 "${expected}"`}가 출력돼요.`,
            hint: '$day 값과 일치하는 case를 찾아보세요. 없으면 default예요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>$grade</code>(1, 2, 3 중 하나)에 따라 "초급", "중급", "고급"을(그 외엔 "알 수 없음") 반환하는 <code>match</code> 표현식을 작성해서 <code>$level</code>에 담으세요.',
          starter: '',
          rows: 6,
          placeholder: '$level = match ($grade) {\n    1 => "초급",\n    2 => "중급",\n    3 => "고급",\n    default => "알 수 없음",\n};',
          accept: ['$level = match ($grade) {\n    1 => "초급",\n    2 => "중급",\n    3 => "고급",\n    default => "알 수 없음",\n};'],
          why: 'match ($값) { 조건 => 결과, ..., default => 기본결과 } 형태로 작성해요.',
          hint: 'match ($grade) { 1 => "초급", 2 => "중급", 3 => "고급", default => "알 수 없음" }; 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const day = randInt(1, 5);
        const names = { 1: '월', 2: '화', 3: '수', 4: '목' };
        const expected = names[day] || '기타';
        return {
          type: 'blank',
          q: `<code>$day = ${day}; $name = match ($day) { 1 => "월", 2 => "화", 3 => "수", 4 => "목", default => "기타" }; echo $name;</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [expected], placeholder: '출력 결과',
          why: `$day(${day})와 일치하는 case가 ${names[day] ? '있어서 그 값' : '없어서 default'}인 "${expected}"가 출력돼요.`,
          hint: '$day 값에 맞는 case를 찾고, 없으면 default를 확인해보세요.'
        };
      }
    },
    {
      id: 'classesObjects',
      title: '클래스와 객체',
      ready: true,
      summary: 'PHP에서 객체를 만드는 클래스의 기본 문법을 배워요.',
      goals: ['class로 클래스 정의', 'new로 객체 만들기', '->로 프로퍼티·메서드 접근하기'],
      blocks: [
        {
          h: '클래스 정의하고 객체 만들기',
          html: `<p><code>class</code>로 클래스를 만들고, <code>new</code>로 실제 객체(인스턴스)를 만들어요. 객체의 프로퍼티나 메서드에 접근할 땐 <code>-&gt;</code>를 써요.</p>`,
          code: {
            label: 'class_basic.php',
            lang: 'php',
            src: `<?php
class Student {
    public $name;
    public $age;
}

$s = new Student();
$s->name = "지수";
$s->age = 17;
echo $s->name . " " . $s->age;`,
            out: `지수 17`
          }
        },
        {
          h: '메서드 추가하기',
          html: `<p>클래스 안의 함수를 메서드라고 해요. 메서드 안에서 <code>$this</code>는 "이 메서드를 호출한 객체 자기 자신"을 가리켜요.</p>`,
          code: {
            label: 'method_basic.php',
            lang: 'php',
            src: `<?php
class Student {
    public $name;

    public function greet() {
        return $this->name . "입니다";
    }
}

$s = new Student();
$s->name = "지수";
echo $s->greet();`,
            out: `지수입니다`
          },
          after: `<div class="note"><b>정리</b> — $this는 "지금 이 코드를 실행하고 있는 바로 그 객체"를 가리켜요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>class Student { public $name; public $age; }</code>이고 <code>$s = new Student(); $s->name = "${name}"; $s->age = ${age}; echo $s->name . " " . $s->age;</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${name} ${age}`], placeholder: '출력 결과',
            why: `$s->name과 $s->age에 저장한 값을 그대로 이어붙여서 "${name} ${age}"가 돼요.`,
            hint: '->로 객체의 프로퍼티에 접근해요.'
          };
        },
        () => makeChoice(
          '<code>-&gt;</code>(화살표)의 역할로 알맞은 것은?',
          '객체의 프로퍼티나 메서드에 접근한다', ['두 숫자를 비교한다', '배열의 값을 꺼낸다', '함수를 정의한다'],
          '$s->name, $s->greet()처럼 객체 뒤에 ->를 붙여 그 안의 것에 접근해요.',
          '점(.)을 쓰는 다른 언어와 달리, PHP는 객체 접근에 ->를 써요.'
        ),
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>class Student { public $name; public function greet() { return $this->name . "입니다"; } }</code>이고 <code>$s = new Student(); $s->name = "${name}"; echo $s->greet();</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${name}입니다`], placeholder: '결과 문자열',
            why: `$this->name은 이 객체의 name("${name}")을 가리키므로 "${name}입니다"가 돼요.`,
            hint: '$this는 메서드를 호출한 객체 자신을 가리켜요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>$title</code>(public) 프로퍼티를 가지는 <code>Book</code> 클래스를 정의하세요.',
          starter: '',
          rows: 3,
          placeholder: 'class Book {\n    public $title;\n}',
          accept: ['class Book {\n    public $title;\n}'],
          why: 'class 이름 { public $프로퍼티; } 형태로 클래스를 정의해요.',
          hint: 'class Book { public $title; } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        return {
          type: 'blank',
          q: `<code>class Student { public $name; public function greet() { return "안녕, " . $this->name . "!"; } }</code>이고 <code>$s = new Student(); $s->name = "${name}"; echo $s->greet();</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`안녕, ${name}!`], placeholder: '결과 문자열',
          why: `$this->name이 "${name}"이므로 "안녕, ${name}!"가 반환돼요.`,
          hint: '$this->name 자리에 실제 값을 넣어보세요.'
        };
      }
    },
    {
      id: 'constructorsProperties',
      title: '생성자와 프로퍼티',
      ready: true,
      summary: '객체가 만들어질 때 자동으로 실행되는 생성자와, 접근 제한자를 배워요.',
      goals: ['__construct로 생성자 만들기', 'public/private으로 접근 제한하기', '객체 생성과 동시에 값 채우기'],
      blocks: [
        {
          h: '생성자: __construct',
          html: `<p><code>__construct</code>는 <code>new</code>로 객체를 만드는 순간 자동으로 실행되는 특별한 메서드예요. 객체를 만들면서 필요한 값을 바로 채워 넣을 때 써요.</p>`,
          code: {
            label: 'constructor.php',
            lang: 'php',
            src: `<?php
class Student {
    public $name;
    public $age;

    public function __construct($name, $age) {
        $this->name = $name;
        $this->age = $age;
    }
}

$s = new Student("지수", 17);
echo $s->name . " " . $s->age;`,
            out: `지수 17`
          }
        },
        {
          h: 'private으로 숨기기',
          html: `<p><code>private</code> 프로퍼티는 클래스 밖에서 직접 <code>$s->ssn</code>처럼 접근할 수 없어요. <code>public</code>은 어디서든 접근 가능하고, <code>private</code>는 클래스 내부에서만 접근할 수 있어요.</p>`,
          code: {
            label: 'private_prop.php',
            lang: 'php',
            src: `<?php
class Student {
    private $ssn;

    public function __construct($ssn) {
        $this->ssn = $ssn;
    }
}`
          },
          after: `<div class="note"><b>정리</b> — 생성자에서 값을 바로 채워 넣으면, 객체를 만들자마자 필요한 값이 다 준비된 "완전한" 상태로 시작할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>class Student { public $name; public $age; public function __construct($name, $age) { $this->name = $name; $this->age = $age; } }</code>이고 <code>$s = new Student("${name}", ${age}); echo $s->name . " " . $s->age;</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${name} ${age}`], placeholder: '출력 결과',
            why: `생성자가 넘겨받은 값을 그대로 프로퍼티에 저장해서 "${name} ${age}"가 출력돼요.`,
            hint: 'new Student(...)로 넘긴 값이 생성자의 매개변수로 들어가요.'
          };
        },
        () => makeChoice(
          '<code>__construct</code>가 실행되는 시점은?',
          '<code>new</code>로 그 클래스의 객체를 만드는 바로 그 순간', ['객체가 삭제될 때', '프로그램이 시작될 때 한 번만', '메서드를 명시적으로 호출할 때만'],
          '__construct는 new로 객체가 만들어지는 순간 자동으로 실행돼요.',
          '"생성자(constructor)"라는 이름 그대로, 객체가 생성될 때 실행돼요.'
        ),
        () => makeChoice(
          '<code>private</code> 프로퍼티의 특징으로 알맞은 것은?',
          '클래스 내부에서만 접근할 수 있고, 클래스 밖에서 $객체->프로퍼티로 직접 접근할 수 없다', ['public보다 항상 더 빠르게 동작한다', '값을 절대 바꿀 수 없다', '오직 static 메서드에서만 쓸 수 있다'],
          'private은 그 클래스 내부 코드에서만 접근 가능하고, 외부에서는 직접 접근이 막혀요.',
          '"개인적인(private)"이라는 이름처럼, 바깥에는 숨겨져요.'
        ),
        () => ({
          type: 'code',
          q: '<code>$title</code>을 매개변수로 받아 프로퍼티에 저장하는 생성자를 가진 <code>Book</code> 클래스를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'class Book {\n    public $title;\n\n    public function __construct($title) {\n        $this->title = $title;\n    }\n}',
          accept: ['class Book {\n    public $title;\n\n    public function __construct($title) {\n        $this->title = $title;\n    }\n}'],
          why: '__construct($title) { $this->title = $title; }로 생성 시 값을 채워넣어요.',
          hint: 'public function __construct($title) { $this->title = $title; }를 클래스 안에 넣으세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>class Student { public $name; public $age; public function __construct($name, $age) { $this->name = $name; $this->age = $age; } public function isAdult() { return $this->age >= 18; } }</code>이고 <code>$s = new Student("${name}", ${age}); var_dump($s->isAdult());</code>를 실행하면? (true/false)`,
          prefix: '', suffix: '', accept: age >= 18 ? ['true'] : ['false'], placeholder: 'true / false',
          why: `age(${age})가 18 ${age >= 18 ? '이상이므로' : '미만이므로'} 결과는 ${age >= 18 ? 'true' : 'false'}예요.`,
          hint: '생성자에서 저장된 age 값을 기준으로 판단해요.'
        };
      }
    },
    {
      id: 'inheritancePhp',
      title: '상속',
      ready: true,
      summary: '이미 있는 클래스를 확장해서 새 클래스를 만드는 상속을 배워요.',
      goals: ['extends로 상속받기', '부모의 프로퍼티·메서드 물려받기', '메서드 재정의(오버라이드)'],
      blocks: [
        {
          h: 'extends로 상속받기',
          html: `<p><code>class Dog extends Animal</code>이라고 하면, Dog는 Animal의 프로퍼티와 메서드를 그대로 물려받아요.</p>`,
          code: {
            label: 'inheritance_basic.php',
            lang: 'php',
            src: `<?php
class Animal {
    public $name;

    public function __construct($name) {
        $this->name = $name;
    }

    public function speak() {
        return $this->name . "가 소리를 냅니다";
    }
}

class Dog extends Animal {
}

$d = new Dog("멍멍이");
echo $d->speak();`,
            out: `멍멍이가 소리를 냅니다`
          }
        },
        {
          h: '메서드 다시 정의하기: 오버라이드',
          html: `<p>자식 클래스에서 같은 이름의 메서드를 다시 정의하면(오버라이드), 부모의 것 대신 자식의 것이 쓰여요.</p>`,
          code: {
            label: 'override_basic.php',
            lang: 'php',
            src: `<?php
class Dog extends Animal {
    public function speak() {
        return $this->name . "가 멍멍 짖습니다";
    }
}

$d = new Dog("멍멍이");
echo $d->speak();`,
            out: `멍멍이가 멍멍 짖습니다`
          },
          after: `<div class="note"><b>정리</b> — 상속은 "이미 있는 걸 그대로 물려받고, 필요한 부분만 새로 정의"할 수 있게 해줘서 코드 중복을 줄여줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['멍멍이', '나비', '토순이']);
          return {
            type: 'blank',
            q: `<code>class Animal { public $name; public function __construct($name) { $this->name = $name; } public function speak() { return $this->name . "가 소리를 냅니다"; } } class Dog extends Animal { }</code>이고 <code>$d = new Dog("${name}"); echo $d->speak();</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${name}가 소리를 냅니다`], placeholder: '결과 문자열',
            why: `Dog가 Animal을 상속받아 speak()를 그대로 물려받으므로 "${name}가 소리를 냅니다"가 돼요.`,
            hint: 'Dog는 Animal의 메서드를 그대로 쓸 수 있어요.'
          };
        },
        () => makeChoice(
          '<code>class Dog extends Animal</code>의 의미로 알맞은 것은?',
          'Dog가 Animal의 프로퍼티와 메서드를 물려받는다', ['Dog와 Animal이 서로 아무 관계가 없어진다', 'Animal이 Dog의 기능을 물려받는다', 'Dog가 Animal을 완전히 대체해서 없앤다'],
          'extends는 "이 클래스를 상속받는다"는 뜻으로, 부모(Animal)의 것을 물려받아요.',
          '"확장하다(extends)"라는 이름처럼, 기존 것을 바탕으로 더 넓혀요.'
        ),
        () => {
          const name = pick(['나비', '토순이', '멍멍이']);
          return {
            type: 'blank',
            q: `<code>class Dog extends Animal { public function speak() { return $this->name . "가 멍멍 짖습니다"; } }</code>이고 <code>$d = new Dog("${name}"); echo $d->speak();</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${name}가 멍멍 짖습니다`], placeholder: '결과 문자열',
            why: `Dog가 speak()를 재정의했으므로, 부모(Animal)의 것 대신 이 새 메서드가 실행되어 "${name}가 멍멍 짖습니다"가 돼요.`,
            hint: '자식 클래스에서 다시 정의한 메서드가 부모의 것을 덮어써요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>Animal</code>을 상속받는 <code>Cat</code> 클래스를(내용은 비워두고) 선언하세요.',
          starter: '',
          placeholder: 'class Cat extends Animal {\n}',
          accept: ['class Cat extends Animal {\n}'],
          why: 'class 이름 extends 부모클래스 { } 형태로 상속받아요.',
          hint: 'class Cat extends Animal { } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const name = pick(['멍멍이', '나비']);
        const overridden = Math.random() < 0.5;
        const expected = overridden ? `${name}가 멍멍 짖습니다` : `${name}가 소리를 냅니다`;
        return {
          type: 'blank',
          q: `<code>class Animal { public $name; public function __construct($name) { $this->name = $name; } public function speak() { return $this->name . "가 소리를 냅니다"; } }</code>이고 <code>class Dog extends Animal ${overridden ? '{ public function speak() { return $this->name . "가 멍멍 짖습니다"; } }' : '{ }'}</code>일 때, <code>(new Dog("${name}"))->speak()</code>의 결과는? (그대로 입력)`,
          prefix: '', suffix: '', accept: [expected], placeholder: '결과 문자열',
          why: overridden
            ? 'Dog가 speak()를 재정의했으므로 그 버전이 실행돼요.'
            : 'Dog가 speak()를 재정의하지 않았으므로 부모(Animal)의 speak()가 그대로 쓰여요.',
          hint: 'Dog 클래스 안에 speak() 메서드가 새로 정의되어 있는지 확인해보세요.'
        };
      }
    },
    {
      id: 'interfacesPhp',
      title: '인터페이스',
      ready: true,
      summary: '서로 다른 클래스가 같은 방식으로 다뤄질 수 있게 해주는 인터페이스를 배워요.',
      goals: ['interface 정의', 'implements로 구현하기', '인터페이스 타입으로 여러 클래스 다루기'],
      blocks: [
        {
          h: '약속을 정의하는 interface',
          html: `<p><code>interface</code>는 "이 메서드를 반드시 만들어야 한다"는 약속이에요. <code>implements</code>로 그 약속을 지키겠다고 명시적으로 선언해요.</p>`,
          code: {
            label: 'interface_basic.php',
            lang: 'php',
            src: `<?php
interface Shape {
    public function area(): float;
}

class Circle implements Shape {
    public $radius;

    public function __construct($radius) {
        $this->radius = $radius;
    }

    public function area(): float {
        return 3.14 * $this->radius * $this->radius;
    }
}`
          }
        },
        {
          h: '여러 타입을 같은 방식으로 다루기',
          html: `<p><code>Shape</code> 타입으로 매개변수를 받으면, 그게 <code>Circle</code>이든 <code>Rectangle</code>이든 상관없이 <code>area()</code>를 호출할 수 있어요.</p>`,
          code: {
            label: 'interface_poly.php',
            lang: 'php',
            src: `<?php
class Rectangle implements Shape {
    public $width, $height;

    public function __construct($width, $height) {
        $this->width = $width;
        $this->height = $height;
    }

    public function area(): float {
        return $this->width * $this->height;
    }
}

function printArea(Shape $shape) {
    echo $shape->area();
}

printArea(new Circle(2));
printArea(new Rectangle(3, 4));`,
            out: `12.5612`
          },
          after: `<div class="note"><b>정리</b> — 새로운 도형(클래스)을 추가해도, area() 메서드만 구현하면 printArea 함수는 전혀 고칠 필요가 없어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const r = randInt(1, 5);
          const area = (3.14 * r * r).toFixed(2);
          return {
            type: 'blank',
            q: `<code>class Circle implements Shape { public $radius; public function __construct($radius) { $this->radius = $radius; } public function area(): float { return 3.14 * $this->radius * $this->radius; } }</code>이고 <code>(new Circle(${r}))->area()</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [area, String(parseFloat(area))], placeholder: '숫자',
            why: `3.14 × ${r} × ${r} = ${area}예요.`,
            hint: '반지름의 제곱에 3.14를 곱해보세요.'
          };
        },
        () => makeChoice(
          '<code>class Circle implements Shape</code>에서 <code>implements</code>의 역할은?',
          'Circle이 Shape 인터페이스의 약속(메서드)을 구현하겠다고 명시적으로 선언한다', ['Circle을 Shape로 이름을 바꾼다', 'Circle이 Shape를 상속받아 프로퍼티를 물려받는다', 'Shape 인터페이스를 삭제한다'],
          'implements는 "이 클래스가 그 인터페이스의 약속을 지킨다"는 걸 명시적으로 선언해요.',
          'PHP는 Go와 달리, 인터페이스 구현을 명시적으로 선언해야 해요.'
        ),
        () => {
          const w = randInt(2, 8), h = randInt(2, 8);
          return {
            type: 'blank',
            q: `<code>class Rectangle implements Shape { public function area(): float { return $this->width * $this->height; } }</code>이고 <code>(new Rectangle(${w}, ${h}))->area()</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(w * h)], placeholder: '숫자',
            why: `${w} × ${h} = ${w * h}예요.`,
            hint: 'width와 height를 곱해보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>Square</code>(<code>$side</code>) 클래스가 <code>Shape</code> 인터페이스를 구현하며, <code>area()</code>가 <code>$side * $side</code>를 반환하도록 작성하세요. (area 메서드만)',
          starter: '',
          rows: 3,
          placeholder: 'public function area(): float {\n    return $this->side * $this->side;\n}',
          accept: ['public function area(): float {\n    return $this->side * $this->side;\n}'],
          why: 'area() 메서드 안에서 side * side를 반환해요.',
          hint: 'public function area(): float { return $this->side * $this->side; } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const useCircle = Math.random() < 0.5;
        const r = randInt(1, 6);
        const w = randInt(2, 6), h = randInt(2, 6);
        const area = useCircle ? (3.14 * r * r).toFixed(2) : w * h;
        return {
          type: 'blank',
          q: `<code>function printArea(Shape $shape) { echo $shape->area(); }</code>일 때, <code>printArea(${useCircle ? `new Circle(${r})` : `new Rectangle(${w}, ${h})`});</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(area)], placeholder: '숫자',
          why: useCircle
            ? `Circle의 area()는 3.14 × ${r} × ${r} = ${area}예요.`
            : `Rectangle의 area()는 ${w} × ${h} = ${area}예요.`,
          hint: 'printArea는 넘겨받은 객체의 실제 area() 메서드를 호출해요.'
        };
      }
    },
    {
      id: 'staticMembers',
      title: '정적 프로퍼티와 메서드',
      ready: true,
      summary: '객체를 만들지 않고도 클래스 이름으로 바로 쓸 수 있는 static 프로퍼티·메서드를 배워요.',
      goals: ['static 프로퍼티 선언', 'ClassName::method()로 호출하기', '모든 객체가 공유하는 값'],
      blocks: [
        {
          h: '모든 객체가 공유하는 값: static',
          html: `<p><code>static</code> 프로퍼티는 객체마다 따로 있는 게 아니라, 클래스 전체에서 딱 하나만 존재하며 공유돼요. <code>self::</code>는 클래스 안에서 자기 자신의 static 멤버를 가리켜요.</p>`,
          code: {
            label: 'static_basic.php',
            lang: 'php',
            src: `<?php
class Counter {
    public static $count = 0;

    public static function increment() {
        self::$count++;
    }
}

Counter::increment();
Counter::increment();
echo Counter::$count;`,
            out: `2`
          },
          after: `<div class="note"><b>정리</b> — 객체를 통해 접근하는 <code>$this-&gt;</code>와 달리, static 멤버는 <code>클래스이름::</code>이나 클래스 내부에서 <code>self::</code>로 접근해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 8);
          return {
            type: 'blank',
            q: `<code>class Counter { public static $count = 0; public static function increment() { self::$count++; } }</code>이고 <code>Counter::increment()</code>를 ${n}번 호출한 뒤 <code>echo Counter::$count;</code>를 하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `increment를 ${n}번 부르면 static인 count가 그 횟수만큼 늘어나요.`,
            hint: 'static 프로퍼티는 모든 호출에서 공유되는 하나의 값이에요.'
          };
        },
        () => makeChoice(
          'static 프로퍼티의 특징으로 알맞은 것은?',
          '객체마다 따로 있는 게 아니라, 클래스 전체에서 하나만 존재하며 공유된다', ['객체를 만들 때마다 새로 초기화된다', 'private 프로퍼티와 완전히 같은 것이다', '메서드 안에서만 접근할 수 있다'],
          'static 프로퍼티는 그 클래스로 만든 모든 객체가 공유하는 하나의 값이에요.',
          '"정적인(static)"이라는 이름처럼, 객체와 상관없이 하나로 고정돼 있어요.'
        ),
        () => ({
          type: 'blank',
          q: `클래스 안에서 자기 자신의 static 프로퍼티나 메서드를 가리킬 때 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: '::$count', accept: ['self'], placeholder: '키워드',
          why: '<code>self::</code>는 클래스 내부에서 자기 자신의 static 멤버를 가리켜요.',
          hint: '$this->와 비슷하지만 static 멤버에 쓰는 키워드예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>static $total = 0;</code> 프로퍼티를 가지는 <code>Counter</code> 클래스에, <code>self::$total</code>을 1 늘리는 static 메서드 <code>add</code>를 작성하세요. (메서드만)',
          starter: '',
          rows: 3,
          placeholder: 'public static function add() {\n    self::$total++;\n}',
          accept: ['public static function add() {\n    self::$total++;\n}'],
          why: 'static 메서드 안에서 self::로 static 프로퍼티에 접근해 값을 늘려요.',
          hint: 'public static function add() { self::$total++; } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const calls1 = randInt(2, 5);
        const calls2 = randInt(1, 4);
        return {
          type: 'blank',
          q: `<code>class Counter { public static $count = 0; public static function increment() { self::$count++; } }</code>이고, 서로 다른 두 곳에서 <code>Counter::increment()</code>를 각각 ${calls1}번, ${calls2}번 호출했어요. 최종 <code>Counter::$count</code>는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(calls1 + calls2)], placeholder: '숫자',
          why: `static 프로퍼티는 어디서 호출하든 공유되므로, ${calls1} + ${calls2} = ${calls1 + calls2}이에요.`,
          hint: 'static 값은 호출한 곳이 어디든 상관없이 하나로 누적돼요.'
        };
      }
    },
    {
      id: 'formData',
      title: '폼 데이터 다루기: $_GET과 $_POST',
      ready: true,
      summary: 'HTML 폼에서 전송된 데이터를 받는 슈퍼글로벌 $_GET과 $_POST를 배워요.',
      goals: ['$_GET으로 URL 쿼리 파라미터 받기', '$_POST로 폼 제출 데이터 받기', 'isset()으로 값이 있는지 먼저 확인하기'],
      blocks: [
        {
          h: 'URL에 붙은 값 받기: $_GET',
          html: `<p><code>$_GET</code>은 URL 뒤에 <code>?키=값</code> 형태로 붙은 값들을 배열처럼 담고 있어요.</p>`,
          code: {
            label: 'get_basic.php',
            lang: 'php',
            src: `<?php
// URL이 page.php?name=지수 일 때
$name = $_GET['name'];
echo "안녕하세요, $name님!";`,
            out: `안녕하세요, 지수님!`
          }
        },
        {
          h: '폼 제출 데이터 받기: $_POST와 isset()',
          html: `<p><code>$_POST</code>는 폼을 <code>method="post"</code>로 제출했을 때 그 입력값들을 담아요. <code>isset()</code>으로 그 키가 실제로 존재하는지 먼저 확인하는 게 안전한 습관이에요(없는 키에 접근하면 경고가 나요).</p>`,
          code: {
            label: 'post_basic.php',
            lang: 'php',
            src: `<?php
if (isset($_POST['username'])) {
    echo "아이디: " . $_POST['username'];
} else {
    echo "제출된 데이터가 없어요";
}`
          },
          after: `<div class="note"><b>정리</b> — $_GET은 URL에 값이 그대로 보이고(주소창), $_POST는 폼 본문에 담겨 보이지 않아요. 비밀번호 같은 민감한 값은 항상 POST로 보내요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `URL이 <code>page.php?name=${name}</code>이고 <code>$name = $_GET['name']; echo "환영해요, $name!";</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`환영해요, ${name}!`], placeholder: '출력 결과',
            why: `$_GET['name']이 URL의 값 "${name}"을 담아오므로 "환영해요, ${name}!"가 출력돼요.`,
            hint: 'URL의 ?name=값 부분이 $_GET["name"]으로 들어와요.'
          };
        },
        () => makeChoice(
          '$_GET과 $_POST의 차이로 알맞은 것은?',
          '$_GET은 URL에 값이 그대로 드러나고, $_POST는 폼 본문에 담겨 겉으로 안 보인다', ['$_GET과 $_POST는 완전히 같은 기능이다', '$_POST만 배열 형태로 값을 담는다', '$_GET은 파일 업로드 전용이다'],
          '$_GET은 주소창의 ?키=값에서, $_POST는 폼을 제출할 때 본문에서 값을 가져와요.',
          '민감한 정보(비밀번호 등)를 $_GET으로 보내면 주소창에 그대로 노출돼요.'
        ),
        () => makeChoice(
          '<code>isset($_POST[\'username\'])</code>을 먼저 확인하는 이유는?',
          '그 키가 실제로 존재하는지 미리 확인해서, 없는 키에 접근할 때 나는 경고를 피하기 위해', ['항상 true를 반환하게 만들기 위해', '$_POST를 배열에서 문자열로 바꾸기 위해', '폼을 자동으로 다시 제출하기 위해'],
          'isset()은 그 키가 존재하는지(값이 설정되어 있는지) 확인해서, 없는 키 접근으로 인한 오류/경고를 막아줘요.',
          '폼이 아예 제출 안 됐을 수도 있으니, 먼저 확인하는 게 안전해요.'
        ),
        () => ({
          type: 'code',
          q: '<code>$_POST[\'email\']</code>이 존재하면 그 값을, 없으면 <code>"입력 없음"</code>을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'if (isset($_POST[\'email\'])) {\n    echo $_POST[\'email\'];\n} else {\n    echo "입력 없음";\n}',
          accept: ['if (isset($_POST[\'email\'])) {\n    echo $_POST[\'email\'];\n} else {\n    echo "입력 없음";\n}'],
          why: 'isset()으로 먼저 확인한 뒤, 있으면 값을 없으면 기본 메시지를 출력해요.',
          hint: 'if (isset($_POST["email"])) { ... } else { ... } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const hasValue = Math.random() < 0.5;
        const value = pick(['지수123', 'coder_min']);
        return {
          type: 'blank',
          q: `${hasValue ? `사용자가 아이디 "${value}"를 입력하고 폼을 제출했어요` : '사용자가 폼을 아예 제출하지 않았어요'}. <code>if (isset($_POST['username'])) { echo $_POST['username']; } else { echo "제출된 데이터가 없어요"; }</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [hasValue ? value : '제출된 데이터가 없어요'], placeholder: '출력 결과',
          why: hasValue
            ? `$_POST['username']에 값이 있으므로 "${value}"가 출력돼요.`
            : '폼을 제출하지 않아 $_POST에 값이 없으므로 "제출된 데이터가 없어요"가 출력돼요.',
          hint: 'isset()의 결과에 따라 if/else 중 어느 쪽이 실행될지 결정돼요.'
        };
      }
    },
    {
      id: 'sessionsCookies',
      title: '세션과 쿠키',
      ready: true,
      summary: '로그인 상태처럼 여러 페이지에 걸쳐 정보를 유지하는 세션과 쿠키를 배워요.',
      goals: ['session_start()로 세션 시작하기', '$_SESSION에 값 저장·읽기', 'setcookie로 쿠키 만들기'],
      blocks: [
        {
          h: '서버에 정보 저장하기: 세션',
          html: `<p><code>session_start()</code>는 세션 기능을 시작하는(또는 이미 있는 세션을 이어받는) 함수로, 세션을 쓰는 모든 페이지 맨 위에서 호출해야 해요. <code>$_SESSION</code>에 담은 값은 사용자가 다른 페이지로 이동해도 유지돼요(로그인 유지 등에 써요).</p>`,
          code: {
            label: 'session_basic.php',
            lang: 'php',
            src: `<?php
session_start();
$_SESSION['username'] = "지수";

// 다른 페이지에서
session_start();
echo $_SESSION['username'];`,
            out: `지수`
          }
        },
        {
          h: '사용자 브라우저에 저장하기: 쿠키',
          html: `<p>세션은 서버에, 쿠키는 사용자의 브라우저에 저장돼요. <code>setcookie(이름, 값, 만료시각)</code>으로 쿠키를 만들고, <code>time() + 3600</code>은 "지금부터 1시간 뒤"를 뜻해요.</p>`,
          code: {
            label: 'cookie_basic.php',
            lang: 'php',
            src: `<?php
setcookie("theme", "dark", time() + 3600);

// 나중에
echo $_COOKIE['theme'];`,
            out: `dark`
          },
          after: `<div class="note"><b>정리</b> — 세션은 "서버가 기억하는 정보"(비교적 민감한 정보에 안전), 쿠키는 "사용자 브라우저가 기억하는 정보"(설정값 등 가벼운 정보에 적합)라고 구분하면 편해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>session_start(); $_SESSION['username'] = "${name}";</code>를 실행한 뒤, 다른 페이지에서 <code>session_start(); echo $_SESSION['username'];</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [name], placeholder: '출력 결과',
            why: `세션에 저장한 값은 다른 페이지에서도 session_start() 이후 그대로 읽을 수 있어서 "${name}"이 출력돼요.`,
            hint: '$_SESSION에 저장한 값은 페이지를 이동해도 유지돼요.'
          };
        },
        () => makeChoice(
          '세션과 쿠키의 근본적인 차이로 알맞은 것은?',
          '세션은 서버에 저장되고, 쿠키는 사용자의 브라우저에 저장된다', ['세션은 브라우저에, 쿠키는 서버에 저장된다', '세션과 쿠키는 완전히 같은 저장 방식이다', '쿠키만 여러 페이지에서 값을 유지할 수 있다'],
          '세션 데이터는 서버 쪽에 보관되고, 쿠키는 사용자의 브라우저에 직접 저장돼요.',
          '"어디에 저장되는가"가 핵심 차이예요.'
        ),
        () => {
          const hours = pick([1, 2, 24]);
          return {
            type: 'blank',
            q: `쿠키를 지금부터 ${hours}시간 뒤에 만료되게 하려고 해요. 빈칸에 들어갈, 1시간을 초 단위로 나타낸 숫자를 쓰세요.`,
            prefix: `setcookie("theme", "dark", time() + ${hours} * `, suffix: ');', accept: ['3600'], placeholder: '숫자',
            why: '1시간은 3600초이므로, 시간 × 3600으로 초 단위 만료 시간을 계산해요.',
            hint: '1시간 = 60분 × 60초 = 3600초예요.'
          };
        },
        () => ({
          type: 'code',
          q: '세션을 시작하고, <code>$_SESSION[\'user_id\']</code>에 <code>42</code>를 저장하는 코드를 두 줄로 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'session_start();\n$_SESSION[\'user_id\'] = 42;',
          accept: ['session_start();\n$_SESSION[\'user_id\'] = 42;'],
          why: 'session_start()로 세션을 시작한 뒤, $_SESSION에 값을 저장해요.',
          hint: 'session_start(); 다음 줄에 $_SESSION["user_id"] = 42;를 쓰세요.'
        }),
      ],
      boss: () => {
        const useSession = Math.random() < 0.5;
        const value = pick(['dark', 'light']);
        return {
          type: 'blank',
          q: `${useSession ? `session_start(); $_SESSION['theme'] = "${value}";` : `setcookie("theme", "${value}", time() + 3600);`}를 실행한 뒤 다른 페이지로 이동했어요. 이 값을 다시 읽으려면 ${useSession ? '$_SESSION' : '$_COOKIE'}[?] 형태로 접근해야 하는데, 그 결과 값은 무엇일까요? (그대로 입력)`,
          prefix: '', suffix: '', accept: [value], placeholder: '값',
          why: `저장해둔 값 "${value}"를 그대로 다시 읽어올 수 있어요(${useSession ? '세션은 서버에' : '쿠키는 브라우저에'} 저장되어 있으니까요).`,
          hint: '세션이든 쿠키든, 저장해둔 값은 나중에 그대로 다시 꺼낼 수 있어요.'
        };
      }
    },
    {
      id: 'fileUpload',
      title: '파일 업로드 기초',
      ready: true,
      summary: '사용자가 폼으로 올린 파일을 서버에서 받는 $_FILES의 기본을 배워요.',
      goals: ['enctype="multipart/form-data"가 필요한 이유', '$_FILES로 업로드된 파일 정보 얻기', 'move_uploaded_file로 저장하기'],
      blocks: [
        {
          h: '파일 업로드 폼 만들기',
          html: `<p>파일을 업로드하는 폼은 반드시 <code>enctype="multipart/form-data"</code>를 지정해야 해요(안 하면 파일이 제대로 전송 안 돼요).</p>`,
          code: {
            label: 'upload_form.html',
            lang: 'html',
            src: `<form method="post" enctype="multipart/form-data">
    <input type="file" name="photo">
    <button type="submit">업로드</button>
</form>`
          }
        },
        {
          h: '서버에서 파일 받기: $_FILES',
          html: `<p><code>$_FILES['photo']</code>는 업로드된 파일의 정보(이름, 임시 저장 경로 등)를 담은 배열이에요. <code>move_uploaded_file</code>로 임시 경로에서 원하는 위치로 옮겨야 실제로 저장돼요.</p>`,
          code: {
            label: 'upload_handle.php',
            lang: 'php',
            src: `<?php
$fileName = $_FILES['photo']['name'];
$tmpPath = $_FILES['photo']['tmp_name'];
move_uploaded_file($tmpPath, "uploads/" . $fileName);`
          },
          after: `<div class="note"><b>정리</b> — 업로드된 파일은 아주 잠깐 임시 폴더에 있다가, move_uploaded_file로 옮기지 않으면 요청이 끝난 뒤 사라져요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `업로드된 파일의 원래 이름을 얻으려면, <code>$_FILES['photo']</code>의 어떤 키를 써야 할까요?`,
          prefix: "$_FILES['photo'][", suffix: ']', accept: ["'name'", '"name"'], placeholder: "'키'",
          why: `$_FILES['photo']['name']은 업로드된 파일의 원래 이름을 담고 있어요.`,
          hint: '"이름"을 뜻하는 영어 단어를 키로 써요.'
        }),
        () => makeChoice(
          '파일 업로드 폼에 <code>enctype="multipart/form-data"</code>가 필요한 이유는?',
          '이걸 지정하지 않으면 파일 데이터가 서버로 제대로 전송되지 않기 때문에', ['페이지 로딩 속도를 높이기 위해', '폼을 GET 방식으로 강제하기 위해', 'CSS 스타일을 적용하기 위해'],
          '파일처럼 텍스트가 아닌 데이터를 전송하려면 이 인코딩 방식을 지정해야 해요.',
          '일반 텍스트 폼과 파일 폼은 전송 방식 자체가 달라요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>move_uploaded_file($tmpPath, "uploads/" . $fileName);</code>가 하는 일을 설명하면? ("임시 저장 경로에 있던 업로드 파일을 지정한 위치로 옮긴다"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['임시 저장 경로에 있던 업로드 파일을 지정한 위치로 옮긴다'], placeholder: '설명',
          why: 'move_uploaded_file은 잠깐 있던 임시 파일을 원하는 폴더로 실제로 옮겨서 저장해요.',
          hint: '옮기지 않으면 임시 파일은 요청이 끝난 뒤 사라져요.'
        }),
        () => ({
          type: 'code',
          q: '<code>$_FILES[\'photo\']</code>에서 파일 이름을 꺼내 <code>$fileName</code>에 담는 코드를 한 줄로 작성하세요.',
          starter: '',
          placeholder: '$fileName = $_FILES[\'photo\'][\'name\'];',
          accept: ['$fileName = $_FILES[\'photo\'][\'name\'];'],
          why: "$_FILES['photo']['name']으로 업로드된 파일의 이름을 꺼내요.",
          hint: '$fileName = $_FILES["photo"]["name"]; 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const fileName = pick(['profile.jpg', 'resume.pdf', 'avatar.png']);
        return {
          type: 'blank',
          q: `<code>$_FILES['photo']['name']</code>이 <code>"${fileName}"</code>이고 <code>move_uploaded_file($_FILES['photo']['tmp_name'], "uploads/" . $_FILES['photo']['name']);</code>를 실행했어요. 파일이 최종적으로 저장되는 경로는? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`uploads/${fileName}`], placeholder: '경로',
          why: `"uploads/" 뒤에 파일 이름("${fileName}")이 이어붙어서 "uploads/${fileName}"이 돼요.`,
          hint: '"uploads/" 문자열과 파일 이름을 이어붙인 경로를 생각해보세요.'
        };
      }
    },
    {
      id: 'xssPrevention',
      title: 'htmlspecialchars로 XSS 막기',
      ready: true,
      summary: '사용자 입력을 그대로 출력했을 때 생기는 보안 문제(XSS)와, htmlspecialchars로 막는 법을 배워요.',
      goals: ['사용자 입력을 그대로 출력하면 생기는 위험(XSS)', 'htmlspecialchars로 특수문자 이스케이프하기', '출력 직전에 항상 이스케이프하는 습관'],
      blocks: [
        {
          h: '문제: 사용자 입력을 그대로 출력하면',
          html: `<p>사용자가 입력한 값에 HTML 태그나 스크립트가 들어있으면, 그대로 출력했을 때 브라우저가 그걸 진짜 코드로 실행해버릴 수 있어요. 이런 공격을 <b>XSS</b>(크로스 사이트 스크립팅)라고 해요.</p>`,
          code: {
            label: 'xss_problem.php',
            lang: 'php',
            src: `<?php
// 사용자가 입력한 값: <script>alert('해킹')</script>
$comment = $_POST['comment'];
echo $comment; // 그대로 출력하면 스크립트가 실행되어 버림!`
          }
        },
        {
          h: '해결: htmlspecialchars',
          html: `<p><code>htmlspecialchars</code>는 <code>&lt;</code>, <code>&gt;</code>, <code>"</code>, <code>'</code> 같은 HTML 특수문자를 <code>&amp;lt;</code>, <code>&amp;gt;</code> 같은 안전한 형태로 바꿔줘요. 그래서 브라우저가 그걸 태그가 아니라 "그냥 글자"로 보여줘요.</p>`,
          code: {
            label: 'xss_fix.php',
            lang: 'php',
            src: `<?php
$comment = $_POST['comment'];
echo htmlspecialchars($comment);
// <script>가 &lt;script&gt;로 바뀌어서 그냥 글자로만 보임`
          },
          after: `<div class="note"><b>정리</b> — 사용자 입력을 화면에 출력하기 직전에는 항상 htmlspecialchars를 거치는 게 안전한 습관이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'XSS(크로스 사이트 스크립팅)가 발생하는 대표적인 원인은?',
          '사용자가 입력한 값을 이스케이프 없이 그대로 화면에 출력하는 것', ['서버의 CPU 사용량이 너무 높은 것', 'PHP 버전이 너무 오래된 것', '데이터베이스 비밀번호가 짧은 것'],
          '사용자 입력에 담긴 <script> 같은 태그가 그대로 실행되면서 XSS가 발생해요.',
          '"입력을 그대로 믿고 출력한다"는 게 핵심 원인이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>htmlspecialchars</code>가 하는 일을 설명하면? ("HTML 특수문자를 안전한 형태로 바꿔서, 태그로 해석되지 않고 그냥 글자로 보이게 한다"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['HTML 특수문자를 안전한 형태로 바꿔서, 태그로 해석되지 않고 그냥 글자로 보이게 한다'], placeholder: '설명',
          why: 'htmlspecialchars는 <, >, " 같은 문자를 &lt;, &gt;, &quot; 같은 문자 코드로 바꿔서 안전하게 만들어요.',
          hint: '"특수문자(specialchars)"를 안전하게 바꾼다는 이름 그대로예요.'
        }),
        () => ({
          type: 'blank',
          q: `<code>$comment = "&lt;b&gt;안녕&lt;/b&gt;";</code>이고 <code>echo htmlspecialchars($comment);</code>를 실행하면, 브라우저 화면에는 어떻게 보일까요? ("<b>안녕</b>라는 글자가 그대로(굵게 처리되지 않고) 보인다"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['<b>안녕</b>라는 글자가 그대로(굵게 처리되지 않고) 보인다'], placeholder: '설명',
          why: 'htmlspecialchars가 <b>, </b>를 안전한 문자로 바꿔서, 브라우저가 이걸 태그가 아니라 순수한 글자로 보여줘요.',
          hint: '이스케이프된 태그는 더 이상 "진짜 태그"로 동작하지 않아요.'
        }),
        () => ({
          type: 'code',
          q: '<code>$comment</code>(사용자 입력)을 안전하게 이스케이프해서 출력하는 코드를 한 줄로 작성하세요.',
          starter: '',
          placeholder: 'echo htmlspecialchars($comment);',
          accept: ['echo htmlspecialchars($comment);'],
          why: '사용자 입력은 htmlspecialchars를 거쳐서 출력하는 게 안전해요.',
          hint: 'echo htmlspecialchars($comment); 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const usesEscape = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `사용자가 댓글로 <code>&lt;script&gt;alert(1)&lt;/script&gt;</code>를 입력했어요. 서버 코드가 <code>echo ${usesEscape ? 'htmlspecialchars($comment)' : '$comment'};</code>일 때, 브라우저에서 실제로 스크립트가 실행될까요? (예/아니오)`,
          prefix: '', suffix: '', accept: [usesEscape ? '아니오' : '예'], placeholder: '예 / 아니오',
          why: usesEscape
            ? 'htmlspecialchars가 태그를 안전한 문자로 바꿔서, 스크립트가 실행되지 않고 그냥 글자로만 보여요.'
            : '이스케이프 없이 그대로 출력하면, 브라우저가 <script> 태그를 진짜 코드로 실행해버려요.',
          hint: 'htmlspecialchars를 거쳤는지 아닌지가 실행 여부를 결정해요.'
        };
      }
    },
    {
      id: 'jsonPhp',
      title: 'JSON 인코딩과 디코딩',
      ready: true,
      summary: '배열을 JSON 문자열로 바꾸고, 반대로 되돌리는 방법을 배워요.',
      goals: ['json_encode로 배열을 JSON 문자열로', 'json_decode로 JSON을 다시 배열로', 'API 응답 만들 때 자주 쓰는 패턴'],
      blocks: [
        {
          h: '배열 → JSON: json_encode',
          html: `<p><code>json_encode(배열)</code>은 배열을 JSON 형식의 문자열로 바꿔줘요.</p>`,
          code: {
            label: 'json_encode.php',
            lang: 'php',
            src: `<?php
$student = ["name" => "지수", "age" => 17];
echo json_encode($student);`,
            out: `{"name":"지수","age":17}`
          }
        },
        {
          h: 'JSON → 배열: json_decode',
          html: `<p><code>json_decode</code>의 두 번째 인자로 <code>true</code>를 주면 연관 배열로, 안 주면(또는 false) 객체로 변환돼요. 배열로 다루는 게 더 익숙하면 <code>true</code>를 자주 써요.</p>`,
          code: {
            label: 'json_decode.php',
            lang: 'php',
            src: `<?php
$json = '{"name":"민준","age":16}';
$data = json_decode($json, true);
echo $data["name"] . " " . $data["age"];`,
            out: `민준 16`
          },
          after: `<div class="note"><b>정리</b> — API가 데이터를 주고받을 때 JSON 형식을 아주 많이 써서, json_encode/json_decode는 웹 개발에서 정말 자주 쓰는 함수예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>$student = ["name" => "${name}", "age" => ${age}]; echo json_encode($student);</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`{"name":"${name}","age":${age}}`], placeholder: '출력 결과',
            why: `배열의 키-값이 JSON 형식으로 그대로 옮겨져서 {"name":"${name}","age":${age}}가 돼요.`,
            hint: '연관 배열의 키가 JSON의 키(따옴표로 감싼)로 그대로 쓰여요.'
          };
        },
        () => makeChoice(
          '<code>json_decode($json, true)</code>에서 두 번째 인자 <code>true</code>의 의미는?',
          '결과를 연관 배열로 돌려받겠다는 뜻', ['JSON 문자열을 예쁘게 들여쓰기 하겠다는 뜻', 'JSON이 유효한지 검사만 하겠다는 뜻', '결과를 항상 정수로 변환하겠다는 뜻'],
          'true를 주면 객체 대신 연관 배열로 결과를 받을 수 있어요.',
          '생략하거나 false를 주면 대신 객체(stdClass)로 받아요.'
        ),
        () => {
          const name = pick(['서연', '도윤']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>$json = '{"name":"${name}","age":${age}}'; $data = json_decode($json, true); echo $data["name"] . " " . $data["age"];</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${name} ${age}`], placeholder: '출력 결과',
            why: `json_decode가 JSON을 배열로 되돌려서 $data["name"]과 $data["age"]로 값을 꺼낼 수 있어요.`,
            hint: 'JSON의 키가 배열의 키로 그대로 대응돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>$scores</code>(<code>["지수" => 90, "민준" => 85]</code>)를 JSON 문자열로 변환해서 출력하는 코드를 한 줄로 작성하세요.',
          starter: '',
          placeholder: 'echo json_encode($scores);',
          accept: ['echo json_encode($scores);'],
          why: 'json_encode(배열)로 배열을 JSON 문자열로 바꿔요.',
          hint: 'echo json_encode($scores); 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>$student = ["name" => "${name}", "age" => ${age}]; $json = json_encode($student); $back = json_decode($json, true); echo $back["name"];</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [name], placeholder: '출력 결과',
          why: `배열 → JSON → 배열로 왕복해도 값은 그대로 유지되어 "${name}"이 출력돼요.`,
          hint: 'encode 했다가 다시 decode해도 데이터 내용은 그대로예요.'
        };
      }
    },
    {
      id: 'pdoConnection',
      title: 'PDO로 데이터베이스 연결하기',
      ready: true,
      summary: 'PHP에서 데이터베이스에 연결하고 쿼리를 실행하는 PDO의 기본을 배워요.',
      goals: ['new PDO로 연결하기', 'query()로 SELECT 실행하기', 'fetchAll로 결과 가져오기'],
      blocks: [
        {
          h: '데이터베이스에 연결하기',
          html: `<p><code>new PDO(DSN, 사용자이름, 비밀번호)</code>로 데이터베이스에 연결해요. DSN(<code>mysql:host=...;dbname=...</code>)은 어떤 종류의 데이터베이스가 어디에 있는지를 나타내는 문자열이에요.</p>`,
          code: {
            label: 'pdo_connect.php',
            lang: 'php',
            src: `<?php
$pdo = new PDO("mysql:host=localhost;dbname=school", "root", "password");`
          }
        },
        {
          h: '쿼리 실행하고 결과 가져오기',
          html: `<p><code>query()</code>로 SQL을 실행하고, <code>fetchAll()</code>로 모든 결과 행을 배열로 한 번에 가져와요. 각 행은 연관 배열처럼 컬럼 이름으로 접근할 수 있어요.</p>`,
          code: {
            label: 'pdo_query.php',
            lang: 'php',
            src: `<?php
$stmt = $pdo->query("SELECT name, age FROM students");
$students = $stmt->fetchAll();

foreach ($students as $student) {
    echo $student['name'] . " ";
}`
          },
          after: `<div class="note"><b>정리</b> — PDO는 MySQL, SQLite 등 여러 종류의 데이터베이스를 비슷한 방식의 코드로 다룰 수 있게 해주는 PHP의 표준적인 방법이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>new PDO($dsn, $user, $password)</code>의 역할은?',
          '지정한 데이터베이스에 연결한다', ['새 데이터베이스를 삭제한다', 'HTML 페이지를 렌더링한다', '세션을 시작한다'],
          'PDO 객체를 만드는 건 곧 데이터베이스에 연결하는 과정이에요.',
          '"데이터 객체(Data Object)"에 연결한다는 이름이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>$stmt = $pdo->query("SELECT name FROM students"); $students = $stmt->fetchAll();</code>에서, 조회된 모든 행을 배열로 가져오는 메서드를 쓰세요.`,
          prefix: '', suffix: '', accept: ['fetchAll'], placeholder: '메서드 이름',
          why: '<code>fetchAll()</code>은 쿼리 결과의 모든 행을 배열로 한 번에 가져와요.',
          hint: '"모두(all) 가져오다(fetch)"라는 이름 그대로예요.'
        }),
        () => makeChoice(
          '<code>foreach ($students as $student) { echo $student[\'name\']; }</code>이 하는 일은?',
          '조회된 각 학생 행에서 name 컬럼 값을 하나씩 꺼내 출력한다', ['학생 수를 세어 출력한다', '학생 데이터를 데이터베이스에서 삭제한다', '첫 번째 학생만 반복해서 출력한다'],
          'fetchAll()로 받은 배열을 foreach로 순회하며 각 행의 컬럼 값에 접근해요.',
          '$students는 각 행이 연관 배열인 배열이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"mysql:host=localhost;dbname=shop"</code>에, 사용자 <code>"root"</code>, 비밀번호 <code>"1234"</code>로 PDO 연결을 만들어 <code>$pdo</code>에 담는 코드를 작성하세요.',
          starter: '',
          placeholder: '$pdo = new PDO("mysql:host=localhost;dbname=shop", "root", "1234");',
          accept: ['$pdo = new PDO("mysql:host=localhost;dbname=shop", "root", "1234");'],
          why: 'new PDO(DSN, 사용자, 비밀번호) 형태로 연결해요.',
          hint: '$pdo = new PDO("mysql:host=localhost;dbname=shop", "root", "1234"); 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const count = randInt(2, 6);
        return {
          type: 'blank',
          q: `<code>SELECT name FROM students</code> 쿼리 결과로 학생이 총 ${count}명 조회됐어요. <code>$students = $stmt->fetchAll(); foreach ($students as $student) { echo $student['name'] . " "; }</code>를 실행하면, <code>echo</code>는 총 몇 번 실행될까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(count)], placeholder: '숫자',
          why: `조회된 행 수(${count}개)만큼 foreach가 반복되어 echo도 ${count}번 실행돼요.`,
          hint: 'foreach는 배열의 원소 개수만큼 반복돼요.'
        };
      }
    },
    {
      id: 'preparedStatements',
      title: 'Prepared Statement로 SQL 인젝션 막기',
      ready: true,
      summary: '사용자 입력을 안전하게 쿼리에 넣는 Prepared Statement를 배워요.',
      goals: ['SQL 인젝션이 뭔지', 'prepare()와 execute()로 안전하게 값 넣기', '물음표(?) 자리표시자'],
      blocks: [
        {
          h: '문제: 사용자 입력을 쿼리에 직접 이어붙이면',
          html: `<p>사용자 입력을 SQL 문자열에 그대로 이어붙이면, 악의적인 입력으로 쿼리의 의미 자체가 바뀌어버릴 수 있어요. 이런 공격을 <b>SQL 인젝션</b>이라고 해요.</p>`,
          code: {
            label: 'sql_injection_risk.php',
            lang: 'php',
            src: `<?php
$name = $_GET['name']; // 사용자가 입력: ' OR '1'='1
$sql = "SELECT * FROM students WHERE name = '$name'";
// 의도와 다르게 모든 학생 정보가 조회될 수 있음!`
          }
        },
        {
          h: '해결: Prepared Statement',
          html: `<p><code>prepare()</code>로 물음표(자리표시자)가 있는 쿼리 틀을 미리 준비하고, <code>execute()</code>에 실제 값을 배열로 넘기면 PHP가 안전하게 그 값을 끼워 넣어요(SQL 코드로 해석되지 않고 순수한 값으로만 처리돼요).</p>`,
          code: {
            label: 'prepared_statement.php',
            lang: 'php',
            src: `<?php
$stmt = $pdo->prepare("SELECT * FROM students WHERE name = ?");
$stmt->execute([$name]);
$students = $stmt->fetchAll();`
          },
          after: `<div class="note"><b>정리</b> — 사용자 입력이 들어가는 쿼리는 항상 Prepared Statement를 쓰는 게 실무의 기본이에요. 문자열을 직접 이어붙이는 방식은 절대 쓰면 안 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'SQL 인젝션이 발생하는 대표적인 원인은?',
          '사용자 입력을 SQL 쿼리 문자열에 그대로 이어붙이는 것', ['데이터베이스 서버를 재시작하는 것', 'PDO를 사용하는 것', '변수 이름을 짧게 짓는 것'],
          '사용자가 입력한 값에 SQL 구문이 섞여 있으면, 그대로 이어붙일 때 쿼리의 의미가 바뀌어버릴 수 있어요.',
          '"입력을 코드처럼 취급해버린다"는 게 핵심 문제예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>$stmt = $pdo->prepare("SELECT * FROM students WHERE name = ?");</code> 다음에, 실제 값을 안전하게 끼워 넣어 쿼리를 실행하는 메서드를 쓰세요.`,
          prefix: '$stmt->', suffix: '([$name]);', accept: ['execute'], placeholder: '메서드 이름',
          why: '<code>execute([$name])</code>는 준비된 쿼리에 실제 값을 안전하게 넣어 실행해요.',
          hint: '"실행하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'Prepared Statement가 SQL 인젝션에 안전한 이유는?',
          '넘긴 값이 SQL 코드가 아니라 순수한 "값"으로만 처리되기 때문에', ['쿼리를 데이터베이스가 아니라 PHP에서 직접 실행하기 때문에', '문자열 이어붙이기보다 실행 속도가 빠르기 때문에', '자동으로 모든 값을 암호화하기 때문에'],
          'prepare/execute 방식은 값이 쿼리 구조에 영향을 줄 수 없도록 분리해서 처리해요.',
          '쿼리의 "틀"과 "실제 값"이 완전히 분리되는 게 핵심이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"SELECT * FROM students WHERE id = ?"</code>를 준비하고, <code>$id</code> 값으로 실행하는 코드를 두 줄로 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: '$stmt = $pdo->prepare("SELECT * FROM students WHERE id = ?");\n$stmt->execute([$id]);',
          accept: ['$stmt = $pdo->prepare("SELECT * FROM students WHERE id = ?");\n$stmt->execute([$id]);'],
          why: 'prepare로 쿼리 틀을 준비하고, execute에 실제 값을 배열로 넘겨요.',
          hint: '$stmt = $pdo->prepare(...); 다음 줄에 $stmt->execute([$id]);를 쓰세요.'
        }),
      ],
      boss: () => {
        const usesPreparedStatement = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `사용자가 이름 입력칸에 <code>' OR '1'='1</code>을 입력했어요. 서버 코드가 ${usesPreparedStatement ? '<code>$stmt = $pdo->prepare("SELECT * FROM students WHERE name = ?"); $stmt->execute([$name]);</code>' : '<code>$sql = "SELECT * FROM students WHERE name = \'$name\'";</code>'}를 쓴다면, SQL 인젝션 공격에 안전할까요? (예/아니오)`,
          prefix: '', suffix: '', accept: [usesPreparedStatement ? '예' : '아니오'], placeholder: '예 / 아니오',
          why: usesPreparedStatement
            ? 'Prepared Statement를 쓰면 입력값이 쿼리 구조에 영향을 줄 수 없어서 안전해요.'
            : '문자열을 직접 이어붙이면 입력값이 쿼리의 일부처럼 해석되어 위험해요.',
          hint: 'Prepared Statement를 쓰는지 안 쓰는지가 안전 여부를 결정해요.'
        };
      }
    },
    {
      id: 'exceptionsPhp',
      title: '예외 처리',
      ready: true,
      summary: '오류가 발생해도 프로그램이 멈추지 않게 처리하는 try-catch를 배워요.',
      goals: ['try-catch로 예외 잡기', 'throw로 직접 예외 던지기', 'getMessage()로 메시지 꺼내기'],
      blocks: [
        {
          h: '예외 잡기: try-catch',
          html: `<p><code>try</code> 블록에서 오류가 나면, 그 오류 타입에 맞는 <code>catch</code> 블록이 대신 실행돼요. <code>$e->getMessage()</code>로 오류 메시지를 꺼낼 수 있어요.</p>`,
          code: {
            label: 'try_catch.php',
            lang: 'php',
            src: `<?php
try {
    $result = intdiv(10, 0);
} catch (DivisionByZeroError $e) {
    echo "오류: " . $e->getMessage();
}`,
            out: `오류: Division by zero`
          }
        },
        {
          h: '직접 예외 던지기: throw',
          html: `<p><code>throw new Exception("메시지")</code>로 원하는 상황에서 직접 예외를 발생시킬 수 있어요.</p>`,
          code: {
            label: 'throw_basic.php',
            lang: 'php',
            src: `<?php
function withdraw($balance, $amount) {
    if ($amount > $balance) {
        throw new Exception("잔액이 부족합니다");
    }
    return $balance - $amount;
}

try {
    withdraw(1000, 5000);
} catch (Exception $e) {
    echo $e->getMessage();
}`,
            out: `잔액이 부족합니다`
          },
          after: `<div class="note"><b>정리</b> — try 블록 안의 코드가 정상 실행되면 catch는 실행되지 않고 건너뛰어요. 오류가 났을 때만 catch가 동작해요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>try { $result = intdiv(10, 0); } catch (DivisionByZeroError $e) { echo "오류 발생"; }</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: ['오류 발생'], placeholder: '출력 결과',
          why: '0으로 나누면 DivisionByZeroError가 발생하고, catch 블록의 "오류 발생"이 출력돼요.',
          hint: '0으로 나누는 건 오류를 일으켜요.'
        }),
        () => makeChoice(
          '<code>throw new Exception("메시지")</code>의 역할은?',
          '직접 예외를 발생시켜서, 그 지점에서 정상 흐름을 멈추고 가장 가까운 catch로 넘긴다', ['메시지를 화면에 바로 출력한다', '프로그램을 완전히 종료시킨다', '변수를 초기화한다'],
          'throw는 예외를 발생시켜서, 그 실행을 감싸고 있는 try-catch의 catch로 흐름을 넘겨요.',
          '"던지다(throw)"라는 이름처럼, 문제 상황을 catch 쪽으로 던져요.'
        ),
        () => {
          const msg = pick(['잔액이 부족합니다', '재고가 없습니다', '권한이 없습니다']);
          return {
            type: 'blank',
            q: `<code>try { throw new Exception("${msg}"); } catch (Exception $e) { echo $e->getMessage(); }</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [msg], placeholder: '출력 결과',
            why: `throw로 던진 예외의 메시지("${msg}")를 getMessage()로 그대로 꺼내 출력해요.`,
            hint: 'getMessage()는 예외를 만들 때 넣은 문자열을 그대로 돌려줘요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>$amount</code>가 0보다 작으면 <code>"금액은 0보다 커야 합니다"</code> 예외를 던지는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'if ($amount < 0) {\n    throw new Exception("금액은 0보다 커야 합니다");\n}',
          accept: ['if ($amount < 0) {\n    throw new Exception("금액은 0보다 커야 합니다");\n}'],
          why: '조건을 확인해서 throw new Exception(...)으로 예외를 던져요.',
          hint: 'if ($amount < 0) { throw new Exception("금액은 0보다 커야 합니다"); } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const balance = randInt(1000, 5000);
        const amount = Math.random() < 0.5 ? balance + randInt(100, 1000) : randInt(100, balance);
        const willFail = amount > balance;
        return {
          type: 'blank',
          q: `<code>function withdraw($balance, $amount) { if ($amount > $balance) { throw new Exception("잔액이 부족합니다"); } return $balance - $amount; }</code>이고 <code>try { echo withdraw(${balance}, ${amount}); } catch (Exception $e) { echo $e->getMessage(); }</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [willFail ? '잔액이 부족합니다' : String(balance - amount)], placeholder: '출력 결과',
          why: willFail
            ? `${amount}가 잔액(${balance})보다 많아서 예외가 발생하고, catch에서 "잔액이 부족합니다"가 출력돼요.`
            : `${balance} - ${amount} = ${balance - amount}가 정상적으로 반환·출력돼요.`,
          hint: '인출액이 잔액보다 많은지 먼저 확인해보세요.'
        };
      }
    },
    {
      id: 'fileIOPhp',
      title: '파일 입출력',
      ready: true,
      summary: 'file_put_contents와 file_get_contents로 파일을 간단히 읽고 쓰는 법을 배워요.',
      goals: ['file_put_contents로 파일 쓰기', 'file_get_contents로 파일 읽기', 'file_exists로 파일 존재 확인하기'],
      blocks: [
        {
          h: '파일 쓰기: file_put_contents',
          html: `<p><code>file_put_contents(경로, 내용)</code>은 파일이 없으면 새로 만들고, 있으면 내용을 덮어써요.</p>`,
          code: {
            label: 'write_file.php',
            lang: 'php',
            src: `<?php
file_put_contents("data.txt", "안녕하세요");`
          }
        },
        {
          h: '파일 읽기: file_get_contents',
          html: `<p><code>file_exists</code>로 먼저 파일이 있는지 확인하는 게 안전한 습관이에요(없는 파일을 읽으려 하면 경고가 나요). <code>file_get_contents</code>는 파일 전체 내용을 문자열로 돌려줘요.</p>`,
          code: {
            label: 'read_file.php',
            lang: 'php',
            src: `<?php
if (file_exists("data.txt")) {
    $content = file_get_contents("data.txt");
    echo $content;
}`,
            out: `안녕하세요`
          },
          after: `<div class="note"><b>정리</b> — file_put_contents/file_get_contents는 fopen/fwrite/fread를 한 번에 처리해주는 간편한 함수예요. 간단한 읽기·쓰기엔 이 둘만으로 충분해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const content = pick(['안녕하세요', '반갑습니다', '좋은 하루']);
          return {
            type: 'blank',
            q: `<code>file_put_contents("data.txt", "${content}"); echo file_get_contents("data.txt");</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [content], placeholder: '출력 결과',
            why: `쓴 내용을 그대로 다시 읽어오므로 "${content}"가 출력돼요.`,
            hint: 'file_put_contents로 쓴 내용을 file_get_contents가 그대로 돌려줘요.'
          };
        },
        () => makeChoice(
          '<code>file_exists("data.txt")</code>를 먼저 확인하는 이유는?',
          '없는 파일을 읽으려 할 때 나는 경고를 피하기 위해', ['파일을 자동으로 삭제하기 위해', '파일 크기를 미리 늘리기 위해', 'file_get_contents보다 항상 빠르기 때문에'],
          '파일이 없는데 읽으려 하면 PHP가 경고를 내므로, 미리 존재를 확인하는 게 안전해요.',
          '"파일이 존재하는지(exists)"를 미리 확인하는 안전장치예요.'
        ),
        () => ({
          type: 'blank',
          q: `파일 전체 내용을 문자열로 읽어오는 함수를 쓰세요.`,
          prefix: '$content = ', suffix: '("data.txt");', accept: ['file_get_contents'], placeholder: '함수 이름',
          why: '<code>file_get_contents</code>는 파일 전체 내용을 문자열로 읽어와요.',
          hint: '"파일(file)"의 "내용을(contents) 가져온다(get)"는 이름 그대로예요.'
        }),
        () => ({
          type: 'code',
          q: '"log.txt" 파일에 "기록됨"이라는 내용을 쓰는 코드를 한 줄로 작성하세요.',
          starter: '',
          placeholder: 'file_put_contents("log.txt", "기록됨");',
          accept: ['file_put_contents("log.txt", "기록됨");'],
          why: 'file_put_contents(경로, 내용)으로 파일에 내용을 써요.',
          hint: 'file_put_contents("log.txt", "기록됨"); 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const exists = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `"config.txt" 파일이 ${exists ? '실제로 존재해요' : '존재하지 않아요'}. <code>if (file_exists("config.txt")) { echo "있음"; } else { echo "없음"; }</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [exists ? '있음' : '없음'], placeholder: '출력 결과',
          why: exists ? '파일이 존재하므로 "있음"이 출력돼요.' : '파일이 존재하지 않으므로 "없음"이 출력돼요.',
          hint: 'file_exists의 결과에 따라 if/else 중 하나가 실행돼요.'
        };
      }
    },
    {
      id: 'regexPhp',
      title: '정규표현식: preg_match',
      ready: true,
      summary: '문자열이 특정 패턴과 맞는지 확인하는 정규표현식과 preg_match를 배워요.',
      goals: ['preg_match로 패턴 매칭 확인', '슬래시로 감싸는 패턴 문법', 'preg_replace로 치환하기'],
      blocks: [
        {
          h: '패턴과 맞는지 확인하기: preg_match',
          html: `<p><code>preg_match(패턴, 문자열)</code>은 패턴과 일치하면 <code>1</code>(참으로 취급), 아니면 <code>0</code>을 반환해요. 패턴은 슬래시(<code>/</code>)로 감싸서 써요.</p>`,
          code: {
            label: 'preg_match_basic.php',
            lang: 'php',
            src: `<?php
$email = "test@example.com";
if (preg_match("/^[\\w.]+@[\\w.]+$/", $email)) {
    echo "올바른 이메일 형식이에요";
} else {
    echo "이메일 형식이 아니에요";
}`,
            out: `올바른 이메일 형식이에요`
          }
        },
        {
          h: '패턴에 맞는 부분 바꾸기: preg_replace',
          html: `<p><code>preg_replace(패턴, 바꿀값, 문자열)</code>은 패턴과 일치하는 부분을 찾아 바꿔줘요.</p>`,
          code: {
            label: 'preg_replace_basic.php',
            lang: 'php',
            src: `<?php
$text = "010-1234-5678";
$masked = preg_replace("/\\d{4}$/", "****", $text);
echo $masked;`,
            out: `010-1234-****`
          },
          after: `<div class="note"><b>정리</b> — 정규표현식은 처음엔 낯설지만, 이메일·전화번호 형식 검사처럼 "패턴에 맞는지 확인"하는 작업에서 아주 강력한 도구예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const isValid = Math.random() < 0.5;
          const email = isValid ? pick(['test@example.com', 'user@site.co']) : pick(['no-at-sign.com', 'test@']);
          return {
            type: 'blank',
            q: `<code>preg_match("/^[\\w.]+@[\\w.]+$/", "${email}")</code>를 실행하면 결과는? (1 또는 0)`,
            prefix: '', suffix: '', accept: [isValid ? '1' : '0'], placeholder: '1 / 0',
            why: isValid
              ? `"${email}"은 이메일 패턴과 일치해서 1(참)이에요.`
              : `"${email}"은 이메일 패턴과 맞지 않아서 0(거짓)이에요.`,
            hint: '패턴과 일치하면 1, 아니면 0이에요.'
          };
        },
        () => makeChoice(
          '<code>preg_match</code>의 반환값 <code>1</code>과 <code>0</code>이 각각 뜻하는 것은?',
          '1은 패턴과 일치함, 0은 일치하지 않음', ['1은 오류 발생, 0은 정상', '1은 문자열 길이, 0은 항상 고정값', '1과 0은 아무 의미가 없다'],
          'preg_match는 패턴이 일치하면 1, 일치하지 않으면 0을 반환해요.',
          '참/거짓을 숫자로 나타낸다고 생각하면 돼요.'
        ),
        () => {
          const phone = pick(['010-1234-5678', '010-9876-5432']);
          const masked = phone.replace(/\d{4}$/, '****');
          return {
            type: 'blank',
            q: `<code>$text = "${phone}"; echo preg_replace("/\\d{4}$/", "****", $text);</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [masked], placeholder: '출력 결과',
            why: `문자열 끝의 숫자 4개가 ****로 바뀌어서 "${masked}"가 돼요.`,
            hint: '패턴 \\d{4}$는 "끝에 있는 숫자 4개"를 뜻해요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>$text</code>가 숫자로만 이루어졌는지 확인하는 <code>preg_match</code> 코드를 한 줄로 작성하세요. (패턴: <code>/^\\d+$/</code>)',
          starter: '',
          placeholder: 'preg_match("/^\\d+$/", $text);',
          accept: ['preg_match("/^\\d+$/", $text);'],
          why: '/^\\d+$/는 "처음부터 끝까지 숫자만"이라는 패턴이에요.',
          hint: 'preg_match("/^\\d+$/", $text); 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const isValid = Math.random() < 0.5;
        const text = isValid ? String(randInt(1000, 9999)) : pick(['abc123', '12ab']);
        return {
          type: 'blank',
          q: `<code>preg_match("/^\\d+$/", "${text}")</code>를 실행하면 결과는? (1 또는 0)`,
          prefix: '', suffix: '', accept: [isValid ? '1' : '0'], placeholder: '1 / 0',
          why: isValid
            ? `"${text}"는 숫자로만 이루어져 있어서 1이에요.`
            : `"${text}"는 숫자가 아닌 문자가 섞여 있어서 0이에요.`,
          hint: '패턴 ^\\d+$는 문자열 전체가 숫자로만 이루어졌는지 확인해요.'
        };
      }
    },
    {
      id: 'closuresPhp',
      title: '클로저와 익명 함수',
      ready: true,
      summary: '이름 없이 만드는 함수(익명 함수)와, 바깥 변수를 기억하는 클로저를 배워요.',
      goals: ['function() {} 익명 함수', 'use로 바깥 변수 가져오기', '화살표 함수(fn)의 자동 캡처'],
      blocks: [
        {
          h: '이름 없는 함수: 익명 함수',
          html: `<p>변수에 담을 수 있는, 이름 없는 함수를 만들 수 있어요.</p>`,
          code: {
            label: 'anonymous_function.php',
            lang: 'php',
            src: `<?php
$add = function($a, $b) {
    return $a + $b;
};
echo $add(3, 4);`,
            out: `7`
          }
        },
        {
          h: '바깥 변수 가져오기: use',
          html: `<p>익명 함수는 기본적으로 바깥의 변수를 볼 수 없어요. <code>use ($변수)</code>로 명시적으로 가져와야 그 값을 함수 안에서 쓸 수 있어요(이렇게 바깥 변수를 기억하는 함수를 <b>클로저</b>라고 해요). 화살표 함수(<code>fn() =&gt; ...</code>)는 이 과정을 자동으로 해줘요.</p>`,
          code: {
            label: 'closure_use.php',
            lang: 'php',
            src: `<?php
$tax = 0.1;
$addTax = function($price) use ($tax) {
    return $price + $price * $tax;
};
echo $addTax(1000);`,
            out: `1100`
          },
          after: `<div class="note"><b>정리</b> — function() {}는 use로 바깥 변수를 명시적으로 가져와야 하지만, fn() => ...(화살표 함수)는 바깥 변수를 자동으로 가져와요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>$add = function($a, $b) { return $a + $b; }; echo $add(${a}, ${b});</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `${a} + ${b} = ${a + b}예요.`,
            hint: '익명 함수도 일반 함수처럼 호출할 수 있어요.'
          };
        },
        () => makeChoice(
          '<code>use ($tax)</code>가 익명 함수 안에서 하는 역할은?',
          '바깥에 있는 $tax 변수의 값을 함수 안으로 가져와 쓸 수 있게 한다', ['$tax라는 새 변수를 함수 밖에 선언한다', '함수를 매번 새로 만든다', '$tax의 값을 항상 0으로 초기화한다'],
          'use는 익명 함수가 바깥 스코프의 변수를 캡처(기억)해서 안에서 쓸 수 있게 해줘요.',
          'use 없이는 함수 안에서 바깥 변수에 접근할 수 없어요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>use ($변수)</code> 없이도 바깥 변수를 자동으로 가져오는, 짧은 익명 함수 문법의 키워드를 쓰세요.`,
          prefix: '', suffix: '($price) => $price + $price * $tax;', accept: ['fn'], placeholder: '키워드',
          why: '<code>fn</code>으로 시작하는 화살표 함수는 use 없이도 바깥 변수를 자동으로 캡처해요.',
          hint: '"함수(function)"를 아주 짧게 줄인 키워드예요.'
        }),
        () => ({
          type: 'code',
          q: '바깥 변수 <code>$discount</code>를 <code>use</code>로 가져와서, <code>$price</code>에서 그 값을 뺀 결과를 반환하는 익명 함수를 만들어 <code>$applyDiscount</code>에 담으세요.',
          starter: '',
          rows: 3,
          placeholder: '$applyDiscount = function($price) use ($discount) {\n    return $price - $discount;\n};',
          accept: ['$applyDiscount = function($price) use ($discount) {\n    return $price - $discount;\n};'],
          why: 'use ($discount)로 바깥 변수를 가져와서 계산에 사용해요.',
          hint: 'function($price) use ($discount) { return $price - $discount; } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const tax = pick([0.1, 0.2]);
        const price = randInt(500, 2000);
        const result = Math.round(price + price * tax);
        return {
          type: 'blank',
          q: `<code>$tax = ${tax}; $addTax = function($price) use ($tax) { return $price + $price * $tax; }; echo $addTax(${price});</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
          why: `${price} + ${price} × ${tax} = ${result}이에요.`,
          hint: 'use로 가져온 $tax를 계산에 그대로 사용해요.'
        };
      }
    },
    {
      id: 'variadicPhp',
      title: '가변 인자 함수',
      ready: true,
      summary: '개수가 정해지지 않은 인자를 받는 가변 인자 함수를 배워요.',
      goals: ['...으로 가변 인자 받기', '함수 안에서 배열처럼 다루기', '배열을 펼쳐서 넘기기(...)'],
      blocks: [
        {
          h: '개수 상관없이 인자 받기',
          html: `<p><code>...$nums</code>처럼 매개변수 앞에 점 세 개를 붙이면, 그 함수는 값을 몇 개든 받을 수 있어요. 함수 안에서는 배열처럼 다뤄요.</p>`,
          code: {
            label: 'variadic_basic.php',
            lang: 'php',
            src: `<?php
function sum(...$nums) {
    $total = 0;
    foreach ($nums as $n) {
        $total += $n;
    }
    return $total;
}

echo sum(1, 2, 3);
echo sum(1, 2, 3, 4, 5);`,
            out: `615`
          }
        },
        {
          h: '배열을 펼쳐서 넘기기',
          html: `<p><code>...$nums</code>처럼 배열 앞에 점 세 개를 붙이면, 그 배열의 각 값을 낱개의 인자로 펼쳐서 넘길 수 있어요.</p>`,
          code: {
            label: 'variadic_spread.php',
            lang: 'php',
            src: `<?php
$nums = [1, 2, 3];
echo sum(...$nums);`,
            out: `6`
          },
          after: `<div class="note"><b>정리</b> — 매개변수 자리의 <code>...</code>는 "여러 값을 모아서 받기", 호출할 때의 <code>...</code>는 "배열을 낱개로 펼치기"예요. 방향이 반대라는 걸 기억하세요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const nums = Array.from({ length: randInt(3, 5) }, () => randInt(1, 15));
          return {
            type: 'blank',
            q: `<code>function sum(...$nums) { $total = 0; foreach ($nums as $n) { $total += $n; } return $total; }</code>일 때, <code>sum(${nums.join(', ')})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(nums.reduce((a, b) => a + b, 0))], placeholder: '숫자',
            why: `${nums.join(' + ')} = ${nums.reduce((a, b) => a + b, 0)}이에요.`,
            hint: '넘긴 모든 값을 다 더해보세요.'
          };
        },
        () => makeChoice(
          '<code>function sum(...$nums)</code>에서 <code>...$nums</code>의 의미는?',
          '개수 제한 없이 값을 받아서, 함수 안에서 배열처럼 다룬다', ['정확히 3개의 값만 받을 수 있다', '문자열만 받을 수 있다', '값을 하나도 받지 않는다는 뜻이다'],
          '...$nums는 넘긴 값들을 모아 배열로 담아줘요.',
          '점 세 개(...)가 "여러 개를 모은다"는 뜻이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>$nums = [1, 2, 3];</code>가 있는 배열을 <code>sum</code> 함수에 낱개로 펼쳐서 넘기려고 해요. 빈칸을 채우세요.`,
          prefix: 'echo sum(', suffix: '$nums);', accept: ['...'], placeholder: '기호',
          why: '<code>...$nums</code>는 배열의 값들을 낱개로 펼쳐서 함수에 넘겨요.',
          hint: '가변 인자를 받을 때 쓰던 그 점 세 개예요.'
        }),
        () => ({
          type: 'code',
          q: '숫자를 몇 개든 받아서 곱한 값을 반환하는 가변 인자 함수 <code>multiply</code>를 작성하세요. (곱은 1부터 시작해서 누적해요)',
          starter: '',
          rows: 6,
          placeholder: 'function multiply(...$nums) {\n    $result = 1;\n    foreach ($nums as $n) {\n        $result *= $n;\n    }\n    return $result;\n}',
          accept: ['function multiply(...$nums) {\n    $result = 1;\n    foreach ($nums as $n) {\n        $result *= $n;\n    }\n    return $result;\n}'],
          why: '$result := 1로 시작해서, 각 값을 곱해나가요.',
          hint: 'sum 함수와 구조는 같고, $total += $n 대신 $result *= $n을 쓰면 돼요.'
        }),
      ],
      boss: () => {
        const nums = Array.from({ length: 4 }, () => randInt(1, 20));
        return {
          type: 'blank',
          q: `<code>function sum(...$nums) { $total = 0; foreach ($nums as $n) { $total += $n; } return $total; }</code>이고 <code>$values = [${nums.join(', ')}]; echo sum(...$values);</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(nums.reduce((a, b) => a + b, 0))], placeholder: '숫자',
          why: `배열을 펼쳐서 넘겨도 결과는 같아서 ${nums.join(' + ')} = ${nums.reduce((a, b) => a + b, 0)}이에요.`,
          hint: '...$values로 펼쳐 넘겨도 sum은 각 값을 그대로 더해요.'
        };
      }
    },
    {
      id: 'traitsPhp',
      title: '트레이트',
      ready: true,
      summary: '상속 없이도 여러 클래스에 같은 기능을 나눠줄 수 있는 트레이트를 배워요.',
      goals: ['trait로 기능 묶기', 'use로 클래스에 트레이트 넣기', '다중 상속의 한계를 트레이트로 보완하기'],
      blocks: [
        {
          h: '기능을 묶어서 나눠주기: trait',
          html: `<p>PHP 클래스는 부모 클래스를 하나만 가질 수 있어요(다중 상속 불가). 여러 클래스에 같은 기능을 나눠주고 싶을 때 <code>trait</code>를 써요 — <code>use</code>로 클래스 안에 그 기능을 그대로 "끼워 넣어요".</p>`,
          code: {
            label: 'trait_basic.php',
            lang: 'php',
            src: `<?php
trait Greetable {
    public function greet() {
        return "안녕하세요, " . $this->name . "입니다";
    }
}

class Student {
    use Greetable;
    public $name;
}

class Teacher {
    use Greetable;
    public $name;
}

$s = new Student();
$s->name = "지수";
echo $s->greet();`,
            out: `안녕하세요, 지수입니다`
          },
          after: `<div class="note"><b>정리</b> — Student와 Teacher는 서로 상속 관계가 아니지만, 같은 trait를 써서 같은 greet() 기능을 각자 가질 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>trait Greetable { public function greet() { return "안녕하세요, " . $this->name . "입니다"; } } class Teacher { use Greetable; public $name; }</code>이고 <code>$t = new Teacher(); $t->name = "${name}"; echo $t->greet();</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`안녕하세요, ${name}입니다`], placeholder: '결과 문자열',
            why: `Teacher가 Greetable trait를 사용하므로 greet() 메서드를 그대로 쓸 수 있어서 "안녕하세요, ${name}입니다"가 돼요.`,
            hint: 'trait의 메서드는 use한 클래스에서 자기 것처럼 쓸 수 있어요.'
          };
        },
        () => makeChoice(
          'trait를 쓰는 주된 이유는?',
          'PHP는 다중 상속이 안 되므로, 상속 관계가 아닌 여러 클래스에 같은 기능을 나눠주기 위해', ['클래스를 완전히 삭제하기 위해', 'private 프로퍼티를 public으로 바꾸기 위해', '인터페이스를 대체하기 위해'],
          'trait는 상속 트리와 상관없이, 여러 클래스에 같은 메서드를 재사용하게 해줘요.',
          'Student와 Teacher는 서로 관계없는 클래스인데도 같은 기능을 공유할 수 있어요.'
        ),
        () => ({
          type: 'blank',
          q: `클래스 안에서 trait의 기능을 가져와 쓰겠다고 선언하는 키워드를 쓰세요.`,
          prefix: 'class Student { ', suffix: ' Greetable; }', accept: ['use'], placeholder: '키워드',
          why: '<code>use Greetable;</code>은 그 클래스 안에 Greetable trait의 기능을 끼워 넣어요.',
          hint: '"사용하다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>"로그: "</code>와 메시지를 이어붙여 반환하는 <code>log()</code> 메서드를 가진 <code>trait</code> <code>Loggable</code>을 정의하세요.',
          starter: '',
          rows: 3,
          placeholder: 'trait Loggable {\n    public function log($message) {\n        return "로그: " . $message;\n    }\n}',
          accept: ['trait Loggable {\n    public function log($message) {\n        return "로그: " . $message;\n    }\n}'],
          why: 'trait 이름 { 메서드 } 형태로 여러 클래스가 공유할 기능을 정의해요.',
          hint: 'trait Loggable { public function log($message) { return "로그: " . $message; } } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준']);
        const isStudent = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `<code>trait Greetable { public function greet() { return "안녕하세요, " . $this->name . "입니다"; } } class Student { use Greetable; public $name; } class Teacher { use Greetable; public $name; }</code>일 때, <code>$obj = new ${isStudent ? 'Student' : 'Teacher'}(); $obj->name = "${name}"; echo $obj->greet();</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`안녕하세요, ${name}입니다`], placeholder: '결과 문자열',
          why: `${isStudent ? 'Student' : 'Teacher'}도 Greetable trait를 use했으므로 똑같이 "안녕하세요, ${name}입니다"가 출력돼요.`,
          hint: '두 클래스 모두 같은 trait를 use했으니 결과는 같아요.'
        };
      }
    },
    {
      id: 'magicMethods',
      title: '매직 메서드: __toString과 __get',
      ready: true,
      summary: '특정 상황에서 자동으로 호출되는 특별한 메서드인 매직 메서드를 배워요.',
      goals: ['__toString으로 객체를 문자열처럼 다루기', '__get으로 없는 프로퍼티 접근 가로채기', '매직 메서드 이름 규칙(__로 시작)'],
      blocks: [
        {
          h: '객체를 문자열처럼: __toString',
          html: `<p><code>__toString</code>이 있으면, 객체를 <code>echo</code>하거나 문자열이 필요한 곳에 쓸 때 자동으로 이 메서드가 호출돼요.</p>`,
          code: {
            label: 'to_string.php',
            lang: 'php',
            src: `<?php
class Student {
    public $name;

    public function __construct($name) {
        $this->name = $name;
    }

    public function __toString() {
        return "Student(" . $this->name . ")";
    }
}

$s = new Student("지수");
echo $s;`,
            out: `Student(지수)`
          }
        },
        {
          h: '없는 프로퍼티에 접근하면: __get',
          html: `<p>존재하지 않는(또는 private인) 프로퍼티에 <code>$객체-&gt;이름</code>으로 접근하면 <code>__get</code>이 자동으로 호출돼요.</p>`,
          code: {
            label: 'magic_get.php',
            lang: 'php',
            src: `<?php
class Config {
    private $data = ["theme" => "dark"];

    public function __get($name) {
        return $this->data[$name] ?? null;
    }
}

$config = new Config();
echo $config->theme;`,
            out: `dark`
          },
          after: `<div class="note"><b>정리</b> — __로 시작하는 특별한 이름의 메서드들을 "매직 메서드"라고 불러요. PHP가 특정 상황에서 자동으로 그 메서드를 찾아 호출해줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>class Student { public $name; public function __construct($name) { $this->name = $name; } public function __toString() { return "Student(" . $this->name . ")"; } }</code>이고 <code>$s = new Student("${name}"); echo $s;</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`Student(${name})`], placeholder: '출력 결과',
            why: `echo $s;는 __toString()을 자동으로 호출해서 "Student(${name})"이 출력돼요.`,
            hint: '객체를 echo하면 __toString()의 반환값이 출력돼요.'
          };
        },
        () => makeChoice(
          '<code>__toString()</code>이 자동으로 호출되는 시점은?',
          '객체를 echo하거나, 문자열이 필요한 곳에 그 객체를 쓸 때', ['객체가 생성될 때마다', '프로퍼티에 값을 대입할 때', '클래스가 정의될 때 딱 한 번'],
          '__toString은 객체가 문자열로 취급되어야 하는 상황에서 PHP가 자동으로 호출해요.',
          '"문자열로(String)" "바꾸다(to)"라는 이름 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>class Config { private $data = ["theme" => "dark"]; public function __get($name) { return $this->data[$name] ?? null; } }</code>이고 <code>$config = new Config(); echo $config->theme;</code>를 실행하면 <code>__get</code>이 호출되는 이유를 설명하면? ("theme이 private이거나 존재하지 않는 프로퍼티라서 직접 접근할 수 없기 때문"이라고 답하세요)`,
          prefix: '', suffix: '', accept: ['theme이 private이거나 존재하지 않는 프로퍼티라서 직접 접근할 수 없기 때문'], placeholder: '설명',
          why: 'theme은 public 프로퍼티가 아니라서, $config->theme 접근 시 PHP가 대신 __get을 호출해요.',
          hint: 'public 프로퍼티라면 __get이 필요 없어요.'
        }),
        () => ({
          type: 'code',
          q: '<code>Book</code> 클래스에, 객체를 문자열로 다룰 때 <code>"Book: " . $this->title</code>을 반환하는 <code>__toString</code> 메서드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'public function __toString() {\n    return "Book: " . $this->title;\n}',
          accept: ['public function __toString() {\n    return "Book: " . $this->title;\n}'],
          why: '__toString() 메서드 안에서 원하는 문자열을 반환해요.',
          hint: 'public function __toString() { return "Book: " . $this->title; } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const title = pick(['해리포터', '반지의 제왕', '어린왕자']);
        return {
          type: 'blank',
          q: `<code>class Book { public $title; public function __construct($title) { $this->title = $title; } public function __toString() { return "책: " . $this->title; } }</code>이고 <code>$b = new Book("${title}"); echo "제목은 " . $b . "입니다";</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`제목은 책: ${title}입니다`], placeholder: '출력 결과',
          why: `문자열 이어붙이기(.)에서도 $b가 문자열로 취급되어야 하므로 __toString()이 호출되어 "책: ${title}"이 되고, 전체는 "제목은 책: ${title}입니다"가 돼요.`,
          hint: '. 연산자로 객체를 이어붙이면 __toString()이 자동 호출돼요.'
        };
      }
    },
    {
      id: 'namespacesPhp',
      title: '네임스페이스',
      ready: true,
      summary: '이름 충돌을 막기 위해 클래스를 그룹으로 묶는 네임스페이스를 배워요.',
      goals: ['namespace로 그룹 만들기', 'use로 다른 네임스페이스의 클래스 가져오기', '\\로 전체 경로 나타내기'],
      blocks: [
        {
          h: '클래스를 그룹으로 묶기: namespace',
          html: `<p><code>namespace</code>는 클래스를 "폴더처럼" 그룹으로 묶어줘요. 같은 이름의 클래스(<code>Student</code>)가 다른 프로젝트·라이브러리에 있어도, 네임스페이스가 다르면 충돌하지 않아요.</p>`,
          code: {
            label: 'namespace_basic.php',
            lang: 'php',
            src: `<?php
namespace App\\Models;

class Student {
    public $name;
}`
          }
        },
        {
          h: '다른 네임스페이스의 클래스 가져오기: use',
          html: `<p><code>use App\\Models\\Student;</code>로 그 클래스를 가져오면, 매번 전체 경로(<code>App\\Models\\Student</code>)를 안 써도 <code>Student</code>만으로 쓸 수 있어요.</p>`,
          code: {
            label: 'namespace_use.php',
            lang: 'php',
            src: `<?php
namespace App\\Controllers;

use App\\Models\\Student;

$s = new Student();`
          },
          after: `<div class="note"><b>정리</b> — 네임스페이스는 큰 프로젝트나 여러 라이브러리를 함께 쓸 때, 이름이 겹치는 문제를 예방해주는 정리 도구예요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'namespace를 쓰는 주된 목적은?',
          '서로 다른 그룹의 같은 이름 클래스가 충돌하지 않게 하기 위해', ['프로그램의 실행 속도를 높이기 위해', '변수를 상수로 만들기 위해', 'HTML과 PHP를 분리하기 위해'],
          '네임스페이스는 이름이 겹치는 클래스들을 서로 다른 "폴더"에 넣어 구분해줘요.',
          '큰 프로젝트에서 같은 이름의 클래스가 여러 개 필요할 때 특히 중요해요.'
        ),
        () => ({
          type: 'blank',
          q: `다른 네임스페이스에 있는 클래스를, 전체 경로를 안 쓰고 짧은 이름으로 쓰기 위해 파일 위쪽에 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: ' App\\Models\\Student;', accept: ['use'], placeholder: '키워드',
          why: '<code>use App\\Models\\Student;</code>로 가져오면 이후 Student만으로 쓸 수 있어요.',
          hint: '트레이트를 클래스에 넣을 때 쓰던 것과 같은 키워드예요.'
        }),
        () => makeChoice(
          'PHP 네임스페이스에서 그룹 경로를 구분할 때 쓰는 기호는?',
          '<code>\\</code>(역슬래시)', ['<code>/</code>(슬래시)', '<code>.</code>(마침표)', '<code>::</code>(콜론 두 개)'],
          'App\\Models\\Student처럼 역슬래시로 계층을 구분해요.',
          '파일 시스템의 폴더 구분과 비슷한 역할이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>App\\Services</code> 네임스페이스를 선언하는 코드를 한 줄로 작성하세요.',
          starter: '',
          placeholder: 'namespace App\\Services;',
          accept: ['namespace App\\Services;'],
          why: 'namespace 경로; 형태로 이 파일의 네임스페이스를 선언해요.',
          hint: 'namespace App\\Services; 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => ({
        type: 'blank',
        q: `<code>namespace App\\Models;</code>에 <code>Student</code> 클래스가 있고, <code>namespace App\\Controllers;</code>에서 이 클래스를 짧게 <code>Student</code>로만 쓰고 싶어요. 어떤 문장을 추가해야 할까요?`,
        prefix: '', suffix: '', accept: ['use App\\Models\\Student;'], placeholder: 'use 문',
        why: 'use App\\Models\\Student;로 가져오면 그 뒤부터는 Student만으로 쓸 수 있어요.',
        hint: 'use 뒤에 전체 경로(네임스페이스\\클래스이름)를 써요.'
      })
    },
    {
      id: 'includeRequire',
      title: 'include와 require로 파일 나누기',
      ready: true,
      summary: '코드를 여러 파일로 나누고 필요한 곳에서 불러오는 include와 require를 배워요.',
      goals: ['require로 파일 불러오기', 'require_once로 중복 불러오기 막기', 'include와 require의 차이(오류 심각도)'],
      blocks: [
        {
          h: '파일 나누고 불러오기: require',
          html: `<p>함수나 클래스를 다른 파일에 정의해두고, <code>require "경로"</code>로 필요한 곳에서 불러와 써요.</p>`,
          code: {
            label: 'main.php',
            lang: 'php',
            src: `<?php
// functions.php
// function add($a, $b) { return $a + $b; }

require "functions.php";
echo add(3, 4);`,
            out: `7`
          }
        },
        {
          h: '중복 불러오기 막기: require_once',
          html: `<p>같은 파일을 여러 곳에서 require하다 보면 실수로 두 번 불러올 수 있는데(함수 중복 정의 오류), <code>require_once</code>는 이미 불러온 파일을 다시 불러오지 않아 안전해요.</p>`,
          code: {
            label: 'require_once.php',
            lang: 'php',
            src: `<?php
require_once "functions.php";
require_once "functions.php"; // 이미 불러왔으니 다시 불러오지 않음`
          },
          after: `<div class="note"><b>정리</b> — 파일을 못 찾으면 <code>include</code>는 경고만 내고 계속 실행되지만, <code>require</code>는 치명적 오류로 프로그램이 멈춰요. 없으면 안 되는 필수 파일은 require를 쓰는 게 안전해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>require_once</code>의 역할로 알맞은 것은?',
          '같은 파일이 이미 불러와졌다면 다시 불러오지 않는다', ['파일을 한 번만 실행하고 즉시 삭제한다', 'require보다 항상 느리게 동작한다', '오류가 나도 항상 무시하고 진행한다'],
          'require_once는 중복 불러오기로 인한 함수/클래스 재정의 오류를 막아줘요.',
          '"한 번만(once)"이라는 이름 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `불러오려는 파일이 없을 때, <code>include</code>와 <code>require</code> 중 프로그램을 완전히 멈추게 하는 쪽을 쓰세요.`,
          prefix: '', suffix: '', accept: ['require'], placeholder: '키워드',
          why: 'require는 파일을 못 찾으면 치명적 오류로 프로그램이 멈춰요. include는 경고만 내고 계속 진행돼요.',
          hint: '"반드시 필요하다"는 의미가 강한 쪽이에요.'
        }),
        () => makeChoice(
          '여러 파일에 나눠 작성한 함수·클래스를 한 파일에서 쓰기 위해 불러올 때 쓰는 키워드로 알맞은 것은?',
          '<code>require</code>', ['<code>import</code>', '<code>use</code>(파일 단위로)', '<code>load</code>'],
          'PHP는 다른 파일의 코드를 가져올 때 require(또는 include)를 써요.',
          '다른 언어의 import와 비슷한 역할을 해요.'
        ),
        () => ({
          type: 'code',
          q: '"helpers.php" 파일을 안전하게(중복 없이) 불러오는 코드를 한 줄로 작성하세요.',
          starter: '',
          placeholder: 'require_once "helpers.php";',
          accept: ['require_once "helpers.php";'],
          why: 'require_once는 같은 파일을 두 번 불러오지 않게 막아줘요.',
          hint: 'require_once "helpers.php"; 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const fileExists = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `"config.php" 파일이 ${fileExists ? '실제로 존재해요' : '존재하지 않아요'}. <code>require "config.php";</code>를 실행하면 프로그램이 멈출까요? (예/아니오)`,
          prefix: '', suffix: '', accept: [fileExists ? '아니오' : '예'], placeholder: '예 / 아니오',
          why: fileExists
            ? '파일이 존재하므로 정상적으로 불러와지고 프로그램이 계속 실행돼요.'
            : 'require는 파일을 못 찾으면 치명적 오류를 내며 프로그램이 멈춰요.',
          hint: 'require는 파일이 없으면 치명적 오류를 일으켜요.'
        };
      }
    },
    {
      id: 'customExceptionsPhp',
      title: '커스텀 예외',
      ready: true,
      summary: 'Exception을 상속받아 나만의 예외 타입을 만드는 법을 배워요.',
      goals: ['Exception을 상속받아 커스텀 예외 만들기', '여러 예외 타입을 구분해서 catch하기', '구체적인 예외부터 catch하기'],
      blocks: [
        {
          h: '나만의 예외 타입 만들기',
          html: `<p><code>Exception</code>을 상속받으면 나만의 의미 있는 이름을 가진 예외를 만들 수 있어요. 어떤 종류의 문제인지 catch하는 쪽에서 더 명확하게 구분할 수 있게 돼요.</p>`,
          code: {
            label: 'custom_exception.php',
            lang: 'php',
            src: `<?php
class InsufficientFundsException extends Exception {
}

function withdraw($balance, $amount) {
    if ($amount > $balance) {
        throw new InsufficientFundsException("잔액 부족");
    }
    return $balance - $amount;
}`
          }
        },
        {
          h: '여러 타입 구분해서 catch하기',
          html: `<p>여러 <code>catch</code> 블록을 쓰면 예외 종류별로 다르게 대응할 수 있어요. 더 구체적인 예외 타입을 먼저 쓰고, 일반적인 <code>Exception</code>은 맨 마지막에 둬야 해요(먼저 매칭되는 catch가 실행되므로).</p>`,
          code: {
            label: 'catch_multiple.php',
            lang: 'php',
            src: `<?php
try {
    withdraw(1000, 5000);
} catch (InsufficientFundsException $e) {
    echo "잔액 문제: " . $e->getMessage();
} catch (Exception $e) {
    echo "다른 오류: " . $e->getMessage();
}`,
            out: `잔액 문제: 잔액 부족`
          },
          after: `<div class="note"><b>정리</b> — InsufficientFundsException도 결국 Exception의 일종이라서, 순서를 반대로 하면(Exception을 먼저 catch) 항상 첫 번째 catch만 실행돼버려요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>class InsufficientFundsException extends Exception {}</code>이고 <code>try { throw new InsufficientFundsException("부족"); } catch (InsufficientFundsException $e) { echo "구체적: " . $e->getMessage(); } catch (Exception $e) { echo "일반: " . $e->getMessage(); }</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: ['구체적: 부족'], placeholder: '출력 결과',
          why: 'InsufficientFundsException과 정확히 일치하는 첫 번째 catch가 먼저 매칭되어 실행돼요.',
          hint: '더 구체적인(정확히 일치하는) catch가 먼저 와 있으면 그게 실행돼요.'
        }),
        () => makeChoice(
          '커스텀 예외를 만드는 방법으로 알맞은 것은?',
          '<code>Exception</code>을 <code>extends</code>로 상속받는 새 클래스를 만든다', ['새로운 catch 키워드를 정의한다', 'try 블록 안에 클래스를 정의한다', 'interface Exception을 구현한다'],
          'class 이름 extends Exception {} 형태로 나만의 예외 클래스를 만들 수 있어요.',
          'Exception도 결국 하나의 클래스라서, 상속이 가능해요.'
        ),
        () => makeChoice(
          '여러 catch 블록을 둘 때 지켜야 할 순서 규칙은?',
          '더 구체적인(자식) 예외 타입을 먼저, 일반적인(부모) Exception을 나중에 둔다', ['알파벳 순서대로 정렬해서 둔다', '항상 Exception을 가장 먼저 둔다', '순서는 결과에 아무 영향이 없다'],
          '먼저 나온 catch 중 타입이 맞는 것이 실행되므로, 일반적인 Exception을 먼저 두면 구체적인 예외들이 실행될 기회를 잃어요.',
          '위에서부터 순서대로 "이 타입에 맞나?"를 확인해요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Exception</code>을 상속받는 <code>NotFoundException</code> 클래스를(내용 없이) 정의하세요.',
          starter: '',
          placeholder: 'class NotFoundException extends Exception {\n}',
          accept: ['class NotFoundException extends Exception {\n}'],
          why: 'class 이름 extends Exception {} 형태로 커스텀 예외를 만들어요.',
          hint: 'class NotFoundException extends Exception { } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const balance = randInt(1000, 5000);
        const amount = balance + randInt(100, 1000);
        return {
          type: 'blank',
          q: `<code>class InsufficientFundsException extends Exception {} function withdraw($balance, $amount) { if ($amount > $balance) { throw new InsufficientFundsException("잔액 부족"); } return $balance - $amount; }</code>이고 <code>try { withdraw(${balance}, ${amount}); } catch (InsufficientFundsException $e) { echo "잔액 문제: " . $e->getMessage(); } catch (Exception $e) { echo "일반 오류"; }</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: ['잔액 문제: 잔액 부족'], placeholder: '출력 결과',
          why: `${amount}가 잔액(${balance})보다 많아 InsufficientFundsException이 발생하고, 그 타입과 정확히 일치하는 첫 catch가 실행돼요.`,
          hint: '더 구체적인 예외 타입의 catch가 먼저 있으면 그게 실행돼요.'
        };
      }
    },
    {
      id: 'usortPhp',
      title: '정렬 함수: sort와 usort',
      ready: true,
      summary: '배열을 정렬하는 sort와, 원하는 기준으로 정렬하는 usort를 배워요.',
      goals: ['sort로 기본 정렬', 'usort로 커스텀 기준 정렬', '비교 함수가 반환하는 값의 의미'],
      blocks: [
        {
          h: '기본 정렬: sort',
          html: `<p><code>sort(배열)</code>은 배열을 오름차순으로, 그 자리에서(원본을 직접 바꿔서) 정렬해요.</p>`,
          code: {
            label: 'sort_basic.php',
            lang: 'php',
            src: `<?php
$nums = [5, 2, 8, 1];
sort($nums);
echo implode(", ", $nums);`,
            out: `1, 2, 5, 8`
          }
        },
        {
          h: '원하는 기준으로 정렬: usort',
          html: `<p><code>usort</code>의 비교 함수는 첫 번째 값이 더 앞에 와야 하면 음수, 뒤에 와야 하면 양수를 반환해요. <code>$b["score"] - $a["score"]</code>는 점수가 높은 게 앞에 오는(내림차순) 정렬을 만들어요.</p>`,
          code: {
            label: 'usort_basic.php',
            lang: 'php',
            src: `<?php
$students = [
    ["name" => "지수", "score" => 90],
    ["name" => "민준", "score" => 85],
    ["name" => "서연", "score" => 95],
];

usort($students, function($a, $b) {
    return $b["score"] - $a["score"];
});

echo $students[0]["name"];`,
            out: `서연`
          },
          after: `<div class="note"><b>정리</b> — 비교 함수에서 $a - $b면 오름차순, $b - $a면 내림차순이 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const nums = Array.from({ length: 4 }, () => randInt(1, 50));
          const sorted = [...nums].sort((a, b) => a - b);
          return {
            type: 'blank',
            q: `<code>$nums = [${nums.join(', ')}]; sort($nums); echo implode(", ", $nums);</code>를 실행하면? (쉼표와 공백으로 구분)`,
            prefix: '', suffix: '', accept: [sorted.join(', ')], placeholder: '숫자, 숫자, ...',
            why: `오름차순으로 정렬하면 ${sorted.join(', ')}이 돼요.`,
            hint: 'sort는 작은 값부터 큰 값 순서로 정렬해요.'
          };
        },
        () => makeChoice(
          '<code>usort($arr, function($a, $b) { return $a - $b; })</code>가 만드는 정렬 순서는?',
          '오름차순(작은 값부터 큰 값 순서)', ['내림차순(큰 값부터 작은 값 순서)', '무작위 순서', '항상 원래 순서 그대로'],
          '$a - $b는 a가 b보다 작으면 음수를 반환해서 a가 앞에 오는 오름차순을 만들어요.',
          '$a - $b(오름차순), $b - $a(내림차순)를 기억해두세요.'
        ),
        () => {
          const students = [
            { name: '지수', score: randInt(70, 100) },
            { name: '민준', score: randInt(70, 100) },
            { name: '서연', score: randInt(70, 100) },
          ];
          const top = [...students].sort((a, b) => b.score - a.score)[0];
          return {
            type: 'blank',
            q: `<code>$students</code>에 <code>["${students[0].name}", ${students[0].score}]</code>, <code>["${students[1].name}", ${students[1].score}]</code>, <code>["${students[2].name}", ${students[2].score}]</code>가 있고 <code>usort($students, fn($a, $b) => $b["score"] - $a["score"]);</code>로 정렬하면, <code>$students[0]["name"]</code>은? (그대로 입력)`,
            prefix: '', suffix: '', accept: [top.name], placeholder: '이름',
            why: `점수가 가장 높은 "${top.name}"(${top.score}점)이 맨 앞에 와요.`,
            hint: '$b["score"] - $a["score"]는 점수 내림차순 정렬이에요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>$nums</code>(정수 배열)를 오름차순으로 정렬하는 코드를 한 줄로 작성하세요.',
          starter: '',
          placeholder: 'sort($nums);',
          accept: ['sort($nums);'],
          why: 'sort(배열)는 배열을 오름차순으로 정렬해요.',
          hint: 'sort($nums); 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const nums = Array.from({ length: 5 }, () => randInt(1, 100));
        const sorted = [...nums].sort((a, b) => b - a);
        return {
          type: 'blank',
          q: `<code>$nums = [${nums.join(', ')}]; usort($nums, function($a, $b) { return $b - $a; }); echo $nums[0];</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sorted[0])], placeholder: '숫자',
          why: `내림차순 정렬이므로 가장 큰 값 ${sorted[0]}이 맨 앞에 와요.`,
          hint: '$b - $a는 큰 값이 앞으로 오는 정렬이에요.'
        };
      }
    },
    {
      id: 'nullsafeOperator',
      title: '널세이프 연산자: ?->',
      ready: true,
      summary: '객체가 null일 수도 있을 때 안전하게 메서드·프로퍼티에 접근하는 ?->를 배워요.',
      goals: ['?->의 동작(null이면 그냥 null 반환)', '중첩된 null 체크를 줄여주는 효과', '??와 함께 쓰기'],
      blocks: [
        {
          h: '문제: null인 객체의 메서드를 부르면',
          html: `<p>null인 값에 <code>-&gt;</code>로 메서드를 호출하려 하면 오류가 나요.</p>`,
          code: {
            label: 'null_error.php',
            lang: 'php',
            src: `<?php
$user = null;
echo $user->getName(); // 오류! null의 메서드를 부를 수 없음`
          }
        },
        {
          h: '해결: ?->',
          html: `<p><code>$user?-&gt;getName()</code>은 <code>$user</code>가 null이면 오류 없이 그냥 <code>null</code>을 반환하고(메서드를 아예 호출하지 않아요), null이 아니면 평소처럼 메서드를 호출해요. <code>??</code>와 함께 쓰면 null일 때의 기본값까지 깔끔하게 처리할 수 있어요.</p>`,
          code: {
            label: 'nullsafe_basic.php',
            lang: 'php',
            src: `<?php
$user = null;
echo $user?->getName() ?? "손님";`,
            out: `손님`
          },
          after: `<div class="note"><b>정리</b> — ?->는 특히 <code>$a?->b?->c</code>처럼 중첩된 접근에서, 중간에 하나라도 null이면 전체가 안전하게 null이 되어 코드가 훨씬 짧고 안전해져요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>$user = null; echo $user?->getName() ?? "손님";</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: ['손님'], placeholder: '출력 결과',
          why: '$user가 null이므로 ?->는 오류 없이 null을 반환하고, ?? 뒤의 "손님"이 출력돼요.',
          hint: '?->는 null인 객체에 안전하게 접근해요(오류 대신 null).'
        }),
        () => makeChoice(
          '<code>$user?->getName()</code>에서 <code>$user</code>가 null일 때의 동작은?',
          '오류 없이 getName()을 아예 호출하지 않고 null을 반환한다', ['오류를 발생시키며 프로그램이 멈춘다', 'getName()을 호출하되 빈 문자열을 강제로 돌려준다', '$user를 자동으로 새 객체로 만든다'],
          '?->는 왼쪽이 null이면 메서드 호출 자체를 건너뛰고 null을 돌려줘요.',
          '"null이면 안전하게(nullsafe)"라는 이름 그대로예요.'
        ),
        () => {
          const name = pick(['지수', '민준']);
          return {
            type: 'blank',
            q: `<code>class User { public function getName() { return "${name}"; } } $user = new User(); echo $user?->getName() ?? "손님";</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [name], placeholder: '출력 결과',
            why: `$user가 null이 아니므로 ?->는 평소처럼 getName()을 호출해서 "${name}"이 반환돼요.`,
            hint: '$user가 null이 아니면 ?->는 그냥 ->처럼 동작해요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>$profile</code>이 null일 수도 있을 때, <code>getBio()</code>를 안전하게 호출하되 null이면 <code>"소개 없음"</code>을 쓰는 코드를 한 줄로 작성하세요.',
          starter: '',
          placeholder: 'echo $profile?->getBio() ?? "소개 없음";',
          accept: ['echo $profile?->getBio() ?? "소개 없음";'],
          why: '?->로 안전하게 접근하고, ??로 null일 때의 기본값을 지정해요.',
          hint: 'echo $profile?->getBio() ?? "소개 없음"; 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const isNull = Math.random() < 0.5;
        const name = pick(['지수', '민준']);
        return {
          type: 'blank',
          q: `<code>class User { public function getName() { return "${name}"; } } $user = ${isNull ? 'null' : 'new User()'}; echo $user?->getName() ?? "손님";</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [isNull ? '손님' : name], placeholder: '출력 결과',
          why: isNull
            ? '$user가 null이므로 ?->가 null을 반환하고, ?? 뒤의 "손님"이 출력돼요.'
            : `$user가 null이 아니므로 getName()이 정상 호출되어 "${name}"이 출력돼요.`,
          hint: '$user가 null인지 아닌지에 따라 결과가 완전히 달라져요.'
        };
      }
    },
    {
      id: 'autoloadingComposer',
      title: '오토로딩과 Composer',
      ready: true,
      summary: '클래스를 매번 require하지 않아도 자동으로 불러와주는 오토로딩과, PHP의 대표적인 패키지 관리자 Composer의 개념을 배워요.',
      goals: ['오토로딩이 해결하는 문제', 'spl_autoload_register의 개념', 'Composer의 역할(패키지 관리 + 오토로딩)'],
      blocks: [
        {
          h: '문제: 클래스마다 일일이 require하기',
          html: `<p>프로젝트가 커지면 클래스 파일이 수십, 수백 개가 될 수 있는데, 그때마다 일일이 require를 써주는 건 번거롭고 실수하기 쉬워요.</p>`,
          code: {
            label: 'manual_require.php',
            lang: 'php',
            src: `<?php
require "models/Student.php";
require "models/Teacher.php";
require "models/Course.php";
// 클래스가 늘어날수록 require 줄도 계속 늘어남`
          }
        },
        {
          h: '해결: 오토로딩',
          html: `<p><code>spl_autoload_register</code>는 "존재하지 않는 클래스를 쓰려고 할 때, 이 함수를 실행해서 파일을 찾아봐라"고 등록하는 함수예요. 실무에서는 이런 규칙을 직접 짜기보다, <b>Composer</b>라는 패키지 관리자가 제공하는 오토로딩 기능을 표준적으로 사용해요.</p>`,
          code: {
            label: 'autoload_basic.php',
            lang: 'php',
            src: `<?php
spl_autoload_register(function ($className) {
    require "models/" . $className . ".php";
});

$s = new Student(); // Student.php를 자동으로 찾아서 불러옴`
          },
          after: `<div class="note"><b>정리</b> — Composer는 외부 라이브러리를 설치·관리해주는 PHP의 대표적인 패키지 관리자이면서, 동시에 프로젝트의 모든 클래스를 자동으로 불러와주는 오토로딩 기능도 함께 제공해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '오토로딩이 해결해주는 문제는?',
          '클래스가 많아질수록 늘어나는 require 문을 일일이 안 써도 되게 해준다', ['데이터베이스 연결 속도를 높여준다', 'HTML과 CSS를 자동으로 합쳐준다', '변수 이름을 자동으로 지어준다'],
          '오토로딩은 필요한 클래스 파일을 자동으로 찾아 불러와서, require를 일일이 쓸 필요를 없애줘요.',
          '클래스가 100개면 require도 100줄이 필요했겠지만, 오토로딩은 그걸 자동화해요.'
        ),
        () => ({
          type: 'blank',
          q: `존재하지 않는 클래스를 쓰려고 할 때 자동으로 실행될 함수를 등록하는 함수 이름을 쓰세요.`,
          prefix: '', suffix: '(function ($className) { ... });', accept: ['spl_autoload_register'], placeholder: '함수 이름',
          why: '<code>spl_autoload_register</code>는 클래스를 찾지 못했을 때 실행할 함수를 등록해요.',
          hint: 'PHP 표준 라이브러리(SPL)의 "오토로드를 등록한다"는 이름 그대로예요.'
        }),
        () => makeChoice(
          'Composer의 역할로 알맞은 것은?',
          '외부 패키지(라이브러리)를 설치·관리해주고, 오토로딩 기능도 함께 제공한다', ['PHP 코드를 다른 언어로 번역해준다', '데이터베이스를 대신 설계해준다', 'HTML 페이지의 디자인을 자동으로 생성한다'],
          'Composer는 PHP의 대표적인 패키지 관리자로, 라이브러리 설치와 오토로딩을 함께 담당해요.',
          '다른 언어의 npm, pip 같은 패키지 관리자와 비슷한 역할이에요.'
        ),
        () => ({
          type: 'code',
          q: '클래스 이름을 받아서 <code>"classes/" . $className . ".php"</code> 경로를 require하는 오토로더를 <code>spl_autoload_register</code>로 등록하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'spl_autoload_register(function ($className) {\n    require "classes/" . $className . ".php";\n});',
          accept: ['spl_autoload_register(function ($className) {\n    require "classes/" . $className . ".php";\n});'],
          why: 'spl_autoload_register에 등록한 함수가 클래스를 찾을 때마다 자동으로 호출돼요.',
          hint: 'spl_autoload_register(function ($className) { require "classes/" . $className . ".php"; }); 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => ({
        type: 'blank',
        q: `<code>spl_autoload_register(function ($className) { require "models/" . $className . ".php"; });</code>가 등록되어 있고, <code>models/Student.php</code>에 <code>Student</code> 클래스가 정의되어 있어요. 코드에서 <code>new Student();</code>를 실행하면, <code>require "models/Student.php";</code>를 직접 쓰지 않아도 정상 작동할까요? (예/아니오)`,
        prefix: '', suffix: '', accept: ['예'], placeholder: '예 / 아니오',
        why: '오토로더가 등록되어 있으므로, Student 클래스가 필요한 순간 자동으로 models/Student.php를 찾아 불러와요.',
        hint: '오토로딩이 등록되어 있으면, 클래스가 필요할 때 자동으로 파일을 찾아줘요.'
      })
    },
    {
      id: 'abstractClasses',
      title: '추상 클래스와 추상 메서드',
      ready: true,
      summary: '직접 객체를 만들 수 없고, 자식 클래스가 반드시 구현해야 할 메서드를 정하는 abstract 클래스를 배워요.',
      goals: ['abstract class는 직접 인스턴스화할 수 없음', 'abstract 메서드는 자식이 반드시 구현해야 함', '공통 로직과 강제 규칙을 함께 담기'],
      blocks: [
        {
          h: '직접 만들 수 없는 클래스: abstract class',
          html: `<p><code>abstract</code>가 붙은 클래스는 설계도일 뿐, <code>new</code>로 직접 객체를 만들 수 없어요. 오직 이 클래스를 상속한 자식 클래스만 객체로 만들어질 수 있어요.</p>`,
          code: {
            label: 'abstract_error.php',
            lang: 'php',
            src: `<?php
abstract class Shape {
    abstract public function area();
}

$s = new Shape(); // 오류! 추상 클래스는 직접 만들 수 없음`
          }
        },
        {
          h: '자식이 반드시 구현해야 하는 메서드',
          html: `<p><code>abstract public function area();</code>처럼 본문 없이 선언만 된 메서드는, 이 클래스를 상속하는 자식 클래스가 반드시 직접 구현해야 해요. 대신 <code>describe()</code>처럼 본문이 있는 일반 메서드는 그대로 공통 로직으로 물려줄 수 있어요.</p>`,
            code: {
            label: 'abstract_impl.php',
            lang: 'php',
            src: `<?php
abstract class Shape {
    abstract public function area();

    public function describe() {
        return "넓이: " . $this->area();
    }
}

class Rectangle extends Shape {
    public $w;
    public $h;

    public function __construct($w, $h) {
        $this->w = $w;
        $this->h = $h;
    }

    public function area() {
        return $this->w * $this->h;
    }
}

$r = new Rectangle(4, 5);
echo $r->describe();`,
            out: `넓이: 20`
          },
          after: `<div class="note"><b>정리</b> — abstract 메서드는 "이 이름과 형태의 메서드는 자식이 반드시 채워 넣어라"는 강제 규칙이고, 일반 메서드는 그대로 공통 로직으로 재사용돼요. 자식이 구현을 빼먹으면 치명적 오류가 발생해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const w = randInt(2, 9);
          const h = randInt(2, 9);
          const area = w * h;
          return {
            type: 'blank',
            q: `<code>abstract class Shape { abstract public function area(); public function describe() { return "넓이: " . $this->area(); } } class Rectangle extends Shape { public $w; public $h; public function __construct($w, $h) { $this->w = $w; $this->h = $h; } public function area() { return $this->w * $this->h; } }</code>이고 <code>$r = new Rectangle(${w}, ${h}); echo $r->describe();</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`넓이: ${area}`], placeholder: '출력 결과',
            why: `Rectangle의 area()는 w * h를 반환하므로 ${w} * ${h} = ${area}가 되어 "넓이: ${area}"가 출력돼요.`,
            hint: 'describe()는 부모의 공통 로직이고, area()는 자식이 구현한 값을 그대로 가져다 써요.'
          };
        },
        () => makeChoice(
          'abstract class의 특징으로 알맞은 것은?',
          '직접 new로 인스턴스를 만들 수 없고, 자식 클래스가 상속해서 사용해야 한다', ['private 메서드만 가질 수 있다', '인터페이스보다 항상 메서드 수가 적어야 한다', '생성자를 가질 수 없다'],
          'abstract class는 설계도 역할만 하고, 실제 객체는 이를 상속한 자식 클래스로만 만들 수 있어요.',
          '"추상적인(abstract)"이라는 이름처럼, 그 자체로는 구체적인 실체가 될 수 없어요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>abstract class Shape { ___ public function area(); }</code>에서 빈칸에 들어갈, "이 메서드는 자식이 반드시 구현해야 한다"는 뜻의 키워드를 쓰세요.`,
          prefix: '', suffix: '', accept: ['abstract'], placeholder: '키워드',
          why: '<code>abstract</code> 키워드가 붙은 메서드는 본문 없이 선언만 하고, 실제 구현은 자식 클래스의 몫이에요.',
          hint: '클래스 앞에 붙이는 키워드와 똑같은 단어예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>Shape</code> 추상 클래스 안에, 본문 없이 <code>area()</code>를 반드시 구현하도록 강제하는 추상 메서드 선언을 작성하세요.',
          starter: '',
          placeholder: 'abstract public function area();',
          accept: ['abstract public function area();'],
          why: 'abstract 메서드는 본문(중괄호) 없이 세미콜론으로 끝나는 선언만 써요.',
          hint: 'abstract public function area(); 형태를 그대로 써보세요.'
        }),
        () => makeChoice(
          '자식 클래스가 부모의 추상 메서드를 구현하지 않으면?',
          '치명적 오류(Fatal error)가 발생해서 실행이 멈춘다', ['빈 문자열을 자동으로 반환한다', '부모 클래스의 기본 동작을 그대로 물려받는다', '경고만 뜨고 정상적으로 실행된다'],
          '추상 메서드는 반드시 구현해야 하는 규칙이라서, 빼먹으면 오류로 즉시 드러나요.',
          '구현을 빼먹었다는 걸 실행 전에(치명적 오류로) 알 수 있게 해주는 게 abstract의 핵심이에요.'
        ),
      ],
      boss: () => {
        const w = randInt(3, 10);
        const h = randInt(3, 10);
        const area = w * h;
        return {
          type: 'blank',
          q: `<code>abstract class Shape { abstract public function area(); } class Rectangle extends Shape { public $w; public $h; public function __construct($w, $h) { $this->w = $w; $this->h = $h; } public function area() { return $this->w * $this->h; } } function printArea(Shape $shape) { echo $shape->area(); }</code>이고 <code>printArea(new Rectangle(${w}, ${h}));</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(area)], placeholder: '숫자',
          why: `printArea의 매개변수 타입은 Shape이지만, 실제로 넘어온 건 Rectangle 객체라서 그 area() 구현이 호출되어 ${w} * ${h} = ${area}가 출력돼요.`,
          hint: '타입은 Shape이지만, 실제로 호출되는 area()는 넘겨받은 객체(Rectangle)의 구현이에요.'
        };
      }
    },
    {
      id: 'lateStaticBinding',
      title: '늦은 정적 바인딩: static::',
      ready: true,
      summary: 'self::와 달리, 실제로 호출된 자식 클래스를 기준으로 동작하는 static::를 배워요.',
      goals: ['self::의 한계(항상 정의된 클래스 기준)', 'static::는 실제 호출 시점의 클래스를 기준으로 함', 'static::를 이용한 팩토리 메서드 패턴'],
      blocks: [
        {
          h: '문제: self::의 한계',
          html: `<p><code>self::</code>는 그 메서드가 <b>정의된</b> 클래스를 항상 가리켜요. 자식 클래스에서 호출해도 결과는 바뀌지 않아요.</p>`,
          code: {
            label: 'self_limit.php',
            lang: 'php',
            src: `<?php
class Model {
    public static function create() {
        return new self();
    }
}

class User extends Model {
}

$u = User::create();
echo get_class($u);`,
            out: `Model`
          }
        },
        {
          h: '해결: static::',
          html: `<p><code>static::</code>는 실제로 <b>호출된</b> 클래스를 기준으로 동작해요. 어떤 클래스를 가리킬지가 코드를 작성하는 시점이 아니라 실제로 호출되는 시점에 "늦게" 결정되기 때문에 "늦은 정적 바인딩(late static binding)"이라고 불러요.</p>`,
          code: {
            label: 'late_static.php',
            lang: 'php',
            src: `<?php
class Model {
    public static function create() {
        return new static();
    }
}

class User extends Model {
}

$u = User::create();
echo get_class($u);`,
            out: `User`
          },
          after: `<div class="note"><b>정리</b> — static::는 부모 클래스에 공통 로직을 두면서도, 실제로는 호출한 자식 클래스의 객체를 만들어주고 싶을 때(예: 팩토리 메서드) 아주 유용해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const child = pick(['Product', 'Order', 'Invoice']);
          return {
            type: 'blank',
            q: `<code>class Model { public static function create() { return new self(); } } class ${child} extends Model {}</code>이고 <code>$x = ${child}::create(); echo get_class($x);</code>를 실행하면? (클래스 이름만 입력)`,
            prefix: '', suffix: '', accept: ['Model'], placeholder: '클래스 이름',
            why: 'self::는 항상 그 메서드가 정의된 클래스(Model)를 가리키므로, 어떤 자식으로 호출하든 결과는 Model이에요.',
            hint: 'self::는 호출한 클래스가 무엇이든 상관없이 항상 같은 클래스를 가리켜요.'
          };
        },
        () => makeChoice(
          'static::와 self::의 차이는?',
          'static::는 실제로 호출된 자식 클래스를 기준으로 하고, self::는 항상 그 메서드가 정의된 클래스를 기준으로 한다', ['static::는 private 멤버에만 쓸 수 있다', 'self::가 static::보다 항상 최신 문법이다', '둘은 완전히 같은 의미라서 구분할 필요가 없다'],
          'self::는 정적으로(코드를 쓴 위치 기준) 결정되고, static::는 실제 호출 시점(런타임)에 결정돼요.',
          '"늦은(late)"이라는 이름처럼, static::는 결정되는 시점이 더 늦어요(호출 시점).'
        ),
        () => {
          const child = pick(['Product', 'Order', 'Invoice']);
          return {
            type: 'blank',
            q: `<code>class Model { public static function create() { return new static(); } } class ${child} extends Model {}</code>이고 <code>$x = ${child}::create(); echo get_class($x);</code>를 실행하면? (클래스 이름만 입력)`,
            prefix: '', suffix: '', accept: [child], placeholder: '클래스 이름',
            why: `static::는 실제로 호출된 클래스(${child})를 기준으로 동작하므로 결과는 ${child}예요.`,
            hint: 'static::는 어디서 호출했는지에 따라 가리키는 클래스가 달라져요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>Model</code> 클래스 안에, static::를 이용해 "실제로 호출된 클래스"의 새 객체를 만들어 반환하는 static 메서드 <code>create</code>를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'public static function create() {\n    return new static();\n}',
          accept: ['public static function create() {\n    return new static();\n}'],
          why: 'new static()은 실제로 호출된 클래스의 객체를 만들어줘요.',
          hint: 'public static function create() { return new static(); } 형태를 그대로 써보세요.'
        }),
        () => makeChoice(
          '"늦은 정적 바인딩(late static binding)"이라는 이름이 붙은 이유는?',
          '어떤 클래스를 가리킬지가 코드를 작성하는 시점이 아니라, 실제로 호출되는 시점에 결정되기 때문', ['static 프로퍼티가 항상 늦게 초기화되기 때문', '이 기능이 PHP에서 가장 나중에 만들어진 기능이라서', '함수 실행 속도가 느려지기 때문'],
          'static::가 가리킬 클래스는 코드를 쓸 때 정해지는 게 아니라, 실제 호출이 일어나는 순간에 "늦게" 결정돼요.',
          '이름 자체가 핵심 동작 원리를 설명해요: "늦게(late)" "정적으로(static)" "묶인다(binding)".'
        ),
      ],
      boss: () => {
        const grandChild = pick(['Admin', 'SuperUser', 'Manager']);
        return {
          type: 'blank',
          q: `<code>class Model { public static function create() { return new static(); } } class User extends Model {} class ${grandChild} extends User {}</code>이고 <code>$x = ${grandChild}::create(); echo get_class($x);</code>를 실행하면? (클래스 이름만 입력)`,
          prefix: '', suffix: '', accept: [grandChild], placeholder: '클래스 이름',
          why: `static::는 실제로 호출된 클래스(${grandChild})를 기준으로 하므로, 상속 단계가 여러 개(Model → User → ${grandChild})여도 마지막에 호출한 클래스가 만들어져요.`,
          hint: 'static::는 상속 단계와 상관없이, 실제로 메서드를 호출한 클래스를 가리켜요.'
        };
      }
    },
    {
      id: 'enumsPhp',
      title: '이넘(enum): 정해진 값의 집합',
      ready: true,
      summary: 'PHP 8.1부터 등장한 enum으로, 정해진 값들 중 하나만 가지도록 제한하는 타입을 배워요.',
      goals: ['enum으로 정해진 값의 집합 정의하기', 'match와 함께 enum 다루기', '값이 연결된 backed enum과 from()/tryFrom()'],
      blocks: [
        {
          h: '정해진 값만 담는 타입: enum',
          html: `<p><code>enum</code>은 "이 값들 중 하나만 될 수 있다"는 걸 타입으로 표현해요. 문자열을 아무렇게나 쓰는 것과 달리, 오타나 잘못된 값이 들어올 여지를 원천적으로 막아줘요.</p>`,
          code: {
            label: 'enum_basic.php',
            lang: 'php',
            src: `<?php
enum Status {
    case Pending;
    case Done;
    case Cancelled;
}

$s = Status::Pending;
echo $s->name;`,
            out: `Pending`
          }
        },
        {
          h: 'enum과 match를 함께',
          html: `<p>enum의 각 case는 <code>match</code>와 아주 잘 어울려요. 모든 case를 다 처리했는지 실수 없이 확인하며 분기할 수 있어요.</p>`,
          code: {
            label: 'enum_match.php',
            lang: 'php',
            src: `<?php
enum Status {
    case Pending;
    case Done;
    case Cancelled;
}

function label(Status $s) {
    return match ($s) {
        Status::Pending => "대기중",
        Status::Done => "완료",
        Status::Cancelled => "취소됨",
    };
}

echo label(Status::Done);`,
            out: `완료`
          }
        },
        {
          h: '값이 연결된 backed enum',
          html: `<p><code>enum Status: string</code>처럼 타입을 지정하면, 각 case에 실제 값(문자열/정수)을 연결할 수 있어요. <code>::from(값)</code>으로 값을 가진 case를 찾을 수 있고, 값이 유효하지 않으면 오류가 나요(반대로 <code>::tryFrom()</code>은 오류 대신 null을 반환해요).</p>`,
          code: {
            label: 'enum_backed.php',
            lang: 'php',
            src: `<?php
enum Status: string {
    case Pending = 'pending';
    case Done = 'done';
    case Cancelled = 'cancelled';
}

$s = Status::from('done');
echo $s->value;`,
            out: `done`
          },
          after: `<div class="note"><b>정리</b> — 일반 enum은 이름(name)만 가지고, backed enum은 이름과 값(value)을 함께 가져요. DB나 API처럼 문자열/숫자로 값을 주고받아야 할 때 backed enum이 유용해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const c = pick(['Pending', 'Done', 'Cancelled']);
          return {
            type: 'blank',
            q: `<code>enum Status { case Pending; case Done; case Cancelled; }</code>이고 <code>$s = Status::${c}; echo $s->name;</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [c], placeholder: '출력 결과',
            why: `->name은 그 case의 이름을 그대로 반환하므로 "${c}"가 출력돼요.`,
            hint: '일반 enum의 ->name은 case의 이름 그 자체를 문자열로 돌려줘요.'
          };
        },
        () => {
          const map = { Pending: '대기중', Done: '완료', Cancelled: '취소됨' };
          const c = pick(Object.keys(map));
          return makeChoice(
            `<code>function label(Status $s) { return match ($s) { Status::Pending => "대기중", Status::Done => "완료", Status::Cancelled => "취소됨", }; }</code>이고 <code>label(Status::${c})</code>의 결과는?`,
            map[c], Object.values(map).filter(v => v !== map[c]),
            `match는 넘겨받은 case(Status::${c})와 일치하는 분기의 값을 반환하므로 "${map[c]}"예요.`,
            'match는 enum의 각 case를 정확히 비교해서 해당하는 분기를 찾아요.'
          );
        },
        () => {
          const map = { pending: 'Pending', done: 'Done', cancelled: 'Cancelled' };
          const v = pick(Object.keys(map));
          return {
            type: 'blank',
            q: `<code>enum Status: string { case Pending = 'pending'; case Done = 'done'; case Cancelled = 'cancelled'; }</code>이고 <code>$s = Status::from('${v}'); echo $s->name;</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [map[v]], placeholder: '출력 결과',
            why: `Status::from('${v}')는 값이 '${v}'인 case를 찾아 반환하므로, 그 이름인 "${map[v]}"가 출력돼요.`,
            hint: 'from()은 값을 보고 일치하는 case를 찾아 그 case 자체를 반환해요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>enum Status: string { case Pending = \'pending\'; case Done = \'done\'; }</code>에 값 <code>\'archived\'</code>를 가지는 <code>Archived</code> case를 추가하는 한 줄을 작성하세요.',
          starter: '',
          placeholder: "case Archived = 'archived';",
          accept: ["case Archived = 'archived';"],
          why: 'backed enum의 각 case는 case 이름 = 값; 형태로 값을 연결해요.',
          hint: "case Archived = 'archived'; 형태를 그대로 써보세요."
        }),
        () => makeChoice(
          'tryFrom()과 from()의 차이는?',
          'tryFrom은 일치하는 값이 없으면 null을 반환하고, from은 오류를 던진다', ['tryFrom은 항상 첫 번째 case를 반환한다', 'from은 문자열만, tryFrom은 정수만 받는다', '둘은 완전히 같은 동작을 한다'],
          'tryFrom은 실패를 오류 대신 null로 알려줘서, 값이 유효한지 안전하게 확인할 때 유용해요.',
          '"시도해본다(try)"는 이름처럼, 실패해도 프로그램이 멈추지 않아요.'
        ),
      ],
      boss: () => {
        const invalid = Math.random() < 0.5;
        const map = { pending: 'Pending', done: 'Done', cancelled: 'Cancelled' };
        const v = invalid ? 'unknown' : pick(Object.keys(map));
        const result = invalid ? '없음' : map[v];
        return {
          type: 'blank',
          q: `<code>enum Status: string { case Pending = 'pending'; case Done = 'done'; case Cancelled = 'cancelled'; }</code>이고 <code>$s = Status::tryFrom('${v}'); echo $s === null ? "없음" : $s->name;</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [result], placeholder: '출력 결과',
          why: invalid
            ? `'${v}'은 어떤 case의 값과도 일치하지 않으므로 tryFrom은 null을 반환해서 "없음"이 출력돼요.`
            : `'${v}'은 ${result} case의 값이므로 tryFrom이 그 case를 반환하고, 이름은 "${result}"예요.`,
          hint: 'tryFrom은 일치하는 값이 없으면 null을, 있으면 해당 case를 반환해요.'
        };
      }
    },
    {
      id: 'readonlyProperties',
      title: 'readonly 프로퍼티: 한 번만 정해지는 값',
      ready: true,
      summary: '한 번 값이 정해지면 다시는 바꿀 수 없는 readonly 프로퍼티로, 불변 객체를 만드는 법을 배워요.',
      goals: ['readonly 프로퍼티는 딱 한 번만 값을 설정 가능', '이후에 값을 바꾸려 하면 오류가 발생', '불변(immutable) 객체를 쓰는 이유'],
      blocks: [
        {
          h: '한 번만 정해지는 값: readonly',
          html: `<p><code>readonly</code>가 붙은 프로퍼티는 타입을 반드시 지정해야 하고, 보통 생성자 안에서 딱 한 번 값을 채워요.</p>`,
          code: {
            label: 'readonly_basic.php',
            lang: 'php',
            src: `<?php
class Point {
    public readonly int $x;
    public readonly int $y;

    public function __construct(int $x, int $y) {
        $this->x = $x;
        $this->y = $y;
    }
}

$p = new Point(3, 5);
echo $p->x . ", " . $p->y;`,
            out: `3, 5`
          }
        },
        {
          h: '다시 바꾸려 하면 오류',
          html: `<p>이미 값이 설정된 readonly 프로퍼티에 다시 대입하려 하면, 그곳이 생성자 안이든 밖이든 상관없이 오류가 발생해요.</p>`,
          code: {
            label: 'readonly_error.php',
            lang: 'php',
            src: `<?php
class Point {
    public readonly int $x;

    public function __construct(int $x) {
        $this->x = $x;
    }
}

$p = new Point(3);
$p->x = 10; // 오류! readonly 프로퍼티는 재할당할 수 없음`
          },
          after: `<div class="note"><b>정리</b> — 불변(immutable) 객체는 어딘가에서 예상치 못하게 값이 바뀌는 버그를 막아주고, "이 값은 절대 안 변한다"는 걸 코드로 보장해줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const x = randInt(1, 20);
          const y = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>class Point { public readonly int $x; public readonly int $y; public function __construct(int $x, int $y) { $this->x = $x; $this->y = $y; } }</code>이고 <code>$p = new Point(${x}, ${y}); echo $p->x . ", " . $p->y;</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${x}, ${y}`], placeholder: '출력 결과',
            why: `생성자에서 받은 값이 그대로 readonly 프로퍼티에 저장되어 "${x}, ${y}"가 출력돼요.`,
            hint: 'readonly여도 처음 한 번 값을 넣는 건 정상적으로 동작해요.'
          };
        },
        () => makeChoice(
          'readonly 프로퍼티의 특징으로 알맞은 것은?',
          '한 번 값이 설정되면 이후에는 다시 대입할 수 없다', ['private 프로퍼티와 완전히 같은 의미다', '항상 static이어야 한다', '생성자 안에서는 값을 못 넣는다'],
          'readonly는 값을 "한 번만" 쓸 수 있게 해서, 이미 값이 있으면 다시 대입 시 오류가 나요.',
          '"읽기 전용(readonly)"이라는 이름처럼, 한 번 쓰이고 나면 그 뒤로는 읽기만 가능해요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>class Point { public readonly int $x; public function __construct(int $x) { $this->x = $x; } } $p = new Point(3); $p->x = 10;</code>를 실행하면 어떻게 될까요? ("오류"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['오류'], placeholder: '결과',
          why: '$p->x는 이미 생성자에서 값이 설정된 readonly 프로퍼티라서, 다시 대입하려 하면 오류가 발생해요.',
          hint: 'readonly 프로퍼티는 이미 값이 있으면 두 번째 대입을 허용하지 않아요.'
        }),
        () => ({
          type: 'code',
          q: '타입이 int이고, 한 번만 값을 설정할 수 있는 readonly 프로퍼티 <code>$id</code>를 선언하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'public readonly int $id;',
          accept: ['public readonly int $id;'],
          why: 'readonly 프로퍼티는 반드시 타입을 지정해야 해요.',
          hint: 'public readonly int $id; 형태를 그대로 써보세요.'
        }),
        () => makeChoice(
          'readonly 프로퍼티를 쓰는 이유로 알맞은 것은?',
          '객체가 생성된 후 값이 실수로 바뀌는 것을 막아 불변성을 보장하기 위해', ['코드 실행 속도를 항상 더 빠르게 만들기 위해', '메모리를 자동으로 절약해주기 때문에', 'private보다 접근 범위를 넓히기 위해'],
          'readonly는 "값이 절대 바뀌지 않는다"는 걸 코드로 보장해서, 예상치 못한 변경으로 인한 버그를 막아줘요.',
          '값 객체(Value Object)처럼 "한 번 만들어지면 그대로여야 하는" 데이터에 잘 어울려요.'
        ),
      ],
      boss: () => {
        const x = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>class Point { public readonly int $x; public function __construct(int $x) { $this->x = $x; } public function reset() { $this->x = 0; } }</code>이고 <code>$p = new Point(${x}); $p->reset();</code>를 실행하면 오류가 발생할까요? (예/아니오)`,
          prefix: '', suffix: '', accept: ['예'], placeholder: '예 / 아니오',
          why: 'reset() 안에서도 readonly 프로퍼티에 두 번째로 값을 대입하려 하고 있으므로, 생성자 밖이라도 오류가 발생해요.',
          hint: 'readonly는 "생성자에서만" 허용되는 게 아니라 "단 한 번만" 값을 대입할 수 있다는 뜻이에요.'
        };
      }
    },
    {
      id: 'firstClassCallableSyntax',
      title: '1급 callable 문법: 함수이름(...)',
      ready: true,
      summary: 'PHP 8.1부터 지원하는 함수이름(...) 문법으로, 함수나 메서드를 간단히 클로저로 만드는 법을 배워요.',
      goals: ['기존 방식(문자열 콜러블)의 번거로움', '함수이름(...)으로 클로저 만들기', '정적/인스턴스 메서드에도 똑같이 적용하기'],
      blocks: [
        {
          h: '기존 방식: 문자열로 콜러블 만들기',
          html: `<p>예전에는 함수를 값처럼 다루려면 함수 이름을 문자열로 쓰거나 <code>Closure::fromCallable()</code>을 써야 했어요. 오타가 나도 실행 전까지는 알기 어렵다는 단점이 있었어요.</p>`,
          code: {
            label: 'callable_old.php',
            lang: 'php',
            src: `<?php
$upper = Closure::fromCallable('strtoupper');
echo $upper("hello");`,
            out: `HELLO`
          }
        },
        {
          h: '더 간단하게: 함수이름(...)',
          html: `<p>PHP 8.1부터는 함수 이름 뒤에 <code>(...)</code>만 붙이면 그 함수를 가리키는 클로저가 바로 만들어져요. 함수를 호출하는 게 아니라 "가리키기만" 하는 거예요.</p>`,
          code: {
            label: 'callable_new.php',
            lang: 'php',
            src: `<?php
$upper = strtoupper(...);
echo $upper("hello");`,
            out: `HELLO`
          }
        },
        {
          h: '메서드에도 똑같이',
          html: `<p>이 문법은 정적 메서드(<code>ClassName::method(...)</code>)와 인스턴스 메서드(<code>$obj-&gt;method(...)</code>)에도 그대로 쓸 수 있어요.</p>`,
          code: {
            label: 'callable_method.php',
            lang: 'php',
            src: `<?php
class Greeter {
    public function greet($name) {
        return "안녕, " . $name . "!";
    }
}

$g = new Greeter();
$greetFn = $g->greet(...);
echo $greetFn("지수");`,
            out: `안녕, 지수!`
          },
          after: `<div class="note"><b>정리</b> — 함수이름(...)은 문자열/배열 기반 콜러블보다 IDE 자동완성과 정적 분석이 잘 되고, 오타를 미리(파싱 시점에) 잡아낼 수 있어서 실무에서 선호돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 9);
          return {
            type: 'blank',
            q: `<code>function times2($n) { return $n * 2; } $fn = times2(...); echo $fn(${n});</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n * 2)], placeholder: '숫자',
            why: `times2(...)는 times2 함수를 가리키는 클로저를 만들고, $fn(${n})은 그 함수를 호출한 것과 같아서 ${n} * 2 = ${n * 2}예요.`,
            hint: 'times2(...)는 함수를 즉시 호출하는 게 아니라, 그 함수를 가리키는 클로저를 만들어요.'
          };
        },
        () => makeChoice(
          '함수이름(...) 문법(1급 callable)의 의미는?',
          '그 함수를 호출하지 않고, 그 함수를 가리키는 클로저를 만든다', ['함수를 즉시 호출하고 결과를 클로저로 감싼다', '가변 인자(...)를 받는 함수로 정의를 바꾼다', '배열의 요소를 모두 펼쳐서 전달한다'],
          '(...)는 함수를 호출하는 괄호가 아니라, "이 함수를 가리키는 클로저를 만들어라"는 문법이에요.',
          '변수에 담긴 결과가 아니라 "함수 자체"를 다루고 싶을 때 쓰는 문법이에요.'
        ),
        () => {
          const n = randInt(2, 9);
          return {
            type: 'blank',
            q: `<code>class MathUtil { public static function square($n) { return $n * $n; } } $fn = MathUtil::square(...); echo $fn(${n});</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n * n)], placeholder: '숫자',
            why: `MathUtil::square(...)는 그 static 메서드를 가리키는 클로저를 만들어서, $fn(${n})은 ${n} * ${n} = ${n * n}이 돼요.`,
            hint: '클래스이름::메서드(...) 형태로도 1급 callable을 만들 수 있어요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>$g</code>는 <code>Greeter</code> 객체예요. 그 인스턴스 메서드 <code>greet</code>를 호출하지 않고, 가리키기만 하는 클로저를 만들어 <code>$greetFn</code>에 담는 코드를 한 줄로 작성하세요.',
          starter: '',
          placeholder: '$greetFn = $g->greet(...);',
          accept: ['$greetFn = $g->greet(...);'],
          why: '$g->greet(...)는 greet 메서드를 즉시 호출하지 않고, 그 메서드를 가리키는 클로저를 만들어요.',
          hint: '$greetFn = $g->greet(...); 형태를 그대로 써보세요.'
        }),
        () => makeChoice(
          '1급 callable 문법(...)의 장점으로 알맞은 것은?',
          '문자열이나 배열로 콜러블을 표현할 때보다 IDE 자동완성이 잘 되고, 오타를 미리 잡아낼 수 있다', ['실행 속도가 다른 모든 문법보다 항상 빠르다', '함수의 매개변수 개수를 자동으로 줄여준다', '반환 타입을 항상 문자열로 강제한다'],
          '함수를 실제 코드 요소로 다루기 때문에, 문자열 오타로 인한 실수를 파싱 시점에 미리 잡아낼 수 있어요.',
          '문자열 "함수이름" 방식은 오타가 나도 실행 전까지 모르지만, (...)는 그렇지 않아요.'
        ),
      ],
      boss: () => {
        const nums = [randInt(1, 5), randInt(1, 5), randInt(1, 5)];
        const doubled = nums.map(n => n * 2);
        return {
          type: 'blank',
          q: `<code>function times2($n) { return $n * 2; } $fn = times2(...); $result = array_map($fn, [${nums.join(', ')}]); echo implode(', ', $result);</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [doubled.join(', ')], placeholder: '출력 결과',
          why: `times2(...)로 만든 클로저를 array_map에 넘기면 배열의 각 원소에 함수가 적용되어, [${nums.join(', ')}]의 각 값이 2배가 되어 ${doubled.join(', ')}가 돼요.`,
          hint: 'times2(...)는 times2 함수를 가리키는 클로저를 만들고, array_map은 그 클로저를 배열의 각 원소에 적용해요.'
        };
      }
    },
    {
      id: 'arrowFunctionsPhp',
      title: '화살표 함수: fn()',
      ready: true,
      summary: '짧은 표현식 하나만 계산하는 함수를 간결하게 쓰는 화살표 함수(fn)와, 바깥 변수를 자동으로 가져오는 특징을 배워요.',
      goals: ['fn(매개변수) => 표현식 문법', '바깥 변수를 use() 없이 자동으로 캡처', '표현식 하나만 담을 수 있다는 제약'],
      blocks: [
        {
          h: '기존 클로저: function과 use',
          html: `<p>바깥 변수를 클로저 안에서 쓰려면 <code>use ($변수)</code>로 명시적으로 가져와야 했어요.</p>`,
          code: {
            label: 'closure_use.php',
            lang: 'php',
            src: `<?php
$bonus = 10;
$addBonus = function ($score) use ($bonus) {
    return $score + $bonus;
};
echo $addBonus(50);`,
            out: `60`
          }
        },
        {
          h: '더 짧게: 화살표 함수 fn',
          html: `<p><code>fn(매개변수) => 표현식</code> 형태의 화살표 함수는 <code>use()</code> 없이도 바깥 스코프의 변수를 자동으로(값으로) 가져와요.</p>`,
          code: {
            label: 'arrow_fn.php',
            lang: 'php',
            src: `<?php
$bonus = 10;
$addBonus = fn($score) => $score + $bonus;
echo $addBonus(50);`,
            out: `60`
          }
        },
        {
          h: '주의: 표현식 하나만 담을 수 있어요',
          html: `<p>화살표 함수의 본문은 <code>=&gt;</code> 뒤에 딱 하나의 표현식만 올 수 있어요. if문, 반복문, 여러 줄의 코드가 필요하다면 일반 클로저(<code>function</code>)를 써야 해요.</p>`,
          after: `<div class="note"><b>정리</b> — 화살표 함수는 <code>array_map</code>, <code>usort</code> 같은 곳에 넘기는 짧은 콜백을 쓸 때 특히 편리해요. 단, 바깥 변수는 정의되는 "그 순간의 값"을 캡처한다는 점(use($var)와 같은 방식)을 기억해두세요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const bonus = randInt(5, 20);
          const score = randInt(10, 50);
          return {
            type: 'blank',
            q: `<code>$bonus = ${bonus}; $addBonus = fn($score) => $score + $bonus; echo $addBonus(${score});</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(bonus + score)], placeholder: '숫자',
            why: `fn은 바깥의 $bonus(${bonus})를 자동으로 캡처하므로 ${score} + ${bonus} = ${bonus + score}예요.`,
            hint: 'fn 화살표 함수는 use() 없이도 바깥 변수를 자동으로 가져와요.'
          };
        },
        () => makeChoice(
          'fn() 화살표 함수의 특징으로 알맞은 것은?',
          '바깥 스코프의 변수를 use() 없이 자동으로 값으로 캡처한다', ['본문에 여러 줄의 문장을 자유롭게 쓸 수 있다', '바깥 변수를 항상 참조(reference)로 캡처한다', 'function 키워드보다 항상 실행 속도가 빠르다'],
          '화살표 함수는 use()를 쓰지 않아도 바깥 변수를 자동으로(값으로) 가져와서 쓸 수 있어요.',
          '일반 클로저의 use($var)를 자동으로 해주는 셈이라고 생각하면 쉬워요.'
        ),
        () => {
          const nums = [randInt(1, 9), randInt(1, 9), randInt(1, 9)];
          const squared = nums.map(n => n * n);
          return {
            type: 'blank',
            q: `<code>$nums = [${nums.join(', ')}]; $squares = array_map(fn($n) => $n * $n, $nums); echo implode(', ', $squares);</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [squared.join(', ')], placeholder: '출력 결과',
            why: `array_map은 각 원소에 fn($n) => $n * $n을 적용하므로, [${nums.join(', ')}]이 각각 제곱되어 ${squared.join(', ')}가 돼요.`,
            hint: '화살표 함수는 array_map 같은 곳에 넘기는 짧은 콜백으로 자주 쓰여요.'
          };
        },
        () => ({
          type: 'code',
          q: '매개변수 <code>$n</code>을 받아 <code>$n * 2</code>를 반환하는 화살표 함수를 만들어 <code>$double</code>에 담는 코드를 작성하세요.',
          starter: '',
          placeholder: '$double = fn($n) => $n * 2;',
          accept: ['$double = fn($n) => $n * 2;'],
          why: 'fn(매개변수) => 표현식 형태로 화살표 함수를 만들어요.',
          hint: '$double = fn($n) => $n * 2; 형태를 그대로 써보세요.'
        }),
        () => makeChoice(
          '화살표 함수(fn) 안에 넣을 수 없는 것은?',
          '여러 줄의 문장이나 if/반복문 같은 제어 구조', ['바깥 스코프에 있는 변수', '매개변수', '사칙연산 표현식'],
          '화살표 함수는 => 뒤에 단 하나의 표현식만 올 수 있어서, 여러 문장이나 제어 구조는 담을 수 없어요.',
          '여러 줄의 로직이 필요하면 화살표 함수 대신 일반 function(...) use(...) { }를 써야 해요.'
        ),
      ],
      boss: () => {
        const bonus1 = randInt(5, 15);
        const bonus2 = bonus1 + randInt(1, 10);
        const score = randInt(10, 50);
        const result = score + bonus1;
        return {
          type: 'blank',
          q: `<code>$bonus = ${bonus1}; $addBonus = fn($score) => $score + $bonus; $bonus = ${bonus2}; echo $addBonus(${score});</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
          why: `fn 화살표 함수는 정의되는 시점의 $bonus 값(${bonus1})을 값으로 캡처하므로, 이후 $bonus를 ${bonus2}로 바꿔도 영향받지 않아 ${score} + ${bonus1} = ${result}이에요.`,
          hint: '화살표 함수는 use()가 없어도, 정의 시점의 바깥 변수 값을 스냅샷처럼 캡처해요.'
        };
      }
    },
    {
      id: 'arrayDestructuring',
      title: '배열 구조 분해',
      ready: true,
      summary: '배열의 각 요소를 한 번에 여러 변수로 나눠 담는 배열 구조 분해 문법을 배워요.',
      goals: ['[$a, $b] = $array로 한 번에 여러 변수 담기', '쉼표로 필요 없는 값 건너뛰기', '키를 지정해 연관 배열도 구조 분해하기'],
      blocks: [
        {
          h: '한 번에 여러 변수 담기',
          html: `<p><code>[$a, $b] = $array;</code>처럼 쓰면, 배열의 각 요소를 순서대로 여러 변수에 한 번에 나눠 담을 수 있어요.</p>`,
          code: {
            label: 'destructure_basic.php',
            lang: 'php',
            src: `<?php
[$name, $age] = ["지수", 17];
echo $name . " " . $age;`,
            out: `지수 17`
          }
        },
        {
          h: '필요한 값만 건너뛰며 담기',
          html: `<p>쉼표 사이를 비워두면 그 위치의 값은 건너뛰고 무시할 수 있어요.</p>`,
          code: {
            label: 'destructure_skip.php',
            lang: 'php',
            src: `<?php
[$first, , $third] = [1, 2, 3];
echo $first . " " . $third;`,
            out: `1 3`
          }
        },
        {
          h: '연관 배열은 키로 구조 분해',
          html: `<p>연관 배열은 <code>["키" =&gt; $변수]</code> 형태로, 순서가 아니라 키를 기준으로 구조 분해할 수 있어요.</p>`,
          code: {
            label: 'destructure_assoc.php',
            lang: 'php',
            src: `<?php
$student = ["name" => "민준", "age" => 16];
["name" => $name, "age" => $age] = $student;
echo $name . " " . $age;`,
            out: `민준 16`
          },
          after: `<div class="note"><b>정리</b> — 배열 구조 분해는 foreach와 함께 쓰면 여러 행(row)을 한 번에 풀어서 받을 때 특히 편리해요. 예: <code>foreach ($rows as [$id, $name]) { ... }</code></div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>[$name, $age] = ["${name}", ${age}]; echo $name . " " . $age;</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${name} ${age}`], placeholder: '출력 결과',
            why: `배열의 첫 번째 값("${name}")이 $name에, 두 번째 값(${age})이 $age에 순서대로 담겨서 "${name} ${age}"가 출력돼요.`,
            hint: '[$a, $b] = [값1, 값2]는 순서대로 각 변수에 값을 담아요.'
          };
        },
        () => makeChoice(
          '배열 구조 분해([$a, $b] = $array)의 특징으로 알맞은 것은?',
          '배열의 각 요소를 한 번에 여러 변수에 나눠 담을 수 있다', ['배열을 항상 정렬한 뒤에 담는다', '연관 배열에는 절대 쓸 수 없다', '한 번에 하나의 변수에만 값을 담을 수 있다'],
          '구조 분해는 여러 변수를 한 줄로 한 번에 채울 수 있게 해줘요.',
          '$a = $array[0]; $b = $array[1]; 을 한 줄로 줄인 것과 비슷해요.'
        ),
        () => {
          const a = randInt(1, 9);
          const b = randInt(10, 19);
          const c = randInt(20, 29);
          return {
            type: 'blank',
            q: `<code>[$first, , $third] = [${a}, ${b}, ${c}]; echo $first . " " . $third;</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${a} ${c}`], placeholder: '출력 결과',
            why: `가운데 자리를 비워뒀으므로 ${b}는 무시되고, $first에는 ${a}, $third에는 ${c}가 담겨 "${a} ${c}"가 출력돼요.`,
            hint: '쉼표 사이를 비워두면 그 위치의 값은 그냥 건너뛰어요.'
          };
        },
        () => ({
          type: 'code',
          q: '연관 배열 <code>$student</code>(키 "name", "age")를 <code>$name</code>, <code>$age</code> 변수로 구조 분해하는 코드를 작성하세요.',
          starter: '',
          placeholder: '["name" => $name, "age" => $age] = $student;',
          accept: ['["name" => $name, "age" => $age] = $student;'],
          why: '연관 배열은 ["키" => $변수] 형태로 키를 지정해서 구조 분해해요.',
          hint: '["name" => $name, "age" => $age] = $student; 형태를 그대로 써보세요.'
        }),
        () => makeChoice(
          '<code>list($a, $b) = [1, 2];</code>와 <code>[$a, $b] = [1, 2];</code>의 관계는?',
          '완전히 같은 동작을 하는, 서로 바꿔 쓸 수 있는 문법이다', ['list()가 항상 더 빠르게 동작한다', '[] 문법은 연관 배열에서만 쓸 수 있다', 'list()는 최대 2개의 변수만 담을 수 있다'],
          'list(...)와 [...] 구조 분해 문법은 동일한 기능을 하며, 최신 코드에서는 보통 []가 더 많이 쓰여요.',
          '둘 다 "배열을 여러 변수로 풀어 담는다"는 같은 목적의 문법이에요.'
        ),
      ],
      boss: () => {
        const a = randInt(1, 9);
        const b = randInt(1, 9);
        const c = randInt(1, 9);
        return {
          type: 'blank',
          q: `<code>[[$a, $b], $c] = [[${a}, ${b}], ${c}]; echo $a . " " . $b . " " . $c;</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`${a} ${b} ${c}`], placeholder: '출력 결과',
          why: `배열 구조 분해는 중첩된 배열에도 그대로 적용되어, 안쪽 배열 [${a}, ${b}]이 각각 $a, $b에, 바깥의 ${c}가 $c에 담겨요.`,
          hint: '구조 분해 문법은 배열 안에 배열이 있어도 그 모양 그대로 대응시켜 담아요.'
        };
      }
    },
    {
      id: 'spreadOperatorArrays',
      title: '배열 스프레드 연산자: ...',
      ready: true,
      summary: '배열 리터럴 안에서 다른 배열의 요소를 그대로 펼쳐 넣는 스프레드 연산자(...)를 배워요.',
      goals: ['[...$arr]로 배열 안에서 다른 배열 펼치기', '여러 배열을 이어붙이거나 값을 추가하기', '문자열 키가 겹칠 때의 동작(array_merge와 비슷)'],
      blocks: [
        {
          h: '배열 안에서 배열 펼치기',
          html: `<p><code>[...$fruits, "포도"]</code>처럼 배열 리터럴 안에 <code>...$배열</code>을 쓰면, 그 배열의 요소들이 그 자리에 그대로 펼쳐져 들어가요.</p>`,
          code: {
            label: 'spread_basic.php',
            lang: 'php',
            src: `<?php
$fruits = ["사과", "바나나"];
$more = [...$fruits, "포도"];
echo implode(", ", $more);`,
            out: `사과, 바나나, 포도`
          }
        },
        {
          h: '여러 배열 한 번에 합치기',
          html: `<p>스프레드는 여러 배열을 순서대로 이어붙이는 데도 유용해요.</p>`,
          code: {
            label: 'spread_merge.php',
            lang: 'php',
            src: `<?php
$a = [1, 2];
$b = [3, 4];
$combined = [...$a, ...$b];
echo implode(", ", $combined);`,
            out: `1, 2, 3, 4`
          }
        },
        {
          h: '문자열 키가 겹치면?',
          html: `<p>문자열 키를 가진 배열을 펼칠 때 같은 키가 겹치면, <code>array_merge</code>처럼 <b>나중에 나온 값이 이전 값을 덮어써요</b>.</p>`,
          code: {
            label: 'spread_override.php',
            lang: 'php',
            src: `<?php
$defaults = ["theme" => "dark", "lang" => "ko"];
$overrides = ["lang" => "en"];
$settings = [...$defaults, ...$overrides];
echo $settings["theme"] . " " . $settings["lang"];`,
            out: `dark en`
          },
          after: `<div class="note"><b>정리</b> — 숫자 인덱스는 펼쳐지면서 순서대로 다시 매겨지고, 문자열 키는 겹치면 나중 값이 이긴다는 점을 array_merge와 비슷하게 기억해두면 좋아요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = [randInt(1, 9), randInt(1, 9)];
          const b = [randInt(1, 9), randInt(1, 9)];
          const combined = [...a, ...b];
          return {
            type: 'blank',
            q: `<code>$a = [${a.join(', ')}]; $b = [${b.join(', ')}]; $combined = [...$a, ...$b]; echo implode(", ", $combined);</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [combined.join(', ')], placeholder: '출력 결과',
            why: `[...$a, ...$b]는 $a의 요소들을 먼저, 그 다음 $b의 요소들을 이어붙이므로 ${combined.join(', ')}가 돼요.`,
            hint: '...는 배열의 요소를 그 자리에 순서대로 펼쳐 넣어요.'
          };
        },
        () => makeChoice(
          '배열 스프레드 연산자([...$arr])의 특징으로 알맞은 것은?',
          '배열 리터럴 안에서 다른 배열의 요소들을 그 자리에 그대로 펼쳐 넣는다', ['배열의 요소를 무작위로 섞는다', '배열을 항상 오름차순으로 정렬한다', '배열의 첫 번째 요소만 꺼내온다'],
          '...는 배열의 각 요소를 펼쳐서 새로운 배열 리터럴 안에 그대로 나열해줘요.',
          '"펼치다(spread)"라는 이름처럼, 배열 하나를 여러 개의 개별 요소로 풀어 놓는 거예요.'
        ),
        () => {
          const langs = ['en', 'ja', 'fr'];
          const lang = pick(langs);
          return {
            type: 'blank',
            q: `<code>$defaults = ["theme" => "dark", "lang" => "ko"]; $overrides = ["lang" => "${lang}"]; $settings = [...$defaults, ...$overrides]; echo $settings["theme"] . " " . $settings["lang"];</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`dark ${lang}`], placeholder: '출력 결과',
            why: `theme은 $overrides에 없으므로 그대로 "dark"가 남고, lang은 겹치므로 나중에 펼친 $overrides의 값 "${lang}"이 덮어써서 "dark ${lang}"이 돼요.`,
            hint: '같은 문자열 키가 겹치면, 나중에 펼친 배열의 값이 이전 값을 덮어써요.'
          };
        },
        () => ({
          type: 'code',
          q: '배열 <code>$a</code>와 <code>$b</code>를 순서대로 이어붙인 새 배열을 만들어 <code>$combined</code>에 담는 코드를 스프레드 연산자로 작성하세요.',
          starter: '',
          placeholder: '$combined = [...$a, ...$b];',
          accept: ['$combined = [...$a, ...$b];'],
          why: '[...$a, ...$b]는 $a의 요소들 뒤에 $b의 요소들을 이어붙여요.',
          hint: '$combined = [...$a, ...$b]; 형태를 그대로 써보세요.'
        }),
        () => makeChoice(
          '배열 스프레드와 array_merge()의 관계로 알맞은 것은?',
          '문자열 키가 겹치면 나중에 나온 배열의 값이 덮어쓴다는 점에서 array_merge와 비슷하게 동작한다', ['스프레드는 문자열 키를 가진 배열에는 전혀 쓸 수 없다', 'array_merge는 배열을 절대 합칠 수 없는 함수다', '스프레드는 항상 원본 배열의 순서를 무시하고 무작위로 섞는다'],
          '숫자 인덱스는 다시 매겨지고, 문자열 키는 겹치면 뒤에 오는 값이 이긴다는 점이 array_merge와 유사해요.',
          '스프레드가 array_merge를 완전히 대체하지는 않지만, 배열 리터럴 문법 안에서 비슷한 동작을 해요.'
        ),
      ],
      boss: () => {
        const a = [randInt(1, 9)];
        const b = [randInt(1, 9), randInt(1, 9)];
        const mid = randInt(90, 99);
        const combined = [...a, mid, ...b];
        return {
          type: 'blank',
          q: `<code>$a = [${a.join(', ')}]; $b = [${b.join(', ')}]; $combined = [...$a, ${mid}, ...$b]; echo implode(", ", $combined);</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [combined.join(', ')], placeholder: '출력 결과',
          why: `스프레드와 일반 값을 섞어 쓸 수 있어서, $a의 요소 뒤에 ${mid}가 그대로 들어가고 이어서 $b의 요소들이 펼쳐져 ${combined.join(', ')}가 돼요.`,
          hint: '스프레드(...)와 평범한 값을 배열 리터럴 안에 자유롭게 섞어 쓸 수 있어요.'
        };
      }
    },
    {
      id: 'nullCoalescingAssignment',
      title: '널 병합 대입 연산자: ??=',
      ready: true,
      summary: '변수(또는 배열 키)가 없거나 null일 때만 값을 대입하는 ??= 연산자로, 기본값 설정 코드를 간결하게 쓰는 법을 배워요.',
      goals: ['??=의 동작(없거나 null일 때만 대입)', '기존 isset() + if 코드와의 비교', '배열 키의 기본값 설정에 활용하기'],
      blocks: [
        {
          h: '기존 방식: isset()으로 기본값 설정',
          html: `<p>키가 없을 때만 기본값을 넣고 싶다면, 원래는 <code>isset()</code>으로 먼저 확인하는 코드가 필요했어요.</p>`,
          code: {
            label: 'default_old.php',
            lang: 'php',
            src: `<?php
$settings = [];
if (!isset($settings['theme'])) {
    $settings['theme'] = 'light';
}
echo $settings['theme'];`,
            out: `light`
          }
        },
        {
          h: '더 짧게: ??=',
          html: `<p><code>$변수 ??= 값;</code>은 "$변수가 없거나 null이면 값을 대입하고, 이미 값이 있으면 그대로 둔다"는 뜻이에요.</p>`,
          code: {
            label: 'default_new.php',
            lang: 'php',
            src: `<?php
$settings = [];
$settings['theme'] ??= 'light';
echo $settings['theme'];`,
            out: `light`
          }
        },
        {
          h: '이미 값이 있으면 그대로',
          html: `<p>이미 null이 아닌 값이 있다면, <code>??=</code>는 아무 일도 하지 않고 기존 값을 그대로 유지해요.</p>`,
          code: {
            label: 'default_existing.php',
            lang: 'php',
            src: `<?php
$settings = ['theme' => 'dark'];
$settings['theme'] ??= 'light';
echo $settings['theme'];`,
            out: `dark`
          },
          after: `<div class="note"><b>정리</b> — ??=는 "값이 없을 때만 채워 넣는" 기본값 설정 코드를 한 줄로 줄여줘서, 설정값·옵션 처리에 자주 쓰여요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const val = pick(['light', 'dark', 'auto']);
          return {
            type: 'blank',
            q: `<code>$settings = []; $settings['theme'] ??= '${val}'; echo $settings['theme'];</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [val], placeholder: '출력 결과',
            why: `$settings['theme']가 처음엔 존재하지 않으므로 ??=가 '${val}'을 대입해서 "${val}"이 출력돼요.`,
            hint: '??=는 왼쪽 값이 없거나 null일 때만 오른쪽 값을 대입해요.'
          };
        },
        () => makeChoice(
          '<code>$x ??= 값;</code>의 동작으로 알맞은 것은?',
          '$x가 없거나 null이면 값을 대입하고, 이미 값이 있으면 그대로 둔다', ['$x의 값과 상관없이 항상 값을 새로 대입한다', '$x가 0이거나 빈 문자열이어도 항상 값을 대입한다', '$x가 이미 있으면 오류를 발생시킨다'],
          '??=는 null 병합 연산자(??)와 대입(=)이 합쳐진 것으로, "없을 때만 채운다"는 뜻이에요.',
          '0이나 빈 문자열은 null이 아니므로, ??=는 그런 값은 그대로 유지해요.'
        ),
        () => {
          const existing = pick(['dark', 'blue', 'red']);
          const fallback = pick(['light', 'green', 'gray']);
          return {
            type: 'blank',
            q: `<code>$settings = ['theme' => '${existing}']; $settings['theme'] ??= '${fallback}'; echo $settings['theme'];</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [existing], placeholder: '출력 결과',
            why: `$settings['theme']에 이미 '${existing}'이라는 null이 아닌 값이 있으므로 ??=는 아무 일도 하지 않고 그대로 "${existing}"이 출력돼요.`,
            hint: '이미 값이 있으면 ??=는 그 값을 건드리지 않아요.'
          };
        },
        () => ({
          type: 'code',
          q: '배열 <code>$config</code>의 <code>"lang"</code> 키가 없거나 null일 때만 <code>"ko"</code>를 대입하는 코드를 한 줄로 작성하세요.',
          starter: '',
          placeholder: '$config["lang"] ??= "ko";',
          accept: ['$config["lang"] ??= "ko";'],
          why: '??=는 왼쪽 값이 없거나 null일 때만 오른쪽 값을 대입해요.',
          hint: '$config["lang"] ??= "ko"; 형태를 그대로 써보세요.'
        }),
        () => makeChoice(
          '<code>$settings["theme"] ??= "light";</code>와 완전히 같은 동작을 하는 코드는?',
          'if (!isset($settings["theme"]) || $settings["theme"] === null) { $settings["theme"] = "light"; }', ['$settings["theme"] = "light";', 'if (isset($settings["theme"])) { $settings["theme"] = "light"; }', 'unset($settings["theme"]);'],
          '??=는 "키가 없거나 값이 null일 때만" 대입하는 if문을 한 줄로 줄인 표현이에요.',
          '??=를 풀어 쓰면 isset() 확인 후 대입하는 if문과 같아요.'
        ),
      ],
      boss: () => {
        const hasValue = Math.random() < 0.5;
        const existing = pick(['dark', 'blue']);
        const result = hasValue ? existing : 'light';
        return {
          type: 'blank',
          q: `<code>$settings = ${hasValue ? `['theme' => '${existing}']` : '[]'}; $settings['theme'] ??= 'light'; $settings['theme'] ??= 'blue'; echo $settings['theme'];</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [result], placeholder: '출력 결과',
          why: hasValue
            ? `이미 '${existing}'라는 값이 있으므로 두 번의 ??=는 모두 아무 일도 하지 않아 "${existing}"이 그대로 출력돼요.`
            : `처음엔 값이 없으므로 첫 번째 ??=가 'light'를 대입하고, 이제 값이 생겼으므로 두 번째 ??=('blue')는 무시되어 "light"가 출력돼요.`,
          hint: '??=는 값이 생기고 나면, 그 뒤에 또 ??=를 써도 더 이상 아무 영향을 주지 않아요.'
        };
      }
    },
    {
      id: 'stringContainsFunctions',
      title: '문자열 포함 검사: str_contains 등',
      ready: true,
      summary: 'strpos의 번거로운 비교 없이, 문자열 포함·시작·끝 여부를 명확한 참/거짓으로 확인하는 함수들을 배워요.',
      goals: ['str_contains로 부분 문자열 포함 확인', 'str_starts_with / str_ends_with로 시작·끝 확인', '기존 strpos !== false 방식과의 비교'],
      blocks: [
        {
          h: '기존 방식의 함정: strpos',
          html: `<p><code>strpos</code>는 찾은 위치(정수)나 <code>false</code>를 반환해요. 위치가 0일 수도 있어서, <code>== false</code>로 비교하면 "0번째에서 찾음"과 "못 찾음"을 헷갈릴 수 있어요. 그래서 항상 <code>!== false</code>(타입까지 비교)로 써야 했어요.</p>`,
          code: {
            label: 'strpos_old.php',
            lang: 'php',
            src: `<?php
$text = "안녕하세요, PHP!";
if (strpos($text, "PHP") !== false) {
    echo "포함됨";
}`,
            out: `포함됨`
          }
        },
        {
          h: '명확하게: str_contains',
          html: `<p>PHP 8.0부터는 <code>str_contains($문자열, $찾을값)</code>이 참/거짓을 바로 반환해서, <code>!== false</code> 같은 함정 없이 명확하게 쓸 수 있어요.</p>`,
          code: {
            label: 'str_contains_basic.php',
            lang: 'php',
            src: `<?php
$text = "안녕하세요, PHP!";
if (str_contains($text, "PHP")) {
    echo "포함됨";
}`,
            out: `포함됨`
          }
        },
        {
          h: '시작과 끝 확인하기',
          html: `<p><code>str_starts_with</code>와 <code>str_ends_with</code>는 각각 문자열이 특정 값으로 시작하는지, 끝나는지를 true/false로 확인해줘요.</p>`,
          code: {
            label: 'str_starts_ends.php',
            lang: 'php',
            src: `<?php
$filename = "photo.png";
var_dump(str_starts_with($filename, "photo"));
var_dump(str_ends_with($filename, ".png"));`,
            out: `bool(true)
bool(true)`
          },
          after: `<div class="note"><b>정리</b> — 이 세 함수(str_contains, str_starts_with, str_ends_with)는 모두 PHP 8.0부터 추가되었고, 항상 명확한 true/false만 반환해서 strpos의 함정에서 자유로워요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const word = pick(['사과', '바나나', '포도']);
          const text = `오늘은 ${word}를 먹었어요`;
          return {
            type: 'blank',
            q: `<code>$text = "${text}"; var_dump(str_contains($text, "${word}"));</code>를 실행하면? (true/false)`,
            prefix: '', suffix: '', accept: ['true'], placeholder: 'true / false',
            why: `$text 안에 "${word}"가 포함되어 있으므로 str_contains는 true를 반환해요.`,
            hint: 'str_contains는 포함되어 있으면 true, 아니면 false를 그대로 반환해요.'
          };
        },
        () => makeChoice(
          'str_contains()가 strpos() !== false 방식보다 나은 점은?',
          '항상 명확한 true/false만 반환해서, 0번째 위치와 못 찾은 경우를 헷갈릴 여지가 없다', ['대소문자를 항상 무시하고 비교한다', '여러 문자열을 한 번에 검색할 수 있다', 'strpos보다 항상 실행 속도가 빠르다'],
          'strpos는 정수 또는 false를 섞어서 반환하지만, str_contains는 오직 true/false만 반환해서 실수할 여지가 없어요.',
          '"포함한다(contains)"는 이름 그대로, 참/거짓만 알려줘요.'
        ),
        () => {
          const ext = pick(['.png', '.jpg', '.pdf']);
          const filename = `report${ext}`;
          const checkExt = pick(['.png', '.jpg', '.pdf']);
          const result = ext === checkExt;
          return {
            type: 'blank',
            q: `<code>$filename = "${filename}"; var_dump(str_ends_with($filename, "${checkExt}"));</code>를 실행하면? (true/false)`,
            prefix: '', suffix: '', accept: [result ? 'true' : 'false'], placeholder: 'true / false',
            why: result
              ? `"${filename}"은 실제로 "${checkExt}"로 끝나므로 true예요.`
              : `"${filename}"은 "${ext}"로 끝나고 "${checkExt}"로 끝나지 않으므로 false예요.`,
            hint: 'str_ends_with는 문자열이 정확히 그 값으로 끝나는지 확인해요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>$filename</code>이 <code>"photo"</code>로 시작하는지 확인하는 코드를 한 줄로 작성하세요.',
          starter: '',
          placeholder: 'str_starts_with($filename, "photo");',
          accept: ['str_starts_with($filename, "photo");'],
          why: 'str_starts_with($문자열, $접두어)는 그 접두어로 시작하는지를 true/false로 알려줘요.',
          hint: 'str_starts_with($filename, "photo"); 형태를 그대로 써보세요.'
        }),
        () => makeChoice(
          'str_contains, str_starts_with, str_ends_with에 대한 설명으로 알맞은 것은?',
          '모두 PHP 8.0부터 추가되었고, 항상 true 또는 false만 반환한다', ['셋 다 대소문자를 자동으로 통일해서 비교한다', 'str_contains만 정수를 반환하고 나머지는 불리언이다', '셋 다 정규표현식 패턴을 인자로 받아야 한다'],
          '세 함수 모두 PHP 8.0에서 추가된 문자열 검사 함수로, 항상 명확한 불리언을 반환해요.',
          '정규표현식이 필요 없는, 단순 포함/시작/끝 검사에 특화된 함수들이에요.'
        ),
      ],
      boss: () => {
        const filenames = ['photo.png', 'report.pdf', 'archive.zip', 'index.html'];
        const filename = pick(filenames);
        const startsOk = filename.startsWith('photo') || filename.startsWith('report');
        const endsOk = filename.endsWith('.png') || filename.endsWith('.pdf');
        const passes = startsOk && endsOk;
        return {
          type: 'blank',
          q: `<code>$filename = "${filename}";</code>이고, 다음 조건을 확인해요: <code>(str_starts_with($filename, "photo") || str_starts_with($filename, "report")) && (str_ends_with($filename, ".png") || str_ends_with($filename, ".pdf"))</code>. 이 조건의 결과는? (true/false)`,
          prefix: '', suffix: '', accept: [passes ? 'true' : 'false'], placeholder: 'true / false',
          why: `"${filename}"은 시작 조건이 ${startsOk ? '참' : '거짓'}이고 끝 조건이 ${endsOk ? '참' : '거짓'}이므로, 전체 &&(그리고) 결과는 ${passes ? 'true' : 'false'}예요.`,
          hint: '두 조건을 각각 확인한 뒤, &&(둘 다 참이어야 함)로 합쳐서 판단해요.'
        };
      }
    },
    {
      id: 'dateTimeClass',
      title: 'DateTime 클래스로 날짜 다루기',
      ready: true,
      summary: '문자열로 날짜를 다루는 대신, DateTime 객체로 날짜·시간을 안전하게 계산하고 형식화하는 법을 배워요.',
      goals: ['new DateTime()으로 날짜 객체 만들기', 'format()으로 원하는 형식으로 출력하기', 'modify()와 diff()로 날짜 계산하기'],
      blocks: [
        {
          h: '날짜를 객체로: DateTime',
          html: `<p><code>new DateTime('날짜문자열')</code>로 날짜를 표현하는 객체를 만들 수 있어요. <code>format()</code>에 원하는 형식 문자를 넘기면 그 형식대로 출력해줘요.</p>`,
          code: {
            label: 'datetime_basic.php',
            lang: 'php',
            src: `<?php
$date = new DateTime('2024-03-15');
echo $date->format('Y-m-d');`,
            out: `2024-03-15`
          }
        },
        {
          h: '원하는 형식으로: format()',
          html: `<p><code>Y</code>(4자리 연도), <code>n</code>(월, 앞의 0 없이), <code>j</code>(일, 앞의 0 없이) 같은 형식 문자를 조합해서 원하는 모양으로 만들 수 있어요.</p>`,
          code: {
            label: 'datetime_format.php',
            lang: 'php',
            src: `<?php
$date = new DateTime('2024-03-15');
echo $date->format('Y년 n월 j일');`,
            out: `2024년 3월 15일`
          }
        },
        {
          h: '날짜 계산하기: modify()와 diff()',
          html: `<p><code>modify('+N days')</code>는 객체가 가진 날짜 자체를 상대적으로 바꿔줘요. 두 날짜 사이의 차이가 궁금하면 <code>$start-&gt;diff($end)</code>로 <code>DateInterval</code> 객체를 얻고, 그 안의 <code>-&gt;days</code>로 총 일수를 알 수 있어요.</p>`,
          code: {
            label: 'datetime_modify.php',
            lang: 'php',
            src: `<?php
$date = new DateTime('2024-03-15');
$date->modify('+10 days');
echo $date->format('Y-m-d');`,
            out: `2024-03-25`
          },
          after: `<div class="note"><b>정리</b> — DateTime은 modify()를 부르면 객체 자신의 값이 바뀌어요(mutable). 원본을 그대로 두고 싶다면 같은 방식으로 쓰는 DateTimeImmutable을 대신 쓰면 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const year = 2024;
          const month = randInt(1, 12);
          const day = randInt(1, 20);
          const mm = String(month).padStart(2, '0');
          const dd = String(day).padStart(2, '0');
          return {
            type: 'blank',
            q: `<code>$date = new DateTime('${year}-${mm}-${dd}'); echo $date->format('Y-m-d');</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${year}-${mm}-${dd}`], placeholder: '출력 결과',
            why: `format('Y-m-d')는 생성할 때 넣은 날짜를 그대로 "연-월-일" 형식으로 보여줘서 "${year}-${mm}-${dd}"가 출력돼요.`,
            hint: 'format의 Y, m, d는 각각 4자리 연도, 2자리 월, 2자리 일을 뜻해요.'
          };
        },
        () => makeChoice(
          'DateTime 객체의 format() 메서드가 하는 일은?',
          '날짜/시간 값을 지정한 형식 문자열에 맞춰 문자열로 만들어준다', ['날짜를 무작위로 하나 골라 반환한다', '두 날짜를 자동으로 더해준다', '날짜 값을 데이터베이스에 저장한다'],
          'format()은 Y, m, d 같은 형식 문자를 조합해 원하는 모양의 날짜 문자열을 만들어줘요.',
          '형식 문자(Y, m, d, n, j 등)를 조합해서 원하는 출력 모양을 정해요.'
        ),
        () => {
          const year = 2024;
          const month = randInt(1, 11);
          const day = randInt(1, 20);
          const n = randInt(1, 15);
          const d = new Date(Date.UTC(year, month - 1, day));
          d.setUTCDate(d.getUTCDate() + n);
          const ny = d.getUTCFullYear();
          const nm = String(d.getUTCMonth() + 1).padStart(2, '0');
          const nd = String(d.getUTCDate()).padStart(2, '0');
          const mm = String(month).padStart(2, '0');
          const dd = String(day).padStart(2, '0');
          return {
            type: 'blank',
            q: `<code>$date = new DateTime('${year}-${mm}-${dd}'); $date->modify('+${n} days'); echo $date->format('Y-m-d');</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${ny}-${nm}-${nd}`], placeholder: '출력 결과',
            why: `modify('+${n} days')는 날짜에 ${n}일을 더해서 ${ny}-${nm}-${nd}가 돼요.`,
            hint: 'modify는 날짜 객체 자체의 값을 바꿔버려요(mutable).'
          };
        },
        () => ({
          type: 'code',
          q: '<code>$date</code>(DateTime 객체)를 <code>"월/일/연도"</code> 형태(예: 3/15/2024)로 출력하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'echo $date->format("n/j/Y");',
          accept: ['echo $date->format("n/j/Y");'],
          why: 'n은 앞의 0 없는 월, j는 앞의 0 없는 일, Y는 4자리 연도를 뜻해요.',
          hint: 'echo $date->format("n/j/Y"); 형태를 그대로 써보세요.'
        }),
        () => makeChoice(
          'DateTime의 modify() 메서드가 하는 일은?',
          '객체가 가진 날짜/시간 값을 "+N days" 같은 상대적인 표현으로 바꾼다', ['날짜를 항상 오늘 날짜로 초기화한다', '다른 DateTime 객체와 비교해서 boolean을 반환한다', '날짜를 문자열이 아닌 정수로 바꾼다'],
          'modify()는 "+10 days", "-1 month"처럼 상대적인 표현을 받아 객체의 날짜 값 자체를 바꿔요.',
          '"수정하다(modify)"라는 이름처럼, 객체 안의 날짜 값을 직접 바꿔요.'
        ),
      ],
      boss: () => {
        const year = 2024;
        const m1 = randInt(1, 6);
        const d1 = randInt(1, 20);
        const deltaDays = randInt(5, 40);
        const start = new Date(Date.UTC(year, m1 - 1, d1));
        const end = new Date(start);
        end.setUTCDate(end.getUTCDate() + deltaDays);
        const mm1 = String(m1).padStart(2, '0');
        const dd1 = String(d1).padStart(2, '0');
        const y2 = end.getUTCFullYear();
        const m2 = String(end.getUTCMonth() + 1).padStart(2, '0');
        const d2 = String(end.getUTCDate()).padStart(2, '0');
        return {
          type: 'blank',
          q: `<code>$start = new DateTime('${year}-${mm1}-${dd1}'); $end = new DateTime('${y2}-${m2}-${d2}'); $diff = $start->diff($end); echo $diff->days;</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(deltaDays)], placeholder: '숫자',
          why: `diff()는 두 날짜 사이의 차이를 DateInterval 객체로 반환하고, ->days는 그 차이를 전체 일수로 알려줘서 ${deltaDays}가 돼요.`,
          hint: 'diff()가 반환하는 객체의 ->days 프로퍼티는 두 날짜 사이의 총 일수예요.'
        };
      }
    },
    {
      id: 'passwordHashing',
      title: '비밀번호 해싱: password_hash / password_verify',
      ready: true,
      summary: '비밀번호를 평문으로 저장하지 않고, password_hash와 password_verify로 안전하게 저장·확인하는 법을 배워요.',
      goals: ['비밀번호를 평문으로 저장하면 안 되는 이유', 'password_hash()로 안전하게 해싱하기', 'password_verify()로 로그인 시 안전하게 비교하기'],
      blocks: [
        {
          h: '문제: 평문 저장의 위험',
          html: `<p>비밀번호를 그대로(평문) 저장하면, 데이터베이스가 유출되는 사고가 났을 때 모든 사용자의 실제 비밀번호가 그대로 노출돼요. 그래서 절대 평문으로 저장하면 안 돼요.</p>`,
          code: {
            label: 'plain_bad.php',
            lang: 'php',
            src: `<?php
// 절대 이렇게 하면 안 돼요!
$stored = $_POST['password']; // 평문 그대로 저장`
          }
        },
        {
          h: '해결: password_hash()',
          html: `<p><code>password_hash($비밀번호, PASSWORD_DEFAULT)</code>는 비밀번호를 안전한 해시값으로 바꿔줘요. 매번 다른 salt(임의의 값)가 섞여서, 같은 비밀번호를 해싱해도 결과 문자열이 매번 달라져요.</p>`,
          code: {
            label: 'password_hash_basic.php',
            lang: 'php',
            src: `<?php
$hash = password_hash("mySecret123", PASSWORD_DEFAULT);
echo strlen($hash) > 0 ? "해시 생성됨" : "실패";`,
            out: `해시 생성됨`
          }
        },
        {
          h: '로그인 확인: password_verify()',
          html: `<p>해시값은 매번 달라지므로, 두 해시를 <code>==</code>로 비교하면 안 돼요. 대신 <code>password_verify($입력값, $저장된해시)</code>가 내부적으로 안전하게 비교해서 true/false를 알려줘요.</p>`,
          code: {
            label: 'password_verify_basic.php',
            lang: 'php',
            src: `<?php
$hash = password_hash("mySecret123", PASSWORD_DEFAULT);
var_dump(password_verify("mySecret123", $hash));
var_dump(password_verify("wrongGuess", $hash));`,
            out: `bool(true)
bool(false)`
          },
          after: `<div class="note"><b>정리</b> — 회원가입 때는 password_hash()로 만든 해시만 저장하고, 로그인 때는 항상 password_verify()로 비교해요. 평문 비밀번호는 저장은 물론, 저장된 상태로 남겨두지도 않아야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const pw = pick(['secret123', 'myPass2024', 'hunter2']);
          return {
            type: 'blank',
            q: `<code>$hash = password_hash("${pw}", PASSWORD_DEFAULT); var_dump(password_verify("${pw}", $hash));</code>를 실행하면? (true/false)`,
            prefix: '', suffix: '', accept: ['true'], placeholder: 'true / false',
            why: `password_verify에 넘긴 값("${pw}")이 해싱했던 원래 비밀번호와 같으므로 true를 반환해요.`,
            hint: 'password_verify는 입력값을 해시와 다시 비교해서 일치 여부를 true/false로 알려줘요.'
          };
        },
        () => makeChoice(
          '비밀번호를 평문으로 저장하면 안 되는 이유는?',
          'DB가 유출되면 모든 사용자의 실제 비밀번호가 그대로 노출되기 때문', ['평문으로 저장하면 로그인 속도가 항상 느려지기 때문', 'PHP에서 문자열을 그대로 저장하는 게 문법적으로 불가능하기 때문', '평문 저장은 저장 공간을 더 많이 차지하기 때문'],
          '평문 저장은 보안 사고 시 사용자의 실제 비밀번호가 그대로 드러나는 치명적인 문제를 만들어요.',
          '해싱은 "원래 값을 알 수 없게 바꿔서 저장한다"는 게 핵심 목적이에요.'
        ),
        () => {
          const pw = pick(['secret123', 'myPass2024', 'hunter2']);
          const wrong = pick(['wrongpass', '1234', 'test']);
          return {
            type: 'blank',
            q: `<code>$hash = password_hash("${pw}", PASSWORD_DEFAULT); var_dump(password_verify("${wrong}", $hash));</code>를 실행하면? (true/false)`,
            prefix: '', suffix: '', accept: ['false'], placeholder: 'true / false',
            why: `password_verify에 넘긴 값("${wrong}")이 원래 해싱했던 비밀번호("${pw}")와 다르므로 false를 반환해요.`,
            hint: '값이 다르면 password_verify는 false를 반환해요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>$password</code>(문자열)를 PHP가 권장하는 기본 알고리즘으로 해싱해 <code>$hash</code>에 담는 코드를 작성하세요.',
          starter: '',
          placeholder: '$hash = password_hash($password, PASSWORD_DEFAULT);',
          accept: ['$hash = password_hash($password, PASSWORD_DEFAULT);'],
          why: 'PASSWORD_DEFAULT는 PHP가 현재 권장하는 가장 안전한 알고리즘을 자동으로 선택해줘요.',
          hint: '$hash = password_hash($password, PASSWORD_DEFAULT); 형태를 그대로 써보세요.'
        }),
        () => makeChoice(
          '두 해시값을 == 로 직접 비교하면 안 되는 이유는?',
          '같은 비밀번호라도 매번 다른 salt가 섞여 해시값 자체가 달라지기 때문에, 반드시 password_verify()로 비교해야 한다', ['==는 문자열 비교에 아예 쓸 수 없기 때문에', '해시값은 항상 숫자로만 이루어져 있어서 == 비교가 의미 없기 때문에', 'password_hash가 매번 정확히 같은 해시값을 만들어서 비교가 무의미하기 때문에'],
          'password_hash는 매번 다른 salt를 섞어 해시값을 다르게 만들기 때문에, 문자열 비교로는 같은 비밀번호도 다르다고 판단될 수 있어요.',
          'password_verify는 해시 안에 들어있는 salt 정보를 이용해 다시 계산해서 안전하게 비교해줘요.'
        ),
      ],
      boss: () => {
        const correct = Math.random() < 0.5;
        const original = pick(['secret123', 'myPass2024', 'hunter2']);
        const attempt = correct ? original : pick(['wrongpass', '1234', 'test']);
        return {
          type: 'blank',
          q: `<code>$hash = password_hash("${original}", PASSWORD_DEFAULT); // 회원가입 시 저장</code> 이후 로그인 시 <code>$ok = password_verify("${attempt}", $hash); var_dump($ok);</code>를 실행하면? (true/false)`,
          prefix: '', suffix: '', accept: [correct ? 'true' : 'false'], placeholder: 'true / false',
          why: correct
            ? `로그인 시도한 비밀번호("${attempt}")가 가입 때와 같으므로 password_verify는 true를 반환해요.`
            : `로그인 시도한 비밀번호("${attempt}")가 가입 때 비밀번호("${original}")와 다르므로 password_verify는 false를 반환해요.`,
          hint: 'password_verify는 해시를 다시 계산해서 원래 비밀번호와 일치하는지 안전하게 비교해줘요.'
        };
      }
    },
    {
      id: 'dependencyInjectionBasics',
      title: '의존성 주입(DI)의 기본',
      ready: true,
      summary: '클래스 안에서 직접 의존 객체를 만드는 대신, 밖에서 만들어 넣어주는 의존성 주입의 개념과 장점을 배워요.',
      goals: ['클래스 내부에서 new로 직접 만드는 방식의 문제', '생성자를 통한 의존성 주입', '인터페이스와 함께 쓸 때의 유연함'],
      blocks: [
        {
          h: '문제: 클래스 안에서 직접 만들기',
          html: `<p><code>OrderService</code>가 자기 안에서 직접 <code>new SmtpMailer()</code>를 만들면, 다른 발송 방식으로 바꾸거나 테스트용 가짜 객체로 교체하기가 어려워요. 두 클래스가 단단히 묶여(결합) 있는 상태예요.</p>`,
          code: {
            label: 'di_problem.php',
            lang: 'php',
            src: `<?php
class SmtpMailer {
    public function send($to, $msg) {
        echo "SMTP로 전송: " . $to;
    }
}

class OrderService {
    private $mailer;

    public function __construct() {
        $this->mailer = new SmtpMailer(); // 클래스 안에서 직접 생성
    }

    public function complete($to) {
        $this->mailer->send($to, "주문 완료");
    }
}`
          }
        },
        {
          h: '해결: 생성자로 주입받기',
          html: `<p>객체를 클래스 안에서 직접 만들지 않고, 생성자를 통해 <b>밖에서 만들어 넣어주는 것</b>을 의존성 주입(Dependency Injection)이라고 해요.</p>`,
          code: {
            label: 'di_constructor.php',
            lang: 'php',
            src: `<?php
class OrderService {
    private $mailer;

    public function __construct(SmtpMailer $mailer) {
        $this->mailer = $mailer;
    }

    public function complete($to) {
        $this->mailer->send($to, "주문 완료");
    }
}

$mailer = new SmtpMailer();
$service = new OrderService($mailer);
$service->complete("jisoo@example.com");`,
            out: `SMTP로 전송: jisoo@example.com`
          }
        },
        {
          h: '인터페이스와 함께: 더 유연하게',
          html: `<p>구체 클래스 대신 <b>인터페이스</b> 타입으로 주입받으면, <code>OrderService</code>는 실제로 어떤 구현이 들어오는지 몰라도 동작해요. 테스트할 때는 진짜로 메일을 보내지 않는 가짜 구현을 대신 넣어줄 수도 있어요.</p>`,
          code: {
            label: 'di_interface.php',
            lang: 'php',
            src: `<?php
interface Mailer {
    public function send($to, $msg);
}

class FakeMailer implements Mailer {
    public function send($to, $msg) {
        echo "테스트용, 실제 전송 안 함: " . $to;
    }
}

class OrderService {
    private Mailer $mailer;

    public function __construct(Mailer $mailer) {
        $this->mailer = $mailer;
    }

    public function complete($to) {
        $this->mailer->send($to, "주문 완료");
    }
}

$service = new OrderService(new FakeMailer());
$service->complete("jisoo@example.com");`,
            out: `테스트용, 실제 전송 안 함: jisoo@example.com`
          },
          after: `<div class="note"><b>정리</b> — 의존성 주입은 클래스가 "무엇을 쓸지" 스스로 결정하지 않고 밖에서 받게 만들어서, 구현을 갈아끼우기 쉽고 테스트하기 쉬운 유연한 구조를 만들어줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const email = pick(['jisoo@example.com', 'minjun@example.com', 'seoyeon@example.com']);
          return {
            type: 'blank',
            q: `<code>class SmtpMailer { public function send($to, $msg) { echo "SMTP로 전송: " . $to; } } class OrderService { private $mailer; public function __construct(SmtpMailer $mailer) { $this->mailer = $mailer; } public function complete($to) { $this->mailer->send($to, "주문 완료"); } }</code>이고 <code>$service = new OrderService(new SmtpMailer()); $service->complete("${email}");</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`SMTP로 전송: ${email}`], placeholder: '출력 결과',
            why: `주입받은 SmtpMailer의 send()가 호출되어 "SMTP로 전송: ${email}"이 출력돼요.`,
            hint: 'OrderService는 생성자로 받은 mailer 객체를 그대로 써요.'
          };
        },
        () => makeChoice(
          '의존성 주입(DI)의 장점으로 알맞은 것은?',
          '클래스가 필요한 객체를 직접 만들지 않아서, 구현을 갈아끼우거나 테스트하기 쉬워진다', ['클래스 안의 코드 줄 수를 항상 줄여준다', '프로그램의 실행 속도를 항상 더 빠르게 만든다', '생성자를 아예 쓰지 않아도 되게 해준다'],
          'DI는 클래스와 그 의존 객체 사이의 결합을 느슨하게 만들어서 유연성과 테스트 용이성을 높여요.',
          '직접 new로 만들지 않고, 밖에서 "주입"받는다는 게 핵심이에요.'
        ),
        () => {
          const email = pick(['jisoo@example.com', 'minjun@example.com', 'seoyeon@example.com']);
          return {
            type: 'blank',
            q: `<code>interface Mailer { public function send($to, $msg); } class FakeMailer implements Mailer { public function send($to, $msg) { echo "테스트용, 실제 전송 안 함: " . $to; } } class OrderService { private Mailer $mailer; public function __construct(Mailer $mailer) { $this->mailer = $mailer; } public function complete($to) { $this->mailer->send($to, "주문 완료"); } }</code>이고 <code>$service = new OrderService(new FakeMailer()); $service->complete("${email}");</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`테스트용, 실제 전송 안 함: ${email}`], placeholder: '출력 결과',
            why: `Mailer 타입으로 주입받았기 때문에 FakeMailer의 send() 구현이 대신 호출되어 "테스트용, 실제 전송 안 함: ${email}"이 출력돼요.`,
            hint: 'OrderService는 인터페이스 타입만 알기 때문에, 어떤 구현을 넣어도 그대로 동작해요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>OrderService</code>가 <code>Mailer</code> 인터페이스 타입의 객체를 생성자로 주입받아 프로퍼티에 저장하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'public function __construct(Mailer $mailer) {\n    $this->mailer = $mailer;\n}',
          accept: ['public function __construct(Mailer $mailer) {\n    $this->mailer = $mailer;\n}'],
          why: '생성자의 매개변수를 Mailer 타입으로 받아 그대로 프로퍼티에 저장해요.',
          hint: 'public function __construct(Mailer $mailer) { $this->mailer = $mailer; } 형태를 그대로 써보세요.'
        }),
        () => makeChoice(
          '클래스 안에서 직접 new로 의존 객체를 만드는 방식의 문제점은?',
          '다른 구현으로 바꾸거나, 테스트용 가짜 객체로 교체하기 어렵다', ['코드가 항상 더 짧아진다', '메모리를 자동으로 절약해준다', '생성자를 아예 쓸 필요가 없어진다'],
          '내부에서 직접 만들면 그 구체 클래스에 단단히 묶여서, 유연하게 교체하기 어려워져요.',
          '테스트할 때 진짜 SMTP 서버로 메일을 보내고 싶지 않다면, 이 문제가 바로 와닿을 거예요.'
        ),
      ],
      boss: () => {
        const useFake = Math.random() < 0.5;
        const email = pick(['jisoo@example.com', 'minjun@example.com', 'seoyeon@example.com']);
        const result = useFake ? `테스트용, 실제 전송 안 함: ${email}` : `SMTP로 전송: ${email}`;
        return {
          type: 'blank',
          q: `<code>interface Mailer { public function send($to, $msg); } class SmtpMailer implements Mailer { public function send($to, $msg) { echo "SMTP로 전송: " . $to; } } class FakeMailer implements Mailer { public function send($to, $msg) { echo "테스트용, 실제 전송 안 함: " . $to; } } class OrderService { private Mailer $mailer; public function __construct(Mailer $mailer) { $this->mailer = $mailer; } public function complete($to) { $this->mailer->send($to, "주문 완료"); } }</code>이고 <code>$service = new OrderService(${useFake ? 'new FakeMailer()' : 'new SmtpMailer()'}); $service->complete("${email}");</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [result], placeholder: '출력 결과',
          why: `OrderService는 Mailer 인터페이스 타입으로 어떤 구현이든 주입받을 수 있어서, ${useFake ? 'FakeMailer' : 'SmtpMailer'}가 주입되면 그 send() 구현이 실행되어 "${result}"가 출력돼요.`,
          hint: 'OrderService는 어떤 Mailer 구현이 들어오는지 몰라도, 인터페이스 타입만 보고 동작해요.'
        };
      }
    },
    {
      id: 'interfaceConstants',
      title: '인터페이스 상수',
      ready: true,
      summary: '인터페이스 안에 정의해서, 그 인터페이스를 구현하는 모든 클래스가 공유하는 상수를 배워요.',
      goals: ['인터페이스 안에 const로 상수 정의하기', '구현 클래스에서 상수 값을 재정의하기', '서로 다른 인터페이스의 상수가 충돌할 때'],
      blocks: [
        {
          h: '인터페이스에 상수 정의하기',
          html: `<p>인터페이스 안에 <code>const</code>로 상수를 정의하면, 그 인터페이스를 구현하는 모든 클래스가 기본적으로 이 값을 물려받아요. <code>ClassName::상수이름</code>으로 접근해요.</p>`,
          code: {
            label: 'interface_const_basic.php',
            lang: 'php',
            src: `<?php
interface HasVersion {
    const VERSION = "1.0";
}

class App implements HasVersion {
}

echo App::VERSION;`,
            out: `1.0`
          }
        },
        {
          h: '구현 클래스에서 값 재정의하기',
          html: `<p>구현하는 클래스는 인터페이스가 정한 상수의 값을 자신만의 값으로 재정의할 수 있어요.</p>`,
          code: {
            label: 'interface_const_override.php',
            lang: 'php',
            src: `<?php
interface HasVersion {
    const VERSION = "1.0";
}

class App implements HasVersion {
    const VERSION = "2.0"; // 재정의
}

echo App::VERSION;`,
            out: `2.0`
          }
        },
        {
          h: '두 인터페이스의 상수가 충돌하면',
          html: `<p>서로 다른 두 인터페이스가 같은 이름의 상수를 <b>다른 값</b>으로 가지고 있다면, 그 둘을 동시에 구현하는 클래스는 오류가 나요. 같은 값이라면 문제 없어요.</p>`,
          code: {
            label: 'interface_const_conflict.php',
            lang: 'php',
            src: `<?php
interface A { const NAME = "A"; }
interface B { const NAME = "B"; }

class C implements A, B {
} // 오류! 서로 다른 값의 같은 이름 상수를 동시에 물려받을 수 없음`
          },
          after: `<div class="note"><b>정리</b> — 인터페이스 상수는 "이 인터페이스를 구현하면 기본적으로 갖게 되는 공통 값"을 정의할 때 쓰고, 상수는 객체 변수를 통해서도(<code>$obj::상수이름</code>) 접근할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const v = pick(['1.0', '2.5', '3.1']);
          return {
            type: 'blank',
            q: `<code>interface HasVersion { const VERSION = "${v}"; } class App implements HasVersion { }</code>이고 <code>echo App::VERSION;</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [v], placeholder: '출력 결과',
            why: `App은 VERSION을 재정의하지 않았으므로, 인터페이스에 정의된 값 "${v}"가 그대로 쓰여요.`,
            hint: '재정의하지 않으면 인터페이스가 정한 값을 그대로 물려받아요.'
          };
        },
        () => makeChoice(
          '인터페이스 상수의 특징으로 알맞은 것은?',
          '인터페이스를 구현하는 모든 클래스가 기본적으로 공유하는 상수를 정의할 수 있다', ['인터페이스 안의 상수는 절대 접근할 수 없다', '인터페이스 상수는 반드시 정수여야 한다', '구현 클래스는 상수를 재정의할 수 없다'],
          '인터페이스 상수는 그 인터페이스를 구현하는 모든 클래스가 공통으로 갖는 값을 정의하는 방법이에요.',
          'ClassName::상수이름 형태로 어디서든 접근할 수 있어요.'
        ),
        () => {
          const base = pick(['1.0', '2.0']);
          const override = pick(['9.9', '10.0', '4.4']);
          return {
            type: 'blank',
            q: `<code>interface HasVersion { const VERSION = "${base}"; } class App implements HasVersion { const VERSION = "${override}"; }</code>이고 <code>echo App::VERSION;</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [override], placeholder: '출력 결과',
            why: `App이 VERSION을 "${override}"로 재정의했으므로, 인터페이스의 기본값(${base}) 대신 재정의된 값이 쓰여요.`,
            hint: '구현 클래스가 같은 이름으로 상수를 다시 선언하면 그 값이 우선해요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>HasVersion</code> 인터페이스 안에, 값이 <code>"1.0"</code>인 <code>VERSION</code> 상수를 선언하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'const VERSION = "1.0";',
          accept: ['const VERSION = "1.0";'],
          why: '인터페이스 안에서도 const 상수이름 = 값; 형태로 상수를 선언해요.',
          hint: 'const VERSION = "1.0"; 형태를 그대로 써보세요.'
        }),
        () => makeChoice(
          '서로 다른 두 인터페이스가 같은 이름의 상수를 서로 다른 값으로 가지고 있을 때, 그 둘을 동시에 구현하는 클래스를 만들면?',
          '오류가 발생한다', ['먼저 나온 인터페이스의 값이 자동으로 선택된다', '두 값을 배열로 합쳐서 저장한다', '나중에 나온 인터페이스의 값이 자동으로 선택된다'],
          '값이 다른 동일한 이름의 상수를 동시에 물려받을 방법이 없어서, PHP는 이를 오류로 처리해요.',
          '값이 같다면 문제없지만, 다르면 어느 쪽을 따를지 알 수 없어서 오류가 나요.'
        ),
      ],
      boss: () => {
        const base = pick(['1.0', '2.0']);
        const overridden = Math.random() < 0.5;
        const override = pick(['9.9', '10.0']);
        const result = overridden ? override : base;
        return {
          type: 'blank',
          q: `<code>interface HasVersion { const VERSION = "${base}"; } class App implements HasVersion { ${overridden ? `const VERSION = "${override}";` : ''} } $app = new App(); echo $app::VERSION;</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [result], placeholder: '출력 결과',
          why: overridden
            ? `App이 VERSION을 "${override}"로 재정의했으므로, 인스턴스를 통해 접근해도(::) 재정의된 값이 나와요.`
            : `App은 VERSION을 재정의하지 않았으므로, 인터페이스에 정의된 기본값 "${base}"가 그대로 쓰여요.`,
          hint: '상수는 $객체::상수이름 형태로, 객체 변수를 통해서도 접근할 수 있어요.'
        };
      }
    },
    {
      id: 'abstractVsInterface',
      title: '추상 클래스 vs 인터페이스: 언제 무엇을 쓸까',
      ready: true,
      summary: '비슷해 보이는 추상 클래스와 인터페이스를, 실제로 어떤 기준으로 선택해야 하는지 배워요.',
      goals: ['추상 클래스: 관련된 클래스들이 공통 구현을 공유할 때', '인터페이스: 서로 다른 클래스가 같은 규약을 따를 때', '클래스는 하나만 상속하지만, 인터페이스는 여러 개 구현 가능'],
      blocks: [
        {
          h: '공통 코드가 있다면: 추상 클래스',
          html: `<p>추상 클래스는 <code>introduce()</code>처럼 공통 로직(상태 포함)을 자식에게 그대로 물려주면서, <code>speak()</code>처럼 자식마다 달라야 하는 부분만 강제로 채우게 할 수 있어요. 단, 클래스는 <code>extends</code>로 오직 하나만 상속할 수 있어요.</p>`,
          code: {
            label: 'abstract_choice.php',
            lang: 'php',
            src: `<?php
abstract class Animal {
    protected $name;

    public function __construct($name) {
        $this->name = $name;
    }

    abstract public function speak();

    public function introduce() {
        return $this->name . ": " . $this->speak();
    }
}

class Dog extends Animal {
    public function speak() {
        return "멍멍!";
    }
}

$d = new Dog("바둑이");
echo $d->introduce();`,
            out: `바둑이: 멍멍!`
          }
        },
        {
          h: '규약만 필요하다면: 인터페이스',
          html: `<p>인터페이스는 공통 구현이나 상태 없이, "이 메서드들은 반드시 있어야 한다"는 규약만 강제해요. 서로 관련 없는 클래스라도 <code>implements</code> 뒤에 쉼표로 여러 개를 나열해 동시에 구현할 수 있어요.</p>`,
          code: {
            label: 'interface_choice.php',
            lang: 'php',
            src: `<?php
interface Flyable {
    public function fly();
}

interface Swimmable {
    public function swim();
}

class Duck implements Flyable, Swimmable {
    public function fly() {
        return "날아요";
    }

    public function swim() {
        return "헤엄쳐요";
    }
}

$duck = new Duck();
echo $duck->fly() . " " . $duck->swim();`,
            out: `날아요 헤엄쳐요`
          }
        },
        {
          h: '선택 기준 정리',
          html: `<p>관련된 클래스들이 <b>공통 상태·로직</b>을 나눠 가져야 한다면 추상 클래스를, 서로 무관한 클래스들에 <b>같은 규약</b>만 강제하고 싶거나 한 클래스가 여러 규약을 동시에 따라야 한다면 인터페이스를 선택해요.</p>`,
          after: `<div class="note"><b>정리</b> — 실무에서는 인터페이스로 규약을 정의하고, 그 규약의 공통 구현 일부는 추상 클래스로 제공하는 식으로 둘을 함께 쓰는 경우도 많아요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const animals = [['바둑이', '멍멍!', 'Dog'], ['나비', '야옹!', 'Cat'], ['짹짹이', '짹짹!', 'Bird']];
          const [name, sound, cls] = pick(animals);
          return {
            type: 'blank',
            q: `<code>abstract class Animal { protected $name; public function __construct($name) { $this->name = $name; } abstract public function speak(); public function introduce() { return $this->name . ": " . $this->speak(); } } class ${cls} extends Animal { public function speak() { return "${sound}"; } }</code>이고 <code>$a = new ${cls}("${name}"); echo $a->introduce();</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${name}: ${sound}`], placeholder: '출력 결과',
            why: `introduce()는 부모의 공통 로직이고, speak()는 ${cls}가 구현한 "${sound}"를 가져와 "${name}: ${sound}"가 출력돼요.`,
            hint: '추상 클래스는 공통 로직(introduce)과 자식이 채워야 할 부분(speak)을 함께 담아요.'
          };
        },
        () => makeChoice(
          '한 클래스가 여러 개를 동시에 물려받을(따를) 수 있는 것은?',
          '인터페이스(implements로 여러 개 지정 가능)', ['추상 클래스(extends로 여러 개 지정 가능)', '둘 다 여러 개를 동시에 쓸 수 없다', '추상 클래스와 인터페이스 모두 무제한으로 상속 가능하다'],
          'PHP 클래스는 extends로 오직 하나만 상속하지만, implements 뒤에는 여러 인터페이스를 쉼표로 나열할 수 있어요.',
          '클래스는 "부모가 하나"지만, 규약(인터페이스)은 여러 개를 동시에 따를 수 있어요.'
        ),
        () => {
          const variants = [
            ['Duck', '날아요', '헤엄쳐요'],
            ['FlyingFish', '점프해요', '헤엄쳐요'],
          ];
          const [cls, flyMsg, swimMsg] = pick(variants);
          return {
            type: 'blank',
            q: `<code>interface Flyable { public function fly(); } interface Swimmable { public function swim(); } class ${cls} implements Flyable, Swimmable { public function fly() { return "${flyMsg}"; } public function swim() { return "${swimMsg}"; } }</code>이고 <code>$x = new ${cls}(); echo $x->fly() . " " . $x->swim();</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${flyMsg} ${swimMsg}`], placeholder: '출력 결과',
            why: `${cls}는 Flyable과 Swimmable을 동시에 구현했으므로 fly()와 swim() 둘 다 호출할 수 있어 "${flyMsg} ${swimMsg}"가 출력돼요.`,
            hint: '인터페이스는 implements 뒤에 쉼표로 여러 개를 나열해 동시에 구현할 수 있어요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>Flyable</code>과 <code>Swimmable</code> 인터페이스를 동시에 구현하는 <code>Duck</code> 클래스를 작성하세요. <code>fly()</code>는 "날아요"를, <code>swim()</code>은 "헤엄쳐요"를 반환해요.',
          starter: '',
          rows: 6,
          placeholder: 'class Duck implements Flyable, Swimmable {\n    public function fly() {\n        return "날아요";\n    }\n    public function swim() {\n        return "헤엄쳐요";\n    }\n}',
          accept: ['class Duck implements Flyable, Swimmable {\n    public function fly() {\n        return "날아요";\n    }\n    public function swim() {\n        return "헤엄쳐요";\n    }\n}'],
          why: 'implements 뒤에 쉼표로 여러 인터페이스를 나열하면 동시에 구현할 수 있고, 각 인터페이스가 요구하는 메서드를 모두 구현해야 해요.',
          hint: 'class Duck implements Flyable, Swimmable { } 안에 fly()와 swim() 메서드를 각각 구현하세요.'
        }),
        () => makeChoice(
          '추상 클래스를 선택해야 하는 상황으로 알맞은 것은?',
          '관련된 자식 클래스들이 공통 상태나 로직을 공유해야 할 때', ['서로 전혀 관련 없는 클래스들에 메서드 이름만 통일하고 싶을 때', '한 클래스가 여러 개의 서로 다른 규약을 동시에 따라야 할 때', '상태(프로퍼티)를 전혀 갖지 않는 순수한 규약만 정의하고 싶을 때'],
          '추상 클래스는 프로퍼티와 일반 메서드로 공통 로직·상태를 공유할 수 있다는 게 인터페이스와의 큰 차이예요.',
          '"공통으로 나눠 가질 코드가 있는가"가 추상 클래스를 고르는 핵심 기준이에요.'
        ),
      ],
      boss: () => makeChoice(
        '여러 종류의 결제 수단(카드, 계좌이체, 포인트)이 있고, 이들은 서로 상속 관계가 없는 클래스들인데 모두 pay() 메서드를 반드시 가져야 한다면, 어떤 방법이 더 적합할까요?',
        '인터페이스로 pay() 규약을 정의하고 각 결제 수단이 구현한다', ['추상 클래스로 만들어 상속 구조를 강제한다', '아무 규약 없이 각자 원하는 이름의 메서드를 자유롭게 쓴다', 'trait으로 상태를 강제로 공유시킨다'],
        '서로 무관한 클래스들에 같은 메서드 규약만 강제하고 싶을 때는 인터페이스가 더 적합해요.',
        '상속 관계가 없는 서로 다른 클래스들에게 공통 규약만 강제하고 싶을 때는 인터페이스를 떠올려보세요.'
      )
    },
    {
      id: 'arrayReduce',
      title: '배열 누적 함수: array_reduce',
      ready: true,
      summary: '배열의 값들을 하나의 결과값으로 누적시키는 array_reduce를 배워요.',
      goals: ['array_reduce로 배열을 하나의 값으로 누적하기', '콜백의 carry(누적값)와 초기값의 역할 이해하기', 'array_map/array_filter와 array_reduce의 차이 구분하기'],
      blocks: [
        {
          h: '값들을 하나로 누적하기: array_reduce',
          html: `<p><code>array_reduce(배열, 콜백, 초기값)</code>은 배열의 값을 순서대로 콜백에 넘기며 하나의 결과값으로 누적해요. 콜백의 첫 번째 매개변수 <code>$carry</code>는 지금까지 누적된 값이고, 두 번째는 현재 값이에요.</p>`,
          code: {
            label: 'array_reduce_sum.php',
            lang: 'php',
            src: `<?php
$prices = [1200, 3400, 2500];
$total = array_reduce($prices, function ($carry, $price) {
    return $carry + $price;
}, 0);

echo $total;`,
            out: `7100`
          }
        },
        {
          h: '합계 말고 다른 것도: 최댓값 구하기',
          html: `<p>array_reduce는 합계뿐 아니라 조건에 따라 값을 고르는 데도 쓸 수 있어요. 화살표 함수(<code>fn</code>)와 함께 쓰면 더 짧게 쓸 수 있어요.</p>`,
          code: {
            label: 'array_reduce_max.php',
            lang: 'php',
            src: `<?php
$numbers = [4, 9, 2, 7];
$max = array_reduce($numbers, fn($carry, $n) => $n > $carry ? $n : $carry, 0);

echo $max;`,
            out: `9`
          },
          after: `<div class="note"><b>정리</b> — array_map은 각 값을 "변환"하고, array_filter는 조건에 맞는 값만 "걸러내고", array_reduce는 모든 값을 하나의 결과로 "합쳐요". 셋의 역할을 구분해서 기억해두면 좋아요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const variants = [
            { prices: [1000, 2000, 3000], total: 6000 },
            { prices: [500, 1500, 2000], total: 4000 },
            { prices: [2500, 1500, 3000], total: 7000 },
          ];
          const v = pick(variants);
          return {
            type: 'blank',
            q: `<code>$prices = [${v.prices.join(', ')}]; $total = array_reduce($prices, function ($carry, $price) { return $carry + $price; }, 0); echo $total;</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(v.total)], placeholder: '숫자',
            why: `array_reduce는 0에서 시작해 각 가격을 차례로 더해서 ${v.total}이 돼요.`,
            hint: '초기값 0에서 시작해 배열의 값을 하나씩 더한다고 생각해보세요.'
          };
        },
        () => makeChoice(
          'array_reduce의 콜백 함수에서 첫 번째 매개변수(carry)가 의미하는 것은?',
          '지금까지 누적된 결과값', ['현재 배열 원소의 인덱스', '원본 배열 전체', '항상 고정된 초기값'],
          'carry는 이전 단계까지 계산된 누적 결과를 담고 있고, 다음 단계로 그대로 이어져요.',
          '"들고 다니는(carry) 값"이라는 이름 그대로, 누적된 결과를 뜻해요.'
        ),
        () => {
          const variants = [
            { nums: [4, 9, 2, 7], max: 9 },
            { nums: [10, 3, 8, 15, 6], max: 15 },
            { nums: [1, 1, 1], max: 1 },
          ];
          const v = pick(variants);
          return {
            type: 'blank',
            q: `<code>$numbers = [${v.nums.join(', ')}]; $max = array_reduce($numbers, fn($carry, $n) => $n > $carry ? $n : $carry, 0); echo $max;</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(v.max)], placeholder: '숫자',
            why: `각 값이 carry보다 크면 carry를 그 값으로 바꾸는 방식으로 최댓값 ${v.max}을 찾아요.`,
            hint: '더 큰 값이 나올 때마다 carry가 그 값으로 바뀐다고 생각해보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '문자열 배열 <code>$words</code>를 받아, array_reduce로 각 단어를 "-"로 이어붙인 하나의 문자열을 반환하는 함수 <code>joinWithDash</code>를 작성하세요. (초기값은 빈 문자열)',
          starter: '',
          rows: 5,
          placeholder: 'function joinWithDash($words) {\n    return array_reduce($words, function ($carry, $word) {\n        return $carry === "" ? $word : $carry . "-" . $word;\n    }, "");\n}',
          accept: ['function joinWithDash($words) {\n    return array_reduce($words, function ($carry, $word) {\n        return $carry === "" ? $word : $carry . "-" . $word;\n    }, "");\n}'],
          why: 'carry가 빈 문자열이면 첫 단어를 그대로, 아니면 "-"로 이어붙이며 하나의 문자열을 만들어가요.',
          hint: '$carry === "" 인지로 첫 단어인지 구분해서 "-"를 붙일지 결정하세요.'
        }),
        () => makeChoice(
          'array_map, array_filter, array_reduce 중 배열 전체를 하나의 값으로 합치는 함수는?',
          'array_reduce', ['array_map', 'array_filter', 'array_walk'],
          'array_map은 변환, array_filter는 걸러내기, array_reduce는 하나로 합치는 역할이에요.',
          '"줄이다(reduce)"라는 이름처럼, 여러 값을 하나로 줄여요.'
        ),
      ],
      boss: () => ({
        type: 'blank',
        q: `<code>$numbers = [2, 3, 4]; $product = array_reduce($numbers, function ($carry, $n) { return $carry * $n; }, 1); echo $product;</code>를 실행하면? 숫자만 쓰세요.`,
        prefix: '', suffix: '', accept: ['24'], placeholder: '숫자',
        why: '초기값 1에서 시작해 2, 3, 4를 차례로 곱하면 2 × 3 × 4 = 24예요.',
        hint: '합계를 구할 때는 초기값 0과 덧셈을, 곱을 구할 때는 초기값 1과 곱셈을 써요.'
      })
    },
    {
      id: 'generatorsYield',
      title: '제너레이터와 yield',
      ready: true,
      summary: '값을 한 번에 다 만들지 않고 하나씩 지연해서 만들어내는 제너레이터와 yield 키워드를 배워요.',
      goals: ['yield로 제너레이터 함수 만들기', '제너레이터가 배열과 다르게 값을 지연 생성한다는 것 이해하기', 'foreach로 제너레이터 순회하기'],
      blocks: [
        {
          h: '값을 하나씩 만들어내는 함수: 제너레이터',
          html: `<p>함수 안에 <code>yield</code>가 있으면, 그 함수는 호출 즉시 배열을 만드는 대신 <b>Generator 객체</b>를 반환해요. foreach로 순회할 때마다 그다음 값을 그때그때 계산해서 하나씩 내보내요.</p>`,
          code: {
            label: 'generator_basic.php',
            lang: 'php',
            src: `<?php
function numbersUpTo($n) {
    for ($i = 1; $i <= $n; $i++) {
        yield $i;
    }
}

foreach (numbersUpTo(5) as $num) {
    echo $num . " ";
}`,
            out: `1 2 3 4 5 `
          }
        },
        {
          h: 'yield로 키와 값을 함께 만들기',
          html: `<p><code>yield 키 => 값</code> 형태로 쓰면 foreach에서 키와 값을 함께 받을 수 있어요. 만약 이 값들을 모두 배열에 담아 반환했다면, 개수가 아주 많을 때 메모리를 많이 써야 했겠지만 제너레이터는 한 번에 하나씩만 만들어서 메모리를 아껴요.</p>`,
          code: {
            label: 'generator_keyvalue.php',
            lang: 'php',
            src: `<?php
function squareMap($n) {
    for ($i = 1; $i <= $n; $i++) {
        yield $i => $i * $i;
    }
}

foreach (squareMap(4) as $num => $square) {
    echo "$num^2 = $square\\n";
}`,
            out: `1^2 = 1
2^2 = 4
3^2 = 9
4^2 = 16
`
          },
          after: `<div class="note"><b>정리</b> — 제너레이터는 아주 큰 수의 데이터나 끝이 없는 시퀀스를 다룰 때, 배열처럼 한 번에 다 메모리에 올리지 않고 필요한 만큼만 하나씩 만들어낼 수 있어 유리해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = pick([3, 4, 6]);
          const out = Array.from({ length: n }, (_, i) => i + 1).join(' ') + ' ';
          return {
            type: 'blank',
            q: `<code>function numbersUpTo($n) { for ($i = 1; $i <= $n; $i++) { yield $i; } } foreach (numbersUpTo(${n}) as $num) { echo $num . " "; }</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [out], placeholder: '출력 결과',
            why: `1부터 ${n}까지의 값을 하나씩 yield하면서 foreach가 그 값을 받아 공백과 함께 출력해요.`,
            hint: '1부터 n까지의 숫자를 공백으로 구분해 나열해보세요(끝에도 공백 있음).'
          };
        },
        () => makeChoice(
          'yield가 포함된 함수를 호출하면 무엇을 반환하나요?',
          'Generator 객체', ['즉시 계산이 끝난 배열', 'null', '정수 하나'],
          'yield가 있는 함수는 실제로 실행되지 않고, 값을 하나씩 꺼낼 수 있는 Generator 객체를 즉시 반환해요.',
          '함수를 호출한 순간에는 아직 아무 값도 계산되지 않아요.'
        ),
        () => {
          const n = pick([2, 3, 5]);
          const lines = Array.from({ length: n }, (_, i) => `${i + 1}^2 = ${(i + 1) * (i + 1)}`).join('\n') + '\n';
          return {
            type: 'blank',
            q: `<code>function squareMap($n) { for ($i = 1; $i <= $n; $i++) { yield $i => $i * $i; } } foreach (squareMap(${n}) as $num => $square) { echo "$num^2 = $square\\n"; }</code>를 실행하면? (줄바꿈 포함 그대로 입력)`,
            prefix: '', suffix: '', accept: [lines], placeholder: '출력 결과',
            why: `${n}까지 각 수와 그 제곱을 "$num^2 = $square" 형태로 한 줄씩 출력해요.`,
            hint: '1부터 순서대로 "숫자^2 = 제곱값" 줄을 만들어보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '1부터 <code>$n</code>까지 각 수의 제곱을 yield하는 제너레이터 함수 <code>squares</code>를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'function squares($n) {\n    for ($i = 1; $i <= $n; $i++) {\n        yield $i * $i;\n    }\n}',
          accept: ['function squares($n) {\n    for ($i = 1; $i <= $n; $i++) {\n        yield $i * $i;\n    }\n}'],
          why: '반복문 안에서 각 i의 제곱을 yield하면, 호출할 때마다 하나씩 계산해서 내보내는 제너레이터가 돼요.',
          hint: 'for 반복문 안에 yield $i * $i;를 넣어보세요.'
        }),
        () => makeChoice(
          '제너레이터가 일반 배열을 반환하는 방식보다 유리한 경우는?',
          '아주 많은 데이터를 한 번에 메모리에 올리지 않고 하나씩 처리하고 싶을 때', ['배열의 순서를 반대로 뒤집고 싶을 때', '값을 여러 번 반복해서 순회하고 싶을 때', '배열의 키를 항상 0부터 다시 매기고 싶을 때'],
          '제너레이터는 값을 미리 다 만들어두지 않고 필요할 때마다 하나씩 만들기 때문에 메모리를 아낄 수 있어요.',
          '"지연 생성(lazy)"이 제너레이터의 핵심 장점이에요.'
        ),
      ],
      boss: () => ({
        type: 'blank',
        q: `<code>function evensUpTo($n) { for ($i = 2; $i <= $n; $i += 2) { yield $i; } } foreach (evensUpTo(10) as $even) { echo $even . " "; }</code>를 실행하면? (그대로 입력)`,
        prefix: '', suffix: '', accept: ['2 4 6 8 10 '], placeholder: '출력 결과',
        why: '2부터 10까지 2씩 증가하며 짝수를 하나씩 yield하고, foreach가 그 값을 공백과 함께 출력해요.',
        hint: '2, 4, 6, 8, 10을 공백으로 구분해 나열해보세요(끝에도 공백 있음).'
      })
    },
    {
      id: 'traitConflictResolution',
      title: '트레이트 충돌 해결: insteadof와 as',
      ready: true,
      summary: '두 트레이트에 같은 이름의 메서드가 있을 때 insteadof와 as로 충돌을 해결하는 법을 배워요.',
      goals: ['여러 트레이트를 함께 쓸 때 이름이 겹치면 무슨 일이 생기는지 이해하기', 'insteadof로 어떤 트레이트의 메서드를 쓸지 지정하기', 'as로 별칭을 만들어 충돌한 메서드를 둘 다 사용하기'],
      blocks: [
        {
          h: '트레이트 충돌: 같은 이름의 메서드가 있을 때',
          html: `<p>서로 다른 두 트레이트에 이름이 같은 메서드가 있으면, 그냥 <code>use A, B;</code>로 둘 다 넣을 수 없어요 — PHP가 어느 쪽 메서드를 써야 할지 알 수 없어서 치명적 오류가 나요. 이럴 땐 <code>use A, B { A::method insteadof B; }</code>처럼 <b>어떤 트레이트의 것을 쓸지</b> 명시해야 해요.</p>`,
          code: {
            label: 'trait_conflict.php',
            lang: 'php',
            src: `<?php
trait Greeting {
    public function hello() {
        return "안녕하세요!";
    }
}

trait Farewell {
    public function hello() {
        return "안녕히 가세요!";
    }
}

class Person {
    use Greeting, Farewell {
        Greeting::hello insteadof Farewell;
    }
}

$p = new Person();
echo $p->hello();`,
            out: `안녕하세요!`
          }
        },
        {
          h: 'as로 별칭을 만들어 둘 다 쓰기',
          html: `<p><code>as</code>를 쓰면 충돌해서 밀려난 메서드를 다른 이름으로 남겨서 둘 다 쓸 수 있어요. <code>Farewell::hello as sayBye;</code>라고 하면, Farewell의 원래 메서드를 <code>sayBye</code>라는 새 이름으로 호출할 수 있어요.</p>`,
          code: {
            label: 'trait_conflict_as.php',
            lang: 'php',
            src: `<?php
trait Greeting {
    public function hello() {
        return "안녕하세요!";
    }
}

trait Farewell {
    public function hello() {
        return "안녕히 가세요!";
    }
}

class Person {
    use Greeting, Farewell {
        Greeting::hello insteadof Farewell;
        Farewell::hello as sayBye;
    }
}

$p = new Person();
echo $p->hello() . " " . $p->sayBye();`,
            out: `안녕하세요! 안녕히 가세요!`
          },
          after: `<div class="note"><b>정리</b> — insteadof는 "충돌 시 누구 걸 쓸지" 우선순위를 정하고, as는 "밀려난 것도 다른 이름으로 살려서" 함께 쓸 수 있게 해줘요. 둘을 같이 쓰는 경우가 많아요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const variants = [
            { helloA: '안녕하세요!', helloB: '안녕히 가세요!' },
            { helloA: '반갑습니다!', helloB: '다음에 또 만나요!' },
            { helloA: 'Hi there!', helloB: 'Goodbye!' },
          ];
          const v = pick(variants);
          return {
            type: 'blank',
            q: `<code>trait Greeting { public function hello() { return "${v.helloA}"; } } trait Farewell { public function hello() { return "${v.helloB}"; } } class Person { use Greeting, Farewell { Greeting::hello insteadof Farewell; } } $p = new Person(); echo $p->hello();</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [v.helloA], placeholder: '출력 결과',
            why: `Greeting::hello insteadof Farewell로 Greeting의 hello()를 선택했으므로 "${v.helloA}"가 출력돼요.`,
            hint: 'insteadof 뒤에 쓰인 트레이트가 아니라, 앞에 쓰인 트레이트의 메서드가 선택돼요.'
          };
        },
        () => makeChoice(
          '두 트레이트가 같은 이름의 메서드를 가진 채로, 아무 해결 없이 함께 use하면 어떻게 되나요?',
          '치명적 오류(Fatal error)가 발생한다', ['첫 번째로 나열된 트레이트의 메서드가 자동으로 선택된다', '두 메서드의 내용이 합쳐져서 실행된다', '나중에 선언된 트레이트의 메서드가 자동으로 선택된다'],
          'PHP는 어느 트레이트의 메서드를 써야 할지 스스로 판단하지 않고, 개발자가 insteadof로 명시하지 않으면 오류를 내요.',
          '자동으로 골라주지 않는다는 점이 핵심이에요.'
        ),
        () => {
          const variants = [
            { helloA: '안녕하세요!', helloB: '안녕히 가세요!' },
            { helloA: '반갑습니다!', helloB: '다음에 또 만나요!' },
            { helloA: 'Hi there!', helloB: 'Goodbye!' },
          ];
          const v = pick(variants);
          return {
            type: 'blank',
            q: `<code>trait Greeting { public function hello() { return "${v.helloA}"; } } trait Farewell { public function hello() { return "${v.helloB}"; } } class Person { use Greeting, Farewell { Greeting::hello insteadof Farewell; Farewell::hello as sayBye; } } $p = new Person(); echo $p->hello() . " " . $p->sayBye();</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${v.helloA} ${v.helloB}`], placeholder: '출력 결과',
            why: `hello()는 Greeting 것이 선택되어 "${v.helloA}", sayBye()는 as로 별칭된 Farewell의 hello()라서 "${v.helloB}"가 출력돼요.`,
            hint: 'hello()는 insteadof로 선택된 쪽, sayBye()는 as로 별칭된 쪽이에요.'
          };
        },
        () => ({
          type: 'code',
          q: '트레이트 <code>Logger</code>와 <code>Reporter</code>에 모두 <code>log()</code> 메서드가 있어요. <code>Service</code> 클래스에서 <code>Logger</code>의 <code>log()</code>를 쓰고, <code>Reporter</code>의 <code>log()</code>는 <code>report</code>라는 이름으로도 쓸 수 있게 하는 클래스를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'class Service {\n    use Logger, Reporter {\n        Logger::log insteadof Reporter;\n        Reporter::log as report;\n    }\n}',
          accept: ['class Service {\n    use Logger, Reporter {\n        Logger::log insteadof Reporter;\n        Reporter::log as report;\n    }\n}'],
          why: 'insteadof로 Logger의 log()를 우선시키고, as로 Reporter의 log()를 report라는 새 이름으로 남겨요.',
          hint: 'use Logger, Reporter { Logger::log insteadof Reporter; Reporter::log as report; } 형태를 떠올려보세요.'
        }),
        () => makeChoice(
          'as 키워드를 트레이트 충돌 해결에 쓰는 이유는?',
          '충돌해서 밀려난 메서드를 다른 이름으로 남겨 둘 다 쓸 수 있게 하려고', ['두 메서드를 하나로 합치려고', '트레이트를 클래스에서 완전히 제외하려고', '메서드의 접근 제어자(public/private)를 바꾸려고'],
          'as는 이름을 바꿔서 원래는 가려졌을 메서드도 여전히 호출할 수 있게 해줘요.',
          '"~로서(as)"라는 이름처럼, 다른 이름으로 다시 쓸 수 있게 해줘요.'
        ),
      ],
      boss: () => ({
        type: 'blank',
        q: `<code>trait English { public function greet() { return "Hello!"; } } trait Korean { public function greet() { return "안녕하세요!"; } } class Bot { use English, Korean { Korean::greet insteadof English; English::greet as greetInEnglish; } } $bot = new Bot(); echo $bot->greet() . " " . $bot->greetInEnglish();</code>를 실행하면? (그대로 입력)`,
        prefix: '', suffix: '', accept: ['안녕하세요! Hello!'], placeholder: '출력 결과',
        why: 'greet()는 Korean::greet insteadof English로 선택되어 "안녕하세요!", greetInEnglish()는 as로 별칭된 English의 greet()라서 "Hello!"가 출력돼요.',
        hint: 'insteadof로 선택된 쪽이 greet(), as로 별칭된 쪽이 greetInEnglish()예요.'
      })
    },
    {
      id: 'iteratorInterface',
      title: 'Iterator 인터페이스로 커스텀 순회 만들기',
      ready: true,
      summary: '내가 만든 클래스의 객체를 foreach로 순회할 수 있게 해주는 Iterator 인터페이스를 배워요.',
      goals: ['Iterator 인터페이스가 요구하는 5개 메서드 이해하기', 'current/key/next/rewind/valid를 구현해 순회 로직 만들기', 'IteratorAggregate로 더 간단하게 위임하기'],
      blocks: [
        {
          h: 'foreach로 순회 가능한 객체 만들기: Iterator',
          html: `<p>PHP 내장 <code>Iterator</code> 인터페이스는 <code>current()</code>, <code>key()</code>, <code>next()</code>, <code>rewind()</code>, <code>valid()</code> 다섯 메서드를 요구해요. 이 메서드들을 구현하면, 배열이 아닌 내 클래스의 객체도 <code>foreach</code>로 순회할 수 있어요.</p>`,
          code: {
            label: 'number_collection.php',
            lang: 'php',
            src: `<?php
class NumberCollection implements Iterator {
    private array $items = [];
    private int $position = 0;

    public function add($item) {
        $this->items[] = $item;
    }

    public function current(): mixed {
        return $this->items[$this->position];
    }

    public function key(): mixed {
        return $this->position;
    }

    public function next(): void {
        $this->position++;
    }

    public function rewind(): void {
        $this->position = 0;
    }

    public function valid(): bool {
        return isset($this->items[$this->position]);
    }
}

$collection = new NumberCollection();
$collection->add(10);
$collection->add(20);
$collection->add(30);

foreach ($collection as $key => $value) {
    echo "$key => $value\\n";
}`,
            out: `0 => 10
1 => 20
2 => 30
`
          }
        },
        {
          h: '더 간단하게: IteratorAggregate',
          html: `<p>순회 로직을 직접 다 만들기 번거로울 땐, <code>IteratorAggregate</code>를 구현해 <code>getIterator()</code> 하나만 만들면 돼요. 내부 배열을 <code>ArrayIterator</code>로 감싸서 반환하면, foreach가 그 이터레이터에 순회를 위임해요.</p>`,
          code: {
            label: 'simple_collection.php',
            lang: 'php',
            src: `<?php
class SimpleCollection implements IteratorAggregate {
    private array $items = [];

    public function add($item) {
        $this->items[] = $item;
    }

    public function getIterator(): Iterator {
        return new ArrayIterator($this->items);
    }
}

$collection = new SimpleCollection();
$collection->add("사과");
$collection->add("바나나");

foreach ($collection as $item) {
    echo $item . " ";
}`,
            out: `사과 바나나 `
          },
          after: `<div class="note"><b>정리</b> — 순회 방식을 세밀하게 직접 제어하고 싶다면 Iterator를, 그냥 기존 배열을 순회 가능하게 만들고 싶을 뿐이라면 IteratorAggregate가 더 간단해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const variants = [
            { items: [1, 2, 3] },
            { items: [100, 200] },
            { items: [7, 14, 21, 28] },
          ];
          const v = pick(variants);
          const out = v.items.map((item, idx) => `${idx} => ${item}`).join('\n') + '\n';
          return {
            type: 'blank',
            q: `위 <code>NumberCollection</code>에 <code>${v.items.join(', ')}</code>을 순서대로 add()한 뒤 <code>foreach ($collection as $key => $value) { echo "$key => $value\\n"; }</code>를 실행하면? (줄바꿈 포함 그대로 입력)`,
            prefix: '', suffix: '', accept: [out], placeholder: '출력 결과',
            why: `add()한 순서대로 인덱스 0부터 key가 매겨지고, 그 key와 값을 "key => value" 형태로 한 줄씩 출력해요.`,
            hint: '0번부터 순서대로 "인덱스 => 값" 줄을 나열해보세요.'
          };
        },
        () => makeChoice(
          'Iterator 인터페이스를 구현할 때 반드시 만들어야 하는 메서드가 아닌 것은?',
          'count()', ['current()', 'next()', 'valid()'],
          'count()는 Countable 인터페이스에서 요구하는 메서드로, Iterator와는 별개예요. Iterator는 current/key/next/rewind/valid 다섯 개를 요구해요.',
          'Iterator는 "순회"에 필요한 메서드만 요구해요. 개수를 세는 것과는 관련 없어요.'
        ),
        () => {
          const variants = [
            ['빨강', '파랑'],
            ['하나', '둘', '셋'],
            ['x', 'y', 'z'],
          ];
          const v = pick(variants);
          const out = v.join(' ') + ' ';
          return {
            type: 'blank',
            q: `위 <code>SimpleCollection</code>에 <code>${v.join(', ')}</code>을 순서대로 add()한 뒤 <code>foreach ($collection as $item) { echo $item . " "; }</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [out], placeholder: '출력 결과',
            why: 'getIterator()가 반환한 ArrayIterator가 add()된 순서 그대로 값을 하나씩 내보내줘요.',
            hint: 'add()한 순서대로 값을 공백으로 구분해 나열해보세요(끝에도 공백 있음).'
          };
        },
        () => ({
          type: 'code',
          q: '<code>$this->items</code> 배열을 <code>ArrayIterator</code>로 감싸서 반환하는 <code>getIterator()</code> 메서드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'public function getIterator(): Iterator {\n    return new ArrayIterator($this->items);\n}',
          accept: ['public function getIterator(): Iterator {\n    return new ArrayIterator($this->items);\n}'],
          why: 'IteratorAggregate는 getIterator()가 반환하는 Iterator(여기서는 ArrayIterator)에게 순회를 위임해요.',
          hint: 'return new ArrayIterator($this->items); 한 줄이면 충분해요.'
        }),
        () => makeChoice(
          'IteratorAggregate가 Iterator보다 더 간단한 이유는?',
          '직접 순회 로직을 만들지 않고 ArrayIterator 같은 기존 이터레이터에 위임할 수 있어서', ['foreach 없이도 배열을 출력할 수 있어서', 'current()나 key() 같은 메서드가 아예 필요 없어져서', '클래스에 프로퍼티를 선언할 필요가 없어져서'],
          'IteratorAggregate는 getIterator() 하나만 구현하면, 나머지 순회 로직은 반환한 이터레이터가 알아서 처리해줘요.',
          '"직접 다 만들지 않고 맡긴다(위임)"는 점이 핵심이에요.'
        ),
      ],
      boss: () => ({
        type: 'blank',
        q: `<code>class Countdown implements Iterator { private array $items = [3, 2, 1]; private int $position = 0; public function current(): mixed { return $this->items[$this->position]; } public function key(): mixed { return $this->position; } public function next(): void { $this->position++; } public function rewind(): void { $this->position = 0; } public function valid(): bool { return isset($this->items[$this->position]); } } foreach (new Countdown() as $num) { echo $num . " "; }</code>를 실행하면? (그대로 입력)`,
        prefix: '', suffix: '', accept: ['3 2 1 '], placeholder: '출력 결과',
        why: '$items 배열 [3, 2, 1]을 순서대로 순회하며 각 값 뒤에 공백을 붙여 출력해요.',
        hint: '배열에 저장된 순서 그대로, 공백으로 구분해 나열해보세요(끝에도 공백 있음).'
      })
    },
    {
      id: 'curlHttpRequests',
      title: 'cURL로 HTTP 요청 보내기',
      ready: true,
      summary: 'PHP에서 cURL을 이용해 외부 API에 HTTP 요청을 보내고 응답을 받아오는 법을 배워요.',
      goals: ['curl_init/curl_setopt/curl_exec의 기본 흐름 이해하기', 'GET과 POST 요청을 각각 보내는 법', '응답 상태 코드를 확인하고 curl_close로 자원을 정리하는 습관'],
      blocks: [
        {
          h: 'GET 요청 보내기: cURL의 기본 흐름',
          html: `<p><code>curl_init()</code>으로 요청 핸들을 만들고, <code>curl_setopt()</code>으로 URL 등 옵션을 설정한 뒤, <code>curl_exec()</code>으로 실제 요청을 보내고 응답을 받아요. <code>CURLOPT_RETURNTRANSFER</code>를 true로 하면 응답을 화면에 바로 출력하지 않고 문자열로 돌려받아요. 다 쓴 뒤엔 <code>curl_close()</code>로 자원을 정리해요.</p>`,
          code: {
            label: 'curl_get.php',
            lang: 'php',
            src: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.example.com/users/1");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

echo $statusCode . "\\n";
echo $response;`
          }
        },
        {
          h: 'POST 요청으로 데이터 보내기',
          html: `<p>POST 요청은 <code>CURLOPT_POST</code>를 true로 하고, <code>CURLOPT_POSTFIELDS</code>에 보낼 데이터를 담아요. JSON으로 보내려면 <code>json_encode()</code>로 문자열로 바꾸고, <code>CURLOPT_HTTPHEADER</code>로 <code>Content-Type: application/json</code>을 함께 알려줘요.</p>`,
          code: {
            label: 'curl_post.php',
            lang: 'php',
            src: `<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.example.com/users");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(["name" => "Bob"]));

$response = curl_exec($ch);
curl_close($ch);

echo $response;`
          },
          after: `<div class="note"><b>정리</b> — 실무에서는 <code>curl_errno($ch)</code>로 요청 자체가 실패했는지도 함께 확인하고, 받은 JSON 응답은 <code>json_decode()</code>로 PHP 배열/객체로 바꿔서 사용해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);</code>의 역할은?',
          '응답을 화면에 바로 출력하지 않고 문자열로 돌려받는다', ['요청 방식을 무조건 POST로 바꾼다', 'SSL 인증서 검증을 꺼버린다', '요청의 타임아웃 시간을 늘린다'],
          'CURLOPT_RETURNTRANSFER를 true로 하지 않으면 curl_exec()는 응답을 곧바로 화면에 출력하고 true를 반환해요.',
          '"돌려받는다(return)"는 이름처럼, 응답을 변수로 받을 수 있게 해줘요.'
        ),
        () => {
          const variants = [
            { code: 200, body: '{"id":1,"name":"Alice"}' },
            { code: 404, body: '{"error":"Not Found"}' },
            { code: 201, body: '{"id":2,"name":"Bob"}' },
          ];
          const v = pick(variants);
          return {
            type: 'blank',
            q: `<code>$ch = curl_init(); curl_setopt($ch, CURLOPT_URL, "https://api.example.com/users/1"); curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); $response = curl_exec($ch); $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE); curl_close($ch); echo $statusCode . "\\n"; echo $response;</code>를 실행했고, 서버가 상태 코드 ${v.code}와 응답 본문 <code>${v.body}</code>를 돌려줬다고 가정하면, 출력 결과는? (줄바꿈 포함 그대로 입력)`,
            prefix: '', suffix: '', accept: [`${v.code}\n${v.body}`], placeholder: '출력 결과',
            why: `$statusCode(${v.code})를 먼저 줄바꿈과 함께 출력하고, 이어서 $response(${v.body})를 출력해요.`,
            hint: '첫 줄엔 상태 코드, 다음 줄엔 응답 본문이 그대로 출력돼요.'
          };
        },
        () => {
          const variants = [
            { name: 'Bob', body: '{"id":2,"name":"Bob"}' },
            { name: 'Carol', body: '{"id":3,"name":"Carol"}' },
          ];
          const v = pick(variants);
          return {
            type: 'blank',
            q: `위 POST 요청 코드에서 <code>json_encode(["name" => "${v.name}"])</code>로 데이터를 보냈고, 서버가 <code>${v.body}</code>를 응답으로 돌려줬다고 가정하면, <code>echo $response;</code>의 출력 결과는? (그대로 입력)`,
            prefix: '', suffix: '', accept: [v.body], placeholder: '출력 결과',
            why: '$response에는 서버가 돌려준 응답 본문이 그대로 담겨 있어서, echo하면 그 내용이 출력돼요.',
            hint: '서버가 응답으로 준 문자열을 그대로 옮겨 적으면 돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>$url</code>과 배열 <code>$data</code>를 받아, JSON으로 POST 요청을 보내고 응답 문자열을 반환하는 함수 <code>postJson</code>을 작성하세요.',
          starter: '',
          rows: 8,
          placeholder: 'function postJson($url, $data) {\n    $ch = curl_init();\n    curl_setopt($ch, CURLOPT_URL, $url);\n    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n    curl_setopt($ch, CURLOPT_POST, true);\n    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));\n    $response = curl_exec($ch);\n    curl_close($ch);\n    return $response;\n}',
          accept: ['function postJson($url, $data) {\n    $ch = curl_init();\n    curl_setopt($ch, CURLOPT_URL, $url);\n    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n    curl_setopt($ch, CURLOPT_POST, true);\n    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));\n    $response = curl_exec($ch);\n    curl_close($ch);\n    return $response;\n}'],
          why: 'curl_init으로 핸들을 만들고, URL·POST 여부·전송할 JSON 데이터를 설정한 뒤 curl_exec으로 요청을 보내고, 응답을 반환하기 전 curl_close로 자원을 정리해요.',
          hint: 'CURLOPT_POST를 true로, CURLOPT_POSTFIELDS에 json_encode($data)를 넣고 curl_exec의 결과를 반환하세요.'
        }),
        () => makeChoice(
          '요청이 끝난 뒤 <code>curl_close($ch)</code>를 호출하는 이유는?',
          '더 이상 필요 없는 cURL 리소스(핸들)를 해제하기 위해', ['서버와의 연결을 끊지 않고 계속 유지하기 위해', '응답 내용을 자동으로 화면에 출력하기 위해', '다음 요청을 자동으로 다시 보내기 위해'],
          'curl_init()으로 만든 핸들은 시스템 자원을 차지하므로, 다 쓴 뒤엔 curl_close()로 반드시 정리해줘야 해요.',
          '파일을 다 쓰면 닫듯이, cURL 핸들도 다 쓰면 닫아줘야 해요.'
        ),
      ],
      boss: () => ({
        type: 'blank',
        q: `<code>$ch = curl_init(); curl_setopt($ch, CURLOPT_URL, "https://api.example.com/ping"); curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); $response = curl_exec($ch); $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE); curl_close($ch); if ($statusCode === 200) { echo "OK: " . $response; } else { echo "실패: " . $statusCode; }</code>를 실행했고, 서버가 상태 코드 500과 응답 본문 <code>"Server Error"</code>를 돌려줬다고 가정하면, 출력 결과는? (그대로 입력)`,
        prefix: '', suffix: '', accept: ['실패: 500'], placeholder: '출력 결과',
        why: '$statusCode가 200이 아니라 500이므로 else 분기가 실행되어 "실패: 500"이 출력돼요.',
        hint: '상태 코드가 200이 아니면 else 블록의 "실패: " . $statusCode가 실행돼요.'
      })
    }],
  tierBoss: {
    beginner: () => ({
      type: 'code',
      q: '<code>$score</code>(값 90)를 선언하고, 60 이상이면 "합격", 아니면 "불합격"을 출력하는 코드를 작성하세요.',
      starter: '',
      rows: 6,
      placeholder: '$score = 90;\nif ($score >= 60) {\n    echo "합격";\n} else {\n    echo "불합격";\n}',
      accept: ['$score = 90;\nif ($score >= 60) {\n    echo "합격";\n} else {\n    echo "불합격";\n}'],
      why: '변수를 선언하고, if/else로 조건에 따라 다른 결과를 출력해요.',
      hint: '$score = 90; 다음에 if ($score >= 60) { } else { }를 쓰세요.'
    }),
    intermediate: () => ({
      type: 'code',
      q: '두 정수 <code>$a</code>, <code>$b</code>를 받아 큰 값을 반환하는 함수 <code>maxOf</code>를 작성하세요. (if/else 사용)',
      starter: '',
      rows: 6,
      placeholder: 'function maxOf($a, $b) {\n    if ($a > $b) {\n        return $a;\n    }\n    return $b;\n}',
      accept: ['function maxOf($a, $b) {\n    if ($a > $b) {\n        return $a;\n    }\n    return $b;\n}'],
      why: '$a가 $b보다 크면 $a를, 아니면 $b를 반환하는 함수예요.',
      hint: 'function maxOf($a, $b) { if ($a > $b) { return $a; } return $b; } 형태를 떠올려보세요.'
    }),
    advanced: () => ({
      type: 'code',
      q: '<code>$fruits</code>(배열)를 <code>foreach</code>로 순회하며, 각 값 뒤에 쉼표와 공백을 붙여 출력하는 코드를 작성하세요.',
      starter: '',
      rows: 3,
      placeholder: 'foreach ($fruits as $fruit) {\n    echo $fruit . ", ";\n}',
      accept: ['foreach ($fruits as $fruit) {\n    echo $fruit . ", ";\n}'],
      why: 'foreach로 배열을 순회하며 각 값에 ", "를 이어붙여 출력해요.',
      hint: 'foreach ($fruits as $fruit) { echo $fruit . ", "; } 형태를 그대로 써보세요.'
    }),
  }
};
