
import React from 'react';
import { Calendar, Clock, UserCheck, X, Check } from 'lucide-react';

const AppointmentList = ({ appointments, userRole, onUpdateStatus }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };
  
  const getStatusColor = (status) => {
    switch (status.toUpperCase()) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (!appointments || appointments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <Calendar className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">No appointments</h3>
        <p className="mt-1 text-sm text-gray-500">
          {userRole === 'PATIENT' 
            ? "You haven't booked any appointments yet."
            : "You don't have any upcoming appointments."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center">
                <div className={`rounded-full w-12 h-12 flex items-center justify-center ${
                  appointment.status.toUpperCase() === 'CONFIRMED' ? 'bg-green-100' : 
                  appointment.status.toUpperCase() === 'PENDING' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <Calendar className={`h-6 w-6 ${
                    appointment.status.toUpperCase() === 'CONFIRMED' ? 'text-green-700' : 
                    appointment.status.toUpperCase() === 'PENDING' ? 'text-yellow-700' : 'text-red-700'
                  }`} />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">
                    {userRole === 'PATIENT' 
                      ? `Dr. ${appointment.doctorName}` 
                      : appointment.patientName}
                  </h4>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(appointment.appointmentTime)}
                    <span className="mx-1">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    {formatTime(appointment.appointmentTime)}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                {appointment.status}
              </span>
              
              {userRole === 'DOCTOR' && appointment.status.toUpperCase() === 'PENDING' && (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onUpdateStatus(appointment.id, 'CONFIRMED')} 
                    className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                  >
                    <Check className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => onUpdateStatus(appointment.id, 'CANCELLED')} 
                    className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {appointment.notes && (
            <div className="mt-4">
              <p className="text-sm text-gray-600">{appointment.notes}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;
