export default async function fetchPlanets() {
  try {
    return fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((planets) => planets.results);
  } catch (error) {
    console.log(error);
  }
}
