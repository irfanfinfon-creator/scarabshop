import React from 'react';
import { Mail, Send, Sparkles } from 'lucide-react';

export function NewsletterSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    alert('Thanks for subscribing!');
  };

  return (
    /*bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600*/

    <div className="relative overflow-hidden rounded-lg p-8 lg:p-12">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left side - Content */}
        <div className="text-white text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Exclusive Offers</span>
          </div>

          <h3 className="text-3xl sm:text-4xl font-bold mb-4">
            Get the Latest News!
          </h3>

          <p className="text-base sm:text-lg text-white/90 leading-relaxed">
            Subscribe to our newsletter and be the first to know about new arrivals, exclusive deals, and special promotions.
          </p>

          {/* Benefits */}
          <div className="mt-6 space-y-2 text-sm text-white/80">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <span>Weekly product updates</span>
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <span>Exclusive subscriber discounts</span>
            </div>
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <span>Early access to sales</span>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full">
          <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto lg:ml-auto lg:mr-0">
            <label htmlFor="UserEmail" className="sr-only">Email</label>

            <div className="bg-white/10 backdrop-blur-sm border-2 border-white/30 p-2 rounded-xl flex flex-col sm:flex-row gap-3 shadow-2xl">
              <div className="flex-1 flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3">
                <Mail className="w-5 h-5 text-white/60" />
                <input
                  type="email"
                  id="UserEmail"
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent border-none text-white placeholder-white/60 focus:outline-none text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 text-sm font-bold rounded-lg transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p className="text-xs text-white/60 mt-3 text-center sm:text-left flex items-center gap-1 justify-center sm:justify-start">
              <span>🔒</span>
              <span>We respect your privacy. Unsubscribe anytime.</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
