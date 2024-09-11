import Image from 'next/image';
import React from 'react';

interface Props {
  id: number;
  image: string;
  title: string;
  voteAverage: number;
  releaseDate: string;
}

function MovieCard({ id, image, title, voteAverage, releaseDate }: Props) {
  return (
    <div className="relative h-fit w-52">
      <Image
        src={image}
        alt={title}
        width={200}
        height={300}
        className="h-72 w-52 rounded-3xl"
      />
      <h5 className="text-center font-bold">{title}</h5>
      <div className="absolute top-0 flex size-12 items-center justify-center rounded-full border-2 bg-black">
        <span className="text-sm text-white">
          {Math.round(voteAverage * 100) / 100}
        </span>
      </div>
      {/* <span>{releaseDate}</span> */}
    </div>
  );
}

export default MovieCard;
