import { TrendingDown, Bot, Eye } from 'lucide-react';

const painPoints = [
  {
    icon: TrendingDown,
    title: 'Inconsistency kills algorithm reach.',
    description: 'The LinkedIn algorithm rewards daily presence. Miss a week, and your content gets buried. Your competitors who post consistently are stealing your audience.',
  },
  {
    icon: Bot,
    title: 'AI-generated content sounds robotic and loses trust.',
    description: 'Your audience can spot ChatGPT from a mile away. Generic, soulless posts are destroying your credibility and pushing potential clients to competitors who feel more human.',
  },
  {
    icon: Eye,
    title: 'You are leaving 6-figures on the table by being invisible.',
    description: 'Every day without a LinkedIn presence is a day your ideal clients forget you exist. They are signing contracts with whoever shows up in their feed - and that is not you.',
  },
];

export function PainSection() {
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-6 bg-black text-white overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-black to-black pointer-events-none"></div>
      
      {/* Animated background blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-red-400 text-sm font-semibold tracking-widest uppercase mb-4">The Hard Truth</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] leading-tight mb-4 md:mb-6">
            Why Your Personal Brand<br />is Dying.
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            If you're not showing up daily, you're not just losing followers—you're losing revenue.
          </p>
        </div>

        {/* Pain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {painPoints.map((point, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-gray-900 to-black border border-red-500/20 rounded-2xl p-6 md:p-8 transition-all duration-500 hover:border-red-500/50 hover:shadow-[0_0_40px_rgba(239,68,68,0.1)]"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-500/20 transition-all">
                <point.icon className="w-7 h-7 text-red-400" />
              </div>

              {/* Number */}
              <span className="absolute top-6 right-6 text-5xl font-bold text-red-500/10">0{index + 1}</span>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-4 leading-tight">{point.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Warning */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            <span className="text-red-400 font-semibold">Warning:</span> Every day you wait is a day your competitors get further ahead.
          </p>
        </div>
      </div>
    </section>
  );
}
