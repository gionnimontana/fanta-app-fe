import React, { useState, useCallback } from 'react';

interface SwipeListenerProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  threshold?: number;
  className?: string;
  children: React.ReactNode;
}

export const SwipeListener: React.FC<SwipeListenerProps> = ({
  onSwipeLeft,
  onSwipeRight,
  threshold = 100,
  className,
  children,
}) => {
  const [startX, setStartX] = useState<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const deltaX = startX ? endX - startX : 0;

      if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
          onSwipeRight();
        } else {
          onSwipeLeft();
        }
      }

      setStartX(null);
    },
    [onSwipeLeft, onSwipeRight, startX, threshold]
  );

  return (
    <div
      className={className}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
};
