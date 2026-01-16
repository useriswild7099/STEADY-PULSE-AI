import { ArrowRight, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useParallax, useScrollParallax } from '../hooks/useParallax';

export function AuroraHero() {
  const navigate = useNavigate();
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
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-500/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse delay-75 duration-[4s]"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-cyan-400/20 via-transparent to-transparent rounded-full blur-3xl animate-pulse delay-100 duration-[5s]" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-transparent via-blue-900/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Content Container - Grid Layout */}
      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center perspective-container">
        
        {/* Left Column: Text */}
        <div className="text-center lg:text-left order-2 lg:order-1">
          {/* Floating Badge */}
          <div 
            className="inline-flex items-center gap-2 backdrop-blur-xl bg-blue-500/10 border border-blue-500/20 rounded-full px-5 py-2 mb-8 shadow-lg shadow-blue-500/5 hover:scale-105 transition-all cursor-pointer group hover:shadow-xl duration-500 ease-out parallax-layer"
            style={{
               transform: `rotateX(${parseFloat(heroParallax.tilt.x.toString()) * 0.5}deg) rotateY(${parseFloat(heroParallax.tilt.y.toString()) * 0.5}deg)`
            }}
          >
            <TrendingUp className="w-4 h-4 text-blue-400 group-hover:rotate-12 transition-transform" />
            <span className="text-sm tracking-wide text-blue-300">LinkedIn Growth Partner</span>
          </div>

          {/* Hero Headline */}
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-[-0.04em] leading-[1.05] mb-8 parallax-layer text-white"
            style={{
              transform: `translateZ(20px)`
            }}
          >
            Turn Your LinkedIn into a
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Compounding Revenue Asset.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed tracking-[-0.01em] parallax-layer" style={{ transform: 'translateZ(10px)' }}>
            <span className="text-white font-semibold">The Pulse of Your Industry. Automated.</span>
            <br className="mb-2 block"/>
            Consistency is the killer. We combine AI-driven trend analysis with human storytelling to keep your brand alive, relevant, and converting while you sleep.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-20 lg:mb-0 parallax-layer" style={{ transform: 'translateZ(30px)' }}>
            <button 
              onClick={() => navigate('/client-login', { state: { isSignup: true } })}
              className="group relative overflow-hidden bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 flex items-center gap-3 hover:-translate-y-1"
            >
              <span className="relative z-10 tracking-wide font-semibold">Start the Protocol</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          </div>
        </div>

        {/* Right Column: Visual (Pulse Line) */}
        <div 
          className="relative order-1 lg:order-2 parallax-layer flex items-center justify-center"
          style={{
             transform: `
               perspective(1000px)
               rotateX(${cardParallax.tilt.x}deg)
               rotateY(${cardParallax.tilt.y}deg)
             `,
             transition: 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          {/* Main Visual Card */}
          <div className="relative w-full max-w-lg aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden backdrop-blur-3xl bg-gray-900/50 border border-blue-500/30 shadow-2xl shadow-blue-500/20 flex flex-col items-center justify-center p-8 group">
             {/* Background Grid */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>
             
             {/* Pulse Line Container */}
             <div className="relative w-full h-48 flex items-center justify-center">
                
                {/* Static Line */}
                <div className="absolute inset-0 flex items-center">
                   <div className="w-full h-0.5 bg-blue-500/20"></div>
                </div>

                {/* Animated Pulse Wave (CSS Implementation) */}
                <div className="relative z-10 flex items-end gap-1 h-32 w-64 items-center justify-center">
                   <span className="w-3 bg-blue-500 rounded-full animate-[pulse-height_1s_ease-in-out_infinite]" style={{ height: '30%', animationDelay: '0s' }}></span>
                   <span className="w-3 bg-blue-400 rounded-full animate-[pulse-height_1s_ease-in-out_infinite]" style={{ height: '60%', animationDelay: '0.1s' }}></span>
                   <span className="w-3 bg-cyan-400 rounded-full animate-[pulse-height_1s_ease-in-out_infinite]" style={{ height: '100%', animationDelay: '0.2s', boxShadow: '0 0 20px rgba(34,211,238,0.5)' }}></span>
                   <span className="w-3 bg-blue-400 rounded-full animate-[pulse-height_1s_ease-in-out_infinite]" style={{ height: '70%', animationDelay: '0.3s' }}></span>
                   <span className="w-3 bg-blue-600 rounded-full animate-[pulse-height_1s_ease-in-out_infinite]" style={{ height: '40%', animationDelay: '0.4s' }}></span>
                </div>

                {/* Floating Activity Notification */}
                <div className="absolute top-0 right-10 bg-gray-900 border border-blue-500/30 rounded-xl p-4 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                   <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <p className="text-xs text-blue-400 font-bold uppercase">Signal Detected</p>
                        <p className="text-white text-sm font-semibold">High Momentum Topic</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* Bottom Stat */}
             <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                <div>
                   <p className="text-gray-400 text-xs uppercase tracking-wider">Engagement Rate</p>
                   <p className="text-white text-xl font-bold font-mono">+428%</p>
                </div>
                <div className="h-10 w-px bg-white/10"></div>
                <div>
                   <p className="text-gray-400 text-xs uppercase tracking-wider">Profile Views</p>
                   <p className="text-white text-xl font-bold font-mono">12.5k</p>
                </div>
             </div>
          </div>

          {/* Background Glows */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/20 blur-[100px] rounded-full"></div>
        </div>

      </div>

      <style>{`
        @keyframes pulse-height {
          0%, 100% { height: 30%; opacity: 0.5; }
          50% { height: 90%; opacity: 1; }
        }
      `}</style>
    </section>
  );
}
