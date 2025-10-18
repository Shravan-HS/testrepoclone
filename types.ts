
export interface Student {
  id: string;
  name: string;
  grade: number;
  email: string;
  enrollmentDate: string; // ISO string format
  bio?: string;
}

export type View = 'dashboard' | 'list';

export interface DashboardData {
  totalStudents: number;
  averageGrade: number;
  recentEnrollments: number;
  gradeDistribution: { name: string; students: number }[];
}
