import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import subjectService from '../../services/subjectService';
import type { Subject } from '../../services/subjectService';

interface SubjectState {
  subjects: Subject[];
  selectedSubject: Subject | null;
  loading: boolean;
  error: string | null;
}

const initialState: SubjectState = {
  subjects: [],
  selectedSubject: null,
  loading: false,
  error: null,
};

export const fetchSubjects = createAsyncThunk(
  'subjects/fetchAll',
  async () => {
    return await subjectService.getAllSubjects();
  }
);

export const createSubject = createAsyncThunk(
  'subjects/create',
  async (data: Omit<Subject, 'id'>) => {
    return await subjectService.createSubject(data);
  }
);

export const updateSubject = createAsyncThunk(
  'subjects/update',
  async ({ id, data }: { id: string; data: Partial<Subject> }) => {
    return await subjectService.updateSubject(id, data);
  }
);

export const deleteSubject = createAsyncThunk(
  'subjects/delete',
  async (id: string) => {
    await subjectService.deleteSubject(id);
    return id;
  }
);

const subjectSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    setSelectedSubject: (state, action: PayloadAction<Subject | null>) => {
      state.selectedSubject = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch subjects
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch subjects';
      })
      // Create subject
      .addCase(createSubject.fulfilled, (state, action) => {
        state.subjects.push(action.payload);
      })
      // Update subject
      .addCase(updateSubject.fulfilled, (state, action) => {
        const index = state.subjects.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.subjects[index] = action.payload;
        }
      })
      // Delete subject
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.subjects = state.subjects.filter(s => s.id !== action.payload);
      });
  },
});

export const { setSelectedSubject, clearError } = subjectSlice.actions;
export default subjectSlice.reducer; 