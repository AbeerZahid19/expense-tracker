function Toast({ message, type, onClose }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: type === 'danger' ? '#e74c3c' : '#f39c12',
        color: 'white',
        padding: '14px 24px',
        borderRadius: '10px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '90%',
        animation: 'slideDown 0.3s ease-out',
      }}
    >
      <span style={{ fontWeight: 600 }}>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'white',
          fontSize: '1.1rem',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        ✕
      </button>
    </div>
  );
}

export default Toast;