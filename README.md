# Land2Land

Land2Land is a full-stack property and agricultural land marketplace built for buyers, sellers, investors, agents, associates, and real-estate administrators in India.

The platform combines property discovery, agricultural land tools, lead management, content publishing, enquiry workflows, and role-based operations in a single Next.js application.

## Highlights

- Browse residential, commercial, agricultural, farm, plot, and office-space listings
- Search properties by location, category, price, and other listing attributes
- Dedicated flows for buying, selling, property enquiries, quotes, and expressions of interest
- Agricultural land tools, including an area converter and investment calculator
- Farm discovery and land-investment content
- Buyer accounts, favourites, messages, profile management, and account deletion
- Agent and associate workspaces for listings, leads, reviews, RERA requests, and support tickets
- Admin workspace for properties, locations, states, categories, amenities, facilities, blogs, SEO, leads, users, reviews, tickets, and import/export
- Blog, news, developer, and location content management
- Image uploads through ImageKit
- Email notifications through SMTP
- MongoDB-backed persistence and server-side API routes
- Responsive UI with reusable Radix UI primitives, Tailwind CSS, and Lucide icons

## Technology

- **Framework:** Next.js 16 App Router
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS 4, Radix UI, Lucide React
- **Data:** MongoDB
- **Authentication:** Custom server-side authentication with bcrypt; optional Google/Firebase integration
- **Media:** ImageKit
- **Email:** Nodemailer over SMTP
- **Forms and validation:** React Hook Form and Zod
- **Charts and content:** Recharts and Tiptap
- **Analytics:** Vercel Analytics

## Project structure

```text
app/                  Next.js pages, layouts, route handlers, and API endpoints
components/            Shared UI and feature components
lib/                   Database, auth, email, media, validation, and utility modules
public/                Static assets and public scripts
scripts/               Data migration and maintenance scripts
styles/                Global styles and design tokens
```

The application uses the App Router. Public-facing pages live alongside role-specific areas such as `/admin`, `/agent`, `/associate`, `/buyer`, and `/builder`. API handlers are organized under `app/api` by domain and user role.

## Getting started

### Prerequisites

- Node.js 20 or newer
- pnpm
- A MongoDB deployment
- ImageKit credentials for media uploads
- SMTP credentials for transactional email

### Installation

```bash
git clone https://github.com/ritetravelsads-bot/land2land.git
cd land2land
pnpm install
```

Create a local environment file named `.env.local` and configure the variables below. Never commit secrets or production credentials.

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
MONGODB_DB=land2land

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000

NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=<imagekit-public-key>
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/<imagekit-id>
IMAGEKIT_PRIVATE_KEY=<imagekit-private-key>

SMTP_HOST=<smtp-host>
SMTP_PORT=587
SMTP_USER=<smtp-username>
SMTP_PASS=<smtp-password>

NEXT_PUBLIC_FIREBASE_API_KEY=<firebase-api-key>
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=<firebase-auth-domain>
NEXT_PUBLIC_FIREBASE_PROJECT_ID=<firebase-project-id>
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=<firebase-storage-bucket>
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<firebase-messaging-sender-id>
NEXT_PUBLIC_FIREBASE_APP_ID=<firebase-app-id>
```

Firebase variables are only needed when the Google authentication flow is enabled. ImageKit and SMTP are required for their respective upload and notification features.

### Run locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
pnpm lint
pnpm build
pnpm start
```

## Primary routes

| Route | Purpose |
| --- | --- |
| `/` | Marketplace homepage |
| `/properties` | Browse property listings |
| `/buy` | Buyer search and discovery flow |
| `/sell` | Seller listing enquiry flow |
| `/farms` | Farms and agricultural properties |
| `/investments` | Land investment opportunities and calculator |
| `/area-converter` | Land-area unit conversion tool |
| `/developers` | Developer and project discovery |
| `/find-agent` | Agent directory |
| `/find-associate` | Associate directory |
| `/blog` | Editorial content |
| `/news` | News and updates |
| `/contact` | Contact and enquiry forms |
| `/admin` | Administrative operations |
| `/agent` | Agent workspace |
| `/associate` | Associate workspace |
| `/buyer` | Buyer workspace |

## API overview

The API is implemented with Next.js route handlers under `app/api` and includes endpoints for:

- Authentication, sessions, OTP, profiles, and account deletion
- Properties, reviews, enquiries, quotes, and EOI submissions
- Leads, contacts, messages, tickets, and notifications
- Locations, states, categories, amenities, facilities, and developers
- Blog posts, news, homepage sections, SEO metadata, and head tags
- ImageKit upload authorization and media uploads
- Admin import, export, validation, and listing review workflows

All authenticated and administrative endpoints should be accessed through the application UI or a trusted server-side client. Validate and authorize requests before exposing new routes publicly.

## Data and security notes

- Keep `.env.local` and all credential files outside version control.
- Use separate MongoDB databases or users for local, preview, and production environments.
- Restrict ImageKit and SMTP credentials to server-side code.
- Review role permissions before deploying changes to `/admin`, `/agent`, `/associate`, or `/buyer` areas.
- Do not use production data for local development without appropriate access controls and anonymization.
- Security and no-cache headers are configured in `next.config.mjs` for authenticated areas and API routes.

## Deployment

The project is designed for deployment on Vercel. Configure the environment variables in the Vercel project, connect the production MongoDB database, and confirm the configured application URL before promoting a deployment.

## Contributing

1. Create a feature branch from `main`.
2. Keep changes focused and preserve existing role and authorization boundaries.
3. Run `pnpm lint` and `pnpm build` before opening a pull request.
4. Include migration or environment-variable notes when a change affects data or deployment configuration.

## License

This repository does not currently declare an open-source license. Unless the repository owner adds one, the code should be treated as proprietary and used only with permission from the Land2Land maintainers.
