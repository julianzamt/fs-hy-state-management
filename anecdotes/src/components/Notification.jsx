import { useNotification } from "../state/notification-store";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  const notification = useNotification();

  return (
    <div style={style} data-testid="notification">
      {notification}
    </div>
  );
};

export default Notification;
