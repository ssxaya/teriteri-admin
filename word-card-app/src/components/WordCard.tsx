
import React, { useState } from "react";
import { Word } from "../types/word";
import { themeConfig } from "@/config/theme";

interface WordCardProps {
  word: Word;
  onNext: () => void;
  currentIndex: number;
  total: number;
}

const WordCard: React.FC<WordCardProps> = ({ word, onNext, currentIndex, total }) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe || isRightSwipe) {
      onNext();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div 
      className="min-h-screen min-h-[100dvh] bg-white flex flex-col items-center justify-center px-6 py-8 pt-safe-top pb-safe-bottom cursor-pointer select-none"
      onClick={onNext}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="text-center w-full max-w-2xl">
        <p 
          className={`${themeConfig.colors.phonetic} mb-4 font-light`}
          style={{ fontSize: `${themeConfig.phoneticSize}px` }}
        >
          {word.phonetic}
        </p>
        
        <h1 className={`text-5xl sm:text-6xl md:text-7xl font-bold ${themeConfig.colors.word} mb-8 sm:mb-10 tracking-tight leading-tight`}>
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
        
        <div className="flex items-center justify-center space-x-2">
          {Array.from({ length: total }).map((_, idx) => (
            <div
              key={idx}
              className={`${themeConfig.dotSize} rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? `${themeConfig.colors.dotActive} scale-125` 
                  : themeConfig.colors.dotInactive
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordCard;

