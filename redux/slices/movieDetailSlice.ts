import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import MovieDetail from '@/domain/entities/MovieDetail';
import ApiMovieRepository from '@/infrastructure/repositories/AppMovieRepository';

const movieRepository = new ApiMovieRepository();

// Async thunk para obtener detalles de una película
export const fetchMovieDetail = createAsyncThunk(
  'movieDetail/fetchMovieDetail',
  async ({ id, language }: { id: number; language: 'en' | 'es' }) => {
    const response = await movieRepository.getMovieDetail(id, language);
    return response;
  },
);

interface MovieDetailState {
  movie: MovieDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: MovieDetailState = {
  movie: null,
  loading: false,
  error: null,
};

const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMovieDetail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.movie = action.payload;
        state.loading = false;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch movie detail';
      });
  },
});

export default movieDetailSlice.reducer;
