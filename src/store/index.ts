import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './slices/studentSlice';
import teacherReducer from './slices/teacherSlice';
import subjectReducer from './slices/subjectSlice';
import sectionReducer from './slices/sectionSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    students: studentReducer,
    teachers: teacherReducer,
    subjects: subjectReducer,
    sections: sectionReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 