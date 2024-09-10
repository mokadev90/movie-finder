interface MovieDetailDTO {
  id: number;
  title: string;
  releaseDate: string;
  posterPath: string;
  backdropPath: string;
  overview: string;
  voteAverage: number;
  voteCount: number;
  runtime: number;
  budget: number;
  revenue: number;
  genres: { id: number; name: string }[];
  productionCompanies: { id: number; name: string }[];
}

export default MovieDetailDTO;
