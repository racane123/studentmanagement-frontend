import api from './api';
import type { Section } from '../types/section';

export interface CreateSectionData {
  name: string;
  gradeLevel: string;
  schoolYear: string;
  adviserId: number;
  subjects?: {
    subjectId: number;
    teacherId: number;
    schedule: string;
    room: string;
  }[];
}

export interface UpdateSectionData extends CreateSectionData {
  id: number;
}

export const getAllSections = async (): Promise<Section[]> => {
  const response = await api.get('/section/sections');
  // The backend returns { message: string, sections: Section[], pagination: {...} }
  return response.data.sections || [];
};

export const getSectionById = async (id: number): Promise<Section> => {
  const response = await api.get(`/section/sections/${id}`);
  return response.data.section;
};

export const createSection = async (data: CreateSectionData): Promise<Section> => {
  const response = await api.post('/section/sections', data);
  return response.data.section;
};

export const updateSection = async (id: number, data: UpdateSectionData): Promise<Section> => {
  const response = await api.put(`/section/sections/${id}`, data);
  return response.data.section;
};

export const deleteSection = async (id: number): Promise<void> => {
  await api.delete(`/section/sections/${id}`);
};

export const assignSubjects = async (
  sectionId: number,
  subjects: Array<{
    subjectId: number;
    teacherId: number;
    schedule: string;
    room: string;
  }>
): Promise<Section> => {
  const response = await api.post(`/section/sections/${sectionId}/subjects`, { subjects });
  return response.data.section;
};

export const enrollStudents = async (sectionId: number, studentIds: number[]) => {
  const response = await api.post<{ message: string; section: Section }>(
    `/section/sections/${sectionId}/students`, 
    { studentIds }
  );
  return response.data.section;
}; 