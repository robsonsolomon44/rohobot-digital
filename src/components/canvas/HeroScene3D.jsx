import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function RoomToGrowMesh() {
  const meshRef = useRef();
  const wireframeRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const { pointer } = state;

    // Smooth cursor-tracking rotation with dampening
    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, pointer.y * 0.4 + Math.sin(t * 0.3) * 0.2, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, pointer.x * 0.5 + t * 0.25, 0.05);
    }

    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = t * 0.15 + pointer.y * 0.3;
      wireframeRef.current.rotation.y = -t * 0.2 + pointer.x * 0.4;
      wireframeRef.current.rotation.z = t * 0.08;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.12;
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Floating Gyroscope Ring in Gold */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.5, 0.025, 16, 100]} />
        <meshStandardMaterial
          color="#F5D061"
          emissive="#D4AF37"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Secondary Orbital Ring */}
      <mesh rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[2.8, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#AA771C"
          emissive="#F59E0B"
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Floating Geometric Wireframe Cage */}
      <mesh ref={wireframeRef} scale={1.85}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial
          color="#F5D061"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Futuristic "Room To Grow" Central Core with Distort Material */}
      <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh ref={meshRef} scale={1.3}>
          <icosahedronGeometry args={[1, 32]} />
          <MeshDistortMaterial
            color="#D4AF37"
            emissive="#AA771C"
            emissiveIntensity={0.4}
            roughness={0.15}
            metalness={0.95}
            distort={0.42}
            speed={2}
          />
        </mesh>
      </Float>

      {/* Ambient Floating Gold Data Particles */}
      <Sparkles
        count={75}
        scale={6}
        size={2.8}
        speed={0.4}
        color="#FCE7A4"
        opacity={0.7}
      />
      <Sparkles
        count={35}
        scale={4}
        size={4}
        speed={0.8}
        color="#F5D061"
        opacity={0.9}
      />
    </group>
  );
}

export default function HeroScene3D() {
  return (
    <div className="w-full h-full min-h-[340px] sm:min-h-[420px] relative">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.7} />
        {/* Studio Golden Lighting */}
        <pointLight position={[10, 10, 10]} intensity={1.8} color="#FFF1B8" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#D4AF37" />
        <directionalLight position={[0, 8, 5]} intensity={1.5} color="#FCE7A4" />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#AA771C" />

        <RoomToGrowMesh />
      </Canvas>
    </div>
  );
}
