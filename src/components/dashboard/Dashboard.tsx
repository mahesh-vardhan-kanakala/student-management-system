import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, GraduationCap, UserCheck, UserX } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { students } = useSelector((state: RootState) => state.students);

  const totalStudents = students.length;
  const activeStudents = students.filter((s) => s.status === 'active').length;
  const inactiveStudents = totalStudents - activeStudents;
  const averageGrade = students.reduce((acc, s) => acc + s.grade, 0) / totalStudents || 0;

  const courseData = students.reduce((acc: { [key: string]: number }, student) => {
    acc[student.course] = (acc[student.course] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(courseData).map(([course, count]) => ({
    course,
    students: count,
  }));

  const stats = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Average Grade',
      value: `${averageGrade.toFixed(1)}%`,
      icon: GraduationCap,
      color: 'bg-green-500',
    },
    {
      title: 'Active Students',
      value: activeStudents,
      icon: UserCheck,
      color: 'bg-indigo-500',
    },
    {
      title: 'Inactive Students',
      value: inactiveStudents,
      icon: UserX,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-md ${stat.color}`}>
                    {React.createElement(stat.icon, {
                      className: 'h-6 w-6 text-white',
                    })}
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.title}
                    </dt>
                    <dd className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Students per Course
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;