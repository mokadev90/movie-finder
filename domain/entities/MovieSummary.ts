import Movie from './Movie';

class MovieSummary extends Movie {
  constructor(
    id: number,
    title: string,
    releaseDate: Date,
    posterPath: string,
    backdropPath: string,
    overview: string,
    voteAverage: number,
    voteCount: number,
    public readonly popularity: number,
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

export default MovieSummary;
