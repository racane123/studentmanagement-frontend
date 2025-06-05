import React from 'react';
import { Card, CardContent, Typography, Chip, Box, Divider } from '@mui/material';
import type { Section, SubjectAssignment, StudentEnrollment } from '../../types/section';

interface SectionCardProps {
  section: Section;
}

const SectionCard: React.FC<SectionCardProps> = ({ section }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {section.name}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Chip label={section.gradeLevel} color="primary" sx={{ mr: 1 }} />
          <Chip label={section.schoolYear} color="secondary" />
        </Box>
        
        <Typography variant="subtitle1" gutterBottom>
          Adviser: {section.adviser?.firstName} {section.adviser?.lastName}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Subjects ({section.subjects?.length || 0})
        </Typography>
        {section.subjects?.map((subject: SubjectAssignment) => (
          <Box key={subject.id} sx={{ mb: 1 }}>
            <Typography variant="body2">
              {subject.subject.name} ({subject.subject.code})
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Teacher: {subject.teacher.firstName} {subject.teacher.lastName} | 
              Schedule: {subject.schedule} | Room: {subject.room}
            </Typography>
          </Box>
        ))}

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" gutterBottom>
          Students ({section.studentCount || 0})
        </Typography>
        {section.students?.map((student: StudentEnrollment) => (
          <Box key={student.id} sx={{ mb: 1 }}>
            <Typography variant="body2">
              {student.student.firstName} {student.student.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Status: {student.status} | Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default SectionCard; 