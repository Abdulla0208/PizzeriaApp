import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
import "../Login/Login.css";

function Register() {
    const { register } = useAuth();

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value
            }));
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (
            !formData.fullName ||
            !formData.email ||
            !formData.phone ||
            !formData.password ||
            !formData.confirmPassword
            ) {
                toast.warning("Please fill all fields.");
                return;
            }
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        const result = register({
            name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
        });

        if (!result.success) {
            toast.error(result.message);
            return;
        }
        toast.success("Registration Successful!");
        navigate("/login");
    };

    return (

        <main className="auth-page">
            <div className="auth-card">
                <img
                    src={logo}
                    alt="Pizzeria"
                    className="auth-logo"
                />
                <h1>Create Account </h1>
                <p>
                    Join us and start ordering delicious pizzas.
                </p>

                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>

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
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
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
                                { showPassword ? <FaEyeSlash /> : <FaEye /> }
                            </button>
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Confirm Password</label>
                        <div className="password-box">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        className="auth-btn"
                        type="submit"
                    >
                        Register
                    </button>
                </form>

                <p className="bottom-text">
                    Already have an account?
                    <Link to="/login">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );
}

export default Register;