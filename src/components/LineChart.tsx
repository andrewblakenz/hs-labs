import React from "react";
import { Line } from "react-chartjs-2";
import { ChartData } from "chart.js";

//import { ChartData } from "../types";

function LineChart({ chartData }: { chartData: ChartData<"line"> }) {
  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
          interaction: {
            intersect: false,
            mode: "index",
          },
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
        }}
      />
    </div>
  );
}
export default LineChart;
