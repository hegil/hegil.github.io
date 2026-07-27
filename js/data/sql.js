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
    },
    {
      id: 'createTable',
      title: '테이블 만들기 (CREATE TABLE)',
      ready: true,
      summary: '새로운 표를 직접 만들고, 각 열이 어떤 종류의 값을 담을지, 그리고 각 행을 어떻게 구분할지 정하는 법을 배워요.',
      goals: ['CREATE TABLE로 표 만들기', '데이터 타입 정하기', 'PRIMARY KEY로 고유 식별자 정하기'],
      blocks: [
        {
          h: '새 표 만들기: CREATE TABLE',
          html: `<p><code>CREATE TABLE 표이름 (열이름 타입, ...)</code>으로 새 표를 만들어요. 각 열마다 이름과, 그 열에 어떤 <b>종류의 값</b>이 들어갈지(타입)를 정해줘요.</p>`,
          code: {
            label: 'create_table.sql',
            lang: 'sql',
            src: `CREATE TABLE students (
  id INTEGER,
  name TEXT,
  age INTEGER
);`
          }
        },
        {
          h: '자주 쓰는 데이터 타입',
          html: `<table>
                   <tr><th>타입</th><th>뜻</th><th>예시</th></tr>
                   <tr><td><code>INTEGER</code></td><td>정수(소수점 없는 숫자)</td><td>17</td></tr>
                   <tr><td><code>TEXT</code></td><td>글자(문자열)</td><td>'지수'</td></tr>
                   <tr><td><code>REAL</code></td><td>소수점이 있는 숫자</td><td>3.14</td></tr>
                 </table>`
        },
        {
          h: '각 행을 구분하는 고유 식별자: PRIMARY KEY',
          html: `<p><code>PRIMARY KEY</code>는 그 표에서 각 행을 <b>유일하게</b> 구분하는 값이에요. 같은 값이 두 번 들어올 수 없고, 보통 자동으로 1씩 늘어나는 <code>id</code> 열에 붙여요.</p>`,
          code: {
            label: 'create_table_pk.sql',
            lang: 'sql',
            src: `CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  name TEXT,
  age INTEGER
);`
          },
          after: `<div class="note"><b>기억하기</b> — PRIMARY KEY가 없으면, 완전히 똑같은 이름과 나이를 가진 행이 여러 개 있을 때 "그중 어느 것"을 가리키는지 구분할 방법이 없어져요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `새로운 표를 만들 때 맨 앞에 쓰는 키워드 두 단어를 쓰세요.`,
          prefix: '', suffix: ' students (id INTEGER, name TEXT);', accept: ['CREATE TABLE', 'create table'], placeholder: '키워드',
          why: '<code>CREATE TABLE 표이름 (...)</code>으로 새 표를 만들어요.',
          hint: '"만들다"와 "표"에 해당하는 영어 단어 두 개예요.'
        }),
        () => makeChoice(
          '소수점 없는 숫자(예: 나이, 개수)를 담기에 알맞은 데이터 타입은?',
          '<code>INTEGER</code>', ['<code>TEXT</code>', '<code>REAL</code>', '<code>NULL</code>'],
          '<code>INTEGER</code>는 소수점이 없는 정수를 담아요.',
          '"정수"라는 뜻의 영어 단어예요.'
        ),
        () => makeChoice(
          '이름처럼 글자로 된 값을 담기에 알맞은 데이터 타입은?',
          '<code>TEXT</code>', ['<code>INTEGER</code>', '<code>REAL</code>', '<code>BOOLEAN</code>'],
          '<code>TEXT</code>는 문자열(글자)을 담는 타입이에요.',
          '"글, 텍스트"라는 뜻 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `표의 각 행을 유일하게 구분하는 값임을 나타내는 두 단어를 쓰세요.`,
          prefix: 'id INTEGER ', suffix: ',', accept: ['PRIMARY KEY', 'primary key'], placeholder: '키워드',
          why: '<code>PRIMARY KEY</code>는 그 표에서 각 행을 유일하게 구분하는 열이에요.',
          hint: '"주된, 기본"과 "열쇠, 키"에 해당하는 영어 단어예요.'
        }),
        () => ({
          type: 'code',
          q: 'id(정수, PRIMARY KEY), title(글자), price(정수) 세 열을 가진 books 표를 만드는 SQL을 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'CREATE TABLE books (\n  id INTEGER PRIMARY KEY,\n  title TEXT,\n  price INTEGER\n);',
          accept: ['CREATE TABLE books (\n  id INTEGER PRIMARY KEY,\n  title TEXT,\n  price INTEGER\n);', 'CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT, price INTEGER);'],
          why: '각 열 이름 뒤에 타입을 쓰고, id에는 PRIMARY KEY를 붙여요.',
          hint: 'CREATE TABLE books (id INTEGER PRIMARY KEY, title TEXT, price INTEGER); 형태로 쓰세요.'
        }),
      ],
      boss: () => {
        const tableName = pick(['movies', 'products', 'members']);
        const col2 = pick(['name', 'title']);
        return {
          type: 'blank',
          q: `id(정수, PRIMARY KEY)와 ${col2}(글자) 두 열을 가진 <code>${tableName}</code> 표를 만드는 SQL 문장을 처음부터 끝까지 완성하세요.`,
          prefix: '', suffix: '', accept: [`CREATE TABLE ${tableName} (id INTEGER PRIMARY KEY, ${col2} TEXT);`], placeholder: 'CREATE TABLE ... (...);',
          why: `<code>CREATE TABLE ${tableName} (id INTEGER PRIMARY KEY, ${col2} TEXT);</code>처럼 표 이름과 열 정의를 괄호 안에 써요.`,
          hint: '표 이름 뒤 괄호 안에 "열이름 타입"을 쉼표로 나열하세요.'
        };
      }
    },
    {
      id: 'constraints',
      title: '제약조건',
      ready: true,
      summary: '값이 비어있지 않게, 중복되지 않게, 기본값을 갖게, 그리고 다른 표와 안전하게 연결되게 만드는 제약조건을 배워요.',
      goals: ['NOT NULL로 빈 값 막기', 'UNIQUE로 중복 막기', 'DEFAULT로 기본값 정하기', 'FOREIGN KEY로 다른 표와 연결하기'],
      blocks: [
        {
          h: '빈 값을 허용 안 하기: NOT NULL',
          html: `<p><code>NOT NULL</code>이 붙은 열은 반드시 값이 있어야 해요. 값 없이 넣으려고 하면 오류가 나요.</p>`,
          code: {
            label: 'not_null.sql',
            lang: 'sql',
            src: `CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);`
          }
        },
        {
          h: '중복을 막기: UNIQUE',
          html: `<p><code>UNIQUE</code>가 붙은 열은 같은 값이 두 번 들어올 수 없어요. 이메일 주소처럼 "겹치면 안 되는" 값에 써요.</p>`,
          code: {
            label: 'unique.sql',
            lang: 'sql',
            src: `CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE
);`
          }
        },
        {
          h: '기본값 정하기: DEFAULT',
          html: `<p><code>DEFAULT 값</code>은 그 열에 값을 안 넣으면 자동으로 쓰일 기본값을 정해줘요.</p>`,
          code: {
            label: 'default.sql',
            lang: 'sql',
            src: `CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  city TEXT DEFAULT '서울'
);`
          }
        },
        {
          h: '다른 표와 안전하게 연결하기: FOREIGN KEY',
          html: `<p><code>FOREIGN KEY</code>는 이 열의 값이 <b>다른 표에 실제로 존재하는 값</b>만 가리키도록 강제해요. 예를 들어 <code>scores.student_id</code>가 <code>FOREIGN KEY</code>로 <code>students.id</code>를 가리키면, 존재하지 않는 학생의 성적이 들어가는 걸 막아줘요.</p>`,
          code: {
            label: 'foreign_key.sql',
            lang: 'sql',
            src: `CREATE TABLE scores (
  student_id INTEGER,
  score INTEGER,
  FOREIGN KEY (student_id) REFERENCES students(id)
);`
          }
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>name</code> 열에 반드시 값이 있어야 하도록(빈 값 금지) 만드는 제약조건을 쓰세요.`,
          prefix: 'name TEXT ', suffix: ',', accept: ['NOT NULL', 'not null'], placeholder: '키워드',
          why: '<code>NOT NULL</code>은 그 열이 반드시 값을 가져야 한다는 뜻이에요.',
          hint: '"~이 아니다(NOT)"와 "비어있음(NULL)"이 합쳐진 이름이에요.'
        }),
        () => ({
          type: 'blank',
          q: `<code>email</code> 열에 같은 값이 중복으로 들어오지 못하게 막는 제약조건을 쓰세요.`,
          prefix: 'email TEXT ', suffix: ',', accept: ['UNIQUE', 'unique'], placeholder: '키워드',
          why: '<code>UNIQUE</code>는 그 열의 값이 표 안에서 중복되지 않도록 해요.',
          hint: '"유일한, 고유한"이라는 뜻의 영어 단어예요.'
        }),
        () => {
          const city = pick(['서울', '부산', '대구']);
          return {
            type: 'blank',
            q: `<code>city TEXT DEFAULT '${city}'</code>로 정의된 열에 값을 지정하지 않고 행을 추가하면, city 값은 무엇이 될까요? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [city], placeholder: '값',
            why: `값을 안 넣으면 <code>DEFAULT</code>로 정해둔 "${city}"가 자동으로 쓰여요.`,
            hint: '값을 안 넣었을 때 자동으로 쓰이는 값이 DEFAULT예요.'
          };
        },
        () => makeChoice(
          '<code>scores.student_id</code>가 <code>students.id</code>를 가리키는 <code>FOREIGN KEY</code>일 때, 존재하지 않는 학생 id로 성적을 추가하려고 하면?',
          '오류가 나서 추가가 거부된다', ['조용히 추가되고 아무 문제 없다', '자동으로 새 학생이 만들어진다', 'student_id가 자동으로 NULL이 된다'],
          'FOREIGN KEY 제약조건은 참조하는 표(students)에 실제로 없는 값이 들어오는 걸 막아줘요.',
          'FOREIGN KEY의 역할이 "안전하게 연결되도록 강제하는 것"이라는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: 'id(정수, PRIMARY KEY), name(글자, NOT NULL), email(글자, UNIQUE)을 가진 users 표를 만드는 SQL을 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'CREATE TABLE users (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  email TEXT UNIQUE\n);',
          accept: ['CREATE TABLE users (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  email TEXT UNIQUE\n);', 'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE);'],
          why: '각 제약조건을 해당 열의 타입 뒤에 이어서 써요.',
          hint: 'CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE); 형태로 쓰세요.'
        }),
      ],
      boss: () => ({
        type: 'code',
        q: 'scores 표를 만드세요: student_id(정수), score(정수, NOT NULL), 그리고 student_id가 students 표의 id를 가리키는 FOREIGN KEY로 지정하세요.',
        starter: '',
        rows: 5,
        placeholder: 'CREATE TABLE scores (\n  student_id INTEGER,\n  score INTEGER NOT NULL,\n  FOREIGN KEY (student_id) REFERENCES students(id)\n);',
        accept: ['CREATE TABLE scores (\n  student_id INTEGER,\n  score INTEGER NOT NULL,\n  FOREIGN KEY (student_id) REFERENCES students(id)\n);', 'CREATE TABLE scores (student_id INTEGER, score INTEGER NOT NULL, FOREIGN KEY (student_id) REFERENCES students(id));'],
        why: 'FOREIGN KEY (열이름) REFERENCES 표이름(열이름) 형태로 다른 표와의 연결을 정의해요.',
        hint: '마지막 줄에 FOREIGN KEY (student_id) REFERENCES students(id)를 추가하세요.'
      })
    },
    {
      id: 'alterTable',
      title: 'ALTER TABLE로 표 구조 바꾸기',
      ready: true,
      summary: '이미 만들어진 표에 열을 추가하거나, 열/표 이름을 바꾸는 방법을 배워요.',
      goals: ['ADD COLUMN으로 열 추가하기', '열 이름 바꾸기', '표 이름 바꾸기'],
      blocks: [
        {
          h: '이미 있는 표에 열 추가하기',
          html: `<p><code>ALTER TABLE 표이름 ADD COLUMN 열이름 타입</code>으로, 이미 만들어진 표에 새 열을 추가할 수 있어요.</p>`,
          code: {
            label: 'add_column.sql',
            lang: 'sql',
            src: `ALTER TABLE students ADD COLUMN email TEXT;`
          }
        },
        {
          h: '열 이름 바꾸기',
          html: `<p><code>RENAME COLUMN 기존이름 TO 새이름</code>으로 열 이름을 바꿔요.</p>`,
          code: {
            label: 'rename_column.sql',
            lang: 'sql',
            src: `ALTER TABLE students RENAME COLUMN city TO hometown;`
          }
        },
        {
          h: '표 이름 바꾸기',
          html: `<p><code>RENAME TO 새이름</code>으로 표 이름 자체를 바꿔요.</p>`,
          code: {
            label: 'rename_table.sql',
            lang: 'sql',
            src: `ALTER TABLE students RENAME TO learners;`
          },
          after: `<div class="note"><b>참고</b> — 열을 완전히 삭제하는 <code>DROP COLUMN</code>은 데이터베이스 종류에 따라 지원 여부나 문법이 조금씩 달라요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const col = pick(['phone', 'email', 'address']);
          return {
            type: 'blank',
            q: `<code>students</code> 표에 <code>${col}</code>(TEXT 타입) 열을 추가하는 SQL을 완성하세요.`,
            prefix: 'ALTER TABLE students ADD COLUMN ', suffix: ' TEXT;', accept: [col], placeholder: '열 이름',
            why: `<code>ADD COLUMN ${col} TEXT</code>로 새 열을 추가해요.`,
            hint: '추가하고 싶은 열 이름을 그대로 쓰세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `이미 있는 표에 새 열을 추가하는 두 단어(ADD 뒤에 오는 것)를 쓰세요.`,
          prefix: 'ALTER TABLE students ADD ', suffix: ' email TEXT;', accept: ['COLUMN', 'column'], placeholder: '키워드',
          why: '<code>ADD COLUMN</code>으로 새 열을 추가해요.',
          hint: '"열"이라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'blank',
          q: `<code>city</code> 열의 이름을 <code>hometown</code>으로 바꾸는 SQL을 완성하세요.`,
          prefix: 'ALTER TABLE students ', suffix: ' city TO hometown;', accept: ['RENAME COLUMN', 'rename column'], placeholder: '키워드',
          why: '<code>RENAME COLUMN 기존이름 TO 새이름</code>으로 열 이름을 바꿔요.',
          hint: '"이름을 바꾸다"라는 뜻의 영어 단어와 "열"이 합쳐져요.'
        }),
        () => makeChoice(
          '표 이름 자체를 바꾸고 싶을 때 쓰는 문법은?',
          '<code>ALTER TABLE 기존이름 RENAME TO 새이름;</code>', ['<code>ALTER TABLE 기존이름 ADD COLUMN 새이름;</code>', '<code>CREATE TABLE 새이름;</code>', '<code>UPDATE 기존이름 SET name = 새이름;</code>'],
          '<code>RENAME TO</code>는 표 이름 자체를 바꿔요.',
          '열이 아니라 표 전체의 이름을 바꾸는 상황이에요.'
        ),
        () => ({
          type: 'code',
          q: 'students 표에 grade(정수) 열을 추가하는 SQL을 작성하세요.',
          starter: '',
          placeholder: 'ALTER TABLE students ADD COLUMN grade INTEGER;',
          accept: ['ALTER TABLE students ADD COLUMN grade INTEGER;'],
          why: 'ALTER TABLE 표이름 ADD COLUMN 열이름 타입; 형태로 새 열을 추가해요.',
          hint: 'ALTER TABLE students ADD COLUMN grade INTEGER;를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const oldName = pick(['city', 'age']);
        const newName = oldName === 'city' ? 'hometown' : 'years_old';
        return {
          type: 'blank',
          q: `<code>students</code> 표의 <code>${oldName}</code> 열 이름을 <code>${newName}</code>으로 바꾸는 SQL 문장을 처음부터 끝까지 완성하세요.`,
          prefix: '', suffix: '', accept: [`ALTER TABLE students RENAME COLUMN ${oldName} TO ${newName};`], placeholder: 'ALTER TABLE ...;',
          why: `<code>ALTER TABLE students RENAME COLUMN ${oldName} TO ${newName};</code>로 열 이름을 바꿔요.`,
          hint: 'ALTER TABLE 표이름 RENAME COLUMN 기존이름 TO 새이름; 순서를 따라 써보세요.'
        };
      }
    },
    {
      id: 'indexes',
      title: '인덱스로 조회 속도 높이기',
      ready: true,
      summary: '책의 "찾아보기"처럼, 원하는 데이터를 빠르게 찾을 수 있게 해주는 인덱스와 그 대가를 배워요.',
      goals: ['인덱스가 뭔지: 책의 찾아보기', 'CREATE INDEX 만들기', '인덱스의 트레이드오프'],
      blocks: [
        {
          h: '책의 "찾아보기"처럼: 인덱스',
          html: `<p>인덱스가 없으면, 데이터베이스는 원하는 값을 찾기 위해 표의 <b>모든 행을 처음부터 끝까지</b> 뒤져요(풀 스캔). <b>인덱스</b>는 책 뒤의 "찾아보기"처럼, 특정 열의 값들을 미리 정렬해서 빠르게 찾아갈 수 있게 해줘요.</p>`
        },
        {
          h: '인덱스 만들기',
          html: `<p><code>CREATE INDEX 인덱스이름 ON 표(열)</code>로 특정 열에 인덱스를 만들어요.</p>`,
          code: {
            label: 'create_index.sql',
            lang: 'sql',
            src: `CREATE INDEX idx_students_name ON students(name);`
          }
        },
        {
          h: '공짜가 아니에요: 트레이드오프',
          html: `<p>인덱스는 <b>조회(SELECT)</b>는 빠르게 해주지만, 데이터를 추가·수정할 때마다 인덱스도 같이 갱신해야 해서 <b>쓰기(INSERT/UPDATE)는 오히려 느려지고</b>, 저장 공간도 더 써요. 그래서 <b>자주 검색되는 열</b>에만 신중하게 만들어야 해요.</p>`,
          after: `<div class="note"><b>비유</b> — 책마다 찾아보기를 만들면 책을 찾긴 쉬워지지만, 책 내용이 바뀔 때마다 찾아보기도 다시 정리해야 하는 것과 같아요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>students</code> 표의 <code>name</code> 열에 인덱스를 만드는 SQL을 완성하세요. (인덱스 이름은 idx_name)`,
          prefix: '', suffix: ' idx_name ON students(name);', accept: ['CREATE INDEX', 'create index'], placeholder: '키워드',
          why: '<code>CREATE INDEX 이름 ON 표(열)</code>로 인덱스를 만들어요.',
          hint: '"만들다"와 "색인"에 해당하는 영어 단어예요.'
        }),
        () => makeChoice(
          '인덱스가 있는 열로 조회(SELECT)하면 어떻게 될까요?',
          '표 전체를 뒤지지 않고 훨씬 빠르게 찾을 수 있다', ['오히려 조회가 느려진다', '조회 결과가 달라진다', '아무 영향 없다'],
          '인덱스는 정렬된 색인 덕분에 원하는 값을 훨씬 빠르게 찾게 해줘요.',
          '책의 찾아보기가 조회를 빠르게 하는 것과 같은 원리예요.'
        ),
        () => makeChoice(
          '인덱스를 너무 많이 만들면 생기는 단점은?',
          '데이터를 추가/수정할 때마다 인덱스도 갱신해야 해서 쓰기가 느려진다',
          ['조회 결과가 부정확해진다', '표를 아예 못 쓰게 된다', 'SELECT 문법이 바뀐다'],
          '인덱스는 쓰기(INSERT/UPDATE) 작업마다 함께 갱신돼야 해서, 너무 많으면 쓰기 성능이 떨어져요.',
          '"조회는 빠르게, 쓰기는 느리게" 만드는 트레이드오프를 떠올려보세요.'
        ),
        () => makeChoice(
          '인덱스를 만들기에 가장 적합한 열은?',
          '자주 WHERE 조건이나 검색에 쓰이는 열', ['한 번도 검색에 안 쓰이는 열', '아무 열이나 상관없다', 'PRIMARY KEY가 아닌 모든 열'],
          '자주 검색·조건에 쓰이는 열에 인덱스를 걸어야 실제로 이득이 커요.',
          '인덱스의 목적이 "빠른 검색"이라는 걸 생각하면, 어떤 열에 걸어야 효과적일지 알 수 있어요.'
        ),
        () => ({
          type: 'code',
          q: 'scores 표의 student_id 열에 idx_student_id라는 이름의 인덱스를 만드는 SQL을 작성하세요.',
          starter: '',
          placeholder: 'CREATE INDEX idx_student_id ON scores(student_id);',
          accept: ['CREATE INDEX idx_student_id ON scores(student_id);'],
          why: 'CREATE INDEX 이름 ON 표(열); 형태로 인덱스를 만들어요.',
          hint: 'CREATE INDEX idx_student_id ON scores(student_id);를 그대로 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '학생 수백만 명이 있는 students 표에서, WHERE name = ? 조건으로 자주 검색을 한다면 가장 도움이 되는 것은?',
        'name 열에 인덱스를 만든다', ['name 열의 타입을 TEXT에서 INTEGER로 바꾼다', 'age 열에 인덱스를 만든다', '표를 통째로 다시 만든다'],
        '자주 조건으로 쓰이는 name 열에 인덱스를 만들면, 그 검색이 훨씬 빨라져요.',
        '실제로 자주 검색에 쓰이는 열이 어떤 열인지 확인해보세요.'
      )
    },
    {
      id: 'rightFullJoin',
      title: 'RIGHT JOIN과 FULL OUTER JOIN',
      ready: true,
      summary: 'LEFT JOIN의 반대인 RIGHT JOIN과, 양쪽을 다 남기는 FULL OUTER JOIN을 배우고, DB마다 지원이 다르다는 점도 알아둬요.',
      goals: ['RIGHT JOIN: 오른쪽 표 기준으로 다 남기기', 'FULL OUTER JOIN: 양쪽 다 남기기', 'DB마다 지원 여부가 다르다는 점'],
      blocks: [
        {
          h: '오른쪽 표를 다 남기기: RIGHT JOIN',
          html: `<p><code>RIGHT JOIN</code>은 <code>LEFT JOIN</code>의 반대예요. <code>FROM</code> 뒤에 <b>나중에 쓴(오른쪽) 표의 모든 행</b>을 다 남기고, 짝이 없는 자리는 <code>NULL</code>로 채워요.</p>`,
          code: {
            label: 'right_join.sql',
            lang: 'sql',
            src: `SELECT students.name, scores.score
FROM students
RIGHT JOIN scores ON students.id = scores.student_id;`
          }
        },
        {
          h: '양쪽 다 남기기: FULL OUTER JOIN',
          html: `<p><code>FULL OUTER JOIN</code>은 양쪽 표에서 짝이 없는 행도 <b>전부</b> 남겨요. 짝이 없는 자리는 양쪽 다 <code>NULL</code>로 채워져요.</p>`,
          code: {
            label: 'full_outer_join.sql',
            lang: 'sql',
            src: `SELECT students.name, scores.score
FROM students
FULL OUTER JOIN scores ON students.id = scores.student_id;`
          }
        },
        {
          h: 'DB마다 지원이 달라요',
          html: `<p>이건 표준 SQL이지만, <b>MySQL은 FULL OUTER JOIN을 직접 지원하지 않아요</b>(LEFT JOIN + UNION + RIGHT JOIN으로 흉내내야 해요). PostgreSQL, SQL Server는 지원해요. 실무에서는 어떤 데이터베이스를 쓰는지에 따라 실제로 쓸 수 있는 문법이 달라질 수 있다는 걸 기억해두세요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `오른쪽(FROM 뒤에 나중에 쓴) 표의 모든 행을 다 남기는 JOIN의 이름을 쓰세요.`,
          prefix: '', suffix: ' JOIN scores ON students.id = scores.student_id', accept: ['RIGHT', 'right'], placeholder: '키워드',
          why: '<code>RIGHT JOIN</code>은 오른쪽 표의 모든 행을 남겨요.',
          hint: 'LEFT JOIN의 반대말이에요.'
        }),
        () => {
          const studentsCount = randInt(3, 6);
          const scoresCount = randInt(studentsCount + 1, studentsCount + 3);
          return {
            type: 'blank',
            q: `<code>students</code>에 학생이 ${studentsCount}명 있고, <code>scores</code>에는 (일부는 짝이 없는 학생 데이터 포함해서) 행이 ${scoresCount}개 있어요. <code>students RIGHT JOIN scores</code>의 결과는 몇 행일까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(scoresCount)], placeholder: '숫자',
            why: `RIGHT JOIN은 오른쪽 표(scores)의 모든 행(${scoresCount}개)을 다 남겨요.`,
            hint: 'RIGHT JOIN은 오른쪽 표의 행 개수를 기준으로 남긴다는 걸 떠올려보세요.'
          };
        },
        () => makeChoice(
          '양쪽 표에서 짝이 없는 행도 전부 남기고 싶을 때 쓰는 JOIN은?',
          '<code>FULL OUTER JOIN</code>', ['<code>INNER JOIN</code>', '<code>LEFT JOIN</code>만 쓰면 충분', '<code>RIGHT JOIN</code>만 쓰면 충분'],
          '<code>FULL OUTER JOIN</code>은 양쪽 표의 모든 행을 다 남기고, 짝이 없는 자리는 NULL로 채워요.',
          'LEFT나 RIGHT 하나만으로는 "양쪽 다"를 표현할 수 없다는 걸 생각해보세요.'
        ),
        () => makeChoice(
          'MySQL에서 FULL OUTER JOIN을 직접 쓰려고 하면 어떻게 될까요?',
          '지원하지 않아서 오류가 나거나 다른 방법(LEFT JOIN + UNION + RIGHT JOIN)으로 흉내내야 한다',
          ['항상 정상적으로 동작한다', '자동으로 INNER JOIN으로 바뀐다', 'MySQL에는 JOIN 자체가 없다'],
          'MySQL은 FULL OUTER JOIN을 직접 지원하지 않아서, 다른 방식으로 흉내내야 해요.',
          '표준 SQL 문법이라고 해서 모든 데이터베이스가 다 지원하는 건 아니라는 걸 기억하세요.'
        ),
        () => ({
          type: 'code',
          q: 'students 표와 scores 표를 student_id 기준으로 RIGHT JOIN해서, 이름과 점수를 조회하는 SQL을 작성하세요.',
          starter: '',
          placeholder: 'SELECT students.name, scores.score FROM students RIGHT JOIN scores ON students.id = scores.student_id;',
          accept: ['SELECT students.name, scores.score FROM students RIGHT JOIN scores ON students.id = scores.student_id;'],
          why: 'RIGHT JOIN 뒤에 표 이름과 ON 조건을 INNER/LEFT JOIN과 똑같은 방식으로 써요.',
          hint: 'FROM students RIGHT JOIN scores ON students.id = scores.student_id; 형태로 쓰세요.'
        }),
      ],
      boss: () => {
        const studentsCount = randInt(3, 6);
        const scoresCount = randInt(studentsCount + 1, studentsCount + 4);
        return {
          type: 'blank',
          q: `<code>students</code>에 학생이 ${studentsCount}명, <code>scores</code>에 행이 ${scoresCount}개(그중 일부는 students에 없는 student_id도 포함) 있어요. <code>students RIGHT JOIN scores ON students.id = scores.student_id</code>의 결과는 몇 행일까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(scoresCount)], placeholder: '숫자',
          why: `RIGHT JOIN은 오른쪽 표인 scores의 모든 행(${scoresCount}개)을 다 남겨요. 짝이 없는 student_id는 students 쪽 값이 NULL로 채워질 뿐이에요.`,
          hint: 'RIGHT JOIN은 오른쪽 표 전체를 기준으로 남긴다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'selfJoin',
      title: 'SELF JOIN',
      ready: true,
      summary: '한 표를 마치 두 개의 표인 것처럼 자기 자신과 연결해서, 같은 표 안의 행끼리 비교하는 법을 배워요.',
      goals: ['표를 자기 자신과 연결하기', '별칭(AS)으로 구분하기', '중복 쌍 방지하기'],
      blocks: [
        {
          h: '표를 자기 자신과 연결하기: SELF JOIN',
          html: `<p>한 표 안에서 서로 다른 행끼리 비교하고 싶을 때, 그 표를 <b>마치 두 개의 표</b>인 것처럼 자기 자신과 조인할 수 있어요. 이때 <b>별칭(alias)</b>을 붙여서 두 쪽을 구분해요.</p>`,
          code: {
            label: 'self_join.sql',
            lang: 'sql',
            src: `SELECT a.name AS student1, b.name AS student2, a.city
FROM students a
JOIN students b ON a.city = b.city AND a.id < b.id;`,
            out: `student1 | student2 | city\n지수      | 서연      | 서울`
          }
        },
        {
          h: '별칭(AS)으로 구분하기',
          html: `<p><code>students a</code>, <code>students b</code>처럼 같은 표에 서로 다른 별칭을 붙이면, <code>a.name</code>과 <code>b.name</code>을 완전히 다른 것처럼 다룰 수 있어요.</p>`
        },
        {
          h: '왜 <code>a.id &lt; b.id</code> 조건을 넣을까요',
          html: `<p>이 조건이 없으면 같은 쌍이 <b>거꾸로도 한 번 더</b>(지수-서연, 서연-지수) 나오고, 자기 자신과도 짝지어져요(지수-지수). <code>a.id &lt; b.id</code>는 이런 중복과 자기 자신과의 짝을 막아줘요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>students</code> 표를 <code>a</code>라는 별칭으로 쓰는 코드를 완성하세요.`,
          prefix: 'FROM students ', suffix: '', accept: ['a', 'AS a'], placeholder: '별칭',
          why: '표 이름 뒤에 별칭을 바로 쓰거나 <code>AS a</code>처럼 써서 별칭을 붙여요.',
          hint: '알파벳 한 글자로 짧게 이름을 붙이면 돼요.'
        }),
        () => makeChoice(
          'SELF JOIN에서 <code>a.id &lt; b.id</code> 조건을 넣는 이유는?',
          '같은 쌍이 거꾸로 중복되거나 자기 자신과 짝지어지는 걸 막기 위해',
          ['실행 속도를 높이기 위해', 'a와 b를 서로 다른 표로 만들기 위해', 'NULL 값을 제거하기 위해'],
          '이 조건이 없으면 (지수, 서연)과 (서연, 지수)가 둘 다 나오고, (지수, 지수) 같은 자기 자신과의 짝도 나와요.',
          '조건 없이 실행하면 어떤 중복이 생길지 생각해보세요.'
        ),
        () => {
          const total = randInt(4, 7);
          const sameCity = randInt(2, 3);
          const pairs = (sameCity * (sameCity - 1)) / 2;
          return {
            type: 'blank',
            q: `<code>students</code>에 학생이 ${total}명 있고, 그중 ${sameCity}명이 같은 도시(서울)예요. <code>a.city = b.city AND a.id &lt; b.id</code> 조건의 SELF JOIN 결과는 몇 쌍일까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(pairs)], placeholder: '숫자',
            why: `같은 도시인 ${sameCity}명 중에서 서로 다른 두 명을 고르는 조합은 ${pairs}가지예요(중복·역순 제외).`,
            hint: `${sameCity}명 중 2명을 순서 상관없이 고르는 조합의 수를 세어보세요.`
          };
        },
        () => makeChoice(
          'SELF JOIN을 쓰는 상황으로 알맞은 것은?',
          '같은 표 안의 서로 다른 행끼리 비교하고 싶을 때', ['서로 다른 두 표를 합칠 때', '표를 완전히 삭제하고 싶을 때', '표의 이름을 바꾸고 싶을 때'],
          'SELF JOIN은 한 표 안의 행들끼리 서로 비교하고 싶을 때 써요(예: 같은 도시인 학생끼리 짝짓기).',
          '"자기 자신과" 조인한다는 이름의 의미를 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: 'students 표를 a, b라는 별칭으로 자기 자신과 JOIN해서, 같은 city를 가진 서로 다른 두 학생(a.id < b.id)의 이름을 조회하는 SQL을 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'SELECT a.name, b.name\nFROM students a\nJOIN students b ON a.city = b.city AND a.id < b.id;',
          accept: ['SELECT a.name, b.name\nFROM students a\nJOIN students b ON a.city = b.city AND a.id < b.id;'],
          why: 'FROM students a JOIN students b ON ...으로 같은 표를 두 별칭으로 연결해요.',
          hint: 'FROM students a JOIN students b ON a.city = b.city AND a.id < b.id; 형태로 쓰세요.'
        }),
      ],
      boss: () => {
        const sameCity = randInt(3, 5);
        const pairs = (sameCity * (sameCity - 1)) / 2;
        return {
          type: 'blank',
          q: `같은 도시(부산)인 학생이 ${sameCity}명일 때, <code>a.city = b.city AND a.id &lt; b.id</code> 조건의 SELF JOIN으로 만들어지는 쌍의 개수는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(pairs)], placeholder: '숫자',
          why: `${sameCity}명 중 서로 다른 두 명을 순서 상관없이 고르는 조합은 ${pairs}가지예요.`,
          hint: 'n명 중 2명을 고르는 조합의 수를 계산해보세요.'
        };
      }
    },
    {
      id: 'unionQueries',
      title: 'UNION과 UNION ALL',
      ready: true,
      summary: '두 개의 SELECT 결과를 하나로 합치는 UNION과, 중복 제거 여부가 다른 UNION ALL을 배워요.',
      goals: ['UNION으로 두 결과 합치기', 'UNION ALL과의 차이(중복 제거 여부)', '합칠 때 지켜야 할 규칙'],
      blocks: [
        {
          h: '두 쿼리의 결과를 하나로 합치기: UNION',
          html: `<p><code>UNION</code>은 두 개의 <code>SELECT</code> 결과를 하나로 합쳐줘요. 이때 <b>중복된 행은 자동으로 하나만 남겨요</b>.</p>`,
          code: {
            label: 'union.sql',
            lang: 'sql',
            src: `SELECT name FROM students WHERE city = '서울'
UNION
SELECT name FROM students WHERE age >= 18;`
          }
        },
        {
          h: '중복도 그대로 남기기: UNION ALL',
          html: `<p><code>UNION ALL</code>은 <code>UNION</code>과 똑같이 합치지만, <b>중복 제거를 안 해요</b>. 중복 여부를 확인하는 과정이 없어서 <code>UNION</code>보다 <b>더 빨라요</b>.</p>`,
          code: {
            label: 'union_all.sql',
            lang: 'sql',
            src: `SELECT name FROM students WHERE city = '서울'
UNION ALL
SELECT name FROM students WHERE age >= 18;`
          }
        },
        {
          h: '합칠 때 지켜야 할 규칙',
          html: `<p><code>UNION</code>(또는 <code>UNION ALL</code>)으로 합치는 두 <code>SELECT</code>는 <b>열의 개수가 같아야</b> 하고, 같은 순서의 열끼리 <b>의미와 타입이 비슷</b>해야 해요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `두 SELECT 결과를 하나로 합치되, 중복은 하나만 남기는 키워드를 쓰세요.`,
          prefix: 'SELECT name FROM students WHERE city = \'서울\'\n', suffix: '\nSELECT name FROM students WHERE age >= 18;', accept: ['UNION', 'union'], placeholder: '키워드',
          why: '<code>UNION</code>은 두 결과를 합치면서 중복을 제거해요.',
          hint: '"합집합"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>UNION</code>과 <code>UNION ALL</code>의 차이는?',
          'UNION은 중복을 제거하고, UNION ALL은 중복을 그대로 둔다', ['UNION ALL만 두 표를 합칠 수 있다', 'UNION은 항상 더 빠르다', '차이가 전혀 없다'],
          'UNION은 중복 제거 과정이 있고, UNION ALL은 그 과정 없이 그대로 다 합쳐요.',
          '"ALL(전부)"이라는 이름이 무엇을 암시하는지 생각해보세요.'
        ),
        () => makeChoice(
          '이름이 같은 학생이 두 조건 모두에 해당해서 양쪽 SELECT에 다 나올 때, <code>UNION</code>(ALL 없이)의 결과에서 그 이름은 몇 번 나올까요?',
          '1번', ['2번', '0번', '조건에 따라 다르다'],
          'UNION은 중복을 제거해서 한 번만 남겨요.',
          '중복 제거가 되는 쪽이 UNION이라는 걸 떠올려보세요.'
        ),
        () => makeChoice(
          '<code>UNION</code>으로 합치려는 두 <code>SELECT</code>가 지켜야 할 규칙은?',
          '두 SELECT의 열 개수가 같아야 한다', ['두 SELECT가 같은 표를 조회해야 한다', 'WHERE 조건이 완전히 같아야 한다', '정렬 순서가 같아야 한다'],
          '열 개수가 다르면 오류가 나요. 각 열의 의미와 타입도 서로 대응돼야 해요.',
          '표(열)를 세로로 겹쳐 붙인다고 생각하면, 열 개수가 안 맞으면 어떻게 될지 알 수 있어요.'
        ),
        () => ({
          type: 'code',
          q: 'city가 서울인 학생 이름과, age가 18 이상인 학생 이름을 UNION ALL로 합쳐서 조회하는 SQL을 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: "SELECT name FROM students WHERE city = '서울'\nUNION ALL\nSELECT name FROM students WHERE age >= 18;",
          accept: ["SELECT name FROM students WHERE city = '서울'\nUNION ALL\nSELECT name FROM students WHERE age >= 18;"],
          why: '두 SELECT 사이에 UNION ALL을 넣으면 중복 제거 없이 그대로 합쳐져요.',
          hint: '두 SELECT문 사이에 UNION ALL을 넣으세요.'
        }),
      ],
      boss: () => {
        const first = randInt(3, 6);
        const second = randInt(3, 6);
        const overlap = randInt(1, Math.min(first, second));
        const unionCount = first + second - overlap;
        const unionAllCount = first + second;
        return {
          type: 'blank',
          q: `첫 번째 SELECT가 ${first}개, 두 번째 SELECT가 ${second}개의 행을 반환하고, 그중 ${overlap}개가 완전히 겹칠 때, <code>UNION</code>과 <code>UNION ALL</code>의 결과 행 개수를 "UNION개수, UNION ALL개수" 형태로 쓰세요.`,
          prefix: '', suffix: '', accept: [`${unionCount}, ${unionAllCount}`], placeholder: '숫자, 숫자',
          why: `UNION은 겹치는 ${overlap}개를 한 번만 세어서 ${first} + ${second} - ${overlap} = ${unionCount}, UNION ALL은 겹쳐도 다 더해서 ${first} + ${second} = ${unionAllCount}예요.`,
          hint: 'UNION은 중복을 빼고, UNION ALL은 그냥 다 더한다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'caseWhen',
      title: 'CASE WHEN으로 조건부 값 만들기',
      ready: true,
      summary: '조회 결과에 조건에 따라 다른 값을 보여주는 CASE WHEN 문법을 배워요.',
      goals: ['CASE WHEN으로 조건별 값 만들기', 'ELSE로 나머지 처리하기', '집계와 함께 활용하기'],
      blocks: [
        {
          h: '조건에 따라 다른 값 보여주기: CASE WHEN',
          html: `<p><code>CASE WHEN 조건1 THEN 값1 WHEN 조건2 THEN 값2 ELSE 기본값 END</code>은, 조건을 순서대로 확인해서 처음 맞는 조건의 값을 돌려줘요. 프로그래밍 언어의 if/elif/else와 비슷해요.</p>`,
          code: {
            label: 'case_when.sql',
            lang: 'sql',
            src: `SELECT name, age,
  CASE
    WHEN age >= 18 THEN '성인'
    WHEN age >= 13 THEN '청소년'
    ELSE '어린이'
  END AS age_group
FROM students;`
          }
        },
        {
          h: 'ELSE로 나머지 다 처리하기',
          html: `<p>어떤 <code>WHEN</code> 조건에도 안 맞으면 <code>ELSE</code>의 값이 쓰여요. <code>ELSE</code>가 없으면 <code>NULL</code>이 돼요.</p>`
        },
        {
          h: '집계와 함께 쓰기',
          html: `<p><code>CASE WHEN</code>은 <code>SUM</code> 안에 넣어서 "조건에 맞는 것만 세기"에도 자주 써요.</p>`,
          code: {
            label: 'case_with_sum.sql',
            lang: 'sql',
            src: `SELECT SUM(CASE WHEN age >= 18 THEN 1 ELSE 0 END) AS adult_count
FROM students;`
          }
        }
      ],
      quizGenerators: [
        () => {
          const age = randInt(5, 25);
          const label = age >= 18 ? '성인' : age >= 13 ? '청소년' : '어린이';
          return {
            type: 'blank',
            q: `<code>age</code>가 ${age}일 때, <code>CASE WHEN age >= 18 THEN '성인' WHEN age >= 13 THEN '청소년' ELSE '어린이' END</code>의 결과는? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [label], placeholder: '값',
            why: `${age}살은 ${label}에 해당하는 조건에 처음 맞아요.`,
            hint: '조건을 위에서부터 순서대로 확인해서, 처음 맞는 조건의 값이 쓰여요.'
          };
        },
        () => ({
          type: 'blank',
          q: `CASE WHEN 문을 끝맺는 키워드를 쓰세요.`,
          prefix: "CASE WHEN age >= 18 THEN '성인' ELSE '어린이' ", suffix: '', accept: ['END', 'end'], placeholder: '키워드',
          why: '<code>END</code>로 CASE 문을 끝맺어요.',
          hint: '"끝"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'CASE WHEN 문에 <code>ELSE</code>가 없고, 어떤 WHEN 조건에도 안 맞으면 결과는?',
          '<code>NULL</code>', ['오류가 난다', '가장 첫 번째 WHEN 값', '빈 문자열'],
          'ELSE가 없으면, 아무 조건도 안 맞을 때 NULL이 돼요.',
          '"아무것도 해당 안 된다"는 걸 나타내는 특별한 값을 떠올려보세요.'
        ),
        () => {
          const count = randInt(2, 6);
          return {
            type: 'blank',
            q: `<code>students</code>에 나이가 18 이상인 학생이 ${count}명 있을 때, <code>SUM(CASE WHEN age >= 18 THEN 1 ELSE 0 END)</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(count)], placeholder: '숫자',
            why: `조건에 맞는 행마다 1을 더하니, 18세 이상인 ${count}명만큼 더해져서 ${count}예요.`,
            hint: '조건에 맞으면 1, 안 맞으면 0을 더하는 걸 다 합친 값이에요.'
          };
        },
        () => ({
          type: 'code',
          q: 'students 표에서 name과, age가 13 이상이면 "청소년 이상", 아니면 "어린이"를 category라는 이름으로 보여주는 SQL을 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: "SELECT name,\n  CASE\n    WHEN age >= 13 THEN '청소년 이상'\n    ELSE '어린이'\n  END AS category\nFROM students;",
          accept: ["SELECT name,\n  CASE\n    WHEN age >= 13 THEN '청소년 이상'\n    ELSE '어린이'\n  END AS category\nFROM students;"],
          why: 'CASE WHEN 조건 THEN 값 ELSE 기본값 END AS 별명 형태로 써요.',
          hint: "CASE WHEN age >= 13 THEN '청소년 이상' ELSE '어린이' END AS category를 SELECT 뒤에 쓰세요."
        }),
      ],
      boss: () => {
        const age = randInt(5, 25);
        const label = age >= 18 ? '성인 요금' : age >= 13 ? '청소년 요금' : '어린이 요금';
        return {
          type: 'blank',
          q: `<code>CASE WHEN age >= 18 THEN '성인 요금' WHEN age >= 13 THEN '청소년 요금' ELSE '어린이 요금' END</code>을 <code>age</code>가 ${age}인 학생에게 적용하면 결과는? (따옴표 없이)`,
          prefix: '', suffix: '', accept: [label], placeholder: '값',
          why: `${age}살은 "${label}"에 해당하는 조건에 처음 맞아요.`,
          hint: '조건을 순서대로 확인해서 처음 맞는 값을 찾아보세요.'
        };
      }
    },
    {
      id: 'nullHandling',
      title: 'NULL 다루기',
      ready: true,
      summary: '값이 없다는 특수한 상태인 NULL을 안전하게 확인하고, COALESCE로 기본값을 대신 채우는 법을 배워요.',
      goals: ['IS NULL / IS NOT NULL로 확인하기', '= NULL이 안 되는 이유', 'COALESCE로 기본값 채우기'],
      blocks: [
        {
          h: '빈 값 확인하기: IS NULL',
          html: `<p><code>NULL</code>은 "값이 없다"를 나타내는 특수한 상태예요. NULL인지 확인할 땐 <code>IS NULL</code>(또는 <code>IS NOT NULL</code>)을 써야 해요.</p>`,
          code: {
            label: 'is_null.sql',
            lang: 'sql',
            src: `SELECT student_id FROM scores WHERE score IS NULL;`
          }
        },
        {
          h: '왜 <code>= NULL</code>은 안 될까요',
          html: `<p><code>NULL</code>은 "알 수 없음"에 가까운 개념이라, <code>=</code>로 비교하면 <b>항상 알 수 없음(사실상 거짓 취급)</b>이 돼요. <code>WHERE score = NULL</code>은 <b>절대로</b> 어떤 행도 찾아내지 못해요. 그래서 반드시 <code>IS NULL</code>을 써야 해요.</p>`
        },
        {
          h: 'NULL 대신 기본값 넣기: COALESCE',
          html: `<p><code>COALESCE(값, 기본값)</code>은 그 값이 <code>NULL</code>이면 기본값을, 아니면 원래 값을 그대로 돌려줘요.</p>`,
          code: {
            label: 'coalesce.sql',
            lang: 'sql',
            src: `SELECT student_id, COALESCE(score, 0) AS score
FROM scores;`
          }
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>score</code>가 NULL인 행만 찾는 조건을 완성하세요.`,
          prefix: 'WHERE score ', suffix: '', accept: ['IS NULL', 'is null'], placeholder: '조건',
          why: 'NULL 여부는 <code>IS NULL</code>로 확인해야 해요.',
          hint: '"~이다"와 "빈 값"이 합쳐진 표현이에요.'
        }),
        () => makeChoice(
          '<code>WHERE score = NULL</code>을 실행하면 어떻게 될까요?',
          '어떤 행도 찾지 못한다(항상 결과가 없다)', ['score가 NULL인 행을 정확히 찾아준다', '오류가 난다', 'score가 0인 행을 찾아준다'],
          'NULL은 =로 비교할 수 없어서, <code>= NULL</code>은 항상 결과가 없어요. IS NULL을 써야 해요.',
          'NULL은 "알 수 없음"이라, 그 무엇과 비교해도 "같다"고 확정할 수 없다는 걸 생각해보세요.'
        ),
        () => {
          const hasScore = Math.random() < 0.5;
          const score = randInt(60, 100);
          return {
            type: 'blank',
            q: `<code>score</code>가 ${hasScore ? score : 'NULL'}일 때, <code>COALESCE(score, 0)</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [hasScore ? String(score) : '0'], placeholder: '숫자',
            why: hasScore ? `NULL이 아니니 원래 값 ${score}가 그대로 나와요.` : `NULL이라서 COALESCE의 기본값인 0이 나와요.`,
            hint: 'COALESCE는 NULL일 때만 기본값을 쓰고, 아니면 원래 값을 그대로 돌려줘요.'
          };
        },
        () => makeChoice(
          '<code>COALESCE(값, 기본값)</code>이 기본값을 쓰는 경우는?',
          '값이 NULL일 때만', ['값이 0일 때', '값이 빈 문자열일 때', '항상 기본값을 쓴다'],
          'COALESCE는 정확히 NULL일 때만 기본값을 쓰고, 0이나 빈 문자열은 "값이 있는" 것으로 취급해요.',
          '파이썬의 None, 자바스크립트의 null과 비슷한 개념이라는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: 'scores 표에서 score가 NULL이 아닌 행만 조회하는 SQL을 작성하세요.',
          starter: '',
          placeholder: 'SELECT * FROM scores WHERE score IS NOT NULL;',
          accept: ['SELECT * FROM scores WHERE score IS NOT NULL;'],
          why: 'IS NOT NULL로 NULL이 아닌 행만 걸러낼 수 있어요.',
          hint: 'WHERE score IS NOT NULL;을 붙이세요.'
        }),
      ],
      boss: () => {
        const scores = [randInt(60, 100), null, randInt(60, 100), null];
        const total = scores.reduce((sum, s) => sum + (s === null ? 0 : s), 0);
        return {
          type: 'blank',
          q: `<code>scores.score</code>가 순서대로 ${scores.map(s => s === null ? 'NULL' : s).join(', ')}인 네 행이 있을 때, <code>SUM(COALESCE(score, 0))</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
          why: `COALESCE가 NULL을 0으로 바꿔서 다 더하면 ${total}이에요.`,
          hint: 'NULL은 COALESCE로 0이 된 뒤 더해진다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'stringFunctions',
      title: '문자열 함수',
      ready: true,
      summary: '패턴으로 검색하는 LIKE, 대소문자를 바꾸는 UPPER/LOWER, 일부만 잘라내는 SUBSTR 같은 문자열 함수를 배워요.',
      goals: ['LIKE로 패턴 검색하기', 'UPPER/LOWER로 대소문자 바꾸기', 'SUBSTR와 TRIM'],
      blocks: [
        {
          h: '패턴으로 검색하기: LIKE',
          html: `<p><code>LIKE</code>는 정확히 일치하지 않아도 <b>패턴</b>으로 찾을 수 있게 해줘요. <code>%</code>는 아무 글자나 몇 개든(0개 포함), <code>_</code>는 정확히 한 글자를 나타내요.</p>`,
          code: {
            label: 'like.sql',
            lang: 'sql',
            src: `SELECT name FROM students WHERE name LIKE '%수%';`
          }
        },
        {
          h: '대소문자 바꾸기: UPPER / LOWER',
          html: `<p><code>UPPER(값)</code>은 대문자로, <code>LOWER(값)</code>은 소문자로 바꿔줘요.</p>`,
          code: {
            label: 'upper_lower.sql',
            lang: 'sql',
            src: `SELECT UPPER(city) FROM students;`,
            out: `서울 → (한글은 대소문자 구분이 없어서 그대로) 서울`
          }
        },
        {
          h: '일부만 잘라내고 공백 없애기: SUBSTR와 TRIM',
          html: `<p><code>SUBSTR(문자열, 시작위치, 길이)</code>는 문자열 일부를 잘라내고, <code>TRIM(문자열)</code>은 앞뒤 공백을 없애줘요.</p>`,
          code: {
            label: 'substr_trim.sql',
            lang: 'sql',
            src: `SELECT SUBSTR(name, 1, 1) FROM students;
SELECT TRIM('  지수  ');`,
            out: `지\n지수`
          },
          after: `<div class="note"><b>참고</b> — SQLite는 <code>SUBSTR</code>을 쓰고, MySQL/PostgreSQL 등은 <code>SUBSTRING</code>이라는 이름도 함께 지원해요. 데이터베이스마다 함수 이름이 조금씩 다를 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const keyword = pick(['수', '민', '연']);
          return {
            type: 'blank',
            q: `이름에 "${keyword}"가 들어간 학생을 찾고 싶어요. <code>WHERE name LIKE</code> 뒤에 올 패턴을 작은따옴표 포함해서 쓰세요.`,
            prefix: '', suffix: '', accept: [`'%${keyword}%'`], placeholder: "'%글자%'",
            why: `앞뒤에 <code>%</code>를 붙이면 "그 글자를 포함하는" 어디든 찾아요.`,
            hint: '앞뒤로 % 기호를 붙이면 "포함"이라는 뜻이 돼요.'
          };
        },
        () => makeChoice(
          'LIKE 패턴에서 정확히 한 글자를 나타내는 기호는?',
          '<code>_</code>', ['<code>%</code>', '<code>*</code>', '<code>?</code>'],
          '<code>_</code>는 정확히 한 글자를 나타내요. <code>%</code>는 몇 글자든(0개 포함) 나타내요.',
          '밑줄 하나가 글자 하나를 대신한다고 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `문자열을 전부 대문자로 바꾸는 함수를 쓰세요.`,
          prefix: 'SELECT ', suffix: '(city) FROM students;', accept: ['UPPER', 'upper'], placeholder: '함수 이름',
          why: '<code>UPPER(값)</code>은 대문자로 바꿔줘요.',
          hint: '"위(upper)"라는 이름처럼, 대문자를 뜻해요.'
        }),
        () => {
          const name = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>SUBSTR('${name}', 1, 1)</code>의 결과는? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [name[0]], placeholder: '값',
            why: `1번째 글자부터 1글자만 잘라내서 "${name[0]}"이 나와요.`,
            hint: 'SUBSTR(문자열, 시작위치, 길이)에서 첫 글자 하나만 잘라내는 거예요.'
          };
        },
        () => ({
          type: 'code',
          q: '이름에 "준"이 들어간 학생을 찾는 SQL을 작성하세요.',
          starter: '',
          placeholder: "SELECT * FROM students WHERE name LIKE '%준%';",
          accept: ["SELECT * FROM students WHERE name LIKE '%준%';"],
          why: "LIKE '%준%'은 앞뒤에 무엇이 있든 '준'을 포함하는 값을 찾아요.",
          hint: "WHERE name LIKE '%준%';을 쓰세요."
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준', '서연', '도윤']);
        const len = randInt(1, 2);
        return {
          type: 'blank',
          q: `<code>SUBSTR('${name}', 1, ${len})</code>의 결과는? (따옴표 없이)`,
          prefix: '', suffix: '', accept: [name.slice(0, len)], placeholder: '값',
          why: `1번째 글자부터 ${len}글자를 잘라내서 "${name.slice(0, len)}"이 나와요.`,
          hint: '시작 위치 1번부터 지정한 길이만큼 잘라낸다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'dateFunctions',
      title: '날짜/시간 함수',
      ready: true,
      summary: '날짜를 계산하고, 원하는 형식으로 보여주고, 두 날짜 사이의 차이를 구하는 SQL 날짜 함수를 배워요.',
      goals: ["date()로 날짜 계산하기", 'strftime으로 원하는 형식 만들기', '날짜 차이 계산하기'],
      blocks: [
        {
          h: '날짜를 계산하기: date()',
          html: `<p><code>date(날짜, 조정)</code>은 그 날짜에서 며칠을 더하거나 뺀 새 날짜를 계산해줘요.</p>`,
          code: {
            label: 'date_calc.sql',
            lang: 'sql',
            src: `SELECT date('2026-01-01', '+30 days');`,
            out: `2026-01-31`
          }
        },
        {
          h: '원하는 형식으로 보여주기: strftime',
          html: `<p><code>strftime(서식, 날짜)</code>는 날짜를 원하는 모양으로 바꿔줘요. <code>%Y</code>는 연도, <code>%m</code>은 월이에요.</p>`,
          code: {
            label: 'strftime.sql',
            lang: 'sql',
            src: `SELECT strftime('%Y년 %m월', '2026-03-05');`,
            out: `2026년 03월`
          }
        },
        {
          h: '날짜 차이 계산하기: julianday',
          html: `<p><code>julianday(날짜)</code>는 그 날짜를 "율리우스일"이라는 하나의 숫자로 바꿔줘서, 두 날짜를 빼면 <b>그 사이 며칠인지</b>를 계산할 수 있어요.</p>`,
          code: {
            label: 'julianday.sql',
            lang: 'sql',
            src: `SELECT julianday('2026-03-05') - julianday('2026-01-01');`,
            out: `63.0`
          }
        }
      ],
      quizGenerators: [
        () => {
          const days = randInt(10, 60);
          const start = new Date(2026, 0, 1);
          const end = new Date(start.getTime() + days * 86400000);
          const y = end.getFullYear(), m = String(end.getMonth() + 1).padStart(2, '0'), d = String(end.getDate()).padStart(2, '0');
          return {
            type: 'blank',
            q: `<code>date('2026-01-01', '+${days} days')</code>의 결과는? (YYYY-MM-DD 형식)`,
            prefix: '', suffix: '', accept: [`${y}-${m}-${d}`], placeholder: 'YYYY-MM-DD',
            why: `2026년 1월 1일에서 ${days}일 뒤는 ${y}-${m}-${d}예요.`,
            hint: '2026년 1월 1일부터 날짜를 며칠 세어보세요.'
          };
        },
        () => {
          const y = randInt(2024, 2027), m = randInt(1, 12), d = randInt(1, 28);
          const mm = String(m).padStart(2, '0'), dd = String(d).padStart(2, '0');
          return {
            type: 'blank',
            q: `<code>strftime('%Y-%m-%d', '${y}-${mm}-${dd}')</code>의 결과는?`,
            prefix: '', suffix: '', accept: [`${y}-${mm}-${dd}`], placeholder: 'YYYY-MM-DD',
            why: `%Y-%m-%d 서식은 그대로 연-월-일 형식으로 보여줘서 ${y}-${mm}-${dd}예요.`,
            hint: '%Y는 연도, %m은 월, %d는 일을 나타내요.'
          };
        },
        () => {
          const days = randInt(5, 90);
          const start = new Date(2026, 0, 1);
          const end = new Date(start.getTime() + days * 86400000);
          const y = end.getFullYear(), m = end.getMonth() + 1, d = end.getDate();
          return {
            type: 'blank',
            q: `<code>julianday('${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}') - julianday('2026-01-01')</code>의 결과는? 숫자만 쓰세요. (소수점 .0 포함)`,
            prefix: '', suffix: '', accept: [`${days}.0`], placeholder: '숫자.0',
            why: `2026년 1월 1일부터 ${days}일 차이가 나서 ${days}.0이 나와요.`,
            hint: 'julianday의 차이는 정확히 그 사이 날짜 수(일 단위)예요.'
          };
        },
        () => makeChoice(
          '두 날짜 사이가 며칠인지 계산하고 싶을 때 쓰는 함수는?',
          '<code>julianday</code>', ['<code>strftime</code>', '<code>date</code>만으로는 불가능', 'SUBSTR'],
          'julianday로 각 날짜를 숫자로 바꾼 뒤 빼면 그 사이 날짜 수가 나와요.',
          '날짜를 하나의 숫자로 바꿔야 뺄셈이 가능해진다는 걸 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: "'2026-06-15'에서 100일 뒤의 날짜를 조회하는 SQL을 작성하세요.",
          starter: '',
          placeholder: "SELECT date('2026-06-15', '+100 days');",
          accept: ["SELECT date('2026-06-15', '+100 days');"],
          why: "date(날짜, '+N days')로 며칠 뒤의 날짜를 계산해요.",
          hint: "SELECT date('2026-06-15', '+100 days');를 그대로 쓰세요."
        }),
      ],
      boss: () => {
        const days = randInt(20, 200);
        const start = new Date(2026, 0, 1);
        const end = new Date(start.getTime() + days * 86400000);
        const y = end.getFullYear(), m = String(end.getMonth() + 1).padStart(2, '0'), d = String(end.getDate()).padStart(2, '0');
        return {
          type: 'blank',
          q: `<code>date('2026-01-01', '+${days} days')</code>로 구한 날짜와, <code>'2026-01-01'</code> 사이의 <code>julianday</code> 차이는 얼마일까요? 숫자만 쓰세요. (소수점 .0 포함)`,
          prefix: '', suffix: '', accept: [`${days}.0`], placeholder: '숫자.0',
          why: `날짜를 ${days}일 뒤로 계산했으니, 그 차이도 정확히 ${days}.0이에요.`,
          hint: '날짜를 계산할 때 더한 일수가 곧 julianday의 차이예요.'
        };
      }
    },
    {
      id: 'distinctKeyword',
      title: 'DISTINCT로 중복 없애기',
      ready: true,
      summary: '조회 결과에서 중복된 값을 없애는 DISTINCT와, 중복 없는 개수를 세는 COUNT(DISTINCT ...)를 배워요.',
      goals: ['DISTINCT로 중복 제거하기', '여러 열에 함께 적용하기', 'COUNT(DISTINCT ...)로 개수 세기'],
      blocks: [
        {
          h: '중복 없이 값 보기: DISTINCT',
          html: `<p><code>SELECT DISTINCT 열</code>은 그 열의 값 중 <b>중복을 없애고 서로 다른 값만</b> 보여줘요.</p>`,
          code: {
            label: 'distinct.sql',
            lang: 'sql',
            src: `SELECT DISTINCT city FROM students;`,
            out: `city\n----\n서울\n부산`
          }
        },
        {
          h: '여러 열에 함께 적용하기',
          html: `<p><code>SELECT DISTINCT city, age</code>처럼 여러 열에 쓰면, <b>그 열들의 조합 전체</b>가 똑같은 행만 하나로 취급해요.</p>`
        },
        {
          h: '중복 없는 개수 세기: COUNT(DISTINCT ...)',
          html: `<p><code>COUNT(DISTINCT 열)</code>은 그 열에서 <b>서로 다른 값이 몇 종류</b>인지 세어줘요.</p>`,
          code: {
            label: 'count_distinct.sql',
            lang: 'sql',
            src: `SELECT COUNT(DISTINCT city) FROM students;`
          }
        }
      ],
      quizGenerators: [
        () => {
          const cities = ['서울', '서울', '부산', '대구', '서울', '부산'].slice(0, randInt(4, 6));
          const unique = [...new Set(cities)];
          return {
            type: 'blank',
            q: `<code>students</code>의 <code>city</code> 값이 순서대로 ${cities.join(', ')}일 때, <code>SELECT DISTINCT city FROM students;</code>의 결과 개수는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(unique.length)], placeholder: '숫자',
            why: `서로 다른 도시는 ${unique.join(', ')}로 총 ${unique.length}개예요.`,
            hint: '중복을 없애고 서로 다른 값이 몇 개인지 세어보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `중복을 없애고 서로 다른 값만 조회하고 싶을 때, SELECT 뒤에 붙이는 키워드를 쓰세요.`,
          prefix: 'SELECT ', suffix: ' city FROM students;', accept: ['DISTINCT', 'distinct'], placeholder: '키워드',
          why: '<code>DISTINCT</code>는 중복을 없애고 서로 다른 값만 보여줘요.',
          hint: '"뚜렷한, 구별되는"이라는 뜻의 영어 단어예요.'
        }),
        () => {
          const cities = ['서울', '서울', '부산', '대구', '서울'].slice(0, randInt(4, 5));
          const unique = [...new Set(cities)];
          return {
            type: 'blank',
            q: `<code>city</code> 값이 순서대로 ${cities.join(', ')}일 때, <code>SELECT COUNT(DISTINCT city) FROM students;</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(unique.length)], placeholder: '숫자',
            why: `서로 다른 도시 종류의 개수는 ${unique.length}개예요.`,
            hint: 'COUNT(DISTINCT 열)은 서로 다른 값의 "종류 개수"를 세어줘요.'
          };
        },
        () => makeChoice(
          '<code>SELECT DISTINCT city, age FROM students;</code>가 중복으로 취급하는 기준은?',
          'city와 age 두 값의 조합이 완전히 같은 행', ['city만 같으면 무조건 중복', 'age만 같으면 무조건 중복', '이름이 같으면 중복'],
          'DISTINCT를 여러 열에 적용하면, 그 열들의 조합 전체가 같아야 중복으로 취급해요.',
          '한 열만 같고 다른 열이 다르면 서로 다른 행으로 취급된다는 걸 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: 'students 표에서 서로 다른 age 값만 조회하는 SQL을 작성하세요.',
          starter: '',
          placeholder: 'SELECT DISTINCT age FROM students;',
          accept: ['SELECT DISTINCT age FROM students;'],
          why: 'SELECT DISTINCT 열 FROM 표; 형태로 중복 없이 조회해요.',
          hint: 'SELECT DISTINCT age FROM students;를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const cities = shuffle(['서울', '서울', '부산', '대구', '서울', '부산', '광주']).slice(0, randInt(5, 7));
        const unique = [...new Set(cities)];
        return {
          type: 'blank',
          q: `<code>city</code> 값이 ${cities.join(', ')}로 ${cities.length}개 있을 때, <code>SELECT COUNT(*) FROM students</code>와 <code>SELECT COUNT(DISTINCT city) FROM students</code>의 결과를 "전체개수, 종류개수" 형태로 쓰세요.`,
          prefix: '', suffix: '', accept: [`${cities.length}, ${unique.length}`], placeholder: '숫자, 숫자',
          why: `COUNT(*)는 전체 행 개수(${cities.length}개), COUNT(DISTINCT city)는 서로 다른 도시 종류(${unique.length}개)예요.`,
          hint: 'COUNT(*)는 전체를, COUNT(DISTINCT ...)는 중복을 뺀 종류 수를 센다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'comparisonOperators',
      title: 'BETWEEN, EXISTS, ANY/ALL',
      ready: true,
      summary: '범위로 조건을 거는 BETWEEN, 존재 여부만 확인하는 EXISTS, 여러 값과 비교하는 ANY/ALL을 배워요.',
      goals: ['BETWEEN으로 범위 조건 걸기', 'EXISTS로 존재 여부 확인하기', 'ANY/ALL로 여러 값과 비교하기'],
      blocks: [
        {
          h: '범위로 조건 걸기: BETWEEN',
          html: `<p><code>열 BETWEEN 시작 AND 끝</code>은 그 값이 시작과 끝 <b>사이(양 끝 포함)</b>인지 확인해요.</p>`,
          code: {
            label: 'between.sql',
            lang: 'sql',
            src: `SELECT name FROM students WHERE age BETWEEN 15 AND 18;`
          }
        },
        {
          h: '존재하는지만 확인하기: EXISTS',
          html: `<p><code>WHERE EXISTS (서브쿼리)</code>는 그 서브쿼리 결과가 <b>하나라도 있으면</b> 참이 돼요. 실제 값이 아니라 "있는지 없는지"만 확인해서 효율적이에요.</p>`,
          code: {
            label: 'exists.sql',
            lang: 'sql',
            src: `SELECT name FROM students
WHERE EXISTS (SELECT 1 FROM scores WHERE scores.student_id = students.id);`
          }
        },
        {
          h: '여러 값과 비교하기: ANY / ALL',
          html: `<p><code>&gt; ALL(서브쿼리)</code>은 서브쿼리의 <b>모든 값보다</b> 커야 참이고, <code>&gt; ANY(서브쿼리)</code>는 그중 <b>하나라도</b> 크면 참이에요.</p>`
        }
      ],
      quizGenerators: [
        () => {
          const age = randInt(10, 25);
          const inRange = age >= 15 && age <= 18;
          return {
            type: 'blank',
            q: `<code>age</code>가 ${age}일 때, <code>age BETWEEN 15 AND 18</code>의 결과는? (<code>true</code> 또는 <code>false</code>)`,
            prefix: '', suffix: '', accept: [String(inRange)], placeholder: 'true 또는 false',
            why: `BETWEEN은 양 끝을 포함해서, ${age}는 15~18 사이${inRange ? '에 있어요' : '가 아니에요'}.`,
            hint: 'BETWEEN은 시작과 끝 값도 포함한다는 걸 기억하세요(15와 18도 포함).'
          };
        },
        () => makeChoice(
          '<code>age BETWEEN 15 AND 18</code>일 때, <code>age</code>가 정확히 <code>15</code>라면?',
          '조건을 만족한다(포함됨)', ['조건을 만족하지 않는다', '오류가 난다', 'NULL이 된다'],
          'BETWEEN은 시작과 끝 값을 포함해서, 15도 조건을 만족해요.',
          '"~부터 ~까지"라는 표현처럼 양 끝을 포함한다고 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `서브쿼리 결과가 하나라도 있는지만 확인하는 키워드를 쓰세요.`,
          prefix: 'WHERE ', suffix: ' (SELECT 1 FROM scores WHERE scores.student_id = students.id)', accept: ['EXISTS', 'exists'], placeholder: '키워드',
          why: '<code>EXISTS</code>는 서브쿼리 결과가 하나라도 있으면 참이 돼요.',
          hint: '"존재하다"라는 뜻 그대로예요.'
        }),
        () => makeChoice(
          '<code>score &gt; ALL (SELECT score FROM scores)</code>가 참이 되려면?',
          'score가 scores의 모든 값보다 커야 한다', ['score가 scores의 값 중 하나보다만 크면 된다', 'scores에 값이 하나도 없어야 한다', 'score가 항상 참이 된다'],
          '<code>ALL</code>은 서브쿼리의 모든 값을 다 넘어서야 참이 돼요.',
          '"전부(ALL)"보다 커야 한다는 뜻이에요.'
        ),
        () => ({
          type: 'code',
          q: 'age가 15에서 20 사이(포함)인 학생의 이름을 조회하는 SQL을 작성하세요.',
          starter: '',
          placeholder: 'SELECT name FROM students WHERE age BETWEEN 15 AND 20;',
          accept: ['SELECT name FROM students WHERE age BETWEEN 15 AND 20;'],
          why: 'BETWEEN 시작 AND 끝으로 범위 조건을 걸어요.',
          hint: 'WHERE age BETWEEN 15 AND 20;을 붙이세요.'
        }),
      ],
      boss: () => makeChoice(
        '성적이 하나라도 있는 학생만 조회하고 싶을 때, 서브쿼리로 성적 존재 여부만 확인하려면 무엇을 쓰는 게 가장 적합할까요?',
        'EXISTS', ['BETWEEN', 'ORDER BY', 'DISTINCT'],
        'EXISTS는 서브쿼리 결과가 있는지 없는지만 효율적으로 확인해줘요.',
        '"존재 여부만" 확인하고 싶다는 조건에 딱 맞는 키워드를 떠올려보세요.'
      )
    },
    {
      id: 'windowFunctions',
      title: '윈도우 함수',
      ready: true,
      summary: '조회 결과에 순번이나 순위를 매기고, 그룹별로 따로 매기는 윈도우 함수(ROW_NUMBER, RANK, PARTITION BY)를 배워요.',
      goals: ['ROW_NUMBER()로 순번 매기기', 'RANK()로 순위 매기기(동점 처리)', 'PARTITION BY로 그룹별로 나누기'],
      blocks: [
        {
          h: '결과에 순번 매기기: ROW_NUMBER()',
          html: `<p><code>ROW_NUMBER() OVER (ORDER BY 열)</code>은 그 정렬 순서대로 1, 2, 3...처럼 순번을 매겨줘요. <b>동점이어도 무조건 다른 번호</b>가 매겨져요.</p>`,
          code: {
            label: 'row_number.sql',
            lang: 'sql',
            src: `SELECT name, score,
  ROW_NUMBER() OVER (ORDER BY score DESC) AS rank_num
FROM scores JOIN students ON students.id = scores.student_id;`
          }
        },
        {
          h: '동점자를 같은 순위로: RANK()',
          html: `<p><code>RANK()</code>는 <b>동점이면 같은 순위</b>를 주고, 그 다음 순위는 동점자 수만큼 건너뛰어요. (예: 1등이 2명이면 다음은 3등)</p>`
        },
        {
          h: '그룹별로 따로 순번 매기기: PARTITION BY',
          html: `<p><code>PARTITION BY 열</code>을 추가하면, 그 열 값이 같은 것끼리 <b>따로</b> 순번을 다시 매겨요. 도시별로 각각 1등부터 매기고 싶을 때 써요.</p>`,
          code: {
            label: 'partition_by.sql',
            lang: 'sql',
            src: `SELECT name, city, score,
  ROW_NUMBER() OVER (PARTITION BY city ORDER BY score DESC) AS city_rank
FROM scores JOIN students ON students.id = scores.student_id;`
          }
        }
      ],
      quizGenerators: [
        () => {
          const scores = shuffle([95, 88, 72, 60]).slice(0, randInt(3, 4));
          const sorted = [...scores].sort((a, b) => b - a);
          const target = pick(sorted);
          const rank = sorted.indexOf(target) + 1;
          return {
            type: 'blank',
            q: `점수가 ${scores.join(', ')}인 학생들에게 <code>ROW_NUMBER() OVER (ORDER BY score DESC)</code>를 적용하면, 점수 ${target}인 학생의 순번은? 숫자만 쓰세요. (모든 점수가 서로 다르다고 가정)`,
            prefix: '', suffix: '', accept: [String(rank)], placeholder: '숫자',
            why: `점수를 높은 순서대로 정렬하면 ${sorted.join(', ')}이고, ${target}은 ${rank}번째예요.`,
            hint: '점수를 높은 순서대로 줄 세워서 몇 번째인지 세어보세요.'
          };
        },
        () => makeChoice(
          '점수가 90점으로 동점인 학생이 2명 있을 때, <code>RANK()</code>로 순위를 매기면 그다음 학생(3번째로 높은 점수)의 순위는?',
          '3등', ['2등', '1등', '4등'],
          'RANK()는 동점자에게 같은 순위(1등, 1등)를 주고, 그다음은 동점자 수만큼 건너뛰어서 3등이 돼요.',
          '동점자가 2명이면 순위 하나(2등)를 건너뛴다는 걸 떠올려보세요.'
        ),
        () => makeChoice(
          '<code>ROW_NUMBER()</code>와 <code>RANK()</code>의 차이는?',
          'ROW_NUMBER는 동점이어도 무조건 다른 번호를, RANK는 동점이면 같은 순위를 준다',
          ['RANK는 그룹별로만 쓸 수 있고 ROW_NUMBER는 전체에만 쓸 수 있다', '둘은 완전히 똑같다', 'ROW_NUMBER는 오름차순만 지원한다'],
          'ROW_NUMBER는 항상 1,2,3...으로 유일한 번호를, RANK는 동점자에게 같은 번호를 줘요.',
          '동점 처리 방식의 차이가 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `도시별로 각각 따로 순위를 매기고 싶을 때, <code>OVER</code> 안에 <code>ORDER BY</code>와 함께 쓰는 키워드를 쓰세요.`,
          prefix: 'ROW_NUMBER() OVER (', suffix: ' city ORDER BY score DESC)', accept: ['PARTITION BY', 'partition by'], placeholder: '키워드',
          why: '<code>PARTITION BY 열</code>은 그 값이 같은 그룹끼리 따로 순번을 매기게 해요.',
          hint: '"나누다, 구획하다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'code',
          q: '점수(score) 내림차순으로 순번을 매기는 ROW_NUMBER를 rank_num이라는 이름으로 추가해서, name과 함께 조회하는 SQL을 작성하세요. (students와 scores가 이미 JOIN된 결과라고 가정하고 FROM 절은 students JOIN scores ON students.id = scores.student_id로 쓰세요)',
          starter: '',
          rows: 3,
          placeholder: 'SELECT name, ROW_NUMBER() OVER (ORDER BY score DESC) AS rank_num\nFROM students JOIN scores ON students.id = scores.student_id;',
          accept: ['SELECT name, ROW_NUMBER() OVER (ORDER BY score DESC) AS rank_num\nFROM students JOIN scores ON students.id = scores.student_id;'],
          why: 'ROW_NUMBER() OVER (ORDER BY 열 DESC) AS 별명 형태로 순번을 매겨요.',
          hint: 'ROW_NUMBER() OVER (ORDER BY score DESC) AS rank_num을 SELECT에 추가하세요.'
        }),
      ],
      boss: () => makeChoice(
        '전체 학생 중 순위가 아니라, 각 도시(서울, 부산 등) 안에서만 1등부터 순위를 매기고 싶을 때 꼭 필요한 키워드는?',
        'PARTITION BY city', ['ORDER BY city', 'GROUP BY city', 'WHERE city IS NOT NULL'],
        'PARTITION BY city를 추가해야 도시별로 각각 따로 순위가 매겨져요. 없으면 전체를 기준으로 한 번에 순위가 매겨져요.',
        '"그룹별로 따로"라는 요구사항에 맞는 키워드를 떠올려보세요.'
      )
    },
    {
      id: 'cteWith',
      title: 'CTE (WITH 절)',
      ready: true,
      summary: '복잡한 쿼리를 여러 단계로 나눠서, 각 단계에 이름을 붙여 읽기 쉽게 만드는 WITH 절(CTE)을 배워요.',
      goals: ['WITH로 임시 결과에 이름 붙이기', '복잡한 쿼리를 단계별로 나누기', '여러 개의 CTE 함께 쓰기'],
      blocks: [
        {
          h: '임시 결과에 이름 붙이기: WITH',
          html: `<p><code>WITH 이름 AS (서브쿼리)</code>로 쿼리 결과에 이름을 붙여두면, 그 이름을 그 뒤의 <code>SELECT</code>에서 마치 <b>진짜 표</b>처럼 쓸 수 있어요. 이런 임시 결과를 <b>CTE</b>(Common Table Expression)라고 불러요.</p>`,
          code: {
            label: 'cte_basic.sql',
            lang: 'sql',
            src: `WITH high_scorers AS (
  SELECT student_id FROM scores WHERE score >= 90
)
SELECT students.name
FROM students
JOIN high_scorers ON students.id = high_scorers.student_id;`
          }
        },
        {
          h: '복잡한 쿼리를 단계별로 나누기',
          html: `<p>서브쿼리를 여러 겹으로 중첩하면 읽기 어려워져요. <code>WITH</code>로 각 단계에 이름을 붙이면, 위에서부터 순서대로 읽으면서 무슨 일이 일어나는지 훨씬 쉽게 이해할 수 있어요.</p>`
        },
        {
          h: '여러 개의 CTE도 만들 수 있어요',
          html: `<p>쉼표로 구분해서 <code>WITH a AS (...), b AS (...)</code>처럼 여러 개의 CTE를 한 번에 정의할 수도 있어요.</p>`,
          code: {
            label: 'cte_multiple.sql',
            lang: 'sql',
            src: `WITH seoul_students AS (
  SELECT id, name FROM students WHERE city = '서울'
),
high_scorers AS (
  SELECT student_id FROM scores WHERE score >= 90
)
SELECT seoul_students.name
FROM seoul_students
JOIN high_scorers ON seoul_students.id = high_scorers.student_id;`
          }
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `임시 결과에 이름을 붙여서 쓰기 시작할 때 맨 앞에 쓰는 키워드를 쓰세요.`,
          prefix: '', suffix: ' high_scorers AS (SELECT student_id FROM scores WHERE score >= 90)', accept: ['WITH', 'with'], placeholder: '키워드',
          why: '<code>WITH 이름 AS (서브쿼리)</code>로 CTE를 정의해요.',
          hint: '"~와 함께"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'CTE(WITH 절)를 쓰는 주된 이유는?',
          '복잡한 쿼리를 여러 단계로 나눠서 훨씬 읽기 쉽게 만들려고',
          ['CTE 없이는 JOIN을 아예 못 써서', '실행 속도가 항상 훨씬 빨라져서', '데이터를 자동으로 삭제해줘서'],
          'CTE는 복잡한 서브쿼리 중첩을 단계별로 나눠서, 위에서부터 순서대로 읽을 수 있게 해줘요.',
          '가독성 측면의 장점이라는 걸 생각해보세요.'
        ),
        () => makeChoice(
          '<code>WITH</code>로 정의한 이름은 그 뒤의 쿼리에서 무엇처럼 쓸 수 있을까요?',
          '진짜 표처럼(FROM, JOIN 등에서)', ['변수로만 쓸 수 있고 FROM에는 못 쓴다', '주석으로만 쓰인다', '아무 데도 못 쓴다'],
          'CTE로 만든 이름은 그 쿼리 안에서 FROM이나 JOIN에 실제 표처럼 쓸 수 있어요.',
          '예시 코드에서 high_scorers가 JOIN에 어떻게 쓰였는지 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `여러 개의 CTE를 한 번에 정의할 때, 각 CTE 정의 사이에 넣는 문장 부호를 쓰세요.`,
          prefix: 'WITH a AS (...)', suffix: ' b AS (...)', accept: [','], placeholder: '문장 부호',
          why: '여러 CTE는 쉼표(,)로 구분해서 나열해요.',
          hint: '목록을 나열할 때 흔히 쓰는 문장 부호예요.'
        }),
        () => ({
          type: 'code',
          q: 'age가 18 이상인 학생만 모은 CTE(이름: adults)를 만들고, 그 CTE에서 name을 조회하는 SQL을 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'WITH adults AS (\n  SELECT * FROM students WHERE age >= 18\n)\nSELECT name FROM adults;',
          accept: ['WITH adults AS (\n  SELECT * FROM students WHERE age >= 18\n)\nSELECT name FROM adults;'],
          why: 'WITH adults AS (서브쿼리)로 CTE를 만들고, 그 뒤에서 adults를 표처럼 조회해요.',
          hint: 'WITH adults AS (SELECT * FROM students WHERE age >= 18) 다음 줄에 SELECT name FROM adults;를 쓰세요.'
        }),
      ],
      boss: () => {
        const total = randInt(4, 7);
        const seoulCount = randInt(2, total - 1);
        const highScorerCount = randInt(1, seoulCount);
        return {
          type: 'blank',
          q: `전체 학생 ${total}명 중 서울 거주 학생이 ${seoulCount}명이고, 그중 성적 90점 이상인 학생이 ${highScorerCount}명이에요. "서울 거주 + 90점 이상"을 각각 CTE로 나눠 JOIN한 최종 결과는 몇 명일까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(highScorerCount)], placeholder: '숫자',
          why: `두 조건(서울 거주, 90점 이상)을 모두 만족하는 학생은 ${highScorerCount}명이에요.`,
          hint: '두 CTE를 JOIN하면 두 조건을 모두 만족하는 학생만 남는다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'viewsUnit',
      title: 'VIEW로 가상의 표 만들기',
      ready: true,
      summary: '자주 쓰는 쿼리에 이름을 붙여서, 진짜 표처럼 조회할 수 있는 VIEW(뷰)를 배워요.',
      goals: ['CREATE VIEW로 뷰 만들기', '뷰를 진짜 표처럼 조회하기', '뷰가 실제 데이터를 저장하지 않는다는 점'],
      blocks: [
        {
          h: '자주 쓰는 쿼리에 이름 붙여 저장하기: VIEW',
          html: `<p><code>CREATE VIEW 이름 AS 쿼리</code>로, 자주 쓰는 <code>SELECT</code>에 이름을 붙여 저장해둘 수 있어요.</p>`,
          code: {
            label: 'create_view.sql',
            lang: 'sql',
            src: `CREATE VIEW seoul_students AS
SELECT * FROM students WHERE city = '서울';`
          }
        },
        {
          h: '뷰를 진짜 표처럼 조회하기',
          html: `<p>한 번 만들어두면, 그 이름을 <code>FROM</code>에 그대로 써서 <b>진짜 표처럼</b> 조회할 수 있어요.</p>`,
          code: {
            label: 'query_view.sql',
            lang: 'sql',
            src: `SELECT * FROM seoul_students;`
          },
          after: `<div class="note"><b>중요</b> — VIEW는 데이터를 <b>따로 저장하지 않아요</b>. 저장해두는 건 "쿼리 그 자체"예요. 그래서 <code>students</code> 표의 데이터가 바뀌면, <code>seoul_students</code>를 조회한 결과도 자동으로 최신 상태예요.</div>`
        },
        {
          h: '뷰를 쓰는 이유',
          html: `<p>복잡한 쿼리를 매번 새로 쓰지 않고 재사용할 수 있고, 민감한 열은 빼고 필요한 열만 보여주는 식으로 <b>접근을 제한</b>하는 데도 써요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>city = '서울'</code>인 학생만 보여주는 <code>seoul_students</code>라는 뷰를 만드는 SQL을 시작하는 두 단어를 쓰세요.`,
          prefix: '', suffix: " seoul_students AS SELECT * FROM students WHERE city = '서울';", accept: ['CREATE VIEW', 'create view'], placeholder: '키워드',
          why: '<code>CREATE VIEW 이름 AS 쿼리</code>로 뷰를 만들어요.',
          hint: '"만들다"와 "뷰(관점, 보기)"에 해당하는 영어 단어예요.'
        }),
        () => makeChoice(
          'VIEW를 만들면 그 순간 데이터가 실제로 저장될까요?',
          '저장되지 않고, 쿼리 자체만 저장된다', ['그 시점의 데이터가 복사돼서 저장된다', '원본 표가 삭제된다', '아무 일도 일어나지 않는다'],
          'VIEW는 쿼리를 저장해뒀다가, 조회할 때마다 그 쿼리를 다시 실행해요. 그래서 원본 데이터가 바뀌면 뷰 결과도 자동으로 최신이에요.',
          '데이터를 복사해서 저장한다면, 원본이 바뀌어도 뷰가 그대로일 텐데, 실제로는 그렇지 않다는 걸 생각해보세요.'
        ),
        () => makeChoice(
          'VIEW를 쓰면 좋은 점으로 알맞은 것은?',
          '자주 쓰는 복잡한 쿼리를 재사용하고, 민감한 열을 감출 수 있어서',
          ['VIEW를 쓰면 항상 실행 속도가 2배 빨라져서', 'VIEW가 있어야만 SELECT를 쓸 수 있어서', 'VIEW는 표보다 저장 공간을 더 적게 써서'],
          'VIEW는 쿼리 재사용과, 필요한 열만 보여주는 접근 제한에 유용해요.',
          '"이름 붙여서 재사용"이라는 개념의 장점을 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: 'age가 18 이상인 학생만 보여주는 adult_students라는 뷰를 만드는 SQL을 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'CREATE VIEW adult_students AS\nSELECT * FROM students WHERE age >= 18;',
          accept: ['CREATE VIEW adult_students AS\nSELECT * FROM students WHERE age >= 18;', 'CREATE VIEW adult_students AS SELECT * FROM students WHERE age >= 18;'],
          why: 'CREATE VIEW 이름 AS 쿼리; 형태로 뷰를 만들어요.',
          hint: 'CREATE VIEW adult_students AS SELECT * FROM students WHERE age >= 18;를 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '<code>CREATE VIEW busan_students AS SELECT * FROM students WHERE city = \'부산\';</code>를 만든 뒤, <code>students</code> 표에 부산 사는 새 학생을 INSERT했어요. <code>SELECT * FROM busan_students;</code>를 다시 실행하면?',
        '새로 추가된 학생도 결과에 포함된다', ['뷰를 만들 때의 데이터만 계속 보인다', '오류가 난다', '뷰를 다시 만들어야만 반영된다'],
        'VIEW는 쿼리 자체를 저장해서, 조회할 때마다 최신 데이터로 다시 실행돼요. 그래서 새로 추가된 학생도 바로 반영돼요.',
        'VIEW가 데이터를 저장하는 게 아니라 쿼리를 저장한다는 점을 다시 떠올려보세요.'
      )
    },
    {
      id: 'normalization',
      title: '정규화',
      ready: true,
      summary: '데이터를 여러 표로 나눠서 중복과 불일치를 줄이는 정규화의 개념을 배워요.',
      goals: ['한 표에 다 넣으면 생기는 문제', '표를 나눠서 중복 없애기', '정규화 단계 살짝 맛보기'],
      blocks: [
        {
          h: '한 표에 다 넣으면 생기는 문제',
          html: `<p>학생 정보(이름, 나이, 도시)와 성적을 <b>한 표</b>에 다 넣으면, 한 학생이 성적을 여러 개 가질 때마다 <b>이름·나이·도시가 계속 중복</b>돼요. 그 학생의 도시가 바뀌면, 중복된 모든 행을 다 고쳐야 하고 하나라도 빠뜨리면 <b>데이터가 서로 안 맞게(불일치)</b> 돼요.</p>`
        },
        {
          h: '표를 나눠서 중복을 없애기: 정규화',
          html: `<p><b>정규화</b>는 이런 중복을 없애기 위해, 데이터를 여러 표로 나누는 작업이에요. <code>students</code>(학생 정보)와 <code>scores</code>(성적)로 나누면, 학생 정보는 <b>딱 한 번만</b> 저장되고 <code>FOREIGN KEY</code>로 서로 연결돼요.</p>`
        },
        {
          h: '정규화 단계 살짝 맛보기',
          html: `<p>정규화에는 1NF, 2NF, 3NF 같은 단계가 있지만, 실무에서는 세세한 규칙을 다 외우기보다 <b>"중복을 줄이고, 각 표가 한 가지 주제만 다루게 나눈다"</b> 정도로 이해해도 충분해요.</p>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '학생 정보와 성적을 한 표에 다 넣었을 때 생기는 가장 큰 문제는?',
          '같은 학생 정보가 여러 번 중복돼서, 수정할 때 불일치가 생기기 쉽다',
          ['표의 개수가 너무 적어져서', 'SELECT 문을 아예 못 쓰게 돼서', '데이터베이스 용량이 항상 부족해진다'],
          '한 학생이 성적을 여러 개 가지면, 그 학생의 이름·나이 등이 성적 개수만큼 중복돼요.',
          '한 학생이 성적을 여러 개 가질 수 있다는 상황을 떠올려보세요.'
        ),
        () => makeChoice(
          '정규화의 핵심 목적으로 가장 알맞은 것은?',
          '데이터 중복을 줄이고, 수정 시 불일치가 생기지 않게 하려고', ['실행 속도를 무조건 빠르게 하려고', '표의 개수를 최대한 줄이려고', '모든 데이터를 암호화하려고'],
          '정규화는 중복을 줄여서 데이터의 일관성을 지키는 게 핵심 목적이에요.',
          '표를 나누는 것 자체가 목적이 아니라, "왜" 나누는지를 생각해보세요.'
        ),
        () => makeChoice(
          'students와 scores를 나누고 FOREIGN KEY로 연결하는 것은 정규화의 어떤 효과를 보여줄까요?',
          '학생 정보는 한 번만 저장하고, 성적은 필요한 만큼 따로 저장할 수 있다',
          ['학생 정보가 성적 개수만큼 중복 저장된다', 'FOREIGN KEY가 있으면 표를 하나로 합쳐야 한다', '성적 데이터를 아예 저장할 수 없게 된다'],
          '표를 나누면 학생 정보 중복 없이, 성적만 여러 개 따로 저장할 수 있어요.',
          '지금 이 사이트의 students/scores 표 구조 자체가 정규화의 예시예요.'
        ),
        () => makeChoice(
          '정규화를 다 외우지 않아도, 실무에서 기억해두면 충분한 원칙은?',
          '중복을 줄이고, 각 표가 한 가지 주제만 다루게 나눈다', ['표는 항상 하나만 써야 한다', '모든 열을 TEXT 타입으로 통일해야 한다', 'PRIMARY KEY는 없어도 된다'],
          '세세한 1NF/2NF/3NF 규칙보다, "중복 줄이기 + 한 표는 한 주제"라는 원칙이 실무에서 더 유용해요.',
          '핵심 아이디어를 한 문장으로 정리한다면 무엇일지 생각해보세요.'
        ),
      ],
      boss: () => makeChoice(
        '한 표에 "주문자 이름, 주문자 주소, 상품명, 수량"을 다 넣고, 한 사람이 여러 번 주문하면 이름과 주소가 매번 중복 저장돼요. 이 문제를 해결하는 정규화 방향으로 알맞은 것은?',
        '주문자 정보 표와 주문 내역 표로 나누고 FOREIGN KEY로 연결한다', ['모든 열을 하나의 긴 TEXT로 합친다', '주소 열을 아예 삭제한다', '표 이름을 더 길게 짓는다'],
        '주문자 정보(이름, 주소)를 별도 표로 분리하고, 주문 내역 표에서 FOREIGN KEY로 그 주문자를 가리키면 중복이 사라져요.',
        'students/scores를 나눈 것과 똑같은 원리를 적용해보세요.'
      )
    },
    {
      id: 'explainQuery',
      title: 'EXPLAIN으로 실행 계획 보기',
      ready: true,
      summary: '내가 쓴 쿼리가 실제로 어떻게 실행되는지, 인덱스를 쓰는지 아니면 표 전체를 다 뒤지는지 확인하는 법을 배워요.',
      goals: ['EXPLAIN으로 실행 계획 보기', '풀 스캔 vs 인덱스 사용 구분하기', '느린 쿼리 찾을 때 활용하기'],
      blocks: [
        {
          h: '쿼리가 실제로 어떻게 실행되는지 보기: EXPLAIN',
          html: `<p><code>EXPLAIN QUERY PLAN</code>을 쿼리 앞에 붙이면, 데이터베이스가 그 쿼리를 <b>실제로 어떤 방식으로 실행할지</b> 알려줘요.</p>`,
          code: {
            label: 'explain.sql',
            lang: 'sql',
            src: `EXPLAIN QUERY PLAN
SELECT * FROM students WHERE name = '지수';`
          }
        },
        {
          h: '풀 스캔 vs 인덱스 사용',
          html: `<p>결과에 <code>SCAN students</code>라고 나오면 표 전체를 처음부터 끝까지 다 뒤진 것(풀 스캔)이고, <code>SEARCH students USING INDEX ...</code>라고 나오면 인덱스를 이용해 빠르게 찾은 거예요.</p>`
        },
        {
          h: '느린 쿼리를 찾을 때 활용하기',
          html: `<p>쿼리가 느리다고 느껴질 때, "여기가 느릴 것 같다"고 추측만 하지 말고 <code>EXPLAIN QUERY PLAN</code>으로 <b>실제로</b> 풀 스캔이 일어나는지 확인한 뒤, 필요하면 그 열에 인덱스를 추가해요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `쿼리가 실제로 어떻게 실행되는지 확인하려고 앞에 붙이는 두 단어를 쓰세요. (예: ${'{이것}'} SELECT * FROM students;)`,
          prefix: '', suffix: '', accept: ['EXPLAIN QUERY PLAN', 'explain query plan'], placeholder: '키워드',
          why: '<code>EXPLAIN QUERY PLAN</code>을 쿼리 앞에 붙이면 실행 계획을 볼 수 있어요.',
          hint: '"설명하다"와 "질의 계획"에 해당하는 영어 단어들이에요.'
        }),
        () => makeChoice(
          'EXPLAIN 결과에 <code>SCAN students</code>라고 나오면 무슨 뜻일까요?',
          '표 전체를 처음부터 끝까지 다 뒤졌다(풀 스캔)', ['인덱스를 이용해 빠르게 찾았다', '오류가 났다', '결과가 없다'],
          '<code>SCAN</code>은 표 전체를 다 훑었다는 뜻으로, 인덱스가 없을 때 흔히 나와요.',
          '"훑다, 스캔하다"라는 뜻을 생각해보세요.'
        ),
        () => makeChoice(
          'EXPLAIN 결과에 <code>SEARCH students USING INDEX ...</code>라고 나오면?',
          '인덱스를 이용해 효율적으로 찾았다', ['인덱스가 없어서 못 찾았다', '오류가 발생했다', '표가 비어있다'],
          '<code>SEARCH ... USING INDEX</code>는 인덱스를 활용해 필요한 부분만 빠르게 찾았다는 뜻이에요.',
          'SCAN(전체 훑기)과 반대되는, 효율적인 검색 방식이에요.'
        ),
        () => makeChoice(
          '쿼리가 느릴 때 가장 먼저 해야 할 일로 알맞은 것은?',
          'EXPLAIN QUERY PLAN으로 실제 실행 방식을 확인한다', ['무작정 모든 열에 인덱스를 건다', '표를 삭제하고 다시 만든다', 'WHERE 조건을 전부 지운다'],
          '추측이 아니라 EXPLAIN으로 실제 실행 계획을 먼저 확인한 뒤 조치해야 정확해요.',
          '"느낌"이 아니라 "확인"을 먼저 해야 한다는 원칙을 떠올려보세요.'
        ),
      ],
      boss: () => makeChoice(
        '<code>EXPLAIN QUERY PLAN SELECT * FROM students WHERE name = \'지수\';</code>의 결과가 <code>SCAN students</code>로 나왔어요. 조회 속도를 개선하려면?',
        'name 열에 인덱스를 만든다', ['students 표를 삭제한다', 'SELECT * 대신 SELECT name만 쓴다고 해결된다', '아무것도 할 필요 없다'],
        'SCAN은 풀 스캔이 일어났다는 뜻이니, name 열에 인덱스를 만들면 다음부터는 SEARCH USING INDEX로 바뀔 수 있어요.',
        'SCAN이 나왔다는 건 그 조건에 쓰인 열에 인덱스가 없다는 뜻이라는 걸 떠올려보세요.'
      )
    },
    {
      id: 'transactionIsolation',
      title: '트랜잭션 격리 수준',
      ready: true,
      summary: '여러 트랜잭션이 동시에 실행될 때 생기는 문제와, 그 문제를 조절하는 격리 수준의 개념을 배워요.',
      goals: ['동시 접근 시 생기는 문제', '격리 수준이 뭔지', '안전함과 속도의 트레이드오프'],
      blocks: [
        {
          h: '동시에 접근하면 생기는 문제: Dirty Read',
          html: `<p>한 트랜잭션이 아직 <code>COMMIT</code>하지 않은(확정되지 않은) 값을, 다른 트랜잭션이 미리 읽어버리는 걸 <b>Dirty Read</b>(더티 리드)라고 해요. 그 값이 나중에 <code>ROLLBACK</code>되면, 존재한 적 없는 값을 읽은 셈이 돼요.</p>`
        },
        {
          h: '격리 수준으로 문제를 조절하기',
          html: `<p><b>격리 수준</b>은 트랜잭션끼리 서로 얼마나 "간섭받지 않게" 할지를 정해요. <code>READ UNCOMMITTED</code>(가장 느슨함, Dirty Read 가능) &lt; <code>READ COMMITTED</code> &lt; <code>REPEATABLE READ</code> &lt; <code>SERIALIZABLE</code>(가장 엄격함) 순서로 안전해져요.</p>`
        },
        {
          h: '안전함과 속도의 트레이드오프',
          html: `<p>격리 수준이 <b>높을수록 더 안전</b>하지만, 트랜잭션끼리 서로 기다려야 하는 경우가 많아져서 <b>더 느려질 수 있어요</b>. 대부분의 데이터베이스는 기본값으로 <code>READ COMMITTED</code> 정도를 써서, 적당한 안전성과 속도의 균형을 맞춰요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `아직 COMMIT되지 않은 값을 다른 트랜잭션이 미리 읽어버리는 현상의 이름을 영어로 쓰세요.`,
          prefix: '', suffix: '', accept: ['Dirty Read', 'dirty read'], placeholder: '용어',
          why: '이 현상을 <code>Dirty Read</code>(더티 리드)라고 불러요.',
          hint: '"더러운, 확정되지 않은"이라는 뜻의 단어와 "읽기"가 합쳐진 이름이에요.'
        }),
        () => makeChoice(
          '가장 엄격해서 트랜잭션끼리 서로 전혀 간섭하지 않게 만드는 격리 수준은?',
          '<code>SERIALIZABLE</code>', ['<code>READ UNCOMMITTED</code>', '<code>READ COMMITTED</code>', '<code>NONE</code>'],
          '<code>SERIALIZABLE</code>이 가장 엄격한 격리 수준이에요.',
          '"직렬화하다"라는 뜻처럼, 트랜잭션들을 하나씩 순서대로 처리하는 것처럼 엄격하게 만들어요.'
        ),
        () => makeChoice(
          '격리 수준을 높이면(더 엄격하게 하면) 어떤 트레이드오프가 생길까요?',
          '더 안전해지지만, 트랜잭션끼리 기다리는 일이 많아져 느려질 수 있다',
          ['항상 더 빨라진다', '데이터가 자동으로 삭제된다', '아무 영향도 없다'],
          '격리 수준이 높을수록 안전하지만, 그만큼 트랜잭션끼리 서로 기다려야 하는 경우가 늘어나요.',
          '"안전함"과 "속도"는 종종 서로 트레이드오프 관계라는 걸 떠올려보세요.'
        ),
        () => makeChoice(
          '대부분의 데이터베이스가 기본 격리 수준으로 흔히 쓰는 것은?',
          '<code>READ COMMITTED</code>', ['<code>SERIALIZABLE</code>', '<code>READ UNCOMMITTED</code>', '격리 수준 없음'],
          '많은 데이터베이스가 적당한 안전성과 속도의 균형을 위해 <code>READ COMMITTED</code>를 기본값으로 써요.',
          '가장 엄격한 것도, 가장 느슨한 것도 아닌 "적당한" 수준이에요.'
        ),
      ],
      boss: () => makeChoice(
        '은행 계좌 이체처럼 정확성이 절대적으로 중요한 작업에서, 동시에 여러 이체가 겹쳐도 절대 문제가 생기면 안 된다면 어떤 격리 수준이 적합할까요?',
        'SERIALIZABLE (느려지더라도 가장 엄격하게)', ['READ UNCOMMITTED (가장 빠르게)', '격리 수준은 상관없다', '트랜잭션을 아예 안 쓴다'],
        '정확성이 속도보다 훨씬 중요한 상황에서는, 가장 엄격한 SERIALIZABLE로 모든 간섭을 막는 게 안전해요.',
        '이 상황에서는 "빠르지만 위험함"보다 "느리지만 확실함"이 우선이라는 걸 생각해보세요.'
      )
    },
    {
      id: 'storedProcedures',
      title: '저장 프로시저',
      ready: true,
      summary: '데이터베이스 안에 SQL 코드 뭉치를 저장해두고, 이름 하나로 실행하는 저장 프로시저를 배워요.',
      goals: ['저장 프로시저가 뭔지', 'CALL로 실행하기', '함수(FUNCTION)와의 차이'],
      blocks: [
        {
          h: 'DB 안에 저장해두는 코드 뭉치: 저장 프로시저',
          html: `<p><b>저장 프로시저</b>는 여러 SQL 문장을 하나로 묶어서 데이터베이스 안에 <b>이름을 붙여 저장</b>해둔 것이에요. 필요할 때 그 이름만 부르면 안에 있는 SQL들이 순서대로 실행돼요.</p>`,
          code: {
            label: 'stored_procedure.sql',
            lang: 'sql',
            src: `CREATE PROCEDURE add_student(IN p_name TEXT, IN p_age INT)
BEGIN
  INSERT INTO students (name, age) VALUES (p_name, p_age);
END;`
          }
        },
        {
          h: '실행하기: CALL',
          html: `<p>만들어둔 프로시저는 <code>CALL 이름(값, ...)</code>으로 실행해요.</p>`,
          code: {
            label: 'call_procedure.sql',
            lang: 'sql',
            src: `CALL add_student('지수', 17);`
          }
        },
        {
          h: '왜 쓸까요, 함수(FUNCTION)와의 차이',
          html: `<p>여러 SQL 문장을 하나의 호출로 실행할 수 있어서 재사용하기 편하고, 앱에서 DB로 여러 번 오갈 걸 한 번의 호출로 줄일 수 있어요. 비슷한 개념인 <b>함수(FUNCTION)</b>는 보통 <b>값을 반환</b>해서 <code>SELECT</code> 안에서 쓸 수 있지만, 프로시저는 <code>CALL</code>로 실행하는 "작업" 그 자체예요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `데이터베이스 안에 SQL 코드 뭉치를 이름 붙여 저장할 때 맨 앞에 쓰는 두 단어를 쓰세요.`,
          prefix: '', suffix: ' add_student(IN p_name TEXT, IN p_age INT) BEGIN ... END;', accept: ['CREATE PROCEDURE', 'create procedure'], placeholder: '키워드',
          why: '<code>CREATE PROCEDURE 이름(...)</code>으로 저장 프로시저를 만들어요.',
          hint: '"만들다"와 "절차, 순서"에 해당하는 영어 단어예요.'
        }),
        () => ({
          type: 'blank',
          q: `저장 프로시저 <code>add_student</code>를 실행하는 키워드를 쓰세요.`,
          prefix: '', suffix: " add_student('지수', 17);", accept: ['CALL', 'call'], placeholder: '키워드',
          why: '<code>CALL 프로시저이름(값, ...)</code>으로 저장 프로시저를 실행해요.',
          hint: '"부르다, 호출하다"라는 뜻 그대로예요.'
        }),
        () => makeChoice(
          '저장 프로시저와 함수(FUNCTION)의 가장 큰 차이는?',
          '함수는 값을 반환해서 SELECT 안에서 쓸 수 있지만, 프로시저는 CALL로 실행하는 작업 자체다',
          ['프로시저만 여러 SQL 문장을 담을 수 있다', '함수는 저장할 수 없고 프로시저만 저장 가능하다', '둘은 완전히 같은 것이다'],
          '함수는 값을 돌려줘서 SELECT 문 안에서 쓸 수 있지만, 프로시저는 그 자체로 실행하는 작업 단위예요.',
          '"값을 반환하는지 여부"가 핵심 차이예요.'
        ),
        () => makeChoice(
          '저장 프로시저를 쓰면 좋은 점으로 알맞은 것은?',
          '여러 SQL 문장을 하나의 호출로 묶어 재사용하고, 앱과 DB 사이의 왕복을 줄일 수 있어서',
          ['프로시저 없이는 INSERT를 아예 못 해서', '항상 데이터 용량이 줄어들어서', '프로시저를 쓰면 인덱스가 필요 없어져서'],
          '여러 작업을 한 번의 CALL로 묶어서 재사용하고, 네트워크 왕복도 줄일 수 있어요.',
          '"여러 SQL을 하나로 묶어 이름 붙인다"는 개념의 장점을 생각해보세요.'
        ),
      ],
      boss: () => makeChoice(
        '"학생을 추가하고, 동시에 초기 성적 0점도 함께 넣는" 작업을 앱에서 매번 두 번의 SQL 호출로 하는 대신, 한 번의 호출로 처리하고 싶어요. 어떤 방법이 적합할까요?',
        '두 INSERT를 담은 저장 프로시저를 만들어 CALL 한 번으로 실행한다', ['매번 SELECT를 먼저 실행한다', 'VIEW를 만든다', 'INDEX를 만든다'],
        '저장 프로시저 안에 두 INSERT 문장을 담아두면, CALL 한 번으로 두 작업을 순서대로 실행할 수 있어요.',
        '"여러 SQL 문장을 하나로 묶어서 실행"하고 싶은 상황이라는 걸 생각해보세요.'
      )
    },
    {
      id: 'triggers',
      title: '트리거',
      ready: true,
      summary: '표에 어떤 변화가 생기면 자동으로 실행되는 규칙, 트리거를 배워요.',
      goals: ['트리거가 뭔지', 'BEFORE/AFTER와 INSERT/UPDATE/DELETE', '트리거를 쓰는 예와 주의점'],
      blocks: [
        {
          h: '어떤 일이 생기면 자동으로 실행되는 규칙: 트리거',
          html: `<p><b>트리거</b>는 표에 <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code> 같은 일이 생길 때마다 <b>자동으로</b> 실행되는 SQL 규칙이에요.</p>`,
          code: {
            label: 'trigger.sql',
            lang: 'sql',
            src: `CREATE TRIGGER update_timestamp
AFTER UPDATE ON students
BEGIN
  UPDATE students SET updated_at = datetime('now') WHERE id = NEW.id;
END;`
          }
        },
        {
          h: 'BEFORE와 AFTER',
          html: `<p><code>BEFORE</code>는 실제 변경이 일어나기 <b>전에</b>, <code>AFTER</code>는 변경이 일어난 <b>후에</b> 실행돼요. <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code> 각각에 트리거를 걸 수 있어요.</p>`
        },
        {
          h: '트리거를 쓰는 예와 주의점',
          html: `<p>변경 이력을 자동으로 기록(감사 로그), 관련 데이터 자동 갱신, 값 검증 등에 써요. 하지만 트리거가 너무 많으면 "화면에 안 보이는 숨겨진 동작"이 늘어나서, 나중에 <b>왜 이 값이 바뀌었는지 추적하기 어려워질 수 있어요</b>. 신중하게 사용해야 해요.</p>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `표에 변화가 생기면 자동으로 실행되는 규칙을 만들 때 맨 앞에 쓰는 두 단어를 쓰세요.`,
          prefix: '', suffix: ' update_timestamp AFTER UPDATE ON students BEGIN ... END;', accept: ['CREATE TRIGGER', 'create trigger'], placeholder: '키워드',
          why: '<code>CREATE TRIGGER 이름 ...</code>으로 트리거를 만들어요.',
          hint: '"만들다"와 "방아쇠, 계기"에 해당하는 영어 단어예요.'
        }),
        () => makeChoice(
          '실제 변경이 일어나기 전에 실행하고 싶은 트리거에 쓰는 키워드는?',
          '<code>BEFORE</code>', ['<code>AFTER</code>', '<code>DURING</code>', '<code>ON</code>'],
          '<code>BEFORE</code>는 변경이 실제로 일어나기 전에 실행돼요.',
          '"~전에"라는 뜻의 영어 단어예요.'
        ),
        () => makeChoice(
          '트리거를 너무 많이, 복잡하게 쓰면 생길 수 있는 문제는?',
          '화면에 안 보이는 자동 동작이 많아져서 왜 값이 바뀌었는지 추적하기 어려워진다',
          ['데이터베이스 용량이 무조건 줄어든다', 'SELECT 문을 아예 못 쓰게 된다', '트리거는 아무 부작용이 없다'],
          '트리거는 "숨겨진 동작"이라, 너무 많으면 어떤 트리거 때문에 값이 바뀌었는지 추적하기 힘들어져요.',
          '트리거가 코드 어디에도 명시적으로 "호출"되지 않고 자동으로 실행된다는 점을 생각해보세요.'
        ),
        () => makeChoice(
          '데이터가 바뀔 때마다 "누가, 언제 바꿨는지" 자동으로 기록해두고 싶을 때 적합한 것은?',
          '트리거', ['VIEW', 'INDEX', 'DISTINCT'],
          '트리거는 INSERT/UPDATE/DELETE가 일어날 때마다 자동으로 추가 작업(예: 이력 기록)을 실행할 수 있어요.',
          '"어떤 일이 생기면 자동으로"라는 트리거의 특징과 맞아떨어지는 상황이에요.'
        ),
      ],
      boss: () => makeChoice(
        'students 표의 age 열이 음수로 바뀌는 걸 아예 막고 싶어요(값이 바뀌기 전에 확인해서 막아야 함). 어떤 트리거 시점이 적합할까요?',
        'BEFORE UPDATE', ['AFTER UPDATE', 'AFTER DELETE', 'BEFORE SELECT'],
        '값이 실제로 바뀌기 전에 확인해서 막아야 하니, BEFORE UPDATE 시점의 트리거가 적합해요. AFTER는 이미 바뀐 뒤라 막을 수 없어요.',
        '"바뀌기 전에 막아야 한다"는 요구사항과 BEFORE/AFTER의 차이를 연결해보세요.'
      )
    },
    {
      id: 'recursiveCte',
      title: '재귀 CTE (WITH RECURSIVE)',
      ready: true,
      summary: '조직도나 카테고리 트리처럼 "자기 자신을 참조하는" 계층 구조 데이터를, 재귀 CTE로 한 번에 조회하는 법을 배워요.',
      goals: ['WITH RECURSIVE로 계층 구조 펼치기', '기준(anchor)과 재귀(recursive) 부분의 역할', 'UNION ALL로 합치기'],
      blocks: [
        {
          h: '자기 자신을 참조하는 CTE: WITH RECURSIVE',
          html: `<p>직원과 그 직원의 상사처럼, 같은 표 안에서 "부모-자식" 관계가 반복되는 계층 구조는 <code>WITH RECURSIVE</code>로 한 번에 펼쳐볼 수 있어요.</p>`,
          code: {
            label: 'recursive_basic.sql',
            lang: 'sql',
            src: `WITH RECURSIVE numbers(n) AS (
  SELECT 1
  UNION ALL
  SELECT n + 1 FROM numbers WHERE n < 5
)
SELECT n FROM numbers;`,
            out: `n\n-\n1\n2\n3\n4\n5`
          }
        },
        {
          h: '두 부분으로 이루어져요: 기준과 재귀',
          html: `<p>재귀 CTE는 항상 두 부분을 <code>UNION ALL</code>로 이어요. 첫 번째 <code>SELECT 1</code>은 <b>시작점(anchor)</b>이고, 두 번째 <code>SELECT n + 1 FROM numbers WHERE n &lt; 5</code>는 <b>이전 결과(numbers)를 참조해서 다음 값을 만드는 재귀 부분</b>이에요. n이 5가 되면 조건을 더 이상 만족 안 해서 멈춰요.</p>`,
          after: `<div class="note"><b>주의</b> — 재귀 부분에 멈추는 조건(WHERE)이 없으면 무한히 반복돼서 오류가 나요. 항상 언젠가 거짓이 되는 조건을 넣어야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const limit = randInt(3, 8);
          return {
            type: 'blank',
            q: `<code>WITH RECURSIVE numbers(n) AS (SELECT 1 UNION ALL SELECT n + 1 FROM numbers WHERE n < ${limit}) SELECT n FROM numbers;</code>를 실행하면 몇 개의 행이 나올까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(limit)], placeholder: '숫자',
            why: `1부터 ${limit}까지 만들어져서 총 ${limit}개의 행이 나와요.`,
            hint: '1부터 시작해서, n이 조건(n < 한계값)을 만족하는 동안 계속 다음 값을 만들어요.'
          };
        },
        () => makeChoice(
          '재귀 CTE에서 두 SELECT(기준 부분과 재귀 부분)를 이어주는 키워드는?',
          '<code>UNION ALL</code>', ['<code>JOIN</code>', '<code>WHERE</code>', '<code>GROUP BY</code>'],
          '기준 부분과 재귀 부분을 <code>UNION ALL</code>로 이어서 하나의 CTE를 만들어요.',
          '두 SELECT 결과를 세로로 이어 붙이는 키워드예요.'
        ),
        () => ({
          type: 'blank',
          q: `자기 자신을 참조하는 CTE를 만들 때, WITH 뒤에 추가로 붙이는 키워드를 쓰세요.`,
          prefix: 'WITH ', suffix: ' numbers(n) AS (...)', accept: ['RECURSIVE', 'recursive'], placeholder: '키워드',
          why: '<code>WITH RECURSIVE</code>로 자기 자신을 참조할 수 있는 CTE를 만들어요.',
          hint: '"재귀적인"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '재귀 CTE의 재귀 부분에 멈추는 조건(WHERE)이 없다면?',
          '무한히 반복되어 오류가 난다', ['자동으로 1번만 실행된다', '정상적으로 빈 결과를 돌려준다', '컴파일 시점에 미리 막아준다'],
          '멈추는 조건이 없으면 재귀가 끝나지 않아서 오류가 나요.',
          '반복문에 종료 조건이 없으면 어떻게 될지 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '1부터 3까지의 숫자를 만드는 재귀 CTE <code>numbers(n)</code>를 작성하고, 그 결과를 조회하는 SQL을 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'WITH RECURSIVE numbers(n) AS (\n  SELECT 1\n  UNION ALL\n  SELECT n + 1 FROM numbers WHERE n < 3\n)\nSELECT n FROM numbers;',
          accept: ['WITH RECURSIVE numbers(n) AS (\n  SELECT 1\n  UNION ALL\n  SELECT n + 1 FROM numbers WHERE n < 3\n)\nSELECT n FROM numbers;'],
          why: 'SELECT 1을 시작점으로 하고, UNION ALL 뒤에 n + 1을 만들면서 n < 3인 동안 반복해요.',
          hint: '시작점 SELECT 1과 재귀 부분 SELECT n + 1 FROM numbers WHERE n < 3을 UNION ALL로 이으세요.'
        }),
      ],
      boss: () => {
        const limit = randInt(4, 10);
        return {
          type: 'blank',
          q: `<code>WITH RECURSIVE numbers(n) AS (SELECT 1 UNION ALL SELECT n + 1 FROM numbers WHERE n < ${limit}) SELECT n FROM numbers;</code>의 마지막 행(n의 최댓값)은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(limit)], placeholder: '숫자',
          why: `n이 ${limit}이 되면 더 이상 n < ${limit} 조건을 만족하지 않아 멈추므로, 마지막 값은 ${limit}이에요.`,
          hint: '조건 n < 한계값을 만족하는 동안만 다음 값을 만든다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'upsertInsert',
      title: '업서트(UPSERT): INSERT ... ON CONFLICT',
      ready: true,
      summary: '이미 있으면 수정하고, 없으면 새로 추가하는 "업서트" 패턴을 INSERT ... ON CONFLICT로 구현하는 법을 배워요.',
      goals: ['INSERT ... ON CONFLICT 문법', 'DO UPDATE로 충돌 시 값 바꾸기', 'DO NOTHING으로 충돌 시 무시하기'],
      blocks: [
        {
          h: '있으면 수정, 없으면 추가: 업서트(UPSERT)',
          html: `<p>"이 이메일을 가진 사용자가 있으면 이름만 바꾸고, 없으면 새로 추가해줘"처럼, INSERT와 UPDATE를 한 문장으로 처리하는 걸 <b>업서트(UPSERT)</b>라고 해요.</p>`,
          code: {
            label: 'upsert_basic.sql',
            lang: 'sql',
            src: `CREATE TABLE users (
  email TEXT PRIMARY KEY,
  name TEXT
);

INSERT INTO users (email, name) VALUES ('a@test.com', '지수')
ON CONFLICT (email) DO UPDATE SET name = '지수(수정됨)';`,
            out: `1개 행이 추가되거나 수정됨`
          }
        },
        {
          h: '충돌 시 아무것도 안 하기: DO NOTHING',
          html: `<p>이미 있으면 그냥 무시하고 싶다면 <code>DO UPDATE</code> 대신 <code>DO NOTHING</code>을 써요.</p>`,
          code: {
            label: 'upsert_do_nothing.sql',
            lang: 'sql',
            src: `INSERT INTO users (email, name) VALUES ('a@test.com', '민준')
ON CONFLICT (email) DO NOTHING;`,
            out: `이미 있으므로 아무 변화 없음`
          },
          after: `<div class="note"><b>주의</b> — ON CONFLICT는 그 열에 UNIQUE나 PRIMARY KEY 제약조건이 있어야 "무엇이 충돌인지" 판단할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const doUpdate = Math.random() < 0.5;
          return {
            type: 'blank',
            q: `email이 PRIMARY KEY인 users 표에 이미 'a@test.com'이 있을 때, <code>INSERT INTO users (email, name) VALUES ('a@test.com', '서연') ON CONFLICT (email) ${doUpdate ? "DO UPDATE SET name = '서연'" : 'DO NOTHING'};</code>을 실행하면 name은 어떻게 될까요? ("서연" 또는 "안 바뀜")`,
            prefix: '', suffix: '', accept: [doUpdate ? '서연' : '안 바뀜'], placeholder: '값',
            why: doUpdate ? 'DO UPDATE라서 충돌 시 name이 "서연"으로 바뀌어요.' : 'DO NOTHING이라서 충돌해도 아무 것도 바뀌지 않아요.',
            hint: 'ON CONFLICT 뒤에 DO UPDATE인지 DO NOTHING인지 확인해보세요.'
          };
        },
        () => makeChoice(
          'UPSERT가 필요한 상황은?',
          '같은 값이 있으면 수정하고, 없으면 새로 추가해야 할 때', ['항상 새 행만 추가해야 할 때', '항상 모든 행을 지워야 할 때', '정렬만 필요할 때'],
          'UPSERT는 INSERT와 UPDATE를 한 문장으로 처리해서, 있으면 수정하고 없으면 추가해요.',
          '"UPdate" + "inSERT"를 합친 이름이에요.'
        ),
        () => ({
          type: 'blank',
          q: `INSERT에서 충돌(중복)이 발생했을 때 어떻게 할지 정하는 절의 키워드 두 개를 쓰세요.`,
          prefix: 'INSERT INTO users (email, name) VALUES (...) ', suffix: ' (email) DO UPDATE SET name = ...', accept: ['ON CONFLICT', 'on conflict'], placeholder: '키워드',
          why: '<code>ON CONFLICT (열)</code> 뒤에 충돌 시 어떻게 할지(DO UPDATE / DO NOTHING)를 적어요.',
          hint: '"충돌(conflict)이 있을 때(on)"라는 뜻이에요.'
        }),
        () => makeChoice(
          '<code>ON CONFLICT (email) DO NOTHING</code>의 의미는?',
          '이미 같은 email이 있으면 그 INSERT를 조용히 무시한다', ['이미 있으면 오류를 발생시킨다', '이미 있으면 그 행을 삭제한다', 'email 열을 아예 없앤다'],
          'DO NOTHING은 충돌이 나도 아무 일도 하지 않고 조용히 넘어가요.',
          '이름 그대로 "아무것도 안 한다"는 뜻이에요.'
        ),
        () => ({
          type: 'code',
          q: "email이 PRIMARY KEY인 users 표에, 이미 있는 email('b@test.com')로 INSERT를 시도했을 때 name을 '갱신됨'으로 바꾸는 UPSERT INSERT 문을 작성하세요.",
          starter: '',
          rows: 2,
          placeholder: "INSERT INTO users (email, name) VALUES ('b@test.com', '갱신됨')\nON CONFLICT (email) DO UPDATE SET name = '갱신됨';",
          accept: ["INSERT INTO users (email, name) VALUES ('b@test.com', '갱신됨')\nON CONFLICT (email) DO UPDATE SET name = '갱신됨';"],
          why: 'ON CONFLICT (email) DO UPDATE SET ...로 충돌 시 값을 갱신해요.',
          hint: "INSERT INTO users (email, name) VALUES ('b@test.com', '갱신됨') 다음 줄에 ON CONFLICT (email) DO UPDATE SET name = '갱신됨';를 쓰세요."
        }),
      ],
      boss: () => {
        const exists = Math.random() < 0.5;
        const newName = pick(['하늘', '유진', '태윤']);
        return {
          type: 'blank',
          q: `email이 PRIMARY KEY인 users 표에 'c@test.com'이 ${exists ? '이미 있고' : '아직 없고'}, <code>INSERT INTO users (email, name) VALUES ('c@test.com', '${newName}') ON CONFLICT (email) DO UPDATE SET name = '${newName}';</code>를 실행하면, users 표의 행 개수는 어떻게 될까요? ("그대로" 또는 "1개 증가")`,
          prefix: '', suffix: '', accept: [exists ? '그대로' : '1개 증가'], placeholder: '값',
          why: exists ? '이미 있으면 UPDATE만 일어나서 행 개수는 그대로예요.' : '없으면 새로 INSERT되어 행 개수가 1개 늘어나요.',
          hint: '충돌이 있으면 UPDATE(개수 그대로), 없으면 새로 INSERT(개수 증가)돼요.'
        };
      }
    },
    {
      id: 'queryExecutionOrder',
      title: '쿼리 실행 순서',
      ready: true,
      summary: 'SELECT문을 작성하는 순서와 실제로 데이터베이스가 처리하는 순서가 다르다는 것을 이해하고, 왜 그런지 배워요.',
      goals: ['작성 순서 vs 실행(논리적) 순서', 'WHERE와 HAVING이 다른 단계에서 실행되는 이유', 'SELECT의 별칭을 WHERE에서 못 쓰는 이유'],
      blocks: [
        {
          h: '쓰는 순서와 실행되는 순서는 달라요',
          html: `<p>우리는 <code>SELECT ... FROM ... WHERE ... GROUP BY ... HAVING ... ORDER BY ...</code> 순서로 쿼리를 <b>작성</b>하지만, 데이터베이스는 실제로 <code>FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT</code> 순서로 <b>처리</b>해요.</p>`,
          code: {
            label: 'execution_order.sql',
            lang: 'sql',
            src: `SELECT age AS student_age
FROM students
WHERE age >= 15;`,
            out: `student_age\n-----------\n17\n16\n18`
          }
        },
        {
          h: '왜 SELECT의 별칭을 WHERE에서 못 쓸까요',
          html: `<p>위 코드에서 <code>WHERE student_age >= 15</code>라고 쓰면 오류가 나요. <b>WHERE는 SELECT보다 먼저 실행</b>되기 때문에, 아직 <code>student_age</code>라는 별칭이 만들어지기 전이라서 그 이름을 알 수 없어요. (단, GROUP BY/ORDER BY/HAVING은 SELECT 이후 단계라 별칭을 쓸 수 있는 DB가 많아요.)</p>`
        },
        {
          h: '전체 논리적 실행 순서',
          html: `<p>FROM(표를 가져오고) → WHERE(행을 거르고) → GROUP BY(묶고) → HAVING(그룹을 거르고) → SELECT(보여줄 열을 고르고) → ORDER BY(정렬하고) → LIMIT(개수를 제한) 순서로 처리돼요. 이 순서를 알면 "왜 이건 되고 저건 안 될까"를 훨씬 잘 이해할 수 있어요.</p>`,
          after: `<div class="note"><b>정리</b> — 쿼리를 "쓰는" 순서(SELECT부터)와 "실행되는" 순서(FROM부터)가 다르다는 걸 기억해두면, 오류 메시지를 이해하기 훨씬 쉬워져요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `쿼리의 실제 실행(논리적) 순서에서 가장 먼저 처리되는 절은? (SELECT, FROM, WHERE, GROUP BY 중에서)`,
          prefix: '', suffix: '', accept: ['FROM', 'from'], placeholder: '절 이름',
          why: 'FROM이 표를 가져오는 것부터 시작해서, WHERE → GROUP BY → HAVING → SELECT → ORDER BY 순서로 이어져요.',
          hint: '데이터를 어디서 가져올지부터 정해야 나머지 처리를 할 수 있어요.'
        }),
        () => makeChoice(
          'WHERE와 SELECT 중 실제로 먼저 실행되는 건?',
          'WHERE', ['SELECT', '둘은 동시에 실행된다', '상황에 따라 다르다'],
          '논리적 실행 순서는 FROM → WHERE → ... → SELECT라서, WHERE가 SELECT보다 먼저예요.',
          '행을 거르는 게 먼저인지, 보여줄 열을 고르는 게 먼저인지 생각해보세요.'
        ),
        () => makeChoice(
          'SELECT에서 만든 별칭(AS)을 WHERE에서 바로 쓸 수 없는 이유는?',
          'WHERE가 SELECT보다 먼저 실행되어서, 그 시점엔 별칭이 아직 존재하지 않기 때문에', ['별칭은 원래 절대 아무 데서도 못 써서', 'WHERE는 별칭이라는 개념 자체를 지원하지 않아서', 'SELECT가 항상 제일 먼저 실행되기 때문에'],
          'WHERE가 실행되는 시점엔 아직 SELECT의 별칭이 만들어지지 않았어요.',
          '실행 순서에서 WHERE와 SELECT 중 뭐가 먼저인지 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `GROUP BY로 묶은 후, 그 그룹 결과에 조건을 거는 절(HAVING)은 SELECT보다 먼저 실행될까요, 나중에 실행될까요? ("먼저" 또는 "나중")`,
          prefix: '', suffix: '', accept: ['먼저'], placeholder: '먼저/나중',
          why: '논리적 실행 순서는 FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY라서, HAVING이 SELECT보다 먼저예요.',
          hint: '전체 순서를 다시 떠올려보면, HAVING은 SELECT 앞에 있어요.'
        }),
        () => ({
          type: 'code',
          q: 'students 표에서 age가 15 이상인 학생만 골라, city별로 묶어서 학생 수를 세고, 그중 2명 이상인 도시만, city 기준 오름차순으로 보여주는 SQL을 작성하세요. (WHERE, GROUP BY, HAVING, ORDER BY를 모두 사용하세요)',
          starter: '',
          rows: 5,
          placeholder: 'SELECT city, COUNT(*)\nFROM students\nWHERE age >= 15\nGROUP BY city\nHAVING COUNT(*) >= 2\nORDER BY city;',
          accept: ['SELECT city, COUNT(*)\nFROM students\nWHERE age >= 15\nGROUP BY city\nHAVING COUNT(*) >= 2\nORDER BY city;'],
          why: '작성 순서(SELECT...FROM...WHERE...GROUP BY...HAVING...ORDER BY)를 그대로 지키면서, 각 절의 역할대로 조건을 넣어요.',
          hint: 'SELECT city, COUNT(*) FROM students WHERE age >= 15 GROUP BY city HAVING COUNT(*) >= 2 ORDER BY city; 순서를 그대로 따라가세요.'
        }),
      ],
      boss: () => {
        const clauses = ['FROM', 'WHERE', 'GROUP BY', 'HAVING', 'SELECT', 'ORDER BY'];
        const idx = randInt(0, clauses.length - 1);
        return {
          type: 'blank',
          q: `쿼리의 논리적 실행 순서 FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY에서, ${idx + 1}번째로 실행되는 절은?`,
          prefix: '', suffix: '', accept: [clauses[idx]], placeholder: '절 이름',
          why: `${idx + 1}번째 순서는 ${clauses[idx]}예요.`,
          hint: '순서를 하나씩 세어보세요: FROM(1) → WHERE(2) → GROUP BY(3) → HAVING(4) → SELECT(5) → ORDER BY(6).'
        };
      }
    },
    {
      id: 'jsonColumns',
      title: 'JSON 데이터 다루기',
      ready: true,
      summary: '표의 한 열에 JSON 형태로 저장된 데이터를 json_extract 같은 함수로 꺼내서 활용하는 법을 배워요.',
      goals: ['JSON 형태로 저장된 열 이해하기', 'json_extract로 특정 값 꺼내기', 'JSON을 쓸 때와 별도 열로 나눌 때의 차이'],
      blocks: [
        {
          h: '한 열에 여러 정보를 JSON으로 저장하기',
          html: `<p>취미 목록처럼 "몇 개가 될지 정해지지 않은" 정보는, 별도 표를 만드는 대신 하나의 열에 <b>JSON 문자열</b>로 저장하기도 해요.</p>`,
          code: {
            label: 'json_basic.sql',
            lang: 'sql',
            src: `CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  name TEXT,
  info TEXT
);

INSERT INTO students (name, info)
VALUES ('지수', '{"city": "서울", "age": 17}');`,
            out: `1개 행이 추가됨`
          }
        },
        {
          h: 'JSON 안의 값 꺼내기: json_extract',
          html: `<p><code>json_extract(열, '$.키')</code>로 JSON 문자열 안의 특정 값을 꺼낼 수 있어요. <code>$</code>는 JSON 전체를, <code>$.city</code>는 그 안의 city 값을 가리켜요.</p>`,
          code: {
            label: 'json_extract.sql',
            lang: 'sql',
            src: `SELECT name, json_extract(info, '$.city') AS city
FROM students;`,
            out: `name | city\n-----+-----\n지수  | 서울`
          },
          after: `<div class="note"><b>언제 별도 열로 나눌까요</b> — 그 값으로 자주 검색하거나 정렬해야 한다면 별도 열(예: city TEXT)로 만드는 게 더 빠르고 안전해요. JSON은 "가끔 보는, 구조가 자주 바뀌는" 부가 정보에 어울려요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const city = pick(['서울', '부산', '대전']);
          const age = randInt(14, 19);
          return {
            type: 'blank',
            q: `<code>info</code> 열에 <code>'{"city": "${city}", "age": ${age}}'</code>가 저장되어 있을 때, <code>json_extract(info, '$.city')</code>의 결과는? (따옴표 없이)`,
            prefix: '', suffix: '', accept: [city], placeholder: '값',
            why: `$.city는 JSON 안의 city 키의 값을 꺼내므로 "${city}"가 나와요.`,
            hint: '$.키 형태로 JSON 안의 특정 값을 지정해서 꺼내요.'
          };
        },
        () => makeChoice(
          'JSON 형태로 열에 저장하기 알맞은 경우는?',
          '항목 개수가 정해지지 않았거나 구조가 자주 바뀌는 부가 정보를 담을 때', ['자주 검색하고 정렬해야 하는 핵심 값을 담을 때', '표의 기본 키(PRIMARY KEY)를 담을 때', '숫자 계산에 항상 써야 하는 값을 담을 때'],
          'JSON은 구조가 유연해서, 개수나 형태가 자주 바뀌는 부가 정보에 어울려요.',
          '반대로 자주 검색/정렬할 값은 별도 열이 더 낫다는 점과 비교해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `JSON 문자열이 담긴 열에서 특정 키의 값을 꺼낼 때 쓰는 함수를 쓰세요.`,
          prefix: '', suffix: "(info, '$.city')", accept: ['json_extract'], placeholder: '함수 이름',
          why: `<code>json_extract(열, '$.키')</code>로 JSON 안의 값을 꺼내요.`,
          hint: '"JSON을 꺼낸다(extract)"는 뜻 그대로예요.'
        }),
        () => makeChoice(
          'JSON 열 대신 별도 열(예: city TEXT)로 나누는 게 더 나은 경우는?',
          '그 값으로 자주 검색하거나 정렬해야 할 때', ['절대로 검색할 필요가 없을 때', 'JSON이 사람이 읽기 더 어려울 때만', '값이 하나도 없을 때만'],
          '자주 검색·정렬하는 값은 별도 열로 두면 인덱스도 걸 수 있어 더 빠르고 안전해요.',
          'json_extract는 매번 문자열을 해석해야 해서, 색인 없이는 느릴 수 있어요.'
        ),
        () => ({
          type: 'code',
          q: "students 표의 info 열(JSON)에서 age 값을 꺼내 student_age라는 이름으로 name과 함께 조회하는 SQL을 작성하세요.",
          starter: '',
          placeholder: "SELECT name, json_extract(info, '$.age') AS student_age FROM students;",
          accept: ["SELECT name, json_extract(info, '$.age') AS student_age FROM students;"],
          why: "json_extract(info, '$.age')로 age 값을 꺼내고, AS로 별칭을 붙여요.",
          hint: "SELECT name, json_extract(info, '$.age') AS student_age FROM students;를 그대로 쓰세요."
        }),
      ],
      boss: () => {
        const city = pick(['서울', '부산', '대전', '광주']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>info</code>가 <code>'{"city": "${city}", "age": ${age}}'</code>일 때, <code>json_extract(info, '$.age')</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(age)], placeholder: '숫자',
          why: `$.age는 JSON 안의 age 키의 값을 꺼내므로 ${age}가 나와요.`,
          hint: '$.age는 age 키에 해당하는 값을 가리켜요.'
        };
      }
    },
    {
      id: 'checkConstraint',
      title: 'CHECK 제약조건',
      ready: true,
      summary: '열에 들어갈 수 있는 값의 조건을 직접 정하는 CHECK 제약조건으로, 잘못된 값이 아예 들어오지 못하게 막는 법을 배워요.',
      goals: ['CHECK로 값의 조건 정하기', 'CHECK 위반 시 어떻게 되는지', '다른 제약조건들과의 역할 차이'],
      blocks: [
        {
          h: '값의 조건을 직접 정하기: CHECK',
          html: `<p><code>CHECK (조건)</code>을 열 뒤에 붙이면, 그 조건을 만족하는 값만 들어올 수 있어요. 나이가 음수이거나 너무 큰 값이 들어오는 걸 막을 때 유용해요.</p>`,
          code: {
            label: 'check_basic.sql',
            lang: 'sql',
            src: `CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  age INTEGER CHECK (age >= 0 AND age <= 100)
);`
          }
        },
        {
          h: 'CHECK를 어기면 어떻게 될까요',
          html: `<p>CHECK 조건을 만족하지 않는 값으로 INSERT나 UPDATE를 시도하면, 데이터베이스가 그 자리에서 오류를 내고 거부해요.</p>`,
          code: {
            label: 'check_violation.sql',
            lang: 'sql',
            src: `INSERT INTO students (id, age) VALUES (1, -5);
-- 오류! age는 0 이상이어야 해요`
          }
        },
        {
          h: '다른 제약조건과의 역할 차이',
          html: `<p>NOT NULL은 "값이 있어야 한다", UNIQUE는 "중복되면 안 된다", FOREIGN KEY는 "다른 표를 가리켜야 한다"를 강제해요. CHECK는 그 외에 <b>내가 직접 정한 조건</b>(범위, 형식 등)을 강제할 때 써요.</p>`,
          after: `<div class="note"><b>정리</b> — CHECK는 열 하나에만 걸 수도 있고, 표 수준에 두면 여러 열을 함께 검사하는 조건(예: 시작일이 종료일보다 앞서야 한다)도 만들 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const age = randInt(-10, 110);
          const valid = age >= 0 && age <= 100;
          return {
            type: 'blank',
            q: `<code>age INTEGER CHECK (age >= 0 AND age <= 100)</code>일 때, <code>INSERT INTO students (id, age) VALUES (1, ${age});</code>는 성공할까요? ("성공" 또는 "오류")`,
            prefix: '', suffix: '', accept: [valid ? '성공' : '오류'], placeholder: '성공/오류',
            why: valid ? `${age}는 0 이상 100 이하라서 CHECK 조건을 만족해요.` : `${age}는 CHECK 조건(0 이상 100 이하)을 만족하지 않아서 오류가 나요.`,
            hint: '값이 CHECK에 적힌 조건을 만족하는지 확인해보세요.'
          };
        },
        () => makeChoice(
          'CHECK 제약조건이 하는 일은?',
          '열에 들어갈 수 있는 값의 조건을 직접 정해서, 그 조건을 벗어나는 값을 막는다', ['값이 중복되지 않게만 막는다', '다른 표를 반드시 참조하게만 강제한다', '열의 기본값을 자동으로 정해준다'],
          'CHECK는 내가 직접 정한 조건(범위, 형식 등)을 만족하는 값만 허용해요.',
          'UNIQUE, FOREIGN KEY, DEFAULT와 역할이 어떻게 다른지 비교해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `열에 들어갈 값의 조건을 직접 정할 때 쓰는 제약조건 키워드를 쓰세요.`,
          prefix: 'age INTEGER ', suffix: ' (age >= 0 AND age <= 100)', accept: ['CHECK', 'check'], placeholder: '키워드',
          why: '<code>CHECK (조건)</code>으로 값이 만족해야 하는 조건을 직접 정해요.',
          hint: '"확인하다, 검사하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'CHECK 조건을 만족하지 않는 값으로 INSERT를 시도하면?',
          '데이터베이스가 그 INSERT를 거부하고 오류를 낸다', ['조용히 무시하고 넘어간다', '값을 자동으로 조건에 맞게 고쳐준다', 'CHECK는 INSERT에는 적용되지 않는다'],
          'CHECK 조건을 어기면 그 INSERT/UPDATE 자체가 거부되고 오류가 나요.',
          '다른 제약조건(NOT NULL 등)을 어겼을 때와 똑같이 동작해요.'
        ),
        () => ({
          type: 'code',
          q: '<code>score</code> 열이 0 이상 100 이하의 값만 가지도록 CHECK 제약조건을 붙인 <code>scores</code> 표를 만드는 SQL을 작성하세요. (id는 INTEGER PRIMARY KEY)',
          starter: '',
          rows: 4,
          placeholder: 'CREATE TABLE scores (\n  id INTEGER PRIMARY KEY,\n  score INTEGER CHECK (score >= 0 AND score <= 100)\n);',
          accept: ['CREATE TABLE scores (\n  id INTEGER PRIMARY KEY,\n  score INTEGER CHECK (score >= 0 AND score <= 100)\n);'],
          why: 'score 열 뒤에 CHECK (score >= 0 AND score <= 100)을 붙여서 값의 범위를 강제해요.',
          hint: 'score INTEGER 뒤에 CHECK (score >= 0 AND score <= 100)을 붙이세요.'
        }),
      ],
      boss: () => {
        const score = randInt(-20, 120);
        const valid = score >= 0 && score <= 100;
        return {
          type: 'blank',
          q: `<code>score INTEGER CHECK (score >= 0 AND score <= 100)</code>일 때, <code>INSERT INTO scores (id, score) VALUES (1, ${score});</code>는 성공할까요? ("성공" 또는 "오류")`,
          prefix: '', suffix: '', accept: [valid ? '성공' : '오류'], placeholder: '성공/오류',
          why: valid ? `${score}는 조건을 만족해서 성공해요.` : `${score}는 CHECK 조건을 벗어나서 오류가 나요.`,
          hint: '0 이상 100 이하인지 확인해보세요.'
        };
      }
    },
    {
      id: 'correlatedSubquery',
      title: '상관 서브쿼리 (Correlated Subquery)',
      ready: true,
      summary: '바깥 쿼리의 값을 안쪽 서브쿼리에서 참조하는 상관 서브쿼리로, "각 그룹 안에서"의 조건을 표현하는 법을 배워요.',
      goals: ['상관 서브쿼리와 일반 서브쿼리의 차이', '바깥 행마다 서브쿼리가 다시 실행된다는 것', '"각 도시에서 가장 나이 많은 학생" 같은 문제 풀기'],
      blocks: [
        {
          h: '서브쿼리가 바깥 값을 참조할 수도 있어요',
          html: `<p>지금까지 본 서브쿼리는 한 번만 계산되는 "독립된" 쿼리였어요. 하지만 서브쿼리 안에서 <b>바깥 쿼리의 열</b>을 참조하면, 그 서브쿼리는 <b>바깥의 행마다 다시 계산</b>돼요. 이걸 <b>상관 서브쿼리</b>라고 해요.</p>`,
          code: {
            label: 'correlated_basic.sql',
            lang: 'sql',
            src: `SELECT s1.name, s1.city, s1.age
FROM students s1
WHERE s1.age = (
  SELECT MAX(s2.age)
  FROM students s2
  WHERE s2.city = s1.city
);`,
            out: `name | city | age\n-----+------+----\n민준  | 부산  | 16\n서연  | 서울  | 18`
          }
        },
        {
          h: '왜 "상관(correlated)"이라고 부를까요',
          html: `<p>서브쿼리 안의 <code>s2.city = s1.city</code>가 바깥 행(s1)마다 다른 값을 참조해요. 그래서 이 서브쿼리는 딱 한 번이 아니라, <b>바깥의 각 행에 대해 한 번씩</b> 다시 계산돼요. 이렇게 바깥과 "서로 연관되어" 있어서 상관 서브쿼리라고 불러요.</p>`,
          after: `<div class="note"><b>비교</b> — 이전에 배운 일반 서브쿼리(예: 평균보다 나이 많은 학생)는 딱 한 번만 계산되는 "독립된" 값이었지만, 상관 서브쿼리는 바깥 행마다 다시 계산되는 "의존적인" 값이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const cities = ['서울', '부산', '대구'];
          const students = [
            { name: '지수', city: cities[0], age: randInt(14, 19) },
            { name: '민준', city: cities[0], age: randInt(14, 19) },
            { name: '서연', city: cities[1], age: randInt(14, 19) },
          ];
          const seoulStudents = students.filter(s => s.city === cities[0]);
          const maxSeoul = Math.max(...seoulStudents.map(s => s.age));
          const winner = seoulStudents.find(s => s.age === maxSeoul);
          const listText = seoulStudents.map(s => `${s.name}(${s.age}세)`).join(', ');
          return {
            type: 'blank',
            q: `${cities[0]}에 사는 학생이 ${listText}일 때, "각 도시에서 가장 나이 많은 학생"을 찾는 상관 서브쿼리로 ${cities[0]} 학생 중 뽑히는 사람은 누구일까요? (이름만 입력)`,
            prefix: '', suffix: '', accept: [winner.name], placeholder: '이름',
            why: `${cities[0]}에서 가장 나이가 많은 사람은 ${winner.name}(${maxSeoul}세)이에요.`,
            hint: '같은 도시 학생들 중 나이가 가장 많은 사람을 찾아보세요.'
          };
        },
        () => makeChoice(
          '상관 서브쿼리가 일반(독립) 서브쿼리와 다른 점은?',
          '바깥 쿼리의 열 값을 참조해서, 바깥의 각 행마다 다시 계산된다', ['항상 딱 한 번만 계산된다', 'WHERE 절에서는 절대 쓸 수 없다', 'GROUP BY와 함께 쓸 수 없다'],
          '상관 서브쿼리는 바깥 행의 값을 참조하기 때문에, 바깥 행마다 새로 계산돼요.',
          '"상관(correlated)"이라는 이름이 바깥과의 관계를 나타내요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>WHERE s1.age = (SELECT MAX(s2.age) FROM students s2 WHERE s2.city = s1.city)</code>에서, 서브쿼리 안의 <code>s1.city</code>는 무엇을 가리킬까요? ("바깥 쿼리의 city" 또는 "서브쿼리 자신의 city")`,
          prefix: '', suffix: '', accept: ['바깥 쿼리의 city'], placeholder: '값',
          why: 's1은 바깥 쿼리(FROM students s1)의 별칭이라서, s1.city는 바깥 쿼리 현재 행의 city를 가리켜요.',
          hint: 's1은 서브쿼리 밖, 바깥 FROM에서 정의된 별칭이에요.'
        }),
        () => makeChoice(
          '상관 서브쿼리를 실무에서 쓰기 좋은 경우는?',
          '"각 그룹 안에서" 조건을 걸어야 할 때(예: 각 도시에서 가장 나이 많은 사람)', ['표 전체에서 딱 하나의 값만 필요할 때', '정렬만 하면 충분할 때', '아무 조건도 필요 없을 때'],
          '상관 서브쿼리는 "그룹별로 다시 계산해야 하는" 조건을 표현하기에 알맞아요.',
          '바깥 행마다 다시 계산된다는 특징이 언제 필요한지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '각 도시(city)에서 나이(age)가 가장 많은 학생을 찾는 상관 서브쿼리를 작성하세요. (별칭 s1, s2를 사용하세요)',
          starter: '',
          rows: 5,
          placeholder: 'SELECT s1.name, s1.city, s1.age\nFROM students s1\nWHERE s1.age = (\n  SELECT MAX(s2.age) FROM students s2 WHERE s2.city = s1.city\n);',
          accept: ['SELECT s1.name, s1.city, s1.age\nFROM students s1\nWHERE s1.age = (\n  SELECT MAX(s2.age) FROM students s2 WHERE s2.city = s1.city\n);'],
          why: '서브쿼리 안에서 s2.city = s1.city로 바깥 행의 도시를 참조해서, 같은 도시 안에서만 MAX(age)를 구해요.',
          hint: '서브쿼리 조건에 WHERE s2.city = s1.city를 넣어서 바깥 행과 같은 도시로 한정하세요.'
        }),
      ],
      boss: () => {
        const students = [
          { name: '지수', city: '서울', age: randInt(14, 19) },
          { name: '민준', city: '서울', age: randInt(14, 19) },
          { name: '서연', city: '부산', age: randInt(14, 19) },
          { name: '하늘', city: '부산', age: randInt(14, 19) },
        ];
        const cities = [...new Set(students.map(s => s.city))];
        const winners = cities.map(c => {
          const inCity = students.filter(s => s.city === c);
          const maxAge = Math.max(...inCity.map(s => s.age));
          return inCity.find(s => s.age === maxAge).name;
        });
        const studentText = students.map(s => `${s.name}(${s.city}, ${s.age}세)`).join(', ');
        return {
          type: 'blank',
          q: `학생이 ${studentText}일 때, "각 도시에서 가장 나이 많은 학생"을 찾는 상관 서브쿼리의 결과로 뽑히는 이름들은? (배열 형태로, 예: [이름, 이름])`,
          prefix: '', suffix: '', accept: [`[${winners.join(', ')}]`], placeholder: '[이름, 이름]',
          why: `각 도시별로 가장 나이 많은 학생을 고르면 [${winners.join(', ')}]이 나와요.`,
          hint: '도시별로 나눠서, 그 안에서 가장 나이 많은 사람을 각각 찾아보세요.'
        };
      }
    },
    {
      id: 'multiRowInsert',
      title: '여러 행 한 번에 INSERT하기',
      ready: true,
      summary: '한 번의 INSERT문으로 여러 행을 동시에 추가하는 방법과, 왜 이 방식이 더 효율적인지 배워요.',
      goals: ['VALUES 뒤에 여러 묶음 나열하기', '한 번에 여러 행 추가하기', '여러 번 INSERT하는 것과의 차이'],
      blocks: [
        {
          h: '한 번에 여러 행 추가하기',
          html: `<p><code>VALUES</code> 뒤에 <code>(값들)</code>을 쉼표로 구분해서 여러 개 나열하면, INSERT문 하나로 여러 행을 한꺼번에 추가할 수 있어요.</p>`,
          code: {
            label: 'multi_insert_basic.sql',
            lang: 'sql',
            src: `INSERT INTO students (name, age, city) VALUES
  ('하늘', 16, '대전'),
  ('유진', 17, '광주'),
  ('태윤', 15, '수원');`,
            out: `3개 행이 추가됨`
          }
        },
        {
          h: '왜 한 번에 넣는 게 더 효율적일까요',
          html: `<p>INSERT문을 3번 따로 실행하는 것보다, 한 번의 INSERT문에 3개 행을 담아 보내는 게 데이터베이스와 <b>주고받는 횟수를 줄여줘서</b> 훨씬 빨라요. 많은 행을 한꺼번에 넣어야 할 때 특히 유리해요.</p>`,
          after: `<div class="note"><b>정리</b> — 각 행은 괄호로 묶고, 행과 행 사이는 쉼표로 구분해요. 열 이름과 값의 순서·개수는 모든 행에서 똑같이 맞춰야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 6);
          const rows = Array.from({ length: n }, () => `('${pick(['하늘', '유진', '태윤', '민서'])}', ${randInt(14, 19)}, '${pick(['대전', '광주', '수원'])}')`);
          const rowsText = rows.join(', ');
          return {
            type: 'blank',
            q: `<code>INSERT INTO students (name, age, city) VALUES ${rowsText};</code>를 실행하면 몇 개의 행이 추가될까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `VALUES 뒤에 괄호로 묶인 값 묶음이 ${n}개 있으므로 ${n}개 행이 추가돼요.`,
            hint: 'VALUES 뒤에 나열된 괄호 묶음의 개수를 세어보세요.'
          };
        },
        () => makeChoice(
          '여러 행을 한 번의 INSERT문으로 넣는 것과, 여러 번 INSERT문을 따로 실행하는 것의 차이는?',
          '한 번에 넣는 게 데이터베이스와 주고받는 횟수가 줄어서 더 효율적이다', ['결과는 완전히 다르게 저장된다', '여러 번 나눠 실행하는 게 항상 더 빠르다', '한 번에 넣으면 최대 1개 행만 넣을 수 있다'],
          '한 번의 INSERT문에 여러 행을 담으면 주고받는 횟수가 줄어서 더 효율적이에요.',
          '왕복 횟수가 줄어드는 것과 관련이 있어요.'
        ),
        () => ({
          type: 'blank',
          q: `VALUES 뒤에 여러 행을 나열할 때, 각 괄호 묶음 사이에 넣는 문장 부호를 쓰세요.`,
          prefix: "VALUES ('하늘', 16, '대전')", suffix: " ('유진', 17, '광주')", accept: [','], placeholder: '문장 부호',
          why: '각 행(괄호로 묶인 값들) 사이는 쉼표(,)로 구분해요.',
          hint: '목록을 나열할 때 흔히 쓰는 문장 부호예요.'
        }),
        () => makeChoice(
          '여러 행을 한 번에 INSERT할 때 지켜야 하는 것은?',
          '모든 행에서 열의 순서와 개수가 똑같아야 한다', ['첫 번째 행만 열 이름과 맞으면 된다', '각 행마다 다른 개수의 값을 넣어도 된다', '마지막 행은 열 이름이 없어도 된다'],
          '모든 값 묶음이 앞서 정의한 열 순서·개수와 똑같이 맞아야 해요.',
          '열 이름은 한 번만 적지만, 그 규칙은 모든 값 묶음에 똑같이 적용돼요.'
        ),
        () => ({
          type: 'code',
          q: "students 표에 ('민서', 15, '인천')과 ('도윤', 16, '제주') 두 학생을 한 번의 INSERT문으로 추가하는 SQL을 작성하세요.",
          starter: '',
          rows: 3,
          placeholder: "INSERT INTO students (name, age, city) VALUES\n  ('민서', 15, '인천'),\n  ('도윤', 16, '제주');",
          accept: ["INSERT INTO students (name, age, city) VALUES\n  ('민서', 15, '인천'),\n  ('도윤', 16, '제주');"],
          why: 'VALUES 뒤에 두 개의 괄호 묶음을 쉼표로 구분해서 나열하면 한 번에 두 행이 추가돼요.',
          hint: "VALUES 뒤에 ('민서', 15, '인천'), ('도윤', 16, '제주')를 쉼표로 이어서 쓰세요."
        }),
      ],
      boss: () => {
        const n = randInt(3, 8);
        return {
          type: 'blank',
          q: `<code>INSERT INTO students (name, age, city) VALUES</code> 뒤에 괄호 묶음이 ${n}개 나열된 SQL을 실행하면, 몇 개의 행이 추가될까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
          why: `괄호 묶음 하나가 행 하나에 대응되므로 ${n}개 행이 추가돼요.`,
          hint: '괄호로 묶인 값들 하나가 새 행 하나를 뜻해요.'
        };
      }
    },
    {
      id: 'lagLeadFunctions',
      title: '이전/다음 행 값 가져오기 (LAG/LEAD)',
      ready: true,
      summary: '정렬된 결과 안에서 바로 이전 행이나 다음 행의 값을 끌어오는 LAG와 LEAD 윈도우 함수를 배워요.',
      goals: ['LAG()로 이전 행 값 가져오기', 'LEAD()로 다음 행 값 가져오기', '맨 앞/맨 뒤 행에서 NULL이 나오는 이유'],
      blocks: [
        {
          h: '바로 이전 행 값 가져오기: LAG()',
          html: `<p><code>LAG(열) OVER (ORDER BY 정렬기준)</code>은 지금 행 기준으로 <b>바로 이전 행</b>의 값을 가져와요. "내 앞 순위 학생의 점수는 몇 점이었지?" 같은 비교에 딱이에요.</p>`,
          code: {
            label: 'lag_basic.sql',
            lang: 'sql',
            src: `SELECT name, score,
  LAG(score) OVER (ORDER BY score DESC) AS prev_score
FROM scores JOIN students ON students.id = scores.student_id;`,
            out: `name | score | prev_score\n-----+-------+-----------\n지수  | 95    | NULL\n민준  | 88    | 95\n서연  | 72    | 88`
          }
        },
        {
          h: '바로 다음 행 값 가져오기: LEAD()',
          html: `<p><code>LEAD(열) OVER (ORDER BY 정렬기준)</code>은 <code>LAG</code>와 반대로, 지금 행 기준 <b>바로 다음 행</b>의 값을 가져와요.</p>`,
          code: {
            label: 'lead_basic.sql',
            lang: 'sql',
            src: `SELECT name, score,
  LEAD(score) OVER (ORDER BY score DESC) AS next_score
FROM scores JOIN students ON students.id = scores.student_id;`,
            out: `name | score | next_score\n-----+-------+-----------\n지수  | 95    | 88\n민준  | 88    | 72\n서연  | 72    | NULL`
          }
        },
        {
          h: '맨 앞/맨 뒤에는 가져올 행이 없어요',
          html: `<p>첫 번째 행은 <b>이전 행이 없어서</b> <code>LAG</code>의 결과가 <code>NULL</code>이고, 마지막 행은 <b>다음 행이 없어서</b> <code>LEAD</code>의 결과가 <code>NULL</code>이에요. <code>LAG(열, n, 기본값)</code>처럼 세 번째 인자로 NULL 대신 쓸 기본값을 지정할 수도 있어요.</p>`,
          after: `<div class="note"><b>활용 예</b> — 이번 달 매출과 지난 달 매출을 나란히 놓고 증감을 비교할 때, PARTITION BY로 지점별로 나눠서 각각 LAG를 적용하면 지점별 "전월 대비"를 구할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const scores = shuffle([95, 88, 72, 60, 55]).slice(0, 4);
          const sorted = [...scores].sort((a, b) => b - a);
          const idx = randInt(1, sorted.length - 1);
          const target = sorted[idx];
          const prev = sorted[idx - 1];
          return {
            type: 'blank',
            q: `점수를 내림차순(${sorted.join(', ')})으로 정렬했을 때, <code>LAG(score) OVER (ORDER BY score DESC)</code>로 점수 ${target}인 행이 가져오는 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(prev)], placeholder: '숫자',
            why: `${target} 바로 앞 행(더 높은 점수)은 ${prev}이므로, LAG의 결과는 ${prev}예요.`,
            hint: '정렬된 순서에서 그 행 바로 위(이전) 행의 값을 찾아보세요.'
          };
        },
        () => makeChoice(
          '<code>LAG()</code>와 <code>LEAD()</code>의 차이는?',
          'LAG는 이전 행의 값을, LEAD는 다음 행의 값을 가져온다', ['LAG는 그룹 전체 평균을, LEAD는 합계를 구한다', '둘 다 완전히 같은 함수다', 'LAG는 다음 행, LEAD는 이전 행을 가져온다'],
          'LAG는 "뒤처지다"라는 뜻으로 이전 행을, LEAD는 "앞서가다"라는 뜻으로 다음 행을 가져와요.',
          '단어 뜻(뒤처지다 vs 앞서가다)을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `정렬된 결과에서 맨 첫 번째 행에 <code>LAG(score) OVER (ORDER BY score DESC)</code>를 적용하면 어떤 값이 나올까요? (대문자로)`,
          prefix: '', suffix: '', accept: ['NULL'], placeholder: '값',
          why: '첫 번째 행은 그 이전에 가져올 행이 없어서 LAG의 결과가 NULL이에요.',
          hint: '"이전 행이 아예 없다"는 상황을 떠올려보세요.'
        }),
        () => makeChoice(
          'LAG와 LEAD를 쓸 때 반드시 필요한 것은?',
          'OVER 안에 어떤 순서로 이전/다음을 판단할지 정하는 ORDER BY', ['GROUP BY 없이는 절대 쓸 수 없다', 'WHERE 절이 반드시 있어야 한다', '표에 인덱스가 반드시 있어야 한다'],
          'LAG/LEAD는 "무엇을 기준으로 이전/다음인지" 알아야 하므로 OVER 안에 ORDER BY가 꼭 필요해요.',
          '"이전"이라는 개념 자체가 순서를 전제로 한다는 걸 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '점수(score) 내림차순으로 정렬한 뒤, 각 행마다 바로 다음 행의 점수를 next_score라는 이름으로 가져오는 SQL을 작성하세요. (students와 scores가 이미 JOIN된 결과라고 가정하고 FROM 절은 students JOIN scores ON students.id = scores.student_id로 쓰세요)',
          starter: '',
          rows: 3,
          placeholder: 'SELECT name, LEAD(score) OVER (ORDER BY score DESC) AS next_score\nFROM students JOIN scores ON students.id = scores.student_id;',
          accept: ['SELECT name, LEAD(score) OVER (ORDER BY score DESC) AS next_score\nFROM students JOIN scores ON students.id = scores.student_id;'],
          why: 'LEAD(열) OVER (ORDER BY 열 DESC) AS 별명 형태로 다음 행의 값을 가져와요.',
          hint: 'LEAD(score) OVER (ORDER BY score DESC) AS next_score를 SELECT에 추가하세요.'
        }),
      ],
      boss: () => {
        const scores = shuffle([100, 92, 85, 70, 63]).slice(0, 4).sort((a, b) => b - a);
        const idx = randInt(0, scores.length - 2);
        const target = scores[idx];
        const next = scores[idx + 1];
        return {
          type: 'blank',
          q: `점수를 내림차순(${scores.join(', ')})으로 정렬했을 때, <code>LEAD(score) OVER (ORDER BY score DESC)</code>로 점수 ${target}인 행이 가져오는 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(next)], placeholder: '숫자',
          why: `${target} 바로 다음 행(더 낮은 점수)은 ${next}이므로, LEAD의 결과는 ${next}예요.`,
          hint: '정렬된 순서에서 그 행 바로 아래(다음) 행의 값을 찾아보세요.'
        };
      }
    },
    {
      id: 'ntileFunction',
      title: 'NTILE로 데이터 N등분하기',
      ready: true,
      summary: '전체 데이터를 원하는 개수의 그룹으로 최대한 고르게 나눠주는 NTILE 윈도우 함수를 배워요.',
      goals: ['NTILE(n)으로 N개 그룹으로 나누기', '성적을 상위/중위/하위 그룹으로 나누기', '행 개수가 그룹 수로 안 나눠떨어질 때의 처리'],
      blocks: [
        {
          h: '전체를 N개 그룹으로 나누기: NTILE()',
          html: `<p><code>NTILE(n) OVER (ORDER BY 정렬기준)</code>은 정렬된 전체 행을 <b>n개의 그룹</b>으로 최대한 고르게 나눠서, 각 행이 몇 번째 그룹인지 번호(1~n)를 매겨줘요. 성적을 "상위 33%, 중위 33%, 하위 33%"로 나누고 싶을 때 유용해요.</p>`,
          code: {
            label: 'ntile_basic.sql',
            lang: 'sql',
            src: `SELECT name, score,
  NTILE(3) OVER (ORDER BY score DESC) AS score_group
FROM scores JOIN students ON students.id = scores.student_id;`,
            out: `name | score | score_group\n-----+-------+------------\n지수  | 95    | 1\n민준  | 88    | 1\n서연  | 75    | 2\n하늘  | 60    | 3`
          }
        },
        {
          h: '그룹 번호가 작을수록 앞쪽 그룹이에요',
          html: `<p><code>ORDER BY score DESC</code>와 함께 썼으니, <b>그룹 1</b>이 점수가 가장 높은 학생들이에요. 만약 <code>ORDER BY score ASC</code>였다면 그룹 1은 점수가 가장 낮은 학생들이 돼요. 기준이 되는 <code>ORDER BY</code> 방향이 그룹의 의미를 결정해요.</p>`
        },
        {
          h: '나누어떨어지지 않을 때는?',
          html: `<p>행이 10개인데 <code>NTILE(3)</code>을 쓰면 3, 3, 4개(또는 비슷하게)로 <b>앞쪽 그룹에 한 명씩 더</b> 배분돼요. 완벽하게 똑같이 나눌 수 없을 땐 앞쪽 그룹부터 하나씩 더 채워요.</p>`,
          after: `<div class="note"><b>PARTITION BY도 함께 쓸 수 있어요</b> — 도시별로 따로 3등분하고 싶다면 <code>NTILE(3) OVER (PARTITION BY city ORDER BY score DESC)</code>처럼 쓰면 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 4);
          return {
            type: 'blank',
            q: `학생 성적을 <code>NTILE(${n})</code>으로 나누면 총 몇 개의 그룹으로 나뉠까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `NTILE(n)의 n이 곧 나뉘는 그룹의 개수라서, NTILE(${n})은 ${n}개 그룹으로 나눠요.`,
            hint: 'NTILE 괄호 안의 숫자가 곧 그룹 개수예요.'
          };
        },
        () => makeChoice(
          '<code>NTILE(3) OVER (ORDER BY score DESC)</code>에서 그룹 번호 1은 무엇을 뜻할까요?',
          '점수가 가장 높은 상위 그룹', ['점수가 가장 낮은 하위 그룹', '점수가 중간인 그룹', '아무 의미도 없는 임의의 번호'],
          'ORDER BY score DESC로 정렬했으므로, 그룹 1은 점수가 가장 높은 학생들이 속한 그룹이에요.',
          'ORDER BY의 정렬 방향과 그룹 번호의 관계를 생각해보세요.'
        ),
        () => {
          const total = randInt(7, 11);
          const groups = 3;
          const base = Math.floor(total / groups);
          const extra = total % groups;
          const firstGroupSize = base + (extra > 0 ? 1 : 0);
          return {
            type: 'blank',
            q: `학생이 총 ${total}명일 때 <code>NTILE(3)</code>을 적용하면, 1번 그룹에는 몇 명이 들어갈까요? 숫자만 쓰세요. (나누어떨어지지 않으면 앞쪽 그룹부터 한 명씩 더 배정)`,
            prefix: '', suffix: '', accept: [String(firstGroupSize)], placeholder: '숫자',
            why: `${total}명을 3그룹으로 나누면 기본 ${base}명씩이고, 나머지 ${extra}명은 앞쪽 그룹부터 하나씩 더 배정되므로 1번 그룹은 ${firstGroupSize}명이에요.`,
            hint: '전체를 그룹 수로 나눈 몫과 나머지를 생각해보고, 나머지는 앞쪽 그룹에 먼저 배정돼요.'
          };
        },
        () => makeChoice(
          '도시별로 따로 성적을 3등분하고 싶을 때 NTILE과 함께 쓰는 키워드는?',
          'PARTITION BY city', ['GROUP BY city만 단독으로', 'WHERE city IS NOT NULL', 'HAVING city = city'],
          'PARTITION BY city를 OVER 안에 추가하면 도시별로 따로 NTILE 그룹이 매겨져요.',
          '앞서 배운 ROW_NUMBER의 PARTITION BY 활용법과 똑같은 원리예요.'
        ),
        () => ({
          type: 'code',
          q: '점수(score) 내림차순으로 정렬한 뒤, NTILE(4)로 4개 그룹으로 나눠 score_group이라는 이름으로 name과 함께 조회하는 SQL을 작성하세요. (students와 scores가 이미 JOIN된 결과라고 가정하고 FROM 절은 students JOIN scores ON students.id = scores.student_id로 쓰세요)',
          starter: '',
          rows: 3,
          placeholder: 'SELECT name, NTILE(4) OVER (ORDER BY score DESC) AS score_group\nFROM students JOIN scores ON students.id = scores.student_id;',
          accept: ['SELECT name, NTILE(4) OVER (ORDER BY score DESC) AS score_group\nFROM students JOIN scores ON students.id = scores.student_id;'],
          why: 'NTILE(4) OVER (ORDER BY score DESC) AS 별명 형태로 4개 그룹으로 나눠요.',
          hint: 'NTILE(4) OVER (ORDER BY score DESC) AS score_group을 SELECT에 추가하세요.'
        }),
      ],
      boss: () => {
        const total = randInt(9, 14);
        const groups = randInt(2, 4);
        const base = Math.floor(total / groups);
        const extra = total % groups;
        return {
          type: 'blank',
          q: `학생이 총 ${total}명이고 <code>NTILE(${groups})</code>를 적용할 때, 나머지가 앞쪽 그룹부터 배정된다면 <b>마지막(${groups}번) 그룹</b>에는 몇 명이 들어갈까요? 숫자만 쓰세요. (나머지가 0이면 모든 그룹이 같은 크기예요)`,
          prefix: '', suffix: '', accept: [String(base)], placeholder: '숫자',
          why: `${total}명을 ${groups}그룹으로 나누면 기본 ${base}명씩 배정되고, 나머지 ${extra}명은 앞쪽 그룹에 먼저 배정되므로 마지막 그룹은 기본값인 ${base}명이에요.`,
          hint: '나머지는 앞쪽 그룹부터 채워지므로, 마지막 그룹은 몫(기본 크기)만큼만 받는다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'materializedViewConcept',
      title: '구체화된 뷰 (Materialized View) 개념',
      ready: true,
      summary: '매번 다시 계산하는 일반 VIEW와 달리, 결과를 미리 계산해서 저장해두는 구체화된 뷰의 개념과 트레이드오프를 배워요.',
      goals: ['일반 VIEW와 구체화된 뷰의 차이', '구체화된 뷰가 빠른 이유', '오래된 데이터를 보여줄 수 있다는 단점'],
      blocks: [
        {
          h: '일반 VIEW는 매번 다시 계산해요',
          html: `<p>앞서 배운 <code>VIEW</code>는 쿼리 자체만 저장해두고, 조회할 때마다 그 쿼리를 <b>매번 다시 실행</b>해요. 그래서 결과는 항상 최신이지만, 원본 쿼리가 무겁다면(예: 수백만 행 집계) 조회할 때마다 느려요.</p>`,
          code: {
            label: 'normal_view.sql',
            lang: 'sql',
            src: `CREATE VIEW city_avg_score AS
SELECT city, AVG(score) AS avg_score
FROM students JOIN scores ON students.id = scores.student_id
GROUP BY city;
-- 조회할 때마다 JOIN과 AVG를 처음부터 다시 계산해요`
          }
        },
        {
          h: '결과를 미리 저장해두는 구체화된 뷰',
          html: `<p><b>구체화된 뷰(Materialized View)</b>는 쿼리 결과를 <b>실제 표처럼 미리 계산해서 저장</b>해둬요. 조회할 때 매번 다시 계산하지 않고 저장된 결과를 바로 읽기 때문에 훨씬 빨라요. SQLite에는 전용 문법이 없어서, 보통 결과를 <b>진짜 표(TABLE)로 만들어두고 주기적으로 다시 채우는 방식</b>으로 흉내 내요.</p>`,
          code: {
            label: 'materialized_simulate.sql',
            lang: 'sql',
            src: `CREATE TABLE city_avg_score_snapshot AS
SELECT city, AVG(score) AS avg_score
FROM students JOIN scores ON students.id = scores.student_id
GROUP BY city;
-- 이후 데이터가 바뀌면, 이 표를 DROP하고 같은 SQL로 다시 만들어(REFRESH) 최신화해요`,
            out: `city_avg_score_snapshot 표가 만들어짐 (계산된 결과가 실제로 저장됨)`
          }
        },
        {
          h: '트레이드오프: 속도 vs 최신성',
          html: `<p>구체화된 뷰는 <b>조회는 빠르지만</b>, 원본 데이터가 바뀌어도 <b>자동으로 갱신되지 않아요</b>. 누군가 다시 채워주기(REFRESH) 전까지는 <b>오래된(stale) 데이터</b>를 보여줄 수 있어요. "매번 최신이어야 하는가"와 "얼마나 빨라야 하는가" 사이에서 선택해야 해요.</p>`,
          after: `<div class="note"><b>비교 정리</b> — 일반 VIEW: 항상 최신, 매번 다시 계산(느릴 수 있음). 구체화된 뷰: 조회는 빠름, 갱신 전까지 오래된 데이터일 수 있음.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '일반 VIEW와 구체화된 뷰(Materialized View)의 가장 큰 차이는?',
          '일반 VIEW는 조회 때마다 다시 계산하고, 구체화된 뷰는 결과를 미리 계산해 저장해둔다',
          ['구체화된 뷰는 데이터를 절대 저장하지 않는다', '일반 VIEW가 항상 더 빠르다', '둘은 완전히 같은 것이다'],
          '구체화된 뷰는 쿼리 결과를 실제로 저장해두기 때문에 조회할 때 다시 계산할 필요가 없어요.',
          '"미리 계산해서 저장"이라는 이름의 뜻을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `구체화된 뷰가 조회가 빠른 이유는, 조회할 때마다 쿼리를 다시 계산하지 않고 이미 ___된 결과를 읽기 때문이에요. (한글 두 글자, "미리 ___")`,
          prefix: '미리 ', suffix: '', accept: ['계산'], placeholder: '단어',
          why: '결과를 미리 계산해서 저장해두기 때문에, 조회할 때는 그 저장된 값을 바로 읽기만 하면 돼요.',
          hint: '조회 시점이 아니라 미리 해두는 작업이 뭔지 생각해보세요.'
        }),
        () => makeChoice(
          '구체화된 뷰의 대표적인 단점은?',
          '원본 데이터가 바뀌어도 다시 채우기(REFRESH) 전까지 오래된 데이터를 보여줄 수 있다',
          ['저장 공간을 전혀 쓰지 않는다', '조회 속도가 항상 느리다', 'INSERT를 아예 할 수 없게 만든다'],
          '구체화된 뷰는 미리 계산된 스냅샷이라서, 다시 채우기 전까지는 최신 데이터가 반영되지 않아요.',
          '"미리 저장해둔 값"이라는 특징이 낳는 부작용을 생각해보세요.'
        ),
        () => makeChoice(
          'SQLite에서 구체화된 뷰를 흉내 낼 때 흔히 쓰는 방법은?',
          '쿼리 결과를 진짜 TABLE로 만들어두고, 필요할 때 다시 만들어 최신화한다',
          ['CREATE MATERIALIZED VIEW 문법을 그대로 쓴다', 'INDEX만 만들면 자동으로 구체화된다', 'TRIGGER 없이는 절대 불가능하다'],
          'SQLite에는 전용 문법이 없어서, 결과를 담은 TABLE을 만들고 주기적으로 다시 채우는 방식으로 흉내 내요.',
          '"전용 문법이 없다"고 했던 점을 다시 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: 'students와 scores를 JOIN해서 city별 평균 점수(avg_score)를 구한 결과를, city_avg_score_snapshot이라는 진짜 표로 만드는 SQL을 작성하세요. (CREATE TABLE ... AS SELECT 형태를 사용하세요)',
          starter: '',
          rows: 4,
          placeholder: 'CREATE TABLE city_avg_score_snapshot AS\nSELECT city, AVG(score) AS avg_score\nFROM students JOIN scores ON students.id = scores.student_id\nGROUP BY city;',
          accept: ['CREATE TABLE city_avg_score_snapshot AS\nSELECT city, AVG(score) AS avg_score\nFROM students JOIN scores ON students.id = scores.student_id\nGROUP BY city;'],
          why: 'CREATE TABLE 이름 AS SELECT ...로, 쿼리 결과를 실제 표로 저장할 수 있어요. 이게 구체화된 뷰를 흉내 내는 방식이에요.',
          hint: 'CREATE TABLE city_avg_score_snapshot AS 뒤에 city별 AVG(score)를 구하는 SELECT를 이어 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '매일 자정에 한 번씩만 계산해도 되는 "어제까지의 누적 매출 통계"를 대시보드에 아주 빠르게 보여주고 싶어요. 매번 무거운 집계 쿼리를 실행하는 대신 무엇이 적합할까요?',
        '결과를 미리 계산해 저장해두는 구체화된 뷰(스냅샷 표)를 만들고 매일 갱신한다',
        ['매번 EXPLAIN QUERY PLAN만 확인한다', '표에 인덱스를 지운다', '아무 조치도 필요 없다'],
        '매번 실시간으로 최신일 필요가 없다면, 미리 계산해둔 구체화된 뷰(스냅샷)로 조회 속도를 크게 높일 수 있어요.',
        '"최신성보다 속도가 중요한 상황"이라는 힌트를 떠올려보세요.'
      )
    },
    {
      id: 'compositeIndexes',
      title: '복합 인덱스 (여러 열을 묶은 인덱스)',
      ready: true,
      summary: '두 개 이상의 열을 하나로 묶어 인덱스를 만드는 복합 인덱스와, 열 순서가 왜 중요한지 배워요.',
      goals: ['CREATE INDEX로 복합 인덱스 만들기', '열 순서(왼쪽 우선 원칙)의 중요성', '커버링 인덱스 맛보기'],
      blocks: [
        {
          h: '두 열을 묶어 인덱스 만들기',
          html: `<p>단일 열 인덱스처럼, <b>두 개 이상의 열</b>을 괄호 안에 순서대로 나열해서 <b>복합 인덱스</b>를 만들 수 있어요. "도시별로, 그 안에서 나이순으로" 자주 검색한다면 이렇게 묶는 게 효과적이에요.</p>`,
          code: {
            label: 'composite_index.sql',
            lang: 'sql',
            src: `CREATE INDEX idx_city_age ON students(city, age);`
          }
        },
        {
          h: '열 순서가 중요해요: 왼쪽 우선 원칙',
          html: `<p>복합 인덱스 <code>(city, age)</code>는 <b>city를 먼저 정렬하고, 같은 city 안에서 age로 정렬</b>한 것과 같아요. 그래서 <code>WHERE city = '서울'</code>이나 <code>WHERE city = '서울' AND age &gt; 15</code>에는 이 인덱스를 잘 활용하지만, <b>city 조건 없이 age만으로 검색</b>하면 이 인덱스를 제대로 활용하지 못해요. 마치 책의 찾아보기가 "이름(성) → 이름(이름)" 순으로 되어 있으면, 성을 모르고 이름만으로는 빠르게 찾기 어려운 것과 같아요.</p>`,
          code: {
            label: 'composite_where.sql',
            lang: 'sql',
            src: `-- 이 인덱스를 잘 활용함 (city가 조건의 맨 앞)
SELECT * FROM students WHERE city = '서울' AND age > 15;

-- 이 인덱스를 제대로 활용하지 못함 (city 조건이 없음)
SELECT * FROM students WHERE age > 15;`
          }
        },
        {
          h: '조회할 열까지 담아두는 커버링 인덱스',
          html: `<p>인덱스에 <b>조회에 필요한 모든 열</b>이 이미 들어있다면, 원본 표까지 갈 필요 없이 인덱스만 보고 답을 낼 수 있어요. 이런 인덱스를 <b>커버링 인덱스</b>라고 불러요. 예를 들어 <code>(city, age)</code> 인덱스로 <code>SELECT city, age FROM students WHERE city = '서울'</code>를 조회하면, 표를 따로 뒤지지 않고 인덱스만으로 끝낼 수 있어요.</p>`,
          after: `<div class="note"><b>기억하기</b> — 복합 인덱스의 열 순서는 "자주 등호(=)로 비교하는 열을 앞에" 두는 게 일반적인 원칙이에요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>students</code> 표의 <code>city</code>와 <code>age</code> 두 열을 묶어 <code>idx_city_age</code>라는 이름의 인덱스를 만드는 SQL을 완성하세요.`,
          prefix: '', suffix: ' idx_city_age ON students(city, age);', accept: ['CREATE INDEX', 'create index'], placeholder: '키워드',
          why: '단일 열과 마찬가지로 <code>CREATE INDEX 이름 ON 표(열1, 열2)</code>로 복합 인덱스를 만들어요.',
          hint: '단일 열 인덱스를 만들 때와 똑같은 키워드예요.'
        }),
        () => makeChoice(
          '<code>(city, age)</code> 복합 인덱스가 잘 활용되는 조건은?',
          '<code>WHERE city = \'서울\'</code> (또는 city와 age를 함께 쓰는 조건)',
          ['<code>WHERE age &gt; 15</code> (city 조건 없이 age만)', '조건이 전혀 없을 때', 'ORDER BY 없이 SELECT *만 쓸 때'],
          '복합 인덱스는 왼쪽부터 순서대로 활용되므로, 맨 앞 열인 city가 조건에 있어야 잘 활용돼요.',
          '왼쪽 우선 원칙: 인덱스의 첫 번째 열이 조건에 있어야 해요.'
        ),
        () => makeChoice(
          '인덱스에 조회할 열이 이미 다 들어있어서, 원본 표를 따로 뒤지지 않아도 되는 인덱스를 뭐라고 부를까요?',
          '커버링 인덱스', ['프라이머리 인덱스', '유니크 인덱스', '풀텍스트 인덱스'],
          '조회에 필요한 열을 모두 "덮고(cover)" 있어서 커버링 인덱스라고 불러요.',
          '"덮다, 커버하다"라는 뜻의 영어 단어에서 온 이름이에요.'
        ),
        () => makeChoice(
          '<code>(city, age)</code> 순서로 만든 복합 인덱스에서, city 조건 없이 age만으로 검색하면 어떻게 될까요?',
          '이 인덱스를 제대로 활용하지 못하고 풀 스캔에 가깝게 동작할 수 있다',
          ['항상 city 조건이 있을 때보다 더 빠르다', '오류가 발생한다', '자동으로 age 우선 인덱스로 바뀐다'],
          '복합 인덱스는 왼쪽(city)부터 정렬되어 있어서, city 조건 없이 age만 찾으면 인덱스를 순서대로 활용하기 어려워요.',
          '책 찾아보기가 "성 → 이름" 순인데 이름만 아는 상황을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: 'scores 표의 student_id와 score 두 열을 묶어 idx_student_score라는 복합 인덱스를 만드는 SQL을 작성하세요. (열 순서는 student_id, score)',
          starter: '',
          placeholder: 'CREATE INDEX idx_student_score ON scores(student_id, score);',
          accept: ['CREATE INDEX idx_student_score ON scores(student_id, score);'],
          why: 'CREATE INDEX 이름 ON 표(열1, 열2); 형태로 복합 인덱스를 만들어요.',
          hint: 'CREATE INDEX idx_student_score ON scores(student_id, score);를 그대로 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '자주 실행하는 쿼리가 <code>WHERE city = ? AND age = ?</code>처럼 항상 city와 age를 함께 조건으로 쓴다면, 어떤 인덱스가 가장 효과적일까요?',
        '(city, age) 순서의 복합 인덱스 하나', ['city 단독 인덱스와 age 단독 인덱스를 각각 따로 만든다', '인덱스를 아예 만들지 않는다', 'age 단독 인덱스 하나만 만든다'],
        '두 조건을 항상 함께 쓴다면, (city, age) 복합 인덱스 하나가 두 조건을 한 번에 효율적으로 처리해줘요.',
        '항상 같이 쓰이는 조건이라면 각각 따로보다 묶는 게 유리하다는 걸 생각해보세요.'
      )
    },
    {
      id: 'savepoints',
      title: 'SAVEPOINT로 트랜잭션 일부만 되돌리기',
      ready: true,
      summary: '트랜잭션 전체를 취소하지 않고, 중간 지점까지만 되돌릴 수 있게 해주는 SAVEPOINT를 배워요.',
      goals: ['SAVEPOINT로 중간 지점 표시하기', 'ROLLBACK TO로 그 지점까지만 되돌리기', 'RELEASE로 저장점 없애기'],
      blocks: [
        {
          h: '트랜잭션 중간에 "표시점" 남기기: SAVEPOINT',
          html: `<p>트랜잭션 안에서 <code>SAVEPOINT 이름</code>으로 중간 지점을 표시해두면, 나중에 문제가 생겼을 때 <b>트랜잭션 전체가 아니라 그 지점까지만</b> 되돌릴 수 있어요.</p>`,
          code: {
            label: 'savepoint_basic.sql',
            lang: 'sql',
            src: `BEGIN;
INSERT INTO students (name, age, city) VALUES ('하늘', 16, '대전');

SAVEPOINT before_score;
INSERT INTO scores (student_id, score) VALUES (999, 150); -- 잘못된 값!`
          }
        },
        {
          h: '그 지점까지만 되돌리기: ROLLBACK TO',
          html: `<p><code>ROLLBACK TO SAVEPOINT 이름</code>을 쓰면, 그 저장점 <b>이후에 한 변경만 취소</b>되고 저장점 이전 변경(위 예시의 학생 INSERT)은 그대로 남아요. 트랜잭션 전체를 <code>ROLLBACK</code>하는 것과 다르게, <b>일부만 되돌리는 것</b>이에요.</p>`,
          code: {
            label: 'rollback_to.sql',
            lang: 'sql',
            src: `ROLLBACK TO SAVEPOINT before_score;
-- 잘못된 성적 INSERT만 취소되고, 학생 INSERT는 그대로 남아있음
COMMIT;`
          }
        },
        {
          h: '저장점 정리하기: RELEASE',
          html: `<p>더 이상 그 저장점이 필요 없어지면 <code>RELEASE SAVEPOINT 이름</code>으로 정리할 수 있어요(트랜잭션 자체를 끝내는 건 아니에요). 저장점은 하나의 트랜잭션 안에 <b>여러 개를 중첩</b>해서 만들 수도 있어요.</p>`,
          after: `<div class="note"><b>비유</b> — 게임하다가 저장(SAVE)해두고, 실수하면 그 저장 지점으로만 되돌아가는 것과 비슷해요. 처음부터 다시 시작(전체 ROLLBACK)하지 않아도 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `트랜잭션 중간에 <code>before_score</code>라는 이름으로 저장점을 만드는 SQL을 완성하세요.`,
          prefix: '', suffix: ' before_score;', accept: ['SAVEPOINT', 'savepoint'], placeholder: '키워드',
          why: '<code>SAVEPOINT 이름</code>으로 트랜잭션 안에 중간 지점을 표시해요.',
          hint: '"저장 지점"이라는 뜻 그대로의 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>ROLLBACK TO SAVEPOINT before_score;</code>를 실행하면 어떻게 될까요?',
          'before_score 저장점 이후의 변경만 취소되고, 그 이전 변경은 남는다',
          ['트랜잭션 전체가 취소된다', '아무 변경도 취소되지 않는다', '저장점 이전 변경까지 모두 취소된다'],
          'ROLLBACK TO SAVEPOINT는 그 저장점 이후의 변경만 취소해요. 트랜잭션 자체는 계속 진행 중이에요.',
          '전체 ROLLBACK과 달리 "부분적으로만" 되돌린다는 점을 생각해보세요.'
        ),
        () => makeChoice(
          '트랜잭션 전체를 취소하는 <code>ROLLBACK</code>과 <code>ROLLBACK TO SAVEPOINT</code>의 차이는?',
          'ROLLBACK은 트랜잭션 전체를 취소하고, ROLLBACK TO SAVEPOINT는 지정한 지점까지만 되돌린다',
          ['둘은 완전히 같은 동작이다', 'ROLLBACK TO SAVEPOINT가 항상 더 넓은 범위를 취소한다', 'SAVEPOINT 없이는 ROLLBACK을 아예 쓸 수 없다'],
          'ROLLBACK은 트랜잭션 시작 지점까지 전부 되돌리고, ROLLBACK TO SAVEPOINT는 그 저장점까지만 부분적으로 되돌려요.',
          '"전체" vs "지정한 지점까지"라는 범위 차이를 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `저장점이 더 이상 필요 없을 때, 트랜잭션은 유지한 채 저장점만 정리하는 키워드를 쓰세요.`,
          prefix: '', suffix: ' SAVEPOINT before_score;', accept: ['RELEASE', 'release'], placeholder: '키워드',
          why: '<code>RELEASE SAVEPOINT 이름</code>으로 저장점을 정리할 수 있어요. 트랜잭션 자체는 끝나지 않아요.',
          hint: '"놓아주다, 해제하다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'code',
          q: '트랜잭션을 시작(BEGIN)하고, mid라는 이름의 저장점을 만든 뒤, 그 저장점까지 되돌리는(ROLLBACK TO) SQL을 순서대로 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'BEGIN;\nSAVEPOINT mid;\nROLLBACK TO SAVEPOINT mid;',
          accept: ['BEGIN;\nSAVEPOINT mid;\nROLLBACK TO SAVEPOINT mid;'],
          why: 'BEGIN으로 트랜잭션을 시작하고, SAVEPOINT mid;로 지점을 표시한 뒤, ROLLBACK TO SAVEPOINT mid;로 그 지점까지 되돌려요.',
          hint: 'BEGIN;, SAVEPOINT mid;, ROLLBACK TO SAVEPOINT mid;를 순서대로 한 줄씩 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '트랜잭션 안에서 학생 3명을 INSERT한 뒤, 저장점(SAVEPOINT s1)을 만들고, 그 다음 잘못된 성적 데이터를 INSERT했어요. 학생 3명은 그대로 남기고 잘못된 성적만 취소하려면?',
        'ROLLBACK TO SAVEPOINT s1;을 실행한다', ['ROLLBACK;으로 트랜잭션 전체를 취소한다', 'COMMIT;을 바로 실행한다', 'DELETE FROM students;를 실행한다'],
        'ROLLBACK TO SAVEPOINT s1;은 저장점 이후 변경(잘못된 성적)만 취소하고, 그 이전 변경(학생 3명 INSERT)은 그대로 남겨요.',
        '트랜잭션 전체를 취소하면 학생 INSERT까지 사라진다는 점을 생각해보세요.'
      )
    },
    {
      id: 'stringAggregation',
      title: 'GROUP_CONCAT으로 문자열 합치기',
      ready: true,
      summary: '그룹으로 묶은 여러 행의 값을, 구분자로 이어붙인 하나의 문자열로 만들어주는 GROUP_CONCAT을 배워요.',
      goals: ['GROUP_CONCAT으로 여러 값 한 줄로 합치기', '구분자 직접 지정하기', 'GROUP BY와 함께 그룹별로 합치기'],
      blocks: [
        {
          h: '여러 값을 한 줄로 합치기: GROUP_CONCAT',
          html: `<p><code>GROUP_CONCAT(열)</code>은 여러 행의 값을 <b>쉼표로 이어붙인 하나의 문자열</b>로 만들어주는 집계 함수예요. COUNT/SUM처럼 여러 행을 하나의 결과로 요약하지만, 숫자가 아니라 문자열을 합쳐준다는 점이 달라요.</p>`,
          code: {
            label: 'group_concat_basic.sql',
            lang: 'sql',
            src: `SELECT GROUP_CONCAT(name) FROM students;`,
            out: `GROUP_CONCAT(name)\n-------------------\n지수,민준,서연`
          }
        },
        {
          h: '구분자 직접 정하기',
          html: `<p>기본 구분자는 쉼표(,)지만, <code>GROUP_CONCAT(열, '구분자')</code>처럼 두 번째 자리에 원하는 구분자를 넣으면 그 구분자로 이어붙여요.</p>`,
          code: {
            label: 'group_concat_sep.sql',
            lang: 'sql',
            src: `SELECT GROUP_CONCAT(name, ' / ') FROM students;`,
            out: `지수 / 민준 / 서연`
          }
        },
        {
          h: '도시별로 묶어서 학생 이름 합치기',
          html: `<p><code>GROUP BY</code>와 함께 쓰면, 그룹마다 <b>따로</b> 문자열을 만들어줘요. "도시별로 그 도시에 사는 학생 이름 목록"을 한 줄씩 보고 싶을 때 유용해요.</p>`,
          code: {
            label: 'group_concat_group.sql',
            lang: 'sql',
            src: `SELECT city, GROUP_CONCAT(name) AS names
FROM students
GROUP BY city;`,
            out: `city | names\n-----+----------\n서울  | 지수,서연\n부산  | 민준`
          },
          after: `<div class="note"><b>비유</b> — 여러 이름표를 실 하나로 꿰어서 한 줄짜리 목록으로 보여주는 것과 비슷해요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `여러 행의 값을 쉼표로 이어붙인 하나의 문자열로 만들어주는 집계 함수를 쓰세요.`,
          prefix: 'SELECT ', suffix: '(name) FROM students;', accept: ['GROUP_CONCAT', 'group_concat'], placeholder: '함수 이름',
          why: '<code>GROUP_CONCAT(열)</code>은 여러 행의 값을 쉼표로 이어붙인 문자열을 만들어줘요.',
          hint: '"그룹으로 묶어서 이어붙인다(concatenate)"는 뜻의 두 단어가 합쳐진 이름이에요.'
        }),
        () => makeChoice(
          '<code>GROUP_CONCAT(name)</code>의 기본 구분자는?',
          '쉼표(,)', ['공백( )', '세미콜론(;)', '줄바꿈'],
          '구분자를 따로 지정하지 않으면 기본값은 쉼표(,)예요.',
          '두 번째 인자를 생략했을 때 기본으로 쓰이는 문장 부호를 떠올려보세요.'
        ),
        () => {
          const sep = pick([' / ', ' | ', ', ']);
          return {
            type: 'blank',
            q: `학생 이름들을 "${sep}"로 구분해서 합치려고 해요. 빈칸을 채우세요.`,
            prefix: `SELECT GROUP_CONCAT(name, `, suffix: `) FROM students;`, accept: [`'${sep}'`], placeholder: "'구분자'",
            why: `<code>GROUP_CONCAT(열, '구분자')</code>처럼 두 번째 자리에 원하는 구분자를 넣어요.`,
            hint: '두 번째 인자 자리에 원하는 구분자를 작은따옴표로 감싸서 넣어요.'
          };
        },
        () => makeChoice(
          '도시별로 그 도시 학생 이름 목록을 한 줄씩 보고 싶을 때, GROUP_CONCAT과 함께 꼭 필요한 절은?',
          '<code>GROUP BY city</code>', ['<code>ORDER BY city</code>', '<code>HAVING city</code>', '<code>WHERE city</code>'],
          'GROUP BY city로 도시별로 묶어야, 그 그룹 안에서만 GROUP_CONCAT이 따로 합쳐줘요.',
          'GROUP BY 없이 GROUP_CONCAT만 쓰면 전체가 한 줄로 합쳐진다는 걸 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '도시(city)별로 그 도시에 사는 학생 이름을 GROUP_CONCAT으로 합쳐서 names라는 이름으로 city와 함께 조회하는 SQL을 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'SELECT city, GROUP_CONCAT(name) AS names\nFROM students\nGROUP BY city;',
          accept: ['SELECT city, GROUP_CONCAT(name) AS names\nFROM students\nGROUP BY city;'],
          why: 'GROUP_CONCAT(name)으로 이름을 합치고, GROUP BY city로 도시별로 묶어요.',
          hint: 'SELECT city, GROUP_CONCAT(name) AS names FROM students GROUP BY city; 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => makeChoice(
        '서울에 사는 학생이 "지수", "서연" 두 명일 때, <code>SELECT GROUP_CONCAT(name) FROM students WHERE city = \'서울\';</code>의 결과는?',
        '지수,서연', ['지수', '서연', '지수 그리고 서연'],
        'GROUP_CONCAT은 조건에 맞는 행들의 값을 기본 구분자(쉼표)로 이어붙여서 "지수,서연"이 돼요.',
        '기본 구분자가 쉼표라는 점을 떠올려보세요.'
      )
    },
    {
      id: 'jsonAggregation',
      title: '집계 결과를 JSON으로 모으기',
      ready: true,
      summary: '여러 행을 하나의 JSON 배열이나 객체로 모아주는 json_group_array / json_group_object를 배워요.',
      goals: ['json_group_array로 여러 값을 배열로 모으기', 'json_group_object로 키-값 쌍 모으기', 'GROUP BY와 함께 그룹별 JSON 만들기'],
      blocks: [
        {
          h: '여러 값을 JSON 배열로 모으기: json_group_array',
          html: `<p><code>json_group_array(열)</code>은 여러 행의 값을 <b>JSON 배열 문자열</b>로 모아줘요. GROUP_CONCAT이 단순 문자열이라면, 이건 JSON을 다루는 코드에서 바로 파싱할 수 있는 배열 형태예요.</p>`,
          code: {
            label: 'json_group_array.sql',
            lang: 'sql',
            src: `SELECT json_group_array(name) FROM students;`,
            out: `["지수","민준","서연"]`
          }
        },
        {
          h: '키-값 쌍으로 모으기: json_group_object',
          html: `<p><code>json_group_object(키, 값)</code>은 각 행을 "키: 값" 쌍으로 삼아, 하나의 JSON 객체로 모아줘요.</p>`,
          code: {
            label: 'json_group_object.sql',
            lang: 'sql',
            src: `SELECT json_group_object(name, age) FROM students;`,
            out: `{"지수":17,"민준":16,"서연":18}`
          }
        },
        {
          h: 'GROUP BY와 함께: 그룹별 JSON 배열',
          html: `<p>GROUP BY와 함께 쓰면, 그룹마다 따로 JSON 배열을 만들어줘요. API 응답처럼 "도시별 학생 이름 배열"이 필요할 때 바로 쓸 수 있어요.</p>`,
          code: {
            label: 'json_group_by.sql',
            lang: 'sql',
            src: `SELECT city, json_group_array(name) AS names
FROM students
GROUP BY city;`,
            out: `city | names\n-----+-------------------\n서울  | ["지수","서연"]\n부산  | ["민준"]`
          },
          after: `<div class="note"><b>참고</b> — 앞서 배운 <code>json_extract</code>가 JSON을 "꺼내는" 함수라면, <code>json_group_array</code>/<code>json_group_object</code>는 여러 행을 JSON으로 "모으는" 집계 함수예요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `여러 행의 값을 하나의 JSON 배열 문자열로 모아주는 함수를 쓰세요.`,
          prefix: 'SELECT ', suffix: '(name) FROM students;', accept: ['json_group_array'], placeholder: '함수 이름',
          why: '<code>json_group_array(열)</code>은 여러 값을 JSON 배열로 모아줘요.',
          hint: '"JSON 배열로 모은다"는 뜻 그대로의 이름이에요.'
        }),
        () => makeChoice(
          '<code>json_group_object(name, age)</code>가 만드는 결과 형태는?',
          '{"이름":나이, "이름":나이, ...} 형태의 JSON 객체', ['["이름", "나이", ...] 형태의 배열', '이름과 나이를 쉼표로 이어붙인 단순 문자열', '가장 나이 많은 사람 한 명만'],
          'json_group_object(키, 값)은 각 행을 키-값 쌍으로 삼아 하나의 JSON 객체로 모아요.',
          '"object(객체)"라는 이름에서 키-값 쌍이라는 걸 떠올려보세요.'
        ),
        () => makeChoice(
          'json_group_array와 GROUP_CONCAT의 가장 큰 차이는?',
          'json_group_array는 JSON 배열 형태라 코드에서 바로 파싱할 수 있다', ['json_group_array는 숫자만 모을 수 있다', 'GROUP_CONCAT은 그룹별로 못 쓴다', '둘은 완전히 같은 결과를 만든다'],
          'json_group_array는 결과가 JSON 배열 문법이라, 애플리케이션 코드에서 바로 JSON으로 읽을 수 있어요.',
          '결과 문자열의 모양([...] vs 그냥 콤마로 나열)을 비교해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `도시별로 학생 이름을 JSON 배열로 모으려고 해요. 빈칸을 채우세요.`,
          prefix: 'SELECT city, json_group_array(name) AS names FROM students ', suffix: ' city;', accept: ['GROUP BY', 'group by'], placeholder: '키워드',
          why: 'GROUP BY city로 묶어야 도시별로 따로 JSON 배열이 만들어져요.',
          hint: '"묶는다"는 뜻의 두 단어짜리 키워드예요.'
        }),
        () => ({
          type: 'code',
          q: 'students 표의 name을 json_group_array로 모아서 조회하는 SQL을 작성하세요.',
          starter: '',
          placeholder: 'SELECT json_group_array(name) FROM students;',
          accept: ['SELECT json_group_array(name) FROM students;'],
          why: 'json_group_array(name)으로 모든 학생 이름을 하나의 JSON 배열로 모아요.',
          hint: 'SELECT json_group_array(name) FROM students;를 그대로 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '부산에 사는 학생이 "민준" 한 명일 때, <code>SELECT json_group_array(name) FROM students WHERE city = \'부산\';</code>의 결과는?',
        '["민준"]', ['민준', '{"민준"}', '[민준]'],
        '학생이 한 명이어도 json_group_array는 배열 형태를 유지해서, 큰따옴표로 감싼 "민준"을 대괄호 안에 넣은 ["민준"]이 돼요.',
        'JSON 배열에서 문자열 값은 큰따옴표로 감싸진다는 걸 떠올려보세요.'
      )
    },
    {
      id: 'nPlusOneProblem',
      title: 'N+1 문제: 반복되는 쿼리 줄이기',
      ready: true,
      summary: '학생마다 성적을 따로따로 조회하면 쿼리가 N번 더 실행되는 N+1 문제와, JOIN으로 한 번에 해결하는 법을 배워요.',
      goals: ['N+1 문제가 무엇인지 이해하기', '왜 성능에 나쁜지 알기', 'JOIN 한 번으로 해결하기'],
      blocks: [
        {
          h: 'N+1 문제란?',
          html: `<p>학생 목록을 먼저 조회(쿼리 1번)한 뒤, 각 학생마다 "이 학생의 점수는?"이라는 쿼리를 <b>따로따로</b> 또 실행하면, 학생이 N명일 때 총 <code>1 + N</code>번의 쿼리가 실행돼요. 이걸 <b>N+1 문제</b>라고 불러요.</p>`,
          code: {
            label: 'n_plus_one_bad.sql',
            lang: 'sql',
            src: `-- (1) 학생 목록 조회 (쿼리 1번)
SELECT id, name FROM students;

-- (2) 학생마다 반복해서 실행 (학생 수만큼, 즉 N번)
SELECT score FROM scores WHERE student_id = 1;
SELECT score FROM scores WHERE student_id = 2;
SELECT score FROM scores WHERE student_id = 3;`
          }
        },
        {
          h: '왜 느려질까요',
          html: `<p>학생이 3명이면 4번(1+3)이지만, 학생이 10,000명이면 <b>10,001번</b>의 쿼리가 실행돼요. 쿼리 하나하나는 빨라도, 데이터베이스를 오가는 왕복 횟수 자체가 너무 많아져서 전체는 매우 느려져요.</p>`
        },
        {
          h: 'JOIN 한 번으로 해결하기',
          html: `<p>학생과 성적을 <code>JOIN</code>으로 한 번에 이어붙이면, 쿼리를 <b>딱 1번만</b> 실행해서 필요한 데이터를 전부 가져올 수 있어요.</p>`,
          code: {
            label: 'n_plus_one_fix.sql',
            lang: 'sql',
            src: `SELECT students.id, students.name, scores.score
FROM students
JOIN scores ON students.id = scores.student_id;`
          },
          after: `<div class="note"><b>기억하기</b> — "반복문 안에서 쿼리를 또 실행하고 있다"는 게 보이면 N+1을 의심하고, JOIN으로 한 번에 가져올 수 없는지 먼저 확인해보세요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(3, 20);
          return {
            type: 'blank',
            q: `학생 목록을 조회하는 쿼리 1번에 이어, 학생 ${n}명마다 성적을 따로 조회하는 쿼리를 각각 실행한다면 총 몇 번의 쿼리가 실행될까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n + 1)], placeholder: '숫자',
            why: `학생 목록 조회 1번 + 학생마다 반복하는 ${n}번 = ${n + 1}번이에요. 이게 N+1 문제예요.`,
            hint: '처음 1번의 쿼리에, 학생 수만큼의 쿼리를 더해보세요.'
          };
        },
        () => makeChoice(
          'N+1 문제가 발생하는 전형적인 패턴은?',
          '목록을 한 번 조회한 뒤, 그 목록의 각 항목마다 관련 데이터를 또 따로 조회한다', ['하나의 쿼리 안에서 JOIN을 여러 번 쓴다', 'INDEX를 너무 많이 만든다', 'GROUP BY 없이 집계 함수를 쓴다'],
          'N+1은 "목록 1번 + 각 항목마다 반복 조회 N번"의 패턴에서 생겨요.',
          '이름 그대로 "1번 + N번"이 어디서 나오는지 떠올려보세요.'
        ),
        () => makeChoice(
          'N+1 문제를 해결하는 가장 기본적인 방법은?',
          '반복해서 따로 조회하던 것을 JOIN으로 한 번에 가져온다', ['반복문을 더 빠른 언어로 다시 짠다', '쿼리마다 SAVEPOINT를 추가한다', 'WHERE 조건을 모두 없앤다'],
          '따로따로 조회하던 관련 데이터를 JOIN으로 한 번에 가져오면 쿼리 횟수가 크게 줄어요.',
          '이 유닛의 "해결하기" 부분에서 어떤 키워드를 썼는지 떠올려보세요.'
        ),
        () => makeChoice(
          '학생이 10,000명일 때 N+1 패턴으로 조회하면, JOIN 한 번으로 조회할 때보다 어떤 점이 나빠질까요?',
          '데이터베이스를 오가는 쿼리 왕복 횟수가 훨씬 많아져서 전체가 느려진다', ['결과 데이터가 아예 달라진다', 'JOIN보다 항상 더 정확한 결과가 나온다', '메모리를 전혀 쓰지 않게 된다'],
          '쿼리 하나하나는 빨라도, 수천 번 왕복하면 그 통신 비용이 쌓여서 전체 성능이 크게 나빠져요.',
          '쿼리 자체의 속도가 아니라 "횟수"가 문제라는 점을 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: 'students와 scores를 JOIN해서, 학생마다 따로 조회하지 않고 한 번의 쿼리로 id, name, score를 함께 조회하는 SQL을 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'SELECT students.id, students.name, scores.score\nFROM students\nJOIN scores ON students.id = scores.student_id;',
          accept: ['SELECT students.id, students.name, scores.score\nFROM students\nJOIN scores ON students.id = scores.student_id;'],
          why: 'JOIN으로 한 번에 이어붙이면 학생마다 반복 조회할 필요가 없어져요.',
          hint: 'students JOIN scores ON students.id = scores.student_id 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const n = randInt(5, 50);
        return {
          type: 'blank',
          q: `학생 목록 조회 쿼리 1번에, 학생 ${n}명마다 성적을 따로 조회하는 N+1 패턴을 JOIN 한 번으로 바꾸면, 실행되는 쿼리는 총 몇 번이 될까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: ['1'], placeholder: '숫자',
          why: `JOIN으로 한 번에 가져오면, 학생이 ${n}명이든 몇 명이든 쿼리는 딱 1번만 실행돼요.`,
          hint: 'JOIN으로 합치면 반복 조회 자체가 사라진다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'updateWithJoin',
      title: 'UPDATE ... FROM으로 다른 표 참고해서 수정하기',
      ready: true,
      summary: '다른 표의 값을 참고해서 조건에 맞는 행을 한 번에 수정하는 UPDATE ... FROM 문법을 배워요.',
      goals: ['UPDATE ... FROM으로 다른 표 참고하기', 'JOIN 조건을 WHERE에 적기', '실무에서 자주 쓰는 이유 이해하기'],
      blocks: [
        {
          h: '다른 표를 참고해서 수정하기: UPDATE ... FROM',
          html: `<p>기본 <code>UPDATE</code>는 그 표 안의 값만 보고 수정하지만, 다른 표의 값을 <b>참고해서</b> 수정해야 할 때도 많아요. SQLite는 <code>UPDATE 표 SET ... FROM 다른표 WHERE 연결조건</code> 형태로 이걸 지원해요.</p>`,
          code: {
            label: 'update_from.sql',
            lang: 'sql',
            src: `UPDATE scores
SET score = score + 5
FROM students
WHERE students.id = scores.student_id
  AND students.city = '서울';`,
            out: `1개 행이 수정됨`
          }
        },
        {
          h: '읽는 순서: 조건이 어떻게 연결될까요',
          html: `<p><code>FROM students</code>는 "students 표를 참고 자료로 함께 보겠다"는 뜻이고, <code>WHERE students.id = scores.student_id</code>는 "어느 학생 행과 어느 성적 행이 짝인지" 연결해주는 조건이에요. 그 다음 <code>AND students.city = '서울'</code>로 서울 학생만 골라내요.</p>`
        },
        {
          h: '왜 이 문법이 필요할까요',
          html: `<p>"서울에 사는 학생들의 점수만 5점씩 올려줘" 같은 요구는 <code>scores</code> 표만 봐서는 알 수 없어요(도시 정보는 <code>students</code>에 있으니까요). <code>UPDATE ... FROM</code>은 이렇게 <b>다른 표의 조건에 따라</b> 값을 수정해야 하는 실무 상황에서 자주 쓰여요.</p>`,
          after: `<div class="note"><b>참고</b> — MySQL은 <code>UPDATE a JOIN b ON ...</code> 문법을 쓰지만, SQLite는 표준 SQL에 가까운 <code>UPDATE ... FROM</code> 문법을 써요. 데이터베이스마다 문법이 조금씩 다르다는 점을 기억해두세요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>UPDATE scores SET score = score + 5</code> 뒤에, students 표를 참고 자료로 함께 보겠다고 알리는 키워드를 쓰세요.`,
          prefix: '', suffix: ' students WHERE students.id = scores.student_id;', accept: ['FROM', 'from'], placeholder: '키워드',
          why: '<code>UPDATE 표 SET ... FROM 다른표</code>로 다른 표를 함께 참고해서 수정할 수 있어요.',
          hint: 'SELECT에서 표를 가져올 때 쓰는 것과 똑같은 키워드예요.'
        }),
        () => makeChoice(
          '<code>UPDATE scores SET score = score + 5 FROM students WHERE students.id = scores.student_id AND students.city = \'서울\';</code>가 하는 일은?',
          '서울에 사는 학생의 성적만 5점씩 올린다', ['모든 학생의 성적을 5점씩 올린다', 'students 표의 age를 5씩 올린다', 'scores 표를 통째로 삭제한다'],
          'FROM students로 도시 정보를 참고하고, WHERE로 서울인 학생의 성적만 골라서 5점을 더해요.',
          '도시 정보가 어느 표에 있는지, 그리고 WHERE의 AND 조건이 무엇을 걸러내는지 생각해보세요.'
        ),
        () => makeChoice(
          'UPDATE ... FROM 문법이 필요한 상황은?',
          '수정할 조건이 수정하려는 표가 아니라 다른 표에 들어있을 때', ['그냥 WHERE 조건 없이 전체를 수정하고 싶을 때', 'INSERT를 대신하고 싶을 때', 'DELETE 대신 쓰고 싶을 때'],
          '수정 조건(예: 도시)이 students에 있고, 수정 대상(성적)은 scores에 있을 때, 두 표를 연결해서 조건을 판단해야 해요.',
          '이 유닛 예시에서 "도시"가 어느 표에 있었는지 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>UPDATE scores SET score = score + 5 FROM students</code> 뒤에, 어느 학생 행과 어느 성적 행이 짝인지 연결하는 조건을 시작하는 키워드를 쓰세요.`,
          prefix: '', suffix: ' students.id = scores.student_id;', accept: ['WHERE', 'where'], placeholder: '키워드',
          why: 'WHERE로 두 표를 연결할 조건(id = student_id)을 적어줘야 해요.',
          hint: '조건을 걸 때 항상 쓰는 그 키워드예요.'
        }),
        () => ({
          type: 'code',
          q: '부산에 사는 학생들의 성적을 3점씩 올리는 UPDATE ... FROM 문을 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: "UPDATE scores\nSET score = score + 3\nFROM students\nWHERE students.id = scores.student_id\n  AND students.city = '부산';",
          accept: ["UPDATE scores\nSET score = score + 3\nFROM students\nWHERE students.id = scores.student_id\n  AND students.city = '부산';"],
          why: 'FROM students로 도시 정보를 참고하고, WHERE로 부산인 학생만 골라 성적을 3점 올려요.',
          hint: "UPDATE scores SET score = score + 3 FROM students WHERE students.id = scores.student_id AND students.city = '부산'; 형태를 그대로 써보세요."
        }),
      ],
      boss: () => makeChoice(
        '서울 학생의 점수가 90점일 때, <code>UPDATE scores SET score = score + 5 FROM students WHERE students.id = scores.student_id AND students.city = \'서울\';</code>를 실행하면 그 학생의 점수는?',
        '95점', ['90점', '5점', '100점'],
        '서울 학생이라는 조건에 맞으니 score = score + 5가 적용돼서 90 + 5 = 95점이 돼요.',
        '조건에 맞는 행에 score + 5가 그대로 적용된다는 걸 생각해보세요.'
      )
    },
    {
      id: 'deleteWithSubquery',
      title: 'DELETE에서 서브쿼리로 조건 지정하기',
      ready: true,
      summary: '다른 표를 참고한 조건으로 행을 지워야 할 때, DELETE 안에 서브쿼리를 넣는 법을 배워요.',
      goals: ['DELETE에 IN + 서브쿼리 넣기', 'NOT IN으로 반대 조건 지우기', '지우기 전에 SELECT로 먼저 확인하는 습관'],
      blocks: [
        {
          h: '다른 표를 참고해서 지우기: DELETE ... WHERE IN (서브쿼리)',
          html: `<p>"부산에 사는 학생들의 성적을 지워줘"처럼, 지울 대상(<code>scores</code>)의 조건이 <b>다른 표</b>(<code>students</code>)에 있을 때는 <code>WHERE 열 IN (서브쿼리)</code> 형태로 지울 수 있어요.</p>`,
          code: {
            label: 'delete_in_subquery.sql',
            lang: 'sql',
            src: `DELETE FROM scores
WHERE student_id IN (
  SELECT id FROM students WHERE city = '부산'
);`,
            out: `1개 행이 삭제됨`
          }
        },
        {
          h: '반대 조건으로 지우기: NOT IN',
          html: `<p><code>NOT IN</code>을 쓰면 반대로, "성적이 없는 학생"처럼 <b>서브쿼리 결과에 없는</b> 것들을 대상으로 삼을 수 있어요.</p>`,
          code: {
            label: 'delete_not_in.sql',
            lang: 'sql',
            src: `DELETE FROM students
WHERE id NOT IN (
  SELECT student_id FROM scores
);`,
            out: `1개 행이 삭제됨`
          }
        },
        {
          h: '지우기 전에 먼저 SELECT로 확인하기',
          html: `<p>DELETE는 되돌리기 어려운 명령이에요. 같은 조건으로 <b>먼저 SELECT를 실행</b>해서 "정말 이 행들이 지워질 대상이 맞는지" 확인한 뒤 DELETE로 바꾸는 습관을 들이면 실수를 크게 줄일 수 있어요.</p>`,
          after: `<div class="note"><b>기억하기</b> — <code>SELECT * FROM scores WHERE student_id IN (...);</code>로 먼저 확인하고, 결과가 맞으면 그때 <code>DELETE FROM scores WHERE student_id IN (...);</code>로 바꾸세요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `부산에 사는 학생들의 성적을 지우려고 해요. 빈칸을 채우세요.`,
          prefix: `DELETE FROM scores WHERE student_id `, suffix: ` (SELECT id FROM students WHERE city = '부산');`, accept: ['IN', 'in'], placeholder: '키워드',
          why: '<code>IN (서브쿼리)</code>로, 서브쿼리 결과에 포함된 student_id만 골라 지워요.',
          hint: '여러 값 중 하나와 같은지 비교할 때 쓰는 그 키워드예요.'
        }),
        () => makeChoice(
          '<code>DELETE FROM students WHERE id NOT IN (SELECT student_id FROM scores);</code>가 지우는 대상은?',
          '성적표(scores)에 기록이 하나도 없는 학생', ['성적이 있는 모든 학생', '부산에 사는 학생', 'scores 표의 모든 행'],
          'NOT IN은 서브쿼리 결과에 없는 값을 찾으므로, scores에 student_id가 없는(=성적이 없는) 학생이 대상이에요.',
          '"IN"의 반대이니, 서브쿼리 결과에 "없는" 것을 찾는다는 점을 생각해보세요.'
        ),
        () => makeChoice(
          'DELETE 문을 실행하기 전에 권장되는 안전한 습관은?',
          '같은 조건으로 먼저 SELECT를 실행해서 지워질 대상을 확인한다', ['항상 WHERE 없이 먼저 실행해본다', 'DELETE 대신 무조건 DROP TABLE을 쓴다', '트랜잭션을 절대 쓰지 않는다'],
          '같은 WHERE 조건으로 SELECT를 먼저 실행해보면, DELETE가 지울 행이 예상과 맞는지 미리 확인할 수 있어요.',
          '"지우기 전에 먼저 본다"는 원칙을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `성적이 없는 학생을 찾아 지우려고 해요. IN의 반대 뜻으로 쓰는 키워드를 쓰세요.`,
          prefix: 'DELETE FROM students WHERE id ', suffix: ' (SELECT student_id FROM scores);', accept: ['NOT IN', 'not in'], placeholder: '키워드',
          why: 'NOT IN은 서브쿼리 결과에 없는 값을 찾아요. 그래서 성적 기록이 없는 학생을 찾을 수 있어요.',
          hint: 'IN 앞에 부정을 뜻하는 단어를 붙이세요.'
        }),
        () => ({
          type: 'code',
          q: '서울에 사는 학생들의 성적(scores)을 서브쿼리를 이용해 지우는 SQL을 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: "DELETE FROM scores\nWHERE student_id IN (\n  SELECT id FROM students WHERE city = '서울'\n);",
          accept: ["DELETE FROM scores\nWHERE student_id IN (\n  SELECT id FROM students WHERE city = '서울'\n);"],
          why: "WHERE student_id IN (SELECT id FROM students WHERE city = '서울')로, 서울 학생의 성적만 골라 지워요.",
          hint: "DELETE FROM scores WHERE student_id IN (SELECT id FROM students WHERE city = '서울'); 형태를 그대로 써보세요."
        }),
      ],
      boss: () => makeChoice(
        'students에 서연(id=3)만 scores에 성적 기록이 없을 때, <code>DELETE FROM students WHERE id NOT IN (SELECT student_id FROM scores);</code>를 실행하면 지워지는 학생은?',
        '서연', ['지수', '민준', '아무도 지워지지 않는다'],
        '서연만 scores에 기록이 없으니, NOT IN 조건에 맞는 유일한 학생이 서연이에요.',
        '서브쿼리(SELECT student_id FROM scores)에 없는 id를 가진 학생을 찾아보세요.'
      )
    },
    {
      id: 'temporaryTables',
      title: '임시 표: TEMP TABLE',
      ready: true,
      summary: '지금 세션에서만 쓰고 사라지는 임시 표를 만들어, 복잡한 작업의 중간 결과를 잠깐 담아두는 법을 배워요.',
      goals: ['CREATE TEMPORARY TABLE로 임시 표 만들기', '임시 표가 언제 사라지는지 이해하기', 'CTE와 무엇이 다른지 구분하기'],
      blocks: [
        {
          h: '잠깐만 쓰고 버릴 표: CREATE TEMPORARY TABLE',
          html: `<p><code>CREATE TEMPORARY TABLE</code>(줄여서 <code>CREATE TEMP TABLE</code>)은 일반 표처럼 데이터를 저장하지만, <b>지금 연결(세션)이 끝나면 자동으로 사라져요</b>. 여러 단계를 거쳐야 하는 복잡한 작업의 중간 결과를 잠깐 담아두기에 좋아요.</p>`,
          code: {
            label: 'temp_table_create.sql',
            lang: 'sql',
            src: `CREATE TEMP TABLE high_scorers AS
SELECT student_id FROM scores WHERE score >= 90;`
          }
        },
        {
          h: '임시 표도 진짜 표처럼 조회/수정하기',
          html: `<p>한 번 만들어두면, 그 뒤로는 <code>SELECT</code>·<code>INSERT</code>·<code>UPDATE</code> 등 <b>일반 표와 똑같이</b> 다룰 수 있어요. 다른 점은 딱 하나, 연결이 끊기면 사라진다는 거예요.</p>`,
          code: {
            label: 'temp_table_use.sql',
            lang: 'sql',
            src: `SELECT students.name
FROM students
JOIN high_scorers ON students.id = high_scorers.student_id;`
          }
        },
        {
          h: 'CTE(WITH 절)와 무엇이 다를까요',
          html: `<p><code>WITH</code>로 만드는 CTE는 <b>그 쿼리 한 번 실행하는 동안만</b> 존재하지만, <code>TEMP TABLE</code>은 <b>여러 쿼리에 걸쳐 계속</b> 남아있어요. 중간 결과를 한 번만 쓰면 CTE로 충분하지만, 여러 단계에서 반복해서 참고해야 한다면 TEMP TABLE이 더 편해요.</p>`,
          after: `<div class="note"><b>비유</b> — CTE가 "메모지에 잠깐 적어두고 바로 버리는 것"이라면, TEMP TABLE은 "이번 방문(세션) 동안만 쓰는 사물함"에 가까워요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `연결(세션)이 끝나면 자동으로 사라지는 표를 만드는 두 단어짜리 시작 키워드(TABLE 앞부분)를 쓰세요.`,
          prefix: 'CREATE ', suffix: ' TABLE high_scorers AS SELECT student_id FROM scores WHERE score >= 90;', accept: ['TEMPORARY', 'temporary', 'TEMP', 'temp'], placeholder: '키워드',
          why: '<code>CREATE TEMPORARY TABLE</code> (또는 줄여서 <code>CREATE TEMP TABLE</code>)로 세션이 끝나면 사라지는 표를 만들어요.',
          hint: '"임시의"라는 뜻의 영어 단어, 혹은 그 줄임말이에요.'
        }),
        () => makeChoice(
          'TEMP TABLE의 가장 큰 특징은?',
          '지금 연결(세션)이 끝나면 자동으로 사라진다', ['한 번도 수정할 수 없다', 'JOIN에 쓸 수 없다', '항상 다른 모든 사용자와 공유된다'],
          'TEMP TABLE은 일반 표처럼 쓰이지만, 세션이 끝나면 데이터베이스에서 자동으로 사라져요.',
          '"임시(TEMPORARY)"라는 이름이 뜻하는 바를 생각해보세요.'
        ),
        () => makeChoice(
          'TEMP TABLE과 CTE(WITH 절)의 가장 큰 차이는?',
          'CTE는 그 쿼리 한 번만 유효하고, TEMP TABLE은 여러 쿼리에 걸쳐 계속 남는다', ['TEMP TABLE은 SELECT를 쓸 수 없다', 'CTE는 세션이 끝나도 영구히 남는다', '둘은 완전히 똑같은 것이다'],
          'CTE는 한 쿼리 안에서만 임시로 존재하지만, TEMP TABLE은 세션이 끝날 때까지 여러 쿼리에서 반복해서 쓸 수 있어요.',
          '"한 번의 쿼리"와 "세션 전체" 중 어느 쪽이 더 오래 유지되는지 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `TEMP TABLE을 만든 뒤에는 SELECT, JOIN 등에서 어떻게 다뤄야 할까요? 빈칸에 알맞은 단어를 쓰세요. ("____ 표처럼 다룬다")`,
          prefix: '', suffix: '', accept: ['일반', '진짜'], placeholder: '단어',
          why: 'TEMP TABLE도 만들어진 뒤에는 일반(진짜) 표와 똑같이 SELECT/JOIN/UPDATE 등에 쓸 수 있어요.',
          hint: '"임시"의 반대 개념을 떠올려보세요.'
        }),
        () => ({
          type: 'code',
          q: '점수(score)가 90점 이상인 학생의 student_id만 모은 high_scorers라는 임시 표를 만드는 SQL을 작성하세요.',
          starter: '',
          placeholder: 'CREATE TEMP TABLE high_scorers AS\nSELECT student_id FROM scores WHERE score >= 90;',
          accept: ['CREATE TEMP TABLE high_scorers AS\nSELECT student_id FROM scores WHERE score >= 90;', 'CREATE TEMPORARY TABLE high_scorers AS\nSELECT student_id FROM scores WHERE score >= 90;'],
          why: 'CREATE TEMP TABLE 이름 AS 쿼리; 형태로 임시 표를 만들어요.',
          hint: 'CREATE TEMP TABLE high_scorers AS SELECT student_id FROM scores WHERE score >= 90;를 그대로 쓰세요.'
        }),
      ],
      boss: () => makeChoice(
        '복잡한 리포트를 만들면서, 같은 중간 결과를 여러 단계의 쿼리에서 반복해서 참고해야 해요. CTE와 TEMP TABLE 중 어느 쪽이 더 적합할까요?',
        'TEMP TABLE — 여러 쿼리에 걸쳐 계속 남아있기 때문에', ['CTE — 세션이 끝나야만 결과가 만들어지기 때문에', '둘 다 여러 쿼리에서 쓸 수 없어서 의미 없다', 'VIEW만 유일하게 가능하다'],
        '여러 쿼리에 걸쳐 반복 참고해야 한다면, 한 쿼리에서만 유효한 CTE보다 세션 동안 계속 남는 TEMP TABLE이 더 적합해요.',
        '"한 번의 쿼리"만 유지되는 것과 "세션 내내" 유지되는 것 중 어느 게 필요한지 생각해보세요.'
      )
    },
    {
      id: 'erRelationshipTypes',
      title: '관계 모델링: 1:N과 N:M',
      ready: true,
      summary: '한 학생이 성적을 여러 개 가지는 1:N 관계와, 중간 표(junction table)로 표현하는 N:M 관계를 배워요.',
      goals: ['1:N(일대다) 관계 이해하기', 'N:M(다대다) 관계가 왜 표 하나로 안 되는지 알기', '중간 표(junction table)로 N:M 표현하기'],
      blocks: [
        {
          h: '한 명이 여러 개를 가지는 관계: 1:N',
          html: `<p>학생 한 명은 성적을 <b>여러 개</b> 가질 수 있지만, 성적 한 행은 학생 <b>딱 한 명</b>에만 속해요. 이런 관계를 <b>1:N(일대다)</b> 관계라고 불러요. <code>scores.student_id</code>가 <code>students.id</code>를 가리키는 <code>FOREIGN KEY</code>로 이 관계를 표현해요.</p>`,
          code: {
            label: 'one_to_many.sql',
            lang: 'sql',
            src: `-- 학생(1) : 성적(N) 관계
CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE scores (
  id INTEGER PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  score INTEGER
);`
          }
        },
        {
          h: '여러 명이 여러 개를 함께 가지는 관계: N:M',
          html: `<p>"학생 한 명이 여러 과목을 듣고, 한 과목도 여러 학생이 들을 수 있다"처럼 <b>양쪽 다 여러 개</b>를 가질 수 있는 관계를 <b>N:M(다대다)</b> 관계라고 해요. 이건 <code>students</code>나 <code>courses</code> 표에 <code>FOREIGN KEY</code>를 하나만 추가하는 걸로는 표현할 수 없어요(어느 쪽에 넣어도 "여러 개"를 저장할 자리가 없으니까요).</p>`
        },
        {
          h: '중간 표로 N:M 표현하기: junction table',
          html: `<p>N:M 관계는 두 표 사이에 <b>중간 표(junction table, 연결 표)</b>를 하나 더 만들어서 해결해요. 이 중간 표는 양쪽의 id를 각각 FOREIGN KEY로 가지는 행 하나하나가 "이 학생이 이 과목을 듣는다"는 관계 하나를 나타내요.</p>`,
          code: {
            label: 'many_to_many.sql',
            lang: 'sql',
            src: `CREATE TABLE courses (id INTEGER PRIMARY KEY, name TEXT);

-- 중간 표(junction table): 학생과 과목을 잇는 관계 하나하나를 행으로 저장
CREATE TABLE enrollments (
  student_id INTEGER REFERENCES students(id),
  course_id INTEGER REFERENCES courses(id),
  PRIMARY KEY (student_id, course_id)
);`
          },
          after: `<div class="note"><b>비유</b> — 1:N은 "한 부모 아래 여러 자식"이라면, N:M은 "여러 사람이 여러 동아리에 겹쳐서 가입하는 것"과 비슷해요. 그래서 "누가 어느 동아리에 가입했는지"를 적어두는 명단(중간 표)이 하나 더 필요해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '학생 한 명이 성적을 여러 개 가질 수 있는 students-scores 관계는 어떤 관계일까요?',
          '1:N(일대다)', ['N:M(다대다)', '1:1(일대일)', '관계가 아니다'],
          '학생(1) 쪽은 하나지만 성적(N) 쪽은 여러 개일 수 있어서 1:N 관계예요.',
          '학생 한 명 vs 성적 여러 개, 어느 쪽이 "여러 개"인지 생각해보세요.'
        ),
        () => makeChoice(
          '"학생 한 명이 여러 과목을 듣고, 한 과목도 여러 학생이 들을 수 있다"는 관계는?',
          'N:M(다대다)', ['1:N(일대다)', '1:1(일대일)', 'FOREIGN KEY 없이 표현 가능한 관계'],
          '양쪽 다 "여러 개"를 가질 수 있으니 N:M(다대다) 관계예요.',
          '학생 쪽도, 과목 쪽도 둘 다 여러 개일 수 있다는 점에 주목해보세요.'
        ),
        () => makeChoice(
          'N:M 관계를 표현하려면 왜 중간 표(junction table)가 필요할까요?',
          '학생이나 과목 표에 FOREIGN KEY를 하나만 넣어서는 "여러 개"의 관계를 저장할 자리가 없기 때문에', ['성능을 높이기 위한 장식용 표일 뿐이라서', 'PRIMARY KEY를 만들 수 없어서', '중간 표가 있어야 SELECT를 쓸 수 있어서'],
          '학생 표에 course_id 하나만 넣으면 그 학생이 들을 수 있는 과목이 하나로 제한돼요. 여러 관계를 저장하려면 관계 하나하나를 행으로 담는 중간 표가 필요해요.',
          '한 열에는 값을 하나만 넣을 수 있다는 점을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `학생과 과목의 N:M 관계를 나타내는 중간 표(enrollments)는, 무엇과 무엇을 각각 FOREIGN KEY로 가져야 할까요? 빈칸에 두 값을 쉼표로 구분해 쓰세요. (예: student_id, course_id)`,
          prefix: '', suffix: '', accept: ['student_id, course_id', 'student_id,course_id'], placeholder: 'a_id, b_id',
          why: '중간 표는 양쪽 표의 id를 각각 FOREIGN KEY로 가져서, 그 조합 하나하나가 관계 하나를 뜻해요.',
          hint: '학생 쪽 id와 과목 쪽 id, 두 개를 나란히 떠올려보세요.'
        }),
        () => ({
          type: 'code',
          q: 'student_id와 course_id를 FOREIGN KEY로 가지고, 둘을 합쳐 PRIMARY KEY로 삼는 enrollments 중간 표를 만드는 SQL을 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'CREATE TABLE enrollments (\n  student_id INTEGER REFERENCES students(id),\n  course_id INTEGER REFERENCES courses(id),\n  PRIMARY KEY (student_id, course_id)\n);',
          accept: ['CREATE TABLE enrollments (\n  student_id INTEGER REFERENCES students(id),\n  course_id INTEGER REFERENCES courses(id),\n  PRIMARY KEY (student_id, course_id)\n);'],
          why: '두 FOREIGN KEY를 열로 넣고, 그 조합을 PRIMARY KEY (student_id, course_id)로 지정해서 같은 조합이 중복 저장되지 않게 해요.',
          hint: '두 FOREIGN KEY 열을 만들고, 마지막 줄에 PRIMARY KEY (student_id, course_id)를 추가하세요.'
        }),
      ],
      boss: () => makeChoice(
        '"한 학생은 여러 동아리에 가입할 수 있고, 한 동아리도 여러 학생을 받을 수 있다"를 표로 설계하려고 해요. 가장 알맞은 방법은?',
        'students와 clubs 사이에 student_id, club_id를 가진 중간 표(junction table)를 만든다', ['students 표에 club_id 열 하나만 추가한다', 'clubs 표에 student_id 열 하나만 추가한다', '표를 하나로 합쳐서 모든 정보를 다 담는다'],
        '양쪽 다 "여러 개"를 가질 수 있는 N:M 관계이므로, 두 id를 함께 담는 중간 표가 필요해요.',
        '학생 표나 동아리 표에 열을 하나만 추가해서는 "여러 개"를 담을 자리가 없다는 걸 떠올려보세요.'
      )
    },
    {
      id: 'nullifFunction',
      title: 'NULLIF로 특정 값을 NULL로 바꾸기',
      ready: true,
      summary: '두 값이 같으면 NULL로 바꿔주는 NULLIF로, 0으로 나누기 같은 위험한 상황을 안전하게 막는 법을 배워요.',
      goals: ['NULLIF(값1, 값2) 동작 이해하기', '0으로 나누기 오류 막기', 'COALESCE와 함께 조합해서 쓰기'],
      blocks: [
        {
          h: '두 값이 같으면 NULL로: NULLIF',
          html: `<p><code>NULLIF(값1, 값2)</code>는 두 값이 <b>같으면 NULL</b>을, 다르면 <b>값1을 그대로</b> 돌려줘요. "특정 값이면 없는 것으로 취급하고 싶을 때" 유용해요.</p>`,
          code: {
            label: 'nullif_basic.sql',
            lang: 'sql',
            src: `SELECT NULLIF(score, 0) FROM scores;
-- score가 0이면 NULL, 아니면 원래 값 그대로`
          }
        },
        {
          h: '실무에서 가장 흔한 쓰임: 0으로 나누기 막기',
          html: `<p>어떤 값을 <code>0</code>으로 나누면 오류가 나거나 이상한 값이 나올 수 있어요. <code>나눌값 / NULLIF(나누는값, 0)</code>처럼 쓰면, 나누는 값이 0일 때 <b>NULL</b>이 되어 <b>안전하게</b> "값 없음"으로 처리돼요.</p>`,
          code: {
            label: 'nullif_division.sql',
            lang: 'sql',
            src: `SELECT student_id, score / NULLIF(attempt_count, 0) AS avg_per_attempt
FROM scores;`
          }
        },
        {
          h: 'COALESCE와 함께 쓰기',
          html: `<p><code>NULLIF</code>로 만든 NULL을, 다시 <code>COALESCE</code>로 기본값을 채우면 "0이면 대신 이 값을 보여줘" 같은 흐름도 만들 수 있어요.</p>`,
          code: {
            label: 'nullif_coalesce.sql',
            lang: 'sql',
            src: `SELECT COALESCE(NULLIF(score, 0), -1) AS score_or_default
FROM scores;`
          },
          after: `<div class="note"><b>기억하기</b> — COALESCE는 "NULL이면 기본값", NULLIF는 "이 값이면 NULL로"예요. 서로 반대 방향으로 짝을 이루는 함수라고 생각하면 기억하기 쉬워요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const same = Math.random() < 0.5;
          const a = randInt(1, 20);
          const b = same ? a : a + randInt(1, 10);
          return {
            type: 'blank',
            q: `<code>NULLIF(${a}, ${b})</code>의 결과는? 같으면 NULL, 다르면 첫 번째 값을 숫자로 쓰세요.`,
            prefix: '', suffix: '', accept: [same ? 'NULL' : String(a)], placeholder: 'NULL 또는 숫자',
            why: same ? `두 값이 ${a}로 같아서 NULL이 돼요.` : `두 값이 달라서(${a} ≠ ${b}) 첫 번째 값 ${a}가 그대로 나와요.`,
            hint: '두 값이 같은지 다른지부터 확인해보세요.'
          };
        },
        () => makeChoice(
          '<code>NULLIF(값1, 값2)</code>가 NULL을 돌려주는 경우는?',
          '값1과 값2가 서로 같을 때', ['값1이 0일 때만', '값2가 NULL일 때만', '항상 NULL을 돌려준다'],
          'NULLIF는 두 값이 정확히 같을 때만 NULL을 돌려주고, 다르면 값1을 그대로 돌려줘요.',
          '"두 값이 같다면"이라는 조건에 집중해보세요.'
        ),
        () => makeChoice(
          '<code>score / NULLIF(attempt_count, 0)</code>처럼 쓰는 이유는?',
          'attempt_count가 0일 때 나누기 오류 대신 NULL이 되게 하려고', ['항상 결과를 0으로 만들려고', 'score를 무조건 두 배로 만들려고', 'attempt_count를 삭제하려고'],
          'attempt_count가 0이면 NULLIF가 NULL로 바꿔줘서, 0으로 나누는 대신 안전하게 NULL이 돼요.',
          '0으로 나누면 어떤 문제가 생기는지 떠올려보고, NULLIF가 그걸 어떻게 막는지 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `score가 0이면 NULL로 바꾸는 표현을 완성하세요.`,
          prefix: '', suffix: '(score, 0)', accept: ['NULLIF', 'nullif'], placeholder: '함수 이름',
          why: 'NULLIF(score, 0)은 score가 0과 같으면 NULL을, 아니면 score 값을 그대로 돌려줘요.',
          hint: '"NULL로 만든다(NULL if)"는 뜻을 그대로 담은 이름이에요.'
        }),
        () => ({
          type: 'code',
          q: 'scores 표에서 score가 0이면 NULL로, 아니면 원래 값을 보여주는 SQL을 작성하세요.',
          starter: '',
          placeholder: 'SELECT NULLIF(score, 0) FROM scores;',
          accept: ['SELECT NULLIF(score, 0) FROM scores;'],
          why: 'NULLIF(score, 0)로 0인 값만 NULL로 바꿔요.',
          hint: 'SELECT NULLIF(score, 0) FROM scores;를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const score = pick([0, 85, 90]);
        return {
          type: 'blank',
          q: `<code>score</code>가 ${score}일 때, <code>COALESCE(NULLIF(score, 0), -1)</code>의 결과는? 숫자로 쓰세요.`,
          prefix: '', suffix: '', accept: [score === 0 ? '-1' : String(score)], placeholder: '숫자',
          why: score === 0 ? `score가 0이라 NULLIF가 NULL로 바꾸고, COALESCE가 그 NULL을 기본값 -1로 채워요.` : `score가 0이 아니라서(${score}) NULLIF는 그대로 ${score}를 돌려주고, COALESCE도 NULL이 아니니 원래 값을 그대로 둬요.`,
          hint: '먼저 NULLIF가 무엇을 돌려주는지 확인한 뒤, COALESCE가 그 결과를 어떻게 처리하는지 생각해보세요.'
        };
      }
    },
    {
      id: 'updatableViews',
      title: '수정 가능한 뷰: Updatable View',
      ready: true,
      summary: '단순한 구조의 VIEW는 SELECT뿐 아니라 INSERT/UPDATE/DELETE도 가능하다는 것과 그 한계를 배워요.',
      goals: ['단순한 VIEW는 수정도 가능하다는 것 알기', '어떤 VIEW가 수정 가능한지 이해하기', '복잡한 VIEW의 한계 이해하기'],
      blocks: [
        {
          h: 'VIEW인데 UPDATE가 된다고요?',
          html: `<p>대부분 VIEW는 조회(SELECT)용으로만 생각하지만, <b>표 하나만 가져오는 단순한 VIEW</b>는 실제로는 <code>UPDATE</code>·<code>DELETE</code>·<code>INSERT</code>도 할 수 있어요. 데이터베이스가 그 수정을 <b>원본 표</b>에 그대로 반영해주기 때문이에요.</p>`,
          code: {
            label: 'updatable_view.sql',
            lang: 'sql',
            src: `CREATE VIEW seoul_students AS
SELECT * FROM students WHERE city = '서울';

UPDATE seoul_students SET age = 18 WHERE name = '지수';
-- 실제로는 students 표의 '지수' 행이 수정됨`
          }
        },
        {
          h: '어떤 VIEW가 "수정 가능"할까요',
          html: `<p>표 <b>하나만</b> 그대로 가져오고, <code>GROUP BY</code>·집계 함수·<code>DISTINCT</code>·여러 표의 <code>JOIN</code> 같은 게 없는 <b>단순한 VIEW</b>일수록 수정 가능해요. 어떤 행을 바꿔야 할지 데이터베이스가 <b>명확하게 원본과 연결</b>할 수 있어야 하기 때문이에요.</p>`
        },
        {
          h: '복잡한 VIEW는 수정할 수 없어요',
          html: `<p>여러 표를 JOIN했거나, <code>COUNT</code>/<code>SUM</code> 같은 집계가 들어간 VIEW는 "이 한 행을 수정하면 원본의 어느 행을 바꿔야 하는지" <b>알 수 없어서</b> 수정이 안 돼요. 이럴 때 수정이 꼭 필요하면 <code>INSTEAD OF</code> 트리거로 직접 규칙을 정해줘야 해요.</p>`,
          after: `<div class="note"><b>기억하기</b> — "표 하나 + 조건만 있는 단순한 VIEW"는 수정 가능, "여러 표 JOIN + 집계가 있는 VIEW"는 조회 전용이라고 기억해두면 편해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>CREATE VIEW seoul_students AS SELECT * FROM students WHERE city = \'서울\';</code>처럼 표 하나만 가져온 단순한 VIEW에 대해 옳은 것은?',
          'UPDATE/DELETE/INSERT를 실행하면 원본 students 표에 그대로 반영된다', ['SELECT만 가능하고 다른 명령은 전혀 안 된다', 'VIEW를 조회할 때마다 새로운 표가 만들어진다', '원본 표와는 완전히 분리되어 아무 영향도 주지 않는다'],
          '표 하나만 그대로 가져오는 단순한 VIEW는 원본과 명확히 연결되어 있어서, 수정하면 원본 표가 실제로 바뀌어요.',
          '"단순한 VIEW"라는 조건에 주목해보세요.'
        ),
        () => makeChoice(
          'VIEW가 수정 가능하려면 어떤 조건에 가까워야 할까요?',
          '표 하나만 그대로 가져오고, JOIN이나 집계 함수가 없어야 한다', ['반드시 인덱스가 있어야 한다', '반드시 TRIGGER가 함께 있어야 한다', 'WHERE 조건이 전혀 없어야 한다'],
          '단순히 표 하나를 그대로 보여주는 VIEW여야, 어떤 원본 행을 수정할지 명확해요.',
          '"명확하게 원본 행과 연결될 수 있는가"를 기준으로 생각해보세요.'
        ),
        () => makeChoice(
          '여러 표를 JOIN하거나 COUNT 같은 집계가 들어간 VIEW를 수정할 수 없는 이유는?',
          '결과의 한 행이 원본의 어느 행(들)에 해당하는지 명확하게 알 수 없어서', ['VIEW 이름이 너무 길어서', 'JOIN은 원래 느려서', '집계 함수는 원래 오류를 자주 내서'],
          'JOIN이나 집계가 섞이면, 결과의 한 행을 수정했을 때 원본의 어느 행을 어떻게 바꿔야 할지 애매해져서 자동으로 수정을 반영할 수 없어요.',
          '결과 행과 원본 행 사이의 "1:1 대응"이 되는지를 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `복잡한 VIEW(JOIN/집계 포함)에서도 수정이 꼭 필요할 때, 직접 규칙을 정의할 수 있게 해주는 트리거 종류를 쓰세요. (예: ${'{이것}'} 트리거)`,
          prefix: '', suffix: '', accept: ['INSTEAD OF', 'instead of'], placeholder: '키워드',
          why: 'INSTEAD OF 트리거를 쓰면, VIEW에 대한 UPDATE/INSERT/DELETE가 일어날 때 어떻게 처리할지 직접 정의할 수 있어요.',
          hint: '"~ 대신에"라는 뜻의 두 단어짜리 영어 표현이에요.'
        }),
        () => ({
          type: 'code',
          q: 'seoul_students 뷰(students 표에서 city가 서울인 행만 보여주는 단순한 뷰)를 통해, 이름이 "지수"인 학생의 age를 18로 바꾸는 UPDATE문을 작성하세요.',
          starter: '',
          placeholder: "UPDATE seoul_students SET age = 18 WHERE name = '지수';",
          accept: ["UPDATE seoul_students SET age = 18 WHERE name = '지수';"],
          why: '단순한 VIEW는 표처럼 UPDATE를 실행할 수 있고, 그 결과가 원본 students 표에 반영돼요.',
          hint: "UPDATE seoul_students SET age = 18 WHERE name = '지수'; 형태를 그대로 써보세요."
        }),
      ],
      boss: () => makeChoice(
        '<code>CREATE VIEW city_counts AS SELECT city, COUNT(*) FROM students GROUP BY city;</code>라는 VIEW에 <code>UPDATE city_counts SET count = 100 WHERE city = \'서울\';</code>를 실행하면 어떻게 될까요?',
        'GROUP BY와 집계 함수가 있어서 수정할 수 없어 오류가 난다', ['서울 학생 수가 실제로 100명으로 바뀐다', 'students 표의 모든 행이 삭제된다', '아무 오류 없이 조용히 무시된다'],
        '집계(COUNT)와 GROUP BY가 있는 VIEW는 결과 행이 원본의 어느 행에 대응하는지 알 수 없어서 수정이 불가능해요.',
        '이 VIEW가 "단순한 VIEW"의 조건(표 하나 + 집계 없음)을 만족하는지 확인해보세요.'
      )
    },
    {
      id: 'windowFrameClause',
      title: '윈도우 프레임: ROWS BETWEEN',
      ready: true,
      summary: '윈도우 함수가 계산에 포함할 행의 범위를 직접 정하는 ROWS BETWEEN(프레임)으로, 누적 합계 같은 값을 구하는 법을 배워요.',
      goals: ['프레임(frame)이 무엇인지 이해하기', 'ROWS BETWEEN으로 범위 정하기', '누적 합계(running total) 만들기'],
      blocks: [
        {
          h: '윈도우 함수가 보는 범위: 프레임(frame)',
          html: `<p><code>ROW_NUMBER()</code>나 <code>RANK()</code>는 전체 정렬 순서를 보지만, <code>SUM()</code> 같은 함수를 윈도우로 쓸 때는 "지금 행 기준으로 <b>어디부터 어디까지</b> 더할지" 범위를 정해야 할 때가 있어요. 이 범위를 <b>프레임(frame)</b>이라고 불러요.</p>`,
          code: {
            label: 'frame_default.sql',
            lang: 'sql',
            src: `SELECT student_id, score,
  SUM(score) OVER (ORDER BY student_id) AS running_total
FROM scores;`
          }
        },
        {
          h: '범위를 직접 정하기: ROWS BETWEEN',
          html: `<p><code>ROWS BETWEEN 시작 AND 끝</code>으로 정확한 범위를 정할 수 있어요. <code>UNBOUNDED PRECEDING</code>은 "맨 처음부터", <code>CURRENT ROW</code>는 "지금 행까지"를 뜻해요.</p>`,
          code: {
            label: 'rows_between.sql',
            lang: 'sql',
            src: `SELECT student_id, score,
  SUM(score) OVER (
    ORDER BY student_id
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM scores;`
          }
        },
        {
          h: '누적 합계(running total) 만들기',
          html: `<p>위 쿼리는 "지금 행까지의 누적 합계"를 계산해요. 첫 행은 자기 점수만, 두 번째 행은 첫 번째+두 번째 점수 합, 이런 식으로 <b>순서대로 쌓여가는 값</b>을 만들 수 있어요.</p>`,
          after: `<div class="note"><b>참고</b> — <code>ORDER BY</code>만 쓰고 <code>ROWS BETWEEN</code>을 생략해도, 대부분의 데이터베이스는 기본으로 "맨 처음부터 지금 행까지"를 프레임으로 써요. 그래서 첫 번째 예시와 두 번째 예시의 결과가 같아요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `윈도우 함수가 계산에 포함할 행의 범위를 직접 정할 때 쓰는 절을 쓰세요. (예: ${'{이것}'} UNBOUNDED PRECEDING AND CURRENT ROW)`,
          prefix: '', suffix: '', accept: ['ROWS BETWEEN', 'rows between'], placeholder: '키워드',
          why: '<code>ROWS BETWEEN 시작 AND 끝</code>으로 윈도우 함수가 볼 행의 범위(프레임)를 정해요.',
          hint: '"행(ROWS)"과 "~사이(BETWEEN)"가 합쳐진 두 단어예요.'
        }),
        () => makeChoice(
          '<code>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>가 뜻하는 범위는?',
          '맨 처음 행부터 지금 행까지', ['지금 행부터 맨 마지막 행까지', '지금 행 바로 앞뒤 한 행씩만', '전체 표 전부(정렬 무관)'],
          'UNBOUNDED PRECEDING은 "맨 처음부터", CURRENT ROW는 "지금 행까지"를 뜻해서, 둘을 합치면 처음부터 지금까지의 누적 범위예요.',
          '"PRECEDING(앞선)"과 "CURRENT ROW(지금 행)"이라는 단어 뜻을 생각해보세요.'
        ),
        () => {
          const scores = [80, 90, 70];
          const running = scores.map((_, i) => scores.slice(0, i + 1).reduce((a, b) => a + b, 0));
          const idx = randInt(0, scores.length - 1);
          return {
            type: 'blank',
            q: `student_id 순서대로 점수가 ${scores.join(', ')}일 때, <code>SUM(score) OVER (ORDER BY student_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)</code>의 ${idx + 1}번째 행 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(running[idx])], placeholder: '숫자',
            why: `${idx + 1}번째 행까지의 누적 합계는 ${scores.slice(0, idx + 1).join(' + ')} = ${running[idx]}이에요.`,
            hint: '맨 처음 행부터 그 행까지의 점수를 순서대로 다 더해보세요.'
          };
        },
        () => makeChoice(
          'ORDER BY만 쓰고 ROWS BETWEEN을 생략하면 어떻게 될까요?',
          '기본값으로 "맨 처음부터 지금 행까지"가 프레임으로 쓰인다', ['오류가 나서 실행이 안 된다', '전체 표가 항상 프레임이 된다', '프레임 없이 각 행이 자기 자신만 본다'],
          'ORDER BY만 있고 프레임을 생략하면, 대부분 "맨 처음부터 지금 행까지"가 기본 프레임으로 쓰여요.',
          '생략했을 때의 기본 동작이 누적 합계와 같은 결과를 낸다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: 'student_id 순서대로 score의 누적 합계(running_total)를 ROWS BETWEEN을 이용해 구하는 SQL을 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'SELECT student_id, score,\n  SUM(score) OVER (\n    ORDER BY student_id\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_total\nFROM scores;',
          accept: ['SELECT student_id, score,\n  SUM(score) OVER (\n    ORDER BY student_id\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) AS running_total\nFROM scores;'],
          why: 'ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW로 맨 처음부터 지금 행까지 누적해서 더해요.',
          hint: 'SUM(score) OVER (ORDER BY student_id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const scores = [90, 85, 60, 100];
        const running = scores.map((_, i) => scores.slice(0, i + 1).reduce((a, b) => a + b, 0));
        return {
          type: 'blank',
          q: `student_id 순서대로 점수가 ${scores.join(', ')}일 때, 누적 합계(ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)의 마지막(4번째) 행 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(running[3])], placeholder: '숫자',
          why: `맨 처음부터 마지막 행까지 다 더하면 ${scores.join(' + ')} = ${running[3]}이에요.`,
          hint: '마지막 행의 누적 합계는 결국 전체 합계와 같다는 걸 떠올려보세요.'
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
