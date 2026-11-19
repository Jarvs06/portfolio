/**
 * Projects shown in "Selected Projects".
 *
 * Fields:
 *  - published: false hides the project from the site without deleting it.
 *  - image:     path inside /public (e.g. 'assets/projects/my-app.png').
 *               Use a 16:10 screenshot, ideally 1200×750, as .webp or .png.
 *  - tech:      technologies you actually used. Empty arrays are hidden.
 *  - liveUrl / repoUrl: leave '' to hide the button (e.g. private repos).
 *  - status:    optional short note such as 'In development' or 'Private client work'.
 *
 * The descriptions below are starting points — check that each one is accurate
 * and fill in the technologies before publishing.
 */
export const projects = [
  {
    id: 'mcbc-system',
    published: true,
    title: 'MCBC System',
    category: 'Management system',
    description: 'A custom management system with an administrative interface and operational tools.',
    image: 'assets/projects/mcbc-system.svg',
    imageAlt: 'Screenshot of the MCBC System administrative interface',
    tech: [], // e.g. ['PHP', 'MySQL']
    liveUrl: '',
    repoUrl: '',
    status: '',
  },
  {
    id: 'everywallet',
    published: true,
    title: 'EveryWallet',
    category: 'Personal finance',
    description: 'A personal finance and expense tracking application.',
    image: 'assets/projects/everywallet.svg',
    imageAlt: 'Screenshot of the EveryWallet expense tracking app',
    tech: [],
    liveUrl: '',
    repoUrl: '',
    status: '',
  },
  {
    id: 'churchadmin',
    published: true,
    title: 'ChurchAdmin',
    category: 'Management system',
    description: 'A church membership and administrative management system.',
    image: 'assets/projects/churchadmin.svg',
    imageAlt: 'Screenshot of the ChurchAdmin membership dashboard',
    tech: [],
    liveUrl: '',
    repoUrl: '',
    status: '',
  },
  {
    id: 'site-guardian-ai',
    published: true,
    title: 'Site Guardian AI',
    category: 'WordPress tooling',
    description: 'A platform for monitoring and managing WordPress websites.',
    image: 'assets/projects/site-guardian-ai.svg',
    imageAlt: 'Screenshot of the Site Guardian AI monitoring overview',
    tech: [],
    liveUrl: '',
    repoUrl: '',
    status: '',
  },
  {
    id: 'supermarket-app-pro',
    published: true,
    title: 'Supermarket App Pro',
    category: 'Food information',
    description: 'An application that scans ingredients and shows information about food products.',
    image: 'assets/projects/supermarket-app-pro.svg',
    imageAlt: 'Screenshot of the Supermarket App Pro ingredient scanner',
    tech: [],
    liveUrl: '',
    repoUrl: '',
    status: '',
  },
];
