import type { NextConfig } from 'next'

/**
 * GitHub Pages serves the project site from a sub-path, so every internal URL
 * must be prefixed with the repository name.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/svg-to-base64'

const nextConfig: NextConfig = {
  // Static export: emits plain HTML/CSS/JS into out/ for GitHub Pages.
  output: 'export',
  reactStrictMode: true,
  poweredByHeader: false,
  basePath,
  // GitHub Pages has no rewrite layer; directory-style URLs map to index.html.
  trailingSlash: true,
  // No image optimisation server exists in a static export.
  images: {
    unoptimized: true,
  },
}

export default nextConfig
