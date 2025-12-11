import "./CustomAlert.css";

export const CustomAlert = ({
  isOpen,
  onClose,
  title,
  message,
  type = "error",
  icon,
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    if (icon) return icon;
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "confirm":
        return "?";
      default:
        return "ℹ";
    }
  };

  return (
    <div className="custom-alert-overlay" onClick={onClose}>
      <div className="custom-alert" onClick={(e) => e.stopPropagation()}>
        <div className={`alert-icon ${type}`}>{getIcon()}</div>
        <h3 className="alert-title">{title}</h3>
        <p className="alert-message">{message}</p>
        <button className="alert-btn" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export const CustomConfirm = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="custom-alert-overlay" onClick={onCancel}>
      <div className="custom-alert" onClick={(e) => e.stopPropagation()}>
        <div className="alert-icon confirm">?</div>
        <h3 className="alert-title">{title}</h3>
        <p className="alert-message">{message}</p>
        <div className="alert-buttons">
          <button className="alert-btn cancel-btn" onClick={onCancel}>
            Batal
          </button>
          <button className="alert-btn confirm-btn" onClick={onConfirm}>
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  );
};
