import TestCard from './components/TestCard';

const tests = [
  {
    id: 'pangpang',
    title: '나는 어떤 팡팡이일까?',
    description: '어쩌구저쩌구',
    bgcolor: 'bg-yellow200',
  },
  {
    id: 'university',
    title: '대학생 유형 테스트',
    description: '어쩌구저쩌구',
    bgcolor: 'bg-blue200',
  },
  {
    id: 'fortune',
    title: '팡이의 마법의 소라고동',
    description: '어쩌구저쩌구',
    bgcolor: 'bg-purple-300',
  },
  {
    id: 'building',
    title: '내게 맞는 광운대 건물',
    description: '어쩌구저쩌구',
    bgcolor: 'bg-green100',
  },
];

export default function PersonalityTestPage() {
  return (
    <main className="mx-auto mt-25 flex min-h-screen w-full flex-col items-center px-4">
      <div className="w-full md:max-w-200 lg:max-w-300">
        <h1 className="mb-5 text-2xl font-bold md:text-3xl">성격 테스트</h1>
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
          {tests.map(test => (
            <TestCard
              key={test.id}
              href={`/personality-test/${test.id}`}
              title={test.title}
              description={test.description}
              bgcolor={test.bgcolor}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
