import MovieDetailDTO from '@/application/dto/MovieDetailDTO';
import MovieSummaryDTO from '@/application/dto/MovieSummaryDTO';
import MovieDetail from '@/domain/entities/MovieDetail';
import MovieSummary from '@/domain/entities/MovieSummary';
import MovieRepository from '@/domain/repositories/MovieRepository';
import apiService from '@/services/axiosInstance';
import { AxiosResponse } from 'axios';

class ApiMovieRepository implements MovieRepository {
  async getMovieSummary(
    id: number,
    language: 'es' | 'en',
  ): Promise<MovieSummary> {
    const languageParam = language === 'es' ? 'es-AR' : 'en-US';
    const response: AxiosResponse<MovieSummaryDTO> = await apiService.get(
      `https://api.themoviedb.org/3/movie/summary/${id}?language=${languageParam}`,
    );
    const { data } = response;
    return new MovieSummary(
      data.id,
      data.title,
      new Date(data.releaseDate),
      data.posterPath,
      data.backdropPath,
      data.overview,
      data.voteAverage,
      data.voteCount,
      data.genreIds,
      data.popularity,
    );
  }

  async getMovieDetail(
    id: number,
    language: 'es' | 'en',
  ): Promise<MovieDetail> {
    const languageParam = language === 'es' ? 'es-AR' : 'en-US';
    const response: AxiosResponse<MovieDetailDTO> = await apiService.get(
      `https://api.themoviedb.org/3/movie/${id}?language=${languageParam}`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOWQwMjZjNWNjODM1NzUyOWYxMmJjNTI1MmM1ODA3MSIsIm5iZiI6MTcyNTkxODg4Ny44MjkxNzYsInN1YiI6IjY2ZGY2ZDI0NjhmNDljZjljYzE1Y2RhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rJClg9rC0b71Tj_8qe1R_28fJqbAPGAJFd_6O0wUSQQ',
        },
      },
    );
    const { data } = response;
    return new MovieDetail(
      data.id,
      data.title,
      new Date(data.releaseDate),
      data.posterPath,
      data.backdropPath,
      data.overview,
      data.voteAverage,
      data.voteCount,
      data.runtime,
      data.budget,
      data.revenue,
      data.genres,
      data.productionCompanies,
    );
  }
}

export default ApiMovieRepository;
