import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';

interface Student {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  age: number;
  section: string;
  schoolYear: string;
  schoolName: string;
  subject: string;
  gradingPeriod: string;
  division: string;
  grade: number;
  classSection: string;
}

interface Teacher {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  age: number;
  email: string;
  phoneNumber: string;
  department: string;
  qualification: string;
  yearsOfExperience: number;
  schoolYear: string;
  subjects?: Array<{
    id: string;
    name: string;
    code: string;
  }>;
}

interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  department: string;
  teachers?: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  }>;
}

interface Section {
  id: string;
  name: string;
  gradeLevel: string;
  schoolYear: string;
  adviserId: string;
  adviser?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  subjects?: Array<{
    id: string;
    subject: {
      id: string;
      name: string;
      code: string;
    };
    teacher: {
      id: string;
      firstName: string;
      lastName: string;
    };
    schedule: string;
    room: string;
  }>;
  students?: Array<{
    id: string;
    student: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    enrollmentDate: string;
    status: string;
  }>;
  studentCount?: number;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  message: string;
  token: string;
  user?: User;
}

interface PaginatedResponse<T> {
  message: string;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      store.dispatch(logout());
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post<AuthResponse>('/authentication/login', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  },
  register: async (name: string, email: string, password: string) => {
    const response = await api.post<AuthResponse>('/authentication/register', { name, email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
};

// Students API
export const studentsAPI = {
  getAll: (params?: { page?: number; limit?: number; search?: string; grade?: number; section?: string; schoolYear?: string }) => 
    api.get<PaginatedResponse<Student>>('/student/students', { params }),
  getById: (id: string) => api.get<{ message: string; student: Student }>(`/student/students/${id}`),
  create: (data: Omit<Student, 'id'>) => api.post<{ message: string; student: Student }>('/student/students', data),
  update: (id: string, data: Partial<Student>) => api.put<{ message: string; student: Student }>(`/student/students/${id}`, data),
  delete: (id: string) => api.delete<{ message: string; student: Student }>(`/student/students/${id}`),
};

// Teachers API
export const teachersAPI = {
  getAll: (params?: { page?: number; limit?: number; search?: string; department?: string; schoolYear?: string }) => 
    api.get<PaginatedResponse<Teacher>>('/teacher/teachers', { params }),
  getById: (id: string) => api.get<{ message: string; teacher: Teacher }>(`/teacher/teachers/${id}`),
  create: (data: Omit<Teacher, 'id'>) => api.post<{ message: string; teacher: Teacher }>('/teacher/teachers', data),
  update: (id: string, data: Partial<Teacher>) => api.put<{ message: string; teacher: Teacher }>(`/teacher/teachers/${id}`, data),
  delete: (id: string) => api.delete<{ message: string; teacher: Teacher }>(`/teacher/teachers/${id}`),
  assignSubjects: (teacherId: string, data: { subjectIds: string[]; schoolYear: string }) => 
    api.post<{ message: string; teacher: Teacher }>(`/teacher/teachers/${teacherId}/subjects`, data),
  getSubjects: (teacherId: string, schoolYear?: string) => 
    api.get<{ message: string; subjects: Subject[] }>(`/teacher/teachers/${teacherId}/subjects`, { params: { schoolYear } }),
};

// Subjects API
export const subjectsAPI = {
  getAll: (params?: { page?: number; limit?: number; search?: string; department?: string }) => 
    api.get<PaginatedResponse<Subject>>('/subject/subjects', { params }),
  getById: (id: string) => api.get<{ message: string; subject: Subject }>(`/subject/subjects/${id}`),
  create: (data: Omit<Subject, 'id'>) => api.post<{ message: string; subject: Subject }>('/subject/subjects', data),
  update: (id: string, data: Partial<Subject>) => api.put<{ message: string; subject: Subject }>(`/subject/subjects/${id}`, data),
  delete: (id: string) => api.delete<{ message: string; subject: Subject }>(`/subject/subjects/${id}`),
};

// Sections API
// export const sectionsApi = {
//     getAll: async (params?: { page?: number; limit?: number; search?: string; gradeLevel?: string; schoolYear?: string }) => {
//         const response = await api.get<PaginatedResponse<Section>>('/section/sections', { params })
//         return response.data
//     },
//     getById: async (id: number) => {
//         const response = await api.get<{ message: string; section: Section }>(`/section/sections/${id}`)
//         return response.data
//     },
//     create: async (data: Omit<Section, 'id' | 'adviser' | 'subjects' | 'students'>) => {
//         const response = await api.post<{ message: string; section: Section }>('/section/sections', data)
//         return response.data
//     },
//     update: async (id: number, data: Partial<Section>) => {
//         const response = await api.put<{ message: string; section: Section }>(`/section/sections/${id}`, data)
//         return response.data
//     },
//     delete: async (id: number) => {
//         const response = await api.delete<{ message: string; section: Section }>(`/section/sections/${id}`)
//         return response.data
//     },
//     assignSubjects: async (sectionId: number, subjects: Array<{ subjectId: number; teacherId: number; schedule: string; room: string }>) => {
//         const response = await api.post<{ message: string; section: Section }>(`/section/sections/${sectionId}/subjects`, { subjects })
//         return response.data
//     },
//     enrollStudents: async (sectionId: number, studentIds: number[]) => {
//         const response = await api.post<{ message: string; section: Section }>(`/section/sections/${sectionId}/students`, { studentIds })
//         return response.data
//     }
// }

export default api; 