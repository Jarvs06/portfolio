/**
 * Personal information shown across the site.
 * Edit the values below — every component reads from here.
 * Leave a link as an empty string ('') to hide it.
 */
export const profile = {
  name: 'Jarvey Ilano',
  initials: 'JI',
  title: 'Web Developer & Technical Problem Solver',
  intro:
    'I build and maintain websites, develop practical web applications, and solve technical challenges through clean, reliable, and efficient solutions.',
  location: 'Philippines',
  tagline: 'Crafting digital experiences with purpose.',

  // Hero portrait (transparent cut-out works best). Set to '' to hide it.
  portrait: {
    src: 'assets/images/jarvey-portrait.webp',
    alt: 'Jarvey Ilano in a pinstripe blazer and pixel sunglasses, giving a thumbs up',
    width: 720,
    height: 1016,
  },
  // Small labels floating around the portrait (desktop). [] hides them.
  portraitBadges: ['WordPress', 'React', 'Cloudflare'],

  // Availability badge in the hero. Set `show: false` to hide it.
  availability: {
    show: true,
    available: true,
    label: 'Available for new projects', // e.g. 'Currently booked until March'
  },

  // Rotating line in the hero. Keep these to things you actually do.
  focusAreas: [
    'WordPress development',
    'custom PHP and React applications',
    'website performance and security',
    'hosting and server troubleshooting',
  ],

  // TODO: add your LinkedIn URL and email address.
  links: {
    github: 'https://github.com/Jarvs06',
    linkedin: 'https://www.linkedin.com/in/YOUR-PROFILE',
    email: 'you@example.com',
    // Path to a PDF in /public (e.g. 'assets/Jarvey-Ilano-CV.pdf') or a full URL.
    // Leave '' to hide the "Download CV" button.
    resume: '',
  },

  contact: {
    // Optional Formspree form. Paste your endpoint (e.g. 'https://formspree.io/f/abcdwxyz')
    // to show a contact form. Leave empty to show only the email button.
    formspreeEndpoint: '',
  },

  about: [
    "I'm a web developer focused on building practical digital solutions and maintaining reliable web experiences. My work spans WordPress development, custom web applications, website optimization, and technical infrastructure.",
    'I enjoy solving problems, exploring new technologies, and turning ideas into functional solutions that make everyday work easier.',
    "When I'm not coding, you'll often find me exploring new design trends, learning about AI tools, or analyzing trading charts.",
  ],

  // Photos shown under the About text. Remove entries to show fewer; [] hides the row.
  photos: [
    {
      src: 'assets/images/about1.webp',
      alt: 'A walking stick fitted with an ultrasonic sensor and an electronics box, held up for testing',
      width: 825,
      height: 1100,
    },
    {
      src: 'assets/images/about2.webp',
      alt: 'Hands connecting jumper wires on an electronics prototype',
      width: 618,
      height: 1100,
    },
    {
      src: 'assets/images/about3.webp',
      alt: 'A keyboard sticking out of a canvas bag in a computer lab',
      width: 825,
      height: 1100,
    },
  ],

  // Icons come from lucide-react: 'code', 'server', 'wrench'.
  focus: [
    { icon: 'code', title: 'Development', text: 'Building websites and web applications.' },
    { icon: 'server', title: 'Technical Operations', text: 'Managing hosting, infrastructure, and troubleshooting.' },
    { icon: 'wrench', title: 'Problem Solving', text: 'Improving performance, security, and usability.' },
  ],
};
