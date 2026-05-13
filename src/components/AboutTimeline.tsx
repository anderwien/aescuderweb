import { MapPin } from 'lucide-react';
import { useState } from 'react';

type TimelineEvent = {
  label?: string;
  title: string;
  description: string;
  location?: string;
};

type TimelineYear = {
  year: string;
  title?: string;
  description?: string;
  location?: string;
  events?: TimelineEvent[];
};

type Props = {
  items: TimelineYear[];
};

export default function AboutTimeline({ items }: Props) {
  const [activeYear, setActiveYear] = useState(items[0]?.year ?? '');
  const activeItem = items.find((item) => item.year === activeYear) ?? items[0];

  if (!activeItem) return null;

  const events =
    activeItem.events && activeItem.events.length > 0
      ? activeItem.events
      : [
          {
            title: activeItem.title ?? activeItem.year,
            description: activeItem.description ?? '',
            location: activeItem.location
          }
        ];

  return (
    <div className="about-timeline">
      <div className="about-timeline__rail" aria-label="Career timeline years">
        {items.map((item) => (
          <button
            className={item.year === activeYear ? 'about-timeline__marker about-timeline__marker--active' : 'about-timeline__marker'}
            type="button"
            aria-pressed={item.year === activeYear}
            key={item.year}
            onMouseEnter={() => setActiveYear(item.year)}
            onFocus={() => setActiveYear(item.year)}
            onClick={() => setActiveYear(item.year)}
          >
            <span>{item.year}</span>
            <i aria-hidden="true" />
          </button>
        ))}
      </div>

      <article className="about-timeline__card">
        <p className="eyebrow">Selected year</p>
        <h3>{activeItem.year}</h3>
        {activeItem.title && <p className="about-timeline__title">{activeItem.title}</p>}
        {activeItem.description && <p>{activeItem.description}</p>}
        <div className="about-timeline__branches">
          {events.map((event, index) => (
            <section key={`${event.title}-${index}`}>
              <div className="about-timeline__branch-line" />
              <div>
                {event.label && <p className="eyebrow">{event.label}</p>}
                <h4>{event.title}</h4>
                {event.location && (
                  <span className="about-timeline__location">
                    <MapPin size={14} />
                    {event.location}
                  </span>
                )}
                <p>{event.description}</p>
              </div>
            </section>
          ))}
        </div>
      </article>
    </div>
  );
}
