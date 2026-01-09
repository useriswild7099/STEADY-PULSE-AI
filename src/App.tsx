import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { AuroraHero } from './components/AuroraHero';
import { GlassFeatures } from './components/GlassFeatures';
import AboutUs from './components/AboutUs';
import { FloatingWorkflow } from './components/FloatingWorkflow';
import { ImmersiveCTA } from './components/ImmersiveCTA';
import { AuroraFooter } from './components/AuroraFooter';
import { ClientLogin } from './components/ClientLogin';
import { AdminLogin } from './components/AdminLogin';
import { ClientPortal } from './components/ClientPortal';
import { AdminPortal } from './components/AdminPortal';
import { LoadingScreen } from './components/LoadingScreen';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { FAQ } from './components/FAQ';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Pricing } from './components/Pricing';

function Home() {
  return (
    <div className="min-h-screen bg-[#FCFCFD] overflow-x-hidden">
      <Navigation />
      <AuroraHero />
      <GlassFeatures />
      <AboutUs />
      <FAQ />
      <FloatingWorkflow />
      <ImmersiveCTA />
      <AuroraFooter />
    </div>
  );
}

// Redirect wrapper if already logged in
function RedirectIfAuthenticated({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  if (token && userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user.role === 'admin') return <Navigate to="/admin-portal" replace />;
      return <Navigate to="/client-portal" replace />;
    } catch(e) { /* ignore */ }
  }
  return <>{children}</>;
}


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      {/* Public Pages */}
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />

      {/* Auth Routes */}
      <Route path="/client-login" element={
        <RedirectIfAuthenticated>
          <ClientLogin />
        </RedirectIfAuthenticated>
      } />
      
      <Route path="/admin-login" element={
        <RedirectIfAuthenticated>
          <AdminLogin />
        </RedirectIfAuthenticated>
      } />

      {/* Protected Routes */}
      <Route path="/client-portal" element={
        <ProtectedRoute role="client">
          <ClientPortal />
        </ProtectedRoute>
      } />
      
      <Route path="/admin-portal" element={
        <ProtectedRoute role="admin">
          <AdminPortal />
        </ProtectedRoute>
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}