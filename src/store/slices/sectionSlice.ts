import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Section } from '../../types/section';
import { mockSections } from '../../mocks/sectionData';

interface SectionState {
  sections: Section[];
  loading: boolean;
  error: string | null;
}

const initialState: SectionState = {
  sections: [],
  loading: false,
  error: null
};

export const fetchSections = createAsyncThunk(
  'sections/fetchAll',
  async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockSections;
  }
);

const sectionSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch sections';
      });
  }
});

export const { } = sectionSlice.actions;
export default sectionSlice.reducer; 