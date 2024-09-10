class Movie {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly releaseDate: Date,
    public readonly posterPath: string,
    public readonly backdropPath: string,
    public readonly overview: string,
    public readonly voteAverage: number,
    public readonly voteCount: number,
  ) {}
}

export default Movie;
