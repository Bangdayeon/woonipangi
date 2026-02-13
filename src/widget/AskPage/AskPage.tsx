import Instagram from '@/assets/images/insta.png';
import Kakao from '@/assets/images/kakao.png';
import SVGIcon from '@/shared/ui/Icon/SVGIcon';
import Image from 'next/image';

export default function AskPage() {
  return (
    <main className="mx-auto my-25 flex min-h-screen w-full flex-col px-10">
      <header className="mb-10">
        <h1 className="text-2xl font-bold md:text-3xl">제작자 문의하기</h1>
      </header>
      <section className="mb-20">
        <h2 className="text-lg font-bold md:text-xl">Contact</h2>
        <div className="text-gray600 flex flex-col gap-2 p-2">
          {/* 메일 */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <SVGIcon icon="IC_Mail" aria-hidden={true} />
              <p className="font-body-md">이메일</p>
            </div>
            <a className="font-body-md" href="mailto:dybang00@gmail.com">
              dybang00@gmail.com
            </a>
          </div>
          {/* 인스타 */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Image
                src={Instagram}
                alt="인스타 아이콘"
                width={18}
                height={18}
                aria-hidden={true}
              />
              <p className="font-body-md">인스타그램</p>
            </div>
            <a
              className="font-body-md"
              href="https://www.instagram.com/woonipang2"
              target="_blank"
              rel="noopener noreferrer"
            >
              @woonipang2
            </a>
          </div>
          {/* 카카오 오픈채팅방 */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Image src={Kakao} alt="카카오톡 아이콘" width={18} height={18} aria-hidden={true} />
              <p className="font-body-md">오픈채팅</p>
            </div>
            <a className="font-body-md" href="https://open.kakao.com/o/suCN4lgi">
              https://open.kakao.com/o/suCN4lgi
            </a>
          </div>
        </div>
      </section>
      <section className="mb-5">
        <h2 className="mb-3 text-lg font-bold md:text-xl">QnA</h2>
        <div className="flex flex-col gap-4">
          <div className="bg-blue50 flex w-full max-w-200 flex-col gap-2 rounded-2xl px-8 py-6">
            <span className="font-title-md">Q. 마스코트를 자유롭게 사용해도 되나요?</span>
            <span className="font-body-lg">
              마스코트는 자유롭게 수정/변형하여 사용 가능합니다.
              <br />
              다만{' '}
              <span className="font-semibold">
                혐오, 차별, 비하 등의 사회적 갈등을 조장하는 콘텐츠는 금지
              </span>
              됩니다.
              <br />
              마스코트의 본래 상징성을 훼손하거나 부정적인 인상을 줄 수 있는 용도로 사용하지
              말아주세요.
            </span>
          </div>
          <div className="bg-blue50 flex w-full max-w-200 flex-col gap-2 rounded-2xl px-8 py-6">
            <span className="font-title-md">Q. 누가 우니고 누가 팡이인가요?</span>
            <span className="font-body-lg">
              커다란 애가 우니고, 작은 애가 팡이입니다.
              <br />
              &apos;팡이&apos;가 더 작은 느낌이어서 작은 애가 팡이가 되었습니다.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
