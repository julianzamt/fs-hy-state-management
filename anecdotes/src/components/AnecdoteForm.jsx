import { useNotificationActions } from "../state/notification-store";
import { useActions } from "../state/store";

const AnecdoteForm = () => {
  const actions = useActions();
  const { notify } = useNotificationActions();

  const add = async (e) => {
    e.preventDefault();
    const res = await actions.add(e.target.new.value);
    notify(`You added ${res.content}`);
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
