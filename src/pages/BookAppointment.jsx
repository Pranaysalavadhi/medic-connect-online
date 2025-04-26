
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { Calendar, Clock, FileText, User } from 'lucide-react';

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

// Generate available time slots for the next 7 days
const generateTimeSlots = () => {
  const slots = [];
  const today = new Date();
  
  for (let day = 0; day < 7; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    const dateStr = date.toISOString().split('T')[0];
    
    // Morning slots
    for (let hour = 9; hour < 12; hour++) {
      slots.push({
        time: `${dateStr}T${hour.toString().padStart(2, '0')}:00:00`,
        display: `${dateStr} ${hour}:00 AM`,
      });
      slots.push({
        time: `${dateStr}T${hour.toString().padStart(2, '0')}:30:00`,
        display: `${dateStr} ${hour}:30 AM`,
      });
    }
    
    // Afternoon slots
    for (let hour = 13; hour < 17; hour++) {
      slots.push({
        time: `${dateStr}T${hour.toString().padStart(2, '0')}:00:00`,
        display: `${dateStr} ${hour - 12}:00 PM`,
      });
      slots.push({
        time: `${dateStr}T${hour.toString().padStart(2, '0')}:30:00`,
        display: `${dateStr} ${hour - 12}:30 PM`,
      });
    }
  }
  
  return slots;
};

const timeSlots = generateTimeSlots();

const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  
  useEffect(() => {
    // In a real app, this would fetch doctors from an API
    setDoctors(mockDoctors);
    
    if (doctorId) {
      const doctor = mockDoctors.find(d => d.id === doctorId);
      if (doctor) {
        setSelectedDoctor(doctor);
      }
    }
  }, [doctorId]);
  
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setSelectedTime('');
  };
  
  const filteredTimeSlots = timeSlots.filter(slot => 
    slot.time.startsWith(selectedDate)
  );
  
  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      toast.error('Please select a doctor, date and time');
      return;
    }
    
    setLoading(true);
    
    // In a real app, this would call an API to book the appointment
    setTimeout(() => {
      toast.success('Appointment request sent successfully!');
      navigate('/appointments');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Book an Appointment</h1>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          {!doctorId && (
            <div className="mb-6">
              <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-2">
                Select Doctor
              </label>
              <select
                id="doctor"
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                value={selectedDoctor ? selectedDoctor.id : ''}
                onChange={(e) => {
                  const doctor = doctors.find(d => d.id === e.target.value);
                  setSelectedDoctor(doctor || null);
                }}
                required
              >
                <option value="">Select a doctor</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {selectedDoctor && (
            <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{selectedDoctor.name}</h3>
                  <p className="text-sm text-gray-500">{selectedDoctor.specialty}</p>
                  <p className="text-sm text-gray-500 mt-1">{selectedDoctor.description}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline-block h-4 w-4 mr-1" />
              Select Date
            </label>
            <input
              type="date"
              id="date"
              min={new Date().toISOString().split('T')[0]}
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              required
            />
          </div>
          
          {selectedDate && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="inline-block h-4 w-4 mr-1" />
                Select Time
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {filteredTimeSlots.map((slot, index) => (
                  <label
                    key={index}
                    className={`flex items-center justify-center px-4 py-2 border rounded-md cursor-pointer ${
                      selectedTime === slot.time
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="time"
                      value={slot.time}
                      checked={selectedTime === slot.time}
                      onChange={() => setSelectedTime(slot.time)}
                      className="sr-only"
                    />
                    <span className="text-sm">
                      {slot.display.split(' ')[1]} {slot.display.split(' ')[2]}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="inline-block h-4 w-4 mr-1" />
              Reason for Visit (Optional)
            </label>
            <textarea
              id="notes"
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Please describe your symptoms or reason for the appointment"
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            ></textarea>
          </div>
          
          {selectedDoctor && selectedDate && selectedTime && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h4 className="font-medium text-blue-900">Appointment Summary</h4>
              <ul className="mt-2 space-y-1 text-sm text-blue-800">
                <li>Doctor: {selectedDoctor.name}</li>
                <li>Date: {formatDisplayDate(selectedDate)}</li>
                <li>Time: {selectedTime.split('T')[1].substring(0, 5)}</li>
              </ul>
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !selectedDoctor || !selectedDate || !selectedTime}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
