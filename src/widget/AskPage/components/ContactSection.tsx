import Instagram from '@/assets/images/insta.png';
import Kakao from '@/assets/images/kakao.png';
import SVGIcon from '@/shared/ui/Icon/SVGIcon';
import Image from 'next/image';

interface Props {
  title: string;
  content: string;
  url: string;
}

export default function ContactSection({ title, url, content }: Props) {
  const isEmail = title === '이메일';
  const isInstagram = title === '인스타그램';
  const isKakao = title === '오픈채팅방';

  return (
    <div className="flex flex-col items-start gap-0 md:flex-row md:items-center md:gap-3">
      <div className="flex items-center gap-1">
        {isEmail ? (
          <SVGIcon icon="IC_Mail" aria-hidden={true} />
        ) : isInstagram ? (
          <Image src={Instagram} alt={title} width={18} height={18} aria-hidden={true} />
        ) : isKakao ? (
          <Image src={Kakao} alt={title} width={18} height={18} aria-hidden={true} />
        ) : (
          <div className="h-4.5 w-4.5 rounded-sm bg-gray-200" aria-hidden="true" />
        )}
        <p className="font-body-md">{title}</p>
      </div>
      <a
        className="font-body-md"
        target="_blank"
        rel="noopener noreferrer"
        href={isEmail ? `mailto:${url}` : url}
      >
        {content}
      </a>
    </div>
  );
}
