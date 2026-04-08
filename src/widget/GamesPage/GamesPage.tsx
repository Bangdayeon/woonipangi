import { tests } from '@/data/tests';

import TestCard from './components/TestCard';

export default function GamesPage() {
  return (
    <main className="mx-auto mt-25 flex min-h-screen w-full flex-col items-center px-4">
      <div className="w-full md:max-w-200 lg:max-w-300">
        <h1 className="mb-5 text-2xl font-bold md:text-3xl">심심풀이</h1>
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
          {tests.map(test => (
            <TestCard
              key={test.id}
              href={`/games/${test.id}`}
              title={test.title}
              description={test.description}
              img={test.img}
              bgcolor={test.bgcolor}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
