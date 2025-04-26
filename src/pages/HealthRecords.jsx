
import React, { useState, useEffect } from 'react';
import RecordTable from '../components/RecordTable';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { FileUp, FileText, File, X } from 'lucide-react';

// Mock data for demonstration
const mockRecords = [
  {
    id: '1',
    patientId: '123',
    fileName: 'Blood_Test_Results.pdf',
    fileType: 'PDF',
    fileUrl: '#',
    uploadDate: '2024-04-15T10:30:00',
  },
  {
    id: '2',
    patientId: '123',
    fileName: 'X-Ray_Chest.jpg',
    fileType: 'Image',
    fileUrl: '#',
    uploadDate: '2024-03-22T14:15:00',
  },
  {
    id: '3',
    patientId: '123',
    fileName: 'Medical_History.pdf',
    fileType: 'PDF',
    fileUrl: '#',
    uploadDate: '2024-02-10T09:45:00',
  },
];

const HealthRecords = () => {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  
  useEffect(() => {
    // In a real app, this would call an API to get the user's health records
    // For now, using mock data
    setRecords(mockRecords);
    setLoading(false);
  }, [user]);
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }
    
    setUploading(true);
    
    // In a real app, this would call an API to upload the file to S3
    // For demonstration, we'll simulate a successful upload
    setTimeout(() => {
      const newRecord = {
        id: `${records.length + 1}`,
        patientId: user?.id,
        fileName: selectedFile.name,
        fileType: selectedFile.type.split('/')[1].toUpperCase(),
        fileUrl: '#',
        uploadDate: new Date().toISOString(),
      };
      
      setRecords([newRecord, ...records]);
      setSelectedFile(null);
      setUploading(false);
      toast.success('Health record uploaded successfully');
    }, 2000);
  };
  
  const handleDelete = (recordId) => {
    // In a real app, this would call an API to delete the record
    const updatedRecords = records.filter(record => record.id !== recordId);
    setRecords(updatedRecords);
    toast.success('Record deleted successfully');
  };
  
  const fileSize = (size) => {
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Health Records</h1>
      
      <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Upload New Record</h2>
        
        <form onSubmit={handleUpload} className="space-y-4">
          <div 
            className={`border-2 border-dashed rounded-md p-6 ${
              dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
            } ${
              selectedFile ? 'bg-gray-50' : ''
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {!selectedFile ? (
              <div className="text-center">
                <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Drag and drop your file here, or{' '}
                  <label htmlFor="file-upload" className="font-medium text-primary hover:text-primary/80 cursor-pointer">
                    browse
                    <input 
                      id="file-upload" 
                      name="file" 
                      type="file" 
                      className="sr-only" 
                      onChange={handleFileChange} 
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    />
                  </label>
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  PDF, JPG, PNG, DOC up to 10MB
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <File className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{selectedFile.name}</p>
                    <p className="text-sm text-gray-500">{fileSize(selectedFile.size)}</p>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="ml-4 bg-white rounded-full p-1 hover:bg-gray-100"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={uploading || !selectedFile}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                <span className="flex items-center">
                  <FileUp className="h-4 w-4 mr-2" />
                  Upload Record
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6 bg-gray-50 border-b">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">
              Your Records
            </h2>
            <span className="ml-2 bg-gray-100 text-gray-700 py-1 px-2 rounded-full text-xs font-medium">
              {records.length}
            </span>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <RecordTable 
            records={records} 
            onDelete={handleDelete} 
          />
        )}
      </div>
    </div>
  );
};

export default HealthRecords;
