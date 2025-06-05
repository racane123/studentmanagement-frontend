import React, { useState, useEffect } from 'react';

interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  credits: number;
}

interface SubjectFormProps {
  subject?: Subject;
  onSubmit: (subject: Omit<Subject, 'id'>) => void;
  onCancel: () => void;
}

const SubjectForm: React.FC<SubjectFormProps> = ({ subject, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Subject, 'id'>>({
    name: '',
    code: '',
    description: '',
    credits: 0,
  });

  useEffect(() => {
    if (subject) {
      const { id, ...subjectData } = subject;
      setFormData(subjectData);
    }
  }, [subject]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'credits' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="subject-form">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="code">Code:</label>
        <input
          type="text"
          id="code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="credits">Credits:</label>
        <input
          type="number"
          id="credits"
          name="credits"
          value={formData.credits}
          onChange={handleChange}
          min="0"
          required
        />
      </div>
      <div className="form-buttons">
        <button type="submit">{subject ? 'Update' : 'Create'}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SubjectForm; 