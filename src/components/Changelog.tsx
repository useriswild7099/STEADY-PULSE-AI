import { GitCommit, Star, Zap } from 'lucide-react';

const updates = [
  {
    date: 'Jan 10, 2026',
    version: 'v2.1.0',
    title: 'New Dashboard Experience',
    description: 'Completely redesigned client portal with faster load times and real-time analytics.',
    icon: Star,
  },
  {
    date: 'Dec 24, 2025',
    version: 'v2.0.4',
    title: 'AI Voice Cloning 2.0',
    description: 'Enhanced brand voice detection model now supports multi-tone analysis (Professional vs. Casual).',
    icon: Zap,
  },
  {
    date: 'Nov 15, 2025',
    version: 'v1.9.0',
    title: 'LinkedIn API Integration',
    description: 'Direct publishing and scheduling capabilities added. No more manual copy-pasting.',
    icon: GitCommit,
  },
];

export function Changelog() {
  return (
    <section className="py-24 px-6 bg-[#FCFCFD] border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Changelog</h2>
            <p className="text-gray-500">We are constantly improving. Here is what is new.</p>
          </div>
          <div className="hidden sm:block">
            <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
              Latest: v2.1.0
            </span>
          </div>
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
          {updates.map((update, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Icon Marker */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-gray-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <update.icon className="w-4 h-4 text-gray-900" />
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-900">{update.title}</span>
                  <time className="font-mono text-xs text-gray-400">{update.date}</time>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">
                  {update.description}
                </p>
                <div className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-xs font-medium text-gray-600">
                  {update.version}
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
