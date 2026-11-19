import { ArrowUp } from 'lucide-react';
import { profile } from '../data/profile.js';
import { GithubIcon, LinkedinIcon } from './BrandIcons.jsx';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  const { links } = profile;

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__text">
          {profile.tagline ? <p className="footer__tagline">{profile.tagline}</p> : null}
          <p>
            © {year} {profile.name}. Designed &amp; developed by {profile.name}.
          </p>
        </div>

        <div className="footer__links">
          {links.github ? (
            <a className="footer__icon" href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">
              <GithubIcon width={18} height={18} />
            </a>
          ) : null}
          {links.linkedin ? (
            <a className="footer__icon" href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">
              <LinkedinIcon width={18} height={18} />
            </a>
          ) : null}
          <a className="footer__top" href="#home">
            Back to top
            <ArrowUp size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Oversized outlined name that rises into view */}
      <div className="footer__wordmark-wrap reveal" aria-hidden="true">
        <div className="container">
          <p className="footer__wordmark">
            {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
