import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';

type Testimonial = {
  quote: string;
  name: string;
  role?: string;
};

type Props = {
  items: Testimonial[];
};

export default function TestimonialsCarousel({ items }: Props) {
  const [index, setIndex] = useState(0);

  const visibleItems = useMemo(() => {
    if (items.length <= 3) return items;
    return [0, 1, 2].map((offset) => items[(index + offset) % items.length]);
  }, [index, items]);

  if (items.length === 0) return null;

  return (
    <div className="testimonials-carousel">
      <button type="button" aria-label="Previous testimonials" onClick={() => setIndex((current) => (current - 1 + items.length) % items.length)}>
        <ChevronLeft size={20} />
      </button>
      <div className="testimonials-carousel__track">
        {visibleItems.map((item) => (
          <article key={`${item.name}-${item.quote}`}>
            <p>“{item.quote}”</p>
            <footer>
              <strong>{item.name}</strong>
              {item.role && <span>{item.role}</span>}
            </footer>
          </article>
        ))}
      </div>
      <button type="button" aria-label="Next testimonials" onClick={() => setIndex((current) => (current + 1) % items.length)}>
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
