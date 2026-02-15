import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/images/loading_pang.gif"
          alt="로딩중"
          width={70}
          height={70}
          priority
          unoptimized
        />
        <p className="text-gray-600">로딩중...</p>
      </div>
    </div>
  );
}
