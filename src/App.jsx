import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Vlogs from './pages/Vlogs';
import VlogDetail from './pages/VlogDetail';
import Awareness from './pages/Awareness';
import Marketplace from './pages/Marketplace';
import Dashboard from './pages/Dashboard';

// Admin imports
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductManagement from './pages/admin/ProductManagement';
import VlogManagement from './pages/admin/VlogManagement';
import ArticleManagement from './pages/admin/ArticleManagement';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="vlogs" element={<VlogManagement />} />
            <Route path="articles" element={<ArticleManagement />} />
          </Route>

          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/vlogs" element={<Vlogs />} />
                    <Route path="/vlogs/:id" element={<VlogDetail />} />
                    <Route path="/awareness" element={<Awareness />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
