
import React, { useState } from "react";
import { Word } from "../types/word";

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
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-800 mb-6 sm:mb-8 tracking-tight leading-tight">
          {word.word}
        </h1>
        
        <p className="text-2xl sm:text-3xl md:text-4xl text-slate-500 mb-8 sm:mb-10 font-light">
          {word.phonetic}
        </p>
        
        <div className="space-y-4 sm:space-y-5 mb-10 sm:mb-12">
          {word.meaning.map((meaning, idx) => (
            <p 
              key={idx} 
              className="text-xl sm:text-2xl md:text-3xl text-slate-700 leading-relaxed"
            >
              {meaning}
            </p>
          ))}
        </div>
        
        <div className="flex items-center justify-center">
          <span className="text-sm sm:text-base text-slate-400 font-medium">
            {currentIndex + 1} / {total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WordCard;

