
import React, { useState, useEffect } from 'react';
import AppointmentList from '../components/AppointmentList';
import { toast } from 'sonner';
import { Calendar, Users, Clock, CheckCircle, XCircle } from 'lucide-react';

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
    doctorId: '1',
    doctorName: 'Sarah Johnson',
    patientName: 'Emma Smith',
    appointmentTime: '2024-04-28T11:30:00',
    status: 'PENDING',
    notes: 'Initial consultation.',
  },
  {
    id: '3',
    doctorId: '1',
    doctorName: 'Sarah Johnson',
    patientName: 'Michael Brown',
    appointmentTime: '2024-04-28T14:00:00',
    status: 'PENDING',
    notes: 'Discussing test results.',
  },
  {
    id: '4',
    doctorId: '1',
    doctorName: 'Sarah Johnson',
    patientName: 'Sophia Williams',
    appointmentTime: '2024-04-29T09:15:00',
    status: 'CONFIRMED',
    notes: 'Annual check-up.',
  },
  {
    id: '5',
    doctorId: '1',
    doctorName: 'Sarah Johnson',
    patientName: 'James Johnson',
    appointmentTime: '2024-04-29T15:45:00',
    status: 'PENDING',
    notes: 'Follow-up on treatment plan.',
  },
];

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'today', 'pending'
  
  useEffect(() => {
    // Fetch appointments from API
    // For now using mock data
    setAppointments(mockAppointments);
    
    const today = new Date().toISOString().split('T')[0];
    const pendingAppts = mockAppointments.filter(appt => appt.status === 'PENDING');
    const todayAppts = mockAppointments.filter(appt => appt.appointmentTime.startsWith(today));
    
    setPendingCount(pendingAppts.length);
    setTodayCount(todayAppts.length);
    setLoading(false);
  }, []);
  
  const handleUpdateStatus = (appointmentId, status) => {
    // In a real app, this would call the API to update the appointment status
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === appointmentId 
        ? { ...appointment, status } 
        : appointment
    );
    
    setAppointments(updatedAppointments);
    
    const updatedPendingCount = updatedAppointments.filter(appt => appt.status === 'PENDING').length;
    setPendingCount(updatedPendingCount);
    
    toast.success(`Appointment ${status.toLowerCase()} successfully`);
  };
  
  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true;
    
    if (filter === 'pending') {
      return appointment.status === 'PENDING';
    }
    
    if (filter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return appointment.appointmentTime.startsWith(today);
    }
    
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Doctor Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Today's Appointments</p>
            <p className="text-2xl font-bold">{todayCount}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
          <div className="rounded-full bg-yellow-100 p-3 mr-4">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending Requests</p>
            <p className="text-2xl font-bold">{pendingCount}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <Users className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Patients</p>
            <p className="text-2xl font-bold">{appointments.length}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:mb-0">Appointment Requests</h2>
          
          <div className="flex space-x-2 w-full sm:w-auto">
            <button 
              className={`px-4 py-2 text-sm rounded-md flex items-center ${
                filter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 text-sm rounded-md flex items-center ${
                filter === 'today' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setFilter('today')}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Today
            </button>
            <button 
              className={`px-4 py-2 text-sm rounded-md flex items-center ${
                filter === 'pending' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setFilter('pending')}
            >
              <Clock className="h-4 w-4 mr-1" />
              Pending
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <AppointmentList 
            appointments={filteredAppointments} 
            userRole="DOCTOR"
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
