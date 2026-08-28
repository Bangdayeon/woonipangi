import { Quiz } from '@/types/quiz.types';

/**
 * 내가 광운대 건물이라면
 * - 사람을 건물로 모에화하는 컨셉. 결과는 "나와 어울리는 건물"이 아니라 "건물이 된 나"다.
 *   결과 문구는 독자를 그 건물 자체로 부르는 2인칭으로 쓴다.
 *
 * 채점 규칙
 * - 선택지마다 결과 id에 가중치를 더하고, 총점이 가장 높은 결과가 나온다.
 * - 동점이면 results 배열에서 먼저 선언된 결과가 이긴다.
 *
 * 점수 균형 (문항을 고칠 때 반드시 유지할 것)
 * - 모든 결과는 주 점수(+2)로 정확히 8개 선택지, 보조 점수(+1)로 정확히 2개 선택지에 등장한다.
 * - 20문항 x 4선택지 = 80슬롯이고 결과 10개가 8번씩 나눠 가지면 정확히 떨어진다.
 * - 따라서 결과별 최대 점수는 18점으로 모두 같고, 특정 건물이 구조적으로 유리해지지 않는다.
 * - 보조 점수는 동점을 흩어주는 역할이다. 전부 +2만 쓰면 점수가 짝수뿐이라 동점이 잦아진다.
 */
export const kwBuilding: Quiz = {
  id: 'kw-building',
  title: '내가 광운대 건물이라면',
  description: '20문항으로 알아보는\n건물로 태어난 나',
  bgcolor: 'bg-yellow200',
  intro: {
    headline: '내가 건물로 태어났다면?',
    body: '20개의 질문에 답하면 내가 광운대의 어떤 건물인지 알려드려요.\n캠퍼스에 서 있는 10개 건물 중 하나가 나옵니다.',
    startLabel: '시작하기',
  },
  questions: [
    {
      id: 'q1',
      text: '수강신청하는 날이다! 수강신청 하는 내 모습은?',
      choices: [
        {
          id: 'a',
          label: '나는 수강신청의 신. 원하는 수업은 다 가진다.',
          scores: { hwado: 2 },
        },
        {
          id: 'b',
          label: '다 털렸는데 강의계획서 다 뒤져서 빈자리를 찾아낸다',
          scores: { bima: 2, saebit: 1 },
        },
        { id: 'c', label: '졸업요건? 그게 뭐지? 내가 듣고 싶은 것만 담는다', scores: { okui: 2 } },
        { id: 'd', label: '생각없이 ', scores: { library: 2 } },
      ],
    },
    {
      id: 'q2',
      text: '과 사람들이랑 술자리, 새벽 두 시쯤 나는?',
      choices: [
        {
          id: 'a',
          label: '아직도 제일 크게 웃고 있다',
          scores: { bokji: 2, nocheon: 1 },
        },
        { id: 'b', label: '조용히 계산하고 택시까지 잡아주고 있다', scores: { chambit: 2 } },
        { id: 'c', label: '취한 애들 물 떠다 주고 있다', scores: { hanul: 2 } },
        { id: 'd', label: '갑자기 진지한 얘기를 꺼내서 분위기를 바꾼다', scores: { nuri: 2 } },
      ],
    },
    {
      id: 'q3',
      text: '새벽 3시, 나는?',
      choices: [
        { id: 'a', label: '창 열두 개 띄워놓고 아직 과제 중이다', scores: { saebit: 2, bima: 1 } },
        { id: 'b', label: '아직도 밖에서 놀고 있다', scores: { nocheon: 2 } },
        { id: 'c', label: '진작에 다 끝내고 잤다', scores: { hwado: 2 } },
        {
          id: 'd',
          label: '뭔가 잘못됐다는 걸 깨닫고 처음부터 다시 뜯어보는 중',
          scores: { bima: 2 },
        },
      ],
    },
    {
      id: 'q4',
      text: '조별 과제에서 내 역할은?',
      choices: [
        { id: 'a', label: '내 파트는 아무도 못 건드리게 혼자 끝낸다', scores: { okui: 2 } },
        { id: 'b', label: '말은 없는데 자료를 제일 많이 찾아온다', scores: { library: 2 } },
        { id: 'c', label: '단톡방 분위기를 살리고 뒤풀이를 잡는다', scores: { bokji: 2 } },
        { id: 'd', label: '결국 마지막에 전체를 합치는 사람', scores: { chambit: 2, hwado: 1 } },
      ],
    },
    {
      id: 'q5',
      text: '시험 끝난 날 저녁 계획은?',
      choices: [
        {
          id: 'a',
          label: '친구 기분 살펴서 가고 싶어 하는 데로 간다',
          scores: { hanul: 2, library: 1 },
        },
        { id: 'b', label: '아무도 안 가본 이상한 데를 가자고 한다', scores: { nuri: 2 } },
        { id: 'c', label: '미뤄둔 사이드 프로젝트를 켠다', scores: { saebit: 2 } },
        { id: 'd', label: '일단 밖에 자리 펴고 치맥', scores: { nocheon: 2 } },
      ],
    },
    {
      id: 'q6',
      text: '같은 수업 듣는 사람이 나를 이렇게 말한다.',
      choices: [
        { id: 'a', label: '"쟤 필기 봤어? 사람이 좀 빈틈이 없어"', scores: { hwado: 2 } },
        { id: 'b', label: '"쟤는 무슨 생각 하고 사는지 모르겠어"', scores: { okui: 2, nuri: 1 } },
        { id: 'c', label: '"쟤 모르는 사람이 이 학교에 있나?"', scores: { bokji: 2 } },
        { id: 'd', label: '"쟤한테 물어보면 다 알려줘"', scores: { hanul: 2 } },
      ],
    },
    {
      id: 'q7',
      text: '과제가 콱 막혔을 때 나는?',
      choices: [
        { id: 'a', label: '될 때까지 붙잡고 밤을 샌다', scores: { saebit: 2 } },
        { id: 'b', label: '구조를 처음부터 다시 뜯어본다', scores: { bima: 2, okui: 1 } },
        { id: 'c', label: '일단 덮어두고 딴생각하다가 답을 찾는다', scores: { library: 2 } },
        { id: 'd', label: '흩어진 것들을 모아서 정리부터 한다', scores: { chambit: 2 } },
      ],
    },
    {
      id: 'q8',
      text: '갑자기 하루가 통째로 비었다.',
      choices: [
        { id: 'a', label: '아무 데나 가는 지하철을 탄다', scores: { nuri: 2, library: 1 } },
        { id: 'b', label: '나가서 사람들부터 불러 모은다', scores: { nocheon: 2 } },
        { id: 'c', label: '밀린 정리랑 청소를 싹 한다', scores: { hwado: 2 } },
        { id: 'd', label: '혼자 카페에서 하루 종일 있는다', scores: { library: 2 } },
      ],
    },
    {
      id: 'q9',
      text: '시험기간, 내가 앉은 자리는?',
      choices: [
        { id: 'a', label: '나만 아는 순서로 자료가 쌓여 있다', scores: { bima: 2 } },
        {
          id: 'b',
          label: '어느새 아는 얼굴들이 옆에 다 와 앉는다',
          scores: { bokji: 2, nocheon: 1 },
        },
        { id: 'c', label: '공부랑 상관없는 물건이 하나씩 늘어난다', scores: { nuri: 2 } },
        { id: 'd', label: '노트북, 보조배터리, 케이블이 전부다', scores: { saebit: 2 } },
      ],
    },
    {
      id: 'q10',
      text: '동기가 성적 보고 멘탈 나갔다고 연락이 왔다.',
      choices: [
        { id: 'a', label: '내가 겪은 얘기를 담담하게 해준다', scores: { okui: 2 } },
        {
          id: 'b',
          label: '재수강이랑 다음 학기 계획까지 같이 짜준다',
          scores: { chambit: 2, hwado: 1 },
        },
        { id: 'c', label: '"일단 나와" 하고 불러낸다', scores: { nocheon: 2 } },
        { id: 'd', label: '무조건 편들어주고 같이 욕해준다', scores: { hanul: 2 } },
      ],
    },
    {
      id: 'q11',
      text: '종강 날, 스토리에 한 장 올린다면?',
      choices: [
        { id: 'a', label: '각 잡고 찍은 캠퍼스 사진', scores: { hwado: 2 } },
        { id: 'b', label: '과 사람들이랑 우르르 찍은 단체 사진', scores: { bokji: 2 } },
        { id: 'c', label: '새벽까지 켜져 있던 과제 화면', scores: { saebit: 2, bima: 1 } },
        { id: 'd', label: '아무도 모를 노래 가사 한 줄', scores: { library: 2 } },
      ],
    },
    {
      id: 'q12',
      text: 'MT에서 나는?',
      choices: [
        { id: 'a', label: '게임 규칙을 이상하게 파고들고 있다', scores: { bima: 2 } },
        { id: 'b', label: '구석에서 내 할 거 하고 있다', scores: { okui: 2 } },
        { id: 'c', label: '취한 사람들 챙기고 있다', scores: { hanul: 2, bokji: 1 } },
        { id: 'd', label: '제일 신나서 뛰어다닌다', scores: { nocheon: 2 } },
      ],
    },
    {
      id: 'q13',
      text: '과 사람들이 나한테 자주 하는 부탁은?',
      choices: [
        { id: 'a', label: '"이번 조는 네가 조장 좀 해줘"', scores: { chambit: 2, bokji: 1 } },
        { id: 'b', label: '"아까 그 아이디어 한 번만 더 말해줘"', scores: { nuri: 2 } },
        { id: 'c', label: '"PPT 좀 봐줘, 네가 만지면 깔끔해져"', scores: { hwado: 2 } },
        { id: 'd', label: '"이번 모임 인원 좀 모아줘"', scores: { bokji: 2 } },
      ],
    },
    {
      id: 'q14',
      text: '마음이 제일 편해지는 공간은?',
      choices: [
        { id: 'a', label: '조용하고 책 냄새 나는 곳', scores: { library: 2, hanul: 1 } },
        { id: 'b', label: '밤새 불이 켜져 있는 곳', scores: { saebit: 2 } },
        { id: 'c', label: '향기 좋고 따뜻한 곳', scores: { hanul: 2 } },
        { id: 'd', label: '구조가 복잡해서 파볼 게 많은 곳', scores: { bima: 2 } },
      ],
    },
    {
      id: 'q15',
      text: '교양 수업 첫 조모임, 자기소개 차례가 왔다.',
      choices: [
        { id: 'a', label: '이름이랑 학과만 말하고 끝낸다', scores: { okui: 2 } },
        { id: 'b', label: '농담부터 던져서 분위기를 푼다', scores: { nocheon: 2, hanul: 1 } },
        { id: 'c', label: '소개는 짧게 하고 역할 분담 얘기를 꺼낸다', scores: { chambit: 2 } },
        { id: 'd', label: '첫마디부터 예상 밖의 말을 한다', scores: { nuri: 2 } },
      ],
    },
    {
      id: 'q16',
      text: '팀플 결과물을 제출하기 직전, 제일 신경 쓰이는 건?',
      choices: [
        { id: 'a', label: '오탈자 하나 없이 깔끔해 보이는 것', scores: { hwado: 2 } },
        { id: 'b', label: '팀원 중에 서운한 사람이 없는 것', scores: { hanul: 2 } },
        { id: 'c', label: '나 스스로 납득이 되는 결과물인 것', scores: { library: 2 } },
        {
          id: 'd',
          label: '어쨌든 마감 시간 안에 제출되는 것',
          scores: { saebit: 2, chambit: 1 },
        },
      ],
    },
    {
      id: 'q17',
      text: '동아리를 고른다면?',
      choices: [
        { id: 'a', label: '뭔가 직접 만드는 곳', scores: { bima: 2, saebit: 1 } },
        { id: 'b', label: '오래됐고 체계가 잡힌 곳', scores: { chambit: 2 } },
        { id: 'c', label: '사람 많고 시끌시끌한 곳', scores: { bokji: 2 } },
        { id: 'd', label: '아무도 안 하는 걸 하는 곳', scores: { okui: 2 } },
      ],
    },
    {
      id: 'q18',
      text: '축제 날 나는?',
      choices: [
        { id: 'a', label: '무대 말고 구석의 이상한 부스에 가 있다', scores: { nuri: 2 } },
        { id: 'b', label: '잔디밭에 자리 잡고 끝까지 논다', scores: { nocheon: 2 } },
        { id: 'c', label: '잠깐 구경만 하고 조용히 빠진다', scores: { hwado: 2, chambit: 1 } },
        { id: 'd', label: '친구들 짐 들어주고 챙기고 있다', scores: { hanul: 2 } },
      ],
    },
    {
      id: 'q19',
      text: '졸업하고 제일 기억날 것 같은 건?',
      choices: [
        { id: 'a', label: '혼자 걷던 캠퍼스', scores: { library: 2, nuri: 1 } },
        { id: 'b', label: '같이 몰려다니던 사람들', scores: { bokji: 2 } },
        { id: 'c', label: '밤새 켜져 있던 모니터', scores: { saebit: 2 } },
        { id: 'd', label: '내가 책임졌던 일들', scores: { chambit: 2 } },
      ],
    },
    {
      id: 'q20',
      text: '졸업할 때 후배들이 나를 이렇게 기억했으면 좋겠다.',
      choices: [
        { id: 'a', label: '"그 선배는 한번 잡으면 끝을 보더라"', scores: { bima: 2 } },
        { id: 'b', label: '"그 선배는 자기 길이 확실했어"', scores: { okui: 2 } },
        { id: 'c', label: '"그 선배는 진짜 예측이 안 됐어"', scores: { nuri: 2, okui: 1 } },
        { id: 'd', label: '"그 선배랑 있으면 무조건 재밌었어"', scores: { nocheon: 2 } },
      ],
    },
  ],
  results: [
    {
      id: 'hwado',
      name: '화도관',
      headline: '겉은 삐까뻔쩍, 속은 서늘한 건물',
      description:
        '잔디밭 앞에 우람하게 자리 잡은 네모난 몸. 어디 하나 흐트러진 데가 없다.\n예쁘고 번쩍이는데 아무나 편하게 못 들어온다. 총장실을 품고 있는 건물의 품격이란 게 있으니까.\n안쪽까지 들어와 본 사람만 네가 의외로 따뜻하다는 걸 안다.',
      traits: ['#완벽주의', '#차가운_첫인상', '#격식파'],
      matchId: 'chambit',
      clashId: 'nocheon',
      bgcolor: 'bg-gray200',
    },
    {
      id: 'bima',
      name: '비마관',
      headline: '들어오면 길을 잃게 만드는 건물',
      description:
        '네 안은 미로다. 처음 들어온 사람은 반드시 한 번쯤 층을 헤맨다.\n복잡한 걸 부끄러워하지 않는다. 네 구조를 다 외운 애들만 남고, 그런 애들이 유독 단단해진다.\n던전 소리를 듣지만 여기서 살아남은 공대생은 어디 가서도 살아남는다.',
      traits: ['#던전_공략러', '#공대감성', '#끝을_봐야_함'],
      matchId: 'saebit',
      clashId: 'hanul',
      bgcolor: 'bg-green200',
    },
    {
      id: 'okui',
      name: '옥의관',
      headline: '자기 세계가 확실한 건물',
      description:
        '밖에서 보면 안에서 무슨 일이 벌어지는지 잘 안 보인다. 굳이 알려줄 생각도 없다.\n남들이 뭘 하든 네 안에서는 네 실험이 네 속도로 돌아간다.\n조용해 보여도 안에서는 계속 뭔가가 끓고 있다.',
      traits: ['#마이페이스', '#자기세계', '#설명_생략'],
      matchId: 'nuri',
      clashId: 'bokji',
      bgcolor: 'bg-skyblue100',
    },
    {
      id: 'library',
      name: '중앙도서관',
      headline: '겉은 조용, 속은 시끄러운 건물',
      description:
        '한 몸 안에 왁자지껄한 층과 숨소리도 조심하는 층이 같이 있다.\n밖에서 보면 잠잠한데 네 안에서는 온갖 생각과 감정이 층마다 따로 돌아간다.\n사람들이 네 안에 들어와서 각자 조용해지는 걸 보면, 품이 꽤 넓다는 뜻이다.',
      traits: ['#INFP', '#겉조용_속시끌', '#혼자_있는_시간'],
      matchId: 'hanul',
      clashId: 'nocheon',
      bgcolor: 'bg-blue100',
    },
    {
      id: 'bokji',
      name: '복지관',
      headline: '낡았는데 사람이 안 끊기는 건물',
      description:
        '벽도 바닥도 세월이 다 보인다. 그런데 사람은 네가 제일 많다.\n동아리방 특유의 그 냄새와 편안함이 곧 너다. 새 건물이 아무리 올라가도 다들 결국 여기로 온다.\n반짝이지 않는데도 늘 붐비는 건물, 그거 아무나 되는 게 아니다.',
      traits: ['#인싸', '#정이_많음', '#여기가_편해'],
      matchId: 'nocheon',
      clashId: 'okui',
      bgcolor: 'bg-yellow200',
    },
    {
      id: 'chambit',
      name: '참빛관',
      headline: '가장 안쪽에서 무게를 잡는 건물',
      description:
        '캠퍼스 제일 안쪽에 크고 듬직하게 서 있다. 거기까지 걸어오게 만드는 무게가 있다.\n교수님 연구실을 잔뜩 품고 있어서인지, 네 안에 들어오면 다들 목소리를 한 톤 낮춘다.\n요란한 데가 하나도 없는데 아무도 너를 가볍게 보지 않는다.',
      traits: ['#듬직함', '#총대_담당', '#무게감'],
      matchId: 'hwado',
      clashId: 'nuri',
      bgcolor: 'bg-blue200',
    },
    {
      id: 'hanul',
      name: '한울관',
      headline: '향기부터 다른 건물',
      description:
        '문이 열리는 순간 공기가 다르다. 남자밖에 없다는 이 학교에서 네 안만 향기가 난다.\n문과가 전부 여기 모여 있어서인지 분위기가 부드럽고 오가는 말소리도 둥글다.\n에겐 건물 소리 들어도 억울해할 것 없다. 다들 네 안에서 제일 편해하니까.',
      traits: ['#에겐', '#다정함', '#좋은_향기'],
      matchId: 'library',
      clashId: 'bima',
      bgcolor: 'bg-red100',
    },
    {
      id: 'nuri',
      name: '누리관',
      headline: '혼자 섬에 떨어져 있는 건물',
      description:
        '누리섬에 혼자 뚝 떨어져 있다. 본관 무리에 끼지 않고 네 궤도를 돈다.\n오는 길부터 이미 다른 세계로 넘어가는 기분이라, 네 안을 드나드는 애들도 어딘가 특이해진다.\n사차원 소리를 칭찬으로 알아듣는 몇 안 되는 건물.',
      traits: ['#사차원', '#예측불가', '#혼자만의_궤도'],
      matchId: 'okui',
      clashId: 'hwado',
      bgcolor: 'bg-green100',
    },
    {
      id: 'saebit',
      name: '새빛관',
      headline: '밤에 불이 안 꺼지는 건물',
      description:
        '제일 새로 지어졌는데 불은 제일 늦게 꺼진다.\n해가 지면 과제 좀비들이 네 복도를 돌아다니고, 새벽 세 시에도 어느 층인가는 켜져 있다.\n낮보다 밤에 진짜 네 모습이 나온다.',
      traits: ['#밤샘러', '#코딩공대생', '#과제좀비'],
      matchId: 'bima',
      clashId: 'nocheon',
      bgcolor: 'bg-skyblue200',
    },
    {
      id: 'nocheon',
      name: '노천극장',
      headline: '지붕도 벽도 없는 건물',
      description:
        '지붕이 없다. 벽도 없다. 그래서 제일 잘 논다.\n축제도 치맥도 전부 네 자리에서 시작되고, 굳이 안으로 들어갈 필요가 없으니 다들 그냥 앉는다.\n건물 축에 못 낀다는 소리를 들어도 상관없다. 제일 자유롭고 제일 귀여우니까.',
      traits: ['#자유로움', '#치맥', '#축제인간'],
      matchId: 'bokji',
      clashId: 'hwado',
      bgcolor: 'bg-yellow100',
    },
  ],
};
