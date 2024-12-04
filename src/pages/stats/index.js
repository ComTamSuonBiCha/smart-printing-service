import React from "react";
import Header from "../../header";
import logo from "../../component/BachKhoaLogo.png";
import styles from "./stats.module.css";
import ChartComponent from "./DoughnutChart"; //
import LineChart from "./LineChart";
import PrinterList from "../printerList/printerList";
import BlocksLayout from "./blocks/inforBlock";
const doughnutData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

const lineData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Total",
      data: [65, 59, 80, 81, 56, 55],
      fill: false,
      borderColor: "#1967D2",
      tension: 0.1,
    },
  ],
};

const Stats = () => {
  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <Header logo={logo} />
        <main className={styles.main}>
          <div className={styles.leftContainer}>
            <div className={styles.doughnutContainer}>
              <ChartComponent data={doughnutData} />
            </div>
            <PrinterList></PrinterList>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.lineContainer}>
              <LineChart title="All Printers Statistic" data={lineData} />
            </div>
            <BlocksLayout></BlocksLayout>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Stats;
