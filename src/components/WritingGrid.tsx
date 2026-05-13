import { useMemo, useState } from 'react';

type WritingItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  readTime?: string;
  tags?: string[];
  category?: string;
  pinned?: boolean;
};

type Props = {
  items: WritingItem[];
};

const visibleLimit = 12;

export default function WritingGrid({ items }: Props) {
  const [activeTag, setActiveTag] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const tags = useMemo(() => ['All', ...Array.from(new Set(items.flatMap((item) => item.tags ?? []))).slice(0, 10)], [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => activeTag === 'All' || item.tags?.includes(activeTag));
  }, [activeTag, items]);

  const pinned = filteredItems.filter((item) => item.pinned);
  const regular = filteredItems.filter((item) => !item.pinned);
  const visibleRegular = showAll ? regular : regular.slice(0, visibleLimit);

  return (
    <div className="writing-grid-ui">
      <div className="music-catalog__tags" aria-label="Filter writing by tags">
        {tags.map((tag) => (
          <button type="button" key={tag} aria-pressed={activeTag === tag} onClick={() => setActiveTag(tag)}>
            {tag}
          </button>
        ))}
      </div>

      {pinned.length > 0 && (
        <section className="writing-grid-ui__section">
          <h2>Pinned</h2>
          <div className="writing-grid-ui__grid writing-grid-ui__grid--pinned">
            {pinned.map((item) => (
              <WritingCard item={item} key={item.id} />
            ))}
          </div>
        </section>
      )}

      <section className="writing-grid-ui__section">
        <h2>Latest writing</h2>
        <div className="writing-grid-ui__grid">
          {visibleRegular.map((item) => (
            <WritingCard item={item} key={item.id} />
          ))}
        </div>
        {regular.length > visibleLimit && !showAll && (
          <button className="button" type="button" onClick={() => setShowAll(true)}>
            Load more
          </button>
        )}
      </section>
    </div>
  );
}

function WritingCard({ item }: { item: WritingItem }) {
  return (
    <article className="writing-grid-card">
      <a className="writing-grid-card__image" href={`/writing/${item.id}/`}>
        <img src={item.image ?? '/images/composing.jpg'} alt="" loading="lazy" />
      </a>
      <div className="writing-grid-card__body">
        <p className="writing-grid-card__meta">
          {item.date}
          {item.readTime && <span>{item.readTime}</span>}
        </p>
        <h3>
          <a href={`/writing/${item.id}/`}>{item.title}</a>
        </h3>
        <p>{item.description}</p>
        {item.tags && item.tags.length > 0 && (
          <ul aria-label="Writing tags">
            {item.tags.slice(0, 4).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
