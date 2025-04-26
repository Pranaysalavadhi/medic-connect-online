
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DoctorCard from '../components/DoctorCard';
import AppointmentList from '../components/AppointmentList';
import { Search, Calendar, FileText } from 'lucide-react';

// Mock data for demonstration
const mockDoctors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    availability: 'Available Today',
    description: 'Specialist in heart diseases with over 10 years of experience.',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Dermatologist',
    availability: 'Next Available: Tomorrow',
    description: 'Expert in skin conditions and treatments.',
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Pediatrician',
    availability: 'Available Today',
    description: 'Specializing in child healthcare from infancy through adolescence.',
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialty: 'Psychiatrist',
    availability: 'Next Available: Thursday',
    description: 'Experienced in treating mental health disorders and providing therapy.',
  },
];

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
];

const PatientDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch doctors and appointments from API
    // For now using mock data
    setDoctors(mockDoctors);
    setAppointments(mockAppointments);
    setLoading(false);
  }, []);
  
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Patient Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Doctor Listings */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 sm:mb-0">Find a Doctor</h2>
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name or specialty"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-primary focus:border-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map(doctor => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No doctors match your search criteria.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Sidebar - Appointments & Quick Links */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Upcoming Appointments
              </h3>
              <button 
                onClick={() => navigate('/appointments')}
                className="text-sm text-primary hover:text-primary/80"
              >
                View all
              </button>
            </div>
            
            <AppointmentList 
              appointments={appointments.slice(0, 2)} 
              userRole="PATIENT"
            />
          </div>
          
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/book-appointment')}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Book New Appointment
              </button>
              
              <button 
                onClick={() => navigate('/records')}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FileText className="h-4 w-4 mr-2" />
                Upload Health Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
