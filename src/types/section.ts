export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
}

export interface SubjectAssignment {
  id: string;
  subject: Subject;
  teacher: Teacher;
  schedule: string;
  room: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
}

export interface StudentEnrollment {
  id: string;
  student: Student;
  status: string;
  enrollmentDate: string;
}

export interface Section {
  id: string;
  name: string;
  gradeLevel: string;
  schoolYear: string;
  adviserId: string;
  adviser?: Teacher;
  subjects?: SubjectAssignment[];
  students?: StudentEnrollment[];
  studentCount?: number;
} 