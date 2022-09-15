import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification.message === null) {
    return null;
  } else if (notification.state) {
    return (
      <div className="alert alert-success" role="alert">
        {notification.message}
      </div>
    );
  } else {
    return (
      <div className="alert alert-danger" role="alert">
        {notification.message}
      </div>
    );
  }
};

export default Notification;
