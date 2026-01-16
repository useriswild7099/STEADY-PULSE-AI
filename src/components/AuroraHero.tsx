import { ArrowRight, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useParallax, useScrollParallax } from '../hooks/useParallax';
import aiBrainImg from '../assets/ai-brain.jpg';

export function AuroraHero() {
  const navigate = useNavigate();
  const { style: mouseParallaxStyle } = useParallax({ sensitivity: 15 });
  const { style: bgParallaxStyle } = useParallax({ sensitivity: 25 }); // Slower for background? No, usually background moves less, so inverse or smaller scale. Let's try separate sensitivity.
  // Actually, standard parallax: background moves slower than foreground.
  // If sensitivity is translation:
  // Background: 5
  // Mid: 15
  // Foreground: 30
  
  const heroParallax = useParallax({ sensitivity: 10 });
  const cardParallax = useParallax({ sensitivity: 20 });
  const bgScroll = useScrollParallax(0.2);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden perspective-container"
      style={heroParallax.style}
    >
      {/* Animated Gradient Mesh Background */}
      <div 
        className="absolute inset-0 overflow-hidden parallax-layer"
        style={{ 
          transform: `translateY(${bgScroll.offsetY * 0.5}px) scale(1.1)`,
        }}
      >
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-gray-200/40 via-transparent to-transparent rounded-full blur-3xl animate-pulse delay-75 duration-[4s]"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-gray-100/30 via-transparent to-transparent rounded-full blur-3xl animate-pulse delay-100 duration-[5s]" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-transparent via-gray-50/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center perspective-container">
        {/* Floating Badge */}
        <div 
          className="inline-flex items-center gap-2 backdrop-blur-xl bg-white/40 border border-white/20 rounded-full px-5 py-2 mb-8 shadow-lg shadow-black/5 hover:scale-105 transition-all cursor-pointer group hover:shadow-xl duration-500 ease-out parallax-layer"
          style={{
             transform: `rotateX(${parseFloat(heroParallax.tilt.x.toString()) * 0.5}deg) rotateY(${parseFloat(heroParallax.tilt.y.toString()) * 0.5}deg)`
          }}
        >
          <TrendingUp className="w-4 h-4 text-gray-700 group-hover:rotate-12 transition-transform" />
          <span className="text-sm tracking-wide text-gray-700">LinkedIn Growth Partner</span>
        </div>

        {/* Hero Headline */}
        <h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[-0.04em] leading-[0.95] mb-8 parallax-layer"
          style={{
            transform: `translateZ(20px)`
          }}
        >
          The Pulse of Your Industry.
          <br />
          Automated
        </h1>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-500 max-w-4xl mx-auto mb-12 leading-relaxed tracking-[-0.01em] parallax-layer" style={{ transform: 'translateZ(10px)' }}>
          Consistency is the killer. We combine AI-driven trend analysis with human storytelling to keep your brand alive, relevant, and converting while you sleep.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 parallax-layer" style={{ transform: 'translateZ(30px)' }}>
          <button 
            onClick={() => navigate('/client-login', { state: { isSignup: true } })}
            className="group relative overflow-hidden bg-black text-white px-10 py-5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/30 flex items-center gap-3 hover:-translate-y-1"
          >
            <span className="relative z-10 tracking-wide">Start Growing</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-black to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>

        </div>

        {/* Floating Glass Card */}
        <div 
          className="relative max-w-5xl mx-auto parallax-layer will-change-transform"
          style={{
             transform: `
               perspective(1000px)
               rotateX(${cardParallax.tilt.x}deg)
               rotateY(${cardParallax.tilt.y}deg)
               translateY(${bgScroll.offsetY * -0.1}px)
             `,
             transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-gray-200/30 via-transparent to-gray-200/30 blur-3xl opacity-50"></div>
          
          {/* Main Card */}
          <div className="relative backdrop-blur-2xl bg-white/60 border border-white/30 rounded-3xl shadow-2xl shadow-black/10 p-2 transition-transform duration-700">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
              {/* LinkedIn Post Preview */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-[#F8F9FA] p-12">
                  {/* Mock LinkedIn Post */}
                  <div className="max-w-2xl mx-auto backdrop-blur-xl bg-white/80 rounded-2xl border border-gray-200/50 p-8 shadow-lg transform transition-transform hover:scale-[1.01] duration-500">
                    {/* Post Header */}
                    {/* Post Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-black flex items-center justify-center shrink-0">
                         {/* Placeholder for Elon's Avatar if no image available, or use a generic user icon */}
                         <img src="https://pbs.twimg.com/profile_images/1683325380441128960/yRsRRjGO_400x400.jpg" alt="Elon Musk" className="w-full h-full object-cover" onError={(e) => {e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.classList.add('bg-gray-800'); }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <h3 className="font-bold text-gray-900 text-sm">Elon Musk</h3>
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                             <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-white fill-current"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                          </div>
                        </div>
                        <p className="text-gray-500 text-xs">@elonmusk</p>
                      </div>
                      <div className="text-gray-400">
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                      </div>
                    </div>
                    {/* Post Content */}
                    <div className="mb-4 text-[13px] sm:text-[15px] leading-relaxed text-gray-900 font-medium space-y-3">
                      <p>
                        It is increasingly likely that AI will superset the intelligence of any single human by the end of 2025 and maybe all humans by 2027/2028.
                      </p>
                      <p>
                        Probability that AI exceeds the intelligence of all humans combined by 2030 is ~100%.
                      </p>
                    </div>
                    {/* Timestamp */}
                    <div className="mb-4 text-xs text-gray-500 hover:underline cursor-pointer">
                      12:12 PM · Dec 23, 2024 · <span className="text-black font-semibold">447K</span> Views
                    </div>
                    {/* Engagement */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-gray-500">
                      <div className="flex items-center gap-2 group cursor-pointer hover:text-blue-500 transition-colors">
                         <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current"><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.245C5.335 18 1.75 14.42 1.75 10zM1.75 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.245C5.335 18 1.75 14.42 1.75 10z"/></svg>
                         <span className="text-xs">4.2K</span>
                      </div>
                      <div className="flex items-center gap-2 group cursor-pointer hover:text-green-500 transition-colors">
                         <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current"><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"/></svg>
                         <span className="text-xs">3.8K</span>
                      </div>
                      <div className="flex items-center gap-2 group cursor-pointer hover:text-red-500 transition-colors">
                         <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current"><path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"/></svg>
                         <span className="text-xs">28K</span>
                      </div>
                      <div className="flex items-center gap-2 group cursor-pointer hover:text-blue-500 transition-colors">
                         <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-current"><path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06zM19.75 10c-.414 0-.75.336-.75.75v3.25c0 1.654-1.346 3-3 3H8c-1.654 0-3-1.346-3-3v-3.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75v3.25c0 2.481 2.019 4.5 4.5 4.5h8c2.481 0 4.5-2.019 4.5-4.5v-3.25c0-.414-.336-.75-.75-.75z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Accents */}
          <div 
             className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-white/60 to-transparent backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg parallax-layer flex items-center justify-center overflow-hidden"
             style={{ transform: 'translateZ(40px)' }}
          >
            <img src={aiBrainImg} alt="AI Intelligence" className="w-full h-full object-cover opacity-90" />
          </div>
          <div 
            className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-tl from-white/60 to-transparent backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg parallax-layer"
            style={{ transform: 'translateZ(60px)' }}
          ></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce opacity-50 hover:opacity-100 transition-opacity">
        <div className="w-6 h-10 rounded-full border-2 border-gray-300 flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
