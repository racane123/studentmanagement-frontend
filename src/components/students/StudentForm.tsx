import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { studentService } from '../../services/studentService';

const StudentForm: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    age: '',
    section: '',
    schoolYear: '',
    schoolName: '',
    subject: '',
    gradingPeriod: '',
    division: '',
    grade: '',
    classSection: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name as string]: value
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.firstName.trim()) errors.push('First name is required');
    if (!formData.lastName.trim()) errors.push('Last name is required');
    if (!formData.gender) errors.push('Gender is required');
    if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) < 4 || Number(formData.age) > 100) {
      errors.push('Age must be a number between 4 and 100');
    }
    if (!formData.schoolYear || !/^\d{4}-\d{4}$/.test(formData.schoolYear)) {
      errors.push('School year must be in format YYYY-YYYY');
    }
    if (!formData.grade || isNaN(Number(formData.grade)) || Number(formData.grade) < 1 || Number(formData.grade) > 12) {
      errors.push('Grade must be a number between 1 and 12');
    }

    if (errors.length > 0) {
      setError(errors.join(', '));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      await studentService.createStudent({
        ...formData,
        age: Number(formData.age),
        grade: Number(formData.grade),
      });
      navigate('/students');
    } catch (err) {
      setError('Failed to create student. Please try again.');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Add New Student
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: '1 1 30%', minWidth: '250px' }}>
              <TextField
                fullWidth
                required
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ flex: '1 1 30%', minWidth: '250px' }}>
              <TextField
                fullWidth
                label="Middle Name"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ flex: '1 1 30%', minWidth: '250px' }}>
              <TextField
                fullWidth
                required
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ flex: '1 1 30%', minWidth: '250px' }}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  label="Gender"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ flex: '1 1 30%', minWidth: '250px' }}>
              <TextField
                fullWidth
                required
                type="number"
                label="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                inputProps={{ min: 4, max: 100 }}
              />
            </Box>

            <Box sx={{ flex: '1 1 30%', minWidth: '250px' }}>
              <TextField
                fullWidth
                required
                label="School Year"
                name="schoolYear"
                value={formData.schoolYear}
                onChange={handleChange}
                placeholder="YYYY-YYYY"
                helperText="Format: YYYY-YYYY"
              />
            </Box>

            <Box sx={{ flex: '1 1 30%', minWidth: '250px' }}>
              <TextField
                fullWidth
                required
                type="number"
                label="Grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                inputProps={{ min: 1, max: 12 }}
              />
            </Box>

            <Box sx={{ flex: '1 1 30%', minWidth: '250px' }}>
              <TextField
                fullWidth
                label="Section"
                name="section"
                value={formData.section}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ flex: '1 1 30%', minWidth: '250px' }}>
              <TextField
                fullWidth
                label="Class Section"
                name="classSection"
                value={formData.classSection}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ flex: '1 1 30%', minWidth: '250px' }}>
              <TextField
                fullWidth
                label="School Name"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ flex: '1 1 30%', minWidth: '250px' }}>
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ flex: '1 1 30%', minWidth: '250px' }}>
              <TextField
                fullWidth
                label="Grading Period"
                name="gradingPeriod"
                value={formData.gradingPeriod}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ flex: '1 1 30%', minWidth: '250px' }}>
              <TextField
                fullWidth
                label="Division"
                name="division"
                value={formData.division}
                onChange={handleChange}
              />
            </Box>

            <Box sx={{ flex: '1 1 100%', justifyContent: 'flex-end', mt: 2 }}>
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
        </form>
      </Paper>
    </Box>
  );
};

export default StudentForm; 