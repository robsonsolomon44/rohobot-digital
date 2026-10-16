import React from 'react';
import {
  ArrowUp,
  Mail,
  Send,
} from 'lucide-react';
import { agencyInfo } from '../data/siteData';
import {
  InstagramIcon,
  TikTokIcon,
  WhatsAppIcon,
  LinkedInIcon,
} from './icons/SocialIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerNav = [
    { name: 'Home', href: '#home' },
    { name: 'Who We Work With', href: '#brands' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <footer className="bg-[#05070B] border-t border-amber-500/15 pt-16 pb-24 md:pb-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 to-amber-600 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                <img
                  src={agencyInfo.brandImage}
                  alt="Rohobot Digital Marketing & Creative Agency"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-lg text-white tracking-wider uppercase">
                  ROHOBOT
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-amber-400/90 font-mono font-medium">
                  {agencyInfo.slogan}
                </span>
              </div>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Digital Marketing and Creative Agency. We engineer high-converting digital platforms, produce viral creative campaigns, and scale performance marketing.
            </p>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A0D14] border border-amber-500/20 text-[11px] font-mono text-amber-400 w-fit">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Direct WhatsApp &amp; Telegram Channel</span>
            </div>
          </div>

          {/* Quick Navigation (7 sections) */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {footerNav.slice(0, 4).map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className="hover:text-amber-400 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-sm text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {footerNav.slice(4).map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className="hover:text-amber-400 transition-colors">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Socials with Original Icons */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${agencyInfo.contact.email}`}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>{agencyInfo.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/251943395205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2 group"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>WhatsApp: +251 943 395 205</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@robi.digitalmarketing?_r=1&_t=ZS-9AXsn0n2jbN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2 group"
                >
                  <TikTokIcon className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>TikTok: @robi.digitalmarketing</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/robihabeshawi_?srtk=YTlxdm5iOWk0dGhv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2 group"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>Instagram: @robihabeshawi_</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/robera-solomon-561a43366?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors flex items-center gap-2 group"
                >
                  <LinkedInIcon className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>LinkedIn: Robera Solomon</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-amber-500/15 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <div>
            © {new Date().getFullYear()} Rohobot Digital Marketing and Creative Agency. Room to Grow.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-slate-400 hover:text-amber-300 transition-colors px-2.5 py-1 rounded bg-[#0A0D14] border border-amber-500/20"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
