// import React, { useState, useEffect } from 'react';

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

// interface SectionFormProps {
//   section?: Section;
//   teachers: Teacher[];
//   subjects: Subject[];
//   onSubmit: (section: Omit<Section, 'id'>) => void;
//   onCancel: () => void;
// }

// const SectionForm: React.FC<SectionFormProps> = ({
//   section,
//   teachers,
//   subjects,
//   onSubmit,
//   onCancel,
// }) => {
//   const [formData, setFormData] = useState<Omit<Section, 'id'>>({
//     name: '',
//     grade: '',
//     capacity: 0,
//     teacherId: '',
//     subjectId: '',
//   });

//   useEffect(() => {
//     if (section) {
//       const { id, ...sectionData } = section;
//       setFormData(sectionData);
//     }
//   }, [section]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === 'capacity' ? Number(value) : value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="section-form">
//       <div>
//         <label htmlFor="name">Name:</label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="grade">Grade:</label>
//         <input
//           type="text"
//           id="grade"
//           name="grade"
//           value={formData.grade}
//           onChange={handleChange}
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="capacity">Capacity:</label>
//         <input
//           type="number"
//           id="capacity"
//           name="capacity"
//           value={formData.capacity}
//           onChange={handleChange}
//           min="1"
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor="teacherId">Teacher:</label>
//         <select
//           id="teacherId"
//           name="teacherId"
//           value={formData.teacherId}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select a teacher</option>
//           {teachers.map((teacher) => (
//             <option key={teacher.id} value={teacher.id}>
//               {teacher.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label htmlFor="subjectId">Subject:</label>
//         <select
//           id="subjectId"
//           name="subjectId"
//           value={formData.subjectId}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select a subject</option>
//           {subjects.map((subject) => (
//             <option key={subject.id} value={subject.id}>
//               {subject.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <button type="submit">{section ? 'Update' : 'Create'}</button>
//         <button type="button" onClick={onCancel}>
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// export default SectionForm; 