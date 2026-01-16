import { Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { AuroraHero } from './components/AuroraHero';
import { PainSection } from './components/PainSection';
import { GlassFeatures } from './components/GlassFeatures';
import AboutUs from './components/AboutUs';
import { FloatingWorkflow } from './components/FloatingWorkflow';
import { ImmersiveCTA } from './components/ImmersiveCTA';
import { AuroraFooter } from './components/AuroraFooter';
import { ClientLogin } from './components/ClientLogin';
import { AdminLogin } from './components/AdminLogin';
import { ClientPortal } from './components/ClientPortal';
import { AdminPortal } from './components/AdminPortal';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { FAQ } from './components/FAQ';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Pricing } from './components/Pricing';
import { FeaturesPage } from './components/FeaturesPage';
import { SecurityPage } from './components/SecurityPage';
import { ChangelogPage } from './components/ChangelogPage';
import { DocumentationPage } from './components/DocumentationPage';
import { HelpCenterPage } from './components/HelpCenterPage';
import { CommunityPage } from './components/CommunityPage';
import { SupportPage } from './components/SupportPage';
import { ContactUsPage } from './components/ContactUsPage';

function Home() {
  return (
    <div className="min-h-screen bg-[#FCFCFD] overflow-x-hidden">
      <Navigation />
      <AuroraHero />
      <PainSection />
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
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/changelog" element={<ChangelogPage />} />
      <Route path="/documentation" element={<DocumentationPage />} />
      <Route path="/help-center" element={<HelpCenterPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/contact-us" element={<ContactUsPage />} />

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
