import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import { useEffect } from "react";
import { useActions } from "./state/store";
import Notification from "./components/Notification";
import { useNotification } from "./state/notification-store";

const App = () => {
  const { initialize } = useActions();
  const notification = useNotification();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      {notification && <Notification />}
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
