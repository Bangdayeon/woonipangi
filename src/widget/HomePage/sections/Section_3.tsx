import Link from 'next/link';

const links = [
  { label: '인스타그램', href: 'https://www.instagram.com/woonipang2', external: true },
  { label: '서비스 이용약관', href: '/terms', external: false },
  { label: '개인정보 처리방침', href: '/privacy', external: false },
];

export default function Section_3() {
  return (
    <section className="flex flex-col items-center space-y-12 py-32 text-center">
      <div className="space-y-4">
        <p className="text-gray800 text-xs leading-relaxed font-bold tracking-widest uppercase">
          Designed for University Identity <br />© 2026 wooniepangi All rights reserved.
        </p>
        <div className="flex justify-center gap-6 pt-4">
          {links.map(({ label, href, external }) =>
            external ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray500 hover:text-gray700 text-[10px] font-black tracking-widest uppercase transition-colors"
              >
                {label}
              </a>
            ) : (
              <Link
                key={label}
                href={href}
                className="text-gray500 hover:text-gray700 text-[10px] font-black tracking-widest uppercase transition-colors"
              >
                {label}
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}
