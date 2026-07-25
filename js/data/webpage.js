/* HTML/CSS 강의·문제 데이터 — 단원을 추가하려면 units 배열에 항목을 넣으면 됩니다. */
COURSES.webpage = {
    name: 'HTML/CSS',
    tagline: '웹페이지의 뼈대(HTML)와 옷(CSS)을 만드는 언어',
    units: [{
      id: 'basics',
      title: '태그와 스타일 기초',
      ready: true,
      summary: '웹페이지가 어떻게 만들어지는지, 태그로 뼈대를 세우고 CSS로 꾸미는 방법을 아주 쉽게 배워요.',
      goals: ['태그 열고 닫기', '자주 쓰는 태그', 'CSS 문법', '색과 크기 바꾸기'],
      blocks: [
        {
          h: 'HTML은 웹페이지의 "뼈대"예요',
          html: `<p>웹페이지는 <b>태그</b>라는 것들로 이루어져 있어요. 태그는 보통 여는 태그 <code>&lt;p&gt;</code>와 닫는 태그 <code>&lt;/p&gt;</code>가 짝을 이루고, 그 사이에 내용이 들어가요.</p>
                 <p>마치 상자를 열고(여는 태그) 물건을 넣은 다음 상자를 닫는(닫는 태그) 것과 같아요. 닫는 태그는 이름 앞에 슬래시(<code>/</code>)가 붙어요.</p>`,
          code: {
            label: 'page.html',
            lang: 'html',
            src: `<h1>나의 첫 웹페이지</h1>
<p>안녕하세요! 이건 문단이에요.</p>`,
            preview: `<style>body{font-family:sans-serif;margin:14px;color:#222}</style><h1>나의 첫 웹페이지</h1><p>안녕하세요! 이건 문단이에요.</p>`
          }
        },
        {
          h: '자주 쓰는 태그들',
          html: `<table>
                   <tr><th>태그</th><th>뜻</th></tr>
                   <tr><td><code>&lt;h1&gt;</code></td><td>가장 큰 제목 (h2, h3로 갈수록 작아져요)</td></tr>
                   <tr><td><code>&lt;p&gt;</code></td><td>문단, 글 덩어리 하나</td></tr>
                   <tr><td><code>&lt;ul&gt;</code>, <code>&lt;li&gt;</code></td><td>목록과 목록 항목</td></tr>
                   <tr><td><code>&lt;a&gt;</code></td><td>눌러서 다른 페이지로 이동하는 링크</td></tr>
                   <tr><td><code>&lt;img&gt;</code></td><td>그림(이미지)을 보여줌</td></tr>
                 </table>
                 <p><code>&lt;a href="주소"&gt;글자&lt;/a&gt;</code>처럼, 태그는 <code>속성="값"</code> 형태로 추가 정보를 가질 수 있어요.</p>`
        },
        {
          h: 'CSS는 웹페이지를 꾸미는 "옷"이에요',
          html: `<p>CSS는 <code>선택자 { 속성: 값; }</code> 형태로 씁니다. "이 태그(선택자)를, 이렇게(속성: 값) 꾸며줘"라는 뜻이에요.</p>
                 <p>글자 색을 바꾸려면 <code>color</code>, 배경색은 <code>background-color</code>, 글자 크기는 <code>font-size</code>를 씁니다.</p>`,
          code: {
            label: 'style.css',
            lang: 'css',
            src: `p {
  color: royalblue;
  font-size: 20px;
}

.box {
  background-color: khaki;
  padding: 10px;
  border-radius: 8px;
}`,
            preview: `<style>body{font-family:sans-serif;margin:14px}p{color:royalblue;font-size:20px}.box{background-color:khaki;padding:10px;border-radius:8px}</style><p>이 글자는 파란색이고 조금 커요!</p><div class="box">이 박스는 CSS로 배경색을 칠했어요.</div>`
          },
          after: `<div class="note"><b>팁</b> — <code>.box</code>처럼 마침표로 시작하면 <code>class="box"</code>를 가진 태그를 선택한다는 뜻이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const tags = { h1: '큰 제목', p: '문단(글 덩어리)', li: '목록 항목', a: '링크(눌러서 이동)', img: '그림(이미지)' };
          const keys = Object.keys(tags);
          const target = pick(keys);
          const distractors = shuffle(keys.filter(k => k !== target)).slice(0, 3);
          return makeChoice(
            `"${tags[target]}"을(를) 나타내는 태그는 무엇일까요?`,
            `<code>&lt;${target}&gt;</code>`, distractors.map(k => `<code>&lt;${k}&gt;</code>`),
            `<code>&lt;${target}&gt;</code> 태그가 ${tags[target]}을(를) 나타내요.`,
            '표에서 배운 자주 쓰는 태그들을 떠올려보세요.'
          );
        },
        () => {
          const tag = pick(['p', 'h1', 'li', 'span', 'div']);
          const word = pick(['안녕하세요', '반갑습니다', '환영합니다', '좋은 하루예요']);
          return {
            type: 'blank',
            q: `열었던 태그를 올바르게 닫으려고 해요. 빈칸에 태그 이름을 쓰세요.`,
            prefix: `<${tag}>${word}</`, suffix: `>`, accept: [tag], placeholder: '태그 이름',
            why: `여는 태그가 <code>&lt;${tag}&gt;</code>이면 닫는 태그는 <code>&lt;/${tag}&gt;</code>처럼 이름 앞에 슬래시(/)를 붙여요.`,
            hint: '닫는 태그는 여는 태그와 이름이 똑같아요.'
          };
        },
        () => {
          const color = pick(['red', 'blue', 'green', 'orange', 'purple']);
          const ko = { red: '빨간색', blue: '파란색', green: '초록색', orange: '주황색', purple: '보라색' }[color];
          return {
            type: 'blank',
            q: `문단의 글자 색을 ${ko}으로 바꾸려고 해요. 빈칸에 알맞은 CSS 속성 이름을 쓰세요.`,
            prefix: 'p { ', suffix: `: ${color}; }`, accept: ['color'], placeholder: '속성 이름',
            why: `글자 색을 바꾸는 CSS 속성은 <code>color</code>예요. (배경색은 <code>background-color</code>예요!)`,
            hint: '배경색이 아니라 "글자" 색이에요. 짧은 영어 단어 하나예요.'
          };
        },
        () => {
          const name = pick(['box', 'title', 'card', 'menu']);
          const kind = pick(['class', 'id']);
          const answer = (kind === 'class' ? '.' : '#') + name;
          const wrongPrefix = kind === 'class' ? '#' : '.';
          return makeChoice(
            `${kind === 'class' ? '클래스' : '아이디'} 이름이 "${name}"인 요소를 선택하는 CSS 선택자는?`,
            `<code>${answer}</code>`,
            [`<code>${wrongPrefix}${name}</code>`, `<code>${name}</code>`, `<code>*${name}</code>`],
            `클래스는 마침표(<code>.</code>), 아이디는 샵(<code>#</code>)을 이름 앞에 붙여서 선택해요.`,
            '클래스는 마침표(.), 아이디는 샵(#)이에요.'
          );
        },
        () => {
          const url = pick(['about.html', 'contact.html', 'shop.html', 'home.html']);
          return {
            type: 'blank',
            q: `이 링크를 누르면 "${url}"로 이동하도록 빈칸을 채우세요.`,
            prefix: '<a href="', suffix: `">이동</a>`, accept: [url], placeholder: '주소',
            why: `<code>href</code> 속성에 이동할 주소를 큰따옴표로 감싸서 넣어요.`,
            hint: '큰따옴표 안에 있는 그 주소를 그대로 쓰면 돼요.'
          };
        },
        () => ({
          type: 'code',
          preview: true,
          q: '제목 <code>&lt;h1&gt;안녕하세요&lt;/h1&gt;</code>과 문단 <code>&lt;p&gt;반갑습니다&lt;/p&gt;</code>를 순서대로 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: '<h1>안녕하세요</h1>\n<p>반갑습니다</p>',
          accept: ['<h1>안녕하세요</h1>\n<p>반갑습니다</p>'],
          why: '제목은 <code>&lt;h1&gt;</code>, 문단은 <code>&lt;p&gt;</code> 태그로 각각 감싸서 순서대로 쓰면 돼요.',
          hint: '<h1>안녕하세요</h1> 다음 줄에 <p>반갑습니다</p>를 써보세요.'
        }),
      ],
      boss: () => {
        const name = pick(['box', 'card', 'panel', 'banner']);
        const color = pick(['tomato', 'skyblue', 'gold', 'lightgreen']);
        const ko = { tomato: '토마토색', skyblue: '하늘색', gold: '금색', lightgreen: '연두색' }[color];
        return {
          type: 'blank',
          q: `<code>&lt;div class="${name}"&gt;안녕&lt;/div&gt;</code>이 있을 때, 이 요소의 배경색을 ${ko}(${color})으로 칠하는 CSS를 완성하세요.`,
          prefix: '', suffix: ` { background-color: ${color}; }`, accept: [`.${name}`], placeholder: '선택자',
          why: `<code>class="${name}"</code>을 가진 요소를 선택하려면 <code>.${name}</code>처럼 마침표를 앞에 붙여요.`,
          hint: 'class 속성을 가진 요소는 마침표(.)를 이름 앞에 붙여서 선택해요.'
        };
      }
    },
    {
      id: 'text',
      title: '글자와 목록 꾸미기',
      ready: true,
      summary: '제목 크기를 다르게 주고, 목록을 만들고, 글자를 진하게·기울임으로 꾸미는 법을 배워요.',
      goals: ['제목 태그(h1~h6)', '목록(ul/ol/li)', '굵게·기울임', 'font-weight / text-align'],
      blocks: [
        {
          h: '제목에도 크기가 있어요',
          html: `<p><code>&lt;h1&gt;</code>이 가장 크고, <code>&lt;h2&gt;</code>, <code>&lt;h3&gt;</code>로 갈수록 점점 작아져요. 책의 "장 제목"과 "소제목"처럼 순서에 맞게 써야 해요.</p>`,
          code: {
            label: 'headings.html',
            lang: 'html',
            src: `<h1>가장 큰 제목</h1>
<h2>중간 제목</h2>
<h3>작은 제목</h3>`,
            preview: `<style>body{font-family:sans-serif;margin:14px;color:#222}</style><h1>가장 큰 제목</h1><h2>중간 제목</h2><h3>작은 제목</h3>`
          }
        },
        {
          h: '목록 만들기',
          html: `<p>순서가 상관없는 목록은 <code>&lt;ul&gt;</code>(unordered list), 순서가 중요한 목록은 <code>&lt;ol&gt;</code>(ordered list)을 써요. 각 항목은 <code>&lt;li&gt;</code>로 감싸요.</p>`,
          code: {
            label: 'list.html',
            lang: 'html',
            src: `<ul>
  <li>사과</li>
  <li>바나나</li>
</ul>`,
            preview: `<style>body{font-family:sans-serif;margin:14px}</style><ul><li>사과</li><li>바나나</li></ul>`
          }
        },
        {
          h: '글자 꾸미기: 굵게, 기울임, 정렬',
          html: `<p>글자를 굵게 하려면 <code>&lt;strong&gt;</code> 태그나 CSS의 <code>font-weight: bold;</code>, 기울이려면 <code>&lt;em&gt;</code>이나 <code>font-style: italic;</code>을 씁니다. 가운데 정렬은 <code>text-align: center;</code>예요.</p>`,
          after: `<div class="note"><b>팁</b> — <code>&lt;b&gt;</code>, <code>&lt;i&gt;</code> 태그도 굵게·기울임을 만들지만, <code>&lt;strong&gt;</code>·<code>&lt;em&gt;</code>은 "이 글자가 중요하다"는 의미도 함께 담고 있어서 더 추천돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const target = pick(['h1', 'h2', 'h3']);
          const desc = { h1: '가장 큰', h2: '중간 크기의', h3: '가장 작은' }[target];
          const others = ['h1', 'h2', 'h3'].filter(t => t !== target);
          return makeChoice(
            `${desc} 제목을 만드는 태그는?`,
            `<code>&lt;${target}&gt;</code>`, others.map(t => `<code>&lt;${t}&gt;</code>`),
            `<code>&lt;${target}&gt;</code>은(는) ${desc} 제목이에요. h1이 가장 크고 숫자가 커질수록 작아져요.`,
            '숫자가 작을수록 더 큰 제목이에요.'
          );
        },
        () => makeChoice(
          '순서가 상관없는 목록을 만드는 태그는?',
          '<code>&lt;ul&gt;</code>', ['<code>&lt;ol&gt;</code>', '<code>&lt;li&gt;</code>', '<code>&lt;list&gt;</code>'],
          '<code>&lt;ul&gt;</code>은 순서 없는 목록, <code>&lt;ol&gt;</code>은 순서 있는 목록이에요.',
          'unordered(순서 없는)의 u를 떠올려보세요.'
        ),
        () => {
          const item = pick(['커피', '녹차', '우유', '주스']);
          return {
            type: 'blank',
            q: `목록 항목 하나를 만들려고 해요. 빈칸을 채우세요.`,
            prefix: '<', suffix: `>${item}</li>`, accept: ['li'], placeholder: '태그 이름',
            why: '목록의 각 항목은 <code>&lt;li&gt;</code> 태그로 감싸요.',
            hint: '닫는 태그가 이미 li로 되어 있죠? 여는 태그도 똑같아요.'
          };
        },
        () => {
          const word = pick(['중요해요', '꼭 확인하세요', '주목!', '필독']);
          return {
            type: 'blank',
            q: `"${word}"라는 글자를 굵게 강조하는 태그로 감싸려고 해요. 여는 태그를 쓰세요.`,
            prefix: '', suffix: `>${word}</strong>`, accept: ['<strong'], placeholder: '<태그',
            why: '<code>&lt;strong&gt;</code>은 글자를 굵게 하면서 "중요하다"는 뜻도 함께 담아요.',
            hint: '닫는 태그가 strong이니, 여는 태그도 이름은 같고 슬래시만 없어요.'
          };
        },
        () => ({
          type: 'blank',
          q: `문단의 글자를 가운데 정렬하는 CSS 속성 이름을 쓰세요.`,
          prefix: 'p { ', suffix: ': center; }', accept: ['text-align'], placeholder: '속성 이름',
          why: '<code>text-align: center;</code>는 글자를 가운데로 정렬해요.',
          hint: '글자의 "정렬"을 뜻하는 영어 단어가 들어가요.'
        }),
        () => ({
          type: 'code',
          preview: true,
          q: '글자를 굵게 강조하는 <code>&lt;strong&gt;재밌어요&lt;/strong&gt;</code>를 작성하세요.',
          starter: '',
          placeholder: '<strong>재밌어요</strong>',
          accept: ['<strong>재밌어요</strong>'],
          why: '<code>&lt;strong&gt;</code> 태그로 글자를 감싸면 굵게 강조돼요.',
          hint: '여는 태그 <strong>과 닫는 태그 </strong> 사이에 "재밌어요"를 넣으세요.'
        }),
      ],
      boss: () => {
        const style = pick([
          { prop: 'font-weight', val: 'bold', ko: '굵게' },
          { prop: 'font-style', val: 'italic', ko: '기울임' },
          { prop: 'text-align', val: 'center', ko: '가운데 정렬' },
        ]);
        return {
          type: 'blank',
          q: `목록 항목(<code>&lt;li&gt;</code>) 안의 글자를 모두 ${style.ko}로 만들려고 해요. CSS 속성과 값을 콜론(:)으로 이어서 모두 채우세요. (예: property: value)`,
          prefix: 'li { ', suffix: '; }', accept: [`${style.prop}: ${style.val}`, `${style.prop}:${style.val}`], placeholder: '속성: 값',
          why: `글자를 ${style.ko}로 만드는 CSS는 <code>${style.prop}: ${style.val};</code>예요.`,
          hint: '속성 이름과 값을 콜론(:)으로 이어서 한 번에 써보세요.'
        };
      }
    },
    {
      id: 'layout',
      title: '레이아웃 배치하기',
      ready: true,
      summary: '요소를 가로로 나란히 놓거나 세로로 쌓는 방법, Flexbox의 기초를 배워요.',
      goals: ['block과 inline', 'display: flex', 'justify-content', 'gap'],
      blocks: [
        {
          h: '태그마다 기본 배치 방식이 달라요',
          html: `<p><code>&lt;div&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;h1&gt;</code>처럼 <b>줄 전체를 차지</b>하는 태그를 block이라고 해요. 반면 <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>처럼 <b>내용만큼만 차지</b>하고 옆에 나란히 놓이는 태그는 inline이에요.</p>`
        },
        {
          h: '가로로 나란히 배치하기: Flexbox',
          html: `<p>여러 요소를 가로로 나란히, 또는 원하는 대로 배치하고 싶을 땐 부모 요소에 <code>display: flex;</code>를 주면 돼요. 그러면 안에 있는 요소들이 자동으로 가로로 나란히 서요.</p>
                 <p><code>justify-content</code>로 가로 정렬(왼쪽·가운데·간격 벌리기 등)을, <code>gap</code>으로 요소 사이 간격을 줄 수 있어요.</p>`,
          code: {
            label: 'flex.html',
            lang: 'html',
            src: `<div class="row">
  <div class="card">사과</div>
  <div class="card">바나나</div>
  <div class="card">포도</div>
</div>

<style>
.row { display: flex; gap: 10px; }
.card { background: khaki; padding: 10px; border-radius: 6px; }
</style>`,
            preview: `<style>body{font-family:sans-serif;margin:14px}.row{display:flex;gap:10px}.card{background:khaki;padding:10px;border-radius:6px}</style><div class="row"><div class="card">사과</div><div class="card">바나나</div><div class="card">포도</div></div>`
          }
        },
        {
          h: '자주 쓰는 justify-content 값',
          html: `<table>
                   <tr><th>값</th><th>뜻</th></tr>
                   <tr><td><code>flex-start</code></td><td>왼쪽부터 정렬(기본값)</td></tr>
                   <tr><td><code>center</code></td><td>가운데 정렬</td></tr>
                   <tr><td><code>space-between</code></td><td>양 끝에 붙이고 사이 간격 균등하게</td></tr>
                 </table>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '줄 전체를 차지해서 다음 요소가 항상 아래로 내려가게 만드는 배치 방식은?',
          'block', ['inline', 'flex', 'grid'],
          'block 요소는 줄 전체를 차지해서, 다음 요소는 그 아래로 내려가요.',
          '<div>, <p>, <h1>처럼 항상 새 줄에서 시작하는 태그들의 기본 방식이에요.'
        ),
        () => ({
          type: 'blank',
          q: `요소들을 가로로 나란히 배치하려고 해요. 빈칸을 채우세요.`,
          prefix: '.row { display: ', suffix: '; }', accept: ['flex'], placeholder: '값',
          why: '<code>display: flex;</code>를 주면 자식 요소들이 가로로 나란히 배치돼요.',
          hint: '"유연하다"는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'Flexbox에서 요소들을 가운데로 정렬하는 값은?',
          '<code>center</code>', ['<code>middle</code>', '<code>flex-start</code>', '<code>auto</code>'],
          '<code>justify-content: center;</code>는 요소들을 가로 방향으로 가운데 정렬해요.',
          '가운데를 뜻하는 가장 흔한 영어 단어예요.'
        ),
        () => {
          const px = pick([8, 10, 16, 20]);
          return {
            type: 'blank',
            q: `요소들 사이에 ${px}px 간격을 주려고 해요. 빈칸에 알맞은 CSS 속성 이름을 쓰세요.`,
            prefix: '.row { display: flex; ', suffix: `: ${px}px; }`, accept: ['gap'], placeholder: '속성 이름',
            why: '<code>gap</code>은 Flexbox 안 요소들 사이의 간격을 정해요.',
            hint: '"틈, 간격"을 뜻하는 짧은 영어 단어예요.'
          };
        },
        () => makeChoice(
          '내용만큼만 자리를 차지하고, 옆에 다른 요소와 나란히 놓일 수 있는 배치 방식은?',
          'inline', ['block', 'flex', 'fixed'],
          'inline 요소는 자기 내용만큼만 자리를 차지해요.',
          '<span>, <a>처럼 문장 속에 자연스럽게 끼어드는 태그들의 기본 방식이에요.'
        ),
        () => ({
          type: 'code',
          preview: true,
          q: '클래스가 <code>row</code>인 div 안에, 클래스가 <code>card</code>인 div 하나를 넣는 HTML을 작성하세요.',
          starter: '',
          placeholder: '<div class="row"><div class="card"></div></div>',
          accept: ['<div class="row"><div class="card"></div></div>', "<div class='row'><div class='card'></div></div>"],
          why: '바깥쪽 div에 <code>class="row"</code>, 그 안쪽에 <code>class="card"</code>인 div를 넣어서 감싸면 돼요.',
          hint: '<div class="row"> 여는 태그 안에 <div class="card"></div>를 넣고, 마지막에 </div>로 닫아요.'
        }),
      ],
      boss: () => {
        const px = pick([8, 12, 16, 20]);
        const correct = `display: flex; justify-content: center; gap: ${px}px;`;
        const distractors = [
          `display: block; justify-content: center; gap: ${px}px;`,
          `display: flex; text-align: center; gap: ${px}px;`,
          `display: flex; justify-content: center; margin: ${px}px;`,
        ];
        return makeChoice(
          `요소들을 가로로 나란히 배치하고, 가운데로 정렬하고, 요소 사이에 ${px}px 간격을 주려고 해요. <code>.row { ... }</code> 안에 들어갈 올바른 선언들은?`,
          `<code>${correct}</code>`,
          distractors.map(d => `<code>${d}</code>`),
          `가로 배치는 <code>display: flex</code>, 가운데 정렬은 <code>justify-content: center</code>, 간격은 <code>gap</code>을 함께 써야 해요.`,
          '가로로 배치하는 속성, 정렬하는 속성, 간격을 주는 속성을 각각 따로 떠올려보세요.'
        );
      }
    },
    {
      id: 'box',
      title: '박스 모델과 여백',
      ready: true,
      summary: '모든 요소는 사실 상자예요. 그 상자의 안쪽·바깥쪽 여백을 다루는 법을 배워요.',
      goals: ['박스 모델(content/padding/border/margin)', 'padding vs margin', 'border-radius'],
      blocks: [
        {
          h: '모든 요소는 상자예요',
          html: `<p>HTML의 모든 요소는 눈에 안 보여도 사각형 상자 모양이에요. 이 상자는 안쪽부터 <b>내용(content)</b> → <b>안쪽 여백(padding)</b> → <b>테두리(border)</b> → <b>바깥쪽 여백(margin)</b> 순서로 겹겹이 쌓여 있어요.</p>
                 <p>액자에 비유하면, 그림(content) 주변에 여백(padding)이 있고, 액자 테두리(border)가 있고, 액자와 액자 사이 벽 간격(margin)이 있는 것과 같아요.</p>`,
          code: {
            label: 'box.html',
            lang: 'html',
            src: `<div class="box">안녕하세요</div>

<style>
.box {
  padding: 16px;
  border: 3px solid tomato;
  margin: 20px;
}
</style>`,
            preview: `<style>body{font-family:sans-serif;margin:14px}.box{padding:16px;border:3px solid tomato;display:inline-block}</style><div class="box">안녕하세요</div>`
          }
        },
        {
          h: 'padding과 margin, 뭐가 다를까?',
          html: `<p><code>padding</code>은 내용과 테두리 <b>사이</b>(상자 안쪽) 여백이고, <code>margin</code>은 이 상자와 <b>다른 상자 사이</b>(상자 바깥쪽) 여백이에요.</p>`
        },
        {
          h: '모서리 둥글게: border-radius',
          html: `<p><code>border-radius</code>에 숫자를 주면 상자의 네 모서리가 둥글게 깎여요. 값이 클수록 더 둥글어져요.</p>`,
          after: `<div class="note"><b>팁</b> — <code>border-radius: 50%;</code>를 정사각형 상자에 주면 완벽한 원이 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '내용과 테두리(border) 사이, 상자 안쪽의 여백을 정하는 속성은?',
          '<code>padding</code>', ['<code>margin</code>', '<code>border</code>', '<code>gap</code>'],
          '<code>padding</code>은 내용과 테두리 사이, 상자 <b>안쪽</b> 여백이에요.',
          '상자 "안쪽"에 쿠션을 채워 넣는 느낌의 속성이에요.'
        ),
        () => makeChoice(
          '이 상자와 다른 상자 사이, 상자 바깥쪽의 여백을 정하는 속성은?',
          '<code>margin</code>', ['<code>padding</code>', '<code>border</code>', '<code>outline</code>'],
          '<code>margin</code>은 상자와 상자 <b>바깥쪽</b> 사이 여백이에요.',
          '책의 "여백(마진)"과 같은 단어예요.'
        ),
        () => {
          const px = pick([1, 2, 3, 4, 5]);
          const color = pick(['tomato', 'navy', 'seagreen', 'gray']);
          return {
            type: 'blank',
            q: `두께 ${px}px, 색은 ${color}인 실선 테두리를 만들려고 해요. 빈칸을 채우세요.`,
            prefix: '.box { border: ', suffix: ` solid ${color}; }`, accept: [`${px}px`], placeholder: '두께',
            why: `<code>border: 두께 solid 색;</code> 순서로 써요. 지금은 ${px}px예요.`,
            hint: '문제에서 말한 두께를 px 단위로 그대로 쓰면 돼요.'
          };
        },
        () => {
          const px = pick([4, 8, 12, 20]);
          return {
            type: 'blank',
            q: `상자의 모서리를 둥글게 만드는 CSS 속성 이름을 쓰세요. (${px}px을 줄 예정이에요)`,
            prefix: '.box { ', suffix: `: ${px}px; }`, accept: ['border-radius'], placeholder: '속성 이름',
            why: '<code>border-radius</code>는 상자의 모서리를 둥글게 깎아줘요.',
            hint: '"테두리(border)"와 "반지름(radius)"을 합친 이름이에요.'
          };
        },
        () => makeChoice(
          '정사각형 상자를 완전한 원으로 만들려면 border-radius에 어떤 값을 주면 될까요?',
          '<code>50%</code>', ['<code>0</code>', '<code>100px</code>', '<code>auto</code>'],
          '<code>border-radius: 50%;</code>는 정사각형을 완벽한 원으로 만들어요.',
          '전체 너비의 절반만큼 둥글게 깎으면 완전한 원이 돼요.'
        ),
        () => ({
          type: 'code',
          preview: true,
          q: '<code>.box</code> 클래스에 안쪽 여백(padding) 10px와 모서리 둥글기(border-radius) 8px를 지정하는 CSS를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: '.box {\n  padding: 10px;\n  border-radius: 8px;\n}',
          accept: [
            '.box {padding: 10px;border-radius: 8px;}',
            '.box {border-radius: 8px;padding: 10px;}'
          ],
          why: '<code>.box { padding: 10px; border-radius: 8px; }</code>처럼 두 속성을 세미콜론으로 구분해서 써요.',
          hint: '.box { } 중괄호 안에 padding: 10px;와 border-radius: 8px;를 순서 상관없이 넣으면 돼요.'
        }),
      ],
      boss: () => {
        const pad = pick([10, 16, 20]);
        const bw = pick([2, 3, 4]);
        const color = pick(['tomato', 'navy', 'seagreen']);
        const radius = pick([8, 12, 20]);
        const correct = `padding: ${pad}px; border: ${bw}px solid ${color}; border-radius: ${radius}px;`;
        const distractors = [
          `margin: ${pad}px; border: ${bw}px solid ${color}; border-radius: ${radius}px;`,
          `padding: ${pad}px; border: ${bw}px solid ${color}; gap: ${radius}px;`,
          `padding: ${pad}px; outline: ${bw}px solid ${color}; border-radius: ${radius}px;`,
        ];
        return makeChoice(
          `상자 안쪽에 ${pad}px 여백을 주고, 두께 ${bw}px의 ${color}색 테두리를 두르고, 모서리를 ${radius}px만큼 둥글게 만들려고 해요. <code>.box { ... }</code>에 들어갈 올바른 선언들은?`,
          `<code>${correct}</code>`, distractors.map(d => `<code>${d}</code>`),
          `안쪽 여백은 <code>padding</code>, 테두리는 <code>border</code>, 둥근 모서리는 <code>border-radius</code>를 각각 써야 해요.`,
          '안쪽 여백, 테두리, 둥근 모서리를 만드는 속성을 각각 따로 떠올려보세요.'
        );
      }
    },
    {
      id: 'responsive',
      title: '반응형 디자인',
      ready: true,
      summary: '컴퓨터 화면에서도, 휴대폰 화면에서도 예쁘게 보이는 페이지를 만드는 방법을 배워요.',
      goals: ['뷰포트(viewport) 설정', '%와 vw 단위', '미디어 쿼리'],
      blocks: [
        {
          h: '휴대폰 화면을 위한 첫걸음: 뷰포트',
          html: `<p>휴대폰에서 웹페이지를 열면 화면이 이상하게 작게 보일 때가 있어요. 이를 막으려면 <code>&lt;head&gt;</code> 안에 아래 태그를 꼭 넣어야 해요. "화면 너비에 맞춰서 보여줘"라는 뜻이에요.</p>`,
          code: {
            label: 'viewport.html',
            lang: 'html',
            src: `<meta name="viewport" content="width=device-width, initial-scale=1">`
          }
        },
        {
          h: '고정 크기 대신 상대 크기 쓰기',
          html: `<p><code>width: 300px;</code>처럼 딱 고정된 크기 대신, 화면 크기에 따라 자동으로 늘어나고 줄어드는 단위를 쓰면 좋아요. <code>%</code>는 부모 요소 기준 비율, <code>vw</code>는 화면 전체 너비 기준 비율이에요.</p>`
        },
        {
          h: '화면 크기에 따라 다르게 보여주기: 미디어 쿼리',
          html: `<p><code>@media (max-width: 600px) { ... }</code>는 "화면 너비가 600px 이하일 때만 이 스타일을 적용해줘"라는 뜻이에요. 이걸로 큰 화면과 작은 화면에서 서로 다른 디자인을 줄 수 있어요.</p>`,
          code: {
            label: 'responsive.css',
            lang: 'css',
            src: `.box {
  width: 50%;
}

@media (max-width: 600px) {
  .box {
    width: 100%;
  }
}`
          },
          after: `<div class="note"><b>비유</b> — 미디어 쿼리는 "화면이 이만큼 좁아지면, 옷을 갈아입어라"라고 미리 정해두는 규칙이에요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `휴대폰에서도 화면 너비에 맞게 보이도록 head 안에 넣는 meta 태그의 name 값을 쓰세요.`,
          prefix: '<meta name="', suffix: '" content="width=device-width, initial-scale=1">', accept: ['viewport'], placeholder: '값',
          why: '<code>name="viewport"</code>가 있어야 휴대폰이 화면 너비에 맞춰서 페이지를 보여줘요.',
          hint: '"보이는 화면 영역"을 뜻하는 영어 단어예요.'
        }),
        () => makeChoice(
          '화면(뷰포트) 전체 너비를 기준으로 한 비율 단위는?',
          '<code>vw</code>', ['<code>px</code>', '<code>pt</code>', '<code>em</code>'],
          '<code>vw</code>는 "viewport width"의 줄임말로, 화면 너비의 1%가 1vw예요.',
          '"viewport width"의 줄임말이에요.'
        ),
        () => {
          const px = pick([480, 600, 768, 900]);
          return {
            type: 'blank',
            q: `화면 너비가 ${px}px 이하일 때만 스타일을 적용하려고 해요. 빈칸을 채우세요.`,
            prefix: '@media (max-width: ', suffix: ') { .box { width: 100%; } }', accept: [`${px}px`], placeholder: '너비',
            why: `<code>@media (max-width: ${px}px)</code>는 화면이 ${px}px 이하일 때만 적용돼요.`,
            hint: '문제에서 말한 화면 너비를 px 단위로 그대로 쓰면 돼요.'
          };
        },
        () => makeChoice(
          '부모 요소 크기를 기준으로 한 비율 단위는?',
          '<code>%</code>', ['<code>px</code>', '<code>vw</code>', '<code>pt</code>'],
          '<code>%</code>는 부모 요소의 크기를 기준으로 한 상대적인 비율이에요.',
          '가장 흔히 쓰는, 100분율을 나타내는 기호예요.'
        ),
        () => makeChoice(
          '반응형 디자인이 필요한 이유로 가장 알맞은 것은?',
          '컴퓨터·태블릿·휴대폰 등 화면 크기가 다양하기 때문에', ['페이지 로딩 속도를 높이기 위해', '이미지 화질을 높이기 위해', '글자 색을 다양하게 쓰기 위해'],
          '기기마다 화면 크기가 다르기 때문에, 어디서든 잘 보이도록 반응형으로 만들어요.',
          '화면 "크기"와 관련된 이유를 찾아보세요.'
        ),
        () => ({
          type: 'code',
          q: '화면 너비가 500px 이하일 때 <code>.box</code>의 width를 100%로 만드는 미디어 쿼리를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: '@media (max-width: 500px) {\n  .box {\n    width: 100%;\n  }\n}',
          accept: ['@media (max-width: 500px) {.box {width: 100%;}}'],
          why: '<code>@media (max-width: 500px) { ... }</code> 안에 <code>.box { width: 100%; }</code>를 넣어요.',
          hint: '@media (max-width: 500px) { } 중괄호 안에, .box { width: 100%; }를 그대로 넣으면 돼요.'
        }),
      ],
      boss: () => {
        const px = pick([480, 600, 768]);
        const correct = `@media (max-width: ${px}px) { .box { width: 100%; } }`;
        const distractors = [
          `@media (min-width: ${px}px) { .box { width: 100%; } }`,
          `@media (max-width: ${px}px) { .box { width: 50%; } }`,
          `.box { max-width: ${px}px; width: 100%; }`,
        ];
        return makeChoice(
          `화면 너비가 ${px}px 이하일 때 <code>.box</code>의 너비를 100%로 바꾸는 올바른 코드는?`,
          `<code>${correct}</code>`, distractors.map(d => `<code>${d}</code>`),
          `<code>@media (max-width: ${px}px)</code>는 "이 너비 이하일 때"라는 뜻이고, 그 안에 원하는 스타일을 넣어요.`,
          'max-width는 "이 값 이하일 때"를 뜻해요. min-width와 헷갈리지 마세요.'
        );
      }
    },
    {
      id: 'jsInteractive',
      title: '자바스크립트로 페이지 움직이기',
      ready: true,
      summary: 'HTML/CSS로 만든 페이지를 자바스크립트로 살아 움직이게 만드는 법을 배워요.',
      goals: ['querySelector로 요소 찾기', 'addEventListener', 'textContent 바꾸기', 'classList.toggle'],
      blocks: [
        {
          h: 'HTML 요소를 자바스크립트로 찾기: querySelector',
          html: `<p>자바스크립트로 페이지의 특정 요소를 조작하려면, 먼저 <code>document.querySelector("선택자")</code>로 그 요소를 "찾아야" 해요. 선택자는 CSS에서 쓰던 것과 똑같아요 — <code>.클래스</code>, <code>#아이디</code>, 태그이름 그대로도 됩니다.</p>`,
          code: {
            label: 'find.js',
            src: `const title = document.querySelector("h1");
const box = document.querySelector(".box");
const btn = document.querySelector("#myBtn");`
          }
        },
        {
          h: '클릭에 반응하기: addEventListener',
          html: `<p><code>요소.addEventListener("click", 함수)</code>라고 쓰면, 그 요소를 클릭할 때마다 함수가 실행돼요. "이 이벤트(click)가 일어나면, 이 일을 해라"라는 뜻이에요.</p>`,
          code: {
            label: 'click.html',
            lang: 'html',
            src: `<button id="myBtn">눌러보세요</button>
<p id="msg">아직 안 눌렀어요</p>

<script>
document.querySelector("#myBtn").addEventListener("click", () => {
  document.querySelector("#msg").textContent = "눌렀어요!";
});
</script>`,
            preview: `<style>body{font-family:sans-serif;margin:14px}</style><button id="myBtn">눌러보세요</button><p id="msg">아직 안 눌렀어요</p><script>document.querySelector("#myBtn").addEventListener("click", () => { document.querySelector("#msg").textContent = "눌렀어요!"; });</script>`
          }
        },
        {
          h: '내용 바꾸기와 클래스 토글',
          html: `<p><code>요소.textContent = "새 글자"</code>는 그 요소 안의 글자를 통째로 바꿔요. <code>요소.classList.toggle("클래스이름")</code>은 그 클래스가 있으면 빼고, 없으면 붙여줘요 — 스위치를 켰다 껐다 하는 것과 비슷해요.</p>`,
          after: `<div class="note"><b>팁</b> — <code>&lt;script&gt;</code> 태그는 보통 <code>&lt;/body&gt;</code> 바로 앞에 둬요. HTML이 먼저 다 만들어진 다음에 자바스크립트가 요소를 찾아야 하기 때문이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const kind = pick([
            { sel: '.box', desc: '클래스가 "box"인' },
            { sel: '#title', desc: '아이디가 "title"인' },
            { sel: 'p', desc: '모든 문단(p)' },
          ]);
          return {
            type: 'blank',
            q: `${kind.desc} 요소를 찾는 코드를 완성하세요.`,
            prefix: 'document.querySelector("', suffix: '");', accept: [kind.sel], placeholder: '선택자',
            why: `<code>querySelector</code> 안의 선택자는 CSS 선택자와 똑같아요. ${kind.desc} 요소는 <code>${kind.sel}</code>예요.`,
            hint: 'CSS에서 쓰던 선택자(마침표=클래스, 샵=아이디)를 그대로 큰따옴표 안에 넣으면 돼요.'
          };
        },
        () => makeChoice(
          '요소를 클릭했을 때 어떤 동작을 실행하고 싶을 때 쓰는 메서드는?',
          '<code>addEventListener</code>', ['<code>querySelector</code>', '<code>textContent</code>', '<code>classList</code>'],
          '<code>요소.addEventListener("click", 함수)</code>는 클릭할 때마다 함수를 실행해요.',
          '"이벤트를 듣는다(listen)"는 뜻의 영어 단어가 들어가요.'
        ),
        () => {
          const word = pick(['완료!', '성공', '눌렀어요', '변경됨']);
          return {
            type: 'blank',
            q: `<code>id="msg"</code>인 요소의 글자를 "${word}"로 바꾸는 코드를 완성하세요.`,
            prefix: 'document.querySelector("#msg").', suffix: ` = "${word}";`, accept: ['textContent'], placeholder: '속성 이름',
            why: '<code>textContent</code>에 새 값을 대입하면 그 요소 안의 글자가 통째로 바뀌어요.',
            hint: '"글자 내용"을 뜻하는 영어 단어 조합이에요.'
          };
        },
        () => makeChoice(
          '클래스가 있으면 빼고, 없으면 붙여주는(스위치처럼 켰다 껐다 하는) 메서드는?',
          '<code>classList.toggle</code>', ['<code>classList.add</code>', '<code>classList.remove</code>', '<code>classList.get</code>'],
          '<code>classList.toggle("이름")</code>은 그 클래스가 있으면 빼고, 없으면 붙여요.',
          '"뒤집다, 전환하다"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `버튼을 클릭했을 때 동작을 실행하도록 이벤트 이름을 빈칸에 쓰세요.`,
          prefix: 'btn.addEventListener("', suffix: '", () => { ... });', accept: ['click'], placeholder: '이벤트 이름',
          why: '클릭 이벤트의 이름은 <code>"click"</code>이에요.',
          hint: '"누르다, 클릭하다"라는 뜻의 영어 단어 그대로예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>id="btn"</code>인 버튼을 클릭하면, <code>id="msg"</code>인 요소의 <code>textContent</code>를 <code>"클릭됨"</code>으로 바꾸는 자바스크립트 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'document.querySelector("#btn").addEventListener("click", () => {\n  document.querySelector("#msg").textContent = "클릭됨";\n});',
          accept: ['document.querySelector("#btn").addEventListener("click", () => {document.querySelector("#msg").textContent = "클릭됨";});'],
          why: '#btn 요소를 찾아 클릭 이벤트를 걸고, 그 안에서 #msg의 textContent를 바꾸면 돼요.',
          hint: 'querySelector로 버튼을 찾고, addEventListener("click", ...) 안에서 다른 요소의 textContent를 바꾸세요.'
        }),
      ],
      boss: () => {
        const word = pick(['완료!', '성공!', '눌렀어요!']);
        return {
          type: 'blank',
          q: `<code>&lt;button id="btn"&gt;누르기&lt;/button&gt;&lt;p id="msg"&gt;대기중&lt;/p&gt;</code>이 있고, <code>document.querySelector("#btn").addEventListener("click", () =&gt; { document.querySelector("#msg").textContent = "${word}"; });</code>가 있어요. 버튼을 클릭하면 <code>#msg</code>의 글자는 무엇으로 바뀔까요? (따옴표 없이)`,
          prefix: '', suffix: '', accept: [word], placeholder: '값',
          why: `클릭 이벤트가 일어나면 <code>#msg</code>의 <code>textContent</code>가 "${word}"로 바뀌어요.`,
          hint: 'addEventListener 안의 함수가 클릭할 때 무엇을 textContent에 대입하는지 확인해보세요.'
        };
      }
    },
    {
      id: 'a11y',
      title: '웹 접근성 기초',
      ready: true,
      summary: '눈이 불편하거나 마우스를 쓰기 어려운 사람도 잘 쓸 수 있는 페이지를 만드는 법을 배워요.',
      goals: ['alt 속성', 'label과 input 연결', '시맨틱 태그', '키보드로 접근 가능하게'],
      blocks: [
        {
          h: '이미지에는 설명을: alt 속성',
          html: `<p>화면을 볼 수 없는 사용자는 스크린 리더가 페이지를 읽어줘요. 이미지는 소리로 읽어줄 수 없으니, <code>alt="설명"</code>으로 그 그림이 무엇인지 글로 적어둬야 해요.</p>`,
          code: {
            label: 'alt.html',
            lang: 'html',
            src: `<img src="cat.jpg" alt="갈색 고양이가 창가에 앉아있는 사진">`
          }
        },
        {
          h: '입력칸과 이름표 연결하기: label',
          html: `<p><code>&lt;label for="아이디"&gt;</code>와 <code>&lt;input id="아이디"&gt;</code>를 같은 값으로 연결해두면, 스크린 리더가 "이 입력칸은 무엇을 입력하는 곳인지" 읽어줄 수 있고, 라벨을 눌러도 입력칸에 포커스가 가요.</p>`,
          code: {
            label: 'label.html',
            lang: 'html',
            src: `<label for="name">이름</label>
<input id="name" type="text">`,
            preview: `<style>body{font-family:sans-serif;margin:14px}</style><label for="name">이름</label> <input id="name" type="text">`
          }
        },
        {
          h: '의미가 담긴 태그 쓰기: 시맨틱 태그',
          html: `<p>모든 걸 <code>&lt;div&gt;</code>로만 만들 수도 있지만, <code>&lt;nav&gt;</code>(메뉴), <code>&lt;main&gt;</code>(본문), <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;button&gt;</code>처럼 <b>뜻이 담긴 태그</b>를 쓰면 스크린 리더와 키보드 사용자 모두에게 더 도움이 돼요. 특히 클릭 가능한 요소는 <code>&lt;div&gt;</code> 대신 <code>&lt;button&gt;</code>을 쓰면 자동으로 키보드(Tab, Enter)로도 눌러져요.</p>`,
          after: `<div class="note"><b>팁</b> — "이 요소가 무슨 역할을 하는가"를 태그 이름만 보고 알 수 있다면, 좋은 시맨틱 태그를 쓴 거예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const desc = pick(['노란 우산을 쓴 아이 그림', '초록색 산 풍경 사진', '웃고 있는 강아지 사진']);
          return {
            type: 'blank',
            q: `"${desc}"를 설명하는 이미지 태그를 완성하세요.`,
            prefix: '<img src="pic.jpg" alt="', suffix: '">', accept: [desc], placeholder: '설명',
            why: `<code>alt</code> 속성에 그림 내용을 그대로 글로 적으면, 화면을 볼 수 없는 사용자도 스크린 리더로 어떤 그림인지 알 수 있어요.`,
            hint: '문제에서 설명한 그림 내용을 그대로 큰따옴표 안에 쓰면 돼요.'
          };
        },
        () => makeChoice(
          '이미지가 무엇을 나타내는지 스크린 리더가 읽어줄 수 있게 하는 속성은?',
          '<code>alt</code>', ['<code>title</code>', '<code>name</code>', '<code>desc</code>'],
          '<code>alt</code>는 이미지를 대신 설명하는 텍스트예요.',
          '"대체 텍스트(alternative text)"의 줄임말이에요.'
        ),
        () => {
          const field = pick(['name', 'email', 'phone']);
          const ko = { name: '이름', email: '이메일', phone: '전화번호' }[field];
          return {
            type: 'blank',
            q: `<code>&lt;input id="${field}"&gt;</code>과 연결되는 ${ko} 라벨을 완성하세요.`,
            prefix: `<label for="`, suffix: `">${ko}</label>`, accept: [field], placeholder: 'id 값',
            why: `<code>label</code>의 <code>for</code> 값은 연결할 <code>input</code>의 <code>id</code>와 똑같아야 해요.`,
            hint: 'label의 for 속성 값은 input의 id 값과 정확히 같아야 서로 연결돼요.'
          };
        },
        () => makeChoice(
          '클릭 가능한 요소를 만들 때, 키보드(Tab, Enter)로도 자동으로 눌리게 하려면 어떤 태그를 쓰는 게 좋을까요?',
          '<code>&lt;button&gt;</code>', ['<code>&lt;div&gt;</code>', '<code>&lt;span&gt;</code>', '<code>&lt;p&gt;</code>'],
          '<code>&lt;button&gt;</code>은 태그만으로도 키보드 접근(Tab으로 이동, Enter로 클릭)이 자동으로 돼요.',
          '<div>는 뜻이 없는 상자일 뿐이라, 키보드 접근을 직접 다 만들어줘야 해요.'
        ),
        () => {
          const tag = pick([
            { name: 'nav', ko: '메뉴(내비게이션)' },
            { name: 'main', ko: '페이지의 본문' },
            { name: 'footer', ko: '페이지 하단' },
          ]);
          return {
            type: 'blank',
            q: `${tag.ko}을(를) 나타내는 뜻이 담긴(시맨틱) 태그를 쓰세요.`,
            prefix: '<', suffix: '>...</' + tag.name + '>', accept: [tag.name], placeholder: '태그 이름',
            why: `<code>&lt;${tag.name}&gt;</code>은 ${tag.ko}을(를) 나타내는 시맨틱 태그예요.`,
            hint: '닫는 태그 이름을 보면 여는 태그도 똑같이 쓰면 된다는 걸 알 수 있어요.'
          };
        },
        () => ({
          type: 'code',
          preview: true,
          q: '<code>id="email"</code>인 입력칸과, 그 입력칸을 위한 "이메일"이라는 라벨을 서로 연결해서 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: '<label for="email">이메일</label>\n<input id="email" type="text">',
          accept: ['<label for="email">이메일</label>\n<input id="email" type="text">'],
          why: 'label의 for와 input의 id를 똑같이 "email"로 맞춰야 서로 연결돼요.',
          hint: '<label for="email">이메일</label> 다음 줄에 <input id="email" type="text">를 쓰세요.'
        }),
      ],
      boss: () => {
        const id = pick(['search', 'query', 'keyword']);
        return {
          type: 'blank',
          q: `<code>&lt;label for="${id}"&gt;검색어&lt;/label&gt;</code>가 있을 때, 이 라벨과 연결되는 입력칸의 <code>id</code> 값은 무엇이어야 할까요?`,
          prefix: '', suffix: '', accept: [id], placeholder: 'id 값',
          why: `<code>label</code>의 <code>for="${id}"</code>와 연결되려면 <code>input</code>의 <code>id</code>도 정확히 "${id}"여야 해요.`,
          hint: 'label의 for 값과 input의 id 값은 글자 하나까지 똑같아야 연결돼요.'
        };
      }
    }],
  tierBoss: {
    beginner: () => ({
      type: 'code',
      preview: true,
      q: '제목 <code>&lt;h1&gt;환영합니다&lt;/h1&gt;</code>과, 항목이 사과·바나나인 목록 <code>&lt;ul&gt;</code>을 만들고, 그 아래 클래스가 "row"인 div 안에 클래스가 "card"인 div 두 개를 나란히 배치하세요. <code>&lt;style&gt;</code> 태그 안에 <code>.row</code>에는 <code>display: flex;</code>와 <code>gap: 10px;</code>를 지정하는 코드까지 작성하세요.',
      starter: '',
      rows: 12,
      placeholder: '<h1>환영합니다</h1>\n<ul>\n  <li>사과</li>\n  <li>바나나</li>\n</ul>\n<div class="row">\n  <div class="card">딸기</div>\n  <div class="card">포도</div>\n</div>\n\n<style>\n.row {\n  display: flex;\n  gap: 10px;\n}\n</style>',
      accept: ['<h1>환영합니다</h1>\n<ul><li>사과</li><li>바나나</li></ul>\n<div class="row"><div class="card">딸기</div><div class="card">포도</div></div>\n\n<style>.row {display: flex;gap: 10px;}</style>'],
      why: '제목·목록은 <code>&lt;h1&gt;</code>, <code>&lt;ul&gt;</code>+<code>&lt;li&gt;</code>로, 가로 배치는 <code>display: flex;</code>와 <code>gap</code>으로 만들어요.',
      hint: '<h1>, <ul><li>...</li></ul>, class="row" div 안에 class="card" div 두 개, 그리고 <style> 안에 .row { display: flex; gap: 10px; }를 순서대로 써보세요.'
    }),
    intermediate: () => ({
      type: 'code',
      q: '<code>.card</code>에는 <code>padding: 16px;</code>와 <code>border-radius: 8px;</code>를 지정하고, 화면 너비가 600px 이하일 때는 <code>.card</code>의 width를 100%로 만드는 미디어 쿼리도 함께 작성하세요.',
      starter: '',
      rows: 8,
      placeholder: '.card {\n  padding: 16px;\n  border-radius: 8px;\n}\n\n@media (max-width: 600px) {\n  .card {\n    width: 100%;\n  }\n}',
      accept: ['.card {padding: 16px;border-radius: 8px;}\n\n@media (max-width: 600px) {.card {width: 100%;}}'],
      why: '<code>.card</code>는 안쪽 여백(padding)과 둥근 모서리(border-radius)를 지정하고, <code>@media (max-width: 600px)</code> 안에서 화면이 좁을 때 width를 100%로 덮어써요.',
      hint: '.card { padding: 16px; border-radius: 8px; }를 먼저 쓰고, 그 아래 @media (max-width: 600px) { .card { width: 100%; } }를 이어서 쓰세요.'
    }),
    advanced: () => ({
      type: 'code',
      q: '<code>&lt;button id="msg"&gt;알림&lt;/button&gt;</code>을 만들고(클릭 가능한 요소는 div 대신 button을 써야 키보드로도 접근할 수 있어요), 이 버튼을 클릭하면 <code>classList.toggle("active")</code>가 실행되도록 <code>&lt;script&gt;</code> 코드를 작성하세요.',
      starter: '',
      rows: 6,
      placeholder: '<button id="msg">알림</button>\n\n<script>\ndocument.querySelector("#msg").addEventListener("click", () => {\n  document.querySelector("#msg").classList.toggle("active");\n});\n</script>',
      accept: ['<button id="msg">알림</button>\n\n<script>document.querySelector("#msg").addEventListener("click", () => {document.querySelector("#msg").classList.toggle("active");});</script>'],
      why: '<button>은 태그만으로 키보드 접근이 가능해서 접근성에 좋고, addEventListener로 클릭 이벤트를 걸어 classList.toggle로 클래스를 켰다 껐다 해요.',
      hint: '클릭 가능한 요소는 <button>으로 만들고, querySelector로 그 버튼을 찾아 addEventListener("click", ...) 안에서 classList.toggle("active")를 실행하세요.'
    }),
  }
};
