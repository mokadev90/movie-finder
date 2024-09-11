'use client';

import MovieListDatedResponseDTO from '@/application/dto/MovieListDatedResponseDTO';
import MovieSummaryDTO from '@/application/dto/MovieSummaryDTO';
import MovieSummary from '@/domain/entities/MovieSummary';
import ApiMovieRepository from '@/infrastructure/repositories/AppMovieRepository';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const movieRepository = new ApiMovieRepository();

// Async thunk para obtener películas en cartelera (Now Playing)
export const fetchNowPlaying = createAsyncThunk(
  'movies/fetchNowPlaying',
  async (language: string) => {
    const response = await movieRepository.getNowPlaying(language);
    return response.results;
  },
);

export const fetchPopular = createAsyncThunk(
  'movies/fetchPopular',
  async (language: string) => {
    const response = await movieRepository.getPopular(language);
    return response.results;
  },
);

export const fetchTopRated = createAsyncThunk(
  'movies/fetchTopRated',
  async (language: string) => {
    const response = await movieRepository.getTopRated(language);
    return response.results;
  },
);

export const fetchUpcoming = createAsyncThunk(
  'movies/fetchUpcoming',
  async (language: string) => {
    const response = await movieRepository.getUpcoming(language);
    return response.results;
  },
);

// Async thunk para obtener recomendaciones
export const fetchRecommendations = createAsyncThunk(
  'movies/fetchRecommendations',
  async ({ movie_id, language }: { movie_id: number; language: string }) => {
    const response = await movieRepository.getRecommendations(
      movie_id,
      language,
    );
    return response.results;
  },
);

interface MoviesState {
  nowPlaying: MovieSummaryDTO[];
  popular: MovieSummaryDTO[];
  topRated: MovieSummaryDTO[];
  upcoming: MovieSummaryDTO[];
  recommendations: MovieSummaryDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  nowPlaying: [],
  popular: [],
  topRated: [],
  upcoming: [],
  recommendations: [],
  loading: false,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Manejo de Now Playing
      .addCase(fetchNowPlaying.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNowPlaying.fulfilled, (state, action) => {
        state.nowPlaying = action.payload;
        state.loading = false;
      })
      .addCase(fetchNowPlaying.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Failed to fetch now playing movies';
      })
      // Manejo de Popular
      .addCase(fetchPopular.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.popular = action.payload;
        state.loading = false;
      })
      .addCase(fetchPopular.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recommendations';
      })
      // Manejo de Top Rated
      .addCase(fetchTopRated.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRated.fulfilled, (state, action) => {
        state.topRated = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopRated.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recommendations';
      })
      // Manejo de Upcoming
      .addCase(fetchUpcoming.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcoming.fulfilled, (state, action) => {
        state.upcoming = action.payload;
        state.loading = false;
      })
      .addCase(fetchUpcoming.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recommendations';
      })
      // Manejo de recomendaciones
      .addCase(fetchRecommendations.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.recommendations = action.payload;
        state.loading = false;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recommendations';
      });
  },
});

export default moviesSlice.reducer;
