import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { profile } from '../data/profile.js';
import { GithubIcon, LinkedinIcon } from './BrandIcons.jsx';
import './Contact.css';

function ContactForm({ endpoint }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__row">
        <label className="field">
          <span className="field__label">Name</span>
          <input className="field__input" name="name" type="text" autoComplete="name" required />
        </label>
        <label className="field">
          <span className="field__label">Email</span>
          <input className="field__input" name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label className="field">
        <span className="field__label">Message</span>
        <textarea className="field__input field__textarea" name="message" rows="5" required />
      </label>
      {/* Honeypot field for Formspree spam filtering */}
      <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off" className="visually-hidden" aria-hidden="true" />

      <div className="contact-form__footer">
        <button type="submit" className="btn btn--panel" disabled={status === 'sending'}>
          <Send aria-hidden="true" />
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <p className="contact-form__status" role="status" aria-live="polite">
          {status === 'sent' && 'Message sent. I’ll reply by email.'}
          {status === 'error' && (
            <>
              The message didn&rsquo;t send. Try again, or email me at{' '}
              <a className="contact__inline-link" href={`mailto:${profile.links.email}`}>
                {profile.links.email}
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}

export default function Contact() {
  const { links, contact } = profile;

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact reveal">
          <div className="contact__grid" data-parallax="0.15" data-parallax-max="0.12" aria-hidden="true" />
          <div className="contact__glow" data-parallax="-0.3" data-parallax-max="0.3" aria-hidden="true" />

          <div className="contact__inner">
            <h2 className="contact__title" id="contact-title">
              Let&rsquo;s Work Together
            </h2>
            <p className="contact__lede">
              Have a project in mind, need help with a website, or just want to connect? Feel free to reach out.
            </p>

            <div className="contact__actions">
              <a className="btn btn--primary btn--large" href={`mailto:${links.email}`}>
                <Mail aria-hidden="true" />
                Send Me an Email
              </a>
              <a className="contact__email" href={`mailto:${links.email}`}>
                {links.email}
              </a>
            </div>

            {links.github || links.linkedin ? (
              <ul className="contact__socials">
                {links.github ? (
                  <li>
                    <a className="contact__social" href={links.github} target="_blank" rel="noopener noreferrer">
                      <GithubIcon width={18} height={18} />
                      GitHub
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  </li>
                ) : null}
                {links.linkedin ? (
                  <li>
                    <a className="contact__social" href={links.linkedin} target="_blank" rel="noopener noreferrer">
                      <LinkedinIcon width={18} height={18} />
                      LinkedIn
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : null}

            {contact.formspreeEndpoint ? (
              <>
                <h3 className="contact__form-title">Or send a message here</h3>
                <ContactForm endpoint={contact.formspreeEndpoint} />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
