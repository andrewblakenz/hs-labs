import React, { Suspense, lazy } from "react";
import { Chart, CategoryScale, ChartData, Color, registerables } from "chart.js";
import { useState } from "react";
import capitalize from "../utils/capitalize";

import ProjectIcon from "./icons/ProjectIcon";
import CommitIcon from "./icons/CommitIcon";

import { GitProject } from "@/types";

Chart.register(...registerables, CategoryScale);

const LineChart = lazy(() => import("./LineChart"));

let width: number, height: number, gradient: Color;
function getGradient(chart: Chart) {
  const { ctx, chartArea } = chart;

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
  const newArray = [] as number[];
  let totalCommits = 0;
  data.forEach((commitCount) => {
    const newCommitCount = totalCommits + commitCount;
    newArray.push(newCommitCount);
    totalCommits = newCommitCount;
  });
  return newArray;
};

const ProjectModal = ({ project, callback }: { project: GitProject; callback: () => unknown }) => {
  const [chartData] = useState<ChartData>({
    labels: project.chartData.map((data) => data.month),
    datasets: [
      {
        label: "Lifetime Commits ",
        data: calcCommits(project.chartData.map((data) => data.commits)),
        backgroundColor: function (context: { chart: Chart; type: string }): Color | undefined {
          const chart = context.chart;

          if (!chart.chartArea) {
            // This case happens on initial chart load
            return;
          }
          return getGradient(chart /*ctx, chartArea*/);
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

  if (!project) return null;

  return (
    <div className="project-modal-wrapper">
      <div className="project-modal-overlay" onClick={callback}></div>
      <div className="project-modal">
        <div className="project-modal__close" onClick={callback}>
          X
        </div>
        <div className="project-modal__inner">
          <div className="project-modal__header">
            <div className="project-modal__header__left-col">
              <div className="project-modal__header__left-col__inner">
                <div className="project-modal__header__left-col__inner__top-row">
                  <ProjectIcon />
                  <h4 className="project-modal__header__left-col__inner__top-row__heading">
                    <span>HSL</span>
                    {capitalize(project.title)}
                  </h4>
                </div>
                <div className="project-modal__header__left-col__inner__bottom-row">
                  <div className="project-modal__header__left-col__inner__bottom-row__commit-wrapper">
                    <div className="project-modal__header__left-col__inner__bottom-row__commit-wrapper__icon">
                      <CommitIcon />
                    </div>
                    <div className="project-modal__header__left-col__inner__bottom-row__commit-wrapper__text">
                      <p>{project.totalCommits} commits</p>
                    </div>
                  </div>
                </div>
              </div>
              {/*project.excerpt && <p>{project.excerpt}</p>*/}
            </div>
            <div className="project-modal__header__right-col">
              <Suspense fallback={<div>Loading...</div>}>
                <LineChart chartData={chartData as ChartData<"line">} />
              </Suspense>
            </div>
          </div>
          <div className="project-modal__commit-wrapper">
            {project.commitData &&
              project.commitData.length >= 1 &&
              project.commitData.map((commit, index) => {
                return (
                  <div className="project-modal__commit-message" key={index}>
                    {commit.date && (
                      <h3>
                        {new Date(commit.date).toLocaleDateString("en-NZ", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </h3>
                    )}
                    <p>{commit.message}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
