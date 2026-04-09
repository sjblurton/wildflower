# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run test`            | Run unit tests with Vitest                       |
| `npm run test:watch`      | Run Vitest in watch mode                         |
| `npm run test:coverage`   | Run tests with coverage output                   |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

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
