import React, { useEffect, useState } from "react";
import styles from "./studentInfo.module.css";
import BlocksLayout from "../stats/blocks/inforBlock";
import { Avatar } from "@mui/material";
import LineChart from "../stats/LineChart";
import axios from "axios";
import avatar from "../../component/avatar.png";
const InfoBlock = (props) => {
  return (
    <div className={styles.infoBlock}>
      <div className={styles.blockHeader}>{props.header}</div>
      <div className={styles.blockContent}>{props.content}</div>
    </div>
  );
};

const StudentInfo = () => {
  const [studentData, setStudentData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);
  const [error, setError] = useState(null);
  const studentID = localStorage.getItem("userid");
  const backend = process.env.REACT_APP_BACKEND_PORT;

  // Fetch student data
  const fetchStudentData = async () => {
    try {
      const response = await axios.get(
        `${backend}/api/student/id/${studentID}`
      );
      if (response.data) {
        setStudentData(response.data);
      } else {
        // @ts-ignore
        setError("Student data not found.");
      }
    } catch (err) {
      // @ts-ignore
      setError("Failed to fetch student data");
      console.error(err);
    }
  };

  // Fetch student orders
  const fetchStudentOrder = async () => {
    try {
      const response = await axios.get(
        `${backend}/api/student/id/${studentID}/order`
      );
      if (response.data) {
        formatLineChartData(response.data);
      } else {
        // @ts-ignore
        setError("Student order data not found.");
      }
    } catch (err) {
      // @ts-ignore
      setError("Failed to fetch student orders");
      console.error(err);
    }
  };

  // Format data for LineChart
  const formatLineChartData = (responseData) => {
    const labels = [];
    const data = [];

    responseData.forEach((item) => {
      const month = new Date(item.order_month).toLocaleString("default", {
        month: "long",
      });
      labels.push(month);
      data.push(item.counter);
    });

    setLineChartData({
      // @ts-ignore
      labels,
      datasets: [
        {
          label: "Total Orders",
          data,
          fill: false,
          borderColor: "#1967D2",
          tension: 0.1,
        },
      ],
    });
  };

  useEffect(() => {
    if (studentID) {
      fetchStudentData();
      fetchStudentOrder();
    } else {
      // @ts-ignore
      setError("No user ID found.");
    }
  }, [studentID]);

  // Show error or loading states
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!studentData || !lineChartData) {
    return <div className={styles.loading}>Loading data...</div>;
  }

  // Data for info blocks
  const data = [
    {
      color: "#1967D2",
      // @ts-ignore
      title: studentData?.total_pages_printed ?? "N/A",
      content: "Usage Frequency",
      icon: require("@mui/icons-material/Print").default,
    },
    {
      color: "#F9AB00",
      // @ts-ignore
      title: studentData?.total_print_orders ?? "N/A",
      content: "Printed Requests",
      icon: require("@mui/icons-material/RequestPage").default,
    },
    {
      color: "#34A853",
      // @ts-ignore
      title: studentData?.student_paper_balance ?? "N/A",
      content: "Paper Balance",
      icon: require("@mui/icons-material/Feed").default,
    },
    {
      color: "#D31818",
      // @ts-ignore
      title: studentData?.total_paper_transactions ?? "N/A",
      content: "Total Transactions",
      icon: require("@mui/icons-material/AttachMoney").default,
    },
  ];

  return (
    <div>
      <div className={styles.studentPage}>
        <h1>Student Info</h1>
        <div className={styles.studentLayout}>
          <div className={styles.leftLayout}>
            <Avatar
              sx={{ width: 150, height: 150 }}
              alt="Student Avatar"
              // @ts-ignore
              // src={avatar}
            />
            <div className={styles.studentInfo}>
              <InfoBlock
                header="Student Name"
                // @ts-ignore
                content={studentData?.student_name || "N/A"}
              />
              <InfoBlock
                header="Student ID"
                // @ts-ignore
                content="2252xxx"
              />
              <InfoBlock
                header="Email"
                // @ts-ignore
                content={studentData?.student_email || "N/A"}
              />
              <InfoBlock header="Faculty" content="Computer Science" />
            </div>
          </div>
          <div className={styles.rightLayout}>
            {/* Render LineChart with formatted data */}
            <LineChart title="Order Statistics" data={lineChartData} />
            <BlocksLayout data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
