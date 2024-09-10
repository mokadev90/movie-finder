interface MovieSummaryDTO {
  id: number;
  title: string;
  releaseDate: string;
  posterPath: string;
  backdropPath: string;
  overview: string;
  voteAverage: number;
  voteCount: number;
  genreIds: number[];
  popularity: number;
}

export default MovieSummaryDTO;
