export interface StatsDisplayProps {
  visitorsThisWeek: number;
  visitorsLastWeek: number;
  topPages: Array<{ path: string; views: number }>;
  topSources: Array<{ source: string; views: number }>;
  topCountries: Array<{ country: string; views: number }>;
}

export default function StatsDisplay(_props: StatsDisplayProps) {
  return null;
}
