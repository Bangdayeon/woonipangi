import Privacy1 from '@/assets/images/privacy/privacy_1.png';
import Privacy2 from '@/assets/images/privacy/privacy_2.png';
import Privacy3 from '@/assets/images/privacy/privacy_3.png';
import Privacy4 from '@/assets/images/privacy/privacy_4.png';
import Privacy5 from '@/assets/images/privacy/privacy_5.png';
import Privacy6 from '@/assets/images/privacy/privacy_6.png';
import Privacy7 from '@/assets/images/privacy/privacy_7.png';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-5 py-32 md:px-8">
      <div className="mx-auto max-w-2xl">
        {/* 헤더 */}
        <div className="mb-12 space-y-3">
          <h1 className="text-gray800 text-3xl font-bold">개인정보 처리방침</h1>
          <p className="font-body-sm text-gray500">최종 수정일: 2026년 2월 21일</p>
        </div>

        {/* 본문 */}
        <div className="font-body-md text-gray600 space-y-10">
          <Section title="수집하는 개인정보">
            <div className="flex items-center gap-3">
              <Image src={Privacy1} alt="" width={100} height={100} />
              <span>
                본 사이트는 별도의 회원가입 없이 이용 가능하며, 기본적으로 개인정보를 수집하지
                않습니다. 다만 문의 기능 이용 시 이메일 주소가 수집될 수 있습니다.
              </span>
            </div>
          </Section>

          <Section title="개인정보의 이용 목적">
            <div className="flex items-center gap-3">
              <Image src={Privacy2} alt="" width={100} height={100} />
              <span>
                수집된 이메일 주소는 문의에 대한 답변 목적으로만 사용되며, 그 외의 용도로 활용되지
                않습니다.
              </span>
            </div>
          </Section>

          <Section title="개인정보의 보유 및 파기">
            <div className="flex items-center gap-3">
              <Image src={Privacy3} alt="" width={100} height={100} />
              <span>
                문의를 통해 수집된 개인정보는 답변 완료 후 즉시 파기합니다. 관계 법령에 의해 보존이
                필요한 경우에는 해당 기간 동안 안전하게 보관 후 파기합니다.
              </span>
            </div>
          </Section>

          <Section title="개인정보의 제3자 제공">
            <div className="flex items-center gap-3">
              <Image src={Privacy4} alt="" width={100} height={100} />본 사이트는 이용자의
              개인정보를 제3자에게 제공하지 않습니다. 단, 법령에 의한 요청이 있는 경우는 예외로
              합니다.
            </div>
          </Section>

          <Section title="쿠키(Cookie) 사용">
            <div className="flex items-center gap-3">
              <Image src={Privacy5} alt="" width={100} height={100} />
              <span>
                본 사이트는 현재 별도의 쿠키를 사용하지 않습니다. 향후 서비스 개선을 위해 쿠키가
                사용될 경우 본 방침을 통해 안내드립니다.
              </span>
            </div>
          </Section>

          <Section title="이용자의 권리">
            <div className="flex items-center gap-3">
              <Image src={Privacy6} alt="" width={100} height={100} />
              <div>
                <span>
                  이용자는 언제든지 본인의 개인정보 열람, 수정, 삭제를 요청할 수 있습니다. 요청은
                  아래 이메일로 문의해 주세요.
                </span>
                <div className="mt-2">
                  <a
                    href="mailto:dybang00@gmail.com"
                    className="text-blue500 hover:text-blue700 font-semibold underline underline-offset-2 transition-colors"
                  >
                    dybang00@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </Section>

          <Section title="방침 변경 안내">
            <div className="flex items-center gap-3">
              <Image src={Privacy7} alt="" width={100} height={100} />
              <span>
                본 개인정보처리방침은 법령 또는 서비스 변경에 따라 수정될 수 있으며, 변경 시 사이트
                내 공지를 통해 안내합니다.
              </span>
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
      <div className="pt-1 leading-relaxed">{children}</div>
    </div>
  );
}
