import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import teacherService from '../../services/teacherService';
import type { Teacher } from '../../services/teacherService';

interface TeacherState {
  teachers: Teacher[];
  selectedTeacher: Teacher | null;
  loading: boolean;
  error: string | null;
}

const initialState: TeacherState = {
  teachers: [],
  selectedTeacher: null,
  loading: false,
  error: null,
};

export const fetchTeachers = createAsyncThunk(
  'teachers/fetchAll',
  async () => {
    return await teacherService.getAllTeachers();
  }
);

export const createTeacher = createAsyncThunk(
  'teachers/create',
  async (data: Omit<Teacher, 'id'>) => {
    return await teacherService.createTeacher(data);
  }
);

export const updateTeacher = createAsyncThunk(
  'teachers/update',
  async ({ id, data }: { id: string; data: Partial<Teacher> }) => {
    return await teacherService.updateTeacher(id, data);
  }
);

export const deleteTeacher = createAsyncThunk(
  'teachers/delete',
  async (id: string) => {
    await teacherService.deleteTeacher(id);
    return id;
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
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch teachers';
      })
      // Create teacher
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.teachers.push(action.payload);
      })
      // Update teacher
      .addCase(updateTeacher.fulfilled, (state, action) => {
        const index = state.teachers.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.teachers[index] = action.payload;
        }
      })
      // Delete teacher
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.teachers = state.teachers.filter((t) => t.id !== action.payload);
      });
  },
});

export const { setSelectedTeacher, clearError } = teacherSlice.actions;
export default teacherSlice.reducer; 