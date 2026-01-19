import { TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const quotes = [
  // 🧠 Technical & AI-Focused
  "Calibrating neural synapses...",
  "Aligning the vector space for maximum accuracy.",
  "Training the model on \"patience\" (ETA: 5 seconds).",
  "Fine-tuning the weights and biases.",
  "Optimizing gradient descent for a smoother experience.",
  "Initializing deep learning modules...",
  "Distilling the data into insights.",
  "Fetching cloud-native intelligence.",
  "Reticulating 1s and 0s.",
  "Synchronizing the digital heartbeat.",
  "Analyzing pattern recognition matrices.",
  "Resolving latent space variables.",
  "Compiling the logic of tomorrow.",

  // 😂 Humorous & Relatable
  "Teaching the AI how to appreciate coffee.",
  "Shoveling more data into the furnace.",
  "Looking for the \"Any\" key... still haven't found it.",
  "I'm not slow, I'm just being thorough.",
  "Convincing the servers to cooperate today.",
  "Translating \"Beep Boop\" into English for you.",
  "Counting to infinity... please wait.",
  "Looking for a needle in a digital haystack.",
  "The pixels are currently taking a nap.",
  "Adding more \"Intelligence\" to the Artificial.",
  "Please wait—the AI is having a \"Eureka\" moment.",
  "Loading... because even computers need to think.",

  // 📈 Marketing & Branding
  "Keeping your brand's pulse steady.",
  "Where data meets intuition.",
  "Powering the heartbeat of your digital strategy.",
  "Precision in every pulse.",
  "Elevating your brand with every byte.",
  "Your brand, amplified by intelligence.",
  "The steady path to smarter results.",
  "Real-time insights, real-time growth.",
  "Connecting the dots you didn't know existed.",
  "Beyond the buzzwords. Into the results.",
  "Your competitive edge is loading.",
  "Crafting the future of your online presence.",

  // 💼 Business & Strategy
  "Turning raw data into ROI.",
  "Efficiency is our middle name. (Actually, it's Pulse).",
  "Transforming complexity into clarity.",
  "Scaling your vision through automation.",
  "Disrupting the status quo, one pulse at a time.",
  "Strategy is just a really good algorithm.",
  "Future-proofing your business operations.",
  "High performance. Low friction.",
  "Maximizing output, minimizing effort.",
  "Bridging the gap between data and profit.",
  "The science of staying ahead of the curve.",
  "Optimizing the roadmap to your success.",
  "Your data is working hard so you don't have to.",
];

export function LoadingScreen() {
  const [currentQuote, setCurrentQuote] = useState(() => Math.floor(Math.random() * quotes.length));
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
