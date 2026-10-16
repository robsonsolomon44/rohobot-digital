import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  TrendingUp,
  Sparkles,
  Volume2,
  VolumeX,
  Maximize2,
  Play,
  Pause,
  Film,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioProjects, portfolioCategories } from '../data/siteData';
import TiltCard3D from './ui/TiltCard3D';
import CaseStudyModal from './CaseStudyModal';

function VideoCard({ project, onOpenModal }) {
  const cardContainerRef = useRef(null);
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Intersection Observer: Only play and decode when card enters viewport
  React.useEffect(() => {
    const el = cardContainerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Manage playback based on visibility
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.defaultMuted = isMuted;
      video.muted = isMuted;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isInView, isMuted]);

  const toggleSound = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div ref={cardContainerRef} className="h-full">
      <TiltCard3D
        depth={16}
        glare={true}
        className="bg-[#0A0D14]/90 backdrop-blur-xl border border-amber-500/25 rounded-2xl overflow-hidden hover:border-amber-400/60 transition-all duration-300 flex flex-col justify-between shadow-2xl group h-full"
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* ======================================================== */}
            {/* VIDEO CANVAS (VIEWPORT-AWARE AUTOPLAY, LOOP, MUTED)       */}
            {/* ======================================================== */}
            <div
              className="relative aspect-[9/13] w-full bg-[#070A10] overflow-hidden border-b border-amber-500/20 cursor-pointer"
              onClick={() => onOpenModal(project)}
            >
              {/* HTML5 Video with viewport-aware lazy playback */}
              <video
                ref={videoRef}
                src={project.videoUrl}
                loop
                muted={isMuted}
                defaultMuted
                playsInline
                preload={isInView ? 'auto' : 'none'}
                onLoadedData={() => setIsLoaded(true)}
                onCanPlay={() => {
                  setIsLoaded(true);
                  if (isInView && videoRef.current && videoRef.current.paused) {
                    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
                  }
                }}
                onError={(e) => {
                  if (isInView) {
                    console.warn(`Video load error: ${project.videoUrl}`, e);
                    setHasError(true);
                  }
                }}
                className={`w-full h-full object-cover transition-opacity duration-500 group-hover:scale-105 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Loading Skeleton Placeholder while video initial frames buffer */}
              {!isLoaded && !hasError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070A10] animate-pulse pointer-events-none">
                  <div className="w-12 h-12 rounded-full border border-amber-500/30 flex items-center justify-center mb-2 bg-amber-500/10">
                    <Film className="w-6 h-6 text-amber-400" />
                  </div>
                  <span className="text-[11px] font-mono text-amber-300/70">Loading Video...</span>
                </div>
              )}

              {/* Error Fallback */}
              {hasError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070A10] p-4 text-center">
                  <Film className="w-8 h-8 text-amber-500/60 mb-2" />
                  <span className="text-xs font-mono text-slate-300 mb-2">{project.title}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setHasError(false);
                      if (videoRef.current) {
                        videoRef.current.load();
                        videoRef.current.play().catch(() => {});
                      }
                    }}
                    className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
                  >
                    Retry Video
                  </button>
                </div>
              )}

            {/* Subtle dark gradient overlay at top and bottom of video */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-transparent to-black/60 pointer-events-none" />

            {/* Top Bar Badges */}
            <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-amber-500/35 text-[10px] font-mono font-semibold text-amber-300 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>{project.badge}</span>
              </span>

              <span className="text-[10px] font-mono text-slate-300 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                HD • 60FPS
              </span>
            </div>

            {/* Floating Action Controls Overlay (Hover / Touch) */}
            <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5">
              {/* Play / Pause Toggle */}
              <button
                type="button"
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-black/75 backdrop-blur-md border border-amber-500/30 text-amber-300 hover:text-white hover:bg-amber-500/30 flex items-center justify-center transition-all shadow-lg"
                title={isPlaying ? 'Pause Video' : 'Play Video'}
                aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              </button>

              {/* Sound Toggle (Mute/Unmute) */}
              <button
                type="button"
                onClick={toggleSound}
                className="w-8 h-8 rounded-full bg-black/75 backdrop-blur-md border border-amber-500/30 text-amber-300 hover:text-white hover:bg-amber-500/30 flex items-center justify-center transition-all shadow-lg"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
              </button>

              {/* Fullscreen / Theater Modal */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal(project);
                }}
                className="w-8 h-8 rounded-full bg-amber-400 text-black hover:bg-yellow-300 flex items-center justify-center transition-all shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                title="Watch in Cinema Theater"
                aria-label="Watch in Cinema Theater"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* CARD METADATA & DETAILS                                   */}
          {/* ======================================================== */}
          <div className="p-5 sm:p-6">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className="text-amber-300 font-semibold truncate max-w-[65%]">
                {project.client}
              </span>
              <span className="text-slate-500">• {project.year}</span>
            </div>

            <h3
              onClick={() => onOpenModal(project)}
              className="font-heading font-bold text-lg text-white group-hover:text-amber-300 transition-colors cursor-pointer mb-2 line-clamp-1"
            >
              {project.title}
            </h3>

            {/* Headline Metric */}
            <div className="mb-3.5 p-2 rounded-lg bg-[#05070B] border border-amber-500/20 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span className="font-mono text-xs text-amber-200 font-medium truncate">
                {project.headlineMetric}
              </span>
            </div>

            {/* Summary */}
            <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
              {project.summary}
            </p>

            {/* Deliverables Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.deliverables.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-[#10141E] border border-amber-500/15 text-[10px] font-mono text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CARD FOOTER ACTION                                        */}
        {/* ======================================================== */}
        <div className="p-5 sm:p-6 pt-0">
          <button
            type="button"
            onClick={() => onOpenModal(project)}
            className="w-full py-2.5 px-4 rounded-xl bg-[#10141E] group-hover:bg-amber-400 text-slate-200 group-hover:text-black border border-amber-500/25 group-hover:border-amber-400 font-bold text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-md group/btn"
          >
            <span>Watch in Cinema</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </TiltCard3D>
  </div>
);
}

export default function PortfolioShowcase({ onSelectProjectCTA }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects =
    activeCategory === 'all'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="portfolio" className="py-24 relative bg-[#05070B] border-t border-amber-500/15 overflow-hidden">
      {/* Background ambient gold glows */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[500px] bg-amber-500/10 blur-[60px] md:blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[400px] bg-yellow-600/10 blur-[60px] md:blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-mono text-amber-400 mb-3 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
              <Film className="w-3.5 h-3.5" />
              <span>Commercial &amp; Short-Form Video Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight">
              Selected Work &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500">
                Video Productions
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl">
              10 real video campaigns engineered for high viewer hook retention, viral algorithm amplification, and measurable commercial growth.
            </p>
          </div>

          <div className="mt-4 md:mt-0 font-mono text-xs text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              Showing <strong className="text-amber-400">{filteredProjects.length}</strong> of{' '}
              <strong className="text-white">{portfolioProjects.length}</strong> Video Productions
            </span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {portfolioCategories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-[1.02]'
                    : 'bg-[#0A0D14] hover:bg-[#161B28] text-slate-300 border border-amber-500/20 hover:border-amber-500/40'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* 10-Video Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="h-full"
              >
                <VideoCard project={project} onOpenModal={handleOpenModal} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Full Cinema Theater Modal */}
      <CaseStudyModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectCTA={(projectTitle) => {
          if (onSelectProjectCTA) {
            onSelectProjectCTA(projectTitle);
          }
          const formElement = document.getElementById('contact');
          if (formElement) {
            const offset = 90;
            const elementPosition = formElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            });
          }
        }}
      />
    </section>
  );
}
