import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Teacher } from '../../types/teacher';
import teacherService from '../../services/teacherService';

interface TeacherState {
  teachers: Teacher[];
  selectedTeacher: Teacher | null;
  loading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
}

const initialState: TeacherState = {
  teachers: [],
  selectedTeacher: null,
  loading: false,
  error: null,
  pagination: null,
};

export const fetchTeachers = createAsyncThunk(
  'teachers/fetchAll',
  async (params?: { page?: number; limit?: number; search?: string; department?: string; schoolYear?: string }) => {
    const response = await teacherService.getAllTeachers(params);
    return {
      teachers: response.teachers,
      pagination: response.pagination
    };
  }
);

export const createTeacher = createAsyncThunk(
  'teachers/create',
  async (data: Omit<Teacher, 'id'>) => {
    const response = await teacherService.createTeacher(data);
    return response.teacher;
  }
);

export const updateTeacher = createAsyncThunk(
  'teachers/update',
  async ({ id, data }: { id: string; data: Partial<Teacher> }) => {
    const response = await teacherService.updateTeacher(id, data);
    return response.teacher;
  }
);

export const deleteTeacher = createAsyncThunk(
  'teachers/delete',
  async (id: string) => {
    const response = await teacherService.deleteTeacher(id);
    return response.teacher.id;
  }
);

const teacherSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {
    setSelectedTeacher: (state, action: PayloadAction<Teacher | null>) => {
      state.selectedTeacher = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch teachers
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = action.payload.teachers;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch teachers';
      })
      // Create teacher
      .addCase(createTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers.push(action.payload);
      })
      .addCase(createTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create teacher';
      })
      // Update teacher
      .addCase(updateTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.teachers.findIndex((teacher: Teacher) => teacher.id === action.payload.id);
        if (index !== -1) {
          state.teachers[index] = action.payload;
        }
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update teacher';
      })
      // Delete teacher
      .addCase(deleteTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = state.teachers.filter((teacher: Teacher) => teacher.id !== action.payload);
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete teacher';
      });
  },
});

export const { setSelectedTeacher, clearError } = teacherSlice.actions;
export default teacherSlice.reducer; 