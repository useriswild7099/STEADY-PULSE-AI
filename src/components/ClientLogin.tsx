import { useState, useEffect } from 'react';
import { ArrowLeft, Lock, Mail, Phone, Eye, EyeOff, Check, X, CheckCircle } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { ParentCompanyBadge } from './ui/ParentCompanyBadge';

// Password strength checker
const checkPasswordStrength = (password: string) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };
  const score = Object.values(checks).filter(Boolean).length;
  return { checks, score, isStrong: score === 4 };
};

export function ClientLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(!location.state?.isSignup);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Success splash state
  const [showSuccessSplash, setShowSuccessSplash] = useState(false);
  const [countdown, setCountdown] = useState(3);

  // Password validation
  const passwordStrength = checkPasswordStrength(password);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  // Countdown effect for success splash
  useEffect(() => {
    if (showSuccessSplash && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (showSuccessSplash && countdown === 0) {
      setShowSuccessSplash(false);
      setIsLogin(true);
      // Reset form
      setPassword('');
      setConfirmPassword('');
      setPhone('');
      setCountryCode('+91');
      setAgreeTerms(false);
    }
  }, [showSuccessSplash, countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation for registration
    if (!isLogin) {
      if (!passwordStrength.isStrong) {
        setError('Please create a stronger password');
        return;
      }
      if (!passwordsMatch) {
        setError('Passwords do not match');
        return;
      }
      if (!agreeTerms) {
        setError('Please agree to the Terms & Privacy Policy');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // Login flow
        const response = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        navigate('/client-portal');
      } else {
        // Registration flow
        await api.post('/auth/register', { email, password, phone: `${countryCode} ${phone}` });
        // Show success splash
        setShowSuccessSplash(true);
        setCountdown(3);
      }
    } catch (error: any) {
      setError(error.message || (isLogin ? 'Login failed' : 'Registration failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'linkedin') => {
    const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');
    window.location.href = `${API_URL}/auth/${provider}`;
  };

  // Success Splash Screen
  if (showSuccessSplash) {
    return (
      <div className="min-h-screen bg-[#FCFCFD] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-8 animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl tracking-[-0.03em] mb-4">
            Account Created Successfully!
          </h1>
          <p className="text-xl text-gray-500 mb-8">
            Redirecting to login in {countdown} seconds...
          </p>
          <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
            <div 
              className="h-full bg-green-500 transition-all duration-1000 ease-linear"
              style={{ width: `${((3 - countdown) / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFCFD] relative overflow-hidden">
      {/* Background */}
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
          <div className="text-center mb-8">
            <div className="flex flex-col items-center mb-6">
              <img 
                src="/logo.png" 
                alt="Steady Pulse AI" 
                className="h-16 w-auto mb-3 rounded-lg"
              />
              <span className="text-2xl tracking-[-0.02em] mb-2">Steady Pulse AI</span>
              <ParentCompanyBadge variant="light" />
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
            <div className="absolute -inset-4 bg-gradient-to-r from-gray-200/30 via-transparent to-gray-200/30 blur-2xl"></div>

            <div className="relative backdrop-blur-2xl bg-white/60 border border-white/30 rounded-3xl p-8 shadow-2xl shadow-black/10">
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
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

                {/* Phone Field - Registration Only */}
                {!isLogin && (
                  <div>
                    <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      {/* Country Code Selector */}
                      <div className="relative">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="appearance-none backdrop-blur-xl bg-white/50 border border-white/40 rounded-2xl px-4 py-4 pr-8 focus:outline-none focus:border-gray-400 transition-colors text-gray-700 cursor-pointer"
                        >
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+49">🇩🇪 +49</option>
                          <option value="+33">🇫🇷 +33</option>
                          <option value="+81">🇯🇵 +81</option>
                          <option value="+86">🇨🇳 +86</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+65">🇸🇬 +65</option>
                          <option value="+966">🇸🇦 +966</option>
                          <option value="+55">🇧🇷 +55</option>
                          <option value="+52">🇲🇽 +52</option>
                          <option value="+234">🇳🇬 +234</option>
                          <option value="+27">🇿🇦 +27</option>
                        </select>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {/* Phone Input */}
                      <div className="relative flex-1">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="(555) 000-0000"
                          className="w-full backdrop-blur-xl bg-white/50 border border-white/40 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-gray-400 transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isLogin ? 'Enter your password' : 'Create a strong password'}
                      className="w-full backdrop-blur-xl bg-white/50 border border-white/40 rounded-2xl pl-12 pr-12 py-4 focus:outline-none focus:border-gray-400 transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator - Registration Only */}
                  {!isLogin && password.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {/* Strength Bar */}
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-1.5 flex-1 rounded-full transition-colors ${
                              passwordStrength.score >= level
                                ? passwordStrength.score <= 2
                                  ? 'bg-red-400'
                                  : passwordStrength.score === 3
                                  ? 'bg-yellow-400'
                                  : 'bg-green-500'
                                : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      {/* Requirements */}
                      <div className="grid grid-cols-2 gap-1 text-xs">
                        {[
                          { key: 'length', label: '8+ characters' },
                          { key: 'uppercase', label: 'Uppercase' },
                          { key: 'lowercase', label: 'Lowercase' },
                          { key: 'number', label: 'Number' },
                        ].map(({ key, label }) => (
                          <div key={key} className={`flex items-center gap-1 ${passwordStrength.checks[key as keyof typeof passwordStrength.checks] ? 'text-green-600' : 'text-gray-400'}`}>
                            {passwordStrength.checks[key as keyof typeof passwordStrength.checks] ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                            {label}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field - Registration Only */}
                {!isLogin && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className={`w-full backdrop-blur-xl bg-white/50 border rounded-2xl pl-12 pr-12 py-4 focus:outline-none transition-colors ${
                          confirmPassword.length > 0
                            ? passwordsMatch
                              ? 'border-green-400'
                              : 'border-red-400'
                            : 'border-white/40 focus:border-gray-400'
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {confirmPassword.length > 0 && (
                      <p className={`mt-1 text-xs flex items-center gap-1 ${passwordsMatch ? 'text-green-600' : 'text-red-500'}`}>
                        {passwordsMatch ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
                      </p>
                    )}
                  </div>
                )}

                {/* Remember & Forgot / Terms */}
                <div className="flex items-start">
                  {isLogin ? (
                    <div className="flex items-center justify-between w-full">
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
                    </div>
                  ) : (
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded border-gray-300 text-black focus:ring-0 focus:ring-offset-0"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-black transition-colors">
                        I agree to the{' '}
                        <Link to="/terms-of-service" className="text-black underline hover:no-underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy-policy" className="text-black underline hover:no-underline">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || (!isLogin && (!passwordStrength.isStrong || !passwordsMatch || !agreeTerms))}
                  className="w-full bg-black text-white py-4 rounded-2xl hover:bg-gray-800 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {isLogin ? 'Signing in...' : 'Creating account...'}
                    </span>
                  ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </button>
              </form>

              {/* Toggle Login/Signup */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setPassword('');
                    setConfirmPassword('');
                  }}
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
              <div className="flex justify-center">
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="w-full backdrop-blur-xl bg-white/40 border border-white/40 rounded-2xl py-3 hover:bg-white/60 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="text-sm">Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}