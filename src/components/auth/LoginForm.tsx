import { useState } from 'react';
import { Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface LoginFormProps {
  onToggleMode: () => void;
  onSuccess?: () => void;
}

export function LoginForm({ onToggleMode, onSuccess }: LoginFormProps) {
  // Local state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const { signIn } = useAuth();

  // Password login
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn(email, password);
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    onSuccess?.();
  };

  // Magic link login
  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin },
      });

      if (error) setError(error.message);
      else setMagicLinkSent(true);
    } catch {
      setError('Failed to send magic link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Magic link sent screen
  if (magicLinkSent)
    return (
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-green-600" />
        </div>

        <h3 className="text-lg font-semibold">Check your email!</h3>
        <p className="text-gray-600">
          We've sent a magic link to <strong>{email}</strong>
        </p>

        <p className="text-sm text-gray-500">
          Click the link in the email to sign in. The link will expire in 1 hour.
        </p>

        <button
          onClick={() => {
            setMagicLinkSent(false);
            setEmail('');
          }}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          Use a different email
        </button>
      </div>
    );

  // Login form
  return (
    <form
      onSubmit={useMagicLink ? handleMagicLinkLogin : handlePasswordLogin}
      className="space-y-4"
    >
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Password */}
      {!useMagicLink && (
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {/* Errors */}
      {error && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-semibold transition-colors"
      >
        {loading
          ? useMagicLink
            ? 'Sending link...'
            : 'Signing in...'
          : useMagicLink
            ? 'Send Magic Link'
            : 'Sign In'}
      </button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>

      {/* Toggle auth mode */}
      <button
        type="button"
        onClick={() => {
          setUseMagicLink(!useMagicLink);
          setError('');
        }}
        className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
      >
        <Mail className="w-4 h-4" />
        {useMagicLink ? 'Use Password Instead' : 'Login with Magic Link'}
      </button>

      {/* Switch to signup */}
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onToggleMode}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Sign up
        </button>
      </p>

      {/* Magic link hint */}
      {useMagicLink && (
        <p className="text-xs text-gray-500 text-center">
          No password needed! We'll send you a secure link to sign in.
        </p>
      )}
    </form>
  );
}
