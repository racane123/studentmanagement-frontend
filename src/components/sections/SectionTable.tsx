import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip
} from '@mui/material';
import type { Section } from '../../types/section';

interface SectionTableProps {
  sections: Section[];
}

const SectionTable: React.FC<SectionTableProps> = ({ sections }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Section</TableCell>
            <TableCell>Grade Level</TableCell>
            <TableCell>School Year</TableCell>
            <TableCell>Adviser</TableCell>
            <TableCell>Subjects</TableCell>
            <TableCell>Students</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sections.map((section) => (
            <TableRow key={section.id}>
              <TableCell>{section.name}</TableCell>
              <TableCell>{section.gradeLevel}</TableCell>
              <TableCell>{section.schoolYear}</TableCell>
              <TableCell>
                {section.adviser ? `${section.adviser.firstname} ${section.adviser.lastname}` : '-'}
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {section.subjects?.map((subject) => (
                    <Box key={subject.id}>
                      <Typography variant="body2">
                        {subject.subject.name} ({subject.subject.code})
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {subject.teacher.firstname} {subject.teacher.lastname} | {subject.schedule} | {subject.room}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {section.students?.map((student) => (
                    <Box key={student.id}>
                      <Typography variant="body2">
                        {student.student.firstname} {student.student.lastname}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {student.enrollmentDate} | {student.status}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SectionTable; 