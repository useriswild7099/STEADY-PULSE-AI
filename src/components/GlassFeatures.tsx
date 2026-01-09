import { FileText, Users, CheckCircle2, TrendingUp, Target, Zap } from 'lucide-react';
import { useScrollParallax, useParallax } from '../hooks/useParallax';
import { useRef, useState } from 'react';

const features = [
  {
    icon: FileText,
    title: 'Strategic Content',
    description: 'We craft thought leadership posts aligned with your brand voice, industry expertise, and growth goals.',
  },
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
