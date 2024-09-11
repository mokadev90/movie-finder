import { getTranslations } from 'next-intl/server';
import ApiMovieRepository from '@/infrastructure/repositories/AppMovieRepository';
import MovieCarousel from '@/components/shared/MovieCarousel/MovieCarousel';
import Image from 'next/image';

export default async function MoviePage({
  params: { movie_id, locale },
}: Readonly<{ params: { movie_id: number; locale: 'en' | 'es' } }>) {
  const t = await getTranslations('Movie Detail');
  const language = locale || 'es';

  const repository = new ApiMovieRepository();
  const movie = await repository.getMovieDetail(movie_id, language);
  console.log('movie', movie);
  const {
    id,
    title,
    releaseDate,
    posterPath,
    backdropPath,
    overview,
    voteAverage,
    voteCount,
    runtime,
    budget,
    revenue,
    genres,
    productionCompanies,
  } = movie;

  const imageUrl = repository.getMovieImageUrl(posterPath, 'w780');
  const backUrl = repository.getMovieImageUrl(backdropPath, 'w1280');
  const releaseDateFormatted = releaseDate.toISOString().split('T')[0];

  return (
    <div className="relative mt-8 flex h-fit w-full max-w-full flex-col items-center justify-items-center gap-16 text-white">
      <Image
        src={backUrl}
        alt={title}
        fill
        className="-z-10 h-72 w-52 object-cover"
      />
      <div className="flex bg-gradient-to-t from-black to-black/50">
        <div className="flex flex-col gap-8 p-4 md:p-8">
          <div className="flex justify-between gap-4">
            <Image
              src={imageUrl}
              alt={title}
              width={200}
              height={300}
              className="h-72 w-52 rounded-3xl object-cover"
            />
            <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
              <h1 className="text-center text-4xl drop-shadow-md">{title}</h1>
              <ul className="flex flex-wrap gap-4">
                {genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <span className="text-md">{`${t('overview')}:`}</span>
          <span className="text-xl">{`${overview}`}</span>
          <div className="flex flex-col">
            Aditional information:
            <ul className="flex justify-between">
              <li>
                <span className="text-md block">{`${t('releaseDate')}:`}</span>
                <span className="text-xl">{`${releaseDateFormatted}`}</span>
              </li>
              <li>
                <span className="text-md block">{`${t('voteAverage')}:`}</span>
                <span className="text-xl">{`${voteAverage}`}</span>
              </li>
              <li>
                <span className="text-md block">{`${t('voteCount')}:`}</span>
                <span className="text-xl">{`${voteCount}`}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* <MovieCarousel type="now_playing" movieArray={simpleResults} /> */}
    </div>
  );
}
