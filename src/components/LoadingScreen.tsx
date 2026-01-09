import { TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const quotes = [
  "Great content isn't built in a day. But your empire starts today.",
  "Rome wasn't built in a day, but they were laying bricks every hour.",
  "Your future self is already thanking you for this.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "The best time to start was yesterday. The second best time is now.",
  "Patience is not about waiting. It's about how you act while waiting.",
  "Every expert was once a beginner who refused to give up.",
  "Your LinkedIn game is about to level up. Buckle up.",
  "Good things take time. Great things take a little longer.",
  "The journey of a thousand posts begins with a single form.",
  "While you wait, your competitors are still procrastinating.",
  "Excellence is not an act, but a habit we're building together.",
  "This brief pause is the calm before your content storm.",
  "Investing in yourself is the best investment you'll ever make.",
  "The grind never stops, but smart people know when to delegate.",
  "Your personal brand is your most valuable asset. Let's build it.",
  "Loading your future... it's looking pretty awesome from here.",
  "Great brands aren't born. They're crafted, refined, and amplified.",
  "In a world of noise, we're crafting your signal.",
  "The algorithm favors the bold. And you're about to get bold.",
];

export function LoadingScreen() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [fadeClass, setFadeClass] = useState('opacity-100');

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setFadeClass('opacity-0');
      
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setFadeClass('opacity-100');
      }, 500);
    }, 3500);

    return () => clearInterval(quoteInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#FCFCFD] z-50 flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-gradient-to-br from-gray-300/50 via-gray-200/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-gradient-to-tl from-gray-200/40 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Logo with Animation */}
        <div className="mb-12 animate-float">
          <div className="inline-flex items-center gap-3 backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl px-6 py-4 shadow-lg">
            <div className="relative">
              <div className="absolute inset-0 bg-black/10 blur-xl rounded-full"></div>
              <TrendingUp className="w-8 h-8 relative z-10" />
            </div>
            <span className="text-2xl tracking-[-0.02em]">Steady Pulse AI</span>
          </div>
        </div>

        {/* Quote Display */}
        <div className="mb-12 min-h-[120px] flex items-center justify-center">
          <p 
            className={`text-2xl md:text-3xl lg:text-4xl tracking-[-0.02em] leading-relaxed transition-opacity duration-500 ${fadeClass}`}
          >
            "{quotes[currentQuote]}"
          </p>
        </div>

        {/* Loading Indicator */}
        <div className="flex flex-col items-center gap-6">
          {/* Animated Dots */}
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-black animate-bounce"></div>
            <div className="w-3 h-3 rounded-full bg-black animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 rounded-full bg-black animate-bounce" style={{ animationDelay: '0.4s' }}></div>
          </div>

          {/* Loading Bar */}
          <div className="w-64 h-1 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-xl">
            <div className="h-full bg-gradient-to-r from-gray-600 via-black to-gray-600 animate-loading-bar"></div>
          </div>

          <p className="text-sm text-gray-500">Preparing your experience...</p>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
