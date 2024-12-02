import React, { useEffect, useRef } from "react";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  PieController,
} from "chart.js";

// Register necessary components from Chart.js
Chart.register(ArcElement, Tooltip, Legend, Title, PieController);

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Destroy the existing chart if it's there
    if (chartInstance.current) {
      // @ts-ignore
      chartInstance.current.destroy();
    }

    // Create a new doughnut chart
    // @ts-ignore
    chartInstance.current = new Chart(chartRef.current, {
      type: "doughnut",
      data: data,
      options: {
        responsive: true,
        cutout: "70%", // Hole size in the center of the doughnut
        plugins: {
          title: {
            display: true,
            text: "Usage Chart", // Title of the chart
          },

          legend: {
            position: "right", // Position legend on the right
            labels: {
              generateLabels: function (chart) {
                const original =
                  Chart.defaults.plugins.legend.labels.generateLabels;
                const labels = original.call(this, chart);
                labels.forEach((label, index) => {
                  const dataset = chart.data.datasets[index];
                  label.text = `${label.text}: ${dataset.data[index]}`;
                });

                return labels;
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
      {/* The chart */}
      <canvas ref={chartRef}></canvas>

      {/* Tooltip container */}
      <div
        id="chartjs-tooltip"
        style={{
          opacity: 0,
          position: "absolute",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: "8px",
          borderRadius: "4px",
          pointerEvents: "none",
        }}
      />
    </>
  );
};

export default ChartComponent;
