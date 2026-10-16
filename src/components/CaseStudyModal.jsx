import React, { useEffect } from 'react';
import { X, CheckCircle2, Star, ArrowRight, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';

export default function CaseStudyModal({ project, isOpen, onClose, onSelectCTA }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#000000]/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card in Black & Gold */}
      <div className="relative w-full max-w-4xl bg-[#0A0D14] border border-amber-500/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-[#05070B]/90 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono font-semibold">
              {project.categoryLabel}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Client: <strong className="text-amber-200">{project.client}</strong> • {project.year}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#10141E] hover:bg-[#161B28] text-slate-300 hover:text-amber-400 transition-colors border border-amber-500/20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Cinema Theater Video Screen */}
          {project.videoUrl && (
            <div className="relative w-full rounded-2xl overflow-hidden bg-black border border-amber-500/35 shadow-[0_15px_40px_rgba(0,0,0,0.9)] flex items-center justify-center">
              <video
                src={project.videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full max-h-[460px] object-contain bg-black"
              />
            </div>
          )}

          {/* Headline & High Impact Metric Callout */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-heading tracking-tight">
              {project.title}
            </h2>
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-[#05070B] border border-amber-500/40 flex items-center justify-between flex-wrap gap-4 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-amber-400/80 block mb-1">
                  Primary Verified Outcome
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
                  {project.headlineMetric}
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#05070B] border border-amber-500/30 text-amber-300 text-xs font-mono">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Audited Performance Data</span>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* 3 Before / After Metric Cards in Black & Gold */}
          <div>
            <h3 className="text-sm uppercase font-mono tracking-wider text-amber-400 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              Before &amp; After Impact Metrics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.previewMetrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#05070B] border border-amber-500/20 hover:border-amber-500/40 transition-colors"
                >
                  <div className="text-xs text-slate-400 font-medium mb-2">{metric.label}</div>
                  <div className="flex items-baseline justify-between mb-2">
                    <div>
                      <span className="text-[11px] text-slate-500 block font-mono">Before</span>
                      <span className="font-mono text-sm text-slate-400 line-through">
                        {metric.before}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-amber-400 font-mono block">After Rohobot</span>
                      <span className="font-mono text-lg font-bold text-amber-200">
                        {metric.after}
                      </span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-amber-500/15 flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-400">Net Improvement</span>
                    <span className="text-amber-300 font-bold bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The Challenge */}
          <div className="p-5 rounded-xl bg-[#10141E] border border-amber-500/20">
            <h3 className="text-xs uppercase font-mono tracking-wider text-amber-400 mb-2">
              The Core Challenge &amp; Bottleneck
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          {/* How We Collaborated */}
          <div>
            <h3 className="text-sm uppercase font-mono tracking-wider text-amber-300 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              How Rohobot Partnered With {project.client}
            </h3>
            <div className="space-y-3">
              {project.howWeCollaborated.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-[#05070B] border border-amber-500/20"
                >
                  <div className="p-1 rounded-full bg-amber-500/10 text-amber-400 mt-0.5 flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables tags */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2">
              Deliverables Engineered
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.deliverables.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-[#10141E] border border-amber-500/20 text-xs font-mono text-amber-200"
                >
                  [{item}]
                </span>
              ))}
            </div>
          </div>

          {/* Direct Client Testimonial Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#10141E] to-[#0A0D14] border border-amber-500/40 relative shadow-[0_0_25px_rgba(212,175,55,0.1)]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex text-amber-400">
                {[...Array(project.testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-mono text-amber-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Client Review
              </span>
            </div>
            <blockquote className="text-sm sm:text-base text-slate-200 italic mb-4 leading-relaxed">
              "{project.testimonial.quote}"
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center font-bold text-black text-xs">
                {project.testimonial.author.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-white">
                  {project.testimonial.author}
                </div>
                <div className="text-[11px] text-slate-400">
                  {project.testimonial.role} • {project.testimonial.company}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA in Solid Gold */}
        <div className="px-6 py-4 border-t border-amber-500/20 bg-[#05070B]/95 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-20 backdrop-blur-md">
          <div className="text-xs text-slate-400 font-mono hidden sm:block">
            Want to build similar growth for your brand?
          </div>
          <button
            onClick={() => {
              onClose();
              if (onSelectCTA) onSelectCTA(project.title);
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <span>Build Something Similar With Us</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
