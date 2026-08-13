# EDU Learning Hub

A reusable learning resource hub for universities and distance-learning programs.

## Prototype 01

Current milestone focuses on the application foundation and User UI:

- React + TypeScript + Vite
- Ant Design + Lucide React
- SCSS + design tokens
- Environment-driven institution branding
- Feature flags
- User responsive layout
- Client-side routing
- Dashboard mock data

## Project structure

```text
src/
├── components/       # Reusable UI and layout components
├── config/           # Environment and application configuration
├── layouts/          # User/Admin application shells
├── pages/            # Feature pages
├── router/           # Application routes
├── services/         # API and external service adapters
├── theme/            # Design tokens and Ant Design theme
├── types/            # Shared TypeScript models
└── styles/           # Global SCSS
```

## Local development

```bash
npm install
npm run dev
```

Type check:

```bash
npm run typecheck
```

Production build:

```bash
npm run build
```

## Configuration

Copy `.env.example` to `.env` and adjust institution-specific values. Do not commit `.env` or secrets.

The frontend uses `VITE_*` variables only for public/runtime-build configuration. Database credentials, API secrets, Google client secrets and JWT secrets belong to the backend environment and must never be exposed through `VITE_*` variables.
