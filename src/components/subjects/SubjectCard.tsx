import React from 'react';

interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  credits: number;
}

interface SubjectCardProps {
  subject: Subject;
  onEdit?: (subject: Subject) => void;
  onDelete?: (id: string) => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onEdit, onDelete }) => {
  return (
    <div className="subject-card">
      <h3>{subject.name}</h3>
      <p>Code: {subject.code}</p>
      <p>Description: {subject.description}</p>
      <p>Credits: {subject.credits}</p>
      {onEdit && <button onClick={() => onEdit(subject)}>Edit</button>}
      {onDelete && <button onClick={() => onDelete(subject.id)}>Delete</button>}
    </div>
  );
};

export default SubjectCard; 