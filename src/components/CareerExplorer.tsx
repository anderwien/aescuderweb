import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type CareerLine = {
  label: string;
  summary: string;
  facts: string[];
};

type Props = {
  lines: CareerLine[];
};

export default function CareerExplorer({ lines }: Props) {
  const [openLabel, setOpenLabel] = useState(lines[0]?.label ?? '');

  const toggle = (label: string) => {
    setOpenLabel((current) => (current === label ? '' : label));
  };

  return (
    <div className="career-explorer">
      <div className="career-explorer__grid">
        {lines.map((line) => {
          const isOpen = openLabel === line.label;

          return (
            <article key={line.label}>
              <button type="button" aria-expanded={isOpen} onClick={() => toggle(line.label)}>
                <span>
                  <p className="eyebrow">{line.label}</p>
                  <h3>{line.summary}</h3>
                </span>
                <ChevronDown size={20} style={{ transform: isOpen ? 'rotate(180deg)' : undefined }} />
              </button>
              {isOpen && (
                <div className="career-explorer__body">
                  <ul>
                    {line.facts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
