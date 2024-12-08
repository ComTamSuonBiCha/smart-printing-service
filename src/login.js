import React, { useEffect, useState } from "react";
import loginStyles from "./login.module.css";
import illustration from "./component/image1.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Box, Typography, Button } from "@mui/material";

function Login(props) {
  const location = useLocation();
  const { isSPSO } = location.state || {};
  const navigate = useNavigate();
  const backend = process.env.REACT_APP_BACKEND_PORT;

  const [formData, setFormData] = useState({
    spso_name: isSPSO ? "" : undefined,
    spso_password: isSPSO ? "" : undefined,
    student_email: !isSPSO ? "" : undefined,
    student_password: !isSPSO ? "" : undefined,
  });

  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

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

    try {
      const response = await axios.post(
        isSPSO
          ? `${backend}/api/user/login/spso`
          : `${backend}/api/user/login/student`,
        formData,
        {
          timeout: 1000,
        }
      );

      localStorage.setItem(
        "userid",
        JSON.stringify(response.data.userInfo.student_id)
      );
      props.setLogin(true);
      navigate(isSPSO ? "/spso" : "/main");
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        setError("Request timed out. Please try again.");
      } else if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Invalid credentials or something went wrong.");
      }
      setOpen(true);
    }
  };
  useEffect(() => {
    console.log("Backend URL: ", process.env.REACT_APP_BACKEND_PORT);
  }, []);
  const handleCloseModal = () => {
    setOpen(false);
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
          </form>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="error-modal-title"
        aria-describedby="error-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            borderRadius: "8px",
            boxShadow: 24,
            padding: "16px",
            width: "300px",
          }}
        >
          <Typography id="error-modal-title" variant="h6" component="h2">
            Login Failed
          </Typography>
          <Typography id="error-modal-description" sx={{ mt: 2 }}>
            {error}
          </Typography>
          <Button
            onClick={handleCloseModal}
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Login;
