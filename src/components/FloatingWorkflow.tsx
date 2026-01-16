import { ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Strategy Session',
    description: 'We learn your business, audience, goals, and unique value proposition through our comprehensive onboarding.',
  },
  {
    number: '02',
    title: 'Content Creation',
    description: 'Our team crafts engaging LinkedIn posts tailored to your voice, positioning you as a thought leader.',
  },
  {
    number: '03',
    title: 'Review & Approve',
    description: 'Preview all content in your client portal. Approve instantly or request edits—full control, zero hassle.',
  },
  {
    number: '04',
    title: 'Publish & Grow',
    description: 'We schedule and post on your behalf. Track engagement, follower growth, and lead generation metrics.',
  },
];

export function FloatingWorkflow() {
  return (
    <section id="workflow" className="relative py-40 px-6">
      {/* Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-gray-100/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-gray-100/40 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-5xl sm:text-6xl md:text-7xl tracking-[-0.03em] leading-tight mb-6">
            From strategy to influence.
            <br />
            Four simple steps.
          </h2>
          <p className="text-xl text-gray-600 mt-4 font-semibold tracking-wide uppercase">Business Growth</p>
        </div>

        {/* Workflow Steps */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Steps List */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative cursor-pointer"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Glass Container */}
                <div className="relative backdrop-blur-xl bg-white/40 border border-white/20 rounded-3xl p-8 hover:bg-white/60 transition-all duration-500 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1">
                  <div className="flex gap-6">
                    {/* Number */}
                    <div className="text-6xl text-gray-200 group-hover:text-black transition-colors duration-500 tracking-tighter flex-shrink-0">
                      {step.number}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl mb-3 tracking-[-0.02em] group-hover:text-black transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Hover Arrow */}
                    <ArrowRight className="w-6 h-6 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-2" />
                  </div>

                  {/* Glow Line */}
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 -bottom-6 w-px h-12 bg-gradient-to-b from-gray-300 to-transparent"></div>
                )}
              </div>
            ))}
          </div>

          {/* Visual Element */}
          <div className="relative">
            {/* Floating Glass Panel */}
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-br from-gray-200/30 via-transparent to-gray-200/30 rounded-full blur-3xl"></div>
              
              <div className="relative backdrop-blur-2xl bg-white/60 border border-white/30 rounded-3xl p-8 shadow-2xl shadow-black/10">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#F8F9FA] to-white overflow-hidden">
                  {/* Client Portal Interface */}
                  <div className="p-8 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="h-4 w-40 bg-gray-800/80 rounded-full"></div>
                        <div className="h-2 w-28 bg-gray-300/60 rounded-full"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="px-4 py-2 bg-black/5 rounded-full">
                          <div className="h-2 w-16 bg-gray-400/50 rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    {/* Post Cards */}
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="backdrop-blur-xl bg-white/70 rounded-2xl p-6 border border-white/50 space-y-3 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="h-2 w-24 bg-gray-300/60 rounded-full"></div>
                          <div className="h-6 w-20 bg-black/10 rounded-full"></div>
                        </div>
                        <div className="h-3 w-full bg-gray-300/50 rounded-full"></div>
                        <div className="h-3 w-4/5 bg-gray-300/40 rounded-full"></div>
                        <div className="h-3 w-3/5 bg-gray-300/30 rounded-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Accent */}
              <div className="absolute -top-6 -right-6 w-32 h-32 backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl shadow-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 backdrop-blur-xl bg-white/50 border border-white/30 rounded-3xl shadow-xl"></div>
            </div>
          </div>
        </div>

        {/* Stats - Glass Tubes */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { value: '500%', label: 'Average engagement increase' },
            { value: '2.5k+', label: 'New followers per month' },
            { value: '47', label: 'Avg. qualified leads per client' },
          ].map((stat, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-gray-200/0 via-gray-200/40 to-gray-200/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative text-center backdrop-blur-xl bg-white/40 border border-white/20 rounded-3xl p-12 hover:bg-white/60 transition-all duration-500 hover:shadow-xl hover:shadow-black/10">
                <div className="text-6xl md:text-7xl tracking-tighter mb-4 group-hover:scale-110 transition-transform duration-500">
                  {stat.value}
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
