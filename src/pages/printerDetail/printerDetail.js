import React from "react";
import styles from "./printerDetail.module.css";
import Header from "../../header";
import svg from "../../assets/printerSVG.svg";
import lineSVG from "../../assets/lineChartSVG.svg";
import pageSVG from "../../assets/pageSVG.svg";

import HorizontalBarChart from "./barChart";
import LineChart from "../stats/LineChart";
const lineData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Total",
      data: [65, 59, 80, 81, 56, 55, 50],
      fill: false,
      borderColor: "#1967D2",
      tension: 0.1,
    },
  ],
};
const UsageBlock = (props) => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        padding: 20,
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
        <h2 style={{ margin: 0 }}>Print Usages</h2>
        <h1 style={{ fontSize: 48 }}>1000</h1>
      </div>
      <div style={{ marginLeft: "20px", marginTop: 40 }}>
        <img style={{ width: 140 }} src={props.svg} alt="" />
      </div>
    </div>
  );
};

const PrinterDetail = () => {
  return (
    <div>
      <Header></Header>
      <div className={styles.printerPage}>
        <h1 style={{ color: "#032B91", fontSize: 60 }}>Summary Report</h1>
        <div className={styles.mainLayout}>
          <div className={styles.leftContainer}>
            <div className={styles.leftTop}>
              <div className={styles.printerTag}>
                <img src={svg}></img>
                <div className={styles.blueBtn}>Printer1</div>
              </div>
              <div className={styles.barChart}>
                <HorizontalBarChart></HorizontalBarChart>
              </div>
            </div>
          </div>

          <div className={styles.rightContainer}>
            <div className={styles.rightTop}>
              <UsageBlock svg={lineSVG}></UsageBlock>
              <UsageBlock svg={pageSVG}></UsageBlock>
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
