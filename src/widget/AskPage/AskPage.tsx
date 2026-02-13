import ContactSection from './components/ContactSection';

export default function AskPage() {
  const qnatitlestyle = 'font-body-md font-bold md:text-lg';
  const qnacontentstyle = 'font-body-md md:text-lg whitespace-pre-wrap';

  return (
    <main className="mx-auto my-25 flex min-h-screen w-full flex-col px-10">
      <header className="mb-10">
        <h1 className="text-2xl font-bold md:text-3xl">제작자 문의하기</h1>
      </header>
      <section className="mb-10 md:mb-20">
        <h2 className="text-lg font-bold md:text-xl">Contact</h2>
        <div className="text-gray600 flex flex-col gap-4 p-2 md:gap-2">
          {/* 메일 */}
          <ContactSection title="이메일" url="dybang00@gmail.com" content="dybang00@gmail.com" />
          {/* 인스타 */}
          <ContactSection
            title="인스타그램"
            url="https://www.instagram.com/woonipangi/"
            content="@woonipangi"
          />
          {/* 카카오 오픈채팅방 */}
          <ContactSection
            title="오픈채팅방"
            url="https://open.kakao.com/o/gSg7yHde"
            content="https://open.kakao.com/me/woonipang2"
          />
        </div>
      </section>
      <section className="mb-5">
        <h2 className="mb-3 text-lg font-bold md:text-xl">QnA</h2>
        <div className="flex flex-col gap-4">
          <div className="bg-blue50 flex w-full max-w-200 flex-col gap-2 rounded-2xl px-8 py-6">
            <span className={qnatitlestyle}>Q. 마스코트를 자유롭게 사용해도 되나요?</span>
            <span className={qnacontentstyle}>
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
            <span className={qnatitlestyle}>Q. 누가 우니고 누가 팡이인가요?</span>
            <span className={qnacontentstyle}>
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
