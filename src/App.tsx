import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Collections } from './pages/Collections';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { AppProvider, useAppContext } from './context/AppContext';
import { BootLoader } from './components/BootLoader';
import { Login } from './pages/Login';
import { ClientProfile } from './pages/ClientProfile';
import { Checkout } from './pages/Checkout';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminProfile } from './pages/AdminProfile';
import { RequireRole } from './components/RouteGuards';

function AppShell() {
  const { isReady } = useAppContext();

  return (
    <>
      {!isReady ? <BootLoader /> : null}
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Login />} />
          <Route
            path="/profile"
            element={
              <RequireRole role="client">
                <ClientProfile />
              </RequireRole>
            }
          />
          <Route
            path="/checkout"
            element={
              <RequireRole role="client">
                <Checkout />
              </RequireRole>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireRole role="admin">
                <AdminDashboard />
              </RequireRole>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <RequireRole role="admin">
                <AdminProfile />
              </RequireRole>
            }
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AppProvider>
  );
}
