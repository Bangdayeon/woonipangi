import Modal from '@/shared/ui/Modal/Modal';
import Image from 'next/image';

export default function CardModal({
  image,
  title,
  tmi,
}: {
  image: string;
  title: string;
  tmi?: string;
}) {
  return (
    <Modal type="CARDMORE" ariaLabel={`${title} 내용 자세히 보기`}>
      <div className="flex w-full max-w-[80vw] flex-col gap-2 p-4 lg:max-w-300">
        <h1 className="font-title-md w-fit">{title}</h1>
        <div className="relative aspect-square max-h-[70vh] min-h-60 w-full md:max-h-150">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 80vw, 600px"
          />
        </div>
        <p className="text-gray700 font-body-md w-full whitespace-pre-wrap">{tmi}</p>
      </div>
    </Modal>
  );
}
