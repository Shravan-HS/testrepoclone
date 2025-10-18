
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { DashboardData } from '../types';
import { UsersIcon, ChartBarIcon, ArrowTrendingUpIcon } from './Icons';

interface DashboardProps {
  data: DashboardData;
  onViewStudents: () => void;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; }> = ({ title, value, icon }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md flex items-start space-x-4">
    <div className="bg-indigo-100 dark:bg-indigo-500/20 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
      <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
    </div>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ data, onViewStudents }) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white">Dashboard</h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">Welcome back! Here's an overview of your student data.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Students" value={data.totalStudents} icon={<UsersIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400"/>} />
        <StatCard title="Average Grade" value={data.averageGrade.toFixed(1)} icon={<ChartBarIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400"/>} />
        <StatCard title="New (Last 30 Days)" value={data.recentEnrollments} icon={<ArrowTrendingUpIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400"/>} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md h-[400px]">
          <h2 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Grade Distribution</h2>
          {data.gradeDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.gradeDistribution} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                <XAxis dataKey="name" tick={{ fill: 'currentColor' }} className="text-xs" />
                <YAxis allowDecimals={false} tick={{ fill: 'currentColor' }} className="text-xs" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        borderColor: 'rgba(128, 128, 128, 0.5)',
                        color: '#fff',
                    }}
                />
                <Legend />
                <Bar dataKey="students" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500">No student data to display.</div>
          )}
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Quick Actions</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Get started with common tasks.</p>
            <div className="space-y-3">
                <button onClick={onViewStudents} className="w-full text-left p-3 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors">
                    <p className="font-semibold text-indigo-600 dark:text-indigo-400">View All Students</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Browse, search, and manage the student list.</p>
                </button>
                 <button className="w-full text-left p-3 bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors">
                    <p className="font-semibold text-indigo-600 dark:text-indigo-400">Generate Report (Coming Soon)</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Create a summary report of student performance.</p>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
