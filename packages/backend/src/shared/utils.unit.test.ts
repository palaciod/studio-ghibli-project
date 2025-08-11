import {
  transformGhibliFilmToGraphQL,
  transformGhibliFilmsToGraphQL,
  filterFilmsExcept,
  isValidInteger,
  safeParseInt,
  GraphQLFilm,
} from './utils';
import { GhibliFilm } from '../services/StudioGhibli/StudioGhibli.service';

describe('Data Transformation Utils', () => {
  const mockGhibliFilm: GhibliFilm = {
    id: '2baf70d1-42bb-4437-b551-e5fed5a87abe',
    title: 'Castle in the Sky',
    original_title: '天空の城ラピュタ',
    original_title_romanised: 'Tenkū no shiro Rapyuta',
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg',
    movie_banner:
      'https://image.tmdb.org/t/p/original/3cyjYtLWCBE1uvWINHFsFnE8LUK.jpg',
    description: 'The orphan Sheeta inherited a mysterious crystal...',
    director: 'Hayao Miyazaki',
    producer: 'Isao Takahata',
    release_date: '1986',
    running_time: '124',
    rt_score: '95',
    people: [],
    species: [],
    locations: [],
    vehicles: [],
    url: 'https://ghibliapi.vercel.app/films/2baf70d1-42bb-4437-b551-e5fed5a87abe',
  };

  const expectedGraphQLFilm: GraphQLFilm = {
    id: '2baf70d1-42bb-4437-b551-e5fed5a87abe',
    title: 'Castle in the Sky',
    description: 'The orphan Sheeta inherited a mysterious crystal...',
    director: 'Hayao Miyazaki',
    releaseDate: '1986',
    runningTime: 124,
    rtScore: 95,
    image:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg',
    movieBanner:
      'https://image.tmdb.org/t/p/original/3cyjYtLWCBE1uvWINHFsFnE8LUK.jpg',
  };

  describe('transformGhibliFilmToGraphQL', () => {
    it('should transform Ghibli API film to GraphQL format', () => {
      const result = transformGhibliFilmToGraphQL(mockGhibliFilm);
      expect(result).toEqual(expectedGraphQLFilm);
    });

    it('should handle missing optional fields', () => {
      const filmWithoutOptionalFields: GhibliFilm = {
        ...mockGhibliFilm,
        image: '',
        movie_banner: '',
      };

      const result = transformGhibliFilmToGraphQL(filmWithoutOptionalFields);

      expect(result.image).toBeUndefined();
      expect(result.movieBanner).toBeUndefined();
    });

    it('should convert string numbers to integers', () => {
      const filmWithStringNumbers: GhibliFilm = {
        ...mockGhibliFilm,
        running_time: '120',
        rt_score: '88',
      };

      const result = transformGhibliFilmToGraphQL(filmWithStringNumbers);

      expect(result.runningTime).toBe(120);
      expect(result.rtScore).toBe(88);
      expect(typeof result.runningTime).toBe('number');
      expect(typeof result.rtScore).toBe('number');
    });
  });

  describe('transformGhibliFilmsToGraphQL', () => {
    it('should transform array of Ghibli films to GraphQL format', () => {
      const mockFilms = [
        mockGhibliFilm,
        { ...mockGhibliFilm, id: 'different-id' },
      ];
      const result = transformGhibliFilmsToGraphQL(mockFilms);

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual(expectedGraphQLFilm);
      expect(result[1]).toEqual({ ...expectedGraphQLFilm, id: 'different-id' });
    });

    it('should handle empty array', () => {
      const result = transformGhibliFilmsToGraphQL([]);
      expect(result).toEqual([]);
    });
  });

  describe('filterFilmsExcept', () => {
    const mockFilms: GraphQLFilm[] = [
      { ...expectedGraphQLFilm, id: 'film-1' },
      { ...expectedGraphQLFilm, id: 'film-2' },
      { ...expectedGraphQLFilm, id: 'film-3' },
    ];

    it('should filter out films with specified IDs', () => {
      const result = filterFilmsExcept(mockFilms, ['film-1', 'film-3']);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('film-2');
    });

    it('should return all films when no IDs to exclude', () => {
      const result = filterFilmsExcept(mockFilms, []);
      expect(result).toEqual(mockFilms);
    });

    it('should return all films when exclude IDs do not match', () => {
      const result = filterFilmsExcept(mockFilms, ['non-existent-id']);
      expect(result).toEqual(mockFilms);
    });

    it('should handle empty films array', () => {
      const result = filterFilmsExcept([], ['any-id']);
      expect(result).toEqual([]);
    });
  });

  describe('isValidInteger', () => {
    it('should return true for valid integer strings', () => {
      expect(isValidInteger('123')).toBe(true);
      expect(isValidInteger('0')).toBe(true);
      expect(isValidInteger('-123')).toBe(true);
    });

    it('should return false for invalid integer strings', () => {
      expect(isValidInteger('123.45')).toBe(false);
      expect(isValidInteger('abc')).toBe(false);
      expect(isValidInteger('')).toBe(false);
      expect(isValidInteger('123abc')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isValidInteger('Infinity')).toBe(false);
      expect(isValidInteger('NaN')).toBe(false);
    });
  });

  describe('safeParseInt', () => {
    it('should parse valid integer strings', () => {
      expect(safeParseInt('123')).toBe(123);
      expect(safeParseInt('0')).toBe(0);
      expect(safeParseInt('-123')).toBe(-123);
    });

    it('should return fallback for invalid strings', () => {
      expect(safeParseInt('abc')).toBe(0);
      expect(safeParseInt('')).toBe(0);
      expect(safeParseInt('123.45')).toBe(123); // parseInt truncates
    });

    it('should use custom fallback value', () => {
      expect(safeParseInt('abc', 42)).toBe(42);
      expect(safeParseInt('', -1)).toBe(-1);
    });

    it('should handle edge cases', () => {
      expect(safeParseInt('Infinity', 100)).toBe(100);
      expect(safeParseInt('NaN', 200)).toBe(200);
    });
  });
});
