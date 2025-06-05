import React, { useEffect } from 'react';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SectionTable from '../components/sections/SectionTable';
import { fetchSections } from '../store/slices/sectionSlice';
import type { RootState, AppDispatch } from '../store';

const Sections: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { sections, loading, error } = useSelector((state: RootState) => state.sections);

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sections
      </Typography>
      <SectionTable sections={sections} />
    </Container>
  );
};

export default Sections; 