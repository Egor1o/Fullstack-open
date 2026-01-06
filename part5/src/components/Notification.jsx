const Notification = ({ message, isError }) => {
  return isError ? (
    <div className="error">{message}</div>
  ) : (
    <div className="success">{message}</div>
  );
};

export default Notification;
