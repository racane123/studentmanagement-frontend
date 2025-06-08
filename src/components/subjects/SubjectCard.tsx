import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, School as SchoolIcon } from '@mui/icons-material';

interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  department: string;
}

interface SubjectCardProps {
  subject: Subject;
  onEdit?: (subject: Subject) => void;
  onDelete?: (id: string) => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onEdit, onDelete }) => {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6,
      },
    }}>
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              {subject.name}
            </Typography>
            <Chip 
              label={subject.code} 
              color="primary" 
              size="small"
              sx={{ 
                fontWeight: 'medium',
                '& .MuiChip-label': {
                  px: 1,
                },
              }}
            />
          </Box>
          <Tooltip title="Department">
            <Chip 
              icon={<SchoolIcon />}
              label={subject.department} 
              variant="outlined" 
              size="small"
              sx={{ 
                backgroundColor: 'background.paper',
                '& .MuiChip-label': {
                  px: 1,
                },
              }}
            />
          </Tooltip>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {subject.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ 
        justifyContent: 'flex-end', 
        p: 2,
        pt: 0,
        '& .MuiButton-root': {
          minWidth: 'auto',
          px: 1,
        },
      }}>
        {onEdit && (
          <Tooltip title="Edit Subject">
            <IconButton
              size="small"
              color="primary"
              onClick={() => onEdit(subject)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        {onDelete && (
          <Tooltip title="Delete Subject">
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete(subject.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
};

export default SubjectCard; 