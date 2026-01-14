import { ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PricingPreview() {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 bg-black text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
              Start with the <br />
              <span className="text-blue-500">7-Day Authority Sprint.</span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-lg">
              Don't commit to a retainer yet. Let us prove our value first. We'll revamp your profile and create a week's worth of content for free.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/pricing')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                View Full Pricing
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate('/client-login', { state: { isSignup: true } })}
                className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
              >
                Apply for Sprint
              </button>
            </div>
          </div>

          {/* Right: Card Preview */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur opacity-30"></div>
            <div className="relative bg-gray-900 border border-gray-800 rounded-3xl p-8 md:p-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-bold">Authority Sprint</h3>
                  <p className="text-gray-400 text-sm">One-time trial offer</p>
                </div>
                <div className="bg-blue-500/10 text-blue-400 px-4 py-1 rounded-full text-sm font-bold border border-blue-500/20">
                  $0 Free
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {['Profile SEO Revamp', '5 High-Impact Posts', 'Competitor Analysis', '90-Day Strategy Roadmap'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-400">
                  "This sprint completely changed how I view LinkedIn. The ROI was immediate."
                </p>
                <div className="mt-2 text-xs text-gray-500 font-mono">
                  — Sarah J., Tech Founder
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
