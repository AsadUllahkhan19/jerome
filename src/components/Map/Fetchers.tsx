export const AllAirportFetcher = (endpoint: string) =>
  fetch(endpoint).then((res) =>  res.json());
