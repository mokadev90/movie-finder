import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import { Footer, Header } from '@/components/shared';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import ApiMovieRepository from '@/infrastructure/repositories/AppMovieRepository';
import MovieSummaryDTO from '@/application/dto/MovieSummaryDTO';
import ThemeProvider from './components/ThemeProvider';
import StoreProvider from './components/StoreProvider';

export const metadata: Metadata = {
  title: 'Movie Finder',
  description: 'Your site to know what to watch next!',
};

export default async function Layout({
  children,
  params: { locale },
}: Readonly<{
  children: ReactNode;
  params: {
    locale: string;
  };
}>) {
  const language = locale || 'es';

  const repository = new ApiMovieRepository();

  const { results: nowPlayingResults } =
    await repository.getNowPlaying(language);
  const nowPlayingResultsMapped: MovieSummaryDTO[] = nowPlayingResults.map(
    movie => ({
      ...movie,
      poster_path: repository.getMovieImageUrl(movie.posterPath, 'w780'),
      release_date: movie.releaseDate.toDateString(), // Asegurarte de formatear la fecha a string
      backdrop_path: movie.backdropPath,
      vote_average: movie.voteAverage,
      vote_count: movie.voteCount,
    }),
  );

  const { results: popularResults } = await repository.getPopular(language);
  const popularResultsMapped: MovieSummaryDTO[] = popularResults.map(movie => ({
    ...movie,
    poster_path: repository.getMovieImageUrl(movie.posterPath, 'w780'),
    release_date: movie.releaseDate.toDateString(), // Asegurarte de formatear la fecha a string
    backdrop_path: movie.backdropPath,
    vote_average: movie.voteAverage,
    vote_count: movie.voteCount,
  }));

  const { results: topRatedResults } = await repository.getTopRated(language);
  const topRatedResultsMapped: MovieSummaryDTO[] = topRatedResults.map(
    movie => ({
      ...movie,
      poster_path: repository.getMovieImageUrl(movie.posterPath, 'w780'),
      release_date: movie.releaseDate.toDateString(), // Asegurarte de formatear la fecha a string
      backdrop_path: movie.backdropPath,
      vote_average: movie.voteAverage,
      vote_count: movie.voteCount,
    }),
  );

  const { results: upcomingResults } = await repository.getUpcoming(language);
  const upcomingResultsMapped: MovieSummaryDTO[] = upcomingResults.map(
    movie => ({
      ...movie,
      poster_path: repository.getMovieImageUrl(movie.posterPath, 'w780'),
      release_date: movie.releaseDate.toDateString(), // Asegurarte de formatear la fecha a string
      backdrop_path: movie.backdropPath,
      vote_average: movie.voteAverage,
      vote_count: movie.voteCount,
    }),
  );
  const messages = await getMessages();

  const preloadedState = {
    movies: {
      nowPlaying: nowPlayingResultsMapped,
      popular: popularResultsMapped,
      topRated: topRatedResultsMapped,
      upcoming: upcomingResultsMapped,
      recommendations: [],
      loading: false,
      error: null,
    },
  };

  return (
    <html lang={locale}>
      <body className="mx-auto flex min-h-screen max-w-full flex-col">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <StoreProvider initialReduxState={preloadedState}>
              <Header />
              <main className="mx-auto flex max-w-full flex-1 justify-center">
                {children}
              </main>
              <Footer />
            </StoreProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
