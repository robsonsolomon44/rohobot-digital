import React from 'react';
import { Sparkles, Target, Compass, Eye, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { agencyInfo } from '../data/siteData';
import TiltCard3D from './ui/TiltCard3D';

export default function AboutUs() {
  const { about } = agencyInfo;

  return (
    <section id="about" className="py-24 bg-[#05070B] relative border-t border-amber-500/15 overflow-hidden">
      {/* Background ambient gold glow */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-amber-500/10 blur-[60px] md:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-yellow-600/5 blur-[50px] md:blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* 1. About Us Header & Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-mono text-amber-400 mb-4 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{about.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-6">
            Creativity, Strategy &amp; Storytelling Built for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
              Sustainable Growth.
            </span>
          </h2>
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p className="text-white font-medium text-base sm:text-lg">
              {about.summary}
            </p>
            {about.paragraphs.map((para, idx) => (
              <p key={idx} className="text-slate-300">
                {para}
              </p>
            ))}
          </div>
        </motion.div>

        {/* 2 & 3. Mission & Vision 3D Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <TiltCard3D depth={30} glare={true} className="bg-[#0A0D14] border border-amber-500/25 h-full">
              <div className="p-8 h-full flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#10141E] border border-amber-500/30 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                    <Compass className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400/90 font-bold block mb-2">
                    01 • Our Mission
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3 group-hover:text-amber-300 transition-colors">
                    To Help Businesses Grow and Stand Out
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {about.mission.desc}
                  </p>
                </div>
              </div>
            </TiltCard3D>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <TiltCard3D depth={30} glare={true} className="bg-[#0A0D14] border border-amber-500/25 h-full">
              <div className="p-8 h-full flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#10141E] border border-amber-500/30 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                    <Eye className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400/90 font-bold block mb-2">
                    02 • Our Vision
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3 group-hover:text-amber-300 transition-colors">
                    Leading Creative Agency in Ethiopia
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {about.vision.desc}
                  </p>
                </div>
              </div>
            </TiltCard3D>
          </motion.div>
        </div>

        {/* 4. Our Objectives Grid (7 Exact Objectives from brief) */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 font-bold block mb-1">
              03 • Strategic Roadmap
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              Our Core Objectives
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Every campaign, video, and design asset is aligned with these pillars of sustainable business growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {about.objectives.map((obj, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <TiltCard3D depth={15} glare={true} className="bg-[#0A0D14] border border-amber-500/20 h-full">
                  <div className="p-5 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-amber-400">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                        <h4 className="font-heading font-bold text-sm text-white">
                          {obj.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {obj.desc}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 mt-3 pt-2 border-t border-amber-500/10">
                      Objective 0{idx + 1}
                    </span>
                  </div>
                </TiltCard3D>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
