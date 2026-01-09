import React from 'react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Terms of Service</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            <strong>Last Updated:</strong> 29th July 2024
          </p>
          <div className="mt-8 text-base leading-7 text-gray-700 space-y-6">
            <p>
              These Terms of Service ("Terms") govern your access to and use of the Steady Pulse AI website and services ("Services"). By accessing or using the Services, you agree to be bound by these Terms.
            </p>
            <h3 className="text-xl font-bold tracking-tight text-gray-900">1. Use of Services</h3>
            <p>
              You agree to use the Services only for lawful purposes and in accordance with these Terms. You are responsible for all activity that occurs under your account.
            </p>
            <h3 className="text-xl font-bold tracking-tight text-gray-900">2. Intellectual Property</h3>
            <p>
              The Services and their original content, features, and functionality are and will remain the exclusive property of Steady Pulse AI and its licensors.
            </p>
            <h3 className="text-xl font-bold tracking-tight text-gray-900">3. Termination</h3>
            <p>
              We may terminate or suspend your access to the Services at any time, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
            </p>
            <h3 className="text-xl font-bold tracking-tight text-gray-900">4. Limitation of Liability</h3>
            <p>
              In no event shall Steady Pulse AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Services.
            </p>
            <h3 className="text-xl font-bold tracking-tight text-gray-900">5. Governing Law</h3>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>
            <p className="mt-10 text-sm text-gray-500">
              <strong>Disclaimer:</strong> This is a sample Terms of Service and is not legal advice. You should consult with a legal professional to ensure that your Terms of Service are compliant with all applicable laws and regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
