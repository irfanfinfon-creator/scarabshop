import { Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden h-[600px] lg:h-[800px]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Shopping background"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        {/* Additional gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-40 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />

      <div className="container mx-auto px-4 py-20 sm:py-32 md:py-40 lg:py-48 relative z-10 h-full flex items-center">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-full text-white text-sm font-semibold mb-8 animate-pulse shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span>New Arrivals Every Week</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            Shop with{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Scarabshop
              </span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-yellow-400/30 -rotate-1 blur-sm" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/95 text-xl sm:text-2xl mb-10 max-w-2xl leading-relaxed drop-shadow-lg font-medium">
            Discover amazing products at unbeatable prices. Your one-stop shop for everything you need.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('navigate-to-shop'))}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 overflow-hidden"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Start Shopping</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />

              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-xl" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-8 mt-12 text-white/90 text-sm">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="font-medium">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="font-medium">Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="rgb(249, 250, 251)" fillOpacity="1" />
        </svg>
      </div>
    </section>
  );
}
