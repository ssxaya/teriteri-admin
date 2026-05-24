
import React from "react";
import { Word } from "../types/word";

interface WordCardProps {
  word: Word;
  onNext: () => void;
  currentIndex: number;
  total: number;
}

const WordCard: React.FC<WordCardProps> = ({ word, onNext, currentIndex, total }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div 
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl"
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold text-slate-800 mb-4 tracking-tight">
            {word.word}
          </h1>
          
          <p className="text-xl text-slate-500 mb-8 font-medium">
            {word.phonetic}
          </p>
          
          <div className="space-y-3 mb-10">
            {word.meaning.map((meaning, idx) => (
              <p 
                key={idx} 
                className="text-lg text-slate-700 bg-slate-50 py-3 px-4 rounded-xl"
              >
                {meaning}
              </p>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400 font-medium">
              {currentIndex + 1} / {total}
            </span>
            
            <button
              onClick={onNext}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-300"
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

