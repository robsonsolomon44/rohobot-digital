import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { agencyInfo } from '../data/siteData';
import TiltCard3D from './ui/TiltCard3D';

function BrandLogoItem({ brand, isHovered, onHover }) {
  return (
    <div
      className="flex flex-col items-center justify-center group cursor-pointer w-full py-3 px-2 transition-all duration-300"
      onMouseEnter={() => onHover(brand.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Logo Canvas Container */}
      <div className="h-16 sm:h-20 lg:h-22 w-full flex items-center justify-center relative">
        {/* Monochrome / White Version (Default - matches reference style) */}
        <img
          src={brand.whiteLogo}
          alt={brand.name}
          className={`max-h-full max-w-[150px] sm:max-w-[185px] lg:max-w-[200px] object-contain transition-all duration-500 filter ${
            isHovered
              ? 'opacity-0 scale-95 blur-sm'
              : 'opacity-75 group-hover:opacity-100 drop-shadow-[0_2px_10px_rgba(255,255,255,0.12)]'
          }`}
          loading="lazy"
        />

        {/* Authentic Full-Color Transparent Version (Illuminates on hover) */}
        <img
          src={brand.cleanLogo}
          alt={brand.name}
          className={`absolute max-h-full max-w-[150px] sm:max-w-[185px] lg:max-w-[200px] object-contain transition-all duration-500 ${
            isHovered
              ? 'opacity-100 scale-105 drop-shadow-[0_0_25px_rgba(212,175,55,0.45)]'
              : 'opacity-0 scale-95 pointer-events-none'
          }`}
          loading="lazy"
        />
      </div>

      {/* Brand Label & Category Caption */}
      <div className="mt-3 text-center transition-all duration-300">
        <span className="block text-xs sm:text-sm font-heading font-bold text-slate-300 group-hover:text-amber-300 transition-colors">
          {brand.name}
        </span>
        <span className="block text-[11px] font-mono text-slate-400 group-hover:text-amber-400/90 transition-colors mt-0.5">
          {brand.category}
        </span>
      </div>
    </div>
  );
}

export default function BrandsSection() {
  const { clientBrands = [], clientObjectives = [] } = agencyInfo;
  const [hoveredBrand, setHoveredBrand] = useState(null);

  return (
    <section id="brands" className="py-24 bg-[#05070B] relative border-t border-amber-500/15 overflow-hidden">
      {/* Background ambient gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-r from-amber-500/10 via-yellow-600/5 to-transparent blur-[60px] md:blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-mono text-amber-400 mb-4 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Client Partners &amp; Industry Trust</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            Brands We've{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
              Worked With
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We partner with ambitious companies, academic institutions, luxury properties, and industrial pioneers to turn audience attention into measurable business equity.
          </p>
        </motion.div>

        {/* ======================================================== */}
        {/* SIGNATURE CLIENT LOGOS STAGE (STRUCTURED LIKE REFERENCE) */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-[#080B12]/90 border border-amber-500/20 p-8 sm:p-14 lg:p-16 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] relative overflow-hidden mb-20"
        >
          {/* Subtle center spotlight glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/10 blur-[130px] pointer-events-none" />

          {/* Reference Headline: "Trusted by the best" */}
          <div className="text-center mb-12 sm:mb-16 relative">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-white/95 tracking-wide">
              Trusted by the best
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-sans font-normal">
              Verified client partnerships and long-term brand collaborations
            </p>
          </div>

          {/* Clean Client Logos: 2-Row Layout Matching Reference */}
          <div className="flex flex-col gap-10 sm:gap-14 relative">
            {/* Row 1: 4 Logos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 items-center justify-items-center gap-8 sm:gap-10 lg:gap-14">
              {clientBrands.slice(0, 4).map((brand) => (
                <BrandLogoItem
                  key={brand.id}
                  brand={brand}
                  isHovered={hoveredBrand === brand.id}
                  onHover={setHoveredBrand}
                />
              ))}
            </div>

            {/* Row 2: 3 Logos Centered */}
            <div className="grid grid-cols-1 sm:grid-cols-3 items-center justify-items-center gap-8 sm:gap-12 lg:gap-16 max-w-4xl mx-auto w-full">
              {clientBrands.slice(4).map((brand) => (
                <BrandLogoItem
                  key={brand.id}
                  brand={brand}
                  isHovered={hoveredBrand === brand.id}
                  onHover={setHoveredBrand}
                />
              ))}
            </div>
          </div>

          {/* Reference Action Pill Button ("Unsere Referenzen" / "Work With Rohobot") */}
          <div className="flex justify-center mt-12 sm:mt-16 relative">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/15 to-amber-500/20 hover:from-amber-400 hover:to-yellow-500 text-amber-300 hover:text-black border border-amber-500/35 text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.15)] hover:shadow-[0_0_35px_rgba(212,175,55,0.35)] group"
            >
              <span>Work With Rohobot</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* OUR OBJECTIVES FOR EVERY CLIENT                          */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 sm:p-10 rounded-3xl bg-[#0A0D14] border border-amber-500/30 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mb-8 relative">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-400 font-bold block mb-1">
              Client-Centric Alignment
            </span>
            <h3 className="text-2xl font-bold text-white font-heading mb-2">
              Our Objectives for Every Client
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Every business has different goals. Our approach is to understand your specific needs and create a customized strategy that directly supports those outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 relative">
            {clientObjectives.map((objText, idx) => (
              <TiltCard3D
                key={idx}
                depth={10}
                glare={false}
                className="bg-[#05070B] border border-amber-500/20"
              >
                <div className="p-4 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 animate-pulse" />
                  <span className="text-xs text-slate-200 font-medium">
                    {objText}
                  </span>
                </div>
              </TiltCard3D>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-amber-500/15 text-center text-xs font-mono text-amber-300">
            "We welcome businesses of different sizes that are ready to invest in building a stronger digital presence."
          </div>
        </motion.div>
      </div>
    </section>
  );
}
