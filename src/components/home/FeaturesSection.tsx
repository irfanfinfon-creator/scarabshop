import { Zap, Shield, TrendingUp, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Zap className="w-10 h-10" />,
    title: 'Lightning Fast',
    description: 'Experience instant checkout and real-time delivery tracking without any lag. Our ultra-low latency infrastructure ensures your transaction is secured and moving in milliseconds.',
    accent: 'bg-red-400',
    gridClass: 'md:col-span-2 lg:col-span-2 lg:row-span-2',
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Secure Payments',
    description: 'Enterprise-grade protection.',
    accent: 'bg-gray-950',
    gridClass: 'md:col-span-1 lg:col-span-2 lg:row-span-1',
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: 'Best Prices',
    description: 'Exclusive daily deals.',
    accent: 'bg-gray-500',
    gridClass: 'md:col-span-1 lg:col-span-1 lg:row-span-1',
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'Premium Quality',
    description: 'Curated trusted brands.',
    accent: 'bg-red-500',
    gridClass: 'md:col-span-1 lg:col-span-1 lg:row-span-1',
  },
];

const stats = [
  { num: '100+', label: 'Products', gridClass: 'md:col-span-1 lg:col-span-1' },
  { num: '50k+', label: 'Customers', gridClass: 'md:col-span-1 lg:col-span-1' },
  { num: '4.9★', label: 'Top Rating', gridClass: 'md:col-span-2 lg:col-span-2' },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gray-50 overflow-hidden relative">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-red-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gray-950/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-950 mb-6 animate-fadeIn">
            Elevate Your Shopping Experience
          </h2>
          <div className="w-20 h-1.5 bg-red-400 mx-auto rounded-full mb-8" />
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-body leading-relaxed">
            Discover a platform designed for modern consumers who value speed, security, and world-class quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[200px]">
          {/* Feature Cards */}
          {features.map((f, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 border border-white/50 bg-white/80 backdrop-blur-sm ${f.gridClass}`}
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className={`inline-flex p-3 rounded-2xl ${f.accent} text-white mb-2 shadow-lg transform group-hover:scale-110 transition-transform duration-500`}>
                    {f.icon}
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-gray-950 group-hover:text-red-400 transition-colors duration-300">
                    {f.title}
                  </h3>
                  <p className="text-gray-500 py-2 leading-relaxed font-body text-base">
                    {f.description}
                  </p>
                </div>
              </div>

              {/* Decorative Gradient Overlay */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-red-400/5 rounded-full blur-2xl group-hover:bg-red-400/10 transition-colors duration-500" />
            </div>
          ))}

          {/* Stats Cards */}
          {stats.map((s, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-[2rem] p-8 bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-center items-center text-center ${s.gridClass}`}
            >
              <div className="text-5xl font-body font-black text-red-400 mb-3 tracking-tighter group-hover:scale-110 transition-transform duration-500">
                {s.num}
              </div>
              <div className="text-gray-950 font-body uppercase tracking-[0.2em] text-sm font-bold">
                {s.label}
              </div>

              {/* Decorative accent line */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-red-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}