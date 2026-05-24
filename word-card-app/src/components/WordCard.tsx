
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
      className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex flex-col items-center justify-center px-4 py-6 pt-safe-top pb-safe-bottom touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div 
        className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 transition-all duration-500 active:scale-98"
      >
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-3 sm:mb-4 tracking-tight leading-tight">
            {word.word}
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-slate-500 mb-6 sm:mb-8 font-medium">
            {word.phonetic}
          </p>
          
          <div className="space-y-2 sm:space-y-3 mb-8 sm:mb-10">
            {word.meaning.map((meaning, idx) => (
              <p 
                key={idx} 
                className="text-base sm:text-lg md:text-xl text-slate-700 bg-slate-50 py-2.5 sm:py-3 px-4 rounded-xl"
              >
                {meaning}
              </p>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-slate-400 font-medium">
              {currentIndex + 1} / {total}
            </span>
            
            <button
              onClick={onNext}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 text-white font-semibold py-3.5 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 active:scale-95 shadow-lg active:shadow-xl min-h-[48px] touch-manipulation"
            >
              下一个
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCard;

