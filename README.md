# Wildflower Monorepo

Welcome to the Wildflower monorepo, housing both the public-facing website and the content management studio. This repository is designed for maintainability, clarity, and a production-only deployment model.

---

## Project Overview

This repository contains two main applications:

- **website/**: The public website, built with Astro and Tailwind CSS.
- **studio/**: The Sanity Studio for content management.

All code, configuration, and documentation are centralised here for ease of maintenance and onboarding.

---

## Setup

### Prerequisites

- Node.js (see `package.json` for supported versions)
- npm (comes with Node.js)

### Installation

1. Clone the repository: `git clone https://github.com/sjblurton/wildflower.git && cd wildflower`
2. Install dependencies for all projects: `shn npm install`

---

## Usage

### Website

- Development: `cd website && npm run dev`
- Build: `cd website && npm run build`

### Studio

- Development: `cd studio && npm run dev`
- Build: `cd studio && npm run build`

---

## Deployment

This repository is intended for **production-only deployments**. Do not deploy preview or staging environments from this codebase unless explicitly required.

- **Website**: Deploy the built output from `website/dist` to your production host (e.g., Vercel, Netlify, or your preferred static host).
- **Studio**: Deploy the built output from `studio/dist` to your production host or Sanity's managed hosting.

All environment variables and secrets should be managed securely outside of the repository.

---

## Live Links

- [Production Website](https://wildflower-website.netlify.app/)
- [Sanity Studio](https://wildflower-studio.netlify.app/structure)

---

## Maintenance Guidance

- All shared information, setup, and deployment instructions are maintained in this README. Subproject READMEs reference this file for shared details.
- Update this file with any changes to project structure, setup, or deployment processes.
- For subproject-specific details, see the respective `website/README.md` and `studio/README.md`.

---

## Repository Structure

```text
/
├── website/    # Public website (Astro)
├── studio/     # Sanity Studio (CMS)
├── ...         # Shared configs, documentation, and scripts
```

---

## Further Documentation

- [website/README.md](website/README.md)
- [studio/README.md](studio/README.md)

---

## Contact

For support or questions, please contact the maintainers via the repository issues or your organisation's preferred channel.
