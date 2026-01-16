import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative backdrop-blur-2xl bg-white/40 border border-white/20 rounded-full shadow-lg shadow-black/5 px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
              <div className="relative">
                <div className="absolute inset-0 bg-black/5 blur-xl rounded-full"></div>
                <TrendingUp className="w-5 h-5 relative z-10 transition-transform group-hover:scale-110" />
              </div>
              <span className="tracking-[-0.02em]">
                Steady Pulse AI
              </span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              <button
                onClick={() => navigate('/features')}
                className="px-4 py-2 text-gray-600 hover:text-black transition-all hover:bg-black/5 rounded-full"
              >
                Services
              </button>
              <button
                onClick={() => navigate('/changelog')}
                className="px-4 py-2 text-gray-600 hover:text-black transition-all hover:bg-black/5 rounded-full"
              >
                How It Works
              </button>
              <button
                onClick={() => navigate('/pricing')}
                className="px-4 py-2 text-gray-600 hover:text-black transition-all hover:bg-black/5 rounded-full"
              >
                Pricing
              </button>
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/client-login')}
                className="text-gray-700 hover:text-black transition-colors px-4 py-2"
              >
                Client Login
              </button>
              <button className="relative group overflow-hidden bg-black text-white px-5 py-2 rounded-full transition-all hover:scale-105 hover:shadow-xl hover:shadow-black/20">
                <span className="relative z-10">
                  Book a Call
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}