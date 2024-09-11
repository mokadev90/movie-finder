'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { useTranslations } from 'next-intl';
import MovieCard from '../MovieCard/MovieCard';

interface MovieCarouselItem {
  id: number;
  image: string;
  title: string;
  voteAverage: number;
  releaseDate: string;
}

interface Props {
  type: 'now_playing';
  movieArray: MovieCarouselItem[];
}

const types = {
  now_playing: 'Now Playing',
};

function MovieCarousel({ movieArray, type }: Props) {
  const t = useTranslations(types[type]);
  return (
    <div>
      <h2 className="mb-8 text-xl text-primary">{t('title')}</h2>
      <Carousel
        opts={{
          align: 'start',
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full max-w-6xl px-8"
      >
        <CarouselContent>
          {movieArray.map(movie => (
            <CarouselItem key={movie.id} className="w-fit">
              <MovieCard
                id={0}
                image={movie.image}
                title={movie.title}
                voteAverage={movie.voteAverage}
                releaseDate={movie.releaseDate}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default MovieCarousel;
