import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-gray-500">
            Last Updated: January 10, 2026
          </p>
        </div>

        <div className="prose prose-slate max-w-none text-gray-600">
          <p className="lead text-lg">
            At Steady Pulse AI ("we," "us," or "our"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our AI-driven branding and content services (the "Service").
          </p>

          <p>
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h3>
          <p>
            We collect information that identifies, relates to, describes, references, is capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer or device ("personal information").
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Personal Identity Information:</strong> Name, email address, phone number, and business name provided during registration or checkout.</li>
            <li><strong>Payment Information:</strong> Credit card details and billing addresses are collected and processed securely by our third-party payment processor, Razorpay. We do not store full credit card numbers on our servers.</li>
            <li><strong>Technical Data:</strong> Internet Protocol (IP) address, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            <li><strong>Usage Data:</strong> Information about how you use our website, products, and services, including page interaction information and user journey data.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h3>
          <p>
            We use the information we collect for various business purposes, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>To provide, operate, and maintain our Services.</li>
            <li>To process your payments and manage your account via Razorpay.</li>
            <li>To improve, personalize, and expand our website and content offerings.</li>
            <li>To understand and analyze how you use our website.</li>
            <li>To communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
            <li>To prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Disclosure of Your Information</h3>
          <p>
            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>Service Providers:</strong> We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf and require access to such information to do that work (e.g., Razorpay for payment processing, email delivery services, hosting services).</li>
            <li><strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or asset sale, your personal data may be transferred.</li>
            <li><strong>Law Enforcement:</strong> Under certain circumstances, we may be required to disclose your personal data if required to do so by law or in response to valid requests by public authorities.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Security of Your Data</h3>
          <p>
            The security of your data is important to us. We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Your Data Protection Rights (GDPR & CCPA)</h3>
          <p>
            Depending on your location, you may have the following rights:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
            <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data.</li>
            <li><strong>The right to object to processing:</strong> You have the right to object to our processing of your personal data.</li>
            <li><strong>The right to data portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you.</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Cookies and Tracking Technologies</h3>
          <p>
            We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Third-Party Websites</h3>
          <p>
            Our Service may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Children's Privacy</h3>
          <p>
            Our Service does not address anyone under the age of 18 ("Children"). We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">9. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc pl-6 mt-4">
            <li>By email: privacy@steadypulse.ai</li>
            <li>By visiting this page on our website: <a href="/contact" className="text-blue-600 hover:underline">steadypulse.ai/contact</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};