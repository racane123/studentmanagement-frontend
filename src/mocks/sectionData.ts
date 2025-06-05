import type { Section } from '../types/section';

export const mockSections: Section[] = [
  {
    id: '1',
    name: 'Section A',
    gradeLevel: 'Grade 7',
    schoolYear: '2023-2024',
    adviserId: '1',
    adviser: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe'
    },
    subjects: [
      {
        id: '1',
        subject: {
          id: '1',
          name: 'Mathematics',
          code: 'MATH101'
        },
        teacher: {
          id: '2',
          firstName: 'Jane',
          lastName: 'Smith'
        },
        schedule: 'MWF 8:00-9:30',
        room: 'Room 101'
      },
      {
        id: '2',
        subject: {
          id: '2',
          name: 'Science',
          code: 'SCI101'
        },
        teacher: {
          id: '3',
          firstName: 'Robert',
          lastName: 'Johnson'
        },
        schedule: 'TTh 10:00-11:30',
        room: 'Room 102'
      }
    ],
    students: [
      {
        id: '1',
        student: {
          id: '1',
          firstName: 'Alice',
          lastName: 'Brown'
        },
        status: 'Active',
        enrollmentDate: '2023-06-01'
      },
      {
        id: '2',
        student: {
          id: '2',
          firstName: 'Bob',
          lastName: 'Wilson'
        },
        status: 'Active',
        enrollmentDate: '2023-06-01'
      }
    ],
    studentCount: 2
  },
  {
    id: '2',
    name: 'Section B',
    gradeLevel: 'Grade 7',
    schoolYear: '2023-2024',
    adviserId: '4',
    adviser: {
      id: '4',
      firstName: 'Mary',
      lastName: 'Williams'
    },
    subjects: [
      {
        id: '3',
        subject: {
          id: '3',
          name: 'English',
          code: 'ENG101'
        },
        teacher: {
          id: '5',
          firstName: 'David',
          lastName: 'Miller'
        },
        schedule: 'MWF 10:00-11:30',
        room: 'Room 103'
      },
      {
        id: '4',
        subject: {
          id: '4',
          name: 'History',
          code: 'HIST101'
        },
        teacher: {
          id: '6',
          firstName: 'Sarah',
          lastName: 'Davis'
        },
        schedule: 'TTh 8:00-9:30',
        room: 'Room 104'
      }
    ],
    students: [
      {
        id: '3',
        student: {
          id: '3',
          firstName: 'Charlie',
          lastName: 'Taylor'
        },
        status: 'Active',
        enrollmentDate: '2023-06-01'
      },
      {
        id: '4',
        student: {
          id: '4',
          firstName: 'Diana',
          lastName: 'Anderson'
        },
        status: 'Active',
        enrollmentDate: '2023-06-01'
      }
    ],
    studentCount: 2
  }
]; 