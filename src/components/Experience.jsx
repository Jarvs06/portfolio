import { experience } from '../data/experience.js';
import SectionHeading from './SectionHeading.jsx';
import './Experience.css';

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container section__grid">
        <SectionHeading
          id="experience"
          title="Experience"
          lede="Where I've worked and what I was responsible for."
        />

        <div className="timeline-wrap">
          <span className="timeline__fill" data-parallax="1" data-parallax-mode="progress" aria-hidden="true" />
          <ol className="timeline">
          {experience.map((job) => (
            <li key={`${job.company}-${job.period}`} className="timeline__item reveal">
              <div className="timeline__when">
                <span>{job.period}</span>
                {job.location ? <span className="timeline__where">{job.location}</span> : null}
              </div>

              <div className="timeline__content">
                <h3 className="timeline__role">{job.role}</h3>
                <p className="timeline__company">
                  {job.companyUrl ? (
                    <a className="text-link" href={job.companyUrl} target="_blank" rel="noopener noreferrer">
                      {job.company}
                    </a>
                  ) : (
                    job.company
                  )}
                </p>

                {job.summary ? <p className="timeline__summary">{job.summary}</p> : null}

                {job.responsibilities?.length ? (
                  <ul className="timeline__list">
                    {job.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                ) : null}

                {job.tech?.length ? (
                  <ul className="tags timeline__tags" aria-label="Technologies used">
                    {job.tech.map((t) => (
                      <li key={t} className="tag">
                        {t}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
