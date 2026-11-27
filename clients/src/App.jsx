
import './App.css'
import { Routes, Route, Navigate, Outlet} from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import ResetPassword from './pages/ResetPassword'
import DoctorProfile from './pages/DoctorProfile'
import ForgotPassword from './pages/ForgotPassword'
import HomePage from './pages/Home'
import AdminDashboard from './pages/Dashboards/AdminDashboard'
import PatientDashboard from './pages/Dashboards/PatientDashboard'
import DoctorDashboard from './pages/Dashboards/DoctorDashboard'
import { useAuth } from './context/AuthContext'
import ProtectedRoute  from "./components/ProtectedRoute"
import DashboardLayout from './pages/Dashboards/layout/DashboardLayout.jsx'

function DashboardRedirect() {
  const {user} = useAuth();
  return <Navigate to={`/${user.role}`} replace />
}

function PublicLayout() {
  return (
    <>
    <Header />
    <main className="container">
      <Outlet />
      <Footer />
    </main>

    </>
  );
}

function App() {

return (
    <>
      <Routes>
        {/*Wrap public pages with the shared Header and Footer components */}
        <Route element={<PublicLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />

          {/* Requires sign-in, then redirects the user to their role dashboard */}
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<DashboardRedirect />} />
          </Route>
          {/* Restricts payment returns and receipts to signed-in patients. */}
          <Route element={<ProtectedRoute roles={['patient']} />}>
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>

        {/* Restricts all patient dashboard pages to users with the patient role. */}
        <Route element={<ProtectedRoute roles={['patient']} />}>
          <Route path='/patient' element={<DashboardLayout role='patient' />}>

          </Route>

        </Route>

        {/* Restricts all doctor dashboard pages to users with the doctor role. */}
        <Route element={<ProtectedRoute roles={['doctor']} />}>
          <Route path='/doctor' element={<DashboardLayout role='doctor' />}>

          </Route>

        </Route>

        {/* Restricts all admin dashboard pages to users with the admin role. */}
        <Route element={<ProtectedRoute roles={['admin']} />}>
          <Route path='/admin' element={<DashboardLayout role='admin' />}>
          </Route>

        </Route>
      </Routes>

    </>
  )
}

export default App
 