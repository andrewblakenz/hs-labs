"use client";
import React, { Suspense, lazy } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState, useEffect } from "react";
import { Data } from "../utils/Data";

import ProjectIcon from "./icons/ProjectIcon";
import CommitIcon from "./icons/CommitIcon";

import { Project, ChartData } from "@/types";

Chart.register(CategoryScale);

const LineChart = lazy(() => import("./LineChart"));

let width, height, gradient;
function getGradient(ctx, chartArea) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, "#fff");
    gradient.addColorStop(1, "#FF500331");
  }

  return gradient;
}

const calcCommits = (data: number[]) => {
  const newArray = [];
  let totalCommits = 0;
  data.forEach((commitCount) => {
    const newCommitCount = totalCommits + commitCount;
    newArray.push(newCommitCount);
    totalCommits = newCommitCount;
  });
  return newArray;
};

const ProjectTile = ({ project }: { project: Project }) => {
  const [totalCommits, setTotalCommits] = useState(0);
  const [chartData] = useState<ChartData>({
    labels: Data.map((data) => data.month),
    datasets: [
      {
        label: "Total Commits ",
        data: calcCommits(Data.map((data, index) => data.commits)),
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return;
          }
          return getGradient(ctx, chartArea);
        },
        borderColor: "#ff5003",
        borderWidth: 2,
        fill: "start",
        pointStyle: "circle",
        pointRadius: 1,
        pointHoverRadius: 5,
      },
    ],
  });

  useEffect(() => {
    if (Data) {
      const commitCount = Data.reduce((prev, curr) => prev + curr.commits, 0);
      setTotalCommits(commitCount);
    }
  }, []);

  return (
    <div className="project-tile">
      <div className="project-tile__header">
        <div className="project-tile__header__left-col">
          <ProjectIcon />
          <h4 className="project-tile__header__left-col__heading">
            <span>HSL</span>
            {project.title}
          </h4>
        </div>
        <div className="project-tile__header__right-col">
          <div className="project-tile__header__right-col__commit-wrapper">
            <div className="project-tile__header__right-col__commit-wrapper__icon">
              <CommitIcon />
            </div>
            <div className="project-tile__header__right-col__commit-wrapper__text">
              <p>{totalCommits} commits</p>
            </div>
          </div>
        </div>
      </div>
      <p>{project.excerpt}</p>
      <Suspense fallback={<div>Loading...</div>}>
        <LineChart chartData={chartData} />
      </Suspense>
    </div>
  );
};

export default ProjectTile;
