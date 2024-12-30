import { Octokit } from "octokit";
import { Endpoints } from "@octokit/types";
import { BaseChartData } from "./Data";
import { CommitData, GitProject } from "../types";

type listUserReposResponse = Endpoints["GET /users/{username}/repos"]["response"];
type listRepoCommitsResponse = Endpoints["GET /repos/{owner}/{repo}/commits"]["response"];

const FetchProjects = async (): Promise<GitProject[]> => {
  const octokit = new Octokit({
    auth: process.env.GIT_FINE_TOKEN,
  });

  const fetchAllPages = async <T>(apiCall: (page: number) => Promise<{ data: T[] }>): Promise<T[]> => {
    let page = 1;
    const results: T[] = [];
    while (true) {
      const response = await apiCall(page);
      results.push(...response.data);
      if (response.data.length < 100) break; // GitHub API returns less than 100 items if it's the last page
      page++;
    }
    return results;
  };

  try {
    const repos: listUserReposResponse["data"] = await fetchAllPages((page) =>
      octokit.request("GET /users/{user}/repos", {
        user: "hs-portal",
        per_page: 100,
        page,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          accept: "application/vnd.github+json",
        },
      })
    );

    const projects = await Promise.all(
      repos.map(async (repo) => {
        const commits: listRepoCommitsResponse["data"] = await fetchAllPages((page) =>
          octokit.request("GET /repos/{owner}/{repo}/commits", {
            owner: repo.owner.login,
            repo: repo.name,
            per_page: 100,
            page,
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
              accept: "application/vnd.github.raw+json",
            },
          })
        );

        // Clone the base chart data
        const chartData = [...BaseChartData];
        let commitData: CommitData = null;

        if (Array.isArray(commits)) {
          commitData = commits.map((commit) => {
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
          totalCommits: commits.length || 0,
          commitData: commitData,
          chartData: chartData,
        };
      })
    );

    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export default FetchProjects;
