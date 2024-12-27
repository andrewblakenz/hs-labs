import { useState, useEffect } from "react";
import { Octokit } from "octokit";
import { Endpoints } from "@octokit/types";
import { BaseChartData } from "./Data";
import { CommitData, GitProject } from "../types";

type listUserReposResponse = Endpoints["GET /users/{username}/repos"]["response"];

const FetchProjects = () => {
  const [projects, setProjects] = useState<GitProject[] | null>();

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

      const repos: listUserReposResponse["data"] = data.data;
      console.log("repos", repos);
      const projects = await Promise.all(
        repos.map(async (repo) => {
          const commits = await octokit.request("GET /repos/{owner}/{repo}/commits", {
            owner: repo.owner.login,
            repo: repo.name,
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
              accept: "application/vnd.github.raw+json",
            },
          });

          // Clone the base chart data
          const chartData = [...BaseChartData];
          let commitData: CommitData = null;

          if (Array.isArray(commits.data)) {
            commitData = commits.data.map((commit) => {
              const commitDate = commit.commit.committer?.date;
              if (commitDate) {
                // Parse the commit date to determine the month
                const commitMonth = new Date(commitDate).getMonth(); // 0 = Jan, 11 = Dec

                // Increment the corresponding month's commit count
                chartData[commitMonth].commits += 1;
              }
              return {
                date: commitDate,
                message: commit.commit.message,
              };
            });
          }

          return {
            title: repo.name,
            excerpt: repo.description,
            totalCommits: commits.data.length | 0,
            commitData: commitData,
            chartData: chartData,
          };

          //console.log(contents)
        })
      );

      setProjects(projects);
    };
    getGitData().catch(console.error);
  }, []);

  return projects;
};

export default FetchProjects;
