export function FooterBottom() {
  const footerLinks = [
    { label: 'About', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  return (
    <div className="relative">
      {/* Gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-6" />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
        {/* Copyright */}
        <p className="text-sm text-gray-400 text-center sm:text-left flex items-center gap-2">
          <span>© 2025 Scarabshop™.</span>
          <span className="hidden sm:inline">All Rights Reserved.</span>
        </p>

        {/* Links */}
        <nav className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-gray-400 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text transition-all duration-300 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>
      </div>

      {/* Social proof badge */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Trusted by 50,000+ customers worldwide</span>
        </div>
      </div>
    </div>
  );
}
