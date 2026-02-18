import IconButton from '@/shared/ui/IconButton/IconButton';

interface Props {
  isShow?: boolean;
  onClick: () => void;
}

export default function ToNextSectionButton({ isShow = false, onClick }: Props) {
  if (!isShow) return null;

  return (
    <IconButton
      onClick={onClick}
      size="lg"
      icon="IC_Arrow_Down"
      ariaLabel="아래로 스크롤"
      className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2 animate-bounce shadow-2xl lg:hidden"
    />
  );
}
