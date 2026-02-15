import LinkButton from '@/shared/ui/LinkButton/LinkButton';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700">페이지를 찾을 수 없습니다</h2>
      <p className="text-gray-600">URL이 올바른지 확인해주세요!</p>
      <LinkButton label="메인 페이지로 돌아가기" href="/" />
    </div>
  );
}
