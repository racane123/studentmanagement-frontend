import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  useToast,
  Text,
  Heading,
  Card,
  CardBody,
  CardHeader,
  Divider,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { createSection } from '../../services/sectionService';
import { getAllTeachers } from '../../services/teacherService';
import { getAllSubjects } from '../../services/subjectService';

interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
}

interface Subject {
  id: number;
  name: string;
}

interface CreateSectionFormProps {
  onSuccess?: () => void;
}

const CreateSectionForm: React.FC<CreateSectionFormProps> = ({ onSuccess }) => {
  const [sectionName, setSectionName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [adviserId, setAdviserId] = useState('');
  const [subjectIds, setSubjectIds] = useState<string[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teachersData, subjectsData] = await Promise.all([
          getAllTeachers(),
          getAllSubjects(),
        ]);
        setTeachers(teachersData);
        setSubjects(subjectsData);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch teachers and subjects',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const sectionData = {
        name: sectionName,
        grade_level: parseInt(gradeLevel),
        adviser_id: parseInt(adviserId),
        subject_ids: subjectIds.map(id => parseInt(id)),
      };

      await createSection(sectionData);
      toast({
        title: 'Success',
        description: 'Section created successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/sections');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create section',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="md">Create New Section</Heading>
      </CardHeader>
      <Divider />
      <CardBody>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Section Name</FormLabel>
              <Input
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                placeholder="Enter section name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Grade Level</FormLabel>
              <Select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                placeholder="Select grade level"
              >
                {[7, 8, 9, 10, 11, 12].map((grade) => (
                  <option key={grade} value={grade}>
                    Grade {grade}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Adviser</FormLabel>
              <Select
                value={adviserId}
                onChange={(e) => setAdviserId(e.target.value)}
                placeholder="Select adviser"
              >
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.first_name} {teacher.last_name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Subjects</FormLabel>
              <Select
                value={subjectIds}
                onChange={(e) => {
                  const selectedOptions = Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  );
                  setSubjectIds(selectedOptions);
                }}
                multiple
                placeholder="Select subjects"
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </Select>
              <Text fontSize="sm" color="gray.500" mt={1}>
                Hold Ctrl/Cmd to select multiple subjects
              </Text>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              isLoading={isLoading}
              loadingText="Creating..."
            >
              Create Section
            </Button>
          </VStack>
        </form>
      </CardBody>
    </Card>
  );
};

export default CreateSectionForm; 