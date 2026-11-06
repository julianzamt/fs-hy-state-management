import { useAnecdotes, useActions } from "../state/store";
import { useNotificationActions } from "../state/notification-store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes();
  const actions = useActions();
  const { notify } = useNotificationActions();

  const vote = async (id) => {
    const res = await actions.vote(id);
    console.log({ res });
    notify(`You voted for ${res.content}`);
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
