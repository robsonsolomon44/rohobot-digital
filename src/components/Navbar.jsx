import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { agencyInfo } from '../data/siteData';
import MagneticButton from './ui/MagneticButton';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const isClickScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Who We Work With', href: '#brands' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact Us', href: '#contact' },
  ];

  // Scroll spy to detect the active section dynamically using accurate viewport bounding rects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // If user recently clicked a nav button, do not overwrite until smooth scroll settles
      if (isClickScrollingRef.current) return;

      const sectionIds = ['home', 'brands', 'portfolio', 'services', 'about', 'contact'];

      // Near top of document -> activate Home
      if (window.scrollY < 120) {
        setActiveSection('#home');
        return;
      }

      // Near bottom of document -> activate Contact
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
      if (isAtBottom) {
        setActiveSection('#contact');
        return;
      }

      // Find the section intersecting the focal reading area (35% down viewport)
      const focalPoint = window.innerHeight * 0.35;
      let matched = null;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= focalPoint && rect.bottom >= focalPoint) {
            matched = `#${id}`;
            break;
          }
        }
      }

      if (matched) {
        setActiveSection(matched);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setActiveSection(href);
    setMobileMenuOpen(false);

    // Lock scroll-spy during animated scroll to prevent active state from bouncing
    isClickScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 1000);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth',
      });
    }

    if (window.history.pushState) {
      window.history.pushState(null, '', href);
    } else {
      window.location.hash = href;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#05070B]/60 backdrop-blur-2xl border-b border-amber-500/30 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1),0_0_20px_rgba(212,175,55,0.1)]'
          : 'bg-[#05070B]/40 backdrop-blur-xl border-b border-amber-500/15 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Wordmark in Black & Gold */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <div className="relative w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-600 shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-transform duration-300 group-hover:scale-105">
              <img
                src={agencyInfo.brandImage}
                alt="Rohobot Digital Marketing and Creative Agency"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-lg tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 uppercase">
                ROHOBOT
              </span>
              <span className="text-[9px] tracking-[0.25em] uppercase text-amber-400/80 font-mono font-semibold">
                {agencyInfo.slogan}
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Frosted Glass Island Pill with Dynamic Gold Highlight) */}
          <nav className="hidden xl:flex items-center gap-1.5 rounded-full bg-[#0A0D14]/80 backdrop-blur-2xl border border-amber-500/30 px-3 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.12),0_0_20px_rgba(212,175,55,0.1)]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3.5 py-1 text-xs uppercase tracking-wider font-mono rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-amber-400 text-black font-bold shadow-[0_0_18px_rgba(245,158,11,0.5)] scale-[1.02]'
                      : 'text-slate-300 hover:text-amber-300 hover:bg-amber-400/10'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Right Action Button: Solid Yellow Pill */}
          <div className="hidden sm:flex items-center gap-3">
            <MagneticButton
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              strength={0.3}
              className="px-5 py-2 rounded-full bg-amber-400 hover:bg-yellow-300 text-black text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(245,158,11,0.45)] flex items-center gap-1.5 active:scale-95"
            >
              <span>GET IN TOUCH</span>
              <ArrowRight className="w-3.5 h-3.5 text-black" />
            </MagneticButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2.5 rounded-xl bg-[#0A0D14]/60 backdrop-blur-xl border border-amber-500/30 text-slate-300 hover:text-amber-300 hover:bg-amber-500/10 transition-all focus:outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer (Frosted Glass Sheet) */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 p-5 rounded-2xl bg-[#0A0D14]/75 backdrop-blur-3xl border border-amber-500/30 shadow-[0_20px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.12),0_0_30px_rgba(212,175,55,0.15)] animate-fade-in">
            <div className="flex flex-col space-y-1.5 mb-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3.5 py-2.5 text-xs font-mono uppercase tracking-wider rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-amber-400 text-black font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                        : 'text-slate-200 hover:text-amber-300 hover:bg-amber-400/10 border border-transparent hover:border-amber-500/25'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              <span>Get in Touch →</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
