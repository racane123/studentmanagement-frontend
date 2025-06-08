import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Teacher } from '../../types/teacher';

interface TeacherListProps {
  teachers: Teacher[];
  onEdit?: (teacher: Teacher) => void;
  onDelete?: (id: string) => void;
}

const TeacherList: React.FC<TeacherListProps> = ({ teachers, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>School Year</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teachers.map((teacher) => (
            <TableRow key={teacher.id}>
              <TableCell>{teacher.firstname} {teacher.middlename} {teacher.lastname}</TableCell>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>{teacher.department}</TableCell>
              <TableCell>{teacher.schoolyear}</TableCell>
              <TableCell align="center">
                <IconButton 
                  color="primary" 
                  onClick={() => onEdit?.(teacher)}
                  size="small"
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  color="error" 
                  onClick={() => onDelete?.(teacher.id)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeacherList; 