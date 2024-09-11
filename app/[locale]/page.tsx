'use client';

import MovieCarousel from '@/components/shared/MovieCarousel/MovieCarousel';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Index');
  const nowPlaying = useSelector((state: RootState) => state.movies.nowPlaying);
  const popular = useSelector((state: RootState) => state.movies.popular);
  const topRated = useSelector((state: RootState) => state.movies.topRated);
  const upcoming = useSelector((state: RootState) => state.movies.upcoming);

  return (
    <div className="mt-8 flex h-fit w-full max-w-full flex-col items-center justify-items-center gap-16 px-8">
      <h1 className="text-4xl">{t('title')}</h1>
      <h3 className="text-xl">{t('description')}</h3>
      <MovieCarousel type="now_playing" movieArray={nowPlaying} />
      <MovieCarousel type="popular" movieArray={popular} />
      <MovieCarousel type="top_rated" movieArray={topRated} />
      <MovieCarousel type="upcoming" movieArray={upcoming} />
    </div>
  );
}
