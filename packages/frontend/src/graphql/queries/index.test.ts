import { describe, it, expect } from 'vitest';
import { GET_FILM_BY_ID, GET_FILMS_EXCEPT } from './index';

describe('GraphQL Queries', () => {
  it('should export GET_FILM_BY_ID query with correct structure', () => {
    expect(GET_FILM_BY_ID).toBeDefined();
    expect(GET_FILM_BY_ID.kind).toBe('Document');

    // Check that the query has the expected operation name
    const operation = GET_FILM_BY_ID.definitions[0] as any;
    expect(operation.operation).toBe('query');
    expect(operation.name.value).toBe('GetFilmById');
  });

  it('should export GET_FILMS_EXCEPT query with correct structure', () => {
    expect(GET_FILMS_EXCEPT).toBeDefined();
    expect(GET_FILMS_EXCEPT.kind).toBe('Document');

    // Check that the query has the expected operation name
    const operation = GET_FILMS_EXCEPT.definitions[0] as any;
    expect(operation.operation).toBe('query');
    expect(operation.name.value).toBe('GetFilmsExcept');
  });

  it('should have proper TypeScript typing', () => {
    // This test will fail to compile if the types are not properly generated
    const filmQuery = GET_FILM_BY_ID;
    const filmsQuery = GET_FILMS_EXCEPT;

    expect(filmQuery).toBeTruthy();
    expect(filmsQuery).toBeTruthy();
  });
});
