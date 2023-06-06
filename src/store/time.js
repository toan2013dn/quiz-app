import { create } from 'zustand';

export const useTimeStore = create((set) => ({
    time: 0,
    setTime: (newTime) => set({ time: newTime }),
}));