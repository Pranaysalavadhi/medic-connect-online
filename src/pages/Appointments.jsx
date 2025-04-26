
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppointmentList from '../components/AppointmentList';
import { Plus, Calendar, Filter } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for demonstration
const mockAppointments = [
  {
    id: '1',
    doctorId: '1',
    doctorName: 'Sarah Johnson',
    patientName: 'John Doe',
    appointmentTime: '2024-04-28T10:30:00',
    status: 'CONFIRMED',
    notes: 'Follow-up appointment for medication review.',
  },
  {
    id: '2',
    doctorId: '2',
    doctorName: 'Michael Chen',
    patientName: 'John Doe',
    appointmentTime: '2024-05-03T14:15:00',
    status: 'PENDING',
    notes: 'Initial consultation for skin rash.',
  },
  {
    id: '3',
    doctorId: '1',
    doctorName: 'Sarah Johnson',
    patientName: 'Emma Smith',
    appointmentTime: '2024-04-28T11:30:00',
    status: 'PENDING',
    notes: 'Initial consultation.',
  },
  {
    id: '4',
    doctorId: '1',
    doctorName: 'Sarah Johnson',
    patientName: 'Michael Brown',
    appointmentTime: '2024-04-28T14:00:00',
    status: 'PENDING',
    notes: 'Discussing test results.',
  },
  {
    id: '5',
    doctorId: '1',
    doctorName: 'Sarah Johnson',
    patientName: 'Sophia Williams',
    appointmentTime: '2024-04-29T09:15:00',
    status: 'CONFIRMED',
    notes: 'Annual check-up.',
  },
  {
    id: '6',
    doctorId: '3',
    doctorName: 'Emily Rodriguez',
    patientName: 'John Doe',
    appointmentTime: '2024-05-05T09:00:00',
    status: 'CONFIRMED',
    notes: 'Regular check-up.',
  },
];

const Appointments = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'confirmed', 'cancelled'
  
  useEffect(() => {
    // In a real app, this would call an API to get the user's appointments
    // For now, using mock data filtered by role
    
    let filteredAppointments;
    if (user?.role === 'PATIENT') {
      // For patients, filter appointments where the patient's name matches
      filteredAppointments = mockAppointments.filter(appointment => 
        appointment.patientName === 'John Doe' // In a real app, this would use user.name
      );
    } else {
      // For doctors, filter appointments where they are the doctor
      filteredAppointments = mockAppointments.filter(appointment => 
        appointment.doctorId === '1' // In a real app, this would use user.id
      );
    }
    
    setAppointments(filteredAppointments);
    setLoading(false);
  }, [user]);
  
  const handleUpdateStatus = (appointmentId, status) => {
    // In a real app, this would call an API to update the appointment status
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === appointmentId 
        ? { ...appointment, status } 
        : appointment
    );
    
    setAppointments(updatedAppointments);
    toast.success(`Appointment ${status.toLowerCase()} successfully`);
  };
  
  const filteredAppointments = appointments.filter(appointment => {
    if (statusFilter === 'all') return true;
    return appointment.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
          {user?.role === 'PATIENT' ? 'My Appointments' : 'Appointment Requests'}
        </h1>
        
        <div className="flex w-full sm:w-auto space-x-2">
          {user?.role === 'PATIENT' && (
            <button
              onClick={() => navigate('/book-appointment')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-1" />
              Book New
            </button>
          )}
          
          <div className="relative inline-block text-left">
            <button
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              onClick={() => {
                const nextFilter = statusFilter === 'all' 
                  ? 'pending' 
                  : statusFilter === 'pending' 
                    ? 'confirmed' 
                    : statusFilter === 'confirmed' 
                      ? 'cancelled' 
                      : 'all';
                setStatusFilter(nextFilter);
              }}
            >
              <Filter className="h-4 w-4 mr-1" />
              {statusFilter === 'all' ? 'All' : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
            </button>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="p-4 sm:p-6 bg-gray-50 border-b">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">
                {statusFilter === 'all' ? 'All Appointments' : `${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} Appointments`}
              </h2>
              <span className="ml-2 bg-gray-100 text-gray-700 py-1 px-2 rounded-full text-xs font-medium">
                {filteredAppointments.length}
              </span>
            </div>
          </div>
          
          <AppointmentList 
            appointments={filteredAppointments}
            userRole={user?.role}
            onUpdateStatus={user?.role === 'DOCTOR' ? handleUpdateStatus : undefined}
          />
        </div>
      )}
    </div>
  );
};

export default Appointments;
