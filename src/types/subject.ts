export interface Teacher {
  id: string;
  firstname: string;
  lastname: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  description?: string;
  department?: string;
  teacher?: Teacher;
} 