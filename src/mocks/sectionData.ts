import type { Section } from '../types/section';

interface Teacher {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

interface Student {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export const mockSections: Section[] = [
  {
    id: '1',
    name: 'Section A',
    gradeLevel: 'Grade 7',
    schoolYear: '2023-2024',
    adviserId: '1',
    adviser: {
      id: '1',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com'
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
          firstname: 'Jane',
          lastname: 'Smith',
          email: 'jane.smith@example.com'
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
          firstname: 'Robert',
          lastname: 'Johnson',
          email: 'robert.johnson@example.com'
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
          firstname: 'Alice',
          lastname: 'Brown',
          email: 'alice.brown@example.com'
        },
        status: 'Active',
        enrollmentDate: '2023-06-01'
      },
      {
        id: '2',
        student: {
          id: '2',
          firstname: 'Bob',
          lastname: 'Wilson',
          email: 'bob.wilson@example.com'
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
      firstname: 'Mary',
      lastname: 'Williams',
      email: 'mary.williams@example.com'
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
          firstname: 'David',
          lastname: 'Miller',
          email: 'david.miller@example.com'
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
          firstname: 'Sarah',
          lastname: 'Davis',
          email: 'sarah.davis@example.com'
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
          firstname: 'Charlie',
          lastname: 'Taylor',
          email: 'charlie.taylor@example.com'
        },
        status: 'Active',
        enrollmentDate: '2023-06-01'
      },
      {
        id: '4',
        student: {
          id: '4',
          firstname: 'Diana',
          lastname: 'Anderson',
          email: 'diana.anderson@example.com'
        },
        status: 'Active',
        enrollmentDate: '2023-06-01'
      }
    ],
    studentCount: 2
  }
]; 