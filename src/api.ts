const API_KEY = 'd4c44cd9'; // Your OMDB API key
const BASE_URL = 'https://www.omdbapi.com';

export async function searchMovies(query: string) {
  if (!query) return [];
  
  const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.Search || [];
}

export async function getMovieDetails(imdbId: string) {
  const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&i=${imdbId}&plot=full`);
  const data = await response.json();
  return data;
}