import { searchCharacter, searchShow } from "../actions/tvdb";


export async function fetchShows(query: string) {
  return await searchShow(query);
}

export async function fetchCharacters(seriesId: string, query: string) {
  return await searchCharacter(seriesId, query);
}
