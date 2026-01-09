import { ArrowRight } from 'lucide-react';
import { useParallax, useScrollParallax } from '../hooks/useParallax';

export function ImmersiveCTA() {
  const { tilt, style: parallaxStyle } = useParallax({ sensitivity: 5 });
  const scroll = useScrollParallax(0.15);

  return (
    <section className="relative py-40 px-6 overflow-hidden perspective-container">
      {/* Dark Gradient Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#FCFCFD] via-gray-900 to-black parallax-layer"
        style={{ transform: `scale(1.1) translateY(${scroll.offsetY * 0.2}px)` }}
      ></div>

      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-gray-300/20 to-transparent rounded-full blur-3xl animate-pulse"></div>

      <div 
        className="relative z-10 max-w-5xl mx-auto text-center perspective-container"
        style={parallaxStyle}
      >
        {/* Floating Badge */}
        <div 
          className="inline-flex items-center gap-2 backdrop-blur-2xl bg-white/10 border border-white/10 rounded-full px-5 py-2 mb-8 shadow-lg hover:scale-105 transition-transform cursor-pointer parallax-layer"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
          <span className="text-sm tracking-wide text-white/80">Limited spots available for Q1 2025</span>
        </div>

        {/* Headline */}
        <h2 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.04em] leading-[0.95] mb-8 text-white parallax-layer"
          style={{ transform: 'translateZ(30px)' }}
        >
          Ready to become
          <br />
          a LinkedIn leader?
        </h2>

        {/* Subheadline */}
        <p 
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed parallax-layer"
          style={{ transform: 'translateZ(20px)' }}
        >
          Join founders and executives who've 10x'd their LinkedIn presence with Steady Pulse AI.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 parallax-layer" style={{ transform: 'translateZ(40px)' }}>
          <button className="group relative overflow-hidden bg-white text-black px-10 py-5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/30 flex items-center gap-3 hover:-translate-y-1">
            <span className="relative z-10 tracking-wide">Book Strategy Call</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
          <button className="backdrop-blur-xl bg-white/10 border border-white/20 text-white px-10 py-5 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 tracking-wide hover:-translate-y-1">
            View Pricing
          </button>
        </div>

        {/* Trust Indicator */}
        <p className="text-sm text-gray-500 parallax-layer" style={{ transform: 'translateZ(10px)' }}>
          No long-term contracts · Cancel anytime · 14-day money-back guarantee
        </p>

        {/* Floating Visual Element - Social Proof */}
        <div className="relative mt-20 max-w-4xl mx-auto parallax-layer perspective-container">
          <div className="absolute -inset-8 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-full blur-3xl opacity-50"></div>
          
          <div 
             className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl transition-transform duration-100"
             style={{
               transform: `rotateX(${tilt.x * 0.5}deg) rotateY(${tilt.y * 0.5}deg)`
             }}
          >
            {/* Testimonial Cards */}
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { role: 'CEO', company: 'Tech Startup', growth: '+380%' },
                { role: 'Founder', company: 'SaaS', growth: '+520%' },
                { role: 'Executive', company: 'Consulting', growth: '+295%' },
              ].map((testimonial, i) => (
                <div
                  key={i}
                  className="backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer group hover:-translate-y-2 hover:shadow-lg hover:shadow-white/5"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <div className="text-3xl text-white mb-3 group-hover:scale-110 transition-transform origin-left">
                    {testimonial.growth}
                  </div>
                  <div className="text-sm text-white/60">
                    {testimonial.role} · {testimonial.company}
                  </div>
                  <div className="mt-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  <div className="mt-3 text-xs text-white/40">Engagement Growth</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
