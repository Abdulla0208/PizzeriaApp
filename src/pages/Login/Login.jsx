import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
import "./Login.css";

function Login() {

    const { login } = useAuth();

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.warning("Please fill all fields.");
            return;
        }

        const result = login(
            formData.email,
            formData.password
        );

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success("Login Successful!");
        navigate("/order");
    };

    return (
        <main className="auth-page">
            <div className="auth-card">
                <img
                    src={logo}
                    alt="Pizzeria"
                    className="auth-logo"
                />
                <h1>Welcome Back </h1>
                <p>
                    Login to continue ordering your favourite pizzas.
                </p>

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div className="password-box">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                { showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>


                    <button
                        className="auth-btn"
                        type="submit"
                    >
                        Login
                    </button>
                </form>

                <p className="bottom-text">
                    Don't have an account?
                    <Link to="/register">
                        Register
                    </Link>
                </p>
            </div>
        </main>
    );
}

export default Login;