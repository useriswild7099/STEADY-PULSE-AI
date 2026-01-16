import { Navigation } from './Navigation';
import { AuroraFooter } from './AuroraFooter';
import { Phone, Mail, MessageCircle, Heart } from 'lucide-react';

export function ContactUsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Founder's Message Card */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-12">
            
            {/* Personal Touch Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Heart className="w-10 h-10 text-purple-400" />
              </div>
            </div>

            {/* Message */}
            <blockquote className="text-center mb-10">
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-6 italic">
                "I built Steady Pulse because I believe you deserve unbiased, organic results. We don't hide behind ads or algorithms."
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                I am personally committed to this platform's integrity. If you face any issues, tell me directly.
              </p>
            </blockquote>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-10"></div>

            {/* Contact Methods */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              
              {/* WhatsApp/Phone */}
              <a 
                href="https://wa.me/917099580081" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-2xl p-6 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-7 h-7 text-green-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Text/WhatsApp Preferred</div>
                  <div className="text-lg font-medium text-white">+91 7099580081</div>
                </div>
              </a>

              {/* Email */}
              <a 
                href="mailto:steadypulse.ai@proton.me"
                className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-2xl p-6 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-7 h-7 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Email</div>
                  <div className="text-lg font-medium text-white break-all">steadypulse.ai@proton.me</div>
                </div>
              </a>
            </div>
          </div>

          {/* Response Time Note */}
          <div className="text-center text-gray-500 text-sm">
            <p>I personally respond to every message. Expect a reply within 24 hours.</p>
          </div>

        </div>
      </section>

      <AuroraFooter />
    </div>
  );
}
