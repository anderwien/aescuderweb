import { Pause, Play } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

type Track = {
  id: string;
  title: string;
  type?: string;
  category?: string;
  featuredGroup?: 'concert' | 'media' | 'jazz' | 'piano' | 'improvisation';
  duration?: string;
  audioUrl?: string;
  tags?: string[];
};

type Props = {
  tracks: Track[];
};

const groups = [
  { id: 'concert', label: 'Concert music' },
  { id: 'media', label: 'Music for media' },
  { id: 'jazz', label: 'Jazz' },
  { id: 'piano', label: 'Piano' },
  { id: 'improvisation', label: 'Improvisation' }
] as const;

type FeaturedGroup = (typeof groups)[number]['id'];

function trackBelongsTo(track: Track, group: FeaturedGroup) {
  const tags = track.tags ?? [];
  const category = track.category?.toLowerCase() ?? '';
  const type = track.type?.toLowerCase() ?? '';
  const assignedGroup = track.featuredGroup ?? 'concert';

  if (assignedGroup === group) return true;
  if (group === 'jazz') return category === 'jazz' || tags.includes('jazz');
  if (group === 'piano') return tags.includes('piano') || type.includes('piano');
  if (group === 'improvisation') return tags.includes('improvisation') || type.includes('improvisation');

  return false;
}

export default function FeaturedPlayer({ tracks }: Props) {
  const [activeGroup, setActiveGroup] = useState<FeaturedGroup>('concert');
  const [activeId, setActiveId] = useState(tracks[0]?.id ?? '');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const groupedTracks = useMemo(() => {
    return tracks.filter((track) => trackBelongsTo(track, activeGroup));
  }, [activeGroup, tracks]);

  const activeTrack = groupedTracks.find((track) => track.id === activeId) ?? groupedTracks[0];

  const togglePlayback = async (track: Track) => {
    if (!track.audioUrl) {
      setActiveId(track.id);
      setIsPlaying(false);
      return;
    }

    const sameTrack = activeTrack?.id === track.id;
    setActiveId(track.id);

    if (!sameTrack) {
      setIsPlaying(false);
      audioRef.current?.pause();
      window.setTimeout(async () => {
        if (!audioRef.current) return;
        await audioRef.current.play();
        setIsPlaying(true);
      }, 0);
      return;
    }

    if (audioRef.current?.paused) {
      await audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="featured-player">
      <div className="featured-player__tabs" role="tablist" aria-label="Featured listening categories">
        {groups.map((group) => (
          <button
            type="button"
            key={group.id}
            aria-pressed={activeGroup === group.id}
            onClick={() => {
              setActiveGroup(group.id);
              setActiveId('');
              setIsPlaying(false);
              audioRef.current?.pause();
            }}
          >
            {group.label}
          </button>
        ))}
      </div>

      {activeTrack ? (
        <div className="featured-player__status" aria-live="polite">
          <span>{activeTrack.audioUrl ? (isPlaying ? 'Now playing' : 'Selected') : 'Audio pending'}</span>
          <strong>{activeTrack.title}</strong>
        </div>
      ) : (
        <div className="featured-player__status" aria-live="polite">
          <span>Coming soon</span>
          <strong>No featured items yet</strong>
        </div>
      )}

      {activeTrack?.audioUrl && <audio ref={audioRef} src={activeTrack.audioUrl} onEnded={() => setIsPlaying(false)} />}

      <div className="featured-player__tracks">
        {groupedTracks.map((track) => {
          const isActive = track.id === activeTrack?.id;
          const label = [track.category, track.type].filter(Boolean).join(' · ');

          return (
            <div className={isActive ? 'featured-player__track featured-player__track--active' : 'featured-player__track'} key={track.id}>
              <button
                className="featured-player__play"
                type="button"
                onClick={() => togglePlayback(track)}
                disabled={!track.audioUrl}
                aria-label={`${track.audioUrl ? 'Play' : 'Audio pending for'} ${track.title}`}
                title={track.audioUrl ? `Play ${track.title}` : 'Add audioUrl in this work Markdown file to enable playback'}
              >
                {isActive && isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
              </button>
              <div>
                <strong>{track.title}</strong>
                {label && <span>{label}</span>}
              </div>
              {track.duration && <small>{track.duration}</small>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
