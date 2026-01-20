import { FileText, Users, CheckCircle2, TrendingUp, Target, Zap, ChevronDown, Radar, Brain, TrendingUp as Exponential, ArrowRight } from 'lucide-react';
import { useScrollParallax, useParallax } from '../hooks/useParallax';
import { useState } from 'react';

const protocolSteps = [
  {
    icon: Radar,
    step: '01',
    title: 'Signal Detection (The AI)',
    subtitle: 'The Eye',
    description: 'Our AI scans your niche for high-engagement topics before they go viral.',
  },
  {
    icon: Brain,
    step: '02',
    title: 'The Human Hook',
    subtitle: 'The Hand',
    description: 'We craft the narrative. AI finds the angle; humans build the trust.',
  },
  {
    icon: Exponential,
    step: '03',
    title: 'The Steady Rhythm',
    subtitle: 'The Heartbeat',
    description: 'Daily publishing, zero burnout. We maintain the pulse so you stay top-of-mind.',
  },
];

const features = [
  {
    icon: Users, // Fingerprint/DNA - using Users as closest match
    title: 'Identity Cloning & Amplification',
    subtitle: 'Omnipresence without effort',
    description: 'Your Intellectual Property, Scaled. We extract your mental models, tone, and worldview, then deploy them at scale. Content that sounds exactly like you on your best day—without you typing a single word.',
  },
  {
    icon: CheckCircle2, // Shield with checkmark
    title: 'The Zero-Friction Executive Portal',
    subtitle: '100% Agency, 1% Time Investment',
    description: 'Command, Don\'t Create. Your time is worth $1,000+/hr. Log into our dedicated portal, spend 5 minutes reviewing the week\'s queue, and click "Greenlight." We handle the logistics; you maintain the control.',
  },
  {
    icon: Target, // Connected nodes - using Target for precision
    title: 'Network Effect Engineering',
    subtitle: 'Authority, not just attention',
    description: 'Targeted Gravity. We engineer content vectors to attract specific nodes: Investors, Partners, and High-Ticket Clients. We turn your profile into a magnet for the top 1% of your industry.',
  },
  {
    icon: TrendingUp, // Magnet - using TrendingUp for inbound
    title: 'Inbound Deal Flow Architecture',
    subtitle: 'A calendar filled with warm leads',
    description: 'Stop Chasing. Start Attracting. We build a content ecosystem that pre-sells your expertise before the first call. By the time they DM you, they are already sold.',
  },
  {
    icon: Zap, // Gear/Cog - using Zap for operations
    title: 'Asymmetric Operations',
    subtitle: 'Maximum Output, Minimum Input',
    description: 'We Take the Labor, You Take the Upside. From algorithmic timing to comment management, we handle the low-leverage execution. You focus on building your product and closing the deals we bring you.',
  },
];

export function GlassFeatures() {
  const scrollParallax = useScrollParallax(0.05);
  const [protocolExpanded, setProtocolExpanded] = useState(false);

  return (
    <section id="features" className="relative py-24 md:py-40 px-4 md:px-6 perspective-container overflow-hidden">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-transparent parallax-layer contain-paint"
        style={{ 
          transform: `translateY(${scrollParallax.offsetY * -0.5}px) translateZ(0)`,
          willChange: 'transform'
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto perspective-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 parallax-layer" style={{ transform: 'translateZ(10px)' }}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-tight mb-6">
            LinkedIn growth.
            <br />
            Without the effort.
          </h2>
          <p className="text-xl md:text-2xl text-gray-500 leading-relaxed">
            A complete LinkedIn content engine built for busy executives.
          </p>
        </div>

        {/* The Authority Engine - Premium Featured Card */}
        <div className="mb-12">
          <div 
            onClick={() => setProtocolExpanded(!protocolExpanded)}
            className="group relative cursor-pointer"
          >
            {/* Electric Blue Glow */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 rounded-[2rem] blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>

            {/* Main Card */}
            <div className="relative backdrop-blur-2xl bg-gradient-to-br from-gray-900 to-black border border-blue-500/50 rounded-[2rem] p-10 md:p-12 shadow-2xl shadow-blue-500/10 transition-all duration-500">
              
              {/* Header Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-2">
                <div className="flex items-center gap-6">
                  {/* Animated Icon Container */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-blue-600/30 blur-2xl rounded-2xl animate-pulse"></div>
                    <div className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30">
                      <FileText className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                  </div>
                  
                  {/* Title & Tagline */}
                  <div>
                    <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-1">A 3-Step Closed-Loop Growth System</p>
                    <h3 className="text-2xl md:text-4xl font-bold text-white tracking-[-0.02em]">The Steady Pulse Protocol</h3>
                  </div>
                </div>

                {/* Expand Indicator */}
                <div className="flex items-center gap-3">
                  <span className="text-blue-400/70 text-sm hidden md:block">Click to explore the system</span>
                  <div className={`w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center transition-all duration-300 ${protocolExpanded ? 'rotate-180 bg-blue-500/20' : ''}`}>
                    <ChevronDown className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </div>

              {/* Expandable Content */}
              <div 
                className={`overflow-hidden transition-all duration-700 ease-out ${
                  protocolExpanded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pt-10 mt-10 border-t border-blue-500/20">
                  
                  {/* Flywheel Visualization */}
                  <div className="relative mb-12">
                    {/* The Three Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                      {protocolSteps.map((step, index) => (
                        <div 
                          key={index}
                          className={`relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 transition-all duration-500 hover:border-blue-500/50 hover:bg-white/10 ${
                            protocolExpanded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                          }`}
                          style={{ transitionDelay: protocolExpanded ? `${index * 150}ms` : '0ms' }}
                        >
                          {/* Step Number & Icon */}
                          <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <step.icon className="w-6 h-6 text-blue-400" />
                              </div>
                              <span className="text-3xl font-bold text-blue-500/30">{step.step}</span>
                            </div>
                          </div>
                          
                          {/* Subtitle */}
                          <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-2">{step.subtitle}</p>
                          
                          {/* Title */}
                          <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
                          
                          {/* Description */}
                          <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>

                          {/* Connector Arrow (between cards, visible on md+) */}
                          {index < 2 && (
                            <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-gray-900 rounded-full border border-blue-500/30 items-center justify-center">
                              <ArrowRight className="w-3 h-3 text-blue-400" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Data Feedback Loop - The Flywheel Arrow */}
                    <div 
                      className={`mt-8 relative transition-all duration-700 ${
                        protocolExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: protocolExpanded ? '500ms' : '0ms' }}
                    >
                      <div className="relative bg-gradient-to-r from-blue-500/5 via-blue-600/10 to-blue-500/5 rounded-2xl p-6 border border-blue-500/20">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                          {/* Loop Icon */}
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                              <svg className="w-5 h-5 text-blue-400 animate-spin" style={{ animationDuration: '8s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase">Data Feedback Loop</p>
                              <p className="text-white font-semibold">Step 03 → Step 01</p>
                            </div>
                          </div>

                          {/* Divider */}
                          <div className="hidden md:block w-px h-12 bg-blue-500/20"></div>

                          {/* Explanation */}
                          <p className="text-gray-400 text-sm text-center md:text-left max-w-lg">
                            <span className="text-blue-400 font-semibold">The Compounding Effect:</span> Every post's performance data feeds back into our AI, making each prediction sharper. The longer you're with us, the smarter your growth engine becomes.
                          </p>
                        </div>

                        {/* Animated Loop Line */}
                        <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                        <div className="absolute -bottom-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
                      </div>
                    </div>

                    {/* High Switching Costs Callout */}
                    <div 
                      className={`mt-6 text-center transition-all duration-700 ${
                        protocolExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{ transitionDelay: protocolExpanded ? '700ms' : '0ms' }}
                    >
                      <p className="text-gray-500 text-sm">
                        <span className="text-blue-400">↑</span> This is why our clients stay. Their data becomes their moat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Glass Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: any, index: number }) {
  const { tilt, style } = useParallax({ sensitivity: 8, mobileDisabled: true }); // Lower sensitivity for smoother feel
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative perspective-container contain-layout"
      style={{ 
        animationDelay: `${index * 100}ms`,
        ...style 
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Dynamic ambient glow - stronger on hover */}
      <div 
        className="absolute -inset-1 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-700 parallax-layer" 
        style={{ transform: 'translateZ(-12px)' }}
      ></div>

      {/* Main Card Container */}
      <div 
        className="relative overflow-hidden rounded-[2rem] p-8 md:p-10 shadow-2xl transition-all duration-500 h-full parallax-layer border border-white/10 group-hover:border-white/20"
        style={{
          background: 'linear-gradient(145deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', // Deep moody gradient base
          transform: `
             rotateX(${tilt.x}deg) 
             rotateY(${tilt.y}deg) 
             ${hovered ? 'translateZ(20px) scale(1.02)' : 'translateZ(0px)'}
          `,
          boxShadow: hovered 
            ? '0 30px 60px -12px rgba(0,0,0,0.5), 0 0 40px rgba(139, 92, 246, 0.15) inset' 
            : '0 10px 30px -10px rgba(0,0,0,0.5), 0 0 20px rgba(139, 92, 246, 0.05) inset'
        }}
      >
        {/* Marble Texture - Optimized opacity for legibility */}
        <div 
          className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-overlay"
          style={{
            backgroundImage: `url('/src/assets/marble-bg.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'contrast(1.2) brightness(0.8)' // High-fidelity adjustments
          }}
        />

        {/* Specular Noise/Grain for Realism */}
         <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
         />

        {/* Glossy Reflection Gradient */}
        <div 
          className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(800px circle at ${50 + tilt.y * 4}% ${50 + tilt.x * 4}%, rgba(255,255,255,0.1), transparent 40%)`
          }}
        />

        {/* Animated Sheen */}
        <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none">
          <div 
            className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine left-[-100%]"
          />
        </div>

        {/* Icon Container - Floating Glass */}
        <div className="relative mb-8 parallax-layer z-20" style={{ transform: 'translateZ(25px)' }}>
          <div className="absolute inset-0 bg-purple-500/30 blur-2xl rounded-2xl"></div>
          <div className="relative w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] group-hover:scale-110 transition-transform duration-500">
            <feature.icon className="w-8 h-8 text-purple-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
          </div>
        </div>

        {/* Content - High Contrast & Hierarchy */}
        <div className="relative parallax-layer z-20" style={{ transform: 'translateZ(15px)' }}>
          <h3 className="text-2xl font-bold mb-3 tracking-[-0.03em] text-white drop-shadow-md">{feature.title}</h3>
          
          {feature.subtitle && (
            <div className="inline-block px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 mb-4 backdrop-blur-sm">
              <p className="text-purple-200 text-xs font-bold uppercase tracking-wider">{feature.subtitle}</p>
            </div>
          )}
          
          <p className="text-gray-300 text-sm leading-relaxed font-medium drop-shadow-sm border-l-2 border-purple-500/30 pl-4">
            {feature.description}
          </p>
        </div>

        {/* Corner Decor */}
        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-white/20 group-hover:bg-purple-400/50 transition-colors duration-500"></div>
      </div>
    </div>
  );
}

