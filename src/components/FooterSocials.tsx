import { Mail } from 'lucide-react';
import {
  SiBandcamp,
  SiBluesky,
  SiFacebook,
  SiInstagram,
  SiSpotify,
  SiSubstack,
  SiYoutube
} from '@icons-pack/react-simple-icons';

type SocialLink = {
  label: string;
  href: string;
  icon?: 'spotify' | 'youtube' | 'instagram' | 'facebook' | 'substack' | 'bluesky' | 'bandcamp' | 'linkedin' | 'mail';
  enabled?: boolean;
  showInHero?: boolean;
  showInFooter?: boolean;
};

type Props = {
  links: SocialLink[];
  className?: string;
  label?: string;
};

const icons = {
  spotify: SiSpotify,
  bandcamp: SiBandcamp,
  youtube: SiYoutube,
  instagram: SiInstagram,
  facebook: SiFacebook,
  substack: SiSubstack,
  bluesky: SiBluesky,
  linkedin: LinkedInIcon,
  mail: Mail
};

function LinkedInIcon({ size = 17 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.943v5.663H9.351V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.268 2.371 4.268 5.455v6.286ZM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126ZM7.114 20.452H3.558V9h3.556v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z" />
    </svg>
  );
}

export default function FooterSocials({ links, className = '', label = 'Social media links' }: Props) {
  const visibleLinks = links.filter((link) => link.enabled !== false);

  if (visibleLinks.length === 0) return null;

  return (
    <div className={`social-links ${className}`.trim()} aria-label={label}>
      {visibleLinks.map((link) => {
        const Icon = icons[link.icon ?? 'mail'];

        return (
          <a href={link.href} aria-label={link.label} title={link.label} key={link.label}>
            <Icon size={17} />
          </a>
        );
      })}
    </div>
  );
}
