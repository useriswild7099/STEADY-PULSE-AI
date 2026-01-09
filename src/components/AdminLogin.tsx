import { useState } from "react";
import { ArrowLeft, Shield, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      // Assuming admin also logs in via same endpoint, or handle roles check
      const response = await api.post('/auth/login', { email: username, password }); // Map username to email for generic login or separate endpoint
      console.log('Login response:', response);
      if (response.user.role !== 'admin') {
        throw new Error('Unauthorized access: User is not an admin');
      }
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Success
      navigate('/admin-portal');
    } catch (error: any) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please check console.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Subtle Background Effect */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-gray-700/20 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-gray-600/20 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 backdrop-blur-xl bg-white/10 border border-white/10 rounded-full p-3 hover:bg-white/20 transition-all hover:scale-105 shadow-lg group z-50"
      >
        <ArrowLeft className="w-5 h-5 text-white group-hover:-translate-x-0.5 transition-transform" />
      </button>

      {/* Login Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          {/* Logo & Heading */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl tracking-[-0.03em] mb-3 text-white">
              Admin Access
            </h1>
            <p className="text-gray-400">
              Authorized personnel only
            </p>
          </div>

          {/* Login Card */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-white/5 via-white/10 to-white/5 blur-2xl"></div>

            {/* Glass Card */}
            <div className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
              {error && (
                <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                  {error}
                </div>
              )}
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Username Field */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) =>
                        setUsername(e.target.value)
                      }
                      placeholder="admin@steadypulseai.com"
                      className="w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="admin-password"
                    className="block text-sm text-gray-300 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="password"
                      id="admin-password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter admin password"
                      className="w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-white/40 transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* 2FA Notice */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-300 mb-1">
                        Two-factor authentication enabled
                      </p>
                      <p className="text-xs text-gray-500">
                        You'll be prompted for your 2FA code
                        after login
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-black py-4 rounded-2xl hover:bg-gray-100 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing in...' : 'Sign In to Admin Panel'}
                </button>
              </form>

              {/* Security Notice */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-500 text-center">
                  All admin access is logged and monitored for
                  security
                </p>
              </div>
            </div>
          </div>

          {/* Footer Warning */}
          <div className="mt-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-xs text-gray-400 text-center">
              ⚠️ Unauthorized access attempts will be reported
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}