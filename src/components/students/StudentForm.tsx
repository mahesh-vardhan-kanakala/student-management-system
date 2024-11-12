import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addStudent, updateStudent } from '../../store/slices/studentsSlice';
import { Student } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface StudentFormProps {
  student?: Student;
  onClose: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ student, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Partial<Student>>(
    student || {
      firstName: '',
      lastName: '',
      email: '',
      course: '',
      grade: 0,
      status: 'active',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (student) {
      dispatch(updateStudent({ ...student, ...formData } as Student));
    } else {
      dispatch(
        addStudent({
          ...formData,
          id: uuidv4(),
          enrollmentDate: new Date().toISOString(),
        } as Student)
      );
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700">
            Course
          </label>
          <input
            type="text"
            id="course"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
            Grade
          </label>
          <input
            type="number"
            id="grade"
            min="0"
            max="100"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.grade}
            onChange={(e) => setFormData({ ...formData, grade: Number(e.target.value) })}
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          {student ? 'Update' : 'Add'} Student
        </button>
      </div>
    </form>
  );
};

export default StudentForm;