
import { useState } from 'react';
import type { Student } from '../types';

const getInitialStudents = (): Student[] => {
  const today = new Date();
  return [
    { id: '1', name: 'Alice Johnson', grade: 10, email: 'alice.j@example.com', enrollmentDate: new Date(today.getFullYear(), 0, 15).toISOString(), bio: 'Alice is a diligent student with a passion for literature and coding.' },
    { id: '2', name: 'Bob Williams', grade: 11, email: 'bob.w@example.com', enrollmentDate: new Date(today.getFullYear(), 1, 20).toISOString(), bio: 'Bob excels in mathematics and is the captain of the school chess team.' },
    { id: '3', name: 'Charlie Brown', grade: 9, email: 'charlie.b@example.com', enrollmentDate: new Date(today.getFullYear() - 1, 8, 1).toISOString(), bio: 'Charlie is a creative artist who enjoys painting and sculpture.' },
    { id: '4', name: 'Diana Miller', grade: 12, email: 'diana.m@example.com', enrollmentDate: new Date(today.getFullYear(), 2, 10).toISOString(), bio: 'Diana is a natural leader, serving as student body president and volunteering in the community.' },
    { id: '5', name: 'Ethan Garcia', grade: 10, email: 'ethan.g@example.com', enrollmentDate: new Date(today.getFullYear() - 2, 9, 5).toISOString(), bio: 'Ethan is a talented musician who plays both the piano and violin.' },
    { id: '6', name: 'Fiona Davis', grade: 11, email: 'fiona.d@example.com', enrollmentDate: new Date(today.getFullYear(), 3, 22).toISOString(), bio: 'Fiona is a star athlete on the track and field team, specializing in long-distance running.' },
  ];
};

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>(getInitialStudents);

  const addStudent = (student: Omit<Student, 'id' | 'enrollmentDate'>) => {
    const newStudent: Student = {
      ...student,
      id: new Date().getTime().toString(),
      enrollmentDate: new Date().toISOString(),
    };
    setStudents(prev => [newStudent, ...prev]);
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  return { students, addStudent, updateStudent, deleteStudent };
};
