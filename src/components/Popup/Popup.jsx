import { FaCheckCircle } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import "./Popup.css";

function Popup({ open, success, title, message }) {

    if (!open) return null;

    return (

        <div className="popup-overlay">
            <div className="popup-card">
                {
                    success ? (
                        <div key="success" className="popup-content">
                            <FaCheckCircle className="success-icon" />
                            <h2>{title}</h2>
                            <p>{message}</p>
                        </div>
                    ) : (
                        <div key="loading" className="popup-content">
                            <ImSpinner2 className="loader-icon" />
                            <h2>Processing Payment</h2>
                            <p>Please wait...</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Popup;