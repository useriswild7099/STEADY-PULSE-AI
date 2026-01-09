import { useState } from 'react';
import { ArrowLeft, TrendingUp, Lock, Mail } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../lib/api';

export function ClientLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(!location.state?.isSignup);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Added for registration if we want to capture name, but User model doesn't have name yet? User model has email, password, role, onboardingData. Let's stick to email/password for now to match backend.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const response = await api.post(endpoint, { email, password });

      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/client-portal');
    } catch (error: any) {
      alert(error.message || (isLogin ? 'Login failed' : 'Registration failed'));
    }
  };



  const handleSocialLogin = (provider: 'google' | 'linkedin') => {
    window.location.href = `http://localhost:5000/api/auth/${provider}`;
  };

  return (
    <div className="min-h-screen bg-[#FCFCFD] relative overflow-hidden">
      {/* ... Background ... */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-gray-200/40 via-transparent to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-gray-100/30 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 backdrop-blur-xl bg-white/40 border border-white/20 rounded-full p-3 hover:bg-white/60 transition-all hover:scale-105 shadow-lg group z-50"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Admin Login - Small & Subtle */}
      <button
        onClick={() => navigate('/admin-login')}
        className="absolute top-8 right-8 text-[11px] text-gray-400/80 hover:text-gray-600 transition-colors tracking-wider uppercase z-50"
      >
        admin
      </button>

      {/* Login Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          {/* Logo & Heading */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-black/5 blur-xl rounded-full"></div>
                <TrendingUp className="w-8 h-8 relative z-10" />
              </div>
              <span className="text-2xl tracking-[-0.02em]">Steady Pulse AI</span>
            </div>
            <h1 className="text-4xl md:text-5xl tracking-[-0.03em] mb-3">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-500">
              {isLogin ? 'Sign in to access your content portal' : 'Start your journey with us'}
            </p>
          </div>

          {/* Login Card */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-gray-200/30 via-transparent to-gray-200/30 blur-2xl"></div>

            {/* Glass Card */}
            <div className="relative backdrop-blur-2xl bg-white/60 border border-white/30 rounded-3xl p-8 shadow-2xl shadow-black/10">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full backdrop-blur-xl bg-white/50 border border-white/40 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-gray-400 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full backdrop-blur-xl bg-white/50 border border-white/40 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-gray-400 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Remember & Forgot / Terms */}
                <div className="flex items-center justify-between">
                  {isLogin ? (
                    <>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-black focus:ring-0 focus:ring-offset-0"
                        />
                        <span className="text-sm text-gray-600 group-hover:text-black transition-colors">
                          Remember me
                        </span>
                      </label>
                      <button
                        type="button"
                        className="text-sm text-gray-600 hover:text-black transition-colors"
                      >
                        Forgot password?
                      </button>
                    </>
                  ) : (
                    <div className="text-xs text-gray-500">
                      By creating an account, you agree to our Terms & Privacy.
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20"
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              {/* Toggle Login/Signup */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-gray-500 hover:text-black transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300/50"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 text-sm text-gray-500 backdrop-blur-xl bg-white/60">
                    or continue with
                  </span>
                </div>
              </div>

              {/* SSO Options */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="backdrop-blur-xl bg-white/40 border border-white/40 rounded-2xl py-3 hover:bg-white/60 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="text-sm">Google</span>
                </button>
                <button
                  onClick={() => handleSocialLogin('linkedin')}
                  className="backdrop-blur-xl bg-white/40 border border-white/40 rounded-2xl py-3 hover:bg-white/60 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="text-sm">LinkedIn</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Text */}
          <p className="text-center text-sm text-gray-500 mt-8">
            New to Steady Pulse AI?{' '}
            <button
              onClick={() => setIsLogin(false)}
              className="text-black hover:underline"
            >
              Contact us to get started (or Register above)
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}