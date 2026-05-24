
import React, { useState, useRef } from "react";
import { Word } from "@/types/word";
import { themeConfig } from "@/config/theme";

interface WordCardProps {
  word: Word;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  total: number;
}

const WordCard: React.FC<WordCardProps> = ({ word, onNext, onPrev, currentIndex, total }) => {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [touchStartTime, setTouchStartTime] = useState<number>(0);
  const [activeTouches, setActiveTouches] = useState(0);
  const lastTouchCountRef = useRef(0);
  const minSwipeDistance = 50;

  // 处理鼠标点击
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // 左键
      onNext();
    } else if (e.button === 2) { // 右键
      onPrev();
    }
  };

  // 阻止右键菜单
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  // 触摸开始
  const handleTouchStart = (e: React.TouchEvent) => {
    const now = Date.now();
    setActiveTouches(e.touches.length);
    lastTouchCountRef.current = e.touches.length;
    
    if (e.touches.length === 1) {
      setTouchStartTime(now);
      setTouchStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    }
  };

  // 触摸移动
  const handleTouchMove = (e: React.TouchEvent) => {
    setActiveTouches(e.touches.length);
    
    if (e.touches.length === 1) {
      setTouchEnd({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    }
  };

  // 触摸结束
  const handleTouchEnd = (e: React.TouchEvent) => {
    const now = Date.now();
    const touchDuration = now - touchStartTime;
    
    // 检查是否是双指点击（快速释放）
    if (lastTouchCountRef.current === 2 && e.touches.length === 0) {
      onPrev();
      setTouchStart(null);
      setTouchEnd(null);
      return;
    }
    
    // 单指点击
    if (touchStart && touchDuration < 300) {
      onNext();
    } else if (touchStart && touchEnd) {
      // 滑动处理
      const distance = touchStart.x - touchEnd.x;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;
      
      if (isLeftSwipe) {
        onNext();
      } else if (isRightSwipe) {
        onPrev();
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div 
      className="relative min-h-screen min-h-[100dvh] bg-white flex flex-col items-center justify-center px-6 py-8 pt-safe-top pb-safe-bottom cursor-pointer select-none"
      onMouseDown={handleMouseDown}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="text-center w-full max-w-2xl">
        <p 
          className={`${themeConfig.colors.phonetic} mb-4 font-light`}
          style={{ fontSize: `${themeConfig.phoneticSize}px` }}
        >
          {word.phonetic}
        </p>
        
        <h1 
          className={`font-bold ${themeConfig.colors.word} mb-8 sm:mb-10 tracking-tight leading-tight`}
          style={{ fontSize: `${themeConfig.wordSize}px` }}
        >
          {word.word}
        </h1>
        
        <div className="space-y-3 sm:space-y-4 mb-12 sm:mb-16">
          {word.meaning.map((meaning, idx) => (
            <p 
              key={idx} 
              className={`${themeConfig.colors.meaning} leading-relaxed`}
              style={{ fontSize: `${themeConfig.meaningSize}px` }}
            >
              {meaning}
            </p>
          ))}
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center">
          {total <= 10 ? (
            // 单词数 ≤10 时用圆点
            <div className="flex items-center justify-center space-x-2">
              {Array.from({ length: total }).map((_, idx) => (
                <div
                  key={idx}
                  className={`${themeConfig.dotSize} rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? `${themeConfig.colors.dotActive} scale-150` 
                      : themeConfig.colors.dotInactive
                  }`}
                />
              ))}
            </div>
          ) : (
            // 单词数 >10 时用进度条
            <div className="w-48 h-1.5 bg-slate-200 rounded-full relative">
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-slate-800 transition-all duration-300"
                style={{ left: `${(currentIndex / (total - 1)) * 100}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordCard;

