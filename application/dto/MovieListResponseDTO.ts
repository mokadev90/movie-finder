import MovieSummaryDTO from './MovieSummaryDTO';

interface MovieListResponseDTO {
  page: number;
  results: MovieSummaryDTO[];
}

export default MovieListResponseDTO;
