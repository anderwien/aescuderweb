import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

type Props = {
  images: string[];
  intervalMs?: number;
};

export default function HeroCarousel({ images, intervalMs = 7800 }: Props) {
  const cleanImages = images.filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (cleanImages.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % cleanImages.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [cleanImages.length, intervalMs]);

  if (cleanImages.length === 0) return null;

  return (
    <div className="hero-carousel" aria-hidden="true">
      {cleanImages.map((image, index) => (
        <div
          className={index === activeIndex ? 'hero-carousel__slide hero-carousel__slide--active' : 'hero-carousel__slide'}
          key={`${image}-${index}`}
          style={
            {
              '--slide-index': index,
              backgroundImage: `url("${image}")`
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
