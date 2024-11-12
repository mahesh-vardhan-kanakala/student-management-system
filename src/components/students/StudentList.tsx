import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { deleteStudent, setFilters, setSort } from '../../store/slices/studentsSlice';
import { Student } from '../../types';
import { Edit, Trash2, ChevronUp, ChevronDown, Search } from 'lucide-react';
import StudentForm from './StudentForm';

const StudentList: React.FC = () => {
  const dispatch = useDispatch();
  const { students, filters, sort } = useSelector((state: RootState) => state.students);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSort = (field: keyof Student) => {
    dispatch(
      setSort({
        field,
        direction: sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc',
      })
    );
  };

  const filteredStudents = students
    .filter((student) => {
      const searchLower = filters.search.toLowerCase();
      return (
        (student.firstName.toLowerCase().includes(searchLower) ||
          student.lastName.toLowerCase().includes(searchLower) ||
          student.email.toLowerCase().includes(searchLower)) &&
        (filters.course === '' || student.course === filters.course) &&
        (filters.status === '' || student.status === filters.status)
      );
    })
    .sort((a, b) => {
      const field = sort.field;
      const direction = sort.direction === 'asc' ? 1 : -1;
      return a[field] > b[field] ? direction : -direction;
    });

  const courses = Array.from(new Set(students.map((s) => s.course)));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex-1 min-w-[200px] max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search students..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
            value={filters.search}
            onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
          />
        </div>

        <div className="flex gap-4">
          <select
            value={filters.course}
            onChange={(e) => dispatch(setFilters({ course: e.target.value }))}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">All Courses</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => dispatch(setFilters({ status: e.target.value }))}
            className="border border-gray-300 rounded-md px-3 py-2"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Student
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Name', 'Email', 'Course', 'Grade', 'Status', 'Actions'].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() =>
                    header !== 'Actions' &&
                    handleSort(header.toLowerCase() as keyof Student)
                  }
                >
                  <div className="flex items-center space-x-1">
                    <span>{header}</span>
                    {header !== 'Actions' && (
                      sort.field === header.toLowerCase() ? (
                        sort.direction === 'asc' ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )
                      ) : null
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {student.firstName} {student.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.course}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.grade}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedStudent(student);
                      setShowForm(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => dispatch(deleteStudent(student.id))}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                {selectedStudent ? 'Edit Student' : 'Add New Student'}
              </h3>
              <StudentForm
                student={selectedStudent || undefined}
                onClose={() => {
                  setShowForm(false);
                  setSelectedStudent(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;