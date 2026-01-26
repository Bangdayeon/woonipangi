import clsx from 'clsx';
import { useState } from 'react';

import SVGIcon from '../Icon/SVGIcon';
import IconButton from '../IconButton/IconButton';
import styles from './LikeButton.module.css';

const LikeButton = () => {
  const [likeOn, setLikeOn] = useState(false); // TODO: api 연결 필요
  const [animating, setAnimating] = useState(false);
  const num = 10; // TODO: api 연결 필요

  const handleClick = () => {
    if (!likeOn) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 500);
    }
    setLikeOn(prev => !prev);
  };

  return (
    <div className="relative flex w-fit items-center">
      {animating && (
        <div className="pointer-events-none absolute">
          <SVGIcon icon="IC_Like_On" className={clsx(styles.likePop, 'text-red400 ml-2')} />
        </div>
      )}
      <IconButton
        icon={likeOn ? 'IC_Like_On' : 'IC_Like_Off'}
        ariaLabel="좋아요버튼"
        variant="ghost"
        onClick={handleClick}
        className={likeOn ? 'text-red400' : 'text-gray600'}
      />
      <span>{num}</span>
    </div>
  );
};

export default LikeButton;
