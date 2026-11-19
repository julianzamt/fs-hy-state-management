import { useAnecdotes } from '../hooks/useAnecdotes';
import useNotification from '../hooks/useNotification';

const AnecdoteForm = () => {
  const { create } = useAnecdotes();
  const { notify } = useNotification();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    create(content);
    notify('Anecdote created');
    event.target.reset();
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
