import React, { useRef, useState, useCallback } from 'react';

export default function TiltCard3D({
  children,
  className = '',
  glare = true,
  maxTilt = 10,
  depth = 30,
}) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Percentage for glare
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    setGlarePos({ x: xPercent, y: yPercent });

    // Tilt angle
    const tiltX = ((y / rect.height) - 0.5) * -maxTilt;
    const tiltY = ((x / rect.width) - 0.5) * maxTilt;
    setTilt({ x: tiltX, y: tiltY });
  }, [maxTilt]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.01, 1.01, 1.01)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease',
        transformStyle: 'preserve-3d',
      }}
      className={`relative rounded-2xl ${
        isHovered
          ? 'shadow-[0_20px_50px_rgba(212,175,55,0.18)]'
          : 'shadow-card-elevated'
      } ${className}`}
    >
      {/* Glare effect */}
      {glare && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-30"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 260px at ${glarePos.x}% ${glarePos.y}%, rgba(212, 175, 55, 0.16), transparent 70%)`,
          }}
        />
      )}

      {/* Spatial Border Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl border transition-colors duration-300 z-20"
        style={{
          borderColor: isHovered ? 'rgba(212, 175, 55, 0.55)' : 'rgba(212, 175, 55, 0.18)',
        }}
      />

      {/* Inner Content with 3D Depth */}
      <div
        style={{
          transform: isHovered ? `translateZ(${depth}px)` : 'translateZ(0px)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.25s ease-out',
        }}
        className="relative z-10 h-full w-full"
      >
        {children}
      </div>
    </div>
  );
}
