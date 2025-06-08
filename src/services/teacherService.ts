import api from './api';
import type { Teacher } from '../types/teacher';

interface TeacherResponse {
  message: string;
  teachers: Teacher[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface DisplayTeacherResponse {
  message: string;
  teachers: Teacher[];
}

const teacherService = {
  getAllTeachers: async (params?: { 
    page?: number; 
    limit?: number; 
    search?: string; 
    department?: string; 
    schoolYear?: string;
  }): Promise<TeacherResponse> => {
    const response = await api.get<TeacherResponse>('/teacher/teachers', { params });
    return response.data;
  },

  getTeachersForDisplay: async (schoolYear?: string): Promise<DisplayTeacherResponse> => {
    const response = await api.get<DisplayTeacherResponse>('/teacher/teachers', { 
      params: { schoolYear } 
    });
    return response.data;
  },

  getTeacherById: async (id: string) => {
    const response = await api.get<{ message: string; teacher: Teacher }>(`/teacher/teachers/${id}`);
    return response.data;
  },

  createTeacher: async (data: Omit<Teacher, 'id'>) => {
    const response = await api.post<{ message: string; teacher: Teacher }>('/teacher/teachers', data);
    return response.data;
  },

  updateTeacher: async (id: string, data: Partial<Teacher>) => {
    const response = await api.put<{ message: string; teacher: Teacher }>(`/teacher/teachers/${id}`, data);
    return response.data;
  },

  deleteTeacher: async (id: string) => {
    const response = await api.delete<{ message: string; teacher: Teacher }>(`/teacher/teachers/${id}`);
    return response.data;
  },

  assignSubjects: async (teacherId: string, data: { subjectIds: string[]; schoolYear: string }) => {
    const response = await api.post<{ message: string; teacher: Teacher }>(
      `/teacher/teachers/${teacherId}/subjects`,
      data
    );
    return response.data;
  },

  getSubjects: async (teacherId: string, schoolYear?: string) => {
    const response = await api.get<{ message: string; subjects: any[] }>(
      `/teacher/teachers/${teacherId}/subjects`,
      { params: { schoolYear } }
    );
    return response.data;
  },
};

export default teacherService; 