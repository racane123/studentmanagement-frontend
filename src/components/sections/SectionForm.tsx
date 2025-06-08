import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  useToast,
  VStack,
  IconButton,
  HStack,
  Text,
  Heading,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import type { Section, CreateSectionData, UpdateSectionData, SubjectAssignment } from '../../types/section';
import type { Teacher } from '../../types/teacher';
import type { Subject } from '../../types/subject';

interface SectionFormProps {
  teachers: Teacher[];
  subjects: Subject[];
  onSubmit: (data: CreateSectionData | UpdateSectionData) => void;
  onCancel: () => void;
  initialData?: Section;
}

const SectionForm: React.FC<SectionFormProps> = ({
  teachers,
  subjects,
  onSubmit,
  onCancel,
  initialData,
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [gradeLevel, setGradeLevel] = useState(initialData?.gradeLevel || '');
  const [schoolYear, setSchoolYear] = useState(initialData?.schoolYear || '');
  const [adviserId, setAdviserId] = useState<number | ''>(initialData?.adviserId || '');
  const [subjectAssignments, setSubjectAssignments] = useState<{
    subjectId: number;
    teacherId: number;
    schedule: string;
    room: string;
  }[]>(
    initialData?.subjects?.map(s => ({
      subjectId: s.subject.id,
      teacherId: s.teacher.id,
      schedule: s.schedule || '',
      room: s.room || '',
    })) || [{ subjectId: 0, teacherId: 0, schedule: '', room: '' }]
  );
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleAddSubject = () => {
    setSubjectAssignments([
      ...subjectAssignments,
      { subjectId: 0, teacherId: 0, schedule: '', room: '' }
    ]);
  };

  const handleRemoveSubject = (index: number) => {
    setSubjectAssignments(subjectAssignments.filter((_, i) => i !== index));
  };

  const handleSubjectChange = (index: number, field: keyof {
    subjectId: number;
    teacherId: number;
    schedule: string;
    room: string;
  }, value: string | number) => {
    const newAssignments = [...subjectAssignments];
    newAssignments[index] = {
      ...newAssignments[index],
      [field]: value
    };
    setSubjectAssignments(newAssignments);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!name || !gradeLevel || !schoolYear || !adviserId) {
        toast({
          title: 'Error',
          description: 'Please fill in all required fields',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // Filter out empty subject assignments
      const validSubjects = subjectAssignments.filter(
        assignment => assignment.subjectId && assignment.teacherId && assignment.schedule && assignment.room
      );

      await onSubmit({
        name,
        gradeLevel,
        schoolYear,
        adviserId,
        subjects: validSubjects,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Section Name</FormLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Section A"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Grade Level</FormLabel>
          <Select
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
          >
            <option value="">Select grade level</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
              <option key={grade} value={grade.toString()}>
                Grade {grade}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>School Year</FormLabel>
          <Input
            value={schoolYear}
            onChange={(e) => setSchoolYear(e.target.value)}
            placeholder="e.g., 2024-2025"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Adviser</FormLabel>
          <Select
            value={adviserId}
            onChange={(e) => setAdviserId(Number(e.target.value))}
          >
            <option value="">Select an adviser</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.firstName} {teacher.lastName}
              </option>
            ))}
          </Select>
        </FormControl>

        <Box>
          <Heading size="md" mb={4}>Subjects</Heading>
          {subjectAssignments.map((assignment, index) => (
            <Box key={index} p={4} borderWidth={1} borderRadius="md" mb={4}>
              <HStack justify="space-between" mb={4}>
                <Text fontWeight="bold">Subject {index + 1}</Text>
                {subjectAssignments.length > 1 && (
                  <IconButton
                    aria-label="Remove subject"
                    icon={<DeleteIcon />}
                    onClick={() => handleRemoveSubject(index)}
                    size="sm"
                    colorScheme="red"
                    variant="ghost"
                  />
                )}
              </HStack>
              <Stack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Subject</FormLabel>
                  <Select
                    value={assignment.subjectId}
                    onChange={(e) => handleSubjectChange(index, 'subjectId', Number(e.target.value))}
                  >
                    <option value="">Select a subject</option>
                    {subjects.map((subject) => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name} ({subject.code})
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Teacher</FormLabel>
                  <Select
                    value={assignment.teacherId}
                    onChange={(e) => handleSubjectChange(index, 'teacherId', Number(e.target.value))}
                  >
                    <option value="">Select a teacher</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.firstName} {teacher.lastName}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Schedule</FormLabel>
                  <Input
                    value={assignment.schedule}
                    onChange={(e) => handleSubjectChange(index, 'schedule', e.target.value)}
                    placeholder="e.g., MWF 9:00-10:30"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Room</FormLabel>
                  <Input
                    value={assignment.room}
                    onChange={(e) => handleSubjectChange(index, 'room', e.target.value)}
                    placeholder="e.g., Room 101"
                  />
                </FormControl>
              </Stack>
            </Box>
          ))}

          <Button
            leftIcon={<AddIcon />}
            onClick={handleAddSubject}
            variant="outline"
            colorScheme="blue"
            mb={4}
          >
            Add Another Subject
          </Button>
        </Box>

        <HStack spacing={4} justify="flex-end">
          <Button onClick={onCancel} variant="ghost">
            Cancel
          </Button>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isLoading}
            loadingText="Saving..."
          >
            Save Section
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default SectionForm; 