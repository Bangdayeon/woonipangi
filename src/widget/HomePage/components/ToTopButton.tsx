import IconButton from "@/shared/ui/IconButton/IconButton";

interface Props {
  isShow?: boolean;
  onClick: ()=>void;
}

export default function ToTopButton({isShow=false, onClick}:Props) {
  if (!isShow) return null;

  return (
    <IconButton
      onClick={onClick}
      variant="secondary"
      size="lg"
      icon="IC_Arrow_Up"
      ariaLabel="위로 스크롤"
      className="fixed right-5 bottom-10 z-50 shadow-2xl"
    />
  );
}