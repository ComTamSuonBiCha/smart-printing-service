import React, { useEffect, useState } from "react";
import axios from "axios";
import headerStyles from "./header.module.css";
import logo from "./component/BachKhoaLogo.png";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const studentID = localStorage.getItem("userid");

  const fetchStudentData = async () => {
    if (!studentID) {
      // @ts-ignore
      setError("User ID is not found.");
      return;
    }

    try {
      const response = await axios.get(
        `http://192.168.1.52:5000/api/student/id/${studentID}`
      );
      if (response.data && response.data.length > 0) {
        setStudentData(response.data[0]);
      } else {
        // @ts-ignore
        setError("Student data not found.");
      }
    } catch (err) {
      // @ts-ignore
      setError("Failed to fetch student data");
      console.error("Error fetching student data:", err);
    }
  };

  useEffect(() => {
    if (props.isLogin && !studentData) {
      fetchStudentData();
    }
  }, [props.isLogin]); // Depend on `isLogin` only

  if (error) {
    return <div className={headerStyles.error}>{error}</div>;
  }

  return (
    <>
      {props.isLogin ? (
        <div className={headerStyles.container}>
          <div className={headerStyles.dashboard}>
            <header className={headerStyles.header}>
              <div className={headerStyles.logo_container}>
                <a onClick={() => navigate("/main")}>
                  <img
                    src={logo}
                    alt="HCMUT SPSS Logo"
                    className={headerStyles.logo}
                  />
                </a>
                <div className={headerStyles.logo_text}>
                  <span className={headerStyles.logo_line}>HCMUT</span>
                  <span className={headerStyles.logo_line}>SPSS</span>
                </div>
              </div>

              <nav className={headerStyles.header_nav}>
                <a
                  onClick={() => navigate("/")}
                  className={headerStyles.nav_link}
                >
                  HOME
                </a>
                <a
                  onClick={() => navigate("/print")}
                  className={headerStyles.nav_link}
                >
                  PRINT
                </a>
                <a
                  onClick={() => navigate("/")}
                  className={headerStyles.nav_link}
                >
                  PAYMENT
                </a>
                <a
                  onClick={() => navigate("/student")}
                  className={headerStyles.nav_link}
                >
                  HISTORY
                </a>
              </nav>
              <div className={headerStyles.header_right}>
                <div className={headerStyles.avatar}></div>
                <span className={headerStyles.user_name}>
                  {studentData
                    ? // @ts-ignore
                      studentData.student_name
                    : "Loading..."}
                </span>
                <button
                  onClick={() => {
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
            <a onClick={() => navigate("/main")}>
              <img
                src={logo}
                alt="HCMUT SPSS Logo"
                className={headerStyles.logo}
              />
            </a>
            <div className={headerStyles.logo_text}>
              <span className={headerStyles.logo_line}>HCMUT</span>
              <span className={headerStyles.logo_line}>SPSS</span>
            </div>
          </div>

          <div className={headerStyles.header_right}>
            <span className={headerStyles.user_name}>CANCEL</span>
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
