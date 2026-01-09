import { Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollParallax } from '../hooks/useParallax';

export function AuroraFooter() {
  const scroll = useScrollParallax(0.1);

  return (
    <footer className="relative bg-black text-white py-20 px-6 overflow-hidden perspective-container">
       <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(120,119,198,0.1),transparent_50%)] parallax-layer"
        style={{ transform: `translateY(${scroll.offsetY * 0.1}px)` }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10 perspective-container">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-6 h-6" />
              <span className="tracking-[-0.02em]">Steady Pulse AI</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The complete content operating system for modern teams.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white/90 mb-4 tracking-wide">Product</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Features</a></li>
              <li><Link to="/pricing" className="text-gray-500 hover:text-white transition-colors text-sm">Pricing</Link></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Security</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Changelog</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white/90 mb-4 tracking-wide">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">About</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white/90 mb-4 tracking-wide">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Documentation</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Community</a></li>
              <li><a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Support</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-white/90 mb-4 tracking-wide">Contact Us</h3>
            <ul className="space-y-3">
              <li><a href="mailto:contact@steadypulseai.com" className="text-gray-500 hover:text-white transition-colors text-sm">contact@steadypulseai.com</a></li>
              <li><a href="tel:+1234567890" className="text-gray-500 hover:text-white transition-colors text-sm">+1 (234) 567-890</a></li>
              <li className="text-gray-500 text-sm">123 Main Street<br/>Anytown, USA 12345</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            © 2025 Steady Pulse AI. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a href="https://x.com/whoodatis998" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors text-sm">Twitter</a>
            <a href="https://www.linkedin.com/in/prince-tigga-95b123324" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors text-sm">LinkedIn</a>
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy</Link>
            <Link to="/terms-of-service" className="text-gray-500 hover:text-white transition-colors text-sm">Terms</Link>
            <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
