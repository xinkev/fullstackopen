const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }

  return (
    <div className={`notification ${notification.type}`}>
      {notification.message}
    </div>
  )
}

Notification.displayName = "Notification"

export default Notification
