import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';

vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    vote: vi.fn(),
    remove: vi.fn(),
  },
}));

import anecdoteService from '../services/anecdotes';
import { useAnecdoteStore, useAnecdotes, useActions } from './store';

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' });
  vi.clearAllMocks();
});

describe('useActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = [{ id: 1, content: 'Test', votes: 0 }];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: notesResult } = renderHook(() => useAnecdotes());
    expect(notesResult.current).toEqual(mockAnecdotes);
  });

  //   it('add appends a new note', async () => {
  //     const newNote = { id: 2, content: 'New note', important: false };
  //     anecdoteService.createNew.mockResolvedValue(newNote);

  //     const { result } = renderHook(() => useActions());

  //     await act(async () => {
  //       await result.current.add('New note');
  //     });

  //     const { result: notesResult } = renderHook(() => useAnecdotes());
  //     expect(notesResult.current).toContainEqual(newNote);
  //   });
});
