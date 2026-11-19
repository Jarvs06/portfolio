import { Cloud, Database, LayoutTemplate, Monitor, Smartphone } from 'lucide-react';
import { skills } from '../data/skills.js';
import SectionHeading from './SectionHeading.jsx';
import './Skills.css';

const icons = { monitor: Monitor, database: Database, layout: LayoutTemplate, cloud: Cloud, smartphone: Smartphone };

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container section__grid">
        <SectionHeading id="skills" title="Tools & Technologies" lede="What I use day to day." />

        <dl className="skills reveal">
          {skills.map((group) => {
            const Icon = icons[group.icon];
            return (
            <div key={group.category} className="skills__row">
              <dt className="skills__category">
                {Icon ? (
                  <span className="skills__icon" aria-hidden="true">
                    <Icon size={16} strokeWidth={1.75} />
                  </span>
                ) : null}
                {group.category}
              </dt>
              <dd>
                <ul className="tags">
                  {group.items.map((item) => (
                    <li key={item} className="tag skills__tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
