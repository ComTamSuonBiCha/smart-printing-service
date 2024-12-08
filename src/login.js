import React, { useState } from "react";
import loginStyles from "./login.module.css";
import illustration from "./component/image1.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const location = useLocation();
  const { isSPSO } = location.state || {};
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    spso_name: isSPSO ? "" : undefined,
    spso_password: isSPSO ? "" : undefined,
    student_email: !isSPSO ? "" : undefined,
    student_password: !isSPSO ? "" : undefined,
  });

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
    setError("");
    console.log("Form Data: ", formData);

    try {
      const response = await axios.post(
        isSPSO
          ? "http://192.168.1.52:5000/api/user/login/spso"
          : "http://192.168.1.52:5000/api/user/login/student",
        formData
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data.userInfo));
      console.log("Login successful:", response.data);
      props.setLogin(true);
      navigate(isSPSO ? "/spso" : "/main");
    } catch (err) {
      console.error("Login failed:", err);

      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid credentials or something went wrong.");
      }
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
            {!isSPSO && (
              <>
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
                  <label htmlFor="student_password">Password</label>
                  <input
                    type="password"
                    id="student_password"
                    placeholder="Password"
                    value={formData.student_password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            {isSPSO && (
              <>
                <div className={loginStyles.FormGroup}>
                  <label htmlFor="spso_name">SPSO Name</label>
                  <input
                    type="text"
                    id="spso_name"
                    placeholder="SPSO Name"
                    value={formData.spso_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={loginStyles.FormGroup}>
                  <label htmlFor="spso_password">SPSO Password</label>
                  <input
                    type="password"
                    id="spso_password"
                    placeholder="SPSO Password"
                    value={formData.spso_password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            <div className={loginStyles.FormOptions}>
              <label>
                <input type="checkbox" /> Remember your account
              </label>
              <a href="#" className={loginStyles.ForgotPassword}>
                Forgot your password?
              </a>
            </div>

            <button type="submit" className={loginStyles.LoginButton}>
              <b>LOG IN</b>
            </button>
            {error && <p className={loginStyles.ErrorMessage}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
