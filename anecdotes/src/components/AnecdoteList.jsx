import { useAnecdotes, useActions } from '../state/store';
import { useNotificationActions } from '../state/notification-store';

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const actions = useActions();
  const { notify } = useNotificationActions();

  const vote = async (id) => {
    const res = await actions.vote(id);
    notify(`You voted for ${res.content}`);
  };

  const remove = async (id) => {
    await actions.remove(id);
    notify(`Succesfully removed`);
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
      {anecdote.votes === 0 && (
        <button onClick={() => remove(anecdote.id)}>delete</button>
      )}
    </div>
  ));
};

export default AnecdoteList;
