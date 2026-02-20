import Pang from '@/assets/images/pang_fly.png';
import Woonie from '@/assets/images/woonie_default.png';
import { motion } from 'framer-motion';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

interface ContentContainerProps {
  image: string | StaticImport;
  num: string;
  title: string;
  intro: string;
  favorites: string[];
  hobbies: string[];
}

const ContentContainer = ({
  image,
  num,
  title,
  intro,
  favorites,
  hobbies,
}: ContentContainerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: '-100px' }}
      className="flex w-full flex-col items-center justify-center gap-5 md:flex-row"
    >
      <div className="relative h-60 w-60">
        <Image src={image} alt={title} fill className="object-contain" />
      </div>

      <div className="flex flex-col items-start gap-4">
        <div className="flex-1 space-y-4">
          <div className="text-blue800 inline-flex rounded-full bg-white/70 px-3 py-1 text-[10px] font-bold shadow-[0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-white/70">
            MASCOT {num}
          </div>
          <h2 className="text-3xl font-black tracking-tighter italic">{title}</h2>
          <p className="text-gray600 text-xl leading-relaxed whitespace-pre-wrap">{intro}</p>
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex flex-col gap-1">
            <span className="text-gray800 font-body-md font-semibold">👍 FAVORITE</span>
            <ul className="flex flex-wrap gap-1">
              {favorites.map((favorite, i) => (
                <li
                  key={i}
                  className="bg-blue200 rounded-md px-2 py-0.5 text-[12px] font-medium shadow"
                >
                  {favorite}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray800 font-body-md font-semibold">⭐ HOBBY</span>
            <ul className="flex flex-wrap gap-1">
              {hobbies.map((hobby, i) => (
                <li
                  key={i}
                  className="bg-blue200 rounded-md px-2 py-0.5 text-[12px] font-medium shadow"
                >
                  {hobby}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Section_2() {
  return (
    <section className="bg-blue100 mx-auto py-20">
      <div className="flex flex-col gap-40">
        <ContentContainer
          image={Woonie}
          num="01"
          title="우니 / WOONIE"
          intro={`캠퍼스의 발랄한 마스코트 우니!\n다정하고 엉뚱한 매력으로\n많은 사람들을 웃게 해줘요.`}
          favorites={['부들부들한 담요', '달달한 간식', '따뜻한 햇빛 쬐기']}
          hobbies={['구름 구경하기', '일기 쓰기', '맛있는 거 먹기']}
        />
        <ContentContainer
          image={Pang}
          num="02"
          title="팡이 / PANGI"
          intro={`작지만 똘똘한 요정 팡이!\n솔직하고 에너지가 넘쳐요.\n문제가 생겼다면 팡이를 찾아보세요!`}
          favorites={['타건감 좋은 키보드', '아이스 아메리카노', '계획짜기']}
          hobbies={['정리하기', '할 일 목록 만들기', '맛집 찾아보기']}
        />
      </div>
    </section>
  );
}
