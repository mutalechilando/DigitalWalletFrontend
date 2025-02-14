import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await API.post("/auth/login", { email, password });
            localStorage.setItem("token", response.data.token); // Store token
            navigate("/dashboard"); // Redirect after login
        } catch (error) {
            console.error("Login failed", error);
            alert("Invalid credentials");
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="text-center mb-4">
                    <h2 className="login-title">CoinCrib</h2>
                    <p className="login-text">Discover Your Digital Wealth</p>
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button className="btn btn-primary w-100" onClick={handleLogin}>
                    Login
                </button>

                <div className="text-center mt-3">
                    <p>
                        Don't have an account?{" "}
                        <a href="/register" className="text-decoration-none text-primary">
                            Register here
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
