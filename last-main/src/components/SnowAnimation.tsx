import { useEffect, useState } from 'react';
import snowflakeImg from '@/assets/snowflake.png';

interface Particle {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  opacity: number;
  size: number;
  rotation: number;
}

export const SnowAnimation = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const createParticles = (): Particle[] => {
      const flakes: Particle[] = [];
      
      for (let i = 0; i < 40; i++) {
        const sizeCategory = Math.random();
        let size: number;
        let opacity: number;
        
        if (sizeCategory < 0.4) {
          size = 15 + Math.random() * 25;
          opacity = 0.15 + Math.random() * 0.2;
        } else if (sizeCategory < 0.75) {
          size = 40 + Math.random() * 40;
          opacity = 0.2 + Math.random() * 0.25;
        } else {
          size = 80 + Math.random() * 60;
          opacity = 0.1 + Math.random() * 0.2;
        }
        
        flakes.push({
          id: i,
          left: Math.random() * 100,
          animationDuration: 12 + Math.random() * 18,
          animationDelay: Math.random() * 15,
          opacity,
          size,
          rotation: Math.random() * 360,
        });
      }
      
      return flakes;
    };

    setParticles(createParticles());
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[100]">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="snowflake"
          style={{
            left: `${particle.left}%`,
            animationDuration: `${particle.animationDuration}s`,
            animationDelay: `${particle.animationDelay}s`,
          }}
        >
          <img
            src={snowflakeImg}
            alt=""
            className="snowflake-image"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              transform: `rotate(${particle.rotation}deg)`,
            }}
          />
        </div>
      ))}
    </div>
  );
};
