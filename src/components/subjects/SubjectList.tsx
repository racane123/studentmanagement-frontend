import React from 'react';
import SubjectCard from './SubjectCard';

interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  credits: number;
}

interface SubjectListProps {
  subjects: Subject[];
  onEdit?: (subject: Subject) => void;
  onDelete?: (id: string) => void;
}

const SubjectList: React.FC<SubjectListProps> = ({ subjects, onEdit, onDelete }) => {
  return (
    <div className="subject-list">
      {subjects.map((subject) => (
        <SubjectCard
          key={subject.id}
          subject={subject}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default SubjectList; 