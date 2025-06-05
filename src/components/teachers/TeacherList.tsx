import React from 'react';
import TeacherCard from './TeacherCard';

interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  phone: string;
}

interface TeacherListProps {
  teachers: Teacher[];
  onEdit?: (teacher: Teacher) => void;
  onDelete?: (id: string) => void;
}

const TeacherList: React.FC<TeacherListProps> = ({ teachers, onEdit, onDelete }) => {
  return (
    <div className="teacher-list">
      {teachers.map((teacher) => (
        <TeacherCard
          key={teacher.id}
          teacher={teacher}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TeacherList; 