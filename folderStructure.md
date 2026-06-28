ai-finance-platform/
│
├── .clerk/                          # Clerk auth config (hidden folder)
├── .next/                           # Next.js build output (auto-generated)
│
├── actions/                         # Server actions (backend logic)
│
├── app/                             # Next.js App Router (main app folder)
│   │
│   ├── (auth)/                      # Auth route group (no URL prefix)
│   │   ├── sign-in/
│   │   │   └── [[...sign-in]]/
│   │   │       └── page.jsx         # Clerk Sign-In page
│   │   ├── sign-up/
│   │   │   └── [[...sign-up]]/
│   │   │       └── page.jsx         # Clerk Sign-Up page
│   │   └── layout.js                # Layout for auth pages
│   │
│   ├── (main)/                      # Main app route group (after login)
│   │   ├── account/
│   │   │   ├── _components/
│   │   │   │   ├── account-chart.jsx
│   │   │   │   ├── no-pagination-transaction-table.jsx
│   │   │   │   └── transaction-table.jsx
│   │   │   └── [id]/
│   │   │       └── page.jsx         # Single account detail page
│   │   │
│   │   ├── dashboard/
│   │   │   ├── _components/
│   │   │   │   ├── account-card.jsx
│   │   │   │   ├── budget-progress.jsx
│   │   │   │   └── transaction-overview.jsx
│   │   │   └── page.jsx
│   │   │
│   │   └── transaction/
│   │       ├── _components/
│   │       │   ├── recipt-scanner.jsx
│   │       │   └── transaction-form.jsx
│   │       └── create/
│   │           └── page.jsx         # Create transaction page
│   │
│   ├── api/                         # API routes
│   │   ├── inngest/
│   │   │   └── route.js             # Inngest background jobs
│   │   └── seed/
│   │       └── route.js             # Database seeding endpoint
│   │
│   ├── lib/
│   ├── globals.css                  # Global styles
│   ├── layout.js                    # Root layout
│   ├── not-found.jsx                # 404 page
│   └── page.js                      # Home/landing page
│
├── components/                      # Shared/reusable UI components
│   ├── ui/                          # UI primitives (buttons, inputs, etc.)
│   ├── create-account-drawer.jsx
│   ├── header.jsx
│   └── hero.jsx
│
├── data/                            # Static/seed data
├── emails/                          # Email templates
├── hooks/                           # Custom React hooks
└── lib/                             # Utility functions/libraries