import { Code2, Server, Wrench } from 'lucide-react';
import { profile } from '../data/profile.js';
import SectionHeading from './SectionHeading.jsx';
import PhotoStrip from './PhotoStrip.jsx';
import './About.css';

const icons = { code: Code2, server: Server, wrench: Wrench };

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container section__grid">
        <SectionHeading id="about" title="A Little About Me" />

        <div className="about reveal">
          <div className="about__text">
            {profile.about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          {profile.photos?.length ? (
            <div className="about__photos">
              <PhotoStrip photos={profile.photos} label="Photos from my work" />
            </div>
          ) : null}

          <ul className="about__focus">
            {profile.focus.map(({ icon, title, text }) => {
              const Icon = icons[icon] ?? Code2;
              return (
                <li key={title} className="about__item">
                  <span className="about__icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <h3 className="about__item-title">{title}</h3>
                  <p className="about__item-text">{text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
