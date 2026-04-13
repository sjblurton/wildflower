# Website

This directory contains the public-facing website, built with Astro and Tailwind CSS.

---

## Overview

For a full project overview, setup, and deployment instructions, see the [root README](../README.md).

---

## Usage

All commands should be run from this directory unless otherwise noted.

| Command           | Action                                  |
| ----------------- | --------------------------------------- |
| `npm install`     | Installs dependencies                   |
| `npm run dev`     | Starts the local development server     |
| `npm run build`   | Builds the production site to `./dist/` |
| `npm run preview` | Previews the production build locally   |

---

## Deployment

Deploy the built output from `website/dist` to your production host (e.g., Vercel, Netlify, or your preferred static host). This repository is intended for **production-only deployments**.

---

## Further Information

For shared setup, maintenance, and contact details, see the [root README](../README.md).
| `npm run test` | Run unit tests with Vitest |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run test:coverage` | Run tests with coverage output |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI |

## Navigation Resilience

Navigation data is loaded through a non-throwing path in [src/components/ui/nav/NavBar.astro](src/components/ui/nav/NavBar.astro).

- Fetch failures and schema-validation failures both fall back to a safe nav model.
- Fallback links are always Home and Contact.
- Brand rendering supports logo and site name together.
- If both logo and site name are missing, the navbar renders the literal fallback text Wildflower.

Diagnostic logs are emitted via the structured logger in [src/lib/logger.ts](src/lib/logger.ts) with event keys:

- `nav.fetch_failed`
- `nav.validation_failed`
- `nav.fallback_applied`

## Navigation Tests

Nav safety logic tests live in [src/components/ui/nav/nav.logic.test.ts](src/components/ui/nav/nav.logic.test.ts).

The suite covers:

- Happy path parsing of valid nav payloads.
- Fetch failure fallback behaviour.
- Validation failure fallback behaviour with prettified Zod diagnostics.

## ImageSection Component

The `ImageSection.astro` component renders an image section with optional overlay and title, matching the Sanity imageSection schema.

**Location:** `src/components/sections/ImageSection/ImageSection.astro`

**Props:**

- `image`: `{ asset: string; alt: string }` (required)
- `overlayTitle`: `string` (optional)
- `overlayStyle`: `'none' | 'darken' | 'lighten'` (required)
- `overlayOpacity`: `number` (0–80, required)

**Example usage:**

```astro
---
import ImageSection from '../components/sections/ImageSection/ImageSection.astro';
---

<ImageSection
  image={{ asset: '/images/example.jpg', alt: 'Example image' }}
  overlayTitle="Overlay Title"
  overlayStyle="darken"
  overlayOpacity={40}
/>
```

- Overlay and opacity logic matches the schema intent.
- The component is accessible and fully tested.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
