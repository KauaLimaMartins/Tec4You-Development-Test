type CovidReport = {
  date: string;
  last_update: string;
  confirmed: number;
  deaths: number;
  recovered: number;
  active: number;
  fatality_rate: number;
};

type FilteredCovidReport = {
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
  active: number;
};

type Country = {
  name: string;
  iso: string;
}
