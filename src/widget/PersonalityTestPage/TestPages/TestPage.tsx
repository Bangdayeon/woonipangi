'use client';

interface TestPageProps {
  title: string;
  description: string;
}

export default function TestPage({ title, description }: TestPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <p className="text-lg">{description}</p>

      {/* 필요 시 추가 질문이나 버튼 */}
    </div>
  );
}
