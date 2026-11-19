/** Resolve a path inside /public so it works on any GitHub Pages base URL. */
export const asset = (path) =>
  /^(https?:)?\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
