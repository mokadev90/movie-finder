'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { useTranslations } from 'next-intl';
import MovieSummaryDTO from '@/application/dto/MovieSummaryDTO';
import MovieCard from '../MovieCard/MovieCard';

interface Props {
  type:
    | 'now_playing'
    | 'popular'
    | 'top_rated'
    | 'upcoming'
    | 'recommendations';
  movieArray: MovieSummaryDTO[];
}

const types = {
  now_playing: 'Now Playing',
  popular: 'Popular',
  top_rated: 'Top Rated',
  upcoming: 'Upcoming',
  recommendations: 'Recommendations',
};

function MovieCarousel({ movieArray, type }: Props) {
  const t = useTranslations(types[type]);
  return (
    <div className="max-w-full">
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
              <MovieCard movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default MovieCarousel;
