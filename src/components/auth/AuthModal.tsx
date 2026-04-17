import { useState } from 'react';
import { X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-gray-950"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-heading font-bold mb-6 text-gray-950">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>

        {mode === 'login' ? (
          <LoginForm onToggleMode={() => setMode('signup')} onSuccess={handleSuccess} />
        ) : (
          <SignUpForm onToggleMode={() => setMode('login')} onSuccess={handleSuccess} />
        )}
      </div>
    </div>
  );
}
