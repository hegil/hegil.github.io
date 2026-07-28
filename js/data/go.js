/* Go 강의·문제 데이터 — 단원을 추가하려면 units 배열에 항목을 넣으면 됩니다. */
COURSES.go = {
    name: 'Go',
    tagline: '구글이 만든, 간결한 문법과 강력한 동시성이 강점인 언어',
    units: [{
      id: 'intro',
      title: 'Go(골랑)는 어떤 언어인가요?',
      ready: true,
      intro: true,
      summary: 'Go가 무엇이고, 어디에 쓰이고, 왜 배우면 좋은지 알아봐요.',
      blocks: [
        {
          h: 'Go는 어떤 언어인가요?',
          html: `<p>Go(흔히 "골랑"이라고도 불러요)는 2009년 구글이 만든 언어예요. 빠른 컴파일 속도와 간결한 문법, 그리고 여러 작업을 동시에 처리하는 기능(동시성)을 목표로 설계됐어요.</p>`
        },
        {
          h: '어디에 쓰이나요?',
          html: `<p>서버·백엔드 개발, 그리고 클라우드 인프라 도구에 특히 널리 쓰여요. 우리가 흔히 듣는 도커(Docker)와 쿠버네티스(Kubernetes)도 Go로 작성되어 있어요.</p>`
        },
        {
          h: '왜 배우면 좋을까요?',
          html: `<p>문법이 아주 간단해서 빠르게 배울 수 있어요. "고루틴"이라는 기능으로 여러 작업을 동시에 처리하는 코드를 쉽게 짤 수 있어서, 실무에서 서버 개발자들에게 인기가 높아요.</p>`,
          after: `<div class="note"><b>팁</b> — 이 단원은 읽기만 하면 되고, 문제나 예제는 없어요. 다음 단원부터 진짜 코드를 써보기 시작해요!</div>`
        }
      ]
    },
    {
      id: 'variables',
      title: '변수와 자료형',
      ready: true,
      summary: 'Go에서 값을 저장하는 두 가지 방법(var, :=)과 자주 쓰는 자료형을 배워요.',
      goals: ['var로 변수 선언', ':=로 간단히 선언하기', '기본 자료형(int, string, bool, float64)'],
      blocks: [
        {
          h: 'var로 변수 선언하기',
          html: `<p>Go의 변수는 <code>var 이름 타입 = 값</code> 형태로 선언해요. 타입을 정해두면 그 타입의 값만 담을 수 있어요.</p>`,
          code: {
            label: 'variables.go',
            lang: 'go',
            src: `package main

import "fmt"

func main() {
	var name string = "지수"
	var age int = 17
	fmt.Println(name, age)
}`,
            out: `지수 17`
          }
        },
        {
          h: '타입을 안 적어도: 짧은 변수 선언 :=',
          html: `<p><code>:=</code>를 쓰면 타입을 따로 적지 않아도, 오른쪽 값을 보고 Go가 알아서 타입을 정해줘요. <code>:=</code>는 함수 안에서만 쓸 수 있고, Go 코드에서 가장 흔하게 보이는 변수 선언 방식이에요.</p>`,
          code: {
            label: 'short_decl.go',
            lang: 'go',
            src: `func main() {
	name := "지수"
	age := 17
	fmt.Println(name, age)
}`,
            out: `지수 17`
          }
        },
        {
          h: '자주 쓰는 자료형',
          html: `<table>
                   <tr><th>자료형</th><th>예시</th><th>쉬운 설명</th></tr>
                   <tr><td><code>int</code></td><td><code>17</code></td><td>정수(소수점 없는 숫자)</td></tr>
                   <tr><td><code>float64</code></td><td><code>3.14</code></td><td>소수점이 있는 숫자</td></tr>
                   <tr><td><code>bool</code></td><td><code>true</code></td><td>참 또는 거짓</td></tr>
                   <tr><td><code>string</code></td><td><code>"안녕"</code></td><td>글자 여러 개(문자열)</td></tr>
                 </table>`,
          after: `<div class="note"><b>정리</b> — Go는 "타입이 확실한" 언어라서, 한 번 정한 타입에 다른 종류의 값을 넣으려 하면 컴파일 오류가 나요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>var name string = "${name}"</code>, <code>var age int = ${age}</code>이고 <code>fmt.Println(name, age)</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${name} ${age}`], placeholder: '출력 결과',
            why: `fmt.Println은 값들을 공백으로 구분해서 출력하므로 "${name} ${age}"가 돼요.`,
            hint: '여러 값을 fmt.Println에 넘기면 공백으로 구분되어 출력돼요.'
          };
        },
        () => makeChoice(
          '<code>:=</code>(짧은 변수 선언)의 특징으로 알맞은 것은?',
          '타입을 적지 않아도 되고, 함수 안에서만 쓸 수 있다', ['타입을 반드시 적어야 한다', '함수 밖(패키지 최상위)에서만 쓸 수 있다', '값을 나중에 바꿀 수 없게 만든다'],
          '<code>:=</code>는 오른쪽 값을 보고 타입을 추론하며, 함수 안에서만 사용할 수 있어요.',
          '패키지 최상위에서는 반드시 var를 써야 해요.'
        ),
        () => ({
          type: 'blank',
          q: `소수점이 있는 숫자(예: 3.14)를 담는 Go의 기본 자료형 이름을 쓰세요.`,
          prefix: 'var pi ', suffix: ' = 3.14', accept: ['float64'], placeholder: '자료형 이름',
          why: '<code>float64</code>는 소수점이 있는 숫자를 담는 Go의 기본 자료형이에요.',
          hint: 'float 뒤에 비트 수(64)가 붙어요.'
        }),
        () => ({
          type: 'code',
          q: '<code>:=</code>를 이용해서 <code>city</code>라는 변수에 <code>"서울"</code>을 담고 출력하는 코드를 두 줄로 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'city := "서울"\nfmt.Println(city)',
          accept: ['city := "서울"\nfmt.Println(city)'],
          why: ':=로 타입 없이 변수를 선언하고, fmt.Println으로 출력해요.',
          hint: 'city := "서울" 다음 줄에 fmt.Println(city)를 쓰세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>name := "${name}"</code>, <code>age := ${age}</code>이고 <code>fmt.Println(name, age)</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`${name} ${age}`], placeholder: '출력 결과',
          why: `:=로 선언한 변수도 var와 똑같이 동작하므로, 결과는 "${name} ${age}"예요.`,
          hint: 'fmt.Println에 여러 값을 넘기면 공백으로 구분돼요.'
        };
      }
    },
    {
      id: 'controlFlow',
      title: '조건문과 반복문',
      ready: true,
      summary: 'Go의 조건문 if와, 단 하나뿐인 반복문 for를 배워요.',
      goals: ['if/else(괄호 없이)', 'Go에는 while이 없고 for뿐', 'for의 여러 형태'],
      blocks: [
        {
          h: '조건문: if (조건에 괄호가 없어요)',
          html: `<p>Go의 <code>if</code>는 조건에 괄호를 쓰지 않아요. 대신 중괄호(<code>{ }</code>)는 한 줄짜리 코드여도 항상 필수예요.</p>`,
          code: {
            label: 'if_else.go',
            lang: 'go',
            src: `age := 17
if age >= 18 {
	fmt.Println("성인")
} else {
	fmt.Println("미성년자")
}`,
            out: `미성년자`
          }
        },
        {
          h: '반복문은 딱 하나: for',
          html: `<p>Go에는 <code>while</code>이나 <code>do-while</code>이 따로 없어요. <code>for</code> 하나로 모든 반복을 표현해요.</p>`,
          code: {
            label: 'for_basic.go',
            lang: 'go',
            src: `for i := 0; i < 5; i++ {
	fmt.Println(i)
}`,
            out: `0\n1\n2\n3\n4`
          }
        },
        {
          h: '조건만 있는 for (while처럼 쓰기)',
          html: `<p><code>for</code>에 조건식 하나만 쓰면, 다른 언어의 <code>while</code>처럼 동작해요.</p>`,
          code: {
            label: 'for_while.go',
            lang: 'go',
            src: `count := 0
for count < 3 {
	fmt.Println(count)
	count++
}`,
            out: `0\n1\n2`
          },
          after: `<div class="note"><b>정리</b> — <code>for 초기화; 조건; 증감 { }</code>(기본형), <code>for 조건 { }</code>(while처럼), <code>for { }</code>(무한 반복) 세 가지 형태를 모두 for 하나로 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const age = randInt(14, 22);
          const isAdult = age >= 18;
          return {
            type: 'blank',
            q: `<code>age := ${age}</code>이고 <code>if age >= 18 { fmt.Println("성인") } else { fmt.Println("미성년자") }</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [isAdult ? '성인' : '미성년자'], placeholder: '출력 결과',
            why: `${age}는 18 ${isAdult ? '이상이므로' : '미만이므로'} "${isAdult ? '성인' : '미성년자'}"가 출력돼요.`,
            hint: '18 이상인지 아닌지를 확인해보세요.'
          };
        },
        () => makeChoice(
          'Go에서 다른 언어의 while 반복문 역할을 하는 것은?',
          '조건식 하나만 있는 <code>for</code>', ['<code>while</code>', '<code>loop</code>', '<code>repeat</code>'],
          'Go에는 while 키워드가 따로 없고, for에 조건식만 써서 while처럼 써요.',
          'Go의 반복문은 오직 for 하나뿐이에요.'
        ),
        () => {
          const n = randInt(3, 6);
          let total = 0;
          for (let i = 0; i < n; i++) total += i;
          return {
            type: 'blank',
            q: `<code>total := 0; for i := 0; i < ${n}; i++ { total += i }</code>를 실행한 뒤 <code>total</code>은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
            why: `0부터 ${n - 1}까지 더하면 ${total}이에요.`,
            hint: 'i는 0부터 시작해서 n보다 작을 때까지 반복돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>0</code>부터 <code>4</code>까지(포함) 숫자를 출력하는 <code>for</code> 반복문을 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'for i := 0; i < 5; i++ {\n\tfmt.Println(i)\n}',
          accept: ['for i := 0; i < 5; i++ {\n\tfmt.Println(i)\n}'],
          why: 'i < 5 조건으로 0부터 4까지 반복해요.',
          hint: 'for i := 0; i < 5; i++ { fmt.Println(i) } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const n = randInt(2, 5);
        return {
          type: 'blank',
          q: `<code>count := 0; for count < ${n} { fmt.Println(count); count++ }</code>를 실행하면, 총 몇 번 출력될까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
          why: `count가 0부터 ${n - 1}까지 총 ${n}번 조건을 만족하며 출력돼요.`,
          hint: 'count가 n보다 작은 동안 반복이 계속돼요.'
        };
      }
    },
    {
      id: 'functions',
      title: '함수와 여러 값 반환',
      ready: true,
      summary: 'Go 함수의 기본 문법과, 여러 값을 한 번에 반환하는 Go만의 특징을 배워요.',
      goals: ['func로 함수 만들기', '매개변수와 반환 타입', '여러 값 동시에 반환하기'],
      blocks: [
        {
          h: '함수 만들기: func',
          html: `<p>Go 함수는 <code>func 이름(매개변수 타입) 반환타입 { }</code> 형태로 만들어요.</p>`,
          code: {
            label: 'func_basic.go',
            lang: 'go',
            src: `func add(a int, b int) int {
	return a + b
}

func main() {
	result := add(3, 4)
	fmt.Println(result)
}`,
            out: `7`
          }
        },
        {
          h: '여러 값을 한 번에 반환하기',
          html: `<p>Go 함수는 반환값을 <b>여러 개</b>(괄호로 묶어서) 가질 수 있어요. 몫과 나머지를 한 번에 돌려주는 것처럼, 다른 언어에서 튜플이나 객체로 감싸야 하는 걸 Go는 언어 차원에서 지원해요.</p>`,
          code: {
            label: 'multi_return.go',
            lang: 'go',
            src: `func divide(a int, b int) (int, int) {
	quotient := a / b
	remainder := a % b
	return quotient, remainder
}

func main() {
	q, r := divide(17, 5)
	fmt.Println(q, r)
}`,
            out: `3 2`
          },
          after: `<div class="note"><b>정리</b> — Go에서 <code>값, 오류 := 함수()</code> 같은 패턴이 아주 흔한데, 이것도 여러 값을 동시에 반환하는 이 기능 덕분이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          return {
            type: 'blank',
            q: `<code>func add(a int, b int) int { return a + b }</code>일 때, <code>add(${a}, ${b})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(a + b)], placeholder: '숫자',
            why: `${a} + ${b} = ${a + b}예요.`,
            hint: '매개변수 a, b 자리에 순서대로 값이 들어가요.'
          };
        },
        () => makeChoice(
          'Go 함수가 다른 언어의 함수와 다른 대표적인 특징은?',
          '괄호로 묶어서 여러 값을 동시에 반환할 수 있다', ['매개변수를 가질 수 없다', '반환 타입을 적을 수 없다', '함수 안에 함수를 만들 수 없다'],
          'Go 함수는 <code>(int, int)</code>처럼 여러 반환 타입을 한 번에 지정할 수 있어요.',
          '몫과 나머지를 한 번에 돌려주는 예시를 떠올려보세요.'
        ),
        () => {
          const a = randInt(10, 30), b = randInt(2, 6);
          const q = Math.floor(a / b), r = a % b;
          return {
            type: 'blank',
            q: `<code>func divide(a int, b int) (int, int) { return a / b, a % b }</code>이고 <code>q, r := divide(${a}, ${b})</code>일 때, <code>q</code>와 <code>r</code>은? (쉼표로 구분: q,r)`,
            prefix: '', suffix: '', accept: [`${q},${r}`, `${q}, ${r}`], placeholder: '몫,나머지',
            why: `${a} ÷ ${b}는 몫 ${q}, 나머지 ${r}이에요.`,
            hint: '/는 몫, %는 나머지를 계산해요.'
          };
        },
        () => ({
          type: 'code',
          q: '두 정수 <code>a</code>, <code>b</code>를 받아 곱(<code>a * b</code>)을 반환하는 함수 <code>multiply</code>를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'func multiply(a int, b int) int {\n\treturn a * b\n}',
          accept: ['func multiply(a int, b int) int {\n\treturn a * b\n}'],
          why: 'func 이름(매개변수 타입) 반환타입 { return 계산식 } 형태로 함수를 만들어요.',
          hint: 'func multiply(a int, b int) int { return a * b } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const a = randInt(10, 40), b = randInt(2, 7);
        const q = Math.floor(a / b), r = a % b;
        return {
          type: 'blank',
          q: `<code>func divide(a int, b int) (int, int) { return a / b, a % b }</code>이고 <code>q, r := divide(${a}, ${b})</code>, <code>result := q + r</code>일 때, <code>result</code>는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(q + r)], placeholder: '숫자',
          why: `${a} ÷ ${b}는 몫 ${q}, 나머지 ${r}이고, 이 둘을 더하면 ${q + r}이에요.`,
          hint: '먼저 몫과 나머지를 각각 구한 다음 더해보세요.'
        };
      }
    },
    {
      id: 'slicesMaps',
      title: '슬라이스와 맵',
      ready: true,
      summary: '크기가 자유롭게 늘어나는 슬라이스와, 키-값 쌍을 저장하는 맵을 배워요.',
      goals: ['슬라이스 만들고 값 추가하기(append)', '슬라이스 인덱싱', '맵으로 키-값 저장하기'],
      blocks: [
        {
          h: '크기가 자유로운 목록: 슬라이스',
          html: `<p><code>[]타입{ }</code>으로 슬라이스를 만들고, <code>append</code>로 값을 추가해요. <code>append</code>는 값이 추가된 "새 슬라이스"를 돌려주기 때문에, 보통 <code>fruits = append(fruits, ...)</code>처럼 원래 변수에 다시 대입해서 써요.</p>`,
          code: {
            label: 'slice_basic.go',
            lang: 'go',
            src: `fruits := []string{"사과", "바나나"}
fruits = append(fruits, "포도")
fmt.Println(fruits)
fmt.Println(fruits[0])`,
            out: `[사과 바나나 포도]\n사과`
          }
        },
        {
          h: '키-값 쌍 저장하기: 맵',
          html: `<p><code>map[키타입]값타입{ }</code>으로 맵을 만들어요. 대괄호 안에 키를 넣어서 값을 읽거나 새로 넣을 수 있어요.</p>`,
          code: {
            label: 'map_basic.go',
            lang: 'go',
            src: `scores := map[string]int{"지수": 90, "민준": 85}
scores["서연"] = 95
fmt.Println(scores["지수"])`,
            out: `90`
          },
          after: `<div class="note"><b>정리</b> — 슬라이스는 "순서가 있는 목록", 맵은 "이름표(키)로 찾는 저장소"라고 생각하면 헷갈리지 않아요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const items = [pick(['사과', '딸기']), pick(['바나나', '포도'])];
          const added = pick(['수박', '망고']);
          return {
            type: 'blank',
            q: `<code>fruits := []string{"${items[0]}", "${items[1]}"}</code>이고 <code>fruits = append(fruits, "${added}")</code>를 실행한 뒤 <code>fmt.Println(fruits)</code>를 하면? (그대로 입력, 예: [a b c])`,
            prefix: '', suffix: '', accept: [`[${items[0]} ${items[1]} ${added}]`], placeholder: '출력 결과',
            why: `append로 "${added}"가 맨 뒤에 추가되어 [${items[0]} ${items[1]} ${added}]가 돼요.`,
            hint: 'Go의 슬라이스를 출력하면 대괄호와 공백으로 구분된 값들이 나와요.'
          };
        },
        () => makeChoice(
          '<code>append</code>에 대한 설명으로 알맞은 것은?',
          '값이 추가된 새 슬라이스를 반환하므로, 보통 원래 변수에 다시 대입해서 쓴다', ['원래 슬라이스를 직접 바꾸고 아무것도 반환하지 않는다', '슬라이스의 첫 번째 값을 제거한다', '맵에서만 쓸 수 있는 함수다'],
          'append(슬라이스, 값)은 새 슬라이스를 돌려주기 때문에 <code>fruits = append(fruits, ...)</code>처럼 다시 대입해야 해요.',
          '반환값을 안 받으면 추가된 게 반영이 안 돼요.'
        ),
        () => {
          const name = pick(['지수', '민준', '서연']);
          const score = randInt(60, 100);
          return {
            type: 'blank',
            q: `<code>scores := map[string]int{"${name}": ${score}}</code>이고 <code>fmt.Println(scores["${name}"])</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(score)], placeholder: '숫자',
            why: `맵에서 "${name}" 키로 저장된 값 ${score}를 그대로 가져와요.`,
            hint: '맵은 대괄호 안에 키를 넣어서 값을 꺼내요.'
          };
        },
        () => ({
          type: 'code',
          q: '이름은 문자열, 나이는 정수인 <code>ages</code>라는 맵을 만들어서 <code>"지수": 17</code> 하나를 담는 코드를 작성하세요.',
          starter: '',
          placeholder: 'ages := map[string]int{"지수": 17}',
          accept: ['ages := map[string]int{"지수": 17}'],
          why: 'map[string]int{ }로 문자열 키, 정수 값의 맵을 만들어요.',
          hint: 'ages := map[string]int{"지수": 17} 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const nums = Array.from({ length: 3 }, () => randInt(1, 20));
        const added = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>nums := []int{${nums.join(', ')}}</code>이고 <code>nums = append(nums, ${added})</code>를 실행한 뒤 <code>fmt.Println(len(nums))</code>를 하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(nums.length + 1)], placeholder: '숫자',
          why: `원래 ${nums.length}개였는데 append로 하나 늘어서 ${nums.length + 1}개가 돼요.`,
          hint: 'len()은 슬라이스의 원소 개수를 알려줘요.'
        };
      }
    },
    {
      id: 'structsMethods',
      title: '구조체와 메서드',
      ready: true,
      summary: '여러 값을 하나로 묶는 구조체와, 구조체에 붙이는 함수인 메서드를 배워요.',
      goals: ['struct로 데이터 묶기', '구조체 값 만들기', '리시버로 메서드 만들기'],
      blocks: [
        {
          h: '데이터를 하나로 묶기: struct',
          html: `<p><code>type 이름 struct { 필드들 }</code>로 관련된 값들을 하나로 묶어요.</p>`,
          code: {
            label: 'struct_basic.go',
            lang: 'go',
            src: `type Student struct {
	Name string
	Age  int
}

func main() {
	s := Student{Name: "지수", Age: 17}
	fmt.Println(s.Name, s.Age)
}`,
            out: `지수 17`
          }
        },
        {
          h: '구조체에 함수 붙이기: 메서드',
          html: `<p>Go에는 class가 없어요. 대신 <code>func (s Student) 메서드이름()</code>처럼 구조체 이름 앞에 리시버를 붙여서 메서드를 만들어요. <code>(s Student)</code>는 "이 메서드는 Student 타입에 붙는다"는 뜻이에요.</p>`,
          code: {
            label: 'method_basic.go',
            lang: 'go',
            src: `type Student struct {
	Name string
	Age  int
}

func (s Student) Greet() string {
	return s.Name + "입니다"
}

func main() {
	s := Student{Name: "지수", Age: 17}
	fmt.Println(s.Greet())
}`,
            out: `지수입니다`
          },
          after: `<div class="note"><b>정리</b> — 구조체(데이터) + 메서드(그 데이터에 붙는 함수) 조합이, Go에서 다른 언어의 클래스와 비슷한 역할을 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>type Student struct { Name string; Age int }</code>이고 <code>s := Student{Name: "${name}", Age: ${age}}</code>일 때, <code>fmt.Println(s.Name, s.Age)</code>의 결과는? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${name} ${age}`], placeholder: '출력 결과',
            why: `s.Name은 "${name}", s.Age는 ${age}이므로 "${name} ${age}"가 출력돼요.`,
            hint: '점(.)으로 구조체의 필드에 접근해요.'
          };
        },
        () => makeChoice(
          '<code>func (s Student) Greet() string</code>에서 <code>(s Student)</code> 부분을 부르는 이름은?',
          '리시버(receiver)', ['매개변수(parameter)', '반환값(return value)', '인터페이스(interface)'],
          '<code>(s Student)</code>는 리시버라고 부르며, 이 메서드가 어떤 타입에 붙는지를 나타내요.',
          '"이 메서드를 받는(receive) 타입"이라는 뜻이에요.'
        ),
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>func (s Student) Greet() string { return s.Name + "입니다" }</code>이고 <code>s := Student{Name: "${name}"}</code>일 때, <code>s.Greet()</code>의 결과는? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${name}입니다`], placeholder: '결과 문자열',
            why: `s.Name("${name}")에 "입니다"를 이어붙이므로 "${name}입니다"가 돼요.`,
            hint: '문자열끼리는 +로 이어붙일 수 있어요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>Name</code>(string)과 <code>Age</code>(int) 필드를 가지는 구조체 <code>Student</code>를 정의하세요.',
          starter: '',
          rows: 3,
          placeholder: 'type Student struct {\n\tName string\n\tAge  int\n}',
          accept: ['type Student struct {\n\tName string\n\tAge  int\n}', 'type Student struct {\n\tName string\n\tAge int\n}'],
          why: 'type 이름 struct { 필드이름 타입 } 형태로 구조체를 정의해요.',
          hint: 'type Student struct { } 중괄호 안에 두 필드를 각 줄에 쓰세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>type Student struct { Name string; Age int }</code>, <code>func (s Student) IsAdult() bool { return s.Age >= 18 }</code>이고 <code>s := Student{Name: "${name}", Age: ${age}}</code>일 때, <code>s.IsAdult()</code>의 결과는? (참/거짓)`,
          prefix: '', suffix: '', accept: age >= 18 ? ['true', '참'] : ['false', '거짓'], placeholder: 'true / false',
          why: `Age(${age})가 18 ${age >= 18 ? '이상이므로' : '미만이므로'} 결과는 ${age >= 18 ? 'true' : 'false'}예요.`,
          hint: '메서드 안에서 s.Age가 18 이상인지 확인해요.'
        };
      }
    },
    {
      id: 'pointers',
      title: '포인터',
      ready: true,
      summary: '변수의 값이 아니라 "주소"를 다루는 포인터의 기본을 배워요.',
      goals: ['&로 주소 얻기', '*로 포인터가 가리키는 값 읽기·바꾸기', '포인터를 함수에 넘기는 이유'],
      blocks: [
        {
          h: '변수의 주소 얻기: &',
          html: `<p><code>&변수</code>는 그 변수가 저장된 "주소"를 돌려줘요. 그 주소를 담는 변수를 <b>포인터</b>라고 해요. <code>*포인터</code>는 그 주소가 가리키는 실제 값을 읽어요(역참조).</p>`,
          code: {
            label: 'pointer_basic.go',
            lang: 'go',
            src: `age := 17
p := &age
fmt.Println(*p)`,
            out: `17`
          }
        },
        {
          h: '포인터로 함수 밖의 값 바꾸기',
          html: `<p>함수에 값을 그냥 넘기면 <b>복사본</b>이 전달돼서 원본은 안 바뀌어요. 포인터(주소)를 넘기면 함수 안에서 <code>*포인터 = 값</code>으로 원본을 직접 바꿀 수 있어요 — 이게 포인터를 쓰는 가장 흔한 이유예요.</p>`,
          code: {
            label: 'pointer_modify.go',
            lang: 'go',
            src: `func addOne(n *int) {
	*n = *n + 1
}

func main() {
	age := 17
	addOne(&age)
	fmt.Println(age)
}`,
            out: `18`
          },
          after: `<div class="note"><b>정리</b> — <code>&</code>는 "주소를 얻어라", <code>*</code>는 "그 주소가 가리키는 값을 다뤄라"라는 뜻이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(1, 50);
          return {
            type: 'blank',
            q: `<code>n := ${n}</code>이고 <code>p := &n</code>일 때, <code>*p</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `*p는 p가 가리키는 주소의 실제 값을 읽으므로 ${n}이에요.`,
            hint: '*(역참조)는 포인터가 가리키는 실제 값을 돌려줘요.'
          };
        },
        () => makeChoice(
          '<code>&</code>와 <code>*</code>의 역할로 알맞은 것은?',
          '&는 변수의 주소를 얻고, *는 그 주소가 가리키는 값을 읽거나 바꾼다', ['&는 값을 복사하고, *는 값을 삭제한다', '&와 *는 완전히 같은 기능을 한다', '&는 함수를 만들고, *는 함수를 호출한다'],
          '&변수는 주소를, *포인터는 그 주소의 값을 다뤄요.',
          '기호 하나는 "주소를 꺼내기", 다른 하나는 "그 주소의 내용물 다루기"예요.'
        ),
        () => {
          const start = randInt(1, 30);
          return {
            type: 'blank',
            q: `<code>func addOne(n *int) { *n = *n + 1 }</code>이고 <code>age := ${start}; addOne(&age)</code>를 실행한 뒤 <code>fmt.Println(age)</code>를 하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(start + 1)], placeholder: '숫자',
            why: `addOne이 포인터를 통해 원본 age를 직접 1 늘리므로 ${start} + 1 = ${start + 1}이에요.`,
            hint: '포인터를 넘기면 함수 안에서 원본 변수를 직접 바꿀 수 있어요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>*int</code>를 매개변수로 받아, 그 값을 2배로 만드는 함수 <code>double</code>을 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'func double(n *int) {\n\t*n = *n * 2\n}',
          accept: ['func double(n *int) {\n\t*n = *n * 2\n}'],
          why: '*n = *n * 2로 포인터가 가리키는 원본 값을 2배로 바꿔요.',
          hint: 'func double(n *int) { *n = *n * 2 } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const start = randInt(1, 40);
        return {
          type: 'blank',
          q: `<code>func double(n *int) { *n = *n * 2 }</code>이고 <code>x := ${start}; double(&x); double(&x)</code>를 실행한 뒤 <code>fmt.Println(x)</code>를 하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(start * 4)], placeholder: '숫자',
          why: `double을 두 번 호출하면 x가 2배씩 두 번 늘어서 ${start} × 2 × 2 = ${start * 4}예요.`,
          hint: 'double(&x)를 두 번 부르면 원본 x가 두 번 연속으로 2배가 돼요.'
        };
      }
    },
    {
      id: 'interfaces',
      title: '인터페이스',
      ready: true,
      summary: '서로 다른 타입을 같은 방식으로 다룰 수 있게 해주는 인터페이스를 배워요.',
      goals: ['interface 정의', '암묵적 구현(따로 선언 안 해도 됨)', '다형성 활용하기'],
      blocks: [
        {
          h: '약속을 정의하는 interface',
          html: `<p><code>interface</code>는 "이 메서드를 가져야 한다"는 약속이에요. Go의 인터페이스는 <b>암묵적으로 구현</b>돼요 — "이 인터페이스를 구현합니다"라고 따로 선언할 필요 없이, 필요한 메서드를 가진 타입이면 자동으로 그 인터페이스를 만족해요.</p>`,
          code: {
            label: 'interface_basic.go',
            lang: 'go',
            src: `type Shape interface {
	Area() float64
}

type Circle struct {
	Radius float64
}

func (c Circle) Area() float64 {
	return 3.14 * c.Radius * c.Radius
}`
          }
        },
        {
          h: '서로 다른 타입을 같은 방식으로 다루기',
          html: `<p><code>Shape</code> 타입으로 매개변수를 받으면, 그게 <code>Circle</code>이든 <code>Rectangle</code>이든 상관없이 <code>Area()</code>를 호출할 수 있어요.</p>`,
          code: {
            label: 'interface_poly.go',
            lang: 'go',
            src: `type Rectangle struct {
	Width, Height float64
}

func (r Rectangle) Area() float64 {
	return r.Width * r.Height
}

func printArea(s Shape) {
	fmt.Println(s.Area())
}

func main() {
	printArea(Circle{Radius: 2})
	printArea(Rectangle{Width: 3, Height: 4})
}`,
            out: `12.56\n12`
          },
          after: `<div class="note"><b>정리</b> — 새로운 도형(타입)을 추가해도, Area() 메서드만 있으면 printArea 함수는 전혀 고칠 필요가 없어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const r = randInt(1, 5);
          const area = (3.14 * r * r).toFixed(2);
          return {
            type: 'blank',
            q: `<code>func (c Circle) Area() float64 { return 3.14 * c.Radius * c.Radius }</code>이고 <code>Circle{Radius: ${r}}.Area()</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [area, String(parseFloat(area))], placeholder: '숫자',
            why: `3.14 × ${r} × ${r} = ${area}예요.`,
            hint: '반지름의 제곱에 3.14를 곱해보세요.'
          };
        },
        () => makeChoice(
          'Go에서 어떤 타입이 인터페이스를 구현하는 방식은?',
          '"구현합니다"라는 선언 없이, 필요한 메서드를 가지고 있으면 자동으로 구현된다(암묵적)', ['implements 키워드로 명시적으로 선언해야 한다', '같은 파일 안에서만 인터페이스를 구현할 수 있다', '인터페이스는 구조체에서만 쓸 수 없고 함수에서만 쓴다'],
          'Go의 인터페이스는 암묵적으로 구현돼요. 메서드 시그니처만 맞으면 자동으로 그 인터페이스를 만족해요.',
          '다른 언어의 implements 키워드 같은 게 Go에는 없어요.'
        ),
        () => {
          const w = randInt(2, 8), h = randInt(2, 8);
          return {
            type: 'blank',
            q: `<code>func (r Rectangle) Area() float64 { return r.Width * r.Height }</code>이고 <code>Rectangle{Width: ${w}, Height: ${h}}.Area()</code>를 실행하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(w * h)], placeholder: '숫자',
            why: `${w} × ${h} = ${w * h}예요.`,
            hint: 'Width와 Height를 곱해보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>Square</code>(<code>Side float64</code>) 구조체에, 넓이(<code>Side * Side</code>)를 반환하는 <code>Area</code> 메서드를 작성하세요. (메서드 정의만)',
          starter: '',
          rows: 3,
          placeholder: 'func (s Square) Area() float64 {\n\treturn s.Side * s.Side\n}',
          accept: ['func (s Square) Area() float64 {\n\treturn s.Side * s.Side\n}'],
          why: '리시버 (s Square)를 받는 Area() 메서드에서 Side * Side를 반환해요.',
          hint: 'func (s Square) Area() float64 { return s.Side * s.Side } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const r = randInt(1, 6);
        const w = randInt(2, 6), h = randInt(2, 6);
        const useCircle = Math.random() < 0.5;
        const area = useCircle ? (3.14 * r * r).toFixed(2) : w * h;
        return {
          type: 'blank',
          q: `<code>func printArea(s Shape) { fmt.Println(s.Area()) }</code>일 때, <code>printArea(${useCircle ? `Circle{Radius: ${r}}` : `Rectangle{Width: ${w}, Height: ${h}}`})</code>의 출력은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(area)], placeholder: '숫자',
          why: useCircle
            ? `Circle의 Area()는 3.14 × ${r} × ${r} = ${area}예요.`
            : `Rectangle의 Area()는 ${w} × ${h} = ${area}예요.`,
          hint: 'printArea는 넘겨받은 도형의 실제 Area() 메서드를 호출해요.'
        };
      }
    },
    {
      id: 'errorHandling',
      title: '에러 처리',
      ready: true,
      summary: 'Go에서 예외 대신 값으로 오류를 다루는 error 인터페이스를 배워요.',
      goals: ['함수가 error를 반환하는 관례', 'if err != nil 패턴', 'errors.New로 직접 에러 만들기'],
      blocks: [
        {
          h: '에러를 값으로 다루기',
          html: `<p>Go에는 try-catch가 없어요. 실패할 수 있는 함수는 관례적으로 <b>마지막 반환값</b>으로 <code>error</code>를 돌려줘요. 성공하면 <code>nil</code>(오류 없음)을 반환해요.</p>`,
          code: {
            label: 'error_basic.go',
            lang: 'go',
            src: `func divide(a int, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("0으로 나눌 수 없어요")
	}
	return a / b, nil
}

func main() {
	result, err := divide(10, 0)
	if err != nil {
		fmt.Println("오류:", err)
		return
	}
	fmt.Println(result)
}`,
            out: `오류: 0으로 나눌 수 없어요`
          },
          after: `<div class="note"><b>정리</b> — 호출하는 쪽은 거의 항상 <code>if err != nil { ... }</code>로 오류가 있었는지 확인하는 게 Go의 표준적인 패턴이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const isZero = Math.random() < 0.5;
          const a = randInt(10, 50);
          const b = isZero ? 0 : randInt(1, 5);
          return {
            type: 'blank',
            q: `<code>func divide(a int, b int) (int, error) { if b == 0 { return 0, errors.New("0으로 나눌 수 없어요") }; return a / b, nil }</code>일 때, <code>result, err := divide(${a}, ${b})</code> 후 <code>err</code>는 nil일까요? (예/아니오)`,
            prefix: '', suffix: '', accept: [isZero ? '아니오' : '예'], placeholder: '예 / 아니오',
            why: isZero
              ? 'b가 0이므로 errors.New(...)가 반환되어 err는 nil이 아니에요.'
              : 'b가 0이 아니므로 정상적으로 계산되어 err는 nil이에요.',
            hint: 'b가 0일 때만 에러가 생겨요.'
          };
        },
        () => makeChoice(
          'Go의 에러 처리 방식으로 알맞은 것은?',
          '예외(exception) 대신, 함수의 마지막 반환값으로 error 값을 돌려준다', ['try-catch로 예외를 잡는다', '에러가 나면 프로그램이 항상 즉시 종료된다', '에러 처리를 위한 특별한 문법이 없다'],
          'Go는 error를 일반 값처럼 반환값으로 다뤄서, 호출하는 쪽이 직접 확인하게 해요.',
          '다른 언어의 try-catch에 해당하는 게 Go에는 없어요.'
        ),
        () => ({
          type: 'blank',
          q: `함수가 오류 없이 성공했을 때, error 자리에 돌려주는 특별한 값을 쓰세요.`,
          prefix: 'return result, ', suffix: '', accept: ['nil'], placeholder: '값',
          why: '<code>nil</code>은 "오류가 없다"는 뜻으로, 성공했을 때 error 자리에 반환해요.',
          hint: '"값이 없음"을 나타내는 Go의 특별한 값이에요.'
        }),
        () => ({
          type: 'code',
          q: '<code>b</code>가 0이면 <code>errors.New("0으로 나눌 수 없어요")</code>를 반환하고, 아니면 <code>a / b</code>와 <code>nil</code>을 반환하는 함수 <code>divide</code>를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'func divide(a int, b int) (int, error) {\n\tif b == 0 {\n\t\treturn 0, errors.New("0으로 나눌 수 없어요")\n\t}\n\treturn a / b, nil\n}',
          accept: ['func divide(a int, b int) (int, error) {\n\tif b == 0 {\n\t\treturn 0, errors.New("0으로 나눌 수 없어요")\n\t}\n\treturn a / b, nil\n}'],
          why: 'b가 0인지 확인해서, 맞으면 에러를, 아니면 결과와 nil을 반환해요.',
          hint: 'if b == 0 { return 0, errors.New("...") } 다음에 return a / b, nil을 쓰세요.'
        }),
      ],
      boss: () => {
        const isZero = Math.random() < 0.5;
        const a = randInt(20, 60);
        const b = isZero ? 0 : randInt(2, 6);
        return {
          type: 'blank',
          q: `<code>func divide(a int, b int) (int, error) { if b == 0 { return 0, errors.New("오류") }; return a / b, nil }</code>이고 <code>result, err := divide(${a}, ${b})</code>일 때, <code>err != nil</code>이면 "실패", 아니면 <code>result</code>를 출력하는 코드가 있어요. 무엇이 출력될까요?`,
          prefix: '', suffix: '', accept: isZero ? ['실패'] : [String(Math.floor(a / b))], placeholder: '실패 또는 숫자',
          why: isZero
            ? 'b가 0이라 err가 nil이 아니므로 "실패"가 출력돼요.'
            : `b가 0이 아니므로 정상 계산되어 ${Math.floor(a / b)}이 출력돼요.`,
          hint: '먼저 err가 nil인지 아닌지부터 확인해보세요.'
        };
      }
    },
    {
      id: 'defer',
      title: 'defer로 나중에 실행하기',
      ready: true,
      summary: '함수가 끝나기 직전에 실행되도록 예약하는 defer를 배워요.',
      goals: ['defer의 기본 동작', '여러 defer는 역순으로 실행됨', '자원 정리에 자주 쓰는 이유'],
      blocks: [
        {
          h: '함수가 끝날 때 실행 예약하기: defer',
          html: `<p><code>defer</code>가 붙은 코드는 지금 당장 실행되지 않고, 그 함수가 끝나기(return하기) 직전에 실행돼요.</p>`,
          code: {
            label: 'defer_basic.go',
            lang: 'go',
            src: `func main() {
	fmt.Println("시작")
	defer fmt.Println("끝")
	fmt.Println("작업 중")
}`,
            out: `시작\n작업 중\n끝`
          }
        },
        {
          h: '여러 defer는 거꾸로(역순) 실행돼요',
          html: `<p><code>defer</code>는 스택처럼 쌓여서, <b>나중에 등록한 게 먼저</b> 실행돼요. 파일 닫기, 잠금 해제처럼 "끝날 때 꼭 해야 하는 정리 작업"에 자주 써요.</p>`,
          code: {
            label: 'defer_order.go',
            lang: 'go',
            src: `func main() {
	defer fmt.Println("1")
	defer fmt.Println("2")
	defer fmt.Println("3")
}`,
            out: `3\n2\n1`
          },
          after: `<div class="note"><b>정리</b> — defer는 "지금 예약해두고, 함수 끝날 때 거꾸로 실행"이라고 기억하면 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>func main() { fmt.Println("A"); defer fmt.Println("B"); fmt.Println("C") }</code>를 실행하면, 출력 순서는? (줄바꿈으로 구분해서 순서대로 입력)`,
          prefix: '', suffix: '', accept: ['A\nC\nB'], placeholder: '출력 순서',
          why: 'defer가 붙은 fmt.Println("B")는 함수가 끝나기 직전으로 미뤄지므로, A, C가 먼저 출력되고 마지막에 B가 출력돼요.',
          hint: 'defer가 붙은 줄은 코드의 위치와 상관없이 맨 마지막에 실행돼요.'
        }),
        () => makeChoice(
          '한 함수 안에 <code>defer</code>가 여러 번 있을 때, 실행되는 순서는?',
          '나중에 등록한 것부터 먼저 실행된다(역순)', ['등록한 순서 그대로 실행된다', '무작위 순서로 실행된다', '가장 처음 등록한 것만 실행된다'],
          'defer는 스택처럼 쌓여서, 마지막에 defer한 것이 가장 먼저 실행돼요.',
          '"나중에 넣은 게 먼저 나온다"는 스택의 동작을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>defer</code>를 자주 사용하는 목적을 설명하면? ("함수가 끝날 때 꼭 필요한 정리 작업(파일 닫기 등)을 예약해두기 위해"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['함수가 끝날 때 꼭 필요한 정리 작업(파일 닫기 등)을 예약해두기 위해'], placeholder: '설명',
          why: 'defer는 자원을 열었을 때 "함수가 끝나면 반드시 닫아야 한다"는 걸 코드 초반에 미리 예약해둘 수 있게 해줘요.',
          hint: '파일이나 연결을 "열고 나서 바로 옆에 닫기를 예약해두는" 패턴을 생각해보세요.'
        }),
        () => ({
          type: 'code',
          q: '"시작"을 출력하고, <code>defer</code>로 "종료"를 출력 예약한 뒤, "작업 중"을 출력하는 <code>main</code> 함수 본문을 작성하세요. (함수 본문만)',
          starter: '',
          rows: 3,
          placeholder: 'fmt.Println("시작")\ndefer fmt.Println("종료")\nfmt.Println("작업 중")',
          accept: ['fmt.Println("시작")\ndefer fmt.Println("종료")\nfmt.Println("작업 중")'],
          why: 'defer가 붙은 줄만 함수 끝으로 실행이 미뤄져요.',
          hint: 'fmt.Println("시작") 다음에 defer fmt.Println("종료"), 그 다음 fmt.Println("작업 중")을 쓰세요.'
        }),
      ],
      boss: () => {
        const words = [pick(['첫번째', 'A']), pick(['두번째', 'B']), pick(['세번째', 'C'])];
        return {
          type: 'blank',
          q: `<code>func main() { defer fmt.Println("${words[0]}"); defer fmt.Println("${words[1]}"); defer fmt.Println("${words[2]}") }</code>를 실행하면, 출력 순서는? (줄바꿈으로 구분)`,
          prefix: '', suffix: '', accept: [`${words[2]}\n${words[1]}\n${words[0]}`], placeholder: '출력 순서',
          why: `defer는 역순으로 실행되므로 "${words[2]}" → "${words[1]}" → "${words[0]}" 순서로 출력돼요.`,
          hint: '가장 나중에 defer한 것이 가장 먼저 실행돼요.'
        };
      }
    },
    {
      id: 'arraysVsSlices',
      title: '배열과 슬라이스의 차이',
      ready: true,
      summary: '크기가 고정된 배열과, 크기가 자유로운 슬라이스가 실제로 어떻게 다른지 배워요.',
      goals: ['배열은 크기가 타입의 일부', '슬라이스는 배열을 감싼 유연한 뷰', 'len()과 cap()의 차이'],
      blocks: [
        {
          h: '크기가 고정된 배열',
          html: `<p><code>[크기]타입</code>으로 만드는 배열은 크기가 <b>타입의 일부</b>예요. <code>[3]int</code>와 <code>[5]int</code>는 완전히 다른 타입으로 취급되고, 한 번 정한 크기는 못 바꿔요.</p>`,
          code: {
            label: 'array_basic.go',
            lang: 'go',
            src: `var nums [3]int
nums[0] = 10
nums[1] = 20
fmt.Println(nums)
fmt.Println(len(nums))`,
            out: `[10 20 0]\n3`
          }
        },
        {
          h: '배열을 감싼 유연한 뷰: 슬라이스',
          html: `<p>슬라이스는 실제로는 배열을 가리키는 얇은 구조체(포인터+길이+용량)라서, <code>append</code>로 자유롭게 늘어날 수 있어요. <code>len()</code>은 지금 담긴 개수, <code>cap()</code>은 재할당 없이 늘어날 수 있는 최대 용량을 알려줘요.</p>`,
          code: {
            label: 'slice_len_cap.go',
            lang: 'go',
            src: `nums := []int{10, 20, 30}
fmt.Println(len(nums))
fmt.Println(cap(nums))`,
            out: `3\n3`
          },
          after: `<div class="note"><b>정리</b> — 실무에서는 크기를 미리 알기 어려운 경우가 대부분이라, 배열보다 슬라이스를 훨씬 자주 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 6);
          return {
            type: 'blank',
            q: `<code>var nums [${n}]int</code>일 때, <code>len(nums)</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `[${n}]int로 선언했으므로 배열의 크기(길이)는 항상 ${n}이에요.`,
            hint: '배열의 크기는 선언할 때 대괄호 안의 숫자로 고정돼요.'
          };
        },
        () => makeChoice(
          '배열과 슬라이스의 근본적인 차이로 알맞은 것은?',
          '배열은 크기가 타입의 일부라 고정되어 있고, 슬라이스는 append로 자유롭게 늘어날 수 있다', ['배열은 문자열만 담을 수 있고, 슬라이스는 숫자만 담을 수 있다', '슬라이스는 크기를 절대 알 수 없다', '배열과 슬라이스는 완전히 같은 것이다'],
          '[3]int 같은 배열은 크기가 고정된 타입이고, []int 슬라이스는 append로 유연하게 커질 수 있어요.',
          '"타입의 일부로 크기가 박혀있는지"가 핵심 차이예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>len()</code>과 <code>cap()</code>의 차이를 설명하면? ("len은 지금 담긴 개수, cap은 재할당 없이 늘어날 수 있는 최대 용량"이라고 답하세요)`,
          prefix: '', suffix: '', accept: ['len은 지금 담긴 개수, cap은 재할당 없이 늘어날 수 있는 최대 용량'], placeholder: '설명',
          why: 'len()은 현재 원소 개수, cap()은 재할당 없이 늘어날 수 있는 최대 크기를 알려줘요.',
          hint: '"지금 몇 개 들었는지"와 "최대 몇 개까지 늘어날 수 있는지"를 구분해보세요.'
        }),
        () => ({
          type: 'code',
          q: '정수 5개를 담을 수 있는 배열 <code>nums</code>를 선언하세요. (초기값 없이 선언만)',
          starter: '',
          placeholder: 'var nums [5]int',
          accept: ['var nums [5]int'],
          why: 'var 이름 [크기]타입 형태로 크기가 고정된 배열을 선언해요.',
          hint: 'var nums [5]int 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const n = randInt(3, 7);
        return {
          type: 'blank',
          q: `<code>var arr [${n}]int</code>이고 <code>s := []int{1, 2, 3}</code>일 때, <code>len(arr)</code>과 <code>len(s)</code>를 더하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(n + 3)], placeholder: '숫자',
          why: `arr의 길이는 ${n}(고정), s의 길이는 3(원소 3개)이므로 합은 ${n} + 3 = ${n + 3}이에요.`,
          hint: '배열은 선언한 크기, 슬라이스는 실제 담긴 원소 개수를 세어보세요.'
        };
      }
    },
    {
      id: 'goroutines',
      title: '고루틴 기초',
      ready: true,
      summary: '함수를 동시에 실행시키는 가벼운 실행 단위, 고루틴을 배워요.',
      goals: ['go 키워드로 고루틴 시작하기', '메인 함수가 안 기다려주는 문제', 'time.Sleep으로 잠깐 기다리기(임시방편)'],
      blocks: [
        {
          h: '동시에 실행하기: go 키워드',
          html: `<p>함수 호출 앞에 <code>go</code>를 붙이면, 그 함수가 메인 흐름과 동시에(비동기로) 실행되는 새 <b>고루틴</b>이 시작돼요. 고루틴은 스레드보다 훨씬 가벼워서 수천 개도 쉽게 만들 수 있어요.</p>`,
          code: {
            label: 'goroutine_basic.go',
            lang: 'go',
            src: `func sayHello() {
	fmt.Println("안녕!")
}

func main() {
	go sayHello()
	fmt.Println("메인 함수")
}`
          },
          after: `<div class="note"><b>주의</b> — 위 코드는 <code>sayHello()</code>가 실행되기도 전에 <code>main</code> 함수가 끝나버릴 수 있어서, "안녕!"이 출력 안 될 수도 있어요. main 함수는 고루틴을 기다려주지 않아요.</div>`
        },
        {
          h: '임시방편: time.Sleep',
          html: `<p><code>time.Sleep</code>으로 메인이 잠깐 기다리게 하면 고루틴이 끝날 시간을 벌 수 있어요. 다만 이건 "확실한" 방법이 아니라 일단 되게 만드는 임시방편이에요 — 진짜 확실한 대기 방법은 다음 단원에서 배울 채널과 WaitGroup이에요.</p>`,
          code: {
            label: 'goroutine_sleep.go',
            lang: 'go',
            src: `func main() {
	go fmt.Println("안녕!")
	time.Sleep(100 * time.Millisecond)
	fmt.Println("메인 함수")
}`,
            out: `안녕!\n메인 함수`
          }
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '함수 호출 앞에 붙이는 <code>go</code> 키워드의 역할은?',
          '그 함수를 새로운 고루틴으로 만들어 동시에(비동기로) 실행시킨다', ['그 함수를 삭제한다', '그 함수의 실행을 무한히 반복한다', '그 함수를 더 빠르게 실행되도록 최적화한다'],
          'go 함수호출()은 그 함수를 메인 흐름과 별개로 동시에 실행되게 해요.',
          '"고루틴으로 가라(go)"는 뜻 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>go sayHello()</code>처럼 고루틴으로 실행한 함수가, <code>main</code> 함수가 먼저 끝나버려서 출력이 안 보일 수도 있는 이유를 설명하면? ("main 함수가 고루틴을 기다려주지 않기 때문"이라고 답하세요)`,
          prefix: '', suffix: '', accept: ['main 함수가 고루틴을 기다려주지 않기 때문'], placeholder: '설명',
          why: 'go로 시작한 고루틴은 main과 독립적으로 실행되는데, main이 끝나면 프로그램 전체가 끝나버려서 고루틴이 미처 다 실행되기 전에 종료될 수 있어요.',
          hint: 'main 함수는 고루틴이 끝나기를 자동으로 기다려주지 않아요.'
        }),
        () => makeChoice(
          '고루틴이 끝날 시간을 벌기 위해 <code>time.Sleep</code>을 쓰는 방식의 문제점은?',
          '정확히 얼마나 기다려야 할지 보장할 수 없는 임시방편이다', ['time.Sleep은 고루틴을 아예 멈춰버린다', 'time.Sleep은 문법 오류를 일으킨다', 'time.Sleep은 여러 번 쓸 수 없다'],
          'time.Sleep은 "이 정도면 충분하겠지"라고 추측하는 것일 뿐, 확실하게 기다리는 방법이 아니에요.',
          '정말 확실한 방법은 채널이나 WaitGroup을 쓰는 거예요.'
        ),
        () => ({
          type: 'code',
          q: '"작업 중"을 출력하는 <code>func() { fmt.Println("작업 중") }</code> 형태의 익명 함수를 고루틴으로 실행하는 코드를 한 줄로 작성하세요.',
          starter: '',
          placeholder: 'go func() { fmt.Println("작업 중") }()',
          accept: ['go func() { fmt.Println("작업 중") }()'],
          why: '익명 함수도 go 뒤에 붙여서 바로 고루틴으로 실행할 수 있어요.',
          hint: 'go func() { ... }() 형태로, 함수를 정의하자마자 바로 호출해요.'
        }),
      ],
      boss: () => {
        return {
          type: 'blank',
          q: `<code>func main() { go fmt.Println("A"); time.Sleep(100 * time.Millisecond); fmt.Println("B") }</code>를 실행하면, "A"가 출력될 확률이 높을까요, 낮을까요? (높음/낮음)`,
          prefix: '', suffix: '', accept: ['높음'], placeholder: '높음 / 낮음',
          why: 'time.Sleep으로 메인이 100밀리초 기다리는 동안 고루틴이 실행될 충분한 시간을 벌어서, "A"가 출력될 확률이 높아요.',
          hint: 'time.Sleep이 고루틴에게 실행될 시간을 벌어줘요.'
        };
      }
    },
    {
      id: 'channels',
      title: '채널 기초',
      ready: true,
      summary: '고루틴끼리 안전하게 값을 주고받는 통로인 채널을 배워요.',
      goals: ['make(chan 타입)으로 채널 만들기', '<-로 값 보내고 받기', '채널이 자동으로 "기다려주는" 이유'],
      blocks: [
        {
          h: '채널 만들고 값 주고받기',
          html: `<p><code>make(chan 타입)</code>으로 채널을 만들어요. <code>채널 &lt;- 값</code>은 채널에 값을 보내고, <code>&lt;-채널</code>은 채널에서 값을 받아요.</p>`,
          code: {
            label: 'channel_basic.go',
            lang: 'go',
            src: `func main() {
	ch := make(chan string)
	go func() {
		ch <- "완료!"
	}()
	msg := <-ch
	fmt.Println(msg)
}`,
            out: `완료!`
          },
          after: `<div class="note"><b>정리</b> — <code>&lt;-ch</code>로 값을 받는 코드는, 채널에 값이 들어올 때까지 <b>자동으로 정확하게</b> 기다려줘요. 그래서 앞 단원의 time.Sleep 같은 임시방편이 필요 없어져요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const msg = pick(['완료!', '성공', '끝났어요']);
          return {
            type: 'blank',
            q: `<code>ch := make(chan string); go func() { ch <- "${msg}" }(); msg := <-ch; fmt.Println(msg)</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [msg], placeholder: '출력 결과',
            why: `고루틴이 채널에 보낸 "${msg}"를 main이 &lt;-ch로 받아서 그대로 출력해요.`,
            hint: '채널로 보낸 값을 그대로 받아서 출력해요.'
          };
        },
        () => makeChoice(
          '채널(channel)이 <code>time.Sleep</code>보다 나은 점은?',
          '값이 실제로 준비될 때까지 정확하게 기다려준다(추측이 필요 없음)', ['채널은 항상 time.Sleep보다 빠르다', '채널은 값을 저장할 필요가 없다', '채널은 고루틴 없이도 동시성을 만든다'],
          '&lt;-ch는 값이 올 때까지 정확히 기다리므로, "이 정도면 되겠지" 추측이 필요 없어요.',
          '"얼마나 기다릴지 추측"과 "정확히 기다리기"의 차이예요.'
        ),
        () => ({
          type: 'blank',
          q: `정수를 주고받는 채널을 만들려고 해요. 빈칸을 채우세요.`,
          prefix: 'ch := make(', suffix: ')', accept: ['chan int'], placeholder: '타입',
          why: '<code>make(chan int)</code>는 정수를 주고받는 채널을 만들어요.',
          hint: 'chan 뒤에 주고받을 값의 타입을 적어요.'
        }),
        () => ({
          type: 'code',
          q: '문자열을 주고받는 채널 <code>ch</code>를 만들고, 고루틴에서 <code>"완료!"</code>를 보낸 뒤, main에서 그 값을 받아 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'ch := make(chan string)\ngo func() { ch <- "완료!" }()\nmsg := <-ch\nfmt.Println(msg)',
          accept: ['ch := make(chan string)\ngo func() { ch <- "완료!" }()\nmsg := <-ch\nfmt.Println(msg)'],
          why: '채널을 만들고, 고루틴에서 값을 보내고, main에서 &lt;-ch로 받아 출력해요.',
          hint: 'make(chan string) → go func() { ch <- "완료!" }() → msg := <-ch → fmt.Println(msg) 순서예요.'
        }),
      ],
      boss: () => {
        const n = randInt(1, 20);
        return {
          type: 'blank',
          q: `<code>ch := make(chan int); go func() { ch <- ${n} * 2 }(); result := <-ch; fmt.Println(result)</code>를 실행하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(n * 2)], placeholder: '숫자',
          why: `고루틴이 ${n} * 2 = ${n * 2}를 채널로 보내고, main이 그 값을 그대로 받아 출력해요.`,
          hint: '채널로 보낸 계산 결과를 그대로 받아서 출력해요.'
        };
      }
    },
    {
      id: 'selectStatement',
      title: 'select문',
      ready: true,
      summary: '여러 채널 중 먼저 준비되는 것을 골라 처리하는 select문을 배워요.',
      goals: ['select로 여러 채널 동시에 기다리기', '먼저 준비되는 case가 실행됨', 'default로 기다리지 않기'],
      blocks: [
        {
          h: '여러 채널 중 먼저 오는 것 처리하기',
          html: `<p><code>select</code>는 여러 채널을 동시에 지켜보다가, <b>먼저 준비되는(값이 오는) case</b>를 실행해요. 어느 쪽이 먼저 올지는 실행할 때마다 달라질 수 있어요.</p>`,
          code: {
            label: 'select_basic.go',
            lang: 'go',
            src: `func main() {
	ch1 := make(chan string)
	ch2 := make(chan string)

	go func() { ch1 <- "채널1" }()
	go func() { ch2 <- "채널2" }()

	select {
	case msg1 := <-ch1:
		fmt.Println(msg1)
	case msg2 := <-ch2:
		fmt.Println(msg2)
	}
}`
          }
        },
        {
          h: '기다리지 않고 확인하기: default',
          html: `<p><code>default</code>가 있으면, 어떤 채널도 아직 준비 안 됐을 때 기다리지 않고 바로 <code>default</code>를 실행해요(non-blocking 확인).</p>`,
          code: {
            label: 'select_default.go',
            lang: 'go',
            src: `select {
case msg := <-ch:
	fmt.Println(msg)
default:
	fmt.Println("아직 준비 안 됨")
}`,
            out: `아직 준비 안 됨`
          },
          after: `<div class="note"><b>정리</b> — default가 없으면 select는 어떤 case든 준비될 때까지 계속 기다려요. default가 있으면 안 기다리고 바로 지나가요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>select</code>문의 역할로 알맞은 것은?',
          '여러 채널을 동시에 지켜보다가, 먼저 준비되는 case를 실행한다', ['여러 채널에 동시에 값을 보낸다', '채널 하나만 골라서 영구히 막아버린다', 'if문을 여러 개 합친 것과 완전히 같다'],
          'select는 여러 채널 중 먼저 값이 오는 case를 골라 실행해요.',
          '여러 채널을 "동시에" 지켜본다는 게 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>select</code> 안에 <code>default:</code>가 있으면, 어떤 채널도 준비되지 않았을 때 어떻게 될까요? ("기다리지 않고 default가 바로 실행된다"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['기다리지 않고 default가 바로 실행된다'], placeholder: '설명',
          why: 'default가 있으면 select는 채널이 준비될 때까지 기다리지 않고, 바로 default 코드를 실행해요.',
          hint: 'default는 "기다리지 않고 즉시 확인"하는 용도예요.'
        }),
        () => makeChoice(
          '<code>select</code>에 <code>default</code>가 <b>없을</b> 때의 동작은?',
          '어느 하나의 case든 준비될 때까지 계속 기다린다', ['즉시 아무 case도 실행하지 않고 지나간다', '항상 첫 번째 case만 실행한다', '오류가 발생한다'],
          'default가 없으면 select는 준비되는 채널이 나올 때까지 블로킹(대기)해요.',
          'default의 유무가 "기다림"과 "안 기다림"을 가르는 기준이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>ch1</code>과 <code>ch2</code> 채널을 동시에 지켜보다가, 먼저 값이 오는 쪽을 <code>fmt.Println</code>으로 출력하는 <code>select</code>문을 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'select {\ncase msg1 := <-ch1:\n\tfmt.Println(msg1)\ncase msg2 := <-ch2:\n\tfmt.Println(msg2)\n}',
          accept: ['select {\ncase msg1 := <-ch1:\n\tfmt.Println(msg1)\ncase msg2 := <-ch2:\n\tfmt.Println(msg2)\n}'],
          why: 'select { case ... case ... } 형태로 여러 채널을 동시에 지켜봐요.',
          hint: 'select { case msg1 := <-ch1: ... case msg2 := <-ch2: ... } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        return {
          type: 'blank',
          q: `<code>ch := make(chan string)</code>이고(아무도 아직 값을 보내지 않았어요) <code>select { case msg := <-ch: fmt.Println(msg); default: fmt.Println("대기 없음") }</code>을 실행하면 무엇이 출력될까요? (그대로 입력)`,
          prefix: '', suffix: '', accept: ['대기 없음'], placeholder: '출력 결과',
          why: 'ch에 아직 값이 없고 default가 있으므로, 기다리지 않고 바로 "대기 없음"이 출력돼요.',
          hint: 'default가 있으면 준비된 채널이 없을 때 즉시 그쪽으로 넘어가요.'
        };
      }
    },
    {
      id: 'waitGroup',
      title: 'sync.WaitGroup으로 여러 고루틴 기다리기',
      ready: true,
      summary: '여러 개의 고루틴이 모두 끝날 때까지 기다리는 sync.WaitGroup을 배워요.',
      goals: ['Add로 기다릴 개수 등록', 'Done으로 끝났다고 알리기', 'Wait로 다 끝날 때까지 기다리기'],
      blocks: [
        {
          h: '여러 고루틴을 한 번에 기다리기',
          html: `<p><code>wg.Add(1)</code>로 "기다릴 작업이 하나 늘었다"고 등록하고, 각 고루틴이 끝날 때 <code>defer wg.Done()</code>으로 "나 끝났다"고 알려요. <code>wg.Wait()</code>는 등록된 작업이 모두 Done될 때까지 기다려요.</p>`,
          code: {
            label: 'waitgroup_basic.go',
            lang: 'go',
            src: `func main() {
	var wg sync.WaitGroup

	for i := 1; i <= 3; i++ {
		wg.Add(1)
		go func(n int) {
			defer wg.Done()
			fmt.Println("작업", n, "완료")
		}(i)
	}

	wg.Wait()
	fmt.Println("모두 완료!")
}`
          },
          after: `<div class="note"><b>정리</b> — "몇 개를 기다릴지 등록(Add) → 각자 끝나면 알림(Done) → 다 끝날 때까지 대기(Wait)", 이 세 단계가 WaitGroup의 전부예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 8);
          return {
            type: 'blank',
            q: `고루틴 ${n}개를 각각 <code>wg.Add(1)</code>로 등록한 뒤 <code>wg.Wait()</code>를 호출하려고 해요. <code>wg.Add(1)</code>은 총 몇 번 호출해야 할까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `고루틴 개수(${n}개)만큼 Add(1)을 호출해서 "기다릴 작업 수"를 등록해야 해요.`,
            hint: '고루틴 하나당 Add(1) 한 번이 짝을 이뤄요.'
          };
        },
        () => makeChoice(
          '<code>defer wg.Done()</code>처럼 <code>defer</code>를 함께 쓰는 이유는?',
          '고루틴 함수가 어떻게 끝나든(정상 종료든 예외든) 확실하게 Done()이 호출되게 하기 위해', ['Done()을 여러 번 반복 호출하기 위해', 'Add()를 자동으로 호출하기 위해', 'Done()의 실행 속도를 높이기 위해'],
          'defer로 Done()을 예약해두면, 함수 중간에 return이 여러 곳에 있어도 항상 마지막에 Done()이 실행돼요.',
          '"어떻게 끝나든 반드시 실행"이 defer의 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>wg.Wait()</code>가 하는 일을 설명하면? ("Add로 등록한 만큼 Done이 모두 호출될 때까지 기다린다"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['Add로 등록한 만큼 Done이 모두 호출될 때까지 기다린다'], placeholder: '설명',
          why: 'Wait()는 등록된 카운트가 0이 될 때까지(Done이 그만큼 호출될 때까지) 대기해요.',
          hint: 'Add로 늘린 만큼, Done으로 줄어들어서 0이 되어야 Wait가 끝나요.'
        }),
        () => ({
          type: 'code',
          q: '<code>var wg sync.WaitGroup</code>이 있을 때, 고루틴 하나를 등록(<code>Add(1)</code>)하고 시작하되, 고루틴 안에서는 <code>defer wg.Done()</code>으로 완료를 알리고 <code>"작업 완료"</code>를 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'wg.Add(1)\ngo func() {\n\tdefer wg.Done()\n\tfmt.Println("작업 완료")\n}()',
          accept: ['wg.Add(1)\ngo func() {\n\tdefer wg.Done()\n\tfmt.Println("작업 완료")\n}()'],
          why: 'Add(1)로 등록하고, 고루틴 안에서 defer wg.Done()으로 완료를 알려요.',
          hint: 'wg.Add(1) 다음에 go func() { defer wg.Done(); fmt.Println("작업 완료") }()를 쓰세요.'
        }),
      ],
      boss: () => {
        const n = randInt(3, 6);
        return {
          type: 'blank',
          q: `<code>for i := 0; i < ${n}; i++ { wg.Add(1); go func() { defer wg.Done() }() }</code> 다음에 <code>wg.Wait()</code>를 호출했어요. Wait()가 리턴되려면(대기가 끝나려면), Done()이 총 몇 번 호출되어야 할까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
          why: `Add(1)이 ${n}번 호출됐으므로, 그만큼(${n}번) Done()이 호출되어야 카운트가 0이 되어 Wait가 끝나요.`,
          hint: 'Add로 늘어난 만큼 Done으로 줄어야 해요.'
        };
      }
    },
    {
      id: 'mutex',
      title: 'sync.Mutex로 안전하게 공유하기',
      ready: true,
      summary: '여러 고루틴이 동시에 같은 값을 건드릴 때 생기는 문제를, 잠금으로 막는 sync.Mutex를 배워요.',
      goals: ['동시 접근 문제(레이스 컨디션) 이해하기', 'Lock/Unlock으로 한 번에 하나씩만 접근하게 하기', 'defer로 Unlock 잊지 않기'],
      blocks: [
        {
          h: '문제: 여러 고루틴이 동시에 값을 바꾸면',
          html: `<p><code>count++</code>는 사실 "읽고 → 더하고 → 저장"하는 여러 단계라서, 여러 고루틴이 동시에 실행하면 서로의 작업을 덮어써서 최종 값이 예상과 달라질 수 있어요. 이런 문제를 <b>레이스 컨디션</b>이라고 해요.</p>`,
          code: {
            label: 'race_condition.go',
            lang: 'go',
            src: `count := 0
var wg sync.WaitGroup

for i := 0; i < 1000; i++ {
	wg.Add(1)
	go func() {
		defer wg.Done()
		count++ // 여러 고루틴이 동시에 건드려서 값이 꼬일 수 있음
	}()
}
wg.Wait()
fmt.Println(count) // 1000이 안 나올 수도 있음`
          }
        },
        {
          h: '해결: Mutex로 한 번에 하나씩만',
          html: `<p><code>mu.Lock()</code>은 "지금부터 나 혼자만 이 코드를 쓸게"라고 잠그고, <code>mu.Unlock()</code>으로 잠금을 풀어줘요. <code>defer mu.Unlock()</code>을 쓰면 함수가 어떻게 끝나든 잠금을 확실히 풀어줘요.</p>`,
          code: {
            label: 'mutex_basic.go',
            lang: 'go',
            src: `var mu sync.Mutex
count := 0

func increment() {
	mu.Lock()
	defer mu.Unlock()
	count++
}`
          },
          after: `<div class="note"><b>정리</b> — Mutex는 "한 번에 하나의 고루틴만 이 코드를 실행하게" 만들어서, count++ 같은 연산이 서로 꼬이지 않게 지켜줘요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '레이스 컨디션(race condition)이 발생하는 이유는?',
          '여러 고루틴이 동시에 같은 값을 읽고 쓰면서 순서가 꼬이기 때문에', ['고루틴이 너무 적게 실행되어서', 'time.Sleep을 안 써서', '채널을 만들지 않아서'],
          '여러 고루틴이 동시에 count++ 같은 연산을 하면, 서로의 결과를 덮어써서 값이 꼬여요.',
          '"동시에 같은 것을 건드린다"는 게 핵심 원인이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>mu.Lock()</code>과 <code>mu.Unlock()</code> 중, 다른 고루틴이 이 코드를 못 건드리게 잠그는 쪽을 쓰세요.`,
          prefix: '', suffix: '', accept: ['mu.Lock()', 'Lock'], placeholder: '메서드 이름',
          why: '<code>mu.Lock()</code>은 "지금부터 나만 쓸게"라고 잠그는 메서드예요.',
          hint: '"잠그다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>defer mu.Unlock()</code>처럼 defer와 함께 쓰는 이유는?',
          '함수가 어떻게 끝나든(중간에 return해도) 잠금을 확실히 풀어주기 위해', ['Lock()을 여러 번 호출하기 위해', 'Unlock 속도를 높이기 위해', '다른 고루틴이 절대 실행되지 않게 막기 위해'],
          'defer로 Unlock을 예약해두면, 함수 중간에 여러 return이 있어도 항상 마지막에 잠금이 풀려요.',
          '잠금을 안 풀면 다른 고루틴이 영원히 기다리게 될 수도 있어요.'
        ),
        () => ({
          type: 'code',
          q: '<code>var mu sync.Mutex</code>와 <code>count := 0</code>이 있을 때, <code>count</code>를 안전하게 1 늘리는 함수 <code>increment</code>를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'func increment() {\n\tmu.Lock()\n\tdefer mu.Unlock()\n\tcount++\n}',
          accept: ['func increment() {\n\tmu.Lock()\n\tdefer mu.Unlock()\n\tcount++\n}'],
          why: 'Lock으로 잠그고, defer Unlock으로 확실히 풀어준 다음 count를 늘려요.',
          hint: 'func increment() { mu.Lock(); defer mu.Unlock(); count++ } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const goroutineCount = pick([100, 500, 1000]);
        const useMutex = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `${goroutineCount}개의 고루틴이 각각 <code>count++</code>를 실행해요. ${useMutex ? 'mu.Lock()과 mu.Unlock()으로 count++를 보호했어요' : '아무런 보호(Mutex) 없이 count++를 실행했어요'}. 모든 고루틴이 끝난 뒤 <code>count</code>가 정확히 ${goroutineCount}일 것을 확신할 수 있을까요? (예/아니오)`,
          prefix: '', suffix: '', accept: [useMutex ? '예' : '아니오'], placeholder: '예 / 아니오',
          why: useMutex
            ? 'Mutex로 count++를 한 번에 하나씩만 실행되게 보호했으므로, 정확히 원하는 값이 나와요.'
            : '보호 없이 여러 고루틴이 동시에 count++를 하면 레이스 컨디션으로 값이 꼬여서, 정확히 그 값이 나온다고 확신할 수 없어요.',
          hint: 'Mutex 보호가 있는지 없는지가 결과를 신뢰할 수 있는지를 결정해요.'
        };
      }
    },
    {
      id: 'packagesModules',
      title: '패키지와 모듈',
      ready: true,
      summary: 'Go 코드를 나누는 단위인 패키지와, 프로젝트를 관리하는 모듈(go.mod)을 배워요.',
      goals: ['package 선언', 'import로 다른 패키지 쓰기', 'go.mod로 모듈 관리하기'],
      blocks: [
        {
          h: '코드를 나누는 단위: package',
          html: `<p>모든 Go 파일은 맨 위에 <code>package 이름</code>을 적어야 해요. <code>package main</code>은 "이 파일이 실행 가능한 프로그램의 시작점"이라는 특별한 의미를 가져요. <code>import "fmt"</code>처럼 다른 패키지를 가져와서 그 안의 기능(Println 등)을 써요.</p>`,
          code: {
            label: 'package_basic.go',
            lang: 'go',
            src: `package main

import "fmt"

func main() {
	fmt.Println("Hello, World!")
}`,
            out: `Hello, World!`
          }
        },
        {
          h: 'go.mod로 모듈 관리하기',
          html: `<p><code>go.mod</code>는 이 프로젝트의 이름(모듈 경로), 사용하는 Go 버전, 외부 패키지 의존성을 기록하는 파일이에요. <code>go mod init</code> 명령으로 처음 만들고, <code>go get</code>으로 외부 패키지를 추가해요.</p>`,
          code: {
            label: 'go.mod',
            lang: 'go',
            src: `module myproject

go 1.21

require github.com/some/package v1.2.3`
          },
          after: `<div class="note"><b>정리</b> — package는 "코드 파일들의 묶음 단위", 모듈(go.mod)은 "그 묶음들을 포함한 프로젝트 전체의 관리 파일"이에요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `실행 가능한 프로그램의 시작점이 되려면 파일 맨 위에 어떤 package 이름을 적어야 할까요?`,
          prefix: 'package ', suffix: '', accept: ['main'], placeholder: 'package 이름',
          why: '<code>package main</code>은 실행 가능한 프로그램의 시작점이라는 특별한 의미를 가져요.',
          hint: '"주된, 메인"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>import "fmt"</code>가 하는 일로 알맞은 것은?',
          'fmt 패키지 안의 기능(Println 등)을 이 파일에서 쓸 수 있게 가져온다', ['fmt라는 이름의 새 변수를 만든다', '현재 파일을 fmt 형식으로 저장한다', '프로그램을 즉시 실행한다'],
          'import는 다른 패키지의 기능을 현재 파일에서 쓸 수 있게 가져와요.',
          '"가져오다(import)"라는 이름 그대로예요.'
        ),
        () => makeChoice(
          '<code>go.mod</code> 파일이 기록하는 정보로 알맞은 것은?',
          '모듈(프로젝트) 이름, 사용하는 Go 버전, 외부 패키지 의존성', ['각 함수의 실행 시간', '변수의 현재 값', '사용자 로그인 정보'],
          'go.mod는 프로젝트를 식별하는 모듈 경로와 Go 버전, 필요한 외부 패키지 목록을 담아요.',
          '패키지 관리자 파일이라고 생각하면 돼요(다른 언어의 package.json과 비슷해요).'
        ),
        () => ({
          type: 'code',
          q: '<code>fmt</code> 패키지를 가져오는, 실행 가능한 프로그램의 시작 부분(<code>package</code>, <code>import</code>)을 두 줄로 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'package main\n\nimport "fmt"',
          accept: ['package main\n\nimport "fmt"'],
          why: 'package main으로 시작점을 선언하고, import "fmt"로 fmt 패키지를 가져와요.',
          hint: 'package main 다음 줄을 비우고 import "fmt"를 쓰세요.'
        }),
      ],
      boss: () => ({
        type: 'blank',
        q: `<code>go.mod</code>에 <code>module myproject</code>와 <code>go 1.21</code>이 적혀 있어요. 이 파일이 나타내는 것은 무엇일까요? ("이 프로젝트의 이름과 사용하는 Go 버전"이라고 답하세요)`,
        prefix: '', suffix: '', accept: ['이 프로젝트의 이름과 사용하는 Go 버전'], placeholder: '설명',
        why: 'go.mod의 module 줄은 프로젝트(모듈)의 이름을, go 줄은 사용하는 Go 버전을 나타내요.',
        hint: 'module 뒤의 이름과 go 뒤의 숫자가 각각 무엇을 나타내는지 떠올려보세요.'
      })
    },
    {
      id: 'variadicFunctions',
      title: '가변 인자 함수',
      ready: true,
      summary: '개수가 정해지지 않은 인자를 받는 가변 인자 함수를 배워요.',
      goals: ['...타입으로 가변 인자 받기', '함수 안에서 슬라이스처럼 다루기', '슬라이스를 그대로 펼쳐서 넘기기(...)'],
      blocks: [
        {
          h: '개수 상관없이 인자 받기',
          html: `<p><code>매개변수 ...타입</code>으로 선언하면, 그 함수는 그 타입의 값을 몇 개든 받을 수 있어요. 함수 안에서는 <code>[]타입</code> 슬라이스처럼 다뤄요.</p>`,
          code: {
            label: 'variadic_basic.go',
            lang: 'go',
            src: `func sum(nums ...int) int {
	total := 0
	for _, n := range nums {
		total += n
	}
	return total
}

func main() {
	fmt.Println(sum(1, 2, 3))
	fmt.Println(sum(1, 2, 3, 4, 5))
}`,
            out: `6\n15`
          }
        },
        {
          h: '슬라이스를 그대로 펼쳐서 넘기기',
          html: `<p>이미 있는 슬라이스를 가변 인자 함수에 통째로 넘기고 싶으면, 슬라이스 뒤에 <code>...</code>을 붙여요.</p>`,
          code: {
            label: 'variadic_spread.go',
            lang: 'go',
            src: `nums := []int{1, 2, 3}
fmt.Println(sum(nums...))`,
            out: `6`
          },
          after: `<div class="note"><b>정리</b> — 사실 <code>fmt.Println</code> 자체도 가변 인자 함수라서, 값을 몇 개든 넘길 수 있었던 거예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const nums = Array.from({ length: randInt(3, 5) }, () => randInt(1, 15));
          return {
            type: 'blank',
            q: `<code>func sum(nums ...int) int { total := 0; for _, n := range nums { total += n }; return total }</code>일 때, <code>sum(${nums.join(', ')})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(nums.reduce((a, b) => a + b, 0))], placeholder: '숫자',
            why: `${nums.join(' + ')} = ${nums.reduce((a, b) => a + b, 0)}이에요.`,
            hint: '넘긴 모든 값을 다 더해보세요.'
          };
        },
        () => makeChoice(
          '<code>nums ...int</code>처럼 선언된 매개변수의 특징은?',
          '개수 제한 없이 값을 받아서, 함수 안에서 []int 슬라이스처럼 다뤄진다', ['정확히 하나의 값만 받을 수 있다', '문자열만 받을 수 있다', '함수 밖에서는 값을 넘길 수 없다'],
          '...int는 int 값을 몇 개든 받아서 함수 안에서 슬라이스처럼 다룰 수 있게 해줘요.',
          '점 세 개(...)가 "여러 개"를 의미해요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>nums := []int{1, 2, 3}</code>이 있는 슬라이스를 <code>sum</code> 함수에 통째로 펼쳐서 넘기려고 해요. 빈칸을 채우세요.`,
          prefix: 'fmt.Println(sum(nums', suffix: '))', accept: ['...'], placeholder: '기호',
          why: '<code>nums...</code>은 슬라이스의 값들을 낱개로 펼쳐서 가변 인자 함수에 넘겨요.',
          hint: '가변 인자를 나타낼 때 쓰던 그 점 세 개예요.'
        }),
        () => ({
          type: 'code',
          q: '정수를 몇 개든 받아서 모두 곱한 값을 반환하는 가변 인자 함수 <code>product</code>를 작성하세요. (곱은 1부터 시작해서 누적해요)',
          starter: '',
          rows: 6,
          placeholder: 'func product(nums ...int) int {\n\tresult := 1\n\tfor _, n := range nums {\n\t\tresult *= n\n\t}\n\treturn result\n}',
          accept: ['func product(nums ...int) int {\n\tresult := 1\n\tfor _, n := range nums {\n\t\tresult *= n\n\t}\n\treturn result\n}'],
          why: 'result := 1로 시작해서, range로 받은 값들을 하나씩 곱해나가요.',
          hint: 'sum 함수와 구조는 같고, total += n 대신 result *= n을 쓰면 돼요.'
        }),
      ],
      boss: () => {
        const nums = Array.from({ length: 4 }, () => randInt(1, 20));
        return {
          type: 'blank',
          q: `<code>func sum(nums ...int) int { total := 0; for _, n := range nums { total += n }; return total }</code>이고 <code>values := []int{${nums.join(', ')}}</code>일 때, <code>sum(values...)</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(nums.reduce((a, b) => a + b, 0))], placeholder: '숫자',
          why: `슬라이스를 펼쳐서 넘겨도 결과는 같아서, ${nums.join(' + ')} = ${nums.reduce((a, b) => a + b, 0)}이에요.`,
          hint: 'values...로 펼쳐 넘겨도 sum은 각 값을 그대로 더해요.'
        };
      }
    },
    {
      id: 'closures',
      title: '클로저',
      ready: true,
      summary: '자신을 둘러싼 변수를 기억하는 함수, 클로저를 배워요.',
      goals: ['함수를 값처럼 다루기(함수 리터럴)', '클로저가 외부 변수를 기억하는 방식', '카운터 패턴 만들기'],
      blocks: [
        {
          h: '함수를 값으로 다루기',
          html: `<p>Go에서 함수는 변수에 담을 수 있는 값이에요. <code>func(매개변수) 반환타입 { }</code> 형태로 이름 없는 함수(함수 리터럴)를 만들 수 있어요.</p>`,
          code: {
            label: 'function_literal.go',
            lang: 'go',
            src: `add := func(a, b int) int {
	return a + b
}
fmt.Println(add(3, 4))`,
            out: `7`
          }
        },
        {
          h: '외부 변수를 기억하는 함수: 클로저',
          html: `<p><code>makeCounter</code>가 반환하는 함수는 <code>count</code> 변수를 계속 <b>기억</b>해요. 이렇게 자신을 둘러싼 변수를 캡처해서 계속 사용하는 함수를 <b>클로저</b>라고 해요. <code>counter</code>를 호출할 때마다 그 안의 count가 유지된 채로 늘어나요.</p>`,
          code: {
            label: 'closure_counter.go',
            lang: 'go',
            src: `func makeCounter() func() int {
	count := 0
	return func() int {
		count++
		return count
	}
}

func main() {
	counter := makeCounter()
	fmt.Println(counter())
	fmt.Println(counter())
	fmt.Println(counter())
}`,
            out: `1\n2\n3`
          },
          after: `<div class="note"><b>정리</b> — makeCounter를 다시 호출하면, count가 0부터 시작하는 완전히 새로운 클로저가 만들어져요. 서로 다른 counter들은 각자의 count를 따로 기억해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 6);
          return {
            type: 'blank',
            q: `<code>counter := makeCounter()</code>이고 <code>counter()</code>를 ${n}번 연속 호출했어요. 마지막 호출의 반환값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `호출할 때마다 count가 1씩 늘어나므로, ${n}번째 호출에서는 ${n}이 반환돼요.`,
            hint: 'count는 호출할 때마다 1씩 계속 늘어나요.'
          };
        },
        () => makeChoice(
          '클로저(closure)의 특징으로 알맞은 것은?',
          '자신을 둘러싼(외부) 변수를 캡처해서, 함수가 끝난 뒤에도 계속 기억하고 사용할 수 있다', ['항상 매개변수가 없어야 한다', '전역 변수만 사용할 수 있다', '한 번만 호출할 수 있다'],
          'makeCounter가 끝나도, 반환된 함수는 count를 계속 기억하며 이어서 사용해요.',
          '"자신을 둘러싼 환경을 기억한다(closure, 폐쇄)"는 이름 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `두 정수 <code>a</code>, <code>b</code>를 더하는 이름 없는 함수를 만들어 <code>add</code>라는 변수에 담으려고 해요. 빈칸을 채우세요.`,
          prefix: 'add := ', suffix: '(a, b int) int { return a + b }', accept: ['func'], placeholder: '키워드',
          why: '<code>func(a, b int) int { }</code>는 이름 없는 함수(함수 리터럴)를 만드는 문법이에요.',
          hint: '함수를 선언할 때 쓰는 그 키워드예요.'
        }),
        () => ({
          type: 'code',
          q: '호출할 때마다 <code>count</code>를 2씩 늘려서 반환하는 클로저를 만드는 함수 <code>makeStepper</code>를 작성하세요. (makeCounter와 비슷하지만 1이 아니라 2씩 증가)',
          starter: '',
          rows: 6,
          placeholder: 'func makeStepper() func() int {\n\tcount := 0\n\treturn func() int {\n\t\tcount += 2\n\t\treturn count\n\t}\n}',
          accept: ['func makeStepper() func() int {\n\tcount := 0\n\treturn func() int {\n\t\tcount += 2\n\t\treturn count\n\t}\n}'],
          why: 'makeCounter와 같은 구조지만, count += 2로 2씩 늘려요.',
          hint: 'makeCounter의 count++ 대신 count += 2로 바꿔보세요.'
        }),
      ],
      boss: () => {
        const n = randInt(2, 5);
        return {
          type: 'blank',
          q: `<code>func makeCounter() func() int { count := 0; return func() int { count++; return count } }</code>이고, <code>a := makeCounter()</code>, <code>b := makeCounter()</code>를 각각 만든 뒤, <code>a()</code>를 ${n}번 호출하고 <code>b()</code>를 1번 호출했어요. <code>b()</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: ['1'], placeholder: '숫자',
          why: 'a와 b는 makeCounter를 각각 따로 호출해서 만든, 서로 다른 count를 가진 클로저라서 a를 아무리 호출해도 b의 count에는 영향이 없어요. b()를 처음 호출했으니 1이에요.',
          hint: '서로 다른 makeCounter() 호출은 완전히 독립된 count를 가져요.'
        };
      }
    },
    {
      id: 'constantsIota',
      title: '상수와 iota',
      ready: true,
      summary: '절대 안 바뀌는 값을 만드는 const와, 연속된 값을 자동으로 매기는 iota를 배워요.',
      goals: ['const로 상수 선언', 'iota로 자동 증가하는 값 만들기', '요일·상태 같은 열거값 표현하기'],
      blocks: [
        {
          h: '절대 안 바뀌는 값: const',
          html: `<p><code>const</code>로 선언한 값은 프로그램 실행 중에 절대 바뀌지 않아요(<code>var</code>와 달리 재대입이 불가능해요).</p>`,
          code: {
            label: 'const_basic.go',
            lang: 'go',
            src: `const MaxScore = 100
const Pi = 3.14`
          }
        },
        {
          h: '자동으로 늘어나는 값: iota',
          html: `<p><code>iota</code>는 <code>const</code> 블록 안에서 0부터 시작해서, 한 줄마다 1씩 자동으로 늘어나요. 다른 언어의 enum처럼 요일, 상태 같은 "정해진 값들 중 하나"를 표현할 때 자주 써요.</p>`,
          code: {
            label: 'iota_basic.go',
            lang: 'go',
            src: `const (
	Sunday = iota
	Monday
	Tuesday
	Wednesday
)

fmt.Println(Sunday, Monday, Tuesday, Wednesday)`,
            out: `0 1 2 3`
          },
          after: `<div class="note"><b>정리</b> — const 블록 안에서 값을 안 적으면 바로 위 줄과 같은 식(iota)이 이어져서 자동으로 값이 매겨져요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
          const idx = randInt(0, 4);
          return {
            type: 'blank',
            q: `<code>const ( Sunday = iota; Monday; Tuesday; Wednesday; Thursday )</code>일 때, <code>${days[idx]}</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(idx)], placeholder: '숫자',
            why: `iota는 0부터 시작하므로, ${idx}번째(0부터 셈) 항목인 ${days[idx]}는 ${idx}예요.`,
            hint: 'iota는 첫 줄이 0, 그다음 줄부터 1씩 늘어나요.'
          };
        },
        () => makeChoice(
          '<code>iota</code>의 동작으로 알맞은 것은?',
          'const 블록 안에서 0부터 시작해 한 줄마다 자동으로 1씩 늘어난다', ['항상 1부터 시작해서 2씩 늘어난다', 'var 블록에서만 쓸 수 있다', '함수 안에서 호출할 때마다 값이 바뀐다'],
          'iota는 const 블록의 각 줄마다 0, 1, 2, 3...으로 자동 증가해요.',
          '그리스 문자 iota는 "아주 작은 것"이라는 뜻인데, Go에서는 자동 증가 카운터로 쓰여요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>const</code>와 <code>var</code>의 차이를 설명하면? ("const는 재대입이 불가능하고, var는 값을 나중에 바꿀 수 있다"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['const는 재대입이 불가능하고, var는 값을 나중에 바꿀 수 있다'], placeholder: '설명',
          why: 'const로 선언한 값은 프로그램 실행 중 절대 바뀌지 않지만, var로 선언한 값은 나중에 다시 대입할 수 있어요.',
          hint: '"상수(const)"라는 이름처럼, 한 번 정하면 안 바뀌어요.'
        }),
        () => ({
          type: 'code',
          q: '<code>iota</code>를 이용해서 <code>Small</code>, <code>Medium</code>, <code>Large</code> 세 값을 0, 1, 2로 자동 매기는 <code>const</code> 블록을 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'const (\n\tSmall = iota\n\tMedium\n\tLarge\n)',
          accept: ['const (\n\tSmall = iota\n\tMedium\n\tLarge\n)'],
          why: 'const 블록의 첫 줄에 = iota를 쓰면, 그다음 줄부터는 자동으로 1씩 늘어나는 값이 매겨져요.',
          hint: 'const 블록 안에 Small = iota, Medium, Large를 한 줄씩 써보세요.'
        }),
      ],
      boss: () => {
        const names = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
        const idx = randInt(0, 4);
        return {
          type: 'blank',
          q: `<code>const ( Mon = iota; Tue; Wed; Thu; Fri )</code>일 때, <code>${names[idx]} + 10</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(idx + 10)], placeholder: '숫자',
          why: `${names[idx]}는 iota로 ${idx}이고, 여기에 10을 더하면 ${idx + 10}이에요.`,
          hint: '먼저 iota 값을 구한 다음 10을 더해보세요.'
        };
      }
    },
    {
      id: 'stringFormatting',
      title: '문자열 포맷팅',
      ready: true,
      summary: 'fmt 패키지의 서식 동사(%d, %s, %v 등)로 원하는 형태의 문자열을 만드는 법을 배워요.',
      goals: ['Printf와 Sprintf', '자주 쓰는 서식 동사(%d, %s, %f, %v)', '%v로 아무 값이나 출력하기'],
      blocks: [
        {
          h: '서식을 지정해서 출력하기: Printf',
          html: `<p><code>fmt.Printf</code>는 서식 문자열 안의 <code>%d</code>(정수), <code>%s</code>(문자열) 같은 서식 동사 자리에 뒤의 값을 채워서 출력해요.</p>`,
          code: {
            label: 'printf_basic.go',
            lang: 'go',
            src: `name := "지수"
age := 17
fmt.Printf("%s는 %d살입니다\\n", name, age)`,
            out: `지수는 17살입니다`
          }
        },
        {
          h: '문자열로 만들어서 저장하기: Sprintf',
          html: `<p><code>fmt.Sprintf</code>는 <code>Printf</code>와 똑같이 서식을 채우지만, 화면에 출력하는 대신 그 결과를 <b>문자열로 돌려줘요</b>.</p>`,
          code: {
            label: 'sprintf_basic.go',
            lang: 'go',
            src: `message := fmt.Sprintf("%s님, 환영합니다!", name)
fmt.Println(message)`,
            out: `지수님, 환영합니다!`
          },
          after: `<div class="note"><b>정리</b> — <code>%v</code>는 어떤 타입의 값이든 기본 형태로 출력해주는 만능 서식 동사라서, 타입을 정확히 모를 때 자주 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>fmt.Printf("%s는 %d살입니다\\n", "${name}", ${age})</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${name}는 ${age}살입니다`], placeholder: '출력 결과',
            why: `%s 자리에 "${name}", %d 자리에 ${age}가 채워져서 "${name}는 ${age}살입니다"가 돼요.`,
            hint: '%s는 문자열, %d는 정수 자리를 채워요.'
          };
        },
        () => makeChoice(
          '<code>Printf</code>와 <code>Sprintf</code>의 차이로 알맞은 것은?',
          'Printf는 바로 화면에 출력하고, Sprintf는 결과를 문자열로 돌려준다', ['Printf는 숫자만, Sprintf는 문자열만 다룬다', '둘은 완전히 같은 기능이다', 'Sprintf만 서식 동사를 쓸 수 있다'],
          'Sprintf의 "S"는 String을 뜻해요 — 결과를 출력 대신 문자열로 반환해요.',
          '이름 앞의 S가 힌트예요.'
        ),
        () => ({
          type: 'blank',
          q: `타입을 정확히 몰라도 어떤 값이든 기본 형태로 출력해주는 "만능" 서식 동사를 쓰세요.`,
          prefix: 'fmt.Printf("', suffix: '\\n", anyValue)', accept: ['%v'], placeholder: '서식 동사',
          why: '<code>%v</code>는 값의 타입과 상관없이 기본적인 형태로 출력해주는 서식 동사예요.',
          hint: '"값(value)"의 v예요.'
        }),
        () => ({
          type: 'code',
          q: '이름(<code>name</code>, 문자열)과 점수(<code>score</code>, 정수)를 <code>"이름: 점수점"</code> 형태로 출력하는 <code>Printf</code> 코드를 작성하세요.',
          starter: '',
          placeholder: 'fmt.Printf("%s: %d점\\n", name, score)',
          accept: ['fmt.Printf("%s: %d점\\n", name, score)'],
          why: '%s 자리에 name, %d 자리에 score가 채워져요.',
          hint: 'fmt.Printf("%s: %d점\\n", name, score) 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연']);
        const score = randInt(60, 100);
        return {
          type: 'blank',
          q: `<code>message := fmt.Sprintf("%s님의 점수는 %d점입니다", "${name}", ${score})</code>이고 <code>fmt.Println(message)</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`${name}님의 점수는 ${score}점입니다`], placeholder: '출력 결과',
          why: `Sprintf가 만든 문자열 "${name}님의 점수는 ${score}점입니다"가 message에 담기고 그대로 출력돼요.`,
          hint: 'Sprintf도 Printf와 똑같이 서식 동사 자리를 채워요. 다만 출력 대신 문자열로 돌려줘요.'
        };
      }
    },
    {
      id: 'jsonEncoding',
      title: 'JSON 인코딩과 디코딩',
      ready: true,
      summary: '구조체를 JSON 문자열로 바꾸고, 반대로 JSON을 구조체로 되돌리는 방법을 배워요.',
      goals: ['json.Marshal로 구조체를 JSON으로', 'json.Unmarshal로 JSON을 구조체로', '필드 태그로 JSON 키 이름 정하기'],
      blocks: [
        {
          h: '구조체 → JSON: Marshal',
          html: `<p>구조체 필드 옆의 <code>\`json:"name"\`</code> 같은 태그는 JSON으로 바뀔 때 어떤 키 이름을 쓸지 정해줘요. 태그가 없으면 필드 이름 그대로(대문자 시작) 쓰여요.</p>`,
          code: {
            label: 'json_marshal.go',
            lang: 'go',
            src: `type Student struct {
	Name string \`json:"name"\`
	Age  int    \`json:"age"\`
}

func main() {
	s := Student{Name: "지수", Age: 17}
	data, _ := json.Marshal(s)
	fmt.Println(string(data))
}`,
            out: `{"name":"지수","age":17}`
          }
        },
        {
          h: 'JSON → 구조체: Unmarshal',
          html: `<p><code>Unmarshal</code>은 반대로 JSON 문자열을 구조체에 채워 넣어요. <code>&s</code>로 구조체의 주소를 넘겨야, Unmarshal이 그 안의 값을 직접 바꿔 넣을 수 있어요.</p>`,
          code: {
            label: 'json_unmarshal.go',
            lang: 'go',
            src: `data := []byte(\`{"name":"민준","age":16}\`)
var s Student
json.Unmarshal(data, &s)
fmt.Println(s.Name, s.Age)`,
            out: `민준 16`
          },
          after: `<div class="note"><b>정리</b> — Marshal은 "구조체 → JSON", Unmarshal은 "JSON → 구조체"라고 기억하면 헷갈리지 않아요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['지수', '민준', '서연']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>type Student struct { Name string \`json:"name"\`; Age int \`json:"age"\` }</code>이고 <code>s := Student{Name: "${name}", Age: ${age}}</code>일 때, <code>json.Marshal(s)</code>의 결과(문자열)는? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`{"name":"${name}","age":${age}}`], placeholder: '출력 결과',
            why: `json 태그에 정의된 키 이름(name, age)을 써서 {"name":"${name}","age":${age}}가 돼요.`,
            hint: 'json 태그에 적힌 키 이름을 그대로 써요.'
          };
        },
        () => makeChoice(
          '구조체 필드의 <code>\`json:"name"\`</code> 태그가 하는 일은?',
          'JSON으로 변환될 때 그 필드가 어떤 키 이름을 쓸지 정한다', ['그 필드의 값을 자동으로 암호화한다', '그 필드를 JSON 변환에서 제외시킨다', '그 필드의 타입을 문자열로 강제 변환한다'],
          'json 태그는 Marshal/Unmarshal 시 그 필드가 어떤 JSON 키에 대응되는지 정해줘요.',
          '태그가 없으면 Go 필드 이름(대문자 시작)이 그대로 키로 쓰여요.'
        ),
        () => {
          const name = pick(['서연', '도윤']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>data := []byte(\`{"name":"${name}","age":${age}}\`)</code>이고 <code>var s Student; json.Unmarshal(data, &s)</code>를 실행한 뒤 <code>fmt.Println(s.Name, s.Age)</code>를 하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${name} ${age}`], placeholder: '출력 결과',
            why: `Unmarshal이 JSON의 값을 구조체 필드에 채워 넣어서 "${name} ${age}"가 출력돼요.`,
            hint: 'JSON의 name, age 값이 각각 s.Name, s.Age에 채워져요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>Name</code>(string, JSON 키 "name")과 <code>Age</code>(int, JSON 키 "age") 필드를 가지는 구조체 <code>Student</code>를 태그와 함께 정의하세요.',
          starter: '',
          rows: 4,
          placeholder: 'type Student struct {\n\tName string `json:"name"`\n\tAge  int    `json:"age"`\n}',
          accept: ['type Student struct {\n\tName string `json:"name"`\n\tAge  int    `json:"age"`\n}'],
          why: '백틱으로 감싼 json:"키이름" 태그를 필드 타입 뒤에 붙여요.',
          hint: 'type Student struct { Name string `json:"name"` ... } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>type Student struct { Name string \`json:"name"\`; Age int \`json:"age"\` }</code>이고 <code>s := Student{Name: "${name}", Age: ${age}}</code>, <code>data, _ := json.Marshal(s)</code>일 때, <code>string(data)</code>의 값은? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`{"name":"${name}","age":${age}}`], placeholder: '출력 결과',
          why: `json 태그의 키 이름을 그대로 써서 {"name":"${name}","age":${age}}가 돼요.`,
          hint: '태그에 적힌 소문자 키 이름을 그대로 써요.'
        };
      }
    },
    {
      id: 'testing',
      title: '테스트 작성하기',
      ready: true,
      summary: 'Go의 표준 testing 패키지로 함수가 의도대로 동작하는지 확인하는 테스트를 작성해요.',
      goals: ['_test.go 파일과 Test로 시작하는 함수', 't.Errorf로 실패 알리기', '테이블 기반 테스트'],
      blocks: [
        {
          h: '테스트 함수 작성하기',
          html: `<p>테스트 파일은 이름이 <code>_test.go</code>로 끝나야 하고, 테스트 함수는 이름이 <code>Test</code>로 시작하고 <code>*testing.T</code>를 매개변수로 받아야 해요. <code>go test</code> 명령으로 실행하고, 결과가 다르면 <code>t.Errorf</code>로 실패를 알려요.</p>`,
          code: {
            label: 'add_test.go',
            lang: 'go',
            src: `func Add(a, b int) int {
	return a + b
}

func TestAdd(t *testing.T) {
	result := Add(2, 3)
	if result != 5 {
		t.Errorf("Add(2, 3) = %d; 원하는 값은 5", result)
	}
}`
          }
        },
        {
          h: '여러 입력을 한 번에: 테이블 기반 테스트',
          html: `<p>여러 입력·기대값 쌍을 슬라이스로 만들어두고 반복문으로 한 번에 검사하는 방식을 <b>테이블 기반 테스트</b>라고 하며, Go에서 아주 흔하게 쓰는 패턴이에요.</p>`,
          code: {
            label: 'table_test.go',
            lang: 'go',
            src: `func TestAddTable(t *testing.T) {
	cases := []struct{ a, b, want int }{
		{2, 3, 5},
		{0, 0, 0},
		{-1, 1, 0},
	}
	for _, c := range cases {
		if got := Add(c.a, c.b); got != c.want {
			t.Errorf("Add(%d, %d) = %d; 원하는 값은 %d", c.a, c.b, got, c.want)
		}
	}
}`
          },
          after: `<div class="note"><b>정리</b> — t.Errorf는 그 테스트를 "실패"로 표시하지만, panic과 달리 나머지 코드(다른 테스트 케이스)는 계속 진행돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 20), b = randInt(1, 20);
          const wrongExpected = Math.random() < 0.5;
          const expected = wrongExpected ? a + b + randInt(1, 5) : a + b;
          return {
            type: 'blank',
            q: `<code>func Add(a, b int) int { return a + b }</code>이고 <code>func TestAdd(t *testing.T) { result := Add(${a}, ${b}); if result != ${expected} { t.Errorf("실패") } }</code>일 때, 이 테스트는 통과할까요? (통과/실패)`,
            prefix: '', suffix: '', accept: [wrongExpected ? '실패' : '통과'], placeholder: '통과 / 실패',
            why: `${a} + ${b} = ${a + b}이고, 기대값은 ${expected}이므로 ${wrongExpected ? '서로 달라 실패해요.' : '서로 같아 통과해요.'}`,
            hint: '실제 계산 결과와 if문의 비교값이 같은지 확인해보세요.'
          };
        },
        () => makeChoice(
          'Go 테스트 함수의 이름 규칙으로 알맞은 것은?',
          '이름이 Test로 시작하고, *testing.T를 매개변수로 받는다', ['이름이 반드시 소문자로만 이루어져야 한다', '매개변수를 가질 수 없다', '반환값이 반드시 bool이어야 한다'],
          '<code>func TestAdd(t *testing.T)</code>처럼 Test로 시작하고 *testing.T를 받아야 go test가 인식해요.',
          '"Test"로 시작하는 이름이 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `테스트에서 실제 결과가 기대값과 다를 때, 그 테스트를 실패로 표시하며 메시지를 남기는 메서드를 쓰세요.`,
          prefix: 't.', suffix: '("결과가 다릅니다")', accept: ['Errorf'], placeholder: '메서드 이름',
          why: '<code>t.Errorf(...)</code>는 테스트를 실패로 표시하면서 이유를 메시지로 남겨요.',
          hint: '"오류(Error)"를 나타내는 메서드예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>func Multiply(a, b int) int</code> 함수가 <code>Multiply(3, 4)</code>일 때 12를 반환하는지 확인하는 테스트 함수 <code>TestMultiply</code>를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'func TestMultiply(t *testing.T) {\n\tresult := Multiply(3, 4)\n\tif result != 12 {\n\t\tt.Errorf("Multiply(3, 4) = %d; 원하는 값은 12", result)\n\t}\n}',
          accept: ['func TestMultiply(t *testing.T) {\n\tresult := Multiply(3, 4)\n\tif result != 12 {\n\t\tt.Errorf("Multiply(3, 4) = %d; 원하는 값은 12", result)\n\t}\n}'],
          why: '결과를 계산하고, 기대값과 다르면 t.Errorf로 실패를 알려요.',
          hint: 'func TestMultiply(t *testing.T) { result := Multiply(3, 4); if result != 12 { t.Errorf(...) } } 형태를 떠올려보세요.'
        }),
      ],
      boss: () => {
        const cases = Array.from({ length: 3 }, () => ({ a: randInt(1, 10), b: randInt(1, 10) }));
        const wrongIdx = Math.random() < 0.5 ? randInt(0, 2) : -1;
        return {
          type: 'blank',
          q: `테이블 기반 테스트에서 <code>{a: ${cases[0].a}, b: ${cases[0].b}, want: ${cases[0].a + cases[0].b}}</code>, <code>{a: ${cases[1].a}, b: ${cases[1].b}, want: ${cases[1].a + cases[1].b}}</code>, <code>{a: ${cases[2].a}, b: ${cases[2].b}, want: ${wrongIdx === 2 ? cases[2].a + cases[2].b + 1 : cases[2].a + cases[2].b}}</code> 세 케이스를 검사해요(Add 함수는 정상적으로 a+b를 반환해요). t.Errorf가 몇 번 호출될까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [wrongIdx === 2 ? '1' : '0'], placeholder: '숫자',
          why: wrongIdx === 2
            ? '세 번째 케이스의 want 값이 실제 a+b와 다르므로 그 한 번만 t.Errorf가 호출돼요.'
            : '모든 케이스의 want가 실제 a+b와 일치하므로 t.Errorf는 한 번도 호출되지 않아요.',
          hint: '각 케이스의 want가 실제 a+b와 같은지 하나씩 확인해보세요.'
        };
      }
    },
    {
      id: 'generics',
      title: '제네릭',
      ready: true,
      summary: '여러 타입에 대해 똑같이 동작하는 함수를 하나로 만드는 제네릭을 배워요.',
      goals: ['타입 매개변수 [T 제약]', '여러 타입에서 재사용 가능한 함수 만들기', 'any로 아무 타입이나 받기'],
      blocks: [
        {
          h: '타입 매개변수로 여러 타입 지원하기',
          html: `<p><code>[T int | float64]</code>는 "T는 int 또는 float64 타입이어야 한다"는 제약이에요. 제네릭이 없다면 int용, float64용 Max 함수를 따로 만들어야 했어요.</p>`,
          code: {
            label: 'generic_max.go',
            lang: 'go',
            src: `func Max[T int | float64](a, b T) T {
	if a > b {
		return a
	}
	return b
}

func main() {
	fmt.Println(Max(3, 7))
	fmt.Println(Max(1.5, 0.5))
}`,
            out: `7\n1.5`
          }
        },
        {
          h: '아무 타입이나 받기: any',
          html: `<p><code>any</code>는 "어떤 타입이든 상관없다"는, 제약이 없는 제약이에요. 타입에 상관없이 똑같이 동작하는 로직(출력, 개수 세기 등)에 써요.</p>`,
          code: {
            label: 'generic_any.go',
            lang: 'go',
            src: `func PrintSlice[T any](items []T) {
	for _, item := range items {
		fmt.Println(item)
	}
}`
          },
          after: `<div class="note"><b>정리</b> — 제네릭 덕분에, 타입마다 똑같은 함수를 복사해서 여러 번 만드는 중복을 줄일 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 50), b = randInt(1, 50);
          return {
            type: 'blank',
            q: `<code>func Max[T int | float64](a, b T) T { if a > b { return a }; return b }</code>일 때, <code>Max(${a}, ${b})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(Math.max(a, b))], placeholder: '숫자',
            why: `${a}와 ${b} 중 더 큰 값은 ${Math.max(a, b)}예요.`,
            hint: 'a가 b보다 크면 a, 아니면 b를 반환해요.'
          };
        },
        () => makeChoice(
          '제네릭(generics)을 쓰는 주된 이유는?',
          '여러 타입에 대해 똑같이 동작하는 함수를 하나로 만들어 코드 중복을 줄이기 위해', ['프로그램의 실행 속도를 항상 더 빠르게 만들기 위해', '변수를 상수로 만들기 위해', '고루틴을 자동으로 만들기 위해'],
          '제네릭이 없으면 타입마다 거의 똑같은 함수를 따로 만들어야 했어요.',
          '"타입만 다르고 로직은 같은" 함수들을 하나로 합치는 게 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `타입 매개변수에 아무 타입이나 허용하고 싶을 때 쓰는 제약 이름을 쓰세요.`,
          prefix: 'func PrintSlice[T ', suffix: '](items []T) { ... }', accept: ['any'], placeholder: '제약 이름',
          why: '<code>any</code>는 어떤 타입이든 허용하는 제약이에요.',
          hint: '"아무거나, 무엇이든"이라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>int</code> 또는 <code>float64</code> 타입의 두 값 중 더 작은 값을 반환하는 제네릭 함수 <code>Min</code>을 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'func Min[T int | float64](a, b T) T {\n\tif a < b {\n\t\treturn a\n\t}\n\treturn b\n}',
          accept: ['func Min[T int | float64](a, b T) T {\n\tif a < b {\n\t\treturn a\n\t}\n\treturn b\n}'],
          why: 'Max와 구조는 같고, 비교 부등호만 반대로 써요.',
          hint: 'Max 함수에서 > 를 < 로 바꿔보세요.'
        }),
      ],
      boss: () => {
        const nums = [randInt(1, 50), randInt(1, 50), randInt(1, 50)];
        return {
          type: 'blank',
          q: `<code>func Max[T int | float64](a, b T) T { if a > b { return a }; return b }</code>일 때, <code>Max(Max(${nums[0]}, ${nums[1]}), ${nums[2]})</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(Math.max(...nums))], placeholder: '숫자',
          why: `세 값 중 가장 큰 값은 ${Math.max(...nums)}예요. Max를 두 번 이어서 쓰면 세 값 중 최댓값을 구할 수 있어요.`,
          hint: '먼저 안쪽 Max로 두 값의 최댓값을 구한 다음, 그 결과와 나머지 값을 다시 비교해보세요.'
        };
      }
    },
    {
      id: 'embedding',
      title: '임베딩: 구조체 합성',
      ready: true,
      summary: '상속 대신, 구조체 안에 다른 구조체를 넣어서 기능을 재사용하는 임베딩을 배워요.',
      goals: ['구조체 임베딩 문법', '임베딩된 타입의 필드·메서드를 그대로 쓰기', 'Go는 상속 대신 합성을 씀'],
      blocks: [
        {
          h: '구조체 안에 구조체 넣기: 임베딩',
          html: `<p><code>Dog</code> 안에 <code>Animal</code>을 이름 없이(임베딩) 넣으면, <code>Dog</code>는 <code>Animal</code>의 필드(Name)와 메서드(Speak)를 마치 자기 것처럼 바로 쓸 수 있어요. Go에는 클래스 상속이 없고, 이런 "포함(합성)"으로 비슷한 효과를 내요.</p>`,
          code: {
            label: 'embedding_basic.go',
            lang: 'go',
            src: `type Animal struct {
	Name string
}

func (a Animal) Speak() string {
	return a.Name + "가 소리를 냅니다"
}

type Dog struct {
	Animal
	Breed string
}

func main() {
	d := Dog{Animal: Animal{Name: "멍멍이"}, Breed: "진돗개"}
	fmt.Println(d.Speak())
	fmt.Println(d.Name)
}`,
            out: `멍멍이가 소리를 냅니다\n멍멍이`
          },
          after: `<div class="note"><b>정리</b> — <code>Dog</code>가 <code>Animal</code>을 "포함"하고 있어서, <code>d.Name</code>이나 <code>d.Speak()</code>처럼 마치 Dog 자신의 것처럼 바로 접근할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['멍멍이', '나비', '토순이']);
          return {
            type: 'blank',
            q: `<code>type Animal struct { Name string }</code>, <code>func (a Animal) Speak() string { return a.Name + "가 소리를 냅니다" }</code>, <code>type Dog struct { Animal; Breed string }</code>이고 <code>d := Dog{Animal: Animal{Name: "${name}"}}</code>일 때, <code>d.Speak()</code>의 결과는? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${name}가 소리를 냅니다`], placeholder: '결과 문자열',
            why: `Dog는 Animal을 임베딩했으므로 Speak() 메서드를 그대로 물려받아 "${name}가 소리를 냅니다"가 돼요.`,
            hint: '임베딩된 Animal의 메서드를 Dog가 그대로 쓸 수 있어요.'
          };
        },
        () => makeChoice(
          'Go가 다른 언어의 클래스 상속 대신 쓰는 방식은?',
          '구조체 임베딩(합성)으로 다른 타입의 필드·메서드를 포함시킨다', ['extends 키워드로 상속받는다', '인터페이스만으로 모든 것을 대체한다', 'implements 키워드를 쓴다'],
          'Go에는 상속이 없고, 구조체 안에 다른 구조체를 이름 없이 넣는 임베딩으로 비슷한 재사용을 해요.',
          '"포함시킨다(합성)"는 개념이 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>Dog</code>가 <code>Animal</code>을 임베딩했을 때, <code>d.Name</code>처럼 Animal의 필드에 점(.) 하나로 바로 접근할 수 있는 이유를 설명하면? ("Animal이 Dog 안에 이름 없이 포함(임베딩)되어 있기 때문"이라고 답하세요)`,
          prefix: '', suffix: '', accept: ['Animal이 Dog 안에 이름 없이 포함(임베딩)되어 있기 때문'], placeholder: '설명',
          why: '임베딩된 타입의 필드·메서드는 바깥 구조체(Dog)에서 마치 자신의 것처럼 한 단계 점(.)으로 바로 접근할 수 있어요.',
          hint: '이름을 따로 붙이지 않고 타입만 써서 필드로 넣는 게 임베딩이에요.'
        }),
        () => ({
          type: 'code',
          q: '<code>Vehicle</code>(<code>Speed int</code> 필드)을 임베딩하는 <code>Car</code> 구조체를, <code>Brand string</code> 필드도 함께 갖도록 정의하세요.',
          starter: '',
          rows: 4,
          placeholder: 'type Car struct {\n\tVehicle\n\tBrand string\n}',
          accept: ['type Car struct {\n\tVehicle\n\tBrand string\n}'],
          why: '타입 이름(Vehicle)만 필드처럼 적으면 임베딩이 돼요.',
          hint: 'type Car struct { Vehicle\\n\tBrand string } 형태를 떠올려보세요.'
        }),
      ],
      boss: () => {
        const name = pick(['나비', '토순이', '멍멍이']);
        const breed = pick(['페르시안', '진돗개', '토끼']);
        return {
          type: 'blank',
          q: `<code>type Animal struct { Name string }</code>, <code>func (a Animal) Speak() string { return a.Name + "가 소리를 냅니다" }</code>, <code>type Dog struct { Animal; Breed string }</code>이고 <code>d := Dog{Animal: Animal{Name: "${name}"}, Breed: "${breed}"}</code>일 때, <code>d.Name</code>과 <code>d.Breed</code>를 이어붙이면(공백으로 구분)? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`${name} ${breed}`], placeholder: '결과 문자열',
          why: `d.Name은 임베딩된 Animal의 Name("${name}"), d.Breed는 Dog 자신의 필드("${breed}")예요.`,
          hint: 'd.Name은 임베딩된 Animal에서, d.Breed는 Dog 자신에게서 와요.'
        };
      }
    },
    {
      id: 'typeAssertionSwitch',
      title: '타입 단언과 타입 스위치',
      ready: true,
      summary: 'any(빈 인터페이스)에 담긴 값의 실제 타입을 확인하는 타입 단언과 타입 스위치를 배워요.',
      goals: ['value.(타입)으로 타입 단언하기', '두 번째 반환값으로 안전하게 확인하기', 'switch v.(type)으로 여러 타입 분기하기'],
      blocks: [
        {
          h: '타입 단언: value.(타입)',
          html: `<p><code>any</code> 타입 변수에 실제로 어떤 타입의 값이 들었는지 안다면, <code>.(타입)</code>으로 꺼내 쓸 수 있어요. 실제 타입이 다르면 프로그램이 패닉(오류)을 일으켜요.</p>`,
          code: {
            label: 'type_assert_basic.go',
            lang: 'go',
            src: `var i any = "안녕"
s := i.(string)
fmt.Println(s)`,
            out: `안녕`
          }
        },
        {
          h: '안전하게 확인하기: 두 번째 반환값',
          html: `<p><code>s, ok := i.(타입)</code>처럼 두 번째 값을 받으면, 실패해도 패닉 대신 <code>ok</code>가 <code>false</code>로 나와요(안전한 방식).</p>`,
          code: {
            label: 'type_assert_ok.go',
            lang: 'go',
            src: `var i any = 42
s, ok := i.(string)
fmt.Println(s, ok)`,
            out: ` false`
          }
        },
        {
          h: '여러 타입을 한 번에: switch v.(type)',
          html: `<p><code>switch v := i.(type)</code>은 i의 실제 타입에 따라 case를 나눠서 처리할 수 있게 해줘요.</p>`,
          code: {
            label: 'type_switch.go',
            lang: 'go',
            src: `func describe(i any) {
	switch v := i.(type) {
	case string:
		fmt.Println("문자열:", v)
	case int:
		fmt.Println("정수:", v)
	default:
		fmt.Println("알 수 없는 타입")
	}
}`
          },
          after: `<div class="note"><b>정리</b> — 확실할 때는 <code>i.(타입)</code>, 실패할 수도 있을 때는 <code>s, ok := i.(타입)</code>, 여러 타입을 나눠 처리할 때는 <code>switch v := i.(type)</code>을 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const isString = Math.random() < 0.5;
          const val = isString ? pick(['안녕', '반가워']) : randInt(1, 100);
          return {
            type: 'blank',
            q: `<code>var i any = ${isString ? `"${val}"` : val}</code>이고 <code>s, ok := i.(string)</code>일 때, <code>ok</code>의 값은? (참/거짓)`,
            prefix: '', suffix: '', accept: isString ? ['true', '참'] : ['false', '거짓'], placeholder: 'true / false',
            why: isString
              ? `i에 실제로 문자열이 들어있으므로 ok는 true예요.`
              : `i에 실제로는 정수가 들어있어서 string으로의 단언이 실패하여 ok는 false예요.`,
            hint: 'ok는 실제 타입과 단언한 타입이 일치하는지를 알려줘요.'
          };
        },
        () => makeChoice(
          '<code>s, ok := i.(string)</code>처럼 두 번째 값을 받는 타입 단언의 특징은?',
          '타입이 맞지 않아도 패닉 없이, ok가 false로 안전하게 알려준다', ['타입이 안 맞으면 항상 프로그램이 즉시 멈춘다', 'ok는 항상 true만 반환한다', '이 방식은 string에만 쓸 수 있다'],
          '두 번째 반환값(ok)을 받으면, 단언이 실패해도 패닉 대신 false로 안전하게 처리할 수 있어요.',
          '반면 <code>s := i.(string)</code>처럼 하나만 받으면 실패 시 패닉이 나요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>switch v := i.(type) { case string: ... case int: ... }</code>이 하는 일을 설명하면? ("i의 실제 타입에 따라 다른 case를 실행한다"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['i의 실제 타입에 따라 다른 case를 실행한다'], placeholder: '설명',
          why: '타입 스위치는 i에 들어있는 값의 실제 타입을 확인해서, 그에 맞는 case를 실행해요.',
          hint: '보통의 switch는 값을 비교하지만, 이건 "타입"을 비교해요.'
        }),
        () => ({
          type: 'code',
          q: '<code>any</code> 타입 변수 <code>i</code>를 <code>string</code>으로 안전하게 단언해서 <code>s</code>와 <code>ok</code>에 담는 코드를 한 줄로 작성하세요.',
          starter: '',
          placeholder: 's, ok := i.(string)',
          accept: ['s, ok := i.(string)'],
          why: '두 번째 값(ok)을 받으면 실패해도 패닉 없이 안전하게 처리돼요.',
          hint: 's, ok := i.(string) 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const kind = pick(['string', 'int']);
        const val = kind === 'string' ? pick(['안녕', '반가워']) : randInt(1, 100);
        const display = kind === 'string' ? `문자열: ${val}` : `정수: ${val}`;
        return {
          type: 'blank',
          q: `<code>func describe(i any) { switch v := i.(type) { case string: fmt.Println("문자열:", v); case int: fmt.Println("정수:", v); default: fmt.Println("알 수 없는 타입") } }</code>이고 <code>describe(${kind === 'string' ? `"${val}"` : val})</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [display], placeholder: '출력 결과',
          why: `i의 실제 타입이 ${kind}이므로 해당 case가 실행되어 "${display}"가 출력돼요.`,
          hint: '넘긴 값의 실제 타입에 맞는 case를 찾아보세요.'
        };
      }
    },
    {
      id: 'fileIO',
      title: '파일 입출력',
      ready: true,
      summary: 'os 패키지로 파일을 읽고 쓰는 기본적인 방법을 배워요.',
      goals: ['os.WriteFile로 파일 쓰기', 'os.ReadFile로 파일 읽기', '에러 처리와 함께 다루기'],
      blocks: [
        {
          h: '파일 쓰기: os.WriteFile',
          html: `<p><code>os.WriteFile(경로, 내용, 권한)</code>으로 파일을 만들어요. 내용은 <code>[]byte</code> 형태여야 하고, <code>0644</code>는 파일 권한(소유자는 읽기·쓰기, 나머지는 읽기만)을 나타내는 흔한 값이에요.</p>`,
          code: {
            label: 'write_file.go',
            lang: 'go',
            src: `err := os.WriteFile("data.txt", []byte("안녕하세요"), 0644)
if err != nil {
	fmt.Println("쓰기 실패:", err)
}`
          }
        },
        {
          h: '파일 읽기: os.ReadFile',
          html: `<p><code>os.ReadFile</code>은 파일 전체 내용을 <code>[]byte</code>로 돌려줘요. 문자열로 보려면 <code>string(data)</code>로 변환해요.</p>`,
          code: {
            label: 'read_file.go',
            lang: 'go',
            src: `data, err := os.ReadFile("data.txt")
if err != nil {
	fmt.Println("읽기 실패:", err)
	return
}
fmt.Println(string(data))`,
            out: `안녕하세요`
          },
          after: `<div class="note"><b>정리</b> — Go의 파일 함수들은 거의 항상 마지막(또는 두 번째) 반환값으로 error를 주기 때문에, if err != nil로 확인하는 습관이 중요해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const content = pick(['안녕하세요', '반갑습니다', '좋은 하루']);
          return {
            type: 'blank',
            q: `<code>os.WriteFile("data.txt", []byte("${content}"), 0644)</code>로 쓴 뒤, <code>data, _ := os.ReadFile("data.txt"); fmt.Println(string(data))</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [content], placeholder: '출력 결과',
            why: `쓴 내용을 그대로 다시 읽어오므로 "${content}"가 출력돼요.`,
            hint: 'WriteFile로 쓴 내용을 ReadFile이 그대로 돌려줘요.'
          };
        },
        () => makeChoice(
          '<code>os.WriteFile("data.txt", []byte("내용"), 0644)</code>에서 <code>0644</code>가 나타내는 것은?',
          '파일의 접근 권한(누가 읽고 쓸 수 있는지)', ['파일의 크기(바이트)', '파일을 몇 번 쓸지', '파일이 만들어질 시간'],
          '0644는 소유자는 읽기·쓰기, 그 외에는 읽기만 가능한 흔한 파일 권한 값이에요.',
          '유닉스 계열에서 흔히 보는 파일 권한 숫자예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>os.ReadFile</code>이 돌려주는 <code>[]byte</code>를 문자열로 바꾸는 방법을 쓰세요.`,
          prefix: '', suffix: '(data)', accept: ['string'], placeholder: '변환 방법',
          why: '<code>string(data)</code>는 []byte를 문자열로 변환해요.',
          hint: '원하는 타입 이름을 함수처럼 괄호와 함께 써서 변환해요.'
        }),
        () => ({
          type: 'code',
          q: '"log.txt" 파일에 "기록됨"이라는 내용을 쓰는 코드를 작성하세요. (권한은 0644, 에러는 무시해도 됩니다: _)',
          starter: '',
          placeholder: 'os.WriteFile("log.txt", []byte("기록됨"), 0644)',
          accept: ['os.WriteFile("log.txt", []byte("기록됨"), 0644)'],
          why: 'os.WriteFile(경로, []byte(내용), 권한) 형태로 파일에 내용을 써요.',
          hint: 'os.WriteFile("log.txt", []byte("기록됨"), 0644) 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const content = pick(['완료', '성공', '저장됨']);
        return {
          type: 'blank',
          q: `<code>os.WriteFile("status.txt", []byte("${content}"), 0644)</code>로 쓴 뒤, <code>data, err := os.ReadFile("status.txt")</code>를 실행했어요. <code>err</code>는 nil일까요, 아닐까요? (nil / not nil)`,
          prefix: '', suffix: '', accept: ['nil'], placeholder: 'nil / not nil',
          why: '방금 정상적으로 쓴 파일을 바로 읽는 것이므로 오류 없이 성공해서 err는 nil이에요.',
          hint: '파일이 실제로 존재하고 정상적으로 쓰였다면 읽기도 성공해요.'
        };
      }
    },
    {
      id: 'httpServer',
      title: 'HTTP 서버 기초',
      ready: true,
      summary: 'net/http 패키지로 아주 간단한 웹 서버를 만드는 법을 배워요.',
      goals: ['http.HandleFunc로 경로별 처리 함수 등록', 'http.ListenAndServe로 서버 시작', 'ResponseWriter로 응답 쓰기'],
      blocks: [
        {
          h: '요청 처리 함수 등록하기',
          html: `<p><code>http.HandleFunc(경로, 함수)</code>로 "이 경로에 요청이 오면 이 함수를 실행해라"고 등록해요. <code>http.ListenAndServe(":8080", nil)</code>로 8080번 포트에서 서버를 시작하고 요청을 기다려요.</p>`,
          code: {
            label: 'http_server.go',
            lang: 'go',
            src: `func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "안녕하세요!")
}

func main() {
	http.HandleFunc("/hello", helloHandler)
	http.ListenAndServe(":8080", nil)
}`
          },
          after: `<div class="note"><b>정리</b> — <code>ResponseWriter</code>(보통 w)는 브라우저(요청을 보낸 쪽)에게 돌려줄 응답을 쓰는 대상이에요. <code>fmt.Fprintln(w, ...)</code>처럼 w에 직접 출력하면 그게 응답 내용이 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const path = pick(['/hello', '/greet', '/welcome']);
          return {
            type: 'blank',
            q: `<code>http.HandleFunc("${path}", helloHandler)</code>가 있을 때, 어떤 경로로 요청이 오면 <code>helloHandler</code>가 실행될까요?`,
            prefix: '', suffix: '', accept: [path], placeholder: '경로',
            why: `HandleFunc의 첫 번째 인자("${path}")가 이 함수가 실행될 경로예요.`,
            hint: 'HandleFunc(경로, 함수)에서 첫 번째 인자가 경로예요.'
          };
        },
        () => makeChoice(
          '<code>http.HandleFunc(경로, 함수)</code>의 역할은?',
          '특정 경로로 요청이 오면 지정한 함수가 실행되도록 등록한다', ['서버를 즉시 종료한다', '경로를 데이터베이스에 저장한다', '함수를 고루틴으로 실행한다'],
          'HandleFunc는 "이 경로엔 이 함수"라는 라우팅 규칙을 등록해요.',
          '경로와 함수를 짝지어 등록한다는 게 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `핸들러 함수의 매개변수 중, 브라우저에게 돌려줄 응답을 쓰는 대상을 부르는 타입 이름을 쓰세요.`,
          prefix: 'func helloHandler(w http.', suffix: ', r *http.Request) { ... }', accept: ['ResponseWriter'], placeholder: '타입 이름',
          why: '<code>http.ResponseWriter</code>는 응답 내용을 쓰는 대상이에요.',
          hint: '"응답(response)"을 "쓰는(writer)" 것이라는 이름 그대로예요.'
        }),
        () => ({
          type: 'code',
          q: '"/ping" 경로에 요청이 오면 <code>"pong"</code>을 응답으로 쓰는 핸들러 함수 <code>pingHandler</code>를 작성하세요. (함수 정의만)',
          starter: '',
          rows: 3,
          placeholder: 'func pingHandler(w http.ResponseWriter, r *http.Request) {\n\tfmt.Fprintln(w, "pong")\n}',
          accept: ['func pingHandler(w http.ResponseWriter, r *http.Request) {\n\tfmt.Fprintln(w, "pong")\n}'],
          why: 'ResponseWriter(w)에 fmt.Fprintln으로 응답 내용을 써요.',
          hint: 'func pingHandler(w http.ResponseWriter, r *http.Request) { fmt.Fprintln(w, "pong") } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const path = pick(['/status', '/health', '/version']);
        const msg = pick(['OK', 'v1.0', '정상']);
        return {
          type: 'blank',
          q: `<code>http.HandleFunc("${path}", func(w http.ResponseWriter, r *http.Request) { fmt.Fprintln(w, "${msg}") })</code>가 등록되어 있어요. <code>${path}</code>로 요청이 오면 응답 내용은 무엇일까요? (그대로 입력)`,
          prefix: '', suffix: '', accept: [msg], placeholder: '응답 내용',
          why: `등록된 핸들러가 ResponseWriter에 "${msg}"를 쓰므로 그게 응답 내용이 돼요.`,
          hint: '핸들러 함수 안에서 w에 쓰는 내용이 곧 응답이에요.'
        };
      }
    },
    {
      id: 'contextPackage',
      title: 'context 패키지',
      ready: true,
      summary: '작업을 취소하거나 시간제한을 두는 데 쓰는 context를 배워요.',
      goals: ['context.Context가 하는 일', 'context.WithTimeout으로 시간제한 걸기', 'ctx.Done()으로 취소 신호 확인하기'],
      blocks: [
        {
          h: '시간제한 걸기: context.WithTimeout',
          html: `<p><code>context.Background()</code>는 아무 설정도 없는 가장 기본적인 컨텍스트예요. <code>WithTimeout</code>은 그 컨텍스트에 "일정 시간 뒤 자동으로 취소된다"는 시간제한을 추가해요. 반환된 <code>cancel</code> 함수는 직접 취소하고 싶을 때 부르는 함수로, defer로 항상 불러주는 게 좋아요.</p>`,
          code: {
            label: 'context_timeout.go',
            lang: 'go',
            src: `ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)
defer cancel()`
          }
        },
        {
          h: '취소 신호 확인하기: ctx.Done()',
          html: `<p><code>ctx.Done()</code>은 컨텍스트가 취소되거나 시간이 다 되면 값이 오는 채널이에요. <code>select</code>로 "결과가 먼저 오는지, 취소가 먼저 오는지"를 동시에 지켜볼 수 있어요.</p>`,
          code: {
            label: 'context_done.go',
            lang: 'go',
            src: `select {
case <-ctx.Done():
	fmt.Println("작업이 취소되었어요:", ctx.Err())
case result := <-resultCh:
	fmt.Println("결과:", result)
}`
          },
          after: `<div class="note"><b>정리</b> — context는 "이 작업, 언제까지 기다릴지"와 "취소됐는지 어떻게 알지"를 표준화된 방식으로 다루게 해줘요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>context.WithTimeout(context.Background(), 2*time.Second)</code>의 역할은?',
          '2초가 지나면 자동으로 취소되는 컨텍스트를 만든다', ['2초마다 반복 실행되는 작업을 만든다', '2초 동안 프로그램을 멈춘다', '2초 뒤에 프로그램을 종료한다'],
          'WithTimeout은 지정한 시간이 지나면 자동으로 취소 신호를 보내는 컨텍스트를 만들어요.',
          '"시간제한(timeout)을 가진(with)"이라는 이름 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>ctx, cancel := context.WithTimeout(...)</code> 다음 줄에 흔히 <code>defer cancel()</code>을 쓰는 이유를 설명하면? ("함수가 끝날 때 컨텍스트 관련 자원을 확실히 정리하기 위해"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['함수가 끝날 때 컨텍스트 관련 자원을 확실히 정리하기 위해'], placeholder: '설명',
          why: 'cancel을 부르지 않고 방치하면, 타임아웃 전까지 관련 자원이 계속 남아있을 수 있어서, defer로 확실히 정리해요.',
          hint: '다른 defer 자원 정리 패턴(파일 닫기 등)과 같은 이유예요.'
        }),
        () => makeChoice(
          '<code>ctx.Done()</code>이 하는 일로 알맞은 것은?',
          '컨텍스트가 취소되거나 시간이 다 되면 값이 오는 채널을 돌려준다', ['컨텍스트를 즉시 삭제한다', '남은 시간을 숫자로 돌려준다', '항상 nil을 반환한다'],
          'Done()은 채널을 돌려주는데, 취소/타임아웃 시점에 그 채널에서 값을 받을 수 있게 돼요.',
          'select와 함께 <-ctx.Done() 형태로 자주 써요.'
        ),
        () => ({
          type: 'code',
          q: '<code>context.Background()</code>를 기반으로, 3초 뒤 자동 취소되는 컨텍스트 <code>ctx</code>와 <code>cancel</code> 함수를 만들고, <code>defer cancel()</code>을 호출하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)\ndefer cancel()',
          accept: ['ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)\ndefer cancel()'],
          why: 'WithTimeout으로 3초 시간제한 컨텍스트를 만들고, defer로 cancel을 예약해요.',
          hint: 'context.WithTimeout(context.Background(), 3*time.Second) 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const seconds = pick([1, 2, 5]);
        return {
          type: 'blank',
          q: `<code>ctx, cancel := context.WithTimeout(context.Background(), ${seconds}*time.Second)</code>이고 <code>select { case <-ctx.Done(): fmt.Println("취소됨"); case result := <-resultCh: fmt.Println(result) }</code>인데, 작업이 ${seconds + 10}초가 걸려야 끝나요(resultCh는 그때까지 안 옴). 무엇이 출력될까요? (그대로 입력)`,
          prefix: '', suffix: '', accept: ['취소됨'], placeholder: '출력 결과',
          why: `작업이 끝나기(${seconds + 10}초) 전에 타임아웃(${seconds}초)이 먼저 오므로 ctx.Done()이 먼저 반응해서 "취소됨"이 출력돼요.`,
          hint: '타임아웃 시간과 작업이 걸리는 시간 중 어느 것이 더 짧은지 비교해보세요.'
        };
      }
    },
    {
      id: 'sortPackage',
      title: '정렬: sort 패키지',
      ready: true,
      summary: '슬라이스를 정렬하는 sort 패키지의 기본 사용법을 배워요.',
      goals: ['sort.Ints/sort.Strings로 기본 정렬', 'sort.Slice로 커스텀 기준 정렬', '오름차순·내림차순'],
      blocks: [
        {
          h: '기본 정렬: sort.Ints',
          html: `<p><code>sort.Ints(슬라이스)</code>는 정수 슬라이스를 오름차순으로, 그 자리에서(원본을 직접 바꿔서) 정렬해요.</p>`,
          code: {
            label: 'sort_ints.go',
            lang: 'go',
            src: `nums := []int{5, 2, 8, 1}
sort.Ints(nums)
fmt.Println(nums)`,
            out: `[1 2 5 8]`
          }
        },
        {
          h: '원하는 기준으로 정렬: sort.Slice',
          html: `<p><code>sort.Slice(슬라이스, 비교함수)</code>에서 비교 함수가 "i번째가 j번째보다 먼저 와야 하면 true"를 반환하게 만들면, 원하는 기준으로 정렬할 수 있어요.</p>`,
          code: {
            label: 'sort_slice.go',
            lang: 'go',
            src: `type Student struct {
	Name  string
	Score int
}

students := []Student{{"지수", 90}, {"민준", 85}, {"서연", 95}}
sort.Slice(students, func(i, j int) bool {
	return students[i].Score > students[j].Score
})
fmt.Println(students[0].Name)`,
            out: `서연`
          },
          after: `<div class="note"><b>정리</b> — 비교 함수에서 <code>&gt;</code>를 쓰면 내림차순(큰 값 먼저), <code>&lt;</code>를 쓰면 오름차순(작은 값 먼저)이 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const nums = Array.from({ length: 4 }, () => randInt(1, 50));
          const sorted = [...nums].sort((a, b) => a - b);
          return {
            type: 'blank',
            q: `<code>nums := []int{${nums.join(', ')}}</code>이고 <code>sort.Ints(nums)</code>를 실행한 뒤 <code>fmt.Println(nums)</code>를 하면? (그대로 입력, 예: [1 2 3])`,
            prefix: '', suffix: '', accept: [`[${sorted.join(' ')}]`], placeholder: '출력 결과',
            why: `오름차순으로 정렬하면 [${sorted.join(' ')}]가 돼요.`,
            hint: 'sort.Ints는 작은 값부터 큰 값 순서로 정렬해요.'
          };
        },
        () => makeChoice(
          '<code>sort.Slice(students, func(i, j int) bool { return students[i].Score > students[j].Score })</code>이 만드는 정렬 순서는?',
          'Score가 높은 학생부터 낮은 학생 순서(내림차순)', ['Score가 낮은 학생부터 높은 학생 순서(오름차순)', '이름의 가나다 순서', '원래 순서 그대로(정렬 안 됨)'],
          '비교 함수가 i번째의 Score가 j번째보다 크면 true를 반환하므로, Score가 높은 게 먼저 오는 내림차순이에요.',
          '&gt; 부등호는 "더 큰 값이 앞에 온다"는 뜻이에요.'
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
            q: `<code>students := []Student{{"${students[0].name}", ${students[0].score}}, {"${students[1].name}", ${students[1].score}}, {"${students[2].name}", ${students[2].score}}}</code>를 Score 내림차순으로 정렬하면, <code>students[0].Name</code>은? (그대로 입력)`,
            prefix: '', suffix: '', accept: [top.name], placeholder: '이름',
            why: `Score가 가장 높은 "${top.name}"(${top.score}점)이 맨 앞에 와요.`,
            hint: '세 명 중 Score가 가장 높은 사람을 찾아보세요.'
          };
        },
        () => ({
          type: 'code',
          q: '정수 슬라이스 <code>nums</code>를 오름차순으로 정렬하는 코드를 한 줄로 작성하세요.',
          starter: '',
          placeholder: 'sort.Ints(nums)',
          accept: ['sort.Ints(nums)'],
          why: 'sort.Ints(슬라이스)는 정수 슬라이스를 오름차순으로 정렬해요.',
          hint: 'sort.Ints(nums) 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const nums = Array.from({ length: 5 }, () => randInt(1, 100));
        const sorted = [...nums].sort((a, b) => b - a);
        return {
          type: 'blank',
          q: `<code>nums := []int{${nums.join(', ')}}</code>이고 <code>sort.Slice(nums, func(i, j int) bool { return nums[i] > nums[j] })</code>를 실행한 뒤 <code>nums[0]</code>은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(sorted[0])], placeholder: '숫자',
          why: `내림차순 정렬이므로 가장 큰 값 ${sorted[0]}이 맨 앞에 와요.`,
          hint: '&gt;를 쓰면 큰 값이 앞으로 오는 정렬이에요.'
        };
      }
    },
    {
      id: 'customErrors',
      title: '커스텀 에러와 에러 감싸기',
      ready: true,
      summary: '나만의 에러에 맥락을 덧붙이고(%w), 감싸진 에러를 확인하는 방법(errors.Is)을 배워요.',
      goals: ['errors.New와 fmt.Errorf', '%w로 에러 감싸기(wrapping)', 'errors.Is로 감싸진 에러 확인하기'],
      blocks: [
        {
          h: '에러에 맥락 덧붙이기: %w',
          html: `<p><code>%w</code>는 원본 에러를 "감싸서" 새 에러를 만들어요. 겉으로는 더 자세한 메시지를 보여주면서도, 안에는 원본 에러 정보가 그대로 남아있어요.</p>`,
          code: {
            label: 'error_wrap.go',
            lang: 'go',
            src: `func loadConfig() error {
	err := errors.New("파일을 찾을 수 없어요")
	return fmt.Errorf("설정 불러오기 실패: %w", err)
}`
          }
        },
        {
          h: '감싸진 에러 확인하기: errors.Is',
          html: `<p><code>errors.Is</code>는 감싸진 에러 체인을 따라가면서 "이 에러 안에 그 원본 에러가 들어있는지" 확인해줘요. 그냥 <code>==</code>로 비교하면 감싸진 에러라서 다르다고 나와요.</p>`,
          code: {
            label: 'errors_is.go',
            lang: 'go',
            src: `originalErr := errors.New("파일 없음")
wrappedErr := fmt.Errorf("설정 실패: %w", originalErr)

fmt.Println(errors.Is(wrappedErr, originalErr))`,
            out: `true`
          },
          after: `<div class="note"><b>정리</b> — %w로 감싼 에러는 겉모습(메시지)이 바뀌어도, errors.Is로 "원래 이 에러였는지"를 계속 확인할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>original := errors.New("원본 오류")</code>이고 <code>wrapped := fmt.Errorf("맥락: %w", original)</code>일 때, <code>errors.Is(wrapped, original)</code>의 결과는? (참/거짓)`,
          prefix: '', suffix: '', accept: ['true', '참'], placeholder: 'true / false',
          why: '%w로 감싼 에러는 errors.Is로 확인하면 원본 에러를 포함하고 있다고 true가 나와요.',
          hint: '%w로 감쌌다면 errors.Is는 항상 그 원본을 찾아낼 수 있어요.'
        }),
        () => makeChoice(
          '<code>fmt.Errorf("...: %w", err)</code>에서 <code>%w</code>의 역할은?',
          '원본 에러(err)를 감싸서, 더 자세한 메시지를 가진 새 에러를 만들되 원본 정보를 유지한다', ['에러 메시지에서 원본 정보를 완전히 지운다', '에러를 문자열이 아닌 숫자로 바꾼다', '에러 발생 시간을 기록한다'],
          '%w는 원본 에러를 감싸서, errors.Is/errors.As로 나중에 다시 확인할 수 있게 해줘요.',
          '"감싸다(wrap)"의 w예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>errors.Is(감싸진에러, 원본에러)</code>가 하는 일을 설명하면? ("감싸진 에러 체인 안에 그 원본 에러가 들어있는지 확인한다"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['감싸진 에러 체인 안에 그 원본 에러가 들어있는지 확인한다'], placeholder: '설명',
          why: 'errors.Is는 감싸고 감싼 에러들의 체인을 따라가며 원본 에러를 찾아 비교해줘요.',
          hint: '단순 == 비교와 달리, 감싸진 에러도 알아볼 수 있어요.'
        }),
        () => ({
          type: 'code',
          q: '<code>err</code>(기존 에러)를 감싸서, <code>"작업 실패: "</code>라는 맥락을 덧붙인 새 에러를 반환하는 코드를 한 줄로 작성하세요.',
          starter: '',
          placeholder: 'return fmt.Errorf("작업 실패: %w", err)',
          accept: ['return fmt.Errorf("작업 실패: %w", err)'],
          why: 'fmt.Errorf에 %w로 원본 에러(err)를 감싸서 새 에러를 만들어요.',
          hint: 'return fmt.Errorf("작업 실패: %w", err) 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const msg = pick(['연결 실패', '권한 없음', '시간 초과']);
        return {
          type: 'blank',
          q: `<code>original := errors.New("${msg}")</code>, <code>wrapped1 := fmt.Errorf("1단계: %w", original)</code>, <code>wrapped2 := fmt.Errorf("2단계: %w", wrapped1)</code>일 때, <code>errors.Is(wrapped2, original)</code>의 결과는? (참/거짓)`,
          prefix: '', suffix: '', accept: ['true', '참'], placeholder: 'true / false',
          why: '여러 번 감싸도 errors.Is는 체인을 끝까지 따라가서 원본 에러를 찾아내므로 true예요.',
          hint: '몇 번을 감싸도 errors.Is는 결국 원본까지 확인할 수 있어요.'
        };
      }
    },
    {
      id: 'workerPool',
      title: '워커 풀 패턴',
      ready: true,
      summary: '정해진 개수의 고루틴이 작업 큐를 나눠 처리하는 워커 풀 패턴을 배워요.',
      goals: ['작업을 채널에 쌓아두기', '고정된 수의 워커가 채널에서 꺼내 처리', '결과를 다른 채널로 모으기'],
      blocks: [
        {
          h: '작업 채널과 워커',
          html: `<p><code>&lt;-chan int</code>는 "받기 전용" 채널, <code>chan&lt;- int</code>는 "보내기 전용" 채널을 뜻해요(타입에서 의도를 드러내요). 워커 3개가 작업 5개를 나눠서 동시에 처리해요.</p>`,
          code: {
            label: 'worker_pool.go',
            lang: 'go',
            src: `func worker(id int, jobs <-chan int, results chan<- int) {
	for j := range jobs {
		results <- j * 2
	}
}

func main() {
	jobs := make(chan int, 5)
	results := make(chan int, 5)

	for w := 1; w <= 3; w++ {
		go worker(w, jobs, results)
	}

	for j := 1; j <= 5; j++ {
		jobs <- j
	}
	close(jobs)

	for i := 0; i < 5; i++ {
		fmt.Println(<-results)
	}
}`
          },
          after: `<div class="note"><b>정리</b> — <code>close(jobs)</code>로 "더 이상 작업이 없다"고 알려야, 워커들이 <code>for range jobs</code>를 끝내고 종료할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '워커 풀(worker pool) 패턴의 목적으로 알맞은 것은?',
          '정해진 수의 고루틴이 작업 큐를 나눠서 동시에 처리하게 한다', ['고루틴을 하나만 만들어 순서대로 처리한다', '작업을 채널 없이 직접 함수로 호출한다', '메모리 사용량을 늘려서 속도를 높인다'],
          '워커 풀은 워커 개수를 제한하면서도, 여러 작업을 동시에 처리할 수 있게 해줘요.',
          '"일꾼(worker)이 여러 명(pool)"이라는 이름 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>jobs &lt;-chan int</code>와 <code>results chan&lt;- int</code> 중, "값을 보내기만 할 수 있는(보내기 전용)" 채널의 문법을 쓰세요.`,
          prefix: '', suffix: '', accept: ['chan<-'], placeholder: '문법',
          why: '<code>chan&lt;- 타입</code>은 값을 보내기만 할 수 있는 채널이에요.',
          hint: '화살표가 chan 뒤에 있으면 "채널로 보낸다"는 뜻이에요.'
        }),
        () => makeChoice(
          '<code>close(jobs)</code>의 역할로 알맞은 것은?',
          '더 이상 새 작업이 오지 않는다는 걸 알려서, for range로 받던 워커들이 반복을 끝낼 수 있게 한다', ['jobs 채널에 있던 모든 값을 즉시 삭제한다', '워커 고루틴을 강제로 종료시킨다', '채널을 다시 열 수 있게 초기화한다'],
          'close된 채널은 더 이상 값이 안 온다는 신호가 되어, for range jobs가 자연스럽게 끝나요.',
          '"닫는다"는 건 "더 이상 안 온다"는 신호예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>jobs</code>(받기 전용 int 채널)에서 값을 하나씩 꺼내, 2배로 만들어 <code>results</code>(보내기 전용 int 채널)에 보내는 함수 <code>worker</code>를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'func worker(jobs <-chan int, results chan<- int) {\n\tfor j := range jobs {\n\t\tresults <- j * 2\n\t}\n}',
          accept: ['func worker(jobs <-chan int, results chan<- int) {\n\tfor j := range jobs {\n\t\tresults <- j * 2\n\t}\n}'],
          why: 'for range jobs로 작업을 하나씩 받아, 2배로 만들어 results로 보내요.',
          hint: 'func worker(jobs <-chan int, results chan<- int) { for j := range jobs { results <- j * 2 } } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const jobCount = randInt(3, 8);
        return {
          type: 'blank',
          q: `워커 3개가 있고, 총 ${jobCount}개의 작업을 <code>jobs</code> 채널에 넣은 뒤 <code>close(jobs)</code>를 호출했어요. 모든 워커가 끝나면, <code>results</code> 채널에는 총 몇 개의 결과가 담겨있을까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(jobCount)], placeholder: '숫자',
          why: `워커가 몇 개든, 작업 ${jobCount}개는 결국 모두 처리되어 결과도 ${jobCount}개가 나와요.`,
          hint: '워커 개수와 상관없이, 작업 하나당 결과 하나가 나와요.'
        };
      }
    },
    {
      id: 'timePackage',
      title: 'time 패키지',
      ready: true,
      summary: '시간을 다루는 time 패키지의 기본적인 사용법을 배워요.',
      goals: ['time.Now()로 현재 시각 얻기', 'time.Since로 걸린 시간 재기', 'time.Duration 단위(Second, Millisecond)'],
      blocks: [
        {
          h: '걸린 시간 재기',
          html: `<p><code>time.Now()</code>로 현재 시각을 기록해두고, 작업이 끝난 뒤 <code>time.Since(start)</code>로 "그때부터 지금까지 걸린 시간"을 구할 수 있어요. 실행 시간을 재는 아주 흔한 패턴이에요.</p>`,
          code: {
            label: 'time_since.go',
            lang: 'go',
            src: `start := time.Now()
time.Sleep(100 * time.Millisecond)
elapsed := time.Since(start)
fmt.Println(elapsed)`,
            out: `100ms`
          }
        },
        {
          h: '시간 단위: Duration',
          html: `<p><code>time.Second</code>, <code>time.Millisecond</code> 같은 상수에 숫자를 곱해서 원하는 시간 길이(Duration)를 만들어요.</p>`,
          code: {
            label: 'time_duration.go',
            lang: 'go',
            src: `d := 3 * time.Second
fmt.Println(d)`,
            out: `3s`
          },
          after: `<div class="note"><b>정리</b> — Duration은 "얼마나 오랜 시간인지"를 나타내는 타입이고, time.Now()가 돌려주는 Time은 "특정 시점"을 나타내는 타입이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>time.Since(start)</code>의 역할로 알맞은 것은?',
          'start에 기록된 시각부터 지금까지 걸린 시간을 계산해서 돌려준다', ['start 시각을 현재 시각으로 갱신한다', '프로그램을 start 시각까지 되돌린다', 'start 변수를 삭제한다'],
          'time.Since는 기록해둔 시작 시각과 지금 사이의 경과 시간을 계산해요.',
          '"~이후로(since)"라는 이름 그대로, 그 시점 이후 지난 시간을 재요.'
        ),
        () => ({
          type: 'blank',
          q: `3초를 나타내는 Duration 값을 만드는 코드를 완성하세요.`,
          prefix: 'd := 3 * time.', suffix: '', accept: ['Second'], placeholder: '단위',
          why: '<code>3 * time.Second</code>는 3초를 나타내는 Duration이에요.',
          hint: '"초"를 뜻하는 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>time.Now()</code>가 돌려주는 것은?',
          '현재 시각을 나타내는 값', ['1초를 나타내는 Duration', '프로그램이 시작된 이후 지난 시간', '항상 자정(0시)을 나타내는 값'],
          'time.Now()는 이 코드가 실행되는 바로 그 순간의 시각을 돌려줘요.',
          '"지금(now)"이라는 이름 그대로예요.'
        ),
        () => ({
          type: 'code',
          q: '작업 시작 시각을 <code>start</code>에 기록하고, 작업(여기선 생략) 뒤에 <code>elapsed</code>라는 변수에 걸린 시간을 담는 코드를 두 줄로 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'start := time.Now()\nelapsed := time.Since(start)',
          accept: ['start := time.Now()\nelapsed := time.Since(start)'],
          why: 'time.Now()로 시작 시각을 기록하고, time.Since(start)로 경과 시간을 구해요.',
          hint: 'start := time.Now() 다음에 elapsed := time.Since(start)를 쓰세요.'
        }),
      ],
      boss: () => {
        const ms = pick([50, 100, 200, 500]);
        return {
          type: 'blank',
          q: `<code>start := time.Now(); time.Sleep(${ms} * time.Millisecond); elapsed := time.Since(start)</code>일 때, <code>elapsed</code>는 대략 얼마일까요? (밀리초 단위 숫자만)`,
          prefix: '', suffix: '', accept: [String(ms)], placeholder: '숫자',
          why: `${ms}밀리초를 잠들었다가 바로 측정했으므로, elapsed는 대략 ${ms}밀리초예요.`,
          hint: 'time.Sleep으로 잠든 시간만큼 elapsed도 비슷하게 나와요.'
        };
      }
    },
    {
      id: 'panicRecover',
      title: 'panic과 recover',
      ready: true,
      summary: '심각한 오류가 났을 때 프로그램을 멈추는 panic과, 그걸 다시 잡아내는 recover를 배워요.',
      goals: ['panic이 발생하면 벌어지는 일', 'recover로 패닉 잡아내기', 'defer + recover 패턴'],
      blocks: [
        {
          h: '프로그램을 멈추는 panic',
          html: `<p><code>panic</code>은 일반적인 <code>error</code>와 달리, 그 자리에서 즉시 실행을 멈추고 (recover하지 않으면) 프로그램 전체가 종료돼요. 정말 심각하고 예상 못 한 상황에만 써야 해요(보통은 error를 반환하는 게 Go의 방식이에요).</p>`,
          code: {
            label: 'panic_basic.go',
            lang: 'go',
            src: `func riskyDivide(a, b int) int {
	if b == 0 {
		panic("0으로 나눌 수 없어요")
	}
	return a / b
}`
          }
        },
        {
          h: 'recover로 패닉 잡아내기',
          html: `<p><code>defer</code> 안에서 <code>recover()</code>를 부르면 panic을 잡아내서 프로그램이 죽지 않게 막을 수 있어요. <code>recover</code>는 <b>defer 안에서만</b> 의미가 있어요.</p>`,
          code: {
            label: 'recover_basic.go',
            lang: 'go',
            src: `func safeDivide(a, b int) (result int) {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("복구됨:", r)
			result = 0
		}
	}()
	return a / b
}`
          },
          after: `<div class="note"><b>정리</b> — panic은 "비상벨"이고, recover는 "그 비상벨을 defer 안에서 끄는 것"이라고 생각하면 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'panic과 error의 차이로 알맞은 것은?',
          'panic은 즉시 실행을 멈추고 recover하지 않으면 프로그램이 종료되지만, error는 값으로 반환되어 호출한 쪽이 직접 확인한다', ['panic과 error는 완전히 같은 기능이다', 'error가 panic보다 더 심각한 상황에 쓰인다', 'panic은 항상 자동으로 복구된다'],
          'panic은 흐름을 즉시 멈추는 심각한 상황용이고, error는 일반적인 실패를 값으로 다루는 방식이에요.',
          'Go는 보통의 실패는 error로, 정말 예외적인 상황만 panic으로 다뤄요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>recover()</code>가 실제로 패닉을 잡아내려면, 반드시 어떤 블록 안에서 호출되어야 할까요?`,
          prefix: '', suffix: '', accept: ['defer'], placeholder: '키워드',
          why: 'recover()는 defer로 예약된 함수 안에서 호출되어야 패닉을 잡아낼 수 있어요.',
          hint: '함수가 끝나기 직전에 실행되도록 예약하는 그 키워드예요.'
        }),
        () => makeChoice(
          '<code>defer func() { if r := recover(); r != nil { ... } }()</code>에서 <code>r != nil</code>이 참일 때의 의미는?',
          '실제로 패닉이 발생해서 recover가 그 값을 잡아냈다', ['패닉이 발생하지 않았다', '프로그램이 이미 종료되었다', 'r은 항상 nil이어야 정상이다'],
          'recover()는 패닉이 없었다면 nil을, 패닉이 있었다면 그 패닉 값을 돌려줘요.',
          'r이 nil이 아니라는 건 "뭔가 패닉이 있었다"는 뜻이에요.'
        ),
        () => ({
          type: 'code',
          q: '함수 안에서 <code>defer func() { if r := recover(); r != nil { fmt.Println("복구됨:", r) } }()</code> 형태로 패닉을 잡아내는 코드를 한 줄(익명 함수 전체)로 작성하세요.',
          starter: '',
          placeholder: 'defer func() { if r := recover(); r != nil { fmt.Println("복구됨:", r) } }()',
          accept: ['defer func() { if r := recover(); r != nil { fmt.Println("복구됨:", r) } }()'],
          why: 'defer로 예약한 익명 함수 안에서 recover()를 호출해 패닉을 잡아내요.',
          hint: 'defer func() { if r := recover(); r != nil { fmt.Println("복구됨:", r) } }() 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const hasRecover = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `<code>func riskyDivide(a, b int) int { if b == 0 { panic("0으로 나눌 수 없어요") }; return a / b }</code>를 호출하는 쪽에서 ${hasRecover ? 'defer + recover로 패닉을 잡고 있어요' : '아무런 recover도 하지 않았어요'}. <code>riskyDivide(10, 0)</code>을 호출하면 프로그램 전체가 멈출까요? (예/아니오)`,
          prefix: '', suffix: '', accept: [hasRecover ? '아니오' : '예'], placeholder: '예 / 아니오',
          why: hasRecover
            ? 'defer + recover가 패닉을 잡아내므로, 프로그램은 멈추지 않고 계속 진행돼요.'
            : 'recover가 없으면 panic이 그대로 전파되어 프로그램 전체가 종료돼요.',
          hint: 'recover가 있는지 없는지가 패닉 이후 프로그램의 운명을 결정해요.'
        };
      }
    },
    {
      id: 'emptyInterfaceAny',
      title: '빈 인터페이스와 any',
      ready: true,
      summary: '어떤 타입의 값이든 담을 수 있는 빈 인터페이스(any)를 배워요.',
      goals: ['interface{}와 any의 관계', '아무 타입이나 담을 수 있는 이유', '실제 타입은 %T로 확인하기'],
      blocks: [
        {
          h: '아무 타입이나 담기',
          html: `<p><code>any</code>는 사실 <code>interface{}</code>의 별칭이에요(Go 1.18부터 더 읽기 쉬운 이름으로 추가됐어요). 아무 메서드도 요구하지 않는 인터페이스라서, 모든 타입이 자동으로 이 인터페이스를 만족해요 — 그래서 어떤 값이든 담을 수 있어요.</p>`,
          code: {
            label: 'any_basic.go',
            lang: 'go',
            src: `var value any
value = 42
fmt.Println(value)
value = "안녕"
fmt.Println(value)`,
            out: `42\n안녕`
          }
        },
        {
          h: '실제 타입 확인하기: %T',
          html: `<p><code>%T</code>는 값의 실제 타입을 보여주는 서식 동사예요. any에 담긴 값을 원래 타입에 맞는 연산으로 쓰려면, 앞서 배운 타입 단언이나 타입 스위치로 실제 타입을 확인해야 해요.</p>`,
          code: {
            label: 'any_type.go',
            lang: 'go',
            src: `func printType(value any) {
	fmt.Printf("%v (%T)\\n", value, value)
}

printType(42)`,
            out: `42 (int)`
          },
          after: `<div class="note"><b>정리</b> — any는 "무엇이든 담을 수 있는 상자"예요. 다만 상자 안의 내용물을 실제로 쓰려면, 그 안에 뭐가 들었는지 확인하는 과정이 필요해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const val1 = randInt(1, 100);
          const val2 = pick(['안녕', '반가워']);
          return {
            type: 'blank',
            q: `<code>var value any; value = ${val1}; fmt.Println(value); value = "${val2}"; fmt.Println(value)</code>를 실행하면? (줄바꿈으로 구분해서 순서대로 입력)`,
            prefix: '', suffix: '', accept: [`${val1}\n${val2}`], placeholder: '출력 순서',
            why: `any 변수는 어떤 타입이든 담을 수 있으므로, 순서대로 ${val1}, "${val2}"가 그대로 출력돼요.`,
            hint: 'any는 담긴 값을 그대로 출력할 수 있어요.'
          };
        },
        () => makeChoice(
          '<code>any</code>(<code>interface{}</code>)가 모든 타입의 값을 담을 수 있는 이유는?',
          '아무 메서드도 요구하지 않아서, 모든 타입이 자동으로 이 인터페이스를 만족하기 때문에', ['any는 특별히 모든 타입을 미리 등록해뒀기 때문에', 'any는 사실 string 타입의 다른 이름이기 때문에', 'Go 컴파일러가 any를 특별 취급해서 타입 검사를 건너뛰기 때문에'],
          '인터페이스가 요구하는 메서드가 하나도 없으면, 어떤 타입이든 자동으로 그 조건을 만족해요.',
          '요구 조건이 "없음"이라는 게 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>fmt.Printf</code>에서 값의 실제 타입을 보여주는 서식 동사를 쓰세요.`,
          prefix: 'fmt.Printf("%v (', suffix: ')\\n", value, value)', accept: ['%T'], placeholder: '서식 동사',
          why: '<code>%T</code>는 값의 실제 타입 이름을 보여줘요.',
          hint: '"타입(Type)"의 T예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>any</code> 타입의 변수 <code>value</code>를 선언만 하세요. (초기값 없이)',
          starter: '',
          placeholder: 'var value any',
          accept: ['var value any'],
          why: 'var 이름 any 형태로 어떤 타입이든 담을 수 있는 변수를 선언해요.',
          hint: 'var value any 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const isInt = Math.random() < 0.5;
        const val = isInt ? randInt(1, 100) : pick(['안녕', '반가워']);
        const typeName = isInt ? 'int' : 'string';
        return {
          type: 'blank',
          q: `<code>var value any = ${isInt ? val : `"${val}"`}</code>이고 <code>fmt.Printf("%T", value)</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [typeName], placeholder: '타입 이름',
          why: `value에 실제로 들어있는 값의 타입이 ${typeName}이므로 %T는 "${typeName}"을 출력해요.`,
          hint: '%T는 겉으로 any여도, 실제로 담긴 값의 진짜 타입을 보여줘요.'
        };
      }
    },
    {
      id: 'mapIterationOrder',
      title: '맵 순회 순서 문제',
      ready: true,
      summary: 'Go의 맵을 순회할 때 순서가 보장되지 않는다는 중요한 특징을 배워요.',
      goals: ['맵 순회 순서가 매번 달라질 수 있음', '순서가 필요하면 키를 따로 정렬하기', '순서에 의존하는 코드의 위험성'],
      blocks: [
        {
          h: '문제: 맵은 순서를 보장하지 않아요',
          html: `<p>맵을 <code>for range</code>로 순회하면, 실행할 때마다 순서가 달라질 수 있어요(Go가 의도적으로 그렇게 설계했어요 — 순서에 의존하는 버그를 미리 방지하기 위해서예요). 맵의 키-값 관계는 정확하지만, "어떤 순서로 나올지"는 보장되지 않아요.</p>`,
          code: {
            label: 'map_no_order.go',
            lang: 'go',
            src: `scores := map[string]int{"지수": 90, "민준": 85, "서연": 95}
for name, score := range scores {
	fmt.Println(name, score)
}`
          }
        },
        {
          h: '해결: 키를 따로 정렬해서 순회하기',
          html: `<p>순서가 필요하면, 키만 슬라이스로 뽑아서 정렬한 다음 그 순서대로 맵에 접근하는 식으로 해결해요.</p>`,
          code: {
            label: 'map_sorted_order.go',
            lang: 'go',
            src: `keys := make([]string, 0, len(scores))
for name := range scores {
	keys = append(keys, name)
}
sort.Strings(keys)

for _, name := range keys {
	fmt.Println(name, scores[name])
}`
          },
          after: `<div class="note"><b>정리</b> — "맵 자체를 순서대로 만들 수는 없지만, 키를 뽑아 정렬해서 그 순서대로 맵을 조회"하는 게 표준적인 해결 방법이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'Go에서 <code>for range</code>로 맵을 순회할 때의 특징은?',
          '실행할 때마다 순서가 달라질 수 있고, 순서를 보장하지 않는다', ['항상 키를 넣은 순서대로 나온다', '항상 키의 알파벳 순서대로 나온다', '항상 값이 큰 순서대로 나온다'],
          'Go의 맵은 순회 순서를 의도적으로 보장하지 않아요.',
          '"보장하지 않는다"는 게 핵심이에요 — 순서가 있어 보여도 우연일 뿐이에요.'
        ),
        () => ({
          type: 'blank',
          q: `맵을 항상 같은(정해진) 순서로 순회하고 싶을 때 쓰는 방법을 설명하면? ("키만 슬라이스로 뽑아서 정렬한 다음, 그 순서대로 맵에 접근한다"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['키만 슬라이스로 뽑아서 정렬한 다음, 그 순서대로 맵에 접근한다'], placeholder: '설명',
          why: '맵 자체는 정렬할 수 없으니, 키를 슬라이스로 뽑아 sort.Strings 등으로 정렬한 뒤 그 순서로 맵을 조회해요.',
          hint: '맵이 아니라 "키 목록"을 정렬하는 우회 방법이에요.'
        }),
        () => makeChoice(
          'Go가 맵의 순회 순서를 일부러 무작위로 만든 이유는?',
          '개발자가 "순서에 의존하는" 버그를 미리 알아채고 고치게 하려고', ['메모리를 절약하기 위해', '맵을 더 빠르게 만들기 위해', '다른 언어와의 호환성 때문에'],
          '순서가 우연히 일정하면 개발자가 "이 순서가 항상 유지된다"고 착각하고 코드를 짤 수 있어서, Go는 아예 순서를 무작위로 만들어요.',
          '착각할 여지를 아예 없애버리는 설계 철학이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>scores</code>(<code>map[string]int</code>)의 키들을 <code>keys</code>라는 <code>[]string</code>에 모으고 <code>sort.Strings</code>로 정렬하는 코드를 작성하세요. (append로 모으는 부분과 정렬 부분)',
          starter: '',
          rows: 4,
          placeholder: 'keys := make([]string, 0, len(scores))\nfor name := range scores {\n\tkeys = append(keys, name)\n}\nsort.Strings(keys)',
          accept: ['keys := make([]string, 0, len(scores))\nfor name := range scores {\n\tkeys = append(keys, name)\n}\nsort.Strings(keys)'],
          why: '맵의 키를 range로 뽑아 슬라이스에 모은 뒤, sort.Strings로 정렬해요.',
          hint: 'for name := range scores { keys = append(keys, name) } 다음 sort.Strings(keys)를 쓰세요.'
        }),
      ],
      boss: () => {
        const names = ['지수', '민준', '서연'].sort();
        return {
          type: 'blank',
          q: `<code>scores := map[string]int{"서연": 95, "지수": 90, "민준": 85}</code>이고, 키를 슬라이스로 뽑아 <code>sort.Strings</code>로 정렬한 뒤 순서대로 이름만 출력하면, 첫 번째로 출력되는 이름은? (그대로 입력)`,
          prefix: '', suffix: '', accept: [names[0]], placeholder: '이름',
          why: `가나다순(문자열 정렬 기준)으로 정렬하면 "${names[0]}"이 가장 먼저 와요.`,
          hint: '한글 이름을 문자열로 정렬했을 때 가장 먼저 오는 게 무엇인지 생각해보세요.'
        };
      }
    },
    {
      id: 'pointerReceivers',
      title: '포인터 리시버 vs 값 리시버',
      ready: true,
      summary: '메서드가 원본을 바꿔야 할 때는 포인터 리시버를, 읽기만 할 때는 값 리시버를 쓰는 기준을 배워요.',
      goals: ['값 리시버는 구조체의 복사본에서 동작하기', '포인터 리시버는 원본 필드를 직접 수정하기', '어떤 상황에 어떤 리시버를 골라야 하는지'],
      blocks: [
        {
          h: '값 리시버: 복사본이라 원본은 그대로',
          html: `<p>값 리시버(<code>func (c Counter) ...</code>)는 메서드가 호출될 때 구조체를 <b>통째로 복사</b>해서 써요. 그래서 메서드 안에서 필드를 바꿔도, 원본(호출한 쪽의 변수)은 전혀 영향을 받지 않아요.</p>`,
          code: {
            label: 'value_receiver.go',
            lang: 'go',
            src: `type Counter struct {
	count int
}

func (c Counter) IncreaseWrong() {
	c.count++ // 복사본만 바뀜
}

func main() {
	c := Counter{count: 0}
	c.IncreaseWrong()
	fmt.Println(c.count) // 여전히 0
}`,
            out: `0`
          }
        },
        {
          h: '포인터 리시버: 원본을 직접 수정',
          html: `<p>포인터 리시버(<code>func (c *Counter) ...</code>)는 구조체의 <b>주소</b>를 받아서, 메서드 안에서 <code>*c</code>가 가리키는 원본을 직접 바꿔요. 필드를 변경해야 하는 메서드는 거의 항상 포인터 리시버를 써요.</p>`,
          code: {
            label: 'pointer_receiver.go',
            lang: 'go',
            src: `func (c *Counter) Increase() {
	c.count++ // 원본이 바뀜
}

func main() {
	c := Counter{count: 0}
	c.Increase()
	fmt.Println(c.count) // 1
}`,
            out: `1`
          },
          after: `<div class="note"><b>정리</b> — "이 메서드가 원본을 바꿔야 하는가?"가 리시버 선택의 기준이에요. 바꿔야 하면 포인터 리시버, 읽기만 한다면 값 리시버로 충분해요. 참고로 한 타입에 포인터 리시버 메서드가 하나라도 있으면, 나머지도 포인터 리시버로 통일하는 게 관례예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const start = randInt(0, 5);
          return {
            type: 'blank',
            q: `<code>func (c Counter) IncreaseWrong() { c.count++ }</code>이고 <code>c := Counter{count: ${start}}</code>에서 <code>c.IncreaseWrong()</code>을 3번 호출한 뒤 <code>c.count</code>는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(start)], placeholder: '숫자',
            why: `값 리시버는 매번 복사본에서만 바뀌므로, 몇 번을 호출해도 원본 count는 여전히 ${start}예요.`,
            hint: '값 리시버는 원본에 전혀 영향을 주지 않아요.'
          };
        },
        () => makeChoice(
          '메서드가 구조체의 필드를 실제로 바꿔야 할 때 사용해야 하는 리시버는?',
          '포인터 리시버', ['값 리시버', '인터페이스 리시버', '제네릭 리시버'],
          '포인터 리시버는 원본 구조체의 주소를 받아서, 그 필드를 직접 수정할 수 있어요.',
          '"주소를 받아 원본을 직접 건드린다"는 게 포인터 리시버의 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `필드를 실제로 수정해야 하는 메서드에 포인터 리시버를 쓰는 이유를 설명하면? ("메서드 안에서 원본 구조체의 필드를 직접 수정할 수 있기 때문에"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['메서드 안에서 원본 구조체의 필드를 직접 수정할 수 있기 때문에'], placeholder: '설명',
          why: '값 리시버는 복사본만 바꾸지만, 포인터 리시버는 원본 자체를 바꿀 수 있어요.',
          hint: '복사본이 아니라 "원본"을 바꾼다는 점이 핵심이에요.'
        }),
        () => makeChoice(
          '값 리시버로 정의된 메서드가 호출될 때 일어나는 일은?',
          '구조체 전체가 복사되어, 메서드 안에서는 그 복사본을 사용한다', ['구조체의 주소만 전달되어 원본이 바로 바뀐다', '아무 것도 전달되지 않고 전역 변수만 사용한다', '컴파일 오류가 발생한다'],
          '값 리시버는 호출 시점에 구조체를 복사해서 메서드에 넘겨요.',
          '"복사본"이라는 단어를 기억하세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Counter</code> 구조체(필드 <code>count int</code>)에 대해, <code>count</code>를 1 늘리는 포인터 리시버 메서드 <code>Increase</code>를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'func (c *Counter) Increase() {\n\tc.count++\n}',
          accept: ['func (c *Counter) Increase() {\n\tc.count++\n}'],
          why: '포인터 리시버 (c *Counter)로 받아서, c.count++로 원본을 직접 늘려요.',
          hint: 'func (c *Counter) Increase() { c.count++ } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const start = randInt(0, 10);
        const calls = randInt(1, 5);
        const isPointer = Math.random() < 0.5;
        const finalCount = isPointer ? start + calls : start;
        return {
          type: 'blank',
          q: `<code>c := Counter{count: ${start}}</code>이고, ${isPointer ? '포인터 리시버 메서드 Increase' : '값 리시버 메서드 IncreaseWrong'}를 ${calls}번 호출했어요. 최종 <code>c.count</code>는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(finalCount)], placeholder: '숫자',
          why: isPointer
            ? `포인터 리시버는 원본을 직접 바꾸므로 ${start} + ${calls} = ${finalCount}예요.`
            : `값 리시버는 복사본만 바꾸므로 원본은 그대로 ${start}예요.`,
          hint: '리시버가 포인터인지 값인지에 따라 원본이 실제로 바뀌는지가 결정돼요.'
        };
      }
    },
    {
      id: 'rwMutex',
      title: 'sync.RWMutex로 읽기와 쓰기 분리하기',
      ready: true,
      summary: '읽기는 여러 고루틴이 동시에, 쓰기는 한 번에 하나만 하도록 나누는 sync.RWMutex를 배워요.',
      goals: ['RLock/RUnlock으로 동시 읽기 허용하기', 'Lock/Unlock으로 쓰기는 배타적으로 하기', 'Mutex 대신 RWMutex를 쓰면 좋은 상황'],
      blocks: [
        {
          h: '여러 고루틴이 동시에 읽기: RLock',
          html: `<p><code>sync.RWMutex</code>는 읽기 잠금(<code>RLock</code>)과 쓰기 잠금(<code>Lock</code>)을 구분해요. 읽기만 할 때는 <b>여러 고루틴이 동시에</b> RLock을 잡을 수 있어서, 읽기가 많고 쓰기가 적은 상황에서 훨씬 효율적이에요.</p>`,
          code: {
            label: 'rwmutex_read.go',
            lang: 'go',
            src: `var mu sync.RWMutex
var data = map[string]int{"지수": 90}

func read(key string) int {
	mu.RLock()
	defer mu.RUnlock()
	return data[key]
}`
          }
        },
        {
          h: '쓰기는 배타적으로: Lock',
          html: `<p>값을 바꾸는 쓰기 작업은 여전히 <code>Lock</code>/<code>Unlock</code>으로 한 번에 하나만 실행되게 막아요. 쓰기 중에는 읽기(RLock)도 기다려야, 쓰는 도중의 어중간한 값을 읽는 일이 없어요.</p>`,
          code: {
            label: 'rwmutex_write.go',
            lang: 'go',
            src: `func write(key string, value int) {
	mu.Lock()
	defer mu.Unlock()
	data[key] = value
}`
          },
          after: `<div class="note"><b>정리</b> — 읽기가 압도적으로 많고 쓰기가 드물다면 RWMutex가 유리해요. 쓰기가 잦다면 그냥 Mutex와 성능 차이가 크지 않아요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'sync.RWMutex에서 RLock()의 특징은?',
          '여러 고루틴이 동시에 RLock을 잡아 함께 읽을 수 있다', ['RLock도 한 번에 하나의 고루틴만 잡을 수 있다', 'RLock을 부르면 다른 모든 잠금이 풀린다', 'RLock은 쓰기 작업에만 사용한다'],
          'RLock은 읽기 전용 잠금이라 여러 고루틴이 동시에 잡을 수 있어요.',
          '"읽기(Read)는 여럿이 함께"라는 게 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `쓰기 작업을 보호할 때 사용하는 배타적 잠금 메서드를 쓰세요. (Unlock과 짝을 이루는 쪽)`,
          prefix: 'mu.', suffix: '() ... mu.Unlock()', accept: ['Lock'], placeholder: '메서드 이름',
          why: '쓰기는 RLock이 아니라 일반 Lock/Unlock으로 배타적으로 보호해요.',
          hint: '읽기 전용이 아닌, 값을 바꿀 때 쓰는 잠금이에요.'
        }),
        () => ({
          type: 'blank',
          q: `일반 Mutex 대신 RWMutex를 쓰면 좋은 상황을 설명하면? ("읽기가 많고 쓰기가 드문 상황"이라고 답하세요)`,
          prefix: '', suffix: '', accept: ['읽기가 많고 쓰기가 드문 상황'], placeholder: '설명',
          why: '읽기끼리는 동시에 허용되므로, 읽기가 압도적으로 많을 때 RWMutex가 유리해요.',
          hint: '읽기와 쓰기의 "비율"이 핵심이에요.'
        }),
        () => makeChoice(
          '한 고루틴이 <code>mu.Lock()</code>(쓰기)을 잡고 있는 동안, 다른 고루틴이 <code>mu.RLock()</code>을 호출하면?',
          '쓰기가 끝날 때까지 기다려야 한다', ['즉시 함께 읽을 수 있다', '쓰기 잠금이 자동으로 풀린다', '오류가 발생하며 프로그램이 종료된다'],
          '쓰기 잠금이 걸려 있으면, 읽기 잠금도 그 쓰기가 끝날 때까지 기다려야 해요.',
          '쓰기 중에는 읽기도 안전을 위해 잠시 멈춰요.'
        ),
        () => ({
          type: 'code',
          q: '<code>mu sync.RWMutex</code>와 <code>data map[string]int</code>가 있을 때, key로 값을 읽어 반환하는 함수 <code>read</code>를 RLock/RUnlock으로 보호해서 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'func read(key string) int {\n\tmu.RLock()\n\tdefer mu.RUnlock()\n\treturn data[key]\n}',
          accept: ['func read(key string) int {\n\tmu.RLock()\n\tdefer mu.RUnlock()\n\treturn data[key]\n}'],
          why: 'RLock으로 읽기 잠금을 걸고, defer RUnlock으로 확실히 풀어준 다음 값을 반환해요.',
          hint: 'func read(key string) int { mu.RLock(); defer mu.RUnlock(); return data[key] } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const bothRead = Math.random() < 0.5;
        return {
          type: 'blank',
          q: bothRead
            ? `두 고루틴이 동시에 <code>mu.RLock()</code>을 호출했어요. 서로 상대방이 RUnlock할 때까지 기다려야 할까요? (예/아니오)`
            : `한 고루틴이 <code>mu.Lock()</code>(쓰기)을 잡고 있는 동안, 다른 고루틴이 <code>mu.RLock()</code>을 호출했어요. 기다려야 할까요? (예/아니오)`,
          prefix: '', suffix: '', accept: bothRead ? ['아니오'] : ['예'], placeholder: '예 / 아니오',
          why: bothRead
            ? 'RLock끼리는 서로 막지 않으므로, 기다리지 않고 함께 읽을 수 있어요.'
            : '쓰기 잠금(Lock)이 걸려 있으면 읽기 잠금(RLock)도 쓰기가 끝날 때까지 기다려야 해요.',
          hint: '읽기끼리는 함께, 쓰기와는 항상 배타적이에요.'
        };
      }
    },
    {
      id: 'syncOnce',
      title: 'sync.Once로 딱 한 번만 실행하기',
      ready: true,
      summary: '여러 고루틴이 동시에 호출해도 초기화 코드가 정확히 한 번만 실행되게 하는 sync.Once를 배워요.',
      goals: ['once.Do로 한 번만 실행되는 코드 만들기', '여러 고루틴이 동시에 불러도 안전한 이유', '싱글턴·초기화 패턴에 활용하기'],
      blocks: [
        {
          h: '문제: 초기화를 딱 한 번만 하고 싶다면',
          html: `<p>불리언 변수로 "이미 초기화했는지" 확인하는 방식은, 여러 고루틴이 <b>동시에</b> 그 확인을 통과해버리면 초기화가 두 번 이상 실행될 수 있어요(레이스 컨디션).</p>`,
          code: {
            label: 'naive_once.go',
            lang: 'go',
            src: `var initialized bool
var config string

func loadConfig() {
	if !initialized {
		config = "설정 로딩 완료"
		initialized = true // 동시에 실행되면 두 번 로딩될 수도 있음
	}
}`
          }
        },
        {
          h: '해결: sync.Once',
          html: `<p><code>sync.Once</code>의 <code>Do</code> 메서드에 넘긴 함수는, 몇 번을 호출하든 <b>딱 한 번만</b> 실행돼요. 여러 고루틴이 동시에 <code>Do</code>를 불러도 Go가 내부적으로 안전하게 처리해줘요.</p>`,
          code: {
            label: 'sync_once.go',
            lang: 'go',
            src: `var once sync.Once
var config string

func loadConfig() {
	once.Do(func() {
		config = "설정 로딩 완료"
		fmt.Println("로딩 실행됨")
	})
}

func main() {
	loadConfig()
	loadConfig()
	loadConfig()
}`,
            out: `로딩 실행됨`
          },
          after: `<div class="note"><b>정리</b> — sync.Once는 "몇 번을 불러도 결국 1번만"을 보장해요. 설정 로딩, 싱글턴 인스턴스 생성처럼 딱 한 번만 해야 하는 초기화에 자주 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const calls = randInt(2, 10);
          return {
            type: 'blank',
            q: `<code>var once sync.Once</code>이고 <code>loadConfig</code>를 총 ${calls}번 호출했어요(내부에서 <code>once.Do(func(){ fmt.Println("로딩 실행됨") })</code>를 호출). "로딩 실행됨"은 몇 번 출력될까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: ['1'], placeholder: '숫자',
            why: `once.Do에 넘긴 함수는 몇 번을 호출하든 정확히 1번만 실행되므로, ${calls}번을 불러도 "로딩 실행됨"은 1번만 출력돼요.`,
            hint: '이름 그대로 "Once"— 딱 한 번이에요.'
          };
        },
        () => makeChoice(
          'sync.Once의 Do 메서드가 보장하는 것은?',
          '넘겨진 함수가 몇 번 호출되든 딱 한 번만 실행된다', ['넘겨진 함수가 매번 새로운 고루틴에서 실행된다', '넘겨진 함수가 정확히 두 번 실행된다', '넘겨진 함수의 실행 순서를 무작위로 바꾼다'],
          'Once.Do는 최초 호출에서만 함수를 실행하고, 이후 호출은 아무 일도 하지 않아요.',
          '"딱 한 번"이라는 이름이 곧 동작이에요.'
        ),
        () => ({
          type: 'blank',
          q: `sync.Once를 여러 고루틴이 동시에 호출해도 안전한 이유를 설명하면? ("내부적으로 동시에 호출되어도 단 한 번만 실행되도록 보장하기 때문에"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['내부적으로 동시에 호출되어도 단 한 번만 실행되도록 보장하기 때문에'], placeholder: '설명',
          why: 'sync.Once는 내부적으로 동시 호출을 안전하게 처리해서, 경쟁 상태 없이 정확히 한 번만 실행돼요.',
          hint: '직접 불리언 변수로 확인하는 방식과 달리, 동시성 문제가 없어요.'
        }),
        () => makeChoice(
          'sync.Once가 자주 쓰이는 상황으로 알맞은 것은?',
          '설정 로딩이나 싱글턴 인스턴스 생성처럼, 처음 한 번만 초기화해야 하는 경우', ['반복문을 여러 번 실행해야 하는 경우', '고루틴을 여러 개 만들어야 하는 경우', '값을 계속 바꿔야 하는 경우'],
          '한 번만 실행되면 충분한 초기화 작업에 sync.Once가 딱 맞아요.',
          '"초기화는 한 번만" 하면 되는 상황을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>once sync.Once</code>가 있을 때, <code>once.Do</code>로 <code>config</code>에 "설정 로딩 완료"를 대입하는 <code>loadConfig</code> 함수를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'func loadConfig() {\n\tonce.Do(func() {\n\t\tconfig = "설정 로딩 완료"\n\t})\n}',
          accept: ['func loadConfig() {\n\tonce.Do(func() {\n\t\tconfig = "설정 로딩 완료"\n\t})\n}'],
          why: 'once.Do에 익명 함수를 넘겨서, 그 안에서 config를 초기화해요.',
          hint: 'func loadConfig() { once.Do(func() { config = "설정 로딩 완료" }) } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const calls = randInt(3, 50);
        return {
          type: 'blank',
          q: `${calls}개의 고루틴이 동시에 <code>once.Do(func(){ fmt.Println("초기화됨") })</code>를 호출했어요. "초기화됨"은 총 몇 번 출력될까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: ['1'], placeholder: '숫자',
          why: `동시에 여러 고루틴이 Do를 호출해도, sync.Once는 단 한 번만 함수를 실행하도록 보장하므로 "초기화됨"은 1번만 출력돼요.`,
          hint: '고루틴이 몇 개든, Once가 보장하는 실행 횟수는 정해져 있어요.'
        };
      }
    },
    {
      id: 'atomicOperations',
      title: 'sync/atomic으로 가벼운 카운터 만들기',
      ready: true,
      summary: 'Mutex 없이도 정수 값을 안전하게 더하고 읽을 수 있는 sync/atomic 패키지를 배워요.',
      goals: ['atomic.AddInt64로 안전하게 값 더하기', 'atomic.LoadInt64로 안전하게 읽기', 'Mutex와 atomic 중 언제 무엇을 쓸지'],
      blocks: [
        {
          h: '단순한 값 하나엔 atomic',
          html: `<p>카운터처럼 <b>단순한 숫자 값 하나</b>만 여러 고루틴이 안전하게 더하거나 읽으면 될 때는, Mutex 없이 <code>sync/atomic</code> 패키지의 함수만으로 충분해요. CPU가 지원하는 원자적(atomic) 연산을 그대로 사용해서 Mutex보다 가벼워요.</p>`,
          code: {
            label: 'atomic_add.go',
            lang: 'go',
            src: `var count int64

func increment() {
	atomic.AddInt64(&count, 1)
}`
          }
        },
        {
          h: '안전하게 값 읽기: atomic.LoadInt64',
          html: `<p>값을 더하는 도중에 다른 고루틴이 일반적인 방법(<code>count</code>를 그냥 읽기)으로 읽으면 역시 안전하지 않을 수 있어요. 읽을 때도 <code>atomic.LoadInt64</code>를 써야 완전히 안전해요.</p>`,
          code: {
            label: 'atomic_load.go',
            lang: 'go',
            src: `func main() {
	var wg sync.WaitGroup
	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			increment()
		}()
	}
	wg.Wait()
	fmt.Println(atomic.LoadInt64(&count)) // 항상 1000
}`,
            out: `1000`
          },
          after: `<div class="note"><b>정리</b> — atomic은 단일 값에 대한 단순 연산(더하기, 읽기)에 최적화되어 있어요. 여러 필드를 함께 다루거나 복잡한 로직을 보호해야 한다면 Mutex가 더 적합해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = pick([100, 500, 1000, 2000]);
          return {
            type: 'blank',
            q: `${n}개의 고루틴이 각각 <code>atomic.AddInt64(&count, 1)</code>을 한 번씩 실행해요. 모두 끝난 뒤 <code>count</code>는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `atomic.AddInt64는 각 더하기 연산을 안전하게 처리하므로, 정확히 ${n}이 나와요.`,
            hint: 'atomic 연산은 레이스 컨디션 없이 정확한 결과를 보장해요.'
          };
        },
        () => makeChoice(
          'sync/atomic 패키지의 연산이 보장하는 것은?',
          '더하기·읽기 같은 단일 연산을, 다른 고루틴의 간섭 없이 안전하게 처리한다', ['모든 코드를 자동으로 병렬화한다', '고루틴을 자동으로 개수를 조절한다', '항상 Mutex보다 느리게 동작하게 만든다'],
          'atomic 연산은 CPU 수준에서 "쪼개질 수 없는" 하나의 연산으로 처리돼요.',
          '"원자적(atomic)"이라는 말은 더 이상 쪼갤 수 없다는 뜻이에요.'
        ),
        () => ({
          type: 'blank',
          q: `Mutex 대신 atomic을 쓰기 적합한 경우를 설명하면? ("단순한 숫자 값 하나만 안전하게 더하거나 읽으면 되는 경우"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['단순한 숫자 값 하나만 안전하게 더하거나 읽으면 되는 경우'], placeholder: '설명',
          why: '여러 필드를 함께 다루거나 복잡한 로직이 필요하면 Mutex가 낫지만, 값 하나만 다룰 땐 atomic이 더 가벼워요.',
          hint: '"단순함"과 "값 하나"가 핵심 조건이에요.'
        }),
        () => makeChoice(
          '값을 더하는 도중, 다른 고루틴이 <code>atomic.LoadInt64</code>가 아니라 그냥 <code>count</code>를 직접 읽으면?',
          '더하는 도중의 값을 읽는 등, 안전하지 않은 결과를 볼 수도 있다', ['항상 정확한 최신 값을 읽는다', '프로그램이 즉시 종료된다', 'count 값이 자동으로 0이 된다'],
          '더하기는 atomic으로 보호해도, 읽기를 일반적인 방법으로 하면 안전성이 깨질 수 있어요.',
          '더하기와 읽기 모두 atomic 함수로 해야 완전히 안전해요.'
        ),
        () => ({
          type: 'code',
          q: '<code>var count int64</code>가 있을 때, <code>atomic.AddInt64</code>로 <code>count</code>를 1 늘리는 함수 <code>increment</code>를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'func increment() {\n\tatomic.AddInt64(&count, 1)\n}',
          accept: ['func increment() {\n\tatomic.AddInt64(&count, 1)\n}'],
          why: 'atomic.AddInt64(&count, 1)로 count의 주소에 원자적으로 1을 더해요.',
          hint: 'func increment() { atomic.AddInt64(&count, 1) } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const n = pick([50, 200, 777, 1500]);
        return {
          type: 'blank',
          q: `${n}개의 고루틴이 각각 <code>atomic.AddInt64(&count, 1)</code>을 정확히 한 번씩 실행하고 <code>wg.Wait()</code>로 모두 기다린 뒤, <code>atomic.LoadInt64(&count)</code>를 호출하면? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
          why: `atomic 연산으로 더하고 읽었으므로, 레이스 컨디션 없이 정확히 ${n}이 나와요.`,
          hint: 'atomic.AddInt64와 atomic.LoadInt64를 함께 쓰면 값이 정확히 보장돼요.'
        };
      }
    },
    {
      id: 'selectTimeout',
      title: 'select와 time.After로 타임아웃 걸기',
      ready: true,
      summary: '채널 응답을 무한정 기다리지 않도록, select와 time.After를 조합해 타임아웃을 거는 패턴을 배워요.',
      goals: ['time.After가 반환하는 채널의 역할', 'select로 결과와 타임아웃 중 먼저 오는 것 처리하기', '무한 대기를 막는 이유'],
      blocks: [
        {
          h: '문제: 응답이 영원히 안 오면?',
          html: `<p>채널에서 값을 받는 코드(<code>result := <-resultCh</code>)는, 아무도 그 채널에 값을 보내지 않으면 <b>영원히</b> 그 자리에서 기다려요. 네트워크 요청처럼 응답이 안 올 수도 있는 작업에서는 위험해요.</p>`,
          code: {
            label: 'no_timeout.go',
            lang: 'go',
            src: `result := <-resultCh // resultCh에 아무도 값을 안 보내면 영원히 대기`
          }
        },
        {
          h: '해결: time.After와 select',
          html: `<p><code>time.After(d)</code>는 <code>d</code> 시간이 지나면 값을 하나 보내는 채널을 돌려줘요. <code>select</code>로 원래 채널과 <code>time.After</code>를 동시에 지켜보면, "결과가 먼저 오는지, 시간이 먼저 다 되는지"에 따라 다르게 처리할 수 있어요.</p>`,
          code: {
            label: 'select_timeout.go',
            lang: 'go',
            src: `select {
case result := <-resultCh:
	fmt.Println("결과:", result)
case <-time.After(3 * time.Second):
	fmt.Println("시간 초과")
}`
          },
          after: `<div class="note"><b>정리</b> — context.WithTimeout이 더 표준적인 방법이지만, 간단한 상황에서는 select + time.After만으로도 충분히 타임아웃을 구현할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const workSec = randInt(1, 10);
          const timeoutSec = randInt(1, 10);
          const timesOut = timeoutSec < workSec;
          return {
            type: 'blank',
            q: `<code>select { case result := <-resultCh: ...; case <-time.After(${timeoutSec} * time.Second): fmt.Println("시간 초과") }</code>이고, resultCh는 작업이 시작된 지 ${workSec}초 뒤에야 값이 와요. 무엇이 출력될까요? ("시간 초과" 또는 "결과")`,
            prefix: '', suffix: '', accept: [timesOut ? '시간 초과' : '결과'], placeholder: '시간 초과 / 결과',
            why: timesOut
              ? `타임아웃(${timeoutSec}초)이 결과(${workSec}초)보다 먼저 오므로 "시간 초과"가 출력돼요.`
              : `결과(${workSec}초)가 타임아웃(${timeoutSec}초)보다 먼저 오므로 "결과"가 출력돼요.`,
            hint: '두 시간 중 어느 쪽이 더 짧은지 비교해보세요.'
          };
        },
        () => makeChoice(
          '<code>time.After(3 * time.Second)</code>가 하는 일은?',
          '3초가 지나면 값을 하나 보내는 채널을 반환한다', ['3초 동안 프로그램 실행을 멈춘다', '3초마다 반복해서 값을 보내는 채널을 반환한다', '3초 뒤에 프로그램을 강제 종료한다'],
          'time.After는 지정한 시간 뒤 딱 한 번 값을 보내는 채널을 만들어줘요.',
          'time.Sleep과 달리, 채널을 돌려준다는 점이 달라요.'
        ),
        () => ({
          type: 'blank',
          q: `select와 time.After를 함께 쓰는 이유를 설명하면? ("채널 응답을 무한정 기다리지 않고, 일정 시간이 지나면 포기하도록 만들기 위해"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['채널 응답을 무한정 기다리지 않고, 일정 시간이 지나면 포기하도록 만들기 위해'], placeholder: '설명',
          why: '응답이 영원히 안 올 수도 있는 상황에서, 정해진 시간이 지나면 포기하도록 만드는 안전장치예요.',
          hint: '"무한 대기를 막는다"는 게 핵심 목적이에요.'
        }),
        () => makeChoice(
          'select에 resultCh를 받는 case와 time.After를 받는 case가 함께 있을 때, 어느 case가 실행되는지 결정하는 기준은?',
          '둘 중 먼저 준비되는(값이 오는) 쪽', ['항상 첫 번째로 적은 case', '항상 time.After 쪽', '두 case가 항상 동시에 실행된다'],
          'select는 여러 채널 중 먼저 값이 오는 쪽의 case를 실행해요.',
          '"먼저 오는 쪽"이라는 select의 기본 규칙을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>resultCh</code>에서 값이 오면 <code>fmt.Println("결과:", result)</code>로 출력하고, 2초가 지나면 <code>fmt.Println("시간 초과")</code>를 출력하는 <code>select</code>문을 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'select {\ncase result := <-resultCh:\n\tfmt.Println("결과:", result)\ncase <-time.After(2 * time.Second):\n\tfmt.Println("시간 초과")\n}',
          accept: ['select {\ncase result := <-resultCh:\n\tfmt.Println("결과:", result)\ncase <-time.After(2 * time.Second):\n\tfmt.Println("시간 초과")\n}'],
          why: 'select 안에 resultCh case와 time.After(2 * time.Second) case를 나란히 두어요.',
          hint: 'select { case result := <-resultCh: ... case <-time.After(2 * time.Second): ... } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const timeoutSec = pick([1, 2, 5]);
        const workSec = timeoutSec + randInt(1, 10);
        return {
          type: 'blank',
          q: `<code>select { case result := <-resultCh: fmt.Println("결과:", result); case <-time.After(${timeoutSec} * time.Second): fmt.Println("시간 초과") }</code>이고, resultCh는 작업이 끝나는 ${workSec}초 뒤에야 값이 도착해요. 무엇이 출력될까요? (그대로 입력)`,
          prefix: '', suffix: '', accept: ['시간 초과'], placeholder: '출력 결과',
          why: `타임아웃(${timeoutSec}초)이 실제 작업 완료(${workSec}초)보다 먼저 오므로 "시간 초과"가 출력돼요.`,
          hint: '타임아웃 시간이 작업이 걸리는 시간보다 짧은지 확인해보세요.'
        };
      }
    },
    {
      id: 'errorsAsCustomType',
      title: '커스텀 에러 타입과 errors.As',
      ready: true,
      summary: '자신만의 에러 구조체를 만들고, errors.As로 그 구체적인 타입을 안전하게 꺼내는 방법을 배워요.',
      goals: ['Error() 메서드로 커스텀 에러 타입 만들기', 'errors.As로 감싸진 에러에서 구체 타입 꺼내기', '에러에 추가 정보(필드) 담기'],
      blocks: [
        {
          h: '나만의 에러 타입 만들기',
          html: `<p>에러도 struct로 만들 수 있어요. <code>Error() string</code> 메서드만 있으면 <code>error</code> 인터페이스를 만족해요. 구조체라서 메시지 외에 추가 정보(예: 문제가 된 필드 이름)를 함께 담을 수 있어요.</p>`,
          code: {
            label: 'custom_error_type.go',
            lang: 'go',
            src: `type ValidationError struct {
	Field string
	Msg   string
}

func (e *ValidationError) Error() string {
	return e.Field + ": " + e.Msg
}

func validate(age int) error {
	if age < 0 {
		return &ValidationError{Field: "age", Msg: "음수일 수 없어요"}
	}
	return nil
}`
          }
        },
        {
          h: '구체 타입 꺼내기: errors.As',
          html: `<p><code>errors.As</code>는 (감싸졌을 수도 있는) 에러 체인을 따라가면서, 지정한 타입의 포인터에 담을 수 있는 에러를 찾아 <b>그 타입으로 꺼내</b>줘요. 그러면 구조체에 담긴 추가 필드(Field 등)에 접근할 수 있어요.</p>`,
          code: {
            label: 'errors_as.go',
            lang: 'go',
            src: `err := validate(-5)

var ve *ValidationError
if errors.As(err, &ve) {
	fmt.Println("문제 필드:", ve.Field)
}`,
            out: `문제 필드: age`
          },
          after: `<div class="note"><b>정리</b> — errors.Is는 "이 에러가 그 원본과 같은가"를 비교하고, errors.As는 "이 에러를 그 타입으로 꺼낼 수 있는가"를 확인한다는 차이가 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const field = pick(['age', 'email', 'name']);
          const msg = pick(['형식이 올바르지 않아요', '비어 있을 수 없어요', '음수일 수 없어요']);
          return {
            type: 'blank',
            q: `<code>err := &ValidationError{Field: "${field}", Msg: "${msg}"}</code>이고 <code>var ve *ValidationError; errors.As(err, &ve)</code>가 성공했을 때, <code>ve.Field</code>는? (그대로 입력)`,
            prefix: '', suffix: '', accept: [field], placeholder: 'Field 값',
            why: `errors.As가 성공하면 ve는 원래의 *ValidationError를 가리키므로, ve.Field는 "${field}"예요.`,
            hint: 'errors.As는 원본 구조체를 그대로 꺼내줘요.'
          };
        },
        () => makeChoice(
          'errors.As(err, &target)의 역할은?',
          '에러 체인에서 target과 같은 타입의 에러를 찾아, 그 타입으로 꺼내준다', ['에러 메시지를 항상 영어로 번역한다', 'err을 무조건 nil로 만든다', '에러가 발생한 줄 번호를 계산한다'],
          'errors.As는 (감싸졌을 수도 있는) 에러 체인을 따라가며 지정한 타입과 일치하는 에러를 찾아줘요.',
          '"타입으로 꺼낸다(As)"는 이름 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `errors.Is와 errors.As의 차이를 설명하면? ("errors.Is는 같은 에러인지 비교하고, errors.As는 특정 타입으로 꺼낼 수 있는지 확인한다"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['errors.Is는 같은 에러인지 비교하고, errors.As는 특정 타입으로 꺼낼 수 있는지 확인한다'], placeholder: '설명',
          why: 'Is는 값 비교(동일성)에, As는 타입 변환(구체 타입 추출)에 초점을 맞춰요.',
          hint: '하나는 "같다", 다른 하나는 "이 타입이다"를 확인해요.'
        }),
        () => makeChoice(
          '커스텀 에러 타입이 Go의 error 인터페이스를 만족하려면 반드시 구현해야 하는 것은?',
          'Error() string 메서드', ['New() 함수', 'Wrap() 메서드', 'String() int 메서드'],
          'error 인터페이스는 Error() string 메서드 하나만 요구해요.',
          'error 인터페이스가 요구하는 메서드는 딱 하나예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Field</code>(string), <code>Msg</code>(string) 필드를 가진 <code>ValidationError</code> 구조체를 정의하고, <code>e.Field + ": " + e.Msg</code>를 반환하는 포인터 리시버 <code>Error() string</code> 메서드를 작성하세요.',
          starter: '',
          rows: 8,
          placeholder: 'type ValidationError struct {\n\tField string\n\tMsg   string\n}\n\nfunc (e *ValidationError) Error() string {\n\treturn e.Field + ": " + e.Msg\n}',
          accept: ['type ValidationError struct {\n\tField string\n\tMsg   string\n}\n\nfunc (e *ValidationError) Error() string {\n\treturn e.Field + ": " + e.Msg\n}'],
          why: '구조체를 정의하고, 포인터 리시버로 Error() string 메서드를 구현해서 error 인터페이스를 만족시켜요.',
          hint: 'type ValidationError struct { } 다음에 func (e *ValidationError) Error() string { return e.Field + ": " + e.Msg } 형태를 쓰세요.'
        }),
      ],
      boss: () => {
        const field = pick(['age', 'email', 'password']);
        const msg = pick(['필수 항목이에요', '길이가 너무 짧아요', '형식이 잘못됐어요']);
        return {
          type: 'blank',
          q: `<code>original := &ValidationError{Field: "${field}", Msg: "${msg}"}</code>, <code>wrapped := fmt.Errorf("검증 실패: %w", original)</code>이고 <code>var ve *ValidationError; errors.As(wrapped, &ve)</code>를 실행하면, <code>ve.Field</code>는? (그대로 입력)`,
          prefix: '', suffix: '', accept: [field], placeholder: 'Field 값',
          why: `%w로 감싸도 errors.As는 체인을 따라가 원본 *ValidationError를 찾아내므로, ve.Field는 여전히 "${field}"예요.`,
          hint: '감싸는 것과 상관없이, errors.As는 원본 타입을 찾아낼 수 있어요.'
        };
      }
    },
    {
      id: 'contextCancelValues',
      title: 'context.WithCancel과 context.WithValue',
      ready: true,
      summary: '직접 취소 신호를 보내는 WithCancel과, 요청 범위의 값을 전달하는 WithValue를 배워요.',
      goals: ['context.WithCancel로 원하는 시점에 취소 신호 보내기', 'ctx.Err()로 취소 이유 확인하기', 'context.WithValue로 요청 범위 데이터 전달하기'],
      blocks: [
        {
          h: '직접 취소하기: context.WithCancel',
          html: `<p><code>WithTimeout</code>은 시간이 지나면 자동으로 취소되지만, <code>context.WithCancel</code>은 시간과 무관하게 <b>내가 원하는 시점</b>에 <code>cancel()</code>을 불러 취소 신호를 보낼 수 있어요.</p>`,
          code: {
            label: 'context_cancel.go',
            lang: 'go',
            src: `ctx, cancel := context.WithCancel(context.Background())

go func() {
	time.Sleep(1 * time.Second)
	cancel() // 1초 뒤 직접 취소
}()

<-ctx.Done()
fmt.Println("취소 이유:", ctx.Err())`,
            out: `취소 이유: context canceled`
          }
        },
        {
          h: '요청 범위 값 전달하기: context.WithValue',
          html: `<p><code>context.WithValue</code>는 요청 하나를 처리하는 동안 여러 함수에 함께 실어 나를 값(예: 요청 ID)을 담아요. 함수 매개변수를 계속 늘리지 않고도 context 하나로 전달할 수 있어요. 다만 핵심 로직 값이 아니라, 로깅·추적용 부가 정보에만 쓰는 게 권장돼요.</p>`,
          code: {
            label: 'context_value.go',
            lang: 'go',
            src: `ctx := context.WithValue(context.Background(), "requestID", "req-123")

func handle(ctx context.Context) {
	id := ctx.Value("requestID")
	fmt.Println("처리 중:", id)
}`,
            out: `처리 중: req-123`
          },
          after: `<div class="note"><b>정리</b> — WithCancel은 "언제 취소할지 내가 결정", WithTimeout은 "정해진 시간이 지나면 자동 취소", WithValue는 "값을 함께 실어 나르기" 담당이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'context.WithCancel과 context.WithTimeout의 차이는?',
          'WithCancel은 내가 원하는 시점에 직접 cancel()을 불러 취소하고, WithTimeout은 지정한 시간이 지나면 자동으로 취소된다', ['두 함수는 완전히 동일하게 동작한다', 'WithCancel은 취소가 아예 불가능하다', 'WithTimeout은 수동으로 취소할 수 없다'],
          'WithCancel은 수동 취소용, WithTimeout은 자동(시간 기반) 취소용이에요.',
          '"누가 취소를 결정하는가"가 핵심 차이예요.'
        ),
        () => ({
          type: 'blank',
          q: `취소된 context에서 <code>ctx.Err()</code>가 하는 일을 설명하면? ("왜 취소되었는지(취소 이유)를 알려준다"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['왜 취소되었는지(취소 이유)를 알려준다'], placeholder: '설명',
          why: 'ctx.Err()는 취소되지 않았으면 nil을, 취소됐다면 그 이유(취소인지 타임아웃인지)를 알려줘요.',
          hint: '단순히 취소 여부가 아니라 "이유"를 알려준다는 점이 핵심이에요.'
        }),
        () => ({
          type: 'blank',
          q: `<code>ctx := context.WithValue(context.Background(), "requestID", "req-123")</code>일 때, 그 값을 꺼내는 메서드를 쓰세요.`,
          prefix: 'ctx.', suffix: '("requestID")', accept: ['Value'], placeholder: '메서드 이름',
          why: 'ctx.Value(key)로 WithValue에 담아둔 값을 꺼낼 수 있어요.',
          hint: '"값(Value)"을 그대로 가져오는 메서드예요.'
        }),
        () => makeChoice(
          'context.WithValue에 담기 적합한 값으로 알맞은 것은?',
          '요청 ID처럼 로깅·추적용 부가 정보', ['핵심 비즈니스 로직에 반드시 필요한 필수 계산 값', '함수의 주요 반환값', '데이터베이스 연결 자체의 핵심 설정'],
          'WithValue는 부가적인 맥락 정보를 실어 나르는 용도이지, 중요한 로직 값을 전달하는 용도가 아니에요.',
          '"꼭 있어야만 로직이 도는가"를 기준으로 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>context.Background()</code>를 기반으로 언제든 취소할 수 있는 <code>ctx</code>와 <code>cancel</code>을 만드는 코드를 한 줄로 작성하세요.',
          starter: '',
          placeholder: 'ctx, cancel := context.WithCancel(context.Background())',
          accept: ['ctx, cancel := context.WithCancel(context.Background())'],
          why: 'context.WithCancel(부모컨텍스트)는 ctx와, 직접 부를 수 있는 cancel 함수를 함께 돌려줘요.',
          hint: 'ctx, cancel := context.WithCancel(context.Background()) 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const cancelled = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `<code>ctx, cancel := context.WithCancel(context.Background())</code>이고, ${cancelled ? 'cancel()을 이미 호출했어요' : 'cancel()을 아직 한 번도 호출하지 않았어요'}. 지금 <code><-ctx.Done()</code>에서 즉시 값을 받을 수 있을까요? (예/아니오)`,
          prefix: '', suffix: '', accept: [cancelled ? '예' : '아니오'], placeholder: '예 / 아니오',
          why: cancelled
            ? 'cancel()이 이미 호출됐으므로 ctx.Done() 채널은 이미 닫혀있어 즉시 값을 받을 수 있어요.'
            : 'cancel()을 아직 부르지 않았으므로 ctx.Done()은 계속 대기 상태예요.',
          hint: 'cancel()을 불렀는지 여부가 Done() 채널의 상태를 결정해요.'
        };
      }
    },
    {
      id: 'genericConstraints',
      title: '제네릭 제약 더 깊이: comparable과 커스텀 제약',
      ready: true,
      summary: '==로 비교 가능한 타입만 받는 comparable과, 인터페이스로 나만의 제네릭 제약을 만드는 법을 배워요.',
      goals: ['comparable로 비교 가능한 타입만 허용하기', '인터페이스로 커스텀 제약 정의하기', '~ 기호로 제약의 범위 넓히기'],
      blocks: [
        {
          h: '비교 가능한 타입만: comparable',
          html: `<p><code>comparable</code>은 Go에 내장된 특별한 제약으로, <code>==</code>와 <code>!=</code>로 비교할 수 있는 모든 타입을 허용해요. 슬라이스에서 특정 값을 찾는 함수처럼, 비교가 꼭 필요한 제네릭 함수에 써요.</p>`,
          code: {
            label: 'comparable_basic.go',
            lang: 'go',
            src: `func Contains[T comparable](items []T, target T) bool {
	for _, item := range items {
		if item == target {
			return true
		}
	}
	return false
}

func main() {
	fmt.Println(Contains([]int{1, 2, 3}, 2))
}`,
            out: `true`
          }
        },
        {
          h: '나만의 제약 만들기: 인터페이스',
          html: `<p>여러 특정 타입만 받고 싶다면, 인터페이스로 <b>타입 집합</b>을 정의해서 제약으로 쓸 수 있어요. <code>~</code>를 붙이면 "이 타입을 기반으로 정의한 사용자 타입도 포함"이라는 뜻이 돼요.</p>`,
          code: {
            label: 'custom_constraint.go',
            lang: 'go',
            src: `type Number interface {
	~int | ~int64 | ~float64
}

func Sum[T Number](nums []T) T {
	var total T
	for _, n := range nums {
		total += n
	}
	return total
}`
          },
          after: `<div class="note"><b>정리</b> — comparable은 "비교가 필요할 때", 커스텀 인터페이스 제약은 "정확히 이 타입들만 허용하고 싶을 때" 사용해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const nums = [randInt(1, 20), randInt(1, 20), randInt(1, 20)];
          const target = Math.random() < 0.5 ? pick(nums) : randInt(21, 40);
          const found = nums.includes(target);
          return {
            type: 'blank',
            q: `<code>func Contains[T comparable](items []T, target T) bool { for _, item := range items { if item == target { return true } }; return false }</code>이고 <code>Contains([]int{${nums.join(', ')}}, ${target})</code>의 결과는? (true/false)`,
            prefix: '', suffix: '', accept: [String(found)], placeholder: 'true / false',
            why: `[${nums.join(', ')}] 안에 ${target}이(가) ${found ? '있으므로 true' : '없으므로 false'}예요.`,
            hint: '슬라이스 안에 target과 같은 값이 있는지 하나씩 확인해보세요.'
          };
        },
        () => makeChoice(
          'comparable 제약이 허용하는 타입은?',
          '==와 != 로 비교할 수 있는 모든 타입', ['오직 int 타입만', '오직 문자열 타입만', '모든 슬라이스와 맵 타입'],
          'comparable은 비교 연산자를 지원하는 타입 전체를 아우르는 특별한 내장 제약이에요.',
          '슬라이스나 맵처럼 ==로 비교할 수 없는 타입은 comparable에 포함되지 않아요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>type Number interface { ~int | ~int64 | ~float64 }</code>에서 <code>~</code> 기호의 의미를 설명하면? ("그 타입을 기반으로 정의한 사용자 타입도 포함한다는 뜻"이라고 답하세요)`,
          prefix: '', suffix: '', accept: ['그 타입을 기반으로 정의한 사용자 타입도 포함한다는 뜻'], placeholder: '설명',
          why: '~int는 int뿐 아니라 "type MyInt int"처럼 int를 기반으로 만든 타입도 포함시켜요.',
          hint: '기반 타입으로 새로 정의한 타입까지 함께 허용한다는 뜻이에요.'
        }),
        () => makeChoice(
          '제네릭 함수에 커스텀 인터페이스 제약을 직접 정의하는 이유는?',
          '허용할 타입의 범위를 원하는 대로 좁히거나 넓히기 위해', ['컴파일 속도를 항상 더 빠르게 만들기 위해', 'any 제약을 아예 사용할 수 없게 만들기 위해', '함수의 반환값 개수를 늘리기 위해'],
          'any나 comparable만으로 부족할 때, 원하는 타입 집합만 정확히 허용하는 제약을 직접 만들 수 있어요.',
          '"정확히 이 타입들만" 허용하고 싶을 때 커스텀 제약을 써요.'
        ),
        () => ({
          type: 'code',
          q: '<code>~int</code>, <code>~float64</code> 타입만 허용하는 제약 <code>Number</code>를 인터페이스로 정의하세요.',
          starter: '',
          rows: 3,
          placeholder: 'type Number interface {\n\t~int | ~float64\n}',
          accept: ['type Number interface {\n\t~int | ~float64\n}'],
          why: '인터페이스 안에 ~int | ~float64 형태로 허용할 타입 집합을 나열해요.',
          hint: 'type Number interface { ~int | ~float64 } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const nums = [randInt(1, 30), randInt(1, 30), randInt(1, 30), randInt(1, 30)];
        const target = Math.random() < 0.5 ? pick(nums) : randInt(31, 50);
        const found = nums.includes(target);
        return {
          type: 'blank',
          q: `<code>Contains([]int{${nums.join(', ')}}, ${target})</code>를 <code>comparable</code> 제약을 쓴 <code>Contains</code> 함수로 호출하면 결과는? (true/false)`,
          prefix: '', suffix: '', accept: [String(found)], placeholder: 'true / false',
          why: `${target}이(가) [${nums.join(', ')}] 안에 ${found ? '있으므로 true' : '없으므로 false'}예요.`,
          hint: 'comparable 덕분에 ==로 각 원소와 target을 비교할 수 있어요.'
        };
      }
    },
    {
      id: 'ioReaderWriter',
      title: 'io.Reader와 io.Writer 인터페이스',
      ready: true,
      summary: '파일, 네트워크, 문자열 등 다양한 데이터 소스를 동일한 방식으로 다루게 해주는 io.Reader/io.Writer를 배워요.',
      goals: ['io.Reader의 Read 메서드 하나로 모든 입력원 다루기', 'io.Writer의 Write 메서드로 모든 출력지에 쓰기', '인터페이스 덕분에 함수가 다양한 타입을 받을 수 있는 이유'],
      blocks: [
        {
          h: '입력의 표준: io.Reader',
          html: `<p><code>io.Reader</code>는 <code>Read(p []byte) (n int, err error)</code> 메서드 하나만 요구하는 인터페이스예요. 파일, 네트워크 연결, 문자열(<code>strings.NewReader</code>) 등 "데이터를 읽어올 수 있는" 거의 모든 것이 이 인터페이스를 구현해요.</p>`,
          code: {
            label: 'reader_basic.go',
            lang: 'go',
            src: `func printAll(r io.Reader) {
	data, _ := io.ReadAll(r)
	fmt.Println(string(data))
}

func main() {
	printAll(strings.NewReader("안녕하세요"))
}`,
            out: `안녕하세요`
          }
        },
        {
          h: '출력의 표준: io.Writer',
          html: `<p><code>io.Writer</code>는 <code>Write(p []byte) (n int, err error)</code> 메서드 하나만 요구해요. <code>fmt.Fprintln(w, ...)</code>처럼, Writer만 있으면 파일이든 화면(<code>os.Stdout</code>)이든 메모리 버퍼든 똑같은 방식으로 쓸 수 있어요.</p>`,
          code: {
            label: 'writer_basic.go',
            lang: 'go',
            src: `var buf bytes.Buffer
fmt.Fprintln(&buf, "로그 한 줄")
fmt.Println(buf.String())`,
            out: `로그 한 줄`
          },
          after: `<div class="note"><b>정리</b> — io.Reader/io.Writer는 "실제 타입이 무엇이든, 읽고 쓰는 방법만 맞으면 된다"는 Go 인터페이스 철학을 가장 잘 보여주는 예예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const text = pick(['반갑습니다', '좋은 하루', '테스트 완료']);
          return {
            type: 'blank',
            q: `<code>func printAll(r io.Reader) { data, _ := io.ReadAll(r); fmt.Println(string(data)) }</code>이고 <code>printAll(strings.NewReader("${text}"))</code>를 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [text], placeholder: '출력 결과',
            why: `strings.NewReader("${text}")는 io.Reader이고, io.ReadAll로 그 내용 전체("${text}")를 읽어 출력해요.`,
            hint: 'io.Reader는 실제로 담긴 문자열을 그대로 읽어와요.'
          };
        },
        () => makeChoice(
          'io.Reader 인터페이스가 요구하는 메서드는?',
          'Read(p []byte) (n int, err error)', ['ReadAll() string', 'Open() error', 'Get(key string) []byte'],
          'io.Reader는 딱 하나, Read(p []byte) (n int, err error) 메서드만 요구해요.',
          '메서드가 단 하나뿐이라는 게 io.Reader의 특징이에요.'
        ),
        () => ({
          type: 'blank',
          q: `io.Writer 인터페이스가 요구하는 메서드의 이름만 쓰세요.`,
          prefix: '', suffix: '(p []byte) (n int, err error)', accept: ['Write'], placeholder: '메서드 이름',
          why: 'io.Writer는 Write(p []byte) (n int, err error) 메서드 하나만 요구해요.',
          hint: '"쓰다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'io.Reader/io.Writer 같은 작은 인터페이스를 표준 라이브러리 전반에서 쓰는 이유는?',
          '입력원·출력지의 실제 타입이 무엇이든, 똑같은 방식(Read/Write)으로 다룰 수 있게 하기 위해', ['프로그램의 실행 속도를 항상 두 배로 만들기 위해', '파일 입출력을 아예 금지하기 위해', '변수 이름을 통일하기 위해'],
          '메서드 하나만 맞으면 파일이든, 네트워크든, 메모리든 동일한 함수로 다룰 수 있어요.',
          '"똑같은 방식으로 다룬다"가 핵심 이점이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>bytes.Buffer</code> 타입의 <code>buf</code>에 <code>fmt.Fprintln</code>으로 "로그 한 줄"을 쓰고, <code>buf.String()</code>을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'fmt.Fprintln(&buf, "로그 한 줄")\nfmt.Println(buf.String())',
          accept: ['fmt.Fprintln(&buf, "로그 한 줄")\nfmt.Println(buf.String())'],
          why: 'fmt.Fprintln은 io.Writer를 받는 함수라서, &buf(포인터, io.Writer 구현체)를 그대로 넘길 수 있어요.',
          hint: 'fmt.Fprintln(&buf, "로그 한 줄") 다음 fmt.Println(buf.String())을 쓰세요.'
        }),
      ],
      boss: () => {
        const text = pick(['입출력 완료', '버퍼 테스트', '안녕 세상']);
        return {
          type: 'blank',
          q: `<code>var buf bytes.Buffer</code>이고 <code>fmt.Fprintln(&buf, "${text}")</code>를 실행한 뒤 <code>strings.TrimSpace(buf.String())</code>을 출력하면? (그대로 입력, 줄바꿈 없이)`,
          prefix: '', suffix: '', accept: [text], placeholder: '출력 결과',
          why: `Fprintln은 buf(io.Writer)에 "${text}"와 줄바꿈을 쓰고, TrimSpace가 그 줄바꿈을 제거해서 "${text}"만 남아요.`,
          hint: 'buf는 io.Writer 역할을 하는 메모리 버퍼예요.'
        };
      }
    },
    {
      id: 'bufioScanner',
      title: 'bufio로 버퍼드 입출력하기',
      ready: true,
      summary: '한 줄씩 효율적으로 읽는 bufio.Scanner와, 쓰기를 모아뒀다 한 번에 내보내는 bufio.Writer를 배워요.',
      goals: ['bufio.NewScanner로 한 줄씩 읽기', 'bufio.Writer로 쓰기를 모았다가 Flush하기', '버퍼링이 성능에 도움이 되는 이유'],
      blocks: [
        {
          h: '한 줄씩 읽기: bufio.Scanner',
          html: `<p><code>bufio.NewScanner(r)</code>는 io.Reader를 감싸서, <code>Scan()</code>을 부를 때마다 한 줄씩 읽고 <code>Text()</code>로 그 줄의 내용을 꺼낼 수 있게 해줘요. 파일이나 표준 입력을 한 줄씩 처리할 때 아주 흔히 써요.</p>`,
          code: {
            label: 'scanner_basic.go',
            lang: 'go',
            src: `scanner := bufio.NewScanner(strings.NewReader("첫줄\\n둘째줄\\n셋째줄"))
for scanner.Scan() {
	fmt.Println(scanner.Text())
}`,
            out: `첫줄\n둘째줄\n셋째줄`
          }
        },
        {
          h: '모았다가 한 번에 쓰기: bufio.Writer',
          html: `<p>파일에 한 글자씩, 한 줄씩 계속 쓰면 매번 시스템 호출이 일어나 느려요. <code>bufio.NewWriter(w)</code>는 쓰기 내용을 메모리에 <b>모아뒀다가</b>, 어느 정도 쌓이거나 <code>Flush()</code>를 부를 때 한 번에 내보내서 훨씬 빨라요.</p>`,
          code: {
            label: 'writer_flush.go',
            lang: 'go',
            src: `writer := bufio.NewWriter(os.Stdout)
writer.WriteString("버퍼에 저장됨\\n")
writer.Flush() // 이제 실제로 출력됨`,
            out: `버퍼에 저장됨`
          },
          after: `<div class="note"><b>정리</b> — Flush를 잊으면 버퍼에 남은 내용이 출력되지 않을 수 있어서, defer writer.Flush()로 습관화하는 게 좋아요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const lines = shuffle(['사과', '바나나', '체리']).slice(0, 2);
          return {
            type: 'blank',
            q: `<code>scanner := bufio.NewScanner(strings.NewReader("${lines[0]}\\n${lines[1]}"))</code>이고 <code>for scanner.Scan() { fmt.Println(scanner.Text()) }</code>를 실행하면? (줄바꿈으로 구분해서 순서대로 입력)`,
            prefix: '', suffix: '', accept: [`${lines[0]}\n${lines[1]}`], placeholder: '출력 순서',
            why: `Scanner는 줄 단위로 읽으므로, 순서대로 "${lines[0]}", "${lines[1]}"가 출력돼요.`,
            hint: 'Scan()은 한 번 부를 때마다 다음 줄로 넘어가요.'
          };
        },
        () => makeChoice(
          'bufio.Scanner의 Scan()과 Text()의 역할은?',
          'Scan()으로 다음 줄로 이동하고, Text()로 그 줄의 내용을 가져온다', ['Scan()은 파일 전체를 삭제하고, Text()는 아무 일도 하지 않는다', 'Scan()과 Text()는 완전히 같은 일을 한다', 'Scan()은 줄 수를 세고, Text()는 항상 빈 문자열을 반환한다'],
          'Scan()이 true를 반환하면 다음 줄을 읽은 것이고, Text()로 그 줄의 문자열을 꺼내요.',
          '"이동"과 "꺼내기"로 역할이 나뉘어요.'
        ),
        () => ({
          type: 'blank',
          q: `bufio.Writer를 쓰는 이유를 설명하면? ("쓰기 내용을 모아뒀다가 한 번에 내보내서 시스템 호출 횟수를 줄이고 성능을 높이기 위해"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['쓰기 내용을 모아뒀다가 한 번에 내보내서 시스템 호출 횟수를 줄이고 성능을 높이기 위해'], placeholder: '설명',
          why: '한 번씩 쓸 때마다 시스템 호출이 일어나면 느리므로, 모았다가 한 번에 내보내는 게 훨씬 효율적이에요.',
          hint: '"모았다가 한 번에"가 버퍼링의 핵심이에요.'
        }),
        () => makeChoice(
          'bufio.Writer 사용 후 Flush()를 호출하지 않으면?',
          '버퍼에 남아있는 내용이 실제로 출력(또는 저장)되지 않을 수 있다', ['자동으로 프로그램 종료 시 강제 출력된다', '즉시 오류가 발생하며 프로그램이 멈춘다', '버퍼 내용이 두 번 출력된다'],
          'Flush를 부르지 않으면 아직 내보내지 않은 내용이 버퍼에 그대로 남아있을 수 있어요.',
          'Flush는 "지금까지 모은 걸 실제로 내보내라"는 뜻이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>os.Stdout</code>을 감싸는 <code>bufio.NewWriter</code>로 <code>writer</code>를 만들고, "완료\\n"을 쓴 뒤 <code>Flush()</code>를 호출하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'writer := bufio.NewWriter(os.Stdout)\nwriter.WriteString("완료\\n")\nwriter.Flush()',
          accept: ['writer := bufio.NewWriter(os.Stdout)\nwriter.WriteString("완료\\n")\nwriter.Flush()'],
          why: 'bufio.NewWriter로 감싸고, WriteString으로 버퍼에 쓴 뒤 Flush로 실제 출력해요.',
          hint: 'bufio.NewWriter(os.Stdout) 다음 WriteString과 Flush()를 순서대로 쓰세요.'
        }),
      ],
      boss: () => {
        const lines = shuffle(['월요일', '화요일', '수요일', '목요일']).slice(0, 3);
        return {
          type: 'blank',
          q: `<code>scanner := bufio.NewScanner(strings.NewReader("${lines[0]}\\n${lines[1]}\\n${lines[2]}"))</code>이고 <code>for scanner.Scan() { fmt.Println(scanner.Text()) }</code>를 실행하면, 몇 번째 줄까지 출력될까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: ['3'], placeholder: '숫자',
          why: `\\n으로 구분된 줄이 3개이므로, Scan()이 3번 true를 반환해 3줄 모두 출력돼요.`,
          hint: '줄바꿈(\\n) 문자로 몇 개의 줄이 나뉘는지 세어보세요.'
        };
      }
    },
    {
      id: 'regexpPackage',
      title: '정규표현식: regexp 패키지',
      ready: true,
      summary: '문자열이 특정 패턴과 일치하는지 확인하고, 패턴에 맞는 부분을 찾아내는 regexp 패키지를 배워요.',
      goals: ['regexp.MatchString으로 패턴 일치 확인하기', 'FindString으로 일치하는 부분 찾기', 'ReplaceAllString으로 패턴에 맞는 부분 바꾸기'],
      blocks: [
        {
          h: '패턴과 일치하는지 확인하기',
          html: `<p><code>regexp.MatchString(패턴, 문자열)</code>은 문자열이 그 정규표현식 패턴과 일치하는 부분을 포함하는지 true/false로 알려줘요. <code>\\d+</code>는 "숫자 하나 이상"을 뜻하는 패턴이에요.</p>`,
          code: {
            label: 'regexp_match.go',
            lang: 'go',
            src: `matched, _ := regexp.MatchString("[0-9]+", "우편번호는 12345입니다")
fmt.Println(matched)`,
            out: `true`
          }
        },
        {
          h: '일치하는 부분 찾고 바꾸기',
          html: `<p><code>regexp.MustCompile</code>로 패턴을 미리 컴파일해두면, <code>FindString</code>으로 처음 일치하는 부분을 찾거나 <code>ReplaceAllString</code>으로 패턴에 맞는 모든 부분을 바꿀 수 있어요. 같은 패턴을 여러 번 쓸 거라면 미리 컴파일해두는 게 훨씬 효율적이에요.</p>`,
          code: {
            label: 'regexp_find_replace.go',
            lang: 'go',
            src: `re := regexp.MustCompile("[0-9]+")

fmt.Println(re.FindString("우편번호는 12345입니다"))
fmt.Println(re.ReplaceAllString("전화 010-1234-5678", "*"))`,
            out: `12345\n전화 *-*-*`
          },
          after: `<div class="note"><b>정리</b> — 패턴을 한 번만 쓸 거면 regexp.MatchString처럼 간편한 함수를, 여러 번 재사용할 거면 MustCompile로 미리 컴파일해두는 게 좋아요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const hasDigit = Math.random() < 0.5;
          const text = hasDigit ? pick(['비밀번호는 7890', '방 번호 305호', '2024년']) : pick(['안녕하세요', '반가워요', '좋은 하루']);
          return {
            type: 'blank',
            q: `<code>matched, _ := regexp.MatchString("[0-9]+", "${text}")</code>일 때 <code>matched</code>는? (true/false)`,
            prefix: '', suffix: '', accept: [String(hasDigit)], placeholder: 'true / false',
            why: `"${text}"에 숫자가 ${hasDigit ? '포함되어 있으므로 true' : '전혀 없으므로 false'}예요.`,
            hint: '문자열 안에 숫자(0-9)가 하나라도 있는지 확인해보세요.'
          };
        },
        () => makeChoice(
          '<code>regexp.MustCompile(패턴)</code>을 미리 호출해두고 재사용하는 이유는?',
          '같은 패턴을 여러 번 쓸 때, 매번 다시 해석하지 않고 한 번만 컴파일해서 효율적으로 쓰기 위해', ['패턴을 자동으로 암호화하기 위해', '패턴이 일치하지 않을 때 프로그램을 종료시키기 위해', '정규표현식을 사용할 수 없게 막기 위해'],
          'MustCompile은 패턴을 미리 해석해서 재사용 가능한 형태로 만들어줘요.',
          '"매번 새로 해석하지 않는다"는 게 핵심 이점이에요.'
        ),
        () => ({
          type: 'blank',
          q: `정규표현식에서 <code>\\d+</code>(또는 <code>[0-9]+</code>)가 뜻하는 것을 설명하면? ("숫자가 하나 이상 이어지는 부분"이라고 답하세요)`,
          prefix: '', suffix: '', accept: ['숫자가 하나 이상 이어지는 부분'], placeholder: '설명',
          why: '+ 기호는 "하나 이상 반복"을 뜻하므로, [0-9]+는 숫자가 1개 이상 연속된 부분을 의미해요.',
          hint: '+ 기호가 "반복"을 나타낸다는 걸 떠올려보세요.'
        }),
        () => makeChoice(
          're.ReplaceAllString(문자열, 대체문자열)이 하는 일은?',
          '패턴과 일치하는 모든 부분을 대체 문자열로 바꾼 새 문자열을 반환한다', ['패턴과 일치하는 첫 부분만 삭제한다', '원본 문자열을 직접 수정한다(반환값 없음)', '패턴과 전혀 일치하지 않아야만 동작한다'],
          'ReplaceAllString은 일치하는 모든 부분을 바꾼 새 문자열을 만들어 반환해요.',
          '"모두(All) 바꾼다"는 이름 그대로예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>[0-9]+</code> 패턴을 <code>re</code>로 컴파일하고, <code>re.FindString("우편번호는 12345입니다")</code>를 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 're := regexp.MustCompile("[0-9]+")\nfmt.Println(re.FindString("우편번호는 12345입니다"))',
          accept: ['re := regexp.MustCompile("[0-9]+")\nfmt.Println(re.FindString("우편번호는 12345입니다"))'],
          why: 'MustCompile로 패턴을 컴파일하고, FindString으로 처음 일치하는 부분을 찾아 출력해요.',
          hint: 're := regexp.MustCompile("[0-9]+") 다음 fmt.Println(re.FindString(...))을 쓰세요.'
        }),
      ],
      boss: () => {
        const phone = `${randInt(10, 99)}-${randInt(1000, 9999)}`;
        return {
          type: 'blank',
          q: `<code>re := regexp.MustCompile("[0-9]+")</code>이고 <code>re.ReplaceAllString("전화 ${phone}", "*")</code>를 실행하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`전화 *-*`], placeholder: '결과 문자열',
          why: `숫자로 이루어진 두 부분(각각 하나의 [0-9]+ 일치)이 모두 "*"로 바뀌어 "전화 *-*"가 돼요.`,
          hint: '하이픈으로 나뉜 두 숫자 덩어리가 각각 하나의 일치 부분이에요.'
        };
      }
    },
    {
      id: 'osExecCommand',
      title: 'os/exec로 외부 명령 실행하기',
      ready: true,
      summary: 'Go 프로그램에서 다른 프로그램(외부 명령)을 실행하고 그 결과를 받아오는 os/exec 패키지를 배워요.',
      goals: ['exec.Command로 외부 명령 준비하기', 'Output()으로 실행하고 표준 출력 받기', '에러 처리와 종료 코드 확인하기'],
      blocks: [
        {
          h: '외부 명령 실행하기: exec.Command',
          html: `<p><code>exec.Command(이름, 인자들...)</code>은 실행할 외부 프로그램을 준비해요. 아직 실행되진 않고, <code>Run()</code>이나 <code>Output()</code> 같은 메서드를 불러야 실제로 실행돼요.</p>`,
          code: {
            label: 'exec_command.go',
            lang: 'go',
            src: `cmd := exec.Command("echo", "안녕하세요")
output, err := cmd.Output()
if err != nil {
	fmt.Println("실행 실패:", err)
	return
}
fmt.Println(string(output))`,
            out: `안녕하세요`
          }
        },
        {
          h: '실패 처리하기',
          html: `<p>존재하지 않는 명령을 실행하거나, 명령이 0이 아닌 종료 코드로 끝나면 <code>Output()</code>이 에러를 반환해요. 외부 명령은 내가 통제할 수 없는 프로그램이므로, 항상 에러를 확인하는 습관이 중요해요.</p>`,
          code: {
            label: 'exec_error.go',
            lang: 'go',
            src: `cmd := exec.Command("존재하지않는명령")
_, err := cmd.Output()
if err != nil {
	fmt.Println("명령 실행 실패")
}`,
            out: `명령 실행 실패`
          },
          after: `<div class="note"><b>정리</b> — os/exec는 강력하지만, 사용자 입력을 그대로 명령 인자에 넣으면 보안 문제가 생길 수 있어서 항상 신중하게 다뤄야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'exec.Command("echo", "hi")를 호출한 시점의 동작은?',
          '실행할 명령을 준비만 할 뿐, 아직 실제로 실행되지는 않는다', ['호출 즉시 명령이 실행되고 결과가 반환된다', 'echo라는 이름의 Go 함수를 호출한다', '항상 에러를 발생시킨다'],
          'exec.Command는 실행 준비 객체를 만들 뿐이고, Run()이나 Output() 등을 불러야 실제로 실행돼요.',
          '"준비"와 "실행"은 서로 다른 단계예요.'
        ),
        () => ({
          type: 'blank',
          q: `준비된 명령을 실행하고 표준 출력을 바이트 슬라이스로 받는 메서드를 쓰세요.`,
          prefix: 'cmd.', suffix: '()', accept: ['Output'], placeholder: '메서드 이름',
          why: 'cmd.Output()은 명령을 실행하고, 그 표준 출력을 []byte로 돌려줘요.',
          hint: '"출력(Output)"을 그대로 가리키는 이름이에요.'
        }),
        () => ({
          type: 'blank',
          q: `외부 명령 실행 후 항상 에러를 확인해야 하는 이유를 설명하면? ("외부 프로그램은 내가 통제할 수 없어서 실패할 수 있기 때문에"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['외부 프로그램은 내가 통제할 수 없어서 실패할 수 있기 때문에'], placeholder: '설명',
          why: '외부 명령이 없거나, 권한이 없거나, 실행 중 실패할 수 있으므로 항상 에러 확인이 필요해요.',
          hint: '내 코드가 아니라 "다른 프로그램"이 실행되는 상황이에요.'
        }),
        () => makeChoice(
          '사용자 입력을 그대로 exec.Command의 인자에 넣을 때 주의해야 하는 이유는?',
          '검증 없이 넣으면 의도치 않은 명령이 실행되는 보안 문제가 생길 수 있어서', ['속도가 항상 느려지기 때문에', 'Go 컴파일러가 이를 자동으로 막아주기 때문에', '문자열 길이 제한이 있어서'],
          '사용자 입력을 검증 없이 명령 인자로 쓰면 예상치 못한 명령 실행으로 이어질 수 있어요.',
          '"신뢰할 수 없는 입력"을 그대로 명령에 넘기는 위험을 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"ls"</code> 명령을 준비하고 실행해서, 표준 출력을 문자열로 출력하는 코드를 작성하세요. (에러는 무시)',
          starter: '',
          rows: 2,
          placeholder: 'cmd := exec.Command("ls")\noutput, _ := cmd.Output()\nfmt.Println(string(output))',
          accept: ['cmd := exec.Command("ls")\noutput, _ := cmd.Output()\nfmt.Println(string(output))'],
          why: 'exec.Command로 명령을 준비하고, Output()으로 실행 결과를 받아 문자열로 변환해 출력해요.',
          hint: 'cmd := exec.Command("ls") 다음 cmd.Output()을 호출하세요.'
        }),
      ],
      boss: () => {
        const exists = Math.random() < 0.5;
        const cmdName = exists ? 'echo' : '없는명령123';
        return {
          type: 'blank',
          q: `<code>cmd := exec.Command("${cmdName}")</code>, <code>_, err := cmd.Output()</code>일 때, <code>err != nil</code>일 가능성이 더 높을까요? (예/아니오)`,
          prefix: '', suffix: '', accept: [exists ? '아니오' : '예'], placeholder: '예 / 아니오',
          why: exists
            ? '"echo"는 대부분의 시스템에 존재하는 명령이라 정상 실행되어 err이 nil일 가능성이 높아요.'
            : '존재하지 않는 명령을 실행하려 하면 시스템이 명령을 찾지 못해 err이 발생해요.',
          hint: '그 이름의 명령이 시스템에 실제로 존재하는지 생각해보세요.'
        };
      }
    },
    {
      id: 'envVariables',
      title: '환경 변수 다루기',
      ready: true,
      summary: '설정값을 코드에 하드코딩하지 않고 외부(환경 변수)에서 읽어오는 방법을 배워요.',
      goals: ['os.Getenv로 환경 변수 읽기', 'os.LookupEnv로 존재 여부까지 확인하기', '기본값을 두는 패턴'],
      blocks: [
        {
          h: '환경 변수 읽기: os.Getenv',
          html: `<p><code>os.Getenv(이름)</code>은 그 이름의 환경 변수 값을 문자열로 돌려줘요. 그런 환경 변수가 <b>없으면</b> 에러 없이 그냥 빈 문자열("")을 돌려줘요 — 있는지 없는지 구분하지 못한다는 점에 주의해야 해요.</p>`,
          code: {
            label: 'getenv_basic.go',
            lang: 'go',
            src: `port := os.Getenv("PORT")
if port == "" {
	port = "8080" // 기본값
}
fmt.Println("포트:", port)`,
            out: `포트: 8080`
          }
        },
        {
          h: '존재 여부까지 확인하기: os.LookupEnv',
          html: `<p><code>os.LookupEnv(이름)</code>은 값과 함께 "실제로 설정되어 있었는지"를 나타내는 <code>bool</code>도 함께 돌려줘요. 빈 문자열로 <b>일부러</b> 설정된 경우와, 아예 설정 안 된 경우를 구분해야 할 때 유용해요.</p>`,
          code: {
            label: 'lookupenv_basic.go',
            lang: 'go',
            src: `value, exists := os.LookupEnv("DEBUG")
if !exists {
	fmt.Println("DEBUG가 설정되지 않았어요")
} else {
	fmt.Println("DEBUG =", value)
}`,
            out: `DEBUG가 설정되지 않았어요`
          },
          after: `<div class="note"><b>정리</b> — 설정값을 코드에 직접 박아넣지 않고 환경 변수로 빼두면, 코드를 수정하지 않고도 배포 환경마다 다른 값을 쓸 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>os.Getenv("PORT")</code>에서 PORT라는 환경 변수가 설정되어 있지 않을 때의 반환값은?',
          '빈 문자열("")', ['nil', '패닉(프로그램 종료)', '"undefined"라는 문자열'],
          'os.Getenv는 없는 환경 변수에 대해서도 에러 없이 빈 문자열을 돌려줘요.',
          '에러를 내지 않고, 그냥 "" 을 돌려준다는 게 특징이에요.'
        ),
        () => ({
          type: 'blank',
          q: `환경 변수의 값과 함께, 실제로 설정되어 있었는지를 bool로 함께 알려주는 함수를 쓰세요.`,
          prefix: 'os.', suffix: '("DEBUG")', accept: ['LookupEnv'], placeholder: '함수 이름',
          why: 'os.LookupEnv는 (값, 존재 여부)를 함께 돌려줘서 빈 문자열 설정과 미설정을 구분할 수 있어요.',
          hint: '"찾아본다(Lookup)"는 의미의 이름이에요.'
        }),
        () => ({
          type: 'blank',
          q: `설정값을 코드에 직접 쓰지 않고 환경 변수로 빼두면 좋은 이유를 설명하면? ("코드를 수정하지 않고도 배포 환경마다 다른 값을 쓸 수 있기 때문에"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['코드를 수정하지 않고도 배포 환경마다 다른 값을 쓸 수 있기 때문에'], placeholder: '설명',
          why: '개발/테스트/운영 환경마다 다른 설정값(포트, DB 주소 등)을 코드 변경 없이 적용할 수 있어요.',
          hint: '"환경마다 다르게" 적용할 수 있다는 게 핵심이에요.'
        }),
        () => makeChoice(
          'os.Getenv 대신 os.LookupEnv를 써야 하는 상황은?',
          '빈 문자열로 일부러 설정된 경우와, 아예 설정 안 된 경우를 구분해야 할 때', ['환경 변수를 아예 사용하지 않을 때', '환경 변수 이름이 항상 대문자일 때', '프로그램을 종료하고 싶을 때'],
          'Getenv는 두 경우 모두 ""을 돌려주지만, LookupEnv는 exists로 구분할 수 있어요.',
          '"구분이 필요한가"가 선택 기준이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"PORT"</code> 환경 변수를 읽어 <code>port</code>에 저장하고, 비어있으면 "8080"을 기본값으로 쓰는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'port := os.Getenv("PORT")\nif port == "" {\n\tport = "8080"\n}',
          accept: ['port := os.Getenv("PORT")\nif port == "" {\n\tport = "8080"\n}'],
          why: 'os.Getenv로 읽은 값이 빈 문자열이면, if문으로 기본값을 대신 넣어줘요.',
          hint: 'port := os.Getenv("PORT") 다음 if port == "" { port = "8080" }을 쓰세요.'
        }),
      ],
      boss: () => {
        const isSet = Math.random() < 0.5;
        const value = pick(['production', 'staging', 'true']);
        return {
          type: 'blank',
          q: `환경 변수 <code>MODE</code>가 ${isSet ? `"${value}"로 설정되어 있어요` : '전혀 설정되어 있지 않아요'}. <code>value, exists := os.LookupEnv("MODE")</code>일 때 <code>exists</code>는? (true/false)`,
          prefix: '', suffix: '', accept: [String(isSet)], placeholder: 'true / false',
          why: isSet
            ? 'MODE가 실제로 설정되어 있으므로 exists는 true예요.'
            : 'MODE가 전혀 설정되어 있지 않으므로 exists는 false예요.',
          hint: 'LookupEnv의 두 번째 반환값은 "실제로 존재하는가"를 알려줘요.'
        };
      }
    },
    {
      id: 'gracefulShutdown',
      title: '우아한 종료(Graceful Shutdown) 패턴',
      ready: true,
      summary: '서버가 종료 신호를 받았을 때, 진행 중인 작업을 마치고 안전하게 꺼지도록 만드는 패턴을 배워요.',
      goals: ['signal.Notify로 종료 신호(Ctrl+C 등) 받기', 'context로 진행 중인 작업에 종료를 알리기', '자원을 정리하고 나서 프로그램을 끝내는 순서'],
      blocks: [
        {
          h: '문제: 갑자기 종료되면?',
          html: `<p>서버가 요청을 처리하는 도중에 프로그램이 갑자기 죽으면, 그 요청의 결과가 반쯤만 저장되거나 연결이 지저분하게 끊길 수 있어요. <b>우아한 종료</b>는 "지금 하던 일은 마무리하고 나서 꺼지는" 패턴이에요.</p>`,
          code: {
            label: 'signal_notify.go',
            lang: 'go',
            src: `sigCh := make(chan os.Signal, 1)
signal.Notify(sigCh, os.Interrupt, syscall.SIGTERM)

<-sigCh // Ctrl+C 등 종료 신호가 올 때까지 대기
fmt.Println("종료 신호 받음, 정리 시작")`
          }
        },
        {
          h: '진행 중인 작업에 종료 알리기',
          html: `<p>종료 신호를 받으면, context를 취소해서 진행 중인 고루틴들에게 "이제 그만해도 된다"고 알리고, 정리가 끝날 때까지 기다렸다가 프로그램을 마쳐요.</p>`,
          code: {
            label: 'graceful_shutdown.go',
            lang: 'go',
            src: `ctx, cancel := context.WithCancel(context.Background())

sigCh := make(chan os.Signal, 1)
signal.Notify(sigCh, os.Interrupt)

go func() {
	<-sigCh
	fmt.Println("종료 신호 받음")
	cancel() // 진행 중인 작업들에 취소 알림
}()

<-ctx.Done()
fmt.Println("정리 완료, 프로그램 종료")`
          },
          after: `<div class="note"><b>정리</b> — "신호 받기 → context 취소로 알리기 → 정리 시간 주기 → 종료"가 우아한 종료의 기본 흐름이에요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'signal.Notify(sigCh, os.Interrupt)의 역할은?',
          'Ctrl+C 같은 인터럽트 신호가 오면 sigCh 채널로 전달해준다', ['1초마다 자동으로 신호를 보낸다', '프로그램을 즉시 강제 종료시킨다', '모든 고루틴을 자동으로 취소한다'],
          'signal.Notify는 지정한 신호가 발생했을 때 채널로 알림을 보내도록 등록해요.',
          '"알림(Notify)"이라는 이름처럼, 신호가 오면 채널에 전달만 해요.'
        ),
        () => ({
          type: 'blank',
          q: `우아한 종료 패턴에서 종료 신호를 받은 뒤, 진행 중인 고루틴들에게 "그만해도 된다"고 알리는 데 흔히 쓰는 것을 쓰세요.`,
          prefix: '', suffix: '.WithCancel의 cancel() 호출', accept: ['context'], placeholder: '패키지/개념 이름',
          why: 'context를 취소하면, 그 context를 지켜보던 고루틴들이 취소 신호를 받아 정리 후 종료할 수 있어요.',
          hint: '앞서 배운, 취소 신호를 전파하는 패키지예요.'
        }),
        () => ({
          type: 'blank',
          q: `우아한 종료(graceful shutdown)가 필요한 이유를 설명하면? ("진행 중인 작업을 안전하게 마무리하고 나서 프로그램을 끝내기 위해"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['진행 중인 작업을 안전하게 마무리하고 나서 프로그램을 끝내기 위해'], placeholder: '설명',
          why: '갑자기 종료되면 처리 중이던 요청이나 자원 정리가 중간에 끊길 수 있어서, 마무리할 시간을 주는 거예요.',
          hint: '"안전하게 마무리"라는 표현이 핵심이에요.'
        }),
        () => makeChoice(
          '우아한 종료 패턴의 일반적인 흐름 순서로 알맞은 것은?',
          '종료 신호 받기 → 진행 중인 작업에 취소 알리기 → 정리 시간 주기 → 프로그램 종료', ['프로그램 종료 → 종료 신호 받기 → 작업 취소', '작업 취소 → 프로그램 시작 → 신호 받기', '정리 시간 주기 → 신호 무시 → 강제 종료'],
          '신호를 받은 뒤 취소를 알리고, 정리가 끝나길 기다렸다가 종료하는 순서예요.',
          '"신호 → 알림 → 정리 → 종료"의 순서를 기억하세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>os.Signal</code> 채널 <code>sigCh</code>(버퍼 1)를 만들고, <code>signal.Notify</code>로 <code>os.Interrupt</code> 신호를 등록하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'sigCh := make(chan os.Signal, 1)\nsignal.Notify(sigCh, os.Interrupt)',
          accept: ['sigCh := make(chan os.Signal, 1)\nsignal.Notify(sigCh, os.Interrupt)'],
          why: 'make로 버퍼 1인 채널을 만들고, signal.Notify로 os.Interrupt 신호를 그 채널로 받도록 등록해요.',
          hint: 'sigCh := make(chan os.Signal, 1) 다음 signal.Notify(sigCh, os.Interrupt)를 쓰세요.'
        }),
      ],
      boss: () => {
        const hasGraceful = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `서버가 요청을 처리하는 도중 종료 신호를 받았어요. ${hasGraceful ? '우아한 종료 패턴(context 취소 + 정리 대기)이 구현되어 있어요' : '아무 처리 없이 즉시 프로그램이 종료돼요'}. 처리 중이던 요청이 안전하게 마무리될 가능성이 더 높은 쪽은 어디일까요? ("우아한 종료" 또는 "즉시 종료")`,
          prefix: '', suffix: '', accept: [hasGraceful ? '우아한 종료' : '즉시 종료'], placeholder: '우아한 종료 / 즉시 종료',
          why: hasGraceful
            ? '우아한 종료는 정리할 시간을 주므로, 처리 중이던 요청을 안전하게 마무리할 가능성이 높아요.'
            : '즉시 종료는 정리할 시간이 없어서, 처리 중이던 요청이 중간에 끊길 위험이 커요.',
          hint: '정리할 시간이 있는지 없는지가 핵심이에요.'
        };
      }
    },
    {
      id: 'rateLimiting',
      title: '속도 제한(Rate Limiting) 패턴',
      ready: true,
      summary: 'time.Ticker를 활용해, 일정한 속도로만 작업을 처리하도록 제한하는 패턴을 배워요.',
      goals: ['time.Ticker로 일정 간격마다 신호 받기', '티커 신호를 기다렸다가 작업을 처리하는 패턴', '외부 API 호출 제한 등 실제 활용 사례'],
      blocks: [
        {
          h: '문제: 너무 빠르게 반복하면',
          html: `<p>외부 API에는 보통 "1초에 몇 번까지만 요청 가능"같은 제한이 있어요. 그 이상으로 빠르게 요청하면 거부당하거나 차단될 수 있어서, 요청 속도 자체를 코드에서 조절해야 해요.</p>`,
          code: {
            label: 'no_limit.go',
            lang: 'go',
            src: `for _, req := range requests {
	callAPI(req) // 제한 없이 최대한 빠르게 호출 → 차단 위험
}`
          }
        },
        {
          h: '해결: time.Ticker로 속도 조절하기',
          html: `<p><code>time.NewTicker(간격)</code>은 정해진 간격마다 값을 보내는 채널을 가진 티커를 만들어요. 매 작업 전에 그 채널에서 값을 받기를 기다리면, 자연스럽게 그 간격보다 빠르게 실행되지 않아요.</p>`,
          code: {
            label: 'rate_limit.go',
            lang: 'go',
            src: `ticker := time.NewTicker(200 * time.Millisecond)
defer ticker.Stop()

for _, req := range requests {
	<-ticker.C // 200ms마다 한 번씩만 진행
	callAPI(req)
}`
          },
          after: `<div class="note"><b>정리</b> — 티커를 다 쓴 뒤에는 반드시 Stop()을 불러서, 백그라운드에서 계속 값을 만들어내는 타이머 자원을 정리해줘야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'time.NewTicker(200 * time.Millisecond)의 역할은?',
          '200밀리초마다 반복해서 값을 보내는 채널을 가진 티커를 만든다', ['200밀리초 뒤에 딱 한 번만 값을 보낸다', '200밀리초 동안 프로그램을 완전히 멈춘다', '요청을 200개로 제한한다'],
          'Ticker는 time.After와 달리, 정해진 간격마다 계속 반복해서 값을 보내요.',
          '"반복"이 Ticker와 time.After의 결정적인 차이예요.'
        ),
        () => ({
          type: 'blank',
          q: `사용이 끝난 <code>ticker</code>의 내부 타이머 자원을 정리하기 위해 호출해야 하는 메서드를 쓰세요.`,
          prefix: 'ticker.', suffix: '()', accept: ['Stop'], placeholder: '메서드 이름',
          why: 'ticker.Stop()을 부르지 않으면 티커가 계속 백그라운드에서 값을 만들어내며 자원을 낭비해요.',
          hint: '"멈추다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'blank',
          q: `속도 제한(rate limiting)이 필요한 대표적인 이유를 설명하면? ("외부 API 등이 정해둔 요청 속도 제한을 넘지 않기 위해"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['외부 API 등이 정해둔 요청 속도 제한을 넘지 않기 위해'], placeholder: '설명',
          why: '많은 외부 서비스가 초당 요청 횟수를 제한하므로, 그 이상으로 빠르게 호출하면 거부되거나 차단될 수 있어요.',
          hint: '외부 서비스가 "너무 빠른 요청"을 어떻게 다루는지 생각해보세요.'
        }),
        () => makeChoice(
          '매 작업 전에 <code><-ticker.C</code>로 값을 기다리는 패턴이 하는 일은?',
          '티커가 설정한 간격이 지날 때까지 다음 작업을 자연스럽게 미룬다', ['작업을 병렬로 여러 개 동시에 실행한다', '작업을 완전히 건너뛴다', '항상 즉시 다음 작업으로 넘어간다'],
          'ticker.C에서 값을 받을 때까지 대기하므로, 그 간격보다 빠르게 다음 작업이 실행되지 않아요.',
          '"기다렸다가 진행한다"는 게 속도 제한의 핵심 메커니즘이에요.'
        ),
        () => ({
          type: 'code',
          q: '100밀리초 간격의 <code>ticker</code>를 만들고 <code>defer</code>로 <code>Stop()</code>을 예약하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'ticker := time.NewTicker(100 * time.Millisecond)\ndefer ticker.Stop()',
          accept: ['ticker := time.NewTicker(100 * time.Millisecond)\ndefer ticker.Stop()'],
          why: 'time.NewTicker로 티커를 만들고, defer로 Stop을 예약해서 자원을 확실히 정리해요.',
          hint: 'time.NewTicker(100 * time.Millisecond) 다음 defer ticker.Stop()을 쓰세요.'
        }),
      ],
      boss: () => {
        const interval = pick([100, 200, 500]);
        const requestCount = pick([3, 5, 10]);
        const totalMs = interval * (requestCount - 1);
        return {
          type: 'blank',
          q: `<code>ticker := time.NewTicker(${interval} * time.Millisecond)</code>이고, 매 요청 전에 <code><-ticker.C</code>로 기다린 뒤 처리하는 방식으로 ${requestCount}개의 요청을 처리해요. 첫 요청부터 마지막 요청까지 걸리는 최소 시간은 약 몇 밀리초일까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(totalMs)], placeholder: '숫자(밀리초)',
          why: `첫 요청은 바로 처리되고, 이후 ${requestCount - 1}번은 매번 ${interval}ms씩 기다려야 하므로 ${interval} × ${requestCount - 1} = ${totalMs}ms가 최소로 걸려요.`,
          hint: '첫 요청을 제외한 나머지 요청 수만큼 간격을 곱해보세요.'
        };
      }
    },
    {
      id: 'subtestsTRun',
      title: 't.Run 서브테스트와 t.Helper',
      ready: true,
      summary: '테이블 기반 테스트를 t.Run으로 이름 붙인 서브테스트로 나누고, 헬퍼 함수를 표시하는 법을 배워요.',
      goals: ['t.Run으로 이름 있는 서브테스트 만들기', '실패했을 때 어떤 케이스인지 바로 알아보기', 't.Helper로 헬퍼 함수 표시하기'],
      blocks: [
        {
          h: '이름 있는 서브테스트: t.Run',
          html: `<p>테이블 기반 테스트에서 그냥 반복문만 돌리면, 실패했을 때 "어떤 케이스"였는지 한눈에 알기 어려워요. <code>t.Run(이름, func(t *testing.T) {...})</code>으로 각 케이스에 이름을 붙이면, 실패 메시지에 그 이름이 함께 나와서 훨씬 찾기 쉬워요.</p>`,
          code: {
            label: 'subtest_basic.go',
            lang: 'go',
            src: `func TestAddTable(t *testing.T) {
	cases := []struct {
		name       string
		a, b, want int
	}{
		{"양수끼리", 2, 3, 5},
		{"0 더하기", 0, 0, 0},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			if got := Add(c.a, c.b); got != c.want {
				t.Errorf("Add(%d, %d) = %d; 원하는 값은 %d", c.a, c.b, got, c.want)
			}
		})
	}
}`
          }
        },
        {
          h: '헬퍼 함수 표시하기: t.Helper',
          html: `<p>여러 테스트에서 공통으로 쓰는 검증 함수를 만들 때, 그 함수 맨 앞에 <code>t.Helper()</code>를 부르면, 실패했을 때 그 헬퍼 함수의 줄 번호가 아니라 <b>그 헬퍼를 호출한 테스트 코드의 줄 번호</b>가 표시돼서 디버깅이 쉬워져요.</p>`,
          code: {
            label: 'test_helper.go',
            lang: 'go',
            src: `func assertEqual(t *testing.T, got, want int) {
	t.Helper()
	if got != want {
		t.Errorf("got %d, want %d", got, want)
	}
}`
          },
          after: `<div class="note"><b>정리</b> — t.Run은 "어떤 케이스가 실패했는지"를, t.Helper는 "실패가 코드의 어느 줄에서 비롯됐는지"를 더 명확하게 알려줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const names = ['첫번째 케이스', '두번째 케이스', '경계값 케이스'];
          return {
            type: 'blank',
            q: `<code>t.Run("${names[0]}", func(t *testing.T) { ... })</code>처럼 서브테스트에 이름을 붙이는 주된 이유를 설명하면? ("어떤 케이스가 실패했는지 실패 메시지에서 바로 알아보기 위해"라고 답하세요)`,
            prefix: '', suffix: '', accept: ['어떤 케이스가 실패했는지 실패 메시지에서 바로 알아보기 위해'], placeholder: '설명',
            why: '이름 없이 반복문만 돌리면, 여러 케이스 중 정확히 어떤 게 실패했는지 메시지만으로 알기 어려워요.',
            hint: '"어떤 것이 실패했는지 구분하기 위해"라는 목적을 떠올려보세요.'
          };
        },
        () => makeChoice(
          't.Run(이름, func(t *testing.T) {...})의 역할은?',
          '주어진 이름을 가진 독립적인 서브테스트로 그 함수를 실행한다', ['테스트를 항상 병렬로 실행되게 강제한다', '테스트 이름을 무작위로 바꾼다', '테스트 결과를 파일에 저장한다'],
          't.Run은 이름이 붙은 하위 테스트를 만들어 실행하고, 그 결과를 테스트 이름과 함께 보고해요.',
          '"이름을 가진 하위 테스트"라는 개념이 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `공통 검증 로직을 담은 헬퍼 함수의 맨 앞에서 호출해, 실패 위치가 헬퍼 내부가 아니라 호출한 테스트 코드로 표시되게 하는 메서드를 쓰세요.`,
          prefix: 't.', suffix: '()', accept: ['Helper'], placeholder: '메서드 이름',
          why: 't.Helper()를 부르면, 실패 시 보고되는 줄 번호가 헬퍼 함수를 호출한 지점으로 표시돼요.',
          hint: '"도우미(Helper)"라는 이름 그대로예요.'
        }),
        () => makeChoice(
          't.Helper()를 호출하지 않은 헬퍼 함수에서 검증이 실패하면?',
          '실패 위치가 헬퍼 함수 내부의 줄로 표시되어, 어떤 테스트에서 호출했는지 바로 알기 어려울 수 있다', ['테스트가 항상 자동으로 통과 처리된다', '프로그램이 즉시 강제 종료된다', 't.Errorf 자체가 동작하지 않는다'],
          't.Helper()가 없으면 실패 위치가 헬퍼 함수 내부로 표시돼서, 실제 호출한 테스트를 찾기 번거로워요.',
          '"어디서 실패로 보고되는가"의 차이예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>cases</code>(각 원소는 <code>name</code>, <code>a</code>, <code>b</code>, <code>want</code> 필드)를 순회하며, 각 케이스를 <code>t.Run(c.name, ...)</code>으로 실행하는 코드를 작성하세요. (내부에서 Add(c.a, c.b)가 c.want와 다르면 t.Errorf)',
          starter: '',
          rows: 5,
          placeholder: 'for _, c := range cases {\n\tt.Run(c.name, func(t *testing.T) {\n\t\tif got := Add(c.a, c.b); got != c.want {\n\t\t\tt.Errorf("실패")\n\t\t}\n\t})\n}',
          accept: ['for _, c := range cases {\n\tt.Run(c.name, func(t *testing.T) {\n\t\tif got := Add(c.a, c.b); got != c.want {\n\t\t\tt.Errorf("실패")\n\t\t}\n\t})\n}'],
          why: 'cases를 순회하며 각 케이스를 t.Run으로 이름 붙여 실행하고, 내부에서 결과를 확인해요.',
          hint: 'for _, c := range cases { t.Run(c.name, func(t *testing.T) { ... }) } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const cases = [
          { name: '양수 더하기', a: randInt(1, 10), b: randInt(1, 10) },
          { name: '0과 더하기', a: 0, b: randInt(1, 10) },
        ];
        const failIdx = Math.random() < 0.5 ? randInt(0, 1) : -1;
        return {
          type: 'blank',
          q: `<code>t.Run("${cases[0].name}", ...)</code>에서 Add(${cases[0].a}, ${cases[0].b})의 want가 ${failIdx === 0 ? cases[0].a + cases[0].b + 1 : cases[0].a + cases[0].b}이고, <code>t.Run("${cases[1].name}", ...)</code>에서 Add(${cases[1].a}, ${cases[1].b})의 want가 ${failIdx === 1 ? cases[1].a + cases[1].b + 1 : cases[1].a + cases[1].b}이에요(Add는 정상적으로 a+b를 반환). 실패하는 서브테스트의 이름은 무엇일까요? (없으면 "없음")`,
          prefix: '', suffix: '', accept: [failIdx === -1 ? '없음' : cases[failIdx].name], placeholder: '서브테스트 이름',
          why: failIdx === -1
            ? '두 케이스 모두 want가 실제 a+b와 일치하므로 실패하는 서브테스트가 없어요.'
            : `"${cases[failIdx].name}"의 want가 실제 a+b와 달라서 그 서브테스트만 실패해요.`,
          hint: '각 케이스의 want가 실제 a+b와 같은지 하나씩 비교해보세요.'
        };
      }
    },
    {
      id: 'buildTags',
      title: '빌드 태그로 코드 조건부 포함하기',
      ready: true,
      summary: '운영체제나 환경에 따라 특정 파일만 컴파일에 포함시키는 빌드 태그(build tag)를 배워요.',
      goals: ['//go:build 태그의 위치와 형식', '태그로 운영체제별 코드 나누기', '파일명 규칙(_linux.go 등)으로도 나눌 수 있다는 것'],
      blocks: [
        {
          h: '조건에 따라 파일을 포함시키기',
          html: `<p><code>//go:build</code> 주석을 파일 맨 위(패키지 선언 바로 위, 그 사이엔 빈 줄이 필요해요)에 쓰면, 그 조건을 만족할 때만 해당 파일이 컴파일에 포함돼요. 예를 들어 <code>//go:build linux</code>는 리눅스에서 빌드할 때만 그 파일을 포함시켜요.</p>`,
          code: {
            label: 'config_linux.go',
            lang: 'go',
            src: `//go:build linux

package config

func Platform() string {
	return "linux 전용 설정"
}`
          }
        },
        {
          h: '파일명 규칙으로도 나눌 수 있어요',
          html: `<p>파일 이름 끝에 <code>_linux.go</code>, <code>_windows.go</code>처럼 운영체제 이름을 붙이면, 빌드 태그 없이도 Go가 자동으로 그 운영체제에서만 포함시켜요. 두 방법 모두 "이 파일은 특정 조건에서만 컴파일에 들어간다"는 같은 목적을 가져요.</p>`,
          code: {
            label: 'config_windows.go',
            lang: 'go',
            src: `package config

func Platform() string {
	return "windows 전용 설정"
}`
          },
          after: `<div class="note"><b>정리</b> — 빌드 태그는 "이 코드는 특정 상황(운영체제, 테스트 전용 등)에서만 컴파일하고 싶다"는 요구를 해결해줘요. 테스트에서만 쓸 헬퍼 코드를 분리할 때도 자주 활용돼요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>//go:build linux</code>가 파일 맨 위에 있을 때의 효과는?',
          '리눅스 환경에서 빌드할 때만 그 파일이 컴파일에 포함된다', ['모든 운영체제에서 항상 포함된다', '파일이 항상 무시되고 컴파일되지 않는다', '리눅스에서는 오히려 제외된다'],
          '//go:build linux는 "linux일 때만 포함"이라는 조건을 나타내요.',
          '조건을 만족할 때 "포함"된다는 점을 기억하세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>//go:build</code> 주석과 <code>package</code> 선언 사이에는 무엇이 있어야 할까요? (한 단어로: "빈 줄")`,
          prefix: '', suffix: '', accept: ['빈 줄'], placeholder: '무엇이 필요한가',
          why: '//go:build 지시자는 반드시 빈 줄을 하나 두고 package 선언이 이어져야 올바르게 인식돼요.',
          hint: '주석과 코드 사이에 한 줄을 비워둬야 해요.'
        }),
        () => ({
          type: 'blank',
          q: `빌드 태그가 필요한 상황을 설명하면? ("운영체제나 환경에 따라 특정 코드만 컴파일에 포함시키고 싶을 때"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['운영체제나 환경에 따라 특정 코드만 컴파일에 포함시키고 싶을 때'], placeholder: '설명',
          why: '같은 함수라도 운영체제마다 구현이 달라야 할 때, 빌드 태그로 그 환경에 맞는 파일만 포함시켜요.',
          hint: '"환경에 따라 다른 코드"가 필요한 상황을 생각해보세요.'
        }),
        () => makeChoice(
          '빌드 태그 없이, 파일 이름만으로도 운영체제별 컴파일을 나누는 방법은?',
          '파일 이름 끝에 _linux.go, _windows.go처럼 운영체제 이름을 붙인다', ['파일 이름을 모두 대문자로 쓴다', '파일 확장자를 .golang으로 바꾼다', '패키지 이름에 운영체제 이름을 넣는다'],
          'Go는 _linux.go, _windows.go 같은 파일명 접미사도 빌드 태그처럼 인식해요.',
          '파일명 "끝부분"에 운영체제 이름을 붙이는 규칙이에요.'
        ),
        () => ({
          type: 'code',
          q: '리눅스 환경에서만 컴파일되도록 하는 <code>//go:build</code> 지시자를 파일 맨 위에 작성하세요. (빈 줄 포함, 그 아래 package config까지)',
          starter: '',
          rows: 3,
          placeholder: '//go:build linux\n\npackage config',
          accept: ['//go:build linux\n\npackage config'],
          why: '//go:build linux 다음 빈 줄을 두고 package 선언이 이어져야 해요.',
          hint: '//go:build linux 다음 줄을 비우고 package config를 쓰세요.'
        }),
      ],
      boss: () => {
        const os1 = pick(['linux', 'darwin', 'windows']);
        return {
          type: 'blank',
          q: `<code>a_${os1}.go</code>라는 이름의 파일이 있어요(빌드 태그는 따로 없음). 이 파일은 어떤 운영체제에서 빌드할 때 컴파일에 포함될까요? (그대로 입력)`,
          prefix: '', suffix: '', accept: [os1], placeholder: '운영체제 이름',
          why: `파일명 끝의 "_${os1}"는 빌드 태그처럼 작동해서, ${os1} 환경에서 빌드할 때만 포함돼요.`,
          hint: '파일명 접미사가 곧 그 운영체제 전용이라는 표시예요.'
        };
      }
    },
    {
      id: 'reflectionBasics',
      title: 'reflect로 타입 들여다보기',
      ready: true,
      summary: '실행 중에 값의 타입과 필드 정보를 알아내는 reflect 패키지의 기초를 배워요.',
      goals: ['reflect.TypeOf로 타입 정보 얻기', 'reflect.ValueOf로 값 정보 얻기', 'reflect를 남용하면 안 되는 이유'],
      blocks: [
        {
          h: '타입 정보 얻기: reflect.TypeOf',
          html: `<p><code>reflect.TypeOf(값)</code>은 그 값의 타입 정보를 <code>reflect.Type</code>으로 돌려줘요. 어떤 타입이 들어올지 컴파일 시점에는 알 수 없는 범용 코드(예: JSON 인코더)를 만들 때 유용해요.</p>`,
          code: {
            label: 'reflect_typeof.go',
            lang: 'go',
            src: `type Student struct {
	Name string
	Age  int
}

s := Student{Name: "지수", Age: 17}
t := reflect.TypeOf(s)
fmt.Println(t.Name())        // Student
fmt.Println(t.NumField())    // 2`,
            out: `Student\n2`
          }
        },
        {
          h: '값 정보 얻기: reflect.ValueOf',
          html: `<p><code>reflect.ValueOf(값)</code>은 그 값 자체를 <code>reflect.Value</code>로 감싸서, 필드 값을 하나씩 꺼내볼 수 있게 해줘요. 다만 reflect는 코드를 복잡하고 느리게 만들 수 있어서, 정말 필요할 때(범용 라이브러리 등)만 신중하게 써야 해요.</p>`,
          code: {
            label: 'reflect_valueof.go',
            lang: 'go',
            src: `v := reflect.ValueOf(s)
for i := 0; i < v.NumField(); i++ {
	fmt.Println(v.Field(i))
}`,
            out: `지수\n17`
          },
          after: `<div class="note"><b>정리</b> — reflect는 "타입을 몰라도 되는" 강력한 도구지만, 컴파일 시점 타입 검사의 안전성을 포기하는 셈이라서 정말 필요한 곳(직렬화 라이브러리 등)에서만 아껴 써야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const structName = pick(['Student', 'Player', 'Book']);
          const fieldCount = randInt(2, 5);
          return {
            type: 'blank',
            q: `<code>type ${structName} struct</code>에 필드가 ${fieldCount}개 있고, <code>t := reflect.TypeOf(값)</code>일 때 <code>t.NumField()</code>는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(fieldCount)], placeholder: '숫자',
            why: `t.NumField()는 그 구조체가 가진 필드의 개수(${fieldCount}개)를 돌려줘요.`,
            hint: 'NumField는 "필드 개수"를 뜻해요.'
          };
        },
        () => makeChoice(
          'reflect.TypeOf(값)이 돌려주는 것은?',
          '그 값의 타입 정보(이름, 필드 개수 등)를 담은 reflect.Type', ['그 값을 문자열로 변환한 결과', '그 값의 메모리 주소', '그 값이 nil인지 여부만'],
          'TypeOf는 값이 아니라 "타입 자체"에 대한 정보를 알려줘요.',
          '"Type"이라는 이름 그대로, 타입 정보를 다뤄요.'
        ),
        () => ({
          type: 'blank',
          q: `reflect를 신중하게, 필요한 곳에서만 써야 하는 이유를 설명하면? ("코드가 복잡해지고 느려질 수 있으며 컴파일 시점 타입 검사의 안전성을 잃기 때문에"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['코드가 복잡해지고 느려질 수 있으며 컴파일 시점 타입 검사의 안전성을 잃기 때문에'], placeholder: '설명',
          why: 'reflect는 실행 중에 타입을 다루는 만큼, 컴파일러가 미리 잡아줄 수 있는 오류를 놓치기 쉽고 성능도 떨어질 수 있어요.',
          hint: '"안전성"과 "성능" 두 가지를 모두 생각해보세요.'
        }),
        () => makeChoice(
          'reflect 패키지가 실제로 유용하게 쓰이는 대표적인 상황은?',
          'JSON 인코더처럼, 어떤 타입이 들어올지 미리 알 수 없는 범용 라이브러리를 만들 때', ['모든 일반적인 비즈니스 로직 코드를 짤 때', '변수 이름을 자동으로 바꿔야 할 때', '고루틴 개수를 자동으로 조절할 때'],
          '타입을 미리 알 수 없는 범용 코드(직렬화, ORM 등)에서 reflect가 자주 쓰여요.',
          '"타입을 몰라도 동작해야 하는" 라이브러리를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>s</code>(임의의 구조체 값)에 대해, <code>reflect.TypeOf(s)</code>의 결과를 <code>t</code>에 담고 <code>t.Name()</code>을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 't := reflect.TypeOf(s)\nfmt.Println(t.Name())',
          accept: ['t := reflect.TypeOf(s)\nfmt.Println(t.Name())'],
          why: 'reflect.TypeOf로 타입 정보를 얻고, Name()으로 그 타입의 이름을 출력해요.',
          hint: 't := reflect.TypeOf(s) 다음 fmt.Println(t.Name())을 쓰세요.'
        }),
      ],
      boss: () => {
        const structName = pick(['Order', 'Account', 'Ticket']);
        const fieldCount = randInt(2, 6);
        return {
          type: 'blank',
          q: `<code>type ${structName} struct</code>에 필드가 ${fieldCount}개 있어요. <code>v := reflect.ValueOf(값)</code>일 때, <code>for i := 0; i < v.NumField(); i++ { ... }</code> 반복문은 총 몇 번 실행될까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(fieldCount)], placeholder: '숫자',
          why: `v.NumField()는 필드 개수(${fieldCount})를 돌려주므로, 반복문은 ${fieldCount}번 실행돼요.`,
          hint: '반복 횟수는 구조체의 필드 개수와 같아요.'
        };
      }
    },
    {
      id: 'stringsBuilder',
      title: 'strings.Builder로 효율적으로 문자열 이어붙이기',
      ready: true,
      summary: '반복문에서 +로 문자열을 계속 이어붙일 때 생기는 낭비를, strings.Builder로 줄이는 법을 배워요.',
      goals: ['+로 문자열을 반복해서 이어붙일 때의 문제', 'strings.Builder의 WriteString 사용법', 'String()으로 최종 결과 꺼내기'],
      blocks: [
        {
          h: '문제: +로 계속 이어붙이면',
          html: `<p>Go의 문자열은 <b>불변(immutable)</b>이라서, <code>result += s</code>를 할 때마다 새로운 문자열이 통째로 만들어져요. 반복문 안에서 이 작업을 수천 번 하면, 그때마다 복사가 일어나 낭비가 커져요.</p>`,
          code: {
            label: 'string_concat_naive.go',
            lang: 'go',
            src: `result := ""
for i := 0; i < 1000; i++ {
	result += "a" // 매번 새 문자열을 통째로 새로 만듦
}`
          }
        },
        {
          h: '해결: strings.Builder',
          html: `<p><code>strings.Builder</code>는 내부에 버퍼를 두고 <code>WriteString</code>으로 이어 붙일 내용을 계속 추가만 해요. 매번 새 문자열을 만들지 않기 때문에 훨씬 효율적이고, 마지막에 <code>String()</code>으로 최종 결과를 한 번만 꺼내면 돼요.</p>`,
          code: {
            label: 'string_builder.go',
            lang: 'go',
            src: `var sb strings.Builder
for i := 0; i < 1000; i++ {
	sb.WriteString("a")
}
result := sb.String()
fmt.Println(len(result))`,
            out: `1000`
          },
          after: `<div class="note"><b>정리</b> — 몇 번 안 되는 이어붙이기라면 +도 충분하지만, 반복문 안에서 많이 이어붙일 때는 strings.Builder가 훨씬 효율적이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = pick([3, 5, 10]);
          const ch = pick(['x', 'y', 'z']);
          return {
            type: 'blank',
            q: `<code>var sb strings.Builder; for i := 0; i < ${n}; i++ { sb.WriteString("${ch}") }; fmt.Println(sb.String())</code>을 실행하면? (그대로 입력)`,
            prefix: '', suffix: '', accept: [ch.repeat(n)], placeholder: '결과 문자열',
            why: `"${ch}"를 ${n}번 이어 붙이므로 "${ch.repeat(n)}"이 돼요.`,
            hint: 'WriteString이 호출된 횟수만큼 문자가 이어 붙어요.'
          };
        },
        () => makeChoice(
          'Go에서 반복문 안에 <code>result += s</code>를 많이 반복하면 비효율적인 이유는?',
          '문자열이 불변이라서, 이어붙일 때마다 새로운 문자열 전체를 다시 만들어야 하기 때문에', ['+연산자가 Go에서 지원되지 않기 때문에', '문자열은 최대 길이가 정해져 있기 때문에', 'for문 자체가 항상 느리기 때문에'],
          '문자열이 불변이라, +=할 때마다 이전 내용을 포함한 새 문자열을 통째로 새로 할당해요.',
          '"불변(immutable)"이라는 특성이 핵심 이유예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>strings.Builder</code>에 문자열을 추가할 때 사용하는 메서드를 쓰세요.`,
          prefix: 'sb.', suffix: '("텍스트")', accept: ['WriteString'], placeholder: '메서드 이름',
          why: 'sb.WriteString(s)은 내부 버퍼에 s를 이어 붙여요.',
          hint: '"문자열(String)을 쓴다(Write)"는 이름 그대로예요.'
        }),
        () => makeChoice(
          'strings.Builder에 다 쓰고 나서, 최종 문자열 결과를 꺼내는 방법은?',
          'sb.String()을 호출한다', ['sb를 그냥 문자열처럼 출력한다', 'sb.Result()를 호출한다', 'sb를 []byte로 강제 형변환한다'],
          'String() 메서드가 지금까지 쌓인 내용을 하나의 문자열로 돌려줘요.',
          '"String을 반환한다"는 이름 그대로예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>strings.Builder</code> 변수 <code>sb</code>를 선언하고, "안녕"과 "하세요"를 순서대로 WriteString한 뒤, <code>sb.String()</code>을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'var sb strings.Builder\nsb.WriteString("안녕")\nsb.WriteString("하세요")\nfmt.Println(sb.String())',
          accept: ['var sb strings.Builder\nsb.WriteString("안녕")\nsb.WriteString("하세요")\nfmt.Println(sb.String())'],
          why: 'var로 Builder를 선언하고, WriteString을 두 번 호출해 이어 붙인 뒤 String()으로 꺼내 출력해요.',
          hint: 'var sb strings.Builder 다음 WriteString을 두 번, 그리고 fmt.Println(sb.String())을 쓰세요.'
        }),
      ],
      boss: () => {
        const words = shuffle(['가', '나', '다', '라']).slice(0, 3);
        return {
          type: 'blank',
          q: `<code>var sb strings.Builder</code>이고 <code>sb.WriteString("${words[0]}")</code>, <code>sb.WriteString("${words[1]}")</code>, <code>sb.WriteString("${words[2]}")</code>를 순서대로 호출한 뒤 <code>sb.String()</code>을 출력하면? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`${words[0]}${words[1]}${words[2]}`], placeholder: '결과 문자열',
          why: `WriteString이 호출된 순서대로 이어 붙으므로 "${words[0]}${words[1]}${words[2]}"가 돼요.`,
          hint: '호출된 순서 그대로 이어 붙어요.'
        };
      }
    },
    {
      id: 'deferArgEval',
      title: 'defer 인자 평가 시점의 함정',
      ready: true,
      summary: 'defer에 넘긴 함수의 인자가 "defer를 쓴 그 순간"에 이미 평가된다는 중요한 규칙을 배워요.',
      goals: ['defer 문의 인자는 defer가 실행될 때 즉시 평가됨', '실행 자체만 함수 끝으로 미뤄진다는 것', '이름 붙은 반환값과 defer를 함께 쓸 때의 차이'],
      blocks: [
        {
          h: '함정: 인자는 그 순간에 이미 평가돼요',
          html: `<p><code>defer</code>는 "함수 호출을 미루는" 것이지, "인자 평가를 미루는" 것이 아니에요. <code>defer fmt.Println(i)</code>를 만나는 순간, <code>i</code>의 값이 그 즉시 복사되어 저장되고, 나중에 실행될 때는 그 저장된 값을 그대로 써요.</p>`,
          code: {
            label: 'defer_eval_trap.go',
            lang: 'go',
            src: `func main() {
	i := 0
	defer fmt.Println("defer 시점 i:", i) // 지금 i(0)이 바로 저장됨
	i = 100
	fmt.Println("현재 i:", i)
}`,
            out: `현재 i: 100\ndefer 시점 i: 0`
          }
        },
        {
          h: '이름 붙은 반환값은 다르게 동작해요',
          html: `<p>익명 함수(클로저)로 defer하면 이야기가 달라져요. <code>defer func() { ... }()</code> 안에서 <b>이름 붙은 반환값</b>(named return)을 참조하면, 그 반환값은 함수가 끝나는 순간의 최신 값을 읽고 심지어 바꿀 수도 있어요.</p>`,
          code: {
            label: 'defer_named_return.go',
            lang: 'go',
            src: `func compute() (result int) {
	defer func() {
		result *= 2 // 반환 직전, 반환값을 다시 바꿈
	}()
	result = 5
	return result
}`
          },
          after: `<div class="note"><b>정리</b> — "defer 문 자체의 인자"는 그 즉시 평가되지만, "defer된 함수 내부에서 참조하는 변수"는 실행 시점의 최신 값을 봐요. 이 둘을 헷갈리지 않는 게 중요해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const start = randInt(0, 5);
          const changed = randInt(10, 50);
          return {
            type: 'blank',
            q: `<code>i := ${start}; defer fmt.Println("값:", i); i = ${changed}; fmt.Println("현재:", i)</code>를 실행하면, 출력 순서는? (줄바꿈으로 구분해서 순서대로 입력)`,
            prefix: '', suffix: '', accept: [`현재: ${changed}\n값: ${start}`], placeholder: '출력 순서',
            why: `defer문의 인자 i는 defer를 만난 그 순간(${start})에 이미 평가되어 저장되므로, "현재: ${changed}"가 먼저, "값: ${start}"가 나중에 출력돼요.`,
            hint: 'defer의 인자는 defer를 "쓰는 순간" 평가돼요. 실행만 미뤄져요.'
          };
        },
        () => makeChoice(
          '<code>defer fmt.Println(i)</code>에서 i의 값이 평가(고정)되는 시점은?',
          'defer 문을 만나는 그 순간', ['fmt.Println이 실제로 실행되는(함수가 끝나는) 시점', '프로그램이 시작되는 시점', 'i가 마지막으로 바뀌는 시점'],
          'defer는 "실행"만 미룰 뿐, 인자 값 자체는 defer 문을 만나는 즉시 평가돼서 저장돼요.',
          '"평가"와 "실행"은 서로 다른 시점에 일어나요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>defer func() { result *= 2 }()</code>처럼 익명 함수 안에서 <b>이름 붙은 반환값</b>(named return)을 다루면 왜 결과가 바뀔 수 있는지 설명하면? ("이름 붙은 반환값은 함수가 끝나는 순간의 값을 참조하고 바꿀 수 있기 때문에"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['이름 붙은 반환값은 함수가 끝나는 순간의 값을 참조하고 바꿀 수 있기 때문에'], placeholder: '설명',
          why: '익명 함수는 클로저로 바깥의 named return 변수를 그대로 참조하므로, 함수가 끝나기 직전에 그 값을 바꿀 수 있어요.',
          hint: '값 복사(defer 인자)와 변수 참조(클로저)의 차이를 생각해보세요.'
        }),
        () => makeChoice(
          '<code>func compute() (result int) { defer func() { result *= 2 }(); result = 5; return result }</code>의 반환값은?',
          '10', ['5', '0', '2'],
          'result가 5로 설정된 뒤 return되지만, defer된 클로저가 반환 직전 result를 2배로 바꿔서 최종적으로 10이 반환돼요.',
          'return 이후에도 defer된 클로저가 named return 값을 한 번 더 바꿀 수 있어요.'
        ),
        () => ({
          type: 'code',
          q: '<code>i := 0</code>을 선언하고, <code>defer fmt.Println("값:", i)</code>로 지금 시점의 i를 예약한 뒤, <code>i</code>를 <code>10</code>으로 바꾸는 코드를 작성하세요. (세 줄)',
          starter: '',
          rows: 3,
          placeholder: 'i := 0\ndefer fmt.Println("값:", i)\ni = 10',
          accept: ['i := 0\ndefer fmt.Println("값:", i)\ni = 10'],
          why: 'defer 문의 인자 i는 이 시점(0)에 이미 평가되어, 나중에 i가 10으로 바뀌어도 출력엔 영향을 주지 않아요.',
          hint: 'i := 0 다음 defer fmt.Println("값:", i), 그 다음 i = 10을 쓰세요.'
        }),
      ],
      boss: () => {
        const start = randInt(1, 10);
        const multiplier = pick([2, 3]);
        return {
          type: 'blank',
          q: `<code>func compute() (result int) { defer func() { result *= ${multiplier} }(); result = ${start}; return result }</code>를 호출하면 반환값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(start * multiplier)], placeholder: '숫자',
          why: `result가 ${start}로 설정된 뒤, defer된 클로저가 반환 직전 result를 ${multiplier}배로 바꾸므로 ${start} × ${multiplier} = ${start * multiplier}이 반환돼요.`,
          hint: 'named return을 참조하는 defer 클로저는 반환 직전에 값을 한 번 더 바꿀 수 있어요.'
        };
      }
    }],
  tierBoss: {
    beginner: () => ({
      type: 'code',
      q: '<code>score</code>(int, 값 90)를 <code>:=</code>로 선언하고, <code>score</code>가 60 이상이면 "합격"을, 아니면 "불합격"을 출력하는 코드를 작성하세요.',
      starter: '',
      rows: 6,
      placeholder: 'score := 90\nif score >= 60 {\n\tfmt.Println("합격")\n} else {\n\tfmt.Println("불합격")\n}',
      accept: ['score := 90\nif score >= 60 {\n\tfmt.Println("합격")\n} else {\n\tfmt.Println("불합격")\n}'],
      why: ':=로 변수를 선언하고, if/else로 조건에 따라 다른 결과를 출력해요.',
      hint: 'score := 90 다음에 if score >= 60 { } else { }를 쓰세요.'
    }),
    intermediate: () => ({
      type: 'code',
      q: '두 정수 <code>a</code>, <code>b</code>를 받아 큰 값을 반환하는 함수 <code>max</code>를 작성하세요. (if/else 사용)',
      starter: '',
      rows: 6,
      placeholder: 'func max(a int, b int) int {\n\tif a > b {\n\t\treturn a\n\t}\n\treturn b\n}',
      accept: ['func max(a int, b int) int {\n\tif a > b {\n\t\treturn a\n\t}\n\treturn b\n}'],
      why: 'a가 b보다 크면 a를, 아니면 b를 반환하는 함수예요.',
      hint: 'func max(a int, b int) int { if a > b { return a }; return b } 형태를 떠올려보세요.'
    }),
    advanced: () => ({
      type: 'code',
      q: '<code>Name</code>(string), <code>Score</code>(int) 필드를 가진 구조체 <code>Player</code>를 정의하고, <code>Score</code>가 90 이상이면 true를 돌려주는 메서드 <code>IsTopScorer</code>를 작성하세요.',
      starter: '',
      rows: 8,
      placeholder: 'type Player struct {\n\tName  string\n\tScore int\n}\n\nfunc (p Player) IsTopScorer() bool {\n\treturn p.Score >= 90\n}',
      accept: ['type Player struct {\n\tName  string\n\tScore int\n}\n\nfunc (p Player) IsTopScorer() bool {\n\treturn p.Score >= 90\n}'],
      why: '구조체를 정의하고, 그 구조체를 리시버로 받는 메서드에서 Score 필드를 확인해요.',
      hint: 'type Player struct { } 다음에 func (p Player) IsTopScorer() bool { return p.Score >= 90 }을 쓰세요.'
    }),
  }
};
