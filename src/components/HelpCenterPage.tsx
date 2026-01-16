import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';
import { AuroraFooter } from './AuroraFooter';
import { HelpCircle, Search, MessageCircle, Book, Video, ChevronRight, Zap } from 'lucide-react';

export function HelpCenterPage() {
  const categories = [
    { title: 'Getting Started', icon: Zap, count: 12, description: 'New to Steady Pulse AI? Start here.' },
    { title: 'Account & Billing', icon: HelpCircle, count: 8, description: 'Manage your account and subscription' },
    { title: 'Content Creation', icon: Book, count: 15, description: 'Learn to create engaging content' },
    { title: 'Troubleshooting', icon: MessageCircle, count: 10, description: 'Fix common issues quickly' }
  ];

  const popularArticles = [
    'How to connect your social media accounts',
    'Understanding AI content generation',
    'Setting up your first campaign',
    'Managing team permissions',
    'Exporting analytics reports',
    'Integrating with third-party tools'
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">Help Center</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            How can we
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              help you?
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Find answers to common questions and learn how to get the most out of Steady Pulse AI.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <a key={idx} href="#" className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                <category.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-medium mb-2 group-hover:text-purple-400 transition-colors">{category.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{category.description}</p>
              <span className="text-xs text-gray-600">{category.count} articles</span>
            </a>
          ))}
        </div>
      </section>

      {/* Popular Articles */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-light mb-8 text-center">Popular Articles</h2>
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 divide-y divide-white/5">
            {popularArticles.map((article, idx) => (
              <a key={idx} href="#" className="flex items-center justify-between p-5 hover:bg-white/5 transition-colors group">
                <span className="group-hover:text-purple-400 transition-colors">{article}</span>
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl p-8 border border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Video className="w-8 h-8 text-purple-400" />
                <div>
                  <h3 className="text-lg font-medium">Prefer video tutorials?</h3>
                  <p className="text-gray-400">Watch our step-by-step video guides</p>
                </div>
              </div>
              <Link to="/community" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors">
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
}
