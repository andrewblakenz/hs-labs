import ProjectIcon from "./icons/ProjectIcon";
import CommitIcon from "./icons/CommitIcon";

import { Project } from "@/types";

const ProjectTile = ({ project }: { project: Project }) => {
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
              <p>{project.commits} commits</p>
            </div>
          </div>
        </div>
      </div>
      <p>{project.excerpt}</p>
    </div>
  );
};

export default ProjectTile;
