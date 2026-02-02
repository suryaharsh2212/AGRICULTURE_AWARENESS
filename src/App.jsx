import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Vlogs from './pages/Vlogs';
import VlogDetail from './pages/VlogDetail';
import Awareness from './pages/Awareness';
import Marketplace from './pages/Marketplace';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
