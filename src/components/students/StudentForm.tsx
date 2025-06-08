import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { studentService } from '../../services/studentService';

const StudentForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    gender: '',
    age: '',
    section: '',
    schoolyear: '',
    schoolname: '',
    subject: '',
    gradingperiod: '',
    division: '',
    grade: '',
    classsection: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    // Required field validation
    if (!formData.firstname.trim()) errors.push('First name is required');
    if (!formData.lastname.trim()) errors.push('Last name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.gender.trim()) errors.push('Gender is required');
    if (!formData.age.trim()) errors.push('Age is required');
    if (!formData.section.trim()) errors.push('Section is required');
    if (!formData.schoolyear.trim()) errors.push('School year is required');
    if (!formData.schoolname.trim()) errors.push('School name is required');
    if (!formData.subject.trim()) errors.push('Subject is required');
    if (!formData.gradingperiod.trim()) errors.push('Grading period is required');
    if (!formData.division.trim()) errors.push('Division is required');
    if (!formData.grade.trim()) errors.push('Grade is required');
    if (!formData.classsection.trim()) errors.push('Class section is required');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.push('Invalid email format');
    }

    // Age validation
    const age = parseInt(formData.age);
    if (isNaN(age) || age < 4 || age > 100) {
      errors.push('Age must be between 4 and 100');
    }

    // Grade validation
    const grade = parseInt(formData.grade);
    if (isNaN(grade) || grade < 1 || grade > 12) {
      errors.push('Grade must be between 1 and 12');
    }

    // School year validation
    const yearRegex = /^\d{4}-\d{4}$/;
    if (!yearRegex.test(formData.schoolyear)) {
      errors.push('School year must be in format YYYY-YYYY');
    }

    if (errors.length > 0) {
      setError(errors.join('\n'));
      return;
    }

    try {
      // Transform the data to match backend's expected format
      const transformedData = {
        firstName: formData.firstname,
        middleName: formData.middlename,
        lastName: formData.lastname,
        email: formData.email,
        gender: formData.gender,
        age: parseInt(formData.age),
        section: formData.section,
        schoolYear: formData.schoolyear,
        schoolName: formData.schoolname,
        subject: formData.subject,
        gradingPeriod: formData.gradingperiod,
        division: formData.division,
        grade: parseInt(formData.grade),
        classSection: formData.classsection,
      };

      await studentService.createStudent(transformedData);
      navigate('/students');
    } catch (err) {
      setError('Failed to create student. Please try again.');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Create New Student
        </Typography>
        {error && (
          <Typography color="error" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
            {error}
          </Typography>
        )}
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ 
            mt: 3,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 3,
            '& > div': {
              width: '100%'
            }
          }}
        >
          <Box>
            <TextField
              required
              fullWidth
              label="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextField
              fullWidth
              label="Middle Name"
              name="middlename"
              value={formData.middlename}
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextField
              required
              fullWidth
              label="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <FormControl fullWidth required>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <TextField
              fullWidth
              required
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              inputProps={{ min: 4, max: 100 }}
            />
          </Box>

          <Box>
            <TextField
              fullWidth
              required
              label="School Year"
              name="schoolyear"
              value={formData.schoolyear}
              onChange={handleChange}
              placeholder="YYYY-YYYY"
              helperText="Format: YYYY-YYYY"
            />
          </Box>

          <Box>
            <TextField
              fullWidth
              required
              label="Grade"
              name="grade"
              type="number"
              value={formData.grade}
              onChange={handleChange}
              inputProps={{ min: 1, max: 12 }}
            />
          </Box>

          <Box>
            <TextField
              fullWidth
              required
              label="Section"
              name="section"
              value={formData.section}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <TextField
              fullWidth
              required
              label="Class Section"
              name="classsection"
              value={formData.classsection}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <TextField
              fullWidth
              required
              label="School Name"
              name="schoolname"
              value={formData.schoolname}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <TextField
              fullWidth
              required
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <TextField
              fullWidth
              required
              label="Grading Period"
              name="gradingperiod"
              value={formData.gradingperiod}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <TextField
              fullWidth
              required
              label="Division"
              name="division"
              value={formData.division}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ 
            gridColumn: '1 / -1',
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 2
          }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/students')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Create Student
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default StudentForm; 