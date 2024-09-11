import MovieDetailDTO from '@/application/dto/MovieDetailDTO';
import MovieSummaryDTO from '@/application/dto/MovieSummaryDTO';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function MovieCard({ movie }: { movie: MovieSummaryDTO }) {
  const { id, title, poster_path, vote_average } = movie;
  const localActive = useLocale();
  return (
    <Link
      href={`/${localActive}/${id}`}
      className="relative block h-fit w-52 max-w-52"
    >
      <Image
        src={poster_path}
        alt={title}
        width={200}
        height={300}
        className="h-72 w-52 rounded-3xl"
      />
      <h5 className="text-wrap text-center font-bold">{title}</h5>
      <div className="absolute top-0 flex size-12 items-center justify-center rounded-full border-2 bg-black">
        <span className="text-sm text-white">
          {Math.round(vote_average * 100) / 100}
        </span>
      </div>
      {/* <span>{releaseDate}</span> */}
    </Link>
  );
}

export default MovieCard;
