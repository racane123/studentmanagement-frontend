import React from 'react';

interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  phone: string;
}

interface TeacherCardProps {
  teacher: Teacher;
  onEdit?: (teacher: Teacher) => void;
  onDelete?: (id: string) => void;
}

const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, onEdit, onDelete }) => {
  return (
    <div className="teacher-card">
      <h3>{teacher.name}</h3>
      <p>Email: {teacher.email}</p>
      <p>Subject: {teacher.subject}</p>
      <p>Phone: {teacher.phone}</p>
      {onEdit && <button onClick={() => onEdit(teacher)}>Edit</button>}
      {onDelete && <button onClick={() => onDelete(teacher.id)}>Delete</button>}
    </div>
  );
};

export default TeacherCard; 