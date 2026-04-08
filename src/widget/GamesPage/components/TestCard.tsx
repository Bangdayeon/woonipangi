import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  href?: string;
  img?: string | StaticImageData;
  bgcolor: string;
}

export default function TestCard({ title, description, href, img, bgcolor }: Props) {
  const cardContent = (
    <div
      className={clsx(
        'flex w-full cursor-pointer flex-col items-center justify-center rounded-xl p-4 transition-all duration-200 hover:scale-102 md:h-80 md:w-60',
        bgcolor
      )}
    >
      <div className="flex flex-col items-center">
        <header className="font-title-md mb-2">{title}</header>
        {img && <Image src={img} alt={title} width={120} height={120} />}
        <p className="font-body-md mt-2 text-center whitespace-pre-wrap">{description}</p>
      </div>
    </div>
  );

  return href ? <Link href={href}>{cardContent}</Link> : cardContent;
}
