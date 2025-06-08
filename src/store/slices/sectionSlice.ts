import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Section } from '../../types/section';
import { getAllSections, createSection as createSectionService, updateSection as updateSectionService, deleteSection as deleteSectionService } from '../../services/sectionService';

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
  async (_, { rejectWithValue }) => {
    try {
      const sections = await getAllSections();
      console.log('API Response:', sections); // Debug log
      return sections;
    } catch (error) {
      console.error('Error fetching sections:', error); // Debug log
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch sections');
    }
  }
);

export const createSection = createAsyncThunk(
  'sections/create',
  async (data: Parameters<typeof createSectionService>[0], { rejectWithValue }) => {
    try {
      const section = await createSectionService(data);
      console.log('Create Section Response:', section); // Debug log
      return section;
    } catch (error) {
      console.error('Error creating section:', error); // Debug log
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create section');
    }
  }
);

export const updateSection = createAsyncThunk(
  'sections/update',
  async ({ id, data }: { id: number; data: Parameters<typeof updateSectionService>[1] }, { rejectWithValue }) => {
    try {
      const section = await updateSectionService(id, data);
      console.log('Update Section Response:', section); // Debug log
      return section;
    } catch (error) {
      console.error('Error updating section:', error); // Debug log
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update section');
    }
  }
);

export const deleteSection = createAsyncThunk(
  'sections/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteSectionService(id);
      return id;
    } catch (error) {
      console.error('Error deleting section:', error); // Debug log
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete section');
    }
  }
);

const sectionSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Sections
      .addCase(fetchSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Sections in Redux store:', action.payload); // Debug log
        state.sections = action.payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch sections';
      })
      // Create Section
      .addCase(createSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sections.push(action.payload);
      })
      .addCase(createSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to create section';
      })
      // Update Section
      .addCase(updateSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSection.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.sections.findIndex(section => section.id === action.payload.id);
        if (index !== -1) {
          state.sections[index] = action.payload;
        }
      })
      .addCase(updateSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to update section';
      })
      // Delete Section
      .addCase(deleteSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = state.sections.filter(section => section.id !== action.payload);
      })
      .addCase(deleteSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to delete section';
      });
  }
});

export const { clearError } = sectionSlice.actions;
export default sectionSlice.reducer; 