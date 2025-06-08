import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  useToast,
  Stack,
  Flex,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store';
import SectionCard from '../components/sections/SectionCard';
import teacherService from '../services/teacherService';
import { subjectService } from '../services/subjectService';
import { fetchSections, createSection, deleteSection } from '../store/slices/sectionSlice';
import type { Section } from '../types/section';
import type { Teacher } from '../types/teacher';
import type { Subject } from '../types/subject';
import type { RootState } from '../store';
import type { CreateSectionData } from '../services/sectionService';

const Sections: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { sections, loading, error } = useSelector((state: RootState) => state.sections);
  const [teachers, setTeachers] = React.useState<Teacher[]>([]);
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const toast = useToast();

  const fetchData = async () => {
    try {
      const [teachersData, subjectsData] = await Promise.all([
        teacherService.getAllTeachers(),
        subjectService.getAllSubjects(),
      ]);
      
      // Transform the data to match the expected types
      const transformedTeachers: Teacher[] = teachersData.teachers.map((t: any) => ({
        id: t.id.toString(),
        firstName: t.firstname,
        lastName: t.lastname,
        email: t.email,
        phoneNumber: t.phonenumber || '',
        gender: t.gender || '',
        age: t.age || 0,
        department: t.department || '',
        qualification: t.qualification || '',
        yearsOfExperience: t.yearsofexperience || 0,
        schoolYear: t.schoolyear || '',
      }));

      const transformedSubjects: Subject[] = subjectsData.subjects.map((s: any) => ({
        id: s.id.toString(),
        name: s.name,
        code: s.code,
        description: s.description || '',
        department: s.department || '',
      }));

      setTeachers(transformedTeachers);
      setSubjects(transformedSubjects);
      dispatch(fetchSections());
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch data',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleCreateSection = async (formData: CreateSectionData) => {
    try {
      await dispatch(createSection(formData)).unwrap();
      toast({
        title: 'Success',
        description: 'Section created successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/sections');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create section',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteSection = async (id: string) => {
    try {
      await dispatch(deleteSection(Number(id))).unwrap();
      toast({
        title: 'Success',
        description: 'Section deleted successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete section',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleEdit = (section: Section) => {
    navigate(`/sections/${section.id}/edit`);
  };

  const handleCreate = () => {
    navigate('/sections/create');
  };

  if (loading) {
    return <Box p={4}>Loading...</Box>;
  }

  if (error) {
    return <Box p={4} color="red.500">{error}</Box>;
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Flex justify="space-between" align="center">
          <Heading size="lg">Sections</Heading>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="blue"
            onClick={handleCreate}
          >
            Create Section
          </Button>
        </Flex>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {Array.isArray(sections) && sections.map((section) => (
            section && section.id ? (
              <SectionCard
                key={section.id}
                section={section}
                onEdit={() => handleEdit(section)}
                onDelete={() => handleDeleteSection(section.id.toString())}
              />
            ) : null
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
};

export default Sections; 