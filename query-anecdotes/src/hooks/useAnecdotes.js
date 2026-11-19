import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, createAnecdote, vote } from '../requests';
import useNotification from './useNotification';

export const useAnecdotes = () => {
  const queryClient = useQueryClient();
  const { notify } = useNotification();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
    onError: (e) => {
      notify(e.message)
    },
  });

  const voteMutation = useMutation({
    mutationFn: vote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    create: (content) => newAnecdoteMutation.mutate({ content }),
    vote: (anecdote) =>
      voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
  };
};
