import "./ConfirmationModal.css";

function ConfirmationModal({
    icon,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
}) {

    return (

        <div className="confirm-overlay">
            <div className="confirm-modal">
                <div className="confirm-icon">
                    {icon}
                </div>

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="confirm-actions">
                    <button
                        className="cancel-btn"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>

                    <button
                        className="confirm-btn"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>

                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;