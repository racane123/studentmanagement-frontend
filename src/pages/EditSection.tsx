import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { getSectionById } from '../services/sectionService';
import { updateSection } from '../store/slices/sectionSlice';
import type { Teacher } from '../types/teacher';
import type { Subject } from '../types/subject';
import type { Section } from '../types/section';
import type { UpdateSectionData } from '../services/sectionService';

const EditSection: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [section, setSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teachersData, subjectsData, sectionData] = await Promise.all([
          teacherService.getAllTeachers(),
          subjectService.getAllSubjects(),
          getSectionById(parseInt(id!)),
        ]);
        
        // Transform the data to match the expected types
        const transformedTeachers: Teacher[] = teachersData.teachers.map((t: any) => ({
          id: t.id,
          firstname: t.firstname,
          lastname: t.lastname,
          email: t.email,
          phonenumber: t.phonenumber || '',
          gender: t.gender || '',
          age: t.age || 0,
          department: t.department || '',
          qualification: t.qualification || '',
          yearsofexperience: t.yearsofexperience || 0,
          schoolyear: t.schoolyear || '',
        }));

        const transformedSubjects: Subject[] = subjectsData.subjects.map((s: any) => ({
          id: s.id,
          name: s.name,
          code: s.code,
          description: s.description || '',
          department: '',
        }));

        setTeachers(transformedTeachers);
        setSubjects(transformedSubjects);
        setSection(sectionData.section);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch data',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, toast]);

  const handleUpdateSection = async (formData: UpdateSectionData) => {
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
      await dispatch(updateSection({ id: parseInt(id!), data: formData })).unwrap();
      toast({
        title: 'Success',
        description: 'Section updated successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/sections');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update section',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <Box p={4}>Loading...</Box>;
  }

  if (!section) {
    return <Box p={4}>Section not found</Box>;
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8}>
        <Heading size="lg">Edit Section</Heading>
      </Box>
      <SectionForm
        teachers={teachers}
        subjects={subjects}
        initialData={section}
        onSubmit={handleUpdateSection}
        onCancel={() => navigate('/sections')}
        isEditing
      />
    </Container>
  );
};

export default EditSection; 