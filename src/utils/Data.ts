import { ProjectData } from "../types";

function getRandomInt() {
  return Math.floor(Math.random() * 50);
}

export const Data: ProjectData[] = [
  {
    id: 1,
    month: "Jan",
    commits: getRandomInt(),
  },
  {
    id: 2,
    month: "Feb",
    commits: getRandomInt(),
  },
  {
    id: 3,
    month: "Mar",
    commits: getRandomInt(),
  },
  {
    id: 4,
    month: "Apr",
    commits: getRandomInt(),
  },
  {
    id: 5,
    month: "May",
    commits: getRandomInt(),
  },
  {
    id: 6,
    month: "Jun",
    commits: getRandomInt(),
  },
  {
    id: 7,
    month: "Jul",
    commits: getRandomInt(),
  },
  {
    id: 8,
    month: "Aug",
    commits: getRandomInt(),
  },
  {
    id: 9,
    month: "Sep",
    commits: getRandomInt(),
  },
  {
    id: 10,
    month: "Oct",
    commits: getRandomInt(),
  },
  {
    id: 11,
    month: "Nov",
    commits: getRandomInt(),
  },
  {
    id: 12,
    month: "Dec",
    commits: getRandomInt(),
  },
];
