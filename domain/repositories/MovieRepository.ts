import MovieDetail from '../entities/MovieDetail';
import MovieSummary from '../entities/MovieSummary';

interface MovieRepository {
  getMovieSummary(id: number, language: 'es' | 'en'): Promise<MovieSummary>;
  getMovieDetail(id: number, language: 'es' | 'en'): Promise<MovieDetail>;
}

export default MovieRepository;
