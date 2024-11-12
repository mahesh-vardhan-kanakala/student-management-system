import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import Dashboard from './components/dashboard/Dashboard';
import StudentList from './components/students/StudentList';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="students" element={<StudentList />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;