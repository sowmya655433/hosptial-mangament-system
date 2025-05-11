import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import AppointmentCalendar from '../components/dashboard/AppointmentCalendar';
import RecentPatients from '../components/dashboard/RecentPatients';
import DepartmentStats from '../components/dashboard/DepartmentStats';
import { Users, Calendar, UserRound, DollarSign, Bed } from 'lucide-react';
import { dashboardStats } from '../data/mockData';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Patients"
          value={dashboardStats.totalPatients}
          icon={<Users size={24} />}
          change={{ value: 12, type: 'increase' }}
        />
        <StatCard
          title="Total Doctors"
          value={dashboardStats.totalDoctors}
          icon={<UserRound size={24} />}
        />
        <StatCard
          title="Today's Appointments"
          value={dashboardStats.todayAppointments}
          icon={<Calendar size={24} />}
          change={{ value: 8, type: 'increase' }}
        />
        <StatCard
          title="Bed Occupancy"
          value={dashboardStats.occupancyRate}
          format="percentage"
          icon={<Bed size={24} />}
          change={{ value: 5, type: 'decrease' }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Revenue</h2>
            <div className="h-[250px] flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">[Revenue Chart Placeholder]</p>
            </div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Today's Revenue</p>
                <p className="text-xl font-semibold text-gray-800">${dashboardStats.revenue.today.toLocaleString()}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Weekly Revenue</p>
                <p className="text-xl font-semibold text-gray-800">${dashboardStats.revenue.weekly.toLocaleString()}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Monthly Revenue</p>
                <p className="text-xl font-semibold text-gray-800">${dashboardStats.revenue.monthly.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <AppointmentCalendar />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentPatients />
        <DepartmentStats />
      </div>
    </div>
  );
};

export default Dashboard;