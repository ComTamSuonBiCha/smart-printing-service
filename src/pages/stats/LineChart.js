// LineChart.js
import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Title,
  Filler,
  CategoryScale, // Import CategoryScale for the x-axis
  LinearScale, // Import LinearScale for the y-axis
} from "chart.js";

// Register necessary components from Chart.js
Chart.register(
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Title,
  Filler,
  CategoryScale, // Register CategoryScale
  LinearScale // Register LinearScale
);

const LineChart = (props) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy the existing chart if it's there
    if (chartInstance.current) {
      // @ts-ignore
      chartInstance.current.destroy();
    }

    // Create a new line chart
    // @ts-ignore
    chartInstance.current = new Chart(chartRef.current, {
      type: "line", // This is for the line chart
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
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default LineChart;
