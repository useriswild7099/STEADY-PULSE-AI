import { Shield, Lock, FileKey, Server } from 'lucide-react';

export function SecuritySection() {
  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gray-50 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-1 mb-6">
            <Shield className="w-4 h-4 text-gray-600" />
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Enterprise Grade</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Security at the Core.
          </h2>
          <p className="text-xl text-gray-500">
            We treat your data with the same level of security as a bank. Your personal brand's integrity and privacy are non-negotiable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
              <Lock className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-xl font-bold mb-3">AES-256 Encryption</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              All data at rest is encrypted using industry-standard AES-256 algorithms. Your content drafts and strategies are safe.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-xl font-bold mb-3">GDPR & CCPA Ready</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Fully compliant with global data protection regulations. You own your data, and you have full control over it.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
              <FileKey className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Payments are processed securely via Razorpay. We never store your credit card information on our servers.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6">
              <Server className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-xl font-bold mb-3">Isolated Infrastructure</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Client environments are logically isolated. Your brand voice data never mixes with other clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
