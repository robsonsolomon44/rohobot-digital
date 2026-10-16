import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { collaborationPillars, agencyInfo } from '../data/siteData';

export default function CollaborationHub() {
  const [activeTab, setActiveTab] = useState(0);

  const workflows = [
    {
      title: "Discovery & Blueprint",
      duration: "Days 1 – 14",
      highlight: "In-Depth Funnel & Tracking Audit",
      description:
        "We dissect your conversion bottlenecks, map competitor positioning gaps, and establish your custom 30-60-90 day roadmap with clear KPI targets.",
      tags: ["Forensic Analytics", "Buyer Persona Map", "Tech Stack Review"],
    },
    {
      title: "Sprint Execution & Build",
      duration: "Days 15 – 45",
      highlight: "High-Velocity Production Loops",
      description:
        "Our frontend engineers and creative designers deploy bespoke web architecture, interactive features, and high-converting ad creative angles.",
      tags: ["Modern React & Tailwind", "Paid Ad Angles", "CRM Integrations"],
    },
    {
      title: "Optimization & Scale",
      duration: "Days 45+",
      highlight: "Continuous CRO & Revenue Velocity",
      description:
        "We test new creative variations every 7 days, optimize conversion rates using real user session heatmaps, and aggressively scale winning campaigns.",
      tags: ["Weekly Creative Sprints", "A/B Multivariate CRO", "Blended ROAS Defense"],
    },
  ];

  return (
    <section id="collaboration" className="py-24 bg-[#05070B] relative border-t border-amber-500/15">
      {/* Background glow decoration */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-amber-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-mono text-amber-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Rohobot Partnership Model</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            No Black Boxes. Just Pure{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
              Transparency &amp; Velocity.
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We operate as an embedded extension of your team—giving your brand the room to grow with senior creative talent, direct communication, and zero bureaucratic friction.
          </p>
        </div>

        {/* 3 Core Partnership Pillar Cards in Black & Gold */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {collaborationPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#0A0D14] border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
                  {pillar.step}
                </span>
                <span className="px-2.5 py-1 rounded text-[10px] font-mono bg-[#10141E] text-amber-300 border border-amber-500/20">
                  {pillar.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white font-heading mb-2">
                {pillar.title}
              </h3>
              <div className="text-xs font-mono text-amber-400 font-semibold mb-3">{pillar.subtitle}</div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Streamlined Sprint Progression Bar in Black & Gold */}
        <div className="p-8 sm:p-10 rounded-2xl bg-[#0A0D14] border border-amber-500/25 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-amber-500/15 mb-8">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-1">
                Predictable Roadmap
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
                How We Deliver From Day 1 to Scale
              </h3>
            </div>

            {/* Step Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#05070B] border border-amber-500/20">
              {workflows.map((wf, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-all ${
                    activeTab === idx
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'text-slate-400 hover:text-amber-200'
                  }`}
                >
                  Step {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400">
                  {workflows[activeTab].duration}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-xs font-mono text-amber-300 font-semibold">
                  {workflows[activeTab].highlight}
                </span>
              </div>

              <h4 className="text-2xl font-bold text-white font-heading">
                {workflows[activeTab].title}
              </h4>

              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                {workflows[activeTab].description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {workflows[activeTab].tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-lg bg-[#05070B] border border-amber-500/20 text-xs font-mono text-amber-200"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 p-6 rounded-xl bg-[#05070B] border border-amber-500/25 text-center space-y-3">
              <div className="text-xs font-mono text-slate-400">Want to discuss your specific roadmap?</div>
              <div className="text-sm font-bold text-white font-heading">
                20-Minute Collaborative Jam
              </div>
              <a
                href="#collaboration-form"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(212,175,55,0.35)]"
              >
                <span>Book Sprint Sync</span>
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
