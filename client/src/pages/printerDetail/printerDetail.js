import React, { useEffect, useState } from "react";
import styles from "./printerDetail.module.css";
import svg from "../../assets/printerSVG.svg";
import lineSVG from "../../assets/lineChartSVG.svg";
import pageSVG from "../../assets/pageSVG.svg";

import HorizontalBarChart from "./barChart";
import LineChart from "../stats/LineChart";
import RecentlyBlock from "./recentlyBlock";
import { useLocation } from "react-router-dom";
import axios from "axios";
import moment from "moment"; // Import moment.js for date manipulation

const UsageBlock = (props) => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: 40,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 12,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100%",
          gap: 28,
        }}
      >
        <h2 style={{ margin: 0 }}>{props.content}</h2>
        <h1 style={{ fontSize: 48 }}>{props.value}</h1>
      </div>
      <div style={{ marginLeft: "20px", marginTop: 40 }}>
        <img style={{ width: 140 }} src={props.svg} alt="" />
      </div>
    </div>
  );
};

const PrinterDetail = () => {
  const location = useLocation();
  const { printerId } = location.state || {};
  const backend = process.env.REACT_APP_BACKEND_PORT;

  // @ts-ignore
  const [error, setError] = useState(null);
  const [recentData, setRecentData] = useState(null);
  const [printerData, setPrinterData] = useState(null);
  const [usageData, setUsageData] = useState(null);
  const [paperData, setPaperData] = useState(null);
  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total",
        data: [],
        fill: false,
        borderColor: "#1967D2",
        tension: 0.1,
      },
    ],
  });

  const fetchPrinterUsageByMonth = async () => {
    try {
      const response = await axios.get(
        `${backend}/api/printer/history/months/6`
      );

      if (response.data) {
        const months = [
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        let counters = Array(6).fill(0);

        response.data.forEach((item) => {
          const monthIndex = moment(item.order_month, "YYYY-MM").month() - 6;
          counters[monthIndex] = item.counter;
        });

        setLineData({
          // @ts-ignore
          labels: months,
          datasets: [
            {
              label: "Total",
              // @ts-ignore
              data: counters,
              fill: false,
              borderColor: "#1967D2",
              tension: 0.1,
            },
          ],
        });
      } else {
        // @ts-ignore
        setError("No printer data found.");
      }
    } catch (err) {
      // @ts-ignore
      setError("Failed to fetch printer data.");
      console.error(err);
    }
  };

  const fetchPrinterDetail = async () => {
    try {
      const response = await axios.get(
        `${backend}/api/printer/id/${printerId}`
      );
      if (response.data) {
        setPrinterData(response.data[0]);
      } else {
        // @ts-ignore
        setError("No printer data found.");
      }
    } catch (err) {
      // @ts-ignore
      setError("Failed to fetch printer data.");
      console.error(err);
    }
  };
  const fetchPrinterUsage = async () => {
    try {
      const response = await axios.get(
        `${backend}/api/printer/history/id/${printerId}`
      );
      if (response.data) {
        setUsageData(response.data[0].usage);
        setPaperData(response.data[0].paper_left);
      } else {
        // @ts-ignore
        setError("No printer data found.");
      }
    } catch (err) {
      // @ts-ignore
      setError("Failed to fetch printer data.");
      console.error(err);
    }
  };
  const fetchPrinterOrder = async () => {
    try {
      const response = await axios.get(
        `${backend}/api/printer/history/id/${printerId}/order`
      );

      if (response.data) {
        const formattedData = response.data.map((item) => {
          const date = new Date(item.Time);

          const formattedTime = `${date.toLocaleDateString("en-US", {
            year: "2-digit",
            month: "numeric",
            day: "numeric",
          })}, ${date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}`;

          return {
            name: item.Name,
            time: formattedTime,
            file: item.File_name,
          };
        });

        setRecentData(formattedData);
      } else {
        // @ts-ignore
        setError("No printer data found.");
      }
    } catch (err) {
      // @ts-ignore
      setError("Failed to fetch printer data.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPrinterOrder();
    fetchPrinterDetail();
    fetchPrinterUsageByMonth();
    fetchPrinterUsage();
  }, [printerId]);

  return (
    <div>
      <div className={styles.printerPage}>
        <h1 style={{ color: "#032B91", fontSize: 60 }}>Summary Report</h1>
        <div className={styles.mainLayout}>
          <div className={styles.leftContainer}>
            <div className={styles.leftTop}>
              <div className={styles.printerTag}>
                <img src={svg}></img>
                <div className={styles.blueBtn}>Printer {printerId}</div>
              </div>
              <div className={styles.barChart}>
                <HorizontalBarChart></HorizontalBarChart>
              </div>
            </div>
            <div>
              {recentData ? (
                <RecentlyBlock
                  // @ts-ignore
                  location={printerData?.location}
                  // @ts-ignore
                  status={printerData?.status}
                  data={recentData}
                />
              ) : (
                <p>Loading recent data...</p>
              )}
            </div>
          </div>

          <div className={styles.rightContainer}>
            <div className={styles.rightTop}>
              <UsageBlock
                content="Usage"
                // @ts-ignore
                value={usageData}
                svg={lineSVG}
              ></UsageBlock>
              <UsageBlock
                content="Paper"
                // @ts-ignore
                value={paperData}
                svg={pageSVG}
              ></UsageBlock>
            </div>
            <div className={styles.lineChart}>
              <LineChart data={lineData}></LineChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrinterDetail;
