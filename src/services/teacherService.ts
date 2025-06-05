import { teachersAPI } from './api';

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  phone: string;
}

export const teacherService = {
  getAllTeachers: async () => {
    const response = await teachersAPI.getAll();
    return response.data;
  },

  getTeacherById: async (id: string) => {
    const response = await teachersAPI.getById(id);
    return response.data;
  },

  createTeacher: async (teacherData: Omit<Teacher, 'id'>) => {
    const response = await teachersAPI.create(teacherData);
    return response.data;
  },

  updateTeacher: async (id: string, teacherData: Partial<Teacher>) => {
    const response = await teachersAPI.update(id, teacherData);
    return response.data;
  },

  deleteTeacher: async (id: string) => {
    await teachersAPI.delete(id);
  },
};

export default teacherService; 