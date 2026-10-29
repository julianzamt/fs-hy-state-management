import { useActions } from '../store';

const AnecdoteForm = () => {
  const actions = useActions();

  const add = (e) => {
    e.preventDefault();
    actions.add(e.target.new.value);
    e.target.reset();
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input data-testid="new" name="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
