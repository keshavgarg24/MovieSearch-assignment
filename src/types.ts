export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieDetails extends Movie {
  Plot: string;
  Director: string;
  Actors: string;
  Genre: string;
  Runtime: string;
  Released: string;
  imdbRating: string;
}

export interface SearchHistory {
  query: string;
  timestamp: Date;
}