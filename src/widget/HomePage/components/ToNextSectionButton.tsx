import IconButton from '@/shared/ui/IconButton/IconButton';

interface Props {
  isShow?: boolean;
  onClick: () => void;
}

/**
 * 3D 섹션은 캔버스가 터치를 잡아 스크롤이 막히므로, 이 버튼이 그 구간의 탈출구다.
 * 크기를 md 아래로 더 줄이지 말 것(이미 44pt 권장치보다 작다).
 */
export default function ToNextSectionButton({ isShow = false, onClick }: Props) {
  if (!isShow) return null;

  return (
    <IconButton
      onClick={onClick}
      size="md"
      icon="IC_Arrow_Down"
      ariaLabel="아래로 스크롤"
      className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 animate-bounce shadow-lg lg:hidden"
    />
  );
}
