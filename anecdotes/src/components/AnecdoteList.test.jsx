import { render, screen } from '@testing-library/react';
import AnecdoteList from './AnecdoteList';
import { useAnecdoteStore } from '../state/store';
import { describe, it, expect, beforeEach } from 'vitest';

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
});
