import { FileText, Users, CheckCircle2, TrendingUp, Target, Zap, ChevronDown, Radar, Brain, TrendingUp as Exponential, ArrowRight } from 'lucide-react';
import { useScrollParallax, useParallax } from '../hooks/useParallax';
import { useState } from 'react';

const protocolSteps = [
  {
    icon: Radar,
    step: '01',
    title: 'Algorithmic Signal Arbitrage',
    subtitle: 'Predictive Intelligence',
    description: 'Most guess; we calculate. Our proprietary AI isolates rising content vectors and engagement gaps in your specific niche before they saturate. We don\'t chase trends; we position you to intercept them.',
  },
  {
    icon: Brain,
    step: '02',
    title: 'Status-Signal Narrative Design',
    subtitle: 'Psychological Architecture',
    description: 'AI provides the data; we provide the dominance. We restructure raw insights into high-status narratives that leverage cognitive bias, establishing you not just as a participant, but as the category king.',
  },
  {
    icon: Exponential,
    step: '03',
    title: 'The Compounding Velocity Loop',
    subtitle: 'Exponential Distribution',
    description: 'Zero-latency execution. We deploy daily assets to trigger the algorithm\'s \'recency bias.\' Every post feeds data back into our AI, making the next prediction sharper. Your influence doesn\'t just grow; it accelerates.',
  },
];

const features = [
  {
    icon: Users,
    title: 'Ghost-Writing',
    description: 'Your voice, our words. Every post is written specifically for you—never generic, always on-brand.',
  },
  {
    icon: CheckCircle2,
    title: 'Simple Approval',
    description: 'Review posts in your portal. Approve, edit, or request changes—all in one seamless workflow.',
  },
  {
    icon: TrendingUp,
    title: 'Audience Growth',
    description: 'Data-driven content strategy designed to increase followers, engagement, and profile visibility.',
  },
  {
    icon: Target,
    title: 'Lead Generation',
    description: 'Turn your LinkedIn presence into a lead-generation engine that attracts your ideal clients.',
  },
  {
    icon: Zap,
    title: 'Done-For-You',
    description: 'From strategy to scheduling, we handle everything. You focus on closing deals, not writing posts.',
  },
];

export function GlassFeatures() {
  const scrollParallax = useScrollParallax(0.05);
  const [protocolExpanded, setProtocolExpanded] = useState(false);

  return (
    <section id="features" className="relative py-40 px-6 perspective-container overflow-hidden">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-transparent parallax-layer"
        style={{ transform: `translateY(${scrollParallax.offsetY * -0.5}px)` }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto perspective-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 parallax-layer" style={{ transform: 'translateZ(10px)' }}>
          <h2 className="text-5xl sm:text-6xl md:text-7xl tracking-[-0.03em] leading-tight mb-6">
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
                    <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-1">Closed-Loop Growth System</p>
                    <h3 className="text-2xl md:text-4xl font-bold text-white tracking-[-0.02em]">The Authority Engine</h3>
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: any, index: number }) {
  const { tilt, style } = useParallax({ sensitivity: 10, mobileDisabled: true });
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative perspective-container"
      style={{ 
        animationDelay: `${index * 100}ms`,
        ...style 
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow on Hover */}
      <div 
        className="absolute -inset-2 bg-gradient-to-r from-gray-200/0 via-gray-200/30 to-gray-200/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 parallax-layer" 
        style={{ transform: 'translateZ(-10px)' }}
      ></div>

      {/* Glass Card */}
      <div 
        className="relative backdrop-blur-2xl bg-white/50 border border-white/30 rounded-3xl p-10 shadow-lg shadow-black/5 transition-all duration-300 h-full parallax-layer"
        style={{
          transform: `
             rotateX(${tilt.x}deg) 
             rotateY(${tilt.y}deg) 
             ${hovered ? 'translateZ(20px)' : 'translateZ(0px)'}
          `,
          boxShadow: hovered 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 0 15px rgba(255, 255, 255, 0.5) inset' 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
        }}
      >
        {/* Dynamic Light Reflection */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at ${50 + tilt.y * 2}% ${50 + tilt.x * 2}%, rgba(255,255,255,0.8), transparent 40%)`
          }}
        />

        {/* Icon Container */}
        <div className="relative mb-8 parallax-layer" style={{ transform: 'translateZ(15px)' }}>
          <div className="absolute inset-0 bg-black/5 blur-2xl rounded-2xl"></div>
          <div className="relative w-14 h-14 bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-xl">
            <feature.icon className="w-7 h-7 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="parallax-layer" style={{ transform: 'translateZ(10px)' }}>
          <h3 className="text-2xl mb-4 tracking-[-0.02em]">{feature.title}</h3>
          <p className="text-gray-600 leading-relaxed">{feature.description}</p>
        </div>

        {/* Micro-interaction indicator */}
        <div className="absolute bottom-8 right-8 w-2 h-2 bg-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity parallax-layer" style={{ transform: 'translateZ(5px)' }}></div>
      </div>
    </div>
  );
}

