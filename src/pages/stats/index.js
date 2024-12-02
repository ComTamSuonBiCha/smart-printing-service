// src/pages/Stats.js

import React from "react";
import Header from "../../header";
import logo from "../../component/BachKhoaLogo.png";
import styles from "./stats.module.css";
import ChartComponent from "./DoughnutChart"; // Import the chart component

const data = {
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
const Stats = () => {
  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <Header logo={logo} />
        <main className={styles.main}>
          <div className={styles.chartContainer}>
            <ChartComponent data={data} /> {/* Use the ChartComponent here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Stats;
