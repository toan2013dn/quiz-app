import { create } from "zustand";

export const useQuestionsStore = create((set) => ({
    questionsData: [],
    setQuestionsData: (questionsData) => set({ questionsData: questionsData }),
    score: 0,
    setScore: (score) => set({ score: score }),
    selectedAnswer: null,
    setSelectedAnswer: (selectedAnswer) => set({ selectedAnswer: selectedAnswer }),
}));
