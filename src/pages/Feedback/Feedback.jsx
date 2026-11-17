import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Popup from "../../components/Popup/Popup";
import "./Feedback.css";

function Feedback() {

    const [showPopup, setShowPopup] = useState(false);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

    const navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [feedback, setFeedback] = useState("");

    const { isLoggedIn } = useAuth();

    useEffect(() => {

        if (!isLoggedIn) {
            navigate("/login");
        }

    }, [isLoggedIn]);

    const handleSubmit = () => {

        console.log({
            rating,
            feedback
        });

        setShowPopup(true);
        setFeedbackSubmitted(true);

        setTimeout(() => {

            navigate("/Order");

        }, 3000);

    };

    return (

        <main className="feedback-page">

            <div className="feedback-card">

                <h1>Rate Your Experience</h1>
                <p>
                    Tell us what you loved, or what we can improve.
                </p>

                {/* Rating */}
                <div className="rating-stars">
                    {[1,2,3,4,5].map((star) => (
                        <FaStar
                            key={star}
                            className={
                                star <= (hover || rating)
                                    ? "star active"
                                    : "star"
                            }
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => setRating(star)}
                        />
                    ))}
                </div>

                {/* Text Area */}
                <textarea
                    placeholder="Write your feedback..."
                    maxLength={250}
                    value={feedback}
                    onChange={(e) =>
                        setFeedback(e.target.value)
                    }
                />

                <div className="character-count">
                    {feedback.length} / 250
                </div>

                {/* Buttons */}
                <div className="feedback-buttons">
                    <button
                        className="skip-btn"
                        onClick={() => navigate("/Order")}
                    >
                        Skip
                    </button>

                    <button
                        className="submit-btn"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>

            <Popup
                open={showPopup}
                success={feedbackSubmitted}
                title="Thank You!"
                message="Your feedback has been submitted successfully."
            />
        </main>
    );
}

export default Feedback;