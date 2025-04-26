
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import PatientDashboard from './PatientDashboard';
import DoctorDashboard from './DoctorDashboard';
import BookAppointment from './BookAppointment';
import Appointments from './Appointments';
import HealthRecords from './HealthRecords';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
};

const Dashboard = () => {
  const { user } = useAuth();

  if (user?.role === 'DOCTOR') {
    return <DoctorDashboard />;
  }
  
  return <PatientDashboard />;
};

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute 
                element={<Dashboard />}
                allowedRoles={['PATIENT', 'DOCTOR']} 
              />
            } 
          />
          
          <Route 
            path="/book-appointment" 
            element={
              <ProtectedRoute 
                element={<BookAppointment />}
                allowedRoles={['PATIENT']} 
              />
            } 
          />
          
          <Route 
            path="/book-appointment/:doctorId" 
            element={
              <ProtectedRoute 
                element={<BookAppointment />}
                allowedRoles={['PATIENT']} 
              />
            } 
          />
          
          <Route 
            path="/appointments" 
            element={
              <ProtectedRoute 
                element={<Appointments />}
                allowedRoles={['PATIENT', 'DOCTOR']} 
              />
            } 
          />
          
          <Route 
            path="/records" 
            element={
              <ProtectedRoute 
                element={<HealthRecords />}
                allowedRoles={['PATIENT']} 
              />
            } 
          />
        </Routes>
      </main>
    </div>
  );
};

export default Index;
