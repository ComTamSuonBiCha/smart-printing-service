import React, { useEffect, useRef } from "react";
import styles from "./stats.module.css";

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Title,
  Filler,
  CategoryScale,
  LinearScale,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Title,
  Filler,
  CategoryScale,
  LinearScale
);

const LineChart = (props) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      // @ts-ignore
      chartInstance.current.destroy();
    }

    // @ts-ignore
    chartInstance.current = new Chart(chartRef.current, {
      type: "line",
      data: props.data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
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
  }, [props.data]);

  return (
    <div>
      <h2 style={{ color: "#1967D2", marginBottom: 12 }}>{props.title}</h2>
      <canvas className={styles.lineChart} ref={chartRef}></canvas>
    </div>
  );
};

export default LineChart;
