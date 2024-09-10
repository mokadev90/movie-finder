import Movie from './Movie';

class MovieDetail extends Movie {
  constructor(
    id: number,
    title: string,
    releaseDate: Date,
    posterPath: string,
    backdropPath: string,
    overview: string,
    voteAverage: number,
    voteCount: number,
    public readonly runtime: number,
    public readonly budget: number,
    public readonly revenue: number,
    public readonly genres: { id: number; name: string }[],
    public readonly productionCompanies: { id: number; name: string }[],
  ) {
    super(
      id,
      title,
      releaseDate,
      posterPath,
      backdropPath,
      overview,
      voteAverage,
      voteCount,
    );
  }
}

export default MovieDetail;
