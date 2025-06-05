// import React from 'react';
// import SectionCard from './SectionCard';

// interface Section {
//   id: string;
//   name: string;
//   grade: string;
//   capacity: number;
//   teacherId: string;
//   subjectId: string;
// }

// interface Teacher {
//   id: string;
//   name: string;
// }

// interface Subject {
//   id: string;
//   name: string;
// }

// interface SectionListProps {
//   sections: Section[];
//   teachers: Teacher[];
//   subjects: Subject[];
//   onEdit?: (section: Section) => void;
//   onDelete?: (id: string) => void;
// }

// const SectionList: React.FC<SectionListProps> = ({
//   sections,
//   teachers,
//   subjects,
//   onEdit,
//   onDelete,
// }) => {
//   const getTeacherName = (teacherId: string) => {
//     const teacher = teachers.find((t) => t.id === teacherId);
//     return teacher?.name;
//   };

//   const getSubjectName = (subjectId: string) => {
//     const subject = subjects.find((s) => s.id === subjectId);
//     return subject?.name;
//   };

//   return (
//     <div className="section-list">
//       {sections.map((section) => (
//         <SectionCard
//           key={section.id}
//           section={section}
//           teacherName={getTeacherName(section.teacherId)}
//           subjectName={getSubjectName(section.subjectId)}
//           onEdit={onEdit}
//           onDelete={onDelete}
//         />
//       ))}
//     </div>
//   );
// };

// export default SectionList; 