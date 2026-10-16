import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { agencyInfo } from '../data/siteData';
import TiltCard3D from './ui/TiltCard3D';

export default function OurProcess() {
  const { process, promise } = agencyInfo;
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="py-24 bg-[#05070B] relative border-t border-amber-500/15 overflow-hidden">
      {/* Background ambient gold glow */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[500px] bg-amber-500/10 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-mono text-amber-400 mb-4 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>How We Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            Our 5-Step{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
              Process
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From discovering your brand story to analyzing real business outcomes—here is our structured path to sustainable growth.
          </p>
        </motion.div>

        {/* 5 Process Step Cards with TiltCard3D */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 mb-16">
          {process.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setActiveStep(idx)}
              className="cursor-pointer h-full"
            >
              <TiltCard3D
                depth={20}
                glare={true}
                className={`h-full transition-all duration-300 ${
                  activeStep === idx
                    ? 'bg-[#10141E] border-amber-400 shadow-[0_0_30px_rgba(212,175,55,0.3)]'
                    : 'bg-[#0A0D14] border-amber-500/20 hover:border-amber-500/40'
                }`}
              >
                <div className="p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
                        Step {idx + 1}
                      </span>
                      <span className="text-[10px] font-mono text-amber-300 bg-[#05070B] px-2 py-0.5 rounded border border-amber-500/20">
                        {p.timeline}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-base sm:text-lg text-white mb-2">
                      {p.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {p.desc}
                    </p>
                  </div>

                  {/* Items checklist */}
                  <div className="space-y-1 pt-3 border-t border-amber-500/15">
                    {p.items.map((item, iIdx) => (
                      <div key={iIdx} className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                        <Check className="w-3 h-3 text-amber-400 flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard3D>
            </motion.div>
          ))}
        </div>

        {/* 10. Our Promise Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <TiltCard3D depth={20} glare={true} className="bg-gradient-to-br from-[#10141E] via-[#0A0D14] to-[#05070B] border border-amber-500/35">
            <div className="p-8 sm:p-12 text-center relative overflow-hidden">
              <div className="max-w-3xl mx-auto space-y-4">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-bold block">
                  10 • Our Promise
                </span>
                <blockquote className="text-base sm:text-xl text-white font-heading font-semibold leading-relaxed italic">
                  "{promise.quote}"
                </blockquote>
                <div className="pt-2">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                    {promise.tagline}
                  </span>
                </div>
              </div>
            </div>
          </TiltCard3D>
        </motion.div>
      </div>
    </section>
  );
}
