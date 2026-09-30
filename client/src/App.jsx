import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdvisorDashboard from './pages/Advisor/AdvisorDashboard';
import StudentDashboard from './pages/Student/StudentDashboard';

function App() {
  // In a real app, this state would be set after a successful login fetch to your API
  // and checked against the JWT token.
  const userRole = localStorage.getItem('role'); // 'admin', 'advisor', or 'student'

  return (
      <Router>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
              path="/admin"
              element={userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
          />
          <Route
              path="/advisor"
              element={userRole === 'advisor' ? <AdvisorDashboard /> : <Navigate to="/login" />}
          />
          <Route
              path="/student"
              element={userRole === 'student' ? <StudentDashboard /> : <Navigate to="/login" />}
          />

          {/* Default route redirects to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
  );
}

export default App;
