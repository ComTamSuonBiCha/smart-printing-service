import React, { useEffect, useRef } from "react";
import styles from "./stats.module.css";

import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  PieController,
} from "chart.js";
import { fontString } from "chart.js/helpers";

Chart.register(ArcElement, Tooltip, Legend, Title, PieController);

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      // @ts-ignore
      chartInstance.current.destroy();
    }

    // @ts-ignore
    chartInstance.current = new Chart(chartRef.current, {
      type: "doughnut",
      data: data,
      options: {
        responsive: true,
        cutout: "70%",
        plugins: {
          legend: {
            position: "right",
            labels: {
              padding: 20,
              font: 30,
              usePointStyle: "true",
              pointStyle: "circle",
              generateLabels: function (chart) {
                const data = chart.data.datasets[0]["data"];
                const labels = chart.data.labels;
                // @ts-ignore
                return labels.map((label, index) => ({
                  text: `${label}: ${data[index]}`,
                  // @ts-ignore
                  fillStyle: chart.data.datasets[0].backgroundColor[index],
                }));
              },
            },
          },
        },
      },
    });
    return () => {
      if (chartInstance.current) {
        // @ts-ignore
        chartInstance.current.destroy();
      }
    };
  }, [data]);
  return (
    <>
      <h2 style={{ color: "#1967D2", marginTop: 24 }}>Usage Chart</h2>
      <canvas className={styles.doughnut} ref={chartRef}></canvas>
    </>
  );
};

export default ChartComponent;
