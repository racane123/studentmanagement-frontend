import { Typography, Button, Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherList from '../components/teachers/TeacherList';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { deleteTeacher, fetchTeachers } from '../store/slices/teacherSlice';
import type { Teacher } from '../types/teacher';
import AddIcon from '@mui/icons-material/Add';

const Teachers: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { teachers = [], loading, error } = useAppSelector((state) => state.teachers);

  useEffect(() => {
    console.log('Teachers component mounted, fetching teachers...'); // Debug log
    dispatch(fetchTeachers());
  }, [dispatch]);

  useEffect(() => {
    console.log('Teachers state updated:', teachers); // Debug log
  }, [teachers]);

  const handleEdit = (teacher: Teacher) => {
    // TODO: Implement edit functionality
    console.log('Edit teacher:', teacher);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      dispatch(deleteTeacher(id));
    }
  };

  const handleRegisterClick = () => {
    navigate('/teachers/register');
  };

  if (loading) {
    return <Typography>Loading teachers...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          Teachers
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleRegisterClick}
        >
          Register Teacher
        </Button>
      </Box>
      <TeacherList 
        teachers={teachers} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Teachers; 