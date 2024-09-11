import { getTranslations } from 'next-intl/server';
import ApiMovieRepository from '@/infrastructure/repositories/AppMovieRepository';
import MovieCarousel from '@/components/shared/MovieCarousel/MovieCarousel';
import MovieSummaryDTO from '@/application/dto/MovieSummaryDTO';

export default async function Home({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  const t = await getTranslations('Index');
  const language = locale || 'es';

  const repository = new ApiMovieRepository();
  const { results } = await repository.getNowPlaying(language);
  const simpleResults: MovieSummaryDTO[] = results.map(movie => ({
    ...movie,
    poster_path: repository.getMovieImageUrl(movie.posterPath, 'w780'),
    release_date: movie.releaseDate.toDateString(), // Asegurarte de formatear la fecha a string
    backdrop_path: movie.backdropPath,
    vote_average: movie.voteAverage,
    vote_count: movie.voteCount,
    genre_ids: movie.genreIds,
  }));

  console.log('results', JSON.stringify(simpleResults));

  return (
    <div className="mt-8 flex h-fit w-full max-w-full flex-col items-center justify-items-center gap-16">
      <h1 className="text-4xl">{t('title')}</h1>
      <h3 className="text-xl">{t('description')}</h3>
      <MovieCarousel type="now_playing" movieArray={simpleResults} />
    </div>
  );
}
