import { Check, ArrowRight, Zap, Shield, Lock, User, Target, BarChart3, FileText } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export function Pricing() {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate('/client-login', { state: { isSignup: true } });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden pt-20">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[70vh] flex items-center justify-center px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-6 py-2 mb-8 backdrop-blur-xl">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 tracking-wider uppercase">Steady Pulse AI</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.04em] mb-6 leading-[1.1]">
            The Founder-Led Era<br />is Here.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed tracking-[-0.01em]">
            Apply for our exclusive <span className="text-blue-400 font-semibold">7-Day Authority Sprint</span>.<br />
            Zero cost. Maximum impact.
          </p>

          <button 
            onClick={handleApply}
            className="group relative bg-blue-500 hover:bg-blue-600 text-white px-12 py-6 rounded-full text-lg font-bold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
          >
            <span className="flex items-center gap-3">
              Find Out If It's Worth It
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      {/* The Win-Win Trial Card */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Glowing Border Effect */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-3xl blur-sm animate-pulse"></div>
            
            {/* Card Content */}
            <div className="relative bg-gradient-to-br from-gray-900 to-black border border-blue-500/50 rounded-3xl p-10 md:p-12">
              {/* Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-blue-500 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg shadow-blue-500/50">
                  Limited to 2 Founders
                </div>
              </div>

              <div className="text-center mb-8 mt-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-4">The 7-Day Authority Sprint</h2>
                <p className="text-xl text-gray-400 tracking-[-0.01em]">Win-Win Trial: We prove ourselves. You get results.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Profile SEO Revamp</h3>
                    <p className="text-sm text-gray-400">Optimized headline, about section, and featured content</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">5 AI + Humanified Posts</h3>
                    <p className="text-sm text-gray-400">Perfectly crafted content that sounds like you</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Competition Analysis</h3>
                    <p className="text-sm text-gray-400">See exactly what your competitors are doing wrong</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Plan & Strategy</h3>
                    <p className="text-sm text-gray-400">90-day roadmap to LinkedIn domination</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:bg-white/10 transition-all md:col-span-2">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Data Analytics Report</h3>
                    <p className="text-sm text-gray-400">Full breakdown of your growth metrics and engagement patterns</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="inline-flex items-baseline gap-2 mb-6">
                  <span className="text-6xl font-bold">$0</span>
                </div>
                <p className="text-gray-400 mb-8">No credit card. No obligations. Just pure value.</p>
                <button 
                  onClick={handleApply}
                  className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-16 py-5 rounded-full text-lg font-bold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
                >
                  Apply for the 7-Day Sprint
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Retainer Tiers */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold tracking-[-0.03em] mb-4">Choose Your Authority Level</h2>
            <p className="text-xl text-gray-400 tracking-[-0.01em]">Transition to a Personal Brand Manager after your sprint</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tier 1: The Growth Partner */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-8 hover:border-blue-500/50 transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">The Growth Partner</h3>
                <p className="text-gray-400 text-sm">Perfect for getting started</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold">$1,997</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">3 posts per week</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Basic engagement strategy</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Monthly analytics reports</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Content calendar planning</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Profile optimization</span>
                </li>
              </ul>

              <button 
                onClick={handleApply}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
              >
                Apply Now
              </button>
            </div>

            {/* Tier 2: The Authority Manager - Featured */}
            <div className="relative">
              {/* Featured Glow */}
              <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-3xl blur-sm"></div>
              
              <div className="relative bg-gradient-to-br from-gray-900 to-black border border-blue-500 rounded-3xl p-8">
                {/* Most Popular Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-blue-500 text-white text-sm font-bold px-6 py-2 rounded-full shadow-lg shadow-blue-500/50">
                    Most Popular
                  </div>
                </div>

                <div className="mb-6 mt-4">
                  <h3 className="text-2xl font-bold mb-2">The Authority Manager</h3>
                  <p className="text-gray-400 text-sm">For serious founders</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-bold">$3,497</span>
                    <span className="text-gray-400">/month</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">5 posts per week</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Daily engagement management</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Network growth strategy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Newsletter repurposing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Weekly strategy calls</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Advanced analytics dashboard</span>
                  </li>
                </ul>

                <button 
                  onClick={handleApply}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
                >
                  Apply Now
                </button>
              </div>
            </div>

            {/* Tier 3: The Market Dominator */}
            <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-8 hover:border-blue-500/50 transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">The Market Dominator</h3>
                <p className="text-gray-400 text-sm">Total LinkedIn takeover</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold">$6,997</span>
                  <span className="text-gray-400">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Daily posting schedule</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">DM management & lead nurturing</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">PR placement strategy</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Advanced lead generation</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Influencer collaboration setup</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">24/7 priority support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">White-glove service</span>
                </li>
              </ul>

              <button 
                onClick={handleApply}
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The Process Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold tracking-[-0.03em] mb-4">How It Works</h2>
            <p className="text-xl text-gray-400 tracking-[-0.01em]">From application to results in 24-48 hours</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-blue-500/30 rounded-2xl p-8 hover:border-blue-500 transition-all">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                  <FileText className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-4xl font-bold text-blue-500 mb-2">01</div>
                <h3 className="text-xl font-bold mb-2">Fill Up the Form</h3>
                <p className="text-gray-400 text-sm">Tell us about your business and goals</p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-blue-500/50" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-blue-500/30 rounded-2xl p-8 hover:border-blue-500 transition-all">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                  <User className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-4xl font-bold text-blue-500 mb-2">02</div>
                <h3 className="text-xl font-bold mb-2">Get in Touch</h3>
                <p className="text-gray-400 text-sm">We'll schedule a quick discovery call</p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-blue-500/50" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-blue-500/30 rounded-2xl p-8 hover:border-blue-500 transition-all">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-4xl font-bold text-blue-500 mb-2">03</div>
                <h3 className="text-xl font-bold mb-2">Agency Analysis</h3>
                <p className="text-gray-400 text-sm">Deep dive into your current presence</p>
              </div>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-blue-500/50" />
              </div>
            </div>

            {/* Step 4 */}
            <div>
              <div className="bg-gradient-to-br from-gray-900 to-black border border-blue-500/30 rounded-2xl p-8 hover:border-blue-500 transition-all">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-4xl font-bold text-blue-500 mb-2">04</div>
                <h3 className="text-xl font-bold mb-2">Results in 24-48h</h3>
                <p className="text-gray-400 text-sm">Your sprint kicks off immediately</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Trust Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-3xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] mb-4">Your Trust is Our Priority</h2>
              <p className="text-xl text-gray-400 tracking-[-0.01em]">Enterprise-grade security and dedicated support</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Non-Disclosure Agreement</h3>
                <p className="text-gray-400 text-sm">Your business secrets stay secret</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Encrypted Access</h3>
                <p className="text-gray-400 text-sm">Bank-level security for all communications</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">1-on-1 Dedicated Manager</h3>
                <p className="text-gray-400 text-sm">Direct access to your personal strategist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Final CTA */}
      <footer className="relative z-10 px-6 py-20 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          {/* Final CTA */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Stop Being Invisible.
            </h2>
            <p className="text-3xl md:text-4xl text-blue-400 font-bold tracking-[-0.02em] mb-8">
              Crush Your Competitors. Start Leading.
            </p>
            <button 
              onClick={handleApply}
              className="group bg-blue-500 hover:bg-blue-600 text-white px-16 py-6 rounded-full text-xl font-bold transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(59,130,246,0.6)]"
            >
              <span className="flex items-center gap-3">
                Apply Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400 mb-8">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
            <a href="mailto:contact@steadypulse.ai" className="hover:text-white transition-colors">Contact Us</a>
            <Link to="/" className="hover:text-white transition-colors">FAQ</Link>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-500 text-sm">
            <p>© 2026 Steady Pulse AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
