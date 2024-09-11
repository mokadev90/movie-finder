import { getTranslations } from 'next-intl/server';
import ApiMovieRepository from '@/infrastructure/repositories/AppMovieRepository';
import MovieCarousel from '@/components/shared/MovieCarousel/MovieCarousel';

export default async function Home({
  params: { locale },
}: Readonly<{ params: { locale: string } }>) {
  const t = await getTranslations('Index');
  const language = locale || 'es';

  const repository = new ApiMovieRepository();
  const { results } = await repository.getNowPlaying(language);
  const simpleResults = results.map(movie => ({
    id: movie.id,
    image: repository.getMovieImageUrl(movie.posterPath, 'w780'),
    title: movie.title,
    voteAverage: movie.voteAverage,
    releaseDate: movie.releaseDate.toDateString(), // Asegurarte de formatear la fecha a string
  }));

  return (
    <div className="mt-8 flex h-fit w-full max-w-full flex-col items-center justify-items-center gap-16">
      <h1 className="text-4xl">{t('title')}</h1>
      <h3 className="text-xl">{t('description')}</h3>
      <MovieCarousel type="now_playing" movieArray={simpleResults} />
    </div>
  );
}
