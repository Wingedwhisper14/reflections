import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthProvider } from './contexts/AuthContext';
import AuthGuard from './components/AuthGuard';

// Import pages
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import SectionPage from './pages/SectionPage';
import ResumePage from './pages/ResumePage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/section/resume" element={<ResumePage />} />
            <Route path="/section/contact" element={<ContactPage />} />
            <Route path="/section/:id" element={<SectionPage />} />
            <Route path="/resume" element={<ResumePage />} />

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <AuthGuard>
                  <AdminDashboard />
                </AuthGuard>
              }
            />
            {/* Redirect old dashboard route to admin */}
            <Route path="/admin/dashboard" element={<Navigate to="/admin" replace />} />

          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
