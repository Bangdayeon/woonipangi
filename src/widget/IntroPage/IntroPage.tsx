import Image from 'next/image';

export default function IntroPage() {
  return (
    <main className="flex flex-col items-center gap-10 p-20">
      <section className="w-full rounded-3xl bg-blue-50 p-10">
        <h2 className="mb-4 text-3xl font-bold">우니</h2>
        <div className="flex gap-5">
          <Image src="/Images/woonie_01.png" alt="우니" width={100} height={100} />
          <p>어쩌구저쩌구</p>
        </div>
      </section>
      <section className="w-full rounded-3xl bg-blue-50 p-10">
        <h2 className="mb-4 text-3xl font-bold">팡이</h2>
        <div className="flex gap-5">
          <Image src="/Images/pang_02.png" alt="팡이" width={100} height={100} />
          <p>어쩌구저쩌구</p>
        </div>
      </section>
    </main>
  );
}
