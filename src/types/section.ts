export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Subject {
  id: number;
  name: string;
  code: string;
}

export interface SubjectAssignment {
  id: number;
  subject: Subject;
  teacher: Teacher;
  schedule: string;
  room: string;
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
}

export interface StudentEnrollment {
  id: number;
  student: Student;
  status: string;
  enrollmentDate: string;
}

export interface Section {
  id: number;
  name: string;
  gradeLevel: string | number;
  schoolYear: string;
  academicYear?: string;
  adviserId: number;
  adviser?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  subjects?: Array<{
    id: number;
    subject: {
      id: number;
      name: string;
      code: string;
    };
    teacher: {
      id: number;
      firstName: string;
      lastName: string;
    };
    schedule: string;
    room: string;
  }>;
  students?: Array<{
    id: number;
    student: {
      id: number;
      firstName: string;
      lastName: string;
    };
    enrollmentDate: string;
    status: string;
  }>;
  studentCount?: number;
}

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

export interface SubjectAssignment {
  subjectId: number;
  teacherId: number;
  schedule: string;
  room: string;
} 