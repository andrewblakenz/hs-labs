export interface ProjectData {
  id: number;
  month: string;
  commits: number;
}

interface ChartDataSet {
  label: string;
  data: number[];
  backgroundColor: (context: unknown) => unknown;
  borderColor: string;
  borderWidth: number;
  fill: boolean | string;
  pointStyle: string;
  pointRadius: number;
  pointHoverRadius: number;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataSet[];
}

export type CommitData =
  | {
      date: string | undefined;
      message: string;
    }[]
  | null;

export type GitProject = {
  title: string;
  excerpt: string | null;
  totalCommits: number;
  commitData: CommitData;
  chartData: ProjectData[];
};
