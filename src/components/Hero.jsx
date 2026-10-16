import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { agencyInfo } from '../data/siteData';
import MagneticButton from './ui/MagneticButton';

const HEADLINE_LINES = [
  { text: 'Where Creative', isGold: false },
  { text: 'Storytelling Meets', isGold: false },
  { text: 'Strategic Digital', isGold: true },
  { text: 'Growth.', isGold: true },
];

// Precompute characters with global indices for seamless stagger cascading
let runningCharIndex = 0;
const PRECOMPUTED_LINES = HEADLINE_LINES.map((line) => {
  const words = line.text.split(' ').map((word) => {
    const chars = word.split('').map((char) => {
      const idx = runningCharIndex++;
      return { char, index: idx };
    });
    return { word, chars };
  });
  return { ...line, words };
});

// Realistic squash & stretch physics keyframe bounce
const bounceVariants = {
  hidden: {
    opacity: 0,
    y: -48,
    scaleY: 1.25,
    scaleX: 0.88,
  },
  visible: (i) => ({
    opacity: 1,
    y: [-48, 12, -6, 2, 0],
    scaleY: [1.25, 0.82, 1.1, 0.96, 1],
    scaleX: [0.88, 1.2, 0.94, 1.03, 1],
    transition: {
      duration: 0.65,
      delay: 0.12 + i * 0.026,
      times: [0, 0.45, 0.7, 0.86, 1],
      ease: 'easeOut',
    },
  }),
};

export default function Hero() {
  const [replayKey, setReplayKey] = useState(0);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#05070B]">
      {/* Background radial gold glow & dot matrix */}
      <div className="absolute top-1/4 right-1/4 w-[500px] lg:w-[650px] h-[500px] lg:h-[650px] bg-gradient-to-tr from-amber-500/20 via-yellow-600/10 to-transparent blur-[60px] sm:blur-[100px] md:blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-amber-600/10 blur-[50px] sm:blur-[80px] md:blur-[130px] pointer-events-none -z-10" />

      {/* Tech dot-matrix background pattern on right half */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 bg-[radial-gradient(rgba(212,175,55,0.22)_1.5px,transparent_1.5px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_60%_50%,#000_50%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          {/* Left Column: Headline, Subtitle, CTAs, Proof Pill (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-7 space-y-7 text-center lg:text-left"
          >
            {/* Top Tagline Pill matching the image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A0D14] border border-amber-500/35 shadow-[0_0_20px_rgba(212,175,55,0.18)] backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-amber-300">
                ROOM TO GROW.
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs font-mono text-slate-300">
                Creative Marketing | Digital Agency
              </span>
            </motion.div>

            {/* Main H1 Headline with Bounce text animation */}
            <h1
              key={replayKey}
              onClick={() => setReplayKey((k) => k + 1)}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-heading cursor-pointer select-none"
              aria-label="Where Creative Storytelling Meets Strategic Digital Growth."
              title="Click to replay bounce animation"
            >
              {PRECOMPUTED_LINES.map((line, lineIdx) => (
                <span key={lineIdx} className="block" aria-hidden="true">
                  {line.words.map((wordObj, wordIdx) => (
                    <span
                      key={wordIdx}
                      className="inline-block mr-[0.28em] last:mr-0 whitespace-nowrap"
                    >
                      {wordObj.chars.map(({ char, index }) => (
                        <motion.span
                          key={index}
                          custom={index}
                          variants={bounceVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover={{
                            y: -10,
                            scale: 1.18,
                            transition: { type: 'spring', stiffness: 450, damping: 10 },
                          }}
                          className={`inline-block ${
                            line.isGold
                              ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-400'
                              : 'text-white'
                          }`}
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            {/* Sub-headline matching the image */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              We help ambitious brands turn attention into revenue through viral video production, strategic social media, and high-converting digital systems.
            </p>

            {/* CTA Buttons: Yellow Explore Services + Dark Let's Talk */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1">
              <MagneticButton
                href="#services"
                strength={0.25}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-yellow-300 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2"
              >
                <span>EXPLORE OUR SERVICES</span>
                <ArrowDown className="w-4 h-4 text-black" />
              </MagneticButton>

              <MagneticButton
                href="#contact"
                strength={0.25}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0A0D14] hover:bg-[#161B28] text-white hover:text-amber-200 border border-amber-500/40 hover:border-amber-400 font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span>LET'S TALK ABOUT YOUR BUSINESS</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </MagneticButton>
            </div>

            {/* Social Proof Pill underneath matching the image */}
            <div className="pt-3">
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 rounded-full bg-[#0A0D14]/90 border border-amber-500/30 text-xs font-mono shadow-[0_4px_25px_rgba(0,0,0,0.8)] backdrop-blur-md">
                <span className="text-amber-400 font-bold tracking-widest">★★★★★</span>
                <span className="text-white font-bold">50+ Campaigns Launched</span>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <span className="text-amber-300 font-bold">4.9★ Partner Rating</span>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <span className="text-emerald-400 font-semibold">100% On-Time Delivery</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Free-Floating Circular Motion Rings & Bigger Logobrand (5-6 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-6 xl:col-span-5 flex items-center justify-center relative min-h-[480px] sm:min-h-[560px] select-none"
          >
            {/* Ambient Breathing Gold Glow Core */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.55, 0.85, 0.55],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute w-[340px] sm:w-[480px] md:w-[540px] h-[340px] sm:h-[480px] md:h-[540px] rounded-full bg-gradient-to-tr from-amber-500/35 via-yellow-500/25 to-transparent blur-[50px] sm:blur-[80px] md:blur-[95px] pointer-events-none"
            />

            {/* Pure Circular Motion System (Significantly Scaled Up) */}
            <div className="relative flex items-center justify-center w-[340px] sm:w-[500px] md:w-[560px] aspect-square">
              
              {/* Concentric Golden Ring 5 (Outermost dashed celestial orbit) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[330px] sm:w-[490px] md:w-[550px] h-[330px] sm:h-[490px] md:h-[550px] rounded-full border border-dashed border-amber-500/20 pointer-events-none"
              />

              {/* Concentric Golden Ring 4 (Radiant orbital ring with rotating satellite bead) */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[295px] sm:w-[435px] md:w-[485px] h-[295px] sm:h-[435px] md:h-[485px] rounded-full border border-amber-500/30 shadow-[0_0_30px_rgba(212,175,55,0.22)] pointer-events-none"
              >
                {/* Orbiting light beacon */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-amber-400 shadow-[0_0_20px_#F59E0B]" />
              </motion.div>

              {/* Concentric Golden Ring 3 (Medium glowing ring with counter-orbit beacon) */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="absolute w-[255px] sm:w-[380px] md:w-[425px] h-[255px] sm:h-[380px] md:h-[425px] rounded-full border border-amber-400/50 shadow-[0_0_35px_rgba(245,158,11,0.3)] pointer-events-none"
              >
                {/* Counter-orbit light beacon */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-yellow-300 shadow-[0_0_18px_#FBBF24]" />
              </motion.div>

              {/* Concentric Golden Ring 2 (Pulsing neon ring with GPU-accelerated breathing opacity) */}
              <motion.div
                animate={{
                  scale: [1, 1.025, 1],
                  opacity: [0.75, 1, 0.75],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute w-[225px] sm:w-[335px] md:w-[375px] h-[225px] sm:h-[335px] md:h-[375px] rounded-full border-[2.5px] border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.7),inset_0_0_20px_rgba(245,158,11,0.35)] pointer-events-none z-10"
              />

              {/* Concentric Golden Ring 1 (Intense immediate rim directly hugging the emblem) */}
              <motion.div
                animate={{
                  opacity: [0.85, 1, 0.85],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute w-[248px] sm:w-[315px] md:w-[352px] h-[248px] sm:h-[315px] md:h-[352px] rounded-full border-[3px] border-amber-300 shadow-[0_0_40px_rgba(251,191,36,0.9)] pointer-events-none z-10"
              />

              {/* Center Circular Brand Emblem (BIGGER: ~340px on desktop) */}
              <motion.div
                animate={{
                  y: [-3, 3, -3],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative w-[235px] sm:w-[298px] md:w-[335px] h-[235px] sm:h-[298px] md:h-[335px] rounded-full overflow-hidden shadow-[0_0_70px_rgba(0,0,0,0.95)] z-20 group"
              >
                <img
                  src={agencyInfo.brandImage}
                  alt="ROHOBOT — Digital Marketing and Creative Agency — Room to Grow"
                  className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
