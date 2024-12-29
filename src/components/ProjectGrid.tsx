"use client";
import React from "react";
import ProjectTile from "./ProjectTile";
import LoadingTile from "./LoadingTile";

import FetchProjects from "@/utils/FetchProjects";

const ProjectGrid = () => {
  const projects = FetchProjects();

  if (!projects) {
    return (
      <div className="project-wrapper">
        {Array.from(Array(4)).map((project, index) => {
          return <LoadingTile key={index} />;
        })}
      </div>
    );
  }

  return (
    <div className="project-wrapper">
      {projects.map((project, index) => {
        return <ProjectTile project={project} key={index} />;
      })}
    </div>
  );
};

export default ProjectGrid;
