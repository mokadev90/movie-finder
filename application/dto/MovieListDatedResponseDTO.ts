import MovieSummaryDTO from './MovieSummaryDTO';

interface MovieListDatedResponseDTO {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: MovieSummaryDTO[];
}

export default MovieListDatedResponseDTO;
