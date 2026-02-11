import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
// Import pages as they are created
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import SectionPage from './pages/SectionPage';
import ResumePage from './pages/ResumePage';

import ContactPage from './pages/ContactPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/section/resume" element={<ResumePage />} />
          <Route path="/section/contact" element={<ContactPage />} />
          <Route path="/section/:id" element={<SectionPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
