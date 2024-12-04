import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

//
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HorizontalBarChart = () => {
  const data = {
    labels: ["PDF", "DOCX", "XLS", "XLSX"],
    datasets: [
      {
        label: "Votes",
        data: [12, 19, 3, 5],
        backgroundColor: "#C4E1F6",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>FileType</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizontalBarChart;
