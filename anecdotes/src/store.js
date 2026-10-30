import { create } from 'zustand';
import services from './services/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

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
    add: (newAnecdote) =>
      set((state) => ({
        anecdotes: [...state.anecdotes, asObject(newAnecdote)],
      })),
    setFilter: (f) => set({ filter: f }),
    initialize: async () => {
      const anecdotes = await services.getAll();
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
