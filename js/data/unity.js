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
