import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const TermsOfService: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-8 left-8 z-50 bg-white/80 backdrop-blur-md border border-gray-200 p-2 rounded-full hover:bg-white shadow-sm transition-all"
        aria-label="Back to Home"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>

      <div className="mx-auto max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
        <div className="border-b border-gray-100 pb-8 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Terms of Service</h1>
          <p className="mt-4 text-sm text-gray-500">
            Last Updated: January 10, 2026
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-gray-600">
          <p className="lead text-lg">
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Steady Pulse AI website and services (the "Service") operated by Steady Pulse AI ("us", "we", or "our").
          </p>

          <p>
            Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
          </p>
          
          <p className="font-semibold">
            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Accounts</h3>
          <p>
            When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
          <p>
            You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Purchases and Payment Terms</h3>
          <p>
            If you wish to purchase any product or service made available through the Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Representation:</strong> You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and (ii) the information you supply to us is true, correct, and complete.</li>
            <li><strong>Payment Processing:</strong> The Service employs the use of third-party services (Razorpay) for the purpose of facilitating payment and the completion of Purchases. By submitting your information, you grant us the right to provide the information to these third parties subject to our Privacy Policy.</li>
            <li><strong>Cancellation:</strong> We reserve the right to refuse or cancel your order at any time for reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order, or other reasons.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Subscriptions and Refunds</h3>
          <p>
            Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis (such as daily, weekly, monthly, or annually), depending on the type of Subscription plan you select when purchasing the Subscription.
          </p>
          <p>
            <strong>Refund Policy:</strong> Unless otherwise provided by law or by a particular Service offer, all purchases are final and non-refundable. Please review specific service agreements for the "7-Day Authority Sprint" or other trial offers for specific refund conditions if applicable.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Intellectual Property</h3>
          <p>
            The Service and its original content (excluding Content provided by users), features, and functionality are and will remain the exclusive property of Steady Pulse AI and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Steady Pulse AI.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Links To Other Web Sites</h3>
          <p>
            Our Service may contain links to third-party web sites or services that are not owned or controlled by Steady Pulse AI. Steady Pulse AI has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that Steady Pulse AI shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods, or services available on or through any such web sites or services.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Termination</h3>
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Limitation of Liability</h3>
          <p>
            In no event shall Steady Pulse AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Governing Law</h3>
          <p>
            These Terms shall be governed and construed in accordance with the laws of India (as applicable for Razorpay entities typically based in India) or the United States, depending on the jurisdiction of incorporation, without regard to its conflict of law provisions.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">9. Changes</h3>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">10. Contact Us</h3>
          <p>
            If you have any questions about these Terms, please contact us:
          </p>
          <ul className="list-disc pl-6 mt-4">
            <li>By email: legal@steadypulse.ai</li>
          </ul>
        </div>
      </div>
    </div>
  );
};