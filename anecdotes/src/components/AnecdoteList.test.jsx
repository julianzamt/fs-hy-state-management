import { render, screen, fireEvent } from '@testing-library/react';
import AnecdoteList from './AnecdoteList';
import { useAnecdoteStore } from '../state/store';
import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../services/anecdotes', () => ({
  default: {
    vote: vi.fn(),
  },
}));

import anecdoteService from '../services/anecdotes';

describe('AnecdoteList comp', () => {
  const anecdotes = [
    {
      content: 'Adding manpower to a late software project makes it later!',
      votes: 3,
      id: '2',
    },
    {
      content: 'If it hurts, do it more often',
      votes: 11,
      id: '1',
    },
  ];

  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes, filter: '' });
  });

  it('receives the anecdotes from the store sorted by votes', () => {
    render(<AnecdoteList />);

    const contents = screen
      .getAllByText(/If it hurts|Adding manpower/)
      .map((el) => el.textContent);

    expect(contents).toEqual([
      'If it hurts, do it more often',
      'Adding manpower to a late software project makes it later!',
    ]);
  });

  it('receives a properly filtered list of anecdotes', () => {
    useAnecdoteStore.setState({ anecdotes, filter: 'if it' });

    render(<AnecdoteList />);

    const contents = screen
      .getAllByText(/If it hurts|Adding manpower/)
      .map((el) => el.textContent);

    expect(contents).toEqual(['If it hurts, do it more often']);
  });

  it('voting increases the number of votes for an anecdote', async () => {
    anecdoteService.vote.mockResolvedValue({ ...anecdotes[1], votes: 12 });

    render(<AnecdoteList />);

    // 'If it hurts' has 11 votes, so it is rendered first
    const [firstVoteButton] = screen.getAllByRole('button', { name: 'vote' });
    fireEvent.click(firstVoteButton);

    expect(anecdoteService.vote).toHaveBeenCalledWith('1'); // the anecdote id
    expect(await screen.findByText(/has 12/)).toBeInTheDocument();
  });
});
