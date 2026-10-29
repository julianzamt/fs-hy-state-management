import { useAnecdotes, useActions } from './store';

const App = () => {
  const anecdotes = useAnecdotes();
  const actions = useActions();

  const vote = (id) => {
    actions.vote(id);
  };

  const add = (e) => {
    e.preventDefault();
    actions.add(e.target.new.value);
    e.target.reset();
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input data-testid="new" name="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
