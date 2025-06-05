// import api from './api';

// export interface Section {
//   id: string;
//   name: string;
//   grade: string;
//   capacity: number;
//   teacherId: string;
//   subjectId: string;
// }

// export interface CreateSectionData {
//   name: string;
//   grade: string;
//   capacity: number;
//   teacherId: string;
//   subjectId: string;
// }

// const sectionService = {
//   getAllSections: async (): Promise<Section[]> => {
//     const response = await api.get<Section[]>('/sections');
//     return response.data;
//   },

//   getSectionById: async (id: string): Promise<Section> => {
//     const response = await api.get<Section>(`/sections/${id}`);
//     return response.data;
//   },

//   createSection: async (data: CreateSectionData): Promise<Section> => {
//     const response = await api.post<Section>('/sections', data);
//     return response.data;
//   },

//   updateSection: async (id: string, data: Partial<Section>): Promise<Section> => {
//     const response = await api.put<Section>(`/sections/${id}`, data);
//     return response.data;
//   },

//   deleteSection: async (id: string): Promise<void> => {
//     await api.delete(`/sections/${id}`);
//   },
// };

// export default sectionService; 