import { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchStudents } from '../store/slices/studentSlice';
import { fetchTeachers } from '../store/slices/teacherSlice';
import { fetchSubjects } from '../store/slices/subjectSlice';
import { fetchSections } from '../store/slices/sectionSlice';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { students, loading: studentsLoading, error: studentsError } = useAppSelector((state) => state.students);
  const { teachers, loading: teachersLoading, error: teachersError } = useAppSelector((state) => state.teachers);
  const { subjects, loading: subjectsLoading, error: subjectsError } = useAppSelector((state) => state.subjects);
  const { sections, loading: sectionsLoading, error: sectionsError } = useAppSelector((state) => state.sections);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
    dispatch(fetchSubjects());
    dispatch(fetchSections());
  }, [dispatch]);

  const isLoading = studentsLoading || teachersLoading || subjectsLoading || sectionsLoading;
  const error = studentsError || teachersError || subjectsError || sectionsError;

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <Alert severity="error">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        padding: '16px'
      }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Students</Typography>
          <Typography variant="h4">{students.length}</Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Teachers</Typography>
          <Typography variant="h4">{teachers.length}</Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Subjects</Typography>
          <Typography variant="h4">{subjects.length}</Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Sections</Typography>
          <Typography variant="h4">{sections.length}</Typography>
        </Paper>
      </div>
    </div>
  );
};

export default Dashboard; 