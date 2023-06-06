import { create } from "zustand";

export const useReviewStore = create((set) => ({
    reviewAnswers: [],
    setReviewAnswers: (reviewAnswers) => set({ reviewAnswers: reviewAnswers }),
}));
