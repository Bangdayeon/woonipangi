import Image from "next/image"
import { motion } from 'framer-motion';

const ContentContainer = (image:string, num: string, title:string, intro:string, favorites:string[], hobbies:string[]) => {
  return(
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: '-100px' }}
      className="flex w-full justify-center gap-5 flex-col md:flex-row items-center"
    >
      <div className="relative w-60 h-60">
        <Image src={image} alt="" fill className="object-contain" />
      </div>

      <div className="flex flex-col items-start gap-4">
        <div className="flex-1 space-y-4">
          <div className="inline-flex rounded bg-blue400 px-3 py-1 text-[10px] font-bold text-white">
            MASCOT {num}
          </div>
          <h2 className="text-3xl font-black tracking-tighter italic">{title}</h2>
          <p className="text-xl leading-relaxed text-gray600 whitespace-pre-wrap">
            {intro}
          </p>
        </div>
        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <span className="text-gray800 font-bold">FAVORITE</span>
            <li className="flex gap-1">
              {favorites.map((favorite,i) =>(
                <p key={i} className="text-[12px] font-semibold tracking-tight bg-blue300 px-2 py-0.5 rounded-md">{favorite}</p>
              ))}
            </li>
          </div>
          <div className="space-y-1">
            <span className="text-gray800 font-bold">HOBBY</span>

            <li className="flex gap-1">
              {hobbies.map((hobby,i) => (
                <p key={i} className="text-[12px] font-semibold tracking-tight bg-blue300 px-2 py-0.5 rounded-md">{hobby}</p>
              ))}
            </li>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Section_2(){
  return(
    <section className="bg-blue100 mx-auto py-20">
      <div className="flex flex-col gap-40">
        {ContentContainer(
          "/images/woonie_default.png",
          "01",
          "우니 / WOONIE",
          `캠퍼스의 발랄한 마스코트 우니!\n다정하고 엉뚱한 매력으로\n많은 사람들을 웃게 해줘요.`,
          ['부들부들한 담요','달달한 간식','따뜻한 햇빛 쬐기'],
          ['구름 구경하기','일기 쓰기','맛있는 거 먹기']
        )}

        {ContentContainer(
          "/images/pang_fly.png",
          "02",
          "팡이 / PANG",
          `작지만 똘똘한 요정 팡이!\n솔직하고 에너지가 넘쳐요.\n문제가 생겼다면 팡이를 찾아보세요!`,
          ['타건감 좋은 키보드','아이스 아메리카노','계획짜기'],
          ['정리하기','할 일 목록 만들기', '맛집 찾아보기']
        )}
      </div>
      </section>
  )
}