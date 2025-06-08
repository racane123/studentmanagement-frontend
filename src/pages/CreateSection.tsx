import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store';
import SectionForm from '../components/sections/SectionForm';
import teacherService from '../services/teacherService';
import { subjectService } from '../services/subjectService';
import { createSection } from '../store/slices/sectionSlice';
import type { Teacher } from '../types/teacher';
import type { Subject } from '../types/subject';
import type { CreateSectionData } from '../types/section';

const CreateSection: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teachersData, subjectsData] = await Promise.all([
          teacherService.getAllTeachers(),
          subjectService.getAllSubjects(),
        ]);
        
        // Transform the data to match the expected types
        const transformedTeachers: Teacher[] = teachersData.teachers.map((t: any) => ({
          id: t.id,
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
          id: s.id,
          name: s.name,
          code: s.code,
          description: s.description || '',
          department: s.department || '',
        }));

        setTeachers(transformedTeachers);
        setSubjects(transformedSubjects);
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

    fetchData();
  }, [toast]);

  const handleCreateSection = async (formData: CreateSectionData) => {
    if (!formData.name || !formData.gradeLevel || !formData.schoolYear || !formData.adviserId) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

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

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8}>
        <Heading size="lg">Create New Section</Heading>
      </Box>
      <SectionForm
        teachers={teachers}
        subjects={subjects}
        onSubmit={handleCreateSection}
        onCancel={() => navigate('/sections')}
      />
    </Container>
  );
};

export default CreateSection; 