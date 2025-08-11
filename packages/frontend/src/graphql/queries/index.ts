import { gql } from '~/graphql/gen';

export const GET_ALL_FILMS = gql(`
  query GetAllFilms {
    allFilms {
      id
      title
      description
      director
      releaseDate
      runningTime
      rtScore
      image
      movieBanner
    }
  }
`);

export const GET_FILM_BY_ID = gql(`
  query GetFilmById($id: ID!) {
    film(id: $id) {
      id
      title
      description
      director
      releaseDate
      runningTime
      rtScore
      image
      movieBanner
    }
  }
`);

export const GET_FILMS_BY_IDS = gql(`
  query GetFilmsByIds($ids: [ID!]!) {
    films(ids: $ids) {
      id
      title
      description
      director
      releaseDate
      runningTime
      rtScore
      image
      movieBanner
    }
  }
`);

export const GET_FILMS_EXCEPT = gql(`
  query GetFilmsExcept($ids: [ID!]!) {
    filmsExcept(ids: $ids) {
      id
      title
      description
      director
      releaseDate
      runningTime
      rtScore
      image
      movieBanner
    }
  }
`);
