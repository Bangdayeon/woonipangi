import Section_1 from './sections/Section_1';
import Section_2 from './sections/Section_2';
import Section_3 from './sections/Section_3';

export default function IntroPage() {
  return (
    <main className="mx-auto mt-25 flex min-h-screen w-full flex-col items-center px-4">
      <div className="w-full md:max-w-200 lg:max-w-300">
        <h1 className="mb-5 text-2xl font-bold md:text-3xl">마스코트 소개</h1>
      </div>
      <Section_1 />
      <Section_2 />
      <Section_3 />
    </main>
  );
}
