'use client';

import { motion } from 'framer-motion';

interface Props {
  index: number;
  total: number;
  percent: number;
}

export default function QuizProgress({ index, total, percent }: Props) {
  const label = `${total}문항 중 ${index + 1}번째`;

  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-label-sm text-gray600" aria-live="polite">
          {label}
        </span>
        <span className="font-label-sm text-gray500">{Math.round(percent)}%</span>
      </div>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={index + 1}
        aria-valuetext={label}
        className="bg-gray100 h-2 w-full overflow-hidden rounded-full"
      >
        <motion.div
          className="bg-blue300 h-full rounded-full"
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
