import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import LoginForm from './components/auth/LoginForm';
import { Register } from './components/auth/Register';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Subjects from './pages/Subjects';
import Sections from './pages/Sections';
import CreateSection from './pages/CreateSection';
import EditSection from './pages/EditSection';
import StudentForm from './components/students/StudentForm';
import TeacherForm from './components/teachers/TeacherForm';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="students/new" element={<StudentForm />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="teachers/register" element={<TeacherForm />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="sections" element={<ProtectedRoute><Sections /></ProtectedRoute>} />
          <Route path="sections/create" element={<ProtectedRoute><CreateSection /></ProtectedRoute>} />
          <Route path="sections/:id/edit" element={<ProtectedRoute><EditSection /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
