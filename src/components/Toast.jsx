export default function Toast({ toast, onClose }) {
  if (!toast || !toast.show) return null;

  return (
    <div
      className={`notification notification-${toast.type || 'info'} active`}
      role="status"
      aria-live="polite"
    >
      <div className="notification-content">
        <i
          className={`fas fa-${
            toast.type === 'success' ? 'check-circle' : 'info-circle'
          }`}
        ></i>
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
