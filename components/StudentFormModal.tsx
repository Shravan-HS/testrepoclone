
import React, { useState, useEffect, useCallback } from 'react';
import type { Student } from '../types';
import { generateStudentBio } from '../services/geminiService';
import { SparklesIcon } from './Icons';

interface StudentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: Student) => void;
  student: Student | null;
}

export const StudentFormModal: React.FC<StudentFormModalProps> = ({ isOpen, onClose, onSave, student }) => {
  const [formData, setFormData] = useState({ name: '', email: '', grade: '', bio: '' });
  const [bioKeywords, setBioKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        grade: String(student.grade),
        bio: student.bio || '',
      });
    } else {
      setFormData({ name: '', email: '', grade: '', bio: '' });
    }
  }, [student, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleGenerateBio = async () => {
    if (!bioKeywords) return;
    setIsGenerating(true);
    try {
      const generatedBio = await generateStudentBio(bioKeywords);
      setFormData(prev => ({ ...prev, bio: generatedBio }));
    } catch (error) {
        console.error("Bio generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const studentData: Student = {
      id: student?.id || '',
      name: formData.name,
      email: formData.email,
      grade: parseInt(formData.grade) || 0,
      bio: formData.bio,
      enrollmentDate: student?.enrollmentDate || new Date().toISOString()
    };
    onSave(studentData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{student ? 'Edit Student' : 'Add New Student'}</h2>
            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-slate-700" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-slate-700" />
                </div>
                <div>
                    <label htmlFor="grade" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Grade</label>
                    <input type="number" name="grade" id="grade" value={formData.grade} onChange={handleChange} required min="1" max="12" className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-slate-700" />
                </div>
              </div>
               <div>
                <label htmlFor="bioKeywords" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Bio Keywords</label>
                <div className="mt-1 flex gap-2">
                    <input 
                        type="text" 
                        name="bioKeywords" 
                        id="bioKeywords" 
                        value={bioKeywords}
                        onChange={e => setBioKeywords(e.target.value)}
                        placeholder="e.g., loves science, plays soccer"
                        className="flex-grow rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-slate-700" 
                    />
                    <button type="button" onClick={handleGenerateBio} disabled={isGenerating} className="flex-shrink-0 inline-flex items-center gap-2 px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300">
                      <SparklesIcon className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                      {isGenerating ? 'Generating...' : 'AI Bio'}
                    </button>
                </div>
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Student Bio</label>
                <textarea name="bio" id="bio" rows={4} value={formData.bio} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-white dark:bg-slate-700"></textarea>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-700/50 px-6 py-3 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 rounded-md shadow-sm hover:bg-slate-50 dark:hover:bg-slate-500">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};
