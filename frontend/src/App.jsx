import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import StudentForm from './pages/StudentForm'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protected admin routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/students/new" element={
            <ProtectedRoute>
              <StudentForm />
            </ProtectedRoute>
          } />
          <Route path="/admin/students/edit/:id" element={
            <ProtectedRoute>
              <StudentForm />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
