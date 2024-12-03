import React, { useEffect, useRef } from "react";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  PieController,
} from "chart.js";

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
          title: {
            display: true,
            text: "Usage Chart",
          },

          legend: {
            position: "right",
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
      <canvas ref={chartRef}></canvas>
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
