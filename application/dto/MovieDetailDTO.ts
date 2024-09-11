interface MovieDetailDTO {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  budget: number;
  revenue: number;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string }[];
}

export default MovieDetailDTO;
