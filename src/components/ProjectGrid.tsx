"use client";
import React from "react";
import ProjectTile from "@/components/ProjectTile";

import FetchProjects from "@/utils/FetchProjects";

const ProjectGrid = () => {
  const projects = FetchProjects();

  if (!projects) {
    return <p>Loading Projects</p>; //TODO Set up Proper loading scene
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
