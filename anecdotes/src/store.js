import { create } from 'zustand';
import anecdotesService from './services/anecdotes';

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: (id) =>
      set((state) => ({
        anecdotes: state.anecdotes
          .map((a) => (a.id === id ? { ...a, votes: a.votes + 1 } : a))
          .toSorted((a, b) => b.votes - a.votes),
      })),
    add: async (newAnecdote) => {
      const ret = await anecdotesService.create(newAnecdote);

      set((state) => ({
        anecdotes: [...state.anecdotes, ret],
      }));
    },
    setFilter: (f) => set({ filter: f }),
    initialize: async () => {
      const anecdotes = await anecdotesService.getAll();
      set({ anecdotes });
    },
  },
}));

export const useAnecdotes = (state) => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);
  const anecdotesToShow = filter
    ? anecdotes.filter((a) => a.content.toLowerCase().includes(filter))
    : anecdotes;

  return anecdotesToShow;
};

export const useActions = () => useAnecdoteStore((state) => state.actions);
