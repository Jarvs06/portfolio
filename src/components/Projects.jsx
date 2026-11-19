import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { projects } from '../data/projects.js';
import { GithubIcon } from './BrandIcons.jsx';
import SectionHeading from './SectionHeading.jsx';
import { asset } from '../utils/asset.js';
import './Projects.css';

function ProjectCard({ project, drift }) {
  const { title, category, description, image, imageAlt, tech, liveUrl, repoUrl, status } = project;

  return (
    <article
      className="project reveal"
      {...(drift
        ? {
            'data-parallax': '0.1',
            'data-parallax-root': '.projects',
            'data-parallax-var': '--lift-y',
            'data-parallax-max': '0.016', // stay under the 24px grid gap
          }
        : {})}
    >
      <div className="project__media">
        {image ? (
          <div className="project__shot">
            <img
              className="project__img parallax-img"
              data-parallax="0.08"
              src={asset(image)}
              alt={imageAlt || `Screenshot of ${title}`}
              width="1200"
              height="750"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : (
          <div className="project__placeholder" aria-hidden="true">
            {title}
          </div>
        )}
      </div>

      <div className="project__body">
        <div className="project__meta">
          <span>{category}</span>
          {status ? <span className="project__status">{status}</span> : null}
        </div>
        <h3 className="project__title">
          {liveUrl || repoUrl ? (
            <a className="project__title-link" href={liveUrl || repoUrl} target="_blank" rel="noopener noreferrer">
              {title}
              <ArrowUpRight className="project__title-icon" aria-hidden="true" />
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          ) : (
            title
          )}
        </h3>
        <p className="project__desc">{description}</p>

        {tech?.length ? (
          <ul className="tags project__tags" aria-label={`Technologies used in ${title}`}>
            {tech.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        ) : null}

        {liveUrl || repoUrl ? (
          <div className="project__links">
            {liveUrl ? (
              <a className="btn btn--secondary btn--small" href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink aria-hidden="true" />
                View Project
                <span className="visually-hidden">: {title} (opens in a new tab)</span>
              </a>
            ) : null}
            {repoUrl ? (
              <a className="btn btn--secondary btn--small" href={repoUrl} target="_blank" rel="noopener noreferrer">
                <GithubIcon />
                Source Code
                <span className="visually-hidden">: {title} (opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default function Projects() {
  const visible = projects.filter((p) => p.published !== false);

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container section__grid">
        <SectionHeading
          id="projects"
          title="Selected Projects"
          lede="Systems and applications I've designed and built."
        />

        {visible.length ? (
          <div className="projects">
            {visible.map((project, i) => (
              // After the wide first card, cards alternate columns; the right one drifts.
              <ProjectCard key={project.id} project={project} drift={i > 0 && i % 2 === 0} />
            ))}
          </div>
        ) : (
          <p className="section__lede">New projects are on the way. Check back soon.</p>
        )}
      </div>
    </section>
  );
}
