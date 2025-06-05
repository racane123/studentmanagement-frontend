import React from 'react';

interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  // Add other student properties as needed
}

interface StudentCardProps {
  student: Student;
  onEdit?: (student: Student) => void;
  onDelete?: (id: string) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onEdit, onDelete }) => {
  return (
    <div className="student-card">
      <h3>{student.name}</h3>
      <p>Email: {student.email}</p>
      <p>Grade: {student.grade}</p>
      {onEdit && <button onClick={() => onEdit(student)}>Edit</button>}
      {onDelete && <button onClick={() => onDelete(student.id)}>Delete</button>}
    </div>
  );
};

export default StudentCard; 