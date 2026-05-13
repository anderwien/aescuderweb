import { useState } from 'react';

type BioVersions = {
  short: string;
  long: string;
  fun: string;
};

type Props = {
  bios: BioVersions;
  image: string;
};

const modes = [
  { id: 'short', label: 'Short' },
  { id: 'long', label: 'Standard' },
  { id: 'fun', label: 'Fun' }
] as const;

type Mode = (typeof modes)[number]['id'];

export default function BioSwitcher({ bios, image }: Props) {
  const [mode, setMode] = useState<Mode>('long');

  return (
    <div className="bio-switcher">
      <div className="bio-switcher__copy">
        <div className="segmented-control" aria-label="Biography length">
          {modes.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={mode === item.id}
              onClick={() => setMode(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="bio-switcher__text">
          {bios[mode].split(/\n\n+/).map((block) => {
            const trimmed = block.trim();
            if (!trimmed) return null;
            if (trimmed.startsWith('## ')) return <h3 key={trimmed}>{trimmed.replace(/^## /, '')}</h3>;
            if (trimmed.startsWith('(') && trimmed.endsWith(')')) return <p className="bio-switcher__aside" key={trimmed}>{trimmed}</p>;
            return <p key={trimmed}>{trimmed}</p>;
          })}
        </div>
      </div>
      <figure className="bio-switcher__image">
        <img src={image} alt="Alejandro Escuder profile portrait" />
      </figure>
    </div>
  );
}
