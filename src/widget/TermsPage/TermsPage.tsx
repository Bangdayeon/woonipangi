import { ReactNode } from 'react';

export default function TermsPage() {
  return (
    <main className="min-h-screen px-5 py-32 md:px-8">
      <div className="mx-auto max-w-2xl">
        {/* 헤더 */}
        <div className="mb-12 space-y-3">
          <h1 className="text-gray800 text-3xl font-bold">서비스 이용약관</h1>
          <p className="font-body-sm text-gray500">최종 수정일: 2026년 2월 21일</p>
        </div>

        {/* 본문 */}
        <div className="font-body-md text-gray600 space-y-10">
          <Section title="제1조 목적">
            본 약관은 우니&팡이(이하 &quot;사이트&quot;)이 제공하는 서비스 이용과 관련하여 사이트와
            이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
          </Section>

          <Section title="제2조 서비스 내용">
            본 사이트는 광운대학교 교내 마스코트 캐릭터 우니와 팡이의 이미지 및 소개 콘텐츠를
            제공합니다. 광운대학교 구성원은 교내 부서 홍보 등 비상업적 교내 목적에 한하여 이미지를
            열람하고 적절히 수정하여 사용할 수 있습니다. 이미지 사용 관련 문의는 제작자에게 직접
            연락하거나,{' '}
            <a
              href="https://news.kw.ac.kr/mascot/mascot.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue600 hover:text-blue800 font-semibold underline underline-offset-2 transition-colors"
            >
              광운대학교 홍보팀 공식 페이지
            </a>
            를 참고해 주세요.
          </Section>

          <Section title="제3조 저작권">
            본 사이트에 게시된 캐릭터 디자인, 이미지, 텍스트 등 모든 콘텐츠의 저작권은 제작자에게
            있습니다.
          </Section>

          <Section title="제4조 이용자 의무">
            이용자는 본 사이트를 이용함에 있어 다음 행위를 해서는 안 됩니다.
            <ul className="mt-3 space-y-1.5 pl-4">
              {[
                '콘텐츠의 무단 복제 및 배포',
                '캐릭터 이미지를 정치적 목적, 혐오 표현, 부정적 이미지 훼손 등에 활용하는 행위',
                '사이트 운영을 방해하는 행위',
                '타인의 권리를 침해하는 행위',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="bg-gray600 mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="제5조 면책사항">
            사이트는 천재지변, 서버 장애 등 불가항력적 사유로 인한 서비스 중단에 대해 책임을 지지
            않습니다. 또한 이용자가 본 약관을 위반하여 발생한 문제에 대해서도 책임을 지지 않습니다.
          </Section>

          <Section title="제6조 약관 변경">
            본 약관은 필요에 따라 변경될 수 있으며, 변경 시 사이트 내 공지를 통해 안내합니다.
          </Section>

          <Section title="문의">
            약관에 관한 문의는 아래 이메일로 연락 주세요.
            <div className="mt-2">
              <a
                href="mailto:dybang00@gmail.com"
                className="text-blue600 hover:text-blue800 font-semibold underline underline-offset-2 transition-colors"
              >
                dybang00@gmail.com
              </a>
            </div>
          </Section>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <h2 className="font-title-sm text-gray800">{title}</h2>
      <div className="h-px bg-white/60" />
      <div className="pt-1 leading-relaxed">{children}</div>
    </div>
  );
}
