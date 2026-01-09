import { FileText, LogOut, TrendingUp, Sparkles, Brain, Briefcase, Palette, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingFlow } from './OnboardingFlow';

export function ClientPortal() {
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [startStep, setStartStep] = useState<'general' | 'brandVoice'>('general');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (showOnboarding) {
    return <OnboardingFlow onClose={() => setShowOnboarding(false)} initialStep={startStep} />;
  }

  return (
    <div className="min-h-screen bg-[#FCFCFD] relative overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-gray-200/40 via-transparent to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-gray-100/30 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 border-b border-gray-200/50 backdrop-blur-xl bg-white/40">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute inset-0 bg-black/5 blur-xl rounded-full"></div>
                <TrendingUp className="w-6 h-6 relative z-10" />
              </div>
              <span className="text-xl tracking-[-0.02em]">Steady Pulse AI</span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 backdrop-blur-xl bg-white/50 border border-white/40 rounded-full px-5 py-2 hover:bg-white/70 transition-all hover:shadow-lg text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Header - Centered */}
        <div className="text-center mb-12">
          <div className="inline-block animate-fadeIn">
            <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] mb-4 animate-slideDown">
              Welcome, Client
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 animate-slideUp" style={{ animationDelay: '0.2s' }}>
              Your LinkedIn growth command center
            </p>
          </div>
        </div>

        {/* Workflow Chart */}
        <div className="mb-16 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-8 shadow-lg shadow-black/5">
            <h3 className="text-center text-sm text-gray-500 mb-6 tracking-wider uppercase">Your Onboarding Journey</h3>
            
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {/* Step 1 */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center mb-3">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-sm mb-1">Step 1</div>
                  <div className="text-xs text-gray-500">Business Fit</div>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mx-2" />

              {/* Step 2 */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center mb-3">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-sm mb-1">Step 2</div>
                  <div className="text-xs text-gray-500">Brand DNA</div>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mx-2" />

              {/* Step 3 */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-500 to-gray-700 flex items-center justify-center mb-3">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-sm mb-1">Step 3</div>
                  <div className="text-xs text-gray-500">Agency Analysis</div>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0 mx-2" />

              {/* Step 4 */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-sm mb-1">Step 4</div>
                  <div className="text-xs text-gray-500">Results in 24-48 hrs</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Left Brain / Right Brain Section */}
        <div className="text-center mb-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <div className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/60 border border-white/40 rounded-full px-6 py-2 mb-4">
            <Brain className="w-4 h-4" />
            <span className="text-sm">Complete Both Forms to Unlock Your Strategy</span>
          </div>
        </div>

        {/* Form Buttons - Left Brain / Right Brain */}
        <div className="grid md:grid-cols-2 gap-8 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          {/* Left Brain - Business Fit */}
          <button
            onClick={() => {
              setStartStep('general');
              setShowOnboarding(true);
            }}
            className="group relative overflow-hidden backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-10 shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-black/10 transition-all hover:scale-105 text-left"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-gray-200/30 via-gray-300/20 to-gray-200/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Left Brain Badge */}
            <div className="absolute top-6 right-6">
              <div className="backdrop-blur-xl bg-black/90 text-white text-xs px-3 py-1 rounded-full">
                Left Brain
              </div>
            </div>

            <div className="relative">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-800 to-black mb-6">
                <Briefcase className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-4xl tracking-[-0.02em] mb-4">The Business Fit</h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                The logical foundation. Company details, target market, revenue goals, and strategic positioning.
              </p>

              <div className="space-y-2 mb-6 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                  <span>Company basics & commercials</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                  <span>ICP & targeting strategy</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                  <span>Logistics & integrations</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-black">
                <span>Start Business Form</span>
                <span className="group-hover:translate-x-2 transition-transform text-xl">→</span>
              </div>
            </div>
          </button>

          {/* Right Brain - Brand DNA */}
          <button
            onClick={() => {
              setStartStep('brandVoice');
              setShowOnboarding(true);
            }}
            className="group relative overflow-hidden backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-10 shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-black/10 transition-all hover:scale-105 text-left"
          >
            <div className="absolute -inset-2 bg-gradient-to-l from-gray-200/30 via-gray-300/20 to-gray-200/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Right Brain Badge */}
            <div className="absolute top-6 right-6">
              <div className="backdrop-blur-xl bg-gray-700 text-white text-xs px-3 py-1 rounded-full">
                Right Brain
              </div>
            </div>

            <div className="relative">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-800 mb-6">
                <Palette className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-4xl tracking-[-0.02em] mb-4">The Brand DNA</h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                The creative essence. Your voice, personality, visual identity, and storytelling style.
              </p>

              <div className="space-y-2 mb-6 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-700"></div>
                  <span>Voice, tone & personality</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-700"></div>
                  <span>Visual identity & preferences</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-700"></div>
                  <span>Content style & inspirations</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-black">
                <span>Start Brand Form</span>
                <span className="group-hover:translate-x-2 transition-transform text-xl">→</span>
              </div>
            </div>
          </button>
        </div>

        {/* Optional: Progress Indicator */}
        <div className="text-center mt-12 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          <p className="text-sm text-gray-500">
            Complete both forms to receive your custom LinkedIn growth strategy
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.8s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}