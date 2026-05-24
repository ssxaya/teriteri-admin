import React, { useState } from "react";
import WordCard from "../components/WordCard";
import { initialWords } from "../data/words";

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % initialWords.length);
  };

  return (
    <WordCard
      word={initialWords[currentIndex]}
      onNext={handleNext}
      currentIndex={currentIndex}
      total={initialWords.length}
    />
  );
}