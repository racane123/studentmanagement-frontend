import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchSubjects, createSubject, updateSubject, deleteSubject } from '../store/slices/subjectSlice';
import SubjectCard from '../components/subjects/SubjectCard';
import SubjectForm from '../components/subjects/SubjectForm';

const Subjects: React.FC = () => {
  const dispatch = useAppDispatch();
  const { subjects = [], loading, error } = useAppSelector((state) => state.subjects);
  const [openForm, setOpenForm] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');


  console.log(dispatch)
  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const handleCreateSubject = async (subjectData: any) => {
    try {
      await dispatch(createSubject(subjectData)).unwrap();
      setOpenForm(false);
    } catch (error) {
      console.error('Failed to create subject:', error);
    }
  };

  const handleUpdateSubject = async (subjectData: any) => {
    if (!selectedSubject) return;
    try {
      await dispatch(updateSubject({ id: selectedSubject.id, data: subjectData })).unwrap();
      setOpenForm(false);
      setSelectedSubject(null);
    } catch (error) {
      console.error('Failed to update subject:', error);
    }
  };

  const handleDeleteSubject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        await dispatch(deleteSubject(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete subject:', error);
      }
    }
  };

  const handleEditSubject = (subject: any) => {
    setSelectedSubject(subject);
    setOpenForm(true);
  };

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subject.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Subjects
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedSubject(null);
            setOpenForm(true);
          }}
        >
          Add Subject
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search subjects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {filteredSubjects.map((subject) => (
            <Grid item xs={12} sm={6} md={4} key={subject.id}>
              <SubjectCard
                subject={subject}
                onEdit={handleEditSubject}
                onDelete={handleDeleteSubject}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <SubjectForm
        open={openForm}
        subject={selectedSubject}
        onSubmit={selectedSubject ? handleUpdateSubject : handleCreateSubject}
        onCancel={() => {
          setOpenForm(false);
          setSelectedSubject(null);
        }}
      />
    </Container>
  );
};

export default Subjects; 