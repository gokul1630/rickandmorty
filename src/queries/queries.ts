export async function fetchCharacters(pageNumber?: string | number) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${pageNumber}`
  );

  return await response.json();
}
const episodes: Array<any> = [];
export async function fetchEpisodes(episode: any) {
  const response = await fetch(episode);
  return await response.json();
}

export async function fetchLocations(episode: any) {
  const response = await fetch(episode);
  return await response.json();
}
