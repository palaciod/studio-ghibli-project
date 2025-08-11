import { GhibliFilm } from '../services/StudioGhibli/StudioGhibli.service';

// GraphQL Film type interface to match our schema
export interface GraphQLFilm {
  id: string;
  title: string;
  description: string;
  director: string;
  releaseDate: string;
  runningTime: number;
  rtScore: number;
  image?: string;
  movieBanner?: string;
}

/**
 * Transform Studio Ghibli API film data to GraphQL format
 */
export function transformGhibliFilmToGraphQL(
  ghibliFilm: GhibliFilm,
): GraphQLFilm {
  return {
    id: ghibliFilm.id,
    title: ghibliFilm.title,
    description: ghibliFilm.description,
    director: ghibliFilm.director,
    releaseDate: ghibliFilm.release_date,
    runningTime: parseInt(ghibliFilm.running_time, 10),
    rtScore: parseInt(ghibliFilm.rt_score, 10),
    image: ghibliFilm.image || undefined,
    movieBanner: ghibliFilm.movie_banner || undefined,
  };
}

/**
 * Transform multiple Studio Ghibli API films to GraphQL format
 */
export function transformGhibliFilmsToGraphQL(
  ghibliFilms: GhibliFilm[],
): GraphQLFilm[] {
  return ghibliFilms.map(transformGhibliFilmToGraphQL);
}

/**
 * Filter films by excluding specific IDs
 */
export function filterFilmsExcept(
  films: GraphQLFilm[],
  excludeIds: string[],
): GraphQLFilm[] {
  return films.filter((film) => !excludeIds.includes(film.id));
}

/**
 * Validate if a string represents a valid integer
 */
export function isValidInteger(value: string): boolean {
  if (value.trim() === '') return false;
  const num = Number(value);
  return Number.isInteger(num) && isFinite(num);
}

/**
 * Safely parse integer with fallback
 */
export function safeParseInt(value: string, fallback: number = 0): number {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
}
