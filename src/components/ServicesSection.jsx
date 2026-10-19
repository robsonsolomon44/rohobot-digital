import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Video,
  Camera,
  Share2,
  Target,
  Megaphone,
  Palette,
  Check,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { agencyInfo } from '../data/siteData';
import TiltCard3D from './ui/TiltCard3D';

export default function ServicesSection({ onSelectService }) {
  const { services, whyChooseUs } = agencyInfo;

  const getServiceIcon = (id) => {
    switch (id) {
      case 'social-media':
        return <Share2 className="w-5 h-5 text-amber-400" />;
      case 'video-content':
        return <Video className="w-5 h-5 text-amber-400" />;
      case 'photography':
        return <Camera className="w-5 h-5 text-amber-400" />;
      case 'digital-strategy':
        return <Target className="w-5 h-5 text-amber-400" />;
      case 'paid-ads':
        return <Megaphone className="w-5 h-5 text-amber-400" />;
      case 'graphic-design':
        return <Palette className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#05070B] relative border-t border-amber-500/15 overflow-hidden">
      {/* Background ambient gold glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/10 blur-[60px] md:blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-mono text-amber-400 mb-3 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Spectrum Creative &amp; Marketing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
              Our Core{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
                Services
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              From short-form viral videos and professional shoots to paid Meta Ads and strategic content planning—engineered to give your brand room to grow.
            </p>
          </div>

          <div className="mt-4 md:mt-0 font-mono text-xs text-amber-400/80 bg-[#0A0D14] px-3 py-1.5 rounded-full border border-amber-500/20">
            6 Specialized Service Lines
          </div>
        </motion.div>

        {/* 6 Services Grid in 3D Spatial Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="h-full"
            >
              <TiltCard3D depth={25} glare={true} className="h-full bg-[#0A0D14] border border-amber-500/20">
                <div className="p-7 sm:p-8 flex flex-col justify-between h-full group">
                  <div>
                    {/* Header of Card */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-xl bg-[#10141E] border border-amber-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                        {getServiceIcon(service.id)}
                      </div>
                      <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-[#10141E] text-amber-300 border border-amber-500/20">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white font-heading mb-2.5 group-hover:text-amber-300 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                      {service.desc}
                    </p>

                    {/* Service Includes Breakdown from User Brief */}
                    <div className="space-y-2 mb-6 pt-4 border-t border-amber-500/15">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold block mb-2">
                        Includes:
                      </span>
                      {service.items.map((item, iIdx) => (
                        <div key={iIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <Check className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                      {service.note && (
                        <p className="text-[11px] font-mono text-slate-400 italic pt-2 border-t border-amber-500/10">
                          * {service.note}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <a
                    href="#contact"
                    onClick={() => {
                      if (onSelectService) onSelectService(service.title);
                    }}
                    className="pt-4 border-t border-amber-500/15 flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-amber-400 group-hover:text-amber-300 transition-colors"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </TiltCard3D>
            </motion.div>
          ))}
        </div>

        {/* 7. Why Choose ROHOBOT? Grid */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 sm:p-12 rounded-3xl bg-[#0A0D14] border border-amber-500/30 shadow-[0_15px_45px_rgba(0,0,0,0.9)]"
        >
          <div className="max-w-2xl mb-10 text-center sm:text-left">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 font-bold block mb-2">
              Our Creative Difference
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Why Choose ROHOBOT?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              We reject generic templates and empty marketing buzzwords. Here is how we deliver real impact.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((reason, idx) => (
              <TiltCard3D key={idx} depth={15} glare={true} className="bg-[#05070B] border border-amber-500/20">
                <div className="p-5 h-full flex flex-col justify-between">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      0{idx + 1}
                    </span>
                    <h4 className="font-heading font-bold text-sm text-white">
                      {reason.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </TiltCard3D>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
