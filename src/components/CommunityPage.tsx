import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';
import { AuroraFooter } from './AuroraFooter';
import { Users, MessageSquare, Calendar, Trophy, Heart, Star, ExternalLink } from 'lucide-react';

export function CommunityPage() {
  const stats = [
    { label: 'Active Members', value: '10K+', icon: Users },
    { label: 'Discussions', value: '5K+', icon: MessageSquare },
    { label: 'Events Hosted', value: '100+', icon: Calendar },
    { label: 'Success Stories', value: '500+', icon: Trophy }
  ];

  const features = [
    {
      title: 'Discussion Forums',
      description: 'Connect with fellow creators, share ideas, and get feedback on your content strategy.',
      icon: MessageSquare
    },
    {
      title: 'Weekly Webinars',
      description: 'Join our live sessions with industry experts and learn new techniques.',
      icon: Calendar
    },
    {
      title: 'Resource Library',
      description: 'Access templates, guides, and exclusive content from top creators.',
      icon: Star
    },
    {
      title: 'Mentorship Program',
      description: 'Get paired with experienced creators who can guide your journey.',
      icon: Heart
    }
  ];

  const testimonials = [
    {
      quote: "The community helped me grow my audience by 300% in just 6 months!",
      author: "Sarah M.",
      role: "Content Creator"
    },
    {
      quote: "I found my first major brand collaboration through the community.",
      author: "James L.",
      role: "Influencer"
    },
    {
      quote: "The weekly webinars alone are worth it. So much actionable advice!",
      author: "Maria K.",
      role: "Marketing Director"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">Community</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            Join our thriving
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              creator community
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Connect with thousands of content creators, share knowledge, and grow together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors font-medium">
              Join Community <ExternalLink className="w-4 h-4" />
            </a>
            <Link to="/documentation" className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl transition-colors font-medium">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-6">
              <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-light mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-12">What you'll get</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light text-center mb-12">What members say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-white/10">
                <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
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
