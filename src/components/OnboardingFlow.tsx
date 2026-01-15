import { useState } from 'react';
import BusinessForm from './forms/BusinessForm';
import VoiceForm from './forms/VoiceForm';

import { api } from '../lib/api';

interface OnboardingFlowProps {
  onClose: () => void;
  initialStep?: 'general' | 'brandVoice';
}

type FormStep = 'general' | 'brandVoice' | 'success';

export function OnboardingFlow({ onClose, initialStep = 'general' }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState<FormStep>(initialStep);
  const [generalData, setGeneralData] = useState<any>(null);

  // Helper to save data to backend
  const saveToBackend = async (data: { generalData?: any, brandData?: any }) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        console.log('Saving onboarding data to backend...', data);
        await api.post('/client/onboarding', data, token);
        console.log('Successfully saved onboarding data.');
      } else {
        console.warn('No user token found to save onboarding data');
      }
    } catch (e) {
      console.error('Failed to save onboarding data', e);
    }
  };

  const handleGeneralComplete = async (data: any) => {
    setGeneralData(data);
    
    // Save Business Form data immediately
    await saveToBackend({ 
      generalData: data,
      brandData: {} // Empty but exists so structure is preserved
    });
    
    // Move to Brand Voice form
    setCurrentStep('brandVoice');
  };

  const handleBrandVoiceComplete = async (voiceData: any) => {
    // Save Voice Form data (will merge with existing generalData on backend)
    await saveToBackend({ 
      generalData: generalData || {}, // Use captured data or empty if starting from brandVoice
      brandData: {
        ...voiceData,
        completedAt: new Date().toISOString()
      }
    });

    setCurrentStep('success');
  };

  const handleBackToGeneral = () => {
    setCurrentStep('general');
  };

  if (currentStep === 'success') {
    return (
      <div className="min-h-screen bg-[#FCFCFD] relative overflow-hidden flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-gray-200/40 via-transparent to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-gray-100/30 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <div className="backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl p-12 shadow-2xl shadow-black/10 animate-fadeIn">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-black rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-4xl md:text-5xl tracking-[-0.03em] mb-4">
              Successfully Submitted
            </h2>

            <p className="text-xl text-gray-600 mb-8">
              Your strategy and voice DNA have been compiled and sent to your portal.
            </p>

            <button
              onClick={onClose}
              className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-xl"
            >
              Return to Dashboard
            </button>
          </div>
        </div>

        {/* Custom Animations */}
        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out forwards;
          }
        `}</style>
      </div>
    );
  }

  if (currentStep === 'brandVoice') {
    return (
      <VoiceForm
        onComplete={handleBrandVoiceComplete}
        onBack={handleBackToGeneral}
      />
    );
  }

  return (
    <BusinessForm
      onComplete={handleGeneralComplete}
      onBack={onClose}
    />
  );
}