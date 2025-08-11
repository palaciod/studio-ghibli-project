import { StudioGhibliService, GhibliFilm } from './StudioGhibli.service';
import { HttpService } from '../Http/Http.service';
import { CacheService } from '../Cache/Cache.service';

// Mock the HttpService
jest.mock('../Http/Http.service');
jest.mock('../Cache/Cache.service');

const MockedHttpService = HttpService as jest.MockedClass<typeof HttpService>;
const MockedCacheService = CacheService as jest.MockedClass<
  typeof CacheService
>;

describe('StudioGhibliService', () => {
  let service: StudioGhibliService;
  let mockHttpService: jest.Mocked<HttpService>;
  let mockCacheService: jest.Mocked<CacheService>;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    // Create mock instances
    mockHttpService = {
      get: jest.fn(),
      post: jest.fn(),
    } as any;

    mockCacheService = {
      get: jest.fn(),
      set: jest.fn(),
      delete: jest.fn(),
      clear: jest.fn(),
      size: jest.fn(),
      cleanup: jest.fn(),
    } as any;

    // Make the constructors return our mocks
    MockedHttpService.mockImplementation(() => mockHttpService);
    MockedCacheService.mockImplementation(() => mockCacheService);

    service = new StudioGhibliService();
  });

  describe('getFilm', () => {
    const mockFilm: GhibliFilm = {
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

    it('should return cached film if available', async () => {
      mockCacheService.get.mockReturnValue(mockFilm);

      const result = await service.getFilm(
        '2baf70d1-42bb-4437-b551-e5fed5a87abe',
      );

      expect(mockCacheService.get).toHaveBeenCalledWith(
        'film:2baf70d1-42bb-4437-b551-e5fed5a87abe',
      );
      expect(mockHttpService.get).not.toHaveBeenCalled();
      expect(result).toEqual(mockFilm);
    });

    it('should fetch from API and cache when not in cache', async () => {
      mockCacheService.get.mockReturnValue(null);
      mockHttpService.get.mockResolvedValue({
        data: mockFilm,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      });

      const result = await service.getFilm(
        '2baf70d1-42bb-4437-b551-e5fed5a87abe',
      );

      expect(mockCacheService.get).toHaveBeenCalledWith(
        'film:2baf70d1-42bb-4437-b551-e5fed5a87abe',
      );
      expect(mockHttpService.get).toHaveBeenCalledWith({
        endpoint:
          'https://ghibliapi.vercel.app/films/2baf70d1-42bb-4437-b551-e5fed5a87abe',
      });
      expect(mockCacheService.set).toHaveBeenCalledWith(
        'film:2baf70d1-42bb-4437-b551-e5fed5a87abe',
        mockFilm,
      );
      expect(result).toEqual(mockFilm);
    });

    it('should throw an error when film fetch fails', async () => {
      const error = new Error('Network error');
      mockCacheService.get.mockReturnValue(null);
      mockHttpService.get.mockRejectedValue(error);

      await expect(service.getFilm('invalid-id')).rejects.toThrow(
        'Failed to fetch film with id invalid-id: Error: Network error',
      );
    });
  });

  describe('getAllFilms', () => {
    const mockFilms: GhibliFilm[] = [
      {
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
      },
    ];

    it('should return cached films if available', async () => {
      mockCacheService.get.mockReturnValue(mockFilms);

      const result = await service.getAllFilms();

      expect(mockCacheService.get).toHaveBeenCalledWith('films:all');
      expect(mockHttpService.get).not.toHaveBeenCalled();
      expect(result).toEqual(mockFilms);
    });

    it('should fetch from API and cache when not in cache', async () => {
      mockCacheService.get.mockReturnValue(null);
      mockHttpService.get.mockResolvedValue({
        data: mockFilms,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
      });

      const result = await service.getAllFilms();

      expect(mockCacheService.get).toHaveBeenCalledWith('films:all');
      expect(mockHttpService.get).toHaveBeenCalledWith({
        endpoint: 'https://ghibliapi.vercel.app/films',
      });
      expect(mockCacheService.set).toHaveBeenCalledWith('films:all', mockFilms);
      expect(result).toEqual(mockFilms);
    });

    it('should throw an error when films fetch fails', async () => {
      const error = new Error('Network error');
      mockCacheService.get.mockReturnValue(null);
      mockHttpService.get.mockRejectedValue(error);

      await expect(service.getAllFilms()).rejects.toThrow(
        'Failed to fetch all films: Error: Network error',
      );
    });
  });
});
