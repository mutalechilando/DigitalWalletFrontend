import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Register.css";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();

    // Password validation regex
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Email validation regex
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validateForm = () => {
        let formIsValid = true;
        const errorMessages = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        };

        // Username validation
        if (username.length < 5 || /\s/.test(username)) {
            formIsValid = false;
            errorMessages.username = "Username must be at least 5 characters and contain no spaces.";
        }

        // Email validation
        if (!emailPattern.test(email)) {
            formIsValid = false;
            errorMessages.email = "Please enter a valid email address.";
        }

        // Password validation
        if (!passwordPattern.test(password)) {
            formIsValid = false;
            errorMessages.password = "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.";
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            formIsValid = false;
            errorMessages.confirmPassword = "Passwords do not match.";
        }

        setErrors(errorMessages);
        return formIsValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Validate form before submitting
        if (!validateForm()) {
            setLoading(false);
            return; // Stop the form submission if validation fails
        }

        try {
            const payload = {
                id: 0,
                userName: username,
                email: email,
                passwordHash: password,
            };

            const response = await API.post("/auth/register", payload);
            console.log("Registration successful:", response.data);
            alert("Registration successful! Please login.");
            navigate("/"); // Redirect to login page
        } catch (error) {
            console.error("Registration failed", error);
            alert("Registration failed. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-header">Register</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className={`form-control ${errors.username ? "is-invalid" : ""}`}
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                Registering...
                            </>
                        ) : (
                            "Register"
                        )}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <p>
                        Already have an account?{" "}
                        <Link to="/" className="link">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
