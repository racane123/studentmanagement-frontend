import axios from 'axios';
import { subjectsAPI } from './api';

const API_URL = 'http://localhost:3000/api';

export interface Subject {
  id: number;
  name: string;
  code: string;
  description: string;
}

export interface ApiResponse<T> {
  message: string;
  subjects: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const getAllSubjects = async (): Promise<Subject[]> => {
  const response = await axios.get(`${API_URL}/subjects`);
  return response.data;
};

export const subjectService = {
  getAllSubjects: async () => {
    const response = await subjectsAPI.getAll();
    return {
      subjects: response.data.subjects,
      pagination: response.data.pagination
    };
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
    const response = await subjectsAPI.delete(id);
    return response.data;
  }
};

export default subjectService; 