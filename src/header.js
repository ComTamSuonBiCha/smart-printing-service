import React, { useEffect, useState } from "react";
import axios from "axios";
import headerStyles from "./header.module.css";
import logo from "./component/BachKhoaLogo.png";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const studentID = localStorage.getItem("userid");
  const backend = process.env.REACT_APP_BACKEND_PORT;

  const fetchStudentData = async () => {
    if (!studentID) {
      console.error("User ID is not found.");
      return;
    }
    try {
      const response = await axios.get(
        `${backend}/api/student/id/${studentID}`
      );
      if (response.data) {
        setStudentData(response.data);
      } else {
        console.error("Student data not found");
      }
    } catch (err) {
      console.error("Error fetching student data:", err);
    }
  };

  useEffect(() => {
    if (props.isLogin && !studentData) {
      fetchStudentData();
    }
  }, [props.isLogin, studentData]); // Depend on both isLogin and studentData

  useEffect(() => {}, [studentData]);

  return (
    <>
      {props.isLogin ? (
        <div className={headerStyles.container}>
          <div className={headerStyles.dashboard}>
            <header className={headerStyles.header}>
              <div className={headerStyles.logo_container}>
                <div
                  onClick={() => navigate("/main")}
                  className={headerStyles.logo_link}
                >
                  <img
                    src={logo}
                    alt="HCMUT SPSS Logo"
                    className={headerStyles.logo}
                  />
                </div>
                <div className={headerStyles.logo_text}>
                  <span className={headerStyles.logo_line}>HCMUT</span>
                  <span className={headerStyles.logo_line}>SPSS</span>
                </div>
              </div>

              <nav className={headerStyles.header_nav}>
                <div
                  onClick={() => navigate("/main")}
                  className={headerStyles.nav_link}
                >
                  HOME
                </div>
                <div
                  onClick={() => navigate("/print")}
                  className={headerStyles.nav_link}
                >
                  PRINT
                </div>
                <div
                  onClick={() => navigate("/student")}
                  className={headerStyles.nav_link}
                >
                  PAYMENT
                </div>
                <div
                  onClick={() => navigate("/student")}
                  className={headerStyles.nav_link}
                >
                  HISTORY
                </div>
              </nav>

              <div className={headerStyles.header_right}>
                <div className={headerStyles.avatar}></div>
                <span className={headerStyles.user_name}>
                  {studentData ? studentData.student_name : "Loading..."}
                </span>
                <button
                  onClick={() => {
                    localStorage.removeItem("userid"); // Clear localStorage
                    props.setLogin(false);
                    navigate("/");
                  }}
                  className={headerStyles.logout_button}
                >
                  LOG OUT
                </button>
              </div>
            </header>
          </div>
        </div>
      ) : (
        <header className={headerStyles.header}>
          <div className={headerStyles.logo_container}>
            <div
              onClick={() => navigate("/main")}
              className={headerStyles.logo_link}
            >
              <img
                src={logo}
                alt="HCMUT SPSS Logo"
                className={headerStyles.logo}
              />
            </div>
            <div className={headerStyles.logo_text}>
              <span className={headerStyles.logo_line}>HCMUT</span>
              <span className={headerStyles.logo_line}>SPSS</span>
            </div>
          </div>

          <div className={headerStyles.header_right}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
              className={headerStyles.user_name}
            >
              CANCEL
            </div>
            <button
              onClick={() => navigate("/loginpage")}
              className={headerStyles.logout_button}
            >
              LOG IN
            </button>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
