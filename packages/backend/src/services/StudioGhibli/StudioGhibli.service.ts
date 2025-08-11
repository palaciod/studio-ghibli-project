import { HttpService } from '../Http/Http.service';
import { CacheService } from '../Cache/Cache.service';
import { GHIBLI_BASE_URL } from '../../config';

export interface GhibliFilm {
  id: string;
  title: string;
  original_title: string;
  original_title_romanised: string;
  image: string;
  movie_banner: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
  people: string[];
  species: string[];
  locations: string[];
  vehicles: string[];
  url: string;
}

export class StudioGhibliService {
  private httpService: HttpService;
  private cacheService: CacheService;
  private baseUrl: string;

  constructor() {
    this.httpService = new HttpService();
    this.cacheService = new CacheService(); // 5 minute TTL by default
    this.baseUrl = GHIBLI_BASE_URL;
  }

  public async getFilm(id: string): Promise<GhibliFilm> {
    const cacheKey = `film:${id}`;

    // Try to get from cache first
    const cachedFilm = this.cacheService.get<GhibliFilm>(cacheKey);
    if (cachedFilm) {
      return cachedFilm;
    }

    // If not in cache, fetch from API
    const endpoint = `${this.baseUrl}/films/${id}`;

    try {
      const response = await this.httpService.get({ endpoint });
      const film = response.data as GhibliFilm;

      // Cache the result
      this.cacheService.set(cacheKey, film);

      return film;
    } catch (error) {
      throw new Error(`Failed to fetch film with id ${id}: ${error}`);
    }
  }

  public async getAllFilms(): Promise<GhibliFilm[]> {
    const cacheKey = 'films:all';

    // Try to get from cache first
    const cachedFilms = this.cacheService.get<GhibliFilm[]>(cacheKey);
    if (cachedFilms) {
      return cachedFilms;
    }

    // If not in cache, fetch from API
    const endpoint = `${this.baseUrl}/films`;

    try {
      const response = await this.httpService.get({ endpoint });
      const films = response.data as GhibliFilm[];

      // Cache the result
      this.cacheService.set(cacheKey, films);

      return films;
    } catch (error) {
      throw new Error(`Failed to fetch all films: ${error}`);
    }
  }
}
