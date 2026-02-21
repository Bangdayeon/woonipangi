import LoadingPang from '@/assets/images/loading_pang.gif';
import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <Image src={LoadingPang} alt="" width={70} height={70} priority unoptimized />
        <p className="text-gray600">로딩중...</p>
      </div>
    </div>
  );
}
