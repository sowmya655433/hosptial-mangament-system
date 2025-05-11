import React, { useState } from 'react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { appointments } from '../data/mockData';
import { Search, Plus, Calendar, Clock, Filter } from 'lucide-react';

const Appointments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !statusFilter || appointment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'primary';
      case 'Completed': return 'success';
      case 'Cancelled': return 'danger';
      case 'No-show': return 'warning';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search appointments..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-500" />
            <div className="flex space-x-1">
              {['Scheduled', 'Completed', 'Cancelled', 'No-show'].map((status) => (
                <button
                  key={status}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                    statusFilter === status 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setStatusFilter(statusFilter === status ? null : status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <Button 
          variant="primary"
          icon={<Plus size={16} />}
        >
          New Appointment
        </Button>
      </div>
      
      {/* Calendar View - Just a placeholder for now */}
      <Card className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Calendar View</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">Day</Button>
            <Button variant="primary" size="sm">Week</Button>
            <Button variant="outline" size="sm">Month</Button>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center h-60">
          <p className="text-gray-500">Calendar View Placeholder</p>
        </div>
      </Card>
      
      {/* Appointments list */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient / Doctor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purpose
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{appointment.patientName}</div>
                    <div className="text-sm text-gray-500">{appointment.doctorName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar size={14} className="mr-1 text-gray-400" />
                      {new Date(appointment.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock size={14} className="mr-1 text-gray-400" />
                      {appointment.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant="info"
                    >
                      {appointment.department}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{appointment.purpose}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={getStatusBadgeVariant(appointment.status)}
                    >
                      {appointment.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button size="sm" variant="outline">Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredAppointments.length === 0 && (
          <div className="px-6 py-4 text-center text-gray-500">
            No appointments found matching your criteria.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAppointments.length}</span> of <span className="font-medium">{appointments.length}</span> appointments
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default Appointments;