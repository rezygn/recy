import { useEffect, useState } from 'react';
import snowflakeImg from '@/assets/snowflake.png';

interface SnowParticle {
  id: number;
  left: number;
  top: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

interface LocalSnowEffectProps {
  particleCount?: number;
  className?: string;
}

export const LocalSnowEffect = ({ particleCount = 8, className = "" }: LocalSnowEffectProps) => {
  const [particles, setParticles] = useState<SnowParticle[]>([]);

  useEffect(() => {
    const newParticles: SnowParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 30 + Math.random() * 60,
        opacity: 0.08 + Math.random() * 0.12,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 5,
      });
    }
    setParticles(newParticles);
  }, [particleCount]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
      
      {particles.map((particle) => (
        <img
          key={particle.id}
          src={snowflakeImg}
          alt=""
          className="absolute animate-float-slow"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </div>
  );
};
