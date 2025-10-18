
import React, { useState, useMemo } from 'react';
import type { Student } from '../types';
import { PlusIcon, SearchIcon } from './Icons';

interface StudentListProps {
  students: Student[];
  onAddStudent: () => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (id: string) => void;
}

export const StudentList: React.FC<StudentListProps> = ({
  students,
  onAddStudent,
  onEditStudent,
  onDeleteStudent,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('');

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const nameMatch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const gradeMatch = filterGrade ? student.grade === parseInt(filterGrade) : true;
      return nameMatch && gradeMatch;
    });
  }, [students, searchTerm, filterGrade]);

  const grades = useMemo(() => [...new Set(students.map(s => s.grade))].sort((a,b) => a-b), [students]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Students</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Manage student records and information.</p>
          </div>
          <button
            onClick={onAddStudent}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <PlusIcon className="h-5 w-5" />
            Add Student
          </button>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
          <select
            value={filterGrade}
            onChange={e => setFilterGrade(e.target.value)}
            className="border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          >
            <option value="">All Grades</option>
            {grades.map(grade => (
                <option key={grade} value={grade}>Grade {grade}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-300">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3 hidden sm:table-cell">Grade</th>
              <th scope="col" className="px-6 py-3 hidden md:table-cell">Enrollment Date</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <tr key={student.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 dark:text-white">{student.name}</div>
                    <div className="text-xs text-slate-500">{student.email}</div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">{student.grade}</td>
                  <td className="px-6 py-4 hidden md:table-cell">{new Date(student.enrollmentDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                        <button onClick={() => onEditStudent(student)} className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">Edit</button>
                        <span className="text-slate-300 dark:text-slate-600">|</span>
                        <button onClick={() => onDeleteStudent(student.id)} className="font-medium text-red-600 dark:text-red-400 hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-8 text-slate-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
