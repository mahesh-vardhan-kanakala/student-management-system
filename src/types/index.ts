export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  course: string;
  enrollmentDate: string;
  grade: number;
  status: 'active' | 'inactive';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface StudentsState {
  students: Student[];
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    course: string;
    status: string;
  };
  sort: {
    field: keyof Student;
    direction: 'asc' | 'desc';
  };
}