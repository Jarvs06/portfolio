# Jarvey Ilano — Personal Portfolio

A minimalist, single-page developer portfolio built with **React + Vite**. It runs as a static site and deploys for free to **GitHub Pages** through GitHub Actions.

- No backend, database, or paid services
- Light and dark themes (follows the system setting until the visitor picks one)
- Subtle scroll parallax and reveal animations, all switched off for visitors who prefer reduced motion
- Every piece of content lives in `src/data/`, so you never have to edit components to update the site

---

## 1. Install dependencies

Requires **Node.js 20 or newer**.

```bash
npm install
```

## 2. Run locally

```bash
npm run dev       # dev server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build at http://localhost:4173
```

## 3. Update your personal information

Edit **`src/data/profile.js`**:

| Field | What it controls |
| --- | --- |
| `name`, `initials`, `title`, `intro` | Hero section and navbar monogram |
| `location` | “Based in …” in the hero |
| `availability` | Green status dot in the hero. Set `show: false` to hide it |
| `focusAreas` | The rotating “Currently focused on …” line |
| `about`, `focus` | “A Little About Me” paragraphs and the three cards |
| `portrait` | Cut-out photo on the right of the hero (desktop only). Set `src: ''` to hide it |
| `photos` | Horizontally scrollable photo strip in the About section. Add as many as you like; `[]` hides it |
| `tagline` | Short line in the footer |
| `links` | GitHub, LinkedIn, email, and optional `resume` (shows a “Download CV” button), used everywhere on the site |
| `contact.formspreeEndpoint` | Optional contact form (see section 6) |

Work history goes in **`src/data/experience.js`**, and skills go in **`src/data/skills.js`**. The experience entries are placeholders: replace or delete them before publishing.

The SEO tags in **`index.html`**, **`public/robots.txt`**, and **`public/sitemap.xml`** point to `https://jarvs06.github.io/portfolio/`. If you deploy to a different repository or a custom domain, update those URLs.

**Photos:** put images in `public/assets/images/` and reference them without a leading slash. Convert them to WebP first, for example `cwebp -q 78 -resize 1100 0 photo.jpg -o public/assets/images/photo.webp`.

## 4. Add, edit, hide, or remove projects

Every project is an object in **`src/data/projects.js`**:

```js
{
  id: 'my-project',              // unique, lowercase
  published: true,               // false = hidden from the site but kept in the file
  title: 'My Project',
  category: 'Web app',
  description: 'One or two sentences about what it does.',
  image: 'assets/projects/my-project.webp',
  imageAlt: 'Screenshot of the My Project dashboard',
  tech: ['React', 'Supabase'],   // empty array = no tags shown
  liveUrl: 'https://…',          // '' hides the "View Project" button
  repoUrl: 'https://github.com/…', // '' hides the "Source Code" button
  status: 'In development',      // optional badge, '' hides it
}
```

- **Add a project:** copy an object and edit it. Order in the file is the order on the page. The **first** project is shown as a wide feature card.
- **Hide a project:** set `published: false`.
- **Remove a project:** delete the object and its image.

> The five starter projects come with a short description and no technologies listed. Check that each description is accurate, and fill in `tech` with the tools you actually used.

## 5. Replace project screenshots

The files in `public/assets/projects/*.svg` are wireframe placeholders.

1. Take a screenshot of each project, ideally at a **16:10 ratio, 1200×750px**. The top-left of the image is what's always visible.
2. Convert it to **WebP** to keep it small (aim for under 150 KB). Tools such as [Squoosh](https://squoosh.app) work well.
3. Save it in `public/assets/projects/`, for example `everywallet.webp`.
4. Update the project's `image` path and `imageAlt` text in `src/data/projects.js`.
5. Delete the old `.svg` placeholder.

To replace the social sharing image, overwrite `public/og-image.png` (1200×630px).

## 6. Update social links and contact options

Social links and email are set in `profile.links` in `src/data/profile.js`. Set a value to `''` to hide that link everywhere.

**Contact form (optional).** GitHub Pages can't run server code, so the form posts to [Formspree](https://formspree.io), whose free tier is enough:

1. Create a Formspree account and a new form.
2. Copy the form endpoint, which looks like `https://formspree.io/f/abcdwxyz`.
3. Paste it into `contact.formspreeEndpoint` in `src/data/profile.js`.
4. Rebuild and redeploy. The form appears under the email button.

Leave the endpoint empty to show only the **Send Me an Email** (`mailto:`) button.

## 7. Deploy to GitHub Pages

Deployment is automated by `.github/workflows/deploy.yml`, which builds and publishes the site on every push to `main`.

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

Then, in the repository on GitHub:

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Open the **Actions** tab and wait for “Deploy to GitHub Pages” to finish, or re-run it.
4. The site is live at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

**Repository name tip:** name the repository `YOUR-USERNAME.github.io` to serve the site at the root URL `https://YOUR-USERNAME.github.io/`.

Asset paths are relative (`base: './'` in `vite.config.js`), so the same build works for a user site, a project site, or a custom domain without changes.

## 8. Use a custom domain

1. Create `public/CNAME` containing only your domain, for example `jarveyilano.com`.
2. At your DNS provider:
   - **Apex domain** (`jarveyilano.com`): add `A` records pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`.
   - **Subdomain** (`www.jarveyilano.com`): add a `CNAME` record pointing to `YOUR-USERNAME.github.io`.
3. In **Settings → Pages**, enter the domain and turn on **Enforce HTTPS** once the certificate is issued (this can take up to an hour).
4. Update the canonical, Open Graph, and Twitter URLs in `index.html`, `robots.txt`, and `sitemap.xml`.

If you use Cloudflare DNS, set the records to **DNS only** (grey cloud) until GitHub has issued the certificate.

## 9. Troubleshooting deployment

| Symptom | Fix |
| --- | --- |
| Blank page, 404s for `.js`/`.css` files | Make sure `base: './'` is still set in `vite.config.js`, and that Pages **Source** is set to **GitHub Actions**, not “Deploy from a branch”. |
| Workflow fails at `npm ci` | `package-lock.json` must be committed. Run `npm install` locally and commit the lock file. |
| Workflow fails with a permissions or “environment” error | In **Settings → Environments → github-pages**, allow the `main` branch to deploy. |
| Site shows old content | Wait for the Actions run to finish, then hard-refresh (Cmd/Ctrl + Shift + R). |
| Images don't load | Paths in `projects.js` must not start with `/`, and file names are case-sensitive on GitHub Pages. |
| Custom domain resets after deploy | The domain must live in `public/CNAME` so it's included in every build. |
| Link previews show the wrong image or text | Open Graph URLs in `index.html` must be absolute (full `https://` URL). Social sites cache previews, so re-scrape with their debugger tools. |

---

## Project structure

```text
├── .github/workflows/deploy.yml   # GitHub Pages CI/CD
├── public/                        # copied as-is into the build
│   ├── 404.html                   # standalone not-found page
│   ├── favicon.svg
│   ├── og-image.png               # social sharing image (1200×630)
│   ├── robots.txt
│   ├── sitemap.xml
│   └── assets/projects/           # project screenshots
├── src/
│   ├── components/                # one component + stylesheet per section
│   ├── data/                      # ← all editable content lives here
│   ├── hooks/                     # theme, active section, reveal, parallax
│   ├── styles/                    # design tokens + global styles
│   ├── App.jsx
│   └── main.jsx
├── index.html                     # SEO + Open Graph metadata
└── vite.config.js
```

## Design notes

- **Colors** are tokens in `src/styles/variables.css`. Both themes are defined there.
- **Font:** Geist (self-hosted through `@fontsource-variable/geist`, with no external requests).
- **Parallax:** add `data-parallax="0.1"` to any element whose CSS uses `transform: translate3d(0, var(--parallax-y, 0px), 0)`. See `src/hooks/useParallax.js` for the options.
