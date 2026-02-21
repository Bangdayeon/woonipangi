import { ReactNode } from 'react';

import ContactSection from './components/ContactSection';

function QnACard({ question, answer }: { question: string; answer: ReactNode }) {
  const qnaTitleStyle = 'font-body-md font-bold md:text-lg';
  const qnaContentStyle = 'font-body-md md:text-lg';

  return (
    <dl className="bg-blue50 flex w-full flex-col gap-2 rounded-2xl px-8 py-6">
      <dt className={qnaTitleStyle}>Q. {question}</dt>
      <dd className={qnaContentStyle}>{answer}</dd>
    </dl>
  );
}

export default function AskPage() {
  return (
    <main className="mx-auto mt-25 flex min-h-screen w-full flex-col items-center px-4">
      <div className="w-full md:max-w-200 lg:max-w-300">
        <h1 className="mb-5 text-2xl font-bold md:text-3xl">제작자 문의하기</h1>
        <section className="mb-10 md:mb-20">
          <h2 className="text-lg font-bold md:text-xl">Contact</h2>
          <div className="text-gray600 flex flex-col gap-4 p-2 md:gap-2">
            {/* 메일 */}
            <ContactSection title="이메일" url="dybang00@gmail.com" content="dybang00@gmail.com" />
            {/* 인스타 */}
            <ContactSection
              title="인스타그램"
              url="https://www.instagram.com/woonipang2"
              content="@woonipang2"
            />
            {/* 카카오 오픈채팅방 */}
            <ContactSection
              title="오픈채팅방"
              url="https://open.kakao.com/me/woonipang2"
              content="카카오톡 오픈채팅방"
            />
          </div>
        </section>
        <section className="mb-5 w-full">
          <h2 className="mb-3 text-lg font-bold md:text-xl">QnA</h2>
          <div className="flex w-full flex-col gap-4">
            <QnACard
              question="마스코트를 자유롭게 사용해도 되나요?"
              answer={
                <>
                  <p>마스코트는 자유롭게 수정/변형하여 사용 가능합니다.</p>
                  <p>
                    다만 <strong>혐오, 차별, 비하 등의 사회적 갈등을 조장하는 콘텐츠는 금지</strong>
                    됩니다.
                  </p>
                  <p>
                    마스코트의 본래 상징성을 훼손하거나 부정적인 인상을 줄 수 있는 용도로 사용하지
                    말아주세요.
                  </p>
                </>
              }
            />

            <QnACard
              question="누가 우니고 누가 팡이인가요?"
              answer={
                <>
                  <p> 커다란 애가 우니고, 작은 애가 팡이입니다.</p>
                  <p>&apos;팡이&apos;가 더 작은 느낌이어서 작은 애가 팡이가 되었습니다.</p>
                </>
              }
            />
          </div>
        </section>
      </div>
    </main>
  );
}
