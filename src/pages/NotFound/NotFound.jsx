import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {

    return (

        <main className="notfound-page">

            <div className="notfound-card">

                <div className="pizza-icon">
                    🍕
                </div>

                <h1>404</h1>

                <h2>Oops! This Pizza Got Lost.</h2>

                <p>
                    The page you're looking for doesn't exist or may have been moved.
                </p>

                <div className="notfound-buttons">

                    <Link
                        to="/"
                        className="home-btn"
                    >
                        Back to Home
                    </Link>

                    <Link
                        to="/order"
                        className="order-btn"
                    >
                        Order Pizza
                    </Link>

                </div>

            </div>

        </main>

    );

}

export default NotFound;