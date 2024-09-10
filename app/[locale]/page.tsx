import { getTranslations } from 'next-intl/server';
import ApiMovieRepository from '@/infrastructure/repositories/AppMovieRepository';
import MovieDetail from '@/domain/entities/MovieDetail';
import ModeToggle from './components/ModeToggle';

export default async function Home({ params: { locale } }) {
  const t = await getTranslations('Index');
  const language = locale || 'es';

  const repository = new ApiMovieRepository();
  const movieDetail: MovieDetail = await repository.getMovieDetail(
    Number(278),
    language,
  );

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <ModeToggle />
      {t('title')}
      {JSON.stringify(movieDetail)}
    </div>
  );
}
