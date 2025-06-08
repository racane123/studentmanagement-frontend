import React from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Stack,
  Badge,
  Button,
  Flex,
  useColorModeValue,
  Divider,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import type { Section } from '../../types/section';

interface SectionCardProps {
  section: Section;
  onEdit?: (section: Section) => void;
  onDelete?: (id: string) => void;
}

const SectionCard: React.FC<SectionCardProps> = ({ section, onEdit, onDelete }) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const headerBg = useColorModeValue('gray.50', 'gray.600');

  // Helper function to safely get grade level
  const getGradeLevel = () => {
    if (section.grade_level === undefined || section.grade_level === null) {
      return 'N/A';
    }
    return String(section.grade_level);
  };

  // Helper function to safely get academic year
  const getAcademicYear = () => {
    return section.school_year || 'N/A';
  };

  const getAdviserName = () => {
    if (!section.adviser) return 'No adviser assigned';
    return `${section.adviser.firstName} ${section.adviser.lastName}`;
  };

  return (
    <Card
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      _hover={{ boxShadow: 'md' }}
      transition="all 0.2s"
    >
      <CardHeader bg={headerBg} py={4}>
        <Flex justify="space-between" align="center">
          <Heading size="md" color="blue.600">{section.name || 'Unnamed Section'}</Heading>
          <Flex gap={2}>
            <Button
              size="sm"
              leftIcon={<EditIcon />}
              onClick={() => onEdit?.(section)}
              colorScheme="blue"
              variant="outline"
            >
              Edit
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              leftIcon={<DeleteIcon />}
              onClick={() => onDelete?.(section.id)}
              variant="outline"
            >
              Delete
            </Button>
          </Flex>
        </Flex>
      </CardHeader>
      <Divider />
      <CardBody py={4}>
        <Stack spacing={4}>
          <Box>
            <Text fontWeight="bold" color="gray.600" fontSize="sm">Grade Level</Text>
            <Text fontSize="md">{getGradeLevel()}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold" color="gray.600" fontSize="sm">Academic Year</Text>
            <Text fontSize="md">{getAcademicYear()}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold" color="gray.600" fontSize="sm">Adviser</Text>
            <Text fontSize="md">{getAdviserName()}</Text>
          </Box>
          <Box>
            <Text fontWeight="bold" color="gray.600" fontSize="sm">Subjects</Text>
            <VStack align="stretch" spacing={2} mt={2}>
              {section.subjects?.map((subject) => (
                <Box key={subject.id} p={2} borderWidth={1} borderRadius="md">
                  <HStack justify="space-between">
                    <Text fontWeight="medium">
                      {subject.subject?.name} ({subject.subject?.code})
                    </Text>
                    <Badge colorScheme="blue">{subject.room || 'No room'}</Badge>
                  </HStack>
                  <Text fontSize="sm" color="gray.600">
                    Teacher: {subject.teacher?.firstName} {subject.teacher?.lastName}
                  </Text>
                  <Text fontSize="sm" color="gray.600">
                    Schedule: {subject.schedule || 'No schedule'}
                  </Text>
                </Box>
              ))}
              {(!section.subjects || section.subjects.length === 0) && (
                <Text fontSize="sm" color="gray.500">No subjects assigned</Text>
              )}
            </VStack>
          </Box>
          <Box>
            <Text fontWeight="bold" color="gray.600" fontSize="sm">Students</Text>
            <Flex align="center" gap={2}>
              <Text fontSize="md">{section.student_count || 0}</Text>
              <Text fontSize="sm" color="gray.500">enrolled</Text>
            </Flex>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default SectionCard; 