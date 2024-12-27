"use client";
import React from "react";
import ProjectTile from "@/components/ProjectTile";

import FetchProjects from "@/utils/FetchProjects";

const ProjectGrid = () => {
  const projects = FetchProjects();

  console.log("Fetch Projects: ", projects);

  if (!projects) {
    return null;
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
