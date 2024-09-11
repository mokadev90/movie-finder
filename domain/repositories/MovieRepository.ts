import MovieListDatedResponseDTO from '@/application/dto/MovieListDatedResponseDTO';
import MovieListResponseDTO from '@/application/dto/MovieListResponseDTO';
import MovieSummaryDTO from '@/application/dto/MovieSummaryDTO';
import Credit from '../entities/Credit';
import MovieDetail from '../entities/MovieDetail';
import MovieSummary from '../entities/MovieSummary';

export interface MovieListDatedResponse {
  dates: { maximum: Date; minimum: Date };
  page: number;
  results: MovieSummary[];
}

export interface MovieListResponse {
  page: number;
  results: MovieSummary[];
}

interface MovieRepository {
  getMovieDetail(id: number, language: 'es' | 'en'): Promise<MovieDetail>;
  getMovieCredits(id: number, language: 'es' | 'en'): Promise<Credit[]>;
  getNowPlaying(language: 'es' | 'en'): Promise<MovieListDatedResponse>;
  searchMovie(query: string, language: 'es' | 'en'): Promise<MovieListResponse>;
  getRecommendations(
    movie_id: number,
    language: 'es' | 'en',
  ): Promise<MovieListResponse>;
  getUpcoming(language: 'es' | 'en'): Promise<MovieListDatedResponse>;
  getPopular(language: 'es' | 'en'): Promise<MovieListResponse>;
  getTopRated(language: 'es' | 'en'): Promise<MovieListResponse>;
  getMovieImageUrl(imageId: string, resolution?: string): string;
}

export default MovieRepository;
