import { useState, ReactNode } from "react";
import Keyboard from "../components/Keyboard";
import {motion} from 'framer-motion';
import Image from "next/image";

export default function Section_1(){
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [extraContent, setExtraContent] = useState<ReactNode | null>(null);

  const handleKeyClick = (label: string, image: string, extra?: ReactNode) => {
    setActiveTab(label);
    setImage(image);
    setExtraContent(extra || null);
  };

  const renderTitle = () => {
  switch (activeTab) {
    case '안녕':
      return `안녕! 만나서 정말 기뻐.\n오늘 하루는 어때?`;
    case '반가워':
      return '만나서 반가워!\n친하게 지내면 좋겠다!';
    case '우니':
      return '나는 우니라고 해!\n먹는 걸 좋아하지';
    case '팡이':
      return '나는 팡이야.\n노는 걸 좋아해'
    default:
      return;
  }
};

  return(
    <section
      className="pt-20 pb-30 md:pb-40 relative w-full flex items-center justify-center flex-col md:flex-row"
    >
    <Keyboard onKeyClick={handleKeyClick}/>
    <motion.div 
      key={activeTab}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-80 m-10 py-5 flex flex-col justify-between"
    >
      {image&&activeTab&&(
        <div className="flex items-center flex-col gap-5">
          <h3 className="text-2xl font-semibold whitespace-pre-wrap text-center">
            {renderTitle()}
          </h3>
          <div className="relative w-50 h-50">
            <Image src={image} alt='' fill className="object-contain"/>
          </div>
          {extraContent&&(
            <div className="">
              {extraContent}
            </div>
          )}
        </div>
      )}
      {!image&&!activeTab&&(
        <div className="flex flex-col items-center gap-3 border-4 rounded-3xl py-5 border-gray100 border-dashed">
          <span className="font-semibold">
            우니와 팡이의 인사를 확인해보세요👋
          </span>
          <div className="relative w-80 h-60">
            <Image src='/images/example.gif' alt='클릭 예시 이미지' fill className="object-contain"/>
          </div>
        </div>
      )}
    </motion.div>
  </section>
  )
}