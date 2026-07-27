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
    },
    {
      id: 'cssGrid',
      title: 'CSS Grid 레이아웃',
      ready: true,
      summary: 'Flexbox가 한 줄 배치라면, Grid는 가로·세로를 한 번에 나누는 격자 배치예요.',
      goals: ['display: grid', 'grid-template-columns', 'fr 단위', 'gap'],
      blocks: [
        {
          h: '격자로 배치하기: display: grid',
          html: `<p>부모 요소에 <code>display: grid;</code>를 주면, 안의 자식 요소들을 <b>격자(gap이 있는 표)</b> 모양으로 배치할 수 있어요. <code>grid-template-columns</code>로 "세로줄(열)을 몇 개, 얼마씩 나눌지"를 정해줘요.</p>`,
          code: {
            label: 'grid.html',
            lang: 'html',
            src: `<div class="wrap">
  <div class="card">사과</div>
  <div class="card">바나나</div>
  <div class="card">포도</div>
</div>

<style>
.wrap {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
}
</style>`,
            preview: `<style>body{font-family:sans-serif;margin:14px}.wrap{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px}.card{background:khaki;padding:10px;border-radius:6px;text-align:center}</style><div class="wrap"><div class="card">사과</div><div class="card">바나나</div><div class="card">포도</div></div>`
          }
        },
        {
          h: '칸 크기를 자유롭게: fr 단위와 repeat()',
          html: `<p><code>fr</code>은 "남은 공간을 이 비율만큼 나눠 가져라"는 뜻이에요. <code>1fr 1fr 1fr</code>은 똑같이 3등분하라는 뜻이죠. 같은 크기의 열이 여러 개 필요하면 <code>repeat(개수, 크기)</code>로 더 짧게 쓸 수 있어요.</p>`,
          code: {
            label: 'repeat.css',
            lang: 'css',
            src: `.wrap {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}`
          }
        },
        {
          h: 'Flexbox는 한 줄, Grid는 격자',
          html: `<p>Flexbox(<code>display: flex</code>)는 기본적으로 <b>한 방향(줄)</b>으로 나열하는 데 좋고, Grid(<code>display: grid</code>)는 <b>가로와 세로를 동시에</b> 격자로 나누는 데 좋아요. 사진첩, 대시보드처럼 "표처럼 칸을 나누는" 레이아웃엔 Grid가 훨씬 편해요.</p>`,
          after: `<div class="note"><b>팁</b> — 뭘 써야 할지 헷갈리면, "한 줄로 쭉 늘어놓을 것"이면 flex, "표처럼 칸을 나눌 것"이면 grid를 떠올리세요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `요소를 격자(그리드) 모양으로 배치하려고 해요. 빈칸을 채우세요.`,
          prefix: '.wrap { display: ', suffix: '; }', accept: ['grid'], placeholder: '값',
          why: '<code>display: grid;</code>를 주면 자식 요소들을 격자 모양으로 배치할 수 있어요.',
          hint: '"격자, 그물"을 뜻하는 영어 단어 그대로예요.'
        }),
        () => {
          const n = pick([2, 3, 4]);
          return {
            type: 'blank',
            q: `${n}개의 똑같은 크기의 열로 나누려고 해요. <code>grid-template-columns</code> 값을 완성하세요. (repeat() 사용)`,
            prefix: 'grid-template-columns: ', suffix: ';', accept: [`repeat(${n}, 1fr)`], placeholder: 'repeat(개수, 크기)',
            why: `<code>repeat(${n}, 1fr)</code>은 <code>${Array(n).fill('1fr').join(' ')}</code>과 똑같이 ${n}개의 똑같은 열을 만들어요.`,
            hint: 'repeat(개수, 크기) 형태로, 개수 자리에 원하는 열 개수를 넣으세요.'
          };
        },
        () => makeChoice(
          '"남은 공간을 이 비율만큼 나눠 가져라"는 뜻으로, Grid의 열/행 크기에 쓰는 단위는?',
          '<code>fr</code>', ['<code>px</code>', '<code>%</code>', '<code>vw</code>'],
          '<code>fr</code>(fraction, 부분)은 grid 안에서 남은 공간을 비율로 나눌 때 써요.',
          '"부분, 조각(fraction)"의 줄임말이에요.'
        ),
        () => makeChoice(
          '사진첩이나 대시보드처럼 "표처럼 가로·세로 칸을 한 번에" 나누는 레이아웃에 더 적합한 것은?',
          'Grid', ['Flexbox', 'position: absolute', 'float'],
          'Grid는 가로와 세로를 동시에 격자로 나누는 데 특화되어 있어요. Flexbox는 한 방향(줄) 배치에 강해요.',
          '"격자"라는 이름 자체가 힌트예요.'
        ),
        () => ({
          type: 'code',
          preview: true,
          q: '<code>.wrap</code>에 <code>display: grid;</code>, <code>grid-template-columns: repeat(2, 1fr);</code>, <code>gap: 10px;</code>를 지정하는 CSS를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: '.wrap {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 10px;\n}',
          accept: ['.wrap {display: grid;grid-template-columns: repeat(2, 1fr);gap: 10px;}'],
          why: 'display: grid로 격자를 만들고, grid-template-columns로 열 개수와 크기를, gap으로 간격을 정해요.',
          hint: '.wrap { } 중괄호 안에 세 속성을 순서대로 넣으세요.'
        }),
      ],
      boss: () => {
        const n = pick([2, 3, 4]);
        const px = pick([8, 12, 16]);
        const correct = `display: grid; grid-template-columns: repeat(${n}, 1fr); gap: ${px}px;`;
        const distractors = [
          `display: flex; grid-template-columns: repeat(${n}, 1fr); gap: ${px}px;`,
          `display: grid; grid-template-columns: ${n}fr; gap: ${px}px;`,
          `display: grid; grid-template-columns: repeat(${n}, 1fr); margin: ${px}px;`,
        ];
        return makeChoice(
          `요소들을 ${n}개의 똑같은 열로 이루어진 격자로 배치하고, 칸 사이에 ${px}px 간격을 주려고 해요. <code>.wrap { ... }</code> 안에 들어갈 올바른 선언들은?`,
          `<code>${correct}</code>`, distractors.map(d => `<code>${d}</code>`),
          `격자 배치는 <code>display: grid</code>, 열 개수·크기는 <code>grid-template-columns: repeat(${n}, 1fr)</code>, 간격은 <code>gap</code>으로 정해요.`,
          '격자로 만드는 속성, 열을 나누는 속성, 간격을 주는 속성을 각각 따로 떠올려보세요.'
        );
      }
    },
    {
      id: 'forms',
      title: '폼(form)과 유효성 검사',
      ready: true,
      summary: '사용자에게 값을 입력받는 폼을 만들고, 잘못된 값은 미리 걸러내는 방법을 배워요.',
      goals: ['form과 input 종류', 'required / minlength', 'submit 이벤트'],
      blocks: [
        {
          h: '사용자 입력을 모으는 틀: form',
          html: `<p><code>&lt;form&gt;</code>은 여러 입력칸을 하나로 묶어서, "제출(submit)"이라는 하나의 동작으로 함께 보낼 수 있게 해줘요. 안에는 <code>&lt;input type="..."&gt;</code>으로 다양한 입력칸을 넣어요. <code>type</code>에 따라 키보드나 형태가 자동으로 달라져요.</p>`,
          code: {
            label: 'form.html',
            lang: 'html',
            src: `<form>
  <input type="text" placeholder="이름">
  <input type="email" placeholder="이메일">
  <input type="password" placeholder="비밀번호">
  <button type="submit">가입하기</button>
</form>`,
            preview: `<style>body{font-family:sans-serif;margin:14px}form{display:grid;gap:8px;max-width:220px}</style><form><input type="text" placeholder="이름"><input type="email" placeholder="이메일"><input type="password" placeholder="비밀번호"><button type="submit">가입하기</button></form>`
          }
        },
        {
          h: '제출 전에 미리 걸러내기: required, minlength',
          html: `<p>자바스크립트 없이도, 몇 가지 속성만으로 기본적인 유효성 검사를 할 수 있어요. <code>required</code>는 "꼭 채워야 함", <code>minlength="3"</code>은 "최소 3글자 이상"이라는 뜻이에요. 조건에 안 맞으면 브라우저가 알아서 제출을 막고 알려줘요.</p>`,
          code: {
            label: 'validate.html',
            lang: 'html',
            src: `<input type="text" required minlength="3" placeholder="닉네임(3글자 이상)">
<input type="email" required placeholder="이메일">`
          }
        },
        {
          h: '제출을 가로채기: submit 이벤트',
          html: `<p>폼을 자바스크립트로 직접 다루고 싶을 땐 <code>form.addEventListener("submit", e =&gt; { ... })</code>을 써요. <code>e.preventDefault()</code>를 호출하면, 폼의 원래 동작(페이지를 새로고침하며 서버로 보내는 것)을 막고 내가 원하는 코드를 대신 실행할 수 있어요.</p>`,
          after: `<div class="note"><b>팁</b> — <code>e.preventDefault()</code>가 없으면, 폼을 제출할 때마다 페이지가 새로고침되면서 자바스크립트로 처리한 내용이 다 사라져요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const kind = pick([
            { type: 'email', desc: '이메일 형식인지 자동으로 확인해주는' },
            { type: 'password', desc: '입력한 글자가 점(•)으로 가려지는' },
            { type: 'number', desc: '숫자만 입력받는' },
          ]);
          return {
            type: 'blank',
            q: `${kind.desc} 입력칸을 만들려고 해요. type 값을 쓰세요.`,
            prefix: '<input type="', suffix: '">', accept: [kind.type], placeholder: 'type 값',
            why: `<code>type="${kind.type}"</code>은 ${kind.desc} 입력칸을 만들어요.`,
            hint: '입력칸의 성격을 그대로 나타내는 영어 단어예요.'
          };
        },
        () => makeChoice(
          '입력칸을 꼭 채워야만 제출되도록 만드는 속성은?',
          '<code>required</code>', ['<code>necessary</code>', '<code>must</code>', '<code>need</code>'],
          '<code>required</code>는 그 입력칸을 비워두면 제출을 막아줘요.',
          '"필수의"라는 뜻의 영어 단어 그대로예요.'
        ),
        () => {
          const n = pick([2, 3, 4]);
          return {
            type: 'blank',
            q: `닉네임을 최소 ${n}글자 이상 입력해야 하도록 만들려고 해요. 빈칸을 채우세요.`,
            prefix: '<input type="text" minlength="', suffix: '">', accept: [String(n)], placeholder: '숫자',
            why: `<code>minlength="${n}"</code>은 최소 ${n}글자 이상이어야 통과돼요.`,
            hint: '"최소 길이"를 뜻하는 속성 이름의 값 자리에 숫자를 넣으면 돼요.'
          };
        },
        () => ({
          type: 'blank',
          q: `폼이 제출될 때를 감지하려고 해요. 이벤트 이름을 쓰세요.`,
          prefix: 'form.addEventListener("', suffix: '", (e) => { ... });', accept: ['submit'], placeholder: '이벤트 이름',
          why: '<code>"submit"</code> 이벤트는 폼이 제출될 때 발생해요.',
          hint: '"제출하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '폼 제출 시 페이지가 새로고침되는 기본 동작을 막을 때 호출하는 메서드는?',
          '<code>e.preventDefault()</code>', ['<code>e.stop()</code>', '<code>e.cancel()</code>', '<code>e.block()</code>'],
          '<code>e.preventDefault()</code>는 이벤트의 기본 동작(폼 제출 시 새로고침)을 막아줘요.',
          '"기본 동작을 막는다(prevent default)"는 뜻 그대로예요.'
        ),
        () => ({
          type: 'code',
          preview: true,
          q: '<code>type="email"</code>이고 <code>required</code> 속성이 있는 입력칸 하나를 작성하세요.',
          starter: '',
          placeholder: '<input type="email" required>',
          accept: ['<input type="email" required>'],
          why: 'type="email"은 이메일 형식을 확인하고, required는 꼭 채우도록 해요.',
          hint: '<input type="email" required> 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const min = pick([2, 3, 4]);
        return {
          type: 'blank',
          q: `<code>id="signupForm"</code>인 폼이 제출될 때, 페이지 새로고침을 막고 콘솔에 <code>"제출됨"</code>을 출력하는 <code>&lt;script&gt;</code> 코드를 작성하세요. (<code>submit</code> 이벤트와 <code>preventDefault()</code>를 사용하세요, minlength="${min}"인 입력칸이 있다고 가정해요)`,
          prefix: '', suffix: '', accept: ['document.querySelector("#signupForm").addEventListener("submit", (e) => { e.preventDefault(); console.log("제출됨"); });', 'document.querySelector("#signupForm").addEventListener("submit", (e) => {e.preventDefault();console.log("제출됨");});'], placeholder: '전체 코드',
          why: 'querySelector로 폼을 찾아 submit 이벤트를 걸고, e.preventDefault()로 새로고침을 막은 뒤 원하는 코드(console.log)를 실행해요.',
          hint: 'document.querySelector("#signupForm").addEventListener("submit", (e) => { e.preventDefault(); console.log("제출됨"); }); 형태를 떠올려보세요.'
        };
      }
    },
    {
      id: 'transitions',
      title: 'CSS 트랜지션과 애니메이션',
      ready: true,
      summary: '값이 갑자기 뚝 바뀌는 대신, 부드럽게 변하거나 스스로 계속 움직이는 효과를 만들어요.',
      goals: ['transition', ':hover와 함께 쓰기', '@keyframes로 애니메이션 만들기'],
      blocks: [
        {
          h: '값이 바뀔 때 부드럽게: transition',
          html: `<p>CSS 값이 바뀌면 원래는 "뚝" 하고 즉시 바뀌어요. <code>transition: 속성 시간;</code>을 주면, 그 속성이 바뀔 때 지정한 시간(초) 동안 <b>부드럽게</b> 변하게 만들 수 있어요.</p>`,
          code: {
            label: 'transition.html',
            lang: 'html',
            src: `<div class="box"></div>

<style>
.box {
  width: 60px;
  height: 60px;
  background-color: skyblue;
  transition: background-color 0.3s;
}
.box:hover {
  background-color: tomato;
}
</style>`,
            preview: `<style>body{font-family:sans-serif;margin:14px}.box{width:60px;height:60px;background-color:skyblue;transition:background-color 0.3s;border-radius:8px}.box:hover{background-color:tomato}</style><div class="box"></div><p style="color:#888;font-size:13px">(마우스를 상자 위에 올려보세요)</p>`
          }
        },
        {
          h: ':hover와 함께 쓰면 자연스러운 반응이 돼요',
          html: `<p><code>:hover</code>는 마우스를 올렸을 때의 상태를 정의해요. 여기에 <code>transition</code>을 함께 쓰면, 마우스를 올리고 뗄 때마다 색이나 크기가 "뚝" 바뀌지 않고 부드럽게 변해요.</p>`
        },
        {
          h: '스스로 계속 움직이기: @keyframes',
          html: `<p><code>@keyframes 이름 { 0% {...} 100% {...} }</code>으로 "시작 모습"과 "끝 모습"(그 사이도 가능해요)을 정의하고, <code>animation: 이름 시간 infinite;</code>로 그 요소에 애니메이션을 걸 수 있어요. <code>infinite</code>는 "무한 반복"이라는 뜻이에요.</p>`,
          code: {
            label: 'keyframes.css',
            lang: 'css',
            src: `@keyframes bounce {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

.ball {
  animation: bounce 1s infinite;
}`
          },
          after: `<div class="note"><b>차이</b> — transition은 "값이 바뀔 때"만 부드럽게 움직이고, animation(@keyframes)은 아무 일이 없어도 스스로 계속 움직여요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const sec = pick([0.2, 0.3, 0.5, 1]);
          return {
            type: 'blank',
            q: `배경색이 바뀔 때 ${sec}초 동안 부드럽게 변하도록 만들려고 해요. 빈칸을 채우세요.`,
            prefix: '.box { transition: background-color ', suffix: '; }', accept: [`${sec}s`], placeholder: '시간',
            why: `<code>transition: background-color ${sec}s;</code>는 배경색이 바뀔 때 ${sec}초에 걸쳐 부드럽게 변하게 해요.`,
            hint: '초 단위 뒤에 s를 붙여서 시간을 나타내요.'
          };
        },
        () => makeChoice(
          '마우스를 요소 위에 올렸을 때의 스타일을 정의하는 선택자는?',
          '<code>:hover</code>', ['<code>:active</code>', '<code>:focus</code>', '<code>:visited</code>'],
          '<code>:hover</code>는 마우스를 올렸을 때 적용되는 스타일을 정해요.',
          '"위에 맴돌다"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `애니메이션의 "시작 모습"과 "끝 모습"을 정의하는 CSS 문법을 쓰세요.`,
          prefix: '', suffix: ' bounce { 0% {...} 100% {...} }', accept: ['@keyframes'], placeholder: '문법',
          why: '<code>@keyframes 이름 { ... }</code>으로 애니메이션의 각 단계를 정의해요.',
          hint: '"주요 장면(핵심 프레임)"이라는 뜻의 영어 단어 조합에 골뱅이(@)를 붙여요.'
        }),
        () => makeChoice(
          '애니메이션을 무한히 반복하게 만드는 값은?',
          '<code>infinite</code>', ['<code>forever</code>', '<code>loop</code>', '<code>repeat</code>'],
          '<code>animation: 이름 시간 infinite;</code>에서 <code>infinite</code>는 "무한히"라는 뜻이에요.',
          '"끝이 없는"이라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'code',
          preview: true,
          q: '<code>.box</code>에 <code>transition: transform 0.3s;</code>을 주고, <code>.box:hover</code>일 때 <code>transform: scale(1.2);</code>(1.2배 커지기)이 되도록 CSS를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: '.box {\n  transition: transform 0.3s;\n}\n.box:hover {\n  transform: scale(1.2);\n}',
          accept: ['.box {transition: transform 0.3s;}\n.box:hover {transform: scale(1.2);}'],
          why: 'transition으로 transform이 바뀔 때 부드럽게 변하도록 하고, :hover에서 scale(1.2)로 커지게 해요.',
          hint: '.box { transition: transform 0.3s; }와 .box:hover { transform: scale(1.2); }를 순서대로 쓰세요.'
        }),
      ],
      boss: () => {
        const sec = pick([0.2, 0.5, 1]);
        const scale = pick([1.1, 1.2, 1.5]);
        const correct = `.box { transition: transform ${sec}s; } .box:hover { transform: scale(${scale}); }`;
        const distractors = [
          `.box { transition: transform ${sec}s; } .box:active { transform: scale(${scale}); }`,
          `.box:hover { transition: transform ${sec}s; transform: scale(${scale}); }`,
          `.box { animation: transform ${sec}s; } .box:hover { transform: scale(${scale}); }`,
        ];
        return makeChoice(
          `마우스를 올렸을 때 ${scale}배로 커지되, ${sec}초 동안 부드럽게 커지도록 만들려고 해요. 올바른 CSS는?`,
          `<code>${correct}</code>`, distractors.map(d => `<code>${d}</code>`),
          `부드러운 변화는 <code>transition</code>을 평소 상태(.box)에 주고, 실제로 커지는 값은 <code>:hover</code> 상태에 <code>transform: scale(...)</code>로 정의해요.`,
          'transition은 평소 상태에, 실제로 바뀔 값은 :hover 상태에 쓰는 걸 떠올려보세요.'
        );
      }
    },
    {
      id: 'positionBasics',
      title: 'position: relative, absolute, fixed, sticky',
      ready: true,
      summary: '요소를 원하는 위치에 정확히 놓기 위한 position 속성의 네 가지 값을 배워요.',
      goals: ['relative로 기준점 만들기', 'absolute로 부모 기준 배치', 'fixed로 화면에 고정하기', 'sticky로 스크롤하다 붙이기'],
      blocks: [
        {
          h: '기준점 만들기: relative',
          html: `<p>요소는 원래 <code>position: static;</code>(기본값)이라, <code>top</code>/<code>left</code> 같은 값을 줘도 아무 효과가 없어요. <code>position: relative;</code>를 주면 요소는 원래 있던 자리 그대로 있으면서, 그 안의 <code>absolute</code> 요소들의 "기준점"이 되어줘요.</p>`,
          code: {
            label: 'relative.css',
            lang: 'css',
            src: `.wrap {
  position: relative;
}
.badge {
  position: absolute;
  top: 0;
  right: 0;
}`
          }
        },
        {
          h: '부모 기준 정확한 위치에: absolute',
          html: `<p><code>position: absolute;</code>인 요소는 <code>position</code>이 static이 아닌 가장 가까운 조상 요소를 기준으로, <code>top</code>/<code>right</code>/<code>bottom</code>/<code>left</code> 값만큼 정확히 위치가 정해져요.</p>`,
          code: {
            label: 'absolute.html',
            lang: 'html',
            src: `<div class="wrap">
  <div class="photo"></div>
  <span class="badge">NEW</span>
</div>

<style>
.wrap { position: relative; width: 120px; }
.photo { width: 120px; height: 80px; background: khaki; border-radius: 6px; }
.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: tomato;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}
</style>`,
            preview: `<style>body{font-family:sans-serif;margin:14px}.wrap{position:relative;width:120px}.photo{width:120px;height:80px;background:khaki;border-radius:6px}.badge{position:absolute;top:8px;right:8px;background:tomato;color:white;padding:2px 8px;border-radius:4px;font-size:12px}</style><div class="wrap"><div class="photo"></div><span class="badge">NEW</span></div>`
          }
        },
        {
          h: '화면에 고정: fixed, 스크롤하다 딱 붙기: sticky',
          html: `<p><code>fixed</code>는 스크롤을 해도 항상 화면(뷰포트)의 같은 자리에 그대로 있어요(맨 위 고정 메뉴바 등). <code>sticky</code>는 평소엔 원래 자리에 있다가, 스크롤해서 지정한 위치(<code>top: 0</code> 등)에 닿으면 그 자리에 딱 붙어서 멈춰요.</p>`,
          code: {
            label: 'fixed_sticky.css',
            lang: 'css',
            src: `.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
}

.section-title {
  position: sticky;
  top: 0;
}`
          },
          after: `<div class="note"><b>정리</b> — static(기본, 위치 지정 불가) → relative(기준점, 원래 자리 유지) → absolute(부모 기준 정확한 위치) → fixed(화면 기준 고정) → sticky(평소엔 보통, 스크롤하면 고정)</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>position: absolute;</code>인 요소의 위치 기준이 되는 것은?',
          'position이 static이 아닌(relative 등) 가장 가까운 조상 요소', ['항상 화면(뷰포트) 전체', '바로 다음에 오는 형제 요소', '항상 <body> 태그'],
          'absolute 요소는 static이 아닌 가장 가까운 조상을 기준으로 위치가 정해져요. 그런 조상이 없으면 body 기준이 돼요.',
          '그래서 부모에 position: relative;를 자주 걸어두는 거예요.'
        ),
        () => ({
          type: 'blank',
          q: `스크롤을 해도 화면(뷰포트)의 항상 같은 자리에 고정해두고 싶을 때 쓰는 position 값을 쓰세요. (맨 위 메뉴바 등)`,
          prefix: '.top-bar { position: ', suffix: '; top: 0; }', accept: ['fixed'], placeholder: '값',
          why: '<code>position: fixed;</code>는 스크롤해도 항상 화면의 같은 자리에 있어요.',
          hint: '"고정된"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '뱃지를 부모 상자의 오른쪽 위 모서리에 정확히 붙이려고 할 때 필요한 조합은?',
          '부모에 <code>position: relative;</code>, 뱃지에 <code>position: absolute; top: 0; right: 0;</code>', ['부모와 뱃지 모두 <code>position: fixed;</code>', '부모에 <code>display: flex;</code>만 주면 된다', '뱃지에만 <code>margin: 0;</code>을 주면 된다'],
          '부모가 기준점(relative) 역할을 하고, 뱃지는 그 기준으로 absolute + top/right 값을 줘야 정확히 원하는 모서리에 붙어요.',
          '기준점을 만드는 쪽과, 그 기준으로 위치를 정하는 쪽을 각각 생각해보세요.'
        ),
        () => ({
          type: 'code',
          preview: true,
          q: '<code>.wrap</code>에 <code>position: relative;</code>를, <code>.badge</code>에 <code>position: absolute; top: 0; right: 0;</code>를 지정하는 CSS를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: '.wrap {\n  position: relative;\n}\n.badge {\n  position: absolute;\n  top: 0;\n  right: 0;\n}',
          accept: ['.wrap {position: relative;}\n.badge {position: absolute;top: 0;right: 0;}'],
          why: '.wrap을 기준점(relative)으로 만들고, .badge를 그 기준으로 absolute + top/right로 우측 상단에 배치해요.',
          hint: '.wrap { position: relative; }와 .badge { position: absolute; top: 0; right: 0; }를 순서대로 쓰세요.'
        }),
      ],
      boss: () => {
        const corner = pick([
          { name: '왼쪽 위', css: 'top: 0; left: 0;' },
          { name: '오른쪽 아래', css: 'bottom: 0; right: 0;' },
        ]);
        return {
          type: 'blank',
          q: `<code>.wrap</code>(부모)에 <code>position: relative;</code>가 있어요. 그 안의 <code>.badge</code>를 부모의 ${corner.name} 모서리에 정확히 붙이려고 해요. <code>.badge</code>에 필요한 CSS 선언들을 순서대로 쓰세요. (position부터)`,
          prefix: '.badge { position: absolute; ', suffix: ' }', accept: [corner.css], placeholder: 'CSS 선언들',
          why: `${corner.name} 모서리에 붙이려면 <code>${corner.css}</code>를 지정해야 해요.`,
          hint: '원하는 모서리에 맞는 두 방향(위/아래, 왼쪽/오른쪽) 값을 0으로 주면 돼요.'
        };
      }
    },
    {
      id: 'zIndexStacking',
      title: 'z-index와 쌓임 순서',
      ready: true,
      summary: '요소들이 겹칠 때 어느 것이 위에 보일지 정하는 z-index를 배워요.',
      goals: ['z-index로 쌓임 순서 정하기', '숫자가 클수록 위로', 'position이 있어야 z-index가 적용됨'],
      blocks: [
        {
          h: '겹쳐진 요소의 순서 정하기: z-index',
          html: `<p>여러 요소가 겹쳐 있을 때, <code>z-index</code> 값이 <b>클수록 화면 앞쪽(위)</b>에 보여요. 값이 없으면 기본적으로 HTML에 나중에 쓴 요소가 위에 와요.</p>`,
          code: {
            label: 'z_index.css',
            lang: 'css',
            src: `.background {
  position: absolute;
  z-index: 1;
}
.foreground {
  position: absolute;
  z-index: 2;
}`
          }
        },
        {
          h: '주의: position이 없으면 z-index는 무시돼요',
          html: `<p><code>z-index</code>는 <code>position</code>이 <code>static</code>(기본값)이 <b>아닌</b> 요소에만 적용돼요. static인 요소에 z-index만 덜렁 줘도 아무 효과가 없어요.</p>`,
          code: {
            label: 'no_effect.css',
            lang: 'css',
            src: `.box {
  z-index: 10; /* position이 없으면(static이면) 아무 효과 없음! */
}`
          },
          after: `<div class="note"><b>팁</b> — z-index가 안 먹힌다면, 가장 먼저 그 요소에 position(relative/absolute/fixed/sticky)이 있는지부터 확인해보세요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const a = randInt(1, 10);
          const b = randInt(1, 10) + a;
          const swap = Math.random() < 0.5;
          const first = swap ? b : a;
          const second = swap ? a : b;
          return {
            type: 'blank',
            q: `<code>.a { position: absolute; z-index: ${first}; }</code>와 <code>.b { position: absolute; z-index: ${second}; }</code>가 겹쳐 있어요. 어느 클래스의 요소가 위에 보일까요? (a 또는 b)`,
            prefix: '', suffix: '', accept: [first > second ? 'a' : 'b'], placeholder: 'a / b',
            why: `z-index는 값이 클수록 위에 보이므로, ${Math.max(first, second)}인 쪽이 위에 와요.`,
            hint: 'z-index 숫자가 더 큰 쪽이 화면 앞쪽(위)에 보여요.'
          };
        },
        () => makeChoice(
          'z-index가 실제로 효과를 내려면 그 요소에 필요한 것은?',
          'static이 아닌 position 값(relative, absolute, fixed, sticky 등)', ['display: flex;', 'width와 height가 반드시 지정되어 있어야 함', 'z-index는 조건 없이 항상 적용됨'],
          'z-index는 position이 static(기본값)이 아닌 요소에만 적용돼요.',
          'static인 요소에 z-index만 주면 조용히 무시돼요.'
        ),
        () => makeChoice(
          'z-index 값이 서로 같거나 둘 다 없을 때, 어느 요소가 위에 보일까요?',
          'HTML에 나중에 쓴 요소', ['항상 첫 번째로 쓴 요소', '항상 무작위로 정해짐', '둘 다 안 보이게 됨'],
          'z-index가 같거나 없으면, 문서에서 나중에 등장한(나중에 쓴) 요소가 기본적으로 위에 와요.',
          '"나중에 그린 것이 앞에 온다"는 그림 그리기 순서를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>.modal</code>이 <code>.overlay</code>보다 항상 위에 보이도록, 두 요소 모두 <code>position: absolute;</code>인 상태에서 <code>.modal</code>에 <code>z-index: 100;</code>을 지정하는 CSS를 작성하세요.',
          starter: '',
          placeholder: '.modal {\n  position: absolute;\n  z-index: 100;\n}',
          accept: ['.modal {position: absolute;z-index: 100;}'],
          why: 'position이 있는 상태에서 z-index를 높게 주면 다른 요소들보다 위에 보여요.',
          hint: '.modal { position: absolute; z-index: 100; } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const hasPosition = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `<code>.tooltip { ${hasPosition ? 'position: absolute; ' : ''}z-index: 999; }</code>${hasPosition ? '' : ' (position은 지정하지 않았어요, 즉 기본값 static이에요)'}일 때, z-index: 999가 실제로 효과를 낼까요? (예/아니오)`,
          prefix: '', suffix: '', accept: [hasPosition ? '예' : '아니오'], placeholder: '예 / 아니오',
          why: hasPosition
            ? 'position: absolute;가 있으므로 z-index가 정상적으로 적용돼요.'
            : 'position이 static(기본값)이므로, z-index 값을 아무리 크게 줘도 무시돼요.',
          hint: 'z-index는 position이 static이 아닌 요소에만 효과가 있어요.'
        };
      }
    },
    {
      id: 'boxSizingBorderBox',
      title: 'box-sizing: border-box',
      ready: true,
      summary: 'width에 padding과 border가 포함되는지 안 되는지를 정하는 box-sizing을 배워요.',
      goals: ['기본값 content-box의 문제', 'border-box로 예측 가능하게 만들기', '실무에서 자주 쓰는 초기화 패턴'],
      blocks: [
        {
          h: '문제: padding을 더하면 상자가 커져요',
          html: `<p>기본값(<code>content-box</code>)에서 <code>width</code>는 <b>내용물만의 너비</b>예요. 그래서 <code>padding</code>이나 <code>border</code>를 추가하면, 실제 눈에 보이는 전체 크기는 지정한 width보다 <b>더 커져요</b>.</p>`,
          code: {
            label: 'content_box.css',
            lang: 'css',
            src: `.box {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
  /* 실제 전체 너비 = 200 + 20*2 + 2*2 = 244px */
}`
          }
        },
        {
          h: '해결: box-sizing: border-box',
          html: `<p><code>box-sizing: border-box;</code>를 주면, padding과 border가 지정한 <code>width</code> <b>안쪽으로</b> 포함돼서, width가 곧 눈에 보이는 전체 너비가 돼요.</p>`,
          code: {
            label: 'border_box.css',
            lang: 'css',
            src: `.box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 2px solid black;
  /* 실제 전체 너비 = 200px 그대로! */
}`
          },
          after: `<div class="note"><b>실무 팁</b> — 그래서 대부분의 실무 CSS는 맨 위에 <code>* { box-sizing: border-box; }</code>를 넣어서, 모든 요소가 처음부터 예측 가능하게 동작하도록 만들어둬요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const width = pick([100, 150, 200]);
          const padding = pick([10, 15, 20]);
          const border = pick([1, 2, 3]);
          const total = width + padding * 2 + border * 2;
          return {
            type: 'blank',
            q: `기본값(<code>content-box</code>)에서 <code>width: ${width}px; padding: ${padding}px; border: ${border}px solid black;</code>일 때, 실제로 화면에서 차지하는 전체 너비는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
            why: `content-box에서는 width에 양쪽 padding(${padding}×2)과 양쪽 border(${border}×2)가 더해져서 ${width} + ${padding * 2} + ${border * 2} = ${total}px이에요.`,
            hint: 'content-box에서는 padding과 border가 width 밖에 추가로 더해져요(양쪽 다 있으니 2배씩요).'
          };
        },
        () => makeChoice(
          '<code>box-sizing: border-box;</code>가 하는 일로 알맞은 것은?',
          'padding과 border를 지정한 width 안쪽으로 포함시켜서, width가 곧 전체 크기가 되게 한다', ['padding과 border를 아예 없앤다', 'width를 항상 자동(auto)으로 만든다', '요소의 배경색을 투명하게 만든다'],
          'border-box는 padding/border를 width 안에 포함시켜서 크기 계산을 훨씬 예측하기 쉽게 만들어줘요.',
          '"테두리까지 포함한 상자"라는 이름 그대로예요.'
        ),
        () => {
          const width = pick([100, 150, 200]);
          const padding = pick([10, 15, 20]);
          return {
            type: 'blank',
            q: `<code>box-sizing: border-box;</code>인 상태에서 <code>width: ${width}px; padding: ${padding}px;</code>일 때, 실제로 화면에서 차지하는 전체 너비는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(width)], placeholder: '숫자',
            why: `border-box에서는 padding이 width 안쪽으로 포함되므로, 전체 너비는 지정한 ${width}px 그대로예요.`,
            hint: 'border-box는 padding/border가 이미 width 안에 포함돼요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>.box</code>에 <code>box-sizing: border-box;</code>를 지정하는 CSS를 작성하세요.',
          starter: '',
          placeholder: '.box {\n  box-sizing: border-box;\n}',
          accept: ['.box {box-sizing: border-box;}'],
          why: '<code>box-sizing: border-box;</code>를 지정하면 padding/border가 width 안에 포함돼요.',
          hint: '.box { box-sizing: border-box; } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const width = pick([120, 180, 240]);
        const padding = pick([12, 16, 24]);
        const border = pick([2, 4]);
        const isBorderBox = Math.random() < 0.5;
        const total = isBorderBox ? width : width + padding * 2 + border * 2;
        return {
          type: 'blank',
          q: `<code>box-sizing: ${isBorderBox ? 'border-box' : 'content-box'}; width: ${width}px; padding: ${padding}px; border: ${border}px solid black;</code>일 때, 실제 전체 너비는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
          why: isBorderBox
            ? `border-box이므로 padding/border가 width 안에 포함되어 전체 너비는 ${width}px 그대로예요.`
            : `content-box(기본값)이므로 ${width} + ${padding * 2}(양쪽 padding) + ${border * 2}(양쪽 border) = ${total}px이에요.`,
          hint: 'box-sizing 값에 따라 padding/border가 width 안에 포함되는지 아닌지가 갈려요.'
        };
      }
    },
    {
      id: 'flexboxAdvanced',
      title: 'Flexbox 심화: 방향, 줄바꿈, 세로 정렬',
      ready: true,
      summary: 'Flexbox의 방향을 바꾸고, 줄바꿈을 허용하고, 세로 방향으로 정렬하는 방법을 배워요.',
      goals: ['flex-direction: column', 'flex-wrap: wrap', 'align-items로 교차축(세로) 정렬'],
      blocks: [
        {
          h: '세로로 쌓기: flex-direction',
          html: `<p><code>flex-direction</code>의 기본값은 <code>row</code>(가로)예요. <code>column</code>을 주면 요소들이 세로로 쌓여요. 이때 <code>justify-content</code>는 "주축" 방향(row면 가로, column이면 세로)을 정렬한다는 점에 주의하세요.</p>`,
          code: {
            label: 'flex_column.css',
            lang: 'css',
            src: `.list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}`
          }
        },
        {
          h: '공간이 부족하면 다음 줄로: flex-wrap',
          html: `<p>기본값(<code>nowrap</code>)은 요소가 다 안 들어가도 억지로 한 줄에 구겨 넣어요. <code>flex-wrap: wrap;</code>을 주면, 한 줄에 다 안 들어갈 때 자동으로 다음 줄로 넘어가요.</p>`,
          code: {
            label: 'flex_wrap.css',
            lang: 'css',
            src: `.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}`
          }
        },
        {
          h: '교차축(세로) 정렬: align-items',
          html: `<p><code>justify-content</code>가 주축(보통 가로) 정렬이라면, <code>align-items</code>는 <b>교차축(보통 세로)</b> 정렬을 담당해요. 둘을 함께 쓰면 가로·세로 모두 원하는 대로 정렬할 수 있어요.</p>`,
          code: {
            label: 'align_items.html',
            lang: 'html',
            src: `<div class="row">
  <div class="tag">A</div>
  <div class="tag">BB</div>
</div>

<style>
.row {
  display: flex;
  align-items: center;
  height: 80px;
  gap: 8px;
}
.tag { background: khaki; padding: 6px 10px; border-radius: 6px; }
</style>`,
            preview: `<style>body{font-family:sans-serif;margin:14px}.row{display:flex;align-items:center;height:80px;gap:8px;border:1px dashed #ccc}.tag{background:khaki;padding:6px 10px;border-radius:6px}</style><div class="row"><div class="tag">A</div><div class="tag">BB</div></div>`
          },
          after: `<div class="note"><b>정리</b> — justify-content: 주축 정렬(기본은 가로), align-items: 교차축 정렬(기본은 세로).</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `Flexbox 요소들을 가로가 아니라 세로로 쌓으려고 해요. 빈칸을 채우세요.`,
          prefix: '.list { display: flex; flex-direction: ', suffix: '; }', accept: ['column'], placeholder: '값',
          why: '<code>flex-direction: column;</code>은 요소들을 세로로 쌓아요.',
          hint: '"세로줄, 기둥"을 뜻하는 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>flex-wrap: wrap;</code>의 효과로 알맞은 것은?',
          '한 줄에 요소가 다 안 들어가면 자동으로 다음 줄로 넘어간다', ['요소들을 무조건 한 줄로 압축한다', '요소들의 순서를 무작위로 섞는다', 'gap 속성을 무시하게 만든다'],
          'flex-wrap: wrap은 공간이 부족할 때 요소를 억지로 구겨넣지 않고, 다음 줄로 넘겨줘요.',
          '기본값(nowrap)과 정반대의 동작이에요.'
        ),
        () => ({
          type: 'blank',
          q: `Flexbox 컨테이너 안의 요소들을 세로(교차축) 방향으로 가운데 정렬하려고 해요. 빈칸을 채우세요.`,
          prefix: '.row { display: flex; align-items: ', suffix: '; }', accept: ['center'], placeholder: '값',
          why: '<code>align-items: center;</code>는 교차축(보통 세로) 방향으로 요소들을 가운데 정렬해요.',
          hint: 'justify-content에서 가운데 정렬할 때 쓰던 그 값과 같아요.'
        }),
        () => ({
          type: 'code',
          preview: true,
          q: '<code>.list</code>에 <code>display: flex;</code>, <code>flex-direction: column;</code>, <code>gap: 8px;</code>를 지정하는 CSS를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: '.list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}',
          accept: ['.list {display: flex;flex-direction: column;gap: 8px;}'],
          why: 'flex-direction: column으로 세로 정렬 방향을 만들고, gap으로 간격을 줘요.',
          hint: '.list { } 안에 세 속성을 순서대로 넣으세요.'
        }),
      ],
      boss: () => {
        const gapPx = pick([8, 12, 16]);
        const correct = `display: flex; flex-direction: column; align-items: center; gap: ${gapPx}px;`;
        const distractors = [
          `display: flex; flex-direction: row; align-items: center; gap: ${gapPx}px;`,
          `display: flex; flex-direction: column; justify-content: center; gap: ${gapPx}px;`,
          `display: block; flex-direction: column; align-items: center; gap: ${gapPx}px;`,
        ];
        return makeChoice(
          `요소들을 세로로 쌓되, 가로 방향(교차축)으로는 가운데 정렬하고, ${gapPx}px 간격을 주려고 해요. 올바른 CSS 선언들은?`,
          `<code>${correct}</code>`, distractors.map(d => `<code>${d}</code>`),
          `세로로 쌓으려면 <code>flex-direction: column</code>, column일 때 가로(교차축) 정렬은 <code>align-items</code>로 해요.`,
          'flex-direction이 column이면, 가로 방향 정렬을 담당하는 건 justify-content가 아니라 align-items예요.'
        );
      }
    },
    {
      id: 'gridTemplateAreas',
      title: 'CSS Grid 심화: grid-template-areas',
      ready: true,
      summary: '이름을 붙인 영역으로 페이지 전체 레이아웃(헤더/사이드바/본문/푸터)을 한눈에 그리는 grid-template-areas를 배워요.',
      goals: ['grid-area로 영역 이름 붙이기', 'grid-template-areas로 배치 그리기', '레이아웃을 그림처럼 표현하기'],
      blocks: [
        {
          h: '각 요소에 영역 이름 붙이기: grid-area',
          html: `<p>각 요소에 <code>grid-area: 이름;</code>으로 이름표를 붙여둬요.</p>`,
          code: {
            label: 'grid_area.css',
            lang: 'css',
            src: `.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }`
          }
        },
        {
          h: '이름들로 배치를 그림처럼 그리기: grid-template-areas',
          html: `<p>부모에 <code>grid-template-areas</code>로 그 이름들을 문자열로 배치하면, 마치 그림을 그리듯 레이아웃을 표현할 수 있어요. 같은 이름을 여러 칸에 반복하면(예: <code>"header header"</code>) 그 영역이 그만큼 넓게 차지해요.</p>`,
          code: {
            label: 'grid_areas.html',
            lang: 'html',
            src: `<div class="wrap">
  <div class="header">헤더</div>
  <div class="sidebar">사이드바</div>
  <div class="main">본문</div>
  <div class="footer">푸터</div>
</div>

<style>
.wrap {
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  gap: 6px;
}
.header { grid-area: header; background: skyblue; }
.sidebar { grid-area: sidebar; background: khaki; }
.main { grid-area: main; background: lightgreen; }
.footer { grid-area: footer; background: lightpink; }
</style>`,
            preview: `<style>body{font-family:sans-serif;margin:14px}.wrap{display:grid;grid-template-columns:100px 1fr;grid-template-areas:"header header" "sidebar main" "footer footer";gap:6px;text-align:center}.header{grid-area:header;background:skyblue;padding:10px}.sidebar{grid-area:sidebar;background:khaki;padding:10px}.main{grid-area:main;background:lightgreen;padding:10px}.footer{grid-area:footer;background:lightpink;padding:10px}</style><div class="wrap"><div class="header">헤더</div><div class="sidebar">사이드바</div><div class="main">본문</div><div class="footer">푸터</div></div>`
          },
          after: `<div class="note"><b>정리</b> — 숫자로 열/행 번호를 세는 것보다, 이름으로 그림처럼 그리는 게 훨씬 직관적이고 나중에 수정하기도 쉬워요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['header', 'sidebar', 'footer']);
          return {
            type: 'blank',
            q: `<code>.${name}</code> 요소를 <code>grid-template-areas</code>의 "${name}" 영역에 배치하려고 해요. <code>.${name}</code>에 필요한 CSS를 완성하세요.`,
            prefix: `.${name} { grid-area: `, suffix: '; }', accept: [name], placeholder: '영역 이름',
            why: `<code>grid-area</code> 값은 <code>grid-template-areas</code>에서 쓴 이름과 정확히 같아야 해요.`,
            hint: '클래스 이름과 영역 이름이 똑같아요.'
          };
        },
        () => makeChoice(
          '<code>grid-template-areas</code>의 장점으로 알맞은 것은?',
          '레이아웃을 문자열로 그림처럼 표현할 수 있어서 직관적이다', ['다른 grid 속성 없이 이것만으로 모든 배치가 가능하다', 'flexbox보다 항상 코드가 짧다', '반응형 디자인이 자동으로 적용된다'],
          '숫자로 열/행 번호를 세는 대신, "header header" / "sidebar main"처럼 문자열로 배치를 시각적으로 그릴 수 있어요.',
          '코드를 보기만 해도 레이아웃 모양이 눈에 그려지는 게 핵심 장점이에요.'
        ),
        () => ({
          type: 'blank',
          q: `헤더가 사이드바와 본문 두 칸 모두를 가로질러 차지하게 만들려면, <code>grid-template-areas</code>의 첫 줄을 어떻게 써야 할까요? (따옴표 포함해서 그대로)`,
          prefix: '', suffix: '', accept: ['"header header"'], placeholder: '"header header"',
          why: '같은 이름("header")을 두 칸에 반복해서 쓰면, 그 영역이 두 칸을 모두 차지해요.',
          hint: '두 칸을 모두 차지하게 하려면 이름을 두 번 나란히 써야 해요.'
        }),
        () => ({
          type: 'code',
          q: '<code>.sidebar</code> 요소를 <code>grid-template-areas</code>의 "sidebar" 영역에 배치하는 CSS를 작성하세요.',
          starter: '',
          placeholder: '.sidebar {\n  grid-area: sidebar;\n}',
          accept: ['.sidebar {grid-area: sidebar;}'],
          why: '<code>grid-area: sidebar;</code>로 이 요소를 "sidebar" 영역에 배치해요.',
          hint: '.sidebar { grid-area: sidebar; } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const correct = `grid-template-areas:\n    "header header"\n    "sidebar main"\n    "footer footer";`;
        const distractors = [
          `grid-template-areas:\n    "header sidebar"\n    "main main"\n    "footer footer";`,
          `grid-template-areas:\n    "sidebar header"\n    "sidebar main"\n    "footer footer";`,
          `grid-template-columns:\n    "header header"\n    "sidebar main"\n    "footer footer";`,
        ];
        return makeChoice(
          `헤더가 맨 위 전체를, 그 아래 왼쪽엔 사이드바, 오른쪽엔 본문이, 맨 아래엔 푸터가 전체를 차지하는 레이아웃을 만들려고 해요. 올바른 <code>grid-template-areas</code>는?`,
          `<code>${correct}</code>`, distractors.map(d => `<code>${d}</code>`),
          '각 줄이 실제 화면의 한 "행"을 나타내고, 같은 이름이 나란히 있으면 그 영역이 그 칸들을 모두 차지해요.',
          '헤더와 푸터는 전체 너비를, 사이드바와 본문은 나란히 반씩 나눠 가진다는 걸 그림으로 그려보세요.'
        );
      }
    },
    {
      id: 'cssVariables',
      title: 'CSS 변수(Custom Properties)',
      ready: true,
      summary: '반복해서 쓰는 값에 이름을 붙여두고 재사용하는 CSS 변수를 배워요.',
      goals: ['--이름으로 변수 선언', 'var()로 값 사용하기', ':root에 전역 변수 두기'],
      blocks: [
        {
          h: '값에 이름 붙이기: --변수',
          html: `<p><code>--이름: 값;</code>으로 변수를 선언하고, <code>var(--이름)</code>으로 그 값을 어디서든 꺼내 쓸 수 있어요. <code>:root</code>는 문서 전체를 가리키는 선택자라서, 여기 선언하면 페이지 어디서든 쓸 수 있는 "전역 변수"가 돼요.</p>`,
          code: {
            label: 'css_variables.css',
            lang: 'css',
            src: `:root {
  --main-color: royalblue;
}

.title {
  color: var(--main-color);
}
.button {
  background-color: var(--main-color);
}`
          }
        },
        {
          h: '한 곳만 고치면 전체가 바뀌어요',
          html: `<p><code>--spacing</code> 값 하나만 바꾸면, 그 변수를 쓰는 모든 곳이 한 번에 바뀌어요. 디자인을 통일하고 유지보수하기 훨씬 쉬워져요.</p>`,
          code: {
            label: 'reuse.css',
            lang: 'css',
            src: `:root {
  --spacing: 16px;
}
.card { padding: var(--spacing); }
.section { margin-bottom: var(--spacing); }`
          },
          after: `<div class="note"><b>팁</b> — 색상, 여백처럼 여러 곳에서 반복되는 값은 변수로 빼두면, 나중에 디자인을 통째로 바꿀 때 훨씬 편해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const color = pick(['royalblue', 'tomato', 'seagreen']);
          return {
            type: 'blank',
            q: `<code>:root { --main-color: ${color}; }</code>이고 <code>.title { color: var(--main-color); }</code>일 때, <code>.title</code>의 실제 글자 색은? (영어 그대로)`,
            prefix: '', suffix: '', accept: [color], placeholder: '색 이름',
            why: `var(--main-color)는 --main-color에 저장된 값 "${color}"를 그대로 가져와요.`,
            hint: 'var(--이름)은 그 변수에 저장된 값을 그대로 대신 써요.'
          };
        },
        () => makeChoice(
          'CSS 변수를 선언할 때 이름 앞에 붙이는 것은?',
          '하이픈 두 개(<code>--</code>)', ['달러 기호(<code>$</code>)', '골뱅이(<code>@</code>)', '샵(<code>#</code>)'],
          'CSS 변수(사용자 정의 속성)는 <code>--이름: 값;</code>처럼 하이픈 두 개로 시작해요.',
          'Sass의 $나 CSS at-rule의 @와는 다른 기호예요.'
        ),
        () => makeChoice(
          '변수를 <code>:root</code>에 선언하는 이유는?',
          '문서 전체 어디서나 쓸 수 있는 전역 변수로 만들기 위해', ['그 변수를 다른 곳에서 못 쓰게 숨기기 위해', 'CSS 파일의 실행 속도를 높이기 위해', '변수를 한 번만 쓸 수 있게 제한하기 위해'],
          ':root는 문서 전체를 가리키는 선택자라서, 여기 선언한 변수는 페이지 어디서든 var()로 꺼내 쓸 수 있어요.',
          '"뿌리(root)"에 심어두면 나무 전체(문서 전체)에서 접근할 수 있다고 생각하면 돼요.'
        ),
        () => ({
          type: 'code',
          q: '<code>:root</code>에 <code>--main-color</code>를 <code>royalblue</code>로 선언하고, <code>.title</code>의 <code>color</code>를 그 변수로 지정하는 CSS를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: ':root {\n  --main-color: royalblue;\n}\n.title {\n  color: var(--main-color);\n}',
          accept: [':root {--main-color: royalblue;}\n.title {color: var(--main-color);}'],
          why: ':root에 변수를 선언하고, var(--main-color)로 그 값을 가져와 써요.',
          hint: ':root { --main-color: royalblue; } 다음에 .title { color: var(--main-color); }를 쓰세요.'
        }),
      ],
      boss: () => {
        const spacing = pick([8, 12, 16, 24]);
        return {
          type: 'blank',
          q: `<code>:root { --spacing: ${spacing}px; }</code>이고 <code>.card { padding: var(--spacing); }</code>, <code>.section { margin-bottom: var(--spacing); }</code>일 때, <code>.card</code>의 <code>padding</code> 값은? (px 포함)`,
          prefix: '', suffix: '', accept: [`${spacing}px`], placeholder: '값',
          why: `var(--spacing)는 --spacing에 저장된 값 ${spacing}px을 그대로 가져와요.`,
          hint: '두 곳 모두 같은 변수를 쓰므로 값도 똑같아요.'
        };
      }
    },
    {
      id: 'cssSpecificity',
      title: 'CSS 우선순위: specificity',
      ready: true,
      summary: '같은 요소에 여러 스타일이 겹칠 때, 어느 것이 이기는지를 정하는 우선순위 규칙을 배워요.',
      goals: ['선택자별 우선순위 등급', 'id > class > 태그 순서', '순위가 같으면 나중에 쓴 게 이김'],
      blocks: [
        {
          h: '규칙이 겹칠 때: 더 구체적인 게 이겨요',
          html: `<p>한 요소에 여러 CSS 규칙이 동시에 적용될 수 있어요. 이때 CSS는 <b>더 구체적인</b> 선택자를 우선해요. 대략 <code>아이디(#) &gt; 클래스(.) &gt; 태그</code> 순서로 우선순위가 높아요.</p>`,
          code: {
            label: 'specificity.css',
            lang: 'css',
            src: `p { color: blue; }
.title { color: green; }
#main-title { color: red; }
/* <p id="main-title" class="title">면 결과는 red */`
          }
        },
        {
          h: '순위가 같으면? 나중에 쓴 게 이겨요',
          html: `<p>우선순위 등급이 똑같으면(예: 클래스끼리 겹침), CSS에서 <b>나중에</b> 나온 규칙이 이겨요. 그래서 규칙을 쓰는 순서도 중요해요.</p>`,
          code: {
            label: 'order.css',
            lang: 'css',
            src: `.title { color: green; }
.title { color: purple; } /* 이게 이김(나중에 나옴) */`
          },
          after: `<div class="note"><b>정리</b> — 우선순위: 아이디 &gt; 클래스 &gt; 태그. 등급이 같으면 나중에 쓴 규칙이 이겨요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const hasId = Math.random() < 0.5;
          return {
            type: 'blank',
            q: hasId
              ? `<code>&lt;p id="main-title" class="title"&gt;안녕&lt;/p&gt;</code>이 있고, <code>p { color: blue; } .title { color: green; } #main-title { color: red; }</code>가 있을 때, 실제 글자 색은? (영어로)`
              : `<code>&lt;p class="title"&gt;안녕&lt;/p&gt;</code>이 있고, <code>p { color: blue; } .title { color: green; }</code>가 있을 때, 실제 글자 색은? (영어로)`,
            prefix: '', suffix: '', accept: hasId ? ['red'] : ['green'], placeholder: '색 이름',
            why: hasId
              ? '아이디 선택자(#main-title)가 클래스나 태그보다 우선순위가 높아서 red가 이겨요.'
              : '클래스 선택자(.title)가 태그 선택자(p)보다 우선순위가 높아서 green이 이겨요.',
            hint: '아이디 > 클래스 > 태그 순서로 우선순위가 높아요.'
          };
        },
        () => makeChoice(
          'CSS 선택자의 우선순위(specificity) 등급을 높은 순서대로 나열하면?',
          '아이디(#) &gt; 클래스(.) &gt; 태그', ['태그 &gt; 클래스(.) &gt; 아이디(#)', '클래스(.) &gt; 아이디(#) &gt; 태그', '모두 우선순위가 동일하다'],
          '일반적으로 아이디 선택자가 클래스보다, 클래스가 태그 선택자보다 우선순위가 높아요.',
          '더 "구체적으로 콕 집어" 고를수록 우선순위가 높다고 생각하면 돼요.'
        ),
        () => makeChoice(
          '<code>.title { color: green; }</code>과 <code>.title { color: purple; }</code>이 이 순서로 같이 있을 때, 실제로 적용되는 색은?',
          'purple', ['green', '둘 다 적용된다', '아무 색도 적용되지 않는다'],
          '우선순위 등급이 똑같으면, CSS에서 나중에 나온 규칙이 이겨요.',
          '두 규칙의 "구체성"은 완전히 같으니, 순서로 승부가 갈려요.'
        ),
        () => ({
          type: 'code',
          q: '<code>.title { color: green; }</code>이 이미 있는 상태에서, 그 아래에 색을 <code>purple</code>로 덮어쓰는 같은 선택자 규칙을 추가하세요.',
          starter: '',
          placeholder: '.title {\n  color: purple;\n}',
          accept: ['.title {color: purple;}'],
          why: '같은 선택자(.title)를 나중에 다시 쓰면, 나중 규칙이 이겨서 덮어써요.',
          hint: '.title { color: purple; } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const useId = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `<code>&lt;h2 id="pageTitle" class="heading"&gt;환영합니다&lt;/h2&gt;</code>이 있고, <code>h2 { color: gray; } .heading { color: blue; } ${useId ? '#pageTitle { color: crimson; }' : ''}</code>가 있을 때, 실제 글자 색은? (영어로)`,
          prefix: '', suffix: '', accept: [useId ? 'crimson' : 'blue'], placeholder: '색 이름',
          why: useId
            ? '아이디 선택자(#pageTitle)가 가장 구체적이므로 crimson이 이겨요.'
            : '아이디 규칙이 없으므로, 클래스(.heading)가 태그(h2)보다 우선순위가 높아 blue가 이겨요.',
          hint: '있는 규칙들 중 가장 구체적인 선택자를 찾아보세요.'
        };
      }
    },
    {
      id: 'pseudoElements',
      title: '가상 요소: ::before와 ::after',
      ready: true,
      summary: '실제 HTML 태그 없이, CSS만으로 요소 앞뒤에 내용을 추가하는 가상 요소를 배워요.',
      goals: ['::before/::after로 내용 추가하기', 'content 속성이 반드시 필요함', '장식용 요소 만들기'],
      blocks: [
        {
          h: '요소 앞뒤에 내용 추가하기',
          html: `<p><code>::before</code>와 <code>::after</code>는 실제 HTML 태그를 추가하지 않고도, CSS만으로 요소의 앞/뒤에 내용을 넣을 수 있게 해줘요.</p>`,
          code: {
            label: 'pseudo_before_after.css',
            lang: 'css',
            src: `.quote::before {
  content: "\\201C";
}
.quote::after {
  content: "\\201D";
}`
          }
        },
        {
          h: '실전: 링크 뒤에 화살표 붙이기',
          html: `<p>실제로는 화살표나 아이콘을 장식으로 붙일 때 자주 써요. HTML을 건드리지 않고 CSS만으로 추가할 수 있다는 게 장점이에요.</p>`,
          code: {
            label: 'arrow.css',
            lang: 'css',
            src: `.link::after {
  content: " →";
}`
          },
          after: `<div class="note"><b>주의</b> — <code>::before</code>/<code>::after</code>는 반드시 <code>content</code> 속성이 있어야 화면에 나타나요(아무 내용이 없어도 <code>content: "";</code>는 꼭 필요해요).</div>`
        }
      ],
      quizGenerators: [
        () => {
          const arrow = pick([' →', ' ▶', ' »']);
          return {
            type: 'blank',
            q: `<code>.link::after { content: "${arrow}"; }</code>일 때, <code>&lt;a class="link"&gt;더보기&lt;/a&gt;</code>는 화면에서 어떻게 보일까요? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`더보기${arrow}`], placeholder: '화면에 보이는 글자',
            why: `::after는 요소의 내용 뒤에 content 값을 그대로 덧붙이므로 "더보기${arrow}"가 돼요.`,
            hint: '::after는 원래 내용 뒤에 content 값을 이어붙여요.'
          };
        },
        () => makeChoice(
          '<code>::before</code>/<code>::after</code>가 화면에 나타나려면 반드시 필요한 속성은?',
          '<code>content</code>', ['<code>display</code>', '<code>position</code>', '<code>color</code>'],
          'content 속성이 없으면(또는 지정하지 않으면) ::before/::after는 아예 화면에 나타나지 않아요.',
          '"내용"이 없으면 보여줄 게 없다는 뜻이에요.'
        ),
        () => makeChoice(
          '<code>::before</code>/<code>::after</code>로 추가한 내용의 특징으로 알맞은 것은?',
          '실제 HTML 요소가 아니라, CSS로만 화면에 표시되는 가상의 내용이다', ['자바스크립트로 자유롭게 조작할 수 있는 실제 DOM 요소다', 'HTML 소스 코드에 자동으로 추가된다', '스크린 리더가 항상 그대로 읽어준다'],
          '::before/::after는 실제 HTML 문서에는 존재하지 않는, 화면 표시용 가상 요소예요.',
          '"가상(pseudo)"이라는 이름 그대로, 진짜 요소가 아니에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>.link</code> 요소의 뒤에 <code>" →"</code>를 추가하는 <code>::after</code> 규칙을 작성하세요.',
          starter: '',
          placeholder: '.link::after {\n  content: " →";\n}',
          accept: ['.link::after {content: " →";}'],
          why: '::after의 content에 원하는 텍스트를 넣으면 요소 뒤에 그대로 붙어요.',
          hint: '.link::after { content: " →"; } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const label = pick(['필수', 'NEW', '할인']);
        return {
          type: 'blank',
          q: `<code>.field::after { content: " (${label})"; }</code>이고 <code>&lt;label class="field"&gt;이름&lt;/label&gt;</code>이 있을 때, 화면에 보이는 글자는? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`이름 (${label})`], placeholder: '화면에 보이는 글자',
          why: `::after의 content 값이 원래 글자 "이름" 뒤에 그대로 이어붙어서 "이름 (${label})"이 돼요.`,
          hint: '::after는 요소의 실제 내용 뒤에 content를 이어붙여요.'
        };
      }
    },
    {
      id: 'pseudoClassesAdvanced',
      title: '가상 클래스 심화: :nth-child, :not',
      ready: true,
      summary: '몇 번째 요소인지, 또는 특정 조건을 제외하고 선택하는 가상 클래스를 배워요.',
      goals: [':nth-child(n)로 순서 선택', ':nth-child(2n)로 짝수/홀수 선택', ':not()으로 제외하기'],
      blocks: [
        {
          h: '몇 번째 요소인지로 선택하기: :nth-child',
          html: `<p><code>:nth-child(숫자)</code>는 그 순서의 자식만 선택해요. <code>:nth-child(2n)</code>은 짝수 번째(2, 4, 6...), <code>:nth-child(2n+1)</code>은 홀수 번째(1, 3, 5...)를 선택해요.</p>`,
          code: {
            label: 'nth_child.css',
            lang: 'css',
            src: `li:nth-child(1) {
  font-weight: bold;
}
li:nth-child(2n) {
  background: #f0f0f0;
}`
          }
        },
        {
          h: '제외하고 선택하기: :not()',
          html: `<p><code>:not(선택자)</code>는 그 조건에 <b>해당하지 않는</b> 요소만 선택해요. 예를 들어 <code>.disabled</code>가 아닌 버튼에만 손가락 커서를 적용하는 식으로 자주 써요.</p>`,
          code: {
            label: 'not_selector.css',
            lang: 'css',
            src: `button:not(.disabled) {
  cursor: pointer;
}`
          },
          after: `<div class="note"><b>정리</b> — :nth-child로 "몇 번째인지" 고르고, :not으로 "이건 빼고" 고를 수 있어요. 둘 다 표나 목록을 꾸밀 때 아주 자주 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const items = ['사과', '바나나', '포도', '수박', '딸기'];
          return {
            type: 'blank',
            q: `<code>&lt;li&gt;사과&lt;/li&gt;&lt;li&gt;바나나&lt;/li&gt;&lt;li&gt;포도&lt;/li&gt;&lt;li&gt;수박&lt;/li&gt;&lt;li&gt;딸기&lt;/li&gt;</code>에 <code>li:nth-child(2n) { background: #f0f0f0; }</code>을 적용하면, 배경색이 칠해지는 항목들은? (쉼표로 구분)`,
            prefix: '', suffix: '', accept: [`${items[1]}, ${items[3]}`, `${items[1]},${items[3]}`], placeholder: '항목, 항목',
            why: `2n은 짝수 번째(2번째, 4번째)를 뜻하므로, "${items[1]}"(2번째)과 "${items[3]}"(4번째)가 선택돼요.`,
            hint: '2n은 2, 4, 6...번째(짝수 번째)를 뜻해요.'
          };
        },
        () => makeChoice(
          '<code>:nth-child(2n+1)</code>이 선택하는 것은?',
          '홀수 번째 요소(1, 3, 5...)', ['짝수 번째 요소(2, 4, 6...)', '마지막 요소 하나만', '첫 번째 요소 하나만'],
          '2n+1은 n에 0, 1, 2...를 넣으면 1, 3, 5...가 되므로 홀수 번째를 선택해요.',
          '2n이 짝수라면, 2n+1은 그보다 하나씩 더 큰 홀수예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>button:not(.disabled) { cursor: pointer; }</code>이 뜻하는 것을 설명하면? ("disabled 클래스가 없는 버튼에만 적용된다"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['disabled 클래스가 없는 버튼에만 적용된다'], placeholder: '설명',
          why: ':not(.disabled)는 .disabled 클래스가 없는 요소만 골라서, 그런 버튼에만 cursor: pointer가 적용돼요.',
          hint: ':not()은 그 안의 조건에 "해당하지 않는" 것만 골라요.'
        }),
        () => ({
          type: 'code',
          q: '<code>li</code> 중 짝수 번째 요소에만 <code>background: #eee;</code>를 지정하는 CSS를 작성하세요.',
          starter: '',
          placeholder: 'li:nth-child(2n) {\n  background: #eee;\n}',
          accept: ['li:nth-child(2n) {background: #eee;}'],
          why: ':nth-child(2n)은 짝수 번째 요소만 선택해요.',
          hint: 'li:nth-child(2n) { background: #eee; } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const isNotDisabled = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `<code>button:not(.disabled) { opacity: 1; }</code>이 있고, <code>&lt;button class="${isNotDisabled ? 'primary' : 'disabled'}"&gt;확인&lt;/button&gt;</code>이 있어요. 이 버튼에 <code>opacity: 1;</code>이 적용될까요? (예/아니오)`,
          prefix: '', suffix: '', accept: [isNotDisabled ? '예' : '아니오'], placeholder: '예 / 아니오',
          why: isNotDisabled
            ? '이 버튼은 disabled 클래스가 없으므로 :not(.disabled) 조건에 맞아 적용돼요.'
            : '이 버튼은 disabled 클래스를 가지고 있으므로 :not(.disabled) 조건에서 제외돼 적용되지 않아요.',
          hint: ':not(.disabled)는 disabled 클래스가 "없는" 요소만 선택해요.'
        };
      }
    },
    {
      id: 'shadowEffects',
      title: 'box-shadow와 text-shadow',
      ready: true,
      summary: '상자와 글자에 그림자를 넣어 입체감을 주는 box-shadow와 text-shadow를 배워요.',
      goals: ['box-shadow의 값 순서(x y blur color)', 'text-shadow로 글자에 그림자', '그림자로 입체감 주기'],
      blocks: [
        {
          h: '상자에 그림자: box-shadow',
          html: `<p><code>box-shadow</code>의 값은 순서대로 <b>가로 이동, 세로 이동, 흐림 정도, 색</b>을 뜻해요. 세로 이동이 클수록 그림자가 더 아래로 처지고, 흐림(blur) 값이 클수록 가장자리가 부드러워져요.</p>`,
          code: {
            label: 'box_shadow.css',
            lang: 'css',
            src: `.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}`
          }
        },
        {
          h: '글자에 그림자: text-shadow',
          html: `<p><code>text-shadow</code>도 값 순서가 비슷해요(가로, 세로, 흐림, 색). 제목 글자를 살짝 입체적으로 보이게 하거나, 밝은 배경 위 흰 글자를 더 읽기 쉽게 만드는 데 자주 써요.</p>`,
          code: {
            label: 'text_shadow.css',
            lang: 'css',
            src: `.title {
  text-shadow: 2px 2px 4px gray;
}`
          },
          after: `<div class="note"><b>정리</b> — box-shadow와 text-shadow 모두 "가로 세로 흐림 색" 순서를 기억해두면 헷갈리지 않아요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const y = pick([2, 4, 6, 8]);
          return {
            type: 'blank',
            q: `상자를 아래로 ${y}px만큼 떨어뜨린 그림자를 만들려고 해요(가로 이동 없음, 흐림 8px, 검은색 반투명). 빈칸을 채우세요.`,
            prefix: '.card { box-shadow: 0 ', suffix: 'px 8px rgba(0,0,0,0.2); }', accept: [String(y)], placeholder: '숫자',
            why: `box-shadow의 두 번째 값이 세로 이동이므로, ${y}px을 그 자리에 써요.`,
            hint: 'box-shadow의 값 순서는 가로, 세로, 흐림, 색이에요.'
          };
        },
        () => makeChoice(
          '<code>box-shadow: 0 4px 8px rgba(0,0,0,0.2);</code>에서 값들의 순서로 알맞은 것은?',
          '가로 이동, 세로 이동, 흐림 정도, 색', ['색, 흐림 정도, 세로 이동, 가로 이동', '흐림 정도, 가로 이동, 세로 이동, 색', '세로 이동, 가로 이동, 흐림 정도, 색'],
          'box-shadow는 "가로 이동 세로이동 흐림 색" 순서로 값을 써요.',
          '왼쪽부터 순서대로 "얼마나 옆으로, 얼마나 아래로, 얼마나 흐리게"예요.'
        ),
        () => {
          const color = pick(['gray', 'black', 'navy']);
          return {
            type: 'blank',
            q: `제목 글자에 가로 2px, 세로 2px, 흐림 4px, 색 ${color}인 그림자를 넣으려고 해요. 빈칸을 채우세요.`,
            prefix: '.title { text-shadow: 2px 2px 4px ', suffix: '; }', accept: [color], placeholder: '색',
            why: `text-shadow의 마지막 값이 색이므로 ${color}를 그 자리에 써요.`,
            hint: 'text-shadow도 box-shadow처럼 마지막 값이 색이에요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>.card</code>에 가로 이동 없이, 세로 4px, 흐림 8px, 색 <code>rgba(0,0,0,0.2)</code>인 <code>box-shadow</code>를 지정하는 CSS를 작성하세요.',
          starter: '',
          placeholder: '.card {\n  box-shadow: 0 4px 8px rgba(0,0,0,0.2);\n}',
          accept: ['.card {box-shadow: 0 4px 8px rgba(0,0,0,0.2);}'],
          why: 'box-shadow: 가로 세로 흐림 색 순서로 값을 나열해요.',
          hint: '.card { box-shadow: 0 4px 8px rgba(0,0,0,0.2); } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const blur = pick([4, 8, 12]);
        return {
          type: 'blank',
          q: `<code>.card { box-shadow: 0 4px ${blur}px rgba(0,0,0,0.3); }</code>일 때, 이 그림자의 흐림(blur) 정도는 몇 px일까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(blur)], placeholder: '숫자',
          why: `box-shadow의 세 번째 값이 흐림 정도이므로 ${blur}px이에요.`,
          hint: '가로, 세로 다음에 오는 세 번째 값이 흐림 정도예요.'
        };
      }
    },
    {
      id: 'cssUnitsResponsive',
      title: 'CSS 단위: rem, em과 clamp()',
      ready: true,
      summary: '화면 크기나 부모 요소에 따라 자동으로 조절되는 상대 단위와, 반응형 폰트 크기를 만드는 clamp()를 배워요.',
      goals: ['px vs rem vs em', 'rem은 항상 루트 기준', 'clamp()로 최소/권장/최대 크기 정하기'],
      blocks: [
        {
          h: '고정 크기 px, 상대 크기 rem과 em',
          html: `<p><code>px</code>는 항상 고정된 크기예요. <code>rem</code>은 항상 <code>html</code>(루트) 요소의 <code>font-size</code>를 기준으로 계산되고(부모가 무엇이든 상관없이 일정해요), <code>em</code>은 <b>그 요소의 부모</b> font-size를 기준으로 계산돼요.</p>`,
          code: {
            label: 'units.css',
            lang: 'css',
            src: `html { font-size: 16px; }

.title {
  font-size: 2rem; /* 16px * 2 = 32px */
}
.box {
  font-size: 1.5em; /* 부모 글자 크기의 1.5배 */
}`
          }
        },
        {
          h: '화면 크기에 따라 자동으로: clamp()',
          html: `<p><code>clamp(최소, 권장, 최대)</code>는 "화면이 작으면 최소값까지, 크면 최대값까지, 그 사이는 권장값(보통 <code>vw</code> 단위)을 따르라"는 뜻이에요. 미디어 쿼리를 여러 개 안 써도 화면 크기에 맞춰 부드럽게 글자 크기가 조절돼요.</p>`,
          code: {
            label: 'clamp.css',
            lang: 'css',
            src: `h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
}`
          },
          after: `<div class="note"><b>정리</b> — em은 부모마다 다시 계산되어 중첩되면 값이 계속 곱해질 수 있어서 헷갈리기 쉬워요. 그래서 실무에서는 rem을 더 자주 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const rootSize = 16;
          const rem = pick([1, 1.5, 2, 2.5]);
          return {
            type: 'blank',
            q: `<code>html { font-size: ${rootSize}px; }</code>이고 <code>.title { font-size: ${rem}rem; }</code>일 때, <code>.title</code>의 실제 글자 크기는 몇 px일까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(rootSize * rem)], placeholder: '숫자',
            why: `rem은 항상 루트(html)의 font-size를 기준으로 계산되므로 ${rootSize} × ${rem} = ${rootSize * rem}px이에요.`,
            hint: 'rem은 부모가 아니라 항상 html(루트)의 font-size를 기준으로 계산돼요.'
          };
        },
        () => makeChoice(
          'rem과 em의 차이로 알맞은 것은?',
          'rem은 항상 루트(html)의 font-size를 기준으로 계산되지만, em은 그 요소의 부모 font-size를 기준으로 계산된다', ['rem은 항상 고정된 px 값과 같다', 'em은 화면 너비를 기준으로 계산된다', '둘은 완전히 같은 방식으로 계산된다'],
          'rem은 루트 기준이라 어디서든 일정하지만, em은 부모마다 달라질 수 있어서 중첩되면 계산이 복잡해질 수 있어요.',
          '"r"em의 r은 root(루트)를 뜻한다고 기억하면 헷갈리지 않아요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>clamp(1.5rem, 4vw, 3rem)</code>에서 각 값이 순서대로 뜻하는 것을 설명하면? ("최소값, 권장값, 최대값"이라고 답하세요)`,
          prefix: '', suffix: '', accept: ['최소값, 권장값, 최대값'], placeholder: '설명',
          why: 'clamp(최소, 권장, 최대)는 화면 크기에 따라 권장값을 따르되, 최소·최대 범위를 벗어나지 않게 해줘요.',
          hint: '괄호 안 세 값의 순서를 그대로 기억하면 돼요.'
        }),
        () => ({
          type: 'code',
          q: '<code>h1</code>의 <code>font-size</code>를 <code>clamp(1rem, 3vw, 2rem)</code>으로 지정하는 CSS를 작성하세요.',
          starter: '',
          placeholder: 'h1 {\n  font-size: clamp(1rem, 3vw, 2rem);\n}',
          accept: ['h1 {font-size: clamp(1rem, 3vw, 2rem);}'],
          why: 'clamp(최소, 권장, 최대) 형태로 반응형 글자 크기를 만들어요.',
          hint: 'h1 { font-size: clamp(1rem, 3vw, 2rem); } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const rootSize = 16;
        const em = pick([1.2, 1.5, 2]);
        const parentPx = pick([16, 20, 24]);
        return {
          type: 'blank',
          q: `<code>.parent { font-size: ${parentPx}px; }</code>이고 그 안의 <code>.child { font-size: ${em}em; }</code>일 때, <code>.child</code>의 실제 글자 크기는 몇 px일까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(Math.round(parentPx * em * 100) / 100)], placeholder: '숫자',
          why: `em은 부모(.parent)의 font-size를 기준으로 계산되므로 ${parentPx} × ${em} = ${Math.round(parentPx * em * 100) / 100}px이에요.`,
          hint: 'em은 rem과 달리, 루트가 아니라 "그 요소의 부모"를 기준으로 계산돼요.'
        };
      }
    },
    {
      id: 'backgroundImages',
      title: '배경 이미지: background-image와 cover',
      ready: true,
      summary: '요소의 배경에 이미지를 깔고, 화면 크기에 맞게 꽉 채우는 background-size를 배워요.',
      goals: ['background-image로 배경 넣기', 'background-size: cover', 'background-position으로 위치 조정'],
      blocks: [
        {
          h: '배경에 이미지 깔기: background-image',
          html: `<p><code>background-image: url("경로");</code>는 요소의 배경에 이미지를 깔아줘요(요소의 내용은 그 위에 그대로 표시돼요). 기본값으로는 이미지 원본 크기 그대로, 부족하면 반복(tile)돼서 채워져요.</p>`,
          code: {
            label: 'background_image.css',
            lang: 'css',
            src: `.hero {
  background-image: url("bg.jpg");
  height: 300px;
}`
          }
        },
        {
          h: '빈틈없이 꽉 채우기: background-size: cover',
          html: `<p><code>background-size: cover;</code>는 이미지 비율을 유지하면서 요소 전체를 빈틈없이 채워요(이미지의 일부가 잘릴 수 있어요). <code>background-position: center;</code>는 잘릴 때 어느 부분을 중심으로 보여줄지 정해요.</p>`,
          code: {
            label: 'cover.css',
            lang: 'css',
            src: `.hero {
  background-image: url("bg.jpg");
  background-size: cover;
  background-position: center;
  height: 300px;
}`
          },
          after: `<div class="note"><b>정리</b> — 배너나 히어로 섹션처럼 "화면 꽉 채우는 배경 사진"을 만들 때는 거의 항상 background-size: cover를 함께 써요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>.hero</code>의 배경에 "bg.jpg" 이미지를 넣으려고 해요. 빈칸을 채우세요.`,
          prefix: '.hero { background-image: url(', suffix: '); }', accept: ['"bg.jpg"', "'bg.jpg'"], placeholder: '"경로"',
          why: '<code>background-image: url("경로");</code>로 배경 이미지를 지정해요.',
          hint: 'url() 괄호 안에 파일 경로를 따옴표로 감싸서 넣어요.'
        }),
        () => makeChoice(
          '<code>background-size: cover;</code>의 효과로 알맞은 것은?',
          '이미지 비율을 유지하면서 요소 전체를 빈틈없이 채운다(일부가 잘릴 수 있음)', ['이미지를 항상 원본 크기 그대로 표시한다', '이미지를 반복해서 타일처럼 채운다', '이미지를 요소 크기에 맞게 비율을 무시하고 늘린다'],
          'cover는 비율을 유지한 채 빈 공간이 없도록 요소를 꽉 채우고, 넘치는 부분은 잘라내요.',
          '"덮다, 다 채우다(cover)"라는 이름 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>background-position: center;</code>이 뜻하는 것을 설명하면? ("이미지가 잘릴 때 가운데 부분을 중심으로 보여준다"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['이미지가 잘릴 때 가운데 부분을 중심으로 보여준다'], placeholder: '설명',
          why: 'background-position은 이미지가 요소보다 커서 일부가 잘릴 때, 어느 부분을 기준으로 보여줄지 정해요.',
          hint: '"어느 위치를 중심으로 보여줄지"를 정하는 속성이에요.'
        }),
        () => ({
          type: 'code',
          q: '<code>.hero</code>에 "bg.jpg"를 배경으로 깔고, <code>background-size: cover;</code>를 지정하는 CSS를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: '.hero {\n  background-image: url("bg.jpg");\n  background-size: cover;\n}',
          accept: ['.hero {background-image: url("bg.jpg");background-size: cover;}'],
          why: 'background-image로 이미지를 지정하고, background-size: cover로 요소를 꽉 채워요.',
          hint: '.hero { background-image: url("bg.jpg"); background-size: cover; } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const height = pick([200, 300, 400]);
        const correct = `background-image: url("bg.jpg"); background-size: cover; background-position: center; height: ${height}px;`;
        const distractors = [
          `background-image: url("bg.jpg"); background-size: contain; background-position: center; height: ${height}px;`,
          `background-image: url("bg.jpg"); background-size: cover; background-repeat: repeat; height: ${height}px;`,
          `background: url("bg.jpg"); background-size: cover; background-position: top-left; height: ${height}px;`,
        ];
        return makeChoice(
          `"bg.jpg"를 배경으로 깔고, 높이 ${height}px인 상자를 이미지로 빈틈없이 꽉 채우면서 가운데를 중심으로 보여주려고 해요. 올바른 CSS는?`,
          `<code>${correct}</code>`, distractors.map(d => `<code>${d}</code>`),
          '빈틈없이 채우려면 cover, 중심을 잡으려면 background-position: center를 함께 써야 해요.',
          '"꽉 채운다"는 값과 "중심을 잡는다"는 값을 각각 떠올려보세요.'
        );
      }
    },
    {
      id: 'overflowScroll',
      title: 'overflow와 스크롤',
      ready: true,
      summary: '내용이 상자보다 클 때 어떻게 보여줄지 정하는 overflow 속성을 배워요.',
      goals: ['overflow: hidden으로 잘라내기', 'overflow: scroll/auto로 스크롤 만들기', '가로/세로 각각 지정하기'],
      blocks: [
        {
          h: '넘치면 잘라내기: overflow: hidden',
          html: `<p>내용이 상자 크기보다 크면, 원래는 상자 밖으로 삐져나와요. <code>overflow: hidden;</code>은 넘치는 부분을 그냥 잘라내서 안 보이게 해요.</p>`,
          code: {
            label: 'overflow_hidden.css',
            lang: 'css',
            src: `.box {
  width: 200px;
  height: 100px;
  overflow: hidden;
}`
          }
        },
        {
          h: '스크롤 만들기: scroll과 auto',
          html: `<p><code>overflow: scroll;</code>은 넘치지 않아도 항상 스크롤바를 보여주고, <code>overflow: auto;</code>는 내용이 실제로 넘칠 때만 스크롤바를 보여줘요(보통 auto를 더 자주 써요). <code>overflow-x</code>/<code>overflow-y</code>로 가로·세로를 따로 지정할 수도 있어요.</p>`,
          code: {
            label: 'overflow_auto.css',
            lang: 'css',
            src: `.box {
  height: 150px;
  overflow-y: auto;
}`
          },
          after: `<div class="note"><b>정리</b> — hidden(잘라내고 숨김), scroll(항상 스크롤바), auto(필요할 때만 스크롤바) 세 가지를 상황에 맞게 골라 써요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `상자보다 큰 내용이 밖으로 삐져나오지 않게, 넘치는 부분을 잘라서 숨기려고 해요. 빈칸을 채우세요.`,
          prefix: '.box { overflow: ', suffix: '; }', accept: ['hidden'], placeholder: '값',
          why: '<code>overflow: hidden;</code>은 넘치는 내용을 잘라서 안 보이게 해요.',
          hint: '"숨겨진, 감춰진"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>overflow: auto;</code>와 <code>overflow: scroll;</code>의 차이로 알맞은 것은?',
          'auto는 내용이 실제로 넘칠 때만 스크롤바를 보여주지만, scroll은 넘치지 않아도 항상 스크롤바를 보여준다', ['auto는 스크롤을 아예 막고, scroll만 스크롤을 허용한다', '둘은 완전히 같은 동작을 한다', 'auto는 가로 스크롤만, scroll은 세로 스크롤만 지원한다'],
          'auto는 필요할 때만, scroll은 항상 스크롤바가 보이는 차이가 있어요.',
          '"필요할 때만"과 "항상"의 차이를 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `세로 방향으로만 스크롤을 허용하려고 해요(가로는 그대로 두고). 빈칸을 채우세요.`,
          prefix: '.box { overflow-', suffix: ': auto; }', accept: ['y'], placeholder: 'x 또는 y',
          why: '<code>overflow-y</code>는 세로 방향의 넘침만 다뤄요.',
          hint: '가로는 x축, 세로는 y축이에요.'
        }),
        () => ({
          type: 'code',
          q: '<code>.box</code>의 넘치는 내용을 잘라서 숨기는 CSS를 작성하세요.',
          starter: '',
          placeholder: '.box {\n  overflow: hidden;\n}',
          accept: ['.box {overflow: hidden;}'],
          why: 'overflow: hidden;은 상자 밖으로 넘치는 내용을 잘라서 안 보이게 해요.',
          hint: '.box { overflow: hidden; } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const isOverflowing = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `<code>.box { height: 100px; overflow-y: auto; }</code>인 상자 안에 내용이 ${isOverflowing ? '150px만큼(상자보다 크게)' : '80px만큼(상자보다 작게)'} 있어요. 세로 스크롤바가 보일까요? (예/아니오)`,
          prefix: '', suffix: '', accept: [isOverflowing ? '예' : '아니오'], placeholder: '예 / 아니오',
          why: isOverflowing
            ? '내용(150px)이 상자 높이(100px)보다 크므로, auto는 실제로 넘칠 때 스크롤바를 보여줘요.'
            : '내용(80px)이 상자 높이(100px)보다 작으므로, 넘치지 않아 auto는 스크롤바를 보여주지 않아요.',
          hint: 'overflow: auto는 내용이 실제로 넘칠 때만 스크롤바가 나타나요.'
        };
      }
    },
    {
      id: 'metaTagsSeo',
      title: '메타 태그와 SEO 기초',
      ready: true,
      summary: '검색엔진과 브라우저 탭에 페이지 정보를 알려주는 메타 태그의 기본을 배워요.',
      goals: ['<title>과 meta description', 'favicon 연결하기', 'SEO의 기본 개념'],
      blocks: [
        {
          h: '페이지 제목과 설명: title, meta description',
          html: `<p><code>&lt;title&gt;</code>은 브라우저 탭과 검색 결과의 제목으로 쓰여요. <code>&lt;meta name="description"&gt;</code>은 검색 결과에서 제목 아래 나오는 짧은 설명 문구로 쓰여요. 둘 다 검색엔진최적화(SEO)의 가장 기본이에요.</p>`,
          code: {
            label: 'meta_basic.html',
            lang: 'html',
            src: `<head>
  <title>코드공방 - 프로그래밍 배우기</title>
  <meta name="description" content="파이썬, 자바스크립트 등을 쉽게 배우는 사이트">
</head>`
          }
        },
        {
          h: '브라우저 탭 아이콘: favicon',
          html: `<p><code>&lt;link rel="icon" href="..."&gt;</code>으로 브라우저 탭에 보이는 작은 아이콘(파비콘)을 연결해요. 사이트를 여러 개 탭으로 열어놨을 때 서로 구분하기 쉽게 해줘요.</p>`,
          code: {
            label: 'favicon.html',
            lang: 'html',
            src: `<link rel="icon" href="favicon.ico">`
          },
          after: `<div class="note"><b>정리</b> — title, description, favicon은 사용자가 직접 눈으로 보는 부분은 아니지만, 검색 결과와 브라우저 탭에서 "이 페이지가 무엇인지" 알려주는 중요한 정보예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const siteName = pick(['코드공방', '나의 블로그', '온라인 쇼핑몰']);
          return {
            type: 'blank',
            q: `브라우저 탭과 검색 결과에 "${siteName}"라는 제목이 나오게 하려고 해요. 빈칸을 채우세요.`,
            prefix: '<title>', suffix: '</title>', accept: [siteName], placeholder: '제목',
            why: `<code>&lt;title&gt;</code> 태그 안의 글자가 브라우저 탭과 검색 결과의 제목으로 쓰여요.`,
            hint: '문제에서 말한 제목을 그대로 태그 사이에 쓰면 돼요.'
          };
        },
        () => makeChoice(
          '<code>&lt;meta name="description" content="..."&gt;</code>의 역할로 알맞은 것은?',
          '검색 결과에서 제목 아래 나오는 짧은 설명 문구를 정한다', ['페이지의 배경색을 정한다', '브라우저 탭의 아이콘을 정한다', '페이지의 언어를 강제로 바꾼다'],
          'meta description은 검색엔진이 검색 결과에 보여줄 설명 문구로 쓰여요.',
          '검색했을 때 제목 아래 나오는 그 짧은 요약 글이에요.'
        ),
        () => ({
          type: 'blank',
          q: `브라우저 탭에 "favicon.ico"라는 아이콘을 연결하려고 해요. 빈칸을 채우세요.`,
          prefix: '<link rel="icon" href="', suffix: '">', accept: ['favicon.ico'], placeholder: '경로',
          why: '<code>&lt;link rel="icon" href="경로"&gt;</code>로 파비콘을 연결해요.',
          hint: '문제에서 말한 파일 이름을 그대로 큰따옴표 안에 쓰면 돼요.'
        }),
        () => ({
          type: 'code',
          q: '제목이 "나의 웹사이트"인 <code>&lt;title&gt;</code> 태그를 작성하세요.',
          starter: '',
          placeholder: '<title>나의 웹사이트</title>',
          accept: ['<title>나의 웹사이트</title>'],
          why: '<code>&lt;title&gt;내용&lt;/title&gt;</code> 형태로 페이지 제목을 정해요.',
          hint: '<title>나의 웹사이트</title> 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const title = pick(['맛집 지도', '취미 공유방', '독서 노트']);
        const desc = pick(['근처 맛집을 지도에서 찾아보세요', '취미를 함께 나누는 공간입니다', '읽은 책을 기록하고 공유해요']);
        return {
          type: 'blank',
          q: `제목이 "${title}"이고, 검색 결과 설명이 "${desc}"인 페이지를 만들려고 해요. <code>&lt;head&gt;</code> 안에 들어갈 두 태그를 순서대로(title 먼저) 작성하세요.`,
          prefix: '', suffix: '', accept: [`<title>${title}</title>\n<meta name="description" content="${desc}">`], placeholder: '두 태그',
          why: `<code>&lt;title&gt;${title}&lt;/title&gt;</code>과 <code>&lt;meta name="description" content="${desc}"&gt;</code>를 함께 써야 해요.`,
          hint: 'title 태그 다음 줄에 meta description 태그를 쓰세요.'
        };
      }
    },
    {
      id: 'formsAdvanced',
      title: '폼 심화: select, textarea, checkbox, radio',
      ready: true,
      summary: '드롭다운, 여러 줄 입력, 체크박스, 라디오 버튼 같은 다양한 입력 요소를 배워요.',
      goals: ['select와 option으로 드롭다운', 'textarea로 여러 줄 입력', 'checkbox와 radio의 차이'],
      blocks: [
        {
          h: '여러 선택지 중 하나: select와 option',
          html: `<p><code>&lt;select&gt;</code> 안에 여러 개의 <code>&lt;option&gt;</code>을 넣으면 드롭다운 목록이 만들어져요. 사용자가 그중 하나를 골라요.</p>`,
          code: {
            label: 'select.html',
            lang: 'html',
            src: `<select>
  <option value="seoul">서울</option>
  <option value="busan">부산</option>
</select>`,
            preview: `<style>body{font-family:sans-serif;margin:14px}</style><select><option value="seoul">서울</option><option value="busan">부산</option></select>`
          }
        },
        {
          h: '여러 줄 입력: textarea',
          html: `<p>한 줄이 아니라 길게 여러 줄로 입력받고 싶을 땐 <code>&lt;input&gt;</code> 대신 <code>&lt;textarea&gt;</code>를 써요. <code>rows</code>로 기본 보이는 줄 수를 정해요.</p>`,
          code: {
            label: 'textarea.html',
            lang: 'html',
            src: `<textarea rows="4" placeholder="후기를 남겨주세요"></textarea>`,
            preview: `<style>body{font-family:sans-serif;margin:14px}</style><textarea rows="4" placeholder="후기를 남겨주세요"></textarea>`
          }
        },
        {
          h: '여러 개 선택 vs 하나만 선택: checkbox와 radio',
          html: `<p><code>checkbox</code>는 여러 개를 동시에 체크할 수 있어요. <code>radio</code>는 같은 <code>name</code>을 가진 것들 중 <b>딱 하나만</b> 선택할 수 있어요 — name이 같아야 서로 "그룹"으로 묶여서 하나만 선택되게 동작해요.</p>`,
          code: {
            label: 'checkbox_radio.html',
            lang: 'html',
            src: `<input type="checkbox" id="agree"> <label for="agree">약관에 동의합니다</label>

<input type="radio" name="size" value="s"> <label>S</label>
<input type="radio" name="size" value="m"> <label>M</label>`,
            preview: `<style>body{font-family:sans-serif;margin:14px;display:flex;flex-direction:column;gap:8px}</style><div><input type="checkbox" id="agree"> <label for="agree">약관에 동의합니다</label></div><div><input type="radio" name="size" value="s"> <label>S</label> <input type="radio" name="size" value="m"> <label>M</label></div>`
          },
          after: `<div class="note"><b>정리</b> — radio 버튼들이 같은 그룹으로 묶이려면 <code>name</code> 속성 값이 정확히 같아야 해요. name이 다르면 각각 따로 선택돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const city = pick(['seoul', 'busan', 'daegu']);
          const ko = { seoul: '서울', busan: '부산', daegu: '대구' }[city];
          return {
            type: 'blank',
            q: `드롭다운에 "${ko}"라는 선택지를 추가하려고 해요(값은 "${city}"). 빈칸을 채우세요.`,
            prefix: `<option value="${city}">`, suffix: '</option>', accept: [ko], placeholder: '보여줄 글자',
            why: `<code>&lt;option&gt;</code> 태그 사이의 글자가 드롭다운에 보이는 텍스트예요.`,
            hint: '태그 사이에 화면에 보일 한글 이름을 그대로 쓰면 돼요.'
          };
        },
        () => makeChoice(
          'checkbox와 radio의 차이로 알맞은 것은?',
          'checkbox는 여러 개를 동시에 선택할 수 있지만, radio는 같은 name 그룹 중 하나만 선택할 수 있다', ['checkbox는 텍스트만 입력받고, radio는 숫자만 입력받는다', '둘은 완전히 같은 기능이다', 'radio만 여러 개를 동시에 선택할 수 있다'],
          'checkbox는 독립적으로 여러 개 체크 가능하지만, radio는 같은 name을 가진 것들끼리 하나만 선택되도록 묶여요.',
          '"여러 개 가능"과 "하나만 가능"의 차이를 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `여러 줄에 걸친 긴 글(예: 후기, 자기소개)을 입력받는 태그 이름을 쓰세요.`,
          prefix: '<', suffix: ' rows="4"></textarea>', accept: ['textarea'], placeholder: '태그 이름',
          why: '<code>&lt;textarea&gt;</code>는 여러 줄의 긴 텍스트를 입력받는 태그예요.',
          hint: '"글(text)"과 "영역(area)"을 합친 이름이에요.'
        }),
        () => ({
          type: 'code',
          q: 'name이 "size"로 같은 라디오 버튼 두 개(값은 각각 "s", "m")를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: '<input type="radio" name="size" value="s">\n<input type="radio" name="size" value="m">',
          accept: ['<input type="radio" name="size" value="s">\n<input type="radio" name="size" value="m">'],
          why: '같은 name("size")을 가진 라디오 버튼들은 하나의 그룹으로 묶여서 그중 하나만 선택돼요.',
          hint: '두 input 모두 type="radio"와 name="size"를 똑같이 쓰고, value만 다르게 하세요.'
        }),
      ],
      boss: () => {
        const sameName = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `<code>&lt;input type="radio" name="plan" value="basic"&gt;</code>과 <code>&lt;input type="radio" name="${sameName ? 'plan' : 'plans'}" value="pro"&gt;</code>이 있어요. 이 둘은 같은 그룹으로 묶여서 하나만 선택되게 동작할까요? (예/아니오)`,
          prefix: '', suffix: '', accept: [sameName ? '예' : '아니오'], placeholder: '예 / 아니오',
          why: sameName
            ? 'name 값이 둘 다 "plan"으로 정확히 같으므로 같은 그룹으로 묶여요.'
            : 'name 값이 "plan"과 "plans"로 서로 다르므로 같은 그룹으로 묶이지 않고 각각 따로 선택돼요.',
          hint: 'radio가 그룹으로 묶이려면 name 값이 글자 하나까지 정확히 같아야 해요.'
        };
      }
    },
    {
      id: 'localStorageBasics',
      title: 'localStorage로 데이터 저장하기',
      ready: true,
      summary: '브라우저를 닫았다 열어도 남아있는 데이터를 저장하는 localStorage를 배워요.',
      goals: ['setItem/getItem으로 저장·불러오기', '문자열만 저장 가능', 'JSON.stringify/parse로 객체 저장하기'],
      blocks: [
        {
          h: '저장하고 불러오기: setItem, getItem',
          html: `<p><code>localStorage.setItem("키", "값")</code>으로 데이터를 저장하고, <code>localStorage.getItem("키")</code>로 다시 꺼내와요. 서버가 아니라 사용자의 브라우저에 저장되기 때문에, 브라우저(같은 사이트)를 닫았다 열어도 데이터가 그대로 남아있어요.</p>`,
          code: {
            label: 'local_storage.js',
            src: `localStorage.setItem("username", "지수");
const name = localStorage.getItem("username");
console.log(name);`
          }
        },
        {
          h: '객체는 문자열로 바꿔서: JSON.stringify / parse',
          html: `<p>localStorage는 <b>문자열만</b> 저장할 수 있어요. 객체나 배열을 저장하려면 <code>JSON.stringify</code>로 문자열로 바꿔서 저장하고, 꺼낼 때는 <code>JSON.parse</code>로 다시 객체로 되돌려야 해요.</p>`,
          code: {
            label: 'json_storage.js',
            src: `const user = { name: "지수", age: 16 };
localStorage.setItem("user", JSON.stringify(user));

const saved = JSON.parse(localStorage.getItem("user"));
console.log(saved.name);`,
            out: `지수`
          },
          after: `<div class="note"><b>정리</b> — 객체를 그냥 setItem에 넣으면 "[object Object]"라는 의미 없는 문자열로 저장돼버려요. 꼭 JSON.stringify를 거쳐야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const value = pick(['지수', '민준', '서연']);
          return {
            type: 'blank',
            q: `<code>localStorage.setItem("username", "${value}"); const name = localStorage.getItem("username");</code>일 때, <code>name</code>의 값은? (그대로 입력)`,
            prefix: '', suffix: '', accept: [value], placeholder: '값',
            why: `setItem으로 저장한 값을 getItem으로 그대로 다시 꺼내오므로 "${value}"예요.`,
            hint: 'getItem은 같은 키로 저장해둔 값을 그대로 돌려줘요.'
          };
        },
        () => makeChoice(
          'localStorage에 저장할 수 있는 데이터 형태로 알맞은 것은?',
          '문자열만 저장할 수 있다(객체/배열은 JSON.stringify로 변환해야 함)', ['객체와 배열도 변환 없이 그대로 저장할 수 있다', '숫자만 저장할 수 있다', '함수도 그대로 저장할 수 있다'],
          'localStorage는 문자열만 저장할 수 있어서, 객체나 배열은 JSON.stringify를 거쳐야 해요.',
          '객체를 그냥 넣으면 "[object Object]"처럼 의미 없는 문자열이 돼버려요.'
        ),
        () => ({
          type: 'blank',
          q: `객체 <code>{ name: "지수" }</code>를 localStorage에 저장하기 전에, 문자열로 바꾸기 위해 써야 하는 함수는?`,
          prefix: 'localStorage.setItem("user", ', suffix: '(user));', accept: ['JSON.stringify'], placeholder: '함수 이름',
          why: '<code>JSON.stringify(객체)</code>는 객체를 저장 가능한 문자열로 바꿔줘요.',
          hint: '"JSON으로 문자열화(stringify)한다"는 뜻의 함수예요.'
        }),
        () => ({
          type: 'code',
          q: '"theme"라는 키에 "dark"라는 값을 localStorage에 저장하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'localStorage.setItem("theme", "dark");',
          accept: ['localStorage.setItem("theme", "dark");'],
          why: 'setItem(키, 값) 형태로 localStorage에 데이터를 저장해요.',
          hint: 'localStorage.setItem("theme", "dark"); 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const name = pick(['지수', '민준']);
        const age = randInt(14, 19);
        return {
          type: 'blank',
          q: `<code>const user = { name: "${name}", age: ${age} }; localStorage.setItem("user", JSON.stringify(user)); const saved = JSON.parse(localStorage.getItem("user"));</code>일 때, <code>saved.age</code>의 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(age)], placeholder: '숫자',
          why: `JSON.stringify로 저장한 객체를 JSON.parse로 그대로 되돌리므로, saved.age는 원래 값 ${age} 그대로예요.`,
          hint: 'stringify → 저장 → parse 과정을 거쳐도 객체의 값은 그대로 유지돼요.'
        };
      }
    },
    {
      id: 'fetchApiDisplay',
      title: 'fetch API로 데이터 가져와 화면에 그리기',
      ready: true,
      summary: '외부 데이터를 가져와서 화면에 실제로 표시하는 fetch API의 기본 흐름을 배워요.',
      goals: ['fetch로 요청 보내기', 'response.json()으로 데이터 꺼내기', '받은 데이터로 HTML 만들기'],
      blocks: [
        {
          h: '데이터 요청하고 받기: fetch',
          html: `<p><code>fetch(주소)</code>는 그 주소로 요청을 보내요. 응답은 바로 쓸 수 있는 형태가 아니라서, <code>response.json()</code>으로 실제 데이터(자바스크립트 객체·배열)로 변환해야 해요.</p>`,
          code: {
            label: 'fetch_basic.js',
            src: `fetch("https://api.example.com/users")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });`
          }
        },
        {
          h: '받은 데이터로 화면 그리기',
          html: `<p>받아온 데이터(배열)를 <code>forEach</code> 등으로 돌면서 HTML 문자열을 만들고, <code>innerHTML</code>에 대입하면 실제 화면에 그려져요. <code>textContent</code>와 달리 <code>innerHTML</code>은 태그(<code>&lt;li&gt;</code> 등)를 진짜 요소로 해석해서 보여줘요.</p>`,
          code: {
            label: 'fetch_render.js',
            src: `fetch("https://api.example.com/users")
  .then(response => response.json())
  .then(users => {
    let html = "";
    users.forEach(user => {
      html += \`<li>\${user.name}</li>\`;
    });
    document.querySelector("#list").innerHTML = html;
  });`
          },
          after: `<div class="note"><b>정리</b> — fetch → response.json() → 받은 데이터로 HTML 문자열 만들기 → innerHTML에 대입, 이 네 단계가 "데이터 가져와서 화면에 그리기"의 기본 흐름이에요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `fetch로 받은 응답을 실제 자바스크립트 데이터로 변환하려고 해요. 빈칸을 채우세요.`,
          prefix: 'fetch("/api/users").then(response => response.', suffix: '());', accept: ['json'], placeholder: '메서드 이름',
          why: '<code>response.json()</code>은 응답 내용을 실제로 쓸 수 있는 자바스크립트 객체·배열로 변환해요.',
          hint: '응답이 "JSON 형식"이라는 걸 떠올려보세요.'
        }),
        () => makeChoice(
          '<code>response.json()</code>이 하는 일로 알맞은 것은?',
          '응답 내용을 자바스크립트에서 바로 쓸 수 있는 객체/배열로 변환한다', ['서버에 새 요청을 다시 보낸다', '응답을 화면에 자동으로 그려준다', '응답 데이터를 삭제한다'],
          'json()은 응답 본문을 파싱해서 실제로 다룰 수 있는 자바스크립트 값으로 만들어줘요.',
          '텍스트 그대로가 아니라, 실제 객체/배열처럼 다루려면 이 과정이 필요해요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>innerHTML</code>과 <code>textContent</code>의 차이를 설명하면? ("innerHTML은 태그를 실제 요소로 해석하고, textContent는 태그도 그냥 글자로 취급한다"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['innerHTML은 태그를 실제 요소로 해석하고, textContent는 태그도 그냥 글자로 취급한다'], placeholder: '설명',
          why: 'innerHTML에 "<li>글자</li>"를 넣으면 실제 <li> 요소가 되지만, textContent에 넣으면 "<li>글자</li>"라는 글자 그대로 보여요.',
          hint: '태그를 "해석"하는지, 그냥 "글자"로 보는지의 차이예요.'
        }),
        () => ({
          type: 'code',
          q: '"/api/items"로 fetch 요청을 보내고, <code>response.json()</code>으로 변환한 뒤 <code>console.log(data)</code>로 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'fetch("/api/items")\n  .then(response => response.json())\n  .then(data => {\n    console.log(data);\n  });',
          accept: ['fetch("/api/items").then(response => response.json()).then(data => {console.log(data);});'],
          why: 'fetch로 요청을 보내고, response.json()으로 변환한 데이터를 다음 then에서 활용해요.',
          hint: 'fetch(...).then(response => response.json()).then(data => { ... }); 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const names = [pick(['지수', '민준']), pick(['서연', '도윤'])];
        return {
          type: 'blank',
          q: `서버에서 <code>[{ "name": "${names[0]}" }, { "name": "${names[1]}" }]</code>을 받아왔고, <code>let html = ""; users.forEach(user => { html += \`&lt;li&gt;\${user.name}&lt;/li&gt;\`; }); document.querySelector("#list").innerHTML = html;</code>를 실행하면, <code>#list</code> 안에 <code>&lt;li&gt;</code> 요소는 몇 개 생길까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: ['2'], placeholder: '숫자',
          why: `users 배열에 항목이 2개 있고, forEach가 그 개수만큼(2번) html에 &lt;li&gt;를 추가하므로 2개예요.`,
          hint: 'forEach는 배열의 각 항목마다 한 번씩 실행돼요.'
        };
      }
    },
    {
      id: 'darkModeToggle',
      title: '다크 모드 만들기',
      ready: true,
      summary: 'CSS 변수와 클래스 토글을 조합해서, 버튼 하나로 밝은/어두운 테마를 바꾸는 다크 모드를 만들어요.',
      goals: ['테마별 CSS 변수 정의', 'classList.toggle로 테마 전환', 'localStorage로 선택 기억하기'],
      blocks: [
        {
          h: '테마별로 다른 변수 값 정의하기',
          html: `<p>밝은 테마와 어두운 테마 각각에 필요한 값을 CSS 변수로 미리 정의해두고, <code>body</code>는 그 변수를 참조하도록 만들어요. <code>body</code>에 <code>.dark</code> 클래스가 붙으면 어두운 값으로 자동 전환돼요.</p>`,
          code: {
            label: 'theme_variables.css',
            lang: 'css',
            src: `:root {
  --bg-color: white;
  --text-color: black;
}
.dark {
  --bg-color: #1a1a1a;
  --text-color: white;
}
body {
  background-color: var(--bg-color);
  color: var(--text-color);
}`
          }
        },
        {
          h: '버튼으로 테마 전환하기',
          html: `<p><code>classList.toggle("dark")</code>로 클래스를 붙였다 뗐다 하면, 앞서 정의해둔 CSS 변수 값이 자동으로 바뀌면서 색이 전환돼요. 여기에 <code>localStorage</code>로 마지막에 고른 테마를 저장해두면, 다음에 다시 방문해도 그 테마가 유지돼요.</p>`,
          code: {
            label: 'toggle_theme.js',
            src: `document.querySelector("#themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});`
          },
          after: `<div class="note"><b>정리</b> — 색상 값을 CSS 변수로 한 곳에 모아두면, 자바스크립트는 클래스 하나만 토글하면 되고 색상 관리는 CSS에서 깔끔하게 끝나요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const wasDark = Math.random() < 0.5;
          return {
            type: 'blank',
            q: `<code>document.body</code>에 <code>dark</code> 클래스가 ${wasDark ? '이미 있는' : '없는'} 상태에서, <code>document.body.classList.toggle("dark");</code>를 실행하면 dark 클래스는 어떻게 될까요? (있음/없음)`,
            prefix: '', suffix: '', accept: [wasDark ? '없음' : '있음'], placeholder: '있음 / 없음',
            why: wasDark
              ? '이미 dark 클래스가 있었으므로 toggle이 그것을 떼어내서 없어져요.'
              : 'dark 클래스가 없었으므로 toggle이 그것을 붙여서 생겨요.',
            hint: 'toggle은 있으면 빼고, 없으면 붙이는 스위치예요.'
          };
        },
        () => makeChoice(
          'CSS 변수와 클래스 토글을 조합해서 다크 모드를 만드는 방식의 장점은?',
          '색상 값을 CSS 한 곳에서 관리하고, 자바스크립트는 클래스 하나만 토글하면 돼서 관리가 쉬워진다', ['자바스크립트 없이도 테마가 자동으로 바뀐다', 'CSS 파일을 여러 개로 나눠야만 동작한다', '서버에 데이터를 저장해야만 동작한다'],
          '색상은 CSS 변수에, 전환 로직은 클래스 토글에 맡기면 역할이 깔끔하게 나뉘어요.',
          '"색상 관리는 CSS, 전환은 JS"로 역할이 나뉘는 게 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `사용자가 마지막에 고른 테마를, 브라우저를 닫았다 열어도 기억하게 하려면 어디에 저장해야 할까요?`,
          prefix: '', suffix: '', accept: ['localStorage'], placeholder: '저장 위치',
          why: 'localStorage에 저장하면, 브라우저를 닫았다 다시 열어도(같은 사이트라면) 데이터가 남아있어요.',
          hint: '브라우저를 꺼도 안 사라지는 저장 공간을 이 강좌에서 배웠어요.'
        }),
        () => ({
          type: 'code',
          q: '<code>#themeBtn</code>을 클릭하면 <code>document.body</code>의 <code>dark</code> 클래스를 토글하는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: 'document.querySelector("#themeBtn").addEventListener("click", () => {\n  document.body.classList.toggle("dark");\n});',
          accept: ['document.querySelector("#themeBtn").addEventListener("click", () => {document.body.classList.toggle("dark");});'],
          why: 'classList.toggle("dark")로 다크 모드 클래스를 붙였다 뗐다 할 수 있어요.',
          hint: 'querySelector로 버튼을 찾고, click 이벤트 안에서 classList.toggle("dark")를 호출하세요.'
        }),
      ],
      boss: () => {
        const clicks = randInt(2, 5);
        const endsUpDark = clicks % 2 === 1;
        return {
          type: 'blank',
          q: `<code>document.body</code>는 처음에 <code>dark</code> 클래스가 없었어요. <code>#themeBtn</code>을 <code>classList.toggle("dark")</code>로 총 ${clicks}번 클릭했을 때, 최종적으로 <code>dark</code> 클래스가 있을까요? (있음/없음)`,
          prefix: '', suffix: '', accept: [endsUpDark ? '있음' : '없음'], placeholder: '있음 / 없음',
          why: `toggle을 짝수 번 하면 원래 상태로 돌아오고, 홀수 번 하면 반대 상태가 돼요. ${clicks}번은 ${endsUpDark ? '홀수' : '짝수'}이므로 ${endsUpDark ? '있음' : '없음'}이에요.`,
          hint: 'toggle을 클릭할 때마다 있음↔없음이 반복돼요. 짝수 번이면 원래대로, 홀수 번이면 반대로 바뀌어요.'
        };
      }
    },
    {
      id: 'semanticStructureAdvanced',
      title: '시맨틱 구조 심화: article, section, aside, fieldset',
      ready: true,
      summary: '문서를 더 세밀하게 의미 단위로 나누는 article, section, aside와, 폼을 묶어주는 fieldset을 배워요.',
      goals: ['article vs section 차이', 'aside로 부가 정보 표시', 'fieldset과 legend로 폼 묶기'],
      blocks: [
        {
          h: '독립적인 콘텐츠: article, 관련 묶음: section',
          html: `<p><code>&lt;article&gt;</code>은 그 자체로 떼어내도 의미가 통하는 독립적인 콘텐츠(뉴스 기사, 블로그 글 하나)에 써요. <code>&lt;section&gt;</code>은 주제별로 묶인 문서의 한 구역(그 자체로 완전히 독립적이진 않은)을 나타낼 때 써요.</p>`,
          code: {
            label: 'article_section.html',
            lang: 'html',
            src: `<article>
  <h2>오늘의 뉴스</h2>
  <p>내용...</p>
</article>

<section>
  <h2>인기 상품</h2>
  <div class="product">상품 A</div>
  <div class="product">상품 B</div>
</section>`
          }
        },
        {
          h: '부가 정보: aside',
          html: `<p><code>&lt;aside&gt;</code>는 본문과 관련은 있지만 핵심은 아닌 부가 정보(사이드바, 관련 글 목록, 광고 등)를 나타내요.</p>`,
          code: {
            label: 'aside.html',
            lang: 'html',
            src: `<aside>
  <h3>관련 글</h3>
  <ul><li>다른 글 링크</li></ul>
</aside>`
          }
        },
        {
          h: '폼 묶기: fieldset과 legend',
          html: `<p><code>&lt;fieldset&gt;</code>은 관련된 입력칸들을 하나로 묶어서 테두리로 시각적으로 구분해줘요. <code>&lt;legend&gt;</code>는 그 묶음의 제목을 붙여줘요.</p>`,
          code: {
            label: 'fieldset.html',
            lang: 'html',
            src: `<fieldset>
  <legend>배송 정보</legend>
  <input type="text" placeholder="주소">
  <input type="text" placeholder="우편번호">
</fieldset>`,
            preview: `<style>body{font-family:sans-serif;margin:14px}</style><fieldset><legend>배송 정보</legend><input type="text" placeholder="주소"><br><br><input type="text" placeholder="우편번호"></fieldset>`
          },
          after: `<div class="note"><b>정리</b> — article(독립적인 글) vs section(주제별 구역) vs aside(부가 정보), 이 세 가지를 구분해서 쓰면 문서 구조가 훨씬 명확해져요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'article과 section의 차이로 알맞은 것은?',
          'article은 그 자체로 떼어내도 의미가 통하는 독립적인 콘텐츠, section은 문서의 주제별 구역', ['article은 이미지 전용, section은 텍스트 전용 태그다', '둘은 완전히 같은 뜻이라 아무거나 써도 된다', 'section만 여러 번 쓸 수 있다'],
          '뉴스 기사나 블로그 글처럼 "떼어내도 말이 되는" 콘텐츠는 article, 그렇지 않은 주제별 묶음은 section이 알맞아요.',
          '"독립적으로 완결된 글인가?"를 기준으로 구분해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `본문과 관련은 있지만 핵심 내용은 아닌 부가 정보(사이드바, 관련 글 목록 등)를 나타내는 시맨틱 태그를 쓰세요.`,
          prefix: '<', suffix: '>...</aside>', accept: ['aside'], placeholder: '태그 이름',
          why: '<code>&lt;aside&gt;</code>는 본문의 부가 정보를 나타내는 시맨틱 태그예요.',
          hint: '"옆에, 부수적인"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>&lt;fieldset&gt;</code>과 <code>&lt;legend&gt;</code>의 역할로 알맞은 것은?',
          'fieldset은 관련된 입력칸들을 하나로 묶어 테두리로 표시하고, legend는 그 묶음의 제목을 붙인다', ['fieldset은 입력칸의 유효성을 검사하고, legend는 오류 메시지를 보여준다', '둘 다 CSS 속성이지 HTML 태그가 아니다', 'legend가 입력칸을 감싸고, fieldset이 제목을 붙인다'],
          'fieldset은 폼의 입력칸들을 묶는 테두리 상자, legend는 그 상자의 제목이에요.',
          '"범례, 제목(legend)"이 "묶음(fieldset)"의 이름표 역할을 해요.'
        ),
        () => ({
          type: 'code',
          q: '제목이 "결제 정보"인 <code>fieldset</code>을 만들고, 그 안에 <code>type="text"</code> 입력칸 하나를 넣으세요.',
          starter: '',
          rows: 3,
          placeholder: '<fieldset>\n  <legend>결제 정보</legend>\n  <input type="text">\n</fieldset>',
          accept: ['<fieldset>\n  <legend>결제 정보</legend>\n  <input type="text">\n</fieldset>'],
          why: 'fieldset 안에 legend로 제목을 먼저 쓰고, 그 다음 입력칸들을 넣어요.',
          hint: '<fieldset> 안에 <legend>결제 정보</legend>를 먼저 쓰고, 그 다음 <input type="text">를 넣으세요.'
        }),
      ],
      boss: () => {
        const isIndependent = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `${isIndependent ? '다른 사이트에 그대로 옮겨도 그 자체로 완전히 말이 되는 블로그 글 하나' : '한 페이지 안에서 "추천 상품" 주제로 묶인, 그 자체로는 독립적이지 않은 구역'}를 나타내려면 <code>&lt;article&gt;</code>과 <code>&lt;section&gt;</code> 중 어떤 태그가 알맞을까요?`,
          prefix: '', suffix: '', accept: [isIndependent ? 'article' : 'section'], placeholder: 'article / section',
          why: isIndependent
            ? '그 자체로 완결된 독립적인 콘텐츠이므로 article이 알맞아요.'
            : '독립적이지 않고 문서 안의 한 주제별 구역이므로 section이 알맞아요.',
          hint: '"떼어내도 의미가 통하는가"가 article과 section을 가르는 핵심 기준이에요.'
        };
      }
    },
    {
      id: 'transitionsAdvanced',
      title: '트랜지션 심화: 타이밍 함수와 transform 조합',
      ready: true,
      summary: '트랜지션이 변하는 "속도감"을 조절하는 타이밍 함수와, 여러 transform을 함께 쓰는 방법을 배워요.',
      goals: ['ease/linear/ease-in-out 차이', 'transition에 여러 속성 지정하기', 'transform으로 이동+회전+크기 조합'],
      blocks: [
        {
          h: '속도감 조절하기: 타이밍 함수',
          html: `<p><code>linear</code>는 처음부터 끝까지 일정한 속도예요. <code>ease</code>(기본값)는 천천히 시작해서 빨라졌다가 천천히 끝나요. 자연스러운 느낌을 주고 싶으면 보통 <code>ease</code>나 <code>ease-in-out</code>을 써요.</p>`,
          code: {
            label: 'timing_function.css',
            lang: 'css',
            src: `.box {
  transition: transform 0.3s ease-in-out;
}`
          }
        },
        {
          h: '여러 속성을 한 번에: 콤마로 구분',
          html: `<p>콤마로 구분하면 서로 다른 속성마다 다른 시간과 타이밍 함수를 따로 지정할 수 있어요.</p>`,
          code: {
            label: 'multiple_transitions.css',
            lang: 'css',
            src: `.box {
  transition: transform 0.3s ease, background-color 0.5s linear;
}`
          }
        },
        {
          h: 'transform 조합하기',
          html: `<p><code>transform</code> 안에 여러 함수를 공백으로 나열하면 동시에 다 적용돼요(위로 이동 + 살짝 커짐 + 살짝 회전). 순서가 결과에 영향을 줄 수 있어서, 보통 이동(<code>translate</code>) → 크기(<code>scale</code>) → 회전(<code>rotate</code>) 순서로 써요.</p>`,
          code: {
            label: 'transform_combo.css',
            lang: 'css',
            src: `.box:hover {
  transform: translateY(-5px) scale(1.05) rotate(2deg);
}`
          },
          after: `<div class="note"><b>정리</b> — 버튼이나 카드에 마우스를 올렸을 때 살짝 떠오르면서 커지는 효과는 transition + transform 조합으로 자주 만들어요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '처음부터 끝까지 일정한 속도로 변하는 타이밍 함수는?',
          '<code>linear</code>', ['<code>ease</code>', '<code>ease-in-out</code>', '<code>ease-out</code>'],
          'linear는 속도 변화 없이 처음부터 끝까지 똑같은 속도로 진행돼요.',
          '"직선의, 일정한"이라는 뜻의 영어 단어예요.'
        ),
        () => makeChoice(
          '<code>transform</code>은 0.3초 ease로, <code>background-color</code>는 0.5초 linear로 서로 다르게 지정하고 싶을 때, 두 트랜지션을 이어 쓰는 올바른 방법은?',
          '<code>transition: transform 0.3s ease, background-color 0.5s linear;</code>', ['<code>transition: transform 0.3s ease background-color 0.5s linear;</code>', '<code>transition: transform 0.3s ease; background-color 0.5s linear;</code>(둘 다 transition 안에)', '<code>transition: transform 0.3s ease + background-color 0.5s linear;</code>'],
          '서로 다른 속성에 각각 다른 트랜지션을 주려면, 콤마(,)로 구분해서 나열해요.',
          '여러 개를 나열할 때 흔히 쓰는 그 구분 기호를 떠올려보세요.'
        ),
        () => makeChoice(
          '<code>transform</code>에 이동, 크기, 회전을 동시에 적용하려면?',
          '<code>translateY(-5px) scale(1.05) rotate(2deg)</code>처럼 공백으로 나열한다', ['각각 다른 transform 속성을 만들어 따로 적용한다', 'transition 안에 나열한다', '콤마(,)로 구분해서 나열한다'],
          'transform 함수들은 공백으로 나열하면 하나의 transform 값 안에서 동시에 적용돼요.',
          '콤마가 아니라 "공백"으로 나열한다는 점이 포인트예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>.box:hover</code>에서 위로 5px 이동(translateY(-5px))하면서 1.05배로 커지는(scale(1.05)) transform을 작성하세요.',
          starter: '',
          placeholder: '.box:hover {\n  transform: translateY(-5px) scale(1.05);\n}',
          accept: ['.box:hover {transform: translateY(-5px) scale(1.05);}'],
          why: 'translateY와 scale을 공백으로 나열하면 동시에 적용돼요.',
          hint: '.box:hover { transform: translateY(-5px) scale(1.05); } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const deg = pick([2, 3, 5]);
        const correct = `transition: transform 0.3s ease-in-out;\n}\n.card:hover {\n  transform: translateY(-5px) rotate(${deg}deg);`;
        return {
          type: 'blank',
          q: `<code>.card</code>에 마우스를 올리면 0.3초 동안 부드럽게(ease-in-out) 위로 5px 이동하면서 ${deg}도 회전하는 효과를 만들려고 해요. <code>.card:hover</code>의 transform 값을 쓰세요. (translateY 먼저, rotate 나중)`,
          prefix: '.card:hover { transform: ', suffix: '; }', accept: [`translateY(-5px) rotate(${deg}deg)`], placeholder: 'transform 값',
          why: `이동은 translateY(-5px), 회전은 rotate(${deg}deg)를 공백으로 나열해서 함께 적용해요.`,
          hint: 'translateY(-5px)와 rotate(각도deg)를 공백으로 나란히 쓰세요.'
        };
      }
    },
    {
      id: 'eventDelegation',
      title: '이벤트 위임 (Event Delegation)',
      ready: true,
      summary: '자식 요소마다 각각 이벤트를 등록하는 대신, 부모 요소 하나에만 등록해서 효율적으로 처리하는 이벤트 위임 패턴을 배워요.',
      goals: ['이벤트 버블링(bubbling) 이해하기', 'event.target으로 실제 클릭된 요소 찾기', '부모 하나에만 리스너 등록해서 효율적으로 처리하기'],
      blocks: [
        {
          h: '이벤트는 위로 타고 올라가요: 버블링',
          html: `<p>어떤 요소를 클릭하면, 그 클릭 이벤트는 그 요소 → 부모 → 조부모 순서로 <b>위로 타고 올라가요</b>. 이걸 <b>버블링(bubbling)</b>이라고 해요. 그래서 자식에서 일어난 이벤트를 부모의 리스너에서도 감지할 수 있어요.</p>`,
          code: {
            label: 'bubbling_basic.html',
            lang: 'html',
            src: `<ul id="list">
  <li>사과</li>
  <li>바나나</li>
  <li>포도</li>
</ul>
<p id="msg">항목을 클릭해보세요</p>

<script>
document.querySelector("#list").addEventListener("click", e => {
  document.querySelector("#msg").textContent = "클릭된 항목: " + e.target.textContent;
});
</script>`,
            preview: `<style>body{font-family:sans-serif;margin:14px}li{cursor:pointer;padding:4px}</style><ul id="list"><li>사과</li><li>바나나</li><li>포도</li></ul><p id="msg">항목을 클릭해보세요</p><script>document.querySelector("#list").addEventListener("click", e => { document.querySelector("#msg").textContent = "클릭된 항목: " + e.target.textContent; });</script>`
          }
        },
        {
          h: '누가 진짜로 클릭됐는지: event.target',
          html: `<p>리스너를 부모(<code>#list</code>)에 걸어도, <code>e.target</code>은 <b>실제로 클릭이 일어난 자식 요소</b>(예: 클릭한 li)를 가리켜요. 그래서 부모 하나에만 리스너를 걸어도 어떤 자식이 클릭됐는지 정확히 알 수 있어요.</p>`
        },
        {
          h: '왜 자식마다 등록 안 하고 부모 하나에만 걸까요',
          html: `<p>목록 항목이 100개라면, 각 li마다 리스너를 100번 등록하는 대신 부모 ul 하나에만 등록하면 훨씬 효율적이에요. 게다가 <b>나중에 새로 추가된 li</b>도 별도 등록 없이 바로 동작해요 — 부모가 이미 모든 클릭을 감지하고 있으니까요.</p>`,
          after: `<div class="note"><b>정리</b> — 이렇게 부모 하나에 리스너를 걸어두고 event.target으로 실제 대상을 판단하는 패턴을 <b>이벤트 위임(event delegation)</b>이라고 해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const items = shuffle(['사과', '바나나', '포도', '수박']).slice(0, 3);
          const clicked = pick(items);
          const itemsHtml = items.map(i => `&lt;li&gt;${i}&lt;/li&gt;`).join('');
          return {
            type: 'blank',
            q: `<code>#list</code>(ul)에 이벤트 위임 리스너가 걸려 있고, 안에 <code>${itemsHtml}</code>가 있어요. "${clicked}" 항목을 클릭하면 <code>e.target.textContent</code>는? (그대로 입력)`,
            prefix: '', suffix: '', accept: [clicked], placeholder: '값',
            why: `e.target은 실제로 클릭된 li 요소를 가리켜서, "${clicked}"가 나와요.`,
            hint: 'e.target은 리스너가 걸린 부모가 아니라, 실제 클릭이 일어난 자식을 가리켜요.'
          };
        },
        () => makeChoice(
          '클릭 이벤트가 자식 요소에서 부모 쪽으로 전파되는 현상을 뭐라고 부르나요?',
          '버블링(bubbling)', ['캡처링(capturing)만 있다', '위임(delegation) 그 자체를 부르는 말이다', '이벤트는 전파되지 않는다'],
          '이벤트가 자식에서 부모로 위로 타고 올라가는 현상을 버블링이라고 해요.',
          '물속에서 거품(bubble)이 위로 올라가는 모습을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `부모에 걸린 리스너 안에서, 실제로 클릭이 일어난 자식 요소를 가리키는 값을 쓰세요.`,
          prefix: 'list.addEventListener("click", e => { console.log(', suffix: '.textContent); });', accept: ['e.target'], placeholder: '값',
          why: '<code>e.target</code>은 이벤트가 실제로 발생한 요소를 가리켜요.',
          hint: '이벤트 객체 e의 프로퍼티예요. "목표, 대상"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '이벤트 위임을 쓰면 좋은 점은?',
          '자식마다 리스너를 등록하지 않아도 되고, 나중에 추가된 자식도 자동으로 처리된다', ['이벤트가 아예 발생하지 않게 막아준다', '부모 요소를 화면에서 숨겨준다', '자식 요소의 스타일을 자동으로 바꿔준다'],
          '부모 하나에만 리스너를 걸어두면, 자식이 몇 개든 나중에 추가되든 상관없이 다 처리돼요.',
          '리스너 등록 횟수와 유지보수 측면에서의 이점을 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>id="list"</code>인 ul 요소 하나에만 클릭 리스너를 걸어서, 클릭된 li의 <code>textContent</code>를 <code>console.log</code>로 출력하는 코드를 작성하세요. (이벤트 위임 패턴을 사용하세요)',
          starter: '',
          rows: 3,
          placeholder: 'document.querySelector("#list").addEventListener("click", e => {\n  console.log(e.target.textContent);\n});',
          accept: ['document.querySelector("#list").addEventListener("click", e => {console.log(e.target.textContent);});'],
          why: '부모(#list) 하나에만 리스너를 걸고, e.target으로 실제 클릭된 li를 확인해요.',
          hint: '#list에 addEventListener("click", e => { ... })를 걸고, 안에서 e.target.textContent를 출력하세요.'
        }),
      ],
      boss: () => {
        const items = shuffle(['사과', '바나나', '포도', '수박', '딸기']).slice(0, 4);
        const clickedIdx = randInt(0, items.length - 1);
        const itemsHtml = items.map(i => `&lt;li&gt;${i}&lt;/li&gt;`).join('');
        return {
          type: 'blank',
          q: `<code>#list</code>(ul) 안에 <code>${itemsHtml}</code>가 있고, 이벤트 위임으로 부모에 리스너가 걸려 있어요. ${clickedIdx + 1}번째 항목을 클릭하면 e.target.textContent는? (그대로 입력)`,
          prefix: '', suffix: '', accept: [items[clickedIdx]], placeholder: '값',
          why: `${clickedIdx + 1}번째 항목은 "${items[clickedIdx]}"라서, e.target.textContent도 그 값이에요.`,
          hint: '이벤트 위임이어도 e.target은 항상 실제로 클릭된 자식 요소를 가리켜요.'
        };
      }
    },
    {
      id: 'intersectionObserver',
      title: 'Intersection Observer로 스크롤 감지하기',
      ready: true,
      summary: '요소가 화면(뷰포트)에 보이는 순간을 감지해서, 이미지 지연 로딩이나 스크롤 애니메이션을 만드는 IntersectionObserver를 배워요.',
      goals: ['IntersectionObserver로 요소가 보이는 순간 감지하기', 'isIntersecting으로 보이는지 확인하기', 'scroll 이벤트보다 효율적인 이유'],
      blocks: [
        {
          h: '요소가 화면에 나타나는 순간 감지하기',
          html: `<p><code>IntersectionObserver</code>는 어떤 요소가 <b>화면(뷰포트) 안에 들어왔는지</b>를 감지해줘요. 스크롤해서 이미지가 보일 때 로드하거나, 요소가 보이면 애니메이션을 실행할 때 자주 써요.</p>`,
          code: {
            label: 'observer_basic.js',
            lang: 'javascript',
            src: `const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

observer.observe(document.querySelector(".box"));`
          }
        },
        {
          h: '보이는지 아닌지: isIntersecting',
          html: `<p>콜백 함수가 받는 <code>entries</code> 배열의 각 항목은 <code>entry.isIntersecting</code>(보이는 중이면 true)과 <code>entry.target</code>(그 요소 자체)을 가지고 있어요.</p>`
        },
        {
          h: '왜 scroll 이벤트보다 효율적일까요',
          html: `<p>예전엔 scroll 이벤트로 스크롤할 때마다 위치를 직접 계산했는데, 이 방식은 스크롤할 때마다 수십~수백 번씩 실행돼서 무거워요. IntersectionObserver는 브라우저가 "보이는 순간"만 알아서 알려줘서 훨씬 가볍고 효율적이에요.</p>`,
          after: `<div class="note"><b>활용 예</b> — 이미지 지연 로딩(스크롤해서 보일 때만 진짜 이미지를 불러오기), 스크롤하며 나타나는 애니메이션 등에 널리 쓰여요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `IntersectionObserver의 콜백에서, 그 요소가 화면에 보이는 중인지 확인하는 프로퍼티를 쓰세요.`,
          prefix: 'if (entry.', suffix: ') { entry.target.classList.add("visible"); }', accept: ['isIntersecting'], placeholder: '프로퍼티',
          why: '<code>entry.isIntersecting</code>이 true면 그 요소가 지금 화면(뷰포트) 안에 보이고 있다는 뜻이에요.',
          hint: '"교차하고 있다(intersecting)"는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'IntersectionObserver를 쓰는 대표적인 이유는?',
          '요소가 화면에 보일 때만 이미지를 불러오거나 애니메이션을 실행하려고', ['페이지 전체를 자동으로 새로고침하려고', '모든 요소의 클릭을 감지하려고', '폼 입력값을 검증하려고'],
          'IntersectionObserver는 요소가 화면에 나타나는 순간을 감지해서, 지연 로딩이나 스크롤 애니메이션에 자주 써요.',
          '"화면에 보이는 순간"을 감지한다는 점이 핵심이에요.'
        ),
        () => makeChoice(
          'IntersectionObserver가 scroll 이벤트로 직접 위치를 계산하는 방식보다 나은 점은?',
          '스크롤마다 매번 계산하지 않고, 브라우저가 보이는 순간만 알려줘서 더 효율적이다', ['scroll 이벤트보다 더 자주 실행된다', '구형 브라우저에서만 동작한다', '애니메이션을 자동으로 만들어준다'],
          'scroll 이벤트는 스크롤할 때마다 계속 실행되지만, IntersectionObserver는 "보이는 순간"만 알려줘서 훨씬 가벼워요.',
          '실행 빈도의 차이를 생각해보세요.'
        ),
        () => {
          const cls = pick(['visible', 'shown', 'active']);
          return {
            type: 'blank',
            q: `요소가 보이면 <code>"${cls}"</code> 클래스를 추가하려고 해요. 빈칸을 채우세요.`,
            prefix: 'if (entry.isIntersecting) { entry.target.classList.', suffix: `("${cls}"); }`, accept: ['add'], placeholder: '메서드',
            why: `<code>classList.add("${cls}")</code>로 그 클래스를 추가해요.`,
            hint: '클래스를 "더하는" 메서드예요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>class="box"</code>인 요소를 관찰해서, 화면에 보이면 <code>"visible"</code> 클래스를 추가하는 IntersectionObserver 코드를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: 'const observer = new IntersectionObserver(entries => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      entry.target.classList.add("visible");\n    }\n  });\n});\n\nobserver.observe(document.querySelector(".box"));',
          accept: ['const observer = new IntersectionObserver(entries => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      entry.target.classList.add("visible");\n    }\n  });\n});\n\nobserver.observe(document.querySelector(".box"));'],
          why: 'new IntersectionObserver(콜백)으로 관찰자를 만들고, observe(요소)로 감시를 시작해요.',
          hint: 'new IntersectionObserver(entries => { ... })를 만들고 observer.observe(document.querySelector(".box"));를 호출하세요.'
        }),
      ],
      boss: () => {
        const cls = pick(['visible', 'fade-in', 'active']);
        return {
          type: 'blank',
          q: `<code>entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("${cls}"); } });</code>가 있을 때, 화면에 보이게 된 요소에는 어떤 클래스가 추가될까요? (따옴표 없이)`,
          prefix: '', suffix: '', accept: [cls], placeholder: '클래스 이름',
          why: `isIntersecting이 true인 요소에 "${cls}" 클래스가 추가돼요.`,
          hint: 'classList.add(...) 안에 적힌 클래스 이름을 확인해보세요.'
        };
      }
    },
    {
      id: 'hasSelector',
      title: ':has() 관계 선택자',
      ready: true,
      summary: '특정 자식을 가진 부모를 선택할 수 있게 해주는, CSS의 강력한 :has() 관계 선택자를 배워요.',
      goals: [':has()로 특정 자식을 가진 부모 선택하기', '자바스크립트 없이 조건부 스타일 만들기', '활용 예시 살펴보기'],
      blocks: [
        {
          h: '자식을 보고 부모를 고르기: :has()',
          html: `<p>지금까지 CSS 선택자는 "이 조건에 맞는 요소"를 골랐다면, <code>:has()</code>는 "<b>이런 자식을 가진</b> 요소"를 고를 수 있게 해줘요. 예를 들어 <code>label:has(input:checked)</code>는 "체크된 input을 가진 label"을 선택해요.</p>`,
          code: {
            label: 'has_basic.html',
            lang: 'html',
            src: `<label class="option">
  <input type="checkbox" checked>
  선택됨
</label>
<label class="option">
  <input type="checkbox">
  선택 안 됨
</label>

<style>
label:has(input:checked) {
  background: #d0f0d0;
  font-weight: bold;
}
</style>`,
            preview: `<style>body{font-family:sans-serif;margin:14px}.option{display:block;padding:6px;border:1px solid #ccc;margin-bottom:4px;border-radius:6px}label:has(input:checked){background:#d0f0d0;font-weight:bold}</style><label class="option"><input type="checkbox" checked> 선택됨</label><label class="option"><input type="checkbox"> 선택 안 됨</label>`
          }
        },
        {
          h: '자바스크립트 없이 조건부 스타일을 만들 수 있어요',
          html: `<p>예전엔 "자식 상태에 따라 부모 스타일을 바꾸기"는 자바스크립트가 필요했어요. :has() 덕분에 CSS만으로도 이런 조건부 스타일을 만들 수 있게 됐어요.</p>`
        },
        {
          h: '다른 활용 예시',
          html: `<p><code>article:has(img)</code>는 "이미지가 있는 article만", <code>form:has(:invalid)</code>는 "유효하지 않은 입력이 있는 폼"을 선택하는 식으로 다양하게 활용할 수 있어요.</p>`,
          after: `<div class="note"><b>기억하기</b> — :has() 안에는 다른 선택자를 그대로 넣을 수 있어요. 괄호 안의 조건을 만족하는 자손이 하나라도 있으면 그 부모가 선택돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const checked = Math.random() < 0.5;
          return {
            type: 'blank',
            q: `<code>label:has(input:checked) { background: #d0f0d0; }</code>이고, label 안의 checkbox가 ${checked ? '체크되어 있을' : '체크 안 되어 있을'} 때, 그 label의 배경색은 바뀔까요? ("바뀜" 또는 "안 바뀜")`,
            prefix: '', suffix: '', accept: [checked ? '바뀜' : '안 바뀜'], placeholder: '값',
            why: checked ? '체크되어 있으면 input:checked 조건을 만족해서 label의 배경이 바뀌어요.' : '체크 안 되어 있으면 조건을 만족하지 않아서 배경이 그대로예요.',
            hint: ':has() 안의 조건(input:checked)을 만족하는 자식이 있는지 확인해보세요.'
          };
        },
        () => makeChoice(
          ':has() 선택자가 하는 일은?',
          '괄호 안의 조건을 만족하는 자손을 가진 요소를 선택한다', ['자기 자신의 속성만 확인한다', '부모 요소를 항상 숨긴다', '자바스크립트 코드를 실행한다'],
          ':has()는 괄호 안 조건을 만족하는 자손이 있는 요소를 선택해요.',
          '"가지고 있다(has)"는 이름 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `체크된 input을 가진 label을 선택하는 선택자를 완성하세요.`,
          prefix: 'label', suffix: '(input:checked) { ... }', accept: [':has'], placeholder: '선택자',
          why: '<code>label:has(input:checked)</code>는 체크된 input을 가진 label을 선택해요.',
          hint: '"가지고 있다(has)"라는 뜻의 영어 단어 앞에 콜론을 붙여요.'
        }),
        () => makeChoice(
          ':has()를 쓰면 좋은 점은?',
          '자바스크립트 없이도 자식 상태에 따라 부모 스타일을 바꿀 수 있다', ['CSS 파일 크기가 항상 줄어든다', '모든 브라우저에서 항상 애니메이션이 빨라진다', 'HTML 구조를 자동으로 바꿔준다'],
          ':has()는 CSS만으로 자식 상태에 따른 조건부 스타일을 가능하게 해줘요.',
          '예전엔 자바스크립트가 필요했던 일이라는 점을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '이미지(img)를 자식으로 가진 article 요소에 <code>border: 2px solid gold;</code>를 적용하는 CSS 규칙을 작성하세요.',
          starter: '',
          placeholder: 'article:has(img) { border: 2px solid gold; }',
          accept: ['article:has(img) { border: 2px solid gold; }'],
          why: 'article:has(img)로 img 자식을 가진 article만 선택해서 스타일을 적용해요.',
          hint: 'article:has(img) { border: 2px solid gold; }를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const hasImg = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `<code>article:has(img) { border: 2px solid gold; }</code>이고, 어떤 article 안에 img 태그가 ${hasImg ? '있을' : '없을'} 때, 그 article에 금색 테두리가 적용될까요? ("적용됨" 또는 "적용 안 됨")`,
          prefix: '', suffix: '', accept: [hasImg ? '적용됨' : '적용 안 됨'], placeholder: '값',
          why: hasImg ? 'img 자식이 있으니 :has(img) 조건을 만족해서 테두리가 적용돼요.' : 'img 자식이 없으니 조건을 만족하지 않아 테두리가 적용되지 않아요.',
          hint: ':has(img)는 img를 자식으로 가진 요소에만 적용돼요.'
        };
      }
    },
    {
      id: 'webFonts',
      title: '웹 폰트: @font-face',
      ready: true,
      summary: '내가 원하는 글꼴 파일을 직접 불러와서 웹사이트에 적용하는 @font-face 문법을 배워요.',
      goals: ['@font-face로 글꼴 등록하기', 'font-family로 등록한 글꼴 사용하기', 'font-display로 로딩 중 화면 처리하기'],
      blocks: [
        {
          h: '내 글꼴 파일 등록하기: @font-face',
          html: `<p>시스템에 기본으로 없는 글꼴을 쓰고 싶다면, <code>@font-face</code>로 글꼴 파일을 등록하고 이름을 붙여줄 수 있어요.</p>`,
          code: {
            label: 'font_face_basic.css',
            lang: 'css',
            src: `@font-face {
  font-family: "MyFont";
  src: url("myfont.woff2") format("woff2");
}

h1 {
  font-family: "MyFont", sans-serif;
}`
          }
        },
        {
          h: '등록한 글꼴을 실제로 쓰기',
          html: `<p>@font-face로 등록한 이름을, 다른 요소에서 <code>font-family</code>로 지정하면 그 글꼴이 적용돼요. 혹시 글꼴 파일을 못 불러오는 경우를 대비해, 뒤에 <code>sans-serif</code> 같은 대체 글꼴을 함께 적어두는 게 안전해요.</p>`
        },
        {
          h: '로딩 중엔 어떻게 보일까: font-display',
          html: `<p>글꼴 파일은 보통 이미지처럼 다운로드가 필요해서, 다 받아지기 전까지 시간이 걸려요. <code>font-display: swap;</code>을 쓰면, 글꼴이 로딩되는 동안은 <b>기본 글꼴로 먼저 보여주고</b>, 다 받아지면 자연스럽게 교체해요. 텍스트가 안 보이는 시간을 없애줘요.</p>`,
          after: `<div class="note"><b>정리</b> — @font-face는 "이 이름으로 이 파일을 쓸게"라는 등록이고, font-family는 그 등록된 이름을 실제로 "사용"하는 부분이에요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `글꼴 파일을 등록하고 이름을 붙일 때 쓰는 규칙을 쓰세요.`,
          prefix: '', suffix: ' { font-family: "MyFont"; src: url("myfont.woff2"); }', accept: ['@font-face'], placeholder: '규칙 이름',
          why: '<code>@font-face</code>로 글꼴 파일을 등록하고 이름을 붙여요.',
          hint: '@ 기호로 시작하는, "글꼴 얼굴"이라는 뜻의 이름이에요.'
        }),
        () => makeChoice(
          '@font-face로 등록한 글꼴 뒤에 sans-serif 같은 대체 글꼴을 함께 적어두는 이유는?',
          '글꼴 파일을 못 불러왔을 때를 대비해서', ['글꼴을 항상 두 개 겹쳐서 보여주려고', '파일 크기를 줄이려고', '브라우저가 항상 두 번째 값을 우선 적용해서'],
          '글꼴 파일을 못 불러왔을 때 대체 글꼴이라도 쓸 수 있도록 안전하게 적어둬요.',
          '"만약을 대비한" 안전장치라는 개념을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `글꼴이 로딩되는 동안 기본 글꼴로 먼저 보여주고, 로딩이 끝나면 자연스럽게 교체하는 값을 쓰세요.`,
          prefix: 'font-display: ', suffix: ';', accept: ['swap'], placeholder: '값',
          why: '<code>font-display: swap;</code>은 로딩 중엔 대체 글꼴을, 로딩 후엔 지정한 글꼴을 보여줘요.',
          hint: '"교체하다, 바꾸다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '@font-face로 글꼴을 등록만 하고, 어떤 요소에도 font-family로 지정하지 않으면?',
          '등록만 됐을 뿐, 실제로 어디에도 적용되지 않는다', ['모든 요소에 자동으로 적용된다', 'h1에만 자동으로 적용된다', 'CSS 오류가 난다'],
          '@font-face는 "등록"일 뿐이라, font-family로 실제 지정해줘야 그 요소에 적용돼요.',
          '등록과 사용은 별개의 단계라는 점을 기억하세요.'
        ),
        () => ({
          type: 'code',
          q: '"MyFont"라는 이름으로 "myfont.woff2" 파일을 등록하는 @font-face 규칙을 작성하세요. (format("woff2")도 포함하세요)',
          starter: '',
          rows: 3,
          placeholder: '@font-face {\n  font-family: "MyFont";\n  src: url("myfont.woff2") format("woff2");\n}',
          accept: ['@font-face {\n  font-family: "MyFont";\n  src: url("myfont.woff2") format("woff2");\n}'],
          why: '@font-face 안에 font-family로 이름을, src로 파일 경로와 형식을 지정해요.',
          hint: '@font-face { font-family: "MyFont"; src: url("myfont.woff2") format("woff2"); }를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const hasDisplay = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `@font-face로 등록한 글꼴을 쓰는 h1에 ${hasDisplay ? 'font-display: swap;이 있고' : 'font-display가 없고'}, 글꼴 파일이 아직 로딩 중일 때, 글자는 화면에 어떻게 보일까요? ("대체 글꼴로 바로 보임" 또는 "글꼴 다 받아질 때까지 안 보일 수 있음")`,
          prefix: '', suffix: '', accept: [hasDisplay ? '대체 글꼴로 바로 보임' : '글꼴 다 받아질 때까지 안 보일 수 있음'], placeholder: '값',
          why: hasDisplay ? 'swap이 있으면 로딩 중엔 대체 글꼴로 먼저 보여줘요.' : 'font-display 설정이 없으면 브라우저 기본 동작에 따라 텍스트가 안 보이는 시간이 생길 수 있어요.',
          hint: 'font-display: swap의 역할을 떠올려보세요.'
        };
      }
    },
    {
      id: 'formValidationAdvanced',
      title: '폼 유효성 검사 심화',
      ready: true,
      summary: 'required/minlength에 이어, 패턴을 검사하는 pattern 속성과 :valid/:invalid 가상 클래스로 폼 검증 상태를 스타일링하는 법을 배워요.',
      goals: ['pattern으로 정규식 형식 검사하기', ':valid / :invalid로 상태별 스타일 주기', 'setCustomValidity로 직접 오류 메시지 만들기'],
      blocks: [
        {
          h: '정해진 형식만 허용하기: pattern',
          html: `<p><code>pattern="정규식"</code>을 붙이면, 그 정규식에 맞는 형식의 값만 통과돼요. 예를 들어 우편번호가 항상 숫자 5자리여야 한다면 <code>pattern="[0-9]{5}"</code>를 쓸 수 있어요.</p>`,
          code: {
            label: 'pattern_basic.html',
            lang: 'html',
            src: `<input type="text" pattern="[0-9]{5}" placeholder="우편번호(숫자 5자리)">`
          }
        },
        {
          h: '입력 상태에 따라 다르게 보여주기: :valid / :invalid',
          html: `<p><code>:valid</code>는 조건을 만족하는 입력칸에, <code>:invalid</code>는 만족하지 못하는 입력칸에 스타일을 줄 수 있어요. 자바스크립트 없이도 실시간으로 색이 바뀌는 폼을 만들 수 있어요.</p>`,
          code: {
            label: 'valid_invalid.css',
            lang: 'css',
            src: `input:invalid {
  border-color: red;
}
input:valid {
  border-color: green;
}`,
            preview: `<style>body{font-family:sans-serif;margin:14px}input{padding:6px;border:2px solid #ccc;border-radius:4px}input:invalid{border-color:#e05555}input:valid{border-color:#4caf50}</style><input type="text" pattern="[0-9]{5}" placeholder="우편번호(숫자 5자리)를 입력해보세요">`
          }
        },
        {
          h: '직접 오류 메시지 만들기: setCustomValidity',
          html: `<p>자바스크립트에서 <code>입력요소.setCustomValidity("메시지")</code>를 호출하면, 그 입력칸을 강제로 "유효하지 않음" 상태로 만들고 원하는 오류 메시지를 보여줄 수 있어요. 빈 문자열(<code>""</code>)을 넣으면 다시 "유효함" 상태로 돌아가요.</p>`,
          after: `<div class="note"><b>정리</b> — required/minlength/pattern 같은 기본 속성으로 안 되는 복잡한 검사(예: "비밀번호와 확인 비밀번호가 같아야 한다")는 setCustomValidity로 직접 처리해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const valid = Math.random() < 0.5;
          const val = valid ? String(randInt(10000, 99999)) : pick(['1234', 'abcde', '123456']);
          return {
            type: 'blank',
            q: `<code>&lt;input pattern="[0-9]{5}"&gt;</code>에 "${val}"을 입력하면 유효할까요? ("유효" 또는 "무효")`,
            prefix: '', suffix: '', accept: [valid ? '유효' : '무효'], placeholder: '유효/무효',
            why: valid ? `"${val}"은 숫자 5자리라서 패턴을 만족해요.` : `"${val}"은 숫자 5자리 형식이 아니라서 패턴을 만족하지 않아요.`,
            hint: '[0-9]{5}는 "숫자가 정확히 5개"라는 뜻이에요.'
          };
        },
        () => makeChoice(
          '조건을 만족하지 못한 입력칸에만 스타일을 주고 싶을 때 쓰는 가상 클래스는?',
          ':invalid', [':valid', ':checked', ':disabled'],
          ':invalid는 유효성 검사를 통과하지 못한 입력칸에 스타일을 줘요.',
          '"유효하지 않은"이라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `조건을 만족하는(유효한) 입력칸에 스타일을 줄 때 쓰는 가상 클래스를 쓰세요.`,
          prefix: 'input', suffix: ' { border-color: green; }', accept: [':valid'], placeholder: '가상 클래스',
          why: '<code>:valid</code>는 유효성 검사를 통과한 입력칸에 스타일을 줘요.',
          hint: ':invalid의 반대말이에요.'
        }),
        () => makeChoice(
          '<code>setCustomValidity("")</code>처럼 빈 문자열을 넣으면?',
          '그 입력칸이 다시 유효한 상태로 돌아간다', ['그 입력칸이 영구히 무효 상태가 된다', '폼 전체가 사라진다', '아무 효과가 없다'],
          '빈 문자열을 넣으면 커스텀 오류 메시지가 사라지고, 그 입력칸은 다시 유효한 상태로 돌아가요.',
          '메시지를 "없앤다"는 게 어떤 상태를 의미할지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '숫자 3자리만 허용하는 pattern 속성이 붙은 텍스트 입력칸을 작성하세요.',
          starter: '',
          placeholder: '<input type="text" pattern="[0-9]{3}">',
          accept: ['<input type="text" pattern="[0-9]{3}">'],
          why: 'pattern="[0-9]{3}"은 숫자가 정확히 3개인 값만 허용해요.',
          hint: '<input type="text" pattern="[0-9]{3}">를 그대로 쓰세요.'
        }),
      ],
      boss: () => {
        const digits = randInt(3, 6);
        const testVal = pick([String(randInt(Math.pow(10, digits - 1), Math.pow(10, digits) - 1)), 'abc', String(randInt(10, 99))]);
        const valid = new RegExp(`^[0-9]{${digits}}$`).test(testVal);
        return {
          type: 'blank',
          q: `<code>&lt;input pattern="[0-9]{${digits}}"&gt;</code>에 "${testVal}"을 입력하면 유효할까요? ("유효" 또는 "무효")`,
          prefix: '', suffix: '', accept: [valid ? '유효' : '무효'], placeholder: '유효/무효',
          why: valid ? `"${testVal}"은 숫자 ${digits}자리 형식을 만족해요.` : `"${testVal}"은 숫자 ${digits}자리 형식이 아니에요.`,
          hint: `[0-9]{${digits}}는 "숫자가 정확히 ${digits}개"라는 뜻이에요.`
        };
      }
    },
    {
      id: 'cssGridSubgrid',
      title: 'CSS 서브그리드(subgrid)로 중첩 카드 정렬하기',
      ready: true,
      summary: '부모 그리드의 열·행 트랙을 자식 그리드가 그대로 물려받는 subgrid로, 카드 안 제목·가격 줄까지 딱 맞춰 정렬해요.',
      goals: ['일반 중첩 그리드의 정렬 한계 이해하기', 'grid-template-columns: subgrid로 트랙 물려받기', 'subgrid를 쓰기 좋은 상황 판단하기'],
      blocks: [
        {
          h: '중첩 그리드는 왜 안 맞을까요',
          html: `<p>카드 여러 개를 그리드로 늘어놓아도, 카드 <b>내부</b>의 제목·설명·가격은 각 카드가 따로 계산하는 자기만의 트랙을 따라요. 그래서 글자 길이가 다르면 카드마다 가격 위치가 들쭉날쭉해져요.</p>`,
          code: {
            label: 'cards_normal.css',
            lang: 'css',
            src: `.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.card {
  display: grid;
  grid-template-rows: auto 1fr auto;
}`,
            preview: `<style>body{font-family:sans-serif;margin:14px}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.card{display:grid;grid-template-rows:auto 1fr auto;border:1px solid #ccc;border-radius:8px;padding:10px}.card h3{margin:0}</style><div class="cards"><div class="card"><h3>짧은 제목</h3><p>설명 한 줄</p><b>10,000원</b></div><div class="card"><h3>이건 꽤 긴 제목이에요</h3><p>설명 두 줄짜리 문장이 조금 더 길게 들어가요</p><b>25,000원</b></div><div class="card"><h3>제목</h3><p>중간 길이 설명</p><b>15,000원</b></div></div>`
          }
        },
        {
          h: 'subgrid로 부모의 트랙 물려받기',
          html: `<p><code>grid-template-rows: subgrid;</code>를 자식(<code>.card</code>)에 주면, 자식은 자기만의 행 트랙을 새로 만들지 않고 <b>부모(.cards)가 이미 정해둔 행 트랙 크기를 그대로 물려받아요</b>. 그러면 모든 카드의 "제목 줄", "설명 줄", "가격 줄" 높이가 서로 맞춰져요.</p>`,
          code: {
            label: 'cards_subgrid.css',
            lang: 'css',
            src: `.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  gap: 16px;
}
.card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
}`
          },
          after: `<div class="note"><b>정리</b> — subgrid는 "부모 그리드의 트랙 정의를 자식이 재사용한다"는 뜻이에요. 카드형 레이아웃, 표 형태 목록처럼 여러 반복 요소의 내부 줄을 맞출 때 특히 유용해요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `자식 요소가 부모 그리드의 행(row) 트랙 크기를 그대로 물려받게 하려면 <code>grid-template-rows</code>에 어떤 값을 줘야 할까요?`,
          prefix: '.card { grid-template-rows: ', suffix: '; }', accept: ['subgrid'], placeholder: '값',
          why: '<code>subgrid</code>를 지정하면 부모가 정의한 트랙 크기를 자식이 그대로 물려받아 써요.',
          hint: '"하위(sub) 그리드"라는 뜻의 영어 단어 그대로예요.'
        }),
        () => makeChoice(
          '일반적인 중첩 그리드(자식이 subgrid를 쓰지 않는 경우)에서 카드마다 제목·가격 줄이 안 맞는 이유는?',
          '각 카드가 자기 내용에 맞춰 독립적으로 행 트랙 크기를 계산하기 때문', ['그리드는 3개 이상의 자식을 지원하지 않기 때문', 'gap 속성이 카드 크기를 강제로 다르게 만들기 때문', 'border-radius가 트랙 계산에 영향을 주기 때문'],
          '카드마다 내용 길이가 다르면, 독립적인 그리드는 그 내용에 맞춰 각자 다른 행 높이를 계산해요.',
          '각 카드가 "자기만의" 트랙을 계산한다는 점이 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `subgrid를 쓰는 자식 요소가 부모의 행 트랙 3개를 모두 차지하도록 하려면, <code>grid-row</code>에 어떤 값을 줘야 할까요? ("span 숫자" 형태로)`,
          prefix: '.card { grid-row: ', suffix: '; }', accept: ['span 3'], placeholder: 'span 숫자',
          why: '<code>grid-row: span 3;</code>은 이 요소가 행 트랙 3개 분량을 차지한다는 뜻이에요. subgrid는 이렇게 차지한 범위만큼의 트랙을 물려받아요.',
          hint: 'span 뒤에 물려받을 트랙 개수(행 3개니까 3)를 쓰세요.'
        }),
        () => makeChoice(
          'subgrid를 쓰기에 특히 적합한 상황은?',
          '반복되는 카드 여러 개의 내부 줄(제목·본문·가격 등) 높이를 서로 맞추고 싶을 때', ['페이지 전체에 그리드를 딱 한 번만 쓸 때', '텍스트 정렬을 왼쪽에서 오른쪽으로 바꾸고 싶을 때', '이미지에 border-radius를 주고 싶을 때'],
          '카드형 목록처럼 여러 개의 반복 요소가 있고, 그 내부 구조를 서로 맞추고 싶을 때 subgrid가 딱 맞아요.',
          '"여러 개가 반복되는데 내부 줄이 안 맞는" 상황을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>.card</code>가 <code>span 3</code>만큼 행을 차지하면서, 부모의 행 트랙 크기를 subgrid로 물려받게 하는 CSS를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: '.card {\n  grid-row: span 3;\n  grid-template-rows: subgrid;\n}',
          accept: ['.card {grid-row: span 3;grid-template-rows: subgrid;}'],
          why: 'grid-row: span 3으로 부모 트랙 3개 범위를 차지하고, grid-template-rows: subgrid로 그 트랙 크기를 그대로 물려받아요.',
          hint: '.card { grid-row: span 3; grid-template-rows: subgrid; } 형태로 써보세요.'
        }),
      ],
      boss: () => {
        const rows = randInt(2, 4);
        return {
          type: 'blank',
          q: `카드 안의 요소들이 부모 그리드의 행 트랙 ${rows}개 범위를 물려받게 하려고 해요. <code>.card { grid-row: span ${rows}; grid-template-rows: ___; }</code>에서 빈칸에 들어갈 값은?`,
          prefix: '', suffix: '', accept: ['subgrid'], placeholder: '값',
          why: 'grid-template-rows에 subgrid를 지정하면, span으로 차지한 만큼의 부모 트랙 크기를 그대로 물려받아요.',
          hint: '"하위 그리드"라는 뜻의 값, 이번 단원의 핵심 키워드예요.'
        };
      }
    },
    {
      id: 'containerQueries',
      title: '컨테이너 쿼리(@container)로 부모 크기에 반응하기',
      ready: true,
      summary: '화면 전체 크기가 아니라 "부모 컨테이너의 크기"에 따라 스타일이 바뀌는 @container 쿼리를 배워요.',
      goals: ['container-type으로 컨테이너 등록하기', '@container로 부모 크기에 따라 스타일 바꾸기', '미디어 쿼리와의 차이 이해하기'],
      blocks: [
        {
          h: '미디어 쿼리의 한계: 화면 크기만 본다',
          html: `<p><code>@media</code>는 오직 <b>브라우저 창(뷰포트) 전체 크기</b>만 봐요. 그런데 같은 카드 컴포넌트를 넓은 사이드바에 넣을 때와 좁은 사이드바에 넣을 때, 화면 크기는 그대로여도 카드가 놓인 <b>부모의 크기</b>는 다를 수 있어요. 미디어 쿼리로는 이걸 구분할 수 없어요.</p>`,
          code: {
            label: 'problem.css',
            lang: 'css',
            src: `/* 화면이 넓어도, 이 카드가 좁은 사이드바 안에 있으면
   여전히 좁은 레이아웃이어야 하는데
   @media만으로는 알 수 없어요 */
@media (min-width: 700px) {
  .card { display: flex; }
}`
          }
        },
        {
          h: '컨테이너로 등록하고 크기를 기준으로 반응하기',
          html: `<p>부모 요소에 <code>container-type: inline-size;</code>를 주면 그 요소는 "컨테이너"로 등록돼요. 이제 자식은 <code>@container (min-width: 400px) { ... }</code>처럼 <b>그 컨테이너의 너비</b>를 기준으로 스타일을 바꿀 수 있어요.</p>`,
          code: {
            label: 'container_query.css',
            lang: 'css',
            src: `.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

@container sidebar (min-width: 400px) {
  .card {
    display: flex;
    gap: 12px;
  }
}`
          },
          after: `<div class="note"><b>정리</b> — 미디어 쿼리는 "뷰포트 크기", 컨테이너 쿼리는 "부모 크기"에 반응해요. 재사용 가능한 컴포넌트를 만들 때는 컨테이너 쿼리가 훨씬 유연해요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `어떤 요소를 컨테이너 쿼리의 기준이 되는 "컨테이너"로 등록하려면, 그 요소에 어떤 CSS 속성을 줘야 할까요? (값은 inline-size)`,
          prefix: '.sidebar { ', suffix: ': inline-size; }', accept: ['container-type'], placeholder: '속성 이름',
          why: '<code>container-type: inline-size;</code>를 주면 그 요소가 컨테이너 쿼리의 기준이 되는 컨테이너로 등록돼요.',
          hint: '"컨테이너의 타입(종류)"을 지정하는 속성이에요.'
        }),
        () => makeChoice(
          '@media와 @container의 가장 큰 차이는?',
          '@media는 브라우저 뷰포트 전체 크기, @container는 지정된 부모 컨테이너의 크기를 기준으로 한다', ['@container는 색상만 바꿀 수 있고 크기는 못 바꾼다', '@media는 자바스크립트 없이는 동작하지 않는다', '@container는 구형 문법이고 @media가 최신 문법이다'],
          '@media는 화면 전체, @container는 그 요소가 속한 부모(컨테이너)의 크기를 기준으로 스타일을 바꿔요.',
          '"무엇의 크기를 기준으로 하는가"가 핵심 차이예요.'
        ),
        () => ({
          type: 'blank',
          q: `container-name이 "sidebar"인 컨테이너의 너비가 400px 이상일 때 <code>.card</code>를 flex로 만들려고 해요. 빈칸을 채우세요.`,
          prefix: '@container sidebar (min-width: 400px) { .card { display: ', suffix: '; } }', accept: ['flex'], placeholder: '값',
          why: '@container 블록 안에서도 일반 CSS와 똑같이 display: flex;를 쓰면 돼요.',
          hint: '가로로 나란히 배치할 때 흔히 쓰는 display 값이에요.'
        }),
        () => makeChoice(
          '컨테이너 쿼리가 특히 유용한 상황은?',
          '같은 카드 컴포넌트를 넓은 영역과 좁은 사이드바 등 서로 다른 부모 크기에 재사용할 때', ['페이지 전체에 딱 한 번만 쓰이는 헤더를 만들 때', '텍스트의 글자 색만 바꾸고 싶을 때', 'JavaScript 없이 버튼 클릭 이벤트를 만들고 싶을 때'],
          '컴포넌트가 놓인 부모의 크기에 따라 스스로 레이아웃을 바꿔야 할 때 컨테이너 쿼리가 진가를 발휘해요.',
          '"재사용 가능한 컴포넌트"라는 키워드를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>.panel</code>을 컨테이너로 등록(container-type: inline-size)하고, 그 너비가 500px 이상이면 자식 <code>.item</code>이 flex로 배치되도록 @container 규칙을 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: '.panel {\n  container-type: inline-size;\n}\n\n@container (min-width: 500px) {\n  .item {\n    display: flex;\n  }\n}',
          accept: ['.panel {container-type: inline-size;}\n\n@container (min-width: 500px) {.item {display: flex;}}'],
          why: 'container-type: inline-size로 .panel을 컨테이너로 만들고, @container (min-width: 500px)로 그 너비 조건에 따라 .item 스타일을 바꿔요.',
          hint: '.panel { container-type: inline-size; } 다음에 @container (min-width: 500px) { .item { display: flex; } }를 쓰세요.'
        }),
      ],
      boss: () => {
        const width = randInt(300, 600);
        const threshold = 400;
        const matches = width >= threshold;
        return {
          type: 'blank',
          q: `<code>@container (min-width: ${threshold}px) { .card { display: flex; } }</code>가 있고, 컨테이너의 실제 너비가 ${width}px예요. 이 규칙이 적용될까요? ("적용" 또는 "미적용")`,
          prefix: '', suffix: '', accept: [matches ? '적용' : '미적용'], placeholder: '적용/미적용',
          why: matches ? `${width}px는 ${threshold}px 이상이라 조건을 만족해서 적용돼요.` : `${width}px는 ${threshold}px보다 작아서 조건을 만족하지 않아 적용되지 않아요.`,
          hint: 'min-width는 "이 값 이상일 때"라는 뜻이에요.'
        };
      }
    },
    {
      id: 'cssCascadeLayers',
      title: '캐스케이드 레이어(@layer)로 우선순위 정리하기',
      ready: true,
      summary: '점점 헷갈리는 CSS 우선순위 다툼을, 레이어 이름 순서로 명확하게 정리해주는 @layer를 배워요.',
      goals: ['@layer로 레이어 선언하고 순서 정하기', '레이어 순서가 명시도(specificity)보다 우선하는 원리', '기존 코드와 새 코드를 레이어로 분리하기'],
      blocks: [
        {
          h: '명시도 때문에 골치 아픈 순간',
          html: `<p>보통 CSS는 나중에 쓴 규칙이 이기지만, 명시도(선택자의 구체성)가 더 높은 규칙이 있으면 순서와 상관없이 그게 이겨버려요. 그래서 "분명 아래에 썼는데 왜 안 먹히지?" 하는 상황이 자주 생겨요.</p>`,
          code: {
            label: 'specificity_problem.css',
            lang: 'css',
            src: `#app .button { color: gray; }   /* 명시도가 높음 */

.button { color: blue; }        /* 나중에 썼지만 명시도가 낮아서 안 이김 */`
          }
        },
        {
          h: '@layer로 순서를 명확하게 정하기',
          html: `<p><code>@layer</code>로 레이어 이름과 순서를 미리 선언하면, <b>레이어 순서가 명시도보다 우선</b>해요. 나중에 선언된 레이어가 앞선 레이어를 항상 이겨요 (레이어 밖의 일반 CSS는 모든 레이어보다 더 강해요).</p>`,
          code: {
            label: 'layers.css',
            lang: 'css',
            src: `@layer base, components, utilities;

@layer base {
  .button { color: blue; }
}

@layer components {
  #app .button { color: gray; }
}

@layer utilities {
  .button { color: red !important; }
}`
          },
          after: `<div class="note"><b>정리</b> — 레이어 순서(base → components → utilities)가 나중일수록 강해지고, 이 우선순위는 명시도보다 먼저 적용돼요. 그래서 utilities 레이어의 낮은 명시도 규칙도 base의 높은 명시도 규칙을 이길 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>@layer base, components, utilities;</code>로 레이어 순서를 선언했어요. 이 중 가장 나중에 선언되어 가장 강한(우선순위가 높은) 레이어는?`,
          prefix: '', suffix: '', accept: ['utilities'], placeholder: '레이어 이름',
          why: '@layer로 선언한 순서에서 가장 나중에 오는 레이어가 가장 강해요. base, components, utilities 순서니까 utilities가 가장 강해요.',
          hint: '목록에서 가장 마지막(오른쪽)에 있는 이름이에요.'
        }),
        () => makeChoice(
          '레이어 순서와 명시도(specificity) 중 어느 것이 먼저 적용될까요?',
          '레이어 순서가 먼저 적용되고, 명시도는 같은 레이어 안에서만 비교된다', ['명시도가 항상 레이어 순서보다 우선한다', '레이어와 명시도는 서로 아무 관련이 없다', '나중에 로드된 CSS 파일이 무조건 이긴다'],
          '레이어 순서가 명시도보다 먼저 적용되기 때문에, 나중 레이어의 낮은 명시도 규칙도 앞선 레이어의 높은 명시도 규칙을 이길 수 있어요.',
          '이 단원의 핵심 문장을 떠올려보세요: "레이어 순서가 명시도보다 우선한다."'
        ),
        () => ({
          type: 'blank',
          q: `<code>@layer base { .button { color: blue; } }</code>처럼, 특정 레이어에 스타일을 넣으려면 규칙 앞에 어떤 키워드를 써야 할까요?`,
          prefix: '', suffix: ' base { .button { color: blue; } }', accept: ['@layer'], placeholder: '키워드',
          why: '<code>@layer 레이어이름 { ... }</code> 형태로 그 레이어에 속하는 스타일 규칙을 작성해요.',
          hint: '"층, 겹"을 뜻하는 영어 단어(layer) 앞에 @을 붙여요.'
        }),
        () => makeChoice(
          '@layer를 쓰는 대표적인 이유는?',
          '기존 코드(레거시), 컴포넌트 스타일, 유틸리티 스타일처럼 서로 다른 출처의 CSS 우선순위를 예측 가능하게 정리하려고', ['CSS 파일을 압축(minify)하기 위해서', '브라우저가 CSS를 더 빠르게 다운로드하게 하려고', '반응형 디자인을 만들기 위해서'],
          '레이어는 여러 출처의 CSS가 뒤섞일 때, "누가 이길지"를 순서로 명확하게 예측 가능하게 만들어줘요.',
          '"우선순위 다툼을 정리한다"는 목적을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '레이어 순서를 reset, theme 순서로 선언하고, theme 레이어 안에 <code>.button</code>의 color를 green으로 지정하는 CSS를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: '@layer reset, theme;\n\n@layer theme {\n  .button {\n    color: green;\n  }\n}',
          accept: ['@layer reset, theme;\n\n@layer theme {.button {color: green;}}'],
          why: '@layer reset, theme;로 순서를 먼저 선언하고, @layer theme { ... } 안에 실제 스타일을 넣어요.',
          hint: '@layer reset, theme; 다음 줄에 @layer theme { .button { color: green; } }를 쓰세요.'
        }),
      ],
      boss: () => {
        const layers = shuffle(['reset', 'base', 'theme', 'utilities']).slice(0, 3);
        const strongest = layers[layers.length - 1];
        return {
          type: 'blank',
          q: `<code>@layer ${layers.join(', ')};</code>로 순서를 선언했을 때, 명시도와 상관없이 가장 강한 우선순위를 갖는 레이어는?`,
          prefix: '', suffix: '', accept: [strongest], placeholder: '레이어 이름',
          why: `레이어는 선언 순서에서 가장 나중에 오는 것이 가장 강해요. "${layers.join(', ')}" 중 마지막은 "${strongest}"예요.`,
          hint: '선언 목록에서 가장 오른쪽(마지막)에 있는 이름을 확인하세요.'
        };
      }
    },
    {
      id: 'scrollSnap',
      title: '스크롤 스냅(scroll-snap)으로 딱딱 맞춰 넘기기',
      ready: true,
      summary: '스크롤할 때 이미지나 카드가 애매한 중간 위치에 멈추지 않고, 항상 딱 맞는 위치에 스냅되는 scroll-snap을 배워요.',
      goals: ['scroll-snap-type으로 스냅 컨테이너 만들기', 'scroll-snap-align으로 자식이 멈출 위치 정하기', '가로 갤러리·풀스크린 섹션에 응용하기'],
      blocks: [
        {
          h: '스크롤이 애매한 곳에서 멈추는 문제',
          html: `<p>가로로 넘기는 이미지 갤러리를 그냥 <code>overflow-x: scroll;</code>만으로 만들면, 손을 떼는 순간 이미지가 반쯤 걸친 애매한 위치에서 멈춰버려요. 앱스토어의 스크린샷 갤러리처럼 "딱딱" 맞춰서 멈추게 하려면 scroll-snap이 필요해요.</p>`,
          code: {
            label: 'no_snap.css',
            lang: 'css',
            src: `.gallery {
  display: flex;
  overflow-x: scroll;
  gap: 10px;
}
.gallery img {
  width: 250px;
  flex-shrink: 0;
}`
          }
        },
        {
          h: '부모에 scroll-snap-type, 자식에 scroll-snap-align',
          html: `<p>부모(스크롤 컨테이너)에 <code>scroll-snap-type: x mandatory;</code>를 주면 가로 스크롤이 반드시 스냅 지점에서 멈춰요. 자식마다 <code>scroll-snap-align: start;</code>를 주면 그 자식의 시작 지점이 스냅 기준점이 돼요.</p>`,
          code: {
            label: 'snap.css',
            lang: 'css',
            src: `.gallery {
  display: flex;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  gap: 10px;
}
.gallery img {
  width: 250px;
  flex-shrink: 0;
  scroll-snap-align: start;
}`,
            preview: `<style>body{font-family:sans-serif;margin:14px}.gallery{display:flex;overflow-x:scroll;scroll-snap-type:x mandatory;gap:10px;border:1px solid #ccc;padding:8px}.slide{width:150px;height:100px;flex-shrink:0;scroll-snap-align:start;border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold}</style><div class="gallery"><div class="slide" style="background:tomato">1</div><div class="slide" style="background:royalblue">2</div><div class="slide" style="background:seagreen">3</div><div class="slide" style="background:goldenrod">4</div></div><p style="color:#888;font-size:13px">가로로 스크롤해보면 카드가 딱 맞춰 멈춰요</p>`
          },
          after: `<div class="note"><b>정리</b> — x(가로)/y(세로) 방향과 mandatory(반드시 스냅)/proximity(가까우면 스냅) 조합으로 다양한 스냅 스크롤(가로 갤러리, 풀스크린 섹션 넘기기 등)을 만들 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `가로 스크롤 컨테이너가 반드시 스냅 지점에서 멈추게 하려면, <code>scroll-snap-type</code>에 어떤 값을 줘야 할까요? (두 단어, 공백으로 구분)`,
          prefix: '.gallery { scroll-snap-type: ', suffix: '; }', accept: ['x mandatory'], placeholder: '값',
          why: '<code>x mandatory</code>는 "가로(x) 방향으로 반드시(mandatory) 스냅한다"는 뜻이에요.',
          hint: '방향(x)과 강제성(mandatory)을 공백으로 나눠서 쓰세요.'
        }),
        () => makeChoice(
          'scroll-snap-type과 scroll-snap-align의 관계로 알맞은 것은?',
          'scroll-snap-type은 스크롤 컨테이너(부모)에, scroll-snap-align은 스냅될 자식 요소에 지정한다', ['둘 다 반드시 부모에만 지정해야 한다', 'scroll-snap-align이 스크롤 방향을 결정한다', 'scroll-snap-type은 이미지 크기를 자동으로 조절해준다'],
          '컨테이너(부모)에는 scroll-snap-type으로 "스냅한다"는 것을, 각 자식에는 scroll-snap-align으로 "어디에 맞출지"를 지정해요.',
          '"컨테이너 설정"과 "자식 설정"을 구분해서 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `자식 요소의 시작 지점을 스냅 기준점으로 삼으려면 <code>scroll-snap-align</code>에 어떤 값을 줘야 할까요?`,
          prefix: '.slide { scroll-snap-align: ', suffix: '; }', accept: ['start'], placeholder: '값',
          why: '<code>scroll-snap-align: start;</code>는 그 요소의 시작 부분이 스냅 지점이 된다는 뜻이에요. (center, end도 가능해요)',
          hint: '"시작"을 뜻하는 영어 단어예요.'
        }),
        () => makeChoice(
          'scroll-snap을 쓰기 좋은 상황은?',
          '앱스토어 스크린샷 갤러리처럼, 가로로 넘길 때 카드/이미지가 애매한 위치가 아니라 딱 맞춰 멈추게 하고 싶을 때', ['텍스트 줄바꿈을 자동으로 하고 싶을 때', '이미지 파일 용량을 줄이고 싶을 때', '버튼에 그림자 효과를 주고 싶을 때'],
          '스크롤이 멈추는 위치를 예측 가능하게 만들고 싶은 가로 갤러리, 풀스크린 섹션 등에 scroll-snap이 딱 맞아요.',
          '"딱딱 맞춰 멈춘다"는 핵심 동작을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>.gallery</code>를 flex로 가로 스크롤하게 만들고 scroll-snap-type: x mandatory를 주고, 자식 <code>.slide</code>에는 scroll-snap-align: start를 주는 CSS를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: '.gallery {\n  display: flex;\n  overflow-x: scroll;\n  scroll-snap-type: x mandatory;\n}\n.slide {\n  scroll-snap-align: start;\n}',
          accept: ['.gallery {display: flex;overflow-x: scroll;scroll-snap-type: x mandatory;}\n.slide {scroll-snap-align: start;}'],
          why: '부모(.gallery)에 scroll-snap-type: x mandatory, 자식(.slide)에 scroll-snap-align: start를 지정해요.',
          hint: '.gallery에 display: flex, overflow-x: scroll, scroll-snap-type: x mandatory를, .slide에 scroll-snap-align: start를 쓰세요.'
        }),
      ],
      boss: () => {
        const align = pick(['start', 'center', 'end']);
        const alignKo = { start: '시작', center: '가운데', end: '끝' }[align];
        return {
          type: 'blank',
          q: `<code>.slide { scroll-snap-align: ${align}; }</code>일 때, 스크롤이 멈추면 각 slide 요소의 어느 지점이 스냅 기준이 될까요? ("시작"/"가운데"/"끝" 중 하나)`,
          prefix: '', suffix: '', accept: [alignKo], placeholder: '시작/가운데/끝',
          why: `scroll-snap-align: ${align}은 요소의 "${alignKo}" 지점을 스냅 기준으로 삼아요.`,
          hint: 'start=시작, center=가운데, end=끝이에요.'
        };
      }
    },
    {
      id: 'cssNesting',
      title: '네이티브 CSS 중첩(Nesting)',
      ready: true,
      summary: '전처리기(Sass) 없이도 브라우저가 직접 지원하는 CSS 중첩 문법으로, 선택자를 더 짧고 읽기 좋게 써요.',
      goals: ['& 기호로 부모 선택자 참조하기', '중첩된 자식/의사 클래스 선택자 작성하기', '중첩과 명시도의 관계 이해하기'],
      blocks: [
        {
          h: '반복되는 부모 선택자',
          html: `<p>지금까지는 <code>.card</code>, <code>.card:hover</code>, <code>.card .title</code>처럼 관련된 선택자마다 <code>.card</code>를 매번 반복해서 썼어요. 규칙이 많아질수록 이름이 계속 반복돼서 읽기 피곤해져요.</p>`,
          code: {
            label: 'without_nesting.css',
            lang: 'css',
            src: `.card { padding: 12px; }
.card:hover { box-shadow: 0 4px 10px rgba(0,0,0,.15); }
.card .title { font-weight: bold; }`
          }
        },
        {
          h: '중첩으로 한 곳에 모으기: &',
          html: `<p>브라우저가 직접 지원하는 <b>네이티브 CSS 중첩</b>을 쓰면, 관련 규칙을 <code>.card { }</code> 블록 안에 모을 수 있어요. <code>&</code>는 "바로 바깥의 부모 선택자"를 가리켜요.</p>`,
          code: {
            label: 'with_nesting.css',
            lang: 'css',
            src: `.card {
  padding: 12px;

  &:hover {
    box-shadow: 0 4px 10px rgba(0,0,0,.15);
  }

  .title {
    font-weight: bold;
  }
}`
          },
          after: `<div class="note"><b>주의</b> — 중첩은 문법을 짧게 해줄 뿐, 실제로는 브라우저가 <code>.card:hover</code>, <code>.card .title</code>처럼 풀어서(flatten) 계산해요. 그래서 명시도는 풀어서 쓴 것과 동일해요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `CSS 중첩에서, 바로 바깥의 부모 선택자를 가리키는 기호는 무엇일까요?`,
          prefix: '', suffix: '', accept: ['&'], placeholder: '기호',
          why: '<code>&</code>는 중첩 블록에서 부모 선택자를 참조하는 기호예요. 예를 들어 <code>.card { &:hover {...} }</code>는 <code>.card:hover</code>와 같아요.',
          hint: 'Sass 같은 전처리기에서도 똑같이 쓰던 기호예요.'
        }),
        () => makeChoice(
          '<code>.card { &:hover { color: red; } }</code>와 같은 뜻의 풀어 쓴 선택자는?',
          '.card:hover { color: red; }', ['.card hover { color: red; }', 'card.hover { color: red; }', '.card > hover { color: red; }'],
          '&는 부모 선택자(.card) 바로 뒤에 그대로 붙어서 .card:hover가 돼요.',
          '&가 있던 자리에 .card를 그대로 붙여넣어 보세요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>.card { .title { font-weight: bold; } }</code>처럼 자손 선택자를 중첩해서 쓰면, 이건 풀어 쓰면 어떤 선택자와 같을까요? (그대로 입력, 공백 하나로 구분)`,
          prefix: '', suffix: '', accept: ['.card .title'], placeholder: '.card .title',
          why: '중첩된 자손 선택자는 부모 뒤에 공백을 두고 이어 붙인 <code>.card .title</code>과 같아요.',
          hint: '& 없이 그냥 안에 쓴 선택자는 공백으로 이어붙인 자손 선택자가 돼요.'
        }),
        () => makeChoice(
          'CSS 중첩(nesting)에 대한 설명으로 올바른 것은?',
          '전처리기(Sass) 없이도 브라우저가 직접 지원하며, 실제로는 풀어 쓴 선택자와 동일하게 동작한다', ['중첩을 쓰면 명시도가 항상 0이 된다', '중첩은 반드시 Sass 같은 전처리기를 설치해야만 쓸 수 있다', '중첩된 스타일은 자바스크립트로만 적용된다'],
          '최신 브라우저는 CSS 중첩을 네이티브로 지원하고, 내부적으로는 결국 풀어 쓴 선택자와 똑같이 계산돼요.',
          '"네이티브(브라우저가 직접 지원)"라는 키워드가 핵심이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>.menu</code> 안에 padding: 8px를 주고, 중첩으로 <code>&:hover</code>에서 background를 lightgray로, 자손 <code>.item</code>에서 color를 navy로 지정하는 CSS를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: '.menu {\n  padding: 8px;\n\n  &:hover {\n    background: lightgray;\n  }\n\n  .item {\n    color: navy;\n  }\n}',
          accept: ['.menu {padding: 8px;\n\n&:hover {background: lightgray;}\n\n.item {color: navy;}}'],
          why: '.menu 블록 안에 &:hover로 호버 상태를, .item으로 자손 선택자를 중첩해서 표현해요.',
          hint: '.menu { padding: 8px; &:hover { background: lightgray; } .item { color: navy; } } 형태로 쓰세요.'
        }),
      ],
      boss: () => {
        const cls = pick(['nav', 'panel', 'box']);
        const child = pick(['icon', 'label', 'text']);
        return {
          type: 'blank',
          q: `<code>.${cls} { .${child} { color: red; } }</code>처럼 CSS 중첩으로 쓴 선택자를, 전통적인 방식으로 풀어 쓰면 어떻게 될까요? (공백 하나로 구분해서 그대로 입력)`,
          prefix: '', suffix: '', accept: [`.${cls} .${child}`], placeholder: `.${cls} .${child}`,
          why: `중첩된 자손 선택자는 부모(.${cls}) 뒤에 공백을 두고 자식(.${child})을 이어붙인 것과 같아요.`,
          hint: '부모 클래스와 자식 클래스를 공백 하나로 이어 붙이세요.'
        };
      }
    },
    {
      id: 'webComponentsBasics',
      title: '웹 컴포넌트 기초: 커스텀 엘리먼트와 섀도 DOM',
      ready: true,
      summary: '나만의 HTML 태그를 직접 만들고(customElements), 그 내부 스타일이 바깥에 새지 않도록 감싸는 섀도 DOM 개념을 배워요.',
      goals: ['customElements.define으로 나만의 태그 만들기', 'connectedCallback으로 태그가 화면에 붙을 때 동작 정의하기', '섀도 DOM으로 스타일 캡슐화 이해하기'],
      blocks: [
        {
          h: '나만의 태그 만들기: customElements.define',
          html: `<p>브라우저는 <code>&lt;div&gt;</code>, <code>&lt;button&gt;</code> 같은 정해진 태그만 아는 게 아니에요. <code>customElements.define("태그이름", 클래스)</code>로 <b>내가 직접 만든 태그</b>를 등록할 수 있어요. 태그 이름에는 반드시 하이픈(<code>-</code>)이 들어가야 해요.</p>`,
          code: {
            label: 'my_badge.js',
            lang: 'javascript',
            src: `class MyBadge extends HTMLElement {
  connectedCallback() {
    this.textContent = "NEW";
    this.style.background = "gold";
    this.style.padding = "2px 8px";
    this.style.borderRadius = "4px";
  }
}

customElements.define("my-badge", MyBadge);`,
            preview: `<style>body{font-family:sans-serif;margin:14px}</style><p>상품 이름 <my-badge></my-badge></p><script>class MyBadge extends HTMLElement{connectedCallback(){this.textContent="NEW";this.style.background="gold";this.style.padding="2px 8px";this.style.borderRadius="4px";}}customElements.define("my-badge",MyBadge);</script>`
          }
        },
        {
          h: '태그가 화면에 붙는 순간: connectedCallback',
          html: `<p><code>connectedCallback()</code>은 이 커스텀 엘리먼트가 실제로 문서(화면)에 연결되는 순간 자동으로 실행돼요. 마치 컴포넌트의 "초기화" 함수 같은 역할이에요.</p>`
        },
        {
          h: '섀도 DOM: 스타일이 바깥으로 새지 않게 감싸기',
          html: `<p><code>attachShadow({ mode: "open" })</code>로 <b>섀도 DOM</b>이라는 독립된 작은 문서를 만들 수 있어요. 섀도 DOM 안의 <code>&lt;style&gt;</code>은 그 안에서만 적용되고, 바깥 페이지의 CSS와 서로 영향을 주지 않아요.</p>`,
          code: {
            label: 'shadow_dom.js',
            lang: 'javascript',
            src: `class MyBadge extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML =
      "<style>span{background:gold;padding:2px 8px;border-radius:4px;}</style>" +
      "<span>NEW</span>";
  }
}

customElements.define("my-badge", MyBadge);`
          },
          after: `<div class="note"><b>정리</b> — customElements.define으로 태그를 만들고, connectedCallback으로 초기 동작을, attachShadow로 스타일을 캡슐화(외부와 격리)하는 것이 웹 컴포넌트의 세 기둥이에요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `나만의 커스텀 태그 "user-card"를 UserCard 클래스와 연결해서 등록하는 코드의 빈칸을 채우세요.`,
          prefix: 'customElements.', suffix: '("user-card", UserCard);', accept: ['define'], placeholder: '메서드',
          why: '<code>customElements.define(태그이름, 클래스)</code>로 커스텀 엘리먼트를 등록해요.',
          hint: '"정의하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '커스텀 엘리먼트의 태그 이름을 지을 때 반드시 지켜야 하는 규칙은?',
          '이름에 하이픈(-)이 하나 이상 포함되어야 한다', ['이름이 반드시 대문자로 시작해야 한다', '이름의 길이가 정확히 5글자여야 한다', '숫자를 포함할 수 없다'],
          '브라우저 내장 태그와 구분하기 위해, 커스텀 엘리먼트 이름에는 반드시 하이픈이 들어가야 해요 (예: my-badge, user-card).',
          '기존 HTML 태그(div, button 등)에는 없는 문자가 꼭 들어가야 해요.'
        ),
        () => ({
          type: 'blank',
          q: `커스텀 엘리먼트가 실제로 화면(문서)에 연결되는 순간 자동으로 실행되는 메서드 이름을 쓰세요.`,
          prefix: 'class MyBadge extends HTMLElement { ', suffix: '() { this.textContent = "NEW"; } }', accept: ['connectedCallback'], placeholder: '메서드 이름',
          why: '<code>connectedCallback()</code>은 엘리먼트가 문서에 연결(connected)될 때 브라우저가 자동으로 호출해줘요.',
          hint: '"연결되었을 때 호출되는(callback) 것"이라는 뜻의 이름이에요.'
        }),
        () => makeChoice(
          '섀도 DOM(attachShadow)을 쓰는 이유로 알맞은 것은?',
          '컴포넌트 내부 스타일이 바깥 페이지에 영향을 주거나 받지 않도록 격리하기 위해', ['페이지 로딩 속도를 두 배로 빠르게 만들기 위해', '이미지 파일을 압축하기 위해', '자바스크립트 문법 오류를 자동으로 고치기 위해'],
          '섀도 DOM 안의 스타일은 바깥과 격리돼서, 컴포넌트를 어디에 갖다 놔도 스타일 충돌이 안 생겨요.',
          '"캡슐화, 격리"라는 키워드를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: 'HTMLElement를 상속한 MyBadge 클래스를 만들어 connectedCallback에서 textContent를 "NEW"로 설정하고, customElements.define으로 "my-badge" 태그로 등록하는 코드를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: 'class MyBadge extends HTMLElement {\n  connectedCallback() {\n    this.textContent = "NEW";\n  }\n}\n\ncustomElements.define("my-badge", MyBadge);',
          accept: ['class MyBadge extends HTMLElement {\n  connectedCallback() {\n    this.textContent = "NEW";\n  }\n}\n\ncustomElements.define("my-badge", MyBadge);'],
          why: 'HTMLElement를 상속하고 connectedCallback에서 초기 동작을 정의한 뒤, customElements.define으로 태그 이름과 연결해요.',
          hint: 'class MyBadge extends HTMLElement { connectedCallback() { this.textContent = "NEW"; } } 다음에 customElements.define("my-badge", MyBadge);를 쓰세요.'
        }),
      ],
      boss: () => {
        const tagName = pick(['user-card', 'price-tag', 'star-rating']);
        return {
          type: 'blank',
          q: `클래스 이름이 Widget인 컴포넌트를 <code>"${tagName}"</code>이라는 태그로 등록하려고 해요. 빈칸을 채우세요.`,
          prefix: 'customElements.define("', suffix: `", Widget);`, accept: [tagName], placeholder: '태그 이름',
          why: `customElements.define의 첫 번째 인자는 등록할 태그 이름이므로 "${tagName}"을 그대로 써야 해요.`,
          hint: '따옴표 안에 문제에서 준 태그 이름을 그대로 쓰면 돼요.'
        };
      }
    },
    {
      id: 'ariaLiveRegions',
      title: 'ARIA 라이브 리전으로 동적 변경 알리기',
      ready: true,
      summary: '화면을 안 보고 스크린 리더로 듣는 사용자에게, 자바스크립트로 바뀐 내용(알림, 장바구니 수량 등)을 자동으로 읽어주게 하는 aria-live를 배워요.',
      goals: ['aria-live의 필요성 이해하기', 'polite와 assertive 차이 구분하기', '실시간 알림 영역 만들기'],
      blocks: [
        {
          h: '스크린 리더는 "새로 생긴 내용"을 모른다',
          html: `<p>자바스크립트로 <code>textContent</code>를 바꿔서 "장바구니에 담겼습니다" 같은 메시지를 화면에 띄워도, 스크린 리더는 그 변화를 자동으로 알아채지 못해요. 사용자가 그 부분을 직접 다시 읽어야만 알 수 있어요.</p>`,
          code: {
            label: 'silent_update.html',
            lang: 'html',
            src: `<div id="status"></div>

<script>
document.querySelector("#status").textContent = "장바구니에 담겼습니다";
</script>`
          }
        },
        {
          h: 'aria-live로 "이 영역이 바뀌면 읽어줘"라고 알리기',
          html: `<p><code>aria-live="polite"</code>를 붙인 영역은, 내용이 바뀔 때 스크린 리더가 <b>사용자가 하던 일을 방해하지 않는 선에서</b> 자동으로 읽어줘요. 긴급한 알림(오류 등)은 <code>aria-live="assertive"</code>로 즉시 끼어들어 읽게 할 수 있어요.</p>`,
          code: {
            label: 'live_region.html',
            lang: 'html',
            src: `<div id="status" aria-live="polite"></div>
<button id="addBtn">장바구니에 담기</button>

<script>
document.querySelector("#addBtn").addEventListener("click", () => {
  document.querySelector("#status").textContent = "장바구니에 담겼습니다";
});
</script>`,
            preview: `<style>body{font-family:sans-serif;margin:14px}#status{color:seagreen;font-weight:bold;min-height:20px}</style><div id="status" aria-live="polite"></div><button id="addBtn">장바구니에 담기</button><script>document.querySelector("#addBtn").addEventListener("click",()=>{document.querySelector("#status").textContent="장바구니에 담겼습니다";});</script>`
          },
          after: `<div class="note"><b>정리</b> — 일반 알림은 polite, 오류처럼 즉시 알려야 하는 건 assertive를 써요. 너무 자주 assertive를 쓰면 오히려 사용자 경험을 방해할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `내용이 바뀔 때 스크린 리더가 "사용자를 방해하지 않는 선에서" 자동으로 읽어주게 하는 aria-live 값을 쓰세요.`,
          prefix: '<div aria-live="', suffix: '"></div>', accept: ['polite'], placeholder: '값',
          why: '<code>aria-live="polite"</code>는 사용자가 하던 작업을 끊지 않고, 여유 있을 때 새 내용을 읽어줘요.',
          hint: '"공손한, 정중한"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'aria-live="assertive"와 aria-live="polite"의 차이는?',
          'assertive는 하던 일을 끊고 즉시 읽고, polite는 방해하지 않는 선에서 여유 있을 때 읽는다', ['assertive는 색상을 빨갛게 바꾸고, polite는 파랗게 바꾼다', '둘 다 완전히 같은 동작을 한다', 'polite만 실제로 스크린 리더에서 동작한다'],
          'assertive는 긴급 알림(오류 등)에, polite는 일반 알림(장바구니 담김 등)에 적합해요.',
          '"단호한(assertive)"과 "공손한(polite)"이라는 단어 뜻 차이를 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `자바스크립트로 textContent만 바꿨을 때, 스크린 리더가 그 변화를 자동으로 알아채지 못하는 문제를 해결하려면 그 영역에 어떤 속성을 추가해야 할까요?`,
          prefix: '<div id="status" ', suffix: '="polite"></div>', accept: ['aria-live'], placeholder: '속성 이름',
          why: 'aria-live 속성이 있어야 스크린 리더가 그 영역의 내용 변화를 감지해서 읽어줘요.',
          hint: '"살아있는(live)" 영역이라는 뜻의 aria 속성이에요.'
        }),
        () => makeChoice(
          'aria-live 영역을 쓰기 적합한 예로 알맞은 것은?',
          '버튼 클릭 후 "장바구니에 담겼습니다" 같은 동적 알림 메시지를 표시하는 영역', ['처음부터 고정되어 절대 바뀌지 않는 페이지 제목', '이미지의 대체 텍스트(alt)', '링크의 href 속성값'],
          'aria-live는 내용이 동적으로(자바스크립트로) 바뀌는 알림·상태 영역에 사용해요.',
          '"동적으로 바뀌는 내용"이라는 조건을 만족하는 보기를 찾아보세요.'
        ),
        () => ({
          type: 'code',
          q: 'id가 "status"이고 aria-live="polite"인 div를 만들고, 버튼 클릭 시 그 div의 textContent를 "저장되었습니다"로 바꾸는 코드를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: '<div id="status" aria-live="polite"></div>\n<button id="saveBtn">저장</button>\n\n<script>\ndocument.querySelector("#saveBtn").addEventListener("click", () => {\n  document.querySelector("#status").textContent = "저장되었습니다";\n});\n</script>',
          accept: ['<div id="status" aria-live="polite"></div>\n<button id="saveBtn">저장</button>\n\n<script>\ndocument.querySelector("#saveBtn").addEventListener("click", () => {\n  document.querySelector("#status").textContent = "저장되었습니다";\n});\n</script>'],
          why: 'aria-live="polite"가 있는 영역의 textContent를 바꾸면, 스크린 리더가 그 변화를 자동으로 읽어줘요.',
          hint: 'aria-live="polite" div를 만들고, 버튼 클릭 이벤트 안에서 그 div의 textContent를 바꾸세요.'
        }),
      ],
      boss: () => {
        const urgency = pick(['일반 알림(장바구니 담김)', '즉시 알려야 할 오류 메시지']);
        const answer = urgency === '일반 알림(장바구니 담김)' ? 'polite' : 'assertive';
        return {
          type: 'blank',
          q: `"${urgency}"을(를) 표시하는 영역에 쓰기 알맞은 aria-live 값은?`,
          prefix: '', suffix: '', accept: [answer], placeholder: '값',
          why: `${urgency === '일반 알림(장바구니 담김)' ? '방해하지 않고 여유 있을 때 읽어주는 polite가' : '즉시 끼어들어 읽어주는 assertive가'} 적합해요.`,
          hint: '급한 오류는 assertive, 일반 알림은 polite예요.'
        };
      }
    },
    {
      id: 'canvasBasics',
      title: 'Canvas API로 도형 그리기',
      ready: true,
      summary: '자바스크립트 코드로 사각형·원·선을 직접 그리는 Canvas 2D 그리기 API의 기초를 배워요.',
      goals: ['getContext("2d")로 그리기 컨텍스트 얻기', 'fillRect/arc로 도형 그리기', 'fillStyle로 색 지정하기'],
      blocks: [
        {
          h: '캔버스는 빈 도화지, 그리기는 자바스크립트로',
          html: `<p><code>&lt;canvas&gt;</code> 태그는 그 자체로는 빈 사각형 도화지예요. 실제로 뭔가를 그리려면 <code>getContext("2d")</code>로 "2D 그리기 도구(컨텍스트)"를 얻어야 해요.</p>`,
          code: {
            label: 'canvas_setup.html',
            lang: 'html',
            src: `<canvas id="board" width="200" height="120"></canvas>

<script>
const canvas = document.querySelector("#board");
const ctx = canvas.getContext("2d");
</script>`
          }
        },
        {
          h: '사각형과 원 그리기: fillRect, arc',
          html: `<p><code>ctx.fillStyle</code>로 색을 정하고, <code>ctx.fillRect(x, y, 너비, 높이)</code>로 사각형을 채워 그려요. 원은 <code>ctx.arc(중심x, 중심y, 반지름, 시작각, 끝각)</code>으로 경로를 그린 뒤 <code>ctx.fill()</code>로 채워요.</p>`,
          code: {
            label: 'draw_shapes.js',
            lang: 'javascript',
            src: `ctx.fillStyle = "tomato";
ctx.fillRect(10, 10, 80, 50);

ctx.beginPath();
ctx.arc(140, 60, 30, 0, Math.PI * 2);
ctx.fillStyle = "royalblue";
ctx.fill();`,
            preview: `<canvas id="board" width="200" height="120" style="border:1px solid #ccc"></canvas><script>const ctx=document.querySelector("#board").getContext("2d");ctx.fillStyle="tomato";ctx.fillRect(10,10,80,50);ctx.beginPath();ctx.arc(140,60,30,0,Math.PI*2);ctx.fillStyle="royalblue";ctx.fill();</script>`
          },
          after: `<div class="note"><b>정리</b> — Canvas는 "그린 결과"만 화면에 남고, 각 도형을 개별 DOM 요소로 다루지 않아요. 그래서 그래프, 게임, 이미지 편집처럼 그리기 연산이 많은 곳에 적합해요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>&lt;canvas&gt;</code> 요소에서 실제로 그림을 그릴 수 있는 2D 그리기 도구를 얻으려면 어떤 메서드를 호출해야 할까요? (인자 포함해서 그대로)`,
          prefix: 'const ctx = canvas.', suffix: ';', accept: ['getContext("2d")'], placeholder: '메서드 호출',
          why: '<code>canvas.getContext("2d")</code>로 2D 그리기 컨텍스트를 얻어야 fillRect, arc 같은 그리기 메서드를 쓸 수 있어요.',
          hint: '"컨텍스트(그리기 도구)를 얻는다"는 뜻의 메서드에 "2d"를 인자로 넘겨요.'
        }),
        () => {
          const w = randInt(50, 150);
          const h = randInt(30, 100);
          return makeChoice(
            `가로 ${w}, 세로 ${h} 크기의 채워진 사각형을 (10, 10) 위치에 그리는 코드로 알맞은 것은?`,
            `ctx.fillRect(10, 10, ${w}, ${h});`, [`ctx.drawRect(10, 10, ${w}, ${h});`, `ctx.rect(${w}, ${h}, 10, 10);`, `ctx.fillRect(${w}, ${h});`],
            `fillRect(x, y, 너비, 높이) 순서로 인자를 넘겨야 해서, ctx.fillRect(10, 10, ${w}, ${h});가 맞아요.`,
            'fillRect의 인자 순서는 x, y, width, height예요.'
          );
        },
        () => ({
          type: 'blank',
          q: `도형을 채울 색을 지정하는 Canvas 컨텍스트의 프로퍼티 이름을 쓰세요.`,
          prefix: 'ctx.', suffix: ' = "royalblue";', accept: ['fillStyle'], placeholder: '프로퍼티 이름',
          why: '<code>ctx.fillStyle</code>에 색상 문자열을 대입하면, 그 다음 fillRect나 fill()로 그리는 도형이 그 색으로 채워져요.',
          hint: '"채우는(fill) 스타일"이라는 뜻의 프로퍼티예요.'
        }),
        () => makeChoice(
          'Canvas가 일반 HTML 요소(div 등)를 그리드나 flex로 배치하는 것과 다른 점은?',
          '각 도형이 개별 DOM 요소로 남지 않고, 픽셀 단위로 "그려진 결과"만 화면에 남는다', ['Canvas는 반드시 텍스트만 표시할 수 있다', 'Canvas 안의 도형도 CSS 클래스로 선택하고 스타일링할 수 있다', 'Canvas는 자바스크립트 없이도 도형을 그릴 수 있다'],
          'Canvas에 그린 사각형이나 원은 개별 요소가 아니라 픽셀 그림으로 남기 때문에, 나중에 CSS 선택자로 그 도형만 골라 스타일링할 수 없어요.',
          '"그려진 결과만 남는다"는 Canvas의 근본적인 특징을 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: 'id가 "board"인 canvas에서 2D 컨텍스트를 얻고, fillStyle을 "green"으로 지정한 뒤 (20, 20) 위치에 가로 60, 세로 40 사각형을 그리는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'const ctx = document.querySelector("#board").getContext("2d");\nctx.fillStyle = "green";\nctx.fillRect(20, 20, 60, 40);',
          accept: ['const ctx = document.querySelector("#board").getContext("2d");\nctx.fillStyle = "green";\nctx.fillRect(20, 20, 60, 40);'],
          why: 'getContext("2d")로 컨텍스트를 얻고, fillStyle로 색을 정한 뒤 fillRect(x, y, 너비, 높이)로 사각형을 그려요.',
          hint: 'document.querySelector("#board").getContext("2d") 다음에 fillStyle과 fillRect를 순서대로 쓰세요.'
        }),
      ],
      boss: () => {
        const r = randInt(10, 50);
        const cx = randInt(50, 150);
        const cy = randInt(50, 150);
        return {
          type: 'blank',
          q: `중심이 (${cx}, ${cy})이고 반지름이 ${r}인 원 전체를 그리는 <code>ctx.arc(...)</code> 호출을 완성하세요. (끝각은 Math.PI * 2를 쓰세요)`,
          prefix: 'ctx.arc(', suffix: ');', accept: [`${cx}, ${cy}, ${r}, 0, Math.PI * 2`], placeholder: `${cx}, ${cy}, ${r}, 0, Math.PI * 2`,
          why: `arc(중심x, 중심y, 반지름, 시작각, 끝각) 순서이므로, ${cx}, ${cy}, ${r}, 0, Math.PI * 2가 돼요.`,
          hint: '순서는 중심x, 중심y, 반지름, 시작각(0), 끝각(Math.PI * 2)이에요.'
        };
      }
    },
    {
      id: 'svgBasics',
      title: 'SVG 기초: 인라인 벡터 그래픽과 viewBox',
      ready: true,
      summary: '아무리 확대해도 깨지지 않는 벡터 그래픽 SVG를 HTML에 직접 넣고, viewBox로 좌표 기준을 이해해요.',
      goals: ['HTML 안에 SVG 태그 직접 쓰기', 'circle/rect 같은 기본 도형 그리기', 'viewBox로 좌표계와 확대·축소 이해하기'],
      blocks: [
        {
          h: '이미지 파일 없이, HTML 안에 직접 그리기',
          html: `<p><code>&lt;svg&gt;</code>는 png나 jpg 같은 이미지 파일을 불러오지 않고, HTML 안에 <b>직접 벡터 도형</b>을 그려 넣는 태그예요. 벡터라서 아무리 확대해도 계단 현상 없이 선명해요.</p>`,
          code: {
            label: 'svg_basic.html',
            lang: 'html',
            src: `<svg width="100" height="100" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="royalblue" />
  <rect x="20" y="20" width="30" height="20" fill="gold" />
</svg>`,
            preview: `<svg width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="royalblue" /><rect x="20" y="20" width="30" height="20" fill="gold" /></svg>`
          }
        },
        {
          h: 'viewBox: 도형이 그려지는 좌표계의 기준',
          html: `<p><code>viewBox="0 0 100 100"</code>은 "그림을 그릴 때 사용하는 좌표계가 (0,0)부터 (100,100)까지다"라는 뜻이에요. 실제 화면에 보이는 크기(<code>width</code>, <code>height</code>)와 viewBox 좌표계가 달라도, 브라우저가 알아서 비율에 맞춰 확대·축소해줘요. 그래서 SVG는 반응형으로 늘어나거나 줄어들어도 안 깨져요.</p>`,
          code: {
            label: 'viewbox_scale.html',
            lang: 'html',
            src: `<!-- 실제 표시 크기는 200px이지만
     내부 좌표계는 여전히 0~100 -->
<svg width="200" height="200" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="seagreen" />
</svg>`
          },
          after: `<div class="note"><b>정리</b> — SVG는 로고, 아이콘, 간단한 다이어그램처럼 확대해도 선명해야 하는 그래픽에 적합해요. viewBox의 좌표계와 실제 표시 크기(width/height)는 서로 별개라는 점을 기억하세요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const r = randInt(20, 45);
          return {
            type: 'blank',
            q: `중심이 (50, 50)이고 반지름이 ${r}인 원을 그리는 SVG circle 태그를 완성하세요.`,
            prefix: '<circle cx="50" cy="50" r="', suffix: '" fill="tomato" />', accept: [String(r)], placeholder: '숫자',
            why: `circle의 r 속성이 반지름이므로 ${r}을 그대로 써야 해요.`,
            hint: 'r은 radius(반지름)의 줄임말이에요.'
          };
        },
        () => makeChoice(
          'viewBox 속성이 하는 역할로 알맞은 것은?',
          'SVG 내부 도형들이 위치를 잡는 기준 좌표계를 정의하고, 실제 표시 크기와 별개로 비율에 맞춰 확대·축소되게 한다', ['SVG 파일의 용량을 압축한다', 'SVG 안에 이미지 파일(png)을 삽입한다', 'SVG의 애니메이션 속도를 조절한다'],
          'viewBox는 좌표계를 정의하고, width/height로 지정한 실제 화면 크기에 맞춰 자동으로 비율 조정을 해줘요.',
          '"좌표계 기준"이라는 표현을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `x=20, y=20 위치에 가로 40, 세로 30인 사각형을 그리는 SVG 태그 이름을 쓰세요.`,
          prefix: '<', suffix: ' x="20" y="20" width="40" height="30" fill="gold" />', accept: ['rect'], placeholder: '태그 이름',
          why: '<code>&lt;rect&gt;</code>는 x, y, width, height 속성으로 사각형을 그리는 SVG 태그예요.',
          hint: '"사각형(rectangle)"의 줄임말이에요.'
        }),
        () => makeChoice(
          'SVG(벡터 그래픽)와 일반 이미지 파일(jpg, png)의 차이로 알맞은 것은?',
          'SVG는 좌표와 수식으로 그려서 아무리 확대해도 선명하고, jpg/png는 픽셀 격자라서 확대하면 계단 현상(깨짐)이 생긴다', ['SVG는 항상 png보다 용량이 크다', 'SVG는 애니메이션을 절대 넣을 수 없다', 'jpg는 벡터 방식이고 SVG는 픽셀 방식이다'],
          '벡터(SVG)는 수학적 도형 정의라서 확대해도 선명하고, 래스터(jpg/png)는 고정된 픽셀 격자라서 확대하면 흐려지거나 깨져요.',
          '"벡터 vs 픽셀(래스터)"라는 키워드를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: 'viewBox="0 0 100 100"인 100x100 svg 안에, 중심 (50,50) 반지름 30인 파란색(royalblue) 원을 그리는 코드를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: '<svg width="100" height="100" viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="30" fill="royalblue" />\n</svg>',
          accept: ['<svg width="100" height="100" viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="30" fill="royalblue" />\n</svg>'],
          why: 'svg 태그에 viewBox를 지정하고, 그 안에 circle 태그로 원을 그려요.',
          hint: '<svg width="100" height="100" viewBox="0 0 100 100"> 안에 <circle cx="50" cy="50" r="30" fill="royalblue" />를 쓰세요.'
        }),
      ],
      boss: () => {
        const size = pick([50, 100, 200]);
        return {
          type: 'blank',
          q: `내부 좌표계가 0~${size}인 SVG를 만들려고 해요. viewBox 속성값을 완성하세요. (형식: "0 0 ${size} ${size}")`,
          prefix: '<svg viewBox="', suffix: '">', accept: [`0 0 ${size} ${size}`], placeholder: `0 0 ${size} ${size}`,
          why: `viewBox="최소x 최소y 너비 높이" 형식이므로, 0부터 ${size}까지의 좌표계는 "0 0 ${size} ${size}"가 돼요.`,
          hint: 'viewBox는 "최소x 최소y 너비 높이" 순서의 네 숫자예요.'
        };
      }
    },
    {
      id: 'serviceWorkerIntro',
      title: '서비스 워커와 PWA 맛보기',
      ready: true,
      summary: '웹페이지 뒤에서 독립적으로 실행되며 오프라인 지원과 캐싱을 가능하게 하는 서비스 워커(Service Worker)의 개념을 배워요.',
      goals: ['서비스 워커가 하는 역할 이해하기', 'register로 서비스 워커 등록하기', 'install 이벤트로 캐시 준비하는 흐름 이해하기'],
      blocks: [
        {
          h: '페이지 뒤에서 따로 돌아가는 스크립트',
          html: `<p><b>서비스 워커</b>는 웹페이지와 별개로, 브라우저 뒤편에서 독립적으로 실행되는 스크립트예요. 페이지를 닫아도 계속 동작할 수 있고, 네트워크 요청을 가로채서 <b>오프라인일 때도 미리 저장해둔 파일을 보여주는</b> 것 같은 일을 할 수 있어요. 이런 능력 덕분에 웹사이트를 앱처럼 동작하게 만드는 PWA(프로그레시브 웹 앱)의 핵심 기술이에요.</p>`,
          code: {
            label: 'register.js',
            lang: 'javascript',
            src: `if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(() => console.log("서비스 워커 등록 완료"))
    .catch(err => console.log("등록 실패:", err));
}`
          }
        },
        {
          h: '설치 시점에 필요한 파일 미리 캐싱하기',
          html: `<p>서비스 워커 파일(<code>sw.js</code>) 안에서 <code>install</code> 이벤트를 감지해, 오프라인에서도 필요한 파일들을 미리 캐시(임시 저장)해둘 수 있어요.</p>`,
          code: {
            label: 'sw.js',
            lang: 'javascript',
            src: `self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("my-cache-v1").then(cache => {
      return cache.addAll(["/", "/index.html", "/style.css"]);
    })
  );
});`
          },
          after: `<div class="note"><b>정리</b> — register()로 브라우저에 서비스 워커를 등록하고, install 이벤트에서 필요한 파일을 캐시에 저장해두면, 오프라인이거나 네트워크가 느릴 때도 그 파일들을 즉시 보여줄 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `브라우저에게 "/sw.js" 파일을 서비스 워커로 등록해달라고 요청하는 메서드를 쓰세요.`,
          prefix: 'navigator.serviceWorker.', suffix: '("/sw.js");', accept: ['register'], placeholder: '메서드 이름',
          why: '<code>navigator.serviceWorker.register(경로)</code>로 서비스 워커 파일을 등록해요.',
          hint: '"등록하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '서비스 워커의 가장 핵심적인 특징은?',
          '웹페이지와 별개로 브라우저 뒤편에서 독립적으로 실행되며, 네트워크 요청을 가로채 오프라인 지원 등을 할 수 있다', ['HTML 태그를 새로 만들어주는 기능이다', 'CSS 애니메이션 속도를 조절하는 API다', '페이지가 열려 있을 때만 실행되고 닫으면 즉시 사라진다'],
          '서비스 워커는 페이지와 독립적으로 동작하며 네트워크 요청 가로채기, 오프라인 캐싱 등을 담당해요.',
          '"페이지와 독립적으로 뒤에서 동작한다"는 점이 핵심이에요.'
        ),
        () => ({
          type: 'blank',
          q: `서비스 워커가 처음 설치될 때 발생하는 이벤트 이름을 쓰세요. (self.addEventListener의 첫 번째 인자)`,
          prefix: 'self.addEventListener("', suffix: '", event => { /* 캐시 준비 */ });', accept: ['install'], placeholder: '이벤트 이름',
          why: '<code>install</code> 이벤트에서 필요한 파일들을 미리 캐시에 저장해두는 작업을 해요.',
          hint: '"설치"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          'PWA(프로그레시브 웹 앱)에서 서비스 워커가 담당하는 역할로 알맞은 것은?',
          '필요한 파일을 캐시에 저장해두어, 오프라인이거나 네트워크가 느릴 때도 페이지가 동작하게 해준다', ['서버의 데이터베이스를 직접 수정한다', 'HTML 문서의 구조를 완전히 새로 작성한다', '사용자의 위치 정보를 항상 자동으로 수집한다'],
          '서비스 워커는 캐싱을 통해 오프라인/느린 네트워크에서도 앱처럼 동작하는 경험을 가능하게 해요.',
          '"오프라인에서도 동작"이라는 PWA의 핵심 가치를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: 'navigator에 serviceWorker가 있는지 확인한 뒤, "/sw.js"를 등록하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'if ("serviceWorker" in navigator) {\n  navigator.serviceWorker.register("/sw.js");\n}',
          accept: ['if ("serviceWorker" in navigator) {\n  navigator.serviceWorker.register("/sw.js");\n}'],
          why: '"serviceWorker" in navigator로 브라우저 지원 여부를 먼저 확인한 뒤 register를 호출하는 것이 안전해요.',
          hint: 'if ("serviceWorker" in navigator) { navigator.serviceWorker.register("/sw.js"); } 형태로 쓰세요.'
        }),
      ],
      boss: () => {
        const cacheName = pick(['my-cache-v1', 'app-cache-v2', 'static-v3']);
        return {
          type: 'blank',
          q: `install 이벤트에서 <code>caches.open("${cacheName}")</code>으로 캐시를 여는 코드가 있어요. 이 코드가 실행되는 이벤트 이름은?`,
          prefix: 'self.addEventListener("', suffix: '", event => { /* ... */ });', accept: ['install'], placeholder: '이벤트 이름',
          why: '서비스 워커가 설치될 때 캐시를 미리 준비하는 작업은 install 이벤트에서 해요.',
          hint: '서비스 워커가 "설치"되는 시점의 이벤트예요.'
        };
      }
    },
    {
      id: 'sessionVsLocalStorage',
      title: 'sessionStorage vs localStorage',
      ready: true,
      summary: '둘 다 브라우저에 데이터를 저장하지만, 저장 기간과 공유 범위가 다른 sessionStorage와 localStorage의 차이를 배워요.',
      goals: ['localStorage: 브라우저를 꺼도 남는 저장소', 'sessionStorage: 탭을 닫으면 사라지는 저장소', '상황에 맞는 저장소 선택하기'],
      blocks: [
        {
          h: '둘 다 문자열 키-값 저장소, 그런데 수명이 다르다',
          html: `<p><code>localStorage</code>와 <code>sessionStorage</code>는 사용법(<code>setItem</code>, <code>getItem</code>)이 완전히 똑같아요. 차이는 오직 <b>데이터가 얼마나 오래 살아남는가</b>예요.</p>`,
          code: {
            label: 'same_api.js',
            lang: 'javascript',
            src: `localStorage.setItem("theme", "dark");
sessionStorage.setItem("draft", "임시 저장된 글");

console.log(localStorage.getItem("theme"));
console.log(sessionStorage.getItem("draft"));`
          }
        },
        {
          h: 'localStorage: 브라우저를 꺼도 남아요',
          html: `<p><code>localStorage</code>에 저장한 데이터는 브라우저를 완전히 껐다가 다시 켜도, 직접 지우거나 만료시키지 않는 한 <b>계속 남아있어요</b>. 다크 모드 설정처럼 "오래 기억해야 하는 값"에 적합해요.</p>`
        },
        {
          h: 'sessionStorage: 탭을 닫으면 사라져요',
          html: `<p><code>sessionStorage</code>는 <b>그 탭(세션)이 닫히는 순간 자동으로 사라져요</b>. 같은 페이지를 새로고침해도 유지되지만, 탭을 닫거나 새 탭에서 같은 주소를 열면 별개의 sessionStorage가 돼요. 여러 단계짜리 폼의 임시 입력값처럼 "그 탭 안에서만 잠깐 기억하면 되는 값"에 적합해요.</p>`,
          after: `<div class="note"><b>정리</b> — "오래 기억해야 하나?"라면 localStorage, "이 탭이 열려있는 동안만 기억하면 되나?"라면 sessionStorage를 골라요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '탭을 닫으면 자동으로 사라지는 저장소는?',
          'sessionStorage', ['localStorage', 'cookie', '이 중 둘 다 해당 없음'],
          'sessionStorage는 그 탭(세션)이 닫히면 데이터가 자동으로 사라져요.',
          '"세션(session)"은 "그 방문 동안"이라는 뜻이에요.'
        ),
        () => ({
          type: 'blank',
          q: `브라우저를 완전히 껐다가 다시 켜도 데이터가 남아있어야 하는 다크 모드 설정값은, localStorage와 sessionStorage 중 어디에 저장해야 할까요?`,
          prefix: '', suffix: '', accept: ['localStorage'], placeholder: '저장소 이름',
          why: '오래 기억해야 하는 값(다크 모드 설정 등)은 localStorage에 저장해야 브라우저를 꺼도 유지돼요.',
          hint: '"오래(local하게, 지속적으로) 기억한다"는 이름의 저장소예요.'
        }),
        () => makeChoice(
          'localStorage와 sessionStorage의 API 사용법(setItem, getItem 등)에 대한 설명으로 알맞은 것은?',
          '둘 다 완전히 같은 방식(setItem/getItem)으로 사용하며, 차이는 오직 데이터의 수명(지속 기간)뿐이다', ['localStorage는 객체를 그대로 저장할 수 있지만 sessionStorage는 못한다', 'sessionStorage만 문자열을 저장할 수 있다', '두 저장소는 사용법이 완전히 다른 별개의 API다'],
          '두 저장소는 API가 동일하고, 데이터가 얼마나 오래 유지되는지만 달라요.',
          '메서드 이름을 떠올려보면 둘 다 setItem/getItem으로 똑같아요.'
        ),
        () => {
          const draftKey = pick(['formDraft', 'wizardStep', 'tempInput']);
          return {
            type: 'blank',
            q: `여러 단계짜리 회원가입 폼에서, 그 탭 안에서만 임시로 입력값(키: "${draftKey}")을 기억하면 되고 탭을 닫으면 사라져도 괜찮을 때 쓸 저장소는?`,
            prefix: '', suffix: `.setItem("${draftKey}", "...")`, accept: ['sessionStorage'], placeholder: '저장소 이름',
            why: '탭이 열려있는 동안만 기억하면 되는 임시 값은 sessionStorage가 적합해요.',
            hint: '"그 세션(방문) 동안만" 기억하면 되는 값이에요.'
          };
        },
        () => ({
          type: 'code',
          q: '"draft"라는 키에 "임시글"이라는 값을, 탭을 닫으면 사라지는 저장소에 저장하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'sessionStorage.setItem("draft", "임시글");',
          accept: ['sessionStorage.setItem("draft", "임시글");'],
          why: '탭을 닫으면 사라지는 저장소는 sessionStorage이므로, sessionStorage.setItem을 써요.',
          hint: '탭이 닫히면 사라지는 저장소의 이름을 떠올려보세요.'
        }),
      ],
      boss: () => {
        const scenario = pick(['다크 모드 테마 설정(며칠 뒤에 다시 방문해도 유지되어야 함)', '한 탭 안에서만 쓰는 임시 메모(탭을 닫으면 사라져도 괜찮음)']);
        const answer = scenario.includes('다크 모드') ? 'localStorage' : 'sessionStorage';
        return {
          type: 'blank',
          q: `"${scenario}"에 어울리는 저장소는?`,
          prefix: '', suffix: '', accept: [answer], placeholder: '저장소 이름',
          why: `${scenario.includes('다크 모드') ? '오래 유지되어야 하므로 localStorage가' : '탭이 닫히면 사라져도 괜찮으므로 sessionStorage가'} 적합해요.`,
          hint: '"오래 유지" vs "탭 닫으면 사라짐"으로 구분해보세요.'
        };
      }
    },
    {
      id: 'fetchApiAdvanced',
      title: 'fetch 심화: POST 요청과 에러 처리',
      ready: true,
      summary: '단순 조회(GET)를 넘어, 서버에 데이터를 보내는 POST 요청과 실패했을 때를 대비한 try/catch 에러 처리를 배워요.',
      goals: ['fetch로 POST 요청 보내기', 'response.ok로 실패 응답 확인하기', 'try/catch/finally로 네트워크 오류 처리하기'],
      blocks: [
        {
          h: '서버로 데이터 보내기: POST',
          html: `<p>기본 <code>fetch(주소)</code>는 데이터를 "가져오는" GET 요청이에요. 서버에 새 데이터를 "보내려면" <code>method: "POST"</code>와, 보낼 데이터를 JSON 문자열로 바꾼 <code>body</code>를 함께 넘겨야 해요.</p>`,
          code: {
            label: 'post_request.js',
            lang: 'javascript',
            src: `fetch("/api/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "제목", content: "내용" })
})
  .then(res => res.json())
  .then(data => console.log(data));`
          }
        },
        {
          h: 'fetch는 404, 500이어도 "실패"로 안 본다',
          html: `<p>fetch의 흔한 함정: 서버가 404나 500 같은 에러 상태를 응답해도, <b>fetch 자체는 실패(reject)로 처리하지 않아요</b>. 네트워크 연결 자체가 끊겼을 때만 reject돼요. 그래서 응답이 실제로 성공인지는 <code>response.ok</code>를 직접 확인해야 해요.</p>`,
          code: {
            label: 'check_ok.js',
            lang: 'javascript',
            src: `async function loadPosts() {
  try {
    const res = await fetch("/api/posts");
    if (!res.ok) {
      throw new Error("서버 오류: " + res.status);
    }
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log("요청 실패:", err.message);
  } finally {
    console.log("요청 시도 끝");
  }
}`
          },
          after: `<div class="note"><b>정리</b> — try/catch는 네트워크 자체가 끊기는 경우를, response.ok 확인은 서버가 에러 상태 코드를 응답하는 경우를 각각 잡아내요. 둘 다 챙겨야 안전한 에러 처리가 완성돼요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `서버에 데이터를 새로 만들어 보내는 요청 방식을 fetch의 옵션 객체에 지정하려고 해요. 빈칸을 채우세요.`,
          prefix: 'fetch("/api/posts", { method: "', suffix: '" });', accept: ['POST'], placeholder: '요청 방식',
          why: '데이터를 서버로 보내 새로 생성할 때는 method: "POST"를 써요.',
          hint: '조회(GET)가 아니라 "보내는" 요청 방식이에요. 대문자로 쓰세요.'
        }),
        () => makeChoice(
          '서버가 500 에러 상태를 응답했을 때, fetch()가 반환하는 프로미스는 어떻게 될까요?',
          '거부(reject)되지 않고 정상적으로 resolve되며, response.ok가 false로 표시된다', ['자동으로 reject되어 catch 블록으로 넘어간다', 'fetch 자체가 무한 대기 상태가 된다', '브라우저가 자동으로 재시도한다'],
          'fetch는 네트워크 연결 자체가 끊겼을 때만 reject되고, 404/500 같은 에러 상태 코드는 정상 응답으로 취급해요. 그래서 response.ok를 직접 확인해야 해요.',
          '"네트워크 실패"와 "서버가 에러 상태로 응답"은 fetch 입장에서 서로 다르게 취급돼요.'
        ),
        () => ({
          type: 'blank',
          q: `응답이 실제로 성공(200번대) 상태인지 확인할 수 있는 response의 불리언 프로퍼티 이름을 쓰세요.`,
          prefix: 'if (!res.', suffix: ') { throw new Error("실패"); }', accept: ['ok'], placeholder: '프로퍼티 이름',
          why: '<code>response.ok</code>는 상태 코드가 200~299 범위일 때 true, 그 외엔 false예요.',
          hint: '"괜찮다, 성공이다"라는 뜻의 짧은 영어 단어예요.'
        }),
        () => makeChoice(
          'try/catch/finally에서 finally 블록이 실행되는 시점은?',
          'try가 성공하든 catch로 넘어가든 상관없이, 마지막에 항상 한 번 실행된다', ['에러가 발생했을 때만 실행된다', '에러가 발생하지 않았을 때만 실행된다', 'catch 블록이 없을 때만 실행된다'],
          'finally는 성공/실패 여부와 상관없이 항상 마지막에 실행돼서, "로딩 스피너 끄기" 같은 마무리 작업에 적합해요.',
          '"마지막으로(finally)"라는 이름 그대로, 결과와 상관없이 실행돼요.'
        ),
        () => ({
          type: 'code',
          q: 'async 함수 안에서 "/api/data"로 fetch하고, res.ok가 false면 에러를 던지고, try/catch로 감싸서 실패 시 콘솔에 err.message를 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 8,
          placeholder: 'async function load() {\n  try {\n    const res = await fetch("/api/data");\n    if (!res.ok) {\n      throw new Error("실패");\n    }\n    const data = await res.json();\n    console.log(data);\n  } catch (err) {\n    console.log(err.message);\n  }\n}',
          accept: ['async function load() {\n  try {\n    const res = await fetch("/api/data");\n    if (!res.ok) {\n      throw new Error("실패");\n    }\n    const data = await res.json();\n    console.log(data);\n  } catch (err) {\n    console.log(err.message);\n  }\n}'],
          why: 'await fetch로 요청하고 res.ok를 확인해 실패 시 에러를 던진 뒤, catch에서 err.message로 실패 이유를 확인해요.',
          hint: 'try 안에서 await fetch, if (!res.ok) throw, catch (err)에서 console.log(err.message)를 쓰세요.'
        }),
      ],
      boss: () => {
        const status = pick([200, 404, 500]);
        const isOk = status >= 200 && status < 300;
        return {
          type: 'blank',
          q: `서버가 상태 코드 ${status}로 응답했어요. <code>response.ok</code>의 값은? (true/false)`,
          prefix: '', suffix: '', accept: [isOk ? 'true' : 'false'], placeholder: 'true/false',
          why: `response.ok는 상태 코드가 200~299 범위일 때만 true예요. ${status}는 ${isOk ? '그 범위 안이라 true' : '그 범위 밖이라 false'}예요.`,
          hint: '200번대만 성공(true), 나머지는 false예요.'
        };
      }
    },
    {
      id: 'dragAndDropBasics',
      title: '드래그 앤 드롭 API 기초',
      ready: true,
      summary: '요소를 마우스로 끌어서 다른 곳에 놓는 드래그 앤 드롭을, HTML5 Drag and Drop API의 이벤트로 직접 구현해요.',
      goals: ['draggable 속성으로 끌 수 있게 만들기', 'dragstart/dragover/drop 이벤트 흐름 이해하기', 'preventDefault로 기본 동작 막기'],
      blocks: [
        {
          h: '끌 수 있게 만들기: draggable',
          html: `<p>어떤 요소든 <code>draggable="true"</code>를 주면 마우스로 끌 수 있게 돼요. 끌기 시작하면 <code>dragstart</code> 이벤트가 발생해요.</p>`,
          code: {
            label: 'draggable.html',
            lang: 'html',
            src: `<div id="item" draggable="true">나를 끌어보세요</div>
<div id="box">여기에 놓으세요</div>`
          }
        },
        {
          h: '떨어뜨릴 곳 준비하기: dragover와 drop',
          html: `<p>드롭 대상이 되는 요소는 <code>dragover</code> 이벤트에서 <code>event.preventDefault()</code>를 <b>반드시 호출</b>해야 해요. 그래야 브라우저의 "여긴 못 놓는 곳"이라는 기본 동작을 막고, <code>drop</code> 이벤트가 정상적으로 발생해요.</p>`,
          code: {
            label: 'drop_zone.js',
            lang: 'javascript',
            src: `const item = document.querySelector("#item");
const box = document.querySelector("#box");

box.addEventListener("dragover", event => {
  event.preventDefault();
});

box.addEventListener("drop", event => {
  event.preventDefault();
  box.appendChild(item);
});`,
            preview: `<style>body{font-family:sans-serif;margin:14px}#item{background:gold;padding:8px;display:inline-block;cursor:grab;border-radius:6px}#box{margin-top:10px;min-height:60px;border:2px dashed #999;padding:10px;border-radius:6px}</style><div id="item" draggable="true">나를 끌어보세요</div><div id="box">여기에 놓으세요</div><script>const item=document.querySelector("#item"),box=document.querySelector("#box");box.addEventListener("dragover",e=>{e.preventDefault();});box.addEventListener("drop",e=>{e.preventDefault();box.appendChild(item);});</script>`
          },
          after: `<div class="note"><b>정리</b> — draggable(끌 수 있게) → dragstart(끌기 시작) → dragover(지나가는 중, preventDefault 필수) → drop(놓임) 순서의 흐름을 기억하세요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `어떤 요소를 마우스로 끌 수 있게 만들려면, 그 요소에 어떤 속성을 true로 줘야 할까요?`,
          prefix: '<div ', suffix: '="true">나를 끌어보세요</div>', accept: ['draggable'], placeholder: '속성 이름',
          why: '<code>draggable="true"</code>를 주면 그 요소를 마우스로 끌 수 있게 돼요.',
          hint: '"끌 수 있는(drag + able)"이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '드롭 대상 요소의 dragover 이벤트에서 반드시 event.preventDefault()를 호출해야 하는 이유는?',
          '브라우저의 기본 동작(여긴 놓을 수 없다는 처리)을 막아야, drop 이벤트가 정상적으로 발생하기 때문', ['페이지 스크롤을 막기 위해서', '이벤트 버블링을 완전히 멈추기 위해서', 'CSS 애니메이션을 재생시키기 위해서'],
          'preventDefault를 호출하지 않으면 브라우저가 "이 요소는 드롭 대상이 아니다"로 처리해서 drop 이벤트가 아예 발생하지 않아요.',
          '"기본 동작을 막아야 drop이 허용된다"는 점을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `요소를 끌기 시작하는 순간 발생하는 이벤트 이름을 쓰세요.`,
          prefix: 'item.addEventListener("', suffix: '", event => { /* ... */ });', accept: ['dragstart'], placeholder: '이벤트 이름',
          why: '<code>dragstart</code>는 드래그가 시작되는 순간 발생하는 이벤트예요.',
          hint: '"드래그(drag)"와 "시작(start)"을 합친 이름이에요.'
        }),
        () => makeChoice(
          '드래그 앤 드롭의 이벤트 흐름 순서로 알맞은 것은?',
          'dragstart → dragover → drop', ['drop → dragover → dragstart', 'dragover → drop → dragstart', 'dragstart → drop → dragover'],
          '끌기 시작(dragstart) → 드롭 영역 위를 지나감(dragover) → 실제로 놓임(drop) 순서예요.',
          '"시작 → 지나가는 중 → 놓임" 순서를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '#box 요소에 dragover 이벤트에서 preventDefault를 호출하고, drop 이벤트에서도 preventDefault를 호출한 뒤 #item을 box 안으로 appendChild하는 코드를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: 'box.addEventListener("dragover", event => {\n  event.preventDefault();\n});\n\nbox.addEventListener("drop", event => {\n  event.preventDefault();\n  box.appendChild(item);\n});',
          accept: ['box.addEventListener("dragover", event => {\n  event.preventDefault();\n});\n\nbox.addEventListener("drop", event => {\n  event.preventDefault();\n  box.appendChild(item);\n});'],
          why: 'dragover에서 preventDefault로 드롭을 허용하고, drop에서 실제로 요소를 옮겨요.',
          hint: 'box.addEventListener("dragover", ...)와 box.addEventListener("drop", ...) 두 개를 순서대로 쓰세요.'
        }),
      ],
      boss: () => {
        const events = shuffle(['dragstart', 'dragover', 'drop']);
        const order = ['dragstart', 'dragover', 'drop'];
        const q1 = pick(events);
        const position = order.indexOf(q1) + 1;
        return {
          type: 'blank',
          q: `드래그 앤 드롭의 전체 흐름(dragstart → dragover → drop) 중에서, "${q1}"는 몇 번째 단계에 해당할까요? (숫자만)`,
          prefix: '', suffix: '', accept: [String(position)], placeholder: '숫자',
          why: `순서는 1.dragstart 2.dragover 3.drop이므로, "${q1}"는 ${position}번째예요.`,
          hint: '시작 → 지나가는 중 → 놓임 순서로 번호를 매겨보세요.'
        };
      }
    },
    {
      id: 'clipboardApi',
      title: '클립보드 API로 복사하기 버튼 만들기',
      ready: true,
      summary: '사용자가 직접 텍스트를 드래그해서 복사하지 않아도, 버튼 클릭 한 번으로 클립보드에 복사해주는 Clipboard API를 배워요.',
      goals: ['navigator.clipboard.writeText로 복사하기', 'Promise 기반 API임을 이해하기', '복사 성공 피드백 보여주기'],
      blocks: [
        {
          h: '버튼 하나로 복사하기',
          html: `<p>쿠폰 코드나 초대 링크를 사용자가 직접 드래그해서 복사하게 하는 대신, <code>navigator.clipboard.writeText(문자열)</code>로 버튼 클릭 한 번에 클립보드로 복사할 수 있어요.</p>`,
          code: {
            label: 'copy_button.html',
            lang: 'html',
            src: `<input id="code" value="WELCOME2024" readonly>
<button id="copyBtn">복사하기</button>

<script>
document.querySelector("#copyBtn").addEventListener("click", () => {
  const code = document.querySelector("#code").value;
  navigator.clipboard.writeText(code);
});
</script>`,
            preview: `<style>body{font-family:sans-serif;margin:14px}#msg{color:seagreen;font-size:13px;margin-left:8px}</style><input id="code" value="WELCOME2024" readonly><button id="copyBtn">복사하기</button><span id="msg"></span><script>document.querySelector("#copyBtn").addEventListener("click",()=>{const code=document.querySelector("#code").value;navigator.clipboard.writeText(code);document.querySelector("#msg").textContent="복사됨!";});</script>`
          }
        },
        {
          h: 'writeText는 프로미스를 돌려줘요',
          html: `<p><code>navigator.clipboard.writeText()</code>는 복사가 실제로 완료됐을 때 resolve되는 <b>프로미스</b>를 반환해요. <code>.then()</code>으로 "복사되었습니다" 같은 성공 메시지를 그 다음에 보여줄 수 있어요.</p>`,
          code: {
            label: 'copy_feedback.js',
            lang: 'javascript',
            src: `navigator.clipboard.writeText(code).then(() => {
  document.querySelector("#msg").textContent = "복사되었습니다!";
});`
          },
          after: `<div class="note"><b>정리</b> — Clipboard API는 프로미스 기반이라, then으로 복사 완료 후의 피드백(메시지 표시 등)을 자연스럽게 이어붙일 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `"코드123"이라는 문자열을 클립보드에 복사하는 코드의 빈칸을 채우세요.`,
          prefix: 'navigator.clipboard.', suffix: '("코드123");', accept: ['writeText'], placeholder: '메서드 이름',
          why: '<code>navigator.clipboard.writeText(문자열)</code>로 클립보드에 텍스트를 복사해요.',
          hint: '"텍스트를 쓴다(write)"는 뜻의 메서드예요.'
        }),
        () => makeChoice(
          'navigator.clipboard.writeText()가 반환하는 값의 종류는?',
          '복사가 완료되면 resolve되는 프로미스(Promise)', ['복사된 텍스트를 담은 일반 문자열', '복사 성공 여부를 담은 불리언 값', '아무 것도 반환하지 않는다(undefined)'],
          'writeText는 프로미스를 반환해서, then으로 복사 완료 후 동작을 이어붙일 수 있어요.',
          '비동기 API는 보통 무엇을 반환하는지 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `복사가 완료된 뒤 "복사되었습니다!"라는 메시지를 표시하려고 해요. 빈칸에 들어갈 프로미스 메서드 이름을 쓰세요.`,
          prefix: 'navigator.clipboard.writeText(code).', suffix: '(() => { msg.textContent = "복사되었습니다!"; });', accept: ['then'], placeholder: '메서드 이름',
          why: '<code>.then(콜백)</code>은 프로미스가 성공(resolve)했을 때 실행할 동작을 이어붙여요.',
          hint: '프로미스가 성공했을 때 실행되는, 자바스크립트의 대표적인 프로미스 메서드예요.'
        }),
        () => makeChoice(
          'Clipboard API로 복사하기 버튼을 만드는 대표적인 이유는?',
          '사용자가 직접 텍스트를 드래그해서 선택하지 않아도, 버튼 클릭 한 번으로 원하는 값을 복사하게 하려고', ['페이지 로딩 속도를 높이려고', '사용자의 클립보드 내용을 서버로 자동 전송하려고', 'HTML 태그를 자동으로 검증하려고'],
          '쿠폰 코드, 링크 등을 사용자가 쉽게 복사하도록 돕는 것이 Clipboard API의 대표적인 용도예요.',
          '"사용자 편의(드래그 없이 복사)"라는 목적을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '#copyBtn 클릭 시, #code input의 value를 navigator.clipboard.writeText로 복사하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'document.querySelector("#copyBtn").addEventListener("click", () => {\n  const code = document.querySelector("#code").value;\n  navigator.clipboard.writeText(code);\n});',
          accept: ['document.querySelector("#copyBtn").addEventListener("click", () => {\n  const code = document.querySelector("#code").value;\n  navigator.clipboard.writeText(code);\n});'],
          why: '클릭 이벤트 안에서 input의 value를 읽어 writeText로 클립보드에 복사해요.',
          hint: '#copyBtn에 click 리스너를 걸고, 안에서 #code의 value를 writeText에 넘기세요.'
        }),
      ],
      boss: () => {
        const value = pick(['SUMMER25', 'HELLO2024', 'INVITE99']);
        return {
          type: 'blank',
          q: `<code>&lt;input id="code" value="${value}"&gt;</code>가 있을 때, 이 값을 클립보드에 복사하는 코드의 빈칸을 채우세요. <code>navigator.clipboard.___(document.querySelector("#code").value);</code>`,
          prefix: 'navigator.clipboard.', suffix: '(document.querySelector("#code").value);', accept: ['writeText'], placeholder: '메서드 이름',
          why: '문자열을 클립보드에 복사하는 메서드는 writeText예요.',
          hint: '"텍스트를 쓴다"는 뜻의 메서드 이름이에요.'
        };
      }
    },
    {
      id: 'geolocationApi',
      title: 'Geolocation API로 현재 위치 가져오기',
      ready: true,
      summary: '사용자의 허락을 받아 현재 위치(위도·경도)를 가져오는 Geolocation API의 사용법과 권한 개념을 배워요.',
      goals: ['getCurrentPosition으로 위치 요청하기', '성공/실패 콜백 두 개를 이해하기', '위치 정보는 사용자 허락이 필요하다는 것 이해하기'],
      blocks: [
        {
          h: '위치를 요청하면 브라우저가 먼저 사용자에게 물어봐요',
          html: `<p><code>navigator.geolocation.getCurrentPosition()</code>을 호출하면, 브라우저는 곧바로 위치를 주는 게 아니라 <b>먼저 사용자에게 "위치 정보 제공을 허용하시겠습니까?"라고 물어봐요</b>. 허락해야만 실제 좌표를 받을 수 있어요.</p>`,
          code: {
            label: 'ask_permission.js',
            lang: 'javascript',
            src: `navigator.geolocation.getCurrentPosition(
  position => {
    console.log(position.coords.latitude, position.coords.longitude);
  },
  error => {
    console.log("위치를 가져올 수 없어요:", error.message);
  }
);`
          }
        },
        {
          h: '성공 콜백과 실패 콜백',
          html: `<p><code>getCurrentPosition</code>은 인자를 두 개(또는 세 개) 받아요. 첫 번째는 <b>성공했을 때</b> 실행할 콜백(위치 정보를 받음), 두 번째는 <b>거부되거나 실패했을 때</b> 실행할 콜백이에요. 사용자가 권한 요청을 거부하면 두 번째 콜백이 호출돼요.</p>`,
          code: {
            label: 'show_map_link.js',
            lang: 'javascript',
            src: `function showLocation(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  document.querySelector("#result").textContent =
    "위도: " + lat + ", 경도: " + lng;
}

navigator.geolocation.getCurrentPosition(showLocation);`
          },
          after: `<div class="note"><b>정리</b> — 위치 정보는 민감한 개인정보라서, 반드시 사용자의 명시적 허락이 필요해요. 실패 콜백을 꼭 함께 준비해서, 거부되었을 때도 자연스럽게 대응하는 것이 좋아요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `현재 위치를 요청하는 Geolocation API의 메서드 이름을 쓰세요.`,
          prefix: 'navigator.geolocation.', suffix: '(pos => console.log(pos));', accept: ['getCurrentPosition'], placeholder: '메서드 이름',
          why: '<code>navigator.geolocation.getCurrentPosition(성공콜백, 실패콜백)</code>으로 현재 위치를 요청해요.',
          hint: '"현재 위치를 얻는다"는 뜻의 이름 그대로예요.'
        }),
        () => makeChoice(
          'getCurrentPosition을 호출했을 때 가장 먼저 일어나는 일은?',
          '브라우저가 사용자에게 위치 정보 제공을 허용할지 묻는 팝업을 띄운다', ['곧바로 정확한 좌표가 콘솔에 출력된다', '아무 동작 없이 함수가 조용히 무시된다', '자동으로 지도 이미지가 다운로드된다'],
          '위치 정보는 민감한 정보라서, 브라우저는 먼저 사용자의 허락을 구하는 팝업을 띄워요.',
          '"사용자 허락이 필요하다"는 이 단원의 핵심을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `성공 콜백이 받는 position 객체에서, 위도 값을 담고 있는 프로퍼티 경로를 쓰세요. (position.coords.___)`,
          prefix: 'position.coords.', suffix: '', accept: ['latitude'], placeholder: '프로퍼티 이름',
          why: '<code>position.coords.latitude</code>가 위도, <code>position.coords.longitude</code>가 경도예요.',
          hint: '"위도"를 뜻하는 영어 단어예요.'
        }),
        () => makeChoice(
          '사용자가 위치 정보 제공 요청을 거부했을 때 일어나는 일은?',
          'getCurrentPosition의 두 번째 인자로 넘긴 실패 콜백이 호출된다', ['첫 번째 콜백(성공 콜백)이 빈 좌표와 함께 호출된다', '페이지가 자동으로 새로고침된다', '브라우저가 강제로 위치 정보를 알아낸다'],
          '거부되면 성공 콜백이 아니라 두 번째로 넘긴 실패(에러) 콜백이 호출돼요.',
          '"성공 콜백"과 "실패 콜백"은 서로 다른 상황에서 각각 호출돼요.'
        ),
        () => ({
          type: 'code',
          q: 'getCurrentPosition을 호출해서, 성공하면 위도/경도를 콘솔에 출력하고 실패하면 error.message를 콘솔에 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: 'navigator.geolocation.getCurrentPosition(\n  position => {\n    console.log(position.coords.latitude, position.coords.longitude);\n  },\n  error => {\n    console.log(error.message);\n  }\n);',
          accept: ['navigator.geolocation.getCurrentPosition(\n  position => {\n    console.log(position.coords.latitude, position.coords.longitude);\n  },\n  error => {\n    console.log(error.message);\n  }\n);'],
          why: '첫 번째 콜백에서 좌표를, 두 번째 콜백에서 에러 메시지를 처리해요.',
          hint: 'getCurrentPosition의 첫 번째 인자로 성공 콜백, 두 번째 인자로 실패 콜백을 넘기세요.'
        }),
      ],
      boss: () => {
        const allowed = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `사용자가 위치 정보 제공 요청을 ${allowed ? '허락' : '거부'}했어요. getCurrentPosition의 첫 번째(성공) 콜백과 두 번째(실패) 콜백 중 어느 것이 호출될까요? ("첫 번째" 또는 "두 번째")`,
          prefix: '', suffix: '', accept: [allowed ? '첫 번째' : '두 번째'], placeholder: '첫 번째/두 번째',
          why: allowed ? '허락했으므로 위치 정보를 받는 첫 번째(성공) 콜백이 호출돼요.' : '거부했으므로 두 번째(실패) 콜백이 호출돼요.',
          hint: '허락하면 성공 콜백, 거부하면 실패 콜백이에요.'
        };
      }
    },
    {
      id: 'prefersReducedMotion',
      title: 'prefers-reduced-motion으로 움직임 배려하기',
      ready: true,
      summary: '화려한 애니메이션이 어지럼증이나 불편함을 주는 사용자를 위해, 시스템 설정을 감지해 움직임을 줄여주는 미디어 기능을 배워요.',
      goals: ['prefers-reduced-motion 미디어 기능 이해하기', '@media로 애니메이션 줄이기', '접근성 관점에서 움직임을 배려하는 이유'],
      blocks: [
        {
          h: '누군가에게는 애니메이션이 불편해요',
          html: `<p>화면이 계속 움직이고 확대·축소되는 애니메이션은 어떤 사용자에게는 그저 예쁘지만, <b>전정 기관 장애</b>가 있거나 움직임에 민감한 사용자에게는 어지럼증이나 메스꺼움을 유발할 수 있어요. 운영체제 설정에는 "동작 줄이기(reduce motion)" 옵션이 있어서, 웹사이트도 이 설정을 존중해줄 수 있어요.</p>`,
          code: {
            label: 'animation_default.css',
            lang: 'css',
            src: `.card {
  transition: transform 0.3s;
}
.card:hover {
  transform: scale(1.1) rotate(3deg);
}`
          }
        },
        {
          h: '시스템 설정을 감지해서 움직임 줄이기',
          html: `<p><code>@media (prefers-reduced-motion: reduce)</code>는 사용자가 운영체제에서 "동작 줄이기"를 켜뒀을 때만 적용돼요. 이 안에서 애니메이션 시간을 짧게 하거나 아예 없애줄 수 있어요.</p>`,
          code: {
            label: 'reduced_motion.css',
            lang: 'css',
            src: `@media (prefers-reduced-motion: reduce) {
  .card {
    transition: none;
  }
  .card:hover {
    transform: none;
  }
}`
          },
          after: `<div class="note"><b>정리</b> — 애니메이션을 화려하게 만드는 것도 좋지만, prefers-reduced-motion으로 "그걸 원하지 않는 사용자"를 배려하는 것도 접근성의 중요한 부분이에요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `사용자가 운영체제에서 "동작 줄이기"를 켜둔 상태를 감지하는 미디어 기능 이름을 쓰세요.`,
          prefix: '@media (', suffix: ': reduce) { .card { transition: none; } }', accept: ['prefers-reduced-motion'], placeholder: '미디어 기능 이름',
          why: '<code>prefers-reduced-motion: reduce</code>는 사용자가 시스템에서 움직임을 줄이도록 설정했을 때 적용돼요.',
          hint: '"동작(motion)을 줄이는 것을 선호한다(prefers)"는 뜻의 이름이에요.'
        }),
        () => makeChoice(
          'prefers-reduced-motion을 신경 써야 하는 이유는?',
          '화려한 애니메이션이 전정 기관 장애 등으로 움직임에 민감한 사용자에게 어지럼증을 유발할 수 있기 때문', ['애니메이션을 쓰면 웹사이트 로딩 속도가 항상 느려지기 때문', '오래된 브라우저는 애니메이션을 아예 지원하지 않기 때문', '검색 엔진 최적화(SEO) 점수를 올리기 위해서'],
          '움직임에 민감한 사용자를 배려하는 접근성 차원에서, 시스템 설정을 존중해 애니메이션을 줄여줄 수 있어요.',
          '"어지럼증, 불편함"이라는 키워드를 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `동작 줄이기가 켜진 상태에서, .card의 transition을 완전히 없애려고 해요. 빈칸을 채우세요.`,
          prefix: '@media (prefers-reduced-motion: reduce) { .card { transition: ', suffix: '; } }', accept: ['none'], placeholder: '값',
          why: '<code>transition: none;</code>으로 전환 효과 자체를 없앨 수 있어요.',
          hint: '"없음"이라는 뜻의 값이에요.'
        }),
        () => makeChoice(
          'prefers-reduced-motion: reduce 조건이 참이 되는 경우는?',
          '사용자가 운영체제(윈도우, macOS 등)의 접근성 설정에서 "동작 줄이기"를 켜둔 경우', ['화면 너비가 600px 이하인 경우', '다크 모드가 켜져 있는 경우', '사용자가 마우스를 쓰지 않고 키보드만 쓰는 경우'],
          'prefers-reduced-motion은 화면 크기나 입력 장치가 아니라, 운영체제의 "동작 줄이기" 접근성 설정을 감지해요.',
          '화면 크기(@media width)와 헷갈리지 않도록 주의하세요.'
        ),
        () => ({
          type: 'code',
          q: 'prefers-reduced-motion: reduce일 때, .banner의 animation을 none으로 만드는 미디어 쿼리를 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: '@media (prefers-reduced-motion: reduce) {\n  .banner {\n    animation: none;\n  }\n}',
          accept: ['@media (prefers-reduced-motion: reduce) {.banner {animation: none;}}'],
          why: '@media (prefers-reduced-motion: reduce) 블록 안에서 애니메이션을 없애줘요.',
          hint: '@media (prefers-reduced-motion: reduce) { .banner { animation: none; } } 형태로 쓰세요.'
        }),
      ],
      boss: () => {
        const setting = pick(['켜둔', '켜두지 않은']);
        const applies = setting === '켜둔';
        return {
          type: 'blank',
          q: `사용자가 운영체제에서 "동작 줄이기"를 ${setting} 상태예요. <code>@media (prefers-reduced-motion: reduce) { ... }</code> 안의 스타일이 적용될까요? ("적용" 또는 "미적용")`,
          prefix: '', suffix: '', accept: [applies ? '적용' : '미적용'], placeholder: '적용/미적용',
          why: applies ? '"동작 줄이기"를 켜뒀으므로 prefers-reduced-motion: reduce 조건이 참이 되어 적용돼요.' : '"동작 줄이기"를 켜두지 않았으므로 이 미디어 쿼리는 적용되지 않아요.',
          hint: '설정을 "켜둔" 경우에만 reduce 조건이 참이 돼요.'
        };
      }
    },
    {
      id: 'printStylesheets',
      title: '인쇄용 스타일시트(@media print)',
      ready: true,
      summary: '화면에서는 예쁘지만 종이로 인쇄하면 낭비되는 요소들을, @media print로 인쇄할 때만 다르게 꾸미는 법을 배워요.',
      goals: ['@media print로 인쇄 전용 스타일 만들기', '인쇄에 불필요한 요소 숨기기', 'href 주소를 인쇄물에 텍스트로 보여주기'],
      blocks: [
        {
          h: '화면용 스타일 그대로 인쇄하면 낭비예요',
          html: `<p>네비게이션 메뉴, 광고 배너, "공유하기" 버튼 같은 요소는 화면에서는 필요하지만, 종이로 인쇄할 때는 잉크와 종이만 낭비할 뿐이에요. <code>@media print</code>는 <b>인쇄할 때만</b> 적용되는 스타일 블록이에요.</p>`,
          code: {
            label: 'print_hide.css',
            lang: 'css',
            src: `@media print {
  nav, .ad-banner, .share-buttons {
    display: none;
  }
}`
          }
        },
        {
          h: '인쇄물에서는 링크 주소를 텍스트로 보여주기',
          html: `<p>인쇄된 종이에서는 링크를 클릭할 수 없으니, <code>&lt;a&gt;</code> 태그의 <code>href</code> 값을 <code>content: attr(href)</code>로 괄호 안에 함께 인쇄해주면 독자가 나중에 그 주소를 직접 입력해볼 수 있어요.</p>`,
          code: {
            label: 'print_links.css',
            lang: 'css',
            src: `@media print {
  a::after {
    content: " (" attr(href) ")";
    font-size: 12px;
    color: #555;
  }
}`
          },
          after: `<div class="note"><b>정리</b> — @media print는 화면에는 전혀 영향을 주지 않고, "인쇄 미리보기"나 실제 인쇄를 할 때만 적용돼요. 불필요한 요소 숨기기와 링크 주소 노출이 대표적인 활용이에요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `인쇄할 때만 적용되는 스타일 블록을 만들려면 <code>@media</code> 뒤에 어떤 값을 써야 할까요?`,
          prefix: '@media ', suffix: ' { nav { display: none; } }', accept: ['print'], placeholder: '값',
          why: '<code>@media print</code>는 화면이 아니라 인쇄할 때만 적용되는 스타일을 정의해요.',
          hint: '"인쇄하다"라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '@media print 블록 안의 스타일이 적용되는 시점은?',
          '사용자가 그 페이지를 인쇄하거나 인쇄 미리보기를 열 때만', ['화면 너비가 600px 이하일 때', '페이지를 처음 로드하는 순간부터 항상', '다크 모드가 켜져 있을 때'],
          '@media print는 인쇄(또는 인쇄 미리보기) 시에만 적용되고, 평소 화면에서는 전혀 영향을 주지 않아요.',
          '"화면"이 아니라 "인쇄"라는 조건에 반응한다는 점을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `인쇄물에서 링크의 href 값을 괄호 안에 텍스트로 보여주려면, <code>a::after</code>의 content에 어떤 함수를 써야 할까요?`,
          prefix: 'a::after { content: " (" ', suffix: '(href) ")"; }', accept: ['attr'], placeholder: '함수 이름',
          why: '<code>attr(href)</code>는 그 요소의 href 속성값을 문자열로 가져와요.',
          hint: '"속성(attribute)"의 값을 가져오는 CSS 함수예요.'
        }),
        () => makeChoice(
          '@media print를 쓰는 대표적인 이유로 알맞은 것은?',
          '네비게이션 메뉴, 광고 배너처럼 인쇄에는 불필요한 요소를 숨기고 종이·잉크 낭비를 줄이기 위해', ['인쇄할 때 웹페이지 로딩 속도를 빠르게 하려고', '모바일 화면에서 레이아웃을 바꾸려고', '다크 모드와 라이트 모드를 전환하려고'],
          '인쇄 시 불필요한 요소를 숨기고, 링크 주소를 노출하는 등 종이 매체에 맞춰 스타일을 조정하는 것이 목적이에요.',
          '"종이로 인쇄할 때"라는 상황에 맞는 이유를 골라보세요.'
        ),
        () => ({
          type: 'code',
          q: '인쇄할 때 nav와 class="ad-banner"인 요소를 display: none으로 숨기는 @media print 규칙을 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: '@media print {\n  nav, .ad-banner {\n    display: none;\n  }\n}',
          accept: ['@media print {nav, .ad-banner {display: none;}}'],
          why: '@media print 블록 안에서 nav와 .ad-banner를 display: none으로 숨겨요.',
          hint: '@media print { nav, .ad-banner { display: none; } } 형태로 쓰세요.'
        }),
      ],
      boss: () => {
        const context = pick(['웹페이지를 화면으로 볼 때', '웹페이지를 인쇄(또는 인쇄 미리보기)할 때']);
        const applies = context.includes('인쇄');
        return {
          type: 'blank',
          q: `<code>@media print { .ad-banner { display: none; } }</code>가 있을 때, "${context}" .ad-banner가 숨겨질까요? ("숨겨짐" 또는 "안 숨겨짐")`,
          prefix: '', suffix: '', accept: [applies ? '숨겨짐' : '안 숨겨짐'], placeholder: '숨겨짐/안 숨겨짐',
          why: applies ? '인쇄할 때만 @media print 규칙이 적용되어 숨겨져요.' : '화면으로 볼 때는 @media print가 적용되지 않아서 숨겨지지 않아요.',
          hint: '@media print는 오직 "인쇄할 때"만 적용돼요.'
        };
      }
    },
    {
      id: 'responsiveImages',
      title: '반응형 이미지: srcset과 picture',
      ready: true,
      summary: '화면 크기와 해상도에 따라 브라우저가 알아서 적절한 크기의 이미지 파일을 골라 받게 하는 srcset과 picture를 배워요.',
      goals: ['srcset과 sizes로 여러 크기 이미지 후보 제공하기', 'picture와 source로 상황별 다른 이미지 보여주기', '불필요하게 큰 이미지 낭비 줄이기'],
      blocks: [
        {
          h: '모바일에서도 큰 이미지를 그대로 받는 낭비',
          html: `<p>보통의 <code>&lt;img src="..."&gt;</code>는 화면이 작은 스마트폰에서도 데스크톱용으로 찍은 큰 원본 이미지를 그대로 내려받아요. 화면에는 작게 보이는데 데이터는 큰 파일 그대로 쓰는 셈이라 낭비예요.</p>`,
          code: {
            label: 'single_src.html',
            lang: 'html',
            src: `<img src="photo-1600.jpg" alt="풍경 사진">`
          }
        },
        {
          h: 'srcset으로 여러 크기 후보 제공하기',
          html: `<p><code>srcset</code>에 "이 파일은 몇 px 너비용이다"라는 후보들을 나열하고, <code>sizes</code>로 "이 이미지가 화면에서 차지할 예상 너비"를 알려주면, 브라우저가 <b>화면 크기와 해상도에 맞는 최적의 파일을 알아서 골라</b> 받아요.</p>`,
          code: {
            label: 'srcset.html',
            lang: 'html',
            src: `<img
  src="photo-800.jpg"
  srcset="photo-400.jpg 400w, photo-800.jpg 800w, photo-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="풍경 사진"
>`
          }
        },
        {
          h: 'picture로 상황별 완전히 다른 이미지 보여주기',
          html: `<p>크기 후보가 아니라, 화면 너비에 따라 <b>완전히 다른 구도의 이미지</b>(예: 모바일에서는 세로로 자른 사진)를 보여주고 싶다면 <code>&lt;picture&gt;</code>와 <code>&lt;source&gt;</code>를 써요. 브라우저는 위에서부터 조건을 확인해 맞는 첫 source를 쓰고, 아무것도 안 맞으면 마지막의 <code>&lt;img&gt;</code>를 기본값으로 써요.</p>`,
          code: {
            label: 'picture.html',
            lang: 'html',
            src: `<picture>
  <source media="(max-width: 600px)" srcset="photo-mobile.jpg">
  <source media="(min-width: 601px)" srcset="photo-desktop.jpg">
  <img src="photo-desktop.jpg" alt="풍경 사진">
</picture>`
          },
          after: `<div class="note"><b>정리</b> — 같은 이미지의 크기만 다르게 고르고 싶으면 srcset+sizes, 화면에 따라 아예 다른 구도의 이미지를 보여주고 싶으면 picture+source를 써요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `img 태그에서, 여러 크기의 이미지 파일 후보를 나열해 브라우저가 골라 받게 하는 속성 이름을 쓰세요.`,
          prefix: '<img src="photo-800.jpg" ', suffix: '="photo-400.jpg 400w, photo-800.jpg 800w">', accept: ['srcset'], placeholder: '속성 이름',
          why: '<code>srcset</code>은 "이 파일은 몇 px 너비용이다"라는 후보들을 나열하는 속성이에요.',
          hint: '"소스(src) 집합(set)"이라는 뜻의 이름이에요.'
        }),
        () => makeChoice(
          'srcset과 sizes를 함께 쓰는 이유는?',
          '브라우저가 화면 크기·해상도에 맞는 최적의 이미지 파일을 스스로 골라 받아서, 불필요하게 큰 파일을 낭비하지 않게 하려고', ['이미지에 애니메이션 효과를 자동으로 추가하려고', 'alt 속성 없이도 접근성을 보장하려고', '이미지 파일을 서버에 자동으로 업로드하려고'],
          '작은 화면에는 작은 파일을, 큰 화면·고해상도에는 큰 파일을 자동으로 골라 받아서 데이터 낭비를 줄여요.',
          '"불필요하게 큰 파일을 받는 낭비를 줄인다"는 목적을 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `화면 너비에 따라 완전히 다른 구도의 이미지를 보여주고 싶을 때, img를 감싸는 태그 이름을 쓰세요.`,
          prefix: '<', suffix: '><source media="(max-width: 600px)" srcset="mobile.jpg"><img src="desktop.jpg"></picture>', accept: ['picture'], placeholder: '태그 이름',
          why: '<code>&lt;picture&gt;</code>는 여러 <code>&lt;source&gt;</code> 조건 중 맞는 것을 골라 보여주고, 안 맞으면 안의 img를 기본값으로 써요.',
          hint: '사진, 그림이라는 뜻의 영어 단어예요.'
        }),
        () => makeChoice(
          '<code>&lt;picture&gt;</code> 안에서 어떤 <code>&lt;source&gt;</code> 조건도 맞지 않을 때 어떤 일이 벌어질까요?',
          '가장 마지막에 있는 &lt;img&gt; 태그가 기본값으로 사용된다', ['아무 이미지도 보이지 않고 빈 공간이 된다', '브라우저가 페이지 로딩을 중단한다', '첫 번째 source가 강제로 사용된다'],
          'picture 안의 img는 "어떤 source 조건도 안 맞을 때의 기본값"이자, source를 지원하지 않는 구형 브라우저를 위한 대체 수단이에요.',
          'picture 안의 img는 "안전망(fallback)" 역할을 해요.'
        ),
        () => ({
          type: 'code',
          q: 'srcset에 photo-400.jpg를 400w로, photo-1200.jpg를 1200w로 제공하고, sizes는 100vw로, src는 photo-1200.jpg를 기본값으로 갖는 img 태그를 작성하세요.',
          starter: '',
          placeholder: '<img src="photo-1200.jpg" srcset="photo-400.jpg 400w, photo-1200.jpg 1200w" sizes="100vw" alt="사진">',
          accept: ['<img src="photo-1200.jpg" srcset="photo-400.jpg 400w, photo-1200.jpg 1200w" sizes="100vw" alt="사진">'],
          why: 'srcset에 크기별 후보를 나열하고 sizes로 예상 표시 너비를 알려주면, 브라우저가 알맞은 파일을 골라요.',
          hint: 'src, srcset, sizes 속성을 순서대로 채워 넣으세요.'
        }),
      ],
      boss: () => {
        const width = pick(['500px(모바일)', '900px(데스크톱)']);
        const isMobile = width.includes('모바일');
        const answer = isMobile ? 'mobile.jpg' : 'desktop.jpg';
        return {
          type: 'blank',
          q: `<code>&lt;picture&gt;&lt;source media="(max-width: 600px)" srcset="mobile.jpg"&gt;&lt;source media="(min-width: 601px)" srcset="desktop.jpg"&gt;&lt;img src="desktop.jpg"&gt;&lt;/picture&gt;</code>가 있어요. 화면 너비가 ${width}일 때 실제로 보이는 이미지 파일은?`,
          prefix: '', suffix: '', accept: [answer], placeholder: '파일명',
          why: `화면 너비 ${width}에서는 ${isMobile ? 'max-width: 600px 조건' : 'min-width: 601px 조건'}에 맞는 "${answer}"가 선택돼요.`,
          hint: '각 source의 media 조건을 위에서부터 확인해보세요.'
        };
      }
    },
    {
      id: 'viewTransitionsApi',
      title: 'View Transitions API로 화면 전환 애니메이션',
      ready: true,
      summary: 'DOM 변경 전후 상태를 브라우저가 자동으로 캡처해 부드러운 전환 애니메이션을 만들어주는 View Transitions API를 배워요.',
      goals: ['startViewTransition으로 전환 감싸기', '전환 전/후 상태를 브라우저가 자동 캡처한다는 원리', '어떤 상황에 유용한지 판단하기'],
      blocks: [
        {
          h: 'DOM이 바뀌면 그냥 "뚝" 바뀌어요',
          html: `<p>보통 <code>textContent</code>나 <code>classList</code>를 바꾸면, 화면은 이전 모습에서 새 모습으로 <b>순간적으로 뚝 바뀌어요</b>. 부드러운 전환을 만들려면 지금까지는 CSS transition/animation을 세세하게 직접 설계해야 했어요.</p>`,
          code: {
            label: 'instant_change.js',
            lang: 'javascript',
            src: `document.querySelector("#likeBtn").addEventListener("click", () => {
  document.querySelector("#likeBtn").classList.toggle("liked");
});`
          }
        },
        {
          h: 'startViewTransition으로 감싸면 자동으로 부드럽게',
          html: `<p><code>document.startViewTransition(콜백)</code>으로 DOM을 바꾸는 코드를 감싸면, 브라우저가 <b>바뀌기 전 화면과 바뀐 후 화면을 스냅샷으로 각각 캡처</b>해서, 그 사이를 자동으로 부드럽게 전환(크로스페이드 등)해줘요. 별도의 세밀한 애니메이션 코드를 직접 짤 필요가 없어요.</p>`,
          code: {
            label: 'view_transition.js',
            lang: 'javascript',
            src: `document.querySelector("#likeBtn").addEventListener("click", () => {
  if (document.startViewTransition) {
    document.startViewTransition(() => {
      document.querySelector("#likeBtn").classList.toggle("liked");
    });
  } else {
    document.querySelector("#likeBtn").classList.toggle("liked");
  }
});`
          },
          after: `<div class="note"><b>정리</b> — 이 API를 지원하지 않는 브라우저를 위해, document.startViewTransition이 있는지 먼저 확인하고 없으면 그냥 바로 DOM을 바꾸는 대체 경로를 준비해두는 것이 안전해요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `DOM을 바꾸는 콜백을 감싸서, 브라우저가 전후 화면을 캡처해 자동으로 부드럽게 전환해주는 메서드를 쓰세요.`,
          prefix: 'document.', suffix: '(() => { document.querySelector("#likeBtn").classList.toggle("liked"); });', accept: ['startViewTransition'], placeholder: '메서드 이름',
          why: '<code>document.startViewTransition(콜백)</code>이 이 API의 핵심 메서드예요.',
          hint: '"화면 전환(view transition)을 시작한다"는 뜻의 이름이에요.'
        }),
        () => makeChoice(
          'View Transitions API가 자동으로 해주는 일은?',
          '콜백 실행 전후의 화면을 각각 스냅샷으로 캡처해서, 그 사이를 부드럽게 전환하는 애니메이션을 만들어준다', ['서버에 새로운 데이터를 자동으로 요청해준다', 'HTML 태그의 오타를 자동으로 고쳐준다', '이미지 파일의 용량을 압축해준다'],
          '전후 상태를 캡처해서 크로스페이드 같은 전환 효과를 자동으로 만들어주는 것이 핵심 기능이에요.',
          '"전후 스냅샷을 캡처한다"는 원리를 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `이 API를 지원하지 않는 구형 브라우저를 위해, 사용 전에 어떤 조건을 먼저 확인하는 것이 안전할까요? (그대로 입력)`,
          prefix: 'if (document.', suffix: ') { document.startViewTransition(() => { /* ... */ }); }', accept: ['startViewTransition'], placeholder: '확인할 값',
          why: '<code>document.startViewTransition</code>이 존재하는지 먼저 확인하고, 없으면 애니메이션 없이 바로 DOM을 바꾸는 대체 경로를 쓰는 것이 안전해요.',
          hint: '사용하려는 메서드 자체가 존재하는지를 if 조건으로 확인해요.'
        }),
        () => makeChoice(
          'View Transitions API를 쓰기 좋은 상황은?',
          '좋아요 버튼 상태 변경, 목록 필터링처럼 DOM이 바뀔 때 부드러운 시각적 전환을 자연스럽게 넣고 싶을 때', ['서버와 통신하지 않고 순수 정적 텍스트만 보여줄 때', '이미지 파일을 아예 사용하지 않을 때', '페이지에 자바스크립트를 전혀 쓰지 않을 때'],
          'DOM 변경 전후를 부드럽게 이어주고 싶은 다양한 UI 전환에 적합해요.',
          '"DOM이 바뀌는 순간을 부드럽게"라는 목적을 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: 'document.startViewTransition이 있으면 그 안에서 #likeBtn의 classList.toggle("liked")를 실행하고, 없으면 그냥 바로 toggle을 실행하는 코드를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: 'if (document.startViewTransition) {\n  document.startViewTransition(() => {\n    document.querySelector("#likeBtn").classList.toggle("liked");\n  });\n} else {\n  document.querySelector("#likeBtn").classList.toggle("liked");\n}',
          accept: ['if (document.startViewTransition) {\n  document.startViewTransition(() => {\n    document.querySelector("#likeBtn").classList.toggle("liked");\n  });\n} else {\n  document.querySelector("#likeBtn").classList.toggle("liked");\n}'],
          why: '지원 여부를 먼저 확인하고, 지원하면 startViewTransition으로 감싸고 아니면 바로 실행해요.',
          hint: 'if (document.startViewTransition) { ... } else { ... } 형태로, 안에서 classList.toggle을 호출하세요.'
        }),
      ],
      boss: () => {
        const supported = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `<code>if (document.startViewTransition) { ... } else { ... }</code>에서, 브라우저가 View Transitions API를 ${supported ? '지원하는' : '지원하지 않는'} 경우 어느 블록이 실행될까요? ("if" 또는 "else")`,
          prefix: '', suffix: '', accept: [supported ? 'if' : 'else'], placeholder: 'if/else',
          why: supported ? '지원하므로 document.startViewTransition이 참(truthy)이 되어 if 블록이 실행돼요.' : '지원하지 않으므로 document.startViewTransition이 undefined(거짓)라서 else 블록이 실행돼요.',
          hint: '메서드가 존재하면 if, 존재하지 않으면(undefined) else예요.'
        };
      }
    },
    {
      id: 'isWhereSelectors',
      title: ':is()와 :where()로 선택자 묶기',
      ready: true,
      summary: '비슷한 선택자를 여러 줄 반복해서 쓰는 대신, :is()와 :where()로 묶어서 짧게 쓰고 명시도 차이까지 이해해요.',
      goals: [':is()로 여러 선택자 묶어 반복 줄이기', ':where()는 명시도가 0이라는 차이 이해하기', '두 선택자를 상황에 맞게 골라 쓰기'],
      blocks: [
        {
          h: '반복되는 선택자 목록',
          html: `<p>header, main, footer 안의 <code>h2</code>에 똑같은 스타일을 주고 싶으면, 지금까지는 이렇게 각각 따로 나열해서 써야 했어요.</p>`,
          code: {
            label: 'repeated.css',
            lang: 'css',
            src: `header h2,
main h2,
footer h2 {
  font-weight: bold;
  color: navy;
}`
          }
        },
        {
          h: ':is()로 묶어서 짧게 쓰기',
          html: `<p><code>:is(header, main, footer) h2</code>는 위와 똑같은 뜻이지만 훨씬 짧아요. <code>:is()</code>는 괄호 안 여러 선택자 중 <b>하나라도 만족하면</b> 매칭돼요.</p>`,
          code: {
            label: 'is_selector.css',
            lang: 'css',
            src: `:is(header, main, footer) h2 {
  font-weight: bold;
  color: navy;
}`
          }
        },
        {
          h: ':where()는 명시도가 항상 0',
          html: `<p><code>:where()</code>는 <code>:is()</code>와 매칭 방식은 똑같지만, <b>명시도가 항상 0</b>이라는 차이가 있어요. 그래서 나중에 다른 규칙으로 쉽게 덮어쓰고 싶은 "기본값 스타일"을 정의할 때 <code>:where()</code>가 유용해요.</p>`,
          code: {
            label: 'where_selector.css',
            lang: 'css',
            src: `:where(header, main, footer) h2 {
  font-weight: bold; /* 명시도 0이라 다른 규칙이 쉽게 덮어씀 */
}`
          },
          after: `<div class="note"><b>정리</b> — 매칭 동작은 :is()와 :where()가 같지만, 명시도 계산에는 :is()가 참여하고 :where()는 참여하지 않아요(항상 0). 나중에 쉽게 덮어써야 할 기본 스타일에는 :where()가 안전해요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `header, main, footer 안의 h2를 하나로 묶어서 선택하려고 해요. 빈칸을 채우세요.`,
          prefix: '', suffix: '(header, main, footer) h2 { color: navy; }', accept: [':is', 'is'], placeholder: '가상 클래스',
          why: '<code>:is(header, main, footer) h2</code>는 header h2, main h2, footer h2를 모두 선택하는 것과 같아요.',
          hint: '괄호 안 여러 선택자 "중 하나라도" 만족하면 매칭되는 가상 클래스예요.'
        }),
        () => makeChoice(
          ':is()와 :where()의 가장 큰 차이는?',
          '매칭 방식은 동일하지만, :where()는 명시도가 항상 0이고 :is()는 괄호 안에서 가장 명시도가 높은 선택자를 따른다', [':where()는 오직 클래스 선택자만 넣을 수 있다', ':is()는 자식 요소를 선택할 수 없다', ':where()가 더 최신 브라우저에서만 지원되고 :is()는 지원되지 않는다'],
          ':is()는 괄호 안에서 가장 명시도가 높은 선택자의 명시도를 그대로 갖지만, :where()는 항상 명시도 0으로 계산돼요.',
          '"명시도가 몇으로 계산되는가"가 핵심 차이예요.'
        ),
        () => makeChoice(
          '나중에 다른 규칙으로 쉽게 덮어쓸 수 있는 "기본값 스타일"을 정의하고 싶을 때 더 적합한 선택자는?',
          ':where() — 명시도가 항상 0이라 다른 규칙이 쉽게 이길 수 있다', [':is() — 명시도가 항상 가장 높아서 절대 안 덮어써진다', '둘 다 똑같이 명시도가 없다', '이런 상황에는 !important만 써야 한다'],
          '명시도가 0인 :where()로 기본 스타일을 정의해두면, 나중에 어떤 규칙으로도 쉽게 덮어쓸 수 있어요.',
          '"쉽게 덮어써지길 원한다"는 조건에 맞는 낮은 명시도를 떠올려보세요.'
        ),
        () => ({
          type: 'blank',
          q: `h1, h2, h3 중 하나가 .card 안에 있을 때 색을 회색으로 주되, 나중에 다른 스타일이 쉽게 덮어쓸 수 있게 명시도를 0으로 두고 싶어요. 빈칸을 채우세요.`,
          prefix: '.card ', suffix: '(h1, h2, h3) { color: gray; }', accept: [':where', 'where'], placeholder: '가상 클래스',
          why: '명시도를 0으로 유지하려면 :is() 대신 :where()를 써야 해요.',
          hint: '이번 단원에서 "명시도가 항상 0"이라고 배운 가상 클래스예요.'
        }),
        () => ({
          type: 'code',
          q: 'article, section, aside 안의 p 태그의 line-height를 1.6으로 지정하는 CSS를, :is()를 사용해 한 줄로 묶어서 작성하세요.',
          starter: '',
          rows: 3,
          placeholder: ':is(article, section, aside) p {\n  line-height: 1.6;\n}',
          accept: [':is(article, section, aside) p {line-height: 1.6;}'],
          why: ':is(article, section, aside) p는 article p, section p, aside p를 모두 선택하는 것과 같아요.',
          hint: ':is(article, section, aside) p { line-height: 1.6; } 형태로 쓰세요.'
        }),
      ],
      boss: () => {
        const kind = pick([':is()', ':where()']);
        const specificity = kind === ':is()' ? '괄호 안에서 가장 명시도가 높은 선택자와 같은 명시도' : '항상 0';
        return {
          type: 'blank',
          q: `<code>${kind}</code>를 사용한 선택자의 명시도는 어떻게 계산될까요? ("항상 0" 또는 "괄호 안에서 가장 명시도가 높은 선택자와 같은 명시도" 중 하나로 답하세요)`,
          prefix: '', suffix: '', accept: [specificity], placeholder: '설명',
          why: `${kind}는 ${specificity === '항상 0' ? '명시도가 항상 0으로 계산돼요.' : '괄호 안에서 가장 명시도가 높은 선택자의 명시도를 그대로 가져요.'}`,
          hint: ':where()만 명시도 0이고, :is()는 괄호 안 최고 명시도를 따라요.'
        };
      }
    },
    /*__NEW_UNITS_MARKER__*/
    ],
  tierBoss: {
    beginner: () => ({
      type: 'code',
      preview: true,
      q: '제목 <code>&lt;h1&gt;환영합니다&lt;/h1&gt;</code>과, 항목이 사과·바나나인 목록 <code>&lt;ul&gt;</code>을 만들고, 그 아래 클래스가 "row"인 div 안에 클래스가 "card"인 div 두 개를 나란히 배치하세요. <code>&lt;style&gt;</code> 태그 안에 <code>.row</code>에는 <code>display: flex;</code>와 <code>gap: 10px;</code>를, <code>.card</code>에는 <code>padding: 12px;</code>와 <code>border-radius: 8px;</code>를 지정하는 코드까지 작성하세요.',
      starter: '',
      rows: 16,
      placeholder: '<h1>환영합니다</h1>\n<ul>\n  <li>사과</li>\n  <li>바나나</li>\n</ul>\n<div class="row">\n  <div class="card">딸기</div>\n  <div class="card">포도</div>\n</div>\n\n<style>\n.row {\n  display: flex;\n  gap: 10px;\n}\n.card {\n  padding: 12px;\n  border-radius: 8px;\n}\n</style>',
      accept: ['<h1>환영합니다</h1>\n<ul><li>사과</li><li>바나나</li></ul>\n<div class="row"><div class="card">딸기</div><div class="card">포도</div></div>\n\n<style>.row {display: flex;gap: 10px;}.card {padding: 12px;border-radius: 8px;}</style>'],
      why: '제목·목록은 <code>&lt;h1&gt;</code>, <code>&lt;ul&gt;</code>+<code>&lt;li&gt;</code>로, 가로 배치는 <code>display: flex;</code>와 <code>gap</code>으로, 카드 안쪽 여백과 둥근 모서리는 <code>padding</code>과 <code>border-radius</code>로 만들어요.',
      hint: '<h1>, <ul><li>...</li></ul>, class="row" div 안에 class="card" div 두 개, 그리고 <style> 안에 .row와 .card 스타일을 순서대로 써보세요.'
    }),
    intermediate: () => ({
      type: 'code',
      q: '클릭 가능한 요소는 키보드로도 접근할 수 있게 <code>&lt;div&gt;</code> 대신 <code>&lt;button id="msg"&gt;알림&lt;/button&gt;</code>으로 만드세요. <code>&lt;style&gt;</code> 태그 안에 <code>.msg-box</code>가 <code>padding: 10px;</code>를 갖고, 화면 너비가 600px 이하일 때는 width를 100%로 만드는 미디어 쿼리를 작성하세요. 그리고 <code>#msg</code>를 클릭하면 <code>classList.toggle("active")</code>가 실행되도록 <code>&lt;script&gt;</code> 코드도 작성하세요.',
      starter: '',
      rows: 16,
      placeholder: '<button id="msg" class="msg-box">알림</button>\n\n<style>\n.msg-box {\n  padding: 10px;\n}\n\n@media (max-width: 600px) {\n  .msg-box {\n    width: 100%;\n  }\n}\n</style>\n\n<script>\ndocument.querySelector("#msg").addEventListener("click", () => {\n  document.querySelector("#msg").classList.toggle("active");\n});\n</script>',
      accept: ['<button id="msg" class="msg-box">알림</button>\n\n<style>.msg-box {padding: 10px;}\n\n@media (max-width: 600px) {.msg-box {width: 100%;}}</style>\n\n<script>document.querySelector("#msg").addEventListener("click", () => {document.querySelector("#msg").classList.toggle("active");});</script>'],
      why: '<button>은 키보드 접근이 자동으로 되는 시맨틱 태그이고, @media는 화면이 좁을 때 width를 100%로 덮어쓰며, 스크립트는 클릭 이벤트에서 classList.toggle로 클래스를 켰다 껐다 해요.',
      hint: 'div 대신 button을 쓰고, .msg-box 스타일과 @media 블록을 쓴 다음, querySelector로 찾은 버튼에 클릭 이벤트를 걸어 classList.toggle을 실행하세요.'
    }),
    advanced: () => ({
      type: 'code',
      q: '<code>class="signupGrid"</code>인 폼을 만드세요. 그 안에 "이름" 라벨(<code>for="name"</code>)과 연결된 입력칸(<code>id="name"</code>, <code>required</code>, <code>minlength="2"</code>), "이메일" 라벨(<code>for="email"</code>)과 연결된 입력칸(<code>id="email"</code>, <code>type="email"</code>, <code>required</code>), 그리고 <code>class="submitBtn"</code>인 제출 버튼을 순서대로 넣으세요. <code>&lt;style&gt;</code> 태그 안에 <code>.signupGrid</code>를 <code>display: grid;</code>, <code>grid-template-columns: repeat(2, 1fr);</code>, <code>gap: 10px;</code>로 2열 격자 배치하고, <code>.submitBtn</code>에는 <code>transition: transform 0.3s;</code>을, <code>.submitBtn:hover</code>에는 <code>transform: scale(1.1);</code>을 지정하세요.',
      starter: '',
      rows: 20,
      placeholder: '<form class="signupGrid">\n  <label for="name">이름</label>\n  <input id="name" type="text" required minlength="2">\n\n  <label for="email">이메일</label>\n  <input id="email" type="email" required>\n\n  <button type="submit" class="submitBtn">가입하기</button>\n</form>\n\n<style>\n.signupGrid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 10px;\n}\n.submitBtn {\n  transition: transform 0.3s;\n}\n.submitBtn:hover {\n  transform: scale(1.1);\n}\n</style>',
      accept: ['<form class="signupGrid">\n  <label for="name">이름</label>\n  <input id="name" type="text" required minlength="2">\n\n  <label for="email">이메일</label>\n  <input id="email" type="email" required>\n\n  <button type="submit" class="submitBtn">가입하기</button>\n</form>\n\n<style>.signupGrid {display: grid;grid-template-columns: repeat(2, 1fr);gap: 10px;}.submitBtn {transition: transform 0.3s;}.submitBtn:hover {transform: scale(1.1);}</style>'],
      why: 'label의 for와 input의 id를 맞추고 required/minlength/type="email"로 유효성 검사를, .signupGrid에 display: grid로 2열 격자를, .submitBtn에 transition과 :hover로 부드러운 확대 효과를 만들어요.',
      hint: '각 label의 for와 input의 id를 짝지어 쓰고, .signupGrid 격자 스타일과 .submitBtn의 transition/:hover 스타일을 <style> 안에 순서대로 쓰세요.'
    }),
  }
};
