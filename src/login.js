import React, { useState } from "react";
import loginStyles from "./login.module.css";
import illustration from "./component/image1.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const location = useLocation();
  const { isSPSO } = location.state || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    student_email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://localhost:8081/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data.userInfo));
      console.log("Login successful:", response.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials or something went wrong.");
    } finally {
    }
  };

  return (
    <div className="Container">
      <div className={loginStyles.MainContent}>
        <div className={loginStyles.IllustrationSection}>
          <img
            src={illustration}
            alt="Illustration"
            className={loginStyles.IllustrationImage}
          />
        </div>

        <div className={loginStyles.LoginForm}>
          <h2 className={loginStyles.LoginHeader}>Login Account</h2>
          <form onSubmit={handleSubmit}>
            <div className={loginStyles.FormGroup}>
              <label htmlFor="student_email">Username</label>
              <input
                type="text"
                id="student_email"
                placeholder="Username"
                value={formData.student_email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={loginStyles.FormGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={loginStyles.FormOptions}>
              <label>
                <input type="checkbox" /> Remember your account
              </label>
              <a href="#" className={loginStyles.ForgotPassword}>
                Forgot your password?
              </a>
            </div>
            <button
              type="submit"
              className={loginStyles.LoginButton}
              disabled={loading}
            >
              <b>{loading ? "LOADING..." : "LOG IN"}</b>
            </button>
            {error && <p className={loginStyles.ErrorMessage}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
