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
