import { create } from 'zustand';
import anecdotesService from '../services/anecdotes';

export const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: async (id) => {
      const res = await anecdotesService.vote(id);

      set((state) => ({
        anecdotes: state.anecdotes
          .map((a) => (a.id === id ? { ...a, votes: res.votes } : a))
          .toSorted((a, b) => b.votes - a.votes),
      }));

      return res;
    },
    add: async (newAnecdote) => {
      const ret = await anecdotesService.create(newAnecdote);

      set((state) => ({
        anecdotes: [...state.anecdotes, ret],
      }));

      return ret;
    },
    setFilter: (f) => set({ filter: f }),
    initialize: async () => {
      const anecdotes = (await anecdotesService.getAll()).toSorted(
        (a, b) => b.votes - a.votes,
      );
      set({ anecdotes });
    },
    remove: async (id) => {
      await anecdotesService.remove(id);

      set((state) => ({
        anecdotes: state.anecdotes.filter((a) => a.id !== id),
      }));
    },
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);
  const anecdotesToShow = filter
    ? anecdotes.filter((a) => a.content.toLowerCase().includes(filter))
    : anecdotes;

  return anecdotesToShow;
};

export const useActions = () => useAnecdoteStore((state) => state.actions);
