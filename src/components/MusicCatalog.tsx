import { BookOpen, Play, Search, Video, X } from 'lucide-react';
import { useMemo, useState } from 'react';

type CatalogItem = {
  id: string;
  title: string;
  description: string;
  year?: string | number;
  type?: string;
  category?: string;
  featuredGroup?: 'concert' | 'media' | 'jazz' | 'piano' | 'improvisation';
  duration?: string;
  instrumentation?: string;
  details?: string[];
  tags?: string[];
  coverImage?: string;
  url?: string;
  audioUrl?: string;
  youtubeUrl?: string;
  scoreUrl?: string;
  storeUrl?: string;
};

type Props = {
  items: CatalogItem[];
};

const primaryTags = ['concert', 'media', 'jazz', 'piano', 'chamber', 'electroacoustic', 'film', 'videogame', 'orchestration', 'technology'];

const sections = [
  { id: 'concert', title: 'Concert music' },
  { id: 'jazz', title: 'Jazz' },
  { id: 'media', title: 'Music for media' },
  { id: 'videogame', title: 'Video games and interactive media' },
  { id: 'orchestration', title: 'Orchestration and music preparation' },
  { id: 'other', title: 'Other works' }
];

function uniqueList(values: (string | number | undefined)[]) {
  return Array.from(new Set(values.filter(Boolean).map((value) => String(value))));
}

function itemSection(item: CatalogItem) {
  const tags = item.tags ?? [];
  const category = item.category?.toLowerCase() ?? '';

  if (tags.includes('jazz') || category === 'jazz') return 'jazz';
  if (tags.includes('videogame')) return 'videogame';
  if (tags.includes('orchestration')) return 'orchestration';
  if ((item.featuredGroup ?? '') === 'media' || category.includes('media')) return 'media';
  if (tags.includes('concert') || category.includes('concert') || category.includes('chamber') || category.includes('electroacoustic')) return 'concert';

  return 'other';
}

function youtubeEmbedUrl(url?: string) {
  if (!url) return '';

  try {
    const parsed = new URL(url);
    const videoId = parsed.hostname.includes('youtu.be') ? parsed.pathname.slice(1) : parsed.searchParams.get('v');

    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  } catch {
    return url;
  }
}

export default function MusicCatalog({ items }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [activeItem, setActiveItem] = useState<CatalogItem | null>(null);
  const [videoItem, setVideoItem] = useState<CatalogItem | null>(null);
  const [expandedId, setExpandedId] = useState('');

  const tags = useMemo(() => {
    const available = new Set(items.flatMap((item) => item.tags ?? []));
    return ['All', ...primaryTags.filter((tag) => available.has(tag))];
  }, [items]);

  const filteredItems = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return items.filter((item) => {
      const matchesTag = activeTag === 'All' || item.tags?.includes(activeTag);
      const matchesSearch =
        !normalized ||
        [item.title, item.type, item.category, item.instrumentation, item.description, ...(item.tags ?? [])]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()
          .includes(normalized);

      return matchesTag && matchesSearch;
    });
  }, [activeTag, items, searchTerm]);

  const groupedItems = useMemo(() => {
    return sections
      .map((section) => ({
        ...section,
        items: filteredItems.filter((item) => itemSection(item) === section.id)
      }))
      .filter((section) => section.items.length > 0);
  }, [filteredItems]);

  return (
    <div className="music-catalog">
      <div className="music-catalog__head">
        <h2>Works</h2>
        <label className="music-catalog__search">
          <Search aria-hidden="true" size={16} />
          <span className="sr-only">Filter works</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Filter by title, tag, or instrument..."
          />
        </label>
      </div>

      <div className="music-catalog__tags" aria-label="Filter by tags">
        {tags.map((tag) => (
          <button type="button" key={tag} aria-pressed={activeTag === tag} onClick={() => setActiveTag(tag)}>
            {tag}
          </button>
        ))}
      </div>

      <div className="music-catalog__sections">
        {groupedItems.map((section) => (
          <section className="music-catalog__section" key={section.id}>
            <h3>{section.title}</h3>
            <div className="music-catalog__list">
              {section.items.map((item) => {
                const isExpanded = expandedId === item.id;
                const format = item.type || item.category || 'Work';
                const canPlayAudio = Boolean(item.audioUrl);
                const canPlayVideo = Boolean(item.youtubeUrl);

                return (
                  <article
                    className={isExpanded ? 'music-catalog__item music-catalog__item--expanded' : 'music-catalog__item'}
                    key={item.id}
                  >
                    <button
                      className="music-catalog__main"
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? '' : item.id)}
                      aria-expanded={isExpanded}
                    >
                      <img className="music-catalog__thumb" src={item.coverImage || '/images/composing.jpg'} alt="" />
                      <span className="music-catalog__copy">
                        <span className="music-catalog__format">{format}</span>
                        <span className="music-catalog__title-row">
                          <strong>{item.title}</strong>
                          {item.year && <small>· {item.year}</small>}
                        </span>
                        <span className="music-catalog__mini-tags">
                          {(item.tags ?? []).map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </span>
                      </span>
                    </button>

                    <div className="music-catalog__actions" aria-label={`Actions for ${item.title}`}>
                      {item.duration && <span className="music-catalog__duration">{item.duration}</span>}
                      {canPlayVideo ? (
                        <button type="button" onClick={() => setVideoItem(item)} aria-label={`Watch video for ${item.title}`}>
                          <Video size={17} />
                        </button>
                      ) : (
                        canPlayAudio && (
                          <a href={item.audioUrl} aria-label={`Play ${item.title}`}>
                            <Play size={17} fill="currentColor" />
                          </a>
                        )
                      )}
                      <button type="button" onClick={() => setActiveItem(item)} aria-label={`Details for ${item.title}`}>
                        <BookOpen size={17} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {activeItem && (
        <div className="work-modal" role="dialog" aria-modal="true" aria-labelledby="work-modal-title">
          <button className="work-modal__backdrop" type="button" aria-label="Close modal" onClick={() => setActiveItem(null)} />
          <article className="work-modal__panel">
            <button className="work-modal__close" type="button" aria-label="Close modal" onClick={() => setActiveItem(null)}>
              <X size={20} />
            </button>

            <div className="work-modal__media">
              <img src={activeItem.coverImage || '/images/composing.jpg'} alt="" />
            </div>

            <div className="work-modal__content">
              <p className="music-catalog__category">{activeItem.category || 'Work'}</p>
              <h3 id="work-modal-title">{activeItem.title}</h3>
              <p className="work-modal__description">{activeItem.description}</p>
              <dl className="work-modal__facts">
                {activeItem.duration && (
                  <div>
                    <dt>Duration</dt>
                    <dd>{activeItem.duration}</dd>
                  </div>
                )}
                {activeItem.instrumentation && (
                  <div>
                    <dt>Instrumentation</dt>
                    <dd>{activeItem.instrumentation}</dd>
                  </div>
                )}
                {activeItem.category && (
                  <div>
                    <dt>Category</dt>
                    <dd>{activeItem.category}</dd>
                  </div>
                )}
                {activeItem.year && (
                  <div>
                    <dt>Year</dt>
                    <dd>{activeItem.year}</dd>
                  </div>
                )}
              </dl>
              {activeItem.details && activeItem.details.length > 0 && (
                <ul className="work-modal__details">
                  {activeItem.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}
              <div className="work-modal__actions">
                {activeItem.youtubeUrl && (
                  <button type="button" onClick={() => setVideoItem(activeItem)}>
                    <Video size={18} />
                    Video
                  </button>
                )}
                {activeItem.audioUrl && (
                  <a href={activeItem.audioUrl}>
                    <Play size={18} fill="currentColor" />
                    Audio
                  </a>
                )}
                {activeItem.scoreUrl && <a href={activeItem.scoreUrl}>Score</a>}
                {activeItem.storeUrl && <a href={activeItem.storeUrl}>Buy</a>}
              </div>
            </div>
          </article>
        </div>
      )}

      {videoItem && (
        <div className="work-modal" role="dialog" aria-modal="true" aria-labelledby="work-video-title">
          <button className="work-modal__backdrop" type="button" aria-label="Close video" onClick={() => setVideoItem(null)} />
          <article className="work-modal__panel work-modal__panel--video">
            <button className="work-modal__close" type="button" aria-label="Close video" onClick={() => setVideoItem(null)}>
              <X size={20} />
            </button>
            <h3 id="work-video-title">{videoItem.title}</h3>
            <iframe src={youtubeEmbedUrl(videoItem.youtubeUrl)} title={videoItem.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          </article>
        </div>
      )}
    </div>
  );
}
