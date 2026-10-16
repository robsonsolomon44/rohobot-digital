import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function TiltCard3D({
  children,
  className = '',
  glare = true,
  maxTilt = 14,
  depth = 40,
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate values normalized between -0.5 and 0.5
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Cursor pixel positions for radial spotlight glare
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for buttery-smooth dampening
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    // Mouse coordinates relative to card
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    mouseX.set(clientX);
    mouseY.set(clientY);

    // Normalize between -0.5 and 0.5
    const normalizedX = clientX / rect.width - 0.5;
    const normalizedY = clientY / rect.height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative rounded-2xl transition-shadow duration-300 ${
        isHovered ? 'shadow-[0_20px_50px_rgba(212,175,55,0.18)]' : 'shadow-card-elevated'
      } ${className}`}
    >
      {/* Dynamic Cursor Spotlight Glare Overlay */}
      {glare && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 z-30"
          style={{
            opacity: isHovered ? 1 : 0,
            background: useTransform(
              [mouseX, mouseY],
              ([xPos, yPos]) =>
                `radial-gradient(circle 240px at ${xPos}px ${yPos}px, rgba(212, 175, 55, 0.18), transparent 75%)`
            ),
          }}
        />
      )}

      {/* Subtle Spatial Border Glow */}
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
    </motion.div>
  );
}
