import MovieDetailDTO from '@/application/dto/MovieDetailDTO';
import MovieListDatedResponseDTO from '@/application/dto/MovieListDatedResponseDTO';
import MovieSummaryDTO from '@/application/dto/MovieSummaryDTO';
import Credit from '@/domain/entities/Credit';
import MovieDetail from '@/domain/entities/MovieDetail';
import MovieSummary from '@/domain/entities/MovieSummary';
import MovieRepository, {
  MovieListDatedResponse,
} from '@/domain/repositories/MovieRepository';
import apiService from '@/services/axiosInstance';
import { AxiosResponse } from 'axios';

class ApiMovieRepository implements MovieRepository {
  async getMovieDetail(
    id: number,
    language: 'es' | 'en',
  ): Promise<MovieDetail> {
    const languageParam = language === 'es' ? 'es-AR' : 'en-US';
    const response: AxiosResponse<MovieDetailDTO> = await apiService.get(
      `/movie/${id}?language=${languageParam}`,
    );
    const { data } = response;
    return new MovieDetail(
      data.id,
      data.title,
      new Date(data.release_date),
      data.poster_path,
      data.backdrop_path,
      data.overview,
      data.vote_average,
      data.vote_count,
      data.runtime,
      data.budget,
      data.revenue,
      data.genres,
      data.production_companies,
    );
  }

  async getMovieCredits(id: number, language: string): Promise<Credit[]> {
    const response: AxiosResponse<{ cast: Credit[] }> = await apiService.get(
      `/movie/${id}/credits?language=${language}`,
    );
    return response.data.cast.map(
      castMember =>
        new Credit(
          castMember.id,
          castMember.knownForDepartment,
          castMember.name,
          castMember.originalName,
          castMember.popularity,
          castMember.profilePath,
          castMember.castId,
          castMember.character,
          castMember.creditId,
          castMember.order,
        ),
    );
  }

  async getNowPlaying(language: string): Promise<{
    dates: { maximum: Date; minimum: Date };
    page: number;
    results: MovieSummary[];
  }> {
    const response: AxiosResponse<MovieListDatedResponseDTO> =
      await apiService.get(`/movie/upcoming?language=${language}`);
    const { dates, page, results } = response.data;
    const transformedDates = {
      maximum: new Date(dates.maximum),
      minimum: new Date(dates.minimum),
    };
    const movies = results.map(
      result =>
        new MovieSummary(
          result.id,
          result.title,
          new Date(result.release_date),
          result.poster_path,
          result.backdrop_path,
          result.overview,
          result.vote_average,
          result.vote_count,
          result.genre_ids,
          result.popularity,
        ),
    );
    return { dates: transformedDates, page, results: movies };
  }

  getMovieImageUrl(imageId: string, resolution = 'w500'): string {
    return `https://image.tmdb.org/t/p/${resolution}${imageId}`;
  }
}

export default ApiMovieRepository;
