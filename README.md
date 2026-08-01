# De Excelsior Store

A production ecommerce platform for a family-owned retail business in Ijoko, Ogun State, Nigeria.

The platform serves real customers across Ogun and Lagos State — providing a professional online storefront that extends the physical shop rather than replacing it.

## Status

**In active development.** Core pages and architecture are being built progressively. Firebase integration, payment workflows, and admin dashboard are upcoming.

## What it does

- Lets customers browse products across Electronics and Fashion departments
- Supports category filtering, search, and sorting
- Follows a verification-first ordering model (no payment before order confirmation)
- Encourages both online ordering and in-store visits
- Optimized for mobile devices on varying internet speeds

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 8 |
| Language | TypeScript 7 |
| Styling | Tailwind CSS v4 |
| Backend | Firebase (Firestore, Auth, Storage) |
| State | Zustand |
| Data Fetching | TanStack Query |
| Forms | React Hook Form + Zod |
| Animations | Framer Motion |
| Icons | Lucide React |
| Deployment | Vercel |

## Project Structure

```
src/
├── components/
│   ├── ui/          # Design system primitives (Button, Input, Modal, etc.)
│   └── common/      # Shared components (Navbar, Footer, ProductCard, SearchBar)
├── features/        # Feature modules (home/, department/)
├── pages/           # Route-level page components
├── layouts/         # Customer and Admin layout shells
├── store/           # Zustand global stores (cart, auth)
├── hooks/           # Custom React hooks
├── types/           # Domain type definitions
├── constants/       # Business constants and enums
├── firebase/        # Firebase configuration
└── styles/          # Global styles and design tokens
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
```

Create a `.env.local` file from `.env.example` and add your Firebase credentials.

## Architecture Principles

- **Mobile-first** — every layout starts from the smallest screen
- **Feature-based organization** — code grouped by domain, not file type
- **Code-split routes** — all pages lazy-loaded for fast initial load
- **Verification-first commerce** — payment is never requested before order verification
- **Placeholder-ready** — components accept data as props for easy Firebase swap later

## Documentation

Detailed project documentation lives in the `docs/` directory covering architecture, design system, user flows, database schema, coding standards, and more.

## License

Private. All rights reserved.
