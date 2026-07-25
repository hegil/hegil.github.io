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
    }]
};
