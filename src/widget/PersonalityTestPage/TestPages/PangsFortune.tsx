'use client';

interface FortunePageProps {
  title: string;
  description: string;
}

export default function PangsFortune({ title, description }: FortunePageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <p className="mb-6 text-lg">{description}</p>
    </div>
  );
}
