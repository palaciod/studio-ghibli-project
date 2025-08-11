import { stringArg, nonNull, extendType, idArg, list } from 'nexus';
import { Film } from './objectTypes.ghibliSchema';
import { GraphQLError } from 'graphql';
import { GQL_ERROR_CODES, ErrorMessages } from '~/shared/constants';
import { StudioGhibliService } from '../../services/StudioGhibli/StudioGhibli.service';
import {
  transformGhibliFilmToGraphQL,
  filterFilmsExcept,
  transformGhibliFilmsToGraphQL,
} from '../../shared/utils';

// Create service instances
const ghibliService = new StudioGhibliService();

export const GhibliQueries = extendType({
  type: 'Query',
  definition(t) {
    // Get all films
    t.field('allFilms', {
      type: nonNull(list(nonNull(Film))),
      resolve: async () => {
        try {
          // Fetch all films from Studio Ghibli API (with caching)
          const ghibliFilms = await ghibliService.getAllFilms();

          // Transform to GraphQL format
          return transformGhibliFilmsToGraphQL(ghibliFilms);
        } catch (error) {
          // Check if it's a network/API error
          if (
            error instanceof Error &&
            (error.message.includes('Network') ||
              error.message.includes('timeout') ||
              error.message.includes('Failed to fetch'))
          ) {
            throw new GraphQLError(
              'Unable to fetch films data from external service',
              {
                extensions: { code: GQL_ERROR_CODES.BAD_GATEWAY },
              },
            );
          }

          // Re-throw GraphQL errors as-is for proper client handling
          if (error instanceof GraphQLError) {
            throw error;
          }

          // Throw a generic error for unexpected errors
          throw new GraphQLError(ErrorMessages.ServerError, {
            extensions: { code: GQL_ERROR_CODES.SERVER_ERROR },
          });
        }
      },
    });

    t.field('film', {
      type: Film,
      args: {
        id: nonNull(idArg()),
      },
      resolve: async (_parent, { id }) => {
        try {
          // Fetch film from Studio Ghibli API (with caching)
          const ghibliFilm = await ghibliService.getFilm(id);

          // Transform to GraphQL format
          return transformGhibliFilmToGraphQL(ghibliFilm);
        } catch (error) {
          // Check if it's a 404 error (film not found)
          if (error instanceof Error && error.message.includes('404')) {
            throw new GraphQLError(`Film with id "${id}" not found`, {
              extensions: { code: GQL_ERROR_CODES.NOT_FOUND },
            });
          }

          // Check if it's a network/API error
          if (
            error instanceof Error &&
            (error.message.includes('Network') ||
              error.message.includes('timeout') ||
              error.message.includes('Failed to fetch'))
          ) {
            throw new GraphQLError(
              'Unable to fetch film data from external service',
              {
                extensions: { code: GQL_ERROR_CODES.BAD_GATEWAY },
              },
            );
          }

          // Re-throw GraphQL errors as-is for proper client handling
          if (error instanceof GraphQLError) {
            throw error;
          }

          // Throw a generic error for unexpected errors
          throw new GraphQLError(ErrorMessages.ServerError, {
            extensions: { code: GQL_ERROR_CODES.SERVER_ERROR },
          });
        }
      },
    });

    // Get multiple films by their IDs
    t.field('films', {
      type: nonNull(list(nonNull(Film))),
      args: {
        ids: nonNull(list(nonNull(idArg()))),
      },
      resolve: async (_parent, { ids }) => {
        try {
          // Validate input
          if (!Array.isArray(ids) || ids.length === 0) {
            throw new GraphQLError('At least one film ID must be provided', {
              extensions: { code: GQL_ERROR_CODES.BAD_USER_INPUT },
            });
          }

          // Fetch all films from Studio Ghibli API (with caching)
          const ghibliFilms = await ghibliService.getAllFilms();

          // Transform to GraphQL format
          const graphqlFilms = transformGhibliFilmsToGraphQL(ghibliFilms);

          // Filter to only include the requested IDs
          const requestedFilms = graphqlFilms.filter((film) =>
            ids.includes(film.id),
          );

          return requestedFilms;
        } catch (error) {
          // Check if it's a network/API error
          if (
            error instanceof Error &&
            (error.message.includes('Network') ||
              error.message.includes('timeout') ||
              error.message.includes('Failed to fetch'))
          ) {
            throw new GraphQLError(
              'Unable to fetch films data from external service',
              {
                extensions: { code: GQL_ERROR_CODES.BAD_GATEWAY },
              },
            );
          }

          // Re-throw GraphQL errors as-is for proper client handling
          if (error instanceof GraphQLError) {
            throw error;
          }

          // Throw a generic error for unexpected errors
          throw new GraphQLError(ErrorMessages.ServerError, {
            extensions: { code: GQL_ERROR_CODES.SERVER_ERROR },
          });
        }
      },
    });

    t.field('filmsExcept', {
      type: nonNull(list(nonNull(Film))),
      args: {
        ids: nonNull(list(nonNull(idArg()))),
      },
      resolve: async (_parent, { ids }) => {
        try {
          // Validate input - require at least one ID to exclude
          if (!Array.isArray(ids) || ids.length === 0) {
            throw new GraphQLError(
              'At least one ID must be provided to exclude. Use "allFilms" query to get all films.',
              {
                extensions: { code: GQL_ERROR_CODES.BAD_USER_INPUT },
              },
            );
          }

          // Fetch all films from Studio Ghibli API (with caching)
          const ghibliFilms = await ghibliService.getAllFilms();

          // Transform to GraphQL format
          const graphqlFilms = transformGhibliFilmsToGraphQL(ghibliFilms);

          // Filter out the specified IDs
          const filteredFilms = filterFilmsExcept(graphqlFilms, ids);

          return filteredFilms;
        } catch (error) {
          // Check if it's a network/API error
          if (
            error instanceof Error &&
            (error.message.includes('Network') ||
              error.message.includes('timeout') ||
              error.message.includes('Failed to fetch'))
          ) {
            throw new GraphQLError(
              'Unable to fetch films data from external service',
              {
                extensions: { code: GQL_ERROR_CODES.BAD_GATEWAY },
              },
            );
          }

          // Re-throw GraphQL errors as-is for proper client handling
          if (error instanceof GraphQLError) {
            throw error;
          }

          // Throw a generic error for unexpected errors
          throw new GraphQLError(ErrorMessages.ServerError, {
            extensions: { code: GQL_ERROR_CODES.SERVER_ERROR },
          });
        }
      },
    });
  },
});
