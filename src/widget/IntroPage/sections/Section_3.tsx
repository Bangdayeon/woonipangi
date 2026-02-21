'use client';

import { motion } from 'framer-motion';

const colors = [
  { label: '머리 / 포인트', name: 'Brand Red', rgb: { r: 132, g: 14, b: 30 } },
  { label: '입', name: 'Soft Coral', rgb: { r: 193, g: 70, b: 65 } },
  { label: '혓바닥', name: 'Blush Pink', rgb: { r: 255, g: 163, b: 160 } },
  { label: '볼 홍조', name: 'Peach Glow', rgb: { r: 255, g: 177, b: 146 } },
];

function toHex(r: number, g: number, b: number) {
  return (
    '#' +
    [r, g, b]
      .map(v => v.toString(16).padStart(2, '0'))
      .join('')
      .toUpperCase()
  );
}

export default function Section_3() {
  return (
    <section className="w-full py-24 md:py-32">
      <div className="mx-auto w-full px-4 md:max-w-200 lg:max-w-300">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-3xl font-black tracking-tight md:text-4xl"
        >
          색상
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {colors.map(({ label, name, rgb }, i) => {
            const hex = toHex(rgb.r, rgb.g, rgb.b);
            const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="flex flex-col overflow-hidden rounded-2xl bg-white/50 ring-1 ring-black/5"
              >
                <div className="h-24 w-full" style={{ backgroundColor: rgbStr }} />
                <div className="flex flex-col gap-1.5 p-4">
                  <span className="font-label-xs text-gray400 tracking-widest">{label}</span>
                  <span className="font-title-sm text-gray800">{name}</span>
                  <div className="mt-2 flex flex-col gap-0.5 border-t border-black/5 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-label-xs text-gray400">HEX</span>
                      <span className="font-label-xs text-gray600 font-mono">{hex}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-label-xs text-gray400">RGB</span>
                      <span className="font-label-xs text-gray600 font-mono">
                        {rgb.r}, {rgb.g}, {rgb.b}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
