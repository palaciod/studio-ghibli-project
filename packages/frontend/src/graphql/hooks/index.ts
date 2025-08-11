/**
 * GraphQL hooks for Studio Ghibli API integration
 * Uses Apollo Client with our backend GraphQL server
 */

import { useQuery } from '@apollo/client';
import {
  GET_ALL_FILMS,
  GET_FILM_BY_ID,
  GET_FILMS_BY_IDS,
  GET_FILMS_EXCEPT,
} from '~/graphql/queries';
import type {
  GetAllFilmsQuery,
  GetFilmByIdQuery,
  GetFilmByIdQueryVariables,
  GetFilmsByIdsQuery,
  GetFilmsByIdsQueryVariables,
  GetFilmsExceptQuery,
  GetFilmsExceptQueryVariables,
} from '~/graphql/gen/graphql';

// Hook for fetching all films
export function useAllFilms() {
  return useQuery<GetAllFilmsQuery>(GET_ALL_FILMS, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    // Cache the results for 5 minutes to match our backend cache
    fetchPolicy: 'cache-first',
  });
}

// Hook for fetching a single film by ID
export function useFilmById(filmId: string) {
  const queryResult = useQuery<GetFilmByIdQuery, GetFilmByIdQueryVariables>(
    GET_FILM_BY_ID,
    {
      variables: { id: filmId },
      errorPolicy: 'all', // Handle both network and GraphQL errors
      notifyOnNetworkStatusChange: true,
    },
  );

  return {
    ...queryResult,
    data: queryResult.data?.film || undefined,
  };
}

// Hook for fetching all films except specified IDs
export function useFilmsExcept(excludeIds: string[]) {
  return useQuery<GetFilmsExceptQuery, GetFilmsExceptQueryVariables>(
    GET_FILMS_EXCEPT,
    {
      variables: { ids: excludeIds },
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
      // Cache the results for 5 minutes to match our backend cache
      fetchPolicy: 'cache-first',
      // Skip the query if no IDs are provided to exclude
      skip: !excludeIds || excludeIds.length === 0,
    },
  );
}

// Hook for fetching multiple films by their IDs
export function useFilmsByIds(filmIds: string[]) {
  return useQuery<GetFilmsByIdsQuery, GetFilmsByIdsQueryVariables>(
    GET_FILMS_BY_IDS,
    {
      variables: { ids: filmIds },
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
      // Cache the results for 5 minutes to match our backend cache
      fetchPolicy: 'cache-first',
      // Skip the query if no IDs are provided
      skip: !filmIds || filmIds.length === 0,
    },
  );
}

// Re-export queries for direct use if needed
export { GET_ALL_FILMS, GET_FILM_BY_ID, GET_FILMS_BY_IDS, GET_FILMS_EXCEPT };
