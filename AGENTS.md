# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Personal website for DJ Yoav Saban (www.yoavsaban.com). Static site deployed to GitHub Pages via CircleCI on push to master. Hebrew RTL website.

## Commands

```bash
# Install dependencies (requires Node.js)
npm install
bower install

# Development (starts SASS watcher + browser-sync)
npm start

# Build for production
npm run build

# Deploy to GitHub Pages (after build)
npm run gh-deploy

# First-time deploy setup (creates gh-pages branch)
npm run gh-deploy:first
```

## Environment Variables

Required for `npm run template` (fetching images from Cloudinary):
- `CLOUDINARY_SECRET`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_NAME`

## Architecture

### Build Pipeline

1. `src/index.template.html` contains placeholders (`{{thumbs}}`, `{{large}}`, `{{dancers}}`)
2. `scripts/template.js` fetches images from Cloudinary API, filters by "favorite" tag
3. Template placeholders are replaced with generated HTML, output to `src/index.html`
4. `npm run build` copies assets to `dist/` for deployment

### Directory Structure

- `src/` - Source files
  - `index.template.html` - HTML template with placeholders
  - `index.html` - Generated HTML (from template.js)
  - `styles/` - SASS files, `main.scss` imports all partials
  - `scripts/main.js` - Client-side JavaScript (vanilla JS)
- `scripts/` - Build utilities
  - `template.js` - Main templating, fetches Cloudinary images
  - `images-util.js` - Cloudinary URL generation helpers
  - `dancers-util.js` - Renders testimonial HTML
  - `dancers-list.js` - Testimonial data
- `dist/` - Build output (deployed to gh-pages)

### Frontend Dependencies (Bower)

- `normalize-css` - CSS reset
- `velocity` - Animation library
- `swipe-js` - Touch swipe carousel
- `cloudinary-core` - Cloudinary client SDK

### CI/CD

CircleCI automatically builds and deploys `master` branch to `gh-pages`. See `.circleci/config.yml`.
