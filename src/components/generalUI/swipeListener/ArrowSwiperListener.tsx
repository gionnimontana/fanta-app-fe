import React from 'react';
import { SwipeListener } from './SwipeListener';
import s from './ArrowSwiperListener.module.css';

interface SwipeListenerProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  threshold?: number;
  className?: string;
  children: React.ReactNode;
}

export const ArrowSwiperListener: React.FC<SwipeListenerProps> = ({
  onSwipeLeft,
  onSwipeRight,
  threshold = 100,
  className,
  children,
}) => {
  

  return (
    <>
      <SwipeListener
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        threshold={threshold}
        className={className}
      >
        {children}
      </SwipeListener>
      <button className={s.button} id={s.left} onClick={onSwipeLeft}>
        <div className={s.buttonIcon}>◀</div>
      </button>
      <button className={s.button} id={s.right} onClick={onSwipeRight}>
        <div className={s.buttonIcon}>▶</div>
      </button>
    </>

  );
};
