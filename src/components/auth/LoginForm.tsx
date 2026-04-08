import { useState } from 'react';
import { Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface LoginFormProps {
  onToggleMode: () => void;
  onSuccess?: () => void;
}

export function LoginForm({ onToggleMode, onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const { signIn } = useAuth();

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

  if (magicLinkSent)
    return (
      <div className="space-y-4 text-center">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8 text-accent" />
        </div>

        <h3 className="text-lg font-heading font-semibold text-primary">Check your email!</h3>
        <p className="text-secondary font-body">
          We've sent a magic link to <strong>{email}</strong>
        </p>

        <p className="text-sm text-secondary font-body">
          Click the link in the email to sign in. The link will expire in 1 hour.
        </p>

        <button
          onClick={() => {
            setMagicLinkSent(false);
            setEmail('');
          }}
          className="text-accent hover:text-accent-dark font-medium text-sm font-body"
        >
          Use a different email
        </button>
      </div>
    );

  return (
    <form
      onSubmit={useMagicLink ? handleMagicLinkLogin : handlePasswordLogin}
      className="space-y-4"
    >
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1 text-primary font-body">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none font-body"
        />
      </div>

      {!useMagicLink && (
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1 text-primary font-body">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:outline-none font-body"
          />
        </div>
      )}

      {error && (
        <div className="bg-accent/10 text-accent px-4 py-3 rounded-lg text-sm font-body">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent-dark disabled:opacity-50 font-semibold transition-colors font-body"
      >
        {loading
          ? useMagicLink
            ? 'Sending link...'
            : 'Signing in...'
          : useMagicLink
            ? 'Send Magic Link'
            : 'Sign In'}
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-secondary font-body">or</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setUseMagicLink(!useMagicLink);
          setError('');
        }}
        className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium font-body"
      >
        <Mail className="w-4 h-4" />
        {useMagicLink ? 'Use Password Instead' : 'Login with Magic Link'}
      </button>

      <p className="text-center text-sm text-secondary font-body">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={onToggleMode}
          className="text-accent hover:text-accent-dark font-medium"
        >
          Sign up
        </button>
      </p>

      {useMagicLink && (
        <p className="text-xs text-secondary text-center font-body">
          No password needed! We'll send you a secure link to sign in.
        </p>
      )}
    </form>
  );
}