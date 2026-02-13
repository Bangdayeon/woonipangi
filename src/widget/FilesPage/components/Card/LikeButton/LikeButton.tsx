import SVGIcon from '@/shared/ui/Icon/SVGIcon';
import IconButton from '@/shared/ui/IconButton/IconButton';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import styles from './LikeButton.module.css';

const LikeButton = () => {
  const [likeOn, setLikeOn] = useState(false); // TODO: api 연결 필요
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const num = 10; // TODO: api 연결 필요

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    if (!likeOn) {
      setAnimating(true);
      timeoutRef.current = setTimeout(() => setAnimating(false), 500);
    }
    setLikeOn(prev => !prev);
  };

  return (
    <div className="relative flex w-fit items-center">
      {animating && (
        <div className="pointer-events-none absolute">
          <SVGIcon icon="IC_Like_On" className={clsx(styles.likePop, 'text-red400')} />
        </div>
      )}
      <IconButton
        icon={likeOn ? 'IC_Like_On' : 'IC_Like_Off'}
        ariaLabel="좋아요버튼"
        variant="ghost"
        size="md"
        onClick={handleClick}
        className={likeOn ? 'text-red400 hover:text-red500' : ''}
      />
      <span className="font-body-sm text-gray600">{num}</span>
    </div>
  );
};

export default LikeButton;
