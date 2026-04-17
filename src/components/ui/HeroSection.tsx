import { Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden h-[600px] lg:h-[900px] bg-gray-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Shopping background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container mx-auto px-4 py-20 sm:py-32 md:py-40 lg:py-48 relative z-10 h-full flex items-center">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-400/20 border border-red-400/40 px-4 py-2 rounded-full text-white text-sm font-semibold mb-8 font-body">
            <Sparkles className="w-4 h-4" />
            <span>New Arrivals Every Week</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
            Shop with{' '}
            <span className="text-red-400">
              Scarabshop
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/90 text-xl sm:text-2xl mb-10 max-w-2xl leading-relaxed font-body">
            Discover amazing products at unbeatable prices. Your one-stop shop for everything you need.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-shop'))}
              className="group px-8 py-4 bg-red-400 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-red-500 transition-all duration-300 hover:scale-105 flex items-center gap-2 font-body"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Start Shopping</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 mt-12 text-white/90 text-sm">
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 font-body">
              <div className="w-2 h-2 bg-red-400 rounded-full" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 font-body">
              <div className="w-2 h-2 bg-red-400 rounded-full" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 font-body">
              <div className="w-2 h-2 bg-red-400 rounded-full" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}