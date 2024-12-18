export interface Project {
  title: string;
  excerpt: string;
  commits: number;
}

export interface ProjectData {
  id: number;
  month: string;
  commits: number;
}

interface ChartDataSet {
  label: string;
  data: number[];
  backgroundColor: string[];
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
