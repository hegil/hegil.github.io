/* SQL 강의·문제 데이터 — 단원을 추가하려면 units 배열에 항목을 넣으면 됩니다. */
COURSES.sql = {
    name: 'SQL',
    tagline: '데이터베이스에서 원하는 정보를 찾아내는, 데이터를 다루는 필수 언어',
    units: [{
      id: 'select',
      title: '데이터 조회하기 (SELECT)',
      ready: true,
      summary: '엑셀표처럼 생긴 데이터베이스 표에서 원하는 정보만 꺼내오는 방법을 배워요.',
      goals: ['SELECT 문법', 'FROM으로 표 지정', '원하는 열만 고르기'],
      blocks: [
        {
          h: '데이터베이스는 "엑셀표 같은 것"이에요',
          html: `<p>데이터베이스 안의 <b>테이블(표)</b>은 엑셀 시트와 비슷해요. 세로줄은 "열(컬럼)", 가로줄은 "행(로우)"이라고 불러요. 아래는 <code>students</code>라는 표의 예시예요.</p>
                 <table>
                   <tr><th>id</th><th>name</th><th>age</th><th>city</th></tr>
                   <tr><td>1</td><td>지수</td><td>17</td><td>서울</td></tr>
                   <tr><td>2</td><td>민준</td><td>16</td><td>부산</td></tr>
                   <tr><td>3</td><td>서연</td><td>18</td><td>서울</td></tr>
                 </table>
                 <p>이 표에서 원하는 정보를 꺼내올 때 <code>SELECT</code> 문을 써요.</p>`,
          code: {
            label: 'select.sql',
            lang: 'sql',
            src: `SELECT name, age
FROM students;`,
            out: `name | age\n-----+----\n지수  | 17\n민준  | 16\n서연  | 18`
          }
        },
        {
          h: '모든 열을 다 보고 싶다면: *',
          html: `<p>특정 열 이름 대신 별표(<code>*</code>)를 쓰면 표에 있는 <b>모든 열</b>을 다 가져와요.</p>`,
          code: {
            label: 'select_all.sql',
            lang: 'sql',
            src: `SELECT * FROM students;`,
            out: `id | name | age | city\n---+------+-----+-----\n1  | 지수  | 17  | 서울\n2  | 민준  | 16  | 부산\n3  | 서연  | 18  | 서울`
          }
        },
        {
          h: '문장은 세미콜론으로 끝내요',
          html: `<p>SQL 문장은 보통 세미콜론(<code>;</code>)으로 끝나요. <code>SELECT</code>, <code>FROM</code> 같은 키워드는 대문자로 쓰는 게 관례지만, 사실 대소문자를 구분하지 않아도 실행은 돼요.</p>`,
          after: `<div class="note"><b>순서 기억하기</b> — <code>SELECT 어떤 열을 / FROM 어느 표에서</code> 순서로 읽으면 이해하기 쉬워요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const rows = randInt(3, 7);
          return {
            type: 'blank',
            q: `<code>students</code> 표에 학생이 ${rows}명 들어있을 때, <code>SELECT name FROM students;</code>를 실행하면 이름이 몇 개 나올까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(rows)], placeholder: '숫자',
            why: `<code>SELECT</code>는 조건이 없으면 표의 모든 행을 다 가져와요. 학생이 ${rows}명이니 ${rows}개가 나와요.`,
            hint: '조건(WHERE)이 없으면 표의 모든 행이 다 나와요.'
          };
        },
        () => ({
          type: 'blank',
          q: `표에 있는 모든 열을 한 번에 가져오고 싶을 때 열 이름 대신 쓰는 기호를 쓰세요.`,
          prefix: 'SELECT ', suffix: ' FROM students;', accept: ['*'], placeholder: '기호',
          why: '별표(<code>*</code>)는 "모든 열"이라는 뜻이에요.',
          hint: '수학에서 곱셈에 쓰는 그 기호예요.'
        }),
        () => ({
          type: 'blank',
          q: `<code>students</code> 표에서 데이터를 가져오려고 해요. "어느 표에서"를 나타내는 키워드를 빈칸에 쓰세요.`,
          prefix: 'SELECT name ', suffix: ' students;', accept: ['FROM', 'from'], placeholder: '키워드',
          why: '<code>FROM</code>은 "어느 표에서 가져올지"를 정해줘요.',
          hint: '"~로부터"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'SQL 문장 맨 끝에 관례적으로 붙이는 문장 부호는?',
          '<code>;</code>', ['<code>.</code>', '<code>!</code>', '<code>:</code>'],
          'SQL 문장은 보통 세미콜론(;)으로 끝나요.',
          '자바스크립트 문장 끝에도 자주 쓰는 그 문장 부호예요.'
        ),
        () => {
          const cols = shuffle(['name', 'age', 'city']).slice(0, 2);
          return {
            type: 'blank',
            q: `<code>students</code> 표에서 ${cols.join('과 ')} 두 열만 가져오려고 해요. 빈칸을 채우세요.`,
            prefix: 'SELECT ', suffix: ' FROM students;', accept: [cols.join(', '), cols.join(',')], placeholder: '열 이름, 열 이름',
            why: `여러 열을 가져올 땐 <code>SELECT ${cols.join(', ')}</code>처럼 쉼표로 구분해서 나열해요.`,
            hint: '열 이름 두 개를 쉼표(,)로 구분해서 나열하면 돼요.'
          };
        },
        () => ({
          type: 'code',
          q: 'students 표에서 name과 age 열만 가져오는 SQL을 작성하세요.',
          starter: '',
          placeholder: 'SELECT name, age FROM students;',
          accept: ['SELECT name, age FROM students;'],
          why: 'SELECT 뒤에 열 이름을 쉼표로 나열하고, FROM으로 표를 지정해요.',
          hint: 'SELECT name, age FROM students; 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const cols = shuffle(['name', 'age', 'city']).slice(0, 2);
        return {
          type: 'blank',
          q: `<code>students</code> 표에서 ${cols.join('과 ')} 열만 가져오는 SQL 문장을 처음부터 끝까지(세미콜론까지) 완성하세요.`,
          prefix: '', suffix: '', accept: [`SELECT ${cols.join(', ')} FROM students;`, `SELECT ${cols.join(',')} FROM students;`], placeholder: 'SELECT ... FROM ...;',
          why: `<code>SELECT ${cols.join(', ')} FROM students;</code>처럼 "어떤 열을 / 어느 표에서" 순서로 써요.`,
          hint: 'SELECT 열이름, 열이름 FROM 표이름; 순서를 그대로 따라 써보세요.'
        };
      }
    },
    {
      id: 'filter',
      title: '조건으로 거르고 정렬하기',
      ready: true,
      summary: '원하는 조건에 맞는 행만 골라내고, 보기 좋은 순서로 정렬하는 방법을 배워요.',
      goals: ['WHERE로 조건 걸기', '비교 연산자', 'ORDER BY 정렬', 'LIMIT으로 개수 제한'],
      blocks: [
        {
          h: '조건에 맞는 행만 골라내기: WHERE',
          html: `<p><code>WHERE</code>는 "이 조건에 맞는 행만 보여줘"라는 뜻이에요. 엑셀의 필터 기능과 비슷해요.</p>`,
          code: {
            label: 'where.sql',
            lang: 'sql',
            src: `SELECT name, age
FROM students
WHERE age >= 17;`,
            out: `name | age\n-----+----\n지수  | 17\n서연  | 18`
          }
        },
        {
          h: '글자 조건은 작은따옴표로',
          html: `<p>숫자는 그냥 쓰지만, 글자(문자열) 조건은 작은따옴표(<code>' '</code>)로 감싸야 해요.</p>`,
          code: {
            label: 'where_string.sql',
            lang: 'sql',
            src: `SELECT name
FROM students
WHERE city = '서울';`,
            out: `name\n----\n지수\n서연`
          }
        },
        {
          h: '정렬하기: ORDER BY',
          html: `<p><code>ORDER BY 열이름</code>은 그 열을 기준으로 정렬해요. 오름차순(작은 값부터)은 <code>ASC</code>(생략 가능한 기본값), 내림차순(큰 값부터)은 <code>DESC</code>를 붙여요.</p>`,
          code: {
            label: 'order.sql',
            lang: 'sql',
            src: `SELECT name, age
FROM students
ORDER BY age DESC;`,
            out: `name | age\n-----+----\n서연  | 18\n지수  | 17\n민준  | 16`
          },
          after: `<div class="note"><b>팁</b> — <code>LIMIT 2</code>를 맨 뒤에 붙이면 결과 중 위에서 2개만 보여줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const ages = Array.from({ length: randInt(4, 6) }, () => randInt(10, 25));
          const threshold = pick(ages);
          const count = ages.filter(a => a > threshold).length;
          return {
            type: 'blank',
            q: `학생들의 나이가 [${ages.join(', ')}]일 때, <code>WHERE age > ${threshold}</code> 조건에 맞는 학생은 몇 명일까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(count)], placeholder: '숫자',
            why: `${threshold}보다 큰 나이는 [${ages.filter(a => a > threshold).join(', ') || '없음'}]이라 ${count}명이에요.`,
            hint: '나이 목록에서 기준값보다 큰 것만 하나씩 세어보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `도시가 "서울"인 학생만 찾으려고 해요. 글자 조건은 어떤 문장 부호로 감싸야 할까요?`,
          prefix: 'WHERE city = ', suffix: '서울', accept: ["'"], placeholder: '문장 부호',
          why: "글자(문자열) 조건은 작은따옴표(')로 감싸요. 예: <code>city = '서울'</code>",
          hint: '숫자가 아니라 글자를 비교할 때 필요한 문장 부호예요.'
        }),
        () => {
          const desc = Math.random() < 0.5;
          return {
            type: 'blank',
            q: `나이가 ${desc ? '많은 순서(내림차순)' : '적은 순서(오름차순)'}로 정렬하려고 해요. <code>ORDER BY age</code> 뒤에 쓰는 키워드를 완성하세요.`,
            prefix: 'ORDER BY age ', suffix: ';', accept: desc ? ['DESC', 'desc'] : ['ASC', 'asc'], placeholder: '키워드',
            why: desc ? '<code>DESC</code>는 큰 값부터 내림차순으로 정렬해요.' : '<code>ASC</code>는 작은 값부터 오름차순으로 정렬해요(기본값이라 생략도 가능해요).',
            hint: desc ? '"내림차순"을 뜻하는 영어 단어의 줄임말이에요.' : '"오름차순"을 뜻하는 영어 단어의 줄임말이에요.'
          };
        },
        () => makeChoice(
          '표에서 조건에 맞는 행만 골라내는 키워드는?',
          '<code>WHERE</code>', ['<code>ORDER BY</code>', '<code>SELECT</code>', '<code>FILTER</code>'],
          '<code>WHERE</code>는 조건에 맞는 행만 걸러서 보여줘요.',
          '"어디에서" 조건을 만족하는지를 뜻하는 영어 단어예요.'
        ),
        () => {
          const n = randInt(1, 5);
          return {
            type: 'blank',
            q: `결과 중 위에서 ${n}개만 보고 싶어요. 문장 맨 뒤에 쓰는 키워드를 완성하세요.`,
            prefix: 'SELECT * FROM students ORDER BY age DESC ', suffix: ` ${n};`, accept: ['LIMIT', 'limit'], placeholder: '키워드',
            why: `<code>LIMIT ${n}</code>은 결과 중 위에서 ${n}개만 보여줘요.`,
            hint: '"제한하다"라는 뜻의 영어 단어예요.'
          };
        },
        () => ({
          type: 'code',
          q: 'students 표에서 age가 18 이상인 행만 가져오는 SQL을 작성하세요.',
          starter: '',
          placeholder: 'SELECT * FROM students WHERE age >= 18;',
          accept: ['SELECT * FROM students WHERE age >= 18;'],
          why: 'WHERE 뒤에 조건(age >= 18)을 붙이면 그 조건에 맞는 행만 걸러져요.',
          hint: 'SELECT * FROM students WHERE age >= 18; 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const threshold = randInt(13, 18);
        return {
          type: 'blank',
          q: `나이가 ${threshold} 이상인 학생만, 나이가 많은 순서로 정렬해서 보여주는 SQL을 완성하세요.`,
          prefix: 'SELECT * FROM students ', suffix: ';',
          accept: [`WHERE age >= ${threshold} ORDER BY age DESC`],
          placeholder: 'WHERE ... ORDER BY ...',
          why: `조건은 <code>WHERE age >= ${threshold}</code>로, 정렬은 <code>ORDER BY age DESC</code>로 써서 이어 붙여요.`,
          hint: 'WHERE로 조건을 먼저 걸고, 그 뒤에 ORDER BY로 정렬 기준을 이어 붙이면 돼요.'
        };
      }
    },
    {
      id: 'aggregate',
      title: '묶어서 세고 합치기',
      ready: true,
      summary: '데이터를 그룹으로 묶어서 개수를 세거나, 여러 표를 연결하는 방법을 배워요.',
      goals: ['COUNT / SUM / AVG', 'GROUP BY', 'JOIN 기초'],
      blocks: [
        {
          h: '개수 세기, 더하기, 평균 내기: 집계 함수',
          html: `<p><code>COUNT(*)</code>는 행의 개수를, <code>SUM(열)</code>은 합계를, <code>AVG(열)</code>은 평균을 구해줘요. 이런 함수들을 <b>집계 함수</b>라고 불러요.</p>`,
          code: {
            label: 'count.sql',
            lang: 'sql',
            src: `SELECT COUNT(*)
FROM students;`,
            out: `COUNT(*)\n--------\n3`
          }
        },
        {
          h: '도시별로 묶어서 세기: GROUP BY',
          html: `<p><code>GROUP BY 열</code>은 그 열의 같은 값끼리 한 그룹으로 묶어줘요. "도시별로 학생이 몇 명인지" 세고 싶을 때 씁니다.</p>`,
          code: {
            label: 'group.sql',
            lang: 'sql',
            src: `SELECT city, COUNT(*)
FROM students
GROUP BY city;`,
            out: `city | COUNT(*)\n-----+---------\n서울  | 2\n부산  | 1`
          }
        },
        {
          h: '두 표를 이어 붙이기: JOIN',
          html: `<p>학생 명단표와 성적표처럼 표가 나뉘어 있을 때, 공통된 값(예: 학생 id)을 기준으로 두 표를 이어 붙이는 게 <code>JOIN</code>이에요. <code>ON</code> 뒤에 "무엇을 기준으로 연결할지" 적어요.</p>`,
          code: {
            label: 'join.sql',
            lang: 'sql',
            src: `SELECT students.name, scores.score
FROM students
JOIN scores ON students.id = scores.student_id;`,
            out: `name | score\n-----+------\n지수  | 90\n민준  | 85`
          },
          after: `<div class="note"><b>비유</b> — JOIN은 "학생 이름표"와 "성적표"를 학생 번호(id)로 짝지어서 나란히 이어 붙이는 것과 같아요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(3, 9);
          return {
            type: 'blank',
            q: `<code>students</code> 표에 학생이 ${n}명 있을 때, <code>SELECT COUNT(*) FROM students;</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `<code>COUNT(*)</code>는 행(row)의 개수를 세줘요. 지금은 ${n}명이에요.`,
            hint: 'COUNT(*)는 표에 있는 행이 몇 개인지 그대로 세어줘요.'
          };
        },
        () => makeChoice(
          '숫자 열의 평균값을 구하는 집계 함수는?',
          '<code>AVG()</code>', ['<code>SUM()</code>', '<code>COUNT()</code>', '<code>MAX()</code>'],
          '<code>AVG()</code>는 평균(average)을 구해요.',
          '"average(평균)"의 줄임말이에요.'
        ),
        () => {
          const col = pick(['city', 'age', 'grade']);
          const colKo = { city: '도시', age: '나이', grade: '학년' }[col];
          return {
            type: 'blank',
            q: `${colKo}별로 학생 수를 세려고 해요. 빈칸을 채우세요.`,
            prefix: `SELECT ${col}, COUNT(*) FROM students `, suffix: ` ${col};`, accept: ['GROUP BY', 'group by'], placeholder: '키워드',
            why: `<code>GROUP BY ${col}</code>은 같은 ${colKo}끼리 묶어서 그 안에서 세거나 계산하게 해줘요.`,
            hint: '"묶는다"는 뜻의 두 단어짜리 키워드예요.'
          };
        },
        () => makeChoice(
          '두 표를 공통된 값을 기준으로 이어 붙이는 키워드는?',
          '<code>JOIN</code>', ['<code>GROUP BY</code>', '<code>MERGE</code>', '<code>UNION</code>'],
          '<code>JOIN</code>은 두 표를 공통된 값(예: id)을 기준으로 이어 붙여요.',
          '"연결하다, 잇다"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `JOIN을 할 때 "무엇을 기준으로 연결할지"를 정하는 키워드를 쓰세요.`,
          prefix: 'JOIN scores ', suffix: ' students.id = scores.student_id', accept: ['ON', 'on'], placeholder: '키워드',
          why: '<code>ON</code> 뒤에 두 표를 연결할 조건(보통 id가 같다)을 적어요.',
          hint: '"~을 기준으로"라는 뜻의 아주 짧은 영어 단어예요.'
        }),
        () => ({
          type: 'code',
          q: 'students 표에서 도시(city)별 학생 수를 세는 SQL을 작성하세요.',
          starter: '',
          placeholder: 'SELECT city, COUNT(*) FROM students GROUP BY city;',
          accept: ['SELECT city, COUNT(*) FROM students GROUP BY city;'],
          why: 'COUNT(*)로 행의 개수를 세고, GROUP BY city로 도시별로 묶어서 계산해요.',
          hint: 'SELECT city, COUNT(*) FROM students GROUP BY city; 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const col = pick(['city', 'age', 'grade']);
        const colKo = { city: '도시', age: '나이', grade: '학년' }[col];
        return {
          type: 'blank',
          q: `${colKo}별로 학생이 몇 명인지 세는 SQL 문장을 처음부터 끝까지(세미콜론까지) 완성하세요.`,
          prefix: '', suffix: '', accept: [`SELECT ${col}, COUNT(*) FROM students GROUP BY ${col};`], placeholder: 'SELECT ...',
          why: `<code>SELECT ${col}, COUNT(*) FROM students GROUP BY ${col};</code>처럼 GROUP BY로 묶고 COUNT(*)로 세요.`,
          hint: 'SELECT 열, COUNT(*) FROM 표 GROUP BY 열; 순서를 그대로 따라 써보세요.'
        };
      }
    },
    {
      id: 'subquery',
      title: '서브쿼리와 고급 조회',
      ready: true,
      summary: '쿼리 안에 또 다른 쿼리를 넣어서, 더 복잡한 조건으로 데이터를 찾는 방법을 배워요.',
      goals: ['서브쿼리(중첩 쿼리)', 'IN으로 여러 값 비교', 'HAVING으로 그룹 조건 걸기'],
      blocks: [
        {
          h: '쿼리 안에 또 다른 쿼리: 서브쿼리',
          html: `<p>"평균 나이보다 많은 학생"을 찾으려면, 평균 나이를 먼저 구하고 그 값과 비교해야 해요. 이럴 때 <code>WHERE</code> 조건 안에 <b>또 다른 SELECT문</b>(서브쿼리)을 괄호로 감싸서 넣을 수 있어요. 괄호 안의 쿼리가 먼저 계산되고, 그 결과가 바깥 조건에 쓰여요.</p>`,
          code: {
            label: 'subquery.sql',
            lang: 'sql',
            src: `SELECT name, age
FROM students
WHERE age > (SELECT AVG(age) FROM students);`,
            out: `name | age\n-----+----\n서연  | 18`
          }
        },
        {
          h: '여러 값 중 하나와 비교하기: IN',
          html: `<p>"서울이거나 부산인 학생"처럼 여러 값 중 하나와 같은지 비교할 땐, <code>OR</code>를 여러 번 쓰는 대신 <code>IN (값, 값, ...)</code>을 쓰면 훨씬 짧고 깔끔해요.</p>`,
          code: {
            label: 'in.sql',
            lang: 'sql',
            src: `SELECT name, city
FROM students
WHERE city IN ('서울', '부산');`,
            out: `name | city\n-----+-----\n지수  | 서울\n민준  | 부산\n서연  | 서울`
          }
        },
        {
          h: '그룹으로 묶은 결과에 조건 걸기: HAVING',
          html: `<p><code>WHERE</code>는 <b>묶기(GROUP BY) 전</b>의 개별 행에 조건을 걸 때 쓰고, <code>HAVING</code>은 <b>묶은 후</b>의 그룹 결과(예: COUNT(*) 같은 집계 함수 결과)에 조건을 걸 때 써요. "학생이 2명 이상인 도시만" 같은 조건은 HAVING이 필요해요.</p>`,
          code: {
            label: 'having.sql',
            lang: 'sql',
            src: `SELECT city, COUNT(*)
FROM students
GROUP BY city
HAVING COUNT(*) >= 2;`,
            out: `city | COUNT(*)\n-----+---------\n서울  | 2`
          },
          after: `<div class="note"><b>기억하기</b> — WHERE는 GROUP BY보다 <b>먼저</b>, HAVING은 GROUP BY보다 <b>나중에</b> 와요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const ages = Array.from({ length: randInt(4, 6) }, () => randInt(10, 25));
          const avg = ages.reduce((a, b) => a + b, 0) / ages.length;
          const count = ages.filter(a => a > avg).length;
          return {
            type: 'blank',
            q: `학생들의 나이가 [${ages.join(', ')}]일 때, <code>WHERE age > (SELECT AVG(age) FROM students)</code> 조건에 맞는 학생은 몇 명일까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(count)], placeholder: '숫자',
            why: `평균은 ${avg.toFixed(2)}이고, 그보다 큰 나이는 [${ages.filter(a => a > avg).join(', ') || '없음'}]이라 ${count}명이에요.`,
            hint: '먼저 평균을 계산한 다음, 그 평균보다 큰 값이 몇 개인지 세어보세요.'
          };
        },
        () => makeChoice(
          '여러 값 중 하나와 같은지 비교할 때, OR를 여러 번 쓰는 대신 쓸 수 있는 키워드는?',
          '<code>IN</code>', ['<code>OR</code>', '<code>AND</code>', '<code>ANY</code>'],
          '<code>WHERE city IN (값, 값, ...)</code>은 여러 값 중 하나와 같은지 한 번에 비교해요.',
          '"~안에 포함되는가"라는 뜻의 아주 짧은 영어 단어예요.'
        ),
        () => {
          const cities = shuffle(['서울', '부산', '대구', '인천']).slice(0, 2);
          return {
            type: 'blank',
            q: `도시가 ${cities.join(' 또는 ')}인 학생을 찾으려고 해요. 빈칸을 채우세요.`,
            prefix: `WHERE city `, suffix: ` ('${cities[0]}', '${cities[1]}');`, accept: ['IN', 'in'], placeholder: '키워드',
            why: `<code>IN ('${cities[0]}', '${cities[1]}')</code>은 두 값 중 하나와 같은 행을 모두 찾아줘요.`,
            hint: '괄호 안에 여러 값을 나열해서 그중 하나와 같은지 비교하는 키워드예요.'
          };
        },
        () => makeChoice(
          'GROUP BY로 묶은 후의 그룹 결과(예: COUNT(*))에 조건을 걸 때 WHERE 대신 쓰는 키워드는?',
          '<code>HAVING</code>', ['<code>WHERE</code>', '<code>ORDER BY</code>', '<code>LIMIT</code>'],
          '<code>WHERE</code>는 묶기 전 개별 행에, <code>HAVING</code>은 묶은 후 그룹 결과에 조건을 걸어요.',
          'WHERE는 GROUP BY보다 먼저, 이 키워드는 GROUP BY보다 나중에 와요.'
        ),
        () => {
          const n = randInt(2, 4);
          return {
            type: 'blank',
            q: `도시별 학생 수를 센 뒤, 학생이 ${n}명 이상인 도시만 남기려고 해요. 빈칸을 채우세요.`,
            prefix: 'SELECT city, COUNT(*) FROM students GROUP BY city ', suffix: ` COUNT(*) >= ${n};`, accept: ['HAVING', 'having'], placeholder: '키워드',
            why: `GROUP BY로 묶은 결과(COUNT(*))에 조건을 걸어야 하니 <code>HAVING COUNT(*) >= ${n}</code>을 써요.`,
            hint: 'GROUP BY 다음, 집계 함수 결과에 조건을 걸 때 쓰는 키워드예요.'
          };
        },
        () => ({
          type: 'code',
          q: 'students 표에서 평균 나이(AVG(age))보다 나이가 많은 학생의 이름(name)을 조회하는 SQL을 작성하세요. (서브쿼리를 사용하세요)',
          starter: '',
          placeholder: 'SELECT name FROM students WHERE age > (SELECT AVG(age) FROM students);',
          accept: ['SELECT name FROM students WHERE age > (SELECT AVG(age) FROM students);'],
          why: 'WHERE 조건 안에 (SELECT AVG(age) FROM students)라는 서브쿼리를 괄호로 감싸서 넣으면, 그 평균값과 비교할 수 있어요.',
          hint: 'WHERE age > ( ) 괄호 안에 SELECT AVG(age) FROM students를 그대로 넣으세요.'
        }),
      ],
      boss: () => {
        const n = randInt(2, 3);
        return {
          type: 'blank',
          q: `도시별 학생 수를 센 뒤, 학생이 ${n}명 이상인 도시만 보여주는 SQL 문장을 처음부터 끝까지(세미콜론까지) 완성하세요.`,
          prefix: '', suffix: '', accept: [`SELECT city, COUNT(*) FROM students GROUP BY city HAVING COUNT(*) >= ${n};`], placeholder: 'SELECT ...',
          why: `<code>GROUP BY city</code>로 묶고, <code>HAVING COUNT(*) >= ${n}</code>으로 그룹 결과에 조건을 걸어요.`,
          hint: 'SELECT city, COUNT(*) FROM students GROUP BY city HAVING COUNT(*) >= 숫자; 순서를 그대로 따라 써보세요.'
        };
      }
    },
    {
      id: 'dml',
      title: '데이터 변경하기 (INSERT/UPDATE/DELETE)',
      ready: true,
      summary: '지금까지는 데이터를 "조회"만 했다면, 이제 표에 데이터를 직접 추가·수정·삭제하는 방법을 배워요.',
      goals: ['INSERT로 추가하기', 'UPDATE로 수정하기', 'DELETE로 삭제하기'],
      blocks: [
        {
          h: '새 행 추가하기: INSERT INTO',
          html: `<p><code>INSERT INTO 표 (열, 열, ...) VALUES (값, 값, ...);</code>는 표에 새로운 행(줄) 하나를 추가해요. 열 이름과 값의 <b>순서와 개수</b>가 정확히 맞아야 해요.</p>`,
          code: {
            label: 'insert.sql',
            lang: 'sql',
            src: `INSERT INTO students (name, age, city)
VALUES ('하늘', 16, '대전');`,
            out: `1개 행이 추가됨`
          }
        },
        {
          h: '기존 값 바꾸기: UPDATE ... SET ... WHERE',
          html: `<p><code>UPDATE 표 SET 열 = 새값 WHERE 조건;</code>은 조건에 맞는 행들의 값을 바꿔요. <b>WHERE를 빠뜨리면 표의 모든 행이 다 바뀌어버려요!</b> UPDATE는 항상 WHERE와 함께 신중하게 써야 해요.</p>`,
          code: {
            label: 'update.sql',
            lang: 'sql',
            src: `UPDATE students
SET age = 17
WHERE name = '지수';`,
            out: `1개 행이 수정됨`
          }
        },
        {
          h: '행 지우기: DELETE FROM ... WHERE',
          html: `<p><code>DELETE FROM 표 WHERE 조건;</code>은 조건에 맞는 행을 통째로 지워요. 이것도 <b>WHERE 없이 실행하면 표의 모든 행이 삭제</b>돼요. 실무에서 아주 조심해야 하는 명령어예요.</p>`,
          code: {
            label: 'delete.sql',
            lang: 'sql',
            src: `DELETE FROM students
WHERE age < 10;`,
            out: `0개 행이 삭제됨`
          },
          after: `<div class="note"><b>기억하기</b> — SELECT는 데이터를 "본다"만, INSERT/UPDATE/DELETE는 데이터를 실제로 "바꾼다"예요. WHERE를 빠뜨리지 않았는지 항상 두 번 확인하세요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['하늘', '유진', '태윤']);
          const age = randInt(14, 19);
          const city = pick(['광주', '대전', '수원']);
          return {
            type: 'blank',
            q: `students 표에 이름 "${name}", 나이 ${age}, 도시 "${city}"인 학생을 추가하려고 해요. 빈칸을 채우세요.`,
            prefix: 'INSERT INTO students (name, age, city) ', suffix: ` ('${name}', ${age}, '${city}');`, accept: ['VALUES', 'values'], placeholder: '키워드',
            why: `<code>VALUES (...)</code> 뒤에 열 순서와 똑같은 순서로 값을 나열해요.`,
            hint: '"값들"이라는 뜻의 영어 단어예요.'
          };
        },
        () => ({
          type: 'blank',
          q: `이름이 "지수"인 학생의 나이를 17로 바꾸려고 해요. 빈칸을 채우세요.`,
          prefix: 'UPDATE students ', suffix: ` age = 17 WHERE name = '지수';`, accept: ['SET', 'set'], placeholder: '키워드',
          why: `<code>SET 열 = 새값</code>으로 바꿀 열과 새 값을 지정해요.`,
          hint: '"설정하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '표에서 조건에 맞는 행을 통째로 지우는 명령어는?',
          '<code>DELETE FROM</code>', ['<code>DROP TABLE</code>', '<code>REMOVE</code>', '<code>UPDATE</code>'],
          '<code>DELETE FROM 표 WHERE 조건;</code>은 조건에 맞는 행을 지워요. (DROP TABLE은 표 자체를 통째로 없애버려서 완전히 달라요!)',
          '"삭제하다"라는 뜻의 영어 단어예요.'
        ),
        () => makeChoice(
          '<code>UPDATE students SET age = 0;</code>처럼 WHERE 없이 실행하면 어떻게 될까요?',
          '표에 있는 모든 행의 age가 0으로 바뀐다', ['아무 일도 일어나지 않는다', '오류가 나서 실행되지 않는다', '첫 번째 행만 바뀐다'],
          'WHERE가 없으면 "조건"이 없다는 뜻이라, 표의 모든 행이 다 영향을 받아요. 그래서 UPDATE/DELETE는 항상 조심해야 해요.',
          'WHERE는 "어떤 행에만 적용할지"를 정해요. 그게 없다는 건 전부 다 적용된다는 뜻이에요.'
        ),
        () => {
          const age = randInt(5, 12);
          return {
            type: 'blank',
            q: `나이가 ${age}세 미만인 학생을 표에서 지우려고 해요. 빈칸을 채우세요.`,
            prefix: 'DELETE FROM students WHERE age ', suffix: ` ${age};`, accept: ['<'], placeholder: '비교 연산자',
            why: `<code>age &lt; ${age}</code>는 나이가 ${age}보다 작은 행만 골라서 지워요.`,
            hint: '"미만"을 나타내는 비교 연산자예요.'
          };
        },
        () => ({
          type: 'code',
          q: 'students 표에 이름 "유진", 나이 15, 도시 "수원"인 학생을 추가하는 SQL을 작성하세요.',
          starter: '',
          placeholder: "INSERT INTO students (name, age, city) VALUES ('유진', 15, '수원');",
          accept: ["INSERT INTO students (name, age, city) VALUES ('유진', 15, '수원');"],
          why: '열 이름 순서(name, age, city)에 맞춰 VALUES에 값을 똑같은 순서로 나열해요.',
          hint: "INSERT INTO students (name, age, city) VALUES ('유진', 15, '수원'); 형태를 그대로 써보세요."
        }),
      ],
      boss: () => {
        const name = pick(['하늘', '유진', '태윤']);
        const newAge = randInt(15, 19);
        return {
          type: 'blank',
          q: `이름이 "${name}"인 학생의 나이를 ${newAge}로 바꾸는 SQL 문장을 처음부터 끝까지(세미콜론까지) 완성하세요.`,
          prefix: '', suffix: '', accept: [`UPDATE students SET age = ${newAge} WHERE name = '${name}';`], placeholder: 'UPDATE ...',
          why: `<code>UPDATE students SET age = ${newAge} WHERE name = '${name}';</code>처럼 SET으로 바꿀 값을, WHERE로 어떤 행인지 지정해요.`,
          hint: "UPDATE 표 SET 열 = 새값 WHERE 조건; 순서를 그대로 따라 써보세요."
        };
      }
    },
    {
      id: 'joins',
      title: '여러 JOIN 종류',
      ready: true,
      summary: '짝이 있는 것만 남길지, 짝이 없어도 남길지에 따라 JOIN의 종류가 달라져요.',
      goals: ['INNER JOIN(기본 JOIN)', 'LEFT JOIN', '두 JOIN의 차이'],
      blocks: [
        {
          h: '기본 JOIN은 사실 INNER JOIN',
          html: `<p>이전에 배운 <code>JOIN</code>은 사실 <code>INNER JOIN</code>의 줄임말이에요. <b>양쪽 표에 모두 짝이 있는 행만</b> 결과에 나와요. 짝이 없는 쪽은 아예 결과에서 빠져요.</p>
                 <p>학생 <code>students</code>(id 1=지수, 2=민준, 3=서연)와 성적 <code>scores</code>(student_id 1, student_id 2만 있음, 서연은 성적 없음)가 있다고 해봐요.</p>`,
          code: {
            label: 'inner_join.sql',
            lang: 'sql',
            src: `SELECT students.name, scores.score
FROM students
INNER JOIN scores ON students.id = scores.student_id;`,
            out: `name | score\n-----+------\n지수  | 90\n민준  | 85`
          }
        },
        {
          h: '짝이 없어도 남기고 싶다면: LEFT JOIN',
          html: `<p><code>LEFT JOIN</code>은 <code>FROM</code> 뒤에 먼저 쓴(왼쪽) 표의 <b>모든 행을 다 남기고</b>, 짝이 없는 자리는 <code>NULL</code>(빈 값)로 채워요. "성적이 없는 학생도 명단에는 보이게 하고 싶다"는 경우에 딱이에요.</p>`,
          code: {
            label: 'left_join.sql',
            lang: 'sql',
            src: `SELECT students.name, scores.score
FROM students
LEFT JOIN scores ON students.id = scores.student_id;`,
            out: `name | score\n-----+------\n지수  | 90\n민준  | 85\n서연  | NULL`
          }
        },
        {
          h: '언제 어떤 걸 쓸까?',
          html: `<p><b>INNER JOIN</b>은 "짝이 확실히 있는 것만" 볼 때(예: 성적이 있는 학생만), <b>LEFT JOIN</b>은 "왼쪽 표의 모든 행을 다" 보고 싶을 때(예: 성적 유무와 상관없이 학생 전체)를 써요.</p>`,
          after: `<div class="note"><b>비유</b> — INNER JOIN은 "서로 짝이 맞는 사람만" 사진을 찍고, LEFT JOIN은 "왼쪽 줄 사람은 짝이 없어도 다" 사진에 넣어주는 것과 같아요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '이전에 배운 <code>JOIN</code>이라는 키워드는 사실 어떤 JOIN의 줄임말일까요?',
          '<code>INNER JOIN</code>', ['<code>LEFT JOIN</code>', '<code>OUTER JOIN</code>', '<code>FULL JOIN</code>'],
          '그냥 <code>JOIN</code>이라고만 쓰면 <code>INNER JOIN</code>과 똑같이 동작해요.',
          '"안쪽, 내부"를 뜻하는 영어 단어가 들어간 JOIN이에요.'
        ),
        () => makeChoice(
          '양쪽 표에 모두 짝이 있는 행만 결과에 남기는 JOIN은?',
          '<code>INNER JOIN</code>', ['<code>LEFT JOIN</code>', '<code>SELECT</code>', '<code>GROUP BY</code>'],
          '<code>INNER JOIN</code>은 두 표 모두에 짝이 있는 행만 남겨요.',
          '짝이 없으면 결과에서 완전히 빠지는 쪽이에요.'
        ),
        () => ({
          type: 'blank',
          q: `왼쪽 표(FROM 뒤에 먼저 쓴 표)의 모든 행을 다 남기고, 짝이 없으면 NULL로 채우는 JOIN의 이름을 쓰세요.`,
          prefix: '', suffix: ' JOIN scores ON students.id = scores.student_id', accept: ['LEFT', 'left'], placeholder: '키워드',
          why: '<code>LEFT JOIN</code>은 왼쪽 표의 모든 행을 남기고, 짝이 없으면 NULL로 채워요.',
          hint: '"왼쪽"을 뜻하는 영어 단어예요.'
        }),
        () => {
          const total = randInt(4, 8);
          const matched = randInt(2, total - 1);
          return {
            type: 'blank',
            q: `<code>students</code>에 학생이 ${total}명 있고, 그중 ${matched}명만 <code>scores</code>에 성적이 있어요. <code>students LEFT JOIN scores</code>의 결과는 몇 행일까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
            why: `LEFT JOIN은 왼쪽 표(students)의 모든 행(${total}개)을 다 남겨요. 성적이 없는 학생은 score 자리만 NULL로 채워져요.`,
            hint: 'LEFT JOIN은 왼쪽 표의 행 개수를 그대로 유지해요. 짝이 있는지 없는지는 상관없어요.'
          };
        },
        () => ({
          type: 'code',
          q: 'students 표와 scores 표를 student_id 기준으로 LEFT JOIN해서, 이름(students.name)과 점수(scores.score)를 조회하는 SQL을 작성하세요.',
          starter: '',
          placeholder: 'SELECT students.name, scores.score FROM students LEFT JOIN scores ON students.id = scores.student_id;',
          accept: ['SELECT students.name, scores.score FROM students LEFT JOIN scores ON students.id = scores.student_id;'],
          why: 'LEFT JOIN 뒤에 표 이름과, ON 뒤에 연결할 조건(students.id = scores.student_id)을 적어요.',
          hint: 'SELECT students.name, scores.score FROM students LEFT JOIN scores ON students.id = scores.student_id; 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const total = randInt(4, 7);
        const matched = randInt(2, total - 1);
        const useInner = Math.random() < 0.5;
        const result = useInner ? matched : total;
        return {
          type: 'blank',
          q: `<code>students</code>에 학생이 ${total}명 있고, 그중 ${matched}명만 <code>scores</code>에 성적이 있어요. <code>students ${useInner ? 'INNER' : 'LEFT'} JOIN scores ON students.id = scores.student_id</code>의 결과는 몇 행일까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
          why: useInner
            ? `INNER JOIN은 양쪽에 짝이 있는 행만 남기니, 성적이 있는 ${matched}명만 나와요.`
            : `LEFT JOIN은 왼쪽 표(students)의 모든 행을 다 남기니, 전체 ${total}명이 다 나와요(성적 없는 학생은 NULL).`,
          hint: 'INNER JOIN은 짝이 있는 것만, LEFT JOIN은 왼쪽 표 전체를 남긴다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'transaction',
      title: '트랜잭션',
      ready: true,
      summary: '여러 작업을 하나로 묶어서, 전부 성공하거나 전부 취소되게 만드는 방법을 배워요.',
      goals: ['BEGIN / COMMIT', 'ROLLBACK으로 되돌리기', '트랜잭션이 필요한 이유(원자성)'],
      blocks: [
        {
          h: '여러 작업을 하나로 묶기: 트랜잭션',
          html: `<p>계좌 이체를 생각해보세요. "내 계좌에서 돈을 빼고" + "상대 계좌에 돈을 더하고", 이 두 가지는 <b>반드시 둘 다 성공하거나 둘 다 실패</b>해야 해요. 하나만 성공하면 돈이 사라지거나 복사되는 큰 문제가 생겨요. 이렇게 여러 작업을 "하나의 묶음"으로 처리하는 게 <b>트랜잭션</b>이에요.</p>`,
          code: {
            label: 'transaction.sql',
            lang: 'sql',
            src: `BEGIN;

UPDATE accounts SET balance = balance - 1000 WHERE name = '지수';
UPDATE accounts SET balance = balance + 1000 WHERE name = '민준';

COMMIT;`,
            out: `트랜잭션 완료(두 UPDATE 모두 반영됨)`
          }
        },
        {
          h: '잘못되면 전부 되돌리기: ROLLBACK',
          html: `<p><code>BEGIN</code>과 <code>COMMIT</code> 사이에서 문제가 생기면, <code>COMMIT</code> 대신 <code>ROLLBACK</code>을 실행해서 그 사이의 <b>모든 변경을 취소</b>할 수 있어요. 마치 "저장하지 않고 되돌리기"와 같아요.</p>`,
          code: {
            label: 'rollback.sql',
            lang: 'sql',
            src: `BEGIN;

UPDATE accounts SET balance = balance - 1000 WHERE name = '지수';
-- 여기서 문제가 생겼다고 가정!

ROLLBACK;`,
            out: `트랜잭션 취소됨(balance 변경 없음)`
          }
        },
        {
          h: '왜 필요할까? 전부 성공 아니면 전부 취소',
          html: `<p>트랜잭션의 이 성질을 <b>원자성(all-or-nothing)</b>이라고 불러요. <code>COMMIT</code>하기 전까지는 어떤 변경도 "확정"되지 않고, 중간에 하나라도 실패하면 <code>ROLLBACK</code>으로 전부 취소할 수 있어서 데이터가 "반쯤 바뀐" 상태로 남는 일이 없어요.</p>`,
          after: `<div class="note"><b>비유</b> — 트랜잭션은 "장바구니에 담고 결제하기"와 비슷해요. 결제(COMMIT) 전까지는 장바구니(임시 상태)일 뿐이고, 결제를 취소(ROLLBACK)하면 아무 일도 없었던 것처럼 돌아가요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '여러 SQL 작업을 하나로 묶어서, 전부 성공하거나 전부 취소되게 만드는 것을 무엇이라고 하나요?',
          '트랜잭션', ['서브쿼리', 'JOIN', '인덱스'],
          '이렇게 여러 작업을 하나로 묶는 것을 <b>트랜잭션</b>이라고 해요.',
          '은행 계좌 이체처럼 "묶여서 처리돼야 하는 작업"을 뜻하는 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `트랜잭션을 시작하는 키워드를 쓰세요.`,
          prefix: '', suffix: ';\nUPDATE accounts SET balance = balance - 1000 WHERE name = \'지수\';\nCOMMIT;', accept: ['BEGIN', 'begin'], placeholder: '키워드',
          why: '<code>BEGIN</code>은 트랜잭션의 시작을 알려요.',
          hint: '"시작하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '트랜잭션 안의 모든 변경을 확정(저장)하는 키워드는?',
          '<code>COMMIT</code>', ['<code>ROLLBACK</code>', '<code>SAVE</code>', '<code>END</code>'],
          '<code>COMMIT</code>은 BEGIN 이후의 모든 변경을 확정해요.',
          '"위임하다, 확정하다"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `트랜잭션 도중 문제가 생겨서, BEGIN 이후의 모든 변경을 취소하려고 해요. 빈칸을 채우세요.`,
          prefix: 'BEGIN;\nUPDATE accounts SET balance = balance - 1000 WHERE name = \'지수\';\n', suffix: ';', accept: ['ROLLBACK', 'rollback'], placeholder: '키워드',
          why: '<code>ROLLBACK</code>은 BEGIN 이후의 모든 변경을 취소하고 원래 상태로 되돌려요.',
          hint: '"되감다, 되돌리다"라는 뜻의 영어 단어 조합이에요.'
        }),
        () => makeChoice(
          '트랜잭션이 "전부 성공하거나 전부 취소된다"는 성질을 무엇이라고 부르나요?',
          '원자성(all-or-nothing)', ['정렬성', '중복성', '색인성'],
          '이 성질을 <b>원자성</b>이라고 불러요. 트랜잭션은 더 이상 쪼갤 수 없는 하나의 단위처럼 동작해요.',
          '"더 이상 쪼갤 수 없는 단위"라는 뜻에서 온 이름이에요.'
        ),
      ],
      boss: () => {
        const amount = randInt(500, 2000);
        const success = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `<code>BEGIN; UPDATE accounts SET balance = balance - ${amount} WHERE name = '지수'; UPDATE accounts SET balance = balance + ${amount} WHERE name = '민준'; ${success ? 'COMMIT' : 'ROLLBACK'};</code>를 실행하면, 지수의 잔액은 실제로 ${amount}만큼 줄어들까요? "예" 또는 "아니오"로 답하세요.`,
          prefix: '', suffix: '', accept: [success ? '예' : '아니오'], placeholder: '예 / 아니오',
          why: success
            ? `COMMIT으로 끝났으니 두 UPDATE가 모두 확정돼서, 지수의 잔액은 실제로 ${amount}만큼 줄어들어요.`
            : `ROLLBACK으로 끝났으니 BEGIN 이후의 모든 변경이 취소돼서, 지수의 잔액은 그대로예요.`,
          hint: 'COMMIT으로 끝나면 변경이 확정되고, ROLLBACK으로 끝나면 모든 변경이 취소돼요.'
        };
      }
    }],
  tierBoss: {
    beginner: () => ({
      type: 'code',
      q: '도시(city)별 학생 수(COUNT(*))를 구하되, 나이가 15 이상인 학생만 대상으로 하는 SQL을 작성하세요. (WHERE와 GROUP BY를 함께 사용하세요)',
      starter: '',
      rows: 5,
      placeholder: 'SELECT city, COUNT(*)\nFROM students\nWHERE age >= 15\nGROUP BY city;',
      accept: ['SELECT city, COUNT(*)\nFROM students\nWHERE age >= 15\nGROUP BY city;'],
      why: 'WHERE로 나이 조건을 먼저 거른 뒤, GROUP BY city로 도시별로 묶어서 COUNT(*)로 세요. WHERE는 항상 GROUP BY보다 앞에 와요.',
      hint: 'SELECT city, COUNT(*) FROM students 다음에 WHERE age >= 15, 그다음 GROUP BY city를 이어서 쓰세요.'
    }),
    intermediate: () => ({
      type: 'code',
      q: '전체 학생의 평균 나이(AVG(age))보다 어린 학생들의 나이를 모두 1살 늘리는 SQL을 서브쿼리를 이용해 작성하세요. (UPDATE, SET, WHERE를 사용하세요)',
      starter: '',
      rows: 5,
      placeholder: 'UPDATE students\nSET age = age + 1\nWHERE age < (SELECT AVG(age) FROM students);',
      accept: ['UPDATE students\nSET age = age + 1\nWHERE age < (SELECT AVG(age) FROM students);'],
      why: 'WHERE 조건 안에 (SELECT AVG(age) FROM students)라는 서브쿼리를 넣어, 그 평균보다 어린 학생만 골라 나이를 1살 늘려요.',
      hint: 'UPDATE students SET age = age + 1 다음에, WHERE age < ( ) 괄호 안에 평균을 구하는 서브쿼리를 넣으세요.'
    }),
    advanced: () => ({
      type: 'code',
      q: '트랜잭션을 시작(<code>BEGIN</code>)하고, <code>scores</code> 표에 <code>student_id</code> 3, <code>score</code> 95인 행을 INSERT한 뒤, students와 scores를 <code>student_id</code> 기준으로 LEFT JOIN해서 이름(students.name)과 점수(scores.score)를 조회하고, 마지막으로 <code>COMMIT</code>하는 전체 SQL을 작성하세요.',
      starter: '',
      rows: 10,
      placeholder: 'BEGIN;\n\nINSERT INTO scores (student_id, score) VALUES (3, 95);\n\nSELECT students.name, scores.score\nFROM students\nLEFT JOIN scores ON students.id = scores.student_id;\n\nCOMMIT;',
      accept: ['BEGIN;\n\nINSERT INTO scores (student_id, score) VALUES (3, 95);\n\nSELECT students.name, scores.score\nFROM students\nLEFT JOIN scores ON students.id = scores.student_id;\n\nCOMMIT;'],
      why: 'BEGIN과 COMMIT 사이에 INSERT와 LEFT JOIN 조회를 묶어서, 이 작업들이 하나의 트랜잭션으로 처리돼요. LEFT JOIN이라 성적이 없는 학생도 결과에 남아요.',
      hint: 'BEGIN;으로 시작해서 INSERT INTO와 LEFT JOIN을 이용한 SELECT를 차례로 쓰고, 마지막에 COMMIT;으로 마무리하세요.'
    }),
  }
};
