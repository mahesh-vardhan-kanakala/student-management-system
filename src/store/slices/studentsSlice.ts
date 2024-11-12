import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student, StudentsState } from '../../types';

const initialState: StudentsState = {
  students: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    course: '',
    status: '',
  },
  sort: {
    field: 'lastName',
    direction: 'asc',
  },
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<Student[]>) => {
      state.students = action.payload;
    },
    addStudent: (state, action: PayloadAction<Student>) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action: PayloadAction<Student>) => {
      const index = state.students.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    deleteStudent: (state, action: PayloadAction<string>) => {
      state.students = state.students.filter((s) => s.id !== action.payload);
    },
    setFilters: (state, action: PayloadAction<Partial<StudentsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setSort: (state, action: PayloadAction<StudentsState['sort']>) => {
      state.sort = action.payload;
    },
  },
});

export const {
  setStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  setFilters,
  setSort,
} = studentsSlice.actions;
export default studentsSlice.reducer;