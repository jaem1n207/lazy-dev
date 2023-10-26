import React, { useEffect, useState, useRef } from 'react';

interface ParticleProps {
  children: React.ReactNode;
  asset: string;
  direction: 'top' | 'bottom' | 'left' | 'right';
}

interface Particle {
  x: number;
  y: number;
  opacity: number;
  size: number;
}

const ParticleEffect: React.FC<ParticleProps> = ({ children, asset, direction }) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createParticle = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const particle: Particle = {
          x: Math.random() * rect.width,
          y: direction === 'top' ? rect.height - 10 : 10,
          opacity: 1,
          size: Math.random() * 20 + 10,
        };
        setParticles((prev) => [...prev, particle]);
      }
    };

    const updateParticles = () => {
      setParticles(
        (prev) =>
          prev
            .map((p) => {
              let newY = p.y - 1;
              let newOpacity = p.opacity - 0.01;
              let newSize = p.size + 0.1;

              if (newOpacity <= 0) {
                return null;
              }

              return {
                ...p,
                y: newY,
                opacity: newOpacity,
                size: newSize,
              };
            })
            .filter(Boolean) as Particle[],
      );
    };

    const handle = setInterval(createParticle, 100);
    const animationFrameId = requestAnimationFrame(updateParticles);

    return () => {
      clearInterval(handle);
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction]);

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      {particles.map((p, index) => (
        <img
          key={index}
          src={asset}
          alt=""
          style={{
            position: 'absolute',
            left: p.x,
            bottom: p.y,
            opacity: p.opacity,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
      {children}
    </div>
  );
};

export default ParticleEffect;
