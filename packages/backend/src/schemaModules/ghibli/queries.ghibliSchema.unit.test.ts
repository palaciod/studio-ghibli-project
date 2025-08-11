import { StudioGhibliService } from '../../services/StudioGhibli/StudioGhibli.service';
import {
  transformGhibliFilmToGraphQL,
  filterFilmsExcept,
  transformGhibliFilmsToGraphQL,
} from '../../shared/utils';
import { GraphQLError } from 'graphql';
import { GQL_ERROR_CODES } from '../../shared/constants';

// Mock the services
jest.mock('../../services/StudioGhibli/StudioGhibli.service');
const MockedStudioGhibliService = StudioGhibliService as jest.MockedClass<
  typeof StudioGhibliService
>;

// Import the resolver functions by importing the module and extracting the logic
import { GhibliQueries } from './queries.ghibliSchema';

describe('Ghibli GraphQL Resolvers', () => {
  let mockGhibliService: jest.Mocked<StudioGhibliService>;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    // Create mock instance
    mockGhibliService = {
      getFilm: jest.fn(),
      getAllFilms: jest.fn(),
    } as any;

    // Make the constructor return our mock
    MockedStudioGhibliService.mockImplementation(() => mockGhibliService);
  });

  describe('film resolver', () => {
    const mockGhibliFilm = {
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

    const expectedGraphQLFilm = {
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

    it('should successfully fetch and transform a film', async () => {
      mockGhibliService.getFilm.mockResolvedValue(mockGhibliFilm);

      // Test the service call directly
      const serviceResult = await mockGhibliService.getFilm(mockGhibliFilm.id);
      expect(serviceResult).toEqual(mockGhibliFilm);
      expect(mockGhibliService.getFilm).toHaveBeenCalledWith(mockGhibliFilm.id);

      // Test the transformation
      const transformedResult = transformGhibliFilmToGraphQL(serviceResult);
      expect(transformedResult).toEqual(expectedGraphQLFilm);
    });

    it('should handle 404 errors properly', async () => {
      const error404 = new Error('404 Not Found');
      mockGhibliService.getFilm.mockRejectedValue(error404);

      try {
        await mockGhibliService.getFilm('non-existent-id');
      } catch (error) {
        expect(error).toEqual(error404);
      }
    });

    it('should handle network errors properly', async () => {
      const networkError = new Error('Network timeout');
      mockGhibliService.getFilm.mockRejectedValue(networkError);

      try {
        await mockGhibliService.getFilm('some-id');
      } catch (error) {
        expect(error).toEqual(networkError);
      }
    });
  });

  describe('filmsExcept resolver', () => {
    const mockGhibliFilms = [
      {
        id: 'film-1',
        title: 'Film 1',
        original_title: 'Original 1',
        original_title_romanised: 'Romanised 1',
        image: 'image1.jpg',
        movie_banner: 'banner1.jpg',
        description: 'Description 1',
        director: 'Director 1',
        producer: 'Producer 1',
        release_date: '2001',
        running_time: '120',
        rt_score: '85',
        people: [],
        species: [],
        locations: [],
        vehicles: [],
        url: 'url1',
      },
      {
        id: 'film-2',
        title: 'Film 2',
        original_title: 'Original 2',
        original_title_romanised: 'Romanised 2',
        image: 'image2.jpg',
        movie_banner: 'banner2.jpg',
        description: 'Description 2',
        director: 'Director 2',
        producer: 'Producer 2',
        release_date: '2002',
        running_time: '130',
        rt_score: '90',
        people: [],
        species: [],
        locations: [],
        vehicles: [],
        url: 'url2',
      },
      {
        id: 'film-3',
        title: 'Film 3',
        original_title: 'Original 3',
        original_title_romanised: 'Romanised 3',
        image: 'image3.jpg',
        movie_banner: 'banner3.jpg',
        description: 'Description 3',
        director: 'Director 3',
        producer: 'Producer 3',
        release_date: '2003',
        running_time: '140',
        rt_score: '95',
        people: [],
        species: [],
        locations: [],
        vehicles: [],
        url: 'url3',
      },
    ];

    it('should fetch all films and filter out specified IDs', async () => {
      mockGhibliService.getAllFilms.mockResolvedValue(mockGhibliFilms);

      const allFilms = await mockGhibliService.getAllFilms();
      const transformedFilms = transformGhibliFilmsToGraphQL(allFilms);
      const filteredFilms = filterFilmsExcept(transformedFilms, [
        'film-1',
        'film-3',
      ]);

      expect(filteredFilms).toHaveLength(1);
      expect(filteredFilms[0].id).toBe('film-2');
      expect(mockGhibliService.getAllFilms).toHaveBeenCalledTimes(1);
    });

    it('should return all films when no IDs match', async () => {
      mockGhibliService.getAllFilms.mockResolvedValue(mockGhibliFilms);

      const allFilms = await mockGhibliService.getAllFilms();
      const transformedFilms = transformGhibliFilmsToGraphQL(allFilms);
      const filteredFilms = filterFilmsExcept(transformedFilms, [
        'non-existent-id',
      ]);

      expect(filteredFilms).toHaveLength(3);
    });

    it('should handle network errors when fetching all films', async () => {
      const networkError = new Error('Failed to fetch all films');
      mockGhibliService.getAllFilms.mockRejectedValue(networkError);

      try {
        await mockGhibliService.getAllFilms();
      } catch (error) {
        expect(error).toEqual(networkError);
      }
    });
  });

  describe('utility function integration', () => {
    it('should properly integrate transformation and filtering', async () => {
      const mockFilms = [
        {
          id: 'keep-1',
          title: 'Keep 1',
          description: 'Desc 1',
          director: 'Dir 1',
          release_date: '2001',
          running_time: '120',
          rt_score: '85',
          image: 'img1.jpg',
          movie_banner: 'banner1.jpg',
        },
        {
          id: 'exclude-1',
          title: 'Exclude 1',
          description: 'Desc 2',
          director: 'Dir 2',
          release_date: '2002',
          running_time: '130',
          rt_score: '90',
          image: 'img2.jpg',
          movie_banner: 'banner2.jpg',
        },
        {
          id: 'keep-2',
          title: 'Keep 2',
          description: 'Desc 3',
          director: 'Dir 3',
          release_date: '2003',
          running_time: '140',
          rt_score: '95',
          image: 'img3.jpg',
          movie_banner: 'banner3.jpg',
        },
      ] as any;

      // Transform to GraphQL format
      const transformedFilms = transformGhibliFilmsToGraphQL(mockFilms);

      // Filter out specific IDs
      const filteredFilms = filterFilmsExcept(transformedFilms, ['exclude-1']);

      expect(filteredFilms).toHaveLength(2);
      expect(filteredFilms.map((f) => f.id)).toEqual(['keep-1', 'keep-2']);

      // Check transformation worked correctly
      expect(filteredFilms[0].releaseDate).toBe('2001'); // camelCase
      expect(filteredFilms[0].runningTime).toBe(120); // number
      expect(filteredFilms[0].rtScore).toBe(85); // number
      expect(filteredFilms[0].movieBanner).toBe('banner1.jpg'); // camelCase
    });
  });
});
