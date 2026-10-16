import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function MobileActionBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-gradient-to-t from-[#05070B]/85 via-[#0A0D14]/70 to-[#05070B]/55 backdrop-blur-2xl border-t border-amber-500/30 shadow-[0_-10px_35px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)]">
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        <a
          href="#services"
          className="py-2.5 px-3 rounded-xl bg-[#0A0D14]/60 hover:bg-amber-400/15 backdrop-blur-xl border border-amber-500/30 text-amber-200 font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Services</span>
        </a>

        <a
          href="#contact"
          className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-[0_0_25px_rgba(212,175,55,0.45)] transition-all active:scale-95"
        >
          <span>Start Project</span>
          <ArrowRight className="w-3.5 h-3.5 text-black" />
        </a>
      </div>
    </div>
  );
}
