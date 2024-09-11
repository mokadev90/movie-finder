import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiMovieRepository from '@/infrastructure/repositories/AppMovieRepository';
import MovieSummaryDTO from '@/application/dto/MovieSummaryDTO';

const movieRepository = new ApiMovieRepository();

// Async thunk para buscar películas
export const searchMovies = createAsyncThunk(
  'movies/searchMovies',
  async ({ query, language }: { query: string; language: 'es' | 'en' }) => {
    const response = await movieRepository.searchMovie(query, language);
    return response.results.map(movie => ({
      ...movie,
      poster_path: movieRepository.getMovieImageUrl(movie.posterPath, 'w780'),
      release_date: movie.releaseDate.toDateString(),
      backdrop_path: movie.backdropPath,
      vote_average: movie.voteAverage,
      vote_count: movie.voteCount,
    }));
  },
);

interface SearchState {
  searchResults: MovieSummaryDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  searchResults: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(searchMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.loading = false;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to search movies';
      });
  },
});

export default searchSlice.reducer;
