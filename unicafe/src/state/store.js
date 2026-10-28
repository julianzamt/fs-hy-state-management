import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

const useStatisticsStore = create((set) => ({
  good: 0,
  bad: 0,
  neutral: 0,
  actions: {
    increment: (type) => set((state) => ({ [type]: state[type] + 1 })),
  },
}));

export const useStatisticControls = () =>
  useStatisticsStore((state) => state.actions);

export const useValues = () =>
  useStatisticsStore(
    useShallow((state) => ({
      good: state.good,
      bad: state.bad,
      neutral: state.neutral,
    })),
  );
