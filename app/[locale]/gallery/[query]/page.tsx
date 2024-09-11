import { getTranslations } from 'next-intl/server';
import ApiMovieRepository from '@/infrastructure/repositories/AppMovieRepository';
import { MovieCard } from '@/components/shared';
import MovieSummaryDTO from '@/application/dto/MovieSummaryDTO';

export default async function MovieGalleryPage({
  params: { query, locale },
}: Readonly<{ params: { query: string; locale: 'en' | 'es' } }>) {
  const t = await getTranslations('Gallery');
  const language = locale || 'es';

  const repository = new ApiMovieRepository();
  const { results } = await repository.searchMovie(query, language);

  const simpleResults: MovieSummaryDTO[] = results.map(movie => ({
    ...movie,
    poster_path: repository.getMovieImageUrl(movie.posterPath, 'w780'),
    release_date: movie.releaseDate.toDateString(), // Asegurarte de formatear la fecha a string
    backdrop_path: movie.backdropPath,
    vote_average: movie.voteAverage,
    vote_count: movie.voteCount,
  }));

  return (
    <div className="h-fit max-w-full">
      <h3>{`${t('title')} ${query}`}</h3>
      <div className="relative mt-8 grid w-full grid-cols-1 gap-16 text-white md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {simpleResults.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
