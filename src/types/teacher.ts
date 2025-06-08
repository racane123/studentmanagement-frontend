export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  gender?: string;
  age?: number;
  department?: string;
  qualification?: string;
  yearsOfExperience?: number;
  schoolYear?: string;
  subjects?: Array<{
    id: string;
    name: string;
    code: string;
  }>;
} 