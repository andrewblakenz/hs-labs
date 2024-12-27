/*"use client";
import React, { useState, useEffect } from "react";
import { Octokit } from "octokit";
import ProjectTile from "@/components/ProjectTile";
import dummyData from "@/data.json";

const ProjectGrid = () => {
  const [gitData, setGitData] = useState();
  const [projects, setProjects] = useState<[]>();

  const octokit = new Octokit({
    auth: process.env.GIT_FINE_TOKEN,
  });

  useEffect(() => {
    const getGitData = async () => {
      const data = await octokit.request("GET /users/{user}/repos", {
        user: "hs-portal",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          accept: "application/vnd.github+json",
        },
      });

      const projects = await Promise.all(
        data.data.map(async (repo) => {
          const commits = await octokit.request("GET /repos/{owner}/{repo}/commits", {
            owner: repo.owner.login,
            repo: repo.name,
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
              accept: "application/vnd.github.raw+json",
            },
          });
          return { title: repo.name, commits: commits };

          //console.log(contents)
        })
      );

      setGitData(data);
      setProjects(projects);
    };
    getGitData().catch(console.error);
  }, []);

  useEffect(() => {
    if (gitData && gitData.data && gitData.data.length >= 1) {
      console.log("gitdata: ", gitData);
    } else {
      console.log("No Data");
    }
  }, [gitData]);

  useEffect(() => {
    if (projects && projects.length >= 1) {
      // console.log("projects: ", projects[0].readme.data.content);
      console.log("projects: ", projects);
    } else {
      console.log("No Projects");
    }
  }, [projects]);

  return (
    <div className="project-wrapper">
      {dummyData.map((poject, index) => {
        return <ProjectTile project={poject} key={index} />;
      })}
    </div>
  );
};

export default ProjectGrid;
*/
