import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  MenuItem,
  Paper,
  Grid,
  Divider,
} from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import { createTeacher } from '../../store/slices/teacherSlice';

const departments = [
  'Mathematics',
  'Science',
  'English',
  'History',
  'Physical Education',
  'Arts',
  'Music',
  'Computer Science',
];

const TeacherForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    firstname: '',
    middlename: '',
    lastname: '',
    gender: '',
    age: '',
    email: '',
    phonenumber: '',
    department: '',
    qualification: '',
    yearsofexperience: '',
    schoolyear: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const teacherData = {
        ...formData,
        age: parseInt(formData.age),
        yearsofexperience: parseInt(formData.yearsofexperience),
      };
      console.log('Submitting teacher data:', teacherData);
      await dispatch(createTeacher(teacherData)).unwrap();
      navigate('/teachers');
    } catch (error: any) {
      console.error('Failed to create teacher:', error);
      console.error('Error response:', error.response?.data);
      // Show validation errors if they exist
      if (error.response?.data?.errors) {
        alert(error.response.data.errors.join('\n'));
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to create teacher. Please check all required fields.');
      }
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 1000, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Register New Teacher
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
          Personal Information
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Middle Name"
              name="middlename"
              value={formData.middlename}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              helperText="Select gender"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              inputProps={{ min: 21, max: 100 }}
              helperText="Age must be between 21 and 100"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Contact Information Section */}
        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
          Contact Information
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              helperText="Enter a valid email address"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Phone Number"
              name="phonenumber"
              value={formData.phonenumber}
              onChange={handleChange}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Professional Information Section */}
        <Typography variant="h6" sx={{ mb: 2, color: 'primary.main' }}>
          Professional Information
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              select
              label="Department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              helperText="Select department"
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              label="Years of Experience"
              name="yearsofexperience"
              value={formData.yearsofexperience}
              onChange={handleChange}
              inputProps={{ min: 0 }}
              helperText="Enter years of experience"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="School Year"
              name="schoolyear"
              value={formData.schoolyear}
              onChange={handleChange}
              placeholder="2023-2024"
              helperText="Format: YYYY-YYYY (e.g., 2023-2024)"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Form Actions */}
        <Box display="flex" gap={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={() => navigate('/teachers')}
            sx={{ minWidth: 120 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ minWidth: 120 }}
          >
            Register Teacher
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default TeacherForm;