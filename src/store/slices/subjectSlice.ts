import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import subjectService from '../../services/subjectService';
import type { Subject } from '../../services/subjectService';

interface SubjectState {
  subjects: Subject[];
  selectedSubject: Subject | null;
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
}

const initialState: SubjectState = {
  subjects: [],
  selectedSubject: null,
  loading: false,
  error: null,
  pagination: null,
};

interface SubjectResponse {
  subjects: Subject[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const fetchSubjects = createAsyncThunk<SubjectResponse>(
  'subjects/fetchAll',
  async () => {
    const response = await subjectService.getAllSubjects();
    return response;
  }
);

export const createSubject = createAsyncThunk(
  'subjects/create',
  async (data: Omit<Subject, 'id'>) => {
    const response = await subjectService.createSubject(data);
    return response.subject;
  }
);

export const updateSubject = createAsyncThunk(
  'subjects/update',
  async ({ id, data }: { id: string; data: Partial<Subject> }) => {
    const response = await subjectService.updateSubject(id, data);
    return response.subject;
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
        state.subjects = action.payload.subjects;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch subjects';
      })
      // Create subject
      .addCase(createSubject.fulfilled, (state, action) => {
        if (action.payload) {
          state.subjects.push(action.payload);
        }
      })
      // Update subject
      .addCase(updateSubject.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.subjects.findIndex(s => s.id === action.payload.id);
          if (index !== -1) {
            state.subjects[index] = action.payload;
          }
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