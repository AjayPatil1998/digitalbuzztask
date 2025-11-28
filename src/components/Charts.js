import { useState } from "react";
import {
  Bar,
  Line,
  Pie,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function ChartWidget() {
  const [chartType, setChartType] = useState("bar");
  const [dateRange, setDateRange] = useState("7");

  const generateData = () => {
    const days = parseInt(dateRange);
    const labels = Array.from({ length: days }, (_, i) => `Day ${i + 1}`);
    const values = Array.from({ length: days }, () =>
      Math.floor(Math.random() * 100)
    );
    return { labels, values };
  };

  const { labels, values } = generateData();


  const chartData = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: values,
        backgroundColor: "#3b82f6",
        borderColor: "#2563eb",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        borderWidth: 0,
      },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return <Line data={chartData} options={chartOptions} />;
      case "pie":
        return <Pie data={chartData} options={chartOptions} />;
      default:
        return <Bar data={chartData} options={chartOptions} />;
    }
  };
  
  return (
    <div className="p-6 border rounded-xl shadow-md bg-white w-[50vw]">
      {/*----------------------------- Filters Row----------------------------------- */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* -----------------------------Chart Type -----------------------------------*/}
        <div>
          <label className="block text-sm font-semibold mb-1">Chart Type</label>
          <select
            className="border px-3 py-2 rounded-lg text-sm"
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
            <option value="pie">Pie</option>
          </select>
        </div>

        {/*----------------------------- Date Range---------------------------------------- */}
        <div>
          <label className="block text-sm font-semibold mb-1">Date Range</label>
          <select
            className="border px-3 py-2 rounded-lg text-sm"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7">Last 7 Days</option>
            <option value="15">Last 15 Days</option>
            <option value="30">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* ----------------------------------------Chart -------------------------------------*/}
      <div className="w-full p-6 h-[350px] flex justify-center">{renderChart()}</div>
    </div>
  );
}
