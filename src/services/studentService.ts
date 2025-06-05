import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface Student {
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

interface ApiResponse<T> {
  message: string;
  student?: T;
  students?: T[];
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const studentService = {
  async getAllStudents() {
    const response = await axios.get<ApiResponse<Student>>(`${API_URL}/student/students`);
    return response.data;
  },

  async createStudent(studentData: Omit<Student, 'id'>) {
    const response = await axios.post<ApiResponse<Student>>(`${API_URL}/student/students`, studentData);
    return response.data;
  },

  async updateStudent(id: string, studentData: Partial<Student>) {
    const response = await axios.put<ApiResponse<Student>>(`${API_URL}/student/students/${id}`, studentData);
    return response.data;
  },

  async deleteStudent(id: string) {
    const response = await axios.delete<ApiResponse<Student>>(`${API_URL}/student/students/${id}`);
    return response.data;
  }
};

export default studentService; 