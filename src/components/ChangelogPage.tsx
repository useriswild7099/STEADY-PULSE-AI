import { GitCommit, Star, Zap, Shield, Users, BarChart3, Sparkles } from 'lucide-react';
import { Navigation } from './Navigation';
import { AuroraFooter } from './AuroraFooter';

const updates = [
  {
    date: 'Jan 10, 2026',
    version: 'v2.3.0',
    title: 'Neural Brand Voice Engine',
    description: 'Our proprietary AI model now analyzes your past 50+ LinkedIn posts to reconstruct your unique syntax, tone, and vocabulary. The result? Ghostwritten content that is indistinguishable from your own writing. 98% stylistic accuracy in blind tests.',
    icon: Sparkles,
    type: 'AI Core'
  },
  {
    date: 'Dec 28, 2025',
    version: 'v2.2.0',
    title: 'Enterprise Admin Portal',
    description: 'A complete overhaul of the internal management system. Admins can now manage multiple client workspaces, oversee ghostwriter assignments, and track global engagement metrics from a single "God Mode" view.',
    icon: Shield,
    type: 'Infrastructure'
  },
  {
    date: 'Dec 12, 2025',
    version: 'v2.1.5',
    title: 'Smart Viral Scheduling',
    description: 'We don\'t just post; we predict. The new scheduling algorithm analyzes global LinkedIn traffic patterns within your specific industry niche to identify the exact minute your audience is most active.',
    icon: Zap,
    type: 'Feature'
  },
  {
    date: 'Nov 30, 2025',
    version: 'v2.1.0',
    title: 'The Client Command Center',
    description: 'The new Client Portal is live. Features include a drag-and-drop content calendar, one-click approval workflows, and a direct communication channel with your dedicated strategist. Streamlined, fast, and mobile-responsive.',
    icon: Users,
    type: 'UX/UI'
  },
  {
    date: 'Nov 15, 2025',
    version: 'v2.0.0',
    title: 'Advanced Analytics & ROI Tracking',
    description: 'Moved beyond vanity metrics. You can now track "Lead Attribution" to see exactly which posts generated inbound DMs and booked calls. Full exportable reports available for board meetings.',
    icon: BarChart3,
    type: 'Analytics'
  },
  {
    date: 'Oct 24, 2025',
    version: 'v1.9.0',
    title: 'LinkedIn API Native Integration',
    description: 'Direct API handshake established. We now support auto-publishing for text, image, and carousel posts without third-party scheduling tools. Reduces latency and improves reach reliability.',
    icon: GitCommit,
    type: 'Integration'
  },
];

export function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[#FCFCFD] overflow-x-hidden pt-20">
      <Navigation />
      
      {/* Process / How It Works Section */}
      <section className="py-24 px-6 border-b border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl font-bold tracking-tight mb-6">How It Works</h2>
            <p className="text-gray-500 max-w-2xl text-lg relative">
              <span className="relative z-10">
                A system designed for founders who refuse to settle for generic content. 
                We combine deep strategic onboarding with an evolving neural engine to ensure 
                every post sounds exactly like you—but consistently brilliant.
              </span>
            </p>
          </div>

          <div className="space-y-24">
            {/* Phase 1 */}
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/3 flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-xl shadow-black/20">
                  01
                </div>
                <h3 className="text-2xl font-bold mb-3">Deep Dive Discovery</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  We don't guess. We download your brain.
                </p>
              </div>
              <div className="md:w-2/3 space-y-6">
                <p className="text-gray-600 leading-relaxed text-lg">
                  It starts with our proprietary <span className="font-semibold text-black">Cognitive Intake System</span>. 
                  We don't just ask "what do you do?" We dig into your counter-narratives, your 
                  unpopular opinions, your founding story, and your sales triggers.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                    <span className="text-gray-600">
                      <strong className="text-gray-900">Brand Voice Analysis:</strong> We ingest your past content, emails, and talks to build a linguistic fingerprint.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                    <span className="text-gray-600">
                      <strong className="text-gray-900">Audience Segmentation:</strong> We map your ideal client profile (ICP) to specific pain points and desire mechanisms.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/3 flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-xl shadow-blue-500/20">
                  02
                </div>
                <h3 className="text-2xl font-bold mb-3">Neural Calibration</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Where human strategy meets machine scale.
                </p>
              </div>
              <div className="md:w-2/3 space-y-6">
                <p className="text-gray-600 leading-relaxed text-lg">
                  We configure your personal <span className="font-semibold text-black">Growth Engine</span>. 
                  This isn't generic GPT wrapper text. We build a custom model trained on your 
                  specific syntax, vocabulary, and rhetorical patterns.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-sm font-bold text-gray-900 mb-1">Syntax Matching</div>
                    <div className="text-xs text-gray-500">Sentence structure & cadence replication</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="text-sm font-bold text-gray-900 mb-1">Tone Slider</div>
                    <div className="text-xs text-gray-500">Adjust from "Professional" to "Provocative"</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/3 flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-gray-100 text-gray-900 flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                  03
                </div>
                <h3 className="text-2xl font-bold mb-3">Execution Loop</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  Review. Refine. Release.
                </p>
              </div>
              <div className="md:w-2/3 space-y-6">
                <p className="text-gray-600 leading-relaxed text-lg">
                  You seek perfection. We provide control. Through the <span className="font-semibold text-black">Client Portal</span>, 
                  you receive batches of high-impact content. You can approve with one click or 
                  request tweaks.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-amber-500 shrink-0" />
                    <span className="text-gray-600">
                      Smart Scheduling based on your audience's active hours.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-gray-600">
                      Zero-risk approval workflow. Nothing goes live without your say.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/3 flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gray-900 text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-xl">
                  04
                </div>
                <h3 className="text-2xl font-bold mb-3">Adaptive Growth</h3>
                <p className="text-gray-500 leading-relaxed text-sm">
                  It gets smarter every week.
                </p>
              </div>
              <div className="md:w-2/3 space-y-6">
                <p className="text-gray-600 leading-relaxed text-lg">
                  This is a closed-loop system. We track exactly which posts drive profile views, 
                  DM conversations, and booked calls. This data feeds back into the engine.
                </p>
                <div className="p-6 rounded-2xl bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <BarChart3 className="w-6 h-6 text-green-400" />
                    <span className="font-semibold">The Compound Effect</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    "Month 1 establishes baseline. Month 3 builds authority. Month 6 dominates the niche. 
                    Our model learns what triggers your specific market."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-20 gap-6">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-4">Product Changelog</h2>
              <p className="text-gray-500 max-w-lg text-lg">
                We ship fast. Here's a timeline of how we're building the future of founder-led growth.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white p-2 pr-4 rounded-full border border-gray-100 shadow-sm">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-600">
                Latest Release: <span className="text-black font-bold">v2.3.0</span>
              </span>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-100 before:via-gray-200 before:to-transparent">
            {updates.map((update, index) => (
              <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                
                {/* Icon Marker */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#FCFCFD] bg-white shadow-sm shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <update.icon className="w-4 h-4 text-blue-600" />
                </div>

                {/* Content Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${ 
                      index === 0 ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-500'
                    }`}>
                      {update.type}
                    </span>
                    <time className="font-mono text-xs text-gray-400">{update.date}</time>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {update.title}
                  </h3>
                  
                  <p className="text-gray-500 leading-relaxed mb-4">
                    {update.description}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
                    <GitCommit className="w-3 h-3" />
                    {update.version}
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
}