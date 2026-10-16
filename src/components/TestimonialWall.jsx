import React, { useState } from 'react';
import {
  Star,
  ShieldCheck,
  Play,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import { clientSpotlights, testimonials } from '../data/siteData';

export default function TestimonialWall() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const filterTabs = [
    { id: 'all', label: 'All Stories' },
    { id: 'marketing', label: 'Marketing & ROI' },
    { id: 'web', label: 'Web & Tech' },
    { id: 'collaboration', label: 'Partnership' },
  ];

  const filteredTestimonials =
    activeCategory === 'all'
      ? testimonials
      : testimonials.filter((t) => t.category === activeCategory);

  return (
    <section id="testimonials" className="py-24 bg-[#05070B] relative border-t border-amber-500/15">
      {/* Background ambient gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-amber-500/10 via-yellow-600/5 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-mono text-amber-400 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven Social Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            Trusted by Founders &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
              Scaling Leaders
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Real metrics. Authentic relationships. Read how Rohobot partners achieve record-setting revenue growth while enjoying a calm, high-velocity collaboration.
          </p>
        </div>

        {/* Top Spotlight Row (2 Large Featured Client Story Cards in Black & Gold) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {clientSpotlights.map((spotlight) => (
            <div
              key={spotlight.id}
              className="bg-[#0A0D14] border border-amber-500/25 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between hover:border-amber-500/60 transition-all shadow-[0_10px_35px_rgba(0,0,0,0.85)] relative overflow-hidden group"
            >
              {/* Subtle gold glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                {/* Top Meta Bar */}
                <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(spotlight.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-mono text-amber-200/90 font-medium">5.0 Rating</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Verified Partner ✓</span>
                  </div>
                </div>

                {/* Key Metric Callout Banner */}
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-[#05070B] border border-amber-500/30 flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="font-mono text-sm sm:text-base font-bold text-amber-300 tracking-tight">
                    {spotlight.metricHighlight}
                  </span>
                </div>

                {/* Simulated Video Preview Badge / Trigger */}
                <div className="mb-6">
                  {playingVideoId === spotlight.id ? (
                    <div className="p-4 rounded-xl bg-[#05070B] border border-amber-500/40 text-xs text-slate-300 space-y-2">
                      <div className="flex items-center justify-between text-amber-400 font-mono font-semibold">
                        <span>▶ Playing Case Breakdown (Audio Transcription)</span>
                        <button
                          onClick={() => setPlayingVideoId(null)}
                          className="text-slate-400 hover:text-white"
                        >
                          ✕ Close
                        </button>
                      </div>
                      <p className="italic text-slate-400">
                        "Rohobot acted as our fractional growth team. The speed of their weekly creative sprints and direct communication channel eliminated all the usual agency runaround..."
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={() => setPlayingVideoId(spotlight.id)}
                      className="w-full p-3 rounded-xl bg-[#05070B] border border-amber-500/20 hover:border-amber-500/50 flex items-center justify-between group/video transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500 group-hover/video:bg-amber-400 flex items-center justify-center text-black transition-colors">
                          <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white">
                            Watch Client Story Breakdown
                          </div>
                          <div className="text-[10px] text-amber-300/80 font-mono">
                            {spotlight.videoDuration}
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-amber-400 underline decoration-amber-500/40 hidden sm:inline">
                        Click to view recap →
                      </span>
                    </button>
                  )}
                </div>

                {/* Full Narrative Quote */}
                <blockquote className="text-sm sm:text-base text-slate-200 leading-relaxed italic mb-6">
                  "{spotlight.quote}"
                </blockquote>
              </div>

              {/* Client Details Footer */}
              <div className="pt-5 border-t border-amber-500/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center font-bold text-black text-sm shadow-md">
                    {spotlight.clientName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{spotlight.clientName}</div>
                    <div className="text-xs text-slate-400">
                      {spotlight.role} • <strong className="text-amber-200 font-normal">{spotlight.company}</strong>
                    </div>
                  </div>
                </div>

                <span className="hidden sm:inline-block px-3 py-1 rounded-md bg-[#10141E] border border-amber-500/20 text-[11px] font-mono text-amber-300">
                  {spotlight.serviceUsed}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Pills in Black & Gold */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                    : 'bg-[#0A0D14] hover:bg-[#161B28] text-slate-300 border border-amber-500/20 hover:border-amber-500/40'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Bento Grid of Client Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#0A0D14] border border-amber-500/20 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            >
              <div>
                {/* 5-Star Amber Icons & Service Tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#10141E] border border-amber-500/20 text-[10px] font-mono text-amber-300">
                    {item.service}
                  </span>
                </div>

                {/* Bold Pull-Quote Headline */}
                <h4 className="text-base font-bold text-white font-heading mb-3 leading-snug">
                  "{item.headline}"
                </h4>

                {/* Authentic Review Content */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {item.content}
                </p>
              </div>

              {/* Client Info */}
              <div className="pt-4 border-t border-amber-500/15 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#10141E] border border-amber-500/30 flex items-center justify-center font-mono font-bold text-xs text-amber-300">
                  {item.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{item.name}</div>
                  <div className="text-[11px] text-slate-400">
                    {item.role} • <span className="text-amber-200">{item.company}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
