
import React from 'react';
import { Calendar, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  
  const handleBookAppointment = () => {
    navigate(`/book-appointment/${doctor.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-lg font-bold">
                {doctor.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-medium text-lg">{doctor.name}</h3>
              <p className="text-muted-foreground">{doctor.specialty}</p>
            </div>
          </div>
          
          <div className="px-2 py-1 bg-secondary rounded-full text-xs font-medium">
            {doctor.availability}
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          <p>{doctor.description}</p>
        </div>
        
        <div className="mt-4 border-t pt-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button 
              onClick={handleBookAppointment}
              className="inline-flex items-center text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-md text-sm"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Book Appointment
            </button>
            
            <button className="inline-flex items-center text-primary border border-primary hover:bg-primary/10 px-4 py-2 rounded-md text-sm">
              <Phone className="mr-2 h-4 w-4" />
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
