
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { StudentList } from './components/StudentList';
import { useStudents } from './hooks/useStudents';
import type { Student, View } from './types';
import { StudentFormModal } from './components/StudentFormModal';
import { ConfirmationModal } from './components/ConfirmationModal';

const App: React.FC = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [deletingStudentId, setDeletingStudentId] = useState<string | null>(null);

  const handleAddStudentClick = () => {
    setEditingStudent(null);
    setIsFormModalOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setIsFormModalOpen(true);
  };

  const handleDeleteStudent = (id: string) => {
    setDeletingStudentId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (deletingStudentId) {
      deleteStudent(deletingStudentId);
    }
    setIsDeleteModalOpen(false);
    setDeletingStudentId(null);
  };

  const handleSaveStudent = (student: Student) => {
    if (editingStudent) {
      updateStudent(student);
    } else {
      addStudent(student);
    }
    setIsFormModalOpen(false);
    setEditingStudent(null);
  };

  const dashboardData = useMemo(() => {
    const gradeCounts: { [key: number]: number } = students.reduce((acc, student) => {
      acc[student.grade] = (acc[student.grade] || 0) + 1;
      return acc;
    }, {} as { [key: number]: number });

    const chartData = Object.entries(gradeCounts)
      .map(([grade, count]) => ({
        name: `Grade ${grade}`,
        students: count,
      }))
      .sort((a, b) => parseInt(a.name.split(' ')[1]) - parseInt(b.name.split(' ')[1]));
      
    const recentEnrollments = students.filter(s => {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return new Date(s.enrollmentDate) > thirtyDaysAgo;
    }).length;

    return {
      totalStudents: students.length,
      averageGrade: students.length > 0 ? (students.reduce((acc, s) => acc + s.grade, 0) / students.length) : 0,
      recentEnrollments,
      gradeDistribution: chartData,
    };
  }, [students]);

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200 font-sans">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main className="p-4 sm:p-6 lg:p-8">
        {currentView === 'dashboard' ? (
          <Dashboard data={dashboardData} onViewStudents={() => setCurrentView('list')} />
        ) : (
          <StudentList
            students={students}
            onAddStudent={handleAddStudentClick}
            onEditStudent={handleEditStudent}
            onDeleteStudent={handleDeleteStudent}
          />
        )}
      </main>

      {isFormModalOpen && (
        <StudentFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          onSave={handleSaveStudent}
          student={editingStudent}
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Student"
          message="Are you sure you want to delete this student? This action cannot be undone."
        />
      )}
    </div>
  );
};

export default App;
