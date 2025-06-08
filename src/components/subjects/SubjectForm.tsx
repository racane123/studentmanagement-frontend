import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  MenuItem,
} from '@mui/material';

interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  department: string;
}

interface SubjectFormProps {
  open: boolean;
  subject?: Subject;
  onSubmit: (subject: Omit<Subject, 'id'>) => void;
  onCancel: () => void;
}

const departments = [
  'Mathematics',
  'Science',
  'English',
  'History',
  'Computer Science',
  'Physical Education',
  'Arts',
  'Music',
];

const SubjectForm: React.FC<SubjectFormProps> = ({ open, subject, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Subject, 'id'>>({
    name: '',
    code: '',
    description: '',
    department: '',
  });

  useEffect(() => {
    if (subject) {
      const { id, ...subjectData } = subject;
      setFormData(subjectData);
    } else {
      setFormData({
        name: '',
        code: '',
        description: '',
        department: '',
      });
    }
  }, [subject, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{subject ? 'Edit Subject' : 'Add New Subject'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject Code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                required
                helperText="Use uppercase letters, numbers, and hyphens only"
                inputProps={{
                  pattern: '[A-Z0-9-]+',
                  style: { textTransform: 'uppercase' }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {subject ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SubjectForm; 