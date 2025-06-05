import React from 'react';
import { Container, Typography } from '@mui/material';
import { StudentsList } from '../components/students/StudentsList';

const Students: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Students
      </Typography>
      <StudentsList />
    </Container>
  );
};

export default Students; 