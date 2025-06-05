import { subjectsAPI } from './api';

export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  credits: number;
  department: string;
}

export const subjectService = {
  getAllSubjects: async () => {
    const response = await subjectsAPI.getAll();
    return response.data;
  },

  getSubjectById: async (id: string) => {
    const response = await subjectsAPI.getById(id);
    return response.data;
  },

  createSubject: async (subjectData: Omit<Subject, 'id'>) => {
    const response = await subjectsAPI.create(subjectData);
    return response.data;
  },

  updateSubject: async (id: string, subjectData: Partial<Subject>) => {
    const response = await subjectsAPI.update(id, subjectData);
    return response.data;
  },

  deleteSubject: async (id: string) => {
    await subjectsAPI.delete(id);
  },
};

export default subjectService; 