/* Unity(C# 스크립팅) 강의·문제 데이터 — 단원을 추가하려면 units 배열에 항목을 넣으면 됩니다.
   Unity 에디터 자체는 브라우저에서 실행할 수 없어서, 게임을 만들 때 쓰는 C# 스크립팅
   문법과 Unity API를 강의+문제 형식으로 배우는 코스예요(다른 언어처럼 실제 실행 없이
   답을 텍스트로 비교해서 채점해요). */
COURSES.unity = {
    name: 'Unity(C#)',
    tagline: '게임을 만들 때 쓰는 Unity 엔진의 C# 스크립팅 기초',
    units: [{
      id: 'lifecycle',
      title: 'MonoBehaviour와 생명주기',
      ready: true,
      summary: 'Unity에서 게임 오브젝트에 붙이는 스크립트가 어떤 모양인지, 언제 실행되는지 배워요.',
      goals: ['MonoBehaviour 상속', 'Start()와 Update()', '실행 순서'],
      blocks: [
        {
          h: 'Unity 스크립트의 기본 모양: MonoBehaviour',
          html: `<p>Unity에서 게임 오브젝트(캐릭터, 아이템 등)에 붙이는 스크립트는 <code>MonoBehaviour</code>를 상속받는 클래스로 만들어요. 이렇게 만들면 Unity가 정해진 시점마다 자동으로 특정 메서드들을 호출해줘요.</p>`,
          code: {
            label: 'PlayerScript.cs',
            lang: 'csharp',
            src: `using UnityEngine;

public class PlayerScript : MonoBehaviour
{
    void Start()
    {
        Debug.Log("게임 시작!");
    }

    void Update()
    {
        Debug.Log("매 프레임마다 실행돼요");
    }
}`
          }
        },
        {
          h: '딱 한 번: Start(), 계속 반복: Update()',
          html: `<p><code>Start()</code>는 이 오브젝트가 처음 생성될 때 <b>딱 한 번만</b> 실행돼요(초기 설정에 좋아요). <code>Update()</code>는 게임이 실행되는 동안 <b>매 프레임(화면이 갱신될 때마다, 보통 1초에 수십 번)</b> 계속 실행돼요(움직임, 입력 확인에 좋아요).</p>`
        },
        {
          h: '실행 순서 기억하기',
          html: `<p>게임을 시작하면 <code>Start()</code>가 먼저 딱 한 번 실행되고, 그다음부터 게임이 끝날 때까지 <code>Update()</code>가 계속 반복 실행돼요.</p>`,
          after: `<div class="note"><b>비유</b> — Start()는 "게임을 켜자마자 딱 한 번 하는 준비운동", Update()는 "게임 하는 내내 계속 확인하는 심장 박동"이라고 생각하면 쉬워요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          'Unity에서 게임 오브젝트에 붙이는 스크립트가 상속받아야 하는 클래스는?',
          '<code>MonoBehaviour</code>', ['<code>GameObject</code>', '<code>Transform</code>', '<code>Component</code>'],
          '<code>MonoBehaviour</code>를 상속받아야 Unity가 Start(), Update() 같은 메서드를 자동으로 호출해줘요.',
          '이 클래스를 상속받아야 "행동(behaviour)"을 정의할 수 있어요.'
        ),
        () => makeChoice(
          '오브젝트가 생성될 때 딱 한 번만 실행되는 메서드는?',
          '<code>Start()</code>', ['<code>Update()</code>', '<code>Awake()</code>', '<code>OnEnable()</code>'],
          '<code>Start()</code>는 오브젝트가 처음 활성화될 때 한 번만 실행돼요.',
          '"시작"이라는 뜻의 영어 단어예요.'
        ),
        () => makeChoice(
          '게임이 실행되는 동안 매 프레임마다 계속 실행되는 메서드는?',
          '<code>Update()</code>', ['<code>Start()</code>', '<code>Main()</code>', '<code>Loop()</code>'],
          '<code>Update()</code>는 매 프레임마다 반복 호출돼서 움직임이나 입력 확인에 써요.',
          '"갱신하다"라는 뜻의 영어 단어예요.'
        ),
        () => ({
          type: 'blank',
          q: `콘솔에 메시지를 출력할 때 쓰는, Unity의 <code>console.log</code> 같은 메서드를 쓰세요.`,
          prefix: '', suffix: '.Log("게임 시작!");', accept: ['Debug'], placeholder: '클래스 이름',
          why: '<code>Debug.Log(...)</code>는 Unity 콘솔(Console 창)에 메시지를 출력해요.',
          hint: '"디버그(문제 확인)"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>MonoBehaviour</code>를 상속받는 클래스 <code>EnemyScript</code>를 만드세요. <code>Start()</code> 메서드에서 <code>Debug.Log("적 등장!")</code>을 실행하는 코드를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: 'public class EnemyScript : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log("적 등장!");\n    }\n}',
          accept: ['public class EnemyScript : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log("적 등장!");\n    }\n}'],
          why: '클래스 이름 뒤에 콜론(:)으로 MonoBehaviour를 상속받고, Start() 메서드 안에 Debug.Log를 넣어요.',
          hint: 'public class EnemyScript : MonoBehaviour { } 안에 void Start() { } 메서드를 만들고 Debug.Log를 넣으세요.'
        }),
      ],
      boss: () => {
        const times = randInt(2, 5);
        return {
          type: 'blank',
          q: `게임을 시작해서 <code>Update()</code>가 ${times}번 실행될 때까지, <code>Start()</code>는 총 몇 번 실행됐을까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: ['1'], placeholder: '숫자',
          why: 'Start()는 오브젝트가 생성될 때 딱 한 번만 실행되고, 그 이후로는 Update()만 반복 호출돼요.',
          hint: 'Start()가 몇 번 실행되는 메서드였는지 떠올려보세요.'
        };
      }
    },
    {
      id: 'transform',
      title: 'GameObject와 Transform 다루기',
      ready: true,
      summary: '게임 속 오브젝트의 위치, 회전, 크기를 다루는 Transform을 배워요.',
      goals: ['transform.position', 'Vector3', '위치 이동시키기'],
      blocks: [
        {
          h: '오브젝트의 위치·회전·크기: Transform',
          html: `<p>Unity의 모든 게임 오브젝트는 <code>Transform</code>이라는 정보를 갖고 있어요. 이 안에 위치(<code>position</code>), 회전(<code>rotation</code>), 크기(<code>scale</code>)가 들어있어요. 내 스크립트 안에서는 <code>transform</code>이라고 쓰면 "이 오브젝트의 Transform"을 가리켜요.</p>`,
          code: {
            label: 'MoveScript.cs',
            lang: 'csharp',
            src: `void Start()
{
    Debug.Log(transform.position);
}`
          }
        },
        {
          h: '위치는 x, y, z 세 값: Vector3',
          html: `<p>3차원 위치는 <code>Vector3(x, y, z)</code>로 나타내요. 2D 게임이어도 Unity는 기본적으로 3차원 좌표를 써요(z를 0으로 두면 돼요).</p>`,
          code: {
            label: 'vector3.cs',
            lang: 'csharp',
            src: `transform.position = new Vector3(0, 5, 0);
Debug.Log(transform.position.y);`,
            out: `5`
          }
        },
        {
          h: '매 프레임 조금씩 움직이기',
          html: `<p><code>Update()</code> 안에서 <code>transform.position</code>을 조금씩 바꾸면, 오브젝트가 부드럽게 움직이는 것처럼 보여요.</p>`,
          code: {
            label: 'move_update.cs',
            lang: 'csharp',
            src: `void Update()
{
    transform.position += new Vector3(0, 0.1f, 0);
}`
          },
          after: `<div class="note"><b>팁</b> — 숫자 뒤에 <code>f</code>를 붙이면(예: <code>0.1f</code>) "이건 float(소수) 타입이다"라는 뜻이에요. C#은 소수 리터럴에 기본적으로 f를 붙여야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '게임 오브젝트의 위치, 회전, 크기 정보를 담고 있는 것은?',
          '<code>Transform</code>', ['<code>Rigidbody</code>', '<code>Collider</code>', '<code>Camera</code>'],
          '<code>Transform</code>은 모든 게임 오브젝트가 가지고 있는 위치·회전·크기 정보예요.',
          '"변형, 위치"와 관련된 뜻을 가진 영어 단어예요.'
        ),
        () => {
          const x = randInt(0, 10), y = randInt(0, 10), z = randInt(0, 10);
          const axis = pick(['x', 'y', 'z']);
          const val = { x, y, z }[axis];
          return {
            type: 'blank',
            q: `<code>transform.position = new Vector3(${x}, ${y}, ${z});</code>일 때, <code>transform.position.${axis}</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(val)], placeholder: '숫자',
            why: `<code>Vector3(x, y, z)</code>의 순서대로 값이 들어가서, <code>.${axis}</code>는 ${val}이에요.`,
            hint: 'Vector3(x, y, z)는 순서대로 x, y, z 값을 담아요.'
          };
        },
        () => ({
          type: 'blank',
          q: `3차원 위치(x, y, z)를 나타내는 자료형 이름을 쓰세요.`,
          prefix: 'transform.position = new ', suffix: '(0, 5, 0);', accept: ['Vector3'], placeholder: '자료형 이름',
          why: '<code>Vector3</code>는 x, y, z 세 값을 담는 자료형이에요.',
          hint: '"벡터(방향과 크기를 가진 값)"와 숫자 3을 합친 이름이에요.'
        }),
        () => makeChoice(
          'C#에서 <code>0.1</code> 같은 소수 값 뒤에 흔히 붙이는 문자는?',
          '<code>f</code>', ['<code>d</code>', '<code>l</code>', '<code>s</code>'],
          '<code>0.1f</code>처럼 f를 붙이면 "이건 float(소수) 타입이다"라는 뜻이에요.',
          '"float(부동소수점)"의 첫 글자예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Update()</code> 메서드 안에서, 오브젝트를 매 프레임 y축으로 <code>0.1f</code>만큼 이동시키는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'void Update()\n{\n    transform.position += new Vector3(0, 0.1f, 0);\n}',
          accept: ['void Update()\n{\n    transform.position += new Vector3(0, 0.1f, 0);\n}'],
          why: 'Update() 안에서 transform.position에 작은 Vector3 값을 계속 더하면 부드럽게 움직여요.',
          hint: 'void Update() { } 안에 transform.position += new Vector3(0, 0.1f, 0);를 쓰세요.'
        }),
      ],
      boss: () => {
        const y = randInt(1, 10);
        const times = randInt(2, 5);
        const step = 1;
        return {
          type: 'blank',
          q: `<code>transform.position = new Vector3(0, ${y}, 0);</code>로 시작한 뒤, <code>Update()</code>에서 <code>transform.position += new Vector3(0, ${step}, 0);</code>를 ${times}번 실행하면, <code>transform.position.y</code>는 얼마가 될까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(y + step * times)], placeholder: '숫자',
          why: `시작 y값 ${y}에 매번 ${step}씩 ${times}번 더해지니 ${y} + ${step} × ${times} = ${y + step * times}예요.`,
          hint: '시작값에 한 번에 늘어나는 양을 반복 횟수만큼 곱해서 더해보세요.'
        };
      }
    },
    {
      id: 'inspector',
      title: '인스펙터에 변수 노출하기',
      ready: true,
      summary: '코드를 안 고치고도 Unity 에디터 화면에서 값을 조정할 수 있게 해주는 방법을 배워요.',
      goals: ['public 변수', '[SerializeField]', '인스펙터의 의미'],
      blocks: [
        {
          h: 'public 변수는 인스펙터 창에 나타나요',
          html: `<p>Unity 에디터에는 오브젝트를 선택하면 그 오브젝트에 붙은 스크립트의 값을 보여주는 <b>인스펙터(Inspector)</b> 창이 있어요. 클래스 안의 <code>public</code> 변수는 이 인스펙터 창에 자동으로 나타나서, 코드를 고치지 않고도 값을 바꿀 수 있어요.</p>`,
          code: {
            label: 'PlayerStats.cs',
            lang: 'csharp',
            src: `public class PlayerStats : MonoBehaviour
{
    public int maxHealth = 100;
    public float moveSpeed = 5.0f;
}`
          }
        },
        {
          h: '변수는 숨기고 싶은데 인스펙터엔 보이고 싶다면: [SerializeField]',
          html: `<p>변수를 다른 스크립트에서 함부로 못 바꾸게 <code>private</code>로 숨기고 싶은데, 그래도 인스펙터에서는 값을 조정하고 싶을 때가 있어요. 이럴 땐 변수 위에 <code>[SerializeField]</code>를 붙여요.</p>`,
          code: {
            label: 'serialize_field.cs',
            lang: 'csharp',
            src: `public class PlayerStats : MonoBehaviour
{
    [SerializeField]
    private int maxHealth = 100;
}`
          }
        },
        {
          h: '왜 이렇게 할까?',
          html: `<p>기획자나 디자이너가 프로그래머 없이도 인스펙터 창에서 "체력 100 → 150"처럼 값을 바로바로 바꿔가며 테스트할 수 있게 되기 때문이에요. 게임 만들 때 아주 자주 쓰는 패턴이에요.</p>`,
          after: `<div class="note"><b>정리</b> — <code>public</code>: 인스펙터에 보이고 다른 코드에서도 접근 가능. <code>[SerializeField] private</code>: 인스펙터엔 보이지만 다른 코드에서는 접근 불가.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '클래스 안의 변수를 Unity 에디터의 인스펙터 창에 자동으로 보이게 하는 접근 제한자는?',
          '<code>public</code>', ['<code>private</code>', '<code>static</code>', '<code>void</code>'],
          '<code>public</code> 변수는 인스펙터 창에 자동으로 나타나서 값을 조정할 수 있어요.',
          '"공개된, 모두에게 열린"이라는 뜻의 영어 단어예요.'
        ),
        () => {
          const health = randInt(50, 200);
          return {
            type: 'blank',
            q: `체력을 나타내는 변수 <code>maxHealth</code>(정수, 초기값 ${health})를 인스펙터에서 보이도록 선언하는 코드를 완성하세요.`,
            prefix: '', suffix: ` int maxHealth = ${health};`, accept: ['public'], placeholder: '키워드',
            why: '<code>public int maxHealth = ...;</code>처럼 public으로 선언하면 인스펙터에 나타나요.',
            hint: '인스펙터에 보이게 하려면 어떤 접근 제한자를 써야 할지 떠올려보세요.'
          };
        },
        () => ({
          type: 'blank',
          q: `변수를 <code>private</code>로 숨기면서도 인스펙터에는 보이게 하고 싶을 때, 변수 위에 붙이는 표기를 쓰세요.`,
          prefix: '', suffix: '\nprivate int maxHealth = 100;', accept: ['[SerializeField]'], placeholder: '[표기]',
          why: '<code>[SerializeField]</code>를 private 변수 위에 붙이면, 숨겨져 있으면서도 인스펙터에는 나타나요.',
          hint: '대괄호 안에 "직렬화(저장 가능하게 만들기)"라는 뜻의 영어 단어가 들어가요.'
        }),
        () => makeChoice(
          '[SerializeField]가 붙은 private 변수와 public 변수의 공통점은?',
          '둘 다 인스펙터 창에 나타난다', ['둘 다 다른 스크립트에서 자유롭게 접근할 수 있다', '둘 다 값을 바꿀 수 없다', '둘 다 인스펙터에 나타나지 않는다'],
          '두 방식 모두 인스펙터에는 나타나지만, private + [SerializeField]는 다른 스크립트에서의 접근은 막아요.',
          '인스펙터에 "보이는지"와 다른 코드에서 "접근 가능한지"는 별개의 문제예요.'
        ),
        () => ({
          type: 'code',
          q: '이동 속도를 나타내는 변수 <code>moveSpeed</code>(float, 초기값 5.0f)를 인스펙터에서 조정할 수 있도록 public으로 선언하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'public float moveSpeed = 5.0f;',
          accept: ['public float moveSpeed = 5.0f;'],
          why: 'public으로 선언하면 인스펙터 창에서 값을 바로 조정할 수 있어요.',
          hint: 'public float moveSpeed = 5.0f; 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const health = randInt(80, 150);
        return {
          type: 'blank',
          q: `<code>public int maxHealth = ${health};</code>로 선언된 변수를, 인스펙터 창에서 값을 바꾸지 않고 그대로 게임을 실행했어요. <code>Debug.Log(maxHealth);</code>의 결과는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(health)], placeholder: '숫자',
          why: `인스펙터에서 값을 바꾸지 않았으니 코드에 적힌 초기값 ${health}가 그대로 출력돼요.`,
          hint: '인스펙터에서 값을 안 바꿨다면, 코드에 적어둔 초기값이 그대로 쓰여요.'
        };
      }
    },
    {
      id: 'input',
      title: '입력 받기',
      ready: true,
      summary: '키보드나 버튼 입력을 감지해서 캐릭터를 움직이는 방법을 배워요.',
      goals: ['Input.GetKeyDown', 'Input.GetAxis', 'Update()와 함께 쓰기'],
      blocks: [
        {
          h: '키를 눌렀는지 확인하기: Input.GetKeyDown',
          html: `<p><code>Input.GetKeyDown(KeyCode.키이름)</code>은 그 키를 <b>지금 막 눌렀을 때만</b> true를 돌려줘요(누르고 있는 동안 계속이 아니라, 누르는 그 순간 한 번만).</p>`,
          code: {
            label: 'jump.cs',
            lang: 'csharp',
            src: `void Update()
{
    if (Input.GetKeyDown(KeyCode.Space))
    {
        Debug.Log("점프!");
    }
}`
          }
        },
        {
          h: '방향키·조이스틱 값을 한 번에: Input.GetAxis',
          html: `<p><code>Input.GetAxis("Horizontal")</code>은 왼쪽/오른쪽 방향키(또는 A/D)를 눌렀을 때 -1(왼쪽)에서 1(오른쪽) 사이의 값을 돌려줘요. 아무것도 안 누르면 0이에요.</p>`,
          code: {
            label: 'move_input.cs',
            lang: 'csharp',
            src: `void Update()
{
    float move = Input.GetAxis("Horizontal");
    transform.position += new Vector3(move, 0, 0);
}`
          }
        },
        {
          h: '입력은 항상 Update()에서 확인해요',
          html: `<p>입력은 매 프레임 계속 확인해야 하기 때문에, <code>Start()</code>가 아니라 반드시 <code>Update()</code> 안에서 확인해요.</p>`,
          after: `<div class="note"><b>정리</b> — GetKeyDown은 "누르는 그 순간"(true/false), GetAxis는 "얼마나, 어느 방향으로"(숫자)를 알려줘요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '어떤 키를 "누르는 그 순간"에만 true를 돌려주는 메서드는?',
          '<code>Input.GetKeyDown</code>', ['<code>Input.GetAxis</code>', '<code>Debug.Log</code>', '<code>Time.deltaTime</code>'],
          '<code>Input.GetKeyDown</code>은 키를 누르는 순간 딱 한 번만 true예요.',
          '"눌렀다(down)"는 뜻이 이름에 들어있어요.'
        ),
        () => ({
          type: 'blank',
          q: `스페이스바를 눌렀는지 확인하는 코드를 완성하세요.`,
          prefix: 'if (Input.GetKeyDown(KeyCode.', suffix: ')) { ... }', accept: ['Space'], placeholder: '키 이름',
          why: '<code>KeyCode.Space</code>는 스페이스바를 나타내요.',
          hint: '"공백, 스페이스"를 뜻하는 영어 단어예요.'
        }),
        () => makeChoice(
          '왼쪽/오른쪽 방향키 입력을 -1~1 사이의 숫자로 알려주는 메서드는?',
          '<code>Input.GetAxis("Horizontal")</code>', ['<code>Input.GetKeyDown(KeyCode.Right)</code>', '<code>Debug.Log("Horizontal")</code>', '<code>transform.position.x</code>'],
          '<code>Input.GetAxis("Horizontal")</code>은 좌우 입력을 -1(왼쪽)~1(오른쪽) 사이 값으로 알려줘요.',
          '"가로, 수평"을 뜻하는 영어 단어가 인자로 들어가요.'
        ),
        () => makeChoice(
          '입력을 확인하는 코드는 어느 메서드 안에 써야 할까요?',
          '<code>Update()</code>', ['<code>Start()</code>', '<code>Awake()</code>', '어디든 상관없다'],
          '입력은 매 프레임 계속 확인해야 하므로 반복 실행되는 <code>Update()</code> 안에서 확인해요.',
          'Start()는 한 번만 실행되지만, 입력은 계속 확인해야 하죠.'
        ),
        () => ({
          type: 'code',
          q: '<code>Update()</code> 메서드 안에서, 스페이스바를 누르는 순간 <code>Debug.Log("점프!")</code>를 실행하는 코드를 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: 'void Update()\n{\n    if (Input.GetKeyDown(KeyCode.Space))\n    {\n        Debug.Log("점프!");\n    }\n}',
          accept: ['void Update()\n{\n    if (Input.GetKeyDown(KeyCode.Space))\n    {\n        Debug.Log("점프!");\n    }\n}'],
          why: 'Update() 안에서 Input.GetKeyDown으로 스페이스바 입력을 확인하고, 눌렸으면 로그를 출력해요.',
          hint: 'void Update() { } 안에 if (Input.GetKeyDown(KeyCode.Space)) { Debug.Log("점프!"); }를 쓰세요.'
        }),
      ],
      boss: () => {
        const pressed = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `<code>Update()</code> 안에 <code>if (Input.GetKeyDown(KeyCode.Space)) { Debug.Log("점프!"); }</code>가 있어요. 이번 프레임에 스페이스바를 ${pressed ? '누르는 순간이라면' : '누르지 않았다면'}, 콘솔에 무언가가 출력될까요? "예" 또는 "아니오"로 답하세요.`,
          prefix: '', suffix: '', accept: [pressed ? '예' : '아니오'], placeholder: '예 / 아니오',
          why: pressed
            ? '스페이스바를 누르는 순간이므로 GetKeyDown이 true가 되어 "점프!"가 출력돼요.'
            : '스페이스바를 누르지 않았으므로 GetKeyDown이 false가 되어 아무것도 출력되지 않아요.',
          hint: 'GetKeyDown은 그 키를 누르는 바로 그 순간에만 true예요.'
        };
      }
    },
    {
      id: 'collision',
      title: '충돌 감지 기초',
      ready: true,
      summary: '캐릭터가 벽에 부딪히거나 아이템을 먹었을 때를 감지하는 방법을 배워요.',
      goals: ['Collider와 물리 충돌', 'OnCollisionEnter', 'OnTriggerEnter'],
      blocks: [
        {
          h: '부딪히는 모양: Collider',
          html: `<p>오브젝트끼리 충돌을 감지하려면 각 오브젝트에 <code>Collider</code>(충돌체) 컴포넌트가 있어야 해요. Collider는 "이 오브젝트의 부딪히는 범위가 여기까지다"를 정해주는 보이지 않는 테두리예요.</p>`
        },
        {
          h: '진짜로 부딪혔을 때: OnCollisionEnter',
          html: `<p>두 Collider가 실제로 물리적으로 부딪히면(서로 밀어내면서), <code>OnCollisionEnter</code> 메서드가 자동으로 호출돼요. 매개변수 <code>Collision</code> 안에는 "무엇과 부딪혔는지" 정보가 들어있어요.</p>`,
          code: {
            label: 'collision.cs',
            lang: 'csharp',
            src: `void OnCollisionEnter(Collision collision)
{
    Debug.Log("부딪힌 대상: " + collision.gameObject.name);
}`
          }
        },
        {
          h: '통과하면서 감지만: OnTriggerEnter',
          html: `<p>아이템을 "먹었을 때"처럼, 실제로 부딪혀서 밀려나지 않고 그냥 <b>통과하면서 감지만</b> 하고 싶을 땐 Collider를 "Is Trigger"로 설정하고 <code>OnTriggerEnter</code>를 써요.</p>`,
          code: {
            label: 'trigger.cs',
            lang: 'csharp',
            src: `void OnTriggerEnter(Collider other)
{
    Debug.Log("아이템 획득: " + other.gameObject.name);
    Destroy(other.gameObject);
}`
          },
          after: `<div class="note"><b>차이</b> — OnCollisionEnter는 "부딪혀서 서로 밀어냄"(벽, 바닥), OnTriggerEnter는 "통과하며 감지만 함"(아이템, 체크포인트)에 써요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '오브젝트끼리 충돌을 감지하려면 반드시 있어야 하는 컴포넌트는?',
          '<code>Collider</code>', ['<code>Transform</code>', '<code>Camera</code>', '<code>Script</code>'],
          '<code>Collider</code>는 오브젝트의 "부딪히는 범위"를 정해줘요.',
          '"충돌하다"라는 뜻의 영어 단어에서 온 이름이에요.'
        ),
        () => makeChoice(
          '두 오브젝트가 실제로 부딪혀서 서로 밀어낼 때 자동으로 호출되는 메서드는?',
          '<code>OnCollisionEnter</code>', ['<code>OnTriggerEnter</code>', '<code>Start</code>', '<code>Update</code>'],
          '<code>OnCollisionEnter</code>는 물리적으로 실제 충돌이 일어났을 때 호출돼요.',
          '"충돌(collision)에 들어갔을 때(enter)"라는 뜻이에요.'
        ),
        () => makeChoice(
          '아이템처럼 실제로 부딪히지 않고 통과하면서 감지만 하고 싶을 때 쓰는 메서드는?',
          '<code>OnTriggerEnter</code>', ['<code>OnCollisionEnter</code>', '<code>OnCollisionExit</code>', '<code>OnDestroy</code>'],
          '<code>OnTriggerEnter</code>는 Collider를 "Is Trigger"로 설정했을 때, 통과 감지에 써요.',
          '"방아쇠, 계기(trigger)"라는 뜻의 단어예요 — 밀어내지 않고 감지만 해요.'
        ),
        () => ({
          type: 'blank',
          q: `아이템과 부딪힌(통과한) 오브젝트를 화면에서 없애는 메서드를 쓰세요.`,
          prefix: '', suffix: '(other.gameObject);', accept: ['Destroy'], placeholder: '메서드 이름',
          why: '<code>Destroy(오브젝트)</code>는 그 게임 오브젝트를 씬에서 없애줘요.',
          hint: '"파괴하다, 없애다"라는 뜻의 영어 단어예요.'
        }),
        () => ({
          type: 'code',
          q: '<code>OnTriggerEnter(Collider other)</code> 메서드를 작성해서, <code>Debug.Log("아이템 획득: " + other.gameObject.name);</code>을 출력하고 <code>Destroy(other.gameObject);</code>로 그 오브젝트를 없애는 코드를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'void OnTriggerEnter(Collider other)\n{\n    Debug.Log("아이템 획득: " + other.gameObject.name);\n    Destroy(other.gameObject);\n}',
          accept: ['void OnTriggerEnter(Collider other)\n{\n    Debug.Log("아이템 획득: " + other.gameObject.name);\n    Destroy(other.gameObject);\n}'],
          why: 'OnTriggerEnter 메서드 안에서 로그를 출력하고, Destroy로 부딪힌(통과한) 오브젝트를 없애요.',
          hint: 'void OnTriggerEnter(Collider other) { } 안에 Debug.Log와 Destroy를 순서대로 쓰세요.'
        }),
      ],
      boss: () => {
        const isTrigger = Math.random() < 0.5;
        const label = isTrigger ? 'OnTriggerEnter' : 'OnCollisionEnter';
        return {
          type: 'blank',
          q: `플레이어가 ${isTrigger ? '아이템을 통과하며 먹는(밀려나지 않는)' : '벽에 실제로 부딪혀 밀려나는'} 상황을 감지하려면, <code>OnCollisionEnter</code>와 <code>OnTriggerEnter</code> 중 어떤 메서드를 써야 할까요? (그대로 입력)`,
          prefix: '', suffix: '', accept: [label], placeholder: '메서드 이름',
          why: isTrigger
            ? '통과하며 감지만 하는 상황(아이템 먹기)이므로 Is Trigger로 설정하고 OnTriggerEnter를 써요.'
            : '실제로 부딪혀서 밀려나는 상황(벽 충돌)이므로 OnCollisionEnter를 써요.',
          hint: '"밀려나는지 아닌지"가 두 메서드를 구분하는 핵심이에요.'
        };
      }
    },
    {
      id: 'deltaTimeMovement',
      title: 'Time.deltaTime과 프레임 독립적 이동',
      ready: true,
      summary: '컴퓨터 성능에 따라 프레임 속도가 달라져도 항상 같은 속도로 움직이게 해주는 Time.deltaTime을 배워요.',
      goals: ['고정값 이동의 문제점', 'Time.deltaTime의 의미', '속도 × deltaTime으로 이동하기'],
      blocks: [
        {
          h: '문제: 프레임마다 고정된 값을 더하면?',
          html: `<p>매 프레임 항상 같은 값을 <code>transform.position</code>에 더하면, 1초에 프레임이 60번 도는 컴퓨터와 30번 도는 컴퓨터에서 오브젝트가 움직이는 <b>실제 속도가 서로 달라져요</b>. 프레임이 빠른 컴퓨터일수록 더 빨리 움직이게 되는 거예요.</p>`,
          code: {
            label: 'bad_move.cs',
            lang: 'csharp',
            src: `void Update()
{
    transform.position += new Vector3(0.1f, 0, 0); // 프레임마다 항상 0.1만큼 이동
}`
          }
        },
        {
          h: '해결: Time.deltaTime',
          html: `<p><code>Time.deltaTime</code>은 "바로 직전 프레임부터 지금까지 걸린 시간(초)"이에요. 이동 값에 <code>Time.deltaTime</code>을 곱해주면, 프레임이 빠른 컴퓨터는 조금씩 자주 움직이고 느린 컴퓨터는 크게 가끔 움직여서, 결과적으로 <b>1초에 항상 같은 거리</b>를 이동하게 돼요.</p>`,
          code: {
            label: 'delta_time.cs',
            lang: 'csharp',
            src: `public float speed = 5.0f;

void Update()
{
    transform.position += new Vector3(speed * Time.deltaTime, 0, 0);
}`
          },
          after: `<div class="note"><b>정리</b> — "속도 × Time.deltaTime"은 Unity 이동 코드에서 가장 기본이 되는 공식이에요. speed는 "초당 이동 거리"를 뜻하게 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const speed = randInt(2, 10);
          const dt = pick([0.01, 0.02, 0.05]);
          const result = (speed * dt).toFixed(2);
          return {
            type: 'blank',
            q: `<code>public float speed = ${speed}f;</code>이고 이번 프레임의 <code>Time.deltaTime</code>이 ${dt}(초)라고 할 때, <code>speed * Time.deltaTime</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [result, String(parseFloat(result))], placeholder: '숫자',
            why: `${speed} × ${dt} = ${result}이에요.`,
            hint: 'speed와 Time.deltaTime을 그대로 곱해보세요.'
          };
        },
        () => makeChoice(
          '<code>Time.deltaTime</code>이 뜻하는 것은?',
          '직전 프레임부터 이번 프레임까지 걸린 시간(초)', ['게임을 시작한 뒤 지난 총 시간', '1초당 프레임 수', '항상 고정된 값 0.02'],
          'Time.deltaTime은 매 프레임 달라지는, "바로 이전 프레임과의 시간 간격"이에요.',
          '프레임마다 이 값이 달라질 수 있다는 게 핵심이에요.'
        ),
        () => makeChoice(
          '매 프레임 항상 같은 고정 값을 이동에 더하면 생기는 문제는?',
          '컴퓨터의 프레임 속도에 따라 실제 이동 속도가 달라진다', ['오브젝트가 아예 움직이지 않는다', '컴파일 오류가 발생한다', '메모리 부족 오류가 발생한다'],
          '프레임이 빠른 컴퓨터는 그 값을 더 자주 더하게 되니 더 빨리 움직이게 돼요.',
          '프레임 수가 컴퓨터마다 다르다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>public float speed = 5.0f;</code>를 이용해서, <code>Update()</code> 안에서 x축으로 프레임 독립적으로 이동시키는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'void Update()\n{\n    transform.position += new Vector3(speed * Time.deltaTime, 0, 0);\n}',
          accept: ['void Update()\n{\n    transform.position += new Vector3(speed * Time.deltaTime, 0, 0);\n}'],
          why: 'speed * Time.deltaTime을 이동 값으로 쓰면 프레임 속도와 상관없이 일정한 속도로 움직여요.',
          hint: 'void Update() { } 안에 transform.position += new Vector3(speed * Time.deltaTime, 0, 0);를 쓰세요.'
        }),
      ],
      boss: () => {
        const speed = randInt(2, 8);
        const dt = 0.02;
        const frames = randInt(10, 50);
        const result = (speed * dt * frames).toFixed(2);
        return {
          type: 'blank',
          q: `<code>public float speed = ${speed}f;</code>이고, <code>Update()</code>에서 <code>transform.position += new Vector3(speed * Time.deltaTime, 0, 0);</code>를 실행해요. 매 프레임 <code>Time.deltaTime</code>이 항상 ${dt}(초)라고 가정하면, ${frames}프레임이 지난 뒤 x축으로 총 얼마나 이동했을까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [result, String(parseFloat(result))], placeholder: '숫자',
          why: `한 프레임에 ${speed} × ${dt} = ${(speed * dt).toFixed(2)}만큼 이동하고, 이게 ${frames}번 반복되니 총 ${result}예요.`,
          hint: '한 프레임당 이동 거리를 구한 다음, 프레임 수만큼 곱해보세요.'
        };
      }
    },
    {
      id: 'fixedUpdatePhysics',
      title: 'FixedUpdate와 물리 업데이트',
      ready: true,
      summary: '물리 연산을 다루는 FixedUpdate와, 힘을 가해 움직이는 Rigidbody를 배워요.',
      goals: ['FixedUpdate가 실행되는 주기', 'Rigidbody와 AddForce', '물리 코드는 FixedUpdate에'],
      blocks: [
        {
          h: '일정한 간격으로: FixedUpdate',
          html: `<p><code>Update()</code>는 프레임마다(간격이 불규칙하게) 실행되지만, <code>FixedUpdate()</code>는 물리 엔진과 맞춰 <b>항상 일정한 간격</b>(기본값 0.02초)으로 실행돼요. 그래서 힘을 가하거나 물리 이동을 다루는 코드는 FixedUpdate에 써야 해요.</p>`,
          code: {
            label: 'fixed_update.cs',
            lang: 'csharp',
            src: `void FixedUpdate()
{
    Debug.Log("물리 업데이트");
}`
          }
        },
        {
          h: '힘으로 움직이기: Rigidbody와 AddForce',
          html: `<p><code>Rigidbody</code>가 붙은 오브젝트는 중력이나 힘 같은 물리 법칙의 영향을 받게 돼요. <code>AddForce</code>는 그 방향으로 힘(가속도)을 가해요 — transform.position을 직접 바꾸는 것과 달리, 계속 힘을 가하면 점점 더 빨라져요.</p>`,
          code: {
            label: 'add_force.cs',
            lang: 'csharp',
            src: `public Rigidbody rb;
public float force = 10f;

void FixedUpdate()
{
    rb.AddForce(Vector3.up * force);
}`
          },
          after: `<div class="note"><b>정리</b> — "물리 관련 코드는 FixedUpdate, 그 외 대부분은 Update"라고 기억하면 편해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>FixedUpdate()</code>의 특징으로 알맞은 것은?',
          '항상 일정한 시간 간격으로 실행된다', ['프레임마다 간격이 들쭉날쭉하다', '게임 시작 시 딱 한 번만 실행된다', 'Update()보다 항상 늦게 정의해야 한다'],
          'FixedUpdate는 물리 엔진과 맞춰 항상 고정된 간격(기본 0.02초)으로 호출돼요.',
          '"고정된(fixed)"이라는 이름 그대로예요.'
        ),
        () => ({
          type: 'blank',
          q: `힘을 가하거나 물리 이동을 다루는 코드를 넣어야 하는 메서드 이름을 쓰세요.`,
          prefix: 'void ', suffix: '() { rb.AddForce(Vector3.up * force); }', accept: ['FixedUpdate'], placeholder: '메서드 이름',
          why: '물리 관련 코드는 일정한 간격으로 실행되는 FixedUpdate() 안에 써야 해요.',
          hint: '"고정된" 간격으로 실행되는 메서드예요.'
        }),
        () => makeChoice(
          '<code>Rigidbody</code>가 오브젝트에 붙어있으면 생기는 변화는?',
          '중력이나 힘 같은 물리 법칙의 영향을 받게 된다', ['오브젝트가 화면에서 안 보이게 된다', '충돌 감지가 불가능해진다', 'Transform 정보가 사라진다'],
          'Rigidbody는 그 오브젝트를 물리 시뮬레이션의 대상으로 만들어줘요.',
          '"강체(단단한 물체)"라는 뜻의 물리 용어예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>public Rigidbody rb;</code>와 <code>public float force = 10f;</code>가 있을 때, <code>FixedUpdate()</code> 안에서 위쪽으로 힘을 가하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'void FixedUpdate()\n{\n    rb.AddForce(Vector3.up * force);\n}',
          accept: ['void FixedUpdate()\n{\n    rb.AddForce(Vector3.up * force);\n}'],
          why: 'FixedUpdate 안에서 rb.AddForce(방향 * 힘)으로 물리적인 힘을 가해요.',
          hint: 'void FixedUpdate() { } 안에 rb.AddForce(Vector3.up * force);를 쓰세요.'
        }),
      ],
      boss: () => {
        const isPhysics = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `${isPhysics ? 'Rigidbody에 점프하는 힘을 가하는 코드' : '입력 키를 매 프레임 확인하는 코드'}는 <code>Update()</code>와 <code>FixedUpdate()</code> 중 어느 메서드 안에 써야 할까요? (그대로 입력)`,
          prefix: '', suffix: '', accept: [isPhysics ? 'FixedUpdate' : 'Update'], placeholder: '메서드 이름',
          why: isPhysics
            ? '힘을 가하는 물리 코드는 일정한 간격으로 실행되는 FixedUpdate에 써야 해요.'
            : '입력 확인은 물리와 상관없이 매 프레임 확인해야 하므로 Update에 써요.',
          hint: '물리(힘, 이동)와 관련된 건 FixedUpdate, 그 외 대부분은 Update예요.'
        };
      }
    },
    {
      id: 'coroutineBasics',
      title: '코루틴: IEnumerator와 yield return',
      ready: true,
      summary: '특정 시간 동안 기다리거나 여러 프레임에 걸쳐 순서대로 실행되는 코드를 만드는 코루틴을 배워요.',
      goals: ['IEnumerator와 yield return', 'StartCoroutine으로 시작하기', 'WaitForSeconds로 기다리기'],
      blocks: [
        {
          h: '잠깐 멈췄다 이어가기: yield return',
          html: `<p><code>IEnumerator</code> 타입의 함수 안에서 <code>yield return</code>을 쓰면, 그 지점에서 실행을 잠시 멈췄다가 조건이 충족되면 이어서 실행할 수 있어요. <code>WaitForSeconds(2f)</code>는 "2초 기다렸다가 이어가라"는 뜻이에요.</p>`,
          code: {
            label: 'coroutine.cs',
            lang: 'csharp',
            src: `IEnumerator SpawnEnemy()
{
    Debug.Log("적 생성 시작");
    yield return new WaitForSeconds(2f);
    Debug.Log("2초 후 적 생성!");
}

void Start()
{
    StartCoroutine(SpawnEnemy());
}`,
            out: `적 생성 시작\n2초 후 적 생성!`
          }
        },
        {
          h: '계속 반복하기: while + yield',
          html: `<p><code>while (true)</code>와 <code>yield return</code>을 함께 쓰면 "일정 시간마다 계속 반복"하는 코드를 간결하게 만들 수 있어요. Update() 안에 타이머 변수를 직접 두는 것보다 훨씬 읽기 쉬워요.</p>`,
          code: {
            label: 'coroutine_loop.cs',
            lang: 'csharp',
            src: `IEnumerator SpawnLoop()
{
    while (true)
    {
        Instantiate(enemyPrefab);
        yield return new WaitForSeconds(1f);
    }
}`
          },
          after: `<div class="note"><b>정리</b> — 코루틴은 <code>StartCoroutine(함수이름())</code>으로 시작하고, 함수의 반환 타입은 반드시 <code>IEnumerator</code>여야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>IEnumerator Sequence() { Debug.Log("A"); yield return new WaitForSeconds(1f); Debug.Log("B"); }</code>를 <code>StartCoroutine(Sequence())</code>으로 실행하면, "A"와 "B" 중 어느 것이 먼저 출력될까요?`,
          prefix: '', suffix: '', accept: ['A'], placeholder: 'A / B',
          why: 'yield return 이전 코드가 먼저 실행되고, 1초를 기다린 뒤에야 그 다음 코드(B)가 실행돼요.',
          hint: 'yield return을 만나기 전까지의 코드가 먼저 실행돼요.'
        }),
        () => makeChoice(
          '<code>yield return new WaitForSeconds(2f);</code>의 의미로 알맞은 것은?',
          '실행을 여기서 멈췄다가, 2초가 지나면 이어서 실행한다', ['2초 동안 반복해서 실행한다', '2초 뒤에 코루틴을 아예 종료한다', '2초마다 다른 코루틴을 새로 시작한다'],
          'yield return new WaitForSeconds(2f)는 "여기서 2초간 멈췄다가 이어가라"는 뜻이에요.',
          '"양보하다, 넘겨주다(yield)"라는 이름처럼 실행을 잠시 넘겨줘요.'
        ),
        () => makeChoice(
          '코루틴 함수를 실제로 시작시키는 메서드는?',
          '<code>StartCoroutine(함수이름())</code>', ['<code>RunCoroutine(함수이름())</code>', '<code>Update(함수이름())</code>', '<code>new Coroutine(함수이름())</code>'],
          '<code>IEnumerator</code> 함수를 만들었어도, <code>StartCoroutine(...)</code>으로 호출해야 실제로 실행돼요.',
          '"시작하다(start)"와 "코루틴(coroutine)"을 합친 이름이에요.'
        ),
        () => ({
          type: 'code',
          q: '"대기 시작"을 출력하고, 3초를 기다린 뒤 "대기 완료"를 출력하는 코루틴 함수 <code>WaitAndLog</code>를 <code>IEnumerator</code>로 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'IEnumerator WaitAndLog()\n{\n    Debug.Log("대기 시작");\n    yield return new WaitForSeconds(3f);\n    Debug.Log("대기 완료");\n}',
          accept: ['IEnumerator WaitAndLog()\n{\n    Debug.Log("대기 시작");\n    yield return new WaitForSeconds(3f);\n    Debug.Log("대기 완료");\n}'],
          why: 'IEnumerator 함수 안에서 yield return new WaitForSeconds(3f)로 3초를 기다린 뒤 다음 코드를 실행해요.',
          hint: 'IEnumerator WaitAndLog() { } 안에 Debug.Log, yield return, Debug.Log 순서로 쓰세요.'
        }),
      ],
      boss: () => {
        const n = randInt(2, 5);
        return {
          type: 'blank',
          q: `<code>IEnumerator SpawnLoop() { while (true) { Debug.Log("생성"); yield return new WaitForSeconds(1f); } }</code>을 <code>StartCoroutine(SpawnLoop())</code>으로 실행했을 때, ${n}초가 지나면 "생성"은 총 몇 번 출력됐을까요? 숫자만 쓰세요. (첫 번째는 0초 시점에 바로 출력돼요)`,
          prefix: '', suffix: '', accept: [String(n + 1)], placeholder: '숫자',
          why: `0초에 한 번 출력되고, 1초마다 한 번씩 더 출력되니 ${n}초까지 총 ${n + 1}번 출력돼요.`,
          hint: '0초 시점의 첫 출력을 빼먹지 않도록 주의하세요.'
        };
      }
    },
    {
      id: 'getComponentBasics',
      title: 'GetComponent<T>()로 컴포넌트 가져오기',
      ready: true,
      summary: '같은 오브젝트에 붙어있는 다른 컴포넌트를 코드에서 찾아 쓰는 GetComponent<T>()를 배워요.',
      goals: ['GetComponent<T>()', '없는 컴포넌트를 찾으면 null', 'Start()에서 미리 찾아두기'],
      blocks: [
        {
          h: '같은 오브젝트의 다른 컴포넌트 찾기',
          html: `<p><code>GetComponent&lt;T&gt;()</code>는 "이 오브젝트에 T 타입의 컴포넌트가 붙어있으면 그걸 가져와라"는 뜻이에요. 매 프레임 계속 부르면 느려지므로, 보통 <code>Start()</code>에서 한 번만 찾아 변수에 저장해둬요.</p>`,
          code: {
            label: 'get_component.cs',
            lang: 'csharp',
            src: `Rigidbody rb;

void Start()
{
    rb = GetComponent<Rigidbody>();
}

void FixedUpdate()
{
    rb.AddForce(Vector3.up);
}`
          }
        },
        {
          h: '없으면 null',
          html: `<p>찾으려는 타입의 컴포넌트가 그 오브젝트에 없다면, <code>GetComponent&lt;T&gt;()</code>는 <code>null</code>을 돌려줘요. 그래서 사용하기 전에 null인지 확인하는 습관이 안전해요.</p>`,
          code: {
            label: 'get_component_null.cs',
            lang: 'csharp',
            src: `SpriteRenderer sr = GetComponent<SpriteRenderer>();
if (sr == null)
{
    Debug.Log("SpriteRenderer가 없어요");
}`
          },
          after: `<div class="note"><b>정리</b> — "찾기는 Start()에서 한 번, 사용은 Update()/FixedUpdate()에서 여러 번"이 좋은 습관이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const hasComponent = Math.random() < 0.5;
          return {
            type: 'blank',
            q: `이 오브젝트에 <code>AudioSource</code> 컴포넌트가 ${hasComponent ? '붙어있을' : '붙어있지 않을'} 때, <code>GetComponent<AudioSource>()</code>의 결과는? (컴포넌트가 있으면 '찾음', 없으면 'null')`,
            prefix: '', suffix: '', accept: [hasComponent ? '찾음' : 'null'], placeholder: '찾음 / null',
            why: hasComponent
              ? '컴포넌트가 실제로 붙어있으므로 GetComponent가 그 컴포넌트를 찾아서 돌려줘요.'
              : '그 타입의 컴포넌트가 없으므로 GetComponent는 null을 돌려줘요.',
            hint: 'GetComponent는 찾는 타입이 없으면 null을 돌려줘요.'
          };
        },
        () => makeChoice(
          'GetComponent<T>()를 매 프레임(Update 안)이 아니라 Start()에서 한 번만 부르고 변수에 저장해두는 이유는?',
          'GetComponent는 비용이 드는 작업이라, 매 프레임 반복하면 성능이 나빠지기 때문', ['Start()에서만 GetComponent를 쓸 수 있기 때문', 'Update()에서는 컴포넌트를 찾을 수 없기 때문', 'Start()에서 부르면 결과가 더 정확하기 때문'],
          'GetComponent를 매 프레임 반복해서 부르면 불필요하게 성능이 낭비돼요. 한 번 찾아서 변수에 캐싱해두는 게 좋은 습관이에요.',
          '"한 번만 찾고, 계속 재사용하자"는 성능 최적화의 기본이에요.'
        ),
        () => makeChoice(
          '찾으려는 타입의 컴포넌트가 그 오브젝트에 없을 때, <code>GetComponent&lt;T&gt;()</code>가 돌려주는 값은?',
          '<code>null</code>', ['오류(예외)를 던진다', '빈 문자열', '0'],
          '컴포넌트가 없으면 GetComponent는 조용히 null을 돌려줘요(오류를 던지지 않아요).',
          '"찾지 못했다"는 걸 나타내는 값이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Rigidbody</code> 타입의 변수 <code>rb</code>를, <code>Start()</code>에서 <code>GetComponent&lt;Rigidbody&gt;()</code>로 찾아 저장하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'void Start()\n{\n    rb = GetComponent<Rigidbody>();\n}',
          accept: ['void Start()\n{\n    rb = GetComponent<Rigidbody>();\n}'],
          why: 'Start() 안에서 GetComponent<Rigidbody>()로 찾은 결과를 rb에 저장해두면, 이후 여러 번 재사용할 수 있어요.',
          hint: 'void Start() { } 안에 rb = GetComponent<Rigidbody>();를 쓰세요.'
        }),
      ],
      boss: () => {
        const hasRb = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `<code>Rigidbody rb; void Start() { rb = GetComponent<Rigidbody>(); } void FixedUpdate() { if (rb != null) { rb.AddForce(Vector3.up); } }</code>인데, 이 오브젝트에 Rigidbody가 ${hasRb ? '붙어있어요' : '붙어있지 않아요'}. FixedUpdate에서 <code>rb.AddForce</code>가 실제로 호출될까요? (예/아니오)`,
          prefix: '', suffix: '', accept: [hasRb ? '예' : '아니오'], placeholder: '예 / 아니오',
          why: hasRb
            ? 'Rigidbody가 붙어있으므로 rb는 null이 아니고, if 조건을 통과해서 AddForce가 호출돼요.'
            : 'Rigidbody가 없으므로 rb는 null이 되고, if (rb != null) 조건에서 걸러져서 AddForce는 호출되지 않아요.',
          hint: 'rb가 null인지 아닌지가 if 조건의 결과를 결정해요.'
        };
      }
    },
    {
      id: 'instantiateDestroy',
      title: 'Instantiate와 Destroy로 오브젝트 만들고 없애기',
      ready: true,
      summary: '게임 도중 새 오브젝트(총알, 적 등)를 만들고 없애는 Instantiate와 Destroy를 배워요.',
      goals: ['프리팹이란 무엇인가', 'Instantiate로 복제 생성', 'Destroy로 제거하기(시간 지정 포함)'],
      blocks: [
        {
          h: '설계도로 오브젝트 복제하기: Instantiate',
          html: `<p><b>프리팹(Prefab)</b>은 미리 만들어둔 오브젝트의 "설계도" 같은 거예요. <code>Instantiate(프리팹, 위치, 회전)</code>으로 그 설계도를 바탕으로 실제 오브젝트를 게임 안에 만들어낼 수 있어요.</p>`,
          code: {
            label: 'instantiate.cs',
            lang: 'csharp',
            src: `public GameObject enemyPrefab;

void SpawnEnemy()
{
    Instantiate(enemyPrefab, transform.position, Quaternion.identity);
}`
          }
        },
        {
          h: '오브젝트 없애기: Destroy',
          html: `<p><code>Destroy(오브젝트)</code>는 그 오브젝트를 즉시 없애고, <code>Destroy(오브젝트, 초)</code>는 그 시간이 지난 뒤에 없애요. 총알이 일정 시간 뒤 자동으로 사라지게 할 때 자주 써요.</p>`,
          code: {
            label: 'destroy.cs',
            lang: 'csharp',
            src: `void OnTriggerEnter(Collider other)
{
    Destroy(gameObject); // 이 오브젝트 자신을 없앰
}

void Start()
{
    Destroy(gameObject, 3f); // 3초 뒤에 자동으로 없앰
}`
          },
          after: `<div class="note"><b>정리</b> — <code>Quaternion.identity</code>는 "회전 없음(기본 방향 그대로)"을 뜻해요. 회전을 신경 안 써도 될 때 자주 이렇게 써요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const seconds = randInt(2, 8);
          return {
            type: 'blank',
            q: `<code>Destroy(gameObject, ${seconds}f);</code>를 <code>Start()</code>에 넣으면, 이 오브젝트는 생성된 뒤 몇 초 후에 사라질까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(seconds)], placeholder: '숫자',
            why: `Destroy(오브젝트, ${seconds}f)는 ${seconds}초가 지난 뒤 그 오브젝트를 없애요.`,
            hint: 'Destroy의 두 번째 인자는 "몇 초 뒤에 없앨지"를 뜻해요.'
          };
        },
        () => makeChoice(
          '프리팹(Prefab)에 대한 설명으로 알맞은 것은?',
          '미리 만들어둔 오브젝트의 설계도로, Instantiate로 복제해서 실제 오브젝트를 만든다', ['이미 씬에 있는 오브젝트를 가리키는 다른 이름이다', '스크립트 파일의 다른 이름이다', 'Unity 에디터의 창 이름이다'],
          '프리팹은 "이런 모양과 설정을 가진 오브젝트"의 설계도이고, 이를 바탕으로 게임 중에 실제 오브젝트를 여러 개 만들 수 있어요.',
          '"미리 만들어진(pre-fabricated)"이라는 뜻의 줄임말이에요.'
        ),
        () => makeChoice(
          '<code>Instantiate(enemyPrefab, transform.position, Quaternion.identity)</code>에서 두 번째, 세 번째 인자가 각각 뜻하는 것은?',
          '생성될 위치, 생성될 회전', ['생성 개수, 생성 속도', '색상, 크기', '이름, 태그'],
          'Instantiate(프리팹, 위치, 회전) 형태로, 어디에 어떤 방향으로 생성할지를 지정해요.',
          'Transform이 가진 두 정보(위치, 회전)를 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>public GameObject bulletPrefab;</code>이 있을 때, 이 오브젝트의 현재 위치에 회전 없이(<code>Quaternion.identity</code>) <code>bulletPrefab</code>을 생성하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'Instantiate(bulletPrefab, transform.position, Quaternion.identity);',
          accept: ['Instantiate(bulletPrefab, transform.position, Quaternion.identity);'],
          why: 'Instantiate(프리팹, 위치, 회전) 형태로 프리팹을 바탕으로 새 오브젝트를 만들어요.',
          hint: 'Instantiate(bulletPrefab, transform.position, Quaternion.identity); 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const seconds = randInt(1, 10);
        return {
          type: 'blank',
          q: `총알 프리팹이 생성되자마자(Start()에서) <code>Destroy(gameObject, ${seconds}f);</code>가 실행돼요. 총알이 생성된 지 ${seconds - 1}초 되었을 때, 이 총알은 아직 존재할까요? (예/아니오)`,
          prefix: '', suffix: '', accept: ['예'], placeholder: '예 / 아니오',
          why: `Destroy는 ${seconds}초 후에 없어지도록 예약된 것이므로, 그보다 1초 이른 ${seconds - 1}초 시점에는 아직 존재해요.`,
          hint: 'Destroy(오브젝트, n초)는 정확히 n초가 지나야 없어져요.'
        };
      }
    },
    {
      id: 'singletonPattern',
      title: '싱글턴 패턴: GameManager',
      ready: true,
      summary: '게임 전체에서 딱 하나만 존재하며, 어디서든 쉽게 접근할 수 있는 매니저 오브젝트를 만드는 싱글턴 패턴을 배워요.',
      goals: ['static Instance로 전역 접근하기', '싱글턴을 쓰는 이유', '점수 등 게임 전체 정보 관리'],
      blocks: [
        {
          h: '어디서든 접근 가능하게: static Instance',
          html: `<p>점수, 게임 상태처럼 게임 전체에서 딱 하나만 있으면 되는 정보는, <code>static</code> 변수에 자기 자신을 저장해두는 <b>싱글턴 패턴</b>으로 관리해요. 그러면 어떤 스크립트에서든 <code>GameManager.Instance</code>로 그 하나뿐인 GameManager에 접근할 수 있어요.</p>`,
          code: {
            label: 'game_manager.cs',
            lang: 'csharp',
            src: `public class GameManager : MonoBehaviour
{
    public static GameManager Instance;
    public int score = 0;

    void Awake()
    {
        Instance = this;
    }

    public void AddScore(int amount)
    {
        score += amount;
    }
}`
          }
        },
        {
          h: '다른 스크립트에서 사용하기',
          html: `<p>다른 스크립트에서는 GameManager 오브젝트를 직접 찾지 않고도, <code>GameManager.Instance</code>로 바로 접근해서 점수를 올리거나 읽을 수 있어요.</p>`,
          code: {
            label: 'use_manager.cs',
            lang: 'csharp',
            src: `GameManager.Instance.AddScore(10);
Debug.Log(GameManager.Instance.score);`,
            out: `10`
          },
          after: `<div class="note"><b>정리</b> — <code>Awake()</code>에서 <code>Instance = this;</code>를 해두는 이유는, 다른 오브젝트의 <code>Start()</code>가 실행되기 전에(Awake가 Start보다 먼저 실행돼요) 미리 자기 자신을 등록해두기 위해서예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const scores = Array.from({ length: randInt(2, 3) }, () => randInt(5, 20));
          const total = scores.reduce((a, b) => a + b, 0);
          return {
            type: 'blank',
            q: `<code>public static GameManager Instance; public int score = 0; public void AddScore(int amount) { score += amount; }</code>일 때, <code>${scores.map(s => `GameManager.Instance.AddScore(${s})`).join('; ')}</code>를 실행하면 <code>GameManager.Instance.score</code>는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(total)], placeholder: '숫자',
            why: `${scores.join(' + ')} = ${total}이에요.`,
            hint: 'AddScore가 호출될 때마다 score에 그 값이 더해져요.'
          };
        },
        () => makeChoice(
          '싱글턴 패턴(static Instance)을 쓰는 이유로 알맞은 것은?',
          '씬 전체 어디서나, 그 오브젝트를 직접 찾지 않고도 쉽게 접근할 수 있게 하기 위해', ['오브젝트를 여러 개 만들기 위해', '메모리 사용량을 늘리기 위해', '다른 스크립트가 접근하지 못하게 막기 위해'],
          'static Instance는 "이 클래스의 유일한 대표 오브젝트"를 어디서든 GameManager.Instance로 바로 쓸 수 있게 해줘요.',
          '매번 GameObject.Find로 찾는 대신 쓰는 지름길이라고 생각하면 돼요.'
        ),
        () => makeChoice(
          '<code>Awake()</code>에서 <code>Instance = this;</code>를 해두는 이유는?',
          '다른 오브젝트의 Start()가 실행되기 전에, 미리 자기 자신을 등록해두기 위해서', ['Awake()에서만 static 변수를 쓸 수 있어서', 'Update()보다 Awake()가 반복 실행이 잘 되어서', 'Instance는 Awake에서만 값을 바꿀 수 있어서'],
          'Awake()는 모든 오브젝트의 Start()보다 먼저 실행되므로, 다른 스크립트가 GameManager.Instance를 쓰기 전에 미리 준비해둘 수 있어요.',
          'Unity 생명주기에서 Awake가 Start보다 먼저 실행된다는 걸 떠올려보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>GameManager</code> 클래스 안에, <code>public static GameManager Instance;</code>를 선언하고 <code>Awake()</code>에서 <code>Instance = this;</code>로 등록하는 코드를 작성하세요. (필드 선언과 Awake만)',
          starter: '',
          rows: 5,
          placeholder: 'public static GameManager Instance;\n\nvoid Awake()\n{\n    Instance = this;\n}',
          accept: ['public static GameManager Instance;\n\nvoid Awake()\n{\n    Instance = this;\n}'],
          why: 'static Instance 변수를 선언하고, Awake()에서 그 변수에 자기 자신(this)을 저장해요.',
          hint: 'public static GameManager Instance; 다음에 void Awake() { Instance = this; }를 쓰세요.'
        }),
      ],
      boss: () => {
        const initial = randInt(0, 20);
        const add = randInt(5, 15);
        return {
          type: 'blank',
          q: `<code>public int score = ${initial};</code>이고 <code>public void AddScore(int amount) { score += amount; }</code>일 때, 다른 스크립트 세 곳에서 각각 <code>GameManager.Instance.AddScore(${add})</code>를 한 번씩 호출했어요. 최종 <code>score</code>는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(initial + add * 3)], placeholder: '숫자',
          why: `시작값 ${initial}에 ${add}가 3번(서로 다른 스크립트에서 호출해도 같은 GameManager.Instance이므로) 더해져서 ${initial} + ${add} × 3 = ${initial + add * 3}이에요.`,
          hint: '싱글턴이므로 어느 스크립트에서 호출하든 항상 같은 하나의 score를 바꿔요.'
        };
      }
    },
    {
      id: 'tagsAndLayers',
      title: '태그와 레이어: CompareTag',
      ready: true,
      summary: '오브젝트의 종류를 구분하는 태그(Tag)와, CompareTag로 안전하게 비교하는 방법을 배워요.',
      goals: ['태그로 오브젝트 종류 구분하기', 'CompareTag 사용법', 'tag == "..." 대신 CompareTag를 쓰는 이유'],
      blocks: [
        {
          h: '이름표로 종류 구분하기: 태그',
          html: `<p><b>태그(Tag)</b>는 인스펙터에서 오브젝트마다 미리 붙여두는 이름표예요("Enemy", "Item" 등). <code>CompareTag("이름")</code>으로 "이 오브젝트가 그 이름표를 달고 있는지" 확인할 수 있어요.</p>`,
          code: {
            label: 'compare_tag.cs',
            lang: 'csharp',
            src: `void OnTriggerEnter(Collider other)
{
    if (other.CompareTag("Enemy"))
    {
        Debug.Log("적과 충돌!");
    }
    else if (other.CompareTag("Item"))
    {
        Debug.Log("아이템 획득!");
    }
}`
          }
        },
        {
          h: '왜 굳이 CompareTag를 쓸까?',
          html: `<p><code>other.tag == "Enemy"</code>도 똑같이 동작은 하지만, <code>CompareTag</code>가 더 빠르고 관례적으로 권장돼요. 문자열을 직접 비교하는 것보다 내부적으로 더 효율적으로 처리되기 때문이에요.</p>`,
          code: {
            label: 'tag_vs_compare.cs',
            lang: 'csharp',
            src: `if (other.tag == "Enemy") { } // 동작은 하지만 덜 권장됨
if (other.CompareTag("Enemy")) { } // 더 빠르고 권장되는 방식`
          },
          after: `<div class="note"><b>정리</b> — 기능은 같지만, 태그를 비교할 땐 항상 <code>CompareTag</code>를 쓰는 습관을 들이는 게 좋아요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const actualTag = pick(['Enemy', 'Item', 'Player']);
          const checkTag = pick(['Enemy', 'Item']);
          const matches = actualTag === checkTag;
          return {
            type: 'blank',
            q: `충돌한 오브젝트의 태그가 <code>"${actualTag}"</code>일 때, <code>other.CompareTag("${checkTag}")</code>의 결과는? (참/거짓)`,
            prefix: '', suffix: '', accept: matches ? ['true', '참'] : ['false', '거짓'], placeholder: 'true / false',
            why: matches
              ? `실제 태그 "${actualTag}"와 비교한 태그 "${checkTag}"가 같으므로 true예요.`
              : `실제 태그 "${actualTag}"와 비교한 태그 "${checkTag}"가 다르므로 false예요.`,
            hint: 'CompareTag는 오브젝트의 실제 태그와 괄호 안 문자열이 같은지 비교해요.'
          };
        },
        () => makeChoice(
          '<code>other.tag == "Enemy"</code> 대신 <code>other.CompareTag("Enemy")</code>를 쓰는 게 권장되는 이유는?',
          '성능이 더 좋고, Unity에서 관례적으로 권장하는 방식이기 때문', ['CompareTag만 대소문자를 구분하지 않기 때문', 'tag == 는 컴파일되지 않기 때문', 'CompareTag는 여러 태그를 한 번에 비교할 수 있기 때문'],
          '둘 다 동작하지만, CompareTag가 문자열 비교보다 효율적으로 처리되도록 만들어져 있어요.',
          '기능 차이보다는 "효율성과 관례"의 문제예요.'
        ),
        () => makeChoice(
          '태그(Tag)의 역할로 알맞은 것은?',
          '오브젝트의 종류를 구분하는 이름표', ['오브젝트의 물리 충돌 범위', '오브젝트가 그려지는 순서', '오브젝트의 애니메이션 상태'],
          '태그는 "이 오브젝트는 적이다", "이건 아이템이다"처럼 종류를 구분하는 이름표예요.',
          'Collider나 Animator가 아니라, 단순히 "이름 붙이기"에 가까운 개념이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>OnTriggerEnter(Collider other)</code> 안에서, 부딪힌 오브젝트의 태그가 <code>"Item"</code>이면 <code>Debug.Log("아이템 획득!");</code>을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'void OnTriggerEnter(Collider other)\n{\n    if (other.CompareTag("Item"))\n    {\n        Debug.Log("아이템 획득!");\n    }\n}',
          accept: ['void OnTriggerEnter(Collider other)\n{\n    if (other.CompareTag("Item"))\n    {\n        Debug.Log("아이템 획득!");\n    }\n}'],
          why: 'CompareTag("Item")으로 태그를 확인한 뒤, 맞으면 로그를 출력해요.',
          hint: 'if (other.CompareTag("Item")) { Debug.Log("아이템 획득!"); } 형태를 Trigger 메서드 안에 넣으세요.'
        }),
      ],
      boss: () => {
        const tag = pick(['Enemy', 'Item', 'Wall']);
        const outputs = { Enemy: '적과 충돌!', Item: '아이템 획득!' };
        const expected = outputs[tag] || '아무것도 출력 안 됨';
        return {
          type: 'blank',
          q: `<code>void OnTriggerEnter(Collider other) { if (other.CompareTag("Enemy")) { Debug.Log("적과 충돌!"); } else if (other.CompareTag("Item")) { Debug.Log("아이템 획득!"); } }</code>일 때, 태그가 <code>"${tag}"</code>인 오브젝트와 부딪히면 무엇이 출력될까요? (아무것도 안 나오면 '아무것도 출력 안 됨'이라고 쓰세요)`,
          prefix: '', suffix: '', accept: [expected], placeholder: '출력 결과',
          why: outputs[tag]
            ? `태그가 "${tag}"이므로 해당 분기가 실행돼서 "${expected}"가 출력돼요.`
            : `태그 "${tag}"는 Enemy도 Item도 아니므로 어떤 분기도 실행되지 않아요.`,
          hint: '두 CompareTag 조건 중 어느 것과도 맞지 않으면 아무것도 출력되지 않아요.'
        };
      }
    },
    {
      id: 'vector3Utilities',
      title: 'Vector3 유틸리티: Distance, Normalize, Lerp',
      ready: true,
      summary: '두 지점 사이의 거리, 방향, 부드러운 이동을 계산하는 Vector3의 유용한 기능들을 배워요.',
      goals: ['Vector3.Distance로 거리 구하기', 'normalized로 방향만 얻기', 'Vector3.Lerp로 부드럽게 이동하기'],
      blocks: [
        {
          h: '두 지점 사이 거리: Vector3.Distance',
          html: `<p><code>Vector3.Distance(a, b)</code>는 두 위치 사이의 거리를 계산해줘요. 적이 플레이어와 얼마나 가까운지 확인할 때 자주 써요.</p>`,
          code: {
            label: 'distance.cs',
            lang: 'csharp',
            src: `Vector3 playerPos = new Vector3(0, 0, 0);
Vector3 enemyPos = new Vector3(3, 4, 0);

float dist = Vector3.Distance(playerPos, enemyPos);
Debug.Log(dist);`,
            out: `5`
          }
        },
        {
          h: '방향만 남기기: normalized',
          html: `<p><code>normalized</code>는 벡터의 크기(길이)는 1로 만들고 방향만 남겨요. 목표를 향해 일정한 속도로 이동시키고 싶을 때 방향 벡터로 자주 써요.</p>`,
          code: {
            label: 'normalized.cs',
            lang: 'csharp',
            src: `Vector3 direction = (enemyPos - playerPos).normalized;
transform.position += direction * speed * Time.deltaTime;`
          }
        },
        {
          h: '부드럽게 다가가기: Vector3.Lerp',
          html: `<p><code>Vector3.Lerp(시작, 끝, 비율)</code>은 시작과 끝 사이를 비율만큼 선형 보간한 위치를 돌려줘요. 매 프레임 조금씩 목표에 다가가게 만들어서, 카메라가 캐릭터를 부드럽게 따라가는 것 같은 효과를 만들 때 자주 써요.</p>`,
          code: {
            label: 'lerp.cs',
            lang: 'csharp',
            src: `transform.position = Vector3.Lerp(transform.position, targetPos, 0.1f);`
          },
          after: `<div class="note"><b>정리</b> — Lerp의 비율이 0이면 시작 위치 그대로, 1이면 끝 위치 그대로, 0.1처럼 작은 값이면 목표 쪽으로 아주 조금만 다가가요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const pairs = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17]];
          const [x, y, d] = pick(pairs);
          return {
            type: 'blank',
            q: `<code>Vector3 a = new Vector3(0, 0, 0); Vector3 b = new Vector3(${x}, ${y}, 0); float dist = Vector3.Distance(a, b);</code>일 때, <code>dist</code>의 값은? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(d)], placeholder: '숫자',
            why: `두 점 사이의 거리는 √(${x}² + ${y}²) = √${x * x + y * y} = ${d}예요.`,
            hint: '피타고라스 정리를 떠올려보세요(가로² + 세로² = 거리²).'
          };
        },
        () => makeChoice(
          '벡터의 <code>normalized</code>가 뜻하는 것은?',
          '크기(길이)는 1로 만들고, 방향만 그대로 남긴 벡터', ['벡터의 모든 값을 0으로 만든 벡터', '벡터의 크기를 2배로 늘린 벡터', '벡터의 x, y, z를 반올림한 벡터'],
          'normalized는 방향은 그대로 유지하면서 크기만 1로 만들어줘요.',
          '"정규화하다(normalize)"라는 이름처럼, 크기를 표준(1)으로 맞춰요.'
        ),
        () => {
          const t = pick([0, 1]);
          return {
            type: 'blank',
            q: `<code>Vector3.Lerp(a, b, ${t}f)</code>의 결과는 <code>a</code>와 <code>b</code> 중 무엇과 같을까요? (a 또는 b)`,
            prefix: '', suffix: '', accept: [t === 0 ? 'a' : 'b'], placeholder: 'a / b',
            why: t === 0
              ? 'Lerp의 세 번째 인자(비율)가 0이면 시작값 a 그대로예요.'
              : 'Lerp의 세 번째 인자(비율)가 1이면 끝값 b 그대로예요.',
            hint: 'Lerp의 비율이 0이면 시작점, 1이면 끝점이에요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>Vector3 playerPos</code>와 <code>Vector3 enemyPos</code> 사이의 거리를 구해 <code>dist</code>라는 변수에 저장하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'float dist = Vector3.Distance(playerPos, enemyPos);',
          accept: ['float dist = Vector3.Distance(playerPos, enemyPos);'],
          why: 'Vector3.Distance(a, b)는 두 위치 사이의 거리를 계산해서 돌려줘요.',
          hint: 'float dist = Vector3.Distance(playerPos, enemyPos); 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const pairs = [[3, 4, 5], [6, 8, 10], [5, 12, 13]];
        const [x, y, d] = pick(pairs);
        const range = randInt(d + 1, d + 5);
        return {
          type: 'blank',
          q: `<code>float dist = Vector3.Distance(playerPos, enemyPos);</code>의 결과가 ${d}이고, <code>if (dist < ${range}f) { Debug.Log("적이 가까이 있음"); }</code>이 있을 때, 이 로그가 출력될까요? (예/아니오)`,
          prefix: '', suffix: '', accept: ['예'], placeholder: '예 / 아니오',
          why: `dist(${d})가 조건의 값(${range})보다 작으므로 if 조건이 참이 되어 로그가 출력돼요.`,
          hint: 'dist와 조건의 숫자를 비교해보세요.'
        };
      }
    },
    {
      id: 'raycastBasics',
      title: 'Raycast로 감지하기',
      ready: true,
      summary: '보이지 않는 광선을 쏴서 그 경로에 있는 오브젝트를 감지하는 Raycast를 배워요.',
      goals: ['Physics.Raycast 기본 사용법', 'RaycastHit으로 정보 얻기', '거리 제한 두기'],
      blocks: [
        {
          h: '광선을 쏴서 감지하기: Physics.Raycast',
          html: `<p><code>Physics.Raycast(시작 위치, 방향, out 결과, 최대 거리)</code>는 그 방향으로 최대 거리까지 보이지 않는 광선을 쏴서, 처음 부딪힌 Collider가 있으면 <code>true</code>를 돌려주고 <code>hit</code>에 그 정보를 담아줘요.</p>`,
          code: {
            label: 'raycast.cs',
            lang: 'csharp',
            src: `RaycastHit hit;
if (Physics.Raycast(transform.position, transform.forward, out hit, 10f))
{
    Debug.Log("맞은 대상: " + hit.collider.gameObject.name);
}`
          }
        },
        {
          h: '활용 예: 바닥 확인하기',
          html: `<p>방향을 아래(<code>Vector3.down</code>)로 지정하면, 발밑에 바닥이 있는지 확인하는 용도로도 쓸 수 있어요.</p>`,
          code: {
            label: 'ground_check.cs',
            lang: 'csharp',
            src: `if (Physics.Raycast(transform.position, Vector3.down, out hit, 1.1f))
{
    Debug.Log("바닥이 가까이 있음");
}`
          },
          after: `<div class="note"><b>정리</b> — Raycast는 눈에 보이지 않지만, 게임에서 "이 방향에 뭐가 있는지" 알아내는 아주 자주 쓰이는 방법이에요(총 쏘기, 바닥 확인, 시야 확인 등).</div>`
        }
      ],
      quizGenerators: [
        () => {
          const willHit = Math.random() < 0.5;
          return {
            type: 'blank',
            q: `<code>if (Physics.Raycast(transform.position, transform.forward, out hit, 10f)) { Debug.Log("맞음"); }</code>일 때, 광선이 10f 거리 안에서 ${willHit ? '무언가에 부딪혔다면' : '아무것도 맞히지 못했다면'}, "맞음"이 출력될까요? (예/아니오)`,
            prefix: '', suffix: '', accept: [willHit ? '예' : '아니오'], placeholder: '예 / 아니오',
            why: willHit
              ? 'Raycast가 무언가에 부딪히면 true를 돌려주므로 if 조건이 참이 되어 로그가 출력돼요.'
              : '아무것도 맞히지 못하면 Raycast는 false를 돌려주므로 로그가 출력되지 않아요.',
            hint: 'Physics.Raycast는 무언가에 부딪히면 true, 아니면 false를 돌려줘요.'
          };
        },
        () => makeChoice(
          '<code>Physics.Raycast</code>의 역할로 알맞은 것은?',
          '지정한 위치에서 방향으로 보이지 않는 광선을 쏴서, 그 경로에서 처음 부딪히는 오브젝트를 감지한다', ['오브젝트를 그 방향으로 실제로 이동시킨다', '화면에 실제 레이저 그래픽을 그린다', '두 오브젝트 사이의 거리만 계산한다'],
          'Raycast는 실제로 보이지는 않지만, 그 경로에 있는 첫 번째 Collider를 감지하는 데 써요.',
          '"광선(ray)을 쏘다(cast)"라는 이름 그대로예요.'
        ),
        () => makeChoice(
          '<code>Physics.Raycast(..., out hit, ...)</code>에서 <code>hit</code>(RaycastHit)에 담기는 정보로 알맞은 것은?',
          '광선이 부딪힌 대상의 콜라이더, 위치 등의 정보', ['광선을 쏜 오브젝트의 이름만', '광선의 색상 정보', '게임이 시작된 후 지난 시간'],
          'RaycastHit에는 부딪힌 Collider, 부딪힌 지점의 위치 등 다양한 정보가 담겨요.',
          '"맞았을 때(hit)"의 세부 정보를 담는 그릇이라고 생각하면 돼요.'
        ),
        () => ({
          type: 'code',
          q: '이 오브젝트의 정면 방향(<code>transform.forward</code>)으로 최대 <code>10f</code> 거리까지 Raycast를 쏴서, 맞았다면 <code>hit.collider.gameObject.name</code>을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'if (Physics.Raycast(transform.position, transform.forward, out hit, 10f))\n{\n    Debug.Log(hit.collider.gameObject.name);\n}',
          accept: ['if (Physics.Raycast(transform.position, transform.forward, out hit, 10f))\n{\n    Debug.Log(hit.collider.gameObject.name);\n}'],
          why: 'Physics.Raycast(시작, 방향, out hit, 최대거리)로 감지하고, 맞았다면 hit.collider로 정보를 꺼내요.',
          hint: 'if (Physics.Raycast(transform.position, transform.forward, out hit, 10f)) { } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const dist = randInt(3, 8);
        const wallDist = randInt(1, 15);
        const willHit = wallDist <= dist;
        return {
          type: 'blank',
          q: `<code>Physics.Raycast(transform.position, transform.forward, out hit, ${dist}f)</code>를 쏘는데, 정면 ${wallDist}만큼 떨어진 곳에 벽이 있어요. 이 Raycast는 벽을 감지할까요? (예/아니오)`,
          prefix: '', suffix: '', accept: [willHit ? '예' : '아니오'], placeholder: '예 / 아니오',
          why: willHit
            ? `벽까지의 거리(${wallDist})가 Raycast의 최대 거리(${dist})보다 작거나 같아서 감지돼요.`
            : `벽까지의 거리(${wallDist})가 Raycast의 최대 거리(${dist})보다 멀어서 감지되지 않아요.`,
          hint: 'Raycast는 지정한 최대 거리 안에 있는 것만 감지할 수 있어요.'
        };
      }
    },
    {
      id: 'scriptableObjectBasics',
      title: 'ScriptableObject로 데이터 분리하기',
      ready: true,
      summary: '게임 오브젝트에 붙지 않고 데이터 자체를 에셋으로 저장할 수 있는 ScriptableObject를 배워요.',
      goals: ['MonoBehaviour 대신 ScriptableObject', '데이터 에셋으로 재사용하기', 'CreateAssetMenu로 에디터에서 생성'],
      blocks: [
        {
          h: '데이터 전용 클래스: ScriptableObject',
          html: `<p><code>ScriptableObject</code>는 <code>MonoBehaviour</code>와 달리 씬의 게임 오브젝트에 붙는 게 아니라, 프로젝트 안에 "데이터 파일(에셋)"처럼 저장돼요. <code>[CreateAssetMenu]</code>를 붙이면 에디터 메뉴에서 이 데이터를 새로 만들 수 있게 돼요.</p>`,
          code: {
            label: 'weapon_data.cs',
            lang: 'csharp',
            src: `[CreateAssetMenu(fileName = "NewWeapon", menuName = "Item/Weapon")]
public class WeaponData : ScriptableObject
{
    public string weaponName;
    public int damage;
}`
          }
        },
        {
          h: '여러 오브젝트가 같은 데이터 공유하기',
          html: `<p>여러 무기 오브젝트가 같은 <code>WeaponData</code> 에셋을 참조하게 만들 수 있어서, 수치 밸런스를 코드 수정 없이 데이터(에셋)로만 관리할 수 있게 돼요.</p>`,
          code: {
            label: 'weapon.cs',
            lang: 'csharp',
            src: `public class Weapon : MonoBehaviour
{
    public WeaponData data;

    void Attack()
    {
        Debug.Log(data.weaponName + "(으)로 " + data.damage + " 데미지!");
    }
}`
          },
          after: `<div class="note"><b>정리</b> — 기획자나 디자이너가 코드를 건드리지 않고도 인스펙터에서 데이터 에셋의 수치만 바꿔가며 게임 밸런스를 조정할 수 있게 돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const name = pick(['불의 검', '얼음 도끼', '번개 창']);
          const damage = randInt(10, 50);
          return {
            type: 'blank',
            q: `<code>data.weaponName = "${name}"; data.damage = ${damage};</code>이고 <code>Attack()</code>이 <code>Debug.Log(data.weaponName + "(으)로 " + data.damage + " 데미지!");</code>를 실행할 때, 출력은? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`${name}(으)로 ${damage} 데미지!`], placeholder: '출력 결과',
            why: `data의 weaponName과 damage 값을 그대로 이어붙여서 "${name}(으)로 ${damage} 데미지!"가 출력돼요.`,
            hint: '문자열 + 변수 + 문자열을 순서대로 이어붙여 보세요.'
          };
        },
        () => makeChoice(
          '<code>ScriptableObject</code>와 <code>MonoBehaviour</code>의 차이로 알맞은 것은?',
          'ScriptableObject는 게임 오브젝트에 붙지 않고 데이터 에셋으로 저장된다', ['ScriptableObject는 Update()를 더 빠르게 실행한다', 'ScriptableObject는 물리 충돌을 감지할 수 있다', '둘은 완전히 같은 기능을 한다'],
          'ScriptableObject는 씬에 배치되는 오브젝트가 아니라, 프로젝트 안에 데이터로 저장되는 에셋이에요.',
          'MonoBehaviour는 GameObject에 "붙여야" 하지만, ScriptableObject는 그렇지 않아요.'
        ),
        () => makeChoice(
          '<code>[CreateAssetMenu]</code> 어트리뷰트의 역할은?',
          '에디터 메뉴에서 이 ScriptableObject 데이터를 새 에셋으로 만들 수 있게 해준다', ['이 클래스를 자동으로 씬에 배치한다', '이 클래스의 함수들을 매 프레임 실행되게 한다', '이 데이터를 삭제할 수 없게 만든다'],
          '[CreateAssetMenu]를 붙이면 Unity 에디터의 우클릭 메뉴 등에서 이 데이터 타입의 새 에셋을 만들 수 있어요.',
          '"에셋 생성 메뉴를 만들어라"는 뜻 그대로예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>weaponName</code>(string)과 <code>damage</code>(int)를 가진, <code>ScriptableObject</code>를 상속받는 <code>WeaponData</code> 클래스를 작성하세요. (CreateAssetMenu 없이 클래스 정의만)',
          starter: '',
          rows: 4,
          placeholder: 'public class WeaponData : ScriptableObject\n{\n    public string weaponName;\n    public int damage;\n}',
          accept: ['public class WeaponData : ScriptableObject\n{\n    public string weaponName;\n    public int damage;\n}'],
          why: '<code>class 이름 : ScriptableObject</code> 형태로 데이터 전용 클래스를 만들어요.',
          hint: 'public class WeaponData : ScriptableObject { } 안에 두 필드를 선언하세요.'
        }),
      ],
      boss: () => {
        const dmg1 = randInt(10, 30);
        const dmg2 = randInt(10, 30);
        return {
          type: 'blank',
          q: `<code>WeaponData swordData</code>의 <code>damage</code>가 ${dmg1}이고, 서로 다른 두 <code>Weapon</code> 오브젝트가 똑같이 이 <code>swordData</code>를 참조하고 있어요. 한 오브젝트가 <code>swordData.damage</code>를 ${dmg2}로 바꾸면, 다른 오브젝트가 읽는 <code>data.damage</code>는 얼마일까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(dmg2)], placeholder: '숫자',
          why: `두 오브젝트가 같은 WeaponData 에셋(swordData)을 참조하고 있으므로, 하나에서 바꾼 값이 다른 쪽에도 그대로 반영되어 ${dmg2}가 돼요.`,
          hint: '같은 ScriptableObject 에셋을 참조하는 오브젝트들은 데이터를 공유해요.'
        };
      }
    },
    {
      id: 'uiBasics',
      title: 'UI 기초: Canvas와 Button',
      ready: true,
      summary: '화면에 버튼이나 이미지를 표시하는 UI의 기본 구조인 Canvas와, 클릭 이벤트를 처리하는 Button을 배워요.',
      goals: ['Canvas가 UI의 뿌리인 이유', 'Button의 onClick 이벤트', '코드로 클릭에 함수 연결하기'],
      blocks: [
        {
          h: '모든 UI는 Canvas 안에',
          html: `<p>Unity의 모든 UI 요소(버튼, 텍스트, 이미지 등)는 반드시 <code>Canvas</code>라는 특별한 오브젝트 안에 있어야 화면에 표시돼요. 버튼의 <b>onClick</b> 목록에 함수를 등록해두면, 버튼을 누를 때 그 함수가 실행돼요.</p>`,
          code: {
            label: 'menu_button.cs',
            lang: 'csharp',
            src: `public class MenuButton : MonoBehaviour
{
    public void OnStartClicked()
    {
        Debug.Log("게임 시작!");
    }
}`
          }
        },
        {
          h: '코드로 직접 클릭 이벤트 연결하기',
          html: `<p>인스펙터에서 드래그해서 연결하는 대신, 코드에서 <code>onClick.AddListener(함수)</code>로 직접 클릭 이벤트에 함수를 연결할 수도 있어요.</p>`,
          code: {
            label: 'add_listener.cs',
            lang: 'csharp',
            src: `public Button startButton;

void Start()
{
    startButton.onClick.AddListener(OnStartClicked);
}

void OnStartClicked()
{
    Debug.Log("게임 시작!");
}`
          },
          after: `<div class="note"><b>정리</b> — AddListener에 넘기는 함수 이름 뒤에는 괄호를 붙이지 않아요(<code>OnStartClicked</code>이지 <code>OnStartClicked()</code>가 아니에요). 괄호를 붙이면 그 함수를 "지금 당장 실행한 결과"를 넘기려는 것이 되어버려요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>Canvas</code>의 역할로 알맞은 것은?',
          '모든 UI 요소가 화면에 표시되려면 반드시 그 안에 있어야 하는 뿌리 오브젝트', ['게임의 물리 연산을 담당하는 오브젝트', '오디오를 재생하는 오브젝트', '카메라의 시야각을 정하는 오브젝트'],
          'Button, Text, Image 같은 UI 요소는 모두 Canvas 안에 있어야 화면에 나타나요.',
          '"캔버스(그림을 그리는 판)"라는 이름처럼, UI가 그려지는 바탕이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>startButton</code>(Button)의 클릭 이벤트에 <code>OnStartClicked</code> 함수를 코드로 연결하는 코드를 완성하세요.`,
          prefix: 'startButton.onClick.', suffix: '(OnStartClicked);', accept: ['AddListener'], placeholder: '메서드 이름',
          why: '<code>onClick.AddListener(함수)</code>로 클릭 시 실행될 함수를 코드에서 등록할 수 있어요.',
          hint: '"듣는 사람(listener)을 추가한다(add)"는 뜻의 이름이에요.'
        }),
        () => makeChoice(
          'Button의 <code>onClick</code> 이벤트가 발생하는 시점은?',
          '사용자가 그 버튼을 클릭했을 때', ['씬이 처음 로드될 때', '매 프레임마다', '게임 오브젝트가 파괴될 때'],
          'onClick은 사용자가 버튼을 실제로 클릭하는 순간에 발생하는 이벤트예요.',
          '"클릭했을 때(on click)"라는 이름 그대로예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>public Button startButton;</code>이 있을 때, <code>Start()</code> 안에서 이 버튼의 클릭 이벤트에 <code>OnStartClicked</code> 함수를 연결하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'void Start()\n{\n    startButton.onClick.AddListener(OnStartClicked);\n}',
          accept: ['void Start()\n{\n    startButton.onClick.AddListener(OnStartClicked);\n}'],
          why: 'Start() 안에서 onClick.AddListener(함수이름)으로 클릭 시 실행될 함수를 등록해요.',
          hint: 'void Start() { } 안에 startButton.onClick.AddListener(OnStartClicked);를 쓰세요.'
        }),
      ],
      boss: () => {
        const clicks = randInt(2, 5);
        return {
          type: 'blank',
          q: `<code>startButton.onClick.AddListener(OnStartClicked);</code>로 연결해두었고, <code>OnStartClicked</code>는 <code>Debug.Log("게임 시작!");</code>만 실행해요. 사용자가 이 버튼을 ${clicks}번 클릭하면, "게임 시작!"은 몇 번 출력될까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(clicks)], placeholder: '숫자',
          why: `클릭할 때마다 등록된 함수(OnStartClicked)가 한 번씩 실행되므로, ${clicks}번 클릭하면 ${clicks}번 출력돼요.`,
          hint: 'onClick 이벤트는 클릭할 때마다 매번 등록된 함수를 실행해요.'
        };
      }
    },
    {
      id: 'textDisplay',
      title: 'Text와 TextMeshPro로 화면에 정보 표시하기',
      ready: true,
      summary: '점수나 체력 같은 정보를 화면에 실시간으로 보여주는 TextMeshPro를 배워요.',
      goals: ['TextMeshProUGUI로 텍스트 다루기', '.text 프로퍼티로 내용 바꾸기', '숫자를 문자열에 이어붙이기'],
      blocks: [
        {
          h: '화면에 글자 표시하기: .text',
          html: `<p>화면의 텍스트 UI는 코드에서 <code>TextMeshProUGUI</code> 타입으로 다뤄요. <code>.text</code> 프로퍼티에 문자열을 대입하면 화면에 표시되는 글자가 바로 바뀌어요.</p>`,
          code: {
            label: 'score_text.cs',
            lang: 'csharp',
            src: `public TextMeshProUGUI scoreText;

void UpdateScoreDisplay(int score)
{
    scoreText.text = "점수: " + score;
}`
          }
        },
        {
          h: '시작할 때 미리 표시해두기',
          html: `<p>게임이 시작될 때부터 정보를 보여주고 싶다면, <code>Start()</code>에서 미리 <code>.text</code>를 설정해둬요.</p>`,
          code: {
            label: 'health_text.cs',
            lang: 'csharp',
            src: `public TextMeshProUGUI healthText;
public int health = 100;

void Start()
{
    healthText.text = "체력: " + health;
}`
          },
          after: `<div class="note"><b>정리</b> — <code>"체력: " + health</code>처럼 문자열과 숫자를 <code>+</code>로 이어붙이면, 숫자가 자동으로 문자열로 바뀌어 합쳐져요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const score = randInt(0, 999);
          return {
            type: 'blank',
            q: `<code>void UpdateScoreDisplay(int score) { scoreText.text = "점수: " + score; }</code>이고 <code>UpdateScoreDisplay(${score})</code>를 실행했을 때, <code>scoreText.text</code>의 값은? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`점수: ${score}`], placeholder: '텍스트 내용',
            why: `"점수: "와 ${score}를 이어붙여서 "점수: ${score}"가 scoreText.text에 대입돼요.`,
            hint: '문자열 "점수: " 뒤에 score 값을 그대로 이어붙여 보세요.'
          };
        },
        () => makeChoice(
          '<code>TextMeshProUGUI</code>의 <code>.text</code> 프로퍼티의 역할은?',
          '화면에 표시되는 글자 내용을 정한다', ['글자의 색상만 정한다', '글자가 표시될 위치만 정한다', '텍스트 오브젝트를 화면에서 숨긴다'],
          '.text에 문자열을 대입하면, 화면에 보이는 실제 글자 내용이 그 값으로 바뀌어요.',
          '눈에 보이는 "내용" 자체를 다루는 프로퍼티예요.'
        ),
        () => makeChoice(
          '기본 Text 컴포넌트 대신 TextMeshPro를 많이 쓰는 이유로 알맞은 것은?',
          '더 선명한 글자와 다양한 스타일링 기능을 제공하기 때문', ['TextMeshPro가 유일하게 문자열을 지원하기 때문', 'TextMeshPro만 인스펙터에서 수정 가능하기 때문', '기본 Text는 숫자를 표시할 수 없기 때문'],
          'TextMeshPro는 기본 Text보다 훨씬 선명하고, 그림자·외곽선 같은 다양한 스타일 기능을 제공해요.',
          '"더 나은 글자 렌더링"이 핵심 이유예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>public TextMeshProUGUI healthText;</code>와 <code>public int health = 100;</code>이 있을 때, healthText에 <code>"체력: 100"</code>이 표시되도록 대입하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'healthText.text = "체력: " + health;',
          accept: ['healthText.text = "체력: " + health;'],
          why: '문자열 "체력: "과 health 값을 +로 이어붙여 .text에 대입해요.',
          hint: 'healthText.text = "체력: " + health; 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const score = randInt(0, 500);
        const bonus = randInt(10, 50);
        return {
          type: 'blank',
          q: `<code>int score = ${score};</code>이고, <code>score += ${bonus};</code>를 실행한 뒤 <code>scoreText.text = "점수: " + score;</code>를 실행하면, <code>scoreText.text</code>의 값은? (그대로 입력)`,
          prefix: '', suffix: '', accept: [`점수: ${score + bonus}`], placeholder: '텍스트 내용',
          why: `score는 ${score} + ${bonus} = ${score + bonus}가 되고, 그 값이 "점수: " 뒤에 이어붙어요.`,
          hint: '먼저 score의 최종 값을 계산한 다음, 문자열에 이어붙여 보세요.'
        };
      }
    },
    {
      id: 'audioBasics',
      title: 'AudioSource로 소리 재생하기',
      ready: true,
      summary: '효과음이나 배경음악을 재생하는 AudioSource 컴포넌트의 기본 사용법을 배워요.',
      goals: ['AudioSource와 AudioClip', 'Play()로 재생하기', 'PlayOneShot으로 겹쳐 재생하기'],
      blocks: [
        {
          h: '소리 재생하기: Play()',
          html: `<p><code>AudioSource</code>에 미리 지정해둔 클립을 <code>Play()</code>로 재생할 수 있어요. 이미 재생 중일 때 다시 Play()를 부르면 처음부터 다시 재생돼요.</p>`,
          code: {
            label: 'audio_play.cs',
            lang: 'csharp',
            src: `public AudioSource audioSource;

void Start()
{
    audioSource.Play();
}`
          }
        },
        {
          h: '효과음은 겹쳐서: PlayOneShot',
          html: `<p><code>PlayOneShot(클립)</code>은 지금 재생 중인 소리를 끊지 않고, 그 위에 겹쳐서(동시에) 새 소리를 재생해요. 점프음, 타격음처럼 짧고 빠르게 반복될 수 있는 효과음에 적합해요.</p>`,
          code: {
            label: 'play_one_shot.cs',
            lang: 'csharp',
            src: `public AudioSource audioSource;
public AudioClip jumpSound;

void Jump()
{
    audioSource.PlayOneShot(jumpSound);
}`
          },
          after: `<div class="note"><b>정리</b> — 배경음악처럼 하나만 계속 재생할 소리는 <code>Play()</code>, 여러 번 겹쳐 날 수 있는 효과음은 <code>PlayOneShot()</code>이 알맞아요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>PlayOneShot(클립)</code>을 쓰는 주된 이유는?',
          '지금 재생 중인 소리를 끊지 않고, 다른 소리와 겹쳐서(동시에) 재생할 수 있어서', ['소리를 무한 반복 재생하기 위해', '소리의 음량을 자동으로 조절하기 위해', '소리 파일을 압축하기 위해'],
          'PlayOneShot은 기존 재생을 멈추지 않고 새 소리를 겹쳐서 재생해요.',
          '"한 번(one shot)" 겹쳐서 쏘아 재생한다는 이름이에요.'
        ),
        () => ({
          type: 'blank',
          q: `점프할 때마다 <code>jumpSound</code>를 겹쳐서 재생하는 코드를 완성하세요.`,
          prefix: 'audioSource.', suffix: '(jumpSound);', accept: ['PlayOneShot'], placeholder: '메서드 이름',
          why: '<code>PlayOneShot(클립)</code>은 기존 소리를 끊지 않고 겹쳐서 재생해요.',
          hint: '"한 번 쏘아 재생하다"라는 뜻의 메서드예요.'
        }),
        () => makeChoice(
          '<code>Play()</code>와 <code>PlayOneShot()</code>의 차이로 알맞은 것은?',
          'Play()는 AudioSource에 지정된 클립을 재생하며 이미 재생 중이면 처음부터 다시 시작하지만, PlayOneShot()은 다른 소리와 겹쳐 재생할 수 있다', ['Play()는 효과음 전용, PlayOneShot()은 배경음악 전용이다', '둘은 완전히 같은 기능이다', 'PlayOneShot()은 AudioSource 없이도 쓸 수 있다'],
          'Play()는 하나의 재생 슬롯을 재시작하는 느낌이고, PlayOneShot()은 여러 소리를 겹쳐서 낼 수 있어요.',
          '배경음악과 효과음이 왜 다른 방식으로 재생되는지 생각해보세요.'
        ),
        () => ({
          type: 'code',
          q: '<code>public AudioSource audioSource;</code>와 <code>public AudioClip hitSound;</code>가 있을 때, 타격 시 <code>hitSound</code>를 겹쳐서 재생하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'audioSource.PlayOneShot(hitSound);',
          accept: ['audioSource.PlayOneShot(hitSound);'],
          why: 'PlayOneShot(클립)으로 기존 소리를 끊지 않고 새 소리를 겹쳐 재생해요.',
          hint: 'audioSource.PlayOneShot(hitSound); 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const jumps = randInt(2, 6);
        return {
          type: 'blank',
          q: `<code>void Jump() { audioSource.PlayOneShot(jumpSound); }</code>인 상태로, 짧은 시간 안에 <code>Jump()</code>가 ${jumps}번 연속 호출되면, jumpSound는 서로 겹쳐서 총 몇 번 재생될까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(jumps)], placeholder: '숫자',
          why: `PlayOneShot은 매번 호출될 때마다 소리를 겹쳐서 재생하므로, ${jumps}번 호출하면 ${jumps}번 모두 재생돼요.`,
          hint: 'PlayOneShot은 이전 소리를 끊지 않으므로, 호출 횟수만큼 소리가 겹쳐서 재생돼요.'
        };
      }
    },
    {
      id: 'sceneManagement',
      title: 'SceneManager로 씬 전환하기',
      ready: true,
      summary: '메인 메뉴에서 게임 화면으로, 혹은 다음 스테이지로 넘어가는 씬 전환을 배워요.',
      goals: ['SceneManager.LoadScene', '씬 이름으로 이동하기', '현재 씬 다시 불러오기(재시작)'],
      blocks: [
        {
          h: '다른 씬으로 이동하기',
          html: `<p><code>SceneManager.LoadScene("씬이름")</code>은 그 이름의 씬으로 완전히 전환해요. 현재 씬에 있던 오브젝트들은 (특별히 유지 설정을 하지 않는 한) 사라지고, 새 씬이 로드돼요.</p>`,
          code: {
            label: 'scene_change.cs',
            lang: 'csharp',
            src: `using UnityEngine.SceneManagement;

public void GoToGameScene()
{
    SceneManager.LoadScene("GameScene");
}`
          }
        },
        {
          h: '지금 있는 씬 재시작하기',
          html: `<p><code>SceneManager.GetActiveScene()</code>으로 지금 씬의 정보를 얻어서, 같은 이름으로 다시 <code>LoadScene</code>하면 "레벨 재시작" 효과를 만들 수 있어요.</p>`,
          code: {
            label: 'restart.cs',
            lang: 'csharp',
            src: `void RestartLevel()
{
    Scene currentScene = SceneManager.GetActiveScene();
    SceneManager.LoadScene(currentScene.name);
}`
          },
          after: `<div class="note"><b>정리</b> — SceneManager 관련 기능을 쓰려면 파일 맨 위에 <code>using UnityEngine.SceneManagement;</code>를 추가해야 해요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>SceneManager.LoadScene("GameScene")</code>을 실행하면 벌어지는 일은?',
          '"GameScene"이라는 이름의 씬으로 전환된다', ['GameScene이라는 오브젝트가 현재 씬에 새로 생성된다', '게임이 일시정지된다', '현재 씬의 이름이 GameScene으로 바뀐다'],
          'LoadScene은 지정한 이름의 씬 자체로 전환하는 기능이에요.',
          '오브젝트가 아니라 "씬 전체"가 바뀌는 거예요.'
        ),
        () => ({
          type: 'blank',
          q: `SceneManager 관련 기능을 쓰기 위해 파일 맨 위에 추가해야 하는 코드를 완성하세요.`,
          prefix: 'using UnityEngine.', suffix: ';', accept: ['SceneManagement'], placeholder: '네임스페이스',
          why: '<code>using UnityEngine.SceneManagement;</code>를 추가해야 SceneManager를 쓸 수 있어요.',
          hint: '"씬 관리(scene management)"라는 뜻의 이름이에요.'
        }),
        () => makeChoice(
          '현재 플레이 중인 스테이지를 처음부터 다시 시작(재시작)하고 싶을 때 쓸 수 있는 방법은?',
          '<code>SceneManager.GetActiveScene()</code>으로 얻은 이름으로 <code>LoadScene</code>을 다시 호출한다', ['transform.position을 (0,0,0)으로 되돌린다', 'Debug.Log로 콘솔을 초기화한다', 'Destroy(gameObject)를 호출한다'],
          '지금 씬의 이름을 얻어서 같은 이름으로 다시 LoadScene하면, 씬 전체가 처음 상태로 다시 로드돼요.',
          '"같은 씬을 다시 불러오기"가 재시작의 핵심이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>"GameScene"</code>이라는 이름의 씬으로 전환하는 <code>GoToGameScene</code> 함수를 작성하세요.',
          starter: '',
          placeholder: 'public void GoToGameScene() { SceneManager.LoadScene("GameScene"); }',
          accept: ['public void GoToGameScene() { SceneManager.LoadScene("GameScene"); }'],
          why: 'SceneManager.LoadScene("씬이름")으로 그 씬으로 전환해요.',
          hint: 'public void GoToGameScene() { SceneManager.LoadScene("GameScene"); } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const sceneName = pick(['Level1', 'MainMenu', 'BossStage']);
        return {
          type: 'blank',
          q: `<code>void RestartLevel() { Scene currentScene = SceneManager.GetActiveScene(); SceneManager.LoadScene(currentScene.name); }</code>를 <code>"${sceneName}"</code> 씬에서 실행하면, 어떤 씬으로 전환될까요? (그대로 입력)`,
          prefix: '', suffix: '', accept: [sceneName], placeholder: '씬 이름',
          why: `GetActiveScene()이 현재 씬(${sceneName})의 정보를 가져오고, 그 이름으로 다시 LoadScene하므로 결국 같은 "${sceneName}" 씬이 다시 로드돼요.`,
          hint: '현재 씬의 이름을 그대로 다시 불러오는 코드예요.'
        };
      }
    },
    {
      id: 'playerPrefsBasics',
      title: 'PlayerPrefs로 간단한 데이터 저장하기',
      ready: true,
      summary: '최고 점수나 설정값처럼 게임을 껐다 켜도 남아있어야 하는 간단한 데이터를 저장하는 PlayerPrefs를 배워요.',
      goals: ['SetInt/GetInt로 저장하고 불러오기', '기본값 지정하기', '언제 PlayerPrefs를 쓰는지'],
      blocks: [
        {
          h: '저장하기: SetInt와 Save',
          html: `<p><code>PlayerPrefs.SetInt("키", 값)</code>으로 정수를 저장하고, <code>PlayerPrefs.Save()</code>로 디스크에 확실히 기록해요. 이렇게 저장한 값은 게임을 껐다 켜도 남아있어요.</p>`,
          code: {
            label: 'player_prefs_save.cs',
            lang: 'csharp',
            src: `PlayerPrefs.SetInt("HighScore", 100);
PlayerPrefs.Save();`
          }
        },
        {
          h: '불러오기: GetInt(키, 기본값)',
          html: `<p><code>PlayerPrefs.GetInt("키", 기본값)</code>으로 저장해둔 값을 불러와요. 두 번째 인자는 "그 키로 저장된 값이 없을 때 대신 쓸 기본값"이에요.</p>`,
          code: {
            label: 'player_prefs_load.cs',
            lang: 'csharp',
            src: `int highScore = PlayerPrefs.GetInt("HighScore", 0);
Debug.Log(highScore);`,
            out: `100`
          },
          after: `<div class="note"><b>정리</b> — PlayerPrefs는 최고 점수, 소리 크기 설정처럼 간단한 값을 저장하기엔 편하지만, 게임 진행 상황처럼 복잡한 데이터를 저장하기엔 적합하지 않아요(그럴 땐 파일이나 JSON을 써요).</div>`
        }
      ],
      quizGenerators: [
        () => {
          const wasSaved = Math.random() < 0.5;
          const savedValue = randInt(50, 500);
          const defaultValue = 0;
          return {
            type: 'blank',
            q: `"HighScore"라는 키로 ${wasSaved ? `이전에 ${savedValue}가 저장되어 있어요` : '아직 한 번도 저장한 적이 없어요'}. <code>PlayerPrefs.GetInt("HighScore", ${defaultValue})</code>의 결과는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [wasSaved ? String(savedValue) : String(defaultValue)], placeholder: '숫자',
            why: wasSaved
              ? `이미 저장된 값 ${savedValue}가 있으므로 그 값을 그대로 돌려줘요.`
              : `저장된 값이 없으므로 두 번째 인자인 기본값 ${defaultValue}가 쓰여요.`,
            hint: 'GetInt의 두 번째 인자는 "저장된 값이 없을 때"만 쓰여요.'
          };
        },
        () => makeChoice(
          'PlayerPrefs를 쓰기에 적합한 경우는?',
          '최고 점수, 소리 설정처럼 간단한 값을 게임을 꺼도 저장해두고 싶을 때', ['수백 개의 몬스터 위치 정보를 저장할 때', '실시간으로 계속 변하는 물리 연산 값을 저장할 때', '네트워크로 다른 플레이어에게 데이터를 보낼 때'],
          'PlayerPrefs는 최고 점수나 설정값처럼 작고 간단한 데이터를 저장하기에 적합해요.',
          '"간단한 값 하나"를 오래 보관하고 싶을 때 쓰는 도구예요.'
        ),
        () => makeChoice(
          '<code>PlayerPrefs.GetInt("HighScore", 0)</code>에서 두 번째 인자 <code>0</code>의 역할은?',
          '"HighScore" 키로 저장된 값이 없을 때 대신 쓸 기본값', ['항상 0으로 값을 초기화하는 명령', '저장할 값의 최댓값 제한', '데이터를 저장할 슬롯 번호'],
          '두 번째 인자는 저장된 값이 없을 때만 쓰이는 기본값이에요.',
          '값이 "있을 때"는 이 인자가 전혀 쓰이지 않아요.'
        ),
        () => ({
          type: 'code',
          q: '"HighScore"라는 키에 정수 <code>100</code>을 저장하고, 디스크에 기록하는 코드를 두 줄로 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: 'PlayerPrefs.SetInt("HighScore", 100);\nPlayerPrefs.Save();',
          accept: ['PlayerPrefs.SetInt("HighScore", 100);\nPlayerPrefs.Save();'],
          why: 'SetInt로 값을 저장하고, Save()로 디스크에 확실히 기록해요.',
          hint: 'PlayerPrefs.SetInt("HighScore", 100); 다음 줄에 PlayerPrefs.Save();를 쓰세요.'
        }),
      ],
      boss: () => {
        const isFirstRun = Math.random() < 0.5;
        const prevScore = randInt(100, 999);
        return {
          type: 'blank',
          q: `게임을 ${isFirstRun ? '처음 설치해서 실행했어요(HighScore를 저장한 적 없음)' : `실행 중인데, 예전에 HighScore를 ${prevScore}로 저장해뒀어요`}. <code>int highScore = PlayerPrefs.GetInt("HighScore", 0);</code>를 실행하면 <code>highScore</code>는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [isFirstRun ? '0' : String(prevScore)], placeholder: '숫자',
          why: isFirstRun
            ? '저장된 값이 없으므로 기본값 0이 쓰여요.'
            : `이미 저장해둔 값 ${prevScore}가 그대로 불러와져요.`,
          hint: '저장된 적이 있는지 없는지에 따라 결과가 달라져요.'
        };
      }
    },
    {
      id: 'propertiesCSharp',
      title: 'C# 프로퍼티: get과 set',
      ready: true,
      summary: '변수처럼 쓰지만 접근할 때 로직을 실행할 수 있는 C# 프로퍼티를 배워요.',
      goals: ['{ get; set; } 자동 프로퍼티', '커스텀 get/set으로 값 검증하기', 'value 키워드'],
      blocks: [
        {
          h: '변수처럼 편하게: 자동 프로퍼티',
          html: `<p><code>{ get; set; }</code>을 붙이면 필드처럼 간단하게 읽고 쓸 수 있는 프로퍼티가 돼요. 겉보기엔 변수 같지만, 실제로는 get/set 메서드가 자동으로 만들어진 거예요.</p>`,
          code: {
            label: 'auto_property.cs',
            lang: 'csharp',
            src: `public class Player
{
    public int Health { get; set; } = 100;
}

Player p = new Player();
p.Health = 80;
Debug.Log(p.Health);`,
            out: `80`
          }
        },
        {
          h: '값을 검증하는 커스텀 프로퍼티',
          html: `<p>set 블록 안에서 대입되는 값은 <code>value</code>라는 이름으로 자동으로 가리켜져요. 이걸 이용해서 잘못된 값이 들어오지 않게 검증할 수 있어요.</p>`,
          code: {
            label: 'custom_property.cs',
            lang: 'csharp',
            src: `public class Player
{
    private int health;
    public int Health
    {
        get { return health; }
        set { health = value < 0 ? 0 : value; }
    }
}

Player p = new Player();
p.Health = -20;
Debug.Log(p.Health);`,
            out: `0`
          },
          after: `<div class="note"><b>정리</b> — 밖에서 값을 못 바꾸게 하고 읽기만 허용하고 싶다면, set을 아예 생략하거나(<code>{ get; }</code>) <code>private set</code>으로 제한할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const value = randInt(0, 200);
          return {
            type: 'blank',
            q: `<code>public int Health { get; set; } = 100;</code>이고 <code>p.Health = ${value};</code>를 실행한 뒤 <code>Debug.Log(p.Health);</code>를 하면? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(value)], placeholder: '숫자',
            why: `자동 프로퍼티는 대입한 값을 그대로 저장하므로, ${value}가 그대로 출력돼요.`,
            hint: '자동 프로퍼티는 검증 없이 대입한 값을 그대로 담아요.'
          };
        },
        () => makeChoice(
          'set 블록 안에서 대입되는 값을 자동으로 가리키는 키워드는?',
          '<code>value</code>', ['<code>this</code>', '<code>self</code>', '<code>field</code>'],
          '<code>set { health = value; }</code>에서 value는 프로퍼티에 대입되는 값을 가리켜요.',
          '"값(value)"이라는 이름 그대로예요.'
        ),
        () => {
          const input = pick([-30, -5, 5, 30]);
          const result = input < 0 ? 0 : input;
          return {
            type: 'blank',
            q: `<code>set { health = value < 0 ? 0 : value; }</code>일 때, <code>p.Health = ${input};</code>를 실행한 뒤 <code>p.Health</code>는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
            why: input < 0
              ? `${input}는 음수이므로 setter가 0으로 바꿔 저장해요.`
              : `${input}는 0 이상이므로 그대로 저장돼요.`,
            hint: '삼항 연산자가 음수인지 확인해서 0으로 바꿔줘요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>int</code> 타입의 자동 프로퍼티 <code>Score</code>를, 초기값 <code>0</code>으로 선언하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'public int Score { get; set; } = 0;',
          accept: ['public int Score { get; set; } = 0;'],
          why: '<code>{ get; set; }</code>은 필드처럼 간단히 읽고 쓸 수 있는 자동 프로퍼티를 만들어요.',
          hint: 'public int Score { get; set; } = 0; 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const input = pick([-50, -10, 10, 50, 90]);
        const result = input < 0 ? 0 : input > 100 ? 100 : input;
        return {
          type: 'blank',
          q: `<code>set { health = value < 0 ? 0 : (value > 100 ? 100 : value); }</code>일 때, <code>p.Health = ${input};</code>를 실행한 뒤 <code>p.Health</code>는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(result)], placeholder: '숫자',
          why: input < 0
            ? `${input}는 0보다 작으므로 0으로 제한돼요.`
            : input > 100 ? `${input}는 100보다 크므로 100으로 제한돼요.` : `${input}는 0~100 사이이므로 그대로 저장돼요.`,
          hint: '이 setter는 값을 0에서 100 사이로 제한해요.'
        };
      }
    },
    {
      id: 'interfacesCSharp',
      title: '인터페이스로 다형성 활용하기',
      ready: true,
      summary: '서로 다른 클래스가 같은 방식으로 다뤄질 수 있게 해주는 인터페이스를 배워요.',
      goals: ['interface 정의와 구현', '다형성: 인터페이스 타입으로 여러 클래스 다루기', '왜 인터페이스가 유용한지'],
      blocks: [
        {
          h: '약속을 정의하는 interface',
          html: `<p><code>interface</code>는 "이 기능을 구현하는 클래스는 반드시 이 메서드를 가져야 한다"는 약속이에요. 실제 구현은 그 인터페이스를 구현하는 클래스가 각자 만들어요.</p>`,
          code: {
            label: 'idamageable.cs',
            lang: 'csharp',
            src: `public interface IDamageable
{
    void TakeDamage(int amount);
}

public class Enemy : IDamageable
{
    public int health = 100;

    public void TakeDamage(int amount)
    {
        health -= amount;
        Debug.Log("남은 체력: " + health);
    }
}`
          }
        },
        {
          h: '서로 다른 클래스를 같은 방식으로: 다형성',
          html: `<p><code>IDamageable</code> 타입으로 매개변수를 받으면, 그게 <code>Enemy</code>든 <code>Barrel</code>이든 상관없이 <code>TakeDamage</code>를 호출할 수 있어요. 새로운 종류를 추가해도 이 함수는 고칠 필요가 없어요.</p>`,
          code: {
            label: 'polymorphism.cs',
            lang: 'csharp',
            src: `public class Barrel : IDamageable
{
    public void TakeDamage(int amount)
    {
        Debug.Log("통이 부서짐!");
    }
}

void Attack(IDamageable target)
{
    target.TakeDamage(10);
}

Attack(new Enemy());
Attack(new Barrel());`,
            out: `남은 체력: 90\n통이 부서짐!`
          },
          after: `<div class="note"><b>정리</b> — Attack 함수는 target이 정확히 어떤 클래스인지 몰라도, IDamageable을 구현했다는 것만 알면 동작해요. 이게 다형성이 주는 유연함이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const health = randInt(50, 100);
          const damage = randInt(10, 30);
          return {
            type: 'blank',
            q: `<code>public int health = ${health}; public void TakeDamage(int amount) { health -= amount; Debug.Log("남은 체력: " + health); }</code>일 때, <code>TakeDamage(${damage})</code>를 실행하면 출력은? (그대로 입력)`,
            prefix: '', suffix: '', accept: [`남은 체력: ${health - damage}`], placeholder: '출력 결과',
            why: `${health} - ${damage} = ${health - damage}이므로 "남은 체력: ${health - damage}"가 출력돼요.`,
            hint: 'health에서 amount를 뺀 값이 남은 체력이에요.'
          };
        },
        () => makeChoice(
          '인터페이스를 쓰는 주된 이유로 알맞은 것은?',
          '서로 다른 클래스들을 같은 방식(같은 타입)으로 다룰 수 있게 해준다(다형성)', ['클래스의 실행 속도를 빠르게 만든다', '클래스를 상속받지 못하게 막는다', '변수의 값을 자동으로 검증해준다'],
          '인터페이스를 구현한 서로 다른 클래스들을, 그 인터페이스 타입 하나로 통일해서 다룰 수 있어요.',
          '"약속을 지키는 모든 것을 같은 방식으로 대한다"는 게 핵심이에요.'
        ),
        () => makeChoice(
          'interface 안에 적는 메서드에 대한 설명으로 알맞은 것은?',
          '메서드의 이름과 매개변수만 정의하고, 실제 구현(본문)은 없다', ['항상 본문(구현)을 함께 작성해야 한다', 'private으로만 선언할 수 있다', '매개변수를 가질 수 없다'],
          'interface는 "이런 메서드가 있어야 한다"는 약속만 정의하고, 실제 구현은 구현하는 클래스가 채워요.',
          '인터페이스 자체는 "실행 가능한 코드"가 없어요.'
        ),
        () => ({
          type: 'code',
          q: '<code>IDamageable</code> 인터페이스를 구현하는 <code>Barrel</code> 클래스를 작성하세요. <code>TakeDamage(int amount)</code> 안에서 <code>Debug.Log("통이 부서짐!");</code>을 실행하세요.',
          starter: '',
          rows: 4,
          placeholder: 'public class Barrel : IDamageable\n{\n    public void TakeDamage(int amount)\n    {\n        Debug.Log("통이 부서짐!");\n    }\n}',
          accept: ['public class Barrel : IDamageable\n{\n    public void TakeDamage(int amount)\n    {\n        Debug.Log("통이 부서짐!");\n    }\n}'],
          why: '<code>class 이름 : 인터페이스</code> 형태로 구현하고, 인터페이스가 요구하는 메서드를 정의해요.',
          hint: 'public class Barrel : IDamageable { } 안에 TakeDamage 메서드를 작성하세요.'
        }),
      ],
      boss: () => {
        const isEnemy = Math.random() < 0.5;
        const health = randInt(50, 100);
        const damage = randInt(10, 30);
        return {
          type: 'blank',
          q: `<code>void Attack(IDamageable target) { target.TakeDamage(${damage}); }</code>을 ${isEnemy ? `체력 ${health}인 Enemy` : 'Barrel'}에 대해 호출하면, ${isEnemy ? '남은 체력은 얼마가 될까요? 숫자만 쓰세요.' : '무엇이 출력될까요? (그대로 입력)'}`,
          prefix: '', suffix: '', accept: isEnemy ? [String(health - damage)] : ['통이 부서짐!'], placeholder: isEnemy ? '숫자' : '출력 결과',
          why: isEnemy
            ? `Enemy의 TakeDamage는 health -= amount를 하므로 ${health} - ${damage} = ${health - damage}예요.`
            : 'Barrel의 TakeDamage는 항상 "통이 부서짐!"을 출력해요.',
          hint: 'Attack 함수는 실제 타입(Enemy/Barrel)에 따라 그 클래스의 TakeDamage가 호출돼요.'
        };
      }
    },
    {
      id: 'genericsListCSharp',
      title: '제네릭과 List<T>',
      ready: true,
      summary: '배열보다 유연하게 크기가 늘어나는 List<T>와, 타입을 매개변수처럼 다루는 제네릭의 기본을 배워요.',
      goals: ['List<T>로 여러 값 다루기', 'Add/Remove/Count', '제네릭이 지켜주는 타입 안전성'],
      blocks: [
        {
          h: '크기가 자동으로 늘어나는 리스트: List<T>',
          html: `<p><code>List&lt;T&gt;</code>는 배열과 달리 크기를 미리 정하지 않아도 되고, <code>Add</code>로 값을 추가하면 자동으로 늘어나요. <code>&lt;T&gt;</code> 자리에는 담을 값의 타입(<code>string</code>, <code>int</code> 등)을 적어요.</p>`,
          code: {
            label: 'list_add.cs',
            lang: 'csharp',
            src: `List<string> names = new List<string>();
names.Add("지수");
names.Add("민준");

Debug.Log(names.Count);
Debug.Log(names[0]);`,
            out: `2\n지수`
          }
        },
        {
          h: '제거하기: Remove',
          html: `<p><code>Remove(값)</code>은 리스트에서 그 값을 찾아 하나 제거해요. 배열과 달리 크기를 신경 쓰지 않고 자유롭게 추가·삭제할 수 있는 게 List의 장점이에요.</p>`,
          code: {
            label: 'list_remove.cs',
            lang: 'csharp',
            src: `List<int> scores = new List<int> { 10, 20, 30 };
scores.Remove(20);

Debug.Log(scores.Count);`,
            out: `2`
          },
          after: `<div class="note"><b>정리</b> — <code>List&lt;string&gt;</code>에는 문자열만 담을 수 있어요. 실수로 정수를 넣으려 하면 컴파일 오류가 나서, 제네릭이 실행 전에 타입 실수를 미리 잡아줘요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 6);
          return {
            type: 'blank',
            q: `<code>List<string> names = new List<string>();</code>이고 <code>Add</code>를 총 ${n}번 호출했을 때, <code>names.Count</code>는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `Add를 호출할 때마다 리스트에 값이 하나씩 추가되므로, ${n}번 호출하면 Count는 ${n}이에요.`,
            hint: 'Add를 부른 횟수만큼 리스트의 개수(Count)가 늘어나요.'
          };
        },
        () => makeChoice(
          'List<T>가 배열보다 편리한 점으로 알맞은 것은?',
          '크기를 미리 정하지 않아도 되고, Add/Remove로 자유롭게 추가·삭제할 수 있다', ['배열보다 항상 실행 속도가 빠르다', '어떤 타입이든 한 리스트에 섞어 담을 수 있다', '자동으로 정렬된 상태를 유지한다'],
          'List<T>는 크기가 고정되지 않고, Add/Remove로 유연하게 값을 넣고 뺄 수 있어요.',
          '배열은 크기를 미리 정해야 하지만, List는 그렇지 않아요.'
        ),
        () => makeChoice(
          '<code>List<string> names = new List<string>();</code>에 <code>names.Add(123);</code>(정수)을 하려고 하면?',
          '컴파일 오류가 발생한다(타입이 맞지 않아서)', ['자동으로 문자열 "123"으로 바뀌어 저장된다', '아무 문제 없이 정수 그대로 저장된다', '리스트가 비워진다'],
          'List<string>은 string만 담을 수 있도록 제네릭이 타입을 제한해서, 정수를 넣으려 하면 컴파일 시점에 오류가 나요.',
          '제네릭의 &lt;T&gt;는 "이 타입만 담을 수 있다"는 제약이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>int</code>를 담는 빈 <code>List</code>를 만들어 <code>numbers</code>라는 이름으로 선언하는 코드를 작성하세요.',
          starter: '',
          placeholder: 'List<int> numbers = new List<int>();',
          accept: ['List<int> numbers = new List<int>();'],
          why: '<code>List&lt;int&gt;</code>는 정수만 담을 수 있는 리스트를 만들어요.',
          hint: 'List<int> numbers = new List<int>(); 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const adds = randInt(3, 6);
        const removes = randInt(1, 2);
        return {
          type: 'blank',
          q: `<code>List<int> scores = new List<int>();</code>에 <code>Add</code>를 ${adds}번 호출한 뒤, <code>Remove</code>를 ${removes}번 호출했어요(제거하려는 값이 모두 리스트에 있었어요). 최종 <code>scores.Count</code>는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(adds - removes)], placeholder: '숫자',
          why: `Add ${adds}번으로 ${adds}개가 되고, Remove ${removes}번으로 ${removes}개가 줄어서 ${adds} - ${removes} = ${adds - removes}예요.`,
          hint: 'Add로 늘어난 개수에서 Remove로 줄어든 개수를 빼보세요.'
        };
      }
    },
    {
      id: 'delegatesEvents',
      title: 'delegate와 event로 느슨한 결합 만들기',
      ready: true,
      summary: '함수를 변수처럼 담아 나중에 호출하는 delegate와, 여러 곳에 알림을 보내는 event를 배워요.',
      goals: ['delegate로 함수를 변수에 담기', '+=로 여러 함수 구독하기', '?.Invoke()로 안전하게 호출하기'],
      blocks: [
        {
          h: '함수를 담는 변수: delegate',
          html: `<p><code>delegate</code>는 "이런 모양(매개변수, 반환 타입)의 함수를 담을 수 있는 타입"을 정의해요. 이 타입의 변수에 함수를 등록해두면, 나중에 <code>Invoke()</code>로 그 함수들을 호출할 수 있어요.</p>`,
          code: {
            label: 'delegate.cs',
            lang: 'csharp',
            src: `public delegate void OnDeath();

public class Enemy
{
    public OnDeath onDeath;

    public void Die()
    {
        Debug.Log("적이 죽었어요");
        onDeath?.Invoke();
    }
}`
          }
        },
        {
          h: '여러 곳에서 구독하기: +=',
          html: `<p><code>+=</code>로 delegate에 여러 함수를 등록(구독)할 수 있어요. <code>Invoke()</code> 한 번으로 등록된 함수들이 등록한 순서대로 모두 실행돼요.</p>`,
          code: {
            label: 'subscribe.cs',
            lang: 'csharp',
            src: `Enemy enemy = new Enemy();
enemy.onDeath += () => Debug.Log("점수 추가!");
enemy.onDeath += () => Debug.Log("적 카운트 감소!");

enemy.Die();`,
            out: `적이 죽었어요\n점수 추가!\n적 카운트 감소!`
          },
          after: `<div class="note"><b>정리</b> — <code>onDeath?.Invoke()</code>의 <code>?.</code>는 아무도 구독하지 않아 onDeath가 null일 때, 오류 없이 그냥 넘어가게 해줘요. 진짜 <code>event</code> 키워드를 쓰면 클래스 밖에서 함부로 Invoke하거나 통째로 덮어쓰는 것도 막을 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(2, 4);
          return {
            type: 'blank',
            q: `<code>public OnDeath onDeath;</code>에 서로 다른 함수를 <code>+=</code>로 ${n}번 등록한 뒤 <code>onDeath?.Invoke();</code>를 실행하면, 등록된 함수는 총 몇 번 실행될까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(n)], placeholder: '숫자',
            why: `Invoke()를 한 번 호출하면 그동안 += 로 등록된 함수가 모두(총 ${n}개) 순서대로 실행돼요.`,
            hint: '+=로 등록한 함수의 개수만큼 Invoke() 한 번에 다 실행돼요.'
          };
        },
        () => makeChoice(
          '<code>onDeath?.Invoke();</code>에서 <code>?.</code>의 역할은?',
          'onDeath가 null(아무도 구독하지 않음)이어도 오류 없이 안전하게 넘어가게 해준다', ['onDeath를 항상 null로 만든다', 'Invoke를 두 번 호출하게 만든다', '구독자 목록을 정렬한다'],
          'onDeath가 null이면 ?.Invoke()는 아무 일도 하지 않고 조용히 넘어가지만, ?. 없이 onDeath.Invoke()를 하면 null 참조 오류가 나요.',
          'null 안전 호출(?.) 개념이 delegate에도 그대로 적용돼요.'
        ),
        () => makeChoice(
          '<code>onDeath += 함수;</code>처럼 delegate에 함수를 등록하는 것을 부르는 말은?',
          '구독(subscribe)', ['상속(inherit)', '캐스팅(cast)', '오버로딩(overload)'],
          '이벤트/delegate에 함수를 +=로 등록하는 것을 "구독한다"고 표현해요.',
          '나중에 그 일이 일어나면 알림을 받겠다고 "구독 신청"하는 것과 비슷해요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Enemy</code> 인스턴스 <code>enemy</code>의 <code>onDeath</code>에, <code>Debug.Log("아이템 드랍!");</code>을 실행하는 람다 함수를 구독시키는 코드를 작성하세요.',
          starter: '',
          placeholder: 'enemy.onDeath += () => Debug.Log("아이템 드랍!");',
          accept: ['enemy.onDeath += () => Debug.Log("아이템 드랍!");'],
          why: '<code>+= () => { ... }</code> 형태로 람다 함수를 delegate에 구독시켜요.',
          hint: 'enemy.onDeath += () => Debug.Log("아이템 드랍!"); 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const hasSubscribers = Math.random() < 0.5;
        const n = randInt(2, 3);
        return {
          type: 'blank',
          q: `<code>public OnDeath onDeath;</code>에 아무도 구독하지 ${hasSubscribers ? `않았다가, 나중에 ${n}개의 함수를 += 로 등록했어요` : '않았어요(구독자 0개)'}. <code>onDeath?.Invoke();</code>를 실행하면 오류가 날까요? (예/아니오)`,
          prefix: '', suffix: '', accept: ['아니오'], placeholder: '예 / 아니오',
          why: '?.Invoke()는 onDeath가 null이든(구독자가 없든) 함수가 등록되어 있든, 오류 없이 안전하게 동작해요.',
          hint: '?. 덕분에 null이어도 오류 없이 그냥 넘어가요.'
        };
      }
    },
    {
      id: 'linqBasics',
      title: 'LINQ 기초: Where와 Select',
      ready: true,
      summary: '리스트를 반복문 없이 필터링하고 변환하는 LINQ의 Where와 Select를 배워요.',
      goals: ['Where로 조건에 맞는 것만 걸러내기', 'Select로 값 변환하기', 'using System.Linq 필요성'],
      blocks: [
        {
          h: '조건에 맞는 것만: Where',
          html: `<p><code>Where(조건)</code>은 조건을 만족하는 값만 남긴 새로운 결과를 만들어요. LINQ를 쓰려면 파일 위에 <code>using System.Linq;</code>가 필요해요.</p>`,
          code: {
            label: 'linq_where.cs',
            lang: 'csharp',
            src: `using System.Linq;

List<int> scores = new List<int> { 90, 45, 78, 60, 30 };
var passed = scores.Where(s => s >= 60).ToList();

Debug.Log(passed.Count);`,
            out: `3`
          }
        },
        {
          h: '값을 변환하기: Select',
          html: `<p><code>Select(변환식)</code>은 리스트의 각 값을 원하는 형태로 바꾼 새로운 결과를 만들어요. 결과를 List로 확정하려면 마지막에 <code>.ToList()</code>를 붙여요.</p>`,
          code: {
            label: 'linq_select.cs',
            lang: 'csharp',
            src: `List<int> scores = new List<int> { 90, 45, 78 };
var doubled = scores.Select(s => s * 2).ToList();

Debug.Log(doubled[0]);`,
            out: `180`
          },
          after: `<div class="note"><b>정리</b> — Where와 Select 모두 원본 리스트는 그대로 두고, 새로운 결과를 만들어요. 둘을 이어서(<code>Where(...).Select(...)</code>) 쓰면 "걸러내고 변환하기"를 한 줄로 할 수 있어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const nums = Array.from({ length: 5 }, () => randInt(1, 100));
          const threshold = 60;
          const count = nums.filter(n => n >= threshold).length;
          return {
            type: 'blank',
            q: `<code>List<int> scores = new List<int> { ${nums.join(', ')} };</code>이고 <code>var passed = scores.Where(s => s >= ${threshold}).ToList();</code>일 때, <code>passed.Count</code>는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(count)], placeholder: '숫자',
            why: `${threshold} 이상인 값만 세면 ${count}개예요.`,
            hint: 'Where는 조건(s >= 60)을 만족하는 값만 남겨요.'
          };
        },
        () => makeChoice(
          '<code>Where</code>와 <code>Select</code>의 차이로 알맞은 것은?',
          'Where는 조건에 맞는 값만 남기고, Select는 각 값을 다른 형태로 변환한다', ['Where는 값을 변환하고, Select는 값을 걸러낸다', '둘 다 완전히 같은 기능이다', 'Where는 리스트를 정렬하고, Select는 리스트를 뒤집는다'],
          'Where는 "걸러내기(필터링)", Select는 "바꾸기(변환)"를 담당해요.',
          '"어디에 있는지(where)"와 "고르다(select)"의 뜻 차이를 생각해보세요.'
        ),
        () => makeChoice(
          'LINQ의 Where, Select 같은 기능을 쓰기 위해 파일 맨 위에 추가해야 하는 것은?',
          '<code>using System.Linq;</code>', ['<code>using UnityEngine;</code>', '<code>using System.Collections;</code>', '<code>using UnityEngine.UI;</code>'],
          'LINQ 확장 메서드들은 System.Linq 네임스페이스에 있어서, using으로 추가해야 써요.',
          '"LINQ"라는 이름이 그대로 네임스페이스에 들어가요.'
        ),
        () => ({
          type: 'code',
          q: '<code>scores</code>(List<int>)에서 <code>80</code> 이상인 값만 걸러내 <code>List</code>로 만드는 코드를 작성하세요.',
          starter: '',
          placeholder: 'var passed = scores.Where(s => s >= 80).ToList();',
          accept: ['var passed = scores.Where(s => s >= 80).ToList();'],
          why: 'Where(조건)로 걸러내고, ToList()로 결과를 List로 확정해요.',
          hint: 'scores.Where(s => s >= 80).ToList(); 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const nums = Array.from({ length: 4 }, () => randInt(1, 20));
        const doubled = nums.filter(n => n >= 10).map(n => n * 2);
        return {
          type: 'blank',
          q: `<code>List<int> scores = new List<int> { ${nums.join(', ')} };</code>이고 <code>var result = scores.Where(s => s >= 10).Select(s => s * 2).ToList();</code>일 때, <code>result</code>의 값은? (쉼표와 공백으로 구분, 없으면 '빈 리스트')`,
          prefix: '', suffix: '', accept: [doubled.length ? doubled.join(', ') : '빈 리스트'], placeholder: '숫자, 숫자 또는 빈 리스트',
          why: doubled.length
            ? `10 이상인 값만 걸러서(${nums.filter(n => n >= 10).join(', ') || '없음'}) 각각 2배로 만들면 [${doubled.join(', ')}]예요.`
            : '10 이상인 값이 하나도 없어서 결과는 빈 리스트예요.',
          hint: '먼저 Where로 10 이상만 남기고, 그 다음 Select로 2배씩 만들어보세요.'
        };
      }
    },
    {
      id: 'asyncTaskVsCoroutine',
      title: 'async/Task와 코루틴의 차이',
      ready: true,
      summary: 'C#의 일반적인 비동기 방식인 async/Task와, Unity 전용의 코루틴이 어떻게 다른지 배워요.',
      goals: ['async Task와 await', 'Task.Delay로 기다리기', '코루틴과 async/Task의 차이'],
      blocks: [
        {
          h: 'C# 표준 비동기 방식: async/Task',
          html: `<p><code>async Task</code> 함수 안에서 <code>await</code>를 쓰면, 그 작업이 끝날 때까지 기다렸다가 다음 줄을 실행해요. <code>Task.Delay(1000)</code>은 1000밀리초(1초)를 비동기로 기다려요.</p>`,
          code: {
            label: 'async_task.cs',
            lang: 'csharp',
            src: `async Task LoadDataAsync()
{
    Debug.Log("로딩 시작");
    await Task.Delay(1000);
    Debug.Log("로딩 완료");
}`
          }
        },
        {
          h: '코루틴과 무엇이 다를까?',
          html: `<p>코루틴은 <code>MonoBehaviour</code>, <code>StartCoroutine</code> 같은 <b>Unity 전용</b> 기능에 의존해요. 반면 <code>async/Task</code>는 <b>C# 언어 자체</b>의 기능이라 Unity 밖에서도 쓰이고, 파일 읽기나 네트워크 요청 같은 진짜 비동기 작업과 잘 어울려요.</p>`,
          code: {
            label: 'compare.cs',
            lang: 'csharp',
            src: `// 코루틴: Unity API에 의존, MonoBehaviour에서만 시작 가능
IEnumerator LoadCoroutine()
{
    yield return new WaitForSeconds(1f);
}

// async/Task: 일반 C# 어디서나 사용 가능
async Task LoadTaskAsync()
{
    await Task.Delay(1000);
}`
          },
          after: `<div class="note"><b>정리</b> — 게임 오브젝트의 프레임 단위 동작(연출, 애니메이션 타이밍)은 코루틴이 더 자연스럽고, 파일/네트워크 같은 진짜 비동기 작업은 async/Task가 더 알맞아요.</div>`
        }
      ],
      quizGenerators: [
        () => ({
          type: 'blank',
          q: `<code>async Task Sequence() { Debug.Log("A"); await Task.Delay(1000); Debug.Log("B"); }</code>를 호출하면, "A"와 "B" 중 어느 것이 먼저 출력될까요?`,
          prefix: '', suffix: '', accept: ['A'], placeholder: 'A / B',
          why: 'await 이전 코드가 먼저 실행되고, Task.Delay(1000)이 끝난 뒤에야 그 다음 코드(B)가 실행돼요.',
          hint: 'await를 만나기 전까지의 코드가 먼저 실행돼요(코루틴의 yield return과 비슷한 개념이에요).'
        }),
        () => makeChoice(
          '코루틴(IEnumerator)과 async/Task의 차이로 알맞은 것은?',
          '코루틴은 MonoBehaviour 등 Unity 전용 기능에 의존하지만, async/Task는 C# 언어 자체의 표준 기능이다', ['코루틴은 절대 값을 기다릴 수 없다', 'async/Task는 Unity에서 쓸 수 없다', '둘은 완전히 같은 기능을 이름만 다르게 부른 것이다'],
          '코루틴은 StartCoroutine 등 Unity API가 필요하지만, async/Task는 순수 C# 기능이라 Unity 밖에서도 동작해요.',
          '"Unity 전용이냐, C# 표준이냐"가 핵심 차이예요.'
        ),
        () => makeChoice(
          '<code>await</code>의 역할로 알맞은 것은?',
          '그 작업이 끝날 때까지 기다렸다가, 이후 코드를 이어서 실행한다', ['그 작업을 즉시 취소한다', '그 작업을 무한 반복한다', '그 작업을 별도의 새 프로그램으로 실행한다'],
          'await는 그 작업(Task)이 완료될 때까지 기다렸다가 다음 줄로 넘어가요.',
          '코루틴의 yield return과 비슷한 역할을 한다고 생각하면 돼요.'
        ),
        () => ({
          type: 'code',
          q: '2초(2000밀리초)를 기다린 뒤 "완료"를 출력하는 <code>async Task</code> 함수 <code>WaitAsync</code>를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'async Task WaitAsync()\n{\n    await Task.Delay(2000);\n    Debug.Log("완료");\n}',
          accept: ['async Task WaitAsync()\n{\n    await Task.Delay(2000);\n    Debug.Log("완료");\n}'],
          why: 'async Task 함수 안에서 await Task.Delay(2000)로 2초를 기다린 뒤 다음 코드를 실행해요.',
          hint: 'async Task WaitAsync() { } 안에 await Task.Delay(2000);과 Debug.Log("완료");를 순서대로 쓰세요.'
        }),
      ],
      boss: () => {
        const useCoroutine = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `${useCoroutine ? 'MonoBehaviour가 붙은 게임 오브젝트에서, 몇 초 뒤 적을 생성하는 연출' : 'MonoBehaviour와 상관없는 일반 C# 클래스에서, 파일을 비동기로 읽는 작업'}을 만들 때 어울리는 방식은? (코루틴 또는 async/Task 중 하나로 답하세요)`,
          prefix: '', suffix: '', accept: [useCoroutine ? '코루틴' : 'async/Task'], placeholder: '코루틴 / async/Task',
          why: useCoroutine
            ? 'MonoBehaviour 기반 게임 오브젝트의 연출은 StartCoroutine으로 다루는 코루틴이 자연스러워요.'
            : 'MonoBehaviour와 무관한 일반 C# 코드에서는 Unity에 의존하지 않는 async/Task가 더 적합해요.',
          hint: 'Unity 오브젝트 연출인지, 순수 C# 비동기 작업인지를 구분해보세요.'
        };
      }
    },
    {
      id: 'exceptionHandlingCSharp',
      title: '예외 처리: try, catch, finally',
      ready: true,
      summary: '오류가 발생해도 게임이 멈추지 않게 처리하는 try-catch-finally를 배워요.',
      goals: ['try-catch로 예외 잡기', 'finally로 항상 실행하기', '어떤 예외인지 확인하기'],
      blocks: [
        {
          h: '오류를 잡아서 처리하기: try-catch',
          html: `<p>저장된 데이터가 예상과 다른 형식일 수도 있어요. <code>int.Parse</code>는 숫자로 바꿀 수 없는 문자열을 받으면 <code>FormatException</code>을 던지는데, <code>try-catch</code>로 이걸 잡아서 게임이 멈추지 않게 처리할 수 있어요.</p>`,
          code: {
            label: 'try_catch.cs',
            lang: 'csharp',
            src: `void LoadPlayerData()
{
    try
    {
        int level = int.Parse(PlayerPrefs.GetString("Level"));
        Debug.Log("레벨: " + level);
    }
    catch (FormatException e)
    {
        Debug.Log("저장된 값이 숫자가 아니에요: " + e.Message);
    }
}`
          }
        },
        {
          h: '무슨 일이 있어도 실행: finally',
          html: `<p><code>finally</code> 블록은 예외가 발생하든 안 하든 항상 마지막에 실행돼요. 로딩 작업이 끝났음을 표시하는 등의 마무리 코드에 자주 써요.</p>`,
          code: {
            label: 'finally.cs',
            lang: 'csharp',
            src: `void LoadPlayerData()
{
    try
    {
        int level = int.Parse("abc"); // 오류!
    }
    catch (FormatException e)
    {
        Debug.Log("오류 처리: " + e.Message);
    }
    finally
    {
        Debug.Log("로딩 작업 종료");
    }
}`
          },
          after: `<div class="note"><b>정리</b> — catch 블록이 실행됐어도 finally는 그 뒤에 반드시 실행돼요. 예외가 안 나도 마찬가지예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const isValid = Math.random() < 0.5;
          const value = isValid ? String(randInt(1, 99)) : pick(['abc', 'lv5', 'none']);
          return {
            type: 'blank',
            q: `<code>try { int level = int.Parse("${value}"); } catch (FormatException e) { Debug.Log("오류"); }</code>를 실행하면, "오류"가 출력될까요? (예/아니오)`,
            prefix: '', suffix: '', accept: [isValid ? '아니오' : '예'], placeholder: '예 / 아니오',
            why: isValid
              ? `"${value}"는 숫자로 변환 가능하므로 예외가 발생하지 않아 catch가 실행되지 않아요.`
              : `"${value}"는 숫자로 변환할 수 없어서 FormatException이 발생하고, catch에서 "오류"가 출력돼요.`,
            hint: 'int.Parse는 문자열이 진짜 숫자 형태여야만 성공해요.'
          };
        },
        () => makeChoice(
          '<code>finally</code> 블록의 특징으로 알맞은 것은?',
          '예외가 발생하든 안 하든 항상 마지막에 실행된다', ['예외가 발생했을 때만 실행된다', '예외가 없을 때만 실행된다', 'catch 블록보다 먼저 실행된다'],
          'finally는 try/catch의 결과와 상관없이 항상 실행돼요.',
          '마무리 작업을 보장하고 싶을 때 쓰는 블록이에요.'
        ),
        () => ({
          type: 'blank',
          q: `<code>int.Parse(문자열)</code>이 <code>FormatException</code>을 던지는 상황을 설명하면? ("숫자로 변환할 수 없는 문자열일 때"라고 답하세요)`,
          prefix: '', suffix: '', accept: ['숫자로 변환할 수 없는 문자열일 때'], placeholder: '설명',
          why: 'int.Parse는 "123" 같은 진짜 숫자 형태의 문자열만 변환할 수 있고, 그렇지 않으면 FormatException을 던져요.',
          hint: '"abc"처럼 숫자가 아닌 문자가 섞여 있으면 변환에 실패해요.'
        }),
        () => ({
          type: 'code',
          q: '<code>PlayerPrefs.GetString("Level")</code>을 <code>int.Parse</code>로 변환하되, <code>FormatException</code>이 발생하면 <code>Debug.Log("오류 발생");</code>을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 5,
          placeholder: 'try\n{\n    int level = int.Parse(PlayerPrefs.GetString("Level"));\n}\ncatch (FormatException e)\n{\n    Debug.Log("오류 발생");\n}',
          accept: ['try\n{\n    int level = int.Parse(PlayerPrefs.GetString("Level"));\n}\ncatch (FormatException e)\n{\n    Debug.Log("오류 발생");\n}'],
          why: 'try 블록에서 변환을 시도하고, FormatException이 발생하면 catch에서 처리해요.',
          hint: 'try { int level = int.Parse(...); } catch (FormatException e) { Debug.Log("오류 발생"); } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const isValid = Math.random() < 0.5;
        const value = isValid ? String(randInt(1, 99)) : pick(['abc', 'N/A']);
        return {
          type: 'blank',
          q: `<code>try { int.Parse("${value}"); } catch (FormatException e) { Debug.Log("오류 처리"); } finally { Debug.Log("종료"); }</code>를 실행하면, "종료"는 출력될까요? (예/아니오)`,
          prefix: '', suffix: '', accept: ['예'], placeholder: '예 / 아니오',
          why: 'finally 블록은 예외가 발생했든(catch가 실행됐든) 안 했든 상관없이 항상 실행돼요.',
          hint: 'finally는 try/catch 결과와 무관하게 항상 실행된다는 걸 떠올려보세요.'
        };
      }
    },
    {
      id: 'enumStateMachine',
      title: 'enum과 상태 머신 패턴',
      ready: true,
      summary: '캐릭터의 상태(대기, 이동, 점프 등)를 관리하는 enum 기반 상태 머신 패턴을 배워요.',
      goals: ['enum으로 상태 정의하기', 'switch로 상태별 동작 나누기', '상태 전환하기'],
      blocks: [
        {
          h: '정해진 값들 중 하나: enum',
          html: `<p><code>enum</code>은 미리 정해둔 값들 중 딱 하나만 가질 수 있는 타입이에요. 캐릭터의 상태(대기, 걷기, 점프)처럼 "여러 개 중 하나"를 표현하기에 딱 맞아요.</p>`,
          code: {
            label: 'enum_state.cs',
            lang: 'csharp',
            src: `public enum PlayerState
{
    Idle,
    Walking,
    Jumping
}

public PlayerState currentState = PlayerState.Idle;`
          }
        },
        {
          h: '상태별로 다른 동작: switch',
          html: `<p><code>switch</code>문으로 현재 상태에 따라 다른 코드를 실행하게 만들 수 있어요. 이렇게 상태에 따라 동작을 나누는 가장 기본적인 형태를 <b>상태 머신(state machine)</b>이라고 해요.</p>`,
          code: {
            label: 'switch_state.cs',
            lang: 'csharp',
            src: `void Update()
{
    switch (currentState)
    {
        case PlayerState.Idle:
            Debug.Log("가만히 있음");
            break;
        case PlayerState.Walking:
            Debug.Log("걷는 중");
            break;
        case PlayerState.Jumping:
            Debug.Log("점프 중");
            break;
    }
}`
          },
          after: `<div class="note"><b>정리</b> — 상태를 바꾸고 싶으면 <code>currentState = PlayerState.Jumping;</code>처럼 대입만 하면 되고, 다음 Update()부터는 자동으로 그 상태에 맞는 case가 실행돼요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const state = pick(['Idle', 'Walking', 'Jumping']);
          const outputs = { Idle: '가만히 있음', Walking: '걷는 중', Jumping: '점프 중' };
          return {
            type: 'blank',
            q: `<code>currentState = PlayerState.${state};</code>인 상태에서 위 switch문이 실행되는 <code>Update()</code>를 호출하면, 출력은? (그대로 입력)`,
            prefix: '', suffix: '', accept: [outputs[state]], placeholder: '출력 결과',
            why: `currentState가 ${state}이므로 case PlayerState.${state}가 실행되어 "${outputs[state]}"가 출력돼요.`,
            hint: 'switch문은 currentState 값과 일치하는 case를 찾아 실행해요.'
          };
        },
        () => makeChoice(
          'enum의 특징으로 알맞은 것은?',
          '미리 정해둔 값들 중 딱 하나만 가질 수 있는 타입이다', ['여러 값을 동시에 가질 수 있는 타입이다', '항상 숫자만 담을 수 있는 타입이다', '값을 저장할 수 없고 함수만 담는 타입이다'],
          'enum은 Idle, Walking, Jumping처럼 미리 정한 값들 중 하나만 가지는 타입이에요.',
          '"열거형(enumeration)"이라는 이름처럼, 가능한 값들을 나열해둔 것이에요.'
        ),
        () => makeChoice(
          '<code>currentState = PlayerState.Jumping;</code>으로 상태를 바꾼 뒤, 다음 <code>Update()</code>에서 벌어지는 일은?',
          'switch문이 바뀐 상태(Jumping)에 맞는 case를 실행한다', ['이전 상태(Idle 등)의 case가 계속 실행된다', 'switch문이 오류를 낸다', '아무 case도 실행되지 않는다'],
          'switch(currentState)는 매번 실행될 때마다 그 시점의 currentState 값에 맞는 case를 찾아 실행해요.',
          '상태를 바꾸는 것만으로 그 다음 동작이 자동으로 달라져요.'
        ),
        () => ({
          type: 'code',
          q: '<code>Idle</code>, <code>Walking</code>, <code>Jumping</code> 세 가지 값을 가지는 <code>enum</code> <code>PlayerState</code>를 정의하세요.',
          starter: '',
          rows: 5,
          placeholder: 'public enum PlayerState\n{\n    Idle,\n    Walking,\n    Jumping\n}',
          accept: ['public enum PlayerState\n{\n    Idle,\n    Walking,\n    Jumping\n}'],
          why: '<code>enum 이름 { 값1, 값2, 값3 }</code> 형태로 정해진 값들을 나열해요.',
          hint: 'public enum PlayerState { } 안에 세 값을 콤마로 구분해서 나열하세요.'
        }),
      ],
      boss: () => {
        const from = pick(['Idle', 'Walking']);
        const to = 'Jumping';
        const outputs = { Idle: '가만히 있음', Walking: '걷는 중', Jumping: '점프 중' };
        return {
          type: 'blank',
          q: `<code>currentState</code>가 <code>PlayerState.${from}</code>인 상태에서, 스페이스바를 눌러 <code>currentState = PlayerState.${to};</code>로 바뀌었어요. 그 다음 <code>Update()</code>가 실행되면 무엇이 출력될까요? (그대로 입력)`,
          prefix: '', suffix: '', accept: [outputs[to]], placeholder: '출력 결과',
          why: `상태가 이미 ${to}로 바뀌었으므로, 다음 Update()에서는 이전 상태(${from})가 아니라 ${to}에 맞는 "${outputs[to]}"가 출력돼요.`,
          hint: 'switch문은 항상 "현재" currentState 값을 기준으로 동작해요.'
        };
      }
    },
    {
      id: 'structVsClass',
      title: 'struct와 class의 차이',
      ready: true,
      summary: '값 타입인 struct와 참조 타입인 class가 복사될 때 어떻게 다르게 동작하는지 배워요.',
      goals: ['struct는 값 타입(복사됨)', 'class는 참조 타입(같은 것을 가리킴)', '언제 struct를 쓰는지(Vector3 등)'],
      blocks: [
        {
          h: '값 타입: struct는 복사하면 완전히 별개',
          html: `<p><code>struct</code>는 <b>값 타입</b>이에요. 다른 변수에 대입하면 값 전체가 복사돼서, 복사본을 바꿔도 원본은 전혀 영향을 받지 않아요.</p>`,
          code: {
            label: 'struct_copy.cs',
            lang: 'csharp',
            src: `public struct Point
{
    public int x;
}

Point a = new Point { x = 5 };
Point b = a;
b.x = 10;

Debug.Log(a.x);
Debug.Log(b.x);`,
            out: `5\n10`
          }
        },
        {
          h: '참조 타입: class는 대입하면 같은 것을 가리킴',
          html: `<p><code>class</code>는 <b>참조 타입</b>이에요. 다른 변수에 대입하면 "같은 오브젝트를 가리키는 이름표"가 하나 더 생기는 것뿐이라서, 하나를 바꾸면 다른 변수로 봐도 똑같이 바뀌어 보여요.</p>`,
          code: {
            label: 'class_copy.cs',
            lang: 'csharp',
            src: `public class PointClass
{
    public int x;
}

PointClass a = new PointClass { x = 5 };
PointClass b = a;
b.x = 10;

Debug.Log(a.x);
Debug.Log(b.x);`,
            out: `10\n10`
          },
          after: `<div class="note"><b>정리</b> — Unity의 <code>Vector3</code>도 사실 struct예요. 그래서 <code>Vector3 b = a;</code> 후 b를 바꿔도 a는 그대로예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const initial = randInt(1, 10);
          const changed = randInt(11, 30);
          return {
            type: 'blank',
            q: `<code>public struct Point { public int x; }</code>이고 <code>Point a = new Point { x = ${initial} }; Point b = a; b.x = ${changed};</code>일 때, <code>a.x</code>는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(initial)], placeholder: '숫자',
            why: `struct는 값 타입이라 b = a에서 값이 통째로 복사되므로, b.x를 바꿔도 a.x는 원래 값 ${initial} 그대로예요.`,
            hint: 'struct는 대입할 때 값 전체가 복사돼서, 서로 완전히 별개가 돼요.'
          };
        },
        () => makeChoice(
          'struct와 class의 차이로 알맞은 것은?',
          'struct는 대입 시 값 전체가 복사되지만(값 타입), class는 같은 오브젝트를 가리키는 참조만 복사된다(참조 타입)', ['struct는 메서드를 가질 수 없다', 'class는 필드를 가질 수 없다', 'struct만 인스펙터에 노출될 수 있다'],
          'struct는 값 타입이라 복사가 독립적이고, class는 참조 타입이라 같은 오브젝트를 공유해요.',
          '"값 자체를 복사하는지, 가리키는 화살표만 복사하는지"가 핵심이에요.'
        ),
        () => {
          const initial = randInt(1, 10);
          const changed = randInt(11, 30);
          return {
            type: 'blank',
            q: `<code>public class PointClass { public int x; }</code>이고 <code>PointClass a = new PointClass { x = ${initial} }; PointClass b = a; b.x = ${changed};</code>일 때, <code>a.x</code>는? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(changed)], placeholder: '숫자',
            why: `class는 참조 타입이라 a와 b가 같은 오브젝트를 가리키므로, b.x를 바꾸면 a.x도 똑같이 ${changed}로 보여요.`,
            hint: 'class는 대입해도 같은 오브젝트를 가리키는 이름표가 하나 더 생길 뿐이에요.'
          };
        },
        () => ({
          type: 'code',
          q: '<code>int</code> 타입의 필드 <code>x</code>와 <code>y</code>를 가지는 <code>struct</code> <code>Coord</code>를 정의하세요.',
          starter: '',
          rows: 4,
          placeholder: 'public struct Coord\n{\n    public int x;\n    public int y;\n}',
          accept: ['public struct Coord\n{\n    public int x;\n    public int y;\n}'],
          why: '<code>struct 이름 { 필드들 }</code> 형태로 값 타입을 정의해요.',
          hint: 'public struct Coord { } 안에 두 필드를 선언하세요.'
        }),
      ],
      boss: () => {
        const isStruct = Math.random() < 0.5;
        const initial = randInt(1, 20);
        const changed = randInt(21, 50);
        return {
          type: 'blank',
          q: `${isStruct ? '<code>struct</code>' : '<code>class</code>'} <code>Point</code>가 있고, <code>Point a = new Point { x = ${initial} }; Point b = a; b.x = ${changed};</code>를 실행했어요. <code>a.x</code>는? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [isStruct ? String(initial) : String(changed)], placeholder: '숫자',
          why: isStruct
            ? `struct는 값 타입이라 b는 a의 복사본이므로, b.x를 바꿔도 a.x는 ${initial} 그대로예요.`
            : `class는 참조 타입이라 a와 b가 같은 오브젝트를 가리키므로, a.x도 ${changed}로 바뀌어요.`,
          hint: 'struct인지 class인지에 따라 대입의 의미가 완전히 달라져요.'
        };
      }
    },
    {
      id: 'extensionMethodsCSharp',
      title: '확장 메서드(Extension Method)',
      ready: true,
      summary: '이미 있는 타입에 마치 원래 있던 것처럼 새 메서드를 추가하는 확장 메서드를 배워요.',
      goals: ['static class와 this 매개변수', '기존 타입에 메서드 추가하기', '확장 메서드 사용법'],
      blocks: [
        {
          h: '기존 타입에 메서드 추가하기',
          html: `<p>첫 번째 매개변수 앞에 <code>this</code>를 붙이면, 그 타입의 <b>확장 메서드</b>가 돼요. <code>static class</code> 안에 <code>static</code> 메서드로 정의해야 해요.</p>`,
          code: {
            label: 'extension_method.cs',
            lang: 'csharp',
            src: `public static class IntExtensions
{
    public static bool IsEven(this int number)
    {
        return number % 2 == 0;
    }
}`
          }
        },
        {
          h: '원래 있던 메서드처럼 사용하기',
          html: `<p>확장 메서드를 정의해두면, <code>int</code>처럼 직접 수정할 수 없는 기존 타입에도 마치 원래 있던 메서드인 것처럼 자연스럽게 <code>변수.메서드()</code> 형태로 쓸 수 있어요.</p>`,
          code: {
            label: 'use_extension.cs',
            lang: 'csharp',
            src: `int n = 4;
Debug.Log(n.IsEven());`,
            out: `true`
          },
          after: `<div class="note"><b>정리</b> — 확장 메서드는 실제로 그 타입을 수정하는 게 아니라, "이 타입의 값이 들어오면 이렇게 처리해라"는 규칙을 컴파일러가 대신 연결해주는 것뿐이에요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const n = randInt(1, 20);
          const isEven = n % 2 === 0;
          return {
            type: 'blank',
            q: `<code>public static bool IsEven(this int number) { return number % 2 == 0; }</code>일 때, <code>${n}.IsEven()</code>의 결과는? (참/거짓)`,
            prefix: '', suffix: '', accept: isEven ? ['true', '참'] : ['false', '거짓'], placeholder: 'true / false',
            why: `${n} % 2 는 ${n % 2}이므로 결과는 ${isEven ? 'true' : 'false'}예요.`,
            hint: 'this int number는 확장 메서드를 호출한 정수 그 자체를 가리켜요.'
          };
        },
        () => makeChoice(
          '확장 메서드를 만들 때, 첫 번째 매개변수 앞에 붙이는 키워드는?',
          '<code>this</code>', ['<code>self</code>', '<code>ref</code>', '<code>out</code>'],
          '<code>this int number</code>처럼 this를 붙이면, 그 매개변수 타입(int)의 확장 메서드가 돼요.',
          '"이것(this)"이 확장하려는 대상을 가리켜요.'
        ),
        () => makeChoice(
          '확장 메서드가 정의되어야 하는 곳은?',
          'static class 안에 static 메서드로', ['MonoBehaviour를 상속받는 클래스 안에', 'interface 안에', '어디에 정의해도 상관없다'],
          '확장 메서드는 반드시 static class 안에 static 메서드로 정의해야 해요.',
          '인스턴스가 없어도 쓸 수 있어야 하니, static이 필요해요.'
        ),
        () => ({
          type: 'code',
          q: '<code>int</code>가 0보다 큰지 확인하는 확장 메서드 <code>IsPositive</code>를 <code>static class NumberExtensions</code> 안에 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'public static class NumberExtensions\n{\n    public static bool IsPositive(this int number)\n    {\n        return number > 0;\n    }\n}',
          accept: ['public static class NumberExtensions\n{\n    public static bool IsPositive(this int number)\n    {\n        return number > 0;\n    }\n}'],
          why: 'static class 안에 this int number를 매개변수로 받는 static 메서드로 확장 메서드를 정의해요.',
          hint: 'public static class NumberExtensions { } 안에 IsPositive 확장 메서드를 작성하세요.'
        }),
      ],
      boss: () => {
        const n = randInt(-10, 10);
        const isPositive = n > 0;
        return {
          type: 'blank',
          q: `<code>public static bool IsPositive(this int number) { return number > 0; }</code>일 때, <code>(${n}).IsPositive()</code>의 결과는? (참/거짓)`,
          prefix: '', suffix: '', accept: isPositive ? ['true', '참'] : ['false', '거짓'], placeholder: 'true / false',
          why: `${n}는 ${isPositive ? '0보다 크므로' : '0보다 크지 않으므로'} 결과는 ${isPositive ? 'true' : 'false'}예요.`,
          hint: 'number > 0 조건을 그대로 적용해보세요.'
        };
      }
    },
    {
      id: 'objectPooling',
      title: '오브젝트 풀링(Object Pooling)',
      ready: true,
      summary: '오브젝트를 매번 생성·삭제하지 않고 미리 만들어두고 재사용하는 오브젝트 풀링 기법을 배워요.',
      goals: ['Instantiate/Destroy 반복의 성능 문제', '풀에서 꺼내 쓰고 다시 반납하기', 'SetActive로 켜고 끄기'],
      blocks: [
        {
          h: '문제: 총알마다 생성하고 없애기',
          html: `<p>총을 빠르게 연사할 때마다 <code>Instantiate</code>와 <code>Destroy</code>를 반복하면, 이 작업 자체의 비용이 쌓여서 성능 저하(끊김)로 이어질 수 있어요.</p>`,
          code: {
            label: 'no_pooling.cs',
            lang: 'csharp',
            src: `void Fire()
{
    GameObject bullet = Instantiate(bulletPrefab);
    Destroy(bullet, 2f);
}`
          }
        },
        {
          h: '해결: 미리 만들어두고 재사용하기',
          html: `<p><b>오브젝트 풀링</b>은 오브젝트를 다 쓰면 <code>Destroy</code>하는 대신 <code>SetActive(false)</code>로 꺼두기만 해요. 다음에 필요할 때는 꺼져있는(재사용 가능한) 오브젝트를 찾아서 다시 켜서 써요.</p>`,
          code: {
            label: 'pooling.cs',
            lang: 'csharp',
            src: `List<GameObject> pool = new List<GameObject>();

GameObject GetBullet()
{
    foreach (GameObject bullet in pool)
    {
        if (!bullet.activeInHierarchy)
        {
            bullet.SetActive(true);
            return bullet;
        }
    }

    GameObject newBullet = Instantiate(bulletPrefab);
    pool.Add(newBullet);
    return newBullet;
}`
          },
          after: `<div class="note"><b>정리</b> — Instantiate는 풀에 재사용할 게 없을 때만(처음이거나 모두 사용 중일 때) 딱 필요한 만큼만 일어나요. 그 뒤로는 껐다 켰다 하면서 재사용해요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const hasInactive = Math.random() < 0.5;
          return {
            type: 'blank',
            q: `풀 안에 비활성화된(꺼져있는) 총알이 ${hasInactive ? '있어요' : '하나도 없어요(모두 활성화 상태예요)'}. 이 상태에서 <code>GetBullet()</code>을 호출하면, 새로 <code>Instantiate</code>가 일어날까요? (예/아니오)`,
            prefix: '', suffix: '', accept: [hasInactive ? '아니오' : '예'], placeholder: '예 / 아니오',
            why: hasInactive
              ? '비활성화된 총알을 찾아 재사용하므로, 새로 Instantiate하지 않아요.'
              : '재사용할 수 있는(꺼져있는) 총알이 없으므로 새로 Instantiate해요.',
            hint: '풀에 꺼져있는 오브젝트가 있으면 그걸 재사용하고, 없으면 새로 만들어요.'
          };
        },
        () => makeChoice(
          '오브젝트 풀링을 쓰는 주된 이유는?',
          'Instantiate/Destroy를 반복하는 데 드는 성능 비용을 줄이기 위해', ['오브젝트의 색상을 다양하게 만들기 위해', '메모리 사용량을 늘리기 위해', '오브젝트를 자동으로 정렬하기 위해'],
          '오브젝트 풀링은 반복되는 생성/삭제 비용 대신, 미리 만든 오브젝트를 껐다 켰다 하며 재사용해서 성능을 아껴요.',
          '"매번 새로 만드는 대신, 있는 걸 재사용하자"는 게 핵심 아이디어예요.'
        ),
        () => makeChoice(
          '풀링에서 오브젝트를 다 쓰고 "반납"할 때 하는 일은?',
          'Destroy하지 않고 SetActive(false)로 꺼둔다', ['즉시 Destroy해서 없앤다', '다른 씬으로 옮긴다', 'transform.position을 무작위로 바꾼다'],
          '풀링에서는 다 쓴 오브젝트를 Destroy하지 않고, SetActive(false)로 꺼서 나중에 재사용할 수 있게 남겨둬요.',
          '"없애기"가 아니라 "잠깐 숨겨두기"가 핵심이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>pool</code>(List<GameObject>)을 순회하면서, 비활성화된(재사용 가능한) 첫 오브젝트를 찾아 <code>SetActive(true)</code>로 켜고 반환하는 <code>foreach</code> 반복문을 작성하세요.',
          starter: '',
          rows: 6,
          placeholder: 'foreach (GameObject bullet in pool)\n{\n    if (!bullet.activeInHierarchy)\n    {\n        bullet.SetActive(true);\n        return bullet;\n    }\n}',
          accept: ['foreach (GameObject bullet in pool)\n{\n    if (!bullet.activeInHierarchy)\n    {\n        bullet.SetActive(true);\n        return bullet;\n    }\n}'],
          why: 'activeInHierarchy가 false인(꺼져있는) 오브젝트를 찾아 다시 켜서 재사용해요.',
          hint: 'foreach (GameObject bullet in pool) { if (!bullet.activeInHierarchy) { ... } } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const poolSize = randInt(3, 6);
        const activeCount = randInt(1, poolSize);
        const willInstantiate = activeCount === poolSize;
        return {
          type: 'blank',
          q: `풀 안에 총알이 총 ${poolSize}개 있고, 그중 ${activeCount}개가 활성화(사용 중) 상태예요. 이 상태에서 <code>GetBullet()</code>을 호출하면 새로 <code>Instantiate</code>가 일어날까요? (예/아니오)`,
          prefix: '', suffix: '', accept: [willInstantiate ? '예' : '아니오'], placeholder: '예 / 아니오',
          why: willInstantiate
            ? `${poolSize}개 모두 활성화 상태라 재사용할 수 있는 오브젝트가 없으므로, 새로 Instantiate해요.`
            : `${poolSize}개 중 ${poolSize - activeCount}개가 비활성화 상태로 남아있어서, 그중 하나를 재사용해요.`,
          hint: '전체 개수와 활성화된 개수가 같으면 재사용할 게 없어요.'
        };
      }
    },
    {
      id: 'animatorControl',
      title: 'Animator로 애니메이션 제어하기',
      ready: true,
      summary: '캐릭터의 움직임에 따라 애니메이션을 바꾸는 Animator 컴포넌트의 기본 사용법을 배워요.',
      goals: ['Animator와 파라미터', 'SetFloat/SetBool로 상태 값 전달', 'SetTrigger로 한 번 실행되는 동작'],
      blocks: [
        {
          h: '파라미터 값으로 애니메이션 전환하기',
          html: `<p>Animator 창에서 미리 만들어둔 "Speed" 같은 숫자 파라미터에 값을 전달하면, 그 값에 따라 대기/걷기/달리기 애니메이션 사이를 자동으로 전환해요(전환 조건은 Animator 창에서 미리 설정해둬요).</p>`,
          code: {
            label: 'set_float.cs',
            lang: 'csharp',
            src: `public Animator animator;

void Update()
{
    float speed = Mathf.Abs(Input.GetAxis("Horizontal"));
    animator.SetFloat("Speed", speed);
}`
          }
        },
        {
          h: '한 번만 실행되는 동작: SetTrigger',
          html: `<p><code>SetTrigger("이름")</code>은 "지금 이 순간, 이 동작을 딱 한 번 실행해라"는 신호예요. <code>SetBool</code>과 달리 실행되고 나면 자동으로 다시 꺼져서, 점프처럼 한 번만 일어나는 동작에 알맞아요.</p>`,
          code: {
            label: 'set_trigger.cs',
            lang: 'csharp',
            src: `public Animator animator;

void Jump()
{
    animator.SetTrigger("Jump");
}`
          },
          after: `<div class="note"><b>정리</b> — "계속 유지되는 상태(달리는 중 등)"는 SetBool/SetFloat, "한 번 일어나는 동작(점프, 공격 등)"은 SetTrigger가 알맞아요.</div>`
        }
      ],
      quizGenerators: [
        () => makeChoice(
          '<code>animator.SetTrigger("Jump")</code>와 <code>animator.SetBool("IsRunning", true)</code>의 차이로 알맞은 것은?',
          'SetTrigger는 한 번 실행되고 자동으로 꺼지지만, SetBool은 다시 false로 바꿀 때까지 값이 유지된다', ['SetTrigger만 인스펙터에서 확인할 수 있다', 'SetBool은 숫자만 전달할 수 있다', '둘은 완전히 같은 기능이다'],
          'Trigger는 "한 번의 신호"이고, Bool은 "계속 유지되는 상태"를 나타내요.',
          '점프(한 번)와 달리는 중(계속)의 차이를 생각해보세요.'
        ),
        () => ({
          type: 'blank',
          q: `이동 입력의 절댓값을 "Speed"라는 Animator 파라미터에 전달하는 코드를 완성하세요.`,
          prefix: 'animator.SetFloat("Speed", ', suffix: ');', accept: ['Mathf.Abs(Input.GetAxis("Horizontal"))'], placeholder: '값',
          why: 'Mathf.Abs(...)로 음수를 양수로 바꿔서 "얼마나 빠르게" 움직이는지만 전달해요.',
          hint: '방향과 상관없이 "속도의 크기"만 전달하려면 절댓값을 써야 해요.'
        }),
        () => makeChoice(
          'Animator에서 애니메이션 전환 조건을 정하는 기준은?',
          'Animator 창에서 미리 만들어둔 파라미터의 값', ['스크립트 파일의 이름', 'GameObject의 태그', '씬의 이름'],
          '코드에서 SetFloat/SetBool/SetTrigger로 전달한 파라미터 값을 기준으로, Animator 창에서 미리 설정해둔 조건에 따라 전환이 일어나요.',
          '코드는 값만 전달하고, "언제 전환할지"는 Animator 창에서 미리 정해둬요.'
        ),
        () => ({
          type: 'code',
          q: '<code>public Animator animator;</code>가 있을 때, <code>Jump()</code> 함수 안에서 "Jump"라는 트리거를 발동시키는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'void Jump()\n{\n    animator.SetTrigger("Jump");\n}',
          accept: ['void Jump()\n{\n    animator.SetTrigger("Jump");\n}'],
          why: 'SetTrigger("이름")으로 그 순간의 동작을 한 번 발동시켜요.',
          hint: 'void Jump() { } 안에 animator.SetTrigger("Jump");를 쓰세요.'
        }),
      ],
      boss: () => {
        const times = randInt(2, 5);
        return {
          type: 'blank',
          q: `<code>void Jump() { animator.SetTrigger("Jump"); }</code>가 있고, 사용자가 점프 버튼을 ${times}번 눌러서 <code>Jump()</code>가 ${times}번 호출됐어요. 점프 애니메이션이 재생을 "시작"하는 신호는 총 몇 번 발생했을까요? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(times)], placeholder: '숫자',
          why: `SetTrigger는 호출될 때마다 한 번씩 신호를 보내므로, ${times}번 호출하면 ${times}번의 시작 신호가 발생해요.`,
          hint: 'SetTrigger는 호출할 때마다 매번 새로운 신호를 보내요.'
        };
      }
    },
    {
      id: 'onEnableDisableDestroy',
      title: 'OnEnable, OnDisable, OnDestroy',
      ready: true,
      summary: '오브젝트가 활성화/비활성화되거나 완전히 사라질 때 호출되는 생명주기 메서드를 배워요.',
      goals: ['OnEnable: 활성화될 때마다', 'OnDisable: 비활성화될 때마다', 'OnDestroy: 완전히 사라질 때'],
      blocks: [
        {
          h: '켜지고 꺼질 때마다: OnEnable, OnDisable',
          html: `<p><code>Start()</code>는 딱 한 번만 실행되지만, <code>OnEnable</code>과 <code>OnDisable</code>은 <code>SetActive(true/false)</code>로 켜고 끌 때마다 <b>매번</b> 실행돼요. 오브젝트 풀링에서 재사용할 때 상태를 다시 초기화하기 좋은 위치예요.</p>`,
          code: {
            label: 'enable_disable.cs',
            lang: 'csharp',
            src: `void OnEnable()
{
    Debug.Log("활성화됨");
}

void OnDisable()
{
    Debug.Log("비활성화됨");
}`
          }
        },
        {
          h: '완전히 사라질 때: OnDestroy',
          html: `<p><code>OnDestroy</code>는 <code>Destroy()</code>로 오브젝트가 완전히 없어지기 직전에 딱 한 번 실행돼요. 이벤트 구독 해제 같은 마무리 정리 작업을 여기서 자주 해요.</p>`,
          code: {
            label: 'on_destroy.cs',
            lang: 'csharp',
            src: `void OnDestroy()
{
    Debug.Log("오브젝트가 파괴됨");
}`
          },
          after: `<div class="note"><b>정리</b> — SetActive(false)는 OnDisable만 부르고 OnDestroy는 안 불러요. 오브젝트가 "완전히 없어지는 것"과 "잠깐 꺼지는 것"은 서로 다른 생명주기예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const toggles = randInt(2, 5);
          return {
            type: 'blank',
            q: `어떤 오브젝트를 <code>SetActive(true)</code>와 <code>SetActive(false)</code>를 번갈아 총 ${toggles}번씩 실행했어요(예: 켜기→끄기를 ${toggles}번 반복). <code>OnEnable()</code>은 총 몇 번 호출됐을까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(toggles)], placeholder: '숫자',
            why: `OnEnable은 SetActive(true)로 활성화될 때마다 실행되므로, ${toggles}번 켰다면 ${toggles}번 호출돼요.`,
            hint: 'OnEnable은 "켜질 때마다" 실행돼요(딱 한 번이 아니에요).'
          };
        },
        () => makeChoice(
          '<code>OnDestroy()</code>가 실행되는 시점은?',
          'Destroy()로 오브젝트가 완전히 사라지기 직전', ['오브젝트가 SetActive(false)로 비활성화될 때', '게임이 시작될 때', '매 프레임마다'],
          'OnDestroy는 오브젝트가 씬에서 완전히 제거되기 직전에 딱 한 번 실행돼요.',
          'SetActive(false)로 잠깐 꺼지는 것과는 다른, "완전히 없어짐"을 뜻해요.'
        ),
        () => makeChoice(
          '<code>Start()</code>와 <code>OnEnable()</code>의 차이로 알맞은 것은?',
          'Start()는 오브젝트가 생성될 때 딱 한 번만 실행되지만, OnEnable()은 활성화될 때마다 반복 실행된다', ['Start()가 OnEnable()보다 항상 나중에 실행된다', 'OnEnable()은 딱 한 번만 실행된다', '둘은 완전히 같은 시점에 실행된다'],
          'Start()는 최초 활성화 시 딱 한 번, OnEnable()은 SetActive(true)로 켜질 때마다 매번 실행돼요.',
          '"처음 한 번"과 "켜질 때마다"의 차이예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>OnDisable()</code> 메서드를 작성해서, 비활성화될 때 <code>Debug.Log("비활성화됨");</code>을 출력하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'void OnDisable()\n{\n    Debug.Log("비활성화됨");\n}',
          accept: ['void OnDisable()\n{\n    Debug.Log("비활성화됨");\n}'],
          why: 'OnDisable() 안에 로그를 출력하면, 비활성화될 때마다 그 로그가 출력돼요.',
          hint: 'void OnDisable() { Debug.Log("비활성화됨"); } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const isDestroy = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `오브젝트를 ${isDestroy ? 'Destroy()로 완전히 없앴어요' : 'SetActive(false)로 잠깐 껐어요(Destroy는 안 했어요)'}. <code>OnDestroy()</code>가 호출될까요? (예/아니오)`,
          prefix: '', suffix: '', accept: [isDestroy ? '예' : '아니오'], placeholder: '예 / 아니오',
          why: isDestroy
            ? 'Destroy()로 완전히 없앴으므로 사라지기 직전에 OnDestroy()가 호출돼요.'
            : 'SetActive(false)는 OnDisable()만 호출하고, OnDestroy()는 호출하지 않아요(오브젝트가 완전히 없어진 게 아니니까요).',
          hint: 'SetActive(false)와 Destroy()는 서로 다른 생명주기 메서드를 호출해요.'
        };
      }
    },
    {
      id: 'nullCheckTryGetComponent',
      title: 'null 체크와 TryGetComponent',
      ready: true,
      summary: '컴포넌트가 없을 때 안전하게 처리하는 null 체크와, 더 간결한 TryGetComponent를 배워요.',
      goals: ['GetComponent 결과 null 체크', 'TryGetComponent로 한 줄에 처리', '왜 TryGetComponent가 더 나은지'],
      blocks: [
        {
          h: '기존 방식: GetComponent + null 체크',
          html: `<p>컴포넌트가 없을 수도 있는 상황에서는, <code>GetComponent</code>의 결과가 <code>null</code>인지 확인한 뒤에 사용해야 안전해요.</p>`,
          code: {
            label: 'null_check.cs',
            lang: 'csharp',
            src: `Rigidbody rb = GetComponent<Rigidbody>();
if (rb != null)
{
    rb.AddForce(Vector3.up);
}`
          }
        },
        {
          h: '더 간결하게: TryGetComponent',
          html: `<p><code>TryGetComponent&lt;T&gt;(out 변수)</code>는 "찾았는지 여부(true/false)"와 "찾은 결과(out 변수)"를 한 번에 처리해줘요. GetComponent + null 체크와 결과는 같지만 더 짧고 안전해요.</p>`,
          code: {
            label: 'try_get_component.cs',
            lang: 'csharp',
            src: `if (TryGetComponent<Rigidbody>(out Rigidbody rb))
{
    rb.AddForce(Vector3.up);
}`
          },
          after: `<div class="note"><b>정리</b> — 두 코드는 결과가 동일하지만, TryGetComponent 쪽이 한 줄로 "찾기"와 "확인"을 동시에 해서 더 간결하고 실수할 여지가 적어요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const hasComponent = Math.random() < 0.5;
          return {
            type: 'blank',
            q: `이 오브젝트에 <code>Rigidbody</code>가 ${hasComponent ? '붙어있을' : '붙어있지 않을'} 때, <code>TryGetComponent<Rigidbody>(out Rigidbody rb)</code>의 반환값은? (참/거짓)`,
            prefix: '', suffix: '', accept: hasComponent ? ['true', '참'] : ['false', '거짓'], placeholder: 'true / false',
            why: hasComponent
              ? '컴포넌트를 실제로 찾았으므로 true를 반환하고, rb에 그 컴포넌트가 담겨요.'
              : '컴포넌트가 없으므로 false를 반환하고, rb는 null이 돼요.',
            hint: 'TryGetComponent는 찾았으면 true, 못 찾았으면 false를 돌려줘요.'
          };
        },
        () => makeChoice(
          '<code>TryGetComponent<T>(out T result)</code>의 반환값(bool)이 뜻하는 것은?',
          '그 타입의 컴포넌트를 찾았는지 여부', ['컴포넌트가 활성화 상태인지 여부', '컴포넌트가 몇 개 붙어있는지', '컴포넌트를 새로 생성했는지 여부'],
          'TryGetComponent는 찾았으면 true, 못 찾았으면 false를 반환해요.',
          '"시도해봤다(try)"의 성공 여부를 알려주는 값이에요.'
        ),
        () => makeChoice(
          '<code>GetComponent</code> + null 체크 대신 <code>TryGetComponent</code>를 쓰는 이유는?',
          '찾기와 null 확인을 한 줄로 더 간결하고 안전하게 처리할 수 있어서', ['TryGetComponent만 private 컴포넌트를 찾을 수 있어서', 'GetComponent는 여러 번 못 부르기 때문에', 'TryGetComponent만 static 컴포넌트에서 동작해서'],
          '결과는 같지만, TryGetComponent가 한 줄로 "찾기"와 "성공 여부 확인"을 동시에 처리해줘요.',
          '기능은 동일하되, 코드가 더 간결해지는 게 핵심 장점이에요.'
        ),
        () => ({
          type: 'code',
          q: '<code>TryGetComponent</code>를 이용해서, <code>Rigidbody</code>를 찾았을 때만 <code>AddForce(Vector3.up)</code>를 호출하는 코드를 작성하세요.',
          starter: '',
          rows: 4,
          placeholder: 'if (TryGetComponent<Rigidbody>(out Rigidbody rb))\n{\n    rb.AddForce(Vector3.up);\n}',
          accept: ['if (TryGetComponent<Rigidbody>(out Rigidbody rb))\n{\n    rb.AddForce(Vector3.up);\n}'],
          why: 'TryGetComponent가 true를 반환할 때만(찾았을 때만) if 블록 안의 코드가 실행돼요.',
          hint: 'if (TryGetComponent<Rigidbody>(out Rigidbody rb)) { rb.AddForce(Vector3.up); } 형태를 그대로 써보세요.'
        }),
      ],
      boss: () => {
        const hasComponent = Math.random() < 0.5;
        return {
          type: 'blank',
          q: `<code>if (TryGetComponent<AudioSource>(out AudioSource source)) { source.Play(); }</code>가 있고, 이 오브젝트에 AudioSource가 ${hasComponent ? '붙어있어요' : '붙어있지 않아요'}. <code>source.Play()</code>가 실제로 호출될까요? (예/아니오)`,
          prefix: '', suffix: '', accept: [hasComponent ? '예' : '아니오'], placeholder: '예 / 아니오',
          why: hasComponent
            ? 'AudioSource가 있으므로 TryGetComponent가 true를 반환해서 if 블록이 실행되고 source.Play()가 호출돼요.'
            : 'AudioSource가 없으므로 TryGetComponent가 false를 반환해서 if 블록이 실행되지 않아요.',
          hint: 'TryGetComponent가 true를 반환해야만 if 블록 안의 코드가 실행돼요.'
        };
      }
    },
    {
      id: 'inspectorAttributes',
      title: '인스펙터 꾸미기: [Range], [Header]',
      ready: true,
      summary: '인스펙터 창에서 값의 범위를 슬라이더로 제한하거나, 항목을 구역별로 나누는 어트리뷰트를 배워요.',
      goals: ['[Range]로 슬라이더 만들기', '[Header]로 섹션 나누기', '인스펙터 어트리뷰트의 목적'],
      blocks: [
        {
          h: '값의 범위 제한하기: [Range]',
          html: `<p><code>[Range(최소, 최대)]</code>를 붙이면 인스펙터에서 그 변수가 슬라이더로 표시되고, 지정한 범위를 벗어난 값을 실수로 넣을 수 없게 돼요.</p>`,
          code: {
            label: 'range_attribute.cs',
            lang: 'csharp',
            src: `[Range(0, 100)]
public int volume = 50;`
          }
        },
        {
          h: '항목 구역 나누기: [Header]',
          html: `<p><code>[Header("제목")]</code>은 인스펙터에서 그 위치에 굵은 제목을 표시해서, 변수가 많을 때 구역을 나눠 보기 쉽게 정리해줘요. 실제 값에는 전혀 영향을 주지 않고, 오직 에디터에서 보기 좋게 꾸미는 용도예요.</p>`,
          code: {
            label: 'header_attribute.cs',
            lang: 'csharp',
            src: `[Header("사운드 설정")]
[Range(0, 100)]
public int volume = 50;

[Header("플레이어 설정")]
public string playerName = "지수";
public int maxHealth = 100;`
          },
          after: `<div class="note"><b>정리</b> — [Range], [Header] 같은 어트리뷰트는 코드의 동작을 바꾸는 게 아니라, 인스펙터에서 값을 더 안전하고 보기 좋게 다룰 수 있게 도와주는 용도예요.</div>`
        }
      ],
      quizGenerators: [
        () => {
          const attempted = pick([150, -10, 50, 200]);
          const clamped = attempted < 0 ? 0 : attempted > 100 ? 100 : attempted;
          return {
            type: 'blank',
            q: `<code>[Range(0, 100)] public int volume = 50;</code>인 상태에서, 인스펙터 슬라이더로 값을 ${attempted}만큼 옮기려고 하면 실제로 저장되는 값은 몇일까요? 숫자만 쓰세요.`,
            prefix: '', suffix: '', accept: [String(clamped)], placeholder: '숫자',
            why: `[Range(0, 100)]은 값을 0~100 사이로 제한하므로, ${attempted}는 ${clamped}로 제한돼요.`,
            hint: '[Range]로 지정한 범위를 벗어난 값은 슬라이더로 만들 수 없어요.'
          };
        },
        () => makeChoice(
          '<code>[Range(0, 100)]</code>의 역할로 알맞은 것은?',
          '인스펙터에서 그 변수를 슬라이더로 표시하고, 값의 범위를 0~100으로 제한한다', ['그 변수의 초기값을 자동으로 50으로 설정한다', '그 변수를 다른 스크립트에서 못 보게 숨긴다', '그 변수를 읽기 전용으로 만든다'],
          '[Range(최소, 최대)]는 인스펙터에서 슬라이더 UI를 만들고, 그 범위를 벗어난 값을 막아줘요.',
          '"범위(range)"라는 이름 그대로, 값의 한계를 정해줘요.'
        ),
        () => makeChoice(
          '<code>[Header("사운드 설정")]</code>의 역할로 알맞은 것은?',
          '인스펙터에서 그 위치에 구역을 나누는 제목을 표시하며, 실제 값에는 영향을 주지 않는다', ['그 변수의 초기값을 "사운드 설정"으로 만든다', '그 변수를 인스펙터에서 숨긴다', '그 변수의 타입을 문자열로 강제한다'],
          '[Header]는 순전히 인스펙터를 보기 좋게 꾸미는 용도로, 코드의 동작이나 값에는 전혀 영향을 주지 않아요.',
          '변수 자체가 아니라, "인스펙터 화면"을 꾸미는 어트리뷰트예요.'
        ),
        () => ({
          type: 'code',
          q: '<code>volume</code>(int, 초기값 50)을 <code>[Range(0, 100)]</code>으로 인스펙터에서 슬라이더로 조정할 수 있게 선언하는 코드를 작성하세요.',
          starter: '',
          rows: 2,
          placeholder: '[Range(0, 100)]\npublic int volume = 50;',
          accept: ['[Range(0, 100)]\npublic int volume = 50;'],
          why: '<code>[Range(최소, 최대)]</code>를 변수 선언 바로 위에 붙여요.',
          hint: '[Range(0, 100)] 다음 줄에 public int volume = 50;을 쓰세요.'
        }),
      ],
      boss: () => {
        const min = 0, max = randInt(50, 100);
        const attempted = randInt(max + 10, max + 50);
        return {
          type: 'blank',
          q: `<code>[Range(${min}, ${max})] public int volume = ${randInt(10, max - 5)};</code>인 상태에서, 인스펙터 슬라이더를 최대한 오른쪽 끝까지 옮기려고 했더니 ${attempted}로 설정하려는 시도가 있었어요. 실제로 저장되는 값은? 숫자만 쓰세요.`,
          prefix: '', suffix: '', accept: [String(max)], placeholder: '숫자',
          why: `[Range(${min}, ${max})]는 슬라이더가 낼 수 있는 값을 ${min}~${max}로 제한하므로, 그보다 큰 값은 설정할 수 없고 최대 ${max}까지만 가능해요.`,
          hint: '슬라이더 자체가 [Range]로 정한 범위를 벗어날 수 없어요.'
        };
      }
    }],
  tierBoss: {
    beginner: () => ({
      type: 'code',
      q: '<code>MonoBehaviour</code>를 상속받는 클래스 <code>PlayerScript</code>를 만드세요. <code>Start()</code>에서 <code>Debug.Log("시작!")</code>을 출력하고, <code>Update()</code>에서 오브젝트를 y축으로 <code>0.1f</code>씩 계속 이동시키는 코드를 작성하세요.',
      starter: '',
      rows: 10,
      placeholder: 'public class PlayerScript : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log("시작!");\n    }\n\n    void Update()\n    {\n        transform.position += new Vector3(0, 0.1f, 0);\n    }\n}',
      accept: ['public class PlayerScript : MonoBehaviour\n{\n    void Start()\n    {\n        Debug.Log("시작!");\n    }\n\n    void Update()\n    {\n        transform.position += new Vector3(0, 0.1f, 0);\n    }\n}'],
      why: 'MonoBehaviour를 상속받아 Start()는 한 번, Update()는 매 프레임 실행되며 위치를 조금씩 이동시켜요.',
      hint: 'public class PlayerScript : MonoBehaviour { } 안에 Start()와 Update() 메서드를 각각 만드세요.'
    }),
    intermediate: () => ({
      type: 'code',
      q: '이동 속도를 나타내는 <code>public float moveSpeed = 5.0f;</code> 변수를 선언하세요. <code>Update()</code> 메서드 안에서 <code>Input.GetKeyDown(KeyCode.Space)</code>이면 <code>Debug.Log("점프!")</code>를 출력하는 코드를 작성하세요.',
      starter: '',
      rows: 8,
      placeholder: 'public float moveSpeed = 5.0f;\n\nvoid Update()\n{\n    if (Input.GetKeyDown(KeyCode.Space))\n    {\n        Debug.Log("점프!");\n    }\n}',
      accept: ['public float moveSpeed = 5.0f;\n\nvoid Update()\n{\n    if (Input.GetKeyDown(KeyCode.Space))\n    {\n        Debug.Log("점프!");\n    }\n}'],
      why: 'moveSpeed는 인스펙터에서 조정 가능한 public 변수이고, Update() 안에서 스페이스바 입력을 매 프레임 확인해요.',
      hint: 'public float moveSpeed = 5.0f;를 먼저 쓰고, Update() 안에 Input.GetKeyDown 체크를 넣으세요.'
    }),
    advanced: () => ({
      type: 'code',
      q: '<code>OnTriggerEnter(Collider other)</code> 메서드를 작성하세요. <code>Debug.Log("아이템 획득: " + other.gameObject.name);</code>을 출력한 뒤, <code>Destroy(other.gameObject);</code>로 그 오브젝트를 없애는 코드를 작성하세요.',
      starter: '',
      rows: 5,
      placeholder: 'void OnTriggerEnter(Collider other)\n{\n    Debug.Log("아이템 획득: " + other.gameObject.name);\n    Destroy(other.gameObject);\n}',
      accept: ['void OnTriggerEnter(Collider other)\n{\n    Debug.Log("아이템 획득: " + other.gameObject.name);\n    Destroy(other.gameObject);\n}'],
      why: 'OnTriggerEnter는 통과 감지에 쓰는 메서드로, 아이템을 먹는 상황에 알맞아요. Destroy로 오브젝트를 없애요.',
      hint: 'void OnTriggerEnter(Collider other) { } 안에 Debug.Log와 Destroy를 순서대로 쓰세요.'
    }),
  }
};
