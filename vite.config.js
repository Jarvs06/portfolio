import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` makes every asset path relative, so the same build works on
// https://USERNAME.github.io/, https://USERNAME.github.io/REPO-NAME/,
// and a custom domain — no per-repo configuration needed.
export default defineConfig({
  plugins: [react()],
  base: './',
});
